import React from "react";
import type { VideoInfo } from "../types/video";
import type { ThemeColors } from "../ui/colors";

interface Props {
  info: VideoInfo;
  theme: ThemeColors;
}

function formatDuration(secs: number): string {
  const m = Math.floor(secs / 60), s = secs % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

// ─── Logos SVG inline por plataforma ────────────────────────────────────────

function YouTubeLogo() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" fill="#FF0000" />
      <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#fff" />
    </svg>
  );
}

function TwitchLogo() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" fill="#9146FF" />
    </svg>
  );
}

function VimeoLogo() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.9765 6.4168c-.105 2.338-1.739 5.5429-4.894 9.6088-3.2679 4.247-6.0258 6.3699-8.2898 6.3699-1.409 0-2.578-1.294-3.553-3.881l-1.9179-7.1138C4.6037 8.8068 3.8337 7.5 3.0007 7.5c-.169 0-.752.3951-1.752 1.1812L0 7.5018c1.1319-.9927 2.2498-1.9765 3.3398-2.9602C4.9017 3.1 6.0707 2.372 6.9337 2.297c2.048-.1879 3.305 1.1842 3.771 4.113.5099 3.1869.866 5.1699 1.0699 5.9388.5952 2.6829 1.243 4.022 1.9509 4.022.5538 0 1.3808-.8728 2.4979-2.6068 1.1179-1.7348 1.7028-3.0538 1.7699-3.9578.1559-1.5-.4329-2.2509-1.7699-2.2509-.6299 0-1.2809.143-1.9509.43 1.2999-4.2461 3.7768-6.312 7.4288-6.198 2.7109.0811 3.9869 1.8351 3.8379 5.265z" fill="#1AB7EA" />
    </svg>
  );
}

function TwitterLogo() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#fff" />
    </svg>
  );
}

function InstagramLogo() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fd5949" />
          <stop offset="50%" stopColor="#d6249f" />
          <stop offset="100%" stopColor="#285AEB" />
        </linearGradient>
      </defs>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" fill="url(#ig-grad)" />
    </svg>
  );
}

function FacebookLogo() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2" />
    </svg>
  );
}

function TikTokLogo() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" fill="#fff" />
    </svg>
  );
}

function SoundCloudLogo() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 13.508c0 1.46 1.182 2.644 2.644 2.644.072 0 .143-.006.213-.016v.016h15.96v-.006A3.19 3.19 0 0 0 22 12.958a3.19 3.19 0 0 0-2.941-3.182 4.176 4.176 0 0 0-4.088-3.324 4.17 4.17 0 0 0-1.248.191A5.978 5.978 0 0 0 8.124 4.5 5.985 5.985 0 0 0 2.14 10.484 2.644 2.644 0 0 0 0 13.508z" fill="#F76700" />
    </svg>
  );
}

function DefaultLogo() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5.5v13l11-6.5L8 5.5z" fill="white" />
    </svg>
  );
}

const LOGOS: Record<string, () => React.ReactElement> = {
  youtube: YouTubeLogo,
  twitch: TwitchLogo,
  vimeo: VimeoLogo,
  twitter: TwitterLogo,
  x: TwitterLogo,
  instagram: InstagramLogo,
  facebook: FacebookLogo,
  tiktok: TikTokLogo,
  soundcloud: SoundCloudLogo,
};

function PlatformLogo({ platform }: { platform: string }) {
  const key = platform.toLowerCase().replace(/[\s.-]/g, "");
  const Logo = LOGOS[key] ?? DefaultLogo;
  return <Logo />;
}

// ─── Componente principal ────────────────────────────────────────────────────

export function VideoPreview({ info, theme }: Props) {
  return (
    <div
      style={{
        borderRadius: 16,
        border: `1px solid ${theme.border}`,
        background: theme.surface,
        overflow: "hidden",
        animation: "fade-up .3s ease",
        transition: "background .35s, border-color .35s",
        boxShadow: theme.shadow,
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          position: "relative",
          aspectRatio: "16/9",
          background: theme.surface2,
          overflow: "hidden",
        }}
      >
        <img
          src={info.thumbnail}
          alt={info.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform .45s",
          }}
          onMouseEnter={e => { (e.target as HTMLImageElement).style.transform = "scale(1.04)"; }}
          onMouseLeave={e => { (e.target as HTMLImageElement).style.transform = "scale(1)"; }}
          onError={e => { (e.target as HTMLImageElement).src = "/placeholder.jpg"; }}
        />

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,.6), transparent 55%)",
          }}
        />

        {/* Platform badge con logo real */}
        <span
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            background: "rgba(0,0,0,.62)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,.14)",
            borderRadius: 6,
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            fontWeight: 500,
            color: "#fff",
            padding: "3px 8px",
            letterSpacing: ".06em",
            textTransform: "uppercase",
          }}
        >
          <PlatformLogo platform={info.platform} />
          {info.platform}
        </span>

        {/* Duration badge */}
        <span
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
            background: "rgba(0,0,0,.70)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            border: "1px solid rgba(255,255,255,.12)",
            borderRadius: 6,
            fontFamily: "'DM Mono', monospace",
            fontSize: 12,
            fontWeight: 500,
            color: "#fff",
            padding: "3px 8px",
          }}
        >
          {formatDuration(info.duration)}
        </span>
      </div>

      {/* Info */}
      <div style={{ padding: "14px 16px" }}>
        <h2
          style={{
            fontSize: 14,
            fontWeight: 500,
            lineHeight: 1.45,
            color: theme.text,          // ← tema heredado
            marginTop: 0,
            marginBottom: 8,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {info.title}
        </h2>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {/* Uploader */}
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontFamily: "'DM Mono', monospace",
              fontSize: 12,
              color: theme.textMuted,   // ← tema heredado
            }}
          >
            👤 {info.uploader}
          </span>

          {/* Duration */}
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontFamily: "'DM Mono', monospace",
              fontSize: 12,
              color: theme.textMuted,   // ← tema heredado
            }}
          >
            ⏱ {formatDuration(info.duration)}
          </span>

          {/* Platform con logo en metadata también */}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              fontFamily: "'DM Mono', monospace",
              fontSize: 12,
              color: theme.textMuted,   // ← tema heredado
            }}
          >
            <PlatformLogo platform={info.platform} />
            {info.platform}
          </span>
        </div>
      </div>
    </div>
  );
}