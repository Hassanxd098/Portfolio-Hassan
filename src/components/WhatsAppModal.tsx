import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setWhatsAppModalOpen } from '../store/slices/uiSlice';
import { DEVELOPER_PROFILE } from '../constants/portfolioData';
import { MessageSquare, ExternalLink, Send } from 'lucide-react';

export const WhatsAppModal: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.ui.isWhatsAppModalOpen);
  const [customMsg, setCustomMsg] = useState('Hi Hassan, I saw your developer portfolio and would like to discuss a project / opportunity!');

  const handleOpenWhatsApp = () => {
    const encoded = encodeURIComponent(customMsg);
    const cleanedNumber = DEVELOPER_PROFILE.whatsappNumber.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanedNumber}?text=${encoded}`;
    window.open(url, '_blank');
    dispatch(setWhatsAppModalOpen(false));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(setWhatsAppModalOpen(false))}
      maxWidth="md"
      title="INITIATE WHATSAPP CHAT"
    >
      <div className="space-y-4 py-2 font-mono text-xs">
        <div className="flex items-center gap-3 p-4 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200">
          <MessageSquare className="w-5 h-5 shrink-0 text-neutral-900 dark:text-white" />
          <p className="text-[11px] leading-relaxed">
            Connect directly with Hassan on WhatsApp. Customize your initial message below before redirecting.
          </p>
        </div>

        <div>
          <label className="block text-[10px] text-neutral-500 uppercase tracking-widest mb-1.5 font-bold">
            INITIAL MESSAGE PREVIEW
          </label>
          <textarea
            rows={4}
            value={customMsg}
            onChange={(e) => setCustomMsg(e.target.value)}
            className="w-full p-3 bg-white dark:bg-black border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-950 dark:focus:border-white resize-none uppercase text-xs"
          />
        </div>

        <div className="pt-2 flex items-center justify-end gap-3">
          <button
            onClick={() => dispatch(setWhatsAppModalOpen(false))}
            className="px-4 py-2.5 border border-neutral-300 dark:border-neutral-700 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-700 dark:text-neutral-300 uppercase font-bold text-xs transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleOpenWhatsApp}
            className="flex items-center gap-2 px-5 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 uppercase font-bold text-xs transition-colors shadow-sm"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open WhatsApp</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
