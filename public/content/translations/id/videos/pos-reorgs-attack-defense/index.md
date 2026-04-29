---
title: "Permainan reorg dalam Bukti Kepemilikan (PoS) Ethereum"
description: "Caspar Schwarz-Schilling menyajikan penelitian tentang serangan reorganisasi blok dalam Bukti Kepemilikan (PoS) Ethereum, mencakup vektor serangan, mekanisme pertahanan, dan mitigasi tingkat protokol yang ada."
lang: id
youtubeId: "xcPxwhrg3Ao"
uploadDate: 2022-11-29
duration: "0:18:41"
educationLevel: advanced
topic:
  - "konsensus"
  - "pos"
  - "keamanan"
format: presentation
author: LisCon
breadcrumb: "Reorg PoS"
---

Presentasi ini mengeksplorasi jenis-jenis reorganisasi blok yang mungkin terjadi dalam Bukti Kepemilikan (PoS) Ethereum dan mitigasi yang dirancang untuk mencegahnya. Caspar Schwarz-Schilling, seorang peneliti di Robust Incentives Group dari Yayasan Ethereum, menjelaskan mekanisme reorg ex-post dan ex-ante, membandingkan lanskap keamanan antara Bukti Kerja (PoW) dan Bukti Kepemilikan (PoS).

*Transkrip ini adalah salinan yang dapat diakses dari [transkrip video asli](https://www.youtube.com/watch?v=xcPxwhrg3Ao) yang diterbitkan oleh LisCon. Transkrip ini telah diedit sedikit agar lebih mudah dibaca.*

#### Pengantar dan latar belakang (0:03) {#introduction-and-background-003}

Selamat datang. Hari ini saya akan berbicara tentang reorg yang mungkin terjadi dalam Bukti Kepemilikan (PoS) Ethereum.

Saya baru-baru ini bergabung dengan Yayasan Ethereum, khususnya Robust Incentives Group. Pada dasarnya kami adalah tim peneliti yang berfokus pada segala hal tentang insentif. Saya akan mempersingkat ini — pembicaraan ini sangat padat dan Anda dapat menemukan sebagian besar pekerjaan kami di GitHub.

#### Dua jenis reorg (0:44) {#two-types-of-reorgs-044}

Hari ini saya ingin berbicara tentang reorg, dan secara khusus saya ingin menguraikan dua jenis reorg berbeda yang mungkin terjadi di ranah Bukti Kepemilikan (PoS) Ethereum.

Di satu sisi kita memiliki **reorg ex-post** dan di sisi lain **reorg ex-ante**. Maafkan saya atas penamaan Latin yang sedikit sok ini, tetapi ini cukup menjelaskan maksudnya.

Reorg ex-post adalah apa yang biasanya kita pikirkan ketika berbicara tentang reorg. Musuh melihat sebuah blok — jika itu berharga, mereka mungkin ingin mencoba dan melakukan reorg terhadapnya. Jadi pada diagram di sini kita melihat bahwa blok N+1 adalah blok yang ingin di-reorg oleh penyerang, dan dengan membangun pada blok induk yang sama yaitu N, jika berhasil, blok N+3 kemudian dibangun di atas blok N+2. Itu adalah hal yang biasa.

Sekarang reorg ex-ante sedikit berbeda. Gagasannya adalah penyerang perlu memulai serangan bahkan sebelum mengetahui blok mana yang akan mereka reorg. Bagaimana kira-kira cara kerjanya? Pada tingkat yang sangat tinggi, blok N+1 dibangun di atas N tetapi tidak segera dirilis. Node yang jujur bahkan tidak tahu bahwa N+1 ada sehingga mereka akan terus membangun di atas N. Kemudian melalui suatu mekanisme N+1 dirilis dan N+3 mungkin melihat N+1 memimpin dan membangun di atasnya, sehingga N+2 sebenarnya di-reorg.

Anda mungkin bertanya-tanya mengapa Anda ingin melakukan reorg semacam ini. Nah, masih ada MEV yang bisa ditangkap. Jika Anda beruntung, blok N+2 memiliki banyak MEV — Anda dapat menangkapnya hanya dengan menyalin-tempel apa pun isi blok tersebut. Skenario terburuknya, Anda pada dasarnya memiliki transaksi senilai dua slot untuk didengarkan.

#### Reorg ex-post dalam Bukti Kerja (PoW) (2:49) {#ex-post-reorgs-in-proof-of-work-249}

Sebelum menyelami reorg ex-ante, yang merupakan topik utama pembicaraan ini, izinkan saya merangkum secara singkat reorg ex-post dan khususnya dimulai dengan konteks Bukti Kerja (PoW).

Pada dasarnya ini adalah rekap dari postingan blog oleh orang-orang yang biasa — Georgios dan Vitalik. Silakan baca saja, itu sangat bagus.

Singkatnya, dalam Bukti Kerja (PoW) Ethereum, reorg ex-post itu sulit tetapi bukan tidak mungkin. Seorang penambang dengan 10% kekuatan memiliki peluang yang relatif baik untuk melakukan penambangan beberapa blok berturut-turut, dan jika insentifnya cukup tinggi — bayangkan ada satu blok dengan MEV senilai 100 ETH untuk ditangkap — maka mungkin tingkat keberhasilan satu persen sebenarnya sudah cukup untuk membuatnya sepadan mencoba melakukan reorganisasi.

#### Reorg ex-post dalam Bukti Kepemilikan (PoS) (3:39) {#ex-post-reorgs-in-proof-of-stake-339}

Dalam Bukti Kepemilikan (PoS), ini adalah permainan yang sama sekali berbeda. Kita berbicara tentang jumlah stake yang tidak masuk akal yang diperlukan. Saya akan memandu Anda tentang bagaimana seseorang mungkin melakukannya hanya untuk menekankan betapa sulitnya hal itu.

Mungkin beberapa dasar terlebih dahulu. Waktu dalam Bukti Kepemilikan (PoS) Ethereum berjalan dalam slot. Setiap slot berdurasi 12 detik. Di setiap slot ada dua peran: Anda memiliki seorang pengusul — tepat satu pengusul — dan sebuah komite yang terdiri dari ribuan pemberi atestasi yang seharusnya memberikan atestasi pada blok yang mereka dengar di lapisan P2P. Mereka menentukan kepala rantai dengan menjalankan pilihan percabangan, yang pada dasarnya adalah fungsi yang mengambil pohon blok sebagai input dan memberi Anda kepala rantai.

Anda seharusnya memberikan atestasi pada blok jika Anda mendengar blok yang valid, atau empat detik ke dalam sebuah slot — mana saja yang lebih dulu. Jadi jika karena alasan tertentu pengusul blok N+1 sedang offline dan tidak ada blok empat detik ke dalam slot, Anda memberikan atestasi pada blok N. Jika Anda mendengarnya tepat waktu, Anda memberikan atestasi pada blok N+1. Sederhana.

Semua atestasi ini memberikan bobot pada blok, dan bobot ini digunakan oleh pilihan percabangan untuk menentukan apa kepala terbaru.

Sekarang mari kita telusuri reorg satu blok. Pada awalnya, semuanya berjalan seperti biasa — semua orang memberikan atestasi pada blok N, bahkan penyerang. Kemudian N+1 dibangun di atas N, dan karena penyerang tidak ingin memberikan bobot pada blok yang mereka coba reorg, mereka malah memberikan atestasi pada blok N. Blok N mendapatkan banyak bobot karena penyerang memiliki dua pertiga dari komite — yang berarti mereka perlu mengendalikan secara kasar dua pertiga dari seluruh stake.

Sepertiga dari orang-orang jujur memberikan atestasi pada N+1, dua pertiga pada N. Sekarang muncul blok N+2 — jelas penyerang membangunnya di atas N, dan memberikan atestasi pada blok mereka sendiri. Dari pandangan validator yang jujur, N+1 masih memimpin dalam hal bobot karena baik N+1 maupun N+2 mewarisi seluruh bobot blok N, tetapi N+1 juga memiliki sepertiga atestasi ini yang tidak dimiliki N+2.

Jika kita menjumlahkannya — blok N+1 memiliki atestasi senilai sepertiga ditambah sepertiga, memberikan dua pertiga, dan blok N+2 juga memiliki dua pertiga. Untuk mempermudah, mari kita asumsikan pemecah seri menguntungkan penyerang. Kemudian N+3 akan melihat N+2 sebagai pemimpin dan membangun di atasnya.

Untuk memberi Anda gambaran betapa konyolnya asumsi ini — bahkan jika Anda memiliki staker 65%, untuk mengendalikan dua pertiga komite di slot mana pun Anda memiliki probabilitas 0,05%. Ini menunjukkan bahwa kekuatan atestasi paralel itu nyata — reorg ex-post sangat sulit, jika bukan hampir tidak mungkin, dalam Bukti Kepemilikan (PoS) Ethereum.

#### Mekanika serangan reorg ex-ante (7:34) {#ex-ante-reorg-attack-mechanics-734}

Sekarang saya akan berbicara tentang reorg ex-ante. Serangan ini didasarkan pada makalah oleh Neuder dan kawan-kawan. Kami baru-baru ini meningkatkan serangan ini secara signifikan. Kami juga menulis makalah tentang hal itu dan berhasil mengunggahnya di arXiv tepat pada waktunya.

Juga di awal — jangan khawatir, ada mitigasi. Mereka akan digabungkan sebelum The Merge.

Bagaimana cara kerja serangan reorg ex-ante? Awalnya, blok N — seperti biasa, semua orang memberikan atestasi padanya. Sekarang Anda adalah pengusul N+1. Anda mengusulkannya dan memberikan atestasi secara pribadi dengan satu validator. Yang penting, Anda merahasiakannya — Anda tidak merilisnya dan Anda tidak menyebarkannya di lapisan P2P.

Apa yang terjadi adalah orang-orang jujur tidak melihat blok N+1, sehingga mereka akan memberikan atestasi pada blok N. Itulah triknya — Anda mewarisi bobot itu dan Anda tidak perlu benar-benar melawannya.

Mari kita asumsikan latensi nol untuk saat ini. Di slot N+2, apa yang kita lakukan sebagai penyerang adalah merilis blok N+1 dan atestasi pribadi secara bersamaan. Validator yang jujur di slot N+2 perlu memberikan atestasi pada sebuah blok. Dari pandangan mereka, mereka melihat blok N+2 dan blok N+1 dengan satu atestasi pribadi ini. Jika mereka menjalankan pilihan percabangan, mereka akan menemukan bahwa blok N+1 memiliki bobot lebih dari blok N+2, karena N+1 memiliki atestasi pribadi yang tidak dimiliki N+2. Bahkan semua validator yang jujur sebenarnya akan memberikan atestasi pada blok N+1. Di N+3, secara sepele, N+1 akan dipandang sebagai kepala rantai.

#### Latensi jaringan dan serangan (10:25) {#network-latency-and-the-attack-1025}

Saya mengasumsikan latensi nol, yang jelas bukan cara kerjanya. Ada latensi — butuh waktu untuk menyebarkan blok dan pesan di lapisan P2P.

Cara penyerang masih dapat melakukan serangan semacam ini adalah dengan memiliki banyak node di lokasi berbeda pada topologi P2P. Ketika pengusul yang jujur di slot N+2 mengusulkan blok tersebut, Anda mendengarnya sangat awal dalam proses propagasi. Akibatnya, Anda dapat merilis blok pribadi Anda dari semua lokasi berbeda ini sehingga mayoritas akan mendengar tentang blok N+1 sebelum mereka mendengar tentang blok N+2 — yang berarti mereka melihat bahwa blok N+1 memimpin dalam bobot dan sebenarnya akan memberikan atestasi padanya.

Untuk menekankan kembali apa yang terjadi di sini: kita memiliki seorang pengusul dengan pemberi atestasi tunggal yang berhasil melakukan reorg satu blok. Paling tidak, ini tidak ideal.

#### Strategi penyeimbangan untuk reorg yang lebih panjang (11:42) {#balancing-strategies-for-longer-reorgs-1142}

Jika Anda ingin lebih canggih, Anda dapat melakukan reorg yang lebih panjang menggunakan strategi penyeimbangan. Gagasannya adalah membagi komite yang jujur ke dalam pandangan rantai yang berbeda.

Anda merilis blok pribadi Anda sedemikian rupa sehingga kira-kira setengah dari node yang jujur mendengar tentang blok dan atestasi pribadi Anda sebelum mereka mendengar tentang blok N+2 — sehingga mereka memberikan atestasi pada blok Anda. Setengah lainnya Anda ingin mereka tidak mendengar blok Anda sebelum mereka memberikan atestasi pada N+2.

Sekarang Anda memiliki setengah dari komite yang jujur memberikan atestasi pada N+1 dan setengah lainnya memberikan atestasi pada N+2. Bagaimana itu membantu? Komite yang jujur sekarang saling meniadakan, dan Anda sebagai penyerang bahkan tidak perlu melawan mereka — yang pada dasarnya adalah mimpi penyerang yang menjadi kenyataan.

Menelusuri diagram: blok N seperti biasa, blok N+1 — cerita yang sama, Anda tidak merilisnya. Validator yang jujur memberikan atestasi pada blok N. Blok N+2 muncul, Anda mendengarnya lebih awal, dan Anda merilis blok N+1 dengan satu atestasi — "suara penentu" — sedemikian rupa sehingga setengah komite yang jujur melihatnya sebelum dan setengahnya sesudah. Setengah memilih N+1, setengah lainnya untuk N+2. Anda sebenarnya menginginkan pemisahan selisih satu sehingga N+2 memiliki satu atestasi lebih banyak, jadi N+3 dibangun di atas N+2 dan menjaga reorg terus berjalan.

Untuk mengakhiri reorg dua blok: blok N+3 diusulkan, Anda mendengarnya lebih awal, Anda merilis blok N+1 dan dua atestasi Anda yang tersisa, membanjiri lapisan P2P sehingga mayoritas orang jujur memilih blok N+1 — sehingga memiliki bobot lebih dari blok N+3 dan N+4 dibangun di atas N+1.

Jika Anda memikirkannya, relatif murah untuk melakukan reorg ini di bawah asumsi ini. Bahkan jika Anda tidak memiliki pemisahan yang sempurna, karena lapisan P2P sangat besar, Anda memiliki distribusi probabilitas yang dapat Anda targetkan sehingga biaya serangan tumbuh dalam akar kuadrat dari ukuran komite.

#### Mitigasi dorongan pengusul (15:17) {#proposer-boost-mitigation-1517}

Mari kita bicara tentang mitigasi. Apa gagasan dasarnya? Kita akan memberi pengusul sedikit lebih banyak kekuatan. Jika blok yang valid tiba tepat waktu, mari kita tingkatkan bobot blok ini selama durasi slot. Setelah slot itu selesai, kita melanjutkan skor LMD-GHOST yang biasa dan semuanya berjalan seperti biasa.

Jadi jika blok N+2 diusulkan tepat waktu dan valid, blok ini akan mendapat dorongan — katakanlah 80% dari ukuran komite. Sekarang atestasi N+1 kecil yang lucu dari penyerang ini tidak akan berhasil. Tidak mungkin.

Hal penyeimbangan juga tidak berfungsi lagi karena Anda memiliki pemisahan 50/50 tetapi dorongan selalu melemparkannya ke satu arah. Tidak mungkin Anda dapat mempertahankan pemisahan 50/50 itu.

Gagasannya adalah bahwa dengan adanya mitigasi ini, atestasi musuh harus bersaing dengan dorongan untuk meyakinkan validator yang jujur agar memilih sesuai dengan keinginan mereka. Ini merusak strategi penyeimbangan dan pada dasarnya melarang semua reorg sama sekali. Berita baik — ada PR yang terbuka, jadi pada dasarnya itu akan digabungkan sebelum The Merge.

#### Poin-poin penting (16:48) {#key-takeaways-1648}

Beberapa poin penting. Saya telah berbicara tentang perbedaan antara reorg ex-post dan ex-ante. Saya secara singkat menguraikan lanskap yang berbeda untuk reorg dalam Bukti Kerja (PoW) versus Bukti Kepemilikan (PoS). Saya menunjukkan kepada Anda cara melakukan reorg ex-ante tetapi juga yang penting cara memperbaikinya.

Jika Anda tertarik dengan ini, ada sebuah makalah — jauh lebih rinci, lebih bernuansa. Slide akan diunggah. Datang dan bicaralah dengan saya jika Anda tertarik, dan Anda juga dapat menemukan saya di Twitter.

Saya harap ini menarik bagi Anda. Terima kasih banyak.