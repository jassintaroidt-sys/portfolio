// src/data/cassette.ts — BRIEF §12.3

export interface WorkItem {
  n: number;
  title: string;
  author: string;
  date: string;
  media: string;
  image: string;
  url: string | null;
}

export const works: WorkItem[] = [
  {
    n: 1,
    title: 'Inilah Sosok Jan Miskovic, Pemegang Rekor Mata Minus Tertinggi di Dunia yang Mengejutkan',
    author: 'Jassinta Roid Triniti',
    date: '20/01/2025',
    media: 'Independen Media',
    image: 'IMN_1.png',
    url: 'https://www.independenmedia.id/sosok/27614379267/inilah-sosok-jan-miskovic-pemegang-rekor-mata-minus-tertinggi-di-dunia-yang-mengejutkan?page=2',
  },
  {
    n: 2,
    title: 'Carmen H2H Lolos Audisi di SM Entertainment Tanpa Sepengetahuan Orang Tuanya, Ini Cerita Lengkapnya',
    author: 'Jassinta Roid Triniti',
    date: '20/04/2025',
    media: 'Independen Media',
    image: 'IMN_2.png',
    url: 'https://www.independenmedia.id/various/27614883156/carmen-h2h-lolos-audisi-di-sm-entertainment-tanpa-sepengetahuan-orang-tuanya-ini-cerita-lengkapnya?page=3',
  },
  {
    n: 3,
    title: "Keren! Komik Digital Indonesia 'Good Bad Fortune' Laris Manis di Korea, Ini Sinopsisnya",
    author: 'Jassinta Roid Triniti',
    date: '11/01/2025',
    media: 'Independen Media',
    image: 'IMN_3.png',
    url: 'https://www.independenmedia.id/various/27614320657/keren-komik-digital-indonesia-good-bad-fortune-laris-manis-di-korea-ini-sinopsisnya',
  },
  {
    n: 4,
    title: 'Kuwait Kuasai Posisi! Inilah Mata Uang Tertinggi di Dunia Saat Ini',
    author: 'Jassinta Roid Triniti',
    date: '01/02/2025',
    media: 'Independen Media',
    image: 'IMN_4.png',
    url: 'https://www.independenmedia.id/ekbis/27614462608/kuwait-kuasai-posisi-inilah-mata-uang-tertinggi-di-dunia-saat-ini?page=2',
  },
  {
    n: 5,
    title: 'Uang Rusak Jangan Dibuang! 2 Kondisi Cacat Ini Tetap Bisa Jadi Cuan Mahal Jika Dibeli Kolektor',
    author: 'Jassinta Roid Triniti',
    date: '19/12/2024',
    media: 'innalar.com',
    image: 'innalar_1.png',
    url: 'https://www.innalar.com/uang-rusak-jangan-dibuang-2-kondisi-cacat-ini-tetap-bisa-jadi-cuan-mahal-jika-dibeli-kolektor/',
  },
  {
    n: 6,
    title: 'Segini Harga Terkini Uang Kertas 100 Rupiah Gambar Perahu Layar Pinisi',
    author: 'Jassinta Roid Triniti',
    date: '20/12/2024',
    media: 'innalar.com',
    image: 'innalar_2.png',
    url: 'https://www.innalar.com/segini-harga-terkini-uang-kertas-100-rupiah-gambar-perahu-layar-pinisi/',
  },
  {
    n: 7,
    title: 'Butuh Dana Rp 2,2 Triliun, Proyek Pelebaran Jalan Raya Sawangan Kota Depok Belum Juga Direalisasikan',
    author: 'Jassinta Roid Triniti',
    date: '20/11/2024',
    media: 'innalar.com',
    image: 'innalar_3.png',
    url: 'https://www.innalar.com/butuh-dana-rp-22-triliun-proyek-pelebaran-jalan-raya-sawangan-kota-depok-belum-juga-direalisasikan/',
  },
  {
    n: 8,
    title: 'Sosok Junalies, Seorang Desainer Uang Kuno Indonesia yang Karyanya Mendunia: Salah Satunya Uang Seri Barong yang Legendaris',
    author: 'Jassinta Roid Triniti',
    date: '11/12/2024',
    media: 'innalar.com',
    image: 'innalar_4.png',
    url: 'https://www.innalar.com/sosok-junalies-seorang-desainer-uang-kuno-indonesia-yang-karyanya-mendunia-salah-satunya-uang-seri-barong-yang-legendaris/',
  },
  {
    n: 9,
    title: 'Membangun Personal Branding yang Kuat',
    author: 'Jassinta Roid Triniti',
    date: '2024',
    media: 'Ikapunija Media',
    image: 'Ikapunija_1.png',
    url: null,
  },
  {
    n: 10,
    title: 'Brand Kopi Kreatif Gen Z Karya Prodi Desain Grafis',
    author: 'Jassinta Roid Triniti',
    date: '2024',
    media: 'Ikapunija Media',
    image: 'Ikapunija_2.png',
    url: null,
  },
  {
    n: 11,
    title: 'Kunjungan Alumni IJTM ke Toyota dan Mitsubishi',
    author: 'Jassinta Roid Triniti',
    date: '2024',
    media: 'Ikapunija Media',
    image: 'Ikapunija_3.png',
    url: null,
  },
];
