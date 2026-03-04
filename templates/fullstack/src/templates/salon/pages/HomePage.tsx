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
import { Scissors, Sparkles, Clock } from 'lucide-react';

const featuredServices = [
  {
    id: '1',
    icon: Scissors,
    name: 'Haircut & Style',
    description: 'Expert cuts tailored to your face shape and style preferences',
    price: 65,
  },
  {
    id: '2',
    icon: Sparkles,
    name: 'Color Services',
    description: 'Full color, highlights, balayage, and color correction',
    price: 150,
  },
  {
    id: '3',
    icon: Clock,
    name: 'Express Service',
    description: 'Quick touch-ups, blowouts, and styling for busy schedules',
    price: 45,
  },
];

const testimonials = [
  {
    quote:
      'Best salon experience I've ever had! The stylist really listened and gave me exactly what I wanted.',
    author: 'Jessica Martinez',
    rating: 5,
  },
  {
    quote:
      'Amazing color work and the atmosphere is so relaxing. I always leave feeling refreshed and beautiful.',
    author: 'Rachel Kim',
    rating: 5,
  },
  {
    quote: 'The team here is incredibly talented. I trust them completely with my hair.',
    author: 'Amanda Chen',
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
        ctaText="Book an Appointment"
        ctaLink="/booking"
        backgroundImage={getHeroImage('home') || undefined}
      />

      {/* Featured Services */}
      <Section>
        <Container>
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4"
              style={{ letterSpacing: '-0.02em' }}
            >
              Our Signature Services
            </h2>
            <p
              className="text-lg text-secondary-600 max-w-2xl mx-auto"
              style={{ lineHeight: '1.7' }}
            >
              Transform your look with our expert stylists and premium products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.id} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-6">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-secondary-900 mb-2">{service.name}</h3>
                    <p className="text-secondary-600 mb-4" style={{ lineHeight: '1.7' }}>
                      {service.description}
                    </p>
                    <div className="text-2xl font-bold text-primary-600 mb-4">
                      ${service.price}+
                    </div>
                    <Button asChild className="w-full">
                      <Link to="/booking">Book Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* About Section */}
      <Section variant="secondary">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6"
                style={{ letterSpacing: '-0.02em' }}
              >
                Where Style Meets Expertise
              </h2>
              <p
                className="text-secondary-700 mb-4"
                style={{ lineHeight: '1.7' }}
              >
                Our team of master stylists brings years of training and passion to every appointment.
                We stay current with the latest trends while honoring timeless techniques.
              </p>
              <p
                className="text-secondary-700 mb-6"
                style={{ lineHeight: '1.7' }}
              >
                From precision cuts to vibrant color transformations, we're dedicated to helping you
                look and feel your absolute best.
              </p>
              <Button asChild variant="outline">
                <Link to="/team">Meet Our Team</Link>
              </Button>
            </div>
            <div className="aspect-square bg-secondary-200 rounded-lg">
              <div className="w-full h-full flex items-center justify-center text-secondary-400">
                <span>Salon Interior Image</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section>
        <Container>
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4"
              style={{ letterSpacing: '-0.02em' }}
            >
              Client Love
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
        heading="Ready for a Fresh Look?"
        description="Book your appointment online and let our expert stylists bring your vision to life"
        ctaText="Book an Appointment"
        ctaLink="/booking"
      />
    </PageWrapper>
  );
}
