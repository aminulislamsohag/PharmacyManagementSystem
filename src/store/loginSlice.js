

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, resetPassword } from '../utils/api';

export const login = createAsyncThunk('login/loginUser', async ({ username, password }, { rejectWithValue }) => {
  try {
    const data = await loginUser(username, password);
    localStorage.setItem('username', username);
    localStorage.setItem('userRole', data); // Persist role in localStorage
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Login failed');
  }
});

export const resetUserPassword = createAsyncThunk('login/resetPassword', async ({ username, password }, { rejectWithValue }) => {
  try {
    const response = await resetPassword(username, password);
    return response.status;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Password reset failed');
  }
});

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    userRole: localStorage.getItem('userRole') || null, // Load initial role from localStorage
    message: '',
    loading: false,
  },
  reducers: {
    clearMessage(state) {
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.message = '';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userRole = action.payload; // Assuming user role is returned by API
        state.message = 'Login successful';
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(resetUserPassword.pending, (state) => {
        state.loading = true;
        state.message = '';
      })
      .addCase(resetUserPassword.fulfilled, (state) => {
        state.loading = false;
        state.message = 'Password reset successfully!';
      })
      .addCase(resetUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      });
  },
});

export const { clearMessage } = loginSlice.actions;
export default loginSlice.reducer;