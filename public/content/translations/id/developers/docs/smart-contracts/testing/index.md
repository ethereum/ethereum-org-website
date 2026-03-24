---
title: Menguji kontrak pintar
description: Tinjauan tentang teknik dan pertimbangan untuk menguji kontrak pintar Ethereum.
lang: id
---

Blockchain publik seperti Ethereum bersifat tetap (immutable), sehingga sulit untuk mengubah kode kontrak pintar setelah penerapan. [Pola peningkatan kontrak](/developers/docs/smart-contracts/upgrading/) untuk melakukan "peningkatan virtual" memang ada, tetapi ini sulit diimplementasikan dan memerlukan konsensus sosial. Selain itu, peningkatan hanya dapat memperbaiki kesalahan _setelah_ ditemukan—jika penyerang menemukan kerentanan tersebut lebih dulu, kontrak pintar Anda berisiko dieksploitasi.

Karena alasan ini, menguji kontrak pintar sebelum [menerapkannya](/developers/docs/smart-contracts/deploying/) ke Mainnet adalah persyaratan minimum untuk [keamanan](/developers/docs/smart-contracts/security/). Ada banyak teknik untuk menguji kontrak dan mengevaluasi kebenaran kode; apa yang Anda pilih bergantung pada kebutuhan Anda. Namun demikian, rangkaian pengujian yang terdiri dari berbagai alat dan pendekatan sangat ideal untuk menangkap kelemahan keamanan kecil maupun besar dalam kode kontrak.

## Prasyarat {#prerequisites}

Halaman ini menjelaskan cara menguji kontrak pintar sebelum menerapkannya di jaringan Ethereum. Halaman ini mengasumsikan Anda sudah familier dengan [kontrak pintar](/developers/docs/smart-contracts/).

## Apa itu pengujian kontrak pintar? {#what-is-smart-contract-testing}

Pengujian kontrak pintar adalah proses memverifikasi bahwa kode kontrak pintar berfungsi seperti yang diharapkan. Pengujian berguna untuk memeriksa apakah kontrak pintar tertentu memenuhi persyaratan keandalan, kegunaan, dan keamanan.

Meskipun pendekatannya bervariasi, sebagian besar metode pengujian memerlukan eksekusi kontrak pintar dengan sampel kecil dari data yang diharapkan untuk ditangani. Jika kontrak menghasilkan hasil yang benar untuk data sampel, kontrak tersebut diasumsikan berfungsi dengan baik. Sebagian besar alat pengujian menyediakan sumber daya untuk menulis dan mengeksekusi [kasus uji](https://en.m.wikipedia.org/wiki/Test_case) guna memeriksa apakah eksekusi kontrak sesuai dengan hasil yang diharapkan.

### Mengapa penting untuk menguji kontrak pintar? {#importance-of-testing-smart-contracts}

Karena kontrak pintar sering kali mengelola aset keuangan bernilai tinggi, kesalahan pemrograman kecil dapat dan sering kali menyebabkan [kerugian besar bagi pengguna](https://rekt.news/leaderboard/). Namun, pengujian yang ketat dapat membantu Anda menemukan cacat dan masalah dalam kode kontrak pintar lebih awal dan memperbaikinya sebelum diluncurkan di Mainnet.

Meskipun memungkinkan untuk meningkatkan kontrak jika bug ditemukan, peningkatan tersebut rumit dan dapat [mengakibatkan kesalahan](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/) jika ditangani dengan tidak tepat. Meningkatkan kontrak lebih lanjut meniadakan prinsip sifat tetap (immutability) dan membebani pengguna dengan asumsi kepercayaan tambahan. Sebaliknya, rencana komprehensif untuk menguji kontrak Anda memitigasi risiko keamanan kontrak pintar dan mengurangi kebutuhan untuk melakukan peningkatan logika yang rumit setelah penerapan.

## Metode untuk menguji kontrak pintar {#methods-for-testing-smart-contracts}

Metode untuk menguji kontrak pintar Ethereum terbagi dalam dua kategori besar: **pengujian otomatis** dan **pengujian manual**. Pengujian otomatis dan pengujian manual menawarkan manfaat dan pengorbanan (tradeoff) yang unik, tetapi Anda dapat menggabungkan keduanya untuk membuat rencana yang kuat dalam menganalisis kontrak Anda.

### Pengujian otomatis {#automated-testing}

Pengujian otomatis menggunakan alat yang secara otomatis memeriksa kode kontrak pintar untuk mencari kesalahan dalam eksekusi. Manfaat pengujian otomatis berasal dari penggunaan [skrip](https://www.techtarget.com/whatis/definition/script?amp=1) untuk memandu evaluasi fungsionalitas kontrak. Pengujian berskrip dapat dijadwalkan untuk berjalan berulang kali dengan intervensi manusia yang minimal, sehingga pengujian otomatis lebih efisien daripada pendekatan pengujian manual.

Pengujian otomatis sangat berguna ketika pengujian bersifat repetitif dan memakan waktu; sulit dilakukan secara manual; rentan terhadap kesalahan manusia; atau melibatkan evaluasi fungsi kontrak yang kritis. Namun, alat pengujian otomatis dapat memiliki kelemahan—alat tersebut mungkin melewatkan bug tertentu dan menghasilkan banyak [positif palsu](https://www.contrastsecurity.com/glossary/false-positive). Oleh karena itu, memasangkan pengujian otomatis dengan pengujian manual untuk kontrak pintar adalah hal yang ideal.

### Pengujian manual {#manual-testing}

Pengujian manual dibantu oleh manusia dan melibatkan eksekusi setiap kasus uji dalam rangkaian pengujian Anda satu per satu saat menganalisis kebenaran kontrak pintar. Hal ini berbeda dengan pengujian otomatis di mana Anda dapat secara bersamaan menjalankan beberapa pengujian terisolasi pada sebuah kontrak dan mendapatkan laporan yang menunjukkan semua pengujian yang gagal dan berhasil.

Pengujian manual dapat dilakukan oleh satu individu dengan mengikuti rencana pengujian tertulis yang mencakup berbagai skenario pengujian. Anda juga dapat meminta beberapa individu atau kelompok berinteraksi dengan kontrak pintar selama periode tertentu sebagai bagian dari pengujian manual. Penguji akan membandingkan perilaku aktual kontrak dengan perilaku yang diharapkan, dan menandai setiap perbedaan sebagai bug.

Pengujian manual yang efektif memerlukan sumber daya yang cukup besar (keterampilan, waktu, uang, dan tenaga), dan ada kemungkinan—karena kesalahan manusia—untuk melewatkan kesalahan tertentu saat mengeksekusi pengujian. Namun, pengujian manual juga dapat bermanfaat—misalnya, penguji manusia (misalnya, auditor) dapat menggunakan intuisi untuk mendeteksi kasus ekstrem (edge cases) yang mungkin terlewatkan oleh alat pengujian otomatis.

## Pengujian otomatis untuk kontrak pintar {#automated-testing-for-smart-contracts}

### Pengujian unit {#unit-testing-for-smart-contracts}

Pengujian unit mengevaluasi fungsi kontrak secara terpisah dan memeriksa bahwa setiap komponen berfungsi dengan benar. Pengujian unit yang baik harus sederhana, cepat dijalankan, dan memberikan gambaran yang jelas tentang apa yang salah jika pengujian gagal.

Pengujian unit berguna untuk memeriksa bahwa fungsi mengembalikan nilai yang diharapkan dan bahwa penyimpanan kontrak diperbarui dengan benar setelah eksekusi fungsi. Selain itu, menjalankan pengujian unit setelah membuat perubahan pada basis kode kontrak memastikan penambahan logika baru tidak menimbulkan kesalahan. Di bawah ini adalah beberapa panduan untuk menjalankan pengujian unit yang efektif:

#### Panduan untuk pengujian unit kontrak pintar {#unit-testing-guidelines}

##### 1. Pahami logika bisnis dan alur kerja kontrak Anda

Sebelum menulis pengujian unit, ada baiknya untuk mengetahui fungsionalitas apa yang ditawarkan kontrak pintar dan bagaimana pengguna akan mengakses serta menggunakan fungsi-fungsi tersebut. Hal ini sangat berguna untuk menjalankan [pengujian jalur bahagia (happy path tests)](https://en.m.wikipedia.org/wiki/Happy_path) yang menentukan apakah fungsi dalam kontrak mengembalikan keluaran yang benar untuk masukan pengguna yang valid. Kami akan menjelaskan konsep ini menggunakan contoh (yang diringkas) dari [kontrak lelang](https://docs.soliditylang.org/en/v0.8.17/solidity-by-example.html?highlight=Auction%20contract#simple-open-auction) ini

```solidity
constructor(
        uint biddingTime,
        address payable beneficiaryAddress
    ) {
        beneficiary = beneficiaryAddress;
        auctionEndTime = block.timestamp + biddingTime;
    }

function bid() external payable {

      if (block.timestamp > auctionEndTime)
            revert AuctionAlreadyEnded();

      if (msg.value <= highestBid)
            revert BidNotHighEnough(highestBid);

 if (highestBid != 0) {
    pendingReturns[highestBidder] += highestBid;
        }
        highestBidder = msg.sender;
        highestBid = msg.value;
        emit HighestBidIncreased(msg.sender, msg.value);
    }

 function withdraw() external returns (bool) {
        uint amount = pendingReturns[msg.sender];
        if (amount > 0) {
           pendingReturns[msg.sender] = 0;

        if (!payable(msg.sender).send(amount)) {
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }
        return true;
    }

function auctionEnd() external {
       if (block.timestamp < auctionEndTime)
            revert AuctionNotYetEnded();
        if (ended)
            revert AuctionEndAlreadyCalled();

        ended = true;
        emit AuctionEnded(highestBidder, highestBid);

        beneficiary.transfer(highestBid);
    }
}
```

Ini adalah kontrak lelang sederhana yang dirancang untuk menerima tawaran selama periode penawaran. Jika `highestBid` meningkat, penawar tertinggi sebelumnya menerima uang mereka kembali; setelah periode penawaran berakhir, `beneficiary` memanggil kontrak untuk mendapatkan uang mereka.

Pengujian unit untuk kontrak seperti ini akan mencakup berbagai fungsi yang mungkin dipanggil pengguna saat berinteraksi dengan kontrak. Contohnya adalah pengujian unit yang memeriksa apakah pengguna dapat mengajukan tawaran saat lelang sedang berlangsung (yaitu, panggilan ke `bid()` berhasil) atau pengujian yang memeriksa apakah pengguna dapat mengajukan tawaran yang lebih tinggi dari `highestBid` saat ini.

Memahami alur kerja operasional kontrak juga membantu dalam menulis pengujian unit yang memeriksa apakah eksekusi memenuhi persyaratan. Misalnya, kontrak lelang menetapkan bahwa pengguna tidak dapat mengajukan tawaran saat lelang telah berakhir (yaitu, ketika `auctionEndTime` lebih rendah dari `block.timestamp`). Dengan demikian, pengembang mungkin menjalankan pengujian unit yang memeriksa apakah panggilan ke fungsi `bid()` berhasil atau gagal saat lelang selesai (yaitu, ketika `auctionEndTime` > `block.timestamp`).

##### 2. Evaluasi semua asumsi yang terkait dengan eksekusi kontrak

Penting untuk mendokumentasikan setiap asumsi tentang eksekusi kontrak dan menulis pengujian unit untuk memverifikasi validitas asumsi tersebut. Selain menawarkan perlindungan terhadap eksekusi yang tidak terduga, menguji asersi memaksa Anda untuk memikirkan operasi yang dapat merusak model keamanan kontrak pintar. Tip yang berguna adalah melampaui "pengujian pengguna bahagia" dan menulis pengujian negatif yang memeriksa apakah suatu fungsi gagal untuk masukan yang salah.

Banyak kerangka kerja pengujian unit memungkinkan Anda membuat asersi—pernyataan sederhana yang menyatakan apa yang dapat dan tidak dapat dilakukan oleh kontrak—dan menjalankan pengujian untuk melihat apakah asersi tersebut berlaku di bawah eksekusi. Pengembang yang mengerjakan kontrak lelang yang dijelaskan sebelumnya dapat membuat asersi berikut tentang perilakunya sebelum menjalankan pengujian negatif:

- Pengguna tidak dapat mengajukan tawaran saat lelang telah berakhir atau belum dimulai.

- Kontrak lelang dikembalikan (revert) jika tawaran berada di bawah ambang batas yang dapat diterima.

- Pengguna yang gagal memenangkan tawaran akan dikreditkan kembali dengan dana mereka

**Catatan**: Cara lain untuk menguji asumsi adalah dengan menulis pengujian yang memicu [pengubah fungsi (function modifiers)](https://docs.soliditylang.org/en/v0.8.16/contracts.html#function-modifiers) dalam kontrak, terutama pernyataan `require`, `assert`, dan `if…else`.

##### 3. Ukur cakupan kode

[Cakupan kode (Code coverage)](https://en.m.wikipedia.org/wiki/Code_coverage) adalah metrik pengujian yang melacak jumlah cabang, baris, dan pernyataan dalam kode Anda yang dieksekusi selama pengujian. Pengujian harus memiliki cakupan kode yang baik untuk meminimalkan risiko kerentanan yang tidak teruji. Tanpa cakupan yang memadai, Anda mungkin salah berasumsi bahwa kontrak Anda aman karena semua pengujian berhasil, padahal kerentanan masih ada di jalur kode yang tidak teruji. Namun, mencatat cakupan kode yang tinggi memberikan jaminan bahwa semua pernyataan/fungsi dalam kontrak pintar telah diuji kebenarannya secara memadai.

##### 4. Gunakan kerangka kerja pengujian yang dikembangkan dengan baik

Kualitas alat yang digunakan dalam menjalankan pengujian unit untuk kontrak pintar Anda sangat penting. Kerangka kerja pengujian yang ideal adalah yang dipelihara secara teratur; menyediakan fitur yang berguna (misalnya, kemampuan pencatatan dan pelaporan); dan harus telah digunakan secara luas serta diperiksa oleh pengembang lain.

Kerangka kerja pengujian unit untuk kontrak pintar Solidity hadir dalam berbagai bahasa (sebagian besar JavaScript, Python, dan Rust). Lihat beberapa panduan di bawah ini untuk informasi tentang cara mulai menjalankan pengujian unit dengan berbagai kerangka kerja pengujian:

- **[Menjalankan pengujian unit dengan Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**
- **[Menjalankan pengujian unit dengan Foundry](https://book.getfoundry.sh/forge/writing-tests)**
- **[Menjalankan pengujian unit dengan Waffle](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)**
- **[Menjalankan pengujian unit dengan Remix](https://remix-ide.readthedocs.io/en/latest/unittesting.html#write-tests)**
- **[Menjalankan pengujian unit dengan Ape](https://docs.apeworx.io/ape/stable/userguides/testing.html)**
- **[Menjalankan pengujian unit dengan Hardhat](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)**
- **[Menjalankan pengujian unit dengan Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)**

### Pengujian integrasi {#integration-testing-for-smart-contracts}

Sementara pengujian unit men-debug fungsi kontrak secara terisolasi, pengujian integrasi mengevaluasi komponen kontrak pintar secara keseluruhan. Pengujian integrasi dapat mendeteksi masalah yang timbul dari panggilan lintas kontrak atau interaksi antara berbagai fungsi dalam kontrak pintar yang sama. Misalnya, pengujian integrasi dapat membantu memeriksa apakah hal-hal seperti [pewarisan (inheritance)](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance) dan injeksi dependensi berfungsi dengan baik.

Pengujian integrasi berguna jika kontrak Anda mengadopsi arsitektur modular atau antarmuka dengan kontrak onchain lainnya selama eksekusi. Salah satu cara menjalankan pengujian integrasi adalah dengan melakukan [fork blockchain](/glossary/#fork) pada ketinggian tertentu (menggunakan alat seperti [Forge](https://book.getfoundry.sh/forge/fork-testing) atau [Hardhat](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks) dan menyimulasikan interaksi antara kontrak Anda dan kontrak yang diterapkan.

Blockchain yang di-fork akan berperilaku mirip dengan Mainnet dan memiliki akun dengan status dan saldo terkait. Namun, ini hanya bertindak sebagai lingkungan pengembangan lokal yang di-sandbox, yang berarti Anda tidak akan memerlukan ETH nyata untuk transaksi, misalnya, dan perubahan Anda tidak akan memengaruhi protokol Ethereum yang sebenarnya.

### Pengujian berbasis properti {#property-based-testing-for-smart-contracts}

Pengujian berbasis properti adalah proses memeriksa bahwa kontrak pintar memenuhi beberapa properti yang ditentukan. Properti menegaskan fakta tentang perilaku kontrak yang diharapkan tetap benar dalam berbagai skenario—contoh properti kontrak pintar bisa berupa "Operasi aritmatika dalam kontrak tidak pernah mengalami overflow atau underflow."

**Analisis statis** dan **analisis dinamis** adalah dua teknik umum untuk mengeksekusi pengujian berbasis properti, dan keduanya dapat memverifikasi bahwa kode untuk suatu program (kontrak pintar dalam hal ini) memenuhi beberapa properti yang telah ditentukan sebelumnya. Beberapa alat pengujian berbasis properti dilengkapi dengan aturan yang telah ditentukan sebelumnya tentang properti kontrak yang diharapkan dan memeriksa kode terhadap aturan tersebut, sementara yang lain memungkinkan Anda membuat properti kustom untuk kontrak pintar.

#### Analisis statis {#static-analysis}

Penganalisis statis mengambil kode sumber kontrak pintar sebagai masukan dan mengeluarkan hasil yang menyatakan apakah kontrak memenuhi suatu properti atau tidak. Tidak seperti analisis dinamis, analisis statis tidak melibatkan eksekusi kontrak untuk menganalisis kebenarannya. Analisis statis sebaliknya menalar tentang semua kemungkinan jalur yang dapat diambil oleh kontrak pintar selama eksekusi (yaitu, dengan memeriksa struktur kode sumber untuk menentukan apa artinya bagi operasi kontrak saat runtime).

[Linting](https://www.perforce.com/blog/qac/what-is-linting) dan [pengujian statis](https://www.techtarget.com/whatis/definition/static-analysis-static-code-analysis) adalah metode umum untuk menjalankan analisis statis pada kontrak. Keduanya memerlukan analisis representasi tingkat rendah dari eksekusi kontrak seperti [pohon sintaksis abstrak (abstract syntax trees)](https://en.m.wikipedia.org/wiki/Abstract_syntax_tree) dan [grafik aliran kontrol (control flow graphs)](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/amp/) yang dihasilkan oleh kompiler.

Dalam kebanyakan kasus, analisis statis berguna untuk mendeteksi masalah keamanan seperti penggunaan konstruksi yang tidak aman, kesalahan sintaksis, atau pelanggaran standar pengkodean dalam kode kontrak. Namun, penganalisis statis diketahui umumnya tidak kuat dalam mendeteksi kerentanan yang lebih dalam, dan dapat menghasilkan positif palsu yang berlebihan.

#### Analisis dinamis {#dynamic-analysis}

Analisis dinamis menghasilkan masukan simbolis (misalnya, dalam [eksekusi simbolis](https://en.m.wikipedia.org/wiki/Symbolic_execution)) atau masukan konkret (misalnya, dalam [fuzzing](https://owasp.org/www-community/Fuzzing)) ke fungsi kontrak pintar untuk melihat apakah ada jejak eksekusi yang melanggar properti tertentu. Bentuk pengujian berbasis properti ini berbeda dari pengujian unit karena kasus uji mencakup berbagai skenario dan sebuah program menangani pembuatan kasus uji.

[Fuzzing](https://www.halborn.com/blog/post/what-is-fuzz-testing-fuzzing) adalah contoh teknik analisis dinamis untuk memverifikasi properti arbitrer dalam kontrak pintar. Fuzzer memanggil fungsi dalam kontrak target dengan variasi acak atau cacat dari nilai masukan yang ditentukan. Jika kontrak pintar memasuki status kesalahan (misalnya, di mana asersi gagal), masalah tersebut ditandai dan masukan yang mendorong eksekusi menuju jalur yang rentan dihasilkan dalam sebuah laporan.

Fuzzing berguna untuk mengevaluasi mekanisme validasi masukan kontrak pintar karena penanganan masukan yang tidak terduga secara tidak tepat dapat mengakibatkan eksekusi yang tidak diinginkan dan menghasilkan efek berbahaya. Bentuk pengujian berbasis properti ini bisa ideal karena banyak alasan:

1. **Menulis kasus uji untuk mencakup banyak skenario adalah hal yang sulit.** Pengujian properti hanya mengharuskan Anda menentukan perilaku dan rentang data untuk menguji perilaku tersebut—program secara otomatis menghasilkan kasus uji berdasarkan properti yang ditentukan.

2. **Rangkaian pengujian Anda mungkin tidak cukup mencakup semua kemungkinan jalur di dalam program.** Bahkan dengan cakupan 100%, ada kemungkinan untuk melewatkan kasus ekstrem.

3. **Pengujian unit membuktikan bahwa kontrak dieksekusi dengan benar untuk data sampel, tetapi apakah kontrak dieksekusi dengan benar untuk masukan di luar sampel tetap tidak diketahui.** Pengujian properti mengeksekusi kontrak target dengan berbagai variasi nilai masukan yang diberikan untuk menemukan jejak eksekusi yang menyebabkan kegagalan asersi. Dengan demikian, pengujian properti memberikan lebih banyak jaminan bahwa kontrak dieksekusi dengan benar untuk kelas data masukan yang luas.

### Panduan untuk menjalankan pengujian berbasis properti untuk kontrak pintar {#running-property-based-tests}

Menjalankan pengujian berbasis properti biasanya dimulai dengan menentukan properti (misalnya, tidak adanya [integer overflows](https://github.com/ConsenSys/mythril/wiki/Integer-Overflow)) atau kumpulan properti yang ingin Anda verifikasi dalam kontrak pintar. Anda mungkin juga perlu menentukan rentang nilai di mana program dapat menghasilkan data untuk masukan transaksi saat menulis pengujian properti.

Setelah dikonfigurasi dengan benar, alat pengujian properti akan mengeksekusi fungsi kontrak pintar Anda dengan masukan yang dihasilkan secara acak. Jika ada pelanggaran asersi, Anda akan mendapatkan laporan dengan data masukan konkret yang melanggar properti yang sedang dievaluasi. Lihat beberapa panduan di bawah ini untuk mulai menjalankan pengujian berbasis properti dengan berbagai alat:

- **[Analisis statis kontrak pintar dengan Slither](https://github.com/crytic/slither)**
- **[Analisis statis kontrak pintar dengan Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)**
- **[Pengujian berbasis properti dengan Brownie](https://eth-brownie.readthedocs.io/en/stable/tests-hypothesis-property.html)**
- **[Fuzzing kontrak dengan Foundry](https://book.getfoundry.sh/forge/fuzz-testing)**
- **[Fuzzing kontrak dengan Echidna](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna#echidna-tutorial)**
- **[Fuzzing kontrak dengan Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/fuzzing/)**
- **[Eksekusi simbolis kontrak pintar dengan Manticore](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore#manticore-tutorial)**
- **[Eksekusi simbolis kontrak pintar dengan Mythril](https://mythril-classic.readthedocs.io/en/master/tutorial.html)**

## Pengujian manual untuk kontrak pintar {#manual-testing-for-smart-contracts}

Pengujian manual kontrak pintar sering kali dilakukan belakangan dalam siklus pengembangan setelah menjalankan pengujian otomatis. Bentuk pengujian ini mengevaluasi kontrak pintar sebagai satu produk yang terintegrasi penuh untuk melihat apakah kinerjanya sesuai dengan yang ditentukan dalam persyaratan teknis.

### Menguji kontrak di blockchain lokal {#testing-on-local-blockchain}

Meskipun pengujian otomatis yang dilakukan di lingkungan pengembangan lokal dapat memberikan informasi debugging yang berguna, Anda pasti ingin mengetahui bagaimana perilaku kontrak pintar Anda di lingkungan produksi. Namun, penerapan ke rantai utama Ethereum menimbulkan biaya gas—belum lagi Anda atau pengguna Anda dapat kehilangan uang sungguhan jika kontrak pintar Anda masih memiliki bug.

Menguji kontrak Anda di blockchain lokal (juga dikenal sebagai [jaringan pengembangan](/developers/docs/development-networks/)) adalah alternatif yang disarankan untuk pengujian di Mainnet. Blockchain lokal adalah salinan blockchain Ethereum yang berjalan secara lokal di komputer Anda yang menyimulasikan perilaku lapisan eksekusi Ethereum. Dengan demikian, Anda dapat memprogram transaksi untuk berinteraksi dengan kontrak tanpa menimbulkan overhead yang signifikan.

Menjalankan kontrak di blockchain lokal dapat berguna sebagai bentuk pengujian integrasi manual. [Kontrak pintar sangat dapat dikomposisikan](/developers/docs/smart-contracts/composability/), memungkinkan Anda untuk berintegrasi dengan protokol yang ada—tetapi Anda tetap perlu memastikan bahwa interaksi onchain yang kompleks tersebut menghasilkan hasil yang benar.

[Lebih lanjut tentang jaringan pengembangan.](/developers/docs/development-networks/)

### Menguji kontrak di testnet {#testing-contracts-on-testnets}

Jaringan pengujian atau testnet bekerja persis seperti Mainnet Ethereum, kecuali bahwa ia menggunakan ether (ETH) tanpa nilai dunia nyata. Menerapkan kontrak Anda di [testnet](/developers/docs/networks/#ethereum-testnets) berarti siapa pun dapat berinteraksi dengannya (misalnya, melalui frontend dapp) tanpa membahayakan dana.

Bentuk pengujian manual ini berguna untuk mengevaluasi alur ujung-ke-ujung (end-to-end) aplikasi Anda dari sudut pandang pengguna. Di sini, penguji beta juga dapat melakukan uji coba dan melaporkan masalah apa pun dengan logika bisnis kontrak dan fungsionalitas secara keseluruhan.

Menerapkan di testnet setelah pengujian di blockchain lokal sangat ideal karena testnet lebih dekat dengan perilaku Mesin Virtual Ethereum. Oleh karena itu, merupakan hal yang umum bagi banyak proyek asli Ethereum untuk menerapkan dapps di testnet guna mengevaluasi operasi kontrak pintar di bawah kondisi dunia nyata.

[Lebih lanjut tentang testnet Ethereum.](/developers/docs/development-networks/#public-beacon-testchains)

## Pengujian vs. verifikasi formal {#testing-vs-formal-verification}

Meskipun pengujian membantu mengonfirmasi bahwa kontrak mengembalikan hasil yang diharapkan untuk beberapa masukan data, pengujian tidak dapat secara meyakinkan membuktikan hal yang sama untuk masukan yang tidak digunakan selama pengujian. Oleh karena itu, menguji kontrak pintar tidak dapat menjamin "kebenaran fungsional" (yaitu, tidak dapat menunjukkan bahwa program berperilaku seperti yang disyaratkan untuk _semua_ set nilai masukan).

Verifikasi formal adalah pendekatan untuk menilai kebenaran perangkat lunak dengan memeriksa apakah model formal program cocok dengan spesifikasi formal. Model formal adalah representasi matematis abstrak dari sebuah program, sedangkan spesifikasi formal mendefinisikan properti program (yaitu, asersi logis tentang eksekusi program).

Karena properti ditulis dalam istilah matematis, menjadi mungkin untuk memverifikasi bahwa model formal (matematis) dari sistem memenuhi spesifikasi menggunakan aturan inferensi logis. Dengan demikian, alat verifikasi formal dikatakan menghasilkan 'bukti matematis' dari kebenaran sistem.

Tidak seperti pengujian, verifikasi formal dapat digunakan untuk memverifikasi eksekusi kontrak pintar yang memenuhi spesifikasi formal untuk _semua_ eksekusi (yaitu, tidak memiliki bug) tanpa perlu mengeksekusinya dengan data sampel. Hal ini tidak hanya mengurangi waktu yang dihabiskan untuk menjalankan lusinan pengujian unit, tetapi juga lebih efektif dalam menangkap kerentanan yang tersembunyi. Meskipun demikian, teknik verifikasi formal berada pada spektrum yang bergantung pada kesulitan implementasi dan kegunaannya.

[Lebih lanjut tentang verifikasi formal untuk kontrak pintar.](/developers/docs/smart-contracts/formal-verification)

## Pengujian vs audit dan bug bounty {#testing-vs-audits-bug-bounties}

Seperti yang disebutkan, pengujian yang ketat jarang dapat menjamin tidak adanya bug dalam kontrak; pendekatan verifikasi formal dapat memberikan jaminan kebenaran yang lebih kuat tetapi saat ini sulit digunakan dan menimbulkan biaya yang cukup besar.

Namun, Anda dapat lebih meningkatkan kemungkinan menangkap kerentanan kontrak dengan mendapatkan tinjauan kode independen. [Audit kontrak pintar](https://www.immunebytes.com/blog/what-is-a-smart-contract-audit/) dan [bug bounty](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7) adalah dua cara untuk meminta orang lain menganalisis kontrak Anda.

Audit dilakukan oleh auditor yang berpengalaman dalam menemukan kasus kelemahan keamanan dan praktik pengembangan yang buruk dalam kontrak pintar. Audit biasanya akan mencakup pengujian (dan mungkin verifikasi formal) serta tinjauan manual dari seluruh basis kode.

Sebaliknya, program bug bounty biasanya melibatkan penawaran hadiah finansial kepada individu (umumnya digambarkan sebagai [peretas topi putih (whitehat hackers)](<https://en.wikipedia.org/wiki/White_hat_(computer_security)>)) yang menemukan kerentanan dalam kontrak pintar dan mengungkapkannya kepada pengembang. Bug bounty mirip dengan audit karena melibatkan permintaan kepada orang lain untuk membantu menemukan cacat dalam kontrak pintar.

Perbedaan utamanya adalah bahwa program bug bounty terbuka untuk komunitas pengembang/peretas yang lebih luas dan menarik kelas peretas etis serta profesional keamanan independen yang luas dengan keterampilan dan pengalaman unik. Ini mungkin menjadi keuntungan dibandingkan audit kontrak pintar yang terutama bergantung pada tim yang mungkin memiliki keahlian terbatas atau sempit.

## Alat dan pustaka pengujian {#testing-tools-and-libraries}

### Alat pengujian unit {#unit-testing-tools}

- **[solidity-coverage](https://github.com/sc-forks/solidity-coverage)** - _Alat cakupan kode untuk kontrak pintar yang ditulis dalam Solidity._

- **[Waffle](https://ethereum-waffle.readthedocs.io/en/latest/)** - _Kerangka kerja untuk pengembangan dan pengujian kontrak pintar tingkat lanjut (berbasis ethers.js)_.

- **[Remix Tests](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)** - _Alat untuk menguji kontrak pintar Solidity. Bekerja di bawah plugin "Solidity Unit Testing" Remix IDE yang digunakan untuk menulis dan menjalankan kasus uji untuk sebuah kontrak._

- **[OpenZeppelin Test Helpers](https://github.com/OpenZeppelin/openzeppelin-test-helpers)** - _Pustaka asersi untuk pengujian kontrak pintar Ethereum. Pastikan kontrak Anda berperilaku seperti yang diharapkan!_

- **[Kerangka kerja pengujian unit Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)** - _Brownie memanfaatkan Pytest, kerangka kerja pengujian kaya fitur yang memungkinkan Anda menulis pengujian kecil dengan kode minimal, berskala baik untuk proyek besar, dan sangat dapat diperluas._

- **[Foundry Tests](https://github.com/foundry-rs/foundry/tree/master/crates/forge)** - _Foundry menawarkan Forge, kerangka kerja pengujian Ethereum yang cepat dan fleksibel yang mampu mengeksekusi pengujian unit sederhana, pemeriksaan pengoptimalan gas, dan fuzzing kontrak._

- **[Hardhat Tests](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)** - _Kerangka kerja untuk menguji kontrak pintar berbasis ethers.js, Mocha, dan Chai._

- **[ApeWorx](https://docs.apeworx.io/ape/stable/userguides/testing.html)** - _Kerangka kerja pengembangan dan pengujian berbasis Python untuk kontrak pintar yang menargetkan Mesin Virtual Ethereum._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)** - _Kerangka kerja berbasis Python untuk pengujian unit dan fuzzing dengan kemampuan debugging yang kuat dan dukungan pengujian lintas rantai, memanfaatkan pytest dan Anvil untuk pengalaman pengguna dan kinerja terbaik._

### Alat pengujian berbasis properti {#property-based-testing-tools}

#### Alat analisis statis {#static-analysis-tools}

- **[Slither](https://github.com/crytic/slither)** - _Kerangka kerja analisis statis Solidity berbasis Python untuk menemukan kerentanan, meningkatkan pemahaman kode, dan menulis analisis kustom untuk kontrak pintar._

- **[Ethlint](https://ethlint.readthedocs.io/en/latest/)** - _Linter untuk menegakkan gaya dan praktik terbaik keamanan untuk bahasa pemrograman kontrak pintar Solidity._

- **[Cyfrin Aderyn](https://cyfrin.io/tools/aderyn)** - _Penganalisis statis berbasis Rust yang dirancang khusus untuk keamanan dan pengembangan kontrak pintar Web3._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)** - _Kerangka kerja analisis statis berbasis Python dengan detektor kerentanan dan kualitas kode, pencetak untuk mengekstrak informasi berguna dari kode dan dukungan untuk menulis submodul kustom._

- **[Slippy](https://github.com/fvictorio/slippy)** - _Linter yang sederhana dan kuat untuk Solidity._

#### Alat analisis dinamis {#dynamic-analysis-tools}

- **[Echidna](https://github.com/crytic/echidna/)** - _Fuzzer kontrak cepat untuk mendeteksi kerentanan dalam kontrak pintar melalui pengujian berbasis properti._

- **[Diligence Fuzzing](https://consensys.net/diligence/fuzzing/)** - _Alat fuzzing otomatis yang berguna untuk mendeteksi pelanggaran properti dalam kode kontrak pintar._

- **[Manticore](https://manticore.readthedocs.io/en/latest/index.html)** - _Kerangka kerja eksekusi simbolis dinamis untuk menganalisis bytecode EVM._

- **[Mythril](https://github.com/ConsenSys/mythril-classic)** - _Alat penilaian bytecode EVM untuk mendeteksi kerentanan kontrak menggunakan analisis taint, analisis concolic, dan pemeriksaan aliran kontrol._

- **[Diligence Scribble](https://consensys.net/diligence/scribble/)** - _Scribble adalah bahasa spesifikasi dan alat verifikasi runtime yang memungkinkan Anda membuat anotasi kontrak pintar dengan properti yang memungkinkan Anda menguji kontrak secara otomatis dengan alat seperti Diligence Fuzzing atau MythX._

## Tutorial terkait {#related-tutorials}

- [Tinjauan dan perbandingan berbagai produk pengujian](/developers/tutorials/guide-to-smart-contract-security-tools/) \_
- [Cara menggunakan Echidna untuk menguji kontrak pintar](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [Cara menggunakan Manticore untuk menemukan bug kontrak pintar](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Cara menggunakan Slither untuk menemukan bug kontrak pintar](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Cara membuat tiruan (mock) kontrak Solidity untuk pengujian](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [Cara menjalankan pengujian unit di Solidity menggunakan Foundry](https://www.rareskills.io/post/foundry-testing-solidity)

## Bacaan lebih lanjut {#further-reading}

- [Panduan mendalam untuk menguji kontrak pintar Ethereum](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297)
- [Cara menguji kontrak pintar Ethereum](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d)
- [Panduan pengujian unit MolochDAO untuk pengembang](https://github.com/MolochVentures/moloch/tree/4e786db8a4aa3158287e0935dcbc7b1e43416e38/test#moloch-testing-guide)
- [Cara menguji kontrak pintar seperti seorang rockstar](https://forum.openzeppelin.com/t/test-smart-contracts-like-a-rockstar/1001)

## Tutorial: Pengujian kontrak pintar di Ethereum {#tutorials}

- [Cara mengembangkan dan menguji dApp di testnet lokal multi-klien](/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/) _– Panduan menerapkan kontrak pintar ke testnet lokal dan melakukan pengujian._
- [Cara membuat tiruan (mock) kontrak pintar Solidity untuk pengujian](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/) _– Tutorial menengah tentang cara menggunakan data tiruan dan mengimplementasikan pengujian unit._
- [Cara menggunakan Echidna untuk menguji kontrak pintar](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/) _– Pendekatan tingkat lanjut untuk fuzzing dan pengujian kontrak pintar._