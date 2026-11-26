import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface TechRevealOptions {
  root: HTMLElement;
}

/**
 * Reusable GSAP + ScrollTrigger entrance choreography for the Tech Stack section.
 * Uses only GPU compositor transforms and opacity and respects reduced motion.
 */
export function runTechReveal({ root }: TechRevealOptions): gsap.Context {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  return gsap.context(() => {
    if (prefersReducedMotion) {
      gsap.set(
        [
          '[data-tech-kicker]',
          '[data-tech-headline-line]',
          '[data-tech-intro]',
          '[data-tech-category]',
          '[data-tech-chip]',
        ],
        { opacity: 1, y: 0, scale: 1, clearProps: 'transform' },
      );
      return;
    }

    gsap.from('[data-tech-kicker]', {
      y: 16,
      opacity: 0,
      duration: 0.65,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '[data-tech-header]',
        start: 'top 85%',
        once: true,
      },
    });

    gsap.from('[data-tech-headline-line]', {
      yPercent: 108,
      opacity: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '[data-tech-header]',
        start: 'top 82%',
        once: true,
      },
    });

    gsap.from('[data-tech-intro]', {
      y: 22,
      opacity: 0,
      duration: 0.75,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '[data-tech-header]',
        start: 'top 78%',
        once: true,
      },
    });

    const categories = gsap.utils.toArray<HTMLElement>('[data-tech-category]');
    categories.forEach((cat, idx) => {
      gsap.from(cat, {
        y: 30,
        opacity: 0,
        scale: 0.985,
        duration: 0.8,
        delay: (idx % 3) * 0.07,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cat,
          start: 'top 88%',
          once: true,
        },
      });
    });

    const chips = gsap.utils.toArray<HTMLElement>('[data-tech-chip]');
    chips.forEach((chip, idx) => {
      gsap.from(chip, {
        y: 12,
        opacity: 0,
        duration: 0.45,
        delay: (idx % 6) * 0.04,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: chip,
          start: 'top 92%',
          once: true,
        },
      });
    });
  }, root);
}
