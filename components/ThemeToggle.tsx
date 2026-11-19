"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { themeStorageKey } from "@/lib/theme";

const themeChangeEvent = "portfolio-theme-change";

function subscribe(update: () => void) {
  window.addEventListener(themeChangeEvent, update);
  window.addEventListener("storage", updateFromStorage);
  return () => {
    window.removeEventListener(themeChangeEvent, update);
    window.removeEventListener("storage", updateFromStorage);
  };

  function updateFromStorage(event: StorageEvent) {
    if (event.storageArea !== window.localStorage || (event.key !== themeStorageKey && event.key !== null)) return;
    document.documentElement.dataset.theme = event.newValue === "night" ? "night" : "day";
    update();
  }
}

export default function ThemeToggle() {
  const isNight = useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.theme === "night",
    () => false,
  );

  function toggleTheme() {
    const theme = document.documentElement.dataset.theme === "night" ? "day" : "night";
    document.documentElement.dataset.theme = theme;
    window.dispatchEvent(new Event(themeChangeEvent));
    try {
      localStorage.setItem(themeStorageKey, theme);
    } catch {
      // The current page can still switch themes when storage is unavailable.
    }
  }

  return (
    <button className="theme-toggle" type="button" aria-label="Night mode" aria-pressed={isNight} onClick={toggleTheme}>
      <Moon className="theme-moon" size={16} aria-hidden="true" />
      <Sun className="theme-sun" size={17} aria-hidden="true" />
    </button>
  );
}
