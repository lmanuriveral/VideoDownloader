import type { CSSProperties, MouseEvent } from "react";
import {
  ArrowDownTrayIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import { getTheme } from "../ui/colors";

interface Props {
  disabled: boolean;
  loading: boolean;
  done: boolean;
  onClick: () => void;
  dark?: boolean;
}

export function DownloadButton({
  disabled,
  loading,
  done,
  onClick,
  dark = true,
}: Props) {
  const theme = getTheme(dark ? "dark" : "light");

  const getStyle = (): CSSProperties => {
    const base: CSSProperties = {
      width: "100%",
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 14,
      fontWeight: 600,
      borderRadius: 14,
      border: "1px solid",
      padding: "14px 18px",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.45 : 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      transition:
        "all .25s cubic-bezier(.4, 0, .2, 1), transform .15s ease",
      outline: "none",
      boxShadow: "none",
    };

    if (done) {
      return {
        ...base,
        background: theme.successSoft,
        borderColor: theme.success,
        color: theme.success,
        animation: "pop .35s cubic-bezier(.34,1.56,.64,1)",
      };
    }

    if (loading) {
      return {
        ...base,
        background: theme.primarySoft,
        borderColor: theme.primary,
        color: theme.primary,
        cursor: "not-allowed",
      };
    }

    return {
      ...base,
      background: theme.primaryGradient,
      borderColor: theme.primary,
      color: theme.textOnPrimary,
      boxShadow: `0 10px 30px ${theme.glowA}`,
    };
  };

  const handleMouseEnter = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading || done) return;

    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow = `0 14px 34px ${theme.glowA}`;
    e.currentTarget.style.filter = "brightness(1.03)";
  };

  const handleMouseLeave = (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = "";
    e.currentTarget.style.boxShadow = `0 10px 30px ${theme.glowA}`;
    e.currentTarget.style.filter = "";
  };

  const handleMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    e.currentTarget.style.transform = "scale(0.98)";
  };

  const handleMouseUp = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    e.currentTarget.style.transform = "translateY(-2px)";
  };

  const iconSize = 18;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      style={getStyle()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {loading ? (
        <span
          style={{
            width: 16,
            height: 16,
            border: "2px solid currentColor",
            borderTopColor: "transparent",
            borderRadius: "50%",
            display: "inline-block",
            animation: "spin .7s linear infinite",
            opacity: 0.7,
          }}
        />
      ) : done ? (
        <CheckCircleIcon
          style={{
            width: iconSize,
            height: iconSize,
            flexShrink: 0,
          }}
        />
      ) : (
        <ArrowDownTrayIcon
          style={{
            width: iconSize,
            height: iconSize,
            flexShrink: 0,
          }}
        />
      )}

      <span>
        {done
          ? "Descargado"
          : loading
          ? "Descargando..."
          : "Descargar"}
      </span>
    </button>
  );
}