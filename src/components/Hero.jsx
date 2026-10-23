
import React, { useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from 'lucide-react';

export const Hero = ({ profile = {} }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = async (value, setCopied) => {
    if (!value || !navigator.clipboard) return;

    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Could not copy to clipboard:', error);
    }
  };

  const stats = Array.isArray(profile.stats) ? profile.stats : [];

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-[#080d17] pb-16 pt-28 text-white sm:pt-32 lg:pb-20 lg:pt-36"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.18) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
          maskImage: 'linear-gradient(to bottom, black, transparent 88%)',
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 -z-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-32 -z-10 h-96 w-96 rounded-full bg-blue-600/10 blur-[130px]"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Introduction */}
          <div className="lg:col-span-7">
            <div className="mb-7 inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/70 px-3.5 py-2 text-xs font-medium text-slate-300 shadow-lg shadow-black/10">
              <Sparkles
                className="h-3.5 w-3.5 shrink-0 text-cyan-400"
                aria-hidden="true"
              />
              <span>{profile.role || 'Web Developer'}</span>
              <span className="text-slate-600">/</span>
              <span className="text-cyan-300">
                ReactJS &amp; Tailwind CSS
              </span>
            </div>

            {/* Headline */}
            <h1
              id="hero-title"
              className="max-w-3xl text-4xl font-bold leading-[1.12] tracking-[-0.045em] text-white sm:text-5xl md:text-6xl xl:text-7xl"
            >
              {profile.headline || `Hi, I'm ${profile.name || 'a Developer'}`}
            </h1>

            <div
              aria-hidden="true"
              className="mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
            />

            {profile.bio && (
              <p className="mt-7 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                {profile.bio}
              </p>
            )}

            {profile.secondaryBio && (
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                {profile.secondaryBio}
              </p>
            )}

            {/* Primary actions */}
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-cyan-300 hover:shadow-cyan-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080d17]"
              >
                View My Projects
                <ArrowDownRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </a>

              
{/* Download Resume */}
<a
  href="/resume.pdf"
  download="Rutuja_Bairagi_Resume.pdf"
  onClick={(event) => {
    event.preventDefault();

    const link = document.createElement('a');
    link.href = `${import.meta.env.BASE_URL}resume.pdf`;
    link.download = 'Rutuja_Bairagi_Resume.pdf';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }}
  className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-400/[0.06] px-5 py-3 text-sm font-semibold text-cyan-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-400/15 hover:shadow-lg hover:shadow-cyan-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
>
  <Download
    className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
    aria-hidden="true"
  />
  Download My Resume
</a>



              {profile.email && (
                <button
                  type="button"
                  onClick={() => copyToClipboard(profile.email, setCopiedEmail)}
                  className="inline-flex min-h-12 max-w-full items-center gap-2 rounded-xl border border-slate-700 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-200 transition-colors hover:border-cyan-400/50 hover:bg-cyan-400/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  aria-label={copiedEmail ? 'Email copied' : 'Copy email address'}
                  title="Copy email address"
                >
                  {copiedEmail ? (
                    <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                  ) : (
                    <Mail className="h-4 w-4 shrink-0 text-cyan-400" />
                  )}
                  <span className="break-all">
                    {copiedEmail ? 'Email Copied!' : profile.email}
                  </span>
                  {!copiedEmail && (
                    <Copy
                      className="h-3.5 w-3.5 shrink-0 text-slate-500"
                      aria-hidden="true"
                    />
                  )}
                </button>
              )}
            </div>

            {/* Contact and social information */}
            <div className="mt-10 border-t border-slate-800/90 pt-6">
              <div className="flex flex-wrap items-center justify-between gap-5">
                <div className="flex flex-wrap items-center gap-3">
                  {profile.github && (
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub profile"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700/80 bg-slate-900/70 text-slate-300 transition-all hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    >
                      <Github className="h-[18px] w-[18px]" />
                    </a>
                  )}

                  {profile.linkedin && (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn profile"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700/80 bg-slate-900/70 text-slate-300 transition-all hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    >
                      <Linkedin className="h-[18px] w-[18px]" />
                    </a>
                  )}

                  {profile.email && (
                    <a
                      href={`mailto:${profile.email}`}
                      aria-label="Send an email"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700/80 bg-slate-900/70 text-slate-300 transition-all hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    >
                      <Mail className="h-[18px] w-[18px]" />
                    </a>
                  )}

                  {profile.phone && (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(profile.phone, setCopiedPhone)}
                      title="Copy phone number"
                      aria-label={
                        copiedPhone
                          ? 'Phone number copied'
                          : 'Copy phone number'
                      }
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700/80 bg-slate-900/70 text-slate-300 transition-all hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    >
                      {copiedPhone ? (
                        <Check className="h-[18px] w-[18px] text-emerald-400" />
                      ) : (
                        <Phone className="h-[18px] w-[18px]" />
                      )}
                    </button>
                  )}
                </div>

                {profile.location && (
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <MapPin
                      className="h-4 w-4 shrink-0 text-cyan-400"
                      aria-hidden="true"
                    />
                    <span>{profile.location}</span>
                  </div>
                )}
              </div>

              {profile.status && (
                <div className="mt-6 flex items-center gap-2.5 text-sm text-slate-400">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-30" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </span>
                  <span>{profile.status}</span>
                  <span className="text-slate-600">·</span>
                  <span>Rudhisoft Intern</span>
                </div>
              )}
            </div>
          </div>

          {/* Profile visual */}
          <div className="mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            <div className="group relative mx-auto max-w-[440px]">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-indigo-500/20 opacity-70 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              />

              <div className="relative rounded-[1.7rem] border border-white/10 bg-gradient-to-br from-slate-700/70 via-slate-900 to-[#0b1220] p-2.5 shadow-2xl shadow-black/40">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-slate-900">
                  {profile.avatarUrl ? (
                    <img
                      src={profile.avatarUrl}
                      alt={
                        profile.name
                          ? `${profile.name} portrait`
                          : 'Profile portrait'
                      }
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      onError={(event) => {
                        event.currentTarget.style.opacity = '0';
                      }}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950">
                      <span className="text-8xl font-bold tracking-tight text-cyan-400">
                        {(profile.name || 'D').charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080d17] via-[#080d17]/10 to-transparent"
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-cyan-950/20 to-transparent"
                  />

                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#080d17]/75 px-3 py-2 text-xs font-medium text-white shadow-lg backdrop-blur-xl sm:left-5 sm:top-5">
                    <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
                    <span>Developer Portfolio</span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                    <div className="mb-3 h-px w-full bg-gradient-to-r from-cyan-400/80 via-white/20 to-transparent" />

                    <div className="flex items-end justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">
                          Hello, I'm
                        </p>
                        <h2 className="mt-1 break-words text-2xl font-bold tracking-tight text-white sm:text-3xl">
                          {profile.name || 'Developer'}
                        </h2>
                        <p className="mt-1 text-sm text-slate-300">
                          {profile.role || 'ReactJS Developer'}
                        </p>
                      </div>

                      <a
                        href="#projects"
                        aria-label="Explore projects"
                        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:border-cyan-300 hover:bg-cyan-400 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                      >
                        <ArrowUpRight className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div
                aria-hidden="true"
                className="absolute -right-3 -top-3 h-12 w-12 rounded-tr-2xl border-r-2 border-t-2 border-cyan-400/70"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-3 -left-3 h-12 w-12 rounded-bl-2xl border-b-2 border-l-2 border-blue-400/60"
              />
            </div>
          </div>
        </div>

        {/* Existing statistics */}
        {stats.length > 0 && (
          <div className="mt-16 border-t border-slate-800/90 pt-8 sm:mt-20 sm:pt-10">
            <div className="mb-6 flex items-center justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                At a glance
              </p>
              <span className="h-px max-w-24 flex-1 bg-slate-800 sm:max-w-40" />
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="group rounded-2xl border border-slate-800/90 bg-slate-900/45 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-slate-900/80 sm:p-5"
                >
                  <div className="text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-cyan-300 sm:text-3xl">
                    {stat.value}
                  </div>

                  <p className="mt-2 text-sm font-medium text-slate-200">
                    {stat.label}
                  </p>

                  {stat.context && (
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">
                      {stat.context}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
