---
title: "Rantai Blok — ETH.BUILD"
description: "Sebuah demonstrasi tentang bagaimana penambangan rantai blok bekerja, termasuk bagaimana blok-blok dirangkai bersama, bagaimana Bukti Kerja (PoW) mengamankan rantai blok, dan apa yang terjadi ketika seseorang mencoba merusak data."
lang: id
youtubeId: "zcX7OJ-L8XQ"
uploadDate: 2021-01-14
duration: "0:22:44"
educationLevel: beginner
topic:
  - "mining"
  - "blockchain"
format: tutorial
author: Austin Griffith
breadcrumb: "Rantai Blok (ETH.BUILD)"
---

Sebuah tutorial oleh **Austin Griffith** yang mendemonstrasikan bagaimana penambangan rantai blok bekerja menggunakan alat pemrograman visual ETH.BUILD. Austin membahas konsensus Bukti Kerja (PoW), perangkaian blok, kesulitan penambangan, imbalan blok, dan kekekalan rantai.

*Transkrip ini adalah salinan yang dapat diakses dari [transkrip video asli](https://www.youtube.com/watch?v=zcX7OJ-L8XQ) yang dipublikasikan oleh Austin Griffith. Transkrip ini telah sedikit diedit agar lebih mudah dibaca.*

#### Masalah koordinasi (0:00) {#the-problem-of-coordination-000}

Selamat pagi, selamat hari Jumat Dasi Kupu-kupu! ETH.BUILD kali ini berfokus pada rantai blok — hal yang sangat keren. Kita berada di perahu badut ini, dengan dasi kupu-kupu Bitcoin kita untuk itu. Mari kita mulai.

Jadi dalam kurikulum sejauh ini, kita telah membahas pasangan kunci, hash, dan buku besar. Apa yang kita temukan adalah bahwa jika kita ingin bertransaksi nilai bolak-balik di jaringan terdistribusi — bukan yang terpusat — kita akhirnya memiliki masalah koordinasi. Kita akhirnya memiliki masalah ini di mana kita tidak dapat menemukan konsensus antara pihak-pihak yang berbeda karena mereka semua menerima transaksi yang berbeda pada waktu yang berbeda. Ada banyak cara berbeda untuk menyelesaikan ini, tetapi tidak ada yang bagus sampai Bukti Kerja (PoW) muncul.

Kita telah membahas jenderal Bizantium sebagai misi sampingan, dan apa yang kita pelajari di sana adalah bahwa para jenderal perlu membuktikan bahwa mereka memiliki pasukan ketika mereka mengirim pesan melalui jaringan yang tidak aman. Kemudian pihak penerima dapat mengetahui bahwa orang tersebut memang seorang jenderal dengan pasukan yang akan menyerang, dan mereka dapat berkoordinasi.

#### Blok dan nonce (1:04) {#blocks-and-the-nonce-104}

Jadi dengan buku besar ini, kita memompa masuk transaksi dari jaringan. Daripada meminta setiap pengguna individu membuktikan pekerjaan mereka, kita akan mengabstraksi Bukti Kerja (PoW) ke dalam sebuah blok transaksi dan membiarkan penambang mengerjakannya.

Kita membawa sebuah blok yang menampung transaksi — apa pun yang datang melintasi jaringan, kita muat ke dalam blok ini. Jika kita melihat struktur blok ini, ia juga memiliki nonce. Nonce tersebut memungkinkan kita mengubah hash. Jika kita mengambil seluruh blok ini, mengubahnya menjadi string, dan menge-hash-nya, kita mendapatkan sebuah hash. Saat transaksi berubah, hash tersebut berubah, tetapi juga saat kita mengubah nonce, hash tersebut juga berubah.

Kita melakukan beberapa pekerjaan di sini — kita memiliki sekumpulan transaksi acak, dan kita mengubah nonce sampai hash memiliki angka nol di depan. Jika Anda menonton misi sampingan tentang jenderal Bizantium, kita memilih angka nol di depan ini sebagai jumlah pekerjaan arbitrer untuk dibuktikan. Jadi nonce hanya melewati setiap angka — satu, dua, tiga, empat — dan ketika kita mendapatkan angka nol di depan, kita berkata: itu adalah blok yang valid.

#### Bukti Kerja (PoW) beraksi (3:00) {#proof-of-work-in-action-300}

Jika kita mengambil blok yang ditambang, menarik keluar hash-nya, dan memasukkannya ke dalam fungsi hash, kita dapat membuktikan bahwa ia memiliki angka nol di depan — kita dapat membuktikan bahwa blok ini telah dikerjakan.

Fungsi hash memakan biaya CPU, yang merupakan sumber daya terbatas. Kita mengeluarkan semua kekuatan CPU kita mencoba menemukan hash dengan angka nol di depan. Setelah kita menemukannya, kita memiliki blok yang valid — blok tersebut pada dasarnya dibekukan. Transaksi apa pun yang ada di sana pada saat itu sekarang ada di blok ini, dan semua orang menghormatinya, dan kita dapat beralih ke blok berikutnya.

#### Merangkai blok bersama (3:56) {#chaining-blocks-together-356}

Inilah triknya: kita mengambil blok lama dan menyambungkannya ke blok baru. Jika kita melihat strukturnya, blok baru tidak memiliki transaksi dan nonce yang kosong, tetapi ia memiliki induk dengan transaksi. Blok sebelumnya akan menjadi bagian dari blok berikutnya, sehingga kita akan memiliki seluruh rantai.

Kita memasukkan transaksi terbaru dari pool transaksi dan bekerja untuk menemukan nonce. Blok nomor dua ditambang — kita membutuhkan nonce sepuluh untuk membuat transaksi ini valid. Kemudian kita melakukan hal yang sama: menyambungkan blok lama, membawa yang baru, memasukkan apa pun transaksi terbarunya, dan mengerjakannya lagi. Setelah cukup banyak percobaan, kita menemukan nonce untuk blok tiga. Blok empat — proses yang sama, dan kita terus maju.

#### Kesulitan penambangan (5:02) {#mining-difficulty-502}

Ini terlalu mudah — kita dapat menemukan blok yang valid dengan sangat cepat, dan kita ingin ini menjadi lebih sulit. Saya akan menaikkan kesulitan menjadi dua. Kita menyambungkan blok lima, membawa transaksi terbaru, dan membiarkan penghitung berjalan. Sekarang kita melakukan penambangan — menggunakan kekuatan CPU kita yang terbatas untuk secara arbitrer melemparkan hash acak pada ini sampai kita menemukan hash dengan dua angka nol di depan, karena kesulitan telah dinaikkan. Itu akan memakan waktu sedikit.

Sekarang kita memiliki rantai blok dari lima blok ini. Blok-blok tersebut menampung transaksi dan masing-masing merujuk pada yang sebelumnya. Setiap blok membutuhkan sejumlah pekerjaan arbitrer untuk diproduksi, dan jumlah pekerjaan dikendalikan oleh kesulitan.

#### Penambang (6:46) {#the-miner-646}

Mari kita lihat apa itu penambang. Dalam masalah jenderal Bizantium, jenderal yang ingin "menyerang saat fajar" membutuhkan tentara. Apa yang terjadi di dalam setiap tentara persis seperti apa yang kita lakukan di sini dengan penambang kita — kita mengambil pesan dan nonce dan melemparkannya ke dalam fungsi hash secepat yang kita bisa, mencoba mendapatkan angka nol di depan tersebut. Angka nol di depan adalah sesuatu yang arbitrer yang telah kita sepakati bersama — ini adalah pekerjaan yang cukup untuk membuktikan bahwa Anda adalah seorang tentara, atau bahwa Anda dapat berperang.

Biar saya bawa seorang penambang dan melakukan ini sedikit lebih cepat. Penambang akan melakukan hal yang sama untuk blok kita — ia mengambil transaksi yang masuk dari pool transaksi, memompanya ke dalam blok, dan terus mengerjakannya sampai ia menemukan hash yang valid.

Penambang sedikit lebih efisien. Dia lebih fokus pada penambangan. Dia secara acak melemparkan hash — itulah persisnya yang dilakukan penambang kita sebelumnya, hanya saja diabstraksikan. Kita dapat melihatnya berjalan di latar belakang, terus-menerus memproses hash. Ia menemukannya — blok enam ditambang.

#### Pengeluaran ganda dan propagasi jaringan (10:00) {#double-spends-and-network-propagation-1000}

Sekarang kita berbicara tentang masalah pengeluaran ganda ini, dan bahkan masalah propagasi jaringan ini. Ketika kita memiliki buku besar dan jaringan terdistribusi dan seseorang mengirim transaksi, itu sampai ke orang yang berbeda pada waktu yang berbeda. Oleh karena itu, kita bisa memiliki dua penambang di luar sana di jaringan yang keduanya menambang sebuah blok pada waktu yang persis sama, dan mereka memiliki transaksi yang berbeda di dalamnya.

Masing-masing valid pada saat itu — keduanya melakukan Bukti Kerja (PoW), keduanya memiliki angka nol di depan. Tetapi keduanya tidak bisa menjadi kanonikal. Keduanya tidak bisa menjadi kebenaran. Jadi kita membutuhkan cara agar jaringan mencapai konsensus tentang mana yang merupakan rantai yang sebenarnya.

#### Banyak penambang dan konsensus (12:27) {#multiple-miners-and-consensus-1227}

Biar saya ambil blok ini dan pindahkan ke sini. Apa yang saya inginkan adalah dua penambang berbeda yang mengerjakan masalah yang sama, semacam mendengarkan pool transaksi yang sama dan menghasilkan blok secara independen. Kita punya dua penambang: Mallory dan Mike. Saya telah mengubah kesulitan menjadi tiga, dan keduanya bekerja untuk menemukan hash dengan tiga angka nol di depan.

Jadi Mallory menemukan blok terlebih dahulu! Hebat. Sekarang apa yang terjadi — karena kita berada di jaringan terdistribusi, Mike mungkin belum tahu tentang blok Mallory. Dia mungkin masih mengerjakan versinya sendiri. Dan sekarang Mike juga menemukannya. Jadi kita memiliki dua jalur yang valid.

Jika Anda adalah satu peer di jaringan dan Anda melihat blok Mallory terlebih dahulu, Anda berpikir itu adalah blok utama. Kemudian blok Mike tiba. Anda menyimpan keduanya untuk berjaga-jaga jika salah satunya menjadi rantai terpanjang. Dan aturannya adalah: ikuti rantai valid terpanjang.

#### Coinbase dan imbalan blok (15:33) {#coinbase-and-block-rewards-1533}

Ketika seorang penambang menambang sebuah blok, kita berkata: ini semua transaksi yang kita inginkan, ini nonce-nya, ini induknya — tetapi kita juga akan mengatakan ini orang yang menambang blok tersebut. Ini disebut coinbase — saya pikir ada perusahaan yang bernama seperti itu sekarang, tetapi ini berbeda. Kita hanya akan menyebutnya "penambang". Jadi blok kita sekarang membutuhkan bidang penambang.

Jadi Mike baru saja menemukan blok, dan Mike juga akan mendapatkan nilai sepuluh dari ini. Kita perlu memberi insentif kepada para penambang untuk melakukan semua pekerjaan ini, bukan? Mereka menghabiskan uang untuk membeli rig ini pada dasarnya untuk membuat jaringan aman. Para penambang ini menghabiskan uang untuk mengamankan jaringan dengan semua kekuatan hash mereka — dengan semua penambang digabungkan, mungkin puluhan ribu. Mereka membayar mahal untuk membangun rig yang bekerja pada hash ini, dan untuk memberi insentif kepada mereka, kita memberi mereka bagian yang disebut imbalan blok dari setiap blok yang mereka tambang.

#### Imbalan blok dan insentif (16:52) {#block-rewards-and-incentives-1652}

Jadi dalam versi blok ini, Mallory memiliki sepuluh dolar, tetapi dalam versi ini Mike memiliki sepuluh dolar. Masing-masing dari kedua pemain ini diberi insentif untuk terus menyusuri rantai mereka sendiri, dan sisa jaringan perlu menemukan konsensus. Pada dasarnya ini bermuara pada siapa yang memiliki rantai valid terpanjang.

Mike akan mengatur bloknya sebagai induk dan mulai mengerjakan blok berikutnya. Mallory akan melakukan hal yang sama. Dan ini bermuara pada siapa lagi di jaringan yang memilih pihak siapa. Karena kita tidak ingin menghukum orang dengan jaringan yang buruk, saya cukup yakin bahwa di Ethereum kita membayar blok paman (uncle blocks) — blok valid yang tidak berhasil masuk ke rantai terpanjang — karena mereka masih membantu mengamankan jaringan.

Kita memiliki masalah koordinasi dan konsensus ini, dan kita menyelesaikannya dengan menempatkan jumlah pekerjaan arbitrer ini yang harus dilibatkan untuk membuat transaksi valid. Mallory melakukan semua pekerjaan ini dengan melakukan proses hash dan proses hash dan proses hash untuk menemukan tiga angka nol di depan dari hash semua transaksi ini dan blok sebelumnya.

#### Meminta data dari rantai blok (18:30) {#querying-the-blockchain-1830}

Kita dapat berbicara dengan apa pun rantai terpanjangnya. Mike belum mencapai tujuh, jadi kita dapat melihat tingginya masih enam di sini. Dan kita dapat melakukan hal-hal seperti meminta saldo untuk orang-orang. Jadi kita menekan saldo — apa yang kita dapatkan? Lima dua puluh empat. Jadi Heidi telah duduk di 524 atau apa pun token asli untuk rantai ini. Kita dapat melihat nonce-nya, kita dapat melakukan semua yang bisa kita lakukan dengan buku besar, tetapi sekarang kita menumpuk blok dan blok-blok tersebut menampung transaksi.

Kita telah mengabstraksikan pekerjaan dari pengguna, yang hanya mengirim uang, ke penambang, dan kita telah memberi insentif kepada mereka dengan memberi mereka imbalan blok ini. Juga akan ada sejumlah kecil yang dibayar setiap orang per transaksi, tetapi kita akan membahasnya di episode selanjutnya. Kita tidak ingin berbicara tentang gas sekarang, tetapi ada baiknya mengetahui bahwa ada insentif tidak hanya untuk menambang sebuah blok, tetapi untuk menambang blok penuh dengan banyak transaksi. Tetapi itu adalah insentif yang lebih kecil — kita akan membahasnya nanti.

#### Kekekalan rantai (19:51) {#chain-immutability-1951}

Saat blok ditambang, mereka menjadi semakin aman. Biar saya tunjukkan apa yang saya maksud. Jadi Mike menambang sebuah blok, Mallory ada di sini melakukan demonstrasi dan tidak dapat menambang sebuah blok. Jadi sekarang rantai Mike akan menjadi yang terpanjang, dan itu akan melintasi jaringan. Semua orang akan melihatnya dan berkata: oke, rantai ini memiliki tujuh blok, semuanya valid — ini yang akan kita ikuti. Anda bisa mendapatkan percabangan keras (hard fork), percabangan yang kontroversial, di mana aturan yang kita mainkan akan berubah dan kelompok manusia yang berbeda ingin mengikuti rantai yang berbeda. Hal yang keren.

Oke akhirnya, jika kita kembali ke blok tiga dan mengubah sesuatu — mengubah detail kecil apa pun — saya akan masuk ke sini. Ada beberapa transaksi ke Frank. Katakanlah alih-alih Frank kita mengubahnya menjadi Eve. Sekarang perhatikan apa yang terjadi ketika saya menekan oke: lihat itu. Saya mengubah bagian kecil dari blok tiga dan tiba-tiba seluruh rantai berantakan. Itu tidak lagi valid. Jika saya menyiarkannya melalui jaringan, orang-orang akan menertawakan saya.

Anda tidak dapat mengubah apa pun setelah sebuah blok ditambang kecuali Anda kembali dan menambang ulang hal-hal tersebut saat berubah. Saya pada dasarnya harus menyambungkan penambang kembali ke sini dan mencoba memiliki kekuatan yang cukup untuk mengejar Mike sampai ke sini dengan tujuh blok. Itu akan sangat, sangat sulit. Semakin dalam sebuah blok, semakin sulit untuk kembali darinya. Fakta bahwa blok tiga di sini di mana Carlos mengirim 84 ke Bob — Bob bisa cukup aman mengetahui bahwa, beberapa blok di dalamnya, uang itu pasti ada di sana. Tidak mungkin akan ada percabangan yang kontroversial di sini — saya aman. Itulah yang kita sebut finalitas.

#### Ringkasan (22:00) {#summary-2200}

Daripada memiliki buku besar dan masalah konsensus ini, kita menggunakan Bukti Kerja (PoW) untuk memproses hash guna memvalidasi sebuah blok — dan "valid" berarti jumlah arbitrer dari angka nol di depan. Kita masih akan menghadapi masalah saat kita membangun rantai blok, di mana blok yang ditambang sebenarnya dapat tiba di tempat yang berbeda pada waktu yang berbeda. Jadi kita memiliki algoritma konsensus lebih lanjut yang mengatakan: ikuti rantai terpanjang yang valid dan yang mengikuti serangkaian aturan yang ingin Anda ikuti.

Baiklah, selamat hari Jumat Dasi Kupu-kupu! Itu tadi adalah rantai blok di ETH.BUILD. Saya akan menyimpan ini dan menaruhnya di sana sehingga Anda bisa menekan "muat" dan memiliki rantai untuk dimainkan. Selamat hari Jumat!