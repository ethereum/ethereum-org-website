---
title: "Dompet hebat berikutnya akan bersifat privat"
description: "Dompet Anda melihat setiap alamat yang Anda miliki, setiap aplikasi terdesentralisasi (dapp) yang Anda hubungkan, dan setiap permintaan yang Anda buat. Posisi yang sama memungkinkannya untuk melindungi semua itu. Pandangan praktis tentang alat privasi, pengaturan bawaan, dan ide-ide yang belum dirilis yang akan mendefinisikan generasi dompet Ethereum berikutnya."
author: "Elliott Alexander"
team: ""
tags:
  - "privasi"
  - "dompet"
  - "bukti zero-knowledge"
published: 2026-07-02
image: /images/developers/blog/latest-post-header-1.png
breadcrumb: "Dompet hebat berikutnya"
lang: id
---

Ambil cuplikan dua menit yang Anda habiskan di dompet Anda. Anda membuka aplikasi, melihat sekilas saldo Anda, terhubung ke aplikasi terdesentralisasi (dapp) yang ingin Anda coba, menyetujui transaksi yang ditampilkan di depan Anda, dan mengirimkan ETH kepada teman untuk membayar utang makan siang Anda.

Tidak ada yang terasa seperti sedang diamati. Tidak ada yang menanyakan nama Anda. Anda menutup aplikasi dan melanjutkan hari Anda.

Sekarang mari kita hitung apa yang sebenarnya bocor. Saat diluncurkan, sebelum Anda melakukan apa pun, setumpuk layanan analitik mengetahui alamat IP Anda dan bahwa Anda menggunakan dompet ini. Server tempat dompet Anda membaca rantai melihat setiap alamat yang Anda miliki, ditarik dari satu IP—seluruh portofolio Anda, dikelompokkan dengan rapi untuk siapa pun yang menyimpan log. Dapp tersebut mendapatkan alamat aktif Anda, yang merupakan satu-satunya hal yang dibutuhkan siapa pun untuk mencari seluruh riwayatnya. Dan pembayaran kepada teman Anda adalah catatan publik permanen yang menghubungkan dompet Anda dengan dompet mereka.

Setiap kebocoran tersebut melewati perangkat lunak yang sama. Dompet memuat analitik, memilih server tersebut, menyerahkan alamat, dan membangun transaksi. Namun, posisi yang sama berlaku dua arah: lapisan yang melihat segalanya juga merupakan lapisan yang dapat melindungi segalanya.

Banyak dompet memiliki model bisnis yang didasarkan pada pengumpulan informasi ini, tetapi ada cara untuk melakukannya tanpa membahayakan pengguna. Beberapa hal yang diperlukan sudah tersedia, berfungsi, dan diabaikan. Beberapa di antaranya belum ada yang memecahkannya. Kedua bagian tersebut adalah peluang, dan siapa pun yang mengambilnya sedang membangun dompet hebat berikutnya.

## Apa yang dompet Anda berikan secara onchain {#what-your-wallet-gives-away-onchain}

Mulai secara onchain, dengan apa yang bersifat publik tidak peduli dompet mana yang Anda gunakan. Sebuah alamat tidak membawa nama, dan satu fakta itu sangat menenangkan. Namun, setiap pembayaran yang Anda terima, setiap kontrak yang Anda sentuh, jumlah saldo Anda saat ini, dan daftar lengkap semua orang yang pernah bertransaksi dengan Anda berada di tempat terbuka, bebas untuk ditanyakan oleh siapa pun. Nama samaran (pseudonimitas) hanya berarti data tersebut disimpan di bawah nama pengganti, bukan nama Anda.

Pertahanan standarnya adalah menyebarkan aktivitas Anda ke beberapa alamat, dan sebagian besar pengguna berpengalaman melakukannya. Hal ini tidak banyak membantu seperti kelihatannya. Danai dua alamat dari sumber yang sama, atau biarkan keduanya saling membayar sekali, dan bagi siapa pun yang menjalankan analisis klaster, keduanya akan runtuh menjadi satu entitas.

Pada tahun 2020, [sebuah studi](https://fc20.ifca.ai/preproceedings/31.pdf) tentang empat tahun pertama Ethereum sudah dapat mengklasterkan 17,9% dari semua akun milik eksternal yang aktif, memunculkan lebih dari 340.000 entitas yang mengendalikan beberapa alamat. Itu terjadi enam tahun dan satu ledakan AI yang lalu. Pemisahan hati-hati Anda hanya berjarak beberapa langkah dari kehancuran.

Cepat atau lambat, klaster tersebut akan terikat pada orang sungguhan. Daftarkan nama ENS yang mencerminkan nama pengguna media sosial Anda, lakukan penarikan sekali dari bursa yang menyimpan pindaian paspor Anda, atau dapatkan bayaran dari seseorang yang menyimpan alamat berlabel di spreadsheet, dan klaster tersebut tidak lagi abstrak.

Pelanggaran data juga berperan—email yang bocor bersama dengan alamat rumah, dicocokkan dengan nama ENS yang terlihat seperti email tersebut. Semua ini tidak lagi memerlukan panggilan pengadilan atau spesialis. AI telah mengubah penyaringan jutaan catatan untuk satu kecocokan yang baik menjadi pekerjaan yang berjalan semalaman, dan biayanya terus menurun.

## Apa yang dompet Anda berikan sebelum Anda bertransaksi {#what-your-wallet-gives-away-before-you-transact}

Jejak onchain setidaknya mengharuskan Anda untuk bertransaksi. Jejak offchain dimulai lebih awal. Pada awal tahun 2026, seorang peneliti [memasukkan tiga belas dompet populer melalui pelacak paket (packet sniffer)](https://www.theopensourcepress.com/crypto-wallet-ip-exposure-scorecard-2026/) pada perangkat yang bersih dan merekam apa yang dilakukan masing-masing dompet pada peluncuran pertama, sebelum ada akun yang dibuat. Rata-rata dompet menghubungi sekitar empat belas domain. Yang terburuk menghubungi 26 domain di 41 alamat IP, termasuk panggilan infrastruktur saldo ke tiga penyedia terpisah, untuk pengguna yang belum membuat dompet. Dompet lain dalam pengujian tersebut menyertakan layanan sidik jari perangkat bersama dengan delapan subdomain atribusi pemasaran.

Semua itu adalah andalan aplikasi konsumen biasa—analitik, pelaporan kerusakan, atribusi pemasaran—tetapi ini bukan Candy Crush, ini adalah aplikasi yang nilai jualnya adalah kedaulatan diri. Pengujian yang sama menemukan [satu dompet](https://cakewallet.com/) yang tidak mengirimkan apa pun pada peluncuran pertama: nol paket, nol permintaan DNS. Tidak ada hal tentang dompet yang memerlukan obrolan tersebut.

Lalu ada kebocoran yang tidak pernah tertutup. Dompet Anda tidak menyimpan salinan rantai; setiap kali ia membaca saldo atau mengirim transaksi, ia bertanya kepada server yang disebut penyedia RPC (Remote Procedure Call). Kecuali Anda menjalankan node Anda sendiri, setiap permintaan melewati salah satu dari ini, dan penyedia bawaan melihat daftar alamat lengkap Anda, IP Anda, dan waktu dari semua yang Anda lakukan. Mencocokkan IP tersebut dengan nama pelanggan adalah permintaan catatan rutin bagi pemerintah.

Ketika penyedia bawaan MetaMask [mengakui pada tahun 2022](https://www.coindesk.com/business/2022/12/06/consensys-to-update-metamask-crypto-wallet-in-response-to-privacy-backlash) bahwa mereka mencatat IP bersama dengan alamat dompet, reaksi keras mendorongnya untuk [memotong retensi menjadi tujuh hari](https://consensys.io/blog/consensys-data-retention-update). Patut diapresiasi, tetapi perbaikan itu adalah sebuah kebijakan, dan arsitektur di bawahnya tidak berubah: satu server masih menerima setiap permintaan yang Anda buat. Dan log seperti itu tidak perlu diminta untuk menimbulkan kerusakan; ia hanya perlu ada. Basis data dibobol, dijual, dan diam-diam digabungkan dengan yang lain, dan log yang tidak berarti apa-apa dengan sendirinya dapat dihubungkan dengan Anda bertahun-tahun setelah ditulis.

Hal yang perlu diperhatikan tentang seluruh lapisan ini adalah bahwa pengguna tidak pernah melihatnya. Mengirim uang setidaknya menampilkan layar konfirmasi di depan Anda; metadata tidak memiliki layar. Tidak ada yang menyetujui daftar alamat mereka bepergian dengan IP mereka, dan tidak ada permintaan penandatanganan yang mencakup analitik.

Pengaturan bawaan ini berasal dari pedoman aplikasi konsumen standar—infrastruktur yang solid, laporan kerusakan yang berguna, metrik pertumbuhan—yang diterapkan tanpa banyak pemikiran pada aplikasi yang menyimpan uang orang. Yang mana ini adalah bagian yang menggembirakan: setiap kebocoran yang disebutkan di bagian ini dapat ditelusuri kembali ke keputusan yang dapat dibuat oleh pembangun dompet.

## Siapa yang melihat {#whos-looking}

Mulai dengan pengamat yang paling tidak Anda inginkan. Penjahat telah menyadari bahwa buku besar publik berfungsi ganda sebagai katalog orang-orang yang tabungannya dapat diambil secara paksa. Serangan kunci inggris (wrench attacks)—perampokan di mana kunci diekstraksi melalui kekerasan atau ancamannya—[melonjak 75% pada tahun 2025](https://www.coindesk.com/markets/2026/02/02/crypto-crime-is-getting-violent-wrench-attacks-jumped-75-in-2026), dan korban kehilangan sekitar [$101 juta dalam empat bulan pertama tahun 2026](https://cointelegraph.com/news/europe-crypto-wrench-attacks-losses-101m-certik-report) saja. Dan polanya telah bergeser ke arah apa yang disebut penyelidik sebagai penargetan berbasis data, di mana penyerang membuat profil kepemilikan korban secara onchain sebelum mereka mengetuk pintu. Dalam lebih dari separuh insiden baru-baru ini, mereka menjangkau pasangan, anak, atau orang tua sebagai alat tawar-menawar. Saldo dompet yang dapat ditelusuri kembali ke pintu depan Anda adalah undangan terbuka bagi para penjahat.

Lalu ada pengamat dengan lencana. Buku besar yang transparan adalah sistem pengawasan yang tidak perlu dibangun oleh pemerintah: catatan lengkap tentang siapa yang membayar siapa, kapan, dan berapa banyak, berada di ruang publik, hanya berjarak satu kueri tanpa panggilan pengadilan. Seberapa besar hal itu seharusnya mengkhawatirkan Anda bergantung pada siapa yang memerintah Anda, dan bagi jutaan orang, jawabannya adalah pemerintah yang menghukum sumbangan ke partai oposisi, langganan VPN, atau tabungan yang disimpan dalam mata uang yang tidak dapat dicetak oleh negara.

Bagi para pengguna tersebut, eksposur finansial adalah model ancamannya, dan pengaturan bawaan dompet menentukan seberapa tereksposnya mereka.

Kedua jenis pengamat mendapatkan peningkatan yang sama. AI membuat pengawasan menjadi lebih murah setiap tahun, dan segala sesuatu yang pernah ditulis ke rantai akan tetap tertulis, tersedia untuk teknik analisis baru apa pun yang muncul berikutnya. Semua ini bukanlah dakwaan terhadap buku besar publik; transparansi adalah hal yang memungkinkan siapa pun memverifikasi rantai. Eksposur tersebut hidup dalam jejak yang menghubungkan catatan itu dengan Anda—pola pendanaan, alamat yang digunakan kembali, log server.

Dompet telah membiarkan jejak itu tetap ada sejauh ini karena membiarkannya adalah jalan yang paling mudah, baik untuk perangkat lunak maupun untuk pengguna. Ini juga merupakan hal yang tepat di mana dompet diposisikan untuk menghilangkannya.

## Mengapa dompet adalah tempat privasi diperbaiki {#why-the-wallet-is-where-privacy-gets-fixed}

Wajar untuk bertanya mengapa semua ini adalah tugas dompet. Ada [eksplorasi aktif menuju privasi](https://ethresear.ch/t/ethereum-privacy-the-road-to-self-sovereignty/22115) di lapisan dasar Ethereum, dan protokol pada akhirnya mungkin akan menanggung sebagian dari beban ini. Namun, rantai ditingkatkan melalui percabangan keras (hard fork), paling banyak dua kali setahun, dan perubahan yang relevan dengan privasi akan tersebar di beberapa di antaranya. Itu adalah garis waktu yang diukur dalam hitungan tahun dan diputuskan oleh proses yang tidak boleh terburu-buru.

Sementara itu, individu saat ini sedang memutuskan apakah aman untuk dibayar secara onchain, untuk menyumbang, untuk menyimpan tabungan di sana. Mereka membutuhkan privasi yang tiba lebih cepat daripada yang dapat diberikan oleh proses konsensus sosial Ethereum dan jadwal percabangan.

Lapisan aplikasi adalah bentuk yang salah untuk masalah ini. Bahkan jika setiap dapp merilis fitur privasinya sendiri, masing-masing hanya dapat melindungi aktivitas di dalam dindingnya sendiri, dengan caranya sendiri, dengan keunikan dan rahasianya sendiri untuk dikelola oleh pengguna. Apa yang mengekspos Anda adalah koneksi yang berjalan di semua aplikasi tersebut—alamat yang dibagikan, jejak pendanaan, tautan kembali ke Anda—dan koneksi tersebut hidup di ruang antar aplikasi. Memecahkan privasi aplikasi demi aplikasi berarti memecahkannya di mana-mana kecuali di tempat masalah itu sebenarnya berada. Dapp bukanlah tempat di mana solusi nyata dapat hidup.

Itu menyisakan dompet. Ini adalah satu-satunya perangkat lunak yang melihat setiap dapp yang Anda hubungkan, setiap alamat yang Anda kendalikan, dan setiap permintaan yang Anda buat. Visibilitas yang sama yang membuat dompet yang bocor begitu merugikan adalah apa yang memungkinkan dompet yang berhati-hati mengoordinasikan privasi di semua hal yang Anda lakukan: memilih alamat mana yang berhadapan dengan aplikasi mana, merutekan pembacaan sehingga tidak ada satu server pun yang mendapatkan gambaran keseluruhan, melakukan pembukuan yang dituntut oleh protokol privasi.

Dan protokol-protokol tersebut lebih jauh dari yang diasumsikan oleh sebagian besar pembangun. [Railgun](https://railgun.org/) telah memproses lebih dari [$5 miliar dalam volume kumulatif](https://dune.com/railgun_project/railgun) dan menyimpan sekitar [$80 juta hari ini](https://defillama.com/protocol/railgun), perkakas alamat siluman (stealth-address) seperti [Umbra](https://www.techflowpost.com/en-US/article/30477) telah menghasilkan puluhan ribu alamat sekali pakai, dan menurut [satu perhitungan](https://wublock.substack.com/p/ethereum-privacys-https-moment-from) lebih dari 35 tim sedang mengejar lebih dari selusin pendekatan berbeda untuk transfer privat.

Belum ada satu pun dari ini yang menjadi arus utama, dan beberapa bagian memang masih hilang. Namun protokolnya berfungsi, uang sungguhan bergerak melaluinya, dan apa yang kurang dari mereka adalah tempat di alur utama pengguna. Di situlah dompet yang berpikiran maju mengambil peran.

## Apa yang sebenarnya dilakukan oleh dompet yang menjaga privasi {#what-a-privacy-preserving-wallet-actually-does}

Singkirkan jargonnya dan sebagian besar pekerjaan privasi adalah pembukuan. Gunakan alamat baru di sini, rutekan deposit melalui sana, jaga catatan ini, tunggu sebelum melakukan penarikan, jangan pernah biarkan kedua akun itu bersentuhan. Ini adalah disiplin yang buruk dilakukan oleh manusia dan perangkat lunak dibangun untuk itu, dan saat ini hal tersebut hampir sepenuhnya berada di tangan pengguna.

Dompet yang menjaga privasi adalah dompet yang melakukan pembukuan itu sendiri alih-alih membebankannya pada pengguna. Pengguna memutuskan apa yang harus dilakukan; dompet memastikan bahwa melakukannya tidak meninggalkan jejak kembali ke mereka.

Mulai dengan apa yang sudah aktif. Kumpulan terlindung (shielded pools) berfungsi hari ini: Railgun menyimpan saldo privat di samping saldo publik Anda, dan setelah dana berada di dalam, pembayaran keluar tidak mengungkapkan apa pun tentang kepemilikan Anda yang lain. Biayanya nyata—biaya yang lebih tinggi daripada transfer biasa, pembuatan bukti yang diukur dalam hitungan detik, beberapa ketergantungan pada relayer—tetapi protokol tersebut telah membawa miliaran dalam volume bahkan dengan pengorbanan tersebut.

Padukan itu dengan kebiasaan yang tidak memerlukan protokol: alamat baru untuk setiap pihak lawan. Ketika pengguna terhubung ke dapp baru, dompet dapat menawarkan alamat khusus untuk itu, didanai dari saldo yang terlindung, sehingga aplikasi melihat akun tanpa riwayat dan tanpa saudara. Alamat siluman ([ERC-5564](https://eips.ethereum.org/EIPS/eip-5564)) memperluas langkah yang sama untuk menerima pembayaran. Pencampur (mixer) seperti [Tornado Cash](https://tornadocash.eth.limo/) dan [Privacy Pools](https://privacypools.com/) melakukan pekerjaan yang lebih sederhana dan lebih sempit: dana masuk dari satu alamat dan keluar ke alamat lain, dengan tautan di antara keduanya terputus. Itu adalah alat untuk mendanai alamat baru yang tidak dapat dilacak oleh siapa pun ke Anda—dan bagian yang hilang adalah dompet yang menghasilkan alamat semacam itu sesuai permintaan alih-alih menyerahkan ritual tersebut kepada pengguna. Tidak ada satu pun dari ini yang menunggu percabangan keras (hard fork) atau hibah penelitian. Ini menunggu dompet yang bersedia melakukan pembukuan atas nama pengguna.

Sisi jaringan sebagian besar adalah keputusan. Merilis dengan nol analitik pihak ketiga adalah sebuah pilihan, dan setidaknya satu dompet di pasar telah melakukannya. Pada eksposur RPC, sebagian besar dompet sudah memungkinkan Anda untuk menukar penyedia, sehingga opsionalitas itu ada, terselip di halaman pengaturan yang dikunjungi oleh pengguna mahir dan tidak pernah ditemukan oleh orang lain.

Langkah yang belum dirilis adalah pemisahan: tetapkan penyedia yang berbeda ke alamat yang berbeda sehingga tidak ada satu server pun yang pernah melihat daftar lengkapnya, dan letakkan proksi di antara dompet dan penyedia sehingga IP dan alamat tidak pernah bepergian bersama. Klien ringan seperti [Helios](https://github.com/a16z/helios) atau [Colibri](https://github.com/corpus-core/colibri-stateless) memungkinkan dompet memverifikasi jawaban yang didapatnya alih-alih menerimanya begitu saja. Masing-masing dari ini membutuhkan biaya dalam hal infrastruktur, latensi, atau waktu rekayasa, tetapi tidak satu pun dari mereka memerlukan kriptografi baru.

Lalu ada garis depan. Membaca saldo Anda hari ini berarti mengungkapkan kumpulan alamat Anda kepada siapa pun yang melayani kueri, dan pekerjaan untuk memperbaikinya sedang terjadi saat ini: Lingkungan Eksekusi Tepercaya (Trusted Execution Environments) yang dipasangkan dengan Oblivious RAM, pengambilan informasi privat, dan klien ringan yang menjangkau pembacaan yang sepenuhnya privat. Belum ada satu pun yang cukup mapan untuk disalin dari implementasi referensi, yang mana hal inilah yang membuatnya menjadi wilayah yang layak untuk diklaim.

Sisi penulisan memiliki bentuk yang sama: siaran peer-to-peer dan mixnet akan mencegah transaksi membawa IP Anda ke server. Dompet yang mendaratkan bagian-bagian ini terlebih dahulu adalah dompet yang akan menjadi tolok ukur bagi yang lain di bidang ini.

Inilah standarnya, dan perhatikan bahwa ini adalah standar pengalaman pengguna daripada standar kriptografi baru. Ambil bagian yang membuka artikel ini—luncurkan, hubungkan, setujui, bayar—dan pertahankan agar tetap dapat dikenali sebagai sesi tersebut. Akan ada pengorbanan; sebuah bukti membutuhkan waktu beberapa detik untuk dibuat, transfer yang terlindung membutuhkan biaya lebih besar, dan satu atau dua konsep baru mungkin memerlukan nama di antarmuka.

Seberapa kecil perbedaan tersebut terasa adalah seni dari integrasi, dan itu akan memisahkan dompet yang melakukannya dengan benar dari dompet yang secara teknis menawarkannya tetapi dengan cara yang menyulitkan hidup pengguna. Apa yang harus berubah sepenuhnya: tidak ada analitik yang berjalan saat peluncuran, setiap dapp baru bertemu dengan alamat tanpa riwayat, dan pembayaran kepada teman tidak mengungkapkan apa pun tentang akun di baliknya.

Privasi yang meminta pengguna untuk menjadi orang yang berbeda tidak akan pernah menyebar. Ketika itu tiba di dalam pengalaman yang sudah dipahami pengguna, itu hanyalah dompet yang lebih baik.

## Ide-ide yang layak dicuri {#ideas-worth-stealing}

Melewati dasar-dasarnya, terdapat lapisan fitur yang, sejauh yang saya tahu, belum ada yang merilisnya. Hanya beberapa ide tetapi masing-masing adalah jenis hal yang dapat membuat satu dompet menjadi pilihan yang jelas.

Mulai dengan waktu. Kumpulan anonimitas membutuhkan waktu untuk tumbuh di antara langkah-langkah, dan stempel waktu Anda diam-diam mengungkapkan lebih dari yang Anda kira—kapan Anda bangun, zona waktu apa yang Anda gunakan, hari apa Anda bertransaksi. Sebuah dompet dapat mengantrekan apa pun yang tidak mendesak dan menjalankannya pada jam-jam ganjil: deposit pelindung diselesaikan semalaman, dana siap pada pagi hari, dan tidak ada ritme kehidupan Anda yang pernah terbentuk secara onchain.

Lalu tombol mudah. Pengguna yang muncul hari ini sepenuhnya terekspos—satu frasa benih yang sering digunakan, dengan riwayat bertahun-tahun di belakangnya. Biarkan mereka memasukkannya, dan dompet menyusun rencana migrasi untuk mereka setujui—sekian banyak ke Railgun, sekian banyak ke Privacy Pools, sesuaikan pembagiannya sesuka Anda. Nanti, kapan pun dana dibutuhkan di tempat terbuka, dana tersebut muncul dalam keadaan siap dan tidak terekspos: alamat baru, jam ganjil, jumlah yang tidak mencerminkan apa yang masuk. Dan sering kali tidak diperlukan jalan keluar. Di dalam ekosistem Railgun, pengguna dapat melakukan transfer dan berdagang tanpa pernah muncul ke permukaan, selain itu juga menghemat biaya keluar. Pengguna yang merupakan buku terbuka pada hari Senin menjadi tidak dapat dibaca pada hari Jumat, dan yang mereka lakukan hanyalah menyetujui sebuah rencana.

Sebuah dompet juga dapat melakukan linting untuk privasi. Heuristik klastering di paruh pertama artikel ini bersifat publik, jadi arahkan ke transaksi tertunda milik pengguna sendiri dan peringatkan sebelum tanda tangan: pembayaran ini akan menghubungkan kedua akun ini, penarikan ini cocok dengan deposit Anda hingga ke sen terakhir. Dompet sudah menyimulasikan transaksi untuk menangkap dana yang terkuras. Menyimulasikan apa yang dipelajari oleh pengamat adalah langkah yang sama yang ditujukan pada risiko yang berbeda.

Dan tunjukkan kepada orang-orang apa yang sudah dilihat oleh pengamat. Dasbor yang menjalankan analisis klaster di seluruh akun pengguna sendiri mengubah ancaman abstrak menjadi sesuatu yang dirasa perlu ditindaklanjuti oleh pengguna: kelima alamat ini adalah satu entitas bagi pengamat, akun ini bersih, nama ENS ini menghubungkan keduanya. Ini juga memberikan fitur tombol mudah yang disebutkan di atas kondisi sebelum dan sesudahnya.

### Langkah-langkah tindakan {#action-steps}

### Untuk pembangun {#for-builders}

Setiap bagian dari artikel ini berakhir di tempat yang sama: sebuah pilihan yang dapat dibuat oleh dompet.

Cara untuk membuat pilihan tersebut adalah pengaturan bawaan yang masuk akal yang dapat diganti oleh pengguna, setiap dari mereka. Jadikan jalur privat sebagai bawaan, karena pengaturan bawaan adalah apa yang akan dijalani oleh sebagian besar pengguna. Namun biarkan tetap terbuka untuk opsionalitas yang dipimpin pengguna, karena pengguna yang tidak dapat mengarahkan dompet mereka ke server RPC yang berbeda, atau node mereka sendiri, belum benar-benar diberikan kedaulatan.

Anda tidak perlu memulai dari nol. [Kohaku SDK](https://github.com/ethereum/kohaku) mengemas beberapa primitif dalam artikel ini—saldo terlindung, pencampur, klien ringan—sehingga dompet dapat mengadopsinya tanpa membangun kembali setiap protokol dari awal. Bagian-bagiannya sudah tersedia. Beberapa hal menjadi penting jauh sebelum ada yang memintanya. Tidak ada yang melihat massa membuat petisi untuk enkripsi ujung-ke-ujung (end-to-end encryption) juga; itu dirilis sebagai bawaan, miliaran orang mendapatkannya tanpa menyadari atau peduli, dan sekarang aplikasi pesan tanpanya terasa rusak dan melanggar.

Uang yang tidak dapat digunakan untuk menemukan Anda, membuat profil Anda, atau menargetkan Anda termasuk dalam kategori yang sama. Dompet yang memperlakukannya seperti itu akan menjadi dompet hebat berikutnya.

### Untuk pengguna {#for-users}

Dompet yang Anda gunakan adalah dompet yang Anda promosikan sebagai norma. Pilih dompet yang menganggap serius privasi dan keamanan Anda. Ini mungkin berarti mengorbankan antarmuka yang paling mulus demi antarmuka yang paling aman dan paling privat. Saat ini hal tersebut mungkin berarti mengikuti perkembangan terbaru di [Walletbeat](https://www.walletbeat.fyi/), melihat dompet mana yang melakukan pergeseran ke arah pengaktifan privasi pengguna, dan meluangkan waktu untuk mencobanya.

## Untuk eksplorasi lebih lanjut {#for-further-exploration}

- [Kartu skor privasi dompet](https://www.theopensourcepress.com/crypto-wallet-ip-exposure-scorecard-2026/) - Eksposur jaringan peluncuran pertama dari 13 dompet
- [ERC-5564: Alamat Siluman (Stealth Addresses)](https://eips.ethereum.org/EIPS/eip-5564)
- [Railgun](https://railgun.org/), [Privacy Pools](https://privacypools.com/), dan [Tornado Cash](https://tornadocash.eth.limo/)
- Klien ringan [Helios](https://github.com/a16z/helios) dan [Colibri](https://github.com/corpus-core/colibri-stateless)
- [Kohaku](https://github.com/ethereum/kohaku) - SDK Privasi untuk pembangun dompet
- [Walletbeat](https://www.walletbeat.fyi/) - Bagaimana dompet yang ada saat ini diukur