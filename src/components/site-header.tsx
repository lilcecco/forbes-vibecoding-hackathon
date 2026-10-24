import { Logo } from "@/components/logo";
import Link from "next/link";

const links = [
  { href: "/piano", label: "Piano" },
  { href: "/piano#numeri", label: "Numeri" },
  { href: "/social", label: "Social" },
];

// Header delle pagine pubbliche: landing, piano di go to market, contenuti social
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border/60 bg-surface/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6">
        <Logo />
        <nav className="flex items-center gap-1 text-sm">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-lg px-2 py-1.5 text-muted hover:bg-surface-muted hover:text-foreground sm:px-3">
              {l.label}
            </Link>
          ))}
          <Link href="/dashboard" className="ml-1 rounded-lg bg-brand px-3 py-1.5 font-medium text-brand-foreground hover:bg-brand/90 sm:px-4">
            Demo
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-8 text-center text-sm text-muted">
      Coach · Vibecoding Hackathon Next Leaders × Forbes · 2026
      <div className="mt-1 text-xs">I numeri senza fonte sono ipotesi. Le fonti sono il manuale dei casi della gara.</div>
    </footer>
  );
}
