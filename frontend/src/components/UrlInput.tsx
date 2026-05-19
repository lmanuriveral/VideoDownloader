import { useRef } from "react";
import type { CSSProperties } from "react";
import { BoltIcon, LinkIcon } from "@heroicons/react/24/solid";

import type { ThemeColors } from "../ui/colors";

interface Props {
  url: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  loading: boolean;
  theme: ThemeColors;
}

export function UrlInput({
  url,
  onChange,
  onSubmit,
  loading,
  theme,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    if (!inputRef.current) return;

    inputRef.current.style.borderColor = theme.primary;
    inputRef.current.style.boxShadow = `0 0 0 4px ${theme.primarySoft}`;
    inputRef.current.style.background = theme.surface;
  };

  const handleBlur = () => {
    if (!inputRef.current) return;

    inputRef.current.style.borderColor = theme.border;
    inputRef.current.style.boxShadow = "none";
    inputRef.current.style.background = theme.surface2;
  };

  const inputStyle: CSSProperties = {
    width: "100%",
    fontFamily: "'DM Mono', monospace",
    fontSize: 13,
    padding: "12px 14px 12px 42px",
    borderRadius: 14,
    border: `1px solid ${theme.border}`,
    background: theme.surface3,
    color: theme.text,
    minHeight: 46,
    outline: "none",
    letterSpacing: ".01em",
    transition:
      "border-color .2s ease, box-shadow .2s ease, background .2s ease",

    // Fix para Safari/Chrome autofill y modo oscuro
    WebkitTextFillColor: theme.text,
    caretColor: theme.primary,
    appearance: "none",
    WebkitAppearance: "none",
  };

  const buttonDisabled = !url.trim() || loading;

  const buttonStyle: CSSProperties = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    fontWeight: 600,
    color: theme.textOnPrimary,
    background: theme.primaryGradient,
    border: `1px solid ${theme.primary}`,
    borderRadius: 14,
    padding: "0 20px",
    height: 46,
    cursor: buttonDisabled ? "not-allowed" : "pointer",
    opacity: buttonDisabled ? 0.45 : 1,
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    gap: 8,
    transition: "all .2s cubic-bezier(.4, 0, .2, 1)",
    boxShadow: `0 10px 24px ${theme.glowA}`,
  };

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
      }}
    >
      {/* Input */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          position: "relative",
        }}
      >
        <LinkIcon
          style={{
            position: "absolute",
            left: 14,
            top: "50%",
            transform: "translateY(-50%)",
            width: 18,
            height: 18,
            pointerEvents: "none",
            color: theme.textMuted,
            opacity: 0.8,
          }}
        />

        <input
          ref={inputRef}
          type="text"
          value={url}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit()}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Pega aquí la URL del video…"
          autoComplete="off"
          spellCheck={false}
          style={inputStyle}
        />
      </div>

      {/* Analyze Button */}
      <button
        type="button"
        onClick={onSubmit}
        disabled={buttonDisabled}
        style={buttonStyle}
        onMouseEnter={(e) => {
          if (e.currentTarget.disabled) return;

          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = `0 14px 30px ${theme.glowA}`;
          e.currentTarget.style.filter = "brightness(1.03)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "";
          e.currentTarget.style.boxShadow = `0 10px 24px ${theme.glowA}`;
          e.currentTarget.style.filter = "";
        }}
        onMouseDown={(e) => {
          if (!e.currentTarget.disabled) {
            e.currentTarget.style.transform = "scale(0.98)";
          }
        }}
        onMouseUp={(e) => {
          if (!e.currentTarget.disabled) {
            e.currentTarget.style.transform = "translateY(-2px)";
          }
        }}
      >
        {loading ? (
          <>
            <span
              style={{
                width: 14,
                height: 14,
                border: "2px solid rgba(255,255,255,.35)",
                borderTopColor: "#ffffff",
                borderRadius: "50%",
                display: "inline-block",
                animation: "spin .7s linear infinite",
              }}
            />
            Buscando...
          </>
        ) : (
          <>
            <BoltIcon
              style={{
                width: 18,
                height: 18,
                flexShrink: 0,
              }}
            />
            Analizar
          </>
        )}
      </button>
    </div>
  );
}