import Image from "next/image";
import { motion } from "framer-motion";
import AssetDetail from "./AssetDetail";
import ProgressBar from "./ProgressBar";
import { GoXCircle } from "react-icons/go";
import Link from "next/link";
import formatCurrency from "@/utils/formatCurrency";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import PriceChange from "./PriceChange";
import { CoinAsset } from "@/typings";

const AssetItem = ({ asset, removeAsset, edit, index }: { asset: CoinAsset; removeAsset: CallableFunction; edit: boolean; index: number }) => {
  const currency = useSelector((state: RootState) => state.currency.value);
  return (
    <motion.div
      animate={edit ? { rotate: index % 2 === 0 ? [0, 0.5, 0] : [0, -0.5, 0], transition: { repeat: Infinity, duration: 1 } } : { rotate: [0] }}
      className="relative flex md:flex-row flex-col bg-light-asset dark:bg-dark-modal-container rounded-lg w-full h-72 md:h-56 text-purple-text dark:text-slate-50"
    >
      <div className="items-center gap-4 grid grid-rows-3 p-5 md:w-1/3 h-2/6 md:h-full">
        <div className="flex justify-between md:justify-normal items-center gap-4">
          <Link href={`/coin/${asset.id}`} className="md:inline-block hidden">
            <Image loader={() => asset.image} src={asset.image} width={35} height={35} alt="coin logo" />
          </Link>
          <div className="font-thin md:font-semibold text-base xl:text-2xl">
            {asset.name} <span>({asset.symbol.toUpperCase()})</span>
          </div>
          <Link href={`/coin/${asset.id}`} className="md:hidden">
            <Image loader={() => asset.image} src={asset.image} width={35} height={35} alt="coin logo" />
          </Link>
        </div>
        <div className="flex flex-col md:gap-2">
          <h2 className="md:inline-block hidden font-thin">Total Value</h2>
          <div className="flex items-end gap-2 font-semibold">
            <span className="text-xl xl:text-3xl">{formatCurrency(asset.amountValue, 6, false, currency)}</span>
            <span className="text-base xl:text-xl">
              <PriceChange value={asset.gainLoss} />
            </span>
          </div>
        </div>
        <p className="row-start-2 md:row-start-3 row-end-2 md:row-end-3 font-thin text-gray-600 text-xs xl:text-sm dark:text-gray-400">
          Purchased {asset.purchaseDate}
        </p>
      </div>
      <div className="gap-2 sm:gap-4 grid grid-cols-2 grid-rows-2 dark:bg-purple-dark-asset p-5 rounded-r-lg md:w-2/3 h-4/6 md:h-full text-xs sm:text-sm md:text-base">
        <AssetDetail title="Current Price" value={formatCurrency(asset.currentPrice, 6, false, currency)} />
        <AssetDetail title="Price Change 24h" value={+asset.priceChange24.toFixed(4)} />
        <div className="flex flex-col justify-center gap-1 md:gap-3 border-1 border-asset-detail-border p-3 rounded-lg">
          <div className="flex items-center gap-2 w-full">
            <p className="text-teal-positive">{asset.marketVsVolume}%</p>
            <ProgressBar percent={asset.marketVsVolume} fillColor="rgba(39, 208, 208, 1)" barColor="rgba(39, 208, 208, 0.3)" barWidth="70%" />
          </div>
          <p className="text-[10px] text-gray-600 xl:text-sm dark:text-gray-400">Market Cap vs Volume</p>
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
    </motion.div>
  );
};
export default AssetItem;
