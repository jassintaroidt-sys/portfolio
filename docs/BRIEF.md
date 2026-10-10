# BRIEF — Website Portfolio "Jassinta Roid Triniti · Creative Portfolio"

Kamu adalah senior creative-frontend engineer + art director + 3D-CSS specialist. Bangun **website portfolio one-page** untuk Jassinta Roid Triniti (Social Media Specialist, Content Creator, Videographer, Graphic Designer). Dokumen ini adalah satu-satunya sumber kebenaran. Baca seluruhnya sebelum menulis kode. Jika ada hal yang ambigu, **tanyakan dengan pilihan A/B/C**; jangan menebak diam-diam. Jika tidak bisa menunggu jawaban, pakai default yang tertulis dan catat di `docs/DECISIONS.md`.

---

## §0 ATURAN EMAS (tidak boleh dilanggar)

1. **Bahasa website: 100% English** (teks UI, label, alt text, aria-label, judul, deskripsi, placeholder, pesan error). Judul karya/artikel yang memang berbahasa Indonesia (nama resmi karya) tetap asli. Nama variabel, komentar kode, dan nama komponen: English.
2. **Tema:** playful · girly · textured. Elegan, bukan norak. Tekstur kertas/kardus/kulit/glitter/grain konsisten tapi ringan.
3. **DILARANG** memakai file gambar desain (`loker_tertutup.png`, `loker_terbuka.png`, `bag.png`, `books.png`, `camera.png`, `certificate.png`, `envelope.png`, `magazine.png`, `notes.png`, `polaroids.png`, `shoes.png`, `trophy.png`, `umbrella.png`, `Aset_*.png`) sebagai bagian website, background, `<img>`, `background-image`, `mask`, atau sprite. Folder `reference/` hanya untuk dilihat agent, **tidak boleh** ada di `public/`, tidak boleh di-import, dan harus masuk `.vercelignore`. Semua loker dan semua barang **dibuat ulang** dari CSS 3D berlapis + SVG vektor (gradient, filter, pola) sampai bentuk, warna, detail, dan kedalaman 3D-nya sama dengan referensi.
4. **Nama file media dipakai persis** seperti di §19 (huruf besar/kecil, spasi, ekstensi). Server Vercel **case-sensitive**. Semua URL media melalui `mediaUrl()` yang meng-encode tiap segmen path (`encodeURIComponent`) agar spasi aman.
5. **Tidak ada scroll horizontal pada halaman.** Konten lebar scroll di dalam kontainernya sendiri. `html, body { overflow-x: clip }`.
6. **Responsif penuh** untuk HP, tablet, laptop, PC, layar ≥ 1920px, portrait & landscape. Tidak ada elemen terpotong yang tidak disengaja, tumpang-tindih, atau berantakan di ukuran apa pun (lihat §8).
7. **Aksesibilitas:** semua interaktif bisa lewat keyboard; `:focus-visible` outline pink 3px; overlay `role="dialog" aria-modal="true"`; `prefers-reduced-motion` dihormati.
8. **Tidak ada `Math.random()` saat render** (kecuali pengacakan Archive di dalam `useEffect`/state awal satu kali). Semua dekorasi acak memakai PRNG ber-seed.
9. **Tidak ada `position: fixed` global overlay untuk grain/robekan.** Grain & robekan menempel pada section-nya (lihat §5 dan §6).
10. **Performa:** target Lighthouse Mobile Performance ≥ 70, Accessibility ≥ 90, tanpa CLS besar. Lazy-load semua media di bawah layar pertama. Maks ±6 video diputar bersamaan.
11. **Kerja bertahap.** Setelah tiap fase: jalankan `npm run build`, `npm run check:media`, ambil screenshot (§8.5), tulis ringkasan di `docs/PROGRESS.md`. Jangan lanjut fase bila build gagal.
12. **Jangan mengubah, memperpendek, atau meringkas teks/konten** di brief ini. Salin persis (kecuali koreksi typo yang sudah disebut di brief).

---

## §1 TECH STACK & STRUKTUR PROYEK

- React 18 + Vite + TypeScript (strict). Tailwind CSS **v3.4** (`tailwind.config.ts` memuat warna kustom = nama token §2).
- Scroll: **Lenis** (smooth hanya lewat Lenis; `html.lenis { scroll-behavior: auto }`). Animasi scroll: **GSAP + ScrollTrigger** (gunakan `matchMedia` untuk responsif & reduced-motion).
- Font: paket `@fontsource/*` (self-host) + **Sentient** dari Fontshare di-self-host (unduh woff2 Regular, Italic, Bold, Bold Italic ke `public/fonts/sentient/` dan buat `@font-face` dengan `font-display: swap`). Fallback sesuai §3.
- Lain-lain: `html-to-image` (Save as image), `vitest` (unit test engine), `@playwright/test` (screenshot QA), `image-size` (dev, skrip cek media), `sharp` (dev, skrip optimasi). Tanpa library router: buat `useHashRoute()` sendiri.
- Tidak memakai three.js. 3D = **CSS 3D transforms berlapis** (`perspective`, `transform-style: preserve-3d`, `translateZ`) + SVG.

```
src/
  main.tsx  App.tsx  vite-env.d.ts
  lib/        media.ts  seed.ts  torn.ts  fit.ts  archiveLayout.ts  flipbook.ts  hashRoute.ts  device.ts  scroll.ts
  data/       documents.ts  cassette.ts  content.ts  strategy.ts  archive.ts  campus.ts  media-manifest.ts  overlays.ts  copy.ts
  styles/     tokens.css  fonts.css  textures.css  base.css
  components/
    ui/       HoverLabel StickerButton Pushpin PaperNote PhotoFrame Overlay Carousel SafeImage SafeVideo Preloader Footer
    nav/      TocOverlay TocInline TocButton
    torn/     TornSection TornFiberEdge TornHighlight
    three/    Box3D Plane3D Extrude
    locker/   LockerCabinet LockerDoor ClosedLocker OpenLocker CompartmentOpen DoorCard Plate Vent Handle OpenButton
    items/    Certificate Trophy MagazineStack Camera Polaroids Envelope Books Notes Shoes Bag Umbrella
    sections/ Opening PersonalBrand WritingPortfolio ContentMarketing ExampleStrategy ProjectCampus Podcast Archive Contact
    hero/     SectionHero RevealMedia Headline
    cassette/ DiscRow Disc DiscInfo
    runway/   Runway RunwayCard CreditPopup InfoPanel AmbientBackdrop
    reveal3d/ CurvedPanelRow StrategyInfoOverlay FootageGallery
    campus/   Bookshelf Flipbook
    archive/  ArchiveList ArchivePreview
    pages/    ParticipationPage AchievementPage MagazineArtPage PhotographyPage MyMessagePage MyStrategyPage NotesPage
public/assets/ (lihat §19)   public/fonts/sentient/
reference/ (tidak ikut build)   docs/ BRIEF.md DECISIONS.md PROGRESS.md
scripts/ check-media.mjs  check-no-reference.mjs  make-posters.sh  optimize-media.mjs
vercel.json  .vercelignore  .gitignore  README.md
```

Skrip npm wajib: `dev`, `build`, `preview`, `typecheck`, `test`, `check:media`, `check:refs` (gagal bila `src/` mengandung string `loker_tertutup|loker_terbuka|bag.png|books.png|camera.png|certificate.png|envelope.png|magazine.png|notes.png|polaroids.png|shoes.png|trophy.png|umbrella.png|Aset_`), `qa:shots`.

---

## §2 DESIGN SYSTEM — PALET WARNA (CSS variables di `:root` + Tailwind; nama token = nama di tabel)

### 2.1 Pink
| Token | Hex | Pemakaian |
|---|---|---|
| `--hot-pink` | `#FF2E93` | Tombol utama, glow reveal, aksen kuat |
| `--barbie-pink` | `#E91E8C` | Hover tombol, teks aksen, sticker |
| `--raspberry` | `#D81B72` | Garis aksen, ikon, teks pink ukuran kecil |
| `--bubblegum` | `#FF8DC7` | Blok highlight, badge |
| `--candy-pink` | `#FFB3D9` | Badan loker terbuka, sticker |
| `--blush` | `#FFD6E8` | Latar section lembut |
| `--rose-quartz` | `#F7CAD0` | Kartu, kertas |
| `--powder-pink` | `#FDE4EC` | Latar section terang |
| `--dusty-rose` | `#E8A5B8` | Bayangan berwarna |
| `--cherry-red` | `#E5173F` | Headline italic merah (The Campus, The Story, the Microphone), staple, pin |
| `--lipstick-red` | `#C8102E` | Elemen majalah |
| `--coral-pop` | `#FF6F6F` | Aksen playful |
| `--peach-fizz` | `#FFB38A` | Blok highlight, label |
| `--apricot` | `#FFD3B0` | Highlight lembut |

### 2.2 Ungu / Lavender
| Token | Hex | Pemakaian |
|---|---|---|
| `--lavender` | `#BFA8E5` | Amplop, kartu, loker |
| `--lilac` | `#D4C1F5` | Latar section, highlight |
| `--wisteria` | `#A98BDA` | Aksen sekunder |
| `--orchid` | `#DA9AF2` | Glow, gradient |
| `--grape-soda` | `#7B4FB8` | Teks di atas pastel |
| `--berry` | `#7A2E5C` | Interior loker terbuka |
| `--aubergine` | `#4B1D4F` | Gradient gelap |
| `--plum-night` | `#2A0F2E` | Latar gelap utama |

### 2.3 Mint / Hijau / Biru pastel
| Token | Hex | Pemakaian |
|---|---|---|
| `--mint-cream` | `#D4F2E4` | Latar lembut |
| `--pastel-mint` | `#A8E6CF` | Highlight, kamera, kartu |
| `--matcha` | `#B7D9A8` | Detail tanaman |
| `--sage` | `#A9C4A0` | Aksen netral |
| `--baby-blue` | `#BFE3F5` | Highlight, ikon |
| `--sky-pastel` | `#A7D8F5` | Aksen |
| `--periwinkle` | `#B8C4F2` | Aksen |
| `--notebook-blue` | `#8FB8E8` | Garis kertas bergaris |
| `--steel-lilac` | `#B9B8CC` | Loker tertutup |

### 2.4 Kuning / Krem / Kertas
| Token | Hex | Pemakaian |
|---|---|---|
| `--butter` | `#FFF1A8` | Highlight, sticky note |
| `--lemon-chiffon` | `#FFF6C9` | Highlight lembut |
| `--vanilla` | `#FFF8EE` | Latar krem hangat |
| `--aged-paper` | `#F3E3B8` | Kertas kekuningan (papan pin foto) |
| `--honey` | `#F6D76B` | Aksen |
| `--milk-white` | `#FFFDF9` | Kertas putih, teks di atas gelap |
| `--pure-white` | `#FFFFFF` | Kanvas Personal Brand (**wajib pure white**) |

### 2.5 Netral & Logam
| Token | Hex | Pemakaian |
|---|---|---|
| `--ink` | `#1B1017` | Teks utama |
| `--espresso` | `#2B1B17` | Teks pada kertas |
| `--cocoa` | `#5A3A2E` | Detail kayu |
| `--walnut` | `#7A4A32` | Gagang payung, rak kayu |
| `--pearl` | `#F4EFF1` | Netral terang |
| `--warm-grey` | `#D9D3D6` | Garis, bayangan |
| `--chrome` | `#C9CCD5` | Logam |
| `--gold` | `#D4A64A` | Bingkai, piala |
| `--champagne` | `#EBD08C` | Highlight emas |
| `--staple-red` | `#D7263D` | Staple/pin di kertas |

### 2.6 Gradient bernama
```css
--grad-plum-night: linear-gradient(160deg, #2A0F2E 0%, #4B1D4F 55%, #7A2E5C 100%);
--grad-cotton-candy: linear-gradient(135deg, #FFD6E8 0%, #E3D4FA 50%, #CDEBF8 100%);
--grad-bubblegum: linear-gradient(135deg, #FF8DC7 0%, #FF2E93 100%);
--grad-lilac-mint: linear-gradient(135deg, #D4C1F5 0%, #D4F2E4 100%);
```

### 2.7 TAMBAHAN warna (usulan untuk melengkapi tema; semuanya token baru, boleh disesuaikan)
| Token | Hex | Pemakaian |
|---|---|---|
| `--mist` | `#E9EBF2` | Latar halaman Opening (loker tertutup) abu-kebiruan sangat terang |
| `--cloud` | `#E3E6EE` | Gradien halus latar Opening |
| `--locker-steel-hi` | `#DADCE8` | Highlight baja pintu tertutup |
| `--locker-steel-mid` | `#B9B8CC` | Badan pintu (= steel-lilac) |
| `--locker-steel-lo` | `#9A9BB2` | Bayangan lipatan baja |
| `--locker-rail` | `#34323F` | Rel/tiang gelap loker tertutup |
| `--locker-rivet` | `#7C7D91` | Paku rivet |
| `--chrome-hi` | `#FFFFFF` | Specular chrome |
| `--chrome-lo` | `#8F93A3` | Sisi gelap chrome |
| `--handle-black` | `#14121A` | Rumah handle benam |
| `--open-rail` | `#F7B8D6` | Rel loker terbuka (pink pucat) |
| `--open-ceiling` | `#FFC2E0` | Langit-langit interior |
| `--open-shelf` | `#F7A8CF` | Permukaan rak |
| `--open-shelf-edge` | `#FFE3F0` | Bibir rak (highlight) |
| `--interior-deep` | `#5A1E45` | Sudut gelap interior (AO) |
| `--interior-wall` | `#8E3568` | Dinding belakang lebih terang |
| `--gold-1` | `#FFF3C4` | Emas — specular |
| `--gold-2` | `#F0D27A` | Emas — terang |
| `--gold-3` | `#D4A64A` | Emas — dasar |
| `--gold-4` | `#9A6F1E` | Emas — bayangan |
| `--leather-pink-hi` | `#FFC6E0` | Highlight kulit tas/kamera |
| `--camera-mint` | `#A8E6CF` | Badan kamera |
| `--camera-pink` | `#F8C8DC` | Pita kulit kamera |
| `--camera-lilac` | `#CDB8EE` | Lensa & dial |
| `--camera-blue` | `#B5D8F0` | Cincin lensa |
| `--wood-hi` | `#A9714F` | Highlight kayu gagang payung |
| `--book-terracotta` | `#C98B7F` | Buku |
| `--book-dusty-pink` | `#E8B7B7` | Buku |
| `--book-sage` | `#A9C4A0` | Buku |
| `--book-lavender` | `#BFA8E5` | Buku |
| `--book-mint` | `#B9D9C0` | Buku |
| `--book-babyblue` | `#BFD9EA` | Buku |
| `--book-cream` | `#F1E7D8` | Buku |
| `--book-salmon` | `#F4A58A` | Buku |
| `--book-butter` | `#F3E08F` | Buku |
| `--washi-pink` | `rgba(255,179,217,.72)` | Washi tape |
| `--washi-mint` | `rgba(168,230,207,.72)` | Washi tape |
| `--washi-lilac` | `rgba(212,193,245,.74)` | Washi tape |
| `--washi-butter` | `rgba(255,241,168,.76)` | Washi tape |
| `--twine` | `#C9A66B` | Tali rami polaroid |
| `--shadow-pink` | `rgba(233,30,140,.25)` | Bayangan berwarna |
| `--shadow-plum` | `rgba(42,15,46,.35)` | Bayangan di atas gelap |
| `--glow-hot` | `rgba(255,46,147,.55)` | Radiant glow runway |
| `--disc-rim` | `#C9CCD5` | Tepi disc |
| `--disc-hub` | `#E6E8F0` | Hub tengah disc |

### 2.8 Peta latar per section (usulan; tiap section punya latar & grain sendiri)
| Section | Latar | Catatan |
|---|---|---|
| Opening (tertutup) | `--mist→--cloud` + loker baja `--steel-lilac`, pintu 03 `--candy-pink` | Bawah layar bersih, TANPA robekan |
| Opening (terbuka) | `--powder-pink→--blush`, kabinet pink + interior `--berry` | Robekan di bawah (seed 101) |
| Personal Brand | `--pure-white` murni | Tanpa grain berwarna; boleh paper-grain sangat halus hanya pada lembar dokumen |
| Hero Writing / Content / Strategy / Campus / Podcast | `--powder-pink`, `--lilac`, `--blush`, `--apricot`, `--lavender` (satu per section) | Grain terang |
| Cassette (disc) | `--vanilla` + sedikit `--lilac` | Mirip kertas putih tekstur ala referensi disc; robekan seed 202 |
| Runway Content Marketing | `--grad-plum-night` + media latar 50% | Film grain putih; robekan seed 303 |
| Video Reveal Strategy | `--plum-night` + lantai grid `--aubergine` | Robekan seed 404 |
| Flipbook Campus | `--aged-paper` + rak kayu `--walnut` | Robekan seed 505 |
| Archive | `--plum-night` + media latar redup | Robekan seed 606 |
| Contact | `--aubergine→--plum-night` + media/pola redup | Footer penuh |

### 2.9 Aturan kontras
Teks pink ukuran kecil (< 24px) di atas latar terang memakai `--raspberry` atau `--ink`; `--hot-pink` hanya untuk teks besar/tebal, ikon, dan latar tombol. Teks di atas gelap memakai `--milk-white`.

---

## §3 TIPOGRAFI

| Peran | Font | Fallback |
|---|---|---|
| Display serif | **Sentient** (Fontshare) Regular, Italic, Bold, Bold Italic | `'Fraunces', Georgia, serif` |
| Body/narasi | **Poppins** italic (narasi, maks 24,9px); Poppins 400/500/600 untuk UI | `system-ui, sans-serif` |
| Giant sans (Personal Brand) | **Anton** | `'Archivo Black', Impact, sans-serif` |
| Handwriting (surat, notes) | **Caveat** | `'Patrick Hand', cursive` |
| Script "Fashion" | **Pinyon Script** | `'Great Vibes', cursive` |
| VOGUE | **Bodoni Moda** 700–900 | `'Playfair Display', serif` |
| OOTD & nomor pintu & NOTES | **Bebas Neue** | `Oswald, Impact, sans-serif` |
| Label/typewriter/footer | **DM Mono** / Special Elite | `monospace` |
| Caption polaroid | **Permanent Marker** atau Caveat | `cursive` |

Ukuran fluid (wajib persis):
```css
--headline: clamp(2.1rem, 1.2rem + 3.6vw, 4.125rem); /* 66px di desktop */
.headline { font-size: var(--headline); line-height: 1.02; letter-spacing: -0.01em; text-wrap: balance; }
.narration { font-family: Poppins; font-style: italic; font-size: clamp(1rem, 0.85rem + 0.7vw, 1.556rem); /* maks 24,9px */
  line-height: 1.5; text-wrap: pretty; max-width: 58ch; }
:root { --headline-narration-gap: 1.5rem; } /* jarak Headline → Narasi (yang tertulis "1,5 Px" = 1.5rem) */
```
Teks panjang (judul artikel): `overflow-wrap: anywhere`. Body ≥ 14px di HP; caption/DM Mono ≥ 11px.

**Pola headline per section** (Sentient; `B` = Bold, `BI` = Bold Italic, `RI` = italic merah `--cherry-red`):
- Writing Portfolio: `Storytelling` (BI) · `Through Screens` (B)
- Content Marketing: `From Ordinary Content to` (BI) · baris baru · `Memorable Stories` (B)
- Example Strategy: `From` (B) `Scrolling` (BI) `to` (B) `Strategy` (BI)
- Project Campus: `From` (B) `The Campus` (RI) `For` (B) `The Story` (RI)
- Podcast: eyebrow `PODCAST` (DM Mono) · `Behind` (B) `the Microphone` (RI)
- Contact: `Email` (B) · `Social Media` (BI) · `WA/Phone` (B), ukuran 66px (token `--headline`); nilai kontak Poppins italic 24,9px.

---

## §4 TEKSTUR (inti tema)

- **Grain/noise per section:** `::after` dengan `position:absolute; inset:0; pointer-events:none`, statis (tanpa animasi). Terang: noise **hitam** + `mix-blend-mode: multiply`, opacity .06–.10. Gelap (film grain): noise **putih** + `mix-blend-mode: screen`, opacity .05. (Noise hitam + screen tidak terlihat — jangan dipakai.)
```css
.grain::after{content:"";position:absolute;inset:0;pointer-events:none;z-index:50;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  mix-blend-mode:multiply;opacity:.08;}
/* Dark variant: WHITE noise (RGB = 1) so that `screen` is actually visible */
.grain-dark::after{
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  mix-blend-mode:screen;opacity:.05;}
```
- **ATURAN TEKSTUR PENTING:** noise/grain harus **di-clip bersama section kertasnya**. Jangan pernah menempelkan grain section ke `body`, overlay fixed global, atau viewport. Saat bagian bawah section robek, grain **berhenti tepat di kontur robekan yang sama**. Section berikutnya mulai dengan lapisan grain independen miliknya sendiri. (Karena mask dipasang di elemen section, `::after` grain otomatis ikut ter-mask.)
- **Paper grain:** noise halus + serat tipis + vignette tepi pada kartu/kertas.
- **Cardstock & lipatan:** highlight tepi 1px + bayangan bertingkat.
- **Glitter pink:** gradient + noise terang + `background-blend-mode` (tombol utama & huruf aksen).
- **Sticker die-cut:** tepi putih 3–4px + bayangan lembut + rotasi kecil.
- **Washi tape:** strip semi-transparan bermotif, ujung bergerigi, rotasi acak ber-seed.
- **Leather grain:** kamera & tas. **Halftone dots:** dekor latar tertentu.
- **Kertas bergaris:** `repeating-linear-gradient` `--notebook-blue` + garis margin merah muda.

---

## §5 KOMPONEN REUSABLE (buat sekali, pakai di mana-mana)

- `<HoverLabel text>` — label price-tag kertas (latar `--milk-white`, jahitan putus-putus, tali kecil, rotasi kecil) muncul dekat kursor/objek saat hover. Layar sentuh: muncul saat **tap pertama/long-press** + caption kecil tetap di bawah barang. **Collision detection** agar tidak keluar viewport. Label **tidak boleh menutupi, terpotong, atau tertimpa** bagian lain, dan posisinya harus sesuai letak barang (portal ke atas stacking context loker; hitung dari `getBoundingClientRect` barang; pilih sisi: atas → samping → bawah, yang muat).
- `<StickerButton>` — sticker die-cut pink glitter, sedikit miring, bayangan keras-lembut, hover = goyang + naik 2px. Area sentuh ≥ 44×44px.
- `<Pushpin color>` — paku payung 3D kecil (`--cherry-red` / `--hot-pink` / `--wisteria`), kepala bulat berkilau + bayangan jarum.
- `<PaperNote>` — kertas `--aged-paper` + grain + sudut terangkat.
- `<PhotoFrame>` — bingkai putih tebal + `box-shadow: 0 10px 25px rgba(0,0,0,.25)`; **tidak pernah memotong foto** (`object-fit: contain`, bingkai mengikuti rasio foto).
- `<TornSection>` / `<TornEdge>` — §6.
- `<TocOverlay>` + `<TocInline>` — §7.
- `<SectionHero>` — headline + narasi + (opsional) media reveal.
- `<Overlay>` — layar penuh: focus trap, `Esc` menutup, scroll body terkunci (`lenis.stop()`), animasi masuk "sticker pop", `role="dialog" aria-modal="true"`, fokus kembali ke pemicu saat ditutup, area scroll dalamnya diberi `data-lenis-prevent`.
- `<Carousel>` — tombol panah + drag/swipe (pointer events), snap, keyboard ← →, tidak memotong media.
- `<SafeImage>` / `<SafeVideo>` — `loading="lazy"`, `decoding="async"`, `crossOrigin="anonymous"`, fallback `.webp`→asli, fallback placeholder bila gagal, menjaga rasio asli (width/height atau `aspect-ratio` dari manifest → CLS nol). `SafeVideo`: `muted playsInline loop preload="none" poster`, play hanya saat terlihat (IntersectionObserver), jeda bila tab tersembunyi, batas global ±6 video aktif (antrian LRU).
- `<Box3D w h d>` / `<Plane3D>` / `<Extrude layers>` — primitif 3D (§9.2).

---

## §6 `<TornEdge>` — TRANSISI KERTAS ROBEK YANG REALISTIS

**PENTING:** TornEdge BUKAN footer dekoratif, BUKAN divider zig-zag, BUKAN strip gradient terpisah. Efeknya harus tampak seolah **tepi bawah section kertas ini benar-benar disobek dengan tangan**.

### 6.1 Aturan visual inti
Section itu sendiri adalah lembar kertasnya. Background, gradient, grain, tekstur, ilustrasi, foto, dan kontennya harus terus sampai ke batas robekan. **Jangan** membuat persegi gradient terpisah di bawah section. Section berikutnya dimulai tepat di balik tepi robekan; area ter-mask pada section sekarang menampakkan **background asli section berikutnya**.

### 6.2 Struktur DOM
```tsx
<TornSection seed={101} backgroundClass="opening-paper">
  <div className="torn-section-shadow-wrapper">
    <section className="torn-paper-section">{/* section content */}</section>
    <TornFiberEdge />
    <TornHighlight />
  </div>
</TornSection>
```
Tetap berada di **alur dokumen normal**. Tidak `position: fixed`. Tepi robekan tidak di layer global fixed.

### 6.3 Masking
Bentuk robekan diterapkan langsung pada section memakai **SVG mask-image** (dibuat secara programatik). CSS wajib: `-webkit-mask-image`, `mask-image`, `-webkit-mask-repeat: no-repeat`, `mask-repeat: no-repeat`, `-webkit-mask-position`, `mask-position`, `-webkit-mask-size`, `mask-size`. Mask **putih/opaque di atas** batas robekan dan **transparan di bawah**.

**Tambahan teknis wajib (agar tidak peyot pada section tinggi):** gunakan **dua layer mask**: (1) persegi solid untuk badan section, (2) strip SVG robekan setinggi `--tear-h` di dasar.
```css
.torn-paper-section{
  --tear-h: clamp(36px, 6vw, 90px);
  -webkit-mask-image: linear-gradient(#000,#000), var(--tear-url);
  mask-image: linear-gradient(#000,#000), var(--tear-url);
  -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
  -webkit-mask-position: top left, left bottom; mask-position: top left, left bottom;
  -webkit-mask-size: 100% calc(100% - var(--tear-h) + 1px), 100% var(--tear-h);
  mask-size: 100% calc(100% - var(--tear-h) + 1px), 100% var(--tear-h);
}
```
Dengan begitu SVG robekan **tidak pernah di-stretch** mengikuti tinggi section (mis. runway setinggi 300vh). Pada kasus jelas section pendek pun hasilnya sama.

**DILARANG:** `clip-path: polygon()`, gelombang SVG lurus sederhana, pola zig-zag berulang, segitiga, scallop seragam, `border-image`, footer putih palsu, strip gradient transisi, background gradient terpisah yang berpura-pura robekan.

### 6.4 Bentuk robekan realistis
Kontur unik tapi **deterministik** per section, gabungan **3 lapis noise ber-seed**:
1. **Deformasi kertas skala besar:** gelombang lebar tak beraturan, 2–4 naik/turun besar sepanjang lebar.
2. **Robekan skala menengah:** potongan tak rata, puncak & lembah asimetris, bagian terkoyak tak beraturan.
3. **Noise serat skala halus:** gigi kecil tak teratur, serat menonjol halus, serpihan kertas kecil. Harus tetap masuk akal secara visual, bukan piksel noise.

Hasil akhir harus menyerupai **kertas yang disobek tangan sungguhan**; tidak boleh tampak buatan komputer, berulang, simetris, atau seperti gergaji.

**Tiga detail fisik tambahan** (halus & fotografis, bukan kartun):
1. **Serat panjang:** sedikit sekali serat memanjang di sepanjang tepi; panjang & jarak tidak seragam; sebagian menjulur **2–8px** melewati kontur utama; tidak ada dua serat identik.
2. **Potongan kecil menggantung:** sesekali serpihan kertas kecil menjuntai; jarang, asimetris, tidak mengulang pola.
3. **Ketebalan kertas:** di beberapa titik tepi robekan tidak langsung putih rata: sebagian memperlihatkan **bagian dalam kertas yang lebih gelap**, sebagian **serat terang**, sebagian tetap tipis.

### 6.5 Seed
Tiap section punya seed stabil: `opening = 101`, `cassette = 202`, `content-marketing = 303`, `video-reveal = 404`, `project-campus = 505`, `archive = 606`. Seed sama ⇒ bentuk robekan sama; tidak berubah saat re-render. **Tanpa `Math.random()`**; pakai PRNG ber-seed (mulberry32/xmur3).

### 6.6 Dimensi
- Tinggi zona robekan: `height: clamp(36px, 6vw, 90px)` (posisi tepi tepat boleh bervariasi alami sepanjang lebar).
- Lebar: seluruh viewport, dengan overscan `width: calc(100% + 4px); margin-left: -2px;`. Tidak boleh ada celah horizontal di kiri/kanan.

### 6.7 Ketebalan / serat bagian dalam
Tepat di bawah kontur utama buat lapis serat kedua yang **sangat halus** memakai `--milk-white` dengan offset **3–8px** mengikuti kontur. Kontur kedua: sedikit lebih lembut, lebih halus, kurang menonjol, tidak beraturan, sedikit berbeda dari robekan utama. Ini serat tipis yang masih menempel setelah sobek. **Bukan** border putih, **bukan** garis putih halus kontinu; hanya muncul di area kecil tak beraturan.

### 6.8 Bayangan
Bayangan di **wrapper luar**, BUKAN pada section ter-mask: `filter: drop-shadow(0 6px 8px rgba(0,0,0,.18));`. Bayangan mengikuti kontur robekan sehingga kertas tampak sedikit terangkat di atas section berikutnya. **Jangan** `box-shadow` pada section ter-mask (membuat bayangan persegi palsu).

### 6.9 Curl & kedalaman
Highlight 1px yang sangat halus pada sebagian tepi robekan (serat terbuka + sedikit melengkung): halus, tak beraturan, tidak lengkap, **tidak pernah border kontinu**. Kedalaman: highlight tepi halus, sisi bawah gelap halus, drop-shadow lembut, ketidakteraturan serat kecil. Hindari efek 3D berlebihan.

### 6.10 Kontinuitas latar (KRITIS)
Background section sekarang menerus sampai kontur robekan tanpa patahan warna. Background asli section berikutnya terlihat langsung di bawah batas robekan. Contoh: A = kertas pink bertekstur, B = kertas krem bertekstur → di robekan, pink berhenti secara fisik dan krem muncul di baliknya. **Jangan pernah** menyisipkan strip putih, pemisah solid, pemisah gradient, strip abu transparan, pembagi gelombang generik, atau jarak antar-section. Grain section B tetap menempel pada B.

### 6.11 Urutan tumpukan
Page background → section berikutnya → section robek sekarang → serat sisa → highlight robekan → konten section. Area robekan harus menampakkan **section di baliknya**, bukan `<body>`. Setiap section menjaga background independennya.

### 6.12 Alur section (tanpa celah)
Semua section berdampingan langsung di alur dokumen. **Jangan** `margin-bottom` pada section robek. **Jangan** elemen spacer vertikal setelahnya. Section berikutnya dimulai tepat di bawah area ter-mask: berikan `margin-top: calc(var(--tear-h) * -1)`, `padding-top: var(--tear-h)` (agar kontennya tidak naik), dan `position: relative; z-index` lebih rendah daripada section robek. Ruang napas tambahan = `padding-bottom` **di dalam** section sekarang.

### 6.13 Performa, responsif, aksesibilitas
- Bangun path SVG **sekali** per (seed, bucket lebar) dan **memoize**; jangan regenerasi tiap frame animasi; tanpa animasi pada kontur. Gunakan `useMemo` dan cache modul. Bucket lebar (mis. dibulatkan 64px) + `ResizeObserver` ber-debounce ±100ms.
- Responsif: kontur dibuat ulang/diskalakan dengan **seed & karakter yang sama**; **jangan** meremas SVG horizontal sampai robekan tampak datar di HP. Di lebar kecil kurangi jumlah detail halus, **pertahankan** ketidakteraturan besar & menengah; tetap terlihat robek di layar 360px.
- `pointer-events: none` pada semua elemen robekan (decor); tidak mengganggu keyboard, screen reader, tombol, tautan, video. `aria-hidden="true"`.
- Hati-hati: `filter` pada wrapper membuat containing block baru → **jangan** menaruh elemen `position: fixed` di dalam `TornSection`; `position: sticky` untuk section pinned tetap dipakai pada elemen di dalam `.torn-paper-section` (uji!).

### 6.14 Dipakai HANYA di dasar:
1. Opening — state terbuka · 2. Cassette · 3. Content Marketing · 4. Video Reveal / Example Strategy · 5. Project Campus · 6. Archive. Jangan memasang di bawah komponen kecil.

### 6.15 Implementasi React (wajib)
Komponen `<TornSection seed={101} backgroundClass="opening-paper">…</TornSection>` bertanggung jawab atas: generasi SVG robekan deterministik, mask SVG, meng-clip tekstur bersama kertas, serat sisa, highlight tak beraturan, wrapper drop-shadow luar, ukuran responsif, dan alur dokumen normal.
Utilitas: `generateSeededNoise(seed)`, `generateTornPath(seed, width, height)`, `generateTornMaskSvg(seed)`, `createTornEdgeStyle(seed)` (di `src/lib/torn.ts`, dengan **unit test**: seed sama ⇒ path sama; seed beda ⇒ beda; tanpa `NaN`; path menutup; amplitudo ≤ tinggi). Gunakan `useMemo`. Kontur dari **noise matematis berlapis** (value/simplex noise terinterpolasi smooth + oktaf), bukan zig-zag hardcode; hindari lompatan acak titik-ke-titik.

---

## §7 STRUKTUR ONE-PAGE, NAVIGASI, DAFTAR ISI (INDEX)

**Urutan section:** OPENING → PERSONAL BRAND → WRITING PORTFOLIO → CONTENT MARKETING SPECIALIST → EXAMPLE STRATEGY → PROJECT CAMPUS → PODCAST → ARCHIVE → CONTACT.

**Daftar isi** (hanya daftar; klik = scroll halus ke section; tanpa ikon berlebih): `OPENING · PERSONAL BRAND · WRITING PORTFOLIO · CONTENT MARKETING SPECIALIST · EXAMPLE STRATEGY · PROJECT CAMPUS · PODCAST · ARCHIVE · CONTACT`.

- **`<TocButton>` "INDEX"**: tombol dulu di **pojok kanan atas layar**; saat diklik baru daftar tampil (panel/overlay kecil bergaya kertas).
- **`<TocInline>`**: daftar 1–2 kolom di footer Opening-terbuka (kanan bawah). Kolom 1 = OPENING, PERSONAL BRAND, WRITING PORTFOLIO, CONTENT MARKETING SPECIALIST, EXAMPLE STRATEGY; kolom 2 = PROJECT CAMPUS, PODCAST, ARCHIVE, CONTACT.
- **`<TocOverlay>`**: tombol kecil "INDEX". Posisi: Cassette kanan bawah; Content Marketing kanan atas; Video Reveal kanan bawah; Archive kanan atas; Contact kanan atas. Keputusan: section lain (Personal Brand, semua hero, Campus, Podcast) memakai tombol "INDEX" mengambang kanan atas; tombol mengambang ini **disembunyikan otomatis** saat section yang punya tombol sendiri sedang terlihat (hindari tombol ganda).
- Item aktif diberi penanda (titik/underline pink) via `IntersectionObserver`. Jika Opening belum dibuka, ToC belum aktif.
- Navigasi memakai `lenis.scrollTo(element)` — **bukan** anchor hash (hash dipakai khusus route overlay).

### 7.1 Hash routes (overlay)
| Hash | Halaman |
|---|---|
| `#/participation` | Participation (§10.1) |
| `#/achievement` | Achievement (§10.2) |
| `#/my-message` | My Message (§10.5) |
| `#/magazine-art` | Magazine Art (§10.3) |
| `#/photography` | Photography (§10.4) |
| `#/my-strategy` | My Strategy (§10.6) |
| `#/notes` | Notes (§10.7) |
| `#/strategy/{hard-selling\|entertainment\|education\|fun}` | Halaman informasi jenis konten (§14.3) |

Tombol Back browser menutup overlay; posisi scroll halaman tidak berubah. Buka via URL langsung boleh: jika Opening belum dibuka, tampilkan Opening dulu lalu buka overlay setelah OPEN.

### 7.2 Scroll-lock di Opening
Selama loker tertutup, halaman **tidak boleh di-scroll vertikal** (blok `wheel`, `touchmove` vertikal, Space/PageDown/PageUp/Home/End/Arrow, scroll anchor; `lenis.stop()`). Geser horizontal untuk memilih loker (HP) tetap boleh. Setelah OPEN dan transisi selesai, kunci dilepas (`lenis.start()`). `prefers-reduced-motion`: crossfade singkat.

### 7.3 Scroll global
Smooth hanya lewat Lenis; `html.lenis { scroll-behavior: auto }`. Area scroll bersarang (isi surat, daftar Archive, overlay) diberi `data-lenis-prevent`. `scroll-padding-top` disetel. **Scroll-snap tidak dipakai global.** `html, body { overflow-x: clip }` (kompatibel dengan `position: sticky`).

### 7.4 Preloader
Preloader ringan bertema (sticker/kertas) sebelum Opening: tunggu font kritis + gambar/elemen Opening. **Maks 2 detik**; jangan memblokir bila ada yang gagal.

### 7.5 Footer layar penuh
Teks kecil huruf besar DM Mono: `2026` (kiri), `Jassinta Roid Triniti` (tengah), elemen kanan sesuai section (`Creative Portfolio` / daftar isi / `INDEX`).

---

## §8 RESPONSIF SEMUA DEVICE, PERFORMA, AKSESIBILITAS, MEDIA HELPER

### 8.1 Breakpoint
| Kelas | Lebar | Catatan |
|---|---|---|
| XS | < 480px | 1 kolom, media dikecilkan, loker: 3 tengah tampil (geser untuk 1 & 5) |
| SM | 480–767px | 1–2 kolom |
| MD | 768–1023px | 2 kolom; **portrait & landscape ditangani terpisah** |
| LG | 1024–1439px | layout desktop penuh |
| XL | 1440–1919px | acuan desain (1920×1080) |
| 2XL | ≥ 1920px | konten diberi `max-width` & dipusatkan; media tidak membesar tak terbatas |

### 8.2 Aturan wajib
- Unit tinggi layar: **`svh`/`dvh`/`lvh`**, bukan `vh` (mis. `min-height: 100svh`). Berlaku juga untuk Opening.
- Safe area: `env(safe-area-inset-*)`; `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`.
- Tipografi fluid `clamp()`; `overflow-wrap: anywhere` untuk teks panjang (judul artikel).
- **Container query** (`container-type: inline-size`) untuk pintu loker, kartu, disc.
- `@media (hover: hover) and (pointer: fine)` untuk efek mouse; layar sentuh punya padanan tap; **area sentuh ≥ 44×44px**.
- `prefers-reduced-motion`: matikan parallax, tilt, glow berdenyut, auto-play berat; ganti fade; fungsi tetap penuh.
- Hitung ulang layout dinamis (Archive engine, flipbook, kolase, runway, fit loker) pada `resize`, `orientationchange`, `visualViewport`, fullscreen; `ResizeObserver` di-debounce ±100ms.
- Tidak ada horizontal scroll halaman; konten lebar scroll di dalam kontainernya.
- Gambar/video menjaga rasio asli. Body ≥ 14px di HP; caption/DM Mono ≥ 11px.

### 8.3 Strategi area berisiko
- **Loker:** pintu rasio **1:3** (1080×3240 unit). Desktop/landscape: 5 loker, tengah di tengah. Portrait (HP & tablet portrait): **3 loker tengah** tampil dahulu, geser horizontal (scroll-snap **horizontal saja**) ke loker 1 & 5, indikator titik 1–5. Scroll-lock vertikal tetap berlaku sebelum OPEN.
- **Kolase hero:** desktop tersebar di sekitar teks; tablet 4 media; HP baris kecil atas & bawah teks.
- **Runway:** HP = 1 kartu tengah + samping sebagian; swipe; 3D dikurangi.
- **Cassette/Disc:** HP = disc tengah besar, samping kecil; info 4 baris di atas disc.
- **Video reveal Strategy:** HP = carousel 1 video fokus, 3D disederhanakan.
- **Archive:** desktop 2 kolom (list + preview); HP = preview sticky di atas, list di bawah.
- **Flipbook:** desktop 2 halaman; HP portrait 1 halaman.
- **Kolase majalah:** HP 1 halaman + baki laci horizontal; handle skala/rotasi besar.
- **Contact:** 3 kolom → 1 kolom di HP.

### 8.4 Performa
- Lazy-load semua media di bawah layar pertama (`loading="lazy"`, `decoding="async"`, `preload="none"` + poster). Gambar WebP/AVIF bila ada (§19.4); `srcset/sizes`.
- Video hanya play saat terlihat; semua `muted playsinline loop` kecuali video perkenalan (`intro.mp4`). **Maks ±6 video berputar bersamaan** (hitung semua: hero, runway, latar ambient, Archive).
- **Mode hemat** (`navigator.hardwareConcurrency ≤ 4` atau `deviceMemory ≤ 4`, atau HP): kurangi blur/glow, jumlah salinan Archive, jumlah lapisan ekstrusi barang (**maks 3 vs 6–10**), dan sederhanakan detail 3D loker (LOD: tanpa ventilasi cekung detail, tanpa goresan).
- Hindari `blur()` besar di banyak elemen; `will-change` hanya pada elemen yang sedang beranimasi.
- `React.lazy` + `Suspense` untuk Flipbook, Magazine collage, Archive engine, semua overlay pages.
- Target Lighthouse Mobile: Performance ≥ 70, Accessibility ≥ 90, tanpa CLS besar.

### 8.5 Matriks QA device (screenshot wajib tiap fase)
`360×640`, `390×844`, `430×932`, `844×390` (HP landscape), `768×1024`, `1024×768`, `1280×720`, `1366×768`, `1440×900`, `1920×1080`, `2560×1440`. Skrip `npm run qa:shots` (Playwright) menyimpan ke `qa/shots/{phase}/{WxH}-{section}.png`. Setiap screenshot diperiksa: tidak ada horizontal scrollbar, tidak ada teks terpotong/menimpa, loker utuh sampai footer.

### 8.6 Algoritma fit loker (kunci konsistensi tertutup ↔ terbuka)
Sistem satuan: **`--px` = lebar pintu layar ÷ 1080**. Dimensi dalam unit:
- Pintu: **1080 × 3240**. Tiang divider: ≈ **86** (4 divider + 2 tiang luar = 6 tiang). Lebar kabinet 5 pintu ≈ `5×1080 + 6×86 = 5916` unit. Tinggi kabinet ≈ `3240 + 116 (tutup atas) + 113 (plinth) = 3469` unit. Footer = **66** unit (≈ 20px di acuan).
- Acuan 1920×1080: `--px ≈ 0.301` → pintu 325×975 px, kabinet ≈ 1781×1044 px, footer 20px.
- Fit: `availW = viewportW − 2·safe − margin`, `availH = visualViewportH(svh) − footerPx − safeTop − safeBottom − margin`.
  - `px5 = min(availW / 5916, availH / 3469)`; `px3 = min(availW / (3×1080 + 4×86 = 3584), availH / 3469)`.
  - Mode 5 loker bila `px5 × 1080 ≥ 150` (lebar pintu ≥ 150px) **dan** orientasi landscape/lebar; selain itu mode 3 loker (swipe) dengan `px = px3`.
  - **Tinggi kabinet + footer selalu muat utuh di layar.** Hanya sisi kiri/kanan boleh "terpotong" oleh area geser pada mode 3 loker.
  - Terapkan sebagai CSS variable `--px` pada root loker (hitung di JS dengan `ResizeObserver`/`visualViewport`, di-debounce), **bukan** dengan `vh`.
- Loker tertutup & terbuka **memakai komponen kabinet yang sama dan nilai `--px` yang sama** → posisi, ukuran, dan tampilan konsisten saat berganti.

### 8.7 Aksesibilitas
Semua tombol/barang interaktif dapat dioperasikan keyboard (Tab/Enter/Space), punya `aria-label`, `:focus-visible` outline pink 3px, overlay `role="dialog" aria-modal="true"`, gambar bermakna punya `alt` (English), video dekoratif `aria-hidden`. Barang dekoratif (polaroid, sepatu, tas, payung) `aria-hidden="true"`, tidak fokus.

### 8.8 Media helper (wajib dipakai SEMUA komponen)
Target video: H.264 MP4, maks 1080×1920 (disarankan 720×1280 untuk hero/reveal), ≤ 8–15 MB; `.webm` opsional dan poster `.jpg`.
```ts
// src/lib/media.ts
const BASE = (import.meta.env.VITE_MEDIA_BASE_URL ?? "").replace(/\/+$/, ""); // empty = same origin
const enc = (p: string) => p.replace(/^\/+/, "").split("/").map(encodeURIComponent).join("/");
export const mediaUrl = (path: string): string => `${BASE}/assets/${enc(path)}`;
```
Tambahkan `src/vite-env.d.ts` untuk tipe `VITE_MEDIA_BASE_URL`. Semua komponen memakai mis. `mediaUrl("video/Hasil Konten Fun Lassiewear.mp4")`, tidak menulis path langsung. CORS: elemen gambar `crossOrigin="anonymous"`; bila media di CDN, CDN wajib mengirim `Access-Control-Allow-Origin`. Bila "Save as image" gagal karena CORS, sembunyikan tombolnya.

---

## §9 OPENING (LOKER TERTUTUP → LOKER TERBUKA)

### 9.1 Ringkasan
Situs one-page yang dimulai dengan **Opening loker tertutup**; halaman **belum boleh di-scroll**. Begitu tombol **▶ OPEN** diklik, loker **berganti** menjadi loker terbuka (bukan animasi pintu berayun): warna kabinet berubah, interior berisi barang-barang, scroll vertikal dilepas dan pengunjung bisa scroll ke bawah. Bagian bawah layar tertutup = **bersih tanpa robekan**; bagian bawah Opening terbuka = **robekan kertas realistis** (seed 101).

### 9.2 Konstruksi 3D (berlaku untuk loker & barang)
Semua bagian loker (tiang penyangga, pintu, plat, ventilasi, handle, lubang kunci, rak, rel, rivet) harus punya **ketebalan dan volume bahan seperti aslinya**. Gunakan CSS 3D berlapis:
- Kontainer: `perspective: ~2200px` (dikalikan skala), `transform-style: preserve-3d`, kamera sedikit statis; **mouse-tilt halus** (±2–3°) hanya `@media (hover:hover) and (pointer:fine)` dan non-reduced-motion.
- Primitif `<Box3D w h d>`: 6 sisi (front/back/left/right/top/bottom) dengan gradient berbeda per sisi (pencahayaan dari kiri-atas) + highlight tepi 1px + bayangan kontak. `<Plane3D>` untuk panel tipis. `<Extrude layers>` menumpuk N salinan SVG di `translateZ` bertahap (N = 3 mode hemat, 6–10 mode penuh) untuk tebal barang.
- Pintu tertutup: badan pintu = Box dengan depan baja + tepi tebal; bingkai bagian dalam timbul; ventilasi = slit **cekung berongga** (inner shadow + sisi dalam gelap + highlight bibir bawah); plat nomor = Box chrome tipis dengan 2 baut kubah; handle = rumah benam + bar chrome timbul + lubang kunci bulat berbibir.
- Interior terbuka: **langit-langit**, **dinding kiri, kanan, belakang** (3 sisi), **rak** (permukaan atas, bibir depan, sisi bawah gelap), lantai. Tiap kompartemen = ruang Box terbalik dengan AO (ambient-occlusion) gradient di sudut. Rak punya ketebalan terlihat (bibir depan ±24 unit).
- Pencahayaan konsisten: sumber cahaya kiri-atas; bayangan jatuh ke kanan-bawah; barang menimbulkan **bayangan kontak** di rak.

### 9.3 STATE 1 — LOKER TERTUTUP
Wujud sama persis dengan referensi `loker_tertutup.png` (lihat §1.2 untuk ciri), dibuat ulang (bukan ditempel), minimal pintu **1080 × 3240** (1:3).

ASCII acuan (tampilan layar penuh, loker rata tengah):
```
_________________________________________________________________________________
| _____________   _____________   _____________   _____________   _____________  |  tombol [OPEN] bila diklik membuka
| |            |  |            |  |            |  |            |  |            | |  loker; suasana loker sekitar berubah
| |            |  |            |  |            |  |            |  |            | |
| |            |  |            |  |Content that|  |            |  |            | |
| |            |  |            |  |  is Felt,  |  |            |  |            | |
| |            |  |            |  |  Shared,   |  |            |  |            | |
| |            |  |            |  | Remembered |  |            |  |            | |
| |            |  |            |  |   [OPEN]   |  |            |  |            | |
| |____________|  |____________|  |____________|  |____________|  |____________| |
| 2026                        Jassinta Roid Triniti           Creative Portfolio |
|________________________________________________________________________________|
```
Tipografi di pintu 03 (Sentient, **block-highlight**, latar tiap kata berbeda warna; tiap baris sengaja berbeda jenis font):
```
Content that   → "Content" (Regular, bg --bubblegum) + "that" (Regular, bg --butter)
is Felt,       → "is" (Italic, bg --pastel-mint) + "Felt," (Italic, bg --lilac)
Shared,        → "Shared," (Bold, bg --baby-blue)
Remembered     → "Remembered" (Bold Italic, bg --peach-fizz)
```
Teks yang tampil: **"Content that is Felt, Shared, Remembered"** (4 baris seperti di atas).

Ukuran komponen loker tertutup (dalam `var(--px)`):
| Komponen | Ukuran / Nilai | Keterangan |
|---|---|---|
| Plat nomor pintu | 480 × 120 | Plat chrome dengan baut kubah |
| Font nomor pintu (01–05) | 76 (clamp 18–32px) | Bebas Neue tebal |
| Ventilasi udara (5 baris) | lebar 700, tinggi 28 | Slit berongga timbul (atas & bawah) |
| Handle loker (01, 02, 04, 05) | 210 × 530 | Chrome latch bar 78 × 310 |
| Kata "Content that" | font 84, padding 36 × 15 | Block highlight pink & kuning |
| Kata "is Felt," | font 84, padding 34 × 15 | Block highlight mint & lilac |
| Kata "Shared," | font 88, padding 48 × 15 | Block highlight baby blue |
| Kata "Remembered" | font 88, padding 48 × 15 | Block highlight peach |
| Tombol ▶ OPEN | font 70, min-h 175, padding 96 × 32 | Ikon play 54 · `<StickerButton>` pink glitter, sedikit miring |

Pintu 03 (tengah) berwarna pink (`--candy-pink` → gradient pink), tanpa handle (digantikan blok tipografi + tombol OPEN) sesuai referensi; plat nomor "03" berwarna `--raspberry`. Pintu lain: plat chrome, handle benam.

**Aturan layar loker tertutup:** tampil **utuh** (kabinet + footer `2026 / Jassinta Roid Triniti / Creative Portfolio`) di HP, tablet, PC, dan landscape lain tanpa bagian terpotong/tertutup (hitung dengan §8.6); ukuran & tampilan **identik** dengan loker terbuka. Di HP tampil 3 loker tengah dulu (2-3-4), bisa digeser. **Bagian bawah layar penuh bersih tanpa robekan kertas.** Tidak ada scroll vertikal sebelum OPEN.

### 9.4 TRANSISI OPEN (≈ 700–900ms)
Bukan pintu berayun. Urutan: (1) tombol OPEN "pop" + kilau; (2) kilau/glow `--hot-pink` menyapu dari pintu 03 ke luar; (3) kabinet **berganti** dari baja `--steel-lilac` ke pink + interior berry (crossfade berlapis, sedikit scale 1.0→1.015→1.0, partikel sparkle sticker kecil); (4) pintu 02 & 04 **hilang** (terbuka/menghilang), pintu 01, 03, 05 **tetap tertutup** tetapi berganti menjadi **kartu** (§9.6); (5) latar halaman beralih ke pink muda; (6) robekan kertas muncul di dasar (fade-in 200ms); (7) `lenis.start()`; ToC aktif. `prefers-reduced-motion`: crossfade 250ms saja. Setelah terbuka, halaman boleh di-scroll; **tidak boleh kembali ke state tertutup** kecuali reload.

### 9.5 STATE 2 — LOKER TERBUKA
Wujud sama persis dengan `loker_terbuka.png`: bentuk, warna, detail, kedalaman 3D; ukuran & posisi kabinet sama dengan state tertutup. ASCII acuan:
```
_________________________________________________________________________________
| _____________   _____________   _____________   _____________   _____________  |
| |            |  | Certificate|  |            |  |Polaroids   |  |            | |
| | __________ |  |            |  | __________ |  |            |  | __________ | |
| | | I Can   ||  |      Trophy|  | |         ||  |    Envelope|  | |Platform || |
| | |Help you ||  |____________|  | |Intro    ||  |____________|  | |I Am     || |
| | | With:   ||  |            |  | |Video    ||  |       Notes|  | |Proficient| |
| | |-        ||  |    Magazine|  | |[sound & ||  |Books       |  | |in:      || |
| | |-        ||  |    stack   |  | | pause]  ||  |____________|  | |-        || |
| | |_________||  |Camera______|  | |_________||  |      Umbrella|  | |_________|| |
| |____________|  |Shoes_______|  |____________|  |Bag__________|  |____________| |
| 2026                        Jassinta Roid Triniti           Creative Portfolio |
|________________________________________________________________________________|
```
Tinggi footer loker terbuka: **20 px** (hanya baris tahun & nama; dengan kanan: daftar isi `<TocInline>`).

**Dimensi fisik** (sama dengan state tertutup): pintu ~325 px lebar × ~975 px tinggi (rasio 1:3); kabinet ~1.781 × 1.044 px (≈ 97% tinggi layar acuan); `--px` ≈ 0,301.

#### 9.5.1 Tata letak per loker
- **Loker 1** (pintu + kartu): "I Can Help You With:".
- **Loker 2** (terbuka), atas → bawah:
  - **Rak 1 (atas):** **Certificate** digantung di **dinding belakang** rak (tali emas, mengisi ±89% dinding belakang) → **Trophy** di kanan, di depan certificate, duduk rapat menempel permukaan rak 1.
  - **Rak 2:** **Magazine stack** (majalah berdiri menghadap depan, cover terlihat, **tidak melayang**, menempel di permukaan rak 2) → **Camera** di depan tumpukan majalah, duduk di permukaan rak 2 (kanan).
  - **Lantai / ruang bawah:** **Shoes** (kumpulan sepatu, **pink**, mengisi ±91% lantai).
- **Loker 3** (pintu + kartu video perkenalan diri, suara & tombol pause).
- **Loker 4** (terbuka):
  - **Rak 1 (atas):** **Polaroids** (3 foto digantung tali rami yang memanjang dari dinding kanan ke kiri rak teratas, **tidak terputus dari rak**) → **Envelope** (surat) di bawah foto, menempel langsung di permukaan rak 1 (tidak melayang).
  - **Rak 2:** **Books** (kumpulan buku, memenuhi rak 2, menempel 100% rata ke dinding sisi kiri rak, 0 ruang kosong) → **Notes** di kanan, di depan buku, berdiri tegak menghadap depan.
  - **Lantai:** **Bag** (tas hobo) di pojok kiri bawah; **Umbrella** (payung) di kanan bawah, miring 7,5° ke kanan, bersandar pada dinding, terlihat 100% utuh.
- **Loker 5** (pintu + kartu): "Platform I Am Proficient in:".

#### 9.5.2 Kartu pintu (Loker 01, 03, 05)
Kartu **menempel penuh** pada pintu (tidak ada bagian keluar dari pintu). Teks panjang di-wrap ke bawah. Kartu bertekstur kertas (grain + vignette), pin di tengah atas.
| Komponen | Ukuran / Nilai | Keterangan |
|---|---|---|
| Pin / paku payung | diameter 80 | Tengah atas kartu (pink, merah, lavender) |
| Tag atas (SERVICES / HELLO / STACK) | font 70, padding 26–30 × 8 | Bersih di bawah pin |
| Sub-tag (✧ CAPABILITIES / EXPERTISE) | font 70 | |
| Heading utama kartu | font 78 | Sentient (serif) |
| Pill bullet (Loker 01 & 05) | font 70, padding 24 × 13 | Lingkaran centang 74 × 74 |
| Placeholder video (Loker 03) | 930 × 1.653 | Rasio portrait 9:16 |
| Tombol play overlay video | diameter 146 × 146 | Ikon segitiga 64 |
| Tombol pause & mute video | diameter 76 × 76 | Ikon 36 |
| Quote footer video | font 70 | Serif italic tebal |

**Loker 1 — kartu (pin `--hot-pink`)**: tag `SERVICES` · sub-tag `✧ CAPABILITIES` · heading **"I Can Help You With:"** · pill: `Social Media Manager`, `Social Media Strategy`, `SEO Writing`, `Video Content`, `Graphic Designer`, `Editorial Planning`, `Copywriting`, lalu `etc.` (italic pink kecil di bawah). Hiasan bintang kilau lavender kecil.
**Loker 3 — kartu (pin `--cherry-red`)**: tag `HELLO, I AM JASSINTA` · sub-tag `✧ SELF INTRODUCTION` · heading **"Behind the Creative Lens"** · pemutar video `intro.mp4` (1080×1920, 9:16), tombol **play besar**, tombol **pause** dan **mute/unmute** (suara aktif atas interaksi pengguna; default muted; `playsInline`; tidak autoplay bersuara; `preload="none"` + poster) · quote footer: *"Telling stories that resonate & stay."*
**Loker 5 — kartu (pin `--wisteria`, kartu bernuansa lavender)**: tag `STACK & TOOLS` · sub-tag `▭ EXPERTISE` · heading **"Platform I Am Proficient in:"** · pill: `Instagram`, `TikTok`, `Facebook`, `Google Business Profile`, `Canva`, `Capcut`, `Adobe Suites` · footer kecil `CERTIFIED & EXPERIENCED`.
Teks yang terlalu panjang (mis. "Google Business Profile") di-wrap ke baris berikut, tidak keluar kartu.

#### 9.5.3 Barang 3D (ukuran dalam `var(--px)`)
| Barang | Lebar × Tinggi | Posisi & status penataan |
|---|---|---|
| Certificate (L2, Rak 1) | 960 × 700 | Mengisi 89% dinding belakang rak atas, tali gantung emas |
| Trophy (L2, Rak 1 kanan) | 520 × 750 | Di depan certificate, duduk rapat menempel permukaan rak 1 |
| Magazine stack "VOGUE" (L2, Rak 2) | 740 × 960 | Berdiri hadap depan, memenuhi rak, menempel permukaan rak 2 |
| Camera "Pastelca" (L2, Rak 2 kanan) | 560 × 365 | Di depan majalah, duduk di permukaan rak 2 |
| Shoes "Retro Runners" (L2, lantai dasar) | 980 × 440 | Mengisi 91% lantai dasar loker (warna **pink**) |
| Polaroids ×3 (L4, Rak 1 atas) | 3 frame, masing-masing 280 × 330 | Tergantung tali rami membentang 100% dinding kiri ke kanan |
| Envelope (L4, Rak 1 bawah) | 840 × 530 | Di bawah foto, menempel langsung di permukaan rak 1 |
| Books (L4, Rak 2) | 1.050 × 780 | Menempel 100% rata ke dinding sisi kiri rak (0 ruang kosong) |
| Notes (L4, Rak 2 kanan) | 520 × 760 | Di depan buku, berdiri tegak di rak 2 |
| Bag "Hobo" (L4, lantai kiri bawah) | 800 × 700 | Duduk rapat di pojok kiri bawah lantai |
| Umbrella polkadot (L4, lantai kanan) | 210 × 880 | Miring 7,5° ke kanan, bersandar dinding, 100% utuh |

**Aturan penataan (wajib, diuji lewat `check` visual):** barang **tidak tertimpa, tertutup, atau terpotong** barang lain atau dinding; **tidak melayang** — alas barang tepat menyentuh permukaan rak (`translateZ` alas = permukaan rak, dengan bayangan kontak); posisi sesuai ASCII. Jika ukuran di tabel membuat tabrakan pada rasio tertentu, **patuhi "tidak tumpang tindih & tidak melayang" lebih tinggi daripada angka piksel** dan catat penyesuaian di `docs/DECISIONS.md`.

#### 9.5.4 Spesifikasi desain tiap barang (dibuat ulang SVG + CSS 3D, volume nyata)
- **Certificate:** bingkai emas **ornamen** tebal (relief daun/gulir berlapis: 3 lapis cincin gradient `--gold-1→--gold-4` + highlight + bayangan dalam), kertas `--vanilla` bertekstur, tulisan **"CERTIFICATE"** emas serif (Bodoni Moda/Sentient), subjudul kecil *"of Official Participation"* dan nama *"Jassinta Roid Triniti"* (kaligrafi kecil), ornamen sudut & garis tipis, **segel emas bergerigi** (rosette) bervolume dengan perisai + kompas. Tebal bingkai ±24 unit (sisi kanan/bawah terlihat gelap). Tali emas dari dua paku ke atas.
- **Trophy:** emas mengilap dua gagang melengkung bergulung, badan cangkir licin dengan pantulan vertikal, batang ramping + cincin, **dasar bertingkat 2 tingkat** bervolume (revolve palsu: tumpukan elips bergradient horizontal). Specular kuat kiri.
- **Magazine stack:** beberapa majalah (±4–5) bertumpuk **berdiri** berdekatan; cover depan = `magazine.png` ulang: latar pink `--rose-quartz/--bubblegum` pucat (pink dusty `#EBA6C0`), **VOGUE** (Bodoni Moda 900, putih, **muat pas lebar cover, tidak terpotong**), "MAGAZINE" ber-spasi lebar, "Better Things Ahead ♡" (Pinyon Script putih), teks kecil kiri-atas `LIFESTYLE / BEAUTY / FASHION / SELF LOVE`, kanan-atas `VOL. 12 / APR 2025`, kiri-bawah `SMALL STEPS / MAKE BIG / CHANGES`, barcode kanan bawah, punggung (spine) lebih gelap dengan ketebalan halaman terlihat di sisi.
- **Camera (Pastelca):** tiru `camera.png`: badan mint & pita pink bertekstur kulit, top-plate pink dengan dial bergerigi lavender/baby-blue, jendela viewfinder & rangefinder, lensa **lavender** berlapis cincin (baby-blue, krom, lensa kaca dengan pantulan), teks `PASTELCA 35mm f/2.8`, `35mm`, `35mm f/2.8` melingkar, tuas kecil, lug tali krom. Volume: lensa menonjol (silinder `translateZ`).
- **Shoes (pink):** bentuk & detail seperti `shoes.png`: sepasang sepatu 3/4 depan; upper `--candy-pink→--rose-quartz` (nilon + overlay suede bertekstur), **3 garis diagonal** lebih tua (`--raspberry`/`--berry`), midsole krem `--vanilla` **bergerigi** dengan garis hitam tipis, tali krem tebal, lidah tinggi dengan label **kosong** (tanpa merek).
- **Polaroids:** 3 polaroid (bingkai putih tebal + bayangan) tergantung tali rami `--twine` (tali melengkung natural, **ujung tali masuk ke dinding rak kiri & kanan**, tidak terputus) dengan 3 **jepit kayu**; "foto" = ilustrasi gradient pastel vektor (langit-gunung / danau / matahari terbenam bergaya flat) tanpa raster; caption Permanent Marker: `Moments`, `Stories`, `Memories`; rotasi kecil berbeda.
- **Envelope:** amplop `--lavender` tampak belakang, flap segitiga ujung membulat, lipatan halus (inner shadow), **segel hati** `--hot-pink` (lilin) di titik flap + stiker kecil; tebal kertas terlihat di tepi.
- **Books:** persis `books.png`: **6 buku berdiri** (tinggi berbeda, terakota/pink muda/sage/lavender/mint/baby-blue) bersandar ke dinding kiri + **tumpukan 10 buku tidur** di kanannya (punggung menghadap depan, warna sesuai urutan referensi dari atas: dusty-pink, lavender, sage, baby-blue, krem, salmon, butter, sage, biru muda, dusty-pink). **Tanpa tulisan apa pun**; punggung polos dengan garis tipis/embos halus & tepi halaman krem.
- **Notes:** buku catatan spiral logam kiri, sampul `--rose-quartz` bertekstur kulit, **NOTES** (Bebas Neue, `--hot-pink`) **pas di tengah, tidak terpotong, tidak enter karena kebesaran**; ketebalan halaman terlihat; (opsional) tab sticky kecil di sisi kanan.
- **Bag:** hobo kulit **pink** (`--candy-pink`/`--leather-pink-hi`) dengan satu tali melengkung, flap + gesper krom, 2 saku kancing, resleting + zipper-pull, jahitan; **tanpa merek**.
- **Umbrella:** payung tertutup putih bertitik hitam, tali pengikat hitam berkancing, ujung logam, kerah krom, gagang kayu J `--walnut` berpantulan; miring **7,5°** ke kanan, bersandar pada dinding kanan.

#### 9.5.5 Interaksi barang (tombol bentuk barang)
Barang interaktif adalah **tombol yang mengikuti bentuk & ukuran barang** (SVG hit-area; bukan kotak asal). Hover (desktop) → `<HoverLabel>` muncul (tidak menutupi barang, tidak terpotong, tidak tertimpa, posisi sesuai letak barang). Sentuh: tap pertama = label + caption kecil tetap di bawah barang, tap kedua = buka. Tab fokus = label tampil.
| Barang | Label | Hash |
|---|---|---|
| Certificate | `Participation` | `#/participation` |
| Trophy | `Achievement` | `#/achievement` |
| Magazine stack | `Magazine Art` | `#/magazine-art` |
| Camera | `Photography` | `#/photography` |
| Envelope | `My Message` | `#/my-message` |
| Books | `My Strategy` | `#/my-strategy` |
| Notes | `Notes` | `#/notes` |
| Polaroids, Shoes, Bag, Umbrella | — (dekoratif) | — |

---

## §10 HALAMAN OVERLAY (dibuka dari barang)

Semua memakai `<Overlay>` (§5), animasi "sticker pop", tombol tutup jelas, Back browser menutup, `data-lenis-prevent` pada area scroll.

### 10.1 Participation — `#/participation`
```
|                              Participation                                  |
|  ______________________________________________________________________   |
|  | foto sertifikat dll dalam BINGKAI PUTIH bershadow, di atas KERTAS     |   |
|  | KEKUNINGAN (--aged-paper) dengan PIN/paku payung di ujungnya          | ->|  tombol geser + fitur drag/swipe
|  |______________________________________________________________________|   |
|                         Judul Partisipasi (caption aktif)                   |
```
Carousel (tombol panah + drag/swipe + keyboard ←→), foto dalam `<PhotoFrame>` (tidak dipotong), kertas aged-paper bergrain + `<Pushpin>`; judul aktif di bawah. Data (urutan):
| # | File | Caption (English) | Tahun | Kategori | Ukuran |
|---|---|---|---|---|---|
| 1 | `Partisipasi Sebagai Peserta Magang Indonesia Mengudara.jpg` | Participant, Internship at Indonesia Mengudara | 2025 | Participation | 1949×1276 |
| 2 | `Partisipasi Sebagai Peserta Magang Kementerian Agama RI.jpg` | Participant, Internship at the Ministry of Religious Affairs of the Republic of Indonesia | 2023–2024 | Participation | 1500×1097 |
| 3 | `Partisipasi Sebagai Peserta Pelatihan Bidang Menulis Berita Siber.jpg` | Participant, Cyber News Writing Training | 2024 | Participation | 1500×1092 |
| 4 | `Partisipasi Sebagai Peserta Y20 Indonesia.jpg` | Participant, Y20 Indonesia | 2022 | Participation | 1003×1500 |
| 5 | `Partisipasi Sebagai Staff bendahara Umum Comic Club.jpg` | General Treasurer Staff, Comic Club | 2021–2022 | Participation | 1512×1115 |

### 10.2 Achievement — `#/achievement`
Sama dengan Participation, judul "Achievement", caption "Judul Penghargaan" → caption aktif. Data:
| # | File | Caption (English) | Tahun | Ukuran |
|---|---|---|---|---|
| 1 | `Penghargaan ISTC Indonesia.jpg` | ISTC Indonesia Award | 2018 | 1500×1105 |
| 2 | `Penghargaan Produser Kartini Radio Terbaik.jpg` | Best Producer, Kartini Radio | 2025 | 717×892 |
| 3 | `Penghargaan Tim Siar Kartini Terbaik.jpg` | Best Broadcast Team, Kartini | 2025 | 1949×1276 |

### 10.3 Magazine Art — `#/magazine-art`
Judul halaman: **"Let's put together a fashion magazine!"** Konsep kolase seperti "Elle's Collage Creator": pengguna menyusun halaman majalah; **tiap elemen bisa digerakkan bebas tanpa memengaruhi web atau elemen lain**.
```
|                  Let's put together a fashion magazine!                       |
|                  ______________________________________                       |
|                  |   buku majalah (4 lembar kosong,   |  _________________   |
|                  |   bisa dibolak-balik seperti       |  | baki: foto,    |   |
|                  |   mock-up buku)                    |  | tulisan, elemen|   |
|                  |____________________________________|  |________________|   |
```
- **Buku:** 4 lembar kosong (8 sisi), dibolak-balik (flip 3D); desktop 2 halaman, HP 1 halaman + baki laci horizontal.
- **Foto (17):** `Vintage Cindy 1.jpg … Vintage Cindy 17.jpg` dengan **bingkai putih**; tidak dipotong (rasio asli). Tarik dari baki → letakkan di halaman; setiap item: **drag, skala, rotasi** (handle besar di sentuh), hapus, bring-to-front; `pointer events` (mouse + sentuh), batas halaman (tidak keluar buku), tidak memengaruhi scroll halaman saat drag.
- **Teks bisa dipindah/diubah warna:** `VOGUE` (Bodoni Moda 900), `Fashion` (Pinyon Script), `OOTD` (Bebas Neue); pemilih warna dari palet (§2).
- **Elemen desain:** **pita (ribbon)**, **kamera**, dan **10 elemen elegan lain** (vektor SVG buatan sendiri): sparkle star, heart, lipstick, perfume bottle, high heel, sunglasses, pearl strand, rose, butterfly, washi tape.
- Status kolase disimpan di memori (opsional `localStorage` dengan try/catch). Tombol **Save as image** (`html-to-image`; sembunyikan bila gagal), **Reset**, **Undo**.
- Aksesibilitas: elemen bisa dipilih dengan keyboard (Tab), digeser dengan panah, diskala `+/-`, dirotasi `[` `]`.

### 10.4 Photography — `#/photography`
Judul "Photography". Kotak berisi foto berderet menyamping (`Vintage Cindy 1 … 17`), bingkai putih bershadow, di atas kertas kekuningan dengan pin; carousel (tombol + swipe). Footer kiri-bawah **Credit**:
```
Credit
Model: Chindy
Photograph: Jassinta Roid Triniti
Editing: Jassinta Roid Triniti
```
Ukuran asli foto (tabel §19): Vintage Cindy 1=1080×1430, 2=1080×1440, 3=1080×1440, 4=1080×1439, 5=1080×1438, 6–10=1080×1440, 11=1080×1432, 12=1080×1449, 13=1080×1440, 14=1080×1447, 15=1080×1440, 16=1080×1440, 17=1080×1431.

### 10.5 My Message — `#/my-message`
Kertas **putih bergaris biru seperti buku tulis** (`repeating-linear-gradient` `--notebook-blue` + garis margin pink) sebagai latar tulisan; font handwriting (**Caveat**) tetap terbaca jelas; area scroll sendiri (`data-lenis-prevent`). Teks (English; tampilkan persis, pertahankan jeda baris & penekanan):
```
To Those Who Believe in the Power of a Story

Thank you for stopping by.

In a world that moves relentlessly fast, attention has become one of the most valuable things we have.

A single second can determine whether someone stops, looks, remembers—or simply scrolls away.

That is where I believe creativity matters.

I work at the intersection of strategy, storytelling, and visual expression as a Social Media Specialist, Content Creator, Videographer, and Graphic Designer.

I believe great content is not simply about looking beautiful.

It needs a reason to exist.
Something worth saying.
Someone worth speaking to.
And, most importantly, something worth leaving behind.

Because behind every brand, there are people.

Behind every business, there is a journey.
Behind every product, there is a story.
And behind every screen, there is someone looking for something to feel, discover, or remember.

That is why I never see content as merely *content*.

I see it as part of an experience.

I look for the idea behind the brief.
The story behind the numbers.
The meaning behind the visual.
And the possibility within something that may seem simple at first glance.

"If you come with a brand, I want to help give it a voice."

"If you come with an idea, I want to help give it form."

"If you come with a story, I want to help make it worth hearing."

I don't know what our project might become.

Perhaps a campaign.
Perhaps a visual identity.
Perhaps one film.
Perhaps dozens of pieces of content.
Or perhaps something we haven't imagined yet.

But I believe the most meaningful work often begins with something simple:

"Two people, two minds, or two teams who share the desire to create something that matters."

So, if you're looking for someone to simply execute a brief, perhaps I'm not the person you're looking for.

But if you're looking for someone who wants to **understand, think, create, and grow** alongside an idea,

"I would love to hear your story."

# Let's create something worth remembering

Jassinta Roid Triniti
```
Gaya: baris kutipan dibuat italic/lebih besar; judul "Let's create something worth remembering" besar (Caveat tebal, `--hot-pink`/`--raspberry`); tanda tangan "Jassinta Roid Triniti" gaya tulisan tangan.

### 10.6 My Strategy — `#/my-strategy`
Judul **"My Strategy"**. Intro: *"My strategy for managing social media content usually unfolds in several stages."* Buat **visual alur yang menarik, lengkap, dan mudah dipahami** (kertas/notebook bertema, jalur berkelok bergaya sticker + konektor yang "tergambar" saat scroll; di HP jalur vertikal). Urutan **7 tahap** (+ loop umpan balik):
1. **Define the Target Market** — *Know exactly who we're talking to.* (ikon target/orang)
2. **Define the Style Guide** — *Serif & sans-serif fonts, tone of voice, and HEX colors for design and typography.* (mini swatch palet + contoh huruf Aa)
3. **Define the Content Plan** — *Content pillars, references, scripts, and posting schedule.* (mini kalender + kartu pillar)
4. **Shoot & Record by Script** — *Video recording and photo shoots follow the script.* (ikon kamera/clapper)
5. **Edit by Style Guide** — *Every edit stays true to the brand's visual rules.* (ikon timeline/gunting)
6. **Post on Schedule** — *Publish at the planned posting times.* (ikon jam/kalender)
7. **Analyze Engagement, Awareness & Conversion** — *Measure what worked, then feed insights back into the next plan.* (ikon grafik) → panah melengkung kembali ke tahap 3 ("Repeat & improve").
Catatan: deskripsi pendek di atas **ditulis oleh AI sebagai pengembangan** dari alurmu; tahapan & urutan tidak diubah. Boleh ditambahkan "tip" 1 baris tiap tahap, tetap English.

### 10.7 Notes — `#/notes`
Muncul **buku catatan** (kertas bergaris) dengan catatan:
```
3 Keys to Marketing & Content Success
- Awareness
- Engagement
- Conversion
```
Tampilan: tiga lembar sticky-note/pill berwarna berbeda dengan ikon kecil, tulisan tangan; tidak ada teks tambahan lain.

---

## §11 PERSONAL BRAND

**Kanvas `--pure-white` (#FFFFFF) wajib.** Komponen modular: `<PersonalBrand />` (induk) › `<Hero />` (giant typography + foto cut-out) › `<DocumentCanvas />` (kolase + parallax) › `<Document />` (lembar kertas interaktif) › `<Logo />` (penampil logo, mendukung file lokal) + `data.ts`.

### 11.1 Giant typography
Rata kiri di sisi kiri layar, **sans ultra-bold berukuran raksasa** (Anton; fallback Archivo Black/Impact), menyatu dengan artwork halaman, huruf kapital:
```
WHICH
COMPANIES
HAVE I
WORKED
FOR?
```
Ukuran fluid besar (mis. `clamp(3.4rem, 2rem + 9vw, 11rem)`, `line-height: .9`), warna `--ink`; boleh satu kata aksen `--hot-pink` bila serasi.

### 11.2 Foto cut-out
`foto_jassinta_duduk.png` (408×612, PNG transparan) diletakkan di **sisi kanan** tulisan. **Placeholder** (bila file belum ada/gagal dimuat): **transparan, tanpa stroke, tanpa tulisan** (tidak menampilkan apa pun, ruang tetap dijaga). Foto tidak dipotong; tinggi menyesuaikan viewport; kaki foto "duduk" di atas garis dasar kolase atau sedikit menimpa lembar dokumen terdepan (z-index terkontrol, tidak menutupi logo/teks dokumen).

### 11.3 Konsep lembar dokumen fisik (10 Document Sheets)
**Bukan card-grid, bukan carousel.** Ke-10 logo ditempatkan di atas **lembar kertas putih fisik** (placeholder kertas mengikuti rasio logo **1980 × 1980**; kertas boleh **ditinggikan** — mis. rasio ±1 : 1,25 — agar logo/tulisan asal bentuk logo menonjol dan ada ruang detail). Tiap lembar punya karakter unik:
- Background putih dengan **garis batas tipis hitam** (`border: 1px solid #000`).
- **Efek bayangan kertas fisik bertingkat** (paper drop shadow berlapis) + **tekstur kertas halus**.
- **Rotasi sudut dinamis**: `-3°, 4°, -5°, 2°, 3°, -2°, 5°, -4°, 1°, -3°`.
- **Detail kecil dokumen:** penomoran `01 / 10` … `10 / 10`, **tag kategori** (mis. `EDITORIAL`, `PRODUCTION`, `CAMPAIGN`; di data = field `tag`), **label referensi arsip** (`REF-ARC-001` …), dan **aksen staple merah** (`--staple-red`) di sudut kertas.
- Logo dibaca langsung dari `logo_1.png … logo_10.png`; bila gagal, tampil **fallback logo vektor minimalis presisi** (monogram dalam bentuk geometris dari inisial perusahaan).

Data (salin persis; `x`,`y` dalam % kanvas, `depth` = bobot parallax):
```ts
// src/components/sections/personal-brand/data.ts
export type DocItem = { id: number; file: string; company: string; tag: string; ref: string; rot: number; x: number; y: number; depth: number };
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
```
Letak kolase: **di bawah** tulisan "WHICH COMPANIES HAVE I WORKED FOR?" (kanvas lebih tinggi dari layar; bagian kolase di bawah hero). Pastikan **lembar tidak saling menutupi logo** (cek bounding box; jika koordinat data menimbulkan tumpang tindih logo, geser `x/y` sedikit dengan aturan: jarak min 2% & catat).

### 11.4 Interaksi & parallax
- **Mouse parallax (desktop saja, `hover:hover & pointer:fine`):** dokumen lapisan depan (depth tinggi) bergerak lebih dinamis; dokumen belakang dan foto Jassinta bergerak dengan kedalaman medium; **giant typography bergerak perlahan** di latar (ilusi ruang meja kerja editorial 3D). Gerak diperhalus (lerp), maks ±24px.
- **Hover micro-interaction:** lembar terangkat halus (`translateY(-8px)`), bayangan kertas makin dalam, sudut rotasi bergeser sedikit; nomor dokumen dan tag aksen merah **menyala**.
- **Mobile:** kolase otomatis ditata rapi dalam **flow 2 kolom** tanpa horizontal scrollbar (rotasi tetap, dikurangi amplitudo); parallax kursor **dinonaktifkan** di perangkat sentuh.
- ToC: tombol "INDEX" mengambang kanan atas.

---

## §12 WRITING PORTFOLIO

### 12.1 Hero (pola `<SectionHero>`; ikuti layout `Aset_1.png`)
- **Headline** (rata tengah, di atas narasi, 66px/fluid, **Sentient**): `Storytelling` = **Bold Italic**; `Through Screens` = **Bold**. Responsif ukuran & jenis.
- **Narasi** (rata tengah, jarak `--headline-narration-gap` = 1.5rem di bawah headline; **Poppins italic**, maks 24,9px):
  *"We used to flip through newspapers and magazines; now, we scroll through mobile screens. Over the past five years, I have studied this transformation and become an online news writer, adapting to the ever-changing landscape of digital media."*
- **Image reveal ×6** (ukuran sumber 520×520, **diperkecil** supaya tidak mengganggu teks; rasio 1:1 dijaga) disebar di sekeliling teks seperti `Aset_1.png` (miring, sebagian menyentuh/keluar tepi layar, parallax halus; masing-masing **reveal dengan mask wipe + sedikit scale** saat masuk viewport; hover = naik & rotasi sedikit):
  1. `IMN_1.png` 2. `IMN_2.png` 3. `innalar_1.png` 4. `innalar_2.png` 5. `Ikapunija_1.png` 6. `Ikapunija_2.png`
  - Ukuran media: `clamp(96px, 14vw, 210px)`; desktop = 6 tersebar; tablet = 4; HP = baris kecil di atas & bawah teks. Teks tidak boleh tertutup (z-index teks di atas; area teks diberi "exclusion zone").

### 12.2 Disc interactive (3D) — `Aset_3.png`
Bukan kaset pita: **piringan bulat (disc) 3D**. ASCII acuan:
```
| Judul Karya                                          ____________________ |
| Author        Jassinta Roid Triniti                  | info terus update |
| Date          dd/mm/yyyy                           <-| mengikuti disc    |
| Media         Nama Media                             | di tengah layar   |
|                                                                           |
|     [deretan disc 3D miring, tampak seperti Aset_3.png; disc tengah       |
|      terbesar; bisa diklik → link berita]                                 |
|                              JUDUL KARYA (mengikuti disc tengah)          |
|_ bawah section: ROBEKAN KERTAS (seed 202) menyatu dengan latar ____________|
```
**Disc:** lingkaran dengan **gambar karya (`IMN_*`, `innalar_*`, `Ikapunija_*`) di-clip-mask melingkar** (`clip-path: circle()` / mask radial), cincin luar chrome (`--disc-rim`) bertebal, **lubang tengah** dengan cincin hub transparan-abu (`--disc-hub`) dan tepi bertebal, alur konsentris halus, kilau diagonal (gradient putar/conic), bayangan di lantai. Tiap disc dirender miring 3D (`rotateY/rotateZ` + `perspective`), **disc tengah terbesar & tajam; makin ke samping makin kecil, redup, dan blur ringan**; sebagian disc di tepi layar terpotong sebagai kedalaman (diizinkan; ini dekor).
**Informasi (kiri atas, mengikuti `Aset_3.png`):** baris label kecil (kiri) – nilai (kanan, rata kanan), dipisah garis tipis: `TITLE` (judul besar serif), `AUTHOR`, `DATE`, `MEDIA`. **Judul besar di bawah** (huruf kapital Sentient) mengikuti disc tengah, dengan transisi geser/fade **tidak bergetar**.
**Interaksi:** scroll vertikal pada section yang **di-pin (sticky)** menggeser disc satu per satu; drag/swipe horizontal; panah keyboard ←→; tombol panah kecil. Klik **disc tengah** = buka link berita di tab baru (`target="_blank" rel="noopener noreferrer"`); klik disc samping = jadikan tengah; bila tidak ada link → tampil `<HoverLabel>` "Not published online" dan disc tidak berupa tautan. Auto-pinned durasi ≈ `11 × 70svh` lalu lepas. `prefers-reduced-motion`: tanpa rotasi/tilt, hanya fade & geser.
**Tombol INDEX:** kanan bawah. **Dasar section:** `TornEdge` seed 202.

### 12.3 Data karya (urutan disc; salin persis)
```ts
// src/data/cassette.ts
export const works = [
 { n:1,  title:"Inilah Sosok Jan Miskovic, Pemegang Rekor Mata Minus Tertinggi di Dunia yang Mengejutkan", author:"Jassinta Roid Triniti", date:"20/01/2025", media:"Independen Media", image:"IMN_1.png", url:"https://www.independenmedia.id/sosok/27614379267/inilah-sosok-jan-miskovic-pemegang-rekor-mata-minus-tertinggi-di-dunia-yang-mengejutkan?page=2" },
 { n:2,  title:"Carmen H2H Lolos Audisi di SM Entertainment Tanpa Sepengetahuan Orang Tuanya, Ini Cerita Lengkapnya", author:"Jassinta Roid Triniti", date:"20/04/2025", media:"Independen Media", image:"IMN_2.png", url:"https://www.independenmedia.id/various/27614883156/carmen-h2h-lolos-audisi-di-sm-entertainment-tanpa-sepengetahuan-orang-tuanya-ini-cerita-lengkapnya?page=3" },
 { n:3,  title:"Keren! Komik Digital Indonesia 'Good Bad Fortune' Laris Manis di Korea, Ini Sinopsisnya", author:"Jassinta Roid Triniti", date:"11/01/2025", media:"Independen Media", image:"IMN_3.png", url:"https://www.independenmedia.id/various/27614320657/keren-komik-digital-indonesia-good-bad-fortune-laris-manis-di-korea-ini-sinopsisnya" },
 { n:4,  title:"Kuwait Kuasai Posisi! Inilah Mata Uang Tertinggi di Dunia Saat Ini", author:"Jassinta Roid Triniti", date:"01/02/2025", media:"Independen Media", image:"IMN_4.png", url:"https://www.independenmedia.id/ekbis/27614462608/kuwait-kuasai-posisi-inilah-mata-uang-tertinggi-di-dunia-saat-ini?page=2" },
 { n:5,  title:"Uang Rusak Jangan Dibuang! 2 Kondisi Cacat Ini Tetap Bisa Jadi Cuan Mahal Jika Dibeli Kolektor", author:"Jassinta Roid Triniti", date:"19/12/2024", media:"innalar.com", image:"innalar_1.png", url:"https://www.innalar.com/uang-rusak-jangan-dibuang-2-kondisi-cacat-ini-tetap-bisa-jadi-cuan-mahal-jika-dibeli-kolektor/" },
 { n:6,  title:"Segini Harga Terkini Uang Kertas 100 Rupiah Gambar Perahu Layar Pinisi", author:"Jassinta Roid Triniti", date:"20/12/2024", media:"innalar.com", image:"innalar_2.png", url:"https://www.innalar.com/segini-harga-terkini-uang-kertas-100-rupiah-gambar-perahu-layar-pinisi/" },
 { n:7,  title:"Butuh Dana Rp 2,2 Triliun, Proyek Pelebaran Jalan Raya Sawangan Kota Depok Belum Juga Direalisasikan", author:"Jassinta Roid Triniti", date:"20/11/2024", media:"innalar.com", image:"innalar_3.png", url:"https://www.innalar.com/butuh-dana-rp-22-triliun-proyek-pelebaran-jalan-raya-sawangan-kota-depok-belum-juga-direalisasikan/" },
 { n:8,  title:"Sosok Junalies, Seorang Desainer Uang Kuno Indonesia yang Karyanya Mendunia: Salah Satunya Uang Seri Barong yang Legendaris", author:"Jassinta Roid Triniti", date:"11/12/2024", media:"innalar.com", image:"innalar_4.png", url:"https://www.innalar.com/sosok-junalies-seorang-desainer-uang-kuno-indonesia-yang-karyanya-mendunia-salah-satunya-uang-seri-barong-yang-legendaris/" },
 { n:9,  title:"Membangun Personal Branding yang Kuat", author:"Jassinta Roid Triniti", date:"2024", media:"Ikapunija Media", image:"Ikapunija_1.png", url:null },
 { n:10, title:"Brand Kopi Kreatif Gen Z Karya Prodi Desain Grafis", author:"Jassinta Roid Triniti", date:"2024", media:"Ikapunija Media", image:"Ikapunija_2.png", url:null },
 { n:11, title:"Kunjungan Alumni IJTM ke Toyota dan Mitsubishi", author:"Jassinta Roid Triniti", date:"2024", media:"Ikapunija Media", image:"Ikapunija_3.png", url:null },
] as const;
```
Judul karya panjang: `text-wrap: balance`, `overflow-wrap: anywhere`, ukuran fluid agar tidak terpotong; judul besar di bawah boleh 2–4 baris.

---

## §13 CONTENT MARKETING SPECIALIST

### 13.1 Hero (pola `<SectionHero>`)
- **Headline** (tengah, 66px/fluid, Sentient): baris 1 `From Ordinary Content to` = **Bold Italic**; baris 2 `Memorable Stories` = **Bold**.
- **Narasi** (tengah, 1.5rem di bawah headline, Poppins italic ≤ 24,9px):
  *"I used to wonder: Why does one post go viral while another fades unnoticed? That curiosity led me deeper into understanding algorithms, content psychology, and audience behavior. It was there that I realized that creating content is not just about publishing it is about understanding people."*
  (pertahankan kalimat persis; boleh `…not just about publishing — it is about understanding people.` hanya bila kamu setuju; default: persis seperti tertulis.)
- **Video reveal ×6** (1080×1920, **9:16 dijaga**, diperkecil, ±`clamp(84px, 10vw, 170px)` lebar) disebar seperti `Aset_1.png`; reveal saat terlihat; muted loop playsinline; hanya yang terlihat yang diputar:
  1. `Hasil Konten Hardselling Lassiewear.mp4` 2. `kecantikan_2.mp4` 3. `Hasil Konten Education Lassiewear.mp4` 4. `kuliner_2.mp4` 5. `travel_1.mp4` 6. `travel_2.mp4`

### 13.2 Runway (scroll samping / catwalk) — `Aset_2.png`
Layout (ASCII acuan):
```
|                                  INFO                                daftar isi |
|                  Platform / Content Type (mis. TikTok / Video Animation)        |
|                   ____________________                                          |
|  [kartu samping]  |  MEDIA UTAMA       |  [kartu samping]                       |
|   scale .70       |  (ukuran asli,     |   scale .70                            |
|   upstage         |   tidak diperkecil)|   upstage                              |
|                   |____________________|                                        |
|                    Judul Konten (tahun)                                         |
|  dd/mm (angka)                                                        CREDIT    |
|_ bawah section: ROBEKAN KERTAS (seed 303) ______________________________________|
```
- Elemen: **INFO** (tengah atas, klik → panel info singkat), **daftar isi (INDEX)** kanan atas, **nama platform/jenis konten** di atas media (mis. `TikTok / Video Animation`, `Instagram / Feed`), **judul konten + tahun** di bawah media, **tanggal/bulan dalam angka** kiri bawah (format `dd/mm/yyyy`), tombol kecil **CREDIT** kanan bawah (klik → popup kredit sesuai media tengah), counter `01 / 15`, ruler vertikal tipis dekoratif (angka mono samar) seperti referensi.
- **Ukuran media utama TIDAK dikecilkan (No Shrink on Center):** video vertikal 9:16 tinggi penuh `min(58vh, 520px)` (gunakan `svh`: `min(58svh, 520px)`), tegak & megah ala Reels/Stories; foto/feed (≈1:1, 1080×1072 dll.) lebar/tinggi hingga `min(54svh, 470px)`, tajam, **tanpa terpotong/tertekan** (rasio dari manifest).
- **Pre-reveal (upstage):** kartu belum giliran: `translateZ(-240px)` dengan `perspective: 1200px`, `scale(0.70)`, **blur depth-of-field 1.5px**, `opacity: 0.80`, **tegak lurus** (tanpa `rotateZ`; keputusan: kemiringan hanya `rotateY` ±8° ke arah tengah akibat perspektif).
- **Catwalk advance:** saat dipilih/digeser, kartu maju dari `translateZ(-240px)` ke `translateZ(+40px)` (titik sorot depan panggung), blur → **0**, `scale → 1.0`, langsung diselimuti **radiant glow aura**. Kartu sebelumnya **melangkah mundur** ke `translateZ(-240px)`, mengecil, bergeser halus ke samping. Kurva inersia **`cubic-bezier(0.18, 0.9, 0.28, 1)` selama 800ms**.
- **Glow aktif:** (a) *Luminous border pulse* — bingkai memancarkan neon `--hot-pink` berdenyut lembut (`animate-reveal-glow`); (b) *Ambient aura bloom* — lapisan cahaya lembut berpendar di belakang kartu (`animate-aura-bloom`). Reduced-motion: glow statis.
- **Latar penuh dinamis:** lapisan terbawah = foto/video yang mengikuti item aktif (video → ambient play muted; foto → tampil penuh), ditutup gradient `--grad-plum-night` **opacity 50%** (`opacity-50`) + **film-grain putih** + subtle glow → sinematik; teks, tombol INFO, dan tiga kartu galeri tetap tajam/kontras.
- **Interaksi:** section **di-pin (sticky)**; scroll vertikal dipetakan ke pergeseran samping (`15 × ~55svh`), plus drag/swipe horizontal, panah ←→, tombol panah, klik kartu samping. Satu kartu = satu langkah; snap logis (bukan scroll-snap CSS global). HP: 1 kartu tengah + samping sebagian, 3D dikurangi (hanya scale/opacity). Video aktif **diputar muted loop**, kartu lain `poster` atau dijeda (batas ±6 video).
- **Popup CREDIT:** menampilkan sesuai item aktif, mis.
```
  Company: Elsthetic, Aishi Beauty
  TikTok: @ELSthetic Official   ← tautan ke URL (target _blank, rel noopener noreferrer)
  By: Jassinta Roid Triniti
```
  (label akun mengikuti platform: "TikTok" / "Instagram").
- **Panel INFO:** judul + tahun, paragraf deskripsi, statistik sebagai pill (Views, Likes, Comments, Saves, Shares sesuai data).

### 13.3 Data runway (15 konten; urutan tampil sesuai nomor)
```ts
// src/data/content.ts  (key stats seragam: views, likes, comments, saves, shares)
export const items = [
 { n:1, title:"Facial Messo", date:"22/06/2025", platform:"TikTok", type:"Video Animation", media:{ kind:"video", file:"kecantikan_1.mp4", w:1080, h:1920 },
   credit:{ company:"Elsthetic, Aishi Beauty", handle:"@ELSthetic Official", url:"https://vt.tiktok.com/ZS94wSVfA/", by:"Jassinta Roid Triniti" },
   info:{ heading:"Facial Messo (2025)", body:[
     "I was involved in developing educational and promotional animated content regarding facial mesotherapy treatments for dull skin, enlarged pores, and signs of aging.",
     "The most unique aspect of this project was the inclusion of engaging \"before-and-after\" facial animations." ], stats:{ views:179, likes:2, shares:2 } } },
 { n:2, title:"Ceramide", date:"09/07/2025", platform:"TikTok", type:"Video Education", media:{ kind:"video", file:"kecantikan_2.mp4", w:1080, h:1920 },
   credit:{ company:"Elsthetic, Aishi Beauty", handle:"@ELSthetic Official", url:"https://vt.tiktok.com/ZS94w5vFE/", by:"Jassinta Roid Triniti" },
   info:{ heading:"Ceramide (2025)", body:[
     "This is arguably the best product-focused educational video or \"soft sell\" I have created during my time at Elsthetic, thanks to its crisp visuals and clear animation.",
     "However, despite the high quality of the animation and imagery, it falls short in terms of engagement, as the video has underperformed regarding views, likes, and shares." ], stats:{ views:155, likes:0, shares:2 } } },
 { n:3, title:"Pico Glow Laser", date:"13/07/2025", platform:"TikTok", type:"Video Promotion", media:{ kind:"video", file:"kecantikan_3.mp4", w:1080, h:1920 },
   credit:{ company:"Elsthetic, Aishi Beauty", handle:"@ELSthetic Official", url:"https://vt.tiktok.com/ZS94wfGX9/", by:"Jassinta Roid Triniti" },
   info:{ heading:"Pico Glow Laser (2025)", body:[
     "During my time at Elsthetic, I also tried creating promotional or \"hard-sell\" videos, as I believed such promotions were crucial for boosting company engagement.",
     "However, the engagement turned out to be very low; I realized that people didn't really care about \"what\" I was selling, but rather about \"how important\" it was to them." ], stats:{ views:230, likes:1, shares:2 } } },
 { n:4, title:"Glow Max With Triple Geneo", date:"15/09/2025", platform:"Instagram", type:"Feed", media:{ kind:"image", file:"flyer_kecantikan_1.jpg", w:1080, h:1072 },
   credit:{ company:"Elsthetic, Aishi Beauty", handle:"@elsthetic_pesona", url:"https://www.instagram.com/p/DOmonNPj2By/?stkn=MWN1YjZpaWZqZnQ4bQ==", by:"Jassinta Roid Triniti" },
   info:{ heading:"Glow Max With Triple Geneo (2025)", body:[
     "During my time at both Elsthetic and Aishi Beauty, I was also actively involved in creating and designing promotional price flyers on a weekly basis.",
     "The purpose of these promotional flyers was to boost sales." ] } },
 { n:5, title:"Mega Sale 9.9 Booster Facial", date:"09/09/2025", platform:"Instagram", type:"Feed", media:{ kind:"image", file:"flyer_kecantikan_2.jpg", w:1080, h:1080 },
   credit:{ company:"Elsthetic, Aishi Beauty", handle:"@elsthetic_pesona", url:"https://www.instagram.com/p/DOXRYsuD4ze/?stkn=d3YwdWo1cGx5enJ2", by:"Jassinta Roid Triniti" },
   info:{ heading:"Mega Sale 9.9 Booster Facial (2025)", body:[
     "I also create promotional flyers for special dates, such as 9.9, 7.7, and so on.",
     "Just like the weekly promotions, the goal of these special-date promotions is to boost interest and sales." ] } },
 { n:6, title:"Promo Vit C Therapy", date:"08/09/2025", platform:"Instagram", type:"Feed", media:{ kind:"image", file:"flyer_kecantikan_3.jpg", w:1080, h:1080 },
   credit:{ company:"Elsthetic, Aishi Beauty", handle:"@elsthetic_pesona", url:"https://www.instagram.com/p/DOUnEKHDxW1/?stkn=MWZ5d2J1ZTl1aXJlcw==", by:"Jassinta Roid Triniti" },
   info:{ heading:"Promo Vit C Therapy (2025)", body:[
     "When tasked with designing weekly flyers, the challenge often lies in creating designs that are cohesive yet distinct.",
     "This approach ensures that promotions look appealing while remaining aligned with the company's design pillars and overall style." ] } },
 { n:7, title:"Luxury Facial", date:"02/09/2025", platform:"Instagram", type:"Feed", media:{ kind:"image", file:"flyer_kecantikan_4.jpg", w:1080, h:1077 },
   credit:{ company:"Elsthetic, Aishi Beauty", handle:"@elsthetic_pesona", url:"https://www.instagram.com/p/DOFf4gCj9kA/?stkn=MTFxcHV1YzBkNjF1cQ==", by:"Jassinta Roid Triniti" },
   info:{ heading:"Luxury Facial (2025)", body:[
     "In fact, beyond the weekly and \"special date\" promotions, there is another offer: the limited-slot promotion.",
     "The purpose of this promotion is to encourage customers to quickly purchase or book beauty services at our clinic." ] } },
 { n:8, title:"Promo 17 Agustus 2025", date:"15/08/2025", platform:"Instagram", type:"Feed", media:{ kind:"image", file:"flyer_kecantikan_5.jpg", w:1080, h:1079 },
   credit:{ company:"Elsthetic, Aishi Beauty", handle:"@elsthetic_pesona", url:"https://www.instagram.com/p/DNWtJsYPp9L/?stkn=MXZrOG90b25rbjRldQ==", by:"Jassinta Roid Triniti" },
   info:{ heading:"Promo 17 Agustus 2025", body:[
     "Our beauty clinic company also runs promotions for major holidays, such as August 17th and others.",
     "Naturally, these promotions are designed to boost interest and attract more customers during the holiday season." ] } },
 { n:9, title:"Luxury Glow Free Liposome", date:"22/07/2025", platform:"Instagram", type:"Feed", media:{ kind:"image", file:"flyer_kecantikan_6.jpg", w:1080, h:1080 },
   credit:{ company:"Elsthetic, Aishi Beauty", handle:"@elsthetic_pesona", url:"https://www.instagram.com/p/DMZA7DIPlso/?stkn=MTJ3NzZzOHJtcTRpMw==", by:"Jassinta Roid Triniti" },
   info:{ heading:"Luxury Glow Free Liposome (2025)", body:[
     "Working as a designer sometimes requires creative thinking and a strong sense of design.",
     "That is why I occasionally create promotional flyers that incorporate educational elements, ensuring potential customers understand the benefits for them." ] } },
 { n:10, title:"Umroh Bareng Orang Tua dan Anak-Anak", date:"06/08/2025", platform:"TikTok", type:"Video Promotion", media:{ kind:"video", file:"travel_3.mp4", w:1080, h:1920 },
   credit:{ company:"Karamina Tour", handle:"@KARAMINA TOUR", url:"https://vt.tiktok.com/ZS94wBUV5/", by:"Jassinta Roid Triniti" },
   info:{ heading:"Umroh Bareng Orang Tua dan Anak-Anak (2025)", body:[
     "While working under the umbrella of ELS Corp—specifically at its subsidiary, Karamina Tour—I had the opportunity to create animated TikTok content incorporating video footage from Umrah pilgrimages.",
     "Engagement and conversion rates for this content saw significant growth, resulting in strong sales performance." ], stats:{ views:179, likes:75, comments:1, saves:7, shares:3 } } },
 { n:11, title:"Umroh Itu Mahal Ya?", date:"03/08/2025", platform:"TikTok", type:"Video Education Animation", media:{ kind:"video", file:"travel_1.mp4", w:1080, h:1920 },
   credit:{ company:"Karamina Tour", handle:"@KARAMINA TOUR", url:"https://vt.tiktok.com/ZS94K1qgA/", by:"Jassinta Roid Triniti" },
   info:{ heading:"Umroh Itu Mahal Ya? (2025)", body:[
     "During my time at Karamina Tour, I also had the opportunity to create animated educational videos that delivered impressive results in terms of quality, engagement, and conversions on TikTok.",
     "These videos incorporated a \"soft sell\" approach at the end, which helped drive an increase in the number of subscribers." ], stats:{ views:179, likes:32, saves:1, shares:3 } } },
 { n:12, title:"Rindu Melihat Ka'bah?", date:"09/08/2025", platform:"TikTok", type:"Video Promotion", media:{ kind:"video", file:"travel_2.mp4", w:1080, h:1920 },
   credit:{ company:"Karamina Tour", handle:"@KARAMINA TOUR", url:"https://vt.tiktok.com/ZS94wW7Ja/", by:"Jassinta Roid Triniti" },
   info:{ heading:"Rindu Melihat Ka'bah? (2025)", body:[
     "Uploading this video to TikTok also led to an increase in engagement, promotion, and customer reach; the impact on the company was substantial, with views rising significantly to reach 914." ], stats:{ views:914, likes:98, comments:2, saves:10, shares:3 } } },
 { n:13, title:"Elspresso Kini Hadir di Go-Food", date:"20/07/2025", platform:"Instagram", type:"Video Education", media:{ kind:"video", file:"kuliner_1.mp4", w:1080, h:1920 },
   credit:{ company:"Elspresso", handle:"@elspresso_coffepastry", url:"https://www.instagram.com/reel/DMUwp8qBd5J/?igsh=czBnc3A3YXJlcW54", by:"Jassinta Roid Triniti" },
   info:{ heading:"Elspresso Kini Hadir di Go-Food (2025)", body:[
     "During my time at ELS Corp, I also had the opportunity to work with its subsidiary, Elspresso, creating and managing video content.",
     "This was my first experience managing social media and content for a company in the culinary or F&B sector." ], stats:{ views:24, likes:1 } } },
 { n:14, title:"Mood Menu", date:"26/07/2025", platform:"Instagram", type:"Video Soft Selling", media:{ kind:"video", file:"kuliner_2.mp4", w:1080, h:1920 },
   credit:{ company:"Elspresso", handle:"@elspresso_coffepastry", url:"https://www.instagram.com/reel/DMkb0mKhkus/?igsh=MXNuZjVndzd5d200Nw==", by:"Jassinta Roid Triniti" },
   info:{ heading:"Mood Menu (2025)", body:[
     "While at Espresso, I also had the opportunity to create a soft-selling animated video—produced almost entirely using animation even though the engagement and conversion rates for this content were very low." ], stats:{ views:38, likes:0 } } },
 { n:15, title:"Meeting Package FullDay", date:"22/07/2025", platform:"Instagram", type:"Video Promotion", media:{ kind:"video", file:"kuliner_3.mp4", w:1080, h:1920 },
   credit:{ company:"Elspresso", handle:"@elspresso_coffepastry", url:"https://www.instagram.com/reel/DMaBAg8B0tG/?igsh=MXA0dGpkanZlamd4MQ==", by:"Jassinta Roid Triniti" },
   info:{ heading:"Meeting Package FullDay (2025)", body:[
     "A promotional video was also created during my time at Elspresso, even though its engagement and conversion rates were still low.",
     "This is perfectly understandable, because Elspresso is a culinary company that has only just started out." ], stats:{ views:43, likes:0 } } },
] as const;
```
> Catatan terjemahan: deskripsi no. 15 aslinya berbahasa Indonesia; di atas adalah terjemahan Inggris. Label statistik dinormalkan (Like→likes, Shared→shares, Save/Saved→saves, Comment→comments). Item no. 14 mempertahankan tulisan "Espresso" apa adanya (kemungkinan maksud "Elspresso" — **tanya pemilik bila ragu**). Ukuran `w/h` mengikuti tabel CMD (§19).

---

## §14 EXAMPLE STRATEGY

### 14.1 Hero (pola `<SectionHero>`; layout `Aset_1.png`)
- **Headline** (tengah, 66px/fluid, Sentient): `From` = **Bold**, `Scrolling` = **Bold Italic**, `to` = **Bold**, `Strategy` = **Bold Italic** → "From *Scrolling* to *Strategy*".
- **Narasi** (tengah, 1.5rem di bawah, Poppins italic ≤ 24,9px): *"I found the perfect canvas when I joined a fashion brand that did not merely sell clothing it sold lifestyle and confidence. This was where I began building content strategies with genuine purpose and personality."*
- **Video reveal ×4** (1080×1920, 9:16, diperkecil): 1. `Hasil Konten Education Lassiewear.mp4` 2. `Hasil Konten Hardselling Lassiewear.mp4` 3. `Hasil Konten Entertainment Lassiewear.mp4` 4. `Hasil Konten Fun Lassiewear.mp4`

### 14.2 VIDEO REVEAL (panel melengkung 3D) — `Aset_4.png`
**Keempat video tampil sekaligus** dalam satu layer, berderet **menyambung** sebagai presentasi proyek imersif (panel 9:16 melengkung ke belakang di kiri/kanan, panel tengah menghadap depan; lantai grid perspektif gelap di bawah; judul kecil + tombol panah bulat di dasar tiap panel). Urutan kiri → kanan:
1. `Hasil Konten Hardselling Lassiewear.mp4` — label **Hard Selling**
2. `Hasil Konten Entertainment Lassiewear.mp4` — label **Entertainment**
3. `Hasil Konten Education Lassiewear.mp4` — label **Education**
4. `Hasil Konten Fun Lassiewear.mp4` — label **Fun**
ASCII acuan:
```
|     ______________       _________________      ______________    ...        |
|    |  Hard Selling|      |  Entertainment |     |  Education   |  (+ Fun)     |
|    |   (video)    |      |    (video)     |     |   (video)    |              |
|____|______________|______|________________|_____|______________|______________|
|    | Hard Selling |      | Entertainment  |     |  Education   |              |
|                          OBJECT LANTAI (lantai grid + pantulan)                |
|_ bawah section: ROBEKAN KERTAS (seed 404) ____________________________________|
```
- Setiap video **bisa diklik** → buka halaman informasi jenis konten (`#/strategy/<slug>`). Hover desktop: panel maju sedikit + tombol panah menyala; keyboard fokus; label "View details".
- Interaksi: mouse-move parallax halus (desktop), drag/scroll horizontal ringan untuk memutar fokus; **HP = carousel 1 video fokus, 3D disederhanakan**; keempat tetap terjangkau (swipe).
- **OBJECT LANTAI (keputusan):** lantai grid `--aubergine` perspektif + **pantulan** tiap panel (cermin 10–14% opacity, blur kecil) + satu objek dekoratif 3D kecil di depan (clapperboard sticker pink). Boleh diganti kemudian.
- Hanya video terlihat yang diputar (muted loop). Tombol INDEX kanan bawah. Dasar: `TornEdge` seed 404.

### 14.3 Halaman Informasi Jenis Konten (`#/strategy/{slug}`)
Layout (`Overlay`):
```
| Jenis Konten (mis. Hard Selling)                                  Footage Gallery  |
| Penjelasan tentang jenis konten                                   _______________  |
| Penjelasan mengenai salah satu konten                             |  foto footage|  |
|                                                                   |  (saling     |  |
| Reference:    Result:                See More ↗                   |  menyambung, |  |
| ___________   _____________________  (tautan sosmed)              |  imersif)    |  |
| | foto    |   | 4000+ | 22 | 3       |                            |______________|  |
| | referensi|  |Views  |Likes|Shares  |                            ____________      |
| |_________|   Credit:                                             | footage lain |  |
|               Reference: …  Script: …  Talent: …  Videographer: …  Editing: …        |
```
Galeri footage: deretan foto portrait 1080×1920 **saling menyambung** (rel horizontal, drag/swipe + panah, snap, **tidak dipotong**, parallax kecil, reveal berurutan); HP: galeri di bawah info. Foto referensi dalam `<PhotoFrame>`. Tombol **See More** → tautan sosmed (tab baru).

### 14.4 Data empat jenis konten (salin persis)
```ts
// src/data/strategy.ts
export const strategies = {
 "hard-selling": {
  label:"Hard Selling",
  about:"Content designed to introduce products more exclusively, typically through premium content, corporate storytelling, and product advertisements.",
  example:"One of the best hard-selling contents I created was a video titled \"Good Afternoon, Madam,\" which showcased the boutique atmosphere through storytelling and a vintage aesthetic.",
  reference:"Inspirasi Konten Hardselling_Lassiewear.jpg",
  credit:[["Reference","@willamazing (Instagram)"],["Script","Jassinta Roid Triniti"],["Talent","Siti Nur Azizah (@owshuary)"],["Videographer","Jassinta Roid Triniti"],["Editing","Jassinta Roid Triniti"]],
  results:{ views:"4000+", likes:"22", shares:"3" },
  seeMore:"https://www.instagram.com/reel/DW3TxpyDaFQ/?igsh=MThucG96MmNyZmU2YQ==",
  footage:["Footage Konten Hardselling 1_Lassiewear.jpg","Footage Konten Hardselling 2_Lassiewear.jpg","Footage Konten Hardselling 3_Lassiewear.jpg","Footage Konten Hardselling 4_Lassiewear.jpg","Footage Konten Hardselling 5_Lassiewear.jpg"] },
 "entertainment": {
  label:"Entertainment",
  about:"Content designed to introduce products by leveraging current social media trends and viral topics.",
  example:"One of the best entertainment contents I created was \"Office Look vs Campus Look,\" featuring office and campus outfit inspirations inspired by a trending format using the song \"Suzanne.\"",
  reference:"Inspirasi Konten Entertainment_Lassiewear.jpg",
  credit:[["Reference","@nicholas linadi (TikTok)"],["Script","Jassinta Roid Triniti"],["Talent","Chindy"],["Videographer","Jassinta Roid Triniti"],["Editing","Jassinta Roid Triniti"]],
  results:{ views:"2000+", likes:"3", shares:"2" },
  seeMore:"https://www.instagram.com/reel/DXlt8YhDfvy/?igsh=NGJqYTBueHI3emRi",
  footage:["Footage Konten Entertainment 1_Lassiewear.jpg","Footage Konten Entertainment 2_Lassiewear.jpg","Footage Konten Entertainment 3_Lassiewear.jpg","Footage Konten Entertainment 4_Lassiewear.jpg","Footage Konten Entertainment 5_Lassiewear.jpg"] },
 "education": {
  label:"Education",
  about:"Content designed to provide explanations and valuable information with the goal of educating the audience.",
  example:"One of the best educational contents I created was a video explaining how to place an online order through Lassiewear's Instagram Direct Messages (DM).",
  reference:"Inspirasi Konten Education_Lassiewear.jpg",
  credit:[["Reference","@Nadhera Luxury Indonesia"],["Script","Jassinta Roid Triniti"],["Talent","Siti Nur Azizah (@owshuary)"],["Videographer","Jassinta Roid Triniti"],["Editing","Jassinta Roid Triniti"]],
  results:{ views:"2000+", likes:"10", shares:"3" },
  seeMore:"https://www.instagram.com/reel/DXTAK0IDe-y/?igsh=MWpobWVvMHFnZmtiMw==",
  footage:["Footage Konten Education 1_Lassiewear.jpg","Footage Konten Education 2_Lassiewear.jpg","Footage Konten Education 3_Lassiewear.jpg","Footage Konten Education 4_Lassiewear.jpg","Footage Konten Education 5_Lassiewear.jpg"] },
 "fun": {
  label:"Fun",
  about:"Content designed to entertain audiences and increase social media engagement through humor and relatable trends.",
  example:"One of the best fun contents I created was a video titled \"No No Ya Dek,\" inspired by a social media trend that was popular at the time.",
  reference:"Inspirasi Konten Fun_Lassiewear.jpg",
  credit:[["Reference","@diary._secondbranded"],["Talent","Siti Nur Azizah (@owshuary), Bella Damayanti, Vira Ananda"],["Videographer","Jassinta Roid Triniti"],["Editing","Jassinta Roid Triniti"]],
  results:{ views:"30K+", likes:"223", shares:"24" },
  seeMore:"https://www.instagram.com/reel/DW3o0-UjfMG/?igsh=d2Q3cWk0NzQ1YzMz",
  // File yang ADA hanya 4 (lihat §19). Default: urutan ini; slot ke-5 disembunyikan otomatis bila file tidak ada.
  footage:["Footage Konten Fun 2_Lassiewear 1.jpg","Footage Konten Fun 2_Lassiewear.jpg","Footage Konten Fun 3_Lassiewear.jpg","Footage Konten Fun 4_Lassiewear.jpg"] },
} as const;
```
Catatan: file referensi `Inspirasi Konten Hardselling_…` di tabel CMD tertulis "Lassiwear" — gunakan resolver kandidat nama: `[nama dari brief, nama dengan "Lassiwear"]` dan laporkan mana yang ada lewat `check:media`.

---

## §15 PROJECT CAMPUS (section ke-5, setelah Example Strategy)

### 15.1 Hero (pola `<SectionHero>` **tanpa gambar/video**)
- **Headline** (Sentient, 66px/fluid): `From` (Bold) · `The Campus` (**Italic, merah `--cherry-red`**) · `For` (Bold) · `The Story` (**Italic, merah `--cherry-red`**) → "From *The Campus* For *The Story*".
- **Narasi** (Poppins italic ≤ 24,9px): *"Jakarta State Polytechnic was not only where I pursued my education it was also the stage where I first began creating meaningful work. It was here that I started building my identity as a creator, long before my name became recognized beyond the university environment."*
- Tanpa media; hiasan boleh sticker/washi/tekstur kertas kampus (bukan foto). Latar `--apricot`/`--peach-fizz` bertekstur.

### 15.2 Flipbook section
ASCII acuan:
```
|  RUSH 07  |  PANDORA  |       ______________________________      Judul karya        |
|  (spine)  |  (spine)  |      |  halaman kiri | halaman kanan|     Penjelasan          |
|  rak buku |  navigasi |      |   FLIPBOOK    |              |     Responsibilities    |
|___________|___________|______|______________|______________|_________________________|
|_ bawah section: ROBEKAN KERTAS (seed 505) ________________________________________|
```
- **Rak buku navigasi (kiri):** dua buku berdiri sebagai **punggung vertikal** bertuliskan `RUSH 07` dan `PANDORA` (rak kayu `--walnut` bertekstur, buku berwarna pastel, tebal & bervolume 3D). Klik/tap/Enter = pilih karya aktif (punggung aktif menonjol keluar sedikit). HP: rak menjadi **baris horizontal** di atas flipbook.
- **Flipbook (tengah):** halaman = **gambar** (lihat §19), flip 3D (lengkung halaman, bayangan lipatan tengah, ketebalan buku, tepi halaman bertumpuk). Navigasi: klik tepi/pojok halaman, drag, ←→, tombol panah, slider/field nomor halaman, indikator `Pages x–y / N`. **Lazy-load jendela ±4 spread** (jangan memuat 89 gambar sekaligus). `React.lazy`.
- **Aturan bentuk halaman:** sistem menyesuaikan bentuk dokumen. Halaman **potret** = satu halaman buku; halaman yang **memanjang ke samping (landscape, rasio > ~1,1)** = ditampilkan sebagai **spread melintang di 2 sisi buku** (dua halaman). Fungsi `buildSpreads(pages, isMobile)`: halaman 1 potret tampil sendiri di kanan (sampul); selanjutnya pasangan (2–3), (4–5), …; halaman landscape menempati satu spread penuh dan **tidak** dipecah/dipotong; halaman terakhir ganjil tampil sendiri di kiri. HP portrait: **1 halaman** per layar (landscape page dibuat muat lebar layar). Rasio halaman dihitung dari `media-manifest` (bukan hardcode).
- **Panel info (kanan):** Judul karya, Penjelasan, Responsibilities (daftar).

### 15.3 Data
```ts
// src/data/campus.ts
export const campus = [
 { id:"rush-07", spine:"RUSH 07", title:"RUSH 07", pages:89,
   doc:"LAYOUT COMIC RUSH.pdf", // tidak dipakai di web; flipbook memakai gambar rush_07_1…89.jpg
   description:[
     "Comic Rush is a comic magazine published by KSM Comic Club as part of the Karya Karsa program, a platform for young creators on campus to transform their imagination into tangible works.",
     "Behind every carefully arranged page and every comic panel brought to life, there was a long creative process that I experienced as the Magazine Layout Designer for this publication." ],
   responsibilities:[
     "Managing the magazine layout and overall visual composition.",
     "Designing magazine pages and visual assets.",
     "Revising designs whenever necessary.",
     "Collecting all comic submissions and compiling them into a complete magazine publication.",
     "Reporting project outcomes to the Head of the KSM Comic Club." ] },
 { id:"pandora", spine:"PANDORA", title:"Pandora", pages:8,
   doc:"PROJECT SURAT KABAR.pdf", // tidak dipakai di web; flipbook memakai pandora_1…8.jpg
   description:[
     "Pandora was a newspaper developed as a team project for an academic course. However, for me, it represented much more than simply fulfilling an assignment requirement. Pandora was my first real experience leading an editorial team." ],
   responsibilities:[
     "Leading the editorial workflow of the Pandora newspaper.",
     "Writing news articles.",
     "Creating a news coverage wishlist and editorial agenda.",
     "Reviewing and revising newspaper content.",
     "Designing and managing the newspaper layout." ] },
] as const;
```
(Catatan: teks asli "Karya Karsa programa platform" diperbaiki menjadi "Karya Karsa program, a platform"; mohon cek.)

---

## §16 PODCAST

### 16.1 Hero (pola `<SectionHero>` **tanpa media**)
- Eyebrow: `PODCAST` (DM Mono kecil).
- **Headline** (Sentient, 66px/fluid): `Behind` (Bold) · `the Microphone` (**Italic, merah `--cherry-red`**) → "Behind *the Microphone*".
- **Narasi** (Poppins italic ≤ 24,9px, dua baris/paragraf): *"Being a producer is not simply about taking control."* / *"It is about becoming the most attentive listener before anyone else is ready to listen."*

### 16.2 Pemutar Spotify (tonton/dengar di web)
Tampilkan 2 episode melalui **embed resmi Spotify** (iframe), lazy-load, rasio responsif, kartu bergaya studio (kertas + mic ilustrasi):
- `https://open.spotify.com/embed/episode/5v0J711J5xyWvYZn8JWC76`
- `https://open.spotify.com/embed/episode/4dfqcKbGRCaxuoztDsqu0d`
(Berasal dari tautan `open.spotify.com/episode/<id>`.) Iframe: `allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"`, `loading="lazy"`, `title` English. Judul episode placeholder `Episode 1`, `Episode 2` (mudah diganti di `data`). Fallback: tombol "Open on Spotify" (tab baru). Catatan batasan: pengunjung yang belum login Spotify biasanya hanya mendengar cuplikan (batasan Spotify).
**Credit** (blok kecil di bawah):
```
Credit
Script: Jassinta Roid Triniti
Hosts: Tataq, Aqilah
Spotify: Kartini Podcast
```
Sertakan pengaturan CSP/`frame-src` pada `vercel.json` bila memakai header CSP (izinkan `https://open.spotify.com`).

---

## §17 ARCHIVE

### 17.1 Tata letak (`Aset_6.png`) 
```
|Title Of Work            |Company        |Format |Type                 |  preview  |  INDEX |
|01. Example              Lassie          Video   Promotion (Example)  | [reveal   |        |
|02. Example              Lassie          Photo   Hardselling (Example)|  karya    |        |
|03. …                                                                 |  penuh,   |        |
| etc                                                                  |  utuh]    |        |
|_ bawah section: ROBEKAN KERTAS (seed 606) ________________________________________|
```
- Desktop: **2 kolom** — kiri tabel daftar (nomor · judul serif italic besar · Company · Format · Type dalam DM Mono kapital kecil), kanan panel **preview vertikal** besar. HP: **preview sticky di atas**, list di bawah.
- Latar penuh: media karya aktif, gelap/blur (50% overlay plum-night + film grain putih) seperti referensi.
- **Urutan diacak** (Fisher-Yates) **setiap page load**, penomoran `01…N` dihitung ulang sesudah diacak.
- Hover baris (desktop) mengganti preview; klik/tap/Enter mengunci pilihan; panah ↑↓ untuk berpindah; `LIST / SLIDER` opsional. Untuk karya tulisan dengan `url` tampil tombol `Read article ↗` (tab baru). Daftar bisa scroll sendiri (`data-lenis-prevent`).
- Footer: `© 2026`-gaya kecil sesuai §7.5; tombol INDEX kanan atas.

### 17.2 ARCHIVE WORK PREVIEW ENGINE (dynamic responsive media engine)
Buat sistem yang menampilkan **seluruh karya (foto, video, gambar) berbagai rasio secara PENUH** di area preview.

**Tujuan wajib:** tiap karya 100% utuh; tidak terpotong; tidak tertimpa; tidak stretch/distorsi; tidak keluar area preview; tidak ada ruang kosong yang tidak disengaja; aspect ratio asli dijaga; area terisi optimal lewat **repetition/tiling/pengaturan jumlah media**; semua placeholder konsisten desain.

**Prinsip:** `FULL MEDIA + PRESERVE ORIGINAL RATIO + MAXIMUM AREA COVERAGE`.

**Kasus:**
1. **Rasio cocok/dekat** dengan preview → tampil **1 karya** memenuhi area semaksimal mungkin.
2. **Portrait di preview landscape** → jangan crop; hitung otomatis jumlah salinan (mis. ~6) agar area terisi; contoh `[P][P][P]/[P][P][P]`. Jika 6 terlalu banyak/sedikit → tentukan jumlah optimal dari: rasio karya, rasio preview, viewport, container, gap.
3. **Square** → pertahankan 1:1; boleh 1, 2, 3, 4, 6, … sesuai kebutuhan; jangan jadikan rectangle.
4. **Landscape** → 1 bila cukup; bila tidak, beberapa salinan.
5. **Ekstrem** (ultra-wide 32:9, 9:20, 9:16, 4:5, 3:4, 1:1, 4:3, 3:2, 16:9, kustom) → hitung layout dinamis; jangan asumsi semua sama.

**ATURAN ABSOLUT: NO CROP.** Dilarang: `object-fit: cover` yang memotong, `background-size: cover`, fixed-height cropping, `overflow:hidden` yang memotong media, forced aspect ratio, stretching, distorsi, masking yang menghilangkan bagian karya. Pakai `object-fit: contain` / render penuh; bila `contain` menyisakan ruang → **isi dengan repetition/tiling/multi-item**. Tidak boleh ada media saling menimpa/keluar container/tertutup teks. Gunakan CSS Grid/Flex/`aspect-ratio`/calculated grid.

**Konsistensi:** desain container sama (border/radius/spacing/alignment/background/gap/hierarki) → hanya isi (susunan media) yang adaptif.

**Algoritma (`src/lib/archiveLayout.ts`, murni & diuji `vitest`):**
```ts
export type LayoutInput = {
  mediaRatio: number;        // w/h asli
  W: number; H: number;      // ukuran area preview (px)
  gap: number;               // px
  minShort?: number;         // sisi pendek min per tile (default 96)
  maxCopies?: number;        // default 24 (video: 6, mode hemat: 6)
  naturalW?: number;         // lebar asli media untuk mencegah upscale berlebih
  maxUpscale?: number;       // default 1.6
};
export type LayoutResult = { cols: number; rows: number; count: number; tileW: number; tileH: number; mediaW: number; mediaH: number; gridW: number; gridH: number; offsetX: number; offsetY: number; coverage: number };
// Untuk n = 1..maxCopies, untuk cols = 1..n, rows = ceil(n/cols) dan hanya grid PENUH (cols*rows == n atau
// salinan dihitung = cols*rows). cellW=(W-(cols-1)gap)/cols, cellH=(H-(rows-1)gap)/rows;
// mediaW=min(cellW, cellH*ratio), mediaH=mediaW/ratio; tolak jika min(mediaW,mediaH)<minShort atau upscale>maxUpscale.
// coverage = (cols*rows*mediaW*mediaH)/(W*H). Pilih coverage tertinggi; bila selisih < ~4%, pilih yang
// salinannya lebih sedikit lalu tile lebih besar. Grid dipusatkan (offsetX/Y). Tidak pernah meng-crop.
export function computeArchiveLayout(i: LayoutInput): LayoutResult;
```
- **Video:** satu `<video>` sumber + salinan lain digambar ke `<canvas>` memakai `requestVideoFrameCallback` (cadangan: jika tidak didukung, batasi salinan video ≤ 6 elemen `<video>` ber-`preload="none"`). Hormati batas ±6 video bersamaan.
- **Recalculate** pada `resize`, `orientationchange`, `visualViewport`, fullscreen, zoom, ganti karya (`ResizeObserver` debounce ±100ms).
- **Unit test wajib:** CASE A (16:9 preview & 16:9 media → 1 media), CASE B (16:9 preview & 9:16 media → grid beberapa potret, tidak ada crop), CASE C (square), CASE D (9:20), CASE E (32:9: tidak ada crop kiri/kanan), kasus preview portrait (HP), invarian: `mediaW ≤ cellW`, `mediaH ≤ cellH`, tanpa overlap, `gridW ≤ W`, `gridH ≤ H`, rasio terjaga ±0,5%.
- **Prioritas:** 1 tampilkan seluruh karya · 2 rasio asli · 3 tanpa crop · 4 tanpa distorsi · 5 tanpa overlap · 6 maksimalkan coverage · 7 minimalkan ruang kosong · 8 placeholder konsisten · 9 responsif semua device.
- Repetition harus tampak **disengaja**: grid rapi, gap konsisten, perataan tengah — bukan masonry acak.

### 17.3 Data Archive (34 karya; urutan di bawah hanya data sumber — **diacak saat tampil**)
`company` yang bertanda `[CONFIRM]` adalah turunan dari data lain; tampilkan seperti ini kecuali pemilik mengubah.
```ts
// src/data/archive.ts
type Item = { title:string; format:"Writing"|"Video"|"Feed"; company:string; type:string; file:string; kind:"image"|"video"; w:number; h:number; url?:string; enabled?:boolean };
export const archive: Item[] = [
 { title:"Inilah Sosok Jan Miskovic, Pemegang Rekor Mata Minus Tertinggi di Dunia yang Mengejutkan", format:"Writing", company:"Independen Media", type:"News", file:"IMN_1.png", kind:"image", w:520, h:520, url:"https://www.independenmedia.id/sosok/27614379267/inilah-sosok-jan-miskovic-pemegang-rekor-mata-minus-tertinggi-di-dunia-yang-mengejutkan?page=2" },
 { title:"Carmen H2H Lolos Audisi di SM Entertainment Tanpa Sepengetahuan Orang Tuanya, Ini Cerita Lengkapnya", format:"Writing", company:"Independen Media", type:"Entertainment", file:"IMN_2.png", kind:"image", w:520, h:520, url:"https://www.independenmedia.id/various/27614883156/carmen-h2h-lolos-audisi-di-sm-entertainment-tanpa-sepengetahuan-orang-tuanya-ini-cerita-lengkapnya?page=3" },
 { title:"Keren! Komik Digital Indonesia 'Good Bad Fortune' Laris Manis di Korea, Ini Sinopsisnya", format:"Writing", company:"Independen Media", type:"News", file:"IMN_3.png", kind:"image", w:520, h:520, url:"https://www.independenmedia.id/various/27614320657/keren-komik-digital-indonesia-good-bad-fortune-laris-manis-di-korea-ini-sinopsisnya" },
 { title:"Kuwait Kuasai Posisi! Inilah Mata Uang Tertinggi di Dunia Saat Ini", format:"Writing", company:"Independen Media", type:"News", file:"IMN_4.png", kind:"image", w:520, h:520, url:"https://www.independenmedia.id/ekbis/27614462608/kuwait-kuasai-posisi-inilah-mata-uang-tertinggi-di-dunia-saat-ini?page=2" },
 { title:"Uang Rusak Jangan Dibuang! 2 Kondisi Cacat Ini Tetap Bisa Jadi Cuan Mahal Jika Dibeli Kolektor", format:"Writing", company:"innalar.com", type:"Article", file:"innalar_1.png", kind:"image", w:520, h:520, url:"https://www.innalar.com/uang-rusak-jangan-dibuang-2-kondisi-cacat-ini-tetap-bisa-jadi-cuan-mahal-jika-dibeli-kolektor/" },
 { title:"Segini Harga Terkini Uang Kertas 100 Rupiah Gambar Perahu Layar Pinisi", format:"Writing", company:"innalar.com", type:"News", file:"innalar_2.png", kind:"image", w:520, h:520, url:"https://www.innalar.com/segini-harga-terkini-uang-kertas-100-rupiah-gambar-perahu-layar-pinisi/" },
 { title:"Butuh Dana Rp 2,2 Triliun, Proyek Pelebaran Jalan Raya Sawangan Kota Depok Belum Juga Direalisasikan", format:"Writing", company:"innalar.com", type:"Opinion", file:"innalar_3.png", kind:"image", w:520, h:520, url:"https://www.innalar.com/butuh-dana-rp-22-triliun-proyek-pelebaran-jalan-raya-sawangan-kota-depok-belum-juga-direalisasikan/" },
 { title:"Sosok Junalies, Seorang Desainer Uang Kuno Indonesia yang Karyanya Mendunia: Salah Satunya Uang Seri Barong yang Legendaris", format:"Writing", company:"innalar.com", type:"Article", file:"innalar_4.png", kind:"image", w:520, h:520, url:"https://www.innalar.com/sosok-junalies-seorang-desainer-uang-kuno-indonesia-yang-karyanya-mendunia-salah-satunya-uang-seri-barong-yang-legendaris/" },
 { title:"Membangun Personal Branding yang Kuat", format:"Writing", company:"Ikapunija Media", type:"Article", file:"Ikapunija_1.png", kind:"image", w:520, h:520 },
 { title:"Brand Kopi Kreatif Gen Z Karya Prodi Desain Grafis", format:"Writing", company:"Ikapunija Media", type:"News", file:"Ikapunija_2.png", kind:"image", w:520, h:520 },
 { title:"Kunjungan Alumni IJTM ke Toyota dan Mitsubishi", format:"Writing", company:"Ikapunija Media", type:"News", file:"Ikapunija_3.png", kind:"image", w:520, h:520 },
 { title:"Facial Messo (2025-06-22)", format:"Video", company:"Elsthetic, Aishi Beauty", type:"Video Animation", file:"kecantikan_1.mp4", kind:"video", w:1080, h:1920 },       // [CONFIRM company]
 { title:"Ceramide (2025-07-09)", format:"Video", company:"Elsthetic, Aishi Beauty", type:"Video Education", file:"kecantikan_2.mp4", kind:"video", w:1080, h:1920 },
 { title:"Pico Glow Laser (2025-07-13)", format:"Video", company:"Elsthetic, Aishi Beauty", type:"Video Promotion", file:"kecantikan_3.mp4", kind:"video", w:1080, h:1920 },
 { title:"Glow Max With Triple Geneo (15 September 2025)", format:"Feed", company:"Elsthetic, Aishi Beauty", type:"Promotion", file:"flyer_kecantikan_1.jpg", kind:"image", w:1080, h:1072 },
 { title:"Mega Sale 9.9 Booster Facial (9 September 2025)", format:"Feed", company:"Elsthetic, Aishi Beauty", type:"Promotion", file:"flyer_kecantikan_2.jpg", kind:"image", w:1080, h:1080 },
 { title:"Promo Vit C Therapy (8 September 2025)", format:"Feed", company:"Elsthetic, Aishi Beauty", type:"Promotion", file:"flyer_kecantikan_3.jpg", kind:"image", w:1080, h:1080 },
 { title:"Luxury Facial (2 September 2025)", format:"Feed", company:"Elsthetic, Aishi Beauty", type:"Promotion", file:"flyer_kecantikan_4.jpg", kind:"image", w:1080, h:1077 },
 { title:"Promo 17 Agustus 2025 (15 Agustus 2025)", format:"Feed", company:"Elsthetic, Aishi Beauty", type:"Promotion", file:"flyer_kecantikan_5.jpg", kind:"image", w:1080, h:1079 },
 { title:"Luxury Glow Free Liposome (22 Juli 2025)", format:"Feed", company:"Elsthetic, Aishi Beauty", type:"Promotion", file:"flyer_kecantikan_6.jpg", kind:"image", w:1080, h:1080 },
 { title:"Umroh Bareng Orang Tua dan Anak-Anak (2025-08-06)", format:"Video", company:"Karamina Tour", type:"Promotion", file:"travel_3.mp4", kind:"video", w:1080, h:1920 },
 { title:"Umroh Itu Mahal Ya? (2025-08-03)", format:"Video", company:"Karamina Tour", type:"Video Education Animation", file:"travel_1.mp4", kind:"video", w:1080, h:1920 },
 { title:"Rindu Melihat Ka'bah? (2025-08-09)", format:"Video", company:"Karamina Tour", type:"Video Promotion", file:"travel_2.mp4", kind:"video", w:1080, h:1920 },
 { title:"Elspresso Kini Hadir di Go-Food (20 Juli 2025)", format:"Video", company:"Elspresso", type:"Video Education", file:"kuliner_1.mp4", kind:"video", w:1080, h:1920 },
 { title:"Mood Menu (26 Juli 2025)", format:"Video", company:"Elspresso", type:"Video Soft Selling", file:"kuliner_2.mp4", kind:"video", w:1080, h:1920 },
 { title:"Meeting Package FullDay (22 Juli 2025)", format:"Video", company:"Elspresso", type:"Video Promotion", file:"kuliner_3.mp4", kind:"video", w:1080, h:1920 },
 { title:"Happy Labor Day", format:"Feed", company:"Lassiewear", type:"Greetings for special occasions", file:"Flyer Hari Besar 1_Lassiewear.png", kind:"image", w:1080, h:1350 },   // [CONFIRM company]
 { title:"Selamat Hari Kartini", format:"Feed", company:"Lassiewear", type:"Greetings for special occasions", file:"Flyer Hari Besar 2_Lassiewear.png", kind:"image", w:1080, h:1350 },
 { title:"World Earth Day", format:"Feed", company:"Lassiewear", type:"Greetings for special occasions", file:"Flyer Hari Besar 3_Lassiewear.png", kind:"image", w:1080, h:1350 },
 { title:"Selamat Hari Pendidikan Nasional", format:"Feed", company:"Lassiewear", type:"Greetings for special occasions", file:"Flyer Hari Besar 4_Lassiewear.png", kind:"image", w:1080, h:1350 },
 { title:"Al-Karamina Islamic School Bumper", format:"Video", company:"Al-Karamina Islamic School", type:"Bumper", file:"SCHOOL_BUMPER.mp4", kind:"video", w:1920, h:1080 },       // [CONFIRM company]
 { title:"Karamina Tour Bumper", format:"Video", company:"Karamina Tour", type:"Bumper", file:"KARAMINA_TOUR_BUMPER.mp4", kind:"video", w:1920, h:1080 },
 { title:"Elsthetic Bumper", format:"Video", company:"Elsthetic", type:"Bumper", file:"ELSTHETIC_BUMPER.mp4", kind:"video", w:1920, h:1080 },    // nama file mengikuti tabel CMD (huruf besar)
 { title:"Smart Entrepreneur Muslim", format:"Video", company:"—", type:"Book Trailer", file:"BOOK.mp4", kind:"video", w:1920, h:1080 },                 // [CONFIRM company]
 // Tidak tampil (enabled:false) — ada di folder tetapi tidak ada di daftarmu:
 { title:"Aishi Aesthetic Academy Bumper", format:"Video", company:"Aishi Aesthetic Academy", type:"Bumper", file:"AISHI AESTHETIC_BUMPER.mp4", kind:"video", w:1920, h:1080, enabled:false },
 { title:"ELS Corp Bumper", format:"Video", company:"ELS Corp", type:"Bumper", file:"ELS_BUMPER.mp4", kind:"video", w:1920, h:1080, enabled:false },
 { title:"Training Flyer 1", format:"Feed", company:"Aishi Aesthetic Academy", type:"Promotion", file:"flyer_pelatihan_1.png", kind:"image", w:1080, h:1350, enabled:false },
 { title:"Training Flyer 2", format:"Feed", company:"Aishi Aesthetic Academy", type:"Promotion", file:"flyer_pelatihan_2.png", kind:"image", w:1080, h:1350, enabled:false },
];
```
Judul bertanda tahun/tanggal dalam tanda kurung di data disimpan sebagai bagian dari judul (sesuai tulisanmu).

---

## §18 CONTACT (`Aset_7.png`)
```
|                                                                       INDEX |
|                                                                             |
|        Email                  Social Media                 WA/Phone         |
|  jassintaroidt@gmail.com   Instagram: @jassinta.roid   +62 81919 0325 18    |
|                                                                             |
| 2026                    Jassinta Roid Triniti                       INDEX   |
```
- 3 kolom (HP: 1 kolom bertumpuk), rata tengah vertikal-horizontal, latar gelap `--aubergine→--plum-night` bertekstur (film grain putih) + media/pola redup.
- Judul kolom 66px/fluid Sentient: `Email` **Bold**, `Social Media` **Bold Italic**, `WA/Phone` **Bold**.
- Nilai: **Poppins italic 24,9px** (fluid ≤ 1.556rem): `jassintaroidt@gmail.com` (`mailto:`), `Instagram: @jassinta.roid` (tautan `https://www.instagram.com/jassinta.roid/`, tab baru), `+62 81919 0325 18` (`tel:+6281919032518`; tautan WhatsApp `https://wa.me/6281919032518`). Hover: garis bawah pink; tombol kecil "Copy" untuk email & nomor (feedback "Copied!").
- Tombol INDEX kanan atas; footer §7.5 (kanan = INDEX). **Tidak ada robekan di dasar Contact** (section terakhir).

---

## §19 MANIFEST MEDIA (NAMA FILE BENAR — jangan diubah)

> Nama di tabel CMD adalah yang paling benar. Tempatkan: video → `public/assets/video/`, gambar → `public/assets/img/`, flipbook → `public/assets/flipbook/rush_07/` dan `.../pandora/`. Buat `media-manifest.ts` dari data ini (nama, jenis, w, h, folder) dan `scripts/check-media.mjs` (cek keberadaan + dimensi dengan `image-size`; laporkan: hilang, ukuran berbeda, salah huruf besar/kecil).

### 19.1 Gambar
| Nama file | W×H |
|---|---|
| Flyer Hari Besar 1_Lassiewear.png … Flyer Hari Besar 4_Lassiewear.png | 1080×1350 |
| flyer_kecantikan_1.jpg | 1080×1072 |
| flyer_kecantikan_2.jpg, flyer_kecantikan_3.jpg, flyer_kecantikan_6.jpg | 1080×1080 |
| flyer_kecantikan_4.jpg | 1080×1077 |
| flyer_kecantikan_5.jpg | 1080×1079 |
| flyer_pelatihan_1.png, flyer_pelatihan_2.png | 1080×1350 |
| Footage Konten Education 1…5_Lassiewear.jpg | 1080×1920 |
| Footage Konten Entertainment 1…5_Lassiewear.jpg | 1080×1920 |
| Footage Konten Fun 2_Lassiewear 1.jpg, Fun 2_Lassiewear.jpg, Fun 3_Lassiewear.jpg, Fun 4_Lassiewear.jpg | 1080×1920 |
| Footage Konten Hardselling 1…5_Lassiewear.jpg | 1080×1920 |
| Inspirasi Konten Education_Lassiewear.jpg, Inspirasi Konten Entertainment_Lassiewear.jpg, Inspirasi Konten Fun_Lassiewear.jpg, Inspirasi Konten Hardselling_Lassiewear.jpg (cek varian "Lassiwear") | 1080×1920 |
| FOTO JASSINTA ROID TRINITI ESTETIK.png | 1203×677 |
| FOTO JASSINTA TAMPAK DEPAN.png | 500×500 |
| foto_jassinta_duduk.png | 408×612 |
| foto_jassinta_setengah_badan.png | 1980×1980 |
| Ikapunija_1.png, Ikapunija_2.png, Ikapunija_3.png | 520×520 |
| IMN_1.png … IMN_4.png | 520×520 |
| innalar_1.png … innalar_4.png | 520×520 |
| logo_1.png … logo_10.png | (placeholder kertas 1980×1980) |
| pandora_1.jpg … pandora_8.jpg | 1100×1747 |
| Partisipasi Sebagai Peserta Magang Indonesia Mengudara.jpg | 1949×1276 |
| Partisipasi Sebagai Peserta Magang Kementerian Agama RI.jpg | 1500×1097 |
| Partisipasi Sebagai Peserta Pelatihan Bidang Menulis Berita Siber.jpg | 1500×1092 |
| Partisipasi Sebagai Peserta Y20 Indonesia.jpg | 1003×1500 |
| Partisipasi Sebagai Staff bendahara Umum Comic Club.jpg | 1512×1115 |
| Penghargaan ISTC Indonesia.jpg | 1500×1105 |
| Penghargaan Produser Kartini Radio Terbaik.jpg | 717×892 |
| Penghargaan Tim Siar Kartini Terbaik.jpg | 1949×1276 |
| rush_07_1.jpg | 1000×704 *(landscape → spread)* |
| rush_07_63.jpg, rush_07_64.jpg, rush_07_65.jpg | 1000×1393 |
| rush_07_2 … rush_07_62, rush_07_66 … rush_07_89 | 1000×1419 |
| Vintage Cindy 1…17.jpg | 1080 × {1=1430, 2=1440, 3=1440, 4=1439, 5=1438, 6=1440, 7=1440, 8=1440, 9=1440, 10=1440, 11=1432, 12=1449, 13=1440, 14=1447, 15=1440, 16=1440, 17=1431} |

### 19.2 Video
| Nama file | Piksel |
|---|---|
| AISHI AESTHETIC_BUMPER.mp4, BOOK.mp4, ELSTHETIC_BUMPER.mp4, ELS_BUMPER.mp4, KARAMINA_TOUR_BUMPER.mp4, SCHOOL_BUMPER.mp4 | 1920×1080 |
| Hasil Konten Education Lassiewear.mp4, Hasil Konten Entertainment Lassiewear.mp4, Hasil Konten Fun Lassiewear.mp4, Hasil Konten Hardselling Lassiewear.mp4 | 1080×1920 |
| intro.mp4 | 1080×1920 |
| kecantikan_1.mp4 … kecantikan_3.mp4, kuliner_1.mp4 … kuliner_3.mp4, travel_1.mp4 … travel_3.mp4 | 1080×1920 |

### 19.3 Aturan nama
Huruf besar/kecil, spasi, dan ekstensi persis. `mediaUrl()` meng-encode spasi (`%20`). Jangan mengganti nama file di repo; bila ada selisih nama antara bagian-bagian brief ini, **tabel §19 yang menang**.

### 19.4 Optimasi (opsional tetapi sangat disarankan sebelum commit; **nama asli tetap**)
- Poster video: `scripts/make-posters.sh` → untuk tiap `.mp4`: `ffmpeg -i "in.mp4" -ss 00:00:01 -frames:v 1 -vf scale=720:-2 -q:v 3 "public/assets/posters/<nama>.jpg"`.
- Kompres video: `ffmpeg -i in.mp4 -c:v libx264 -crf 26 -preset slow -vf "scale=720:-2" -movflags +faststart -an(untuk hero/reveal) out.mp4` (target ≤ 8–15 MB; `intro.mp4` tetap ada audio).
- Gambar: `scripts/optimize-media.mjs` (sharp) membuat sibling `.webp` bernama sama (`nama.webp`); `<SafeImage>` mencoba `.webp` dulu (via `<picture>`) lalu file asli. JPG foto besar → lebar maks 1600px.

---

## §20 KRITERIA SELESAI (Definition of Done)
1. `npm run build` & `npm run typecheck` & `npm test` & `npm run check:refs` lulus; `npm run check:media` tidak melaporkan file hilang yang `enabled`.
2. Loker tertutup & terbuka utuh sampai footer di semua ukuran §8.5; ukuran identik; tanpa gambar referensi.
3. Semua barang: tidak melayang, tidak tertimpa, label hover tidak tertutup/terpotong; kecuali dekoratif, semua membuka halaman yang benar; Back menutup overlay.
4. Enam robekan realistis (seed 101–606), menyatu dengan latar, tanpa celah, tanpa strip putih; grain berhenti di kontur.
5. Archive engine lulus semua unit test; tidak ada karya terpotong; urutan acak.
6. Tidak ada horizontal scroll di semua ukuran; Lighthouse Mobile Perf ≥ 70, A11y ≥ 90.
7. Teks website 100% English; judul karya tetap asli.
8. Deploy Vercel sukses dan semua media termuat (nama case-sensitive benar).

---

## §21 KONFIGURASI DEPLOY (Vercel)
`vercel.json`:
```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "headers": [
    { "source": "/assets/(.*)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] },
    { "source": "/fonts/(.*)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] }
  ],
  "rewrites": [{ "source": "/((?!assets/|fonts/).*)", "destination": "/index.html" }]
}
```
`.vercelignore`: `reference/`, `qa/`, `docs/`, `*.pdf`, `node_modules/`. Environment: `VITE_MEDIA_BASE_URL` (kosong = same origin). Node ≥ 20. Jangan commit `reference/` bila repo publik (opsional, hak cipta gambar referensi).