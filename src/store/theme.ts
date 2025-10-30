import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeState {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (t: Theme) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    theme: (localStorage.getItem("theme") as Theme) || "light",
    toggleTheme: () =>
        set((state) => {
            const newTheme = state.theme === "light" ? "dark" : "light";
            localStorage.setItem("theme", newTheme);
            document.documentElement.classList.toggle("dark", newTheme === "dark");
            return { theme: newTheme };
        }),
    setTheme: (t) =>
        set(() => {
            localStorage.setItem("theme", t);
            document.documentElement.classList.toggle("dark", t === "dark");
            return { theme: t };
        }),
}));