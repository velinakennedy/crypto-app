import {fetchBaseQuery, createApi} from "@reduxjs/toolkit/query/react";

export const coinInfoSlice = createApi({
    reducerPath: "coinInfo",
    baseQuery: fetchBaseQuery({baseUrl: "https://api.coingecko.com/"}),
    endpoints: (builder) => ({
        getCoin: builder.query({
            query: (id: string) => `/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`
        })
    })
});

export const { useGetCoinQuery } = coinInfoSlice;