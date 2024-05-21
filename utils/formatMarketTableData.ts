import { MarketFormattedData, MarketTableData } from "@/typings";

const formatMarketTableData = (data: MarketTableData[]): MarketFormattedData[] => {
  const formattedData: MarketFormattedData[] = data.map((coin) => {
    const formattedCoin: MarketFormattedData = {
      marketCap: coin.market_cap_rank,
      name: [`${coin.image}`,`${coin.name} (${coin.symbol.toUpperCase()})`],
      price: coin.current_price,
      "1hPercentage": coin.price_change_percentage_1h_in_currency,
      "24hPercentage": coin.price_change_percentage_24h_in_currency,
      "7dPercentage": coin.price_change_percentage_7d_in_currency,
      volumeDividedByCap: [coin.total_volume, coin.market_cap],
      circulatingDividedByTotalSupply: [coin.circulating_supply, coin.total_supply],
      last7Days: [coin.price_change_percentage_7d_in_currency, coin.sparkline_in_7d.price],
    };
    return formattedCoin;
  });
  return formattedData;
};
export default formatMarketTableData;
