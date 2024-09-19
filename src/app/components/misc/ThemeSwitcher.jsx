import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    toast.success(
      theme.charAt(0).toUpperCase() + theme.slice(1) + " Mode Enabled",
      { id: "colorMode" }
    );
  };
  useEffect(() => {
    function changeTheme() {
      document.documentElement.setAttribute("data-bs-theme", theme);
    }
    changeTheme();
  }, [theme]);
  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input cursor-pointer"
        type="checkbox"
        role="switch"
        title={
          theme === "dark" ? "Change to light theme" : "Change to dark theme"
        }
        value={theme}
        onChange={() => toggleTheme()}
        id="flexSwitchCheckChecked"
      />
      <label
        className={`form-check-label text-${
          theme === "light" ? "dark" : "white"
        }`}
        htmlFor="flexSwitchCheckChecked"
      >
        {theme === "light" ? "Dark" : "Light"}
      </label>
    </div>
  );
}
