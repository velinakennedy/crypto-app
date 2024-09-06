import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { CiDark, CiLight } from "react-icons/ci";
const DarkModeButton = ({ isFooterLink }: { isFooterLink?: boolean }) => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme: string | undefined = theme === "system" ? systemTheme : theme;

  const handleToggle = () => {
    currentTheme === "dark" ? setTheme("light") : setTheme("dark");
    updateStorage();
  };

  const updateStorage = () => {
    currentTheme === "dark" ? localStorage.setItem("theme", "light") : localStorage.setItem("theme", "dark");
  };

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      if (storedTheme !== currentTheme) {
        setTheme(storedTheme);
      }
    }
  }, []);

  return (
    <div>
      {mounted && (
        <button
          className={`  ${
            isFooterLink
              ? "bg-transparent text-white"
              : "dark:bg-purple-secondary-dark bg-purple-secondary hover:bg-purple-hover dark:hover:bg-purple-hover-dark"
          }  p-3 rounded-lg text-3xl`}
          onClick={handleToggle}
        >
          {currentTheme === "dark" ? <CiLight /> : <CiDark />}
        </button>
      )}
    </div>
  );
};
export default DarkModeButton;
