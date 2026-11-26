import { Suspense, lazy, useEffect, useRef } from 'react';
import { ArrowUp, ArrowUpRight, Mail } from 'lucide-react';
import { runContactReveal } from '@/src/animations/gsapContactReveal';

const ContactCanvas = lazy(() => import('./ContactCanvas'));

export interface ContactSectionProps {
  onBackToTop?: () => void;
}

interface ContactChannel {
  id: string;
  label: string;
  value: string;
  href: string;
  external: boolean;
  actionHint: string;
}

const CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: 'email',
    label: 'EMAIL',
    value: 'moniesh48@gmail.com',
    href: 'mailto:moniesh48@gmail.com',
    external: false,
    actionHint: 'Send an email',
  },
  {
    id: 'github',
    label: 'GITHUB',
    value: 'moniesh-2005',
    href: 'https://github.com/moniesh-2005',
    external: true,
    actionHint: 'View repositories',
  },
  {
    id: 'linkedin',
    label: 'LINKEDIN',
    value: 'Moniesh R',
    href: 'https://linkedin.com/in/moniesh-r-828685303',
    external: true,
    actionHint: 'Connect on LinkedIn',
  },
];

function ChannelIcon({ id }: { id: string }) {
  if (id === 'email') {
    return <Mail className="h-5 w-5" aria-hidden="true" />;
  }
  if (id === 'github') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path
          d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="3.5"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M8 10.5V16.5M8 7.5V7.6M11.5 16.5V10.5M11.5 12.8C11.5 11.4 12.6 10.5 14 10.5C15.4 10.5 16.2 11.4 16.2 12.9V16.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Closing Contact section (`06 — LET'S CONNECT`) & Footer for the MONIESH® portfolio.
 * Features an oversized editorial headline, prominent lime-green mailto CTA,
 * interactive Email/GitHub/LinkedIn cards, subtle 3D sculpture backdrop, and clean footer.
 */
export function ContactSection({ onBackToTop }: ContactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = runContactReveal({ root: sectionRef.current });
    return () => ctx.revert();
  }, []);

  const handleBackToTop = () => {
    if (onBackToTop) {
      onBackToTop();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-heading"
      className="relative z-30 w-full overflow-hidden bg-[#061409] text-[#f5fce0]"
      style={{
        background:
          'radial-gradient(62% 52% at 78% 24%, rgba(204, 242, 82, 0.16) 0%, rgba(94, 130, 22, 0.08) 46%, transparent 76%), radial-gradient(48% 40% at 14% 72%, rgba(140, 185, 36, 0.12) 0%, transparent 72%), linear-gradient(180deg, #07170a 0%, #091c0d 55%, #051107 100%)',
      }}
    >
      {/* Top architectural hairline divider */}
      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-transparent via-[#ccf252]/35 to-transparent"
      />

      {/* Decorative 3D sculpture canvas echoing the hero visual language */}
      <Suspense fallback={null}>
        <ContactCanvas />
      </Suspense>

      <div className="relative z-10 mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-10 pt-20 sm:pt-28 lg:pt-36 pb-10 sm:pb-14">
        {/* Closing Editorial Header & Primary Lime-Green Mailto CTA */}
        <header data-contact-header className="max-w-4xl">
          <p
            data-contact-kicker
            className="mb-5 text-xs sm:text-sm font-semibold tracking-wide text-[#ccf252]"
          >
            06 — LET&apos;S CONNECT
          </p>

          <h2
            id="contact-heading"
            className="font-display text-[clamp(2.85rem,7.4vw,6.4rem)] font-extrabold leading-[0.89] tracking-[-0.04em] text-[#f5fce0] [text-wrap:balance]"
          >
            <span className="block overflow-hidden pb-1">
              <span data-contact-headline-line className="block">
                HAVE A PROJECT
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span
                data-contact-headline-line
                className="block text-[#ccf252]"
              >
                IN MIND?
              </span>
            </span>
          </h2>

          <p
            data-contact-intro
            className="mt-7 sm:mt-9 max-w-2xl text-base sm:text-xl lg:text-[1.35rem] font-medium leading-relaxed text-[#f5fce0]/84"
          >
            I&apos;m always interested in exploring new ideas, building useful
            products and connecting with people who enjoy creating meaningful
            technology.
          </p>

          {/* Prominent Lime-Green Mailto CTA Button */}
          <div data-contact-cta className="mt-9 sm:mt-12">
            <a
              href="mailto:moniesh48@gmail.com"
              className="group inline-flex items-center gap-3.5 rounded-full bg-[#ccf252] px-8 sm:px-10 py-4 sm:py-5 font-display text-base sm:text-lg font-extrabold tracking-tight text-[#091e0e] shadow-[0_22px_52px_-12px_rgba(204,242,82,0.45)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:bg-[#daf872] hover:shadow-[0_28px_60px_-12px_rgba(204,242,82,0.58)] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ccf252]"
            >
              <span>LET&apos;S TALK</span>
              <ArrowUpRight
                className="h-5 w-5 text-[#091e0e] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden="true"
              />
            </a>
          </div>
        </header>

        {/* Interactive Contact Channel Cards: Email, GitHub, LinkedIn */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 items-stretch">
          {CONTACT_CHANNELS.map((channel) => (
            <a
              key={channel.id}
              data-contact-card
              href={channel.href}
              target={channel.external ? '_blank' : undefined}
              rel={channel.external ? 'noopener noreferrer' : undefined}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-[#ccf252]/20 bg-[#0c2210]/90 p-7 sm:p-8 text-[#f5fce0] shadow-[0_26px_64px_-20px_rgba(3,12,5,0.68)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-[#ccf252]/60 hover:bg-[#123218] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ccf252]"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#ccf252]/28 bg-[#14391c] text-[#ccf252] transition-colors duration-300 group-hover:border-[#ccf252] group-hover:bg-[#ccf252] group-hover:text-[#091e0e]">
                  <ChannelIcon id={channel.id} />
                </span>

                <ArrowUpRight
                  className="h-5 w-5 text-[#ccf252]/75 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#ccf252]"
                  aria-hidden="true"
                />
              </div>

              <div className="mt-8">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#ccf252]">
                  {channel.label}
                </p>
                <p className="mt-2 font-display text-xl sm:text-2xl font-extrabold tracking-tight text-[#f5fce0] break-words transition-colors duration-200 group-hover:text-[#ccf252]">
                  {channel.value}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#ccf252]/12 flex items-center justify-between text-xs font-medium text-[#f5fce0]/65 transition-colors duration-200 group-hover:text-[#f5fce0]/90">
                <span>{channel.actionHint}</span>
                <span>{channel.external ? 'External Profile' : 'Direct Mail'}</span>
              </div>
            </a>
          ))}
        </div>

        {/* Closing Portfolio Footer */}
        <footer
          data-contact-footer
          className="mt-20 sm:mt-28 pt-8 border-t border-[#ccf252]/18 flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleBackToTop();
              }}
              className="font-display text-xl font-extrabold tracking-tight text-[#f5fce0] transition-colors hover:text-[#ccf252] whitespace-nowrap"
            >
              MONIESH®
            </a>
            <span aria-hidden="true" className="text-[#ccf252]/40">
              ·
            </span>
            <p className="text-xs sm:text-sm font-semibold tracking-wide text-[#f5fce0]/78">
              DESIGNED &amp; BUILT BY MONIESH
            </p>
            <span aria-hidden="true" className="text-[#ccf252]/40">
              ·
            </span>
            <p className="text-xs sm:text-sm font-semibold tabular-nums text-[#ccf252]">
              © 2026
            </p>
          </div>

          <button
            type="button"
            onClick={handleBackToTop}
            className="group inline-flex cursor-pointer items-center gap-2.5 self-start md:self-auto rounded-full border border-[#ccf252]/28 bg-[#102c15] px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#f5fce0] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ccf252] hover:text-[#ccf252] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ccf252]"
          >
            <span>Back to Top</span>
            <ArrowUp
              className="h-4 w-4 text-[#ccf252] transition-transform duration-200 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </button>
        </footer>
      </div>
    </section>
  );
}
