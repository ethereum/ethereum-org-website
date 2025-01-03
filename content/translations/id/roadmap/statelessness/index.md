---
title: Tanpa kewarganegaraan, masa berlaku kewarganegaraan, dan masa berlaku sejarah
description: Penjelasan tentang kedaluwarsa riwayat dan Ethereum tanpa status
lang: id
---

# Tanpa kewarganegaraan, masa berlaku kewarganegaraan, dan masa berlaku sejarah {#statelessness}

Kemampuan untuk menjalankan simpul Ethereum pada perangkat keras sederhana sangat penting untuk desentralisasi yang sebenarnya. Hal ini karena menjalankan sebuah simpul memberikan pengguna kemampuan untuk memverifikasi informasi dengan melakukan pemeriksaan kriptografi secara mandiri daripada mempercayai pihak ketiga untuk memberi mereka data. Menjalankan sebuah simpul memungkinkan pengguna untuk mengirimkan transaksi secara langsung ke jaringan rekan-ke-rekan Ethereum daripada harus mempercayai perantara. Desentralisasi tidak mungkin dilakukan jika manfaat ini hanya tersedia bagi pengguna dengan perangkat keras yang mahal. Sebaliknya, simpul harus dapat berjalan dengan kebutuhan pemrosesan dan memori yang sangat sederhana sehingga dapat berjalan di ponsel, komputer mikro, atau tanpa disadari di komputer rumah.

Saat ini, kebutuhan ruang disk yang tinggi merupakan penghalang utama yang menghalangi akses universal ke simpul. Hal ini terutama disebabkan oleh kebutuhan untuk menyimpan sebagian besar data status Ethereum. Data status ini berisi informasi penting yang diperlukan untuk memproses blok dan transaksi baru dengan benar. Pada saat artikel ini ditulis, SSD 2TB yang cepat direkomendasikan untuk menjalankan sebuah simpul Ethereum penuh. Untuk sebuah simpul yang tidak memangkas data yang lebih lama, kebutuhan penyimpanan bertambah sekitar 14GB/minggu, dan simpul arsip yang menyimpan semua data sejak awal mendekati 12 TB (pada saat penulisan, pada Februari 2023).

Hard drive yang lebih murah dapat digunakan untuk menyimpan data yang lebih lama, namun terlalu lambat untuk mengimbangi blok yang masuk. Mempertahankan model penyimpanan saat ini untuk klien sambil membuat data lebih murah dan lebih mudah disimpan hanyalah solusi sementara dan parsial untuk masalah ini karena pertumbuhan status Ethereum 'tidak terbatas', yang berarti bahwa kebutuhan penyimpanan hanya akan terus meningkat, dan peningkatan teknologi akan selalu harus mengimbangi pertumbuhan status yang berkelanjutan. Sebaliknya, klien harus menemukan cara baru untuk memverifikasi blok dan transaksi yang tidak bergantung pada pencarian data dari database lokal.

## Mengurangi penyimpanan untuk simpul {#reducing-storage-for-nodes}

Ada beberapa cara untuk mengurangi jumlah data yang harus disimpan oleh setiap simpul, masing-masing membutuhkan protokol inti Ethereum untuk diperbarui ke tingkat yang berbeda:

- **Kadaluarsa riwayat**: memungkinkan simpul untuk menghapus data status yang lebih tua dari X blok, tetapi tidak mengubah cara penanganan data status oleh klien Ethereum
- **Kadaluwarsa status**: memungkinkan data status yang tidak sering digunakan menjadi tidak aktif. Data yang tidak aktif dapat diabaikan oleh klien sampai data tersebut dibangkitkan.
- **Keadaan tanpa status yang lemah**: hanya produsen blok yang perlu mengakses data status lengkap, simpul lain dapat memverifikasi blok tanpa database status lokal.
- **Keadaan tanpa status yang kuat**: tidak ada simpul yang perlu mengakses data status lengkap.

## Data kedaluwarsa {#data-expiry}

### Kadaluarsa riwayat {#history-expiry}

Kedaluwarsa riwayat expiry mengacu pada klien yang memangkas data lama yang tidak mereka perlukan, sehingga mereka hanya menyimpan sedikit data historis, dan menghapus data lama ketika data baru tiba. Ada dua alasan mengapa klien memerlukan data historis: sinkronisasi dan melayani permintaan data. Awalnya, klien harus menyinkronkan dari blok genesis, memverifikasi bahwa setiap blok yang berurutan sudah benar sampai ke kepala rantai. Saat ini, klien menggunakan "pos pemeriksaan subjektivitas yang lemah" untuk melangkahkan kaki mereka ke kepala rantai. Checkpoint ini merupakan titik awal yang terpercaya, seperti memiliki blok genesis yang dekat dengan saat ini, bukan di awal berdirinya Ethereum. Ini berarti klien dapat membuang semua informasi sebelum pos pemeriksaan subjektivitas yang lemah terbaru tanpa kehilangan kemampuan untuk menyinkronkan ke kepala rantai. Klien saat ini melayani permintaan (yang datang melalui JSON-RPC) untuk data historis dengan mengambilnya dari basis data lokal mereka. Namun, dengan riwayat kedaluwarsa, hal ini tidak akan mungkin dilakukan jika data yang diminta telah dipangkas. Menyajikan data historis ini adalah di mana beberapa solusi inovatif diperlukan.

Salah satu pilihannya adalah klien meminta data historis dari rekan-rekannya menggunakan solusi seperti Jaringan Portal. Jaringan Portal adalah jaringan rekan-ke-rekan yang sedang dikembangkan untuk menyajikan data historis di mana setiap simpul menyimpan sepotong kecil sejarah Ethereum sehingga seluruh sejarah yang ada didistribusikan ke seluruh jaringan. Permintaan dilayani dengan mencari rekan-rekan yang menyimpan data yang relevan dan memintanya dari mereka. Atau, karena umumnya aplikasi yang memerlukan akses ke data historis, maka mereka bertanggung jawab untuk menyimpannya. Mungkin juga ada cukup banyak aktor altruistik dalam ruang Ethereum yang bersedia untuk memelihara arsip sejarah. Ini bisa berupa DAO yang berputar untuk mengelola penyimpanan data historis, atau idealnya merupakan kombinasi dari semua opsi ini. Penyedia ini dapat menyajikan data dengan berbagai cara, seperti melalui torrent, FTP, Filecoin, atau IPFS.

Kedaluwarsa riwayat agak kontroversial karena sejauh ini Ethereum selalu secara implisit menjamin ketersediaan data historis apa pun. Sinkronisasi penuh dari genesis selalu dimungkinkan sebagai standar, bahkan jika hal ini bergantung pada pembangunan kembali beberapa data yang lebih lama dari snapshot. Kedaluwarsa riwayat memindahkan tanggung jawab untuk menyediakan jaminan ini di luar protokol inti Ethereum. Hal ini dapat menimbulkan risiko penyensoran baru jika organisasi terpusat yang akhirnya turun tangan untuk menyediakan data historis.

EIP-4444 belum siap untuk dikirim, tetapi sedang dalam diskusi aktif. Menariknya, tantangan dengan EIP-4444 tidak terlalu teknis, tetapi sebagian besar adalah manajemen komunitas. Agar hal ini dapat dilakukan, perlu ada dukungan dari komunitas yang tidak hanya mencakup persetujuan tetapi juga komitmen untuk menyimpan dan menyajikan data historis dari entitas yang dapat dipercaya.

Peningkatan ini tidak secara fundamental mengubah cara simpul Ethereum menangani data status, ini hanya mengubah cara data historis diakses.

### Kadaluwarsa status {#state-expiry}

Kedaluwarsa status mengacu pada penghapusan state dari setiap simpul jika belum pernah diakses baru-baru ini. Ada beberapa cara yang dapat dilakukan untuk mengimplementasikan hal ini, termasuk:

- **Kedaluwarsa berdasarkan sewa**: membebankan "sewa" kepada akun dan mengakhiri akun tersebut saat sewa mencapai nol
- **Kedaluwarsa berdasarkan waktu**: membuat akun tidak aktif jika tidak ada pembacaan/penulisan pada akun tersebut selama jangka waktu tertentu

Masa berlaku dengan sewa dapat berupa sewa langsung yang dibebankan ke akun untuk menjaganya tetap berada dalam basis data status aktif. Kedaluwarsa berdasarkan waktu dapat berupa hitungan mundur dari interaksi akun terakhir, atau dapat juga berupa kedaluwarsa secara berkala untuk semua akun. Mungkin juga ada mekanisme yang menggabungkan elemen-elemen dari kedua model berbasis waktu dan sewa, misalnya akun individu tetap dalam kondisi aktif jika mereka membayar sejumlah kecil biaya sebelum masa berlakunya berakhir. Dalam kadaluarsa keadaan, penting untuk dicatat bahwa keadaan tidak aktif **tidak dihapus**, melainkan disimpan secara terpisah dari keadaan aktif. Status tidak aktif dapat dibangkitkan menjadi status aktif.

Cara kerjanya adalah dengan memiliki pohon status untuk jangka waktu tertentu (mungkin ~1 tahun). Setiap kali periode baru dimulai, begitu juga dengan pohon status yang benar-benar segar. Hanya pohon status saat ini yang dapat dimodifikasi, yang lainnya tidak dapat diubah. Simpul Ethereum hanya diharapkan untuk menyimpan state tree saat ini dan state tree terbaru berikutnya. Hal ini memerlukan cara untuk memberi cap waktu pada alamat dengan periode keberadaannya. Terdapat [beberapa cara mungkin](https://ethereum-magicians.org/t/types-of-resurrection-metadata-in-state-expiry/6607) untuk melakukannya, tetapi opsi utama mengharuskan [alamat-alamat menjadi lebih panjang](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485) untuk menampung informasi tambahan dengan manfaat tambahan bahwa alamat yang lebih panjang lebih aman secara signifikan. Elemen peta perjalanan yang melakukannya disebut [perluasan ruang alamat](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485).

Sama halnya dengan kedaluwarsa riwayat, di bawah kedaluwarsa negara, tanggung jawab untuk menyimpan data negara lama dihapus dari pengguna individu dan didorong ke entitas lain seperti penyedia terpusat, anggota komunitas altruistik, atau solusi terdesentralisasi yang lebih futuristik seperti Jaringan Portal.

Kedaluwarsa status masih dalam tahap penelitian dan belum siap untuk dikirim. Kedaluwarsa status mungkin terjadi lebih lambat daripada klien tanpa kewarganegaraan dan kedaluwarsa riwayat karena peningkatan tersebut membuat ukuran negara yang besar dapat dengan mudah dikelola oleh sebagian besar validator.

## Tanpa kewarganegaraan {#statelessness}

Keadaan tanpa status sedikit keliru karena tidak berarti konsep "status" dihilangkan, tetapi melibatkan perubahan pada bagaimana node Ethereum menangani data status. Keadaan tanpa status itu dsendiri terdiri atas dua jenis: keadaan tanpa status yang lemah dan keadaan tanpa status yang kuat. Keadaan tanpa status yang lemah memungkinkan sebagian besar simpul menjadi tanpa status dengan menempatkan tanggung jawab untuk penyimpanan status pada beberapa simpul. Keadaan tanpa status yang kuat sepenuhnya menghilangkan kebutuhan simpul apa pun untuk menyimpan data status penuh. Baik keadaan tanpa status yang lemah maupun yang kuat menawarkan manfaat berikut ini bagi validator normal:

- sinkronisasi yang hampir instan
- kemampuan untuk memvalidasi blok yang rusak
- simpul yang dapat berjalan dengan kebutuhan perangkat keras yang sangat rendah (misalnya pada ponsel)
- simpul dapat berjalan di atas hard drive yang murah karena tidak diperlukan pembacaan/penulisan disk
- kompatibel dengan peningkatan kriptografi Ethereum di masa mendatang

### Keadaan Tanpa Status yang Lemah {#weak-statelessness}

Keadaan tanpa status yang lemah memang melibatkan perubahan pada cara simpul Ethereum memverifikasi perubahan status, tetapi tidak sepenuhnya menghilangkan kebutuhan akan penyimpanan status di semua simpul di jaringan. Sebaliknya, keadaan tanpa status yang lemah menempatkan tanggung jawab untuk penyimpanan status pada pengusul blok, sementara semua simpul lain dalam jaringan memverifikasi blok tanpa menyimpan data status secara penuh.

**Dalam keadaan tanpa status yang lemah, pengajuan blok membutuhkan akses ke data negara secara penuh, tetapi verifikasi blok tidak membutuhkan data status**

Untuk hal ini terjadi, [pohon Verkle](/roadmap/verkle-trees/) harus sudah diimplementasikan dalam klien-klien Ethereum. Pohon Verkle adalah struktur data pengganti untuk menyimpan data status Ethereum yang memungkinkan "saksi" berukuran kecil dan tetap pada data yang akan diteruskan di antara rekan-rekan dan digunakan untuk memverifikasi blok alih-alih memverifikasi blok terhadap database lokal. [Pemisahan pembangun proposal](/roadmap/pbs/) juga diperlukan karena ini memungkinkan pembangun blok menjadi simpul yang berspesialisasi dengan perangkat keras yang lebih kuat, dan merekalah yang memerlukan akses ke data keadaan penuh.

<ExpandableCard title="Mengapa tidak masalah untuk mengandalkan lebih sedikit pengusul blok?" eventCategory="/roadmap/statelessness" eventName="clicked why is it OK to rely on fewer block proposers?">

Keadaan tanpa status bergantung pada pembangun blok yang menyimpan salinan data negara lengkap sehingga mereka dapat menghasilkan saksi yang dapat digunakan untuk memverifikasi blok. Simpul lain tidak membutuhkan akses ke data status, semua informasi yang diperlukan untuk memverifikasi blok tersedia di saksi. Hal ini menciptakan situasi di mana mengajukan blok itu mahal, tetapi memverifikasi blok itu murah, yang berarti lebih sedikit operator yang akan menjalankan simpul pengajuan blok. Akan tetapi, desentralisasi pengusul blok tidak terlalu penting selama sebanyak mungkin peserta dapat memverifikasi secara independen bahwa blok yang mereka ajukan valid.

<ButtonLink variant="outline-color" href="https://notes.ethereum.org/WUUUXBKWQXORxpFMlLWy-w#So-why-is-it-ok-to-have-expensive-proposers">Baca lebih lanjut tentang catatan Dankrad</ButtonLink>
</ExpandableCard>

Pengusul blok menggunakan data status untuk membuat "saksi" - sekumpulan data minimal yang membuktikan nilai status yang sedang diubah oleh transaksi dalam sebuah blok. Validator lain tidak menyimpan state, mereka hanya menyimpan status akar (hash dari seluruh status). Mereka menerima sebuah blok dan sebuah saksi dan menggunakannya untuk memperbarui status akar mereka. Hal ini membuat simpul validasi menjadi sangat ringan.

Keadaan tanpa status yang lemah sedang dalam tahap penelitian lanjutan, tetapi bergantung pada pemisahan pengusul-pembangun dan Pohon Verkle yang telah diimplementasikan sehingga saksi-saksi kecil dapat diteruskan di antara rekan-rekannya. Ini berarti keadaan tanpa status yang lemah mungkin masih beberapa tahun lagi dari Jaringan Utama Ethereum.

### Keadaan tanpa status yang kuat {#strong-statelessness}

Tanpa kewarganegaraan yang kuat menghilangkan kebutuhan akan blok apa pun untuk menyimpan data negara. Sebagai gantinya, transaksi dikirim dengan saksi yang dapat diagregasi oleh produsen blok. Produsen blok kemudian bertanggung jawab untuk menyimpan hanya status yang diperlukan untuk menghasilkan saksi untuk akun yang relevan. Tanggung jawab untuk menyatakan hampir sepenuhnya berpindah ke pengguna, karena mereka mengirimkan saksi dan 'daftar akses' untuk menyatakan akun dan kunci penyimpanan mana yang berinteraksi dengan mereka. Hal ini akan memungkinkan simpul menjadi sangat ringan, namun ada konsekuensinya, termasuk membuatnya lebih sulit untuk bertransaksi dengan kontrak pintar.

Keadaan tanpa status yang kuat telah diselidiki oleh para peneliti tetapi saat ini tidak diharapkan menjadi bagian dari peta perjalanan Ethereum - kemungkinan besar keadaan tanpa status yang lemah sudah cukup untuk kebutuhan penskalaan Ethereum.

## Kemajuan saat ini {#current-progress}

Keadaan tanpa status yang lemah, kedaluwarsa riwayat, dan kedaluwarsa status seluruhnya ada dalam tahap penelitian dan diperkirakan akan dikirimkan beberapa tahun dari sekarang. Tidak ada jaminan bahwa semua proposal ini akan diimplementasikan, sebagai contoh, jika kedaluwarsa status diimplementasikan terlebih dahulu, mungkin tidak perlu juga mengimplementasikan kedaluwarsa riwayat. Ada juga elemen-elemen peta perjalanan lainnya, seperti [Pohon Verkle](/roadmap/verkle-trees) dan [Pemisahan pembangun Pengusul](/roadmap/pbs) yang perlu diselesaikan terlebih dahulu.

## Bacaan lebih lanjut {#further-reading}

- [AMA keadaan tanpa status vitalik](https://www.reddit.com/r/ethereum/comments/o9s15i/impromptu_technical_ama_on_statelessness_and/)
- [Teori manajemen ukuran status](https://hackmd.io/@vbuterin/state_size_management)
- [Pembatasan status yang meminimalkan konflik kebangkitan](https://ethresear.ch/t/resurrection-conflict-minimized-state-bounding-take-2/8739)
- [Jalan menuju keadaan tanpa status dan kedaluwarsa status](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Spesifikasi EIP-4444](https://eips.ethereum.org/EIPS/eip-4444)
- [Alex Stokes pada EIP-4444](https://youtu.be/SfDC_qUZaos)
- [Mengapa sangat penting untuk masuk ke keadaan tanpa status](https://dankradfeist.de/ethereum/2021/02/14/why-stateless.html)
- [Catatan konsep klien tanpa kewarganegaraan yang asli](https://ethresear.ch/t/the-stateless-client-concept/172)
- [Lebih lanjut tentang kedaluwarsa status](https://hackmd.io/@vbuterin/state_size_management#A-more-moderate-solution-state-expiry)
- [Bahkan lebih lanjut tentang kedaluwarsa status](https://hackmd.io/@vbuterin/state_expiry_paths#Option-2-per-epoch-state-expiry)
