---
title: Statelessness, kedaluwarsa status, dan kedaluwarsa riwayat
description: Penjelasan tentang kedaluwarsa riwayat dan Ethereum stateless
lang: id
---

# Statelessness, kedaluwarsa status, dan kedaluwarsa riwayat {#statelessness}

Kemampuan untuk menjalankan node [Ethereum](/) pada perangkat keras yang sederhana sangat penting untuk desentralisasi sejati. Hal ini karena menjalankan node memberi pengguna kemampuan untuk memverifikasi informasi dengan melakukan pemeriksaan kriptografi secara independen daripada memercayai pihak ketiga untuk memberi mereka data. Menjalankan node memungkinkan pengguna untuk mengirimkan transaksi secara langsung ke jaringan peer-to-peer Ethereum daripada harus memercayai perantara. Desentralisasi tidak mungkin terjadi jika manfaat ini hanya tersedia bagi pengguna dengan perangkat keras yang mahal. Sebaliknya, node harus dapat berjalan dengan persyaratan pemrosesan dan memori yang sangat sederhana sehingga dapat berjalan di ponsel, komputer mikro, atau tanpa disadari di komputer rumah.

Saat ini, persyaratan ruang disk yang tinggi adalah hambatan utama yang mencegah akses universal ke node. Hal ini terutama disebabkan oleh kebutuhan untuk menyimpan sebagian besar data status Ethereum. Data status ini berisi informasi penting yang diperlukan untuk memproses blok dan transaksi baru dengan benar. Pada saat penulisan, SSD 2TB yang cepat direkomendasikan untuk menjalankan node Ethereum penuh. Untuk node yang tidak memangkas data lama apa pun, persyaratan penyimpanan tumbuh sekitar 14GB/minggu, dan node arsip yang menyimpan semua data sejak genesis mendekati 12 TB (pada saat penulisan, pada Feb 2023).

Hard drive yang lebih murah dapat digunakan untuk menyimpan data lama tetapi terlalu lambat untuk mengimbangi blok yang masuk. Mempertahankan model penyimpanan saat ini untuk klien sambil membuat data lebih murah dan lebih mudah disimpan hanyalah solusi sementara dan parsial untuk masalah ini karena pertumbuhan status Ethereum 'tidak terbatas', yang berarti bahwa persyaratan penyimpanan hanya akan terus meningkat, dan peningkatan teknologi harus selalu mengimbangi pertumbuhan status yang berkelanjutan. Sebaliknya, klien harus menemukan cara baru untuk memverifikasi blok dan transaksi yang tidak bergantung pada pencarian data dari basis data lokal.

## Mengurangi penyimpanan untuk node {#reducing-storage-for-nodes}

Ada beberapa cara untuk mengurangi jumlah data yang harus disimpan oleh setiap node, yang masing-masing mengharuskan protokol inti Ethereum diperbarui ke tingkat yang berbeda:

- **Kedaluwarsa riwayat**: memungkinkan node untuk membuang data status yang lebih lama dari X blok, tetapi tidak mengubah cara klien Ethereum menangani data status.
- **Kedaluwarsa status**: memungkinkan data status yang tidak sering digunakan menjadi tidak aktif. Data yang tidak aktif dapat diabaikan oleh klien sampai dibangkitkan kembali.
- **Weak statelessness**: hanya produsen blok yang memerlukan akses ke data status penuh, node lain dapat memverifikasi blok tanpa basis data status lokal.
- **Strong statelessness**: tidak ada node yang memerlukan akses ke data status penuh.

## Kedaluwarsa data {#data-expiry}

### Kedaluwarsa riwayat {#history-expiry}

Kedaluwarsa riwayat mengacu pada klien yang memangkas data lama yang kemungkinan tidak mereka butuhkan, sehingga mereka hanya menyimpan sejumlah kecil data historis, membuang data lama saat data baru tiba. Ada dua alasan klien memerlukan data historis: menyinkronkan dan melayani permintaan data. Awalnya, klien harus menyinkronkan dari blok genesis, memverifikasi bahwa setiap blok yang berurutan sudah benar sampai ke kepala rantai. Saat ini, klien menggunakan "titik pemeriksaan subjektivitas lemah" (weak subjectivity checkpoints) untuk melakukan bootstrap ke kepala rantai. Titik pemeriksaan ini adalah titik awal tepercaya, seperti memiliki blok genesis yang dekat dengan masa kini daripada awal mula Ethereum. Ini berarti klien dapat membuang semua informasi sebelum titik pemeriksaan subjektivitas lemah terbaru tanpa kehilangan kemampuan untuk menyinkronkan ke kepala rantai. Klien saat ini melayani permintaan (yang tiba melalui JSON-RPC) untuk data historis dengan mengambilnya dari basis data lokal mereka. Namun, dengan kedaluwarsa riwayat, hal ini tidak akan mungkin terjadi jika data yang diminta telah dipangkas. Melayani data historis ini adalah tempat di mana beberapa solusi inovatif diperlukan.

Salah satu opsinya adalah klien meminta data historis dari rekan (peer) menggunakan solusi seperti Portal Network. Portal Network adalah jaringan peer-to-peer yang sedang dalam pengembangan untuk melayani data historis di mana setiap node menyimpan sebagian kecil dari riwayat Ethereum sehingga seluruh riwayat ada secara terdistribusi di seluruh jaringan. Permintaan dilayani dengan mencari rekan yang menyimpan data yang relevan dan memintanya dari mereka. Sebagai alternatif, karena umumnya aplikasi yang memerlukan akses ke data historis, hal itu dapat menjadi tanggung jawab mereka untuk menyimpannya. Mungkin juga ada cukup banyak aktor altruistik di ruang Ethereum yang bersedia memelihara arsip historis. Bisa jadi sebuah DAO yang dibentuk untuk mengelola penyimpanan data historis, atau idealnya akan menjadi kombinasi dari semua opsi ini. Penyedia ini dapat menyajikan data dengan banyak cara, seperti di torrent, FTP, Filecoin, atau IPFS.

Kedaluwarsa riwayat agak kontroversial karena sejauh ini Ethereum selalu secara implisit menjamin ketersediaan data historis apa pun. Sinkronisasi penuh dari genesis selalu dimungkinkan sebagai standar, bahkan jika itu bergantung pada pembangunan kembali beberapa data lama dari snapshot. Kedaluwarsa riwayat memindahkan tanggung jawab untuk memberikan jaminan ini ke luar protokol inti Ethereum. Hal ini dapat menimbulkan risiko penyensoran baru jika organisasi terpusat yang akhirnya turun tangan untuk menyediakan data historis.

EIP-4444 belum siap untuk diluncurkan, tetapi sedang dalam diskusi aktif. Menariknya, tantangan dengan EIP-4444 tidak terlalu bersifat teknis, melainkan sebagian besar pada manajemen komunitas. Agar ini dapat diluncurkan, perlu ada dukungan komunitas yang mencakup tidak hanya kesepakatan tetapi juga komitmen untuk menyimpan dan menyajikan data historis dari entitas yang dapat dipercaya.

Peningkatan ini pada dasarnya tidak mengubah cara node Ethereum menangani data status, ini hanya mengubah cara data historis diakses.

### Kedaluwarsa status {#state-expiry}

Kedaluwarsa status mengacu pada penghapusan status dari masing-masing node jika belum diakses baru-baru ini. Ada beberapa cara ini dapat diimplementasikan, termasuk:

- **Kedaluwarsa berdasarkan sewa**: membebankan "sewa" ke akun dan membuatnya kedaluwarsa saat sewa mereka mencapai nol
- **Kedaluwarsa berdasarkan waktu**: membuat akun tidak aktif jika tidak ada pembacaan/penulisan ke akun tersebut selama beberapa waktu

Kedaluwarsa berdasarkan sewa dapat berupa sewa langsung yang dibebankan ke akun untuk menyimpannya di basis data status aktif. Kedaluwarsa berdasarkan waktu dapat berupa hitung mundur dari interaksi akun terakhir, atau dapat berupa kedaluwarsa berkala dari semua akun. Bisa juga ada mekanisme yang menggabungkan elemen dari model berbasis waktu dan sewa, misalnya akun individu bertahan dalam status aktif jika mereka membayar sedikit biaya sebelum kedaluwarsa berbasis waktu. Dengan kedaluwarsa status, penting untuk dicatat bahwa status tidak aktif **tidak dihapus**, melainkan hanya disimpan secara terpisah dari status aktif. Status tidak aktif dapat dibangkitkan kembali ke status aktif.

Cara kerjanya mungkin dengan memiliki pohon status untuk periode waktu tertentu (mungkin ~1 tahun). Kapan pun periode baru dimulai, begitu pula pohon status yang benar-benar baru. Hanya pohon status saat ini yang dapat dimodifikasi, semua yang lain bersifat tetap. Node Ethereum hanya diharapkan untuk menyimpan pohon status saat ini dan satu yang paling baru sebelumnya. Ini membutuhkan cara untuk memberi stempel waktu pada alamat dengan periode keberadaannya. Ada [beberapa cara yang mungkin](https://ethereum-magicians.org/t/types-of-resurrection-metadata-in-state-expiry/6607) untuk melakukan ini, tetapi opsi utamanya mengharuskan [alamat diperpanjang](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485) untuk mengakomodasi informasi tambahan dengan manfaat tambahan bahwa alamat yang lebih panjang jauh lebih aman. Item peta jalan yang melakukan ini disebut [ekstensi ruang alamat](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485).

Sama halnya dengan kedaluwarsa riwayat, di bawah kedaluwarsa status, tanggung jawab untuk menyimpan data status lama dihapus dari pengguna individu dan didorong ke entitas lain seperti penyedia terpusat, anggota komunitas altruistik, atau solusi desentralisasi yang lebih futuristik seperti Portal Network.

Kedaluwarsa status masih dalam tahap penelitian dan belum siap untuk diluncurkan. Kedaluwarsa status mungkin terjadi lebih lambat daripada klien stateless dan kedaluwarsa riwayat karena peningkatan tersebut membuat ukuran status yang besar mudah dikelola oleh sebagian besar validator.

## Statelessness {#statelessness}

Statelessness adalah istilah yang sedikit keliru karena tidak berarti konsep "status" dihilangkan, tetapi melibatkan perubahan pada cara node Ethereum menangani data status. Statelessness itu sendiri hadir dalam dua rasa: weak statelessness dan strong statelessness. Weak statelessness memungkinkan sebagian besar node menjadi stateless dengan meletakkan tanggung jawab penyimpanan status pada beberapa node. Strong statelessness sepenuhnya menghilangkan kebutuhan node mana pun untuk menyimpan data status penuh. Baik weak maupun strong statelessness menawarkan manfaat berikut bagi validator normal:

- sinkronisasi yang hampir instan
- kemampuan untuk memvalidasi blok yang tidak berurutan
- node dapat berjalan dengan persyaratan perangkat keras yang sangat rendah (misalnya, di ponsel)
- node dapat berjalan di atas hard drive murah karena tidak diperlukan pembacaan/penulisan disk
- kompatibel dengan peningkatan kriptografi Ethereum di masa mendatang

### Weak Statelessness {#weak-statelessness}

Weak statelessness memang melibatkan perubahan pada cara node Ethereum memverifikasi perubahan status, tetapi tidak sepenuhnya menghilangkan kebutuhan akan penyimpanan status di semua node di jaringan. Sebaliknya, weak statelessness meletakkan tanggung jawab penyimpanan status pada pengusul blok, sementara semua node lain di jaringan memverifikasi blok tanpa menyimpan data status penuh.

**Dalam weak statelessness, mengusulkan blok memerlukan akses ke data status penuh tetapi memverifikasi blok tidak memerlukan data status**

Agar hal ini terjadi, [Pohon Verkle](/roadmap/verkle-trees/) harus sudah diimplementasikan di klien Ethereum. Pohon Verkle adalah struktur data pengganti untuk menyimpan data status Ethereum yang memungkinkan "saksi" (witnesses) berukuran kecil dan tetap ke data untuk diteruskan di antara rekan-rekan dan digunakan untuk memverifikasi blok alih-alih memverifikasi blok terhadap basis data lokal. [Pemisahan pengusul-pembangun](/roadmap/pbs/) juga diperlukan karena ini memungkinkan pembangun blok menjadi node khusus dengan perangkat keras yang lebih kuat, dan merekalah yang memerlukan akses ke data status penuh.

<ExpandableCard title="Mengapa tidak masalah untuk bergantung pada lebih sedikit pengusul blok?" eventCategory="/roadmap/statelessness" eventName="clicked why is it OK to rely on fewer block proposers?">

Statelessness bergantung pada pembangun blok yang memelihara salinan data status penuh sehingga mereka dapat menghasilkan saksi yang dapat digunakan untuk memverifikasi blok. Node lain tidak memerlukan akses ke data status, semua informasi yang diperlukan untuk memverifikasi blok tersedia di saksi. Hal ini menciptakan situasi di mana mengusulkan blok itu mahal, tetapi memverifikasi blok itu murah, yang menyiratkan lebih sedikit operator yang akan menjalankan node pengusul blok. Namun, desentralisasi pengusul blok tidak terlalu penting selama sebanyak mungkin peserta dapat memverifikasi secara independen bahwa blok yang mereka usulkan valid.

<ButtonLink variant="outline-color" href="https://notes.ethereum.org/WUUUXBKWQXORxpFMlLWy-w#So-why-is-it-ok-to-have-expensive-proposers">Baca selengkapnya di catatan Dankrad</ButtonLink>
</ExpandableCard>

Pengusul blok menggunakan data status untuk membuat "saksi" - kumpulan data minimal yang membuktikan nilai status yang sedang diubah oleh transaksi dalam sebuah blok. Validator lain tidak memegang status, mereka hanya menyimpan akar status (hash dari seluruh status). Mereka menerima blok dan saksi dan menggunakannya untuk memperbarui akar status mereka. Hal ini membuat node validasi menjadi sangat ringan.

Weak statelessness berada dalam tahap penelitian lanjutan, tetapi bergantung pada pemisahan pengusul-pembangun dan Pohon Verkle yang telah diimplementasikan sehingga saksi kecil dapat diteruskan di antara rekan-rekan. Ini berarti weak statelessness mungkin masih beberapa tahun lagi dari mainnet Ethereum.

zkEVM untuk verifikasi L1 adalah teknologi pelengkap yang dapat lebih meningkatkan verifikasi stateless. Alih-alih hanya memeriksa saksi, validator dapat memverifikasi bukti zero-knowledge bahwa seluruh blok telah dieksekusi dengan benar -- memberikan kepastian kriptografis tanpa menjalankan kembali transaksi.

### Strong statelessness {#strong-statelessness}

Strong statelessness menghilangkan kebutuhan node mana pun untuk menyimpan data status. Sebaliknya, transaksi dikirim dengan saksi yang dapat diagregasi oleh produsen blok. Produsen blok kemudian bertanggung jawab untuk menyimpan hanya status yang diperlukan untuk menghasilkan saksi bagi akun yang relevan. Tanggung jawab atas status hampir seluruhnya dipindahkan ke pengguna, karena mereka mengirim saksi dan 'daftar akses' untuk mendeklarasikan akun dan kunci penyimpanan mana yang berinteraksi dengan mereka. Hal ini akan memungkinkan node yang sangat ringan, tetapi ada pengorbanan termasuk membuatnya lebih sulit untuk bertransaksi dengan kontrak pintar.

Strong statelessness telah diselidiki oleh para peneliti tetapi saat ini tidak diharapkan menjadi bagian dari peta jalan Ethereum - kemungkinan besar weak statelessness sudah cukup untuk kebutuhan peningkatan Ethereum.

## Kemajuan saat ini {#current-progress}

Weak statelessness, kedaluwarsa riwayat, dan kedaluwarsa status semuanya dalam tahap penelitian dan diharapkan akan diluncurkan beberapa tahun dari sekarang. Tidak ada jaminan bahwa semua proposal ini akan diimplementasikan, misalnya, jika kedaluwarsa status diimplementasikan terlebih dahulu, mungkin tidak perlu juga mengimplementasikan kedaluwarsa riwayat. Ada juga item peta jalan lainnya, seperti [Pohon Verkle](/roadmap/verkle-trees) dan [Pemisahan pengusul-pembangun](/roadmap/pbs) yang harus diselesaikan terlebih dahulu.

## Bacaan lebih lanjut {#further-reading}

- [Apa itu Ethereum Stateless?](https://stateless.fyi/)
- [AMA statelessness Vitalik](https://www.reddit.com/r/ethereum/comments/o9s15i/impromptu_technical_ama_on_statelessness_and/)
- [Teori manajemen ukuran status](https://hackmd.io/@vbuterin/state_size_management)
- [Pembatasan status yang meminimalkan konflik kebangkitan](https://ethresear.ch/t/resurrection-conflict-minimized-state-bounding-take-2/8739)
- [Jalur menuju statelessness dan kedaluwarsa status](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Spesifikasi EIP-4444](https://eips.ethereum.org/EIPS/eip-4444)
- [Alex Stokes tentang EIP-4444](https://youtu.be/SfDC_qUZaos)
- [Mengapa sangat penting untuk menjadi stateless](https://dankradfeist.de/ethereum/2021/02/14/why-stateless.html)
- [Catatan konsep klien stateless asli](https://ethresear.ch/t/the-stateless-client-concept/172)
- [Lebih lanjut tentang kedaluwarsa status](https://hackmd.io/@vbuterin/state_size_management#A-more-moderate-solution-state-expiry)
- [Bahkan lebih lanjut tentang kedaluwarsa status](https://hackmd.io/@vbuterin/state_expiry_paths#Option-2-per-epoch-state-expiry)
- [Halaman Informasi Ethereum Stateless](https://stateless.fyi)