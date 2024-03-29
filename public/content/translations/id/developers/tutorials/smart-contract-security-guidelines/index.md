---
title: Panduan keamanan kontrak pintar
description: Daftar periksa panduan keamanan untuk dipertimbangkan saat menyusun dapp Anda
author: "Trailofbits"
tags:
  - "solidity"
  - "kontrak pintar"
  - "keamanan"
skill: intermediate
lang: id
published: 2020-09-06
source: Membuat kontrak yang aman
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/guidelines.md
---

Ikuti rekomendasi tingkat tinggi ini untuk membuat kontrak pintar yang lebih aman.

## Pedoman desain {#design-guidelines}

Desain sebuah kontrak harus dibahas sebelumnya, sebelum menulis baris kode apa pun.

### Dokumentasi dan spesifikasi {#documentation-and-specifications}

Dokumentasi dapat ditulis pada tingkat yang berbeda, dan harus diperbarui saat mengimplementasikan kontrak:

- **Sebuah deskripsi sistem dalam bahasa Inggris sederhana**, yang mendeskripsikan apa yang dilakukan kontrak dan asumsi apa pun tentang basis kode.
- **Diagram skema dan arsitektural**, mencakup interaksi kontrak dan mesin sistem state. [Printer Slither](https://github.com/crytic/slither/wiki/Printer-documentation) bisa membantu membuat skema ini.
- **Dokumentasi kode yang lengkap**, [format Natspec](https://solidity.readthedocs.io/en/develop/natspec-format.html) bisa digunakan untuk Solidity.

### Komputasi on-chain vs off-chain {#on-chain-vs-off-chain-computation}

- **Pertahankan sebanyak mungkin kode secara off-chain.** Jaga lapisan on-chain tetap berukuran kecil. Proses data sebelumnya dengan kode off-chain sedemikian rupa sehingga verifikasi on-chain menjadi sederhana. Apakah Anda memerlukan daftar yang berurutan? Urutkan daftarnya secara offchain, lalu hanya periksa urutannya secara onchain.

### Kemungkinan peningkatan {#upgradeability}

Kami membahas berbagai solusi kemungkinan peningkatan di [postingan blog kami](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/). Buat pilihan secara sengaja untuk mendukung kemungkinan peningkatan atau tidak, sebelum menulis kode apa pun. Keputusan ini akan memengaruhi cara Anda membangun kode kami. Secara umum, kami menyarankan:

- **Memilih [migrasi kontrak](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/) daripada kemungkinan peningkatan.** Sistem migrasi memiliki lebih banyak keuntungan yang sama dan juga tanpa kelemahan daripada kemungkinan peningkatan.
- **Menggunakan pola pemisahan data daripada fungsi delegatecallproxy.** Jika proyek Anda memiliki pemisahan abstraksi yang jelas, kemungkinan peningkatan yang menggunakan pemisahan data hanya akan memerlukan beberapa penyesuaian. Fungsi delegatecallproxy memerlukan keahlian EVM dan sangat rentan memiliki kesalahan.
- **Mendokumentasikan prosedur migrasi/peningkatan sebelum penggunaannya.** Jika Anda harus berekasi di bawah tekanan tanpa pedoman apa pun, Anda akan membuat kesalahan. Menulis prosedur panduan sebelumnya. Itu harus mencakup:
  - Pemanggilan yang memulai kontrak baru
  - Di mana kunci disimpan dan bagaimana mengaksesnya
  - Cara memeriksa penggunaan! Kembangkan dan uji skrip setelah penggunaan.

## Panduan implementasi {#implementation-guidelines}

**Usahakan kesederhanaan.** Selalu gunakan solusi yang paling sederhana yang cocok dengan tujuan Anda. Setiap anggota tim Anda harus mampu memahami solusi Anda.

### Komposisi fungsi {#function-composition}

Arsitektur basis kode Anda harus membuat kode Anda mudah diulas. Hindari pilihan arsitektural yang mengurangi kemampuan penalaran tentang kebenarannya.

- **Pisahkan logika sistem Anda**, entah melalui beberapa kontrak atau dengan mengelompokkan fungsi yang sama (sebagai contoh, otentikasi, aritmatika, ...).
- **Tulis fungsi kecil, dengan tujuan yang jelas.** Ini akan mendukung pengulasan yang lebih mudah dan memungkinkan pengujian komponen individual.

### Warisan {#inheritance}

- **Jaga warisan tetap dapat dikelola.** Warisan harus digunakan untuk membagi logika, namun, proyek Anda harus bertujuan meminimalisir kedalaman dan lebar pohon warisan.
- **Gunakan [printer warisan](https://github.com/crytic/slither/wiki/Printer-documentation#inheritance-graph) Slither untuk memeriksa hierarki kontrak.** Printer warisan akan membantu Anda meninjau ukuran hierarkinya.

### Aksi {#events}

- **Buat log semua operasi penting.** Aksi akan membantu melakukan debug kontrak saat pengembangannya, dan mengawasinya setelah penggunaan.

### Hindari kesalahan umum {#avoid-known-pitfalls}

- **Ketahuilah masalah keamanan yang paling umum.** Ada banyak sumber daya online untuk mempelajari tentang masalah yang umum, seperti [Ethernaut CTF](https://ethernaut.openzeppelin.com/), [Tangkap Ether](https://capturetheether.com/), atau [Kontrak yang tidak begitu pintar](https://github.com/crytic/not-so-smart-contracts/).
- **Ketahuilah bagian peringatan di [dokumentasi Solidity](https://solidity.readthedocs.io/en/latest/).** Bagian peringatan akan memberi tahu Anda tentang perilaku bahasa yang tidak jelas.

### Dependensi {#dependencies}

- **Gunakan pustaka yang teruji baik.** Mengimpor kode dari pustaka yang teruji baik akan mengurangi kemungkinan Anda menulis kode yang memiliki bug. Jika Anda mau menulis kontrak ERC20, gunakan [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
- **Gunakan manajer dependensi, hindari menyalin-menempelkan kode.** Jika Anda mengandalkan sumber eksternal, maka Anda harus terus memperbaruinya agar sesuai dengan sumber aslinya.

### Pengujian dan verifikasi {#testing-and-verification}

- **Tulis tes unit yang lengkap.** Rangkaian tes ekstensif penting dalam membangun perangkat lunak berkualitas tinggi.
- **Tulis pemeriksaan dan properti kustom [Slither](https://github.com/crytic/slither), [Echidna](https://github.com/crytic/echidna) dan [Manticore.](https://github.com/trailofbits/manticore)** Peralatan terotomatisasi akan menolong memastikan kontrak Anda aman. Ulas keseluruhan panduan ini untuk belajar cara menulis pemeriksaan dan properti yang efisien.
- **Gunakan [crytic.io](https://crytic.io/).** Crytic terintegrasi dengan GitHub, memberikan akses ke detektor Slither privat, dan menjalankan pemeriksaan properti kustom dari Echidna.

### Solidity {#solidity}

- **Pilih Solidty 0.5 daripada 0.4 dan 0.6.** Menurut pendapat kami, Solidity 0.5 lebih aman dan memiliki praktik bawaan yang lebih baik daripada 0.4. Solidity 0.6 telah terbukti sangat tidak stabil untuk produksi dan butuh waktu agar lebih matang.
- **Gunakan rilis stabil untuk mengompilasi; gunakan rilis terbaru untuk memeriksa peringatan.** Periksa apakah kode Anda tidak memiliki masalah yang dilaporkan dengan versi pengompilasi terbaru. Namun, Solidity memiliki siklus rilis yang cepat dan memiliki riwayat bug pengompilasi, jadi kami tidak menyarankan versi terbaru untuk penggunaannya (lihat [rekomendasi versi solc](https://github.com/crytic/slither/wiki/Detector-Documentation#recommendation-33) Slither).
- **Jangan gunakan perakitan sebaris.** Perakitan memerlukan keahlian EVM. Jangan menulis kode EVM jika Anda belum _menguasai_ yellow paper.

## Pedoman penggunaan {#deployment-guidelines}

Setelah kontrak dikembangkan dan digunakan:

- **Pantau kontrak Anda.** Perhatikan log, dan bersiaplah untuk bereaksi jika kontrak atau dompet disusupi.
- **Tambahkan info kontak Anda ke [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).** Daftar ini membantu pihak ketiga menghubungi Anda jika celah keamanan ditemukan.
- **Amankan dompet pengguna istimewa.** Ikuti [praktik terbaik](https://blog.trailofbits.com/2018/11/27/10-rules-for-the-secure-use-of-cryptocurrency-hardware-wallets/) kami jika Anda menyimpan kunci dalam dompet perangkat keras.
- **Tanggapi rencana insiden.** Anggaplah bahwa kontrak pintar Anda bisa disusupi. Meskipun kontrak Anda bebas bug, penyerang bisa mengambil alih kunci pemilik kontrak.
