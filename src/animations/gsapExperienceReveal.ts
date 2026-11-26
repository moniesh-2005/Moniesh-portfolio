import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ExperienceRevealOptions {
  root: HTMLElement;
}

/**
 * Reusable GSAP + ScrollTrigger entrance choreography for the Experience & Internships timeline.
 * Animates only compositor properties (transform, opacity) and respects reduced motion.
 */
export function runExperienceReveal({
  root,
}: ExperienceRevealOptions): gsap.Context {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  return gsap.context(() => {
    if (prefersReducedMotion) {
      gsap.set(
        [
          '[data-exp-kicker]',
          '[data-exp-headline-line]',
          '[data-exp-intro]',
          '[data-exp-spine]',
          '[data-exp-marker]',
          '[data-exp-card]',
          '[data-exp-transition]',
        ],
        { opacity: 1, y: 0, scaleY: 1, scale: 1, clearProps: 'transform' },
      );
      return;
    }

    gsap.from('[data-exp-kicker]', {
      y: 16,
      opacity: 0,
      duration: 0.65,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '[data-exp-header]',
        start: 'top 85%',
        once: true,
      },
    });

    gsap.from('[data-exp-headline-line]', {
      yPercent: 108,
      opacity: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '[data-exp-header]',
        start: 'top 82%',
        once: true,
      },
    });

    gsap.from('[data-exp-intro]', {
      y: 22,
      opacity: 0,
      duration: 0.75,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '[data-exp-header]',
        start: 'top 78%',
        once: true,
      },
    });

    // Vertical timeline spine smooth scale reveal
    const spine = root.querySelector('[data-exp-spine]');
    if (spine) {
      gsap.from(spine, {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-exp-timeline]',
          start: 'top 84%',
          once: true,
        },
      });
    }

    // Numbered markers and cards staggered entrance
    const markers = gsap.utils.toArray<HTMLElement>('[data-exp-marker]');
    markers.forEach((marker, idx) => {
      gsap.from(marker, {
        scale: 0.75,
        opacity: 0,
        duration: 0.55,
        delay: idx * 0.12,
        ease: 'back.out(1.6)',
        scrollTrigger: {
          trigger: marker,
          start: 'top 88%',
          once: true,
        },
      });
    });

    const cards = gsap.utils.toArray<HTMLElement>('[data-exp-card]');
    cards.forEach((card, idx) => {
      gsap.from(card, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: idx * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          once: true,
        },
      });
    });

    gsap.from('[data-exp-transition]', {
      y: 24,
      opacity: 0,
      duration: 0.75,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '[data-exp-transition]',
        start: 'top 90%',
        once: true,
      },
    });
  }, root);
}
