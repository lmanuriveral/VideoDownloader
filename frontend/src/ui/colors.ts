// src/theme/colors.ts
// Paleta basada en tu logo:
// - Rosa principal: #E63B7A
// - Rosa suave: #F4A4C0
// - Azul cielo: #74A7FE
// - Borgoña oscuro: #831100

export type ThemeMode = "light" | "dark";

export interface ThemeColors {
  // Base
  bg: string;
  surface: string;
  surface2: string;
  surface3: string;
  cardBg: string;
  headerBg: string;

  // Text
  text: string;
  textMuted: string;
  textOnPrimary: string;

  // Borders
  border: string;

  // Brand
  primary: string;
  primaryHover: string;
  primarySoft: string;
  primaryLight: string;
  secondary: string;
  accent: string;

  // States
  success: string;
  successSoft: string;
  error: string;
  errorSoft: string;
  warning: string;
  warningSoft: string;

  // Effects
  glowA: string;
  glowB: string;
  shadow: string;

  // Gradients
  heroGradient: string;
  primaryGradient: string;
  logoGradient: string;
}

/* -------------------------------------------------------------------------- */
/*                                   LIGHT                                    */
/* -------------------------------------------------------------------------- */

const lightTheme: ThemeColors = {
  // Base
  bg: "#fff7fb",
  surface: "#ffffff",
  surface2: "#fdf2f8",
  surface3: "#fce7f3",
  cardBg: "rgba(255, 255, 255, 0.85)",
  headerBg: "rgba(255, 255, 255, 0.78)",

  // Text
  text: "#1f1720",
  textMuted: "#6b5a66",
  textOnPrimary: "#ffffff",

  // Borders
  border: "rgba(230, 59, 122, 0.12)",

  // Brand
  primary: "#E63B7A",        // Rosa principal del logo
  primaryHover: "#d12f6b",
  primarySoft: "rgba(230, 59, 122, 0.10)",
  primaryLight: "#F4A4C0",   // Rosa claro del logo
  secondary: "#74A7FE",      // Azul del logo
  accent: "#831100",         // Borgoña del logo

  // States
  success: "#10b981",
  successSoft: "rgba(16, 185, 129, 0.12)",
  error: "#ef4444",
  errorSoft: "rgba(239, 68, 68, 0.08)",
  warning: "#f59e0b",
  warningSoft: "rgba(245, 158, 11, 0.12)",

  // Effects
  glowA: "rgba(230, 59, 122, 0.18)",
  glowB: "rgba(116, 167, 254, 0.18)",
  shadow: "0 12px 40px rgba(230, 59, 122, 0.08)",

  // Gradients
  heroGradient: "linear-gradient(90deg, #E63B7A 0%, #74A7FE 100%)",
  primaryGradient: "linear-gradient(135deg, #E63B7A 0%, #d12f6b 100%)",
  logoGradient:
    "linear-gradient(135deg, #E63B7A 0%, #F4A4C0 45%, #74A7FE 100%)",
};

/* -------------------------------------------------------------------------- */
/*                                    DARK                                    */
/* -------------------------------------------------------------------------- */

const darkTheme: ThemeColors = {
  // Base
  bg: "#09090f",
  surface: "#11111a",
  surface2: "#181824",
  surface3: "#232336",
  cardBg: "rgba(17, 17, 26, 0.82)",
  headerBg: "rgba(9, 9, 15, 0.75)",

  // Text
  text: "#fdf4f8",
  textMuted: "#b8a7b3",
  textOnPrimary: "#ffffff",

  // Borders
  border: "rgba(244, 164, 192, 0.14)",

  // Brand
  primary: "#E63B7A",
  primaryHover: "#f04d8b",
  primarySoft: "rgba(230, 59, 122, 0.14)",
  primaryLight: "#F4A4C0",
  secondary: "#74A7FE",
  accent: "#831100",

  // States
  success: "#34d399",
  successSoft: "rgba(52, 211, 153, 0.12)",
  error: "#f87171",
  errorSoft: "rgba(248, 113, 113, 0.08)",
  warning: "#fbbf24",
  warningSoft: "rgba(251, 191, 36, 0.12)",

  // Effects
  glowA: "rgba(230, 59, 122, 0.25)",
  glowB: "rgba(116, 167, 254, 0.22)",
  shadow: "0 12px 40px rgba(0, 0, 0, 0.45)",

  // Gradients
  heroGradient: "linear-gradient(90deg, #F4A4C0 0%, #74A7FE 100%)",
  primaryGradient: "linear-gradient(135deg, #E63B7A 0%, #f04d8b 100%)",
  logoGradient:
    "linear-gradient(135deg, #E63B7A 0%, #F4A4C0 45%, #74A7FE 100%)",
};

/* -------------------------------------------------------------------------- */
/*                                   EXPORTS                                  */
/* -------------------------------------------------------------------------- */

export const themes: Record<ThemeMode, ThemeColors> = {
  light: lightTheme,
  dark: darkTheme,
};

export const getTheme = (mode: ThemeMode): ThemeColors => themes[mode];