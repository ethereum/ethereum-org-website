---
title: Keamanan kontrak pintar
description: Ikhtisar pedoman pembuatan kontrak pintar Ethereum yang aman
lang: id
---

Kontrak pintar sangat fleksibel dan mampu mengontrol nilai dan data dalam jumlah besar, sambil menjalankan logika permanen yang berdasarkan kode yang disebarkan pada Rantai Blok. Hal ini telah menciptakan ekosistem dinamis yang terdiri dari aplikasi tanpa kepercayaan dan terdesentralisasi yang memberikan banyak keuntungan dibandingkan sistem legasi. Hal tersebut juga membuka peluang bagi penyerang yang mencari keuntungan dengan mengeksploitasi kerentanan pada kontrak pintar.

Rantai Blok publik, seperti Ethereum, makin memperumit masalah pengamanan kontrak pintar. Kode kontrak yang disebarkan _biasanya_ tidak dapat diubah untuk menambal kekurangan pada keamanannya, sementara aset yang dicuri dari kontrak pintar sulit sekali untuk dilacak dan kebanyakan tidak dapat dipulihkan karena sifat permanennya.

Meskipun ada perbedaan angka, diperkirakan bahwa nilai total yang dicuri atau hilang akibat cacat keamanan di kontrak pintar dapat mencapai lebih dari $1 miliar. Hal ini termasuk insiden yang menjadi perhatian publik, seperti [peretasan DAO](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/) (3,6 juta ETH dicuri, yang saat ini bernilai lebih dari $1 miliar dolar), [Peretasan dompet parity multi-sig](https://www.coindesk.com/30-million-ether-reported-stolen-parity-wallet-breach) ($30 juta hilang karena peretas), dan [Masalah dompet beku parity](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether) (lebih dari $300 juta nilai ETH terkunci selamanya).

Berbagai masalah yang disebutkan di atas mengharuskan pengembang untuk meningkatkan upaya dalam membuat kontrak pintar yang aman, kuat, dan tangguh. Keamanan kontrak pintar adalah masalah yang serius, dan harus dipelajari dengan baik oleh setiap pengembang. Panduan ini akan membahas pertimbangan keamanan bagi pengembang Ethereum dan menyelidiki sumber daya untuk peningkatan keamanan kontrak pintar.

## Prasyarat {#prerequisites}

Pastikan Anda memahami [dasar-dasar pengembangan kontrak pintar](/developers/docs/smart-contracts/) sebelum mempelajari masalah keamanan.

## Pedoman untuk membuat kontrak pintar Ethereum yang aman {#smart-contract-security-guidelines}

### 1. Merancang kontrol akses yang tepat {#design-proper-access-controls}

Di dalam kontrak pintar, fungsi yang ditandai sebagai `public` atau `external` dapat dipanggil oleh setiap akun milik eksternal atau externally owned account (EOA) atau akun kontrak. Menetapkan visibilitas publik untuk fungsi dibutuhkan jika Anda ingin orang lain dapat berinteraksi dengan kontrak Anda. Akan tetapi, fungsi yang ditandai sebagai `private` hanya dapat dipanggil oleh fungsi di dalam kontrak pintar, dan tidak bisa dipanggil oleh akun eksternal. Memberikan akses ke fungsi kontrak kepada setiap peserta di jaringan dapat menimbulkan masalah, terutama jika mengakibatkan setiap orang dapat melakukan operasi yang sensitif (misalnya, mencetak token baru).

Untuk mencegah penggunaan fungsi kontrak pintar yang tidak sah, perlu diterapkan kontrol akses yang aman. Mekanisme kontrol akses membatasi kemampuan penggunaan beberapa fungsi tertentu pada kontrak pintar untuk entitas yang disetujui, seperti akun yang bertanggung jawab untuk mengelola kontrak. **Pola Ownable** dan **kontrol berbasis peran** adalah dua pola yang bermanfaat untuk menerapkan kontrol akses di kontrak pintar:

#### Pola Ownable atau dapat dimiliki {#ownable-pattern}

Dalam pola Ownable atau dapat dimiliki, satu alamat ditetapkan sebagai "pemilik" kontrak selama proses pembuatan kontrak. Fungsi yang dilindungi diberikan pengubah `OnlyOwner`, yang memastikan agar kontrak melakukan autentikasi terhadap identitas alamat pemanggil sebelum menjalankan fungsi tersebut. Panggilan ke fungsi terlindung dari alamat lain, selain pemilik kontrak, akan selalu dikembalikan guna mencegah akses yang tidak diinginkan.

#### Kontrol akses berbasis peran {#role-based-access-control}

Mendaftarkan satu alamat tunggal sebagai `Owner` di kontrak pintar menimbulkan risiko sentralisasi dan berpotensi menjadi titik kegagalan tunggal. Jika kunci akun pemilik berhasil dikuasai, penyerang dapat menyerang kontrak yang dimilikinya. Inilah alasan penggunaan pola kontrol akses yang berbasis peran dengan beberapa akun administratif dapat menjadi pilihan yang lebih baik.

Dalam kontrol akses berbasis peran, akses ke fungsi yang sensitif didistribusikan di antara sekelompok peserta yang tepercaya. Misalnya, satu akun mungkin bertanggung jawab untuk pencetakan token, sementara akun yang lain melakukan peningkatan atau menjeda kontrak. Desentralisasi kontrol akses dengan cara ini menghilangkan titik kegagalan tunggal dan mengurangi asumsi kepercayaan bagi pengguna.

##### Menggunakan dompet multi-tanda tangan

Pendekatan lain untuk menerapkan kontrol akses yang aman adalah dengan menggunakan [akun multi-tanda tangan](/developers/docs/smart-contracts/#multisig) untuk mengelola kontrak. Tidak seperti EOA biasa, akun multi-tanda tangan dimiliki oleh beberapa entitas dan membutuhkan tanda tangan dari beberapa akun dengan jumlah minimum—misalkan 3 dari 5—untuk menjalankan transaksi.

Menggunakan multisig untuk kontrol akses menimbulkan lapisan keamanan tambahan karena tindakan pada kontrak target memerlukan persetujuan dari banyak pihak. Hal ini terutama sangat berguna apabila dibutuhkan penggunaan pola Ownable atau dapat dimiliki, karena pola ini mempersulit penyerang atau orang jahat di internal dalam memanipulasi fungsi kontrak yang sensitif untuk tujuan jahat.

### 2. Gunakan pernyataan require(), assert(), dan revert() untuk melindungi operasi kontrak {#use-require-assert-revert}

Sebagaimana disebutkan, fungsi publik dalam kontrak pintar Anda dapat dipanggil oleh siapa saja setelah disebarkan di Rantai Blok. Karena Anda tidak dapat mengetahui sebelumnya tentang cara akun eksternal berinteraksi dengan kontrak, hal yang ideal adalah menerapkan perlindungan internal terhadap operasi yang bermasalah sebelum penyebaran. Anda dapat menerapkan perilaku yang tepat di kontrak pintar dengan menggunakan pernyataan `require()`, `assert()`, dan `revert()` untuk memicu pengecualian dan mengembalikan perubahan keadaan apabila eksekusi gagal memenuhi persyaratan tertentu.

**`require()`**: `require` didefinisikan pada awal fungsi dan memastikan kondisi pradefinisi terpenuhi sebelum fungsi yang dipanggil dijalankan. Pernyataan `require` dapat digunakan untuk memvalidasi input pengguna, memeriksa variabel keadaan, atau melakukan autentikasi identitas akun pemanggil sebelum melanjutkan dengan fungsi.

**`assert()`**: `assert()` digunakan untuk mendeteksi kesalahan internal dan memeriksa pelanggaran "invarian" dalam kode Anda. Invarian adalah penegasan logis tentang keadaan kontrak yang harus tetap benar untuk semua eksekusi fungsi. Contoh invarian adalah total pasokan atau saldo maksimum dari kontrak token. Penggunaan `assert()` memastikan bahwa kontrak Anda tidak pernah mencapai keadaan rentan, dan jika keadaan tersebut terjadi, semua perubahan pada variabel keadaan akan digulung balik ke keadaan sebelumnya.

**`revert()`**: `revert()` dapat digunakan dalam pernyataan if-else yang memicu pengecualian apabila kondisi yang dibutuhkan tidak terpenuhi. Contoh kontrak di bawah ini menggunakan `revert()` untuk menjaga eksekusi fungsi:

```
pragma solidity ^0.8.4;

contract VendingMachine {
    address owner;
    error Unauthorized();
    function buy(uint amount) public payable {
        if (amount > msg.value / 2 ether)
            revert("Not enough Ether provided.");
        // Perform the purchase.
    }
    function withdraw() public {
        if (msg.sender != owner)
            revert Unauthorized();

        payable(msg.sender).transfer(address(this).balance);
    }
}
```

### 3. Menguji kontrak pintar dan memverifikasi ketepatan kode {#test-smart-contracts-and-verify-code-correctness}

Sifat permanen pada kode yang dijalankan di [Mesin Virtual Ethereum](/developers/docs/evm/) menyebabkan kontrak pintar membutuhkan tingkat penilaian kualitas yang lebih tinggi selama fase pengembangan. Pengujian kontrak secara ekstensif dan pemantauannya untuk menghindari hasil yang tidak diharapkan akan sangat meningkatkan keamanan dan melindungi pengguna Anda dalam jangka panjang.

Metode yang umum adalah menulis uji unit yang kecil dengan menggunakan data palsu yang biasanya diterima oleh kontrak dari pengguna. [Pengujian unit](/developers/docs/smart-contracts/testing/#unit-testing) berguna untuk menguji fungsionalitas fungsi tertentu dan memastikan kontrak pintar berfungsi sesuai harapan.

Sayangnya, pengujian unit hampir tidak efektif untuk meningkatkan keamanan kontrak pintar apabila digunakan secara terisolasi. Pengujian unit dapat membuktikan berjalan baiknya suatu fungsi dengan data palsu, tetapi efektivitas uji unit ini hanya seefektif uji yang ditulis. Hal ini menyulitkan pendeteksian kasus khusus yang tidak diuji dan kerentanan yang dapat merusak keamanan kontrak pintar Anda.

Cara yang lebih baik adalah menggabungkan pengujian unit dengan pengujian berbasis properti yang dilakukan dengan menggunakan [analisis statis dan dinamis](/developers/docs/smart-contracts/testing/#static-dynamic-analysis). Analisis statis mengandalkan representasi tingkat rendah, seperti [grafik aliran kontrol](https://en.wikipedia.org/wiki/Control-flow_graph) dan [pohon sintaksis abstrak](https://deepsource.io/glossary/ast/), untuk menganalisis keadaan program yang dapat dicapai dan jalur eksekusi. Sementara itu, teknik analisis dinamis, seperti fuzzing, menjalankan kode kontrak dengan nilai input acak untuk mendeteksi operasi yang melanggar properti keamanan.

[Verifikasi formal](/developers/docs/smart-contracts/formal-verification) adalah teknik lain untuk memverifikasi properti keamanan di kontrak pintar. Berbeda dengan pengujian rutin, verifikasi formal dapat membuktikan dengan pasti tidak adanya kesalahan di kontrak pintar. Hal ini dicapai dengan membuat spesifikasi formal yang mencakup properti keamanan yang diinginkan dan membuktikan bahwa model formal dari kontrak mematuhi spesifikasi ini.

### 4. Meminta peninjauan kode Anda secara independen {#get-independent-code-reviews}

Setelah menguji kontrak Anda, ada baiknya meminta seseorang untuk memeriksa kode sumbernya untuk mendeteksi setiap masalah keamanan. Pengujian tidak akan mengungkap setiap kekurangan di kontrak pintar, tetapi mendapatkan tinjauan independen akan meningkatkan kemungkinan penemuan kerentanan.

#### Audit {#audits}

Melakukan uji coba audit kontrak pintar adalah satu cara untuk melakukan tinjauan kode secara independen. Pihak auditor berperan penting dalam memastikan bahwa kontrak pintar aman dan bebas dari cacat kualitas serta kesalahan desain.

Meskipun demikian, jangan menganggap audit sebagai solusi ajaib untuk semua masalah. Audit kontrak pintar tidak akan menemukan setiap bug dan sebagian besar audit dirancang untuk memberikan babak tinjauan tambahan, yang dapat membantu mendeteksi masalah yang terlewatkan oleh pengembang selama pengembangan awal dan pengujian. Sebaiknya Anda juga mengikuti [praktik terbaik dalam bekerja sama dengan auditor](https://twitter.com/tinchoabbate/status/1400170232904400897), seperti mendokumentasikan kode dengan benar dan menambahkan komentar dalam kode, guna memaksimalkan manfaat audit kontrak pintar.

#### Hadiah bounty bug {#bug-bounties}

Menyiapkan program hadiah bounty bug adalah cara lain untuk melaksanakan tinjauan kode secara eksternal. Hadiah bounty bug adalah imbalan finansial yang diberikan kepada para individu (biasanya peretas topi putih) yang menemukan kerentanan dalam aplikasi.

Apabila digunakan dengan tepat, hadiah bounty bug dapat memberikan insentif kepada komunitas peretas untuk memeriksa kode Anda guna menemukan kekurangan yang kritis. Contoh yang nyata adalah "infinite money bug" yang memungkinkan penyerang menciptakan Ether dalam jumlah tak terhingga pada [Optimism](https://www.optimism.io/), yaitu protokol [Lapisan ke-2](/layer-2/) yang berjalan di Ethereum. Untungnya, seorang peretas topi putih [menemukan kekurangan tersebut](https://www.saurik.com/optimism.html) dan memberi tahu timnya, [sekaligus memperoleh imbalan besar dalam proses tersebut](https://cryptoslate.com/critical-bug-in-ethereum-l2-optimism-2m-bounty-paid/).

Strategi yang bermanfaat adalah menetapkan pembayaran program hadiah bounty bug secara proporsional dengan jumlah uang yang mengalami risiko. Disebut sebagai "[penskalaan hadiah bounty bug](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)", cara ini memberikan insentif finansial bagi individu untuk mengungkapkan kerentanan secara bertanggung jawab dan bukan malah mengeksploitasinya.

### 5. Patuhi praktik terbaik selama pengembangan kontrak pintar {#follow-smart-contract-development-best-practices}

Keberadaan audit dan hadiah bounty bug bukan alasan untuk menghindari tanggung jawab penulisan kode program yang berkualitas tinggi. Keamanan kontrak pintar yang baik dimulai dengan mengikuti proses desain dan pengembangan yang tepat:

- Simpan semua kode dalam sistem kontrol versi, seperti git

- Atur semua modifikasi kode melalui permintaan penarikan

- Pastikan permintaan penarikan memiliki setidaknya satu peninjau independen. Jika Anda bekerja solo di suatu proyek, pertimbangkan untuk mencari pengembang lain dan bertukar tinjauan kode

- Gunakan [lingkungan pengembangan](/developers/docs/frameworks/) untuk pengujian, kompilasi, dan penyebaran kontrak pintar

- Jalankan kode Anda melalui alat analisis kode dasar, seperti Mythril dan Slither. Idealnya, hal ini harus dilakukan sebelum digabungkannya setiap permintaan penarikan, lalu bandingkan perbedaannya pada output

- Pastikan kode Anda dikompilasi tanpa kesalahan, dan alat kompilasi Solidity tidak mengeluarkan peringatan

- Dokumentasikan kode Anda dengan baik (menggunakan [NatSpec](https://solidity.readthedocs.io/en/develop/natspec-format.html)) dan jelaskan detail tentang arsitektur kontrak dengan bahasa yang mudah dipahami. Hal ini akan memudahkan orang lain yang akan mengaudit dan meninjau kode Anda.

### 6. Terapkan rencana pemulihan bencana yang andal {#implement-disaster-recovery-plans}

Merancang kontrol akses yang aman, menerapkan pengubah fungsi, dan saran-saran lainnya dapat meningkatkan keamanan kontrak pintar, tetapi hal-hal tersebut tidak dapat menghilangkan kemungkinan eksploit yang jahat. Membuat kontrak pintar yang aman membutuhkan "persiapan kegagalan" dan rencana cadangan perlu dimiliki untuk merespons serangan secara efektif. Rencana pemulihan bencana yang tepat akan menggabungkan beberapa atau semua komponen berikut ini:

#### Peningkatan kontrak {#contract-upgrades}

Meskipun kontrak pintar Ethereum secara default bersifat permanen, tetapi dimungkinkan untuk melakukan perubahan terbatas dengan menggunakan pola peningkatan. Peningkatan kontrak diperlukan dalam kasus ketika cacat kritis menyebabkan kontrak lama menjadi tidak dapat digunakan dan pilihan paling layak adalah menyebarkan logika baru.

Mekanisme peningkatan kontrak berfungsi dengan cara berbeda, tetapi "pola proksi" adalah salah satu cara yang lebih populer untuk meningkatkan kontrak pintar. Pola proksi memisahkan keadaan dan logika aplikasi menjadi _dua_ kontrak. Kontrak pertama (disebut 'kontrak proksi') menyimpan variabel keadaan (misalnya, saldo pengguna), sedangkan kontrak kedua (yang disebut 'kontrak logika') menyimpan kode untuk menjalankan fungsi kontrak.

Akun berinteraksi dengan kontrak proksi, yang mengirimkan semua panggilan fungsi ke kontrak logika dengan menggunakan panggilan tingkat rendah [`delegatecall()`](https://docs.soliditylang.org/en/v0.8.16/introduction-to-smart-contracts.html?highlight=delegatecall#delegatecall-callcode-and-libraries). Berbeda dengan pemanggilan message biasa, `delegatecall()` memastikan bahwa kode yang berjalan pada alamat kontrak logika akan dijalankan dalam konteks kontrak yang memanggil. Hal ini berarti bahwa kontrak logika akan selalu menulis ke penyimpanan kontrak proksi (bukan ke penyimpanannya sendiri) dan nilai asli dari `msg.sender` dan `msg.value` akan dipertahankan.

Mendelegasikan panggilan ke kontrak logika membutuhkan penyimpanan alamatnya di penyimpanan kontrak proksi. Oleh sebab itu, peningkatan logika kontrak hanyalah masalah penyebaran kontrak logika yang lain dan menyimpan alamat baru di kontrak proksi. Karena panggilan berikutnya ke kontrak proksi secara otomatis dirutekan ke kontrak logika yang baru, Anda akan "meningkatkan" kontrak tanpa benar-benar mengubah kode.

[Selengkapnya tentang peningkatan kontrak](/developers/docs/smart-contracts/upgrading/).

#### Penghentian darurat {#emergency-stops}

Seperti yang telah disebutkan, audit dan pengujian yang ekstensif tidak akan dapat menemukan semua bug dalam kontrak pintar. Jika kerentanan muncul dalam kode Anda setelah penyebaran, upaya menambalnya tidak mungkin dilakukan karena Anda tidak dapat mengubah kode yang berjalan di akun kontrak. Selain itu, mekanisme peningkatan (misalnya, pola proksi) dapat memakan waktu untuk diterapkan (sering kali membutuhkan persetujuan dari berbagai pihak), yang hanya memberikan lebih banyak waktu bagi penyerang untuk menimbulkan kerusakan lain.

Opsi nuklir adalah menerapkan fungsi "penghentian darurat" yang akan memblokir panggilan ke fungsi-fungsi yang rentan dalam kontrak. Penghentian darurat biasanya terdiri dari beberapa komponen berikut ini:

1. Variabel Boolean global yang menunjukkan apakah kontrak pintar dalam keadaan berhenti atau tidak. Variabel ini ditetapkan sebagai `false` saat penyiapan kontrak, tetapi akan kembali ke `true` setelah kontrak dihentikan.

2. Fungsi yang mereferensikan variabel Boolean ketika dijalankan. Fungsi-fungsi tersebut dapat diakses ketika kontrak pintar tidak dihentikan, dan menjadi tidak bisa diakses ketika fitur penghentian darurat dipicu.

3. Entitas yang memiliki akses ke fungsi penghentian darurat, yang menetapkan variabel Boolean ke nilai `true`. Untuk mencegah tindakan jahat, panggilan ke fungsi ini dapat dibatasi hanya untuk alamat tepercaya (misalnya, pemilik kontrak).

Setelah kontrak mengaktifkan penghentian darurat, fungsi tertentu tidak akan dapat dipanggil. Hal ini dicapai dengan memasukkan beberapa fungsi tertentu ke dalam pengubah yang mengacu ke variabel global. Berikut [contoh](https://github.com/fravoll/solidity-patterns/blob/master/EmergencyStop/EmergencyStop.sol) yang menggambarkan pelaksanaan pola ini dalam kontrak:

```solidity
// This code has not been professionally audited and makes no promises about safety or correctness. Use at your own risk.

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
        // Check for authorization of msg.sender here
        _;
    }

    function stopContract() public onlyAuthorized {
        isStopped = true;
    }

    function resumeContract() public onlyAuthorized {
        isStopped = false;
    }

    function deposit() public payable stoppedInEmergency {
        // Deposit logic happening here
    }

    function emergencyWithdraw() public onlyWhenStopped {
        // Emergency withdraw happening here
    }
}
```

Contoh ini menunjukkan fitur dasar penghentian darurat:

- `isStopped` adalah Boolean yang dinilai menjadi `false` saat awal dan menjadi `true` ketika kontrak memasuki mode darurat.

- Pengubah fungsi `onlyWhenStopped` dan `stoppedInEmergency` memeriksa variabel `isStopped`. `stoppedInEmergency` digunakan untuk mengontrol fungsi-fungsi yang seharusnya tidak dapat diakses ketika kontrak mengalami kerentanan (misalnya, `deposit()`). Panggilan ke berbagai fungsi ini akan langsung dibatalkan.

`onlyWhenStopped` digunakan untuk fungsi-fungsi yang seharusnya dapat dipanggil selama keadaan darurat (misalnya, `emergencyWithdraw()`). Fungsi-fungsi tersebut dapat membantu mengatasi situasi sehingga dikecualikan dari daftar "fungsi terbatas".

Penggunaan fungsionalitas penghentian darurat memberikan tindakan sementara yang efektif untuk menangani kerentanan serius pada kontrak pintar Anda. Namun, fungsi ini membutuhkan kepercayaan lebih besar dari pengguna terhadap pengembang agar tidak mengaktifkan fungsi ini untuk kepentingannya sendiri. Untuk tujuan ini, solusi yang mungkin adalah desentralisasi kontrol penghentian darurat dengan cara memberlakukan mekanisme voting di dalam rantai, timelock, atau persetujuan dari dompet multisig.

#### Pemantauan aksi {#event-monitoring}

[Aksi](https://docs.soliditylang.org/en/v0.8.15/contracts.html#events) memungkinkan Anda melacak panggilan ke fungsi kontrak pintar dan memantau perubahan pada variabel keadaan. Idealnya, kontrak pintar Anda diprogram untuk mengeluarkan aksi setiap kali ada pihak yang melakukan tindakan yang kritis dari segi keamanan (misalnya, menarik dana).

Pembuatan log untuk aksi dan pemantauannya di luar rantai memberikan wawasan tentang operasi kontrak dan membantu mempercepat pengungkapan tindakan jahat. Hal ini berarti tim Anda dapat merespons lebih cepat terhadap peretasan dan melakukan tindakan untuk mengurangi dampaknya terhadap pengguna, seperti menjeda fungsi atau melakukan peningkatan.

Anda juga dapat memilih alat pemantauan yang dijual bebas yang secara otomatis mengirimkan peringatan setiap kali seseorang berinteraksi dengan kontrak Anda. Dengan berbagai alat ini, Anda dapat membuat peringatan khusus berdasarkan berbagai pemicu, seperti volume transaksi, frekuensi panggilan fungsi, atau fungsi tertentu yang terlibat. Misalnya, Anda dapat memprogram peringatan yang muncul ketika jumlah penarikan dalam satu transaksi melewati ambang batas tertentu.

### 7. Merancang sistem tata kelola yang aman {#design-secure-governance-systems}

Anda mungkin ingin mendesentralisasi aplikasi Anda dengan menyerahkan kontrol atas kontrak pintar inti ke anggota komunitas. Dalam hal ini, sistem kontrak pintar akan mencakup modul tata kelola—mekanisme yang memungkinkan anggota komunitas menyetujui tindakan administratif melalui sistem tata kelola di dalam rantai. Misalnya, proposal peningkatan kontrak proksi menjadi implementasi baru dapat dipilih oleh para pemegang token.

Tata kelola terdesentralisasi dapat bermanfaat, terutama karena sejalan dengan kepentingan pengembang dan pengguna akhir. Namun demikian, mekanisme tata kelola kontrak pintar dapat menimbulkan risiko baru jika penerapannya tidak tepat. Skenario yang dapat terjadi adalah jika penyerang memperoleh kekuatan suara yang sangat besar (diukur dalam jumlah token yang dipegang) dengan mengambil [flash loan](/defi/#flash-loans) (pinjaman kilat) dan berhasil masuk melalui proposal jahat.

Salah satu cara untuk mencegah masalah terkait tata kelola di dalam rantai adalah dengan [menggunakan timelock (penguncian waktu)](https://blog.openzeppelin.com/protect-your-users-with-smart-contract-timelocks/). Timelock (penguncian waktu) mencegah kontrak pintar menjalankan tindakan tertentu hingga berlalunya jangka waktu tertentu. Strategi lain termasuk menetapkan "bobot suara" pada setiap token berdasarkan lamanya token tersebut terkunci, atau mengukur kekuatan suara dari alamat pada periode sebelumnya (misalnya, 2-3 blok sebelumnya) sebagai pengganti blok saat ini. Kedua metode tersebut mengurangi kemungkinan terkumpulnya suara dengan cepat untuk mempengaruhi suara di dalam rantai.

Selengkapnya tentang [merancang sistem tata kelola yang aman](https://blog.openzeppelin.com/smart-contract-security-guidelines-4-strategies-for-safer-governance-systems/) dan [berbagai mekanisme pemungutan suara dalam DAO](https://hackernoon.com/governance-is-the-holy-grail-for-daos).

### 8. Mengurangi kompleksitas dalam kode menjadi sesedikit mungkin {#reduce-code-complexity}

Pengembang perangkat lunak tradisional akrab dengan prinsip KISS ("usahakan tetap sederhana"), yang menyarankan agar tidak memasukkan kompleksitas yang tidak perlu ke dalam desain perangkat lunak. Hal ini mengikuti pemikiran lama bahwa "sistem kompleks akan gagal dengan cara yang kompleks" dan menjadi lebih rentan terhadap kesalahan yang sangat merugikan.

Menjaga kesederhanaan terutama penting saat menulis kontrak pintar, mengingat bahwa kontrak pintar berpotensi mengontrol jumlah nilai yang besar. Tips untuk mencapai kesederhanaan saat menulis kontrak pintar adalah dengan menggunaan kembali pustaka-pustaka yang sudah ada, seperti [Kontrak OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x/), jika memungkinkan. Karena berbagai pustaka ini telah melalui audit dan pengujian yang ekstensif oleh para pengembang, penggunaan pustaka ini mengurangi kemungkinan munculnya bug dibandingkan dengan menulis fungsionalitas baru dari awal.

Saran umum lainnya adalah menulis fungsi yang kecil dan menjaga kontrak tetap modular dengan membagi logika bisnis ke dalam beberapa kontrak. Penulisan kode yang lebih sederhana tidak hanya mengurangi permukaan serangan pada kontrak pintar, tetapi juga mempermudah pemahaman tentang ketepatan sistem secara keseluruhan dan mendeteksi kemungkinan kesalahan desain sejak awal.

### 9. Mencegah kerentanan umum kontrak pintar {#mitigate-common-smart-contract-vulnerabilities}

#### Reentrancy (masuk kembali) {#reentrancy}

EVM tidak mengizinkan konkurensi, yang berarti dua kontrak yang terlibat dalam pemanggilan message tidak dapat berjalan serentak. Panggilan eksternal akan menjeda eksekusi dan memori kontrak pemanggil hingga panggilan tersebut kembali, pada saat itu eksekusi berlanjut dengan normal. Proses ini dapat dideskripsikan secara resmi sebagai mentransfer [alur kontrol](https://www.computerhope.com/jargon/c/contflow.htm) ke kontrak lain.

Meski kebanyakan aman, mentransfer alur kontrol ke kontrak yang tidak tepercaya dapat menyebabkan masalah, seperti reentrancy (masuk kembali). Serangan reentrancy (masuk kembali) terjadi ketika kontrak jahat memanggil balik ke kontrak yang rentan sebelum pemanggilan fungsi yang asli selesai. Penjelasan terbaik untuk jenis serangan ini adalah dengan contoh.

Misalkan ada kontrak pintar sederhana ('Korban') yang memungkinkan penyetoran dan penarikan Ether bagi siapa saja:

```solidity
// This contract is vulnerable. Do not use in production

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

Fungsi `withdraw()` di kontrak `Victim` mengikuti pola "periksa-interaksi-efek". Fungsi ini _memeriksa_ apakah kondisi yang diperlukan untuk eksekusi terpenuhi (yaitu, pengguna memiliki saldo ETH positif) dan melakukan _interaksi_ dengan mengirim ETH ke alamat pemanggil, sebelum menerapkan _efek_ transaksi (yaitu, mengurangi saldo pengguna).

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

Tidak ada yang salah di sini, kecuali bahwa `Attacker` memiliki fungsi lain yang memanggil kembali fungsi `withdraw()` di `Victim` jika gas yang tersisa dari `msg.sender.call.value` yang masuk lebih dari 40.000. Hal ini memberi `Attacker` kemampuan untuk masuk kembali ke `Victim` dan menarik lebih banyak dana _sebelum_ selesainya pemanggilan `withdraw` yang pertama. Siklusnya terlihat seperti ini:

```solidity
- Attacker's EOA calls `Attacker.beginAttack()` with 1 ETH
- `Attacker.beginAttack()` deposits 1 ETH into `Victim`
- `Attacker` calls `withdraw() in `Victim`
- `Victim` checks `Attacker`’s balance (1 ETH)
- `Victim` sends 1 ETH to `Attacker` (which triggers the default function)
- `Attacker` calls `Victim.withdraw()` again (note that `Victim` hasn’t reduced `Attacker`’s balance from the first withdrawal)
- `Victim` checks `Attacker`’s balance (which is still 1 ETH because it hasn’t applied the effects of the first call)
- `Victim` sends 1 ETH to `Attacker` (which triggers the default function and allows `Attacker` to reenter the `withdraw` function)
- The process repeats until `Attacker` runs out of gas, at which point `msg.sender.call.value` returns without triggering additional withdrawals
- `Victim` finally applies the results of the first transaction (and subsequent ones) to its state, so `Attacker`’s balance is set to 0
```

Ringkasnya adalah karena saldo pemanggil tidak ditetapkan ke 0 hingga selesainya eksekusi fungsi, pemanggilan berikutnya akan berhasil dan memungkinkan pemanggil menarik saldonya beberapa kali. Jenis serangan seperti ini dapat digunakan untuk menguras dana dari kontrak pintar, seperti yang terjadi dalam serangan [peretasan DAO 2016](https://www.coindesk.com/learn/2016/06/25/understanding-the-dao-attack/). Serangan reentrancy (masuk kembali) masih menjadi masalah kritis bagi kontrak pintar saat ini, seperti yang ditunjukkan oleh [daftar publik eksploit reentrancy](https://github.com/pcaversaccio/reentrancy-attacks).

##### Cara mencegah serangan reentrancy (masuk kembali)

Salah satu pendekatan untuk menangani reentrancy (masuk kembali) adalah dengan mengikuti pola [periksa-efek-interaksi](https://docs.soliditylang.org/en/develop/security-considerations.html#use-the-checks-effects-interactions-pattern). Pola ini mengurutkan eksekusi fungsi sedemikian rupa sehingga kode yang melakukan pemeriksaan yang diperlukan sebelum melanjutkan eksekusi akan berada di urutan pertama, diikuti oleh kode yang memanipulasi keadaan kontrak, lalu yang terakhir adalah kode yang berinteraksi dengan kontrak atau EOA lain.

Pola periksa-efek-interaksi digunakan dalam versi yang direvisi dari kontrak `Victim` yang ditunjukkan di bawah ini:

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
        require(!locked, "Blocked from reentrancy.");
        locked = true;
        _;
        locked = false;
    }
    // This function is protected by a mutex, so reentrant calls from within `msg.sender.call` cannot call `withdraw` again.
    //  The `return` statement evaluates to `true` but still evaluates the `locked = false` statement in the modifier
    function withdraw(uint _amount) public payable noReentrancy returns(bool) {
        require(balances[msg.sender] >= _amount, "No balance to withdraw.");

        balances[msg.sender] -= _amount;
        bool (success, ) = msg.sender.call{value: _amount}("");
        require(success);

        return true;
    }
}
```

Anda juga dapat menggunakan sistem [pembayaran tarik](https://docs.openzeppelin.com/contracts/4.x/api/security#PullPayment) yang mengharuskan pengguna menarik dana dari kontrak pintar, sebagai pengganti sistem "pembayaran dorong" yang mengirim dana ke akun. Hal ini menghilangkan kemungkinan secara tidak sengaja memicu kode pada alamat yang tidak dikenal (dan juga dapat mencegah beberapa serangan denial-of-service atau penolakan layanan).

#### Underflow dan overflow bilangan bulat {#integer-underflows-and-overflows}

Overflow bilangan bulat terjadi ketika hasil operasi aritmatika berada di luar rentang nilai yang dapat diterima sehingga menyebabkan nilainya "bergulung" ke nilai terendah yang dapat dinyatakan. Misalnya, `uint8` hanya dapat menyimpan nilai hingga 2^8-1=255. Operasi aritmatika yang menghasilkan nilai yang lebih besar dari `255` akan mengalami overflow dan mengatur ulang `uint` ke `0`, serupa dengan cara odometer di mobil mengatur ulang ke 0 setelah mencapai jarak tempuh maksimal (999999).

Underflow bilangan bulat terjadi karena alasan yang serupa: hasil operasi aritmatika berada di bawah rentang yang dapat diterima. Misalkan Anda mencoba mengurangi lagi nilai `0` pada data jenis `uint8`, maka hasilnya akan langsung bergulung ke nilai terbesar yang dapat dinyatakan (`255`).

Baik overflow maupun underflow bilangan bulat dapat menyebabkan perubahan tak terduga pada variabel keadaan di kontrak dan menyebabkan eksekusi yang tidak direncanakan. Di bawah ini adalah contoh yang menunjukkan cara penyerang mengeksploitasi overflow aritmetika di kontrak pintar untuk melakukan operasi yang tidak sah:

```
pragma solidity ^0.7.6;

// This contract is designed to act as a time vault.
// User can deposit into this contract but cannot withdraw for at least a week.
// User can also extend the wait time beyond the 1 week waiting period.

/*
1. Deploy TimeLock
2. Deploy Attack with address of TimeLock
3. Call Attack.attack sending 1 ether. You will immediately be able to
   withdraw your ether.

What happened?
Attack caused the TimeLock.lockTime to overflow and was able to withdraw
before the 1 week waiting period.
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
        require(balances[msg.sender] > 0, "Insufficient funds");
        require(block.timestamp > lockTime[msg.sender], "Lock time not expired");

        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;

        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send Ether");
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
        if t = current lock time then we need to find x such that
        x + t = 2**256 = 0
        so x = -t
        2**256 = type(uint).max + 1
        so x = type(uint).max + 1 - t
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

[Oracles](/developers/docs/oracles/) mengambil informasi di luar rantai dan mengirimnya ke dalam rantai agar dapat digunakan oleh kontrak pintar. Dengan oracle, Anda dapat mendesain kontrak pintar yang mendukung sistem di luar rantai, seperti pasar modal, sehingga dapat sangat memperluas penggunaannya.

Akan tetapi, jika oracle rusak dan mengirimkan informasi yang salah di dalam rantai, kontrak pintar akan dijalankan berdasarkan input yang salah sehingga dapat menimbulkan masalah. Ini adalah dasar dari "masalah oracle", yang berkaitan dengan tugas untuk memastikan informasi dari oracle rantai blok sudah akurat, mutakhir, dan tepat waktu.

Masalah keamanan yang terkait adalah menggunakan oracle di dalam rantai, seperti pertukaran terdesentralisasi, untuk mendapatkan harga spot untuk aset. Platform pemberian pinjaman di industri [finansial terdesentralisasi (DeFi)](/defi/) sering melakukan hal ini guna menentukan nilai jaminan pengguna untuk menentukan jumlah yang dapat dipinjamnya.

Harga DEX sering kali akurat, sebagian besar disebabkan oleh arbitrator yang memulihkan parity di pasar. Akan tetapi, harga tersebut mudah dimanipulasi, terutama jika oracle di dalam rantai menghitung harga aset berdasarkan pola perdagangan historis (seperti yang umum terjadi).

Misalnya, penyerang dapat memompa harga spot aset yang palsu dengan mengambil flash loan (pinjaman kilat) tepat sebelum berinteraksi dengan kontrak pemberian pinjaman Anda. Meminta DEX untuk harga aset akan mengembalikan nilai yang lebih tinggi dari biasanya (karena "pesanan beli" penyerang yang lebih besar dari biasanya sehingga mengubah permintaan aset). Hal ini menyebabkan penyerang dapat meminjam lebih banyak dari yang seharusnya. "Serangan pinjaman kilat" tersebut telah digunakan untuk mengeksploitasi ketergantungan pada oracle harga di antara aplikasi DeFi sehingga menyebabkan protokol kehilangan dana jutaan.

##### Cara mencegah manipulasi oracle

Persyaratan minimum untuk menghindari manipulasi oracle adalah menggunakan jaringan oracle terdesentralisasi yang meminta informasi dari berbagai sumber untuk menghindari titik kegagalan tunggal. Dalam kebanyakan kasus, oracle terdesentralisasi memiliki insentif ekonomi kripto bawaan untuk mendorong simpul oracle agar melaporkan informasi yang tepat sehingga menjadikannya lebih aman daripada oracle terpusat.

Jika Anda berencana untuk meminta harga aset dari oracle di dalam rantai, pertimbangkan untuk menggunakan oracle yang menerapkan mekanisme harga rata-rata berbobot waktu (TWAP). Sebuah [oracle TWAP](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) meminta harga aset pada dua titik waktu yang berbeda (yang dapat Anda ubah) dan menghitung harga spot berdasarkan harga rata-rata yang diperoleh. Memilih periode waktu yang lebih lama melindungi protokol Anda dari manipulasi harga karena order besar yang dieksekusi baru-baru ini tidak dapat memengaruhi harga aset.

## Sumber daya keamanan kontrak pintar untuk pengembang {#smart-contract-security-resources-for-developers}

### Alat untuk menganalisis kontrak pintar dan memverifikasi kebenaran kode {#code-analysis-tools}

- **[Alat dan pustaka pengujian](/developers/docs/smart-contracts/testing/#testing-tools-and-libraries)** - _Kumpulan alat dan pustaka standar industri untuk melakukan pengujian unit, analisis statis, dan analisis dinamis pada kontrak pintar._

- **[Alat verifikasi formal](/developers/docs/smart-contracts/formal-verification/#formal-verification-tools)** - _Alat untuk memverifikasi kebenaran fungsional pada kontrak pintar dan memeriksa invarian._

- **[Layanan audit kontrak pintar](/developers/docs/smart-contracts/testing/#smart-contract-auditing-services)** - _Daftar organisasi yang menyediakan layanan audit kontrak pintar untuk proyek pengembangan Ethereum._

- **[Platform hadiah bounty bug](/developers/docs/smart-contracts/testing/#bug-bounty-platforms)** - _Platform untuk mengkoordinasikan hadiah bounty bug dan memberi hadiah atas pengungkapan kerentanan kritis di kontrak pintar secara bertanggung jawab._

- **[Pemeriksa Fork](https://forkchecker.hashex.org/)** - _Alat online gratis untuk memeriksa semua informasi yang tersedia mengenai kontrak hasil fork._

- **[Pengode ABI](https://abi.hashex.org/)** - _Layanan online gratis untuk mengodekan fungsi kontrak Solidity dan argumen konstruktor Anda._

### Alat untuk memantau kontrak pintar {#smart-contract-monitoring-tools}

- **[Defender Sentinels OpenZeppelin](https://docs.openzeppelin.com/defender/sentinel)** - _Alat untuk memantau dan merespons aksi, fungsi, dan parameter transaksi secara otomatis di kontrak pintar Anda._

- **[Peringatan Waktu Nyata Tenderly](https://tenderly.co/alerting/)** - _Alat untuk mendapatkan pemberitahuan waktu nyata ketika aksi yang tidak biasa atau tak terduga terjadi pada kontrak pintar atau dompet Anda._

### Alat untuk administrasi kontrak pintar dengan aman {#smart-contract-administration-tools}

- **[Defender Admin OpenZeppelin](https://docs.openzeppelin.com/defender/admin)** - _Antarmuka untuk mengelola administrasi kontrak pintar, termasuk kontrol akses, peningkatan, dan penangguhan._

- **[Safe](https://safe.global/)** - _Dompet kontrak pintar yang berjalan di Ethereum dan membutuhkan jumlah orang minimum untuk menyetujui transaksi sebelum transaksi tersebut dapat terjadi (M-dari-N)._

- **[Kontrak OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x/)** - _Pustaka kontrak untuk menerapkan fitur-fitur administratif, termasuk kepemilikan kontrak, peningkatan, kontrol akses, tata kelola, kemampuan jeda, dan lainnya._

### Layanan audit kontrak pintar {#smart-contract-auditing-services}

- **[ConsenSys Diligence](https://consensys.net/diligence/)** - _Layanan pengauditan kontrak pintar membantu proyek di seluruh ekosistem rantai blok dalam memastikan agar protokol proyek siap diluncurkan dan dapat melindungi pengguna._

- **[CertiK](https://www.certik.com/)** - _Perusahaan keamanan rantai blok merintis penggunaan teknologi Verifikasi formal canggih pada kontrak pintar dan jaringan rantai blok._

- **[Trail of Bits](https://www.trailofbits.com/)** - _Perusahaan keamanan siber yang menggabungkan riset keamanan dengan mentalitas penyerang untuk mengurangi risiko dan memperkuat kode._

- **[PeckShield](https://peckshield.com/)** - _Perusahaan keamanan rantai blok yang menawarkan produk dan layanan untuk keamanan, privasi, dan kegunaan di seluruh ekosistem rantai blok._

- **[QuantStamp](https://quantstamp.com/)** - _Layanan pengauditan yang memudahkan penggunaan arus utama teknologi rantai blok melalui layanan penilaian keamanan dan risiko._

- **[OpenZeppelin](https://www.openzeppelin.com/security-audits)** - _Perusahaan keamanan kontrak pintar yang menyediakan audit keamanan untuk sistem terdistribusi._

- **[Verifikasi Waktu Aktif](https://runtimeverification.com/)** - _Perusahaan keamanan yang berspesialisasi dalam pemodelan dan verifikasi formal kontrak pintar._

- **[Hacken](https://hacken.io)** - _Auditor keamanan Web3 yang menghadirkan pendekatan 360 derajat untuk keamanan rantai blok._

- **[Nethermind](https://nethermind.io/smart-contracts-audits)** - _Layanan pengauditan Solidity dan Cairo, memastikan integritas kontrak pintar dan keamanan pengguna di seluruh Ethereum dan Starknet._

- **[HashEx](https://hashex.org/)** - _HashEx berfokus pada pengauditan rantai blok dan kontrak pintar untuk memastikan keamanan mata uang kripto, menyediakan layanan seperti pengembangan kontrak pintar, pengujian penetrasi, konsultasi rantai blok._

- **[Code4rena](https://code4rena.com/)** - _Platform audit kompetitif yang memberikan insentif kepada ahli keamanan kontrak pintar untuk menemukan kerentanan dan membantu membuat web3 lebih aman._

### Platform hadiah bounty bug {#bug-bounty-platforms}

- **[Immunefi](https://immunefi.com/)** - _Platform hadiah bounty bug pada kontrak pintar dan proyek DeFi, di mana peneliti keamanan meninjau kode, mengungkapkan kerentanan, mendapatkan bayaran, dan membuat kripto lebih aman._

- **[HackerOne](https://www.hackerone.com/)** - _Platform koordinasi kerentanan dan hadiah bounty bug yang menghubungkan bisnis dengan penguji penetrasi dan peneliti keamanan siber._

- **[HackenProof](https://hackenproof.com/)** - _Platform hadiah bounty buku bagi ahli untuk proyek-proyek kripto (DeFi, Kontrak Pintar, Dompet, CEX, dan lain-lain), di mana para profesional keamanan menyediakan layanan triase dan peneliti dibayar jika membuat laporan bug yang relevan dan terverifikasi._

### Publikasi kerentanan dan eksploitasi kontrak pintar yang diketahui {#common-smart-contract-vulnerabilities-and-exploits}

- **[ConsenSys: Serangan Terkenal pada Kontrak Pintar](https://consensys.github.io/smart-contract-best-practices/attacks/)** - _Penjelasan yang mudah bagi pemula tentang kerentanan kontrak yang paling signifikan, dengan kode contoh untuk sebagian besar kasus._

- **[Daftar SWC](https://swcregistry.io/)** - _Daftar kurasi Common Weakness Enumeration (CWE) yang berlaku untuk kontrak pintar Ethereum._

- **[Rekt](https://rekt.news/)** - _Publikasi yang diperbarui secara teratur tentang peretasan dan eksploitasi kripto yang terkenal, beserta laporan pascakejadian yang mendetail._

### Tantangan untuk mempelajari keamanan kontrak pintar {#challenges-for-learning-smart-contract-security}

- **[Awesome BlockSec CTF](https://github.com/blockthreat/blocksec-ctfs)** - _Daftar kurasi game perang keamanan rantai blok beserta tantangannya, dan kompetisi [Capture The Flag](https://www.webopedia.com/definitions/ctf-event/amp/) serta penulisan tentang solusi._

- **[DeFi Damn Vulnerable](https://www.damnvulnerabledefi.xyz/)** - _Permainan perang untuk mempelajari keamanan ofensif dari kontrak pintar DeFi serta mengembangkan keterampilan dalam perburuan bug dan audit keamanan._

- **[Ethernaut](https://ethernaut.openzeppelin.com/)** - _Permainan perang berbasis Web3/Solidity di mana setiap tingkatnya adalah kontrak pintar yang perlu 'diretas'._

### Praktik terbaik untuk mengamankan kontrak pintar {#smart-contract-security-best-practices}

- **[ConsenSys: Praktik Keamanan Terbaik Kontrak Pintar Ethereum](https://consensys.github.io/smart-contract-best-practices/)** - _Daftar pedoman lengkap untuk mengamankan kontrak pintar Ethereum._

- **[Nascent: Set Alat Keamanan Sederhana](https://github.com/nascentxyz/simple-security-toolkit)** - _Kumpulan panduan dan daftar periksa berfokus keamanan yang praktis untuk pengembangan kontrak pintar._

- **[Pola Solidity](https://fravoll.github.io/solidity-patterns/)** - _Kompilasi pola aman dan praktik terbaik yang bermanfaat untuk bahasa pemrograman kontrak pintar Solidity._

- **[Dokumentasi Solidity: Pertimbangan Keamanan](https://docs.soliditylang.org/en/v0.8.16/security-considerations.html)** - _Pedoman menulis kontrak pintar yang aman dengan Solidity._

- **[Standar Verifikasi Keamanan Kontrak Pintar](https://github.com/securing/SCSVS)** - _Daftar periksa yang terdiri dari empat belas bagian yang dibuat untuk menstandarkan keamanan kontrak pintar bagi pengembang, arsitek, pemeriksa keamanan, dan vendor._

### Tutorial tentang keamanan kontrak pintar {#tutorials-on-smart-contract-security}

- [Cara menulis kontrak pintar yang aman](/developers/tutorials/secure-development-workflow/)

- [Cara menggunakan Slither untuk menemukan bug kontrak pintar](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

- [Cara menggunakan Manticore untuk menemukan bug kontrak pintar](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)

- [Panduan keamanan kontrak pintar](/developers/tutorials/smart-contract-security-guidelines/)

- [Cara aman mengintegrasikan kontrak token Anda dengan token arbitrer](/developers/tutorials/token-integration-checklist/)
