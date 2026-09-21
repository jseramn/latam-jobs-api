/**
 * Drip campaign for early-access signups.
 *
 * Flow (per contact, based on signup age):
 *   Day 0:  Welcome + how to try it
 *   Day 3:  Use case #1 — recruiter monitoring 1 keyword
 *   Day 7:  Use case #2 — agent building a job-search tool
 *   Day 14: Founding price reminder + ask for feedback
 *
 * Triggers from /api/cron/drip — sends emails to any contact whose
 * signup_age matches one of the thresholds and hasn't received that email yet.
 *
 * State: stored in Resend contact metadata. For Phase 1 (validation), we
 * just send all 4 emails in order with 5min delays via a single cron tick.
 * Production-grade state machine is post-launch work.
 */
import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const fromEmail =
  process.env.RESEND_FROM_EMAIL ?? "LatamJobs <hola@jseramn.tech>";

let _resend: Resend | null = null;
function client(): Resend {
  if (!_resend && apiKey) {
    _resend = new Resend(apiKey);
  }
  if (!_resend) throw new Error("RESEND_API_KEY not configured");
  return _resend;
}

export interface DripStep {
  days: number;
  subject: string;
  body: string;
}

export const DRIP_SEQUENCE: DripStep[] = [
  {
    days: 0,
    subject: "¡Estás dentro! Cómo probar LatamJobs API",
    body: `<div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0b0d12;">
      <h1 style="margin:0 0 8px;font-size:22px;">¡Listo!</h1>
      <p style="font-size:15px;line-height:1.6;color:#444;">
        Te sumaste a la lista de early access de <strong>LatamJobs API</strong>.
        Si llegamos a <strong>30 recruiters</strong> en las próximas 48h, abrimos
        la API con precio founding de <strong>$49/mes</strong>.
      </p>
      <p style="font-size:15px;line-height:1.6;color:#444;">
        Mientras tanto, podés probar el endpoint en vivo:
      </p>
      <pre style="background:#fafafa;padding:12px 16px;border-radius:6px;font-size:13px;overflow-x:auto;">curl "https://latamjobs-api.jseramn.tech/api/v1/search?q=python&country=mx,co,ar"</pre>
      <p style="font-size:15px;line-height:1.6;color:#444;">
        Devuelve JSON con ofertas (sample data mientras los scrapers reales deployan),
        salario parseado a número y deduplicación entre portales.
      </p>
      <p style="font-size:12px;color:#999;margin-top:32px;">
        LatamJobs API · construido en Bogotá 🇨🇴
      </p>
    </div>`,
  },
  {
    days: 3,
    subject: "Use case: monitor keywords sin abrir 4 pestañas",
    body: `<div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0b0d12;">
      <h1 style="margin:0 0 8px;font-size:22px;">¿Cuánto tiempo te toma hoy cubrir una vacante?</h1>
      <p style="font-size:15px;line-height:1.6;color:#444;">
        La mayoría de recruiters LATAM abren Computrabajo, Bumeran, OCC y ZonaJobs
        una por una, filtran, copian a un Excel, y recién después evalúan candidatos.
      </p>
      <p style="font-size:15px;line-height:1.6;color:#444;">
        Con LatamJobs API, todo eso es una llamada HTTP:
      </p>
      <pre style="background:#fafafa;padding:12px 16px;border-radius:6px;font-size:13px;overflow-x:auto;">curl "https://latamjobs-api.jseramn.tech/api/v1/search?q=senior+python&country=mx,co,ar&limit=50"</pre>
      <p style="font-size:15px;line-height:1.6;color:#444;">
        Una respuesta JSON con ofertas de 5 portales, salario como número,
        y dedupe automático entre portales que tengan la misma oferta.
      </p>
      <p style="font-size:15px;line-height:1.6;color:#444;">
        Webhooks también vienen: te aviso cuando aparece una oferta nueva en tus keywords.
      </p>
      <p style="font-size:12px;color:#999;margin-top:32px;">
        LatamJobs API · Bogotá 🇨🇴
      </p>
    </div>`,
  },
  {
    days: 7,
    subject: "Tu agente puede buscar vacantes como tool",
    body: `<div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0b0d12;">
      <h1 style="margin:0 0 8px;font-size:22px;">LatamJobs + Claude / GPT = job search que se programa solo</h1>
      <p style="font-size:15px;line-height:1.6;color:#444;">
        La API está diseñada para ser usada como tool por agentes AI. Schema JSON limpio,
        sin HTML, sin scraping raro.
      </p>
      <pre style="background:#fafafa;padding:12px 16px;border-radius:6px;font-size:13px;overflow-x:auto;">{
  "name": "search_jobs",
  "description": "Search LATAM job boards",
  "input_schema": {
    "q": "string (keyword)",
    "country": "string (mx,co,ar,cl,pe,uy,br comma-sep)"
  }
}</pre>
      <p style="font-size:15px;line-height:1.6;color:#444;">
        Si estás construyendo un HR-tech producto, esto te ahorra meses de scraping.
      </p>
      <p style="font-size:12px;color:#999;margin-top:32px;">
        LatamJobs API · Bogotá 🇨🇴
      </p>
    </div>`,
  },
  {
    days: 14,
    subject: "Última chance: precio founding $49/mes",
    body: `<div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0b0d12;">
      <h1 style="margin:0 0 8px;font-size:22px;">¿Sigues con la idea de usarlo?</h1>
      <p style="font-size:15px;line-height:1.6;color:#444;">
        Hace 2 semanas te sumaste a early access. Si llegaste a probar la API
        (aunque sea con sample data), me ayudaría mucho un feedback honesto:
      </p>
      <ul style="font-size:15px;line-height:1.6;color:#444;padding-left:20px;">
        <li>¿Lo usarías en producción?</li>
        <li>¿Qué portales te faltan?</li>
        <li>¿$49/mes está bien o necesita ser diferente?</li>
      </ul>
      <p style="font-size:15px;line-height:1.6;color:#444;">
        Respondeme a este email — leo cada uno. Si no, te borro de la lista
        en 7 días.
      </p>
      <p style="font-size:15px;line-height:1.6;color:#444;">
        — Manuel
      </p>
      <p style="font-size:12px;color:#999;margin-top:32px;">
        LatamJobs API · Bogotá 🇨🇴
      </p>
    </div>`,
  },
];

export async function sendDripEmail(
  email: string,
  step: DripStep,
): Promise<boolean> {
  try {
    const result = await client().emails.send({
      from: fromEmail,
      to: [email],
      subject: step.subject,
      html: step.body,
    });
    return !result.error;
  } catch {
    return false;
  }
}
