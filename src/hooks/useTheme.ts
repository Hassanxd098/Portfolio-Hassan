import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { toggleTheme, setTheme } from '../store/slices/themeSlice';
import { ThemeMode } from '../types';

export const useTheme = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  return {
    mode,
    toggleTheme: () => dispatch(toggleTheme()),
    setTheme: (newMode: ThemeMode) => dispatch(setTheme(newMode)),
  };
};
