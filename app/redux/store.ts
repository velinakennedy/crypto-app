import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { marketSlice } from "./features/marketDataSlice";
import currencyReducer from "./features/currencySlice";
import { coinListSlice } from "./features/coinListSlice";
import { coinInfoSlice } from "./features/coinInfoSlice";
import { coinChartInfoSlice } from "./features/coinChartInfoSlice";

export const store = configureStore({
    reducer: {
        [marketSlice.reducerPath]: marketSlice.reducer,
        [coinListSlice.reducerPath]: coinListSlice.reducer,
        [coinInfoSlice.reducerPath]: coinInfoSlice.reducer,
        [coinChartInfoSlice.reducerPath]: coinChartInfoSlice.reducer,
        currency: currencyReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(marketSlice.middleware, coinListSlice.middleware, coinInfoSlice.middleware, coinChartInfoSlice.middleware),
  });

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
