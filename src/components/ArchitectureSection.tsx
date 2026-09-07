import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Layers } from 'lucide-react';
import { TypographicHeadline } from './TypographicHeadline';
import { ScrambleText } from './ScrambleText';
import { AnimatedParagraph } from './AnimatedParagraph';

const ARCHITECTURE_STEPS = [
  {
    id: 'react-ui',
    title: '1. React.js UI Component Layer',
    tech: 'React.js, TypeScript, Tailwind CSS, Framer Motion, GSAP',
    details: 'Accessible WCAG AAA component design, memoized renders, custom hooks, and editorial monochrome design system.',
    breakdown: {
      componentArch: 'Modular functional components with atomic state separation and zero inline gradient clutter.',
      performance: '60 FPS scroll animations and sub-16ms layout calculations.'
    }
  },
  {
    id: 'redux-state',
    title: '2. Redux Toolkit State Management',
    tech: 'Redux Toolkit, RTK Query, Context API',
    details: 'Normalized slices (projects, skills, github, contact, ui), optimistic UI updates, persistent state caching, and automatic cache invalidation.',
    breakdown: {
      stateManagement: 'Centralized Redux store with decoupled slice reducers and RTK Query async data fetching.',
      scalability: 'Prevents prop-drilling while guaranteeing predictable global state updates.'
    }
  },
  {
    id: 'api-layer',
    title: '3. API & Middleware Gateway',
    tech: 'Express REST Router, Helmet, Express Rate Limit',
    details: 'Versioned routes (/api/v1/*), Helmet security suite enforcement, IP rate limiting (100 req / 15 min), and CORS policy control.',
    breakdown: {
      apiArchitecture: 'RESTful verb semantics, query pagination, and strict Zod payload validation.',
      security: 'Protection against CORS abuse, brute-force requests, and XSS injection attacks.'
    }
  },
  {
    id: 'express-service',
    title: '4. Express Controller & Service Layer',
    tech: 'Node.js Controllers, JWT Authentication, Nodemailer & AI',
    details: 'Decoupled service business logic, JWT bearer token verification, mailer SMTP dispatchers, and structured LLM prompt evaluation.',
    breakdown: {
      authentication: 'Stateless JWT session tokens with HTTP-Only cookie storage and RBAC authorization.',
      scalability: 'Modular service handlers allowing plug-and-play integrations with external APIs.'
    }
  },
  {
    id: 'mongodb-db',
    title: '5. MongoDB & Mongoose Database Layer',
    tech: 'MongoDB Atlas, Mongoose ODM, Aggregation Pipelines',
    details: 'Document collection schemas, compound indexing, timestamp audit trails, and resilient memory fallback handlers when database connection is inactive.',
    breakdown: {
      databaseModeling: 'Strict schema validations, index-optimized search queries, and population references.',
      resiliency: 'Graceful fallback to memory mock data ensuring zero downtime if database is offline.'
    }
  }
];

export const ArchitectureSection: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState(ARCHITECTURE_STEPS[0]);

  return (
    <section id="architecture" className="py-28 bg-[#fbfbfb] dark:bg-black text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-900 relative transition-colors duration-300">
      {/* Background Grid */}
      <div className="absolute inset-0 mono-grid-pattern opacity-40 dark:opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-200 dark:border-neutral-800 pb-12 mb-16 gap-8">
          <div>
            <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 tracking-[0.3em] uppercase block mb-3">
              // <ScrambleText text="04. SYSTEM ARCHITECTURE & DEEP DIVE" />
            </span>
            <TypographicHeadline
              text={"SYSTEM\nARCHITECTURE."}
              highlightWords={['ARCHITECTURE.']}
              highlightClassName="text-neutral-400 dark:text-neutral-500"
              className="text-4xl sm:text-6xl uppercase tracking-tight text-neutral-950 dark:text-white leading-tight"
            />
          </div>

          <div className="max-w-md font-mono text-xs text-neutral-600 dark:text-neutral-400 border-l-2 border-neutral-300 dark:border-neutral-800 pl-6">
            <AnimatedParagraph
              text="Demonstrating full-stack engineering depth: how data flows from React UI components through Redux Toolkit, REST API controllers, Express services, and MongoDB database models."
              className="text-neutral-700 dark:text-neutral-300 font-sans text-sm leading-relaxed"
            />
          </div>
        </div>

        {/* Visual Architecture Flowchart Banner */}
        <div className="mb-16 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-850 p-6 sm:p-8 overflow-x-auto shadow-sm">
          <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block mb-4">
            // <ScrambleText text="FULL-STACK DATA FLOW DIAGRAM" />
          </span>

          <div className="flex items-center justify-between min-w-[700px] gap-2 font-mono text-xs text-center">
            <div className="p-4 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-950 dark:text-white w-40 font-bold shadow-sm">
              REACT UI
            </div>
            <span className="text-neutral-400 dark:text-neutral-500 font-bold">→</span>

            <div className="p-4 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-950 dark:text-white w-40 font-bold shadow-sm">
              REDUX TOOLKIT
            </div>
            <span className="text-neutral-400 dark:text-neutral-500 font-bold">→</span>

            <div className="p-4 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-950 dark:text-white w-40 font-bold shadow-sm">
              API LAYER
            </div>
            <span className="text-neutral-400 dark:text-neutral-500 font-bold">→</span>

            <div className="p-4 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-950 dark:text-white w-40 font-bold shadow-sm">
              EXPRESS SERVICE
            </div>
            <span className="text-neutral-400 dark:text-neutral-500 font-bold">→</span>

            <div className="p-4 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-950 dark:text-white w-40 font-bold shadow-sm">
              MONGODB DB
            </div>
          </div>
        </div>

        {/* Interactive Layer Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Layers Selector */}
          <div className="lg:col-span-6 space-y-3">
            {ARCHITECTURE_STEPS.map((step, idx) => {
              const isSelected = selectedStep.id === step.id;
              return (
                <React.Fragment key={step.id}>
                  <div
                    onClick={() => setSelectedStep(step)}
                    className={`p-5 cursor-pointer transition-all border shadow-sm ${
                      isSelected
                        ? 'border-neutral-950 bg-white dark:border-white dark:bg-neutral-900 shadow-md'
                        : 'border-neutral-200 bg-white hover:border-neutral-400 dark:border-neutral-850 dark:bg-neutral-950 dark:hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-bold text-base uppercase text-neutral-950 dark:text-white tracking-tight">
                        {step.title}
                      </h3>
                      <span className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 px-2 py-0.5 uppercase bg-neutral-50 dark:bg-neutral-900">
                        STAGE 0{idx + 1}
                      </span>
                    </div>
                    <p className="font-mono text-xs text-neutral-600 dark:text-neutral-400 mt-1">{step.tech}</p>
                  </div>

                  {idx < ARCHITECTURE_STEPS.length - 1 && (
                    <div className="flex justify-center my-[-4px]">
                      <ArrowDown className="w-4 h-4 text-neutral-400 dark:text-neutral-600" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Right Column: Layer Inspector Details (Sticky in viewport) */}
          <div className="lg:col-span-6 sticky top-28 self-start h-fit z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedStep.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-8 shadow-md"
              >
                <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4 mb-6">
                  <div>
                    <span className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
                      SYSTEM ARCHITECTURE DETAIL
                    </span>
                    <h3 className="font-display font-black text-2xl text-neutral-950 dark:text-white uppercase tracking-tight mt-1">
                      {selectedStep.title}
                    </h3>
                  </div>
                  <Layers className="w-6 h-6 text-neutral-950 dark:text-white" />
                </div>

                <p className="text-sm text-neutral-700 dark:text-neutral-300 font-sans leading-relaxed mb-6 border-l-2 border-neutral-300 dark:border-neutral-800 pl-4">
                  {selectedStep.details}
                </p>

                {/* Detailed Technical Pillars Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-850">
                    <span className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-widest block mb-1">
                      SPECIFICATION
                    </span>
                    <p className="text-xs text-neutral-700 dark:text-neutral-300 font-sans leading-relaxed">
                      {Object.values(selectedStep.breakdown)[0]}
                    </p>
                  </div>

                  <div className="p-4 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-850">
                    <span className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-widest block mb-1">
                      BENEFIT & PERFORMANCE
                    </span>
                    <p className="text-xs text-neutral-700 dark:text-neutral-300 font-sans leading-relaxed">
                      {Object.values(selectedStep.breakdown)[1]}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
