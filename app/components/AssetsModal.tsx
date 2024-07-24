"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import GradientButton from "../components/GradientButton";
import { GoXCircle } from "react-icons/go";
import SearchCoinList from "./SearchCoinList";
import { Coin, PurchaseInfo } from "@/typings";
import { FaCoins } from "react-icons/fa";

const AssetsModal = ({ handleAssetToggle, onAddAsset }: { handleAssetToggle: VoidFunction; onAddAsset: boolean }) => {
  const [purchaseInfo, setPurchaseInfo] = useState<PurchaseInfo>({
    coin: { name: "No coin selected...", id: "", image: "" },
    amount: null,
    date: "",
  });
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleCoin = (infoType: string, data?: Coin | number | string): void => {
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
        coin: { name: "No coin selected...", id: "", image: "" },
        amount: null,
        date: "",
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
        <div className={`z-20 dark:bg-dark-modal bg-purple-secondary h-[28rem] w-[56rem] p-10 rounded-xl  ${onAddAsset ? "" : "hidden"}`}>
          <div className="flex justify-between">
            <h2 className="text-xl">Select coins</h2>
            <button className="font-thin text-2xl" onClick={handleAssetToggle}>
              <GoXCircle />
            </button>
          </div>
          <div className="flex justify-between gap-6 py-7">
            <div className="flex flex-col justify-center items-center gap-4 bg-light-modal-container dark:bg-dark-modal-container p-10 rounded-lg w-1/3">
              <div className="bg-light-modal-icon dark:bg-dark-modal-icon dark:bg-opacity-30 p-5 rounded-lg">
                {purchaseInfo.coin.image.length > 0 ? (
                  <Image loader={() => purchaseInfo.coin.image} src={purchaseInfo.coin.image} width={40} height={40} alt="coin logo" />
                ) : (
                  <FaCoins className="w-[40px] h-[40px] text-white" />
                )}
              </div>
              <div className="text-center">
                {purchaseInfo.coin.name} <span className={`${purchaseInfo.coin.id ? "" : "hidden"}`}>({purchaseInfo.coin.id})</span>
              </div>
            </div>
            <div className="flex flex-col gap-5 w-2/3">
              <SearchCoinList isSearchBar={false} placeholderText="Select Coin" width="w-[33rem]" handleCoin={handleCoin} clearInput={!onAddAsset} />
              <input
                type="text"
                placeholder="Purchased Amount"
                onFocus={(e) => (e.target.placeholder = "e.g. 1")}
                onBlur={(e) => (e.target.placeholder = "Purchased Amount")}
                value={purchaseInfo.amount ? purchaseInfo.amount : ""}
                onChange={(e) => handleCoin("amount", +e.target.value)}
                className="dark:bg-purple-secondary-dark p-4 rounded-lg w-full dark:placeholder-gray-400 placeholder-purple-text"
              />
              <input
                className={`p-4 w-full rounded-lg dark:bg-purple-secondary-dark !text-purple-text ${
                  purchaseInfo.date.length > 0 ? "dark:!text-white" : "dark:!text-gray-400"
                }`}
                onChange={(e) => handleCoin("date", e.target.value)}
                value={purchaseInfo.date}
                type="datetime-local"
              />
              <div className="flex gap-3">
                <GradientButton title="Cancel" action={handleAssetToggle} />
                {isValid ? (
                  <GradientButton title="Save and Continue" action={() => alert("saved!")} width="w-full" />
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
