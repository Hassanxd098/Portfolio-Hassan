import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ContactFormData } from '../../types';
import { portfolioService } from '../../services/portfolioService';

interface ContactState {
  submitting: boolean;
  successMessage: string | null;
  errorMessage: string | null;
}

const initialState: ContactState = {
  submitting: false,
  successMessage: null,
  errorMessage: null,
};

export const submitContactForm = createAsyncThunk(
  'contact/submitForm',
  async (formData: ContactFormData, { rejectWithValue }) => {
    try {
      const response = await portfolioService.submitContact(formData);
      return response.message || 'Message sent successfully!';
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to submit contact message');
    }
  }
);

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    clearContactStatus: (state) => {
      state.successMessage = null;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.submitting = true;
        state.successMessage = null;
        state.errorMessage = null;
      })
      .addCase(submitContactForm.fulfilled, (state, action) => {
        state.submitting = false;
        state.successMessage = action.payload;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.submitting = false;
        state.errorMessage = action.payload as string;
      });
  },
});

export const { clearContactStatus } = contactSlice.actions;
export default contactSlice.reducer;
