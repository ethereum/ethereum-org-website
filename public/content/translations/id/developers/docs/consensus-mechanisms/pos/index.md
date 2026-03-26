---
title: Proof-of-stake (PoS)
description: Penjelasan tentang protokol konsensus proof-of-stake dan perannya di Ethereum.
lang: id
---

Proof-of-stake (PoS) mendasari [mekanisme konsensus](/developers/docs/consensus-mechanisms/) Ethereum. Ethereum mengaktifkan mekanisme proof-of-stake-nya pada tahun 2022 karena lebih aman, tidak terlalu intensif energi, dan lebih baik untuk menerapkan solusi peningkatan (scaling) baru dibandingkan dengan arsitektur [proof-of-work](/developers/docs/consensus-mechanisms/pow) sebelumnya.

## Prasyarat {#prerequisites}

Untuk lebih memahami halaman ini, kami sarankan Anda membaca terlebih dahulu tentang [mekanisme konsensus](/developers/docs/consensus-mechanisms/).

## Apa itu proof-of-stake (PoS)? {#what-is-pos}

Proof-of-stake adalah cara untuk membuktikan bahwa validator telah menempatkan sesuatu yang bernilai ke dalam jaringan yang dapat dihancurkan jika mereka bertindak tidak jujur. Dalam proof-of-stake [Ethereum](/), validator secara eksplisit melakukan stake modal dalam bentuk ETH ke dalam kontrak pintar di Ethereum. Validator kemudian bertanggung jawab untuk memeriksa bahwa blok baru yang disebarkan melalui jaringan adalah valid dan sesekali membuat serta menyebarkan blok baru itu sendiri. Jika mereka mencoba menipu jaringan (misalnya dengan mengusulkan beberapa blok ketika mereka seharusnya mengirim satu atau mengirim pengesahan yang bertentangan), sebagian atau seluruh ETH yang mereka stake dapat dihancurkan.

## Validator {#validators}

Untuk berpartisipasi sebagai validator, pengguna harus menyetorkan 32 ETH ke dalam kontrak deposit dan menjalankan tiga perangkat lunak terpisah: klien eksekusi, klien konsensus, dan klien validator. Saat menyetorkan ETH mereka, pengguna bergabung dengan antrean aktivasi yang membatasi laju validator baru yang bergabung dengan jaringan. Setelah diaktifkan, validator menerima blok baru dari rekan (peer) di jaringan Ethereum. Transaksi yang dikirimkan dalam blok dieksekusi ulang untuk memeriksa bahwa perubahan yang diusulkan pada status Ethereum adalah valid, dan tanda tangan blok diperiksa. Validator kemudian mengirimkan suara (disebut pengesahan) yang mendukung blok tersebut ke seluruh jaringan.

Sedangkan di bawah proof-of-work, waktu blok ditentukan oleh kesulitan penambangan, dalam proof-of-stake, temponya tetap. Waktu dalam Ethereum proof-of-stake dibagi menjadi slot (12 detik) dan epoch (32 slot). Satu validator dipilih secara acak untuk menjadi pengusul blok di setiap slot. Validator ini bertanggung jawab untuk membuat blok baru dan mengirimkannya ke node lain di jaringan. Juga di setiap slot, sebuah komite validator dipilih secara acak, yang suaranya digunakan untuk menentukan validitas blok yang sedang diusulkan. Membagi kumpulan validator ke dalam komite-komite penting untuk menjaga beban jaringan agar tetap dapat dikelola. Komite membagi kumpulan validator sehingga setiap validator aktif melakukan pengesahan di setiap epoch, tetapi tidak di setiap slot.

## Bagaimana Transaksi Dieksekusi di PoS Ethereum {#transaction-execution-ethereum-pos}

Berikut ini memberikan penjelasan ujung-ke-ujung (end-to-end) tentang bagaimana sebuah transaksi dieksekusi dalam proof-of-stake Ethereum.

1. Pengguna membuat dan menandatangani [transaksi](/developers/docs/transactions/) dengan kunci pribadi mereka. Ini biasanya ditangani oleh dompet atau pustaka seperti [ethers.js](https://docs.ethers.org/v6/), [web3js](https://docs.web3js.org/), [web3py](https://web3py.readthedocs.io/en/v5/) dll, tetapi di balik layar pengguna membuat permintaan ke node menggunakan [JSON-RPC API](/developers/docs/apis/json-rpc/) Ethereum. Pengguna menentukan jumlah gas yang siap mereka bayarkan sebagai tip kepada validator untuk mendorong mereka memasukkan transaksi ke dalam blok. [Tip](/developers/docs/gas/#priority-fee) dibayarkan kepada validator sementara [biaya dasar](/developers/docs/gas/#base-fee) dibakar.
2. Transaksi dikirimkan ke [klien eksekusi](/developers/docs/nodes-and-clients/#execution-client) Ethereum yang memverifikasi validitasnya. Ini berarti memastikan bahwa pengirim memiliki cukup ETH untuk memenuhi transaksi dan mereka telah menandatanganinya dengan kunci yang benar.
3. Jika transaksi valid, klien eksekusi menambahkannya ke mempool lokalnya (daftar transaksi yang tertunda) dan juga menyiarkannya ke node lain melalui jaringan gosip lapisan eksekusi. Ketika node lain mendengar tentang transaksi tersebut, mereka juga menambahkannya ke mempool lokal mereka. Pengguna tingkat lanjut mungkin menahan diri untuk tidak menyiarkan transaksi mereka dan sebaliknya meneruskannya ke pembuat blok khusus seperti [Flashbots Auction](https://docs.flashbots.net/flashbots-auction/overview). Ini memungkinkan mereka untuk mengatur transaksi di blok mendatang untuk keuntungan maksimum ([MEV](/developers/docs/mev/#mev-extraction)).
4. Salah satu node validator di jaringan adalah pengusul blok untuk slot saat ini, yang sebelumnya telah dipilih secara pseudo-acak menggunakan RANDAO. Node ini bertanggung jawab untuk membangun dan menyiarkan blok berikutnya yang akan ditambahkan ke blockchain Ethereum dan memperbarui status global. Node ini terdiri dari tiga bagian: klien eksekusi, klien konsensus, dan klien validator. Klien eksekusi menggabungkan transaksi dari mempool lokal ke dalam "muatan eksekusi" (execution payload) dan mengeksekusinya secara lokal untuk menghasilkan perubahan status. Informasi ini diteruskan ke klien konsensus di mana muatan eksekusi dibungkus sebagai bagian dari "blok beacon" yang juga berisi informasi tentang hadiah, penalti, pemotongan, pengesahan, dll. yang memungkinkan jaringan untuk menyetujui urutan blok di kepala rantai. Komunikasi antara klien eksekusi dan konsensus dijelaskan secara lebih rinci dalam [Menghubungkan Klien Konsensus dan Eksekusi](/developers/docs/networking-layer/#connecting-clients).
5. Node lain menerima blok beacon baru di jaringan gosip lapisan konsensus. Mereka meneruskannya ke klien eksekusi mereka di mana transaksi dieksekusi ulang secara lokal untuk memastikan perubahan status yang diusulkan adalah valid. Klien validator kemudian mengesahkan bahwa blok tersebut valid dan merupakan blok logis berikutnya dalam pandangan mereka tentang rantai (artinya blok tersebut dibangun di atas rantai dengan bobot pengesahan terbesar seperti yang didefinisikan dalam [aturan pilihan fork](/developers/docs/consensus-mechanisms/pos/#fork-choice)). Blok ditambahkan ke basis data lokal di setiap node yang mengesahkannya.
6. Transaksi dapat dianggap "difinalisasi" jika telah menjadi bagian dari rantai dengan "tautan supermayoritas" di antara dua pos pemeriksaan (checkpoint). Pos pemeriksaan terjadi pada awal setiap epoch dan ada untuk memperhitungkan fakta bahwa hanya sebagian dari validator aktif yang melakukan pengesahan di setiap slot, tetapi semua validator aktif melakukan pengesahan di seluruh epoch. Oleh karena itu, hanya di antara epoch-epoch sebuah 'tautan supermayoritas' dapat ditunjukkan (ini adalah saat 66% dari total ETH yang di-stake di jaringan menyetujui dua pos pemeriksaan).

Lebih banyak detail tentang finalitas dapat ditemukan di bawah ini.

## Finalitas {#finality}

Sebuah transaksi memiliki "finalitas" dalam jaringan terdistribusi ketika transaksi tersebut merupakan bagian dari blok yang tidak dapat berubah tanpa sejumlah besar ETH yang dibakar. Pada proof-of-stake Ethereum, ini dikelola menggunakan blok "pos pemeriksaan" (checkpoint). Blok pertama di setiap epoch adalah pos pemeriksaan. Validator memberikan suara untuk pasangan pos pemeriksaan yang dianggapnya valid. Jika sepasang pos pemeriksaan menarik suara yang mewakili setidaknya dua pertiga dari total ETH yang di-stake, pos pemeriksaan tersebut ditingkatkan. Yang lebih baru dari keduanya (target) menjadi "dibenarkan" (justified). Yang lebih awal dari keduanya sudah dibenarkan karena itu adalah "target" di epoch sebelumnya. Sekarang statusnya ditingkatkan menjadi "difinalisasi". Proses peningkatan pos pemeriksaan ini ditangani oleh **[Casper the Friendly Finality Gadget (Casper-FFG)](https://arxiv.org/pdf/1710.09437)**. Casper-FFG adalah alat finalitas blok untuk konsensus. Setelah sebuah blok difinalisasi, blok tersebut tidak dapat dikembalikan atau diubah tanpa pemotongan mayoritas dari staker, membuatnya tidak layak secara ekonomi.

Untuk mengembalikan blok yang telah difinalisasi, penyerang harus berkomitmen untuk kehilangan setidaknya sepertiga dari total pasokan ETH yang di-stake. Alasan pastinya dijelaskan dalam [postingan blog Ethereum Foundation](https://blog.ethereum.org/2016/05/09/on-settlement-finality) ini. Karena finalitas membutuhkan mayoritas dua pertiga, penyerang dapat mencegah jaringan mencapai finalitas dengan memberikan suara menggunakan sepertiga dari total stake. Ada mekanisme untuk bertahan dari hal ini: [kebocoran ketidakaktifan (inactivity leak)](https://eth2book.info/bellatrix/part2/incentives/inactivity). Ini aktif setiap kali rantai gagal mencapai finalitas selama lebih dari empat epoch. Kebocoran ketidakaktifan menguras ETH yang di-stake dari validator yang memberikan suara menentang mayoritas, memungkinkan mayoritas untuk mendapatkan kembali mayoritas dua pertiga dan memfinalisasi rantai.

## Keamanan kripto-ekonomi {#crypto-economic-security}

Menjalankan validator adalah sebuah komitmen. Validator diharapkan untuk memelihara perangkat keras dan konektivitas yang memadai untuk berpartisipasi dalam validasi dan usulan blok. Sebagai imbalannya, validator dibayar dalam ETH (saldo yang di-stake mereka meningkat). Di sisi lain, berpartisipasi sebagai validator juga membuka jalan baru bagi pengguna untuk menyerang jaringan demi keuntungan pribadi atau sabotase. Untuk mencegah hal ini, validator akan kehilangan hadiah ETH jika mereka gagal berpartisipasi saat dipanggil, dan stake mereka yang ada dapat dihancurkan jika mereka berperilaku tidak jujur. Dua perilaku utama yang dapat dianggap tidak jujur: mengusulkan beberapa blok dalam satu slot (equivocating) dan mengirimkan pengesahan yang kontradiktif.

Jumlah ETH yang dipotong bergantung pada berapa banyak validator yang juga dipotong pada waktu yang hampir bersamaan. Ini dikenal sebagai ["hukuman korelasi" (correlation penalty)](https://eth2book.info/bellatrix/part2/incentives/slashing#the-correlation-penalty), dan bisa jadi kecil (\~1% stake untuk satu validator yang dipotong sendirian) atau dapat mengakibatkan 100% stake validator dihancurkan (peristiwa pemotongan massal). Ini dikenakan di pertengahan periode keluar paksa yang dimulai dengan penalti langsung (hingga 1 ETH) pada Hari ke-1, hukuman korelasi pada Hari ke-18, dan akhirnya, pengeluaran dari jaringan pada Hari ke-36. Mereka menerima penalti pengesahan kecil setiap hari karena mereka hadir di jaringan tetapi tidak mengirimkan suara. Semua ini berarti serangan terkoordinasi akan sangat mahal bagi penyerang.

## Pilihan fork {#fork-choice}

Ketika jaringan berkinerja secara optimal dan jujur, hanya akan ada satu blok baru di kepala rantai, dan semua validator mengesahkannya. Namun, ada kemungkinan bagi validator untuk memiliki pandangan yang berbeda tentang kepala rantai karena latensi jaringan atau karena pengusul blok telah melakukan equivocate (mengusulkan lebih dari satu blok). Oleh karena itu, klien konsensus memerlukan algoritma untuk memutuskan mana yang akan didukung. Algoritma yang digunakan dalam proof-of-stake Ethereum disebut [LMD-GHOST](https://arxiv.org/pdf/2003.03052.pdf), dan ini bekerja dengan mengidentifikasi fork yang memiliki bobot pengesahan terbesar dalam sejarahnya.

## Proof-of-stake dan keamanan {#pos-and-security}

Ancaman [serangan 51%](https://www.investopedia.com/terms/1/51-attack.asp) masih ada pada proof-of-stake seperti halnya pada proof-of-work, tetapi ini bahkan lebih berisiko bagi para penyerang. Seorang penyerang akan membutuhkan 51% dari ETH yang di-stake. Mereka kemudian dapat menggunakan pengesahan mereka sendiri untuk memastikan fork pilihan mereka adalah yang memiliki pengesahan terakumulasi paling banyak. 'Bobot' dari pengesahan yang terakumulasi adalah apa yang digunakan klien konsensus untuk menentukan rantai yang benar, sehingga penyerang ini akan dapat menjadikan fork mereka sebagai yang kanonikal. Namun, kekuatan proof-of-stake dibandingkan proof-of-work adalah bahwa komunitas memiliki fleksibilitas dalam melancarkan serangan balik. Misalnya, validator yang jujur dapat memutuskan untuk terus membangun di rantai minoritas dan mengabaikan fork penyerang sambil mendorong aplikasi, bursa, dan kolam (pool) untuk melakukan hal yang sama. Mereka juga dapat memutuskan untuk secara paksa menghapus penyerang dari jaringan dan menghancurkan ETH yang mereka stake. Ini adalah pertahanan ekonomi yang kuat terhadap serangan 51%.

Di luar serangan 51%, aktor jahat mungkin juga mencoba jenis aktivitas berbahaya lainnya, seperti:

- serangan jarak jauh (meskipun alat finalitas menetralkan vektor serangan ini)
- 'reorg' jarak pendek (meskipun pendorong pengusul dan tenggat waktu pengesahan memitigasi hal ini)
- serangan memantul dan menyeimbangkan (juga dimitigasi oleh pendorong pengusul, dan serangan ini bagaimanapun juga hanya ditunjukkan di bawah kondisi jaringan yang diidealkan)
- serangan longsoran (dinetralkan oleh aturan algoritma pilihan fork yang hanya mempertimbangkan pesan terbaru)

Secara keseluruhan, proof-of-stake, seperti yang diterapkan di Ethereum, telah terbukti lebih aman secara ekonomi daripada proof-of-work.

## Kelebihan dan kekurangan {#pros-and-cons}

| Kelebihan                                                                                                                                                                                                           | Kekurangan                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Mengunci memudahkan individu untuk berpartisipasi dalam mengamankan jaringan, mempromosikan desentralisasi. Node validator dapat dijalankan di laptop biasa. Kolam staking memungkinkan pengguna untuk melakukan stake tanpa memiliki 32 ETH. | Proof-of-stake lebih muda dan kurang teruji dalam pertempuran dibandingkan dengan proof-of-work |
| Mengunci lebih terdesentralisasi. Skala ekonomi tidak berlaku dengan cara yang sama seperti pada penambangan PoW.                                                                                                         | Proof-of-stake lebih kompleks untuk diimplementasikan daripada proof-of-work                          |
| Proof-of-stake menawarkan keamanan kripto-ekonomi yang lebih besar daripada proof-of-work                                                                                                                                           | Pengguna perlu menjalankan tiga perangkat lunak untuk berpartisipasi dalam proof-of-stake Ethereum. |
| Lebih sedikit penerbitan ETH baru yang diperlukan untuk memberi insentif kepada peserta jaringan                                                                                                                                            |                                                                                         |

### Perbandingan dengan proof-of-work {#comparison-to-proof-of-work}

Ethereum awalnya menggunakan proof-of-work tetapi beralih ke proof-of-stake pada September 2022. PoS menawarkan beberapa keuntungan dibandingkan PoW, seperti:

- efisiensi energi yang lebih baik – tidak perlu menggunakan banyak energi untuk komputasi proof-of-work
- hambatan masuk yang lebih rendah, persyaratan perangkat keras yang berkurang – tidak perlu perangkat keras elit untuk memiliki peluang membuat blok baru
- pengurangan risiko sentralisasi – proof-of-stake seharusnya mengarah pada lebih banyak node yang mengamankan jaringan
- karena kebutuhan energi yang rendah, lebih sedikit penerbitan ETH yang diperlukan untuk memberi insentif partisipasi
- penalti ekonomi untuk perilaku buruk membuat serangan gaya 51% lebih mahal bagi penyerang dibandingkan dengan proof-of-work
- komunitas dapat menggunakan pemulihan sosial dari rantai yang jujur jika serangan 51% berhasil mengatasi pertahanan kripto-ekonomi.

## Bacaan lebih lanjut {#further-reading}

- [FAQ Proof of Stake](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html) _Vitalik Buterin_
- [Apa itu Proof of Stake](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ConsenSys_
- [Apa Itu Proof of Stake Dan Mengapa Itu Penting](https://bitcoinmagazine.com/culture/what-proof-of-stake-is-and-why-it-matters-1377531463) _Vitalik Buterin_
- [Mengapa Proof of Stake (Nov 2020)](https://vitalik.eth.limo/general/2020/11/06/pos2020.html) _Vitalik Buterin_
- [Proof of Stake: Bagaimana Saya Belajar Mencintai Subjektivitas Lemah](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity) _Vitalik Buterin_
- [Serangan dan pertahanan Ethereum proof-of-stake](https://mirror.xyz/jmcook.eth/YqHargbVWVNRQqQpVpzrqEQ8IqwNUJDIpwRP7SS5FXs)
- [Filosofi Desain Proof of Stake](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51) _Vitalik Buterin_
- [Video: Vitalik Buterin menjelaskan proof-of-stake kepada Lex Fridman](https://www.youtube.com/watch?v=3yrqBG-7EVE)

## Topik terkait {#related-topics}

- [Proof-of-work](/developers/docs/consensus-mechanisms/pow/)
- [Proof-of-authority](/developers/docs/consensus-mechanisms/poa/)