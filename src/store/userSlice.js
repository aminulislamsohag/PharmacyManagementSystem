import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showAddUserForm: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleAddUserForm: (state) => {
      state.showAddUserForm = !state.showAddUserForm;
    },
  },
});

export const { toggleAddUserForm } = userSlice.actions;
export default userSlice.reducer;
