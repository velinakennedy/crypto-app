const composeChartDataQuery = (id: string, currency: string, status: string, to: number, from: number) => {
  return {
    id,
    currency,
    from: status === "1Y" ? Math.floor(from) : Math.floor(to - 2629743),
    to: Math.floor(to),
  };
};
export default composeChartDataQuery;
