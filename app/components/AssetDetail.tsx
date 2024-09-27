import PriceChange from "./PriceChange";

const AssetDetail = ({ title, value }: { title: string; value: string | number }) => {
  return (
    <div className="flex flex-col justify-center gap-3 border-1 border-asset-detail-border p-3 rounded-lg">
      {title === "Current Price" ? <p>{title === "Current Price" ? value : `${value}%`}</p> : <PriceChange value={+value} />}
      <p className="text-gray-600 text-xs xl:text-sm dark:text-gray-400">{title}</p>
    </div>
  );
};
export default AssetDetail;
