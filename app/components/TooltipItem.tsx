import { Tooltip } from "@nextui-org/tooltip";
import { IoHelpCircleSharp } from "react-icons/io5";

const TooltipItem = ({ content, placement, color, iconColor }: { content: string; placement: any; color: string; iconColor: string }) => {
  return (
    <Tooltip content={content} placement={placement} className={`${color} p-3 max-w-28 md:max-w-40 lg:max-w-60`}>
      <div>
        <IoHelpCircleSharp className={`text-${iconColor} text-xl md:text-2xl`} />
      </div>
    </Tooltip>
  );
};
export default TooltipItem;
