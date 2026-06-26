---
title: Pertanyaan yang Sering Diajukan
description: Pertanyaan yang sering diajukan tentang Bukti Kepemilikan (PoS) Ethereum.
lang: id
---

## Apa itu Bukti Kepemilikan (PoS) {#what-is-proof-of-stake}

Bukti Kepemilikan (PoS) adalah kelas algoritme yang dapat memberikan keamanan pada rantai blok dengan memastikan bahwa aset berharga akan hilang dari penyerang yang bertindak tidak jujur. Sistem Bukti Kepemilikan mewajibkan sekumpulan validator untuk menyediakan sejumlah aset yang dapat dihancurkan jika validator tersebut terbukti terlibat dalam perilaku tidak jujur. Ethereum menggunakan mekanisme konsensus Bukti Kepemilikan untuk mengamankan rantai blok.

## Bagaimana perbandingan Bukti Kepemilikan dengan Bukti Kerja (PoW)? {#comparison-to-proof-of-work}

Baik Bukti Kerja (PoW) maupun Bukti Kepemilikan (PoS) adalah mekanisme yang secara ekonomi mendisinsentifkan aktor jahat dari melakukan spam atau penipuan di jaringan. Dalam kedua kasus tersebut, node yang berpartisipasi aktif dalam konsensus menempatkan sejumlah aset "ke dalam jaringan" yang akan hilang jika mereka berperilaku buruk.

Dalam Bukti Kerja, aset ini adalah energi. Node, yang dikenal sebagai penambang, menjalankan algoritme yang bertujuan untuk menghitung suatu nilai lebih cepat daripada node lainnya. Node tercepat memiliki hak untuk mengusulkan blok ke rantai. Untuk mengubah riwayat rantai atau mendominasi proposal blok, seorang penambang harus memiliki daya komputasi yang sangat besar sehingga mereka selalu memenangkan perlombaan. Hal ini sangat mahal dan sulit untuk dieksekusi, sehingga melindungi rantai dari serangan. Energi yang dibutuhkan untuk "menambang" menggunakan Bukti Kerja adalah aset dunia nyata yang dibayar oleh penambang.

Bukti Kepemilikan mewajibkan node, yang dikenal sebagai validator, untuk secara eksplisit mengirimkan aset kripto ke kontrak pintar. Jika validator berperilaku buruk, kripto ini dapat dihancurkan karena mereka melakukan "staking" aset mereka secara langsung ke dalam rantai, bukan secara tidak langsung melalui pengeluaran energi.

Bukti Kerja jauh lebih haus energi karena listrik dibakar dalam proses penambangan. Sebaliknya, Bukti Kepemilikan hanya membutuhkan jumlah energi yang sangat kecil - validator Ethereum bahkan dapat berjalan pada perangkat berdaya rendah seperti Raspberry Pi. Mekanisme Bukti Kepemilikan Ethereum dianggap lebih aman daripada Bukti Kerja karena biaya untuk menyerang lebih besar, dan konsekuensi bagi penyerang lebih parah.

Bukti Kerja versus Bukti Kepemilikan adalah topik yang kontroversial. [Blog Vitalik Buterin](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-are-the-benefits-of-proof-of-stake-as-opposed-to-proof-of-work) dan debat antara Justin Drake dan Lyn Alden memberikan ringkasan argumen yang baik.

<VideoWatch slug="pow-vs-pos" />

## Apakah Bukti Kepemilikan hemat energi? {#is-pos-energy-efficient}

Ya. Node di jaringan Bukti Kepemilikan menggunakan jumlah energi yang sangat kecil. Sebuah studi pihak ketiga menyimpulkan bahwa seluruh jaringan Bukti Kepemilikan Ethereum mengonsumsi sekitar 0,0026 TWh/tahun - sekitar 13.000x lebih sedikit daripada bermain game di AS saja.

[Lebih lanjut tentang konsumsi energi Ethereum](/energy-consumption/).

## Apakah Bukti Kepemilikan aman? {#is-pos-secure}

Bukti Kepemilikan Ethereum sangat aman. Mekanisme ini diteliti, dikembangkan, dan diuji secara ketat selama delapan tahun sebelum ditayangkan. Jaminan keamanannya berbeda dari rantai blok Bukti Kerja. Dalam Bukti Kepemilikan, validator yang jahat dapat dihukum secara aktif ("pemotongan") dan dikeluarkan dari kumpulan validator, yang menghabiskan sejumlah besar ETH. Di bawah Bukti Kerja, penyerang dapat terus mengulangi serangan mereka selama mereka memiliki daya hash yang cukup. Juga lebih mahal untuk melancarkan serangan yang setara pada Bukti Kepemilikan Ethereum daripada di bawah Bukti Kerja. Untuk memengaruhi keaktifan rantai, setidaknya 33% dari total Ether yang di-stake di jaringan diperlukan (kecuali dalam kasus serangan yang sangat canggih dengan kemungkinan keberhasilan yang sangat rendah). Untuk mengontrol konten blok di masa mendatang, setidaknya 51% dari total ETH yang di-stake diperlukan, dan untuk menulis ulang riwayat, lebih dari 66% dari total stake diperlukan. Protokol Ethereum akan menghancurkan aset-aset ini dalam skenario serangan 33% atau 51% dan melalui konsensus sosial dalam skenario serangan 66%.

- [Lebih lanjut tentang mempertahankan Bukti Kepemilikan Ethereum dari penyerang](/developers/docs/consensus-mechanisms/pos/attack-and-defense)
- [Lebih lanjut tentang desain Bukti Kepemilikan](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)

## Apakah Bukti Kepemilikan membuat Ethereum lebih murah? {#does-pos-make-ethereum-cheaper}

Tidak. Biaya untuk mengirim transaksi (biaya gas) ditentukan oleh pasar biaya dinamis yang meningkat seiring dengan bertambahnya permintaan jaringan. Mekanisme konsensus tidak secara langsung memengaruhi hal ini.

[Lebih lanjut tentang gas](/developers/docs/gas).

## Apa itu node, klien, dan validator? {#what-are-nodes-clients-and-validators}

Node adalah komputer yang terhubung ke jaringan Ethereum. Klien adalah perangkat lunak yang mereka jalankan yang mengubah komputer menjadi node. Ada dua jenis klien: klien eksekusi dan klien konsensus. Keduanya diperlukan untuk membuat node. Validator adalah tambahan opsional untuk klien konsensus yang memungkinkan node untuk berpartisipasi dalam konsensus Bukti Kepemilikan. Ini berarti membuat dan mengusulkan blok saat dipilih dan membuktikan blok yang mereka dengar di jaringan. Untuk menjalankan validator, operator node harus menyetorkan 32 ETH ke dalam kontrak deposit.

- [Lebih lanjut tentang node dan klien](/developers/docs/nodes-and-clients)
- [Lebih lanjut tentang staking](/staking)

## Apakah Bukti Kepemilikan adalah ide baru? {#is-pos-new}

Tidak. Seorang pengguna di BitcoinTalk [mengajukan ide dasar Bukti Kepemilikan](https://bitcointalk.org/index.php?topic=27787.0) sebagai peningkatan untuk Bitcoin pada tahun 2011. Butuh sebelas tahun sebelum siap diimplementasikan di Mainnet Ethereum. Beberapa rantai lain mengimplementasikan Bukti Kepemilikan lebih awal dari Ethereum, tetapi bukan mekanisme spesifik Ethereum (yang dikenal sebagai Gasper).

## Apa yang istimewa dari Bukti Kepemilikan Ethereum? {#why-is-ethereum-pos-special}

Mekanisme Bukti Kepemilikan Ethereum unik dalam desainnya. Ini bukan mekanisme Bukti Kepemilikan pertama yang dirancang dan diimplementasikan, tetapi ini yang paling tangguh. Mekanisme Bukti Kepemilikan ini dikenal sebagai "Casper". Casper mendefinisikan bagaimana validator dipilih untuk mengusulkan blok, bagaimana dan kapan pengesahan dibuat, bagaimana pengesahan dihitung, imbalan dan penalti yang diberikan kepada validator, kondisi pemotongan, mekanisme pengaman seperti kebocoran ketidakaktifan, dan kondisi untuk "finalitas". Finalitas adalah kondisi bahwa agar sebuah blok dianggap sebagai bagian permanen dari rantai kanonis, blok tersebut harus telah dipilih oleh setidaknya 66% dari total ETH yang di-stake di jaringan. Para peneliti mengembangkan Casper secara khusus untuk Ethereum, dan Ethereum adalah rantai blok pertama dan satu-satunya yang telah mengimplementasikannya.

Selain Casper, Bukti Kepemilikan Ethereum menggunakan algoritme pilihan cabang yang disebut LMD-GHOST. Ini diperlukan jika muncul kondisi di mana ada dua blok untuk slot yang sama. Ini menciptakan dua percabangan dari rantai blok. LMD-GHOST memilih salah satu yang memiliki "bobot" pengesahan terbesar. Bobot tersebut adalah jumlah pengesahan yang ditimbang berdasarkan saldo efektif dari para validator. LMD-GHOST unik untuk Ethereum.

Kombinasi Casper dan LMD-GHOST dikenal sebagai Gasper.

[Lebih lanjut tentang Gasper](/developers/docs/consensus-mechanisms/pos/gasper/)

## Apa itu pemotongan? {#what-is-slashing}

Pemotongan adalah istilah yang diberikan untuk penghancuran sebagian stake validator dan pengeluaran validator dari jaringan. Jumlah ETH yang hilang dalam pemotongan berskala dengan jumlah validator yang dipotong - ini berarti validator yang berkolusi dihukum lebih berat daripada individu.

[Lebih lanjut tentang pemotongan](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties#slashing)

## Mengapa validator membutuhkan 32 ETH? {#why-32-eth}

Validator harus melakukan staking ETH sehingga mereka memiliki sesuatu yang akan hilang jika mereka berperilaku buruk. Alasan mengapa mereka harus melakukan staking 32 ETH secara spesifik adalah untuk memungkinkan node berjalan pada perangkat keras yang sederhana. Jika minimum ETH per validator lebih rendah, maka jumlah validator dan karenanya jumlah pesan yang harus diproses di setiap slot akan meningkat, yang berarti perangkat keras yang lebih kuat akan diperlukan untuk menjalankan node.

## Bagaimana validator dipilih? {#how-are-validators-selected}

Satu validator dipilih secara pseudo-acak untuk mengusulkan blok di setiap slot menggunakan algoritme yang disebut RANDAO yang mencampur hash dari pengusul blok dengan seed yang diperbarui setiap blok. Nilai ini digunakan untuk memilih validator tertentu dari total kumpulan validator. Pemilihan validator ditetapkan dua epoch sebelumnya.

[Lebih lanjut tentang pemilihan validator](/developers/docs/consensus-mechanisms/pos/block-proposal)

## Apa itu penggerusan stake? {#what-is-stake-grinding}

Penggerusan stake adalah kategori serangan pada jaringan Bukti Kepemilikan di mana penyerang mencoba membiaskan algoritme pemilihan validator untuk menguntungkan validator mereka sendiri. Serangan penggerusan stake pada RANDAO membutuhkan sekitar setengah dari total ETH yang di-stake.

[Lebih lanjut tentang penggerusan stake](https://eth2book.info/altair/part2/building_blocks/randomness/#randao-biasability)

## Apa itu pemotongan sosial? {#what-is-social-slashing}

Pemotongan sosial adalah kemampuan komunitas untuk mengoordinasikan percabangan rantai blok sebagai respons terhadap serangan. Ini memungkinkan komunitas untuk pulih dari penyerang yang memfinalisasi rantai yang tidak jujur. Pemotongan sosial juga dapat digunakan untuk melawan serangan penyensoran.

- [Lebih lanjut tentang pemotongan sosial](https://ercwl.medium.com/the-case-for-social-slashing-59277ff4d9c7)
- [Vitalik Buterin tentang pemotongan sosial](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)

## Apakah saya akan dipotong? {#will-i-get-slashed}

Sebagai validator, sangat sulit untuk dipotong kecuali Anda sengaja terlibat dalam perilaku jahat. Pemotongan hanya diimplementasikan dalam skenario yang sangat spesifik di mana validator mengusulkan beberapa blok untuk slot yang sama atau bertentangan dengan diri mereka sendiri dengan pengesahan mereka - ini sangat tidak mungkin terjadi secara tidak sengaja.

[Lebih lanjut tentang kondisi pemotongan](https://eth2book.info/altair/part2/incentives/slashing)

## Apa itu masalah tanpa risiko? {#what-is-nothing-at-stake-problem}

Masalah tanpa risiko adalah masalah konseptual dengan beberapa mekanisme Bukti Kepemilikan di mana hanya ada imbalan dan tidak ada penalti. Jika tidak ada risiko, validator yang pragmatis akan sama senangnya untuk mengesahkan percabangan mana pun, atau bahkan beberapa percabangan rantai blok, karena ini meningkatkan imbalan mereka. Ethereum mengatasi hal ini menggunakan kondisi finalitas dan pemotongan untuk memastikan satu rantai kanonis.

[Lebih lanjut tentang masalah tanpa risiko](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed)

## Apa itu algoritme pilihan cabang? {#what-is-a-fork-choice-algorithm}

Algoritme pilihan cabang mengimplementasikan aturan yang menentukan rantai mana yang merupakan rantai kanonis. Dalam kondisi optimal, tidak diperlukan aturan pilihan cabang karena hanya ada satu pengusul blok per slot dan satu blok untuk dipilih. Namun, terkadang, beberapa blok untuk slot yang sama atau informasi yang datang terlambat mengarah pada beberapa opsi tentang bagaimana blok di dekat kepala rantai diatur. Dalam kasus ini, semua klien harus mengimplementasikan beberapa aturan secara identik untuk memastikan mereka semua memilih urutan blok yang benar. Algoritme pilihan cabang menyandikan aturan-aturan ini.

Algoritme pilihan cabang Ethereum disebut LMD-GHOST. Algoritme ini memilih percabangan dengan bobot pengesahan terbesar, yang berarti percabangan yang paling banyak dipilih oleh ETH yang di-stake.

[Lebih lanjut tentang LMD-GHOST](/developers/docs/consensus-mechanisms/pos/gasper/#fork-choice)

## Apa itu finalitas dalam Bukti Kepemilikan? {#what-is-finality}

Finalitas dalam Bukti Kepemilikan adalah jaminan bahwa blok tertentu adalah bagian permanen dari rantai kanonis dan tidak dapat dikembalikan kecuali ada kegagalan konsensus di mana penyerang membakar 33% dari total Ether yang di-stake. Ini adalah finalitas "kripto-ekonomi", berbeda dengan "finalitas probabilistik" yang relevan dengan rantai blok Bukti Kerja. Dalam finalitas probabilistik, tidak ada state difinalisasi/tidak difinalisasi yang eksplisit untuk blok - hanya menjadi semakin kecil kemungkinannya bahwa sebuah blok dapat dihapus dari rantai seiring bertambahnya usia blok tersebut, dan pengguna menentukan sendiri kapan mereka cukup yakin bahwa sebuah blok "aman". Dengan finalitas kripto-ekonomi, pasangan blok titik periksa harus dipilih oleh 66% dari Ether yang di-stake. Jika kondisi ini terpenuhi, blok di antara titik periksa tersebut secara eksplisit "difinalisasi".

[Lebih lanjut tentang finalitas](/developers/docs/consensus-mechanisms/pos/#finality)

## Apa itu "subjektivitas lemah"? {#what-is-weak-subjectivity}

Subjektivitas lemah adalah fitur jaringan Bukti Kepemilikan di mana informasi sosial digunakan untuk mengonfirmasi state rantai blok saat ini. Node baru atau node yang bergabung kembali dengan jaringan setelah offline untuk waktu yang lama dapat diberikan state terbaru sehingga node dapat segera melihat apakah mereka berada di rantai yang benar. State ini dikenal sebagai "titik periksa subjektivitas lemah" dan dapat diperoleh dari operator node lain di luar pita (out-of-band), atau dari penjelajah blok, atau dari beberapa titik akhir publik.

[Lebih lanjut tentang subjektivitas lemah](/developers/docs/consensus-mechanisms/pos/weak-subjectivity)

## Apakah Bukti Kepemilikan tahan sensor? {#is-pos-censorship-resistant}

Sifat tahan sensor saat ini sulit dibuktikan. Namun, tidak seperti Bukti Kerja, Bukti Kepemilikan menawarkan opsi untuk mengoordinasikan pemotongan guna menghukum validator yang melakukan penyensoran. Ada perubahan mendatang pada protokol yang memisahkan pembangun blok dari pengusul blok dan mengimplementasikan daftar transaksi yang harus disertakan pembangun di setiap blok. Proposal ini dikenal sebagai pemisahan pengusul-pembangun (PBS) dan membantu mencegah validator menyensor transaksi.

[Lebih lanjut tentang pemisahan pengusul-pembangun (PBS)](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Original-basic-scheme)

## Bisakah sistem Bukti Kepemilikan Ethereum terkena serangan 51%? {#pos-51-attack}

Ya. Bukti Kepemilikan rentan terhadap serangan 51%, sama seperti Bukti Kerja. Alih-alih penyerang membutuhkan 51% dari daya hash jaringan, penyerang membutuhkan 51% dari total ETH yang di-stake. Penyerang yang mengakumulasi 51% dari total stake dapat mengontrol algoritme pilihan cabang. Ini memungkinkan penyerang untuk menyensor transaksi tertentu, melakukan reorganisasi jarak pendek, dan mengekstraksi MEV dengan menyusun ulang blok untuk keuntungan mereka.

[Lebih lanjut tentang serangan pada Bukti Kepemilikan](/developers/docs/consensus-mechanisms/pos/attack-and-defense)

## Apa itu koordinasi sosial, dan mengapa itu dibutuhkan? {#what-is-social-coordination}

Koordinasi sosial adalah garis pertahanan terakhir untuk Ethereum yang akan memungkinkan rantai yang jujur dipulihkan dari serangan yang memfinalisasi blok yang tidak jujur. Dalam kasus ini, komunitas Ethereum harus berkoordinasi "di luar pita" (out-of-band) dan setuju untuk menggunakan percabangan minoritas yang jujur, memotong validator penyerang dalam prosesnya. Ini akan mewajibkan aplikasi dan bursa untuk mengenali percabangan yang jujur juga.

[Baca lebih lanjut tentang koordinasi sosial](/developers/docs/consensus-mechanisms/pos/attack-and-defense#people-the-last-line-of-defense)

## Apakah yang kaya semakin kaya dalam Bukti Kepemilikan? {#do-rich-get-richer}

Semakin banyak ETH yang harus di-stake seseorang, semakin banyak validator yang dapat mereka jalankan, dan semakin banyak imbalan yang dapat mereka kumpulkan. Imbalan berskala secara linier dengan jumlah ETH yang di-stake, dan setiap orang mendapatkan persentase pengembalian yang sama. Bukti Kerja memperkaya orang kaya lebih dari Bukti Kepemilikan karena penambang yang lebih kaya yang membeli perangkat keras dalam skala besar mendapat manfaat dari skala ekonomi, yang berarti hubungan antara kekayaan dan imbalan bersifat non-linier.

## Apakah Bukti Kepemilikan lebih tersentralisasi daripada Bukti Kerja? {#is-pos-decentralized}

Tidak, Bukti Kerja cenderung ke arah sentralisasi karena biaya penambangan meningkat dan menyingkirkan individu, kemudian menyingkirkan perusahaan kecil, dan seterusnya. Masalah saat ini dengan Bukti Kepemilikan adalah pengaruh derivatif staking likuid (LSD). Ini adalah token yang mewakili ETH yang di-stake oleh beberapa penyedia yang dapat ditukar oleh siapa saja di pasar sekunder tanpa ETH yang sebenarnya di-unstake. LSD memungkinkan pengguna untuk melakukan staking dengan kurang dari 32 ETH, tetapi mereka juga menciptakan risiko sentralisasi di mana beberapa organisasi besar pada akhirnya dapat mengendalikan sebagian besar stake. Inilah sebabnya mengapa [staking mandiri](/staking/solo) adalah opsi terbaik untuk Ethereum.

[Lebih lanjut tentang sentralisasi stake di LSD](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Mengapa saya hanya bisa melakukan staking ETH? {#why-can-i-only-stake-eth}

ETH adalah mata uang asli Ethereum. Sangat penting untuk memiliki mata uang tunggal di mana semua stake didenominasi, baik untuk memperhitungkan saldo efektif untuk menimbang suara maupun keamanan. ETH itu sendiri adalah komponen fundamental dari Ethereum, bukan kontrak pintar. Memasukkan mata uang lain akan secara signifikan meningkatkan kompleksitas dan menurunkan keamanan staking.

## Apakah Ethereum satu-satunya rantai blok Bukti Kepemilikan? {#is-ethereum-the-only-pos-blockchain}

Tidak, ada beberapa rantai blok Bukti Kepemilikan. Tidak ada yang identik dengan Ethereum; mekanisme Bukti Kepemilikan Ethereum itu unik.

## Apa itu The Merge? {#what-is-the-merge}

The Merge adalah momen ketika Ethereum mematikan mekanisme konsensus berbasis Bukti Kerja dan menyalakan mekanisme konsensus berbasis Bukti Kepemilikan. The Merge terjadi pada 15 September 2022.

[Lebih lanjut tentang The Merge](/roadmap/merge)

## Apa itu keaktifan dan keamanan? {#what-are-liveness-and-safety}

Keaktifan (liveness) dan keamanan (safety) adalah dua masalah keamanan mendasar untuk rantai blok. Keaktifan adalah ketersediaan rantai yang memfinalisasi. Jika rantai berhenti memfinalisasi atau pengguna tidak dapat mengaksesnya dengan mudah, itu adalah kegagalan keaktifan. Biaya akses yang sangat tinggi juga dapat dianggap sebagai kegagalan keaktifan. Keamanan mengacu pada seberapa sulit untuk menyerang rantai - yaitu, memfinalisasi titik periksa yang saling bertentangan.

[Baca lebih lanjut di makalah Casper](https://arxiv.org/pdf/1710.09437.pdf)