import React from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

export const ProjectCard = ({ project, onOpenDetails, isWide = false }) => {
  return (
    <div
      className={`group bg-[#0e1420] border border-slate-800/80 hover:border-slate-700 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-black/40 ${
        isWide ? 'lg:col-span-2' : 'col-span-1'
      }`}
    >
      <div>
        {/* Media Container with fallback */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-slate-900">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-500 ease-out"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          {/* Subtle gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1420] via-[#0e1420]/30 to-transparent" />

          {/* Quick Action Overlay on hover */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            {project.featured && (
              <span className="px-2.5 py-1 text-[11px] font-mono text-cyan-300 bg-slate-900/80 backdrop-blur-md rounded-md border border-cyan-500/30">
                Featured
              </span>
            )}
          </div>
        </div>

        {/* Content Box */}
        <div className="p-6">
          {/* Clean unboxed metadata with typographic separators */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <span className="text-cyan-400 font-medium">{project.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
            <span aria-hidden="true">·</span>
            <span>Responsive Web</span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors font-display">
            {project.title}
          </h3>

          {/* Tagline / Summary */}
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            {project.summary}
          </p>

          {/* Quantitative Metrics row */}
          <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="bg-slate-900/60 rounded-lg p-2">
                <div className="text-xs font-semibold text-white font-mono tabular-nums">
                  {metric.value}
                </div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider truncate">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Tech tags - unboxed text list */}
          <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400">
            <span className="text-slate-500 font-medium">Stack:</span>
            {project.tags.map((tag, idx) => (
              <span key={tag} className="text-slate-300">
                {tag}{idx < project.tags.length - 1 ? ' ·' : ''}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-6 pt-0 border-t border-slate-800/50 mt-4 flex items-center justify-between">
        <button
          onClick={() => onOpenDetails(project)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/btn py-1"
        >
          <span>Interactive Demo & Details</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </button>

        <div className="flex items-center gap-2">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              title="View Source Code"
              aria-label="View source repository"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.demoUrl && (
            <button
              onClick={() => onOpenDetails(project)}
              className="p-1.5 text-slate-400 hover:text-cyan-400 rounded-lg hover:bg-slate-800 transition-colors"
              title="Open Interactive Preview"
              aria-label="Open Interactive Preview"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
