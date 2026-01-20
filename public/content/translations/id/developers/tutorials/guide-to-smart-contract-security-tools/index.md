---
title: Panduan untuk perangkat keamanan kontrak pintar
description: Gambaran umum dari tiga teknik pengujian dan analisis program yang berbeda
author: "Ipungpurwono"
lang: id
tags: [ "Solidity", "kontrak pintar", "keamanan" ]
skill: intermediate
published: 2020-09-07
source: Membuat kontrak yang aman
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis
---

Kita akan menggunakan tiga teknik pengujian dan analisis program yang berbeda:

- **Analisis statis dengan [Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/).** Semua jalur program diperkirakan dan dianalisis pada saat yang sama, melalui presentasi program yang berbeda (misalnya, grafik alur-kontrol)
- **Fuzzing dengan [Echidna](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/).** Kode dieksekusi dengan pembuatan transaksi pseudo-acak. Fuzzer akan mencoba menemukan urutan transaksi untuk melanggar properti yang diberikan.
- **Eksekusi simbolis dengan [Manticore](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/).** Sebuah teknik verifikasi formal, yang menerjemahkan setiap jalur eksekusi menjadi formula matematis, di mana batasan dapat diperiksa.

Setiap teknik memiliki kelebihan dan kekurangan, dan akan berguna dalam [kasus-kasus spesifik](#determining-security-properties):

| Teknik            | Peralatan | Penggunaan                                    | Kecepatan | Bug yang terlewat | Alarm Palsu |
| ----------------- | --------- | --------------------------------------------- | --------- | ----------------- | ----------- |
| Analisis Statis   | Slither   | CLI & skrip               | detik     | sedang            | rendah      |
| Fuzzing           | Echidna   | Properti Solidity                             | menit     | rendah            | tidak ada   |
| Eksekusi Simbolis | Manticore | Properti & skrip Solidity | jam       | tidak ada\*       | tidak ada   |

\* jika semua jalur dieksplorasi tanpa batas waktu

**Slither** menganalisis kontrak dalam hitungan detik, namun, analisis statis dapat menyebabkan alarm palsu dan kurang cocok untuk pemeriksaan yang rumit (misalnya, pemeriksaan aritmetika). Jalankan Slither melalui API untuk akses mudah ke detektor bawaan atau melalui API untuk pemeriksaan yang ditentukan pengguna.

**Echidna** perlu dijalankan selama beberapa menit dan hanya akan menghasilkan positif benar. Echidna memeriksa properti keamanan yang disediakan pengguna, yang ditulis dalam Solidity. Ini mungkin melewatkan bug karena didasarkan pada eksplorasi acak.

**Manticore** melakukan analisis "paling berat". Seperti Echidna, Manticore memverifikasi properti yang disediakan pengguna. Ini akan membutuhkan lebih banyak waktu untuk berjalan, tetapi dapat membuktikan validitas suatu properti dan tidak akan melaporkan alarm palsu.

## Alur kerja yang disarankan {#suggested-workflow}

Mulailah dengan detektor bawaan Slither untuk memastikan tidak ada bug sederhana yang ada saat ini atau akan muncul di kemudian hari. Gunakan Slither untuk memeriksa properti yang terkait dengan pewarisan, dependensi variabel, dan masalah struktural. Seiring pertumbuhan basis kode, gunakan Echidna untuk menguji properti mesin state yang lebih kompleks. Kunjungi kembali Slither untuk mengembangkan pemeriksaan khusus untuk perlindungan yang tidak tersedia dari Solidity, seperti melindungi dari fungsi yang ditimpa. Terakhir, gunakan Manticore untuk melakukan verifikasi tertarget pada properti keamanan penting, misalnya, operasi aritmetika.

- Gunakan CLI Slither untuk menangkap masalah umum
- Gunakan Echidna untuk menguji properti keamanan tingkat tinggi dari kontrak Anda
- Gunakan Slither untuk menulis pemeriksaan statis khusus
- Gunakan Manticore setelah Anda menginginkan jaminan mendalam atas properti keamanan penting

**Catatan tentang pengujian unit**. Pengujian unit diperlukan untuk membangun perangkat lunak berkualitas tinggi. Namun, teknik-teknik ini bukanlah yang paling cocok untuk menemukan celah keamanan. Pengujian ini biasanya digunakan untuk menguji perilaku positif dari kode (yaitu, kode bekerja seperti yang diharapkan dalam konteks normal), sementara celah keamanan cenderung berada dalam kasus-kasus ekstrem yang tidak dipertimbangkan oleh pengembang. Dalam studi kami terhadap puluhan ulasan keamanan kontrak pintar, [cakupan pengujian unit tidak berpengaruh pada jumlah atau tingkat keparahan celah keamanan](https://blog.trailofbits.com/2019/08/08/246-findings-from-our-smart-contract-audits-an-executive-summary/) yang kami temukan dalam kode klien kami.

## Menentukan Properti Keamanan {#determining-security-properties}

Untuk menguji dan memverifikasi kode Anda secara efektif, Anda harus mengidentifikasi area yang memerlukan perhatian. Karena sumber daya Anda yang dihabiskan untuk keamanan terbatas, menentukan cakupan bagian yang lemah atau bernilai tinggi dari basis kode Anda adalah penting untuk mengoptimalkan upaya Anda. Pemodelan ancaman dapat membantu. Pertimbangkan untuk meninjau:

- [Penilaian Risiko Cepat (Rapid Risk Assessments)](https://infosec.mozilla.org/guidelines/risk/rapid_risk_assessment.html) (pendekatan pilihan kami ketika waktu terbatas)
- [Panduan Pemodelan Ancaman Sistem yang Berpusat pada Data](https://csrc.nist.gov/pubs/sp/800/154/ipd) (alias NIST 800-154)
- [Pemodelan ancaman Shostack](https://www.amazon.com/Threat-Modeling-Designing-Adam-Shostack/dp/1118809998)
- [STRIDE](https://wikipedia.org/wiki/STRIDE_\(security\)) / [DREAD](https://wikipedia.org/wiki/DREAD_\(risk_assessment_model\))
- [PASTA](https://wikipedia.org/wiki/Threat_model#P.A.S.T.A.)
- [Penggunaan Pernyataan (Use of Assertions)](https://blog.regehr.org/archives/1091)

### Komponen {#components}

Mengetahui apa yang ingin Anda periksa juga akan membantu Anda memilih perangkat yang tepat.

Area luas yang sering relevan untuk kontrak pintar meliputi:

- **Mesin state.** Sebagian besar kontrak dapat direpresentasikan sebagai mesin state. Pertimbangkan untuk memeriksa bahwa (1) Tidak ada state yang tidak valid yang dapat dijangkau, (2) jika suatu state valid, state tersebut dapat dijangkau, dan (3) tidak ada state yang menjebak kontrak.

  - Echidna dan Manticore adalah perangkat yang lebih diutamakan untuk menguji spesifikasi mesin state.

- **Kontrol akses.** Jika sistem Anda memiliki pengguna dengan hak istimewa (misalnya, pemilik, pengontrol, ...) Anda harus memastikan bahwa (1) setiap pengguna hanya dapat melakukan tindakan yang diizinkan dan (2) tidak ada pengguna yang dapat memblokir tindakan dari pengguna yang memiliki hak istimewa lebih tinggi.

  - Slither, Echidna, dan Manticore dapat memeriksa kontrol akses yang benar. Misalnya, Slither dapat memeriksa bahwa hanya fungsi yang masuk daftar putih yang tidak memiliki pengubah onlyOwner. Echidna dan Manticore berguna untuk kontrol akses yang lebih kompleks, seperti izin yang diberikan hanya jika kontrak mencapai state tertentu.

- **Operasi aritmetika.** Memeriksa ketepatan operasi aritmetika sangat penting. Menggunakan `SafeMath` di mana-mana adalah langkah yang baik untuk mencegah overflow/underflow, namun, Anda masih harus mempertimbangkan kelemahan aritmetika lainnya, termasuk masalah pembulatan dan kelemahan yang menjebak kontrak.

  - Manticore adalah pilihan terbaik di sini. Echidna dapat digunakan jika aritmetika berada di luar cakupan pemecah SMT.

- **Kebenaran pewarisan.** Kontrak Solidity sangat bergantung pada pewarisan berganda. Kesalahan seperti fungsi bayangan (shadowing function) yang tidak memiliki panggilan `super` dan urutan linearisasi c3 yang salah ditafsirkan dapat dengan mudah terjadi.

  - Slither adalah perangkat untuk memastikan deteksi masalah ini.

- **Interaksi eksternal.** Kontrak berinteraksi satu sama lain, dan beberapa kontrak eksternal tidak boleh dipercaya. Misalnya, jika kontrak Anda mengandalkan oracle eksternal, akankah tetap aman jika separuh oracle yang tersedia disusupi?

  - Manticore dan Echidna adalah pilihan terbaik untuk menguji interaksi eksternal dengan kontrak Anda. Manticore memiliki mekanisme bawaan untuk men-stub kontrak eksternal.

- **Kesesuaian standar.** Standar Ethereum (misalnya, ERC20) memiliki riwayat kelemahan dalam desainnya. Waspadai batasan standar yang Anda gunakan sebagai dasar.
  - Slither, Echidna, dan Manticore akan membantu Anda mendeteksi penyimpangan dari standar yang diberikan.

### Contekan pemilihan perangkat {#tool-selection-cheatsheet}

| Komponen            | Peralatan                   | Contoh                                                                                                                                                                                                                                                                      |
| ------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mesin state         | Echidna, Manticore          |                                                                                                                                                                                                                                                                             |
| Kontrol akses       | Slither, Echidna, Manticore | [Latihan Slither 2](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise2.md), [Latihan Echidna 2](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-2.md) |
| Operasi aritmetika  | Manticore, Echidna          | [Latihan Echidna 1](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-1.md), [Latihan Manticore 1 - 3](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore/exercises)      |
| Kebenaran pewarisan | Slither                     | [Latihan Slither 1](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise1.md)                                                                                                                                        |
| Interaksi eksternal | Manticore, Echidna          |                                                                                                                                                                                                                                                                             |
| Kesesuaian standar  | Slither, Echidna, Manticore | [`slither-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance)                                                                                                                                                                                                     |

Area lain perlu diperiksa tergantung pada tujuan Anda, tetapi area fokus yang luas ini adalah awal yang baik untuk sistem kontrak pintar apa pun.

Audit publik kami berisi contoh properti yang terverifikasi atau teruji. Pertimbangkan untuk membaca bagian `Pengujian dan Verifikasi Otomatis` dari laporan berikut untuk meninjau properti keamanan dunia nyata:

- [0x](https://github.com/trailofbits/publications/blob/master/reviews/0x-protocol.pdf)
- [Balancer](https://github.com/trailofbits/publications/blob/master/reviews/BalancerCore.pdf)
