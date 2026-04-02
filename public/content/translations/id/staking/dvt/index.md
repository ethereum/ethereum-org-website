---
title: Teknologi validator terdistribusi
description: Teknologi validator terdistribusi memungkinkan operasi terdistribusi dari validator Ethereum oleh banyak pihak.
lang: id
---

# Teknologi validator terdistribusi {#distributed-validator-technology}

Teknologi validator terdistribusi (DVT) adalah pendekatan terhadap keamanan validator yang menyebarkan manajemen kunci dan tanggung jawab penandatanganan ke berbagai pihak, untuk mengurangi titik kegagalan tunggal (single points of failure), dan meningkatkan ketahanan validator.

Hal ini dilakukan dengan **membagi kunci pribadi** yang digunakan untuk mengamankan validator **ke banyak komputer** yang diatur ke dalam sebuah "klaster". Manfaat dari hal ini adalah membuatnya sangat sulit bagi penyerang untuk mendapatkan akses ke kunci tersebut, karena kunci tidak disimpan secara penuh di satu mesin mana pun. Hal ini juga memungkinkan beberapa node untuk offline, karena penandatanganan yang diperlukan dapat dilakukan oleh sebagian mesin di setiap klaster. Ini mengurangi titik kegagalan tunggal dari jaringan dan membuat seluruh set validator menjadi lebih kuat.

![Diagram yang menunjukkan bagaimana satu kunci validator dibagi menjadi bagian-bagian kunci dan didistribusikan ke beberapa node dengan berbagai komponen.](./dvt-cluster.png)

## Mengapa kita membutuhkan DVT? {#why-do-we-need-dvt}

### Keamanan {#security}

Validator menghasilkan dua pasang kunci publik-pribadi: kunci validator untuk berpartisipasi dalam konsensus dan kunci penarikan untuk mengakses dana. Meskipun validator dapat mengamankan kunci penarikan di penyimpanan dingin (cold storage), kunci pribadi validator harus online 24/7. Jika kunci pribadi validator disusupi, penyerang dapat mengendalikan validator, yang berpotensi menyebabkan pemotongan atau hilangnya ETH milik staker. DVT dapat membantu memitigasi risiko ini. Berikut caranya:

Dengan menggunakan DVT, staker dapat berpartisipasi dalam mengunci sambil menyimpan kunci pribadi validator di penyimpanan dingin. Hal ini dicapai dengan mengenkripsi kunci validator asli yang utuh dan kemudian membaginya menjadi bagian-bagian kunci (key shares). Bagian-bagian kunci ini tetap online dan didistribusikan ke beberapa node yang memungkinkan operasi terdistribusi dari validator. Hal ini dimungkinkan karena validator [Ethereum](/) menggunakan tanda tangan BLS yang bersifat aditif, yang berarti kunci utuh dapat direkonstruksi dengan menjumlahkan bagian-bagian komponennya. Hal ini memungkinkan staker untuk menyimpan kunci validator 'master' asli yang utuh secara aman secara offline.

### Tidak ada titik kegagalan tunggal {#no-single-point-of-failure}

Ketika sebuah validator dibagi ke beberapa operator dan beberapa mesin, validator tersebut dapat menahan kegagalan perangkat keras dan perangkat lunak individual tanpa menjadi offline. Risiko kegagalan juga dapat dikurangi dengan menggunakan konfigurasi perangkat keras dan perangkat lunak yang beragam di seluruh node dalam sebuah klaster. Ketahanan ini tidak tersedia untuk konfigurasi validator node tunggal - ini berasal dari lapisan DVT.

Jika salah satu komponen mesin dalam sebuah klaster mati (misalnya, jika ada empat operator dalam klaster validator dan salah satunya menggunakan klien tertentu yang memiliki bug), yang lain memastikan bahwa validator tetap berjalan.

### Desentralisasi {#decentralization}

Skenario ideal untuk Ethereum adalah memiliki sebanyak mungkin validator yang dioperasikan secara independen. Namun, beberapa penyedia staking telah menjadi sangat populer dan menyumbang porsi yang substansial dari total ETH yang dikunci di jaringan. DVT dapat memungkinkan operator-operator ini untuk tetap ada sambil mempertahankan desentralisasi dari stake. Hal ini karena kunci untuk setiap validator didistribusikan ke banyak mesin dan akan membutuhkan kolusi yang jauh lebih besar agar sebuah validator berubah menjadi berbahaya.

Tanpa DVT, lebih mudah bagi penyedia staking untuk hanya mendukung satu atau dua konfigurasi klien untuk semua validator mereka, yang meningkatkan dampak dari bug klien. DVT dapat digunakan untuk menyebarkan risiko ke berbagai konfigurasi klien dan perangkat keras yang berbeda, menciptakan ketahanan melalui keragaman.

**DVT menawarkan manfaat berikut untuk Ethereum:**

1. **Desentralisasi** dari konsensus proof-of-stake Ethereum
2. Memastikan **keaktifan (liveness)** jaringan
3. Menciptakan **toleransi kesalahan** validator
4. Operasi validator yang **meminimalkan kepercayaan**
5. **Meminimalkan risiko pemotongan** dan waktu henti (downtime)
6. **Meningkatkan keragaman** (klien, pusat data, lokasi, regulasi, dll.)
7. **Peningkatan keamanan** manajemen kunci validator

## Bagaimana cara kerja DVT? {#how-does-dvt-work}

Solusi DVT berisi komponen-komponen berikut:

- **[Pembagian rahasia Shamir (Shamir's secret sharing)](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** - Validator menggunakan [kunci BLS](https://en.wikipedia.org/wiki/BLS_digital_signature). "Bagian kunci" ("key shares") BLS individual dapat digabungkan menjadi satu kunci agregat (tanda tangan). Dalam DVT, kunci pribadi untuk sebuah validator adalah gabungan tanda tangan BLS dari setiap operator di dalam klaster.
- **[Skema tanda tangan ambang batas (Threshold signature scheme)](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** - Menentukan jumlah bagian kunci individual yang diperlukan untuk tugas penandatanganan, mis., 3 dari 4.
- **[Pembuatan kunci terdistribusi (Distributed key generation/DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** - Proses kriptografi yang menghasilkan bagian-bagian kunci dan digunakan untuk mendistribusikan bagian dari kunci validator yang sudah ada atau yang baru ke node-node dalam sebuah klaster.
- **[Komputasi multipihak (Multiparty computation/MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** - Kunci validator utuh dihasilkan secara rahasia menggunakan komputasi multipihak. Kunci utuh tidak pernah diketahui oleh operator individu mana pun—mereka hanya mengetahui bagian mereka sendiri ("bagian" mereka).
- **Protokol konsensus** - Protokol konsensus memilih satu node untuk menjadi pengusul blok. Mereka membagikan blok tersebut dengan node lain di dalam klaster, yang menambahkan bagian kunci mereka ke tanda tangan agregat. Ketika bagian kunci yang cukup telah diagregasi, blok tersebut diusulkan di Ethereum.

Validator terdistribusi memiliki toleransi kesalahan bawaan dan dapat terus berjalan bahkan jika beberapa node individual menjadi offline. Ini berarti bahwa klaster tersebut tangguh bahkan jika beberapa node di dalamnya ternyata berbahaya atau malas.

## Kasus penggunaan DVT {#dvt-use-cases}

DVT memiliki implikasi yang signifikan bagi industri staking yang lebih luas:

### Solo staker {#solo-stakers}

DVT juga memungkinkan mengunci non-kustodian dengan memungkinkan Anda untuk mendistribusikan kunci validator Anda ke seluruh node jarak jauh sambil menjaga kunci utuh sepenuhnya offline. Ini berarti staker rumahan tidak perlu mengeluarkan biaya untuk perangkat keras, sementara mendistribusikan bagian kunci dapat membantu memperkuat mereka terhadap potensi peretasan.

### Staking sebagai layanan (SaaS) {#saas}

Operator (seperti kolam staking dan staker institusional) yang mengelola banyak validator dapat menggunakan DVT untuk mengurangi risiko mereka. Dengan mendistribusikan infrastruktur mereka, mereka dapat menambahkan redundansi pada operasi mereka dan mendiversifikasi jenis perangkat keras yang mereka gunakan.

DVT membagi tanggung jawab untuk manajemen kunci ke beberapa node, yang berarti beberapa biaya operasional juga dapat dibagi. DVT juga dapat mengurangi risiko operasional dan biaya asuransi untuk penyedia staking.

### Kolam staking {#staking-pools}

Karena pengaturan validator standar, kolam staking dan penyedia liquid staking terpaksa memiliki tingkat kepercayaan operator tunggal yang bervariasi karena keuntungan dan kerugian disosialisasikan ke seluruh kolam. Mereka juga bergantung pada operator untuk menjaga kunci penandatanganan karena, hingga saat ini, belum ada pilihan lain bagi mereka.

Meskipun secara tradisional upaya dilakukan untuk menyebarkan risiko dengan mendistribusikan stake ke beberapa operator, setiap operator masih mengelola stake yang signifikan secara independen. Mengandalkan satu operator menimbulkan risiko yang sangat besar jika mereka berkinerja buruk, mengalami waktu henti (downtime), disusupi, atau bertindak jahat.

Dengan memanfaatkan DVT, kepercayaan yang dibutuhkan dari operator berkurang secara signifikan. **Kolam dapat memungkinkan operator untuk memegang stake tanpa perlu hak asuh (custody) atas kunci validator** (karena hanya bagian kunci yang digunakan). Hal ini juga memungkinkan stake yang dikelola untuk didistribusikan di antara lebih banyak operator (misalnya, alih-alih memiliki satu operator yang mengelola 1000 validator, DVT memungkinkan validator tersebut dijalankan secara kolektif oleh beberapa operator). Konfigurasi operator yang beragam akan memastikan bahwa jika satu operator mati, yang lain masih dapat melakukan pengesahan. Hal ini menghasilkan redundansi dan diversifikasi yang mengarah pada kinerja dan ketahanan yang lebih baik, sekaligus memaksimalkan hadiah.

Manfaat lain dari meminimalkan kepercayaan operator tunggal adalah bahwa kolam staking dapat memungkinkan partisipasi operator yang lebih terbuka dan tanpa izin. Dengan melakukan ini, layanan dapat mengurangi risiko mereka dan mendukung desentralisasi Ethereum dengan menggunakan kumpulan operator yang dikurasi maupun yang tanpa izin, misalnya, dengan memasangkan staker rumahan atau yang lebih kecil dengan staker yang lebih besar.

## Potensi kelemahan menggunakan DVT {#potential-drawbacks-of-using-dvt}

- **Komponen tambahan** - memperkenalkan node DVT menambahkan bagian lain yang mungkin bisa rusak atau rentan. Cara untuk memitigasi hal ini adalah dengan mengupayakan beberapa implementasi node DVT, yang berarti beberapa klien DVT (sama seperti ada beberapa klien untuk lapisan konsensus dan lapisan eksekusi).
- **Biaya operasional** - karena DVT mendistribusikan validator di antara beberapa pihak, ada lebih banyak node yang diperlukan untuk operasi alih-alih hanya satu node, yang menyebabkan peningkatan biaya operasional.
- **Potensi peningkatan latensi** - karena DVT menggunakan protokol konsensus untuk mencapai konsensus di antara beberapa node yang mengoperasikan sebuah validator, hal ini berpotensi menyebabkan peningkatan latensi.

## Bacaan Lebih Lanjut {#further-reading}

- [Spesifikasi validator terdistribusi Ethereum (tingkat tinggi)](https://github.com/ethereum/distributed-validator-specs)
- [Spesifikasi teknis validator terdistribusi Ethereum](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Aplikasi demo pembagian rahasia Shamir](https://iancoleman.io/shamir/)