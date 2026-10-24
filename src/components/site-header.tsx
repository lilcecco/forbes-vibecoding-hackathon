import { Logo } from "@/components/logo";
import Link from "next/link";

const links = [
  { href: "/#strategia", label: "Piano" },
  { href: "/#piano", label: "Numeri" },
  { href: "/social", label: "Social" },
];

// Header delle pagine pubbliche fuori dalla landing (oggi: /social), con gli stessi colori della landing
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 bg-soot text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6">
        <Logo tone="dark" />
        <nav className="flex items-center gap-1 text-sm">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-[var(--radius-control)] px-2 py-1.5 text-on-soot-muted hover:text-white sm:px-3">
              {l.label}
            </Link>
          ))}
          <Link href="/dashboard" className="ml-1 rounded-[var(--radius-control)] bg-brand px-3 py-1.5 font-medium text-soot hover:bg-[#cdf27f] sm:px-4">
            Demo
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-soot py-8 text-center text-sm text-on-soot-muted">
      Coach · Vibecoding Hackathon Next Leaders × Forbes · 2026
      <div className="mt-1 text-xs">I numeri senza fonte sono ipotesi di lavoro del team.</div>
    </footer>
  );
}
