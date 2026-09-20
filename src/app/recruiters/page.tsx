import Link from "next/link";
import { SignupForm } from "@/components/landing/SignupForm";

export const metadata = {
  title: "Para recruiters LATAM — LatamJobs API",
  description:
    "Cómo LatamJobs API ahorra 4 horas por vacante a recruiters en México, Colombia, Argentina, Chile, Perú y Uruguay.",
};

export default function RecruitersPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <Link
        href="/"
        className="text-sm text-muted hover:text-accent transition-colors"
      >
        ← Volver
      </Link>

      <h1 className="text-5xl font-semibold tracking-tight mt-6 mb-6">
        Para recruiters LATAM.
      </h1>
      <p className="text-xl text-muted mb-12 max-w-2xl">
        Esta página es para vos si pasás más de 3 horas por día copiando
        ofertas de Computrabajo, Bumeran y OCC a un Excel.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-3">El costo real</h2>
          <p className="text-muted leading-relaxed">
            Una vacante tech típica toca 4 portales. Cada portal te toma 15
            minutos consolidar. Por vacante: <strong>1 hora</strong>. Por 10
            vacantes: <strong>10 horas</strong> a la semana que podrías usar
            entrevistando.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-3">Lo que cambia</h2>
          <p className="text-muted leading-relaxed">
            Una llamada a la API reemplaza las 4 pestañas. El salario ya
            viene como número, no como string. Las duplicadas se mergean.
            Webhooks te avisan cuando aparece algo nuevo en tus keywords.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-accent/30 bg-gradient-to-br from-card to-card-hover p-8 lg:p-12 text-center">
        <h2 className="text-3xl font-semibold tracking-tight mb-3">
          Sumate a los 30 que validan esto.
        </h2>
        <p className="text-muted mb-8 max-w-md mx-auto">
          Si llegamos a 30 recruiters en 48h, abrimos. Precio founding
          $49/mes, de por vida.
        </p>
        <div className="max-w-sm mx-auto">
          <SignupForm />
        </div>
      </div>
    </main>
  );
}
