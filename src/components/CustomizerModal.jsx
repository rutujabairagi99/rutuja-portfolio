
import React, { useEffect, useState } from 'react';
import {
  X,
  Check,
  Copy,
  Download,
  RefreshCw,
  Sparkles,
  UserRound,
  BriefcaseBusiness,
  FileText,
  MapPin,
  Globe,
  Mail,
  Phone,
  Eye,
  ArrowUpRight,
  Github,
  Linkedin,
  Twitter,
  AlertCircle,
} from 'lucide-react';

const inputClass =
  'w-full rounded-xl border border-white/[0.09] bg-[#080d16] px-3.5 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10';

const labelClass =
  'mb-2 block text-xs font-medium tracking-wide text-slate-300';

const Field = ({
  label,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  multiline = false,
  rows = 3,
  hint,
}) => (
  <div className="min-w-0">
    <label className={labelClass}>
      {label}
    </label>

    {multiline ? (
      <textarea
        rows={rows}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${inputClass} resize-y leading-6`}
      />
    ) : (
      <input
        type={type}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputClass}
      />
    )}

    {hint && (
      <p className="mt-1.5 text-[11px] leading-5 text-slate-500">
        {hint}
      </p>
    )}
  </div>
);

const SectionHeading = ({ icon: Icon, title, description }) => (
  <div className="mb-5 flex items-start gap-3">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.07] text-cyan-300">
      <Icon className="h-4 w-4" />
    </div>

    <div>
      <h3 className="text-sm font-semibold text-white">
        {title}
      </h3>
      <p className="mt-1 text-xs leading-5 text-slate-500">
        {description}
      </p>
    </div>
  </div>
);

export const CustomizerModal = ({
  isOpen,
  onClose,
  profile = {},
  onSaveProfile,
  onResetDefaults,
}) => {
  const [formData, setFormData] = useState(() => ({ ...profile }));
  const [copiedJson, setCopiedJson] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (isOpen) {
      setFormData({ ...profile });
      setSaveSuccess(false);
      setCopiedJson(false);
      setFeedback('');
    }
  }, [isOpen, profile]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setSaveSuccess(false);
    setFeedback('');
  };

  const handleSave = (event) => {
    event.preventDefault();

    try {
      onSaveProfile?.(formData);
      setSaveSuccess(true);
      setFeedback('Your profile changes have been applied.');

      window.setTimeout(() => {
        onClose?.();
      }, 700);
    } catch {
      setSaveSuccess(false);
      setFeedback('Unable to save changes. Please try again.');
    }
  };

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(
        JSON.stringify(formData, null, 2)
      );

      setCopiedJson(true);
      setFeedback('Configuration copied to clipboard.');

      window.setTimeout(() => {
        setCopiedJson(false);
      }, 2000);
    } catch {
      setCopiedJson(false);
      setFeedback(
        'Clipboard access failed. Try exporting the configuration instead.'
      );
    }
  };

  const handleExportJson = () => {
    const safeName = String(formData.name || 'portfolio')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'portfolio';

    const blob = new Blob(
      [JSON.stringify(formData, null, 2)],
      { type: 'application/json' }
    );

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');

    anchor.href = url;
    anchor.download = `portfolio-config-${safeName}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);

    setFeedback('Your configuration file has been exported.');
  };

  const handleReset = () => {
    const confirmed = window.confirm(
      'Reset your profile to its default values? Your current customizations will be replaced.'
    );

    if (!confirmed) return;

    onResetDefaults?.();
    onClose?.();
  };

  const wordmark = formData.wordmark || formData.name || 'Your Name';
  const headline =
    formData.headline || 'Your next big idea starts here.';
  const role = formData.role || 'Your professional title';
  const bio =
    formData.bio || 'Your introduction will appear here as you edit it.';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 p-3 backdrop-blur-md sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose?.();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="customizer-title"
        className="relative my-auto flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0b101a] shadow-2xl shadow-black/50 sm:rounded-3xl"
      >
        {/* Decorative top accent */}
        <div className="h-1 shrink-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />

        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/[0.07] bg-white/[0.015] px-5 py-5 sm:px-7 sm:py-6">
          <div className="flex min-w-0 items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/15 to-blue-500/10 text-cyan-300">
              <Sparkles className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  Portfolio Studio
                </span>
                <span className="rounded-full border border-white/[0.08] px-2 py-0.5 text-[9px] text-slate-500">
                  CUSTOMIZE
                </span>
              </div>

              <h2
                id="customizer-title"
                className="font-display text-lg font-bold tracking-tight text-white sm:text-xl"
              >
                Make it yours.
              </h2>

              <p className="mt-1 hidden text-xs text-slate-400 sm:block">
                Personalize your professional identity and links.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close customizer"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-slate-400 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form and preview */}
        <form
          onSubmit={handleSave}
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[1fr_280px]">
            {/* Main form */}
            <div className="space-y-8 p-5 sm:p-7">
              {/* Identity */}
              <section>
                <SectionHeading
                  icon={UserRound}
                  title="Personal identity"
                  description="How visitors recognize you and understand what you do."
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Full name"
                    value={formData.name}
                    onChange={(value) => handleFieldChange('name', value)}
                    placeholder="Your full name"
                  />

                  <Field
                    label="Brand wordmark"
                    value={formData.wordmark}
                    onChange={(value) => handleFieldChange('wordmark', value)}
                    placeholder="Name shown in navigation"
                    hint="Leave empty to use your full name."
                  />

                  <Field
                    label="Professional title"
                    value={formData.role}
                    onChange={(value) => handleFieldChange('role', value)}
                    placeholder="e.g. Frontend Developer"
                  />

                  <Field
                    label="Experience / status"
                    value={formData.experienceYears}
                    onChange={(value) =>
                      handleFieldChange('experienceYears', value)
                    }
                    placeholder="e.g. React Developer"
                  />
                </div>
              </section>

              <div className="h-px bg-white/[0.06]" />

              {/* Introduction */}
              <section>
                <SectionHeading
                  icon={FileText}
                  title="Your introduction"
                  description="Shape the first impression visitors get from your portfolio."
                />

                <div className="space-y-4">
                  <Field
                    label="Hero headline"
                    value={formData.headline}
                    onChange={(value) => handleFieldChange('headline', value)}
                    placeholder="A short, memorable introduction"
                  />

                  <Field
                    label="About your work"
                    value={formData.bio}
                    onChange={(value) => handleFieldChange('bio', value)}
                    placeholder="Describe your skills, interests, and goals..."
                    multiline
                    rows={4}
                  />

                  <Field
                    label="Availability note"
                    value={formData.status}
                    onChange={(value) => handleFieldChange('status', value)}
                    placeholder="e.g. Open to internships and opportunities"
                  />
                </div>
              </section>

              <div className="h-px bg-white/[0.06]" />

              {/* Contact */}
              <section>
                <SectionHeading
                  icon={BriefcaseBusiness}
                  title="Contact information"
                  description="Help recruiters and collaborators reach you."
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Email address"
                    value={formData.email}
                    onChange={(value) => handleFieldChange('email', value)}
                    placeholder="you@example.com"
                    type="email"
                  />

                  <Field
                    label="Phone number"
                    value={formData.phone}
                    onChange={(value) => handleFieldChange('phone', value)}
                    placeholder="+91 ..."
                    type="tel"
                  />

                  <div className="sm:col-span-2">
                    <Field
                      label="Location"
                      value={formData.location}
                      onChange={(value) => handleFieldChange('location', value)}
                      placeholder="City, Country"
                    />
                  </div>
                </div>
              </section>

              <div className="h-px bg-white/[0.06]" />

              {/* Social links */}
              <section>
                <SectionHeading
                  icon={Globe}
                  title="Social profiles"
                  description="Add links to your work and professional network."
                />

                <div className="space-y-4">
                  <div className="relative">
                    <Github className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                    <input
                      aria-label="GitHub URL"
                      type="url"
                      value={formData.github ?? ''}
                      onChange={(e) =>
                        handleFieldChange('github', e.target.value)
                      }
                      placeholder="https://github.com/username"
                      className={`${inputClass} pl-10`}
                    />
                  </div>

                  <div className="relative">
                    <Linkedin className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                    <input
                      aria-label="LinkedIn URL"
                      type="url"
                      value={formData.linkedin ?? ''}
                      onChange={(e) =>
                        handleFieldChange('linkedin', e.target.value)
                      }
                      placeholder="https://linkedin.com/in/username"
                      className={`${inputClass} pl-10`}
                    />
                  </div>

                  <div className="relative">
                    <Twitter className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                    <input
                      aria-label="Twitter / X URL"
                      type="url"
                      value={formData.twitter ?? ''}
                      onChange={(e) =>
                        handleFieldChange('twitter', e.target.value)
                      }
                      placeholder="https://x.com/username"
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>
              </section>

              {/* Export tools */}
              <section className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 sm:p-5">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-white">
                    Configuration tools
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Copy or export your current profile configuration.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleCopyJson}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/[0.09] bg-[#080d16] px-3.5 py-2.5 text-xs font-medium text-slate-300 transition hover:border-cyan-400/30 hover:text-cyan-300"
                  >
                    {copiedJson ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    {copiedJson ? 'Copied!' : 'Copy JSON'}
                  </button>

                  <button
                    type="button"
                    onClick={handleExportJson}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/[0.09] bg-[#080d16] px-3.5 py-2.5 text-xs font-medium text-slate-300 transition hover:border-cyan-400/30 hover:text-cyan-300"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Export file
                  </button>
                </div>

                {feedback && (
                  <p
                    role="status"
                    className="mt-3 flex items-start gap-2 text-xs leading-5 text-slate-400"
                  >
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-300" />
                    {feedback}
                  </p>
                )}
              </section>
            </div>

            {/* Live preview sidebar */}
            <aside className="border-t border-white/[0.07] bg-[#080d16]/80 p-5 sm:p-7 lg:border-l lg:border-t-0">
              <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                <Eye className="h-4 w-4 text-cyan-300" />
                Live preview
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/[0.09] bg-gradient-to-b from-[#111b2b] to-[#0b101a]">
                <div className="h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />

                <div className="p-5">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 font-display text-lg font-bold text-cyan-300">
                    {String(wordmark).charAt(0).toUpperCase()}
                  </div>

                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
                    Portfolio preview
                  </p>

                  <h3 className="mt-2 break-words font-display text-xl font-bold leading-tight text-white">
                    {wordmark}
                  </h3>

                  <p className="mt-2 text-xs font-medium text-slate-300">
                    {role}
                  </p>

                  <div className="my-4 h-px bg-white/[0.08]" />

                  <p className="break-words text-sm font-semibold leading-6 text-white">
                    {headline}
                  </p>

                  <p className="mt-3 whitespace-pre-wrap break-words text-xs leading-6 text-slate-400">
                    {bio}
                  </p>

                  {formData.status && (
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-2.5 py-1.5 text-[10px] text-emerald-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      {formData.status}
                    </div>
                  )}

                  <div className="mt-5 space-y-2.5 border-t border-white/[0.07] pt-4">
                    {formData.email && (
                      <p className="flex min-w-0 items-center gap-2 text-xs text-slate-400">
                        <Mail className="h-3.5 w-3.5 shrink-0 text-cyan-300" />
                        <span className="break-all">{formData.email}</span>
                      </p>
                    )}

                    {formData.phone && (
                      <p className="flex min-w-0 items-center gap-2 text-xs text-slate-400">
                        <Phone className="h-3.5 w-3.5 shrink-0 text-cyan-300" />
                        <span className="break-all">{formData.phone}</span>
                      </p>
                    )}

                    {formData.location && (
                      <p className="flex items-center gap-2 text-xs text-slate-400">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-cyan-300" />
                        {formData.location}
                      </p>
                    )}
                  </div>

                  {(formData.github || formData.linkedin || formData.twitter) && (
                    <div className="mt-5 flex flex-wrap gap-2 border-t border-white/[0.07] pt-4">
                      {formData.github && (
                        <Github className="h-4 w-4 text-slate-400" />
                      )}
                      {formData.linkedin && (
                        <Linkedin className="h-4 w-4 text-slate-400" />
                      )}
                      {formData.twitter && (
                        <Twitter className="h-4 w-4 text-slate-400" />
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.035] p-4">
                <div className="flex items-start gap-2.5">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                  <p className="text-xs leading-5 text-slate-400">
                    Changes appear in this preview as you type. Save to apply
                    them to your portfolio.
                  </p>
                </div>
              </div>

              <div className="mt-5 hidden items-center gap-2 text-[10px] text-slate-600 lg:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                Personalization Studio
                <ArrowUpRight className="ml-auto h-3 w-3" />
              </div>
            </aside>
          </div>

          {/* Sticky action footer */}
          <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-white/[0.08] bg-[#0b101a] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-500 transition hover:bg-rose-400/[0.06] hover:text-rose-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Reset defaults
            </button>

            <div className="flex gap-2 sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl border border-white/[0.09] px-4 py-2.5 text-xs font-medium text-slate-300 transition hover:bg-white/[0.05] sm:flex-none"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-500/10 transition hover:from-cyan-300 hover:to-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b101a] sm:flex-none"
              >
                {saveSuccess ? (
                  <>
                    <Check className="h-4 w-4" />
                    Changes applied
                  </>
                ) : (
                  <>
                    Apply changes
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};
