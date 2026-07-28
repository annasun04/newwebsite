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
import "./index.css";

const SiteIntro = ({ children }: { children: React.ReactNode }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isFinishingRef = useRef(false);
  const soundOnRef = useRef(true);
  const autoplayBlockedRef = useRef(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [audioBlocked, setAudioBlocked] = useState(false);

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

    setIsFading(true);

    const audio = audioRef.current;
    const startingVolume = audio?.volume ?? 0;
    const fadeStartedAt = performance.now();
    const fadeDuration = 1800;

    const fadeAudio = (now: number) => {
      if (!audio) return;
      const progress = Math.min((now - fadeStartedAt) / fadeDuration, 1);
      const softenedProgress = progress * progress * (3 - 2 * progress);
      audio.volume = startingVolume * (1 - softenedProgress);
      if (progress < 1) requestAnimationFrame(fadeAudio);
      else audio.pause();
    };

    requestAnimationFrame(fadeAudio);
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

  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;

    const startTimer = window.setTimeout(() => {
      video?.play().catch(() => undefined);
      if (soundOnRef.current) {
        audio?.play()
          .then(() => {
            autoplayBlockedRef.current = false;
            setAudioBlocked(false);
          })
          .catch(() => {
            autoplayBlockedRef.current = true;
            setAudioBlocked(true);
          });
      }
    }, 1000);

    const recoverSound = () => {
      if (
        !autoplayBlockedRef.current ||
        !soundOnRef.current ||
        isFinishingRef.current ||
        !video ||
        !audio
      ) return;

      if (Number.isFinite(audio.duration)) {
        audio.currentTime = Math.min(video.currentTime, Math.max(0, audio.duration - 0.1));
      }
      audio.play()
        .then(() => {
          autoplayBlockedRef.current = false;
          setAudioBlocked(false);
        })
        .catch(() => undefined);
    };

    document.addEventListener("pointerdown", recoverSound, true);
    document.addEventListener("keydown", recoverSound, true);

    return () => {
      window.clearTimeout(startTimer);
      document.removeEventListener("pointerdown", recoverSound, true);
      document.removeEventListener("keydown", recoverSound, true);
      videoRef.current?.pause();
      audioRef.current?.pause();
    };
  }, []);

  const fadeAudioNearEnd = () => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video || !audio || !Number.isFinite(video.duration)) return;

    const fadeLength = Math.min(6, video.duration * 0.4);
    const remaining = video.duration - video.currentTime;
    const progress = Math.max(0, Math.min(1, 1 - remaining / fadeLength));
    const softenedProgress = progress * progress * (3 - 2 * progress);
    audio.volume = 1 - softenedProgress;
  };

  return (
    <>
      <div className={isVisible ? "intro-site-underlay" : "intro-site-ready"} aria-hidden={isVisible}>
        {children}
      </div>

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
            onTimeUpdate={fadeAudioNearEnd}
            onEnded={finishIntro}
            onError={finishIntro}
          />
          <audio
            ref={audioRef}
            src="/intro/intro.mp3"
            preload="auto"
            onEnded={() => undefined}
          />

          <button
            className={`site-intro__sound ${audioBlocked ? "site-intro__sound--blocked" : ""}`}
            type="button"
            onClick={toggleSound}
            aria-label={soundOn ? "Mute intro music" : "Play intro music"}
            title={soundOn ? "Mute music" : "Play music"}
          >
            {soundOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>

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
    <SiteIntro>
      <BrowserRouter>
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
        </Routes>
      </BrowserRouter>
    </SiteIntro>
  </React.StrictMode>
);
