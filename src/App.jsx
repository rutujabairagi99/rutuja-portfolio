import React, { useState } from "react";
import {
  initialProfileData,
  initialProjects,
  initialSkills,
  initialExperiences,
} from "./data/portfolioData.js";

import { Navbar } from "./components/Navbar.jsx";
import { Hero } from "./components/Hero.jsx";
import { ProjectShowcase } from "./components/ProjectShowcase.jsx";
import { SkillsMatrix } from "./components/SkillsMatrix.jsx";
import { ExperienceTimeline } from "./components/ExperienceTimeline.jsx";
import { ContactSection } from "./components/ContactSection.jsx";
import { Footer } from "./components/Footer.jsx";
import { CustomizerModal } from "./components/CustomizerModal.jsx";
import { AddProjectModal } from "./components/AddProjectModal.jsx";
import { AddSkillModal } from "./components/AddSkillModal.jsx";

export default function App() {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem("rutuja_portfolio_profile_v3");
      if (saved) return JSON.parse(saved);
    } catch {
      // Fall back to the default profile.
    }

    return initialProfileData;
  });

  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem("rutuja_portfolio_projects_v3");
      if (saved) return JSON.parse(saved);
    } catch {
      // Fall back to the default projects.
    }

    return initialProjects;
  });

  const [skills, setSkills] = useState(() => {
    try {
      const saved = localStorage.getItem("rutuja_portfolio_skills_v3");
      if (saved) return JSON.parse(saved);
    } catch {
      // Fall back to the default skills.
    }

    return initialSkills;
  });

  const [experiences] = useState(initialExperiences);

  // Modal states
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);

  // Save profile customization
  const handleSaveProfile = (updated) => {
    setProfile(updated);

    try {
      localStorage.setItem(
        "rutuja_portfolio_profile_v3",
        JSON.stringify(updated),
      );
    } catch {
      // Ignore storage errors.
    }
  };

  // Add a project
  const handleAddProject = (newProject) => {
    const updated = [newProject, ...projects];
    setProjects(updated);

    try {
      localStorage.setItem(
        "rutuja_portfolio_projects_v3",
        JSON.stringify(updated),
      );
    } catch {
      // Ignore storage errors.
    }
  };

  // Delete a project
  const handleDeleteProject = (id) => {
    const updated = projects.filter((project) => project.id !== id);
    setProjects(updated);

    try {
      localStorage.setItem(
        "rutuja_portfolio_projects_v3",
        JSON.stringify(updated),
      );
    } catch {
      // Ignore storage errors.
    }
  };

  // Add a skill
  const handleAddSkill = (newSkill) => {
    const updated = [...skills, newSkill];
    setSkills(updated);

    try {
      localStorage.setItem(
        "rutuja_portfolio_skills_v3",
        JSON.stringify(updated),
      );
    } catch {
      // Ignore storage errors.
    }
  };

  // Delete a skill
  const handleDeleteSkill = (id) => {
    const updated = skills.filter((skill) => skill.id !== id);
    setSkills(updated);

    try {
      localStorage.setItem(
        "rutuja_portfolio_skills_v3",
        JSON.stringify(updated),
      );
    } catch {
      // Ignore storage errors.
    }
  };

  // Reset portfolio customization
  const handleResetDefaults = () => {
    setProfile(initialProfileData);
    setProjects(initialProjects);
    setSkills(initialSkills);

    try {
      localStorage.removeItem("rutuja_portfolio_profile_v3");
      localStorage.removeItem("rutuja_portfolio_projects_v3");
      localStorage.removeItem("rutuja_portfolio_skills_v3");
    } catch {
      // Ignore storage errors.
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 selection:bg-cyan-500/25 selection:text-cyan-200 font-sans">
      <Navbar
        profile={profile}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      <main>
        <Hero profile={profile} />

        <ProjectShowcase
          projects={projects}
          onOpenAddProject={() => setIsAddProjectOpen(true)}
          onDeleteProject={handleDeleteProject}
        />

        <SkillsMatrix
          skills={skills}
          onOpenAddSkill={() => setIsAddSkillOpen(true)}
          onDeleteSkill={handleDeleteSkill}
        />

        {/* Interactive Playground removed */}

        <ExperienceTimeline
          experiences={experiences}
          educations={profile.educations}
          certifications={profile.certifications}
        />

        <ContactSection profile={profile} />
      </main>

      <Footer profile={profile} />


      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        profile={profile}
        onSaveProfile={handleSaveProfile}
        onResetDefaults={handleResetDefaults}
      />

      <AddProjectModal
        isOpen={isAddProjectOpen}
        onClose={() => setIsAddProjectOpen(false)}
        onAddProject={handleAddProject}
      />

      <AddSkillModal
        isOpen={isAddSkillOpen}
        onClose={() => setIsAddSkillOpen(false)}
        onAddSkill={handleAddSkill}
      />
    </div>
  );
}
