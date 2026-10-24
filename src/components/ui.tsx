import clsx from "clsx";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={clsx("rounded-[var(--radius-card)] border border-border bg-surface p-5", className)}>{children}</div>
  );
}

// Titolo di sezione dentro una card: 16px, con l'azione o il periodo a destra
export function CardTitle({ children, aside }: { children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <h2 className="text-base font-semibold">{children}</h2>
      {aside && <div className="shrink-0 text-sm text-muted">{aside}</div>}
    </div>
  );
}

// Riga sotto il titolo della pagina (che sta nell'header): il fatto da guardare e le azioni
export function PageHeader({
  title,
  description,
  action,
}: {
  title?: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        {title && <h2 className="text-xl font-semibold tracking-tight">{title}</h2>}
        {description && <p className={clsx("text-[15px] text-muted", title && "mt-1")}>{description}</p>}
      </div>
      {action && <div className="flex shrink-0 flex-wrap gap-2">{action}</div>}
    </div>
  );
}

const badgeTones = {
  neutral: "bg-surface-muted text-muted",
  brand: "bg-brand text-brand-foreground",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-danger-soft text-danger",
};

export function Badge({
  tone = "neutral",
  children,
  className,
}: {
  tone?: keyof typeof badgeTones;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex flex-none items-center whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium",
        badgeTones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

const buttonVariants = {
  primary: "bg-soot text-white hover:bg-soot-3",
  secondary: "border border-control bg-surface text-foreground hover:bg-surface-muted",
  ghost: "text-muted hover:bg-surface-muted hover:text-foreground",
  brand: "bg-brand text-brand-foreground hover:bg-[#cdf27f]",
  danger: "bg-danger text-white hover:bg-[#a91d22]",
};

export type ButtonVariant = keyof typeof buttonVariants;

export const buttonClass = (variant: ButtonVariant = "primary", size: "sm" | "md" | "lg" = "md") =>
  clsx(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[background-color,transform] active:scale-[0.97] disabled:opacity-50",
    size === "sm" && "h-8 rounded-[var(--radius-control)] px-3 text-sm",
    size === "md" && "h-9 rounded-[var(--radius-control)] px-4 text-sm",
    size === "lg" && "h-12 rounded-[var(--radius-control)] px-5 text-base",
    buttonVariants[variant],
  );

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; size?: "sm" | "md" | "lg" }) {
  return <button className={clsx(buttonClass(variant, size), className)} {...props} />;
}

export function Progress({ value, className, tone = "ink" }: { value: number; className?: string; tone?: "ink" | "data" }) {
  return (
    <div className={clsx("h-1.5 w-full overflow-hidden rounded-full bg-surface-muted", className)}>
      {value > 0 && (
        <div
          className={clsx("h-full rounded-full", tone === "data" ? "bg-data" : "bg-soot")}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      )}
    </div>
  );
}

export const fmt1 = (n: number) => n.toFixed(1).replace(".", ",");
export const signed1 = (n: number) => `${n > 0 ? "+" : n < 0 ? "−" : ""}${fmt1(Math.abs(n))}`;

export function ScorePill({ score }: { score: number }) {
  const tone = score >= 4 ? "success" : score >= 3 ? "neutral" : "danger";
  return (
    <Badge tone={tone} className="num">
      {fmt1(score)}
      <span className="ml-0.5 opacity-70">/5</span>
    </Badge>
  );
}

// Variazione: il colore dice bene o male, non su o giù. Zero è grigio.
export function Delta({ value, suffix }: { value: number; suffix?: string }) {
  const tone = value > 0 ? "text-success" : value < 0 ? "text-danger" : "text-muted";
  return (
    <span className={clsx("num whitespace-nowrap font-medium", tone)}>
      {value > 0 ? "▲" : value < 0 ? "▼" : "="} {signed1(value)}
      {suffix && <span className="font-normal text-muted"> {suffix}</span>}
    </span>
  );
}

// Tinte di identità: chiare, distanti tra loro, mai usate per i dati
const tints = ["#e3ecd6", "#dbe7ef", "#f1e6d3", "#f2dede", "#d6ece8", "#e9e6df", "#e6ecf5", "#f3ead8"];
const tintFor = (name: string) => tints[[...name].reduce((s, c) => s + c.charCodeAt(0), 0) % tints.length];

export const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

export function Avatar({ name, className }: { name: string; className?: string }) {
  return (
    <div
      className={clsx("grid size-8 shrink-0 place-items-center rounded-full text-xs font-semibold text-foreground", className)}
      style={{ background: tintFor(name) }}
      aria-hidden
    >
      {initials(name)}
    </div>
  );
}

export const formatMinutes = (m: number) => (m >= 60 ? `${Math.floor(m / 60)} h ${m % 60} m` : `${m} m`);
export const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("it-IT", { day: "numeric", month: "short" });
export const mmss = (sec: number) =>
  `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;

export const difficultyDots = { Facile: 1, Media: 2, Difficile: 3 } as const;

export function Difficulty({ level }: { level: keyof typeof difficultyDots }) {
  const n = difficultyDots[level];
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-muted" title={`Difficoltà: ${level}`}>
      <span className="inline-flex gap-0.5" aria-hidden>
        {[1, 2, 3].map((i) => (
          <span key={i} className={clsx("size-1.5 rounded-full", i <= n ? "bg-soot" : "bg-control")} />
        ))}
      </span>
      {level}
    </span>
  );
}
