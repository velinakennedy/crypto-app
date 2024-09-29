import { useState } from "react";

const CoinDescription = ({ description }: { description: string }) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const paragraphs = description.split(/\r?\n/);
  return (
    <div className="p-3 w-full">
      <h1 className="flex items-end pb-3 font-bold text-lg lg:text-xl 2xl:text-2xl">Description </h1>
      <div className="text-xs lg:text-sm 2xl:text-base">
        <span dangerouslySetInnerHTML={{ __html: paragraphs[0] }}></span>
        {!showMore && (
          <span className="text-purple-border cursor-pointer" onClick={() => setShowMore(true)}>
            {" "}
            ...read more
          </span>
        )}
        {showMore && (
          <>
            <span dangerouslySetInnerHTML={{ __html: paragraphs.slice(1).join(" ") }}></span>
            <span className="text-purple-border cursor-pointer" onClick={() => setShowMore(false)}>
              {" "}
              ...read less
            </span>
          </>
        )}
      </div>
    </div>
  );
};
export default CoinDescription;
