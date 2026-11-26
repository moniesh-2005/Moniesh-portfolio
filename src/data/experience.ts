export interface ExperienceEntry {
  id: string;
  number: string;
  company: string;
  role: string;
  duration: string;
  description: string;
  technologies?: string[];
  focusNote?: string;
}

export const EXPERIENCES: ExperienceEntry[] = [
  {
    id: 'isnia-technologies',
    number: '01',
    company: 'ISNIA Technologies',
    role: 'Master Data Management Intern',
    duration: 'May 2026 – June 2026',
    technologies: ['Stibo STEP', 'JavaScript'],
    description:
      'Worked with enterprise product master data management concepts using Stibo STEP. Explored product data structures, classifications, attributes, hierarchies, data validation, migration and approval workflows.',
  },
  {
    id: 'apex-planet-software',
    number: '02',
    company: 'Apex Planet Software Pvt. Ltd.',
    role: 'Web Development Intern',
    duration: 'April 2025 – May 2025',
    description:
      'Completed a web development internship focused on learning and understanding web development fundamentals and practical development workflows.',
    focusNote: 'Web Development Fundamentals · Practical Workflows',
  },
];
