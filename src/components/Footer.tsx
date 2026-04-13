import React from 'react';
import Logo from './Logo';
import { GitHubIcon, LinkedInIcon, XIcon, InstagramIcon, MailIcon } from './SocialIcons';

const footerNav = [
  { label: 'Problem', href: '#problem' },
  { label: 'What We Build', href: '#what-we-build' },
  { label: 'For Who', href: '#who-its-for' },
  { label: 'Tech Foundation', href: '#tech' },
  { label: 'Open Source', href: '#open-source' },
  { label: 'Contact', href: '#partner-form' },
];

const projectLinks = [
  { label: 'GitHub', href: 'https://github.com/adisingh-cs', external: true },
  { label: 'Documentation', href: '#', soon: true },
  { label: 'Module Registry', href: '#', soon: true },
  { label: 'API Reference', href: '#', soon: true },
];

const socials = [
  { icon: GitHubIcon, href: 'https://github.com/adisingh-cs', label: 'GitHub' },
  { icon: LinkedInIcon, href: 'https://www.linkedin.com/in/adityas-ae/', label: 'LinkedIn' },
  { icon: XIcon, href: 'https://x.com/adityas_ae', label: 'X' },
  { icon: InstagramIcon, href: 'https://www.instagram.com/adisingh-cs', label: 'Instagram' },
  { icon: MailIcon, href: 'mailto:adisingh.cs@gmail.com', label: 'Email' },
];

const Footer: React.FC = () => {
  const scrollTo = (href: string) => {
    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer style={{ background: '#111D33' }} className="text-white pt-16 pb-8">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Logo height={32} white />
            <p className="mt-4 font-body text-[14px]" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Legal Infrastructure for India.
            </p>
            <span className="inline-block mt-3 px-3 py-1 rounded-full text-[12px] font-body font-medium border border-brand-green text-brand-green">
              Open Source
            </span>
            <p className="mt-4 font-body text-[12px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Documents are professionally structured, not legal advice. Review all flagged fields before use.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="font-body font-medium text-[12px] uppercase tracking-[0.1em] mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Navigate
            </h4>
            <ul className="space-y-2.5">
              {footerNav.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => scrollTo(l.href)}
                    className="font-body text-[15px] transition-colors hover:text-gold"
                    style={{ color: 'rgba(255,255,255,0.65)' }}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Project */}
          <div>
            <h4 className="font-body font-medium text-[12px] uppercase tracking-[0.1em] mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Project
            </h4>
            <ul className="space-y-2.5">
              {projectLinks.map((l) => (
                <li key={l.label} className="flex items-center gap-2">
                  <a
                    href={l.href}
                    target={l.external ? '_blank' : undefined}
                    rel={l.external ? 'noopener noreferrer' : undefined}
                    className="font-body text-[15px] transition-colors hover:text-gold"
                    style={{ color: 'rgba(255,255,255,0.65)' }}
                  >
                    {l.label}
                  </a>
                  {l.soon && (
                    <span className="px-2 py-0.5 rounded-full font-body text-[11px] border border-gold/50 text-gold/50">
                      Soon
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-body font-medium text-[12px] uppercase tracking-[0.1em] mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Connect With Aditya
            </h4>
            <div className="flex gap-3 mb-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="transition-colors hover:text-gold"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  <s.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <a
              href="mailto:adisingh.cs@gmail.com"
              className="font-body text-[14px] transition-colors hover:text-gold"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              adisingh.cs@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t pt-6 flex flex-col sm:flex-row justify-between gap-2" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <span className="font-body text-[13px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
            © 2025 Murdock. Built by Aditya Singh.
          </span>
          <span className="font-body text-[13px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
            India · Open Source · API-First
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
