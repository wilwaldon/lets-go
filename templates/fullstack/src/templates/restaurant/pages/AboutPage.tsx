import React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { TeamCard } from '@/components/common/TeamCard';
import { BusinessHours } from '@/components/common/BusinessHours';
import { siteConfig } from '@/config/site.config';

const teamMembers = [
  {
    name: 'Chef Maria Garcia',
    title: 'Head Chef',
    bio: 'With over 20 years of culinary experience, Chef Maria brings passion and creativity to every dish.',
    imageUrl: '',
  },
  {
    name: 'John Smith',
    title: 'Restaurant Manager',
    bio: 'John ensures every guest has an exceptional dining experience from start to finish.',
    imageUrl: '',
  },
  {
    name: 'Lisa Chen',
    title: 'Pastry Chef',
    bio: 'Lisa creates our delicious desserts using traditional techniques and local ingredients.',
    imageUrl: '',
  },
];

export function AboutPage() {
  return (
    <PageWrapper title="About Us" description="Learn about our story, team, and commitment to quality">
      {/* Hero Section */}
      <Section spacing="tight" className="pt-24">
        <Container>
          <div className="text-center mb-8">
            <h1
              className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4"
              style={{ letterSpacing: '-0.02em' }}
            >
              About {siteConfig.business.name}
            </h1>
            <p
              className="text-lg text-secondary-600 max-w-2xl mx-auto"
              style={{ lineHeight: '1.7' }}
            >
              {siteConfig.business.tagline}
            </p>
          </div>
        </Container>
      </Section>

      {/* Our Story */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="aspect-square bg-secondary-200 rounded-lg">
              {/* Placeholder for story image */}
              <div className="w-full h-full flex items-center justify-center text-secondary-400">
                <span>Restaurant Story Image</span>
              </div>
            </div>

            <div>
              <h2
                className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6"
                style={{ letterSpacing: '-0.02em' }}
              >
                Our Story
              </h2>
              <div className="space-y-4 text-secondary-700" style={{ lineHeight: '1.7' }}>
                <p>
                  Founded in 2010, {siteConfig.business.name} has been serving the community with
                  delicious, locally-sourced food in a warm and welcoming atmosphere.
                </p>
                <p>
                  Our commitment to quality starts with our ingredients. We partner with local
                  farmers and suppliers to bring you the freshest seasonal produce, meats, and
                  dairy products.
                </p>
                <p>
                  Every dish is prepared with care using recipes that have been refined over years
                  of cooking and experimentation. We believe great food brings people together and
                  creates lasting memories.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Our Values */}
      <Section variant="secondary">
        <Container>
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4"
              style={{ letterSpacing: '-0.02em' }}
            >
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Local & Fresh</h3>
              <p className="text-secondary-600" style={{ lineHeight: '1.7' }}>
                We source ingredients from local farms and suppliers to ensure the highest quality
                and support our community.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👨‍🍳</span>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                Crafted with Care
              </h3>
              <p className="text-secondary-600" style={{ lineHeight: '1.7' }}>
                Every dish is prepared by our experienced chefs who pour their passion and expertise
                into each plate.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">❤️</span>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                Community Focused
              </h3>
              <p className="text-secondary-600" style={{ lineHeight: '1.7' }}>
                We're more than a restaurant—we're a gathering place for our community to connect
                over great food.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Meet the Team */}
      <Section>
        <Container>
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4"
              style={{ letterSpacing: '-0.02em' }}
            >
              Meet Our Team
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <TeamCard key={member.name} {...member} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Hours & Location */}
      <Section variant="light">
        <Container size="narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BusinessHours />

            <div className="bg-white rounded-lg border border-secondary-200 p-6">
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">Visit Us</h3>
              <div className="space-y-2 text-secondary-700">
                <p>{siteConfig.business.address.street}</p>
                <p>
                  {siteConfig.business.address.city}, {siteConfig.business.address.state}{' '}
                  {siteConfig.business.address.zip}
                </p>
                <p className="pt-4">
                  <a
                    href={`tel:${siteConfig.business.phone}`}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    {siteConfig.business.phone}
                  </a>
                </p>
                <p>
                  <a
                    href={`mailto:${siteConfig.business.email}`}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    {siteConfig.business.email}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
