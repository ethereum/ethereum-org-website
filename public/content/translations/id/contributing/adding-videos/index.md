---
title: Menambahkan Video
description: Kebijakan untuk menambahkan video ke ethereum.org
lang: id
---

# Menambahkan Video {#adding-videos}

[Galeri video ethereum.org](/videos/) menampilkan video tentang Ethereum dan ekosistem Ethereum dari kreator komunitas dan sumber tepercaya. Siapa pun dapat menyarankan video untuk ditambahkan.

## Kebijakan pencantuman {#listing-policy}

Ethereum.org adalah sumber daya edukasi yang netral. Galeri video dikurasi untuk:

- **Mengedukasi** pengguna tentang teknologi, ekosistem, dan komunitas Ethereum
- **Tetap akurat** dalam konten teknisnya
- **Tetap relevan** bagi komunitas Ethereum

Situs ini tidak mencantumkan video yang utamanya mempromosikan produk, token, atau layanan komersial tertentu.


## Kriteria penyertaan
## Kriteria penyertaan {#criteria-for-inclusion}

### Wajib ada {#must-haves}

- **Berfokus pada Ethereum** – Video harus utamanya membahas tentang Ethereum, teknologinya, ekosistemnya, atau komunitasnya. Video tentang topik rantai blok umum hanya dapat diterima jika secara substansial mendukung atau berkaitan dengan halaman edukasi di situs ini, atau merujuk pada Ethereum.
- **Nilai edukasi** – Video harus mengajarkan penonton sesuatu tentang Ethereum, atau merayakan komunitas Ethereum global. Konten promosi atau pemasaran tidak akan diterima.
- **Informasi akurat** – Konten teknis harus benar secara faktual dan mutakhir. Video usang tentang fitur yang sudah tidak digunakan lagi mungkin akan dihapus.
- **Produksi berkualitas** – Video harus memiliki kualitas audio dan video yang cukup jelas.
- **Tersedia untuk publik** – Video harus di-host di sumber daya terbuka atau platform yang dapat diakses seperti YouTube, dan dapat diakses secara bebas tanpa batasan berbayar (paywall) atau persyaratan pendaftaran.

### Sebaiknya ada {#nice-to-haves}

- **Memiliki transkrip** – Video dengan transkrip meningkatkan aksesibilitas dan SEO. Jika Anda tidak memilikinya, tim ethereum.org dapat membantu membuatnya.
- **Dari sumber yang kredibel** – Konten dari pendidik, peneliti, dan sumber yang sudah mapan mendapat prioritas.
- **Tepat waktu dan abadi (evergreen)** – Konten yang tetap relevan seiring berjalannya waktu lebih disukai daripada materi yang sensitif terhadap waktu.


## Cara menambahkan video
## Cara menambahkan video {#how-to-add-a-video}

### Opsi 1: Buka sebuah isu (issue) {#open-an-issue}

Jika Anda ingin menyarankan video tetapi tidak ingin membuat filenya sendiri, buka isu GitHub dengan detail video tersebut dan seorang kontributor dapat membantu menambahkannya untuk Anda.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?template=suggest_video.yaml">
  Sarankan video
</ButtonLink>

### Opsi 2: Buka pull request {#open-a-pull-request}

Jika Anda ingin menambahkan video sendiri, ikuti langkah-langkah berikut:

#### Langkah 1: Buat file video {#step-1}

Buat direktori baru dan file `index.md` di:

```
public/content/videos/{slug-video-anda}/index.md
```

Slug harus aman untuk URL, menggunakan huruf kecil, dan menggunakan tanda hubung (misalnya, `blockchain-101-visual-demo`).

#### Langkah 2: Tambahkan frontmatter {#step-2}

Tambahkan frontmatter YAML berikut ke `index.md` Anda:

```yaml
---
title: "Your Video Title"
description: "A brief 1–3 sentence summary of the video."
lang: en
youtubeId: "dQw4w9WgXcQ"
uploadDate: 2025-01-15
duration: "12:30"
educationLevel: beginner
topic:
  - "your-topic"
  - "another-topic"
format: explainer
author: Channel Name
---
```

**Referensi bidang:**

| Bidang | Wajib | Deskripsi |
|---|---|---|
| `title` | Ya | Judul video |
| `description` | Ya | Ringkasan 1–3 kalimat |
| `lang` | Ya | Selalu `en` untuk saat ini |
| `youtubeId` | Ya | ID video YouTube (dari URL setelah `v=`) |
| `uploadDate` | Ya | Tanggal unggah asli dalam format `YYYY-MM-DD` |
| `duration` | Ya | Durasi video sebagai `H:MM:SS` atau `M:SS` |
| `educationLevel` | Ya | `beginner`, `intermediate`, atau `advanced` |
| `topic` | Ya | Array tag topik untuk pemfilteran galeri |
| `format` | Ya | `explainer`, `presentation`, `interview`, `tutorial`, atau `panel` |
| `author` | Ya | Nama kreator atau saluran |
| `breadcrumb` | Tidak | Label pendek kustom untuk navigasi breadcrumb |
| `customThumbnailUrl` | Tidak | URL gambar mini (thumbnail) kustom (secara default menggunakan gambar mini YouTube) |

#### Langkah 3: Tambahkan transkrip (disarankan) {#step-3}

Di bawah frontmatter `---`, tambahkan transkrip video dalam format markdown:

```markdown
---
title: "..."
# ... sisa frontmatter
---

Pengantar singkat tentang konten video.

### Judul Bagian (0:00)

Teks transkrip untuk bagian ini...

### Bagian Selanjutnya (5:30)

Teks transkrip lainnya...
```

Gunakan heading `###` dengan stempel waktu untuk menandai bagian-bagian utama. Ini membuat transkrip mudah dipindai dan meningkatkan SEO.

Jika Anda tidak memiliki transkrip, Anda dapat membiarkan bagian isi (body) kosong dan tim akan membuatnya.

#### Langkah 4: Pilih tag topik {#step-4}

Pilih tag topik yang cocok dengan kategori yang ada yang digunakan di galeri. Kategori saat ini dan tagnya meliputi:

- **Cara Kerja Ethereum**: `how-ethereum-works`, `consensus`, `blockchain`, `cryptography`, `accounts`, `ethereum`, `intro`, `transactions`, `pos`, `smart-contracts`
- **Peningkatan Jaringan**: `network-upgrades`, `upgrades`, `pectra`, `dencun`, `eip-4844`, `blobs`, `fusaka`
- **Peta Jalan & Prioritas**: `roadmap-and-priorities`, `pbs`, `mev`
- **Penskalaan & Lapisan 2**: `scaling-and-layer-2`, `scaling`, `layer-2`, `rollups`, `optimistic-rollups`, `zk-rollups`
- **Kasus Penggunaan**: `use-cases`, `defi`, `finance`, `nfts`, `erc-721`, `erc-1155`, `lending`, `dapps`, `restaking`, `eigenlayer`, `dao`, `identity`, `desci`, `refi`
- **Privasi & Keamanan**: `privacy-and-security`, `privacy`, `authentication`
- **Kisah Komunitas**: `community-stories`, `contributing`, `translations`, `community`

Untuk memastikan video Anda muncul di rak kategori galeri, sertakan setidaknya satu tag kunci kategori (nama yang dicetak tebal dalam format kebab-case, mis. `use-cases` atau `scaling-and-layer-2`). Video tanpa tag kategori yang dikenali hanya akan muncul di tampilan "Semua" dan hasil pencarian.

Anda juga dapat menggunakan tag baru — tag tersebut akan tersedia untuk pengelompokan kategori di masa mendatang.

#### Langkah 5: Kirimkan PR Anda {#step-5}

Buka pull request dengan perubahan Anda ke cabang `dev`. Tim akan meninjau kiriman Anda dan memberikan umpan balik.


## Pemeliharaan
Video yang dicantumkan ditinjau secara rutin untuk memastikan video tersebut:

- Masih memenuhi kriteria pencantuman
- Berisi informasi yang akurat dan mutakhir
- Memiliki tautan hosting/YouTube yang berfungsi

Jika Anda menemukan masalah pada video yang dicantumkan, [buat sebuah isu](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+✨,content+🖋️&template=suggest_video.yaml) atau kirim email ke [website@ethereum.org](mailto:website@ethereum.org).
## Pemeliharaan {#maintenance}

Video yang dicantumkan ditinjau secara rutin untuk memastikan video tersebut:

- Masih memenuhi kriteria pencantuman
- Berisi informasi yang akurat dan mutakhir
- Memiliki tautan hosting/YouTube yang berfungsi

Jika Anda melihat masalah pada video yang dicantumkan, [buat sebuah isu](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+✨,content+🖋️&template=suggest_video.yaml) atau kirim email ke [website@ethereum.org](mailto:website@ethereum.org).


## Ketentuan penggunaan
Silakan merujuk pada [ketentuan penggunaan](/terms-of-use/) ethereum.org. Informasi di ethereum.org disediakan semata-mata untuk tujuan informasi umum.
## Ketentuan penggunaan {#terms-of-use}

Harap merujuk pada [ketentuan penggunaan](/terms-of-use/) ethereum.org. Informasi di ethereum.org disediakan semata-mata untuk tujuan informasi umum.
