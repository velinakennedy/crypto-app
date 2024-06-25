const formatDate = (value: string | number, removeYear?: boolean): string => {
    const getMonth = (month: number): string => {
      switch(month) {
        case 0: return "January";
        case 1: return "February";
        case 2: return "March";
        case 3: return "April";
        case 4: return "May";
        case 5: return "June";
        case 6: return "July";
        case 7: return "August";
        case 8: return "September";
        case 9: return "October";
        case 10: return "November";
        case 11: return "December";
        default: return "";
      }
    };
    const date: Date = new Date(typeof value === "number" ? value*1000 : value);
    if (typeof value === "string") {
      return new Intl.DateTimeFormat("en-GB", {
        dateStyle: "full",
        timeStyle: "long",
      }).format(date);
    } else if (typeof value === "number") {
      const month = getMonth(date.getMonth());
      const day = date.getDate();
      const year = date.getFullYear();
      return removeYear ? `${month} ${day}` : `${month} ${day}, ${year}`;
    } else {
      return "";
    }
};
export default formatDate;