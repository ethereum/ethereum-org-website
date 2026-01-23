---
title: Menguji kontrak pintar
description: Gambaran umum tentang teknik dan pertimbangan untuk menguji smart contract Ethereum.
lang: id
---

Blockchain publik seperti Ethereum bersifat immutable, sehingga sulit untuk mengubah kode smart contract setelah diterapkan. [Pola peningkatan kontrak](/developers/docs/smart-contracts/upgrading/) untuk melakukan "peningkatan virtual" ada, tetapi ini sulit untuk diimplementasikan dan memerlukan konsensus sosial. Selain itu, peningkatan hanya dapat memperbaiki kesalahan _setelah_ ditemukan—jika penyerang menemukan kerentanan terlebih dahulu, kontrak pintar Anda berisiko dieksploitasi.

Untuk alasan ini, menguji kontrak pintar sebelum [disebarkan](/developers/docs/smart-contracts/deploying/) ke Jaringan Utama adalah persyaratan minimum untuk [keamanan](/developers/docs/smart-contracts/security/). Terdapat banyak teknik untuk menguji kontrak dan mengevaluasi ketepatan kode; pilihan yang digunakan tergantung pada kebutuhan Anda. Meskipun demikian, satu rangkaian pengujian yang terdiri dari berbagai alat dan pendekatan adalah ideal untuk menangkap baik celah keamanan kecil maupun besar dalam kode kontrak.

## Persyaratan {#prerequisites}

Halaman ini menjelaskan cara menguji smart contract sebelum diterapkan di jaringan Ethereum. Ini mengasumsikan Anda sudah terbiasa dengan [kontrak pintar](/developers/docs/smart-contracts/).

## Apa yang dimaksud dengan pengujian kontrak pintar? Apa itu pengujian kontrak pintar? {#what-is-smart-contract-testing}

Pengujian smart contract adalah proses memverifikasi bahwa kode dari smart contract berfungsi sesuai dengan yang diharapkan. Pengujian berguna untuk memeriksa apakah smart contract tertentu memenuhi persyaratan terkait keandalan, kegunaan, dan keamanan.

Meskipun pendekatannya bervariasi, sebagian besar metode pengujian memerlukan menjalankan smart contract dengan sampel data kecil yang diharapkan akan ditangani oleh kontrak tersebut. Jika kontrak memberikan hasil yang benar untuk data sampel, kontrak diasumsikan berfungsi dengan baik. Sebagian besar perangkat pengujian menyediakan sumber daya untuk menulis dan mengeksekusi [kasus uji](https://en.m.wikipedia.org/wiki/Test_case) untuk memeriksa apakah eksekusi kontrak sesuai dengan hasil yang diharapkan.

### Mengapa penting untuk menguji smart contract? Pentingnya menguji kontrak pintar {#importance-of-testing-smart-contracts}

Karena kontrak pintar sering kali mengelola aset keuangan bernilai tinggi, kesalahan pemrograman kecil dapat dan sering kali menyebabkan [kerugian besar bagi pengguna](https://rekt.news/leaderboard/). Namun, pengujian yang ketat dapat membantu Anda menemukan cacat dan masalah dalam kode smart contract lebih awal, sehingga bisa diperbaiki sebelum diluncurkan di Mainnet.

Meskipun memungkinkan untuk meningkatkan kontrak jika bug ditemukan, peningkatan itu rumit dan dapat [mengakibatkan kesalahan](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/) jika tidak ditangani dengan benar. Memperbarui kontrak lebih lanjut mengurangi prinsip immutability dan membebani pengguna dengan asumsi kepercayaan tambahan. Sebaliknya, rencana pengujian kontrak yang menyeluruh dapat mengurangi risiko keamanan smart contract dan meminimalkan kebutuhan untuk melakukan pembaruan logika yang kompleks setelah kontrak dideploy.

## Metode untuk menguji kontrak pintar {#methods-for-testing-smart-contracts}

Metode untuk menguji kontrak pintar Ethereum terbagi dalam dua kategori besar: **pengujian otomatis** dan **pengujian manual**. Pengujian otomatis dan pengujian manual masing-masing menawarkan keuntungan dan kompromi tersendiri, tetapi kamu bisa menggabungkan keduanya untuk membuat rencana yang kokoh dalam menganalisis kontrak kamu.

### Pengujian otomatis {#automated-testing}

Pengujian otomatis menggunakan alat yang secara otomatis memeriksa kode kontrak pintar untuk mengetahui adanya kesalahan dalam eksekusi. Manfaat pengujian otomatis berasal dari penggunaan [skrip](https://www.techtarget.com/whatis/definition/script?amp=1) untuk memandu evaluasi fungsionalitas kontrak. Pengujian berbasis skrip dapat dijadwalkan untuk dijalankan berulang kali dengan intervensi manusia yang minimal, menjadikan pengujian otomatis lebih efisien dibandingkan pendekatan manual.

Pengujian otomatis sangat berguna ketika pengujian bersifat berulang dan memakan waktu; sulit dilakukan secara manual; rentan terhadap kesalahan manusia; atau melibatkan evaluasi fungsi kontrak yang kritis. Namun, perangkat pengujian otomatis dapat memiliki kekurangan—perangkat tersebut mungkin melewatkan bug tertentu dan menghasilkan banyak [positif palsu](https://www.contrastsecurity.com/glossary/false-positive). Oleh karena itu, memasangkan pengujian otomatis dengan pengujian manual untuk smart contract sangat ideal.

### Pengujian manual {#manual-testing}

Pengujian manual dibantu manusia dan melibatkan eksekusi setiap test case dalam rangkaian pengujian satu per satu saat menganalisis kebenaran kontrak pintar. This is unlike automated testing where you can simultaneously run multiple isolated tests on a contract and get a report showing all failing and passing tests.

Pengujian manual dapat dilakukan oleh satu orang yang mengikuti rencana pengujian tertulis yang mencakup berbagai skenario pengujian. Kamu juga bisa melibatkan beberapa individu atau kelompok untuk berinteraksi dengan smart contract selama periode tertentu sebagai bagian dari pengujian manual. Para penguji akan membandingkan perilaku aktual smart contract dengan perilaku yang diharapkan, menandai setiap perbedaan sebagai bug.

Pengujian manual yang efektif membutuhkan sumber daya yang cukup besar (keahlian, waktu, uang, dan upaya), dan karena adanya kemungkinan kesalahan manusia, beberapa error mungkin terlewat saat pelaksanaan pengujian. Namun, pengujian manual juga bisa bermanfaat—misalnya, seorang penguji manusia seperti auditor dapat menggunakan intuisi untuk menemukan kasus-kasus tepi (edge cases) yang mungkin terlewat oleh alat pengujian otomatis.

## Pengujian otomatis untuk kontrak pintar {#automated-testing-for-smart-contracts}

### Pengujian unit {#unit-testing-for-smart-contracts}

Unit testing mengevaluasi fungsi-fungsi kontrak secara terpisah dan memeriksa apakah setiap komponen bekerja dengan benar. Unit test yang baik seharusnya sederhana, cepat dijalankan, dan memberikan informasi yang jelas tentang apa yang salah jika terjadi kegagalan.

Unit test berguna untuk memastikan bahwa fungsi-fungsi mengembalikan nilai yang diharapkan dan bahwa penyimpanan kontrak diperbarui dengan benar setelah eksekusi fungsi. Selain itu, menjalankan tes unit setelah melakukan perubahan pada basis kode kontrak memastikan penambahan logika baru tidak menimbulkan kesalahan. Di bawah ini adalah beberapa panduan untuk menjalankan tes unit yang efektif:

#### Panduan untuk pengujian unit kontrak pintar {#unit-testing-guidelines}

##### 1. Memahami logika bisnis dan alur kerja kontrak Anda

Sebelum menulis tes unit, ada baiknya untuk mengetahui fungsi apa saja yang ditawarkan oleh smart contract dan bagaimana pengguna akan mengakses dan menggunakan fungsi-fungsi tersebut. Ini sangat berguna untuk menjalankan [pengujian jalur bahagia](https://en.m.wikipedia.org/wiki/Happy_path) yang menentukan apakah fungsi dalam kontrak mengembalikan keluaran yang benar untuk masukan pengguna yang valid. Kami akan menjelaskan konsep ini menggunakan contoh (ringkas) dari [kontrak lelang](https://docs.soliditylang.org/en/v0.8.17/solidity-by-example.html?highlight=Auction%20contract#simple-open-auction) ini

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

Ini adalah kontrak lelang sederhana yang dirancang untuk menerima tawaran selama periode penawaran. Jika `highestBid` meningkat, penawar tertinggi sebelumnya menerima uang mereka; setelah periode penawaran selesai, `beneficiary` memanggil kontrak untuk mendapatkan uang mereka.

Pengujian unit untuk kontrak seperti ini akan mencakup berbagai fungsi yang mungkin dipanggil oleh pengguna ketika berinteraksi dengan kontrak. Contohnya adalah pengujian unit yang memeriksa apakah pengguna dapat memasang penawaran saat lelang sedang berlangsung (misalnya, panggilan ke `bid()` berhasil) atau pengujian yang memeriksa apakah pengguna dapat memasang penawaran yang lebih tinggi dari `highestBid` saat ini.

Memahami alur kerja operasional kontrak juga membantu dalam menulis tes unit yang memeriksa apakah eksekusi memenuhi persyaratan. Misalnya, kontrak lelang menentukan bahwa pengguna tidak dapat memasang penawaran saat lelang telah berakhir (misalnya, ketika `auctionEndTime` lebih rendah dari `block.timestamp`). Dengan demikian, pengembang mungkin menjalankan pengujian unit yang memeriksa apakah panggilan ke fungsi `bid()` berhasil atau gagal saat lelang selesai (misalnya, saat `auctionEndTime` > `block.timestamp`).

##### 2. Mengevaluasi semua asumsi yang terkait dengan pelaksanaan kontrak

Penting untuk mendokumentasikan setiap asumsi tentang pelaksanaan kontrak dan menulis uji unit untuk memverifikasi validitas dari asumsi-asumsi tersebut. Selain menawarkan perlindungan terhadap eksekusi yang tidak terduga, pengujian pernyataan memaksa Anda untuk memikirkan operasi yang dapat merusak model keamanan kontrak pintar. Tip yang berguna adalah melampaui "tes pengguna yang bahagia" dan menulis tes negatif yang memeriksa apakah suatu fungsi gagal untuk input yang salah.

Banyak kerangka kerja pengujian unit yang memungkinkan Anda untuk membuat asersi-pernyataan sederhana yang menyatakan apa yang dapat dan tidak dapat dilakukan oleh sebuah kontrak-dan menjalankan pengujian untuk melihat apakah asersi tersebut dapat dieksekusi. Pengembang yang bekerja pada kontrak lelang yang dijelaskan sebelumnya dapat membuat pernyataan berikut tentang perilakunya sebelum menjalankan tes negatif:

- Pengguna tidak dapat mengajukan penawaran ketika lelang sudah berakhir atau belum dimulai.

- Kontrak lelang akan dibatalkan jika penawaran berada di bawah ambang batas yang dapat diterima.

- Pengguna yang gagal memenangkan penawaran akan dikreditkan dengan dana mereka

**Catatan**: Cara lain untuk menguji asumsi adalah dengan menulis pengujian yang memicu [pengubah fungsi](https://docs.soliditylang.org/en/v0.8.16/contracts.html#function-modifiers) dalam sebuah kontrak, terutama pernyataan `require`, `assert`, dan `if…else`.

##### 3. Mengukur cakupan kode

[Cakupan kode](https://en.m.wikipedia.org/wiki/Code_coverage) adalah metrik pengujian yang melacak jumlah cabang, baris, dan pernyataan dalam kode Anda yang dieksekusi selama pengujian. Pengujian sebaiknya memiliki cakupan kode yang baik untuk meminimalkan risiko adanya kerentanan yang tidak diuji. Tanpa cakupan yang memadai, Anda mungkin keliru mengira kontrak Anda aman karena semua pengujian berhasil, padahal masih ada kerentanan pada jalur kode yang belum diuji. Akan tetapi, pencatatan cakupan kode yang tinggi memberikan jaminan bahwa semua pernyataan/fungsi dalam smart contract telah diuji kebenarannya.

##### 4. Gunakan kerangka kerja pengujian yang dikembangkan dengan baik

Kualitas alat yang digunakan dalam menjalankan unit test untuk smart contract Anda sangatlah penting. Kerangka kerja pengujian yang ideal adalah kerangka kerja yang dipelihara secara teratur; menyediakan fitur-fitur yang berguna (misalnya, kemampuan pencatatan dan pelaporan); dan harus sudah banyak digunakan dan diperiksa oleh pengembang lain.

Kerangka kerja pengujian unit untuk kontrak pintar Solidity tersedia dalam berbagai bahasa (sebagian besar JavaScript, Python, dan Rust). Lihat beberapa panduan di bawah ini untuk informasi mengenai cara mulai menjalankan unit test dengan berbagai framework pengujian:

- **[Menjalankan pengujian unit dengan Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**
- **[Menjalankan pengujian unit dengan Foundry](https://book.getfoundry.sh/forge/writing-tests)**
- **[Menjalankan pengujian unit dengan Waffle](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)**
- **[Menjalankan pengujian unit dengan Remix](https://remix-ide.readthedocs.io/en/latest/unittesting.html#write-tests)**
- **[Menjalankan pengujian unit dengan Ape](https://docs.apeworx.io/ape/stable/userguides/testing.html)**
- **[Menjalankan pengujian unit dengan Hardhat](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)**
- **[Menjalankan pengujian unit dengan Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)**

### Pengujian integrasi {#integration-testing-for-smart-contracts}

Saat uji coba unit men-debug fungsi kontrak secara terpisah, pengujian integrasi mengevaluasi komponen kontrak pintar secara menyeluruh. Uji coba terintegrasi dapat mendeteksi masalah yang timbul dari panggilan lintas kontrak atau interaksi antar fungsi yang berbeda dalam kontrak pintar yang sama. Misalnya, pengujian integrasi dapat membantu memeriksa apakah hal-hal seperti [pewarisan](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance) dan injeksi dependensi berfungsi dengan baik.

Pengujian integrasi berguna jika kontrak Anda mengadopsi arsitektur modular atau berinteraksi dengan kontrak on-chain lain selama eksekusi. Salah satu cara menjalankan pengujian integrasi adalah dengan melakukan [fork pada rantai blok](/glossary/#fork) pada ketinggian tertentu (menggunakan perangkat seperti [Forge](https://book.getfoundry.sh/forge/fork-testing) atau [Hardhat](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks) dan mensimulasikan interaksi antara kontrak Anda dan kontrak yang disebarkan.

Blockchain bercabang akan berperilaku serupa dengan Mainnet dan memiliki akun dengan status dan saldo yang terkait. Tetapi ini hanya bertindak sebagai lingkungan pengembangan lokal sandbox, yang berarti Anda tidak memerlukan ETH asli untuk bertransaksi, misalnya, dan perubahan yang Anda lakukan juga tidak akan memengaruhi protokol Ethereum yang asli.

### Pengujian berbasis properti {#property-based-testing-for-smart-contracts}

Pengujian berbasis properti adalah proses pengecekan bahwa smart contract memenuhi beberapa properti yang ditentukan. Properti menyatakan fakta tentang perilaku kontrak yang diharapkan tetap benar dalam skenario yang berbeda-contoh properti kontrak pintar dapat berupa "Operasi aritmatika dalam kontrak tidak pernah melimpah atau kurang."

**Analisis statis** dan **analisis dinamis** adalah dua teknik umum untuk melaksanakan pengujian berbasis properti, dan keduanya dapat memverifikasi bahwa kode untuk sebuah program (kontrak pintar dalam kasus ini) memenuhi beberapa properti yang telah ditentukan sebelumnya. Beberapa alat pengujian berbasis properti hadir dengan aturan yang sudah ditentukan sebelumnya mengenai properti kontrak yang diharapkan dan memeriksa kode terhadap aturan tersebut, sementara alat pengujian yang lain memungkinkan Anda untuk membuat properti khusus untuk smart contract.

#### Analisis statis {#static-analysis}

Penganalisis statis mengambil input kode sumber dari smart contract dan mengeluarkan hasil yang menyatakan apakah sebuah kontrak memenuhi sebuah properti atau tidak. Tidak seperti analisis dinamis, analisis statis tidak melibatkan eksekusi kontrak untuk menganalisis kebenarannya. Analisis statis memberikan alasan tentang semua jalur yang mungkin diambil oleh smart contract selama eksekusi (yaitu, dengan memeriksa struktur kode sumber untuk menentukan apa yang akan terjadi pada operasi kontrak pada saat runtime).

[Linting](https://www.perforce.com/blog/qac/what-is-linting) dan [pengujian statis](https://www.techtarget.com/whatis/definition/static-analysis-static-code-analysis) adalah metode umum untuk menjalankan analisis statis pada kontrak. Keduanya memerlukan analisis representasi tingkat rendah dari eksekusi kontrak seperti [pohon sintaksis abstrak](https://en.m.wikipedia.org/wiki/Abstract_syntax_tree) dan [grafik alur kontrol](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/amp/) yang dihasilkan oleh kompilator.

Dalam banyak kasus, analisis statis berguna untuk mendeteksi masalah keamanan seperti penggunaan konstruksi yang tidak aman, kesalahan sintaksis, atau pelanggaran standar pengkodean dalam kode kontrak. Namun, penganalisis statis diketahui secara umum tidak baik dalam mendeteksi kerentanan yang lebih dalam, dan dapat menghasilkan positif palsu yang berlebihan.

#### Analisis dinamis {#dynamic-analysis}

Analisis dinamis menghasilkan masukan simbolis (mis., dalam [eksekusi simbolis](https://en.m.wikipedia.org/wiki/Symbolic_execution)) atau masukan konkret (mis., dalam [fuzzing](https://owasp.org/www-community/Fuzzing)) ke fungsi kontrak pintar untuk melihat apakah ada jejak eksekusi yang melanggar properti tertentu. Bentuk pengujian berbasis properti ini berbeda dengan pengujian unit karena kasus pengujian mencakup beberapa skenario dan program menangani pembuatan kasus pengujian.

[Fuzzing](https://www.halborn.com/blog/post/what-is-fuzz-testing-fuzzing) adalah contoh teknik analisis dinamis untuk memverifikasi properti arbitrer dalam kontrak pintar. Sebuah fuzzer memanggil fungsi dalam kontrak target dengan variasi acak atau cacat dari nilai input yang ditentukan. Jika smart contract memasuki kondisi kesalahan (misalnya, kondisi di mana sebuah pernyataan gagal), masalahnya ditandai dan input yang mendorong eksekusi ke arah jalur yang rentan dibuat dalam sebuah laporan.

Fuzzing berguna untuk mengevaluasi mekanisme validasi input smart contract karena penanganan yang tidak tepat terhadap input yang tidak diharapkan dapat menyebabkan eksekusi yang tidak diinginkan dan menghasilkan efek yang berbahaya. Bentuk pengujian berbasis properti ini dapat menjadi ideal untuk berbagai alasan:

1. **Menulis kasus uji untuk mencakup banyak skenario itu sulit.** Pengujian properti hanya mengharuskan Anda menentukan perilaku dan rentang data untuk menguji perilaku tersebut—program secara otomatis menghasilkan kasus uji berdasarkan properti yang ditentukan.

2. **Rangkaian pengujian Anda mungkin tidak cukup mencakup semua jalur yang mungkin dalam program.** Bahkan dengan cakupan 100%, ada kemungkinan untuk melewatkan kasus tepi.

3. **Pengujian unit membuktikan bahwa kontrak dieksekusi dengan benar untuk data sampel, tetapi apakah kontrak dieksekusi dengan benar untuk masukan di luar sampel masih belum diketahui.** Pengujian properti mengeksekusi kontrak target dengan beberapa variasi nilai masukan yang diberikan untuk menemukan jejak eksekusi yang menyebabkan kegagalan pernyataan. Dengan demikian, uji properti memberikan lebih banyak jaminan bahwa kontrak dieksekusi dengan benar untuk kelas data input yang luas.

### Panduan untuk menjalankan pengujian berbasis properti untuk kontrak pintar {#running-property-based-tests}

Menjalankan pengujian berbasis properti biasanya dimulai dengan menentukan properti (misalnya, tidak adanya [integer overflow](https://github.com/ConsenSys/mythril/wiki/Integer-Overflow)) atau kumpulan properti yang ingin Anda verifikasi dalam kontrak pintar. Anda mungkin juga perlu mendefinisikan rentang nilai di mana program dapat menghasilkan data untuk input transaksi ketika menulis tes properti.

Setelah dikonfigurasi dengan benar, alat pengujian properti akan menjalankan fungsi kontrak pintar Anda dengan input yang dibuat secara acak. Jika ada pelanggaran pernyataan, Anda harus mendapatkan laporan dengan data masukan konkret yang melanggar properti yang sedang dievaluasi. Lihat beberapa panduan di bawah ini untuk memulai menjalankan pengujian berbasis properti dengan berbagai alat:

- **[Analisis statis kontrak pintar dengan Slither](https://github.com/crytic/slither)**
- **[Analisis statis kontrak pintar dengan Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)**
- **[Pengujian berbasis properti dengan Brownie](https://eth-brownie.readthedocs.io/en/stable/tests-hypothesis-property.html)**
- **[Fuzzing kontrak dengan Foundry](https://book.getfoundry.sh/forge/fuzz-testing)**
- **[Fuzzing kontrak dengan Echidna](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna#echidna-tutorial)**
- **[Fuzzing kontrak dengan Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/fuzzing/)**
- **[Eksekusi simbolis kontrak pintar dengan Manticore](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore#manticore-tutorial)**
- **[Eksekusi simbolis kontrak pintar dengan Mythril](https://mythril-classic.readthedocs.io/en/master/tutorial.html)**

## Pengujian manual untuk kontrak pintar {#manual-testing-for-smart-contracts}

Pengujian manual smart contract sering kali dilakukan belakangan dalam siklus pengembangan setelah menjalankan pengujian otomatis. Bentuk pengujian ini mengevaluasi smart contract sebagai satu produk yang terintegrasi penuh untuk melihat apakah ia bekerja seperti yang ditentukan dalam persyaratan teknis.

### Menguji kontrak pada rantai blok lokal {#testing-on-local-blockchain}

Meskipun pengujian otomatis yang dilakukan di lingkungan pengembangan lokal dapat memberikan informasi debugging yang berguna, Anda ingin mengetahui bagaimana perilaku smart contract Anda di lingkungan produksi. Namun, penyebaran ke rantai Ethereum utama menimbulkan biaya gas - belum lagi Anda atau pengguna Anda dapat kehilangan uang nyata jika kontrak pintar Anda masih memiliki bug.

Menguji kontrak Anda di rantai blok lokal (juga dikenal sebagai [jaringan pengembangan](/developers/docs/development-networks/)) adalah alternatif yang direkomendasikan untuk pengujian di Jaringan Utama. Blockchain lokal adalah salinan blockchain Ethereum yang berjalan secara lokal di komputer Anda yang mensimulasikan perilaku lapisan eksekusi Ethereum. Dengan demikian, Anda dapat memprogram transaksi untuk berinteraksi dengan kontrak tanpa menimbulkan biaya tambahan yang signifikan.

Menjalankan kontrak pada blockchain lokal dapat berguna sebagai bentuk pengujian integrasi manual. [Kontrak pintar sangat dapat disusun](/developers/docs/smart-contracts/composability/), memungkinkan Anda untuk berintegrasi dengan protokol yang ada—tetapi Anda masih perlu memastikan bahwa interaksi on-chain yang kompleks tersebut menghasilkan hasil yang benar.

[Selengkapnya tentang jaringan pengembangan.](/developers/docs/development-networks/)

### Menguji kontrak di testnet {#testing-contracts-on-testnets}

Jaringan uji atau testnet bekerja sama persis seperti Ethereum Mainnet, kecuali menggunakan ether (ETH) yang tidak memiliki nilai dunia nyata. Menyebarkan kontrak Anda di [testnet](/developers/docs/networks/#ethereum-testnets) berarti siapa pun dapat berinteraksi dengannya (misalnya, melalui frontend dapp) tanpa membahayakan dana.

Bentuk pengujian manual ini berguna untuk mengevaluasi alur end-to-end aplikasi Anda dari sudut pandang pengguna. Di sini, penguji beta juga dapat melakukan uji coba dan melaporkan masalah apa pun dengan logika bisnis kontrak dan fungsionalitas keseluruhan.

Menerapkan di testnet setelah pengujian di blockchain lokal sangat ideal karena yang pertama lebih dekat dengan perilaku Mesin Virtual Ethereum. Oleh karena itu, sudah menjadi hal yang umum bagi banyak proyek asli Ethereum untuk menggunakan dapps di testnet untuk mengevaluasi operasi kontrak pintar dalam kondisi dunia nyata.

[Selengkapnya tentang testnet Ethereum.](/developers/docs/development-networks/#public-beacon-testchains)

## Pengujian vs. verifikasi formal {#testing-vs-formal-verification}

Meskipun pengujian membantu mengonfirmasi bahwa kontrak memberikan hasil yang diharapkan untuk beberapa input data, pengujian tidak dapat membuktikan hal yang sama untuk input yang tidak digunakan selama pengujian. Oleh karena itu, menguji kontrak pintar tidak dapat menjamin "kebenaran fungsional" (misalnya, tidak dapat menunjukkan bahwa suatu program berperilaku seperti yang diperlukan untuk _semua_ set nilai masukan).

Verifikasi formal adalah pendekatan untuk menilai kebenaran perangkat lunak dengan memeriksa apakah model formal program sesuai dengan spesifikasi formal. Model formal adalah representasi matematis abstrak dari sebuah program, sedangkan spesifikasi formal mendefinisikan sifat-sifat program (yaitu pernyataan logis tentang eksekusi program).

Karena sifat-sifat ditulis dalam istilah matematika, maka dimungkinkan untuk memverifikasi bahwa model formal (matematika) dari sistem memenuhi spesifikasi dengan menggunakan aturan inferensi logis. Dengan demikian, alat verifikasi formal dikatakan menghasilkan 'bukti matematis' atas kebenaran suatu sistem.

Tidak seperti pengujian, verifikasi formal dapat digunakan untuk memverifikasi eksekusi kontrak pintar yang memenuhi spesifikasi formal untuk _semua_ eksekusi (yaitu, tidak ada bug) tanpa perlu mengeksekusinya dengan data sampel. Hal ini tidak hanya mengurangi waktu yang dihabiskan untuk menjalankan lusinan unit test, tetapi juga lebih efektif dalam menangkap kerentanan yang tersembunyi. Meskipun demikian, teknik verifikasi formal berada pada sebuah spektrum yang bergantung pada tingkat kesulitan implementasi dan kegunaannya.

[Selengkapnya tentang verifikasi formal untuk kontrak pintar.](/developers/docs/smart-contracts/formal-verification)

## Pengujian vs. audit dan hadiah bounty bug {#testing-vs-audits-bug-bounties}

Seperti yang telah disebutkan, pengujian yang ketat jarang dapat menjamin tidak adanya bug dalam sebuah kontrak; pendekatan verifikasi formal dapat memberikan jaminan yang lebih kuat akan kebenarannya, tetapi saat ini sulit untuk digunakan dan membutuhkan biaya yang cukup besar.

Namun, Anda dapat lebih meningkatkan kemungkinan menangkap kerentanan kontrak dengan mendapatkan tinjauan kode independen. [Audit kontrak pintar](https://www.immunebytes.com/blog/what-is-a-smart-contract-audit/) dan [hadiah bounty bug](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7) adalah dua cara untuk membuat orang lain menganalisis kontrak Anda.

Audit dilakukan oleh auditor yang berpengalaman dalam menemukan kasus-kasus kelemahan keamanan dan praktik pengembangan yang buruk dalam smart contract. Audit biasanya mencakup pengujian (dan mungkin verifikasi formal) serta tinjauan manual terhadap seluruh basis kode.

Sebaliknya, program hadiah bounty bug biasanya melibatkan penawaran imbalan keuangan kepada seorang individu (biasa disebut sebagai [peretas topi putih](https://en.wikipedia.org/wiki/White_hat_\(computer_security\))) yang menemukan kerentanan dalam kontrak pintar dan mengungkapkannya kepada pengembang. Bug bounty mirip dengan audit karena melibatkan meminta orang lain untuk membantu menemukan cacat pada smart contract.

Perbedaan utamanya adalah program bug bounty terbuka untuk komunitas pengembang/peretas yang lebih luas dan menarik kelas peretas etis dan profesional keamanan independen yang memiliki keahlian dan pengalaman yang unik. Hal ini dapat menjadi keuntungan dibandingkan audit smart contract yang hanya mengandalkan tim yang mungkin memiliki keahlian yang terbatas atau sempit.

## Perangkat dan pustaka pengujian {#testing-tools-and-libraries}

### Perangkat pengujian unit {#unit-testing-tools}

- **[solidity-coverage](https://github.com/sc-forks/solidity-coverage)** - _Perangkat cakupan kode untuk kontrak pintar yang ditulis dalam Solidity._

- **[Waffle](https://ethereum-waffle.readthedocs.io/en/latest/)** - _Kerangka kerja untuk pengembangan dan pengujian kontrak pintar tingkat lanjut (berdasarkan ethers.js)_.

- **[Remix Tests](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)** - _Perangkat untuk menguji kontrak pintar Solidity. Bekerja di bawah plugin Remix IDE "Solidity Unit Testing" yang digunakan untuk menulis dan menjalankan kasus pengujian untuk sebuah kontrak._

- **[OpenZeppelin Test Helpers](https://github.com/OpenZeppelin/openzeppelin-test-helpers)** - _Pustaka asersi untuk pengujian kontrak pintar Ethereum. Pastikan kontrak Anda beroperasi sesuai harapan!_

- **[Kerangka kerja pengujian unit Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)** - _Brownie menggunakan Pytest, sebuah kerangka kerja pengujian yang kaya fitur yang memungkinkan Anda menulis pengujian kecil dengan kode minimal, dapat diskalakan dengan baik untuk proyek besar, dan sangat dapat diperluas._

- **[Foundry Tests](https://github.com/foundry-rs/foundry/tree/master/crates/forge)** - _Foundry menawarkan Forge, sebuah kerangka kerja pengujian Ethereum yang cepat dan fleksibel yang mampu menjalankan pengujian unit sederhana, pemeriksaan optimasi gas, dan fuzzing kontrak._

- **[Hardhat Tests](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)** - _Kerangka kerja untuk menguji kontrak pintar berdasarkan ethers.js, Mocha, dan Chai._

- **[ApeWorx](https://docs.apeworx.io/ape/stable/userguides/testing.html)** - _Kerangka kerja pengembangan dan pengujian berbasis Python untuk kontrak pintar yang menargetkan Mesin Virtual Ethereum._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)** - _Kerangka kerja berbasis Python untuk pengujian unit dan fuzzing dengan kemampuan debugging yang kuat dan dukungan pengujian lintas rantai, memanfaatkan pytest dan Anvil untuk pengalaman pengguna dan kinerja terbaik._

### Perangkat pengujian berbasis properti {#property-based-testing-tools}

#### Perangkat analisis statis {#static-analysis-tools}

- **[Slither](https://github.com/crytic/slither)** - _Kerangka kerja analisis statis Solidity berbasis Python untuk menemukan kerentanan, meningkatkan pemahaman kode, dan menulis analisis kustom untuk kontrak pintar._

- **[Ethlint](https://ethlint.readthedocs.io/en/latest/)** - _Pemeriksa gaya untuk menerapkan gaya dan praktik terbaik keamanan untuk bahasa pemrograman kontrak pintar Solidity._

- **[Cyfrin Aderyn](https://cyfrin.io/tools/aderyn)** - _Penganalisis statis berbasis Rust yang dirancang khusus untuk keamanan dan pengembangan kontrak pintar Web3._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)** - _Kerangka kerja analisis statis berbasis Python dengan detektor kerentanan dan kualitas kode, pencetak untuk mengekstrak informasi yang berguna dari kode dan dukungan untuk menulis submodul khusus._

- **[Slippy](https://github.com/fvictorio/slippy)** - _Pemeriksa gaya yang sederhana dan kuat untuk Solidity._

#### Perangkat analisis dinamis {#dynamic-analysis-tools}

- **[Echidna](https://github.com/crytic/echidna/)** - _Fuzzer kontrak cepat untuk mendeteksi kerentanan dalam kontrak pintar melalui pengujian berbasis properti._

- **[Diligence Fuzzing](https://consensys.net/diligence/fuzzing/)** - _Perangkat fuzzing otomatis yang berguna untuk mendeteksi pelanggaran properti dalam kode kontrak pintar._

- **[Manticore](https://manticore.readthedocs.io/en/latest/index.html)** - _Kerangka kerja eksekusi simbolis dinamis untuk menganalisis kode bita EVM._

- **[Mythril](https://github.com/ConsenSys/mythril-classic)** - _Perangkat penilaian kode bita EVM untuk mendeteksi kerentanan kontrak menggunakan analisis taint, analisis konkolik, dan pemeriksaan alur kontrol._

- **[Diligence Scribble](https://consensys.net/diligence/scribble/)** - _Scribble adalah bahasa spesifikasi dan perangkat verifikasi runtime yang memungkinkan Anda untuk menganotasi kontrak pintar dengan properti yang memungkinkan Anda untuk secara otomatis menguji kontrak dengan perangkat seperti Diligence Fuzzing atau MythX._

## Tutorial terkait {#related-tutorials}

- [Tinjauan umum dan perbandingan berbagai produk pengujian](/developers/tutorials/guide-to-smart-contract-security-tools/) \_
- [Cara menggunakan Echidna untuk menguji kontrak pintar](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [Cara menggunakan Manticore untuk menemukan bug kontrak pintar](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Cara menggunakan Slither untuk menemukan bug kontrak pintar](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Cara melakukan mock pada kontrak Solidity untuk pengujian](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [Cara menjalankan pengujian unit di Solidity menggunakan Foundry](https://www.rareskills.io/post/foundry-testing-solidity)

## Bacaan lebih lanjut {#further-reading}

- [Panduan mendalam untuk menguji kontrak pintar Ethereum](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297)
- [Cara menguji kontrak pintar Ethereum](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d)
- [Panduan pengujian unit MolochDAO untuk pengembang](https://github.com/MolochVentures/moloch/tree/4e786db8a4aa3158287e0935dcbc7b1e43416e38/test#moloch-testing-guide)
- [Cara menguji kontrak pintar seperti seorang profesional](https://forum.openzeppelin.com/t/test-smart-contracts-like-a-rockstar/1001)
