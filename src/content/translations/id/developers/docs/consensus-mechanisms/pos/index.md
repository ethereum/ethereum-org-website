---
title: Bukti Taruhan (PoS)
description: Penjelasan tentang protokol konsensus proof-of-stake dan perannya dalam Ethereum.
lang: id
incomplete: true
---

Ethereum beralih ke metode konsensus yang disebut bukti taruhan (PoS) dari [bukti kerja (PoW)](/developers/docs/consensus-mechanisms/pow/). Ini selalu menjadi rencana kami karena merupakan bagian penting dalam strategi komunitas untuk menskalakan Ethereum melalui [peningkatan](/roadmap/). Namun membuat PoS beroperasi dengan baik adalah tantangan teknis yang besar dan tidak semudah menggunakan PoW untuk mencapai konsensus di seluruh jaringan.

## Prasyarat {#prerequisites}

Untuk lebih memahami halaman ini, sebaiknya Anda membaca [mekanisme konsensus](/developers/docs/consensus-mechanisms/) terlebih dahulu.

## Apa itu bukti taruhan (PoS)? {#what-is-pos}

Bukti taruhan adalah jenis [mekanisme konsensus](/developers/docs/consensus-mechanisms/) yang digunakan oleh jaringan blockchain untuk mencapai konsensus terdistribusi.

Ini mengharuskan pengguna mempertaruhkan ETH mereka untuk menjadi validator di jaringan. Validator bertanggung jawab atas hal yang sama seperti penambang di [bukti kerja](/developers/docs/consensus-mechanisms/pow/): memesan transaksi dan membuat blok baru sehingga semua node dapat berkesusaian dengan state jaringan.

Bukti taruhan hadir dengan sejumlah peningkatan pada sistem bukti kerja:

- efisiensi energi yang lebih baik - Anda tidak perlu menggunakan banyak blok penambangan energi
- hambatan masuk yang lebih rendah, persyaratan perangkat keras yang berkurang – Anda tidak memerlukan perangkat keras elit untuk mendapat peluang membuat blok baru
- kekebalan yang lebih kuat terhadap sentralisasi - bukti taruhan harus mengarah ke lebih banyak node di jaringan
- dukungan yang lebih kuat untuk [rantai shard](/roadmap/danksharding/) – sebuah peningkatan kunci dalam perluasan jaringan Ethereum

## Bukti taruhan, penaruhan, dan validator {#pos-staking-validators}

Bukti taruhan adalah mekanisme yang mendasari yang mengaktifkan validator setelah menerima cukup penaruhan. Untuk Ethereum, pengguna harus menaruhkan 32 ETH untuk menjadi validator. Validator dipilih secara acak untuk membuat blok dan bertanggung jawab untuk memeriksa dan mengonfirmasi blok yang tidak mereka buat. Taruhan pengguna juga digunakan sebagai cara untuk mendorong perilaku validasi yang baik. Misalnya, pengguna dapat kehilangan sebagian dari taruhan mereka karena beberapa hal seperti masuk dalam mode offline (gagal divalidasi), atau seluruh taruhan mereka karena kolusi yang disengaja.

## Bagaimana cara kerja bukti taruhan Ethereum? {#how-does-pos-work}

Tidak seperti bukti kerja, validator tidak perlu menggunakan daya komputasi dalam jumlah besar karena dipilih secara acak dan tidak bersaing dengan validator lainnya. Mereka tidak perlu menambang blok; mereka hanya perlu membuat blok saat ditugaskan dan memvalidasi blok yang diusulkan saat tidak bertugas. Validasi ini dikenal sebagai pengesahan. Anda dapat menganggap pengesahan seperti mengatakan "blok ini tampak bagus untuk saya." Validator mendapatkan imbalan karena mengusulkan blok baru dan karena mengesahkan blok yang telah mereka periksa.

Jika Anda melakukan pengesahan terhadap blok jahat, Anda akan kehilangan taruhan Anda.

### Rantai suar {#the-beacon-chain}

Ketika Ethereum menggantikan bukti kerja dengan bukti taruhan, akan ada kompleksitas tambahan dari [rantai shard](/roadmap/danksharding/). Ini adalah blockchain terpisah yang membutuhkan validator untuk memproses transaksi dan membuat blok baru. Rencananya adalah memiliki 64 rantai shard dan mereka semua membutuhkan pemahaman bersama tentang keadaan jaringan. Akibatnya, diperlukan koordinasi ekstra dan akan dilakukan oleh [rantai suar](/roadmap/beacon-chain/).

Rantai suar menerima informasi state dari shard dan membuatnya tersedia untuk shard lainnya, sehingga jaringan dapat terus disinkronkan. Rantai suar juga akan mengatur validator mulai dari mendaftarkan deposito taruhan mereka hingga menerbitkan imbalan dan penalti mereka.

Begini cara kerja prosesnya.

### Bagaimana cara kerja validasi {#how-does-validation-work}

Saat mengirimkan transaksi di sebuah shard, validator akan bertanggungjawab untuk menambahkan transaksi Anda ke blok shard. Validator akan dipilih secara algortima oleh rantai suar untuk mengajukan blok baru.

#### Pengesahan {#attestation}

Jika validator tidak dipilih untuk mengusulkan blok shard baru, mereka harus mengesahkan proposal validator lain dan mengonfirmasi bahwa semuanya terlihat sebagaimana mestinya. Pengesahanlah yang dicatat dalam rantai suar, bukan transaksi itu sendiri.

Setidaknya 128 validator diperlukan untuk mengesahkan setiap blok shard – ini dikenal sebagai "komite."

Komite memiliki kerangka waktu untuk mengusulkan dan memvalidasi blok shard. Ini dikenal sebagai "slot." Hanya satu blok valid yang dibuat per slot, dan ada 32 slot di dalam sebuah "epoch." Setelah tiap epoch, komite dibubarkan dan direformasi dengan peserta acak yang berbeda. Ini membantu menjaga shard tetap aman dari komite aktor jahat.

#### Tautansilang {#rewards-and-penalties}

Setelah proposal blok shard baru memiliki pengesahan yang cukup, "tautan silang" dibuat yang mengonfirmasi inklusi blok dan transaksi Anda dalam rantai suar.

Setelah ada tautan silang, validator yang mengusulkan blok itu akan mendapatkan imbalannya.

#### Finality {#finality}

Dalam jaringan terdistribusi, transaksi memiliki "finality" jika merupakan bagian dari blok yang tidak dapat diubah.

Untuk melakukannya dalam bukti taruhan, Casper, protokol finality, meminta validator untuk menyetujui state blok di pos pemeriksaan tertentu. Selama 2/3 validator setuju, pemblokiran selesai. Validator akan kehilangan seluruh taruhannya jika mereka mencoba dan mengembalikan ini nanti melalui serangan 51%.

Seperti yang dikatakan Vlad Zamfir, ini seperti penambang yang berpartisipasi dalam serangan 51%, menyebabkan perangkat keras penambangan mereka segera terbakar.

## Bukti taruhan dan keamanan {#pos-and-security}

Ancaman [serangan 51%](https://www.investopedia.com/terms/1/51-attack.asp) masih ada di bukti taruhan, tapi itu bahkan lebih berisiko bagi para penyerang. Untuk melakukannya, Anda harus mengontrol 51% dari ETH yang dipertaruhkan. Bukan hanya karena ini adalah uang yang banyak, tetapi mungkin akan menyebabkan nilai ETH turun. Ada sangat sedikit insentif untuk menghancurkan nilai mata uang yang sebagian besar taruhannya Anda miliki. Ada insentif yang lebih kuat untuk menjaga jaringan tetap aman dan sehat.

Pemotongan penaruhan, pengusiran, dan hukuman lainnya, yang dikoordinasikan oleh rantai suar, akan ada untuk mencegah tindakan perilaku buruk lainnya. Validator juga akan bertanggung jawab untuk menandai insiden ini.

## Pro dan Kontra {#pros-and-cons}

| Pro                                                                                                                                                                                                                                                                                    | Kontra                                                                                                     |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Penaruhan memudahkan Anda menjalankan node. Tidak memerlukan investasi yang sangat besar dalam perangkat keras atau energi, dan jika Anda tidak mempunyai ETH yang cukup untuk ditaruhkan, Anda dapat bergabung dengan pool penaruhan.                                                 | Bukti taruhan masih dalam tahap awal, dan kurang teruji dalam pertempuran, dibandingkan dengan bukti kerja |
| Penaruhan lebih terdesentralisasi. Ini memungkinkan peningkatan partisipasi dan lebih banyak node tidak berarti peningkatan % keuntungan, seperti dengan penambangan.                                                                                                                  |                                                                                                            |
| Penaruhan memungkinkan sharding yang aman. Rantai shard memungkinkan Ethereum untuk membuat beberapa blok pada saat yang sama, meningkatkan throughput. Sharding jaringan dalam sistem bukti kerja hanya akan menurunkan daya yang dibutuhkan untuk mengkompromikan sebagian jaringan. |                                                                                                            |

## Bacaan lebih lanjut {#further-reading}

- [Tanya Jawab tentang Bukti Taruhan](https://vitalik.ca/general/2017/12/31/pos_faq.html) _Vitalik Buterin_
- [Apa itu Bukti Taruhan](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ConsenSys_
- [Apa itu Bukti Taruhan dan Mengapa Ia Penting](https://bitcoinmagazine.com/culture/what-proof-of-stake-is-and-why-it-matters-1377531463) _Vitalik Buterin_
- [Penjelasan Rantai Suar Ethereum 2.0 yang perlu Anda baca terlebih dahulu](https://ethos.dev/beacon-chain/) _Ethos.dev_
- [Mengapa Bukti Taruhan (Nov 2020)](https://vitalik.ca/general/2020/11/06/pos2020.html) _Vitalik Buterin_
- [Bukti Taruhan: Cara Saya Belajar Mencintai Subjektivitas Lemah](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity/) _Vitalik Buterin_
- [Filosofi Rancangan Bukti Taruhan](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51) _Vitalik Buterin_

## Topik Terkait {#related-topics}

- [Bukti kerja](/developers/docs/consensus-mechanisms/pow/)
