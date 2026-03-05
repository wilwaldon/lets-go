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
import { useConsultations } from '@/modules/consultations/hooks/useConsultations';
import { useServiceAreas } from '@/modules/consultations/hooks/useServiceAreas';
import { useProfessionals } from '@/modules/consultations/hooks/useProfessionals';
import { useProfessionalAvailability } from '@/modules/consultations/hooks/useProfessionalAvailability';
import type { ConsultationFormData } from '@/modules/consultations/types';
import { getAvailableSlots, filterBookingsForDate } from '@/utils/timeSlots';
import type { TimeSlot } from '@/utils/timeSlots';

export function ConsultationPage() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { createConsultation, consultations, isLoading: isCreating } = useConsultations();
  const { serviceAreas, isLoading: serviceAreasLoading } = useServiceAreas();
  const { professionals, isLoading: professionalsLoading } = useProfessionals();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ConsultationFormData>({
    serviceAreaId: '',
    professionalId: '',
    meetingType: 'in_person',
    date: '',
    time: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ConsultationFormData, string>>>({});
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);

  // Fetch availability for selected professional (if any)
  const { availability, isLoading: availabilityLoading } = useProfessionalAvailability(
    formData.professionalId || undefined
  );

  // Generate available time slots when professional or date changes
  useEffect(() => {
    if (!formData.date) {
      setAvailableSlots([]);
      return;
    }

    // Filter consultations for the selected date and professional (if selected)
    const bookings = consultations
      .filter(cons => cons.status !== 'cancelled')
      .map(cons => ({
        date: cons.date,
        time: cons.time,
        professionalId: cons.professionalId,
      }));

    const filteredBookings = formData.professionalId
      ? filterBookingsForDate(bookings, formData.date, undefined, formData.professionalId)
      : filterBookingsForDate(bookings, formData.date);

    // Generate available slots
    const slots = getAvailableSlots(formData.date, availability, filteredBookings);
    setAvailableSlots(slots);
  }, [formData.professionalId, formData.date, availability, consultations]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ConsultationFormData, string>> = {};

    if (!formData.serviceAreaId) {
      newErrors.serviceAreaId = 'Please select a practice area';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    } else {
      // Validate date is not in the past
      const selectedDate = new Date(formData.date + 'T00:00:00');
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.date = 'Cannot schedule consultations in the past';
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
      showToast('Please sign in to schedule a consultation', 'error');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await createConsultation({
        serviceAreaId: formData.serviceAreaId,
        professionalId: formData.professionalId || undefined,
        date: formData.date,
        time: formData.time,
        meetingType: formData.meetingType,
        notes: formData.notes || undefined,
      });

      showToast('Your consultation has been scheduled successfully!', 'success');

      // Reset form
      setFormData({
        serviceAreaId: '',
        professionalId: '',
        meetingType: 'in_person',
        date: '',
        time: '',
        notes: '',
      });
      setErrors({});
    } catch (error) {
      console.error('Error scheduling consultation:', error);
      showToast('Failed to schedule consultation. Please try again.', 'error');
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
    if (errors[name as keyof ConsultationFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleMeetingTypeChange = (type: 'in_person' | 'video' | 'phone') => {
    setFormData((prev) => ({ ...prev, meetingType: type }));
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const isLoading = serviceAreasLoading || professionalsLoading;

  return (
    <PageWrapper title="Schedule Consultation">
      <HeroSection
        headline="Schedule a Consultation"
        description="Discuss your legal needs with our experienced team"
        backgroundImage={getHeroImage('consultation') || undefined}
        align="center"
      />

      <Section className="!pt-32">
        <Container size="narrow">
          <Card>
            <CardContent className="p-8">
              {isLoading ? (
                <div className="text-center py-8 text-secondary-600">
                  Loading service areas and professionals...
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Service Area Selection */}
                  <div>
                    <label htmlFor="serviceAreaId" className="block text-sm font-medium text-secondary-900 mb-2">
                      Practice Area
                    </label>
                    <select
                      id="serviceAreaId"
                      name="serviceAreaId"
                      value={formData.serviceAreaId}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.serviceAreaId ? 'border-red-500' : 'border-secondary-300'
                      }`}
                      required
                    >
                      <option value="">Select a practice area...</option>
                      {serviceAreas.map((area) => (
                        <option key={area.id} value={area.id}>
                          {area.name}
                        </option>
                      ))}
                    </select>
                    {errors.serviceAreaId && (
                      <p className="mt-1 text-sm text-red-600">{errors.serviceAreaId}</p>
                    )}
                  </div>

                  {/* Attorney Selection */}
                  <div>
                    <label htmlFor="professionalId" className="block text-sm font-medium text-secondary-900 mb-2">
                      Preferred Attorney (Optional)
                    </label>
                    <select
                      id="professionalId"
                      name="professionalId"
                      value={formData.professionalId}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">No Preference (We'll match you)</option>
                      {professionals.map((professional) => (
                        <option key={professional.id} value={professional.id}>
                          {professional.name} - {professional.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Meeting Type */}
                  <div>
                    <label className="block text-sm font-medium text-secondary-900 mb-2">
                      Meeting Type
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => handleMeetingTypeChange('in_person')}
                        className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                          formData.meetingType === 'in_person'
                            ? 'border-primary-600 bg-primary-50 text-primary-700'
                            : 'border-secondary-300 bg-white text-secondary-700 hover:border-secondary-400'
                        }`}
                      >
                        In Person
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMeetingTypeChange('video')}
                        className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                          formData.meetingType === 'video'
                            ? 'border-primary-600 bg-primary-50 text-primary-700'
                            : 'border-secondary-300 bg-white text-secondary-700 hover:border-secondary-400'
                        }`}
                      >
                        Video Call
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMeetingTypeChange('phone')}
                        className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                          formData.meetingType === 'phone'
                            ? 'border-primary-600 bg-primary-50 text-primary-700'
                            : 'border-secondary-300 bg-white text-secondary-700 hover:border-secondary-400'
                        }`}
                      >
                        Phone
                      </button>
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-secondary-900 mb-2">
                      Preferred Date
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
                      Preferred Time
                    </label>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      disabled={!formData.date}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.time ? 'border-red-500' : 'border-secondary-300'
                      } ${!formData.date ? 'opacity-50 cursor-not-allowed' : ''}`}
                      required
                    >
                      <option value="">
                        {!formData.date ? 'Select a date first...' :
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
                    {formData.date && !availabilityLoading && availableSlots.length === 0 && (
                      <p className="mt-1 text-sm text-secondary-600">
                        No available time slots for this date. Please select a different date.
                      </p>
                    )}
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-secondary-900 mb-2">
                      Brief Description of Your Legal Matter
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      placeholder="Please provide a brief overview of your situation..."
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    isLoading={isSubmitting || isCreating}
                  >
                    Request Consultation
                  </Button>
                </form>
              )}

              {/* Consultation Policy */}
              <div className="mt-8 pt-8 border-t border-secondary-200">
                <h3 className="text-sm font-semibold text-secondary-900 mb-3">What to Expect</h3>
                <ul className="text-sm text-secondary-600 space-y-2" style={{ lineHeight: '1.7' }}>
                  <li>• Initial consultations are typically 30-60 minutes</li>
                  <li>• We'll review your matter and discuss potential strategies</li>
                  <li>• Come prepared with any relevant documents</li>
                  <li>• Consultations are confidential under attorney-client privilege</li>
                  <li>• We'll follow up within 24 hours to confirm your appointment</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>

      <Section variant="secondary">
        <Container size="narrow">
          <Card className="bg-secondary-50">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold text-secondary-900 mb-4">Need Immediate Assistance?</h3>
              <p className="text-secondary-700 mb-6" style={{ lineHeight: '1.7' }}>
                For urgent legal matters, please call our office directly.
              </p>
              <a
                href="tel:(555) 123-4567"
                className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Call (555) 123-4567
              </a>
            </CardContent>
          </Card>
        </Container>
      </Section>
    </PageWrapper>
  );
}
