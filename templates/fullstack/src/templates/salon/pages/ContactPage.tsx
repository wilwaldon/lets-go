import { PageWrapper } from '@/components/layout/PageWrapper';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { HeroSection } from '@/components/common/HeroSection';
import { ContactForm } from '@/components/common/ContactForm';
import { BusinessHours } from '@/components/common/BusinessHours';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/site.config';
import { getHeroImage } from '@/lib/heroImages';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function ContactPage() {
  return (
    <PageWrapper title="Contact Us">
      <HeroSection
        headline="Get in Touch"
        description="Questions? We'd love to hear from you"
        ctaText="Book an Appointment"
        ctaLink="/booking"
        backgroundImage={getHeroImage('contact') || undefined}
        align="center"
      />

      <Section className="!pt-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900 mb-1">Visit Us</h3>
                      <p className="text-secondary-600" style={{ lineHeight: '1.7' }}>
                        {siteConfig.business.address.street}
                        <br />
                        {siteConfig.business.address.city}, {siteConfig.business.address.state}{' '}
                        {siteConfig.business.address.zip}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900 mb-1">Call Us</h3>
                      <a
                        href={`tel:${siteConfig.business.phone}`}
                        className="text-secondary-600 hover:text-primary-600 transition-colors"
                        style={{ lineHeight: '1.7' }}
                      >
                        {siteConfig.business.phone}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900 mb-1">Email Us</h3>
                      <a
                        href={`mailto:${siteConfig.business.email}`}
                        className="text-secondary-600 hover:text-primary-600 transition-colors break-all"
                        style={{ lineHeight: '1.7' }}
                      >
                        {siteConfig.business.email}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-secondary-900 mb-3">Hours</h3>
                      <BusinessHours />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div>
                <Button asChild className="w-full" size="lg">
                  <a href="/booking">Book an Appointment</a>
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-8">
                  <h2
                    className="text-2xl font-bold text-secondary-900 mb-6"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    Send Us a Message
                  </h2>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Map Section */}
      <Section variant="secondary">
        <Container>
          <div className="aspect-video bg-secondary-200 rounded-lg">
            <div className="w-full h-full flex items-center justify-center text-secondary-400">
              <span>Google Maps Embed</span>
            </div>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
