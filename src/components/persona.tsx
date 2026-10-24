import clsx from "clsx";

// Ritratti degli avatar del role play, disegnati in un unico stile piatto.
// Ogni scenario ha il suo interlocutore: età, capelli, umore e colori diversi.
type Look = {
  bg: string;
  skin: string;
  hair: string;
  shirt: string;
  style: "short" | "long" | "bob" | "bald" | "crop";
  beard?: boolean;
  mustache?: boolean;
  glasses?: boolean;
  mood?: "calm" | "angry" | "doubtful";
};

const looks: Record<string, Look> = {
  s1: { bg: "#e9e6df", skin: "#e5b693", hair: "#8d8a84", shirt: "#33414f", style: "short", mustache: true, mood: "doubtful" },
  s2: { bg: "#dbe7ef", skin: "#efc8a6", hair: "#5e4029", shirt: "#a85c45", style: "long", mood: "doubtful" },
  s3: { bg: "#f2dede", skin: "#d79e78", hair: "#a7a39b", shirt: "#5b6a34", style: "bald", mood: "angry" },
  s4: { bg: "#d6ece8", skin: "#c48a61", hair: "#2a221d", shirt: "#2c5a5f", style: "crop", beard: true, mood: "calm" },
  s5: { bg: "#e3ecd6", skin: "#f2d0b5", hair: "#b98b45", shirt: "#424e5c", style: "bob", mood: "calm" },
  s6: { bg: "#f1e6d3", skin: "#ddaa86", hair: "#382a20", shirt: "#776654", style: "short", glasses: true, mood: "doubtful" },
};

const fallback: Look = { bg: "#e9e6df", skin: "#e2b08c", hair: "#4a3a2e", shirt: "#3d4650", style: "short" };

export function PersonaPortrait({
  scenarioId,
  speaking = false,
  className,
  label,
}: {
  scenarioId: string;
  speaking?: boolean;
  className?: string;
  label?: string;
}) {
  const l = looks[scenarioId] ?? fallback;
  const brow = l.mood === "angry" ? "angry" : l.mood === "doubtful" ? "doubtful" : "calm";
  return (
    <svg
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid slice"
      className={clsx("block", className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <rect width="200" height="200" fill={l.bg} />
      {/* capelli lunghi dietro le spalle */}
      {l.style === "long" && <path d="M58 92c0-40 20-62 42-62s42 22 42 62v62H58z" fill={l.hair} />}
      {/* spalle e collo */}
      <path d="M28 200c4-38 34-58 72-58s68 20 72 58z" fill={l.shirt} />
      <path d="M86 128h28v22c0 8-28 8-28 0z" fill={l.skin} />
      <path d="M84 146l16 14 16-14" fill="none" stroke="rgba(0,0,0,.18)" strokeWidth="3" strokeLinejoin="round" />
      {/* testa */}
      <ellipse cx="100" cy="92" rx="34" ry="40" fill={l.skin} />
      <ellipse cx="66" cy="96" rx="6" ry="9" fill={l.skin} />
      <ellipse cx="134" cy="96" rx="6" ry="9" fill={l.skin} />
      {/* capelli */}
      {l.style === "short" && <path d="M66 86c-2-28 14-44 34-44s38 14 34 44c-6-12-14-20-34-20s-28 8-34 20z" fill={l.hair} />}
      {l.style === "crop" && <path d="M68 80c2-22 14-32 32-32s30 10 32 32c-8-8-18-12-32-12s-24 4-32 12z" fill={l.hair} />}
      {l.style === "long" && <path d="M64 96c-4-36 12-56 36-56s40 20 36 56c-4-18-14-34-36-34s-32 16-36 34z" fill={l.hair} />}
      {l.style === "bob" && <path d="M62 108c-6-44 12-66 38-66s44 22 38 66l-8 2c2-20-4-40-30-44-26 4-32 24-30 44z" fill={l.hair} />}
      {l.style === "bald" && (
        <>
          <path d="M66 98c-2-10 0-18 4-22l4 22z" fill={l.hair} />
          <path d="M134 98c2-10 0-18-4-22l-4 22z" fill={l.hair} />
        </>
      )}
      {/* sopracciglia */}
      {brow === "angry" && (
        <>
          <path d="M78 80l16 6" stroke={l.hair === "#a7a39b" ? "#6d6a64" : l.hair} strokeWidth="4" strokeLinecap="round" />
          <path d="M122 80l-16 6" stroke={l.hair === "#a7a39b" ? "#6d6a64" : l.hair} strokeWidth="4" strokeLinecap="round" />
        </>
      )}
      {brow === "doubtful" && (
        <>
          <path d="M78 82q8-5 16-1" fill="none" stroke={l.hair} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M106 78q8-3 16 2" fill="none" stroke={l.hair} strokeWidth="3.5" strokeLinecap="round" />
        </>
      )}
      {brow === "calm" && (
        <>
          <path d="M78 82q8-4 16 0" fill="none" stroke={l.hair} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M106 82q8-4 16 0" fill="none" stroke={l.hair} strokeWidth="3.5" strokeLinecap="round" />
        </>
      )}
      {/* occhi */}
      <ellipse cx="86" cy="94" rx="3.6" ry="4.2" fill="#1f1b18" />
      <ellipse cx="114" cy="94" rx="3.6" ry="4.2" fill="#1f1b18" />
      {l.glasses && (
        <g fill="none" stroke="#1f1b18" strokeWidth="2.5">
          <rect x="74" y="86" width="22" height="16" rx="6" />
          <rect x="104" y="86" width="22" height="16" rx="6" />
          <path d="M96 93h8" />
        </g>
      )}
      {/* naso */}
      <path d="M100 98v12h-5" fill="none" stroke="rgba(0,0,0,.2)" strokeWidth="2.5" strokeLinecap="round" />
      {/* barba e baffi */}
      {l.beard && <path d="M68 100c2 26 14 38 32 38s30-12 32-38c-6 12-16 18-32 18s-26-6-32-18z" fill={l.hair} />}
      {l.mustache && <path d="M88 114c6-4 18-4 24 0-6 3-18 3-24 0z" fill={l.hair} />}
      {/* bocca: si muove quando l'avatar parla */}
      <rect
        x="92"
        y={l.mood === "angry" ? 119 : 118}
        width="16"
        height={speaking ? 6 : l.mood === "angry" ? 2.5 : 3}
        rx="2"
        fill="#5a2a22"
        className={speaking ? "animate-talk" : undefined}
      />
    </svg>
  );
}
