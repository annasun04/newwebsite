import React, { useEffect, useRef } from 'react';
import { incrementVisitCounter } from './visitCounter';

type Grain = { x: number; y: number; vx: number; vy: number; tx: number; ty: number; size: number; phase: number; bound: boolean };
type Point = { x: number; y: number };
const GRAIN_COUNT = 36000;
const WELCOME_GRAIN_COUNT = 14000;
let homeHasMountedInThisPage = false;

const GravitySandbox = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const returningInSessionRef = useRef(homeHasMountedInThisPage);

  useEffect(() => {
    homeHasMountedInThisPage = true;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: false });
    if (!canvas || !context) return;

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'your local time zone';
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let frame = 0;
    let startTime = performance.now();
    let previousTime = startTime;
    let currentScene = -1;
    let pointer: Point | null = null;
    let grains: Grain[] = [];
    let visitNumber: number | null = null;
    let disposed = false;
    let lastPlateUpdate = 0;
    let plateModeKey = '';
    let plateDwell = 0;
    let sampledPointer: Point | null = null;
    let plateAnchor: Point | null = null;
    let welcomeGrainsAdded = false;
    let plateStartedAt = 0;
    let permanentWelcomeTargets: Point[] | null = null;
    let collisionReleased = false;

    const localTime = () => new Intl.DateTimeFormat(navigator.language || 'en-US', {
      hour: 'numeric', minute: '2-digit', timeZone,
    }).format(new Date());

    const timeGreeting = () => {
      const hourPart = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit', hourCycle: 'h23', timeZone,
      }).formatToParts(new Date()).find((part) => part.type === 'hour');
      const hour = Number(hourPart?.value ?? 12);
      if (hour >= 5 && hour < 12) return ["Hope you're having", 'a good morning!'];
      if (hour >= 12 && hour < 17) return ["Hope you're having", 'a good afternoon!'];
      if (hour >= 17 && hour < 22) return ["Hope you're having", 'a good evening!'];
      return ["Hope you're having", 'a good night!'];
    };

    const shuffled = <T,>(values: T[]) => {
      for (let index = values.length - 1; index > 0; index -= 1) {
        const swap = Math.floor(Math.random() * (index + 1));
        [values[index], values[swap]] = [values[swap], values[index]];
      }
      return values;
    };

    const textTargets = (lines: string[]) => {
      const mask = document.createElement('canvas');
      mask.width = Math.max(1, Math.floor(width));
      mask.height = Math.max(1, Math.floor(height));
      const maskContext = mask.getContext('2d', { willReadFrequently: true });
      if (!maskContext) return [] as Point[];
      const longest = Math.max(...lines.map((line) => line.length), 1);
      const baseSize = Math.min(height / (lines.length * 2.15), width / Math.max(5.5, longest * 0.58));
      const mainSize = Math.max(28, Math.min(128, baseSize));
      const lineGap = mainSize * 1.18;
      const totalHeight = lineGap * (lines.length - 1);
      maskContext.fillStyle = '#fff';
      maskContext.textAlign = 'center';
      maskContext.textBaseline = 'middle';
      lines.forEach((line, index) => {
        const isInfoDisplay = lines[0]?.startsWith('You are in ') || lines[0] === 'Local time';
        const size = index === 0 ? mainSize : Math.max(24, mainSize * (isInfoDisplay ? 0.82 : 0.72));
        maskContext.font = `400 ${size}px "IBM Plex Sans", "Noto Sans", sans-serif`;
        maskContext.fillText(line, width / 2, height / 2 - totalHeight / 2 + index * lineGap);
      });
      const pixels = maskContext.getImageData(0, 0, mask.width, mask.height).data;
      const candidates: Point[] = [];
      const step = width < 600 ? 2 : 3;
      for (let y = 0; y < mask.height; y += step) {
        for (let x = 0; x < mask.width; x += step) {
          if (pixels[(y * mask.width + x) * 4 + 3] > 100) candidates.push({ x, y });
        }
      }
      shuffled(candidates);
      return Array.from({ length: GRAIN_COUNT }, (_, index) => candidates[index % Math.max(1, candidates.length)] || { x: width / 2, y: height / 2 });
    };

    const scatterTargets = () => Array.from({ length: GRAIN_COUNT }, () => ({
      x: Math.random() * width, y: Math.random() * height,
    }));

    const fingerprintTargets = (seedValue: number) => {
      let seed = Math.max(1, seedValue) >>> 0;
      const random = () => {
        seed += 0x6D2B79F5;
        let value = seed;
        value = Math.imul(value ^ (value >>> 15), value | 1);
        value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
        return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
      };
      const phase = random() * Math.PI * 2;
      const rotation = (random() - 0.5) * 0.5;
      const ridgeCount = 66;
      const radiusX = width * (0.48 + random() * 0.05);
      const radiusY = height * (0.68 + random() * 0.07);
      const centerX = width / 2 + (random() - 0.5) * width * 0.08;
      const centerY = height * 0.52 + (random() - 0.5) * height * 0.04;

      const points: Point[] = [];
      while (points.length < GRAIN_COUNT) {
        const ridge = Math.floor(random() * ridgeCount);
        const level = (ridge + 2) / (ridgeCount + 2);
        const angle = random() * Math.PI * 2;
        const whorl = angle + rotation + Math.sin(angle + phase) * (0.22 * (1 - level));
        const loopPull = Math.sin(angle * 0.5 + phase) * (1 - level) * 0.22;
        const irregularity = 1 + Math.sin(angle * 3 + phase + ridge * 0.17) * 0.018 + Math.sin(angle * 7 - phase) * 0.009;
        const crease = Math.abs(Math.sin(angle * 1.5 + ridge * 0.21 + phase));
        if (crease < 0.035 && ridge % 5 !== 0) continue;
        points.push({
          x: centerX + Math.cos(whorl + loopPull) * radiusX * level * irregularity,
          y: centerY + Math.sin(whorl) * radiusY * level * irregularity +
            Math.cos(angle + phase) * radiusY * 0.09 * (1 - level),
        });
      }
      return points;
    };

    const uniformTargets = (requestedCount?: number) => {
      const count = requestedCount ?? Math.max(GRAIN_COUNT, grains.length);
      const unit = (value: number) => {
        const result = Math.sin(value) * 43758.5453123;
        return result - Math.floor(result);
      };
      return Array.from({ length: count }, (_, index) => ({
        x: (0.012 + unit(index * 12.9898 + 1.7) * 0.976) * width,
        y: (0.012 + unit(index * 78.233 + 9.2) * 0.976) * height,
      }));
    };

    const welcomeFieldTargets = () => {
      const welcome = permanentWelcomeTargets ?? textTargets(['Welcome!']);
      const field = uniformTargets();
      return Array.from({ length: Math.max(GRAIN_COUNT, grains.length) }, (_, index) =>
        index < GRAIN_COUNT ? welcome[index] : field[index]);
    };

    const chladniTargets = (modeX: number, modeY: number) => {
      const points: Point[] = [];
      const margin = Math.min(width, height) * 0.035;
      const usableWidth = Math.max(1, width - margin * 2);
      const usableHeight = Math.max(1, height - margin * 2);
      let attempts = 0;
      while (points.length < GRAIN_COUNT && attempts < GRAIN_COUNT * 55) {
        attempts += 1;
        const x = Math.random();
        const y = Math.random();
        const vibration =
          Math.sin(Math.PI * modeX * x) * Math.sin(Math.PI * modeY * y) -
          Math.sin(Math.PI * modeY * x) * Math.sin(Math.PI * modeX * y);
        if (Math.abs(vibration) < 0.075 + Math.random() * 0.035) {
          points.push({ x: margin + x * usableWidth, y: margin + y * usableHeight });
        }
      }
      return points.length
        ? Array.from({ length: GRAIN_COUNT }, (_, index) => points[index % points.length])
        : scatterTargets();
    };

    const plateModes = () => {
      const normalizedX = pointer ? pointer.x / Math.max(1, width) : 0.42;
      const normalizedY = pointer ? pointer.y / Math.max(1, height) : 0.58;
      return {
        x: 2 + Math.round(normalizedX * 5),
        y: 3 + Math.round(normalizedY * 6),
      };
    };

    const setTargets = (targets: Point[], scene = currentScene) => {
      const boundRatio = scene === 7 ? 1 : scene === 6 ? GRAIN_COUNT / Math.max(GRAIN_COUNT, grains.length) : scene >= 3 ? 0.9 : 0.76;
      const boundCount = scene === 0 ? 0 : Math.floor(grains.length * boundRatio);
      grains.forEach((grain, index) => {
        grain.bound = index < boundCount;
        const target = grain.bound ? targets[index % Math.max(1, targets.length)] : { x: Math.random() * width, y: Math.random() * height };
        const jitter = grain.bound && scene !== 7 ? 2.8 : 0;
        grain.tx = target.x + (Math.random() - 0.5) * jitter;
        grain.ty = target.y + (Math.random() - 0.5) * jitter;
      });
    };

    const sceneFor = (elapsed: number) => {
      if (returningInSessionRef.current) return 7;
      if (reducedMotion) return 1;
      if (elapsed < 1400) return 0;
      if (elapsed < 6800) return 1;
      if (elapsed < 10800) return 2;
      if (elapsed < 15000) return 3;
      if (elapsed < 19500) return 4;
      if (elapsed < 24500) return 5;
      if (elapsed < 28500) return 6;
      return 7;
    };

    const targetsForScene = (scene: number) => {
      if (scene === 0) return scatterTargets();
      if (scene === 1) return textTargets(['Anna Sun', 'Software Engineer']);
      if (scene === 2) return textTargets(['You are in', `${timeZone} time zone`]);
      if (scene === 3) return textTargets(['Local time', localTime()]);
      if (scene === 4) return textTargets(timeGreeting());
      if (scene === 6) {
        permanentWelcomeTargets ??= textTargets(['Welcome!']);
        return permanentWelcomeTargets;
      }
      if (scene === 7) return welcomeFieldTargets();
      return visitNumber === null
        ? textTargets(['Welcome!'])
        : textTargets(['You are visit', `#${visitNumber.toLocaleString(navigator.language || 'en-US')}`]);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (!grains.length) {
        let initialPoints = scatterTargets();
        if (returningInSessionRef.current) {
          permanentWelcomeTargets = textTargets(['Welcome!']);
          const field = uniformTargets(GRAIN_COUNT + WELCOME_GRAIN_COUNT);
          initialPoints = Array.from({ length: GRAIN_COUNT + WELCOME_GRAIN_COUNT }, (_, index) =>
            index < GRAIN_COUNT ? permanentWelcomeTargets![index] : field[index]);
          welcomeGrainsAdded = true;
        }
        grains = initialPoints.map((point) => ({
          ...point, tx: point.x, ty: point.y, vx: 0, vy: 0,
          size: 0.45 + Math.random() * 0.75, phase: Math.random() * Math.PI * 2,
          bound: returningInSessionRef.current,
        }));
      }
      currentScene = sceneFor(performance.now() - startTime);
      if (currentScene === 7 && !plateAnchor) {
        plateAnchor = pointer ? { ...pointer } : { x: width / 2, y: height / 2 };
        sampledPointer = { ...plateAnchor };
        if (returningInSessionRef.current) plateStartedAt = performance.now() - 4800;
      }
      setTargets(targetsForScene(currentScene), currentScene);
    };

    const updatePointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom
        ? { x: event.clientX - rect.left, y: event.clientY - rect.top }
        : null;
    };

    const draw = (now: number) => {
      const delta = Math.min(2, (now - previousTime) / 16.67);
      previousTime = now;
      const nextScene = sceneFor(now - startTime);
      if (nextScene !== currentScene) {
        currentScene = nextScene;
        if (currentScene === 6 && !welcomeGrainsAdded) {
          welcomeGrainsAdded = true;
          for (let index = 0; index < WELCOME_GRAIN_COUNT; index += 1) {
            const side = index % 4;
            const x = side === 0 ? -8 - Math.random() * 90 : side === 1 ? width + 8 + Math.random() * 90 : Math.random() * width;
            const y = side === 2 ? -8 - Math.random() * 90 : side === 3 ? height + 8 + Math.random() * 90 : Math.random() * height;
            const inwardX = side === 0 ? 1 : side === 1 ? -1 : (Math.random() - 0.5) * 0.35;
            const inwardY = side === 2 ? 1 : side === 3 ? -1 : (Math.random() - 0.5) * 0.35;
            grains.push({
              x, y, tx: Math.random() * width, ty: Math.random() * height,
              vx: inwardX * (0.8 + Math.random() * 1.4),
              vy: inwardY * (0.8 + Math.random() * 1.4),
              size: 0.45 + Math.random() * 0.75,
              phase: Math.random() * Math.PI * 2,
              bound: false,
            });
          }
        }
        if (currentScene === 7) {
          plateStartedAt = now;
          plateDwell = 0;
          plateAnchor = pointer ? { ...pointer } : { x: width / 2, y: height / 2 };
          sampledPointer = { ...plateAnchor };
          plateModeKey = '';
        }
        setTargets(targetsForScene(currentScene), currentScene);
        if (currentScene === 6) {
          for (let index = GRAIN_COUNT; index < grains.length; index += 1) {
            const grain = grains[index];
            grain.bound = true;
            grain.tx = width / 2 + (Math.random() - 0.5) * 34;
            grain.ty = height / 2 + (Math.random() - 0.5) * 90;
          }
        }
      } else if (currentScene === 3 && Math.floor(now / 60000) !== Math.floor((now - 16.67) / 60000)) {
        setTargets(targetsForScene(3), 3);
      }

      if (currentScene === 6 && !collisionReleased && now - startTime >= 27000) {
        collisionReleased = true;
        const fieldTargets = uniformTargets();
        for (let index = GRAIN_COUNT; index < grains.length; index += 1) {
          const grain = grains[index];
          const target = fieldTargets[index];
          const dx = target.x - grain.x;
          const dy = target.y - grain.y;
          const distance = Math.max(1, Math.hypot(dx, dy));
          grain.tx = target.x;
          grain.ty = target.y;
          grain.vx += (dx / distance) * (1.5 + Math.random() * 1.2);
          grain.vy += (dy / distance) * (1.5 + Math.random() * 1.2);
        }
      }

      if (currentScene === 7 && now - plateStartedAt > 4800 && now - lastPlateUpdate > 260) {
        const modes = plateModes();
        const nextKey = `${modes.x}-${modes.y}`;
        const movement = pointer && sampledPointer
          ? Math.hypot(pointer.x - sampledPointer.x, pointer.y - sampledPointer.y)
          : pointer ? 100 : 0;
        if (!pointer) {
          plateAnchor ??= { x: width / 2, y: height / 2 };
          sampledPointer = { ...plateAnchor };
          plateDwell = Math.min(1, plateDwell + 0.055);
        } else if (movement > 5 || nextKey !== plateModeKey) {
          plateDwell = Math.max(0, plateDwell - 0.18);
          plateAnchor = { ...pointer };
        } else {
          plateDwell = Math.min(1, plateDwell + 0.055);
        }
        plateModeKey = nextKey;
        sampledPointer = pointer ? { ...pointer } : null;
        lastPlateUpdate = now;
      }

      context.fillStyle = '#000';
      context.fillRect(0, 0, width, height);
      const fieldTransition = currentScene === 7 ? Math.max(0, 1 - (now - plateStartedAt) / 4800) : 0;
      const returnStrength = currentScene === 0 ? 0.001 : currentScene === 1 ? 0.011 : currentScene === 7 ? fieldTransition * 0.012 : 0.015;
      for (let grainIndex = 0; grainIndex < grains.length; grainIndex += 1) {
        const grain = grains[grainIndex];
        const targetX = grain.tx + (grain.bound ? Math.cos(now * 0.0017 + grain.phase) * 0.8 : 0);
        const targetY = grain.ty + (grain.bound ? Math.sin(now * 0.0014 + grain.phase) * 0.8 : 0);
        const targetDx = targetX - grain.x;
        const targetDy = targetY - grain.y;
        const targetDistance = Math.max(1, Math.hypot(targetDx, targetDy));
        const grainStrength = currentScene === 7
          ? grainIndex < GRAIN_COUNT ? 0.012 : returnStrength
          : grain.bound ? returnStrength : 0.00045;
        grain.vx += targetDx * grainStrength * delta;
        grain.vy += targetDy * grainStrength * delta;
        if (currentScene !== 7 && grain.bound && targetDistance > 3) {
          const slither = Math.sin(now * 0.0032 + grain.phase + targetDistance * 0.018) * Math.min(0.22, targetDistance / 650) * delta;
          grain.vx += (-targetDy / targetDistance) * slither;
          grain.vy += (targetDx / targetDistance) * slither;
        } else if (!grain.bound) {
          grain.vx += Math.cos(now * 0.0011 + grain.phase) * 0.006 * delta;
          grain.vy += Math.sin(now * 0.0013 + grain.phase) * 0.006 * delta;
        }
        if (currentScene === 7 && plateAnchor && plateDwell > 0.015) {
          const dx = grain.x - plateAnchor.x;
          const dy = grain.y - plateAnchor.y;
          const distance = Math.max(1, Math.hypot(dx, dy));
          const influenceRadius = 34 + plateDwell * Math.min(126, Math.max(width, height) * 0.16);
          if (distance < influenceRadius) {
            const angle = Math.atan2(dy, dx);
            const frequency = 0.09;
            const lobes = 6;
            const phaseValue = distance * frequency + Math.sin(angle * lobes) * 2.15;
            const nearestNode = Math.round(phaseValue / Math.PI) * Math.PI;
            const radialShift = (nearestNode - phaseValue) / frequency;
            const edgeFade = Math.pow(1 - distance / influenceRadius, 0.7);
            const force = radialShift * edgeFade * (0.0075 + plateDwell * 0.0225) * delta;
            grain.vx += (dx / distance) * force;
            grain.vy += (dy / distance) * force;
            const localDamping = Math.pow(0.72 + (1 - plateDwell) * 0.12, delta);
            grain.vx *= localDamping;
            grain.vy *= localDamping;
          }
        }
        if (pointer && currentScene !== 7) {
          const dx = grain.x - pointer.x;
          const dy = grain.y - pointer.y;
          const distance = Math.max(1, Math.hypot(dx, dy));
          if (distance < 105) {
            const force = (1 - distance / 105) * 2.8 * delta;
            grain.vx += (dx / distance) * force;
            grain.vy += (dy / distance) * force;
          }
        }
        grain.vx *= Math.pow(0.86, delta);
        grain.vy *= Math.pow(0.86, delta);
        grain.x += grain.vx * delta;
        grain.y += grain.vy * delta;
        context.fillStyle = `rgba(255,255,255,${(grain.bound ? 0.45 : 0.18) + grain.size * 0.3})`;
        context.fillRect(grain.x, grain.y, grain.size, grain.size);
      }
      if (!reducedMotion) frame = requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    window.addEventListener('pointermove', updatePointer, { passive: true });
    resize();
    startTime = performance.now();
    previousTime = startTime;
    draw(startTime);
    void incrementVisitCounter().then((count) => {
      if (disposed || count === null) return;
      visitNumber = count;
      if (currentScene >= 5) setTargets(targetsForScene(currentScene), currentScene);
    });
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('pointermove', updatePointer);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
};

export default GravitySandbox;
