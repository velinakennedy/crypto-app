"use client";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, SortDescriptor } from "@nextui-org/table";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useGetCoinTableQuery } from "../redux/features/coinTableSlice";
import formatMarketTableData from "@/utils/formatMarketTableData";
import { Key, useEffect, useMemo, useState } from "react";
import { MarketFormattedData, SortingTypes } from "@/typings";
import Image from "next/image";
import formatCurrency from "@/utils/formatCurrency";
import PriceChange from "./PriceChange";
import MarketChart from "./MarketChart";
import MarketTableBar from "./MarketTableBar";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "@nextui-org/spinner";
import { FaSort } from "react-icons/fa";
import Link from "next/link";
import { headers } from "@/utils/tableHeaders";

const MarketTable = () => {
  const currency = useSelector((state: RootState) => state.currency.value);
  const [queryInfo, setQueryInfo] = useState<any>({ skip: false, page: 1 });
  const { currentData, isSuccess } = useGetCoinTableQuery({ currency, page: queryInfo.page }, { skip: queryInfo.skip });
  const [formattedData, setFormattedData] = useState<MarketFormattedData[] | null>(null);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: undefined,
    direction: undefined,
  });

  const sortedData = useMemo(() => {
    if (formattedData) {
      if (sortDescriptor.column && sortDescriptor.direction) {
        return formattedData.sort((a, b) => {
          let first: SortingTypes = a[sortDescriptor.column as keyof MarketFormattedData];
          let second: SortingTypes = b[sortDescriptor.column as keyof MarketFormattedData];
          Array.isArray(first) ? (first = first[1]) : first;
          Array.isArray(second) ? (second = second[1]) : second;
          const compare = first < second ? -1 : first > second ? 1 : 0;

          return sortDescriptor.direction === "descending" ? -compare : compare;
        });
      } else {
        return formattedData;
      }
    }
  }, [sortDescriptor, formattedData]);

  const tableStyles = (header: string | Key) => {
    switch (header) {
      case "volumeDividedByCap":
      case "circulatingDividedByTotalSupply":
        return "xl:table-cell hidden";
      case "percent7d":
      case "marketCap":
        return "md:table-cell hidden";
      case "percent1h":
      case "percent24h":
        return "sm:table-cell hidden";
      default:
        return "table-cell";
    }
  };

  const renderCell = (item: MarketFormattedData, columnKey: Key) => {
    const cellValue = item[columnKey as keyof MarketFormattedData];
    const hasArray = Array.isArray(cellValue);
    switch (columnKey) {
      case "name":
        return (
          <div>
            {hasArray && (
              <Link href={`/coin/${cellValue[3]}`}>
                <div className="flex justify-center items-center gap-2 w-full">
                  <div className="sm:table-cell hidden min-w-10">
                    <Image loader={() => `${cellValue[0]}/w=auto`} src={cellValue[0] as string} width={30} height={30} alt="coin logo" />
                  </div>
                  <div className="sm:hidden text-center">
                    <Image loader={() => `${cellValue[0]}/w=auto`} src={cellValue[0] as string} width={20} height={20} alt="coin logo" />
                  </div>
                  <h2 className="sm:table-cell hidden">
                    {cellValue[1]}({cellValue[2]})
                  </h2>
                  <div className="sm:hidden text-center">
                    <h2>{cellValue[2]}</h2>
                    <p className="xs:text-[9px]">{cellValue[1]}</p>
                  </div>
                </div>
              </Link>
            )}
          </div>
        );
      case "price":
        return <div className="flex justify-center">{typeof cellValue === "number" && formatCurrency(cellValue, 3, true, currency)}</div>;
      case "percent1h":
      case "percent24h":
      case "percent7d":
        return <div className="flex justify-center">{typeof cellValue === "number" && <PriceChange value={cellValue} />}</div>;
      case "volumeDividedByCap":
      case "circulatingDividedByTotalSupply":
        return (
          <div>
            {hasArray && <MarketTableBar dividend={cellValue[0] as number} divisor={cellValue[1] as number} color={cellValue[2] as string} />}
          </div>
        );
      case "last7Days":
        return (
          <div className="flex justify-center">
            {hasArray && <MarketChart data={cellValue.slice(0, 2) as [number, number[]]} color={cellValue[2] as string} />}
          </div>
        );
      default:
        return <div className="flex justify-center">{cellValue}</div>;
    }
  };

  const fetchData = () => {
    setQueryInfo({ page: queryInfo.page + 1, skip: false });
  };

  useEffect(() => {
    if (currentData && isSuccess) {
      setFormattedData(formattedData ? [...formattedData, ...formatMarketTableData(currentData)] : formatMarketTableData(currentData));
      setQueryInfo({ ...queryInfo, skip: true });
    }
  }, [isSuccess, currentData, queryInfo, formattedData]);

  useEffect(() => {
    setFormattedData(null);
    setQueryInfo({ page: 1, skip: false });
  }, [currency]);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center w-full max-w-[120rem]">
        {formattedData ? (
          <div className="px-10 w-full">
            <InfiniteScroll dataLength={formattedData.length} next={fetchData} hasMore={true} loader={<Spinner label="loading..." color="current" />}>
              <Table
                removeWrapper
                sortDescriptor={sortDescriptor}
                onSortChange={setSortDescriptor}
                classNames={{
                  table: "bg-purple-secondary rounded-lg dark:bg-transparent",
                  th: "dark:text-gray-400 font-thin bg-transparent text-sm",
                  tr: "even:dark:bg-purple-secondary-dark even:bg-[#3c3d7d15]",
                  sortIcon: "hidden",
                  td: "md:dark:first:rounded-l-lg md:dark:[&:nth-child(2)]:rounded-none dark:[&:nth-child(2)]:rounded-l-lg dark:last:rounded-r-lg md:p-1",
                }}
                aria-label="Coin market table"
              >
                <TableHeader columns={headers}>
                  {(header) => (
                    <TableColumn key={header.key} allowsSorting={header.sortable} className={`${tableStyles(header.key)}`}>
                      <div className={`flex sm:gap-2 justify-center items-center ${header.sortable ? "hover:cursor-pointer" : ""}`}>
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
                        <TableCell className={`sm:p-3 text-xs md:text-base ${tableStyles(columnKey)}`}>{renderCell(item, columnKey)}</TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </InfiniteScroll>
          </div>
        ) : (
          <div className="flex justify-center w-full">
            <Spinner label="loading..." color="current" />
          </div>
        )}
      </div>
    </div>
  );
};
export default MarketTable;
