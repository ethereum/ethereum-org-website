---
title: Memperbarui kontrak pintar
description: Gambaran umum tentang pola pembaruan untuk kontrak pintar Ethereum
lang: id
---

Kontrak pintar di Ethereum adalah program yang mengeksekusi sendiri yang berjalan di Ethereum Virtual Machine (EVM). Program-program ini pada dasarnya tidak dapat diubah, yang mencegah pembaruan apa pun pada logika bisnis setelah kontrak disebarkan.

Meskipun ketidakberubahan diperlukan untuk sifat tanpa kepercayaan, desentralisasi, dan keamanan kontrak pintar, hal ini bisa menjadi kelemahan dalam kasus tertentu. Misalnya, kode yang tidak dapat diubah dapat membuat pengembang tidak mungkin untuk memperbaiki kontrak yang rentan.

Namun, peningkatan penelitian untuk memperbaiki kontrak pintar telah mengarah pada pengenalan beberapa pola pembaruan. Pola pembaruan ini memungkinkan pengembang untuk memperbarui kontrak pintar (sambil mempertahankan ketidakberubahan) dengan menempatkan logika bisnis di kontrak yang berbeda.

## Prasyarat {#prerequisites}

Anda harus memiliki pemahaman yang baik tentang [kontrak pintar](/developers/docs/smart-contracts/), [anatomi kontrak pintar](/developers/docs/smart-contracts/anatomy/), dan [Ethereum Virtual Machine (EVM)](/developers/docs/evm/). Panduan ini juga mengasumsikan pembaca memiliki pemahaman tentang pemrograman kontrak pintar.

## Apa itu pembaruan kontrak pintar? {#what-is-a-smart-contract-upgrade}

Pembaruan kontrak pintar melibatkan perubahan logika bisnis dari sebuah kontrak pintar sambil mempertahankan state kontrak tersebut. Penting untuk diklarifikasi bahwa kemampuan pembaruan (upgradeability) dan kemampuan perubahan (mutability) tidaklah sama, terutama dalam konteks kontrak pintar.

Anda tetap tidak dapat mengubah program yang disebarkan ke sebuah alamat di jaringan Ethereum. Namun Anda dapat mengubah kode yang dieksekusi ketika pengguna berinteraksi dengan kontrak pintar.

Hal ini dapat dilakukan melalui metode berikut:

1. Membuat beberapa versi dari sebuah kontrak pintar dan memigrasikan state (yaitu, data) dari kontrak lama ke instans kontrak yang baru.

2. Membuat kontrak terpisah untuk menyimpan logika bisnis dan state.

3. Menggunakan pola proksi untuk mendelegasikan panggilan fungsi dari kontrak proksi yang tidak dapat diubah ke kontrak logika yang dapat dimodifikasi.

4. Membuat kontrak utama yang tidak dapat diubah yang berinteraksi dengan dan bergantung pada kontrak satelit yang fleksibel untuk mengeksekusi fungsi tertentu.

5. Menggunakan pola diamond untuk mendelegasikan panggilan fungsi dari kontrak proksi ke kontrak logika.

### Mekanisme pembaruan #1: Migrasi kontrak {#contract-migration}

Migrasi kontrak didasarkan pada pembuatan versi—gagasan untuk membuat dan mengelola state unik dari perangkat lunak yang sama. Migrasi kontrak melibatkan penyebaran instans baru dari kontrak pintar yang ada dan mentransfer penyimpanan serta saldo ke kontrak yang baru.

Kontrak yang baru disebarkan akan memiliki penyimpanan kosong, memungkinkan Anda untuk memulihkan data dari kontrak lama dan menulisnya ke implementasi yang baru. Setelah itu, Anda perlu memperbarui semua kontrak yang berinteraksi dengan kontrak lama untuk mencerminkan alamat yang baru.

Langkah terakhir dalam migrasi kontrak adalah meyakinkan pengguna untuk beralih menggunakan kontrak yang baru. Versi kontrak yang baru akan mempertahankan saldo dan alamat pengguna, yang mempertahankan ketidakberubahan. Jika ini adalah kontrak berbasis token, Anda juga perlu menghubungi bursa untuk membuang kontrak lama dan menggunakan kontrak yang baru.

Migrasi kontrak adalah langkah yang relatif mudah dan aman untuk memperbarui kontrak pintar tanpa merusak interaksi pengguna. Namun, memigrasikan penyimpanan dan saldo pengguna secara manual ke kontrak baru memakan banyak waktu dan dapat menimbulkan biaya gas yang tinggi.

[Lebih lanjut tentang migrasi kontrak.](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/)

### Mekanisme pembaruan #2: Pemisahan data {#data-separation}

Metode lain untuk memperbarui kontrak pintar adalah dengan memisahkan logika bisnis dan penyimpanan data ke dalam kontrak yang terpisah. Ini berarti pengguna berinteraksi dengan kontrak logika, sementara data disimpan di kontrak penyimpanan.

Kontrak logika berisi kode yang dieksekusi ketika pengguna berinteraksi dengan aplikasi. Kontrak ini juga menyimpan alamat kontrak penyimpanan dan berinteraksi dengannya untuk mengambil dan mengatur data.

Sementara itu, kontrak penyimpanan menyimpan state yang terkait dengan kontrak pintar, seperti saldo dan alamat pengguna. Perhatikan bahwa kontrak penyimpanan dimiliki oleh kontrak logika dan dikonfigurasi dengan alamat kontrak logika tersebut pada saat penyebaran. Hal ini mencegah kontrak yang tidak sah untuk memanggil kontrak penyimpanan atau memperbarui datanya.

Secara bawaan, kontrak penyimpanan tidak dapat diubah—tetapi Anda dapat mengganti kontrak logika yang ditunjuknya dengan implementasi yang baru. Ini akan mengubah kode yang berjalan di EVM, sambil menjaga penyimpanan dan saldo tetap utuh.

Menggunakan metode pembaruan ini mewajibkan pembaruan alamat kontrak logika di kontrak penyimpanan. Anda juga harus mengonfigurasi kontrak logika yang baru dengan alamat kontrak penyimpanan karena alasan yang telah dijelaskan sebelumnya.

Pola pemisahan data bisa dibilang lebih mudah diimplementasikan dibandingkan dengan migrasi kontrak. Namun, Anda harus mengelola beberapa kontrak dan mengimplementasikan skema otorisasi yang kompleks untuk melindungi kontrak pintar dari pembaruan yang berbahaya.

### Mekanisme pembaruan #3: Pola proksi {#proxy-patterns}

Pola proksi juga menggunakan pemisahan data untuk menjaga logika bisnis dan data di kontrak yang terpisah. Namun, dalam pola proksi, kontrak penyimpanan (disebut proksi) memanggil kontrak logika selama eksekusi kode. Ini adalah kebalikan dari metode pemisahan data, di mana kontrak logika memanggil kontrak penyimpanan.

Inilah yang terjadi dalam pola proksi:

1. Pengguna berinteraksi dengan kontrak proksi, yang menyimpan data, tetapi tidak menyimpan logika bisnis.

2. Kontrak proksi menyimpan alamat kontrak logika dan mendelegasikan semua panggilan fungsi ke kontrak logika (yang menyimpan logika bisnis) menggunakan fungsi `delegatecall`.

3. Setelah panggilan diteruskan ke kontrak logika, data yang dikembalikan dari kontrak logika diambil dan dikembalikan ke pengguna.

Menggunakan pola proksi mewajibkan pemahaman tentang fungsi **delegatecall**. Pada dasarnya, `delegatecall` adalah opcode yang memungkinkan sebuah kontrak untuk memanggil kontrak lain, sementara eksekusi kode yang sebenarnya terjadi dalam konteks kontrak pemanggil. Implikasi dari penggunaan `delegatecall` dalam pola proksi adalah bahwa kontrak proksi membaca dan menulis ke penyimpanannya dan mengeksekusi logika yang disimpan di kontrak logika seolah-olah memanggil fungsi internal.

Dari [dokumentasi Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#delegatecall-callcode-and-libraries):

> _Terdapat varian khusus dari panggilan pesan, bernama **delegatecall** yang identik dengan panggilan pesan selain dari fakta bahwa kode di alamat target dieksekusi dalam konteks (yaitu, di alamat) kontrak pemanggil dan `msg.sender` serta `msg.value` tidak mengubah nilainya._ _Ini berarti bahwa sebuah kontrak dapat memuat kode secara dinamis dari alamat yang berbeda saat runtime. Penyimpanan, alamat saat ini, dan saldo masih merujuk pada kontrak pemanggil, hanya kodenya yang diambil dari alamat yang dipanggil._

Kontrak proksi tahu untuk memanggil `delegatecall` setiap kali pengguna memanggil sebuah fungsi karena ia memiliki fungsi `fallback` yang terpasang di dalamnya. Dalam pemrograman Solidity, [fungsi fallback](https://docs.soliditylang.org/en/latest/contracts.html#fallback-function) dieksekusi ketika panggilan fungsi tidak cocok dengan fungsi yang ditentukan dalam sebuah kontrak.

Membuat pola proksi berfungsi mewajibkan penulisan fungsi fallback kustom yang menentukan bagaimana kontrak proksi harus menangani panggilan fungsi yang tidak didukungnya. Dalam hal ini, fungsi fallback proksi diprogram untuk memulai delegatecall dan merutekan ulang permintaan pengguna ke implementasi kontrak logika saat ini.

Kontrak proksi secara bawaan tidak dapat diubah, tetapi kontrak logika baru dengan logika bisnis yang diperbarui dapat dibuat. Melakukan pembaruan kemudian hanyalah masalah mengubah alamat kontrak logika yang dirujuk dalam kontrak proksi.

Dengan mengarahkan kontrak proksi ke kontrak logika yang baru, kode yang dieksekusi ketika pengguna memanggil fungsi kontrak proksi akan berubah. Ini memungkinkan kita untuk memperbarui logika kontrak tanpa meminta pengguna untuk berinteraksi dengan kontrak yang baru.

Pola proksi adalah metode populer untuk memperbarui kontrak pintar karena menghilangkan kesulitan yang terkait dengan migrasi kontrak. Namun, pola proksi lebih rumit untuk digunakan dan dapat menimbulkan kelemahan kritis, seperti [bentrokan pemilih fungsi (function selector clashes)](https://medium.com/nomic-foundation-blog/malicious-backdoors-in-ethereum-proxies-62629adf3357), jika digunakan secara tidak benar.

[Lebih lanjut tentang pola proksi](https://blog.openzeppelin.com/proxy-patterns/).

### Mekanisme pembaruan #4: Pola strategi {#strategy-pattern}

Teknik ini dipengaruhi oleh [pola strategi](https://en.wikipedia.org/wiki/Strategy_pattern), yang mendorong pembuatan program perangkat lunak yang berinteraksi dengan program lain untuk mengimplementasikan fitur tertentu. Menerapkan pola strategi pada pengembangan Ethereum berarti membangun kontrak pintar yang memanggil fungsi dari kontrak lain.

Kontrak utama dalam hal ini berisi logika bisnis inti, tetapi berinteraksi dengan kontrak pintar lain ("kontrak satelit") untuk mengeksekusi fungsi tertentu. Kontrak utama ini juga menyimpan alamat untuk setiap kontrak satelit dan dapat beralih di antara implementasi kontrak satelit yang berbeda.

Anda dapat membangun kontrak satelit baru dan mengonfigurasi kontrak utama dengan alamat yang baru. Ini memungkinkan Anda untuk mengubah _strategi_ (yaitu, mengimplementasikan logika baru) untuk sebuah kontrak pintar.

Meskipun mirip dengan pola proksi yang dibahas sebelumnya, pola strategi berbeda karena kontrak utama, yang berinteraksi dengan pengguna, menyimpan logika bisnis. Menggunakan pola ini memberi Anda kesempatan untuk memperkenalkan perubahan terbatas pada kontrak pintar tanpa memengaruhi infrastruktur inti.

Kelemahan utamanya adalah pola ini sebagian besar berguna untuk meluncurkan pembaruan kecil. Selain itu, jika kontrak utama disusupi (misalnya, melalui peretasan), Anda tidak dapat menggunakan metode pembaruan ini.

### Mekanisme pembaruan #5: Pola diamond {#diamond-pattern}

Pola diamond dapat dianggap sebagai peningkatan dari pola proksi. Pola diamond berbeda dari pola proksi karena kontrak proksi diamond dapat mendelegasikan panggilan fungsi ke lebih dari satu kontrak logika.

Kontrak logika dalam pola diamond dikenal sebagai _facet_. Untuk membuat pola diamond berfungsi, Anda perlu membuat pemetaan di kontrak proksi yang memetakan [pemilih fungsi](https://docs.soliditylang.org/en/latest/abi-spec.html#function-selector) ke alamat facet yang berbeda.

Ketika pengguna melakukan panggilan fungsi, kontrak proksi memeriksa pemetaan untuk menemukan facet yang bertanggung jawab untuk mengeksekusi fungsi tersebut. Kemudian ia memanggil `delegatecall` (menggunakan fungsi fallback) dan mengalihkan panggilan ke kontrak logika yang sesuai.

Pola pembaruan diamond memiliki beberapa keuntungan dibandingkan pola pembaruan proksi tradisional:

1. Ini memungkinkan Anda untuk memperbarui sebagian kecil dari kontrak tanpa mengubah semua kode. Menggunakan pola proksi untuk pembaruan mewajibkan pembuatan kontrak logika yang sama sekali baru, bahkan untuk pembaruan kecil.

2. Semua kontrak pintar (termasuk kontrak logika yang digunakan dalam pola proksi) memiliki batas ukuran 24KB, yang bisa menjadi batasan—terutama untuk kontrak kompleks yang membutuhkan lebih banyak fungsi. Pola diamond memudahkan penyelesaian masalah ini dengan membagi fungsi di beberapa kontrak logika.

3. Pola proksi mengadopsi pendekatan sapu jagat (catch-all) untuk kontrol akses. Entitas dengan akses ke fungsi pembaruan dapat mengubah _seluruh_ kontrak. Tetapi pola diamond memungkinkan pendekatan izin modular, di mana Anda dapat membatasi entitas untuk memperbarui fungsi tertentu dalam sebuah kontrak pintar.

[Lebih lanjut tentang pola diamond](https://eip2535diamonds.substack.com/p/introduction-to-the-diamond-standard?s=w).

## Kelebihan dan kekurangan memperbarui kontrak pintar {#pros-and-cons-of-upgrading-smart-contracts}

| Kelebihan                                                                                                                                      | Kekurangan                                                                                                                                                              |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pembaruan kontrak pintar dapat mempermudah perbaikan kerentanan yang ditemukan pada fase pasca-penyebaran.                                     | Memperbarui kontrak pintar meniadakan gagasan ketidakberubahan kode, yang memiliki implikasi terhadap desentralisasi dan keamanan.                                      |
| Pengembang dapat menggunakan pembaruan logika untuk menambahkan fitur baru ke aplikasi terdesentralisasi (dapp).                               | Pengguna harus memercayai pengembang untuk tidak memodifikasi kontrak pintar secara sewenang-wenang.                                                                    |
| Pembaruan kontrak pintar dapat meningkatkan keamanan bagi pengguna akhir karena bug dapat diperbaiki dengan cepat.                             | Memprogram fungsionalitas pembaruan ke dalam kontrak pintar menambah lapisan kompleksitas lain dan meningkatkan kemungkinan kelemahan kritis.                           |
| Pembaruan kontrak memberi pengembang lebih banyak ruang untuk bereksperimen dengan berbagai fitur dan meningkatkan dapp dari waktu ke waktu. | Kesempatan untuk memperbarui kontrak pintar dapat mendorong pengembang untuk meluncurkan proyek lebih cepat tanpa melakukan uji tuntas selama fase pengembangan.        |
|                                                                                                                                                | Kontrol akses yang tidak aman atau sentralisasi dalam kontrak pintar dapat mempermudah aktor jahat untuk melakukan pembaruan yang tidak sah.                            |

## Pertimbangan untuk memperbarui kontrak pintar {#considerations-for-upgrading-smart-contracts}

1. Gunakan mekanisme kontrol akses/otorisasi yang aman untuk mencegah pembaruan kontrak pintar yang tidak sah, terutama jika menggunakan pola proksi, pola strategi, atau pemisahan data. Contohnya adalah membatasi akses ke fungsi pembaruan, sehingga hanya pemilik kontrak yang dapat memanggilnya.

2. Memperbarui kontrak pintar adalah aktivitas yang kompleks dan membutuhkan tingkat ketelitian yang tinggi untuk mencegah masuknya kerentanan.

3. Kurangi asumsi kepercayaan dengan mendesentralisasi proses implementasi pembaruan. Strategi yang mungkin termasuk menggunakan [kontrak dompet multi-sig](/developers/docs/smart-contracts/#multisig) untuk mengontrol pembaruan, atau mensyaratkan [anggota DAO](/dao/) untuk memberikan suara dalam menyetujui pembaruan.

4. Sadari biaya yang terlibat dalam memperbarui kontrak. Misalnya, menyalin state (misalnya, saldo pengguna) dari kontrak lama ke kontrak baru selama migrasi kontrak mungkin memerlukan lebih dari satu transaksi, yang berarti lebih banyak biaya gas.

5. Pertimbangkan untuk mengimplementasikan **timelock** untuk melindungi pengguna. Timelock mengacu pada penundaan yang diberlakukan pada perubahan sistem. Timelock dapat dikombinasikan dengan sistem tata kelola multi-sig untuk mengontrol pembaruan: jika tindakan yang diusulkan mencapai ambang batas persetujuan yang disyaratkan, tindakan tersebut tidak akan dieksekusi sampai periode penundaan yang telah ditentukan berlalu.

Timelock memberi pengguna waktu untuk keluar dari sistem jika mereka tidak setuju dengan perubahan yang diusulkan (misalnya, pembaruan logika atau skema biaya baru). Tanpa timelock, pengguna perlu memercayai pengembang untuk tidak mengimplementasikan perubahan sewenang-wenang dalam kontrak pintar tanpa pemberitahuan sebelumnya. Kelemahannya di sini adalah bahwa timelock membatasi kemampuan untuk menambal kerentanan dengan cepat.

## Sumber daya {#resources}

**Plugin Pembaruan OpenZeppelin - _Serangkaian alat untuk menyebarkan dan mengamankan kontrak pintar yang dapat diperbarui._**

- [GitHub](https://github.com/OpenZeppelin/openzeppelin-upgrades)
- [Dokumentasi](https://docs.openzeppelin.com/upgrades)

## Tutorial {#tutorials}

- [Memperbarui Kontrak Pintar Anda | Tutorial YouTube](https://www.youtube.com/watch?v=bdXJmWajZRY) oleh Patrick Collins
- [Tutorial Migrasi Kontrak Pintar Ethereum](https://medium.com/coinmonks/ethereum-smart-contract-migration-13f6f12539bd) oleh Austin Griffith
- [Menggunakan pola proksi UUPS untuk memperbarui kontrak pintar](https://blog.logrocket.com/author/praneshas/) oleh Pranesh A.S
- [Tutorial Web3: Menulis kontrak pintar yang dapat diperbarui (proksi) menggunakan OpenZeppelin](https://dev.to/yakult/tutorial-write-upgradeable-smart-contract-proxy-contract-with-openzeppelin-1916) oleh fangjun.eth

## Bacaan lebih lanjut {#further-reading}

- [Status Pembaruan Kontrak Pintar](https://blog.openzeppelin.com/the-state-of-smart-contract-upgrades/) oleh Santiago Palladino
- [Berbagai cara untuk memperbarui kontrak pintar Solidity](https://cryptomarketpool.com/multiple-ways-to-upgrade-a-solidity-smart-contract/) - Blog Crypto Market Pool
- [Belajar: Memperbarui Kontrak Pintar](https://docs.openzeppelin.com/learn/upgrading-smart-contracts) - Dokumen OpenZeppelin
- [Pola Proksi Untuk Kemampuan Pembaruan Kontrak Solidity: Proksi Transparan vs UUPS](https://mirror.xyz/0xB38709B8198d147cc9Ff9C133838a044d78B064B/M7oTptQkBGXxox-tk9VJjL66E1V8BUF0GF79MMK4YG0) oleh Naveen Sahu
- [Bagaimana Pembaruan Diamond Bekerja](https://dev.to/mudgen/how-diamond-upgrades-work-417j) oleh Nick Mudge