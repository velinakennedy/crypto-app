import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { marketSlice } from "./features/marketDataSlice";
import currencyReducer from "./features/currencySlice";

export const store = configureStore({
    reducer: {
        [marketSlice.reducerPath]: marketSlice.reducer,
        currency: currencyReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(marketSlice.middleware),
  });

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
