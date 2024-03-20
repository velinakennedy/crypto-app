import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query';
import { marketSlice } from './features/marketDataSlice';

export const store = configureStore({
    reducer: {
        [marketSlice.reducerPath]: marketSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(marketSlice.middleware),
  }) 

setupListeners(store.dispatch)
