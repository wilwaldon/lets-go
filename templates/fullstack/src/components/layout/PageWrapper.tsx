import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/site.config';

interface PageWrapperProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function PageWrapper({
  title,
  description,
  children,
  className = '',
}: PageWrapperProps) {
  const pageTitle = title
    ? `${title} | ${siteConfig.business.name}`
    : siteConfig.business.name;

  const pageDescription = description || siteConfig.business.tagline;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
      </Helmet>
      <div className={`min-h-screen ${className}`}>{children}</div>
    </>
  );
}
