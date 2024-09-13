export const headers = [
  { key: "marketCap", title: "#", sortable: true },
  { key: "name", title: "Name", sortable: true },
  { key: "price", title: "Price", sortable: true },
  { key: "percent1h", title: "1h%", sortable: true },
  { key: "percent24h", title: "24h%", sortable: true },
  { key: "percent7d", title: "7d%", sortable: true },
  {
    key: "volumeDividedByCap",
    title: "24h Volume/Market Cap",
    sortable: false,
  },
  {
    key: "circulatingDividedByTotalSupply",
    title: "Circulating/Total Supply",
    sortable: false,
  },
  { key: "last7Days", title: "Last 7d", sortable: false },
];
