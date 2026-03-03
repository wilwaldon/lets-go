import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

interface HeroSectionProps {
  tagline?: string;
  headline: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
  align?: 'left' | 'center';
}

export function HeroSection({
  tagline,
  headline,
  description,
  ctaText = 'Get Started',
  ctaLink = '#',
  backgroundImage,
  align = 'center',
}: HeroSectionProps) {
  const alignmentClasses = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className={`flex flex-col ${alignmentClasses} max-w-3xl ${align === 'center' ? 'mx-auto' : ''}`}>
          {tagline && (
            <p className={`text-sm md:text-base font-semibold uppercase tracking-wide mb-4 ${backgroundImage ? 'text-primary-300' : 'text-primary-600'}`}>
              {tagline}
            </p>
          )}

          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${
              backgroundImage ? 'text-white' : 'text-secondary-900'
            }`}
            style={{ letterSpacing: '-0.02em', lineHeight: '1.1' }}
          >
            {headline}
          </h1>

          <p
            className={`text-lg md:text-xl mb-8 max-w-2xl ${
              backgroundImage ? 'text-secondary-100' : 'text-secondary-600'
            }`}
            style={{ lineHeight: '1.7' }}
          >
            {description}
          </p>

          <div>
            <Button asChild size="lg">
              <Link to={ctaLink}>{ctaText}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
