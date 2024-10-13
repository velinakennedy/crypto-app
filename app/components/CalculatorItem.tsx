import TooltipItem from "./TooltipItem";

const CalculatorItem = ({
  title,
  isInput,
  content,
  action,
  value,
  placeholder,
  isLast,
  inputType,
  result,
}: {
  title: string;
  isInput: boolean;
  content: string;
  value?: number;
  action?: CallableFunction;
  placeholder?: string;
  isLast?: boolean;
  inputType?: string;
  result?: number;
}) => {
  return (
    <div
      className={`flex justify-between items-center h-1/5 p-3 ${
        isLast ? "" : "border-b-purple-text border-b-small dark:border-b-gray-700"
      } gap-2 lg:flex-row lg:items-center lg:gap-0`}
    >
      <div className="flex justify-between lg:justify-normal gap-2 w-full">
        <p>{title}</p>
        <TooltipItem content={content} placement="right-start" color="dark:!bg-indigo-900 !bg-purple-button" iconColor="purple-button" />
      </div>
      <div>
        {isInput && action ? (
          <input
            type="number"
            min={1}
            className="border-1 border-purple-text bg-transparent dark:bg-dark-modal-icon dark:bg-opacity-50 p-2 border-dashed rounded-lg w-full sm:w-32 md:w-full lg:w-full outline-none dark:placeholder-gray-400 placeholder-purple-text"
            placeholder={placeholder}
            onChange={(e) => action(inputType, +e.target.value)}
            value={value === undefined ? "" : value}
          />
        ) : (
          `$${result}`
        )}
      </div>
    </div>
  );
};
export default CalculatorItem;
