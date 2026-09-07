import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Project } from '../../types';
import { INITIAL_PROJECTS } from '../../constants/portfolioData';
import { portfolioService } from '../../services/portfolioService';

interface ProjectState {
  projects: Project[];
  selectedCategory: string;
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: INITIAL_PROJECTS,
  selectedCategory: 'All',
  loading: false,
  error: null,
};

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (category: string | undefined, { rejectWithValue }) => {
    try {
      const data = await portfolioService.getProjects(category);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch projects');
    }
  }
);

export const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.length > 0) {
          state.projects = action.payload;
        }
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        // Keep initial fallback projects silently
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedCategory } = projectSlice.actions;
export default projectSlice.reducer;
