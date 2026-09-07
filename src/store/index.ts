import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import uiReducer from './slices/uiSlice';
import projectReducer from './slices/projectSlice';
import skillReducer from './slices/skillSlice';
import experienceReducer from './slices/experienceSlice';
import githubReducer from './slices/githubSlice';
import contactReducer from './slices/contactSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    ui: uiReducer,
    projects: projectReducer,
    skills: skillReducer,
    experience: experienceReducer,
    github: githubReducer,
    contact: contactReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
