---
title: Block
description: Gambaran umum tentang blok di blockchain Ethereum – struktur datanya, mengapa dibutuhkan, dan bagaimana pembuatannya.
lang: id
---

Blok adalah kumpulan transaksi dengan hash dari blok sebelumnya dalam rantai. Ini menghubungkan blok bersama (dalam rantai) karena hash secara kriptografis berasal dari data blok. Ini mencegah penipuan, karena satu perubahan di blok mana pun dalam riwayat akan membatalkan semua blok berikut karena semua hash berikutnya akan berubah dan semua orang yang menjalankan blockchain akan mengetahuinya.

## Persyaratan {#prerequisites}

Blok adalah topik yang sangat ramah untuk pemula. Namun, untuk membantu Anda lebih memahami halaman ini, kami sarankan Anda membaca [Akun](/developers/docs/accounts/), [Transaksi](/developers/docs/transactions/), dan [pengenalan kami tentang Ethereum](/developers/docs/intro-to-ethereum/) terlebih dahulu.

## Kenapa blok? {#why-blocks}

Untuk memastikan bahwa semua peserta di jaringan Ethereum mempertahankan state tersinkronisasi dan menyetujui riwayat transaksi yang tepat, kami mengelompokkan transaksi ke dalam blok. Ini berarti puluhan (atau ratusan) transaksi dilakukan, disepakati, dan disinkronkan sekaligus.

![Sebuah diagram yang menunjukkan transaksi di dalam blok yang menyebabkan perubahan keadaan](./tx-block.png)
_Diagram diadaptasi dari [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Dengan memberi jarak antar komit, kami memberikan waktu yang cukup kepada semua peserta jaringan untuk mencapai konsensus: meskipun permintaan transaksi terjadi puluhan kali per detik, blok hanya dibuat dan dikomit di Ethereum setiap dua belas detik.

## Cara kerja blok {#how-blocks-work}

Untuk mempertahankan riwayat transaksi, blok diurutkan secara ketat (setiap blok baru yang dibuat berisi referensi ke blok induknya), dan transaksi di dalam blok juga diurutkan secara ketat. Kecuali dalam kasus yang jarang terjadi, pada waktu tertentu, semua peserta di jaringan menyetujui jumlah persis dan riwayat blok, serta berusaha mengelompokkan permintaan transaksi yang berjalan saat ini ke blok berikutnya.

Setelah sebuah blok disatukan oleh validator yang dipilih secara acak di jaringan, blok tersebut disebarkan ke seluruh jaringan; semua node menambahkan blok ini ke akhir blockchain mereka, dan validator baru dipilih untuk membuat blok berikutnya. Proses perakitan blok dan proses komitmen/konsensus yang tepat saat ini ditentukan oleh protokol "proof-of-stake" Ethereum.

## Protokol proof-of-stake {#proof-of-stake-protocol}

Proof-of-stake berarti sebagai berikut:

- Node yang memvalidasi harus mempertaruhkan 32 ETH ke dalam kontrak setoran sebagai jaminan terhadap perilaku buruk. Hal ini membantu melindungi jaringan karena aktivitas yang terbukti tidak jujur dapat menyebabkan sebagian atau seluruh saham tersebut dihancurkan.
- Di setiap slot (dengan jarak dua belas detik), seorang validator dipilih secara acak untuk menjadi pengusul blok. Mereka menggabungkan transaksi bersama, mengeksekusinya, dan menentukan 'keadaan' baru. Mereka membungkus informasi ini ke dalam sebuah blok dan menyebarkannya ke validator lain.
- Validator lain yang mendengar tentang blok baru ini akan mengeksekusi ulang transaksi untuk memastikan bahwa mereka setuju dengan perubahan yang diusulkan pada keadaan global. Dengan asumsi blok tersebut valid, mereka menambahkannya ke basis data mereka sendiri.
- Jika validator mendengar tentang dua blok yang saling bertentangan untuk slot yang sama, mereka menggunakan algoritme fork-choice untuk memilih salah satu yang didukung oleh ETH yang paling banyak dipertaruhkan.

[Selengkapnya tentang proof-of-stake](/developers/docs/consensus-mechanisms/pos)

## Apa isi dari sebuah blok? {#block-anatomy}

Ada banyak informasi yang terkandung dalam sebuah blok. Pada tingkat tertinggi, sebuah blok berisi bidang-bidang berikut:

| Bidang           | Deskripsi                                                                  |
| :--------------- | :------------------------------------------------------------------------- |
| `slot`           | slot milik blok tersebut                                                   |
| `proposer_index` | identitas dari validator yang mengusulkan blok                             |
| `parent_root`    | hash dari blok sebelumnya                                                  |
| `state_root`     | hash akar dari objek status                                                |
| `tubuh`          | objek yang berisi beberapa bidang, seperti yang didefinisikan di bawah ini |

`Body` blok berisi beberapa bidangnya sendiri:

| Bidang               | Deskripsi                                                        |
| :------------------- | :--------------------------------------------------------------- |
| `randao_reveal`      | nilai yang digunakan untuk memilih pengusul blok berikutnya      |
| `eth1_data`          | informasi tentang kontrak deposito                               |
| `graffiti`           | data arbitrer yang digunakan untuk menandai blok                 |
| `proposer_slashings` | daftar validator yang akan dipotong                              |
| `attester_slashings` | daftar pengesah yang akan dipotong                               |
| `atestasi`           | daftar atestasi yang dibuat terhadap slot-slot sebelumnya        |
| `setoran`            | daftar setoran baru untuk kontrak deposito                       |
| `voluntary_exits`    | daftar validator yang keluar dari jaringan                       |
| `sync_aggregate`     | subset dari validator yang digunakan untuk melayani klien ringan |
| `execution_payload`  | transaksi yang dilewatkan dari klien eksekusi                    |

Bidang `attestations` berisi daftar semua atestasi di dalam blok. Pengesahan memiliki tipe data mereka sendiri yang berisi beberapa bagian data. Setiap pengesahan berisi:

| Bidang             | Deskripsi                                                           |
| :----------------- | :------------------------------------------------------------------ |
| `aggregation_bits` | daftar validator yang berpartisipasi dalam pengesahan ini           |
| `data`             | wadah dengan beberapa subbidang                                     |
| `tanda tangan`     | tanda tangan agregat dari satu set validator terhadap bagian `data` |

Bidang `data` dalam `attestation` berisi hal-hal berikut:

| Bidang              | Deskripsi                                                     |
| :------------------ | :------------------------------------------------------------ |
| `slot`              | slot yang berhubungan dengan pengesahan tersebut              |
| `index`             | indeks untuk mengesahkan validator                            |
| `beacon_block_root` | hash root dari blok Beacon yang dilihat sebagai kepala rantai |
| `sumber`            | pos pemeriksaan terakhir yang dibenarkan                      |
| `target`            | blok batas zaman terbaru                                      |

Mengeksekusi transaksi dalam `execution_payload` akan memperbarui status global. Semua klien mengeksekusi ulang transaksi dalam `execution_payload` untuk memastikan status baru cocok dengan yang ada di bidang `state_root` blok baru. Dengan cara inilah klien dapat mengetahui bahwa blok baru tersebut valid dan aman untuk ditambahkan ke dalam blockchain mereka. `execution_payload` itu sendiri adalah sebuah objek dengan beberapa bidang. Ada juga `execution_payload_header` yang berisi informasi ringkasan penting tentang data eksekusi. Struktur data ini diatur sebagai berikut:

`execution_payload_header` berisi bidang-bidang berikut:

| Bidang              | Deskripsi                                                              |
| :------------------ | :--------------------------------------------------------------------- |
| `parent_hash`       | hash dari blok induk                                                   |
| `fee_recipient`     | alamat rekening untuk membayar biaya transaksi ke                      |
| `state_root`        | hash root untuk status global setelah menerapkan perubahan di blok ini |
| `receipts_root`     | hash dari tanda terima transaksi trie                                  |
| `logs_bloom`        | struktur data yang berisi log peristiwa                                |
| `prev_randao`       | nilai yang digunakan dalam pemilihan validator secara acak             |
| `block_number`      | jumlah blok saat ini                                                   |
| `gas_limit`         | gas maksimum yang diperbolehkan di blok ini                            |
| `gas_used`          | jumlah aktual gas yang digunakan di blok ini                           |
| `timestamp`         | waktu blok                                                             |
| `extra_data`        | data tambahan sewenang-wenang sebagai byte mentah                      |
| `base_fee_per_gas`  | nilai biaya dasar                                                      |
| `block_hash`        | Hash blok eksekusi                                                     |
| `transactions_root` | hash akar dari transaksi dalam muatan                                  |
| `withdrawal_root`   | hash akar dari penarikan dalam muatan                                  |

`execution_payload` itu sendiri berisi hal-hal berikut (perhatikan bahwa ini identik dengan header kecuali bahwa alih-alih hash root dari transaksi, ini mencakup daftar transaksi yang sebenarnya dan informasi penarikan) :

| Bidang             | Deskripsi                                                              |
| :----------------- | :--------------------------------------------------------------------- |
| `parent_hash`      | hash dari blok induk                                                   |
| `fee_recipient`    | alamat rekening untuk membayar biaya transaksi ke                      |
| `state_root`       | hash root untuk status global setelah menerapkan perubahan di blok ini |
| `receipts_root`    | hash dari tanda terima transaksi trie                                  |
| `logs_bloom`       | struktur data yang berisi log peristiwa                                |
| `prev_randao`      | nilai yang digunakan dalam pemilihan validator secara acak             |
| `block_number`     | jumlah blok saat ini                                                   |
| `gas_limit`        | gas maksimum yang diperbolehkan di blok ini                            |
| `gas_used`         | jumlah aktual gas yang digunakan di blok ini                           |
| `timestamp`        | waktu blok                                                             |
| `extra_data`       | data tambahan sewenang-wenang sebagai byte mentah                      |
| `base_fee_per_gas` | nilai biaya dasar                                                      |
| `block_hash`       | Hash blok eksekusi                                                     |
| `transaksi`        | daftar transaksi yang akan dieksekusi                                  |
| `penarikan`        | daftar objek penarikan                                                 |

Daftar `withdrawals` berisi objek-objek `withdrawal` yang terstruktur dengan cara berikut:

| Bidang           | Deskripsi                                      |
| :--------------- | :--------------------------------------------- |
| `alamat`         | alamat rekening yang telah melakukan penarikan |
| `jumlah`         | jumlah penarikan                               |
| `index`          | nilai indeks penarikan                         |
| `validatorIndex` | nilai indeks validator                         |

## Waktu blok {#block-time}

Waktu blok mengacu pada waktu yang memisahkan blok. Dalam Ethereum, waktu dibagi menjadi dua belas satuan detik yang disebut 'slot'. Di setiap slot, satu validator dipilih untuk mengajukan sebuah blok. Dengan asumsi semua validator online dan berfungsi penuh, akan ada blokir di setiap slot, yang berarti waktu blokir adalah 12 detik. Namun, terkadang validator mungkin sedang offline saat dipanggil untuk mengajukan blok, yang berarti slot terkadang kosong.

Implementasi ini berbeda dengan sistem berbasis proof-of-work di mana waktu blok bersifat probabilistik dan disesuaikan dengan target kesulitan penambangan protokol. [Waktu blok rata-rata](https://etherscan.io/chart/blocktime) Ethereum adalah contoh sempurna dari hal ini di mana transisi dari proof-of-work ke proof-of-stake dapat disimpulkan dengan jelas berdasarkan konsistensi waktu blok 12 detik yang baru.

## Ukuran blok {#block-size}

Catatan penting terakhir adalah bahwa blok itu sendiri terbatas dalam ukurannya. Setiap blok memiliki ukuran target sebesar 30 juta gas, tetapi ukuran blok akan bertambah atau berkurang sesuai dengan permintaan jaringan, hingga batas blok sebesar 60 juta gas (2x ukuran blok target). Batas gas blok dapat diatur ke atas atau ke bawah sebanyak faktor dari 1/1024 dari batas gas blok sebelumnya. Hasilnya, validator dapat mengubah batas gas blok melalui konsensus. Jumlah total gas yang terpakai oleh semua transaksi dalam blok harus kurang dari batas gas blok. Ini penting karena memastikan bahwa blok tidak boleh terlalu besar. Jika blok dapat berukuran besar tanpa terkendali, maka node penuh yang berkinerja kurang secara bertahap akan berhenti untuk dapat menyesuaikan dengan jaringan karena persyaratan ruang dan kecepatan. Semakin besar blok, semakin besar daya komputasi yang diperlukan untuk memprosesnya tepat waktu untuk slot berikutnya. Ini adalah gaya pemusatan, yang dilawan dengan membatasi ukuran blok.

## Bacaan lebih lanjut {#further-reading}

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Topik terkait {#related-topics}

- [Transaksi](/developers/docs/transactions/)
- [Gas](/developers/docs/gas/)
- [Proof-of-stake](/developers/docs/consensus-mechanisms/pos)
