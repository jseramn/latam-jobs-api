interface LatamMapLogoProps {
  size?: number;
  animated?: boolean;
  showText?: boolean;
}

export function LatamMapLogo({
  size = 360,
  animated = true,
  showText = true,
}: LatamMapLogoProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div
        className="border border-border bg-surface overflow-hidden"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 360 360"
          className="block w-full h-full"
          role="img"
          aria-label="LatamJobs API — mapa de hubs en LATAM"
        >
          <title>LatamJobs API — mapa de hubs</title>
          {/* Dot field: silueta de LATAM */}
          <g className="fill-[var(--dot)]">
            <circle cx="55.8" cy="52" r="2.2" />
            <circle cx="63.9" cy="52" r="2.2" />
            <circle cx="76.2" cy="60.1" r="2.2" />
            <circle cx="84.3" cy="60.1" r="2.2" />
            <circle cx="92.5" cy="60.1" r="2.2" />
            <circle cx="100.6" cy="60.1" r="2.2" />
            <circle cx="80.2" cy="68.2" r="2.2" />
            <circle cx="88.4" cy="68.2" r="2.2" />
            <circle cx="96.5" cy="68.2" r="2.2" />
            <circle cx="104.7" cy="68.2" r="2.2" />
            <circle cx="76.2" cy="76.4" r="2.2" />
            <circle cx="92.5" cy="76.4" r="2.2" />
            <circle cx="100.6" cy="76.4" r="2.2" />
            <circle cx="108.7" cy="76.4" r="2.2" />
            <circle cx="96.5" cy="84.5" r="2.2" />
            <circle cx="104.7" cy="84.5" r="2.2" />
            <circle cx="112.8" cy="84.5" r="2.2" />
            <circle cx="145.4" cy="84.5" r="2.2" />
            <circle cx="100.6" cy="92.6" r="2.2" />
            <circle cx="108.7" cy="92.6" r="2.2" />
            <circle cx="116.9" cy="92.6" r="2.2" />
            <circle cx="133.2" cy="92.6" r="2.2" />
            <circle cx="141.3" cy="92.6" r="2.2" />
            <circle cx="121" cy="100.7" r="2.2" />
            <circle cx="129.1" cy="100.7" r="2.2" />
            <circle cx="137.2" cy="100.7" r="2.2" />
            <circle cx="149.5" cy="108.8" r="2.2" />
            <circle cx="157.6" cy="108.8" r="2.2" />
            <circle cx="153.5" cy="117" r="2.2" />
            <circle cx="186.1" cy="117" r="2.2" />
            <circle cx="194.3" cy="117" r="2.2" />
            <circle cx="202.4" cy="117" r="2.2" />
            <circle cx="165.7" cy="125.1" r="2.2" />
            <circle cx="182" cy="125.1" r="2.2" />
            <circle cx="190.2" cy="125.1" r="2.2" />
            <circle cx="198.3" cy="125.1" r="2.2" />
            <circle cx="206.5" cy="125.1" r="2.2" />
            <circle cx="214.6" cy="125.1" r="2.2" />
            <circle cx="222.8" cy="125.1" r="2.2" />
            <circle cx="230.9" cy="125.1" r="2.2" />
            <circle cx="178" cy="133.2" r="2.2" />
            <circle cx="186.1" cy="133.2" r="2.2" />
            <circle cx="194.3" cy="133.2" r="2.2" />
            <circle cx="202.4" cy="133.2" r="2.2" />
            <circle cx="210.5" cy="133.2" r="2.2" />
            <circle cx="218.7" cy="133.2" r="2.2" />
            <circle cx="226.8" cy="133.2" r="2.2" />
            <circle cx="235" cy="133.2" r="2.2" />
            <circle cx="243.1" cy="133.2" r="2.2" />
            <circle cx="251.3" cy="133.2" r="2.2" />
            <circle cx="182" cy="141.3" r="2.2" />
            <circle cx="190.2" cy="141.3" r="2.2" />
            <circle cx="198.3" cy="141.3" r="2.2" />
            <circle cx="206.5" cy="141.3" r="2.2" />
            <circle cx="214.6" cy="141.3" r="2.2" />
            <circle cx="222.8" cy="141.3" r="2.2" />
            <circle cx="230.9" cy="141.3" r="2.2" />
            <circle cx="239" cy="141.3" r="2.2" />
            <circle cx="247.2" cy="141.3" r="2.2" />
            <circle cx="255.3" cy="141.3" r="2.2" />
            <circle cx="169.8" cy="149.5" r="2.2" />
            <circle cx="178" cy="149.5" r="2.2" />
            <circle cx="186.1" cy="149.5" r="2.2" />
            <circle cx="194.3" cy="149.5" r="2.2" />
            <circle cx="202.4" cy="149.5" r="2.2" />
            <circle cx="210.5" cy="149.5" r="2.2" />
            <circle cx="218.7" cy="149.5" r="2.2" />
            <circle cx="226.8" cy="149.5" r="2.2" />
            <circle cx="235" cy="149.5" r="2.2" />
            <circle cx="243.1" cy="149.5" r="2.2" />
            <circle cx="251.3" cy="149.5" r="2.2" />
            <circle cx="259.4" cy="149.5" r="2.2" />
            <circle cx="173.9" cy="157.6" r="2.2" />
            <circle cx="182" cy="157.6" r="2.2" />
            <circle cx="190.2" cy="157.6" r="2.2" />
            <circle cx="198.3" cy="157.6" r="2.2" />
            <circle cx="206.5" cy="157.6" r="2.2" />
            <circle cx="214.6" cy="157.6" r="2.2" />
            <circle cx="222.8" cy="157.6" r="2.2" />
            <circle cx="230.9" cy="157.6" r="2.2" />
            <circle cx="239" cy="157.6" r="2.2" />
            <circle cx="247.2" cy="157.6" r="2.2" />
            <circle cx="255.3" cy="157.6" r="2.2" />
            <circle cx="263.5" cy="157.6" r="2.2" />
            <circle cx="271.6" cy="157.6" r="2.2" />
            <circle cx="279.8" cy="157.6" r="2.2" />
            <circle cx="169.8" cy="165.7" r="2.2" />
            <circle cx="178" cy="165.7" r="2.2" />
            <circle cx="186.1" cy="165.7" r="2.2" />
            <circle cx="194.3" cy="165.7" r="2.2" />
            <circle cx="202.4" cy="165.7" r="2.2" />
            <circle cx="210.5" cy="165.7" r="2.2" />
            <circle cx="218.7" cy="165.7" r="2.2" />
            <circle cx="226.8" cy="165.7" r="2.2" />
            <circle cx="235" cy="165.7" r="2.2" />
            <circle cx="243.1" cy="165.7" r="2.2" />
            <circle cx="251.3" cy="165.7" r="2.2" />
            <circle cx="259.4" cy="165.7" r="2.2" />
            <circle cx="267.5" cy="165.7" r="2.2" />
            <circle cx="275.7" cy="165.7" r="2.2" />
            <circle cx="283.8" cy="165.7" r="2.2" />
            <circle cx="292" cy="165.7" r="2.2" />
            <circle cx="300.1" cy="165.7" r="2.2" />
            <circle cx="173.9" cy="173.8" r="2.2" />
            <circle cx="182" cy="173.8" r="2.2" />
            <circle cx="190.2" cy="173.8" r="2.2" />
            <circle cx="198.3" cy="173.8" r="2.2" />
            <circle cx="206.5" cy="173.8" r="2.2" />
            <circle cx="214.6" cy="173.8" r="2.2" />
            <circle cx="222.8" cy="173.8" r="2.2" />
            <circle cx="230.9" cy="173.8" r="2.2" />
            <circle cx="239" cy="173.8" r="2.2" />
            <circle cx="247.2" cy="173.8" r="2.2" />
            <circle cx="255.3" cy="173.8" r="2.2" />
            <circle cx="263.5" cy="173.8" r="2.2" />
            <circle cx="271.6" cy="173.8" r="2.2" />
            <circle cx="279.8" cy="173.8" r="2.2" />
            <circle cx="287.9" cy="173.8" r="2.2" />
            <circle cx="296.1" cy="173.8" r="2.2" />
            <circle cx="304.2" cy="173.8" r="2.2" />
            <circle cx="178" cy="181.9" r="2.2" />
            <circle cx="186.1" cy="181.9" r="2.2" />
            <circle cx="194.3" cy="181.9" r="2.2" />
            <circle cx="202.4" cy="181.9" r="2.2" />
            <circle cx="210.5" cy="181.9" r="2.2" />
            <circle cx="218.7" cy="181.9" r="2.2" />
            <circle cx="226.8" cy="181.9" r="2.2" />
            <circle cx="235" cy="181.9" r="2.2" />
            <circle cx="243.1" cy="181.9" r="2.2" />
            <circle cx="251.3" cy="181.9" r="2.2" />
            <circle cx="259.4" cy="181.9" r="2.2" />
            <circle cx="267.5" cy="181.9" r="2.2" />
            <circle cx="275.7" cy="181.9" r="2.2" />
            <circle cx="283.8" cy="181.9" r="2.2" />
            <circle cx="292" cy="181.9" r="2.2" />
            <circle cx="300.1" cy="181.9" r="2.2" />
            <circle cx="182" cy="190.1" r="2.2" />
            <circle cx="190.2" cy="190.1" r="2.2" />
            <circle cx="198.3" cy="190.1" r="2.2" />
            <circle cx="206.5" cy="190.1" r="2.2" />
            <circle cx="214.6" cy="190.1" r="2.2" />
            <circle cx="222.8" cy="190.1" r="2.2" />
            <circle cx="230.9" cy="190.1" r="2.2" />
            <circle cx="239" cy="190.1" r="2.2" />
            <circle cx="247.2" cy="190.1" r="2.2" />
            <circle cx="255.3" cy="190.1" r="2.2" />
            <circle cx="263.5" cy="190.1" r="2.2" />
            <circle cx="271.6" cy="190.1" r="2.2" />
            <circle cx="279.8" cy="190.1" r="2.2" />
            <circle cx="287.9" cy="190.1" r="2.2" />
            <circle cx="296.1" cy="190.1" r="2.2" />
            <circle cx="186.1" cy="198.2" r="2.2" />
            <circle cx="194.3" cy="198.2" r="2.2" />
            <circle cx="202.4" cy="198.2" r="2.2" />
            <circle cx="210.5" cy="198.2" r="2.2" />
            <circle cx="218.7" cy="198.2" r="2.2" />
            <circle cx="226.8" cy="198.2" r="2.2" />
            <circle cx="235" cy="198.2" r="2.2" />
            <circle cx="243.1" cy="198.2" r="2.2" />
            <circle cx="251.3" cy="198.2" r="2.2" />
            <circle cx="259.4" cy="198.2" r="2.2" />
            <circle cx="267.5" cy="198.2" r="2.2" />
            <circle cx="275.7" cy="198.2" r="2.2" />
            <circle cx="283.8" cy="198.2" r="2.2" />
            <circle cx="292" cy="198.2" r="2.2" />
            <circle cx="198.3" cy="206.3" r="2.2" />
            <circle cx="206.5" cy="206.3" r="2.2" />
            <circle cx="214.6" cy="206.3" r="2.2" />
            <circle cx="222.8" cy="206.3" r="2.2" />
            <circle cx="230.9" cy="206.3" r="2.2" />
            <circle cx="239" cy="206.3" r="2.2" />
            <circle cx="247.2" cy="206.3" r="2.2" />
            <circle cx="255.3" cy="206.3" r="2.2" />
            <circle cx="263.5" cy="206.3" r="2.2" />
            <circle cx="271.6" cy="206.3" r="2.2" />
            <circle cx="279.8" cy="206.3" r="2.2" />
            <circle cx="287.9" cy="206.3" r="2.2" />
            <circle cx="202.4" cy="214.4" r="2.2" />
            <circle cx="210.5" cy="214.4" r="2.2" />
            <circle cx="218.7" cy="214.4" r="2.2" />
            <circle cx="226.8" cy="214.4" r="2.2" />
            <circle cx="235" cy="214.4" r="2.2" />
            <circle cx="243.1" cy="214.4" r="2.2" />
            <circle cx="251.3" cy="214.4" r="2.2" />
            <circle cx="259.4" cy="214.4" r="2.2" />
            <circle cx="267.5" cy="214.4" r="2.2" />
            <circle cx="275.7" cy="214.4" r="2.2" />
            <circle cx="283.8" cy="214.4" r="2.2" />
            <circle cx="206.5" cy="222.5" r="2.2" />
            <circle cx="214.6" cy="222.5" r="2.2" />
            <circle cx="222.8" cy="222.5" r="2.2" />
            <circle cx="230.9" cy="222.5" r="2.2" />
            <circle cx="239" cy="222.5" r="2.2" />
            <circle cx="247.2" cy="222.5" r="2.2" />
            <circle cx="255.3" cy="222.5" r="2.2" />
            <circle cx="263.5" cy="222.5" r="2.2" />
            <circle cx="271.6" cy="222.5" r="2.2" />
            <circle cx="279.8" cy="222.5" r="2.2" />
            <circle cx="202.4" cy="230.7" r="2.2" />
            <circle cx="210.5" cy="230.7" r="2.2" />
            <circle cx="218.7" cy="230.7" r="2.2" />
            <circle cx="226.8" cy="230.7" r="2.2" />
            <circle cx="235" cy="230.7" r="2.2" />
            <circle cx="243.1" cy="230.7" r="2.2" />
            <circle cx="251.3" cy="230.7" r="2.2" />
            <circle cx="259.4" cy="230.7" r="2.2" />
            <circle cx="198.3" cy="238.8" r="2.2" />
            <circle cx="206.5" cy="238.8" r="2.2" />
            <circle cx="214.6" cy="238.8" r="2.2" />
            <circle cx="222.8" cy="238.8" r="2.2" />
            <circle cx="230.9" cy="238.8" r="2.2" />
            <circle cx="239" cy="238.8" r="2.2" />
            <circle cx="247.2" cy="238.8" r="2.2" />
            <circle cx="255.3" cy="238.8" r="2.2" />
            <circle cx="263.5" cy="238.8" r="2.2" />
            <circle cx="202.4" cy="246.9" r="2.2" />
            <circle cx="210.5" cy="246.9" r="2.2" />
            <circle cx="218.7" cy="246.9" r="2.2" />
            <circle cx="226.8" cy="246.9" r="2.2" />
            <circle cx="235" cy="246.9" r="2.2" />
            <circle cx="243.1" cy="246.9" r="2.2" />
            <circle cx="251.3" cy="246.9" r="2.2" />
            <circle cx="259.4" cy="246.9" r="2.2" />
            <circle cx="198.3" cy="255" r="2.2" />
            <circle cx="206.5" cy="255" r="2.2" />
            <circle cx="214.6" cy="255" r="2.2" />
            <circle cx="222.8" cy="255" r="2.2" />
            <circle cx="230.9" cy="255" r="2.2" />
            <circle cx="239" cy="255" r="2.2" />
            <circle cx="247.2" cy="255" r="2.2" />
            <circle cx="194.3" cy="263.2" r="2.2" />
            <circle cx="202.4" cy="263.2" r="2.2" />
            <circle cx="210.5" cy="263.2" r="2.2" />
            <circle cx="218.7" cy="263.2" r="2.2" />
            <circle cx="226.8" cy="263.2" r="2.2" />
            <circle cx="235" cy="263.2" r="2.2" />
            <circle cx="198.3" cy="271.3" r="2.2" />
            <circle cx="206.5" cy="271.3" r="2.2" />
            <circle cx="214.6" cy="271.3" r="2.2" />
            <circle cx="222.8" cy="271.3" r="2.2" />
            <circle cx="194.3" cy="279.4" r="2.2" />
            <circle cx="202.4" cy="279.4" r="2.2" />
            <circle cx="210.5" cy="279.4" r="2.2" />
            <circle cx="198.3" cy="287.5" r="2.2" />
            <circle cx="206.5" cy="287.5" r="2.2" />
            <circle cx="214.6" cy="287.5" r="2.2" />
            <circle cx="194.3" cy="295.6" r="2.2" />
            <circle cx="202.4" cy="295.6" r="2.2" />
            <circle cx="190.2" cy="303.8" r="2.2" />
            <circle cx="198.3" cy="303.8" r="2.2" />
            <circle cx="206.5" cy="303.8" r="2.2" />
            <circle cx="186.1" cy="311.9" r="2.2" />
            <circle cx="194.3" cy="311.9" r="2.2" />
            <circle cx="202.4" cy="311.9" r="2.2" />
            <circle cx="198.3" cy="320" r="2.2" />
            <circle cx="206.5" cy="320" r="2.2" />
            <circle cx="214.6" cy="320" r="2.2" />
          </g>
          {/* Tracks connecting hubs */}
          <g
            className="fill-none stroke-[var(--track)]"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M 110.3 90 L 188 135.7" />
            <path d="M 188 135.7 L 178.8 187.7" />
            <path d="M 188 135.7 L 273.2 223.4" />
            <path d="M 178.8 187.7 L 273.2 223.4" />
            <path d="M 178.8 187.7 L 198.6 254.1" />
            <path d="M 198.6 254.1 L 236.7 257.7" />
            <path d="M 273.2 223.4 L 236.7 257.7" />
          </g>
          {/* Hubs: cities */}
          <g>
            <circle className="fill-[var(--fg)]" cx="110.3" cy="90" r="4.4" />
            <circle className="fill-[var(--fg)]" cx="188" cy="135.7" r="4.4" />
            <circle className="fill-[var(--fg)]" cx="178.8" cy="187.7" r="4.4" />
            <circle className="fill-[var(--accent)]" cx="273.2" cy="223.4" r="5.1" />
            <circle className="fill-[var(--fg)]" cx="198.6" cy="254.1" r="4.4" />
            <circle className="fill-[var(--fg)]" cx="236.7" cy="257.7" r="4.4" />
          </g>
          {/* Animated packet (only when animated=true) */}
          {animated && (
            <circle
              r="3.6"
              cx="0"
              cy="0"
              className="fill-[var(--accent)]"
              style={{
                offsetPath:
                  "path('M 110.3 90 L 188 135.7 L 178.8 187.7 L 188 135.7 L 273.2 223.4 L 178.8 187.7 L 273.2 223.4 L 178.8 187.7 L 198.6 254.1 L 236.7 257.7 L 273.2 223.4 L 236.7 257.7')",
                offsetRotate: "0deg",
                animation: "packet-travel 12s linear infinite",
              }}
            />
          )}
        </svg>
      </div>

      {showText && (
        <div className="text-center max-w-sm">
          <p className="text-xs uppercase tracking-[0.14em] text-muted mb-2.5">
            // latam-jobs.api
          </p>
          <h1 className="text-3xl font-semibold tracking-tight leading-tight mb-2 font-mono">
            latam-jobs<span className="text-accent">.api</span>
          </h1>
          <p className="text-sm text-muted leading-snug">
            Una API. Todas las bolsas de trabajo de LATAM.
          </p>
          <ul className="text-xs text-muted flex flex-wrap justify-center gap-x-3.5 gap-y-1 mt-3">
            <li>MX</li>
            <li>CO</li>
            <li>PE</li>
            <li>BR</li>
            <li>CL</li>
            <li>AR</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export function LatamMapFavicon() {
  return (
    <svg
      viewBox="0 0 360 360"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="360" height="360" fill="#0b0d12" />
      <g fill="#5eead4" opacity="0.7">
        <circle cx="200" cy="180" r="6" />
        <circle cx="270" cy="220" r="6" />
        <circle cx="180" cy="180" r="5" />
        <circle cx="240" cy="250" r="5" />
        <circle cx="190" cy="150" r="5" />
      </g>
    </svg>
  );
}
