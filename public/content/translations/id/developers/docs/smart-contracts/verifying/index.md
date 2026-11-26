---
title: Memverifikasi kontrak pintar
description: Gambaran umum tentang verifikasi kode sumber untuk kontrak pintar Ethereum
lang: id
---

[Kontrak pintar](/developers/docs/smart-contracts/) dirancang untuk bersifat "tanpa kepercayaan", yang berarti pengguna tidak perlu mempercayai pihak ketiga (misalnya, pengembang dan perusahaan) sebelum berinteraksi dengan sebuah kontrak. Sebagai syarat untuk sifat tanpa kepercayaan, pengguna dan pengembang lain harus dapat memverifikasi kode sumber kontrak pintar. Verifikasi kode sumber meyakinkan pengguna dan pengembang bahwa kode kontrak yang dipublikasikan adalah kode yang sama yang berjalan di alamat kontrak pada rantai blok Ethereum.

Penting untuk membedakan antara "verifikasi kode sumber" dan "[verifikasi formal](/developers/docs/smart-contracts/formal-verification/)". Verifikasi kode sumber, yang akan dijelaskan secara rinci di bawah ini, mengacu pada verifikasi bahwa kode sumber yang diberikan dari sebuah kontrak pintar dalam bahasa tingkat tinggi (misalnya, Solidity) dikompilasi menjadi kode bita yang sama untuk dieksekusi di alamat kontrak. Namun, verifikasi formal menjelaskan verifikasi kebenaran kontrak pintar, yang berarti kontrak berperilaku seperti yang diharapkan. Meskipun bergantung pada konteks, verifikasi kontrak biasanya mengacu pada verifikasi kode sumber.

## Apa itu verifikasi kode sumber? {#what-is-source-code-verification}

Sebelum menyebarkan kontrak pintar di [Mesin Virtual Ethereum (EVM)](/developers/docs/evm/), pengembang [mengkompilasi](/developers/docs/smart-contracts/compiling/) kode sumber kontrak—instruksi yang [ditulis dalam Solidity](/developers/docs/smart-contracts/languages/) atau bahasa pemrograman tingkat tinggi lainnya—menjadi kode bita. Karena EVM tidak dapat menafsirkan instruksi tingkat tinggi, mengkompilasi kode sumber menjadi kode bita (yaitu, instruksi mesin tingkat rendah) diperlukan untuk mengeksekusi logika kontrak di EVM.

Verifikasi kode sumber adalah membandingkan kode sumber kontrak pintar dan kode bita yang dikompilasi yang digunakan selama pembuatan kontrak untuk mendeteksi perbedaan apa pun. Memverifikasi kontrak pintar penting karena kode kontrak yang diiklankan mungkin berbeda dari apa yang berjalan di rantai blok.

Verifikasi kontrak pintar memungkinkan penyelidikan tentang apa yang dilakukan kontrak melalui bahasa tingkat tinggi yang digunakannya, tanpa harus membaca kode mesin. Fungsi, nilai, dan biasanya nama variabel serta komentar tetap sama dengan kode sumber asli yang dikompilasi dan disebarkan. Hal ini membuat membaca kode menjadi jauh lebih mudah. Verifikasi sumber juga menyediakan dokumentasi kode, sehingga pengguna akhir mengetahui apa yang dirancang untuk dilakukan oleh kontrak pintar.

### Apa itu kecocokan persis? {#full-verification}

Ada beberapa bagian dari kode sumber yang tidak memengaruhi kode bita yang dikompilasi seperti komentar atau nama variabel. Itu berarti dua kode sumber dengan nama variabel yang berbeda dan komentar yang berbeda keduanya akan dapat memverifikasi kontrak yang sama. Dengan demikian, aktor jahat dapat menambahkan komentar yang menipu atau memberikan nama variabel yang menyesatkan di dalam kode sumber dan membuat kontrak diverifikasi dengan kode sumber yang berbeda dari kode sumber aslinya.

Hal ini dapat dihindari dengan menambahkan data ekstra ke kode bita untuk berfungsi sebagai _jaminan kriptografi_ atas ketepatan kode sumber, dan sebagai _sidik jari_ dari informasi kompilasi. Informasi yang diperlukan ditemukan di [metadata kontrak Solidity](https://docs.soliditylang.org/en/latest/metadata.html), dan hash dari file ini ditambahkan ke akhir kode bita kontrak. Anda dapat melihatnya beraksi di [taman bermain metadata](https://playground.sourcify.dev)

File metadata berisi informasi tentang kompilasi kontrak, termasuk pengaturan kompiler serta nama dan hash dari file sumber. Artinya, jika salah satu pengaturan kompilasi atau bahkan satu bita di salah satu file sumber berubah, file metadata akan berubah. Akibatnya, hash dari file metadata, yang ditambahkan ke kode bita, juga berubah. Itu berarti jika kode bita kontrak + hash metadata yang ditambahkan cocok dengan kode sumber dan pengaturan kompilasi yang diberikan, kita dapat yakin bahwa ini adalah kode sumber yang sama persis yang digunakan dalam kompilasi asli, tidak ada satu bita pun yang berbeda.

Jenis verifikasi yang memanfaatkan hash metadata ini disebut **"[kecocokan persis](https://docs.sourcify.dev/docs/exact-match-vs-match/)"** (sebelumnya kecocokan "penuh" atau "sempurna"). Jika hash metadata tidak cocok atau tidak dipertimbangkan dalam verifikasi, itu adalah **"kecocokan"** (sebelumnya "kecocokan parsial"): kode kontrak diverifikasi, tetapi file sumbernya mungkin berbeda dari yang asli, misalnya dalam komentar atau nama file. Sangat mungkin untuk [menyisipkan kode berbahaya](https://samczsun.com/hiding-in-plain-sight/) yang tidak akan tercermin dalam kode sumber yang diverifikasi tanpa kecocokan persis. Sebagian besar pengembang tidak menyadari kecocokan persis dan tidak menyimpan file metadata dari kompilasi mereka, sehingga kecocokan tanpa hash metadata telah menjadi cara paling umum untuk memverifikasi kontrak sejauh ini.

## Mengapa verifikasi kode sumber penting? {#importance-of-source-code-verification}

### Sifat tanpa kepercayaan {#trustlessness}

Sifat tanpa kepercayaan bisa dibilang merupakan premis terbesar untuk kontrak pintar dan [aplikasi terdesentralisasi (dapp)](/developers/docs/dapps/). Kontrak pintar bersifat "tidak dapat diubah" dan tidak dapat dimodifikasi; sebuah kontrak hanya akan mengeksekusi logika bisnis yang didefinisikan dalam kode pada saat penyebaran. Ini berarti pengembang dan perusahaan tidak dapat merusak kode kontrak setelah menyebarkannya di Ethereum.

Agar kontrak pintar menjadi tanpa kepercayaan, kode kontrak harus tersedia untuk verifikasi independen. Meskipun kode bita yang dikompilasi untuk setiap kontrak pintar tersedia secara publik di rantai blok, bahasa tingkat rendah sulit dipahami—baik bagi pengembang maupun pengguna.

Proyek mengurangi asumsi kepercayaan dengan mempublikasikan kode sumber kontrak mereka. Namun hal ini menimbulkan masalah lain: sulit untuk memverifikasi bahwa kode sumber yang dipublikasikan cocok dengan kode bita kontrak. Dalam skenario ini, nilai sifat tanpa kepercayaan hilang karena pengguna harus mempercayai pengembang untuk tidak mengubah logika bisnis kontrak (yaitu, dengan mengubah kode bita) sebelum menyebarkannya di rantai blok.

Alat verifikasi kode sumber memberikan jaminan bahwa file kode sumber kontrak pintar cocok dengan kode rakitan (assembly). Hasilnya adalah ekosistem tanpa kepercayaan, di mana pengguna tidak secara membabi buta mempercayai pihak ketiga dan sebaliknya memverifikasi kode sebelum menyetorkan dana ke dalam kontrak.

### Keamanan Pengguna {#user-safety}

Dengan kontrak pintar, biasanya ada banyak uang yang dipertaruhkan. Hal ini menuntut jaminan keamanan yang lebih tinggi dan verifikasi logika kontrak pintar sebelum menggunakannya. Masalahnya adalah pengembang yang tidak bermoral dapat menipu pengguna dengan menyisipkan kode berbahaya dalam kontrak pintar. Tanpa verifikasi, kontrak pintar yang berbahaya dapat memiliki [pintu belakang (backdoor)](https://www.trustnodes.com/2018/11/10/concerns-rise-over-backdoored-smart-contracts), mekanisme kontrol akses yang kontroversial, kerentanan yang dapat dieksploitasi, dan hal-hal lain yang membahayakan keamanan pengguna yang tidak akan terdeteksi.

Mempublikasikan file kode sumber kontrak pintar memudahkan mereka yang tertarik, seperti auditor, untuk menilai kontrak terhadap potensi vektor serangan. Dengan berbagai pihak yang secara independen memverifikasi kontrak pintar, pengguna memiliki jaminan yang lebih kuat atas keamanannya.

## Cara memverifikasi kode sumber untuk kontrak pintar Ethereum {#source-code-verification-for-ethereum-smart-contracts}

[Menyebarkan kontrak pintar di Ethereum](/developers/docs/smart-contracts/deploying/) memerlukan pengiriman transaksi dengan muatan data (kode bita yang dikompilasi) ke alamat khusus. Muatan data dihasilkan dengan mengkompilasi kode sumber, ditambah [argumen konstruktor](https://docs.soliditylang.org/en/v0.8.14/contracts.html#constructor) dari instans kontrak yang ditambahkan ke muatan data dalam transaksi. Kompilasi bersifat deterministik, yang berarti selalu menghasilkan keluaran yang sama (yaitu, kode bita kontrak) jika file sumber yang sama, dan pengaturan kompilasi (misalnya, versi kompiler, pengoptimal) digunakan. Nama dan jalur file sumber juga merupakan bagian dari masukan tersebut: mereka dicatat dalam metadata, sehingga mengganti nama file akan mengubah hash metadata.

<SourceVerifyDiagram />

Memverifikasi kontrak pintar pada dasarnya melibatkan langkah-langkah berikut:

1. Masukkan file sumber dan pengaturan kompilasi ke kompiler.

2. Kompiler mengeluarkan kode bita dari kontrak

3. Dapatkan kode bita dari kontrak yang disebarkan pada alamat tertentu (dengan `eth_getCode`)

4. Bandingkan kode bita yang disebarkan dengan kode bita yang dikompilasi ulang. Jika kodenya cocok, kontrak akan diverifikasi dengan kode sumber dan pengaturan kompilasi yang diberikan.

5. Selain itu, jika hash metadata di akhir kode bita cocok, itu akan menjadi kecocokan persis.

Pemverifikasi juga dapat membandingkan kode bita pembuatan kontrak: kode yang menyebarkannya (untuk kontrak yang disebarkan langsung dari sebuah akun, masukan transaksi penyebaran), yang merupakan kode bita yang dikompilasi diikuti oleh [argumen konstruktor](https://docs.soliditylang.org/en/latest/contracts.html#constructor) yang dienkode.

Perhatikan bahwa ini adalah deskripsi verifikasi yang disederhanakan dan ada banyak pengecualian yang tidak akan berfungsi dengan cara ini seperti memiliki [variabel yang tidak dapat diubah](https://docs.sourcify.dev/docs/immutables/).

## Alat verifikasi kode sumber {#source-code-verification-tools}

Proses tradisional untuk memverifikasi kontrak bisa jadi rumit. Inilah sebabnya kami memiliki alat untuk memverifikasi kode sumber untuk kontrak pintar yang disebarkan di Ethereum. Alat-alat ini mengotomatiskan sebagian besar verifikasi kode sumber dan juga mengkurasi kontrak yang diverifikasi untuk kepentingan pengguna.

### Etherscan {#etherscan}

Meskipun sebagian besar dikenal sebagai [penjelajah blok Ethereum](/developers/docs/data-and-analytics/block-explorers/), Etherscan juga menawarkan [layanan verifikasi kode sumber](https://etherscan.io/verifyContract) untuk pengembang dan pengguna kontrak pintar.

Etherscan memungkinkan Anda untuk mengkompilasi ulang kode bita kontrak dari muatan data asli (kode sumber, alamat Pustaka, pengaturan kompiler, alamat kontrak, dll.) Jika kode bita yang dikompilasi ulang dikaitkan dengan kode bita (dan parameter konstruktor) dari kontrak onchain, maka [kontrak tersebut diverifikasi](https://info.etherscan.com/types-of-contract-verification/).

Setelah diverifikasi, kode sumber kontrak Anda menerima label "Verified" (Diverifikasi) dan dipublikasikan di Etherscan untuk diaudit oleh orang lain. Kontrak tersebut juga ditambahkan ke bagian [Kontrak yang Diverifikasi](https://etherscan.io/contractsVerified/)—sebuah repositori kontrak pintar dengan kode sumber yang telah diverifikasi.

Etherscan adalah alat yang paling banyak digunakan untuk memverifikasi kontrak. Alat ini melabeli setiap kontrak yang diverifikasi berdasarkan [bagaimana kecocokannya](https://info.etherscan.com/types-of-contract-verification/): kecocokan persis dari kode bita pembuatan kontrak dan argumen konstruktor, kecocokan waktu proses (runtime) dari kode bita yang disebarkan saja, atau kecocokan serupa, yang diberikan secara otomatis ketika kode bita kontrak cocok dengan kontrak yang sudah diverifikasi. Kecocokan persis Etherscan adalah tentang kode bita pembuatan dan argumen konstruktor; ini bukan perbedaan yang sama dengan kecocokan persis dan kecocokan yang dijelaskan di atas.

[Lebih lanjut tentang memverifikasi kontrak di Etherscan](https://medium.com/etherscan-blog/verifying-contracts-on-etherscan-f995ab772327).

### Blockscout {#blockscout}

[Blockscout](https://blockscout.com/) adalah penjelajah rantai blok sumber terbuka yang juga menyediakan [layanan verifikasi kontrak](https://eth.blockscout.com/contract-verification) untuk pengembang dan pengguna kontrak pintar. Sebagai alternatif sumber terbuka, Blockscout menawarkan transparansi dalam bagaimana verifikasi dilakukan dan memungkinkan kontribusi komunitas untuk meningkatkan proses verifikasi.

Mirip dengan layanan verifikasi lainnya, Blockscout memungkinkan Anda untuk memverifikasi kode sumber kontrak Anda dengan mengkompilasi ulang kode bita dan membandingkannya dengan kontrak yang disebarkan. Setelah diverifikasi, kontrak Anda menerima status verifikasi dan kode sumbernya tersedia untuk publik untuk audit dan interaksi. Kontrak yang diverifikasi juga terdaftar di [repositori kontrak yang diverifikasi](https://eth.blockscout.com/verified-contracts) Blockscout untuk penjelajahan dan penemuan yang mudah.

### Sourcify {#sourcify}

[Sourcify](https://verify.sourcify.dev) adalah alat lain untuk memverifikasi kontrak yang bersumber terbuka dan terdesentralisasi. Ini bukan penjelajah blok dan hanya memverifikasi kontrak di [berbagai jaringan berbasis EVM](https://docs.sourcify.dev/docs/chains). Alat ini bertindak sebagai infrastruktur publik untuk alat lain yang dibangun di atasnya, dan bertujuan untuk memungkinkan interaksi kontrak yang lebih ramah manusia menggunakan [Antarmuka Biner Aplikasi (ABI)](/developers/docs/smart-contracts/compiling/#web-applications) dan komentar [NatSpec](https://docs.soliditylang.org/en/v0.8.15/natspec-format.html) yang ditemukan dalam file metadata.

Sourcify melaporkan apakah sebuah kontrak merupakan kecocokan persis, dengan hash metadata, atau kecocokan tanpanya, baik untuk pembuatan maupun kode bita yang disebarkan. Kontrak yang diverifikasinya bersifat publik: mereka dapat dikueri melalui Antarmuka Pemrograman Aplikasi (API)-nya dan diunduh sebagai [kumpulan data](https://docs.sourcify.dev/docs/repository/). Sourcify meneruskan verifikasinya ke penjelajah blok termasuk Blockscout, Routescan, dan Etherscan, serta membagikan basis data kontrak yang diverifikasi dengan Blockscout dan Routescan melalui [Verifier Alliance](https://verifieralliance.org/).

File metadata juga menyimpan hash IPFS dari file sumber, dan hash metadata yang ditambahkan ke kode bita itu sendiri adalah hash IPFS. Jika seorang pengembang mempublikasikan metadata dan file sumber di [IPFS](https://docs.ipfs.tech/concepts/what-is-ipfs/), siapa pun dapat mengambil sumber persis dari sebuah kontrak hanya dari kode bitanya, selama file tersebut tetap tersedia di IPFS. Sebuah kontrak dapat diverifikasi dengan menyediakan file metadata dan file sumber melalui API-nya atau [UI](https://verify.sourcify.dev), atau menggunakan plugin untuk alat pengembangan seperti Hardhat dan Foundry. [Monitor](https://docs.sourcify.dev/docs/monitoring/) Sourcify juga mengawasi kontrak baru di rantai yang diikutinya dan memverifikasinya secara otomatis ketika metadata dan file sumbernya dipublikasikan di IPFS.

[Lebih lanjut tentang memverifikasi kontrak di Sourcify](https://soliditylang.org/blog/2020/06/25/sourcify-faq/).

### Tenderly {#tenderly}

[Platform Tenderly](https://tenderly.co/) memungkinkan pengembang Web3 untuk membangun, menguji, memantau, dan mengoperasikan kontrak pintar. Menggabungkan alat debugging dengan observabilitas dan blok bangunan infrastruktur, Tenderly membantu pengembang mempercepat pengembangan kontrak pintar. Untuk sepenuhnya mengaktifkan fitur Tenderly, pengembang perlu [melakukan verifikasi kode sumber](https://docs.tenderly.co/contract-verification) menggunakan beberapa metode.

Sangat mungkin untuk memverifikasi kontrak secara privat atau publik. Jika diverifikasi secara privat, kontrak pintar hanya terlihat oleh Anda (dan anggota lain dalam proyek Anda). Memverifikasi kontrak secara publik membuatnya terlihat oleh semua orang yang menggunakan platform Tenderly.

Anda dapat memverifikasi kontrak Anda menggunakan [Dasbor](https://docs.tenderly.co/contract-verification), [plugin Tenderly Hardhat](https://docs.tenderly.co/contract-verification/hardhat), atau [Foundry](https://docs.tenderly.co/contract-verification/foundry).

Saat memverifikasi kontrak melalui Dasbor, Anda perlu mengimpor file sumber atau file metadata yang dihasilkan oleh kompiler Solidity, alamat/jaringan, dan pengaturan kompiler.

Menggunakan plugin Tenderly Hardhat memungkinkan kontrol lebih besar atas proses verifikasi dengan lebih sedikit usaha, memungkinkan Anda untuk memilih antara verifikasi otomatis (tanpa kode) dan manual (berbasis kode).

## Bacaan lebih lanjut {#further-reading}

- [Memverifikasi kode sumber kontrak](https://programtheblockchain.com/posts/2018/01/16/verifying-contract-source-code/)
