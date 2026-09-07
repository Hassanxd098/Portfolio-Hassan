import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink, Layers } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { openCaseStudy } from '../store/slices/uiSlice';
import { Project } from '../types';
import { TypographicHeadline } from './TypographicHeadline';
import { ScrambleText } from './ScrambleText';

export const ProjectsSection: React.FC = () => {
  const dispatch = useDispatch();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  useEffect(() => {
    fetch('/data/portfolio.json')
      .then((res) => res.json())
      .then((data) => {
        if (data.projects && Array.isArray(data.projects)) {
          setProjects(data.projects);
        }
      })
      .catch((err) => {
        console.warn('Failed to load portfolio.json projects:', err);
      });
  }, []);

  const categories = ['ALL', 'FULL-STACK', 'AI & BACKEND', 'SAAS PLATFORM'];

  const filteredProjects = selectedCategory === 'ALL'
    ? projects
    : projects.filter(p => p.category?.toUpperCase().includes(selectedCategory) || selectedCategory === 'ALL');

  return (
    <section id="projects" className="py-28 bg-[#fbfbfb] dark:bg-black text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-900 relative transition-colors duration-300">
      {/* Background Texture */}
      <div className="absolute inset-0 mono-grid-pattern opacity-40 dark:opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-200 dark:border-neutral-800 pb-12 mb-16 gap-8">
          <div>
            <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 tracking-[0.3em] uppercase block mb-3">
              // <ScrambleText text="02. SELECTED WORK & CASE STUDIES" />
            </span>
            <TypographicHeadline
              text={"SELECTED\nENGINEERING WORK."}
              highlightWords={['ENGINEERING']}
              highlightClassName="text-neutral-400 dark:text-neutral-500"
              className="text-4xl sm:text-6xl uppercase tracking-tight text-neutral-950 dark:text-white leading-tight"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 border font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-neutral-950 text-white border-neutral-950 dark:bg-neutral-100 dark:text-black dark:border-white font-bold shadow-sm'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-900 hover:text-neutral-950 dark:bg-neutral-950 dark:text-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Project Showcase */}
        <div className="space-y-24">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id || index}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center border-b border-neutral-200 dark:border-neutral-900 pb-20"
              >
                {/* Project Image Column (Desktop Left/Right Alternating) */}
                <div
                  data-cursor="project"
                  onClick={() => dispatch(openCaseStudy(project))}
                  className={`lg:col-span-7 relative overflow-hidden bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 cursor-pointer shadow-sm group-hover:shadow-md transition-shadow ${
                    index % 2 === 1 ? 'lg:order-2' : ''
                  }`}
                >
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale contrast-125 filter group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 transform-gpu"
                    />

                    <div className="absolute inset-0 bg-black/20 dark:bg-black/40 group-hover:bg-transparent transition-colors duration-500" />

                    {/* Number Overlay with Scramble */}
                    <div className="absolute top-4 left-4 font-mono font-bold text-xs text-white bg-black/80 px-3 py-1 border border-neutral-700 backdrop-blur-sm">
                      <ScrambleText text={`0${index + 1} // ${project.year || '2026'}`} />
                    </div>

                    {/* View Label Badge */}
                    <div className="absolute bottom-4 right-4 bg-neutral-950 text-white dark:bg-white dark:text-black font-mono font-bold text-xs uppercase px-4 py-2 flex items-center gap-2 shadow-2xl group-hover:translate-x-0 transition-transform">
                      <span>VIEW CASE STUDY</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Project Metadata Column */}
                <div className={`lg:col-span-5 flex flex-col justify-between ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div>
                    <div className="flex items-center gap-3 font-mono text-xs text-neutral-500 dark:text-neutral-400 mb-3">
                      <span>{project.category}</span>
                      <span>•</span>
                      <span>{project.subtitle}</span>
                    </div>

                    <h3
                      onClick={() => dispatch(openCaseStudy(project))}
                      className="font-display font-black text-3xl sm:text-4xl text-neutral-950 dark:text-white uppercase tracking-tight mb-4 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors cursor-pointer"
                    >
                      {project.title}
                    </h3>

                    <p className="text-sm text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed mb-6 border-l-2 border-neutral-300 dark:border-neutral-800 pl-4">
                      {project.description}
                    </p>

                    {/* Impact Metrics Badge if available */}
                    {project.metrics && (
                      <div className="grid grid-cols-2 gap-3 mb-6 p-3 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 font-mono text-xs shadow-sm">
                        <div>
                          <span className="text-neutral-500 text-[10px] block uppercase">LIGHTHOUSE</span>
                          <span className="text-neutral-900 dark:text-neutral-200 font-bold">{project.metrics.lighthouse || '98/100'}</span>
                        </div>
                        <div>
                          <span className="text-neutral-500 text-[10px] block uppercase">LATENCY / IMPACT</span>
                          <span className="text-neutral-900 dark:text-neutral-200 font-bold">{project.metrics.impact || '<120ms API'}</span>
                        </div>
                      </div>
                    )}

                    {/* Technologies Pills */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-[11px] font-mono text-neutral-800 dark:text-neutral-300 shadow-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links & CTA Footer */}
                  <div className="flex items-center gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-900">
                    <button
                      onClick={() => dispatch(openCaseStudy(project))}
                      className="flex items-center gap-2 text-xs font-mono text-neutral-950 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors uppercase font-bold"
                    >
                      <Layers className="w-4 h-4" />
                      <span>EXPLORE ARCHITECTURE & CHALLENGES</span>
                    </button>

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-900 dark:hover:border-neutral-600 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors"
                        title="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}

                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-900 dark:hover:border-neutral-600 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
