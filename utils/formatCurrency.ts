const formatCurrency = (currency: string, value: number, maxSigFig: number, short: boolean): string => {
    const formattedCurrency = new Intl.NumberFormat("en-US", {
        maximumSignificantDigits: maxSigFig,
        style: "currency",
        currency,
        notation: short ? "compact" : "standard",
      }).format(value);
   return formattedCurrency;
};
export default formatCurrency;