import {fetchBaseQuery, createApi} from "@reduxjs/toolkit/query/react";

export const coinListSlice = createApi({
    reducerPath: "coins",
    baseQuery: fetchBaseQuery({baseUrl: "https://api.coingecko.com/"}),
    endpoints: (builder) => ({
        getCoinList: builder.query({
            query: () => "/api/v3/coins/list"
        })
    })
});

export const { useGetCoinListQuery } = coinListSlice;