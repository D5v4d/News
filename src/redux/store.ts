import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "./slice/newsSlice";

export const store = configureStore({
  reducer: {
    news: newsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;