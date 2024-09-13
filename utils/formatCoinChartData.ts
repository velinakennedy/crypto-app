import { ActiveCoin, CoinChartData } from "@/typings";
import chartLabels from "./chartLabels";

const formatCoinChartData = (data: ActiveCoin[], dataType: string, startDate: number, status: string) => {
  const formattedCoinData: CoinChartData[] = [];

  if (dataType === "price" || dataType === "volume") {
    const type = dataType === "price" ? "prices" : "total_volumes";
    const formatFirstCoin = (element: number[]) => {
      if (element[0] >= startDate) {
        const item: CoinChartData = {
          day: chartLabels(element[0], status),
          [`${dataType}${data[0].id[0].toUpperCase()}${data[0].id.slice(1)}`]: element[1],
        };
        formattedCoinData.push(item);
      }
    };

    const formatCoins = (element: number[], index: number, id: string) => {
      if (element[0] >= startDate) {
        formattedCoinData[index] = { ...formattedCoinData[index], [`${dataType}${id[0].toUpperCase()}${id.slice(1)}`]: element[1] };
        return ++index;
      }
      return index;
    };

    data[0].data[type].filter((element: number[]) => {
      formatFirstCoin(element);
    });

    if (data.length > 1) {
      const slicedData = data.slice(1);
      slicedData.forEach((coin) => {
        let index = 0;
        coin.data[type].filter((element: number[]) => {
          if (index < formattedCoinData.length) {
            index = formatCoins(element, index, coin.id);
          }
        });
      });
    }
  }

  return formattedCoinData;
};
export default formatCoinChartData;
