"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { editCoins, removeCoin } from "../redux/features/activeCoinsSlice";
import CoinCharts from "./CoinCharts";
import { useEditChartDataMutation, useGetChartDataQuery } from "../redux/features/coinChartInfoSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useGetCoinListQuery } from "../redux/features/coinListSlice";
import { useEffect, useState } from "react";
import { ActiveCoin, CoinChartData, CoinMarketData } from "@/typings";
import CoinCarouselItem from "./CoinCarouselItem";
import Image from "next/image";
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";
import "swiper/css";
import "swiper/css/navigation";
import "../globals.css";

const CoinCarousel = () => {
  const [id, setId] = useState<string>("");
  const [skip, setSkip] = useState<boolean>(true);
  const activeCoins = useSelector((state: RootState) => state.activeCoins.value);
  const { prevStatus, status, to, from } = useSelector((state: RootState) => state.timeframe);
  const dispatch = useDispatch();
  const currency = useSelector((state: RootState) => state.currency.value);
  const { data: coinData, isSuccess: listIsSuccess, isLoading: listIsLoading } = useGetCoinListQuery(currency);
  const { currentData: chartData, isSuccess } = useGetChartDataQuery(
    {
      id,
      currency,
      from: status === "1Y" ? Math.floor(from) : Math.floor(to - 2629743),
      to: Math.floor(to),
    },
    { skip }
  );
  const [updateCoin, { isSuccess: updateSuccessful }] = useEditChartDataMutation();
  const hasChartData: boolean = chartData && isSuccess;
  const hasCoinData: boolean = coinData && listIsSuccess && !listIsLoading;
  const isUpdated = hasCoinData || updateSuccessful;

  const handleSelection = (name: string): void => {
    const exists = activeCoins.find((coin: ActiveCoin) => coin.id == name);
    if (exists) {
      dispatch(removeCoin(name));
      setSkip(true);
    } else if (activeCoins.length < 3 && !exists) {
      setId(name);
      setSkip(false);
    }
  };

  const handleDatasetUpdate = async () => {
    const newCoinList: ActiveCoin[] = await Promise.all(
      activeCoins.map(async (coin: ActiveCoin) => {
        const response: CoinChartData | any = await updateCoin({
          id: coin.id,
          currency,
          from: status === "1Y" ? Math.floor(from) : Math.floor(to - 2629743),
          to: Math.floor(to),
        });
        const newCoin: ActiveCoin = {
          id: coin.id,
          data: { ...response.data },
        };
        return newCoin;
      })
    );
    dispatch(editCoins(newCoinList));
  };

  const mediaBreaks = {
    600: {
      slidesPerView: 2,
    },
    780: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 5,
    },
    1400: {
      slidesPerView: 6,
    },
    1680: {
      slidesPerView: 7,
    },
  };

  useEffect(() => {
    if (activeCoins.length === 0) handleSelection("bitcoin");
  }, [activeCoins]);

  useEffect(() => {
    if (status === "1Y" && prevStatus !== "1Y") handleDatasetUpdate();
    if (status !== "1Y" && prevStatus === "1Y") handleDatasetUpdate();
  }, [status]);

  useEffect(() => {
    if (isSuccess && chartData) {
      setSkip(true);
    }
  }, [isSuccess, chartData]);

  useEffect(() => {
    handleDatasetUpdate();
  }, [currency]);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center w-full max-w-[120rem]">
        {isUpdated ? (
          <div className="px-10 pt-10 w-full">
            <Swiper
              className="!pb-7"
              modules={[Navigation, Autoplay]}
              spaceBetween={10}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              breakpoints={mediaBreaks}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
            >
              <IoIosArrowDropleftCircle className="swiper-button-prev" />
              {coinData.map((coin: CoinMarketData) => (
                <SwiperSlide key={coin.id} onClick={() => handleSelection(coin.id)}>
                  <CoinCarouselItem coin={coin} />
                </SwiperSlide>
              ))}
              <IoIosArrowDroprightCircle className="swiper-button-next" />
            </Swiper>

            <div className="flex flex-wrap gap-3">
              {activeCoins.map((coin) => {
                const coinInfo = coinData.find((coinData: CoinMarketData) => coinData.id === coin.id);
                return (
                  <div
                    onClick={() => handleSelection(coin.id)}
                    key={coin.id}
                    className="flex items-center gap-2 bg-purple-hover dark:bg-purple-hover-dark p-2 rounded-lg"
                  >
                    <Image loader={() => `${coinInfo.image}/w=auto`} src={coinInfo.image} width={20} height={20} alt="coin logo" />
                    <h3 className="text-sm">{coinInfo.name}</h3>
                    <CiCircleRemove />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
        <CoinCharts id={id} currentData={chartData || updateCoin} hasData={hasChartData} />
      </div>
    </div>
  );
};
export default CoinCarousel;
