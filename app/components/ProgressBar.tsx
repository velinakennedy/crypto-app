/* eslint-disable quotes */
const ProgressBar = ({percent, fillColor, barColor}: {percent: number, fillColor: string, barColor: string}) => {
  return (
    <div className="rounded-xl w-20 h-2" style={{ backgroundColor: barColor}}>
        <div className={`rounded-xl h-[100%]`} style={{ width: `${percent}%`, backgroundColor: fillColor}}></div>
    </div>
  );
};
export default ProgressBar;