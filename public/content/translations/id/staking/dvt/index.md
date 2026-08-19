---
title: Teknologi validator terdistribusi
description: Teknologi validator terdistribusi (DVT) memungkinkan operasi terdistribusi dari sebuah validator Ethereum oleh beberapa pihak.
lang: id
template: staking
sidebarDepth: 2
summaryPoints:
  - Membagi kunci penandatanganan validator ke beberapa mesin dan operator, menghilangkan titik kegagalan tunggal
  - Menjaga validator tetap online meskipun terjadi kegagalan perangkat keras, perangkat lunak, atau operator secara individu
  - Infrastruktur produksi yang digunakan saat ini oleh pelaku staking mandiri, layanan staking, dan staking gabungan
---

## Apa itu teknologi validator terdistribusi? {#what-is-dvt}

Teknologi validator terdistribusi (DVT) adalah pendekatan terhadap keamanan validator yang menyebarkan manajemen kunci dan tanggung jawab penandatanganan ke beberapa pihak, untuk mengurangi titik kegagalan tunggal dan meningkatkan ketahanan validator.

DVT mendistribusikan manajemen kunci dan penandatanganan dengan **membagi kunci privat** yang digunakan untuk mengamankan validator **ke banyak komputer** yang diatur dalam sebuah "klaster". Melakukan hal ini memungkinkan beberapa node di dalam klaster untuk offline sambil tetap menjaga node validator aktif, karena pekerjaan validasi yang diperlukan dapat dilakukan oleh sebagian mesin di setiap klaster. Distribusi ini mengurangi titik kegagalan tunggal, membuat validator menjadi lebih tangguh. Manfaat tambahan dari distribusi penandatanganan DVT adalah membuatnya sangat sulit bagi penyerang untuk mendapatkan akses ke kunci, karena kunci tersebut tidak disimpan secara utuh di satu mesin mana pun.

![A Diagram showing how a single validator key is split into key shares and distributed to multiple nodes with varying components.](./dvt-cluster.png)

DVT bukanlah cara terpisah untuk melakukan staking. Ini adalah lapisan perangkat lunak yang dapat digunakan oleh pengaturan staking apa pun:
- [Pelaku staking mandiri](/staking/solo/) dapat bekerja sama untuk menjalankan validator bersama-sama, atau seorang pelaku staking mandiri dapat menggunakan DVT untuk menambah ketahanan pada pengaturan staking mandiri mereka.
- [Layanan staking](/staking/saas/) dan [staking gabungan](/staking/pools/) dapat menggunakan DVT untuk menambah ketahanan dan memperkuat infrastruktur staking mereka, atau untuk mendistribusikan operasi validator ke banyak operator independen.

## Mengapa kita membutuhkan DVT? {#why-do-we-need-dvt}

### Keamanan {#security}

Validator menghasilkan dua pasang kunci publik-privat: kunci validator untuk berpartisipasi dalam konsensus dan kunci penarikan untuk mengakses dana. Meskipun validator dapat mengamankan kunci penarikan di penyimpanan dingin (cold storage), kunci privat validator harus online 24/7 untuk menandatangani tugas yang diberikan kepada validator sepanjang waktu, seperti atestasi dan usulan blok. Menjaga kunci tetap online memaparkannya pada pencurian, dan DVT membatasi paparan tersebut: hanya bagian kunci (key shares) yang pernah online, tidak pernah kunci secara utuh.

Jika kunci privat validator disusupi, penyerang dapat mengendalikan validator, yang berpotensi menyebabkan pemotongan atau hilangnya ETH milik pelaku staking. DVT memitigasi risiko ini. Dengan DVT, kunci validator asli yang utuh dienkripsi dan dibagi menjadi bagian-bagian kunci. Bagian-bagian kunci tersebut hidup secara online, didistribusikan ke beberapa node yang mengoperasikan validator bersama-sama, sementara kunci 'master' yang utuh tetap offline dengan aman. Distribusi ini dimungkinkan karena validator [Ethereum](/) menggunakan tanda tangan BLS yang bersifat aditif, yang berarti kunci utuh dapat direkonstruksi dengan menjumlahkan bagian-bagian komponennya. Tanda tangan parsial yang dibuat dengan bagian-bagian kunci digabungkan menjadi sebuah tanda tangan yang valid untuk kunci utuh, sehingga kunci utuh itu sendiri tidak pernah dibutuhkan untuk penandatanganan sehari-hari. Ketika sebuah klaster menghasilkan kunci validator baru menggunakan pembuatan kunci terdistribusi, kunci privat yang utuh tidak pernah ada di satu mesin mana pun.

### Tidak ada titik kegagalan tunggal {#no-single-point-of-failure}

Ketika sebuah validator dibagi ke beberapa operator dan beberapa mesin, ia dapat menahan kegagalan perangkat keras dan perangkat lunak secara individu tanpa menjadi offline. Risiko kegagalan juga dapat dikurangi dengan menggunakan konfigurasi perangkat keras dan perangkat lunak yang beragam di seluruh node dalam sebuah klaster. Distribusi multi-operator tidak tersedia secara bawaan untuk konfigurasi validator node tunggal; ini berasal dari lapisan middleware DVT.

Jika salah satu komponen mesin dalam sebuah klaster mati (misalnya, jika ada empat operator dalam klaster validator dan salah satunya menggunakan klien tertentu yang memiliki bug), yang lain dapat memastikan bahwa validator tetap berjalan.

### Desentralisasi {#decentralization}

Skenario ideal untuk Ethereum adalah memiliki sebanyak mungkin validator yang dioperasikan secara independen. Namun, beberapa penyedia staking telah menjadi sangat populer dan menyumbang porsi yang substansial dari total ETH yang di-stake di jaringan. DVT dapat memungkinkan operator-operator ini untuk tetap ada sambil mempertahankan desentralisasi stake. Hal ini karena kunci untuk setiap validator didistribusikan ke banyak mesin dan akan membutuhkan kolusi yang jauh lebih besar agar sebuah validator berubah menjadi berbahaya.

Tanpa DVT, lebih mudah bagi penyedia staking untuk hanya mendukung satu atau dua konfigurasi klien untuk semua validator mereka, yang meningkatkan dampak dari bug klien. DVT dapat digunakan untuk menyebarkan risiko ke beberapa konfigurasi klien dan perangkat keras yang berbeda, menciptakan ketahanan melalui keberagaman.

**DVT menawarkan manfaat berikut untuk Ethereum:**

1. **Desentralisasi** dari konsensus Bukti Kepemilikan (PoS) Ethereum
2. Memastikan **keaktifan (liveness)** jaringan
3. Menciptakan **toleransi kesalahan** validator
4. Operasi validator yang **meminimalkan kepercayaan**
5. **Meminimalkan risiko pemotongan** dan waktu henti (downtime)
6. **Meningkatkan keberagaman** (klien, pusat data, lokasi, regulasi, dll.)
7. **Peningkatan keamanan** manajemen kunci validator

## Bagaimana cara kerja DVT? {#how-does-dvt-work}

Implementasi DVT biasanya berjalan sebagai perangkat lunak tambahan di setiap mesin dalam sebuah klaster. Perangkat lunak ini bertindak sebagai middleware, berada di antara klien validator node dan klien konsensusnya, di mana ia berkoordinasi dengan node lain di dalam klaster sehingga tugas validator ditandatangani secara kolektif.

Solusi DVT berisi komponen-komponen berikut:

- **[Pembagian rahasia Shamir (Shamir's secret sharing)](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** - Validator menggunakan [kunci BLS](https://en.wikipedia.org/wiki/BLS_digital_signature). Kunci privat validator dapat dibagi menjadi beberapa "bagian kunci," dan karena tanda tangan BLS bersifat aditif, tanda tangan parsial yang dibuat dengan bagian-bagian kunci tersebut dapat digabungkan menjadi satu tanda tangan yang valid untuk kunci validator utuh.
- **[Skema tanda tangan ambang batas (Threshold signature scheme)](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** - Menentukan jumlah bagian kunci individu yang diperlukan untuk tugas penandatanganan, mis., 3 dari 4.
- **[Pembuatan kunci terdistribusi (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** - Proses kriptografi yang menghasilkan bagian-bagian kunci dan digunakan untuk mendistribusikan bagian dari kunci validator yang sudah ada atau yang baru ke node-node dalam sebuah klaster.
- **[Komputasi multipihak (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** - Kunci validator utuh dihasilkan secara rahasia menggunakan komputasi multipihak. Kunci utuh tidak pernah diketahui oleh operator individu mana pun—mereka hanya mengetahui bagian mereka sendiri (bagian atau "share" mereka).
- **Protokol konsensus** - Protokol konsensus memilih satu node untuk menjadi pengusul blok. Mereka membagikan blok tersebut dengan node lain di dalam klaster, yang menambahkan bagian kunci mereka ke tanda tangan agregat. Ketika cukup banyak bagian kunci telah diagregasi, blok tersebut diusulkan di Ethereum.

Validator terdistribusi memiliki toleransi kesalahan bawaan dan dapat terus berjalan bahkan jika beberapa node individu menjadi offline. Klaster node validator tetap tangguh bahkan jika beberapa node di dalamnya ternyata berbahaya atau malas.

## DVT dalam produksi {#dvt-in-production}

Validator terdistribusi berjalan di Mainnet saat ini di seluruh staking mandiri, layanan, dan staking gabungan. Dua jaringan menyumbang sebagian besar aktivitas ini:

<ProductDisclaimer />

- **Obol** mengembangkan Charon, klien middleware DVT sumber terbuka yang memungkinkan sebuah klaster mesin mengoperasikan validator bersama-sama ("squad staking"). Grup melakukan pembuatan kunci terdistribusi dan mengonfigurasi klaster mereka melalui [DV Launchpad](https://docs.obol.org/learn/readme/launchpad) milik Obol. Klaster Obol digunakan dalam produksi oleh [protokol staking](/staking/pools/) dan [layanan staking](/staking/saas/), termasuk modul Simple DVT milik Lido dan program Operation Solo Staker milik EtherFi, yang mengikutsertakan operator rumahan ke dalam klaster yang toleran terhadap kesalahan.
- **SSV Network** adalah jaringan tanpa izin dari operator node independen. Kunci validator dibagi menjadi bagian-bagian kunci dan didistribusikan ke sekumpulan operator yang dipilih, yang melakukan tugas validator secara kolektif; tidak ada satu operator pun yang pernah memegang kunci secara utuh. Layanan staking dan staking gabungan menjalankan set validator besar di SSV, dan seperti Obol, ini digunakan oleh modul Simple DVT milik Lido.

## Kasus penggunaan DVT {#dvt-use-cases}

DVT memiliki implikasi signifikan bagi industri staking yang lebih luas:

### Pelaku staking mandiri {#solo-stakers}

DVT memungkinkan **squad staking**: sekelompok kecil orang, seperti teman, anggota komunitas, atau orang asing yang dikoordinasikan melalui launchpad, secara kolektif menjalankan satu validator di mesin mereka masing-masing. Ambang batas dari grup tersebut (misalnya, 3 dari 4) harus online agar validator dapat melakukan tugasnya, sehingga tidak ada waktu henti, kegagalan perangkat keras, atau kesalahan dari satu anggota pun yang membuat validator menjadi offline. Ketika kunci dibuat dengan pembuatan kunci terdistribusi, tidak ada anggota yang pernah memegang kunci penandatanganan secara utuh.

DVT juga memungkinkan staking non-kustodial dengan memungkinkan Anda mendistribusikan kunci validator Anda ke node jarak jauh sambil menjaga kunci utuh tetap offline sepenuhnya. Ini berarti pelaku staking tidak harus menjalankan perangkat keras mereka sendiri, dan mendistribusikan bagian-bagian kunci membantu melindungi dari potensi peretasan.

### Staking sebagai layanan (SaaS) {#saas}

Operator (seperti staking gabungan dan pelaku staking institusional) yang mengelola banyak validator dapat menggunakan DVT untuk mengurangi risiko mereka. Dengan mendistribusikan infrastruktur mereka, mereka dapat menambahkan redundansi pada operasi mereka dan mendiversifikasi jenis perangkat keras yang mereka gunakan.

DVT membagi tanggung jawab untuk manajemen kunci ke beberapa node, yang berarti beberapa biaya operasional juga dapat dibagi. DVT juga dapat mengurangi risiko operasional dan biaya asuransi untuk penyedia staking.

### Staking gabungan {#staking-pools}

Karena pengaturan validator standar, staking gabungan dan penyedia staking likuid secara historis harus menaruh kepercayaan yang signifikan pada setiap operator individu, karena keuntungan dan kerugian disosialisasikan ke seluruh gabungan (pool). Mereka juga bergantung pada operator untuk menjaga kunci penandatanganan karena, hingga adanya DVT, tidak ada pilihan lain bagi mereka.

Meskipun secara tradisional upaya dilakukan untuk menyebarkan risiko dengan mendistribusikan stake ke beberapa operator, setiap operator masih mengelola stake yang signifikan secara independen. Mengandalkan satu operator menimbulkan risiko yang sangat besar jika mereka berkinerja buruk, mengalami waktu henti, disusupi, atau bertindak jahat.

Dengan memanfaatkan DVT, kepercayaan yang dibutuhkan dari setiap operator individu dapat dikurangi. **Staking gabungan dapat memungkinkan operator untuk memegang stake tanpa perlu hak asuh (custody) atas kunci validator** (karena hanya bagian kunci yang digunakan). Ini juga memungkinkan stake yang dikelola untuk didistribusikan di antara lebih banyak operator (mis., alih-alih memiliki satu operator yang mengelola 1000 validator, DVT memungkinkan validator tersebut dijalankan secara kolektif oleh beberapa operator). Konfigurasi operator yang beragam membantu memastikan bahwa jika satu operator mati, yang lain masih dapat melakukan atestasi. Redundansi dan diversifikasi yang dihasilkan dapat mengarah pada kinerja dan ketahanan yang lebih baik, sekaligus memaksimalkan imbalan.

Manfaat lain dari meminimalkan kepercayaan pada operator tunggal adalah bahwa staking gabungan dapat memungkinkan partisipasi operator yang lebih terbuka dan tanpa izin. Beberapa staking gabungan melakukan ini dalam produksi saat ini. Klaster DVT multi-operator memungkinkan protokol memasangkan pelaku staking rumahan dan operator yang lebih kecil dengan operator profesional yang lebih besar, menggabungkan set operator yang dikurasi dan tanpa izin.

## Potensi kelemahan menggunakan DVT {#potential-drawbacks-of-using-dvt}

- **Komponen tambahan** - memperkenalkan node DVT menambahkan bagian lain yang mungkin bisa rusak atau rentan. Hal ini dimitigasi dengan memiliki beberapa implementasi perangkat lunak DVT, sama seperti ada beberapa klien untuk lapisan konsensus dan lapisan eksekusi.
- **Biaya operasional** - karena DVT mendistribusikan validator di antara beberapa pihak, ada lebih banyak node yang diperlukan untuk operasi alih-alih hanya satu node, yang menyebabkan peningkatan biaya operasional.
- **Potensi peningkatan latensi** - karena DVT menggunakan protokol konsensus untuk mencapai konsensus di antara beberapa node yang mengoperasikan validator, ini berpotensi menyebabkan peningkatan latensi.

## Pertanyaan yang sering diajukan {#faq}

<ExpandableCard title="Apakah saya memerlukan DVT untuk melakukan stake?" eventCategory="DVT" eventName="clicked do I need DVT to stake">
Tidak. Satu mesin yang menjalankan klien validator berfungsi tanpa perangkat lunak DVT apa pun, dan ini tetap menjadi pengaturan staking rumahan yang umum. DVT adalah lapisan opsional yang menambahkan toleransi kesalahan dan menghilangkan titik kegagalan tunggal. Ini berguna jika Anda ingin validator Anda bertahan dari kegagalan mesin individu, atau jika Anda ingin berbagi tanggung jawab menjalankan validator dengan orang lain.
</ExpandableCard>

<ExpandableCard title="Apakah DVT membagi ETH atau kunci penarikan saya?" eventCategory="DVT" eventName="clicked does DVT split my ETH">
Tidak. DVT hanya membagi kunci _penandatanganan_ validator, yang digunakan untuk tugas konsensus seperti atestasi dan usulan blok. Stake Anda selalu dikendalikan oleh alamat penarikan yang ditetapkan untuk validator, yang tidak terpengaruh oleh DVT. Sejak peningkatan Pectra, pemegang alamat penarikan juga dapat memicu validator keluar secara langsung dari lapisan eksekusi, tanpa memerlukan kunci penandatanganan sama sekali.
</ExpandableCard>

<ExpandableCard title="Apa yang terjadi jika node dalam sebuah kluster offline?" eventCategory="DVT" eventName="clicked what happens if nodes go offline">
Selama ambang batas node tetap online (misalnya, 3 dari 4), validator terus melakukan tugasnya. Jika terlalu banyak node yang offline sekaligus, validator hanya akan menjadi offline dan kehilangan imbalan hingga cukup banyak node yang kembali, sama seperti validator offline lainnya. Menjadi offline bukanlah pelanggaran yang dapat dikenakan pemotongan (slashable).
</ExpandableCard>

<ExpandableCard title="Apakah sebuah kluster harus 3 dari 4?" eventCategory="DVT" eventName="clicked does a cluster have to be 3 of 4">
Tidak. "3 dari 4" hanyalah konfigurasi umum terkecil, dan ini digunakan sebagai contoh di seluruh halaman ini. Ukuran klaster dan ambang batas penandatanganan dipilih saat klaster dibuat.

Klaster biasanya diukur sehingga ambang batasnya adalah dua pertiga mayoritas super dari node, yang memungkinkan klaster tetap menandatangani sambil menoleransi anggota yang rusak atau offline. Klaster 4-node menandatangani dengan 3 dan menoleransi 1 kegagalan; 7 node menandatangani dengan 5 dan menoleransi 2; 10 node menandatangani dengan 7 dan menoleransi 3. Klaster yang lebih besar memberikan lebih banyak toleransi kesalahan dengan mengorbankan lebih banyak mesin untuk dijalankan dan lebih banyak koordinasi di antara mereka.

[Lebih lanjut tentang ukuran dan ketahanan klaster](https://docs.obol.org/next/learn/charon/cluster-configuration#cluster-size-and-resilience)
</ExpandableCard>

<ExpandableCard title="Apakah DVT sama dengan staking gabungan?" eventCategory="DVT" eventName="clicked is DVT the same as pooled staking">
Tidak. Staking gabungan menggabungkan ETH dari banyak orang untuk mendanai validator, dan merupakan salah satu dari beberapa [cara untuk melakukan staking](/staking/). DVT adalah infrastruktur untuk _mengoperasikan_ sebuah validator. Ini mendistribusikan penandatanganan satu validator ke beberapa mesin dan operator. Keduanya saling melengkapi; banyak staking gabungan menggunakan DVT untuk mendistribusikan set operator mereka, tetapi DVT itu sendiri tidak menggabungkan ETH milik siapa pun.
</ExpandableCard>

## Bacaan lebih lanjut {#further-reading}

- [Teknologi Validator Terdistribusi (DVT) Ethereum - Pengantar Lengkap](https://www.cyfrin.io/blog/full-introduction-to-ethereum-distributed-validator-technology-dvt) - Cyfrin
- [Apa itu DVT dan bagaimana hal itu meningkatkan staking di Ethereum?](https://blog.obol.org/what-is-dvt-and-how-does-it-improve-staking-on-ethereum/) - Obol
- [Spesifikasi validator terdistribusi Ethereum (tingkat tinggi)](https://github.com/ethereum/distributed-validator-specs)
- [Spesifikasi teknis validator terdistribusi Ethereum](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Dokumentasi Obol](https://docs.obol.org/)
- [Dokumentasi SSV Network](https://docs.ssv.network/)
- [Modul Simple DVT Lido](https://operatorportal.lido.fi/modules/simple-dvt-module)
- [Aplikasi demo pembagian rahasia Shamir](https://iancoleman.io/shamir/)