
import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  Send,
  FileText,
  Sparkles,
  ArrowUpRight,
  Github,
  Linkedin,
} from "lucide-react";

export const ContactSection = ({ profile = {} }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copyError, setCopyError] = useState("");
  const [emailNotice, setEmailNotice] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "Frontend Web Developer Opportunity",
    message: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleCopy = async (value, setCopied) => {
    if (!value) {
      setCopyError("This contact information is not available.");
      return;
    }

    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard unavailable");
      }

      await navigator.clipboard.writeText(value);
      setCopyError("");
      setCopied(true);

      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyError(
        "Unable to copy automatically. Please select and copy the contact information."
      );
    }
  };

  const handleDownloadResume = () => {
    const resumeText = `RUTUJA BAIRAGI
Phone: ${profile.phone || ""}
Email: ${profile.email || ""}
Location: ${profile.location || ""}
GitHub: ${profile.github || ""}
LinkedIn: ${profile.linkedin || ""}

PROFESSIONAL SUMMARY
${profile.bio || ""}

TECHNICAL SKILLS
Languages & Frameworks: ReactJS, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Bootstrap, Java
Core Concepts: React Hooks, REST API Integration (Axios), Responsive Design, Performance Optimization, Problem Solving, Debugging, OOP
Tools & Databases: VS Code, Git, GitHub, MySQL, SQL, Postman, Vite/npm

CERTIFICATIONS
- Front End Development (I-Tech System)
- Java Programming (Great Learning)

PROFESSIONAL EXPERIENCE

Rudhisoft Pvt. Ltd. | Mar 2026 – Present
Frontend Web Developer Intern (Onsite - Nashik, MH)
- Developed and maintained reusable ReactJS components for e-commerce modules.
- Integrated REST API endpoints using Axios.
- Built responsive interfaces using ReactJS and Tailwind CSS.
- Collaborated with designers and backend developers to implement features and resolve integration issues.

Oasis Infobyte | Jun 2023 – Aug 2023
Web Development Intern (Remote)
- Created responsive web applications using HTML5, CSS3, and JavaScript.
- Used CSS Flexbox, Grid, and media queries for responsive layouts.

ACADEMIC PROJECTS

Kumbhmela Online E-Commerce Platform
Technologies: ReactJS, Redux, Tailwind CSS, REST API
- Developed e-commerce pages and modules including product listing, cart, checkout, profile, and order tracking.
- Built admin functionality for product, order, and user management.

Location-Based Mobile Advertising App
Technologies: ReactJS, Tailwind CSS, GPS/Geofencing API
- Built responsive screens and integrated location-based functionality.
- Improved frontend performance through debounced API requests and efficient rendering.

EDUCATION

Sandip Institute of Technology and Research Center
Bachelor of Engineering in Computer Engineering | CGPA: 7.68 | Jul 2017 – May 2021

K.V.N. Naik College
Higher Secondary Certificate (HSC) | 66.77% | 2016 – 2017
`;

    const blob = new Blob([resumeText], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "Rutuja_Bairagi_Resume.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage("");
    setEmailNotice("");

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !email || !message) {
      setErrorMessage("Please fill in your name, email, and message.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!profile.email) {
      setErrorMessage(
        "The contact email is unavailable. Please check the contact details on this page."
      );
      return;
    }

    const subject = formData.topic;
    const body = [
      `Name: ${name}`,
      `Reply email: ${email}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const mailtoUrl =
      `mailto:${profile.email}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    try {
      window.location.href = mailtoUrl;
      setEmailNotice(
        "Your email application should open with your message prepared. Send it from that application to complete delivery."
      );
    } catch {
      setErrorMessage(
        "Could not open your email application. Please contact me directly using the email address shown here."
      );
    }
  };

  const socialLinks = [
    {
      label: "GitHub",
      url: profile.github,
      icon: Github,
    },
    {
      label: "LinkedIn",
      url: profile.linkedin,
      icon: Linkedin,
    },
  ].filter(
    (item) =>
      typeof item.url === "string" &&
      /^https?:\/\//i.test(item.url) &&
      item.url !== "#"
  );

  const contactItems = [
    {
      label: "Email Address",
      value: profile.email,
      icon: Mail,
      copied: copiedEmail,
      copy: () => handleCopy(profile.email, setCopiedEmail),
      href: profile.email ? `mailto:${profile.email}` : null,
    },
    {
      label: "Phone Number",
      value: profile.phone,
      icon: Phone,
      copied: copiedPhone,
      copy: () => handleCopy(profile.phone, setCopiedPhone),
      href: profile.phone
        ? `tel:${profile.phone.replace(/[^\d+]/g, "")}`
        : null,
    },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-slate-800/80 py-20 sm:py-24"
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-10 h-80 w-80 rounded-full bg-cyan-500/[0.07] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 left-0 h-72 w-72 rounded-full bg-blue-500/[0.05] blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="mb-12 max-w-3xl sm:mb-14">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.07] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
            <Sparkles className="h-3.5 w-3.5" />
            Let's Connect
          </div>

          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Let's Build Something
            <span className="mt-1 block text-cyan-400">
              Great Together.
            </span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Looking for a frontend developer or ReactJS developer? I'd love to
            connect, discuss opportunities, and explore how I can contribute
            to your team.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Left: Contact information */}
          <div className="space-y-5 lg:col-span-5">
            <div className="rounded-2xl border border-slate-800/90 bg-[#0e1420]/90 p-5 sm:p-7">
              <div className="mb-6">
                <h3 className="font-display text-lg font-bold text-white">
                  Contact Information
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-slate-400">
                  Choose your preferred way to reach me.
                </p>
              </div>

              <div className="space-y-3">
                {contactItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/50 p-3.5 transition hover:border-cyan-400/25 sm:p-4"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.07] text-cyan-300">
                        <Icon className="h-4 w-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] text-slate-500">
                          {item.label}
                        </p>

                        {item.href ? (
                          <a
                            href={item.href}
                            className="mt-1 block break-all text-sm font-medium text-slate-200 transition hover:text-cyan-300"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="mt-1 break-words text-sm text-slate-200">
                            {item.value || "Not provided"}
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={item.copy}
                        aria-label={`Copy ${item.label.toLowerCase()}`}
                        title={`Copy ${item.label.toLowerCase()}`}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-2 text-xs text-slate-300 transition hover:border-cyan-400/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
                      >
                        {item.copied ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                            <span className="text-emerald-300">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}

                <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.07] text-cyan-300">
                    <MapPin className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[11px] text-slate-500">Location</p>
                    <p className="mt-1 break-words text-sm font-medium text-slate-200">
                      {profile.location || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>

              {copyError && (
                <p
                  role="status"
                  className="mt-3 text-xs leading-5 text-amber-300"
                >
                  {copyError}
                </p>
              )}

              {/* Social profiles */}
              {socialLinks.length > 0 && (
                <div className="mt-6 border-t border-slate-800 pt-5">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Find me online
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {socialLinks.map((social) => {
                      const Icon = social.icon;

                      return (
                        <a
                          key={social.label}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/70 px-3.5 py-2.5 text-xs font-medium text-slate-300 transition hover:border-cyan-400/30 hover:text-cyan-300"
                        >
                          <Icon className="h-4 w-4" />
                          {social.label}
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Resume download */}
              <button
                type="button"
                onClick={handleDownloadResume}
                className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/40 hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
              >
                <FileText className="h-4 w-4 text-cyan-400" />
                Download Resume (.txt)
                <ArrowUpRight className="ml-auto h-4 w-4 text-slate-500" />
              </button>
            </div>

            {/* Availability card */}
            <div className="rounded-2xl border border-cyan-400/15 bg-gradient-to-br from-cyan-400/[0.08] to-blue-500/[0.04] p-5 sm:p-6">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-30" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
                </span>

                <h3 className="text-sm font-bold text-cyan-200">
                  Frontend Development
                </h3>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                Interested in ReactJS, responsive interfaces, API integration,
                and building user-friendly web applications.
              </p>
            </div>
          </div>

          {/* Right: Contact form */}
          <div className="rounded-2xl border border-slate-800/90 bg-[#0e1420]/95 p-5 sm:p-8 lg:col-span-7">
            <div className="mb-7">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.08] text-cyan-300">
                <Send className="h-5 w-5" />
              </div>

              <h3 className="font-display text-xl font-bold text-white">
                Send a Message
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Fill in the details below. Your email application will open
                with your message ready to send.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              onChange={() => {
                setErrorMessage("");
                setEmailNotice("");
              }}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-xs font-medium text-slate-300"
                  >
                    Your Name <span className="text-cyan-400">*</span>
                  </label>

                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    required
                    maxLength={100}
                    value={formData.name}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        name: event.target.value,
                      })
                    }
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-xs font-medium text-slate-300"
                  >
                    Your Email <span className="text-cyan-400">*</span>
                  </label>

                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    value={formData.email}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        email: event.target.value,
                      })
                    }
                    placeholder="you@company.com"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-topic"
                  className="mb-2 block text-xs font-medium text-slate-300"
                >
                  What would you like to discuss?
                </label>

                <select
                  id="contact-topic"
                  name="topic"
                  value={formData.topic}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      topic: event.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10"
                >
                  <option value="Frontend Web Developer Opportunity">
                    Frontend Web Developer Opportunity
                  </option>
                  <option value="ReactJS Developer Opportunity">
                    ReactJS Developer Opportunity
                  </option>
                  <option value="Website Development Project">
                    Website Development Project
                  </option>
                  <option value="Professional Networking">
                    Professional Networking
                  </option>
                  <option value="Other Inquiry">
                    Other Inquiry
                  </option>
                </select>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="contact-message"
                    className="text-xs font-medium text-slate-300"
                  >
                    Your Message <span className="text-cyan-400">*</span>
                  </label>

                  <span className="text-[10px] tabular-nums text-slate-600">
                    {formData.message.length}/5000
                  </span>
                </div>

                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  maxLength={5000}
                  value={formData.message}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      message: event.target.value,
                    })
                  }
                  placeholder="Tell me about the role, project, or opportunity..."
                  className="w-full resize-y rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10"
                />
              </div>

              {errorMessage && (
                <div
                  role="alert"
                  className="rounded-xl border border-rose-400/20 bg-rose-400/[0.06] p-3.5 text-sm leading-6 text-rose-300"
                >
                  {errorMessage}
                </div>
              )}

              {emailNotice && (
                <div
                  role="status"
                  className="rounded-xl border border-cyan-400/20 bg-cyan-400/[0.06] p-3.5 text-sm leading-6 text-cyan-200"
                >
                  {emailNotice}
                </div>
              )}

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-cyan-400 px-5 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/10 transition hover:-translate-y-0.5 hover:bg-cyan-300 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                Open Email App to Send
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <p className="text-center text-xs leading-5 text-slate-500">
                Your message is prepared in your email application. You must
                send it there to complete delivery.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
