"use client";
import DarkModeButton from "./DarkModeButton";
import NavbarLinks from "./NavbarLinks";

const MobileNav = () => {
  return (
    <div className="bottom-0 z-10 fixed flex justify-between items-center bg-[#3c3d7d4f] backdrop-blur-sm px-20 py-10 w-full h-24">
      <NavbarLinks isFooterLink={true} />
      <DarkModeButton isFooterLink={true} />
    </div>
  );
};
export default MobileNav;
