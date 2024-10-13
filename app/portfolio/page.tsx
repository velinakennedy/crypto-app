"use client";
import GradientButton from "../components/GradientButton";
import { useState } from "react";
import AssetsModal from "../components/AssetsModal";
import AssetList from "../components/AssetList";
import { PurchaseInfo } from "@/typings";
import CalculatorModal from "../components/CalculatorModal";

const PortfolioPage = () => {
  const [onAddAsset, setOnAddAsset] = useState(false);
  const [onCalculator, setOnCalculator] = useState(false);
  const [newCoin, setNewCoin] = useState<PurchaseInfo | null>(null);

  const handleAssetToggle = () => {
    setOnAddAsset(!onAddAsset);
  };

  const handleCalculatorToggle = () => {
    setOnCalculator(!onCalculator);
  };

  const handleNewCoin = (coin: PurchaseInfo) => {
    setNewCoin(coin);
    setOnAddAsset(false);
  };

  return (
    <div className="px-10">
      <AssetsModal handleAssetToggle={handleAssetToggle} onAddAsset={onAddAsset} handleNewCoin={handleNewCoin} />
      <CalculatorModal handleCalculatorToggle={handleCalculatorToggle} onCalculator={onCalculator} />
      <div className="flex md:flex-row flex-col md:justify-between gap-4 pt-3 md:pt-10">
        <h2 className="text-xl">Your Statistics</h2>
        <div className="flex gap-3 md:gap-5 text-xs md:text-base">
          <GradientButton title="Investments Calculator" action={() => setOnCalculator(true)} width="w-full md:w-60" />
          <GradientButton title="Add Assets" action={() => setOnAddAsset(true)} width="w-full md:w-60" />
        </div>
      </div>
      {newCoin ? (
        <div>
          <AssetList purchaseInfo={newCoin} />
        </div>
      ) : (
        <div>
          <AssetList />
        </div>
      )}
    </div>
  );
};
export default PortfolioPage;
