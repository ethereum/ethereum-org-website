---
title: Memverifikasi kontrak pintar
description: Gambaran umum tentang verifikasi kode sumber untuk kontrak pintar Ethereum
lang: id
---

[Kontrak pintar](/developers/docs/smart-contracts/) dirancang untuk bersifat "tanpa kepercayaan", yang berarti pengguna tidak perlu mempercayai pihak ketiga (misalnya, pengembang dan perusahaan) sebelum berinteraksi dengan sebuah kontrak. Sebagai syarat untuk sifat tanpa kepercayaan, pengguna dan pengembang lain harus dapat memverifikasi kode sumber kontrak pintar. Verifikasi kode sumber meyakinkan pengguna dan pengembang bahwa kode kontrak yang dipublikasikan adalah kode yang sama yang berjalan pada alamat kontrak di rantai blok Ethereum.

Penting untuk membedakan antara "verifikasi kode sumber" dan "[verifikasi formal](/developers/docs/smart-contracts/formal-verification/)". Verifikasi kode sumber, yang akan dijelaskan secara rinci di bawah ini, mengacu pada verifikasi bahwa kode sumber yang diberikan dari sebuah kontrak pintar dalam bahasa tingkat tinggi (misalnya, Solidity) dikompilasi menjadi kode bita yang sama untuk dieksekusi pada alamat kontrak. Namun, verifikasi formal menjelaskan verifikasi kebenaran sebuah kontrak pintar, yang berarti kontrak tersebut berperilaku seperti yang diharapkan. Meskipun bergantung pada konteks, verifikasi kontrak biasanya mengacu pada verifikasi kode sumber.

## Apa itu verifikasi kode sumber? {#what-is-source-code-verification}

Sebelum menyebarkan kontrak pintar di [Ethereum Virtual Machine (EVM)](/developers/docs/evm/), pengembang [mengkompilasi](/developers/docs/smart-contracts/compiling/) kode sumber kontrak—instruksi yang [ditulis dalam Solidity](/developers/docs/smart-contracts/languages/) atau bahasa pemrograman tingkat tinggi lainnya—menjadi kode bita. Karena EVM tidak dapat menafsirkan instruksi tingkat tinggi, mengkompilasi kode sumber menjadi kode bita (yaitu, instruksi mesin tingkat rendah) diperlukan untuk mengeksekusi logika kontrak di EVM.

Verifikasi kode sumber adalah membandingkan kode sumber kontrak pintar dan kode bita yang dikompilasi yang digunakan selama pembuatan kontrak untuk mendeteksi adanya perbedaan. Memverifikasi kontrak pintar itu penting karena kode kontrak yang diiklankan mungkin berbeda dari apa yang berjalan di rantai blok.

Verifikasi kontrak pintar memungkinkan penyelidikan tentang apa yang dilakukan oleh sebuah kontrak melalui bahasa tingkat tinggi yang digunakannya, tanpa harus membaca kode mesin. Fungsi, nilai, dan biasanya nama variabel serta komentar tetap sama dengan kode sumber asli yang dikompilasi dan disebarkan. Hal ini membuat membaca kode menjadi jauh lebih mudah. Verifikasi sumber juga menyediakan dokumentasi kode, sehingga pengguna akhir mengetahui apa yang dirancang untuk dilakukan oleh sebuah kontrak pintar.

### Apa itu verifikasi penuh? {#full-verification}

Ada beberapa bagian dari kode sumber yang tidak memengaruhi kode bita yang dikompilasi seperti komentar atau nama variabel. Itu berarti dua kode sumber dengan nama variabel yang berbeda dan komentar yang berbeda keduanya akan dapat memverifikasi kontrak yang sama. Dengan demikian, aktor jahat dapat menambahkan komentar yang menipu atau memberikan nama variabel yang menyesatkan di dalam kode sumber dan membuat kontrak diverifikasi dengan kode sumber yang berbeda dari kode sumber aslinya.

Hal ini dapat dihindari dengan menambahkan data ekstra ke kode bita untuk berfungsi sebagai _jaminan kriptografi_ atas ketepatan kode sumber, dan sebagai _sidik jari_ dari informasi kompilasi. Informasi yang diperlukan ditemukan dalam [metadata kontrak Solidity](https://docs.soliditylang.org/en/v0.8.15/metadata.html), dan hash dari file ini ditambahkan ke kode bita dari sebuah kontrak. Anda dapat melihatnya beraksi di [taman bermain metadata](https://playground.sourcify.dev)

File metadata berisi informasi tentang kompilasi kontrak termasuk file sumber dan hash-nya. Artinya, jika salah satu pengaturan kompilasi atau bahkan satu bita di salah satu file sumber berubah, file metadata akan berubah. Akibatnya, hash dari file metadata, yang ditambahkan ke kode bita, juga berubah. Itu berarti jika kode bita kontrak + hash metadata yang ditambahkan cocok dengan kode sumber dan pengaturan kompilasi yang diberikan, kita dapat yakin bahwa ini adalah kode sumber yang sama persis yang digunakan dalam kompilasi asli, tidak ada satu bita pun yang berbeda.

Jenis verifikasi yang memanfaatkan hash metadata ini disebut sebagai **"[verifikasi penuh](https://docs.sourcify.dev/docs/full-vs-partial-match/)"** (juga "verifikasi sempurna"). Jika hash metadata tidak cocok atau tidak dipertimbangkan dalam verifikasi, itu akan menjadi "kecocokan parsial", yang saat ini merupakan cara yang lebih umum untuk memverifikasi kontrak. Sangat mungkin untuk [menyisipkan kode berbahaya](https://samczsun.com/hiding-in-plain-sight/) yang tidak akan tercermin dalam kode sumber yang diverifikasi tanpa verifikasi penuh. Sebagian besar pengembang tidak menyadari verifikasi penuh dan tidak menyimpan file metadata dari kompilasi mereka, sehingga verifikasi parsial telah menjadi metode de facto untuk memverifikasi kontrak sejauh ini.

## Mengapa verifikasi kode sumber penting? {#importance-of-source-code-verification}

### Sifat tanpa kepercayaan {#trustlessness}

Sifat tanpa kepercayaan bisa dibilang merupakan premis terbesar untuk kontrak pintar dan [aplikasi terdesentralisasi (dapp)](/developers/docs/dapps/). Kontrak pintar bersifat "tidak dapat diubah" dan tidak dapat dimodifikasi; sebuah kontrak hanya akan mengeksekusi logika bisnis yang didefinisikan dalam kode pada saat penyebaran. Ini berarti pengembang dan perusahaan tidak dapat merusak kode kontrak setelah menyebarkannya di Ethereum.

Agar sebuah kontrak pintar bersifat tanpa kepercayaan, kode kontrak harus tersedia untuk verifikasi independen. Meskipun kode bita yang dikompilasi untuk setiap kontrak pintar tersedia untuk umum di rantai blok, bahasa tingkat rendah sulit dipahami—baik oleh pengembang maupun pengguna.

Proyek mengurangi asumsi kepercayaan dengan mempublikasikan kode sumber dari kontrak mereka. Namun hal ini menimbulkan masalah lain: sulit untuk memverifikasi bahwa kode sumber yang dipublikasikan cocok dengan kode bita kontrak. Dalam skenario ini, nilai sifat tanpa kepercayaan hilang karena pengguna harus mempercayai pengembang untuk tidak mengubah logika bisnis kontrak (yaitu, dengan mengubah kode bita) sebelum menyebarkannya di rantai blok.

Alat verifikasi kode sumber memberikan jaminan bahwa file kode sumber kontrak pintar cocok dengan kode rakitan. Hasilnya adalah ekosistem tanpa kepercayaan, di mana pengguna tidak secara membabi buta mempercayai pihak ketiga dan sebaliknya memverifikasi kode sebelum menyetorkan dana ke dalam sebuah kontrak.

### Keamanan Pengguna {#user-safety}

Dengan kontrak pintar, biasanya ada banyak uang yang dipertaruhkan. Hal ini menuntut jaminan keamanan yang lebih tinggi dan verifikasi logika kontrak pintar sebelum menggunakannya. Masalahnya adalah pengembang yang tidak bermoral dapat menipu pengguna dengan menyisipkan kode berbahaya dalam sebuah kontrak pintar. Tanpa verifikasi, kontrak pintar yang berbahaya dapat memiliki [pintu belakang (backdoor)](https://www.trustnodes.com/2018/11/10/concerns-rise-over-backdoored-smart-contracts), mekanisme kontrol akses yang kontroversial, kerentanan yang dapat dieksploitasi, dan hal-hal lain yang membahayakan keamanan pengguna yang tidak akan terdeteksi.

Mempublikasikan file kode sumber kontrak pintar memudahkan mereka yang tertarik, seperti auditor, untuk menilai kontrak terhadap potensi vektor serangan. Dengan berbagai pihak yang secara independen memverifikasi sebuah kontrak pintar, pengguna memiliki jaminan yang lebih kuat atas keamanannya.

## Cara memverifikasi kode sumber untuk kontrak pintar Ethereum {#source-code-verification-for-ethereum-smart-contracts}

[Menyebarkan kontrak pintar di Ethereum](/developers/docs/smart-contracts/deploying/) memerlukan pengiriman transaksi dengan muatan data (kode bita yang dikompilasi) ke alamat khusus. Muatan data dihasilkan dengan mengkompilasi kode sumber, ditambah [argumen konstruktor](https://docs.soliditylang.org/en/v0.8.14/contracts.html#constructor) dari instans kontrak yang ditambahkan ke muatan data dalam transaksi. Kompilasi bersifat deterministik, yang berarti selalu menghasilkan keluaran yang sama (yaitu, kode bita kontrak) jika file sumber yang sama, dan pengaturan kompilasi (misalnya, versi kompiler, pengoptimal) digunakan.

![A diagram showing showing smart contract source code verification](./source-code-verification.png)

Memverifikasi kontrak pintar pada dasarnya melibatkan langkah-langkah berikut:

1. Masukkan file sumber dan pengaturan kompilasi ke kompiler.

2. Kompiler mengeluarkan kode bita dari kontrak

3. Dapatkan kode bita dari kontrak yang disebarkan pada alamat yang diberikan

4. Bandingkan kode bita yang disebarkan dengan kode bita yang dikompilasi ulang. Jika kodenya cocok, kontrak akan diverifikasi dengan kode sumber dan pengaturan kompilasi yang diberikan.

5. Selain itu, jika hash metadata di akhir kode bita cocok, itu akan menjadi kecocokan penuh.

Perhatikan bahwa ini adalah deskripsi verifikasi yang disederhanakan dan ada banyak pengecualian yang tidak akan berfungsi dengan ini seperti memiliki [variabel yang tidak dapat diubah](https://docs.sourcify.dev/docs/immutables/).

## Alat verifikasi kode sumber {#source-code-verification-tools}

Proses tradisional untuk memverifikasi kontrak bisa jadi rumit. Inilah sebabnya kami memiliki alat untuk memverifikasi kode sumber untuk kontrak pintar yang disebarkan di Ethereum. Alat-alat ini mengotomatiskan sebagian besar verifikasi kode sumber dan juga mengkurasi kontrak yang diverifikasi untuk kepentingan pengguna.

### Etherscan {#etherscan}

Meskipun sebagian besar dikenal sebagai [penjelajah rantai blok Ethereum](/developers/docs/data-and-analytics/block-explorers/), Etherscan juga menawarkan [layanan verifikasi kode sumber](https://etherscan.io/verifyContract) untuk pengembang dan pengguna kontrak pintar.

Etherscan memungkinkan Anda untuk mengkompilasi ulang kode bita kontrak dari muatan data asli (kode sumber, alamat Pustaka, pengaturan kompiler, alamat kontrak, dll.) Jika kode bita yang dikompilasi ulang dikaitkan dengan kode bita (dan parameter konstruktor) dari kontrak onchain, maka [kontrak tersebut diverifikasi](https://info.etherscan.com/types-of-contract-verification/).

Setelah diverifikasi, kode sumber kontrak Anda menerima label "Verified" dan dipublikasikan di Etherscan agar orang lain dapat mengauditnya. Kontrak tersebut juga ditambahkan ke bagian [Verified Contracts](https://etherscan.io/contractsVerified/)—sebuah repositori kontrak pintar dengan kode sumber yang telah diverifikasi.

Etherscan adalah alat yang paling banyak digunakan untuk memverifikasi kontrak. Namun, verifikasi kontrak Etherscan memiliki kelemahan: ia gagal membandingkan **hash metadata** dari kode bita onchain dan kode bita yang dikompilasi ulang. Oleh karena itu, kecocokan di Etherscan adalah kecocokan parsial.

[Lebih lanjut tentang memverifikasi kontrak di Etherscan](https://medium.com/etherscan-blog/verifying-contracts-on-etherscan-f995ab772327).

### Blockscout {#blockscout}

[Blockscout](https://blockscout.com/) adalah penjelajah rantai blok sumber terbuka yang juga menyediakan [layanan verifikasi kontrak](https://eth.blockscout.com/contract-verification) untuk pengembang dan pengguna kontrak pintar. Sebagai alternatif sumber terbuka, Blockscout menawarkan transparansi dalam cara verifikasi dilakukan dan memungkinkan kontribusi komunitas untuk meningkatkan proses verifikasi.

Mirip dengan layanan verifikasi lainnya, Blockscout memungkinkan Anda untuk memverifikasi kode sumber kontrak Anda dengan mengkompilasi ulang kode bita dan membandingkannya dengan kontrak yang disebarkan. Setelah diverifikasi, kontrak Anda menerima status verifikasi dan kode sumber menjadi tersedia untuk umum untuk audit dan interaksi. Kontrak yang diverifikasi juga terdaftar di [repositori kontrak terverifikasi](https://eth.blockscout.com/verified-contracts) Blockscout untuk penjelajahan dan penemuan yang mudah.

### Sourcify {#sourcify}

[Sourcify](https://sourcify.dev/#/verifier) adalah alat lain untuk memverifikasi kontrak yang bersumber terbuka dan terdesentralisasi. Ini bukan penjelajah blok dan hanya memverifikasi kontrak di [berbagai jaringan berbasis EVM](https://docs.sourcify.dev/docs/chains). Alat ini bertindak sebagai infrastruktur publik untuk alat lain yang dibangun di atasnya, dan bertujuan untuk memungkinkan interaksi kontrak yang lebih ramah manusia menggunakan [ABI](/developers/docs/smart-contracts/compiling/#web-applications) dan komentar [NatSpec](https://docs.soliditylang.org/en/v0.8.15/natspec-format.html) yang ditemukan dalam file metadata.

Tidak seperti Etherscan, Sourcify mendukung kecocokan penuh dengan hash metadata. Kontrak yang diverifikasi disajikan di [repositori publiknya](https://docs.sourcify.dev/docs/repository/) melalui HTTP dan [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/#what-is-ipfs), yang merupakan penyimpanan terdesentralisasi dan [beralamat konten](https://docs.storacha.network/concepts/content-addressing/). Hal ini memungkinkan pengambilan file metadata dari sebuah kontrak melalui IPFS karena hash metadata yang ditambahkan adalah hash IPFS.

Selain itu, seseorang juga dapat mengambil file kode sumber melalui IPFS, karena hash IPFS dari file-file ini juga ditemukan dalam metadata. Sebuah kontrak dapat diverifikasi dengan menyediakan file metadata dan file sumber melalui API-nya atau [UI](https://sourcify.dev/#/verifier), atau menggunakan plugin. Alat pemantauan Sourcify juga mendengarkan pembuatan kontrak pada blok baru dan mencoba memverifikasi kontrak jika metadata dan file sumbernya dipublikasikan di IPFS.

[Lebih lanjut tentang memverifikasi kontrak di Sourcify](https://soliditylang.org/blog/2020/06/25/sourcify-faq/).

### Tenderly {#tenderly}

[Platform Tenderly](https://tenderly.co/) memungkinkan pengembang Web3 untuk membangun, menguji, memantau, dan mengoperasikan kontrak pintar. Menggabungkan alat debugging dengan observabilitas dan blok bangunan infrastruktur, Tenderly membantu pengembang mempercepat pengembangan kontrak pintar. Untuk sepenuhnya mengaktifkan fitur Tenderly, pengembang perlu [melakukan verifikasi kode sumber](https://docs.tenderly.co/monitoring/contract-verification) menggunakan beberapa metode.

Sangat mungkin untuk memverifikasi kontrak secara pribadi atau publik. Jika diverifikasi secara pribadi, kontrak pintar hanya terlihat oleh Anda (dan anggota lain dalam proyek Anda). Memverifikasi kontrak secara publik membuatnya terlihat oleh semua orang yang menggunakan platform Tenderly.

Anda dapat memverifikasi kontrak Anda menggunakan [Dasbor](https://docs.tenderly.co/contract-verification), [plugin Tenderly Hardhat](https://docs.tenderly.co/contract-verification/hardhat), atau [CLI](https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-contracts-using-cli).

Saat memverifikasi kontrak melalui Dasbor, Anda perlu mengimpor file sumber atau file metadata yang dihasilkan oleh kompiler Solidity, alamat/jaringan, dan pengaturan kompiler.

Menggunakan plugin Tenderly Hardhat memungkinkan kontrol lebih besar atas proses verifikasi dengan lebih sedikit usaha, memungkinkan Anda untuk memilih antara verifikasi otomatis (tanpa kode) dan manual (berbasis kode).

## Bacaan lebih lanjut {#further-reading}

- [Memverifikasi kode sumber kontrak](https://programtheblockchain.com/posts/2018/01/16/verifying-contract-source-code/)