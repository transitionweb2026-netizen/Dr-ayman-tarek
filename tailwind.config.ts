import type { Config } from "tailwindcss";

// Same brand palette as the original static site — values are unchanged,
// only the delivery mechanism (Tailwind CDN → compiled Tailwind) changed.
const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "inverse-surface": "#f3edfb",
        "on-primary-container": "#3a0060",
        primary: "#c43dff",
        "inverse-on-surface": "#241a38",
        "secondary-fixed": "#f3d9ff",
        "primary-container": "#7a1fb8",
        background: "#0a0613",
        "secondary-container": "#5a1f8a",
        "secondary-fixed-dim": "#e9a8ff",
        "surface-container": "#170d26",
        error: "#ffb4ab",
        "surface-tint": "#c43dff",
        "on-tertiary": "#2b0046",
        "on-primary": "#2b0046",
        "surface-container-low": "#120a1e",
        "on-secondary-container": "#f3d9ff",
        "outline-variant": "#3a2c52",
        "on-tertiary-container": "#3a0060",
        "surface-variant": "#2e2140",
        "on-surface": "#f3edfb",
        "on-primary-fixed": "#2b0046",
        "on-tertiary-fixed-variant": "#7a1fb8",
        "on-error": "#690005",
        "primary-fixed": "#f3d9ff",
        "on-background": "#f3edfb",
        tertiary: "#ff4fa3",
        "surface-bright": "#241a38",
        "on-error-container": "#ffdad6",
        "on-secondary-fixed-variant": "#7a1fb8",
        "surface-dim": "#060410",
        surface: "#0a0613",
        secondary: "#e9a8ff",
        "on-tertiary-fixed": "#3a0060",
        "tertiary-fixed-dim": "#ff4fa3",
        "on-surface-variant": "#a99bc2",
        "error-container": "#93000a",
        "tertiary-container": "#b8266f",
        outline: "#7c6f94",
        "surface-container-highest": "#24163a",
        "on-secondary-fixed": "#3a0060",
        "tertiary-fixed": "#ffd3e8",
        "inverse-primary": "#7a1fb8",
        "surface-container-lowest": "#040209",
        "primary-fixed-dim": "#c43dff",
        "on-secondary": "#3a0060",
        "on-primary-fixed-variant": "#7a1fb8",
        "surface-container-high": "#1d1130",
        // ---- Neon icon system ----
        neon: {
          DEFAULT: "#C026FF",
          glow: "rgba(192,38,255,.55)",
          "glow-soft": "rgba(168,85,247,.35)",
          border: "rgba(192,38,255,.35)",
        },
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
        full: "9999px",
      },
      spacing: {
        "container-max": "1440px",
        "section-gap": "96px",
        "section-gap-sm": "64px",
        "margin-desktop": "64px",
        gutter: "24px",
        "margin-mobile": "20px",
        "component-padding": "32px",
      },
      maxWidth: {
        "container-max": "1440px",
      },
      // ---- Unified typography system (single family: Manrope) ----
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Hero Title
        hero: [
          "clamp(2.75rem, 1.5rem + 4vw, 4.75rem)",
          { lineHeight: "1.04", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        // Section Title
        "section-title": [
          "clamp(1.875rem, 1.4rem + 1.6vw, 2.75rem)",
          { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "600" },
        ],
        // Sub Title
        subtitle: [
          "clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)",
          { lineHeight: "1.5", letterSpacing: "-0.005em", fontWeight: "500" },
        ],
        // Card / block heading
        "card-title": ["1.375rem", { lineHeight: "1.3", fontWeight: "600" }],
        // Body
        body: ["1rem", { lineHeight: "1.7", fontWeight: "400" }],
        "body-lg": ["1.0625rem", { lineHeight: "1.7", fontWeight: "400" }],
        // Small text
        small: ["0.875rem", { lineHeight: "1.5", fontWeight: "500" }],
        micro: ["0.75rem", { lineHeight: "1.4", fontWeight: "600", letterSpacing: "0.06em" }],
        // Button text
        button: ["0.9375rem", { lineHeight: "1", letterSpacing: "0.01em", fontWeight: "600" }],
      },
      boxShadow: {
        glow: "0 0 40px rgba(196, 61, 255, 0.25)",
        "glow-lg": "0 0 70px rgba(196, 61, 255, 0.3)",
        premium: "0 20px 40px rgba(0, 0, 0, 0.35)",
        card: "inset 0 1px 0 rgba(255,255,255,0.05), 0 20px 40px rgba(0,0,0,0.35)",
        // ---- Neon icon system ----
        "neon-rest": "0 0 25px rgba(192,38,255,.18)",
        "neon-hover": "0 0 12px rgba(192,38,255,.6), 0 0 24px rgba(192,38,255,.45), 0 0 40px rgba(192,38,255,.3)",
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #ff4fa3 0%, #c43dff 55%, #7a1fb8 100%)",
        "gradient-text": "linear-gradient(90deg, #ff4fa3 0%, #c43dff 60%, #9d4dff 100%)",
        "gradient-mesh":
          "radial-gradient(ellipse 900px 600px at 15% 0%, rgba(196,61,255,0.16), transparent 60%), radial-gradient(ellipse 700px 500px at 100% 20%, rgba(255,79,163,0.10), transparent 55%)",
        "neon-container": "linear-gradient(180deg, rgba(192,38,255,.08), rgba(192,38,255,.03))",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
        bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      keyframes: {
        "float-y": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "pulse-node": {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.4)" },
        },
        "gradient-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "0.45" },
          "100%": { transform: "scale(1)", opacity: "0" },
        },
      },
      animation: {
        "float-y": "float-y 5s ease-in-out infinite",
        "spin-slow": "spin-slow 44s linear infinite",
        "spin-slow-rev": "spin-slow 60s linear infinite reverse",
        "pulse-node": "pulse-node 2.4s ease-in-out infinite",
        "gradient-pan": "gradient-pan 8s ease infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
