import React from 'react';
import { Modal } from './Modal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { closeCaseStudy } from '../store/slices/uiSlice';
import { ExternalLink, Github, CheckCircle2, ShieldCheck, Zap, Layers, AlertCircle, ArrowRight } from 'lucide-react';

export const CaseStudyModal: React.FC = () => {
  const dispatch = useDispatch();
  const project = useSelector((state: RootState) => state.ui.selectedCaseStudyProject);

  if (!project) return null;

  const defaultArchitecture = [
    'User Client Layer (React.js + Redux Toolkit)',
    'API Gateway (Express.js + Rate Limiter Middleware)',
    'Authentication Layer (JWT + HTTP-Only Cookie)',
    'Service Controllers (Business Logic & Validation)',
    'Database Layer (MongoDB Atlas + Mongoose Aggregations)'
  ];

  const archNodes = project.caseStudy?.architecture?.length
    ? project.caseStudy.architecture
    : defaultArchitecture;

  return (
    <Modal
      isOpen={!!project}
      onClose={() => dispatch(closeCaseStudy())}
      maxWidth="4xl"
      title={`${project.title} — FULL ARCHITECTURE CASE STUDY`}
    >
      <div className="space-y-8 py-2 text-neutral-800 dark:text-neutral-200 font-sans">
        {/* Banner Hero */}
        <div className="relative h-64 border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-950 overflow-hidden">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale contrast-125 filter" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="font-mono text-xs text-neutral-300 uppercase tracking-widest block mb-1">
                {project.category}
              </span>
              <h2 className="font-display font-black text-3xl text-white uppercase tracking-tight">{project.title}</h2>
              <p className="text-xs font-mono text-neutral-300">{project.subtitle}</p>
            </div>

            <div className="flex items-center gap-3">
              {project.githubUrl || project.github ? (
                <a
                  href={project.githubUrl || project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-neutral-900/90 hover:bg-black text-white border border-neutral-700 text-xs font-mono flex items-center gap-2 shadow-sm"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              ) : null}

              {project.liveUrl || project.live ? (
                <a
                  href={project.liveUrl || project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-white text-black font-mono font-bold text-xs flex items-center gap-2 shadow-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </a>
              ) : null}
            </div>
          </div>
        </div>

        {/* Problem vs Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
            <h4 className="text-sm font-mono font-bold text-neutral-950 dark:text-white uppercase tracking-wider flex items-center gap-2 mb-3">
              <AlertCircle className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
              <span>Problem Statement</span>
            </h4>
            <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {project.caseStudy?.problem || project.description}
            </p>
          </div>

          <div className="p-6 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
            <h4 className="text-sm font-mono font-bold text-neutral-950 dark:text-white uppercase tracking-wider flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-neutral-900 dark:text-neutral-200" />
              <span>Engineering Solution</span>
            </h4>
            <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {project.caseStudy?.solution || project.problemSolved || project.description}
            </p>
          </div>
        </div>

        {/* System Architecture Step Breakdown */}
        <div className="p-6 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
          <h4 className="text-sm font-mono font-bold text-neutral-950 dark:text-white uppercase tracking-wider flex items-center gap-2 mb-6">
            <Layers className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
            <span>System Architecture Flow</span>
          </h4>

          <div className="flex flex-col md:flex-row items-center justify-between gap-3 overflow-x-auto py-2">
            {archNodes.map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center w-full md:w-48 text-xs font-mono text-neutral-900 dark:text-neutral-200 shadow-sm">
                  <span className="text-[10px] text-neutral-500 font-bold block mb-1">STAGE 0{idx + 1}</span>
                  <span>{step}</span>
                </div>
                {idx < archNodes.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-neutral-400 dark:text-neutral-500 shrink-0 rotate-90 md:rotate-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Challenges & Performance & Security */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
            <h5 className="text-xs font-mono font-bold text-neutral-950 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
              <span>Challenges</span>
            </h5>
            <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
              {(project.caseStudy?.technicalChallenges || ['Handling high state mutation volume without UI jank.']).map((tc, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-neutral-900 dark:text-white font-bold">•</span>
                  <span>{tc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
            <h5 className="text-xs font-mono font-bold text-neutral-950 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
              <span>Performance</span>
            </h5>
            <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
              {(project.caseStudy?.performance || ['98/100 Lighthouse Score', 'Sub-100ms API Response time']).map((p, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-neutral-900 dark:text-white font-bold">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
            <h5 className="text-xs font-mono font-bold text-neutral-950 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-neutral-700 dark:text-neutral-200" />
              <span>Security</span>
            </h5>
            <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
              {(project.caseStudy?.security || ['Helmet security headers', 'JWT bearer token rotation']).map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-neutral-900 dark:text-white font-bold">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tech Stack List */}
        <div>
          <h5 className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider mb-3">Complete Stack Specification</h5>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map(t => (
              <span key={t} className="px-3 py-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-[11px] font-mono text-neutral-800 dark:text-neutral-300 shadow-sm">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
