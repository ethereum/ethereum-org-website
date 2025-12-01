---
title: Melindungi Ethereum untuk masa depan
description: Peningkatan ini mengukuhkan Ethereum sebagai lapisan asas yang berdaya tahan dan terdesentralisasi untuk masa hadapan, walau apa pun yang mungkin ada.
lang: ms
image: /images/roadmap/roadmap-future.png
alt: "Peta hala tuju Ethereum"
template: roadmap
---

Sesetengah bahagian pelan hala tuju tidak semestinya diperlukan untuk menskala atau melindungi Ethereum dalam jangka masa terdekat, tetapi menetapkan Ethereum untuk kestabilan dan kebolehpercayaan jauh ke masa hadapan.

## Rintangan kuantum {#quantum-resistance}

Sebahagian daripada [kriptografi](/glossary/#cryptography) yang melindungi Ethereum masa kini akan terjejas apabila pengkomputeran kuantum menjadi kenyataan. Walaupun komputer kuantum mungkin beberapa dekad lagi daripada menjadi ancaman tulen kepada kriptografi moden, Ethereum sedang dibina untuk selamat selama berabad-abad yang akan datang. Ini bermakna menjadikan [tahan kuantum Ethereum](https://consensys.net/blog/developers/how-will-quantum-supremacy-affect-blockchain/) secepat mungkin.

Cabaran yang dihadapi oleh pembangun Ethereum ialah protokol [bukti penaruhan](/glossary/#pos) semasa bergantung pada skim tandatangan yang sangat cekap dikenali sebagai BLS untuk mengagregatkan undian pada [blok](/glossary/#block) yang sah. Skim tandatangan ini dipecahkan oleh komputer kuantum, tetapi alternatif tahan kuantum tidak begitu cekap.

[Skim komitmen “KZG”](/roadmap/danksharding/#what-is-kzg) yang digunakan di beberapa tempat di seluruh Ethereum untuk menjana rahsia kriptografi diketahui terdedah kepada kuantum. Pada masa ini, ini dielakkan menggunakan "persediaan yang dipercayai" (yang upacara persediaan utama berjaya diselesaikan pada tahun 2023), iaitu ramai pengguna menjana rawak yang tidak boleh dilakukan kejuruteraan terbalik oleh komputer kuantum. Walau bagaimanapun, penyelesaian jangka panjang yang ideal adalah dengan memasukkan kriptografi kalis kuantum sebagai ganti. Terdapat dua pendekatan utama yang boleh menjadi pengganti yang cekap untuk skim BLS: tandatangan [berasaskan STARK](https://hackmd.io/@vbuterin/stark_aggregation) dan [berasaskan kekisi](https://medium.com/asecuritysite-when-bob-met-alice/so-what-is-lattice-encryption-326ac66e3175). **Ini masih dikaji dan dibuat prototaip secara aktif**.

[Baca tentang KZG dan persediaan yang dipercayai](/roadmap/danksharding#what-is-kzg)

## Ethereum yang lebih ringkas dan cekap {#simpler-more-efficient-ethereum}

Kerumitan mewujudkan peluang untuk pepijat atau kelemahan yang boleh dieksploitasi oleh penyerang. Oleh itu, sebahagian daripada pelan hala tuju ialah memudahkan Ethereum dan mengalih keluar atau mengubah suai kod yang telah wujud melalui pelbagai peningkatan tetapi tidak lagi diperlukan atau kini boleh diperbaiki. Pangkalan kod yang lebih ringkas dan mudah menjadikan kerja penyelenggaraan serta pemahaman pembangun lebih mudah.

Untuk menjadikan [Mesin Maya Ethereum (EVM)](/developers/docs/evm) lebih mudah dan cekap, penambahbaikan dikaji dan dilaksanakan secara berterusan. Ini melibatkan kedua-dua langkah menangani komponen legasi dan memperkenalkan pengoptimuman.

**Perubahan Terkini Dilaksanakan:**

- **Pembaharuan Pengiraan Gas:** Cara pengiraan [gas](/glossary/#gas) telah dipertingkatkan dengan ketara dengan **EIP-1559 (dilaksanakan dalam peningkatan London, 2021)**, memperkenalkan yuran asas dan mekanisme pembakaran untuk harga transaksi yang lebih boleh diramal.
- **`Sekatan SELFSTRUCT`:** Opkod `SELFSTRUCT`, walaupun jarang digunakan, menimbulkan potensi risiko. Fungsinya sangat **terhad dalam peningkatan Dencun (Mac 2024) melalui EIP-6780** untuk mengurangkan bahaya, terutamanya berkaitan pengurusan keadaan.
- **Jenis Transaksi Dimodenkan:** Format transaksi baharu telah diperkenalkan (cth., melalui **EIP-2718** dan **EIP-4844** untuk blob dalam peningkatan Dencun) untuk menyokong ciri baharu dan meningkatkan kecekapan berbanding jenis legasi.

**Matlamat berterusan dan masa depan:**

- **Pengendalian `SELFDESTRUCT` Selanjutnya:** Walaupun terhad, **potensi pengalihan keluar sepenuhnya** bagi opkod `SELFDESTRUCT` masih dipertimbangkan untuk naik taraf pada masa hadapan bagi memudahkan lagi keadaan EVM. ([Lebih banyak konteks tentang isu SELFDESTRUCT](https://hackmd.io/@vbuterin/selfdestruct)).
- **Menamatkan Transaksi Legasi Secara Berperingkat:** Walaupun [klien Ethereum](/glossary/#consensus-client) masih menyokong jenis transaksi yang lebih lama untuk keserasian ke belakang, matlamatnya adalah untuk menggalakkan penghijrahan kepada jenis yang lebih baharu dan **berpotensi menghentikan atau mengalih keluar sokongan sepenuhnya untuk format tertua** pada masa hadapan.
- **Penyelidikan Kecekapan Gas Berterusan:** Penerokaan diteruskan ke **pemurnian lanjut untuk pengiraan gas**, berpotensi termasuk konsep seperti gas berbilang dimensi untuk mencerminkan penggunaan sumber dengan lebih baik.
- **Operasi Kriptografi Dioptimumkan:** Usaha sedang dijalankan untuk **membawa kaedah yang lebih cekap untuk aritmetik** yang menyokong operasi kriptografi yang digunakan dalam EVM.

Begitu juga, terdapat kemas kini yang boleh dilakukan pada bahagian lain klien Ethereum masa kini. Salah satu contohnya ialah klien pelaksanaan dan konsensus semasa menggunakan jenis pemampatan data yang berbeza. Ia akan menjadi lebih mudah dan lebih intuitif untuk berkongsi data antara klien apabila skim pemampatan disatukan di seluruh rangkaian. Ini kekal sebagai satu bidang penerokaan.

## Kemajuan semasa {#current-progress}

Banyak peningkatan jangka panjang untuk melindungi masa depan, terutamanya **ketahanan kuantum penuh untuk protokol teras, masih dalam fasa penyelidikan dan mungkin beberapa tahun lagi** sebelum dilaksanakan.

Walau bagaimanapun, **kemajuan yang ketara telah dicapai dalam usaha penyederhanaan.** Sebagai contoh, perubahan utama seperti **sekatan `SELFDESTRUCT` (EIP-6780)** dan pengenalan **transaksi membawa blob (EIP-4844)** telah dilaksanakan dalam **peningkatan Dencun (Mac 2024)**. Kerja untuk menyelaraskan skim pemampatan klien dan penambahbaikan kecekapan lain juga diteruskan.

**Bacaan lanjut**

- [Gas](/developers/docs/gas)
- [EVM](/developers/docs/evm)
- [Struktur data](/developers/docs/data-structures-and-encoding)