const formatChartLabel = (currentTime: number, pastTime: number): string => {
    const hours = Math.floor((currentTime-(pastTime))/3600);
    switch(hours) {
        case 0: return "Present";
        case 1: return "1 hr ago";
        default: return `${hours} hrs ago`;
    }
};
export default formatChartLabel;