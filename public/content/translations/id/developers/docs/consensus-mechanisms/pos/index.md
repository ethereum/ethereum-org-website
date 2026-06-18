---
title: Bukti Kepemilikan (PoS)
description: Penjelasan tentang protokol konsensus Bukti Kepemilikan (PoS) dan perannya di Ethereum.
lang: id
---

Bukti Kepemilikan (PoS) mendasari [mekanisme konsensus](/developers/docs/consensus-mechanisms/) Ethereum. Ethereum mengaktifkan mekanisme Bukti Kepemilikan (PoS) pada tahun 2022 karena lebih aman, tidak terlalu boros energi, dan lebih baik untuk mengimplementasikan solusi penskalaan baru dibandingkan dengan arsitektur [Bukti Kerja (PoW)](/developers/docs/consensus-mechanisms/pow) sebelumnya.

## Prasyarat {#prerequisites}

Untuk lebih memahami halaman ini, kami sarankan Anda membaca terlebih dahulu tentang [mekanisme konsensus](/developers/docs/consensus-mechanisms/).

## Apa itu Bukti Kepemilikan (PoS)? {#what-is-pos}

Bukti Kepemilikan (PoS) adalah cara untuk membuktikan bahwa validator telah memasukkan sesuatu yang bernilai ke dalam jaringan yang dapat dihancurkan jika mereka bertindak tidak jujur. Dalam Bukti Kepemilikan (PoS) [Ethereum](/), validator secara eksplisit melakukan stake modal dalam bentuk ETH ke dalam kontrak pintar di Ethereum. Validator kemudian bertanggung jawab untuk memeriksa bahwa blok baru yang disebarkan melalui jaringan adalah valid dan sesekali membuat serta menyebarkan blok baru itu sendiri. Jika mereka mencoba menipu jaringan (misalnya dengan mengusulkan beberapa blok ketika mereka seharusnya mengirim satu atau mengirim atestasi yang bertentangan), sebagian atau seluruh ETH yang mereka stake dapat dihancurkan.

## Validator {#validators}

Untuk berpartisipasi sebagai validator, pengguna harus menyetorkan 32 ETH ke dalam kontrak deposit dan menjalankan tiga perangkat lunak terpisah: klien eksekusi, klien konsensus, dan klien validator. Saat menyetorkan ETH mereka, pengguna bergabung dengan antrean aktivasi yang membatasi laju validator baru yang bergabung dengan jaringan. Setelah diaktifkan, validator menerima blok baru dari rekan-rekan di jaringan Ethereum. Transaksi yang dikirimkan dalam blok dieksekusi ulang untuk memeriksa bahwa perubahan yang diusulkan pada state Ethereum adalah valid, dan tanda tangan blok diperiksa. Validator kemudian mengirimkan suara (disebut atestasi) yang mendukung blok tersebut ke seluruh jaringan.

Sedangkan di bawah Bukti Kerja (PoW), waktu blok ditentukan oleh kesulitan penambangan, dalam Bukti Kepemilikan (PoS), temponya tetap. Waktu dalam Bukti Kepemilikan (PoS) Ethereum dibagi menjadi slot (12 detik) dan Epok (32 slot). Satu validator dipilih secara acak untuk menjadi pengusul blok di setiap slot. Validator ini bertanggung jawab untuk membuat blok baru dan mengirimkannya ke node lain di jaringan. Juga di setiap slot, sebuah komite validator dipilih secara acak, yang suaranya digunakan untuk menentukan validitas blok yang sedang diusulkan. Membagi kumpulan validator ke dalam komite-komite penting untuk menjaga beban jaringan tetap dapat dikelola. Komite membagi kumpulan validator sehingga setiap validator aktif melakukan atestasi di setiap Epok, tetapi tidak di setiap slot.

## Bagaimana Transaksi Dieksekusi dalam PoS Ethereum {#transaction-execution-ethereum-pos}

Berikut ini memberikan penjelasan menyeluruh tentang bagaimana sebuah transaksi dieksekusi dalam Bukti Kepemilikan (PoS) Ethereum.

1. Pengguna membuat dan menandatangani [transaksi](/developers/docs/transactions/) dengan kunci privat mereka. Ini biasanya ditangani oleh dompet atau pustaka seperti [Ethers.js](https://docs.ethers.org/v6/), [web3js](https://docs.web3js.org/), [web3py](https://web3py.readthedocs.io/en/v5/) dll, tetapi secara teknis pengguna membuat permintaan ke node menggunakan [API JSON-RPC](/developers/docs/apis/json-rpc/) Ethereum. Pengguna menentukan jumlah gas yang siap mereka bayarkan sebagai tip kepada validator untuk mendorong mereka memasukkan transaksi tersebut ke dalam sebuah blok. [Tip](/developers/docs/gas/#priority-fee) dibayarkan kepada validator sementara [biaya dasar](/developers/docs/gas/#base-fee) dibakar.
2. Transaksi dikirimkan ke [klien eksekusi](/developers/docs/nodes-and-clients/#execution-client) Ethereum yang memverifikasi validitasnya. Ini berarti memastikan bahwa pengirim memiliki cukup ETH untuk memenuhi transaksi dan mereka telah menandatanganinya dengan kunci yang benar.
3. Jika transaksi valid, klien eksekusi menambahkannya ke mempool lokalnya (daftar transaksi yang tertunda) dan juga menyiarkannya ke node lain melalui jaringan gosip lapisan eksekusi. Ketika node lain mendengar tentang transaksi tersebut, mereka juga menambahkannya ke mempool lokal mereka. Pengguna tingkat lanjut mungkin menahan diri untuk tidak menyiarkan transaksi mereka dan sebaliknya meneruskannya ke pembuat blok khusus seperti [Flashbots Auction](https://docs.flashbots.net/flashbots-auction/overview). Ini memungkinkan mereka untuk mengatur transaksi di blok mendatang untuk keuntungan maksimum ([MEV](/developers/docs/mev/#mev-extraction)).
4. Salah satu node validator di jaringan adalah pengusul blok untuk slot saat ini, yang sebelumnya telah dipilih secara pseudo-acak menggunakan RANDAO. Node ini bertanggung jawab untuk membangun dan menyiarkan blok berikutnya yang akan ditambahkan ke rantai blok Ethereum dan memperbarui state global. Node ini terdiri dari tiga bagian: klien eksekusi, klien konsensus, dan klien validator. Klien eksekusi menggabungkan transaksi dari mempool lokal ke dalam "muatan eksekusi" dan mengeksekusinya secara lokal untuk menghasilkan perubahan state. Informasi ini diteruskan ke klien konsensus di mana muatan eksekusi dibungkus sebagai bagian dari "blok suar" yang juga berisi informasi tentang hadiah, penalti, pemotongan, atestasi, dll. yang memungkinkan jaringan untuk menyepakati urutan blok di ujung rantai. Komunikasi antara klien eksekusi dan konsensus dijelaskan secara lebih rinci dalam [Menghubungkan Klien Konsensus dan Eksekusi](/developers/docs/networking-layer/#connecting-clients).
5. Node lain menerima blok suar baru di jaringan gosip lapisan konsensus. Mereka meneruskannya ke klien eksekusi mereka di mana transaksi dieksekusi ulang secara lokal untuk memastikan perubahan state yang diusulkan adalah valid. Klien validator kemudian melakukan atestasi bahwa blok tersebut valid dan merupakan blok logis berikutnya dalam pandangan mereka tentang rantai (artinya blok tersebut dibangun di atas rantai dengan bobot atestasi terbesar seperti yang didefinisikan dalam [aturan pilihan percabangan](/developers/docs/consensus-mechanisms/pos/#fork-choice)). Blok ditambahkan ke basis data lokal di setiap node yang melakukan atestasi terhadapnya.
6. Transaksi dapat dianggap "difinalisasi" jika telah menjadi bagian dari rantai dengan "tautan mayoritas super" antara dua titik periksa. Titik periksa terjadi pada awal setiap Epok dan ada untuk memperhitungkan fakta bahwa hanya sebagian dari validator aktif yang melakukan atestasi di setiap slot, tetapi semua validator aktif melakukan atestasi di seluruh Epok. Oleh karena itu, hanya di antara Epok-Epok saja 'tautan mayoritas super' dapat ditunjukkan (ini adalah saat 66% dari total ETH yang di-stake di jaringan menyetujui dua titik periksa).

Detail lebih lanjut tentang finalitas dapat ditemukan di bawah ini.

## Finalitas {#finality}

Sebuah transaksi memiliki "finalitas" dalam jaringan terdistribusi ketika transaksi tersebut merupakan bagian dari blok yang tidak dapat berubah tanpa sejumlah besar ETH yang dibakar. Pada Bukti Kepemilikan (PoS) Ethereum, ini dikelola menggunakan blok "titik periksa". Blok pertama di setiap Epok adalah titik periksa. Validator memberikan suara untuk pasangan titik periksa yang dianggapnya valid. Jika sepasang titik periksa menarik suara yang mewakili setidaknya dua pertiga dari total ETH yang di-stake, titik periksa tersebut ditingkatkan. Yang lebih baru dari keduanya (target) menjadi "terjustifikasi". Yang lebih awal dari keduanya sudah terjustifikasi karena itu adalah "target" di Epok sebelumnya. Sekarang ditingkatkan menjadi "difinalisasi". Proses peningkatan titik periksa ini ditangani oleh **[Casper the Friendly Finality Gadget (Casper FFG)](https://arxiv.org/pdf/1710.09437)**. Casper FFG adalah alat finalitas blok untuk konsensus. Setelah sebuah blok difinalisasi, blok tersebut tidak dapat dikembalikan atau diubah tanpa pemotongan mayoritas dari para staker, sehingga membuatnya tidak layak secara ekonomi.

Untuk mengembalikan blok yang difinalisasi, penyerang harus berkomitmen untuk kehilangan setidaknya sepertiga dari total pasokan ETH yang di-stake. Alasan pastinya dijelaskan dalam [postingan blog Yayasan Ethereum](https://blog.ethereum.org/2016/05/09/on-settlement-finality) ini. Karena finalitas membutuhkan mayoritas dua pertiga, penyerang dapat mencegah jaringan mencapai finalitas dengan memberikan suara menggunakan sepertiga dari total stake. Ada mekanisme untuk bertahan dari hal ini: [kebocoran ketidakaktifan](https://eth2book.info/bellatrix/part2/incentives/inactivity). Ini aktif setiap kali rantai gagal difinalisasi selama lebih dari empat Epok. Kebocoran ketidakaktifan menguras ETH yang di-stake dari validator yang memberikan suara menentang mayoritas, memungkinkan mayoritas untuk mendapatkan kembali mayoritas dua pertiga dan memfinalisasi rantai.

## Keamanan kripto-ekonomi {#crypto-economic-security}

Menjalankan validator adalah sebuah komitmen. Validator diharapkan untuk memelihara perangkat keras dan konektivitas yang memadai untuk berpartisipasi dalam validasi blok dan proposal. Sebagai imbalannya, validator dibayar dalam ETH (saldo yang mereka stake meningkat). Di sisi lain, berpartisipasi sebagai validator juga membuka jalan baru bagi pengguna untuk menyerang jaringan demi keuntungan pribadi atau sabotase. Untuk mencegah hal ini, validator kehilangan hadiah ETH jika mereka gagal berpartisipasi saat dipanggil, dan stake mereka yang ada dapat dihancurkan jika mereka berperilaku tidak jujur. Dua perilaku utama yang dapat dianggap tidak jujur: mengusulkan beberapa blok dalam satu slot (berdalih) dan mengirimkan atestasi yang kontradiktif.

Jumlah ETH yang dipotong bergantung pada berapa banyak validator yang juga dipotong pada waktu yang hampir bersamaan. Ini dikenal sebagai ["penalti korelasi"](https://eth2book.info/bellatrix/part2/incentives/slashing#the-correlation-penalty), dan bisa jadi kecil (~1% stake untuk satu validator yang dipotong sendiri) atau dapat mengakibatkan 100% stake validator dihancurkan (peristiwa pemotongan massal). Ini dikenakan di pertengahan periode keluar paksa yang dimulai dengan penalti langsung (hingga 1 ETH) pada Hari ke-1, penalti korelasi pada Hari ke-18, dan akhirnya, dikeluarkan dari jaringan pada Hari ke-36. Mereka menerima penalti atestasi kecil setiap hari karena mereka hadir di jaringan tetapi tidak mengirimkan suara. Semua ini berarti serangan terkoordinasi akan sangat merugikan bagi penyerang.

## Pilihan percabangan {#fork-choice}

Ketika jaringan berkinerja secara optimal dan jujur, hanya ada satu blok baru di ujung rantai, dan semua validator melakukan atestasi terhadapnya. Namun, ada kemungkinan validator memiliki pandangan yang berbeda tentang ujung rantai karena latensi jaringan atau karena pengusul blok telah berdalih. Oleh karena itu, klien konsensus memerlukan algoritma untuk memutuskan mana yang akan disukai. Algoritma yang digunakan dalam Bukti Kepemilikan (PoS) Ethereum disebut [LMD-GHOST](https://arxiv.org/pdf/2003.03052.pdf), dan ini bekerja dengan mengidentifikasi percabangan yang memiliki bobot atestasi terbesar dalam sejarahnya.

## Bukti Kepemilikan (PoS) dan keamanan {#pos-and-security}

Ancaman [serangan 51%](https://www.investopedia.com/terms/1/51-attack.asp) masih ada pada Bukti Kepemilikan (PoS) seperti halnya pada Bukti Kerja (PoW), tetapi ini bahkan lebih berisiko bagi para penyerang. Penyerang akan membutuhkan 51% dari ETH yang di-stake. Mereka kemudian dapat menggunakan atestasi mereka sendiri untuk memastikan percabangan pilihan mereka adalah yang memiliki atestasi terakumulasi paling banyak. 'Bobot' atestasi yang terakumulasi adalah apa yang digunakan klien konsensus untuk menentukan rantai yang benar, sehingga penyerang ini akan dapat menjadikan percabangan mereka sebagai yang kanonis. Namun, kekuatan Bukti Kepemilikan (PoS) dibandingkan Bukti Kerja (PoW) adalah bahwa komunitas memiliki fleksibilitas dalam melancarkan serangan balik. Misalnya, validator yang jujur dapat memutuskan untuk terus membangun di rantai minoritas dan mengabaikan percabangan penyerang sambil mendorong aplikasi, bursa, dan pool untuk melakukan hal yang sama. Mereka juga dapat memutuskan untuk secara paksa mengeluarkan penyerang dari jaringan dan menghancurkan ETH yang mereka stake. Ini adalah pertahanan ekonomi yang kuat terhadap serangan 51%.

Di luar serangan 51%, aktor jahat mungkin juga mencoba jenis aktivitas berbahaya lainnya, seperti:

- serangan jarak jauh (meskipun alat finalitas menetralkan vektor serangan ini)
- 'reorganisasi' jarak pendek (meskipun peningkatan pengusul dan tenggat waktu atestasi memitigasi hal ini)
- serangan memantul dan menyeimbangkan (juga dimitigasi oleh peningkatan pengusul, dan serangan ini bagaimanapun juga hanya ditunjukkan di bawah kondisi jaringan yang diidealkan)
- serangan longsoran (dinetralkan oleh aturan algoritma pilihan percabangan yang hanya mempertimbangkan pesan terbaru)

Secara keseluruhan, Bukti Kepemilikan (PoS), seperti yang diimplementasikan di Ethereum, telah terbukti lebih aman secara ekonomi daripada Bukti Kerja (PoW).

## Kelebihan dan kekurangan {#pros-and-cons}

| Kelebihan                                                                                                                                                                                                           | Kekurangan                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Staking memudahkan individu untuk berpartisipasi dalam mengamankan jaringan, mempromosikan desentralisasi. Node validator dapat dijalankan di laptop biasa. Pool staking memungkinkan pengguna untuk melakukan stake tanpa memiliki 32 ETH. | Bukti Kepemilikan (PoS) lebih muda dan kurang teruji dibandingkan dengan Bukti Kerja (PoW) |
| Staking lebih terdesentralisasi. Skala ekonomi tidak berlaku dengan cara yang sama seperti pada penambangan PoW.                                                                                                         | Bukti Kepemilikan (PoS) lebih kompleks untuk diimplementasikan daripada Bukti Kerja (PoW) |
| Bukti Kepemilikan (PoS) menawarkan keamanan kripto-ekonomi yang lebih besar daripada Bukti Kerja (PoW)                                                                                                                                           | Pengguna perlu menjalankan tiga perangkat lunak untuk berpartisipasi dalam Bukti Kepemilikan (PoS) Ethereum. |
| Lebih sedikit penerbitan ETH baru yang diperlukan untuk memberi insentif kepada peserta jaringan                                                                                                                                            |                                                                                         |

### Perbandingan dengan Bukti Kerja (PoW) {#comparison-to-proof-of-work}

Ethereum awalnya menggunakan Bukti Kerja (PoW) tetapi beralih ke Bukti Kepemilikan (PoS) pada bulan September 2022. PoS menawarkan beberapa keuntungan dibandingkan PoW, seperti:

- efisiensi energi yang lebih baik – tidak perlu menggunakan banyak energi pada komputasi Bukti Kerja (PoW)
- hambatan masuk yang lebih rendah, persyaratan perangkat keras yang berkurang – tidak perlu perangkat keras elit untuk memiliki peluang membuat blok baru
- pengurangan risiko sentralisasi – Bukti Kepemilikan (PoS) seharusnya mengarah pada lebih banyak node yang mengamankan jaringan
- karena kebutuhan energi yang rendah, lebih sedikit penerbitan ETH yang diperlukan untuk memberi insentif partisipasi
- penalti ekonomi untuk perilaku buruk membuat serangan gaya 51% lebih merugikan bagi penyerang dibandingkan dengan Bukti Kerja (PoW)
- komunitas dapat menggunakan pemulihan sosial dari rantai yang jujur jika serangan 51% berhasil mengatasi pertahanan kripto-ekonomi.

## Bacaan lebih lanjut {#further-reading}

- [Tanya Jawab Bukti Kepemilikan (PoS)](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html) _Vitalik Buterin_
- [Apa itu Bukti Kepemilikan (PoS)](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ConsenSys_
- [Apa Itu Bukti Kepemilikan (PoS) Dan Mengapa Itu Penting](https://bitcoinmagazine.com/culture/what-proof-of-stake-is-and-why-it-matters-1377531463) _Vitalik Buterin_
- [Mengapa Bukti Kepemilikan (PoS) (Nov 2020)](https://vitalik.eth.limo/general/2020/11/06/pos2020.html) _Vitalik Buterin_
- [Bukti Kepemilikan (PoS): Bagaimana Saya Belajar Mencintai Subjektivitas Lemah](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity) _Vitalik Buterin_
- [Serangan dan pertahanan Bukti Kepemilikan (PoS) Ethereum](https://mirror.xyz/jmcook.eth/YqHargbVWVNRQqQpVpzrqEQ8IqwNUJDIpwRP7SS5FXs)
- [Filosofi Desain Bukti Kepemilikan (PoS)](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51) _Vitalik Buterin_
- [Video: Vitalik Buterin menjelaskan Bukti Kepemilikan (PoS) kepada Lex Fridman](https://www.youtube.com/watch?v=3yrqBG-7EVE)

## Topik terkait {#related-topics}

- [Bukti Kerja (PoW)](/developers/docs/consensus-mechanisms/pow/)
- [Bukti otoritas (PoA)](/developers/docs/consensus-mechanisms/poa/)