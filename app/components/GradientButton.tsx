import { MouseEventHandler } from "react";

const GradientButton = ({ title, action, width }: { title: string; action: MouseEventHandler; width?: string }) => {
  return (
    <div
      className={`z-0 p-[1.3px] ${width ? width : ""} rounded-lg bg-gradient-to-b from-purple-border dark:to-[#3c3d7e80] to-[#7779f880]`}
      onClick={action}
    >
      <h3
        className={`cursor-pointer flex gap-2 z-1 dark:bg-purple-hover-dark bg-[#a2a4e8] justify-center items-center ${
          width ? width : "w-60"
        } h-12 rounded-lg`}
      >
        {title}
      </h3>
    </div>
  );
};
export default GradientButton;
