import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import gigsReducer from "./features/gigsSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
     gigs: gigsReducer,
  },
});
