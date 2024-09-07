"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useGetPricesQuery } from "../redux/features/historicalCoinPriceSlice";
import SearchCoinList from "./SearchCoinList";
import GradientButton from "./GradientButton";
import CalculatorItem from "./CalculatorItem";
import TooltipItem from "./TooltipItem";
import { calculateInvestment, intervalPrices } from "@/utils/calculateInvestment";
import { vcaText, dcaText, tooltipText } from "@/utils/investmentText";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LineElement,
  LinearScale,
  PointElement,
  Legend,
  Tooltip as ChartTooltip,
  Filler,
  LineController,
} from "chart.js";
import formatModalChartData from "@/utils/formatModalChartData";
import { FaCoins } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";
import { GoXCircle } from "react-icons/go";
import { CalcResult, CalculatorInput, Coin, CoinMarketData, CoinPriceData, ModalChartDataOptions } from "@/typings";

const CalculatorModal = ({ handleCalculatorToggle, onCalculator }: { handleCalculatorToggle: VoidFunction; onCalculator: boolean }) => {
  const [coin, setCoin] = useState<CoinMarketData | Coin>({ name: "", id: "", image: "" });
  const [calculatorType, setCalculatorType] = useState<string>("VCA");
  const [skip, setSkip] = useState<boolean>(true);
  const [calcResult, setCalcResult] = useState<CalcResult>({ totalInvested: 0, coinsValue: 0 });
  const [coinPriceData, setCoinPriceData] = useState<CoinPriceData | undefined>(undefined);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [showChart, setShowChart] = useState<boolean>(false);
  const currency = useSelector((state: RootState) => state.currency.value);
  const [calculatorInput, setCalculatorInput] = useState<CalculatorInput>({
    from: "",
    to: "",
    interval: undefined,
    investment: undefined,
    growth: undefined,
  });
  const chartRef = useRef<ChartJS>(null);
  const [lineChartData, setLineChartData] = useState<ModalChartDataOptions>({ dataset: [], options: {}, labels: [] });
  const date = Date.now();
  ChartJS.register(CategoryScale, LineElement, LinearScale, PointElement, Legend, ChartTooltip, Filler, LineController);

  const { currentData, isSuccess, isFetching } = useGetPricesQuery(
    {
      id: coin.id,
      currency,
      days: Math.ceil((date - Date.parse(calculatorInput.from)) / 86400000),
    },
    { skip }
  );

  const handleCalculatorInput = (inputType: string, input: number | string) => {
    switch (inputType) {
      case "from":
        if (typeof input === "string") {
          if (input.length < 1) {
            setCalculatorInput({ ...calculatorInput, from: "" });
          } else if (calculatorInput.to.length > 0 && Date.parse(input) < Date.parse(calculatorInput.to)) {
            setCalculatorInput({ ...calculatorInput, from: input });
          } else if (calculatorInput.to === "") {
            setCalculatorInput({ ...calculatorInput, from: input });
          }
        }
        break;
      case "to":
        if (typeof input === "string")
          if (input.length < 1) {
            setCalculatorInput({ ...calculatorInput, to: "" });
          } else if (calculatorInput.from.length > 0 && Date.parse(input) > Date.parse(calculatorInput.from)) {
            setCalculatorInput({ ...calculatorInput, to: input });
          } else if (calculatorInput.from === "") {
            setCalculatorInput({ ...calculatorInput, to: input });
          }
        break;
      case "interval":
        if (typeof input === "number") {
          if (input > 0) {
            setCalculatorInput({ ...calculatorInput, interval: input });
          } else {
            setCalculatorInput({ ...calculatorInput, interval: undefined });
          }
        }
        break;
      case "investment":
        if (typeof input === "number") {
          if (input > 0) {
            setCalculatorInput({ ...calculatorInput, investment: input });
          } else {
            setCalculatorInput({ ...calculatorInput, investment: undefined });
          }
        }
        break;
      case "growth":
        if (typeof input === "number") {
          if (input > 0) {
            setCalculatorInput({ ...calculatorInput, growth: input });
          } else {
            setCalculatorInput({ ...calculatorInput, growth: undefined });
          }
        }
        break;
      default:
        break;
    }
  };

  const handleCoin = (coin: CoinMarketData) => {
    setCoin(coin);
  };

  const handleCalculatorType = (type: string) => {
    if (calculatorType !== type) setCalculatorType(type);
  };

  const handleCalculation = () => {
    if (
      isValid &&
      coinPriceData &&
      calculatorInput.interval &&
      calculatorInput.investment &&
      calculatorInput.growth &&
      chartRef &&
      chartRef.current
    ) {
      const pricesEachInterval = intervalPrices(
        coinPriceData.prices,
        Date.parse(calculatorInput.from),
        Date.parse(calculatorInput.to),
        calculatorInput.interval
      );
      const chartData = formatModalChartData(pricesEachInterval.priceArray, chartRef, coin.name);
      setLineChartData(chartData);
      const calcResult = calculateInvestment(calculatorType, calculatorInput.investment, pricesEachInterval.intervalCoins, calculatorInput.growth);
      setCalcResult({ totalInvested: calcResult.totalInvested, coinsValue: calcResult.coinsValue });
    }
  };

  useEffect(() => {
    if (!onCalculator) {
      setCoin({ name: "", id: "", image: "" });
      setCalculatorInput({
        from: "",
        to: "",
        interval: undefined,
        investment: undefined,
        growth: undefined,
      });
      setCalcResult({ totalInvested: 0, coinsValue: 0 });
      setCoinPriceData(undefined);
      setSkip(true);
      setShowChart(false);
      setLineChartData({ dataset: [], options: {}, labels: [] });
    }
  }, [onCalculator]);

  useEffect(() => {
    calculatorInput.from.length > 0 && coin.id.length > 0 ? setSkip(false) : setSkip(true);
  }, [calculatorInput.from, coin.id]);

  useEffect(() => {
    if (isSuccess && currentData && !isFetching) {
      setCoinPriceData(currentData);
      setSkip(true);
    }
  }, [currentData, isSuccess]);

  useEffect(() => {
    if (isFetching) setCoinPriceData(undefined);
  }, [isFetching, coinPriceData]);

  useEffect(() => {
    if (
      calculatorInput.from.length > 0 &&
      calculatorInput.to.length > 0 &&
      calculatorInput.interval &&
      calculatorInput.investment &&
      calculatorInput.growth &&
      coinPriceData
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [calculatorInput, coinPriceData, coin]);

  return (
    <div
      className={`${
        onCalculator ? "" : "hidden"
      } z-10 h-full w-full fixed flex justify-center dark:text-white text-purple-text top-0 left-0 items-center backdrop-blur-sm dark:backdrop-brightness-125`}
    >
      <div className="z-20 flex flex-col gap-5 bg-white dark:bg-dark-modal p-10 rounded-xl sm:w-[36rem] md:w-[46rem] lg:w-[56rem] h-[85vh] sm:max-h-[70rem] lg:max-h-[54rem] overflow-scroll scrollbar-hide">
        <div className="flex justify-between">
          <h2 className="text-2xl">Investments Calculator</h2>
          <button className="font-thin text-2xl" onClick={handleCalculatorToggle}>
            <GoXCircle />
          </button>
        </div>

        <div className="flex justify-between">
          <div className="flex justify-center items-center gap-4 bg-purple-secondary dark:bg-dark-modal-container p-2 rounded-lg w-1/3">
            <div className="bg-purple-button dark:bg-dark-modal-icon dark:bg-opacity-30 p-1 rounded-lg">
              {coin.image.length > 0 ? (
                <Image loader={() => coin.image} src={coin.image} width={30} height={30} alt="coin logo" />
              ) : (
                <FaCoins className="w-[20px] h-[20px] text-white" />
              )}
            </div>
            <div className="text-center">{coin.name}</div>
          </div>
          <SearchCoinList
            isSearchBar={false}
            placeholderText="Select Coin"
            width="w-[33rem] sm:w-[20rem] md:w-[27rem] lg:w-[33rem]"
            color="bg-purple-secondary"
            handleCoin={handleCoin}
            clearInput={!onCalculator}
          />
        </div>

        <div className="flex gap-4 w-full">
          {calculatorType === "VCA" ? (
            <GradientButton title="Value Cost Averaging" action={() => handleCalculatorType("VCA")} width="w-full" />
          ) : (
            <button
              className="bg-purple-secondary dark:bg-dark-modal-icon p-[1.3px] rounded-lg w-full dark:text-gray-400"
              onClick={() => handleCalculatorType("VCA")}
            >
              Value Cost Averaging
            </button>
          )}
          {calculatorType === "DCA" ? (
            <GradientButton title="Dollar Cost Averaging" action={() => handleCalculatorType("DCA")} width="w-full" />
          ) : (
            <button
              className="bg-purple-secondary dark:bg-dark-modal-icon p-[1.3px] rounded-lg w-full dark:text-gray-400"
              onClick={() => handleCalculatorType("DCA")}
            >
              Dollar Cost Averaging
            </button>
          )}
        </div>

        <div className="flex lg:flex-row sm:flex-col gap-4">
          <button
            className="flex justify-center items-center bg-slate-100 dark:bg-dark-modal-container px-3 py-3 rounded-lg w-20 sm:w-full lg:w-20 text-teal-500 dark:text-teal-positive"
            onClick={() => setShowChart(!showChart)}
            disabled={calcResult.coinsValue === 0 && calcResult.totalInvested === 0}
          >
            <FaChartLine />
          </button>
          <div className="flex justify-center items-center gap-3 bg-slate-100 dark:bg-dark-modal-container px-3 py-3 rounded-lg">
            <TooltipItem content={tooltipText.start} placement="right-start" color="dark:!bg-teal-700 !bg-teal-500" iconColor="purple-button" />
            <input
              className="bg-transparent text-teal-500 dark:text-teal-positive"
              type="datetime-local"
              onChange={(e) => handleCalculatorInput("from", e.target.value)}
              value={calculatorInput.from}
            />
          </div>
          <div className="flex justify-center items-center gap-3 bg-slate-100 dark:bg-dark-modal-container px-3 py-3 rounded-lg">
            <TooltipItem content={tooltipText.end} placement="right-start" color="dark:!bg-teal-700 !bg-teal-500" iconColor="purple-button" />
            <input
              className="bg-transparent text-teal-500 dark:text-teal-positive"
              type="datetime-local"
              onChange={(e) => handleCalculatorInput("to", e.target.value)}
              value={calculatorInput.to}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 bg-slate-100 dark:bg-purple-market px-6 py-4 rounded-lg">
          <div
            className={`relative flex flex-col justify-center items-center bg-purple-secondary dark:bg-purple-secondary-dark p-10 rounded-lg w-full h-[20vh] ${
              showChart ? "" : "hidden"
            }`}
          >
            <h1 className="pb-5 font-bold text-2xl text-purple-text md:text-lg dark:text-white self-start">{coin.name}</h1>
            <Chart
              type="line"
              ref={chartRef}
              options={lineChartData.options}
              data={{ labels: lineChartData.labels, datasets: lineChartData.dataset }}
              height="100%"
            />
          </div>
          <div className={`${showChart ? "hidden" : ""}`}>
            <CalculatorItem
              title="Contribution interval, days"
              isInput={true}
              content={tooltipText.interval}
              action={handleCalculatorInput}
              placeholder="Minimum 1"
              inputType="interval"
              value={calculatorInput.interval}
            />
            <CalculatorItem
              title="Initial investment, $"
              isInput={true}
              content={tooltipText.investment}
              action={handleCalculatorInput}
              placeholder="Minimum $1"
              inputType="investment"
              value={calculatorInput.investment}
            />
            <CalculatorItem
              title={calculatorType === "VCA" ? "Grow rate per interval, %" : "Funds added per interval, $"}
              isInput={true}
              content={tooltipText.growth}
              action={handleCalculatorInput}
              placeholder={calculatorType === "VCA" ? "Minimum 1%" : "Minimum $1"}
              inputType="growth"
              value={calculatorInput.growth}
            />
            <CalculatorItem title="Total amount spent on investments" isInput={false} content={tooltipText.total} result={calcResult.totalInvested} />
            <CalculatorItem title="Coins value, $" isInput={false} content={tooltipText.value} result={calcResult.coinsValue} isLast />
          </div>
        </div>

        {isValid ? (
          <GradientButton title={`Calculate (${calculatorType})`} action={handleCalculation} width="w-full" />
        ) : (
          <button
            className="bg-light-modal-container dark:bg-purple-secondary-dark opacity-70 p-[0.83rem] rounded-lg w-full dark:text-gray-400"
            disabled
          >
            {`Calculate (${calculatorType})`}
          </button>
        )}

        <p className="opacity-70 font-thin text-sm">{calculatorType === "VCA" ? vcaText : dcaText}</p>
      </div>
    </div>
  );
};
export default CalculatorModal;