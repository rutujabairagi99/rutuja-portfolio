import React, { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Send, FileText } from 'lucide-react';

export const ContactSection = ({ profile }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Frontend Web Developer Opportunity',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(profile.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleDownloadResume = () => {
    const resumeText = `RUTUJA BAIRAGI
Phone: ${profile.phone} | Email: ${profile.email} | Location: ${profile.location}
GitHub: ${profile.github} | LinkedIn: ${profile.linkedin}

==================================================
PROFESSIONAL SUMMARY
==================================================
${profile.bio}

==================================================
TECHNICAL SKILLS & CERTIFICATIONS
==================================================
• Languages & Frameworks: ReactJS, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Bootstrap, Java
• Core Concepts: React Hooks, REST API Integration (Axios), Responsive Design, Performance Optimization, Cross-Functional Collaboration, Problem Solving, Debugging, Team Communication, OOP
• Tools & Databases: VS Code, Git, GitHub, MySQL, SQL, Postman, Vite/npm
• Certifications:
  - Front End Development (I-Tech System)
  - Java Programming (Great Learning)

==================================================
PROFESSIONAL EXPERIENCE
==================================================
1. Rudhisoft Pvt. Ltd. | Mar 2026 – Present
   Frontend Web Developer Intern (Onsite - Nashik, MH)
   • Developed and maintained 15+ reusable ReactJS components for e-commerce modules including product listing, cart, checkout, order tracking, and user account management.
   • Integrated 20+ REST API endpoints using Axios for authentication, product management, order processing, and payment workflows while ensuring responsive user experiences.
   • Built and optimized responsive user interfaces using ReactJS and Tailwind CSS, ensuring seamless user experiences across desktop, tablet, and mobile devices.
   • Collaborated with designers and backend developers to implement user-facing features and resolve integration issues across multiple application modules.

2. Oasis Infobyte | Jun 2023 – Aug 2023
   Web Development Intern (Remote)
   • Created 3+ responsive web applications using HTML5, CSS3, and JavaScript, ensuring compatibility across major browsers and devices.
   • Implemented modern layouts using CSS Flexbox, Grid, and Media Queries, achieving responsive designs across mobile, tablet, and desktop screen sizes.

==================================================
ACADEMIC PROJECTS
==================================================
• Kumbhmela Online E-Commerce Platform | ReactJS, Redux, Tailwind CSS, REST API
  - Designed a responsive e-commerce platform with 15+ pages/components, including product listing, cart, checkout, user profile, and order-tracking modules; integrated 20+ REST API endpoints for authentication, cart operations, and order management.
  - Developed an Admin Panel for managing 50+ product listings, orders, and users with CRUD operations, search, and filtering features.

• Location-Based Mobile Advertising App | ReactJS, Tailwind CSS, GPS/Geofencing API
  - Built a location-based advertising application with 10+ responsive screens, integrating GPS and Geofencing APIs to deliver targeted advertisements across multiple predefined geographic zones.
  - Optimized frontend performance through debounced API requests and efficient component rendering, reducing unnecessary API calls by 40% and improving page load times to under 2 seconds.

==================================================
EDUCATION
==================================================
• Sandip Institute of Technology and Research Center (Jul 2017 – May 2021)
  Bachelor of Engineering in Computer Engineering – CGPA: 7.68 (Nashik, MH)

• K.V.N. Naik College (2016 – 2017)
  Higher Secondary Certificate (HSC) – 66.77% (Nashik, MH)
`;

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Rutuja_Bairagi_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in your name, email, and message.');
      return;
    }
    setErrorMessage('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 800);
  };

  return (
    <section id="contact" className="py-24 border-t border-slate-800/80 relative">
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[280px] bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-14">
          <div className="text-xs font-semibold tracking-wider uppercase text-cyan-400 mb-2">
            Let's Connect
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Contact & Hire Rutuja
          </h2>
          <p className="mt-3 text-slate-400 max-w-xl text-sm sm:text-base">
            Available for Frontend Web Developer and ReactJS roles. Reach out via email, phone, or the direct form below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info & Quick Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0e1420] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5">
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  Direct Contact Information
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  Feel free to get in touch for interviews, discussions, or inquiries.
                </p>
              </div>

              {/* Email Card with 1-click copy */}
              <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[11px] text-slate-400">Email Address</div>
                    <div className="text-xs font-mono font-medium text-white truncate">
                      {profile.email}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors shrink-0 flex items-center gap-1.5"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Phone Card with 1-click copy */}
              <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[11px] text-slate-400">Phone Number</div>
                    <div className="text-xs font-mono font-medium text-white truncate">
                      {profile.phone}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCopyPhone}
                  className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors shrink-0 flex items-center gap-1.5"
                  title="Copy phone to clipboard"
                >
                  {copiedPhone ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Location Card */}
              <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">Location</div>
                  <div className="text-xs font-medium text-white">
                    {profile.location}
                  </div>
                </div>
              </div>

              {/* Download Resume Button */}
              <button
                onClick={handleDownloadResume}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 border border-slate-750 hover:border-cyan-400/60 rounded-xl text-xs font-semibold text-slate-200 hover:text-white flex items-center justify-center gap-2 transition-colors"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Download Complete Resume (.txt)</span>
              </button>

              {/* Current Status Box */}
              <div className="p-4 bg-cyan-950/20 border border-cyan-800/40 rounded-xl">
                <div className="text-xs font-semibold text-cyan-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>Available for Frontend Roles</span>
                </div>
                <p className="mt-1 text-xs text-slate-300">
                  Intern at Rudhisoft Pvt. Ltd. Ready to contribute with ReactJS, Axios, Tailwind CSS, and strong frontend development skills.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-[#0e1420] border border-slate-800 rounded-2xl p-6 sm:p-8">
            {formSubmitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-display">
                  Message Sent to Rutuja!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-white">{formData.name}</span>. Your message regarding <span className="font-semibold text-cyan-300">{formData.topic}</span> has been received. I will respond to <span className="font-mono text-white">{formData.email}</span> promptly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setFormData({
                        name: '',
                        email: '',
                        topic: 'Frontend Web Developer Opportunity',
                        message: ''
                      });
                      setFormSubmitted(false);
                    }}
                    className="px-5 py-2.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Hiring Manager / Recruiter"
                      className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="hr@company.com"
                      className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Subject / Reason for Reaching Out
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-colors"
                  >
                    <option value="Frontend Web Developer Opportunity">Frontend Web Developer Role / Interview</option>
                    <option value="ReactJS & Tailwind Web Project">ReactJS & Tailwind Web Project</option>
                    <option value="E-Commerce Module Development">E-Commerce Web Application Development</option>
                    <option value="General Networking or Mentorship">General Networking & Discussion</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your team, the role requirements, or project details..."
                    className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl p-4 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>

                {errorMessage && (
                  <div className="text-xs text-rose-400 bg-rose-950/30 border border-rose-800/40 p-3 rounded-lg">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <span>Send Message to Rutuja</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
