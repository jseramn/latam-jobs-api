/**
 * Upstash Redis cache wrapper using REST API.
 * Works in Vercel serverless (no TCP needed).
 *
 * Required env vars:
 *   UPSTASH_REDIS_REST_URL
 *   UPSTASH_REDIS_REST_TOKEN
 *
 * Free tier: 10k requests/day, 256MB. Get credentials at
 * https://console.upstash.com/ → Create Database → REST API.
 */

export interface CacheClient {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, opts?: { ex?: number }): Promise<void>;
  del(key: string): Promise<void>;
  isConfigured(): boolean;
}

class NullCache implements CacheClient {
  async get(): Promise<string | null> {
    return null;
  }
  async set(): Promise<void> {}
  async del(): Promise<void> {}
  isConfigured(): boolean {
    return false;
  }
}

class UpstashCache implements CacheClient {
  constructor(
    private readonly url: string,
    private readonly token: string,
  ) {}

  private async exec(command: string[]): Promise<unknown> {
    const res = await fetch(`${this.url}/${command.map(encodeURIComponent).join("/")}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(command),
    });
    if (!res.ok) {
      throw new Error(`Upstash error ${res.status}: ${await res.text()}`);
    }
    const json = (await res.json()) as { result?: unknown };
    return json.result;
  }

  async get(key: string): Promise<string | null> {
    const result = await this.exec(["GET", key]);
    return typeof result === "string" ? result : null;
  }

  async set(key: string, value: string, opts?: { ex?: number }): Promise<void> {
    const cmd = ["SET", key, value];
    if (opts?.ex) {
      cmd.push("EX", String(opts.ex));
    }
    await this.exec(cmd);
  }

  async del(key: string): Promise<void> {
    await this.exec(["DEL", key]);
  }

  isConfigured(): boolean {
    return true;
  }
}

let _client: CacheClient | null = null;

export function cache(): CacheClient {
  if (_client) return _client;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    _client = new UpstashCache(url, token);
  } else {
    _client = new NullCache();
  }
  return _client;
}

/** TTL constants for job data cache. */
export const CACHE_TTL = {
  search: 60 * 30, // 30 minutes
  scrape_run: 60 * 60, // 1 hour (record of last cron run)
} as const;
