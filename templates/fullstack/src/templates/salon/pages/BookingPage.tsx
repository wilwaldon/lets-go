import { useState, useEffect } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { HeroSection } from '@/components/common/HeroSection';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { useAuth } from '@/lib/auth';
import { getHeroImage } from '@/lib/heroImages';
import { useAppointments } from '@/modules/booking/hooks/useAppointments';
import { useServices } from '@/modules/booking/hooks/useServices';
import { useStaff } from '@/modules/booking/hooks/useStaff';
import { useAvailability } from '@/modules/booking/hooks/useAvailability';
import type { BookingFormData } from '@/modules/booking/types';
import { getAvailableSlots, filterBookingsForDate } from '@/utils/timeSlots';
import type { TimeSlot } from '@/utils/timeSlots';

export function BookingPage() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { createAppointment, appointments, isLoading: isCreating } = useAppointments();
  const { services, isLoading: servicesLoading } = useServices();
  const { staff, isLoading: staffLoading } = useStaff();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    serviceId: '',
    staffId: '',
    date: '',
    time: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);

  // Fetch availability for selected staff
  const { availability, isLoading: availabilityLoading } = useAvailability(formData.staffId || undefined);

  // Generate available time slots when staff or date changes
  useEffect(() => {
    if (!formData.staffId || !formData.date) {
      setAvailableSlots([]);
      return;
    }

    // Filter appointments for the selected date and staff
    const bookings = appointments
      .filter(apt => apt.status !== 'cancelled')
      .map(apt => ({
        date: apt.date,
        time: apt.time,
        staffId: apt.staffId,
      }));

    const filteredBookings = filterBookingsForDate(bookings, formData.date, formData.staffId);

    // Generate available slots
    const slots = getAvailableSlots(formData.date, availability, filteredBookings);
    setAvailableSlots(slots);
  }, [formData.staffId, formData.date, availability, appointments]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};

    if (!formData.serviceId) {
      newErrors.serviceId = 'Please select a service';
    }

    if (!formData.staffId) {
      newErrors.staffId = 'Please select a stylist';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    } else {
      // Validate date is not in the past
      const selectedDate = new Date(formData.date + 'T00:00:00');
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.date = 'Cannot book appointments in the past';
      }
    }

    if (!formData.time) {
      newErrors.time = 'Please select a time';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      showToast('Please sign in to book an appointment', 'error');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await createAppointment({
        serviceId: formData.serviceId,
        staffId: formData.staffId,
        date: formData.date,
        time: formData.time,
        notes: formData.notes || undefined,
      });

      showToast('Your appointment has been booked successfully!', 'success');

      // Reset form
      setFormData({
        serviceId: '',
        staffId: '',
        date: '',
        time: '',
        notes: '',
      });
      setErrors({});
    } catch (error) {
      console.error('Error booking appointment:', error);
      showToast('Failed to book appointment. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof BookingFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const isLoading = servicesLoading || staffLoading;

  return (
    <PageWrapper title="Book an Appointment">
      <HeroSection
        headline="Book Your Appointment"
        description="Select your service, stylist, and preferred time"
        backgroundImage={getHeroImage('booking') || undefined}
        align="center"
      />

      <Section className="!pt-32">
        <Container size="narrow">
          <Card>
            <CardContent className="p-8">
              {isLoading ? (
                <div className="text-center py-8 text-secondary-600">
                  Loading services and staff...
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Service Selection */}
                  <div>
                    <label htmlFor="serviceId" className="block text-sm font-medium text-secondary-900 mb-2">
                      Select Service
                    </label>
                    <select
                      id="serviceId"
                      name="serviceId"
                      value={formData.serviceId}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.serviceId ? 'border-red-500' : 'border-secondary-300'
                      }`}
                      required
                    >
                      <option value="">Choose a service...</option>
                      {services.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.name} - ${service.price}
                        </option>
                      ))}
                    </select>
                    {errors.serviceId && (
                      <p className="mt-1 text-sm text-red-600">{errors.serviceId}</p>
                    )}
                  </div>

                  {/* Stylist Selection */}
                  <div>
                    <label htmlFor="staffId" className="block text-sm font-medium text-secondary-900 mb-2">
                      Select Stylist
                    </label>
                    <select
                      id="staffId"
                      name="staffId"
                      value={formData.staffId}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.staffId ? 'border-red-500' : 'border-secondary-300'
                      }`}
                      required
                    >
                      <option value="">Choose a stylist...</option>
                      {staff.map((member) => (
                        <option key={member.id} value={member.id}>
                          {member.name} - {member.title}
                        </option>
                      ))}
                    </select>
                    {errors.staffId && (
                      <p className="mt-1 text-sm text-red-600">{errors.staffId}</p>
                    )}
                  </div>

                  {/* Date Selection */}
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-secondary-900 mb-2">
                      Select Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={getTodayDate()}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.date ? 'border-red-500' : 'border-secondary-300'
                      }`}
                      required
                    />
                    {errors.date && (
                      <p className="mt-1 text-sm text-red-600">{errors.date}</p>
                    )}
                  </div>

                  {/* Time Selection */}
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-secondary-900 mb-2">
                      Select Time
                    </label>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      disabled={!formData.staffId || !formData.date}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.time ? 'border-red-500' : 'border-secondary-300'
                      } ${(!formData.staffId || !formData.date) ? 'opacity-50 cursor-not-allowed' : ''}`}
                      required
                    >
                      <option value="">
                        {!formData.staffId ? 'Select a stylist first...' :
                         !formData.date ? 'Select a date first...' :
                         availabilityLoading ? 'Loading available times...' :
                         availableSlots.length === 0 ? 'No available times' :
                         'Choose a time...'}
                      </option>
                      {availableSlots.map((slot) => (
                        <option
                          key={slot.time}
                          value={slot.time}
                          disabled={!slot.available}
                        >
                          {slot.displayTime}{!slot.available ? ' (Booked)' : ''}
                        </option>
                      ))}
                    </select>
                    {errors.time && (
                      <p className="mt-1 text-sm text-red-600">{errors.time}</p>
                    )}
                    {formData.staffId && formData.date && !availabilityLoading && availableSlots.length === 0 && (
                      <p className="mt-1 text-sm text-secondary-600">
                        No available time slots for this date. Please select a different date.
                      </p>
                    )}
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-secondary-900 mb-2">
                      Special Requests or Notes (Optional)
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      placeholder="Any specific requests or things we should know?"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    isLoading={isSubmitting || isCreating}
                  >
                    Confirm Booking
                  </Button>
                </form>
              )}

              {/* Booking Policy */}
              <div className="mt-8 pt-8 border-t border-secondary-200">
                <h3 className="text-sm font-semibold text-secondary-900 mb-3">Booking Policy</h3>
                <ul className="text-sm text-secondary-600 space-y-2" style={{ lineHeight: '1.7' }}>
                  <li>• Please arrive 5-10 minutes early for your appointment</li>
                  <li>• Cancellations require 24 hours notice</li>
                  <li>• Late cancellations may incur a $25 fee</li>
                  <li>• We accept cash, credit cards, and mobile payments</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>
    </PageWrapper>
  );
}
