import { siteConfig } from '@/config/site.config';

interface MapEmbedProps {
  className?: string;
}

export function MapEmbed({ className = '' }: MapEmbedProps) {
  const { street, city, state, zip } = siteConfig.business.address;
  const addressQuery = encodeURIComponent(`${street}, ${city}, ${state} ${zip}`);
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${addressQuery}`;

  return (
    <div className={`w-full h-96 rounded-lg overflow-hidden ${className}`}>
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Location map"
      />
    </div>
  );
}
