import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Github, Linkedin, Mail, Download, MapPin, CheckCircle2 } from 'lucide-react';
import { TypographicHeadline } from './TypographicHeadline';
import { ScrambleText } from './ScrambleText';
import { AnimatedParagraph } from './AnimatedParagraph';
import { KineticMarquee } from './KineticMarquee';
import { Profile360Card } from './Profile360Card';

export const HeroSection: React.FC = () => {
  const [portfolioConfig, setPortfolioConfig] = useState<{
    name: string;
    title: string;
    headline: string;
    subheadline: string;
    availability: string;
    location: string;
    profileImage: string;
  }>({
    name: 'HASSAN',
    title: 'FULL-STACK DEVELOPER',
    headline: 'I BUILD DIGITAL SYSTEMS & SCALABLE WEB APPLICATIONS.',
    subheadline: 'Architecting high-performance digital products using React, Node.js, Express, Redux Toolkit, and MongoDB.',
    availability: 'Available for contracts & full-time roles',
    location: 'Chennai / Remote',
    profileImage: '/images/profile.png'
  });

  // Load portfolio.json configuration
  useEffect(() => {
    fetch('/data/portfolio.json')
      .then((res) => res.json())
      .then((data) => {
        if (data.profile) {
          setPortfolioConfig({
            name: data.profile.name || 'HASSAN',
            title: data.profile.title || 'FULL-STACK DEVELOPER',
            headline: data.profile.headline || 'I BUILD DIGITAL SYSTEMS & SCALABLE WEB APPLICATIONS.',
            subheadline: data.profile.subheadline || 'Architecting high-performance digital products using React, Node.js, Express, Redux Toolkit, and MongoDB.',
            availability: data.profile.availability || 'Available for contracts & full-time roles',
            location: data.profile.location || 'Chennai / Remote',
            profileImage: data.profile.profileImage || '/images/profile.png'
          });
        }
      })
      .catch(() => {
        // Fallback initialized
      });
  }, []);



  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume/Hassan-Resume.pdf';
    link.download = 'Hassan-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-12 flex flex-col justify-between bg-[#fbfbfb] dark:bg-black text-neutral-900 dark:text-neutral-100 overflow-hidden border-b border-neutral-200 dark:border-neutral-900 transition-colors duration-300">
      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 mono-grid-pattern opacity-40 dark:opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full relative z-10 my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Main Editorial Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Availability Indicator & Location */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-3 mb-8"
            >
              <div className="flex items-center gap-2 px-3.5 py-1.5 border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-950 font-mono text-xs text-neutral-800 dark:text-neutral-300 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-neutral-100 animate-pulse" />
                <span>{portfolioConfig.availability}</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 border border-neutral-200 dark:border-neutral-900 text-xs font-mono text-neutral-600 dark:text-neutral-400">
                <MapPin className="w-3.5 h-3.5" />
                <span>{portfolioConfig.location}</span>
              </div>
            </motion.div>

            {/* Subtitle / Role Tag with Scramble Effect */}
            <div className="mb-4">
              <span className="font-mono text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 tracking-[0.25em] uppercase font-semibold">
                // <ScrambleText text={portfolioConfig.title} />
              </span>
            </div>

            {/* Giant Editorial Masked Headline */}
            <div className="mb-8">
              <TypographicHeadline
                text={"I BUILD\nDIGITAL SYSTEMS."}
                highlightWords={['DIGITAL']}
                highlightClassName="text-neutral-400 dark:text-neutral-500"
                as="h1"
                className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-neutral-950 dark:text-white uppercase leading-[0.95]"
              />
            </div>

            {/* Supporting Summary Statement with Staggered Reveal */}
            <div className="mb-10 border-l-2 border-neutral-300 dark:border-neutral-800 pl-4 max-w-xl">
              <AnimatedParagraph
                text={portfolioConfig.subheadline}
                className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed"
                delay={0.2}
              />
            </div>

            {/* Action Buttons & Resume CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <button
                onClick={() => scrollTo('projects')}
                className="group flex items-center gap-3 px-7 py-4 bg-neutral-950 hover:bg-black text-white dark:bg-neutral-100 dark:hover:bg-white dark:text-black font-mono font-bold text-xs uppercase tracking-widest transition-all duration-300 active:scale-95 shadow-md"
              >
                <span>EXPLORE PROJECTS</span>
                <ArrowDownRight className="w-4 h-4 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300" />
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="px-7 py-4 border border-neutral-300 hover:border-neutral-900 bg-white text-neutral-900 dark:border-neutral-700 dark:hover:border-neutral-300 dark:bg-neutral-950 dark:text-neutral-200 font-mono text-xs uppercase tracking-widest transition-all duration-300 shadow-sm"
              >
                GET IN TOUCH
              </button>

              <button
                onClick={handleDownloadResume}
                className="flex items-center gap-2 px-5 py-4 border border-neutral-200 hover:bg-neutral-100 text-neutral-600 hover:text-black dark:border-neutral-800 dark:hover:bg-neutral-900 dark:text-neutral-400 dark:hover:text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>RESUME</span>
              </button>
            </motion.div>

            {/* Social Links Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex items-center gap-6 pt-6 border-t border-neutral-200 dark:border-neutral-900 w-full"
            >
              <a
                href="https://github.com/hassan-dev"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs font-mono text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GITHUB</span>
              </a>

              <a
                href="https://linkedin.com/in/hassan-dev"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs font-mono text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LINKEDIN</span>
              </a>

              <a
                href="mailto:pmhassanurrahman@gmail.com"
                className="flex items-center gap-2 text-xs font-mono text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>EMAIL</span>
              </a>
            </motion.div>
          </div>

          {/* Right Dedicated Developer Profile Photo Area with 360° View */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <Profile360Card
              imageSrc={portfolioConfig.profileImage}
              name={portfolioConfig.name}
              title={portfolioConfig.title}
            />
          </motion.div>

        </div>
      </div>

      {/* Kinetic Infinite Typography Marquee Banner */}
      <KineticMarquee
        items={[
          'REACT.JS 18',
          'NODE.JS',
          'REDUX TOOLKIT',
          'EXPRESS.JS',
          'MONGODB ATLAS',
          'REST API ARCHITECTURE',
          'FULL-STACK ENGINEERING',
          'TAILWIND CSS',
          'SYSTEM DESIGN',
          'HIGH PERFORMANCE'
        ]}
        speed={30}
      />
    </section>
  );
};
