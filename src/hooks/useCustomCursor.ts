import { useState, useEffect } from 'react';

export type CursorMode = 'default' | 'button' | 'link' | 'project' | 'profile';

export const useCustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const [cursorText, setCursorText] = useState<string>('');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device supports touch
    const checkTouch = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      );
    };

    if (checkTouch()) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (!target) {
        setCursorMode('default');
        setCursorText('');
        return;
      }

      // Check for project image hover
      const projectCard = target.closest('[data-cursor="project"]');
      if (projectCard) {
        setCursorMode('project');
        setCursorText('VIEW PROJECT');
        return;
      }

      // Check for profile picture magnetic hover
      const profileImg = target.closest('[data-cursor="profile"]');
      if (profileImg) {
        setCursorMode('profile');
        setCursorText('HASSAN');
        return;
      }

      // Check for buttons
      if (target.tagName === 'BUTTON' || target.closest('button') || target.getAttribute('role') === 'button') {
        setCursorMode('button');
        setCursorText('');
        return;
      }

      // Check for links
      if (target.tagName === 'A' || target.closest('a')) {
        setCursorMode('link');
        setCursorText('');
        return;
      }

      setCursorMode('default');
      setCursorText('');
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return { position, cursorMode, cursorText, isTouchDevice };
};
