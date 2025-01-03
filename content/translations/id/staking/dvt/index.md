---
title: Teknologi validator terdistribusi
description: Teknologi validator terdistribusi memungkinkan operasi terdistribusi validator Ethereum oleh banyak pihak.
lang: id
---

# Teknologi validator terdistribusi {#distributed-validator-technology}

Teknologi validator terdistribusi (DVT) adalah pendekatan terhadap keamanan validator yang menyebarkan manajemen kunci dan tanggung jawab penandatanganan ke berbagai pihak, untuk mengurangi titik kegagalan tunggal, dan meningkatkan ketangguhan validator.

Hal ini dilakukan dengan **memisahkan kunci pribadi** yang digunakan untuk mengamankan validator **di banyak komputer** yang diorganisir ke dalam sebuah "kelompok". Manfaat dari hal ini adalah menyulitkan bagi Penyerang untuk mendapatkan akses ke kunci, karena kunci tersebut tidak disimpan secara lengkap di satu mesin saja. Ini juga memungkinkan beberapa simpul untuk offline, karena penandatanganan yang diperlukan dapat dilakukan oleh sebagian mesin di setiap kelompok. Ini mengurangi satu titik kegagalan dari jaringan dan membuat seluruh set validator lebih kuat.

![Diagram yang menunjukkan bagaimana satu kunci validator dibagi menjadi beberapa bagian kunci dan didistribusikan ke beberapa simpul dengan komponen yang berbeda-beda.](./dvt-cluster.png)

## Mengapa kita membutuhkan DVT? {#why-do-we-need-dvt}

### Keamanan {#security}

Validator menghasilkan dua pasangan Kunci Publik-Pribadi: kunci Validator untuk berpartisipasi dalam Konsensus dan kunci penarikan untuk mengakses dana. Sementara validator dapat mengamankan kunci penarikan di penyimpanan dingin, kunci pribadi validator harus daring 24/7. Jika kunci pribadi validator disusupi, penyerang dapat mengontrol validator, yang berpotensi menyebabkan pemotongan atau hilangnya ETH penaruh. DVT dapat membantu mengurangi risiko ini. Begini caranya:

Dengan menggunakan DVT, penaruh dapat berpartisipasi dalam penaruhan sambil menyimpan kunci pribadi validator di penaruhan dingin. Ini dicapai dengan mengenkripsi kunci validator lengkap asli dan kemudian membaginya menjadi pembagian kunci. Pembagian kunci langsung daring dan didistribusikan ke beberapa simpul yang memungkinkan operasi validator terdistribusi. Ini dimungkinkan karena validator Ethereum menggunakan tanda tangan BLS yang bersifat aditif, artinya kunci lengkap dapat direkonstruksi dengan menjumlahkan bagian-bagian komponennya. Hal ini memungkinkan penaruh untuk menyimpan kunci validator 'master' asli lengkap dengan aman secara offline.

### Tidak ada titik kegagalan tunggal {#no-single-point-of-failure}

Ketika sebuah validator dibagi di antara beberapa operator dan mesin, validator tersebut dapat menahan kegagalan perangkat keras dan perangkat lunak individu tanpa menjadi offline. Risiko kegagalan juga dapat dikurangi dengan menggunakan beragam konfigurasi perangkat keras dan perangkat lunak di seluruh simpul dalam sebuah kelompok. Ketahanan ini tidak tersedia untuk konfigurasi validator simpul tunggal - ini berasal dari lapisan DVT.

Jika salah satu komponen mesin dalam kelompok turun (misalnya, jika ada empat operator dalam kelompok validator dan satu menggunakan klien tertentu yang memiliki bug), yang lain memastikan bahwa validator terus berjalan.

### Desentralisasi {#decentralization}

Skenario ideal untuk Ethereum adalah memiliki validator yang dioperasikan secara independen sebanyak mungkin. Namun, beberapa penyedia penaruhan telah menjadi sangat populer dan menyumbang sebagian besar dari total ETH yang dipertaruhkan di jaringan. DVT dapat memungkinkan operator ini ada sambil mempertahankan desentralisasi taruhan. Ini karena kunci untuk setiap validator didistribusikan di banyak mesin dan akan membutuhkan kolusi yang jauh lebih besar bagi validator untuk berubah menjadi berbahaya.

Tanpa DVT, lebih mudah bagi penyedia penaruhan untuk hanya mendukung satu atau dua konfigurasi klien untuk semua validator mereka, meningkatkan dampak bug klien. DVT dapat digunakan untuk menyebarkan risiko di beberapa konfigurasi klien dan perangkat keras yang berbeda, menciptakan ketahanan melalui keragaman.

**DVT menawarkan manfaat berikut untuk Ethereum:**

1. **Desentralisasi** konsensus bukti taruhan Ethereum
2. Memastikan **ketersediaan** jaringan
3. Menciptakan **toleransi kesalahan** validator
4. Operasi validator **dengan minimal kepercayaan**
5. **Risiko Pemotongan yang diminimalkan** dan waktu henti
6. **Meningkatkan keragaman** (klien, pusat data, lokasi, regulasi, dll.)
7. **Keamanan yang ditingkatkan** manajemen kunci validator

## Bagaimana cara kerja DVT? {#how-does-dvt-work}

Solusi DVT berisi komponen-komponen berikut:

- **[Pembagian rahasia Shamir](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** - Validator menggunakan [kunci BLS](https://en.wikipedia.org/wiki/BLS_digital_signature). Masing-masing "pembagian kunci" BLS ("key shares") dapat digabungkan menjadi satu kunci agregat tunggal (tanda tangan). Di DVT, kunci pribadi untuk validator adalah tanda tangan BLS gabungan dari setiap operator di kelompok.
- **[Skema tanda tangan ambang batas](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** - Menentukan jumlah pembagian kunci individu yang diperlukan untuk tugas penandatanganan, misalnya, 3 dari 4.
- **[Generasi kunci terdistribusi (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** - Proses kriptografi yang menghasilkan pembagian kunci dan digunakan untuk mendistribusikan pembagian kunci validator yang ada atau baru ke simpul dalam sebuah kelompok.
- **[Multiparty computation (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** - Kunci validator lengkap dibuat secara rahasia menggunakan komputasi multipihak. Kunci lengkap tidak pernah diketahui oleh operator individu mana pun — mereka hanya pernah tahu bagian mereka sendiri ("bagian" mereka).
- **Protokol konsensus** - Protokol konsensus memilih satu simpul untuk menjadi pengusul blok. Mereka berbagi blok dengan simpul lain dalam kelompok, yang menambahkan pembagian kunci mereka ke tanda tangan agregat. Ketika cukup banyak pembagian kunci yang telah dikumpulkan, blok tersebut diusulkan di Ethereum.

Validator terdistribusi memiliki toleransi kesalahan bawaan dan dapat terus berjalan bahkan jika beberapa simpul individu offline. Ini berarti bahwa kelompok tangguh meskipun beberapa simpul di dalamnya ternyata jahat atau malas.

## Kasus penggunaan DVT {#dvt-use-cases}

DVT memiliki implikasi signifikan bagi industri penaruhan yang lebih luas:

### Penaruh solo {#solo-stakers}

DVT juga memungkinkan penaruhan non-kustodial dengan memungkinkan Anda mendistribusikan kunci validator ke seluruh simpul jarak jauh sambil tetap menjaga kunci sepenuhnya offline. Ini berarti penaruh di beranda tidak selalu perlu mengeluarkan biaya untuk perangkat keras, sementara mendistribusikan pembagian kunci dapat membantu memperkuat mereka dari potensi peretasan.

### Taruhan sebagai layanan (SaaS) {#saas}

Operator (seperti pool penaruhanl dan penaruh institusional) yang mengelola banyak validator dapat menggunakan DVT untuk mengurangi risiko mereka. Dengan mendistribusikan infrastruktur, mereka bisa menambahkan redudansi pada operasional mereka dan mendiversifikasi jenis perangkat keras yang digunakan.

DVT berbagi tanggung jawab untuk manajemen kunci di berbagai simpul, yang berarti beberapa biaya operasional juga dapat dibagi. DVT juga dapat mengurangi risiko operasional dan biaya asuransi bagi penyedia penaruhan.

### Kolam taruhan {#staking-pools}

Karena pengaturan validator standar, pool penaruhan dan penyedia penaruhan likuid dipaksa untuk memiliki tingkat kepercayaan operator tunggal yang berbeda-beda karena keuntungan dan kerugian disosialisasikan di seluruh pool. Mereka juga bergantung pada operator untuk melindungi kunci penandatanganan, karena hingga saat ini, tidak ada pilihan lain bagi mereka.

Meskipun biasanya upaya dilakukan untuk menyebarkan risiko dengan mendistribusikan taruhan ke berbagai operator, setiap operator masih mengelola taruhan yang signifikan secara independen. Mengandalkan satu operator memiliki risiko yang sangat besar jika operator tersebut berkinerja buruk, mengalami downtime, mengalami gangguan, atau bertindak secara jahat.

Dengan memanfaatkan DVT, kepercayaan yang dibutuhkan dari operator berkurang secara signifikan. **Pool dapat memungkinkan operator memegang penaruhan tanpa perlu menjaga kunci validator** (karena hanya pembagian kunci yang digunakan). Ini juga memungkinkan penaruhan yang dikelola dapat didistribusikan di antara lebih banyak operator (misalnya, daripada memiliki satu operator yang mengelola 1000 validator, DVT memungkinkan validator tersebut dijalankan secara kolektif oleh beberapa operator). Konfigurasi operator yang beragam akan memastikan bahwa jika salah satu operator mengalami masalah, operator lain masih dapat memberikan kesaksian. Ini karena kunci untuk setiap validator didistribusikan di banyak mesin dan akan membutuhkan kolusi yang jauh lebih besar bagi validator untuk berubah menjadi jahat.

Manfaat lain dari meminimalkan kepercayaan pada satu operator adalah bahwa pool penaruhan dapat memungkinkan partisipasi operator yang lebih terbuka dan tanpa izin. Dengan melakukannya, layanan dapat mengurangi risiko mereka dan mendukung desentralisasi Ethereum dengan menggunakan kumpulan operator yang disusun dan tanpa izin, misalnya, dengan menggabungkan penaruh di beranda atau yang lebih kecil dengan yang lebih besar.

## Kekurangan potensial penggunaan DVT {#potential-drawbacks-of-using-dvt}

- **Komponen tambahan** - memperkenalkan sebuah simpul DVT menambahkan bagian lain yang mungkin bisa mengalami kerusakan atau rentan. Salah satu cara untuk mengurangi dampak ini adalah dengan berupaya memiliki beberapa implementasi dari simpul DVT, yang berarti memiliki beberapa klien DVT (mirip dengan adanya beberapa klien untuk lapisan konsensus dan eksekusi).
- **Biaya operasional** - karena DVT mendistribusikan validator di antara beberapa pihak, diperlukan lebih banyak simpul untuk operasi daripada hanya satu simpul, yang mengakibatkan peningkatan biaya operasional.
- **Potensi peningkatan keterlambatan** - karena DVT menggunakan protokol konsensus untuk mencapai kesepakatan antara beberapa simpul yang mengoperasikan validator, ini berpotensi memperkenalkan peningkatan keterlambatan.

## Bacaan Lebih Lanjut {#further-reading}

- [Spesifikasi validator terdistribusi Ethereum (tingkat tinggi)](https://github.com/ethereum/distributed-validator-specs)
- [Spesifikasi teknis validator terdistribusi Ethereum](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Aplikasi demonstrasi pembagian rahasia Shamir](https://iancoleman.io/shamir/)
