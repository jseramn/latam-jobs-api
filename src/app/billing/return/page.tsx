import Link from "next/link";

export const metadata = {
  title: "Pago procesado — LatamJobs API",
};

export default function BillingReturnPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; preapproval_id?: string }>;
}) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container py-16 max-w-2xl">
        <div className="kicker justify-center">
          <span className="num text-foreground">04</span>
          <span className="line" />
          <span className="label text-muted">Billing return</span>
        </div>
        <h1 className="text-section mt-4 mb-4 text-center">
          Pago procesado
        </h1>
        <p className="text-body text-center mb-8">
          Si el pago fue aprobado, en los próximos minutos te llega un email
          con tu API key y los pasos para empezar a usar la API. Si no ves el
          email en 10 minutos, revisá spam o contactanos a{" "}
          <a href="mailto:hola@jseramn.tech" className="link-blue">
            hola@jseramn.tech
          </a>
          .
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/docs" className="btn btn-secondary">
            Ver docs
          </Link>
          <Link href="/" className="btn btn-primary">
            Volver al landing
          </Link>
        </div>
        <p className="text-xs text-muted mt-12 text-center">
          Esta página se muestra al volver de Mercado Pago. El estado real de
          tu suscripción se actualiza vía webhook en los próximos segundos.
        </p>
      </div>
    </main>
  );
}
