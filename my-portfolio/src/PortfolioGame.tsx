import React, { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";

type Control = "left" | "right" | "jump";
type PlayerState = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  grounded: boolean;
  facing: 1 | -1;
  coyoteTime: number;
  jumpBuffer: number;
  landingTime: number;
};

const PLAYER_WIDTH = 94;
const PLAYER_HEIGHT = 140;
const FLOOR_INSET = 0;
const MAX_RUN_SPEED = 305;
const JUMP_SPEED = 610;

const moveToward = (value: number, target: number, amount: number) => {
  if (value < target) return Math.min(value + amount, target);
  if (value > target) return Math.max(value - amount, target);
  return target;
};

const PortfolioGame = () => {
  const characterRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLSpanElement>(null);
  const controlsRef = useRef(new Set<Control>());
  const initializedRef = useRef(false);
  const playerRef = useRef<PlayerState>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    grounded: true,
    facing: 1,
    coyoteTime: 0.1,
    jumpBuffer: 0,
    landingTime: 0,
  });

  useEffect(() => {
    const press = (control: Control) => {
      controlsRef.current.add(control);
      if (control === "jump") playerRef.current.jumpBuffer = 0.13;
    };

    const release = (control: Control) => {
      controlsRef.current.delete(control);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const control =
        key === "arrowleft" || key === "a" ? "left" :
        key === "arrowright" || key === "d" ? "right" :
        key === "arrowup" || key === "w" || key === " " ? "jump" : null;

      if (control) {
        if (!event.repeat) press(control);
        event.preventDefault();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (key === "arrowleft" || key === "a") release("left");
      if (key === "arrowright" || key === "d") release("right");
      if (key === "arrowup" || key === "w" || key === " ") release("jump");
    };

    const clearControls = () => controlsRef.current.clear();
    window.addEventListener("keydown", handleKeyDown, { passive: false });
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", clearControls);

    let animationFrame = 0;
    let previousTime = performance.now();

    const frame = (now: number) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const floor = height - FLOOR_INSET;
      const player = playerRef.current;

      if (!initializedRef.current) {
        player.x = Math.max(20, width * 0.2);
        player.y = floor - PLAYER_HEIGHT;
        initializedRef.current = true;
      }

      const delta = Math.min((now - previousTime) / 1000, 0.032);
      previousTime = now;
      const movingLeft = controlsRef.current.has("left");
      const movingRight = controlsRef.current.has("right");
      const horizontalInput = movingLeft === movingRight ? 0 : movingLeft ? -1 : 1;

      if (horizontalInput) {
        const acceleration = player.grounded ? 2150 : 1080;
        player.vx = moveToward(
          player.vx,
          horizontalInput * MAX_RUN_SPEED,
          acceleration * delta,
        );
        player.facing = horizontalInput as 1 | -1;
      } else {
        const deceleration = player.grounded ? 2550 : 260;
        player.vx = moveToward(player.vx, 0, deceleration * delta);
      }

      player.coyoteTime = player.grounded
        ? 0.105
        : Math.max(0, player.coyoteTime - delta);
      player.jumpBuffer = Math.max(0, player.jumpBuffer - delta);
      player.landingTime = Math.max(0, player.landingTime - delta);

      if (player.jumpBuffer > 0 && player.coyoteTime > 0) {
        player.vy = -JUMP_SPEED;
        player.grounded = false;
        player.coyoteTime = 0;
        player.jumpBuffer = 0;
      }

      if (!controlsRef.current.has("jump") && player.vy < -245) {
        player.vy = moveToward(player.vy, -245, 1850 * delta);
      }

      player.vy = Math.min(980, player.vy + 1660 * delta);
      player.x += player.vx * delta;
      player.y += player.vy * delta;

      const minX = 2;
      const maxX = Math.max(minX, width - PLAYER_WIDTH - 2);
      if (player.x <= minX || player.x >= maxX) player.vx = 0;
      player.x = Math.max(minX, Math.min(maxX, player.x));

      const wasGrounded = player.grounded;
      const landingVelocity = player.vy;
      player.grounded = false;

      if (player.y + PLAYER_HEIGHT >= floor) {
        player.y = floor - PLAYER_HEIGHT;
        player.vy = 0;
        player.grounded = true;
        if (!wasGrounded && landingVelocity > 260) player.landingTime = 0.15;
      }

      const character = characterRef.current;
      const shadow = shadowRef.current;
      const airHeight = Math.max(0, floor - (player.y + PLAYER_HEIGHT));
      const shadowScale = Math.max(0.48, 1 - airHeight / 320);
      const speedRatio = Math.min(1, Math.abs(player.vx) / MAX_RUN_SPEED);

      if (character) {
        character.style.transform = `translate3d(${player.x}px, ${player.y}px, 0)`;
        character.style.setProperty("--walk-duration", `${Math.round(560 - speedRatio * 190)}ms`);
        character.dataset.motion =
          player.landingTime > 0
            ? "landing"
            : !player.grounded
              ? "jumping"
              : Math.abs(player.vx) > 22
                ? "running"
                : "idle";
        character.dataset.facing = String(player.facing);
      }

      if (shadow) {
        shadow.style.transform = `translate3d(${player.x + 18}px, ${floor - 6}px, 0) scaleX(${shadowScale})`;
        shadow.style.opacity = String(Math.max(0.16, 0.48 - airHeight / 520));
      }

      animationFrame = requestAnimationFrame(frame);
    };

    animationFrame = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", clearControls);
    };
  }, []);

  const setControl = (control: Control, pressed: boolean) => {
    if (pressed) {
      controlsRef.current.add(control);
      if (control === "jump") playerRef.current.jumpBuffer = 0.13;
    } else {
      controlsRef.current.delete(control);
    }
  };

  const controlButton = (control: Control, label: string, icon: React.ReactNode) => (
    <button
      type="button"
      aria-label={label}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        setControl(control, true);
      }}
      onPointerUp={() => setControl(control, false)}
      onPointerCancel={() => setControl(control, false)}
      onPointerLeave={() => setControl(control, false)}
    >
      {icon}
    </button>
  );

  return (
    <div className="portfolio-game" aria-label="Interactive portfolio character">
      <span ref={shadowRef} className="game-character__shadow" aria-hidden="true" />

      <div ref={characterRef} className="game-character" data-motion="idle" data-facing="1">
        <span className="game-character__body" aria-hidden="true">
          <span className="game-character__sprite" />
        </span>
      </div>

      <div className="game-hint" aria-hidden="true">
        <span>Move ← → / A D</span>
        <span>Jump ↑ / W / Space</span>
      </div>

      <div className="game-controls game-controls--active">
        {controlButton("left", "Move left", <ArrowLeft size={15} />)}
        {controlButton("jump", "Jump", <ArrowUp size={15} />)}
        {controlButton("right", "Move right", <ArrowRight size={15} />)}
      </div>
    </div>
  );
};

export default PortfolioGame;
