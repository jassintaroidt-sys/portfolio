// src/components/nav/tocData.ts — BRIEF §7 Sections definitions

export interface TocItem {
  id: string;
  label: string;
}

export const TOC_SECTIONS: TocItem[] = [
  { id: 'opening', label: 'OPENING' },
  { id: 'personal-brand', label: 'PERSONAL BRAND' },
  { id: 'writing-portfolio', label: 'WRITING PORTFOLIO' },
  { id: 'content-marketing', label: 'CONTENT MARKETING SPECIALIST' },
  { id: 'example-strategy', label: 'EXAMPLE STRATEGY' },
  { id: 'project-campus', label: 'PROJECT CAMPUS' },
  { id: 'podcast', label: 'PODCAST' },
  { id: 'archive', label: 'ARCHIVE' },
  { id: 'contact', label: 'CONTACT' },
];
