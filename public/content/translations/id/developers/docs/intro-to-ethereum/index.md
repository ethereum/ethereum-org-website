---
title: Pengenalan teknis ke Ethereum
description: Pengantar pengembang dapp tentang konsep inti Ethereum.
lang: id
---

## Apa itu rantai blok? {#what-is-a-blockchain}

Blockchain adalah basis data publik yang diperbarui dan dibagikan di banyak komputer dalam jaringan.

"Blok" merujuk pada data dan state yang disimpan dalam kelompok atau "blok" yang berurutan. Jika Anda mengirim ETH ke seseorang, data transaksi perlu ditambahkan ke blok agar prosesnya berhasil.

"Rantai" merujuk pada fakta bahwa setiap blok secara kriptografis mereferensikan induknya. Dengan kata lain, blok dirantai bersama. Data dalam satu blok tidak bisa diubah tanpa mengubah seluruh blok berikutnya, yang akan membutuhkan konsensus dari keseluruhan jaringan.

Setiap komputer dalam jaringan harus sepakat tentang setiap blok baru dan rantainya secara keseluruhan. Komputer-komputer ini dikenal sebagai "node". Node memastikan semua orang yang berinteraksi dengan blockchain memiliki data yang sama. Untuk mencapai kesepakatan bersama ini, blockchain memerlukan mekanisme konsensus.

Ethereum menggunakan [mekanisme konsensus berbasis bukti taruhan](/developers/docs/consensus-mechanisms/pos/). Siapa pun yang ingin menambahkan blok baru ke dalam rantai harus melakukan penanaman modal ETH - mata uang asli Ethereum - sebagai jaminan dan menjalankan perangkat lunak validator. "Validator" ini kemudian dapat dipilih secara acak untuk mengusulkan blok yang akan diperiksa dan ditambahkan oleh validator lain ke dalam blockchain. Ada sistem penghargaan dan sangsi yang sangat mendorong peserta untuk bersikap jujur dan sebisa mungkin tersedia secara online.

Jika Anda ingin melihat bagaimana data rantai blok di-hash dan kemudian ditambahkan ke riwayat referensi blok, pastikan untuk memeriksa [demo ini](https://andersbrownworth.com/blockchain/blockchain) oleh Anders Brownworth dan tonton video yang menyertainya di bawah ini.

Tonton penjelasan Anders mengenai hash dalam blockchain:

<YouTube id="_160oMzblY8" />

## Apa yang Dimaksud dengan Ethereum? {#what-is-ethereum}

Ethereum adalah sebuah blockchain dengan komputer yang tertanam di dalamnya. Ini adalah fondasi untuk membangun aplikasi dan organisasi dengan cara yang terdesentralisasi, tanpa izin, dan tahan sensor.

Dalam semesta Ethereum, ada sebuah komputer tunggal kanonikal (disebut Ethereum Virtual Machine, or EVM) yang keadaanya disepakati oleh semua orang di jaringan Ethereum. Setiap orang yang berpartisipasi dalam jaringan Ethereum (setiap simpul Ethereum) menyimpan salinan status komputer ini. Selain itu, setiap peserta dapat menyiarkan permintaan agar komputer ini melakukan perhitungan sembarang. Setiap kali permintaan semacam itu disiarkan, peserta lain dalam jaringan memeriksa, menyetujui, dan melaksanakan ("menjalankan") perhitungan tersebut. Eksekusi ini menyebabkan perubahan keadaan pada EVM, yang dipastikan dan disebarkan ke seluruh jaringan.

Permintaan untuk perhitungan disebut sebagai permintaan transaksi; catatan dari semua transaksi dan keadaan saat ini dari EVM disimpan di blockchain, yang kemudian disimpan dan disetujui oleh semua node.

Mekanisme kriptografi memastikan bahwa setelah transaksi diverifikasi sebagai transaksi valid dan ditambahkan ke dalam blockchain, transaksi ini tidak dapat diubah setelahnya. Mekanisme yang sama juga menjamin bahwa semua transaksi ditandatangani dan dilaksanakan dengan "izin" yang sesuai (tidak seharusnya ada yang dapat mengirim aset digital dari akun Alice, kecuali Alice sendiri).

## Apa itu ether? {#what-is-ether}

**Ether (ETH)** adalah mata uang kripto asli Ethereum. Tujuan dari ETH adalah untuk memungkinkan adanya pasar untuk komputasi. Pasar seperti ini menyediakan insentif ekonomi bagi para peserta untuk memverifikasi dan menjalankan permintaan transaksi dan menyediakan sumber daya komputasional ke jaringan.

Setiap peserta yang menyiarkan permintaan transaksi juga harus menawarkan sejumlah ETH ke jaringan sebagai hadiah. Jaringan akan membakar sebagian dari hadiah dan memberikan sisanya pada siapapun yang pada akhirnya melakukan pekerja memverifikasi transaksi, mengeksekusinya dan menyiarkan ke jaringan.

Jumlah ETH yang dibayarkan sesuai dengan sumber daya yang dibutuhkan untuk melakukan komputasi. Bounty ini juga mencegah peserta jahat untuk secara sengaja menyumbat jaringan dengan meminta eksekusi komputasi tak terbatas atau skrip intensif sumber daya lainnya, karena peserta ini harus membayar sumber daya komputasi.

ETH juga digunakan untuk memberikan keamanan ekonomi-kripto pada jaringan dalam tiga cara utama: 1) digunakan sebagai sarana untuk memberi penghargaan kepada validator yang mengusulkan blok atau melaporkan perilaku tidak jujur dari validator lain; 2) dipertaruhkan oleh validator, yang bertindak sebagai jaminan terhadap perilaku tidak jujur - jika validator mencoba untuk berperilaku buruk, maka ETH mereka akan dihancurkan; 3) digunakan untuk menimbang 'suara' untuk blok yang baru diusulkan, yang masuk ke dalam bagian fork-choice dari mekanisme konsensus.

## Apa itu kontrak pintar? {#what-are-smart-contracts}

Dalam praktiknya, peserta tidak menulis kode baru setiap kali mereka ingin meminta komputasi pada EVM. Sebaliknya, developer aplikasi mengunggah program (cuplikan kode yang dapat digunakan kembali) ke state EVM, dan pengguna membuat permintaan untuk mengeksekusi cuplikan kode ini dengan berbagai parameter. Kami menyebut program yang diunggah ke dan dieksekusi oleh jaringan sebagai "kontrak pintar".

Pada tingkat sangat dasar, Anda bisa menganggap sebuah kontrak pintar seperti mesin penjual otomatis: satu skrip yang, ketika dipanggil dengan parameter tertentu, menjalankan beberapa aksi atau komputasi jika kondisi tertentu terpenuhi. Sebagai contoh, kontrak pintar vendor sederhana dapat membuat dan menetapkan kepemilikan aset digital jika pemanggil mengirimkan ETH ke penerima tertentu.

Pengembang mana pun bisa membuat kontrak pintar dan membuatnya terbuka untuk publik di jaringan, menggunakan rantai blok sebagai lapisan datanya, dengan biaya yang dibayarkan ke jaringan. Pengguna manapun bisa kemudian memanggil kontrak pintar untuk menjalankan kodenya, sekali lagi dengan biaya yang dibayarkan ke jaringan.

Oleh karena itu, dengan kontrak pintar, pengembang dapat menyusun dan menyebarkan aplikasi dan layanan sisi pengguna kompleks secara arbitrari, seperti pasar, instrumen keuangan, game, dll.

## Terminologi {#terminology}

### Rantai Blok {#blockchain}

Urutan dari semua blok yang telah diselesaikan pada jaringan Ethereum dalam riwayat jaringan. Dinamakan demikian karena setiap blok berisi referensi ke blok sebelumnya, yang membantu kami mempertahankan urutan semua blok (dan dengan demikian juga riwayat yang tepat).

### ETH {#eth}

**Ether (ETH)** adalah mata uang kripto asli Ethereum. Pengguna membayar ETH kepada pengguna lain agar permintaan eksekusi kode mereka dipenuhi.

[Selengkapnya tentang ETH](/developers/docs/intro-to-ether/)

### EVM {#evm}

Mesin Virtual Ethereum adalah komputer virtual global yang statenya oleh setiap peserta di jaringan Ethereum dijadikan tempat penyimpanan dan acuan kesesuaian. Setiap peserta dapat meminta eksekusi kode arbitrer pada EVM; eksekusi kode mengubah status EVM.

[Selengkapnya tentang EVM](/developers/docs/evm/)

### Simpul {#nodes}

Mesin nyata yang menyimpan state EVM. Node berkomunikasi dengan satu sama lain untuk menyebarkan informasi tentang state EVM dan perubahan state baru. Setiap pengguna juga dapat meminta eksekusi kode dengan menyiarkan permintaan eksekusi kode dari sebuah node. Jaringan Ethereum sendiri adalah kumpulan semua node Ethereum dan komunikasi mereka.

[Selengkapnya tentang simpul](/developers/docs/nodes-and-clients/)

### Akun {#accounts}

Tempat penyimpanan ETH. Pengguna dapat menginisialisasi akun, menyetor ETH ke dalam akun, dan mentransfer ETH dari akun mereka ke pengguna lain. Akun dan saldo akun tersimpan dalam tabel besar di dalam EVM; itu adalah bagian dari state EVM secara umum.

[Selengkapnya tentang akun](/developers/docs/accounts/)

### Transaksi {#transactions}

"Permintaan transaksi" adalah istilah formal untuk permintaan eksekusi kode pada EVM, dan "transaksi" adalah permintaan transaksi yang dipenuhi dan perubahan terkait dalam state EVM. Setiap pengguna dapat menyiarkan permintaan transaksi ke jaringan dari sebuah node. Agar permintaan transaksi benar-benar berdampak pada state EVM yang telah disetujui, transaksi harus divalidasi, dieksekusi, dan "dikomitmenkan pada jaringan" oleh node lain. Eksekusi kode apa pun menyebabkan perubahan state di EVM; atas komitmen, perubahan state ini disiarkan ke semua node dalam jaringan. Beberapa contoh transaksi:

- Kirim X ETH dari akun saya ke akun Alice.
- Terbitkan beberapa kode kontrak pintar ke state EVM.
- Jalankan kode kontrak pintar pada alamat X dalam EVM, dengan argumen Y.

[Selengkapnya tentang transaksi](/developers/docs/transactions/)

### Blok {#blocks}

Volume transaksi sangat tinggi, sehingga transaksi "dikomitkan" dalam batch, atau blok. Blok secara umum berisi lusinan sampai ratusan transaksi.

[Selengkapnya tentang blok](/developers/docs/blocks/)

### Kontrak Pintar {#smart-contracts}

Cuplikan kode yang dapat digunakan kembali (program) yang diterbitkan pengembang ke state EVM. Siapa pun bisa meminta kode kontrak pintar dijalankan dengan membuat permintaan transaksi. Karena pengembang dapat menulis aplikasi apa pun yang dapat dieksekusi ke dalam EVM (permainan, lokapasar, instrumen keuangan, dll.) dengan menerbitkan kontrak pintar, ini juga sering disebut [dapps, atau Aplikasi Terdesentralisasi](/developers/docs/dapps/).

[Selengkapnya tentang kontrak pintar](/developers/docs/smart-contracts/)

## Bacaan lebih lanjut {#further-reading}

- [Kertas Putih Ethereum](/whitepaper/)
- [Bagaimana cara kerja Ethereum?](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369) - _Preethi Kasireddy_ (**NB** sumber daya ini masih berharga, tetapi perlu diketahui bahwa ini ada sebelum [Penggabungan](/roadmap/merge) dan oleh karena itu masih mengacu pada mekanisme bukti kerja Ethereum - Ethereum sekarang sebenarnya diamankan menggunakan [bukti taruhan](/developers/docs/consensus-mechanisms/pos))

### Selengkapnya tentang pelajar visual? {#visual-learner}

Seri video ini menawarkan eksplorasi menyeluruh tentang topik-topik dasar:

<YouTube id="j78ZcIIpi0Q"/>

[Playlist Dasar-Dasar Ethereum](https://youtube.com/playlist?list=PLqgutSGloqiJyyoL0zvLVFPS-GMD2wKa5&si=kZTf5I7PKGTXDsOZ)

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Tutorial terkait {#related-tutorials}

- [Panduan bagi Pengembang tentang Ethereum, bagian 1](/developers/tutorials/a-developers-guide-to-ethereum-part-one/) _– Eksplorasi Ethereum yang sangat ramah pemula menggunakan Python dan web3.py_
