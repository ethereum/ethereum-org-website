---
title: Keamanan kontrak pintar
description: Gambaran umum panduan untuk membangun kontrak pintar Ethereum yang aman
lang: id
---

Kontrak pintar sangat fleksibel, dan mampu mengendalikan sejumlah besar nilai dan data, sambil menjalankan logika yang tidak dapat diubah berdasarkan kode yang disebarkan di rantai blok. Hal ini telah menciptakan ekosistem aplikasi tanpa kepercayaan dan terdesentralisasi yang dinamis yang memberikan banyak keuntungan dibandingkan sistem lama. Mereka juga mewakili peluang bagi penyerang yang mencari keuntungan dengan mengeksploitasi kerentanan dalam kontrak pintar.

Rantai blok publik, seperti [Ethereum](/), semakin memperumit masalah pengamanan kontrak pintar. Kode kontrak yang disebarkan _biasanya_ tidak dapat diubah untuk menambal celah keamanan, sementara aset yang dicuri dari kontrak pintar sangat sulit dilacak dan sebagian besar tidak dapat dipulihkan karena ketidakberubahan.

Meskipun angkanya bervariasi, diperkirakan jumlah total nilai yang dicuri atau hilang akibat cacat keamanan dalam kontrak pintar dengan mudah melampaui $1 miliar. Ini termasuk insiden tingkat tinggi, seperti [peretasan DAO](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/) (3,6 juta ETH dicuri, bernilai lebih dari $1 miliar pada harga saat ini), [peretasan dompet multisig Parity](https://www.coindesk.com/markets/2017/07/19/30-million-ether-reported-stolen-due-to-parity-wallet-breach) ($30 juta hilang oleh peretas), dan [masalah dompet beku Parity](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether) (lebih dari $300 juta dalam bentuk ETH terkunci selamanya).

Masalah-masalah yang disebutkan di atas membuat pengembang wajib menginvestasikan upaya dalam membangun kontrak pintar yang aman, kuat, dan tangguh. Keamanan kontrak pintar adalah hal yang serius, dan sangat penting untuk dipelajari oleh setiap pengembang. Panduan ini akan membahas pertimbangan keamanan bagi pengembang Ethereum dan menjelajahi sumber daya untuk meningkatkan keamanan kontrak pintar.

## Prasyarat {#prerequisites}

Pastikan Anda memahami [dasar-dasar pengembangan kontrak pintar](/developers/docs/smart-contracts/) sebelum mempelajari keamanan.

## Panduan untuk membangun kontrak pintar Ethereum yang aman {#smart-contract-security-guidelines}

### 1. Rancang kontrol akses yang tepat {#design-proper-access-controls}

Dalam kontrak pintar, fungsi yang ditandai `public` atau `external` dapat dipanggil oleh akun yang dimiliki secara eksternal (EOA) atau akun kontrak mana pun. Menentukan visibilitas publik untuk fungsi diperlukan jika Anda ingin orang lain berinteraksi dengan kontrak Anda. Namun, fungsi yang ditandai `private` hanya dapat dipanggil oleh fungsi di dalam kontrak pintar, dan bukan akun eksternal. Memberikan akses ke fungsi kontrak kepada setiap peserta jaringan dapat menyebabkan masalah, terutama jika itu berarti siapa pun dapat melakukan operasi sensitif (misalnya, pencetakan token baru).

Untuk mencegah penggunaan fungsi kontrak pintar yang tidak sah, penting untuk menerapkan kontrol akses yang aman. Mekanisme kontrol akses membatasi kemampuan untuk menggunakan fungsi tertentu dalam kontrak pintar hanya untuk entitas yang disetujui, seperti akun yang bertanggung jawab untuk mengelola kontrak. **Pola Ownable** dan **kontrol berbasis peran** adalah dua pola yang berguna untuk menerapkan kontrol akses dalam kontrak pintar:

#### Pola Ownable {#ownable-pattern}

Dalam pola Ownable, sebuah alamat ditetapkan sebagai "pemilik" kontrak selama proses pembuatan kontrak. Fungsi yang dilindungi diberi pengubah `OnlyOwner`, yang memastikan kontrak mengautentikasi identitas alamat pemanggil sebelum mengeksekusi fungsi. Panggilan ke fungsi yang dilindungi dari alamat lain selain pemilik kontrak akan selalu mengembalikan (revert) transaksi, mencegah akses yang tidak diinginkan.

#### Kontrol akses berbasis peran {#role-based-access-control}

Mendaftarkan satu alamat sebagai `Owner` dalam kontrak pintar menimbulkan risiko sentralisasi dan mewakili titik kegagalan tunggal (single point-of-failure). Jika kunci akun pemilik disusupi, penyerang dapat menyerang kontrak yang dimiliki. Inilah sebabnya mengapa menggunakan pola kontrol akses berbasis peran dengan beberapa akun administratif mungkin merupakan pilihan yang lebih baik.

Dalam kontrol akses berbasis peran, akses ke fungsi sensitif didistribusikan di antara sekumpulan peserta tepercaya. Misalnya, satu akun mungkin bertanggung jawab untuk pencetakan token, sementara akun lain melakukan peningkatan atau menjeda kontrak. Mendestralisasikan kontrol akses dengan cara ini menghilangkan titik kegagalan tunggal dan mengurangi asumsi kepercayaan bagi pengguna.

##### Menggunakan dompet tanda tangan ganda
Pendekatan lain untuk menerapkan kontrol akses yang aman adalah menggunakan [akun tanda tangan ganda](/developers/docs/smart-contracts/#multisig) untuk mengelola kontrak. Tidak seperti EOA biasa, akun tanda tangan ganda dimiliki oleh beberapa entitas dan memerlukan tanda tangan dari jumlah minimum akun—katakanlah 3-dari-5—untuk mengeksekusi transaksi.

Menggunakan multisig untuk kontrol akses memperkenalkan lapisan keamanan ekstra karena tindakan pada kontrak target memerlukan persetujuan dari beberapa pihak. Hal ini sangat berguna jika penggunaan pola Ownable diperlukan, karena membuatnya lebih sulit bagi penyerang atau orang dalam yang jahat untuk memanipulasi fungsi kontrak sensitif untuk tujuan jahat.

### 2. Gunakan pernyataan require(), assert(), dan revert() untuk menjaga operasi kontrak {#use-require-assert-revert}

Seperti yang disebutkan, siapa pun dapat memanggil fungsi publik dalam kontrak pintar Anda setelah disebarkan di rantai blok. Karena Anda tidak dapat mengetahui sebelumnya bagaimana akun eksternal akan berinteraksi dengan kontrak, sangat ideal untuk menerapkan perlindungan internal terhadap operasi bermasalah sebelum penyebaran. Anda dapat menegakkan perilaku yang benar dalam kontrak pintar dengan menggunakan pernyataan `require()`, `assert()`, dan `revert()` untuk memicu pengecualian dan mengembalikan perubahan state jika eksekusi gagal memenuhi persyaratan tertentu.

**`require()`**: `require` didefinisikan di awal fungsi dan memastikan kondisi yang telah ditentukan sebelumnya terpenuhi sebelum fungsi yang dipanggil dieksekusi. Pernyataan `require` dapat digunakan untuk memvalidasi input pengguna, memeriksa variabel state, atau mengautentikasi identitas akun pemanggil sebelum melanjutkan dengan suatu fungsi.

**`assert()`**: `assert()` digunakan untuk mendeteksi kesalahan internal dan memeriksa pelanggaran "invarian" dalam kode Anda. Invarian adalah asersi logis tentang state kontrak yang harus selalu benar untuk semua eksekusi fungsi. Contoh invarian adalah pasokan total maksimum atau saldo dari kontrak token. Menggunakan `assert()` memastikan bahwa kontrak Anda tidak pernah mencapai state yang rentan, dan jika itu terjadi, semua perubahan pada variabel state akan dibatalkan.

**`revert()`**: `revert()` dapat digunakan dalam pernyataan if-else yang memicu pengecualian jika kondisi yang disyaratkan tidak terpenuhi. Contoh kontrak di bawah ini menggunakan `revert()` untuk menjaga eksekusi fungsi:

```
pragma solidity ^0.8.4;

contract VendingMachine {
    address owner;
    error Unauthorized();
    function buy(uint amount) public payable {
        if (amount > msg.value / 2 ether)
            revert("Not enough Ether provided.");
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

Ketidakberubahan kode yang berjalan di [Mesin Virtual Ethereum](/developers/docs/evm/) berarti kontrak pintar menuntut tingkat penilaian kualitas yang lebih tinggi selama fase pengembangan. Menguji kontrak Anda secara ekstensif dan mengamatinya untuk hasil yang tidak terduga akan sangat meningkatkan keamanan dan melindungi pengguna Anda dalam jangka panjang.

Metode yang biasa dilakukan adalah menulis pengujian unit kecil menggunakan data tiruan yang diharapkan diterima kontrak dari pengguna. [Pengujian unit](/developers/docs/smart-contracts/testing/#unit-testing) baik untuk menguji fungsionalitas fungsi tertentu dan memastikan kontrak pintar berfungsi seperti yang diharapkan.

Sayangnya, pengujian unit kurang efektif untuk meningkatkan keamanan kontrak pintar jika digunakan secara terpisah. Pengujian unit mungkin membuktikan suatu fungsi dieksekusi dengan benar untuk data tiruan, tetapi pengujian unit hanya seefektif pengujian yang ditulis. Hal ini membuatnya sulit untuk mendeteksi kasus ekstrem (edge cases) yang terlewat dan kerentanan yang dapat merusak keamanan kontrak pintar Anda.

Pendekatan yang lebih baik adalah menggabungkan pengujian unit dengan pengujian berbasis properti yang dilakukan menggunakan [analisis statis dan dinamis](/developers/docs/smart-contracts/testing/#static-dynamic-analysis). Analisis statis bergantung pada representasi tingkat rendah, seperti [grafik aliran kontrol](https://en.wikipedia.org/wiki/Control-flow_graph) dan [pohon sintaksis abstrak](https://deepsource.io/glossary/ast/) untuk menganalisis state program dan jalur eksekusi yang dapat dijangkau. Sementara itu, teknik analisis dinamis, seperti [fuzzing kontrak pintar](https://www.cyfrin.io/blog/smart-contract-fuzzing-and-invariants-testing-foundry), mengeksekusi kode kontrak dengan nilai input acak untuk mendeteksi operasi yang melanggar properti keamanan.

[Verifikasi formal](/developers/docs/smart-contracts/formal-verification) adalah teknik lain untuk memverifikasi properti keamanan dalam kontrak pintar. Tidak seperti pengujian biasa, verifikasi formal dapat secara meyakinkan membuktikan tidak adanya kesalahan dalam kontrak pintar. Hal ini dicapai dengan membuat spesifikasi formal yang menangkap properti keamanan yang diinginkan dan membuktikan bahwa model formal dari kontrak mematuhi spesifikasi ini.

### 4. Mintalah tinjauan independen atas kode Anda {#get-independent-code-reviews}

Setelah menguji kontrak Anda, ada baiknya meminta orang lain untuk memeriksa kode sumber untuk masalah keamanan apa pun. Pengujian tidak akan mengungkap setiap kelemahan dalam kontrak pintar, tetapi mendapatkan tinjauan independen meningkatkan kemungkinan menemukan kerentanan.

#### Audit {#audits}

Menugaskan audit kontrak pintar adalah salah satu cara untuk melakukan tinjauan kode independen. Auditor memainkan peran penting dalam memastikan bahwa kontrak pintar aman dan bebas dari cacat kualitas serta kesalahan desain.

Meskipun demikian, Anda harus menghindari memperlakukan audit sebagai solusi ajaib (silver bullet). Audit kontrak pintar tidak akan menangkap setiap bug dan sebagian besar dirancang untuk memberikan putaran tinjauan tambahan, yang dapat membantu mendeteksi masalah yang terlewatkan oleh pengembang selama pengembangan dan pengujian awal. Anda juga harus mengikuti praktik terbaik untuk bekerja dengan auditor, seperti mendokumentasikan kode dengan benar dan menambahkan komentar sebaris, untuk memaksimalkan manfaat dari audit kontrak pintar.

- [Kiat & trik audit kontrak pintar](https://twitter.com/tinchoabbate/status/1400170232904400897) - _@tinchoabbate_
- [Maksimalkan audit Anda](https://inference.ag/blog/2023-08-14-tips/) - _Inference_

#### Bug bounty {#bug-bounties}

Menyiapkan program bug bounty adalah pendekatan lain untuk menerapkan tinjauan kode eksternal. Bug bounty adalah imbalan finansial yang diberikan kepada individu (biasanya peretas topi putih) yang menemukan kerentanan dalam suatu aplikasi.

Jika digunakan dengan benar, bug bounty memberikan insentif kepada anggota komunitas peretas untuk memeriksa kode Anda dari kelemahan kritis. Contoh di kehidupan nyata adalah "bug uang tak terbatas" yang akan memungkinkan penyerang membuat ether dalam jumlah tak terbatas di [Optimism](https://www.optimism.io/), sebuah protokol [lapisan 2 (l2)](/layer-2/) yang berjalan di Ethereum. Untungnya, seorang peretas topi putih [menemukan kelemahan tersebut](https://www.saurik.com/optimism.html) dan memberi tahu tim, [mendapatkan bayaran besar dalam prosesnya](https://cryptoslate.com/critical-bug-in-ethereum-l2-optimism-2m-bounty-paid/).

Strategi yang berguna adalah menetapkan pembayaran program bug bounty secara proporsional dengan jumlah dana yang dipertaruhkan. Digambarkan sebagai "[bug bounty berskala](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)", pendekatan ini memberikan insentif finansial bagi individu untuk mengungkapkan kerentanan secara bertanggung jawab alih-alih mengeksploitasinya.

### 5. Ikuti praktik terbaik selama pengembangan kontrak pintar {#follow-smart-contract-development-best-practices}

Keberadaan audit dan bug bounty tidak membebaskan tanggung jawab Anda untuk menulis kode berkualitas tinggi. Keamanan kontrak pintar yang baik dimulai dengan mengikuti proses desain dan pengembangan yang tepat:

- Simpan semua kode dalam sistem kontrol versi, seperti git

- Lakukan semua modifikasi kode melalui pull request

- Pastikan pull request memiliki setidaknya satu peninjau independen—jika Anda bekerja sendiri dalam sebuah proyek, pertimbangkan untuk mencari pengembang lain dan bertukar tinjauan kode

- Gunakan [lingkungan pengembangan](/developers/docs/frameworks/) untuk menguji, mengkompilasi, dan menyebarkan kontrak pintar

- Jalankan kode Anda melalui alat analisis kode dasar, seperti [Cyfrin Aderyn](https://github.com/Cyfrin/aderyn), Mythril, dan Slither. Idealnya, Anda harus melakukan ini sebelum setiap pull request digabungkan dan membandingkan perbedaan dalam output

- Pastikan kode Anda dikompilasi tanpa kesalahan, dan kompiler Solidity tidak mengeluarkan peringatan

- Dokumentasikan kode Anda dengan benar (menggunakan [NatSpec](https://solidity.readthedocs.io/en/develop/natspec-format.html)) dan jelaskan detail tentang arsitektur kontrak dalam bahasa yang mudah dipahami. Ini akan memudahkan orang lain untuk mengaudit dan meninjau kode Anda.

### 6. Terapkan rencana pemulihan bencana yang kuat {#implement-disaster-recovery-plans}

Merancang kontrol akses yang aman, menerapkan pengubah fungsi, dan saran lainnya dapat meningkatkan keamanan kontrak pintar, tetapi tidak dapat mengesampingkan kemungkinan eksploitasi berbahaya. Membangun kontrak pintar yang aman membutuhkan "persiapan untuk kegagalan" dan memiliki rencana cadangan untuk merespons serangan secara efektif. Rencana pemulihan bencana yang tepat akan menggabungkan beberapa atau semua komponen berikut:

#### Peningkatan kontrak {#contract-upgrades}

Meskipun kontrak pintar Ethereum secara default tidak dapat diubah, dimungkinkan untuk mencapai tingkat mutabilitas tertentu dengan menggunakan pola peningkatan. Meningkatkan kontrak diperlukan dalam kasus di mana kelemahan kritis membuat kontrak lama Anda tidak dapat digunakan dan menyebarkan logika baru adalah opsi yang paling layak.

Mekanisme peningkatan kontrak bekerja secara berbeda, tetapi "pola proksi" adalah salah satu pendekatan yang lebih populer untuk meningkatkan kontrak pintar. [Pola proksi](https://www.cyfrin.io/blog/upgradeable-proxy-smart-contract-pattern) membagi state dan logika aplikasi di antara _dua_ kontrak. Kontrak pertama (disebut 'kontrak proksi') menyimpan variabel state (misalnya, saldo pengguna), sedangkan kontrak kedua (disebut 'kontrak logika') menyimpan kode untuk mengeksekusi fungsi kontrak.

Akun berinteraksi dengan kontrak proksi, yang mengirimkan semua panggilan fungsi ke kontrak logika menggunakan panggilan tingkat rendah [`delegatecall()`](https://docs.soliditylang.org/en/v0.8.16/introduction-to-smart-contracts.html?highlight=delegatecall#delegatecall-callcode-and-libraries). Tidak seperti panggilan pesan biasa, `delegatecall()` memastikan kode yang berjalan di alamat kontrak logika dieksekusi dalam konteks kontrak pemanggil. Ini berarti kontrak logika akan selalu menulis ke penyimpanan proksi (bukan penyimpanannya sendiri) dan nilai asli dari `msg.sender` serta `msg.value` tetap dipertahankan.

Mendelegasikan panggilan ke kontrak logika memerlukan penyimpanan alamatnya di penyimpanan kontrak proksi. Oleh karena itu, meningkatkan logika kontrak hanyalah masalah menyebarkan kontrak logika lain dan menyimpan alamat baru di kontrak proksi. Karena panggilan berikutnya ke kontrak proksi secara otomatis dirutekan ke kontrak logika baru, Anda akan "meningkatkan" kontrak tanpa benar-benar memodifikasi kodenya.

[Lebih lanjut tentang peningkatan kontrak](/developers/docs/smart-contracts/upgrading/).

#### Penghentian darurat {#emergency-stops}

Seperti yang disebutkan, audit dan pengujian ekstensif tidak mungkin menemukan semua bug dalam kontrak pintar. Jika kerentanan muncul dalam kode Anda setelah penyebaran, menambalnya tidak mungkin dilakukan karena Anda tidak dapat mengubah kode yang berjalan di alamat kontrak. Selain itu, mekanisme peningkatan (misalnya, pola proksi) mungkin memerlukan waktu untuk diterapkan (sering kali memerlukan persetujuan dari berbagai pihak), yang hanya memberi penyerang lebih banyak waktu untuk menyebabkan lebih banyak kerusakan.

Opsi terakhir adalah menerapkan fungsi "penghentian darurat" yang memblokir panggilan ke fungsi yang rentan dalam suatu kontrak. Penghentian darurat biasanya terdiri dari komponen-komponen berikut:

1. Variabel Boolean global yang menunjukkan apakah kontrak pintar dalam state berhenti atau tidak. Variabel ini diatur ke `false` saat menyiapkan kontrak, tetapi akan berubah menjadi `true` setelah kontrak dihentikan.

2. Fungsi yang mereferensikan variabel Boolean dalam eksekusinya. Fungsi tersebut dapat diakses saat kontrak pintar tidak dihentikan, dan menjadi tidak dapat diakses saat fitur penghentian darurat dipicu.

3. Entitas yang memiliki akses ke fungsi penghentian darurat, yang mengatur variabel Boolean ke `true`. Untuk mencegah tindakan berbahaya, panggilan ke fungsi ini dapat dibatasi pada alamat tepercaya (misalnya, pemilik kontrak).

Setelah kontrak mengaktifkan penghentian darurat, fungsi tertentu tidak akan dapat dipanggil. Hal ini dicapai dengan membungkus fungsi yang dipilih dalam pengubah yang mereferensikan variabel global. Di bawah ini adalah [contoh](https://github.com/fravoll/solidity-patterns/blob/master/EmergencyStop/EmergencyStop.sol) yang menjelaskan implementasi pola ini dalam kontrak:

```solidity
// Kode ini belum diaudit secara profesional dan tidak memberikan janji tentang keamanan atau kebenaran. Gunakan dengan risiko Anda sendiri.

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

Contoh ini menunjukkan fitur dasar dari penghentian darurat:

- `isStopped` adalah Boolean yang mengevaluasi ke `false` pada awalnya dan `true` saat kontrak memasuki mode darurat.

- Pengubah fungsi `onlyWhenStopped` dan `stoppedInEmergency` memeriksa variabel `isStopped`. `stoppedInEmergency` digunakan untuk mengontrol fungsi yang seharusnya tidak dapat diakses saat kontrak rentan (misalnya, `deposit()`). Panggilan ke fungsi-fungsi ini hanya akan dikembalikan (revert).

`onlyWhenStopped` digunakan untuk fungsi yang seharusnya dapat dipanggil selama keadaan darurat (misalnya, `emergencyWithdraw()`). Fungsi semacam itu dapat membantu menyelesaikan situasi, karenanya pengecualian mereka dari daftar "fungsi yang dibatasi".

Menggunakan fungsionalitas penghentian darurat memberikan solusi sementara yang efektif untuk menangani kerentanan serius dalam kontrak pintar Anda. Namun, hal ini meningkatkan kebutuhan pengguna untuk mempercayai pengembang agar tidak mengaktifkannya untuk alasan kepentingan pribadi. Untuk tujuan ini, mendesentralisasikan kontrol penghentian darurat baik dengan menundukkannya pada mekanisme pemungutan suara onchain, timelock, atau persetujuan dari dompet multisig adalah solusi yang memungkinkan.

#### Pemantauan peristiwa {#event-monitoring}

[Peristiwa](https://docs.soliditylang.org/en/v0.8.15/contracts.html#events) memungkinkan Anda melacak panggilan ke fungsi kontrak pintar dan memantau perubahan pada variabel state. Sangat ideal untuk memprogram kontrak pintar Anda agar memancarkan peristiwa setiap kali ada pihak yang mengambil tindakan kritis terhadap keamanan (misalnya, penarikan dana).

Mencatat peristiwa dan memantaunya secara offchain memberikan wawasan tentang operasi kontrak dan membantu penemuan tindakan berbahaya dengan lebih cepat. Ini berarti tim Anda dapat merespons peretasan dengan lebih cepat dan mengambil tindakan untuk memitigasi dampak pada pengguna, seperti menjeda fungsi atau melakukan peningkatan.

Anda juga dapat memilih alat pemantauan siap pakai yang secara otomatis meneruskan peringatan setiap kali seseorang berinteraksi dengan kontrak Anda. Alat-alat ini akan memungkinkan Anda membuat peringatan khusus berdasarkan pemicu yang berbeda, seperti volume transaksi, frekuensi panggilan fungsi, atau fungsi spesifik yang terlibat. Misalnya, Anda dapat memprogram peringatan yang masuk saat jumlah yang ditarik dalam satu transaksi melewati ambang batas tertentu.

### 7. Rancang sistem tata kelola yang aman {#design-secure-governance-systems}

Anda mungkin ingin mendesentralisasikan aplikasi Anda dengan menyerahkan kendali kontrak pintar inti kepada anggota komunitas. Dalam hal ini, sistem kontrak pintar akan mencakup modul tata kelola—sebuah mekanisme yang memungkinkan anggota komunitas untuk menyetujui tindakan administratif melalui sistem tata kelola onchain. Misalnya, proposal untuk meningkatkan kontrak proksi ke implementasi baru dapat dipilih oleh pemegang token.

Tata kelola terdesentralisasi dapat bermanfaat, terutama karena menyelaraskan kepentingan pengembang dan pengguna akhir. Namun demikian, mekanisme tata kelola kontrak pintar dapat menimbulkan risiko baru jika diterapkan secara tidak benar. Skenario yang masuk akal adalah jika penyerang memperoleh kekuatan suara yang sangat besar (diukur dalam jumlah token yang dimiliki) dengan mengambil [pinjaman kilat](/defi/#flash-loans) dan mendorong proposal berbahaya.

Salah satu cara untuk mencegah masalah terkait tata kelola onchain adalah dengan [menggunakan timelock](https://blog.openzeppelin.com/protect-your-users-with-smart-contract-timelocks/). Timelock mencegah kontrak pintar mengeksekusi tindakan tertentu hingga jumlah waktu tertentu berlalu. Strategi lain termasuk menetapkan "bobot suara" untuk setiap token berdasarkan berapa lama token tersebut telah dikunci, atau mengukur kekuatan suara dari suatu alamat pada periode historis (misalnya, 2-3 blok di masa lalu) alih-alih blok saat ini. Kedua metode tersebut mengurangi kemungkinan mengumpulkan kekuatan suara dengan cepat untuk memengaruhi suara onchain.

Lebih lanjut tentang [merancang sistem tata kelola yang aman](https://blog.openzeppelin.com/smart-contract-security-guidelines-4-strategies-for-safer-governance-systems/), [berbagai mekanisme pemungutan suara di DAO](https://hackernoon.com/governance-is-the-holy-grail-for-daos), dan [vektor serangan DAO umum yang memanfaatkan DeFi](https://dacian.me/dao-governance-defi-attacks) di tautan yang dibagikan.

### 8. Kurangi kompleksitas dalam kode seminimal mungkin {#reduce-code-complexity}

Pengembang perangkat lunak tradisional akrab dengan prinsip KISS ("keep it simple, stupid"), yang menyarankan untuk tidak memasukkan kompleksitas yang tidak perlu ke dalam desain perangkat lunak. Hal ini mengikuti pemikiran yang telah lama dipegang bahwa "sistem yang kompleks gagal dengan cara yang kompleks" dan lebih rentan terhadap kesalahan yang merugikan.

Menjaga segala sesuatunya tetap sederhana sangat penting saat menulis kontrak pintar, mengingat kontrak pintar berpotensi mengendalikan nilai dalam jumlah besar. Tip untuk mencapai kesederhanaan saat menulis kontrak pintar adalah menggunakan kembali pustaka yang ada, seperti [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/), jika memungkinkan. Karena pustaka ini telah diaudit dan diuji secara ekstensif oleh pengembang, menggunakannya akan mengurangi kemungkinan munculnya bug akibat menulis fungsionalitas baru dari awal.

Saran umum lainnya adalah menulis fungsi kecil dan menjaga kontrak tetap modular dengan membagi logika bisnis di beberapa kontrak. Menulis kode yang lebih sederhana tidak hanya mengurangi permukaan serangan dalam kontrak pintar, tetapi juga memudahkan untuk menalar kebenaran sistem secara keseluruhan dan mendeteksi kemungkinan kesalahan desain sejak dini.

### 9. Bertahan terhadap kerentanan kontrak pintar yang umum {#mitigate-common-smart-contract-vulnerabilities}

#### Reentransi {#reentrancy}

EVM tidak mengizinkan konkurensi, yang berarti dua kontrak yang terlibat dalam panggilan pesan tidak dapat berjalan secara bersamaan. Panggilan eksternal menjeda eksekusi dan memori kontrak pemanggil hingga panggilan kembali, di mana eksekusi dilanjutkan secara normal. Proses ini dapat secara formal digambarkan sebagai mentransfer [aliran kontrol](https://www.computerhope.com/jargon/c/contflow.htm) ke kontrak lain.

Meskipun sebagian besar tidak berbahaya, mentransfer aliran kontrol ke kontrak yang tidak tepercaya dapat menyebabkan masalah, seperti reentransi. Serangan reentransi terjadi ketika kontrak berbahaya memanggil kembali ke kontrak yang rentan sebelum pemanggilan fungsi asli selesai. Jenis serangan ini paling baik dijelaskan dengan sebuah contoh.

Pertimbangkan kontrak pintar sederhana ('Korban') yang memungkinkan siapa saja untuk menyetor dan melakukan penarikan ether:

```solidity
// Kontrak ini rentan. Jangan gunakan dalam produksi

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

Kontrak ini mengekspos fungsi `withdraw()` untuk memungkinkan pengguna menarik ETH yang sebelumnya disetorkan ke dalam kontrak. Saat memproses penarikan, kontrak melakukan operasi berikut:

1. Memeriksa saldo ETH pengguna
2. Mengirim dana ke alamat pemanggil
3. Mengatur ulang saldo mereka menjadi 0, mencegah penarikan tambahan dari pengguna

Fungsi `withdraw()` dalam kontrak `Victim` mengikuti pola "pemeriksaan-interaksi-efek" (checks-interactions-effects). Fungsi ini _memeriksa_ apakah kondisi yang diperlukan untuk eksekusi terpenuhi (yaitu, pengguna memiliki saldo ETH positif) dan melakukan _interaksi_ dengan mengirimkan ETH ke alamat pemanggil, sebelum menerapkan _efek_ dari transaksi (yaitu, mengurangi saldo pengguna).

Jika `withdraw()` dipanggil dari akun yang dimiliki secara eksternal (EOA), fungsi tersebut dieksekusi seperti yang diharapkan: `msg.sender.call.value()` mengirimkan ETH ke pemanggil. Namun, jika `msg.sender` adalah akun kontrak pintar yang memanggil `withdraw()`, mengirim dana menggunakan `msg.sender.call.value()` juga akan memicu kode yang disimpan di alamat tersebut untuk berjalan.

Bayangkan ini adalah kode yang disebarkan di alamat kontrak:

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

1. Menerima setoran dari akun lain (kemungkinan EOA penyerang)
2. Menyetorkan 1 ETH ke dalam kontrak Korban
3. Menarik 1 ETH yang disimpan dalam kontrak pintar

Tidak ada yang salah di sini, kecuali bahwa `Attacker` memiliki fungsi lain yang memanggil `withdraw()` di `Victim` lagi jika gas yang tersisa dari `msg.sender.call.value` yang masuk lebih dari 40.000. Hal ini memberi `Attacker` kemampuan untuk masuk kembali ke `Victim` dan menarik lebih banyak dana _sebelum_ pemanggilan pertama `withdraw` selesai. Siklusnya terlihat seperti ini:

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

Ringkasannya adalah karena saldo pemanggil tidak diatur ke 0 hingga eksekusi fungsi selesai, pemanggilan berikutnya akan berhasil dan memungkinkan pemanggil untuk menarik saldo mereka beberapa kali. Jenis serangan ini dapat digunakan untuk menguras dana kontrak pintar, seperti yang terjadi pada [peretasan DAO tahun 2016](https://www.coindesk.com/learn/understanding-the-dao-attack). Serangan reentransi masih menjadi masalah kritis untuk kontrak pintar saat ini seperti yang ditunjukkan oleh [daftar publik eksploitasi reentransi](https://github.com/pcaversaccio/reentrancy-attacks).

##### Cara mencegah serangan reentransi
Pendekatan untuk menangani reentransi adalah mengikuti [pola pemeriksaan-efek-interaksi](https://docs.soliditylang.org/en/develop/security-considerations.html#use-the-checks-effects-interactions-pattern). Pola ini mengurutkan eksekusi fungsi sedemikian rupa sehingga kode yang melakukan pemeriksaan yang diperlukan sebelum melanjutkan eksekusi didahulukan, diikuti oleh kode yang memanipulasi state kontrak, dengan kode yang berinteraksi dengan kontrak lain atau EOA berada di urutan terakhir.

Pola pemeriksaan-efek-interaksi digunakan dalam versi revisi dari kontrak `Victim` yang ditunjukkan di bawah ini:

```solidity
contract NoLongerAVictim {
    function withdraw() external {
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
    }
}
```

Kontrak ini melakukan _pemeriksaan_ pada saldo pengguna, menerapkan _efek_ dari fungsi `withdraw()` (dengan mengatur ulang saldo pengguna menjadi 0), dan melanjutkan untuk melakukan _interaksi_ (mengirim ETH ke alamat pengguna). Hal ini memastikan kontrak memperbarui penyimpanannya sebelum panggilan eksternal, menghilangkan kondisi reentransi yang memungkinkan serangan pertama. Kontrak `Attacker` masih dapat memanggil kembali ke `NoLongerAVictim`, tetapi karena `balances[msg.sender]` telah diatur ke 0, penarikan tambahan akan memunculkan kesalahan.

Opsi lain adalah menggunakan kunci pengecualian bersama (biasanya digambarkan sebagai "mutex") yang mengunci sebagian state kontrak hingga pemanggilan fungsi selesai. Hal ini diimplementasikan menggunakan variabel Boolean yang diatur ke `true` sebelum fungsi dieksekusi dan kembali ke `false` setelah pemanggilan selesai. Seperti yang terlihat pada contoh di bawah ini, menggunakan mutex melindungi fungsi dari panggilan rekursif saat pemanggilan asli masih diproses, yang secara efektif menghentikan reentransi.

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
    // Fungsi ini dilindungi oleh mutex, sehingga panggilan reentransi dari dalam `msg.sender.call` tidak dapat memanggil `withdraw` lagi.
    //  Pernyataan `return` dievaluasi menjadi `true` tetapi tetap mengevaluasi pernyataan `locked = false` di dalam modifier
    function withdraw(uint _amount) public payable noReentrancy returns(bool) {
        require(balances[msg.sender] >= _amount, "No balance to withdraw.");

        balances[msg.sender] -= _amount;
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success);

        return true;
    }
}
```

Anda juga dapat menggunakan sistem [pembayaran tarik (pull payments)](https://docs.openzeppelin.com/contracts/5.x/api/utils#security#PullPayment) yang mengharuskan pengguna untuk menarik dana dari kontrak pintar, alih-alih sistem "pembayaran dorong (push payments)" yang mengirimkan dana ke akun. Hal ini menghilangkan kemungkinan memicu kode secara tidak sengaja di alamat yang tidak diketahui (dan juga dapat mencegah serangan penolakan layanan (denial-of-service) tertentu).

#### Limpahan bawah (underflow) dan limpahan (overflow) bilangan bulat {#integer-underflows-and-overflows}

Limpahan bilangan bulat terjadi ketika hasil operasi aritmatika berada di luar rentang nilai yang dapat diterima, menyebabkannya "bergulir" ke nilai terendah yang dapat direpresentasikan. Misalnya, `uint8` hanya dapat menyimpan nilai hingga 2^8-1=255. Operasi aritmatika yang menghasilkan nilai lebih tinggi dari `255` akan melimpah dan mengatur ulang `uint` menjadi `0`, mirip dengan bagaimana odometer pada mobil diatur ulang ke 0 setelah mencapai jarak tempuh maksimum (999999).

Limpahan bawah bilangan bulat terjadi karena alasan yang sama: hasil operasi aritmatika berada di bawah rentang yang dapat diterima. Katakanlah Anda mencoba mengurangi `0` dalam `uint8`, hasilnya akan bergulir ke nilai maksimum yang dapat direpresentasikan (`255`).

Baik limpahan maupun limpahan bawah bilangan bulat dapat menyebabkan perubahan tak terduga pada variabel state kontrak dan mengakibatkan eksekusi yang tidak direncanakan. Di bawah ini adalah contoh yang menunjukkan bagaimana penyerang dapat mengeksploitasi limpahan aritmatika dalam kontrak pintar untuk melakukan operasi yang tidak valid:

```
pragma solidity ^0.7.6;

// Kontrak ini dirancang untuk bertindak sebagai brankas waktu.
// Pengguna dapat menyetor ke dalam kontrak ini tetapi tidak dapat menariknya setidaknya selama seminggu.
// Pengguna juga dapat memperpanjang waktu tunggu melampaui masa tunggu 1 minggu.

/*
1. Sebarkan TimeLock
2. Sebarkan Attack dengan alamat TimeLock
3. Panggil Attack.attack dengan mengirimkan 1 ether. Anda akan segera dapat
   menarik ether Anda.

Apa yang terjadi?
Attack menyebabkan TimeLock.lockTime melimpah (overflow) dan dapat menarik
sebelum masa tunggu 1 minggu.
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

##### Cara mencegah limpahan bawah dan limpahan bilangan bulat
Mulai versi 0.8.0, kompiler Solidity menolak kode yang menghasilkan limpahan bawah dan limpahan bilangan bulat. Namun, kontrak yang dikompilasi dengan versi kompiler yang lebih rendah harus melakukan pemeriksaan pada fungsi yang melibatkan operasi aritmatika atau menggunakan pustaka (misalnya, [SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math)) yang memeriksa limpahan bawah/limpahan.

#### Manipulasi orakel {#oracle-manipulation}

[Orakel](/developers/docs/oracles/) mengambil informasi offchain dan mengirimkannya secara onchain untuk digunakan oleh kontrak pintar. Dengan orakel, Anda dapat merancang kontrak pintar yang beroperasi dengan sistem offchain, seperti pasar modal, yang sangat memperluas aplikasinya.

Namun jika orakel rusak dan mengirimkan informasi yang salah secara onchain, kontrak pintar akan dieksekusi berdasarkan input yang salah, yang dapat menyebabkan masalah. Ini adalah dasar dari "masalah oracle", yang berkaitan dengan tugas memastikan informasi dari oracle blockchain akurat, mutakhir, dan tepat waktu.

Masalah keamanan terkait adalah menggunakan orakel onchain, seperti bursa terdesentralisasi, untuk mendapatkan harga spot suatu aset. Platform peminjaman di industri [keuangan terdesentralisasi (DeFi)](/defi/) sering melakukan ini untuk menentukan nilai kolateral pengguna guna menentukan berapa banyak yang dapat mereka pinjam.

Harga DEX sering kali akurat, sebagian besar karena pelaku arbitrase memulihkan paritas di pasar. Namun, harga tersebut terbuka terhadap manipulasi, terutama jika orakel onchain menghitung harga aset berdasarkan pola perdagangan historis (seperti yang biasanya terjadi).

Misalnya, penyerang dapat secara artifisial memompa harga spot suatu aset dengan mengambil pinjaman kilat tepat sebelum berinteraksi dengan kontrak peminjaman Anda. Meminta harga aset ke DEX akan mengembalikan nilai yang lebih tinggi dari biasanya (karena "pesanan beli" penyerang yang besar memiringkan permintaan aset), memungkinkan mereka untuk meminjam lebih dari yang seharusnya. "Serangan pinjaman kilat" semacam itu telah digunakan untuk mengeksploitasi ketergantungan pada orakel harga di antara aplikasi DeFi, yang merugikan protokol hingga jutaan dana yang hilang.

##### Cara mencegah manipulasi orakel
Persyaratan minimum untuk [menghindari manipulasi orakel](https://www.cyfrin.io/blog/price-oracle-manipultion-attacks-with-examples) adalah menggunakan jaringan orakel terdesentralisasi yang meminta informasi dari berbagai sumber untuk menghindari titik kegagalan tunggal. Dalam kebanyakan kasus, orakel terdesentralisasi memiliki insentif kriptoekonomi bawaan untuk mendorong node orakel melaporkan informasi yang benar, menjadikannya lebih aman daripada orakel terpusat.

Jika Anda berencana untuk meminta harga aset ke orakel onchain, pertimbangkan untuk menggunakan orakel yang menerapkan mekanisme harga rata-rata tertimbang waktu (TWAP). [Orakel TWAP](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) meminta harga aset pada dua titik waktu yang berbeda (yang dapat Anda modifikasi) dan menghitung harga spot berdasarkan rata-rata yang diperoleh. Memilih periode waktu yang lebih lama melindungi protokol Anda dari manipulasi harga karena pesanan besar yang dieksekusi baru-baru ini tidak dapat memengaruhi harga aset.

## Sumber daya keamanan kontrak pintar untuk pengembang {#smart-contract-security-resources-for-developers}

### Alat untuk menganalisis kontrak pintar dan memverifikasi kebenaran kode {#code-analysis-tools}

- **[Alat pengujian dan pustaka](/developers/docs/smart-contracts/testing/#testing-tools-and-libraries)** - _Koleksi alat dan pustaka standar industri untuk melakukan pengujian unit, analisis statis, dan analisis dinamis pada kontrak pintar._

- **[Alat verifikasi formal](/developers/docs/smart-contracts/formal-verification/#formal-verification-tools)** - _Alat untuk memverifikasi kebenaran fungsional dalam kontrak pintar dan memeriksa invarian._

- **[Layanan audit kontrak pintar](/developers/docs/smart-contracts/testing/#smart-contract-auditing-services)** - _Daftar organisasi yang menyediakan layanan audit kontrak pintar untuk proyek pengembangan Ethereum._

- **[Platform bug bounty](/developers/docs/smart-contracts/testing/#bug-bounty-platforms)** - _Platform untuk mengoordinasikan bug bounty dan memberikan imbalan atas pengungkapan kerentanan kritis yang bertanggung jawab dalam kontrak pintar._

- **[Fork Checker](https://forkchecker.hashex.org/)** - _Alat daring gratis untuk memeriksa semua informasi yang tersedia mengenai kontrak percabangan._

- **[ABI Encoder](https://abi.hashex.org/)** - _Layanan daring gratis untuk mengenkode fungsi kontrak Solidity dan argumen konstruktor Anda._

- **[Aderyn](https://github.com/Cyfrin/aderyn)** - _Penganalisis Statis Solidity, melintasi Abstract Syntax Trees (AST) untuk menunjukkan dengan tepat dugaan kerentanan dan mencetak masalah dalam format markdown yang mudah dipahami._

### Alat untuk memantau kontrak pintar {#smart-contract-monitoring-tools}

- **[Tenderly Real-Time Alerting](https://tenderly.co/monitoring)** - _Alat untuk mendapatkan notifikasi waktu nyata ketika peristiwa yang tidak biasa atau tidak terduga terjadi pada kontrak pintar atau dompet Anda._

### Alat untuk administrasi kontrak pintar yang aman {#smart-contract-administration-tools}

- **[Safe](https://safe.global/)** - _Dompet kontrak pintar yang berjalan di Ethereum yang mewajibkan jumlah minimum orang untuk menyetujui transaksi sebelum dapat terjadi (M-of-N)._

- **[OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/)** - _Pustaka kontrak untuk mengimplementasikan fitur administratif, termasuk kepemilikan kontrak, peningkatan, kontrol akses, tata kelola, kemampuan jeda, dan banyak lagi._

### Layanan audit kontrak pintar {#smart-contract-auditing-services}

- **[ConsenSys Diligence](https://diligence.consensys.io/)** - _Layanan audit kontrak pintar yang membantu proyek di seluruh ekosistem rantai blok memastikan protokol mereka siap diluncurkan dan dibangun untuk melindungi pengguna._

- **[CertiK](https://www.certik.com/)** - _Perusahaan keamanan rantai blok yang memelopori penggunaan teknologi verifikasi formal mutakhir pada kontrak pintar dan jaringan rantai blok._

- **[Trail of Bits](https://www.trailofbits.com/)** - _Perusahaan keamanan siber yang menggabungkan penelitian keamanan dengan mentalitas penyerang untuk mengurangi risiko dan memperkuat kode._

- **[PeckShield](https://peckshield.com/)** - _Perusahaan keamanan rantai blok yang menawarkan produk dan layanan untuk keamanan, privasi, dan kegunaan seluruh ekosistem rantai blok._

- **[QuantStamp](https://quantstamp.com/)** - _Layanan audit yang memfasilitasi adopsi arus utama teknologi rantai blok melalui layanan penilaian keamanan dan risiko._

- **[OpenZeppelin](https://www.openzeppelin.com/security-audits)** - _Perusahaan keamanan kontrak pintar yang menyediakan audit keamanan untuk sistem terdistribusi._

- **[Runtime Verification](https://runtimeverification.com/)** - _Perusahaan keamanan yang berspesialisasi dalam pemodelan dan verifikasi formal kontrak pintar._

- **[Hacken](https://hacken.io)** - _Auditor keamanan siber Web3 yang menghadirkan pendekatan 360 derajat terhadap keamanan rantai blok._

- **[Nethermind](https://www.nethermind.io/smart-contract-audits)** - _Layanan audit Solidity dan Cairo, memastikan integritas kontrak pintar dan keselamatan pengguna di seluruh Ethereum dan Starknet._

- **[HashEx](https://hashex.org/)** - _HashEx berfokus pada audit rantai blok dan kontrak pintar untuk memastikan keamanan mata uang kripto, menyediakan layanan seperti pengembangan kontrak pintar, pengujian penetrasi, dan konsultasi rantai blok._

- **[Code4rena](https://code4rena.com/)** - _Platform audit kompetitif yang memberikan insentif kepada pakar keamanan kontrak pintar untuk menemukan kerentanan dan membantu membuat Web3 lebih aman._

- **[CodeHawks](https://codehawks.com/)** - _Platform audit kompetitif yang menyelenggarakan kompetisi audit kontrak pintar untuk peneliti keamanan._

- **[Cyfrin](https://cyfrin.io)** - _Pusat keamanan Web3, menginkubasi keamanan kripto melalui produk dan layanan audit kontrak pintar._

- **[ImmuneBytes](https://immunebytes.com/smart-contract-audit/)** - _Firma keamanan Web3 yang menawarkan audit keamanan untuk sistem rantai blok melalui tim auditor berpengalaman dan alat terbaik di kelasnya._

- **[Oxorio](https://oxor.io/)** - _Audit kontrak pintar dan layanan keamanan rantai blok dengan keahlian dalam EVM, Solidity, ZK, teknologi lintas rantai untuk perusahaan kripto dan proyek DeFi._

- **[Inference](https://inference.ag/)** - _Perusahaan audit keamanan, berspesialisasi dalam audit kontrak pintar untuk rantai blok berbasis EVM. Berkat auditor ahlinya, mereka mengidentifikasi potensi masalah dan menyarankan solusi yang dapat ditindaklanjuti untuk memperbaikinya sebelum penyebaran._

### Platform bug bounty {#bug-bounty-platforms}

- **[Immunefi](https://immunefi.com/)** - _Platform bug bounty untuk kontrak pintar dan proyek DeFi, tempat peneliti keamanan meninjau kode, mengungkapkan kerentanan, mendapatkan bayaran, dan membuat kripto lebih aman._

- **[HackerOne](https://www.hackerone.com/)** - _Platform koordinasi kerentanan dan bug bounty yang menghubungkan bisnis dengan penguji penetrasi dan peneliti keamanan siber._

- **[HackenProof](https://hackenproof.com/)** - _Platform bug bounty ahli untuk proyek kripto (DeFi, Kontrak Pintar, Dompet, CEX, dan lainnya), tempat profesional keamanan menyediakan layanan triase dan peneliti mendapatkan bayaran untuk laporan bug yang relevan dan terverifikasi._

-  **[Sherlock](https://www.sherlock.xyz/)** - _Penjamin emisi di Web3 untuk keamanan kontrak pintar, dengan pembayaran untuk auditor yang dikelola melalui kontrak pintar untuk memastikan bahwa bug yang relevan dibayar secara adil._

-  **[CodeHawks](https://www.codehawks.com/)** - _Platform bug bounty kompetitif tempat auditor mengambil bagian dalam kontes dan tantangan keamanan, dan (segera) dalam audit pribadi mereka sendiri._

### Publikasi kerentanan dan eksploitasi kontrak pintar yang diketahui {#common-smart-contract-vulnerabilities-and-exploits}

- **[ConsenSys: Serangan Kontrak Pintar yang Diketahui](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/)** - _Penjelasan ramah pemula tentang kerentanan kontrak yang paling signifikan, dengan kode sampel untuk sebagian besar kasus._

- **[SWC Registry](https://swcregistry.io/)** - _Daftar kurasi item Common Weakness Enumeration (CWE) yang berlaku untuk kontrak pintar Ethereum._

- **[Rekt](https://rekt.news/)** - _Publikasi yang diperbarui secara berkala tentang peretasan dan eksploitasi kripto tingkat tinggi, beserta laporan post-mortem yang terperinci._

### Tantangan untuk mempelajari keamanan kontrak pintar {#challenges-for-learning-smart-contract-security}

- **[Awesome BlockSec CTF](https://github.com/blockthreat/blocksec-ctfs)** - _Daftar kurasi wargame keamanan rantai blok, tantangan, dan kompetisi [Capture The Flag](https://www.webopedia.com/definitions/ctf-event/amp/) serta tulisan solusinya._

- **[Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz/)** - _Wargame untuk mempelajari keamanan ofensif kontrak pintar DeFi dan membangun keterampilan dalam pencarian bug dan audit keamanan._

- **[Ethernaut](https://ethernaut.openzeppelin.com/)** - _Wargame berbasis Web3/Solidity di mana setiap level adalah kontrak pintar yang perlu 'diretas'._

- **[HackenProof x HackTheBox](https://app.hackthebox.com/tracks/HackenProof-Track)** - _Tantangan peretasan kontrak pintar, berlatar petualangan fantasi. Penyelesaian tantangan yang berhasil juga memberikan akses ke program bug bounty pribadi._

### Praktik terbaik untuk mengamankan kontrak pintar {#smart-contract-security-best-practices}

- **[ConsenSys: Praktik Terbaik Keamanan Kontrak Pintar Ethereum](https://consensys.github.io/smart-contract-best-practices/)** - _Daftar panduan komprehensif untuk mengamankan kontrak pintar Ethereum._

- **[Nascent: Simple Security Toolkit](https://github.com/nascentxyz/simple-security-toolkit)** - _Koleksi panduan dan daftar periksa praktis yang berfokus pada keamanan untuk pengembangan kontrak pintar._

- **[Solidity Patterns](https://fravoll.github.io/solidity-patterns/)** - _Kompilasi pola aman dan praktik terbaik yang berguna untuk bahasa pemrograman kontrak pintar Solidity._

- **[Dokumentasi Solidity: Pertimbangan Keamanan](https://docs.soliditylang.org/en/v0.8.16/security-considerations.html)** - _Panduan untuk menulis kontrak pintar yang aman dengan Solidity._

- **[Standar Verifikasi Keamanan Kontrak Pintar](https://github.com/securing/SCSVS)** - _Daftar periksa empat belas bagian yang dibuat untuk menstandarkan keamanan kontrak pintar bagi pengembang, arsitek, peninjau keamanan, dan vendor._

- **[Pelajari Keamanan dan Audit Kontrak Pintar](https://updraft.cyfrin.io/courses/security)** - _Kursus keamanan dan audit kontrak pintar terbaik, dibuat untuk pengembang kontrak pintar yang ingin meningkatkan praktik terbaik keamanan mereka dan menjadi peneliti keamanan._

### Tutorial tentang keamanan kontrak pintar {#tutorials-on-smart-contract-security}

- [Cara menulis kontrak pintar yang aman](/developers/tutorials/secure-development-workflow/)

- [Cara menggunakan Slither untuk menemukan bug kontrak pintar](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

- [Cara menggunakan Manticore untuk menemukan bug kontrak pintar](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)

- [Panduan keamanan kontrak pintar](/developers/tutorials/smart-contract-security-guidelines/)

- [Cara mengintegrasikan kontrak token Anda dengan aman dengan token arbitrer](/developers/tutorials/token-integration-checklist/)

- [Cyfrin Updraft - Kursus lengkap keamanan dan audit kontrak pintar](https://updraft.cyfrin.io/courses/security)