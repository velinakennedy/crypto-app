import { RiHome5Fill } from "react-icons/ri";
import { FiLayers } from "react-icons/fi";
import { useState } from "react";
import Link from "next/link";

const NavbarLinks = ({ isFooterLink }: { isFooterLink?: boolean }) => {
  const [isSelected, setIsSelected] = useState<string>("home");
  return (
    <div className="flex gap-5 text-lg">
      <Link
        href={"/"}
        className={`flex gap-2 items-center ${
          isSelected === "home" ? "dark:text-purple-border text-purple-text" : isFooterLink ? "text-white" : "text-gray-400"
        }`}
        onClick={() => setIsSelected("home")}
      >
        <RiHome5Fill /> <span className="xs:text-sm md:text-base">Home</span>
      </Link>
      <Link
        href={"/portfolio"}
        className={`flex gap-2 items-center ${
          isSelected === "portfolio" ? "dark:text-purple-border text-purple-text" : isFooterLink ? "text-white" : "text-gray-400"
        }`}
        onClick={() => setIsSelected("portfolio")}
      >
        <FiLayers /> <span className="xs:text-sm md:text-base">Portfolio</span>
      </Link>
    </div>
  );
};
export default NavbarLinks;
