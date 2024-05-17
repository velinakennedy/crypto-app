import {fetchBaseQuery, createApi} from "@reduxjs/toolkit/query/react";

export const coinTableSlice = createApi({
    reducerPath: "coinTable",
    baseQuery: fetchBaseQuery({baseUrl: "https://api.coingecko.com/", mode: "cors"}),
    endpoints: (builder) => ({
        getCoinTable: builder.query({
            query: (currency: string) => `/api/v3/coins/markets?x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}&vs_currency=${currency}&order=market_cap_desc&per_page=50&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
        })
    })
});

export const { useGetCoinTableQuery } = coinTableSlice;