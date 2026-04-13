import React from 'react';
import { motion } from 'framer-motion';
import { reveal } from '../lib/animations';
import { GitHubIcon, LinkedInIcon, XIcon, InstagramIcon, MailIcon } from '../components/SocialIcons';

const socials = [
  { icon: GitHubIcon, href: 'https://github.com/adisingh-cs', label: 'GitHub' },
  { icon: LinkedInIcon, href: 'https://www.linkedin.com/in/adityas-ae/', label: 'LinkedIn' },
  { icon: XIcon, href: 'https://x.com/adityas_ae', label: 'X' },
  { icon: InstagramIcon, href: 'https://www.instagram.com/adisingh-cs', label: 'Instagram' },
  { icon: MailIcon, href: 'mailto:adisingh.cs@gmail.com', label: 'Email' },
];

const Founder: React.FC = () => (
  <section id="founder" className="bg-white py-24 md:py-32">
    <div className="mx-auto max-w-[1200px] px-6 md:px-12">
      <motion.span {...reveal} className="font-body font-medium text-[13px] uppercase tracking-[0.12em] text-gold block mb-3">The Founder</motion.span>
      <motion.h2 {...reveal} className="font-display font-bold text-[30px] md:text-[42px] text-navy mb-12">Why I'm Building This.</motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <motion.div {...reveal} className="glass-light p-8">
          <div className="w-20 h-20 rounded-full bg-navy flex items-center justify-center mb-4">
            <span className="font-display font-bold text-[28px] text-white">AS</span>
          </div>
          <h3 className="font-display font-bold text-[24px] text-navy">Aditya Singh</h3>
          <span className="font-body font-medium text-[14px] text-gold block mb-4">Founder & System Architect</span>
          <div className="flex gap-3">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target={s.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer" aria-label={s.label} className="text-slate hover:text-gold transition-colors">
                <s.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div {...reveal} className="relative">
          <span className="absolute -top-4 -left-2 font-display text-[72px] text-gold/30 leading-none select-none" aria-hidden="true">"</span>
          <p className="font-display italic text-[20px] text-navy leading-[1.8] pl-8 pr-4">
            India's legal system is one of the most complex in the world — and yet the tools available to ordinary citizens are either too expensive, too generic, or simply don't exist at all. I built Murdock because I believe access to legal infrastructure shouldn't depend on how much you can afford to pay a lawyer. This is an engineering problem. And engineering problems have solutions.
          </p>
          <span className="font-body font-medium text-[14px] text-gold mt-6 block pl-8">— Aditya Singh, Founder</span>
        </motion.div>
      </div>
    </div>
  </section>
);

export default Founder;
