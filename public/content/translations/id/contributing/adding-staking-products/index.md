---
title: Menambahkan produk atau layanan staking
description: Kebijakan yang kami gunakan saat menambahkan produk atau layanan staking ke ethereum.org
lang: id
---

Kami ingin memastikan bahwa kami mencantumkan sumber daya terbaik yang memungkinkan sambil menjaga pengguna tetap aman dan percaya diri.

Siapa pun bebas menyarankan penambahan produk atau layanan staking di ethereum.org. Jika ada yang terlewatkan oleh kami, **[silakan sarankan](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml)!**

Saat ini kami mencantumkan produk dan layanan staking di halaman-halaman berikut:

- [Staking mandiri](/staking/solo/)
- [Staking sebagai layanan](/staking/saas/)
- [Pool staking](/staking/pools/)

Bukti Kepemilikan (PoS) di Rantai suar telah aktif sejak 1 Desember 2020. Meskipun staking masih relatif baru, kami telah mencoba membuat kerangka kerja yang adil dan transparan untuk dipertimbangkan di ethereum.org, tetapi kriteria pencantuman akan berubah dan berkembang seiring waktu, dan pada akhirnya merupakan kebijaksanaan tim situs web ethereum.org.

## Kerangka kerja keputusan {#the-decision-framework}

Keputusan untuk mencantumkan produk di ethereum.org tidak bergantung pada satu faktor saja. Berbagai kriteria dipertimbangkan bersama saat memutuskan untuk mencantumkan produk atau layanan. Semakin banyak kriteria ini yang terpenuhi, semakin besar kemungkinan produk tersebut untuk dicantumkan.

**Pertama, apa kategori produk atau layanan tersebut?**

- Perkakas node atau klien
- Manajemen kunci
- Staking sebagai layanan (SaaS)
- Pool staking

Saat ini, kami hanya mencantumkan produk atau layanan dalam kategori-kategori ini.

### Kriteria untuk pencantuman {#criteria-for-inclusion}

Pengajuan produk atau layanan staking akan dinilai berdasarkan kriteria berikut:

**Kapan proyek atau layanan tersebut diluncurkan?**

- Apakah ada bukti kapan produk atau layanan tersebut tersedia untuk publik?
- Ini digunakan untuk menentukan skor "teruji di lapangan" (battle tested) dari produk tersebut.

**Apakah proyek tersebut dipelihara secara aktif?**

- Apakah ada tim aktif yang mengembangkan proyek tersebut? Siapa saja yang terlibat?
- Hanya produk yang dipelihara secara aktif yang akan dipertimbangkan.

**Apakah produk atau layanan tersebut bebas dari perantara manusia/yang dipercaya?**

- Langkah apa saja dalam perjalanan pengguna yang mewajibkan kepercayaan pada manusia untuk memegang kunci dana mereka, atau untuk mendistribusikan hadiah dengan benar?
- Ini digunakan untuk menentukan skor "tanpa kepercayaan" dari produk atau layanan tersebut.

**Apakah proyek tersebut menyediakan informasi yang akurat dan dapat diandalkan?**

- Sangat penting bahwa situs web produk menampilkan informasi yang terkini, akurat, dan tidak menyesatkan, terutama jika berkaitan dengan protokol Ethereum atau teknologi terkait lainnya.
- Pengajuan yang mengandung misinformasi, detail yang kedaluwarsa, atau pernyataan yang berpotensi menyesatkan tentang Ethereum atau subjek relevan lainnya tidak akan dicantumkan atau akan dihapus jika sudah dicantumkan.

**Platform apa saja yang didukung?**

- mis., Linux, macOS, Windows, iOS, Android

#### Perangkat lunak dan kontrak pintar {#software-and-smart-contracts}

Untuk perangkat lunak kustom atau kontrak pintar apa pun yang terlibat:

**Apakah semuanya sumber terbuka (open source)?**

- Proyek sumber terbuka harus memiliki repositori kode sumber yang tersedia untuk publik
- Ini digunakan untuk menentukan skor "sumber terbuka" dari produk tersebut.

**Apakah produk tersebut sudah keluar dari pengembangan _beta_?**

- Di mana posisi produk tersebut dalam siklus pengembangannya?
- Produk dalam tahap beta tidak dipertimbangkan untuk dicantumkan di ethereum.org

**Apakah perangkat lunak tersebut telah menjalani audit keamanan eksternal?**

- Jika belum, apakah ada rencana untuk melakukan audit eksternal?
- Ini digunakan untuk menentukan skor "diaudit" dari produk tersebut.

**Apakah proyek tersebut memiliki program bug bounty?**

- Jika belum, apakah ada rencana untuk membuat bug bounty keamanan?
- Ini digunakan untuk menentukan skor "bug bounty" dari produk tersebut.

#### Perkakas node atau klien {#node-or-client-tooling}

Untuk produk perangkat lunak yang terkait dengan penyiapan, manajemen, atau migrasi node atau klien:

**Klien lapisan konsensus mana (mis., Lighthouse, Teku, Nimbus, Prysm, Grandine) yang didukung?**

- Klien mana yang didukung? Bisakah pengguna memilih?
- Ini digunakan untuk menentukan skor "multi-klien" dari produk tersebut.

#### Staking sebagai layanan {#staking-as-a-service}

Untuk [daftar staking sebagai layanan](/staking/saas/) (mis., operasi node yang didelegasikan):

**Apa saja biaya yang terkait dengan penggunaan layanan tersebut?**

- Bagaimana struktur biayanya, mis., apakah ada biaya bulanan untuk layanan tersebut?
- Apakah ada persyaratan staking tambahan?

**Apakah pengguna diwajibkan untuk mendaftar akun?**

- Bisakah seseorang menggunakan layanan tersebut tanpa izin atau KYC?
- Ini digunakan untuk menentukan skor "tanpa izin" dari produk tersebut.

**Siapa yang memegang kunci penandatanganan, dan kunci penarikan?**

- Kunci apa saja yang aksesnya dipertahankan oleh pengguna? Kunci apa saja yang aksesnya didapatkan oleh layanan?
- Ini digunakan untuk menentukan skor "tanpa kepercayaan" dari produk tersebut.

**Bagaimana keragaman klien dari node yang dioperasikan?**

- Berapa persen kunci validator yang dijalankan oleh klien lapisan konsensus (CL) mayoritas?
- Pada saat pengeditan terakhir, Prysm adalah klien lapisan konsensus yang dijalankan oleh mayoritas operator node, yang mana berbahaya bagi jaringan. Jika ada klien CL yang saat ini digunakan oleh lebih dari 33% jaringan, kami meminta data terkait penggunaannya.
- Ini digunakan untuk menentukan skor "klien beragam" dari produk tersebut.

#### Pool staking {#staking-pool}

Untuk [layanan staking gabungan](/staking/pools/):

**Berapa minimum ETH yang diwajibkan untuk di-stake?**

- mis., 0,01 ETH

**Apa saja biaya atau persyaratan staking yang terlibat?**

- Berapa persentase hadiah yang dipotong sebagai biaya?
- Apakah ada persyaratan staking tambahan?

**Apakah ada token likuiditas?**

- Apa saja token yang terlibat? Bagaimana cara kerjanya? Apa saja alamat kontraknya?
- Ini digunakan untuk menentukan skor "token likuiditas" dari produk tersebut.

**Bisakah pengguna berpartisipasi sebagai operator node?**

- Apa yang diwajibkan untuk menjalankan klien validator menggunakan dana gabungan?
- Apakah ini mewajibkan izin dari individu, perusahaan, atau DAO?
- Ini digunakan untuk menentukan skor "node tanpa izin" dari produk tersebut.

**Bagaimana keragaman klien dari operator node pool?**

- Berapa persen operator node yang menjalankan klien lapisan konsensus (CL) mayoritas?
- Pada saat pengeditan terakhir, Prysm adalah klien lapisan konsensus yang dijalankan oleh mayoritas operator node, yang mana berbahaya bagi jaringan. Jika ada klien CL yang saat ini digunakan oleh lebih dari 33% jaringan, kami meminta data terkait penggunaannya.
- Ini digunakan untuk menentukan skor "klien beragam" dari produk tersebut.

### Kriteria lainnya: nilai tambah (nice-to-haves) {#other-criteria}

**Antarmuka pengguna apa saja yang didukung?**

- mis., Aplikasi peramban, aplikasi desktop, aplikasi seluler, CLI

**Untuk perkakas node, apakah perangkat lunak menyediakan cara mudah untuk beralih antar klien?**

- Bisakah pengguna dengan mudah dan aman mengubah klien menggunakan perkakas tersebut?

**Untuk SaaS, berapa banyak validator yang saat ini dioperasikan oleh layanan tersebut?**

- Ini memberi kami gambaran tentang jangkauan layanan Anda sejauh ini.

## Bagaimana kami menampilkan hasil {#product-ordering}

[Kriteria untuk pencantuman](#criteria-for-inclusion) di atas digunakan untuk menghitung skor kumulatif untuk setiap produk atau layanan. Ini digunakan sebagai sarana untuk menyortir dan memamerkan produk yang memenuhi kriteria objektif tertentu. Semakin banyak kriteria yang buktinya disediakan, semakin tinggi produk akan disortir, dengan hasil seri yang diacak saat dimuat.

Logika kode dan bobot untuk kriteria ini saat ini terdapat dalam [komponen JavaScript ini](https://github.com/ethereum/ethereum-org-website/blob/dev/src/components/Staking/StakingProductsCardGrid/index.tsx#L350) di repo kami.

## Tambahkan produk atau layanan Anda {#add-product}

Jika Anda ingin menambahkan produk atau layanan staking ke ethereum.org, buatlah sebuah isu (issue) di GitHub.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml">
  Buat isu
</ButtonLink>