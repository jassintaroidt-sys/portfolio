// src/components/sections/personal-brand/data.ts — BRIEF §11.3

export type DocItem = {
  id: number;
  file: string;
  company: string;
  tag: string;
  ref: string;
  rot: number;
  x: number;
  y: number;
  depth: number;
};

export const documents: DocItem[] = [
  { id: 1,  file: "logo_1.png",  company: "Elsthetic",               tag: "Beauty",          ref: "REF-ARC-001", rot: -3, x: 2,  y: 6,  depth: 0.9 },
  { id: 2,  file: "logo_2.png",  company: "Elspresso",               tag: "F&B",             ref: "REF-ARC-002", rot:  4, x: 17, y: 24, depth: 0.5 },
  { id: 3,  file: "logo_3.png",  company: "Aishi Aesthetic Academy", tag: "Beauty Training", ref: "REF-ARC-003", rot: -5, x: 33, y: 4,  depth: 1.0 },
  { id: 4,  file: "logo_4.png",  company: "Karamina Tour",           tag: "Tour & Travel",   ref: "REF-ARC-004", rot:  2, x: 49, y: 26, depth: 0.6 },
  { id: 5,  file: "logo_5.png",  company: "ELS Corp",                tag: "Brand",           ref: "REF-ARC-005", rot:  3, x: 64, y: 6,  depth: 0.8 },
  { id: 6,  file: "logo_6.png",  company: "Aishi Beauty",            tag: "Beauty",          ref: "REF-ARC-006", rot: -2, x: 79, y: 28, depth: 0.5 },
  { id: 7,  file: "logo_7.png",  company: "Lassiewear",              tag: "Fashion",         ref: "REF-ARC-007", rot:  5, x: 8,  y: 52, depth: 1.0 },
  { id: 8,  file: "logo_8.png",  company: "innalar.com",             tag: "Media",           ref: "REF-ARC-008", rot: -4, x: 26, y: 62, depth: 0.7 },
  { id: 9,  file: "logo_9.png",  company: "Independen Media",        tag: "Media",           ref: "REF-ARC-009", rot:  1, x: 46, y: 56, depth: 0.9 },
  { id: 10, file: "logo_10.png", company: "Ikapunija Media",         tag: "Campus Media",    ref: "REF-ARC-010", rot: -3, x: 66, y: 60, depth: 0.6 },
];
