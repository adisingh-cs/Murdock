import React from 'react';
import { Helmet } from 'react-helmet-async';

const Schema: React.FC = () => {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Murdock",
    "alternateName": "Murdock Legal",
    "url": "https://murdock-v1.netlify.app",
    "logo": "https://i.ibb.co/4R0cHfvw/murdock-web-img.webp",
    "description": "API-first legal infrastructure platform for India. Abstracting complex laws into programmable modules.",
    "founder": {
      "@type": "Person",
      "name": "Aditya Singh",
      "sameAs": ["https://www.linkedin.com/in/adityas-ae/"]
    },
    "knowsAbout": [
      "Indian Law",
      "Legal Tech",
      "API Infrastructure",
      "Consumer Protection Act 2019",
      "RERA"
    ],
    "brand": {
      "@type": "Brand",
      "name": "Murdock"
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Murdock Legal Infrastructure API",
    "serviceType": "Legal Document Automation",
    "provider": {
      "@type": "Organization",
      "name": "Murdock"
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Legal Modules",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Consumer Protection Module"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Housing & Rent Module"
          }
        }
      ]
    }
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Aditya Singh",
    "url": "https://www.linkedin.com/in/adityas-ae/",
    "sameAs": [
      "https://x.com/adityas_ae",
      "https://github.com/adisingh-cs"
    ],
    "jobTitle": "System Architect",
    "description": "Founder of Murdock, building open-source legal infrastructure for India.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Murdock?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Murdock is an API-first legal infrastructure platform designed to turn complex Indian laws into structured, ready-to-use documents."
        }
      },
      {
        "@type": "Question",
        "name": "Is Murdock free to use for drafting legal notices?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Murdock's core drafting engine is free for citizens to ensure affordable access to justice for all Indians."
        }
      },
      {
        "@type": "Question",
        "name": "Does Murdock replace the need for a lawyer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Murdock does not replace lawyers. It replaces the tedious, manual drafting process, providing the infrastructure for a more efficient and accessible legal system."
        }
      },
      {
        "@type": "Question",
        "name": "Which legal areas does Murdock cover?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Currently, Murdock (v1) supports Consumer Protection (Legal Notices, Forum Complaints) and Housing & Rent (Demand Notices, Lease Addendums)."
        }
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(orgSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
};

export default Schema;
