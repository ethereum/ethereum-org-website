---
title: Panduan untuk alat keamanan kontrak pintar
description: Gambaran umum tentang tiga teknik pengujian dan analisis program yang berbeda
author: "Trailofbits"
lang: id
tags: ["Solidity", "kontrak pintar", "keamanan"]
skill: intermediate
breadcrumb: "Alat keamanan"
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis
---

Kita akan menggunakan tiga teknik pengujian dan analisis program yang berbeda:

- **Analisis statis dengan [Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/).** Semua jalur program diperkirakan dan dianalisis pada saat yang sama, melalui presentasi program yang berbeda (misalnya, grafik aliran kontrol)
- **Fuzzing dengan [Echidna](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/).** Kode dieksekusi dengan pembuatan transaksi pseudo-acak. Fuzzer akan mencoba menemukan urutan transaksi untuk melanggar properti yang diberikan.
- **Eksekusi simbolis dengan [Manticore](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/).** Sebuah teknik verifikasi formal, yang menerjemahkan setiap jalur eksekusi ke dalam rumus matematika, di mana batasan-batasan di atasnya dapat diperiksa.

Setiap teknik memiliki kelebihan dan kekurangan, dan akan berguna dalam [kasus-kasus tertentu](#determining-security-properties):

| Teknik | Alat | Penggunaan | Kecepatan | Bug yang terlewat | Alarm Palsu |
| ------------------ | --------- | ----------------------------- | ------- | ----------- | ------------ |
| Analisis Statis | Slither | CLI & skrip | detik | sedang | rendah |
| Fuzzing | Echidna | Properti Solidity | menit | rendah | tidak ada |
| Eksekusi Simbolis | Manticore | Properti & skrip Solidity | jam | tidak ada\* | tidak ada |

\* jika semua jalur dieksplorasi tanpa batas waktu (timeout)

**Slither** menganalisis kontrak dalam hitungan detik, namun, analisis statis mungkin menghasilkan alarm palsu dan akan kurang cocok untuk pemeriksaan kompleks (misalnya, pemeriksaan aritmatika). Jalankan Slither melalui API untuk akses instan ke detektor bawaan atau melalui API untuk pemeriksaan yang ditentukan pengguna.

**Echidna** perlu berjalan selama beberapa menit dan hanya akan menghasilkan positif sejati. Echidna memeriksa properti keamanan yang diberikan pengguna, yang ditulis dalam Solidity. Alat ini mungkin melewatkan bug karena didasarkan pada eksplorasi acak.

**Manticore** melakukan analisis "paling berat". Seperti Echidna, Manticore memverifikasi properti yang diberikan pengguna. Alat ini akan membutuhkan lebih banyak waktu untuk berjalan, tetapi dapat membuktikan validitas suatu properti dan tidak akan melaporkan alarm palsu.

## Alur kerja yang disarankan {#suggested-workflow}

Mulailah dengan detektor bawaan Slither untuk memastikan bahwa tidak ada bug sederhana yang ada saat ini atau yang akan muncul di kemudian hari. Gunakan Slither untuk memeriksa properti yang terkait dengan pewarisan, dependensi variabel, dan masalah struktural. Seiring berkembangnya basis kode, gunakan Echidna untuk menguji properti yang lebih kompleks dari mesin status (state machine). Kunjungi kembali Slither untuk mengembangkan pemeriksaan kustom untuk perlindungan yang tidak tersedia dari Solidity, seperti melindungi agar fungsi tidak ditimpa (overridden). Terakhir, gunakan Manticore untuk melakukan verifikasi yang ditargetkan pada properti keamanan kritis, misalnya, operasi aritmatika.

- Gunakan CLI Slither untuk menangkap masalah umum
- Gunakan Echidna untuk menguji properti keamanan tingkat tinggi dari kontrak Anda
- Gunakan Slither untuk menulis pemeriksaan statis kustom
- Gunakan Manticore setelah Anda menginginkan jaminan mendalam tentang properti keamanan kritis

**Catatan tentang pengujian unit**. Pengujian unit diperlukan untuk membangun perangkat lunak berkualitas tinggi. Namun, teknik-teknik ini bukanlah yang paling cocok untuk menemukan celah keamanan. Mereka biasanya digunakan untuk menguji perilaku positif dari kode (yaitu, kode berfungsi seperti yang diharapkan dalam konteks normal), sementara celah keamanan cenderung berada pada kasus tepi (edge cases) yang tidak dipertimbangkan oleh pengembang. Dalam studi kami terhadap puluhan tinjauan keamanan kontrak pintar, [cakupan pengujian unit tidak berpengaruh pada jumlah atau tingkat keparahan celah keamanan](https://blog.trailofbits.com/2019/08/08/246-findings-from-our-smart-contract-audits-an-executive-summary/) yang kami temukan dalam kode klien kami.

## Menentukan Properti Keamanan {#determining-security-properties}

Untuk menguji dan memverifikasi kode Anda secara efektif, Anda harus mengidentifikasi area yang memerlukan perhatian. Karena sumber daya yang Anda habiskan untuk keamanan terbatas, membatasi bagian yang lemah atau bernilai tinggi dari basis kode Anda adalah penting untuk mengoptimalkan upaya Anda. Pemodelan ancaman (threat modeling) dapat membantu. Pertimbangkan untuk meninjau:

- [Penilaian Risiko Cepat](https://infosec.mozilla.org/guidelines/risk/rapid_risk_assessment.html) (pendekatan pilihan kami saat waktu terbatas)
- [Panduan Pemodelan Ancaman Sistem Berpusat pada Data](https://csrc.nist.gov/pubs/sp/800/154/ipd) (alias NIST 800-154)
- [Pemodelan ancaman Shostack](https://www.amazon.com/Threat-Modeling-Designing-Adam-Shostack/dp/1118809998)
- [STRIDE](<https://wikipedia.org/wiki/STRIDE_(security)>) / [DREAD](<https://wikipedia.org/wiki/DREAD_(risk_assessment_model)>)
- [PASTA](https://wikipedia.org/wiki/Threat_model#P.A.S.T.A.)
- [Penggunaan Asersi](https://blog.regehr.org/archives/1091)

### Komponen {#components}

Mengetahui apa yang ingin Anda periksa juga akan membantu Anda memilih alat yang tepat.

Area luas yang sering kali relevan untuk kontrak pintar meliputi:

- **Mesin status (State machine).** Sebagian besar kontrak dapat direpresentasikan sebagai mesin status. Pertimbangkan untuk memeriksa bahwa (1) Tidak ada status tidak valid yang dapat dicapai, (2) jika suatu status valid maka status tersebut dapat dicapai, dan (3) tidak ada status yang menjebak kontrak.

  - Echidna dan Manticore adalah alat yang disukai untuk menguji spesifikasi mesin status.

- **Kontrol akses.** Jika sistem Anda memiliki pengguna dengan hak istimewa (misalnya, pemilik, pengontrol, ...) Anda harus memastikan bahwa (1) setiap pengguna hanya dapat melakukan tindakan yang diotorisasi dan (2) tidak ada pengguna yang dapat memblokir tindakan dari pengguna yang memiliki hak istimewa lebih tinggi.

  - Slither, Echidna, dan Manticore dapat memeriksa kontrol akses yang benar. Misalnya, Slither dapat memeriksa bahwa hanya fungsi yang masuk daftar putih (whitelisted) yang tidak memiliki pengubah onlyOwner. Echidna dan Manticore berguna untuk kontrol akses yang lebih kompleks, seperti izin yang diberikan hanya jika kontrak mencapai status tertentu.

- **Operasi aritmatika.** Memeriksa keandalan operasi aritmatika sangatlah penting. Menggunakan `SafeMath` di mana-mana adalah langkah yang baik untuk mencegah overflow/underflow, namun, Anda tetap harus mempertimbangkan kelemahan aritmatika lainnya, termasuk masalah pembulatan dan kelemahan yang menjebak kontrak.

  - Manticore adalah pilihan terbaik di sini. Echidna dapat digunakan jika aritmatika berada di luar cakupan pemecah SMT (SMT solver).

- **Kebenaran pewarisan.** Kontrak Solidity sangat bergantung pada pewarisan berganda (multiple inheritance). Kesalahan seperti fungsi bayangan (shadowing function) yang kehilangan panggilan `super` dan urutan linearisasi c3 yang disalahartikan dapat dengan mudah terjadi.

  - Slither adalah alat untuk memastikan deteksi masalah-masalah ini.

- **Interaksi eksternal.** Kontrak berinteraksi satu sama lain, dan beberapa kontrak eksternal tidak boleh dipercaya. Misalnya, jika kontrak Anda bergantung pada oracle eksternal, apakah kontrak tersebut akan tetap aman jika separuh dari oracle yang tersedia disusupi?

  - Manticore dan Echidna adalah pilihan terbaik untuk menguji interaksi eksternal dengan kontrak Anda. Manticore memiliki mekanisme bawaan untuk membuat stub kontrak eksternal.

- **Kesesuaian standar.** Standar Ethereum (misalnya, ERC20) memiliki sejarah kelemahan dalam desainnya. Waspadai keterbatasan standar yang Anda bangun.
  - Slither, Echidna, dan Manticore akan membantu Anda mendeteksi penyimpangan dari standar tertentu.

### Lembar contekan pemilihan alat {#tool-selection-cheatsheet}

| Komponen | Alat | Contoh |
| ----------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mesin status | Echidna, Manticore | |
| Kontrol akses | Slither, Echidna, Manticore | [Latihan Slither 2](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise2.md), [Latihan Echidna 2](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-2.md) |
| Operasi aritmatika | Manticore, Echidna | [Latihan Echidna 1](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-1.md), [Latihan Manticore 1 - 3](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore/exercises) |
| Kebenaran pewarisan | Slither | [Latihan Slither 1](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise1.md) |
| Interaksi eksternal | Manticore, Echidna | |
| Kesesuaian standar | Slither, Echidna, Manticore | [`slither-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance) |

Area lain perlu diperiksa tergantung pada tujuan Anda, tetapi area fokus yang bersifat umum ini adalah awal yang baik untuk sistem kontrak pintar apa pun.

Audit publik kami berisi contoh properti yang diverifikasi atau diuji. Pertimbangkan untuk membaca bagian `Automated Testing and Verification` dari laporan berikut untuk meninjau properti keamanan di dunia nyata:

- [0x](https://github.com/trailofbits/publications/blob/master/reviews/0x-protocol.pdf)
- [Balancer](https://github.com/trailofbits/publications/blob/master/reviews/BalancerCore.pdf)