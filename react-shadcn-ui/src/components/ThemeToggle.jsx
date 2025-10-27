import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";

const THEME_STORAGE_KEY = "theme";

function resolveInitialTheme() {
    if (typeof window === "undefined") {
        return "light";
    }

    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme === "light" || storedTheme === "dark") {
        return storedTheme;
    }

    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return systemPrefersDark ? "dark" : "light";
}

function applyTheme(theme) {
    if (typeof document === "undefined") {
        return;
    }

    document.documentElement.classList.toggle("dark", theme === "dark");
    document.body.dataset.theme = theme;
}

function ThemeToggle({ collapsed = false, className }) {
    const [theme, setTheme] = useState(() => resolveInitialTheme());

    useEffect(() => {
        applyTheme(theme);
        window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    }, [theme]);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (event) => {
            setTheme(event.matches ? "dark" : "light");
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    const isDark = theme === "dark";
    const nextTheme = isDark ? "light" : "dark";
    const iconClassName = "h-5 w-5";

    return (
        <Button
            variant="ghost"
            className={cn(
                "w-full justify-start gap-3 px-3 py-2 text-base",
                collapsed && "justify-center px-2",
                className
            )}
            onClick={() => setTheme(nextTheme)}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            title={isDark ? "Switch to light theme" : "Switch to dark theme"}
            aria-pressed={isDark}
        >
            {isDark ? <Moon className={iconClassName} aria-hidden="true" /> : <Sun className={iconClassName} aria-hidden="true" />}
            <span className={collapsed ? "sr-only" : ""}>{isDark ? "Light mode" : "Dark mode"}</span>
        </Button>
    );
}

export default ThemeToggle;
