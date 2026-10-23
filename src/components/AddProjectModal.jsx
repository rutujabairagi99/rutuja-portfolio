import React, { useState } from 'react';
import { X, Plus, FolderPlus } from 'lucide-react';

export const AddProjectModal = ({
  isOpen,
  onClose,
  onAddProject
}) => {
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState('react');
  const [tagsInput, setTagsInput] = useState('ReactJS, Tailwind CSS, REST API');
  const [demoUrl, setDemoUrl] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [whatILearned, setWhatILearned] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newProject = {
      id: `project-${Date.now()}`,
      title: title.trim(),
      tagline: tagline.trim() || 'A responsive web application project.',
      summary: summary.trim() || tagline.trim() || 'Built with ReactJS and modern web technologies.',
      category,
      categoryLabel:
        category === 'react'
          ? 'React Application'
          : category === 'api'
          ? 'API Integration'
          : category === 'javascript'
          ? 'JavaScript & DOM'
          : 'Responsive Layout',
      year: new Date().getFullYear().toString(),
      featured: false,
      image: '/src/assets/images/project_kumbhmela_ecommerce_1792729957433.jpg',
      demoUrl: demoUrl.trim() || '#',
      repoUrl: repoUrl.trim() || '#',
      tags: tags.length > 0 ? tags : ['ReactJS', 'JavaScript', 'Tailwind CSS'],
      metrics: [
        { label: 'Category', value: category.toUpperCase() },
        { label: 'Status', value: 'Completed' },
        { label: 'UI', value: 'Responsive' }
      ],
      caseStudy: {
        overview: summary.trim() || 'A project built to apply frontend fundamentals and clean UI design.',
        whatILearned: whatILearned.trim() || 'Gained practical experience with React components, state management, and responsive styling.',
        features: [
          'Responsive user interface tested on mobile and desktop',
          'Component-based architecture with clean code structure',
          'Interactive user controls and state updates'
        ],
        liveSimulatorType: 'general'
      }
    };

    onAddProject(newProject);
    onClose();
    // Reset form
    setTitle('');
    setTagline('');
    setSummary('');
    setTagsInput('ReactJS, Tailwind CSS, REST API');
    setDemoUrl('');
    setRepoUrl('');
    setWhatILearned('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
    >
      <div
        className="relative w-full max-w-xl bg-[#0e1420] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <FolderPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-display">
                Add a Project
              </h2>
              <p className="text-xs text-slate-400">
                Showcase your own ReactJS, JavaScript, or API project.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close add project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              Project Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Portfolio, Recipe App, Dashboard"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
                <option value="react">React Application</option>
                <option value="api">API Integration</option>
                <option value="javascript">JavaScript & DOM</option>
                <option value="responsive">Responsive Layout</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                Tech Stack (Comma Separated)
              </label>
              <input
                type="text"
                placeholder="ReactJS, Tailwind CSS, Axios"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none placeholder-slate-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              Brief Tagline
            </label>
            <input
              type="text"
              placeholder="One sentence describing what the project does"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none placeholder-slate-600"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              Project Description / Features
            </label>
            <textarea
              rows={3}
              placeholder="Describe key features you implemented and how it works..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl p-3 text-xs text-white focus:outline-none placeholder-slate-600 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              What I Learned Building This
            </label>
            <input
              type="text"
              placeholder="e.g. Mastered useState hook, learned Axios requests, improved Tailwind CSS"
              value={whatILearned}
              onChange={(e) => setWhatILearned(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none placeholder-slate-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                GitHub Repository URL
              </label>
              <input
                type="text"
                placeholder="https://github.com/rutuja-bairagi/project-name"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none placeholder-slate-600"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                Live Demo URL (Optional)
              </label>
              <input
                type="text"
                placeholder="https://my-demo-app.vercel.app"
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none placeholder-slate-600"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-2.5 px-4 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Project to Portfolio</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
