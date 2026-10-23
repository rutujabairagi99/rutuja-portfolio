import React, { useState, useMemo } from "react";
import { ProjectCard } from "./ProjectCard";
import {
  Search,
  Plus,
  Filter,
  ArrowUpRight,
  FolderCode,
  X,
} from "lucide-react";

export const ProjectShowcase = ({
  projects = [],
  onOpenAddProject,
  onDeleteProject,
}) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filterTabs = [
    { id: "all", label: "All Projects" },
    { id: "react", label: "React Apps" },
    { id: "api", label: "API Integrations" },
    { id: "javascript", label: "JavaScript & DOM" },
  ];

  const safeProjects = Array.isArray(projects) ? projects : [];

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return safeProjects.filter((project) => {
      const matchesCategory =
        activeCategory === "all" || project.category === activeCategory;

      const tags = Array.isArray(project.tags) ? project.tags : [];

      const searchableText = [project.title, project.summary, ...tags]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesCategory && (!query || searchableText.includes(query));
    });
  }, [projects, activeCategory, searchQuery]);

  const resetFilters = () => {
    setActiveCategory("all");
    setSearchQuery("");
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative overflow-hidden border-t border-slate-800/80 bg-[#080d17] py-20 text-white sm:py-24 lg:py-28"
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-cyan-500/[0.06] blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/2 h-80 w-80 rounded-full bg-blue-600/[0.06] blur-[110px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section heading */}
        <div className="mb-10 flex flex-col gap-7 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
              <FolderCode className="h-3.5 w-3.5" />
              Featured Work
            </div>

            <h2
              id="projects-heading"
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Projects &amp; Web Applications
              <span aria-hidden="true" className="ml-2 text-cyan-400">
                .
              </span>
            </h2>

            <div
              aria-hidden="true"
              className="mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
            />

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              A collection of responsive web applications, interactive
              experiences, and API-powered tools built with ReactJS, Axios,
              JavaScript, and Tailwind CSS.
            </p>
          </div>

          {/* Search and add project */}
          <div className="flex w-full flex-col gap-3 sm:flex-row xl:w-auto">
            <div className="relative min-w-0 flex-1 sm:min-w-[240px] xl:w-64 xl:flex-none">
              <Search
                aria-hidden="true"
                className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
              />

              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search projects or tech..."
                aria-label="Search projects by title, description, or technology"
                className="h-12 w-full rounded-xl border border-slate-700/80 bg-slate-900/70 pl-11 pr-10 text-sm text-white outline-none transition-all placeholder:text-slate-500 hover:border-slate-600 focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/10"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear project search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={onOpenAddProject}
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/10 transition-all hover:-translate-y-0.5 hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080d17] active:scale-[0.98]"
            >
              <Plus className="h-4 w-4" />
              Add Your Project
            </button>
          </div>
        </div>

        {/* Results summary */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-slate-500 sm:text-sm">
            Showing{" "}
            <span className="font-semibold text-slate-300">
              {filteredProjects.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-300">
              {safeProjects.length}
            </span>{" "}
            projects
          </p>

          {(searchQuery || activeCategory !== "all") && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs font-medium text-cyan-300 transition-colors hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Category filters */}
        <div className="mb-9 overflow-x-auto pb-2">
          <div
            role="group"
            aria-label="Filter projects by category"
            className="flex w-max items-center gap-2 rounded-2xl border border-slate-800/90 bg-slate-900/50 p-1.5"
          >
            {filterTabs.map((tab) => {
              const count =
                tab.id === "all"
                  ? safeProjects.length
                  : safeProjects.filter(
                      (project) => project.category === tab.id,
                    ).length;

              const isActive = activeCategory === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id)}
                  aria-pressed={isActive}
                  className={`inline-flex min-h-10 items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-medium transition-all sm:px-4 sm:text-sm ${
                    isActive
                      ? "border-cyan-400/25 bg-cyan-400/10 text-cyan-300 shadow-sm shadow-cyan-950/20"
                      : "border-transparent text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`rounded-md px-1.5 py-0.5 font-mono text-[10px] tabular-nums ${
                      isActive
                        ? "bg-cyan-400/10 text-cyan-300"
                        : "bg-slate-800 text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project cards */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-7">
            {filteredProjects.map((project, index) => {
              const isFeaturedWide =
                Boolean(project.featured) &&
                index === 0 &&
                activeCategory === "all";

              return (
                <div
                  key={project.id}
                  className={`min-w-0 animate-in fade-in duration-300 ${
                    isFeaturedWide ? "lg:col-span-2" : ""
                  }`}
                >
                  <ProjectCard project={project} isWide={isFeaturedWide} />
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty state */
          <div className="relative overflow-hidden rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 px-5 py-14 text-center sm:px-10 sm:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 h-40 w-64 -translate-x-1/2 rounded-full bg-cyan-500/[0.06] blur-3xl"
            />

            <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800/80">
              <Filter className="h-6 w-6 text-cyan-300" />
            </div>

            <h3 className="relative mt-5 text-lg font-semibold text-white">
              No matching projects
            </h3>

            <p className="relative mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-400">
              We couldn't find projects matching your current search. Try
              another keyword or reset the filters.
            </p>

            <div className="relative mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                Reset filters
              </button>

              <button
                type="button"
                onClick={onOpenAddProject}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                Add a project
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Bottom note */}
        {filteredProjects.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 pt-5">
            <p className="text-xs leading-5 text-slate-500">
              Built with curiosity, creativity, and continuous learning.
            </p>

            <a
              href="#home"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              Back to top
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
