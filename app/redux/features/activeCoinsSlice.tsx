import { ActiveCoin, ActiveCoinsState } from "@/typings";
import {createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: ActiveCoinsState = {
    value: []
};

export const activeCoinsSlice = createSlice({
    name: "coins",
    initialState,
    reducers: {
        addCoin: (state, action: PayloadAction<ActiveCoin>) => {
            const exists = state.value.find((coin) => coin.id == action.payload.id);
            if (!exists) state.value.push(action.payload);
        },
        removeCoin: (state, action: PayloadAction<string>) => {
            state.value = state.value.filter((coin) => coin.id != action.payload);
        },
        editCoin: (state, action: PayloadAction<ActiveCoin>) => {
            const coin = state.value.find((element) => element.id === action.payload.id);
            if (coin) {
                coin.data = action.payload.data;
            }
        }
    }
});

export const { addCoin, removeCoin, editCoin } = activeCoinsSlice.actions;

export default activeCoinsSlice.reducer;