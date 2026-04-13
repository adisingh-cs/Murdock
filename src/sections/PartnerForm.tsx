import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { reveal, revealTransition } from '../lib/animations';
import { GitHubIcon, LinkedInIcon, XIcon, InstagramIcon, MailIcon } from '../components/SocialIcons';

const intents = [
  { emoji: '💰', title: 'Fund the Vision', body: 'Investors and grant-makers backing open legal infrastructure.' },
  { emoji: '🤝', title: 'Partner With Us', body: 'Law firms, enterprises, and institutions.' },
  { emoji: '🏛', title: 'Deploy Murdock', body: 'Organizations wanting to use Murdock for their users.' },
];

const selectOptions = [
  'I want to fund / invest in Murdock',
  'I represent a law firm interested in partnership',
  'I represent a government / legal aid body',
  'I represent an enterprise interested in integration',
  "I'm a developer and want to contribute",
  'I want to use Murdock as a service',
  "Other — I'll explain below",
];

const socialLinks = [
  { icon: GitHubIcon, label: 'Star the Repository', href: 'https://github.com/adisingh-cs' },
  { icon: LinkedInIcon, label: 'Connect on LinkedIn', href: 'https://www.linkedin.com/in/adityas-ae/' },
  { icon: XIcon, label: 'Follow Updates', href: 'https://x.com/adityas_ae' },
  { icon: MailIcon, label: 'Direct Email', href: 'mailto:adisingh.cs@gmail.com' },
];

const inputClass = "w-full border-b border-white/20 bg-transparent py-4 font-body text-[16px] text-text-primary placeholder:text-text-muted transition-all duration-300 focus:outline-none focus:border-gold";

const PartnerForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData as any).toString(),
    }).then(() => setSubmitted(true)).catch(() => setSubmitted(true));
  };

  return (
    <section id="partner-form" className="relative bg-background py-24 md:py-32 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-12 xl:col-span-5 space-y-12">
            <div className="space-y-6">
              <motion.div {...reveal} className="flex items-center gap-3">
                <div className="h-[1px] w-6 bg-gold/50" />
                <span className="font-body font-bold text-[11px] uppercase tracking-[0.3em] text-gold/80">Collaborate</span>
              </motion.div>
              
              <motion.h2 
                {...reveal} 
                transition={{ ...revealTransition, delay: 0.1 }}
                className="font-display font-bold text-[36px] md:text-[52px] text-text-primary leading-tight text-left"
              >
                Let’s build the <br /><span className="text-gold italic">Future of Law.</span>
              </motion.h2>

              <motion.p 
                {...reveal} 
                transition={{ ...revealTransition, delay: 0.2 }}
                className="font-body text-[18px] text-text-secondary leading-relaxed text-left"
              >
                Whether you're an investor, a legal professional, or a developer — 
                let's talk about how Murdock can solve the accessibility gap together.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-1 gap-4">
              {intents.map((c, i) => (
                <motion.div 
                  key={c.title} 
                  {...reveal} 
                  transition={{ ...revealTransition, delay: i * 0.1 + 0.3 }}
                  className="flex items-start gap-4 p-5 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-gold/30 transition-all duration-300"
                >
                  <span className="text-2xl pt-1 text-gold/80">{c.emoji}</span>
                  <div className="text-left">
                    <h3 className="font-display font-bold text-[16px] text-text-primary group-hover:text-gold transition-colors text-left">{c.title}</h3>
                    <p className="font-body text-[14px] text-text-muted text-left">{c.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-12 xl:col-span-7">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div 
                  key="form-container"
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-8 md:p-12 glass-dark border border-white/10 rounded-3xl"
                >
                  <form name="murdock-partner-inquiry" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit} className="space-y-8">
                    <input type="hidden" name="form-name" value="murdock-partner-inquiry" />
                    <p className="hidden">
                      <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-1 text-left">
                        <label htmlFor="name" className="font-body font-bold text-[10px] uppercase tracking-[0.2em] text-gold/60">Full Name *</label>
                        <input id="name" name="name" required placeholder="John Doe" className={inputClass} value={name} onChange={e => setName(e.target.value)} />
                      </div>
                      <div className="space-y-1 text-left">
                        <label htmlFor="org" className="font-body font-bold text-[10px] uppercase tracking-[0.2em] text-gold/60">Organization *</label>
                        <input id="org" name="organisation" required placeholder="Legal Solutions Inc." className={inputClass} />
                      </div>
                    </div>

                    <div className="space-y-1 text-left">
                      <label htmlFor="email" className="font-body font-bold text-[10px] uppercase tracking-[0.2em] text-gold/60">Email Address *</label>
                      <input id="email" name="email" type="email" required placeholder="john@example.com" className={inputClass} />
                    </div>

                    <div className="space-y-2 text-left">
                      <label htmlFor="intent" className="font-body font-bold text-[10px] uppercase tracking-[0.2em] text-gold/60">Interest Area *</label>
                      <select id="intent" name="intent" required className={`${inputClass} !bg-background transition-all`} defaultValue="">
                        <option value="" disabled className="text-white/20">Select an option</option>
                        {selectOptions.map(o => <option key={o} value={o} className="bg-background text-text-primary">{o}</option>)}
                      </select>
                    </div>

                    <div className="space-y-1 text-left">
                      <label htmlFor="message" className="font-body font-bold text-[10px] uppercase tracking-[0.2em] text-gold/60">Message</label>
                      <textarea id="message" name="message" rows={4} placeholder="Tell us how we can collaborate..." className={inputClass} />
                    </div>

                    <motion.button 
                      type="submit" 
                      className="w-full bg-text-primary text-background font-body font-bold text-[15px] py-5 rounded-xl hover:bg-gold transition-all duration-300"
                      whileTap={{ scale: 0.98 }}
                    >
                      Send Inquiry
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div 
                  key="thanks-message"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center p-12 glass-dark border border-gold/20 rounded-3xl text-center space-y-8"
                >
                  <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center border border-gold/30">
                    <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <motion.path 
                        d="M5 13l4 4L19 7" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </svg>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-display font-bold text-[32px] text-text-primary">Inquiry Received.</h3>
                    <p className="font-body text-[17px] text-text-secondary max-w-[360px]">
                      Thank you{name ? `, ${name.split(' ')[0]}` : ''}. I'll personally review your message and get back to you shortly.
                    </p>
                  </div>
                  
                  <div className="pt-8 border-t border-white/5 w-full grid grid-cols-2 gap-4">
                    {socialLinks.map(s => (
                      <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-gold/40 transition-all text-left space-y-2 group">
                        <s.icon className="w-5 h-5 text-text-muted group-hover:text-gold transition-colors" />
                        <span className="block font-body text-[11px] text-text-muted font-bold uppercase tracking-tight">{s.label}</span>
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PartnerForm;

