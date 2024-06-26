import { RiHome5Fill } from "react-icons/ri";
import { FiLayers } from "react-icons/fi";
import { useState } from "react";
import Link from "next/link";

const NavbarLinks = () => {
    const [isSelected, setIsSelected] = useState<string>("");
  return (
    <div className="flex gap-5 text-lg">
        <Link href={"/"} className={`flex gap-2 items-center ${isSelected === "home" ? "text-white" : "text-gray-400"}`} onClick={() => setIsSelected("home")}><RiHome5Fill /> Home</Link>
        <Link href={"/portfolio"} className={`flex gap-2 items-center ${isSelected === "portfolio" ? "text-white" : "text-gray-400"}`} onClick={() => setIsSelected("portfolio")}><FiLayers /> Portfolio</Link>
    </div>
  );
};
export default NavbarLinks;