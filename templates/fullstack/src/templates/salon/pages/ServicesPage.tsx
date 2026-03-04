import { Link } from 'react-router-dom';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { HeroSection } from '@/components/common/HeroSection';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getHeroImage } from '@/lib/heroImages';

const serviceCategories = [
  {
    category: 'Hair Services',
    services: [
      {
        name: 'Women\'s Haircut',
        description: 'Precision cut with wash and style',
        duration: '60 min',
        price: 65,
      },
      {
        name: 'Men\'s Haircut',
        description: 'Classic or modern cuts with styling',
        duration: '45 min',
        price: 45,
      },
      {
        name: 'Children\'s Haircut',
        description: 'Fun, comfortable cuts for kids 12 and under',
        duration: '30 min',
        price: 35,
      },
      {
        name: 'Blowout & Style',
        description: 'Professional wash, blow dry, and styling',
        duration: '45 min',
        price: 50,
      },
    ],
  },
  {
    category: 'Color Services',
    services: [
      {
        name: 'Full Color',
        description: 'All-over color with toner',
        duration: '2-3 hrs',
        price: 150,
      },
      {
        name: 'Partial Highlights',
        description: 'Dimensional highlights around face',
        duration: '2 hrs',
        price: 135,
      },
      {
        name: 'Full Highlights',
        description: 'Complete highlight application',
        duration: '3 hrs',
        price: 180,
      },
      {
        name: 'Balayage',
        description: 'Hand-painted highlights for natural dimension',
        duration: '3-4 hrs',
        price: 200,
      },
      {
        name: 'Color Correction',
        description: 'Fixing previous color work',
        duration: '4+ hrs',
        price: 300,
      },
    ],
  },
  {
    category: 'Treatment Services',
    services: [
      {
        name: 'Deep Conditioning',
        description: 'Intensive moisture and repair treatment',
        duration: '30 min',
        price: 40,
      },
      {
        name: 'Keratin Treatment',
        description: 'Smoothing and frizz reduction',
        duration: '3 hrs',
        price: 250,
      },
      {
        name: 'Scalp Treatment',
        description: 'Detoxifying scalp massage and treatment',
        duration: '45 min',
        price: 55,
      },
    ],
  },
  {
    category: 'Special Occasion',
    services: [
      {
        name: 'Updo Styling',
        description: 'Elegant updos for weddings and events',
        duration: '90 min',
        price: 120,
      },
      {
        name: 'Bridal Package',
        description: 'Trial run plus wedding day styling',
        duration: 'Custom',
        price: 350,
      },
      {
        name: 'Makeup Application',
        description: 'Professional makeup for any occasion',
        duration: '60 min',
        price: 85,
      },
    ],
  },
];

export function ServicesPage() {
  return (
    <PageWrapper title="Services">
      <HeroSection
        headline="Our Services"
        description="Expert hair care, coloring, and styling services tailored to you"
        ctaText="Book an Appointment"
        ctaLink="/booking"
        backgroundImage={getHeroImage('services') || undefined}
        align="center"
      />

      <Section className="!pt-32">
        <Container>
          <div className="space-y-16">
            {serviceCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2
                  className="text-2xl md:text-3xl font-bold text-secondary-900 mb-8"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {category.category}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.services.map((service, serviceIndex) => (
                    <Card key={serviceIndex} className="hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-semibold text-secondary-900">{service.name}</h3>
                          <span className="text-lg font-bold text-primary-600">
                            ${service.price}+
                          </span>
                        </div>
                        <p className="text-secondary-600 mb-3" style={{ lineHeight: '1.7' }}>
                          {service.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-secondary-500">{service.duration}</span>
                          <Button asChild size="sm">
                            <Link to="/booking">Book</Link>
                          </Button>
                        </div>
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
              Premium Products
            </h2>
            <p
              className="text-lg text-secondary-700 mb-8"
              style={{ lineHeight: '1.7' }}
            >
              We use only professional-grade products from trusted brands including Redken, Olaplex,
              and Moroccan Oil to ensure the best results for your hair.
            </p>
            <Button asChild size="lg">
              <Link to="/booking">Schedule Your Visit</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
