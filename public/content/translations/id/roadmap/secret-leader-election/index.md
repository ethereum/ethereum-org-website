---
title: Pemilihan pemimpin rahasia
description: Penjelasan tentang bagaimana pemilihan pemimpin rahasia dapat membantu melindungi validator dari serangan
lang: id
summaryPoints:
  - Alamat IP pengusul blok dapat diketahui sebelumnya, membuat mereka rentan terhadap serangan
  - Pemilihan pemimpin rahasia menyembunyikan identitas validator sehingga mereka tidak dapat diketahui sebelumnya
  - Perluasan dari ide ini adalah membuat pemilihan validator menjadi acak di setiap slot.
---

# Pemilihan pemimpin rahasia {#single-secret-leader-election}

Dalam [mekanisme konsensus](/developers/docs/consensus-mechanisms/pos) berbasis [proof-of-stake](/developers/docs/consensus-mechanisms/pos) saat ini, daftar pengusul blok yang akan datang bersifat publik dan memungkinkan untuk memetakan alamat IP mereka. Ini berarti penyerang dapat mengidentifikasi validator mana yang dijadwalkan untuk mengusulkan blok dan menargetkan mereka dengan serangan denial-of-service (DOS) yang membuat mereka tidak dapat mengusulkan blok mereka tepat waktu.

Hal ini dapat menciptakan peluang bagi penyerang untuk mengambil keuntungan. Sebagai contoh, pengusul blok yang dipilih untuk slot `n+1` dapat melakukan DOS terhadap pengusul di slot `n` sehingga mereka kehilangan kesempatan untuk mengusulkan blok. Ini akan memungkinkan pengusul blok yang menyerang untuk mengekstraksi nilai ekstraksi maksimum (MEV) dari kedua slot, atau mengambil semua transaksi yang seharusnya dibagi ke dalam dua blok dan malah memasukkan semuanya ke dalam satu blok, mendapatkan semua biaya yang terkait. Hal ini kemungkinan akan lebih memengaruhi validator rumahan daripada validator institusional canggih yang dapat menggunakan metode yang lebih maju untuk melindungi diri mereka dari serangan DOS, dan oleh karena itu dapat menjadi kekuatan sentralisasi.

Ada beberapa solusi untuk masalah ini. Salah satunya adalah [Distributed Validator Technology](https://github.com/ethereum/distributed-validator-specs) yang bertujuan untuk menyebarkan berbagai tugas yang terkait dengan menjalankan validator di beberapa mesin, dengan redundansi, sehingga jauh lebih sulit bagi penyerang untuk mencegah sebuah blok diusulkan pada slot tertentu. Namun, solusi yang paling kuat adalah **Pemilihan Pemimpin Rahasia Tunggal (Single Secret Leader Election/SSLE)**.

## Pemilihan pemimpin rahasia tunggal {#secret-leader-election}

Dalam SSLE, kriptografi yang cerdas digunakan untuk memastikan bahwa hanya validator yang dipilih yang tahu bahwa mereka telah dipilih. Ini bekerja dengan meminta setiap validator mengirimkan komitmen pada rahasia yang mereka semua bagikan. Komitmen tersebut diacak dan dikonfigurasi ulang sehingga tidak ada yang dapat memetakan komitmen ke validator, tetapi setiap validator tahu komitmen mana yang menjadi milik mereka. Kemudian, satu komitmen dipilih secara acak. Jika validator mendeteksi bahwa komitmen mereka dipilih, mereka tahu bahwa ini adalah giliran mereka untuk mengusulkan blok.

Implementasi terkemuka dari ide ini disebut [Whisk](https://ethresear.ch/t/whisk-a-practical-shuffle-based-ssle-protocol-for-ethereum/11763). Yang bekerja sebagai berikut:

1. Validator berkomitmen pada rahasia bersama. Skema komitmen dirancang sedemikian rupa sehingga dapat diikat ke identitas validator tetapi juga diacak sehingga tidak ada pihak ketiga yang dapat merekayasa balik ikatan tersebut dan menautkan komitmen tertentu ke validator tertentu.
2. Pada awal epoch, sekumpulan validator acak dipilih untuk mengambil sampel komitmen dari 16.384 validator, menggunakan RANDAO.
3. Untuk 8182 slot berikutnya (1 hari), pengusul blok mengacak dan merandomisasi sebagian dari komitmen menggunakan entropi pribadi mereka sendiri.
4. Setelah pengacakan selesai, RANDAO digunakan untuk membuat daftar komitmen yang terurut. Daftar ini dipetakan ke slot Ethereum.
5. Validator melihat bahwa komitmen mereka dilampirkan ke slot tertentu, dan ketika slot itu tiba, mereka mengusulkan blok.
6. Ulangi langkah-langkah ini sehingga penugasan komitmen ke slot selalu jauh di depan slot saat ini.

Ini mencegah penyerang mengetahui sebelumnya validator spesifik mana yang akan mengusulkan blok berikutnya, mencegah kemampuan untuk serangan DOS.

## Pemilihan pemimpin rahasia non-tunggal (SnSLE) {#secret-non-single-leader-election}

Ada juga proposal terpisah yang bertujuan untuk menciptakan skenario di mana setiap validator memiliki peluang acak untuk mengusulkan blok di setiap slot, mirip dengan bagaimana usulan blok diputuskan di bawah proof-of-work, yang dikenal sebagai **pemilihan pemimpin rahasia non-tunggal (SnSLE)**. Salah satu cara sederhana untuk melakukan ini adalah dengan memanfaatkan fungsi RANDAO yang digunakan untuk memilih validator secara acak dalam protokol saat ini. Ide dengan RANDAO adalah bahwa angka yang cukup acak dihasilkan dengan mencampurkan hash yang dikirimkan oleh banyak validator independen. Dalam SnSLE, hash ini dapat digunakan untuk memilih pengusul blok berikutnya, misalnya dengan memilih hash bernilai terendah. Rentang hash yang valid dapat dibatasi untuk menyesuaikan kemungkinan validator individu dipilih di setiap slot. Dengan menegaskan bahwa hash harus kurang dari `2^256 * 5 / N` di mana `N` = jumlah validator aktif, peluang validator individu mana pun untuk dipilih di setiap slot adalah `5/N`. Dalam contoh ini, akan ada peluang 99,3% dari setidaknya satu pengusul yang menghasilkan hash yang valid di setiap slot.

## Kemajuan saat ini {#current-progress}

SSLE dan SnSLE keduanya berada dalam fase penelitian. Belum ada spesifikasi akhir untuk kedua ide tersebut. SSLE dan SnSLE adalah proposal yang bersaing yang tidak dapat diimplementasikan keduanya. Sebelum diluncurkan, mereka membutuhkan lebih banyak penelitian dan pengembangan, pembuatan prototipe, dan implementasi di testnet publik.

## Bacaan lebih lanjut {#further-reading}

- [SnSLE](https://ethresear.ch/t/secret-non-single-leader-election/11789)