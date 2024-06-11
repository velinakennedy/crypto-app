/* eslint-disable quotes */
const ProgressBar = ({percent, fillColor, barColor, barWidth}: {percent: number, fillColor: string, barColor: string, barWidth: string}) => {
  return (
    <div className="rounded-xl h-1" style={{ backgroundColor: barColor, width: `${barWidth}`}}>
        <div className={`rounded-xl h-[100%]`} style={{ width: `${percent}%`, backgroundColor: fillColor}}></div>
    </div>
  );
};
export default ProgressBar;