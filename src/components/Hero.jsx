import React, { useState } from 'react';
import { ArrowDown, Copy, Check, Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export const Hero = ({ profile }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(profile.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[340px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[380px] h-[280px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* 2-Column Split Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
          
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Clean unboxed editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-cyan-400 mb-4">
              <span>{profile.role}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-300 font-mono">ReactJS & Tailwind CSS</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">Rudhisoft Intern</span>
            </div>

            {/* Headline with text-wrap: balance */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-display max-w-2xl [text-wrap:balance]">
              {profile.headline}
            </h1>

            {/* Lead copy */}
            <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              {profile.bio}
            </p>

            <p className="mt-3 text-sm text-slate-400 leading-relaxed max-w-xl">
              {profile.secondaryBio}
            </p>

            {/* Action buttons and fast connect */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-lg shadow-cyan-500/20 active:scale-[0.98]"
              >
                View My Projects
                <ArrowDown className="w-4 h-4" />
              </a>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-medium text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-750 hover:border-slate-600 rounded-xl transition-all active:scale-[0.98]"
                title="Copy email to clipboard"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span>{profile.email}</span>
                  </>
                )}
              </button>

              <button
                onClick={handleCopyPhone}
                className="inline-flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-medium text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-750 hover:border-slate-600 rounded-xl transition-all active:scale-[0.98]"
                title="Copy phone to clipboard"
              >
                {copiedPhone ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">Phone Copied!</span>
                  </>
                ) : (
                  <>
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span>{profile.phone}</span>
                  </>
                )}
              </button>
            </div>

            {/* Social links row & status note */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors"
                  aria-label="Direct Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <span className="text-xs text-slate-400 flex items-center gap-1.5 ml-2 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  {profile.location}
                </span>
              </div>

              {/* Status Note */}
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>{profile.status}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Container & Profile Frame */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative group">
              {/* Outer decorative glow */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-cyan-500/20 via-blue-500/10 to-indigo-500/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />

              {/* Card Container */}
              <div className="relative bg-[#0e1420] border border-slate-800 rounded-2xl overflow-hidden p-3 shadow-2xl">
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-900">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-102 transition duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  
                  {/* Subtle lower scrim overlay for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e1420] via-transparent to-transparent opacity-80" />

                  {/* Floating interactive meta footer */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-[#0e1420]/90 backdrop-blur-md border border-slate-700/60 rounded-xl">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">{profile.name}</span>
                      <span className="text-cyan-400 font-mono text-[11px]">{profile.location}</span>
                    </div>
                    <div className="mt-1 text-[11px] text-slate-400">
                      Rudhisoft Intern · ReactJS, Tailwind CSS, Axios REST APIs & Performance
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-Column KPI / Metrics Strip below the split */}
        <div className="mt-16 pt-10 border-t border-slate-800/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {profile.stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-5 hover:border-slate-700/80 transition-colors"
              >
                <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display tabular-nums">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm font-medium text-slate-200">
                  {stat.label}
                </div>
                <div className="mt-0.5 text-xs text-slate-400">
                  {stat.context}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
