
import React, { useEffect, useState } from 'react';
import {
  X,
  Plus,
  FolderPlus,
  Sparkles,
  Code2,
  FileText,
  Link2,
  Github,
  Eye,
  ArrowUpRight,
  CheckCircle2,
  Layers3,
  Rocket,
} from 'lucide-react';

const DEFAULT_TAGS = 'ReactJS, Tailwind CSS, REST API';

const inputClass =
  'w-full rounded-xl border border-white/[0.09] bg-[#080d16] px-3.5 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10';

const labelClass =
  'mb-2 block text-xs font-medium tracking-wide text-slate-300';

const categories = {
  react: 'React Application',
  api: 'API Integration',
  javascript: 'JavaScript & DOM',
  responsive: 'Responsive Layout',
};

const FormSection = ({ number, icon: Icon, title, subtitle, children }) => (
  <section>
    <div className="mb-4 flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.07] text-cyan-300">
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold tracking-widest text-cyan-400">
            {number}
          </span>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
        </div>
        <p className="mt-1 text-xs leading-5 text-slate-500">{subtitle}</p>
      </div>
    </div>

    <div className="space-y-4">{children}</div>
  </section>
);

const Field = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
  hint,
  multiline = false,
  rows = 3,
}) => (
  <div className="min-w-0">
    <label className={labelClass}>
      {label}
      {required && <span className="ml-1 text-cyan-400">*</span>}
    </label>

    {multiline ? (
      <textarea
        rows={rows}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`${inputClass} resize-y leading-6`}
      />
    ) : (
      <input
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={inputClass}
      />
    )}

    {hint && (
      <p className="mt-1.5 text-[11px] leading-5 text-slate-500">{hint}</p>
    )}
  </div>
);

export const AddProjectModal = ({
  isOpen,
  onClose,
  onAddProject,
}) => {
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState('react');
  const [tagsInput, setTagsInput] = useState(DEFAULT_TAGS);
  const [demoUrl, setDemoUrl] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [whatILearned, setWhatILearned] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const resetForm = () => {
    setTitle('');
    setTagline('');
    setSummary('');
    setCategory('react');
    setTagsInput(DEFAULT_TAGS);
    setDemoUrl('');
    setRepoUrl('');
    setImageUrl('');
    setWhatILearned('');
    setError('');
  };

  const closeModal = () => {
    setError('');
    onClose?.();
  };

  const parseOptionalUrl = (value, label) => {
    const trimmed = value.trim();
    if (!trimmed) return '';

    let parsed;
    try {
      parsed = new URL(trimmed);
    } catch {
      throw new Error(`${label} must be a valid URL starting with https:// or http://.`);
    }

    if (!['https:', 'http:'].includes(parsed.protocol)) {
      throw new Error(`${label} must use http:// or https://.`);
    }

    return parsed.href;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Please enter a project title.');
      return;
    }

    try {
      const validRepoUrl = parseOptionalUrl(repoUrl, 'Repository URL');
      const validDemoUrl = parseOptionalUrl(demoUrl, 'Live demo URL');
      const validImageUrl = parseOptionalUrl(imageUrl, 'Image URL');

      const tags = tagsInput
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);

      const cleanedSummary =
        summary.trim() ||
        tagline.trim() ||
        'A project built with modern web technologies.';

      const cleanedTagline =
        tagline.trim() || 'A responsive web application project.';

      const learned =
        whatILearned.trim() ||
        'Gained practical experience building a project with modern web technologies.';

      const newProject = {
        id: `project-${Date.now()}`,
        title: title.trim(),
        tagline: cleanedTagline,
        summary: cleanedSummary,
        category,
        categoryLabel: categories[category] || 'Web Application',
        year: String(new Date().getFullYear()),
        featured: false,
        ...(validImageUrl ? { image: validImageUrl } : {}),
        demoUrl: validDemoUrl,
        repoUrl: validRepoUrl,
        tags: tags.length
          ? [...new Set(tags)]
          : ['ReactJS', 'JavaScript', 'Tailwind CSS'],
        metrics: [
          { label: 'Category', value: category.toUpperCase() },
          { label: 'Status', value: 'Completed' },
          { label: 'UI', value: 'Responsive' },
        ],
        caseStudy: {
          overview: cleanedSummary,
          whatILearned: learned,
          features: [
            'Responsive user interface for mobile and desktop',
            'Component-based structure and organized code',
            'Interactive elements and user-friendly controls',
          ],
          liveSimulatorType: 'general',
        },
      };

      if (typeof onAddProject !== 'function') {
        setError('Project creation is unavailable. Please try again.');
        return;
      }

      onAddProject(newProject);
      resetForm();
      onClose?.();
    } catch (submissionError) {
      setError(
        submissionError.message ||
          'Could not add the project. Please check your details.'
      );
    }
  };

  const tags = tagsInput
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-3 backdrop-blur-md sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeModal();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-project-title"
        className="relative my-auto flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0b101a] shadow-2xl shadow-black/50 sm:rounded-3xl"
      >
        {/* Accent */}
        <div className="h-1 shrink-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />

        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/[0.07] px-5 py-5 sm:px-7 sm:py-6">
          <div className="flex min-w-0 items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/15 to-blue-500/10 text-cyan-300">
              <FolderPlus className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  Project Studio
                </span>
                <span className="rounded-full border border-white/[0.08] px-2 py-0.5 text-[9px] text-slate-500">
                  NEW PROJECT
                </span>
              </div>

              <h2
                id="add-project-title"
                className="font-display text-lg font-bold tracking-tight text-white sm:text-xl"
              >
                Showcase your work.
              </h2>
              <p className="mt-1 hidden text-xs text-slate-400 sm:block">
                Add a project and share what you have built.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeModal}
            aria-label="Close add project modal"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-slate-400 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form and preview */}
        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[1fr_280px]">
            <div className="space-y-8 p-5 sm:p-7">
              <FormSection
                number="01"
                icon={FileText}
                title="Project essentials"
                subtitle="Give your project a clear identity."
              >
                <Field
                  label="Project title"
                  required
                  value={title}
                  onChange={setTitle}
                  placeholder="e.g. E-commerce Dashboard"
                />

                <Field
                  label="Short tagline"
                  value={tagline}
                  onChange={setTagline}
                  placeholder="One sentence describing your project"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Project category</label>
                    <select
                      value={category}
                      onChange={(event) => setCategory(event.target.value)}
                      className={inputClass}
                    >
                      {Object.entries(categories).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Field
                    label="Technology stack"
                    value={tagsInput}
                    onChange={setTagsInput}
                    placeholder="React, Tailwind, Axios"
                    hint="Separate technologies with commas."
                  />
                </div>

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.slice(0, 12).map((tag, index) => (
                      <span
                        key={`${tag}-${index}`}
                        className="rounded-lg border border-cyan-400/15 bg-cyan-400/[0.06] px-2.5 py-1 text-[10px] text-cyan-200"
                      >
                        {tag}
                      </span>
                    ))}
                    {tags.length > 12 && (
                      <span className="px-1 py-1 text-[10px] text-slate-500">
                        +{tags.length - 12} more
                      </span>
                    )}
                  </div>
                )}
              </FormSection>

              <div className="h-px bg-white/[0.06]" />

              <FormSection
                number="02"
                icon={Code2}
                title="Project story"
                subtitle="Explain what it does and what you learned."
              >
                <Field
                  label="Description and key features"
                  value={summary}
                  onChange={setSummary}
                  placeholder="Describe the problem, your solution, and the features you implemented..."
                  multiline
                  rows={4}
                />

                <Field
                  label="What did you learn?"
                  value={whatILearned}
                  onChange={setWhatILearned}
                  placeholder="e.g. API integration, React state, responsive design..."
                />
              </FormSection>

              <div className="h-px bg-white/[0.06]" />

              <FormSection
                number="03"
                icon={Link2}
                title="Links and preview image"
                subtitle="Help visitors explore the live project and source code."
              >
                <div className="relative">
                  <Github className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                  <input
                    type="url"
                    aria-label="GitHub repository URL"
                    value={repoUrl}
                    onChange={(event) => setRepoUrl(event.target.value)}
                    placeholder="https://github.com/username/project"
                    className={`${inputClass} pl-10`}
                  />
                  <p className="mt-1.5 text-[11px] text-slate-500">
                    Repository URL · Optional
                  </p>
                </div>

                <div>
                  <div className="relative">
                    <Rocket className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                    <input
                      type="url"
                      aria-label="Live demo URL"
                      value={demoUrl}
                      onChange={(event) => setDemoUrl(event.target.value)}
                      placeholder="https://your-project.vercel.app"
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                  <p className="mt-1.5 text-[11px] text-slate-500">
                    Live demo URL · Optional
                  </p>
                </div>

                <Field
                  label="Project image URL"
                  value={imageUrl}
                  onChange={setImageUrl}
                  placeholder="https://example.com/project-preview.png"
                  type="url"
                  hint="Optional. Use a publicly accessible image URL."
                />
              </FormSection>

              {error && (
                <p
                  role="alert"
                  className="rounded-xl border border-rose-400/20 bg-rose-400/[0.06] px-4 py-3 text-xs leading-5 text-rose-300"
                >
                  {error}
                </p>
              )}
            </div>

            {/* Live preview */}
            <aside className="border-t border-white/[0.07] bg-[#080d16]/80 p-5 sm:p-7 lg:border-l lg:border-t-0">
              <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                <Eye className="h-4 w-4 text-cyan-300" />
                Live preview
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0d1420]">
                {imageUrl ? (
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                    <img
                      src={imageUrl}
                      alt=""
                      className="h-full w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1420] to-transparent" />
                  </div>
                ) : (
                  <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-400/[0.12] via-blue-500/[0.06] to-violet-500/[0.12]">
                    <div className="absolute h-28 w-28 rounded-full border border-cyan-300/10" />
                    <div className="absolute h-20 w-20 rounded-full border border-cyan-300/15" />
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-[#0b101a]/80 text-cyan-300">
                      <Layers3 className="h-6 w-6" />
                    </div>
                    <span className="absolute bottom-3 left-3 text-[10px] text-slate-400">
                      Project preview
                    </span>
                  </div>
                )}

                <div className="p-4">
                  <span className="inline-flex rounded-full border border-cyan-400/15 bg-cyan-400/[0.06] px-2.5 py-1 text-[9px] font-medium text-cyan-300">
                    {categories[category]}
                  </span>

                  <h3 className="mt-3 break-words font-display text-lg font-bold leading-snug text-white">
                    {title.trim() || 'Your project title'}
                  </h3>

                  <p className="mt-2 break-words text-xs leading-5 text-slate-400">
                    {tagline.trim() ||
                      'Your project tagline will appear here.'}
                  </p>

                  <p className="mt-3 line-clamp-4 break-words text-xs leading-5 text-slate-500">
                    {summary.trim() ||
                      'Add a description to tell visitors what makes your project special.'}
                  </p>

                  {tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {tags.slice(0, 4).map((tag, index) => (
                        <span
                          key={`${tag}-${index}`}
                          className="rounded-md bg-white/[0.04] px-2 py-1 text-[9px] text-slate-400"
                        >
                          {tag}
                        </span>
                      ))}
                      {tags.length > 4 && (
                        <span className="px-1 py-1 text-[9px] text-slate-500">
                          +{tags.length - 4}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-3">
                    <span className="text-[10px] text-slate-500">
                      {new Date().getFullYear()} · Project
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-cyan-300" />
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.035] p-4">
                <div className="flex items-start gap-2.5">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                  <p className="text-xs leading-5 text-slate-400">
                    Tip: use a clear project screenshot, concise description,
                    and working demo link to make your project stand out.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 text-[10px] text-slate-600">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                Preview updates as you type
              </div>
            </aside>
          </div>

          {/* Action bar */}
          <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-white/[0.08] bg-[#0b101a] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <p className="hidden text-[11px] text-slate-500 sm:block">
              <span className="text-cyan-300">*</span> Required field
            </p>

            <div className="flex gap-2 sm:justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="flex-1 rounded-xl border border-white/[0.09] px-4 py-3 text-xs font-medium text-slate-300 transition hover:bg-white/[0.05] sm:flex-none"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 px-5 py-3 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-500/10 transition hover:from-cyan-300 hover:to-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b101a] sm:flex-none"
              >
                <Plus className="h-4 w-4" />
                Add project
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};
