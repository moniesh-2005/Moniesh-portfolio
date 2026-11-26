import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowLeft, ArrowRight, Layers } from 'lucide-react';
import { PROJECTS, ProjectItem } from '@/src/data/projects';
import { ProjectVisualMotif } from './ProjectVisualMotif';

export interface ProjectDetailPageProps {
  project: ProjectItem;
  onSelectProject: (slug: string) => void;
  onBackToProjects: () => void;
}

/**
 * Dedicated editorial project case study view for each portfolio project.
 * Features GSAP entrance transitions, architectural pipeline breakdown, and Next/Prev switching.
 */
export function ProjectDetailPage({
  project,
  onSelectProject,
  onBackToProjects,
}: ProjectDetailPageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [imageFailed, setImageFailed] = useState(false);

  const currentIdx = PROJECTS.findIndex((p) => p.slug === project.slug);
  const prevProject =
    PROJECTS[(currentIdx - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(currentIdx + 1) % PROJECTS.length];

  useEffect(() => {
    setImageFailed(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [project.slug]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBackToProjects();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onBackToProjects]);

  useEffect(() => {
    if (!rootRef.current) return;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;
      gsap.from('[data-detail-reveal]', {
        y: 26,
        opacity: 0,
        duration: 0.72,
        stagger: 0.08,
        ease: 'power3.out',
      });
    }, rootRef);

    return () => ctx.revert();
  }, [project.slug]);

  return (
    <div
      ref={rootRef}
      className="relative min-h-screen w-full bg-[#091c0d] text-[#f5fce0] selection:bg-[#ccf252] selection:text-[#091e0e]"
    >
      {/* Atmospheric top-right lime glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            'radial-gradient(55% 45% at 80% 10%, rgba(188, 232, 59, 0.14) 0%, rgba(94, 130, 22, 0.06) 45%, transparent 78%), radial-gradient(45% 40% at 15% 85%, rgba(140, 185, 36, 0.1) 0%, transparent 72%)',
        }}
      />

      {/* Sticky Editorial Return & Switcher Bar */}
      <header className="sticky top-0 z-30 border-b border-[#ccf252]/14 bg-[#091c0d]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10 py-4">
          <button
            type="button"
            onClick={onBackToProjects}
            className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-[#ccf252]/24 bg-[#112e16] px-4 py-2 text-xs sm:text-sm font-semibold text-[#f5fce0] transition-colors hover:border-[#ccf252] hover:text-[#ccf252] whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span>Back to Selected Projects</span>
          </button>

          <div className="hidden md:flex items-center gap-3 text-xs font-semibold tracking-wide text-[#ccf252]">
            <span>MONIESH®</span>
            <span aria-hidden="true" className="text-[#f5fce0]/35">
              /
            </span>
            <span className="tabular-nums text-[#f5fce0]/85">
              Case Study {project.number} of 0{PROJECTS.length}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onSelectProject(prevProject.slug)}
              aria-label={`Previous project: ${prevProject.title}`}
              className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#ccf252]/20 bg-[#102b15] text-[#f5fce0] transition-colors hover:bg-[#ccf252] hover:text-[#091e0e]"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onSelectProject(nextProject.slug)}
              aria-label={`Next project: ${nextProject.title}`}
              className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#ccf252]/20 bg-[#102b15] text-[#f5fce0] transition-colors hover:bg-[#ccf252] hover:text-[#091e0e]"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Case Study Content */}
      <main className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10 pt-12 sm:pt-16 pb-20 sm:pb-28">
        {/* Header Metadata & Oversized Title */}
        <div data-detail-reveal className="max-w-4xl">
          <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm font-semibold tracking-wide text-[#ccf252]">
            <span className="tabular-nums">{project.number}</span>
            <span aria-hidden="true">·</span>
            <span>{project.discipline}</span>
            <span aria-hidden="true">·</span>
            <span>Architecture &amp; Case Study</span>
          </p>

          <h1 className="mt-4 font-display text-[clamp(2.25rem,5.4vw,4.8rem)] font-extrabold leading-[0.94] tracking-[-0.035em] text-[#f5fce0] [text-wrap:balance]">
            {project.title}
          </h1>

          <p className="mt-6 max-w-2xl text-base sm:text-xl font-medium leading-relaxed text-[#f5fce0]/85">
            {project.description}
          </p>

          <ul
            aria-label="Technologies used"
            className="mt-6 flex flex-wrap items-center gap-2"
          >
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-[#ccf252]/32 bg-[#14391c] px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-[#e9fca3]"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        {/* Hero Visual Frame */}
        <div
          data-detail-reveal
          className="group relative mt-10 sm:mt-14 overflow-hidden rounded-[2rem] sm:rounded-[2.75rem] border border-[#ccf252]/22 bg-[#0b200e] shadow-[0_32px_80px_-20px_rgba(3,12,5,0.75)]"
        >
          <div className="relative aspect-[16/9] max-h-[540px] w-full overflow-hidden">
            {!imageFailed ? (
              <img
                src={project.image}
                alt={project.imageAlt}
                referrerPolicy="no-referrer"
                onError={() => setImageFailed(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#173d1e] to-[#0a1c0c] p-10 text-center">
                <span className="font-display text-5xl font-extrabold text-[#ccf252]">
                  {project.number}
                </span>
                <span className="mt-3 font-display text-xl font-bold text-[#f5fce0]">
                  {project.title}
                </span>
              </div>
            )}
            <ProjectVisualMotif motif={project.motif} />
          </div>
        </div>

        {/* Editorial Problem / Solution / Overview Split */}
        <div
          data-detail-reveal
          className="mt-14 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14"
        >
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs font-semibold tracking-wide text-[#ccf252]">
              Project Overview
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#f5fce0] [text-wrap:balance]">
              {project.caseStudy.overview}
            </h2>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-[#ccf252]/16 bg-[#0f2913]/85 p-6">
              <p className="text-xs font-semibold tracking-wide text-[#ccf252]">
                Problem Context
              </p>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#f5fce0]/82">
                {project.caseStudy.problemContext}
              </p>
            </div>

            <div className="rounded-2xl border border-[#ccf252]/16 bg-[#0f2913]/85 p-6">
              <p className="text-xs font-semibold tracking-wide text-[#ccf252]">
                Technical Approach
              </p>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#f5fce0]/82">
                {project.caseStudy.solutionApproach}
              </p>
            </div>
          </div>
        </div>

        {/* Architecture Breakdown */}
        <section
          data-detail-reveal
          aria-labelledby="architecture-heading"
          className="mt-16 sm:mt-24 pt-14 border-t border-[#ccf252]/16"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#ccf252]">
                System Design
              </p>
              <h2
                id="architecture-heading"
                className="mt-2 font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-[#f5fce0]"
              >
                Core Architecture &amp; Pipeline
              </h2>
            </div>
            <Layers className="h-6 w-6 text-[#ccf252]/75" />
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.caseStudy.architecture.map((stage) => (
              <article
                key={stage.index}
                className="rounded-2xl border border-[#ccf252]/18 bg-[#102d16]/85 p-6 flex flex-col justify-between gap-4"
              >
                <div>
                  <span className="font-display text-sm font-bold tabular-nums text-[#ccf252]">
                    {stage.index}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-[#f5fce0]">
                    {stage.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-[#f5fce0]/80">
                  {stage.summary}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-[#ccf252]/16 bg-[#0e2612] p-6 sm:p-8">
            <p className="text-xs font-semibold tracking-wide text-[#ccf252]">
              Engineering Priorities
            </p>
            <ul className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-medium text-[#f5fce0]/88">
              {project.caseStudy.engineeringFocus.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="font-display text-xs font-bold tabular-nums text-[#ccf252] mt-1">
                    0{idx + 1}
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Next Project Transition Card */}
        <section
          data-detail-reveal
          aria-label="Next Project"
          className="mt-16 sm:mt-24 rounded-[2rem] sm:rounded-[2.75rem] p-7 sm:p-11 text-[#091e0e] shadow-[0_30px_70px_-18px_rgba(4,16,6,0.65)]"
          style={{
            background:
              'linear-gradient(135deg, #d2f65a 0%, #bce83b 52%, #98ca26 100%)',
          }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xs sm:text-sm font-semibold tracking-wide text-[#133519]/80">
                Next Project · {nextProject.number}
              </p>
              <h2 className="mt-2 font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-[0.96] tracking-tight text-[#091e0e] [text-wrap:balance]">
                {nextProject.title}
              </h2>
              <p className="mt-3 max-w-xl text-sm sm:text-base font-medium text-[#123318]">
                {nextProject.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onSelectProject(nextProject.slug)}
                className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-[#091e0e] px-6 py-3.5 text-xs sm:text-sm font-semibold text-[#f5fce0] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#153e1d] whitespace-nowrap"
              >
                <span>Open Next Project</span>
                <ArrowRight className="h-4 w-4 text-[#ccf252] transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>

              <button
                type="button"
                onClick={onBackToProjects}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#091e0e]/25 bg-[#f5fce0]/60 px-5 py-3.5 text-xs sm:text-sm font-semibold text-[#091e0e] transition-colors hover:bg-[#f5fce0]/90 whitespace-nowrap"
              >
                <span>All Projects</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
