import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { GitHubIcon, LinkedInIcon, XIcon, InstagramIcon, MailIcon } from './SocialIcons';

const footerNav = [
  { label: 'Problem', href: '#problem' },
  { label: 'Infrastructure', href: '#what-we-do' },
  { label: 'Tech Stack', href: '#tech' },
  { label: 'Open Source', href: '#open-source' },
  { label: 'Community', href: '/community' },
  { label: 'Founder', href: '#founder' },
];

const projectLinks = [
  { label: 'Murdock AI', href: '#', soon: true },
  { label: 'Legal v1 Docs', href: '#', soon: true },
  { label: 'System Status', href: '#', soon: true },
  { label: 'API Keys', href: '#', soon: true },
];

const socials = [
  { icon: GitHubIcon, href: 'https://github.com/adisingh-cs', label: 'GitHub' },
  { icon: LinkedInIcon, href: 'https://www.linkedin.com/in/adityas-ae/', label: 'LinkedIn' },
  { icon: XIcon, href: 'https://x.com/adityas_ae', label: 'X' },
  { icon: MailIcon, href: 'mailto:adisingh.cs@gmail.com', label: 'Email' },
];

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleNav = (href: string) => {
    if (href.startsWith('#')) {
      if (window.location.pathname !== '/') {
        navigate('/' + href);
        // We delay the scroll slightly if we just navigated to the home page
        setTimeout(() => {
          const el = document.querySelector(href);
          if (el) {
            const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }, 100);
      } else {
        const el = document.querySelector(href);
        if (el) {
          const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    } else {
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-transparent border-t border-white/5 pt-24 pb-12 overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        
        <div className="grid lg:grid-cols-12 gap-16 mb-24">
          
          <div className="lg:col-span-12 xl:col-span-5 space-y-8 text-left">
            <Logo height={32} white />
            <div className="space-y-4 max-w-[400px]">
              <h3 className="font-display font-bold text-[24px] text-text-primary text-left">The First Wave of <br /><span className="text-gold italic">Legal v1 Movement.</span></h3>
              <p className="font-body text-[15px] text-text-secondary leading-relaxed text-left">
                Murdock is more than just software. It's a statement that the law should be accessible through infrastructure, not just expensive representation.
              </p>
            </div>
            
            <div className="flex gap-4">
              {socials.map((s) => (
                <a 
                  key={s.label} 
                  href={s.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center hover:border-gold/50 hover:bg-white/10 transition-all group"
                >
                  <s.icon className="w-4 h-4 text-text-muted group-hover:text-gold transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-12 xl:col-span-7">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
              <div className="space-y-6 text-left">
                <h4 className="font-body font-bold text-[10px] uppercase tracking-[0.25em] text-gold/60 text-left">Platform</h4>
                <ul className="space-y-4">
                  {footerNav.map((l) => (
                    <li key={l.label}>
                      <button 
                        onClick={() => handleNav(l.href)}
                        className="font-body text-[14px] text-text-secondary hover:text-text-primary transition-colors text-left"
                      >
                        {l.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6 text-left">
                <h4 className="font-body font-bold text-[10px] uppercase tracking-[0.25em] text-gold/60 text-left">Internal</h4>
                <ul className="space-y-4">
                  {projectLinks.map((l) => (
                    <li key={l.label} className="flex items-center gap-2">
                      <span className="font-body text-[14px] text-text-muted">{l.label}</span>
                      {l.soon && (
                        <span className="text-[9px] font-body font-bold uppercase tracking-wider text-gold/40 border border-gold/10 px-1.5 py-0.5 rounded">Soon</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6 text-left">
                <h4 className="font-body font-bold text-[10px] uppercase tracking-[0.25em] text-gold/60 text-left">Legal</h4>
                <p className="font-body text-[12px] text-text-muted leading-relaxed text-left">
                  Murdock provides technical infrastructure. All documents must be reviewed and verified. We do not provide legal advice.
                </p>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-body text-[12px] text-text-muted uppercase tracking-[0.1em]">
            © 2026 Murdock. Built by Aditya Singh.
          </p>
          
          <a href="/sitemap.xml" className="font-body text-[11px] text-text-muted uppercase tracking-[0.2em] hover:text-gold transition-colors">
            Sitemap
          </a>

          <div className="flex gap-8">
            <span className="font-body text-[11px] text-text-muted tracking-widest uppercase">India · Open Source · API-First</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
