export const intervalPrices = (prices: number[][], from: number, to: number, interval: number) => {
  const daysBetween = Math.ceil((to - from) / 86400000);

  const priceArray = prices.slice(0, daysBetween);

  const intervalCoins = priceArray.filter((_: number[], i: number) => i % interval === 0);

  return { priceArray, intervalCoins };
};

export const calculateInvestment = (typeCostAveraging: string, invested: number, intervalPrices: number[][], growth: number) => {
  let total = invested;
  const actualGrowArray = [invested] as number[];
  const growArray = [invested] as number[];

  if (typeCostAveraging === "VCA" && invested) {
    for (let i = 1; i < intervalPrices?.length; i++) {
      const plannedGrowth = growArray[i - 1] * (+growth / 100 + 1);
      const actualGrowth = intervalPrices[i][1] / intervalPrices[i - 1][1];
      const newValue = growArray[i - 1] * actualGrowth;
      total += plannedGrowth - newValue;
      growArray.push(plannedGrowth);
      actualGrowArray.push(newValue);
    }
  } else if (typeCostAveraging === "DCA" && invested) {
    for (let i = 1; i < intervalPrices?.length; i++) {
      const actualGrowth = intervalPrices[i][1] / intervalPrices[i - 1][1];
      const newValue = growArray[i - 1] * actualGrowth + growth;
      total += growth;
      growArray.push(newValue);
    }
  }

  return {
    totalInvested: Math.floor(total),
    coinsValue: typeCostAveraging === "VCA" ? Math.floor(actualGrowArray.slice(-1)[0]) : Math.floor(growArray.slice(-1)[0]),
  };
};
