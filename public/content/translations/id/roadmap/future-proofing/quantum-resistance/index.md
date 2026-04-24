---
title: Kriptografi pasca-kuantum di Ethereum
description: Bagaimana Ethereum bersiap menghadapi era pasca-kuantum, apa saja yang rentan, dan apa yang sedang dibangun untuk melindunginya.
lang: id
image: /images/roadmap/roadmap-future.png
alt: "Peta jalan Ethereum"
template: roadmap
summaryPoints:
  - Komputer kuantum pada akhirnya akan mengancam kriptografi yang digunakan Ethereum saat ini
  - Yayasan Ethereum memiliki tim riset pasca-kuantum khusus, dan peta jalan "Lean Ethereum" terstruktur yang menargetkan tahun 2029 untuk perlindungan pasca-kuantum penuh
  - Dana Anda aman saat ini dan perangkat lunak dompet akan memandu Anda melalui migrasi di masa depan
---

Komputer kuantum pada akhirnya akan mampu menembus metode kriptografi yang mengamankan Ethereum dan sebagian besar sistem digital lainnya saat ini. Halaman ini menjelaskan apa artinya hal tersebut, bagaimana jaringan secara proaktif mengembangkan peningkatan untuk memitigasi risiko ini, dan apa yang perlu Anda ketahui.

## Mengapa kriptografi pasca-kuantum penting {#why-post-quantum-matters}

Ethereum bergantung pada beberapa bentuk [kriptografi](/glossary/#cryptography) untuk menjaga jaringan tetap aman dan melindungi dana pengguna. Yang paling penting adalah:

- **Elliptic curve digital signature algorithm (ECDSA)**: Kriptografi yang digunakan untuk menandatangani transaksi. Keamanan akun Ethereum Anda bergantung pada hal ini.
- **Tanda tangan BLS**: Digunakan oleh [validator](/glossary/#validator) untuk mencapai [konsensus](/glossary/#consensus) pada state jaringan.
- **Komitmen polinomial KZG**: Digunakan untuk [Ketersediaan data](/glossary/#data-availability) dalam peta jalan penskalaan Ethereum.
- **Sistem ZK-proof**: Digunakan oleh rollup dan aplikasi lain untuk memverifikasi komputasi secara offchain.

Semua ini bergantung pada struktur matematika, seperti grup Abelian, yang sulit bagi komputer klasik tetapi dapat dipecahkan secara efisien oleh komputer kuantum menggunakan [algoritma Shor](https://en.wikipedia.org/wiki/Shor%27s_algorithm).

### Kapan komputer kuantum akan mengancam Ethereum? {#when-will-quantum-computers-threaten-ethereum}

Pada bulan Maret 2026, Google Quantum AI menerbitkan riset yang memperkirakan bahwa menembus kriptografi kurva eliptik 256-bit (jenis yang digunakan Ethereum untuk tanda tangan akun) mungkin memerlukan sekitar 1.200 qubit logis. Perkiraan sebelumnya menempatkan angka ini jauh lebih tinggi. Google telah menetapkan tenggat waktu internal tahun 2029 untuk memigrasikan sistemnya sendiri ke kriptografi pasca-kuantum.

Perangkat keras kuantum saat ini masih jauh dari skala ini, beroperasi dengan beberapa ribu qubit fisik yang bising. Qubit logis (yang mengoreksi kesalahan dan melakukan komputasi yang andal) masing-masing memerlukan banyak qubit fisik. **Kesenjangan antara perangkat keras saat ini dan apa yang dibutuhkan untuk menembus kriptografi Ethereum masih signifikan, tetapi menyempit lebih cepat dari yang diperkirakan banyak orang.** Khususnya, Institut Standar dan Teknologi Nasional AS (NIST) mengantisipasi penghentian penggunaan ECDSA pada tahun 2030 dan melarangnya pada tahun 2035.

Ini bukanlah ancaman yang akan segera terjadi. Namun, transisi kriptografi membutuhkan waktu bertahun-tahun, dan model keamanan Ethereum dirancang untuk bertahan berabad-abad. Respons Ethereum adalah peta jalan **Lean Ethereum**, sebuah misi multi-tahun yang disengaja untuk membangun kembali Ethereum di sekitar primitif yang akan bertahan dari ancaman kriptografi apa pun.

## Empat area yang rentan terhadap serangan kuantum {#four-vulnerable-areas}

Pada bulan Februari 2026, Vitalik Buterin [menerbitkan peta jalan](https://x.com/VitalikButerin/status/2027075026378543132) yang mengidentifikasi empat area berbeda dari kriptografi Ethereum yang memerlukan peningkatan pasca-kuantum. Masing-masing memiliki tantangan dan jalur solusi yang berbeda.

### 1. Tanda tangan BLS lapisan konsensus {#consensus-bls}

**Fungsinya**: Protokol [Bukti Kepemilikan (PoS)](/glossary/#pos) Ethereum menggunakan tanda tangan BLS untuk mengagregasi suara dari ratusan ribu validator. BLS memungkinkan banyak tanda tangan digabungkan menjadi satu, menjaga jaringan tetap efisien.

**Mengapa ini rentan**: Tanda tangan BLS bergantung pada pemasangan kurva eliptik, yang dapat ditembus oleh komputer kuantum.

**Pendekatannya**: Peta jalan Lean Consensus mencakup pengembangan dua alat yang saling melengkapi:
- **leanXMSS**: Ethereum akan mengganti tanda tangan BLS dengan leanXMSS, sebuah skema tanda tangan berbasis hash untuk validator. Tanda tangan berbasis hash dianggap aman dari kuantum karena hanya bergantung pada keamanan fungsi hash, yang dilemahkan oleh komputer kuantum tetapi tidak ditembus.
- **leanVM**: Sebuah zkVM (mesin virtual zero-knowledge) minimal untuk agregasi tanda tangan berbasis SNARK. Karena tanda tangan berbasis hash berukuran jauh lebih besar (sekitar 3.000 byte dibandingkan dengan 96 byte untuk BLS), beralih ke leanXMSS akan menghasilkan lebih banyak data per slot secara signifikan. Untuk mengatasi hal ini, leanVM bertindak sebagai mesin agregasi, mengompresi data hingga 250x. Ini mempertahankan manfaat efisiensi dari menggabungkan banyak tanda tangan menjadi satu, bahkan setelah beralih ke skema yang aman dari kuantum.

<ExpandableCard title="Why can't Ethereum just replace BLS with a quantum-safe scheme?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked why cant ethereum just replace BLS?">

Sifat agregasi yang membuat BLS efisien (menggabungkan ratusan ribu tanda tangan menjadi satu) tidak memiliki padanan aman-kuantum yang jelas. Tanda tangan pasca-kuantum juga jauh lebih besar daripada tanda tangan BLS. Sekadar menukar satu dengan yang lain akan membuat lapisan konsensus Ethereum menjadi jauh lebih lambat dan lebih mahal. Itulah sebabnya tim sedang membangun leanVM, sebuah alat yang menggunakan bukti tanpa pengetahuan (ZKP) untuk mengagregasi tanda tangan aman-kuantum secara efisien.

</ExpandableCard>

### 2. Ketersediaan data: Komitmen KZG {#data-availability-kzg}

**Fungsinya**: Komitmen polinomial KZG memastikan bahwa data (terutama data [blob](/glossary/#blob) dari rollup) tersedia di jaringan tanpa mewajibkan setiap node untuk mengunduh semuanya.

**Mengapa ini rentan**: Komitmen KZG bergantung pada pemasangan kurva eliptik, struktur matematika yang sama yang dapat diserang oleh komputer kuantum.

**Mitigasi saat ini**: Komitmen KZG menggunakan "pengaturan tepercaya" di mana banyak peserta menyumbangkan keacakan. Selama setidaknya ada satu peserta yang jujur dan membuang rahasia mereka, pengaturan tersebut aman, bahkan terhadap komputer kuantum yang mencoba merekayasa baliknya setelah fakta terjadi.

**Solusi jangka panjang**: Mengganti KZG dengan skema komitmen aman-kuantum. Dua kandidat utamanya adalah:
- **Komitmen berbasis STARK**: Bergantung pada fungsi hash alih-alih kurva eliptik. Sudah digunakan di beberapa ZK-rollup.
- **Komitmen berbasis kisi (Lattice)**: Bergantung pada tingkat kesulitan masalah kisi, yang diyakini tahan terhadap kuantum.

Kedua pendekatan ini masih diteliti untuk efisiensi dan kepraktisannya pada skala Ethereum.

### 3. Tanda tangan akun: ECDSA {#eoa-signatures}

**Fungsinya**: Setiap akun Ethereum standar (akun yang dimiliki secara eksternal, atau [EOA](/glossary/#eoa)) menggunakan ECDSA pada kurva secp256k1 untuk menandatangani transaksi. Inilah yang melindungi dana Anda.

**Mengapa ini rentan**: Untuk setiap akun yang telah mengirim transaksi, kunci publiknya terekspos onchain. Komputer kuantum dapat memperoleh kunci privat dari data kunci publik yang terekspos ini.

**Nuansa penting**: Akun yang hanya pernah menerima Ether dan tidak pernah mengirim transaksi belum mengekspos kunci publik mereka. Hanya alamat (sebuah hash dari kunci publik) yang terlihat, yang memberikan perlindungan tambahan.

**Pendekatannya**: Alih-alih migrasi tunggal di seluruh protokol, Ethereum berencana menggunakan [abstraksi akun](/roadmap/account-abstraction/) (khususnya EIP-8141, yang sedang dipertimbangkan untuk Hegotá pada paruh kedua tahun 2026) untuk memberikan **kelincahan tanda tangan** kepada pengguna. Akun individu dapat beralih ke skema tanda tangan pasca-kuantum tanpa menunggu seluruh protokol berubah.

Ini adalah pendekatan yang pragmatis. Pengguna dan dompet yang menginginkan perlindungan pasca-kuantum lebih awal dapat mengadopsinya secara sukarela, sementara migrasi yang lebih luas terjadi seiring berjalannya waktu.

### 4. Bukti tanpa pengetahuan (ZK-proof) lapisan aplikasi {#zk-proofs}

**Fungsinya**: Sistem bukti tanpa pengetahuan (ZK-proof) digunakan oleh rollup lapisan 2 (L2) dan aplikasi lain untuk memverifikasi komputasi tanpa mengungkapkan data yang mendasarinya.

**Mengapa ini rentan**: Banyak sistem ZK-proof populer (SNARK yang menggunakan pemasangan kurva eliptik) bergantung pada asumsi yang rentan terhadap kuantum.

**Pendekatannya**: STARK, yang bergantung pada fungsi hash alih-alih kurva eliptik, sudah tahan terhadap kuantum dan digunakan oleh beberapa rollup. Adopsi ekosistem alami dari sistem berbasis STARK telah memberikan keamanan pasca-kuantum di lapisan aplikasi.

## Standar NIST {#nist-standards}

Pada bulan Agustus 2024, Institut Standar dan Teknologi Nasional AS (NIST) [memfinalisasi tiga standar kriptografi pasca-kuantum](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards). Hal ini penting karena memberikan seluruh industri teknologi, termasuk Ethereum, serangkaian algoritma teruji bersama untuk dibangun alih-alih setiap proyek menciptakan algoritmanya sendiri.

| Standar | Nama | Jenis | Kasus penggunaan |
|----------|------|------|----------|
| FIPS 203 | ML-KEM | Berbasis kisi (Lattice) | Enkapsulasi kunci (pertukaran kunci) |
| FIPS 204 | ML-DSA (Dilithium) | Berbasis kisi (Lattice) | Tanda tangan digital |
| FIPS 205 | SLH-DSA (SPHINCS+) | Berbasis hash | Tanda tangan digital |

Standar-standar ini memberikan fondasi bagi transisi pasca-kuantum industri yang lebih luas. Pekerjaan Ethereum dibangun di atas dan memperluas standar ini, dengan fokus khusus pada tantangan unik dari jaringan terdesentralisasi di mana efisiensi dan agregasi sangat penting.

## Pendekatan Yayasan Ethereum {#ef-approach}

Yayasan Ethereum membentuk tim Keamanan Pasca-Kuantum khusus pada bulan Januari 2026, yang dipimpin oleh Thomas Coratger. Pekerjaan tim ini dilacak secara publik di [pq.ethereum.org](https://pq.ethereum.org).

### Aktivitas saat ini (per April 2026) {#current-activity}

- **Devnet interop mingguan**: Lebih dari 10 tim klien berpartisipasi dalam pengujian interoperabilitas pasca-kuantum reguler, termasuk Lighthouse, Grandine, Zeam, Ream Labs, dan PierTwo.
- **Poseidon Prize**: Hadiah riset senilai $1 juta yang menargetkan peningkatan pada primitif kriptografi berbasis hash.
- **Implementasi sumber terbuka**: leanXMSS, leanVM, leanSpec (Python), leanSig (Rust), dan leanMultisig semuanya tersedia di bawah [organisasi GitHub leanEthereum](https://github.com/leanEthereum).
- **Retret Riset PQ Tahunan ke-2**: Direncanakan pada 9-Okt-2026 hingga 12-Okt-2026 di Cambridge, Inggris.
- **Penyelarasan NIST**: Pekerjaan Ethereum dibangun di atas standar kriptografi pasca-kuantum yang difinalisasi oleh NIST pada bulan Agustus 2024 (seperti ML-KEM, ML-DSA, dan SLH-DSA).

### Pencapaian migrasi {#migration-milestones}

Tim telah menguraikan serangkaian peningkatan protokol untuk secara bertahap memperkenalkan kriptografi pasca-kuantum ke dalam Ethereum. Ini adalah pencapaian perencanaan, bukan komitmen yang dijamin. Nama dan urutan dapat berubah.

| Pencapaian | Apa yang diperkenalkan |
|-----------|--------------------|
| I* | Registri kunci PQ. Validator dapat mendaftarkan kunci publik pasca-kuantum bersama dengan kunci BLS yang ada. |
| J* | Prakompilasi verifikasi tanda tangan PQ. Kontrak pintar dan dompet dapat memverifikasi tanda tangan PQ secara native. |
| L* | Atestasi PQ dan bukti lapisan konsensus waktu nyata melalui leanVM. Validator mulai menggunakan tanda tangan PQ untuk konsensus. |
| M* | Agregasi tanda tangan PQ penuh dan komitmen blob yang aman dari PQ. |

**Target**: Pencapaian percabangan terstruktur menargetkan penyelesaian infrastruktur inti pasca-kuantum pada sekitar tahun 2029. Migrasi lapisan eksekusi dan ekosistem secara penuh akan berlanjut setelah itu.

## Apa yang perlu dilakukan pengguna? {#what-users-need-to-do}

**Saat ini: tidak ada.** Dana Anda aman. Tidak ada komputer kuantum saat ini yang dapat mengancam kriptografi Ethereum.

**Di masa depan**: Setelah skema tanda tangan pasca-kuantum didukung secara luas di Ethereum (diharapkan setelah percabangan keras Hegotá dan implementasi EIP-8141), Anda akan ingin memigrasikan akun Anda ke tanda tangan aman-kuantum. Perangkat lunak dompet akan memandu Anda melalui transisi ini.

Jika akun Anda tidak pernah mengirim transaksi (artinya kunci publik Anda belum terekspos onchain), akun tersebut memiliki lapisan perlindungan tambahan. Namun, semua akun pada akhirnya harus bermigrasi.

Pertanyaan tentang bagaimana menangani dompet yang tidak aktif (akun yang pemiliknya mungkin tidak menyadari perlunya bermigrasi) adalah topik tata kelola yang terbuka. Komunitas Ethereum belum mencapai konsensus mengenai hal ini.

## Pertanyaan yang sering diajukan {#faq}

<ExpandableCard title="Can quantum computers steal my ETH today?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked can quantum computers steal my ETH today?">

**Tidak.** Tidak ada komputer kuantum saat ini yang dapat menembus kriptografi Ethereum. Perangkat keras kuantum saat ini masih jauh dari skala yang dibutuhkan. Pekerjaan yang dijelaskan di halaman ini adalah persiapan untuk masa depan, bukan respons terhadap ancaman aktif.

</ExpandableCard>

<ExpandableCard title="When could quantum computers become a threat?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked when could quantum computers become a threat?">

Perkiraannya bervariasi. Riset Google pada bulan Maret 2026 menunjukkan bahwa perangkat keras yang dibutuhkan untuk menembus kriptografi kurva eliptik 256-bit paling cepat dapat hadir sekitar akhir dekade ini, tetapi tantangan rekayasa yang signifikan masih ada. Sebagian besar peneliti menganggap ancaman yang realistis setidaknya masih beberapa tahun lagi. Jawaban jujurnya adalah tidak ada yang tahu garis waktu pastinya, dan itulah sebabnya persiapan dari sekarang sangatlah penting.

</ExpandableCard>

<ExpandableCard title="Will I need to do anything to protect my wallet?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked will I need to do anything?">

Pada akhirnya, ya. Setelah skema tanda tangan pasca-kuantum tersedia di Ethereum, pengguna akan ingin memigrasikan akun mereka. Perangkat lunak dompet kemungkinan akan menangani transisi ini untuk Anda. Untuk saat ini, tidak ada yang perlu Anda lakukan. Ketika tindakan diperlukan, komunitas Ethereum dan pengembang dompet akan memberikan panduan dan alat yang jelas.

</ExpandableCard>

<ExpandableCard title="What about my tokens, NFTs, and DeFi positions?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked what about tokens NFTs DeFi?">

Aset di Ethereum dikendalikan oleh tanda tangan akun. Setelah akun Anda dimigrasikan ke skema tanda tangan aman-kuantum, semua yang ada di akun tersebut akan terlindungi. Anda tidak perlu memigrasikan setiap aset secara individual. Kontrak pintar yang menyimpan dana (seperti protokol keuangan terdesentralisasi (DeFi)) mungkin memerlukan peningkatannya sendiri tergantung pada primitif kriptografi apa yang mereka gunakan secara internal.

</ExpandableCard>

<ExpandableCard title="Is Ethereum behind other blockchains on this?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked is Ethereum behind?">

Tidak. Ethereum memiliki salah satu program pasca-kuantum paling terstruktur dari rantai blok mana pun: tim khusus, riset yang didanai, devnet mingguan, dan peta jalan migrasi yang dipublikasikan, yang memperlakukan komputasi kuantum sebagai batasan desain kelas satu. Belum ada rantai blok yang menyelesaikan transisi pasca-kuantum secara penuh. Menurut perkiraan Yayasan Ethereum, eksposur dana tidak aktif Ethereum yang rentan terhadap kuantum adalah sekitar 0,1%, secara drastis lebih rendah daripada jaringan rantai blok utama lainnya.

</ExpandableCard>

<ExpandableCard title="What is 'harvest now, decrypt later'?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked what is harvest now decrypt later?">

"Panen sekarang, dekripsi nanti" (Harvest now, decrypt later) adalah serangan di mana seseorang merekam data terenkripsi atau kunci publik yang terekspos saat ini, lalu menembus enkripsinya nanti setelah komputer kuantum yang cukup kuat tersedia. Untuk Ethereum, ini paling relevan dengan akun yang kunci publiknya sudah terekspos onchain (akun mana pun yang telah mengirim transaksi). Ini adalah salah satu alasan komunitas memperlakukan migrasi pasca-kuantum sebagai hal yang sensitif terhadap waktu meskipun ancaman kuantum belum terjadi dalam waktu dekat.

</ExpandableCard>

## Bacaan lebih lanjut {#further-reading}

- [pq.ethereum.org](https://pq.ethereum.org) - _Yayasan Ethereum_
- [Proyek Kriptografi Pasca-Kuantum](https://pse.dev/projects/post-quantum-cryptography) - _Privacy Stewards of Ethereum (PSE)_
- [Standar Kriptografi Pasca-Kuantum NIST](https://csrc.nist.gov/projects/post-quantum-cryptography) - _NIST_
- [Mengamankan mata uang kripto dengan mengungkapkan kerentanan kuantum secara bertanggung jawab](https://research.google/blog/safeguarding-cryptocurrency-by-disclosing-quantum-vulnerabilities-responsibly/) - _Google Quantum AI_
- [Batas kuantum mungkin lebih dekat dari yang terlihat](https://blog.google/innovation-and-ai/technology/safety-security/cryptography-migration-timeline/) - _Google_
- [KZG dan pengaturan tepercaya](/roadmap/danksharding/#what-is-kzg)
- [Sumber daya lokakarya leanVM + PQ Lean Week Cambridge (2025)](https://github.com/leanEthereum/pm/blob/main/workshops-and-interops/2025/lean-week-cambridge/index.md) - _Lean Ethereum_
- [Panggilan Breakout ACD Tanda Tangan Transaksi PQ](https://youtube.com/playlist?list=PLJqWcTqh_zKEOum3uR0odkH59fmGUYuZB) - _Yayasan Ethereum_
- [Panggilan Breakout ACD Interop PQ](https://youtube.com/playlist?list=PLJqWcTqh_zKF_Q9HNXBLW_AtktsjToTIu) - _Yayasan Ethereum_
- [Daftar Putar YouTube Lean Ethereum & Keamanan Pasca-Kuantum](https://youtube.com/playlist?list=PLJqWcTqh_zKGGuO_q1dgYLsfUoX1sNhWM) - _Yayasan Ethereum_
- [Wawancara panel ketahanan pasca-kuantum](https://youtu.be/5DRDjeMmOPw) - _Bankless Podcast_
- [Abstraksi akun di Ethereum](/roadmap/account-abstraction/)
- [strawmap.org](https://strawmap.org/) - _Arsitektur EF_
- [Superpositioned: Analisis Industri Komputasi Kuantum](https://www.superpositioned.co/) - _Saneel Sreeni_