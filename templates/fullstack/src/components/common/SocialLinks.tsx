import { Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import { siteConfig } from '@/config/site.config';

const socialIcons = {
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
};

interface SocialLinksProps {
  size?: number;
  className?: string;
}

export function SocialLinks({ size = 24, className = '' }: SocialLinksProps) {
  return (
    <div className={`flex gap-4 ${className}`}>
      {Object.entries(siteConfig.social).map(([platform, url]) => {
        if (!url) return null;
        const Icon = socialIcons[platform as keyof typeof socialIcons];
        if (!Icon) return null;

        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary-600 hover:text-primary-600 transition-colors"
            aria-label={`Follow us on ${platform}`}
          >
            <Icon size={size} />
          </a>
        );
      })}
    </div>
  );
}
