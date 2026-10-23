import React from 'react';
import { Briefcase, GraduationCap, Award } from 'lucide-react';

export const ExperienceTimeline = ({
  experiences,
  educations,
  certifications
}) => {
  return (
    <section id="experience" className="py-24 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="mb-14">
          <div className="text-xs font-semibold tracking-wider uppercase text-cyan-400 mb-2">
            Professional Background
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Experience & Education
          </h2>
          <p className="mt-3 text-slate-400 max-w-xl text-sm sm:text-base">
            Hands-on internships building production e-commerce modules and responsive web interfaces, alongside academic training in Computer Engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Work Experience (Left 7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-sm font-bold text-white font-display mb-2">
              <Briefcase className="w-4 h-4 text-cyan-400" />
              <span>Work Experience</span>
            </div>

            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="bg-[#0e1420] border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-6 sm:p-7 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-slate-800/80">
                  <div>
                    <h3 className="text-lg font-bold text-white font-display">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-cyan-400 font-medium mt-0.5">
                      <span className="text-white font-semibold">{exp.company}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="text-slate-400">{exp.location}</span>
                    </div>
                  </div>

                  {/* Period & Type */}
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-1 sm:mt-0">
                    <span className="tabular-nums">{exp.period}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-cyan-400/90">{exp.type}</span>
                  </div>
                </div>

                {/* Bullets */}
                <div className="mt-4 space-y-2.5">
                  {exp.bulletPoints.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Tech stack */}
                <div className="mt-5 pt-3 border-t border-slate-800/60 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400">
                  <span className="text-slate-500 font-medium">Stack:</span>
                  {exp.techStack.map((tech, tIdx) => (
                    <span key={tech} className="text-slate-300">
                      {tech}{tIdx < exp.techStack.length - 1 ? ' ·' : ''}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Education & Certifications (Right 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Education */}
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-white font-display mb-3">
                <GraduationCap className="w-4 h-4 text-cyan-400" />
                <span>Education</span>
              </div>

              <div className="space-y-4">
                {educations.map((edu, idx) => (
                  <div
                    key={idx}
                    className="bg-[#0e1420] border border-slate-800 rounded-2xl p-6 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
                      <span>{edu.period}</span>
                      <span>{edu.location}</span>
                    </div>
                    <h4 className="text-base font-bold text-white font-display">
                      {edu.degree}
                    </h4>
                    <div className="text-xs text-slate-300 mt-1">
                      {edu.institution}
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Academic Score:</span>
                      <span className="font-mono font-semibold text-cyan-300 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                        {edu.score}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-white font-display mb-3">
                <Award className="w-4 h-4 text-cyan-400" />
                <span>Certifications</span>
              </div>

              <div className="bg-[#0e1420] border border-slate-800 rounded-2xl p-6 space-y-3">
                {certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-950/80 border border-slate-800/80 rounded-xl flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-white">{cert.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Authorized Certification</div>
                    </div>
                    <span className="text-cyan-400 font-mono font-medium text-xs bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                      {cert.issuer}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
