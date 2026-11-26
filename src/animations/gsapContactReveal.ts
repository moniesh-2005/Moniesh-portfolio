import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ContactRevealOptions {
  root: HTMLElement;
}

/**
 * Reusable GSAP + ScrollTrigger entrance choreography for the closing Contact section.
 * Uses only GPU compositor transforms and opacity and respects reduced motion.
 */
export function runContactReveal({
  root,
}: ContactRevealOptions): gsap.Context {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  return gsap.context(() => {
    if (prefersReducedMotion) {
      gsap.set(
        [
          '[data-contact-kicker]',
          '[data-contact-headline-line]',
          '[data-contact-intro]',
          '[data-contact-cta]',
          '[data-contact-card]',
          '[data-contact-footer]',
        ],
        { opacity: 1, y: 0, scale: 1, clearProps: 'transform' },
      );
      return;
    }

    gsap.from('[data-contact-kicker]', {
      y: 16,
      opacity: 0,
      duration: 0.65,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '[data-contact-header]',
        start: 'top 85%',
        once: true,
      },
    });

    gsap.from('[data-contact-headline-line]', {
      yPercent: 108,
      opacity: 0,
      duration: 0.95,
      stagger: 0.1,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '[data-contact-header]',
        start: 'top 82%',
        once: true,
      },
    });

    gsap.from('[data-contact-intro]', {
      y: 22,
      opacity: 0,
      duration: 0.75,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '[data-contact-header]',
        start: 'top 78%',
        once: true,
      },
    });

    gsap.from('[data-contact-cta]', {
      y: 20,
      opacity: 0,
      scale: 0.96,
      duration: 0.75,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '[data-contact-cta]',
        start: 'top 88%',
        once: true,
      },
    });

    const cards = gsap.utils.toArray<HTMLElement>('[data-contact-card]');
    cards.forEach((card, idx) => {
      gsap.from(card, {
        y: 28,
        opacity: 0,
        duration: 0.75,
        delay: idx * 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          once: true,
        },
      });
    });

    gsap.from('[data-contact-footer]', {
      y: 18,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '[data-contact-footer]',
        start: 'top 95%',
        once: true,
      },
    });
  }, root);
}
