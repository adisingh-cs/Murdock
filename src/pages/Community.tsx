import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { reveal, revealTransition } from '../lib/animations';
import { GitHubIcon } from '../components/SocialIcons';
import Magnetic from '../components/Magnetic';
import { ArrowUpRight } from 'lucide-react';

interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

const rfps = [
  { title: "UPI Fraud Recovery", priority: "High", bounty: "First Wave", tags: ["Cyber Law", "Banking"] },
  { title: "RTI Automation", priority: "High", bounty: "Movement", tags: ["Administrative", "Civics"] },
  { title: "Rental Dispute Kit", priority: "Medium", bounty: "Movement", tags: ["Property", "RERA"] },
  { title: "Employment Grievance", priority: "Medium", bounty: "Movement", tags: ["Labor Law"] }
];

const Community: React.FC = () => {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const res = await fetch('https://api.github.com/repos/adisingh-cs/Murdock/contributors');
        if (res.ok) {
          const data = await res.json();
          setContributors(data);
        }
      } catch (err) {
        console.error('Failed to fetch contributors:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchContributors();
  }, []);

  const filteredContributors = contributors.filter(c => 
    !c.login.toLowerCase().includes('lovable-dev') && 
    !c.login.toLowerCase().includes('lovable.dev')
  );

  return (
    <div className="dark bg-background text-foreground min-h-screen selection:bg-gold selection:text-black">
      <SEO title="Community — The Legal v1 Movement" />
      <Navbar />
      
      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="px-6 md:px-12 mx-auto max-w-[1240px] mb-32">
          <div className="max-w-[800px] space-y-8">
            <motion.div {...reveal} className="flex items-center gap-3">
              <div className="h-[1px] w-6 bg-gold/50" />
              <span className="font-body font-bold text-[11px] uppercase tracking-[0.3em] text-gold/80">The Movement</span>
            </motion.div>
            
            <motion.h1 
              {...reveal} 
              transition={{ ...revealTransition, delay: 0.1 }}
              className="font-display font-bold text-[48px] md:text-[80px] text-text-primary leading-[1.05] tracking-tight"
            >
              Built for <span className="text-gold italic font-normal">India.</span> <br />
              Owned by <span className="text-gold italic font-normal">Everyone.</span>
            </motion.h1>
            
            <motion.p 
              {...reveal} 
              transition={{ ...revealTransition, delay: 0.2 }}
              className="font-body text-[20px] text-text-secondary leading-relaxed max-w-[700px]"
            >
              Murdock is more than a tool; it's the first step towards a transparent, programmable legal system. Join the pool of developers and lawyers building the API-first legal infrastructure.
            </motion.p>
            
            <motion.div 
              {...reveal} 
              transition={{ ...revealTransition, delay: 0.3 }}
              className="flex gap-4 pt-4"
            >
              <Magnetic>
                <a 
                  href="https://github.com/adisingh-cs/Murdock" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-gold text-black rounded-full font-body font-bold text-[14px] hover:bg-gold-light transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(201,147,58,0.3)]"
                >
                  Start on GitHub
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </Magnetic>
            </motion.div>
          </div>
        </section>

        {/* Hall of Fame */}
        <section className="px-6 md:px-12 mx-auto max-w-[1240px] mb-32">
          <motion.div {...reveal} className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                <h2 className="font-display font-bold text-[36px] text-text-primary">Hall of Fame</h2>
                <p className="font-body text-[16px] text-text-muted">Automatically pulled from our GitHub contributors.</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                <GitHubIcon className="w-4 h-4 text-gold" />
                <span className="font-mono text-[12px] text-text-primary uppercase tracking-wider">{filteredContributors.length} Total Contributors</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="aspect-square rounded-2xl bg-white/[0.02] border border-white/5 animate-pulse" />
                ))
              ) : filteredContributors.length > 0 ? (
                filteredContributors.map((c, i) => (
                  <motion.a 
                    key={c.login}
                    href={c.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group relative flex flex-col items-center gap-4 p-6 glass-dark border border-white/10 rounded-2xl hover:border-gold/50 transition-all duration-300"
                  >
                    <div className="relative">
                      <img src={c.avatar_url} alt={c.login} className="w-20 h-20 rounded-full border-2 border-white/5 group-hover:border-gold/30 transition-colors" />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gold flex items-center justify-center font-mono text-[10px] text-background font-bold">
                        {c.contributions}
                      </div>
                    </div>
                    <span className="font-body font-bold text-[13px] text-text-primary group-hover:text-gold transition-colors truncate w-full text-center">
                      @{c.login}
                    </span>
                  </motion.a>
                ))
              ) : (
                <div className="col-span-full py-12 text-center glass-dark border border-dashed border-white/10 rounded-3xl">
                  <p className="font-body text-text-muted">No contributors found yet. Be the first!</p>
                  <a href="https://github.com/adisingh-cs/Murdock" className="text-gold underline block mt-4 text-[14px]">Submit a PR</a>
                </div>
              )}
            </div>
          </motion.div>
        </section>

        {/* RFPs / Roadmap */}
        <section className="px-6 md:px-12 mx-auto max-w-[1240px]">
          <motion.div {...reveal} className="space-y-12">
            <div className="space-y-4">
              <h2 className="font-display font-bold text-[36px] text-text-primary">Module RFP</h2>
              <p className="font-body text-[16px] text-text-muted">Prioritized modules seeking developers and legal architects.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {rfps.map((rfp, i) => (
                <motion.div 
                  key={rfp.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.5 }}
                  className="group p-8 glass-dark border border-white/5 rounded-3xl hover:border-gold/30 transition-all duration-500 flex flex-col justify-between gap-8"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${rfp.priority === 'High' ? 'text-red-400 bg-red-400/10 border border-red-400/20' : 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/20'}`}>
                        {rfp.priority} Priority
                      </span>
                      <span className="text-text-muted text-[11px] font-mono tracking-tighter italic">{rfp.bounty}</span>
                    </div>
                    <h3 className="font-display text-[24px] font-bold text-text-primary group-hover:text-gold transition-colors">{rfp.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {rfp.tags.map(tag => (
                        <span key={tag} className="text-[12px] text-text-muted px-2 py-1 border border-white/5 rounded bg-white/[0.02]">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <a href="https://github.com/adisingh-cs/Murdock" className="inline-flex items-center gap-2 text-gold text-[13px] font-bold uppercase tracking-widest hover:gap-4 transition-all">
                    I want to help ➔
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Community;
