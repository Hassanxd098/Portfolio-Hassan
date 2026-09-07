import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project } from '../../types';

interface UiState {
  isCommandPaletteOpen: boolean;
  isAiAssistantOpen: boolean;
  isTerminalOpen: boolean;
  isWhatsAppModalOpen: boolean;
  selectedCaseStudyProject: Project | null;
  activeSection: string;
}

const initialState: UiState = {
  isCommandPaletteOpen: false,
  isAiAssistantOpen: false,
  isTerminalOpen: false,
  isWhatsAppModalOpen: false,
  selectedCaseStudyProject: null,
  activeSection: 'home',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCommandPaletteOpen: (state, action: PayloadAction<boolean>) => {
      state.isCommandPaletteOpen = action.payload;
    },
    setAiAssistantOpen: (state, action: PayloadAction<boolean>) => {
      state.isAiAssistantOpen = action.payload;
    },
    setTerminalOpen: (state, action: PayloadAction<boolean>) => {
      state.isTerminalOpen = action.payload;
    },
    setWhatsAppModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isWhatsAppModalOpen = action.payload;
    },
    openCaseStudy: (state, action: PayloadAction<Project>) => {
      state.selectedCaseStudyProject = action.payload;
    },
    closeCaseStudy: (state) => {
      state.selectedCaseStudyProject = null;
    },
    setActiveSection: (state, action: PayloadAction<string>) => {
      state.activeSection = action.payload;
    },
  },
});

export const {
  setCommandPaletteOpen,
  setAiAssistantOpen,
  setTerminalOpen,
  setWhatsAppModalOpen,
  openCaseStudy,
  closeCaseStudy,
  setActiveSection,
} = uiSlice.actions;

export default uiSlice.reducer;
