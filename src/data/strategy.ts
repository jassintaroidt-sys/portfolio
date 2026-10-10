// src/data/strategy.ts — BRIEF §14.4

export interface StrategyResults {
  views: string;
  likes: string;
  shares: string;
}

export interface StrategyItem {
  label: string;
  about: string;
  example: string;
  reference: string;
  credit: [string, string][];
  results: StrategyResults;
  seeMore: string;
  footage: string[];
}

export type StrategySlug = 'hard-selling' | 'entertainment' | 'education' | 'fun';

export const strategies: Record<StrategySlug, StrategyItem> = {
  'hard-selling': {
    label: 'Hard Selling',
    about:
      'Content designed to introduce products more exclusively, typically through premium content, corporate storytelling, and product advertisements.',
    example:
      'One of the best hard-selling contents I created was a video titled "Good Afternoon, Madam," which showcased the boutique atmosphere through storytelling and a vintage aesthetic.',
    reference: 'Inspirasi Konten Hardselling_Lassiewear.jpg',
    credit: [
      ['Reference', '@willamazing (Instagram)'],
      ['Script', 'Jassinta Roid Triniti'],
      ['Talent', 'Siti Nur Azizah (@owshuary)'],
      ['Videographer', 'Jassinta Roid Triniti'],
      ['Editing', 'Jassinta Roid Triniti'],
    ],
    results: { views: '4000+', likes: '22', shares: '3' },
    seeMore: 'https://www.instagram.com/reel/DW3TxpyDaFQ/?igsh=MThucG96MmNyZmU2YQ==',
    footage: [
      'Footage Konten Hardselling 1_Lassiewear.jpg',
      'Footage Konten Hardselling 2_Lassiewear.jpg',
      'Footage Konten Hardselling 3_Lassiewear.jpg',
      'Footage Konten Hardselling 4_Lassiewear.jpg',
      'Footage Konten Hardselling 5_Lassiewear.jpg',
    ],
  },
  'entertainment': {
    label: 'Entertainment',
    about:
      'Content designed to introduce products by leveraging current social media trends and viral topics.',
    example:
      'One of the best entertainment contents I created was "Office Look vs Campus Look," featuring office and campus outfit inspirations inspired by a trending format using the song "Suzanne."',
    reference: 'Inspirasi Konten Entertainment_Lassiewear.jpg',
    credit: [
      ['Reference', '@nicholas linadi (TikTok)'],
      ['Script', 'Jassinta Roid Triniti'],
      ['Talent', 'Chindy'],
      ['Videographer', 'Jassinta Roid Triniti'],
      ['Editing', 'Jassinta Roid Triniti'],
    ],
    results: { views: '2000+', likes: '3', shares: '2' },
    seeMore: 'https://www.instagram.com/reel/DXlt8YhDfvy/?igsh=NGJqYTBueHI3emRi',
    footage: [
      'Footage Konten Entertainment 1_Lassiewear.jpg',
      'Footage Konten Entertainment 2_Lassiewear.jpg',
      'Footage Konten Entertainment 3_Lassiewear.jpg',
      'Footage Konten Entertainment 4_Lassiewear.jpg',
      'Footage Konten Entertainment 5_Lassiewear.jpg',
    ],
  },
  'education': {
    label: 'Education',
    about:
      'Content designed to provide explanations and valuable information with the goal of educating the audience.',
    example:
      "One of the best educational contents I created was a video explaining how to place an online order through Lassiewear's Instagram Direct Messages (DM).",
    reference: 'Inspirasi Konten Education_Lassiewear.jpg',
    credit: [
      ['Reference', '@Nadhera Luxury Indonesia'],
      ['Script', 'Jassinta Roid Triniti'],
      ['Talent', 'Siti Nur Azizah (@owshuary)'],
      ['Videographer', 'Jassinta Roid Triniti'],
      ['Editing', 'Jassinta Roid Triniti'],
    ],
    results: { views: '2000+', likes: '10', shares: '3' },
    seeMore: 'https://www.instagram.com/reel/DXTAK0IDe-y/?igsh=MWpobWVvMHFnZmtiMw==',
    footage: [
      'Footage Konten Education 1_Lassiewear.jpg',
      'Footage Konten Education 2_Lassiewear.jpg',
      'Footage Konten Education 3_Lassiewear.jpg',
      'Footage Konten Education 4_Lassiewear.jpg',
      'Footage Konten Education 5_Lassiewear.jpg',
    ],
  },
  'fun': {
    label: 'Fun',
    about:
      'Content designed to entertain audiences and increase social media engagement through humor and relatable trends.',
    example:
      'One of the best fun contents I created was a video titled "No No Ya Dek," inspired by a social media trend that was popular at the time.',
    reference: 'Inspirasi Konten Fun_Lassiewear.jpg',
    credit: [
      ['Reference', '@diary._secondbranded'],
      ['Talent', 'Siti Nur Azizah (@owshuary), Bella Damayanti, Vira Ananda'],
      ['Videographer', 'Jassinta Roid Triniti'],
      ['Editing', 'Jassinta Roid Triniti'],
    ],
    results: { views: '30K+', likes: '223', shares: '24' },
    seeMore: 'https://www.instagram.com/reel/DW3o0-UjfMG/?igsh=d2Q3cWk0NzQ1YzMz',
    // 4 footage files exist on disk per §19; 5th slot hidden automatically
    footage: [
      'Footage Konten Fun 2_Lassiewear 1.jpg',
      'Footage Konten Fun 2_Lassiewear.jpg',
      'Footage Konten Fun 3_Lassiewear.jpg',
      'Footage Konten Fun 4_Lassiewear.jpg',
    ],
  },
};

export const STRATEGY_ORDER: { slug: StrategySlug; label: string; video: string }[] = [
  { slug: 'hard-selling', label: 'Hard Selling', video: 'Hasil Konten Hardselling Lassiewear.mp4' },
  { slug: 'entertainment', label: 'Entertainment', video: 'Hasil Konten Entertainment Lassiewear.mp4' },
  { slug: 'education', label: 'Education', video: 'Hasil Konten Education Lassiewear.mp4' },
  { slug: 'fun', label: 'Fun', video: 'Hasil Konten Fun Lassiewear.mp4' },
];
