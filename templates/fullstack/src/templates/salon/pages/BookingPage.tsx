import { useState } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { HeroSection } from '@/components/common/HeroSection';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getHeroImage } from '@/lib/heroImages';

export function BookingPage() {
  const [selectedService, setSelectedService] = useState('');
  const [selectedStaff, setSelectedStaff] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement booking submission
    console.log('Booking submitted:', {
      service: selectedService,
      staff: selectedStaff,
      date: selectedDate,
      time: selectedTime,
      notes,
    });
  };

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
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Service Selection */}
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-secondary-900 mb-2">
                    Select Service
                  </label>
                  <select
                    id="service"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">Choose a service...</option>
                    <optgroup label="Hair Services">
                      <option value="womens-cut">Women's Haircut - $65</option>
                      <option value="mens-cut">Men's Haircut - $45</option>
                      <option value="blowout">Blowout & Style - $50</option>
                    </optgroup>
                    <optgroup label="Color Services">
                      <option value="full-color">Full Color - $150</option>
                      <option value="partial-highlights">Partial Highlights - $135</option>
                      <option value="balayage">Balayage - $200</option>
                    </optgroup>
                    <optgroup label="Treatment Services">
                      <option value="deep-conditioning">Deep Conditioning - $40</option>
                      <option value="keratin">Keratin Treatment - $250</option>
                    </optgroup>
                  </select>
                </div>

                {/* Stylist Selection */}
                <div>
                  <label htmlFor="staff" className="block text-sm font-medium text-secondary-900 mb-2">
                    Select Stylist
                  </label>
                  <select
                    id="staff"
                    value={selectedStaff}
                    onChange={(e) => setSelectedStaff(e.target.value)}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">Choose a stylist...</option>
                    <option value="any">No Preference (First Available)</option>
                    <option value="sarah">Sarah Martinez - Master Stylist</option>
                    <option value="michael">Michael Chen - Senior Stylist</option>
                    <option value="jessica">Jessica Thompson - Color Specialist</option>
                    <option value="david">David Rodriguez - Senior Stylist</option>
                    <option value="emma">Emma Wilson - Stylist</option>
                    <option value="alex">Alex Kim - Stylist</option>
                  </select>
                </div>

                {/* Date Selection */}
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-secondary-900 mb-2">
                    Select Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Time Selection */}
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-secondary-900 mb-2">
                    Select Time
                  </label>
                  <select
                    id="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">Choose a time...</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                    <option value="17:00">5:00 PM</option>
                    <option value="18:00">6:00 PM</option>
                  </select>
                </div>

                {/* Special Requests */}
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-secondary-900 mb-2">
                    Special Requests or Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    placeholder="Any specific requests or things we should know?"
                  />
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full" size="lg">
                  Confirm Booking
                </Button>
              </form>

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
