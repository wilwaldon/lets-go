import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/layout/Container';

interface CTABannerProps {
  heading: string;
  description?: string;
  ctaText: string;
  ctaLink: string;
}

export function CTABanner({ heading, description, ctaText, ctaLink }: CTABannerProps) {
  return (
    <section className="bg-primary-600 py-16 md:py-20">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ letterSpacing: '-0.02em' }}
          >
            {heading}
          </h2>

          {description && (
            <p className="text-lg text-primary-100 mb-8" style={{ lineHeight: '1.7' }}>
              {description}
            </p>
          )}

          <Button asChild size="lg" variant="secondary">
            <Link to={ctaLink}>{ctaText}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
