"use client";

import { useState } from "react";

interface TierCardProps {
  name: string;
  priceCop: number;
  usdEquivalent: number;
  features: string[];
  highlighted?: boolean;
  ctaLabel: string;
  onChoose: () => void;
  loading?: boolean;
}

function TierCard(props: TierCardProps) {
  return (
    <article
      className={`card flex flex-col h-full ${
        props.highlighted ? "ring-2 ring-foreground" : ""
      }`}
    >
      {props.highlighted && (
        <div className="text-xs uppercase tracking-wider text-muted mb-2">
          Founding price · COP
        </div>
      )}
      <h3 className="text-2xl font-semibold tracking-tight mb-2">{props.name}</h3>
      <div className="mb-1">
        <span className="text-4xl font-semibold tracking-tight">
          ${props.priceCop.toLocaleString("es-CO")}
        </span>
        <span className="text-muted text-sm ml-1">COP/mes</span>
      </div>
      <div className="text-xs text-muted mb-6">
        ≈ ${props.usdEquivalent} USD/mes
      </div>
      <ul className="space-y-2 text-sm flex-1 mb-6">
        {props.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <span className="w-4 h-4 border border-foreground/40 mt-0.5 shrink-0" />
            <span className="text-foreground/85">{f}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className={`btn ${props.highlighted ? "btn-primary" : "btn-secondary"} w-full`}
        onClick={props.onChoose}
        disabled={props.loading}
      >
        {props.loading ? "Procesando..." : props.ctaLabel}
      </button>
    </article>
  );
}

export default function BillingClient() {
  const [loading, setLoading] = useState<"indie" | "scale" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onChoose = async (tier: "indie" | "scale") => {
    setError(null);
    const email = window.prompt(
      "Email para la suscripción (te enviaremos el link de pago de Mercado Pago):",
    );
    if (!email || !email.includes("@")) return;

    setLoading(tier);
    try {
      const r = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tier }),
      });
      const data = await r.json();
      if (!r.ok) {
        setError(data.error ?? "Error creando checkout");
        return;
      }
      if (data.init_point) {
        window.location.href = data.init_point;
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="border border-foreground/30 bg-surface p-4 text-sm">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <TierCard
          name="Indie"
          priceCop={200_000}
          usdEquivalent={49}
          features={[
            "10.000 calls/mes",
            "Todos los países LATAM",
            "Webhooks de cambios",
            "Soporte por email",
          ]}
          highlighted
          ctaLabel="Empezar con Indie"
          onChoose={() => onChoose("indie")}
          loading={loading === "indie"}
        />
        <TierCard
          name="Scale"
          priceCop={800_000}
          usdEquivalent={199}
          features={[
            "100.000 calls/mes",
            "Webhooks + polling",
            "Dedup + salary parsing prioritario",
            "Soporte prioritario",
            "99.5% SLA",
          ]}
          ctaLabel="Empezar con Scale"
          onChoose={() => onChoose("scale")}
          loading={loading === "scale"}
        />
      </div>
    </div>
  );
}
