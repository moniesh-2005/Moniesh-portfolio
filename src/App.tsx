import { useCallback, useEffect, useRef, useState } from 'react';
import { HeroSection } from '@/src/components/hero/HeroSection';
import { AboutSection } from '@/src/components/about/AboutSection';
import { ProjectSection } from '@/src/components/projects/ProjectSection';
import { ProjectDetailPage } from '@/src/components/projects/ProjectDetailPage';
import { ExperienceSection } from '@/src/components/experience/ExperienceSection';
import { TechStackSection } from '@/src/components/tech/TechStackSection';
import { AchievementsSection } from '@/src/components/achievements/AchievementsSection';
import { ContactSection } from '@/src/components/contact/ContactSection';
import { PROJECTS } from '@/src/data/projects';
import { NavSectionId } from '@/src/types/portfolio';

function readProjectSlugFromHash(): string | null {
  if (typeof window === 'undefined') return null;
  const match = window.location.hash.match(/^#\/projects\/([^/?#]+)/);
  if (!match) return null;
  const slug = decodeURIComponent(match[1]);
  return PROJECTS.some((p) => p.slug === slug) ? slug : null;
}

export default function App() {
  const [requestedSection, setRequestedSection] = useState<{
    id: NavSectionId;
    nonce: number;
  } | null>(null);
  const [activeProjectSlug, setActiveProjectSlug] = useState<string | null>(
    () => readProjectSlugFromHash(),
  );
  const savedScrollYRef = useRef<number | null>(null);

  useEffect(() => {
    const onHashChange = () => {
      setActiveProjectSlug(readProjectSlugFromHash());
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigateStageTo = (id: NavSectionId) => {
    setRequestedSection((prev) => ({ id, nonce: (prev?.nonce ?? 0) + 1 }));
  };

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openProject = useCallback((slug: string) => {
    if (savedScrollYRef.current === null) {
      savedScrollYRef.current = window.scrollY;
    }
    window.location.hash = `#/projects/${slug}`;
    setActiveProjectSlug(slug);
  }, []);

  const backToProjects = useCallback(() => {
    const restoreY = savedScrollYRef.current;
    savedScrollYRef.current = null;
    if (window.location.hash.startsWith('#/projects/')) {
      window.history.pushState(
        null,
        '',
        window.location.pathname + window.location.search,
      );
    }
    setActiveProjectSlug(null);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (typeof restoreY === 'number') {
          window.scrollTo({ top: restoreY, behavior: 'auto' });
        } else {
          document.getElementById('projects')?.scrollIntoView({ behavior: 'auto' });
        }
      });
    });
  }, []);

  const activeProject = activeProjectSlug
    ? PROJECTS.find((p) => p.slug === activeProjectSlug) ?? null
    : null;

  return (
    <>
      {activeProject && (
        <ProjectDetailPage
          project={activeProject}
          onSelectProject={openProject}
          onBackToProjects={backToProjects}
        />
      )}

      <div
        aria-hidden={Boolean(activeProject)}
        className={activeProject ? 'hidden' : 'relative w-full'}
      >
        <HeroSection requestedSection={requestedSection} />
        <AboutSection
          onExploreProjects={scrollToProjects}
          onBackToTop={() => navigateStageTo('home')}
        />
        <ProjectSection
          onSelectProject={openProject}
          onExploreContact={scrollToContact}
        />
        <ExperienceSection
          onExploreContact={scrollToContact}
          onBackToTop={() => navigateStageTo('home')}
        />
        <TechStackSection onExploreContact={scrollToContact} />
        <AchievementsSection
          onExploreContact={scrollToContact}
          onBackToTop={() => navigateStageTo('home')}
        />
        <ContactSection onBackToTop={() => navigateStageTo('home')} />
      </div>
    </>
  );
}
