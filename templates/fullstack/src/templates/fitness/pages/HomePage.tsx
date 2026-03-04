import { Link } from 'react-router-dom';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { HeroSection } from '@/components/common/HeroSection';
import { TestimonialCard } from '@/components/common/TestimonialCard';
import { CTABanner } from '@/components/common/CTABanner';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/site.config';
import { getHeroImage } from '@/lib/heroImages';
import { Dumbbell, Users, Calendar, Award } from 'lucide-react';

const features = [
  {
    icon: Dumbbell,
    title: 'Expert Training',
    description: 'Work with certified trainers who create personalized workout plans tailored to your goals',
  },
  {
    icon: Users,
    title: 'Group Classes',
    description: 'Join motivating group fitness classes from yoga to HIIT with all skill levels welcome',
  },
  {
    icon: Calendar,
    title: 'Flexible Schedule',
    description: 'Classes throughout the day to fit your busy lifestyle, 7 days a week',
  },
  {
    icon: Award,
    title: 'Proven Results',
    description: 'Evidence-based training methods that deliver real, measurable results',
  },
];

const popularClasses = [
  {
    name: 'HIIT',
    description: 'High-intensity interval training for maximum calorie burn',
    duration: '45 min',
    difficulty: 'Intermediate',
  },
  {
    name: 'Yoga Flow',
    description: 'Dynamic yoga sequences to build strength and flexibility',
    duration: '60 min',
    difficulty: 'All Levels',
  },
  {
    name: 'Strength Training',
    description: 'Build muscle and increase power with guided weightlifting',
    duration: '50 min',
    difficulty: 'All Levels',
  },
];

const testimonials = [
  {
    quote:
      'This gym completely changed my life. The trainers are knowledgeable and the community is incredibly supportive.',
    author: 'Marcus Johnson',
    rating: 5,
  },
  {
    quote:
      'I've tried other gyms but nothing compares. The classes are challenging yet accessible, and I've seen amazing results.',
    author: 'Lisa Chen',
    rating: 5,
  },
  {
    quote: 'Best decision I ever made for my health. The energy here is contagious and keeps me coming back.',
    author: 'Ryan Martinez',
    rating: 5,
  },
];

export function HomePage() {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <HeroSection
        tagline="Welcome to"
        headline={siteConfig.business.name}
        description={siteConfig.business.tagline}
        ctaText="View Class Schedule"
        ctaLink="/schedule"
        backgroundImage={getHeroImage('home') || undefined}
      />

      {/* Features */}
      <Section>
        <Container>
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4"
              style={{ letterSpacing: '-0.02em' }}
            >
              Why Train With Us
            </h2>
            <p
              className="text-lg text-secondary-600 max-w-2xl mx-auto"
              style={{ lineHeight: '1.7' }}
            >
              Everything you need to reach your fitness goals under one roof
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-secondary-900 mb-2">{feature.title}</h3>
                    <p className="text-secondary-600" style={{ lineHeight: '1.7' }}>
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Popular Classes */}
      <Section variant="secondary">
        <Container>
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4"
              style={{ letterSpacing: '-0.02em' }}
            >
              Popular Classes
            </h2>
            <p
              className="text-lg text-secondary-600 max-w-2xl mx-auto"
              style={{ lineHeight: '1.7' }}
            >
              Find the perfect class to match your fitness level and goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularClasses.map((classItem, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">{classItem.name}</h3>
                  <p className="text-secondary-600 mb-4" style={{ lineHeight: '1.7' }}>
                    {classItem.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-secondary-500 mb-4">
                    <span>{classItem.duration}</span>
                    <span>{classItem.difficulty}</span>
                  </div>
                  <Button asChild className="w-full">
                    <Link to="/schedule">See Schedule</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link to="/classes">View All Classes</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* About Section */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6"
                style={{ letterSpacing: '-0.02em' }}
              >
                More Than Just a Gym
              </h2>
              <p
                className="text-secondary-700 mb-4"
                style={{ lineHeight: '1.7' }}
              >
                We're a community of people committed to getting stronger, healthier, and pushing past
                their limits. Our certified trainers bring expertise and genuine care to every workout.
              </p>
              <p
                className="text-secondary-700 mb-6"
                style={{ lineHeight: '1.7' }}
              >
                Whether you're just starting out or training for competition, you'll find the support,
                equipment, and guidance you need to succeed.
              </p>
              <Button asChild variant="outline">
                <Link to="/trainers">Meet Our Trainers</Link>
              </Button>
            </div>
            <div className="aspect-square bg-secondary-200 rounded-lg">
              <div className="w-full h-full flex items-center justify-center text-secondary-400">
                <span>Gym Interior Image</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section variant="secondary">
        <Container>
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4"
              style={{ letterSpacing: '-0.02em' }}
            >
              Member Stories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Banner */}
      <CTABanner
        heading="Ready to Get Started?"
        description="Join our community and start your fitness journey today"
        ctaText="View Memberships"
        ctaLink="/memberships"
      />
    </PageWrapper>
  );
}
