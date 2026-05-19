import { useState } from "react";
import { CheckCircleIcon, FilmIcon, MusicalNoteIcon } from "@heroicons/react/24/solid";
import { SparklesIcon } from "@heroicons/react/24/outline";
import type { VideoFormat } from "../types/video";
import type { ThemeColors } from "../ui/colors";

interface Props {
  formats: VideoFormat[];
  selected: string;
  onChange: (id: string) => void;
  theme: ThemeColors;
}

/** Elige icono según el label del formato */
function FormatIcon({ label, selected, theme }: { label: string; selected: boolean; theme: ThemeColors }) {
  const lower = label.toLowerCase();
  const color = selected ? theme.primary : theme.textMuted;
  const size = 13;

  if (lower.includes("mp3") || lower.includes("audio") || lower.includes("m4a") || lower.includes("ogg")) {
    return <MusicalNoteIcon width={size} height={size} style={{ color, flexShrink: 0 }} />;
  }
  if (lower.includes("4k") || lower.includes("2160") || lower.includes("best")) {
    return <SparklesIcon width={size} height={size} style={{ color, flexShrink: 0 }} />;
  }
  return <FilmIcon width={size} height={size} style={{ color, flexShrink: 0 }} />;
}

export function FormatSelector({ formats, selected, onChange, theme }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div>
      <p style={{
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: ".08em",
        textTransform: "uppercase",
        color: theme.textMuted,
        marginBottom: 10,
        marginTop: 0,
      }}>
        Calidad
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
        gap: 8,
      }}>
        {formats.map(fmt => {
          const isSel = selected === fmt.formatId;
          const isHov = hovered === fmt.formatId;

          return (
            <button
              key={fmt.formatId}
              onClick={() => onChange(fmt.formatId)}
              onMouseEnter={() => setHovered(fmt.formatId)}
              onMouseLeave={() => setHovered(null)}
              onMouseDown={e => { e.currentTarget.style.transform = "scale(.97)"; }}
              onMouseUp={e => { e.currentTarget.style.transform = ""; }}
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 12,
                border: `1px solid ${
                  isSel
                    ? theme.primary
                    : isHov
                    ? theme.primaryLight
                    : theme.border
                }`,
                background: isSel
                  ? theme.primarySoft
                  : isHov
                  ? theme.surface3
                  : theme.surface2,
                padding: "11px 12px",
                textAlign: "left",
                cursor: "pointer",
                transition: "border-color .15s, background .15s, transform .1s",
              }}
            >
              {/* Accent bar superior cuando está seleccionado */}
              {isSel && (
                <span style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0,
                  height: 2,
                  background: theme.primaryGradient,
                  borderRadius: "2px 2px 0 0",
                }} />
              )}

              {/* Label + check */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: fmt.filesize ? 4 : 0,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <FormatIcon label={fmt.label} selected={isSel} theme={theme} />
                  <span style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: isSel ? theme.primary : theme.text,
                    transition: "color .15s",
                  }}>
                    {fmt.label}
                  </span>
                </div>

                {isSel && (
                  <CheckCircleIcon
                    width={14}
                    height={14}
                    style={{ color: theme.primary, flexShrink: 0 }}
                  />
                )}
              </div>

              {/* Filesize */}
              {fmt.filesize && (
                <div style={{
                  fontSize: 11,
                  fontFamily: "'DM Mono', monospace",
                  color: theme.textMuted,
                  paddingLeft: 18, // alineado con el texto, debajo del icono
                }}>
                  {(fmt.filesize / 1e6).toFixed(1)} MB
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}