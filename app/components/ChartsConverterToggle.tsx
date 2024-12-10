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
        <div className="flex bg-sheer-purple p-3 w-1/3">
          {coinActive ? (
            <GradientButton title="Coins" action={handleCoinClick} width="w-full min-w-36" />
          ) : (
            <button
              className="bg-purple-secondary dark:bg-dark-modal-icon p-[1.3px] rounded-lg w-full min-w-36 dark:text-gray-400"
              onClick={handleCoinClick}
            >
              Coins
            </button>
          )}
          {converterActive ? (
            <GradientButton title="Convertor" action={handleConverterClick} width="w-full min-w-36" />
          ) : (
            <button
              className="bg-purple-secondary dark:bg-dark-modal-icon p-[1.3px] rounded-lg w-full min-w-36 dark:text-gray-400"
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
