import { PageWrapper } from '@/components/layout/PageWrapper';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { HeroSection } from '@/components/common/HeroSection';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getHeroImage } from '@/lib/heroImages';
import { Mail, Phone } from 'lucide-react';

const teamMembers = [
  {
    name: 'Michael Anderson',
    title: 'Managing Partner',
    bio: 'With over 25 years of experience in corporate law, Michael has advised hundreds of businesses through complex transactions and strategic initiatives. He is recognized as a leading expert in M&A and corporate governance.',
    specialties: ['Corporate Law', 'M&A', 'Securities'],
    credentials: ['J.D., Harvard Law School', 'Licensed in NY, CA', 'AV Rated Martindale-Hubbell'],
    email: 'manderson@firm.com',
    phone: '(555) 123-4567',
    image: '/images/team-michael.jpg',
  },
  {
    name: 'Jennifer Chen',
    title: 'Senior Partner',
    bio: 'Jennifer brings 20 years of litigation experience, with particular expertise in complex commercial disputes. Her strategic approach and courtroom skills have resulted in favorable outcomes for clients across industries.',
    specialties: ['Civil Litigation', 'Commercial Disputes', 'Mediation'],
    credentials: ['J.D., Stanford Law School', 'Licensed in CA, OR', 'Certified Mediator'],
    email: 'jchen@firm.com',
    phone: '(555) 123-4568',
    image: '/images/team-jennifer.jpg',
  },
  {
    name: 'Robert Martinez',
    title: 'Partner',
    bio: 'Robert focuses on real estate law and has handled transactions totaling over $2 billion. His deep understanding of real estate markets and zoning regulations makes him a trusted advisor for developers and investors.',
    specialties: ['Real Estate', 'Land Use', 'Development'],
    credentials: ['J.D., UCLA School of Law', 'Licensed in CA', 'Real Estate Broker License'],
    email: 'rmartinez@firm.com',
    phone: '(555) 123-4569',
    image: '/images/team-robert.jpg',
  },
  {
    name: 'Sarah Thompson',
    title: 'Partner',
    bio: 'Sarah is a compassionate attorney specializing in estate planning and elder law. She helps families navigate complex legacy planning with sensitivity and expertise, ensuring their wishes are honored.',
    specialties: ['Estate Planning', 'Probate', 'Elder Law'],
    credentials: ['J.D., Georgetown Law', 'Licensed in OR, WA', 'Certified Elder Law Attorney'],
    email: 'sthompson@firm.com',
    phone: '(555) 123-4570',
    image: '/images/team-sarah.jpg',
  },
  {
    name: 'David Kim',
    title: 'Associate',
    bio: 'David joined the firm after clerking for a federal judge. He brings fresh perspectives and meticulous attention to detail to corporate matters and commercial transactions.',
    specialties: ['Corporate Law', 'Contracts', 'Compliance'],
    credentials: ['J.D., Columbia Law School', 'Licensed in NY', 'Law Review Editor'],
    email: 'dkim@firm.com',
    phone: '(555) 123-4571',
    image: '/images/team-david.jpg',
  },
  {
    name: 'Emily Rodriguez',
    title: 'Associate',
    bio: 'Emily focuses on employment law and business litigation. Her proactive approach helps clients avoid disputes while providing vigorous representation when conflicts arise.',
    specialties: ['Employment Law', 'Business Litigation', 'Contract Disputes'],
    credentials: ['J.D., NYU School of Law', 'Licensed in CA', 'CELA Certification'],
    email: 'erodriguez@firm.com',
    phone: '(555) 123-4572',
    image: '/images/team-emily.jpg',
  },
];

export function TeamPage() {
  return (
    <PageWrapper title="Our Team">
      <HeroSection
        headline="Meet Our Team"
        description="Experienced attorneys committed to your success"
        ctaText="Schedule Consultation"
        ctaLink="/consultation"
        backgroundImage={getHeroImage('team') || undefined}
        align="center"
      />

      <Section className="!pt-32">
        <Container>
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4"
              style={{ letterSpacing: '-0.02em' }}
            >
              Dedicated Legal Professionals
            </h2>
            <p
              className="text-lg text-secondary-600 max-w-2xl mx-auto"
              style={{ lineHeight: '1.7' }}
            >
              Our team combines decades of experience with a client-first philosophy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="aspect-square bg-secondary-200">
                  <div className="w-full h-full flex items-center justify-center text-secondary-400">
                    <span className="text-sm">Photo: {member.name}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-secondary-900 mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-4">{member.title}</p>
                  <p className="text-secondary-600 mb-4" style={{ lineHeight: '1.7' }}>
                    {member.bio}
                  </p>

                  <div className="border-t border-secondary-200 pt-4 mb-4">
                    <p className="text-sm font-semibold text-secondary-900 mb-2">Practice Areas:</p>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1 bg-primary-50 text-primary-700 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-secondary-200 pt-4 mb-4">
                    <p className="text-sm font-semibold text-secondary-900 mb-2">Credentials:</p>
                    <ul className="space-y-1">
                      {member.credentials.map((cred, i) => (
                        <li key={i} className="text-xs text-secondary-600">
                          • {cred}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-secondary-200 pt-4 space-y-2">
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-2 text-sm text-secondary-600 hover:text-primary-600 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      {member.email}
                    </a>
                    <a
                      href={`tel:${member.phone}`}
                      className="flex items-center gap-2 text-sm text-secondary-600 hover:text-primary-600 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      {member.phone}
                    </a>
                  </div>

                  <div className="mt-4">
                    <Button asChild size="sm" className="w-full">
                      <a href="/consultation">Schedule Meeting</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
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
              Collaborative Approach
            </h2>
            <p
              className="text-lg text-secondary-700 mb-8"
              style={{ lineHeight: '1.7' }}
            >
              While each attorney brings specialized expertise, we work collaboratively to provide
              comprehensive legal solutions. You'll benefit from the collective knowledge and experience
              of our entire team.
            </p>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
