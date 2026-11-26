import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { ArrowUp, ArrowUpRight, GraduationCap } from 'lucide-react';
import { runAboutReveal } from '@/src/animations/gsapAboutReveal';

const AboutCanvas = lazy(() => import('./AboutCanvas'));

export interface AboutSectionProps {
  onExploreProjects?: () => void;
  onBackToTop?: () => void;
}

const PHILOSOPHY_PILLARS = [
  {
    index: '01.',
    title: 'Full-Stack Development',
    description:
      'Building end-to-end web experiences where clean backend architecture, typed APIs, and responsive frontend craft work together seamlessly.',
  },
  {
    index: '02.',
    title: 'AI Applications & Automation',
    description:
      'Exploring AI-powered applications and intelligent automation workflows that turn complex tasks into intuitive, helpful software.',
  },
  {
    index: '03.',
    title: 'Practical Real-World Solutions',
    description:
      'Focused on solving real, everyday problems through thoughtful engineering, clear design, and creative technology.',
  },
] as const;

const MARQUEE_ITEMS = [
  'B.Tech Information Technology',
  'CHRIST University, Bengaluru',
  'Full-Stack Development',
  'AI-Powered Applications',
  'Automation & Creative Tech',
];

/**
 * Editorial "A LITTLE ABOUT ME." section for the MONIESH® portfolio.
 * Continues the lime-green, olive, and dark forest-green visual language with
 * asymmetric editorial layout, GSAP ScrollTrigger reveals, and subtle 3D depth.
 */
export function AboutSection({
  onExploreProjects,
  onBackToTop,
}: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [portraitFailed, setPortraitFailed] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = runAboutReveal({ root: sectionRef.current });
    return () => ctx.revert();
  }, []);

  const handleExploreProjects = () => {
    if (onExploreProjects) {
      onExploreProjects();
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToTop = () => {
    if (onBackToTop) {
      onBackToTop();
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      className="relative z-30 -mt-10 sm:-mt-14 w-full overflow-hidden rounded-t-[2.25rem] sm:rounded-t-[3.5rem] bg-[#0b210f] text-[#f5fce0] shadow-[0_-28px_70px_-18px_rgba(9,30,14,0.55)]"
    >
      {/* Layered deep forest-to-olive studio atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(62% 48% at 82% 16%, rgba(188, 232, 59, 0.16) 0%, rgba(94, 130, 22, 0.08) 45%, transparent 78%), radial-gradient(50% 42% at 14% 58%, rgba(140, 185, 36, 0.14) 0%, transparent 72%), linear-gradient(180deg, #0b210f 0%, #102b15 52%, #15371a 100%)',
        }}
      />

      {/* Subtle lazy-loaded 3D ambient sculpture backdrop */}
      <Suspense fallback={null}>
        <AboutCanvas />
      </Suspense>

      {/* Top Editorial Marquee Divider Ribbon transitioning from Hero */}
      <div className="relative z-10 border-b border-[#ccf252]/14 bg-[#091b0c]/75 py-3.5 sm:py-4 overflow-hidden">
        <div className="about-marquee-track flex w-max items-center gap-8 text-xs sm:text-[13px] font-medium tracking-wide text-[#ccf252]/85">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map(
            (item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-8 whitespace-nowrap shrink-0"
              >
                <span>{item}</span>
                <span aria-hidden="true" className="text-[#8cb924]">
                  ·
                </span>
              </span>
            ),
          )}
        </div>
      </div>

      {/* Main Editorial Content Container */}
      <div className="relative z-10 mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-10 pt-16 sm:pt-24 lg:pt-28 pb-16 sm:pb-24">
        {/* 1. Large Editorial Header & Introduction */}
        <header data-about-header className="max-w-5xl">
          <p
            data-about-kicker
            className="mb-4 sm:mb-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm font-semibold tracking-wide text-[#ccf252]"
          >
            <span>01. Profile</span>
            <span aria-hidden="true">·</span>
            <span>Bengaluru, India</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">2023–2027</span>
          </p>

          <h2
            id="about-heading"
            className="font-display text-[clamp(2.75rem,7vw,6.1rem)] font-extrabold leading-[0.9] tracking-[-0.04em] text-[#f5fce0] [text-wrap:balance]"
          >
            <span className="block overflow-hidden pb-1">
              <span data-about-headline-line className="block">
                A LITTLE
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span data-about-headline-line className="block text-[#ccf252]">
                ABOUT ME.
              </span>
            </span>
          </h2>

          <p
            data-about-intro
            className="mt-7 sm:mt-10 max-w-3xl text-lg sm:text-2xl lg:text-[1.75rem] font-medium leading-[1.42] tracking-[-0.015em] text-[#f5fce0]/92"
          >
            I&apos;m Moniesh, an Information Technology student and developer
            interested in building meaningful digital experiences through
            software engineering, AI and creative technology.
          </p>
        </header>

        {/* 2, 3, 4. Asymmetric Split: Personal Portrait + Floating Info Cards & Education */}
        <div className="mt-14 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Personal Profile Visual Area + Floating Info Cards */}
          <div
            data-about-cards-trigger
            className="lg:col-span-5 relative flex flex-col gap-5"
          >
            <div
              data-about-portrait
              className="relative overflow-hidden rounded-[2rem] border border-[#ccf252]/20 bg-[#133319] shadow-[0_32px_70px_-20px_rgba(4,14,6,0.75)]"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                {!portraitFailed ? (
                  <img
                    src="/assets/aistudio/passport_size_photo__1__3d334014.png"
                    alt="Portrait of Moniesh, Information Technology student and developer"
                    referrerPolicy="no-referrer"
                    onError={() => setPortraitFailed(true)}
                    className="h-full w-full object-cover object-top scale-[1.02] brightness-[0.96] contrast-[1.03]"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#1b4621] via-[#123017] to-[#091c0c] p-8 text-center">
                    <span className="font-display text-5xl font-extrabold tracking-tight text-[#ccf252]">
                      M®
                    </span>
                    <span className="mt-3 text-sm font-medium text-[#f5fce0]/80">
                      Moniesh · Bengaluru
                    </span>
                  </div>
                )}

                {/* Subtle olive-forest atmospheric studio scrim for clean contrast */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(188,232,59,0.08) 0%, rgba(11,33,15,0.06) 48%, rgba(9,28,12,0.86) 100%)',
                  }}
                />

                {/* Clean bottom caption inside visual area */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 flex items-end justify-between gap-4">
                  <div>
                    <p className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#f5fce0]">
                      Moniesh
                    </p>
                    <p className="mt-0.5 text-xs sm:text-sm font-medium text-[#ccf252]/90">
                      Developer · IT Undergraduate
                    </p>
                  </div>
                  <span className="text-xs font-semibold tabular-nums text-[#f5fce0]/75">
                    Bengaluru
                  </span>
                </div>
              </div>
            </div>

            {/* Small Floating Information Cards (Asymmetric overlap on lg+, clean grid on mobile/tablet) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:block gap-4">
              {/* Floating Card 1: Full-Stack Focus */}
              <div
                data-about-float-card
                data-about-parallax="16"
                className="lg:absolute lg:-right-10 lg:top-8 lg:w-64 rounded-2xl glass-studio-light p-4 sm:p-5 text-[#091e0e] shadow-[0_24px_48px_-14px_rgba(4,16,6,0.48)]"
              >
                <p className="text-xs font-semibold tracking-tight text-[#143a1c]/75">
                  Core Interest
                </p>
                <p className="mt-1 font-display text-base sm:text-lg font-extrabold tracking-tight text-[#091e0e]">
                  Full-Stack Development
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-[#123318]">
                  Designing cohesive front-to-back software architecture and
                  interactive web systems.
                </p>
              </div>

              {/* Floating Card 2: AI & Automation */}
              <div
                data-about-float-card
                data-about-parallax="-18"
                className="lg:absolute lg:-left-8 lg:bottom-14 lg:w-64 rounded-2xl glass-studio-dark p-4 sm:p-5 text-[#f5fce0] shadow-[0_24px_50px_-14px_rgba(3,12,5,0.65)]"
              >
                <p className="text-xs font-semibold tracking-tight text-[#ccf252]">
                  Active Focus
                </p>
                <p className="mt-1 font-display text-base sm:text-lg font-extrabold tracking-tight text-[#f5fce0]">
                  AI &amp; Automation
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-[#f5fce0]/82">
                  Building AI-powered applications and practical automation for
                  real-world problems.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Education Card + Editorial Narrative */}
          <div
            data-about-edu-section
            className="lg:col-span-7 lg:pl-8 flex flex-col gap-10"
          >
            {/* 4. Education Information Block */}
            <div
              data-about-edu
              className="rounded-[2rem] border border-[#ccf252]/18 bg-[#122f17]/80 p-6 sm:p-9 shadow-[0_24px_56px_-18px_rgba(4,14,6,0.55)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ccf252]/14 pb-5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#ccf252] text-[#091e0e]">
                    <GraduationCap className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-[#ccf252]">
                      Education
                    </p>
                    <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#f5fce0]">
                      Academic Foundation
                    </h3>
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-semibold tabular-nums text-[#ccf252]/90">
                  Batch 2023–2027
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-medium text-[#f5fce0]/60">
                    Degree Program
                  </p>
                  <p className="mt-1.5 font-display text-lg sm:text-xl font-bold tracking-tight text-[#f5fce0]">
                    B.Tech Information Technology
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-[#f5fce0]/60">
                    Institution
                  </p>
                  <p className="mt-1.5 font-display text-lg sm:text-xl font-bold tracking-tight text-[#f5fce0]">
                    CHRIST University, Bengaluru
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-[#ccf252]/12 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm font-medium text-[#f5fce0]/80">
                <span>Full-Stack Development</span>
                <span aria-hidden="true" className="text-[#ccf252]">
                  ·
                </span>
                <span>AI-Powered Applications</span>
                <span aria-hidden="true" className="text-[#ccf252]">
                  ·
                </span>
                <span>Automation Systems</span>
                <span aria-hidden="true" className="text-[#ccf252]">
                  ·
                </span>
                <span>Creative Technology</span>
              </div>
            </div>

            {/* Editorial Context & Floating Third Info Strip */}
            <div
              data-about-edu
              className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start"
            >
              <div className="sm:col-span-7 space-y-4">
                <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#f5fce0] [text-wrap:balance]">
                  Bridging engineering rigor with creative experimentation.
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-[#f5fce0]/78">
                  Alongside my undergraduate studies in Information Technology
                  at CHRIST University, I spend my time learning how modern
                  full-stack architectures, AI-powered applications, and
                  interactive web technologies come together to solve practical
                  real-world problems.
                </p>
              </div>

              {/* Compact Third Floating Studio Card */}
              <div
                data-about-float-card
                className="sm:col-span-5 rounded-2xl border border-[#ccf252]/20 bg-[#18401e]/75 p-5 flex flex-col justify-between gap-3"
              >
                <p className="text-xs font-semibold text-[#ccf252]">
                  Location &amp; Study
                </p>
                <p className="font-display text-lg font-bold leading-snug text-[#f5fce0]">
                  Bengaluru, Karnataka
                </p>
                <p className="text-xs leading-relaxed text-[#f5fce0]/75">
                  B.Tech IT student exploring software engineering, applied AI,
                  and digital product craft.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Developer Philosophy Section */}
        <div
          data-about-philosophy-section
          className="mt-20 sm:mt-28 pt-14 sm:pt-20 border-t border-[#ccf252]/16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div data-about-philosophy className="lg:col-span-4 space-y-3">
              <p className="text-xs sm:text-sm font-semibold tracking-wide text-[#ccf252]">
                Developer Philosophy
              </p>
              <h3 className="font-display text-3xl sm:text-4xl font-extrabold leading-[1.02] tracking-tight text-[#f5fce0] [text-wrap:balance]">
                Practical craft over surface noise.
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-[#f5fce0]/75">
                Every interface or automated workflow should earn its place by
                solving a concrete problem cleanly and thoughtfully.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {PHILOSOPHY_PILLARS.map((pillar) => (
                <article
                  key={pillar.index}
                  data-about-philosophy
                  className="rounded-2xl border border-[#ccf252]/16 bg-[#102d15]/85 p-6 flex flex-col justify-between gap-4 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="space-y-2.5">
                    <span className="block font-display text-sm font-bold tabular-nums text-[#ccf252]">
                      {pillar.index}
                    </span>
                    <h4 className="font-display text-xl font-bold tracking-tight text-[#f5fce0]">
                      {pillar.title}
                    </h4>
                  </div>
                  <p className="text-sm leading-relaxed text-[#f5fce0]/78">
                    {pillar.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* 7. Visual Transition Leading into Selected Projects */}
        <div
          data-about-transition
          className="mt-20 sm:mt-28 rounded-[2rem] sm:rounded-[2.75rem] p-7 sm:p-11 lg:p-14 text-[#091e0e] shadow-[0_30px_70px_-18px_rgba(7,22,9,0.6)]"
          style={{
            background:
              'linear-gradient(135deg, #d2f65a 0%, #bce83b 48%, #98ca26 100%)',
          }}
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-xs sm:text-sm font-semibold tracking-wide text-[#133519]/80">
                02. Next Chapter · Continuing the Portfolio
              </p>
              <h3 className="mt-3 font-display text-[clamp(2.15rem,4.8vw,4.25rem)] font-extrabold leading-[0.94] tracking-[-0.035em] text-[#091e0e] [text-wrap:balance]">
                Selected Projects
              </h3>
              <p className="mt-4 max-w-xl text-sm sm:text-base font-medium leading-relaxed text-[#123318]">
                Up next: full-stack applications, AI-powered automation tools,
                and interactive creative technology builds designed to tackle
                real-world problems.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3.5 shrink-0">
              <button
                type="button"
                onClick={handleExploreProjects}
                className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-[#091e0e] px-6 py-3.5 text-xs sm:text-sm font-semibold text-[#f5fce0] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#153e1d] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#091e0e]"
              >
                <span>Preview Selected Projects</span>
                <ArrowUpRight className="h-4 w-4 text-[#ccf252] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                type="button"
                onClick={handleBackToTop}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#091e0e]/25 bg-[#f5fce0]/55 px-5 py-3.5 text-xs sm:text-sm font-semibold text-[#091e0e] transition-all duration-200 hover:bg-[#f5fce0]/85 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#091e0e]"
              >
                <ArrowUp className="h-4 w-4" />
                <span>Back to Stage</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
