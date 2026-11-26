import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS, NavSectionId } from '@/src/types/portfolio';

interface NavbarProps {
  activeSection: NavSectionId;
  onSelectSection: (section: NavSectionId) => void;
}

/**
 * Floating rounded agency navigation bar, clearly separated above the hero stage:
 * [Brand Wordmark] — [5 single-line nav links] — [1 primary CTA]
 */
export function Navbar({ activeSection, onSelectSection }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (id: NavSectionId) => {
    onSelectSection(id);
    setMobileOpen(false);
  };

  return (
    <header
      data-hero-nav
      className="relative z-30 w-full px-4 sm:px-8 lg:px-12 pt-4 sm:pt-6"
    >
      <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-6 sm:gap-8 rounded-full glass-studio-light px-5 sm:px-7 py-2.5 sm:py-3">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-[#091e0e] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#091e0e]"
        >
          MONIESH®
        </a>

        {/* Zone 2: Clean single-line typography navigation */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-6 lg:gap-8"
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              data-active={activeSection === item.id}
              className="nav-underline cursor-pointer text-sm font-semibold tracking-tight text-[#091e0e]/85 hover:text-[#091e0e] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#091e0e]"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary CTA + Mobile Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => handleNavClick('contact')}
            className="hidden sm:inline-flex cursor-pointer items-center justify-center rounded-full bg-[#091e0e] px-5 py-2 text-xs sm:text-sm font-semibold text-[#f5fce0] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#13381b] active:translate-y-0 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#091e0e]"
          >
            Let&apos;s Talk
          </button>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex md:hidden h-10 w-10 items-center justify-center rounded-full bg-[#091e0e]/10 text-[#091e0e] cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation sheet */}
      {mobileOpen && (
        <div className="md:hidden mt-3 mx-auto max-w-[1360px] glass-studio-dark rounded-2xl p-4 text-[#f5fce0]">
          <nav aria-label="Mobile Primary" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-left text-base font-semibold transition-colors cursor-pointer ${
                  activeSection === item.id
                    ? 'bg-[#ccf252] text-[#091e0e]'
                    : 'text-[#f5fce0] hover:bg-white/10'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
