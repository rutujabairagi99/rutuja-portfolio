
import React from "react";
import {
  ExternalLink,
  Github,
  ArrowRight,
  ArrowUpRight,
  Code2,
  CalendarDays,
  Sparkles,
} from "lucide-react";

export const ProjectCard = ({ project, isWide = false }) => {
  const metrics = Array.isArray(project.metrics) ? project.metrics : [];
  const tags = Array.isArray(project.tags) ? project.tags : [];
  const hasLiveDemo =
    typeof project.demoUrl === "string" &&
    project.demoUrl.trim().length > 0;

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800/90 bg-[#0c1320] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-2xl hover:shadow-black/30 ${
        isWide ? "lg:col-span-2" : "col-span-1"
      }`}
    >
      {/* Subtle card glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-400/[0.04] blur-3xl transition-colors duration-500 group-hover:bg-cyan-400/[0.09]"
      />

      {/* Project image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900 sm:aspect-[16/9]">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title || "Project"} preview`}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            onError={(event) => {
              event.currentTarget.style.opacity = "0";
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950/50">
            <Code2 className="h-14 w-14 text-cyan-400/60" />
          </div>
        )}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0c1320] via-[#0c1320]/15 to-black/10"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-transparent opacity-80"
        />

        {/* Image labels */}
        <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-3 sm:left-5 sm:right-5 sm:top-5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#080d17]/80 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-slate-200 backdrop-blur-md sm:text-xs">
            <Code2 className="h-3.5 w-3.5 text-cyan-300" />
            {project.categoryLabel || "Web Application"}
          </span>

          {project.featured && (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3 py-1.5 text-[10px] font-semibold text-cyan-200 backdrop-blur-md sm:text-xs">
              <Sparkles className="h-3.5 w-3.5" />
              Featured
            </span>
          )}
        </div>

        {project.year && (
          <div className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#080d17]/75 px-3 py-1.5 text-xs font-medium text-slate-200 backdrop-blur-md sm:bottom-5 sm:right-5">
            <CalendarDays className="h-3.5 w-3.5 text-cyan-300" />
            {project.year}
          </div>
        )}
      </div>

      {/* Project content */}
      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-xl font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-cyan-300 sm:text-2xl">
              {project.title}
            </h3>

            {hasLiveDemo && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open live website for ${project.title}`}
                title="Open live website"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-700/80 bg-slate-900/70 text-slate-400 transition-all hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>

          <p className="mt-3 text-sm leading-7 text-slate-400 sm:text-[15px]">
            {project.summary}
          </p>

          {/* Project metrics */}
          {metrics.length > 0 && (
            <div className="mt-6">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Project highlights
                </span>
                <span className="h-px flex-1 bg-slate-800" />
              </div>

              <div
                className={`grid gap-2 ${
                  metrics.length === 1
                    ? "grid-cols-1"
                    : metrics.length === 2
                      ? "grid-cols-2"
                      : "grid-cols-3"
                }`}
              >
                {metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="min-w-0 rounded-xl border border-slate-800/90 bg-slate-900/60 p-3 transition-colors duration-200 hover:border-slate-700 hover:bg-slate-900"
                  >
                    <div className="truncate font-mono text-sm font-bold tabular-nums text-slate-100 sm:text-base">
                      {metric.value}
                    </div>
                    <div className="mt-1 truncate text-[10px] font-medium uppercase tracking-wider text-slate-500 sm:text-[11px]">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technology tags */}
          {tags.length > 0 && (
            <div className="mt-6">
              <div className="mb-3 flex items-center gap-2">
                <Code2 className="h-3.5 w-3.5 text-cyan-400" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Built with
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-slate-700/80 bg-slate-900/70 px-2.5 py-1.5 text-[11px] font-medium text-slate-300 transition-colors hover:border-cyan-400/30 hover:text-cyan-200 sm:text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/90 pt-5">
          {hasLiveDemo ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/details inline-flex min-h-10 items-center gap-2 rounded-lg text-sm font-semibold text-cyan-300 transition-colors hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              View Project
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/details:translate-x-1" />
            </a>
          ) : (
            <span className="inline-flex min-h-10 items-center text-sm text-slate-500">
              Live demo unavailable
            </span>
          )}

          <div className="flex items-center gap-2">
            {project.repoUrl && project.repoUrl !== "#" && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700/80 bg-slate-900/70 text-slate-400 transition-all hover:border-slate-500 hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                title="View source code"
                aria-label={`View source code for ${project.title}`}
              >
                <Github className="h-4 w-4" />
              </a>
            )}

            {hasLiveDemo && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700/80 bg-slate-900/70 text-slate-400 transition-all hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                title="Open live website"
                aria-label={`Open live website for ${project.title}`}
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
