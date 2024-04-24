const formatDate = (value: string) => {
    const date: Date = new Date(value);
    return new Intl.DateTimeFormat("en-GB", {
      dateStyle: "full",
      timeStyle: "long",
    }).format(date);
};
export default formatDate;