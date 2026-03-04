import { useState } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { HeroSection } from '@/components/common/HeroSection';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getHeroImage } from '@/lib/heroImages';

export function ConsultationPage() {
  const [selectedServiceArea, setSelectedServiceArea] = useState('');
  const [selectedProfessional, setSelectedProfessional] = useState('');
  const [selectedMeetingType, setSelectedMeetingType] = useState<'in_person' | 'video' | 'phone'>('in_person');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement consultation booking submission
    console.log('Consultation requested:', {
      serviceArea: selectedServiceArea,
      professional: selectedProfessional,
      meetingType: selectedMeetingType,
      date: selectedDate,
      time: selectedTime,
      notes,
    });
  };

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
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Service Area Selection */}
                <div>
                  <label htmlFor="serviceArea" className="block text-sm font-medium text-secondary-900 mb-2">
                    Practice Area
                  </label>
                  <select
                    id="serviceArea"
                    value={selectedServiceArea}
                    onChange={(e) => setSelectedServiceArea(e.target.value)}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a practice area...</option>
                    <option value="corporate">Corporate Law</option>
                    <option value="litigation">Litigation & Dispute Resolution</option>
                    <option value="real-estate">Real Estate Law</option>
                    <option value="estate-planning">Estate Planning & Probate</option>
                    <option value="employment">Employment Law</option>
                    <option value="other">Other / Not Sure</option>
                  </select>
                </div>

                {/* Attorney Selection */}
                <div>
                  <label htmlFor="professional" className="block text-sm font-medium text-secondary-900 mb-2">
                    Preferred Attorney (Optional)
                  </label>
                  <select
                    id="professional"
                    value={selectedProfessional}
                    onChange={(e) => setSelectedProfessional(e.target.value)}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">No Preference (We'll match you)</option>
                    <option value="michael">Michael Anderson - Managing Partner</option>
                    <option value="jennifer">Jennifer Chen - Senior Partner</option>
                    <option value="robert">Robert Martinez - Partner</option>
                    <option value="sarah">Sarah Thompson - Partner</option>
                    <option value="david">David Kim - Associate</option>
                    <option value="emily">Emily Rodriguez - Associate</option>
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
                      onClick={() => setSelectedMeetingType('in_person')}
                      className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                        selectedMeetingType === 'in_person'
                          ? 'border-primary-600 bg-primary-50 text-primary-700'
                          : 'border-secondary-300 bg-white text-secondary-700 hover:border-secondary-400'
                      }`}
                    >
                      In Person
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedMeetingType('video')}
                      className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                        selectedMeetingType === 'video'
                          ? 'border-primary-600 bg-primary-50 text-primary-700'
                          : 'border-secondary-300 bg-white text-secondary-700 hover:border-secondary-400'
                      }`}
                    >
                      Video Call
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedMeetingType('phone')}
                      className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                        selectedMeetingType === 'phone'
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
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Time Selection */}
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-secondary-900 mb-2">
                    Preferred Time
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
                  </select>
                </div>

                {/* Additional Notes */}
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-secondary-900 mb-2">
                    Brief Description of Your Legal Matter
                  </label>
                  <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    placeholder="Please provide a brief overview of your situation..."
                  />
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full" size="lg">
                  Request Consultation
                </Button>
              </form>

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
