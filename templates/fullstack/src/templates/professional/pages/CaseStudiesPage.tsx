import { PageWrapper } from '@/components/layout/PageWrapper';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { HeroSection } from '@/components/common/HeroSection';
import { Card, CardContent } from '@/components/ui/Card';
import { getHeroImage } from '@/lib/heroImages';

const caseStudies = [
  {
    title: 'Tech Startup Acquisition',
    category: 'Corporate Law',
    description: 'Represented a rapidly growing SaaS company through acquisition by Fortune 500 tech giant',
    challenge: 'Client needed to navigate complex due diligence while maintaining business operations and protecting intellectual property rights during the transaction process.',
    solution: 'Coordinated comprehensive legal review across multiple practice areas, negotiated favorable terms that protected key employees and IP, and structured deal to minimize tax implications.',
    results: '$45M acquisition successfully closed within 90 days with optimal terms for shareholders and management team.',
  },
  {
    title: 'Commercial Real Estate Development',
    category: 'Real Estate',
    description: 'Guided developer through zoning approval and financing for mixed-use urban project',
    challenge: 'Project faced significant zoning challenges and community opposition. Required creative legal strategies to gain necessary approvals while addressing stakeholder concerns.',
    solution: 'Developed comprehensive community engagement strategy, negotiated with planning commission, structured innovative financing arrangement, and secured all necessary permits.',
    results: '$120M mixed-use development approved and funded, creating 200 jobs and revitalizing downtown corridor.',
  },
  {
    title: 'Business Partnership Dissolution',
    category: 'Litigation',
    description: 'Resolved complex partnership dispute for family-owned manufacturing business',
    challenge: 'Multi-generational family business faced contentious partnership dissolution with disputes over valuation, ownership interests, and operational control.',
    solution: 'Facilitated mediation process that addressed both business and family dynamics, worked with forensic accountants for fair valuation, and structured buyout agreement.',
    results: 'Dispute resolved through mediation without litigation. Business preserved and relationships maintained. Settlement saved estimated $500K in legal fees.',
  },
  {
    title: 'Estate Tax Planning Strategy',
    category: 'Estate Planning',
    description: 'Implemented comprehensive estate plan for high-net-worth family with complex assets',
    challenge: 'Family with $50M+ estate spanning multiple states needed to minimize tax exposure while ensuring smooth succession and protecting assets for future generations.',
    solution: 'Created sophisticated trust structure combining GRATs, CRTs, and generation-skipping trusts. Coordinated with tax advisors for optimal strategy.',
    results: 'Reduced potential estate tax liability by approximately $8M. Assets protected and succession plan established with clear governance structure.',
  },
  {
    title: 'Environmental Compliance Defense',
    category: 'Litigation',
    description: 'Defended manufacturing client against EPA enforcement action',
    challenge: 'Client faced significant penalties and potential facility closure due to alleged environmental violations with complex technical and regulatory issues.',
    solution: 'Assembled team of environmental experts, negotiated with regulatory agencies, developed comprehensive compliance plan, and secured favorable settlement.',
    results: 'Penalties reduced by 75%, facility remained operational, compliance program established that exceeded regulatory requirements.',
  },
  {
    title: 'Franchise System Expansion',
    category: 'Corporate Law',
    description: 'Structured franchise agreements for regional restaurant chain going national',
    challenge: 'Growing restaurant brand needed robust franchise system to support nationwide expansion while protecting brand integrity and ensuring franchisee success.',
    solution: 'Drafted comprehensive franchise disclosure documents and agreements, structured territory strategy, and developed franchise operations manual compliant with FTC regulations.',
    results: 'Successfully launched franchise program in 15 states within first year. 40+ franchises sold with strong unit economics and brand consistency.',
  },
];

export function CaseStudiesPage() {
  return (
    <PageWrapper title="Case Studies">
      <HeroSection
        headline="Case Studies"
        description="Examples of how we've helped clients achieve their goals"
        ctaText="Discuss Your Case"
        ctaLink="/consultation"
        backgroundImage={getHeroImage('case-studies') || undefined}
        align="center"
      />

      <Section className="!pt-32">
        <Container>
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4"
              style={{ letterSpacing: '-0.02em' }}
            >
              Proven Results
            </h2>
            <p
              className="text-lg text-secondary-600 max-w-2xl mx-auto"
              style={{ lineHeight: '1.7' }}
            >
              Real outcomes for real clients across our practice areas
            </p>
          </div>

          <div className="space-y-8">
            {caseStudies.map((study, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-secondary-900 mb-2">{study.title}</h3>
                      <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
                        {study.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-lg text-secondary-700 mb-6" style={{ lineHeight: '1.7' }}>
                    {study.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-secondary-900 mb-2">Challenge</h4>
                      <p className="text-sm text-secondary-600" style={{ lineHeight: '1.7' }}>
                        {study.challenge}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 mb-2">Solution</h4>
                      <p className="text-sm text-secondary-600" style={{ lineHeight: '1.7' }}>
                        {study.solution}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 mb-2">Results</h4>
                      <p className="text-sm text-secondary-600" style={{ lineHeight: '1.7' }}>
                        {study.results}
                      </p>
                    </div>
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
              Your Success Story Starts Here
            </h2>
            <p
              className="text-lg text-secondary-700 mb-8"
              style={{ lineHeight: '1.7' }}
            >
              Every case is unique, but our approach is consistent: understand the challenge, develop
              a strategic solution, and execute with excellence. Schedule a consultation to discuss
              how we can help you achieve your objectives.
            </p>
            <a
              href="/consultation"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Schedule Consultation
            </a>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="narrow">
          <Card className="bg-secondary-50">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-secondary-900 mb-4 text-center">Client Confidentiality</h3>
              <p className="text-secondary-700 text-center" style={{ lineHeight: '1.7' }}>
                These case studies represent general scenarios and outcomes. Client confidentiality is
                paramount, and specific identifying details have been modified or omitted. Results in
                any legal matter depend on the unique facts and circumstances of each case.
              </p>
            </CardContent>
          </Card>
        </Container>
      </Section>
    </PageWrapper>
  );
}
