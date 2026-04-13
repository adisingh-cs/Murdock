import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { reveal, revealTransition } from '../lib/animations';
import { GitHubIcon, LinkedInIcon, XIcon, InstagramIcon, MailIcon } from '../components/SocialIcons';

const intents = [
  { emoji: '💰', title: 'Fund the Vision', body: 'Investors and grant-makers backing open legal infrastructure' },
  { emoji: '🤝', title: 'Partner With Us', body: 'Law firms, enterprises, NGOs, and institutions' },
  { emoji: '🏛', title: 'Use as a Service', body: 'Organizations wanting to deploy Murdock for their users' },
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
  { icon: GitHubIcon, label: 'Follow the build', href: 'https://github.com/adisingh-cs' },
  { icon: LinkedInIcon, label: 'Connect professionally', href: 'https://www.linkedin.com/in/adityas-ae/' },
  { icon: XIcon, label: 'Follow updates', href: 'https://x.com/adityas_ae' },
  { icon: InstagramIcon, label: 'Behind the scenes', href: 'https://www.instagram.com/adisingh-cs' },
  { icon: MailIcon, label: 'Direct line', href: 'mailto:adisingh.cs@gmail.com' },
  { icon: GitHubIcon, label: 'Star the project (coming soon)', href: 'https://github.com/adisingh-cs' },
];

const inputClass = "w-full px-[18px] py-[14px] rounded-[10px] font-body text-[16px] text-white placeholder:text-white/35 transition-all duration-200 focus:outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(201,147,58,0.15)]";
const inputStyle: React.CSSProperties = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.18)' };

const PartnerForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
    }).then(() => setSubmitted(true)).catch(() => setSubmitted(true));
  };

  return (
    <section id="partner-form" className="bg-navy py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        <motion.span {...reveal} className="font-body font-medium text-[13px] uppercase tracking-[0.12em] text-gold block mb-3">Get In Touch</motion.span>
        <motion.h2 {...reveal} className="font-display font-bold text-[30px] md:text-[42px] text-white mb-4">Let's Build India's Legal Future Together.</motion.h2>
        <motion.p {...reveal} className="font-body text-[19px] leading-[1.8] max-w-[640px] mb-12" style={{ color: 'rgba(255,255,255,0.72)' }}>
          Whether you're a VC exploring legal tech, a law firm evaluating document automation, a government body seeking open-source legal infrastructure, or an enterprise looking to integrate — let's talk.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {intents.map((c, i) => (
            <motion.div key={c.title} {...reveal} transition={{ ...revealTransition, delay: i * 0.1 }} className="glass-dark p-6 text-center">
              <span className="text-2xl block mb-2">{c.emoji}</span>
              <h3 className="font-body font-medium text-[18px] text-white mb-1">{c.title}</h3>
              <p className="font-body text-[14px]" style={{ color: 'rgba(255,255,255,0.55)' }}>{c.body}</p>
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form key="form" name="murdock-partner-inquiry" method="POST" data-netlify="true" onSubmit={handleSubmit} className="max-w-[600px] mx-auto space-y-4" initial={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}>
              <input type="hidden" name="form-name" value="murdock-partner-inquiry" />
              <p className="hidden"><label>Don't fill this out: <input name="bot-field" /></label></p>

              <div>
                <label htmlFor="name" className="font-body font-medium text-[13px] text-gold uppercase tracking-[0.08em] block mb-1.5">Full Name *</label>
                <input id="name" name="name" required placeholder="Your full name" className={inputClass} style={inputStyle} value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div>
                <label htmlFor="org" className="font-body font-medium text-[13px] text-gold uppercase tracking-[0.08em] block mb-1.5">Organisation / Company *</label>
                <input id="org" name="organisation" required placeholder="Your organisation or company name" className={inputClass} style={inputStyle} />
              </div>
              <div>
                <label htmlFor="email" className="font-body font-medium text-[13px] text-gold uppercase tracking-[0.08em] block mb-1.5">Email Address *</label>
                <input id="email" name="email" type="email" required placeholder="your@email.com" className={inputClass} style={inputStyle} />
              </div>
              <div>
                <label htmlFor="intent" className="font-body font-medium text-[13px] text-gold uppercase tracking-[0.08em] block mb-1.5">How Can We Work Together? *</label>
                <select id="intent" name="intent" required className={`${inputClass} appearance-none`} style={inputStyle} defaultValue="">
                  <option value="" disabled>Select an option</option>
                  {selectOptions.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="message" className="font-body font-medium text-[13px] text-gold uppercase tracking-[0.08em] block mb-1.5">Tell Me More</label>
                <textarea id="message" name="message" rows={4} placeholder="Share your thoughts, use case, or questions. I read every message personally." className={inputClass} style={inputStyle} />
              </div>

              <motion.button type="submit" className="w-full bg-gold text-navy font-body font-bold text-[17px] py-4 rounded-[10px]" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                Send Message →
              </motion.button>
            </motion.form>
          ) : (
            <motion.div key="thanks" className="max-w-[600px] mx-auto text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <svg width="72" height="72" viewBox="0 0 72 72" className="mx-auto mb-6">
                <circle cx="36" cy="36" r="33" fill="none" stroke="#C9933A" strokeWidth="2.5" />
                <motion.polyline points="24,36 33,45 48,30" fill="none" stroke="#C9933A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 0.5 }} />
              </svg>
              <h3 className="font-display font-bold text-[32px] text-white mb-3">Thank you{name ? `, ${name}` : ''}.</h3>
              <p className="font-body text-[17px] mb-8" style={{ color: 'rgba(255,255,255,0.72)' }}>I'll be in touch soon. In the meantime, you can reach me directly on any of these channels:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {socialLinks.map(s => (
                  <a key={s.label} href={s.href} target={s.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer" className="glass-dark p-4 rounded-xl flex items-center gap-3 hover:border-gold transition-colors">
                    <s.icon className="w-5 h-5 text-white shrink-0" />
                    <span className="font-body font-medium text-[13px] text-white text-left">{s.label}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PartnerForm;
