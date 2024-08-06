"use client";
import { useEffect, useState } from "react";
import { CoinAsset, CoinMarketData, PurchaseInfo } from "@/typings";
import { useGetCoinHistoryQuery } from "../redux/features/historicalCoinSlice";
import formatQueryDate from "@/utils/formatQueryDate";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import getPercentage from "@/utils/getPercentage";

const AssetList = ({ purchaseInfo }: { purchaseInfo: PurchaseInfo }) => {
  const [assets, setAssets] = useState<CoinAsset[]>([]);
  const currency = useSelector((state: RootState) => state.currency.value);
  const { currentData: historicalData, isSuccess } = useGetCoinHistoryQuery({ id: purchaseInfo.coin.id, date: formatQueryDate(purchaseInfo.date) });

  const composeAsset = () => {
    if (purchaseInfo.amount) {
      const coin = purchaseInfo.coin as CoinMarketData;
      const asset: CoinAsset = {
        currentPrice: coin.current_price,
        priceChange24: coin.price_change_24h,
        marketVsVolume: getPercentage(coin.total_volume, coin.market_cap),
        circVsMaxSupply: coin.max_supply ? coin.circulating_supply / coin.max_supply : "N/A",
        amount: purchaseInfo.amount!,
        amountValue: purchaseInfo.amount * coin.current_price,
        gainLoss: (coin.current_price - historicalData.market_data.current_price[currency]) * purchaseInfo.amount,
        purchaseDate: purchaseInfo.date,
      };
      setAssets([...assets, asset]);
    }
  };

  useEffect(() => {
    if (isSuccess && historicalData) composeAsset();
  }, [historicalData, isSuccess]);

  return <div>Asset</div>;
};
export default AssetList;
