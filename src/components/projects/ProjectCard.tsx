import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ProjectItem } from '@/src/data/projects';
import { ProjectVisualMotif } from './ProjectVisualMotif';

export interface ProjectCardProps {
  project: ProjectItem;
  onSelectProject: (slug: string) => void;
}

/**
 * Uniform studio project card giving every project equal visual weight, dimensions,
 * typography, image aspect ratio, prominent pill-shaped technology stack chips,
 * hover zoom, and View Project interaction.
 */
export function ProjectCard({ project, onSelectProject }: ProjectCardProps) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article
      data-project-card="true"
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-[#ccf252]/20 bg-[#0c2110] text-[#f5fce0] shadow-[0_28px_68px_-18px_rgba(6,20,8,0.48)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:scale-[1.01]"
    >
      {/* Consistent 16:10 Visual Project Preview */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#08170a]">
        <div
          data-project-image-reveal
          className="h-full w-full overflow-hidden"
        >
          {!imageFailed ? (
            <img
              src={project.image}
              alt={project.imageAlt}
              referrerPolicy="no-referrer"
              onError={() => setImageFailed(true)}
              className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#163a1c] via-[#0c220f] to-[#081509] p-8 text-center">
              <span className="font-display text-4xl font-extrabold text-[#ccf252]">
                {project.number}
              </span>
              <span className="mt-2 font-display text-lg font-bold text-[#f5fce0]">
                {project.title}
              </span>
            </div>
          )}
        </div>

        {/* Subtle gradient framing */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0c2110]/70 via-transparent to-[#091c0c]/20 transition-opacity duration-500 group-hover:opacity-80"
        />

        {/* Subtle geometric visual overlay */}
        <ProjectVisualMotif motif={project.motif} />

        {/* Top project number & discipline */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-5 sm:p-6">
          <span className="font-display text-lg sm:text-xl font-extrabold tabular-nums tracking-tight text-[#ccf252]">
            {project.number}
          </span>
          <span className="text-xs font-semibold tracking-wide text-[#f5fce0]/85">
            {project.discipline}
          </span>
        </div>
      </div>

      {/* Consistent Card Body & Footer */}
      <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
        <div>
          <p className="text-xs font-semibold tracking-wide text-[#ccf252]/85">
            {project.number} · {project.discipline}
          </p>

          <h3 className="mt-2.5 font-display text-xl sm:text-2xl font-extrabold leading-[1.04] tracking-[-0.03em] text-[#f5fce0] [text-wrap:balance]">
            {project.title}
          </h3>

          <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-[#f5fce0]/82">
            {project.description}
          </p>
        </div>

        {/* Complete Technology Stack + Action Footer kept evenly anchored at bottom */}
        <div className="mt-6 pt-5 border-t border-[#ccf252]/16 flex flex-col gap-5">
          <div className="space-y-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#ccf252]/80">
              Tech Stack
            </p>
            <ul
              aria-label={`${project.title} complete technology stack`}
              className="flex flex-wrap items-center gap-2 max-w-full"
            >
              {project.technologies.map((tech, idx) => (
                <li
                  key={tech}
                  style={{ transitionDelay: `${idx * 35}ms` }}
                  className="inline-flex items-center rounded-full border border-[#ccf252]/32 bg-[#14391c] px-3 py-1 text-xs font-semibold tracking-tight text-[#e9fca3] shadow-[inset_0_1px_0_rgba(245,252,224,0.08)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:border-[#ccf252]/55 group-hover:bg-[#194622]"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between gap-4 pt-1">
            <a
              href={`#/projects/${project.slug}`}
              onClick={(e) => {
                e.preventDefault();
                onSelectProject(project.slug);
              }}
              className="group/btn inline-flex items-center gap-2 rounded-full bg-[#ccf252] px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#091e0e] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#daf872] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ccf252]"
            >
              <span>View Project</span>
              <ArrowUpRight className="h-4 w-4 text-[#091e0e] transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>

            <span className="text-xs font-medium text-[#f5fce0]/55 tabular-nums">
              Case Study · {project.number}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
