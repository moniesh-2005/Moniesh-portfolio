import { ProjectVisualMotif as MotifType } from '@/src/data/projects';

interface ProjectVisualMotifProps {
  motif: MotifType;
}

/**
 * Subtle animated geometric motif overlays paired with each project's
 * sculptural artwork — reinforces visual identity without fabricating app UI.
 */
export function ProjectVisualMotif({ motif }: ProjectVisualMotifProps) {
  if (motif === 'reconciliation') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 400 220"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-35 transition-opacity duration-500 group-hover:opacity-75"
      >
        {/* Precision ledger alignment crosshairs */}
        <line
          x1="28"
          y1="36"
          x2="132"
          y2="36"
          stroke="#ccf252"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="transition-transform duration-700 ease-out group-hover:translate-x-2"
        />
        <line
          x1="268"
          y1="184"
          x2="372"
          y2="184"
          stroke="#ccf252"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="transition-transform duration-700 ease-out group-hover:-translate-x-2"
        />
        <rect
          x="28"
          y="168"
          width="14"
          height="14"
          rx="2"
          fill="none"
          stroke="#ccf252"
          strokeOpacity="0.65"
          strokeWidth="1"
        />
        <rect
          x="358"
          y="28"
          width="14"
          height="14"
          rx="2"
          fill="none"
          stroke="#ccf252"
          strokeOpacity="0.65"
          strokeWidth="1"
        />
      </svg>
    );
  }

  if (motif === 'biometric') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 320 240"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-30 transition-opacity duration-500 group-hover:opacity-70"
      >
        {/* Minimal calibration reticle brackets */}
        <path
          d="M 32 54 L 32 32 L 54 32 M 266 32 L 288 32 L 288 54 M 32 186 L 32 208 L 54 208 M 266 208 L 288 208 L 288 186"
          fill="none"
          stroke="#ccf252"
          strokeWidth="1.25"
        />
        <circle
          cx="160"
          cy="120"
          r="56"
          fill="none"
          stroke="#ccf252"
          strokeOpacity="0.45"
          strokeWidth="1"
          strokeDasharray="6 8"
          className="origin-center transition-transform duration-1000 ease-out group-hover:rotate-45 group-hover:scale-105"
        />
      </svg>
    );
  }

  if (motif === 'nlp-layers') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 320 240"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-30 transition-opacity duration-500 group-hover:opacity-70"
      >
        {/* Abstract semantic parsing stratum lines */}
        <g className="transition-transform duration-700 ease-out group-hover:translate-y-[-4px]">
          <line x1="28" y1="36" x2="96" y2="36" stroke="#ccf252" strokeWidth="1.5" />
          <line x1="28" y1="46" x2="72" y2="46" stroke="#f5fce0" strokeOpacity="0.55" strokeWidth="1" />
          <line x1="28" y1="56" x2="112" y2="56" stroke="#ccf252" strokeOpacity="0.45" strokeWidth="1" />
        </g>
        <g className="transition-transform duration-700 ease-out group-hover:translate-y-[4px]">
          <line x1="210" y1="194" x2="292" y2="194" stroke="#ccf252" strokeWidth="1.5" />
          <line x1="234" y1="204" x2="292" y2="204" stroke="#f5fce0" strokeOpacity="0.55" strokeWidth="1" />
        </g>
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 220"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-35 transition-opacity duration-500 group-hover:opacity-75"
    >
      {/* Isometric hierarchy connector nodes */}
      <g stroke="#ccf252" strokeWidth="1" fill="none">
        <line x1="36" y1="40" x2="86" y2="40" strokeOpacity="0.55" />
        <line x1="86" y1="40" x2="108" y2="62" strokeOpacity="0.55" />
        <circle cx="36" cy="40" r="3" fill="#ccf252" />
        <circle cx="86" cy="40" r="3" />
        <circle cx="108" cy="62" r="3" fill="#ccf252" />
      </g>
      <g stroke="#ccf252" strokeWidth="1" fill="none">
        <line x1="292" y1="180" x2="342" y2="180" strokeOpacity="0.55" />
        <circle cx="342" cy="180" r="3" fill="#ccf252" />
        <circle cx="292" cy="180" r="3" />
      </g>
    </svg>
  );
}
