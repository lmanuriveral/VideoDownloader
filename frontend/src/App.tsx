import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { Toaster } from "react-hot-toast";

import Download from "/favicon.svg";
import { useVideoInfo } from "./hooks/useVideoInfo";
import { useDownload } from "./hooks/useDownload";

import { UrlInput } from "./components/UrlInput";
import { VideoPreview } from "./components/VideoPreview";
import { FormatSelector } from "./components/FormatSelector";
import { DownloadButton } from "./components/DownloadButton";
import { ProgressBar } from "./components/ProgressBar";

import { getTheme } from "./ui/colors";

import "./index.css";
import { Footer } from "./components/Footer";

export default function App() {
  const [url, setUrl] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");
  const [dark, setDark] = useState(true);

  const theme = getTheme(dark ? "dark" : "light");

  const { status, info, error, fetchInfo, reset } = useVideoInfo();
  const { progress, isDownloading, isDone, startDownload } = useDownload();

  const isLoading = status === "loading";
  const hasInfo = status === "ready" && !!info;
  const canDownload = !!selectedFormat && !isDownloading;

  const handleFetchInfo = async () => {
    if (!url.trim()) return;
    reset();
    setSelectedFormat("");
    await fetchInfo(url);
  };

  const handleDownload = async () => {
    if (!selectedFormat) return;
    await startDownload(url, selectedFormat);
  };

  return (
    <div
      data-theme={dark ? "dark" : "light"}
      style={{
        minHeight: "100vh",
        background: theme.bg,
        color: theme.text,
        transition: "background .35s ease, color .35s ease",
      }}
    >
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: theme.surface,
            color: theme.text,
            border: `1px solid ${theme.border}`,
            borderRadius: 16,
            boxShadow: theme.shadow,
          },
        }}
      />

      {/* Ambient background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          pointerEvents: "none",
          background: `
            radial-gradient(circle at top right, ${theme.glowA}, transparent 35%),
            radial-gradient(circle at bottom left, ${theme.glowB}, transparent 30%)
          `,
          transition: "background .5s ease",
        }}
      />

      {/* Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          borderBottom: `1px solid ${theme.border}`,
          background: theme.headerBg,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          transition: "background .35s ease, border-color .35s ease",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "14px 24px",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            {/* Logo */}
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 999,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: theme.logoGradient,
                boxShadow: `0 4px 20px ${theme.glowA}`,
              }}
            >
              <img
                src={Download}
                alt="Download icon"
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            </div>

            <div>
              <h1
                style={{
                  fontSize: 17,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.2,
                  color: theme.text,
                  margin: 0,
                }}
              >
                JownloaderGlobal{" "}
              
              </h1>

              <p
                style={{
                  fontSize: 11,
                  color: theme.textMuted,
                  marginTop: 2,
                  marginBottom: 0,
                }}
              >
                Descarga videos con una experiencia premium.
              </p>
            </div>
          </motion.div>

          {/* Theme Toggle */}
          <button
            onClick={() => setDark((prev) => !prev)}
            aria-label="Cambiar tema"
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: 7,
              border: `1px solid ${theme.border}`,
              borderRadius: 999,
              padding: "5px 12px",
              background: theme.surface2,
              color: theme.textMuted,
              cursor: "pointer",
              fontSize: 12,
              fontFamily: "'DM Sans', sans-serif",
              transition: "all .2s ease",
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={dark ? "sun" : "moon"}
                initial={{ opacity: 0, rotate: -25, scale: 0.75 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 25, scale: 0.75 }}
                transition={{ duration: 0.18 }}
                style={{ display: "flex", alignItems: "center" }}
              >
                {dark ? <Sun size={14} /> : <Moon size={14} />}
              </motion.span>
            </AnimatePresence>

            {/* Switch */}
            <span
              style={{
                position: "relative",
                display: "inline-block",
                width: 32,
                height: 18,
                borderRadius: 999,
                background: dark ? theme.primary : theme.surface3,
                border: `1px solid ${theme.border}`,
                transition: "background .25s ease",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: 2,
                  left: dark ? 14 : 2,
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: dark ? theme.textOnPrimary : theme.primary,
                  transition:
                    "left .25s cubic-bezier(.34,1.56,.64,1), background .25s ease",
                  boxShadow: "0 1px 4px rgba(0,0,0,.25)",
                }}
              />
            </span>

            <span
              style={{
                fontSize: 11,
                color: theme.textMuted,
              }}
            >
              {dark ? "Light" : "Dark"}
            </span>
          </button>
        </div>
      </header>

      {/* Main */}
      <main
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "40px 24px 60px",
        }}
      >
        {/* Hero */}
        <section
          style={{
            maxWidth: 720,
            margin: "0 auto 40px",
            textAlign: "center",
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              marginTop: 20,
              marginBottom: 0,
              fontSize: "clamp(26px, 5vw, 46px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              color: theme.text,
            }}
          >
            Descarga videos con{" "}
            <span
              style={{
                background: theme.heroGradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              elegancia y velocidad
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              marginTop: 14,
              fontSize: 15,
              lineHeight: 1.7,
              color: theme.textMuted,
            }}
          >
            Pega una URL, selecciona el formato y descarga tu video con una
            experiencia moderna, fluida y completamente responsive.
          </motion.p>
        </section>

        {/* Main Card */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          style={{
            maxWidth: 720,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              borderRadius: 24,
              border: `1px solid ${theme.border}`,
              background: theme.cardBg,
              padding: "clamp(20px, 4vw, 36px)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              transition: "background .35s ease, border-color .35s ease",
              boxShadow: theme.shadow,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <UrlInput
                url={url}
                onChange={(value) => {
                  setUrl(value);
                  if (info) reset();
                }}
                onSubmit={handleFetchInfo}
                loading={isLoading}
                theme={theme}
              />

              {/* Error */}
              <AnimatePresence mode="wait">
                {status === "error" && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    style={{
                      borderRadius: 14,
                      border: `1px solid ${theme.error}`,
                      background: theme.errorSoft,
                      padding: "10px 16px",
                      fontSize: 13,
                      color: theme.error,
                    }}
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Content */}
              <AnimatePresence>
                {hasInfo && info && (
                  <motion.div
                    key="info"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 20,
                    }}
                  >
                    <VideoPreview info={info} theme={theme} />

                    <FormatSelector
                      theme={theme}
                      formats={info.formats}
                      selected={selectedFormat}
                      onChange={setSelectedFormat}
                    />

                    <AnimatePresence>
                      {isDownloading && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{
                            opacity: 1,
                            height: "auto",
                          }}
                          exit={{
                            opacity: 0,
                            height: 0,
                          }}
                        >
                          <ProgressBar progress={progress} theme={theme} />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <DownloadButton
                      disabled={!canDownload}
                      loading={isDownloading}
                      done={isDone}
                      onClick={handleDownload}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.section>


      </main>
        <Footer theme={theme} />
    </div>
  );
}
