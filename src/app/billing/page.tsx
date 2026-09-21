import type { Metadata } from "next";
import BillingClient from "@/components/billing/BillingClient";

export const metadata: Metadata = {
  title: "Pricing — LatamJobs API",
  description:
    "Indie $49 USD/mes y Scale $199 USD/mes. Pago recurrente vía Mercado Pago Colombia (COP).",
};

export default function BillingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container py-16 max-w-4xl">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground mb-8"
        >
          ← Volver al landing
        </a>

        <div className="kicker">
          <span className="num">/billing</span>
          <span className="line" />
          <span className="label">Pricing</span>
        </div>

        <h1 className="text-section mt-4 mb-4">Elegí tu plan</h1>
        <p className="text-lead mb-10">
          Pago mensual recurrente vía Mercado Pago (Colombia, COP). Cancelás
          cuando quieras desde tu cuenta de MP. Sin contratos, sin setup fees.
        </p>

        <BillingClient />

        <div className="mt-12 border border-border bg-surface rounded-xl p-6 text-sm">
          <h3 className="font-semibold mb-2">¿Cómo funciona?</h3>
          <ol className="space-y-2 text-muted list-decimal list-inside">
            <li>
              Cliqueás en el plan que querés y nos das tu email.
            </li>
            <li>
              Te redirigimos a Mercado Pago (hosted checkout). Pagás con
              tarjeta crédito/débito, PSE, Nequi o Daviplata.
            </li>
            <li>
              Una vez confirmado el pago, te llega un email con tu API key y
              acceso inmediato a <code>/v1/search</code>.
            </li>
            <li>
              La suscripción se renueva automáticamente cada mes. Cancelás
              cuando quieras desde tu cuenta de MP.
            </li>
          </ol>
        </div>

        <p className="text-xs text-muted mt-6 text-center">
          Precios en COP. La conversión a USD es referencial (~COP$4.100/USD).
          Si querés pagar desde otro país de LATAM, contactanos.
        </p>
      </div>
    </main>
  );
}
