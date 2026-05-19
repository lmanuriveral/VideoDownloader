import type { ThemeColors } from "../ui/colors";

interface Props {
  progress: number;
  theme: ThemeColors;
}

export function ProgressBar({ progress, theme }: Props) {
  return (
    <div style={{ animation: "fade-up .3s ease" }}>
      {/* Row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: theme.textMuted }}>
          <span style={{
            display: "inline-block", width: 6, height: 6, borderRadius: "50%",
            background: theme.primary,
            animation: "pulse-dot 1.2s ease-in-out infinite",
          }} />
          Descargando…
        </span>
        <span style={{
          fontSize: 12, fontFamily: "'DM Mono', monospace",
          fontWeight: 500, color: theme.primary,
        }}>
          {Math.round(progress)}%
        </span>
      </div>

      {/* Track */}
      <div style={{
        height: 3, borderRadius: 99, overflow: "hidden",
        background: theme.surface3,
        transition: "background .35s",
      }}>
        <div style={{
          height: "100%", borderRadius: 99,
          width: `${progress}%`,
          background: theme.primaryGradient,
          transition: "width .3s ease",
          position: "relative",
        }}>
          {/* Shimmer */}
          <span style={{
            position: "absolute", right: 0, top: 0, bottom: 0, width: 24,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,.45))",
            animation: "shimmer 1.5s ease-in-out infinite",
          }} />
        </div>
      </div>
    </div>
  );
}