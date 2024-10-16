---
title: Menambahkan produk atau layanan taruhan
description: Kebijakan yang kami gunakan saat menambahkan produk atau layanan taruhan ke dalam ethereum.org
lang: id
---

# Menambahkan produk atau layanan staking {#adding-staking-products-or-services}

Kami ingin memastikan bahwa kami telah mencantumkan sumber daya terbaik serta menjaga pengguna tetap aman dan percaya diri.

Siapa saja bebas untuk menyarankan penambahan produk atau pelayanan di dalam ethereum.org. Jika ada yang terlewat, **[silakan beri tahu kami](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml)!**

Saat ini kami mencantumkan produk taruhan dan pelayanan dalam halaman berikut:

- [Penaruhan solo](/staking/solo/)
- [Penaruhan sebagai layanan](/staking/saas/)
- [Kolam taruhan](/staking/pools/)

Bukti taruhan di Beacon Chain telah aktif sejak 1 Desember 2020. Meskipun taruhan masih relatif baru, kami telah mencoba membuat kerangka kerja yang adil dan transparan untuk dipertimbangkan di ethereum.org tapi daftar kriteria akan berubah dan berkembang seiring waktu, dan pada akhirnya bergantung pada kebijakan dari tim web dari ethereum.org.

## Kerangka keputusan {#the-decision-framework}

Keputusan untuk mendaftarkan sebuah produk di etheteum.org tidak hanya bergantung pada satu faktor saja. Beberapa kriteria dipertimbangkan secara bersamaan saat memutuskan apakah suatu produk atau layanan akan dimasukkan dalam daftar. Semakin banyak kriteria yang dipenuhi, semakin besar pula peluang untuk terdaftar.

**Pertama, kategori produk atau layanan mana yang dimaksud?**

- Simpul atau perangkat klien
- Manajemen kunci
- Taruhan sebagai layanan (SaaS)
- Pool penaruhan

Saat ini, kami hanya mencantumkan produk atau layanan yang termasuk dalam kategori-kategori berikut.

### Kriteria untuk inklusi {#criteria-for-inclusion}

Pengajuan produk atau layanan staking akan dinilai berdasarkan kriteria berikut:

**Kapan proyek atau layanan ini diluncurkan?**

- Adakah informasi yang mendukung tentang kapan produk atau layanan ini mulai dapat diakses oleh publik?
- Ini digunakan untuk menentukan skor "battle tested" produk.

**Apakah proyek ini sedang aktif dipelihara?**

- Apakah ada tim aktif yang mengembangkan proyek ini? Siapa yang terlibat?
- Hanya produk yang dipelihara secara aktif yang akan dipertimbangkan.

**Apakah produk atau layanan tersebut bebas dari perantara tepercaya/manusia?**

- Langkah-langkah apa dalam perjalanan pengguna yang memerlukan kepercayaan kepada manusia untuk memegang kunci dana mereka atau mendistribusikan hadiah dengan benar?
- Ini digunakan untuk menentukan skor "trustless" dari produk atau layanan.

**Apakah proyek ini menyediakan informasi yang akurat dan dapat diandalkan?**

- Sangat penting bahwa situs web produk menampilkan informasi yang terkini, akurat, dan tidak menyesatkan, terutama jika berkaitan dengan protokol Ethereum atau teknologi terkait lainnya.
- Pengajuan yang mengandung informasi yang salah, detail yang sudah usang, atau pernyataan yang berpotensi menyesatkan tentang Ethereum atau topik terkait lainnya tidak akan terdaftar atau akan dihapus jika sudah terdaftar.

**Platform apa yang didukung?**

- mis. Linux, macOS, Windows, iOS, Android

#### Perangkat lunak dan kontrak pintar {#software-and-smart-contracts}

Untuk perangkat lunak atau kontrak pintar khusus yang terlibat:

**Apakah semuanya bersumber terbuka?**

- Proyek sumber terbuka harus memiliki repositori kode sumber yang tersedia untuk umum
- Ini digunakan untuk menentukan skor "sumber terbuka" dari produk.

**Apakah produk ini sudah keluar dari _beta_ pengembangan?**

- Di mana posisi produk dalam siklus pengembangannya?
- Produk dalam tahap beta tidak dipertimbangkan untuk dimasukkan ke ethereum.org

**Apakah perangkat lunak tersebut telah menjalani audit keamanan eksternal?**

- Jika belum, apakah ada rencana untuk melakukan audit eksternal?
- Ini digunakan untuk menentukan skor "audited" produk.

**Apakah proyek tersebut memiliki program bug bounty?**

- Jika tidak, apakah ada rencana untuk membuat program bounty untuk bug keamanan?
- Ini digunakan untuk menentukan skor "bug bounty" produk.

#### Simpul atau perangkat klien {#node-or-client-tooling}

Untuk produk perangkat lunak yang terkait dengan pengaturan, manajemen, atau migrasi simpul atau klien:

**Klien lapisan konsensus mana (mis. Lighthouse, Teku, Nimbus, Prysm) yang didukung?**

- Klien mana yang didukung? Apakah pengguna dapat memilih?
- Ini digunakan untuk menentukan skor "multi-client" produk.

#### Penaruhan sebagai layanan {#staking-as-a-service}

Untuk [daftar taruhan-sebagai-layanan](/staking/saas/) (mis. operasi simpul yang didelegasikan):

**Apa biaya yang terkait dengan penggunaan layanan tersebut?**

- Bagaimana struktur biayanya, mis. apakah ada biaya bulanan untuk layanan tersebut?
- Apakah ada persyaratan tambahan untuk taruhan?

**Apakah pengguna diharuskan untuk mendaftar akun?**

- Bisakah seseorang menggunakan layanan tersebut tanpa izin atau KYC?
- Ini digunakan untuk menentukan skor "permissionless" score.

**Siapa yang memegang kunci tanda tangan, dan kunci penarikan?**

- Kunci apa yang tetap dapat diakses oleh pengguna? Kunci apa yang diakses oleh layanan?
- Ini digunakan untuk menentukan skor "trustless" produk.

**Apa keberagaman klien dari simpul yang dioperasikan?**

- Berapa persen kunci validator yang dijalankan oleh mayoritas klien lapisan konsensus (CL)?
- Hingga edit terakhir, Prysm adalah klien lapisan konsensus yang dijalankan oleh mayoritas operator simpul, yang berpotensi berbahaya bagi jaringan. Jika ada klien CL yang saat ini digunakan oleh lebih dari 33% jaringan, kami meminta data terkait penggunaannya.
- Ini digunakan untuk menentukan skor "diverse client" produk.

#### Pool penaruhan {#staking-pool}

Untuk [layanan taruhan terkelompok](/staking/pools/):

**Berapa jumlah ETH minimum yang diperlukan untuk taruhan?**

- mis. 0.01 ETH

**Apa saja biaya atau persyaratan taruhan yang terlibat?**

- Apa saja biaya atau persyaratan staking yang terlibat?
- Apakah ada persyaratan tambahan untuk taruhan?

**Apakah ada token likuiditas?**

- Token apa saja yang terlibat? Bagaimana cara kerjanya? Apa saja akun kontrak?
- Ini digunakan untuk menentukan skor "liquidity token" produk.

**Apakah pengguna dapat berpartisipasi sebagai operator simpul?**

- Apa yang diperlukan untuk menjalankan klien validator menggunakan dana yang dikumpulkan?
- Apakah ini memerlukan izin dari individu, perusahaan, atau DAO?
- Ini digunakan untuk menentukan skor '"permissionless node" dari produk tersebut.

**Apa keberagaman klien dari operator simpul pool?**

- Berapa persen operator simpul yang dijalankan oleh mayoritas klien lapisan konsensus (CL)?
- Hingga edit terakhir, Prysm adalah klien lapisan konsensus yang dijalankan oleh mayoritas operator simpul, yang berpotensi berbahaya bagi jaringan. Jika ada klien CL yang saat ini digunakan oleh lebih dari 33% jaringan, kami meminta data terkait penggunaannya.
- Ini digunakan untuk menentukan skor "diverse client" produk.

### Kriteria lain: hal-hal yang diinginkan {#other-criteria}

**Antarmuka pengguna apa yang didukung?**

- mis. Aplikasi browser, aplikasi desktop, aplikasi seluler, CLI

**Untuk perangkat simpul, apakah perangkat lunak menyediakan cara yang mudah untuk beralih antara klien?**

- Bisakah pengguna dengan mudah dan aman mengganti klien menggunakan alat tersebut?

**Untuk SaaS, berapa banyak validator yang saat ini dioperasikan oleh layanan tersebut?**

- Ini memberi kami gambaran tentang jangkauan layanan Anda hingga saat ini.

## Bagaimana kami menampilkan hasil {#product-ordering}

Kriteria [untuk inklusi](#criteria-for-inclusion) di atas digunakan untuk menghitung skor kumulatif untuk setiap produk atau layanan. Ini digunakan sebagai cara untuk mengurutkan dan menampilkan produk yang memenuhi kriteria objektif tertentu. Semakin banyak kriteria yang dibuktikan, semakin tinggi peringkat suatu produk, dengan ikatan diacak saat pemuatan.

Logika kode dan bobot untuk kriteria ini saat ini terdapat dalam [komponen JavaScript ini](https://github.com/ethereum/ethereum-org-website/blob/dev/src/components/Staking/StakingProductsCardGrid.js#L350) di repositori kami.

## Tambahkan produk atau layanan Anda {#add-product}

Jika Anda ingin menambahkan produk atau layanan taruhan ke ethereum.org, buatlah isu di GitHub.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml">
  Buat isu
</ButtonLink>
