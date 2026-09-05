---
title: "EIP-7805: Daftar inklusi yang dipaksakan oleh pilihan percabangan (FOCIL)"
description: "Peneliti Ethereum Thomas Thiery dan Julian Ma membahas EIP-7805 (FOCIL), yang menggunakan daftar inklusi lokal teragregasi untuk menjamin bahwa transaksi yang valid tidak dapat disensor oleh pembangun blok."
lang: id
youtubeId: "cUGyLx-mf6I"
uploadDate: 2025-02-12
duration: "1:00:30"
educationLevel: advanced
topic:
  - "privacy"
  - "network-upgrades"
  - "roadmap-and-priorities"
format: presentation
author: ECH Institute
breadcrumb: "EIP-7805 (FOCIL)"
---

Episode 141 dari **PEEPanEIP** oleh Ethereum Cat Herders. Tuan rumah Pooja Ranjan bergabung dengan **Thomas Thiery** dan **Julian Ma**, peneliti di Robust Incentives Group di Yayasan Ethereum dan rekan penulis [EIP-7805](https://eips.ethereum.org/EIPS/eip-7805), untuk menjelaskan Daftar Inklusi yang dipaksakan oleh Pilihan Percabangan (FOCIL): mengapa Ethereum membutuhkan ketahanan sensor tingkat protokol, bagaimana mekanismenya bekerja, dan sejauh mana status implementasinya.

*Transkrip ini adalah salinan yang dapat diakses dari [transkrip video asli](https://www.youtube.com/watch?v=cUGyLx-mf6I) yang dipublikasikan oleh Ethereum Cat Herders. Transkrip ini telah diedit sedikit agar lebih mudah dibaca.*

### Pengantar (0:35) {#introduction-035}

**Pooja Ranjan:** Halo dan selamat datang di PEEPanEIP, satu-satunya acara di mana kita membahas secara mendalam tentang Ethereum Improvement Proposals dan mengeksplorasi dampaknya pada ekosistem. Ini adalah episode 141, dipersembahkan oleh Ethereum Cat Herders. Saya pembawa acara Anda, Pooja Ranjan, dan hari ini kita akan membahas tentang EIP-7805, Fork-choice enforced Inclusion Lists.

Didokumentasikan pada bulan November 2024, EIP-7805 adalah proposal inti jalur standar yang saat ini berstatus draf. Proposal ini bertujuan untuk memungkinkan sebuah komite validator untuk memasukkan secara paksa sekumpulan transaksi di setiap blok. Ditulis bersama oleh Thomas Thiery, Francesco D'Amato, Julian Ma, Barnabé Monnot, Terence Tsao, Jacob Kaufmann, dan Jihoon Song, proposal ini sedang dalam diskusi aktif untuk peningkatan di masa mendatang.

Dalam episode ini, kita akan mengeksplorasi detail dari EIP-7805, implikasinya, dan potensi dampaknya pada ekosistem Ethereum. Untuk berbicara lebih banyak tentang proposal ini, kita telah bergabung bersama Thomas Thiery dan Julian Ma. Selamat datang di PEEPanEIP.

**Thomas Thiery:** Terima kasih telah mengundang kami.

**Julian Ma:** Ya, terima kasih banyak telah mengundang kami.

**Pooja Ranjan:** Kami sangat antusias untuk mempelajari gambaran umum dari proposal ini, statusnya saat ini, dan seberapa cepat kita dapat melihatnya di Mainnet Ethereum. Namun sebelum kita mulai, komunitas kami senang mengenal para peneliti dan pengembang di balik karya tersebut. Bisakah Anda berbagi sedikit tentang diri Anda, proyek yang sedang Anda ikuti saat ini, dan perjalanan Anda di dalam ekosistem Ethereum?

### Perkenalan tamu (2:14) {#guest-introductions-214}

**Julian Ma:** Tentu, saya bisa memulainya. Saya Julian, seorang peneliti di Robust Incentives Group, sama seperti Thomas, di Yayasan Ethereum. Robust Incentives Group berkaitan dengan ekonomi protokol secara sangat luas. Beberapa dari kami telah meneliti mekanisme biaya transaksi, seperti EIP-1559, dan yang lainnya telah meneliti serangan lapisan konsensus, sebagian besar yang dimotivasi oleh insentif ekonomi.

Bagi saya, saya memulai dengan magang yang meneliti derivatif biaya dasar, dan setelah itu saya bergabung secara penuh waktu. Saya sebagian besar telah mengerjakan pemisahan pengusul-pembangun (PBS) dan topik-topik terkait MEV, dan sekarang saya berfokus pada daftar inklusi melalui FOCIL dengan EIP ini, dan menantikan pemisahan pengesah-pengusul. Saya bisa katakan bahwa saya paling bersemangat untuk membawa penelitian ke tahap produksi melalui alur ini, mulai dari pekerjaan yang lebih teoretis dan membawanya menuju EIP yang diharapkan dapat diusulkan dan diimplementasikan di dalam Ethereum.

**Thomas Thiery:** Saya Thomas. Saya juga bekerja di Yayasan Ethereum di Robust Incentives Group, melakukan penelitian. Latar belakang saya sebenarnya adalah PhD di bidang ilmu saraf, yang mana sangat berbeda. Namun saya menjadi penasaran dengan rantai blok dan sistem terdistribusi, ingin mencoba sesuatu yang sedikit berbeda, dan bergabung dengan perusahaan data kripto bernama Dune. Saya menetap di sana untuk sementara waktu, tetapi kemudian saya rindu melakukan penelitian, dan saya cukup beruntung bisa bergabung dengan EF dan Robust Incentives Group, yang mana sangat luar biasa sejauh ini.

Saya telah mengerjakan topik-topik serupa. MEV cukup besar ketika saya bergabung. Menariknya, pos penelitian pertama saya sangat kecil, tetapi itu tentang penundaan inklusi dan ketahanan sensor. Saya tidak benar-benar mendalaminya sampai baru-baru ini. Selama enam bulan hingga satu tahun terakhir, saya menjadi lebih aktif di sisi ketahanan sensor dan inklusi. Sangat menyenangkan bisa memulai dengan ide-ide penelitian, menyempurnakan ide-ide sebelumnya yang sangat menarik tetapi tidak menyertakan beberapa detail yang akan kita bicarakan, menghasilkan sebuah proposal, dan sekarang memiliki implementasi dan devnet yang menurut sebagian besar orang yang saya ajak bicara akan menjadi tambahan yang bagus untuk Ethereum.

**Pooja Ranjan:** Terima kasih telah berbagi. Selalu menginspirasi untuk mengetahui latar belakang para pengembang. Sangat menarik melihat bahwa mereka berasal dari domain yang berbeda dan pada akhirnya berkontribusi pada ekosistem Ethereum. Saya mengerti kita memiliki presentasi di sini hari ini. Jadi tanpa basa-basi lagi, mari kita lihat.

### Presentasi: tujuan FOCIL (5:16) {#presentation-goals-of-focil-516}

**Julian Ma:** Sempurna, terima kasih banyak. Saya ingin memulai dengan presentasi singkat tentang bagaimana EIP-7805, atau FOCIL, bekerja dan mengapa tepatnya kita ingin melakukannya. Ini dimaksudkan untuk memulai percakapan, jadi tidak akan terlalu mendalam, untuk menyisakan ruang bagi diskusi setelahnya.

Tujuan utama FOCIL adalah untuk meningkatkan netralitas yang kredibel dari Ethereum. FOCIL melakukannya dengan menghapus monopoli inklusi yang saat ini dipegang oleh satu pengusul atau pembangun blok dalam sebuah slot. Sebaliknya, FOCIL memungkinkan beberapa validator untuk berkontribusi dalam membangun sebuah blok dengan menyertakan transaksi di setiap blok.

Tujuan tingkat yang lebih tinggi adalah untuk mengejar properti yang kita sebut netralitas rantai, yang berarti setiap transaksi tertunda yang membayar biaya harus disertakan jika tersedia dan jika ada ruang untuk menyertakannya secara onchain. Kami percaya bahwa jika properti ini cukup terpenuhi, maka kita meningkatkan netralitas yang kredibel dari Ethereum.

### Mengapa kita membutuhkan FOCIL, dan mengapa sekarang? (6:09) {#why-do-we-need-focil-and-why-now-609}

**Julian Ma:** Mengapa kita membutuhkan sesuatu seperti ini? Saat ini hampir semua validator mengalihdayakan konstruksi blok ke MEV-Boost, yang merupakan pasar di luar protokol tempat para pembangun menawar hak konstruksi blok. Di pasar ini hanya ada dua entitas yang benar-benar mendominasi, dan ini berarti 90% blok dibangun oleh hanya dua entitas.

Kita melihat di sini bahwa Ethereum tidak dapat lagi memperoleh netralitas kredibelnya dari pembangunan blok lokal. Dulu pernah bisa. Ini dimulai dengan memiliki pengusul yang berlokasi di seluruh dunia, masing-masing membangun blok mereka secara lokal, yang berarti bahwa semua transaksi disertakan. Namun sekarang karena pembangunan blok dialihdayakan ke entitas-entitas canggih ini, hal ini tidak lagi memadai. Jadi, perlu untuk menerapkan langkah-langkah anti-penyensoran yang lebih kuat, dan FOCIL adalah cara paling terkenal untuk melakukannya.

Mengapa kita harus menerapkan FOCIL sekarang? Anda mungkin berpikir bahwa para pembangun tidak banyak melakukan penyensoran sekarang, tetapi mereka bisa mulai menyensor kapan saja, baik karena alasan regulasi maupun alasan ekonomi. Dan penyensoran ekonomi jelas merupakan sesuatu yang tidak boleh disalahpahami. Juga baik untuk memperkenalkan FOCIL ketika penyensoran relatif sedikit, karena dengan begitu Anda memperkenalkannya sebagai dasar dan sebagai standar. Semua validator membuat daftar inklusi terlepas dari yurisdiksi atau insentif ekonomi mereka, dan hal ini menyebabkan sedikit ketidakstabilan pasar. Sedangkan jika Anda memperkenalkan FOCIL ketika semua pembangun melakukan penyensoran, mungkin akan lebih sulit.

Kemudian, based rollup menjadi lebih populer akhir-akhir ini, dan mereka akan membebani pembangunan blok Ethereum. Jika kita ingin menyediakan pengurutan yang dimiliki Ethereum, perlu ada netralitas yang kredibel di sini melalui FOCIL.

Dan berpotensi FOCIL dapat membantu penskalaan, tergantung pada siapa Anda bertanya. Saat ini Ethereum masih memperoleh ketahanan penyensorannya dari pembangunan blok lokal. Jika Ethereum dapat memperoleh ketahanan penyensoran dari tempat lain, misalnya melalui FOCIL, maka mungkin kita dapat meningkatkan ekspektasi yang kita miliki terhadap pembangun blok dan mengizinkan, misalnya, lebih banyak blob. Namun berpotensi hal ini juga dapat dilakukan tanpa FOCIL. Oleh karena itu, FOCIL telah diusulkan untuk diimplementasikan di Fusaka.

### Cara kerja FOCIL (8:10) {#how-focil-works-810}

**Julian Ma:** Sekarang saya akan memandu Anda tentang cara kerja FOCIL. Kita akan mulai dengan dasar-dasarnya dan membahasnya selangkah demi selangkah hingga kita mendapatkan mekanisme lengkapnya, lalu mengeksplorasi bagaimana mekanisme lengkap ini memenuhi properti yang kita inginkan.

Gagasan dasar dari daftar inklusi (inclusion list), yang juga telah diusulkan oleh Mike Neuder sebelumnya, adalah bahwa ada daftar transaksi yang membatasi blok dengan cara tertentu. Jadi, misalnya, ada daftar inklusi yang mencakup transaksi A dan B, daftar tersebut ditandatangani oleh seseorang yang dikenali oleh protokol, dan kemudian transaksi-transaksi ini harus disertakan dalam suatu blok. FOCIL tidak mengubah hal ini. FOCIL dibangun di atasnya, dan ini lebih berfokus pada siapa yang membuat daftar ini dan bagaimana daftar ini ditegakkan.

Jadi, siapa yang membuat daftar ini? Ini adalah langkah pertama dari cara kerja protokol FOCIL. Setiap slot, 16 validator dipilih sebagai anggota komite daftar inklusi. Masing-masing anggota komite ini mengamati mempool dan menyusun daftar inklusi mereka sendiri. Sebuah daftar inklusi harus berukuran sekitar 8 kilobyte, atau sekitar 20 transaksi rata-rata, yang berarti totalnya sekitar 320 transaksi rata-rata.

Langkah kedua adalah mendistribusikan daftar inklusi ini. Anggota komite daftar inklusi mendistribusikan daftar inklusi mereka melalui topik global, dan mereka tidak menyertakannya sendiri ke dalam sebuah blok. Mereka harus melakukannya sebelum detik ke-9 dari slot tersebut, di mana pada saat itu pemberi atestasi (attester) membekukan pandangan mereka terhadap daftar inklusi lokal. Seperti yang akan kita lihat pada langkah berikutnya, pemberi atestasi adalah pihak yang benar-benar menegakkan daftar inklusi ini, seperti namanya: daftar inklusi yang ditegakkan oleh pilihan percabangan (fork-choice enforced inclusion lists). Mereka membekukan pandangan mereka tentang daftar inklusi mana yang akan mereka tegakkan pada detik ke-9, dan ini mencegah serangan pandangan terbelah (split-view attacks). Penghasil blok masih memiliki beberapa detik tambahan untuk mengamati daftar inklusi dan memastikan bahwa ia tidak terkena dampak negatif karena melewatkan daftar inklusi apa pun, sehingga penghasil blok tidak memiliki risiko dalam pengaturan ini.

Kemudian kita menuju ke langkah terakhir, yaitu penegakan. Seperti yang saya katakan, penegakan dilakukan melalui pilihan percabangan. Pemberi atestasi hanya akan memberikan suara untuk sebuah blok jika blok tersebut memenuhi kondisi daftar inklusi. Mereka melakukannya dengan mengamati daftar inklusi yang dikirim pada topik global, membuat daftar gabungan dari transaksi yang telah mereka lihat dalam daftar inklusi ini, dan kemudian memeriksa apakah semua transaksi ini ada di dalam blok. Jika pemeriksaan ini berhasil, mereka memberikan suara untuk blok tersebut. Bisa juga terjadi bahwa tidak semua transaksi dari daftar inklusi ada di dalam blok, tetapi blok tersebut sudah penuh. Dalam hal ini, pemberi atestasi juga memberikan suara untuk blok tersebut. Jadi, kecuali jika blok tersebut tidak berisi transaksi dan tidak penuh, pemberi atestasi akan memberikan suara untuk blok tersebut.

Untuk merangkum mekanisme lengkapnya: di setiap slot, 16 anggota komite dipilih sebagai anggota komite daftar inklusi. Mereka mengamati mempool dan menyusun objek daftar inklusi yang mereka distribusikan melalui topik global sebelum tenggat waktu, dalam hal ini detik ke-9. Pembangun mengamati daftar inklusi ini dan menyertakan semua transaksi yang telah dilihatnya ke dalam bloknya. Pemberi atestasi kemudian memeriksa apakah semua transaksi yang telah mereka lihat sebelum detik ke-9 dalam daftar inklusi memang ada di dalam blok. Jika pemeriksaan ini berhasil, mereka memberikan suara untuk blok tersebut, dan kita beralih ke slot berikutnya, di mana pengaturan yang sama terjadi lagi.

### IL Boost dan uncrowdability (11:07) {#il-boost-and-uncrowdability-1107}

**Julian Ma:** Salah satu kekhawatiran besar tentang daftar inklusi, yang disuarakan untuk EIP sebelumnya dari Mike dan selama pengembangan setelahnya, adalah "IL Boost," atau uncrowdability. Hal ini merujuk pada fakta bahwa pengusul daftar inklusi mungkin ingin menjual hak mereka untuk membangun daftar inklusi. Ini adalah kekhawatiran yang sangat logis, karena kita melihat hal ini terjadi pada konstruksi blok: menjual hak ini mengarah pada pasar terpusat dari para pembangun yang canggih.

Kami berpendapat bahwa FOCIL tangguh terhadap pasar yang mirip MEV-Boost ini, atau yang biasa dikenal sebagai IL Boost, karena sifat-sifat berikut. FOCIL tidak menjamin urutan transaksi apa pun. Terlepas dari di mana Anda menempatkan transaksi Anda dalam daftar inklusi, transaksi tersebut akan diurutkan dengan cara apa pun yang dianggap sesuai oleh pembangun blok. Jika Anda, misalnya, memasukkan transaksi arbitrase ke dalam daftar, sangat kecil kemungkinannya pembangun akan menempatkan transaksi arbitrase Anda di bagian atas blok sehingga arbitrase tersebut benar-benar dieksekusi. Sebaliknya, pembangun mungkin akan melakukannya sendiri.

Selain itu, aliran pesanan privat (private order flow) tidak dimungkinkan. Daftar inklusi ini didistribusikan melalui topik global, sehingga transaksi Anda bersifat publik sebelum pembangun membangun blok. Tidak mungkin ada aliran pesanan privat yang masuk ke dalam blok melalui daftar inklusi.

Ketiga, ada beberapa pengusul daftar inklusi per slot. Bahkan jika ada sesuatu yang berharga untuk dijual, ke-16 anggota komite daftar inklusi memiliki kemungkinan yang sama untuk menyusun daftar inklusi ini, sehingga persaingan di antara para pengusul daftar inklusi tersebut akan mendorong nilainya turun menjadi nol.

Dan terakhir, daftar inklusi ini dibuat 3 detik sebelum produsen blok bertindak. Ada 3 detik informasi tambahan, yang biasanya sangat relevan untuk jenis transaksi MEV, yang tiba setelah daftar inklusi dikomit dan sebelum produsen blok bertindak, yang berarti hanya ada sedikit keuntungan informasi. Sebenarnya, ada kerugian informasi bagi mereka yang mencoba menggunakan daftar inklusi sebagai kendaraan untuk MEV.

Karena alasan-alasan ini, kami percaya bahwa tidak ada individu pengusul daftar inklusi yang memiliki kekuatan inklusi, pengurutan, atau eksklusi, yang merupakan definisi mendasar dari MEV. Oleh karena itu, daftar inklusi seharusnya tidak tunduk pada MEV.

### Ringkasan presentasi (13:09) {#summary-of-the-presentation-1309}

**Julian Ma:** Untuk meringkas presentasi singkat ini: FOCIL memungkinkan beberapa validator untuk berkontribusi pada konstruksi blok, mencegah monopoli inklusi dari satu pengusul dan meningkatkan netralitas Ethereum yang kredibel. Kami percaya bahwa FOCIL perlu diimplementasikan sekarang karena saat ini hanya ada dua pembangun dominan yang dapat mulai melakukan penyensoran kapan saja, dan ini bisa jadi karena alasan ekonomi yang mungkin menguntungkan mereka. Pembangunan blok bisa menanggung beban yang lebih berat karena based rollup akan ingin menggunakan properti pengurutan Ethereum. FOCIL akan diluncurkan dengan jauh lebih lancar ketika hanya ada sedikit pihak yang menyensor: pertama, karena ini berarti sudah menjadi bawaan bagi validator untuk membangun daftar inklusi, dan kedua, karena ini berarti ada lebih sedikit ketidakstabilan pasar antara pembangun yang menyensor dan pembangun yang tidak. Dan terakhir, FOCIL berpotensi membantu penskalaan, yang mungkin merupakan topik yang bisa kita bahas lebih dalam.

Terima kasih atas waktu yang diberikan untuk menyampaikan presentasi kecil ini. Saya hanya ingin menunjukkan kode QR, yang mengarah ke EIP, bagi orang-orang yang tertarik.

**Pooja Ranjan:** Terima kasih banyak atas presentasi singkat ini dan gambaran umum dari proposal tersebut.

### Tanya Jawab: apa perbedaan EIP-7805 dengan EIP-7547? (14:17) {#qa-how-does-eip-7805-differ-from-eip-7547-1417}

**Pooja Ranjan:** Saya ingin memulai sesi Tanya Jawab dengan pertanyaan pertama, tentang proposal sebelumnya yang juga disebutkan dalam presentasi Anda: proposal 7547, daftar inklusi (inclusion list), oleh Mike Neuder. Saya ingin memahami perbedaan mendasar antara proposal tersebut dan FOCIL yang kita miliki pada 7805. Anda sempat menyinggung sebagian dalam presentasi Anda mengenai IL Boost dan ketidakpadatan (uncrowdability). Apakah Anda mungkin ingin menjelaskannya sedikit lebih lanjut?

**Julian Ma:** Mungkin Thomas adalah orang yang paling tepat untuk menjawab bagaimana 7805 berbeda dari 7547, tetapi saya bisa menjelaskan sedikit tentang hal itu. Pertama-tama, FOCIL ditujukan untuk slot yang sama, sedangkan 7547 ditujukan untuk slot berikutnya. Sifat slot yang sama ini membuat beberapa hal menjadi lebih mudah, karena itu berarti daftar inklusi tidak perlu disimpan secara onchain.

Terkait dengan sifat ketidakpadatan (uncrowdability), ini adalah hal yang sangat menarik dan halus. Dalam 7547, yang merupakan proposal hebat yang menjadi dasar proposal kami, daftar inklusi ditambahkan tanpa syarat di bagian bawah blok dan dibuat oleh satu orang. Ini memiliki beberapa sifat yang berbeda dari milik kami. Pertama-tama, transaksi diurutkan. Bisa jadi di masa depan akan sangat berharga untuk memiliki arbitrase di bagian bawah blok, dan faktanya beberapa penelitian Thomas telah menyoroti bahwa ini berpotensi menjadi tempat yang berharga. Memiliki hak untuk membangun daftar inklusi berarti Anda adalah orang terakhir yang bertindak di dalam blok, dan untuk beberapa kasus ini mungkin berharga. Kedua, ini dibuat oleh satu orang saja, sehingga tidak ada efek persaingan di antara anggota komite daftar inklusi. Komite yang terdiri dari satu orang memiliki hak penuh untuk memasukkan transaksi di bagian bawah blok, yang mungkin membuatnya lebih berharga juga. Ketiga, ada sifat tanpa syarat ini, yang berarti terlepas dari apa yang dilakukan oleh produsen blok, transaksi Anda akan tetap dimasukkan secara onchain. Jadi, ini memiliki beberapa jaminan ekstra, di luar batas minimum yang diperlukan untuk inklusi, yang mungkin membuatnya berharga sampai batas tertentu.

**Thomas Thiery:** Perbedaan besar lainnya adalah jumlah pengusul daftar inklusi yang kita miliki. Pada proposal sebelumnya, ada mekanisme di mana pengusul slot n membuat daftar inklusi yang perlu ditegakkan oleh pengusul slot n+1. Dua hal besar di sini: pertama, ada penundaan satu slot, sehingga transaksi dalam daftar inklusi hanya perlu dimasukkan pada slot berikutnya oleh pengusul berikutnya. Dan hanya ada satu pengusul yang benar-benar membuat daftar inklusi. Dengan FOCIL kita memiliki 16. Ini membuat perbedaan besar, karena sekarang kita hanya membutuhkan satu dari 16 anggota komite IL untuk bersikap jujur agar seluruh mekanisme bekerja sebagaimana mestinya. Ini melipatgandakan peluang Anda untuk benar-benar memiliki mekanisme tahan sensor yang baik, sedangkan sebelumnya Anda bergantung pada satu pihak.

Dan kemudian beberapa detail teknis lainnya: ada beberapa ketidakcocokan dengan abstraksi akun, dan sulit untuk menangani ekivokasi IL, yang berarti seseorang yang mengirimkan dua daftar inklusi yang berbeda. Ekivokasi blok adalah hal yang sudah diketahui dan dihukum oleh protokol, tetapi karena semuanya berjalan onchain pada proposal sebelumnya, Anda juga harus berurusan dengan kasus-kasus ekstrem yang aneh, dan tidak mudah untuk mengakomodasinya. Dengan FOCIL, daftar inklusi tidak masuk secara onchain. Daftar tersebut hanya disiarkan melalui jaringan lapisan konsensus P2P. Ini sedikit teknis, tetapi ini membuat perbedaan besar dalam menangani kasus-kasus ekstrem yang disebabkan oleh abstraksi akun, atau serangan di mana Anda membagi jaringan menjadi dua pandangan dengan ekivokasi IL.

**Pooja Ranjan:** Terima kasih banyak. Bagi orang-orang yang ingin mempelajari lebih lanjut tentang proposal 7547, kami memiliki rekaman episode dengan Mike Neuder, episode 130 dari PEEPanEIP, yang memberikan gambaran umum tingkat tinggi. Saya selalu senang melihat proposal yang bersaing, karena saya tahu itu demi kebaikan ekosistem dan rantai. Saya melihat di obrolan ada beberapa pertanyaan. Mungkin saya ingin mengundang Kataya untuk membagikan pertanyaannya.

### Apakah pengusul harus memasukkan semua 16 daftar? (19:05) {#does-the-proposer-have-to-include-all-16-lists-1905}

**Kataya:** Halo, terima kasih. Pertanyaan saya adalah: apakah pengusul blok mendapatkan 16 daftar inklusi, masing-masing dari satu anggota komite, dan apakah ia harus memasukkan semua transaksi dari daftar-daftar ini?

**Thomas Thiery:** Ya, benar. Anda mengambil gabungan dari semua transaksi di semua daftar, dalam kasus kami 16 daftar. Jelas mungkin ada tumpang tindih, jadi Anda mengambil gabungannya dan menghapus duplikatnya, tetapi ya, semua transaksi di semua daftar perlu dimasukkan ke dalam blok agar dianggap valid oleh pengatestasi.

**Pooja Ranjan:** Pertanyaan selanjutnya di obrolan adalah dari Justin. Justin, apakah Anda ingin membacakan pertanyaan Anda untuk para tamu?

### Transaksi mempool privat dalam daftar inklusi (19:55) {#private-mempool-transactions-in-inclusion-lists-1955}

**Justin:** Saya sudah mengajukan begitu banyak pertanyaan. Saya ingin bertanya apa yang mencegah dimasukkannya transaksi dari mempool privat ke dalam daftar inklusi, dan saya rasa itu sudah dijawab dengan cukup jelas. Sepertinya itu sama sekali tidak masalah, mengingat pembangun pada dasarnya akan mengurutkannya sesuai keinginan mereka, dan transaksi Anda menjadi publik saat masuk ke IL (daftar inklusi) juga. Jadi saya rasa itu masuk akal. Terima kasih.

**Thomas Thiery:** Itu adalah salah satu pertimbangan, seperti yang disebutkan Julian. Kami benar-benar tidak ingin FOCIL dan daftar inklusi digunakan untuk menyertakan transaksi MEV, aliran pesanan privat, atau prakonfirmasi, karena pada akhirnya yang kami inginkan adalah ketahanan terhadap penyensoran, dan sangat mudah bagi sebuah mekanisme untuk menjadi sarana penyertaan transaksi bernilai jika Anda tidak berhati-hati. Fakta bahwa ketika Anda menyertakan transaksi Anda dalam daftar inklusi, transaksi tersebut secara otomatis menjadi publik, semua orang dapat melihatnya, tidak ada jaminan pengurutan, dan dapat disertakan oleh pembangun di mana saja dalam blok membuatnya tidak terlalu cocok untuk transaksi bernilai.

Jadi, entah Anda memiliki transaksi publik, dan Anda mungkin hanya mengirimkannya ke mempool publik agar disertakan dalam daftar inklusi, atau Anda memiliki transaksi privat yang bernilai, dan kemudian Anda tidak akan melalui FOCIL, karena ada cara yang lebih baik untuk melakukannya. Anda akan menghubungi pembangun secara langsung dan mengirimkannya melalui saluran privat.

**Pooja Ranjan:** Terima kasih telah berbagi. Saya melihat pertanyaan berikutnya adalah dari Ladislaus.

### FOCIL dan penskalaan (21:41) {#focil-and-scaling-2141}

**Ladislaus:** Hai teman-teman. Ini merujuk pada poin yang Anda kemukakan terkait FOCIL dan penskalaan. Saya telah melihat beberapa diskusi akhir-akhir ini, seperti yang kita semua lihat, tentang penskalaan Ethereum, dan seperti yang Anda sebutkan dengan tepat, ada hambatan dari beberapa pembangun di luar sana. Secara pribadi, saya suka menganggap FOCIL sebagai pemberdayaan kembali pembangunan lokal, dan saya melihatnya sebagai suatu keharusan untuk diabadikan dalam protokol sebelum kita meningkatkan persyaratan bandwidth, atau persyaratan node secara umum. Mungkin Anda bisa menguraikan bagaimana pendapat Anda tentang hal ini, dan juga potensi cara lain untuk melakukan penskalaan, mungkin tanpa FOCIL, seperti yang Anda sebutkan.

**Julian Ma:** Terima kasih atas pertanyaannya. Pertama-tama, alasan untuk penskalaan melalui FOCIL. Saat ini 90% validator mengalihdayakan konstruksi blok melalui MEV-Boost, dan entitas-entitas canggih ini jelas memiliki bandwidth yang lebih besar daripada persyaratan perangkat keras minimum. Mereka bisa, misalnya, menyertakan lebih banyak blob di dalam blok mereka tanpa menimbulkan masalah apa pun. Namun, hal yang menarik adalah bahwa Ethereum bergantung pada pembangunan blok lokal untuk netralitas yang kredibel, atau ketahanan sensor, karena kedua entitas canggih ini bukanlah pihak yang dapat dijadikan landasan bagi ketahanan sensor Ethereum.

Jadi protokol Ethereum harus tetap dirancang sedemikian rupa sehingga memungkinkan untuk melakukan pembangunan blok lokal, dan faktanya kami merancangnya agar tidak merugikan dibandingkan dengan MEV-Boost. Ini ada dalam desain Ethereum, tetapi pada praktiknya, tentu saja, MEV-Boost jauh lebih menguntungkan: pertama karena para pembangun blok canggih ini memiliki algoritma yang lebih kompleks, dan kedua karena mereka memiliki lebih banyak aliran pesanan privat. Ada beberapa penelitian oleh Data Always baru-baru ini yang menunjukkan bahwa blok MEV-Boost berisi jauh lebih banyak transaksi. Hal itu saja sudah menghasilkan lebih banyak keuntungan.

Meskipun demikian, protokol ini dirancang sedemikian rupa sehingga tidak ada paksaan dari dalam aturan protokol yang membuat satu validator menjadi kurang menguntungkan daripada yang lain. Jika kita ingin mempertahankan aturan tersebut, maka FOCIL diperlukan, karena dengan begitu pembangun blok lokal dapat berkontribusi pada daftar inklusi dan dengan demikian menegakkan ketahanan sensor. Namun, kita juga bisa menyingkirkan aturan ini dan pada dasarnya mengatakan bahwa pembangun blok lokal dapat menyertakan sejumlah blob tertentu, tetapi pembangun blok yang lebih canggih dapat menyertakan lebih banyak blob, sampai pada tingkat di mana pembangun blok lokal tidak akan mampu menangani beban tersebut saat membuat blok mereka sendiri. Jadi, jika kita ingin mempertahankan aturan bahwa batas maksimum ditetapkan pada persyaratan perangkat keras terendah, maka kita memerlukan FOCIL. Jika kita tidak keberatan untuk melonggarkan aturan tersebut, maka kemungkinan kita tidak memerlukan FOCIL untuk penskalaan.

**Thomas Thiery:** Saya rasa ini sangat mirip, tetapi saat ini di Ethereum kita berada dalam posisi yang aneh, karena kita bergantung pada pembangun canggih untuk membangun sebagian besar blok, tetapi mereka tidak bagus untuk ketahanan sensor, karena hanya ada dua pihak. Jika mereka memutuskan untuk menyensor transaksi atau beberapa alamat karena alasan yang sewenang-wenang, maka pada dasarnya kita tidak memiliki ketahanan sensor atau sifat tanpa izin (permissionlessness), yang juga sangat penting. Ini berarti mereka dapat menyensor atau menahan aktor mana pun yang mereka inginkan untuk berpartisipasi onchain, yang mana ini sangat buruk.

Dan properti ketahanan sensor yang kita pertahankan tidaklah luar biasa, bukan? Karena sebagian besar blok dibangun oleh kedua pembangun ini, Anda pada dasarnya harus menunggu sampai satu pembangun blok lokal terpilih dan mengusulkan sebuah blok yang mencakup semua transaksi yang biasanya disensor ini, yang mana ini tidak terasa bagus. Ini berarti para pengguna ini harus menunggu 10, 12, entahlah, banyak blok sampai transaksi mereka benar-benar disertakan onchain.

Jadi kita benar-benar ingin mempertahankan staker rumahan dan pembangun blok lokal, karena merekalah yang menjaga ketahanan sensor. Pada saat yang sama, saat ini, bahkan menggunakan mereka pun tidaklah bagus, karena Anda masih harus menunggu lama agar transaksi Anda disertakan jika disensor oleh kedua pembangun tersebut. Dengan FOCIL, Anda beralih ke dunia di mana para partisipan yang menjamin ketahanan sensor, yaitu anggota komite daftar inklusi dalam kasus kita, mungkin berbeda dari orang-orang yang membangun blok. Saya pikir ini membuka lanskap yang sangat menarik, karena sekarang kita tidak perlu bergantung pada partisipan yang sama persis untuk membangun blok yang bernilai sekaligus berkontribusi pada ketahanan sensor. FOCIL juga dapat dianggap sebagai langkah pertama ke arah yang penting tersebut, karena Anda memiliki dua tugas yang sangat berbeda, dan saat ini kita meminta node validator yang sama persis untuk melakukan keduanya, yang mana ini sangat bertentangan.

**Pooja Ranjan:** Terima kasih banyak. Saya rasa pertanyaan selanjutnya adalah dari Luis.

### Kriteria untuk memilih transaksi (26:46) {#criteria-for-selecting-transactions-2646}

**Luis Pinto:** Saya bergabung beberapa menit setelah dimulai, tetapi bagi saya ini terlihat seperti mendesentralisasi pemilihan transaksi di jaringan secara keseluruhan. Menurut saya itu sangat bagus; ini melawan MEV dan penyensoran. Dan saya sangat menyukai bagian di mana pemberi atestasi melakukan pekerjaan ini, karena di masa depan mereka akan memiliki persyaratan perangkat keras yang lebih rendah daripada pembangun, terlebih lagi dengan ketiadaan state dan klien tanpa state. Karena Anda akan dapat menjalankan ini dengan perangkat keras yang sangat rendah, ini membuat segalanya menjadi sangat terdesentralisasi. Saya rasa tantangan utamanya di sini adalah menentukan kriteria untuk pemilihan transaksi dari daftar inklusi ini, apakah Anda menggunakan biaya prioritas atau jumlah blob; ada begitu banyak variabel. Apakah Anda telah menetapkan serangkaian kriteria yang ingin Anda terapkan?

**Thomas Thiery:** Itu pertanyaan yang bagus. Ada dua hal. Yang pertama sangat penting, tentang mencoba memisahkan pemberi atestasi dari orang-orang yang membangun atau mengusulkan blok. Itulah keseluruhan lini penelitian pemisahan pemberi atestasi-pengusul (APS); Julian telah banyak mengerjakan ini. Kami menyebutnya pemisahan peran, sehingga mereka lebih sesuai dengan tugas protokol. Saya menulis sebuah pos, yang baru saja saya bagikan, tentang kemungkinan pemisahan, yang sangat terbuka, dan saya akan sangat senang menerima lebih banyak masukan dari orang-orang. Dalam pos ini saya membuat pemisahan antara pemberi atestasi, penyerta (includer), yang sekarang merupakan anggota komite IL, dan pengusul eksekusi, atau pembangun. Saya pikir itu adalah tugas yang secara fundamental berbeda, dan mungkin kita harus memiliki peran yang berbeda untuk mereka.

Kemudian, untuk aturan inklusi, itu adalah pertanyaan yang sangat bagus. Kami cukup banyak memikirkannya, dan saya pikir kami menetapkan dua hal. Yang pertama adalah kami menginginkan keragaman aturan. Kami tidak menginginkan satu aturan tunggal, misalnya mengurutkan berdasarkan biaya prioritas yang menurun untuk semua klien, karena dengan begitu Anda sebenarnya dapat memanipulasi dan mencoba menyusun ulang mempool sehingga hanya transaksi Anda yang disertakan dalam IL. Tetapi jika Anda memiliki keragaman aturan, termasuk satu aturan yang juga memperhitungkan waktu transaksi tertunda di mempool, dan klien yang berbeda menerapkan aturan yang berbeda, semuanya dengan nuansa yang sama, sebagian besar seputar biaya prioritas dan waktu tertunda di mempool, maka itu sangat, sangat sulit untuk dimanipulasi, dan itu membuat protokol menjadi lebih kuat. Ini juga merupakan cara yang baik, menurut saya, untuk memanfaatkan keragaman klien yang kita miliki di Ethereum saat ini, dan membiarkan klien membuat pilihan yang beropini. Kami memiliki aturan dalam pikiran kami, tetapi kami pikir klien juga dapat memilih aturan terbaik untuk mereka. Selama tidak semua orang memiliki aturan yang sama persis yang diurutkan berdasarkan biaya prioritas, kita akan baik-baik saja.

**Luis Pinto:** Oke, jadi Anda juga mendistribusikan kriteria ini, membiarkan mereka yang membangun daftar inklusi memiliki kriteria mereka sendiri. Atau apakah ini akan menjadi bagian dari protokol?

**Julian Ma:** Aturan inklusi tidak akan menjadi bagian dari protokol. Pertama-tama, ini sangat sulit untuk ditegakkan, dan kedua, sebenarnya lebih baik untuk tidak memaksakan apa pun. Jika kita mengizinkan anggota komite untuk memutuskan sendiri, atau membiarkan tim klien bertindak atas nama mereka, tentang bagaimana mereka menyertakan transaksi, maka kita menciptakan ketahanan dalam jaringan. Orang-orang dengan preferensi yang berbeda akan menyertakannya dengan cara yang berbeda, yang berarti sistem ini lebih sulit untuk diserang.

**Luis Pinto:** Oke, terima kasih.

### Kompatibilitas dengan EIP-7702, ePBS, dan PeerDAS (30:43) {#compatibility-with-eip-7702-epbs-and-peerdas-3043}

**Pooja Ranjan:** Terima kasih banyak. Sejauh yang saya pahami, proposal ini sudah diusulkan untuk peningkatan setelah Pectra, yaitu Fusaka. Dan mengingat Fusaka mungkin atau mungkin tidak menyertakan beberapa EIP lain yang sedang dalam proses, saya ingin tahu bagaimana status kompatibilitas FOCIL terhadap proposal seperti 7702, yang ditujukan untuk abstraksi akun, ePBS, dan PeerDAS.

**Thomas Thiery:** Pertanyaan yang bagus. Kami memiliki sedikit keuntungan di sini karena sejarah daftar inklusi. Seperti yang kami sebutkan, 7547 sempat dipertimbangkan untuk disertakan dan kemudian ditolak karena adanya inkompatibilitas. Jadi kami sangat berhati-hati dalam menyelesaikan masalah tersebut sebelum membuat proposal baru, karena kami tahu orang-orang akan melihatnya dengan pertanyaan yang sama, dan itu masuk akal.

Kami sangat yakin, karena kami juga telah berbicara dengan tim abstraksi akun, dan kami banyak berdiskusi dengan Potuz dan Terence. Terence telah membantu kami secara aktif, dan dia telah mengerjakan ePBS maupun FOCIL, jadi sangat mudah bagi kami untuk memeriksa apakah itu juga kompatibel. Saya benar-benar tidak berpikir ada inkompatibilitas dengan EIP lainnya. Dengan ePBS, Anda harus berhati-hati dengan pengaturan waktu, karena Anda memisahkan muatan eksekusi dari blok konsensus, sehingga seluruh pengaturan waktu slot berubah, dan sekarang Anda juga menambahkan pembuatan IL yang perlu dilakukan sebelum muatan diusulkan. Jadi Anda perlu berhati-hati dengan pengaturan waktu, tetapi jika saya ingat dengan benar, dari terakhir kali kami membicarakannya dengan Potuz dan Terence, tidak ada inkompatibilitas krusial sama sekali. Saya pikir kita berada di posisi yang baik dalam hal kompatibilitas.

**Pooja Ranjan:** Senang mendengarnya. Saya perhatikan Jihoon juga membagikan HackMD, yang akan kami tambahkan ke sumber daya, bagi orang-orang yang ingin mempelajari lebih lanjut tentang kompatibilitas dengan ePBS secara khusus. Dan ya, saya ingat dari percakapan terakhir dengan Mike, saya rasa proposal tersebut tidak disertakan karena inkompatibilitas abstraksi akun. Jadi, senang mengetahui bahwa hal ini sudah ditangani.

### FOCIL dan MEV multi-slot (33:04) {#focil-and-multi-slot-mev-3304}

**Pooja Ranjan:** Saya sedang membaca dokumen dan detail yang ditambahkan ke situs web FOCIL, meetfocil.eth.limo, dan mempelajari tentang istilah yang disebut MEV multi-slot. Julian juga menyebutkan bahwa MEV-Boost pada umumnya menguntungkan, terlepas dari keinginan dan upaya yang dilakukan oleh para pengembang untuk menjaganya tetap setara. Saya ingin tahu bagaimana FOCIL akan mencegah hal ini.

**Julian Ma:** Terima kasih atas pertanyaan Anda. Pertama, izinkan saya menyampaikan sesuatu tentang FOCIL dan MEV, lalu kita dapat beralih ke MEV multi-slot. FOCIL tidak serta merta mencegah MEV, dan ini justru karena kami ingin memisahkan bagian MEV dan bagian inklusi. Menurut pandangan kami, hal ini penting untuk dilakukan, karena jika tidak, Anda akan melihat pasar semacam IL Boost bermunculan. Dengan alasan tersebut, jika daftar inklusi dapat membatasi jumlah MEV yang dapat diekstraksi, maka membangun daftar inklusi menjadi sangat berharga, dan orang-orang akan menciptakan pasar di sekitarnya. Desain kami benar-benar ada untuk memberikan jaminan inklusi minimum, yang berarti tidak terlalu berharga untuk menjadi anggota komite daftar inklusi, dan ada 16 anggota, yang berarti tidak ada pasar produsen yang canggih.

Kemudian, beralih ke MEV multi-slot: FOCIL meringankan beberapa masalah, tetapi tidak menyelesaikannya secara tuntas. Ini sekali lagi karena adanya ketidakcocokan antara menyediakan ketahanan sensor dan solusi untuk MEV. Apa yang dilakukan FOCIL adalah memungkinkan transaksi apa pun untuk disertakan selama transaksi tersebut membayar biaya, yang memecahkan MEV multi-slot sampai batas tertentu. MEV multi-slot di sini adalah ketika suatu pihak mampu mengekstraksi lebih banyak MEV jika pihak tersebut mengendalikan dua blok berturut-turut.

FOCIL meringankan beberapa masalah karena memungkinkan Anda untuk menyisipkan transaksi Anda. Misalnya, jika Anda perlu menyisipkan transaksi yang melikuidasi utang buruk pada suatu posisi di suatu tempat, Anda dapat melakukannya bahkan jika pengusul mencoba menyensor Anda dan akan mengekstraksi MEV dari Anda di blok berikutnya.

Mengapa ini tidak menyelesaikan semua masalah adalah karena seleksi merugikan (adverse selection), sebuah sifat ekonomi di mana satu orang memiliki lebih banyak informasi daripada yang lain. Salah satu contoh MEV multi-slot adalah mengekstraksi arbitrase selama dua blok, di mana pembangun blok tidak mengekstraksi arbitrase di blok pertama dan melakukannya di blok kedua. Ada beberapa hasil teoretis yang menunjukkan bahwa ini bisa lebih menguntungkan bagi pembangun blok daripada mengekstraksi arbitrase di kedua slot. Anda mungkin berpikir bahwa FOCIL membantu di sini, karena pelaku arbitrase pada prinsipnya dapat menyertakan transaksi mereka dalam daftar inklusi dan dengan demikian memaksa semacam arbitrase terjadi. Meskipun demikian, tidak kompatibel dengan insentif bagi pelaku arbitrase untuk mengirimkan transaksi mereka ke FOCIL, karena masih ada jeda 3 detik antara transaksi mereka dikirimkan dan pembangun blok dapat bertindak. Jika Anda mencoba melakukan arbitrase dan harga terus bergerak di beberapa pasar eksternal, Anda tidak ingin berkomitmen 3 detik sebelumnya, karena Anda memiliki informasi yang jauh lebih sedikit daripada pembangun blok, yang bertindak lebih lambat dari Anda. Seleksi merugikan ikut bermain karena pembangun memiliki lebih banyak informasi: ia akan membiarkan Anda menang jika itu buruk bagi Anda, jika harga di pasar eksternal telah bergerak melawan Anda dalam tiga detik tambahan tersebut, dan ia akan membiarkan dirinya menang jika itu lebih baik bagi dirinya sendiri untuk menang.

Jadi FOCIL memecahkan bagian dari MEV multi-slot di mana transaksi tidak mengalami seleksi merugikan. Untuk transaksi di mana terdapat seleksi merugikan, ini sedikit lebih rumit, tetapi ini meringankan masalah sampai batas tertentu. Pada prinsipnya, ini membuat segalanya lebih baik daripada sekarang, tetapi masih ada sedikit pekerjaan yang harus dilakukan.

**Pooja Ranjan:** Baiklah, terima kasih banyak telah membagikan hal tersebut. Saya mengerti ada banyak penelitian yang sedang berlangsung untuk mengatasi masalah MEV, jadi senang mengetahui bahwa setidaknya pada prinsipnya ini akan lebih membantu daripada skenario saat ini.

### Kompromi dan tantangan (36:44) {#trade-offs-and-challenges-3644}

**Pooja Ranjan:** Saya punya satu pertanyaan terkait dengan apa yang disebutkan Thomas sebelumnya tentang ekivokasi IL. Saya perhatikan bahwa di bagian pertimbangan keamanan dari proposal, ada lumayan banyak poin yang disebutkan, seperti kelangsungan konsensus, ekivokasi IL, dan konstruksi muatan. Apa yang Anda anggap sebagai kompromi terbesar, atau sesuatu yang mungkin memerlukan lebih banyak penelitian dan dapat mencegah proposal ini masuk ke peningkatan berikutnya apa adanya?

**Thomas Thiery:** Sejujurnya, saya pikir bagian tentang pertimbangan keamanan sebagian besar adalah cara untuk menunjukkan bahwa kami telah memikirkan dan mengatasi kekhawatiran mengenai keamanan. Lebih ke arah sana daripada memiliki pertanyaan terbuka tentang hal-hal keamanan yang tidak kami ketahui. Saya rasa tidak ada penghalang atau masalah besar dalam hal pertimbangan keamanan.

Untuk komprominya: jika Anda mengambil pandangan yang sangat sempit, memang benar bahwa FOCIL menambahkan beberapa tugas ke validator, baik ketika mereka harus mengusulkan daftar inklusi, dan untuk pemberi atestasi, ketika mereka harus memeriksa satu kondisi lagi untuk memastikan blok tersebut valid menurut daftar inklusi. Ini juga menambahkan tugas kecil untuk pengusul, karena sekarang ia perlu memastikan muatannya benar-benar menyertakan transaksi di dalam IL. Bagi saya, itu satu-satunya kompromi, dan tugas-tugas tersebut tidak berat atau rumit. Anggota komite IL hanya memantau mempool publik dan memasukkan transaksi ke dalam daftar yang mereka kirim. Ini tidak memerlukan keahlian atau kecanggihan apa pun, yang menurut saya bagus. Di sisi lain, seperti yang kami katakan, ini mungkin membuka beberapa peningkatan penskalaan yang besar dan pemisahan yang lebih baik antara peserta dan tugas di dalam protokol.

Saya mungkin bias, tetapi saya tidak melihat kompromi yang besar. Saya pikir ini semacam membalikkan keadaan ketika berbicara tentang ketahanan terhadap sensor. Sekarang Anda pada dasarnya hanya membutuhkan 15% dari jaringan untuk bersikap jujur agar semua transaksi, termasuk yang mungkin disensor oleh pembangun, untuk dimasukkan ke dalam blok berikutnya, yang merupakan peningkatan yang sangat besar. Sejujurnya, saya rasa Anda tidak mengorbankan banyak hal di sana.

**Pooja Ranjan:** Senang mengetahuinya. Di sebagian besar proposal, kami menemukan bahwa bagian pertimbangan keamanan tidak memiliki informasi sama sekali atau hanya memiliki sedikit informasi, jadi senang mengetahui bahwa penelitian telah dilakukan pada bagian tersebut dan kami menyadari kemungkinan pertimbangan keamanan. Senang mengetahui bahwa ini bukan penghalang atau potensi tantangan untuk implementasi dan adopsi di masa depan.

### Mekanisme biaya transaksi untuk daftar inklusi (39:50) {#transaction-fee-mechanisms-for-inclusion-lists-3950}

**Pooja Ranjan:** Saya punya pertanyaan tentang beberapa pertanyaan terbuka yang saya temukan di situs web itu sendiri, mengenai mekanisme biaya transaksi. Saya ingin tahu apakah ada pembaruan, atau apakah Anda ingin berbagi lebih banyak tentang cara terbaik untuk membebankan biaya dan mendistribusikan biaya ini untuk inklusi dalam daftar inklusi.

**Thomas Thiery:** Kami memiliki hibah yang sedang berjalan yang secara khusus melihat hal ini dan pada mekanisme insentif untuk memberikan imbalan kepada anggota komite IL. Ini tidak mudah. Ini rumit, dan tidak peduli bagaimana Anda mendekatinya, ini juga merupakan perubahan yang sangat besar. Mengubah biaya di Ethereum, baik Anda mengubah biaya, menambahkannya, atau menambahkan penerbitan baru, semua ini adalah perubahan besar yang membutuhkan banyak pertimbangan dan kehati-hatian. Namun hal ini sedang dieksplorasi, dan ide-ide seputar pendistribusian biaya di seluruh, misalnya, anggota komite yang menyertakan sebuah transaksi tampaknya merupakan ide yang bagus. Ini memiliki semacam properti yang kami inginkan, karena kami ingin memberikan imbalan kepada orang-orang yang menyertakan transaksi yang mungkin tidak ingin disertakan oleh orang lain. Jadi kami memikirkan hal ini dengan cukup mendalam, dan kami memiliki hibah yang sedang berjalan.

Ada juga pertanyaan apakah kita ingin memberikan biaya kepada anggota komite IL sama sekali, karena sangat sulit untuk memberikan imbalan kepada partisipan yang lebih kecil yang tersebar di seluruh dunia. Anda tidak menginginkan serangan Sybil, dan Anda tidak ingin partisipan besar dengan banyak stake mendominasi kumpulan komite IL. Bagaimana Anda mencegahnya? Itu sangat sulit. Jadi Anda memiliki banyak pertimbangan desain yang harus diperhitungkan.

Salah satu pandangan saya akhir-akhir ini adalah: bagaimana jika kita menambahkan beberapa fitur keren ke FOCIL, seperti privasi, sehingga Anda tidak bisa benar-benar mengetahui siapa yang mengusulkan daftar transaksi tertentu? Anda tahu bahwa itu adalah seseorang yang benar-benar terpilih sebagai anggota komite IL, tetapi Anda tidak tahu persis siapa yang mengusulkan daftar yang mana, sehingga Anda tidak dapat menautkan anggota komite IL ke kumpulan transaksi di IL mereka. Jika kita dapat memilikinya, dan membiarkan peran komite IL bersifat opsional, maka kita mungkin akan memiliki partisipan yang jujur dalam protokol, mengandalkan perilaku altruistik, dan mungkin kita tidak perlu menyiapkan mekanisme biaya sama sekali. Itu adalah pandangan yang sangat baru dan beropini, dan saat ini sedang banyak dieksplorasi. Semua ini adalah diskusi "masa depan FOCIL"; mereka tidak seharusnya disertakan dalam EIP saat ini.

**Julian Ma:** Hanya untuk menambahkan, bagian terakhir itu juga sangat penting: EIP-7805 tidak menyertakan mekanisme biaya transaksi apa pun, untuk membuatnya lebih sederhana untuk diimplementasikan. Pada dasarnya ini adalah cara sekecil mungkin yang dapat kami berikan untuk properti ketahanan sensor, tetapi ini sangat dapat diperluas. Kami sedang menyelidikinya. Thomas telah melakukan cukup banyak pekerjaan dengan melihat biaya transaksi terpisah untuk penyerta dan untuk pengusul. Kemudian, seperti yang disebutkan Thomas, kami memiliki hibah yang sedang berjalan dengan seorang peneliti luar biasa di Nethermind yang sedang meneliti pembuatan mekanisme biaya transaksi untuk FOCIL, dan ini sangat menjanjikan. Dan terakhir, telah ada pengerjaan mekanisme biaya transaksi untuk varian FOCIL yang disebut AUCIL, sebuah desain daftar inklusi berbasis lelang yang diusulkan oleh Sarisht Wadhwa, Fan Zhang, dan Kartik Nayak bersama dengan beberapa penulis FOCIL, yang mencari cara untuk memberikan insentif kepada anggota komite daftar inklusi.

Terkait poin Luis sebelumnya, pemberian insentif sangat berkaitan dengan bagaimana daftar inklusi dibuat. Ini berarti protokol ingin memberikan pandangan tertentu tentang bagaimana anggota komite daftar inklusi seharusnya berperilaku. Biasanya hal ini bermuara pada keinginan agar partisipan tertentu melakukan hal yang berbeda. Misalnya, protokol mungkin mengurutkan anggota komite dan menugaskan mereka transaksi tertentu melalui ekuilibrium berkorelasi, agar tetap memiliki beberapa perilaku yang berbeda di antara anggota komite. Jadi ini bukan bagian dari proposal saat ini, tetapi kami pasti sedang menyelidikinya, dan ini sejalan dengan kemampuan perluasan FOCIL.

**Pooja Ranjan:** Oh, itu menarik. Jadi kita harus menantikan beberapa proposal tambahan di masa mendatang untuk meningkatkan fitur FOCIL saat ini.

### Ukuran daftar inklusi (44:16) {#inclusion-list-size-4416}

**Pooja Ranjan:** Saya punya pertanyaan lain. Saya tidak yakin apakah ini harus menjadi bagian dari proposal saat ini, tetapi saya penasaran untuk mengetahui apakah ada pembaruan tentang ukuran IL. Daftar inklusi kemungkinan besar harus dibatasi ukurannya untuk mencegah penggunaan bandwidth yang berlebihan. Apakah kita memiliki penelitian atau pembaruan lebih lanjut tentang bagaimana ukuran optimal dari daftar inklusi dapat ditentukan?

**Thomas Thiery:** Kami memiliki ukuran tetap sekarang di dalam spesifikasi, dan itu sudah ada sejak lama: 8 kilobyte. Kami menetapkannya dalam kilobyte karena apa yang benar-benar dikonsumsi oleh FOCIL dan IL adalah bandwidth, dan kurang lebih hanya itu. Jika Anda mengambil ukuran transaksi median, kita mendapatkan sekitar 40 transaksi per IL, dan jika semua transaksi tersebut unik, itu berarti sekitar 640 transaksi yang dapat digabungkan bersama di seluruh 16 anggota komite.

Saya tidak tahu apakah ada terlalu banyak penelitian yang harus dilakukan mengenai ukuran optimal yang tepat. Apa yang kami pilih: 16 kali 8 kilobyte pada dasarnya adalah ukuran sebuah blob, jadi itu bukanlah jumlah bandwidth gabungan yang sangat besar. Dan karena kombinasi transaksi di seluruh IL lebih besar dari sebuah blok, saya rasa kita tidak akan menemui masalah di sana.

Untuk ke depannya, Anda bisa meningkatkan ukuran IL, tetapi Anda juga bisa mempertimbangkan untuk menambah jumlah anggota komite IL. Hal itu memungkinkan Anda untuk memiliki lebih banyak peluang mendapatkan satu anggota komite IL yang jujur jika sebagian besar jaringan memutuskan untuk mulai melakukan penyensoran. Jadi itu juga sesuatu yang bisa kita lakukan. Untuk saat ini, sepertinya 16 sudah sangat baik dan cukup, tetapi Anda pasti bisa mengutak-atik parameter ini di masa depan jika penyensoran menjadi sangat gila, atau jika kita perlu mengambil lebih banyak tindakan.

### Metrik untuk melacak adopsi (46:39) {#metrics-to-track-adoption-4639}

**Pooja Ranjan:** Sekadar tindak lanjut di sini: apakah Anda memiliki metrik yang dapat kita lacak untuk memahami adopsi atau keberhasilan proposal ini?

**Julian Ma:** Itu pertanyaan yang bagus. Izinkan saya menjawab dengan cepat dan kemudian meneruskannya kepada Thomas. Beberapa metrik yang mudah adalah seberapa banyak daftar inklusi yang diusulkan yang tidak kosong. Dan Anda bisa memikirkan dasbor, seperti seri ".pics" dari Toni Wahrstätter, di mana mungkin ada lebih banyak variasi, yang memberikan semacam ukuran kualitas pada daftar inklusi ini. Namun pada prinsipnya, hanya satu orang per slot yang perlu membuat daftar inklusi yang tepat untuk memberikan ketahanan terhadap penyensoran.

Saya pikir ini adalah poin yang sangat penting sehingga penting untuk segera mengimplementasikan FOCIL, karena sekarang kita berada dalam fase yang luar biasa di mana pembangun blok tidak terlalu banyak menyensor dan validator tidak terlalu banyak menyensor. Saya akan mengatakan bahwa ini sangat rapuh. Hingga saat ini, pembangun blok telah melakukan penyensoran untuk waktu yang lama, dan jika kita memperkenalkan FOCIL sekarang, kita memiliki kemungkinan untuk menjadikannya sebagai standar bawaan sehingga semua validator ini mengadopsinya dan membuat daftar inklusi yang bermakna. Karena pembangun blok tidak menyensor, tidak ada ketidakstabilan pasar yang tercipta di sini. Jika kita menunggu sampai ada penyensoran di antara para pembangun, maka akan jauh lebih sulit untuk memperkenalkan FOCIL, dan saya membayangkan semua metrik yang akan digunakan untuk mengukur adopsi akan jauh lebih buruk.

**Thomas Thiery:** Salah satu metrik utama yang juga perlu diperhatikan adalah penundaan inklusi untuk transaksi mempool publik. Anda mengambil semua transaksi yang tertunda di mempool publik dan Anda melihat seberapa cepat transaksi tersebut dimasukkan. Jika FOCIL berfungsi, semuanya akan dimasukkan ke dalam blok berikutnya. Jika tidak, itu berarti sebagian besar validator melakukan penyensoran. Jadi metrik lain yang bisa kita lihat adalah siapa yang menyensor, dan berapa proporsi jaringan yang menyensor. Kita akan memiliki dasbor dan metrik yang sangat transparan untuk melacak hal ini, karena pada dasarnya itulah yang seharusnya dilakukan oleh FOCIL. Jika transaksi publik tidak dimasukkan ke dalam blok berikutnya, itu berarti sebagian besar jaringan sebenarnya menyensor transaksi ini.

**Pooja Ranjan:** Sangat menarik. Jadi mungkin ini adalah sesuatu bagi para peneliti: semacam daftar keinginan untuk peningkatan, bahwa dasbor dan pelacak metrik harus dibagikan oleh pengembang untuk sebuah proposal setiap kali proposal tersebut disertakan dalam peningkatan jaringan.

### Status implementasi klien (49:11) {#client-implementation-status-4911}

**Pooja Ranjan:** Seperti yang disebutkan Julian, proposal ini mungkin perlu diimplementasikan sesegera mungkin. Saya penasaran ingin memahami sejauh mana progres kita pada implementasi klien, karena saya ingat pada panggilan testnet terakhir Paritosh menyebutkan penambahan beberapa dukungan dengan devnet. Jadi, sudah sejauh mana kita dalam hal itu?

**Thomas Thiery:** Progres kita cukup baik. Pertama-tama, sangat menyenangkan melihat bagaimana orang-orang mengambil bagian implementasi dari FOCIL, karena saya bukan seorang pengembang (dev), saya adalah seorang peneliti. Saya telah bekerja dengan para pengembang sejak awal, tetapi saya bukan orang yang mengimplementasikan hal-hal tersebut di dalam klien.

Mereka yang memeloporinya, ada tiga orang: kita memiliki Terence dari Prysm, dan Jihoon, yang telah banyak membantu Terence di Prysm tetapi juga telah bekerja pada Geth. Jadi sekarang kita memiliki devnet yang berfungsi untuk Prysm dan Geth, yang mana sangat bagus, dan ada banyak pengujian yang sedang berlangsung. Kami sekarang juga sedang mencoba agar FOCIL ditampilkan dan terlihat di explorer Dora. Kemudian ada Jacob, yang telah bekerja pada Lighthouse dan Reth, dan saya tahu beberapa upaya masih berlangsung di sana. Lodestar sangat aktif akhir-akhir ini; saya pikir mereka sudah sangat dekat untuk memiliki devnet yang berfungsi. Kami mendapat kabar dari Nethermind hari ini bahwa mereka memiliki sebuah prototipe, yang mana sangat bagus. Saya merasa seperti melupakan beberapa dari mereka... Nimbus juga ikut bergabung, kata Jihoon. Itu sangat bagus.

Secara keseluruhan, kita mendapatkan semakin banyak devnet yang siap dan aktif, devnet lokal, dan semakin banyak kombinasi antara klien eksekusi dan lapisan konsensus. Ada beberapa kemajuan yang sangat baik, dan ini menyenangkan untuk dilihat, karena kita semua tahu para pengembang cukup sibuk sekarang dengan kedatangan Pectra, dan sudah bekerja pada PeerDAS serta hal-hal lainnya. Sangat luar biasa melihat bagaimana orang-orang di Ethereum secara keseluruhan sangat peduli tentang ketahanan sensor. Sebagian besar tim yang belum saya hubungi secara khusus langsung bergabung dalam upaya ini dan sekarang sedang bekerja menuju devnet dan pengujian.

**Pooja Ranjan:** Terima kasih telah membagikan hal itu. Saya menantikan untuk mengikuti pembaruan pada devnet tersebut. Saya tidak yakin akan ada berapa banyak iterasi dari devnet ini, tetapi saya sangat antusias melihat perkembangannya. Saya melihat Justin memiliki pertanyaan di sini. Justin, silakan.

### FOCIL di Fusaka atau Glamsterdam? (52:07) {#focil-in-fusaka-or-glamsterdam-5207}

**Justin:** Oke, bersiaplah untuk yang satu ini. Anda menyampaikan poin yang sangat bagus bahwa waktu terbaik untuk mengatasi penyensoran adalah sebelum penyensoran itu terjadi, bukan? Jadi: FOCIL di Fusaka, atau bisakah menunggu hingga Glamsterdam? Dan mana yang harus saya dukung sebagai pengembang?

**Thomas Thiery:** Kami telah membuka PR, dan itu telah digabungkan, dengan FOCIL yang diusulkan untuk Fusaka. Kami pikir ini harus masuk ke Fusaka. Sebagian alasannya adalah beberapa klien sudah mulai mengerjakannya, dan mereka belum menemui terlalu banyak kendala. Ini tidak seperti proposal lain yang jauh lebih sulit untuk diimplementasikan dan melibatkan lebih banyak pekerjaan. Dan ini juga tidak terlalu kontroversial. Saya rasa tidak ada yang menentang ketahanan terhadap penyensoran, dan semua orang sepertinya setuju bahwa ini perlu disertakan sesegera mungkin. Jadi saya akan memilih Fusaka.

Saya tidak tahu apakah ini bisa menunggu atau tidak. Proposal dan peningkatan selalu bisa menunggu. Saya hanya ingin menghindari dunia di mana tidak semudah itu untuk mengimplementasikan perubahan-perubahan ini. Keadaan bisa berubah dengan sangat cepat. Seperti yang kita lihat, yang terjadi justru sebaliknya: beberapa bulan yang lalu, salah satu pembangun utama tiba-tiba berhenti menyensor. Kami bertanya mengapa, dan jawabannya seperti, "ya, kami hanya memutuskan untuk tidak melakukannya." Itu bagus dalam kasus tersebut, karena itu adalah hal yang positif, tetapi keadaannya bisa berbalik sepenuhnya, dan kemudian kita bisa memiliki dua pembangun yang menyensor beberapa transaksi, dan kita akan kembali berada dalam situasi yang sangat buruk.

Hal lain yang ingin saya sebutkan, karena saya pikir ini penting: jika kita bergerak menuju beberapa hal yang kita bicarakan, seperti APS, di mana Anda benar-benar dapat memisahkan pemberi atestasi dan pengusul dengan beberapa desain yang telah kami kerjakan, kita perlu memasukkan FOCIL sebelum itu, dan kita perlu tahu bahwa FOCIL berfungsi. Kita membutuhkan FOCIL di Mainnet selama enam bulan, satu tahun, untuk benar-benar yakin bahwa ia memenuhi tujuannya, yaitu mempertahankan dan meningkatkan sifat ketahanan terhadap penyensoran dari Ethereum. Jadi urgensi lainnya, setidaknya bagi saya, adalah jika kita ingin melindungi pemberi atestasi dari permainan waktu dan beberapa kekhawatiran lain yang ingin kita atasi dengan APS, kita perlu memasukkan FOCIL sesegera mungkin.

**Pooja Ranjan:** Terkadang menyedihkan melihat ketika proposal tidak terpilih untuk peningkatan berikutnya atau yang terdekat, tetapi hanya ada sejumlah proposal yang dapat disertakan dalam satu peningkatan. Saya sangat menghargai semua kerja keras yang dilakukan di balik pengajuan proposal, kesiapan proposal, serta pengujian yang menyertainya. Jadi, terima kasih banyak atas semua pekerjaan yang Anda lakukan untuk ekosistem Ethereum.

### Tanya jawab cepat (55:18) {#rapid-fire-5518}

**Pooja Ranjan:** Sebelum kita akhiri, kita ada sesi tanya jawab cepat. Satu-satunya syarat adalah jawabannya harus satu kata atau satu kalimat, dan kita akan mencoba menggunakan pengatur waktu, mungkin masing-masing 30 detik. Jika Anda siap, mari kita mulai dengan Julian. Apa masalah tersulit dalam penelitian rantai blok saat ini?

**Julian Ma:** Saya tidak akan terlalu *meme-y*, jadi saya akan menjawabnya dengan serius. Menurut saya masalah tersulit adalah masa depan staking: apa arti masa depan staking, peran apa yang diberikan oleh penyedia layanan, bagaimana mereka diberi kompensasi untuk itu, dan bagaimana mereka berhubungan satu sama lain.

**Pooja Ranjan:** Apa satu kasus penggunaan rantai blok yang belum cukup dieksplorasi?

**Julian Ma:** Menurut saya FOCIL.

**Pooja Ranjan:** Apa risiko keamanan terbesar bagi Ethereum saat ini?

**Julian Ma:** Sejujurnya saya akan mengatakan bahwa ketahanan sensor sangat penting di sini, karena hal-hal seperti MEV multi-blok yang dapat menimbulkan risiko keamanan yang besar, misalnya untuk lapisan 2 (l2).

**Pooja Ranjan:** Apakah MEV harus diminimalkan, diterima, atau di antara keduanya?

**Julian Ma:** Saya sangat setuju dengan pandangan Flashbots di sini, bahwa itu harus didemokratisasi, artinya harus dimaksimalkan di mana hal ini diperlukan, dan diminimalkan pada lapisan aplikasi.

**Pooja Ranjan:** Apakah desentralisasi selalu sepadan dengan pengorbanannya?

**Julian Ma:** Biasanya sepadan dengan pengorbanannya.

**Pooja Ranjan:** Apa inovasi terbesar yang dibawa Ethereum ke dunia?

**Julian Ma:** Di sini saya ingin mengutip pembicaraan Mike Neuder dari Devcon tentang hak kekayaan digital. Menurut saya hak kekayaan digital yang tahan sensor yang benar-benar mengubah dunia.

**Pooja Ranjan:** Terima kasih banyak, dijawab dengan sangat baik. Rangkaian pertanyaan saya berikutnya adalah untuk Thomas. Jadi, jika Ethereum tidak ada, rantai blok mana yang akan Anda kerjakan?

**Thomas Thiery:** Sepertinya saya akan sangat *meme-y*, dan Julian sedikit menikung saya karena saya pikir dia akan melakukan hal yang sama. Rantai blok tersebut adalah FOCIL.

**Pooja Ranjan:** Apa kasus penggunaan rantai blok yang paling dilebih-lebihkan?

**Thomas Thiery:** Tidak ada kasus penggunaan yang layak dihebohkan tanpa FOCIL.

**Pooja Ranjan:** Apa satu hal yang perlu ditingkatkan Ethereum sesegera mungkin?

**Thomas Thiery:** Ketahanan sensor, dengan FOCIL.

**Pooja Ranjan:** Satu kata untuk menggambarkan desentralisasi?

**Thomas Thiery:** FOCIL.

**Pooja Ranjan:** Apakah menurut Anda Ethereum akan sepenuhnya menyelesaikan skalabilitas?

**Thomas Thiery:** Ethereum dengan FOCIL, ya.

**Pooja Ranjan:** Penskalaan lapisan 1 (l1) atau penskalaan lapisan 2 (l2), mana yang menang?

**Thomas Thiery:** Lapisan tak terbatas, semuanya dengan FOCIL.

**Pooja Ranjan:** Sangat baik, terima kasih banyak, Thomas. Terima kasih telah menjawab semua pertanyaan ini. Saat kita mengakhiri, saya ingin memberikan kesempatan ini kepada Anda: jika Anda memiliki pesan untuk komunitas tentang proposal ini, atau untuk komunitas Ethereum pada umumnya.

### Pesan untuk komunitas (58:08) {#messages-to-the-community-5808}

**Thomas Thiery:** Sebenarnya, itu hal yang sangat penting, karena kami selalu melakukan diskusi aktif, dan semuanya bersifat publik di Discord. Ada dorongan pada awalnya untuk membuat semuanya menjadi publik, dan orang-orang benar-benar melakukannya, jadi saya sangat senang. Anda dapat mengikuti diskusi dan perkembangannya di Discord publik Eth R&D, pada saluran inclusion-list. Pada dasarnya di situlah semuanya terjadi saat ini. Kemudian Anda dapat menghubungi kami di Twitter, Telegram, di mana saja. Jangan ragu.

Semakin banyak orang yang kami ajak bicara dan terlibat, akan semakin baik desainnya dan semakin baik pula implementasinya. Jadi, jika Anda dapat membantu dengan cara apa pun, hubungi kami dan kami akan dengan senang hati membantu di semua sisi, bahkan di sisi riset. Saya rasa, ini bahkan lebih cocok bagi kami untuk bekerja sama dengan orang-orang yang ingin mengerjakan masa depan FOCIL. Kami telah menyebutkan privasi, kami menyebutkan mekanisme biaya transaksi, dan kami juga akan banyak berfokus pada FOCIL untuk blob. Semua hal ini membutuhkan orang dan upaya riset. Jika Anda tertarik, hubungi kami. Terima kasih banyak telah mengundang kami, dan terima kasih juga atas semua pekerjaan yang Anda lakukan untuk Ethereum.

**Julian Ma:** Hanya untuk menambahkan, saya harap kami membuat beberapa orang antusias dengan FOCIL. Jika Anda antusias, beri tahu kami. Dan jika masih ada beberapa pertanyaan yang Anda miliki, kami akan dengan senang hati menjawabnya, dan semoga kami dapat meyakinkan Anda bahwa FOCIL memang jalan yang harus ditempuh. Terima kasih banyak. Sungguh menyenangkan bisa berada di sini, dan terima kasih telah menyelenggarakan sesi ini. Dan tentu saja, terima kasih juga kepada semua orang yang telah hadir.

### Kata penutup (59:52) {#closing-words-5952}

**Pooja Ranjan:** Terima kasih. Selesai sudah acara kita. Terima kasih yang sebesar-besarnya kepada Thomas dan Julian karena telah bergabung dengan kami hari ini dan membagikan wawasan mereka tentang EIP-7805. Terima kasih kepada seluruh peserta; pertanyaan-pertanyaan Anda sangat memotivasi dan informatif. Terima kasih telah menyaksikan. Jika Anda menikmati percakapan ini, pastikan untuk menyukai, berlangganan, dan membagikan episode ini kepada sesama penggemar Ethereum. Kami akan menghadirkan lebih banyak EIP dan perkembangan riset di PEEPanEIP. Sampai jumpa di lain waktu, teruslah mendengkur dengan pengetahuan dan menjelajahi Ethereum bersama Ethereum Cat Herders. Semoga sisa hari Anda menyenangkan.