import React, { useEffect, useRef } from 'react';
import { incrementVisitCounter } from './visitCounter';

type Grain = { x: number; y: number; vx: number; vy: number; tx: number; ty: number; size: number; phase: number; bound: boolean };
type Point = { x: number; y: number };
const GRAIN_COUNT = 11000;

const GravitySandbox = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
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

    const setTargets = (targets: Point[], scene = currentScene) => {
      const boundRatio = scene >= 3 ? 0.9 : 0.76;
      const boundCount = scene === 0 ? 0 : Math.floor(GRAIN_COUNT * boundRatio);
      grains.forEach((grain, index) => {
        grain.bound = index < boundCount;
        const target = grain.bound ? targets[index] : { x: Math.random() * width, y: Math.random() * height };
        grain.tx = target.x + (grain.bound ? (Math.random() - 0.5) * 2.8 : 0);
        grain.ty = target.y + (grain.bound ? (Math.random() - 0.5) * 2.8 : 0);
      });
    };

    const sceneFor = (elapsed: number) => {
      if (reducedMotion) return 1;
      if (elapsed < 1400) return 0;
      if (elapsed < 6800) return 1;
      if (elapsed < 10800) return 2;
      if (elapsed < 15000) return 3;
      if (elapsed < 19500) return 4;
      return 5;
    };

    const targetsForScene = (scene: number) => {
      if (scene === 0) return scatterTargets();
      if (scene === 1) return textTargets(['Anna Sun', 'Software Engineer']);
      if (scene === 2) return textTargets(['You are in', `${timeZone} time zone`]);
      if (scene === 3) return textTargets(['Local time', localTime()]);
      if (scene === 4) return textTargets(timeGreeting());
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
        grains = scatterTargets().map((point) => ({
          ...point, tx: point.x, ty: point.y, vx: 0, vy: 0,
          size: 0.45 + Math.random() * 0.75, phase: Math.random() * Math.PI * 2, bound: false,
        }));
      }
      currentScene = sceneFor(performance.now() - startTime);
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
        setTargets(targetsForScene(currentScene), currentScene);
      } else if (currentScene === 3 && Math.floor(now / 60000) !== Math.floor((now - 16.67) / 60000)) {
        setTargets(targetsForScene(3), 3);
      }

      context.fillStyle = '#000';
      context.fillRect(0, 0, width, height);
      const returnStrength = currentScene === 0 ? 0.001 : currentScene === 1 ? 0.011 : 0.015;
      for (const grain of grains) {
        const targetX = grain.tx + (grain.bound ? Math.cos(now * 0.0017 + grain.phase) * 0.8 : 0);
        const targetY = grain.ty + (grain.bound ? Math.sin(now * 0.0014 + grain.phase) * 0.8 : 0);
        const targetDx = targetX - grain.x;
        const targetDy = targetY - grain.y;
        const targetDistance = Math.max(1, Math.hypot(targetDx, targetDy));
        const grainStrength = grain.bound ? returnStrength : 0.00045;
        grain.vx += targetDx * grainStrength * delta;
        grain.vy += targetDy * grainStrength * delta;
        if (grain.bound && targetDistance > 3) {
          const slither = Math.sin(now * 0.0032 + grain.phase + targetDistance * 0.018) * Math.min(0.22, targetDistance / 650) * delta;
          grain.vx += (-targetDy / targetDistance) * slither;
          grain.vy += (targetDx / targetDistance) * slither;
        } else if (!grain.bound) {
          grain.vx += Math.cos(now * 0.0011 + grain.phase) * 0.006 * delta;
          grain.vy += Math.sin(now * 0.0013 + grain.phase) * 0.006 * delta;
        }
        if (pointer) {
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
      if (currentScene === 5) setTargets(targetsForScene(5), 5);
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
