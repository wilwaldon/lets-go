import { Link } from 'react-router-dom';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { HeroSection } from '@/components/common/HeroSection';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getHeroImage } from '@/lib/heroImages';

const serviceAreas = [
  {
    area: 'Corporate Law',
    description: 'Comprehensive legal support for businesses of all sizes',
    services: [
      {
        name: 'Business Formation',
        description: 'Entity selection, incorporation, LLC formation, and partnership agreements',
        features: ['Entity structure advisory', 'Articles of incorporation', 'Operating agreements', 'Compliance setup'],
      },
      {
        name: 'Contracts & Agreements',
        description: 'Drafting, review, and negotiation of business contracts',
        features: ['Contract drafting', 'Terms negotiation', 'Risk assessment', 'Dispute resolution clauses'],
      },
      {
        name: 'Mergers & Acquisitions',
        description: 'Strategic guidance through M&A transactions',
        features: ['Due diligence', 'Deal structuring', 'Negotiation support', 'Closing coordination'],
      },
      {
        name: 'Corporate Governance',
        description: 'Board advisory, compliance, and corporate policies',
        features: ['Board advisory', 'Shareholder agreements', 'Corporate compliance', 'Policy development'],
      },
    ],
  },
  {
    area: 'Litigation & Dispute Resolution',
    description: 'Skilled representation in court and alternative dispute resolution',
    services: [
      {
        name: 'Civil Litigation',
        description: 'Representation in business disputes, contract matters, and civil claims',
        features: ['Case evaluation', 'Court representation', 'Motion practice', 'Trial advocacy'],
      },
      {
        name: 'Mediation Services',
        description: 'Facilitated negotiations to reach mutually acceptable solutions',
        features: ['Neutral mediation', 'Settlement facilitation', 'Conflict resolution', 'Agreement drafting'],
      },
      {
        name: 'Arbitration',
        description: 'Representation in binding and non-binding arbitration proceedings',
        features: ['Arbitration advocacy', 'Evidence presentation', 'Expert coordination', 'Award enforcement'],
      },
    ],
  },
  {
    area: 'Real Estate Law',
    description: 'Full-service real estate legal support',
    services: [
      {
        name: 'Commercial Transactions',
        description: 'Purchase, sale, and leasing of commercial properties',
        features: ['Purchase agreements', 'Due diligence', 'Title review', 'Closing services'],
      },
      {
        name: 'Residential Real Estate',
        description: 'Legal support for home buyers and sellers',
        features: ['Contract review', 'Title insurance', 'Closing representation', 'Dispute resolution'],
      },
      {
        name: 'Development & Zoning',
        description: 'Land use, zoning approvals, and development projects',
        features: ['Zoning applications', 'Land use permits', 'Development agreements', 'Municipal approvals'],
      },
      {
        name: 'Landlord-Tenant',
        description: 'Lease agreements, disputes, and eviction proceedings',
        features: ['Lease drafting', 'Eviction proceedings', 'Security deposit disputes', 'Tenant rights'],
      },
    ],
  },
  {
    area: 'Estate Planning & Probate',
    description: 'Protecting your legacy and managing estates',
    services: [
      {
        name: 'Wills & Trusts',
        description: 'Comprehensive estate planning documents',
        features: ['Will preparation', 'Living trusts', 'Revocable trusts', 'Asset protection'],
      },
      {
        name: 'Probate Administration',
        description: 'Guiding executors through the probate process',
        features: ['Estate administration', 'Court filings', 'Asset distribution', 'Creditor claims'],
      },
      {
        name: 'Elder Law',
        description: 'Planning for long-term care and Medicaid eligibility',
        features: ['Medicaid planning', 'Long-term care', 'Guardianships', 'Powers of attorney'],
      },
      {
        name: 'Tax Planning',
        description: 'Minimizing estate and gift tax exposure',
        features: ['Estate tax planning', 'Gift strategies', 'Charitable giving', 'Generation-skipping trusts'],
      },
    ],
  },
];

export function ServicesPage() {
  return (
    <PageWrapper title="Services">
      <HeroSection
        headline="Our Services"
        description="Comprehensive legal solutions tailored to your needs"
        ctaText="Schedule Consultation"
        ctaLink="/consultation"
        backgroundImage={getHeroImage('services') || undefined}
        align="center"
      />

      <Section className="!pt-32">
        <Container>
          <div className="space-y-16">
            {serviceAreas.map((area, areaIndex) => (
              <div key={areaIndex}>
                <div className="mb-8">
                  <h2
                    className="text-2xl md:text-3xl font-bold text-secondary-900 mb-2"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {area.area}
                  </h2>
                  <p className="text-lg text-secondary-600" style={{ lineHeight: '1.7' }}>
                    {area.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {area.services.map((service, serviceIndex) => (
                    <Card key={serviceIndex} className="hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-secondary-900 mb-2">{service.name}</h3>
                        <p className="text-secondary-600 mb-4" style={{ lineHeight: '1.7' }}>
                          {service.description}
                        </p>
                        <ul className="space-y-2 mb-4">
                          {service.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-secondary-700">
                              <span className="text-primary-600 mt-1">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button asChild size="sm" variant="outline" className="w-full">
                          <Link to="/consultation">Schedule Consultation</Link>
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
              Personalized Approach
            </h2>
            <p
              className="text-lg text-secondary-700 mb-8"
              style={{ lineHeight: '1.7' }}
            >
              Every client's situation is unique. We take the time to understand your specific needs
              and goals, then develop a tailored strategy to achieve the best possible outcome.
            </p>
            <Button asChild size="lg">
              <Link to="/consultation">Discuss Your Needs</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
