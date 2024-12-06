import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";

const composeChartDataQuery = (id: string) => {
  const { status, to, from } = useSelector((state: RootState) => state.timeframe);
  const currency = useSelector((state: RootState) => state.currency.value);
  return {
    id,
    currency,
    from: status === "1Y" ? Math.floor(from) : Math.floor(to - 2629743),
    to: Math.floor(to),
  };
};
export default composeChartDataQuery;
