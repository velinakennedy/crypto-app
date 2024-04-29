const formatCurrency = (value: number = 0, maxSigFig: number, short: boolean, currency?: string): string => {
    if (currency) {
      return new Intl.NumberFormat("en-US", {
        maximumSignificantDigits: maxSigFig,
        style: "currency",
        currency,
        notation: short ? "compact" : "standard",
      }).format(value);
    } else {
      return new Intl.NumberFormat("en-US", {
        maximumSignificantDigits: maxSigFig,
        notation: short ? "compact" : "standard",
      }).format(value);
    }
};
export default formatCurrency;