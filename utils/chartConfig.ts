import { ChartOptions } from "chart.js";

const chartConfig = (type: string): ChartOptions => {
    if (type === "large") {
        const options: ChartOptions = {
            maintainAspectRatio: false,
            interaction: {
                mode: "nearest",
                axis: "x"
            },
            scales: {
                x: {
                    ticks: {
                        display: true,
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    display: false
                },
                y1: {
                    display: false
                },
                y2: {
                    display: false
                },
                y3: {
                    display: false
                },
                y4: {
                    display: false
                },
                y5: {
                    display: false
                }
            },
            plugins: {
              legend: {
                display: true,
                position: "bottom",
                align: "start"
              },
            },
          };
          return options;

    } else {
        const options: ChartOptions  = {
            maintainAspectRatio: false,
            interaction: {
                mode: "nearest",
                axis: "x"
            },
            scales: {
                x: {
                    display: false,
                    ticks: {
                        display: true,
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    display: false
                },
            },
            plugins: {
              legend: {
                display: false
              },
            },
          };
        return options;
    }
};
export default chartConfig;