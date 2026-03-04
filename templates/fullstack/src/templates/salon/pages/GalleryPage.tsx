import { PageWrapper } from '@/components/layout/PageWrapper';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { HeroSection } from '@/components/common/HeroSection';
import { getHeroImage } from '@/lib/heroImages';

const galleryCategories = [
  {
    category: 'Color Transformations',
    images: [
      { alt: 'Balayage transformation', caption: 'Natural balayage highlights' },
      { alt: 'Vibrant red color', caption: 'Bold red color transformation' },
      { alt: 'Platinum blonde', caption: 'Platinum blonde perfection' },
      { alt: 'Dimensional brunette', caption: 'Rich dimensional brunette' },
    ],
  },
  {
    category: 'Cuts & Styles',
    images: [
      { alt: 'Modern bob cut', caption: 'Sleek modern bob' },
      { alt: 'Layered long hair', caption: 'Textured long layers' },
      { alt: 'Short pixie cut', caption: 'Edgy pixie cut' },
      { alt: 'Men\'s fade', caption: 'Classic fade with texture' },
    ],
  },
  {
    category: 'Special Occasions',
    images: [
      { alt: 'Bridal updo', caption: 'Elegant bridal updo' },
      { alt: 'Prom hairstyle', caption: 'Glamorous prom styling' },
      { alt: 'Braided style', caption: 'Intricate braided updo' },
      { alt: 'Hollywood waves', caption: 'Classic Hollywood waves' },
    ],
  },
];

export function GalleryPage() {
  return (
    <PageWrapper title="Gallery">
      <HeroSection
        headline="Our Work"
        description="Explore our portfolio of transformations and styles"
        ctaText="Book Your Transformation"
        ctaLink="/booking"
        backgroundImage={getHeroImage('gallery') || undefined}
        align="center"
      />

      <Section className="!pt-32">
        <Container>
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4"
              style={{ letterSpacing: '-0.02em' }}
            >
              Recent Transformations
            </h2>
            <p
              className="text-lg text-secondary-600 max-w-2xl mx-auto"
              style={{ lineHeight: '1.7' }}
            >
              See the magic our talented stylists create every day
            </p>
          </div>

          <div className="space-y-16">
            {galleryCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h3
                  className="text-2xl font-bold text-secondary-900 mb-8"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {category.category}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.images.map((image, imageIndex) => (
                    <div
                      key={imageIndex}
                      className="group relative aspect-square bg-secondary-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      <div className="w-full h-full flex items-center justify-center text-secondary-400">
                        <span className="text-sm">{image.alt}</span>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-white text-sm font-medium">{image.caption}</p>
                      </div>
                    </div>
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
              Follow Us on Instagram
            </h2>
            <p
              className="text-lg text-secondary-700 mb-8"
              style={{ lineHeight: '1.7' }}
            >
              See more of our work, behind-the-scenes moments, and styling tips by following us
              @yoursalon on Instagram
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Follow on Instagram
            </a>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
