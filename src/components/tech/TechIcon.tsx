import { TechIconId } from '@/src/data/techStack';

interface TechIconProps {
  id: TechIconId;
  className?: string;
}

/**
 * Clean, lightweight inline SVG icons tailored for each technology in the stack.
 */
export function TechIcon({ id, className = 'h-5 w-5' }: TechIconProps) {
  switch (id) {
    case 'python':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M11.9 3C8.5 3 8.8 4.5 8.8 4.5V6.6H12.1V7.3H7.4C7.4 7.3 4.5 7 4.5 10.6C4.5 14.2 7 14 7 14H8.6V12.2C8.6 12.2 8.5 9.8 11 9.8H14.3C14.3 9.8 16.2 9.8 16.2 8V4.8C16.2 4.8 16.5 3 11.9 3ZM10.2 4.4C10.6 4.4 10.9 4.7 10.9 5.1C10.9 5.5 10.6 5.8 10.2 5.8C9.8 5.8 9.5 5.5 9.5 5.1C9.5 4.7 9.8 4.4 10.2 4.4Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M12.1 21C15.5 21 15.2 19.5 15.2 19.5V17.4H11.9V16.7H16.6C16.6 16.7 19.5 17 19.5 13.4C19.5 9.8 17 10 17 10H15.4V11.8C15.4 11.8 15.5 14.2 13 14.2H9.7C9.7 14.2 7.8 14.2 7.8 16V19.2C7.8 19.2 7.5 21 12.1 21ZM13.8 19.6C13.4 19.6 13.1 19.3 13.1 18.9C13.1 18.5 13.4 18.2 13.8 18.2C14.2 18.2 14.5 18.5 14.5 18.9C14.5 19.3 14.2 19.6 13.8 19.6Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'java':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M6 12H16V15.5C16 17.7 14.2 19.5 12 19.5H10C7.8 19.5 6 17.7 6 15.5V12Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M16 13H17.5C18.6 13 19.5 13.9 19.5 15C19.5 16.1 18.6 17 17.5 17H16"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M9.5 4.5C8.5 6 10.5 7.2 9.5 9M13 3.5C12 5.2 14 6.6 13 8.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'javascript':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M10.5 11.5V15.8C10.5 16.9 9.7 17.5 8.7 17.5C8 17.5 7.5 17.2 7.2 16.7M16.8 12.1C16.4 11.7 15.8 11.4 15.1 11.4C14.1 11.4 13.5 12 13.5 12.8C13.5 13.6 14.1 14 15.2 14.3C16.3 14.6 16.9 15 16.9 16C16.9 16.9 16.1 17.5 15 17.5C14.1 17.5 13.4 17.1 13 16.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'typescript':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M7 11.5H11.5M9.25 11.5V17.4M16.8 12.1C16.4 11.7 15.8 11.4 15.1 11.4C14.1 11.4 13.5 12 13.5 12.8C13.5 13.6 14.1 14 15.2 14.3C16.3 14.6 16.9 15 16.9 16C16.9 16.9 16.1 17.5 15 17.5C14.1 17.5 13.4 17.1 13 16.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'sql':
    case 'mysql':
    case 'sqlite':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <ellipse cx="12" cy="6.5" rx="7" ry="2.8" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M5 6.5V17.5C5 19 8.1 20.3 12 20.3C15.9 20.3 19 19 19 17.5V6.5"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M5 12C5 13.5 8.1 14.8 12 14.8C15.9 14.8 19 13.5 19 12"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      );

    case 'html-css':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M8.5 8L4.5 12L8.5 16M15.5 8L19.5 12L15.5 16M13.2 6.5L10.8 17.5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'react':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="1.7" fill="currentColor" />
          <ellipse cx="12" cy="12" rx="9" ry="3.6" stroke="currentColor" strokeWidth="1.4" />
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="3.6"
            transform="rotate(60 12 12)"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="3.6"
            transform="rotate(120 12 12)"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
      );

    case 'angular':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M12 3L4.5 5.8L5.8 15.8L12 20.5L18.2 15.8L19.5 5.8L12 3Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M9 15L12 7.5L15 15M9.9 13H14.1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'flask':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M9.5 4H14.5M10.5 4V9L5.8 17.5C5.3 18.4 6 19.5 7 19.5H17C18 19.5 18.7 18.4 18.2 17.5L13.5 9V4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M7.5 15H16.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );

    case 'bootstrap':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M9.5 8H12.8C14 8 14.8 8.7 14.8 9.8C14.8 10.7 14.2 11.4 13.3 11.6C14.4 11.8 15.2 12.6 15.2 13.8C15.2 15.1 14.2 16 12.8 16H9.5V8ZM9.5 11.7H12.5M9.5 16"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'pandas':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M7 4V20M11 4V11M11 14V20M15 7V20M18.5 4V13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'numpy':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M12 3L19.5 7.3V16.7L12 21L4.5 16.7V7.3L12 3Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M12 12L19.5 7.3M12 12L4.5 7.3M12 12V21"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
      );

    case 'nlp':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M5 6.5H19C19.8 6.5 20.5 7.2 20.5 8V15C20.5 15.8 19.8 16.5 19 16.5H11L6.5 20V16.5H5C4.2 16.5 3.5 15.8 3.5 15V8C3.5 7.2 4.2 6.5 5 6.5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M7.5 10.5H16.5M7.5 13.5H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'scikit-learn':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <circle cx="7" cy="17" r="2.2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="17" cy="7" r="2.2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="16.5" cy="16.5" r="1.8" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="7.5" cy="7.5" r="1.8" stroke="currentColor" strokeWidth="1.5" />
          <path d="M5 19.5L19.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2.5 2.5" />
        </svg>
      );

    case 'opencv':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <circle cx="12" cy="6.5" r="3" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="7" cy="16" r="3" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="17" cy="16" r="3" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );

    case 'face-recognition':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M4 8V5.5C4 4.7 4.7 4 5.5 4H8M16 4H18.5C19.3 4 20 4.7 20 5.5V8M4 16V18.5C4 19.3 4.7 20 5.5 20H8M16 20H18.5C19.3 20 20 19.3 20 18.5V16"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="9.5" cy="10.5" r="1" fill="currentColor" />
          <circle cx="14.5" cy="10.5" r="1" fill="currentColor" />
          <path d="M9.5 14.8C10.2 15.6 11 16 12 16C13 16 13.8 15.6 14.5 14.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'rag':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <rect x="4" y="4.5" width="7" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="17" cy="15.5" r="3.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M11 9H15.5C16.3 9 17 9.7 17 10.5V12M19.5 18L21 19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'git':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <circle cx="7.5" cy="6" r="2" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="7.5" cy="18" r="2" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="17" cy="10" r="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7.5 8V16M9.5 17.2C13.5 16.5 17 14.2 17 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );

    case 'stibo-step':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <rect x="9" y="3.5" width="6" height="4.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
          <rect x="3.5" y="15.5" width="6" height="4.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
          <rect x="14.5" y="15.5" width="6" height="4.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 8V12M6.5 15.5V12H17.5V15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'aws':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M6.8 14.5H17.4C19.2 14.5 20.5 13.2 20.5 11.5C20.5 9.9 19.3 8.7 17.8 8.5C17.3 5.9 15 4 12.2 4C9.5 4 7.2 5.8 6.7 8.4C5 8.7 3.5 10.1 3.5 11.8C3.5 13.4 5 14.5 6.8 14.5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M6.5 17.8C9.8 19.8 14.2 19.8 17.5 17.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );

    case 'ui-ux':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3.5 9.5H20.5M9.5 9.5V19.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
  }
}
