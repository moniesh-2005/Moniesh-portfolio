import settlementCopilotImg from '@/src/assets/images/project_settlement_copilot_1795599281068.jpg';
import faceRecognitionImg from '@/src/assets/images/project_face_recognition_1795599280823.jpg';
import resumeAnalyzerImg from '@/src/assets/images/project_resume_analyzer_1795599281735.jpg';
import productMdmImg from '@/src/assets/images/project_product_mdm_1795599281833.jpg';

export type ProjectVisualMotif =
  | 'reconciliation'
  | 'biometric'
  | 'nlp-layers'
  | 'taxonomy-grid';

export type ProjectCardTheme =
  | 'obsidian-lime'
  | 'deep-forest'
  | 'olive-slate'
  | 'lime-contrast';

export interface ProjectArchitectureStage {
  index: string;
  title: string;
  summary: string;
}

export interface ProjectItem {
  id: string;
  number: string;
  slug: string;
  title: string;
  discipline: string;
  technologies: string[];
  description: string;
  hoverInsight: string;
  image: string;
  imageAlt: string;
  motif: ProjectVisualMotif;
  theme: ProjectCardTheme;
  hasCaseStudy: boolean;
  caseStudy: {
    overview: string;
    problemContext: string;
    solutionApproach: string;
    architecture: ProjectArchitectureStage[];
    engineeringFocus: string[];
  };
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'ai-resume-screening',
    number: '01',
    slug: 'ai-based-resume-screening-system',
    title: 'AI-BASED RESUME SCREENING SYSTEM',
    discipline: 'Machine Learning · NLP',
    technologies: ['Python', 'NLP', 'Scikit-learn', 'Flask', 'MySQL'],
    description:
      'An AI-powered application for analysing resumes, extracting structured candidate signals, and evaluating candidate profiles.',
    hoverInsight:
      'Combines Python NLP preprocessing and Scikit-learn classification with a Flask backend and MySQL persistence.',
    image: resumeAnalyzerImg,
    imageAlt:
      'Layered translucent lime-tinted glass plates stacked asymmetrically with dark slate slabs symbolizing structured NLP resume screening',
    motif: 'nlp-layers',
    theme: 'deep-forest',
    hasCaseStudy: true,
    caseStudy: {
      overview:
        'AI-Based Resume Screening System processes candidate resumes using Python NLP pipelines and Scikit-learn scoring, served through Flask and stored in MySQL.',
      problemContext:
        'Resumes arrive in inconsistent formats and phrasing, making manual review slow and difficult to standardize across roles and technical requirements.',
      solutionApproach:
        'Extracts and cleans resume text with Python NLP utilities, computes similarity and classification features in Scikit-learn, and persists screening records via Flask and MySQL.',
      architecture: [
        {
          index: '01.',
          title: 'NLP Text Extraction',
          summary:
            'Cleans, tokenizes, and normalizes uploaded resume text in Python so varied document layouts map to structured candidate fields.',
        },
        {
          index: '02.',
          title: 'Scikit-learn Screening Model',
          summary:
            'Transforms extracted skills and profile text into feature vectors to rank and evaluate candidate alignment using Scikit-learn.',
        },
        {
          index: '03.',
          title: 'Flask API & MySQL Storage',
          summary:
            'Serves screening workflows through Flask endpoints backed by a structured MySQL schema for candidate profiles and evaluation records.',
        },
      ],
      engineeringFocus: [
        'Consistent NLP preprocessing across varied resume formats',
        'Scikit-learn feature extraction and profile evaluation pipeline',
        'Structured Flask and MySQL persistence for screening results',
      ],
    },
  },
  {
    id: 'face-recognition-attendance',
    number: '02',
    slug: 'face-recognition-attendance-system',
    title: 'FACE RECOGNITION ATTENDANCE SYSTEM',
    discipline: 'Computer Vision · Full-Stack',
    technologies: [
      'React (Vite)',
      'Flask',
      'MySQL',
      'JWT',
      'SQLAlchemy',
      'OpenCV',
      'face_recognition',
    ],
    description:
      'A full-stack face recognition application built for automated identity verification and structured attendance management.',
    hoverInsight:
      'Pairs OpenCV and face_recognition processing in Flask with JWT-authenticated APIs, SQLAlchemy/MySQL models, and a React (Vite) frontend.',
    image: faceRecognitionImg,
    imageAlt:
      'Sculptural concentric olive-green glass rings framing an obsidian geometric bust with lime-green calibration grid lines',
    motif: 'biometric',
    theme: 'deep-forest',
    hasCaseStudy: true,
    caseStudy: {
      overview:
        'A full-stack vision and attendance platform uniting a React (Vite) frontend with a JWT-secured Flask API, SQLAlchemy ORM over MySQL, OpenCV, and face_recognition.',
      problemContext:
        'Manual attendance tracking creates administrative friction and lacks reliable automated verification connected directly to user records.',
      solutionApproach:
        'Uses OpenCV for frame handling and face_recognition for facial encoding comparisons inside Flask, exposing JWT-protected endpoints backed by SQLAlchemy and MySQL to a React (Vite) client.',
      architecture: [
        {
          index: '01.',
          title: 'Vision Processing Layer',
          summary:
            'Captures and preprocesses frames with OpenCV, then matches facial encodings against enrolled profiles via face_recognition.',
        },
        {
          index: '02.',
          title: 'Flask, JWT & SQLAlchemy API',
          summary:
            'Secures attendance endpoints with JWT authentication and manages users, embeddings metadata, and attendance logs in MySQL through SQLAlchemy.',
        },
        {
          index: '03.',
          title: 'React (Vite) Interface',
          summary:
            'Provides a responsive client application in React (Vite) for enrollment, live check-in workflows, and attendance history review.',
        },
      ],
      engineeringFocus: [
        'Seamless bridge between OpenCV/face_recognition and REST endpoints',
        'Role-aware access protection using JWT tokens in Flask',
        'Clean relational modeling across SQLAlchemy and MySQL',
      ],
    },
  },
  {
    id: 'product-mdm',
    number: '03',
    slug: 'product-master-data-management-system',
    title: 'PRODUCT MASTER DATA MANAGEMENT SYSTEM',
    discipline: 'Enterprise Data · Governance',
    technologies: ['Stibo STEP', 'JavaScript'],
    description:
      'An enterprise-oriented product master data management system built around structured hierarchies and automated business rules.',
    hoverInsight:
      'Models product taxonomies, attribute inheritance, and validation logic in Stibo STEP using JavaScript business rules.',
    image: productMdmImg,
    imageAlt:
      'Isometric grid of dark forest-green ceramic blocks and brushed lime-green metallic data nodes representing product master data governance',
    motif: 'taxonomy-grid',
    theme: 'deep-forest',
    hasCaseStudy: true,
    caseStudy: {
      overview:
        'An enterprise-oriented Product Master Data Management System built on Stibo STEP with custom JavaScript business rules for catalog consistency and governance.',
      problemContext:
        'Enterprise product catalogs require centralized taxonomy structure, shared attribute rules, and strict validation across product lines to keep master records dependable.',
      solutionApproach:
        'Configures Stibo STEP classification hierarchies and data models paired with JavaScript business conditions and actions for automated validation and enrichment.',
      architecture: [
        {
          index: '01.',
          title: 'Product Taxonomy & Hierarchy',
          summary:
            'Structures product entities, classifications, and inherited attributes cleanly inside Stibo STEP.',
        },
        {
          index: '02.',
          title: 'JavaScript Business Rules',
          summary:
            'Executes custom JavaScript rules within STEP to automate attribute derivation, completeness checks, and validation policies.',
        },
        {
          index: '03.',
          title: 'Governance Workflow',
          summary:
            'Supports consistent product stewardship from record creation through validation and publication readiness.',
        },
      ],
      engineeringFocus: [
        'Clean enterprise data modeling and inheritance in Stibo STEP',
        'Reliable JavaScript validation and data enrichment rules',
        'Consistent taxonomy integrity across product entities',
      ],
    },
  },
  {
    id: 'settlement-copilot',
    number: '04',
    slug: 'settlement-reconciliation-copilot',
    title: 'SETTLEMENT RECONCILIATION COPILOT',
    discipline: 'Fintech Systems · Applied AI',
    technologies: ['Python', 'Gemini API'],
    description:
      'An AI-assisted fintech reconciliation application that compares merchant orders with settlement reports using deterministic matching and AI-generated explanations.',
    hoverInsight:
      'Pairs deterministic Python matching rules with natural-language discrepancy explanations powered by the Gemini API.',
    image: settlementCopilotImg,
    imageAlt:
      'Abstract interlocking matte black and brushed lime-green precision plates representing deterministic settlement reconciliation',
    motif: 'reconciliation',
    theme: 'deep-forest',
    hasCaseStudy: true,
    caseStudy: {
      overview:
        'Settlement Reconciliation Copilot brings deterministic verification and AI-assisted reasoning together to reconcile merchant order records against payment settlement reports.',
      problemContext:
        'Comparing merchant order logs with downstream settlement reports surfaces subtle mismatches across transaction references, timing differences, or fee deductions.',
      solutionApproach:
        'Separates financial verification into a deterministic Python matching engine first, then passes structured mismatch context to the Gemini API to generate clear human-readable explanations.',
      architecture: [
        {
          index: '01.',
          title: 'Ingestion & Normalization',
          summary:
            'Parses merchant order records and settlement report exports into normalized Python structures with consistent references and amounts.',
        },
        {
          index: '02.',
          title: 'Deterministic Matching Engine',
          summary:
            'Runs rule-based Python comparison logic across order IDs, settlement references, and amounts to isolate exact matches from variances.',
        },
        {
          index: '03.',
          title: 'Gemini API Explanation Layer',
          summary:
            'Generates clear, readable discrepancy explanations from deterministic mismatch context so reviewers understand why records diverge.',
        },
      ],
      engineeringFocus: [
        'Deterministic matching kept strictly isolated from generative inference',
        'Structured variance context passed cleanly to the Gemini API',
        'Auditable natural-language explanations for reconciliation review',
      ],
    },
  },
];
