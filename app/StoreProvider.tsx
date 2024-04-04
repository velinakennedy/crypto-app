"use client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ThemeProvider } from "next-themes";

export const StoreProvider = ({children}: {
    children: React.ReactNode;
  }) => {
    return (
        <Provider store={store}>
            <ThemeProvider enableSystem={true} attribute="class">
                {children}
            </ThemeProvider>
        </Provider>
    );
};