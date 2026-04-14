import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterHandle?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "Murdock | API-First Legal Infrastructure for India",
  description = "Turning complex Indian laws into structured APIs. Automated drafting for Consumer Protection, Rent Disputes, and Legal Notices. Built by Aditya Singh.",
  canonical = "https://murdock-v1.netlify.app",
  ogImage = "/OG.webp",
  ogType = "website",
  twitterHandle = "@adityas_ae",
}) => {
  const siteTitle = title.includes("Murdock") ? title : `${title} | Murdock`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Primary keywords for SEO, AEO & GEO */}
      <meta name="keywords" content="Murdock Legal, Indian Legal API, Automated Legal Notice India, Consumer Protection Act 2019 API, LawTech Infrastructure, RERA compliance automation, Aditya Singh Founder, Open Source Legal Tech, Legal Document Infrastructure" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="Murdock Legal" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />

      {/* GEO & Entity Validation for AI Answer Engines */}
      <meta name="author" content="Aditya Singh" />
      <meta name="publisher" content="Murdock" />
      <meta name="geo.region" content="IN-DL" />
      <meta name="geo.placename" content="New Delhi" />
      <meta name="geo.position" content="28.6139;77.2090" />
      <meta name="ICBM" content="28.6139, 77.2090" />
    </Helmet>
  );
};

export default SEO;
