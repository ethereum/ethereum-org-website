---
title: Blok
description: "Gambaran umum tentang blok di blockchain Ethereum – struktur datanya, mengapa mereka dibutuhkan, dan bagaimana mereka dibuat."
lang: id
---

Blok adalah sekumpulan transaksi dengan sebuah hash dari blok sebelumnya di dalam rantai. Ini menghubungkan blok-blok bersama (dalam sebuah rantai) karena hash diturunkan secara kriptografi dari data blok. Hal ini mencegah penipuan, karena satu perubahan pada blok mana pun dalam sejarah akan membatalkan semua blok berikutnya karena semua hash selanjutnya akan berubah dan semua orang yang menjalankan blockchain akan menyadarinya.

## Prasyarat {#prerequisites}

Blok adalah topik yang sangat ramah pemula. Namun untuk membantu Anda lebih memahami halaman ini, kami sarankan Anda membaca terlebih dahulu [Akun](/developers/docs/accounts/), [Transaksi](/developers/docs/transactions/), dan [pengantar Ethereum](/developers/docs/intro-to-ethereum/) kami.

## Mengapa blok? {#why-blocks}

Untuk memastikan bahwa semua peserta di jaringan [Ethereum](/) mempertahankan status yang tersinkronisasi dan menyetujui riwayat transaksi yang tepat, kami mengelompokkan transaksi ke dalam blok. Ini berarti puluhan (atau ratusan) transaksi dikomit, disetujui, dan disinkronkan sekaligus.

![Sebuah diagram yang menunjukkan transaksi dalam sebuah blok yang menyebabkan perubahan status](./tx-block.png)
_Diagram diadaptasi dari [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Dengan memberi jarak pada komit, kami memberi semua peserta jaringan cukup waktu untuk mencapai konsensus: meskipun permintaan transaksi terjadi puluhan kali per detik, blok hanya dibuat dan dikomit di Ethereum setiap dua belas detik sekali.

## Bagaimana blok bekerja {#how-blocks-work}

Untuk mempertahankan riwayat transaksi, blok diurutkan secara ketat (setiap blok baru yang dibuat berisi referensi ke blok induknya), dan transaksi di dalam blok juga diurutkan secara ketat. Kecuali dalam kasus yang jarang terjadi, pada waktu tertentu, semua peserta di jaringan sepakat tentang jumlah pasti dan riwayat blok, dan bekerja untuk mengelompokkan permintaan transaksi langsung saat ini ke dalam blok berikutnya.

Setelah sebuah blok disatukan oleh validator yang dipilih secara acak di jaringan, blok tersebut disebarkan ke seluruh jaringan; semua node menambahkan blok ini ke akhir blockchain mereka, dan validator baru dipilih untuk membuat blok berikutnya. Proses perakitan blok dan proses komitmen/konsensus yang tepat saat ini ditentukan oleh protokol "proof-of-stake" Ethereum.

## Protokol proof-of-stake {#proof-of-stake-protocol}

Proof-of-stake berarti sebagai berikut:

- Node validasi harus melakukan stake 32 ETH ke dalam kontrak deposit sebagai jaminan terhadap perilaku buruk. Ini membantu melindungi jaringan karena aktivitas tidak jujur yang dapat dibuktikan menyebabkan sebagian atau seluruh stake tersebut dihancurkan.
- Di setiap slot (berjarak dua belas detik) seorang validator dipilih secara acak untuk menjadi pengusul blok. Mereka menggabungkan transaksi bersama-sama, mengeksekusinya, dan menentukan 'status' baru. Mereka membungkus informasi ini ke dalam sebuah blok dan meneruskannya ke validator lain.
- Validator lain yang mendengar tentang blok baru mengeksekusi ulang transaksi untuk memastikan mereka setuju dengan perubahan yang diusulkan pada status global. Dengan asumsi blok tersebut valid, mereka menambahkannya ke basis data mereka sendiri.
- Jika seorang validator mendengar tentang dua blok yang bertentangan untuk slot yang sama, mereka menggunakan algoritma pilihan fork mereka untuk memilih salah satu yang didukung oleh ETH yang di-stake paling banyak.

[Lebih lanjut tentang proof-of-stake](/developers/docs/consensus-mechanisms/pos)

## Apa yang ada di dalam sebuah blok? {#block-anatomy}

Ada banyak informasi yang terkandung di dalam sebuah blok. Pada tingkat tertinggi, sebuah blok berisi bidang-bidang berikut:

| Bidang           | Deskripsi                                                                     |
| :--------------- | :---------------------------------------------------------------------------- |
| `slot`           | slot tempat blok tersebut berada                                              |
| `proposer_index` | ID dari validator yang mengusulkan blok                                       |
| `parent_root`    | hash dari blok sebelumnya                                                     |
| `state_root`     | hash root dari objek status                                                   |
| `body`           | sebuah objek yang berisi beberapa bidang, seperti yang didefinisikan di bawah |

`body` blok berisi beberapa bidangnya sendiri:

| Bidang               | Deskripsi                                                |
| :------------------- | :------------------------------------------------------- |
| `randao_reveal`      | sebuah nilai yang digunakan untuk memilih pengusul blok berikutnya |
| `eth1_data`          | informasi tentang kontrak deposit                        |
| `graffiti`           | data arbitrer yang digunakan untuk menandai blok         |
| `proposer_slashings` | daftar validator yang akan dipotong                      |
| `attester_slashings` | daftar pengesah yang akan dipotong                       |
| `attestations`       | daftar pengesahan yang dibuat terhadap slot sebelumnya   |
| `deposits`           | daftar deposit baru ke kontrak deposit                   |
| `voluntary_exits`    | daftar validator yang keluar dari jaringan               |
| `sync_aggregate`     | subset validator yang digunakan untuk melayani klien ringan |
| `execution_payload`  | transaksi yang diteruskan dari klien eksekusi            |

Bidang `attestations` berisi daftar semua pengesahan di dalam blok. Pengesahan memiliki tipe datanya sendiri yang berisi beberapa bagian data. Setiap pengesahan berisi:

| Bidang             | Deskripsi                                                              |
| :----------------- | :--------------------------------------------------------------------- |
| `aggregation_bits` | daftar validator mana yang berpartisipasi dalam pengesahan ini         |
| `data`             | sebuah wadah dengan beberapa subbidang                                 |
| `signature`        | tanda tangan agregat dari sekumpulan validator terhadap bagian `data`  |

Bidang `data` dalam `attestation` berisi hal-hal berikut:

| Bidang              | Deskripsi                                                               |
| :------------------ | :---------------------------------------------------------------------- |
| `slot`              | slot yang berkaitan dengan pengesahan                                   |
| `index`             | indeks untuk validator yang mengesahkan                                 |
| `beacon_block_root` | hash root dari blok beacon chain yang dilihat sebagai kepala rantai     |
| `source`            | pos pemeriksaan terakhir yang dibenarkan                                |
| `target`            | blok batas epoch terbaru                                                |

Mengeksekusi transaksi dalam `execution_payload` memperbarui status global. Semua klien mengeksekusi ulang transaksi dalam `execution_payload` untuk memastikan status baru cocok dengan yang ada di bidang `state_root` blok baru. Ini adalah cara klien dapat mengetahui bahwa blok baru valid dan aman untuk ditambahkan ke blockchain mereka. `execution payload` itu sendiri adalah sebuah objek dengan beberapa bidang. Ada juga `execution_payload_header` yang berisi informasi ringkasan penting tentang data eksekusi. Struktur data ini diatur sebagai berikut:

`execution_payload_header` berisi bidang-bidang berikut:

| Bidang              | Deskripsi                                                               |
| :------------------ | :---------------------------------------------------------------------- |
| `parent_hash`       | hash dari blok induk                                                    |
| `fee_recipient`     | alamat akun untuk membayar biaya transaksi                              |
| `state_root`        | hash root untuk status global setelah menerapkan perubahan di blok ini  |
| `receipts_root`     | hash dari trie tanda terima transaksi                                   |
| `logs_bloom`        | struktur data yang berisi log peristiwa                                 |
| `prev_randao`       | nilai yang digunakan dalam pemilihan validator acak                     |
| `block_number`      | nomor dari blok saat ini                                                |
| `gas_limit`         | batas gas maksimum yang diizinkan di blok ini                           |
| `gas_used`          | jumlah gas aktual yang digunakan di blok ini                            |
| `timestamp`         | waktu blok                                                              |
| `extra_data`        | data tambahan arbitrer sebagai byte mentah                              |
| `base_fee_per_gas`  | nilai biaya dasar                                                       |
| `block_hash`        | Hash dari blok eksekusi                                                 |
| `transactions_root` | hash root dari transaksi dalam payload                                  |
| `withdrawal_root`   | hash root dari penarikan dalam payload                                  |

`execution_payload` itu sendiri berisi hal-hal berikut (perhatikan bahwa ini identik dengan header kecuali bahwa alih-alih hash root dari transaksi, ini mencakup daftar aktual transaksi dan informasi penarikan):

| Bidang             | Deskripsi                                                               |
| :----------------- | :---------------------------------------------------------------------- |
| `parent_hash`      | hash dari blok induk                                                    |
| `fee_recipient`    | alamat akun untuk membayar biaya transaksi                              |
| `state_root`       | hash root untuk status global setelah menerapkan perubahan di blok ini  |
| `receipts_root`    | hash dari trie tanda terima transaksi                                   |
| `logs_bloom`       | struktur data yang berisi log peristiwa                                 |
| `prev_randao`      | nilai yang digunakan dalam pemilihan validator acak                     |
| `block_number`     | nomor dari blok saat ini                                                |
| `gas_limit`        | batas gas maksimum yang diizinkan di blok ini                           |
| `gas_used`         | jumlah gas aktual yang digunakan di blok ini                            |
| `timestamp`        | waktu blok                                                              |
| `extra_data`       | data tambahan arbitrer sebagai byte mentah                              |
| `base_fee_per_gas` | nilai biaya dasar                                                       |
| `block_hash`       | Hash dari blok eksekusi                                                 |
| `transactions`     | daftar transaksi yang akan dieksekusi                                   |
| `withdrawals`      | daftar objek penarikan                                                  |

Daftar `withdrawals` berisi objek `withdrawal` yang terstruktur dengan cara berikut:

| Bidang           | Deskripsi                               |
| :--------------- | :-------------------------------------- |
| `address`        | alamat akun yang telah melakukan penarikan |
| `amount`         | jumlah penarikan                        |
| `index`          | nilai indeks penarikan                  |
| `validatorIndex` | nilai indeks validator                  |

## Waktu blok {#block-time}

Waktu blok mengacu pada waktu yang memisahkan blok. Di Ethereum, waktu dibagi menjadi unit dua belas detik yang disebut 'slot'. Di setiap slot, satu validator dipilih untuk mengusulkan blok. Dengan asumsi semua validator sedang online dan berfungsi penuh, akan ada sebuah blok di setiap slot, yang berarti waktu blok adalah 12 detik. Namun, terkadang validator mungkin sedang offline saat dipanggil untuk mengusulkan blok, yang berarti slot terkadang bisa kosong.

Implementasi ini berbeda dari sistem berbasis proof-of-work di mana waktu blok bersifat probabilistik dan disesuaikan oleh target kesulitan penambangan protokol. [Rata-rata waktu blok](https://etherscan.io/chart/blocktime) Ethereum adalah contoh sempurna dari hal ini di mana transisi dari proof-of-work ke proof-of-stake dapat disimpulkan dengan jelas berdasarkan konsistensi waktu blok 12 detik yang baru.

## Ukuran blok {#block-size}

Catatan penting terakhir adalah bahwa blok itu sendiri dibatasi ukurannya. Setiap blok memiliki ukuran target 30 juta gas tetapi ukuran blok akan bertambah atau berkurang sesuai dengan permintaan jaringan, hingga batas blok 60 juta gas (2x ukuran blok target). Batas gas blok dapat disesuaikan ke atas atau ke bawah dengan faktor 1/1024 dari batas gas blok sebelumnya. Akibatnya, validator dapat mengubah batas gas blok melalui konsensus. Jumlah total gas yang dihabiskan oleh semua transaksi di dalam blok harus kurang dari batas gas blok. Ini penting karena memastikan bahwa blok tidak bisa menjadi besar secara sewenang-wenang. Jika blok bisa menjadi besar secara sewenang-wenang, maka full node yang kurang berkinerja secara bertahap akan berhenti mampu mengimbangi jaringan karena persyaratan ruang dan kecepatan. Semakin besar blok, semakin besar daya komputasi yang diperlukan untuk memprosesnya tepat waktu untuk slot berikutnya. Ini adalah kekuatan pemusatan, yang ditolak dengan membatasi ukuran blok.

## Bacaan lebih lanjut {#further-reading}

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Topik terkait {#related-topics}

- [Transaksi](/developers/docs/transactions/)
- [Gas](/developers/docs/gas/)
- [Proof-of-stake](/developers/docs/consensus-mechanisms/pos)