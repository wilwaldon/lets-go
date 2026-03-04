import { PageWrapper } from '@/components/layout/PageWrapper';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { HeroSection } from '@/components/common/HeroSection';
import { Card, CardContent } from '@/components/ui/Card';
import { getHeroImage } from '@/lib/heroImages';

const teamMembers = [
  {
    name: 'Sarah Martinez',
    title: 'Master Stylist & Owner',
    bio: 'With over 15 years of experience, Sarah specializes in cutting-edge color techniques and precision cuts. She trained in New York and Paris before opening our salon.',
    specialties: ['Color Specialist', 'Balayage Expert', 'Bridal Styling'],
    image: '/images/team-sarah.jpg',
  },
  {
    name: 'Michael Chen',
    title: 'Senior Stylist',
    bio: 'Michael brings a modern edge to classic styles. His attention to detail and ability to understand each client\'s unique needs make him a client favorite.',
    specialties: ['Men\'s Cuts', 'Precision Styling', 'Texture Expert'],
    image: '/images/team-michael.jpg',
  },
  {
    name: 'Jessica Thompson',
    title: 'Color Specialist',
    bio: 'Jessica is passionate about creating beautiful, dimensional color. She stays current with the latest techniques and loves bringing clients\' color dreams to life.',
    specialties: ['Color Correction', 'Highlights', 'Creative Color'],
    image: '/images/team-jessica.jpg',
  },
  {
    name: 'David Rodriguez',
    title: 'Senior Stylist',
    bio: 'David\'s calm demeanor and expert technique make every appointment relaxing and transformative. He excels at both classic and contemporary styles.',
    specialties: ['Classic Cuts', 'Blowouts', 'Extensions'],
    image: '/images/team-david.jpg',
  },
  {
    name: 'Emma Wilson',
    title: 'Stylist',
    bio: 'Emma brings fresh energy and creativity to the team. She loves working with clients to find styles that fit their lifestyle and personality.',
    specialties: ['Curly Hair', 'Updos', 'Keratin Treatments'],
    image: '/images/team-emma.jpg',
  },
  {
    name: 'Alex Kim',
    title: 'Stylist',
    bio: 'Alex combines technical expertise with artistic vision. Their consultations ensure you leave with exactly the look you envisioned.',
    specialties: ['Fashion Cuts', 'Color', 'Styling'],
    image: '/images/team-alex.jpg',
  },
];

export function TeamPage() {
  return (
    <PageWrapper title="Our Team">
      <HeroSection
        headline="Meet Our Team"
        description="Talented stylists dedicated to making you look and feel amazing"
        ctaText="Book an Appointment"
        ctaLink="/booking"
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
              Expert Stylists Who Care
            </h2>
            <p
              className="text-lg text-secondary-600 max-w-2xl mx-auto"
              style={{ lineHeight: '1.7' }}
            >
              Our team combines years of training, continuous education, and genuine passion for the craft
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
                  <div className="border-t border-secondary-200 pt-4">
                    <p className="text-sm font-semibold text-secondary-900 mb-2">Specialties:</p>
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
              Continuous Education
            </h2>
            <p
              className="text-lg text-secondary-700 mb-8"
              style={{ lineHeight: '1.7' }}
            >
              Our team regularly attends workshops, advanced training sessions, and industry events to
              stay current with the latest techniques, trends, and products. Your hair deserves expertise
              that never stops evolving.
            </p>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
