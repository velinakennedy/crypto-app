import copyLink from "@/utils/copyLink";
import { IoCopyOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa6";

const CoinLink = ({link}: {link: string}) => {
  return (
    <div className="flex items-center justify-center rounded-lg gap-7 p-7 dark:bg-purple-market bg-purple-secondary">
    <button
      onClick={() =>
        window.open(link, "_blank")
      }
    >
      <FaLink />
    </button>
    {link}
    <button onClick={() => copyLink(link)}>
      <IoCopyOutline />
    </button>
  </div>
  );
};
export default CoinLink;