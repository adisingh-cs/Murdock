import React from 'react';
import { motion } from 'framer-motion';
import { reveal, revealTransition } from '../lib/animations';
import { GitHubIcon, LinkedInIcon, XIcon, InstagramIcon, MailIcon } from '../components/SocialIcons';

const socials = [
  { icon: GitHubIcon, href: 'https://github.com/adisingh-cs', label: 'GitHub' },
  { icon: LinkedInIcon, href: 'https://www.linkedin.com/in/adityas-ae/', label: 'LinkedIn' },
  { icon: XIcon, href: 'https://x.com/adityas_ae', label: 'X' },
  { icon: InstagramIcon, href: 'https://www.instagram.com/adisingh-cs', label: 'Instagram' },
  { icon: MailIcon, href: 'mailto:adisingh.cs@gmail.com', label: 'Email' },
];

const Founder: React.FC = () => (
  <section id="founder" className="relative bg-background py-24 md:py-32 overflow-hidden border-t border-white/5">
    <div className="relative z-10 mx-auto max-w-[1240px] px-6 md:px-12">
      <div className="grid lg:grid-cols-12 gap-16 items-center">
        
        <div className="lg:col-span-12 xl:col-span-5 order-2 xl:order-1">
          <motion.div 
            {...reveal} 
            className="relative p-1 bg-gradient-to-b from-gold/20 to-transparent rounded-3xl"
          >
            <div className="bg-background p-10 md:p-12 rounded-[inherit] space-y-8">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-white/[0.02] border border-white/10 group">
                <div className="absolute inset-0 bg-gold/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-700" />
                <img 
                  src="/aditya-singh.webp" 
                  alt="Aditya Singh" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
              </div>
              <div className="space-y-4">
                <div className="text-left">
                  <h3 className="font-display font-bold text-[28px] text-text-primary text-left">Aditya Singh</h3>
                  <p className="font-body text-[13px] text-gold/60 uppercase tracking-[0.2em] font-bold text-left">System Architect & Founder</p>
                </div>
              </div>
              
              <p className="font-body text-[16px] text-text-secondary leading-relaxed text-left italic">
                "India's legal system is one of the most complex in the world. I built Murdock because I believe justice shouldn't be a premium product. It should be a public API."
              </p>

              <div className="pt-8 border-t border-white/5 flex gap-5">
                {socials.map((s) => (
                  <a 
                    key={s.label} 
                    href={s.href} 
                    target={s.href.startsWith('mailto') ? undefined : '_blank'} 
                    rel="noopener noreferrer" 
                    aria-label={s.label}
                    className="group"
                  >
                    <s.icon className="w-5 h-5 text-text-muted group-hover:text-gold transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-12 xl:col-span-7 order-1 xl:order-2 space-y-8">
          <motion.div {...reveal} className="flex items-center gap-3">
            <div className="h-[1px] w-6 bg-gold/50" />
            <span className="font-body font-bold text-[11px] uppercase tracking-[0.3em] text-gold/80">The Vision</span>
          </motion.div>
          
          <motion.h2 
            {...reveal} 
            transition={{ ...revealTransition, delay: 0.1 }}
            className="font-display font-bold text-[36px] md:text-[52px] text-text-primary leading-tight text-left"
          >
            Legal access is an <br /><span className="text-gold italic">Engineering</span> problem.
          </motion.h2>
          
          <div className="space-y-6">
            <motion.p 
              {...reveal} 
              transition={{ ...revealTransition, delay: 0.2 }}
              className="font-body text-[19px] text-text-primary leading-relaxed italic border-l-2 border-gold/30 pl-8 py-2 text-left"
            >
              "Most people don't need a month-long trial; they need a correctly structured notice. They don't need a legal opinion; they need a document that works."
            </motion.p>
            <motion.p 
              {...reveal} 
              transition={{ ...revealTransition, delay: 0.3 }}
              className="font-body text-[18px] text-text-secondary leading-relaxed text-left"
            >
              That’s why Murdock exists. We don't replace lawyers. We replace the tedious, manual drafting process that keeps people stuck. We provide the infrastructure for a more efficient, accessible legal system.
            </motion.p>
          </div>
        </div>

      </div>
    </div>
  </section>
);

export default Founder;
