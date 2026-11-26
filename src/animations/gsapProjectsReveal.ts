import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ProjectsRevealOptions {
  root: HTMLElement;
}

/**
 * Reusable GSAP + ScrollTrigger entrance choreography for the 2x2 Selected Projects gallery.
 * Treats all four project cards identically using GPU compositor transforms and opacity.
 */
export function runProjectsReveal({ root }: ProjectsRevealOptions): gsap.Context {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  return gsap.context(() => {
    if (prefersReducedMotion) {
      gsap.set(
        [
          '[data-projects-kicker]',
          '[data-projects-headline-line]',
          '[data-projects-intro]',
          '[data-project-card]',
          '[data-project-image-reveal]',
        ],
        { opacity: 1, y: 0, scale: 1, clearProps: 'transform' },
      );
      return;
    }

    gsap.from('[data-projects-kicker]', {
      y: 16,
      opacity: 0,
      duration: 0.65,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '[data-projects-header]',
        start: 'top 85%',
        once: true,
      },
    });

    gsap.from('[data-projects-headline-line]', {
      yPercent: 108,
      opacity: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '[data-projects-header]',
        start: 'top 82%',
        once: true,
      },
    });

    gsap.from('[data-projects-intro]', {
      y: 22,
      opacity: 0,
      duration: 0.75,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '[data-projects-header]',
        start: 'top 78%',
        once: true,
      },
    });

    // Equal staggered entrance for all four project cards in the 2x2 grid
    const cards = gsap.utils.toArray<HTMLElement>('[data-project-card]');
    cards.forEach((card, index) => {
      gsap.from(card, {
        y: 34,
        opacity: 0,
        scale: 0.985,
        duration: 0.82,
        delay: (index % 2) * 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          once: true,
        },
      });
    });

    // Identical smooth image reveal on every card preview frame
    const imageFrames = gsap.utils.toArray<HTMLElement>(
      '[data-project-image-reveal]',
    );
    imageFrames.forEach((frame) => {
      gsap.from(frame, {
        scale: 1.07,
        opacity: 0.6,
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: frame,
          start: 'top 90%',
          once: true,
        },
      });
    });
  }, root);
}
