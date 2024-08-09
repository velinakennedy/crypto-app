const AssetDetail = ({ title, value }: { title: string; value: string | number }) => {
  const valueType: boolean = typeof value === "number" ? value > 0 : true;
  return (
    <div className="flex flex-col items-center">
      <p className="text-sm">{title}</p>
      <p className={`${valueType ? "text-teal-600 dark:text-teal-positive" : "text-red-600 dark:text-red-negative"} text-xs`}>{value}</p>
    </div>
  );
};
export default AssetDetail;
