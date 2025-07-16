---
title: Ethereum yang siap menghadapi masa depan
description: Peningkatan ini memperkuat Ethereum sebagai lapisan dasar terdesentralisasi yang tangguh untuk masa depan, apa pun yang akan terjadi.
lang: id
image: /images/roadmap/roadmap-future.png
alt: "Peta Perjalanan Ethereum"
template: roadmap
---

Beberapa bagian dari peta perjalanann tidak selalu diperlukan untuk penskalaan atau mengamankan Ethereum dalam waktu dekat, tetapi menyiapkan Ethereum untuk stabilitas dan keandalan jauh di masa depan.

## Resistensi kuantum {#quantum-resistance}

Beberapa [kriptografi](/glossary/#cryptography) yang mengamankan Ethereum saat ini dapat dikompromikan ketika komputasi kuantum menjadi kenyataan. Meskipun komputer kuantum mungkin masih beberapa dekade lagi untuk menjadi ancaman nyata bagi kriptografi modern, Ethereum dibangun untuk menjadi aman selama berabad-abad yang akan datang. Ini berarti membuat [Ethereum tahan kuantum](https://consensys.net/blog/developers/how-will-quantum-supremacy-affect-blockchain/) sesegera mungkin.

Tantangan yang dihadapi oleh para pengembang Ethereum adalah [protokol bukti taruhan](/glossary/#pos) saat ini bergantung pada skema tanda tangan yang sangat efisien yang dikenal sebagai BLS untuk mengumpulkan suara pada [blok-blok](/glossary/#block) yang valid. Skema tanda tangan ini dipatahkan oleh komputer kuantum, tetapi alternatif tahan kuantum tidak seefisien itu.

[Skema komitmen "KZG"](/roadmap/danksharding/#what-is-kzg) yang digunakan di beberapa tempat di seluruh Ethereum untuk menghasilkan rahasia kriptografi dikenal rentan terhadap kuantum. Saat ini, hal ini diakali dengan menggunakan "pengaturan tepercaya" di mana banyak pengguna menghasilkan keacakan yang tidak dapat direkayasa oleh komputer kuantum. Namun, solusi yang ideal adalah dengan menggabungkan kriptografi aman kuantum. Terdapat dua pendekatan utama yang dapat menjadi pengganti yang efisien untuk skema BLS: [berbasis STARK](https://hackmd.io/@vbuterin/stark_aggregation) dan [berbasis lattice](https://medium.com/asecuritysite-when-bob-met-alice/so-what-is-lattice-encryption-326ac66e3175) untuk penandatanganan. **Ini masih dalam tahap penelitian dan pembuatan prototipe.**.

<ButtonLink variant="outline-color" href="/roadmap/danksharding#what-is-kzg"> Baca tentang KZG dan pengaturan tepercaya</ButtonLink>

## Ethereum yang lebih sederhana dan lebih efisien {#simpler-more-efficient-ethereum}

Kompleksitas menciptakan peluang untuk bug atau kerentanan yang dapat dieksploitasi oleh penyerang. Oleh karena itu, bagian dari peta perjalanan adalah menyederhanakan Ethereum dan menghapus kode yang telah bertahan melalui berbagai peningkatan tetapi tidak lagi diperlukan atau sekarang dapat ditingkatkan. Basis kode yang lebih ramping dan sederhana lebih mudah dipelihara dan dipahami oleh pengembang.

Ada beberapa pembaruan yang akan dilakukan pada [Mesin Virtual Ethereum (EVM)](/developers/docs/evm) untuk membuatnya lebih sederhana dan efisien. Ini termasuk [menghapus opcode SELFDESTRUCT](https://hackmd.io/@vbuterin/selfdestruct) - perintah yang jarang digunakan yang tidak lagi diperlukan dan dalam beberapa situasi dapat berbahaya untuk digunakan, terutama jika digabungkan dengan peningkatan lain di masa depan pada model penyimpanan Ethereum. [Klien Ethereum](/glossary/#consensus-client) juga masih mendukung beberapa jenis transaksi lama yang sekarang dapat dihapus sepenuhnya. Cara penghitungan [gas](/glossary/#gas) juga dapat ditingkatkan dan metode yang lebih efisien untuk aritmatika yang mendasari beberapa operasi kriptografi dapat digunakan.

Demikian pula, ada pembaruan yang dapat dilakukan pada bagian lain dari klien Ethereum saat ini. Salah satu contohnya adalah klien eksekusi dan konsensus saat ini menggunakan jenis kompresi data yang berbeda. Akan jauh lebih mudah dan lebih intuitif untuk berbagi data di antara klien ketika skema kompresi disatukan di seluruh jaringan.

## Kemajuan saat ini {#current-progress}

Sebagian besar peningkatan yang diperlukan untuk membuktikan Ethereum di masa depan **masih dalam tahap penelitian dan mungkin masih beberapa tahun lagi** sebelum diimplementasikan. Peningkatan seperti menghapus SELFDESTRUCT dan menyelaraskan skema kompresi yang digunakan dalam klien eksekusi dan klien konsensus kemungkinan besar akan hadir lebih cepat daripada kriptografi tahan kuantum.

**Bacaan lebih lanjut**

- [Gas](/developers/docs/gas)
- [EVM](/developers/docs/evm)
- [Struktur data](/developers/docs/data-structures-and-encoding)
