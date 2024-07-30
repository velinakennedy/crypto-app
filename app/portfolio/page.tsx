"use client";
import GradientButton from "../components/GradientButton";
import { useState } from "react";
import AssetsModal from "../components/AssetsModal";

const PortfolioPage = () => {
  const [onAddAsset, setOnAddAsset] = useState(false);

  const handleAssetToggle = () => {
    setOnAddAsset(!onAddAsset);
  };

  return (
    <div className="px-10">
      <AssetsModal handleAssetToggle={handleAssetToggle} onAddAsset={onAddAsset} />
      <div className="flex justify-between">
        <h2>Your Statistics</h2>
        <div className="flex gap-5">
          <GradientButton title="Investments Calculator" action={() => ""} />
          <GradientButton title="Add Assets" action={() => setOnAddAsset(true)} />
        </div>
      </div>
    </div>
  );
};
export default PortfolioPage;
