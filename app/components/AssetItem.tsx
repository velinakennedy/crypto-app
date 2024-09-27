import { CoinAsset } from "@/typings";
import Image from "next/image";
import AssetDetail from "./AssetDetail";
import ProgressBar from "./ProgressBar";
import { GoXCircle } from "react-icons/go";
import Link from "next/link";
import formatCurrency from "@/utils/formatCurrency";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import PriceChange from "./PriceChange";

const AssetItem = ({ asset, removeAsset, edit }: { asset: CoinAsset; removeAsset: CallableFunction; edit: boolean }) => {
  const currency = useSelector((state: RootState) => state.currency.value);
  return (
    <div className="relative flex gap-10 bg-light-asset dark:bg-dark-modal-container rounded-lg text-purple-text dark:text-slate-50">
      <div className="flex flex-col justify-center gap-4 p-5">
        <div className="flex items-center gap-4">
          <Link href={`/coin/${asset.id}`}>
            <Image loader={() => asset.image} src={asset.image} width={35} height={35} alt="coin logo" />
          </Link>
          <div className="font-semibold text-xl xl:text-2xl">
            {asset.name} <span>({asset.symbol.toUpperCase()})</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-thin">Total Value</h2>
          <div className="flex items-end gap-2 font-semibold">
            <span className="text-xl xl:text-3xl">{formatCurrency(asset.amountValue, 6, false, currency)}</span>
            <span className="text-base xl:text-xl">
              <PriceChange value={asset.gainLoss} />
            </span>
          </div>
          <p className="font-thin text-gray-600 text-xs xl:text-sm dark:text-gray-400">Purchased {asset.purchaseDate}</p>
        </div>
      </div>
      <div className="gap-4 grid grid-cols-2 grid-rows-2 dark:bg-purple-dark-asset p-5 rounded-r-lg w-full h-full">
        <AssetDetail title="Current Price" value={formatCurrency(asset.currentPrice, 6, false, currency)} />
        <AssetDetail title="Price Change 24h" value={+asset.priceChange24.toFixed(4)} />
        <div className="flex flex-col justify-center gap-3 border-1 border-asset-detail-border p-3 rounded-lg">
          <div className="flex items-center gap-2 w-full">
            <p className="text-teal-positive">{asset.marketVsVolume}%</p>
            <ProgressBar percent={asset.marketVsVolume} fillColor="rgba(39, 208, 208, 1)" barColor="rgba(39, 208, 208, 0.3)" barWidth="70%" />
          </div>
          <p className="text-gray-600 text-xs xl:text-sm dark:text-gray-400">Market Cap vs Volume</p>
        </div>
        <AssetDetail
          title="Circ Supply vs Max Supply"
          value={typeof asset.circVsMaxSupply === "string" ? asset.circVsMaxSupply : +asset.circVsMaxSupply.toFixed(4)}
        />
      </div>
      {edit && (
        <div onClick={() => removeAsset(asset)} className="-top-2 -right-2 absolute font-thin text-lg cursor-pointer">
          <GoXCircle />
        </div>
      )}
    </div>
  );
};
export default AssetItem;
