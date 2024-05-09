import { Align, ChartDataset, ChartOptions, InteractionAxis, InteractionMode, LayoutPosition } from "chart.js";
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

export interface ChartDataOptions {
    datasets: ChartDataset<"line" | "bar">[];
    options: ChartOptions;
}
