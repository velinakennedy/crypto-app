"use client";
import GradientButton from "../components/GradientButton";
import { useState } from "react";
import AssetsModal from "../components/AssetsModal";
import AssetList from "../components/AssetList";
import { PurchaseInfo } from "@/typings";

const PortfolioPage = () => {
  const [onAddAsset, setOnAddAsset] = useState(false);
  const [newCoin, setNewCoin] = useState<PurchaseInfo | null>(null);

  const handleAssetToggle = () => {
    setOnAddAsset(!onAddAsset);
  };

  const handleNewCoin = (coin: PurchaseInfo) => {
    setNewCoin(coin);
  };

  return (
    <div className="px-10">
      <AssetsModal handleAssetToggle={handleAssetToggle} onAddAsset={onAddAsset} handleNewCoin={handleNewCoin} />
      <div className="flex justify-between pt-10">
        <h2>Your Statistics</h2>
        <div className="flex gap-5">
          <GradientButton title="Investments Calculator" action={() => ""} />
          <GradientButton title="Add Assets" action={() => setOnAddAsset(true)} />
        </div>
      </div>
      {newCoin && (
        <div>
          <AssetList purchaseInfo={newCoin} />
        </div>
      )}
    </div>
  );
};
export default PortfolioPage;
