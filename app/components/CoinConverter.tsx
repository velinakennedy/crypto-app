"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CoinConverterItem from "./CoinConverterItem";
import CoinConverterChart from "./CoinConverterChart";
import { useEditChartDataMutation, useGetChartDataQuery } from "../redux/features/coinChartInfoSlice";
import { TiArrowSync } from "react-icons/ti";
import { CoinDataItem, CoinData, CoinChartData, CoinMarketData, CoinPriceData, QueryParams } from "@/typings";
import { convert, convertAll } from "@/utils/convert";
import composeCoinItem from "@/utils/composeCoinItem";
import composeChartDataQuery from "@/utils/composeChartDataQuery";

const CoinConverter = ({ active }: { active: boolean }) => {
  const [fromCoin, setFromCoin] = useState<CoinMarketData | null>(null);
  const [toCoin, setToCoin] = useState<CoinMarketData | null>(null);
  const [amount, setAmount] = useState<number>(1);
  const [isSwitching, setIsSwitching] = useState<boolean>(false);
  const [queryParams, setQueryParams] = useState<QueryParams>({ skip: true, id: "" });
  const [chartData, setChartData] = useState<CoinChartData[] | null>(null);
  const [coinData, setCoinData] = useState<CoinPriceData>({ fromCoin: null, toCoin: null });

  const { prevStatus, status, from } = useSelector((state: RootState) => state.timeframe);
  const currency = useSelector((state: RootState) => state.currency.value);

  const [updateCoin] = useEditChartDataMutation();
  const { currentData, isSuccess } = useGetChartDataQuery(composeChartDataQuery(queryParams.id), { skip: queryParams.skip });

  const handleFromCoin = (data: CoinMarketData) => {
    setFromCoin(data);
  };

  const handleToCoin = (data: CoinMarketData) => {
    setToCoin(data);
  };

  const handleSwitch = () => {
    setIsSwitching(true);
    setFromCoin(toCoin);
    setToCoin(fromCoin);
    setCoinData({ fromCoin: coinData.toCoin, toCoin: coinData.fromCoin });
  };

  const handleAmount = (value: number) => {
    setAmount(value);
  };

  const handleCoinData = (data: CoinData) => {
    if (fromCoin && fromCoin.id === queryParams.id) {
      setCoinData({ ...coinData, fromCoin: composeCoinItem(queryParams.id, fromCoin.name, data) });
    } else if (toCoin && toCoin.id === queryParams.id) {
      setCoinData({ ...coinData, toCoin: composeCoinItem(queryParams.id, toCoin.name, data) });
    }
  };

  const handleDatasetUpdate = async () => {
    if (coinData.fromCoin && coinData.toCoin) {
      const currentCoins = [coinData.fromCoin, coinData.toCoin];
      const newCoinList: CoinDataItem[] = await Promise.all(
        currentCoins.map(async (coin: CoinDataItem) => {
          const response: any = await updateCoin(composeChartDataQuery(coin.id));
          return composeCoinItem(coin.id, coin.name, { ...response.data });
        })
      );
      setCoinData({ fromCoin: newCoinList[0], toCoin: newCoinList[1] });
    }
  };

  const formatChartData = () => {
    if (coinData.fromCoin && coinData.toCoin && coinData.fromCoin.data.prices && coinData.toCoin.data.prices && toCoin) {
      const convertedData = convertAll(coinData.fromCoin.data.prices, coinData.toCoin.data.prices, toCoin.name, from * 1000, status);
      setChartData(convertedData);
    }
  };

  useEffect(() => {
    if (status === "1Y" && prevStatus !== "1Y") {
      handleDatasetUpdate();
    } else if (status !== "1Y" && prevStatus === "1Y") {
      handleDatasetUpdate();
    } else {
      formatChartData();
    }
  }, [status]);

  useEffect(() => {
    handleDatasetUpdate();
  }, [currency]);

  useEffect(() => {
    if (isSuccess && currentData) {
      handleCoinData(currentData);
      setQueryParams({ ...queryParams, skip: true });
    }
  }, [isSuccess, currentData]);

  useEffect(() => {
    const prevFrom = coinData.fromCoin;
    const prevTo = coinData.toCoin;
    if (!isSwitching) {
      if (fromCoin && fromCoin.id !== prevFrom?.id) {
        setQueryParams({ skip: false, id: fromCoin.id });
      } else if (toCoin && toCoin.id !== prevTo?.id) {
        setQueryParams({ skip: false, id: toCoin.id });
      }
    }
  }, [fromCoin, toCoin]);

  useEffect(() => {
    if (fromCoin && toCoin) {
      formatChartData();
      if (isSwitching) {
        setIsSwitching(false);
      }
    }
  }, [coinData]);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-5 p-10 w-full max-w-[120rem]">
        <div>
          <h1 className="font-bold text-lg text-purple-text dark:text-slate-50">Online Currency Converter</h1>
        </div>
        <div className="relative flex justify-center items-center gap-8">
          <CoinConverterItem
            title="You sell"
            coin={fromCoin}
            handleCoin={handleFromCoin}
            amount={amount}
            handleAmount={handleAmount}
            active={active}
            bgColor="bg-purple-button dark:bg-dark-modal-icon"
          />
          <button
            className="absolute flex justify-center items-center bg-slate-50 rounded-full w-10 h-10 text-3xl text-purple-text"
            disabled={!fromCoin && !toCoin}
            onClick={handleSwitch}
          >
            <TiArrowSync />
          </button>
          <CoinConverterItem
            title="You buy"
            coin={toCoin}
            handleCoin={handleToCoin}
            convertedAmount={toCoin && fromCoin ? convert(amount, fromCoin.current_price, toCoin.current_price) : null}
            active={active}
            bgColor="bg-purple-button dark:bg-purple-hover-dark"
          />
        </div>
        <div className="relative flex flex-col justify-center items-center bg-purple-secondary dark:bg-purple-secondary-dark p-10 rounded-lg w-full h-[30vh] min-h-72">
          {chartData && fromCoin && toCoin ? (
            <CoinConverterChart name={{ fromCoin: fromCoin.name, toCoin: toCoin.name }} chartData={chartData} />
          ) : (
            <p>Please choose coins...</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default CoinConverter;
