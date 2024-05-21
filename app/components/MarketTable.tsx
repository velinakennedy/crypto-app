"use client";
import React from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
  } from "@nextui-org/table";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useGetCoinTableQuery } from "../redux/features/coinTableSlice";
import formatMarketTableData from "@/utils/formatMarketTableData";
import { Key, useCallback, useEffect, useState } from "react";
import { MarketFormattedData } from "@/typings";
import Image from "next/image";
import formatCurrency from "@/utils/formatCurrency";
import PriceChange from "./PriceChange";
import MarketChart from "./MarketChart";
import MarketTableBar from "./MarketTableBar";

const MarketTable = () => {
  const currency = useSelector((state: RootState) => state.currency.value);
  const { currentData, isSuccess } = useGetCoinTableQuery(currency);
  const [formattedData, setFormattedData] = useState<MarketFormattedData[] | null>(null);
  const renderCell = useCallback((item: MarketFormattedData, columnKey: Key) => {
    const cellValue = item[columnKey as keyof MarketFormattedData];
    const hasArray = Array.isArray(cellValue);

    switch(columnKey) {
      case "name":
        return (
          <div>
            {hasArray && (
              <div className="flex gap-2 items-center w-full">
              <div className="flex justify-center w-full min-w-10">
                <Image 
                loader={() => `${cellValue[0]}/w=auto`}
                src={cellValue[0].toString()}
                width={30}
                height={30}
                alt="coin logo"
                />
              </div>
                <h2 className="w-full">{cellValue[1]}</h2>
            </div>
            )}
          </div>
        );
      case "price":
        return (
          <div className="flex justify-center">
            {typeof cellValue === "number" && (
              formatCurrency(cellValue, 3, true, currency)
            )}
          </div>
        );
      case "1hPercentage": case "24hPercentage": case "7dPercentage":
        return (
          <div className="flex justify-center">
            {typeof cellValue === "number" && (
              <PriceChange value={cellValue} />
            )}
          </div>
        );
      case "volumeDividedByCap": case "circulatingDividedByTotalSupply":
        return (
          <div>
            {hasArray && (
              <MarketTableBar dividend={cellValue[0]} divisor={[cellValue[1]]}/>
            )}
          </div>
        );
      case "last7Days":
        return (
          <div className="flex justify-center">
            {hasArray && (
              <MarketChart data={cellValue} />
            )}
          </div>
        );
      default: 
        return cellValue;
    }
  }, [currency]);
  useEffect(() => {
    if (currentData && isSuccess) {
      setFormattedData(formatMarketTableData(currentData));
    }
  }, [isSuccess, currentData]);
  return (
    <div>
      {formattedData ? (
        <Table className="px-10" aria-label="Example static collection table">
        <TableHeader>
          <TableColumn key="marketCap">#</TableColumn>
          <TableColumn key="name">Name</TableColumn>
          <TableColumn key="price">Price</TableColumn>
          <TableColumn key="1hPercentage">1h%</TableColumn>
          <TableColumn key="24hPercentage">24h%</TableColumn>
          <TableColumn key="7dPercentage">7d%</TableColumn>
          <TableColumn key="volumeDividedByCap">24h Volume/Market Cap</TableColumn>
          <TableColumn key="circulatingDividedByTotalSupply">Circulating/Total Supply</TableColumn>
          <TableColumn key="last7Days">Last 7d</TableColumn>
        </TableHeader>
        <TableBody items={formattedData}>
          {(item) => (
            <TableRow key={item.marketCap}>
              {(columnKey) => <TableCell className="p-5">{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      ): <div>Loading...</div>}
    </div>
  );
};
export default MarketTable;