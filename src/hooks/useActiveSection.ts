import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveSection } from '../store/slices/uiSlice';

export const useActiveSection = (sectionIds: string[]) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            dispatch(setActiveSection(sectionId));
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, dispatch]);
};
