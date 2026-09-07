import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserAdmin } from '../../types';
import { portfolioService } from '../../services/portfolioService';

interface AuthState {
  user: UserAdmin | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const token = localStorage.getItem('hassan_admin_token');

const initialState: AuthState = {
  user: token ? { username: 'admin', role: 'admin', token } : null,
  isAuthenticated: !!token,
  loading: false,
  error: null,
};

export const loginAdminThunk = createAsyncThunk(
  'auth/loginAdmin',
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const data = await portfolioService.loginAdmin(credentials);
      localStorage.setItem('hassan_admin_token', data.token);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Authentication failed');
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutAdmin: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('hassan_admin_token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdminThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdminThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = {
          username: action.payload.user.username,
          role: action.payload.user.role,
          token: action.payload.token,
        };
      })
      .addCase(loginAdminThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logoutAdmin } = authSlice.actions;
export default authSlice.reducer;
