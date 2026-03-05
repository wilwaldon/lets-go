import { useState } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { HeroSection } from '@/components/common/HeroSection';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getHeroImage } from '@/lib/heroImages';
import { useClassSessions } from '@/modules/classes/hooks/useClassSessions';
import { BookingModal } from '../components/BookingModal';
import type { ClassSession } from '@/modules/classes/types';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function SchedulePage() {
  const today = new Date().getDay();
  const [selectedDay, setSelectedDay] = useState(daysOfWeek[today]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassSession | null>(null);

  const { classSessions, isLoading, refetch } = useClassSessions();

  // Filter sessions by selected day
  const dayIndex = daysOfWeek.indexOf(selectedDay);
  const todaySchedule = classSessions
    .filter((session) => session.dayOfWeek === dayIndex && session.isActive)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const handleBookClass = (classSession: ClassSession) => {
    setSelectedClass(classSession);
    setIsModalOpen(true);
  };

  const handleBookingSuccess = () => {
    refetch();
  };

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

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12 text-secondary-600">
              Loading class schedule...
            </div>
          )}

          {/* Schedule Grid */}
          {!isLoading && (
            <div className="space-y-4">
              {todaySchedule.length > 0 ? (
                todaySchedule.map((session) => (
                  <Card key={session.id} className="hover:shadow-md transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <span className="text-2xl font-bold text-primary-600">
                              {formatTime(session.startTime)}
                            </span>
                            <span className="text-xs px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full">
                              {session.duration} min
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-secondary-900 mb-1">{session.name}</h3>
                          {session.instructor && (
                            <p className="text-secondary-600">with {session.instructor}</p>
                          )}
                          {session.description && (
                            <p className="text-sm text-secondary-600 mt-2">{session.description}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-4">
                          {session.maxCapacity && (
                            <div className="text-right">
                              <p className="text-sm text-secondary-600">Max Capacity</p>
                              <p className="text-2xl font-bold text-secondary-900">{session.maxCapacity}</p>
                            </div>
                          )}
                          <Button
                            size="lg"
                            onClick={() => handleBookClass(session)}
                          >
                            Book Class
                          </Button>
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
          )}
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

      {/* Booking Modal */}
      {isModalOpen && selectedClass && (
        <BookingModal
          classSession={selectedClass}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedClass(null);
          }}
          onSuccess={handleBookingSuccess}
        />
      )}
    </PageWrapper>
  );
}
