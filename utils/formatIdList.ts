import { CoinChartData } from "@/typings";

const formatIdList = (coins: CoinChartData) => {
  const coinIdList = Object.keys(coins).slice(1);
  const volumeCoinIdList = coinIdList?.filter((element) => element.includes("volume"));
  const priceCoinIdList = coinIdList?.filter((element) => element.includes("price"));
  return { coinIdList, priceIdList: priceCoinIdList, volumeIdList: volumeCoinIdList };
};
export default formatIdList;
