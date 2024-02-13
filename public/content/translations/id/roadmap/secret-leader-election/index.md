---
title: Pilihan pemimimpin rahasia
description: Penjelasan tentang bagaimana pemilihan pemimpin rahasia dapat membantu melindungi validator dari serangan
lang: id
summaryPoints:
  - Alamat IP pengusul blok dapat diketahui sebelumnya, membuat mereka rentan terhadap serangan
  - Pemilihan pemimpin rahasia menyembunyikan identitas validator sehingga tidak dapat diketahui sebelumnya
  - Perpanjangan dari ide ini adalah membuat pemilihan validator secara acak di setiap ruang.
---

# Pilihan pemimimpin rahasia {#single-secret-leader-election}

Dalam mekanisme konsensus berbasis [bukti taruhan](/developers/docs/consensus-mechanisms/pos) yang ada saat ini, daftar pengusul blok yang akan datang bersifat publik dan memungkinkan untuk memetakan alamat IP mereka. Ini berarti penyerang dapat mengidentifikasi validator mana yang akan mengajukan blok dan menargetkan mereka dengan serangan denial-of-service (DOS) yang membuat mereka tidak dapat mengajukan blok tepat waktu.

Hal ini dapat menciptakan peluang bagi penyerang untuk mendapatkan keuntungan. Sebagai contoh, seorang pengusul blok yang dipilih untuk ruang `n+1` dapat melakukan serangan DOS terhadap pengusul blok di ruang `n` sehingga mereka melewatkan kesempatan untuk mengusulkan blok. Hal ini akan memungkinkan pengusul blok yang menyerang untuk mengekstrak MEV dari kedua ruang, atau mengambil semua transaksi yang seharusnya dibagi menjadi dua blok dan memasukkannya ke dalam satu blok, dan mendapatkan semua biaya terkait. Hal ini cenderung mempengaruhi validator rumahan lebih banyak daripada validator institusional yang canggih yang dapat menggunakan metode yang lebih canggih untuk melindungi diri mereka sendiri dari serangan DOS, dan oleh karena itu dapat menjadi kekuatan pemusatan.

Ada beberapa solusi untuk masalah ini. Salah satunya adalah [Teknologi Validator Terdistribusi](https://github.com/ethereum/distributed-validator-specs) yang bertujuan untuk menyebarkan berbagai tugas yang berkaitan dengan menjalankan validator di beberapa mesin, dengan redundansi, sehingga akan lebih sulit bagi penyerang untuk mencegah sebuah blok diusulkan di ruang tertentu. Namun, solusi yang paling kuat adalah **Pemilihan Pemimpin Rahasia Tunggal (SSLE)**.

## Pemilihan pemimpin tunggal secara rahasia {#secret-leader-election}

Dalam SSLE, kriptografi yang cerdas digunakan untuk memastikan bahwa hanya validator yang terpilih yang tahu bahwa mereka telah terpilih. Cara kerjanya adalah dengan meminta setiap validator untuk menyerahkan komitmen terhadap sebuah rahasia yang mereka miliki. Komitmen tersebut diacak dan dikonfigurasi ulang sehingga tidak ada seorang pun yang dapat memetakan komitmen ke validator, tetapi setiap validator mengetahui komitmen mana yang menjadi miliknya. Kemudian, satu komitmen dipilih secara acak. Jika seorang validator mendeteksi bahwa komitmen mereka terpilih, mereka tahu bahwa ini adalah giliran mereka untuk mengajukan blok.

Implementasi utama dari ide ini disebut [Whisk](https://ethresear.ch/t/whisk-a-practical-shuffle-based-ssle-protocol-for-ethereum/11763). Yang berfungsi sebagai berikut:

1. Validator berkomitmen untuk menjaga rahasia bersama. Skema komitmen dirancang sedemikian rupa sehingga dapat diikat ke identitas validator tetapi juga diacak sehingga tidak ada pihak ketiga yang dapat merekayasa pengikatan dan menautkan komitmen tertentu ke validator tertentu.
2. Pada awal sebuah jangka waktu, sekumpulan validator dipilih secara acak untuk mengambil sampel komitmen dari 16.384 validator, dengan menggunakan RANDAO.
3. Untuk 8182 ruang berikutnya (1 hari), pengusul blok mengocok dan mengacak sebagian dari komitmen menggunakan entropi pribadi mereka.
4. Setelah pengacakan selesai, RANDAO digunakan untuk membuat daftar komitmen yang terurut. Daftar ini dipetakan ke dalam ruang Ethereum.
5. Validator melihat bahwa komitmen mereka melekat pada ruang tertentu, dan ketika ruang tersebut tiba, mereka mengajukan blok.
6. Ulangi langkah-langkah ini sehingga penugasan komitmen ke ruang selalu jauh di depan ruang saat ini.

Hal ini mencegah penyerang untuk mengetahui sebelumnya validator spesifik mana yang akan mengajukan blok berikutnya, mencegah kemampuan serangan DOS.

## Pemilihan pemimpin non-tunggal secara rahasia (SnSLE) {#secret-non-single-leader-election}

Ada juga proposal terpisah yang bertujuan untuk membuat skenario di mana validator masing-masing memiliki kesempatan acak untuk mengusulkan blok di setiap ruang, mirip dengan bagaimana proposal blok diputuskan di bawah bukti kerjak, yang dikenal sebagai **pemilihan pemimpin non-tunggal secara rahasia (SnSLE)**. Satu cara sederhana untuk melakukan ini adalah memanfaatkan fungsi RANDAO yang digunakan untuk memilih validator secara acak dalam protokol saat ini. Ide dari RANDAO adalah bahwa angka yang cukup acak dihasilkan dengan mencampurkan hash yang dikirimkan oleh banyak validator independen. Dalam SnSLE, hash ini dapat digunakan untuk memilih pengusul blok berikutnya, misalnya dengan memilih hash dengan nilai terendah. Kisaran hash yang valid dapat dibatasi untuk menyesuaikan kemungkinan validator individu yang dipilih di setiap ruang. Dengan mengklaim bahwa hash harus lebih kecil dari `2^256 * 5 / N` di mana `N` = jumlah validator aktif, peluang setiap validator individu terpilih di setiap ruang akan menjadi `5/N`. Dalam contoh ini, akan ada peluang 99,3% untuk setidaknya satu pengusul menghasilkan hash yang valid di setiap ruang.

## Kemajuan saat ini {#current-progress}

SSLE dan SnSLE keduanya sedang dalam tahap penelitian. Belum ada spesifikasi final untuk kedua ide tersebut. SSLE dan SnSLE merupakan proposal yang bersaing yang keduanya tidak dapat diimplementasikan bersama. Sebelum dikirim, mereka membutuhkan lebih banyak penelitian dan pengembangan, pembuatan prototipe, dan implementasi di jaringan percobaan publik.

## Bacaan lebih lanjut {#further-reading}

- [SnSLE](https://ethresear.ch/t/secret-non-single-leader-election/11789)
