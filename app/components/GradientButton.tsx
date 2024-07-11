const GradientButton = ({title, action}: {title: string, action: any}) => {
  return (
    <div className="z-0 p-[1.3px] rounded-lg bg-gradient-to-b from-purple-border dark:to-[#3c3d7e80] to-[#7779f880]" onClick={action}>
        <h3 className="cursor-pointer flex gap-2 z-1 dark:bg-purple-hover-dark bg-[#a2a4e8] justify-center items-center w-60 h-12 rounded-lg">{title}</h3>
    </div>
  );
};
export default GradientButton;