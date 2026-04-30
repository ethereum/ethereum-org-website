---
title: "Apa saja yang masuk ke dalam peningkatan Pectra?"
description: "Christine Kim membahas peningkatan Pectra Ethereum, mencakup EIP yang disertakan dalam peningkatan tersebut, apa yang mereka ubah pada protokol, dan mengapa hal itu penting bagi pengguna, pengembang, dan validator."
lang: id
youtubeId: "ufIDBCgdGwY"
uploadDate: 2024-11-14
duration: "0:20:46"
educationLevel: intermediate
topic:
  - "roadmap"
  - "pectra"
  - "upgrades"
format: presentation
author: Ethereum Foundation
breadcrumb: "Gambaran Umum Pectra"
---

Sebuah presentasi oleh **Christine Kim** di Devcon SEA yang membahas EIP yang disertakan dalam peningkatan Pectra Ethereum, apa yang mereka ubah pada protokol, kapan aktivasi Mainnet diharapkan, dan EIP mana yang dihapus dari ruang lingkup.

*Transkrip ini adalah salinan yang dapat diakses dari [transkrip video asli](https://www.youtube.com/watch?v=ufIDBCgdGwY) yang diterbitkan oleh Yayasan Ethereum. Transkrip ini telah sedikit diedit agar lebih mudah dibaca.*

#### Pengantar (0:00) {#introduction-000}

Kita akan membahas semua EIP yang akan masuk ke dalam peningkatan Pectra. Penafian singkat sebelum saya mulai: semua yang akan saya katakan sepenuhnya bersifat informasional — untuk tujuan informasi — dan tidak boleh ditafsirkan sebagai nasihat keuangan atau investasi.

#### Kapan Pectra Mainnet (0:23) {#when-is-pectra-mainnet-023}

Sebelum kita membahas apa saja yang masuk ke dalam Pectra, pertanyaan yang paling sering diajukan kepada saya adalah "kapan Pectra akan diluncurkan di Mainnet?" Jadi saya akan menjawabnya terlebih dahulu agar kita bisa masuk ke hal-hal teknis.

Ini adalah analisis linimasa yang sangat tentatif. Ketika orang bertanya kepada saya kapan Pectra akan terjadi, saya katakan masih terlalu dini untuk memastikannya — karena itu benar. Pectra masih dalam tahap pengembangan yang sangat awal. Spesifikasi sedang berubah, dan ruang lingkup Pectra belum benar-benar difinalisasi.

Melalui proses ini, salah satu hal yang dapat Anda pelajari adalah bagaimana peningkatan dikembangkan, bagaimana peningkatan diuji, dan akhirnya bagaimana mereka berhasil masuk ke Mainnet. Awalnya, pengembang memutuskan beberapa EIP untuk disertakan dalam sebuah peningkatan, dan kemudian mereka mengimplementasikan EIP tersebut ke testnet privat yang berfokus pada pengembang yang disebut devnet. Pengembang telah meluncurkan beberapa devnet untuk Pectra, sehingga EIP ini telah menjalani beberapa putaran implementasi. Pengembang telah memperhatikan kasus ekstrem dan bug yang ingin mereka perbaiki, dan mereka melakukan iterasi pada EIP ini dengan meluncurkan devnet baru. Devnet 4 diluncurkan bulan lalu pada bulan Oktober.

Ini biasanya tidak terjadi, tetapi pengembang — secara khusus untuk seluruh konferensi ini dan untuk semua orang di antara penonton — meluncurkan testnet Pectra publik pertama bulan ini. Namanya Mekong, jadi Anda dapat pergi dan berinteraksi dengan beberapa EIP yang akan ada di Pectra lebih awal. Ini didasarkan pada spesifikasi devnet 4, tetapi harap dicatat bahwa spesifikasi tersebut sedang berubah.

Ada daftar perubahan spesifikasi pada EIP yang sudah ingin disertakan oleh pengembang ke dalam Pectra devnet 5 — hal-hal seperti penetapan harga ulang prakompilasi BLS, dan EIP baru yang belum diimplementasikan ke dalam devnet 4 tetapi pengembang bertujuan untuk mengimplementasikannya untuk devnet 5 atau peningkatan di masa mendatang. Jadi spesifikasi Pectra sedang berubah. Saya memperkirakan masih ada beberapa devnet lagi sebelum spesifikasi benar-benar dapat dibekukan.

Bagian lain yang sangat penting untuk peningkatan Pectra dalam perjalanannya menuju Mainnet adalah agar ruang lingkupnya difinalisasi — agar semua EIP yang masuk ke Pectra diputuskan. Ada satu EIP — ini belum benar-benar menjadi EIP — tetapi ini adalah peningkatan kapasitas blob yang belum secara formal disertakan oleh pengembang ke dalam Pectra, tetapi tampaknya mereka kemungkinan akan menyertakan semacam peningkatan kapasitas blob karena mereka baru-baru ini menyertakan EIP yang memperkenalkan mekanisme untuk memperbarui target gas blob dan batas maksimal gas blob secara dinamis melalui lapisan konsensus, daripada membuat parameter tersebut di-hardcode di lapisan eksekusi dan lapisan konsensus.

Setelah ruang lingkup difinalisasi, Anda mulai menguji EIP baru apa pun yang telah Anda implementasikan — ruang lingkup penuh dari peningkatan Pectra — dan mengujinya secara ketat di beberapa devnet lagi. Saya membayangkan mungkin sampai devnet 6 atau 7. Dan kemudian setelah spesifikasi Pectra dibekukan dan siap diluncurkan — semua kasus ekstrem yang dapat ditemukan pengembang di devnet telah ditemukan — mereka kemudian akan merilis peningkatan Pectra ke testnet Ethereum publik. Ada dua saat ini: Sepolia dan Holesky.

Secara historis, pengembang telah menganggarkan sekitar dua minggu di antara peningkatan testnet publik. Pada kesempatan langka, pengembang menyusutkan linimasa tersebut menjadi hanya satu minggu di antara testnet, tetapi karena ukuran Pectra, saya membayangkan pengembang akan ingin mengambil waktu penuh. Saya menganggarkan kira-kira sekitar satu bulan untuk Sepolia dan Holesky, dan setelah itu barulah Anda akhirnya dapat melakukan aktivasi Mainnet.

Mengingat semua informasi yang saya ketahui saat ini dan kemajuan yang telah dicapai pengembang sejauh ini pada Pectra, analisis dan tebakan terbaik saya adalah bahwa Pectra Mainnet secara realistis akan terjadi pada bulan April 2025 mendatang. Sekali lagi, ini sangat tentatif karena banyak hal dapat berubah. Pengembangan terjadi dari minggu ke minggu — pengembang berada di panggilan ACD ini membicarakan tentang bug yang tidak mereka duga di EIP ini atau EIP baru ini yang ingin mereka tambahkan ke dalam Pectra.

#### EIP lapisan eksekusi (6:23) {#execution-layer-eips-623}

Mari kita beralih ke inti dari pembicaraan ini — apa saja yang masuk ke dalam peningkatan Pectra. Ada sepuluh EIP yang masuk ke Pectra, dan empat di antaranya difokuskan pada lapisan eksekusi.

**EIP-2537** adalah prakompilasi baru ke dalam EVM — operasi kurva BLS12-381. Ini adalah skema tanda tangan kriptografi baru yang telah diminta oleh pengembang kontrak pintar sejak lama. EIP ini dibuat pada tahun 2020, dan pada saat itu pengembang aplikasi terdesentralisasi (dapp) mengatakan mereka sangat menginginkannya karena ini akan memberikan dapp tertentu yang bergantung pada kriptografi zero-knowledge jaminan privasi yang lebih kuat, potensi peningkatan keamanan dan skalabilitas. Tanda tangan BLS juga merupakan agregasi yang terjadi pada lapisan konsensus untuk atestasi validator. EIP ini sudah lama dinantikan. Salah satu kekhawatirannya adalah: apakah masih ada aplikasi yang menunggu prakompilasi BLS, dan apakah mereka akan menggunakannya saat diluncurkan? Tetapi jika Anda berada di antara penonton ini dan tidak tahu bahwa prakompilasi BLS akhirnya akan datang — ini akan datang.

**EIP-2935** — menyajikan hash blok historis dari state. Ini memperkenalkan perubahan pada lapisan eksekusi sedemikian rupa sehingga bukti blok historis dapat dihasilkan dari state. Ini memiliki beberapa manfaat jangka pendek untuk sinkronisasi klien ringan dan untuk kontrak pintar yang mungkin ingin memanfaatkan data tentang state dari blok sebelumnya secara langsung melalui EVM — Anda sebenarnya tidak dapat melakukan itu saat ini. Tetapi manfaat jangka pendek tersebut bukanlah alasan utama EIP ini disertakan ke dalam Pectra. Alasan utamanya adalah bahwa ini merupakan prasyarat untuk Verkle — perombakan besar-besaran pada struktur data state Ethereum. Pengembang sempat berpikir transisi itu akan terjadi tepat setelah Pectra, tetapi Verkle tidak akan masuk ke Fusaka. Mereka telah menundanya ke peningkatan lain, tetapi batu loncatan ini sudah dicentang dari daftar.

**EIP-7685** — permintaan lapisan eksekusi tujuan umum. EIP ini tidak benar-benar memperkenalkan fitur baru ke Ethereum — ini adalah EIP untuk mendukung EIP lain di Pectra. Di Pectra, ada beberapa EIP di mana lapisan eksekusi akan dapat meneruskan lebih banyak pesan — berbagai jenis pesan — ke lapisan konsensus yang sebelumnya tidak bisa dilakukan. Kontrak pintar pada lapisan eksekusi akan dapat memicu penarikan, konsolidasi, dan deposit validator. Daripada mengimplementasikan saluran komunikasi baru ini semuanya dengan cara yang terpisah dan unik, EIP ini menciptakan struktur yang digeneralisasi — bus yang digeneralisasi — untuk menampung permintaan ini. Ini akan lebih mudah diuji, lebih mudah diimplementasikan di seluruh klien, dan lebih mudah distandarisasi, terutama jika pengembang ingin memperkenalkan jenis permintaan baru yang dapat dipicu oleh lapisan eksekusi.

**EIP-7702** — menetapkan kode untuk akun yang dimiliki secara eksternal (EOA). Jenis transaksi baru akan hadir di Ethereum. Jenis transaksi ini untuk sementara akan memungkinkan EOA memiliki fleksibilitas yang lebih besar, mengaktifkan fitur seperti pemrosesan batch transaksi, transaksi bersponsor, transaksi bersyarat, dan keamanan yang didelegasikan. Anda mungkin berpikir, "apakah ini visi abstraksi akun yang menjadi kenyataan di Ethereum?" Tidak, bukan — ini adalah langkah kecil. Ini adalah langkah awal untuk melihat seperti apa peta jalan nyata menuju abstraksi akun asli yang sebenarnya di Ethereum. Ada cukup banyak perdebatan dalam hal bagaimana pengembang harus mengambil langkah pertama itu, dan banyak kontroversi seputar masuknya EIP ini dan desainnya — tetapi ini sudah masuk.

#### EIP lapisan konsensus (12:00) {#consensus-layer-eips-1200}

Ada enam lainnya — ini adalah EIP lapisan konsensus.

**EIP-7742** — memisahkan jumlah blob antara lapisan konsensus dan lapisan eksekusi. Ini adalah EIP terbaru yang disertakan ke dalam Pectra. Saat ini, kapasitas blob di-hardcode ke dalam lapisan eksekusi dan lapisan konsensus di semua klien yang berbeda. Memperbarui hardcode tersebut tidak semudah yang dipikirkan beberapa orang. Menciptakan mekanisme untuk menetapkan kapasitas blob secara dinamis melalui lapisan konsensus akan memastikan bahwa di masa mendatang pengembang dapat dengan mudah mengubah kapasitas blob Ethereum, dan bahwa peningkatan semacam itu hanya memerlukan perubahan lapisan konsensus — bukan perubahan pada kedua lapisan.

**EIP-6110** — menyediakan deposit validator secara onchain. The Merge telah terjadi dan Ethereum lebih matang sebagai rantai blok Bukti Kepemilikan (PoS). Asumsi keamanan tertentu dapat dilonggarkan sekarang. EIP ini menghapus putaran pemungutan suara tambahan yang terjadi di sisi lapisan konsensus setiap kali Anda mendepositkan 32 ETH pada kontrak deposit, memastikan semua validasi deposit terjadi pada lapisan eksekusi. Ini memiliki manfaat untuk UX validator — ini akan menyusutkan waktu antara saat Anda mendepositkan 32 ETH Anda dan saat Anda melihat validator benar-benar diaktivasi pada Rantai suar.

**EIP-7002** — penarikan yang dapat dipicu oleh lapisan eksekusi. Ini sangat bagus untuk pool staking. Saat ini, jika Anda ingin menarik validator sepenuhnya, operator node yang mengoperasikan validator tersebut perlu menggunakan kunci penarikan mereka untuk keluar sepenuhnya dari validator. Melalui EIP ini, kontrak pintar akan dapat menginisiasi penarikan penuh tersebut. Ini adalah asumsi kepercayaan yang sekarang dapat Anda hapus dari pool staking — seperti Lido, Rocket Pool, dan pool staking berbasis kontrak pintar lainnya sekarang dapat memicu penarikan penuh validator jika mereka mau.

**EIP-7251** — meningkatkan saldo efektif maksimum. Ini benar-benar sebuah masalah. Ketika pengembang memikirkan tentang Rantai suar, mereka tidak menyangka set validator akan tumbuh begitu cepat — kita berada di sekitar 1,2 atau 1,3 juta validator. Ada banyak validator aktif, banyak pesan yang diteruskan di lapisan jaringan, dan itu terlalu banyak. Ini membebani node, dan jika dibiarkan akan menjadi masalah besar bagi kesehatan Ethereum. EIP-7251 dirancang untuk mendorong validator agar mengonsolidasikan ETH mereka dan memiliki saldo efektif maksimum yang lebih tinggi dari 32 ETH, mengurangi jumlah validator aktif di Ethereum.

**EIP-7549** — memindahkan indeks komite ke luar atestasi. Ini adalah restrukturisasi dan pemfaktoran ulang cara atestasi diagregasi untuk mengurangi beban jaringan di Ethereum dan menghemat bandwidth node. Ketika pengembang menyertakan ini di Pectra, mereka pikir ini adalah perubahan besar dengan manfaat luar biasa dan mudah dilakukan — tetapi dalam praktiknya, ternyata jauh lebih sulit untuk diimplementasikan daripada yang diharapkan.

#### Ringkasan (17:19) {#summary-1719}

Pectra adalah campuran dari berbagai pembaruan. Ini akan melakukan tiga hal: pertama, memperbaiki kekurangan kritis Ethereum sebagai rantai blok Bukti Kepemilikan (PoS) — pikirkan tentang MaxEB, itu adalah perbaikan kritis karena ukuran set validator dapat terus tumbuh tanpa terkendali. Kedua, meningkatkan pengalaman pengguna — jenis transaksi baru, desain yang lebih fleksibel, beberapa peningkatan untuk desain yang lebih tanpa kepercayaan untuk pool staking. Dan ketiga, meningkatkan kapasitas Ketersediaan data Ethereum — itu belum secara formal disertakan ke dalam Pectra tetapi tampaknya mungkin terjadi.

#### EIP yang dihapus dari Pectra (18:02) {#eips-removed-from-pectra-1802}

Berikut adalah semua EIP yang dihapus dari Pectra. Ini adalah semacam hal yang pertama kali terjadi untuk sebuah peningkatan yang memiliki begitu banyak EIP yang dihapus.

**PeerDAS** — awalnya akan ada peningkatan yang jauh lebih besar pada kapasitas Ketersediaan data di Pectra. PeerDAS akan memungkinkan pengembang untuk meningkatkan target blob Ethereum berkali-kali lipat tanpa sangat memengaruhi konsumsi bandwidth dan persyaratan komputasi untuk menjalankan node Ethereum. Tetapi ini masih dalam fase penelitian dan pengembangan.

**EOF** — EVM Object Format. Sebelas perubahan kode ini sebagai satu bundel adalah pembaruan besar pada EVM Ethereum. Baik PeerDAS maupun EOF benar-benar awalnya disertakan di Pectra tetapi sedang diuji di devnet terpisah. Pengembang berpikir mereka akan membutuhkan lebih banyak waktu untuk bersiap menghadapi aktivasi Mainnet, dan mereka tidak ingin menunda EIP Pectra lainnya. Jadi mereka mengatakan PeerDAS dan EOF jelas membutuhkan lebih banyak waktu — mereka akan mendorongnya ke peningkatan lain dan tidak menahan EIP Pectra lainnya dari Mainnet.

Ini sekarang dipindahkan ke Fusaka. Verkle awalnya dijadwalkan untuk Fusaka tetapi sejak itu telah ditunda lebih lanjut. EOF dan PeerDAS ada di Fusaka untuk saat ini. Ada EIP lain yang akan dipertimbangkan kembali oleh pengembang untuk disertakan di Fusaka — transisi SSZ, daftar inklusi, perubahan pada penerbitan, kedaluwarsa riwayat, ePBS, dan arah abstraksi akun.

#### Tanya Jawab (22:02) {#qa-2202}

**Host:** Kapan EOF?

**Christine Kim:** Saya baru saja mengatakan bahwa para pengembang akan mencoba dan memasukkannya ke Fusaka. Apakah saya pikir itu mungkin? Mungkin tidak. Apakah saya pikir Fusaka akan terjadi pada tahun 2025? Sama sekali tidak. Jumlah waktu yang dibutuhkan untuk mempersiapkan Pectra — Fusaka akan memakan waktu yang sama jika tidak lebih lama.

**Host:** Apakah ada jalur darurat untuk meningkatkan target blob antara sekarang dan aktivasi Pectra?

**Christine Kim:** Tidak. Target blob adalah parameter yang di-hardcode di lapisan eksekusi dan lapisan konsensus. Agar kapasitas blob berubah, pengembang perlu melakukan percabangan keras. Saya tidak berpikir ada cara apa pun agar kapasitas blob meningkat antara sekarang dan Pectra tanpa percabangan keras.

**Host:** Apakah proposal tersebut hanya untuk mengubah batas blob atau juga target blob?

**Christine Kim:** Pertanyaan yang bagus. Peningkatan yang paling konservatif adalah tiga hingga empat — hanya mengubah target, tidak mengubah batas maksimal sama sekali. Tetapi bukan itu yang diminta oleh pengembang lapisan 2 (L2). Ada perwakilan dari tim Base — tim Base dari Coinbase — dan dia telah bersaing untuk peningkatan yang lebih agresif. Dia telah menunjukkan data yang menyarankan bahwa peningkatan tersebut tidak akan berdampak negatif pada desentralisasi Ethereum. Ada proposal konservatif untuk hanya mengubah target, dan kemudian ada proposal yang lebih ambisius untuk mengubah batas maksimal dan target — seperti delapan dan empat, atau enam dan dua belas. Ada berbagai gradien.

**Host:** Anda mendesak orang-orang untuk lebih terlibat dalam tata kelola. Bagaimana komunitas dapat lebih terlibat?

**Christine Kim:** ETH Research dan ETH Magicians adalah dua forum diskusi yang sangat bagus untuk memberikan upvote pada EIP tertentu dan menunjukkan dukungan Anda. Panggilan ACD mungkin adalah tempat dengan sinyal tertinggi — yang harus Anda lakukan hanyalah meninggalkan komentar pada agenda panggilan ACD di GitHub dan mengatakan bahwa ini adalah EIP yang ingin Anda bicarakan atau presentasikan. Moderator panggilan biasanya sangat setuju untuk memberi Anda waktu. Namun, jangan memakan terlalu banyak waktu — mungkin lima menit untuk menyampaikan pendapat Anda.