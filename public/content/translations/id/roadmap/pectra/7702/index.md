---
title: Pedoman Pectra 7702
description: Pelajari lebih lanjut tentang 7702 dalam rilis Pectra
lang: id
---

# Pectra 7702

## Abstrak {#abstract}

EIP 7702 mendefinisikan mekanisme untuk menambahkan kode ke EOA. Proposal ini memungkinkan EOA, akun Ethereum lama, untuk menerima peningkatan fungsionalitas jangka pendek, sehingga meningkatkan kegunaan aplikasi. Hal ini dilakukan dengan menetapkan penunjuk ke kode yang telah diterapkan menggunakan tipe transaksi baru: 4.

Jenis transaksi baru ini memperkenalkan daftar otorisasi. Setiap tupel otorisasi dalam daftar didefinisikan sebagai

```
[ id_rantai, alamat, nonce, paritas_y, r, s ]
```

**alamat** adalah delegasi (bytecode yang sudah diterapkan yang akan digunakan oleh EOA)
**chain_id** mengunci otorisasi ke rantai tertentu (atau 0 untuk semua rantai)
**nonce** mengunci otorisasi ke akun nonce tertentu
(**y_parity, r, s**) adalah tanda tangan tupel otorisasi, yang didefinisikan sebagai keccak(0x05 || rlp ([chain_id ,address, nonce])) oleh kunci privat EOA tempat otorisasi diterapkan (juga disebut otoritas)

Delegasi dapat diatur ulang dengan mendelegasikan ke alamat null.

Kunci pribadi EOA memegang kendali penuh atas akun setelah pendelegasian. Misalnya, mendelegasikan ke Safe tidak menjadikan akun tersebut multisig karena masih ada satu kunci yang dapat melewati kebijakan penandatanganan apa pun. Ke depannya, pengembang harus merancang dengan asumsi bahwa setiap peserta dalam sistem dapat menjadi kontrak pintar. Bagi pengembang kontrak pintar, tidak lagi aman untuk berasumsi bahwa `tx.origin` merujuk pada EOA.

## Praktik terbaik {#best-practices}

**abstraksi akun**: Kontrak delegasi harus selaras dengan standar abstraksi akun (AA) Ethereum yang lebih luas untuk memaksimalkan kompatibilitas. Secara khusus, idealnya harus sesuai atau kompatibel dengan ERC-4337.

**desain tanpa izin dan tahan sensor**: Ethereum menghargai partisipasi tanpa izin. Kontrak delegasi TIDAK BOLEH menggunakan hard-code atau bergantung pada satu relayer atau layanan “tepercaya” saja. Ini akan membuat akun menjadi rusak jika relai tersebut offline. Fitur seperti batching (misalnya, approve+transferFrom) dapat digunakan oleh EOA sendiri tanpa relayer. Bagi pengembang aplikasi yang ingin menggunakan fitur-fitur canggih yang diaktifkan oleh 7702 (Abstraksi Gas, Penarikan yang Menjaga Privasi), Anda memerlukan relayer. Meskipun terdapat arsitektur relayer yang berbeda, rekomendasi kami adalah menggunakan [4337 bundler](https://www.erc4337.io/bundlers) yang mengarah setidaknya [titik masuk 0,8](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0) karena:

- Mereka menyediakan antarmuka standar untuk menyampaikan
- Sertakan sistem pembayar terintegrasi
- Pastikan kompatibilitas ke depan
- Dapat mendukung perlawanan terhadap sensor melalui [mempool publik](https://notes.ethereum.org/@yoav/unified-erc-4337-mempool)
- Dapat mengharuskan fungsi init hanya dipanggil dari [titik masuk](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0)

Dengan kata lain, siapa pun harus dapat bertindak sebagai sponsor/penyampaian transaksi selama mereka memberikan tanda tangan sah yang diperlukan atau UserOperation dari akun tersebut. Hal ini memastikan ketahanan terhadap penyensoran: jika tidak diperlukan infrastruktur khusus, transaksi pengguna tidak dapat diblokir secara sembarangan oleh relai penjaga gerbang. Misalnya, [toolkit delegasi metamask](https://github.com/MetaMask/delegation-framework/releases/tag/v1.3.0) secara eksplisit berfungsi dengan bundler ERC-4337 atau paymaster apa pun di rantai mana pun, alih-alih memerlukan server khusus MetaMask.

**integrasi dapps melalui antarmuka dompet**:

Mengingat dompet akan memasukkan kontrak delegasi tertentu ke dalam daftar putih untuk EIP-7702, dApps tidak boleh berharap untuk secara langsung meminta otorisasi 7702. Sebaliknya, integrasi harus terjadi melalui antarmuka dompet standar:

- **ERC-5792 (`wallet_sendcalls`)**: Memungkinkan dApps untuk meminta dompet untuk mengeksekusi panggilan batch, memfasilitasi fungsionalitas seperti pengelompokan transaksi dan abstraksi gas.

- **ERC-6900**: Memungkinkan dApps memanfaatkan kemampuan akun pintar modular, seperti kunci sesi dan pemulihan akun, melalui modul yang dikelola dompet.

Dengan memanfaatkan antarmuka ini, dApps dapat mengakses fungsionalitas akun pintar yang disediakan oleh EIP-7702 tanpa mengelola delegasi secara langsung, memastikan kompatibilitas dan keamanan di berbagai implementasi dompet.

> Catatan: Tidak ada metode standar bagi dApps untuk meminta tanda tangan otorisasi 7702 secara langsung. DApps harus mengandalkan antarmuka dompet tertentu seperti ERC-6900 untuk memanfaatkan fitur EIP-7702.

Untuk informasi lebih lanjut:

- [spesifikasi erc-5792](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-5792.md)
- [spesifikasi erc-6900](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-6900.md)

**menghindari ketergantungan vendor**: Sejalan dengan hal di atas, implementasi yang baik bersifat netral terhadap vendor dan dapat dioperasikan bersama. Ini sering kali berarti mematuhi standar yang muncul untuk akun pintar. Misalnya, [akun modular alkimia](https://github.com/alchemyplatform/modular-account) menggunakan standar ERC-6900 untuk akun pintar modular dan dirancang dengan mempertimbangkan “penggunaan interoperabilitas tanpa izin”.

**pelestarian privasi**: Meskipun privasi onchain terbatas, kontrak delegasi harus berupaya meminimalkan paparan dan ketertautan data. Hal ini dapat dicapai dengan mendukung fitur-fitur seperti pembayaran gas dalam token ERC-20 (sehingga pengguna tidak perlu memelihara saldo ETH publik, yang meningkatkan privasi dan UX) dan kunci sesi satu kali (yang mengurangi ketergantungan pada satu kunci jangka panjang). Misalnya, EIP-7702 memungkinkan pembayaran gas dalam token melalui transaksi yang disponsori, dan implementasi yang baik akan memudahkan integrasi pembayar tersebut tanpa membocorkan informasi lebih banyak dari yang diperlukan. Selain itu, pendelegasian persetujuan tertentu di luar rantai (menggunakan tanda tangan yang diverifikasi di rantai) berarti lebih sedikit transaksi di rantai dengan kunci utama pengguna, sehingga membantu privasi. Akun yang mengharuskan penggunaan relayer memaksa pengguna untuk mengungkapkan alamat IP mereka. PublicMempools menyempurnakan hal ini, saat suatu transaksi/UserOp disebarkan melalui mempool, Anda tidak dapat mengetahui apakah transaksi itu berasal dari IP yang mengirimnya, atau hanya diteruskan melalui protokol p2p.

**ekstensibilitas dan keamanan modular**: Implementasi akun harus dapat diperluas sehingga dapat berkembang dengan fitur baru dan peningkatan keamanan. Kemampuan untuk ditingkatkan secara inheren dimungkinkan dengan EIP-7702 (karena EOA selalu dapat mendelegasikan ke kontrak baru di masa mendatang untuk meningkatkan logikanya). Selain dapat ditingkatkan, desain yang baik memungkinkan modularitas – misalnya modul plug-in untuk skema tanda tangan atau kebijakan pengeluaran yang berbeda – tanpa perlu menerapkan ulang seluruhnya. Kit Akun Alchemy adalah contoh utama, yang memungkinkan pengembang untuk memasang modul validasi (untuk berbagai jenis tanda tangan seperti ECDSA, BLS, dll.) dan modul eksekusi untuk logika khusus. Untuk mencapai fleksibilitas dan keamanan yang lebih besar dalam akun yang mendukung EIP-7702, pengembang didorong untuk mendelegasikan ke kontrak proksi daripada langsung ke implementasi tertentu. Pendekatan ini memungkinkan peningkatan dan modularitas yang mulus tanpa memerlukan otorisasi EIP-7702 tambahan untuk setiap perubahan.

Manfaat pola proxy:

- **dapat ditingkatkan**: Perbarui logika kontrak dengan mengarahkan proksi ke kontrak implementasi baru.

- **logika inisialisasi khusus**: Gabungkan fungsi inisialisasi dalam proksi untuk menyiapkan variabel status yang diperlukan dengan aman.

Misalnya, [safeeip7702proxy](https://docs.safe.global/advanced/eip-7702/7702-safe) menunjukkan bagaimana proxy dapat digunakan untuk menginisialisasi dan mengelola delegasi secara aman di akun yang kompatibel dengan EIP-7702.

Kontra dari pola proxy:

- **ketergantungan pada aktor eksternal**: Anda harus bergantung pada tim eksternal agar tidak meningkatkan ke kontrak yang tidak aman.

## Pertimbangan Keamanan {#security-considerations}

**penjaga reentrancy**: Dengan diperkenalkannya delegasi EIP-7702, akun pengguna dapat secara dinamis beralih antara Akun Milik Eksternal (EOA) dan Kontrak Cerdas (SC). Fleksibilitas ini memungkinkan akun untuk memulai transaksi dan menjadi target panggilan. Akibatnya, skenario di mana suatu akun memanggil dirinya sendiri dan membuat panggilan eksternal akan memiliki `msg.sender` sama dengan `tx.origin`, yang merusak asumsi keamanan tertentu yang sebelumnya bergantung pada `tx.origin` yang selalu menjadi EOA.

Bagi pengembang kontrak pintar, tidak lagi aman untuk berasumsi bahwa `tx.origin` merujuk pada EOA. Demikian pula, menggunakan `msg.sender == tx.origin` sebagai perlindungan terhadap serangan reentrancy tidak lagi menjadi strategi yang dapat diandalkan.

Ke depannya, pengembang harus merancang dengan asumsi bahwa setiap peserta dalam sistem dapat menjadi kontrak pintar. Alternatifnya mereka dapat menerapkan perlindungan reentrancy eksplisit menggunakan penjaga reentrancy dengan pola pengubah `nonReentrant`. Kami sarankan untuk mengikuti pengubah yang diaudit misalnya [penjaga reentrancy open zeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/ReentrancyGuard.sol). Mereka juga dapat menggunakan [variabel penyimpanan sementara](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html).

**Pertimbangan Keamanan Inisialisasi**

Penerapan kontrak delegasi EIP-7702 menimbulkan tantangan keamanan khusus, khususnya terkait proses inisialisasi. Kerentanan kritis muncul ketika fungsi inisialisasi (`init`) digabungkan secara atomik dengan proses delegasi. Dalam kasus semacam itu, seorang frontrunner dapat mencegat tanda tangan delegasi dan menjalankan fungsi `init` dengan parameter yang diubah, yang berpotensi mengambil alih kendali akun.

Risiko ini khususnya relevan ketika mencoba menggunakan implementasi Akun Kontrak Cerdas (SCA) yang ada dengan EIP-7702 tanpa memodifikasi mekanisme inisialisasinya.

**Solusi untuk Mengurangi Kerentanan Inisialisasi**

- Terapkan `initWithSig`
  Ganti fungsi `init` standar dengan fungsi `initWithSig` yang mengharuskan pengguna menandatangani parameter inisialisasi. Pendekatan ini memastikan bahwa inisialisasi hanya dapat dilanjutkan dengan persetujuan pengguna yang eksplisit, sehingga mengurangi risiko inisialisasi yang tidak sah.

- Memanfaatkan EntryPoint ERC-4337
  Memerlukan fungsi inisialisasi yang dipanggil secara eksklusif dari kontrak EntryPoint ERC-4337. Metode ini memanfaatkan kerangka validasi dan eksekusi standar yang disediakan oleh ERC-4337, menambahkan lapisan keamanan tambahan pada proses inisialisasi.  
  _(lihat: [Dokumen Aman](https://docs.safe.global/advanced/eip-7702/7702-safe))_

Dengan mengadopsi solusi ini, pengembang dapat meningkatkan keamanan kontrak delegasi EIP-7702, melindungi dari potensi serangan frontrunning selama fase inisialisasi.

**Tabrakan Penyimpanan** Mendelegasikan kode tidak menghapus penyimpanan yang ada. Saat bermigrasi dari satu kontrak delegasi ke kontrak lainnya, data sisa dari kontrak sebelumnya tetap ada. Jika kontrak baru menggunakan slot penyimpanan yang sama tetapi menafsirkannya secara berbeda, hal itu dapat menyebabkan perilaku yang tidak diinginkan. Misalnya, jika delegasi awal adalah ke kontrak di mana slot penyimpanan mewakili `bool`, dan delegasi berikutnya adalah ke kontrak di mana slot yang sama mewakili `uint`, ketidakcocokan dapat menyebabkan hasil yang tidak dapat diprediksi.

**Risiko phishing** Dengan penerapan delegasi EIP-7702, aset di akun pengguna dapat sepenuhnya dikontrol oleh kontrak pintar. Jika pengguna tanpa sadar mendelegasikan akunnya ke kontrak jahat, penyerang dapat dengan mudah menguasai dan mencuri dana. Saat menggunakan `chain_id=0` delegasi diterapkan ke semua id rantai. Delegasikan hanya ke kontrak yang tidak dapat diubah (jangan pernah mendelegasikan ke proksi), dan hanya ke kontrak yang disebarkan menggunakan CREATE2 (dengan initcode standar - tanpa kontrak metamorfik) sehingga penyebar tidak dapat menyebarkan sesuatu yang berbeda ke alamat yang sama di tempat lain. Jika tidak, pendelegasian Anda akan menempatkan akun Anda pada risiko di semua rantai EVM lainnya.

Saat pengguna melakukan delegasi tanda tangan, kontrak target yang menerima delegasi harus ditampilkan dengan jelas dan mencolok untuk membantu mengurangi risiko phishing.

**permukaan tepercaya & keamanan minimal**: Sambil menawarkan fleksibilitas, kontrak delegasi harus menjaga logika intinya tetap minimal dan dapat diaudit. Kontrak tersebut secara efektif merupakan perpanjangan dari EOA pengguna, jadi setiap kekurangan bisa berakibat fatal. Implementasi harus mengikuti praktik terbaik dari komunitas keamanan kontrak pintar. Misalnya, fungsi konstruktor atau inisialisasi harus diamankan dengan hati-hati – seperti yang disorot oleh Alchemy, jika menggunakan pola proksi di bawah 7702, inisialisasi yang tidak dilindungi dapat memungkinkan penyerang mengambil alih akun. Tim harus berusaha menjaga kode onchain tetap sederhana: kontrak Ambire 7702 hanya terdiri dari ~200 baris Solidity, sengaja meminimalkan kompleksitas untuk mengurangi bug. Keseimbangan harus dicapai antara logika yang kaya fitur dan kesederhanaan yang memudahkan audit.

### Implementasi yang diketahui {#known-implementations}

Karena sifat EIP 7702, dompet direkomendasikan untuk berhati-hati saat membantu pengguna mendelegasikan kontrak ke pihak ketiga. Berikut ini adalah kumpulan implementasi yang diketahui telah diaudit:

| Alamat kontrak                             | Sumber                                                                                                                                 | Audit                                                                                                                                                         |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x000000009B1D0aF20D8C6d0A44e162d11F9b8f00 | [uniswap/calibur](https://github.com/Uniswap/calibur)                                                                                  | [audit](https://github.com/Uniswap/calibur/tree/main/audits)                                                                                                  |
| 0x69007702764179f14F51cdce752f4f775d74E139 | [alchemyplatform/modular-account](https://github.com/alchemyplatform/modular-account)                                                  | [audits](https://github.com/alchemyplatform/modular-account/tree/develop/audits)                                                                              |
| 0x5A7FC11397E9a8AD41BF10bf13F22B0a63f96f6d | [AmbireTech/ambire-common](https://github.com/AmbireTech/ambire-common/blob/feature/eip-7702/contracts/AmbireAccount7702.sol)          | [audits](https://github.com/AmbireTech/ambire-common/tree/feature/eip-7702/audits)                                                                            |
| 0x63c0c19a282a1b52b07dd5a65b58948a07dae32b | [MetaMask/delegation-framework](https://github.com/MetaMask/delegation-framework)                                                      | [audits](https://github.com/MetaMask/delegation-framework/tree/main/audits)                                                                                   |
| 0x4Cd241E8d1510e30b2076397afc7508Ae59C66c9 | [tim aa yayasan ethereum](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/accounts/Simple7702Account.sol) | [audits](https://github.com/eth-infinitism/account-abstraction/blob/develop/audits/SpearBit%20Account%20Abstraction%20Security%20Review%20-%20Mar%202025.pdf) |
| 0x17c11FDdADac2b341F2455aFe988fec4c3ba26e3 | [Luganodes/Pectra-Batch-Contract](https://github.com/Luganodes/Pectra-Batch-Contract)                                                  | [audits](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html)                             |

## Panduan dompet perangkat keras {#hardware-wallet-guidelines}

Dompet perangkat keras tidak seharusnya mengekspos pendelegasian yang sembarangan. Konsensus dalam ruang dompet perangkat keras adalah menggunakan daftar kontrak delegator tepercaya. Kami sarankan untuk mengizinkan implementasi yang diketahui yang tercantum di atas dan mempertimbangkan yang lain berdasarkan kasus per kasus. Karena mendelegasikan EOA Anda ke suatu kontrak memberikan kendali atas semua aset, dompet perangkat keras harus berhati-hati dengan cara mereka menerapkan 7702.

### Skenario integrasi untuk aplikasi pendamping {#integration-scenarios-for-companion-apps}

#### Lazy {#lazy}

Karena EOA masih beroperasi seperti biasa, tidak ada yang perlu dilakukan.

Catatan: beberapa aset dapat ditolak secara otomatis oleh kode delegasi, seperti NFT ERC 1155, dan dukungan harus menyadarinya.

#### Aware {#aware}

Beritahukan pengguna bahwa delegasi sudah ada untuk EOA dengan memeriksa kodenya, dan secara opsional tawarkan untuk menghapus delegasi.

#### Delegasi umum {#common-delegation}

Penyedia perangkat keras memasukkan kontrak delegasi yang diketahui ke dalam daftar putih dan menerapkan dukungan mereka dalam perangkat lunak pendamping. Disarankan untuk memilih kontrak dengan dukungan penuh ERC 4337.

EOA yang didelegasikan ke EOA lain akan ditangani sebagai EOA standar.

#### Delegasi khusus {#custom-delegation}

Penyedia perangkat keras menerapkan kontrak delegasinya sendiri dan menambahkannya ke daftar yang menerapkan dukungannya dalam perangkat lunak pendamping. Disarankan untuk membuat kontrak dengan dukungan ERC 4337 penuh.

EOA yang didelegasikan ke EOA lain akan ditangani sebagai EOA standar.
