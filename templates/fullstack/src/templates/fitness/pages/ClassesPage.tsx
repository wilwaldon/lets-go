import { Link } from 'react-router-dom';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { HeroSection } from '@/components/common/HeroSection';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getHeroImage } from '@/lib/heroImages';

const classCategories = [
  {
    category: 'Strength & Conditioning',
    classes: [
      {
        name: 'Strength Training',
        description: 'Build muscle and increase power with guided weightlifting and resistance training',
        duration: '50 min',
        difficulty: 'All Levels',
        intensity: 'High',
      },
      {
        name: 'CrossFit',
        description: 'High-intensity functional movements combining cardio, weightlifting, and gymnastics',
        duration: '60 min',
        difficulty: 'Intermediate',
        intensity: 'Very High',
      },
      {
        name: 'Bootcamp',
        description: 'Military-inspired circuit training for total body conditioning',
        duration: '45 min',
        difficulty: 'Intermediate',
        intensity: 'High',
      },
    ],
  },
  {
    category: 'Cardio & HIIT',
    classes: [
      {
        name: 'HIIT',
        description: 'High-intensity interval training for maximum calorie burn and cardiovascular fitness',
        duration: '45 min',
        difficulty: 'Intermediate',
        intensity: 'Very High',
      },
      {
        name: 'Spin Class',
        description: 'Indoor cycling with varied intensity and terrain simulation',
        duration: '50 min',
        difficulty: 'All Levels',
        intensity: 'High',
      },
      {
        name: 'Cardio Kickboxing',
        description: 'Boxing and martial arts-inspired cardio workout',
        duration: '45 min',
        difficulty: 'All Levels',
        intensity: 'High',
      },
    ],
  },
  {
    category: 'Mind & Body',
    classes: [
      {
        name: 'Yoga Flow',
        description: 'Dynamic yoga sequences to build strength, flexibility, and mindfulness',
        duration: '60 min',
        difficulty: 'All Levels',
        intensity: 'Moderate',
      },
      {
        name: 'Pilates',
        description: 'Core-focused exercises to improve posture, flexibility, and body awareness',
        duration: '55 min',
        difficulty: 'All Levels',
        intensity: 'Moderate',
      },
      {
        name: 'Barre',
        description: 'Ballet-inspired workout combining Pilates, yoga, and strength training',
        duration: '55 min',
        difficulty: 'Beginner',
        intensity: 'Moderate',
      },
      {
        name: 'Meditation & Stretching',
        description: 'Guided meditation and deep stretching for recovery and stress relief',
        duration: '45 min',
        difficulty: 'Beginner',
        intensity: 'Low',
      },
    ],
  },
  {
    category: 'Specialty Classes',
    classes: [
      {
        name: 'Olympic Weightlifting',
        description: 'Learn proper technique for snatch, clean & jerk, and accessory lifts',
        duration: '60 min',
        difficulty: 'Advanced',
        intensity: 'High',
      },
      {
        name: 'Mobility & Recovery',
        description: 'Foam rolling, dynamic stretching, and mobility work for injury prevention',
        duration: '45 min',
        difficulty: 'All Levels',
        intensity: 'Low',
      },
      {
        name: 'Senior Fitness',
        description: 'Low-impact exercises designed for older adults to maintain strength and balance',
        duration: '45 min',
        difficulty: 'Beginner',
        intensity: 'Low',
      },
    ],
  },
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner':
      return 'bg-green-100 text-green-700';
    case 'Intermediate':
      return 'bg-yellow-100 text-yellow-700';
    case 'Advanced':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-blue-100 text-blue-700';
  }
};

export function ClassesPage() {
  return (
    <PageWrapper title="Classes">
      <HeroSection
        headline="Our Classes"
        description="From strength training to yoga, find the perfect class for your goals"
        ctaText="View Schedule"
        ctaLink="/schedule"
        backgroundImage={getHeroImage('classes') || undefined}
        align="center"
      />

      <Section className="!pt-32">
        <Container>
          <div className="space-y-16">
            {classCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2
                  className="text-2xl md:text-3xl font-bold text-secondary-900 mb-8"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {category.category}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.classes.map((classItem, classIndex) => (
                    <Card key={classIndex} className="hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-secondary-900 mb-2">{classItem.name}</h3>
                        <p className="text-secondary-600 mb-4" style={{ lineHeight: '1.7' }}>
                          {classItem.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className={`text-xs px-3 py-1 rounded-full ${getDifficultyColor(classItem.difficulty)}`}>
                            {classItem.difficulty}
                          </span>
                          <span className="text-xs px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full">
                            {classItem.duration}
                          </span>
                          <span className="text-xs px-3 py-1 bg-primary-100 text-primary-700 rounded-full">
                            {classItem.intensity} Intensity
                          </span>
                        </div>
                        <Button asChild size="sm" className="w-full">
                          <Link to="/schedule">Book Now</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
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
              New to Group Fitness?
            </h2>
            <p
              className="text-lg text-secondary-700 mb-8"
              style={{ lineHeight: '1.7' }}
            >
              Don't worry! Our instructors welcome all fitness levels and will provide modifications
              to ensure you get a great workout. Drop in anytime or book your spot online.
            </p>
            <Button asChild size="lg">
              <Link to="/schedule">View Today's Schedule</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
