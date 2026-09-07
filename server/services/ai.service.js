import { logger } from '../utils/logger.js';

const knowledgeBase = [
  {
    keywords: ['skill', 'technology', 'stack', 'react', 'node', 'express', 'mongo', 'redux'],
    answer: "Hassan specializes in the MERN stack (React, Node.js, Express.js, MongoDB) along with TypeScript, Redux Toolkit, REST APIs, GraphQL, and AI Applications. He focuses on modular architecture, clean code standards, and high-performance frontend state management."
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
    keywords: ['experience', 'work', 'job', 'career', 'senior', 'years'],
    answer: "Hassan has 5+ years of full-stack engineering experience. He has architected over 24 production systems, created 45+ REST APIs, and led frontend/backend integration teams adhering to security, rate limiting, and performance optimization guidelines."
  },
  {
    keywords: ['contact', 'email', 'hire', 'whatsapp', 'github', 'linkedin', 'reach'],
    answer: "You can reach out to Hassan via the Contact Form on this site, directly via email at hassan.dev@example.com, or initiate a direct chat via WhatsApp. He is currently available for full-stack engineering and technical leadership opportunities!"
  },
  {
    keywords: ['architecture', 'security', 'performance', 'build', 'clean code'],
    answer: "Hassan follows clean code architecture: strict separation of UI components, centralized Redux state, service layer API design, Zod request validation, Helmet security headers, JWT session rotation, and MongoDB indexing."
  }
];

export const processAiQuery = async (query) => {
  if (!query || typeof query !== 'string') {
    return {
      answer: "Hello! I am Hassan's AI Assistant. Ask me anything about his technical stack, Missile Health project, architectural practices, or how to contact him.",
      suggestedQuestions: [
        "What technologies does Hassan use?",
        "Tell me about Missile Health.",
        "What's his backend & architecture experience?",
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
          "What is Hassan's architecture approach?",
          "How can I reach Hassan directly?"
        ]
      };
    }
  }

  return {
    answer: `Thank you for asking! Hassan is a Senior Full-Stack Developer proficient in React, Node.js, Express, MongoDB, and Redux Toolkit. Regarding "${query}", Hassan applies scalable software engineering practices to deliver production-grade systems. Feel free to explore his projects or reach out via the contact form!`,
    suggestedQuestions: [
      "What technologies does Hassan specialize in?",
      "Tell me about Missile Health project.",
      "How can I get in touch with Hassan?"
    ]
  };
};
