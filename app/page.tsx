'use client'

import { useGetMarketDataQuery } from "./redux/features/marketDataSlice";

export default function Home() {

  const {data, isLoading} = useGetMarketDataQuery("");

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <main>
         <p>data: {JSON.stringify(data)}</p>
    </main>
  );
}
