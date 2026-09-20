import Link from "next/link";
import { SignupForm } from "@/components/landing/SignupForm";
import { DecryptReveal } from "@/components/effects/DecryptReveal";
import { AsciiScramble } from "@/components/effects/AsciiScramble";
import { AsciiSweep } from "@/components/effects/AsciiSweep";

export const metadata = {
  title: "Para recruiters LATAM — LatamJobs API",
  description:
    "Cómo LatamJobs API ahorra horas por vacante a recruiters en México, Colombia, Argentina, Chile, Perú y Uruguay.",
};

export default function RecruitersPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 font-mono">
      <Link href="/" className="text-xs text-muted hover:text-accent transition-colors">
        ← /home
      </Link>

      <p className="text-xs text-accent uppercase tracking-wider mt-6 mb-3">
        // para_recruiters_latam
      </p>

      <h1 className="text-5xl lg:text-6xl font-semibold tracking-tight mt-6 mb-6">
        <AsciiScramble text="Para recruiters LATAM." duration={1800} />
      </h1>

      <p className="text-xl text-muted mb-12 max-w-2xl">
        <DecryptReveal duration={2000} delay={600}>
          Esta página es para vos si pasás más de 3 horas por día copiando ofertas de Computrabajo, Bumeran, OCC y ZonaJobs a un Excel.
        </DecryptReveal>
      </p>

      <AsciiSweep height={50} />

      <div className="grid md:grid-cols-2 gap-8 my-16">
        <div>
          <p className="text-xs text-muted mb-3">// el_costo_real</p>
          <h2 className="text-2xl font-semibold mb-3">
            <DecryptReveal>El costo real</DecryptReveal>
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            Una vacante tech típica toca 4 portales. Cada portal te toma 15
            minutos consolidar. Por vacante: <strong className="text-foreground">1 hora</strong>. Por 10
            vacantes: <strong className="text-foreground">10 horas</strong> a la semana que podrías usar
            entrevistando.
          </p>
        </div>
        <div>
          <p className="text-xs text-muted mb-3">// lo_que_cambia</p>
          <h2 className="text-2xl font-semibold mb-3">
            <DecryptReveal>Lo que cambia</DecryptReveal>
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            Una llamada a la API reemplaza las 4 pestañas. El salario ya
            viene como número, no como string. Las duplicadas se mergean.
            Webhooks te avisan cuando aparece algo nuevo en tus keywords.
          </p>
        </div>
      </div>

      <div className="my-12 border border-border bg-card p-6">
        <p className="text-xs text-muted mb-3">// roi_calculado</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Metric label="horas ahorradas/semana" value="8-10" />
          <Metric label="costo/mes API" value="$49" />
          <Metric label="valor de tu hora" value="$25" />
          <Metric label="ROI neto/mes" value="$800+" highlight />
        </div>
        <p className="text-xs text-muted mt-4">
          Asumiendo tarifa de $25/hora para un recruiter LATAM promedio.
        </p>
      </div>

      <div className=" border border-accent/30 bg-gradient-to-br from-card to-card-hover p-8 lg:p-12 text-center">
        <p className="text-xs text-accent uppercase tracking-wider mb-4">
          // call_to_action
        </p>
        <h2 className="text-3xl font-semibold tracking-tight mb-3">
          <DecryptReveal duration={1500}>Sumate a los 30 que validan esto.</DecryptReveal>
        </h2>
        <p className="text-sm text-muted mb-8 max-w-md mx-auto">
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

function Metric({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className={`text-2xl font-semibold ${highlight ? "text-accent" : "text-foreground"}`}>
        {value}
      </div>
      <div className="text-[10px] text-muted mt-1 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}
