"use client";

import { useState, type FormEvent } from "react";

interface SignupFormProps {
  variant?: "default" | "compact";
  ctaLabel?: string;
}

interface ApiResponse {
  ok?: boolean;
  total?: number;
  error?: string;
}

export function SignupForm({ variant = "default", ctaLabel = "Sumate a la lista" }: SignupFormProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !role || !country) return;

    setStatus("loading");
    setMessage("");

    try {
      const r = await fetch("/api/signup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, role, country }),
      });
      const data = (await r.json()) as ApiResponse;
      if (!r.ok) {
        setStatus("error");
        if (data.error === "invalid_email") setMessage("Ese email no parece válido.");
        else if (data.error === "missing_resend_key") setMessage("Sistema temporalmente sin configurar. Probá en unos minutos.");
        else setMessage("Algo falló. Probá de nuevo.");
        return;
      }
      setStatus("success");
      setMessage("¡Listo! Te sumaste. Si llegamos a 30, te aviso el día del lanzamiento.");
      setEmail("");
      setRole("");
      setCountry("");
    } catch (err) {
      setStatus("error");
      setMessage("Sin conexión. Probá de nuevo.");
    }
  };

  const isCompact = variant === "compact";

  return (
    <form onSubmit={onSubmit} className={isCompact ? "space-y-3" : "space-y-4"}>
      <div className={isCompact ? "space-y-3" : "space-y-4"}>
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="vos@empresa.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors disabled:opacity-50"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="role" className="sr-only">
              Rol
            </label>
            <select
              id="role"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={status === "loading"}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:border-accent transition-colors disabled:opacity-50"
            >
              <option value="">Soy...</option>
              <option value="recruiter">Recruiter</option>
              <option value="agency">Dueño agencia</option>
              <option value="hrtech">HR tech builder</option>
              <option value="developer">Developer</option>
              <option value="other">Otro</option>
            </select>
          </div>
          <div>
            <label htmlFor="country" className="sr-only">
              País
            </label>
            <select
              id="country"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              disabled={status === "loading"}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:border-accent transition-colors disabled:opacity-50"
            >
              <option value="">País...</option>
              <option value="MX">México</option>
              <option value="CO">Colombia</option>
              <option value="AR">Argentina</option>
              <option value="CL">Chile</option>
              <option value="PE">Perú</option>
              <option value="UY">Uruguay</option>
              <option value="OTHER">Otro LATAM</option>
            </select>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full px-6 py-3 rounded-lg bg-accent text-background font-semibold hover:bg-accent-deep transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Enviando..." : ctaLabel}
      </button>

      {message && (
        <p
          role="status"
          className={`text-sm ${status === "success" ? "text-accent" : "text-danger"}`}
        >
          {message}
        </p>
      )}

      <p className="text-xs text-muted">
        Sin spam. Te aviso solo cuando abramos el early access o cuando alcancemos los 30 signups.
      </p>
    </form>
  );
}
