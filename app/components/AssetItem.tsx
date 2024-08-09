import { CoinAsset } from "@/typings";
import Image from "next/image";
import AssetDetail from "./AssetDetail";
import ProgressBar from "./ProgressBar";
import { GoXCircle } from "react-icons/go";
import Link from "next/link";

const AssetItem = ({ asset, removeAsset }: { asset: CoinAsset; removeAsset: CallableFunction }) => {
  return (
    <div className="flex text-purple-text dark:text-white">
      <Link
        href={`/coin/${asset.id}`}
        className="flex flex-col justify-center items-center gap-4 bg-light-asset dark:bg-dark-modal-container p-10 rounded-l-lg w-1/4 cursor-pointer"
      >
        <div className="bg-light-modal-container dark:bg-dark-modal-icon dark:bg-opacity-30 p-5 rounded-lg">
          <Image loader={() => asset.image} src={asset.image} width={40} height={40} alt="coin logo" />
        </div>
        <div className="text-center">
          {asset.name} <span>({asset.symbol})</span>
        </div>
      </Link>
      <div className="flex flex-col bg-light-asset dark:bg-dark-modal-container p-5 rounded-r-lg w-full">
        <div className="flex justify-between items-start">
          <h2 className="pb-3 text-lg">Market Price</h2>
          <button className="font-thin text-xl" onClick={() => removeAsset(asset)}>
            <GoXCircle />
          </button>
        </div>
        <div className="flex justify-between">
          <AssetDetail title="Current Price:" value={asset.currentPrice} />
          <AssetDetail title="Price Change 24h:" value={+asset.priceChange24.toFixed(4)} />
          <div className="flex flex-col">
            <p className="text-sm">Market Cap vs Volume</p>
            <div className="flex justify-center items-center gap-3">
              <p className="text-teal-600 text-xs dark:text-teal-positive">{asset.marketVsVolume}%</p>
              <ProgressBar percent={asset.marketVsVolume} fillColor="rgba(39, 208, 208, 1)" barColor="rgba(39, 208, 208, 0.3)" barWidth="70%" />
            </div>
          </div>
          <AssetDetail
            title="Circ Supply vs Max Supply:"
            value={typeof asset.circVsMaxSupply === "string" ? asset.circVsMaxSupply : +asset.circVsMaxSupply.toFixed(4)}
          />
        </div>
        <div className="bg-purple-text dark:bg-white my-5 w-90 h-[0.5px]"></div>
        <h2 className="pb-3 text-lg">Your Coin</h2>
        <div className="flex justify-between">
          <AssetDetail title="Coin Amount:" value={asset.amount} />
          <AssetDetail title="Amount value:" value={+asset.amountValue.toFixed(2)} />
          <div className="flex flex-col">
            <p className="text-sm">
              <span className="text-teal-600 dark:text-teal-positive">Gain</span> / <span className="text-red-600 dark:text-red-negative">Loss</span>
            </p>
            <AssetDetail title="" value={+asset.gainLoss.toFixed(4)} />
          </div>
          <AssetDetail title="Purchase Date:" value={asset.purchaseDate} />
        </div>
      </div>
    </div>
  );
};
export default AssetItem;
