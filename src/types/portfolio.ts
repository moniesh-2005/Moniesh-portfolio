export type NavSectionId =
  | 'home'
  | 'projects'
  | 'about'
  | 'experience'
  | 'contact';

export interface NavItem {
  id: NavSectionId;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export interface SectionPreviewMeta {
  id: NavSectionId;
  title: string;
  subtitle: string;
  summary: string;
  highlights: string[];
  cameraOffset: [number, number, number];
}

export const SECTION_PREVIEWS: Record<NavSectionId, SectionPreviewMeta> = {
  home: {
    id: 'home',
    title: 'Creative Engineering & AI',
    subtitle: 'Hero Stage',
    summary:
      'Interactive 3D developer workspace blending full-stack architecture, applied AI systems, and tactile web graphics.',
    highlights: [
      'Full-Stack Systems',
      'Applied AI & Agents',
      'WebGL & Creative Tech',
    ],
    cameraOffset: [0, 0, 0],
  },
  projects: {
    id: 'projects',
    title: 'Selected Builds & Experiments',
    subtitle: 'Section Preview · Next Phase',
    summary:
      'Full case studies, interactive live sandboxes, and spatial web prototypes are queued for the upcoming Projects chapter.',
    highlights: [
      'AI Workflow Engines',
      'Real-Time 3D Interfaces',
      'Design Engineering Kits',
    ],
    cameraOffset: [-0.45, 0.25, -0.55],
  },
  about: {
    id: 'about',
    title: 'Beyond Syntax & Frameworks',
    subtitle: 'Section Preview · Next Phase',
    summary:
      'Bridging low-latency backend infrastructure with expressive motion and human-centered 3D interfaces.',
    highlights: [
      'TypeScript & Next.js',
      'Three.js & Shaders',
      'LLM Tooling & Retrieval',
    ],
    cameraOffset: [0.35, 0.15, -0.45],
  },
  experience: {
    id: 'experience',
    title: 'Engineering & Product Craft',
    subtitle: 'Section Preview · Next Phase',
    summary:
      'Shipping production web platforms, AI-native developer tools, and interactive agency experiences from prototype to scale.',
    highlights: [
      'System Architecture',
      'Interactive Motion',
      'Production AI Pipelines',
    ],
    cameraOffset: [-0.25, -0.2, -0.35],
  },
  contact: {
    id: 'contact',
    title: 'Start a Conversation',
    subtitle: 'Direct Inquiry',
    summary:
      'Available for experimental web builds, AI product engineering, and creative technology collaborations.',
    highlights: [
      'moniesh48@gmail.com',
      'Remote · Worldwide',
      'Open to Collaborations',
    ],
    cameraOffset: [0.25, 0.1, -0.6],
  },
};
