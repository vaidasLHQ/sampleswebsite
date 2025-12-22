// Server-side environment variable loader
// Call this at the top of any server-side code that needs env vars

let loaded = false;

export function loadServerEnv() {
  if (loaded) return;
  loaded = true;
  
  // Only load dotenv in Node.js environment (not Cloudflare Workers)
  if (typeof process !== "undefined" && process.env) {
    try {
      // Dynamic import to avoid bundling issues in Cloudflare
      require("dotenv").config();
    } catch {
      // dotenv not available (Cloudflare Workers runtime)
    }
  }
}

export function getServerEnv(name: string): string | undefined {
  loadServerEnv();
  
  // Try process.env first (Node.js), then import.meta.env (Vite/Cloudflare)
  if (typeof process !== "undefined" && process.env?.[name]) {
    return process.env[name];
  }
  return (import.meta as any).env?.[name];
}

export function requireServerEnv(name: string): string {
  const value = getServerEnv(name);
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}




