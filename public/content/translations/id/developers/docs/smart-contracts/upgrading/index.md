---
title: Memutakhirkan kontrak pintar
description: Ikhtisar tentang pola peningkatan untuk kontrak pintar Ethereum
lang: id
---

Kontrak pintar di Ethereum adalah program yang mengeksekusi sendiri dan berjalan di Ethereum Virtual Machine (EVM). Program-program ini bersifat immutable secara desain, yang berarti tidak ada pembaruan yang dapat dilakukan pada logika bisnis setelah kontrak diterapkan.

Meskipun immutability diperlukan untuk menjamin trustlessness, desentralisasi, dan keamanan kontrak pintar, hal ini bisa menjadi kekurangan dalam beberapa kasus. Sebagai contoh, kode yang immutable bisa membuat pengembang tidak dapat memperbaiki kontrak pintar yang memiliki kerentanan.

Namun, peningkatan penelitian untuk memperbaiki kontrak pintar telah menghasilkan pengenalan beberapa pola upgrade. Pola-pola upgrade ini memungkinkan pengembang untuk memperbarui kontrak pintar (sambil tetap mempertahankan sifat tidak dapat diubah) dengan menempatkan logika bisnis di kontrak yang berbeda.

## Persyaratan {#prerequisites}

Anda harus memiliki pemahaman yang baik tentang [kontrak pintar](/developers/docs/smart-contracts/), [anatomi kontrak pintar](/developers/docs/smart-contracts/anatomy/), dan [Mesin Virtual Ethereum (EVM)](/developers/docs/evm/). Panduan ini juga mengasumsikan pembaca sudah memahami dasar-dasar pemrograman kontrak pintar.

## Apa itu peningkatan kontrak pintar? {#what-is-a-smart-contract-upgrade}

Peningkatan kontrak pintar melibatkan perubahan logika bisnis dari kontrak pintar dengan tetap mempertahankan status kontrak. Penting untuk memperjelas bahwa peningkatan kemampuan dan mutability tidaklah sama, terutama dalam konteks kontrak pintar.

Anda tetap tidak dapat mengubah program yang disebarkan ke sebuah alamat di jaringan Ethereum. Tetapi Anda dapat mengubah kode yang dieksekusi ketika pengguna berinteraksi dengan kontrak pintar.

Hal ini dapat dilakukan melalui metode berikut:

1. Membuat beberapa versi kontrak pintar dan status migrasi (yaitu data) dari kontrak lama ke contoh kontrak yang baru.

2. Membuat kontrak terpisah untuk menyimpan logika bisnis dan status.

3. Menggunakan pola proksi untuk mendelegasikan pemanggilan fungsi dari kontrak proksi yang tidak dapat diubah ke kontrak logika yang dapat diubah.

4. Membuat kontrak utama yang tidak dapat diubah yang berinteraksi dengan dan bergantung pada kontrak satelit yang fleksibel untuk mengeksekusi fungsi tertentu.

5. Menggunakan pola berlian untuk mendelegasikan pemanggilan fungsi dari kontrak proksi ke kontrak logika.

### Mekanisme peningkatan #1: Migrasi kontrak {#contract-migration}

Migrasi kontrak didasarkan pada pembuatan versi-gagasan untuk membuat dan mengelola status unik dari perangkat lunak yang sama. Migrasi kontrak melibatkan penyebaran contoh baru dari kontrak pintar yang sudah ada dan memindahkan penyimpanan dan saldo ke kontrak baru.

Kontrak yang baru disebarkan akan memiliki penyimpanan kosong, sehingga Anda dapat memulihkan data dari kontrak lama dan menuliskannya ke implementasi baru. Setelah itu, Anda perlu memperbarui semua kontrak yang berinteraksi dengan kontrak lama untuk mencerminkan alamat baru.

Langkah terakhir dalam migrasi kontrak adalah meyakinkan pengguna untuk beralih menggunakan kontrak baru. Versi kontrak baru akan mempertahankan saldo dan alamat pengguna, yang menjaga immutability. Jika ini adalah kontrak berbasis token, Anda juga perlu menghubungi bursa untuk membuang kontrak lama dan menggunakan kontrak baru.

Migrasi kontrak adalah langkah yang relatif mudah dan aman untuk meningkatkan kontrak pintar tanpa melanggar interaksi pengguna. Namun, memigrasikan penyimpanan dan saldo pengguna secara manual ke kontrak baru membutuhkan waktu yang lama dan dapat menimbulkan biaya gas yang tinggi.

[Selengkapnya tentang migrasi kontrak.](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/)

### Mekanisme peningkatan #2: Pemisahan data {#data-separation}

Metode lain untuk meningkatkan kontrak pintar adalah dengan memisahkan logika bisnis dan penyimpanan data ke dalam kontrak yang terpisah. Ini berarti pengguna berinteraksi dengan kontrak logika, sementara data disimpan dalam kontrak penyimpanan.

Kontrak logika berisi kode yang dieksekusi ketika pengguna berinteraksi dengan aplikasi. Itu juga menyimpan alamat kontrak penyimpanan dan berinteraksi dengannya untuk mendapatkan dan set data.

Sementara itu, kontrak penyimpanan menyimpan status yang terkait dengan kontrak pintar, seperti saldo dan alamat pengguna. Perhatikan bahwa kontrak penyimpanan dimiliki oleh kontrak logika dan dikonfigurasikan dengan alamat yang terakhir pada saat penyebaran. Hal ini mencegah kontrak yang tidak sah untuk memanggil kontrak penyimpanan atau memperbarui data.

Secara default, kontrak penyimpanan tidak dapat diubah—tetapi Anda dapat mengganti kontrak logika yang ditunjuknya dengan implementasi baru. Ini akan mengubah kode yang berjalan di EVM, sekaligus menjaga penyimpanan dan saldo tetap utuh.

Menggunakan metode peningkatan ini memerlukan pembaruan alamat kontrak logika dalam kontrak penyimpanan. Anda juga harus mengkonfigurasi kontrak logika baru dengan alamat kontrak penyimpanan untuk alasan yang telah dijelaskan sebelumnya.

Pola pemisahan data bisa dibilang lebih mudah diimplementasikan dibandingkan dengan migrasi kontrak. Namun, Anda harus mengelola beberapa kontrak dan menerapkan skema otorisasi yang kompleks untuk melindungi kontrak pintar dari peningkatan yang jahat.

### Mekanisme peningkatan #3: Pola proksi {#proxy-patterns}

Pola proksi juga menggunakan pemisahan data untuk menjaga logika bisnis dan data dalam kontrak terpisah. Namun, dalam pola proksi, kontrak penyimpanan (disebut proksi) memanggil kontrak logika selama eksekusi kode. Ini adalah kebalikan dari metode pemisahan data, di mana kontrak logika memanggil kontrak penyimpanan.

Inilah yang terjadi dalam pola proksi:

1. Pengguna berinteraksi dengan kontrak proksi, yang menyimpan data, tetapi tidak memiliki logika bisnis.

2. Kontrak proksi menyimpan alamat kontrak logika dan mendelegasikan semua panggilan fungsi ke kontrak logika (yang memegang logika bisnis) menggunakan fungsi `delegatecall`.

3. Setelah panggilan diteruskan ke kontrak logika, data yang dikembalikan dari kontrak logika diambil dan dikembalikan ke pengguna.

Menggunakan pola proksi memerlukan pemahaman tentang fungsi **delegatecall**. Pada dasarnya, `delegatecall` adalah sebuah opcode yang memungkinkan sebuah kontrak untuk memanggil kontrak lain, sementara eksekusi kode yang sebenarnya terjadi dalam konteks kontrak yang memanggil. Implikasi dari penggunaan `delegatecall` dalam pola proksi adalah bahwa kontrak proksi membaca dan menulis ke penyimpanannya dan mengeksekusi logika yang disimpan di kontrak logika seolah-olah memanggil fungsi internal.

Dari [dokumentasi Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#delegatecall-callcode-and-libraries):

> _Terdapat varian khusus dari pemanggilan pesan, bernama **delegatecall** yang identik dengan pemanggilan pesan selain dari fakta bahwa kode di alamat target dieksekusi dalam konteks (yaitu, di alamat) dari kontrak pemanggil dan `msg.sender` serta `msg.value` tidak mengubah nilainya._ _Ini berarti bahwa kontrak dapat memuat kode secara dinamis dari alamat yang berbeda saat runtime. Penyimpanan, alamat saat ini, dan saldo masih mengacu pada kontrak pemanggilan, hanya kode yang diambil dari alamat yang dipanggil._

Kontrak proksi tahu untuk memanggil `delegatecall` setiap kali pengguna memanggil suatu fungsi karena memiliki fungsi `fallback` yang tertanam di dalamnya. Dalam pemrograman Solidity, [fungsi fallback](https://docs.soliditylang.org/en/latest/contracts.html#fallback-function) dieksekusi ketika pemanggilan fungsi tidak cocok dengan fungsi yang ditentukan dalam sebuah kontrak.

Untuk membuat pola proksi bekerja diperlukan penulisan fungsi fallback khusus yang menentukan bagaimana kontrak proksi harus menangani pemanggilan fungsi yang tidak didukungnya. Dalam hal ini, fungsi fallback proksi diprogram untuk memulai delegatecall dan mengalihkan permintaan pengguna ke implementasi kontrak logika saat ini.

Kontrak proksi tidak dapat diubah secara default, tetapi kontrak logika baru dengan logika bisnis yang diperbarui dapat dibuat. Melakukan peningkatan maka mengubah alamat kontrak logika yang direferensikan dalam kontrak proksi.

Dengan mengarahkan kontrak proksi ke kontrak logika baru, kode dieksekusi ketika pengguna memanggil perubahan fungsi kontrak proksi. Hal ini memungkinkan kami untuk meningkatkan logika kontrak tanpa meminta pengguna untuk berinteraksi dengan kontrak baru.

Pola proksi adalah metode yang populer untuk meningkatkan kontrak pintar karena menghilangkan kesulitan yang terkait dengan migrasi kontrak. Namun, pola proksi lebih rumit untuk digunakan dan dapat menimbulkan kelemahan kritis, seperti [bentrokan pemilih fungsi (function selector clashes)](https://medium.com/nomic-foundation-blog/malicious-backdoors-in-ethereum-proxies-62629adf3357), jika digunakan secara tidak benar.

[Selengkapnya tentang pola proksi](https://blog.openzeppelin.com/proxy-patterns/).

### Mekanisme peningkatan #4: Pola strategi {#strategy-pattern}

Teknik ini dipengaruhi oleh [pola strategi](https://en.wikipedia.org/wiki/Strategy_pattern), yang mendorong pembuatan program perangkat lunak yang berinteraksi dengan program lain untuk mengimplementasikan fitur-fitur tertentu. Menerapkan pola strategi pada pengembangan Ethereum berarti membangun sebuah kontrak pintar yang memanggil fungsi dari kontrak lain.

Kontrak utama dalam hal ini berisi logika bisnis inti, tetapi berinteraksi dengan kontrak pintar lainnya ("kontrak satelit") untuk menjalankan fungsi tertentu. Kontrak utama ini juga menyimpan alamat untuk setiap kontrak satelit dan dapat beralih di antara implementasi kontrak satelit yang berbeda.

Anda dapat membangun kontrak satelit baru dan mengkonfigurasi kontrak utama dengan alamat baru. Ini memungkinkan Anda untuk mengubah _strategi_ (yaitu, mengimplementasikan logika baru) untuk sebuah kontrak pintar.

Meskipun mirip dengan pola proksi yang telah dibahas sebelumnya, pola strateginya berbeda karena kontrak utama, yang berinteraksi dengan pengguna, memegang logika bisnis. Menggunakan pola ini memberi Anda kesempatan untuk memperkenalkan perubahan terbatas pada kontrak pintar tanpa mempengaruhi infrastruktur inti.

Kelemahan utamanya adalah bahwa pola ini sebagian besar berguna untuk meluncurkan peningkatan kecil. Selain itu, jika kontrak utama terganggu (misalnya, melalui peretasan), Anda tidak dapat menggunakan metode peningkatan ini.

### Mekanisme peningkatan #5: Pola berlian {#diamond-pattern}

Pola berlian dapat dianggap sebagai peningkatan dari pola proksi. Pola berlian berbeda dengan pola proksi karena kontrak proksi berlian dapat mendelegasikan pemanggilan fungsi ke lebih dari satu kontrak logika.

Kontrak logika dalam pola berlian dikenal sebagai _facet_. Agar pola berlian berfungsi, Anda perlu membuat sebuah pemetaan di dalam kontrak proksi yang memetakan [pemilih fungsi (function selectors)](https://docs.soliditylang.org/en/latest/abi-spec.html#function-selector) ke alamat-alamat facet yang berbeda.

Ketika pengguna melakukan pemanggilan fungsi, kontrak proksi memeriksa pemetaan untuk menemukan segi yang bertanggung jawab untuk menjalankan fungsi tersebut. Kemudian, ia memanggil `delegatecall` (menggunakan fungsi `fallback`) dan mengalihkan panggilan ke kontrak logika yang sesuai.

Pola peningkatan berlian memiliki beberapa keunggulan dibandingkan pola peningkatan proksi konvensional:

1. Ini memungkinkan Anda untuk meningkatkan sebagian kecil dari kontrak tanpa mengubah semua kode. Menggunakan pola proxy untuk peningkatan membutuhkan pembuatan kontrak logika yang sama sekali baru, bahkan untuk peningkatan kecil.

2. Semua kontrak pintar (termasuk kontrak logika yang digunakan dalam pola proksi) memiliki batas ukuran 24KB, yang dapat menjadi batasan—terutama untuk kontrak rumit yang membutuhkan lebih banyak fungsi. Pola berlian membuatnya mudah untuk menyelesaikan masalah ini dengan membagi fungsi di beberapa kontrak logika.

3. Pola proksi mengadopsi pendekatan mencakup semua untuk mengakses kontrol. Sebuah entitas dengan akses ke fungsi peningkatan dapat mengubah _seluruh_ kontrak. Tetapi pola berlian memungkinkan pendekatan izin modular, di mana Anda dapat membatasi entitas untuk meningkatkan fungsi tertentu dalam kontrak pintar.

[Selengkapnya tentang pola berlian](https://eip2535diamonds.substack.com/p/introduction-to-the-diamond-standard?s=w).

## Kelebihan dan kekurangan peningkatan kontrak pintar {#pros-and-cons-of-upgrading-smart-contracts}

| Kelebihan                                                                                                                                                       | Kekurangan                                                                                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Peningkatan kontrak pintar dapat mempermudah untuk memperbaiki kerentanan yang ditemukan pada fase pasca penyebaran.                            | Meningkatkan kontrak pintar meniadakan gagasan immutablity kode, yang berimplikasi pada desentralisasi dan keamanan.                                              |
| Pengembang dapat menggunakan peningkatan logika untuk menambahkan fitur baru ke aplikasi terdesentralisasi.                                     | Pengguna harus mempercayai pengembang untuk tidak mengubah kontrak pintar secara sewenang-wenang.                                                                 |
| Peningkatan kontrak pintar dapat meningkatkan keamanan bagi pengguna akhir karena bug dapat diperbaiki dengan cepat.                            | Meningkatkan fungsionalitas pemrograman ke kontrak pintar menambah lapisan kerumitan lain dan meningkatkan kemungkinan kelemahan kritis.                          |
| Peningkatan kontrak memberi pengembang lebih banyak ruang untuk bereksperimen dengan berbagai fitur dan meningkatkan dapps dari waktu ke waktu. | Kesempatan untuk meningkatkan kontrak pintar dapat mendorong pengembang untuk meluncurkan proyek lebih cepat tanpa melakukan uji tuntas selama fase pengembangan. |
|                                                                                                                                                                 | Kontrol akses yang tidak aman atau sentralisasi dalam kontrak pintar dapat memudahkan aktor jahat untuk melakukan peningkatan yang tidak sah.                     |

## Pertimbangan untuk meningkatkan kontrak pintar {#considerations-for-upgrading-smart-contracts}

1. Gunakan mekanisme kontrol akses/otorisasi yang aman untuk mencegah peningkatan kontrak pintar yang tidak sah, terutama jika menggunakan pola proksi, pola strategi, atau pemisahan data. Contohnya adalah membatasi akses ke fungsi peningkatan, sehingga hanya pemilik kontrak yang dapat memanggilnya.

2. Meningkatkan kontrak pintar merupakan aktivitas yang rumit dan membutuhkan ketekunan tingkat tinggi untuk mencegah munculnya kerentanan.

3. Mengurangi asumsi kepercayaan dengan mendesentralisasikan proses implementasi peningkatan. Strategi yang memungkinkan termasuk menggunakan [kontrak dompet multi-sig](/developers/docs/smart-contracts/#multisig) untuk mengontrol peningkatan, atau mengharuskan [anggota DAO](/dao/) untuk memberikan suara pada persetujuan peningkatan.

4. Waspadai biaya yang terlibat dalam peningkatan kontrak. Misalnya, menyalin status (misalnya, saldo pengguna) dari kontrak lama ke kontrak baru selama migrasi kontrak mungkin memerlukan lebih dari satu transaksi, yang berarti lebih banyak biaya gas.

5. Pertimbangkan untuk mengimplementasikan **timelocks** untuk melindungi pengguna. Kunci waktu mengacu pada penundaan yang diberlakukan pada perubahan pada sistem. Kunci waktu dapat dikombinasikan dengan sistem tata kelola banyak tanda tangan governance untuk mengontrol peningkatan: jika tindakan yang diusulkan mencapai ambang batas persetujuan yang disyaratkan, tindakan tersebut tidak akan dieksekusi hingga periode penundaan yang telah ditentukan berlalu.

Kunci waktu memberi waktu bagi pengguna untuk keluar dari sistem jika mereka tidak setuju dengan perubahan yang diusulkan (misalnya, peningkatan logika atau skema biaya baru). Tanpa kunci waktu, pengguna harus mempercayai pengembang untuk tidak mengimplementasikan perubahan sewenang-wenang dalam kontrak pintar tanpa pemberitahuan sebelumnya. Kelemahannya di sini adalah kunci waktu membatasi kemampuan untuk menambal kerentanan dengan cepat.

## Sumber daya {#resources}

**Plugin Peningkatan OpenZeppelin - _Serangkaian alat untuk menerapkan dan mengamankan kontrak pintar yang dapat ditingkatkan._**

- [GitHub](https://github.com/OpenZeppelin/openzeppelin-upgrades)
- [Dokumentasi](https://docs.openzeppelin.com/upgrades)

## Tutorial {#tutorials}

- [Meningkatkan Kontrak Pintar Anda | Tutorial YouTube](https://www.youtube.com/watch?v=bdXJmWajZRY) oleh Patrick Collins
- [Tutorial Migrasi Kontrak Pintar Ethereum](https://medium.com/coinmonks/ethereum-smart-contract-migration-13f6f12539bd) oleh Austin Griffith
- [Menggunakan pola proksi UUPS untuk meningkatkan kontrak pintar](https://blog.logrocket.com/author/praneshas/) oleh Pranesh A.S
- [Tutorial Web3: Menulis kontrak pintar yang dapat ditingkatkan (proksi) menggunakan OpenZeppelin](https://dev.to/yakult/tutorial-write-upgradeable-smart-contract-proxy-contract-with-openzeppelin-1916) oleh fangjun.eth

## Bacaan lebih lanjut {#further-reading}

- [Keadaan Peningkatan Kontrak Pintar](https://blog.openzeppelin.com/the-state-of-smart-contract-upgrades/) oleh Santiago Palladino
- [Berbagai cara untuk meningkatkan kontrak pintar Solidity](https://cryptomarketpool.com/multiple-ways-to-upgrade-a-solidity-smart-contract/) - blog Crypto Market Pool
- [Pelajari: Meningkatkan Kontrak Pintar](https://docs.openzeppelin.com/learn/upgrading-smart-contracts) - Dokumen OpenZeppelin
- [Pola Proksi untuk Kemampuan Peningkatan Kontrak Solidity: Proksi Transparan vs UUPS](https://mirror.xyz/0xB38709B8198d147cc9Ff9C133838a044d78B064B/M7oTptQkBGXxox-tk9VJjL66E1V8BUF0GF79MMK4YG0) oleh Naveen Sahu
- [Cara Kerja Peningkatan Diamond](https://dev.to/mudgen/how-diamond-upgrades-work-417j) oleh Nick Mudge
