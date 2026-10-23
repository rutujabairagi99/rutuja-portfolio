import React, { useState } from 'react';
import { Code2, Sparkles, Layout, Wrench, Search, Plus, Trash2 } from 'lucide-react';

export const SkillsMatrix = ({
  skills,
  onOpenAddSkill,
  onDeleteSkill
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [skillSearch, setSkillSearch] = useState('');

  const categories = [
    { id: 'all', label: 'All Skills', icon: Sparkles },
    { id: 'react', label: 'ReactJS', icon: Code2 },
    { id: 'frontend', label: 'Languages (JS, HTML, Java)', icon: Code2 },
    { id: 'styling', label: 'Styling (Tailwind, Bootstrap)', icon: Layout },
    { id: 'tools', label: 'Tools, APIs & SQL', icon: Wrench },
    { id: 'concepts', label: 'Core Concepts', icon: Sparkles }
  ];

  const filteredSkills = skills.filter((skill) => {
    const matchesCat = selectedCategory === 'all' || skill.category === selectedCategory;
    const matchesQuery =
      skillSearch.trim() === '' ||
      skill.name.toLowerCase().includes(skillSearch.toLowerCase()) ||
      skill.summary.toLowerCase().includes(skillSearch.toLowerCase()) ||
      skill.tools.some((t) => t.toLowerCase().includes(skillSearch.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  return (
    <section id="skills" className="py-24 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-cyan-400 mb-2">
              Technical Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Technical Skills & Certifications
            </h2>
            <p className="mt-3 text-slate-400 max-w-xl text-sm sm:text-base">
              Core technologies, concepts, and developer tooling applied in professional internships and projects.
            </p>
          </div>

          {/* Search box & Add Skill CTA */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={skillSearch}
                onChange={(e) => setSkillSearch(e.target.value)}
                placeholder="Search skills & libraries..."
                className="w-full bg-slate-900/90 border border-slate-800 focus:border-cyan-400/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
              />
            </div>

            <button
              onClick={onOpenAddSkill}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-sm shadow-cyan-500/20 whitespace-nowrap active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>Add Skill</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 p-1.5 bg-slate-900/80 border border-slate-800 rounded-xl w-fit">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200 flex items-center gap-2 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id || skill.name}
              className="bg-[#0e1420] border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Header with name and proficiency */}
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-base font-bold text-white font-display">
                    {skill.name}
                  </h3>
                  <span className="text-xs font-mono text-cyan-400 tabular-nums">
                    {skill.level}%
                  </span>
                </div>

                {/* Level progress bar */}
                <div className="mt-3">
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>

                {/* Summary */}
                <p className="mt-4 text-xs text-slate-300 leading-relaxed">
                  {skill.summary}
                </p>
              </div>

              {/* Tools row */}
              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400">
                  <span className="text-slate-500 font-medium">Keywords:</span>
                  {skill.tools.map((tool, idx) => (
                    <span key={tool} className="text-slate-300">
                      {tool}{idx < skill.tools.length - 1 ? ' ·' : ''}
                    </span>
                  ))}
                </div>

                {onDeleteSkill && (
                  <button
                    onClick={() => onDeleteSkill(skill.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-400 transition-opacity"
                    title="Remove skill"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
