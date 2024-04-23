import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

const PriceChange = ({value}: {value: number}) => {
    const numType: boolean = value >= 0;
  return (
    <div className={`flex ${numType ? "text-green-300": "text-red-300"}`}>
        {numType ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
        {value.toFixed(2)}%
    </div>
  );
};
export default PriceChange;