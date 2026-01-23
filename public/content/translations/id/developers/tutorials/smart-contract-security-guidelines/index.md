---
title: Panduan keamanan kontrak pintar
description: Daftar periksa panduan keamanan untuk dipertimbangkan saat menyusun dapp Anda
author: "Ipungpurwono"
tags: [ "Solidity", "kontrak pintar", "keamanan" ]
skill: intermediate
lang: id
published: 2020-09-06
source: Membuat kontrak yang aman
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/guidelines.md
---

Ikuti rekomendasi tingkat tinggi ini untuk membuat kontrak pintar yang lebih aman.

## Panduan desain {#design-guidelines}

Desain sebuah kontrak harus dibahas sebelumnya, sebelum menulis baris kode apa pun.

### Dokumentasi dan spesifikasi {#documentation-and-specifications}

Dokumentasi dapat ditulis pada tingkat yang berbeda, dan harus diperbarui saat mengimplementasikan kontrak:

- **Deskripsi sistem dalam bahasa Inggris sederhana**, yang menjelaskan apa yang dilakukan kontrak dan asumsi apa pun pada basis kode.
- **Diagram skema dan arsitektural**, termasuk interaksi kontrak dan mesin state sistem. [Pencetak Slither](https://github.com/crytic/slither/wiki/Printer-documentation) dapat membantu membuat skema ini.
- **Dokumentasi kode yang menyeluruh**, [format Natspec](https://docs.soliditylang.org/en/develop/natspec-format.html) dapat digunakan untuk Solidity.

### Komputasi onchain vs offchain {#onchain-vs-offchain-computation}

- **Simpan sebanyak mungkin kode secara offchain.** Jaga agar lapisan onchain tetap kecil. Pra-proses data dengan kode secara offchain sedemikian rupa sehingga verifikasi onchain menjadi sederhana. Apakah Anda memerlukan daftar yang berurutan? Urutkan daftarnya secara offchain, lalu hanya periksa urutannya secara onchain.

### Keterbaharuan {#upgradeability}

Kami membahas berbagai solusi keterbaharuan di [postingan blog kami](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/). Buat pilihan secara sengaja untuk mendukung kemungkinan peningkatan atau tidak, sebelum menulis kode apa pun. Keputusan tersebut akan memengaruhi cara Anda menyusun kode Anda. Secara umum, kami menyarankan:

- **Utamakan [migrasi kontrak](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/) daripada keterbaharuan.** Sistem migrasi memiliki banyak keuntungan yang sama dengan sistem yang dapat ditingkatkan, tanpa kekurangannya.
- **Gunakan pola pemisahan data daripada pola delegatecallproxy.** Jika proyek Anda memiliki pemisahan abstraksi yang jelas, keterbaharuan menggunakan pemisahan data hanya akan memerlukan beberapa penyesuaian. Fungsi delegatecallproxy memerlukan keahlian EVM dan sangat rentan memiliki kesalahan.
- **Dokumentasikan prosedur migrasi/pemutakhiran sebelum deployment.** Jika Anda harus bereaksi di bawah tekanan tanpa panduan apa pun, Anda akan membuat kesalahan. Menulis prosedur panduan sebelumnya. Itu harus mencakup:
  - Pemanggilan yang memulai kontrak baru
  - Di mana kunci disimpan dan bagaimana mengaksesnya
  - Cara memeriksa penggunaan! Kembangkan dan uji skrip setelah penggunaan.

## Panduan implementasi {#implementation-guidelines}

**Upayakan kesederhanaan.** Selalu gunakan solusi paling sederhana yang sesuai dengan tujuan Anda. Setiap anggota tim Anda harus mampu memahami solusi Anda.

### Komposisi fungsi {#function-composition}

Arsitektur basis kode Anda harus membuat kode Anda mudah diulas. Hindari pilihan arsitektural yang mengurangi kemampuan penalaran tentang kebenarannya.

- **Pisahkan logika sistem Anda**, baik melalui beberapa kontrak maupun dengan mengelompokkan fungsi-fungsi serupa (misalnya, autentikasi, aritmetika, ...).
- **Tulis fungsi-fungsi kecil, dengan tujuan yang jelas.** Ini akan memfasilitasi peninjauan yang lebih mudah dan memungkinkan pengujian komponen-komponen individual.

### Pewarisan {#inheritance}

- **Jaga agar pewarisan tetap dapat dikelola.** Pewarisan harus digunakan untuk membagi logika, tetapi proyek Anda harus bertujuan untuk meminimalkan kedalaman dan lebar pohon pewarisan.
- **Gunakan [pencetak pewarisan](https://github.com/crytic/slither/wiki/Printer-documentation#inheritance-graph) Slither untuk memeriksa hierarki kontrak.** Pencetak pewarisan akan membantu Anda meninjau ukuran hierarki.

### Peristiwa {#events}

- **Catat semua operasi penting.** Event akan membantu men-debug kontrak selama pengembangan, dan memantaunya setelah deployment.

### Hindari jebakan yang umum diketahui {#avoid-known-pitfalls}

- **Waspadai masalah keamanan yang paling umum.** Ada banyak sumber daya online untuk mempelajari masalah umum, seperti [Ethernaut CTF](https://ethernaut.openzeppelin.com/), [Capture the Ether](https://capturetheether.com/), atau [Not so smart contracts](https://github.com/crytic/not-so-smart-contracts/).
- **Waspadai bagian peringatan di [dokumentasi Solidity](https://docs.soliditylang.org/en/latest/).** Bagian peringatan akan memberi tahu Anda tentang perilaku bahasa yang tidak jelas.

### Dependensi {#dependencies}

- **Gunakan pustaka yang teruji dengan baik.** Mengimpor kode dari pustaka yang teruji dengan baik akan mengurangi kemungkinan Anda menulis kode yang penuh bug. Jika Anda ingin menulis kontrak ERC20, gunakan [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
- **Gunakan manajer dependensi; hindari menyalin-tempel kode.** Jika Anda mengandalkan sumber eksternal, maka Anda harus menjaganya agar tetap terbarui dengan sumber aslinya.

### Pengujian dan verifikasi {#testing-and-verification}

- **Tulis pengujian unit yang menyeluruh.** Rangkaian pengujian yang ekstensif sangat penting untuk membangun perangkat lunak berkualitas tinggi.
- **Tulis pemeriksaan dan properti khusus [Slither](https://github.com/crytic/slither), [Echidna](https://github.com/crytic/echidna), dan [Manticore](https://github.com/trailofbits/manticore).** Alat otomatis akan membantu memastikan kontrak Anda aman. Ulas keseluruhan panduan ini untuk belajar cara menulis pemeriksaan dan properti yang efisien.
- **Gunakan [crytic.io](https://crytic.io/).** Crytic terintegrasi dengan GitHub, menyediakan akses ke detektor Slither pribadi, dan menjalankan pemeriksaan properti khusus dari Echidna.

### Solidity {#solidity}

- **Utamakan Solidity 0.5 daripada 0.4 dan 0.6.** Menurut kami, Solidity 0.5 lebih aman dan memiliki praktik bawaan yang lebih baik daripada 0.4. Solidity 0.6 telah terbukti sangat tidak stabil untuk produksi dan butuh waktu agar lebih matang.
- **Gunakan rilis yang stabil untuk mengompilasi; gunakan rilis terbaru untuk memeriksa peringatan.** Periksa apakah kode Anda tidak memiliki masalah yang dilaporkan dengan versi compiler terbaru. Namun, Solidity memiliki siklus rilis yang cepat dan riwayat bug compiler, jadi kami tidak merekomendasikan versi terbaru untuk deployment (lihat [rekomendasi versi solc](https://github.com/crytic/slither/wiki/Detector-Documentation#recommendation-33) dari Slither).
- **Jangan gunakan assembly sebaris.** Assembly memerlukan keahlian EVM. Jangan menulis kode EVM jika Anda belum _menguasai_ yellow paper.

## Panduan deployment {#deployment-guidelines}

Setelah kontrak dikembangkan dan digunakan:

- **Pantau kontrak Anda.** Perhatikan log, dan bersiaplah untuk bereaksi jika terjadi kompromi kontrak atau dompet.
- **Tambahkan info kontak Anda ke [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).** Daftar ini membantu pihak ketiga menghubungi Anda jika celah keamanan ditemukan.
- **Amankan dompet pengguna yang memiliki hak istimewa.** Ikuti [praktik terbaik](https://blog.trailofbits.com/2018/11/27/10-rules-for-the-secure-use-of-cryptocurrency-hardware-wallets/) kami jika Anda menyimpan kunci di dompet perangkat keras.
- **Miliki rencana respons insiden.** Pertimbangkan bahwa Kontrak Pintar Anda dapat dikompromikan. Meskipun kontrak Anda bebas bug, penyerang bisa mengambil alih kunci pemilik kontrak.
