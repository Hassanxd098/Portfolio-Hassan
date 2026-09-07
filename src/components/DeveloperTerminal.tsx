import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Minimize2, Maximize2, CornerDownLeft } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setTerminalOpen } from '../store/slices/uiSlice';
import { DEVELOPER_PROFILE } from '../constants/portfolioData';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'system';
  content: React.ReactNode;
}

export const DeveloperTerminal: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.ui.isTerminalOpen);
  const [inputVal, setInputVal] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: 'welcome_1',
      type: 'system',
      content: (
        <div className="text-sky-400 font-mono text-xs">
          Hassan Developer CLI Terminal v1.0.4 [Production ready]
          <br />
          Type <span className="text-amber-400 font-bold">help</span> to list available commands.
        </div>
      ),
    },
  ]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    // Save history
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const newLines: TerminalLine[] = [
      ...lines,
      {
        id: `input_${Date.now()}`,
        type: 'input',
        content: (
          <div className="flex items-center gap-2 text-slate-300 font-mono text-xs">
            <span className="text-emerald-400 font-bold">hassan@dev-terminal:~$</span>
            <span>{trimmed}</span>
          </div>
        ),
      },
    ];

    let outputNode: React.ReactNode = null;

    switch (trimmed) {
      case 'help':
        outputNode = (
          <div className="text-slate-300 font-mono text-xs space-y-1">
            <p className="text-sky-400 font-bold">Available Commands:</p>
            <p><span className="text-amber-400 w-24 inline-block">whoami</span> - Display developer profile bio</p>
            <p><span className="text-amber-400 w-24 inline-block">stack</span> - Display core technical stack</p>
            <p><span className="text-amber-400 w-24 inline-block">status</span> - Check current engineering status</p>
            <p><span className="text-amber-400 w-24 inline-block">skills</span> - List primary technology categories</p>
            <p><span className="text-amber-400 w-24 inline-block">projects</span> - View featured production projects</p>
            <p><span className="text-amber-400 w-24 inline-block">experience</span> - Show career summary</p>
            <p><span className="text-amber-400 w-24 inline-block">contact</span> - Display email and social handles</p>
            <p><span className="text-amber-400 w-24 inline-block">github</span> - Show GitHub username & repository link</p>
            <p><span className="text-amber-400 w-24 inline-block">clear</span> - Clear terminal buffer</p>
          </div>
        );
        break;

      case 'whoami':
        outputNode = (
          <div className="text-slate-300 font-mono text-xs">
            <p><strong className="text-sky-400">Name:</strong> {DEVELOPER_PROFILE.name}</p>
            <p><strong className="text-sky-400">Title:</strong> {DEVELOPER_PROFILE.title}</p>
            <p><strong className="text-sky-400">Location:</strong> {DEVELOPER_PROFILE.location}</p>
            <p className="mt-1 text-slate-400">{DEVELOPER_PROFILE.tagline}</p>
          </div>
        );
        break;

      case 'stack':
        outputNode = (
          <div className="text-slate-300 font-mono text-xs space-y-1">
            <p className="text-emerald-400 font-bold">Full-Stack Tech Stack:</p>
            <p>• <span className="text-cyan-400">Frontend:</span> React.js, TypeScript, JavaScript, Redux Toolkit, Tailwind CSS, Framer Motion</p>
            <p>• <span className="text-amber-400">Backend:</span> Node.js, Express.js, REST APIs, GraphQL, JWT, Rate Limiting</p>
            <p>• <span className="text-emerald-400">Database:</span> MongoDB, Mongoose, Aggregations, Indexing</p>
            <p>• <span className="text-violet-400">AI & DevOps:</span> Generative AI REST Services, Docker, Git, GitHub Actions</p>
          </div>
        );
        break;

      case 'status':
        outputNode = (
          <div className="text-emerald-400 font-mono text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{DEVELOPER_PROFILE.statusMessage}</span>
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="text-slate-300 font-mono text-xs space-y-1">
            <p className="text-sky-400 font-bold">Featured Projects:</p>
            <p>1. <span className="text-white font-semibold">Missile Health</span> - Healthcare platform (React, Redux, Node, Express, MongoDB)</p>
            <p>2. <span className="text-white font-semibold">AI Healthcare Symptom Checker</span> - AI triage microservice</p>
            <p>3. <span className="text-white font-semibold">DevScale SaaS Analytics</span> - Real-time metrics engine</p>
            <p>4. <span className="text-white font-semibold">Nexus API Gateway</span> - Express JWT security gateway</p>
          </div>
        );
        break;

      case 'skills':
        outputNode = (
          <div className="text-slate-300 font-mono text-xs">
            <p>Frontend (95%), Backend Node.js (94%), MongoDB (92%), Redux Toolkit (94%), REST APIs (96%), AI Integrations (88%).</p>
          </div>
        );
        break;

      case 'experience':
        outputNode = (
          <div className="text-slate-300 font-mono text-xs space-y-1">
            <p>• <strong className="text-sky-400">Senior Full-Stack Engineer</strong> @ Apex Digital Systems (2024 - Present)</p>
            <p>• <strong className="text-sky-400">Full-Stack MERN Developer</strong> @ HealthTech Innovations (2022 - 2024)</p>
            <p>• <strong className="text-sky-400">Frontend Developer</strong> @ CloudScale Solutions (2021 - 2022)</p>
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="text-slate-300 font-mono text-xs">
            <p>Email: <a href={`mailto:${DEVELOPER_PROFILE.email}`} className="text-sky-400 underline">{DEVELOPER_PROFILE.email}</a></p>
            <p>GitHub: <a href={DEVELOPER_PROFILE.githubUrl} target="_blank" rel="noreferrer" className="text-sky-400 underline">{DEVELOPER_PROFILE.githubUrl}</a></p>
            <p>LinkedIn: <a href={DEVELOPER_PROFILE.linkedinUrl} target="_blank" rel="noreferrer" className="text-sky-400 underline">{DEVELOPER_PROFILE.linkedinUrl}</a></p>
          </div>
        );
        break;

      case 'github':
        outputNode = (
          <div className="text-slate-300 font-mono text-xs">
            <p>GitHub Handle: <span className="text-amber-400">hassan-dev</span></p>
            <p>URL: <a href={DEVELOPER_PROFILE.githubUrl} target="_blank" rel="noreferrer" className="text-sky-400 underline">{DEVELOPER_PROFILE.githubUrl}</a></p>
          </div>
        );
        break;

      case 'clear':
        setLines([]);
        setInputVal('');
        return;

      default:
        outputNode = (
          <div className="text-rose-400 font-mono text-xs">
            Command not recognized: <span className="font-bold">{trimmed}</span>. Type <span className="underline cursor-pointer" onClick={() => handleCommand('help')}>help</span> for command list.
          </div>
        );
    }

    newLines.push({
      id: `output_${Date.now()}`,
      type: 'output',
      content: outputNode,
    });

    setLines(newLines);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < history.length) {
          setHistoryIndex(nextIdx);
          setInputVal(history[history.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(setTerminalOpen(false))}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative w-full ${
              isExpanded ? 'max-w-6xl h-[85vh]' : 'max-w-3xl h-[520px]'
            } bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 z-10`}
          >
            {/* Terminal Header */}
            <div className="px-4 py-3 bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-neutral-400 hover:bg-neutral-950 dark:hover:bg-white cursor-pointer" onClick={() => dispatch(setTerminalOpen(false))} />
                <div className="w-3 h-3 rounded-full bg-neutral-300 dark:bg-neutral-700 cursor-pointer" onClick={() => setLines([])} title="Clear terminal" />
                <div className="w-3 h-3 rounded-full bg-neutral-300 dark:bg-neutral-700 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)} title="Expand terminal" />
                <span className="font-mono text-xs text-neutral-600 dark:text-neutral-400 ml-3 flex items-center gap-1 uppercase">
                  <TerminalIcon className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                  hassan@dev-cli:~
                </span>
              </div>

              <div className="flex items-center gap-2 text-neutral-500">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1 hover:text-neutral-950 dark:hover:text-white transition-colors"
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => dispatch(setTerminalOpen(false))}
                  className="p-1 hover:text-neutral-950 dark:hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Terminal Output Area */}
            <div
              ref={scrollRef}
              className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-3 font-mono text-xs bg-neutral-50 dark:bg-black text-neutral-800 dark:text-neutral-200"
            >
              {lines.map((line) => (
                <div key={line.id}>{line.content}</div>
              ))}
            </div>

            {/* Terminal Input Row */}
            <div className="p-3 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 flex items-center gap-2">
              <span className="text-neutral-950 dark:text-white font-mono text-xs font-bold pl-2">hassan@dev-terminal:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type command (e.g. 'help', 'whoami', 'stack', 'projects')..."
                className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-neutral-950 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:ring-0"
              />
              <button
                onClick={() => handleCommand(inputVal)}
                className="p-1.5 bg-neutral-950 text-white dark:bg-white dark:text-black transition-colors"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
