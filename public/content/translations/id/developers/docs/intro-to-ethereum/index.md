---
title: Pengantar teknis ke Ethereum
description: Pengantar pengembang dapp ke konsep inti Ethereum.
lang: id
---

## Apa itu blockchain? {#what-is-a-blockchain}

Blockchain adalah basis data publik yang diperbarui dan dibagikan di banyak komputer dalam sebuah jaringan.

"Blok" mengacu pada data dan status yang disimpan dalam kelompok berurutan yang dikenal sebagai "blok". Jika Anda mengirim ETH ke orang lain, data transaksi perlu ditambahkan ke sebuah blok agar berhasil.

"Rantai" mengacu pada fakta bahwa setiap blok secara kriptografi merujuk pada induknya. Dengan kata lain, blok-blok dirangkai bersama. Data dalam sebuah blok tidak dapat berubah tanpa mengubah semua blok berikutnya, yang akan membutuhkan konsensus dari seluruh jaringan.

Setiap komputer dalam jaringan harus menyetujui setiap blok baru dan rantai secara keseluruhan. Komputer-komputer ini dikenal sebagai "node". Node memastikan setiap orang yang berinteraksi dengan blockchain memiliki data yang sama. Untuk mencapai kesepakatan terdistribusi ini, blockchain membutuhkan mekanisme konsensus.

[Ethereum](/) menggunakan [mekanisme konsensus berbasis proof-of-stake](/developers/docs/consensus-mechanisms/pos/). Siapa pun yang ingin menambahkan blok baru ke rantai harus melakukan stake ETH - mata uang asli di Ethereum - sebagai jaminan dan menjalankan perangkat lunak validator. "Validator" ini kemudian dapat dipilih secara acak untuk mengusulkan blok yang diperiksa oleh validator lain dan ditambahkan ke blockchain. Ada sistem hadiah dan penalti yang sangat mendorong peserta untuk jujur dan tersedia secara online sebanyak mungkin.

Jika Anda ingin melihat bagaimana data blockchain di-hash dan selanjutnya ditambahkan ke riwayat referensi blok, pastikan untuk memeriksa [demo ini](https://andersbrownworth.com/blockchain/blockchain) oleh Anders Brownworth dan tonton video pendamping di bawah ini.

Tonton Anders menjelaskan hash dalam blockchain:

<YouTube id="_160oMzblY8" />

## Apa itu Ethereum? {#what-is-ethereum}

Ethereum adalah blockchain dengan komputer yang tertanam di dalamnya. Ini adalah fondasi untuk membangun aplikasi dan organisasi dengan cara yang terdesentralisasi, tanpa izin, dan tahan sensor.

Di alam semesta Ethereum, ada satu komputer kanonik (disebut Mesin Virtual Ethereum, atau EVM) yang statusnya disetujui oleh semua orang di jaringan Ethereum. Setiap orang yang berpartisipasi dalam jaringan Ethereum (setiap node Ethereum) menyimpan salinan status komputer ini. Selain itu, setiap peserta dapat menyiarkan permintaan agar komputer ini melakukan komputasi arbitrer. Setiap kali permintaan semacam itu disiarkan, peserta lain di jaringan memverifikasi, memvalidasi, dan melakukan ("mengeksekusi") komputasi tersebut. Eksekusi ini menyebabkan perubahan status di EVM, yang dikomit dan disebarkan ke seluruh jaringan.

Permintaan untuk komputasi disebut permintaan transaksi; catatan semua transaksi dan status EVM saat ini disimpan di blockchain, yang pada gilirannya disimpan dan disetujui oleh semua node.

Mekanisme kriptografi memastikan bahwa setelah transaksi diverifikasi sebagai valid dan ditambahkan ke blockchain, transaksi tersebut tidak dapat dirusak di kemudian hari. Mekanisme yang sama juga memastikan bahwa semua transaksi ditandatangani dan dieksekusi dengan "izin" yang sesuai (tidak ada yang boleh mengirim aset digital dari akun Alice, kecuali Alice sendiri).

## Apa itu ether? {#what-is-ether}

**Ether (ETH)** adalah mata uang kripto asli Ethereum. Tujuan ETH adalah untuk memungkinkan adanya pasar untuk komputasi. Pasar semacam itu memberikan insentif ekonomi bagi peserta untuk memverifikasi dan mengeksekusi permintaan transaksi serta menyediakan sumber daya komputasi ke jaringan.

Setiap peserta yang menyiarkan permintaan transaksi juga harus menawarkan sejumlah ETH ke jaringan sebagai hadiah. Jaringan akan membakar sebagian dari hadiah tersebut dan memberikan sisanya kepada siapa pun yang pada akhirnya melakukan pekerjaan memverifikasi transaksi, mengeksekusinya, mengomitnya ke blockchain, dan menyiarkannya ke jaringan.

Jumlah ETH yang dibayarkan sesuai dengan sumber daya yang dibutuhkan untuk melakukan komputasi. Hadiah ini juga mencegah peserta jahat yang sengaja menyumbat jaringan dengan meminta eksekusi komputasi tak terbatas atau skrip intensif sumber daya lainnya, karena peserta ini harus membayar sumber daya komputasi.

ETH juga digunakan untuk memberikan keamanan kripto-ekonomi ke jaringan dalam tiga cara utama: 1) digunakan sebagai sarana untuk memberi hadiah kepada validator yang mengusulkan blok atau mengungkap perilaku tidak jujur oleh validator lain; 2) Di-stake oleh validator, bertindak sebagai jaminan terhadap perilaku tidak jujur—jika validator mencoba berperilaku buruk, ETH mereka dapat dihancurkan; 3) digunakan untuk menimbang 'suara' untuk blok yang baru diusulkan, yang dimasukkan ke dalam bagian pilihan fork dari mekanisme konsensus.

## Apa itu kontrak pintar? {#what-are-smart-contracts}

Dalam praktiknya, peserta tidak menulis kode baru setiap kali mereka ingin meminta komputasi di EVM. Sebaliknya, pengembang aplikasi mengunggah program (potongan kode yang dapat digunakan kembali) ke dalam status EVM, dan pengguna membuat permintaan untuk mengeksekusi potongan kode ini dengan berbagai parameter. Kami menyebut program yang diunggah ke dan dieksekusi oleh jaringan sebagai "kontrak pintar".

Pada tingkat yang sangat dasar, Anda dapat menganggap kontrak pintar seperti semacam mesin penjual otomatis: sebuah skrip yang, ketika dipanggil dengan parameter tertentu, melakukan beberapa tindakan atau komputasi jika kondisi tertentu terpenuhi. Misalnya, kontrak pintar vendor sederhana dapat membuat dan menetapkan kepemilikan aset digital jika pemanggil mengirimkan ETH ke penerima tertentu.

Setiap pengembang dapat membuat kontrak pintar dan menjadikannya publik ke jaringan, menggunakan blockchain sebagai lapisan datanya, dengan biaya yang dibayarkan ke jaringan. Setiap pengguna kemudian dapat memanggil kontrak pintar untuk mengeksekusi kodenya, sekali lagi dengan biaya yang dibayarkan ke jaringan.

Dengan demikian, melalui kontrak pintar, pengembang dapat membangun dan menerapkan aplikasi dan layanan yang berhadapan dengan pengguna yang sangat kompleks seperti: pasar, instrumen keuangan, permainan, dll.

## Terminologi {#terminology}

### Blockchain {#blockchain}

Urutan semua blok yang telah dikomit ke jaringan Ethereum dalam sejarah jaringan. Dinamakan demikian karena setiap blok berisi referensi ke blok sebelumnya, yang membantu kita mempertahankan urutan atas semua blok (dan dengan demikian atas sejarah yang tepat).

### ETH {#eth}

**Ether (ETH)** adalah mata uang kripto asli Ethereum. Pengguna membayar ETH kepada pengguna lain agar permintaan eksekusi kode mereka dipenuhi.

[Lebih lanjut tentang ETH](/developers/docs/intro-to-ether/)

### EVM {#evm}

Mesin Virtual Ethereum adalah komputer virtual global yang statusnya disimpan dan disetujui oleh setiap peserta di jaringan Ethereum. Setiap peserta dapat meminta eksekusi kode arbitrer di EVM; eksekusi kode mengubah status EVM.

[Lebih lanjut tentang EVM](/developers/docs/evm/)

### Node {#nodes}

Mesin di kehidupan nyata yang menyimpan status EVM. Node berkomunikasi satu sama lain untuk menyebarkan informasi tentang status EVM dan perubahan status baru. Setiap pengguna juga dapat meminta eksekusi kode dengan menyiarkan permintaan eksekusi kode dari sebuah node. Jaringan Ethereum itu sendiri adalah gabungan dari semua node Ethereum dan komunikasinya.

[Lebih lanjut tentang node](/developers/docs/nodes-and-clients/)

### Akun {#accounts}

Tempat ETH disimpan. Pengguna dapat menginisialisasi akun, menyetor ETH ke dalam akun, dan mentransfer ETH dari akun mereka ke pengguna lain. Akun dan saldo akun disimpan dalam tabel besar di EVM; mereka adalah bagian dari status EVM secara keseluruhan.

[Lebih lanjut tentang akun](/developers/docs/accounts/)

### Transaksi {#transactions}

"Permintaan transaksi" adalah istilah formal untuk permintaan eksekusi kode di EVM, dan "transaksi" adalah permintaan transaksi yang dipenuhi dan perubahan terkait dalam status EVM. Setiap pengguna dapat menyiarkan permintaan transaksi ke jaringan dari sebuah node. Agar permintaan transaksi memengaruhi status EVM yang disepakati, permintaan tersebut harus divalidasi, dieksekusi, dan "dikomit ke jaringan" oleh node lain. Eksekusi kode apa pun menyebabkan perubahan status di EVM; setelah dikomit, perubahan status ini disiarkan ke semua node di jaringan. Beberapa contoh transaksi:

- Mengirim X ETH dari akun saya ke akun Alice.
- Menerbitkan beberapa kode kontrak pintar ke dalam status EVM.
- Mengeksekusi kode kontrak pintar di alamat X di EVM, dengan argumen Y.

[Lebih lanjut tentang transaksi](/developers/docs/transactions/)

### Blok {#blocks}

Volume transaksi sangat tinggi, sehingga transaksi "dikomit" dalam kelompok, atau blok. Blok umumnya berisi puluhan hingga ratusan transaksi.

[Lebih lanjut tentang blok](/developers/docs/blocks/)

### Kontrak pintar {#smart-contracts}

Potongan kode yang dapat digunakan kembali (sebuah program) yang diterbitkan oleh pengembang ke dalam status EVM. Siapa pun dapat meminta agar kode kontrak pintar dieksekusi dengan membuat permintaan transaksi. Karena pengembang dapat menulis aplikasi yang dapat dieksekusi secara arbitrer ke dalam EVM (permainan, pasar, instrumen keuangan, dll.) dengan menerbitkan kontrak pintar, ini sering juga disebut [dapps, atau Aplikasi Terdesentralisasi](/developers/docs/dapps/).

[Lebih lanjut tentang kontrak pintar](/developers/docs/smart-contracts/)

## Bacaan lebih lanjut {#further-reading}

- [Whitepaper Ethereum](/whitepaper/)
- [Bagaimana sebenarnya cara kerja Ethereum?](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369) - _Preethi Kasireddy_ (**Catatan** sumber daya ini masih berharga tetapi perlu disadari bahwa ini mendahului [The Merge](/roadmap/merge) dan oleh karena itu masih merujuk pada mekanisme proof-of-work Ethereum - Ethereum sebenarnya sekarang diamankan menggunakan [proof-of-stake](/developers/docs/consensus-mechanisms/pos))

### Lebih suka belajar secara visual? {#visual-learner}

Seri video ini menawarkan eksplorasi menyeluruh tentang topik-topik dasar:

<YouTube id="j78ZcIIpi0Q"/>

[Daftar Putar Dasar-dasar Ethereum](https://youtube.com/playlist?list=PLqgutSGloqiJyyoL0zvLVFPS-GMD2wKa5&si=kZTf5I7PKGTXDsOZ)

_Tahu sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Tutorial terkait {#related-tutorials}

- [Panduan pengembang ke Ethereum, bagian 1](/developers/tutorials/a-developers-guide-to-ethereum-part-one/) _– Eksplorasi Ethereum yang sangat ramah pemula menggunakan Python dan web3.py_