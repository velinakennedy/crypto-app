"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import GradientButton from "../components/GradientButton";
import { GoXCircle } from "react-icons/go";
import SearchCoinList from "./SearchCoinList";
import { Coin, PurchaseInfo } from "@/typings";
import { FaCoins } from "react-icons/fa";

const AssetsModal = ({
  handleAssetToggle,
  onAddAsset,
  handleNewCoin,
}: {
  handleAssetToggle: VoidFunction;
  onAddAsset: boolean;
  handleNewCoin: CallableFunction;
}) => {
  const [purchaseInfo, setPurchaseInfo] = useState<PurchaseInfo>({
    coin: { name: "No coin selected...", id: "", image: "", symbol: "" },
    amount: null,
    date: new Date(Date.now()).toISOString().slice(0, 10).toString(),
  });
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleCoin = (coin: Coin) => {
    handleInfo("coin", coin);
  };

  const handleInfo = (infoType: string, data?: Coin | number | string): void => {
    if (infoType === "coin") {
      if (typeof data === "object" && data.id.length > 0 && data.image.length > 0) {
        setPurchaseInfo({ ...purchaseInfo, coin: data });
      } else {
        setIsValid(false);
      }
    }
    if (infoType === "amount") {
      if (typeof data === "number" && data > 0) {
        setPurchaseInfo({ ...purchaseInfo, amount: data });
      } else {
        setPurchaseInfo({ ...purchaseInfo, amount: null });
      }
    }
    if (infoType === "date" && typeof data === "string") {
      const date = new Date(Date.now());
      const dateChosen = new Date(data);
      if (date > dateChosen) {
        setPurchaseInfo({ ...purchaseInfo, date: data });
      } else {
        setPurchaseInfo({ ...purchaseInfo, date: "" });
      }
    }
  };

  useEffect(() => {
    if (purchaseInfo.coin.id.length > 0 && purchaseInfo.amount && purchaseInfo.amount > 0 && purchaseInfo.date.length > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [purchaseInfo]);

  useEffect(() => {
    if (!onAddAsset) {
      setPurchaseInfo({
        coin: { name: "No coin selected...", id: "", image: "", symbol: "" },
        amount: null,
        date: new Date(Date.now()).toISOString().slice(0, 10).toString(),
      });
    }
  }, [onAddAsset]);

  return (
    <div>
      <div
        className={`z-10 h-full w-full fixed flex justify-center dark:text-white text-purple-text top-0 left-0 items-center backdrop-blur-sm dark:backdrop-brightness-125 ${
          onAddAsset ? "" : "hidden"
        }`}
      >
        <div
          className={`z-20 dark:bg-dark-modal bg-purple-secondary w-[80vw] lg:w-[56rem] sm:h-[65vh] max-h-[70rem] lg:max-h-[28rem] p-10 rounded-xl text-sm lg:text-base  ${
            onAddAsset ? "" : "hidden"
          }`}
        >
          <div className="flex justify-between">
            <h2 className="text-xl">Select coins</h2>
            <button className="font-thin text-2xl" onClick={handleAssetToggle}>
              <GoXCircle />
            </button>
          </div>
          <div className="flex lg:flex-row flex-col justify-center lg:justify-between items-center lg:items-stretch gap-6 py-7 w-full h-full">
            <div className="flex flex-col justify-center items-center gap-4 bg-light-modal-container dark:bg-dark-modal-container p-6 lg:p-10 rounded-lg w-2/3 sm:w-1/2 lg:w-1/3 h-1/3 lg:h-auto">
              <div className="bg-light-modal-icon dark:bg-dark-modal-icon dark:bg-opacity-30 p-2 lg:p-5 rounded-lg">
                {purchaseInfo.coin.image.length > 0 ? (
                  <Image
                    loader={() => purchaseInfo.coin.image}
                    src={purchaseInfo.coin.image}
                    width={40}
                    height={40}
                    alt="coin logo"
                    className="min-w-10 min-h-10"
                  />
                ) : (
                  <FaCoins className="lg:w-[40px] min-w-8 lg:h-[40px] min-h-8 text-white" />
                )}
              </div>
              <div className="text-center">
                {purchaseInfo.coin.name}{" "}
                <span className={`${purchaseInfo.coin.symbol ? "" : "hidden"}`}>({purchaseInfo.coin.symbol.toUpperCase()})</span>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-5 w-full sm:w-2/3">
              <SearchCoinList
                isSearchBar={false}
                placeholderText="Select Coin"
                width="w-full"
                color="bg-white"
                handleCoin={handleCoin}
                clearInput={!onAddAsset}
              />
              <input
                type="text"
                placeholder="Purchased Amount"
                onFocus={(e) => (e.target.placeholder = "e.g. 1")}
                onBlur={(e) => (e.target.placeholder = "Purchased Amount")}
                value={purchaseInfo.amount ? purchaseInfo.amount : ""}
                onChange={(e) => handleInfo("amount", +e.target.value)}
                className="dark:bg-purple-secondary-dark p-4 rounded-lg w-full dark:placeholder-gray-400 placeholder-purple-text"
              />
              <input
                className={`p-4 block w-full rounded-lg dark:bg-purple-secondary-dark !text-purple-text min-h-14 appearance-none text-left ${
                  purchaseInfo.date.length > 0 ? "dark:!text-white" : "dark:!text-gray-400"
                }`}
                onChange={(e) => handleInfo("date", e.target.value)}
                value={purchaseInfo.date}
                type="date"
              />
              <div className="flex gap-3">
                <GradientButton title="Cancel" action={handleAssetToggle} width="w-full" />
                {isValid ? (
                  <GradientButton title="Save and Continue" action={() => handleNewCoin(purchaseInfo)} width="w-full" />
                ) : (
                  <button className="bg-light-modal-container dark:bg-purple-secondary-dark p-[1.3px] rounded-lg w-full dark:text-gray-400" disabled>
                    Save and Continue
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AssetsModal;
