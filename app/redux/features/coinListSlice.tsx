import {fetchBaseQuery, createApi} from "@reduxjs/toolkit/query/react";

export const coinListSlice = createApi({
    reducerPath: "coins",
    baseQuery: fetchBaseQuery({baseUrl: "https://api.coingecko.com/", mode: "cors"}),
    endpoints: (builder) => ({
        getCoinList: builder.query({
            query: (currency: string) => `/api/v3/coins/markets?x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}&vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`
        })
    })
});

export const { useGetCoinListQuery } = coinListSlice;