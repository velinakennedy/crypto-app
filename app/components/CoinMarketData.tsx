import formatCurrency from "@/utils/formatCurrency";

const CoinMarketData = ({title, value, currency, symbol}: {title: string, value: number, currency?: string, symbol?: string}) => {
  return (
    <div className="flex items-center flex-col gap-7">
            <h2 className="dark:font-thin">{title}</h2>
            <p className="font-semibold">
                  {formatCurrency(
                    value,
                    5,
                    true,
                    currency ? currency : undefined
                  )}
                  {symbol ? ` ${symbol}` : ""}
                </p>
    </div>
  );
};
export default CoinMarketData;