import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, MessageSquare, Send, Github, Linkedin, MapPin, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { portfolioService } from '../services/portfolioService';
import { Toast } from './Toast';
import { TypographicHeadline } from './TypographicHeadline';
import { ScrambleText } from './ScrambleText';
import { AnimatedParagraph } from './AnimatedParagraph';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const ContactSection: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [contactConfig, setContactConfig] = useState({
    email: 'pmhassanurrahman@gmail.com',
    phone: '+918754938757',
    whatsapp: '+918754938757',
    whatsappMessage: 'Hi Hassan, I came across your portfolio and would like to discuss a project.',
    github: 'https://github.com/hassan-dev',
    linkedin: 'https://linkedin.com/in/hassan-dev',
    location: 'Chennai, Tamil Nadu, India'
  });

  useEffect(() => {
    fetch('/data/portfolio.json')
      .then((res) => res.json())
      .then((data) => {
        if (data.contact) {
          setContactConfig({
            email: data.contact.email || 'pmhassanurrahman@gmail.com',
            phone: data.contact.phone || '+918754938757',
            whatsapp: data.contact.whatsapp || '+918754938757',
            whatsappMessage: data.contact.whatsappMessage || 'Hi Hassan, I came across your portfolio and would like to discuss a project.',
            github: data.contact.github || 'https://github.com/hassan-dev',
            linkedin: data.contact.linkedin || 'https://linkedin.com/in/hassan-dev',
            location: data.contact.location || 'Chennai, Tamil Nadu, India'
          });
        }
      })
      .catch(() => {
        // Default initialized
      });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitting(true);
    try {
      await portfolioService.submitContact({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      });
      setToastType('success');
      setToastMsg('Thank you! Your message has been sent successfully.');
      reset();
    } catch (err: any) {
      setToastType('error');
      setToastMsg(err.message || 'Failed to transmit message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenWhatsApp = () => {
    const cleaned = contactConfig.whatsapp.replace(/[^0-9]/g, '');
    const encoded = encodeURIComponent(contactConfig.whatsappMessage);
    window.open(`https://wa.me/${cleaned}?text=${encoded}`, '_blank');
  };

  return (
    <section id="contact" className="py-28 bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-900 relative transition-colors duration-300">
      <Toast message={toastMsg} type={toastType} onClose={() => setToastMsg(null)} />

      {/* Background Texture */}
      <div className="absolute inset-0 mono-grid-pattern opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-200 dark:border-neutral-800 pb-12 mb-16 gap-8">
          <div>
            <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 tracking-[0.3em] uppercase block mb-3">
              // <ScrambleText text="07. INITIATE CONTACT & COLLABORATION" />
            </span>
            <TypographicHeadline
              text={"LET'S START\nA CONVERSATION."}
              highlightWords={['CONVERSATION.']}
              highlightClassName="text-neutral-400 dark:text-neutral-500"
              className="text-4xl sm:text-6xl uppercase tracking-tight text-neutral-950 dark:text-white leading-tight"
            />
          </div>

          <div className="max-w-md font-mono text-xs text-neutral-600 dark:text-neutral-400 border-l border-neutral-200 dark:border-neutral-800 pl-6">
            <AnimatedParagraph
              text="Available for senior full-stack roles, custom web application architecture, and contract engineering."
              className="text-neutral-700 dark:text-neutral-300 font-sans text-sm leading-relaxed"
            />
          </div>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Communication Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-8 space-y-6">
              <h3 className="font-display font-bold text-xl text-neutral-950 dark:text-white uppercase tracking-tight">
                <ScrambleText text="DIRECT CONTACT CHANNELS" />
              </h3>

              <p className="text-xs text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
                Send an email directly or start an instant chat on WhatsApp using the button below.
              </p>

              {/* Direct Email Card */}
              <a
                href={`mailto:${contactConfig.email}`}
                className="flex items-center justify-between p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-950 dark:hover:border-white transition-colors group shadow-sm"
              >
                <div className="flex items-center gap-3 font-mono text-xs">
                  <Mail className="w-4 h-4 text-neutral-950 dark:text-white" />
                  <div>
                    <span className="text-neutral-400 dark:text-neutral-500 text-[10px] block uppercase">EMAIL ADDRESS</span>
                    <span className="text-neutral-950 dark:text-white font-bold">{contactConfig.email}</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors" />
              </a>

              {/* WhatsApp Launcher Button */}
              <button
                onClick={handleOpenWhatsApp}
                className="w-full flex items-center justify-between p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-950 dark:hover:border-white transition-colors group text-left shadow-sm"
              >
                <div className="flex items-center gap-3 font-mono text-xs">
                  <MessageSquare className="w-4 h-4 text-neutral-950 dark:text-white" />
                  <div>
                    <span className="text-neutral-400 dark:text-neutral-500 text-[10px] block uppercase">INSTANT MESSAGING</span>
                    <span className="text-neutral-950 dark:text-white font-bold">CHAT ON WHATSAPP</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors" />
              </button>

              {/* Location & Phone Info */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-900 font-mono text-xs space-y-2 text-neutral-600 dark:text-neutral-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
                  <span>{contactConfig.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
                  <span>{contactConfig.phone}</span>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-900 flex items-center gap-3 font-mono text-xs">
                <a
                  href={contactConfig.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-950 hover:text-white dark:hover:bg-white dark:hover:text-black text-center text-neutral-900 dark:text-white font-bold uppercase transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Github className="w-4 h-4" />
                  <span>GITHUB</span>
                </a>

                <a
                  href={contactConfig.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-950 hover:text-white dark:hover:bg-white dark:hover:text-black text-center text-neutral-900 dark:text-white font-bold uppercase transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LINKEDIN</span>
                </a>
              </div>

            </div>
          </div>

          {/* Right Column: Express API Form */}
          <div className="lg:col-span-7">
            <div className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-8">
              <h3 className="font-display font-bold text-xl text-neutral-950 dark:text-white uppercase tracking-tight mb-6">
                TRANSMIT A MESSAGE
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-2 font-bold">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      placeholder="E.G. ALEX MORGAN"
                      {...register('name')}
                      className="w-full p-3 bg-white dark:bg-black border border-neutral-300 dark:border-neutral-800 text-neutral-950 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-950 dark:focus:border-white uppercase"
                    />
                    {errors.name && (
                      <p className="text-red-500 dark:text-red-400 text-[10px] mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-2 font-bold">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      placeholder="ALEX@COMPANY.COM"
                      {...register('email')}
                      className="w-full p-3 bg-white dark:bg-black border border-neutral-300 dark:border-neutral-800 text-neutral-950 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-950 dark:focus:border-white uppercase"
                    />
                    {errors.email && (
                      <p className="text-red-500 dark:text-red-400 text-[10px] mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-2 font-bold">
                      PHONE NUMBER (OPTIONAL)
                    </label>
                    <input
                      type="text"
                      placeholder="+1 (555) 000-0000"
                      {...register('phone')}
                      className="w-full p-3 bg-white dark:bg-black border border-neutral-300 dark:border-neutral-800 text-neutral-950 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-950 dark:focus:border-white uppercase"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-2 font-bold">
                      SUBJECT / PURPOSE *
                    </label>
                    <input
                      type="text"
                      placeholder="PROJECT INQUIRY / FULL-STACK ROLE"
                      {...register('subject')}
                      className="w-full p-3 bg-white dark:bg-black border border-neutral-300 dark:border-neutral-800 text-neutral-950 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-950 dark:focus:border-white uppercase"
                    />
                    {errors.subject && (
                      <p className="text-red-500 dark:text-red-400 text-[10px] mt-1">{errors.subject.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-2 font-bold">
                    MESSAGE *
                  </label>
                  <textarea
                    rows={5}
                    placeholder="DESCRIBE YOUR PROJECT REQUIREMENTS, TIMELINE, OR ENGINEERING ROLE..."
                    {...register('message')}
                    className="w-full p-3 bg-white dark:bg-black border border-neutral-300 dark:border-neutral-800 text-neutral-950 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-950 dark:focus:border-white uppercase resize-none"
                  />
                  {errors.message && (
                    <p className="text-red-500 dark:text-red-400 text-[10px] mt-1">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-bold uppercase tracking-widest transition-all duration-300 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'TRANSMITTING MESSAGE...' : 'SEND MESSAGE'}</span>
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
