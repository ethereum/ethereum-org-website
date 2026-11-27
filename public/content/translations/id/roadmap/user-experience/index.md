---
title: Meningkatkan pengalaman pengguna
description: Masih terlalu rumit bagi sebagian besar orang untuk menggunakan Ethereum. Untuk mendorong adopsi massal, Ethereum harus secara drastis menurunkan hambatan masuknya - pengguna harus mendapatkan manfaat dari akses ke Ethereum yang terdesentralisasi, tanpa izin, dan tahan sensor, tetapi harus semudah menggunakan aplikasi Web2 tradisional.
lang: id
image: /images/roadmap/roadmap-ux.png
alt: "Peta jalan Ethereum"
template: roadmap
---

**Penggunaan Ethereum perlu disederhanakan**; mulai dari mengelola [kunci](/glossary/#key) dan [dompet](/glossary/#wallet) hingga memulai transaksi. Untuk memfasilitasi adopsi massal, Ethereum harus secara drastis meningkatkan kemudahan penggunaan, memungkinkan pengguna untuk merasakan akses ke Ethereum yang tanpa izin dan tahan sensor dengan pengalaman yang mulus seperti menggunakan aplikasi [Web2](/glossary/#web2).

## Melampaui frasa pemulihan {#no-more-seed-phrases}

Akun Ethereum dilindungi oleh sepasang kunci yang digunakan untuk mengidentifikasi akun (kunci publik) dan menandatangani pesan (kunci privat). Kunci privat itu seperti kata sandi utama; kunci ini memberikan akses penuh ke akun Ethereum. Ini adalah cara beroperasi yang berbeda bagi orang-orang yang lebih terbiasa dengan bank dan aplikasi Web2 yang mengelola akun atas nama pengguna. Agar Ethereum mencapai adopsi massal tanpa bergantung pada pihak ketiga yang tersentralisasi, harus ada cara yang lugas dan mulus bagi pengguna untuk mengambil hak asuh atas aset mereka dan memegang kendali atas data mereka tanpa harus memahami kriptografi kunci publik-privat dan manajemen kunci.

Solusi untuk hal ini adalah menggunakan dompet [kontrak pintar](/glossary/#smart-contract) untuk berinteraksi dengan Ethereum. Dompet kontrak pintar menciptakan cara untuk melindungi akun jika kunci hilang atau dicuri, peluang untuk deteksi dan pertahanan penipuan yang lebih baik, serta memungkinkan dompet untuk mendapatkan fungsionalitas baru. Meskipun dompet kontrak pintar sudah ada saat ini, dompet tersebut canggung untuk dibangun karena protokol Ethereum perlu mendukungnya dengan lebih baik. Dukungan tambahan ini dikenal sebagai abstraksi akun.

<ButtonLink variant="outline-color" href="/roadmap/account-abstraction/">Lebih lanjut tentang abstraksi akun</ButtonLink>

## Node untuk semua orang {#nodes-for-everyone}

Pengguna yang menjalankan [node](/glossary/#node) tidak perlu memercayai pihak ketiga untuk menyediakan data bagi mereka, dan mereka dapat berinteraksi dengan cepat, secara privat, dan tanpa izin dengan [rantai blok](/glossary/#blockchain) Ethereum. Namun, menjalankan node saat ini mensyaratkan pengetahuan teknis dan ruang disk yang besar, yang berarti banyak orang justru harus memercayai perantara.

Ada beberapa peningkatan yang akan membuat menjalankan node menjadi jauh lebih mudah dan jauh lebih tidak memakan sumber daya. State Ethereum diharapkan akan beralih ke struktur pohon baru, yang saat ini diusulkan sebagai pohon biner dalam [EIP-7864](https://eips.ethereum.org/EIPS/eip-7864), yang menghasilkan bukti yang jauh lebih kecil. Selain itu, dengan [ketiadaan state](/roadmap/statelessness) atau [kedaluwarsa data](/roadmap/statelessness/#data-expiry), node Ethereum tidak perlu menyimpan salinan seluruh data state Ethereum, yang secara drastis mengurangi persyaratan ruang hard disk. [Light node](/developers/docs/nodes-and-clients/light-clients/) akan menawarkan banyak manfaat dari menjalankan full node tetapi dapat berjalan dengan mudah di ponsel atau di dalam aplikasi peramban sederhana.

<ButtonLink variant="outline" href="/roadmap/statelessness/">Lebih lanjut tentang ketiadaan state</ButtonLink>

Dengan peningkatan ini, hambatan untuk menjalankan node berkurang hingga secara efektif menjadi nol. Pengguna akan mendapat manfaat dari akses yang aman dan tanpa izin ke Ethereum tanpa harus mengorbankan ruang disk atau CPU yang signifikan di komputer atau ponsel mereka, dan tidak perlu bergantung pada pihak ketiga untuk akses data atau jaringan saat mereka menggunakan aplikasi.

## Kemajuan saat ini {#current-progress}

Dompet kontrak pintar sudah tersedia, tetapi lebih banyak peningkatan disyaratkan untuk menjadikannya terdesentralisasi dan tanpa izin semaksimal mungkin. EIP-4337 adalah proposal matang yang tidak mensyaratkan perubahan apa pun pada protokol Ethereum. Kontrak pintar utama yang disyaratkan untuk EIP-4337 **disebarkan pada bulan Maret 2023**.

**Ketiadaan state penuh masih dalam fase penelitian** dan kemungkinan masih beberapa tahun lagi untuk diimplementasikan. Ada beberapa pencapaian di jalan menuju ketiadaan state penuh, termasuk kedaluwarsa data, yang mungkin diimplementasikan lebih cepat. Item peta jalan lainnya, seperti pohon state baru (saat ini diusulkan sebagai pohon biner dalam [EIP-7864](https://eips.ethereum.org/EIPS/eip-7864)) dan [Pemisahan pengusul-pembangun](/roadmap/pbs/) perlu diselesaikan terlebih dahulu.

[Pohon Verkle](/roadmap/verkle-trees/) telah dieksplorasi untuk peran ini, tetapi proposal pohon Verkle ([EIP-6800](https://eips.ethereum.org/EIPS/eip-6800)) sekarang stagnan. EIP-7864 masih berupa draf dan belum dijadwalkan untuk peningkatan jaringan.
