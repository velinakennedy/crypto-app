const formatMarketChartData = (data: number[]) => {
  const formattedData: { daysAgo: string; price: number }[] = [];
  let daysAgo = 7;

  const everyThreeHours = data.filter((data, index) => {
    if (index === 0 || index % 3 === 0) {
      return data;
    }
  });

  everyThreeHours.forEach((element, index) => {
    if (index !== 0 && index % 8 === 0) daysAgo -= 1;
    const recent = daysAgo === 1 ? "Yesterday" : "Today";
    formattedData.push({ daysAgo: `${daysAgo < 2 ? recent : `${daysAgo} days ago`}`, price: element });
  });

  return formattedData;
};
export default formatMarketChartData;
