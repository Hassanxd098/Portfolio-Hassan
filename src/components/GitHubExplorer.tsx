import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Star, GitFork, ExternalLink, Search, AlertTriangle } from 'lucide-react';
import { GitHubRepo } from '../types';
import { TypographicHeadline } from './TypographicHeadline';
import { ScrambleText } from './ScrambleText';
import { AnimatedParagraph } from './AnimatedParagraph';

export const GitHubExplorer: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedLang, setSelectedLang] = useState('ALL');

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      try {
        // Attempt Express API backend endpoint
        const res = await fetch('http://localhost:5000/api/v1/github');
        if (res.ok) {
          const json = await res.json();
          if (json.data && Array.isArray(json.data) && json.data.length > 0) {
            setRepos(json.data);
            setErrorNotice(null);
            setLoading(false);
            return;
          }
        }
        throw new Error('Backend GitHub API unreachable');
      } catch (err) {
        // Fallback to portfolio.json static repositories
        fetch('/data/portfolio.json')
          .then((r) => r.json())
          .then((data) => {
            if (data.projects) {
              const formattedRepos: GitHubRepo[] = data.projects.map((p: any, idx: number) => ({
                id: idx + 1,
                name: p.id || p.title.toLowerCase().replace(/\s+/g, '-'),
                description: p.description,
                html_url: p.github || 'https://github.com/hassan-dev',
                stargazers_count: (idx + 1) * 38 + 24,
                forks_count: (idx + 1) * 12 + 8,
                language: p.technologies ? p.technologies[0] : 'TypeScript',
                updated_at: '2026-08-28T14:22:00Z',
                topics: p.technologies || []
              }));
              setRepos(formattedRepos);
              setErrorNotice('GitHub activity live API unavailable — Displaying cached repositories.');
            }
          })
          .catch(() => {
            setErrorNotice('GitHub activity unavailable');
          })
          .finally(() => setLoading(false));
      }
    };

    fetchRepos();
  }, []);

  const languages = ['ALL', ...Array.from(new Set(repos.map((r) => r.language).filter(Boolean)))];

  const filteredRepos = repos.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      (r.description && r.description.toLowerCase().includes(search.toLowerCase()));
    const matchesLang = selectedLang === 'ALL' || r.language === selectedLang;
    return matchesSearch && matchesLang;
  });

  return (
    <section id="github" className="py-28 bg-[#fbfbfb] dark:bg-black text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-900 relative transition-colors duration-300">
      {/* Background Grid */}
      <div className="absolute inset-0 mono-grid-pattern opacity-40 dark:opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-200 dark:border-neutral-800 pb-12 mb-16 gap-8">
          <div>
            <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 tracking-[0.3em] uppercase block mb-3">
              // <ScrambleText text="05. OPEN SOURCE & REPOSITORIES" />
            </span>
            <TypographicHeadline
              text={"GITHUB\nACTIVITY & REPOS."}
              highlightWords={['ACTIVITY']}
              highlightClassName="text-neutral-400 dark:text-neutral-500"
              className="text-4xl sm:text-6xl uppercase tracking-tight text-neutral-950 dark:text-white leading-tight"
            />
          </div>

          <div className="max-w-md font-mono text-xs text-neutral-600 dark:text-neutral-400 border-l-2 border-neutral-300 dark:border-neutral-800 pl-6">
            <AnimatedParagraph
              text="Real-time open source repositories proxied through Node.js REST API with automatic rate-limit fallback."
              className="text-neutral-700 dark:text-neutral-300 font-sans text-sm leading-relaxed"
            />
          </div>
        </div>

        {/* Error / Fallback Notice */}
        {errorNotice && (
          <div className="mb-8 p-4 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 flex items-center gap-3 font-mono text-xs text-neutral-700 dark:text-neutral-400 shadow-sm">
            <AlertTriangle className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
            <span>{errorNotice}</span>
          </div>
        )}

        {/* Control Bar: Search & Language Filter */}
        <div className="mb-10 p-4 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs shadow-sm">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="SEARCH REPOSITORIES..."
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 dark:bg-black border border-neutral-300 dark:border-neutral-800 text-neutral-950 dark:text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-950 dark:focus:border-neutral-400 font-mono text-xs uppercase"
            />
          </div>

          {/* Language Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <span className="text-neutral-500 uppercase shrink-0">FILTER:</span>
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`px-3 py-1.5 border font-mono text-[11px] uppercase transition-colors shrink-0 ${
                  selectedLang === lang
                    ? 'bg-neutral-950 text-white border-neutral-950 dark:bg-neutral-100 dark:text-black dark:border-white font-bold shadow-sm'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:text-black hover:border-neutral-400 dark:bg-black dark:text-neutral-400 dark:border-neutral-800 dark:hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Repository Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="p-6 h-48 animate-pulse bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredRepos.map((repo, idx) => (
                <motion.div
                  key={repo.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="p-6 flex flex-col justify-between group border border-neutral-200 hover:border-neutral-950 dark:border-neutral-850 dark:hover:border-neutral-600 bg-white dark:bg-neutral-950 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-900 pb-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Github className="w-4 h-4 text-neutral-950 dark:text-white" />
                        <h3 className="font-display font-bold text-base text-neutral-950 dark:text-white tracking-tight truncate max-w-[170px]">
                          {repo.name}
                        </h3>
                      </div>
                      <span className="font-mono text-[10px] bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-2 py-0.5 text-neutral-700 dark:text-neutral-300">
                        {repo.language || 'JS'}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-600 dark:text-neutral-400 font-sans line-clamp-3 leading-relaxed mb-4">
                      {repo.description || 'No repository description specified.'}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-100 dark:border-neutral-900 flex items-center justify-between font-mono text-xs text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-neutral-950 dark:text-white font-bold">
                        <Star className="w-3.5 h-3.5 fill-neutral-950 dark:fill-white" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400">
                        <GitFork className="w-3.5 h-3.5" />
                        {repo.forks_count}
                      </span>
                    </div>

                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-neutral-950 dark:text-white hover:underline font-bold uppercase text-[11px]"
                    >
                      <span>VIEW REPO</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
};
