---
title: Ethereum yang lebih aman
description: Peta jalan Ethereum memperkuat produksi blok dan ketahanan terhadap penyensoran saat ini, sekaligus mempersiapkan protokol untuk era kuantum dan operasi yang andal selama puluhan tahun.
lang: id
image: /images/roadmap/roadmap-security.png
alt: Peta jalan Ethereum
template: roadmap
summaryPoints:
  - Peningkatan penguatan jangka pendek seperti pemisahan pengusul-pembangun (PBS) yang tertanam dan daftar inklusi sedang dalam pengembangan aktif
  - Persiapan pascakuantum sedang berlangsung bertahun-tahun sebelum adanya ancaman kuantum yang kredibel
  - Penyederhanaan protokol menghilangkan kompleksitas dan memperkecil permukaan serangan Ethereum
---

Ethereum sudah menjadi platform [kontrak pintar](/glossary/#smart-contract) yang sangat aman dan terdesentralisasi. Peta jalan ini bertujuan untuk mempertahankannya selama puluhan tahun dengan **memperkuat jaringan saat ini sambil bersiap menghadapi ancaman yang mungkin baru muncul bertahun-tahun dari sekarang**. Peningkatan jangka pendek dilacak di [forkcast.org](https://forkcast.org), dan draf peta jalan jangka panjang dipublikasikan di [strawmap.org](https://strawmap.org).

<ExpandableCard title="Apakah Ethereum aman saat ini?" eventCategory="/roadmap/security" eventName="clicked is ethereum secure today?">

Ya. Ethereum telah berjalan terus-menerus sejak 2015 tanpa waktu henti (downtime). Peningkatan di halaman ini membuat jaringan yang sudah aman menjadi lebih sulit untuk diserang, disensor, atau diganggu.

</ExpandableCard>

## Pembangunan blok tanpa kepercayaan {#trustless-block-building}

Sebagian besar blok Ethereum saat ini dirakit melalui pembagian kerja: pembangun khusus menyusun blok paling bernilai yang mereka bisa, dan [validator](/glossary/#validator) yang mendapat giliran akan mengusulkan penawaran terbaik. Hal ini mencegah pembangunan blok profesional memusatkan [stake](/glossary/#staking) di antara operator terbesar, tetapi sejak 2022 hal ini bergantung pada perangkat lunak di luar protokol yang tidak dapat diverifikasi oleh jaringan.

**Pemisahan pengusul-pembangun yang tertanam (ePBS, atau EIP-7732)** memindahkan pemisahan ini ke dalam protokol, menghilangkan kebutuhan untuk memercayai relai, perantara pihak ketiga yang saat ini meneruskan blok antara pembangun dan validator. ePBS adalah sorotan utama dari peningkatan [Glamsterdam](/roadmap/glamsterdam/) mendatang, yang ditargetkan pada tahun 2026. Belum ada tanggal Mainnet yang ditetapkan; tim klien sedang mengujinya di devnet (jaringan pengujian sementara).

<ButtonLink variant="outline" href="/roadmap/pbs/">Lebih lanjut tentang pemisahan pengusul-pembangun</ButtonLink>

## Ketahanan terhadap penyensoran {#censorship-resistance}

Jaringan yang tahan terhadap penyensoran berarti tidak ada yang dapat menghentikan transaksi yang valid untuk mencapai rantai. **Daftar inklusi yang ditegakkan oleh pilihan percabangan (FOCIL, atau EIP-7805)** memberi banyak validator hak suara dalam apa yang wajib disertakan dalam sebuah blok: mereka memublikasikan daftar transaksi tertunda yang diwajibkan untuk disertakan oleh pembangun blok. Tidak ada satu pun aktor yang dapat secara diam-diam mengabaikan transaksi Anda.

FOCIL adalah sorotan utama lapisan konsensus dari Hegotá, peningkatan yang mengikuti Glamsterdam dan ditargetkan pada tahun 2027. Ini sengaja dijadwalkan setelah Glamsterdam sehingga ePBS dan FOCIL tidak pernah dirilis sebagai satu kombinasi yang belum teruji. Penelitian tentang mempool terenkripsi, yang akan menyembunyikan isi transaksi yang menunggu hingga disertakan dengan aman di dalam blok, terus berlanjut.

## Finalitas yang lebih cepat {#faster-finality}

Bagi pengguna, [finalitas](/glossary/#finality) adalah momen ketika sebuah transaksi menjadi permanen, ketika membalikkannya akan memakan biaya ETH yang di-stake dalam jumlah sangat besar bagi penyerang. Saat ini finalitas memakan waktu sekitar 15 menit, dan **para peneliti ingin menyusutkannya secara drastis**. Pekerjaan ini dimulai sebagai finalitas slot tunggal, berevolusi menjadi finalitas tiga slot, dan sekarang berlanjut sebagai Minimmit, protokol konsensus satu putaran dalam program Lean Ethereum yang diperkenalkan pada Juli 2025. Finalitas dalam hitungan detik adalah tujuan jangka panjang pada draf peta jalan, yang menargetkan sekitar tahun 2029. Ini tetap menjadi penelitian aktif, dan belum ada peningkatan finalitas yang ditetapkan untuk suatu percabangan.

<ButtonLink variant="outline" href="/roadmap/single-slot-finality/">Lebih lanjut tentang penelitian finalitas yang lebih cepat</ButtonLink>

## Validator yang tangguh {#resilient-validators}

Sebuah validator biasanya adalah satu mesin yang memegang satu kunci penandatanganan. **Teknologi validator terdistribusi (DVT)** menggantikan mesin tunggal tersebut dengan sebuah komite mesin yang berbagi kunci dan menandatangani bersama, sehingga satu komputer yang gagal atau satu kunci yang dicuri tidak akan melumpuhkan validator. DVT telah aktif dalam produksi dan digunakan oleh operator staking dalam skala besar. Pada Januari 2026, Vitalik Buterin mengajukan varian tingkat protokol yang disederhanakan yang disebut DVT-lite; ini adalah proposal awal tanpa jadwal percabangan.

Jaringan juga melindungi dirinya sendiri melalui [keragaman klien](/developers/docs/nodes-and-clients/client-diversity/): Ethereum berjalan pada beberapa implementasi perangkat lunak yang dibangun secara independen, sehingga bug pada satu klien akan membiarkan sisa jaringan tetap berdiri.

Dua ide penelitian sebelumnya, view-merge dan pemilihan pemimpin rahasia, tidak lagi menjadi item peta jalan yang aktif.

<ButtonLink variant="outline" href="/staking/dvt/">Lebih lanjut tentang teknologi validator terdistribusi</ButtonLink>

## Ketahanan kuantum {#quantum-resistance}

Ethereum menggunakan [kriptografi](/glossary/#cryptography) untuk menjaga jaringan tetap aman dan melindungi dana pengguna. Pada akhirnya, beberapa metode kriptografi ini akan **rentan terhadap komputer kuantum**, yang dapat memecahkan masalah matematika tertentu secara eksponensial lebih cepat daripada mesin klasik.

**Tidak ada komputer kuantum yang dapat memecahkan kriptografi Ethereum saat ini.** Perangkat keras yang dibutuhkan belum ada dalam skala besar. Namun, penelitian terbaru menunjukkan bahwa kesenjangan tersebut menutup lebih cepat dari yang diperkirakan sebelumnya. Pada Maret 2026, Google Quantum AI menerbitkan sebuah makalah yang memperkirakan bahwa memecahkan kriptografi kurva eliptik 256-bit (jenis yang digunakan Ethereum untuk tanda tangan akun) mungkin membutuhkan sekitar 1.200 qubit logis, sekitar 20 kali lebih sedikit dari perkiraan sebelumnya.

Transisi kriptografi membutuhkan waktu bertahun-tahun untuk direncanakan dan dieksekusi dengan aman, sehingga persiapan sedang dilakukan sekarang, jauh sebelum perangkat kerasnya ada. Empat area telah diidentifikasi membutuhkan peningkatan pascakuantum: tanda tangan konsensus validator (BLS), skema komitmen yang digunakan untuk ketersediaan data (KZG), tanda tangan akun (ECDSA), dan sistem Bukti tanpa pengetahuan (ZKP) yang digunakan oleh [rollup](/glossary/#rollups).

Yayasan Ethereum membentuk **tim Keamanan Pascakuantum** khusus pada Januari 2026, dan pekerjaannya dilacak secara publik di [pq.ethereum.org](https://pq.ethereum.org). Pekerjaan aktif mencakup tanda tangan validator berbasis hash (leanXMSS) yang dipasangkan dengan zkVM minimal (leanVM) yang menggabungkan tanda tangan aman kuantum yang lebih besar secara efisien, dan devnet interop mingguan dengan lebih dari 10 tim klien.

Bagian penting dari strategi transisi adalah **EIP-8141**, yang memperkenalkan [abstraksi akun](/roadmap/account-abstraction/) bawaan. Hal ini memungkinkan akun individu untuk memilih verifikasi tanda tangan mereka sendiri, yang berarti pengguna dapat beralih ke tanda tangan aman kuantum tanpa menunggu migrasi tunggal di seluruh protokol. EIP-8141 sedang dipertimbangkan untuk peningkatan Hegotá. Pencapaian infrastruktur pascakuantum inti menargetkan penyelesaian sekitar tahun 2029. Ini adalah target perencanaan dan dapat bergeser.

<ExpandableCard title="Bisakah komputer kuantum mencuri ETH saya saat ini?" eventCategory="/roadmap/security" eventName="clicked can quantum computers steal my ETH today?">

Tidak. Tidak ada komputer kuantum saat ini yang dapat memecahkan kriptografi Ethereum. Pekerjaan yang dijelaskan di halaman ini adalah persiapan awal untuk ancaman yang masih bertahun-tahun lagi. Ketika dompet pascakuantum tersedia, perangkat lunak dompet akan memandu Anda melalui migrasi. Untuk saat ini, tidak ada yang perlu Anda lakukan.

</ExpandableCard>

<ButtonLink variant="outline" href="/roadmap/security/quantum-resistance/">Lebih lanjut tentang ketahanan kuantum</ButtonLink>

## Protokol yang lebih sederhana dan lebih efisien {#simpler-and-more-efficient-protocol}

Kompleksitas menciptakan peluang untuk bug dan kerentanan. Bagian dari peta jalan berfokus pada **menyederhanakan Ethereum dan menghilangkan utang teknis** sehingga protokol lebih mudah dipelihara, diaudit, dan dipahami. Protokol yang lebih sederhana juga memberi penyerang lebih sedikit permukaan untuk diselidiki.

Yang telah disampaikan sejauh ini:

- **[Pectra (Mei 2025)](/roadmap/pectra/)**: Memperkenalkan EIP-7702, yang memungkinkan akun yang dimiliki secara eksternal untuk sementara mendelegasikan ke kode kontrak pintar, sebuah batu loncatan menuju abstraksi akun penuh.
- **[Fusaka (Desember 2025)](/roadmap/fusaka/)**: Menerapkan PeerDAS (EIP-7594), yang mendistribusikan beban kerja ketersediaan data ke seluruh jaringan. Juga meningkatkan parameter blob, memperluas laju pemrosesan data untuk rollup.
- **[Dencun (Maret 2024)](/roadmap/dencun/)**: Memperkenalkan transaksi blob (EIP-4844) untuk data rollup yang lebih murah dan membatasi `SELFDESTRUCT` (EIP-6780) untuk menghilangkan sumber kompleksitas yang telah lama ada.
- **[Shapella (April 2023)](/staking/withdrawals/)**: Memungkinkan validator untuk menarik ETH yang di-stake (EIP-4895), menghilangkan kendala awal dari staking [Bukti Kepemilikan (PoS)](/glossary/#pos).
- **London (Agustus 2021)**: Merombak penetapan harga gas dengan EIP-1559, memperkenalkan biaya dasar dan mekanisme bakar untuk biaya transaksi yang lebih dapat diprediksi.

Sedang berlangsung:

- **Glamsterdam (ditargetkan untuk 2026)**: Sorotan utamanya adalah ePBS (EIP-7732) dan daftar akses tingkat blok (EIP-7928), dengan penetapan ulang harga gas juga sedang dipertimbangkan.
- **Hegotá (ditargetkan untuk 2027)**: FOCIL (EIP-7805) adalah sorotan utama lapisan konsensus. Sedang dipertimbangkan untuk disertakan: EIP-8141 (abstraksi akun bawaan).
- **Sedang berjalan**: Upaya untuk menyederhanakan [EVM](/developers/docs/evm/), menyelaraskan implementasi klien, dan menghapus fitur yang tidak lagi digunakan terus berlanjut di seluruh tim klien. Pekerjaan pada ketiadaan state (memungkinkan peserta memverifikasi rantai tanpa menyimpan semua datanya) sedang dirancang ulang di sekitar pohon hash biner yang aman dari kuantum, dengan pendekatan akhir yang belum dikonfirmasi.

## Kemajuan saat ini {#current-progress}

Hingga pertengahan 2026:

- **Pembangunan blok dan ketahanan terhadap penyensoran**: ePBS dan daftar akses tingkat blok berjalan di devnet Glamsterdam. FOCIL direncanakan untuk Hegotá, ditargetkan untuk 2027.
- **Finalitas**: Minimmit dan pekerjaan konsensus Lean Ethereum yang lebih luas tetap dalam penelitian aktif tanpa penetapan percabangan apa pun.
- **Ketahanan kuantum**: Devnet interop pascakuantum mingguan sedang berjalan, dan pencapaian infrastruktur inti menargetkan sekitar tahun 2029.
- **Penyederhanaan**: Pectra dan Fusaka telah dirilis; Glamsterdam dan Hegotá membawa putaran pembersihan berikutnya.

Belum ada bagian dari pekerjaan ini yang selesai, dan semua garis waktu adalah perkiraan yang dapat bergeser.

## Bacaan lebih lanjut {#further-reading}

- [Forkcast: Pelacak peningkatan jaringan Ethereum](https://forkcast.org)
- [Strawmap: draf peta jalan L1 Ethereum](https://strawmap.org) - _Arsitektur EF_
- [Ethereum Pascakuantum](https://pq.ethereum.org) - _Yayasan Ethereum_
- [Pelacak peta jalan Lean Ethereum](https://leanroadmap.org) - _ReamLabs_
- [Bukti Kepemilikan (PoS) dan finalitas](/developers/docs/consensus-mechanisms/pos/#finality)
- [EVM](/developers/docs/evm/)