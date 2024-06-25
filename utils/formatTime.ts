const formatTime = (value: string | number): string => {
    const getMinute = (min: number) => {
        if (min.toString().length < 2) {
            return `0${min}`;
        }
        return min;
    };
    const date: Date = new Date(typeof value === "number" ? value*1000 : value);
    if (typeof value === "string") {
      return new Intl.DateTimeFormat("en-GB", {
        dateStyle: "full",
        timeStyle: "long",
      }).format(date);
    } else if (typeof value === "number") {
      const hour = date.getHours();
      const minutes = getMinute(date.getMinutes());
      return hour < 12 ? `${hour || hour+12}:${minutes} AM` : `${hour-12 || hour}:${minutes} PM`;
    } else {
      return "";
    }
};
export default formatTime;