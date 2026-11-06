"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const KEY = "digitalfalconz-theme";

function applyTheme(theme: "light" | "dark") {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* storage unavailable — theme still applies for this visit */
  }
}

/** Dark / light toggle. Rendered only after mount so the server HTML and
    the first client render match (no hydration mismatch) — the inline
    script in layout.tsx already set data-theme before paint. */
export default function ThemeToggle({ withLabel = false }: { withLabel?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    setMounted(true);
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");
  }, []);

  if (!mounted) {
    // Reserve the same space server-side so the header does not shift.
    return (
      <button type="button" className="theme-toggle" aria-label="Switch theme" aria-hidden="true" tabIndex={-1}>
        <Sun size={18} aria-hidden="true" />
        {withLabel ? <span>Theme</span> : null}
      </button>
    );
  }

  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={`Switch to ${next} mode`}
      aria-pressed={theme === "dark"}
      title={`Switch to ${next} mode`}
      onClick={() => {
        applyTheme(next);
        setTheme(next);
      }}
    >
      {theme === "dark" ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
      {withLabel ? <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span> : null}
    </button>
  );
}
