import { useEffect, useRef } from 'react';
import { ArrowUp, ArrowUpRight, Briefcase, Calendar } from 'lucide-react';
import { EXPERIENCES } from '@/src/data/experience';
import { runExperienceReveal } from '@/src/animations/gsapExperienceReveal';

export interface ExperienceSectionProps {
  onExploreContact?: () => void;
  onBackToTop?: () => void;
}

/**
 * Experience & Internships timeline section for the MONIESH® portfolio.
 * Continues the lime-green and deep forest-green editorial design system
 * with GSAP scroll-triggered timeline drawing and concise verified entries.
 */
export function ExperienceSection({
  onExploreContact,
  onBackToTop,
}: ExperienceSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = runExperienceReveal({ root: sectionRef.current });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-labelledby="experience-heading"
      className="relative z-30 w-full overflow-hidden bg-[#091c0d] text-[#f5fce0]"
      style={{
        background:
          'radial-gradient(58% 42% at 84% 18%, rgba(188, 232, 59, 0.14) 0%, rgba(94, 130, 22, 0.06) 46%, transparent 78%), radial-gradient(48% 38% at 12% 76%, rgba(140, 185, 36, 0.11) 0%, transparent 72%), linear-gradient(180deg, #091c0d 0%, #0d2512 58%, #112e16 100%)',
      }}
    >
      {/* Clean curved transition edge from the lime-green Selected Projects canvas */}
      <div
        aria-hidden="true"
        className="h-10 sm:h-14 w-full bg-[#88b61e]"
        style={{
          clipPath: 'ellipse(68% 100% at 50% 0%)',
          opacity: 0.14,
        }}
      />

      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-10 pt-14 sm:pt-20 lg:pt-24 pb-20 sm:pb-28">
        {/* Section Introduction */}
        <header
          data-exp-header
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end"
        >
          <div className="lg:col-span-7">
            <p
              data-exp-kicker
              className="mb-4 text-xs sm:text-sm font-semibold tracking-wide text-[#ccf252]"
            >
              03 — EXPERIENCE
            </p>

            <h2
              id="experience-heading"
              className="font-display text-[clamp(2.8rem,6.8vw,5.9rem)] font-extrabold leading-[0.9] tracking-[-0.04em] text-[#f5fce0] [text-wrap:balance]"
            >
              <span className="block overflow-hidden pb-1">
                <span data-exp-headline-line className="block">
                  WHERE
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span
                  data-exp-headline-line
                  className="block text-[#ccf252]"
                >
                  I&apos;VE GROWN.
                </span>
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pb-2">
            <p
              data-exp-intro
              className="max-w-lg text-sm sm:text-base lg:text-lg font-medium leading-relaxed text-[#f5fce0]/82"
            >
              Learning by building, exploring technologies, and working on
              practical software development and data management challenges.
            </p>
          </div>
        </header>

        {/* Vertical Timeline + Experience Cards */}
        <div data-exp-timeline className="relative mt-14 sm:mt-20">
          {/* Vertical timeline spine connecting numbered markers */}
          <div
            data-exp-spine
            aria-hidden="true"
            className="pointer-events-none absolute left-5 sm:left-7 top-6 bottom-8 w-px bg-gradient-to-b from-[#ccf252]/70 via-[#ccf252]/30 to-transparent"
          />

          <div className="flex flex-col gap-8 sm:gap-10">
            {EXPERIENCES.map((entry) => (
              <div
                key={entry.id}
                className="group relative flex items-start gap-5 sm:gap-8 lg:gap-10"
              >
                {/* Numbered Timeline Marker + Horizontal Connector */}
                <div className="relative z-10 flex items-center pt-6 sm:pt-8 shrink-0">
                  <div
                    data-exp-marker
                    className="flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border border-[#ccf252]/35 bg-[#102c15] font-display text-sm sm:text-base font-extrabold tabular-nums text-[#ccf252] shadow-[0_12px_28px_-10px_rgba(4,16,6,0.7)] transition-all duration-300 group-hover:scale-105 group-hover:border-[#ccf252] group-hover:bg-[#ccf252] group-hover:text-[#091e0e]"
                  >
                    {entry.number}
                  </div>
                  <span
                    aria-hidden="true"
                    className="hidden lg:block h-px w-8 bg-[#ccf252]/25 transition-all duration-300 group-hover:w-10 group-hover:bg-[#ccf252]/75"
                  />
                </div>

                {/* Experience Card */}
                <article
                  data-exp-card
                  className="flex-1 rounded-[2rem] border border-[#ccf252]/20 bg-[#0e2713]/92 p-6 sm:p-8 lg:p-10 shadow-[0_26px_64px_-20px_rgba(4,14,6,0.62)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:border-[#ccf252]/42 group-hover:bg-[#133219]"
                >
                  {/* Top Row: Company + Role + Duration */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-5 border-b border-[#ccf252]/14">
                    <div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide text-[#ccf252]">
                        <Briefcase className="h-3.5 w-3.5 shrink-0" />
                        <span>{entry.role}</span>
                      </div>

                      <h3 className="mt-2 font-display text-2xl sm:text-3xl lg:text-[2.15rem] font-extrabold leading-[1.04] tracking-[-0.03em] text-[#f5fce0]">
                        {entry.company}
                      </h3>
                    </div>

                    <div className="inline-flex items-center gap-2 self-start text-xs sm:text-sm font-semibold tabular-nums text-[#e6fa9b] whitespace-nowrap shrink-0 md:pt-1">
                      <Calendar className="h-3.5 w-3.5 text-[#ccf252]" />
                      <span>{entry.duration}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-5 max-w-3xl text-sm sm:text-base lg:text-[1.05rem] leading-relaxed text-[#f5fce0]/84">
                    {entry.description}
                  </p>

                  {/* Technology Chips (only when technologies exist) or Focus Label */}
                  {(entry.technologies && entry.technologies.length > 0) ||
                  entry.focusNote ? (
                    <div className="mt-6 pt-5 border-t border-[#ccf252]/12 flex flex-wrap items-center justify-between gap-4">
                      {entry.technologies && entry.technologies.length > 0 ? (
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="mr-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#ccf252]/75">
                            Technologies
                          </span>
                          <ul
                            aria-label={`${entry.company} technologies`}
                            className="flex flex-wrap items-center gap-2"
                          >
                            {entry.technologies.map((tech, idx) => (
                              <li
                                key={tech}
                                style={{ transitionDelay: `${idx * 40}ms` }}
                                className="rounded-full border border-[#ccf252]/32 bg-[#14391c] px-3.5 py-1 text-xs font-semibold tracking-tight text-[#e9fca3] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[#ccf252]/55"
                              >
                                {tech}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <p className="text-xs sm:text-sm font-medium text-[#ccf252]/82">
                          {entry.focusNote}
                        </p>
                      )}

                      <span className="text-xs font-semibold tabular-nums text-[#f5fce0]/50">
                        Internship · {entry.number}
                      </span>
                    </div>
                  ) : null}
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Seamless Transition Band Leading Toward Contact */}
        <div
          data-exp-transition
          className="mt-16 sm:mt-24 rounded-[2rem] sm:rounded-[2.5rem] p-7 sm:p-10 lg:p-12 text-[#091e0e] shadow-[0_28px_66px_-18px_rgba(4,14,6,0.6)]"
          style={{
            background:
              'linear-gradient(135deg, #d2f65a 0%, #bce83b 52%, #98ca26 100%)',
          }}
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs sm:text-sm font-semibold tracking-wide text-[#133519]/80">
                04. Next Chapter · Open to Opportunities
              </p>
              <h3 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold leading-[0.98] tracking-[-0.03em] text-[#091e0e] [text-wrap:balance]">
                Let&apos;s build something meaningful together.
              </h3>
              <p className="mt-3 max-w-xl text-sm sm:text-base font-medium leading-relaxed text-[#123318]">
                Always excited to discuss full-stack engineering, AI-powered
                applications, and internship or collaborative project ideas.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  if (onExploreContact) {
                    onExploreContact();
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-[#091e0e] px-6 py-3.5 text-xs sm:text-sm font-semibold text-[#f5fce0] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#153e1d] whitespace-nowrap"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="h-4 w-4 text-[#ccf252] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                type="button"
                onClick={() => {
                  if (onBackToTop) {
                    onBackToTop();
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#091e0e]/25 bg-[#f5fce0]/60 px-5 py-3.5 text-xs sm:text-sm font-semibold text-[#091e0e] transition-colors hover:bg-[#f5fce0]/90 whitespace-nowrap"
              >
                <ArrowUp className="h-4 w-4" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
