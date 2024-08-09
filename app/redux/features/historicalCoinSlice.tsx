import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const historicalCoinSlice = createApi({
  reducerPath: "coin history",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.coingecko.com/", mode: "cors" }),
  endpoints: (builder) => ({
    getCoinHistory: builder.query({
      query: ({ id, date }: { id: string; date: string }) =>
        `/api/v3/coins/${id}/history?x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}&date=${date}&localization=true`,
    }),
  }),
});

export const { useGetCoinHistoryQuery } = historicalCoinSlice;
