---
title: "Peretasan DAO: kisah Ethereum Classic"
description: "Kisah peretasan DAO pada tahun 2016, dan bagaimana respons komunitas mengarah pada penciptaan Ethereum Classic sebagai rantai terpisah."
lang: id
youtubeId: "rNeLuBOVe8A"
uploadDate: 2021-12-15
duration: "0:09:48"
educationLevel: beginner
topic:
  - "governance"
  - "history"
  - "dao"
format: explainer
author: Junion
breadcrumb: "Peretasan DAO"
---

Sebuah penjelasan oleh **Junion** yang menceritakan kisah peretasan DAO pada tahun 2016, salah satu pencurian digital terbesar dalam sejarah kripto, dan bagaimana keputusan kontroversial komunitas Ethereum untuk melakukan percabangan pada rantai blok mengarah pada penciptaan Ethereum Classic.

*Transkrip ini adalah salinan yang dapat diakses dari [transkrip video asli](https://www.youtube.com/watch?v=rNeLuBOVe8A) yang dipublikasikan oleh Junion. Transkrip ini telah sedikit diedit agar lebih mudah dibaca.*

#### Penemuan (0:00) {#the-discovery-000}

Hari itu Senin, 13 Juni 2016. Seorang profesor ilmu komputer di Cornell sedang memeriksa kode untuk DAO, salah satu proyek paling ambisius di ruang kripto. Selama berbulan-bulan ia telah mengadvokasi agar proyek tersebut ditunda, karena ia percaya ada kelemahan tertentu yang dapat membahayakan keseluruhan proyek. Namun hari ini ia menemukan kerentanan serius: sebuah bug di baris 666.

Ia khawatir bug ini berpotensi memungkinkan peretas untuk melakukan penarikan tanpa batas layaknya di ATM. Bahkan jika penyerang hanya memiliki $10 di akun mereka, mereka akan dapat menariknya berulang kali hingga semua uangnya habis. Ada seperempat miliar dolar yang diinvestasikan di DAO, dan setiap sennya berada dalam risiko.

Slock.it, perusahaan di balik DAO, mengakui potensi eksploitasi tersebut tetapi menyatakan bahwa serangan apa pun tidak akan mungkin dilakukan, sehingga semua dana masih aman. Mereka melakukan commit ke GitHub dengan menukar dua baris kode — sebuah perbaikan yang akan disertakan sebagai bagian dari DAO Framework versi 1.1.

Namun tepat ketika tim tersebut mengklaim kemenangan, seorang peretas diam-diam mengikuti jejak mereka, mengembangkan eksploitasi yang memanfaatkan bug ini. Sekarang hari Jumat, empat hari kemudian, dan DAO baru saja diretas dengan jumlah 55 juta dolar.

Sama seperti peretasan SWIFT senilai 81 juta dolar yang mempublikasikan celah dalam industri perbankan terpusat, dan serangan ransomware WannaCry yang mengungkapkan kerentanan kritis dalam sistem operasi komputer, peretasan DAO mengekspos kerapuhan awal dari keamanan kontrak pintar di dunia di mana kode mendikte segalanya. Hal ini membuat komunitas Ethereum hancur saat mereka bergegas mencoba untuk mendapatkan kembali kendali atas rantai blok.

Ini adalah kisah tentang salah satu pencurian digital terbesar yang pernah ada dan upaya berani untuk menulis ulang sejarah sehingga hal itu seolah tidak pernah terjadi.

#### Apa itu DAO? (2:00) {#what-was-the-dao-200}

Masuklah DAO — singkatan dari organisasi otonom terdesentralisasi (decentralized autonomous organization). Idenya terinspirasi oleh urun dana (crowdfunding). Alih-alih memiliki banyak dana untuk proyek yang berbeda, akan ada satu dana untuk mengatur semuanya, dan tidak ada cara yang lebih baik untuk melakukan ini selain dengan DAO.

Saat peluncuran, investor akan menerima 100 token DAO untuk setiap Ether yang disetorkan. Token ini memberi mereka tata kelola atas protokol dan mewakili bagian mereka di DAO. Pemegang token dapat mengajukan proposal — misalnya, Anda dapat mengusulkan untuk menginvestasikan satu juta dolar dengan imbalan 10% stake di perusahaan XYZ.

Setelah sebuah proposal melewati verifikasi awal, proposal tersebut akan dipilih oleh semua investor lainnya. Selama periode ini, pemegang token dapat memberikan suara ya jika mereka percaya investasi tersebut menghasilkan nilai harapan yang positif, atau tidak jika mereka percaya itu menghasilkan nilai harapan yang negatif. Mereka juga dapat menggunakan forum untuk menyatakan pendapat mereka dan membaca pendapat orang lain.

Ketika periode pemungutan suara berakhir dan kuorum 20% dari semua token terpenuhi, DAO secara otomatis mentransfer Ether yang ditentukan ke kontrak pintar yang mewakili proposal tersebut. Setiap Ether yang dihasilkan dari proposal ini kemudian akan dikembalikan ke perbendaharaan. Ini seperti satu dana lindung nilai terdesentralisasi yang besar, dirancang untuk menghasilkan keuntungan. Idenya adalah bahwa kebijaksanaan orang banyak akan membantu menciptakan peluang investasi terbaik.

Namun, masih perlu ada cara untuk melindungi minoritas agar tidak ditindas oleh mayoritas. Jika kelompok minoritas sangat tidak setuju dengan sebuah proposal yang tidak dapat mereka kalahkan dalam pemungutan suara, alih-alih memberikan suara tidak, mereka dapat memanggil fungsi pemisahan (split) dan memindahkan Ether mereka dari DAO utama ke DAO anak, yang pada dasarnya membelah DAO menjadi dua. Fungsi pemisahan ini akan menjadi sangat penting nantinya.

#### Urun dana (4:01) {#the-crowdfund-401}

DAO adalah proyek urun dana terbesar yang pernah ada, mengumpulkan 12,7 juta Ether — bernilai 150 juta dolar pada saat itu. Ini terjadi selama era awal Ethereum, di mana proyek tersebut menjadi sasaran sensasi yang sangat besar dan FOMO investor.

Sebelum ini, proyek-proyek Ethereum sebagian besar hanyalah bukti konsep (proof of concept) yang sewenang-wenang, tetapi ini adalah proyek yang berfungsi penuh dengan potensi besar. Proyek ini sepenuhnya aman dari peretasan apa pun, diamankan oleh jutaan penambang di seluruh dunia, dan terdesentralisasi — seluruh proyek terdiri dari serangkaian kontrak pintar di Ethereum.

Ini adalah kode yang tidak dapat diubah yang di-host di komputer paling aman di dunia, yang memastikan properti kunci dari sebuah DAO: sebuah organisasi yang sepenuhnya terdesentralisasi dan otonom. Setelah kontrak disebarkan pada tanggal 30 April, tidak ada satu entitas pun — bahkan Slock.it — yang dapat membuat perubahan pada protokol atau menghentikan keberadaannya. Kodenya telah diaudit berkali-kali oleh berbagai pengembang Ethereum dan dapat dilihat oleh semua orang untuk ditinjau.

#### Peretasan (5:02) {#the-hack-502}

"Lonely, so lonely" — nama Proposal DAO #59. Ini hanyalah proposal pemisahan biasa, tetapi sebenarnya di sinilah peretasan dimulai. Setelah peretas mengajukan proposal, ada periode debat standar selama tujuh hari di mana siapa pun bebas untuk bergabung. Namun, tidak ada yang bergabung dengan pemisahan ini.

Merupakan prosedur standar bagi seseorang untuk memanggil pemisahan sendirian, membuat DAO anak, dan kemudian membuat proposal yang mengirimkan semua Ether kembali ke dompet mereka. Ini memungkinkan pengguna untuk mengklaim kembali uang mereka yang didukung oleh token DAO mereka. Tujuh hari kini telah berlalu, dan peretas sekarang diizinkan untuk memanggil fungsi pemisahan. Tidak ada yang mencurigai apa pun.

Namun, saat fungsi pemisahan dipanggil, komunitas menyadari sesuatu yang mengkhawatirkan. Ether sedang dikuras dari DAO dengan kecepatan delapan juta dolar per jam. Komunitas bergegas untuk mencari tahu apa yang sedang terjadi. Tampaknya penyerang memanggil fungsi pemisahan secara rekursif — berulang kali, ratusan kali.

Ingat perbaikan bug yang terjadi empat hari lalu? Sayang sekali tidak ada cara untuk mengedit kode kontrak pintar setelah disebarkan, jadi perbaikan ini hanya ada di GitHub sebagai bagian dari The DAO 1.1, DAO yang sama sekali berbeda yang sedang dibuat. Perbaikan kecil ini bisa saja mencegah semuanya — yang dilakukannya hanyalah menukar dua baris kode sehingga saldo diperbarui sebelum pembayaran aktual.

Namun tanpa perbaikan ini, siapa pun dapat berulang kali memanggil fungsi tersebut untuk menarik Ether sebelum kontrak memperbarui saldo mereka. Ini seperti ATM yang tidak mengubah saldo Anda sampai ia memberi Anda uang. "Bisakah saya menarik sepuluh dolar? Tunggu, sebelum itu, bisakah saya menarik sepuluh dolar? Tunggu, sebelum itu…"

#### Kelompok Robin Hood (6:55) {#the-robin-hood-group-655}

Pemegang token DAO menyaksikan saat investasi mereka perlahan-lahan dikuras dari DAO utama ke DAO anak, yang juga dikenal sebagai DAO gelap (dark DAO). Selain itu, harga Ethereum anjlok tajam dari $20 menjadi $15 menyusul berita tersebut. Sesuatu harus dilakukan, dan satu-satunya cara adalah menguras sisanya sebelum peretas melakukannya. Dan dengan demikian dimulailah perlombaan untuk mengosongkan.

Di belahan dunia lain, di apartemennya di lingkungan Copacabana di Rio de Janeiro, Alex Van de Sande terbangun karena ponselnya dibanjiri pesan Skype. Ia menoleh ke istrinya dan berkata, "Ingat ketika saya memberi tahu Anda tentang tumpukan uang besar yang tidak bisa diretas itu? Itu telah diretas."

Alex menghubungi beberapa pengembang lain yang dirahasiakan dan mereka membentuk kelompok yang mereka juluki Robin Hood — peretas topi putih (white-hat) yang akan menguras sisa dana dan mengembalikannya kepada pemilik yang sah. Namun, mereka tidak punya waktu untuk mengusulkan pemisahan baru, karena itu akan membutuhkan periode pemungutan suara selama tujuh hari.

Sebaliknya, mereka mengarahkan pandangan mereka pada Proposal #71, yang akan segera berakhir dalam beberapa jam. Mereka akan bergabung dengan pemisahan itu dan menggunakan peretasan yang sama untuk menyedot semua sisa dana ke dalam DAO anak ini. Enam jam telah berlalu sejak serangan dimulai, dan pencuri telah berhasil mencuri 30% dari Ether DAO. Namun karena alasan yang tidak diketahui, serangan itu berhenti bekerja. Transaksi gagal dan semuanya berakhir.

Sementara itu, Alex baru saja bersiap untuk meluncurkan serangan topi putih untuk mengamankan sisa 70% dana. Namun tiba-tiba ia kehilangan koneksi internetnya. Dengan hanya 30 menit tersisa, ia dengan panik menelepon NET, penyedia layanan internet Brasil-nya, tetapi hanya mendapat balasan dari suara robot: "Kami melihat ada masalah internet di lingkungan Anda." Proposal pemisahan selesai dan ia baru saja melewatkan jendela waktu untuk mengeksekusi serangan Robin Hood.

Keesokan paginya, Alex mencoba mengumpulkan kembali kelompok tersebut untuk menyusup ke proposal pemisahan lainnya, tetapi yang lain sedang sibuk. "Kami merasa seperti peretas terburuk dalam sejarah. Kami digagalkan oleh internet yang buruk dan komitmen keluarga."

#### Perlombaan untuk mengosongkan (9:10) {#the-race-to-empty-910}

Empat hari setelah serangan awal, DAO kembali diserang. Dana terkuras perlahan — beberapa Ether per putaran — tetapi sudah mengumpulkan beberapa ribu dolar. Tampaknya ini berasal dari penyerang yang sedang menguji coba. Pada titik ini, Robin Hood harus melakukan sesuatu.

Mereka memilih untuk menyusup ke Pemisahan #78 karena mereka telah mengidentifikasi kurator proposal tersebut dan itu akan segera berakhir. Mereka menghubungi beberapa paus (whales) yang dengan senang hati menyumbangkan token DAO mereka, memungkinkan tim untuk mengamankan enam juta token. Semakin banyak token yang dimiliki kontrak Robin, semakin cepat ia dapat menyedot Ether. Penyerang mempercepat langkahnya dan penyerang lain ikut bergabung. Namun berkat sumbangan tersebut, Robin Hood mampu mengungguli mereka. Hal ini memungkinkan mereka untuk mengamankan 7,2 juta Ether — 55% dari DAO.

#### Percabangan (10:08) {#the-fork-1008}

DAO utama kini telah dikuras dan semua dana didistribusikan ke beberapa DAO anak — dua yang utama adalah DAO topi putih dan DAO gelap. Namun semua uang itu terkunci oleh waktu. Tidak ada proposal yang dapat diajukan di bawah DAO anak sampai masa tunggu 27 hari berakhir. Dan bahkan setelah itu, mengirim dana ke alamat eksternal memerlukan pengajuan proposal dan menunggu selama dua minggu. Pada dasarnya, masih ada 41 hari sampai peretas dapat mencairkan apa yang setara dengan 5% dari total pasokan Ethereum.

Namun peretas tidak akan pernah bisa menyentuh Ethereum-nya. Apa yang terjadi selanjutnya adalah salah satu episode paling berani dan paling kontroversial dalam sejarah rantai blok. Komunitas memutuskan bahwa mereka tidak akan membiarkan peretas menang. Mereka ingin menulis ulang sejarah sehingga setiap transaksi yang terlibat dalam peretasan dibatalkan, dan semua orang akan mendapatkan uang mereka kembali. Mereka memilih untuk melakukan percabangan pada Ethereum.

Sebuah rantai blok ibarat daftar transaksi yang terus bertambah dengan setiap blok yang ditambang. Setiap transaksi tertanam dalam rantai blok selamanya. Namun jika lebih dari 50% penambang berkolusi, mereka dapat mengubah rantai blok secara keliru, menulis ulang sejarah sesuka mereka. Biasanya ini disebut serangan 51%. Namun tidak ada yang berbahaya tentang percabangan ini — komunitas hanya mengklaim kembali uang yang telah dicuri dari mereka.

#### Kode adalah hukum (11:48) {#code-is-law-1148}

Meski begitu, tidak semua orang setuju dengan usulan percabangan tersebut. Mereka berpendapat bahwa kode adalah hukum. Dalam pandangan ini, penyerang bukanlah seorang peretas melainkan seorang pengacara pintar yang dengan cermat membaca ketentuan kontrak. Oleh karena itu, tidak ada dana yang benar-benar dicuri dan mereka seharusnya berhak atas Ether dari DAO gelap tersebut.

Penting untuk dicatat bahwa Ethereum itu sendiri tidak pernah benar-benar diretas — itu hanyalah kontrak pintar yang ditulis dengan buruk yang dieksploitasi. Dua hal yang berbeda. Selain itu, mereka percaya bahwa hal-hal yang terjadi di rantai blok tidak dapat diubah dan tidak boleh dirusak terlepas dari situasinya.

Satu hari setelah serangan awal, penyerang mengirimkan surat terbuka di obrolan grup Slack DAO, yang ditandatangani dengan kunci privat mereka:

> "Kepada DAO dan komunitas Ethereum: Saya telah memeriksa dengan cermat kode The DAO dan telah mengklaim 3 juta Ether secara sah, dan ingin berterima kasih kepada DAO atas imbalan ini. Saya kecewa dengan mereka yang mengkarakterisasi penggunaan fitur yang disengaja ini sebagai 'pencurian.' Saya memanfaatkan fitur yang dikodekan secara eksplisit ini sesuai dengan ketentuan kontrak pintar. Percabangan lunak (soft fork) atau percabangan keras akan sama dengan penyitaan Ether saya yang sah dan menjadi hak saya. Percabangan semacam itu akan secara permanen dan tidak dapat ditarik kembali menghancurkan semua kepercayaan tidak hanya pada Ethereum tetapi juga di bidang kontrak pintar dan teknologi rantai blok. Jangan salah: percabangan apa pun, lunak atau keras, akan semakin merusak Ethereum dan menghancurkan reputasi serta daya tariknya."

Setelah pemeriksaan lebih lanjut, orang-orang menyadari bahwa tanda tangan tersebut tidak valid, jadi surat ini hanya ditulis oleh seseorang yang mengaku sebagai penyerang.

Di sisi lain, para pendukung berpendapat bahwa "kode adalah hukum" adalah pernyataan yang terlalu drastis dan bahwa manusia harus memiliki keputusan akhir melalui konsensus sosial. Peretas tidak boleh dibiarkan mengambil keuntungan dari eksploitasi tersebut karena secara etis salah dan kemungkinan besar ilegal. Namun yang terpenting, DAO terlalu besar untuk gagal. DAO memegang sekitar 15% dari total pasokan Ether.

#### Ethereum Classic (14:34) {#ethereum-classic-1434}

Dalam sebuah kejadian yang menggemakan krisis keuangan 2008, para pengembang Ethereum memberikan dana talangan (bailout) kepada DAO. Vitalik Buterin, pencipta dan pengembang utama Ethereum, tidak menyesal karena mendorong percabangan. Dalam sebuah wawancara, ia kemudian berkata, "Beberapa pengguna Bitcoin melihat percabangan keras dalam beberapa hal melanggar nilai-nilai paling mendasar mereka. Saya pribadi berpikir nilai-nilai mendasar ini, jika didorong ke titik ekstrem seperti itu, adalah konyol."

Pandangan ini menguasai mayoritas komunitas Ethereum. Pemungutan suara komunitas yang kontroversial — di mana satu Ether sama dengan satu suara — menunjukkan 87% dukungan untuk percabangan tersebut. Jadi pada blok 1.920.000, node komputer di seluruh dunia memperbarui perangkat lunak mereka dan menerima percabangan tersebut. Semua Ether dari DAO dan DAO anak dipindahkan ke kontrak pengembalian dana.

Namun tidak berakhir di situ. Rantai blok Ethereum asli — yang mengalami peretasan DAO — terus berjalan. Faktanya, rantai itu berkembang. Penambang yang menentang percabangan terus menambang blok dan transaksi masih dilakukan. Keesokan harinya, Poloniex mendaftarkan koin tersebut dan mulai diperdagangkan pada harga $2 per koin. Rantai ini kemudian dikenal sebagai Ethereum Classic — rantai blok asli yang tidak diubah.

Jika Anda memegang Ether sebelum percabangan, Anda sekarang akan memiliki satu Ethereum dan satu Ethereum Classic. Jika Anda memegang satu Ether di DAO, Anda akan dapat menarik satu Ethereum dari kontrak pengembalian dana. Dan jika Anda baru saja meretas DAO, Anda akan menghasilkan kekayaan yang lumayan dalam Ethereum Classic — sekitar tujuh juta dolar.

#### Warisan DAO (16:14) {#legacy-of-the-dao-1614}

Awalnya, Ethereum Classic mendapatkan momentum sebagai alternatif, dengan komunitas kuat dari fundamentalis rantai blok yang tidak setuju dengan dana talangan tersebut. Namun sejak saat itu, Ethereum Classic gagal mendapatkan daya tarik dan hanya benar-benar ada sebagai ide dengan sedikit utilitas. Sementara Ethereum adalah rumah bagi ribuan protokol, Ethereum Classic hanya memiliki beberapa protokol dasar. Jelas bahwa percabangan tersebut telah menang.

Dua bulan kemudian, Robin Hood mentransfer 2,9 juta Ethereum Classic mereka ke Poloniex dan menjual semuanya untuk Ethereum dalam upaya untuk menjatuhkan harga. 14% berhasil dikonversi, tetapi 86% dibekukan oleh Poloniex dan dikembalikan ke kelompok tersebut. Robin Hood menyiapkan kontrak pengembalian dana di jaringan Ethereum Classic untuk pengguna yang terkena dampak peretasan DAO.

Adapun peretas, mereka pergi dengan 3,6 juta Ethereum Classic — bernilai 150 juta dolar hari ini. Namun jika tidak ada percabangan, 3,6 juta Ethereum itu akan bernilai lebih dari tujuh miliar dolar hari ini.

#### Dampak jangka panjang DAO (17:26) {#the-daos-lasting-impact-1726}

Penting untuk dicatat bahwa DAO sekarang umumnya disebut sebagai Genesis DAO untuk menghindari kebingungan, karena itu adalah DAO pertama tetapi jelas bukan yang terakhir. Terlepas dari kemunduran awal, DAO justru menjadi semakin populer. MakerDAO mengatur stablecoin DAI, dan protokol keuangan terdesentralisasi (DeFi) seperti Uniswap dengan token UNI-nya biasanya memiliki DAO tata kelola. Semua DAO ini dibangun dari pengalaman proyek-proyek sebelumnya untuk menciptakan organisasi yang lebih serbaguna dan sukses.

Namun Genesis DAO adalah yang pertama dari jenisnya, diciptakan sebagai eksperimen — eksperimen yang mahal — mengendalikan 250 juta dolar pada puncaknya, atau 15% dari total pasokan Ethereum. Christoph Jentzsch, pengembang utama, hanya memperkirakan akan mengumpulkan lima juta dolar dan kemudian mengatakan ia menyesal tidak membatasinya. Untuk eksperimen sebesar itu, ini terlalu dini dan tentu saja terlalu besar untuk gagal.

Membuat kontrak pintar ibarat mengembangkan mobil tanpa pengemudi — ini adalah tanggung jawab besar yang membutuhkan pengujian ekstensif untuk menghindari kecelakaan. Bahkan dengan kehati-hatian baru ini, protokol DeFi masih diretas hingga lebih dari 50 juta dolar, beberapa bahkan setelah diaudit oleh firma audit profesional. Namun sejak peretasan DAO, tidak ada lagi dana talangan. Komunitas Ethereum kini lebih kuat dan siap untuk beralih ke proyek yang lebih besar dan lebih ambisius, membangun generasi aplikasi digital berikutnya.