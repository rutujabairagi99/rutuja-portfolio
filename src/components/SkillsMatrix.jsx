
import React, { useMemo, useState } from 'react';
import {
  Code2,
  Sparkles,
  Layout,
  Wrench,
  Search,
  Plus,
  Trash2,
  X,
  Layers3,
  CheckCircle2,
} from 'lucide-react';

export const SkillsMatrix = ({
  skills = [],
  onOpenAddSkill,
  onDeleteSkill,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [skillSearch, setSkillSearch] = useState('');

  const categories = [
    { id: 'all', label: 'All Skills', icon: Sparkles },
    { id: 'react', label: 'ReactJS', icon: Code2 },
    { id: 'frontend', label: 'Languages', icon: Code2 },
    { id: 'styling', label: 'Styling', icon: Layout },
    { id: 'tools', label: 'Tools & APIs', icon: Wrench },
    { id: 'concepts', label: 'Core Concepts', icon: Layers3 },
  ];

  const safeSkills = Array.isArray(skills) ? skills : [];

  const filteredSkills = useMemo(() => {
    const query = skillSearch.trim().toLowerCase();

    return safeSkills.filter((skill) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        skill.category === selectedCategory;

      const tools = Array.isArray(skill.tools) ? skill.tools : [];

      const searchableText = [
        skill.name || '',
        skill.summary || '',
        ...tools,
      ]
        .join(' ')
        .toLowerCase();

      return matchesCategory && searchableText.includes(query);
    });
  }, [safeSkills, selectedCategory, skillSearch]);

  const totalSkills = safeSkills.length;
  const categoriesUsed = new Set(
    safeSkills.map((skill) => skill.category).filter(Boolean)
  ).size;

  return (
    <section
      id="skills"
      className="relative overflow-hidden border-t border-slate-800/80 py-20 sm:py-24"
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 h-80 w-80 rounded-full bg-cyan-500/[0.06] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-blue-500/[0.05] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section heading */}
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.07] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
              <Sparkles className="h-3.5 w-3.5" />
              Technical Capabilities
            </div>

            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Skills &amp; Technologies
              <span className="mt-1 block text-cyan-400">
                I Work With.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              Technologies, development tools, and core concepts I use to
              build responsive interfaces and practical web applications.
            </p>
          </div>

          {/* Summary statistics */}
          <div className="flex gap-3 sm:gap-4">
            <div className="min-w-0 flex-1 rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-4 sm:min-w-28 sm:px-5">
              <div className="flex items-center gap-2 text-cyan-400">
                <Code2 className="h-4 w-4" />
                <span className="text-xs text-slate-400">Total skills</span>
              </div>
              <p className="mt-2 text-2xl font-bold tabular-nums text-white">
                {totalSkills}
              </p>
            </div>

            <div className="min-w-0 flex-1 rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-4 sm:min-w-28 sm:px-5">
              <div className="flex items-center gap-2 text-blue-400">
                <Layers3 className="h-4 w-4" />
                <span className="text-xs text-slate-400">Categories</span>
              </div>
              <p className="mt-2 text-2xl font-bold tabular-nums text-white">
                {categoriesUsed}
              </p>
            </div>
          </div>
        </div>

        {/* Search and add skill */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:max-w-sm">
            <Search
              aria-hidden="true"
              className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
            />
            <input
              type="search"
              value={skillSearch}
              onChange={(event) => setSkillSearch(event.target.value)}
              placeholder="Search skills, tools, libraries..."
              aria-label="Search skills"
              className="w-full rounded-xl border border-slate-800 bg-slate-900/80 py-3 pl-10 pr-10 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10"
            />

            {skillSearch && (
              <button
                type="button"
                onClick={() => setSkillSearch('')}
                aria-label="Clear skill search"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onOpenAddSkill}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/10 transition hover:-translate-y-0.5 hover:bg-cyan-300 active:translate-y-0 sm:ml-auto"
          >
            <Plus className="h-4 w-4" />
            Add Skill
          </button>
        </div>

        {/* Category filters */}
        <div className="mb-8 -mx-1 overflow-x-auto px-1 pb-2">
          <div className="flex w-max min-w-full items-center gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  aria-pressed={isActive}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition duration-200 ${
                    isActive
                      ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-300 shadow-sm shadow-cyan-500/5'
                      : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700 hover:bg-slate-800/80 hover:text-slate-200'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results count */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            Showing{' '}
            <span className="font-semibold text-slate-300">
              {filteredSkills.length}
            </span>{' '}
            of {totalSkills} skills
          </p>

          {(selectedCategory !== 'all' || skillSearch) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSkillSearch('');
              }}
              className="text-xs font-medium text-cyan-400 transition hover:text-cyan-300"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Skills grid */}
        {filteredSkills.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSkills.map((skill) => {
              const level = Math.max(
                0,
                Math.min(100, Number(skill.level) || 0)
              );
              const tools = Array.isArray(skill.tools) ? skill.tools : [];

              return (
                <article
                  key={skill.id || skill.name}
                  className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-800/90 bg-[#0e1420]/90 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-cyan-950/20 sm:p-6"
                >
                  {/* Hover accent */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />

                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.07] text-cyan-300 transition group-hover:border-cyan-400/30 group-hover:bg-cyan-400/10">
                      <Code2 className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="break-words font-display text-base font-bold text-white">
                        {skill.name}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        {categories.find(
                          (category) => category.id === skill.category
                        )?.label || 'Technical Skill'}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-lg border border-cyan-400/15 bg-cyan-400/[0.06] px-2 py-1 font-mono text-xs font-semibold tabular-nums text-cyan-300">
                      {level}%
                    </span>
                  </div>

                  {/* Proficiency */}
                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Proficiency</span>
                      <span>{level}%</span>
                    </div>

                    <div
                      className="h-1.5 overflow-hidden rounded-full bg-slate-800"
                      role="progressbar"
                      aria-label={`${skill.name} proficiency`}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={level}
                    >
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-700"
                        style={{ width: `${level}%` }}
                      />
                    </div>
                  </div>

                  <p className="mt-5 min-h-12 text-sm leading-6 text-slate-400">
                    {skill.summary || 'A technology in my development toolkit.'}
                  </p>

                  {/* Keywords */}
                  <div className="mt-5 flex-1 border-t border-slate-800/80 pt-4">
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                      Tools &amp; Keywords
                    </p>

                    {tools.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {tools.map((tool) => (
                          <span
                            key={tool}
                            className="inline-flex max-w-full items-center gap-1.5 break-words rounded-lg border border-slate-800 bg-slate-950/60 px-2.5 py-1.5 text-[11px] text-slate-300 transition group-hover:border-slate-700"
                          >
                            <CheckCircle2 className="h-3 w-3 shrink-0 text-cyan-500/70" />
                            {tool}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500">
                        No keywords added yet.
                      </p>
                    )}
                  </div>

                  {/* Delete control */}
                  {onDeleteSkill && (
                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={() => onDeleteSkill(skill.id)}
                        aria-label={`Remove ${skill.name}`}
                        title={`Remove ${skill.name}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-transparent px-2.5 py-2 text-xs text-slate-500 transition hover:border-rose-400/20 hover:bg-rose-400/[0.06] hover:text-rose-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Remove
                      </button>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 px-5 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 text-slate-500">
              <Search className="h-6 w-6" />
            </div>

            <h3 className="mt-5 text-lg font-bold text-white">
              No skills found
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-400">
              Try another keyword or category, or add a new skill to your portfolio.
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSkillSearch('');
                }}
                className="rounded-xl border border-slate-700 px-4 py-2.5 text-xs font-semibold text-slate-300 transition hover:bg-slate-800"
              >
                Reset filters
              </button>

              <button
                type="button"
                onClick={onOpenAddSkill}
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                <Plus className="h-4 w-4" />
                Add Skill
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
