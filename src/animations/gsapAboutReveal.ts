import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface AboutRevealOptions {
  root: HTMLElement;
}

/**
 * Reusable GSAP + ScrollTrigger choreography for the MONIESH® About Me section.
 * Animates only compositor properties (transform, opacity) and honors reduced motion.
 */
export function runAboutReveal({ root }: AboutRevealOptions): gsap.Context {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  return gsap.context(() => {
    if (prefersReducedMotion) {
      gsap.set(
        [
          '[data-about-kicker]',
          '[data-about-headline-line]',
          '[data-about-intro]',
          '[data-about-portrait]',
          '[data-about-float-card]',
          '[data-about-edu]',
          '[data-about-philosophy]',
          '[data-about-transition]',
        ],
        { opacity: 1, y: 0, x: 0, clearProps: 'transform' },
      );
      return;
    }

    // Hero-to-About headline & intro reveal
    gsap.from('[data-about-kicker]', {
      y: 18,
      opacity: 0,
      duration: 0.65,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '[data-about-header]',
        start: 'top 84%',
        once: true,
      },
    });

    gsap.from('[data-about-headline-line]', {
      yPercent: 108,
      opacity: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '[data-about-header]',
        start: 'top 82%',
        once: true,
      },
    });

    gsap.from('[data-about-intro]', {
      y: 26,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '[data-about-intro]',
        start: 'top 86%',
        once: true,
      },
    });

    // Portrait visual frame reveal
    gsap.from('[data-about-portrait]', {
      y: 36,
      opacity: 0,
      scale: 0.97,
      duration: 0.95,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '[data-about-portrait]',
        start: 'top 84%',
        once: true,
      },
    });

    // Floating information cards staggered reveal + subtle scroll parallax
    gsap.from('[data-about-float-card]', {
      y: 28,
      opacity: 0,
      duration: 0.75,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '[data-about-cards-trigger]',
        start: 'top 85%',
        once: true,
      },
    });

    const parallaxCards = gsap.utils.toArray<HTMLElement>(
      '[data-about-parallax]',
    );
    parallaxCards.forEach((el) => {
      const speed = Number(el.dataset.aboutParallax || '18');
      gsap.fromTo(
        el,
        { y: speed },
        {
          y: -speed,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.9,
          },
        },
      );
    });

    // Education editorial block reveal
    gsap.from('[data-about-edu]', {
      y: 28,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '[data-about-edu-section]',
        start: 'top 84%',
        once: true,
      },
    });

    // Developer philosophy chapters reveal
    gsap.from('[data-about-philosophy]', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.14,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '[data-about-philosophy-section]',
        start: 'top 84%',
        once: true,
      },
    });

    // Bottom transition teaser into Selected Projects
    gsap.from('[data-about-transition]', {
      y: 28,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '[data-about-transition]',
        start: 'top 88%',
        once: true,
      },
    });
  }, root);
}
