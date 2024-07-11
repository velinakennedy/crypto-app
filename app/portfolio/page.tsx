"use client";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useGetCoinListQuery } from "../redux/features/coinListSlice";
import GradientButton from "../components/GradientButton";
import { useState } from "react";
import AssetsModal from "../components/AssetsModal";

const PortfolioPage = () => {
  const [onAddAsset, setOnAddAsset] = useState(false);
  const currency = useSelector((state: RootState ) => state.currency.value);
  const { data } = useGetCoinListQuery(currency);

  const handleAssetToggle = () => {
    setOnAddAsset(!onAddAsset);
  };

  return (
    <div className="px-10">
      {data && <AssetsModal data={data} handleAssetToggle={handleAssetToggle} onAddAsset={onAddAsset} />}
      <div className="flex justify-between">
        <h2>Your Statistics</h2>
        <div className="flex gap-5">
          <GradientButton title="Investments Calculator" action={() => ""} />
          <GradientButton
            title="Add Assets"
            action={() => setOnAddAsset(true)}
          />
        </div>
      </div>
    </div>
  );
};
export default PortfolioPage;