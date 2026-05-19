import type { ThemeColors } from "../ui/colors";

interface Props {
  theme: ThemeColors;
}

// Icono de escudo/marca SVG inline
function ShieldIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={13} height={13} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2.25c-.796 0-1.566.064-2.318.186C7.963 2.698 6.75 4.03 6.75 5.605v.394a.75.75 0 0 1-.364.643 6.753 6.753 0 0 0-3.386 5.853c0 4.765 3.833 8.649 8.625 8.997a.75.75 0 0 0 .75-.748V5.605c0-.563.363-1.06.908-1.173A13.529 13.529 0 0 1 12 4.25V2.25z"
        fill={color}
        opacity=".4"
      />
      <path
        d="M12 2.25v2c.58 0 1.148.042 1.706.124.545.113.908.61.908 1.173v15.119a.75.75 0 0 0 .75.748c4.792-.348 8.625-4.232 8.625-8.997a6.753 6.753 0 0 0-3.386-5.853.75.75 0 0 1-.364-.643v-.394c0-1.574-1.213-2.907-2.932-3.169A15.029 15.029 0 0 0 12 2.25z"
        fill={color}
      />
    </svg>
  );
}

// Separador decorativo • 
function Dot({ color }: { color: string }) {
  return (
    <span style={{
      display: "inline-block",
      width: 3,
      height: 3,
      borderRadius: "50%",
      background: color,
      opacity: 0.4,
      flexShrink: 0,
    }} />
  );
}

export function Footer({ theme }: Props) {
  const year = 2026;

  return (
    <footer
      style={{
        borderTop: `1px solid ${theme.border}`,
        background: theme.headerBg,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        transition: "background .35s ease, border-color .35s ease",
      }}
    >
      {/* Línea accent superior */}
      <div style={{
        height: 1,
        background: theme.primaryGradient,
        opacity: 0.35,
      }} />

      <div style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "20px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}>

        {/* Marca principal */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}>
          {/* Logo pill */}
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: theme.primarySoft,
            border: `1px solid ${theme.border}`,
            borderRadius: 999,
            padding: "4px 12px 4px 8px",
          }}>
            <ShieldIcon color={theme.primary} />
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: ".08em",
              textTransform: "uppercase",
              background: theme.primaryGradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Jupyx
            </span>
          </span>

          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            color: theme.textMuted,
            letterSpacing: ".01em",
          }}>
            Software Services
          </span>
        </div>

        {/* Meta row */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap",
          justifyContent: "center",
        }}>
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            color: theme.textMuted,
            opacity: 0.7,
            letterSpacing: ".04em",
          }}>
            © {year} Software Services Jupyx
          </span>

          <Dot color={theme.textMuted} />

          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            color: theme.textMuted,
            opacity: 0.7,
            letterSpacing: ".04em",
          }}>
            Todos los derechos reservados
          </span>

          <Dot color={theme.textMuted} />

          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            letterSpacing: ".04em",
            background: theme.primaryGradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            opacity: 0.85,
          }}>
            {/* Pulse dot */}
            <span style={{
              display: "inline-block",
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: theme.primary,
              animation: "pulse-dot 1.8s ease-in-out infinite",
              flexShrink: 0,
            }} />
            Hecho con precisión
          </span>
        </div>

      </div>
    </footer>
  );
}