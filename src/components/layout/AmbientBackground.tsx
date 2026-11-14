"use client";

import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 38;

/** Decorative particle field plus a cursor-following glow. Disabled for reduced motion. */
export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    const glow = glowRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !glow || !ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    const onPointerMove = (e: PointerEvent) => {
      glow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      glow.style.opacity = "1";
    };

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x = (p.x + p.vx + width) % width;
        p.y = (p.y + p.vy + height) % height;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(45, 212, 191, ${p.alpha})`;
        ctx.fill();
      }
      frame = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute -top-40 left-1/2 h-95 w-180 -translate-x-1/2 rounded-full bg-teal-500/10 blur-[130px]" />
      <div className="absolute top-1/3 -right-32 h-120 w-120 rounded-full bg-teal-400/5 blur-[140px]" />
      <div className="absolute bottom-20 -left-20 h-105 w-105 rounded-full bg-cyan-500/10 blur-[130px]" />
      <canvas ref={canvasRef} className="h-full w-full opacity-40" />
      <div
        ref={glowRef}
        className="absolute top-0 left-0 h-125 w-125 rounded-full bg-teal-500/10 opacity-0 blur-[120px] transition-opacity duration-300"
      />
    </div>
  );
}

