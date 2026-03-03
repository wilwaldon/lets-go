import React from 'react';
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

const featuredItems = [
  {
    id: '1',
    name: 'Signature Burger',
    description: 'Our famous grass-fed beef burger with house-made sauce',
    price: 16.99,
    image: '/images/burger.jpg',
  },
  {
    id: '2',
    name: 'Seasonal Salad',
    description: 'Fresh local greens with seasonal vegetables',
    price: 14.99,
    image: '/images/salad.jpg',
  },
  {
    id: '3',
    name: 'Artisan Pizza',
    description: 'Wood-fired pizza with fresh mozzarella',
    price: 18.99,
    image: '/images/pizza.jpg',
  },
];

const testimonials = [
  {
    quote:
      'Best restaurant in town! The food is always fresh and the service is exceptional.',
    author: 'Sarah Johnson',
    rating: 5,
  },
  {
    quote:
      "I've been coming here for years and it never disappoints. Highly recommend the burger!",
    author: 'Mike Chen',
    rating: 5,
  },
  {
    quote: 'A hidden gem! The atmosphere is cozy and the menu has something for everyone.',
    author: 'Emily Rodriguez',
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
        ctaText="View Our Menu"
        ctaLink="/menu"
      />

      {/* Featured Items */}
      <Section>
        <Container>
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4"
              style={{ letterSpacing: '-0.02em' }}
            >
              Featured Dishes
            </h2>
            <p
              className="text-lg text-secondary-600 max-w-2xl mx-auto"
              style={{ lineHeight: '1.7' }}
            >
              Discover our chef's favorite creations, crafted with the finest local ingredients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-video bg-secondary-200">
                  {/* Placeholder for featured item image */}
                  <div className="w-full h-full flex items-center justify-center text-secondary-400">
                    <span className="text-sm">Image: {item.name}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-secondary-900">{item.name}</h3>
                    <span className="text-lg font-bold text-primary-600">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-secondary-600 mb-4" style={{ lineHeight: '1.7' }}>
                    {item.description}
                  </p>
                  <Button asChild className="w-full">
                    <Link to="/menu">Order Now</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
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
                Our Story
              </h2>
              <p
                className="text-secondary-700 mb-4"
                style={{ lineHeight: '1.7' }}
              >
                Since opening our doors, we've been committed to serving delicious, locally-sourced
                food in a warm and welcoming atmosphere.
              </p>
              <p
                className="text-secondary-700 mb-6"
                style={{ lineHeight: '1.7' }}
              >
                Every dish is prepared with care, using recipes passed down through generations and
                ingredients from our trusted local farmers and suppliers.
              </p>
              <Button asChild variant="outline">
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>
            <div className="aspect-square bg-secondary-200 rounded-lg">
              {/* Placeholder for restaurant image */}
              <div className="w-full h-full flex items-center justify-center text-secondary-400">
                <span>Restaurant Image</span>
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
              What Our Customers Say
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
        heading="Ready to Order?"
        description="Check out our full menu and place your order online for pickup or delivery"
        ctaText="View Menu"
        ctaLink="/menu"
      />
    </PageWrapper>
  );
}
