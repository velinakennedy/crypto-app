const copyLink = (value: string) => {
  navigator.clipboard.writeText(value);
};
export default copyLink;