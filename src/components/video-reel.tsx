"use client";

import clsx from "clsx";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { CoachMark } from "./logo";

export type Scene = {
  seconds: number;
  kind: "quote" | "stat" | "card" | "logo";
  eyebrow?: string;
  text: string;
  sub?: string;
};

// Anteprima di un video verticale 9:16: le scene scorrono come nel montaggio finale
export function VideoReel({ scenes }: { scenes: Scene[] }) {
  const [index, setIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const scene = scenes[index];
  const done = index === scenes.length - 1 && elapsed >= scene.seconds;

  useEffect(() => {
    if (!playing || done) return;
    const t = setInterval(() => setElapsed((e) => e + 0.1), 100);
    return () => clearInterval(t);
  }, [playing, done]);

  useEffect(() => {
    if (elapsed >= scene.seconds && index < scenes.length - 1) {
      setIndex((i) => i + 1);
      setElapsed(0);
    }
  }, [elapsed, scene.seconds, index, scenes.length]);

  function toggle() {
    if (done) {
      setIndex(0);
      setElapsed(0);
      setPlaying(true);
      return;
    }
    setPlaying((p) => !p);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Metti in pausa il video" : "Guarda il video"}
      className="relative mx-auto block aspect-[9/16] w-full max-w-[260px] overflow-hidden rounded-3xl bg-soot text-left text-white shadow-lg"
    >
      <div className="absolute inset-x-3 top-3 z-10 flex gap-1">
        {scenes.map((s, i) => (
          <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-white/25">
            <div
              className="h-full bg-brand"
              style={{ width: i < index ? "100%" : i === index ? `${Math.min(100, (elapsed / s.seconds) * 100)}%` : "0%" }}
            />
          </div>
        ))}
      </div>

      <div key={index} className="absolute inset-0 flex flex-col justify-center px-6 animate-[fadein_400ms_ease-out]">
        {scene.eyebrow && <div className="mb-3 text-xs font-medium uppercase tracking-wider text-white/60">{scene.eyebrow}</div>}
        {scene.kind === "quote" && (
          <>
            <div className="mb-4 grid size-14 place-items-center rounded-full bg-brand text-xl font-semibold text-soot">
              {scene.eyebrow?.charAt(0) ?? "C"}
            </div>
            <p className="text-xl font-semibold leading-snug">{scene.text}</p>
          </>
        )}
        {scene.kind === "stat" && (
          <>
            <p className="text-6xl font-semibold tracking-tight">{scene.text}</p>
            {scene.sub && <p className="mt-3 text-base text-white/80">{scene.sub}</p>}
          </>
        )}
        {scene.kind === "card" && (
          <div className="rounded-2xl bg-white p-4 text-slate-900">
            <p className="text-base font-semibold leading-snug">{scene.text}</p>
            {scene.sub && <p className="mt-2 text-sm text-slate-500">{scene.sub}</p>}
          </div>
        )}
        {scene.kind === "logo" && (
          <div className="text-center">
            <CoachMark className="mx-auto mb-4 size-14" />
            <p className="text-xl font-semibold leading-snug">{scene.text}</p>
            {scene.sub && <p className="mt-3 text-sm text-white/70">{scene.sub}</p>}
          </div>
        )}
        {scene.kind !== "stat" && scene.kind !== "card" && scene.kind !== "logo" && scene.sub && (
          <p className="mt-3 text-sm text-white/70">{scene.sub}</p>
        )}
      </div>

      <div
        className={clsx(
          "absolute inset-0 grid place-items-center bg-black/30 transition-opacity",
          playing && !done ? "pointer-events-none opacity-0" : "opacity-100",
        )}
      >
        <span className="grid size-14 place-items-center rounded-full bg-white/90 text-slate-900">
          {done ? <RotateCcw className="size-6" /> : playing ? <Pause className="size-6" /> : <Play className="ml-1 size-6" />}
        </span>
      </div>
    </button>
  );
}
