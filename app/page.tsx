import CoinCarousel from "./components/CoinCarousel";
import MarketTable from "./components/MarketTable";
export default function Home() {
  const to = Math.floor(Date.now() / 1000);
  const from = to - 86400;
  return (
    <div>
      <CoinCarousel to={to} from={from}/>
      <MarketTable/>
    </div>
  );
}
