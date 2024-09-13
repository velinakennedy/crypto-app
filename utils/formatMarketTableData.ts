import { MarketFormattedData, MarketTableData } from "@/typings";

const formatMarketTableData = (data: MarketTableData[]): MarketFormattedData[] => {
  const formattedData: MarketFormattedData[] = data.map((coin) => {
    const colorOptions = ["194, 118, 33", "99, 117, 194", "215, 29, 189", "39, 208, 208", "240, 97, 66"];
    const hexColorOptions = ["#c27621", "#6375c2", "#d71dbd", "#27d0d0", "#f06142"];
    const color = Math.floor(Math.random() * 5);
    const formattedCoin: MarketFormattedData = {
      marketCap: coin.market_cap_rank,
      name: [coin.image, coin.name, `${coin.symbol.toUpperCase()}`, coin.id],
      price: coin.current_price,
      percent1h: coin.price_change_percentage_1h_in_currency,
      percent24h: coin.price_change_percentage_24h_in_currency,
      percent7d: coin.price_change_percentage_7d_in_currency,
      volumeDividedByCap: [coin.total_volume, coin.market_cap, colorOptions[color]],
      circulatingDividedByTotalSupply: [coin.circulating_supply, coin.total_supply, colorOptions[color]],
      last7Days: [coin.price_change_percentage_7d_in_currency, coin.sparkline_in_7d.price, hexColorOptions[color]],
    };
    return formattedCoin;
  });
  return formattedData;
};
export default formatMarketTableData;
