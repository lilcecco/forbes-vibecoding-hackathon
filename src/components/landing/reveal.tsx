"use client";

import { useEffect } from "react";

// Entrata delle parti di ogni sezione: titolo, testo, immagine, con 80 ms di scarto.
// Senza script il contenuto resta visibile: .reveal si nasconde solo sotto .reveal-ready.
export function RevealOnScroll() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    // ciò che è già nel primo schermo non si nasconde
    els.filter((el) => el.getBoundingClientRect().top < window.innerHeight).forEach((el) => el.classList.add("is-in"));
    document.documentElement.classList.add("reveal-ready");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const siblings = Array.from(el.parentElement?.querySelectorAll(":scope > .reveal") ?? []);
          el.style.transitionDelay = `${Math.max(0, siblings.indexOf(el)) * 80}ms`;
          el.classList.add("is-in");
          io.unobserve(el);
        }),
      { rootMargin: "0px 0px -10% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
