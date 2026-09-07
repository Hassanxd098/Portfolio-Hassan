import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Experience } from '../../types';
import { INITIAL_EXPERIENCES } from '../../constants/portfolioData';
import { portfolioService } from '../../services/portfolioService';

interface ExperienceState {
  experiences: Experience[];
  loading: boolean;
  error: string | null;
}

const initialState: ExperienceState = {
  experiences: INITIAL_EXPERIENCES,
  loading: false,
  error: null,
};

export const fetchExperiences = createAsyncThunk(
  'experience/fetchExperiences',
  async (_, { rejectWithValue }) => {
    try {
      const data = await portfolioService.getExperiences();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch experience');
    }
  }
);

export const experienceSlice = createSlice({
  name: 'experience',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExperiences.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExperiences.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.length > 0) {
          state.experiences = action.payload;
        }
      })
      .addCase(fetchExperiences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default experienceSlice.reducer;
