import { useEffect, useRef, useState } from "react";

const themes = [
  { name: "Cyan", value: "cyan", color: "#06b6d4", group: "Dark" },
  { name: "Purple", value: "purple", color: "#8b5cf6", group: "Dark" },
  { name: "Emerald", value: "emerald", color: "#10b981", group: "Dark" },
  { name: "Warm", value: "warm", color: "#f97316", group: "Dark" },
  { name: "Light", value: "light", color: "#e2e8f0", group: "Light" },
  { name: "Sky", value: "sky", color: "#bae6fd", group: "Light" },
  { name: "Rose", value: "rose", color: "#fecdd3", group: "Light" },
  { name: "Peach", value: "peach", color: "#fed7aa", group: "Light" },
  { name: "Lemon", value: "lemon", color: "#fef08a", group: "Light" },
  { name: "Lilac", value: "lilac", color: "#ddd6fe", group: "Light" },
];

function ThemePicker() {
  const pickerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("interviewflow_theme") || "cyan";
  });
  const selectedTheme = themes.find((item) => item.value === theme) || themes[0];

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("interviewflow_theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectTheme = (value) => {
    setTheme(value);
    setIsOpen(false);
  };

  return (
    <div ref={pickerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm transition hover:border-cyan-500"
      >
        <span
          className="h-4 w-4 rounded-full border border-slate-700"
          style={{ backgroundColor: selectedTheme.color }}
        />
        Theme
      </button>

      {isOpen && (
        <div className="absolute right-0 top-11 z-50 w-52 rounded-xl border border-slate-700 bg-slate-800 p-3 shadow-xl sm:w-56">
          {["Dark", "Light"].map((group) => (
            <div key={group} className="mb-3 last:mb-0">
              <p className="px-2 pb-2 text-xs font-semibold uppercase text-slate-400">
                {group}
              </p>

              <div className="space-y-1">
                {themes
                  .filter((item) => item.group === group)
                  .map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => handleSelectTheme(item.value)}
                      className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-sm text-slate-200 hover:bg-slate-700"
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className="h-4 w-4 rounded-full border border-slate-700"
                          style={{ backgroundColor: item.color }}
                        />
                        {item.name}
                      </span>

                      {theme === item.value && (
                        <span className="text-cyan-400">✓</span>
                      )}
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ThemePicker;
