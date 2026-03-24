---
title: Mempersiapkan Ethereum untuk Masa Depan
description: Peningkatan ini mengukuhkan Ethereum sebagai lapisan dasar yang tangguh dan terdesentralisasi untuk masa depan, apa pun yang mungkin terjadi.
lang: id
image: /images/roadmap/roadmap-future.png
alt: "Peta jalan Ethereum"
template: roadmap
---

Beberapa bagian dari peta jalan tidak selalu diperlukan untuk peningkatan skala atau pengamanan Ethereum dalam waktu dekat, tetapi mempersiapkan Ethereum untuk stabilitas dan keandalan jauh di masa depan.

## Ketahanan kuantum {#quantum-resistance}

Beberapa [kriptografi](/glossary/#cryptography) yang mengamankan Ethereum saat ini akan terancam ketika komputasi kuantum menjadi kenyataan. Meskipun komputer kuantum mungkin masih puluhan tahun lagi untuk menjadi ancaman nyata bagi kriptografi modern, Ethereum sedang dibangun agar aman untuk berabad-abad yang akan datang. Ini berarti membuat [Ethereum tahan kuantum](https://consensys.net/blog/developers/how-will-quantum-supremacy-affect-blockchain/) sesegera mungkin.

Tantangan yang dihadapi pengembang Ethereum adalah bahwa protokol [proof-of-stake](/glossary/#pos) saat ini bergantung pada skema tanda tangan yang sangat efisien yang dikenal sebagai BLS untuk mengumpulkan suara pada [blok](/glossary/#block) yang valid. Skema tanda tangan ini dapat ditembus oleh komputer kuantum, tetapi alternatif yang tahan kuantum tidak seefisien itu.

[Skema komitmen “KZG”](/roadmap/danksharding/#what-is-kzg) yang digunakan di beberapa tempat di seluruh Ethereum untuk menghasilkan rahasia kriptografi diketahui rentan terhadap kuantum. Saat ini, hal ini diatasi menggunakan "pengaturan tepercaya" (di mana upacara pengaturan utamanya telah berhasil diselesaikan pada tahun 2023), di mana banyak pengguna menghasilkan keacakan yang tidak dapat direkayasa balik oleh komputer kuantum. Namun, solusi jangka panjang yang ideal adalah dengan menggabungkan kriptografi yang aman dari kuantum. Ada dua pendekatan terkemuka yang dapat menjadi pengganti efisien untuk skema BLS: penandatanganan [berbasis STARK](https://hackmd.io/@vbuterin/stark_aggregation) dan [berbasis kisi (lattice)](https://medium.com/asecuritysite-when-bob-met-alice/so-what-is-lattice-encryption-326ac66e3175). **Ini masih terus diteliti dan dibuat prototipenya secara aktif**.

[Baca tentang KZG dan pengaturan tepercaya](/roadmap/danksharding#what-is-kzg)

## Ethereum yang lebih sederhana dan lebih efisien {#simpler-more-efficient-ethereum}

Kompleksitas menciptakan peluang bagi bug atau kerentanan yang dapat dieksploitasi oleh penyerang. Oleh karena itu, bagian dari peta jalan adalah menyederhanakan Ethereum dan menghapus atau memodifikasi kode yang telah ada melalui berbagai peningkatan tetapi tidak lagi diperlukan atau sekarang dapat ditingkatkan. Basis kode yang lebih ramping dan lebih sederhana lebih mudah dipelihara dan dipahami oleh pengembang.

Untuk membuat [Mesin Virtual Ethereum (EVM)](/developers/docs/evm) lebih sederhana dan lebih efisien, peningkatan terus diteliti dan diimplementasikan. Ini melibatkan penanganan komponen lama dan pengenalan optimasi.

**Perubahan Terbaru yang Diimplementasikan:**

- **Perombakan Perhitungan Gas:** Cara [gas](/glossary/#gas) dihitung telah ditingkatkan secara signifikan dengan **EIP-1559 (diimplementasikan dalam peningkatan London, 2021)**, memperkenalkan biaya dasar dan mekanisme pembakaran untuk penetapan harga transaksi yang lebih dapat diprediksi.
- **Pembatasan `SELFDESTRUCT`:** Opcode `SELFDESTRUCT`, meskipun jarang digunakan, menimbulkan potensi risiko. Fungsionalitasnya sangat **dibatasi dalam peningkatan Dencun (Maret 2024) melalui EIP-6780** untuk memitigasi bahaya, terutama mengenai manajemen status.
- **Jenis Transaksi yang Dimodernisasi:** Format transaksi baru telah diperkenalkan (misalnya, melalui **EIP-2718** dan **EIP-4844** untuk blob dalam peningkatan Dencun) untuk mendukung fitur baru dan meningkatkan efisiensi dibandingkan jenis lama.

**Tujuan yang sedang berjalan dan di masa depan:**

- **Penanganan `SELFDESTRUCT` Lebih Lanjut:** Meskipun dibatasi, **potensi penghapusan sepenuhnya** dari opcode `SELFDESTRUCT` masih dipertimbangkan untuk peningkatan di masa depan guna lebih menyederhanakan status EVM. ([Konteks lebih lanjut tentang masalah SELFDESTRUCT](https://hackmd.io/@vbuterin/selfdestruct)).
- **Menghapus Transaksi Lama Secara Bertahap:** Meskipun [klien Ethereum](/glossary/#consensus-client) masih mendukung jenis transaksi lama untuk kompatibilitas mundur, tujuannya adalah untuk mendorong migrasi ke jenis yang lebih baru dan **berpotensi menghentikan atau sepenuhnya menghapus dukungan untuk format tertua** di masa depan.
- **Penelitian Efisiensi Gas Berkelanjutan:** Eksplorasi terus berlanjut ke **penyempurnaan lebih lanjut untuk perhitungan gas**, yang berpotensi mencakup konsep seperti gas multi-dimensi untuk lebih mencerminkan penggunaan sumber daya.
- **Operasi Kriptografi yang Dioptimalkan:** Upaya sedang berlangsung untuk **menghadirkan metode yang lebih efisien untuk aritmatika** yang mendasari operasi kriptografi yang digunakan di dalam EVM.

Demikian pula, ada pembaruan yang dapat dilakukan pada bagian lain dari klien Ethereum saat ini. Salah satu contohnya adalah klien eksekusi dan klien konsensus saat ini menggunakan jenis kompresi data yang berbeda. Akan jauh lebih mudah dan lebih intuitif untuk berbagi data antar klien ketika skema kompresi disatukan di seluruh jaringan. Ini tetap menjadi area eksplorasi.

## Kemajuan saat ini {#current-progress}

Banyak dari peningkatan persiapan masa depan jangka panjang, khususnya **ketahanan kuantum penuh untuk protokol inti, masih dalam fase penelitian dan mungkin butuh beberapa tahun lagi** untuk diimplementasikan.

Namun, **kemajuan signifikan telah dicapai dalam upaya penyederhanaan.** Misalnya, perubahan utama seperti **pembatasan `SELFDESTRUCT` (EIP-6780)** dan pengenalan **transaksi pembawa blob (EIP-4844)** diimplementasikan dalam **peningkatan Dencun (Maret 2024)**. Pekerjaan untuk menyelaraskan skema kompresi klien dan peningkatan efisiensi lainnya juga terus berlanjut.

**Bacaan lebih lanjut**

- [Gas](/developers/docs/gas)
- [EVM](/developers/docs/evm)
- [Struktur data](/developers/docs/data-structures-and-encoding)