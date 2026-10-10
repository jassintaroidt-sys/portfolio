// src/data/media-manifest.ts — Generated per BRIEF §19

export interface MediaItem {
  file: string;
  kind: 'image' | 'video';
  folder: 'img' | 'video' | 'flipbook/rush_07' | 'flipbook/pandora';
  w?: number;
  h?: number;
  candidates?: string[];
  enabled?: boolean;
}

export const MEDIA_MANIFEST: MediaItem[] = [
  // Flyers & Greetings
  { file: 'Flyer Hari Besar 1_Lassiewear.png', kind: 'image', folder: 'img', w: 1080, h: 1350 },
  { file: 'Flyer Hari Besar 2_Lassiewear.png', kind: 'image', folder: 'img', w: 1080, h: 1350 },
  { file: 'Flyer Hari Besar 3_Lassiewear.png', kind: 'image', folder: 'img', w: 1080, h: 1350 },
  { file: 'Flyer Hari Besar 4_Lassiewear.png', kind: 'image', folder: 'img', w: 1080, h: 1350 },

  // Beauty flyers
  { file: 'flyer_kecantikan_1.jpg', kind: 'image', folder: 'img', w: 1080, h: 1072 },
  { file: 'flyer_kecantikan_2.jpg', kind: 'image', folder: 'img', w: 1080, h: 1080 },
  { file: 'flyer_kecantikan_3.jpg', kind: 'image', folder: 'img', w: 1080, h: 1080 },
  { file: 'flyer_kecantikan_4.jpg', kind: 'image', folder: 'img', w: 1080, h: 1077 },
  { file: 'flyer_kecantikan_5.jpg', kind: 'image', folder: 'img', w: 1080, h: 1079 },
  { file: 'flyer_kecantikan_6.jpg', kind: 'image', folder: 'img', w: 1080, h: 1080 },

  // Training flyers (disabled by default per brief)
  { file: 'flyer_pelatihan_1.png', kind: 'image', folder: 'img', w: 1080, h: 1350, enabled: false },
  { file: 'flyer_pelatihan_2.png', kind: 'image', folder: 'img', w: 1080, h: 1350, enabled: false },

  // Strategy Footages (1080x1920)
  { file: 'Footage Konten Education 1_Lassiewear.jpg', kind: 'image', folder: 'img', w: 1080, h: 1920 },
  { file: 'Footage Konten Education 2_Lassiewear.jpg', kind: 'image', folder: 'img', w: 1080, h: 1920 },
  { file: 'Footage Konten Education 3_Lassiewear.jpg', kind: 'image', folder: 'img', w: 1080, h: 1920 },
  { file: 'Footage Konten Education 4_Lassiewear.jpg', kind: 'image', folder: 'img', w: 1080, h: 1920 },
  { file: 'Footage Konten Education 5_Lassiewear.jpg', kind: 'image', folder: 'img', w: 1080, h: 1920 },

  { file: 'Footage Konten Entertainment 1_Lassiewear.jpg', kind: 'image', folder: 'img', w: 1080, h: 1920 },
  { file: 'Footage Konten Entertainment 2_Lassiewear.jpg', kind: 'image', folder: 'img', w: 1080, h: 1920 },
  { file: 'Footage Konten Entertainment 3_Lassiewear.jpg', kind: 'image', folder: 'img', w: 1080, h: 1920 },
  { file: 'Footage Konten Entertainment 4_Lassiewear.jpg', kind: 'image', folder: 'img', w: 1080, h: 1920 },
  { file: 'Footage Konten Entertainment 5_Lassiewear.jpg', kind: 'image', folder: 'img', w: 1080, h: 1920 },

  { file: 'Footage Konten Fun 2_Lassiewear 1.jpg', kind: 'image', folder: 'img', w: 1080, h: 1920 },
  { file: 'Footage Konten Fun 2_Lassiewear.jpg', kind: 'image', folder: 'img', w: 1080, h: 1920 },
  { file: 'Footage Konten Fun 3_Lassiewear.jpg', kind: 'image', folder: 'img', w: 1080, h: 1920 },
  { file: 'Footage Konten Fun 4_Lassiewear.jpg', kind: 'image', folder: 'img', w: 1080, h: 1920 },

  { file: 'Footage Konten Hardselling 1_Lassiewear.jpg', kind: 'image', folder: 'img', w: 1080, h: 1920 },
  { file: 'Footage Konten Hardselling 2_Lassiewear.jpg', kind: 'image', folder: 'img', w: 1080, h: 1920 },
  { file: 'Footage Konten Hardselling 3_Lassiewear.jpg', kind: 'image', folder: 'img', w: 1080, h: 1920 },
  { file: 'Footage Konten Hardselling 4_Lassiewear.jpg', kind: 'image', folder: 'img', w: 1080, h: 1920 },
  { file: 'Footage Konten Hardselling 5_Lassiewear.jpg', kind: 'image', folder: 'img', w: 1080, h: 1920 },

  // Strategy Inspirations (with candidates for Lassiwear / Lassiewear)
  {
    file: 'Inspirasi Konten Education_Lassiewear.jpg',
    kind: 'image',
    folder: 'img',
    w: 1080,
    h: 1920,
    candidates: ['Inspirasi Konten Education_Lassiewear.jpg', 'Inspirasi Konten Education_Lassiwear.jpg'],
  },
  {
    file: 'Inspirasi Konten Entertainment_Lassiewear.jpg',
    kind: 'image',
    folder: 'img',
    w: 1080,
    h: 1920,
    candidates: ['Inspirasi Konten Entertainment_Lassiewear.jpg', 'Inspirasi Konten Entertainment_Lassiwear.jpg'],
  },
  {
    file: 'Inspirasi Konten Fun_Lassiewear.jpg',
    kind: 'image',
    folder: 'img',
    w: 1080,
    h: 1920,
    candidates: ['Inspirasi Konten Fun_Lassiewear.jpg', 'Inspirasi Konten Fun_Lassiwear.jpg'],
  },
  {
    file: 'Inspirasi Konten Hardselling_Lassiewear.jpg',
    kind: 'image',
    folder: 'img',
    w: 1080,
    h: 1920,
    candidates: ['Inspirasi Konten Hardselling_Lassiewear.jpg', 'Inspirasi Konten Hardselling_Lassiwear.jpg'],
  },

  // Photos of Jassinta
  { file: 'FOTO JASSINTA ROID TRINITI ESTETIK.png', kind: 'image', folder: 'img', w: 1203, h: 677 },
  { file: 'FOTO JASSINTA TAMPAK DEPAN.png', kind: 'image', folder: 'img', w: 500, h: 500 },
  { file: 'foto_jassinta_duduk.png', kind: 'image', folder: 'img', w: 408, h: 612 },
  { file: 'foto_jassinta_setengah_badan.png', kind: 'image', folder: 'img', w: 1980, h: 1980 },

  // Ikapunija Media articles
  { file: 'Ikapunija_1.png', kind: 'image', folder: 'img', w: 520, h: 520 },
  { file: 'Ikapunija_2.png', kind: 'image', folder: 'img', w: 520, h: 520 },
  { file: 'Ikapunija_3.png', kind: 'image', folder: 'img', w: 520, h: 520 },

  // IMN Articles
  { file: 'IMN_1.png', kind: 'image', folder: 'img', w: 520, h: 520 },
  { file: 'IMN_2.png', kind: 'image', folder: 'img', w: 520, h: 520 },
  { file: 'IMN_3.png', kind: 'image', folder: 'img', w: 520, h: 520 },
  { file: 'IMN_4.png', kind: 'image', folder: 'img', w: 520, h: 520 },

  // innalar Articles
  { file: 'innalar_1.png', kind: 'image', folder: 'img', w: 520, h: 520 },
  { file: 'innalar_2.png', kind: 'image', folder: 'img', w: 520, h: 520 },
  { file: 'innalar_3.png', kind: 'image', folder: 'img', w: 520, h: 520 },
  { file: 'innalar_4.png', kind: 'image', folder: 'img', w: 520, h: 520 },

  // Personal brand logos 1..10
  ...Array.from({ length: 10 }, (_, i) => ({
    file: `logo_${i + 1}.png`,
    kind: 'image' as const,
    folder: 'img' as const,
    w: 1980,
    h: 1980,
  })),

  // Pandora magazine 1..8
  ...Array.from({ length: 8 }, (_, i) => ({
    file: `pandora_${i + 1}.jpg`,
    kind: 'image' as const,
    folder: 'img' as const,
    w: 1100,
    h: 1747,
  })),

  // Certificates & Participations
  { file: 'Partisipasi Sebagai Peserta Magang Indonesia Mengudara.jpg', kind: 'image', folder: 'img', w: 1949, h: 1276 },
  { file: 'Partisipasi Sebagai Peserta Magang Kementerian Agama RI.jpg', kind: 'image', folder: 'img', w: 1500, h: 1097 },
  { file: 'Partisipasi Sebagai Peserta Pelatihan Bidang Menulis Berita Siber.jpg', kind: 'image', folder: 'img', w: 1500, h: 1092 },
  { file: 'Partisipasi Sebagai Peserta Y20 Indonesia.jpg', kind: 'image', folder: 'img', w: 1003, h: 1500 },
  { file: 'Partisipasi Sebagai Staff bendahara Umum Comic Club.jpg', kind: 'image', folder: 'img', w: 1512, h: 1115 },
  { file: 'Penghargaan ISTC Indonesia.jpg', kind: 'image', folder: 'img', w: 1500, h: 1105 },
  { file: 'Penghargaan Produser Kartini Radio Terbaik.jpg', kind: 'image', folder: 'img', w: 717, h: 892 },
  { file: 'Penghargaan Tim Siar Kartini Terbaik.jpg', kind: 'image', folder: 'img', w: 1949, h: 1276 },

  // Rush 07 magazine (1..89)
  { file: 'rush_07_1.jpg', kind: 'image', folder: 'img', w: 1000, h: 704 },
  ...Array.from({ length: 61 }, (_, i) => ({
    file: `rush_07_${i + 2}.jpg`,
    kind: 'image' as const,
    folder: 'img' as const,
    w: 1000,
    h: 1419,
  })),
  { file: 'rush_07_63.jpg', kind: 'image', folder: 'img', w: 1000, h: 1393 },
  { file: 'rush_07_64.jpg', kind: 'image', folder: 'img', w: 1000, h: 1393 },
  { file: 'rush_07_65.jpg', kind: 'image', folder: 'img', w: 1000, h: 1393 },
  ...Array.from({ length: 24 }, (_, i) => ({
    file: `rush_07_${i + 66}.jpg`,
    kind: 'image' as const,
    folder: 'img' as const,
    w: 1000,
    h: 1419,
  })),

  // Vintage Cindy (1..17)
  ...[
    1430, 1440, 1440, 1439, 1438, 1440, 1440, 1440, 1440, 1440,
    1432, 1449, 1440, 1447, 1440, 1440, 1431,
  ].map((height, i) => ({
    file: `Vintage Cindy ${i + 1}.jpg`,
    kind: 'image' as const,
    folder: 'img' as const,
    w: 1080,
    h: height,
  })),

  // Videos
  { file: 'AISHI AESTHETIC_BUMPER.mp4', kind: 'video', folder: 'video', w: 1920, h: 1080, enabled: false },
  { file: 'BOOK.mp4', kind: 'video', folder: 'video', w: 1920, h: 1080 },
  { file: 'ELSTHETIC_BUMPER.mp4', kind: 'video', folder: 'video', w: 1920, h: 1080 },
  { file: 'ELS_BUMPER.mp4', kind: 'video', folder: 'video', w: 1920, h: 1080, enabled: false },
  { file: 'KARAMINA_TOUR_BUMPER.mp4', kind: 'video', folder: 'video', w: 1920, h: 1080 },
  { file: 'SCHOOL_BUMPER.mp4', kind: 'video', folder: 'video', w: 1920, h: 1080 },
  { file: 'Hasil Konten Education Lassiewear.mp4', kind: 'video', folder: 'video', w: 1080, h: 1920 },
  { file: 'Hasil Konten Entertainment Lassiewear.mp4', kind: 'video', folder: 'video', w: 1080, h: 1920 },
  { file: 'Hasil Konten Fun Lassiewear.mp4', kind: 'video', folder: 'video', w: 1080, h: 1920 },
  { file: 'Hasil Konten Hardselling Lassiewear.mp4', kind: 'video', folder: 'video', w: 1080, h: 1920 },
  { file: 'intro.mp4', kind: 'video', folder: 'video', w: 1080, h: 1920 },
  { file: 'kecantikan_1.mp4', kind: 'video', folder: 'video', w: 1080, h: 1920 },
  { file: 'kecantikan_2.mp4', kind: 'video', folder: 'video', w: 1080, h: 1920 },
  { file: 'kecantikan_3.mp4', kind: 'video', folder: 'video', w: 1080, h: 1920 },
  { file: 'kuliner_1.mp4', kind: 'video', folder: 'video', w: 1080, h: 1920 },
  { file: 'kuliner_2.mp4', kind: 'video', folder: 'video', w: 1080, h: 1920 },
  { file: 'kuliner_3.mp4', kind: 'video', folder: 'video', w: 1080, h: 1920 },
  { file: 'travel_1.mp4', kind: 'video', folder: 'video', w: 1080, h: 1920 },
  { file: 'travel_2.mp4', kind: 'video', folder: 'video', w: 1080, h: 1920 },
  { file: 'travel_3.mp4', kind: 'video', folder: 'video', w: 1080, h: 1920 },
];
