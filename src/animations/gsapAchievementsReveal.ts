import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface AchievementsRevealOptions {
  root: HTMLElement;
}

/**
 * Reusable GSAP + ScrollTrigger entrance choreography for the Achievements & Activities section.
 * Animates only GPU compositor properties (transform, opacity) and respects reduced motion.
 */
export function runAchievementsReveal({
  root,
}: AchievementsRevealOptions): gsap.Context {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  return gsap.context(() => {
    if (prefersReducedMotion) {
      gsap.set(
        [
          '[data-ach-kicker]',
          '[data-ach-headline-line]',
          '[data-ach-intro]',
          '[data-ach-card]',
        ],
        { opacity: 1, y: 0, scale: 1, clearProps: 'transform' },
      );
      return;
    }

    gsap.from('[data-ach-kicker]', {
      y: 16,
      opacity: 0,
      duration: 0.65,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '[data-ach-header]',
        start: 'top 85%',
        once: true,
      },
    });

    gsap.from('[data-ach-headline-line]', {
      yPercent: 108,
      opacity: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '[data-ach-header]',
        start: 'top 82%',
        once: true,
      },
    });

    gsap.from('[data-ach-intro]', {
      y: 22,
      opacity: 0,
      duration: 0.75,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '[data-ach-header]',
        start: 'top 78%',
        once: true,
      },
    });

    const cards = gsap.utils.toArray<HTMLElement>('[data-ach-card]');
    cards.forEach((card, idx) => {
      gsap.from(card, {
        y: 30,
        opacity: 0,
        scale: 0.985,
        duration: 0.8,
        delay: (idx % 2) * 0.09,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          once: true,
        },
      });
    });
  }, root);
}
