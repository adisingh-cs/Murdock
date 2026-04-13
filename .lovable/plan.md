

# MURDOCK — Landing Page Implementation Plan

## Overview
Build a stunning, animated single-page landing website for **MURDOCK** — an open-source legal document infrastructure platform for India. The site features 12 content sections, a custom loading screen, glassmorphism design, Framer Motion animations, and a Netlify-ready contact form.

## Brand & Design System
- **Colors**: Navy (#1B2B4B), Gold (#C9933A), Parchment (#F7F4EF) with glassmorphism effects
- **Typography**: Playfair Display (headings), DM Sans (body), JetBrains Mono (code) via Google Fonts
- **Animations**: Framer Motion throughout — scroll reveals, staggered children, hover effects, animated counters

## Components to Build

### Core Components
1. **Logo (SVG)** — Document icon with checkmark + "MURDOCK" wordmark, reusable across site
2. **Loading Screen** — Navy fullscreen, animated logo + progress bar, session-based (shows once per session)
3. **Navbar** — Sticky with glassmorphism on scroll, nav links, GitHub pill, "Partner With Us" CTA, mobile hamburger drawer
4. **Footer** — 4-column layout with brand, navigation, project links, social icons

### Content Sections (12 total)
5. **Hero** — Full viewport, navy bg, Ashoka Chakra SVG pattern, animated gradient blobs, headline with gold accent, dual CTAs, tech trust strip
6. **The Problem** — Parchment bg, story paragraph, 3 glassmorphism problem cards, animated stat counters (1.5B+, 3 Cr+, ₹0)
7. **What We Build** — Navy bg, IS/IS NOT comparison table, 3-step "How It Works" flow with connector lines, Golden Rule callout
8. **Who It's For** — 4 audience cards (Law Firms, Enterprises, Government, Developers) in 2×2 grid
9. **Tech Foundation** — Tech stack grid + 7-step pipeline stepper + AI provider abstraction pills
10. **Legal Modules & Roadmap** — 2 live module cards (Consumer Complaints, Rental Disputes) + horizontally scrollable future roadmap
11. **Open Source** — Contribution table + repository status card
12. **Founder** — Avatar + social links card alongside pull-quote statement
13. **Partner Form** — 3 intent cards + Netlify form (name, org, email, dropdown, textarea) + animated thank-you screen with personalized name
14. **Custom 404** — Navy bg, Ashoka Chakra backdrop, witty copy, home button

## Technical Details
- Install `framer-motion` for all animations
- Global smooth scrolling, custom selection color, styled scrollbars
- All SVG icons inline (GitHub, LinkedIn, X, Instagram, Mail, tech logos)
- Responsive: mobile (<640px), tablet (640-1024px), desktop (>1024px)
- Accessibility: aria-labels, linked form labels, gold focus rings, `useReducedMotion` support
- Lazy-load below-fold sections
- `netlify.toml` for deployment config
- Netlify Forms with honeypot spam protection

## File Structure
Organized into `components/` (Logo, Navbar, LoadingScreen, Footer), `sections/` (Hero, Problem, WhatWeDo, etc.), and `pages/` (Home, NotFound).

