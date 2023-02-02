---
title: Panduan tentang peralatan keamanan kontrak pintar
description: Gambaran umum tentang tiga teknik analisis pengujian dan program yang berbeda
author: "Trailofbits"
lang: id
tags:
  - "solidity"
  - "kontrak pintar"
  - "keamanan"
skill: intermediate
published: 2020-09-07
source: Membuat kontrak yang aman
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis
---

Kita akan menggunakan tiga teknik analisis pengujian dan program yang berbeda:

- **Analisis statis dengan [Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/).** Semua jalur program diperkirakan dan dianalisa pada saat yang sama, melalui presentasi program yang berbeda (misalnya grafik alur kontrol)
- **Fuzzing dengan [Echidna](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/).** Kode dieksekusi dengan penghasil transaksi semu acak. Fuzzer akan mencoba menemukan urutan transaksi untuk melanggar properti yang diberikan.
- **Eksekusi simbolis dengan [Manticore](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/).** Sebuah teknik verifikasi formal, yang menerjemahkan setiap jalur eksekusi ke dalam formula matematika, yang di atasnya pembatas puncak dapat diperiksa.

Setiap teknik memiliki keunggulan dan kelemahan, dan akan berguna dalam [kasus tertentu](#determining-security-properties):

| Teknik            | Peralatan | Penggunaan                  | Kecepatan | Bug yang terlewat | Alarm Palsu |
| ----------------- | --------- | --------------------------- | --------- | ----------------- | ----------- |
| Analisis Statis   | Slither   | CLI dan skrip               | detik     | sedang            | rendah      |
| Fuzzing           | Echidna   | Properti Solidity           | menit     | rendah            | tidak ada   |
| Eksekusi Simbolis | Manticore | Properti Solidity dan skrip | jam       | tidak ada\*       | tidak ada   |

\* jika semua jalur dijelajahi tanpa timeout

**Slither** menganalisa kontrak dalam hitungan detik, namun analisis statis mungkin menghasilkan alarm palsu dan akan kurang cocok untuk pemeriksaan yang kompleks (misalnya pemeriksaan aritmatika). Jalankan Slither melalui API untuk akses tombol tekan dari detektor bawaan atau melalui API untuk pemeriksaan yang ditentukan pengguna.

**Echidna** perlu dijalankan untuk beberapa menit dan hanya akan menghasilkan nilai positif benar. Echidna memeriksa properti keamanan yang disediakan pengguna, yang ditulis dalam Solidity. Pemeriksaan ini mungkin melewatkan bug karena mengandalkan penjelajahan acak.

**Manticore** melakukan analisis "bobot paling berat". Seperti Echidna, Manticore memverifikasi properti yang disediakan pengguna. Akan memakan lebih banyak waktu untuk dijalankan, tetapi dapat membuktikan validitas properti dan tidak akan melaporkan alarm palsu.

## Alur kerja yang disarankan {#suggested-workflow}

Mulai dengan detektor bawaan Slither untuk memastikan bahwa tidak ada bug sederhana yang muncul saat ini atau yang akan ditunjukkan nantinya. Gunakan Slither untuk memeriksa properti yang terkait dengan warisan, dependensi variabel, dan masalah struktur. Seiring dengan perkembangan basis kode, gunakan Echidna untuk menguji properti mesin state yang lebih kompleks. Kembali ke Slither untuk mengembangkan pemeriksaan kustom untuk mendapatkan perlindungan yang tidak tersedia di Solidity, seperti perlindungan terhadap fungsi yang diganti. Akhirnya, gunakan Manticore untuk melakukan verifikasi yang ditargetkan terhadap properti keamanan penting, misalnya operasi aritmatika.

- Gunakan CLI Slither untuk memukan masalah umum
- Gunakan Echidna untuk menguji properti keamanan tingkat tinggi dari kontrak Anda
- Gunakan Slither untuk menulis pemeriksaan statis kustom
- Gunakan Manticore jika Anda menginginkan jaminan mendalam untuk properti keamanan penting

**Sebuah catatan tentang tes unit**. Tes unit diperlukan untuk membangun perangkat lunak berkualitas tinggi. Namun, teknik ini bukan yang terbaik untuk menemukan celah keamanan. Teknik ini umumnya digunakan untuk menguji perilaku kode yang positif (maksudnya kodenya bekerja seperti yang diharapkan dalam kondisi normal), sedangkan celah keamanan cenderung ada di dalam kasus tepi yang tidak dipertimbangkan oleh para pengembang. Dalam penelitian kami terhadap lusinan ulasan keamanan kontrak pintar, [cakupan tes unit tidak berdampak apa pun terhadap jumlah atau tingkat keparahan celah keamanan](https://blog.trailofbits.com/2019/08/08/246-findings-from-our-smart-contract-audits-an-executive-summary/) yang kami temukan dalam kode klien kami.

## Menentukan Properti Keamanan {#determining-security-properties}

Untuk menguji dan memverifikasi kode Anda dengan efektif, Anda harus mengidentifikasi area yang perlu diperhatikan. Karena sumber daya Anda yang digunakan untuk keamanan terbatas, membuat cakupan bagian yang bernilai tinggi atau rendah dari basis kode Anda menjadi penting untuk mengoptimalkan upaya Anda. Pemodelan dapat membantu. Pertimbangkan untuk mengulas:

- [Penilaian Risiko Cepat](https://infosec.mozilla.org/guidelines/risk/rapid_risk_assessment.html) (pendekatan pilihan kami ketika waktu yang tersedia pendek)
- [Panduan ke Pemodelan Ancaman Sistem Berpusat pada Data](https://csrc.nist.gov/publications/detail/sp/800-154/draft) (alias NIST 800-154)
- [Pemodelan ancaman shostack](https://www.amazon.com/Threat-Modeling-Designing-Adam-Shostack/dp/1118809998)
- [STRIDE](<https://wikipedia.org/wiki/STRIDE_(security)>) / [DREAD](<https://wikipedia.org/wiki/DREAD_(risk_assessment_model)>)
- [PASTA](https://wikipedia.org/wiki/Threat_model#P.A.S.T.A.)
- [Penggunaan Assertion](https://blog.regehr.org/archives/1091)

### Komponen {#components}

Mengetahui apa yang Anda ingin periksa akan menolong Anda memilih peralatan yang tepat.

Area luas yang sering kali relevan untuk kontrak pintar mencakup:

- **Mesin state.** Kebanyakan kontrak dapat direpresentasikan sebagai mesin state. Pertimbangkan untuk memeriksa bahwa (1) Tidak ada state yang tidak valid yang dapat dicapai, (2) jika state valid, state dapat dicapai, dan (3) tidak ada state yang memerangkap kontrak.

  - Echidna dan Manticore adalah peralatan yang lebih disarankan untuk menguji spesifikasi mesin state.

- **Access controls.** If your system has privileged users (e.g. an owner, controllers, ...) you must ensure that (1) each user can only perform the authorized actions and (2) no user can block actions from a more privileged user.

  - Slither, Echidna, dan Manticore dapat memeriksa kontrol akses yang benar. Sebagai contoh, Slither dapat memeriksa bahwa hanya fungsi yang masuk dalam daftar putih yang tidak memiliki modifier onlyOwner. Echidna dan Manticore berguna untuk kontrol akses yang lebih kompleks, seperti izin yang diberikan hanya jika kontrak mencapai state yang diberikan.

- **Operasi aritmatika.** Memeriksa kelogisan operasi aritmatika itu penting. Menggunakan `SafeMath` di mana saja adalah langkah yang baik untuk mencegah overflow/underflow, namun, Anda masih harus mempertimbangkan celah aritmatika lainnya, termasuk masalah pembulatan dan celah yang memerangkap kontrak.

  - Manticore adalah pilihan terbaik di sini. Echidna dapat digunakan jika aritmatikanya berada di luar cakupan penyelesai SMT.

- **Ketepatan warisan.** Kontrak Solidity sangat mengandalkan berbagai warisan. Kesalahan seperti fungsi pembayangan yang kehilangan pemanggilan `super` dan perintah linearisasi c3 yang disalahartikan dapat dengan mudah ditunjukkan.

  - Slither adalah peralatan untuk memastikan pendeteksian masalah ini.

- **Interaksi eksternal.** Kontrak berinteraksi dengan satu sama lain, dan beberapa kontrak eksternal seharusnya tidak dipercaya. Sebagai contoh, jika kontrak Anda mengandalkan oracle eksternal, akankah ia tetap aman jika setengah dari oracle yang tersedia dapat dibajak?

  - Manticore dan Echidna adalah pilihan terbaik untuk menguji interaksi eksternal dengan kontrak Anda. Manticore memiliki mekanisme bawaan untuk melakukan tes stub pada kontrak eksternal.

- **Kesesuaian dengan standar.** Standar Ethereum (misalnya ERC20) memiliki riwayat ditemukannya celah dalam rancangannya. Ketahuilah batasan standar yang sedang Anda bangun.
  - Slither, Echidna, dan Manticore akan membantu Anda mendeteksi deviasi dari standar yang diberikan.

### Lembar contekan pemilihan peralatan {#tool-selection-cheatsheet}

| Komponen            | Perangkat                   | Contoh                                                                                                                                                                                                                                                       |
| ------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Mesin state         | Echidna, Manticore          |                                                                                                                                                                                                                                                              |
| Kontrol akses       | Slither, Echidna, Manticore | [Latihan Slither 2](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/slither/exercise2.md), [Latihan Echidna 2](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/Exercise-2.md)      |
| Operasi aritmatika  | Manticore, Echidna          | [Latihan Echidna 1](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/Exercise-1.md), [Latihan Manticore 1 - 3](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore/exercises) |
| Ketepatan warisan   | Slither                     | [Latihan Slither 1](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/slither/exercise1.md)                                                                                                                                   |
| Interaksi eksternal | Manticore, Echidna          |                                                                                                                                                                                                                                                              |
| Kesesuaian standar  | Slither, Echidna, Manticore | [`slither-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance)                                                                                                                                                                                      |

Area lainnya perlu diperiksa bergantung pada tujuan Anda, tetapi area fokus berbutir kasar ini adalah awal yang baik untuk sistem kontrak pintar mana pun.

Audit publik kami berisi contoh properti yang telah diverifikasi atau diuji. Pertimbangkan untuk membaca bagian `Pengujian dan Verifikasi Otomatis` dari laporan berikut ini untuk mengulas properti keamanan di dunia nyata:

- [0x](https://github.com/trailofbits/publications/blob/master/reviews/0x-protocol.pdf)
- [Balancer](https://github.com/trailofbits/publications/blob/master/reviews/BalancerCore.pdf)
