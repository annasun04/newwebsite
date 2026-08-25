import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Volume2, VolumeX } from "lucide-react";
import Portfolio from "./Portfolio";
import Blog from "./Blog";
import Bouldering from "./Bouldering";
import CommitmentIssues from "./CommitmentIssues";
import ICPC from "./ICPC";
import CollegeTradingCompetitions from "./CollegeTradingCompetitions";
import OptimizationsIRL from "./OptimizationsIRL";
import TwentyOne from "./TwentyOne";
import CollegeCourseMap from "./CollegeCourseMap";
import HiggsfieldAI from "./HiggsfieldAI";
import Experience from "./Experience";
import SiteNav from "./SiteNav";
import "./index.css";

const SiteIntro = ({ children }: { children: React.ReactNode }) => {
  const targetAudioDuration = 25;
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isFinishingRef = useRef(false);
  const soundOnRef = useRef(true);
  const autoplayBlockedRef = useRef(false);
  const [isVisible, setIsVisible] = useState(() => window.location.pathname === "/");
  const [isFading, setIsFading] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [audioBlocked, setAudioBlocked] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useLayoutEffect(() => {
    if (!isVisible) return;

    const html = document.documentElement;
    const body = document.body;
    const previous = {
      htmlOverflow: html.style.overflow,
      htmlOverscroll: html.style.overscrollBehavior,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyWidth: body.style.width,
      bodyTop: body.style.top,
      bodyTouchAction: body.style.touchAction,
      scrollRestoration: history.scrollRestoration,
    };

    history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.width = "100%";
    body.style.top = "0";
    body.style.touchAction = "none";

    return () => {
      html.style.overflow = previous.htmlOverflow;
      html.style.overscrollBehavior = previous.htmlOverscroll;
      body.style.overflow = previous.bodyOverflow;
      body.style.position = previous.bodyPosition;
      body.style.width = previous.bodyWidth;
      body.style.top = previous.bodyTop;
      body.style.touchAction = previous.bodyTouchAction;
      history.scrollRestoration = previous.scrollRestoration;
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };
  }, [isVisible]);

  const finishIntro = () => {
    if (isFinishingRef.current) return;
    isFinishingRef.current = true;

    const video = videoRef.current;
    const audio = audioRef.current;
    if (video?.videoWidth && video.videoHeight) {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const frame = canvas.toDataURL("image/jpeg", 0.9);
        document.documentElement.style.setProperty(
          "--intro-final-frame",
          `url("${frame}")`,
        );
      }
    }

    video?.pause();
    if (video) {
      video.currentTime = 0;
    }
    audio?.pause();
    if (audio) {
      audio.currentTime = 0;
      audio.volume = 1;
    }
    autoplayBlockedRef.current = false;
    soundOnRef.current = false;
    setAudioBlocked(false);
    setSoundOn(false);

    setIsFading(true);
    const fadeDuration = 1800;
    window.setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      setIsVisible(false);
    }, fadeDuration);
  };

  const toggleSound = async () => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video || !audio) return;

    if (soundOn && autoplayBlockedRef.current) {
      if (Number.isFinite(audio.duration)) {
        audio.currentTime = Math.min(video.currentTime, Math.max(0, audio.duration - 0.1));
      }
      await audio.play()
        .then(() => {
          autoplayBlockedRef.current = false;
          setAudioBlocked(false);
        })
        .catch(() => undefined);
      return;
    }

    if (soundOn) {
      audio.pause();
      soundOnRef.current = false;
      setAudioBlocked(false);
      setSoundOn(false);
      return;
    }

    if (Number.isFinite(audio.duration)) {
      audio.currentTime = Math.min(video.currentTime, Math.max(0, audio.duration - 0.1));
    }
    audio.volume = 1;
    soundOnRef.current = true;
    setSoundOn(true);
    await audio.play().catch(() => {
      soundOnRef.current = false;
      setAudioBlocked(true);
      setSoundOn(false);
    });
  };

  const startIntro = async () => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video || !audio) return;

    video.currentTime = 0;
    audio.currentTime = 0;
    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      audio.preservesPitch = true;
      audio.playbackRate = audio.duration / targetAudioDuration;
    }
    audio.volume = 1;
    soundOnRef.current = true;
    setSoundOn(true);
    setAudioBlocked(false);
    setHasStarted(true);

    const videoPlayback = video.play();
    const audioPlayback = audio.play();
    const [, audioResult] = await Promise.allSettled([videoPlayback, audioPlayback]);

    if (audioResult.status === "fulfilled") {
      autoplayBlockedRef.current = false;
    } else {
      autoplayBlockedRef.current = true;
      setAudioBlocked(true);
      soundOnRef.current = false;
      setSoundOn(false);
    }
  };

  useEffect(() => {
    return () => {
      videoRef.current?.pause();
      audioRef.current?.pause();
    };
  }, []);

  const updateAudioFade = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const effectiveAudioTime = audio.currentTime / Math.max(audio.playbackRate, 0.01);
    const progress = Math.max(0, Math.min(1, (effectiveAudioTime - 20) / 5));
    const softenedProgress = progress * progress * (3 - 2 * progress);
    audio.volume = 1 - softenedProgress;
  };

  return (
    <>
      <div className={isVisible ? "intro-site-underlay" : "intro-site-ready"} aria-hidden={isVisible}>
        {children}
      </div>

      <audio
        ref={audioRef}
        src="/intro/intro.mp3"
        preload="auto"
        onLoadedMetadata={(event) => {
          const audio = event.currentTarget;
          audio.preservesPitch = true;
          audio.playbackRate = audio.duration / targetAudioDuration;
        }}
        onTimeUpdate={updateAudioFade}
      />

      {isVisible && (
        <div
          className={`site-intro ${isFading ? "site-intro--fading" : ""}`}
          role="dialog"
          aria-label="Website introduction"
        >
          <video
            ref={videoRef}
            className="site-intro__video"
            src="/intro/intro.mp4"
            muted
            playsInline
            preload="auto"
            onEnded={finishIntro}
            onError={finishIntro}
          />

          {!hasStarted && (
            <div className="site-intro__curtain">
              <button className="site-intro__enter" type="button" onClick={startIntro}>
                <span>Enter portfolio</span>
                <i aria-hidden="true" />
              </button>
            </div>
          )}

          {hasStarted && (
            <button
              className={`site-intro__sound ${audioBlocked ? "site-intro__sound--blocked" : ""}`}
              type="button"
              onClick={toggleSound}
              aria-label={soundOn ? "Mute intro music" : "Play intro music"}
              title={soundOn ? "Mute music" : "Play music"}
            >
              {soundOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </button>
          )}

          <button className="site-intro__skip" type="button" onClick={finishIntro}>
            Skip intro
          </button>
        </div>
      )}
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <BrowserRouter>
        <SiteNav />
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/1" element={<Bouldering/>} />
          <Route path="/blog/2" element={<CommitmentIssues />} />
          <Route path="/blog/3" element={<ICPC />} />
          <Route path="/blog/4" element={<CollegeTradingCompetitions />} />
          <Route path="/blog/5" element={<OptimizationsIRL />} />
          <Route path="/blog/6" element={<TwentyOne />} />
          <Route path="/blog/7" element={<CollegeCourseMap />} />
          <Route path="/blog/8" element={<HiggsfieldAI />} />
          <Route path="/experience" element={<Experience />} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);
