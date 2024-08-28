import { Tooltip } from "@nextui-org/tooltip";
import { IoHelpCircleSharp } from "react-icons/io5";

const TooltipItem = ({ content, placement, color }: { content: string; placement: any; color: string }) => {
  return (
    <Tooltip content={content} placement={placement} className={`!${color} p-3 max-w-60 sm:max-w-28 md:max-w-40 lg:max-w-60`}>
      <div>
        <IoHelpCircleSharp className="text-2xl" />
      </div>
    </Tooltip>
  );
};
export default TooltipItem;
