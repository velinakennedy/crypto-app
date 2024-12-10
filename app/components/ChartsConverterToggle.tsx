import { MouseEventHandler } from "react";
import GradientButton from "./GradientButton";

const ChartsConverterToggle = ({
  coinActive,
  converterActive,
  handleCoinClick,
  handleConverterClick,
}: {
  coinActive: boolean;
  converterActive: boolean;
  handleCoinClick: MouseEventHandler;
  handleConverterClick: MouseEventHandler;
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="px-10 py-5 w-full max-w-[120rem]">
        <div className="flex justify-center bg-sheer-purple p-3 rounded-lg w-1/3 min-w-80">
          {coinActive ? (
            <GradientButton title="Coins" action={handleCoinClick} width="w-full" />
          ) : (
            <button className="bg-purple-secondary dark:bg-dark-modal-icon p-[1.3px] rounded-lg w-full dark:text-gray-400" onClick={handleCoinClick}>
              Coins
            </button>
          )}
          {converterActive ? (
            <GradientButton title="Convertor" action={handleConverterClick} width="w-full" />
          ) : (
            <button
              className="bg-purple-secondary dark:bg-dark-modal-icon p-[1.3px] rounded-lg w-full dark:text-gray-400"
              onClick={handleConverterClick}
            >
              Converter
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default ChartsConverterToggle;
