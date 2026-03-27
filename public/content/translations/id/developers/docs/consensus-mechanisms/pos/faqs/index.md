---
title: Pertanyaan yang Sering Diajukan
description: Pertanyaan yang sering diajukan tentang proof-of-stake Ethereum.
lang: id
---

## Apa itu proof-of-stake {#what-is-proof-of-stake}

Proof-of-stake adalah kelas algoritma yang dapat memberikan keamanan pada blockchain dengan memastikan bahwa aset bernilai akan hilang oleh penyerang yang bertindak tidak jujur. Sistem proof-of-stake memerlukan sekumpulan validator untuk menyediakan sejumlah aset yang dapat dihancurkan jika validator tersebut terlibat dalam perilaku tidak jujur yang dapat dibuktikan. Ethereum menggunakan mekanisme konsensus proof-of-stake untuk mengamankan blockchain.

## Bagaimana perbandingan proof-of-stake dengan proof-of-work? {#comparison-to-proof-of-work}

Baik proof-of-work maupun proof-of-stake adalah mekanisme yang secara ekonomi memberikan disinsentif kepada pelaku jahat agar tidak melakukan spam atau menipu jaringan. Dalam kedua kasus tersebut, node yang secara aktif berpartisipasi dalam konsensus menempatkan sejumlah aset "ke dalam jaringan" yang akan hilang jika mereka berperilaku buruk.

Dalam proof-of-work, aset ini adalah energi. Node, yang dikenal sebagai penambang, menjalankan algoritma yang bertujuan untuk menghitung suatu nilai lebih cepat daripada node lainnya. Node tercepat memiliki hak untuk mengusulkan blok ke rantai. Untuk mengubah riwayat rantai atau mendominasi usulan blok, seorang penambang harus memiliki daya komputasi yang sangat besar sehingga mereka selalu memenangkan perlombaan. Hal ini sangat mahal dan sulit untuk dieksekusi, sehingga melindungi rantai dari serangan. Energi yang dibutuhkan untuk "menambang" menggunakan proof-of-work adalah aset dunia nyata yang dibayar oleh para penambang.

Proof-of-stake mengharuskan node, yang dikenal sebagai validator, untuk secara eksplisit mengirimkan aset kripto ke kontrak pintar. Jika validator berperilaku buruk, kripto ini dapat dihancurkan karena mereka "mengunci" aset mereka secara langsung ke dalam rantai alih-alih secara tidak langsung melalui pengeluaran energi.

Proof-of-work jauh lebih haus energi karena listrik dibakar dalam proses penambangan. Di sisi lain, proof-of-stake hanya membutuhkan jumlah energi yang sangat kecil - validator Ethereum bahkan dapat berjalan pada perangkat berdaya rendah seperti Raspberry Pi. Mekanisme proof-of-stake Ethereum dianggap lebih aman daripada proof-of-work karena biaya untuk menyerang lebih besar, dan konsekuensi bagi penyerang lebih parah.

Proof-of-work versus proof-of-stake adalah topik yang sering diperdebatkan. [Blog Vitalik Buterin](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-are-the-benefits-of-proof-of-stake-as-opposed-to-proof-of-work) dan debat antara Justin Drake dan Lyn Alden memberikan ringkasan argumen yang baik.

<YouTube id="1m12zgJ42dI" />

## Apakah proof-of-stake hemat energi? {#is-pos-energy-efficient}

Ya. Node di jaringan proof-of-stake menggunakan jumlah energi yang sangat kecil. Sebuah studi pihak ketiga menyimpulkan bahwa seluruh jaringan proof-of-stake Ethereum mengonsumsi sekitar 0,0026 TWh/tahun - sekitar 13.000x lebih sedikit daripada bermain game di AS saja.

[Lebih lanjut tentang konsumsi energi Ethereum](/energy-consumption/).

## Apakah proof-of-stake aman? {#is-pos-secure}

Proof-of-stake Ethereum sangat aman. Mekanisme ini diteliti, dikembangkan, dan diuji secara ketat selama delapan tahun sebelum ditayangkan. Jaminan keamanannya berbeda dari blockchain proof-of-work. Dalam proof-of-stake, validator yang jahat dapat dihukum secara aktif ("dipotong") dan dikeluarkan dari kumpulan validator, yang mengorbankan sejumlah besar ETH. Di bawah proof-of-work, penyerang dapat terus mengulangi serangan mereka selama mereka memiliki kekuatan hash yang cukup. Juga lebih mahal untuk melancarkan serangan yang setara pada proof-of-stake Ethereum daripada di bawah proof-of-work. Untuk memengaruhi keaktifan rantai, setidaknya 33% dari total ether yang dikunci di jaringan diperlukan (kecuali dalam kasus serangan yang sangat canggih dengan kemungkinan keberhasilan yang sangat rendah). Untuk mengontrol isi blok di masa depan, setidaknya 51% dari total ETH yang dikunci diperlukan, dan untuk menulis ulang riwayat, lebih dari 66% dari total stake diperlukan. Protokol Ethereum akan menghancurkan aset-aset ini dalam skenario serangan 33% atau 51% dan melalui konsensus sosial dalam skenario serangan 66%.

- [Lebih lanjut tentang mempertahankan proof-of-stake Ethereum dari penyerang](/developers/docs/consensus-mechanisms/pos/attack-and-defense)
- [Lebih lanjut tentang desain proof-of-stake](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)

## Apakah proof-of-stake membuat Ethereum lebih murah? {#does-pos-make-ethereum-cheaper}

Tidak. Biaya untuk mengirim transaksi (biaya gas) ditentukan oleh pasar biaya dinamis yang meningkat seiring dengan bertambahnya permintaan jaringan. Mekanisme konsensus tidak secara langsung memengaruhi hal ini.

[Lebih lanjut tentang gas](/developers/docs/gas).

## Apa itu node, klien, dan validator? {#what-are-nodes-clients-and-validators}

Node adalah komputer yang terhubung ke jaringan Ethereum. Klien adalah perangkat lunak yang mereka jalankan yang mengubah komputer menjadi node. Ada dua jenis klien: klien eksekusi dan klien konsensus. Keduanya diperlukan untuk membuat node. Validator adalah tambahan opsional untuk klien konsensus yang memungkinkan node untuk berpartisipasi dalam konsensus proof-of-stake. Ini berarti membuat dan mengusulkan blok ketika dipilih dan melakukan pengesahan terhadap blok yang mereka dengar di jaringan. Untuk menjalankan validator, operator node harus menyetorkan 32 ETH ke dalam kontrak deposit.

- [Lebih lanjut tentang node dan klien](/developers/docs/nodes-and-clients)
- [Lebih lanjut tentang mengunci](/staking)

## Apakah proof-of-stake adalah ide baru? {#is-pos-new}

Tidak. Seorang pengguna di BitcoinTalk [mengusulkan ide dasar proof-of-stake](https://bitcointalk.org/index.php?topic=27787.0) sebagai peningkatan untuk Bitcoin pada tahun 2011. Butuh sebelas tahun sebelum siap diimplementasikan di Mainnet Ethereum. Beberapa rantai lain mengimplementasikan proof-of-stake lebih awal dari Ethereum, tetapi bukan mekanisme spesifik Ethereum (yang dikenal sebagai Gasper).

## Apa yang istimewa dari proof-of-stake Ethereum? {#why-is-ethereum-pos-special}

Mekanisme proof-of-stake Ethereum unik dalam desainnya. Ini bukan mekanisme proof-of-stake pertama yang dirancang dan diimplementasikan, tetapi ini yang paling kuat. Mekanisme proof-of-stake ini dikenal sebagai "Casper". Casper mendefinisikan bagaimana validator dipilih untuk mengusulkan blok, bagaimana dan kapan pengesahan dibuat, bagaimana pengesahan dihitung, hadiah dan penalti yang diberikan kepada validator, kondisi pemotongan, mekanisme keamanan kegagalan seperti kebocoran ketidakaktifan, dan kondisi untuk "finalitas". Finalitas adalah kondisi bahwa agar sebuah blok dianggap sebagai bagian permanen dari rantai kanonik, blok tersebut harus telah dipilih oleh setidaknya 66% dari total ETH yang dikunci di jaringan. Para peneliti mengembangkan Casper secara khusus untuk Ethereum, dan Ethereum adalah blockchain pertama dan satu-satunya yang telah mengimplementasikannya.

Selain Casper, proof-of-stake Ethereum menggunakan algoritma pilihan fork yang disebut LMD-GHOST. Ini diperlukan jika muncul kondisi di mana ada dua blok untuk slot yang sama. Hal ini menciptakan dua fork dari blockchain. LMD-GHOST memilih salah satu yang memiliki "bobot" pengesahan terbesar. Bobot tersebut adalah jumlah pengesahan yang ditimbang berdasarkan saldo efektif dari validator. LMD-GHOST unik untuk Ethereum.

Kombinasi Casper dan LMD_GHOST dikenal sebagai Gasper.

[Lebih lanjut tentang Gasper](/developers/docs/consensus-mechanisms/pos/gasper/)

## Apa itu pemotongan? {#what-is-slashing}

Pemotongan adalah istilah yang diberikan untuk penghancuran sebagian dari stake validator dan pengeluaran validator dari jaringan. Jumlah ETH yang hilang dalam pemotongan berskala dengan jumlah validator yang dipotong - ini berarti validator yang berkolusi dihukum lebih berat daripada individu.

[Lebih lanjut tentang pemotongan](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties#slashing)

## Mengapa validator membutuhkan 32 ETH? {#why-32-eth}

Validator harus mengunci ETH sehingga mereka memiliki sesuatu yang akan hilang jika mereka berperilaku buruk. Alasan mengapa mereka harus mengunci 32 ETH secara khusus adalah untuk memungkinkan node berjalan pada perangkat keras yang sederhana. Jika minimum ETH per validator lebih rendah, maka jumlah validator dan karenanya jumlah pesan yang harus diproses di setiap slot akan meningkat, yang berarti perangkat keras yang lebih kuat akan diperlukan untuk menjalankan node.

## Bagaimana validator dipilih? {#how-are-validators-selected}

Satu validator dipilih secara pseudo-acak untuk mengusulkan blok di setiap slot menggunakan algoritma yang disebut RANDAO yang mencampur hash dari pengusul blok dengan seed yang diperbarui setiap blok. Nilai ini digunakan untuk memilih validator tertentu dari total kumpulan validator. Pemilihan validator ditetapkan dua epoch sebelumnya.

[Lebih lanjut tentang pemilihan validator](/developers/docs/consensus-mechanisms/pos/block-proposal)

## Apa itu stake grinding? {#what-is-stake-grinding}

Stake grinding adalah kategori serangan pada jaringan proof-of-stake di mana penyerang mencoba membiaskan algoritma pemilihan validator untuk menguntungkan validator mereka sendiri. Serangan stake grinding pada RANDAO membutuhkan sekitar setengah dari total ETH yang dikunci.

[Lebih lanjut tentang stake grinding](https://eth2book.info/altair/part2/building_blocks/randomness/#randao-biasability)

## Apa itu pemotongan sosial? {#what-is-social-slashing}

Pemotongan sosial adalah kemampuan komunitas untuk mengoordinasikan fork dari blockchain sebagai respons terhadap serangan. Ini memungkinkan komunitas untuk pulih dari penyerang yang memfinalisasi rantai yang tidak jujur. Pemotongan sosial juga dapat digunakan untuk melawan serangan penyensoran.

- [Lebih lanjut tentang pemotongan sosial](https://ercwl.medium.com/the-case-for-social-slashing-59277ff4d9c7)
- [Vitalik Buterin tentang pemotongan sosial](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)

## Apakah saya akan dipotong? {#will-i-get-slashed}

Sebagai validator, sangat sulit untuk dipotong kecuali Anda sengaja terlibat dalam perilaku jahat. Pemotongan hanya diimplementasikan dalam skenario yang sangat spesifik di mana validator mengusulkan beberapa blok untuk slot yang sama atau bertentangan dengan diri mereka sendiri dengan pengesahan mereka - hal ini sangat tidak mungkin terjadi secara tidak sengaja.

[Lebih lanjut tentang kondisi pemotongan](https://eth2book.info/altair/part2/incentives/slashing)

## Apa itu masalah nothing-at-stake? {#what-is-nothing-at-stake-problem}

Masalah nothing-at-stake adalah masalah konseptual dengan beberapa mekanisme proof-of-stake di mana hanya ada hadiah dan tidak ada penalti. Jika tidak ada yang dipertaruhkan, validator yang pragmatis akan sama senangnya untuk mengesahkan salah satu, atau bahkan beberapa, fork dari blockchain, karena ini meningkatkan hadiah mereka. Ethereum mengatasi hal ini menggunakan kondisi finalitas dan pemotongan untuk memastikan satu rantai kanonik.

[Lebih lanjut tentang masalah nothing-at-stake](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed)

## Apa itu algoritma pilihan fork? {#what-is-a-fork-choice-algorithm}

Algoritma pilihan fork mengimplementasikan aturan yang menentukan rantai mana yang merupakan rantai kanonik. Di bawah kondisi optimal, tidak diperlukan aturan pilihan fork karena hanya ada satu pengusul blok per slot dan satu blok untuk dipilih. Namun, kadang-kadang, beberapa blok untuk slot yang sama atau informasi yang datang terlambat mengarah pada beberapa opsi tentang bagaimana blok di dekat kepala rantai diatur. Dalam kasus ini, semua klien harus mengimplementasikan beberapa aturan secara identik untuk memastikan mereka semua memilih urutan blok yang benar. Algoritma pilihan fork menyandikan aturan-aturan ini.

Algoritma pilihan fork Ethereum disebut LMD-GHOST. Algoritma ini memilih fork dengan bobot pengesahan terbesar, yang berarti fork yang paling banyak dipilih oleh ETH yang dikunci.

[Lebih lanjut tentang LMD-GHOST](/developers/docs/consensus-mechanisms/pos/gasper/#fork-choice)

## Apa itu finalitas dalam proof-of-stake? {#what-is-finality}

Finalitas dalam proof-of-stake adalah jaminan bahwa blok tertentu adalah bagian permanen dari rantai kanonik dan tidak dapat dikembalikan kecuali ada kegagalan konsensus di mana penyerang membakar 33% dari total ether yang dikunci. Ini adalah finalitas "kripto-ekonomi", berbeda dengan "finalitas probabilistik" yang relevan dengan blockchain proof-of-work. Dalam finalitas probabilistik, tidak ada status difinalisasi/tidak difinalisasi yang eksplisit untuk blok - hanya menjadi semakin kecil kemungkinannya bahwa sebuah blok dapat dihapus dari rantai seiring bertambahnya usia, dan pengguna menentukan sendiri kapan mereka cukup yakin bahwa sebuah blok "aman". Dengan finalitas kripto-ekonomi, pasangan blok pos pemeriksaan harus dipilih oleh 66% dari ether yang dikunci. Jika kondisi ini terpenuhi, blok di antara pos pemeriksaan tersebut secara eksplisit "difinalisasi".

[Lebih lanjut tentang finalitas](/developers/docs/consensus-mechanisms/pos/#finality)

## Apa itu "subjektivitas lemah"? {#what-is-weak-subjectivity}

Subjektivitas lemah adalah fitur dari jaringan proof-of-stake di mana informasi sosial digunakan untuk mengonfirmasi status blockchain saat ini. Node baru atau node yang bergabung kembali dengan jaringan setelah offline untuk waktu yang lama dapat diberikan status terbaru sehingga node dapat segera melihat apakah mereka berada di rantai yang benar. Status ini dikenal sebagai "pos pemeriksaan subjektivitas lemah" dan dapat diperoleh dari operator node lain di luar pita (out-of-band), atau dari penjelajah blok, atau dari beberapa titik akhir publik.

[Lebih lanjut tentang subjektivitas lemah](/developers/docs/consensus-mechanisms/pos/weak-subjectivity)

## Apakah proof-of-stake tahan terhadap penyensoran? {#is-pos-censorship-resistant}

Ketahanan terhadap penyensoran saat ini sulit dibuktikan. Namun, tidak seperti proof-of-work, proof-of-stake menawarkan opsi untuk mengoordinasikan pemotongan untuk menghukum validator yang menyensor. Ada perubahan mendatang pada protokol yang memisahkan pembuat blok dari pengusul blok dan mengimplementasikan daftar transaksi yang harus disertakan pembuat di setiap blok. Proposal ini dikenal sebagai pemisahan pengusul-pembuat dan membantu mencegah validator menyensor transaksi.

[Lebih lanjut tentang pemisahan pengusul-pembuat](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Original-basic-scheme)

## Bisakah sistem proof-of-stake Ethereum terkena serangan 51%? {#pos-51-attack}

Ya. Proof-of-stake rentan terhadap serangan 51%, sama seperti proof-of-work. Alih-alih penyerang membutuhkan 51% dari kekuatan hash jaringan, penyerang membutuhkan 51% dari total ETH yang dikunci. Penyerang yang mengumpulkan 51% dari total stake dapat mengontrol algoritma pilihan fork. Hal ini memungkinkan penyerang untuk menyensor transaksi tertentu, melakukan reorganisasi jarak pendek, dan mengekstraksi nilai ekstraksi maksimum dengan menyusun ulang blok untuk keuntungan mereka.

[Lebih lanjut tentang serangan pada proof-of-stake](/developers/docs/consensus-mechanisms/pos/attack-and-defense)

## Apa itu koordinasi sosial, dan mengapa itu dibutuhkan? {#what-is-social-coordination}

Koordinasi sosial adalah garis pertahanan terakhir untuk Ethereum yang akan memungkinkan rantai yang jujur dipulihkan dari serangan yang memfinalisasi blok yang tidak jujur. Dalam kasus ini, komunitas Ethereum harus berkoordinasi "di luar pita" (out-of-band) dan setuju untuk menggunakan fork minoritas yang jujur, memotong validator penyerang dalam prosesnya. Hal ini akan mengharuskan aplikasi dan bursa untuk mengenali fork yang jujur juga.

[Baca lebih lanjut tentang koordinasi sosial](/developers/docs/consensus-mechanisms/pos/attack-and-defense#people-the-last-line-of-defense)

## Apakah yang kaya semakin kaya dalam proof-of-stake? {#do-rich-get-richer}

Semakin banyak ETH yang harus dikunci seseorang, semakin banyak validator yang dapat mereka jalankan, dan semakin banyak hadiah yang dapat mereka kumpulkan. Hadiah berskala linier dengan jumlah ETH yang dikunci, dan setiap orang mendapatkan persentase pengembalian yang sama. Proof-of-work memperkaya orang kaya lebih dari proof-of-stake karena penambang yang lebih kaya yang membeli perangkat keras dalam skala besar mendapat manfaat dari skala ekonomi, yang berarti hubungan antara kekayaan dan hadiah bersifat non-linier.

## Apakah proof-of-stake lebih terpusat daripada proof-of-work? {#is-pos-decentralized}

Tidak, proof-of-work cenderung ke arah sentralisasi karena biaya penambangan meningkat dan menyingkirkan individu, kemudian menyingkirkan perusahaan kecil, dan seterusnya. Masalah saat ini dengan proof-of-stake adalah pengaruh derivatif staking likuid (LSD). Ini adalah token yang mewakili ETH yang dikunci oleh beberapa penyedia yang dapat ditukar oleh siapa saja di pasar sekunder tanpa ETH yang sebenarnya ditarik. LSD memungkinkan pengguna untuk mengunci dengan kurang dari 32 ETH, tetapi mereka juga menciptakan risiko sentralisasi di mana beberapa organisasi besar pada akhirnya dapat mengendalikan sebagian besar stake. Inilah sebabnya mengapa [solo staking](/staking/solo) adalah opsi terbaik untuk Ethereum.

[Lebih lanjut tentang sentralisasi stake di LSD](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Mengapa saya hanya bisa mengunci ETH? {#why-can-i-only-stake-eth}

ETH adalah mata uang asli Ethereum. Sangat penting untuk memiliki mata uang tunggal di mana semua stake didenominasi, baik untuk memperhitungkan saldo efektif untuk menimbang suara maupun keamanan. ETH itu sendiri adalah komponen fundamental dari Ethereum daripada kontrak pintar. Memasukkan mata uang lain akan secara signifikan meningkatkan kompleksitas dan menurunkan keamanan staking.

## Apakah Ethereum satu-satunya blockchain proof-of-stake? {#is-ethereum-the-only-pos-blockchain}

Tidak, ada beberapa blockchain proof-of-stake. Tidak ada yang identik dengan Ethereum; mekanisme proof-of-stake Ethereum itu unik.

## Apa itu The Merge? {#what-is-the-merge}

The Merge adalah momen ketika Ethereum mematikan mekanisme konsensus berbasis proof-of-work dan menyalakan mekanisme konsensus berbasis proof-of-stake. The Merge terjadi pada 15 September 2022.

[Lebih lanjut tentang The Merge](/roadmap/merge)

## Apa itu keaktifan dan keamanan? {#what-are-liveness-and-safety}

Keaktifan dan keamanan adalah dua masalah keamanan mendasar untuk blockchain. Keaktifan adalah ketersediaan rantai yang memfinalisasi. Jika rantai berhenti memfinalisasi atau pengguna tidak dapat mengaksesnya dengan mudah, itu adalah kegagalan keaktifan. Biaya akses yang sangat tinggi juga dapat dianggap sebagai kegagalan keaktifan. Keamanan mengacu pada seberapa sulit untuk menyerang rantai - yaitu, memfinalisasi pos pemeriksaan yang saling bertentangan.

[Baca lebih lanjut di makalah Casper](https://arxiv.org/pdf/1710.09437.pdf)