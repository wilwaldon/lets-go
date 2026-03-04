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
import { Scale, Users, Award, Shield } from 'lucide-react';

const values = [
  {
    icon: Scale,
    title: 'Expert Counsel',
    description: 'Decades of combined experience delivering strategic solutions to complex challenges',
  },
  {
    icon: Users,
    title: 'Client-Focused',
    description: 'We take time to understand your unique situation and tailor our approach accordingly',
  },
  {
    icon: Award,
    title: 'Proven Results',
    description: 'Track record of successful outcomes for businesses and individuals across industries',
  },
  {
    icon: Shield,
    title: 'Trusted Advisors',
    description: 'Building long-term relationships based on integrity, confidentiality, and excellence',
  },
];

const serviceAreas = [
  {
    name: 'Corporate Law',
    description: 'Business formation, contracts, mergers and acquisitions, corporate governance',
    icon: '🏢',
  },
  {
    name: 'Litigation',
    description: 'Civil litigation, dispute resolution, mediation and arbitration services',
    icon: '⚖️',
  },
  {
    name: 'Real Estate',
    description: 'Property transactions, leasing, development, and real estate litigation',
    icon: '🏠',
  },
  {
    name: 'Estate Planning',
    description: 'Wills, trusts, probate administration, and wealth preservation strategies',
    icon: '📋',
  },
];

const testimonials = [
  {
    quote:
      'Outstanding legal counsel. They took the time to understand our business and provided strategic advice that was instrumental to our success.',
    author: 'Jennifer Park, CEO',
    rating: 5,
  },
  {
    quote:
      'Professional, knowledgeable, and responsive. They navigated us through a complex transaction with expertise and care.',
    author: 'Robert Chen, Business Owner',
    rating: 5,
  },
  {
    quote: 'I trust them completely with my legal matters. Their attention to detail and commitment to clients is exceptional.',
    author: 'Sarah Martinez, Client',
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
        ctaText="Schedule a Consultation"
        ctaLink="/consultation"
        backgroundImage={getHeroImage('home') || undefined}
      />

      {/* Values */}
      <Section>
        <Container>
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4"
              style={{ letterSpacing: '-0.02em' }}
            >
              Why Choose Us
            </h2>
            <p
              className="text-lg text-secondary-600 max-w-2xl mx-auto"
              style={{ lineHeight: '1.7' }}
            >
              Committed to delivering exceptional legal services with integrity and professionalism
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-secondary-900 mb-2">{value.title}</h3>
                    <p className="text-secondary-600" style={{ lineHeight: '1.7' }}>
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Service Areas */}
      <Section variant="secondary">
        <Container>
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4"
              style={{ letterSpacing: '-0.02em' }}
            >
              Practice Areas
            </h2>
            <p
              className="text-lg text-secondary-600 max-w-2xl mx-auto"
              style={{ lineHeight: '1.7' }}
            >
              Comprehensive legal services tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceAreas.map((area, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="text-4xl mb-4">{area.icon}</div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">{area.name}</h3>
                  <p className="text-secondary-600 mb-4" style={{ lineHeight: '1.7' }}>
                    {area.description}
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/services">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/services">View All Services</Link>
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
                Experience You Can Trust
              </h2>
              <p
                className="text-secondary-700 mb-4"
                style={{ lineHeight: '1.7' }}
              >
                Our firm combines deep legal expertise with a genuine commitment to understanding and
                achieving our clients' objectives. We approach each matter with diligence, creativity,
                and strategic thinking.
              </p>
              <p
                className="text-secondary-700 mb-6"
                style={{ lineHeight: '1.7' }}
              >
                Whether you're a business navigating complex transactions or an individual seeking
                trusted counsel, we're here to provide the guidance and representation you need.
              </p>
              <Button asChild variant="outline">
                <Link to="/team">Meet Our Team</Link>
              </Button>
            </div>
            <div className="aspect-square bg-secondary-200 rounded-lg">
              <div className="w-full h-full flex items-center justify-center text-secondary-400">
                <span>Office Interior Image</span>
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
              Client Testimonials
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
        description="Schedule a consultation to discuss your legal needs with our experienced team"
        ctaText="Schedule Consultation"
        ctaLink="/consultation"
      />
    </PageWrapper>
  );
}
