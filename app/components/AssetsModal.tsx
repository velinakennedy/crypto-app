"use client";
import Image from "next/image";
import { useState } from "react";
import GradientButton from "../components/GradientButton";
import { GoXCircle } from "react-icons/go";
import SearchCoinList from "./SearchCoinList";

const AssetsModal = ({ data, handleAssetToggle, onAddAsset }: { data: any, handleAssetToggle: VoidFunction, onAddAsset: boolean }) => {
  const [coin, setCoin] = useState<any>({name: "Your Coin", id: "ABC", image: ""});

  const handleCoin = (data: {name: string, id: string, image: string}): void => {
    setCoin(data);
  };

  return (
    <div>
      {data && (
        <div
          className={`z-10 h-full w-full fixed flex justify-center top-0 left-0 items-center backdrop-blur-sm ${
            onAddAsset ? "" : "hidden"
          }`}
        >
          <div
            className={`z-20 bg-black h-[28rem] w-[56rem] p-10 rounded-xl  ${
              onAddAsset ? "" : "hidden"
            }`}
          >
            <div className="flex justify-between">
              <h2 className="text-xl">Select coins</h2>
              <button
                className="text-2xl font-thin"
                onClick={handleAssetToggle}
              >
                <GoXCircle />
              </button>
            </div>
            <div className="flex justify-between gap-6 py-7">
              <div className="dark:bg-purple-market w-1/3 rounded-lg flex flex-col gap-4 justify-center items-center p-10">
                <div className="dark:bg-opacity-30 dark:bg-purple-hover-dark p-5 rounded-lg">
                <Image
                    loader={() => coin.image}
                    src={coin.image}
                    width={40}
                    height={40}
                    alt="coin logo"
                  />
                </div>
                <div className="text-center">{coin.name} ({coin.id})</div>
              </div>
              <div className="w-2/3 flex flex-col gap-5">
              <SearchCoinList data={data} isSearchBar={false} placeholderText="Select Coin" width="w-[33rem]" handleCoin={handleCoin}/>
                <input
                  type="text"
                  placeholder="Purchased Amount"
                  onFocus={(e) => e.target.placeholder="e.g. 1"}
                  onBlur={(e) => e.target.placeholder="Purchased Amount"}
                  className="p-4 w-full rounded-lg dark:bg-purple-secondary-dark dark:placeholder-gray-400"
                />
                <input
                  type="text"
                  placeholder="Purchase Date"
                  className="p-4 w-full rounded-lg dark:bg-purple-secondary-dark dark:placeholder-gray-400"
                />
                <div className="flex gap-3">
                  <GradientButton
                    title="Cancel"
                    action={handleAssetToggle}
                  />
                  <button className="w-full dark:bg-purple-secondary-dark dark:text-gray-400 rounded-lg">
                    Save and Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AssetsModal;
