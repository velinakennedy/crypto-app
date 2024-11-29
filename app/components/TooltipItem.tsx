import { Tooltip } from "@nextui-org/tooltip";
import { useState } from "react";
import { IoHelpCircleSharp } from "react-icons/io5";

const TooltipItem = ({ content, placement, color, iconColor }: { content: string; placement: any; color: string; iconColor: string }) => {
  const [show, setShow] = useState<boolean>(false);

  const handleOpenClose = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setTimeout(() => setShow(false), 8000);
    }
  };
  return (
    <Tooltip content={content} placement={placement} className={`${color} p-3 max-w-28 md:max-w-40 lg:max-w-60`} isOpen={show}>
      <div>
        <IoHelpCircleSharp className={`text-${iconColor} text-xl md:text-2xl`} onClick={handleOpenClose} />
      </div>
    </Tooltip>
  );
};
export default TooltipItem;
