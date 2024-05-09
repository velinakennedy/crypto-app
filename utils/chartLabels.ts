import formatChartLabel from "./formatChartLabel";

const chartLabels = (to: number, from: number) => {
    const timestamps: string[] = [];
    let i: number = from;
    do {
        timestamps.push(formatChartLabel(to, i));
        i = i + 3600;
    } while(i <= to);
  return timestamps;
};
export default chartLabels;