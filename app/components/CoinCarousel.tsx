"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { removeCoin } from "../redux/features/activeCoinsSlice";
import chartLabels from "@/utils/chartLabels";
import CoinCharts from "./CoinCharts";
import { useGetChartDataQuery } from "../redux/features/coinChartInfoSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useGetCoinListQuery } from "../redux/features/coinListSlice";
import { useState } from "react";
import { CoinMarketData } from "@/typings";
import CoinCarouselItem from "./CoinCarouselItem";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import "swiper/css";
import "swiper/css/navigation";
import "../globals.css";

const CoinCarousel = ({to, from}: {to: number, from: number}) => {
    const [id, setId] = useState<string>("bitcoin");
    const activeCoins = useSelector((state: RootState) => state.activeCoins.value);
    const dispatch = useDispatch();
    const currency = useSelector((state: RootState) => state.currency.value);
    const { data: coinData, isSuccess: listIsSuccess, isLoading: listIsLoading } = useGetCoinListQuery(currency);
    const labels = chartLabels(to, from);
    const { currentData: chartData, isSuccess } = useGetChartDataQuery({
        id,
        currency,
        from,
        to,
    });
    const hasChartData: boolean = chartData && isSuccess;
    const hasCoinData: boolean = coinData && listIsSuccess && !listIsLoading;

    const handleSelection = (name: string): void => {
        const exists = activeCoins.find((coin) => coin.id == name);
        if (exists) {
            dispatch(removeCoin(name));
        } else if (activeCoins.length < 3 && !exists) {
            setId(name);
        }
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

  return (
     <div>
        {hasCoinData ? (
            <div className="w-full p-10">
            <Swiper modules={[ Navigation, Autoplay ]} spaceBetween={10}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: true,
                }}
                breakpoints={mediaBreaks}
                navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                }}
                >
                    <IoIosArrowDropleftCircle className="swiper-button-prev" />
                      {coinData.map((coin: CoinMarketData) => (
                          <SwiperSlide key={coin.id} onClick={() => handleSelection(coin.id)}><CoinCarouselItem coin={coin}/></SwiperSlide>
                      ))}
                      <IoIosArrowDroprightCircle className="swiper-button-next" />
                  </Swiper>
            </div>
        ): (
            <div>Loading...</div>
        )}
        <CoinCharts id={id} currentData={chartData} hasData={hasChartData} currentDate={to} labels={labels}/>
    </div>
  );
};
export default CoinCarousel;