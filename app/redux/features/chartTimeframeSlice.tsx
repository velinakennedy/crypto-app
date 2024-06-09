import { chartTimeframe } from "@/typings";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const date = Date.now() / 1000;

const initialState: chartTimeframe = {
    status: "1D",
    to: date,
    from: date - 86400
};

export const chartTimeframeSlice = createSlice({
    name: "timeframe",
    initialState,
    reducers: {
        updateTimeframe: (state, action: PayloadAction<string>) => {
            if (state.status === action.payload) return;
            switch(action.payload) {
                case "1D":           
                        state.status = action.payload,    
                        state.to = Date.now() / 1000,
                        state.from= (Date.now() / 1000) - 86400;
                    break;
                case "7D":
                        state.status = action.payload,    
                        state.to = Date.now() / 1000,
                        state.from= (Date.now() / 1000) - 604800;
                    break;
                case "14D":
                        state.status = action.payload,    
                        state.to = Date.now() / 1000,
                        state.from= (Date.now() / 1000) - 1209600;
                    break;
                case "1M":
                        state.status = action.payload,    
                        state.to = Date.now() / 1000,
                        state.from= (Date.now() / 1000) - 2629743;
                    break;
                case "1Y":
                        state.status = action.payload,    
                        state.to = Date.now() / 1000,
                        state.from= (Date.now() / 1000) - 31556926;
                    break;
            }
        }
    }
});

export const { updateTimeframe } = chartTimeframeSlice.actions;

export default chartTimeframeSlice.reducer;