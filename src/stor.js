import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./features/weatherApiSlice.js";
export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});
