---
title: Pertanyaan yang Sering Diajukan
description: Pertanyaan yang Sering Diajukan tentang Ethereum berbasis Bukti Kepemilikan.
lang: id
---

## Apa itu bukti taruhan {#what-is-proof-of-stake}

Proof-of-stake adalah sebuah kelas algoritma yang dapat memberikan keamanan pada rantai blok dengan memastikan bahwa aset-aset yang bernilai hilang oleh penyerang yang bertindak tidak jujur. Sistem proof-of-stake membutuhkan satu set validator untuk menyediakan beberapa aset yang dapat dihancurkan jika validator terlibat dalam perilaku yang terbukti tidak jujur. Ethereum menggunakan mekanisme bukti kepemilikan untuk mengamankan rantai blok.

## Bagaimana bukti kepemilikan dibandingkan dengan bukti kerja? {#comparison-to-proof-of-work}

Baik bukti kerja maupun bukti kepemilikan adalah mekanisme yang secara ekonomi memberikan disinsentif kepada para pelaku kejahatan untuk tidak melakukan spam atau menipu jaringan. Dalam kedua kasus tersebut, node yang secara aktif berpartisipasi dalam konsensus menaruh sejumlah aset "ke dalam jaringan" yang akan hilang jika mereka melakukan kesalahan.

Dalam bukti kerja, aset ini adalah energi. Node, yang dikenal sebagai penambang, menjalankan algoritma yang bertujuan untuk menghitung nilai lebih cepat daripada node lainnya. Node tercepat memiliki hak untuk mengusulkan sebuah blok ke dalam rantai. Untuk mengubah sejarah rantai atau mendominasi usul blok, seorang penambang harus memiliki daya komputasi yang sangat besar sehingga mereka selalu memenangkan perlombaan. Hal ini sangat mahal dan sulit untuk dilakukan, melindungi rantai dari serangan. Energi yang dibutuhkan untuk "menambang" menggunakan bukti kerja adalah aset dunia nyata yang dibayar oleh para penambang.

Proof-of-stake membutuhkan node, yang dikenal sebagai validator, untuk secara eksplisit mengirimkan aset kripto ke kontrak pintar. Jika seorang validator berperilaku buruk, kripto ini dapat dihancurkan karena mereka "mempertaruhkan" aset mereka secara langsung ke dalam rantai, bukan secara tidak langsung melalui pengeluaran energi.

Proof-of-work jauh lebih boros energi karena listrik dibakar dalam proses penambangan. Proof-of-stake, di sisi lain, hanya membutuhkan energi yang sangat kecil - validator Ethereum bahkan dapat berjalan pada perangkat bertenaga rendah seperti Raspberry Pi. Mekanisme proof-of-stake Ethereum dianggap lebih aman dibandingkan dengan proof-of-work karena biaya yang dikeluarkan untuk menyerang lebih besar, dan konsekuensi yang harus ditanggung oleh penyerang lebih berat.

Bukti kerja versus bukti kepemilikan adalah topik yang diperdebatkan. [Blog Vitalik Buterin](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-are-the-benefits-of-proof-of-stake-as-opposed-to-proof-of-work) dan perdebatan antara Justin Drake dan Lyn Alden memberikan ringkasan argumen yang baik.

<YouTube id="1m12zgJ42dI" />

## Apakah bukti kepemilikannya hemat energi? {#is-pos-energy-efficient}

Ya. Node pada jaringan proof-of-stake menggunakan sedikit energi. Sebuah studi pihak ketiga menyimpulkan bahwa seluruh jaringan Ethereum yang memiliki bukti kepemilikan mengkonsumsi sekitar 0,0026 TWh/tahun - sekitar 13.000x lebih sedikit dibandingkan dengan bermain permainan di Amerika Serikat saja.

[Selengkapnya tentang konsumsi energi Ethereum](/energy-consumption/).

## Apakah bukti kepemilikan aman? {#is-pos-secure}

Bukti kepemilikan Ethereum sangat aman. Mekanisme ini diteliti, dikembangkan, dan diuji secara ketat selama delapan tahun sebelum ditayangkan. Jaminan keamanannya berbeda dengan blockchain proof-of-work. Dalam proof-of-stake, validator yang jahat dapat secara aktif dihukum ("dipotong") dan dikeluarkan dari kumpulan validator, dengan biaya yang cukup besar dari ETH. Dalam proof-of-work, seorang penyerang dapat terus mengulangi serangan mereka selagi mereka memiliki kekuatan hash yang cukup. Juga lebih mahal untuk melakukan serangan yang setara dengan serangan pada Ethereum proof-of-stake dibandingkan dengan proof-of-work. Untuk mempengaruhi kelangsungan hidup rantai, dibutuhkan setidaknya 33% dari total eter yang dipertaruhkan pada jaringan (kecuali pada kasus serangan yang sangat canggih dengan kemungkinan keberhasilan yang sangat rendah). Untuk mengkontrol konten blok yang akan datang, dibutuhkan setidaknya 51% dari total ETH yang dipertaruhkan, dan untuk menulis ulang riwayat, dibutuhkan lebih dari 66% dari total taruhan. Protokol Ethereum akan menghancurkan aset-aset ini dalam skenario serangan 33% atau 51% dan dengan konsensus sosial dalam skenario serangan 66%.

- [Selengkapnya tentang mempertahankan bukti taruhan Ethereum dari penyerang](/developers/docs/consensus-mechanisms/pos/attack-and-defense)
- [Selengkapnya tentang desain bukti taruhan](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)

## Apakah bukti kepemilikan membuat Ethereum lebih murah? {#does-pos-make-ethereum-cheaper}

Tidak. Biaya untuk mengirim transaksi (biaya gas) ditentukan oleh pasar biaya dinamis yang meningkat seiring dengan meningkatnya permintaan jaringan. Mekanisme konsensus tidak secara langsung mempengaruhi hal ini.

[Selengkapnya tentang gas](/developers/docs/gas).

## Apa yang dimaksud dengan node, klien, dan validator? {#what-are-nodes-clients-and-validators}

Node adalah komputer yang terhubung ke jaringan Ethereum. Klien adalah perangkat lunak yang mereka jalankan yang mengubah komputer menjadi simpul. Ada dua jenis klien: klien eksekusi dan klien konsensus. Keduanya diperlukan untuk membuat simpul. Validator adalah sebuah tambahan opsional pada klien konsensus yang memungkinkan node untuk berpartisipasi dalam konsensus bukti kepemilikan. Ini berarti membuat dan mengusulkan blok ketika dipilih dan membuktikan blok yang mereka dengar di jaringan. Untuk menjalankan validator, operator node harus menyetor 32 ETH ke dalam kontrak setoran.

- [Selengkapnya tentang simpul dan klien](/developers/docs/nodes-and-clients)
- [Selengkapnya tentang penaruhan](/staking)

## Apakah bukti kepemilikan merupakan ide baru? {#is-pos-new}

Tidak. Seorang pengguna di BitcoinTalk [mengusulkan ide dasar bukti taruhan](https://bitcointalk.org/index.php?topic=27787.0) sebagai peningkatan pada Bitcoin pada tahun 2011. Butuh waktu sebelas tahun sebelum siap untuk diimplementasikan di Ethereum Jaringan utama. Beberapa rantai lain menerapkan bukti kepemilikan lebih awal dari Ethereum, tetapi bukan mekanisme khusus Ethereum (yang dikenal sebagai Gasper).

## Apa yang istimewa tentang proof-of-stake Ethereum? {#why-is-ethereum-pos-special}

Mekanisme proof-of-stake Ethereum memiliki desain yang unik. Ini bukanlah mekanisme bukti kepemilikan pertama yang dirancang dan diterapkan, tetapi merupakan yang paling tangguh. Mekanisme pembuktian kepemilikan dikenal sebagai "Casper". Casper mendefinisikan bagaimana validator dipilih untuk mengusulkan blok, bagaimana dan kapan pengesahan dibuat, bagaimana pengesahan dihitung, penghargaan dan penalti yang diberikan kepada validator, kondisi pemotongan, mekanisme pengaman seperti kebocoran tidak aktif, dan kondisi untuk "finalitas". Finalitas adalah kondisi agar suatu blok dianggap sebagai bagian permanen dari rantai kanonik, blok tersebut harus dipilih oleh setidaknya 66% dari total ETH yang dipertaruhkan di jaringan. Para peneliti mengembangkan Casper khusus untuk Ethereum, dan Ethereum adalah blockchain pertama dan satu-satunya yang mengimplementasikannya.

Selain Casper, proof-of-stake Ethereum menggunakan algoritma pilihan fork yang disebut LMD-GHOST. Hal ini diperlukan jika muncul kondisi di mana dua blok ada untuk slot yang sama. Ini menciptakan dua cabang blockchain. LMD-GHOST memilih satu yang memiliki "bobot" atestasi terbesar. Bobotnya adalah jumlah pengesahan yang dibobot dengan saldo efektif para validator. LMD-GHOST unik untuk Ethereum.

Kombinasi Casper dan LMD_GHOST dikenal sebagai Gasper.

[Selengkapnya tentang Gasper](/developers/docs/consensus-mechanisms/pos/gasper/)

## Apa itu slashing? {#what-is-slashing}

Slashing adalah istilah yang diberikan untuk penghancuran sebagian saham validator dan pengusiran validator dari jaringan. Jumlah ETH yang hilang dalam pemotongan sebanding dengan jumlah validator yang dipotong - ini berarti validator yang berkolusi dihukum lebih berat daripada validator individu.

[Selengkapnya tentang pemotongan](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties#slashing)

## Mengapa validator membutuhkan 32 ETH? {#why-32-eth}

Validator harus mempertaruhkan ETH sehingga mereka akan kehilangan sesuatu jika mereka berperilaku buruk. Alasan mengapa mereka harus mempertaruhkan 32 ETH secara khusus adalah untuk memungkinkan node berjalan pada perangkat keras yang sederhana. Jika ETH minimum per validator lebih rendah, maka jumlah validator dan oleh karena itu jumlah pesan yang harus diproses di setiap slot akan meningkat, artinya perangkat keras yang lebih kuat akan dibutuhkan untuk menjalankan node.

## Bagaimana validator dipilih? {#how-are-validators-selected}

Seorang validator tunggal dipilih secara acak semu untuk mengusulkan blok di setiap slot menggunakan algoritma bernama RANDAO yang mencampur hash dari pengusul blok dengan benih yang diperbarui setiap blok. Nilai ini digunakan untuk memilih validator tertentu dari total set validator. Pemilihan validator ditetapkan dua periode sebelumnya.

[Selengkapnya tentang pemilihan validator](/developers/docs/consensus-mechanisms/pos/block-proposal)

## Apa itu stake grinding? {#what-is-stake-grinding}

Stake grinding merupakan kategori serangan pada jaringan proof-of-stake di mana penyerang mencoba untuk memengaruhi algoritma pemilihan validator agar menguntungkan validator mereka sendiri. Serangan _stake grinding_ pada RANDAO memerlukan sekitar setengah dari total ETH yang dipertaruhkan.

[Selengkapnya tentang stake grinding](https://eth2book.info/altair/part2/building_blocks/randomness/#randao-biasability)

## Apa itu social slashing? {#what-is-social-slashing}

Social slashing adalah kemampuan komunitas untuk mengoordinasikan percabangan blockchain sebagai respons terhadap suatu serangan. Hal ini memungkinkan komunitas untuk pulih dari penyerang yang menyelesaikan rantai ketidakjujuran. Social slashing juga dapat digunakan melawan serangan penyensoran.

- [Selengkapnya tentang pemotongan sosial](https://ercwl.medium.com/the-case-for-social-slashing-59277ff4d9c7)
- [Vitalik Buterin tentang pemotongan sosial](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)

## Apakah saya akan ditebas? {#will-i-get-slashed}

Sebagai seorang validator, sangat sulit untuk ditipu kecuali Anda dengan sengaja terlibat dalam perilaku jahat. Slashing hanya diterapkan dalam skenario yang sangat spesifik di mana validator mengusulkan beberapa blok untuk slot yang sama atau bertentangan dengan diri mereka sendiri dengan pengesahan mereka - hal ini sangat tidak mungkin terjadi secara tidak sengaja.

[Selengkapnya tentang kondisi pemotongan](https://eth2book.info/altair/part2/incentives/slashing)

## Apa itu masalah tidak ada yang dipertaruhkan? {#what-is-nothing-at-stake-problem}

Masalah tidak ada yang dipertaruhkan adalah masalah konseptual dengan beberapa mekanisme bukti kepemilikan di mana hanya ada hadiah dan tidak ada penalti. Jika tidak ada yang dipertaruhkan, seorang validator yang pragmatis akan dengan senang hati mengesahkan setiap, atau bahkan beberapa, percabangan blockchain, karena hal ini akan meningkatkan imbalan yang mereka peroleh. Ethereum mengatasi hal ini dengan menggunakan kondisi finalitas dan pemotongan untuk memastikan satu rantai kanonik.

[Selengkapnya tentang masalah nothing-at-stake](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed)

## Apa itu algoritma pilihan garpu? {#what-is-a-fork-choice-algorithm}

Algoritma pilihan percabangan menerapkan aturan yang menentukan rantai mana yang kanonik. Dalam kondisi optimal, tidak diperlukan aturan pilihan percabangan karena hanya ada satu pengusul blok per slot dan satu blok untuk dipilih. Namun, kadang kala, beberapa blok untuk slot yang sama atau informasi yang datang terlambat menyebabkan beberapa opsi tentang bagaimana blok di dekat bagian atas rantai diatur. Dalam kasus ini, semua klien harus menerapkan beberapa aturan secara identik untuk memastikan mereka semua memilih urutan blok yang benar. Algoritma pilihan percabangan mengkodekan aturan-aturan ini.

Algoritma pemilihan percabangan Ethereum disebut LMD-GHOST. Ia memilih fork dengan bobot atestasi terbesar, artinya fork yang dipilih oleh ETH yang paling banyak dipertaruhkan.

[Selengkapnya tentang LMD-GHOST](/developers/docs/consensus-mechanisms/pos/gasper/#fork-choice)

## Apa yang dimaksud dengan finalitas dalam proof-of-stake? {#what-is-finality}

Finalitas dalam proof-of-stake adalah jaminan bahwa blok tertentu merupakan bagian permanen dari rantai kanonik dan tidak dapat dikembalikan kecuali terjadi kegagalan konsensus di mana penyerang membakar 33% dari total ether yang dipertaruhkan. Ini adalah finalitas "ekonomi kripto", yang bertolak belakang dengan "finalitas probabilistik" yang relevan dengan blockchain bukti kerja. Dalam finalitas probabilistik, tidak ada status finalisasi/non-finalisasi yang eksplisit untuk blok - hanya saja semakin kecil kemungkinan sebuah blok dapat dihapus dari rantai seiring bertambahnya usia, dan pengguna menentukan sendiri kapan mereka cukup yakin bahwa sebuah blok "aman". Dengan finalitas ekonomi kripto, pasangan blok titik pemeriksaan harus dipilih oleh 66% ether yang dipertaruhkan. Jika kondisi ini terpenuhi, blok antara titik pemeriksaan tersebut secara eksplisit "diselesaikan".

[Selengkapnya tentang finalitas](/developers/docs/consensus-mechanisms/pos/#finality)

## Apa itu "subjektivitas lemah"? {#what-is-weak-subjectivity}

Subjektivitas yang lemah merupakan fitur jaringan proof-of-stake di mana informasi sosial digunakan untuk mengonfirmasi status blockchain saat ini. Node baru atau node yang bergabung kembali ke jaringan setelah offline dalam waktu lama dapat diberi status terkini sehingga node dapat segera melihat apakah mereka berada di rantai yang benar. Keadaan ini dikenal sebagai "titik pemeriksaan subjektivitas lemah" dan dapat diperoleh dari operator simpul lain di luar pita, atau dari penjelajah blok, atau dari beberapa titik akhir publik.

[Selengkapnya tentang subjektivitas lemah](/developers/docs/consensus-mechanisms/pos/weak-subjectivity)

## Apakah penyensoran bukti kepemilikan tahan? {#is-pos-censorship-resistant}

Ketahanan terhadap sensor saat ini sulit dibuktikan. Akan tetapi, tidak seperti proof-of-work, proof-of-stake menawarkan opsi untuk mengoordinasikan pemotongan guna menghukum validator yang melakukan penyensoran. Ada perubahan mendatang pada protokol yang memisahkan pembangun blok dari pengusul blok dan menerapkan daftar transaksi yang harus disertakan oleh pembangun di setiap blok. Proposal ini dikenal sebagai pemisahan pembangun yang tepat dan membantu mencegah validator menyensor transaksi.

[Selengkapnya tentang pemisahan pengusul-pembangun](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Original-basic-scheme)

## Bisakah sistem proof-of-stake Ethereum diserang 51%? {#pos-51-attack}

Ya. Proof-of-stake rentan terhadap serangan 51%, sama seperti proof-of-work. Alih-alih penyerang membutuhkan 51% dari daya hash jaringan, penyerang membutuhkan 51% dari total ETH yang dipertaruhkan. Penyerang yang mengumpulkan 51% dari total saham akan dapat mengendalikan algoritma pilihan percabangan. Hal ini memungkinkan penyerang untuk menyensor transaksi tertentu, melakukan reorganisasi jarak pendek, dan mengekstrak MEV dengan menyusun ulang blok sesuai keinginannya.

[Selengkapnya tentang serangan pada bukti taruhan](/developers/docs/consensus-mechanisms/pos/attack-and-defense)

## Apa itu koordinasi sosial, dan mengapa itu diperlukan? {#what-is-social-coordination}

Koordinasi sosial adalah garis pertahanan terakhir bagi Ethereum yang akan memungkinkan rantai yang jujur ​​dipulihkan dari serangan yang menyelesaikan blok yang tidak jujur. Dalam kasus ini, komunitas Ethereum harus berkoordinasi "di luar jalur" dan sepakat untuk menggunakan percabangan minoritas yang jujur, yang memangkas validator penyerang dalam prosesnya. Ini akan memerlukan aplikasi dan bursa untuk mengenali percabangan yang jujur ​​pula.

[Baca selengkapnya tentang koordinasi sosial](/developers/docs/consensus-mechanisms/pos/attack-and-defense#people-the-last-line-of-defense)

## Apakah orang kaya menjadi lebih kaya dalam proof-of-stake? {#do-rich-get-richer}

Semakin banyak ETH yang dipertaruhkan seseorang, semakin banyak validator yang dapat mereka jalankan, dan semakin banyak hadiah yang dapat mereka peroleh. Hadiahnya berskala linear dengan jumlah ETH yang dipertaruhkan, dan setiap orang mendapat persentase pengembalian yang sama. Bukti kerja memperkaya orang kaya lebih daripada bukti kepemilikan karena penambang kaya yang membeli perangkat keras dalam skala besar mendapat manfaat dari skala ekonomi, yang berarti hubungan antara kekayaan dan imbalan bersifat non-linier.

## Apakah proof-of-stake lebih tersentralisasi daripada proof-of-work? {#is-pos-decentralized}

Tidak, bukti kerja cenderung ke arah sentralisasi karena biaya penambangan meningkat dan membuat individu tidak mampu membeli, kemudian membuat perusahaan kecil tidak mampu membeli, dan seterusnya. Masalah saat ini dengan proof-of-stake adalah pengaruh derivatif staking likuid (LSD). Ini adalah token yang mewakili ETH yang dipertaruhkan oleh beberapa penyedia yang dapat dipertukarkan oleh siapa saja di pasar sekunder tanpa ETH yang sebenarnya dicabut. LSD memungkinkan pengguna untuk mempertaruhkan dengan kurang dari 32 ETH, tetapi juga menciptakan risiko sentralisasi di mana beberapa organisasi besar dapat mengendalikan sebagian besar taruhan. Inilah sebabnya mengapa [penaruhan solo](/staking/solo) merupakan pilihan terbaik untuk Ethereum.

[Selengkapnya tentang sentralisasi taruhan di LSD](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Mengapa saya hanya bisa mempertaruhkan ETH? {#why-can-i-only-stake-eth}

ETH adalah mata uang di Ethereum. Sangat penting untuk memiliki mata uang tunggal yang digunakan untuk menentukan semua taruhan, baik untuk akuntansi saldo efektif untuk pembobotan suara maupun keamanan. ETH sendiri merupakan komponen fundamental Ethereum dan bukan kontrak pintar. Menggabungkan mata uang lain akan meningkatkan kompleksitas secara signifikan dan mengurangi keamanan staking.

## Apakah Ethereum satu-satunya blockchain proof-of-stake? {#is-ethereum-the-only-pos-blockchain}

Tidak, ada beberapa blockchain proof-of-stake. Tidak ada yang identik dengan Ethereum; mekanisme proof-of-stake Ethereum bersifat unik.

## Apa itu Penggabungan? {#what-is-the-merge}

Penggabungan tersebut terjadi saat Ethereum mematikan mekanisme konsensus berbasis bukti kerja dan mengaktifkan mekanisme konsensus berbasis bukti kepemilikan. Penggabungan terjadi pada tanggal 15 September 2022.

[Selengkapnya tentang Penggabungan](/roadmap/merge)

## Apa itu liveness dan safety? {#what-are-liveness-and-safety}

Keaktifan dan keamanan adalah dua masalah keamanan mendasar untuk blockchain. Liveness adalah tersedianya rantai finalisasi. Jika rantai berhenti difinalisasi atau pengguna tidak dapat mengaksesnya dengan mudah, itu adalah kegagalan keaktifan. Biaya akses yang sangat tinggi juga dapat dianggap sebagai kegagalan keaktifan. Keamanan mengacu pada seberapa sulitnya menyerang rantai - yaitu, menyelesaikan pos pemeriksaan yang bertentangan.

[Baca selengkapnya di paper Casper](https://arxiv.org/pdf/1710.09437.pdf)
