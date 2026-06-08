---
title: Ketiadaan state, kedaluwarsa state, dan kedaluwarsa riwayat
description: Penjelasan tentang kedaluwarsa riwayat dan ketiadaan state Ethereum
lang: id
---

Kemampuan untuk menjalankan node [Ethereum](/) pada perangkat keras yang sederhana sangat penting untuk desentralisasi sejati. Hal ini karena menjalankan node memberi pengguna kemampuan untuk memverifikasi informasi dengan melakukan pemeriksaan kriptografi secara mandiri daripada memercayai pihak ketiga untuk memberikan data kepada mereka. Menjalankan node memungkinkan pengguna untuk mengirimkan transaksi secara langsung ke jaringan peer-to-peer Ethereum daripada harus memercayai perantara. Desentralisasi tidak mungkin terjadi jika manfaat ini hanya tersedia bagi pengguna dengan perangkat keras yang mahal. Sebaliknya, node harus dapat berjalan dengan persyaratan pemrosesan dan memori yang sangat sederhana sehingga dapat berjalan di ponsel, komputer mikro, atau berjalan tanpa disadari di komputer rumah.

Saat ini, persyaratan ruang disk yang tinggi adalah hambatan utama yang mencegah akses universal ke node. Hal ini terutama disebabkan oleh kebutuhan untuk menyimpan sebagian besar data state Ethereum. Data state ini berisi informasi penting yang diwajibkan untuk memproses blok dan transaksi baru dengan benar. Pada saat penulisan, SSD 2TB yang cepat direkomendasikan untuk menjalankan node Ethereum penuh. Untuk node yang tidak memangkas data lama apa pun, persyaratan penyimpanan tumbuh sekitar 14GB/minggu, dan node arsip yang menyimpan semua data sejak genesis mendekati 12 TB (pada saat penulisan, pada Februari 2023).

Hard drive yang lebih murah dapat digunakan untuk menyimpan data lama tetapi terlalu lambat untuk mengimbangi blok yang masuk. Mempertahankan model penyimpanan saat ini untuk klien sambil membuat data lebih murah dan lebih mudah disimpan hanyalah solusi sementara dan parsial untuk masalah ini karena pertumbuhan state Ethereum 'tidak terbatas', yang berarti bahwa persyaratan penyimpanan hanya akan terus meningkat, dan peningkatan teknologi harus selalu mengimbangi pertumbuhan state yang terus-menerus. Sebaliknya, klien harus menemukan cara baru untuk memverifikasi blok dan transaksi yang tidak bergantung pada pencarian data dari basis data lokal.

## Mengurangi penyimpanan untuk node {#reducing-storage-for-nodes}

Ada beberapa cara untuk mengurangi jumlah data yang harus disimpan oleh setiap node, yang masing-masing mewajibkan protokol inti Ethereum untuk diperbarui ke tingkat yang berbeda:

- **Kedaluwarsa riwayat**: memungkinkan node untuk membuang data state yang lebih lama dari X blok, tetapi tidak mengubah cara klien Ethereum menangani data state.
- **Kedaluwarsa state**: memungkinkan data state yang tidak sering digunakan menjadi tidak aktif. Data yang tidak aktif dapat diabaikan oleh klien hingga dibangkitkan kembali.
- **Ketiadaan state lemah**: hanya produsen blok yang memerlukan akses ke data state penuh, node lain dapat memverifikasi blok tanpa basis data state lokal.
- **Ketiadaan state kuat**: tidak ada node yang memerlukan akses ke data state penuh.

## Kedaluwarsa data {#data-expiry}

### Kedaluwarsa riwayat {#history-expiry}

Kedaluwarsa riwayat mengacu pada klien yang memangkas data lama yang kemungkinan tidak mereka perlukan, sehingga mereka hanya menyimpan sejumlah kecil data historis, membuang data lama saat data baru tiba. Ada dua alasan klien mewajibkan data historis: sinkronisasi dan melayani permintaan data. Awalnya, klien harus melakukan sinkronisasi dari blok genesis, memverifikasi bahwa setiap blok yang berurutan sudah benar hingga ke ujung rantai. Saat ini, klien menggunakan "titik periksa subjektivitas lemah" untuk melakukan bootstrap ke ujung rantai. Titik periksa ini adalah titik awal tepercaya, seperti memiliki blok genesis yang dekat dengan masa kini daripada di awal mula Ethereum. Ini berarti klien dapat membuang semua informasi sebelum titik periksa subjektivitas lemah terbaru tanpa kehilangan kemampuan untuk melakukan sinkronisasi ke ujung rantai. Klien saat ini melayani permintaan (yang tiba melalui JSON-RPC) untuk data historis dengan mengambilnya dari basis data lokal mereka. Namun, dengan kedaluwarsa riwayat, hal ini tidak akan mungkin terjadi jika data yang diminta telah dipangkas. Melayani data historis ini adalah tempat di mana beberapa solusi inovatif diwajibkan.

Salah satu opsinya adalah klien meminta data historis dari rekan menggunakan solusi seperti Portal Network. Portal Network adalah jaringan peer-to-peer yang sedang dalam pengembangan untuk melayani data historis di mana setiap node menyimpan sebagian kecil riwayat Ethereum sehingga seluruh riwayat ada dan terdistribusi di seluruh jaringan. Permintaan dilayani dengan mencari rekan yang menyimpan data yang relevan dan memintanya dari mereka. Sebagai alternatif, karena umumnya aplikasi yang mewajibkan akses ke data historis, hal itu dapat menjadi tanggung jawab mereka untuk menyimpannya. Mungkin juga ada cukup banyak aktor altruistik di ruang Ethereum yang bersedia memelihara arsip historis. Bisa jadi DAO yang dibentuk untuk mengelola penyimpanan data historis, atau idealnya akan menjadi kombinasi dari semua opsi ini. Penyedia ini dapat menyajikan data dengan banyak cara, seperti di torrent, FTP, Filecoin, atau IPFS.

Kedaluwarsa riwayat agak kontroversial karena sejauh ini Ethereum selalu secara implisit menjamin ketersediaan data historis apa pun. Sinkronisasi penuh dari genesis selalu dimungkinkan sebagai standar, bahkan jika itu bergantung pada pembangunan kembali beberapa data lama dari snapshot. Kedaluwarsa riwayat memindahkan tanggung jawab untuk memberikan jaminan ini ke luar protokol inti Ethereum. Hal ini dapat menimbulkan risiko penyensoran baru jika organisasi terpusat yang pada akhirnya turun tangan untuk menyediakan data historis.

EIP-4444 belum siap untuk diluncurkan, tetapi sedang dalam diskusi aktif. Menariknya, tantangan dengan EIP-4444 tidak terlalu bersifat teknis, tetapi sebagian besar adalah manajemen komunitas. Agar ini dapat diluncurkan, perlu ada dukungan komunitas yang mencakup tidak hanya kesepakatan tetapi juga komitmen untuk menyimpan dan menyajikan data historis dari entitas yang dapat dipercaya.

Peningkatan ini pada dasarnya tidak mengubah cara node Ethereum menangani data state, ini hanya mengubah cara data historis diakses.

### Kedaluwarsa state {#state-expiry}

Kedaluwarsa state mengacu pada penghapusan state dari node individu jika belum diakses baru-baru ini. Ada beberapa cara ini dapat diimplementasikan, termasuk:

- **Kedaluwarsa berdasarkan sewa**: membebankan "sewa" ke akun dan membuatnya kedaluwarsa saat sewa mereka mencapai nol
- **Kedaluwarsa berdasarkan waktu**: membuat akun tidak aktif jika tidak ada pembacaan/penulisan ke akun tersebut selama beberapa waktu

Kedaluwarsa berdasarkan sewa dapat berupa sewa langsung yang dibebankan ke akun untuk menyimpannya di basis data state aktif. Kedaluwarsa berdasarkan waktu dapat berupa hitung mundur dari interaksi akun terakhir, atau dapat berupa kedaluwarsa berkala dari semua akun. Bisa juga ada mekanisme yang menggabungkan elemen dari model berbasis waktu dan sewa, misalnya akun individu bertahan dalam state aktif jika mereka membayar sedikit biaya sebelum kedaluwarsa berbasis waktu. Dengan kedaluwarsa state, penting untuk dicatat bahwa state yang tidak aktif **tidak dihapus**, melainkan hanya disimpan secara terpisah dari state aktif. State yang tidak aktif dapat dibangkitkan kembali ke dalam state aktif.

Cara kerjanya mungkin dengan memiliki pohon state untuk periode waktu tertentu (mungkin ~1 tahun). Setiap kali periode baru dimulai, begitu pula pohon state yang benar-benar baru. Hanya pohon state saat ini yang dapat dimodifikasi, semua yang lain tidak dapat diubah. Node Ethereum hanya diharapkan untuk menyimpan pohon state saat ini dan satu pohon state terbaru sebelumnya. Hal ini mewajibkan cara untuk memberi stempel waktu pada alamat dengan periode keberadaannya. Ada [beberapa kemungkinan cara](https://ethereum-magicians.org/t/types-of-resurrection-metadata-in-state-expiry/6607) untuk melakukan ini, tetapi opsi utamanya mewajibkan [alamat untuk diperpanjang](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485) guna mengakomodasi informasi tambahan dengan manfaat tambahan bahwa alamat yang lebih panjang jauh lebih aman. Item peta jalan yang melakukan ini disebut [ekstensi ruang alamat](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485).

Mirip dengan kedaluwarsa riwayat, di bawah kedaluwarsa state, tanggung jawab untuk menyimpan data state lama dihapus dari pengguna individu dan didorong ke entitas lain seperti penyedia terpusat, anggota komunitas altruistik, atau solusi terdesentralisasi yang lebih futuristik seperti Portal Network.

Kedaluwarsa state masih dalam tahap penelitian dan belum siap untuk diluncurkan. Kedaluwarsa state mungkin terjadi lebih lambat daripada klien tanpa state dan kedaluwarsa riwayat karena peningkatan tersebut membuat ukuran state yang besar mudah dikelola oleh sebagian besar validator.

## Ketiadaan state {#statelessness-2}

Ketiadaan state adalah istilah yang sedikit keliru karena tidak berarti konsep "state" dihilangkan, tetapi ini melibatkan perubahan pada cara node Ethereum menangani data state. Ketiadaan state itu sendiri hadir dalam dua varian: ketiadaan state lemah dan ketiadaan state kuat. Ketiadaan state lemah memungkinkan sebagian besar node menjadi tanpa state dengan meletakkan tanggung jawab penyimpanan state pada beberapa node saja. Ketiadaan state kuat sepenuhnya menghilangkan kebutuhan node mana pun untuk menyimpan data state penuh. Baik ketiadaan state lemah maupun kuat menawarkan manfaat berikut bagi validator normal:

- sinkronisasi yang hampir instan
- kemampuan untuk memvalidasi blok yang tidak berurutan
- node dapat berjalan dengan persyaratan perangkat keras yang sangat rendah (misalnya, di ponsel)
- node dapat berjalan di atas hard drive murah karena tidak ada pembacaan/penulisan disk yang diwajibkan
- kompatibel dengan peningkatan kriptografi Ethereum di masa mendatang

### Ketiadaan State Lemah {#weak-statelessness}

Ketiadaan state lemah memang melibatkan perubahan pada cara node Ethereum memverifikasi perubahan state, tetapi tidak sepenuhnya menghilangkan kebutuhan penyimpanan state di semua node di jaringan. Sebaliknya, ketiadaan state lemah meletakkan tanggung jawab penyimpanan state pada pengusul blok, sementara semua node lain di jaringan memverifikasi blok tanpa menyimpan data state penuh.

**Dalam ketiadaan state lemah, mengusulkan blok mewajibkan akses ke data state penuh tetapi memverifikasi blok tidak mewajibkan data state**

Agar hal ini terjadi, [Pohon Verkle](/roadmap/verkle-trees/) harus sudah diimplementasikan di klien Ethereum. Pohon Verkle adalah struktur data pengganti untuk menyimpan data state Ethereum yang memungkinkan "saksi" berukuran kecil dan tetap untuk data tersebut diteruskan antar rekan dan digunakan untuk memverifikasi blok alih-alih memverifikasi blok terhadap basis data lokal. [Pemisahan pengusul-pembangun (PBS)](/roadmap/pbs/) juga diwajibkan karena ini memungkinkan pembangun blok menjadi node khusus dengan perangkat keras yang lebih kuat, dan merekalah yang mewajibkan akses ke data state penuh.

<ExpandableCard title="Mengapa tidak masalah mengandalkan lebih sedikit pengusul blok?" eventCategory="/roadmap/statelessness" eventName="clicked why is it OK to rely on fewer block proposers?">

Ketiadaan state bergantung pada pembangun blok yang memelihara salinan data state penuh sehingga mereka dapat menghasilkan saksi yang dapat digunakan untuk memverifikasi blok. Node lain tidak memerlukan akses ke data state, semua informasi yang diwajibkan untuk memverifikasi blok tersedia di dalam saksi. Hal ini menciptakan situasi di mana mengusulkan blok itu mahal, tetapi memverifikasi blok itu murah, yang menyiratkan lebih sedikit operator yang akan menjalankan node pengusul blok. Namun, desentralisasi pengusul blok tidaklah kritis selama sebanyak mungkin peserta dapat memverifikasi secara mandiri bahwa blok yang mereka usulkan adalah valid.

<ButtonLink variant="outline-color" href="https://notes.ethereum.org/WUUUXBKWQXORxpFMlLWy-w#So-why-is-it-ok-to-have-expensive-proposers">Baca selengkapnya di catatan Dankrad</ButtonLink>
</ButtonLink>

Pengusul blok menggunakan data state untuk membuat "saksi" - kumpulan data minimal yang membuktikan nilai state yang sedang diubah oleh transaksi dalam sebuah blok. Validator lain tidak memegang state, mereka hanya menyimpan akar state (hash dari seluruh state). Mereka menerima blok dan saksi lalu menggunakannya untuk memperbarui akar state mereka. Hal ini membuat node validasi menjadi sangat ringan.

Ketiadaan state lemah berada dalam tahap penelitian lanjutan, tetapi bergantung pada pemisahan pengusul-pembangun dan Pohon Verkle yang harus diimplementasikan sehingga saksi kecil dapat diteruskan antar rekan. Ini berarti ketiadaan state lemah mungkin masih beberapa tahun lagi dari Mainnet Ethereum.

[zkEVM untuk verifikasi l1](/roadmap/zkevm/) adalah teknologi pelengkap yang dapat lebih meningkatkan verifikasi tanpa state. Alih-alih hanya memeriksa saksi, validator dapat memverifikasi bukti tanpa pengetahuan bahwa seluruh blok dieksekusi dengan benar—memberikan kepastian kriptografi tanpa mengeksekusi ulang transaksi.

### Ketiadaan state kuat {#strong-statelessness}

Ketiadaan state kuat menghilangkan kebutuhan node mana pun untuk menyimpan data state. Sebaliknya, transaksi dikirim dengan saksi yang dapat diagregasi oleh produsen blok. Produsen blok kemudian bertanggung jawab untuk menyimpan hanya state yang diperlukan untuk menghasilkan saksi bagi akun yang relevan. Tanggung jawab atas state hampir sepenuhnya dipindahkan ke pengguna, karena mereka mengirimkan saksi dan 'daftar akses' untuk mendeklarasikan akun dan kunci penyimpanan mana yang berinteraksi dengan mereka. Hal ini akan memungkinkan node yang sangat ringan, tetapi ada pengorbanan termasuk membuatnya lebih sulit untuk bertransaksi dengan kontrak pintar.

Ketiadaan state kuat telah diselidiki oleh para peneliti tetapi saat ini tidak diharapkan menjadi bagian dari peta jalan Ethereum - kemungkinan besar ketiadaan state lemah sudah cukup untuk kebutuhan penskalaan Ethereum.

## Kemajuan saat ini {#current-progress}

Ketiadaan state lemah, kedaluwarsa riwayat, dan kedaluwarsa state semuanya masih dalam tahap penelitian dan diharapkan akan diluncurkan beberapa tahun dari sekarang. Tidak ada jaminan bahwa semua proposal ini akan diimplementasikan, misalnya, jika kedaluwarsa state diimplementasikan terlebih dahulu, mungkin tidak perlu juga mengimplementasikan kedaluwarsa riwayat. Ada juga item peta jalan lainnya, seperti [Pohon Verkle](/roadmap/verkle-trees) dan [Pemisahan pengusul-pembangun (PBS)](/roadmap/pbs) yang perlu diselesaikan terlebih dahulu.

## Bacaan lebih lanjut {#further-reading}

- [Apa itu Ethereum Tanpa State?](https://stateless.fyi/)
- [AMA ketiadaan state Vitalik](https://www.reddit.com/r/ethereum/comments/o9s15i/impromptu_technical_ama_on_statelessness_and/)
- [Teori manajemen ukuran state](https://hackmd.io/@vbuterin/state_size_management)
- [Pembatasan state yang meminimalkan konflik kebangkitan](https://ethresear.ch/t/resurrection-conflict-minimized-state-bounding-take-2/8739)
- [Jalur menuju ketiadaan state dan kedaluwarsa state](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Spesifikasi EIP-4444](https://eips.ethereum.org/EIPS/eip-4444)
- [Alex Stokes tentang EIP-4444](https://youtu.be/SfDC_qUZaos)
- [Mengapa sangat penting untuk menjadi tanpa state](https://dankradfeist.de/ethereum/2021/02/14/why-stateless.html)
- [Catatan konsep klien tanpa state asli](https://ethresear.ch/t/the-stateless-client-concept/172)
- [Lebih lanjut tentang kedaluwarsa state](https://hackmd.io/@vbuterin/state_size_management#A-more-moderate-solution-state-expiry)
- [Lebih banyak lagi tentang kedaluwarsa state](https://hackmd.io/@vbuterin/state_expiry_paths#Option-2-per-epoch-state-expiry)
- [Halaman Informasi Ethereum Tanpa State](https://stateless.fyi)