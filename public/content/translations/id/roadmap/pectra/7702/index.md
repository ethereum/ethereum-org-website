---
title: Pectra 7702
metaTitle: Panduan Pectra 7702
description: Pelajari lebih lanjut tentang 7702 dalam rilis Pectra
lang: id
---

## Abstrak {#abstract}

EIP-7702 mendefinisikan mekanisme untuk menambahkan kode ke EOA. Proposal ini memungkinkan EOA, akun Ethereum lama, untuk menerima peningkatan fungsionalitas jangka pendek, sehingga meningkatkan kegunaan aplikasi. Hal ini dilakukan dengan menetapkan penunjuk ke kode yang sudah disebarkan menggunakan jenis transaksi baru: 4.

Jenis transaksi baru ini memperkenalkan daftar otorisasi. Setiap tupel otorisasi dalam daftar didefinisikan sebagai

```
[ chain_id, address, nonce, y_parity, r, s ]
```

**address** adalah pendelegasian (kode bita yang sudah disebarkan yang akan digunakan oleh EOA)
**chain_id** mengunci otorisasi ke rantai tertentu (atau 0 untuk semua rantai)
**nonce** mengunci otorisasi ke nonce akun tertentu
(**y_parity, r, s**) adalah tanda tangan dari tupel otorisasi, yang didefinisikan sebagai keccak(0x05 || rlp ([chain_id ,address, nonce])) oleh kunci privat EOA yang menjadi tujuan penerapan otorisasi (juga disebut otoritas)

Pendelegasian dapat diatur ulang dengan mendelegasikan ke alamat null.

Kunci privat EOA memegang kendali penuh atas akun setelah pendelegasian. Misalnya, mendelegasikan ke Safe tidak membuat akun tersebut menjadi multisig karena masih ada satu kunci yang dapat melewati kebijakan penandatanganan apa pun. Ke depannya, pengembang harus merancang dengan asumsi bahwa setiap peserta dalam sistem bisa jadi merupakan kontrak pintar. Bagi pengembang kontrak pintar, tidak lagi aman untuk berasumsi bahwa `tx.origin` merujuk pada EOA.

## Praktik terbaik {#best-practices}

**Abstraksi Akun**: Kontrak pendelegasian harus selaras dengan standar abstraksi akun (AA) Ethereum yang lebih luas untuk memaksimalkan kompatibilitas. Secara khusus, kontrak tersebut idealnya mematuhi atau kompatibel dengan ERC-4337.

**Desain Tanpa Izin dan Tahan Sensor**: Ethereum menghargai partisipasi tanpa izin. Kontrak pendelegasian TIDAK BOLEH melakukan hard-code atau bergantung pada satu relayer atau layanan "tepercaya" mana pun. Hal ini akan merusak akun jika relayer luring (offline). Fitur seperti pemrosesan batch (misalnya, menyetujui+transferFrom) dapat digunakan oleh EOA itu sendiri tanpa relayer. Bagi pengembang aplikasi yang ingin menggunakan fitur lanjutan yang diaktifkan oleh EIP-7702 (Abstraksi Gas, Penarikan yang Menjaga Privasi), Anda akan memerlukan relayer. Meskipun ada arsitektur relayer yang berbeda, rekomendasi kami adalah menggunakan [pemaket 4337](https://www.erc4337.io/bundlers) yang mengarah setidaknya ke [titik masuk 0.8](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0) karena:

- Mereka menyediakan antarmuka standar untuk relai
- Menyertakan sistem juru bayar bawaan
- Memastikan kompatibilitas ke depan
- Dapat mendukung ketahanan sensor melalui [mempool publik](https://notes.ethereum.org/@yoav/unified-erc-4337-mempool)
- Dapat mewajibkan fungsi init agar hanya dipanggil dari [EntryPoint](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0)

Dengan kata lain, siapa pun harus dapat bertindak sebagai sponsor/relayer transaksi selama mereka memberikan tanda tangan yang valid atau OperasiPengguna yang diwajibkan dari akun tersebut. Hal ini memastikan ketahanan sensor: jika tidak ada infrastruktur khusus yang diwajibkan, transaksi pengguna tidak dapat diblokir secara sewenang-wenang oleh relai penjaga gerbang (gatekeeping). Misalnya, [Toolkit Pendelegasian MetaMask](https://github.com/MetaMask/delegation-framework/releases/tag/v1.3.0) secara eksplisit berfungsi dengan pemaket atau juru bayar ERC-4337 mana pun di rantai mana pun, alih-alih mewajibkan server khusus MetaMask.

**Integrasi Aplikasi Terdesentralisasi (dapp) melalui Antarmuka Dompet**:

Mengingat bahwa dompet akan memasukkan kontrak pendelegasian tertentu ke daftar putih untuk EIP-7702, dapp tidak boleh berharap untuk meminta otorisasi 7702 secara langsung. Sebaliknya, integrasi harus terjadi melalui antarmuka dompet standar:

- **ERC-5792 (`wallet_sendCalls`)**: Memungkinkan dapp untuk meminta dompet mengeksekusi panggilan yang diproses secara batch, memfasilitasi fungsionalitas seperti pemrosesan batch transaksi dan abstraksi gas.

- **ERC-6900**: Memungkinkan dapp untuk memanfaatkan kemampuan akun pintar modular, seperti kunci sesi dan pemulihan akun, melalui modul yang dikelola dompet.

Dengan memanfaatkan antarmuka ini, dapp dapat mengakses fungsionalitas akun pintar yang disediakan oleh EIP-7702 tanpa mengelola pendelegasian secara langsung, memastikan kompatibilitas dan keamanan di berbagai implementasi dompet.

> Catatan: Tidak ada metode standar bagi dapp untuk meminta tanda tangan otorisasi 7702 secara langsung. Dapp harus bergantung pada antarmuka dompet tertentu seperti ERC-6900 untuk memanfaatkan fitur EIP-7702.

Untuk informasi lebih lanjut:

- [Spesifikasi ERC-5792](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-5792.md)
- [Spesifikasi ERC-6900](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-6900.md)

**Menghindari Ketergantungan Vendor (Vendor Lock-In)**: Sejalan dengan hal di atas, implementasi yang baik bersifat netral terhadap vendor dan Interoperabel. Hal ini sering kali berarti mematuhi standar yang muncul untuk akun pintar. Misalnya, [Akun Modular Alchemy](https://github.com/alchemyplatform/modular-account) menggunakan standar ERC-6900 untuk akun pintar modular dan dirancang dengan mempertimbangkan "penggunaan interoperabel tanpa izin".

**Pelestarian Privasi**: Meskipun privasi onchain terbatas, kontrak pendelegasian harus berusaha meminimalkan paparan data dan keterkaitan. Hal ini dapat dicapai dengan mendukung fitur seperti pembayaran gas dalam token ERC-20 (sehingga pengguna tidak perlu mempertahankan saldo ETH publik, yang meningkatkan privasi dan UX) dan kunci sesi satu kali (yang mengurangi ketergantungan pada satu kunci jangka panjang). Misalnya, EIP-7702 memungkinkan pembayaran gas dalam token melalui transaksi yang disponsori, dan implementasi yang baik akan memudahkan integrasi juru bayar tersebut tanpa membocorkan lebih banyak informasi daripada yang diperlukan. Selain itu, pendelegasian offchain dari persetujuan tertentu (menggunakan tanda tangan yang diverifikasi onchain) berarti lebih sedikit transaksi onchain dengan kunci utama pengguna, yang membantu privasi. Akun yang mewajibkan penggunaan relayer memaksa pengguna untuk mengungkapkan alamat IP mereka. Mempool Publik memperbaiki hal ini, ketika transaksi/OperasiPengguna menyebar melalui mempool, Anda tidak dapat mengetahui apakah itu berasal dari IP yang mengirimkannya, atau hanya direlai melaluinya via protokol p2p.

**Ekstensibilitas dan Keamanan Modular**: Implementasi akun harus dapat diperluas sehingga dapat berkembang dengan fitur baru dan peningkatan keamanan. Peningkatan (upgradability) pada dasarnya dimungkinkan dengan EIP-7702 (karena EOA selalu dapat mendelegasikan ke kontrak baru di masa mendatang untuk meningkatkan logikanya). Selain peningkatan, desain yang baik memungkinkan modularitas – misalnya, modul plug-in untuk skema tanda tangan atau kebijakan pengeluaran yang berbeda – tanpa perlu menyebarkan ulang sepenuhnya. Account Kit Alchemy adalah contoh utama, yang memungkinkan pengembang untuk menginstal modul validasi (untuk berbagai jenis tanda tangan seperti ECDSA, BLS, dll.) dan modul eksekusi untuk logika kustom. Untuk mencapai fleksibilitas dan keamanan yang lebih besar dalam akun yang mengaktifkan EIP-7702, pengembang didorong untuk mendelegasikan ke kontrak proksi daripada langsung ke implementasi tertentu. Pendekatan ini memungkinkan peningkatan dan modularitas yang mulus tanpa mewajibkan otorisasi EIP-7702 tambahan untuk setiap perubahan.

Manfaat Pola Proksi:

- **Peningkatan (Upgradability)**: Perbarui logika kontrak dengan mengarahkan proksi ke kontrak implementasi baru.

- **Logika Inisialisasi Kustom**: Gabungkan fungsi inisialisasi di dalam proksi untuk mengatur variabel state yang diperlukan secara aman.

Misalnya, [SafeEIP7702Proxy](https://docs.safe.global/advanced/eip-7702/7702-safe) mendemonstrasikan bagaimana proksi dapat dimanfaatkan untuk menginisialisasi dan mengelola pendelegasian secara aman di akun yang kompatibel dengan EIP-7702.

Kekurangan Pola Proksi:

- **Ketergantungan pada aktor eksternal**: Anda harus bergantung pada tim eksternal untuk tidak meningkatkan ke kontrak yang tidak aman.

## Pertimbangan Keamanan {#security-considerations}

**Pelindung reentrasi**: Dengan diperkenalkannya pendelegasian EIP-7702, akun pengguna dapat beralih secara dinamis antara Akun Milik Eksternal (EOA) dan Kontrak Pintar (SC). Fleksibilitas ini memungkinkan akun untuk memulai transaksi sekaligus menjadi target panggilan. Akibatnya, skenario di mana sebuah akun memanggil dirinya sendiri dan melakukan panggilan eksternal akan memiliki `msg.sender` yang sama dengan `tx.origin`, yang merusak asumsi keamanan tertentu yang sebelumnya bergantung pada `tx.origin` yang selalu berupa EOA.

Bagi pengembang kontrak pintar, tidak lagi aman untuk berasumsi bahwa `tx.origin` merujuk pada EOA. Demikian pula, menggunakan `msg.sender == tx.origin` sebagai perlindungan terhadap serangan reentransi bukan lagi strategi yang dapat diandalkan.

Ke depannya, pengembang harus merancang dengan asumsi bahwa setiap peserta dalam sistem bisa jadi merupakan kontrak pintar. Sebagai alternatif, mereka dapat mengimplementasikan perlindungan reentransi eksplisit menggunakan pelindung reentrasi dengan pola pengubah `nonReentrant`. Kami merekomendasikan untuk mengikuti pengubah yang telah diaudit, misalnya [Pelindung Reentrasi Open Zeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/ReentrancyGuard.sol). Mereka juga dapat menggunakan [variabel penyimpanan sementara (transient storage)](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html).

**Pertimbangan Keamanan Inisialisasi**

Mengimplementasikan kontrak pendelegasian EIP-7702 memperkenalkan tantangan keamanan tertentu, terutama mengenai proses inisialisasi. Kerentanan kritis muncul ketika fungsi inisialisasi (`init`) digabungkan secara atomik dengan proses pendelegasian. Dalam kasus seperti itu, seorang frontrunner dapat mencegat tanda tangan pendelegasian dan mengeksekusi fungsi `init` dengan parameter yang diubah, yang berpotensi mengambil alih kendali akun.

Risiko ini sangat relevan ketika mencoba menggunakan implementasi Akun Kontrak Pintar (SCA) yang ada dengan EIP-7702 tanpa memodifikasi mekanisme inisialisasinya.

**Solusi untuk Memitigasi Kerentanan Inisialisasi**

- Implementasikan `initWithSig`  
  Ganti fungsi `init` standar dengan fungsi `initWithSig` yang mewajibkan pengguna untuk menandatangani parameter inisialisasi. Pendekatan ini memastikan bahwa inisialisasi hanya dapat dilanjutkan dengan persetujuan eksplisit pengguna, sehingga memitigasi risiko inisialisasi yang tidak sah.

- Manfaatkan EntryPoint ERC-4337  
  Wajibkan agar fungsi inisialisasi dipanggil secara eksklusif dari kontrak EntryPoint ERC-4337. Metode ini memanfaatkan kerangka kerja validasi dan eksekusi standar yang disediakan oleh ERC-4337, menambahkan lapisan keamanan tambahan pada proses inisialisasi.  
  _(Lihat: [Dokumentasi Safe](https://docs.safe.global/advanced/eip-7702/7702-safe))_

Dengan mengadopsi solusi ini, pengembang dapat meningkatkan keamanan kontrak pendelegasian EIP-7702, melindungi dari potensi serangan frontrunning selama fase inisialisasi.

**Tabrakan Penyimpanan (Storage Collisions)** Mendelegasikan kode tidak menghapus penyimpanan yang ada. Saat bermigrasi dari satu kontrak pendelegasian ke kontrak lainnya, sisa data dari kontrak sebelumnya tetap ada. Jika kontrak baru memanfaatkan slot penyimpanan yang sama tetapi menafsirkannya secara berbeda, hal itu dapat menyebabkan perilaku yang tidak diinginkan. Misalnya, jika pendelegasian awal adalah ke kontrak di mana slot penyimpanan mewakili `bool`, dan pendelegasian berikutnya adalah ke kontrak di mana slot yang sama mewakili `uint`, ketidakcocokan tersebut dapat menyebabkan hasil yang tidak dapat diprediksi.

**Risiko Phishing** Dengan implementasi pendelegasian EIP-7702, aset di akun pengguna mungkin sepenuhnya dikendalikan oleh kontrak pintar. Jika pengguna tanpa sadar mendelegasikan akun mereka ke kontrak berbahaya, penyerang dapat dengan mudah mengambil alih kendali dan mencuri dana. Saat menggunakan `chain_id=0`, pendelegasian diterapkan ke semua id rantai. Hanya delegasikan ke kontrak yang tidak dapat diubah (jangan pernah mendelegasikan ke proksi), dan hanya ke kontrak yang disebarkan menggunakan CREATE2 (dengan initcode standar - bukan kontrak metamorfik) sehingga penyebar tidak dapat menyebarkan sesuatu yang berbeda ke alamat yang sama di tempat lain. Jika tidak, pendelegasian Anda menempatkan akun Anda pada risiko di semua rantai EVM lainnya.

Saat pengguna melakukan tanda tangan yang didelegasikan, kontrak target yang menerima pendelegasian harus ditampilkan dengan jelas dan menonjol untuk membantu memitigasi risiko phishing.

**Permukaan Tepercaya Minimal & Keamanan**: Meskipun menawarkan fleksibilitas, kontrak pendelegasian harus menjaga logika intinya tetap minimal dan dapat diaudit. Kontrak tersebut secara efektif merupakan perpanjangan dari EOA pengguna, sehingga kelemahan apa pun dapat berakibat fatal. Implementasi harus mengikuti praktik terbaik dari komunitas keamanan kontrak pintar. Misalnya, fungsi konstruktor atau inisialisasi harus diamankan dengan hati-hati – seperti yang disoroti oleh Alchemy, jika menggunakan pola proksi di bawah 7702, inisialisasi yang tidak terlindungi dapat membiarkan penyerang mengambil alih akun. Tim harus bertujuan untuk menjaga kode onchain tetap sederhana: Kontrak 7702 Ambire hanya sekitar 200 baris Solidity, dengan sengaja meminimalkan kompleksitas untuk mengurangi bug. Keseimbangan harus dicapai antara logika yang kaya fitur dan kesederhanaan yang memudahkan audit.

### Implementasi yang diketahui {#known-implementations}

Karena sifat EIP-7702, disarankan agar dompet berhati-hati saat membantu pengguna mendelegasikan ke kontrak pihak ke-3. Tercantum di bawah ini adalah kumpulan implementasi yang diketahui yang telah diaudit:

| Alamat kontrak                           | Sumber                                                                                                                                     | Audit                                                                                                                                                        |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x000000009B1D0aF20D8C6d0A44e162d11F9b8f00 | [Uniswap/calibur](https://github.com/Uniswap/calibur)                                                                                      | [audit](https://github.com/Uniswap/calibur/tree/main/audits)                                                                                                 |
| 0x69007702764179f14F51cdce752f4f775d74E139 | [alchemyplatform/modular-account](https://github.com/alchemyplatform/modular-account)                                                      | [audit](https://github.com/alchemyplatform/modular-account/tree/develop/audits)                                                                              |
| 0x5A7FC11397E9a8AD41BF10bf13F22B0a63f96f6d | [AmbireTech/ambire-common](https://github.com/AmbireTech/ambire-common/blob/feature/eip-7702/contracts/AmbireAccount7702.sol)              | [audit](https://github.com/AmbireTech/ambire-common/tree/feature/eip-7702/audits)                                                                            |
| 0x63c0c19a282a1b52b07dd5a65b58948a07dae32b | [MetaMask/delegation-framework](https://github.com/MetaMask/delegation-framework)                                                          | [audit](https://github.com/MetaMask/delegation-framework/tree/main/audits)                                                                                   |
| 0x4Cd241E8d1510e30b2076397afc7508Ae59C66c9 | [Tim AA Yayasan Ethereum](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/accounts/Simple7702Account.sol) | [audit](https://github.com/eth-infinitism/account-abstraction/blob/develop/audits/SpearBit%20Account%20Abstraction%20Security%20Review%20-%20Mar%202025.pdf) |
| 0x17c11FDdADac2b341F2455aFe988fec4c3ba26e3 | [Luganodes/Pectra-Batch-Contract](https://github.com/Luganodes/Pectra-Batch-Contract)                                                      | [audit](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html)                             |

## Panduan dompet perangkat keras {#hardware-wallet-guidelines}

Dompet perangkat keras tidak boleh mengekspos pendelegasian sewenang-wenang. Konsensus di ruang dompet perangkat keras adalah menggunakan daftar kontrak delegator tepercaya. Kami menyarankan untuk mengizinkan implementasi yang diketahui yang tercantum di atas dan mempertimbangkan yang lain berdasarkan kasus per kasus. Karena mendelegasikan EOA Anda ke kontrak memberikan kendali atas semua aset, dompet perangkat keras harus berhati-hati dengan cara mereka mengimplementasikan 7702.

### Skenario integrasi untuk aplikasi pendamping {#integration-scenarios-for-companion-apps}

#### Malas (Lazy) {#lazy}

Karena EOA masih beroperasi seperti biasa, tidak ada yang perlu dilakukan.

Catatan: beberapa aset dapat ditolak secara otomatis oleh kode pendelegasian, seperti NFT ERC-1155, dan dukungan harus menyadarinya.

#### Sadar (Aware) {#aware}

Beri tahu pengguna bahwa pendelegasian sedang berlangsung untuk EOA dengan memeriksa kodenya, dan secara opsional tawarkan untuk menghapus pendelegasian tersebut.

#### Pendelegasian umum {#common-delegation}

Penyedia perangkat keras memasukkan kontrak pendelegasian yang diketahui ke daftar putih dan mengimplementasikan dukungannya di perangkat lunak pendamping. Disarankan untuk memilih kontrak dengan dukungan ERC-4337 penuh.

EOA yang didelegasikan ke kontrak yang berbeda akan ditangani sebagai EOA standar.

#### Pendelegasian kustom {#custom-delegation}

Penyedia perangkat keras mengimplementasikan kontrak pendelegasiannya sendiri dan menambahkannya ke daftar serta mengimplementasikan dukungannya di perangkat lunak pendamping. Disarankan untuk membangun kontrak dengan dukungan ERC-4337 penuh.

EOA yang didelegasikan ke kontrak yang berbeda akan ditangani sebagai EOA standar.