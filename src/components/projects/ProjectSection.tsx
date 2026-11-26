import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '@/src/data/projects';
import { runProjectsReveal } from '@/src/animations/gsapProjectsReveal';
import { ProjectCard } from './ProjectCard';

export interface ProjectSectionProps {
  onSelectProject: (slug: string) => void;
  onExploreContact?: () => void;
}

/**
 * Selected Projects gallery section for the MONIESH® portfolio.
 * Displays all four projects in a balanced 2x2 desktop grid (1-column on mobile)
 * with identical dimensions, visual weight, and hover interactions.
 */
export function ProjectSection({
  onSelectProject,
  onExploreContact,
}: ProjectSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = runProjectsReveal({ root: sectionRef.current });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-labelledby="projects-heading"
      className="relative z-30 w-full overflow-hidden text-[#091e0e]"
      style={{
        background:
          'radial-gradient(62% 40% at 18% 12%, rgba(232, 255, 148, 0.55) 0%, transparent 70%), radial-gradient(50% 42% at 88% 72%, rgba(94, 130, 22, 0.25) 0%, transparent 72%), linear-gradient(180deg, #bce83b 0%, #a5d62b 46%, #88b61e 100%)',
      }}
    >
      <div className="border-t border-[#091e0e]/12">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-10 pt-20 sm:pt-28 lg:pt-32 pb-20 sm:pb-28">
          {/* Section Introduction */}
          <header
            data-projects-header
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end"
          >
            <div className="lg:col-span-8">
              <p
                data-projects-kicker
                className="mb-4 text-xs sm:text-sm font-semibold tracking-wide text-[#133519]/85"
              >
                02 — SELECTED WORK
              </p>

              <h2
                id="projects-heading"
                className="font-display text-[clamp(2.8rem,7vw,6.2rem)] font-extrabold leading-[0.9] tracking-[-0.04em] text-[#091e0e] [text-wrap:balance]"
              >
                <span className="block overflow-hidden pb-1">
                  <span data-projects-headline-line className="block">
                    THINGS
                  </span>
                </span>
                <span className="block overflow-hidden pb-1">
                  <span
                    data-projects-headline-line
                    className="block text-[#143d1d]"
                  >
                    I&apos;VE BUILT.
                  </span>
                </span>
              </h2>
            </div>

            <div className="lg:col-span-4 lg:pb-2">
              <p
                data-projects-intro
                className="max-w-md text-sm sm:text-base lg:text-lg font-medium leading-relaxed text-[#123318]"
              >
                A collection of experiments, engineering projects and ideas
                brought to life through code.
              </p>
            </div>
          </header>

          {/* Balanced 2x2 Project Grid on Desktop, Single Column on Mobile */}
          <div className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            {PROJECTS.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelectProject={onSelectProject}
              />
            ))}
          </div>

          {/* Bottom Editorial Chapter Transition Strip */}
          <div className="mt-16 sm:mt-24 pt-10 border-t border-[#091e0e]/16 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#133519]/75">
                03. Next Chapter · Continuing Forward
              </p>
              <p className="mt-1.5 font-display text-xl sm:text-2xl font-extrabold tracking-tight text-[#091e0e]">
                Interested in collaborating or discussing these builds?
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
              <span>Connect &amp; Contact</span>
              <ArrowUpRight className="h-4 w-4 text-[#ccf252] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
