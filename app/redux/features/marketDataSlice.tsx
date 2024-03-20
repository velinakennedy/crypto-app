import {fetchBaseQuery, createApi} from '@reduxjs/toolkit/query/react';

export const marketSlice = createApi({
    reducerPath: "market",
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.coingecko.com/'}),
    endpoints: (builder) => ({
        getMarketData: builder.query({
            query: () => '/api/v3/global'
        })
    })
})

export const { useGetMarketDataQuery } = marketSlice