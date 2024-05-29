import { configureStore } from "@reduxjs/toolkit";
import CompanySlice from "./CompanySlice";

const store = configureStore({
  reducer: {
    companies: CompanySlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
