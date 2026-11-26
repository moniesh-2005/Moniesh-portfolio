import { useEffect, useRef } from 'react';
import {
  Activity,
  ArrowUp,
  ArrowUpRight,
  Code2,
  Cpu,
  Users,
} from 'lucide-react';
import {
  ACHIEVEMENTS,
  AchievementMotif,
} from '@/src/data/achievements';
import { runAchievementsReveal } from '@/src/animations/gsapAchievementsReveal';

export interface AchievementsSectionProps {
  onExploreContact?: () => void;
  onBackToTop?: () => void;
}

function CardMotifGraphic({ motif }: { motif: AchievementMotif }) {
  if (motif === 'hackathon-grid') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 160 160"
        className="pointer-events-none absolute -right-4 -bottom-4 h-36 w-36 text-[#ccf252]/12 transition-all duration-500 group-hover:scale-105 group-hover:text-[#ccf252]/24"
      >
        <rect x="28" y="28" width="44" height="44" rx="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <rect x="72" y="72" width="56" height="56" rx="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="116" cy="44" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
      </svg>
    );
  }

  if (motif === 'ai-nodes') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 160 160"
        className="pointer-events-none absolute -right-3 -bottom-3 h-36 w-36 text-[#ccf252]/14 transition-all duration-500 group-hover:rotate-6 group-hover:text-[#ccf252]/26"
      >
        <circle cx="80" cy="80" r="48" fill="none" stroke="currentColor" strokeWidth="1.25" strokeDasharray="5 6" />
        <circle cx="80" cy="80" r="24" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="80" cy="32" r="4" fill="currentColor" />
        <circle cx="128" cy="80" r="4" fill="currentColor" />
      </svg>
    );
  }

  if (motif === 'event-arcs') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 160 160"
        className="pointer-events-none absolute -right-4 -bottom-4 h-36 w-36 text-[#ccf252]/12 transition-all duration-500 group-hover:-translate-y-1 group-hover:text-[#ccf252]/24"
      >
        <path
          d="M 28 132 A 96 96 0 0 1 132 28 M 56 132 A 68 68 0 0 1 132 56 M 86 132 A 40 40 0 0 1 132 86"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 160 160"
      className="pointer-events-none absolute -right-3 -bottom-4 h-36 w-36 text-[#ccf252]/14 transition-all duration-500 group-hover:translate-x-1 group-hover:text-[#ccf252]/26"
    >
      <path
        d="M 16 106 Q 48 64 80 96 T 144 74"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M 16 126 Q 48 84 80 116 T 144 94"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CardIcon({ motif }: { motif: AchievementMotif }) {
  if (motif === 'hackathon-grid') return <Code2 className="h-4 w-4" />;
  if (motif === 'ai-nodes') return <Cpu className="h-4 w-4" />;
  if (motif === 'event-arcs') return <Users className="h-4 w-4" />;
  return <Activity className="h-4 w-4" />;
}

/**
 * Achievements & Activities section (`05 — BEYOND THE CODE`).
 * Showcases participation across hackathons, student leadership, and sports & culture
 * in a clean 2x2 balanced dark-forest editorial grid.
 */
export function AchievementsSection({
  onExploreContact,
  onBackToTop,
}: AchievementsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = runAchievementsReveal({ root: sectionRef.current });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="activities"
      aria-labelledby="activities-heading"
      className="relative z-30 w-full overflow-hidden bg-[#091c0d] text-[#f5fce0]"
      style={{
        background:
          'radial-gradient(56% 42% at 86% 18%, rgba(188, 232, 59, 0.14) 0%, rgba(94, 130, 22, 0.06) 46%, transparent 78%), radial-gradient(48% 38% at 14% 78%, rgba(140, 185, 36, 0.11) 0%, transparent 72%), linear-gradient(180deg, #091c0d 0%, #0d2512 58%, #102b15 100%)',
      }}
    >
      {/* Subtle architectural curved transition edge from Tech Stack */}
      <div
        aria-hidden="true"
        className="h-10 sm:h-14 w-full bg-[#88b61e]"
        style={{
          clipPath: 'ellipse(68% 100% at 50% 0%)',
          opacity: 0.14,
        }}
      />

      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-10 pt-14 sm:pt-20 lg:pt-24 pb-20 sm:pb-28">
        {/* Section Heading */}
        <header
          data-ach-header
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end"
        >
          <div className="lg:col-span-7">
            <p
              data-ach-kicker
              className="mb-4 text-xs sm:text-sm font-semibold tracking-wide text-[#ccf252]"
            >
              05 — BEYOND THE CODE
            </p>

            <h2
              id="activities-heading"
              className="font-display text-[clamp(2.75rem,6.6vw,5.8rem)] font-extrabold leading-[0.9] tracking-[-0.04em] text-[#f5fce0] [text-wrap:balance]"
            >
              <span className="block overflow-hidden pb-1">
                <span data-ach-headline-line className="block">
                  MORE THAN
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span
                  data-ach-headline-line
                  className="block text-[#ccf252]"
                >
                  JUST CODE.
                </span>
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pb-2">
            <p
              data-ach-intro
              className="max-w-lg text-sm sm:text-base lg:text-lg font-medium leading-relaxed text-[#f5fce0]/82"
            >
              Building experiences beyond development through collaboration,
              creativity, competition and campus involvement.
            </p>
          </div>
        </header>

        {/* Balanced 2x2 Card Grid on Desktop, Single Column on Mobile */}
        <div className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-8 items-stretch">
          {ACHIEVEMENTS.map((item) => (
            <article
              key={item.id}
              data-ach-card
              style={{ backgroundImage: item.accentGradient }}
              className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border p-7 sm:p-9 shadow-[0_26px_64px_-20px_rgba(4,14,6,0.58)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[#ccf252]/48 ${item.surfaceClass}`}
            >
              {/* Subtle geometric corner motif */}
              <CardMotifGraphic motif={item.motif} />

              <div className="relative z-10">
                {/* Numbered Marker & Highlighted Category Label */}
                <div className="flex items-center justify-between gap-4 pb-5 border-b border-[#ccf252]/14">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#ccf252]/32 bg-[#14371b] font-display text-sm font-extrabold tabular-nums text-[#ccf252] transition-colors duration-300 group-hover:border-[#ccf252] group-hover:bg-[#ccf252] group-hover:text-[#091e0e]">
                      {item.number}
                    </span>
                    <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-[#ccf252]">
                      {item.category}
                    </span>
                  </div>

                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#ccf252]/20 bg-[#08170a]/70 text-[#ccf252] transition-transform duration-300 group-hover:scale-105 group-hover:border-[#ccf252]/45">
                    <CardIcon motif={item.motif} />
                  </span>
                </div>

                {/* Card Title & Readable Description */}
                <h3 className="mt-6 font-display text-2xl sm:text-[1.75rem] font-extrabold leading-[1.04] tracking-[-0.03em] text-[#f5fce0] [text-wrap:balance]">
                  {item.title}
                </h3>

                <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-[#f5fce0]/82">
                  {item.description}
                </p>
              </div>

              {/* Subtle Interactive Accent Footer */}
              <div className="relative z-10 mt-8 pt-4 border-t border-[#ccf252]/12 flex items-center justify-between gap-4">
                <span className="text-xs font-medium text-[#f5fce0]/60 tabular-nums">
                  Activity · {item.number}
                </span>
                <span className="h-0.5 w-12 rounded-full bg-[#ccf252]/35 transition-all duration-300 group-hover:w-20 group-hover:bg-[#ccf252]" />
              </div>
            </article>
          ))}
        </div>

        {/* Closing Contact Continuation Strip */}
        <div className="mt-16 sm:mt-24 pt-10 border-t border-[#ccf252]/16 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-wide text-[#ccf252]">
              06. Next Chapter · Connect
            </p>
            <p className="mt-1.5 font-display text-xl sm:text-2xl font-extrabold tracking-tight text-[#f5fce0]">
              Want to collaborate, build, or say hello?
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
              className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-[#ccf252] px-6 py-3.5 text-xs sm:text-sm font-semibold text-[#091e0e] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#daf872] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ccf252]"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="h-4 w-4 text-[#091e0e] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#ccf252]/25 bg-[#123117] px-5 py-3.5 text-xs sm:text-sm font-semibold text-[#f5fce0] transition-colors hover:border-[#ccf252]/60 hover:text-[#ccf252] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ccf252]"
            >
              <ArrowUp className="h-4 w-4" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
