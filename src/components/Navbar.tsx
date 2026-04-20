import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, LogOut, LayoutDashboard, ShieldAlert } from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo';
import Magnetic from './Magnetic';

const navLinks = [
  { label: 'The Problem', href: '#problem' },
  { label: 'Our Work', href: '#what-we-do' },
  { label: 'Foundation', href: '#tech' },
  { label: 'Open Source', href: '#open-source' },
  { label: 'Founder', href: '#founder' },
];

const Navbar: React.FC = () => {
  const { session, user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollY } = useScroll();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navScale = useTransform(scrollY, [0, 50], [1, 0.95]);
  const navY = useTransform(scrollY, [0, 50], [0, 10]);
  const navBg = useTransform(
    scrollY,
    [0, 50],
    ["rgba(10, 10, 10, 0)", "rgba(10, 10, 10, 0.8)"]
  );
  const navBorder = useTransform(
    scrollY,
    [0, 50],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.1)"]
  );
  const navPadding = useTransform(scrollY, [0, 50], ["18px", "12px"]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/' + href);
      return;
    }

    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 pointer-events-none"
        style={{ y: navY, scale: navScale }}
      >
        <motion.div 
          className="mx-auto max-w-[1020px] flex items-center justify-between px-6 md:px-8 py-3 rounded-2xl border pointer-events-auto shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          style={{ 
            backgroundColor: navBg, 
            borderColor: navBorder,
            backdropFilter: "blur(12px)",
            paddingTop: navPadding,
            paddingBottom: navPadding,
          }}
        >
          <button onClick={handleLogoClick} className="shrink-0 transition-transform hover:scale-[1.02] active:scale-[0.98]">
            <Logo height={32} white />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((l) => (
              <button
                key={l.label}
                onClick={() => scrollTo(l.href)}
                className="font-body font-bold text-[11px] uppercase tracking-[0.2em] text-text-secondary hover:text-gold transition-all"
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-5">
            {/* Supabase Auth */}
            {!session ? (
              <div className="flex gap-2 items-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="font-body font-bold text-[12px] uppercase tracking-[0.15em] text-black bg-gold hover:bg-gold-light px-6 py-2.5 rounded-lg cursor-pointer transition-all shadow-[0_0_15px_rgba(201,147,58,0.2)]">
                      Get Started
                    </button>
                  </DialogTrigger>
                  <DialogContent className="w-[92vw] max-w-sm sm:max-w-md bg-[#0A0A0A] border border-white/10 p-6 sm:p-8 shadow-2xl rounded-2xl flex flex-col items-center gap-4 sm:gap-6">
                    <div className="flex flex-col items-center text-center space-y-2">
                      <Logo height={40} white />
                      <h2 className="text-xl sm:text-2xl font-display font-bold text-white mt-2 sm:mt-4">Welcome to Murdock</h2>
                      <p className="text-text-muted text-xs sm:text-sm font-body">Sign in to access your dashboard.</p>
                    </div>
                    <div className="w-full max-w-[300px] -mt-5">
                      <Auth
                        supabaseClient={supabase}
                        onlyThirdPartyProviders={true}
                        providers={['google']}
                        appearance={{
                          theme: ThemeSupa,
                          variables: {
                            default: {
                              colors: {
                                brand: '#C9933A',
                                brandAccent: '#D49F45',
                              },
                            },
                          },
                          className: {
                            container: 'font-body',
                            divider: 'hidden',
                            button: '!font-bold !uppercase !tracking-wider !rounded-xl !bg-white/[0.05] !hover:bg-white/[0.1] !border !border-white/10 !text-white !transition-all !py-3 w-full',
                          }
                        }}
                        redirectTo={window.location.origin + '/dashboard'}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            ) : (
              <div className="pl-2">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
                    <Avatar className="h-8 w-8 border border-white/10">
                      <AvatarImage src={user?.user_metadata?.avatar_url} />
                      <AvatarFallback className="bg-white/5 text-xs text-white">
                        {user?.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-[13px] font-bold font-body text-text-primary hidden sm:block">
                      {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
                    </span>
                    <ChevronDown className="h-4 w-4 text-text-muted" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-background border-white/10 bg-opacity-90 backdrop-blur-xl">
                    <DropdownMenuItem className="cursor-pointer text-text-secondary hover:text-white focus:text-white font-body" onClick={() => navigate('/dashboard')}>
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>
                    {user?.isAdmin && (
                      <DropdownMenuItem className="cursor-pointer text-gold hover:text-gold-light focus:text-gold-light font-body" onClick={() => navigate('/admin')}>
                        <ShieldAlert className="mr-2 h-4 w-4" />
                        Admin Panel
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem className="cursor-pointer text-red-400 hover:text-red-300 focus:text-red-300 font-body" onClick={signOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-text-primary p-2 hover:text-gold transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          </button>
        </motion.div>
      </motion.nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-background/95 backdrop-blur-md" onClick={() => setMobileOpen(false)} />
            <motion.div
              className="absolute right-0 top-0 h-full w-[80%] max-w-[320px] bg-background border-l border-white/5 p-10 flex flex-col gap-8 pt-24"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            >
              {navLinks.map((l) => (
                <button
                  key={l.label}
                  onClick={() => scrollTo(l.href)}
                  className="font-display font-bold text-[28px] text-text-primary hover:text-gold transition-colors text-left"
                >
                  {l.label}
                </button>
              ))}
              <div className="mt-auto pt-8 border-t border-white/5 opacity-50">
                <p className="font-body text-[10px] uppercase tracking-widest text-text-muted">
                  Legal Infrastructure v1.0
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

