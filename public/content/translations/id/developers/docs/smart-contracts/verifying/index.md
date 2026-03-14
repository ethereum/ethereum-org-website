---
title: Meverifikasi Kontrak Pintar
description: Ikhtisar verifikasi kode sumber untuk kontrak pintar Ethereum
lang: id
---

[Kontrak pintar](/developers/docs/smart-contracts/) dirancang agar “tanpa kepercayaan”, artinya pengguna tidak perlu memercayai pihak ketiga (misalnya, pengembang dan perusahaan) sebelum berinteraksi dengan kontrak. Sebagai syarat untuk dapat dipercaya, pengguna dan pengembang lain harus dapat meverifikasi kode sumber kontrak pintar. Verifikasi kode sumber meyakinkan pengguna dan pengembang bahwa kode kontrak yang dipublikasikan adalah kode yang sama yang berjalan di alamat kontrak pada rantaiblok Ethereum.

Penting untuk membedakan antara "verifikasi kode sumber" dan "[verifikasi formal](/developers/docs/smart-contracts/formal-verification/)". Verifikasi kode sumber, yang akan dijelaskan secara rinci di bawah ini, mengacu pada verifikasi bahwa kode sumber yang diberikan dari suatu kontrak pintar dalam bahasa tingkat tinggi (misalnya, Solidity) terkompilasi ke kode bita yang sama yang akan dieksekusi di alamat kontrak. Akan tetapi, verifikasi normal menjelaskan tentang verifikasi kebenaran dari kontrak pintar, yang berarti kontrak berperilaku seperti semestinya. Meskipun bergabung pada konteks, verifikasi kontrak biasanya mengacu pada verifikasi kode sumber.

## Apa yang dimaksud dengan verifikasi kode sumber? {#what-is-source-code-verification}

Sebelum menyebarkan kontrak pintar di [Mesin Virtual Ethereum (EVM)](/developers/docs/evm/), para pengembang [mengompilasi](/developers/docs/smart-contracts/compiling/) kode sumber kontrak—instruksi [yang ditulis dalam Solidity](/developers/docs/smart-contracts/languages/) atau bahasa pemrograman tingkat tinggi lainnya—menjadi kode bita. Karena EVM tidak dapat menginterpretasikan instruksi tingkat tinggi, maka kompilasi kode sumber menjadi bytecode (yaitu instruksi mesin tingkat rendah) diperlukan untuk mengeksekusi logika kontrak dalam EVM.

Verifikasi kode sumber adalah membandingkan kode sumber kontrak pintar dan campuran bytecode yang digunakan selama pembuatan kontrak untuk mendeteksi perbedaan. Memverifikasi kontrak pintar sangat penting karena kode kontrak yang di iklankan mungkin berbeda dengan kode kontrak yang ada di blockchain.

Verifikasi kontrak pintar memungkinkan untuk menyelidiki apa yang dilakukan oleh sebuah kontrak melalui bahasa tingkat tinggi yang di tulisnya, tanpa harus mengerti kode mesin. Fungsi, nilai, dan biasanya nama variabel serta komentar tetap sama dengan kode sumber asli yang di kompilasi dan di gunakan. Hal ini membuat pembacaan kode menjadi lebih mudah. Verifikasi sumber juga menyediakan dokumentasi kode, sehingga pengguna akhir mengetahui untuk apa kontrak pintar diciptakan.

### Apa itu verifikasi penuh? {#full-verification}

Ada beberapa bagian dari kode sumber yang tidak mempengaruhi bytecode yang digabungkan seperti komentar atau nama variabel. Ini berarti dua kode sumber dengan nama variabel yang berbeda dan komentar yang berbeda dapat verifikasi kontrak yang sama. Dengan itu, aktor jahat dapat menambahkan komentar yang menipu atau memberi nama variabel yang menyesatkan di dalam kode sumber dan mendapat kontrak yang diverifikasi dengan kode sumber yang berbeda dari kode sumber aslinya.

Hal ini dapat dihindari dengan menambahkan data ekstra ke kode bita untuk berfungsi sebagai _jaminan kriptografi_ atas ketepatan kode sumber, dan sebagai _sidik jari_ informasi kompilasi. Informasi yang diperlukan dapat ditemukan dalam [metadata kontrak Solidity](https://docs.soliditylang.org/en/v0.8.15/metadata.html), dan hash dari file ini ditambahkan ke kode bita kontrak. Anda dapat melihatnya beraksi di [metadata playground](https://playground.sourcify.dev)

File metadata berisi informasi tentang kompilasi kontrak termasuk file sumber dan hash. Artinya, jika salah satu pengaturan kompilasi atau bahkan sebuah bite di salah satu file sumber berubah, maka file metadata akan berubah. Akibatnya, hash file metadata, yang ditambahkan ke kodebite, juga berubah. Ini berarti jika bytecode kontrak + hash metadata yang ditambahkan sesuai dengan kode sumber dan pengaturan kompilasi yang diberikan, kita dapat memastikan bahwa ini adalah kode sumber yang sama persis dengan yang digunakan pada kompilasi asli, bahkan tidak ada satu byte pun yang berbeda.

Jenis verifikasi yang memanfaatkan hash metadata ini disebut sebagai **"[verifikasi penuh](https://docs.sourcify.dev/docs/full-vs-partial-match/)"** (juga "verifikasi sempurna"). Jika hash metadata tidak cocok atau tidak dipertimbangkan dalam verifikasi, maka akan menjadi "kecocokan parsial", yang saat ini merupakan cara yang lebih umum untuk memverifikasi kontrak. Ada kemungkinan untuk [memasukkan kode berbahaya](https://samczsun.com/hiding-in-plain-sight/) yang tidak akan tercermin dalam kode sumber yang diverifikasi tanpa verifikasi penuh. Sebagian besar pengembang tidak mengetahui verifikasi penuh dan tidak menyimpan file metadata kompilasi mereka, oleh karena itu verifikasi parsial telah menjadi metode de facto untuk memverifikasi kontrak sejauh ini.

## Mengapa verifikasi kode sumber penting? {#importance-of-source-code-verification}

### Tanpa Kepercayaan {#trustlessness}

Tanpa kepercayaan bisa dibilang merupakan premis terbesar untuk kontrak pintar dan [aplikasi terdesentralisasi (dapps)](/developers/docs/dapps/). Kontrak pintar bersifat "tidak dapat diubah" dan tidak dapat diubah; kontrak hanya akan menjalankan logika bisnis yang didefinisikan dalam kode pada saat penerapan. Ini berarti pengembang dan perusahaan tidak dapat mengubah kode kontrak setelah menerapkannya di Ethereum.

Agar kontrak pintar tidak dapat dipercaya, kode kontrak harus tersedia untuk verifikasi independen. Walaupun bytecode yang dikompilasi untuk setiap kontrak pintar tersedia untuk umum di blockchain, bahasa tingkat rendah sulit untuk dimengerti - baik untuk pengembang maupun pengguna.

Proyek mengurangi asumsi kepercayaan dengan menerbitkan kode sumber kontraknya. Tetapi ini menimbulkan masalah lain: sulit untuk memverifikasi bahwa kode sumber yang diterbitkan cocok dengan bytecode kontrak. Dalam skenario ini, nilai ketidakpercayaan hilang karena pengguna harus memercayai pengembang untuk tidak mengubah logika bisnis kontrak (misalnya, dengan mengubah bytecode) sebelum menerapkannya pada blockchain.

Alat verifikasi kode sumber memberikan jaminan bahwa file kode sumber kontrak pintar cocok dengan kode rakitan. Hasilnya adalah ekosistem tanpa kepercayaan, di mana pengguna tidak memercayai pihak ketiga secara membabi buta dan sebaliknya memverifikasi kode sebelum menyetorkan dana ke dalam kontrak.

### Keamanan Pengguna {#user-safety}

Dengan kontrak pintar, biasanya ada banyak uang yang dipertaruhkan. Hal ini memerlukan jaminan keamanan yang lebih tinggi dan verifikasi logika kontrak pintar sebelum menggunakannya. Masalahnya adalah pengembang yang tidak bermoral dapat menipu pengguna dengan memasukkan kode berbahaya dalam kontrak pintar. Tanpa verifikasi, kontrak pintar yang berbahaya dapat memiliki [pintu belakang](https://www.trustnodes.com/2018/11/10/concerns-rise-over-backdoored-smart-contracts), mekanisme kontrol akses yang kontroversial, kerentanan yang dapat dieksploitasi, dan hal-hal lain yang membahayakan keamanan pengguna yang tidak akan terdeteksi.

Menerbitkan file kode sumber kontrak pintar akan memudahkan mereka yang berkepentingan, seperti auditor, untuk menilai kontrak terhadap vektor serangan potensial. Dengan banyak pihak yang memverifikasi kontrak pintar secara independen, pengguna memiliki jaminan keamanan yang lebih kuat.

## Cara memverifikasi kode sumber untuk kontrak pintar Ethereum {#source-code-verification-for-ethereum-smart-contracts}

[Menyebarkan kontrak pintar di Ethereum](/developers/docs/smart-contracts/deploying/) memerlukan pengiriman transaksi dengan muatan data (kode bita yang dikompilasi) ke alamat khusus. Muatan data dihasilkan dengan mengompilasi kode sumber, ditambah [argumen konstruktor](https://docs.soliditylang.org/en/v0.8.14/contracts.html#constructor) dari instansi kontrak yang ditambahkan ke muatan data dalam transaksi. Kompilasi bersifat deterministik, artinya ia selalu menghasilkan keluaran yang sama (yaitu, kode bita kontrak) jika file sumber yang sama dan pengaturan kompilasi (misalnya, versi kompilator, pengoptimal) digunakan.

![Diagram yang menunjukkan verifikasi kode sumber kontrak pintar](./source-code-verification.png)

Memverifikasi kontrak pintar pada dasarnya melibatkan langkah-langkah berikut:

1. Masukkan berkas sumber dan pengaturan kompilasi ke dalam kompiler.

2. Kompiler mengeluarkan bytecode dari kontrak

3. Dapatkan bytecode dari kontrak yang diterapkan di alamat yang diberikan

4. Bandingkan bytecode yang disebarkan dengan bytecode yang dikompilasi ulang. Jika kodenya cocok, kontrak diverifikasi dengan kode sumber dan pengaturan kompilasi yang diberikan.

5. Selain itu, jika hash metadata pada akhir bytecode cocok, maka kecocokannya akan penuh.

Perhatikan bahwa ini adalah deskripsi verifikasi yang sederhana dan ada banyak pengecualian yang tidak akan berfungsi dengan ini seperti memiliki [variabel yang tidak dapat diubah](https://docs.sourcify.dev/docs/immutables/).

## Perangkat verifikasi kode sumber {#source-code-verification-tools}

Proses tradisional untuk memverifikasi kontrak bisa jadi rumit. Inilah sebabnya kami memiliki alat untuk memverifikasi kode sumber untuk kontrak pintar yang diterapkan di Ethereum. Alat-alat ini mengotomatiskan sebagian besar verifikasi kode sumber dan juga menyusun kontrak-kontrak terverifikasi demi keuntungan pengguna.

### Etherscan {#etherscan}

Meskipun lebih dikenal sebagai [penjelajah blockchain Ethereum](/developers/docs/data-and-analytics/block-explorers/), Etherscan juga menawarkan [layanan verifikasi kode sumber](https://etherscan.io/verifyContract) untuk pengembang dan pengguna kontrak pintar.

Etherscan memungkinkan Anda mengkompilasi ulang bytecode kontrak dari muatan data asli (kode sumber, alamat pustaka, pengaturan kompiler, alamat kontrak, dll.) Jika kode bita yang dikompilasi ulang dikaitkan dengan kode bita (dan parameter konstruktor) dari kontrak di dalam rantai, maka [kontrak tersebut diverifikasi](https://info.etherscan.com/types-of-contract-verification/).

Setelah diverifikasi, kode sumber kontrak Anda menerima label "Terverifikasi" dan dipublikasikan di Etherscan agar dapat diaudit oleh orang lain. Ini juga ditambahkan ke bagian [Kontrak Terverifikasi](https://etherscan.io/contractsVerified/)—sebuah repositori kontrak pintar dengan kode sumber terverifikasi.

Etherscan adalah alat yang paling banyak digunakan untuk memverifikasi kontrak. Namun, verifikasi kontrak Etherscan memiliki kekurangan: ia gagal membandingkan **hash metadata** dari kode bita di dalam rantai dan kode bita yang dikompilasi ulang. Oleh karena itu kecocokan di Etherscan merupakan kecocokan parsialOleh karena itu kecocokan di Etherscan merupakan kecocokan

[Selengkapnya tentang memverifikasi kontrak di Etherscan](https://medium.com/etherscan-blog/verifying-contracts-on-etherscan-f995ab772327).

### Blockscout {#blockscout}

[Blockscout](https://blockscout.com/) adalah penjelajah blockchain sumber terbuka yang juga menyediakan [layanan verifikasi kontrak](https://eth.blockscout.com/contract-verification) untuk pengembang dan pengguna kontrak pintar. Sebagai alternatif sumber terbuka, Blockscout menawarkan transparansi dalam cara verifikasi dilakukan dan memungkinkan kontribusi komunitas untuk meningkatkan proses verifikasi.

Mirip dengan layanan verifikasi lainnya, Blockscout memungkinkan Anda untuk memverifikasi kode sumber kontrak Anda dengan cara mengompilasi ulang bytecode dan membandingkannya dengan kontrak yang telah dideploy. Setelah diverifikasi, kontrak Anda akan mendapatkan status verifikasi dan kode sumbernya akan tersedia secara publik untuk audit dan interaksi. Kontrak yang sudah diverifikasi juga akan tercantum dalam [repositori kontrak terverifikasi](https://eth.blockscout.com/verified-contracts) Blockscout untuk memudahkan penelusuran dan penemuan.

### Sourcify {#sourcify}

[Sourcify](https://sourcify.dev/#/verifier) adalah perangkat lain untuk memverifikasi kontrak yang bersumber terbuka dan terdesentralisasi. Ini bukan penjelajah blok dan hanya memverifikasi kontrak di [jaringan berbasis EVM yang berbeda](https://docs.sourcify.dev/docs/chains). Ini berfungsi sebagai infrastruktur publik bagi perangkat lain untuk dibangun di atasnya, dan bertujuan memungkinkan interaksi kontrak yang lebih ramah pengguna dengan menggunakan [ABI](/developers/docs/smart-contracts/compiling/#web-applications) dan komentar [NatSpec](https://docs.soliditylang.org/en/v0.8.15/natspec-format.html) yang ditemukan dalam file metadata.

Tidak seperti Etherscan, Sourcify mendukung pencocokan penuh dengan hash metadata. Kontrak yang terverifikasi disajikan di [repositori publiknya](https://docs.sourcify.dev/docs/repository/) di HTTP dan [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/#what-is-ipfs), yang merupakan penyimpanan terdesentralisasi, [beralamat konten](https://docs.storacha.network/concepts/content-addressing/). Hal ini memungkinkan pengambilan file metadata kontrak melalui IPFS karena hash metadata yang ditambahkan adalah hash IPFS.

Selain itu, Anda juga dapat mengambil file kode sumber melalui IPFS, karena hash IPFS dari file-file ini juga ditemukan dalam metadata. Sebuah kontrak dapat diverifikasi dengan menyediakan file metadata dan file sumber melalui API atau [UI](https://sourcify.dev/#/verifier)-nya, atau menggunakan plugin. Alat pemantauan Sourcify juga memantau pembuatan kontrak pada blok baru dan mencoba memverifikasi kontrak tersebut jika metadata dan file sumbernya dipublikasikan di IPFS.

[Selengkapnya tentang memverifikasi kontrak di Sourcify](https://soliditylang.org/blog/2020/06/25/sourcify-faq/).

### Tenderly {#tenderly}

[Platform Tenderly](https://tenderly.co/) memungkinkan pengembang Web3 untuk membangun, menguji, memantau, dan mengoperasikan kontrak pintar. Dengan menggabungkan alat debugging, observability, dan komponen infrastruktur, Tenderly membantu pengembang mempercepat pengembangan smart contract. Untuk mengaktifkan semua fitur Tenderly, pengembang perlu [melakukan verifikasi kode sumber](https://docs.tenderly.co/monitoring/contract-verification) menggunakan beberapa metode.

Anda dapat memverifikasi kontrak secara pribadi atau publik. Jika diverifikasi secara pribadi, kontrak pintar hanya dapat dilihat oleh Anda (dan anggota lain dalam proyek Anda). Memverifikasi kontrak secara publik membuatnya dapat dilihat oleh semua orang yang menggunakan platform Tenderly.

Anda dapat memverifikasi kontrak Anda menggunakan [Dasbor](https://docs.tenderly.co/contract-verification), [plugin Tenderly Hardhat](https://docs.tenderly.co/contract-verification/hardhat), atau [CLI](https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-contracts-using-cli).

Saat memverifikasi kontrak melalui Dashboard, Anda perlu mengimpor file sumber atau file metadata yang dihasilkan oleh Solidity compiler, alamat/jaringan, serta pengaturan compiler.

Menggunakan plugin Tenderly untuk Hardhat memungkinkan kontrol lebih besar atas proses verifikasi dengan usaha yang lebih sedikit, sehingga Anda bisa memilih antara verifikasi otomatis (tanpa kode) atau verifikasi manual (berbasis kode).

## Bacaan lebih lanjut {#further-reading}

- [Memverifikasi kode sumber kontrak](https://programtheblockchain.com/posts/2018/01/16/verifying-contract-source-code/)
