---
title: Meningkatkan pengalaman pengguna
description: Masih terlalu rumit untuk menggunakan Ethereum bagi kebanyakan orang. Untuk mendorong adopsi massal, Ethereum harus secara drastis menurunkan hambatan masuknya - pengguna harus mendapatkan manfaat dari akses yang terdesentralisasi, tanpa izin, dan tahan sensor ke Ethereum, tetapi harus sama mudahnya dengan menggunakan aplikasi web2 tradisional.
lang: id
image: /images/roadmap/roadmap-ux.png
alt: "Peta Jalan Ethereum"
template: roadmap
---

**Penggunaan Ethereum perlu disederhanakan**; dari mengelola [kunci](/glossary/#key) dan [dompet](/glossary/#wallet) hingga memulai transaksi. Untuk memfasilitasi adopsi massal, Ethereum harus secara drastis meningkatkan kemudahan penggunaan, memungkinkan pengguna untuk merasakan akses tanpa izin dan tahan sensor ke Ethereum dengan pengalaman tanpa gesekan dalam menggunakan aplikasi [Web2](/glossary/#web2).

## Melampaui frase benih {#no-more-seed-phrases}

Akun Ethereum dilindungi oleh sepasang kunci yang digunakan untuk mengidentifikasi akun (kunci publik) dan menandatangani pesan (kunci pribadi). Kunci pribadi seperti kata sandi utama; kunci ini memungkinkan akses penuh ke akun Ethereum. Ini adalah cara pengoperasian yang berbeda untuk orang-orang yang lebih akrab dengan bank dan aplikasi Web2 yang mengelola akun atas nama pengguna. Agar Ethereum dapat mencapai adopsi massal tanpa bergantung pada pihak ketiga yang tersentralisasi, harus ada cara yang mudah dan tanpa gesekan bagi pengguna untuk menjaga aset mereka dan tetap mengontrol data mereka tanpa harus memahami kriptografi kunci publik-pribadi dan manajemen kunci.

Solusinya adalah dengan menggunakan dompet [kontrak pintar](/glossary/#smart-contract) untuk berinteraksi dengan Ethereum. Dompet kontrak pintar menciptakan cara untuk melindungi akun jika kuncinya hilang atau dicuri, peluang untuk deteksi dan pertahanan yang lebih baik, dan memungkinkan dompet untuk mendapatkan fungsionalitas baru. Meskipun dompet kontrak pintar sudah ada saat ini, namun masih sulit untuk dibuat karena protokol Ethereum perlu mendukungnya dengan lebih baik. Dukungan tambahan ini dikenal sebagai abstraksi akun.

<ButtonLink variant="outline-color" href="/roadmap/account-abstraction/">Selengkapnya tentang abstraksi akun</ButtonLink>

## Simpul untuk semua orang

Pengguna yang menjalankan [simpul](/glossary/#node) tidak perlu memercayai pihak ketiga untuk menyediakan data kepada mereka, dan mereka dapat berinteraksi dengan cepat, secara pribadi, dan tanpa izin dengan [rantai blok](/glossary/#blockchain) Ethereum. Namun, menjalankan simpul saat ini membutuhkan pengetahuan teknis dan ruang disk yang besar, yang berarti banyak orang harus mempercayai perantara.

Ada beberapa peningkatan yang akan membuat menjalankan node jauh lebih mudah dan jauh lebih sedikit menggunakan sumber daya. Cara data disimpan akan diubah untuk menggunakan struktur yang lebih hemat ruang yang dikenal sebagai **Pohon Verkle**. Selain itu, dengan [tanpa status](/roadmap/statelessness) atau [kedaluwarsa data](/roadmap/statelessness/#data-expiry), simpul Ethereum tidak perlu menyimpan salinan seluruh data status Ethereum, yang secara drastis mengurangi persyaratan ruang hard disk. [Simpul ringan](/developers/docs/nodes-and-clients/light-clients/) akan menawarkan banyak manfaat dalam menjalankan simpul penuh tetapi dapat berjalan dengan mudah di ponsel atau di dalam aplikasi peramban sederhana.

<ButtonLink variant="outline-color" href="/roadmap/verkle-trees/">Baca tentang Pohon Verkle</ButtonLink>

Dengan peningkatan ini, hambatan untuk menjalankan sebuah simpul dikurangi menjadi nol secara efektif. Pengguna akan mendapatkan keuntungan dari akses yang aman dan tanpa izin ke Ethereum tanpa harus mengorbankan ruang disk atau CPU yang signifikan di komputer atau ponsel mereka, dan tidak perlu bergantung pada pihak ketiga untuk akses data atau jaringan ketika mereka menggunakan aplikasi.

## Kemajuan saat ini {#current-progress}

Dompet kontrak pintar sudah tersedia, tetapi lebih banyak peningkatan diperlukan untuk membuatnya terdesentralisasi dan tanpa izin. EIP-4337 adalah proposal matang yang tidak memerlukan perubahan apa pun pada protokol Ethereum. Kontrak pintar utama yang diperlukan untuk EIP-4337 **disebarkan pada bulan Maret 2023**.

**Tanpa status penuh masih dalam tahap penelitian** dan kemungkinan perlu beberapa tahun lagi sebelum dapat diimplementasikan. Ada beberapa tonggak penting dalam perjalanan menuju keadaan tanpa kewarganegaraan penuh, termasuk masa berlaku data, yang dapat diimplementasikan lebih cepat. Item peta perjalanan lainnya, seperti [Pohon Verkle](/roadmap/verkle-trees/) dan [Pemisahan Pengusul-Pembangun](/roadmap/pbs/) perlu diselesaikan terlebih dahulu.

Jaringan percobaan pohon Verkle sudah aktif dan berjalan, dan fase berikutnya adalah menjalankan klien yang diaktifkan pohon Verkle pada jaringan percobaan pribadi, kemudian publik. Anda dapat membantu mempercepat kemajuan dengan menggunakan kontrak ke jaringan percobaan atau menjalankan klien jaringan percobaan.
