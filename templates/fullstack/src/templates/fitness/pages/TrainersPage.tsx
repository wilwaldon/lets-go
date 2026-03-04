import { PageWrapper } from '@/components/layout/PageWrapper';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { HeroSection } from '@/components/common/HeroSection';
import { Card, CardContent } from '@/components/ui/Card';
import { getHeroImage } from '@/lib/heroImages';

const trainers = [
  {
    name: 'Sarah Johnson',
    title: 'Head Trainer & Owner',
    bio: 'Former competitive athlete with 12 years of coaching experience. Sarah specializes in strength and conditioning and has helped hundreds of clients reach their goals.',
    specialties: ['Strength Training', 'CrossFit', 'Olympic Lifting'],
    certifications: ['NSCA-CPT', 'CrossFit Level 2', 'USA Weightlifting'],
    image: '/images/trainer-sarah.jpg',
  },
  {
    name: 'Michael Chen',
    title: 'Yoga & Mindfulness Instructor',
    bio: 'Certified yoga teacher with a background in physical therapy. Michael brings a holistic approach to fitness, emphasizing mobility, flexibility, and mental wellness.',
    specialties: ['Yoga', 'Pilates', 'Mobility Work'],
    certifications: ['RYT-500', 'DPT', 'PMA-CPT'],
    image: '/images/trainer-michael.jpg',
  },
  {
    name: 'Lisa Rodriguez',
    title: 'HIIT & Cardio Specialist',
    bio: 'High-energy coach who loves pushing clients to discover what they\'re capable of. Lisa designs challenging workouts that deliver maximum results in minimum time.',
    specialties: ['HIIT', 'Bootcamp', 'Cardio Kickboxing'],
    certifications: ['ACE-CPT', 'TRX Certified', 'Kickboxing Instructor'],
    image: '/images/trainer-lisa.jpg',
  },
  {
    name: 'David Martinez',
    title: 'Strength & Conditioning Coach',
    bio: 'Former college football strength coach with expertise in athletic performance. David works with clients of all levels to build functional strength and power.',
    specialties: ['Strength & Conditioning', 'Sports Performance', 'Olympic Lifting'],
    certifications: ['CSCS', 'USAW Level 1', 'FMS Level 2'],
    image: '/images/trainer-david.jpg',
  },
  {
    name: 'Emily Thompson',
    title: 'Group Fitness Instructor',
    bio: 'Passionate about creating inclusive, fun classes that make fitness accessible to everyone. Emily teaches a variety of formats with a focus on proper form and enjoyment.',
    specialties: ['Barre', 'Pilates', 'Dance Fitness'],
    certifications: ['AFAA GFI', 'Balanced Body Pilates', 'Barre Above'],
    image: '/images/trainer-emily.jpg',
  },
  {
    name: 'Alex Kim',
    title: 'Personal Training Specialist',
    bio: 'Results-driven trainer who creates personalized programs based on each client\'s unique goals, limitations, and preferences. Alex emphasizes sustainable, long-term progress.',
    specialties: ['Weight Loss', 'Muscle Building', 'Nutrition Coaching'],
    certifications: ['NASM-CPT', 'PN-1', 'Corrective Exercise Specialist'],
    image: '/images/trainer-alex.jpg',
  },
];

export function TrainersPage() {
  return (
    <PageWrapper title="Our Trainers">
      <HeroSection
        headline="Meet Our Trainers"
        description="Certified experts dedicated to your success"
        ctaText="View Class Schedule"
        ctaLink="/schedule"
        backgroundImage={getHeroImage('trainers') || undefined}
        align="center"
      />

      <Section className="!pt-32">
        <Container>
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4"
              style={{ letterSpacing: '-0.02em' }}
            >
              Expert Guidance Every Step
            </h2>
            <p
              className="text-lg text-secondary-600 max-w-2xl mx-auto"
              style={{ lineHeight: '1.7' }}
            >
              Our trainers combine years of education, certification, and hands-on experience to help you achieve your goals safely and effectively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainers.map((trainer, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="aspect-square bg-secondary-200">
                  <div className="w-full h-full flex items-center justify-center text-secondary-400">
                    <span className="text-sm">Photo: {trainer.name}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-secondary-900 mb-1">{trainer.name}</h3>
                  <p className="text-primary-600 font-medium mb-4">{trainer.title}</p>
                  <p className="text-secondary-600 mb-4" style={{ lineHeight: '1.7' }}>
                    {trainer.bio}
                  </p>

                  <div className="border-t border-secondary-200 pt-4 mb-4">
                    <p className="text-sm font-semibold text-secondary-900 mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-2">
                      {trainer.specialties.map((specialty, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1 bg-primary-50 text-primary-700 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-secondary-200 pt-4">
                    <p className="text-sm font-semibold text-secondary-900 mb-2">Certifications:</p>
                    <div className="flex flex-wrap gap-2">
                      {trainer.certifications.map((cert, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full"
                        >
                          {cert}
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
              Personal Training Available
            </h2>
            <p
              className="text-lg text-secondary-700 mb-8"
              style={{ lineHeight: '1.7' }}
            >
              Want one-on-one attention? Our trainers offer personalized training sessions tailored
              to your specific goals, schedule, and fitness level. Contact us to learn more about
              personal training packages.
            </p>
            <a
              href="/contact"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Get Started
            </a>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
