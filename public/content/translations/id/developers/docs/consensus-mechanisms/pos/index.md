---
title: Bukti taruhan (PoS)
description: Penjelasan tentang protokol konsensus proof-of-stake dan perannya dalam Ethereum.
lang: id
---

Bukti Taruhan (PoS) mendasari [mekanisme konsensus](/developers/docs/consensus-mechanisms/) Ethereum. Ethereum mengaktifkan mekanisme bukti taruhannya pada tahun 2022 karena lebih aman, tidak terlalu boros energi, dan lebih baik untuk menerapkan solusi penskalaan baru dibandingkan dengan arsitektur [bukti kerja](/developers/docs/consensus-mechanisms/pow) sebelumnya.

## Persyaratan {#prerequisites}

Untuk lebih memahami halaman ini, kami sarankan Anda membaca tentang [mekanisme konsensus](/developers/docs/consensus-mechanisms/) terlebih dahulu.

## Apa itu bukti taruhan (PoS)? {#what-is-pos}

Proof-of-stake adalah cara untuk membuktikan bahwa validator telah menaruh sesuatu yang bernilai ke dalam jaringan yang dapat dihancurkan jika mereka berperilaku tidak jujur. Dalam proof-of-stake Ethereum, validator secara tegas mempertaruhkan modal dalam bentuk ETH ke dalam kontrak pintar di Ethereum. Setelah itu, validator bertanggung jawab untuk memeriksa bahwa blok-blok baru yang tersebar di jaringan adalah valid, dan terkadang mereka juga membuat dan menyebarkan blok-blok baru sendiri. Jika mereka mencoba menipu jaringan (misalnya dengan mengusulkan beberapa blok ketika seharusnya mengirimkan satu blok atau mengirimkan tanda bukti yang bermasalah), sebagian atau seluruh ETH yang mereka pertaruhkan dapat dihancurkan.

## Validator {#validators}

Untuk menjadi validator, pengguna perlu menyetor 32 ETH ke kontrak deposit dan menjalankan tiga jenis perangkat lunak: klien eksekusi, klien konsensus, dan klien validator. Dengan mendepositkan ETH mereka, pengguna bergabung dalam antrian aktivasi yang membatasi laju validator baru yang bergabung dalam jaringan. Setelah diaktifkan, validator menerima blok-blok baru dari rekan-rekan dalam jaringan Ethereum. Transaksi yang disampaikan dalam blok dijalankan ulang untuk memeriksa apakah perubahan yang diusulkan terhadap status Ethereum valid, dan tanda tangan blok diperiksa. Validator kemudian mengirimkan suara (disebut pengesahan) yang mendukung blok tersebut di seluruh jaringan.

Sedangkan di bawah proof-of-work, waktu blok ditentukan oleh tingkat kesulitan penambangan, dalam proof-of-stake, temponya tetap. Waktu dalam proof-of-stake Ethereum dibagi menjadi slot (12 detik) dan jangka waktu (32 slot). Satu validator dipilih secara acak untuk menjadi pengusul blok di setiap slot. Validator ini bertanggung jawab untuk membuat blok baru dan mengirimkannya ke node lain di jaringan. Begitu pula dalam setiap slot, komite validator dipilih secara acak, berdasarkan suara yang digunakan untuk menentukan validitas blok yang diusulkan. Membagi validator yang dibentuk menjadi komite penting untuk menjaga muatan jaringan tetap dapat dikelola. Komite membagi kumpulan validator sehingga setiap validator aktif memberikan kesaksian pada setiap epoch, namun tidak pada setiap slot.

## Bagaimana Transaksi Dieksekusi di Ethereum PoS {#transaction-execution-ethereum-pos}

Berikut ini memberikan penjelasan lengkap tentang bagaimana suatu transaksi dieksekusi dalam Ethereum dengan mekanisme proof-of-stake.

1. Seorang pengguna membuat dan menandatangani [transaksi](/developers/docs/transactions/) dengan kunci pribadi mereka. Ini biasanya ditangani oleh dompet atau pustaka seperti [ethers.js](https://docs.ethers.org/v6/), [web3js](https://docs.web3js.org/), [web3py](https://web3py.readthedocs.io/en/v5/) dll. tetapi di balik layar, pengguna membuat permintaan ke sebuah simpul menggunakan [API JSON-RPC](/developers/docs/apis/json-rpc/) Ethereum. Pengguna menentukan jumlah gas yang siap mereka bayar sebagai tip kepada validator untuk mendorong mereka memasukkan transaksi dalam sebuah blok. [Tip](/developers/docs/gas/#priority-fee) dibayarkan kepada validator sementara [biaya dasar](/developers/docs/gas/#base-fee) dibakar.
2. Transaksi tersebut dikirimkan ke [klien eksekusi](/developers/docs/nodes-and-clients/#execution-client) Ethereum yang memverifikasi validitasnya. Ini berarti memastikan bahwa pengirim memiliki ETH yang cukup untuk memenuhi transaksi dan mereka telah menandatangani itu dengan kunci yang benar.
3. Jika transaksi valid, klien eksekusi akan menambahkannya ke mempool lokalnya (daftar transaksi yang tertunda) dan juga menyebarkannya ke node lain melalui jaringan gosip lapisan eksekusi. Ketika node-node lain mendengar tentang transaksi tersebut, mereka juga akan menambahkannya ke mempool lokal mereka. Pengguna tingkat lanjut mungkin menahan diri untuk tidak menyiarkan transaksi mereka dan sebagai gantinya meneruskannya ke pembangun blok khusus seperti [Flashbots Auction](https://docs.flashbots.net/flashbots-auction/overview). Hal ini memungkinkan mereka untuk mengatur transaksi di blok yang akan datang untuk mendapatkan keuntungan maksimum ([MEV](/developers/docs/mev/#mev-extraction)).
4. Salah satu node validator di jaringan merupakan pengusul blok untuk slot saat ini, setelah terpilih secara acak melalui RANDAO. Node ini bertanggung jawab untuk membangun dan menyiarakan blok berikutnya yang akan ditambahkan ke blockchain Ethereum serta memperbarui status global. Node ini terdiri dari tiga bagian: klien eksekusi, klien konsensus, dan klien validator. Klien eksekusi mengelompokkan transaksi dari mempool lokal ke dalam "payload eksekusi" dan menjalankannya secara lokal untuk menghasilkan perubahan status. Informasi ini diteruskan ke klien konsensus di mana payload eksekusi dikemas sebagai bagian dari "blok beacon" yang juga berisi informasi tentang hadiah, hukuman, pemotongan, pengesahan dan sebagainya yang memungkinkan jaringan untuk sepakat mengenai urutan blok di puncak rantai. Komunikasi antara klien eksekusi dan klien konsensus dijelaskan secara lebih rinci di [Menghubungkan Klien Konsensus dan Klien Eksekusi](/developers/docs/networking-layer/#connecting-clients).
5. Node-node lain menerima blok beacon baru melalui jaringan gossip lapisan konsensus. Mereka meneruskannya ke klien eksekusi mereka di mana transaksi dieksekusi ulang secara lokal untuk memastikan perubahan status yang diusulkan valid. Klien validator kemudian membuktikan bahwa blok tersebut valid dan merupakan blok logis berikutnya dalam pandangan mereka tentang rantai (yang berarti blok tersebut dibangun di atas rantai dengan bobot pengesahan terbesar sebagaimana didefinisikan dalam [aturan pilihan fork](/developers/docs/consensus-mechanisms/pos/#fork-choice)). Blok tersebut ditambahkan ke basis data lokal di setiap node yang membuktikannya.
6. Transaksi dapat dianggap "selesai" jika telah menjadi bagian dari rantai dengan "hubungan supermayoritas" antara dua pos pemeriksaan. Checkpoint terjadi pada awal setiap epoch dan checkpoint ini ada untuk menjelaskan fakta bahwa hanya sebagian validator aktif yang bersaksi di setiap slot, tetapi semua validator aktif bersaksi di setiap epoch. Oleh karena itu, hanya di antara zamanlah 'tautan supermayoritas' dapat didemonstrasikan (di sinilah 66% dari total ETH yang dipertaruhkan di jaringan menyetujui dua pos pemeriksaan).

Detail lebih lanjut tentang finalitas dapat ditemukan di bawah ini.

## Final {#finality}

Sebuah transaksi memiliki "finalitas" dalam jaringan terdistribusi jika transaksi tersebut merupakan bagian dari sebuah blok yang tidak dapat berubah tanpa adanya sejumlah besar ETH yang terbakar. Pada proof-of-stake Ethereum, hal ini dikelola dengan menggunakan blok "checkpoint". Blok pertama di setiap zaman adalah pos pemeriksaan. Validator memilih pasangan pos pemeriksaan yang dianggap valid. Jika sepasang pos pemeriksaan menarik suara yang mewakili setidaknya dua pertiga dari total ETH yang dipertaruhkan, maka pos pemeriksaan akan ditingkatkan. Yang lebih baru dari keduanya (target) menjadi "dibenarkan". Di antara kedua blok tersebut, yang pertama sudah dianggap sah karena menjadi "target" pada epoch sebelumnya. Sekarang blok tersebut ditingkatkan menjadi "difinalisasi". Proses pemutakhiran pos pemeriksaan ini ditangani oleh **[Casper the Friendly Finality Gadget (Casper-FFG)](https://arxiv.org/pdf/1710.09437)**. Casper-FFG adalah perangkat finalitas blok untuk konsensus. Setelah sebuah blok difinalisasi, blok tersebut tidak dapat dikembalikan atau diubah tanpa pemotongan mayoritas penaruh, membuatnya tidak dapat berjalan secara ekonomi.

Untuk mengembalikan blok yang telah difinalisasi, seorang penyerang harus bersedia kehilangan setidaknya sepertiga dari total pasokan ETH yang telah distake. Alasan pastinya dijelaskan dalam [postingan blog Ethereum Foundation](https://blog.ethereum.org/2016/05/09/on-settlement-finality/) ini. Karena finalitas membutuhkan mayoritas dua pertiga, penyerang dapat mencegah jaringan mencapai finalitas dengan memberikan suara sepertiga dari total saham. Ada sebuah mekanisme untuk bertahan melawan ini: [kebocoran ketidakaktifan](https://eth2book.info/bellatrix/part2/incentives/inactivity). Mekanisme ini diaktifkan ketika rantai gagal difinalisasi selama lebih dari empat epoch. Kebocoran ketidakaktifan akan mengurangi ETH yang telah distake dari validator yang memberikan suara menentang mayoritas, sehingga memungkinkan mayoritas untuk mendapatkan mayoritas dua pertiga kembali dan menyelesaikan rantai.

## Keamanan Kripto-ekonomi {#crypto-economic-security}

Menjadi validator adalah sebuah komitmen. Validator diharapkan menjaga perangkat keras dan koneksi yang memadai untuk berpartisipasi dalam validasi dan pengajuan blok. Sebagai imbalan, validator dibayar dalam bentuk ETH (saldo staking mereka bertambah). Di sisi lain, berpartisipasi sebagai validator juga membuka peluang baru bagi pengguna untuk menyerang jaringan demi keuntungan pribadi atau sabotase. Untuk mencegah hal ini, validator akan kehilangan imbalan ETH jika mereka gagal berpartisipasi saat dipanggil, dan taruhan yang sudah ada dapat dihapus jika mereka berperilaku tidak jujur. Ada dua perilaku utama yang dapat dianggap tidak jujur: mengajukan beberapa blok dalam satu slot (equivocating) dan mengirimkan pengakuan yang bertentangan.

Jumlah ETH yang dipotong tergantung pada berapa banyak validator yang juga sedang mengalami pemotongan dalam waktu yang hampir bersamaan. Ini dikenal sebagai ["hukuman korelasi"](https://eth2book.info/bellatrix/part2/incentives/slashing#the-correlation-penalty), dan bisa jadi ringan (~1% taruhan untuk satu validator yang dipotong sendiri) atau dapat mengakibatkan 100% taruhan validator dihancurkan (peristiwa pemotongan massal). Ini diberlakukan pada pertengahan periode keluar paksa yang dimulai dengan hukuman langsung (hingga 1 ETH) pada Hari ke 1, hukuman korelasi pada Hari ke 18, dan akhirnya, pengusiran dari jaringan pada Hari ke 36. Mereka menerima hukuman pengakuan kecil setiap hari karena mereka hadir di jaringan tetapi tidak mengirimkan suara. Semua ini berarti serangan yang terkoordinasi akan sangat mahal bagi penyerang.

## Pilihan fork {#fork-choice}

Ketika jaringan berfungsi dengan optimal dan jujur, hanya ada satu blok baru di puncak rantai, dan semua validator memberikan pengakuan terhadapnya. Namun, mungkin bagi validator untuk memiliki pandangan yang berbeda terhadap pencak rantai karena latensi jaringan atau pengaju blok telah melakukan equivocating (mengajukan multiple blok dalam satu slot). Oleh karena itu, klien konsensus memerlukan algoritma untuk memutuskan mana yang harus diutamakan. Algoritma yang digunakan dalam bukti taruhan Ethereum disebut [LMD-GHOST](https://arxiv.org/pdf/2003.03052.pdf), dan bekerja dengan mengidentifikasi fork yang memiliki bobot pengesahan terbesar dalam sejarahnya.

## Bukti taruhan dan keamanan {#pos-and-security}

Ancaman [serangan 51%](https://www.investopedia.com/terms/1/51-attack.asp) masih ada pada bukti taruhan seperti halnya pada bukti kerja, tetapi bahkan lebih berisiko bagi para penyerang. Penyerang akan membutuhkan 51% dari ETH yang dipertaruhkan. Mereka kemudian dapat menggunakan atestasi mereka sendiri untuk memastikan bahwa garpu pilihan mereka adalah garpu yang memiliki akumulasi atestasi paling banyak. 'Bobot' dari akumulasi pengesahan adalah apa yang digunakan oleh klien konsensus untuk menentukan rantai yang benar, sehingga penyerang ini dapat membuat fork mereka menjadi rantai kanonik. Namun, kekuatan dari bukti kepemilikan dibandingkan bukti kerja adalah bahwa komunitas memiliki fleksibilitas dalam melakukan serangan balik. Sebagai contoh, validator yang jujur dapat memutuskan untuk terus membangun rantai minoritas dan mengabaikan fork penyerang sambil mendorong aplikasi, bursa, dan pool untuk melakukan hal yang sama. Mereka juga dapat memutuskan untuk secara paksa menghapus penyerang dari jaringan dan menghancurkan ETH yang mereka pertaruhkan. Ini adalah pertahanan ekonomi yang kuat terhadap serangan 51%.

Selain serangan 51%, penjahat mungkin juga mencoba aktivitas merugikan lainnya, seperti:

- serangan jangka panjang (meskipun gadget finalitas dapat mengatasi jenis serangan ini)
- jangka pendek 'reorganisasi' (meskipun peningkatan pengusul dan tenggat waktu pengesahan mengurangi hal ini)
- serangan memantul dan menyeimbangkan (juga dimitigasi dengan peningkatan pengusul, dan serangan ini hanya didemontrasikan dalam kondisi jaringan yang ideal)
- serangan longsoran salju (dinetralsir oleh aturan algoritma pilihan garpu yang hanya mempertimbangkan pesan terakhir)

Secara keseluruhan, proof-of-stake, seperti yang diimplementasikan di Ethereum, telah terbukti lebih aman secara ekonomi dibandingkan dengan proof-of-work.

## Pro dan kontra {#pros-and-cons}

| Kelebihan                                                                                                                                                                                                                                                                                                 | Kekurangan                                                                                                             |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Staking memudahkan setiap orang untuk berpartisipasi dalam mengamankan jaringan, mempromosikan desentralisasi. node validator dapat dijalankan pada laptop biasa. Staking pool memungkinkan pengguna untuk melakukan staking tanpa harus memiliki 32 ETH. | Bukti kepemilikan lebih muda dan kurang teruji dibandingkan dengan bukti kerja                                         |
| Penaruhan lebih terdesentralisasi. Skala ekonomi tidak berlaku dengan cara yang sama seperti yang berlaku untuk penambangan PoW.                                                                                                                                          | Bukti kepemilikan lebih rumit untuk diimplementasikan dibandingkan dengan bukti kerja                                  |
| Proof-of-stake menawarkan keamanan ekonomi-kripto yang lebih besar daripada proof-of-work                                                                                                                                                                                                                 | Pengguna harus menjalankan tiga perangkat lunak untuk berpartisipasi dalam bukti kepemilikan Ethereum. |
| Lebih sedikit penerbitan ETH baru diperlukan untuk memberi insentif kepada peserta jaringan                                                                                                                                                                                                               |                                                                                                                        |

### Perbandingan dengan bukti kerja {#comparison-to-proof-of-work}

Ethereum awalnya menggunakan bukti kerja tapi berpindah ke bukti taruhan di september 2022. PoS menawarkan beberapa keuntungan dibandingkan dengan PoW, seperti:

- efisiensi energi yang lebih baik - tidak perlu menggunakan banyak energi untuk komputasi proof-of-work
- Hambatan yang lebih rendah untuk masuk, persyaratan perangkat keras yang lebih rendah - tidak perlu perangkat keras elit untuk berpeluang membuat blok baru
- mengurangi risiko sentralisasi - bukti kepemilikan harus mengarah ke lebih banyak node yang mengamankan jaringan
- karena kebutuhan energi yang rendah, penerbitan ETH yang lebih sedikit diperlukan untuk memberi insentif pada partisipasi
- Hukuman ekonomi untuk perilaku buruk membuat 51% serangan gaya lebih mahal bagi penyerang dibandingkan dengan pembuktian kerja
- komunitas dapat menggunakan pemulihan sosial dari rantai yang jujur jika serangan 51% berhasil mengatasi pertahanan ekonomi kripto.

## Bacaan lebih lanjut {#further-reading}

- [FAQ Bukti Taruhan](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html) _Vitalik Buterin_
- [Apa itu Bukti Taruhan](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ConsenSys_
- [Apa Itu Bukti Taruhan dan Mengapa Itu Penting](https://bitcoinmagazine.com/culture/what-proof-of-stake-is-and-why-it-matters-1377531463) _Vitalik Buterin_
- [Mengapa Bukti Taruhan (Nov 2020)](https://vitalik.eth.limo/general/2020/11/06/pos2020.html) _Vitalik Buterin_
- [Bukti Taruhan: Bagaimana Saya Belajar Mencintai Subjektivitas yang Lemah](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity/) _Vitalik Buterin_
- [Serangan dan pertahanan bukti taruhan Ethereum](https://mirror.xyz/jmcook.eth/YqHargbVWVNRQqQpVpzrqEQ8IqwNUJDIpwRP7SS5FXs)
- [Filosofi Desain Bukti Taruhan](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51) _Vitalik Buterin_
- [Video: Vitalik Buterin menjelaskan bukti taruhan kepada Lex Fridman](https://www.youtube.com/watch?v=3yrqBG-7EVE)

## Topik terkait {#related-topics}

- [Proof-of-work](/developers/docs/consensus-mechanisms/pow/)
- [Bukti Otoritas](/developers/docs/consensus-mechanisms/poa/)
