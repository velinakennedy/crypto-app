import { ReactNode } from "react";

export interface CurrencyState {
    value: string
}

export interface CurrencyTypes {
    name: string,
    symbol: ReactNode
}

export interface ThemeType {
    theme: "light" | "dark";
}