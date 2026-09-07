import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Skill } from '../../types';
import { INITIAL_SKILLS } from '../../constants/portfolioData';
import { portfolioService } from '../../services/portfolioService';

interface SkillState {
  skills: Skill[];
  selectedCategory: string;
  hoveredSkill: Skill | null;
  loading: boolean;
  error: string | null;
}

const initialState: SkillState = {
  skills: INITIAL_SKILLS,
  selectedCategory: 'All',
  hoveredSkill: null,
  loading: false,
  error: null,
};

export const fetchSkills = createAsyncThunk(
  'skills/fetchSkills',
  async (category: string | undefined, { rejectWithValue }) => {
    try {
      const data = await portfolioService.getSkills(category);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch skills');
    }
  }
);

export const skillSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    setSkillCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setHoveredSkill: (state, action: PayloadAction<Skill | null>) => {
      state.hoveredSkill = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.length > 0) {
          state.skills = action.payload;
        }
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSkillCategory, setHoveredSkill } = skillSlice.actions;
export default skillSlice.reducer;
