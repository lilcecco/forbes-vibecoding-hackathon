"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui";

// Demo: assegna uno scenario a una persona (in una versione reale scrive su Supabase)
export function AssignButton({ scenario, size = "sm", variant = "secondary" }: { scenario: string; size?: "sm" | "md"; variant?: "secondary" | "primary" }) {
  const [done, setDone] = useState(false);
  return (
    <Button
      size={size}
      variant={done ? "ghost" : variant}
      onClick={() => setDone(true)}
      disabled={done}
      title={`Assegna «${scenario}»`}
      aria-live="polite"
    >
      {done ? (
        <>
          <Check className="size-4" /> Assegnato
        </>
      ) : (
        "Assegna scenario"
      )}
    </Button>
  );
}
