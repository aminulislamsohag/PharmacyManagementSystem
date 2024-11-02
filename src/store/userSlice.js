// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    showAddUserForm: false,
  },
  reducers: {
    setShowAddUserForm: (state, action) => {
      state.showAddUserForm = action.payload;
    },
  },
});

export const { setShowAddUserForm } = userSlice.actions;
export default userSlice.reducer;
