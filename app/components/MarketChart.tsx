"use client";
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { useEffect, useState } from "react";
import formatMarketChartData from "@/utils/formatMarketChartData";
import MarketChartTooltip from "./MarketChartTooltip";

const MarketChart = ({ data, color }: { data: [number, number[]]; color: string }) => {
  const [lineChartData, setLineChartData] = useState<{ daysAgo: string; price: number }[] | undefined>(undefined);

  useEffect(() => {
    setLineChartData(formatMarketChartData(data[1]));
  }, [data]);

  return (
    <div>
      {lineChartData && (
        <div className="relative w-[10vw] min-w-20 sm:min-w-24 h-[4vh] min-h-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={lineChartData}>
              <defs>
                <linearGradient id="#c27621" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c27621" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#c27621" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="#6375c2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6375c2" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#6375c2" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="#d71dbd" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d71dbd" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#d71dbd" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="#27d0d0" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#27d0d0" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#27d0d0" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="#f06142" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f06142" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#f06142" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis dataKey="daysAgo" hide />
              <YAxis dataKey="price" domain={["auto", "dataMax"]} hide />
              <Tooltip content={<MarketChartTooltip color={color} />} />
              <Area dataKey="price" type="natural" fill={`url(#${color})`} fillOpacity={0.4} stroke={color} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
export default MarketChart;
