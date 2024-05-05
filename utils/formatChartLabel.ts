const formatChartLabel = (currentTime: number, pastTime: number): string => {
    const hours = Math.floor((currentTime-(pastTime/1000))/3600);
    const minutes = Math.floor(((currentTime-(pastTime/1000))/60)%60);

    switch(hours) {
        case 0: return `${minutes} mins ago`;
        case 1: return `1 hr ${minutes} mins ago`;
        default: return `${hours} hrs ${minutes} mins ago`;
    }
};
export default formatChartLabel;