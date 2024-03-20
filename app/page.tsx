"use client";

import { useGetMarketDataQuery } from "./redux/features/marketDataSlice";

export default function Home() {

  const {data, isLoading} = useGetMarketDataQuery("");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
         <div>data: {JSON.stringify(data)}</div>
    </div>
  );
}
