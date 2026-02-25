---
title: Ethereum yang siap menghadapi masa depan
description: Peningkatan ini memperkuat Ethereum sebagai lapisan dasar terdesentralisasi yang tangguh untuk masa depan, apa pun yang akan terjadi.
lang: id
image: /images/roadmap/roadmap-future.png
alt: "Peta Jalan Ethereum"
template: roadmap
---

Beberapa bagian dari peta perjalanann tidak selalu diperlukan untuk penskalaan atau mengamankan Ethereum dalam waktu dekat, tetapi menyiapkan Ethereum untuk stabilitas dan keandalan jauh di masa depan.

## Resistensi kuantum {#quantum-resistance}

Sebagian [kriptografi](/glossary/#cryptography) yang mengamankan Ethereum saat ini akan dikompromikan ketika komputasi kuantum menjadi kenyataan. Meskipun komputer kuantum mungkin masih beberapa dekade lagi untuk menjadi ancaman nyata bagi kriptografi modern, Ethereum dibangun untuk menjadi aman selama berabad-abad yang akan datang. Ini berarti membuat [Ethereum resistan kuantum](https://consensys.net/blog/developers/how-will-quantum-supremacy-affect-blockchain/) sesegera mungkin.

Tantangan yang dihadapi oleh para pengembang Ethereum adalah protokol [bukti taruhan](/glossary/#pos) saat ini bergantung pada skema tanda tangan yang sangat efisien yang dikenal sebagai BLS untuk mengumpulkan suara pada [blok](/glossary/#block) yang valid. Skema tanda tangan ini dipatahkan oleh komputer kuantum, tetapi alternatif tahan kuantum tidak seefisien itu.

Skema komitmen ["KZG"](/roadmap/danksharding/#what-is-kzg) yang digunakan di beberapa tempat di seluruh Ethereum untuk menghasilkan rahasia kriptografis diketahui rentan terhadap kuantum. Saat ini, hal ini diatasi dengan menggunakan trusted setups (di mana upacara setup utama berhasil diselesaikan pada tahun 2023), di mana banyak pengguna menghasilkan bilangan acak yang tidak dapat dipalsukan balik oleh unit komputer. Namun, solusi jangka panjang yang ideal adalah dengan menggabungkan grafik kripto yang aman terhadap unit komputer. Ada dua pendekatan utama yang bisa menjadi pengganti yang efisien untuk skema BLS: penandatanganan [berbasis STARK](https://hackmd.io/@vbuterin/stark_aggregation) dan [berbasis kisi](https://medium.com/asecuritysite-when-bob-met-alice/so-what-is-lattice-encryption-326ac66e3175). **Hal-hal ini masih terus diteliti dan dibuat prototipe**.

[Baca tentang KZG dan pengaturan tepercaya](/roadmap/danksharding#what-is-kzg)

## Ethereum yang lebih sederhana dan lebih efisien {#simpler-more-efficient-ethereum}

Kerumitan menciptakan peluang munculnya bug atau celah yang dapat dimanfaatkan oleh penyerang. Oleh karena itu, sebagian dari roadmap Ethereum adalah menyederhanakan sistem serta menghapus atau mengubah kode yang telah ada sejak berbagai pembaruan, tetapi kini sudah tidak diperlukan lagi atau bisa ditingkatkan. Basis kode yang lebih ramping dan sederhana lebih mudah untuk dipelihara serta dipahami oleh para pengembang.

Untuk membuat [Mesin Virtual Ethereum (EVM)](/developers/docs/evm) lebih sederhana dan lebih efisien, berbagai penyempurnaan terus diteliti dan diterapkan. Hal ini addressing penanganan komponen lama sekaligus penerapan berbagai upaya optimal.

**Perubahan Terbaru yang Telah Diterapkan:**

- **Perombakan Perhitungan Gas:** Cara [gas](/glossary/#gas) dihitung ditingkatkan secara signifikan dengan **EIP-1559 (diimplementasikan dalam pemutakhiran London, 2021)**, yang memperkenalkan mekanisme biaya dasar dan pembakaran untuk harga transaksi yang lebih dapat diprediksi.
- **Pembatasan `SELFDESTRUCT`:** Opcode `SELFDESTRUCT`, meskipun jarang digunakan, menimbulkan potensi risiko. Fungsionalitasnya sangat **dibatasi dalam pemutakhiran Dencun (Maret 2024) melalui EIP-6780** untuk mengurangi bahaya, terutama yang berkaitan dengan manajemen state.
- **Jenis Transaksi yang Dimodernisasi:** Format transaksi baru telah diperkenalkan (misalnya, melalui **EIP-2718** dan **EIP-4844** untuk blob dalam pemutakhiran Dencun) untuk mendukung fitur-fitur baru dan meningkatkan efisiensi dibandingkan jenis-jenis lama.

**Tujuan yang sedang berjalan dan tujuan di masa depan:**

- **Penanganan `SELFDESTRUCT` Lebih Lanjut:** Meskipun dibatasi, **potensi penghapusan total** opcode `SELFDESTRUCT` masih dipertimbangkan untuk pemutakhiran di masa depan untuk lebih menyederhanakan state EVM. ([Konteks lebih lanjut tentang masalah SELFDESTRUCT](https://hackmd.io/@vbuterin/selfdestruct)).
- **Penghapusan Transaksi Lama Secara Bertahap:** Meskipun [klien Ethereum](/glossary/#consensus-client) masih mendukung jenis transaksi yang lebih lama untuk kompatibilitas mundur, tujuannya adalah untuk mendorong migrasi ke jenis yang lebih baru dan **berpotensi menghentikan atau sepenuhnya menghapus dukungan untuk format terlama** di masa depan.
- **Riset Efisiensi Gas Berkelanjutan:** Eksplorasi berlanjut ke **penyempurnaan lebih lanjut untuk perhitungan gas**, yang berpotensi mencakup konsep-konsep seperti gas multi-dimensi untuk lebih mencerminkan penggunaan sumber daya.
- **Operasi Kriptografis yang Dioptimalkan:** Upaya sedang berlangsung untuk **menghadirkan metode yang lebih efisien untuk aritmetika** yang menopang operasi kriptografis yang digunakan dalam EVM.

Demikian pula, ada updates yang dapat dilakukan pada bagian lain dari Ethereum clients masa kini. Salah satu contohnya adalah klien eksekusi dan consensus clients saat ini menggunakan jenis kompresi data yang berbeda. Berbagi data antar clients akan menjadi jauh lebih mudah dan intuitif ketika skema kompresi disamakan di seluruh network. Ini masih merupakan bidang yang sedang dijajaki.

## Kemajuan saat ini {#current-progress}

Banyak pemutakhiran jangka panjang yang siap menghadapi masa depan, khususnya **resistensi kuantum penuh untuk protokol inti, masih dalam tahap penelitian dan mungkin perlu beberapa tahun lagi** untuk diimplementasikan.

Namun, **kemajuan signifikan telah dicapai dalam upaya penyederhanaan.** Misalnya, perubahan penting seperti **pembatasan `SELFDESTRUCT` (EIP-6780)** dan pengenalan **transaksi pembawa blob (EIP-4844)** diimplementasikan dalam **pemutakhiran Dencun (Maret 2024)**. Pekerjaan untuk menyelaraskan skema kompresi klien dan peningkatan efisiensi lainnya juga terus berlanjut.

**Bacaan Lebih Lanjut**

- [Gas](/developers/docs/gas)
- [EVM](/developers/docs/evm)
- [Struktur data](/developers/docs/data-structures-and-encoding)