
import React, { useEffect, useState } from 'react';
import {
  X,
  Plus,
  Sparkles,
  Code2,
  Gauge,
  Layers3,
  Tag,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';

const INITIAL_LEVEL = 85;
const INITIAL_CATEGORY = 'react';

const CATEGORIES = [
  { value: 'react', label: 'React & Ecosystem', short: 'React' },
  { value: 'frontend', label: 'Languages', short: 'Languages' },
  { value: 'styling', label: 'Styling & UI', short: 'Styling' },
  { value: 'tools', label: 'Tools, APIs & SQL', short: 'Tools' },
  { value: 'concepts', label: 'Core Concepts', short: 'Concepts' },
];

const inputClass =
  'w-full rounded-xl border border-slate-700/80 bg-[#080e19] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/80 focus:ring-2 focus:ring-cyan-400/10';

const labelClass =
  'mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-400';

export const AddSkillModal = ({ isOpen, onClose, onAddSkill }) => {
  const [name, setName] = useState('');
  const [level, setLevel] = useState(INITIAL_LEVEL);
  const [category, setCategory] = useState(INITIAL_CATEGORY);
  const [summary, setSummary] = useState('');
  const [toolsInput, setToolsInput] = useState('');

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const selectedCategory =
    CATEGORIES.find((item) => item.value === category) || CATEGORIES[0];

  const keywords = toolsInput
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleanName = name.trim();
    if (!cleanName) return;

    const newSkill = {
      id: `skill-${Date.now()}`,
      name: cleanName,
      level: Number(level) || 80,
      category,
      summary:
        summary.trim() ||
        'Practical knowledge and application in projects.',
      tools: keywords.length > 0 ? keywords : [cleanName],
    };

    onAddSkill(newSkill);

    setName('');
    setLevel(INITIAL_LEVEL);
    setCategory(INITIAL_CATEGORY);
    setSummary('');
    setToolsInput('');
    onClose();
  };

  const getLevelLabel = (value) => {
    if (value >= 90) return 'Advanced';
    if (value >= 75) return 'Proficient';
    if (value >= 60) return 'Intermediate';
    return 'Learning';
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#030712]/85 p-3 backdrop-blur-xl sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-skill-title"
        className="relative my-auto flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0b1120] shadow-[0_30px_120px_-25px_rgba(0,0,0,0.9)] sm:my-6"
      >
        {/* Decorative glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-32 h-72 w-72 rounded-full bg-cyan-400/10 blur-[90px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-24 h-64 w-64 rounded-full bg-blue-500/10 blur-[90px]"
        />

        {/* Header */}
        <header className="relative flex items-center justify-between gap-4 border-b border-white/[0.08] px-5 py-5 sm:px-7">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-gradient-to-br from-cyan-400/20 to-blue-500/10 text-cyan-300 shadow-lg shadow-cyan-950/30">
              <Sparkles size={23} />
            </div>

            <div className="min-w-0">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-400">
                  Portfolio studio
                </span>
                <span className="rounded-full border border-white/10 px-2 py-0.5 text-[9px] text-slate-400">
                  NEW ENTRY
                </span>
              </div>

              <h2
                id="add-skill-title"
                className="text-xl font-bold tracking-tight text-white sm:text-2xl"
              >
                Add a <span className="text-cyan-300">new skill.</span>
              </h2>

              <p className="mt-1 hidden text-xs text-slate-400 sm:block">
                Showcase your toolkit, experience and strengths.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close add skill dialog"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 transition hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-300"
          >
            <X size={19} />
          </button>
        </header>

        {/* Main content */}
        <form
          onSubmit={handleSubmit}
          className="relative grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[1fr_300px]"
        >
          <div className="space-y-7 p-5 sm:p-7">
            {/* Section 01 */}
            <section>
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-400/10 font-mono text-xs font-bold text-cyan-300">
                  01
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Skill details
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500">
                    What technology do you work with?
                  </p>
                </div>
              </div>

              <div>
                <label htmlFor="skill-name" className={labelClass}>
                  Skill name <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <Code2
                    size={17}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    id="skill-name"
                    type="text"
                    required
                    maxLength={60}
                    autoFocus
                    placeholder="e.g. React, TypeScript, Node.js"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="skill-category" className={labelClass}>
                  Choose a category
                </label>
                <div className="relative">
                  <Layers3
                    size={17}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <select
                    id="skill-category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    className={`${inputClass} cursor-pointer appearance-none pl-11 pr-10`}
                  >
                    {CATEGORIES.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  <ArrowUpRight
                    size={15}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-45 text-slate-500"
                  />
                </div>
              </div>
            </section>

            <div className="h-px bg-gradient-to-r from-white/10 via-white/[0.04] to-transparent" />

            {/* Section 02 */}
            <section>
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-400/10 font-mono text-xs font-bold text-blue-300">
                  02
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Your proficiency
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Set your confidence level honestly.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 sm:p-5">
                <div className="mb-4 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-xs text-slate-400">Current level</p>
                    <p className="mt-1 text-lg font-semibold text-white">
                      {getLevelLabel(level)}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-3xl font-bold tracking-tight text-cyan-300">
                      {level}
                    </span>
                    <span className="ml-1 text-sm text-slate-500">%</span>
                  </div>
                </div>

                <input
                  id="skill-level"
                  type="range"
                  min="40"
                  max="100"
                  step="5"
                  value={level}
                  onChange={(event) => setLevel(Number(event.target.value))}
                  aria-label="Skill proficiency percentage"
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-cyan-400"
                  style={{
                    background: `linear-gradient(to right, #22d3ee ${
                      ((level - 40) / 60) * 100
                    }%, #334155 ${((level - 40) / 60) * 100}%)`,
                  }}
                />

                <div className="mt-3 flex justify-between text-[10px] text-slate-500">
                  <span>Learning · 40%</span>
                  <span>Expert · 100%</span>
                </div>
              </div>
            </section>

            <div className="h-px bg-gradient-to-r from-white/10 via-white/[0.04] to-transparent" />

            {/* Section 03 */}
            <section>
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-400/10 font-mono text-xs font-bold text-violet-300">
                  03
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Additional information
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Give visitors more context about your skill.
                  </p>
                </div>
              </div>

              <div>
                <label htmlFor="skill-summary" className={labelClass}>
                  Description
                  <span className="ml-2 normal-case tracking-normal text-slate-600">
                    Optional
                  </span>
                </label>
                <textarea
                  id="skill-summary"
                  rows={3}
                  maxLength={240}
                  placeholder="How do you use this skill in your projects?"
                  value={summary}
                  onChange={(event) => setSummary(event.target.value)}
                  className={`${inputClass} resize-y`}
                />
                <p className="mt-1.5 text-right text-[10px] text-slate-600">
                  {summary.length}/240
                </p>
              </div>

              <div className="mt-4">
                <label htmlFor="skill-tools" className={labelClass}>
                  Keywords & related tools
                  <span className="ml-2 normal-case tracking-normal text-slate-600">
                    Optional
                  </span>
                </label>
                <div className="relative">
                  <Tag
                    size={16}
                    className="pointer-events-none absolute left-4 top-3.5 text-slate-500"
                  />
                  <input
                    id="skill-tools"
                    type="text"
                    maxLength={240}
                    placeholder="Hooks, JSX, Context API"
                    value={toolsInput}
                    onChange={(event) => setToolsInput(event.target.value)}
                    className={`${inputClass} pl-11`}
                  />
                </div>
                <p className="mt-2 text-[10px] text-slate-500">
                  Separate keywords with commas.
                </p>
              </div>
            </section>
          </div>

          {/* Live preview sidebar */}
          <aside className="border-t border-white/[0.08] bg-[#080e19]/70 p-5 sm:p-7 lg:border-l lg:border-t-0">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Live preview
              </span>
              <span className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Updating
              </span>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-cyan-300/20 bg-gradient-to-br from-[#111f32] via-[#0d1728] to-[#0b1120] p-5 shadow-xl shadow-black/20">
              <div
                aria-hidden="true"
                className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-cyan-400/10 blur-3xl"
              />

              <div className="relative flex items-start justify-between gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-300">
                  <Code2 size={23} />
                </div>
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-cyan-300">
                  {selectedCategory.short}
                </span>
              </div>

              <h3 className="relative mt-5 break-words text-xl font-bold text-white">
                {name.trim() || 'Your Skill'}
              </h3>

              <p className="relative mt-2 min-h-[40px] break-words text-xs leading-5 text-slate-400">
                {summary.trim() ||
                  'Your skill description will appear here as you type.'}
              </p>

              <div className="relative mt-6">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 text-[10px] text-slate-400">
                    <Gauge size={13} />
                    Proficiency
                  </span>
                  <span className="text-xs font-bold text-cyan-300">
                    {level}%
                  </span>
                </div>

                <div
                  className="h-1.5 overflow-hidden rounded-full bg-slate-700/80"
                  role="progressbar"
                  aria-valuenow={level}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Skill proficiency preview"
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-200"
                    style={{ width: `${level}%` }}
                  />
                </div>

                <p className="mt-2 text-[10px] text-slate-500">
                  {getLevelLabel(level)}
                </p>
              </div>

              {keywords.length > 0 && (
                <div className="relative mt-5 border-t border-white/[0.08] pt-4">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Related tools
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {keywords.slice(0, 8).map((tool, index) => (
                      <span
                        key={`${tool}-${index}`}
                        className="max-w-full break-words rounded-lg border border-white/[0.08] bg-white/[0.04] px-2 py-1 text-[10px] text-slate-300"
                      >
                        {tool}
                      </span>
                    ))}
                    {keywords.length > 8 && (
                      <span className="rounded-lg px-1.5 py-1 text-[10px] text-slate-500">
                        +{keywords.length - 8}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="relative mt-5 flex items-center gap-2 border-t border-white/[0.08] pt-4 text-[10px] text-slate-500">
                <CheckCircle2 size={13} className="text-cyan-400" />
                Ready for your portfolio
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
              <p className="text-xs font-semibold text-slate-300">
                <Sparkles
                  size={13}
                  className="mr-1.5 inline text-cyan-400"
                />
                Pro tip
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                Add specific tools and real-world examples to help visitors
                understand how you apply this skill.
              </p>
            </div>
          </aside>

          {/* Footer actions */}
          <footer className="sticky bottom-0 col-span-full flex flex-col-reverse gap-3 border-t border-white/[0.08] bg-[#0b1120]/95 px-5 py-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <p className="hidden text-[11px] text-slate-500 sm:block">
              <span className="text-cyan-400">*</span> Required field
            </p>

            <div className="flex flex-col-reverse gap-2 sm:flex-row">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-white/10 px-5 py-3 text-xs font-semibold text-slate-300 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-300 to-blue-400 px-6 py-3 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-950/30 transition hover:-translate-y-0.5 hover:shadow-cyan-500/20 active:translate-y-0"
              >
                <Plus
                  size={16}
                  className="transition-transform group-hover:rotate-90"
                />
                Add skill to matrix
              </button>
            </div>
          </footer>
        </form>
      </div>
    </div>
  );
};
