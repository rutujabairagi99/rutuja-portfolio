import React, { useState } from 'react';
import {
  initialProfileData,
  initialProjects,
  initialSkills,
  initialExperiences
} from './data/portfolioData.js';
import { Navbar } from './components/Navbar.jsx';
import { Hero } from './components/Hero.jsx';
import { ProjectShowcase } from './components/ProjectShowcase.jsx';
import { SkillsMatrix } from './components/SkillsMatrix.jsx';
import { InteractivePlayground } from './components/InteractivePlayground.jsx';
import { ExperienceTimeline } from './components/ExperienceTimeline.jsx';
import { ContactSection } from './components/ContactSection.jsx';
import { Footer } from './components/Footer.jsx';
import { ProjectDetailModal } from './components/ProjectDetailModal.jsx';
import { CustomizerModal } from './components/CustomizerModal.jsx';
import { AddProjectModal } from './components/AddProjectModal.jsx';
import { AddSkillModal } from './components/AddSkillModal.jsx';

export default function App() {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('rutuja_portfolio_profile_v3');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return initialProfileData;
  });

  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('rutuja_portfolio_projects_v3');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return initialProjects;
  });

  const [skills, setSkills] = useState(() => {
    try {
      const saved = localStorage.getItem('rutuja_portfolio_skills_v3');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return initialSkills;
  });

  const [experiences] = useState(initialExperiences);

  // Modal states
  const [activeProject, setActiveProject] = useState(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);

  // Profile handlers
  const handleSaveProfile = (updated) => {
    setProfile(updated);
    try {
      localStorage.setItem('rutuja_portfolio_profile_v3', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Project handlers
  const handleAddProject = (newProject) => {
    const updated = [newProject, ...projects];
    setProjects(updated);
    try {
      localStorage.setItem('rutuja_portfolio_projects_v3', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleDeleteProject = (id) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    try {
      localStorage.setItem('rutuja_portfolio_projects_v3', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Skill handlers
  const handleAddSkill = (newSkill) => {
    const updated = [...skills, newSkill];
    setSkills(updated);
    try {
      localStorage.setItem('rutuja_portfolio_skills_v3', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleDeleteSkill = (id) => {
    const updated = skills.filter((s) => s.id !== id);
    setSkills(updated);
    try {
      localStorage.setItem('rutuja_portfolio_skills_v3', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleResetDefaults = () => {
    setProfile(initialProfileData);
    setProjects(initialProjects);
    setSkills(initialSkills);
    try {
      localStorage.removeItem('rutuja_portfolio_profile_v3');
      localStorage.removeItem('rutuja_portfolio_projects_v3');
      localStorage.removeItem('rutuja_portfolio_skills_v3');
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 selection:bg-cyan-500/25 selection:text-cyan-200 font-sans">
      {/* Top Bar Navigation */}
      <Navbar
        profile={profile}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      {/* Main Sections */}
      <main>
        <Hero profile={profile} />

        <ProjectShowcase
          projects={projects}
          onOpenDetails={(p) => setActiveProject(p)}
          onOpenAddProject={() => setIsAddProjectOpen(true)}
          onDeleteProject={handleDeleteProject}
        />

        <SkillsMatrix
          skills={skills}
          onOpenAddSkill={() => setIsAddSkillOpen(true)}
          onDeleteSkill={handleDeleteSkill}
        />

        <InteractivePlayground profile={profile} />

        <ExperienceTimeline
          experiences={experiences}
          educations={profile.educations}
          certifications={profile.certifications}
        />

        <ContactSection profile={profile} />
      </main>

      {/* Footer */}
      <Footer profile={profile} />

      {/* Interactive Project Viewer Modal */}
      <ProjectDetailModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />

      {/* Profile Details Customizer Modal */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        profile={profile}
        onSaveProfile={handleSaveProfile}
        onResetDefaults={handleResetDefaults}
      />

      {/* Add New Project Modal */}
      <AddProjectModal
        isOpen={isAddProjectOpen}
        onClose={() => setIsAddProjectOpen(false)}
        onAddProject={handleAddProject}
      />

      {/* Add New Skill Modal */}
      <AddSkillModal
        isOpen={isAddSkillOpen}
        onClose={() => setIsAddSkillOpen(false)}
        onAddSkill={handleAddSkill}
      />
    </div>
  );
}
