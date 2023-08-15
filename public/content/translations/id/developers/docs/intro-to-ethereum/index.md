---
title: Pengantar Ethereum
description: Pengantar pengembang dapp tentang konsep inti Ethereum.
lang: id
---

## Apa itu blockchain? {#what-is-a-blockchain}

Blockchain adalah basis data publik yang diperbarui dan dibagikan di banyak komputer dalam jaringan.

"Blok" merujuk pada data dan state yang disimpan dalam kelompok atau "blok" yang berurutan. Jika Anda mengirim ETH ke seseorang, data transaksi perlu ditambahkan ke blok agar prosesnya berhasil.

"Rantai" merujuk pada fakta bahwa setiap blok secara kriptografis mereferensikan induknya. Dengan kata lain, blok dirantai bersama. Data dalam satu blok tidak bisa diubah tanpa mengubah seluruh blok berikutnya, yang akan membutuhkan konsensus dari keseluruhan jaringan.

Setiap komputer dalam jaringan harus sepakat tentang setiap blok baru dan rantainya secara keseluruhan. Komputer-komputer ini dikenal sebagai "node". Node memastikan semua orang yang berinteraksi dengan blockchain memiliki data yang sama. Untuk mencapai kesepakatan bersama ini, blockchain memerlukan mekanisme konsensus.

Ethereum saat ini menggunakan mekanisme konsensus [bukti kerja](/developers/docs/consensus-mechanisms/pow/). Ini berarti siapa pun yang ingin menambahkan blok baru ke dalam rantai harus menyelesaikan teka-teki sulit yang memerlukan banyak tenaga komputasi. Memecahkan teka-teki "membuktikan" bahwa Anda telah melakukan "pekerjaan" dengan menggunakan sumber daya komputasi. Melakukan ini disebut sebagai [menambang](/developers/docs/consensus-mechanisms/pow/mining/). Menambang umumnya adalah metode percobaan yang mengandalkan kemampuan fisik, tapi berhasil menambahkan blok diberi imbalan dalam ETH.

Blok baru disiarkan ke node di jaringan, diperiksa dan diverifikasi, memperbarui state blockchain untuk semua orang.

Jadi untuk meringkasnya, ketika Anda mengirim ETH ke seseorang, transaksi harus ditambang dan dimasukkan ke dalam blok baru. State yang telah diperbarui kemudian dibagikan dengan seluruh jaringan.

Tonton Austin yang memandu Anda tentang blokchain:

<YouTube id="zcX7OJ-L8XQ" />

Jika Anda ingin melihat cara blockchain membuat hash dari data dan kemudian blok sebelumnya merujuk pada semua blok di belakangnya, pastikan melihat [demo ini](https://andersbrownworth.com/blockchain/blockchain) yang dibuat oleh Anders Brownworth dan tonton video panduannya di bawah.

Tonton Anders menjelaskan hash dalam blockchain:

<YouTube id="_160oMzblY8" />

## Apa itu Ethereum? {#what-is-ethereum}

Dalam semesta Ethereum, ada satu komputer kanonis, tunggal (disebut Mesin Virtual Ethereum, atau EVM) yang statenya disetujui semua orang dalam jaringan Ethereum. Setiap orang yang berpartisipasi dalam jaringan Ethereum (setiap node Ethereum) menyimpan salinan status komputer ini. Sebagai tambahan, peserta mana pun bisa menyiarkan permintaan agar komputer ini melakukan komputasi arbitrari. Setiap kali permintaan ini disiarkan, peserta lain dalam jaringan memverfikasi, memvalidasi, dan melakukan ("mengeksekusi") proses komputasinya. Eksekusi ini menyebabkan perubahan state pada EVM, yang dikomitmenkan dan disebar ke seluruh jaringan.

Permintaan untuk komputasi disebut permintaan transaksi; catatan semua transaksi maupun state EVM saat ini disimpan dalam blockchain, yang kemudian disimpan dan disetujui oleh semua node.

Mekanisme kriptografi memastikan bahwa setelah transaksi diverifikasi sebagai transaksi valid dan ditambahkan ke blockchain, transaksi ini tidak dapat diubah lagi nanti. Mekanisme yang sama ini juga memastikan bahwa semua transaksi ditandatangani dan dieksekusi dengan "izin" yang sesuai (tidak ada seorang pun yang dapat mengirim aset digital dari akun Alice, kecuali Alice sendiri).

## Apa itu ether? {#what-is-ether}

**Ether (ETH)** adalah mata uang kripto asli Ethereum. Tujuan dari ether adalah memungkinkan keberadaan pasar untuk komputasi. Pasar seperti ini menyediakan insentif ekonomi bagi para peserta untuk memverifikasi dan menjalankan permintaan transaksi dan menyediakan sumber daya komputasional ke jaringan.

Peserta mana pun yang menyiarkan permintaan transaksi juga harus menawarkan sejumlah ether ke jaringan sebagai hadiah bounty. Hadiah bounty ini akan diberikan kepada siapa pun yang pada akhirnya melakukan pekerjaan memverifikasi transaksi, mengeksekusinya, memasukkannya ke blockchain, dan menyiarkannya ke jaringan.

Jumlah ether yang dibayarkan sesuai dengan waktu yang diperlukan untuk melakukan komputasi. Bounty/hadiah ini juga mencegah para peserta jahat secara sengaja menghambat jaringan dengan meminta eksekusi komputasi tak terbatas atau skrip lain yang memerlukan sumber daya besar, karena para peserta ini harus membayar untuk waktu komputasi.

## Apa itu kontrak pintar? {#what-are-smart-contracts}

Dalam praktiknya, peserta tidak menulis kode baru setiap kali mereka ingin meminta komputasi pada EVM. Sebaliknya, developer aplikasi mengunggah program (cuplikan kode yang dapat digunakan kembali) ke state EVM, dan pengguna membuat permintaan untuk mengeksekusi cuplikan kode ini dengan berbagai parameter. Kami menyebut program yang diunggah dan dijalankan oleh kontrak pintar jaringan.

Pada tingkat sangat dasar, Anda bisa menganggap sebuah kontrak pintar seperti mesin penjual otomatis: satu skrip yang, ketika dipanggil dengan parameter tertentu, menjalankan beberapa aksi atau komputasi jika kondisi tertentu terpenuhi. Contohnya, kontrak pintar vendor sederhana bisa membuat dan menentukan kepemilikan aset digital jika pemanggil mengirim ether ke penerima tertentu.

Pengembang mana pun bisa membuat kontrak pintar dan membuatnya terbuka untuk publik di jaringan, menggunakan rantai blok sebagai lapisan datanya, dengan biaya yang dibayarkan ke jaringan. Pengguna manapun bisa kemudian memanggil kontrak pintar untuk menjalankan kodenya, sekali lagi dengan biaya yang dibayarkan ke jaringan.

Oleh karena itu, dengan kontrak pintar, pengembang dapat menyusun dan menyebarkan aplikasi dan layanan sisi pengguna kompleks secara arbitrari, seperti pasar, instrumen keuangan, game, dll.

## Terminologi {#terminology}

### Blockchain {#blockchain}

Urutan dari semua blok yang telah diselesaikan pada jaringan Ethereum dalam riwayat jaringan. Dinamakan demikian karena tiap blok berisi satu referensi ke blok sebelumnya, yang membantu kami mempertahankan pengurutan semua blok (dan oleh karena itu riwayat yang tepat).

### ETH {#eth}

Mata uang kripto asli Ethereum. Pengguna membayar ether ke pengguna lain untuk membuat permintaan eksekusi kode mereka dilaksanakan.

[Selengkapnya tentang ETH](/developers/docs/intro-to-ether/)

### EVM {#evm}

Mesin Virtual Ethereum adalah komputer virtual global yang statenya oleh setiap peserta di jaringan Ethereum dijadikan tempat penyimpanan dan acuan kesesuaian. Setiap peserta dapat meminta eksekusi kode arbitrer pada EVM; eksekusi kode mengubah status EVM.

[Lebih lanjut tentang EVM](/developers/docs/evm/)

### Node {#nodes}

Mesin nyata yang menyimpan state EVM. Node berkomunikasi dengan satu sama lain untuk menyebarkan informasi tentang state EVM dan perubahan state baru. Setiap pengguna juga dapat meminta eksekusi kode dengan menyiarkan permintaan eksekusi kode dari sebuah node. Jaringan Ethereum sendiri adalah kumpulan semua node Ethereum dan komunikasi mereka.

[Lebih lanjut tentang node](/developers/docs/nodes-and-clients/)

### Akun {#accounts}

Di mana ether disimpan. Pengguna bisa membuka akun, mendepositokan ether ke dalam akun, dan mentransfer ether dari akun mereka ke pengguna lain. Akun dan saldo akun tersimpan dalam tabel besar di dalam EVM; itu adalah bagian dari state EVM secara umum.

[Lebih lanjut tentang akun](/developers/docs/accounts/)

### Transaksi {#transactions}

"Permintaan transaksi" adalah istilah formal untuk permintaan eksekusi kode pada EVM, dan "transaksi" adalah permintaan transaksi yang dipenuhi dan perubahan terkait dalam state EVM. Setiap pengguna dapat menyiarkan permintaan transaksi ke jaringan dari sebuah node. Agar permintaan transaksi benar-benar berdampak pada state EVM yang telah disetujui, transaksi harus divalidasi, dieksekusi, dan "dikomitmenkan pada jaringan" oleh node lain. Eksekusi kode apa pun menyebabkan perubahan state di EVM; atas komitmen, perubahan state ini disiarkan ke semua node dalam jaringan. Beberapa contoh transaksi:

- Kirim X ether dari akun saya ke akun Alice.
- Terbitkan beberapa kode kontrak pintar ke state EVM.
- Jalankan kode kontrak pintar pada alamat X dalam EVM, dengan argumen Y.

[Lebih lanjut tentang transaksi](/developers/docs/transactions/)

### Blok {#blocks}

Volume transaksi sangat tinggi, sehingga transaksi "dikomitkan" dalam batch, atau blok. Blok secara umum berisi lusinan sampai ratusan transaksi.

[Selengkapnya tentang blok](/developers/docs/blocks/)

### Kontrak pintar {#smart-contracts}

Cuplikan kode yang dapat digunakan kembali (program) yang diterbitkan pengembang ke state EVM. Siapa pun bisa meminta kode kontrak pintar dijalankan dengan membuat permintaan transaksi. Karena pengembang bisa menulis aplikasi yang dapat dieksekusi secara arbitrari ke dalam EVM (game, pasar, instrumen keuangan, dll.) dengan menerbitkan kontrak pintar, ini sering juga disebut [dapps, atau Aplikasi Terdesentralisasi](/developers/docs/dapps/).

[Lebih lanjut tentang kontrak pintar](/developers/docs/smart-contracts/)

## Bacaan lebih lanjut {#further-reading}

- [Laporan Resmi Ethereum](/whitepaper/)
- [Omog-omong, bagaimana cara kerja Ethereum?](https://www.preethikasireddy.com/post/how-does-ethereum-work-anyway) - _Preethi Kasireddy_

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Tutorial terkait {#related-tutorials}

- [Panduan developer untuk Ethereum, bagian 1](/developers/tutorials/a-developers-guide-to-ethereum-part-one/) _– Eksplorasi Ethereum yang sangat ramah bagi pengguna menggunakan Python dan web3.py_
