import { CoinData, CoinDataItem } from "@/typings";

const composeCoinItem = (id: string, name: string, data: CoinData): CoinDataItem => {
  return {
    id,
    name,
    data,
  };
};
export default composeCoinItem;
