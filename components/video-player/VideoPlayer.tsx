"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/lib/hooks/useTranslation";

interface VideoPlayerProps {
  src: string;
  poster: string;
  aspect: string;
  title: string;
  duration: string;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function PlayIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M2 1 L12 6.5 L2 12 Z" fill="#F5F1EA" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect x="2" y="1" width="3" height="11" fill="#F5F1EA" />
      <rect x="8" y="1" width="3" height="11" fill="#F5F1EA" />
    </svg>
  );
}

function SoundIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1 5h2.5L8 1.5v11L3.5 9H1V5Z" fill="#F5F1EA" />
      <path
        d="M10.2 4.8a3 3 0 0 1 0 4.4"
        stroke="#F5F1EA"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function MuteIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1 5h2.5L8 1.5v11L3.5 9H1V5Z" fill="#F5F1EA" />
      <path
        d="M10 5l3 4M13 5l-3 4"
        stroke="#F5F1EA"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function VideoPlayer({
  src,
  poster,
  aspect,
  title,
  duration,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const { t } = useTranslation();
  const labels = t.videoPlayer;

  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const started = currentTime > 0 || isPlaying;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setTotalDuration(video.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      video.currentTime = 0;
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleEnded);

    if (isPlaying) {
      video.play();
    }

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleEnded);
    };
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  function resetControlsTimer() {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  }

  function handleMouseMove() {
    if (isPlaying) resetControlsTimer();
  }

  function handlePlay() {
    setIsPlaying(true);
    resetControlsTimer();
  }

  function togglePlayPause() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
    resetControlsTimer();
  }

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const video = videoRef.current;
    if (!video) return;
    const value = Number(e.target.value);
    video.currentTime = value;
    setCurrentTime(value);
    resetControlsTimer();
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
    resetControlsTimer();
  }

  return (
    <div
      className="relative w-full max-w-[540px] mx-auto bg-[#1A1816] overflow-hidden"
      style={{ aspectRatio: aspect }}
      onMouseMove={handleMouseMove}
    >
      {/* Hairline border */}
      <div className="absolute inset-0 border border-[#F5F1EA]/[0.08] pointer-events-none z-10" />

      {!started ? (
        <>
          <Image src={poster} alt={title} fill className="object-cover" priority />

          <div className="absolute bottom-4 left-4 text-[#F5F1EA]/60 text-xs font-light tracking-wider">
            ▶ Play film · {duration}
          </div>

          <div className="absolute top-4 right-4 text-[#F5F1EA]/50 text-[11px] font-light">
            9:16
          </div>

          <button
            onClick={handlePlay}
            aria-label={labels.playLabel}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#0F0E0C]/70 backdrop-blur-sm border border-[#F5F1EA]/40 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-[#F5F1EA]/80"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="ml-1">
              <path d="M4 2 L20 11 L4 20 Z" fill="#F5F1EA" />
            </svg>
          </button>
        </>
      ) : (
        <>
          <video
            ref={videoRef}
            src={src}
            className="w-full h-full object-cover cursor-pointer"
            onClick={togglePlayPause}
            preload="metadata"
            aria-label={title}
            playsInline
          />

          <div
            className={`absolute inset-x-0 bottom-0 transition-opacity duration-400 ${
              showControls ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="bg-gradient-to-t from-[#0F0E0C]/85 to-transparent pt-12 pb-4 px-5 flex items-center gap-3">
              <button
                onClick={togglePlayPause}
                aria-label={isPlaying ? labels.pauseLabel : labels.playLabel}
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
              <span className="text-[#F5F1EA] text-xs font-light tabular-nums">
                {formatTime(currentTime)} / {formatTime(totalDuration)}
              </span>
              <input
                type="range"
                min={0}
                max={totalDuration || 1}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 h-1 bg-[#F5F1EA]/20 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: "#C8895A" }}
                aria-label="Seek"
              />
              <button
                onClick={toggleMute}
                aria-label={isMuted ? labels.unmuteLabel : labels.muteLabel}
              >
                {isMuted ? <MuteIcon /> : <SoundIcon />}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
