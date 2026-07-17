---
title: Mempersiapkan Ethereum untuk masa depan dan keamanan kuantum kripto
description: Peningkatan ini mengukuhkan Ethereum sebagai lapisan dasar yang tangguh dan terdesentralisasi untuk masa depan, apa pun yang akan terjadi.
lang: id
image: /images/roadmap/roadmap-future.png
alt: Peta jalan Ethereum
template: roadmap
summaryPoints:
  - Kriptografi pascakuantum memastikan Ethereum dapat bertahan dari ancaman perangkat keras tingkat lanjut seiring kemajuan komputasi kuantum
  - Penyederhanaan protokol membuat Ethereum lebih mudah dipelihara, diaudit, dan diamankan
  - Peningkatan terbaru telah memberikan perbaikan efisiensi yang berarti
---

Beberapa bagian dari peta jalan tidak membahas tentang penskalaan atau pengamanan Ethereum saat ini. Bagian tersebut bertujuan untuk membuat Ethereum **stabil dan andal jauh di masa depan**. Ini berarti bersiap menghadapi jenis ancaman baru dan menghapus kerumitan yang tidak perlu dari protokol.

## Ketahanan kuantum {#quantum-resistance}

Ethereum menggunakan [kriptografi](/glossary/#cryptography) untuk menjaga jaringan tetap aman dan melindungi dana pengguna. Pada akhirnya, beberapa metode kriptografi ini akan **rentan terhadap komputer kuantum**, yang dapat memecahkan masalah matematika tertentu secara eksponensial lebih cepat daripada mesin klasik.

**Tidak ada komputer kuantum yang dapat menembus kriptografi Ethereum saat ini.** Perangkat keras yang dibutuhkan belum ada dalam skala besar. Namun, penelitian terbaru menunjukkan bahwa kesenjangan tersebut menutup lebih cepat dari yang diperkirakan sebelumnya. Pada bulan Maret 2026, Google Quantum AI menerbitkan sebuah makalah yang memperkirakan bahwa menembus kriptografi kurva eliptik 256-bit (jenis yang digunakan Ethereum untuk tanda tangan akun) mungkin membutuhkan sekitar 1.200 qubit logis, sekitar 20 kali lebih sedikit dari perkiraan sebelumnya. Google telah menetapkan tenggat waktu internal tahun 2029 untuk memigrasikan sistemnya sendiri ke kriptografi yang aman dari kuantum.

Transisi kriptografi membutuhkan waktu bertahun-tahun untuk direncanakan dan dieksekusi dengan aman. Karena model keamanan Ethereum dirancang untuk bertahan selama beberapa dekade, persiapan pascakuantum sudah ada di peta jalan Ethereum sebelum menjadi berita utama. Persiapan jaringan sedang berlangsung sekarang untuk memastikan transisi yang mulus, bukan sebagai reaksi terhadap keadaan darurat.

### Apa saja risikonya? {#what-is-at-risk}

Empat area utama kriptografi Ethereum telah diidentifikasi memerlukan peningkatan pascakuantum:

1. **Tanda tangan konsensus (BLS)**: [Validator](/glossary/#validator) menggunakan tanda tangan BLS untuk memilih [blok](/glossary/#block) yang valid. Komputer kuantum dapat memalsukan tanda tangan ini.
2. **Ketersediaan data (komitmen KZG)**: [Skema komitmen](/roadmap/danksharding/#what-is-kzg) yang membantu penskalaan Ethereum bergantung pada matematika (khususnya, pemasangan kurva eliptik) yang rentan terhadap serangan kuantum.
3. **Tanda tangan akun (ECDSA)**: Skema tanda tangan yang melindungi akun Ethereum individu. Saat sebuah akun mengirimkan transaksi, kunci publiknya terekspos onchain. Komputer kuantum dapat memperoleh kunci privat dari kunci publik yang terekspos ini, yang berpotensi memungkinkan pencurian dana.
4. **Bukti tanpa pengetahuan (ZK-proof) lapisan aplikasi**: Sistem Bukti tanpa pengetahuan yang digunakan oleh rollup dan aplikasi lain bergantung pada asumsi kriptografi yang dapat dirusak oleh komputer kuantum.

<ExpandableCard title="Bisakah komputer kuantum mencuri ETH saya hari ini?" eventCategory="/roadmap/future-proofing" eventName="clicked can quantum computers steal my ETH today?">

Tidak. Tidak ada komputer kuantum saat ini yang dapat menembus kriptografi Ethereum. Pekerjaan yang dijelaskan di halaman ini adalah persiapan untuk masa depan, bukan respons terhadap ancaman aktif. Saat dompet pascakuantum tersedia, perangkat lunak dompet akan memandu Anda melalui migrasi. Untuk saat ini, tidak ada yang perlu Anda lakukan.

</ExpandableCard>

### Apa yang sedang dilakukan? {#what-is-being-done}

Saat ini, Ethereum adalah pembela paling proaktif terhadap ancaman kuantum di ekosistem rantai blok. Yayasan Ethereum membentuk **tim Keamanan Pascakuantum** khusus pada bulan Januari 2026, dan pekerjaan aktif mencakup berbagai tim klien dan kelompok penelitian. Pekerjaan tim Pascakuantum EF dilacak secara publik di [pq.ethereum.org](https://pq.ethereum.org).

Pekerjaan aktif meliputi:

- **Tanda tangan berbasis hash (leanXMSS)**: Pengganti yang aman dari kuantum untuk tanda tangan validator, dibangun di atas fungsi hash yang tidak dapat dipecahkan secara efisien oleh komputer kuantum.
- **zkVM minimal (leanVM)**: Karena tanda tangan yang aman dari kuantum lebih besar daripada tanda tangan yang digunakan saat ini, leanXMSS dipasangkan dengan zkVM minimal (leanVM). Mesin ini menggabungkan tanda tangan yang aman dari kuantum secara efisien, mengompresi data hingga 250x, sehingga jaringan tetap cepat setelah transisi.
- **Pengujian interop mingguan**: Lebih dari 10 tim klien berpartisipasi dalam devnet pascakuantum reguler.
- **Ketersediaan data:** Meningkatkan kriptografi dasar yang digunakan untuk menangani data jaringan dalam jumlah besar akan memastikan Ethereum tetap cepat dan terjangkau untuk digunakan tanpa mempertaruhkan kerentanan kuantum di masa depan.
- **Poseidon Prize**: Hadiah penelitian senilai $1 juta yang menargetkan peningkatan pada primitif kriptografi berbasis hash.
- **Standar NIST**: Institut Standar dan Teknologi Nasional AS (NIST) memfinalisasi tiga standar kriptografi pascakuantum pada bulan Agustus 2024 (ML-KEM, ML-DSA, SLH-DSA). Pekerjaan Ethereum dibangun di atas fondasi ini.

Bagian penting dari strategi transisi ini adalah **EIP-8141**, yang memperkenalkan [abstraksi akun](/roadmap/account-abstraction/) bawaan. Ini memungkinkan akun individu untuk memilih verifikasi tanda tangan mereka sendiri, yang berarti pengguna dapat beralih ke tanda tangan yang aman dari kuantum **tanpa menunggu migrasi tunggal di seluruh protokol**. EIP-8141 sedang dipertimbangkan untuk percabangan keras Hegotá (direncanakan pada paruh kedua tahun 2026).

Yayasan Ethereum telah menguraikan pencapaian percabangan terstruktur yang menargetkan penyelesaian infrastruktur pascakuantum inti pada sekitar tahun 2029. Ini adalah target perencanaan, bukan komitmen yang dijamin.

<ButtonLink variant="outline" href="/roadmap/future-proofing/quantum-resistance/">Lebih lanjut tentang ketahanan kuantum</ButtonLink>
## Ethereum yang lebih sederhana dan lebih efisien {#simpler-more-efficient-ethereum}

Kerumitan menciptakan peluang untuk bug dan kerentanan. Bagian dari peta jalan berfokus pada **menyederhanakan Ethereum dan menghapus utang teknis** sehingga protokol lebih mudah dipelihara, diaudit, dan dipahami.

### Apa yang telah disampaikan {#what-has-been-delivered}

Beberapa peningkatan terbaru telah membuat Ethereum lebih sederhana dan lebih efisien:

- **[Pectra (Mei 2025)](/roadmap/pectra/)**: Memperkenalkan EIP-7702, yang memungkinkan akun yang dimiliki secara eksternal untuk sementara mendelegasikan ke kode kontrak pintar, sebuah batu loncatan menuju [abstraksi akun](/roadmap/account-abstraction/) penuh. Juga menambahkan prakompilasi BLS12-381 (EIP-2537), penanganan deposit onchain (EIP-6110), akses hash blok historis di EVM (EIP-2935), dan meningkatkan saldo efektif maksimum untuk validator (EIP-7251).
- **[Fusaka (Desember 2025)](/roadmap/fusaka/)**: Menerapkan PeerDAS (EIP-7594), sistem pengambilan sampel ketersediaan data peer-to-peer yang mendistribusikan beban kerja ketersediaan data ke seluruh jaringan. Juga meningkatkan parameter blob, memperluas laju pemrosesan data untuk [rollup](/glossary/#rollups).
- **[Dencun (Maret 2024)](/roadmap/dencun/)**: Memperkenalkan transaksi blob (EIP-4844) untuk data rollup yang lebih murah dan membatasi `SELFDESTRUCT` (EIP-6780) untuk menghapus sumber kerumitan yang sudah berlangsung lama.
- **[London (Agustus 2021)](/ethereum-forks/#london)**: Merombak penetapan harga [gas](/glossary/#gas) dengan EIP-1559, memperkenalkan biaya dasar dan mekanisme bakar untuk biaya transaksi yang lebih dapat diprediksi.

### Apa yang sedang berlangsung {#what-is-in-progress}

- **[Glamsterdam (direncanakan pada paruh pertama tahun 2026)](/roadmap/glamsterdam/)**: Sedang dipertimbangkan untuk disertakan: pemisahan pengusul-pembangun (PBS) yang diabadikan (EIP-7732), daftar akses tingkat blok (EIP-7928), dan penetapan ulang harga gas untuk menyelaraskan biaya dengan penggunaan sumber daya aktual secara lebih baik.
- **Hegotá (direncanakan pada paruh kedua tahun 2026)**: Sedang dipertimbangkan untuk disertakan: [Pohon Verkle](/roadmap/verkle-trees/), mengganti struktur data saat ini dengan yang lebih efisien yang memungkinkan klien tanpa status. Juga ditargetkan untuk EIP-8141 (abstraksi akun bawaan).
- **Sedang berlangsung**: Upaya untuk menyederhanakan [EVM](/developers/docs/evm/), menyelaraskan implementasi klien, dan menghapus fitur yang tidak digunakan lagi terus berlanjut di seluruh komunitas pengembangan Ethereum.

## Kemajuan saat ini {#current-progress}

Pada awal tahun 2026:

**Penyederhanaan dan efisiensi**: Pectra dan Fusaka memberikan peningkatan nyata dalam fleksibilitas akun, ketersediaan data, dan operasi validator. Glamsterdam dan Hegotá sedang dalam pengembangan aktif dengan target yang jelas untuk membuat jaringan lebih tangguh dan efisien, sekaligus menghapus dependensi eksternal.

**Kriptografi pascakuantum**: Penelitian aktif dan implementasi awal sedang berlangsung. Ekosistem telah mendanai hadiah penelitian dan menjalankan devnet interop mingguan di berbagai klien, selain penelitian yang dilakukan oleh tim Pascakuantum khusus Yayasan Ethereum. Meskipun pencapaian percabangan terstruktur menargetkan penyelesaian pada sekitar tahun 2029, penelitian awal menghasilkan poin bukti nyata yang menunjukkan bahwa eksekusi pascakuantum dapat dilakukan saat ini.

**Abstraksi akun dan ketangkasan tanda tangan**: EIP-7702 dikirimkan di Pectra. EIP-8141, yang sedang dipertimbangkan untuk Hegotá, akan memungkinkan akun untuk menggunakan skema tanda tangan apa pun, memberikan pengguna jalur untuk mengadopsi tanda tangan yang aman dari kuantum sebelum transisi protokol penuh selesai.

Tidak ada bagian dari pekerjaan ini yang telah selesai. Garis waktu adalah target, bukan jaminan. Namun, ruang lingkup dan kecepatan pengembangan aktif mewakili komitmen yang jelas untuk menjaga Ethereum tetap aman dan efisien untuk jangka panjang.

**Bacaan lebih lanjut**

- [Kriptografi pascakuantum di Ethereum](/roadmap/future-proofing/quantum-resistance/)
- [strawmap.org](https://strawmap.org/) - _Arsitektur EF_
- [pq.ethereum.org](https://pq.ethereum.org)
- [Gas](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Struktur data](/developers/docs/data-structures-and-encoding/)
