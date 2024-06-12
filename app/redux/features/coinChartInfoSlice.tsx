import {fetchBaseQuery, createApi} from "@reduxjs/toolkit/query/react";

export const coinChartInfoSlice = createApi({
    reducerPath: "coinChartInfo",
    baseQuery: fetchBaseQuery({baseUrl: "https://api.coingecko.com/", mode: "cors"}),
    endpoints: (builder) => ({
        getChartData: builder.query({
            query: ({id, currency, from, to}: {id: string, currency: string, from: number, to: number}) => `/api/v3/coins/${id}/market_chart/range?vs_currency=${currency}&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}&from=${from}&to=${to}`
        }),
        editChartData: builder.mutation({
            query: ({id, currency, from, to}: {id: string, currency: string, from: number, to: number}) => `/api/v3/coins/${id}/market_chart/range?vs_currency=${currency}&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}&from=${from}&to=${to}`
        })
    })
});

export const { useGetChartDataQuery, useEditChartDataMutation } = coinChartInfoSlice;