"use client";
import { useEffect, useState } from "react";
import { CoinAsset, CoinMarketData, PurchaseInfo } from "@/typings";
import { useGetCoinHistoryQuery } from "../redux/features/historicalCoinSlice";
import formatQueryDate from "@/utils/formatQueryDate";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import getPercentage from "@/utils/getPercentage";
import AssetItem from "./AssetItem";
import { MdEdit } from "react-icons/md";

const AssetList = ({ purchaseInfo }: { purchaseInfo?: PurchaseInfo }) => {
  const [assets, setAssets] = useState<CoinAsset[]>([]);
  const [editActive, setEditActive] = useState<boolean>(false);
  const currency = useSelector((state: RootState) => state.currency.value);
  const { currentData: historicalData, isSuccess } = useGetCoinHistoryQuery(
    { id: purchaseInfo ? purchaseInfo.coin.id : "", date: purchaseInfo ? formatQueryDate(purchaseInfo.date) : "" },
    { skip: purchaseInfo === undefined }
  );
  const formatDate = (date: string) => {
    const splitDate = date.split("-");
    return `${splitDate[1]}.${splitDate[2]}.${splitDate[0]}`;
  };

  const composeAsset = () => {
    if (purchaseInfo && purchaseInfo.amount) {
      const coin = purchaseInfo.coin as CoinMarketData;
      const asset: CoinAsset = {
        name: coin.name,
        id: coin.id,
        symbol: coin.symbol,
        image: coin.image,
        currentPrice: coin.current_price,
        priceChange24: coin.price_change_24h,
        marketVsVolume: getPercentage(coin.total_volume, coin.market_cap),
        circVsMaxSupply: coin.max_supply ? coin.circulating_supply / coin.max_supply : "N/A",
        amount: purchaseInfo.amount!,
        amountValue: purchaseInfo.amount * coin.current_price,
        gainLoss: (coin.current_price - historicalData.market_data.current_price[currency]) * purchaseInfo.amount,
        purchaseDate: formatDate(purchaseInfo.date),
      };
      setAssets([...assets, asset]);
      window.localStorage.setItem("assets", JSON.stringify([...assets, asset]));
    }
  };

  const removeAsset = (asset: CoinAsset) => {
    const updatedList = assets.filter((element) => element !== asset);
    window.localStorage.setItem("assets", JSON.stringify(updatedList));
    setAssets(updatedList);
  };

  useEffect(() => {
    if (purchaseInfo && isSuccess && historicalData) composeAsset();
  }, [historicalData, isSuccess]);

  useEffect(() => {
    const storedAssets = window.localStorage.getItem("assets");
    if (storedAssets) setAssets(JSON.parse(storedAssets));
  }, []);

  return (
    <div className="pb-28 md:pb-10">
      {assets.length > 0 ? (
        <div className="flex flex-col gap-5 py-10">
          {assets.map((asset, index) => (
            <AssetItem key={asset.symbol} asset={asset} removeAsset={removeAsset} edit={editActive} index={index} />
          ))}
        </div>
      ) : (
        <div className="p-10 text-center text-gray-500">Your portfolio is empty.</div>
      )}
      {assets.length > 0 && (
        <div className="w-full text-center">
          <button
            className="bg-purple-button dark:bg-purple-hover-dark p-4 hover:bg-purple-border rounded-full"
            onClick={() => setEditActive(!editActive)}
          >
            <MdEdit />
          </button>
        </div>
      )}
    </div>
  );
};
export default AssetList;
