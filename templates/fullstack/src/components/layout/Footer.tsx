import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { siteConfig } from '@/config/site.config';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/menu', label: 'Menu' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

const socialIcons = {
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Business Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{siteConfig.business.name}</h3>
            <p className="text-secondary-300 mb-4">{siteConfig.business.tagline}</p>
            <div className="space-y-2 text-sm text-secondary-300">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <div>
                  <div>{siteConfig.business.address.street}</div>
                  <div>
                    {siteConfig.business.address.city}, {siteConfig.business.address.state}{' '}
                    {siteConfig.business.address.zip}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <a
                  href={`tel:${siteConfig.business.phone}`}
                  className="hover:text-primary-400 transition-colors"
                >
                  {siteConfig.business.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <a
                  href={`mailto:${siteConfig.business.email}`}
                  className="hover:text-primary-400 transition-colors"
                >
                  {siteConfig.business.email}
                </a>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-secondary-300 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hours</h3>
            <div className="space-y-1 text-sm text-secondary-300 mb-6">
              {Object.entries(siteConfig.hours).map(([day, hours]) => (
                <div key={day} className="flex justify-between">
                  <span className="capitalize">{day}</span>
                  {hours ? (
                    <span>
                      {hours.open} - {hours.close}
                    </span>
                  ) : (
                    <span>Closed</span>
                  )}
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
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
                    className="text-secondary-300 hover:text-primary-400 transition-colors"
                    aria-label={`Follow us on ${platform}`}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-secondary-800 text-center text-sm text-secondary-400">
          <p>
            © {currentYear} {siteConfig.business.name}. All rights reserved. Built with Let's Go!
          </p>
        </div>
      </div>
    </footer>
  );
}
