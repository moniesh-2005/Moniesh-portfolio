import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Mail, Sparkles, X } from 'lucide-react';
import { Navbar } from '@/src/components/layout/Navbar';
import { runHeroEntrance } from '@/src/animations/gsapHeroEntrance';
import { useSmoothScroll } from '@/src/animations/useSmoothScroll';
import { NavSectionId, SECTION_PREVIEWS } from '@/src/types/portfolio';

const HeroCanvas = lazy(() => import('@/src/components/three/HeroCanvas'));

export interface HeroSectionProps {
  requestedSection?: { id: NavSectionId; nonce: number } | null;
}

/**
 * Full-screen experimental 3D Hero section for MONIESH®.
 * Preserves left-column oversized typography and right-side 3D character balance
 * across desktop, tablet, and mobile with zero horizontal overflow.
 */
export function HeroSection({ requestedSection }: HeroSectionProps) {
  const heroRootRef = useRef<HTMLDivElement>(null);
  const headlineShiftRef = useRef<HTMLDivElement>(null);
  const scrollBarRef = useRef<HTMLDivElement>(null);

  const [activeSection, setActiveSection] = useState<NavSectionId>('home');
  const [characterClicks, setCharacterClicks] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  const { progressRef, scrollToTop, scrollToFraction } = useSmoothScroll(
    (progress) => {
      setHasScrolled(progress > 0.15);

      if (headlineShiftRef.current) {
        const y = -progress * 22;
        headlineShiftRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
      }
      if (scrollBarRef.current) {
        scrollBarRef.current.style.transform = `scaleX(${Math.max(0.12, progress)})`;
      }
    },
  );

  useEffect(() => {
    if (!heroRootRef.current) return;
    const ctx = runHeroEntrance({ root: heroRootRef.current });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!requestedSection) return;
    setActiveSection(requestedSection.id);
    if (requestedSection.id === 'about') {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      scrollToTop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestedSection]);

  const handleSelectSection = (section: NavSectionId) => {
    setActiveSection(section);
    if (section === 'home') {
      scrollToTop();
    } else if (section === 'about') {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activePreview = SECTION_PREVIEWS[activeSection];

  return (
    <div
      ref={heroRootRef}
      id="home"
      className="relative min-h-[140svh] w-full overflow-x-clip"
    >
      {/* Sticky full-viewport hero canvas & editorial overlay */}
      <section className="sticky top-0 flex h-[100svh] w-full flex-col justify-between overflow-hidden">
        {/* Atmospheric lime-to-olive layered radial studio backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(54% 58% at 73% 50%, rgba(238, 255, 162, 0.5) 0%, rgba(173, 224, 52, 0.2) 48%, rgba(62, 92, 12, 0.34) 100%), radial-gradient(45% 45% at 15% 22%, rgba(226, 250, 120, 0.28) 0%, transparent 70%)',
          }}
        />

        {/* Dynamically loaded 3D WebGL stage */}
        <Suspense
          fallback={
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center justify-end pr-16"
            >
              <div className="h-64 w-64 rounded-full bg-[#e3fa88]/25 blur-3xl" />
            </div>
          }
        >
          <HeroCanvas
            scrollProgressRef={progressRef}
            cameraOffset={activePreview.cameraOffset}
            onCharacterInteract={() => setCharacterClicks((c) => c + 1)}
          />
        </Suspense>

        {/* Floating Rounded Top Navigation Bar */}
        <Navbar
          activeSection={activeSection}
          onSelectSection={handleSelectSection}
        />

        {/* Main Hero Content Grid (Left typographic zone kept clear of right-side 3D character) */}
        <main className="pointer-events-none relative z-20 mx-auto flex w-full max-w-[1360px] flex-1 flex-col justify-between px-5 sm:px-8 lg:px-10 pb-6 sm:pb-9 pt-4 sm:pt-7">
          <div
            ref={headlineShiftRef}
            className="pointer-events-auto max-w-lg md:max-w-[48%] will-change-transform"
          >
            {/* Clean unboxed editorial kicker */}
            <p
              data-hero-kicker
              className="mb-2.5 sm:mb-3.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm font-semibold tracking-wide text-[#133519]/85"
            >
              <span>Creative Developer</span>
              <span aria-hidden="true">·</span>
              <span>AI &amp; Interactive 3D</span>
              <span aria-hidden="true">·</span>
              <span>Available 2026</span>
            </p>

            {/* Oversized Bold Agency Typography */}
            <h1 className="font-display text-[clamp(2.55rem,5.6vw,5.4rem)] font-extrabold leading-[0.9] tracking-[-0.04em] text-[#091e0e] [text-wrap:balance]">
              <span className="block overflow-hidden pb-1">
                <span data-hero-line className="block">
                  BUILDING
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span data-hero-line className="block">
                  BEYOND
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span data-hero-line className="block text-[#143d1d]">
                  THE CODE.
                </span>
              </span>
            </h1>

            {/* Concise Introduction */}
            <p
              data-hero-intro
              className="mt-3.5 sm:mt-5 max-w-md text-sm sm:text-base lg:text-lg font-medium leading-relaxed text-[#123318]"
            >
              Full-stack developer exploring AI, software engineering and
              creative technology.
            </p>

            {/* Primary & Secondary Actions */}
            <div
              data-hero-cta
              className="mt-4 sm:mt-6 flex flex-wrap items-center gap-3.5"
            >
              <button
                type="button"
                onClick={() => handleSelectSection('projects')}
                className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-[#091e0e] px-5 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-[#f5fce0] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#153e1d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#091e0e]"
              >
                <span>Explore Work</span>
                <ArrowUpRight className="h-4 w-4 text-[#ccf252] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                type="button"
                onClick={() => handleSelectSection('contact')}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#091e0e]/25 bg-[#f5fce0]/45 px-4 sm:px-5 py-3 text-xs sm:text-sm font-semibold text-[#091e0e] transition-all duration-200 hover:bg-[#f5fce0]/75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#091e0e]"
              >
                <Mail className="h-4 w-4" />
                <span>Get in Touch</span>
              </button>
            </div>
          </div>

          {/* Bottom Row: Rounded Glassmorphism Cards with balanced spacing + Scroll Cue */}
          <div className="pointer-events-none mt-auto flex flex-col lg:flex-row lg:items-end justify-between gap-4 pt-6 sm:pt-8">
            <div className="pointer-events-auto grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl md:max-w-[50%]">
              {/* Card 1: Core Disciplines Glass Card */}
              <div
                data-hero-card
                className="glass-studio-light rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-2.5"
              >
                <div className="flex items-center justify-between text-xs font-semibold tracking-tight text-[#143a1c]/75">
                  <span>01. Studio Craft</span>
                  <span>Systems &amp; Motion</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold leading-snug text-[#091e0e]">
                  Full-stack architecture paired with expressive WebGL and AI
                  interfaces.
                </p>
              </div>

              {/* Card 2: Interactive 3D / Section Preview Glass Card */}
              <div
                data-hero-card
                className="glass-studio-dark rounded-2xl p-4 sm:p-5 text-[#f5fce0] flex flex-col justify-between gap-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-[#ccf252]">
                    {activeSection === 'home'
                      ? '02. Interactive 3D'
                      : activePreview.subtitle}
                  </span>
                  {activeSection !== 'home' ? (
                    <button
                      type="button"
                      onClick={() => setActiveSection('home')}
                      aria-label="Return to hero overview"
                      className="inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white/10 text-[#f5fce0] hover:bg-white/20 transition-colors"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  ) : (
                    <Sparkles className="h-4 w-4 text-[#ccf252]" />
                  )}
                </div>

                {activeSection === 'home' ? (
                  <p className="text-xs sm:text-[13px] leading-snug text-[#f5fce0]/90">
                    Move cursor to guide gaze and depth. Click character to
                    interact
                    {characterClicks > 0 ? ` (${characterClicks})` : ''}.
                  </p>
                ) : (
                  <div>
                    <p className="text-sm font-semibold text-[#f5fce0]">
                      {activePreview.title}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-[#f5fce0]/80">
                      {activePreview.summary}
                    </p>
                    <p className="mt-1.5 text-[11px] font-medium text-[#ccf252]">
                      {activePreview.highlights.join(' · ')}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Smooth Scroll Depth Cue */}
            <div
              data-hero-scroll
              className="pointer-events-auto hidden sm:flex items-center gap-3 self-end"
            >
              <button
                type="button"
                onClick={() => scrollToFraction(hasScrolled ? 0 : 1)}
                className="group inline-flex cursor-pointer items-center gap-3 rounded-full glass-studio-light px-4 py-2.5 text-xs font-semibold text-[#091e0e] transition-transform duration-200 hover:-translate-y-0.5"
              >
                <span>
                  {hasScrolled ? 'Back to top' : 'Scroll for 3D depth'}
                </span>
                <span className="h-1 w-10 overflow-hidden rounded-full bg-[#091e0e]/15">
                  <span
                    ref={scrollBarRef}
                    className="block h-full w-full origin-left bg-[#091e0e] transition-transform duration-100"
                    style={{ transform: 'scaleX(0.12)' }}
                  />
                </span>
                <ArrowDown
                  className={`h-3.5 w-3.5 transition-transform duration-300 ${
                    hasScrolled ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}
