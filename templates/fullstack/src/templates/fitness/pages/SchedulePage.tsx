import { useState } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { HeroSection } from '@/components/common/HeroSection';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getHeroImage } from '@/lib/heroImages';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Sample schedule data - in production this would come from the database
const sampleSchedule = {
  Monday: [
    { time: '06:00 AM', class: 'HIIT', instructor: 'Sarah Johnson', duration: '45 min', spots: 12 },
    { time: '07:00 AM', class: 'Yoga Flow', instructor: 'Michael Chen', duration: '60 min', spots: 8 },
    { time: '09:00 AM', class: 'Strength Training', instructor: 'Lisa Rodriguez', duration: '50 min', spots: 15 },
    { time: '12:00 PM', class: 'Spin Class', instructor: 'David Martinez', duration: '50 min', spots: 10 },
    { time: '05:30 PM', class: 'CrossFit', instructor: 'Sarah Johnson', duration: '60 min', spots: 5 },
    { time: '06:45 PM', class: 'Yoga Flow', instructor: 'Emily Thompson', duration: '60 min', spots: 12 },
  ],
  Tuesday: [
    { time: '06:00 AM', class: 'Bootcamp', instructor: 'David Martinez', duration: '45 min', spots: 8 },
    { time: '07:00 AM', class: 'Pilates', instructor: 'Emily Thompson', duration: '55 min', spots: 10 },
    { time: '09:00 AM', class: 'Senior Fitness', instructor: 'Michael Chen', duration: '45 min', spots: 15 },
    { time: '12:00 PM', class: 'Cardio Kickboxing', instructor: 'Lisa Rodriguez', duration: '45 min', spots: 12 },
    { time: '05:30 PM', class: 'Strength Training', instructor: 'Sarah Johnson', duration: '50 min', spots: 7 },
    { time: '06:45 PM', class: 'Barre', instructor: 'Emily Thompson', duration: '55 min', spots: 14 },
  ],
  Wednesday: [
    { time: '06:00 AM', class: 'HIIT', instructor: 'Sarah Johnson', duration: '45 min', spots: 10 },
    { time: '07:00 AM', class: 'Yoga Flow', instructor: 'Michael Chen', duration: '60 min', spots: 6 },
    { time: '09:00 AM', class: 'Mobility & Recovery', instructor: 'Emily Thompson', duration: '45 min', spots: 18 },
    { time: '12:00 PM', class: 'Spin Class', instructor: 'David Martinez', duration: '50 min', spots: 8 },
    { time: '05:30 PM', class: 'CrossFit', instructor: 'Lisa Rodriguez', duration: '60 min', spots: 4 },
    { time: '06:45 PM', class: 'Yoga Flow', instructor: 'Michael Chen', duration: '60 min', spots: 11 },
  ],
  Thursday: [
    { time: '06:00 AM', class: 'Bootcamp', instructor: 'David Martinez', duration: '45 min', spots: 9 },
    { time: '07:00 AM', class: 'Pilates', instructor: 'Emily Thompson', duration: '55 min', spots: 12 },
    { time: '09:00 AM', class: 'Strength Training', instructor: 'Sarah Johnson', duration: '50 min', spots: 16 },
    { time: '12:00 PM', class: 'Cardio Kickboxing', instructor: 'Lisa Rodriguez', duration: '45 min', spots: 10 },
    { time: '05:30 PM', class: 'Olympic Weightlifting', instructor: 'David Martinez', duration: '60 min', spots: 6 },
    { time: '06:45 PM', class: 'Meditation & Stretching', instructor: 'Michael Chen', duration: '45 min', spots: 20 },
  ],
  Friday: [
    { time: '06:00 AM', class: 'HIIT', instructor: 'Sarah Johnson', duration: '45 min', spots: 11 },
    { time: '07:00 AM', class: 'Yoga Flow', instructor: 'Emily Thompson', duration: '60 min', spots: 9 },
    { time: '09:00 AM', class: 'Strength Training', instructor: 'Lisa Rodriguez', duration: '50 min', spots: 14 },
    { time: '12:00 PM', class: 'Spin Class', instructor: 'David Martinez', duration: '50 min', spots: 7 },
    { time: '05:30 PM', class: 'Bootcamp', instructor: 'Sarah Johnson', duration: '45 min', spots: 5 },
    { time: '06:45 PM', class: 'Barre', instructor: 'Emily Thompson', duration: '55 min', spots: 13 },
  ],
  Saturday: [
    { time: '08:00 AM', class: 'CrossFit', instructor: 'David Martinez', duration: '60 min', spots: 8 },
    { time: '09:30 AM', class: 'Yoga Flow', instructor: 'Michael Chen', duration: '60 min', spots: 10 },
    { time: '11:00 AM', class: 'HIIT', instructor: 'Lisa Rodriguez', duration: '45 min', spots: 12 },
    { time: '12:30 PM', class: 'Strength Training', instructor: 'Sarah Johnson', duration: '50 min', spots: 15 },
  ],
  Sunday: [
    { time: '08:00 AM', class: 'Yoga Flow', instructor: 'Emily Thompson', duration: '60 min', spots: 12 },
    { time: '09:30 AM', class: 'Pilates', instructor: 'Michael Chen', duration: '55 min', spots: 14 },
    { time: '11:00 AM', class: 'Mobility & Recovery', instructor: 'Sarah Johnson', duration: '45 min', spots: 20 },
  ],
};

export function SchedulePage() {
  const today = new Date().getDay();
  const [selectedDay, setSelectedDay] = useState(daysOfWeek[today]);

  const todaySchedule = sampleSchedule[selectedDay as keyof typeof sampleSchedule] || [];

  return (
    <PageWrapper title="Class Schedule">
      <HeroSection
        headline="Class Schedule"
        description="Book your spot in upcoming classes"
        ctaText="View Memberships"
        ctaLink="/memberships"
        backgroundImage={getHeroImage('schedule') || undefined}
        align="center"
      />

      <Section className="!pt-32">
        <Container>
          {/* Day Selector */}
          <div className="flex overflow-x-auto gap-2 mb-12 pb-2">
            {daysOfWeek.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedDay === day
                    ? 'bg-primary-600 text-white'
                    : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Schedule Grid */}
          <div className="space-y-4">
            {todaySchedule.length > 0 ? (
              todaySchedule.map((session, index) => (
                <Card key={index} className="hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <span className="text-2xl font-bold text-primary-600">{session.time}</span>
                          <span className="text-xs px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full">
                            {session.duration}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-secondary-900 mb-1">{session.class}</h3>
                        <p className="text-secondary-600">with {session.instructor}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-secondary-600">Spots Available</p>
                          <p className="text-2xl font-bold text-secondary-900">{session.spots}</p>
                        </div>
                        <Button size="lg">Book Class</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-lg text-secondary-600">No classes scheduled for this day</p>
                </CardContent>
              </Card>
            )}
          </div>
        </Container>
      </Section>

      <Section variant="secondary">
        <Container size="narrow">
          <div className="text-center">
            <h2
              className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6"
              style={{ letterSpacing: '-0.02em' }}
            >
              Booking Policy
            </h2>
            <div className="text-left max-w-xl mx-auto">
              <ul className="space-y-3 text-secondary-700" style={{ lineHeight: '1.7' }}>
                <li>• Book your spot up to 7 days in advance</li>
                <li>• Arrive 10 minutes early for your first class</li>
                <li>• Cancel at least 2 hours before class start time</li>
                <li>• Late cancellations or no-shows may result in a credit deduction</li>
                <li>• Walk-ins welcome if spots are available</li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
