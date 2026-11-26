import gsap from 'gsap';

export interface HeroEntranceOptions {
  root: HTMLElement;
}

/**
 * Reusable GSAP entrance choreography for the MONIESH® Hero section.
 * Respects `prefers-reduced-motion` and cleans up cleanly via gsap.context().
 */
export function runHeroEntrance({ root }: HeroEntranceOptions): gsap.Context {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  return gsap.context(() => {
    if (prefersReducedMotion) {
      gsap.set(
        [
          '[data-hero-nav]',
          '[data-hero-kicker]',
          '[data-hero-line]',
          '[data-hero-intro]',
          '[data-hero-cta]',
          '[data-hero-card]',
          '[data-hero-scroll]',
        ],
        { opacity: 1, y: 0, clearProps: 'transform' },
      );
      return;
    }

    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out',
      },
    });

    tl.from('[data-hero-nav]', {
      y: -18,
      opacity: 0,
      duration: 0.65,
    })
      .from(
        '[data-hero-kicker]',
        {
          y: 16,
          opacity: 0,
          duration: 0.55,
        },
        '-=0.35',
      )
      .from(
        '[data-hero-line]',
        {
          yPercent: 110,
          opacity: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: 'expo.out',
        },
        '-=0.35',
      )
      .from(
        '[data-hero-intro]',
        {
          y: 22,
          opacity: 0,
          duration: 0.7,
        },
        '-=0.45',
      )
      .from(
        '[data-hero-cta]',
        {
          y: 18,
          opacity: 0,
          duration: 0.6,
        },
        '-=0.45',
      )
      .from(
        '[data-hero-card]',
        {
          y: 24,
          opacity: 0,
          duration: 0.65,
          stagger: 0.12,
        },
        '-=0.35',
      )
      .from(
        '[data-hero-scroll]',
        {
          y: 12,
          opacity: 0,
          duration: 0.5,
        },
        '-=0.3',
      );
  }, root);
}
