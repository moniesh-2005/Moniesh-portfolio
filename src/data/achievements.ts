export type AchievementMotif =
  | 'hackathon-grid'
  | 'ai-nodes'
  | 'event-arcs'
  | 'motion-waves';

export interface AchievementEntry {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  motif: AchievementMotif;
  surfaceClass: string;
  accentGradient: string;
}

export const ACHIEVEMENTS: AchievementEntry[] = [
  {
    id: 'tech-x-hackathon',
    number: '01',
    title: 'TECH X HACKATHON',
    category: 'TECHNICAL PARTICIPATION',
    description:
      'Participated in Tech X, exploring ideas, collaborating with others and working on technology-driven problem solving.',
    motif: 'hackathon-grid',
    surfaceClass: 'bg-[#0d2512] border-[#ccf252]/20',
    accentGradient:
      'radial-gradient(75% 65% at 95% 8%, rgba(204, 242, 82, 0.14), transparent 68%)',
  },
  {
    id: 'razorpay-ai-buildathon',
    number: '02',
    title: 'RAZORPAY AI BUILDATHON',
    category: 'AI & INNOVATION',
    description:
      'Participated in the Razorpay AI Buildathon, working on an AI-powered settlement reconciliation solution.',
    motif: 'ai-nodes',
    surfaceClass: 'bg-[#123117] border-[#ccf252]/24',
    accentGradient:
      'radial-gradient(75% 65% at 92% 92%, rgba(188, 232, 59, 0.14), transparent 68%)',
  },
  {
    id: 'student-welfare-office',
    number: '03',
    title: 'STUDENT WELFARE OFFICE',
    category: 'EVENT COORDINATION',
    description:
      'Contributed as an event coordinator, supporting the planning and coordination of university activities.',
    motif: 'event-arcs',
    surfaceClass: 'bg-[#102c15] border-[#ccf252]/20',
    accentGradient:
      'radial-gradient(75% 65% at 8% 92%, rgba(140, 185, 36, 0.14), transparent 68%)',
  },
  {
    id: 'university-sports-culture',
    number: '04',
    title: 'UNIVERSITY SPORTS & CULTURE',
    category: 'EXTRACURRICULAR ACTIVITIES',
    description:
      'Actively involved in the university cricket team and dance team, balancing teamwork, creativity and extracurricular participation.',
    motif: 'motion-waves',
    surfaceClass: 'bg-[#0b200f] border-[#ccf252]/22',
    accentGradient:
      'radial-gradient(75% 65% at 10% 8%, rgba(204, 242, 82, 0.12), transparent 68%)',
  },
];
