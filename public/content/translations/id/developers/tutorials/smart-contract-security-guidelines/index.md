---
title: Panduan keamanan kontrak pintar
description: Daftar periksa panduan keamanan untuk dipertimbangkan saat membangun dapp Anda
author: "Trailofbits"
tags: ["Solidity", "kontrak pintar", "keamanan"]
skill: intermediate
breadcrumb: "Panduan keamanan"
lang: id
published: 2020-09-06
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/guidelines.md
---

Ikuti rekomendasi tingkat tinggi ini untuk membangun kontrak pintar yang lebih aman.

## Panduan desain {#design-guidelines}

Desain kontrak harus didiskusikan sebelumnya, sebelum menulis baris kode apa pun.

### Dokumentasi dan spesifikasi {#documentation-and-specifications}

Dokumentasi dapat ditulis pada tingkat yang berbeda, dan harus diperbarui saat mengimplementasikan kontrak:

- **Deskripsi sistem dalam bahasa Inggris yang sederhana**, menjelaskan apa yang dilakukan kontrak dan asumsi apa pun pada basis kode.
- **Skema dan diagram arsitektur**, termasuk interaksi kontrak dan mesin status dari sistem. [Slither printers](https://github.com/crytic/slither/wiki/Printer-documentation) dapat membantu menghasilkan skema ini.
- **Dokumentasi kode yang menyeluruh**, [format Natspec](https://docs.soliditylang.org/en/develop/natspec-format.html) dapat digunakan untuk Solidity.

### Komputasi onchain vs offchain {#onchain-vs-offchain-computation}

- **Simpan sebanyak mungkin kode secara offchain.** Jaga agar lapisan onchain tetap kecil. Pra-proses data dengan kode offchain sedemikian rupa sehingga verifikasi onchain menjadi sederhana. Apakah Anda memerlukan daftar yang diurutkan? Urutkan daftar secara offchain, lalu periksa urutannya secara onchain.

### Kemampuan peningkatan {#upgradeability}

Kami membahas berbagai solusi kemampuan peningkatan di [postingan blog kami](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/). Buatlah pilihan yang disengaja untuk mendukung kemampuan peningkatan atau tidak sebelum menulis kode apa pun. Keputusan ini akan memengaruhi cara Anda menyusun kode Anda. Secara umum, kami merekomendasikan:

- **Lebih mengutamakan [migrasi kontrak](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/) daripada kemampuan peningkatan.** Sistem migrasi memiliki banyak keuntungan yang sama dengan sistem yang dapat ditingkatkan, tanpa kekurangannya.
- **Menggunakan pola pemisahan data daripada pola delegatecallproxy.** Jika proyek Anda memiliki pemisahan abstraksi yang jelas, kemampuan peningkatan menggunakan pemisahan data hanya akan memerlukan sedikit penyesuaian. Delegatecallproxy membutuhkan keahlian EVM dan sangat rentan terhadap kesalahan.
- **Dokumentasikan prosedur migrasi/peningkatan sebelum penerapan.** Jika Anda harus bereaksi di bawah tekanan tanpa panduan apa pun, Anda akan membuat kesalahan. Tulis prosedur yang harus diikuti sebelumnya. Ini harus mencakup:
  - Panggilan yang memulai kontrak baru
  - Di mana kunci disimpan dan bagaimana cara mengaksesnya
  - Bagaimana cara memeriksa penerapan! Kembangkan dan uji skrip pasca-penerapan.

## Panduan implementasi {#implementation-guidelines}

**Berusahalah untuk kesederhanaan.** Selalu gunakan solusi paling sederhana yang sesuai dengan tujuan Anda. Setiap anggota tim Anda harus dapat memahami solusi Anda.

### Komposisi fungsi {#function-composition}

Arsitektur basis kode Anda harus membuat kode Anda mudah ditinjau. Hindari pilihan arsitektur yang mengurangi kemampuan untuk menalar kebenarannya.

- **Pisahkan logika sistem Anda**, baik melalui beberapa kontrak atau dengan mengelompokkan fungsi-fungsi serupa bersama-sama (misalnya, autentikasi, aritmatika, ...).
- **Tulis fungsi-fungsi kecil, dengan tujuan yang jelas.** Ini akan memfasilitasi peninjauan yang lebih mudah dan memungkinkan pengujian komponen individu.

### Pewarisan {#inheritance}

- **Jaga agar pewarisan tetap dapat dikelola.** Pewarisan harus digunakan untuk membagi logika, namun, proyek Anda harus bertujuan untuk meminimalkan kedalaman dan lebar pohon pewarisan.
- **Gunakan [inheritance printer](https://github.com/crytic/slither/wiki/Printer-documentation#inheritance-graph) dari Slither untuk memeriksa hierarki kontrak.** Inheritance printer akan membantu Anda meninjau ukuran hierarki.

### Event {#events}

- **Catat semua operasi penting.** Event akan membantu men-debug kontrak selama pengembangan, dan memantaunya setelah penerapan.

### Hindari jebakan yang diketahui {#avoid-known-pitfalls}

- **Waspadai masalah keamanan yang paling umum.** Ada banyak sumber daya online untuk mempelajari masalah umum, seperti [Ethernaut CTF](https://ethernaut.openzeppelin.com/), [Capture the Ether](https://capturetheether.com/), atau [Not so smart contracts](https://github.com/crytic/not-so-smart-contracts/).
- **Waspadai bagian peringatan di [dokumentasi Solidity](https://docs.soliditylang.org/en/latest/).** Bagian peringatan akan memberi tahu Anda tentang perilaku bahasa yang tidak jelas.

### Dependensi {#dependencies}

- **Gunakan pustaka yang telah diuji dengan baik.** Mengimpor kode dari pustaka yang telah diuji dengan baik akan mengurangi kemungkinan Anda menulis kode yang penuh bug. Jika Anda ingin menulis kontrak ERC20, gunakan [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
- **Gunakan manajer dependensi; hindari menyalin-tempel kode.** Jika Anda mengandalkan sumber eksternal, maka Anda harus menjaganya agar tetap mutakhir dengan sumber aslinya.

### Pengujian dan verifikasi {#testing-and-verification}

- **Tulis pengujian unit yang menyeluruh.** Rangkaian pengujian yang ekstensif sangat penting untuk membangun perangkat lunak berkualitas tinggi.
- **Tulis pemeriksaan dan properti kustom [Slither](https://github.com/crytic/slither), [Echidna](https://github.com/crytic/echidna), dan [Manticore](https://github.com/trailofbits/manticore).** Alat otomatis akan membantu memastikan kontrak Anda aman. Tinjau sisa panduan ini untuk mempelajari cara menulis pemeriksaan dan properti yang efisien.
- **Gunakan [crytic.io](https://crytic.io/).** Crytic terintegrasi dengan GitHub, menyediakan akses ke detektor Slither pribadi, dan menjalankan pemeriksaan properti kustom dari Echidna.

### Solidity {#solidity}

- **Lebih mengutamakan Solidity 0.5 daripada 0.4 dan 0.6.** Menurut pendapat kami, Solidity 0.5 lebih aman dan memiliki praktik bawaan yang lebih baik daripada 0.4. Solidity 0.6 telah terbukti terlalu tidak stabil untuk produksi dan membutuhkan waktu untuk matang.
- **Gunakan rilis stabil untuk mengkompilasi; gunakan rilis terbaru untuk memeriksa peringatan.** Periksa apakah kode Anda tidak memiliki masalah yang dilaporkan dengan versi kompiler terbaru. Namun, Solidity memiliki siklus rilis yang cepat dan memiliki riwayat bug kompiler, jadi kami tidak merekomendasikan versi terbaru untuk penerapan (lihat [rekomendasi versi solc](https://github.com/crytic/slither/wiki/Detector-Documentation#recommendation-33) dari Slither).
- **Jangan gunakan inline assembly.** Assembly membutuhkan keahlian EVM. Jangan menulis kode EVM jika Anda belum _menguasai_ yellow paper.

## Panduan penerapan {#deployment-guidelines}

Setelah kontrak dikembangkan dan diterapkan:

- **Pantau kontrak Anda.** Perhatikan log, dan bersiaplah untuk bereaksi jika terjadi kompromi pada kontrak atau dompet.
- **Tambahkan info kontak Anda ke [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).** Daftar ini membantu pihak ketiga menghubungi Anda jika celah keamanan ditemukan.
- **Amankan dompet pengguna yang memiliki hak istimewa.** Ikuti [praktik terbaik](https://blog.trailofbits.com/2018/11/27/10-rules-for-the-secure-use-of-cryptocurrency-hardware-wallets/) kami jika Anda menyimpan kunci di dompet perangkat keras.
- **Miliki rencana respons terhadap insiden.** Pertimbangkan bahwa kontrak pintar Anda dapat disusupi. Bahkan jika kontrak Anda bebas dari bug, penyerang mungkin mengambil kendali atas kunci pemilik kontrak.