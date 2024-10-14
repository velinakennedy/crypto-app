import copyLink from "@/utils/copyLink";
import { IoCopyOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa6";
import Link from "next/link";

const CoinLink = ({ link }: { link: string }) => {
  return (
    <div className="bg-purple-secondary dark:bg-purple-market p-5 md:p-7 rounded-lg w-full">
      {link && (
        <div className="flex justify-center items-center gap-3 lg:gap-7">
          <Link href={link} target="_blank">
            <FaLink />
          </Link>
          <p className="w-2/3 text-center text-sm lg:text-base break-words">{link}</p>
          <button onClick={() => copyLink(link)}>
            <IoCopyOutline />
          </button>
        </div>
      )}
    </div>
  );
};
export default CoinLink;
