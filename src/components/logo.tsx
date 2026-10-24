import clsx from "clsx";
import Link from "next/link";

// Il segno di Coach: un fumetto verde evidenziatore con dentro l'onda della voce
export function CoachMark({ className, speaking = false }: { className?: string; speaking?: boolean }) {
  const bars = [9, 15, 21, 13, 7];
  return (
    <svg viewBox="0 0 40 40" className={clsx("shrink-0", className)} aria-hidden>
      <path d="M8 4h24a6 6 0 0 1 6 6v15a6 6 0 0 1-6 6H17l-7 6v-6H8a6 6 0 0 1-6-6V10a6 6 0 0 1 6-6Z" fill="var(--brand)" />
      {bars.map((h, i) => (
        <rect
          key={i}
          x={10.5 + i * 4.2}
          y={17.5 - h / 2}
          width="2.6"
          height={h}
          rx="1.3"
          fill="var(--soot)"
          className={speaking ? "animate-wave" : undefined}
          style={speaking ? { animationDelay: `${i * 110}ms`, transformBox: "fill-box" } : undefined}
        />
      ))}
    </svg>
  );
}

export function Logo({ href = "/", tone = "light" }: { href?: string; tone?: "light" | "dark" }) {
  return (
    <Link href={href} className="flex items-center gap-2 font-semibold tracking-tight" aria-label="Coach, home">
      <CoachMark className="size-8" />
      <span className={clsx("text-lg", tone === "dark" ? "text-white" : "text-foreground")}>Coach</span>
    </Link>
  );
}
