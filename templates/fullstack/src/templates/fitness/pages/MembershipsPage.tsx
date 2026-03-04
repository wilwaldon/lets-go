import { PageWrapper } from '@/components/layout/PageWrapper';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { HeroSection } from '@/components/common/HeroSection';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getHeroImage } from '@/lib/heroImages';
import { Check } from 'lucide-react';

const membershipPlans = [
  {
    name: 'Basic',
    price: 49,
    interval: 'month',
    description: 'Perfect for getting started with your fitness journey',
    features: [
      'Access to gym floor and equipment',
      'Open gym hours (5am - 11pm)',
      'Locker room and showers',
      'Free fitness assessment',
      'Mobile app access',
    ],
    isPopular: false,
  },
  {
    name: 'Unlimited',
    price: 89,
    interval: 'month',
    description: 'Our most popular plan with full access to everything',
    features: [
      'Everything in Basic',
      'Unlimited group fitness classes',
      'Access to all specialty classes',
      'Guest privileges (2 per month)',
      'Priority class booking',
      'Nutrition guidance resources',
    ],
    isPopular: true,
  },
  {
    name: 'Premium',
    price: 149,
    interval: 'month',
    description: 'Maximum value with personal training included',
    features: [
      'Everything in Unlimited',
      '4 personal training sessions/month',
      'Customized workout programming',
      'Monthly body composition analysis',
      'Nutrition coaching consultation',
      'Unlimited guest privileges',
      'Discount on retail and supplements',
    ],
    isPopular: false,
  },
];

const addOns = [
  {
    name: 'Personal Training Package',
    price: 200,
    unit: '4 sessions',
    description: 'One-on-one training with certified personal trainers',
  },
  {
    name: 'Nutrition Coaching',
    price: 100,
    unit: 'per month',
    description: 'Personalized meal plans and ongoing nutrition support',
  },
  {
    name: 'Massage Therapy',
    price: 80,
    unit: 'per session',
    description: 'Sports massage for recovery and injury prevention',
  },
];

export function MembershipsPage() {
  return (
    <PageWrapper title="Memberships">
      <HeroSection
        headline="Choose Your Plan"
        description="Flexible membership options to fit your lifestyle and goals"
        ctaText="Contact Us"
        ctaLink="/contact"
        backgroundImage={getHeroImage('memberships') || undefined}
        align="center"
      />

      <Section className="!pt-32">
        <Container>
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4"
              style={{ letterSpacing: '-0.02em' }}
            >
              Membership Plans
            </h2>
            <p
              className="text-lg text-secondary-600 max-w-2xl mx-auto"
              style={{ lineHeight: '1.7' }}
            >
              No long-term contracts. Cancel anytime. All plans include access to our state-of-the-art facility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {membershipPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative hover:shadow-xl transition-all duration-300 ${
                  plan.isPopular ? 'border-2 border-primary-500 shadow-lg' : ''
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-secondary-900 mb-2">{plan.name}</h3>
                  <p className="text-secondary-600 mb-6" style={{ lineHeight: '1.7' }}>
                    {plan.description}
                  </p>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-secondary-900">${plan.price}</span>
                    <span className="text-secondary-600">/{plan.interval}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                        <span className="text-secondary-700" style={{ lineHeight: '1.7' }}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" size="lg" variant={plan.isPopular ? 'default' : 'outline'}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add-Ons Section */}
          <div className="border-t border-secondary-200 pt-16">
            <div className="text-center mb-12">
              <h2
                className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4"
                style={{ letterSpacing: '-0.02em' }}
              >
                Add-Ons & Services
              </h2>
              <p
                className="text-lg text-secondary-600 max-w-2xl mx-auto"
                style={{ lineHeight: '1.7' }}
              >
                Enhance your membership with additional services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {addOns.map((addon, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-secondary-900 mb-2">{addon.name}</h3>
                    <div className="text-3xl font-bold text-primary-600 mb-3">
                      ${addon.price}
                      <span className="text-base font-normal text-secondary-600">/{addon.unit}</span>
                    </div>
                    <p className="text-secondary-600 mb-4" style={{ lineHeight: '1.7' }}>
                      {addon.description}
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
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
              Try Us Out First
            </h2>
            <p
              className="text-lg text-secondary-700 mb-8"
              style={{ lineHeight: '1.7' }}
            >
              Not sure which plan is right for you? Get a free 7-day trial pass and experience
              everything we have to offer before committing to a membership.
            </p>
            <Button asChild size="lg">
              <a href="/contact">Claim Your Free Trial</a>
            </Button>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="narrow">
          <Card className="bg-secondary-50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-secondary-900 mb-4">Membership FAQ</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-1">Can I pause my membership?</h4>
                  <p className="text-secondary-700" style={{ lineHeight: '1.7' }}>
                    Yes, you can pause your membership for up to 3 months per year for a small monthly fee.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-1">Is there a cancellation fee?</h4>
                  <p className="text-secondary-700" style={{ lineHeight: '1.7' }}>
                    No cancellation fees. We require 30 days notice before your next billing cycle.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-1">Can I upgrade or downgrade my plan?</h4>
                  <p className="text-secondary-700" style={{ lineHeight: '1.7' }}>
                    Absolutely! You can change your plan anytime. Changes take effect at your next billing cycle.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>
    </PageWrapper>
  );
}
