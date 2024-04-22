"use client";
import { useGetCoinQuery } from "../../redux/features/coinInfoSlice";

const CoinInfo = ({params: {id}}: {params: {id: string}}) => {
  const {currentData, isSuccess}= useGetCoinQuery(id);
  const hasData = currentData && isSuccess;
  
  return (
    <div>
      {hasData && (
        <div>
          <h1 className="text-white">{currentData.name}</h1>
          <p>{currentData.description.en}</p>
        </div>
      )}
    </div>
  );
};
export default CoinInfo;