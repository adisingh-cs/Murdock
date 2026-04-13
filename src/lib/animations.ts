import { type Transition } from 'framer-motion';

export const revealTransition: Transition = {
  duration: 0.65,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

export const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 as const },
  transition: revealTransition,
};

export const staggerParent = {
  initial: {},
  whileInView: {},
  viewport: { once: true, amount: 0.2 as const },
  transition: { staggerChildren: 0.1 },
};
