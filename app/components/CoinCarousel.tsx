"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { removeCoin } from "../redux/features/activeCoinsSlice";
import CoinCharts from "./CoinCharts";
import { useGetChartDataQuery } from "../redux/features/coinChartInfoSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useGetCoinListQuery } from "../redux/features/coinListSlice";
import { useEffect, useState } from "react";
import { CoinMarketData } from "@/typings";
import CoinCarouselItem from "./CoinCarouselItem";
import Image from "next/image";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";
import "swiper/css";
import "swiper/css/navigation";
import "../globals.css";

const CoinCarousel = () => {
  const [id, setId] = useState<string>("");
  const [skip, setSkip] = useState<boolean>(true);
  const activeCoins = useSelector(
    (state: RootState) => state.activeCoins.value
  );
  const {status, to, from} = useSelector (
    (state: RootState ) => state.timeframe
  );
  const dispatch = useDispatch();
  const currency = useSelector((state: RootState) => state.currency.value);
  const {
    data: coinData,
    isSuccess: listIsSuccess,
    isLoading: listIsLoading,
  } = useGetCoinListQuery(currency);
  const { currentData: chartData, isSuccess } = useGetChartDataQuery(
    {
      id,
      currency,
      from: Math.floor(from),
      to: Math.floor(to),
    },
    { skip }
  );
  const hasChartData: boolean = chartData && isSuccess;
  const hasCoinData: boolean = coinData && listIsSuccess && !listIsLoading;

  const handleSelection = (name: string): void => {
    const exists = activeCoins.find((coin) => coin.id == name);
    if (exists) {
      dispatch(removeCoin(name));
      setSkip(true);
    } else if (activeCoins.length < 3 && !exists) {
      setId(name);
      setSkip(false);
    }
  };

  const handleTimeChange = () => {
    activeCoins.map((coin) => (
      setId(coin.id),
      setSkip(false)
    ));
  };

  const mediaBreaks = {
    640: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 4,
    },
    1024: {
      slidesPerView: 5,
    },
    1300: {
      slidesPerView: 6,
    },
    1680: {
      slidesPerView: 7,
    },
    2100: {
      slidesPerView: 10,
    },
  };

  useEffect(() => {
    handleSelection("bitcoin");
  }, []);

  useEffect(() => {
    handleTimeChange();
  }, [status]);

  return (
    <div>
      {hasCoinData ? (
        <div className="w-full px-10 pt-10">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={10}
            autoplay={{
              delay: 2000,
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
              <SwiperSlide
                key={coin.id}
                onClick={() => handleSelection(coin.id)}
              >
                <CoinCarouselItem coin={coin} />
              </SwiperSlide>
            ))}
            <IoIosArrowDroprightCircle className="swiper-button-next" />
          </Swiper>
          
          <div className="flex gap-3 mt-7">
            {activeCoins.map((coin) => {
              const coinInfo = coinData.find(
                (coinData: CoinMarketData) => coinData.id === coin.id
              );
              return (
                <div
                  onClick={() => handleSelection(coin.id)}
                  key={coin.id}
                  className="flex items-center gap-2 p-2 rounded-lg bg-purple-hover dark:bg-purple-hover-dark"
                >
                  <Image
                    loader={() => `${coinInfo.image}/w=auto`}
                    src={coinInfo.image}
                    width={20}
                    height={20}
                    alt="coin logo"
                  />
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
      <CoinCharts
        id={id}
        currentData={chartData}
        hasData={hasChartData}
        currentDate={to}
      />
    </div>
  );
};
export default CoinCarousel;
