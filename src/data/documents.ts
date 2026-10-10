// src/data/documents.ts — Data for Overlay Pages (§10)

export interface DocumentItem {
  id: string;
  file: string;
  title: string;
  caption: string;
  year: string;
  category: string;
  w: number;
  h: number;
}

// §10.1 Participation
export const PARTICIPATION_ITEMS: DocumentItem[] = [
  {
    id: 'part-1',
    file: 'Partisipasi Sebagai Peserta Magang Indonesia Mengudara.jpg',
    title: 'Internship at Indonesia Mengudara',
    caption: 'Participant, Internship at Indonesia Mengudara',
    year: '2025',
    category: 'Participation',
    w: 1949,
    h: 1276,
  },
  {
    id: 'part-2',
    file: 'Partisipasi Sebagai Peserta Magang Kementerian Agama RI.jpg',
    title: 'Ministry of Religious Affairs RI',
    caption: 'Participant, Internship at the Ministry of Religious Affairs of the Republic of Indonesia',
    year: '2023–2024',
    category: 'Participation',
    w: 1500,
    h: 1097,
  },
  {
    id: 'part-3',
    file: 'Partisipasi Sebagai Peserta Pelatihan Bidang Menulis Berita Siber.jpg',
    title: 'Cyber News Writing Training',
    caption: 'Participant, Cyber News Writing Training',
    year: '2024',
    category: 'Participation',
    w: 1500,
    h: 1092,
  },
  {
    id: 'part-4',
    file: 'Partisipasi Sebagai Peserta Y20 Indonesia.jpg',
    title: 'Y20 Indonesia Summit',
    caption: 'Participant, Y20 Indonesia',
    year: '2022',
    category: 'Participation',
    w: 1003,
    h: 1500,
  },
  {
    id: 'part-5',
    file: 'Partisipasi Sebagai Staff bendahara Umum Comic Club.jpg',
    title: 'Comic Club General Treasurer Staff',
    caption: 'General Treasurer Staff, Comic Club',
    year: '2021–2022',
    category: 'Participation',
    w: 1512,
    h: 1115,
  },
];

// §10.2 Achievement
export const ACHIEVEMENT_ITEMS: DocumentItem[] = [
  {
    id: 'ach-1',
    file: 'Penghargaan ISTC Indonesia.jpg',
    title: 'ISTC Indonesia Award',
    caption: 'ISTC Indonesia Award',
    year: '2018',
    category: 'Achievement',
    w: 1500,
    h: 1105,
  },
  {
    id: 'ach-2',
    file: 'Penghargaan Produser Kartini Radio Terbaik.jpg',
    title: 'Best Producer, Kartini Radio',
    caption: 'Best Producer, Kartini Radio',
    year: '2025',
    category: 'Achievement',
    w: 717,
    h: 892,
  },
  {
    id: 'ach-3',
    file: 'Penghargaan Tim Siar Kartini Terbaik.jpg',
    title: 'Best Broadcast Team, Kartini',
    caption: 'Best Broadcast Team, Kartini',
    year: '2025',
    category: 'Achievement',
    w: 1949,
    h: 1276,
  },
];

// §10.4 Photography (Vintage Cindy 1–17)
export interface PhotoItem {
  id: string;
  file: string;
  w: number;
  h: number;
  title: string;
}

export const VINTAGE_CINDY_PHOTOS: PhotoItem[] = [
  { id: 'vc-1', file: 'Vintage Cindy 1.jpg', w: 1080, h: 1430, title: 'Vintage Cindy #1' },
  { id: 'vc-2', file: 'Vintage Cindy 2.jpg', w: 1080, h: 1440, title: 'Vintage Cindy #2' },
  { id: 'vc-3', file: 'Vintage Cindy 3.jpg', w: 1080, h: 1440, title: 'Vintage Cindy #3' },
  { id: 'vc-4', file: 'Vintage Cindy 4.jpg', w: 1080, h: 1439, title: 'Vintage Cindy #4' },
  { id: 'vc-5', file: 'Vintage Cindy 5.jpg', w: 1080, h: 1438, title: 'Vintage Cindy #5' },
  { id: 'vc-6', file: 'Vintage Cindy 6.jpg', w: 1080, h: 1440, title: 'Vintage Cindy #6' },
  { id: 'vc-7', file: 'Vintage Cindy 7.jpg', w: 1080, h: 1440, title: 'Vintage Cindy #7' },
  { id: 'vc-8', file: 'Vintage Cindy 8.jpg', w: 1080, h: 1440, title: 'Vintage Cindy #8' },
  { id: 'vc-9', file: 'Vintage Cindy 9.jpg', w: 1080, h: 1440, title: 'Vintage Cindy #9' },
  { id: 'vc-10', file: 'Vintage Cindy 10.jpg', w: 1080, h: 1440, title: 'Vintage Cindy #10' },
  { id: 'vc-11', file: 'Vintage Cindy 11.jpg', w: 1080, h: 1432, title: 'Vintage Cindy #11' },
  { id: 'vc-12', file: 'Vintage Cindy 12.jpg', w: 1080, h: 1449, title: 'Vintage Cindy #12' },
  { id: 'vc-13', file: 'Vintage Cindy 13.jpg', w: 1080, h: 1440, title: 'Vintage Cindy #13' },
  { id: 'vc-14', file: 'Vintage Cindy 14.jpg', w: 1080, h: 1447, title: 'Vintage Cindy #14' },
  { id: 'vc-15', file: 'Vintage Cindy 15.jpg', w: 1080, h: 1440, title: 'Vintage Cindy #15' },
  { id: 'vc-16', file: 'Vintage Cindy 16.jpg', w: 1080, h: 1440, title: 'Vintage Cindy #16' },
  { id: 'vc-17', file: 'Vintage Cindy 17.jpg', w: 1080, h: 1431, title: 'Vintage Cindy #17' },
];

// §10.6 Strategy Steps
export interface StrategyStep {
  step: number;
  title: string;
  description: string;
  iconName: string;
  tip?: string;
}

export const STRATEGY_STEPS: StrategyStep[] = [
  {
    step: 1,
    title: 'Define the Target Market',
    description: "Know exactly who we're talking to.",
    iconName: 'target',
    tip: 'Build granular demographic and psychographic audience personas first.',
  },
  {
    step: 2,
    title: 'Define the Style Guide',
    description: 'Serif & sans-serif fonts, tone of voice, and HEX colors for design and typography.',
    iconName: 'palette',
    tip: 'Maintain strict consistency across palettes, typography, and mood boards.',
  },
  {
    step: 3,
    title: 'Define the Content Plan',
    description: 'Content pillars, references, scripts, and posting schedule.',
    iconName: 'calendar',
    tip: 'Organize into education, entertainment, connection, and promotional pillars.',
  },
  {
    step: 4,
    title: 'Shoot & Record by Script',
    description: 'Video recording and photo shoots follow the script.',
    iconName: 'camera',
    tip: 'Direct shots with dynamic angles, clean natural lighting, and crisp audio.',
  },
  {
    step: 5,
    title: 'Edit by Style Guide',
    description: "Every edit stays true to the brand's visual rules.",
    iconName: 'scissors',
    tip: 'Pace cuts rhythmically to the audio, using seamless micro-animations.',
  },
  {
    step: 6,
    title: 'Post on Schedule',
    description: 'Publish at the planned posting times.',
    iconName: 'clock',
    tip: 'Time distribution during peak follower active windows for early traction.',
  },
  {
    step: 7,
    title: 'Analyze Engagement, Awareness & Conversion',
    description: 'Measure what worked, then feed insights back into the next plan.',
    iconName: 'chart',
    tip: 'Track retention rates and CTR, then loop findings directly back into Content Planning.',
  },
];
