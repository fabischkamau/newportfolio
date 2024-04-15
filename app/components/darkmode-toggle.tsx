import { Theme, useTheme } from "remix-themes";
import { Sun, Moon, MoonStar } from "lucide-react";

export default function DarkModeToggle() {
  const [theme, setTheme] = useTheme();

  return (
    <button
      className="focus:outline-none"
      type="button"
      onClick={() => {
        if (theme === "dark") {
          setTheme(Theme.LIGHT);
        }
        if (theme === "light") {
          setTheme(Theme.DARK);
        }
      }}
    >
      {theme === "light" ? (
        <MoonStar className="size-6 text-sky-500" />
      ) : (
        <Sun className="size-6 text-slate-500" />
      )}
    </button>
  );
}
