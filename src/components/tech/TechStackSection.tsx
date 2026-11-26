import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { TECH_CATEGORIES } from '@/src/data/techStack';
import { runTechReveal } from '@/src/animations/gsapTechReveal';
import { TechIcon } from './TechIcon';

export interface TechStackSectionProps {
  onExploreContact?: () => void;
}

/**
 * Editorial Tech Stack showcase section for the MONIESH® portfolio.
 * Organizes the 5 verified technology groups in a responsive 12-column grid
 * with custom SVG iconography, subtle hover responses, and GSAP scroll reveals.
 */
export function TechStackSection({ onExploreContact }: TechStackSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredTech, setHoveredTech] = useState<{
    categoryId: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = runTechReveal({ root: sectionRef.current });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      aria-labelledby="tech-stack-heading"
      className="relative z-30 w-full overflow-hidden text-[#091e0e]"
      style={{
        background:
          'radial-gradient(60% 42% at 20% 10%, rgba(232, 255, 148, 0.56) 0%, transparent 70%), radial-gradient(50% 42% at 88% 76%, rgba(94, 130, 22, 0.24) 0%, transparent 72%), linear-gradient(180deg, #bce83b 0%, #a5d62b 48%, #88b61e 100%)',
      }}
    >
      <div className="border-t border-[#091e0e]/12">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-10 pt-20 sm:pt-28 lg:pt-32 pb-20 sm:pb-28">
          {/* Section Heading */}
          <header
            data-tech-header
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end"
          >
            <div className="lg:col-span-7">
              <p
                data-tech-kicker
                className="mb-4 text-xs sm:text-sm font-semibold tracking-wide text-[#133519]/85"
              >
                04 — TECH STACK
              </p>

              <h2
                id="tech-stack-heading"
                className="font-display text-[clamp(2.75rem,6.6vw,5.8rem)] font-extrabold leading-[0.9] tracking-[-0.04em] text-[#091e0e] [text-wrap:balance]"
              >
                <span className="block overflow-hidden pb-1">
                  <span data-tech-headline-line className="block">
                    TOOLS I
                  </span>
                </span>
                <span className="block overflow-hidden pb-1">
                  <span
                    data-tech-headline-line
                    className="block text-[#143d1d]"
                  >
                    BUILD WITH.
                  </span>
                </span>
              </h2>
            </div>

            <div className="lg:col-span-5 lg:pb-2">
              <p
                data-tech-intro
                className="max-w-lg text-sm sm:text-base lg:text-lg font-medium leading-relaxed text-[#123318]"
              >
                From writing code to building intelligent applications, these
                are the technologies I use to turn ideas into working solutions.
              </p>
            </div>
          </header>

          {/* Balanced 5-Category Editorial Grid */}
          <div className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {TECH_CATEGORIES.map((category) => {
              const activeInCategory =
                hoveredTech?.categoryId === category.id ? hoveredTech.name : null;

              return (
                <article
                  key={category.id}
                  data-tech-category
                  style={{ backgroundImage: category.accentGradient }}
                  className={`group relative flex flex-col justify-between rounded-[2rem] border p-6 sm:p-8 text-[#f5fce0] shadow-[0_26px_64px_-18px_rgba(6,20,8,0.45)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 ${category.surfaceBgClass} ${category.gridSpanClass}`}
                >
                  <div>
                    {/* Category Header */}
                    <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#ccf252]/16">
                      <div>
                        <span className="block font-display text-xs sm:text-sm font-extrabold tabular-nums tracking-wide text-[#ccf252]">
                          {category.number}
                        </span>
                        <h3 className="mt-1.5 font-display text-lg sm:text-xl font-extrabold leading-tight tracking-[-0.02em] text-[#f5fce0] [text-wrap:balance]">
                          {category.title}
                        </h3>
                      </div>

                      <span className="text-xs font-semibold tabular-nums text-[#ccf252]/75 shrink-0 pt-0.5">
                        {String(category.items.length).padStart(2, '0')} items
                      </span>
                    </div>

                    <p className="mt-3.5 min-h-[2.5rem] text-xs sm:text-sm leading-relaxed text-[#f5fce0]/75 transition-colors duration-200">
                      {activeInCategory ? (
                        <span className="font-semibold text-[#ccf252]">
                          Selected: {activeInCategory}
                        </span>
                      ) : (
                        category.subtitle
                      )}
                    </p>
                  </div>

                  {/* Interactive Technology Cards */}
                  <ul
                    aria-label={category.title}
                    className={`mt-6 ${category.itemsLayoutClass}`}
                  >
                    {category.items.map((tech) => (
                      <li key={tech.id} data-tech-chip>
                        <div
                          tabIndex={0}
                          onMouseEnter={() =>
                            setHoveredTech({
                              categoryId: category.id,
                              name: tech.name,
                            })
                          }
                          onMouseLeave={() => setHoveredTech(null)}
                          onFocus={() =>
                            setHoveredTech({
                              categoryId: category.id,
                              name: tech.name,
                            })
                          }
                          onBlur={() => setHoveredTech(null)}
                          className="group/tech flex items-center gap-3 rounded-xl border border-[#ccf252]/20 bg-[#08170a]/70 px-3.5 py-3 transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-[#ccf252]/70 hover:bg-[#174220] hover:shadow-[0_12px_26px_-10px_rgba(204,242,82,0.38)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ccf252]"
                        >
                          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#133519] text-[#ccf252] transition-transform duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/tech:scale-110 group-hover/tech:bg-[#ccf252] group-hover/tech:text-[#091e0e]">
                            <TechIcon id={tech.id} className="h-4 w-4" />
                          </span>

                          <span className="text-xs sm:text-sm font-semibold leading-snug tracking-tight text-[#f5fce0] transition-colors duration-200 group-hover/tech:text-[#ccf252]">
                            {tech.name}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          {/* Closing Continuation Strip */}
          <div className="mt-16 sm:mt-24 pt-10 border-t border-[#091e0e]/16 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#133519]/75">
                05. Next Chapter · Contact
              </p>
              <p className="mt-1.5 font-display text-xl sm:text-2xl font-extrabold tracking-tight text-[#091e0e]">
                Have an engineering idea or collaboration in mind?
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                if (onExploreContact) {
                  onExploreContact();
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-[#091e0e] px-6 py-3.5 text-xs sm:text-sm font-semibold text-[#f5fce0] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#153e1d] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#091e0e]"
            >
              <span>Start a Conversation</span>
              <ArrowUpRight className="h-4 w-4 text-[#ccf252] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
