import React from 'react';
import { Download, ExternalLink, Github, Linkedin, Mail, MessageSquare, ArrowUpRight } from 'lucide-react';
import { TypographicHeadline } from './TypographicHeadline';
import { ScrambleText } from './ScrambleText';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume/Hassan-Resume.pdf';
    link.download = 'Hassan-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenWhatsApp = () => {
    const cleaned = '8754938757';
    const msg = encodeURIComponent('Hi Hassan, I came across your portfolio and would like to discuss a project.');
    window.open(`https://wa.me/91${cleaned}?text=${msg}`, '_blank');
  };

  return (
    <footer className="py-24 bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 border-t border-neutral-200 dark:border-neutral-900 relative select-none transition-colors duration-300">
      {/* Background Texture */}
      <div className="absolute inset-0 mono-grid-pattern opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Giant Final Editorial Statement */}
        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-16 mb-16">
          <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 tracking-[0.3em] uppercase block mb-4">
            // <ScrambleText text="CONCLUSION & COLLABORATION" />
          </span>
          <div className="mb-8">
            <TypographicHeadline
              text={"LET'S BUILD\nSOMETHING\nUSEFUL."}
              highlightWords={['SOMETHING']}
              highlightClassName="text-neutral-400 dark:text-neutral-500"
              className="text-5xl sm:text-7xl lg:text-9xl uppercase tracking-tight text-neutral-950 dark:text-white leading-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="mailto:pmhassanurrahman@gmail.com"
              className="px-8 py-4 bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black font-mono font-bold text-xs uppercase tracking-widest transition-all duration-300 active:scale-95 shadow-sm"
            >
              SEND AN EMAIL
            </a>

            <button
              onClick={handleOpenWhatsApp}
              className="px-8 py-4 border border-neutral-300 hover:border-neutral-950 bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-200 dark:border-neutral-700 dark:hover:border-neutral-300 font-mono text-xs uppercase tracking-widest transition-all duration-300 shadow-sm"
            >
              WHATSAPP CHAT
            </button>

            <button
              onClick={handleDownloadResume}
              className="flex items-center gap-2 px-6 py-4 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-700 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD RESUME PDF</span>
            </button>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-16 border-b border-neutral-200 dark:border-neutral-900 font-mono text-xs">
          <div>
            <span className="text-neutral-500 dark:text-neutral-400 block mb-3 uppercase tracking-widest">DEVELOPER</span>
            <p className="text-neutral-950 dark:text-white font-bold uppercase">HASSAN</p>
            <p className="text-neutral-600 dark:text-neutral-400">FULL-STACK DEVELOPER</p>
          </div>

          <div>
            <span className="text-neutral-500 dark:text-neutral-400 block mb-3 uppercase tracking-widest">STACK</span>
            <p className="text-neutral-600 dark:text-neutral-400">REACT • REDUX TOOLKIT</p>
            <p className="text-neutral-600 dark:text-neutral-400">NODE.JS • EXPRESS • MONGODB</p>
          </div>

          <div>
            <span className="text-neutral-500 dark:text-neutral-400 block mb-3 uppercase tracking-widest">LOCATION</span>
            <p className="text-neutral-600 dark:text-neutral-400">CHENNAI, INDIA</p>
            <p className="text-neutral-600 dark:text-neutral-400">AVAILABLE FOR REMOTE & ON-SITE</p>
          </div>

          <div>
            <span className="text-neutral-500 dark:text-neutral-400 block mb-3 uppercase tracking-widest">SOCIALS</span>
            <div className="flex flex-col gap-2">
              <a
                href="https://github.com/hassan-dev"
                target="_blank"
                rel="noreferrer"
                className="text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white transition-colors flex items-center gap-1"
              >
                <span>GITHUB</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href="https://linkedin.com/in/hassan-dev"
                target="_blank"
                rel="noreferrer"
                className="text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white transition-colors flex items-center gap-1"
              >
                <span>LINKEDIN</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright & Technical Stamp */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
          <p>© {currentYear} HASSAN. ALL RIGHTS RESERVED.</p>
          <p className="uppercase tracking-wider">AWARDS-GRADE MONOCHROME EDITORIAL PORTFOLIO</p>
        </div>

      </div>
    </footer>
  );
};
