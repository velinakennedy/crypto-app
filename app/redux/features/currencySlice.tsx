import { CurrencyState } from "@/typings";
import {createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: CurrencyState = {
    value: "usd",
};

export const currencySlice = createSlice({
    name: "currency",
    initialState,
    reducers: {
        updateCurrency: (state, action: PayloadAction<string>) => {
            state.value = action.payload.toLowerCase();
        }
    }
});

export const { updateCurrency } = currencySlice.actions;

export default currencySlice.reducer;