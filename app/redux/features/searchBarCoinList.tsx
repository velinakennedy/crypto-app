import { CoinMarketData } from "@/typings";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: { value: CoinMarketData[] | null } = {
  value: null,
};

export const searchBarCoinListSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {
    updateList: (state, action: PayloadAction<CoinMarketData[]>) => {
      state.value = action.payload;
    },
  },
});

export const { updateList } = searchBarCoinListSlice.actions;

export default searchBarCoinListSlice.reducer;
