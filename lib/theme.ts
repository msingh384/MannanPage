export const themeStorageKey = "portfolio-theme";

// Apply the saved palette before the browser paints the page.
export const themeInitScript = `try {
  if (localStorage.getItem(${JSON.stringify(themeStorageKey)}) === "night") {
    document.documentElement.dataset.theme = "night";
  }
} catch {}`;
