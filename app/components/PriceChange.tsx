import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

const PriceChange = ({value}: {value: number}) => {
    const numType: boolean = value >= 0;
  return (
    <div className={`flex ${numType ? "text-teal-positive": "text-red-negative"}`}>
        {numType ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
        {value.toFixed(2)}%
    </div>
  );
};
export default PriceChange;