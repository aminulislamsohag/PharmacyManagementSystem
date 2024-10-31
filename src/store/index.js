import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import userSlice from './userSlice';

const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userSlice,
  },
});

export default store;