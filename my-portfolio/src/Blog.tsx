import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowLeft, Calendar, Clock, ArrowUpRight, Volume2, VolumeX } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
}

type DialogueLine = {
  speaker: 'p1' | 'p2';
  start: number;
  text: string;
};

type FireflyTrailPoint = {
  x: number;
  y: number;
  born: number;
};

const BLOG_INTRO_DURATION = 29.343;
const BLOG_INTRO_SESSION_KEY = 'portfolio-blog-intro-seen';
const FIREFLY_APPROACH_START = 20.25;
const FIREFLY_FRIENDS_REVEAL = 22.45;
const FIREFLY_JOIN_START = 27.15;
const FIREFLY_GROUP_OFFSETS = [
  [-0.64, -0.12],
  [-0.45, -0.55],
  [-0.2, 0.33],
  [0.05, -0.72],
  [0.24, -0.22],
  [0.43, 0.24],
  [0.67, -0.45],
  [0.72, 0.12],
  [0.2, 0.62],
  [-0.35, 0.68],
  [-0.76, 0.42],
  [0.02, 0.06]
] as const;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const smoothstep = (value: number) => {
  const amount = clamp01(value);
  return amount * amount * (3 - 2 * amount);
};
const mix = (from: number, to: number, amount: number) => from + (to - from) * amount;

const dialogue: DialogueLine[] = [
  {
    speaker: 'p1',
    start: 2.85,
    text: 'If you only do what you can do, you’ll never be more than you are now.'
  },
  {
    speaker: 'p2',
    start: 8.08,
    text: 'I don’t want to be more. I like who I am.'
  },
  {
    speaker: 'p1',
    start: 10.74,
    text: 'You don’t even know who you are. Incredible power awaits you—power beyond anything you can imagine.'
  },
  {
    speaker: 'p2',
    start: 20.52,
    text: 'There’s no way I’m ever going to be like you.'
  },
  {
    speaker: 'p1',
    start: 22.77,
    text: 'I’m not trying to turn you into me. I’m trying to turn you into you.'
  }
];

const Blog = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const fireflyCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef(0);
  const fireflyAnimationFrameRef = useRef(0);
  const fallbackStartRef = useRef(0);
  const fireflyTrailRef = useRef<FireflyTrailPoint[]>([]);
  const fireflyLastTrailTimeRef = useRef(-1);
  const fireflyPreviousTimeRef = useRef(0);
  const isFinishingRef = useRef(false);
  const [introVisible, setIntroVisible] = useState(() => {
    try {
      return sessionStorage.getItem(BLOG_INTRO_SESSION_KEY) !== 'true';
    } catch {
      return true;
    }
  });
  const [introStarted, setIntroStarted] = useState(false);
  const [introFading, setIntroFading] = useState(false);
  const [activeLine, setActiveLine] = useState(-1);
  const [soundOn, setSoundOn] = useState(true);

  useLayoutEffect(() => {
    if (!introVisible) return;

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
      scrollRestoration: history.scrollRestoration
    };

    history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    html.style.overflow = 'hidden';
    html.style.overscrollBehavior = 'none';
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.width = '100%';
    body.style.top = '0';
    body.style.touchAction = 'none';

    return () => {
      html.style.overflow = previous.htmlOverflow;
      html.style.overscrollBehavior = previous.htmlOverscroll;
      body.style.overflow = previous.bodyOverflow;
      body.style.position = previous.bodyPosition;
      body.style.width = previous.bodyWidth;
      body.style.top = previous.bodyTop;
      body.style.touchAction = previous.bodyTouchAction;
      history.scrollRestoration = previous.scrollRestoration;
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };
  }, [introVisible]);

  const finishIntro = () => {
    if (isFinishingRef.current) return;
    isFinishingRef.current = true;
    try {
      sessionStorage.setItem(BLOG_INTRO_SESSION_KEY, 'true');
    } catch {
      // The intro still closes normally if browser storage is unavailable.
    }
    audioRef.current?.pause();
    cancelAnimationFrame(animationFrameRef.current);
    cancelAnimationFrame(fireflyAnimationFrameRef.current);
    setIntroFading(true);
    window.setTimeout(() => {
      setIntroVisible(false);
    }, 1100);
  };

  const startIntro = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    audio.muted = false;
    audio.volume = 1;
    fallbackStartRef.current = performance.now();
    fireflyTrailRef.current = [];
    fireflyLastTrailTimeRef.current = -1;
    fireflyPreviousTimeRef.current = 0;
    setSoundOn(true);
    setActiveLine(-1);
    setIntroStarted(true);
    await audio.play().catch(() => setSoundOn(false));
  };

  const toggleSound = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setSoundOn(!audio.muted);
  };

  const replayIntro = () => {
    const audio = audioRef.current;
    audio?.pause();
    if (audio) audio.currentTime = 0;
    cancelAnimationFrame(animationFrameRef.current);
    cancelAnimationFrame(fireflyAnimationFrameRef.current);
    isFinishingRef.current = false;
    fallbackStartRef.current = 0;
    fireflyTrailRef.current = [];
    fireflyLastTrailTimeRef.current = -1;
    fireflyPreviousTimeRef.current = 0;
    setIntroFading(false);
    setIntroStarted(false);
    setActiveLine(-1);
    setSoundOn(true);
    setIntroVisible(true);
  };

  useEffect(() => {
    if (!introVisible || !introStarted) return;

    const syncDialogue = () => {
      const audio = audioRef.current;
      const fallbackTime = (performance.now() - fallbackStartRef.current) / 1000;
      const currentTime = audio && !audio.paused ? audio.currentTime : fallbackTime;
      let nextLine = -1;

      for (let index = dialogue.length - 1; index >= 0; index -= 1) {
        if (currentTime >= dialogue[index].start) {
          nextLine = index;
          break;
        }
      }

      setActiveLine((current) => current === nextLine ? current : nextLine);
      if (progressRef.current) {
        progressRef.current.style.transform =
          `scaleX(${Math.min(1, currentTime / BLOG_INTRO_DURATION)})`;
      }

      if (currentTime >= BLOG_INTRO_DURATION) {
        finishIntro();
        return;
      }

      animationFrameRef.current = requestAnimationFrame(syncDialogue);
    };

    animationFrameRef.current = requestAnimationFrame(syncDialogue);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [introStarted, introVisible]);

  useEffect(() => {
    if (!introVisible || !introStarted) return;

    const canvas = fireflyCanvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let previousLead = { x: 0, y: 0 };

    const drawFirefly = (
      x: number,
      y: number,
      size: number,
      intensity: number,
      phase: number,
      heading = 0,
      isLead = false
    ) => {
      const visibleIntensity = clamp01(intensity);
      if (visibleIntensity <= 0.005) return;

      const flicker = reduceMotion ? 0.92 : 0.76 + 0.24 * Math.sin(phase);
      const alpha = visibleIntensity * flicker;
      const glowRadius = size * (isLead ? 10 : 8);
      const glow = context.createRadialGradient(x, y, 0, x, y, glowRadius);
      glow.addColorStop(0, `rgba(255, 255, 216, ${0.98 * alpha})`);
      glow.addColorStop(0.12, `rgba(235, 255, 157, ${0.84 * alpha})`);
      glow.addColorStop(0.42, `rgba(172, 232, 102, ${0.28 * alpha})`);
      glow.addColorStop(1, 'rgba(124, 203, 78, 0)');

      context.save();
      context.globalCompositeOperation = 'lighter';
      context.fillStyle = glow;
      context.beginPath();
      context.arc(x, y, glowRadius, 0, Math.PI * 2);
      context.fill();

      context.translate(x, y);
      context.rotate(heading);
      context.fillStyle = `rgba(226, 242, 210, ${0.28 * visibleIntensity})`;
      context.beginPath();
      context.ellipse(-size * 1.15, -size * 0.28, size * 1.35, size * 0.42, -0.36, 0, Math.PI * 2);
      context.ellipse(-size * 1.15, size * 0.28, size * 1.35, size * 0.42, 0.36, 0, Math.PI * 2);
      context.fill();

      context.fillStyle = `rgba(255, 255, 225, ${Math.min(1, alpha + 0.18)})`;
      context.beginPath();
      context.ellipse(size * 0.08, 0, size * 0.82, size * 0.56, 0, 0, Math.PI * 2);
      context.fill();
      context.restore();
    };

    const getLonelyPosition = (time: number, width: number, height: number) => ({
      x: width * (
        0.14
        + 0.25 * (0.5 + 0.5 * Math.sin(time * 0.34 - 0.8))
        + 0.035 * Math.sin(time * 1.12)
      ),
      y: height * (
        0.61
        + 0.13 * Math.sin(time * 0.47 + 1.2)
        + 0.045 * Math.sin(time * 1.29)
      )
    });

    const renderFireflies = () => {
      const bounds = canvas.getBoundingClientRect();
      const width = bounds.width;
      const height = bounds.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const pixelWidth = Math.max(1, Math.round(width * dpr));
      const pixelHeight = Math.max(1, Math.round(height * dpr));

      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);

      const audio = audioRef.current;
      const fallbackTime = (performance.now() - fallbackStartRef.current) / 1000;
      const currentTime = Math.min(
        BLOG_INTRO_DURATION,
        audio && !audio.paused ? audio.currentTime : fallbackTime
      );

      if (currentTime + 0.15 < fireflyPreviousTimeRef.current) {
        fireflyTrailRef.current = [];
        fireflyLastTrailTimeRef.current = -1;
      }
      fireflyPreviousTimeRef.current = currentTime;

      const compact = width < 640;
      const community = {
        x: width * (compact ? 0.73 : 0.8),
        y: height * (compact ? 0.74 : 0.68)
      };
      const communityRadius = Math.min(width, height) * (compact ? 0.11 : 0.13);
      const lonely = getLonelyPosition(currentTime, width, height);
      const approachAnchor = getLonelyPosition(FIREFLY_APPROACH_START, width, height);
      const approach = smoothstep(
        (currentTime - FIREFLY_APPROACH_START) / (FIREFLY_JOIN_START - FIREFLY_APPROACH_START)
      );
      const joined = smoothstep(
        (currentTime - FIREFLY_JOIN_START) / (BLOG_INTRO_DURATION - FIREFLY_JOIN_START)
      );
      const arrivalTarget = {
        x: community.x - communityRadius * (0.68 - 0.58 * joined),
        y: community.y + communityRadius * (0.18 - 0.13 * joined)
      };
      const lead = currentTime < FIREFLY_APPROACH_START
        ? lonely
        : {
            x: mix(approachAnchor.x, arrivalTarget.x, approach)
              + (reduceMotion ? 0 : Math.sin(currentTime * 1.7) * (1 - joined) * 7),
            y: mix(approachAnchor.y, arrivalTarget.y, approach)
              + (reduceMotion ? 0 : Math.cos(currentTime * 1.45) * (1 - joined) * 5)
          };

      if (!reduceMotion && currentTime - fireflyLastTrailTimeRef.current >= 0.055) {
        fireflyTrailRef.current.push({ x: lead.x, y: lead.y, born: currentTime });
        fireflyLastTrailTimeRef.current = currentTime;
      }
      fireflyTrailRef.current = fireflyTrailRef.current
        .filter((point) => currentTime - point.born < 1.35)
        .slice(-28);

      context.save();
      context.globalCompositeOperation = 'lighter';
      fireflyTrailRef.current.forEach((point) => {
        const age = clamp01((currentTime - point.born) / 1.35);
        const radius = 1.7 * (1 - age);
        context.fillStyle = `rgba(184, 235, 116, ${0.2 * (1 - age)})`;
        context.beginPath();
        context.arc(point.x, point.y, Math.max(0.25, radius), 0, Math.PI * 2);
        context.fill();
      });
      context.restore();

      const heading = previousLead.x || previousLead.y
        ? Math.atan2(lead.y - previousLead.y, lead.x - previousLead.x)
        : 0;
      previousLead = lead;

      const friendReveal = smoothstep((currentTime - FIREFLY_FRIENDS_REVEAL) / 3.2);
      if (friendReveal > 0) {
        FIREFLY_GROUP_OFFSETS.forEach(([offsetX, offsetY], index) => {
          const stagger = smoothstep(
            (currentTime - FIREFLY_FRIENDS_REVEAL - index * 0.11) / 1.75
          );
          const orbit = reduceMotion ? 0 : currentTime * (0.34 + (index % 4) * 0.035) + index * 0.82;
          const x = community.x
            + offsetX * communityRadius
            + Math.cos(orbit) * communityRadius * (0.035 + (index % 3) * 0.012);
          const y = community.y
            + offsetY * communityRadius
            + Math.sin(orbit * 1.08) * communityRadius * (0.035 + (index % 2) * 0.018);
          const phase = currentTime * (2.4 + (index % 3) * 0.28) + index * 1.37;
          drawFirefly(
            x,
            y,
            compact ? 1.2 + (index % 3) * 0.16 : 1.45 + (index % 3) * 0.18,
            friendReveal * stagger * 0.92,
            phase,
            orbit + Math.PI / 2
          );
        });
      }

      if (joined > 0) {
        const pulseRadius = communityRadius * (0.72 + joined * 0.7);
        const pulseAlpha = joined * (reduceMotion ? 0.12 : 0.1 + 0.04 * Math.sin(currentTime * 3.1));
        const communityGlow = context.createRadialGradient(
          community.x,
          community.y,
          0,
          community.x,
          community.y,
          pulseRadius
        );
        communityGlow.addColorStop(0, `rgba(195, 239, 132, ${pulseAlpha})`);
        communityGlow.addColorStop(0.5, `rgba(156, 219, 101, ${pulseAlpha * 0.45})`);
        communityGlow.addColorStop(1, 'rgba(116, 196, 76, 0)');
        context.save();
        context.globalCompositeOperation = 'lighter';
        context.fillStyle = communityGlow;
        context.beginPath();
        context.arc(community.x, community.y, pulseRadius, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }

      drawFirefly(
        lead.x,
        lead.y,
        compact ? 1.75 : 2.05,
        1,
        currentTime * 3.4,
        heading,
        true
      );

      fireflyAnimationFrameRef.current = requestAnimationFrame(renderFireflies);
    };

    fireflyAnimationFrameRef.current = requestAnimationFrame(renderFireflies);
    return () => cancelAnimationFrame(fireflyAnimationFrameRef.current);
  }, [introStarted, introVisible]);

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      cancelAnimationFrame(fireflyAnimationFrameRef.current);
      audio?.pause();
    };
  }, []);

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'bouldering',
      excerpt: 'Some knowledge about bouldering',
      date: 'June 28, 2026',
      readTime: '8 min read',
      category: 'Rock Climbing'
    },
    {
      id: '2',
      title: 'day trading',
      excerpt: 'Observations I\'ve made about the markets',
      date: 'March 10, 2024',
      readTime: '12 min read',
      category: 'Markets'
    },
    {
      id: '3',
      title: 'competitive programming',
      excerpt: 'My reflections on competitive programming competitions and lessons learned.',
      date: 'Month Day, Year',
      readTime: '10 min read',
      category: 'Competitive Programming'
    },
    {
      id: '4',
      title: 'trading competitions',
      excerpt: 'Reflections and analysis on trading competitions [UChicago, Northwestern, Georgia Tech, Prosperity]',
      date: 'Month Day, Year',
      readTime: '15 min read',
      category: 'Experiences'
    },
     {
      id: '5',
      title: 'optimizations irl',
      excerpt: 'Not all optimizations apply to code',
      date: 'June 28, 2026',
      readTime: '9 min read',
      category: 'Opinion'
    },
    {
      id: '6',
      title: '21 lessons by 21',
      excerpt: 'some lessons i\'ve learned through trials and tribulations',
      date: 'June 28, 2026',
      readTime: '9 min read',
      category: 'Opinion'
    },
    {
      id: '7',
      title: 'college courses and general advice',
      excerpt: 'My thoughts on classes at UW-Madison ',
      date: 'Feb 15, 2026',
      readTime: '9 min read',
      category: 'Opinion'
    },
    {
      id: '8',
      title: 'Higgsfield AI',
      excerpt: 'Building a cinematic portfolio opening taught me where generative video shines—and where the experience needs restraint.',
      date: 'August 24, 2026',
      readTime: '6 min read',
      category: 'AI/ML'
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Rock Climbing': 'bg-[#8aac78]/20 text-[#8aac78]',
      'Markets': 'bg-[#d4874c]/20 text-[#f4a460]',
      'Competitive Programming': 'bg-[#9880b4]/20 text-[#d4a5d4]',
      'Experiences': 'bg-[#7a9e7b]/20 text-[#9ebf9e]',
      'Opinion': 'bg-[#a86868]/20 text-[#d99999]',
      'Data Engineering': 'bg-[#5a8050]/20 text-[#8aac78]',
      'DevOps': 'bg-[#9880b4]/20 text-[#d4a5d4]',
      'AI/ML': 'bg-[#d4874c]/20 text-[#f4a460]',
      'Architecture': 'bg-[#7a9e7b]/20 text-[#9ebf9e]',
      'Security': 'bg-[#a86868]/20 text-[#d99999]'
    };
    return colors[category] || 'bg-white/10 text-white';
  };

  const navigate = useNavigate();

  const handlePostClick = (postId: string) => {
    const routes: Record<string, string> = {
      '1': '/blog/1',
      '2': '/blog/2',
      '3': '/blog/3',
      '4': '/blog/4',
      '5': '/blog/5',
      '6': '/blog/6',
      '7': '/blog/7',
      '8': '/blog/8'
    };
    if (routes[postId]) {
      navigate(routes[postId]);
    }
  };

  return (
    <>
    <div
      className={`blog-minimal relative min-h-[100dvh] text-slate-300 font-sans selection:bg-[#f3ede4] selection:text-[#3a2a1e] ${
        introVisible ? 'blog-page-underlay' : 'blog-page-ready'
      }`}
      aria-hidden={introVisible}
    >
      {/* Solid base background */}
      <div className="fixed inset-0 bg-[#1a3016] z-0"></div>

      {/* Dynamic Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none w-full h-full">
        <div className="absolute top-[-20%] left-[-20%] w-[60vw] h-[60vw] bg-[#2a4822] rounded-full blur-[100px] animate-blob mix-blend-screen"></div>
        <div className="absolute top-[-20%] right-[-20%] w-[55vw] h-[55vw] bg-[#3e6034] rounded-full blur-[100px] animation-delay-2000 mix-blend-screen"></div>
        <div className="absolute bottom-[-30%] left-[15%] w-[70vw] h-[70vw] bg-[#0e1e0c] rounded-full blur-[100px] animation-delay-4000 mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black/40 backdrop-blur-xl border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-[#c4d4b8] hover:text-white transition-colors">
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back to Portfolio</span>
          </Link>
          <h1 className="text-2xl font-bold text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]">blog</h1>
          <div className="w-24"></div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 pt-32 pb-24">
        <div className="mx-auto w-[min(100%,72rem)] space-y-12">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]">blog.</h1>
            <p className="text-lg text-[#8aac78]">thoughts on experiences, technology, markets and more</p>
            <button className="blog-replay-intro" type="button" onClick={replayIntro}>
              replay intro
            </button>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => handlePostClick(post.id)}
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#c4d4b8]/30 transition-all duration-300 hover:bg-white/[0.08] cursor-pointer"
              >
                <div className="space-y-4">
                  {/* Category Tag */}
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-white group-hover:text-[#c4d4b8] transition-colors">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-sm text-[#8aac78] line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center gap-4 text-xs text-slate-400 pt-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Read More */}
                  <div className="flex items-center gap-2 text-[#c4d4b8] text-sm font-medium pt-2 group-hover:gap-3 transition-all">
                    Read More
                    <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>

    <audio
      ref={audioRef}
      src="/blog/video-project.m4a"
      preload="auto"
      onEnded={finishIntro}
    />

    {introVisible && (
      <section
        className={`blog-intro ${introFading ? 'blog-intro--fading' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Blog introduction"
      >
        <div className="blog-intro__atmosphere" aria-hidden="true">
          <span />
          <span />
          <i />
        </div>

        <canvas
          ref={fireflyCanvasRef}
          className="blog-intro__fireflies"
          aria-hidden="true"
        />

        {!introStarted ? (
          <div className="blog-intro__curtain">
            <span className="blog-intro__overline">An opening dialogue</span>
            <button className="blog-intro__enter" type="button" onClick={startIntro}>
              <span>Enter the blog</span>
              <i aria-hidden="true" />
            </button>
            <span className="blog-intro__duration">29 seconds · sound on</span>
          </div>
        ) : (
          activeLine < 0 ? (
            <div className="blog-intro__listening" aria-live="polite">
              <span>Listen</span>
              <i aria-hidden="true" />
            </div>
          ) : (
            <div
              key={activeLine}
              className={`blog-intro__dialogue blog-intro__dialogue--${dialogue[activeLine].speaker}`}
              aria-live="polite"
            >
              <div className="blog-intro__speaker">
                <span>{dialogue[activeLine].speaker}</span>
                <i aria-hidden="true" />
              </div>
              <blockquote>{dialogue[activeLine].text}</blockquote>
              <div className="blog-intro__sequence" aria-hidden="true">
                <span>0{activeLine + 1}</span>
                <span className="blog-intro__progress">
                  <span ref={progressRef} />
                </span>
                <span>05</span>
              </div>
            </div>
          )
        )}

        {introStarted && (
          <button
            className="blog-intro__sound"
            type="button"
            onClick={toggleSound}
            aria-label={soundOn ? 'Mute dialogue' : 'Play dialogue audio'}
            title={soundOn ? 'Mute dialogue' : 'Play dialogue audio'}
          >
            {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        )}

        <button className="blog-intro__skip" type="button" onClick={finishIntro}>
          Skip intro
        </button>
      </section>
    )}
    </>
  );
};

export default Blog;
