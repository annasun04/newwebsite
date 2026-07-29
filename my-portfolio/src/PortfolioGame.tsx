import React, { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";

type PlayerId = "younger" | "older";
type Control = "left" | "right" | "jump";
type PlayerState = {
  x: number; y: number; vx: number; vy: number;
  grounded: boolean; facing: 1 | -1;
};

const PLAYER_WIDTH = 42;
const PLAYER_HEIGHT = 82;

const PortfolioGame = () => {
  const youngerRef = useRef<HTMLDivElement>(null);
  const olderRef = useRef<HTMLDivElement>(null);
  const keysRef = useRef(new Set<string>());
  const initializedRef = useRef(false);
  const playersRef = useRef<Record<PlayerId, PlayerState>>({
    younger: { x: 0, y: 0, vx: 0, vy: 0, grounded: false, facing: 1 },
    older: { x: 0, y: 0, vx: 0, vy: 0, grounded: false, facing: -1 },
  });

  useEffect(() => {
    const platformElements = Array.from(
      document.querySelectorAll<HTMLElement>(
        "main section, main .rounded-2xl, main .rounded-3xl, main .grid > div",
      ),
    ).filter((element) => element.offsetWidth > 130 && element.offsetHeight > 35);
    platformElements.forEach((element) => element.classList.add("game-platform"));

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (["arrowleft", "arrowright", "arrowup", "a", "d", "w"].includes(key)) {
        keysRef.current.add(key);
        event.preventDefault();
      }
    };
    const handleKeyUp = (event: KeyboardEvent) => keysRef.current.delete(event.key.toLowerCase());
    const clearKeys = () => keysRef.current.clear();
    window.addEventListener("keydown", handleKeyDown, { passive: false });
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", clearKeys);

    let animationFrame = 0;
    let previousTime = performance.now();
    const frame = (now: number) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const floor = height - 18;
      if (!initializedRef.current) {
        playersRef.current.younger.x = Math.max(24, width * 0.23);
        playersRef.current.older.x = Math.min(width - PLAYER_WIDTH - 24, width * 0.74);
        playersRef.current.younger.y = height * 0.55;
        playersRef.current.older.y = height * 0.5;
        initializedRef.current = true;
      }

      const delta = Math.min((now - previousTime) / 1000, 0.032);
      previousTime = now;
      const platforms = platformElements
        .map((element) => element.getBoundingClientRect())
        .filter((rect) => rect.bottom > 0 && rect.top < height && rect.width > 80);

      const updatePlayer = (
        id: PlayerId, leftKey: string, rightKey: string, jumpKey: string,
        element: HTMLDivElement | null,
      ) => {
        const player = playersRef.current[id];
        const previousBottom = player.y + PLAYER_HEIGHT;
        const movingLeft = keysRef.current.has(leftKey);
        const movingRight = keysRef.current.has(rightKey);
        if (movingLeft !== movingRight) {
          player.vx += (movingLeft ? -1450 : 1450) * delta;
          player.facing = movingLeft ? -1 : 1;
        } else {
          player.vx *= Math.pow(0.001, delta);
        }
        player.vx = Math.max(-260, Math.min(260, player.vx));
        if (keysRef.current.has(jumpKey) && player.grounded) {
          player.vy = -535;
          player.grounded = false;
          keysRef.current.delete(jumpKey);
        }

        player.vy = Math.min(760, player.vy + 1350 * delta);
        player.x += player.vx * delta;
        player.y += player.vy * delta;
        player.x = Math.max(6, Math.min(width - PLAYER_WIDTH - 6, player.x));
        player.grounded = false;

        if (player.vy >= 0) {
          const newBottom = player.y + PLAYER_HEIGHT;
          let landingTop = Number.POSITIVE_INFINITY;
          for (const platform of platforms) {
            const overlapsX =
              player.x + PLAYER_WIDTH * 0.72 > platform.left &&
              player.x + PLAYER_WIDTH * 0.28 < platform.right;
            const crossedTop =
              previousBottom <= platform.top + 7 &&
              newBottom >= platform.top &&
              newBottom <= platform.top + Math.max(34, player.vy * delta + 10);
            if (overlapsX && crossedTop && platform.top < landingTop) landingTop = platform.top;
          }
          if (landingTop !== Number.POSITIVE_INFINITY) {
            player.y = landingTop - PLAYER_HEIGHT;
            player.vy = 0;
            player.grounded = true;
          } else if (newBottom >= floor) {
            player.y = floor - PLAYER_HEIGHT;
            player.vy = 0;
            player.grounded = true;
          }
        }

        if (element) {
          element.style.transform =
            `translate3d(${player.x}px, ${player.y}px, 0) scaleX(${player.facing})`;
          element.dataset.motion =
            !player.grounded ? "jumping" : Math.abs(player.vx) > 24 ? "running" : "idle";
        }
      };

      updatePlayer("younger", "arrowleft", "arrowright", "arrowup", youngerRef.current);
      updatePlayer("older", "a", "d", "w", olderRef.current);
      animationFrame = requestAnimationFrame(frame);
    };
    animationFrame = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", clearKeys);
      platformElements.forEach((element) => element.classList.remove("game-platform"));
    };
  }, []);

  const setControl = (player: PlayerId, control: Control, pressed: boolean) => {
    const key = player === "younger"
      ? { left: "arrowleft", right: "arrowright", jump: "arrowup" }[control]
      : { left: "a", right: "d", jump: "w" }[control];
    if (pressed) keysRef.current.add(key);
    else keysRef.current.delete(key);
  };

  const controlButton = (
    player: PlayerId, control: Control, label: string, icon: React.ReactNode,
  ) => (
    <button
      type="button"
      aria-label={`${label} ${player} self`}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        setControl(player, control, true);
      }}
      onPointerUp={() => setControl(player, control, false)}
      onPointerCancel={() => setControl(player, control, false)}
      onPointerLeave={() => setControl(player, control, false)}
    >
      {icon}
    </button>
  );

  const character = (id: PlayerId, ref: React.RefObject<HTMLDivElement | null>) => (
    <div ref={ref} className={`game-character game-character--${id}`} data-motion="idle">
      <span className="game-character__label">{id}</span>
      <span className="game-character__shadow" />
      <span className="game-character__body">
        <span className="game-character__head" />
        <span className="game-character__torso" />
        <span className="game-character__leg game-character__leg--left" />
        <span className="game-character__leg game-character__leg--right" />
      </span>
    </div>
  );

  return (
    <div className="portfolio-game" aria-label="Interactive portfolio characters">
      {character("younger", youngerRef)}
      {character("older", olderRef)}
      <div className="game-hint" aria-hidden="true">
        <span><strong>younger</strong> ← ↑ →</span>
        <span><strong>older</strong> A W D</span>
      </div>
      <div className="game-controls game-controls--younger">
        <span>younger</span>
        {controlButton("younger", "left", "Move", <ArrowLeft size={15} />)}
        {controlButton("younger", "jump", "Jump", <ArrowUp size={15} />)}
        {controlButton("younger", "right", "Move", <ArrowRight size={15} />)}
      </div>
      <div className="game-controls game-controls--older">
        <span>older</span>
        {controlButton("older", "left", "Move", <ArrowLeft size={15} />)}
        {controlButton("older", "jump", "Jump", <ArrowUp size={15} />)}
        {controlButton("older", "right", "Move", <ArrowRight size={15} />)}
      </div>
    </div>
  );
};

export default PortfolioGame;
