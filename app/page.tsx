"use client";
import { useState } from "react";
import ChartTimeframe from "./components/ChartTimeframe";
import CoinCarousel from "./components/CoinCarousel";
import MarketTable from "./components/MarketTable";
import CoinConverter from "./components/CoinConverter";
import ChartsConverterToggle from "./components/ChartsConverterToggle";

export default function Home() {
  const [coinActive, setCoinActive] = useState<boolean>(true);
  const [converterActive, setConverterActive] = useState<boolean>(false);

  const handleCoinClick = () => {
    setConverterActive(false);
    setCoinActive(true);
  };

  const handleConverterClick = () => {
    setCoinActive(false);
    setConverterActive(true);
  };

  return (
    <div>
      <ChartsConverterToggle
        coinActive={coinActive}
        converterActive={converterActive}
        handleCoinClick={handleCoinClick}
        handleConverterClick={handleConverterClick}
      />
      {coinActive ? <CoinCarousel /> : <CoinConverter active={converterActive} />}
      <ChartTimeframe />
      <MarketTable />
    </div>
  );
}
