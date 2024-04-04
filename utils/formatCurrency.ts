const formatCurrency = (currency: string, value: number): string => {
    const formattedCurrency = new Intl.NumberFormat("en-US", {
        maximumSignificantDigits: 3,
        style: "currency",
        currency,
        notation: "compact",
        compactDisplay: "short",
      }).format(value);
   return formattedCurrency;
};
export default formatCurrency;