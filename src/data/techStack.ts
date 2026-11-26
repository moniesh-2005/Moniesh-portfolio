export type TechIconId =
  | 'python'
  | 'java'
  | 'javascript'
  | 'typescript'
  | 'sql'
  | 'html-css'
  | 'react'
  | 'angular'
  | 'flask'
  | 'bootstrap'
  | 'mysql'
  | 'sqlite'
  | 'pandas'
  | 'numpy'
  | 'nlp'
  | 'scikit-learn'
  | 'opencv'
  | 'face-recognition'
  | 'rag'
  | 'git'
  | 'stibo-step'
  | 'aws'
  | 'ui-ux';

export interface TechItem {
  id: TechIconId;
  name: string;
}

export interface TechCategory {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  gridSpanClass: string;
  surfaceBgClass: string;
  accentGradient: string;
  itemsLayoutClass: string;
  items: TechItem[];
}

export const TECH_CATEGORIES: TechCategory[] = [
  {
    id: 'programming-languages',
    number: '01',
    title: 'PROGRAMMING LANGUAGES',
    subtitle: 'Core languages used across scripts, services, queries, and interfaces.',
    gridSpanClass: 'md:col-span-1 lg:col-span-7',
    surfaceBgClass: 'bg-[#0a1d0d] border-[#ccf252]/24',
    accentGradient:
      'radial-gradient(80% 70% at 95% 5%, rgba(204, 242, 82, 0.13), transparent 65%)',
    itemsLayoutClass: 'grid grid-cols-2 sm:grid-cols-3 gap-3',
    items: [
      { id: 'python', name: 'Python' },
      { id: 'java', name: 'Java' },
      { id: 'javascript', name: 'JavaScript' },
      { id: 'typescript', name: 'TypeScript' },
      { id: 'sql', name: 'SQL' },
      { id: 'html-css', name: 'HTML & CSS' },
    ],
  },
  {
    id: 'frameworks-development',
    number: '02',
    title: 'FRAMEWORKS & DEVELOPMENT',
    subtitle: 'Application frameworks and UI foundations for web builds.',
    gridSpanClass: 'md:col-span-1 lg:col-span-5',
    surfaceBgClass: 'bg-[#102c15] border-[#ccf252]/22',
    accentGradient:
      'radial-gradient(75% 75% at 10% 95%, rgba(188, 232, 59, 0.13), transparent 65%)',
    itemsLayoutClass: 'grid grid-cols-2 gap-3',
    items: [
      { id: 'react', name: 'React' },
      { id: 'angular', name: 'Angular' },
      { id: 'flask', name: 'Flask' },
      { id: 'bootstrap', name: 'Bootstrap' },
    ],
  },
  {
    id: 'databases-data',
    number: '03',
    title: 'DATABASES & DATA',
    subtitle: 'Relational storage and Python libraries for structured data handling.',
    gridSpanClass: 'md:col-span-1 lg:col-span-4',
    surfaceBgClass: 'bg-[#0d2612] border-[#ccf252]/20',
    accentGradient:
      'radial-gradient(80% 65% at 85% 90%, rgba(140, 185, 36, 0.15), transparent 70%)',
    itemsLayoutClass: 'grid grid-cols-2 gap-3',
    items: [
      { id: 'mysql', name: 'MySQL' },
      { id: 'sqlite', name: 'SQLite' },
      { id: 'pandas', name: 'Pandas' },
      { id: 'numpy', name: 'NumPy' },
    ],
  },
  {
    id: 'ai-ml-cv',
    number: '04',
    title: 'AI, MACHINE LEARNING & COMPUTER VISION',
    subtitle: 'Applied machine learning, language processing, retrieval, and vision.',
    gridSpanClass: 'md:col-span-1 lg:col-span-4',
    surfaceBgClass: 'bg-[#133518] border-[#ccf252]/28',
    accentGradient:
      'radial-gradient(85% 70% at 50% 0%, rgba(204, 242, 82, 0.16), transparent 68%)',
    itemsLayoutClass: 'grid grid-cols-1 sm:grid-cols-2 gap-3',
    items: [
      { id: 'nlp', name: 'NLP' },
      { id: 'scikit-learn', name: 'Scikit-learn' },
      { id: 'opencv', name: 'OpenCV' },
      { id: 'face-recognition', name: 'face_recognition' },
      { id: 'rag', name: 'RAG Fundamentals' },
    ],
  },
  {
    id: 'tools-platforms',
    number: '05',
    title: 'TOOLS & PLATFORMS',
    subtitle: 'Version control, enterprise MDM, cloud basics, and interface design.',
    gridSpanClass: 'md:col-span-2 lg:col-span-4',
    surfaceBgClass: 'bg-[#153415] border-[#ccf252]/22',
    accentGradient:
      'radial-gradient(80% 70% at 15% 10%, rgba(204, 242, 82, 0.13), transparent 68%)',
    itemsLayoutClass: 'grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3',
    items: [
      { id: 'git', name: 'Git' },
      { id: 'stibo-step', name: 'Stibo STEP' },
      { id: 'aws', name: 'AWS Fundamentals' },
      { id: 'ui-ux', name: 'UI/UX Fundamentals' },
    ],
  },
];
