import { ReactNode } from "react";
import { TooltipProps } from "recharts";

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

export interface CoinData {
  prices: [[number, number]];
  market_caps: [[number, number]];
  total_volumes: [[number, number]];
}

export interface ActiveCoin {
  id: string;
  data: CoinData;
}

export interface CoinMarketData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: {
    times: number;
    currency: string;
    percentage: number;
  } | null;
  last_updated: string;
}

export interface MarketTableData extends CoinMarketData {
  sparkline_in_7d: {
    price: number[];
  };
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
}

export interface chartTimeframe {
  prevStatus: string;
  status: string;
  to: number;
  from: number;
}

export interface MarketFormattedData {
  marketCap: number;
  name: string[];
  price: number;
  percent1h: number;
  percent24h: number;
  percent7d: number;
  volumeDividedByCap: [number, number, string];
  circulatingDividedByTotalSupply: [number, number, string];
  last7Days: [number, number[], string];
}

export interface SortDescriptor {
  column: string | undefined;
  direction: string | undefined;
}

export type SortingTypes = string | number | number[] | string[] | [number, number[], string] | [number, number, string];

export interface Coin {
  name: string;
  id: string;
  image: string;
  symbol: string;
}

export interface PurchaseInfo {
  coin: Coin | CoinMarketData;
  amount: number | null;
  date: string;
}

export interface CoinAsset {
  name: string;
  id: string;
  symbol: string;
  image: string;
  currentPrice: number;
  priceChange24: number;
  marketVsVolume: number;
  circVsMaxSupply: number | string;
  amount: number;
  amountValue: number;
  gainLoss: number;
  purchaseDate: string;
}

export interface CalculatorInput {
  from: string;
  to: string;
  interval: number | undefined;
  investment: number | undefined;
  growth: number | undefined;
}

export interface CalcResult {
  totalInvested: number;
  coinsValue: number;
}

export interface CoinChartData {
  day: string;
  [x: any]: number;
}

export interface AllCoinChartData {
  priceData: CoinChartData[];
  volumeData: CoinChartData[];
}

export interface CalculatorChartData {
  day: string;
  price: number;
}

export interface MarketTooltip extends TooltipProps<number, string> {
  color: string;
}
