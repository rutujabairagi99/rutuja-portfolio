
import React from 'react';
import {
  Briefcase,
  GraduationCap,
  Award,
  MapPin,
  CalendarDays,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const ExperienceTimeline = ({
  experiences = [],
  educations = [],
  certifications = [],
}) => {
  const safeExperiences = Array.isArray(experiences) ? experiences : [];
  const safeEducations = Array.isArray(educations) ? educations : [];
  const safeCertifications = Array.isArray(certifications)
    ? certifications
    : [];

  return (
    <section
      id="experience"
      className="relative overflow-hidden border-t border-slate-800/80 py-20 sm:py-24"
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-cyan-500/[0.05] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-blue-500/[0.05] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section heading */}
        <div className="mb-12 max-w-3xl sm:mb-14">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.07] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
            <Sparkles className="h-3.5 w-3.5" />
            Professional Background
          </div>

          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            My Journey
            <span className="mt-1 block text-cyan-400">
              So Far.
            </span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            My professional experience, academic background, and certifications
            reflect my ongoing journey in software development and modern web
            technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Work experience */}
          <div className="lg:col-span-7">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.08] text-cyan-300">
                <Briefcase className="h-5 w-5" />
              </div>

              <div>
                <h3 className="font-display text-lg font-bold text-white">
                  Work Experience
                </h3>
                <p className="mt-0.5 text-xs text-slate-500">
                  Practical experience &amp; contributions
                </p>
              </div>

              <span className="ml-auto rounded-lg border border-slate-800 bg-slate-900/70 px-2.5 py-1 text-xs font-mono text-slate-400">
                {safeExperiences.length}
              </span>
            </div>

            {safeExperiences.length > 0 ? (
              <div className="relative space-y-5 pl-4 sm:pl-5">
                {/* Timeline line */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-8 left-[7px] top-8 w-px bg-gradient-to-b from-cyan-400/60 via-slate-700 to-transparent sm:left-[8px]"
                />

                {safeExperiences.map((exp, index) => {
                  const bullets = Array.isArray(exp.bulletPoints)
                    ? exp.bulletPoints
                    : [];
                  const techStack = Array.isArray(exp.techStack)
                    ? exp.techStack
                    : [];

                  return (
                    <article
                      key={exp.id || `${exp.company}-${exp.role}-${index}`}
                      className="group relative min-w-0"
                    >
                      {/* Timeline marker */}
                      <div
                        aria-hidden="true"
                        className="absolute -left-[16px] top-7 z-10 h-3 w-3 rounded-full border-2 border-cyan-400 bg-slate-950 shadow-[0_0_12px_rgba(34,211,238,0.2)] sm:-left-[17px]"
                      />

                      <div className="rounded-2xl border border-slate-800/90 bg-[#0e1420]/90 p-5 transition duration-300 hover:border-cyan-400/30 hover:shadow-xl hover:shadow-cyan-950/20 sm:p-7">
                        {/* Role and dates */}
                        <div className="flex flex-col gap-4 border-b border-slate-800/80 pb-5 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <h4 className="font-display text-lg font-bold leading-snug text-white transition-colors group-hover:text-cyan-200 sm:text-xl">
                              {exp.role}
                            </h4>

                            <p className="mt-1.5 break-words text-sm font-semibold text-cyan-400">
                              {exp.company}
                            </p>

                            {exp.location && (
                              <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                                <MapPin className="h-3.5 w-3.5 shrink-0" />
                                <span>{exp.location}</span>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                            {exp.period && (
                              <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950/70 px-2.5 py-1.5 text-xs text-slate-300">
                                <CalendarDays className="h-3.5 w-3.5 text-cyan-400" />
                                {exp.period}
                              </span>
                            )}

                            {exp.type && (
                              <span className="rounded-lg border border-cyan-400/15 bg-cyan-400/[0.06] px-2.5 py-1.5 text-xs font-medium text-cyan-300">
                                {exp.type}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Responsibilities */}
                        {bullets.length > 0 && (
                          <div className="mt-5">
                            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                              Key Contributions
                            </p>

                            <ul className="space-y-3">
                              {bullets.map((bullet, bulletIndex) => (
                                <li
                                  key={`${exp.id || exp.role}-bullet-${bulletIndex}`}
                                  className="flex items-start gap-2.5 text-sm leading-6 text-slate-300"
                                >
                                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-500/80" />
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Technology stack */}
                        {techStack.length > 0 && (
                          <div className="mt-6 border-t border-slate-800/80 pt-4">
                            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                              Technologies Used
                            </p>

                            <div className="flex flex-wrap gap-2">
                              {techStack.map((tech) => (
                                <span
                                  key={tech}
                                  className="rounded-lg border border-slate-800 bg-slate-950/70 px-2.5 py-1.5 text-xs text-slate-300 transition hover:border-cyan-400/25 hover:text-cyan-200"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-8 text-center">
                <Briefcase className="mx-auto h-7 w-7 text-slate-600" />
                <p className="mt-3 text-sm text-slate-400">
                  Experience details will appear here.
                </p>
              </div>
            )}
          </div>

          {/* Education and certifications */}
          <div className="space-y-9 lg:col-span-5">
            {/* Education */}
            <div>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/[0.08] text-blue-300">
                  <GraduationCap className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-display text-lg font-bold text-white">
                    Education
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Academic foundation
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {safeEducations.length > 0 ? (
                  safeEducations.map((edu, index) => (
                    <article
                      key={`${edu.degree || 'education'}-${edu.institution || index}`}
                      className="group rounded-2xl border border-slate-800/90 bg-[#0e1420]/90 p-5 transition duration-300 hover:border-blue-400/30 sm:p-6"
                    >
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                        {edu.period && (
                          <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                            <CalendarDays className="h-3.5 w-3.5 text-blue-400" />
                            {edu.period}
                          </span>
                        )}

                        {edu.location && (
                          <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                            <MapPin className="h-3.5 w-3.5" />
                            {edu.location}
                          </span>
                        )}
                      </div>

                      <h4 className="font-display text-base font-bold leading-snug text-white transition-colors group-hover:text-blue-200">
                        {edu.degree}
                      </h4>

                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {edu.institution}
                      </p>

                      {edu.score && (
                        <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-800/80 pt-4">
                          <span className="text-xs text-slate-500">
                            Academic Score
                          </span>

                          <span className="rounded-lg border border-blue-400/20 bg-blue-400/[0.07] px-2.5 py-1.5 font-mono text-xs font-semibold text-blue-300">
                            {edu.score}
                          </span>
                        </div>
                      )}
                    </article>
                  ))
                ) : (
                  <p className="rounded-2xl border border-dashed border-slate-800 p-5 text-sm text-slate-500">
                    Education details will appear here.
                  </p>
                )}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-400/[0.08] text-violet-300">
                  <Award className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-display text-lg font-bold text-white">
                    Certifications
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Courses &amp; credentials
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800/90 bg-[#0e1420]/90 p-4 sm:p-5">
                {safeCertifications.length > 0 ? (
                  <div className="space-y-3">
                    {safeCertifications.map((cert, index) => (
                      <div
                        key={`${cert.title || 'certification'}-${cert.issuer || index}`}
                        className="group flex min-w-0 items-start gap-3 rounded-xl border border-slate-800/80 bg-slate-950/50 p-4 transition hover:border-violet-400/25 hover:bg-slate-950/80"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-violet-400/15 bg-violet-400/[0.07] text-violet-300">
                          <Award className="h-4 w-4" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h4 className="break-words text-sm font-semibold leading-5 text-white">
                            {cert.title}
                          </h4>

                          {cert.issuer && (
                            <p className="mt-1 break-words text-xs text-slate-400">
                              {cert.issuer}
                            </p>
                          )}

                          <p className="mt-2 text-[10px] font-medium uppercase tracking-wider text-slate-600">
                            Certification
                          </p>
                        </div>

                        <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-slate-600 transition group-hover:text-violet-300" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="p-3 text-sm text-slate-500">
                    Certifications will appear here.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
