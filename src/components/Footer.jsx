
import React from 'react';
import {
  ArrowUp,
  ArrowUpRight,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Sparkles,
} from 'lucide-react';

export const Footer = ({ profile = {} }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const wordmark = profile.wordmark || profile.name || 'Portfolio';

  const socialLinks = [
    {
      label: 'GitHub',
      href: profile.github,
      icon: Github,
    },
    {
      label: 'LinkedIn',
      href: profile.linkedin,
      icon: Linkedin,
    },
    {
      label: 'Twitter',
      href: profile.twitter,
      icon: Twitter,
    },
  ].filter(
    (link) =>
      typeof link.href === 'string' &&
      /^https?:\/\//i.test(link.href)
  );

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-[#070b12]">
      {/* Ambient background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[80%] max-w-3xl -translate-x-1/2 rounded-full bg-cyan-500/[0.07] blur-[100px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-6 pt-12 sm:px-8 sm:pt-16 lg:px-10">
        {/* Main CTA */}
        <div className="relative mb-12 overflow-hidden rounded-2xl border border-white/[0.09] bg-gradient-to-br from-slate-900/90 via-[#0b1420] to-[#0b111a] p-6 sm:p-9 lg:p-10">
          <div
            aria-hidden="true"
            className="absolute -right-12 -top-20 h-48 w-48 rounded-full border border-cyan-400/10 sm:h-64 sm:w-64"
          />
          <div
            aria-hidden="true"
            className="absolute -right-4 -top-12 h-36 w-36 rounded-full border border-cyan-400/[0.08] sm:h-48 sm:w-48"
          />

          <div className="relative flex flex-col justify-between gap-7 md:flex-row md:items-center">
            <div className="max-w-xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.07] px-3 py-1.5 text-xs font-medium text-cyan-300">
                <Sparkles className="h-3.5 w-3.5" />
                Have a project in mind?
              </div>

              <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                Let's build something
                <span className="mt-1 block bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                  great together.
                </span>
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-slate-400 sm:text-base">
                Have an idea, an opportunity, or just want to connect?
                I'd love to hear from you.
              </p>
            </div>

            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex w-fit shrink-0 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-300 hover:shadow-cyan-400/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1420]"
              >
                <Mail className="h-4 w-4" />
                Let's Talk
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )}
          </div>
        </div>

        {/* Footer content */}
        <div className="flex flex-col gap-7 border-b border-white/[0.07] pb-8 md:flex-row md:items-center md:justify-between">
          {/* Brand */}
          <div className="text-center md:text-left">
            <a
              href="#"
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-white transition-colors hover:text-cyan-300"
              aria-label={`${wordmark} — back to top`}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-sm text-cyan-300 transition-colors group-hover:bg-cyan-400/20">
                {wordmark.charAt(0).toUpperCase()}
              </span>
              {wordmark}
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
            </a>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              {profile.location || 'Building ideas into reality'}
            </p>
          </div>

          {/* Social links */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${label}`}
                title={label}
                className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-slate-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-cyan-400/[0.08] hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
              </a>
            ))}

            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                aria-label="Send an email"
                title="Email"
                className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-slate-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-cyan-400/[0.08] hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <Mail className="h-4 w-4 transition-transform group-hover:scale-110" />
              </a>
            )}

            <button
              type="button"
              onClick={scrollToTop}
              className="group ml-1 inline-flex items-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.03] px-3.5 py-2.5 text-xs font-medium text-slate-300 transition-all duration-200 hover:border-cyan-400/30 hover:bg-cyan-400/[0.08] hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label="Scroll back to top"
            >
              Back to top
              <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 pt-5 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {profile.name || wordmark}.
            {' '}Made with care.
          </p>

          <a
            href="#projects"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 transition-colors hover:text-cyan-300"
          >
            Explore my work
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </footer>
  );
};
