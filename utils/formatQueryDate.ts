const formatQueryDate = (date: string) => {
  const splitDate = date.split("-");
  return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`;
};

export default formatQueryDate;
