// src/data/content.ts — BRIEF §13.3

export interface ContentStats {
  views?: number;
  likes?: number;
  comments?: number;
  saves?: number;
  shares?: number;
}

export interface ContentMedia {
  kind: 'video' | 'image';
  file: string;
  w: number;
  h: number;
}

export interface ContentCredit {
  company: string;
  handle: string;
  url: string;
  by: string;
}

export interface ContentInfo {
  heading: string;
  body: string[];
  stats?: ContentStats;
}

export interface ContentItem {
  n: number;
  title: string;
  date: string;
  platform: 'TikTok' | 'Instagram';
  type: string;
  media: ContentMedia;
  credit: ContentCredit;
  info: ContentInfo;
}

export const items: ContentItem[] = [
  {
    n: 1,
    title: 'Facial Messo',
    date: '22/06/2025',
    platform: 'TikTok',
    type: 'Video Animation',
    media: { kind: 'video', file: 'kecantikan_1.mp4', w: 1080, h: 1920 },
    credit: {
      company: 'Elsthetic, Aishi Beauty',
      handle: '@ELSthetic Official',
      url: 'https://vt.tiktok.com/ZS94wSVfA/',
      by: 'Jassinta Roid Triniti',
    },
    info: {
      heading: 'Facial Messo (2025)',
      body: [
        'I was involved in developing educational and promotional animated content regarding facial mesotherapy treatments for dull skin, enlarged pores, and signs of aging.',
        'The most unique aspect of this project was the inclusion of engaging "before-and-after" facial animations.',
      ],
      stats: { views: 179, likes: 2, shares: 2 },
    },
  },
  {
    n: 2,
    title: 'Ceramide',
    date: '09/07/2025',
    platform: 'TikTok',
    type: 'Video Education',
    media: { kind: 'video', file: 'kecantikan_2.mp4', w: 1080, h: 1920 },
    credit: {
      company: 'Elsthetic, Aishi Beauty',
      handle: '@ELSthetic Official',
      url: 'https://vt.tiktok.com/ZS94w5vFE/',
      by: 'Jassinta Roid Triniti',
    },
    info: {
      heading: 'Ceramide (2025)',
      body: [
        'This is arguably the best product-focused educational video or "soft sell" I have created during my time at Elsthetic, thanks to its crisp visuals and clear animation.',
        'However, despite the high quality of the animation and imagery, it falls short in terms of engagement, as the video has underperformed regarding views, likes, and shares.',
      ],
      stats: { views: 155, likes: 0, shares: 2 },
    },
  },
  {
    n: 3,
    title: 'Pico Glow Laser',
    date: '13/07/2025',
    platform: 'TikTok',
    type: 'Video Promotion',
    media: { kind: 'video', file: 'kecantikan_3.mp4', w: 1080, h: 1920 },
    credit: {
      company: 'Elsthetic, Aishi Beauty',
      handle: '@ELSthetic Official',
      url: 'https://vt.tiktok.com/ZS94wfGX9/',
      by: 'Jassinta Roid Triniti',
    },
    info: {
      heading: 'Pico Glow Laser (2025)',
      body: [
        'During my time at Elsthetic, I also tried creating promotional or "hard-sell" videos, as I believed such promotions were crucial for boosting company engagement.',
        'However, the engagement turned out to be very low; I realized that people didn\'t really care about "what" I was selling, but rather about "how important" it was to them.',
      ],
      stats: { views: 230, likes: 1, shares: 2 },
    },
  },
  {
    n: 4,
    title: 'Glow Max With Triple Geneo',
    date: '15/09/2025',
    platform: 'Instagram',
    type: 'Feed',
    media: { kind: 'image', file: 'flyer_kecantikan_1.jpg', w: 1080, h: 1072 },
    credit: {
      company: 'Elsthetic, Aishi Beauty',
      handle: '@elsthetic_pesona',
      url: 'https://www.instagram.com/p/DOmonNPj2By/?stkn=MWN1YjZpaWZqZnQ4bQ==',
      by: 'Jassinta Roid Triniti',
    },
    info: {
      heading: 'Glow Max With Triple Geneo (2025)',
      body: [
        'During my time at both Elsthetic and Aishi Beauty, I was also actively involved in creating and designing promotional price flyers on a weekly basis.',
        'The purpose of these promotional flyers was to boost sales.',
      ],
    },
  },
  {
    n: 5,
    title: 'Mega Sale 9.9 Booster Facial',
    date: '09/09/2025',
    platform: 'Instagram',
    type: 'Feed',
    media: { kind: 'image', file: 'flyer_kecantikan_2.jpg', w: 1080, h: 1080 },
    credit: {
      company: 'Elsthetic, Aishi Beauty',
      handle: '@elsthetic_pesona',
      url: 'https://www.instagram.com/p/DOXRYsuD4ze/?stkn=d3YwdWo1cGx5enJ2',
      by: 'Jassinta Roid Triniti',
    },
    info: {
      heading: 'Mega Sale 9.9 Booster Facial (2025)',
      body: [
        'I also create promotional flyers for special dates, such as 9.9, 7.7, and so on.',
        'Just like the weekly promotions, the goal of these special-date promotions is to boost interest and sales.',
      ],
    },
  },
  {
    n: 6,
    title: 'Promo Vit C Therapy',
    date: '08/09/2025',
    platform: 'Instagram',
    type: 'Feed',
    media: { kind: 'image', file: 'flyer_kecantikan_3.jpg', w: 1080, h: 1080 },
    credit: {
      company: 'Elsthetic, Aishi Beauty',
      handle: '@elsthetic_pesona',
      url: 'https://www.instagram.com/p/DOUnEKHDxW1/?stkn=MWZ5d2J1ZTl1aXJlcw==',
      by: 'Jassinta Roid Triniti',
    },
    info: {
      heading: 'Promo Vit C Therapy (2025)',
      body: [
        'When tasked with designing weekly flyers, the challenge often lies in creating designs that are cohesive yet distinct.',
        'This approach ensures that promotions look appealing while remaining aligned with the company\'s design pillars and overall style.',
      ],
    },
  },
  {
    n: 7,
    title: 'Luxury Facial',
    date: '02/09/2025',
    platform: 'Instagram',
    type: 'Feed',
    media: { kind: 'image', file: 'flyer_kecantikan_4.jpg', w: 1080, h: 1077 },
    credit: {
      company: 'Elsthetic, Aishi Beauty',
      handle: '@elsthetic_pesona',
      url: 'https://www.instagram.com/p/DOFf4gCj9kA/?stkn=MTFxcHV1YzBkNjF1cQ==',
      by: 'Jassinta Roid Triniti',
    },
    info: {
      heading: 'Luxury Facial (2025)',
      body: [
        'In fact, beyond the weekly and "special date" promotions, there is another offer: the limited-slot promotion.',
        'The purpose of this promotion is to encourage customers to quickly purchase or book beauty services at our clinic.',
      ],
    },
  },
  {
    n: 8,
    title: 'Promo 17 Agustus 2025',
    date: '15/08/2025',
    platform: 'Instagram',
    type: 'Feed',
    media: { kind: 'image', file: 'flyer_kecantikan_5.jpg', w: 1080, h: 1079 },
    credit: {
      company: 'Elsthetic, Aishi Beauty',
      handle: '@elsthetic_pesona',
      url: 'https://www.instagram.com/p/DNWtJsYPp9L/?stkn=MXZrOG90b25rbjRldQ==',
      by: 'Jassinta Roid Triniti',
    },
    info: {
      heading: 'Promo 17 Agustus 2025',
      body: [
        'Our beauty clinic company also runs promotions for major holidays, such as August 17th and others.',
        'Naturally, these promotions are designed to boost interest and attract more customers during the holiday season.',
      ],
    },
  },
  {
    n: 9,
    title: 'Luxury Glow Free Liposome',
    date: '22/07/2025',
    platform: 'Instagram',
    type: 'Feed',
    media: { kind: 'image', file: 'flyer_kecantikan_6.jpg', w: 1080, h: 1080 },
    credit: {
      company: 'Elsthetic, Aishi Beauty',
      handle: '@elsthetic_pesona',
      url: 'https://www.instagram.com/p/DMZA7DIPlso/?stkn=MTJ3NzZzOHJtcTRpMw==',
      by: 'Jassinta Roid Triniti',
    },
    info: {
      heading: 'Luxury Glow Free Liposome (2025)',
      body: [
        'Working as a designer sometimes requires creative thinking and a strong sense of design.',
        'That is why I occasionally create promotional flyers that incorporate educational elements, ensuring potential customers understand the benefits for them.',
      ],
    },
  },
  {
    n: 10,
    title: 'Umroh Bareng Orang Tua dan Anak-Anak',
    date: '06/08/2025',
    platform: 'TikTok',
    type: 'Video Promotion',
    media: { kind: 'video', file: 'travel_3.mp4', w: 1080, h: 1920 },
    credit: {
      company: 'Karamina Tour',
      handle: '@KARAMINA TOUR',
      url: 'https://vt.tiktok.com/ZS94wBUV5/',
      by: 'Jassinta Roid Triniti',
    },
    info: {
      heading: 'Umroh Bareng Orang Tua dan Anak-Anak (2025)',
      body: [
        'While working under the umbrella of ELS Corp—specifically at its subsidiary, Karamina Tour—I had the opportunity to create animated TikTok content incorporating video footage from Umrah pilgrimages.',
        'Engagement and conversion rates for this content saw significant growth, resulting in strong sales performance.',
      ],
      stats: { views: 179, likes: 75, comments: 1, saves: 7, shares: 3 },
    },
  },
  {
    n: 11,
    title: 'Umroh Itu Mahal Ya?',
    date: '03/08/2025',
    platform: 'TikTok',
    type: 'Video Education Animation',
    media: { kind: 'video', file: 'travel_1.mp4', w: 1080, h: 1920 },
    credit: {
      company: 'Karamina Tour',
      handle: '@KARAMINA TOUR',
      url: 'https://vt.tiktok.com/ZS94K1qgA/',
      by: 'Jassinta Roid Triniti',
    },
    info: {
      heading: 'Umroh Itu Mahal Ya? (2025)',
      body: [
        'During my time at Karamina Tour, I also had the opportunity to create animated educational videos that delivered impressive results in terms of quality, engagement, and conversions on TikTok.',
        'These videos incorporated a "soft sell" approach at the end, which helped drive an increase in the number of subscribers.',
      ],
      stats: { views: 179, likes: 32, saves: 1, shares: 3 },
    },
  },
  {
    n: 12,
    title: "Rindu Melihat Ka'bah?",
    date: '09/08/2025',
    platform: 'TikTok',
    type: 'Video Promotion',
    media: { kind: 'video', file: 'travel_2.mp4', w: 1080, h: 1920 },
    credit: {
      company: 'Karamina Tour',
      handle: '@KARAMINA TOUR',
      url: 'https://vt.tiktok.com/ZS94wW7Ja/',
      by: 'Jassinta Roid Triniti',
    },
    info: {
      heading: "Rindu Melihat Ka'bah? (2025)",
      body: [
        'Uploading this video to TikTok also led to an increase in engagement, promotion, and customer reach; the impact on the company was substantial, with views rising significantly to reach 914.',
      ],
      stats: { views: 914, likes: 98, comments: 2, saves: 10, shares: 3 },
    },
  },
  {
    n: 13,
    title: 'Elspresso Kini Hadir di Go-Food',
    date: '20/07/2025',
    platform: 'Instagram',
    type: 'Video Education',
    media: { kind: 'video', file: 'kuliner_1.mp4', w: 1080, h: 1920 },
    credit: {
      company: 'Elspresso',
      handle: '@elspresso_coffepastry',
      url: 'https://www.instagram.com/reel/DMUwp8qBd5J/?igsh=czBnc3A3YXJlcW54',
      by: 'Jassinta Roid Triniti',
    },
    info: {
      heading: 'Elspresso Kini Hadir di Go-Food (2025)',
      body: [
        'During my time at ELS Corp, I also had the opportunity to work with its subsidiary, Elspresso, creating and managing video content.',
        'This was my first experience managing social media and content for a company in the culinary or F&B sector.',
      ],
      stats: { views: 24, likes: 1 },
    },
  },
  {
    n: 14,
    title: 'Mood Menu',
    date: '26/07/2025',
    platform: 'Instagram',
    type: 'Video Soft Selling',
    media: { kind: 'video', file: 'kuliner_2.mp4', w: 1080, h: 1920 },
    credit: {
      company: 'Elspresso',
      handle: '@elspresso_coffepastry',
      url: 'https://www.instagram.com/reel/DMkb0mKhkus/?igsh=MXNuZjVndzd5d200Nw==',
      by: 'Jassinta Roid Triniti',
    },
    info: {
      heading: 'Mood Menu (2025)',
      body: [
        'While at Espresso, I also had the opportunity to create a soft-selling animated video—produced almost entirely using animation even though the engagement and conversion rates for this content were very low.',
      ],
      stats: { views: 38, likes: 0 },
    },
  },
  {
    n: 15,
    title: 'Meeting Package FullDay',
    date: '22/07/2025',
    platform: 'Instagram',
    type: 'Video Promotion',
    media: { kind: 'video', file: 'kuliner_3.mp4', w: 1080, h: 1920 },
    credit: {
      company: 'Elspresso',
      handle: '@elspresso_coffepastry',
      url: 'https://www.instagram.com/reel/DMaBAg8B0tG/?igsh=MXA0dGpkanZlamd4MQ==',
      by: 'Jassinta Roid Triniti',
    },
    info: {
      heading: 'Meeting Package FullDay (2025)',
      body: [
        'A promotional video was also created during my time at Elspresso, even though its engagement and conversion rates were still low.',
        'This is perfectly understandable, because Elspresso is a culinary company that has only just started out.',
      ],
      stats: { views: 43, likes: 0 },
    },
  },
];
