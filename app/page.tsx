import ChartTimeframe from "./components/ChartTimeframe";
import CoinCarousel from "./components/CoinCarousel";
import MarketTable from "./components/MarketTable";

export default function Home() {
  return (
    <div>
      <CoinCarousel/>
      <ChartTimeframe/>
      <MarketTable/>
    </div>
  );
}
