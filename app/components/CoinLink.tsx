import copyLink from "@/utils/copyLink";
import { IoCopyOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa6";
import Link from "next/link";

const CoinLink = ({ link }: { link: string }) => {
  return (
    <div>
      {link && (
        <div className="flex items-center justify-center rounded-lg gap-7 p-7 dark:bg-purple-market bg-purple-secondary">
          <Link href={link} target="_blank">
            <FaLink />
          </Link>
          <p className="overflow-clip">{link}</p>
          <button onClick={() => copyLink(link)}>
            <IoCopyOutline />
          </button>
        </div>
      )}
    </div>
  );
};
export default CoinLink;
