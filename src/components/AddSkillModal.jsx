import React, { useState } from 'react';
import { X, Plus, Sparkles } from 'lucide-react';

export const AddSkillModal = ({
  isOpen,
  onClose,
  onAddSkill
}) => {
  const [name, setName] = useState('');
  const [level, setLevel] = useState(85);
  const [category, setCategory] = useState('react');
  const [summary, setSummary] = useState('');
  const [toolsInput, setToolsInput] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const tools = toolsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newSkill = {
      id: `skill-${Date.now()}`,
      name: name.trim(),
      level: Number(level) || 80,
      category,
      summary: summary.trim() || 'Practical knowledge and application in projects.',
      tools: tools.length > 0 ? tools : [name.trim()]
    };

    onAddSkill(newSkill);
    onClose();
    // Reset
    setName('');
    setLevel(85);
    setSummary('');
    setToolsInput('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
    >
      <div
        className="relative w-full max-w-lg bg-[#0e1420] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-display">
                Add Technical Skill
              </h2>
              <p className="text-xs text-slate-400">
                Add any technology, library, or tool to your skill matrix.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close add skill modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              Skill / Technology Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Redux Toolkit, Next.js, Sass, TypeScript"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none placeholder-slate-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
              >
                <option value="react">ReactJS & Ecosystem</option>
                <option value="frontend">Languages (JS, HTML, Java)</option>
                <option value="styling">Styling (Tailwind, Bootstrap)</option>
                <option value="tools">Tools, APIs & SQL</option>
                <option value="concepts">Core Concepts & Best Practices</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-slate-300 mb-1.5">
                <span>Confidence Level</span>
                <span className="text-cyan-400">{level}%</span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                value={level}
                onChange={(e) => setLevel(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer mt-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              Short Description / What You Use It For
            </label>
            <input
              type="text"
              placeholder="e.g. Component state management, API data fetching"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none placeholder-slate-600"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              Related Keywords or Tools (Comma Separated)
            </label>
            <input
              type="text"
              placeholder="e.g. Hooks, Context, Props, JSX"
              value={toolsInput}
              onChange={(e) => setToolsInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none placeholder-slate-600"
            />
          </div>

          {/* Submit */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-2.5 px-4 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Skill to Matrix</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
