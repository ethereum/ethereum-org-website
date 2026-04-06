---
title: Meningkatkan kontrak pintar
description: Gambaran umum tentang pola peningkatan untuk kontrak pintar Ethereum
lang: id
---

Kontrak pintar di Ethereum adalah program yang mengeksekusi sendiri yang berjalan di Mesin Virtual Ethereum (EVM). Program-program ini pada dasarnya bersifat tetap, yang mencegah pembaruan apa pun pada logika bisnis setelah kontrak diterapkan.

Meskipun sifat tetap diperlukan untuk ketiadaan kepercayaan (trustlessness), desentralisasi, dan keamanan kontrak pintar, hal ini bisa menjadi kelemahan dalam kasus tertentu. Misalnya, kode yang tetap dapat membuat pengembang tidak mungkin memperbaiki kontrak yang rentan.

Namun, peningkatan penelitian untuk memperbaiki kontrak pintar telah mengarah pada pengenalan beberapa pola peningkatan. Pola peningkatan ini memungkinkan pengembang untuk meningkatkan kontrak pintar (sambil mempertahankan sifat tetap) dengan menempatkan logika bisnis di kontrak yang berbeda.

## Prasyarat {#prerequisites}

Anda harus memiliki pemahaman yang baik tentang [kontrak pintar](/developers/docs/smart-contracts/), [anatomi kontrak pintar](/developers/docs/smart-contracts/anatomy/), dan [Mesin Virtual Ethereum (EVM)](/developers/docs/evm/). Panduan ini juga mengasumsikan pembaca memiliki pemahaman tentang pemrograman kontrak pintar.

## Apa itu peningkatan kontrak pintar? {#what-is-a-smart-contract-upgrade}

Peningkatan kontrak pintar melibatkan perubahan logika bisnis dari kontrak pintar sambil mempertahankan status kontrak. Penting untuk mengklarifikasi bahwa kemampuan peningkatan (upgradeability) dan kemampuan perubahan (mutability) tidaklah sama, terutama dalam konteks kontrak pintar.

Anda tetap tidak dapat mengubah program yang diterapkan ke sebuah alamat di jaringan Ethereum. Namun Anda dapat mengubah kode yang dieksekusi ketika pengguna berinteraksi dengan kontrak pintar.

Ini dapat dilakukan melalui metode berikut:

1. Membuat beberapa versi kontrak pintar dan memigrasikan status (yaitu, data) dari kontrak lama ke instans kontrak yang baru.

2. Membuat kontrak terpisah untuk menyimpan logika bisnis dan status.

3. Menggunakan pola proxy untuk mendelegasikan panggilan fungsi dari kontrak proxy yang tetap ke kontrak logika yang dapat dimodifikasi.

4. Membuat kontrak utama yang tetap yang berinteraksi dengan dan bergantung pada kontrak satelit yang fleksibel untuk mengeksekusi fungsi tertentu.

5. Menggunakan pola diamond untuk mendelegasikan panggilan fungsi dari kontrak proxy ke kontrak logika.

### Mekanisme peningkatan #1: Migrasi kontrak {#contract-migration}

Migrasi kontrak didasarkan pada pembuatan versi—gagasan untuk membuat dan mengelola status unik dari perangkat lunak yang sama. Migrasi kontrak melibatkan penerapan instans baru dari kontrak pintar yang ada dan mentransfer penyimpanan serta saldo ke kontrak baru.

Kontrak yang baru diterapkan akan memiliki penyimpanan kosong, memungkinkan Anda untuk memulihkan data dari kontrak lama dan menulisnya ke implementasi baru. Setelah itu, Anda perlu memperbarui semua kontrak yang berinteraksi dengan kontrak lama untuk mencerminkan alamat baru.

Langkah terakhir dalam migrasi kontrak adalah meyakinkan pengguna untuk beralih menggunakan kontrak baru. Versi kontrak baru akan mempertahankan saldo dan alamat pengguna, yang mempertahankan sifat tetap. Jika ini adalah kontrak berbasis token, Anda juga perlu menghubungi bursa untuk membuang kontrak lama dan menggunakan kontrak baru.

Migrasi kontrak adalah langkah yang relatif mudah dan aman untuk meningkatkan kontrak pintar tanpa merusak interaksi pengguna. Namun, memigrasikan penyimpanan dan saldo pengguna secara manual ke kontrak baru memakan banyak waktu dan dapat menimbulkan biaya gas yang tinggi.

[Lebih lanjut tentang migrasi kontrak.](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/)

### Mekanisme peningkatan #2: Pemisahan data {#data-separation}

Metode lain untuk meningkatkan kontrak pintar adalah memisahkan logika bisnis dan penyimpanan data ke dalam kontrak yang terpisah. Ini berarti pengguna berinteraksi dengan kontrak logika, sementara data disimpan di kontrak penyimpanan.

Kontrak logika berisi kode yang dieksekusi ketika pengguna berinteraksi dengan aplikasi. Kontrak ini juga menyimpan alamat kontrak penyimpanan dan berinteraksi dengannya untuk mendapatkan dan mengatur data.

Sementara itu, kontrak penyimpanan menyimpan status yang terkait dengan kontrak pintar, seperti saldo dan alamat pengguna. Perhatikan bahwa kontrak penyimpanan dimiliki oleh kontrak logika dan dikonfigurasi dengan alamat kontrak logika saat penerapan. Ini mencegah kontrak yang tidak sah memanggil kontrak penyimpanan atau memperbarui datanya.

Secara default, kontrak penyimpanan bersifat tetap—tetapi Anda dapat mengganti kontrak logika yang ditunjuknya dengan implementasi baru. Ini akan mengubah kode yang berjalan di EVM, sambil menjaga penyimpanan dan saldo tetap utuh.

Menggunakan metode peningkatan ini memerlukan pembaruan alamat kontrak logika di kontrak penyimpanan. Anda juga harus mengonfigurasi kontrak logika baru dengan alamat kontrak penyimpanan karena alasan yang dijelaskan sebelumnya.

Pola pemisahan data bisa dibilang lebih mudah diimplementasikan dibandingkan dengan migrasi kontrak. Namun, Anda harus mengelola beberapa kontrak dan mengimplementasikan skema otorisasi yang kompleks untuk melindungi kontrak pintar dari peningkatan yang berbahaya.

### Mekanisme peningkatan #3: Pola proxy {#proxy-patterns}

Pola proxy juga menggunakan pemisahan data untuk menjaga logika bisnis dan data dalam kontrak yang terpisah. Namun, dalam pola proxy, kontrak penyimpanan (disebut proxy) memanggil kontrak logika selama eksekusi kode. Ini adalah kebalikan dari metode pemisahan data, di mana kontrak logika memanggil kontrak penyimpanan.

Inilah yang terjadi dalam pola proxy:

1. Pengguna berinteraksi dengan kontrak proxy, yang menyimpan data, tetapi tidak menyimpan logika bisnis.

2. Kontrak proxy menyimpan alamat kontrak logika dan mendelegasikan semua panggilan fungsi ke kontrak logika (yang menyimpan logika bisnis) menggunakan fungsi `delegatecall`.

3. Setelah panggilan diteruskan ke kontrak logika, data yang dikembalikan dari kontrak logika diambil dan dikembalikan ke pengguna.

Menggunakan pola proxy memerlukan pemahaman tentang fungsi **delegatecall**. Pada dasarnya, `delegatecall` adalah opcode yang memungkinkan sebuah kontrak untuk memanggil kontrak lain, sementara eksekusi kode yang sebenarnya terjadi dalam konteks kontrak pemanggil. Implikasi dari penggunaan `delegatecall` dalam pola proxy adalah bahwa kontrak proxy membaca dan menulis ke penyimpanannya dan mengeksekusi logika yang disimpan di kontrak logika seolah-olah memanggil fungsi internal.

Dari [dokumentasi Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#delegatecall-callcode-and-libraries):

> _Terdapat varian khusus dari panggilan pesan, bernama **delegatecall** yang identik dengan panggilan pesan selain dari fakta bahwa kode di alamat target dieksekusi dalam konteks (yaitu, di alamat) kontrak pemanggil dan `msg.sender` serta `msg.value` tidak mengubah nilainya._ _Ini berarti bahwa sebuah kontrak dapat secara dinamis memuat kode dari alamat yang berbeda saat runtime. Penyimpanan, alamat saat ini, dan saldo masih merujuk ke kontrak pemanggil, hanya kodenya yang diambil dari alamat yang dipanggil._

Kontrak proxy tahu untuk memanggil `delegatecall` setiap kali pengguna memanggil suatu fungsi karena ia memiliki fungsi `fallback` yang terpasang di dalamnya. Dalam pemrograman Solidity, [fungsi fallback](https://docs.soliditylang.org/en/latest/contracts.html#fallback-function) dieksekusi ketika panggilan fungsi tidak cocok dengan fungsi yang ditentukan dalam sebuah kontrak.

Membuat pola proxy berfungsi memerlukan penulisan fungsi fallback kustom yang menentukan bagaimana kontrak proxy harus menangani panggilan fungsi yang tidak didukungnya. Dalam hal ini, fungsi fallback proxy diprogram untuk memulai delegatecall dan merutekan ulang permintaan pengguna ke implementasi kontrak logika saat ini.

Kontrak proxy secara default bersifat tetap, tetapi kontrak logika baru dengan logika bisnis yang diperbarui dapat dibuat. Melakukan peningkatan kemudian hanyalah masalah mengubah alamat kontrak logika yang direferensikan dalam kontrak proxy.

Dengan mengarahkan kontrak proxy ke kontrak logika baru, kode yang dieksekusi ketika pengguna memanggil fungsi kontrak proxy akan berubah. Ini memungkinkan kita untuk meningkatkan logika kontrak tanpa meminta pengguna untuk berinteraksi dengan kontrak baru.

Pola proxy adalah metode populer untuk meningkatkan kontrak pintar karena menghilangkan kesulitan yang terkait dengan migrasi kontrak. Namun, pola proxy lebih rumit untuk digunakan dan dapat menimbulkan kelemahan kritis, seperti [bentrokan pemilih fungsi (function selector clashes)](https://medium.com/nomic-foundation-blog/malicious-backdoors-in-ethereum-proxies-62629adf3357), jika digunakan secara tidak benar.

[Lebih lanjut tentang pola proxy](https://blog.openzeppelin.com/proxy-patterns/).

### Mekanisme peningkatan #4: Pola strategi {#strategy-pattern}

Teknik ini dipengaruhi oleh [pola strategi](https://en.wikipedia.org/wiki/Strategy_pattern), yang mendorong pembuatan program perangkat lunak yang berinteraksi dengan program lain untuk mengimplementasikan fitur tertentu. Menerapkan pola strategi pada pengembangan Ethereum berarti membangun kontrak pintar yang memanggil fungsi dari kontrak lain.

Kontrak utama dalam hal ini berisi logika bisnis inti, tetapi berinteraksi dengan kontrak pintar lain ("kontrak satelit") untuk mengeksekusi fungsi tertentu. Kontrak utama ini juga menyimpan alamat untuk setiap kontrak satelit dan dapat beralih di antara implementasi kontrak satelit yang berbeda.

Anda dapat membangun kontrak satelit baru dan mengonfigurasi kontrak utama dengan alamat baru. Ini memungkinkan Anda untuk mengubah _strategi_ (yaitu, mengimplementasikan logika baru) untuk sebuah kontrak pintar.

Meskipun mirip dengan pola proxy yang dibahas sebelumnya, pola strategi berbeda karena kontrak utama, yang berinteraksi dengan pengguna, menyimpan logika bisnis. Menggunakan pola ini memberi Anda kesempatan untuk memperkenalkan perubahan terbatas pada kontrak pintar tanpa memengaruhi infrastruktur inti.

Kelemahan utamanya adalah pola ini sebagian besar berguna untuk meluncurkan peningkatan kecil. Selain itu, jika kontrak utama disusupi (misalnya, melalui peretasan), Anda tidak dapat menggunakan metode peningkatan ini.

### Mekanisme peningkatan #5: Pola diamond {#diamond-pattern}

Pola diamond dapat dianggap sebagai peningkatan dari pola proxy. Pola diamond berbeda dari pola proxy karena kontrak proxy diamond dapat mendelegasikan panggilan fungsi ke lebih dari satu kontrak logika.

Kontrak logika dalam pola diamond dikenal sebagai _facet_. Untuk membuat pola diamond berfungsi, Anda perlu membuat pemetaan di kontrak proxy yang memetakan [pemilih fungsi (function selectors)](https://docs.soliditylang.org/en/latest/abi-spec.html#function-selector) ke alamat facet yang berbeda.

Ketika pengguna melakukan panggilan fungsi, kontrak proxy memeriksa pemetaan untuk menemukan facet yang bertanggung jawab untuk mengeksekusi fungsi tersebut. Kemudian ia memanggil `delegatecall` (menggunakan fungsi fallback) dan mengarahkan ulang panggilan ke kontrak logika yang sesuai.

Pola peningkatan diamond memiliki beberapa keuntungan dibandingkan pola peningkatan proxy tradisional:

1. Ini memungkinkan Anda untuk meningkatkan sebagian kecil dari kontrak tanpa mengubah semua kode. Menggunakan pola proxy untuk peningkatan memerlukan pembuatan kontrak logika yang sama sekali baru, bahkan untuk peningkatan kecil.

2. Semua kontrak pintar (termasuk kontrak logika yang digunakan dalam pola proxy) memiliki batas ukuran 24KB, yang bisa menjadi batasan—terutama untuk kontrak kompleks yang memerlukan lebih banyak fungsi. Pola diamond memudahkan penyelesaian masalah ini dengan membagi fungsi di beberapa kontrak logika.

3. Pola proxy mengadopsi pendekatan tangkap-semua (catch-all) untuk kontrol akses. Entitas dengan akses ke fungsi peningkatan dapat mengubah _seluruh_ kontrak. Namun pola diamond memungkinkan pendekatan izin modular, di mana Anda dapat membatasi entitas untuk meningkatkan fungsi tertentu dalam sebuah kontrak pintar.

[Lebih lanjut tentang pola diamond](https://eip2535diamonds.substack.com/p/introduction-to-the-diamond-standard?s=w).

## Kelebihan dan kekurangan meningkatkan kontrak pintar {#pros-and-cons-of-upgrading-smart-contracts}

| Kelebihan                                                                                                                                      | Kekurangan                                                                                                                                                                              |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Peningkatan kontrak pintar dapat mempermudah perbaikan kerentanan yang ditemukan pada fase pasca-penerapan.                                    | Meningkatkan kontrak pintar meniadakan gagasan sifat tetap kode, yang memiliki implikasi terhadap desentralisasi dan keamanan.                                                          |
| Pengembang dapat menggunakan peningkatan logika untuk menambahkan fitur baru ke aplikasi terdesentralisasi.                                      | Pengguna harus memercayai pengembang untuk tidak memodifikasi kontrak pintar secara sewenang-wenang.                                                                                    |
| Peningkatan kontrak pintar dapat meningkatkan keamanan bagi pengguna akhir karena bug dapat diperbaiki dengan cepat.                           | Memprogram fungsionalitas peningkatan ke dalam kontrak pintar menambah lapisan kompleksitas lain dan meningkatkan kemungkinan kelemahan kritis.                                         |
| Peningkatan kontrak memberi pengembang lebih banyak ruang untuk bereksperimen dengan berbagai fitur dan meningkatkan dapps dari waktu ke waktu. | Kesempatan untuk meningkatkan kontrak pintar dapat mendorong pengembang untuk meluncurkan proyek lebih cepat tanpa melakukan uji tuntas selama fase pengembangan.                       |
|                                                                                                                                                | Kontrol akses yang tidak aman atau sentralisasi dalam kontrak pintar dapat mempermudah aktor jahat untuk melakukan peningkatan yang tidak sah.                                          |

## Pertimbangan untuk meningkatkan kontrak pintar {#considerations-for-upgrading-smart-contracts}

1. Gunakan mekanisme kontrol akses/otorisasi yang aman untuk mencegah peningkatan kontrak pintar yang tidak sah, terutama jika menggunakan pola proxy, pola strategi, atau pemisahan data. Contohnya adalah membatasi akses ke fungsi peningkatan, sehingga hanya pemilik kontrak yang dapat memanggilnya.

2. Meningkatkan kontrak pintar adalah aktivitas yang kompleks dan memerlukan tingkat ketelitian yang tinggi untuk mencegah masuknya kerentanan.

3. Kurangi asumsi kepercayaan dengan mendesentralisasi proses implementasi peningkatan. Strategi yang mungkin termasuk menggunakan [kontrak dompet multi tanda tangan](/developers/docs/smart-contracts/#multisig) untuk mengontrol peningkatan, atau mengharuskan [anggota DAO](/dao/) untuk memberikan suara dalam menyetujui peningkatan.

4. Sadari biaya yang terlibat dalam meningkatkan kontrak. Misalnya, menyalin status (misalnya, saldo pengguna) dari kontrak lama ke kontrak baru selama migrasi kontrak mungkin memerlukan lebih dari satu transaksi, yang berarti lebih banyak biaya gas.

5. Pertimbangkan untuk mengimplementasikan **timelock** untuk melindungi pengguna. Timelock mengacu pada penundaan yang diberlakukan pada perubahan sistem. Timelock dapat digabungkan dengan sistem tata kelola multi tanda tangan untuk mengontrol peningkatan: jika tindakan yang diusulkan mencapai ambang batas persetujuan yang diperlukan, tindakan tersebut tidak akan dieksekusi sampai periode penundaan yang telah ditentukan berlalu.

Timelock memberi pengguna waktu untuk keluar dari sistem jika mereka tidak setuju dengan perubahan yang diusulkan (misalnya, peningkatan logika atau skema biaya baru). Tanpa timelock, pengguna harus memercayai pengembang untuk tidak mengimplementasikan perubahan sewenang-wenang dalam kontrak pintar tanpa pemberitahuan sebelumnya. Kelemahannya di sini adalah bahwa timelock membatasi kemampuan untuk menambal kerentanan dengan cepat.

## Sumber daya {#resources}

**Plugin Peningkatan OpenZeppelin - _Serangkaian alat untuk menerapkan dan mengamankan kontrak pintar yang dapat ditingkatkan._**

- [GitHub](https://github.com/OpenZeppelin/openzeppelin-upgrades)
- [Dokumentasi](https://docs.openzeppelin.com/upgrades)

## Tutorial {#tutorials}

- [Meningkatkan Kontrak Pintar Anda | Tutorial YouTube](https://www.youtube.com/watch?v=bdXJmWajZRY) oleh Patrick Collins
- [Tutorial Migrasi Kontrak Pintar Ethereum](https://medium.com/coinmonks/ethereum-smart-contract-migration-13f6f12539bd) oleh Austin Griffith
- [Menggunakan pola proxy UUPS untuk meningkatkan kontrak pintar](https://blog.logrocket.com/author/praneshas/) oleh Pranesh A.S
- [Tutorial Web3: Menulis kontrak pintar yang dapat ditingkatkan (proxy) menggunakan OpenZeppelin](https://dev.to/yakult/tutorial-write-upgradeable-smart-contract-proxy-contract-with-openzeppelin-1916) oleh fangjun.eth

## Bacaan lebih lanjut {#further-reading}

- [Status Peningkatan Kontrak Pintar](https://blog.openzeppelin.com/the-state-of-smart-contract-upgrades/) oleh Santiago Palladino
- [Berbagai cara untuk meningkatkan kontrak pintar Solidity](https://cryptomarketpool.com/multiple-ways-to-upgrade-a-solidity-smart-contract/) - Blog Crypto Market Pool
- [Belajar: Meningkatkan Kontrak Pintar](https://docs.openzeppelin.com/learn/upgrading-smart-contracts) - Dokumen OpenZeppelin
- [Pola Proxy Untuk Kemampuan Peningkatan Kontrak Solidity: Proxy Transparan vs UUPS](https://mirror.xyz/0xB38709B8198d147cc9Ff9C133838a044d78B064B/M7oTptQkBGXxox-tk9VJjL66E1V8BUF0GF79MMK4YG0) oleh Naveen Sahu
- [Bagaimana Peningkatan Diamond Bekerja](https://dev.to/mudgen/how-diamond-upgrades-work-417j) oleh Nick Mudge