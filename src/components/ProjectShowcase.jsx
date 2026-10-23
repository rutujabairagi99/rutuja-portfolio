import React, { useState, useMemo } from 'react';
import { ProjectCard } from './ProjectCard';
import { Search, Plus, Filter } from 'lucide-react';

export const ProjectShowcase = ({
  projects,
  onOpenDetails,
  onOpenAddProject
}) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = [
    { id: 'all', label: 'All Projects' },
    { id: 'react', label: 'React Apps' },
    { id: 'api', label: 'API Integrations' },
    { id: 'javascript', label: 'JavaScript & DOM' },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === 'all' || project.category === activeCategory;
      const matchesQuery =
        searchQuery.trim() === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesQuery;
    });
  }, [projects, activeCategory, searchQuery]);

  return (
    <section id="projects" className="py-24 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-cyan-400 mb-2">
              Featured Work
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Projects & Web Applications
            </h2>
            <p className="mt-3 text-slate-400 max-w-xl text-sm sm:text-base">
              A curated collection of responsive web applications, interactive e-commerce modules, and location-based tools built with ReactJS, Axios, and Tailwind CSS.
            </p>
          </div>

          {/* Search bar & Add Project CTA */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by tech..."
                className="w-full bg-slate-900/90 border border-slate-800 focus:border-cyan-400/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            <button
              onClick={onOpenAddProject}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-sm shadow-cyan-500/20 whitespace-nowrap active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>Add Your Project</span>
            </button>
          </div>
        </div>

        {/* Interactive Segmented Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 mb-10 p-1.5 bg-slate-900/80 border border-slate-800 rounded-xl w-fit">
          {filterTabs.map((tab) => {
            const count =
              tab.id === 'all'
                ? projects.length
                : projects.filter((p) => p.category === tab.id).length;
            const isActive = activeCategory === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap shrink-0 flex items-center gap-2 ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <span>{tab.label}</span>
                <span className="text-[11px] opacity-70 font-mono tabular-nums">
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/30 border border-slate-800/80 rounded-2xl">
            <Filter className="w-8 h-8 text-slate-500 mx-auto mb-3" />
            <p className="text-white font-medium">No matching projects found</p>
            <p className="text-xs text-slate-400 mt-1">
              Try adjusting your search query or switching category filters.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="text-xs font-medium text-cyan-400 hover:underline"
              >
                Reset all filters
              </button>
              <button
                onClick={onOpenAddProject}
                className="text-xs font-medium text-white hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Add a new project
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenDetails={onOpenDetails}
                isWide={project.featured && idx === 0 && activeCategory === 'all'}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
