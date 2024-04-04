import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { CiDark, CiLight } from "react-icons/ci";
const DarkModeButton = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme: string | undefined =
    theme === "system" ? systemTheme : theme;

  const handleToggle = () => {
    currentTheme === "dark" ? setTheme("light") : setTheme("dark");
    updateStorage();
  };

  const updateStorage = () => {
    currentTheme === "dark"
      ? localStorage.setItem("theme", "light")
      : localStorage.setItem("theme", "dark");
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
          className="p-3 text-3xl rounded-lg bg-purple-secondary hover:bg-purple-hover dark:hover:bg-purple-hover-dark dark:bg-purple-secondary-dark"
          onClick={handleToggle}
        >
          {currentTheme === "dark" ? <CiLight /> : <CiDark />}
        </button>
      )}
    </div>
  );
};
export default DarkModeButton;
