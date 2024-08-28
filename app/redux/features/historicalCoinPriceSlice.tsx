import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const historicalCoinPriceSlice = createApi({
  reducerPath: "coin price history",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.coingecko.com/", mode: "cors" }),
  endpoints: (builder) => ({
    getPrices: builder.query({
      query: ({ id, days, currency }: { id: string; days: number; currency: string }) =>
        `/api/v3/coins/${id}/market_chart?vs_currency=${currency}&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}&days=${days}&interval=daily`,
    }),
  }),
});

export const { useGetPricesQuery } = historicalCoinPriceSlice;
