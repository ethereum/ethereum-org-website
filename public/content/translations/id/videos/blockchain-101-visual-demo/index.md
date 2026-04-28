---
title: "Rantai Blok 101: sebuah demo visual"
description: "Demonstrasi tentang cara kerja teknologi rantai blok, mencakup proses hash, blok, rantai, buku besar terdistribusi, dan token untuk membuat konsep rantai blok menjadi nyata dan intuitif."
lang: id
youtubeId: "_160oMzblY8"
uploadDate: 2016-11-13
duration: "0:17:49"
educationLevel: beginner
topic:
  - "rantai blok"
  - "kriptografi"
format: presentation
author: Anders Brownworth
breadcrumb: "Rantai Blok 101"
---

Demonstrasi visual Anders Brownworth tentang cara kerja teknologi rantai blok, termasuk panduan yang mencakup proses hash SHA-256, blok, penambangan, rantai blok, buku besar terdistribusi, token, dan banyak lagi.

*Transkrip ini adalah salinan yang dapat diakses dari [transkrip video asli](https://www.youtube.com/watch?v=_160oMzblY8) yang dipublikasikan oleh Anders Brownworth. Transkrip ini telah sedikit diedit agar lebih mudah dibaca.*

#### Hash SHA-256 (0:01) {#sha-256-hash-001}

Ini adalah demo rantai blok. Kita akan melakukannya dengan cara yang sangat visual — kita akan membuatnya sangat mudah dipahami dengan menelusuri bagian-bagian utama dari apa itu rantai blok.

Sebelum kita mulai, kita perlu melihat sesuatu yang disebut hash SHA-256. Sebuah hash terlihat seperti sekumpulan angka acak, dan pada dasarnya itu adalah sidik jari dari suatu data digital. Kebetulan itu adalah sidik jari dari apa pun yang saya ketik di kotak ini. Jika saya mengetik nama saya "Anders" ke dalam kotak ini, Anda melihat bahwa hash-nya telah berubah. Faktanya, hash tersebut berubah setiap kali saya mengetik sebuah huruf.

Jadi ini adalah hash dari nama "Anders," semuanya huruf kecil — dimulai dengan `19ea`. Jika saya menghapusnya dan mengetik "Anders" lagi, Anda dapat melihat bahwa hash tersebut dimulai dengan `19ea` — hash yang sama persis. Dalam artian, ini adalah sidik jari digital dari data ini. Apa pun data yang ada di sini, setiap kali Anda mengetik data yang sama persis, Anda akan mendapatkan hash yang sama persis.

Saya bisa mengetik apa saja yang saya mau. Anda bisa tidak mengetik apa pun — `e3b0` — itu adalah hash dari ketiadaan. Atau Anda bisa mengetik banyak sekali hal. Faktanya, Anda bisa memasukkan seluruh isi Library of Congress ke sini dan Anda akan mendapatkan sebuah hash. Hal yang menarik adalah, terlepas dari apakah ada sedikit informasi, tidak ada informasi, atau seluruh Library of Congress, Anda akan selalu mendapatkan hash yang sepanjang ini. Anda tidak akan bisa menebak sebelumnya apa hasilnya — Anda harus memasukkan data untuk mengetahui apa hash-nya, tetapi Anda akan selalu mendapatkan hash yang sama persis terlepas dari berapa kali Anda memasukkan informasi yang sama persis.

#### Blok (2:10) {#block-210}

Apa yang akan saya lakukan adalah memperluas ide tentang hash ini menjadi sesuatu yang akan kita sebut sebagai blok. Sebuah blok sama persis dengan hash, tetapi bagian datanya telah dipecah menjadi tiga bagian: satu disebut "blok" — hanya sebuah angka, ini adalah blok nomor 1 — sebuah "nonce," yang juga hanya angka lain, dan kemudian beberapa data seperti yang kita miliki sebelumnya.

Hash dari semua informasi ini ada di bawah sini, dan dimulai dengan empat angka nol. Itu adalah hash yang relatif tidak biasa — sebagian besar tidak akan dimulai dengan empat angka nol seperti itu. Tetapi yang ini iya, dan karena itu, secara sewenang-wenang, saya akan mengatakan bahwa blok ini "ditandatangani."

Apa yang akan terjadi jika saya mengubah bagian mana pun dari informasi ini? Katakanlah saya mengetik sesuatu di sini — hash-nya akan berubah, dan seberapa besar kemungkinannya akan dimulai dengan empat angka nol? Cukup rendah. Saya hanya akan mengetik "hi" — lihat itu, hash ini tidak dimulai dengan empat angka nol, dan latar belakangnya telah berubah menjadi merah. Jadi sekarang Anda tahu bahwa blok dengan informasi di dalamnya ini bukanlah blok yang valid atau ditandatangani.

Di sinilah nonce berperan. Nonce hanyalah sebuah angka yang dapat Anda atur untuk mencoba menemukan nilai yang membuat hash dimulai dengan empat angka nol lagi. Saya bisa duduk di sini seharian mengetik angka, tetapi saya memiliki tombol "Mine" (Tambang) kecil ini. Apa yang akan terjadi ketika saya menekannya adalah tombol ini akan menelusuri semua angka dari 1 ke atas untuk mencoba menemukan angka di mana hash dimulai dengan empat angka nol. Proses ini disebut penambangan.

Prosesnya berhenti di 59.396 — dan angka itu kebetulan menghasilkan hash yang dimulai dengan empat angka nol. Ini memenuhi definisi saya tentang apa itu blok yang ditandatangani.

#### Rantai blok (5:16) {#blockchain-516}

Jadi, bisakah Anda memberi tahu saya apa itu rantai blok? Mungkin itu hanyalah sebuah rantai dari blok-blok ini. Ini adalah rantai blok saya — blok nomor satu memiliki nonce seperti sebelumnya, area data, tetapi kemudian memiliki bidang "previous" (sebelumnya) yang berisi sekumpulan angka nol. Bergerak maju, ini adalah blok dua, blok tiga, blok empat — rantai blok ini memiliki lima blok di dalamnya.

Bidang "previous" untuk setiap blok adalah hash dari blok sebelumnya. Anda dapat melihat bahwa setiap blok menunjuk ke belakang ke blok sebelumnya. Blok pertama itu tidak memiliki blok sebelumnya, jadi isinya hanya sekumpulan angka nol.

Apa yang terjadi jika saya mengubah beberapa informasi di sini? Itu akan mengubah hash dari blok ini dan membatalkannya. Tetapi bagaimana jika saya mengubah sesuatu di blok sebelumnya? Itu akan mengubah hash tersebut, tetapi hash itu disalin ke bidang "previous" blok berikutnya, sehingga merusak kedua blok tersebut. Kita bisa mundur sejauh yang kita inginkan ke suatu titik di masa lalu dan merusak blok itu, dan itu akan merusak semua blok sejak saat itu. Segala sesuatu sebelumnya masih berwarna hijau, tetapi segala sesuatu setelahnya berubah menjadi merah.

Jika saya pergi dan mengubah blok terakhir, yang harus saya lakukan hanyalah menambang ulang satu blok itu. Jika saya mundur jauh ke masa lalu dan membuat perubahan, saya harus menambang yang ini, yang ini, yang ini, dan yang ini. Semakin banyak blok yang berlalu, semakin sulit untuk membuat perubahan. Begitulah cara rantai blok tahan terhadap mutasi — tahan terhadap perubahan.

#### Rantai blok terdistribusi (9:18) {#distributed-blockchain-918}

Jadi bagaimana saya tahu jika rantai blok saya telah ditambang ulang? Sekarang kita memiliki rantai blok terdistribusi. Ini terlihat persis seperti rantai blok terakhir, tetapi ini adalah Peer A. Jika Anda turun ke sini, Anda dapat melihat Peer B, dan ia memiliki salinan persis dari rantai blok tersebut. Ada juga Peer C — ini bisa berlanjut selamanya. Ada banyak peer di internet, dan mereka semua memiliki salinan lengkap dari rantai blok.

Jika saya melihat hash ini, nilainya adalah `e4b`. Jika saya turun ke yang berikutnya, ia juga memiliki `e4b`. Mereka pasti identik. Sekarang jika saya pergi ke sini dan mengetik sesuatu, menambang ulang blok ini, dan kemudian menambang blok berikutnya — semua rantai berwarna hijau. Namun, rantai ini mengatakan hash terakhir adalah `e4b`, yang bawah juga mengatakan `e4b`, dan yang tengah ini mengatakan `4cae`.

Jadi saya tahu hanya dengan melihat sekilas pada satu hash kecil ini bahwa ada sesuatu yang salah dalam rantai blok ini. Meskipun semua hash dimulai dengan empat angka nol, yang satu ini berbeda. Pada dasarnya ini adalah dua lawan satu — kita adalah sebuah demokrasi kecil di sini. Jadi `e4b` menang. Begitulah cara memiliki salinan yang sepenuhnya terdistribusi di banyak komputer yang berbeda memungkinkan Anda untuk dengan cepat melihat apakah semua blok identik.

Rantai blok dapat memiliki 400.000 atau 500.000 blok dengan sangat mudah. Daripada memeriksa semuanya, yang benar-benar harus Anda lakukan hanyalah melihat hash dari yang paling baru, dan Anda dapat melihat apakah ada sesuatu di masa lalu yang diubah.

#### Token (12:17) {#tokens-1217}

Itulah keseluruhannya — tidak ada yang lebih dari itu. Tetapi ini agak kurang berguna karena kita tidak memiliki apa pun di area data yang berarti sesuatu. Apa yang benar-benar kita inginkan adalah sebuah token.

Sekarang saya memiliki token-token ini — secara sewenang-wenang, saya menyebutnya dolar. Kita memiliki dua puluh lima dolar dari Darcy ke Bingley, empat dolar dan dua puluh tujuh sen dari Elizabeth ke Jane — Anda mengerti maksudnya. Ada semua transaksi ini yang terjadi, dan saya baru saja mengganti data dengan transaksi-transaksi ini. Sama seperti sebelumnya, jika kita turun, kita perhatikan bahwa kita memiliki semua salinan lain dari rantai blok yang sama.

Di sinilah sifat tidak dapat diubah menjadi penting. Jika saya mengubah sesuatu di sini, hash-nya akan berbeda dari apa yang ada di salinan lainnya. Sangat penting bahwa jika Anda mundur ke masa lalu dan mengubah suatu nilai, kita akan menyadarinya. Sangat penting dengan uang agar Anda tidak kehilangan jejak, dan itulah inti dari penggunaan rantai blok — menolak segala jenis modifikasi terhadap hal-hal yang telah terjadi di masa lalu.

Satu hal yang ingin saya sebutkan: kita tidak mencantumkan "Darcy memiliki seratus dolar dan dia memberikan 25 kepada Bingley." Kita hanya mengingat pergerakan uang, bukan saldo akun bank. Ini menimbulkan pertanyaan — apakah Darcy memiliki $25?

#### Transaksi Coinbase (14:34) {#coinbase-transaction-1434}

Kita memiliki masalah dalam versi rantai blok ini: kita sebenarnya tidak tahu apakah Darcy memiliki $25. Jadi mari kita lihat transaksi Coinbase. Kita menambahkan transaksi Coinbase ke blok kita — ini mengatakan bahwa kita akan menciptakan seratus dolar dari ketiadaan dan memberikannya kepada Anders. Tidak ada transaksi lain di blok ini karena tidak ada yang memiliki uang sebelum ini.

Di blok berikutnya, seratus dolar lagi muncul entah dari mana dan diberikan kepada Anders. Sekarang kita memiliki beberapa transaksi — semuanya dari Anders karena saya satu-satunya yang memiliki uang pada saat ini. Saya mengirimkan sepuluh dolar saya kepada Sophie. Apakah saya memiliki sepuluh dolar? Ya — saya melihat ke belakang dan melihat bahwa transaksi Coinbase memberi saya seratus, jadi saya memiliki setidaknya sepuluh.

Anda menjumlahkan semua ini dan jumlahnya tidak melebihi seratus. Ini mengikuti aturan dasar mata uang: Anda tidak dapat menciptakan uang dari ketiadaan, dan penyebarannya dikendalikan.

Jika kita melompat maju ke masa depan, kita melihat bahwa Jackson memberikan dua dolar kepada Alexa. Apakah Jackson benar-benar memiliki dua dolar? Kita mundur satu blok dan melihat bahwa Emily telah mendapatkan sepuluh dolar dari Anders dan memberikan sepuluh kepada Jackson. Jadi Jackson memang memiliki uang tersebut. Kita bisa mundur dan mengetahuinya — itu adalah salah satu manfaat memiliki bidang "previous".

#### Penutup (16:30) {#closing-1630}

Itulah rantai blok dasar yang menjalankan mata uang di atasnya. Seperti yang Anda ketahui, rantai blok memiliki banyak salinan — semua orang memiliki salinan. Jika kita memutasi sesuatu dan menjadikannya enam dolar, blok-blok tersebut menjadi tidak valid dan tidak setuju dengan salinan lainnya. Ini tahan terhadap perusakan, yang mana itulah yang Anda inginkan untuk sebuah mata uang. Ini bekerja sangat baik untuk hal-hal yang kecil dan transaksional.

Rantai blok adalah cara yang sangat efisien untuk menangani kesepakatan tentang apa yang telah terjadi di masa lalu — riwayat yang tidak dapat diubah ini yang terus berlanjut seiring waktu. Kita hanya membahas sekilas beberapa poin utama, tetapi jika Anda menggali lebih dalam ke demo ini dan mengklik hal-hal ini serta memainkannya, Anda akan mendapatkan gambaran yang semakin baik tentang cara kerjanya.