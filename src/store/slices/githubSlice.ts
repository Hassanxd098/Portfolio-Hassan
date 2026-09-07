import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { GitHubRepo } from '../../types';
import { INITIAL_GITHUB_REPOS } from '../../constants/portfolioData';
import { portfolioService } from '../../services/portfolioService';

interface GitHubState {
  repos: GitHubRepo[];
  searchQuery: string;
  selectedLanguage: string;
  sortBy: 'stars' | 'updated' | 'name';
  loading: boolean;
  error: string | null;
}

const initialState: GitHubState = {
  repos: INITIAL_GITHUB_REPOS,
  searchQuery: '',
  selectedLanguage: 'All',
  sortBy: 'stars',
  loading: false,
  error: null,
};

export const fetchGitHubRepos = createAsyncThunk(
  'github/fetchRepos',
  async (_, { rejectWithValue }) => {
    try {
      const data = await portfolioService.getGitHubRepos();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch GitHub repositories');
    }
  }
);

export const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedLanguage: (state, action: PayloadAction<string>) => {
      state.selectedLanguage = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'stars' | 'updated' | 'name'>) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGitHubRepos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGitHubRepos.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.length > 0) {
          state.repos = action.payload;
        }
      })
      .addCase(fetchGitHubRepos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSearchQuery, setSelectedLanguage, setSortBy } = githubSlice.actions;
export default githubSlice.reducer;
