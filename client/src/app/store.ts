// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import newsSlice from './slices/newsSlice';

export const store = configureStore({
  reducer: {
    news: newsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
