import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setCommandPaletteOpen } from '../store/slices/uiSlice';

export const useCommandPalette = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.ui.isCommandPaletteOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K, Cmd+K, or slash key when not typing in inputs
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        dispatch(setCommandPaletteOpen(!isOpen));
      } else if (
        e.key === '/' &&
        !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)
      ) {
        e.preventDefault();
        dispatch(setCommandPaletteOpen(true));
      } else if (e.key === 'Escape' && isOpen) {
        dispatch(setCommandPaletteOpen(false));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, dispatch]);

  return {
    isOpen,
    toggle: () => dispatch(setCommandPaletteOpen(!isOpen)),
    open: () => dispatch(setCommandPaletteOpen(true)),
    close: () => dispatch(setCommandPaletteOpen(false)),
  };
};
