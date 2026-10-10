// src/data/campus.ts — BRIEF §15.3

export interface CampusItem {
  id: string;
  spine: string;
  title: string;
  pages: number;
  doc: string;
  description: string[];
  responsibilities: string[];
}

export const campus: readonly CampusItem[] = [
  {
    id: 'rush-07',
    spine: 'RUSH 07',
    title: 'RUSH 07',
    pages: 89,
    doc: 'LAYOUT COMIC RUSH.pdf', // tidak dipakai di web; flipbook memakai gambar rush_07_1…89.jpg
    description: [
      'Comic Rush is a comic magazine published by KSM Comic Club as part of the Karya Karsa program, a platform for young creators on campus to transform their imagination into tangible works.',
      'Behind every carefully arranged page and every comic panel brought to life, there was a long creative process that I experienced as the Magazine Layout Designer for this publication.',
    ],
    responsibilities: [
      'Managing the magazine layout and overall visual composition.',
      'Designing magazine pages and visual assets.',
      'Revising designs whenever necessary.',
      'Collecting all comic submissions and compiling them into a complete magazine publication.',
      'Reporting project outcomes to the Head of the KSM Comic Club.',
    ],
  },
  {
    id: 'pandora',
    spine: 'PANDORA',
    title: 'Pandora',
    pages: 8,
    doc: 'PROJECT SURAT KABAR.pdf', // tidak dipakai di web; flipbook memakai pandora_1…8.jpg
    description: [
      'Pandora was a newspaper developed as a team project for an academic course. However, for me, it represented much more than simply fulfilling an assignment requirement. Pandora was my first real experience leading an editorial team.',
    ],
    responsibilities: [
      'Leading the editorial workflow of the Pandora newspaper.',
      'Writing news articles.',
      'Creating a news coverage wishlist and editorial agenda.',
      'Reviewing and revising newspaper content.',
      'Designing and managing the newspaper layout.',
    ],
  },
] as const;
