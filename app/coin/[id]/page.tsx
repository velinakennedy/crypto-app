const CoinInfo = ({params: {id}}: {params: {id: string}}) => {
  return (
    <h1 className="text-white">{id}</h1>
  );
};
export default CoinInfo;