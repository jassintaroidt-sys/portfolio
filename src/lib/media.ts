// src/lib/media.ts — BRIEF §8.8
const BASE = (import.meta.env.VITE_MEDIA_BASE_URL ?? "").replace(/\/+$/, ""); // empty = same origin
const enc = (p: string) => p.replace(/^\/+/, "").split("/").map(encodeURIComponent).join("/");

export const mediaUrl = (path: string): string => `${BASE}/assets/${enc(path)}`;
