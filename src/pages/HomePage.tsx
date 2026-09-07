import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { SkillsEcosystem } from '../components/SkillsEcosystem';
import { ProjectsSection } from '../components/ProjectsSection';
import { ExperienceTimeline } from '../components/ExperienceTimeline';
import { ArchitectureSection } from '../components/ArchitectureSection';
import { GitHubExplorer } from '../components/GitHubExplorer';
import { ContactSection } from '../components/ContactSection';
import { useActiveSection } from '../hooks/useActiveSection';

export const HomePage: React.FC = () => {
  useActiveSection([
    'home',
    'about',
    'skills',
    'projects',
    'experience',
    'architecture',
    'github',
    'contact',
  ]);

  return (
    <main className="relative">
      <HeroSection />
      <AboutSection />
      <SkillsEcosystem />
      <ProjectsSection />
      <ExperienceTimeline />
      <ArchitectureSection />
      <GitHubExplorer />
      <ContactSection />
    </main>
  );
};
