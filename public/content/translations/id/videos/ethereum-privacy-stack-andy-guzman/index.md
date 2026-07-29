---
title: "Tumpukan privasi Ethereum: pembacaan privat, jaringan, dan kebocoran tersembunyi"
description: "Andy Guzman menjelaskan bagaimana metadata bocor ketika dompet membaca data dari Ethereum, dan bagaimana penelitian pembacaan privat dan jaringan dari peta jalan privasi menutup kebocoran lapisan akses."
lang: id
youtubeId: "tvAqDJXCBaA"
uploadDate: 2026-02-16
duration: "0:27:00"
educationLevel: intermediate
topic:
  - "privacy"
  - "roadmap-and-priorities"
format: presentation
author: EthBoulder
breadcrumb: "Tumpukan Privasi Ethereum"
---

Sebuah pembicaraan oleh **Andy Guzman**, pemimpin tim Privacy Stewards of Ethereum (PSE) di Yayasan Ethereum, pada EthBoulder 2026. Dia mengungkap titik buta utama dalam privasi Ethereum: bahkan pengguna yang tidak pernah menandatangani transaksi membocorkan data perilaku terperinci melalui kueri sehari-hari. Dia memperkenalkan tumpukan privasi Ethereum, yang mencakup pembacaan privat (PIR), privasi lalu lintas (perutean onion dan mixnet), dan pekerjaan kinerja seperti pohon biner terpadu (unified binary trees) dan state yang dapat diverifikasi ZK.

*Transkrip ini adalah salinan yang dapat diakses dari [transkrip video asli](https://www.youtube.com/watch?v=tvAqDJXCBaA) yang diterbitkan oleh EthBoulder. Transkrip ini telah diedit sedikit agar lebih mudah dibaca.*

#### Surat fiktif penyedia RPC (0:12) {#the-fictional-rpc-provider-letter-012}

Halo semuanya, saya Andy, dan saya ingin memperkenalkan topik yang tidak sering dibahas dalam ekosistem Ethereum dan sangat penting. Seperti yang mungkin Anda perhatikan dari salindia dan pengantar, ini terkait dengan privasi, dan bagaimana kita kurang terlindungi tanpa menyadarinya.

Mari saya mulai dengan surat yang ditulis seseorang untuk Anda.

"Pengguna yang terhormat, terima kasih atas 847 kueri yang Anda buat bulan ini. Kami sangat senang bisa mengenal Anda. Kami tahu bahwa Anda memegang ETH di tiga dompet yang berbeda. Kami tahu bahwa Anda memeriksa harga ETH 94 kali pada hari Selasa lalu. Itu adalah hari yang sangat berat bagi semua orang, jadi kami tidak menghakimi. Anda juga memeriksa harga BTC, yang mana menarik, karena Anda tidak memegang Bitcoin apa pun. Apakah Anda berpikir untuk melakukan diversifikasi? Itu akan menjadi rahasia di antara kita, dan tentu saja mitra analitik kami. Anda juga mengamati dua pool Uniswap dengan sangat cermat, dan Anda memeriksa faktor kesehatan Aave Anda 14 kali minggu lalu. Anda mungkin perlu bersantai, atau cukup tambahkan beberapa kolateral. Pada hari Kamis Anda memeriksanya tiga kali dalam 12 menit, dan Anda sangat khawatir. Anda melihat empat nama ENS yang berbeda, jadi entah Anda sedang memulai proyek baru atau Anda sedang mengalami krisis identitas. Dan Anda selalu diam antara jam 11 malam dan 7 pagi waktu Pegunungan."

#### Bagaimana Anda membocorkan data tanpa menandatangani transaksi (1:34) {#how-you-leak-data-without-signing-transactions-134}

"Jadi kami cukup yakin bahwa Anda berbasis di Boulder, atau di dekatnya. Anda tidak pernah menandatangani satu transaksi pun melalui kami. Anda tidak pernah harus melakukannya. Rasa ingin tahu Anda memberi tahu kami segalanya. Salam hangat, penyedia RPC Anda."

Tentu saja ini adalah surat fiktif, tetapi ini menggambarkan sesuatu yang benar-benar kita bocorkan setiap hari. Bahkan jika Anda tidak melakukan satu transaksi pun atau tindakan onchain apa pun, Anda pada dasarnya memberi tahu segalanya kepada perusahaan analitik mana pun yang ingin mendapatkan data tersebut dan perilaku Anda.

#### Penulisan privat vs pembacaan privat (2:07) {#private-writes-vs-private-reads-207}

Jadi apa yang sebenarnya terjadi saat ini di dunia privasi? Saya melihat bahwa kita sangat menekankan pada privasi onchain, atau apa yang kami di PSE sebut sebagai penulisan privat: semua tindakan yang Anda lakukan secara onchain. Dan itu masuk akal, bukan? Tindakan tersebut direkam selamanya dan ditransmisikan ke seluruh dunia, jadi memang masuk akal untuk tidak membocorkan alamat Anda dengan tindakan tertentu. Kami juga sangat menekankan pada perkakas: sumber data, bukti, DSL, dan bahasa yang dapat kami gunakan untuk memberi pengembang lebih banyak alat untuk mengekspresikan dan membangun aplikasi yang lebih kuat yang memiliki lebih banyak privasi onchain.

Namun saya ingin berargumen dalam presentasi ini bahwa kita tidak memberikan perhatian dan upaya yang cukup pada domain lain ini: apa yang kita sebut pembacaan privat, karena setiap kali Anda mengkueri data dari rantai blok, Anda membocorkan banyak informasi, dan jaringan privat, karena bahkan sebelum apa pun tiba secara onchain, semua lalu lintas Anda bocor.

Untuk menjadi sedikit lebih teknis: semua panggilan RPC, seperti eth_getBalance, eth_call, dan eth_getLogs, adalah permintaan dalam teks biasa yang masuk ke penyedia RPC dan dikorelasikan dengan IP Anda.

#### Mengapa lebih banyak aktivitas meningkatkan risiko pembuatan profil (3:20) {#why-more-activity-increases-profiling-risk-320}

Dengan informasi ini, menjadi sangat mudah untuk membuat profil orang, menyegmentasikan mereka, dan memodelkan perilaku. Dan ini dapat digunakan untuk melawan Anda. Seperti yang dapat Anda bayangkan, informasi adalah kekuatan, dan semakin banyak informasi yang dimiliki orang tentang Anda dan perilaku Anda, semakin besar kekuatan yang mereka miliki atas Anda.

Sebagian besar orang tidak menyadari hal ini. Sebagian besar orang akan berkata, oke, yah, itu tidak terlalu penting karena ini bukan informasi penting. Atau mereka mungkin berpikir: semakin banyak aktivitas yang ada, semakin terlindungi saya. Ini sama sekali tidak benar, dan berlawanan dengan intuisi. Untuk tindakan onchain, di mana pun ada himpunan anonimitas, itu memang membantu: semakin banyak pengguna, semakin banyak privasi, dan semakin mudah untuk berbaur. Tetapi dengan pembacaan, yang terjadi adalah sebaliknya, karena kueri tidak dapat dipertukarkan. Semakin banyak aktivitas yang Anda transmisikan, semakin banyak tindakan yang Anda ambil, semakin kaya permukaan korelasi dan semakin mudah untuk membangun profil tindakan Anda.

Jadi setiap kali ada mania keuangan terdesentralisasi (DeFi) atau kegilaan NFT, orang menjadi lebih ceroboh. OpSec, tentu saja, diabaikan begitu saja, dan menjadi jauh, jauh lebih mudah untuk mendeanonimkan orang berdasarkan pola aktivitas yang paling sering dilakukan orang.

#### Memperkenalkan tumpukan privasi Ethereum (4:43) {#introducing-the-ethereum-privacy-stack-443}

Saya ingin memulai dengan lanskapnya: di mana kita harus menyerang, apa yang dibutuhkan, dan siapa yang mengerjakan apa. Pembicaraan ini akan membahas beberapa topik yang lebih teknis dan beberapa topik konseptual tingkat tinggi, sehingga semua orang dapat mengambil nilai darinya.

Saya ingin menyajikan apa yang saya sebut tumpukan privasi Ethereum, atau lapisan-lapisan tumpukan privasi Ethereum, dan saya pikir ini berguna untuk dipikirkan. Jika kita benar-benar menginginkan privasi, kita tidak hanya membutuhkan privasi onchain; kita juga membutuhkan privasi di semua lapisan tumpukan ini, mirip dengan siklus hidup sebuah transaksi, atau model OSI dan lapisan teknologinya. Saya berpendapat kita bisa membuat standar, atau semacam pengakuan di seluruh ekosistem, bahwa lapisan-lapisan ini ada. Mungkin ini bukan bentuk akhirnya, tetapi saya pikir ini bisa dibilang sudah berguna.

#### Lapis demi lapis: di mana Anda bocor (5:41) {#layer-by-layer-where-you-leak-541}

Bagian atas adalah lapisan aplikasi. Setiap kali Anda mengunjungi situs web, tentu saja, Anda membocorkan apa yang Anda kunjungi, dan orang-orang dapat mulai membuat profil: himpunan anonimitas, kredensial, menautkan IP Anda ke apa yang Anda kunjungi, bahkan jika Anda tidak melakukan apa pun.

Yang berikutnya adalah lapisan dompet. Setiap kali Anda mengambil tindakan, Anda tidak hanya membocorkan informasi ke lapisan aplikasi tetapi juga ke gateway. Dompet saat ini sangat kompleks, mereka terintegrasi dengan banyak sistem dan layanan lain, dan Anda membocorkan lebih banyak informasi daripada yang Anda bayangkan. Bahkan jika Anda hanya membuka dompet Anda dan itu mengkueri harga ETH atau saldo Anda, Anda membocorkan segalanya.

Kemudian Anda memiliki gateway: RPC, proksi, relayer. Anda membocorkan lebih banyak metadata lagi. Kemudian apa yang orang bayangkan sebagai elemen onchain, yaitu setiap kali hal-hal dikueri di EVM, seperti state atau pola eksekusi. Misalnya, mengkueri saldo sesuatu, atau state dari kontrak pintar. Dan terakhir konsensus, di mana semua validator berada. Bergantung pada apakah Anda menulis secara onchain atau membaca secara onchain, Anda mungkin juga menyentuh mempool.

Dan ada vertikal lain, yaitu apa yang kita sebut jaringan, yang bersifat transversal, memotong semua lapisan ini. Misalnya: saat ini Anda mengunjungi situs web dan server mengetahui IP Anda. Tetapi bagaimana jika Anda mengunjungi situs web tersebut melalui Tor atau jaringan anonim lainnya? Anda akan mengetahui alamat IP situs web tersebut, tetapi mereka tidak akan mengetahui alamat IP Anda. Dan bagaimana jika situs web tersebut dihosting di negara yang baru-baru ini mulai menyensor semua hal tentang kripto? Situs web dan perusahaan tersebut juga ingin menyembunyikan IP mereka, dan ingin menyembunyikan domain mereka di balik domain onion.

Itulah jenis hal-hal yang masuk akal: kita perlu menelusuri lapis demi lapis, memperkuat segalanya, menganalisis melalui kacamata penyerang yang sangat disruptif yang ingin menyensor segalanya. Bahkan jika kita tidak melakukannya, dan kita mengatakan kita hidup dalam keadaan yang cukup baik, informasi ini direkam sekarang dan akan dihosting selamanya oleh banyak orang yang bahkan tidak Anda kenal, perusahaan yang mulai menjual data Anda. Pada akhirnya, dalam lima tahun, seseorang mungkin melarang kripto dan berkata, "siapa pun yang menggunakan Uniswap dalam lima tahun terakhir, saya dari IRS, saya akan mulai mengetuk pintu dan menjebloskan Anda ke penjara," atau apa pun. Skenario distopia ini terjadi di berbagai negara di seluruh dunia saat ini.

#### Pembacaan privat dan jaringan privat (8:24) {#private-reads-and-private-networking-824}

Oke, jadi kita memiliki tumpukan privasi Ethereum. Di mana kita harus fokus? Dalam presentasi ini saya ingin berbicara tentang dua area ini. Pembacaan privat: setiap kali Anda mengakses state dari onchain, Anda menyentuh semua lapisan ini, dari aplikasi, katakanlah saya ingin mengkueri harga ETH, ke dompet, ke gateway, ke node yang menjalankan Ethereum dan EVM, dan kemudian kembali. Pada dasarnya penyedia RPC atau indeks. Dan jaringan privat, yang merupakan semua tindakan yang terjadi pada lapisan jaringan. Inilah yang ingin kita perkuat.

#### Tiga pilar: data, lalu lintas, kinerja (9:05) {#three-pillars-data-traffic-performance-905}

Ada tiga pilar yang menurut saya sangat penting bagi kita untuk mencapai hal ini. Kita ingin menyembunyikan dan menjadikan data itu sendiri privat. Kita ingin menyembunyikan dan menjadikan lalu lintas itu sendiri privat. Dan kemudian kita ingin membuatnya berkinerja tinggi, berguna, praktis, dan murah. Ini merangkum banyak informasi tentang hal-hal yang terjadi di ekosistem, tetapi saya pikir ini berguna untuk menggambarkan situasi dan mengidentifikasi titik ungkit di mana kita dapat mempercepat.

#### Menyembunyikan data: dari proksi hingga PIR (9:39) {#hiding-data-from-proxies-to-pir-939}

Jadi, data. Apa yang ingin kita lindungi? Kita ingin menyembunyikan informasi apa yang Anda minta dari server-server ini, dan kita ingin menyembunyikan pola bagaimana Anda mengakses data ini. Tidak hanya kontennya tetapi juga polanya.

Ada berbagai tingkat teknik. Yang pertama adalah tidak ada: Anda hanya membocorkan segalanya. Setiap kali Anda menghubungkan dompet Anda, Anda mengikat alamat IP Anda ke kontrak yang Anda kueri, ke eth_getBalance tertentu untuk alamat tertentu, dan begitulah. Bahkan jika Anda menggunakan protokol privasi, katakanlah Tornado Cash, dan Anda ingin mengkueri state dari pohon Merkle, Anda harus mengunduh seluruh pohon, yang kinerjanya tidak terlalu baik, atau Anda membocorkan jalur dan daun mana yang Anda kueri, mengurangi himpunan anonimitas Anda. Jadi bahkan menggunakan protokol privasi yang kuat seperti Tornado Cash tidak cukup jika Anda tidak melindungi jaringan dan pola akses data Anda.

Tingkat berikutnya adalah semacam proksi atau relai: banyak mesin yang tidak tahu dari mana permintaan itu berasal dan pada akhirnya mengambil data tersebut. Itu tidak terlalu praktis, dan tidak terlalu tanpa kepercayaan.

Kemudian Anda memiliki TEE, yang merupakan langkah maju, dan di sinilah beberapa tim dan perusahaan menawarkan layanan. Saya pikir ini adalah langkah maju yang baik tetapi tidak cukup, sekali lagi karena biaya untuk menyerang dan merusak TEE turun drastis. Untuk kasus penggunaan kritis tertentu ini tidak cukup; untuk banyak kasus sehari-hari ini bisa jadi cukup.

Ada tim lain yang mengerjakan OMAP, pola akses peta yang tidak disadari (oblivious map access patterns), dan ORAM, RAM yang Tidak Disadari (Oblivious RAM). Ini adalah teknik serupa yang mencoba mengaburkan bagian mana dari kumpulan data yang Anda coba akses. Alih-alih mengatakan "Saya ingin saldo dari alamat ETH ini," Anda secara acak mengakses hal-hal yang berbeda, sehingga server tidak tahu.

Dan saya berpendapat bahwa hasil akhir dari ini adalah PIR, pengambilan informasi privat (private information retrieval), yang berarti server tidak tahu apa yang Anda kueri dan tidak mempelajari apa pun tentangnya.

#### Penjelasan Pengambilan Informasi Privat (12:03) {#private-information-retrieval-explained-1203}

Pengambilan informasi privat adalah teknik yang sangat kuat dalam kriptografi, dan ini akan banyak digunakan. Ada dua varian: PIR indeks, yang dapat Anda gunakan jika Anda memiliki data terstruktur di bawah sebuah indeks, dan PIR kata kunci, di mana, seperti namanya, Anda mengkueri per kata kunci. Sangat sulit untuk memiliki satu skema yang berfungsi untuk segalanya.

State Ethereum sangat besar dan sangat bervariasi. Log, yang saya pelajari kemarin, hanya dapat ditambahkan (append-only), tetapi model akun berbeda: beberapa state diperbarui sangat sering, beberapa tidak. Bergantung pada bagaimana Anda memilah dan membaginya, Anda dapat memiliki megabita, gigabita, atau terabita data, dengan pola akses yang sangat berbeda.

#### Arsitektur PIR multi-agen (12:48) {#a-multi-agent-pir-architecture-1248}

Proposal yang sedang kami kerjakan di dalam PSE, dan di sini saya akan berbicara secara konseptual dan kemudian tentang proyek spesifik yang kami lakukan di PSE dan hal-hal lain yang saya lihat di ekosistem, adalah arsitektur multi-agen. Tidak ada satu skema pun yang sempurna untuk semua state Ethereum. Tetapi jika kita dapat membagi state Ethereum per jenis atau per pola akses, kita dapat menemukan skema yang sangat baik untuk masing-masingnya.

Bagaimana jika kita memiliki layanan yang menjalankan arsitektur multi-agen ini, dan bergantung pada jenis kueri dan di mana mereka mungkin berada di state Ethereum, layanan tersebut menjalankan satu skema atau skema lainnya? Itu sudah membawa kita sangat dekat dengan sesuatu yang layak, mampu diproduksi, dan dapat ditawarkan ke ekosistem. Ini akan membutuhkan sesuatu seperti API terpadu, sehingga dompet, pengindeks, pengguna, dan pengembang aplikasi terdesentralisasi (dapp) tidak perlu khawatir tentang skema mana yang digunakan dan bagaimana memanggilnya. Anda hanya memiliki API standar, dan orang lain yang mengkhawatirkan detail implementasinya.

Kami sudah melakukan ini dan mengimplementasikan dua skema yang berbeda. Kami akan membuka hibah, dan kami mencoba mengoordinasikan lebih banyak orang di ekosistem untuk mengatasi beberapa hal ini dan melihat mana yang paling dibutuhkan untuk Ethereum.

Berikut adalah beberapa angka tentang berbagai skema PIR: throughput, overhead komunikasi, dan sebagainya. Ini sulit, karena aplikasi yang berbeda memiliki pola akses yang berbeda. Beberapa mengakses banyak tanda terima, beberapa ingin mengakses lebih banyak state, seperti Rotki, dan beberapa mengakses lebih banyak transaksi, seperti Helios. Tidak ada solusi ajaib, dan kemungkinan besar arsitektur campuran akan sangat membantu. Kami juga melakukan sistematisasi pengetahuan, jadi jika ini menarik bagi Anda, kami dapat membagikannya. Dan ini hanyalah beberapa tim yang bekerja di area ini. Maafkan saya jika Anda adalah bagian dari tim dan saya tidak memasukkan Anda; jika seseorang melihat rekaman ini dan ada yang terlewat, beri tahu saya dan saya dapat mulai menambahkan Anda.

#### Menyembunyikan lalu lintas: perutean onion dan Tor (15:22) {#hiding-traffic-onion-routing-and-tor-1522}

Kita telah membahas data. Bagian besar lainnya adalah lalu lintas. Bagaimana kita menyembunyikan lalu lintas, dan apa yang ingin kita sembunyikan? Secara sederhana, kita ingin menyembunyikan IP klien dan server satu sama lain, dan dari seluruh dunia yang mungkin mengintai lalu lintas. Kita memiliki berbagai teknik: layanan onion, mixnet, VPN, DC-net, dan mungkin ada klasifikasi lainnya. Saya hanya akan berbicara tentang dua yang pertama.

Teknik perutean onion mengenkripsi dalam lapisan-lapisan, dan lalu lintas juga didekripsi dalam lapisan-lapisan. Orang-orang di antaranya tidak akan pernah tahu asalnya, beberapa tidak akan pernah tahu tujuannya, dan beberapa tidak pernah mempelajari apa pun; mereka hanya bertindak sebagai perute.

Singkatnya adalah: bagaimana jika semua lalu lintas ekosistem Ethereum dapat dirutekan melalui jaringan Tor, bisa dibilang begitu? Ada opsi lain juga. Kita akan membantu melindungi IP pengirim: ponsel atau laptop Anda tidak akan bocor saat Anda mengirim transaksi atau meminta informasi. Dan tentu saja kita juga akan melindungi penerima, yaitu server. Bayangkan di Iran, Tiongkok, Korea Utara, atau Venezuela, seseorang mencoba menghosting protokol DeFi atau layanan dan itu disensor oleh negara mereka. Ini adalah opsi yang dapat melindungi hidup mereka. Ini melewati penyensoran dan juga menyembunyikan lalu lintas dari ISP, penyedia layanan internet, yang kita semua tahu disadap oleh badan intelijen yang mengintai segalanya.

Tujuannya adalah untuk memiliki pengganti langsung (drop-in replacement): sebuah SDK, sehingga dompet, pengembang dapp, dan penyedia infrastruktur tidak perlu khawatir tentang detail implementasinya. Mereka hanya tahu bahwa jika mereka menggunakan SDK ini, lalu lintas akan di-onion-kan, dienkripsi, dan diperkuat.

Ada tim yang ingin saya sebutkan, tim Brume Wallet, yang memulai Echalote, implementasi sumber terbuka Tor untuk web. Ini sudah ada sekarang: ada klien Tor, tetapi ditulis dalam C, dan mereka perlu dijalankan di peramban khusus. Bagaimana jika saya ingin menambahkan ini ke MetaMask, atau ke dompet Kohaku, atau ke Ambire, Rabby, dan semua yang lainnya? Kita membutuhkan SDK JavaScript, dan itulah yang dimulai oleh Echalote.

Kemudian, Proyek Tor memiliki implementasi baru yang sedang dikembangkan yang disebut Arti, generasi berikutnya dari klien mereka. Tetapi kita membutuhkan Arti yang tertanam. Arti berbasis Rust, dan perlu dikompilasi ke WASM agar dapat berjalan di peramban Anda, sehingga Anda dapat mengimpornya dengan sangat mudah. Pada dasarnya kami memiliki kolaborasi dengan tim Tor: panggilan setiap minggu, dan beberapa proyek serta kemitraan bersama.

#### Mixnet untuk Ethereum (18:16) {#mixnets-for-ethereum-1816}

Di sisi mixnet, saya ingin menyebutkan beberapa tim yang mendekati hal ini: tim Nym; HOPR, juga salah satu yang pertama; VPN seperti Gnosis VPN; dan beberapa lainnya yang baru bagi saya, seperti Anyone Protocol, dan saya pikir seseorang dari tim itu seharusnya ada di sini di Denver, ditambah beberapa yang baru lainnya. Ada banyak tim yang mengerjakan mixnet, VPN, dan pendekatan lainnya.

Kita ingin melihat: bagaimana jika kita membuat mixnet yang dibangun khusus untuk Ethereum, di mana kita dapat merutekan lalu lintas RPC? Mixnet memiliki jaminan yang kuat, tetapi mereka menambahkan banyak latensi. Untuk beberapa kasus penggunaan itu tidak masalah: tidak masalah jika butuh waktu sedikit lebih lama, asalkan Anda memiliki privasi. Tetapi untuk hal-hal seperti DeFi dan perdagangan, sangat tidak mungkin ini akan diadopsi jika mereka menambahkan latensi. Jadi, seberapa cepat kita dapat berjalan dengan jaminan privasi tertinggi? Sekali lagi, apresiasi untuk beberapa tim ini, dan jika seseorang bekerja di area ini dan saya belum menambahkan Anda, saya ingin sekali mengobrol.

#### Kinerja: pohon biner terpadu dan akselerasi GPU (19:28) {#performance-unified-binary-trees-and-gpu-acceleration-1928}

Hal terakhir yang ingin saya bicarakan, pilar ketiga untuk mewujudkan ini, adalah kinerja. Kita ingin hal-hal ini berjalan cepat dan murah. Saya punya prinsip: hal-hal ini tidak akan diadopsi jika biayanya lebih tinggi daripada manfaatnya. Biaya berarti pengalaman pengguna, waktu, dan upaya bagi pengguna, tetapi juga biaya bagi pengembang dan infrastruktur: apakah ini sangat mahal untuk dijalankan? Kita perlu menurunkan biaya sebanyak yang kita bisa, dan ada dua inisiatif tingkat tinggi yang dapat saya bicarakan.

Salah satunya adalah UBT. Bergantung pada seberapa banyak Anda terlibat dalam EIP protokol, Anda mungkin pernah mendengar tentang ini. Saat ini kita memiliki Trie Merkle Patricia, yang berguna, tetapi tidak terlalu berguna untuk ZK dan jenis kriptografi lainnya. Ada sebuah proposal, EIP-7864, yang beralih bukan ke Pohon Verkle tetapi ke pohon biner terpadu (unified binary trees). Ini jauh lebih efisien untuk mengkueri state dan kemudian melakukan operasi kriptografi seperti ZK di atasnya.

Kami memiliki proyek yang melakukan UBT yang dapat diverifikasi: Anda menambahkan sespan (sidecar) ke klien Ethereum mana pun, yang, alih-alih menjalankan basis data MPT, memiliki basis data state UBT, dan kemudian Anda membuktikan bahwa transformasi dari MPT ke UBT ini valid menggunakan zkVM. Ini sudah sangat kuat. Setelah kita berhasil melakukan ini, klien ringan dapat menggunakannya untuk meningkatkan kinerja mereka, dan hal-hal seperti PIR dapat berjalan jauh lebih cepat.

Aspek lainnya adalah akselerasi GPU. Kita dapat menjalankan hal-hal ini jauh lebih cepat jika kita mengoptimalkan tingkat tumpukan yang lebih rendah: GPU adalah salah satunya, atau akselerasi CPU juga. Hal-hal ini mungkin akan berjalan di server, bukan di ponsel, jadi sangat berharga juga untuk mulai mengeksplorasi bagaimana kita dapat membuat pustaka tingkat rendah ini agar berjalan jauh lebih cepat.

Melakukan rekap sejauh ini: kita memiliki lima lapisan ini, dan kita ingin mencakup kasus penggunaan ini. Ada tiga pilar: data, lalu lintas, dan kinerja. Untuk data kita memiliki proksi, TEE, ORAM, OMAP, dan PIR. Untuk lalu lintas kita memiliki mixnet, perutean onion, dan lainnya. Untuk kinerja kita memiliki UBT dan akselerasi GPU. Jika Anda ingin membaca lebih lanjut, setidaknya tentang kontribusi yang diberikan PSE, Anda dapat mengunjungi pse.dev/research.

#### Mengukur kesuksesan (22:15) {#measuring-success-2215}

Jadi apa itu kesuksesan, dan bagaimana kita bisa mengukurnya? Kembali ke lapisan-lapisan ini: jika saya ingin dapat mengklaim bahwa Ethereum adalah rantai paling privat, apa hasil akhirnya? Saya harus merasa nyaman bahwa semua lapisan ini sangat diperkuat. Bagaimana saya akan mengukurnya? Saya mengharapkan lebih banyak situs web dan frontend dapp dihosting di balik domain onion. Saya ingin sekali dompet secara bawaan menggunakan perutean anonim, dan gateway, penyedia RPC, serta pengindeks juga. Dan saya akan mengukur persentasenya.

Pertanyaannya adalah: dari frontend ekosistem Ethereum saat ini, berapa banyak yang dihosting di balik domain onion? Saya akan mengatakan sangat sedikit, 1% jika ada. Agar saya merasa senang dan mengatakan kita berhasil, kita mungkin membutuhkan lebih dari 80% di semua lapisan ini. Berapa banyak dompet saat ini yang merutekan lalu lintas melalui teknik perutean anonim? Sangat, sangat sedikit. Sama halnya dengan penyedia RPC: apakah penyedia ini menawarkan PIR? Tidak. Jadi bagi saya, mengklaim kesuksesan berarti para aktor di semua lapisan ini mengadopsi jenis teknologi ini, setidaknya 80% dari tim, lalu lintas, atau kueri.

#### Perbandingan node onion Bitcoin (23:39) {#bitcoins-onion-node-comparison-2339}

Ini adalah satu hal yang bisa membuat kita iri pada Bitcoin. Terlepas dari semua kritik yang mereka dapatkan, ini adalah gambar dari bulan November tahun lalu: 64% dari node penuh mereka yang dapat dijangkau disembunyikan di balik domain onion.

Bisakah kita melakukannya sendiri? Ini adalah privasi tingkat rendah, tingkat konsensus, tetapi bisakah kita mengatakan bahwa node penuh dan node validator kita berada di balik jaringan onion atau mixnet? Saya sangat berpikir kita harus melakukannya, dan kita mungkin berada di bawah 1%. Kita memiliki tantangan lain yang tidak mereka miliki: kita berjalan jauh lebih cepat, dan konsensus kita berbeda. Tetapi saya ingin sekali memiliki dasbor seperti ini dan mengatakan lebih dari 80% dompet telah mengadopsi jenis teknologi ini, dan penyedia RPC, penjelajah, frontend, penyeimbang beban (load balancer), dan SDK juga. Saya ingin sekali daftar ini bertambah.

#### Membandingkan Ethereum dengan Monero dan Zcash (24:55) {#comparing-ethereum-to-monero-and-zcash-2455}

Saya memberanikan diri, tadi malam dan malam sebelumnya, untuk mulai melihat bagaimana, melalui kacamata lapisan ini, ekosistem Ethereum dibandingkan dengan hal-hal seperti Solana, Bitcoin, Zcash, dan Monero. Hal-hal yang berwarna kuning adalah teknik keikutsertaan (opt-in), dan saya pikir kita sangat baik di sana. Hal-hal yang berwarna biru adalah proposal, beberapa di antaranya adalah proposal protokol. Hal-hal yang berwarna hijau ditegakkan pada lapisan protokol.

Karena sejarah 10 tahun kita sebagai rantai publik, saya pikir akan sulit untuk mengejar Monero dan Zcash dalam menjadikan privasi sebagai bawaan. Tetapi saya pikir kita dapat melakukan pekerjaan yang sangat baik dalam mendapatkan adopsi keikutsertaan, dan secara budaya serta sosial memengaruhi tim dan pengguna untuk mengadopsi lebih banyak teknik ini. Bitcoin dan Solana memiliki tantangan mereka sendiri, dan saya pikir mereka akan tertinggal lebih jauh, setidaknya dalam hal privasi ini.

#### Tantangannya: ekosistem yang dapat diprogram paling privat (25:50) {#the-challenge-the-most-private-programmable-ecosystem-2550}

Tujuan saya, dan tujuan yang ingin saya tanamkan di benak Anda, adalah agar Ethereum menjadi ekosistem yang paling privat, tanpa izin, tanpa kepercayaan, dan dapat diprogram di dunia. Kita memiliki rantai pembayaran privat lainnya, dan itu bagus, mereka sangat baik, tetapi saya pikir mereka akan memiliki pekerjaan yang jauh lebih sulit untuk menjadi dapat diprogram dan menciptakan ekosistem yang telah kita ciptakan.

Tantangan saya untuk Anda, dan tentu saja untuk saya dan tim saya, adalah menjadi, dari ekosistem yang dapat diprogram, yang paling tanpa izin, tanpa kepercayaan, dan privat. Kita tidak bisa hanya fokus pada elemen onchain. Kita perlu fokus pada semua lapisan ini.

Jadi jika Anda sedang mengerjakan pembacaan privat, jaringan, implementasi PIR, akselerasi GPU, struktur data, UBT, infrastruktur, atau validator, saya ingin sekali mengobrol dengan Anda setelah ini. Terima kasih banyak. Ethereum adalah untuk privasi.