---
title: "Penjelasan tentang staking ulang"
description: "Penjelasan tentang staking ulang, yang menggunakan ETH yang sudah di-stake untuk memberikan keamanan bagi protokol dan layanan tambahan di luar lapisan dasar Ethereum."
lang: id
youtubeId: "rOJo7VwPh7I"
uploadDate: 2024-02-05
duration: "0:12:33"
educationLevel: intermediate
topic:
  - "staking ulang"
  - "keamanan"
format: explainer
author: CBER Forum
breadcrumb: "Staking Ulang"
---

Sebuah presentasi oleh **Mike Neuder** di acara CBER Forum yang membahas bagaimana staking ulang bekerja. Presentasi ini mendefinisikan self-staking, delegated staking, staking ulang asli (native) dan non-asli (non-native), mekanisme staking likuid dan token staking ulang likuid, serta bagaimana pemotongan (slashing) berinteraksi dengan posisi yang di-stake ulang.

*Transkrip ini adalah salinan yang dapat diakses dari [transkrip video asli](https://www.youtube.com/watch?v=rOJo7VwPh7I) yang diterbitkan oleh CBER Forum. Transkrip ini telah sedikit diedit agar lebih mudah dibaca.*

#### Pengantar (0:00) {#introduction-000}

Halo semuanya, saya Mike. Saya akan berbicara tentang LRT dan LST. LRT — apakah staking ulang adalah staking yang baru? Saya akan mulai dengan pertanyaan kedua dan menggunakannya untuk mendorong diskusi tentang LST dan LRT, serta mendefinisikan apa itu. Ini sebagian besar adalah presentasi grafis, jadi semoga kita bisa mulai dari awal dan membangun pemahaman bersama-sama.

Garis besar singkat: mulai dari awal, kita akan mendefinisikan dua mode staking. Pertama adalah self-staking, kedua adalah delegated staking. Kemudian kita akan masuk ke konsep staking ulang dan mendefinisikannya. Ada empat model berbeda yang ingin saya eksplorasi — menggunakan pemisahan mandiri dan terdelegasi, lalu berfokus pada staking ulang asli versus staking ulang non-asli. Kemudian kita akan membahas likuidifikasi, berbicara tentang token likuid — token staking likuid (LST) dan token staking ulang likuid (LRT). Kita akan mendorong hal ini dengan melihat pemotongan dan staking ulang, lalu kedua jenis token tersebut. Terakhir, kita akan menyelesaikannya dengan beberapa data seputar staking seperti yang ada saat ini di Ethereum.

#### Self-staking (0:48) {#self-staking-048}

Mulai dari awal, kita memiliki staking di mana Alice melakukannya sendiri. Dia berinteraksi langsung dengan protokol, memasukkan stake ke dalam protokol, dan dia diberi imbalan karena melakukannya melalui penerbitan token asli. Dalam kasus Ethereum, Alice men-stake 32 ETH dan mendapatkan imbalan dalam bentuk ETH karena berpartisipasi dalam konsensus.

Ada dua hal yang perlu difokuskan di sini. Pertama, staking berfungsi sebagai mekanisme Anti-Sybil ini — Anda tidak dapat menipu jaringan dengan mengatakan bahwa Anda memiliki banyak identitas karena setiap identitas membutuhkan biaya sejumlah tertentu dari pasokan token yang tetap ini. Kedua adalah kolateral yang berisiko — ini adalah aturan protokol dalam hal pemotongan. Jika Alice berperilaku buruk menurut beberapa spesifikasi yang didefinisikan dengan sangat baik, protokol akan mengambil modalnya dan menghukumnya karena melakukan hal tersebut.

#### Delegated staking (2:52) {#delegated-staking-252}

Delegated staking menambahkan lapisan lain di tengah antara Alice dan protokol. Alice sekarang mendelegasikan kepada Bob, yang melakukan stake ke protokol Ethereum. Imbalan dikirim ke Bob, dan imbalan dikurangi biaya diteruskan ke Alice. Ini adalah versi paling sederhana dari delegated staking — Alice tidak ingin menjalankan perangkat lunak itu sendiri, mungkin dia tidak memiliki 32 ETH penuh, atau tidak memiliki perangkat keras atau keahlian teknis untuk menjalankan validator.

Ada banyak mode berbeda dari pendelegasian ini pada berbagai tingkat kepercayaan. Versi yang paling dipercaya adalah kustodial — Anda mengirim ETH Anda ke Coinbase dan berkata "lakukan stake atas nama saya." Anda secara efektif memercayai mereka sepenuhnya karena mereka mengkustodi aset atas nama Anda. Ada versi non-kustodial tetapi diatur oleh DAO di mana Anda mendelegasikan stake Anda kepada seseorang yang ditentukan oleh DAO yang memberikan suara tentang siapa yang berhak menjalankan node — ini adalah staking bergaya Lido. Yang ketiga adalah versi minim kepercayaan di mana Alice dan Bob sama-sama memberikan sejumlah kolateral. Alice mensubsidi sisa kolateral Bob, dan jika Bob berperilaku buruk dan dipotong, kolateralnya adalah bagian pertama yang dihapus. Saya mengatakan "minim kepercayaan" dan bukan "tanpa kepercayaan" karena apa pun yang terjadi, ada kemungkinan di mana kolateral Alice sepenuhnya terhapus tergantung pada apa yang dilakukan Bob.

#### Self-restaking dengan ETH asli (4:42) {#self-restaking-with-native-eth-442}

Sekarang kita dapat berbicara tentang apa itu staking ulang. Ini adalah konsep yang sama sekali baru — ini telah ada sejak Sreeram dan EigenLayer memperkenalkan istilah tersebut mungkin satu setengah atau dua tahun yang lalu.

Dalam model ini, Alice melakukan hal yang sama seperti yang dia lakukan sebelumnya — dia mengirimkan stake-nya ke protokol Ethereum dan mendapatkan imbalan karena berpartisipasi dalam konsensus. Sekarang kita memiliki protokol baru — sebut saja "Retheum" — tempat Alice melakukan staking ulang. Hal penting di sini adalah dia menggunakan token yang sama yang dia stake di protokol Ethereum untuk mengamankan protokol kedua ini.

Dia mendapatkan imbalan untuk itu. Ini tampaknya bagus — Alice sekarang berpotensi memiliki imbalan ganda untuk jumlah stake yang sama. Namun risikonya adalah modal yang telah dia stake di kedua protokol sekarang dibebani oleh aturan kedua protokol tersebut. Jika Alice berperilaku buruk di Ethereum, dia bisa kehilangan modalnya karena dipotong. Jika dia berperilaku buruk di "Retheum," dia juga bisa dipotong. Dengan imbal hasil tambahan datang tanggung jawab tambahan — perilaku protokol yang diamanatkan dan dapat dihukum dengan cara lebih lanjut jika Anda membebani token staking Anda di banyak protokol yang berbeda.

#### Delegated restaking asli (8:28) {#delegated-native-restaking-828}

Versi kedua adalah delegated restaking dengan ETH asli. Alice melakukan staking dengan Ethereum, dan sekarang dia ingin menggunakan Bob untuk mendelegasikan stake-nya ke protokol "Retheum". Dia mendelegasikan kepada Bob, Bob melakukan staking ulang, protokol menerbitkan imbalan kepada Bob, dan Bob menerbitkan imbalan dikurangi biaya kepada Alice.

Di bawah model ini, 32 ETH dalam protokol Ethereum bertanggung jawab atas tindakan Alice dan Bob — dua orang yang berpotensi membuat ETH ini dipotong. Token tersebut dibebani oleh dua set aturan protokol yang berbeda.

**Pertanyaan audiens:** Ketika Anda men-stake ETH di protokol Ethereum, protokol harus memberi Anda sesuatu yang kemudian Anda tunjukkan — apakah sesuatu itu?

Dalam versi asli ini, Alice melakukan stake dan memiliki apa yang disebut kredensial penarikan dari ekosistem Ethereum. Kredensial penarikan tersebut dapat diarahkan ke kontrak di Ethereum yang menangani lapisan kedua dari staking. Itu adalah kontrak yang mengontrol aset ketika Anda menariknya dari Ethereum — ini seperti kustodi tanpa kepercayaan dalam kontrak pintar yang memberlakukan lapisan kedua dari hukuman pemotongan.

Mengapa ini disebut "asli?" Karena Alice masih berinteraksi langsung dengan Ethereum — stake-nya adalah 32 ETH yang dia miliki, digunakan untuk mengamankan lapisan konsensus Ethereum.

#### Staking ulang non-asli (10:57) {#non-native-restaking-1057}

Self-restaking dalam pengaturan non-asli: Alice hanya berinteraksi dengan protokol "Retheum". Dia tidak menjalankan node di Ethereum. Dia melakukan staking ulang — meskipun saya menaruh "ulang" dalam tanda kutip karena dia tidak benar-benar melakukan staking ulang, itu adalah staking pada awalnya. Satu-satunya alasan ini disebut staking ulang adalah karena ini terjadi melalui protokol yang juga memfasilitasi jenis staking ulang lainnya.

Dia mengambil token non-asli — ini bisa berupa USDC, stablecoin euro, wrapped Bitcoin, apa pun — dia menyediakannya sebagai keamanan ekonomi dan ketahanan Sybil ke protokol dan mendapatkan imbalan. Ini mendefinisikan ulang staking ulang sebagai pasar untuk kepercayaan terdesentralisasi, di mana kepercayaan mengacu pada nilai ekonomi dari modal yang berisiko.

Delegated restaking dengan token non-asli mengikuti pola yang sama — Alice mendelegasikan melalui Bob dan menerima imbalan dikurangi biaya.

#### Pemotongan dan staking ulang (13:55) {#slashing-and-restaking-1355}

Sebelum kita masuk ke Likuiditas, mari kita bicara tentang pemotongan. Dalam mode pemotongan normal, Alice melakukan staking di protokol Ethereum. Jika dia melakukan sesuatu yang dianggap salah oleh protokol — misalnya, ekivokasi, di mana dia menggunakan kunci kriptografinya untuk menandatangani dua potong informasi yang saling bertentangan — itu adalah kesalahan objektif. Semua orang dapat memverifikasi bahwa kedua tanda tangan ditandatangani oleh Alice, dan itu adalah bukti yang cukup untuk memotong tokennya.

Bagaimana staking ulang dan pemotongan berinteraksi? Dalam versi paling sederhana — self-restaking dengan aset asli — Alice melakukan stake ke Ethereum dan juga melakukan staking ulang melalui "Retheum." Jika Alice terus melakukan pekerjaannya di protokol "Retheum" tetapi melakukan ekivokasi di Ethereum, sekarang kita punya masalah: dia dipotong di Ethereum, tetapi "Retheum" belum melihat apa pun yang dapat dikaitkan dengannya yang salah menurut aturan mereka. Harus ada komunikasi antara kedua protokol tersebut.

Arah komunikasi ini sebenarnya cukup mudah karena "Retheum" adalah kontrak pintar di Ethereum — ia dapat membaca dari state Ethereum dan mengatakan "validator ini telah dipotong menurut Ethereum," jadi pada protokol tingkat kedua, Alice juga dipotong.

Arah sebaliknya lebih sulit. Jika Alice dipotong di platform staking ulang, Ethereum perlu diberi tahu. Tetapi Ethereum sengaja tidak menyadari segala sesuatu yang terjadi pada lapisan kontraknya dalam hal mekanisme konsensus.

**Pertanyaan audiens:** Mengapa itu penting? Ethereum membutuhkan stake untuk apa yang dilakukannya, tetapi jumlah staking ulang adalah turunan dari aslinya.

Masalahnya adalah jika Alice dipotong di platform staking ulang, dia sebenarnya tidak memiliki stake itu lagi. Dia dapat melakukan apa pun yang dia inginkan di protokol Ethereum tanpa ada modal aktual yang berisiko — yang mana merupakan tujuan utama dari memiliki stake sejak awal. Ini seperti Anda menggunakan uang untuk dua hal, uang itu menghilang pada satu hal, dan hal lainnya harus menyadari bahwa uang itu bukan lagi milik Anda. Itu masih memiliki nilai ekonomi dalam arti tertentu, tetapi Anda tidak mengendalikannya — jadi Anda tidak peduli apa yang terjadi padanya karena itu sudah hilang.