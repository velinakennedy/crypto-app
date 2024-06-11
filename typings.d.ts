import { ChartDataset, ChartOptions } from "chart.js";
import { ReactNode } from "react";

export interface CurrencyState {
  value: string;
}

export interface ActiveCoinsState {
    value: ActiveCoin[];
  }

export interface CurrencyTypes {
  name: string;
  symbol: ReactNode;
}

export interface ThemeType {
  theme: "light" | "dark";
}

export interface ChartCoinData {
  prices: [[number, number]];
  market_caps: [[number, number]];
  total_volumes: [[number, number]];
}

export interface ActiveCoin {
  id: string;
  data: ChartCoinData;
}

export interface CustomOptions {
    background: string;
    border: string;
    lineYAxis: string;
    barYAxis: string;
}

export interface ColorOptions {
  background: string;
  border: string;
}

export interface ChartDataOptions {
    datasets: ChartDataset<"line" | "bar">[];
    options: ChartOptions;
}

export interface MarketChartDataOptions {
  dataset: ChartDataset<"line">[];
  options: ChartOptions;
}

export interface CoinMarketData {
  id: string,
  symbol: string,
  name: string,
  image: string,
  current_price: number,
  market_cap: number,
  market_cap_rank: number,
  fully_diluted_valuation: number,
  total_volume: number,
  high_24h: number,
  low_24h: number,
  price_change_24h: number,
  price_change_percentage_24h: number,
  market_cap_change_24h: number,
  market_cap_change_percentage_24h: number,
  circulating_supply: number,
  total_supply: number,
  max_supply: number | null,
  ath: number,
  ath_change_percentage: number,
  ath_date: string,
  atl: number,
  atl_change_percentage:number,
  atl_date: string,
  roi: {
    times: number,
    currency: string,
    percentage: number
  } | null,
  last_updated: string
}

export interface MarketTableData extends CoinMarketData {
  sparkline_in_7d: {
    price: number[]
  },
  price_change_percentage_1h_in_currency: number,
  price_change_percentage_24h_in_currency: number,
  price_change_percentage_7d_in_currency: number
}

export interface MarketFormattedData {
  marketCap: number,
  name: string[],
  price: number,
  percent1h: number,
  percent24h: number,
  percent7d: number,
  volumeDividedByCap: [number, number, string],
  circulatingDividedByTotalSupply: [number, number, string],
  last7Days: [number, number[]]
}

export interface SortDescriptor {
  column: string | undefined,
  direction: string | undefined
}

export type SortingTypes = string
| number
| number[]
| string[]
| [number, number[]]
| [number, number, string];