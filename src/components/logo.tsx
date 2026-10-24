import Link from "next/link";

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2 font-semibold tracking-tight">
      <span className="grid size-8 place-items-center rounded-lg bg-brand text-sm font-bold text-brand-foreground">
        C
      </span>
      <span className="text-lg">Coach</span>
    </Link>
  );
}
