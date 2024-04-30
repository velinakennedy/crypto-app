import {fetchBaseQuery, createApi} from "@reduxjs/toolkit/query/react";

export const coinInfoSlice = createApi({
    reducerPath: "coinInfo",
    baseQuery: fetchBaseQuery({baseUrl: "https://api.coingecko.com/", mode: "cors"}),
    endpoints: (builder) => ({
        getCoin: builder.query({
            query: (id: string) => `/api/v3/coins/${id}?x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}&localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`
        })
    })
});

export const { useGetCoinQuery } = coinInfoSlice;