import { PageWrapper } from '@/components/layout/PageWrapper';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { HeroSection } from '@/components/common/HeroSection';
import { ContactForm } from '@/components/common/ContactForm';
import { BusinessHours } from '@/components/common/BusinessHours';
import { MapEmbed } from '@/components/common/MapEmbed';
import { SocialLinks } from '@/components/common/SocialLinks';
import { Phone, Mail, MapPin } from 'lucide-react';
import { siteConfig } from '@/config/site.config';
import { getHeroImage } from '@/lib/heroImages';

export function ContactPage() {
  return (
    <PageWrapper title="Contact" description="Get in touch with us">
      {/* Hero Section */}
      <HeroSection
        headline="Contact Us"
        description="Have a question or want to make a reservation? We'd love to hear from you."
        ctaText="Call Us Now"
        ctaLink={`tel:${siteConfig.business.phone}`}
        backgroundImage={getHeroImage('contact') || undefined}
        align="center"
      />

      {/* Contact Information & Form */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">Get In Touch</h2>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <Phone className="text-primary-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-1">Phone</h3>
                    <a
                      href={`tel:${siteConfig.business.phone}`}
                      className="text-secondary-600 hover:text-primary-600 transition-colors"
                    >
                      {siteConfig.business.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <Mail className="text-primary-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-1">Email</h3>
                    <a
                      href={`mailto:${siteConfig.business.email}`}
                      className="text-secondary-600 hover:text-primary-600 transition-colors"
                    >
                      {siteConfig.business.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <MapPin className="text-primary-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-1">Address</h3>
                    <div className="text-secondary-600">
                      <p>{siteConfig.business.address.street}</p>
                      <p>
                        {siteConfig.business.address.city}, {siteConfig.business.address.state}{' '}
                        {siteConfig.business.address.zip}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold text-secondary-900 mb-3">Follow Us</h3>
                <SocialLinks size={28} />
              </div>

              <BusinessHours />
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>

      {/* Map Section */}
      <Section variant="light">
        <Container>
          <h2 className="text-2xl font-bold text-secondary-900 mb-6 text-center">Find Us</h2>
          <MapEmbed />
        </Container>
      </Section>
    </PageWrapper>
  );
}
