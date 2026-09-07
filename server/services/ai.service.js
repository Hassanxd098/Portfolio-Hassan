import { logger } from '../utils/logger.js';

const knowledgeBase = [
  {
    keywords: ['skill', 'technology', 'stack', 'react', 'node', 'express', 'mongo', 'redux'],
    answer: "Hassan specializes in the MERN stack (React.js, Node.js, Express.js, MongoDB) along with Redux Toolkit, JavaScript/TypeScript, REST APIs, and AI Applications. He focuses on modular architecture, clean code standards, and responsive UI components."
  },
  {
    keywords: ['missile health', 'missile', 'health', 'healthcare', 'patient', 'doctor'],
    answer: "Missile Health is a comprehensive healthcare management platform architected by Hassan. It handles authentication, patient records, doctor availability, appointment scheduling, prescription tracking, and integrated AI symptom triaging built with React, Redux Toolkit, Node.js, Express, and MongoDB."
  },
  {
    keywords: ['ai', 'symptom', 'checker', 'assistant', 'machine learning', 'llm'],
    answer: "Hassan builds AI-powered web applications such as the AI Healthcare Symptom Checker microservice. It uses structured prompt orchestration, multi-stage confidence scoring, and strict HIPAA-conscious data handling guidelines."
  },
  {
    keywords: ['experience', 'work', 'job', 'career', 'colan', 'aspirasys', 'years'],
    answer: "Hassan has 1.3 years of full-stack engineering experience. He worked at Aspirasys as a Full-Stack Developer for 7 months (Nov 2024 - June 2025). He joined Colan Infotech as a Full-Stack Developer Intern in July 2025 and earned a Full-Time Developer position in November 2025, where he currently architects MERN stack applications!"
  },
  {
    keywords: ['contact', 'email', 'hire', 'whatsapp', 'github', 'linkedin', 'reach'],
    answer: "You can reach out to Hassan via the Contact Form on this site, directly via email at pmhassanurrahman@gmail.com, or initiate a direct chat via WhatsApp (8754938757). He is currently open for full-stack engineering opportunities!"
  },
  {
    keywords: ['architecture', 'security', 'performance', 'build', 'clean code'],
    answer: "Hassan follows clean code architecture: strict separation of UI components, centralized Redux state, service layer API design, Zod request validation, Helmet security headers, JWT authentication, and MongoDB indexing."
  }
];

export const processAiQuery = async (query) => {
  if (!query || typeof query !== 'string') {
    return {
      answer: "Hello! I am Hassan's AI Assistant. Ask me anything about his experience at Colan Infotech & Aspirasys, Missile Health project, architectural practices, or how to contact him.",
      suggestedQuestions: [
        "Tell me about Hassan's experience at Colan Infotech.",
        "What technologies does Hassan use?",
        "Tell me about Missile Health.",
        "How can I contact or hire Hassan?"
      ]
    };
  }

  const lowerQuery = query.toLowerCase();
  
  for (const item of knowledgeBase) {
    if (item.keywords.some(kw => lowerQuery.includes(kw))) {
      return {
        answer: item.answer,
        suggestedQuestions: [
          "Tell me about Missile Health.",
          "What is Hassan's career timeline at Colan Infotech?",
          "How can I reach Hassan directly?"
        ]
      };
    }
  }

  return {
    answer: `Thank you for asking! Hassan is a Full-Stack Developer at Colan Infotech (1.3 years total experience including Aspirasys and Colan). Regarding "${query}", Hassan applies scalable MERN stack engineering practices to deliver production-grade systems. Feel free to explore his projects or reach out via the contact form!`,
    suggestedQuestions: [
      "What technologies does Hassan specialize in?",
      "Tell me about Hassan's experience at Colan Infotech.",
      "How can I get in touch with Hassan?"
    ]
  };
};
