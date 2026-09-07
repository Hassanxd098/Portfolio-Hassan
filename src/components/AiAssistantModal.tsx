import React, { useState, useRef, useEffect } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setAiAssistantOpen } from '../store/slices/uiSlice';
import { portfolioService } from '../services/portfolioService';
import { AiChatMessage } from '../types';
import { Bot, Send, User, Sparkles, CornerDownLeft } from 'lucide-react';

export const AiAssistantModal: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.ui.isAiAssistantOpen);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<AiChatMessage[]>([
    {
      id: 'msg_welcome',
      sender: 'ai',
      text: "Hello! I am Hassan's AI Assistant. I can answer questions regarding his full-stack engineering skills, Missile Health project, architectural practices, and availability.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedQuestions: [
        'What technologies does Hassan use?',
        'Tell me about Missile Health.',
        "What's his backend & architecture experience?",
        'How can I contact or hire Hassan?'
      ]
    }
  ]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async (queryText?: string) => {
    const q = queryText || inputQuery;
    if (!q.trim() || loading) return;

    const userMsg: AiChatMessage = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    try {
      const response = await portfolioService.queryAiAssistant(q);
      const aiMsg: AiChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: response.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedQuestions: response.suggestedQuestions,
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          sender: 'ai',
          text: "Hassan is a Senior Full-Stack Engineer skilled in React, Node.js, Express, MongoDB, and Redux Toolkit. Feel free to contact him directly via the Contact section!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(setAiAssistantOpen(false))}
      maxWidth="lg"
      title="ASK HASSAN'S AI ASSISTANT"
    >
      <div className="flex flex-col h-[520px] font-mono text-xs">
        {/* Chat History Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-7 h-7 flex items-center justify-center shrink-0 border ${
                  msg.sender === 'user'
                    ? 'bg-neutral-950 text-white dark:bg-white dark:text-black border-neutral-950 dark:border-white'
                    : 'bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 border-neutral-300 dark:border-neutral-700'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              <div className={`max-w-[85%] space-y-2`}>
                <div
                  className={`p-4 border text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-neutral-950 text-white dark:bg-white dark:text-black border-neutral-950 dark:border-white'
                      : 'bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200 border-neutral-200 dark:border-neutral-800'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Suggested Chips */}
                {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {msg.suggestedQuestions.map((sq, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(sq)}
                        className="px-3 py-1 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 text-[10px] font-mono hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors text-left"
                      >
                        ⚡ {sq}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-neutral-950 text-white dark:bg-white dark:text-black flex items-center justify-center animate-pulse">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="px-4 py-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-500 animate-pulse">
                AI IS GENERATING RESPONSE...
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="ASK ABOUT EXPERIENCE, MISSILE HEALTH, OR STACK..."
            className="flex-1 px-4 py-3 bg-white dark:bg-black border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 text-xs focus:outline-none focus:border-neutral-950 dark:focus:border-white uppercase"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !inputQuery.trim()}
            className="px-5 py-3 bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-bold uppercase transition-all duration-300 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>ASK</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
