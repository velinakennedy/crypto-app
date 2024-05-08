import { Align, ChartDataset, LayoutPosition } from "chart.js";
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
    yAxis: string;
}

export interface Option {
    maintainAspectRation: boolean;
    scales: {
        x: {
            ticks: {
                display: boolean;
            };
            grid: {
                display: boolean;
            };
        };
        y: {
            display: boolean;
        };
        y1: {
            display: boolean;
        };
        y2: {
            display: boolean;
        };
    };
    plugins: {
        legend: {
            display: boolean,
            position: LayoutPosition,
            align: Align
          };
    }
}

export interface ChartDataOptions {
    datasets: ChartDataset<"line" | "bar">[];
    options: Option;
}
