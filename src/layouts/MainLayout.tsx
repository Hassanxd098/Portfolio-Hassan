import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { DeveloperTerminal } from '../components/DeveloperTerminal';
import { CaseStudyModal } from '../components/CaseStudyModal';
import { WhatsAppModal } from '../components/WhatsAppModal';
import { AiAssistantModal } from '../components/AiAssistantModal';
import { CommandPalette } from '../components/CommandPalette';
import { CustomCursor } from '../components/CustomCursor';
import { IntroAnimation } from '../components/IntroAnimation';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <div className="min-h-screen bg-[#fcfcfc] dark:bg-black text-neutral-900 dark:text-neutral-100 transition-colors duration-300 relative flex flex-col justify-between overflow-x-clip">
      {/* 4-5s GSAP Cinematic Intro Animation */}
      {!introComplete && (
        <IntroAnimation onComplete={() => setIntroComplete(true)} />
      )}

      {/* Custom Magnetic Cursor */}
      <CustomCursor />

      {/* Top Navigation */}
      <Navbar />

      {/* Main Page Content */}
      <div className="flex-1">{children}</div>

      {/* Editorial Footer */}
      <Footer />

      {/* Global Utility Overlays */}
      <DeveloperTerminal />
      <CaseStudyModal />
      <WhatsAppModal />
      <AiAssistantModal />
      <CommandPalette />
    </div>
  );
};
