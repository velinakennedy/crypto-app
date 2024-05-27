"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  SortDescriptor,
} from "@nextui-org/table";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useGetCoinTableQuery } from "../redux/features/coinTableSlice";
import formatMarketTableData from "@/utils/formatMarketTableData";
import { Key, useCallback, useEffect, useMemo, useState } from "react";
import { MarketFormattedData, SortingTypes } from "@/typings";
import Image from "next/image";
import formatCurrency from "@/utils/formatCurrency";
import PriceChange from "./PriceChange";
import MarketChart from "./MarketChart";
import MarketTableBar from "./MarketTableBar";
import InfiniteScroll from "react-infinite-scroll-component";
import {Spinner} from "@nextui-org/spinner";
import { FaSort } from "react-icons/fa";
import Link from "next/link";

const MarketTable = () => {
  const currency = useSelector((state: RootState) => state.currency.value);
  const [queryInfo, setQueryInfo] = useState<any>({skip: false, page: 1});
  const { currentData, isSuccess } = useGetCoinTableQuery({currency, page: queryInfo.page}, { skip: queryInfo.skip });
  const [formattedData, setFormattedData] = useState<
    MarketFormattedData[] | null
  >(null);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: undefined,
    direction: undefined,
  });
  const headers = [
    { key: "marketCap", title: "#", sortable: true },
    { key: "name", title: "Name", sortable: true },
    { key: "price", title: "Price", sortable: true },
    { key: "1hPercentage", title: "1h%", sortable: true },
    { key: "24hPercentage", title: "24h%", sortable: true },
    { key: "7dPercentage", title: "7d%", sortable: true },
    {
      key: "volumeDividedByCap",
      title: "24h Volume/Market Cap",
      sortable: false,
    },
    {
      key: "circulatingDividedByTotalSupply",
      title: "Circulating/Total Supply",
      sortable: false,
    },
    { key: "last7Days", title: "Last 7d", sortable: false },
  ];
  const sortedData = useMemo(() => {
    if (formattedData) {
      return formattedData.sort((a, b) => {
        let first: SortingTypes =
          a[sortDescriptor.column as keyof MarketFormattedData];
        let second: SortingTypes =
          b[sortDescriptor.column as keyof MarketFormattedData];
        Array.isArray(first) ? (first = first[1]) : first;
        Array.isArray(second) ? (second = second[1]) : second;
        const compare = first < second ? -1 : first > second ? 1 : 0;

        return sortDescriptor.direction === "descending" ? -compare : compare;
      });
    }
  }, [sortDescriptor, formattedData]);

  const renderCell = useCallback(
    (item: MarketFormattedData, columnKey: Key) => {
      const cellValue = item[columnKey as keyof MarketFormattedData];
      const hasArray = Array.isArray(cellValue);
      switch (columnKey) {
        case "name":
          return (
            <>
              {hasArray && (
                <Link href={`/coin/${cellValue[2]}`}>
                    <div className="flex gap-2 items-center justify-center w-full">
                      <div className="min-w-10">
                      <Image
                        loader={() => `${cellValue[0]}/w=auto`}
                        src={cellValue[0] as string}
                        width={30}
                        height={30}
                        alt="coin logo"
                      />
                      </div>
                      <h2>{cellValue[1]}</h2>
                    </div>
                </Link>
              )}
            </>
          );
        case "price":
          return (
            <div className="flex justify-center">
              {typeof cellValue === "number" &&
                formatCurrency(cellValue, 3, true, currency)}
            </div>
          );
        case "1hPercentage":
        case "24hPercentage":
        case "7dPercentage":
          return (
            <div className="flex justify-center">
              {typeof cellValue === "number" && (
                <PriceChange value={cellValue} />
              )}
            </div>
          );
        case "volumeDividedByCap":
        case "circulatingDividedByTotalSupply":
          return (
            <div>
              {hasArray && (
                <MarketTableBar
                  dividend={cellValue[0] as number}
                  divisor={cellValue[1] as number}
                  color={cellValue[2] as string}
                />
              )}
            </div>
          );
        case "last7Days":
          return (
            <div className="flex justify-center">
              {hasArray && (
                <MarketChart data={cellValue as [number, number[]]} />
              )}
            </div>
          );
        default:
          return <div className="flex justify-center">{cellValue}</div>;
      }
    },
    [currency]
  );

  const fetchData = () => {
    setQueryInfo({page: queryInfo.page + 1, skip: false});
  };

  useEffect(() => {
    if (currentData && isSuccess) {
      setFormattedData(formattedData ? [...formattedData, ...formatMarketTableData(currentData)]: formatMarketTableData(currentData));
      setQueryInfo({...queryInfo, skip: true});
    }
  }, [isSuccess, currentData, queryInfo, formattedData]);
  return (
    <div>
      {formattedData ? (
        <div className="px-10 w-full">
          <InfiniteScroll
          dataLength={formattedData.length}
          next={fetchData}
          hasMore={true}
          loader={<Spinner label="loading..." color="current" />}
        >
          <Table
          removeWrapper
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
          classNames={{
            table: "bg-purple-secondary rounded-lg dark:bg-transparent",
            th: "dark:text-gray-400 font-thin bg-transparent text-sm",
            tr: "even:dark:bg-purple-secondary-dark even:bg-[#3c3d7d15]",
            sortIcon: "hidden",
            td: "dark:first:rounded-l-lg dark:last:rounded-r-lg",
          }}
          aria-label="Coin market table"
        >
          <TableHeader columns={headers}>
            {(header) => (
              <TableColumn key={header.key} allowsSorting={header.sortable}>
                <div className={`flex gap-2 justify-center items-center ${header.sortable ? "hover:cursor-pointer": ""}`}>
                  {header.title}
                  {header.sortable && <FaSort />}
                </div>
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={sortedData}>
            {(item) => (
              <TableRow key={item.marketCap}>
                {(columnKey) => (
                  <TableCell className="p-3">
                    {renderCell(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
        </InfiniteScroll>
        </div>
      ) : (
        <div className="w-full flex justify-center"><Spinner label="loading..." color="current" /></div>
      )}
    </div>
  );
};
export default MarketTable;
