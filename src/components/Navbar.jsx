
import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  SlidersHorizontal,
  ArrowUpRight,
} from 'lucide-react';

export const Navbar = ({ profile = {}, onOpenCustomizer }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navLinks = [
    { label: 'Projects', href: '#projects' },
    { label: 'Skills & Tools', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleCustomize = () => {
    closeMobileMenu();
    onOpenCustomizer?.();
  };

  const wordmark = profile.wordmark || profile.name || 'Portfolio';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-slate-800/80 bg-[#0b0f17]/90 py-3 backdrop-blur-xl shadow-lg shadow-black/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* Brand */}
          <a
            href="#"
            onClick={closeMobileMenu}
            className="shrink min-w-0 truncate font-display text-lg font-bold tracking-tight text-white transition-colors hover:text-cyan-400 sm:text-xl"
            aria-label={`${wordmark} — back to top`}
          >
            {wordmark}
          </a>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-5 text-sm font-medium text-slate-300 lg:flex xl:gap-8"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative whitespace-nowrap py-2 transition-colors hover:text-white"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-cyan-400 transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleCustomize}
              title="Personalize portfolio details"
              aria-label="Customize portfolio content"
              className="rounded-lg border border-transparent p-2 text-slate-400 transition-colors hover:border-slate-700/60 hover:bg-slate-800/60 hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </button>

            <a
              href="#contact"
              onClick={closeMobileMenu}
              className="hidden items-center gap-1.5 whitespace-nowrap rounded-lg bg-cyan-400 px-3 py-2 text-xs font-semibold text-slate-950 shadow-sm shadow-cyan-500/20 transition-colors hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f17] sm:inline-flex sm:px-4"
            >
              Get in Touch
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() =>
                setMobileMenuOpen((open) => !open)
              }
              className="rounded-lg p-2 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 lg:hidden"
              aria-label={
                mobileMenuOpen
                  ? 'Close navigation menu'
                  : 'Open navigation menu'
              }
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="mt-4 rounded-xl border border-slate-800/80 bg-[#0e1420]/95 p-3 shadow-2xl backdrop-blur-xl lg:hidden sm:p-4"
          >
            <nav
              aria-label="Mobile navigation"
              className="flex flex-col gap-1"
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-800/60 hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  {link.label}
                </a>
              ))}

              <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-3">
                <button
                  type="button"
                  onClick={handleCustomize}
                  className="flex items-center gap-1.5 rounded-md py-2 text-xs text-slate-400 transition-colors hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  Customize Profile
                </button>

                <a
                  href="#contact"
                  onClick={closeMobileMenu}
                  className="inline-flex items-center gap-1 rounded-md bg-cyan-400 px-3 py-2 text-xs font-semibold text-slate-950 transition-colors hover:bg-cyan-300"
                >
                  Contact Me
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
