---
title: Keamanan kontrak pintar
description: Ikhtisar pedoman pembuatan kontrak pintar Ethereum yang aman
lang: id
---

Kontrak pintar sangat fleksibel dan mampu mengontrol nilai dan data dalam jumlah besar, sambil menjalankan logika permanen yang berdasarkan kode yang disebarkan pada Rantai Blok. Hal ini telah menciptakan ekosistem dinamis yang terdiri dari aplikasi tanpa kepercayaan dan terdesentralisasi yang memberikan banyak keuntungan dibandingkan sistem legasi. Hal tersebut juga membuka peluang bagi penyerang yang mencari keuntungan dengan mengeksploitasi kerentanan pada kontrak pintar.

Rantai Blok publik, seperti Ethereum, makin memperumit masalah pengamanan kontrak pintar. Kode kontrak yang diterapkan _biasanya_ tidak dapat diubah untuk menambal kelemahan keamanan, sementara aset yang dicuri dari kontrak pintar sangat sulit untuk dilacak dan sebagian besar tidak dapat dipulihkan karena imutabilitas.

Meskipun ada perbedaan angka, diperkirakan bahwa nilai total yang dicuri atau hilang akibat cacat keamanan di kontrak pintar dapat mencapai lebih dari $1 miliar. Ini termasuk insiden-insiden terkenal, seperti [peretasan DAO](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/) (3,6 juta ETH dicuri, senilai lebih dari $1 miliar dengan harga saat ini), [peretasan dompet multi-sig Parity](https://www.coindesk.com/markets/2017/07/19/30-million-ether-reported-stolen-due-to-parity-wallet-breach) ($30 juta hilang karena peretas), dan [masalah dompet beku Parity](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether) (lebih dari $300 juta dalam ETH terkunci selamanya).

Berbagai masalah yang disebutkan di atas mengharuskan pengembang untuk meningkatkan upaya dalam membuat kontrak pintar yang aman, kuat, dan tangguh. Keamanan kontrak pintar adalah masalah yang serius, dan harus dipelajari dengan baik oleh setiap pengembang. Panduan ini akan membahas pertimbangan keamanan bagi pengembang Ethereum dan menyelidiki sumber daya untuk peningkatan keamanan kontrak pintar.

## Persyaratan {#prerequisites}

Pastikan Anda terbiasa dengan [dasar-dasar pengembangan kontrak pintar](/developers/docs/smart-contracts/) sebelum menangani keamanan.

## Panduan untuk membangun kontrak pintar Ethereum yang aman {#smart-contract-security-guidelines}

### 1. Rancang kontrol akses yang tepat {#design-proper-access-controls}

Di dalam kontrak pintar, fungsi yang ditandai `public` atau `external` dapat dipanggil oleh setiap akun milik eksternal (EOA) atau akun kontrak. Menetapkan visibilitas publik untuk fungsi dibutuhkan jika Anda ingin orang lain dapat berinteraksi dengan kontrak Anda. Akan tetapi, fungsi yang ditandai `private` hanya dapat dipanggil oleh fungsi di dalam kontrak pintar, dan tidak bisa dipanggil oleh akun eksternal. Memberikan akses ke fungsi kontrak kepada setiap peserta di jaringan dapat menimbulkan masalah, terutama jika mengakibatkan setiap orang dapat melakukan operasi yang sensitif (misalnya, mencetak token baru).

Untuk mencegah penggunaan fungsi kontrak pintar yang tidak sah, perlu diterapkan kontrol akses yang aman. Mekanisme kontrol akses membatasi kemampuan penggunaan beberapa fungsi tertentu pada kontrak pintar untuk entitas yang disetujui, seperti akun yang bertanggung jawab untuk mengelola kontrak. Pola **Ownable** dan **kontrol berbasis peran** adalah dua pola yang berguna untuk mengimplementasikan kontrol akses dalam kontrak pintar:

#### Pola Ownable {#ownable-pattern}

Dalam pola Ownable atau dapat dimiliki, satu alamat ditetapkan sebagai "pemilik" kontrak selama proses pembuatan kontrak. Fungsi yang dilindungi diberikan pengubah `OnlyOwner`, yang memastikan agar kontrak melakukan autentikasi terhadap identitas alamat pemanggil sebelum menjalankan fungsi tersebut. Panggilan ke fungsi terlindung dari alamat lain, selain pemilik kontrak, akan selalu dikembalikan guna mencegah akses yang tidak diinginkan.

#### Kontrol akses berbasis peran {#role-based-access-control}

Mendaftarkan satu alamat tunggal sebagai `Owner` di kontrak pintar menimbulkan risiko sentralisasi dan berpotensi menjadi titik kegagalan tunggal. Jika kunci akun pemilik berhasil dikuasai, penyerang dapat menyerang kontrak yang dimilikinya. Inilah alasan penggunaan pola kontrol akses yang berbasis peran dengan beberapa akun administratif dapat menjadi pilihan yang lebih baik.

Dalam kontrol akses berbasis peran, akses ke fungsi yang sensitif didistribusikan di antara sekelompok peserta yang tepercaya. Misalnya, satu akun mungkin bertanggung jawab untuk pencetakan token, sementara akun yang lain melakukan peningkatan atau menjeda kontrak. Desentralisasi kontrol akses dengan cara ini menghilangkan titik kegagalan tunggal dan mengurangi asumsi kepercayaan bagi pengguna.

##### Menggunakan dompet multi-tanda tangan

Pendekatan lain untuk menerapkan kontrol akses yang aman adalah menggunakan [akun multi-tanda tangan](/developers/docs/smart-contracts/#multisig) untuk mengelola kontrak. Tidak seperti EOA biasa, akun multi-tanda tangan dimiliki oleh beberapa entitas dan membutuhkan tanda tangan dari beberapa akun dengan jumlah minimum—misalkan 3 dari 5—untuk menjalankan transaksi.

Menggunakan multisig untuk kontrol akses menimbulkan lapisan keamanan tambahan karena tindakan pada kontrak target memerlukan persetujuan dari banyak pihak. Hal ini terutama sangat berguna apabila dibutuhkan penggunaan pola Ownable atau dapat dimiliki, karena pola ini mempersulit penyerang atau orang jahat di internal dalam memanipulasi fungsi kontrak yang sensitif untuk tujuan jahat.

### 2. Gunakan pernyataan require(), assert(), dan revert() untuk menjaga operasi kontrak {#use-require-assert-revert}

Sebagaimana disebutkan, fungsi publik dalam kontrak pintar Anda dapat dipanggil oleh siapa saja setelah disebarkan di Rantai Blok. Karena Anda tidak dapat mengetahui sebelumnya tentang cara akun eksternal berinteraksi dengan kontrak, hal yang ideal adalah menerapkan perlindungan internal terhadap operasi yang bermasalah sebelum penyebaran. Anda dapat menerapkan perilaku yang tepat di kontrak pintar dengan menggunakan pernyataan `require()`, `assert()`, dan `revert()` untuk memicu pengecualian dan mengembalikan perubahan keadaan apabila eksekusi gagal memenuhi persyaratan tertentu.

**`require()`**: `require` didefinisikan pada awal fungsi dan memastikan kondisi pradefinisi terpenuhi sebelum fungsi yang dipanggil dijalankan. Pernyataan `require` dapat digunakan untuk memvalidasi input pengguna, memeriksa variabel keadaan, atau melakukan autentikasi identitas akun pemanggil sebelum melanjutkan dengan fungsi.

**`assert()`**: `assert()` digunakan untuk mendeteksi kesalahan internal dan memeriksa pelanggaran “invarian” dalam kode Anda. Invarian adalah penegasan logis tentang keadaan kontrak yang harus tetap benar untuk semua eksekusi fungsi. Contoh invarian adalah total pasokan atau saldo maksimum dari kontrak token. Menggunakan `assert()` memastikan bahwa kontrak Anda tidak pernah mencapai keadaan rentan, dan jika ya, semua perubahan pada variabel keadaan akan dibatalkan.

**`revert()`**: `revert()` dapat digunakan dalam pernyataan if-else yang memicu pengecualian apabila kondisi yang dibutuhkan tidak terpenuhi. Contoh kontrak di bawah ini menggunakan `revert()` untuk menjaga eksekusi fungsi:

```
pragma solidity ^0.8.4;

contract VendingMachine {
    address owner;
    error Unauthorized();
    function buy(uint amount) public payable {
        if (amount > msg.value / 2 ether)
            revert("Ether yang diberikan tidak cukup.");
        // Lakukan pembelian.
    }
    function withdraw() public {
        if (msg.sender != owner)
            revert Unauthorized();

        payable(msg.sender).transfer(address(this).balance);
    }
}
```

### 3. Uji kontrak pintar dan verifikasi kebenaran kode {#test-smart-contracts-and-verify-code-correctness}

Imutabilitas kode yang berjalan di [Mesin Virtual Ethereum](/developers/docs/evm/) berarti kontrak pintar menuntut tingkat penilaian kualitas yang lebih tinggi selama fase pengembangan. Pengujian kontrak secara ekstensif dan pemantauannya untuk menghindari hasil yang tidak diharapkan akan sangat meningkatkan keamanan dan melindungi pengguna Anda dalam jangka panjang.

Metode yang umum adalah menulis uji unit yang kecil dengan menggunakan data palsu yang biasanya diterima oleh kontrak dari pengguna. [Pengujian unit](/developers/docs/smart-contracts/testing/#unit-testing) bagus untuk menguji fungsionalitas fungsi tertentu dan memastikan kontrak pintar berfungsi seperti yang diharapkan.

Sayangnya, pengujian unit hampir tidak efektif untuk meningkatkan keamanan kontrak pintar apabila digunakan secara terisolasi. Pengujian unit dapat membuktikan berjalan baiknya suatu fungsi dengan data palsu, tetapi efektivitas uji unit ini hanya seefektif uji yang ditulis. Hal ini menyulitkan pendeteksian kasus khusus yang tidak diuji dan kerentanan yang dapat merusak keamanan kontrak pintar Anda.

Pendekatan yang lebih baik adalah menggabungkan pengujian unit dengan pengujian berbasis properti yang dilakukan menggunakan [analisis statis dan dinamis](/developers/docs/smart-contracts/testing/#static-dynamic-analysis). Analisis statis mengandalkan representasi tingkat rendah, seperti [grafik alur kontrol](https://en.wikipedia.org/wiki/Control-flow_graph) dan [pohon sintaksis abstrak](https://deepsource.io/glossary/ast/) untuk menganalisis keadaan program yang dapat dijangkau dan jalur eksekusi. Sementara itu, teknik analisis dinamis, seperti [fuzzing kontrak pintar](https://www.cyfrin.io/blog/smart-contract-fuzzing-and-invariants-testing-foundry), menjalankan kode kontrak dengan nilai input acak untuk mendeteksi operasi yang melanggar properti keamanan.

[Verifikasi formal](/developers/docs/smart-contracts/formal-verification) adalah teknik lain untuk memverifikasi properti keamanan dalam kontrak pintar. Berbeda dengan pengujian rutin, verifikasi formal dapat membuktikan dengan pasti tidak adanya kesalahan di kontrak pintar. Hal ini dicapai dengan membuat spesifikasi formal yang mencakup properti keamanan yang diinginkan dan membuktikan bahwa model formal dari kontrak mematuhi spesifikasi ini.

### 4. Minta tinjauan independen atas kode Anda {#get-independent-code-reviews}

Setelah menguji kontrak Anda, ada baiknya meminta seseorang untuk memeriksa kode sumbernya untuk mendeteksi setiap masalah keamanan. Pengujian tidak akan mengungkap setiap kekurangan di kontrak pintar, tetapi mendapatkan tinjauan independen akan meningkatkan kemungkinan penemuan kerentanan.

#### Audit {#audits}

Melakukan uji coba audit kontrak pintar adalah satu cara untuk melakukan tinjauan kode secara independen. Pihak auditor berperan penting dalam memastikan bahwa kontrak pintar aman dan bebas dari cacat kualitas serta kesalahan desain.

Meskipun demikian, jangan menganggap audit sebagai solusi ajaib untuk semua masalah. Audit kontrak pintar tidak akan menemukan setiap bug dan sebagian besar audit dirancang untuk memberikan babak tinjauan tambahan, yang dapat membantu mendeteksi masalah yang terlewatkan oleh pengembang selama pengembangan awal dan pengujian. Sebaiknya Anda juga mengikuti praktik terbaik dalam bekerja sama dengan auditor, seperti mendokumentasikan kode dengan benar dan menambahkan komentar dalam kode, guna memaksimalkan manfaat audit kontrak pintar.

- [Kiat & trik audit kontrak pintar](https://twitter.com/tinchoabbate/status/1400170232904400897) - _@tinchoabbate_
- [Maksimalkan audit Anda](https://inference.ag/blog/2023-08-14-tips/) - _Inference_

#### Hadiah bounty bug {#bug-bounties}

Menyiapkan program hadiah bounty bug adalah cara lain untuk melaksanakan tinjauan kode secara eksternal. Hadiah bounty bug adalah imbalan finansial yang diberikan kepada para individu (biasanya peretas topi putih) yang menemukan kerentanan dalam aplikasi.

Apabila digunakan dengan tepat, hadiah bounty bug dapat memberikan insentif kepada komunitas peretas untuk memeriksa kode Anda guna menemukan kekurangan yang kritis. Contoh nyata adalah “bug uang tak terbatas” yang memungkinkan penyerang membuat ether dalam jumlah tak terbatas di [Optimism](https://www.optimism.io/), sebuah protokol [Lapisan 2](/layer-2/) yang berjalan di Ethereum. Untungnya, seorang peretas topi putih [menemukan kelemahan tersebut](https://www.saurik.com/optimism.html) dan memberi tahu tim, [mendapatkan bayaran besar dalam prosesnya](https://cryptoslate.com/critical-bug-in-ethereum-l2-optimism-2m-bounty-paid/).

Strategi yang bermanfaat adalah menetapkan pembayaran program hadiah bounty bug secara proporsional dengan jumlah uang yang mengalami risiko. Digambarkan sebagai “[hadiah bounty bug penskalaan](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)”, pendekatan ini memberikan insentif finansial bagi individu untuk secara bertanggung jawab mengungkapkan kerentanan alih-alih mengeksploitasinya.

### 5. Ikuti praktik terbaik selama pengembangan kontrak pintar {#follow-smart-contract-development-best-practices}

Keberadaan audit dan hadiah bounty bug bukan alasan untuk menghindari tanggung jawab penulisan kode program yang berkualitas tinggi. Keamanan kontrak pintar yang baik dimulai dengan mengikuti proses desain dan pengembangan yang tepat:

- Simpan semua kode dalam sistem kontrol versi, seperti git

- Atur semua modifikasi kode melalui permintaan penarikan

- Pastikan permintaan penarikan memiliki setidaknya satu peninjau independen. Jika Anda bekerja solo di suatu proyek, pertimbangkan untuk mencari pengembang lain dan bertukar tinjauan kode

- Gunakan [lingkungan pengembangan](/developers/docs/frameworks/) untuk menguji, mengompilasi, menerapkan kontrak pintar

- Jalankan kode Anda melalui alat analisis kode dasar, seperti [Cyfrin Aderyn](https://github.com/Cyfrin/aderyn), Mythril, dan Slither. Idealnya, hal ini harus dilakukan sebelum digabungkannya setiap permintaan penarikan, lalu bandingkan perbedaannya pada output

- Pastikan kode Anda dikompilasi tanpa kesalahan, dan alat kompilasi Solidity tidak mengeluarkan peringatan

- Dokumentasikan kode Anda dengan benar (menggunakan [NatSpec](https://solidity.readthedocs.io/en/develop/natspec-format.html)) dan jelaskan detail tentang arsitektur kontrak dalam bahasa yang mudah dipahami. Hal ini akan memudahkan orang lain yang akan mengaudit dan meninjau kode Anda.

### 6. Terapkan rencana pemulihan bencana yang kuat {#implement-disaster-recovery-plans}

Merancang kontrol akses yang aman, menerapkan pengubah fungsi, dan saran-saran lainnya dapat meningkatkan keamanan kontrak pintar, tetapi hal-hal tersebut tidak dapat menghilangkan kemungkinan eksploit yang jahat. Membuat kontrak pintar yang aman membutuhkan "persiapan kegagalan" dan rencana cadangan perlu dimiliki untuk merespons serangan secara efektif. Rencana pemulihan bencana yang tepat akan menggabungkan beberapa atau semua komponen berikut ini:

#### Peningkatan kontrak {#contract-upgrades}

Meskipun kontrak pintar Ethereum secara default bersifat permanen, tetapi dimungkinkan untuk melakukan perubahan terbatas dengan menggunakan pola peningkatan. Peningkatan kontrak diperlukan dalam kasus ketika cacat kritis menyebabkan kontrak lama menjadi tidak dapat digunakan dan pilihan paling layak adalah menyebarkan logika baru.

Mekanisme peningkatan kontrak berfungsi dengan cara berbeda, tetapi "pola proksi" adalah salah satu cara yang lebih populer untuk meningkatkan kontrak pintar. [Pola proksi](https://www.cyfrin.io/blog/upgradeable-proxy-smart-contract-pattern) membagi keadaan dan logika aplikasi di antara _dua_ kontrak. Kontrak pertama (disebut 'kontrak proksi') menyimpan variabel keadaan (misalnya, saldo pengguna), sedangkan kontrak kedua (yang disebut 'kontrak logika') menyimpan kode untuk menjalankan fungsi kontrak.

Akun berinteraksi dengan kontrak proksi, yang mengirimkan semua panggilan fungsi ke kontrak logika menggunakan panggilan tingkat rendah [`delegatecall()`](https://docs.soliditylang.org/en/v0.8.16/introduction-to-smart-contracts.html?highlight=delegatecall#delegatecall-callcode-and-libraries). Berbeda dengan pemanggilan message biasa, `delegatecall()` memastikan bahwa kode yang berjalan pada alamat kontrak logika akan dijalankan dalam konteks kontrak yang memanggil. Hal ini berarti bahwa kontrak logika akan selalu menulis ke penyimpanan kontrak proksi (bukan ke penyimpanannya sendiri) dan nilai asli dari `msg.sender` dan `msg.value` akan dipertahankan.

Mendelegasikan panggilan ke kontrak logika membutuhkan penyimpanan alamatnya di penyimpanan kontrak proksi. Oleh sebab itu, peningkatan logika kontrak hanyalah masalah penyebaran kontrak logika yang lain dan menyimpan alamat baru di kontrak proksi. Karena panggilan berikutnya ke kontrak proksi secara otomatis dirutekan ke kontrak logika yang baru, Anda akan "meningkatkan" kontrak tanpa benar-benar mengubah kode.

[Selengkapnya tentang meningkatkan kontrak](/developers/docs/smart-contracts/upgrading/).

#### Penghentian darurat {#emergency-stops}

Seperti yang telah disebutkan, audit dan pengujian yang ekstensif tidak akan dapat menemukan semua bug dalam kontrak pintar. Jika kerentanan muncul dalam kode Anda setelah penyebaran, upaya menambalnya tidak mungkin dilakukan karena Anda tidak dapat mengubah kode yang berjalan di akun kontrak. Selain itu, mekanisme peningkatan (misalnya, pola proksi) dapat memakan waktu untuk diterapkan (sering kali membutuhkan persetujuan dari berbagai pihak), yang hanya memberikan lebih banyak waktu bagi penyerang untuk menimbulkan kerusakan lain.

Opsi nuklir adalah menerapkan fungsi "penghentian darurat" yang akan memblokir panggilan ke fungsi-fungsi yang rentan dalam kontrak. Penghentian darurat biasanya terdiri dari beberapa komponen berikut ini:

1. Variabel Boolean global yang menunjukkan apakah kontrak pintar dalam keadaan berhenti atau tidak. Variabel ini ditetapkan sebagai `false` saat penyiapan kontrak, tetapi akan kembali ke `true` setelah kontrak dihentikan.

2. Fungsi yang mereferensikan variabel Boolean ketika dijalankan. Fungsi-fungsi tersebut dapat diakses ketika kontrak pintar tidak dihentikan, dan menjadi tidak bisa diakses ketika fitur penghentian darurat dipicu.

3. Entitas yang memiliki akses ke fungsi penghentian darurat, yang mengatur variabel Boolean menjadi `true`. Untuk mencegah tindakan jahat, panggilan ke fungsi ini dapat dibatasi hanya untuk alamat tepercaya (misalnya, pemilik kontrak).

Setelah kontrak mengaktifkan penghentian darurat, fungsi tertentu tidak akan dapat dipanggil. Hal ini dicapai dengan memasukkan beberapa fungsi tertentu ke dalam pengubah yang mengacu ke variabel global. Di bawah ini adalah [contoh](https://github.com/fravoll/solidity-patterns/blob/master/EmergencyStop/EmergencyStop.sol) yang menjelaskan implementasi pola ini dalam kontrak:

```solidity
// Kode ini belum diaudit secara profesional dan tidak menjanjikan keamanan atau kebenaran. Gunakan dengan risiko Anda sendiri.

contract EmergencyStop {

    bool isStopped = false;

    modifier stoppedInEmergency {
        require(!isStopped);
        _;
    }

    modifier onlyWhenStopped {
        require(isStopped);
        _;
    }

    modifier onlyAuthorized {
        // Periksa otorisasi msg.sender di sini
        _;
    }

    function stopContract() public onlyAuthorized {
        isStopped = true;
    }

    function resumeContract() public onlyAuthorized {
        isStopped = false;
    }

    function deposit() public payable stoppedInEmergency {
        // Logika deposit terjadi di sini
    }

    function emergencyWithdraw() public onlyWhenStopped {
        // Penarikan darurat terjadi di sini
    }
}
```

Contoh ini menunjukkan fitur dasar penghentian darurat:

- `isStopped` adalah Boolean yang dinilai menjadi `false` saat awal dan `true` ketika kontrak memasuki mode darurat.

- Pengubah fungsi `onlyWhenStopped` dan `stoppedInEmergency` memeriksa variabel `isStopped`. `stoppedInEmergency` digunakan untuk mengontrol fungsi-fungsi yang seharusnya tidak dapat diakses saat kontrak rentan (mis., `deposit()`). Panggilan ke berbagai fungsi ini akan langsung dibatalkan.

`onlyWhenStopped` digunakan untuk fungsi-fungsi yang seharusnya dapat dipanggil selama keadaan darurat (mis., `emergencyWithdraw()`). Fungsi-fungsi tersebut dapat membantu mengatasi situasi sehingga dikecualikan dari daftar "fungsi terbatas".

Penggunaan fungsionalitas penghentian darurat memberikan tindakan sementara yang efektif untuk menangani kerentanan serius pada kontrak pintar Anda. Namun, fungsi ini membutuhkan kepercayaan lebih besar dari pengguna terhadap pengembang agar tidak mengaktifkan fungsi ini untuk kepentingannya sendiri. Untuk tujuan ini, mendesentralisasi kendali atas mekanisme penghentian darurat misalnya dengan menempatkannya di bawah mekanisme pemungutan suara onchain, timelock, atau persetujuan dari dompet multisig merupakan solusi yang memungkinkan.

#### Pemantauan event {#event-monitoring}

[Event](https://docs.soliditylang.org/en/v0.8.15/contracts.html#events) memungkinkan Anda melacak panggilan ke fungsi kontrak pintar dan memantau perubahan pada variabel keadaan. Idealnya, kontrak pintar Anda diprogram untuk mengeluarkan aksi setiap kali ada pihak yang melakukan tindakan yang kritis dari segi keamanan (misalnya, menarik dana).

Pencatatan log untuk aksi dan pemantauan secara offchain memberikan wawasan tentang operasi kontrak serta membantu deteksi lebih cepat terhadap tindakan jahat. Hal ini berarti tim Anda dapat merespons lebih cepat terhadap peretasan dan melakukan tindakan untuk mengurangi dampaknya terhadap pengguna, seperti menjeda fungsi atau melakukan peningkatan.

Anda juga dapat memilih alat pemantauan yang dijual bebas yang secara otomatis mengirimkan peringatan setiap kali seseorang berinteraksi dengan kontrak Anda. Dengan berbagai alat ini, Anda dapat membuat peringatan khusus berdasarkan berbagai pemicu, seperti volume transaksi, frekuensi panggilan fungsi, atau fungsi tertentu yang terlibat. Misalnya, Anda dapat memprogram peringatan yang muncul ketika jumlah penarikan dalam satu transaksi melewati ambang batas tertentu.

### 7. Rancang sistem tata kelola yang aman {#design-secure-governance-systems}

Anda mungkin ingin mendesentralisasi aplikasi Anda dengan menyerahkan kontrol atas kontrak pintar inti ke anggota komunitas. Dalam hal ini, sistem smart contract akan mencakup modul tata kelola—sebuah mekanisme yang memungkinkan anggota komunitas menyetujui tindakan administratif melalui sistem tata kelola onchain. Misalnya, proposal peningkatan kontrak proksi menjadi implementasi baru dapat dipilih oleh para pemegang token.

Tata kelola terdesentralisasi dapat bermanfaat, terutama karena sejalan dengan kepentingan pengembang dan pengguna akhir. Namun demikian, mekanisme tata kelola kontrak pintar dapat menimbulkan risiko baru jika penerapannya tidak tepat. Skenario yang masuk akal adalah jika penyerang memperoleh kekuatan suara yang sangat besar (diukur dalam jumlah token yang dimiliki) dengan mengambil [pinjaman kilat](/defi/#flash-loans) dan mendorong proposal jahat.

Salah satu cara untuk mencegah masalah yang terkait dengan tata kelola on-chain adalah dengan [menggunakan timelock](https://blog.openzeppelin.com/protect-your-users-with-smart-contract-timelocks/). Timelock (penguncian waktu) mencegah kontrak pintar menjalankan tindakan tertentu hingga berlalunya jangka waktu tertentu. Strategi lain termasuk menetapkan "bobot suara" pada setiap token berdasarkan lamanya token tersebut terkunci, atau mengukur kekuatan suara dari alamat pada periode sebelumnya (misalnya, 2-3 blok sebelumnya) sebagai pengganti blok saat ini. Kedua metode ini mengurangi kemungkinan mengumpulkan kekuatan suara dengan cepat untuk mengayunkan suara secara berantai.

Selengkapnya tentang [merancang sistem tata kelola yang aman](https://blog.openzeppelin.com/smart-contract-security-guidelines-4-strategies-for-safer-governance-systems/), [mekanisme pemungutan suara yang berbeda di DAO](https://hackernoon.com/governance-is-the-holy-grail-for-daos), dan [vektor serangan DAO umum yang memanfaatkan DeFi](https://dacian.me/dao-governance-defi-attacks) di tautan yang dibagikan.

### 8. Kurangi kompleksitas dalam kode seminimal mungkin {#reduce-code-complexity}

Pengembang perangkat lunak tradisional akrab dengan prinsip KISS ("usahakan tetap sederhana"), yang menyarankan agar tidak memasukkan kompleksitas yang tidak perlu ke dalam desain perangkat lunak. Hal ini mengikuti pemikiran lama bahwa "sistem kompleks akan gagal dengan cara yang kompleks" dan menjadi lebih rentan terhadap kesalahan yang sangat merugikan.

Menjaga kesederhanaan terutama penting saat menulis kontrak pintar, mengingat bahwa kontrak pintar berpotensi mengontrol jumlah nilai yang besar. Saran untuk mencapai kesederhanaan saat menulis kontrak pintar adalah dengan menggunakan kembali pustaka yang ada, seperti [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/), jika memungkinkan. Karena berbagai pustaka ini telah melalui audit dan pengujian yang ekstensif oleh para pengembang, penggunaan pustaka ini mengurangi kemungkinan munculnya bug dibandingkan dengan menulis fungsionalitas baru dari awal.

Saran umum lainnya adalah menulis fungsi yang kecil dan menjaga kontrak tetap modular dengan membagi logika bisnis ke dalam beberapa kontrak. Penulisan kode yang lebih sederhana tidak hanya mengurangi permukaan serangan pada kontrak pintar, tetapi juga mempermudah pemahaman tentang ketepatan sistem secara keseluruhan dan mendeteksi kemungkinan kesalahan desain sejak awal.

### 9. Bertahan melawan kerentanan kontrak pintar yang umum {#mitigate-common-smart-contract-vulnerabilities}

#### Reentrancy {#reentrancy}

EVM tidak mengizinkan konkurensi, yang berarti dua kontrak yang terlibat dalam pemanggilan message tidak dapat berjalan serentak. Panggilan eksternal akan menjeda eksekusi dan memori kontrak pemanggil hingga panggilan tersebut kembali, pada saat itu eksekusi berlanjut dengan normal. Proses ini dapat dideskripsikan secara resmi sebagai mentransfer [alur kontrol](https://www.computerhope.com/jargon/c/contflow.htm) ke kontrak lain.

Meski kebanyakan aman, mentransfer alur kontrol ke kontrak yang tidak tepercaya dapat menyebabkan masalah, seperti reentrancy (masuk kembali). Serangan reentrancy (masuk kembali) terjadi ketika kontrak jahat memanggil balik ke kontrak yang rentan sebelum pemanggilan fungsi yang asli selesai. Penjelasan terbaik untuk jenis serangan ini adalah dengan contoh.

Pertimbangkan kontrak pintar sederhana (‘Korban’) yang memungkinkan siapa saja untuk menyetor dan menarik eter:

```solidity
// Kontrak ini rentan. Jangan gunakan di produksi

contract Victim {
    mapping (address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 amount = balances[msg.sender];
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
        balances[msg.sender] = 0;
    }
}
```

Kontrak ini mengekspos fungsi `withdraw()` agar pengguna dapat menarik kembali ETH yang sebelumnya disimpan di dalam kontrak. Saat memproses penarikan dana, kontrak melakukan operasi berikut:

1. Memeriksa saldo ETH pengguna
2. Mengirim dana ke alamat yang memanggil
3. Mengatur ulang saldonya menjadi 0, sehingga mencegah penarikan tambahan dari pengguna

Fungsi `withdraw()` di kontrak `Victim` mengikuti pola “checks-interactions-effects”. Ini _memeriksa_ apakah kondisi yang diperlukan untuk eksekusi terpenuhi (yaitu, pengguna memiliki saldo ETH positif) dan melakukan _interaksi_ dengan mengirim ETH ke alamat pemanggil, sebelum menerapkan _efek_ dari transaksi (yaitu, mengurangi saldo pengguna).

Jika `withdraw()` dipanggil dari akun milik eksternal (EOA), fungsi tersebut akan dijalankan sebagaimana diharapkan: `msg.sender.call.value()` mengirim ETH ke pemanggil. Namun, jika `msg.sender` adalah akun kontrak pintar yang memanggil `withdraw()`, pengiriman dana dengan menggunakan `msg.sender.call.value()` juga akan memicu berjalannya kode yang disimpan di alamat tersebut.

Bayangkan ini sebagai kode yang disebarkan di akun kontrak:

```solidity
 contract Attacker {
    function beginAttack() external payable {
        Victim(victim_address).deposit.value(1 ether)();
        Victim(victim_address).withdraw();
    }

    function() external payable {
        if (gasleft() > 40000) {
            Victim(victim_address).withdraw();
        }
    }
}
```

Kontrak ini dirancang untuk melakukan tiga hal:

1. Menerima setoran dari akun lain (dengan kemungkinan akun EOA penyerang)
2. Setor 1 ETH ke kontrak Korban
3. Menarik 1 ETH yang tersimpan di kontrak pintar

Tidak ada yang salah di sini, kecuali bahwa `Attacker` memiliki fungsi lain yang memanggil kembali fungsi `withdraw()` di `Victim` jika gas yang tersisa dari `msg.sender.call.value` yang masuk lebih dari 40.000. Hal ini memberi `Attacker` kemampuan untuk masuk kembali ke `Victim` dan menarik lebih banyak dana _sebelum_ pemanggilan pertama `withdraw` selesai. Siklusnya terlihat seperti ini:

```solidity
- EOA Penyerang memanggil `Attacker.beginAttack()` dengan 1 ETH
- `Attacker.beginAttack()` mendepositokan 1 ETH ke dalam `Victim`
- `Attacker` memanggil `withdraw() di `Victim`
- `Victim` memeriksa saldo `Attacker` (1 ETH)
- `Victim` mengirim 1 ETH ke `Attacker` (yang memicu fungsi default)
- `Attacker` memanggil `Victim.withdraw()` lagi (perhatikan bahwa `Victim` belum mengurangi saldo `Attacker` dari penarikan pertama)
- `Victim` memeriksa saldo `Attacker` (yang masih 1 ETH karena belum menerapkan efek dari panggilan pertama)
- `Victim` mengirimkan 1 ETH ke `Attacker` (yang memicu fungsi default dan memungkinkan `Attacker` untuk masuk kembali ke fungsi `withdraw`)
- Proses berulang hingga `Attacker` kehabisan gas, pada titik mana `msg.sender.call.value` kembali tanpa memicu penarikan tambahan
- `Victim` akhirnya menerapkan hasil transaksi pertama (dan yang berikutnya) ke keadaannya, sehingga saldo `Attacker` diatur ke 0
```

Ringkasnya adalah karena saldo pemanggil tidak ditetapkan ke 0 hingga selesainya eksekusi fungsi, pemanggilan berikutnya akan berhasil dan memungkinkan pemanggil menarik saldonya beberapa kali. Jenis serangan seperti ini dapat digunakan untuk menguras dana dari kontrak pintar, seperti yang terjadi dalam [peretasan DAO 2016](https://www.coindesk.com/learn/understanding-the-dao-attack). Serangan reentrancy masih menjadi masalah kritis bagi kontrak pintar saat ini, seperti yang ditunjukkan oleh [daftar publik eksploit reentrancy](https://github.com/pcaversaccio/reentrancy-attacks).

##### Cara mencegah serangan reentrancy (masuk kembali)

Sebuah pendekatan untuk menangani reentrancy adalah mengikuti [pola checks-effects-interactions](https://docs.soliditylang.org/en/develop/security-considerations.html#use-the-checks-effects-interactions-pattern). Pola ini mengurutkan eksekusi fungsi sedemikian rupa sehingga kode yang melakukan pemeriksaan yang diperlukan sebelum melanjutkan eksekusi akan berada di urutan pertama, diikuti oleh kode yang memanipulasi keadaan kontrak, lalu yang terakhir adalah kode yang berinteraksi dengan kontrak atau EOA lain.

Pola checks-effect-interaction digunakan dalam versi yang direvisi dari kontrak `Victim` yang ditunjukkan di bawah ini:

```solidity
contract NoLongerAVictim {
    function withdraw() external {
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        (bool success, ) = msg.sender.pemanggilan.value(amount)("");
        require(success);
    }
}
```

Kontrak ini melakukan _pemeriksaan_ pada saldo pengguna, menerapkan _efek_ dari fungsi `withdraw()` (dengan mengatur ulang saldo pengguna menjadi 0), dan melanjutkan dengan melakukan _interaksi_ (mengirim ETH ke alamat pengguna). Hal ini memastikan kontrak memperbarui penyimpanannya sebelum panggilan eksternal, menghilangkan kondisi re-entrancy (masuk kembali) yang memungkinkan serangan pertama. Kontrak `Attacker` masih bisa memanggil kembali ke `NoLongerAVictim`, tetapi karena `balances[msg.sender]` telah ditetapkan menjadi 0, maka penarikan tambahan akan menimbulkan kesalahan.

Pilihan lainnya adalah dengan menggunakan kunci pengecualian bersama (umumnya dideskripsikan sebagai "mutex") yang mengunci sebagian dari keadaan kontrak hingga pemanggilan fungsi selesai. Hal ini diterapkan dengan menggunakan variabel Boolean yang ditetapkan ke `true` sebelum fungsi dieksekusi dan kembali ke `false` setelah pemanggilan selesai. Seperti yang terlihat pada contoh di bawah ini, penggunaan mutex melindungi fungsi dari pemanggilan rekursif pada saat pemanggilan asli masih diproses, sehingga secara efektif menghentikan reentrancy (masuk kembali).

```solidity
pragma solidity ^0.7.0;

contract MutexPattern {
    bool locked = false;
    mapping(address => uint256) public balances;

    modifier noReentrancy() {
        require(!locked, "Diblokir dari reentrancy.");
        locked = true;
        _;
        locked = false;
    }
    // Fungsi ini dilindungi oleh mutex, jadi panggilan reentrant dari dalam `msg.sender.call` tidak dapat memanggil `withdraw` lagi.
    // Pernyataan `return` dievaluasi menjadi `true` tetapi masih mengevaluasi pernyataan `locked = false` dalam pengubah
    function withdraw(uint _amount) public payable noReentrancy returns(bool) {
        require(balances[msg.sender] >= _amount, "Tidak ada saldo untuk ditarik.");

        balances[msg.sender] -= _amount;
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success);

        return true;
    }
}
```

Anda juga dapat menggunakan sistem [pembayaran tarik](https://docs.openzeppelin.com/contracts/5.x/api/security#PullPayment) yang mengharuskan pengguna menarik dana dari kontrak pintar, sebagai pengganti sistem "pembayaran dorong" yang mengirim dana ke akun. Hal ini menghilangkan kemungkinan secara tidak sengaja memicu kode pada alamat yang tidak dikenal (dan juga dapat mencegah beberapa serangan denial-of-service atau penolakan layanan).

#### Integer underflow dan overflow {#integer-underflows-and-overflows}

Overflow bilangan bulat terjadi ketika hasil operasi aritmatika berada di luar rentang nilai yang dapat diterima sehingga menyebabkan nilainya "bergulung" ke nilai terendah yang dapat dinyatakan. Misalnya, `uint8` hanya dapat menyimpan nilai hingga 2^8-1=255. Operasi aritmatika yang menghasilkan nilai yang lebih besar dari `255` akan mengalami overflow dan mengatur ulang `uint` ke `0`, serupa dengan cara odometer di mobil mengatur ulang ke 0 setelah mencapai jarak tempuh maksimal (999999).

Integer underflow terjadi karena alasan yang serupa: hasil operasi aritmatika berada di bawah rentang yang dapat diterima. Misalkan Anda mencoba mengurangi lagi nilai `0` pada data jenis `uint8`, maka hasilnya akan langsung bergulung ke nilai terbesar yang dapat dinyatakan (`255`).

Baik overflow maupun underflow bilangan bulat dapat menyebabkan perubahan tak terduga pada variabel keadaan di kontrak dan menyebabkan eksekusi yang tidak direncanakan. Di bawah ini adalah contoh yang menunjukkan cara penyerang mengeksploitasi overflow aritmetika di kontrak pintar untuk melakukan operasi yang tidak sah:

```
pragma solidity ^0.7.6;

// Kontrak ini dirancang untuk berfungsi sebagai brankas waktu.
// Pengguna dapat melakukan deposit ke kontrak ini tetapi tidak dapat menarik selama setidaknya satu minggu.
// Pengguna juga dapat memperpanjang waktu tunggu melebihi periode tunggu 1 minggu.

/*
1. Terapkan TimeLock
2. Terapkan Attack dengan alamat TimeLock
3. Panggil Attack.attack dengan mengirim 1 ether. Anda akan dapat segera
   menarik ether Anda.

Apa yang terjadi?
Attack menyebabkan TimeLock.lockTime meluap dan dapat menarik
sebelum periode tunggu 1 minggu.
*/

contract TimeLock {
    mapping(address => uint) public balances;
    mapping(address => uint) public lockTime;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
        lockTime[msg.sender] = block.timestamp + 1 weeks;
    }

    function increaseLockTime(uint _secondsToIncrease) public {
        lockTime[msg.sender] += _secondsToIncrease;
    }

    function withdraw() public {
        require(balances[msg.sender] > 0, "Dana tidak mencukupi");
        require(block.timestamp > lockTime[msg.sender], "Waktu kunci belum berakhir");

        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;

        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Gagal mengirim Ether");
    }
}

contract Attack {
    TimeLock timeLock;

    constructor(TimeLock _timeLock) {
        timeLock = TimeLock(_timeLock);
    }

    fallback() external payable {}

    function attack() public payable {
        timeLock.deposit{value: msg.value}();
        /*
        jika t = waktu kunci saat ini maka kita perlu mencari x sedemikian rupa sehingga
        x + t = 2**256 = 0
        jadi x = -t
        2**256 = type(uint).max + 1
        jadi x = type(uint).max + 1 - t
        */
        timeLock.increaseLockTime(
            type(uint).max + 1 - timeLock.lockTime(address(this))
        );
        timeLock.withdraw();
    }
}
```

##### Cara mencegah underflow dan overflow bilangan bulat

Sejak versi 0.8.0, pengompilasi Solidity menolak kode yang menghasilkan underflow dan overflow bilangan bulat. Namun, kontrak yang dikompilasi dengan versi pengompilasi yang lebih rendah harus melakukan pemeriksaan pada fungsi yang melibatkan operasi aritmatika atau menggunakan pustaka (misalnya, [SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math)) yang memeriksa adanya underflow/overflow.

#### Manipulasi Oracle {#oracle-manipulation}

[Oracle](/developers/docs/oracles/) mengambil informasi off-chain dan mengirimkannya on-chain untuk digunakan oleh kontrak pintar. Dengan oracle, Anda dapat mendesain smart contract yang dapat berinteraksi dengan sistem off-chain, seperti pasar modal, sehingga dapat memperluas aplikasinya.

Akan tetapi, jika oracle rusak dan mengirimkan informasi yang salah pada blockchain, smart contract akan dieksekusi berdasarkan input yang salah, dan hal ini dapat menyebabkan masalah. Ini adalah dasar dari "masalah oracle", yang berkaitan dengan tugas untuk memastikan informasi dari oracle rantai blok sudah akurat, mutakhir, dan tepat waktu.

Masalah keamanan yang terkait adalah menggunakan oracle onchain, seperti bursa terdesentralisasi, untuk mendapatkan harga spot aset. Platform pemberian pinjaman di industri [keuangan terdesentralisasi (DeFi)](/defi/) sering melakukan hal ini guna menentukan nilai jaminan pengguna untuk menentukan jumlah yang dapat dipinjamnya.

Harga DEX sering kali akurat, sebagian besar disebabkan oleh arbitrator yang memulihkan parity di pasar. Akan tetapi, mereka terbuka untuk dimanipulasi, terutama jika oracle onchain menghitung harga aset berdasarkan pola perdagangan historis (seperti yang biasanya terjadi).

Misalnya, penyerang dapat memompa harga spot aset yang palsu dengan mengambil flash loan (pinjaman kilat) tepat sebelum berinteraksi dengan kontrak pemberian pinjaman Anda. Meminta DEX untuk harga aset akan mengembalikan nilai yang lebih tinggi dari biasanya (karena "pesanan beli" penyerang yang lebih besar dari biasanya sehingga mengubah permintaan aset). Hal ini menyebabkan penyerang dapat meminjam lebih banyak dari yang seharusnya. "Serangan pinjaman kilat" tersebut telah digunakan untuk mengeksploitasi ketergantungan pada oracle harga di antara aplikasi DeFi sehingga menyebabkan protokol kehilangan dana jutaan.

##### Cara mencegah manipulasi oracle

Persyaratan minimum untuk [menghindari manipulasi oracle](https://www.cyfrin.io/blog/price-oracle-manipultion-attacks-with-examples) adalah dengan menggunakan jaringan oracle terdesentralisasi yang mengumpulkan data dari berbagai sumber guna menghindari ketergantungan pada satu titik kegagalan. Dalam kebanyakan kasus, oracle terdesentralisasi memiliki insentif ekonomi kripto bawaan untuk mendorong simpul oracle agar melaporkan informasi yang tepat sehingga menjadikannya lebih aman daripada oracle terpusat.

Jika Anda berencana untuk menanyakan harga aset kepada oracle onchain, pertimbangkan untuk menggunakan oracle yang mengimplementasikan mekanisme harga rata-rata tertimbang waktu (TWAP). Sebuah [oracle TWAP](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) meminta harga aset pada dua titik waktu yang berbeda (yang dapat Anda ubah) dan menghitung harga spot berdasarkan harga rata-rata yang diperoleh. Memilih periode waktu yang lebih lama melindungi protokol Anda dari manipulasi harga karena order besar yang dieksekusi baru-baru ini tidak dapat memengaruhi harga aset.

## Sumber daya keamanan kontrak pintar untuk pengembang {#smart-contract-security-resources-for-developers}

### Alat untuk menganalisis kontrak pintar dan memverifikasi kebenaran kode {#code-analysis-tools}

- **[Alat dan pustaka pengujian](/developers/docs/smart-contracts/testing/#testing-tools-and-libraries)** - _Kumpulan alat dan pustaka standar industri untuk melakukan pengujian unit, analisis statis, dan analisis dinamis pada kontrak pintar._

- **[Alat verifikasi formal](/developers/docs/smart-contracts/formal-verification/#formal-verification-tools)** - _Alat untuk memverifikasi kebenaran fungsional dalam kontrak pintar dan memeriksa invarian._

- **[Layanan audit kontrak pintar](/developers/docs/smart-contracts/testing/#smart-contract-auditing-services)** - _Daftar organisasi yang menyediakan layanan audit kontrak pintar untuk proyek pengembangan Ethereum._

- **[Platform hadiah bounty bug](/developers/docs/smart-contracts/testing/#bug-bounty-platforms)** - _Platform untuk mengoordinasikan hadiah bounty bug dan memberi hadiah atas pengungkapan kerentanan kritis di kontrak pintar secara bertanggung jawab._

- **[Pemeriksa Fork](https://forkchecker.hashex.org/)** - _Alat daring gratis untuk memeriksa semua informasi yang tersedia mengenai kontrak hasil fork._

- **[Enkoder ABI](https://abi.hashex.org/)** - _Layanan daring gratis untuk mengenkode fungsi kontrak Solidity dan argumen konstruktor Anda._

- **[Aderyn](https://github.com/Cyfrin/aderyn)** - _Penganalisis Statis Solidity, melintasi Abstract Syntax Trees (AST) untuk menunjukkan dugaan kerentanan dan mencetak masalah dalam format markdown yang mudah digunakan._

### Alat untuk memantau kontrak pintar {#smart-contract-monitoring-tools}

- **[Peringatan Waktu Nyata Tenderly](https://tenderly.co/monitoring)** - _Alat untuk mendapatkan pemberitahuan waktu nyata ketika kejadian yang tidak biasa atau tak terduga terjadi pada kontrak pintar atau dompet Anda._

### Alat untuk administrasi kontrak pintar yang aman {#smart-contract-administration-tools}

- **[Safe](https://safe.global/)** - _Dompet kontrak pintar yang berjalan di Ethereum dan membutuhkan jumlah orang minimum untuk menyetujui transaksi sebelum transaksi tersebut dapat terjadi (M-dari-N)._

- **[OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/)** - _Pustaka kontrak untuk menerapkan fitur-fitur administratif, termasuk kepemilikan kontrak, peningkatan, kontrol akses, tata kelola, kemampuan jeda, dan lainnya._

### Layanan audit kontrak pintar {#smart-contract-auditing-services}

- **[ConsenSys Diligence](https://diligence.consensys.io/)** - _Layanan pengauditan kontrak pintar membantu proyek di seluruh ekosistem blockchain dalam memastikan agar protokol proyek siap diluncurkan dan dapat melindungi pengguna._

- **[CertiK](https://www.certik.com/)** - _Perusahaan keamanan blockchain yang memelopori penggunaan teknologi Verifikasi formal mutakhir pada kontrak pintar dan jaringan blockchain._

- **[Trail of Bits](https://www.trailofbits.com/)** - _Perusahaan keamanan siber yang menggabungkan riset keamanan dengan mentalitas penyerang untuk mengurangi risiko dan memperkuat kode._

- **[PeckShield](https://peckshield.com/)** - _Perusahaan keamanan blockchain yang menawarkan produk dan layanan untuk keamanan, privasi, dan kegunaan di seluruh ekosistem blockchain._

- **[QuantStamp](https://quantstamp.com/)** - _Layanan pengauditan yang memudahkan penggunaan arus utama teknologi blockchain melalui layanan penilaian keamanan dan risiko._

- **[OpenZeppelin](https://www.openzeppelin.com/security-audits)** - _Perusahaan keamanan kontrak pintar yang menyediakan audit keamanan untuk sistem terdistribusi._

- **[Runtime Verification](https://runtimeverification.com/)** - _Perusahaan keamanan yang berspesialisasi dalam pemodelan dan verifikasi formal kontrak pintar._

- **[Hacken](https://hacken.io)** - _Auditor keamanan siber Web3 yang menghadirkan pendekatan 360 derajat untuk keamanan blockchain._

- **[Nethermind](https://www.nethermind.io/smart-contract-audits)** - _Layanan pengauditan Solidity dan Cairo, memastikan integritas kontrak pintar dan keamanan pengguna di seluruh Ethereum dan Starknet._

- **[HashEx](https://hashex.org/)** - _HashEx berfokus pada pengauditan blockchain dan kontrak pintar untuk memastikan keamanan mata uang kripto, menyediakan layanan seperti pengembangan kontrak pintar, pengujian penetrasi, konsultasi blockchain._

- **[Code4rena](https://code4rena.com/)** - _Platform audit kompetitif yang memberikan insentif kepada ahli keamanan kontrak pintar untuk menemukan kerentanan dan membantu membuat web3 lebih aman._

- **[CodeHawks](https://codehawks.com/)** - _Platform audit kompetitif yang menyelenggarakan kompetisi audit kontrak pintar untuk para peneliti keamanan._

- **[Cyfrin](https://cyfrin.io)** - _Pusat keamanan Web3, mengembangkan keamanan kripto melalui produk dan layanan audit kontrak pintar._

- **[ImmuneBytes](https://immunebytes.com/smart-contract-audit/)** - _Perusahaan keamanan Web3 yang menyediakan layanan audit keamanan untuk sistem blockchain, melalui tim auditor berpengalaman dan alat-alat terbaik di kelasnya._

- **[Oxorio](https://oxor.io/)** - _Audit kontrak pintar dan layanan keamanan blockchain dengan keahlian di EVM, Solidity, ZK, teknologi lintas rantai untuk perusahaan kripto dan proyek DeFi._

- **[Inference](https://inference.ag/)** - _Perusahaan audit keamanan, yang berspesialisasi dalam audit kontrak pintar untuk blockchain berbasis EVM. Berkat auditor ahlinya, mereka mengidentifikasi masalah potensial dan menyarankan solusi yang dapat ditindaklanjuti untuk memperbaikinya sebelum penerapan._

### Platform hadiah bounty bug {#bug-bounty-platforms}

- **[Immunefi](https://immunefi.com/)** - _Platform hadiah bounty bug pada kontrak pintar dan proyek DeFi, di mana peneliti keamanan meninjau kode, mengungkapkan kerentanan, mendapatkan bayaran, dan membuat kripto lebih aman._

- **[HackerOne](https://www.hackerone.com/)** - _Platform koordinasi kerentanan dan hadiah bounty bug yang menghubungkan bisnis dengan penguji penetrasi dan peneliti keamanan siber._

- **[HackenProof](https://hackenproof.com/)** - _Platform hadiah bounty bug ahli untuk proyek-proyek kripto (DeFi, Kontrak Pintar, Dompet, CEX, dan lain-lain), di mana para profesional keamanan menyediakan layanan triase dan peneliti dibayar jika membuat laporan bug yang relevan dan terverifikasi._

- **[Sherlock](https://www.sherlock.xyz/)** - _Underwriter dalam Web3 untuk keamanan kontrak pintar, dengan pembayaran untuk auditor yang dikelola melalui kontrak pintar untuk memastikan bahwa bug yang relevan dibayar secara adil._

- **[CodeHawks](https://www.codehawks.com/)** - _Platform bug bounty kompetitif di mana auditor mengikuti kontes dan tantangan keamanan, dan (segera) dapat melakukan audit pribadi mereka sendiri._

### Publikasi kerentanan dan eksploitasi kontrak pintar yang diketahui {#common-smart-contract-vulnerabilities-and-exploits}

- **[ConsenSys: Serangan Terkenal pada Kontrak Pintar](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/)** - _Penjelasan yang mudah bagi pemula tentang kerentanan kontrak yang paling signifikan, dengan kode contoh untuk sebagian besar kasus._

- **[SWC Registry](https://swcregistry.io/)** - _Daftar kurasi item Common Weakness Enumeration (CWE) yang berlaku untuk kontrak pintar Ethereum._

- **[Rekt](https://rekt.news/)** - _Publikasi yang diperbarui secara teratur tentang peretasan dan eksploitasi kripto yang terkenal, beserta laporan pascakejadian yang mendetail._

### Tantangan untuk mempelajari keamanan kontrak pintar {#challenges-for-learning-smart-contract-security}

- **[Awesome BlockSec CTF](https://github.com/blockthreat/blocksec-ctfs)** - _Daftar kurasi wargame keamanan blockchain, tantangan, dan kompetisi [Capture The Flag](https://www.webopedia.com/definitions/ctf-event/amp/) serta penulisan solusi._

- **[Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz/)** - _Wargame untuk mempelajari keamanan ofensif dari kontrak pintar DeFi serta mengembangkan keterampilan dalam perburuan bug dan audit keamanan._

- **[Ethernaut](https://ethernaut.openzeppelin.com/)** - _Wargame berbasis Web3/Solidity di mana setiap tingkatnya adalah kontrak pintar yang perlu 'diretas'._

- **[HackenProof x HackTheBox](https://app.hackthebox.com/tracks/HackenProof-Track)** - _Tantangan peretasan kontrak pintar, dalam suasana petualangan fantasi. Menyelesaikan tantangan ini dengan sukses juga memberi akses ke program bug bounty pribadi._

### Praktik terbaik untuk mengamankan kontrak pintar {#smart-contract-security-best-practices}

- **[ConsenSys: Praktik Terbaik Keamanan Kontrak Pintar Ethereum](https://consensys.github.io/smart-contract-best-practices/)** - _Daftar pedoman lengkap untuk mengamankan kontrak pintar Ethereum._

- **[Nascent: Set Alat Keamanan Sederhana](https://github.com/nascentxyz/simple-security-toolkit)** - _Kumpulan panduan dan daftar periksa berfokus keamanan yang praktis untuk pengembangan kontrak pintar._

- **[Pola Solidity](https://fravoll.github.io/solidity-patterns/)** - _Kompilasi pola aman dan praktik terbaik yang bermanfaat untuk bahasa pemrograman kontrak pintar Solidity._

- **[Solidity Docs: Pertimbangan Keamanan](https://docs.soliditylang.org/en/v0.8.16/security-considerations.html)** - _Panduan untuk menulis kontrak pintar yang aman dengan Solidity._

- **[Standar Verifikasi Keamanan Kontrak Pintar](https://github.com/securing/SCSVS)** - _Daftar periksa yang terdiri dari empat belas bagian yang dibuat untuk menstandarkan keamanan kontrak pintar bagi pengembang, arsitek, pemeriksa keamanan, dan vendor._

- **[Pelajari Keamanan dan Audit Kontrak Pintar](https://updraft.cyfrin.io/courses/security)** - _Kursus keamanan dan audit kontrak pintar yang sangat penting, dibuat untuk para pengembang kontrak pintar yang ingin meningkatkan praktik terbaik keamanan mereka dan menjadi peneliti keamanan._

### Tutorial tentang keamanan kontrak pintar {#tutorials-on-smart-contract-security}

- [Cara menulis kontrak pintar yang aman](/developers/tutorials/secure-development-workflow/)

- [Cara menggunakan Slither untuk menemukan bug kontrak pintar](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

- [Cara menggunakan Manticore untuk menemukan bug kontrak pintar](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)

- [Panduan keamanan kontrak pintar](/developers/tutorials/smart-contract-security-guidelines/)

- [Cara mengintegrasikan kontrak token Anda dengan token arbitrer secara aman](/developers/tutorials/token-integration-checklist/)

- [Cyfrin Updraft - Kursus lengkap keamanan dan audit kontrak pintar](https://updraft.cyfrin.io/courses/security)
