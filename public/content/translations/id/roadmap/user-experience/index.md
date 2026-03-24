---
title: Meningkatkan pengalaman pengguna
description: Menggunakan Ethereum masih terlalu rumit bagi sebagian besar orang. Untuk mendorong adopsi massal, Ethereum harus secara drastis menurunkan hambatan masuknya - pengguna harus mendapatkan manfaat dari akses ke Ethereum yang terdesentralisasi, tanpa izin, dan tahan sensor, tetapi harus semudah menggunakan aplikasi web2 tradisional.
lang: id
image: /images/roadmap/roadmap-ux.png
alt: "Peta jalan Ethereum"
template: roadmap
---

**Penggunaan Ethereum perlu disederhanakan**; mulai dari mengelola [kunci](/glossary/#key) dan [dompet](/glossary/#wallet) hingga memulai transaksi. Untuk memfasilitasi adopsi massal, Ethereum harus secara drastis meningkatkan kemudahan penggunaan, memungkinkan pengguna untuk merasakan akses ke Ethereum yang tanpa izin dan tahan sensor dengan pengalaman tanpa hambatan seperti menggunakan aplikasi [Web2](/glossary/#web2).

## Melampaui frasa seed {#no-more-seed-phrases}

Akun Ethereum dilindungi oleh sepasang kunci yang digunakan untuk mengidentifikasi akun (kunci publik) dan menandatangani pesan (kunci pribadi). Kunci pribadi ibarat kata sandi utama; ini memungkinkan akses penuh ke akun Ethereum. Ini adalah cara beroperasi yang berbeda bagi orang-orang yang lebih terbiasa dengan bank dan aplikasi Web2 yang mengelola akun atas nama pengguna. Agar Ethereum mencapai adopsi massal tanpa bergantung pada pihak ketiga yang terpusat, harus ada cara yang lugas dan tanpa hambatan bagi pengguna untuk menjaga aset mereka dan tetap memegang kendali atas data mereka tanpa harus memahami kriptografi kunci publik-pribadi dan manajemen kunci.

Solusi untuk hal ini adalah menggunakan dompet [kontrak pintar](/glossary/#smart-contract) untuk berinteraksi dengan Ethereum. Dompet kontrak pintar menciptakan cara untuk melindungi akun jika kunci hilang atau dicuri, peluang untuk deteksi dan pertahanan penipuan yang lebih baik, dan memungkinkan dompet untuk mendapatkan fungsionalitas baru. Meskipun dompet kontrak pintar sudah ada saat ini, mereka canggung untuk dibangun karena protokol Ethereum perlu mendukungnya dengan lebih baik. Dukungan tambahan ini dikenal sebagai abstraksi akun (account abstraction).

<ButtonLink variant="outline-color" href="/roadmap/account-abstraction/">Lebih lanjut tentang abstraksi akun</ButtonLink>

## Node untuk semua orang

Pengguna yang menjalankan [node](/glossary/#node) tidak perlu memercayai pihak ketiga untuk menyediakan data bagi mereka, dan mereka dapat berinteraksi dengan cepat, secara pribadi, dan tanpa izin dengan [blockchain](/glossary/#blockchain) Ethereum. Namun, menjalankan node saat ini membutuhkan pengetahuan teknis dan ruang disk yang besar, yang berarti banyak orang harus memercayai perantara sebagai gantinya.

Ada beberapa peningkatan yang akan membuat menjalankan node jauh lebih mudah dan jauh lebih hemat sumber daya. Cara data disimpan akan diubah untuk menggunakan struktur yang lebih hemat ruang yang dikenal sebagai **Verkle Tree**. Selain itu, dengan [statelessness](/roadmap/statelessness) atau [kedaluwarsa data](/roadmap/statelessness/#data-expiry), node Ethereum tidak perlu menyimpan salinan seluruh data status Ethereum, yang secara drastis mengurangi persyaratan ruang hard disk. [Light node](/developers/docs/nodes-and-clients/light-clients/) akan menawarkan banyak manfaat dari menjalankan node penuh tetapi dapat berjalan dengan mudah di ponsel atau di dalam aplikasi peramban sederhana.

<ButtonLink variant="outline-color" href="/roadmap/verkle-trees/">Baca tentang Verkle tree</ButtonLink>

Dengan peningkatan ini, hambatan untuk menjalankan node berkurang menjadi secara efektif nol. Pengguna akan mendapat manfaat dari akses yang aman dan tanpa izin ke Ethereum tanpa harus mengorbankan ruang disk atau CPU yang nyata di komputer atau ponsel mereka, dan tidak perlu bergantung pada pihak ketiga untuk data atau akses jaringan saat mereka menggunakan aplikasi.

## Kemajuan saat ini {#current-progress}

Dompet kontrak pintar sudah tersedia, tetapi lebih banyak peningkatan diperlukan untuk membuatnya se-terdesentralisasi dan tanpa izin semaksimal mungkin. EIP-4337 adalah proposal matang yang tidak memerlukan perubahan apa pun pada protokol Ethereum. Kontrak pintar utama yang diperlukan untuk EIP-4337 telah **diterapkan pada bulan Maret 2023**.

**Statelessness penuh masih dalam fase penelitian** dan kemungkinan masih beberapa tahun lagi untuk diimplementasikan. Ada beberapa tonggak pencapaian di jalan menuju statelessness penuh, termasuk kedaluwarsa data, yang mungkin diimplementasikan lebih cepat. Item peta jalan lainnya, seperti [Verkle Tree](/roadmap/verkle-trees/) dan [Pemisahan pengusul-pembangun (Proposer-builder separation)](/roadmap/pbs/) perlu diselesaikan terlebih dahulu.

Testnet Verkle tree sudah aktif dan berjalan, dan fase berikutnya adalah menjalankan klien yang mendukung Verkle-tree di testnet privat, lalu publik. Anda dapat membantu mempercepat kemajuan dengan menerapkan kontrak ke testnet atau menjalankan klien testnet.