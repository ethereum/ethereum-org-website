---
title: Verifikasi formal kontrak pintar
description: Tinjauan tentang verifikasi formal untuk kontrak pintar Ethereum
lang: id
---

[Kontrak pintar](/developers/docs/smart-contracts/) memungkinkan pembuatan aplikasi yang terdesentralisasi, tanpa kepercayaan (trustless), dan tangguh yang memperkenalkan kasus penggunaan baru dan membuka nilai bagi pengguna. Karena kontrak pintar menangani nilai dalam jumlah besar, keamanan menjadi pertimbangan penting bagi pengembang.

Verifikasi formal adalah salah satu teknik yang direkomendasikan untuk meningkatkan [keamanan kontrak pintar](/developers/docs/smart-contracts/security/). Verifikasi formal, yang menggunakan [metode formal](https://www.brookings.edu/techstream/formal-methods-as-a-path-toward-better-cybersecurity/) untuk menentukan, merancang, dan memverifikasi program, telah digunakan selama bertahun-tahun untuk memastikan kebenaran sistem perangkat keras dan perangkat lunak yang kritis.

Ketika diimplementasikan dalam kontrak pintar, verifikasi formal dapat membuktikan bahwa logika bisnis kontrak memenuhi spesifikasi yang telah ditentukan sebelumnya. Dibandingkan dengan metode lain untuk menilai kebenaran kode kontrak, seperti pengujian, verifikasi formal memberikan jaminan yang lebih kuat bahwa kontrak pintar secara fungsional benar.

## Apa itu verifikasi formal? {#what-is-formal-verification}

Verifikasi formal mengacu pada proses mengevaluasi kebenaran suatu sistem sehubungan dengan spesifikasi formal. Secara lebih sederhana, verifikasi formal memungkinkan kita untuk memeriksa apakah perilaku suatu sistem memenuhi beberapa persyaratan (yaitu, sistem tersebut melakukan apa yang kita inginkan).

Perilaku yang diharapkan dari sistem (kontrak pintar dalam hal ini) dijelaskan menggunakan pemodelan formal, sementara bahasa spesifikasi memungkinkan pembuatan properti formal. Teknik verifikasi formal kemudian dapat memverifikasi bahwa implementasi kontrak mematuhi spesifikasinya dan memperoleh bukti matematis dari kebenaran implementasi tersebut. Ketika sebuah kontrak memenuhi spesifikasinya, kontrak tersebut digambarkan sebagai "benar secara fungsional", "benar berdasarkan desain", atau "benar berdasarkan konstruksi".

### Apa itu model formal? {#what-is-a-formal-model}

Dalam ilmu komputer, [model formal](https://en.wikipedia.org/wiki/Model_of_computation) adalah deskripsi matematis dari proses komputasi. Program diabstraksikan menjadi fungsi matematika (persamaan), dengan model yang menjelaskan bagaimana keluaran ke fungsi dihitung berdasarkan masukan.

Model formal memberikan tingkat abstraksi di mana analisis perilaku program dapat dievaluasi. Keberadaan model formal memungkinkan pembuatan _spesifikasi formal_, yang menjelaskan properti yang diinginkan dari model yang bersangkutan.

Berbagai teknik digunakan untuk memodelkan kontrak pintar untuk verifikasi formal. Misalnya, beberapa model digunakan untuk menalar perilaku tingkat tinggi dari kontrak pintar. Teknik pemodelan ini menerapkan pandangan kotak hitam (black-box) pada kontrak pintar, memandangnya sebagai sistem yang menerima masukan dan mengeksekusi komputasi berdasarkan masukan tersebut.

Model tingkat tinggi berfokus pada hubungan antara kontrak pintar dan agen eksternal, seperti akun yang dimiliki secara eksternal (EOA), akun kontrak, dan lingkungan blockchain. Model semacam itu berguna untuk mendefinisikan properti yang menentukan bagaimana kontrak harus berperilaku sebagai respons terhadap interaksi pengguna tertentu.

Sebaliknya, model formal lainnya berfokus pada perilaku tingkat rendah dari kontrak pintar. Meskipun model tingkat tinggi dapat membantu menalar fungsionalitas kontrak, model tersebut mungkin gagal menangkap detail tentang cara kerja internal dari implementasi. Model tingkat rendah menerapkan pandangan kotak putih (white-box) pada analisis program dan mengandalkan representasi tingkat rendah dari aplikasi kontrak pintar, seperti jejak program dan [grafik aliran kontrol](https://en.wikipedia.org/wiki/Control-flow_graph), untuk menalar properti yang relevan dengan eksekusi kontrak.

Model tingkat rendah dianggap ideal karena mewakili eksekusi aktual dari kontrak pintar di lingkungan eksekusi Ethereum (yaitu, [EVM](/developers/docs/evm/)). Teknik pemodelan tingkat rendah sangat berguna dalam menetapkan properti keamanan kritis dalam kontrak pintar dan mendeteksi potensi kerentanan.

### Apa itu spesifikasi formal? {#what-is-a-formal-specification}

Spesifikasi hanyalah persyaratan teknis yang harus dipenuhi oleh sistem tertentu. Dalam pemrograman, spesifikasi mewakili ide umum tentang eksekusi program (yaitu, apa yang seharusnya dilakukan program).

Dalam konteks kontrak pintar, spesifikasi formal mengacu pada _properti_—deskripsi formal dari persyaratan yang harus dipenuhi oleh kontrak. Properti semacam itu digambarkan sebagai "invarian" dan mewakili pernyataan logis tentang eksekusi kontrak yang harus tetap benar dalam setiap keadaan yang mungkin, tanpa pengecualian apa pun.

Dengan demikian, kita dapat menganggap spesifikasi formal sebagai kumpulan pernyataan yang ditulis dalam bahasa formal yang menggambarkan eksekusi yang dimaksudkan dari kontrak pintar. Spesifikasi mencakup properti kontrak dan menentukan bagaimana kontrak harus berperilaku dalam keadaan yang berbeda. Tujuan verifikasi formal adalah untuk menentukan apakah kontrak pintar memiliki properti ini (invarian) dan bahwa properti ini tidak dilanggar selama eksekusi.

Spesifikasi formal sangat penting dalam mengembangkan implementasi kontrak pintar yang aman. Kontrak yang gagal mengimplementasikan invarian atau propertinya dilanggar selama eksekusi rentan terhadap kerentanan yang dapat merusak fungsionalitas atau menyebabkan eksploitasi berbahaya.

## Jenis spesifikasi formal untuk kontrak pintar {#formal-specifications-for-smart-contracts}

Spesifikasi formal memungkinkan penalaran matematis tentang kebenaran eksekusi program. Seperti halnya model formal, spesifikasi formal dapat menangkap properti tingkat tinggi atau perilaku tingkat rendah dari implementasi kontrak.

Spesifikasi formal diturunkan menggunakan elemen [logika program](https://en.wikipedia.org/wiki/Logic_programming), yang memungkinkan penalaran formal tentang properti suatu program. Logika program memiliki aturan formal yang mengekspresikan (dalam bahasa matematika) perilaku yang diharapkan dari suatu program. Berbagai logika program digunakan dalam membuat spesifikasi formal, termasuk [logika keterjangkauan (reachability logic)](https://en.wikipedia.org/wiki/Reachability_problem), [logika temporal](https://en.wikipedia.org/wiki/Temporal_logic), dan [logika Hoare](https://en.wikipedia.org/wiki/Hoare_logic).

Spesifikasi formal untuk kontrak pintar dapat diklasifikasikan secara luas sebagai spesifikasi **tingkat tinggi** atau **tingkat rendah**. Terlepas dari kategori mana spesifikasi tersebut berada, spesifikasi tersebut harus secara memadai dan tidak ambigu menggambarkan properti sistem yang sedang dianalisis.

### Spesifikasi tingkat tinggi {#high-level-specifications}

Seperti namanya, spesifikasi tingkat tinggi (juga disebut "spesifikasi berorientasi model") menggambarkan perilaku tingkat tinggi dari suatu program. Spesifikasi tingkat tinggi memodelkan kontrak pintar sebagai [mesin status terbatas (finite state machine)](https://en.wikipedia.org/wiki/Finite-state_machine) (FSM), yang dapat bertransisi antar status dengan melakukan operasi, dengan logika temporal yang digunakan untuk mendefinisikan properti formal untuk model FSM.

[Logika temporal](https://en.wikipedia.org/wiki/Temporal_logic) adalah "aturan untuk menalar proposisi yang dikualifikasikan dalam hal waktu (misalnya, "Saya _selalu_ lapar" atau "Saya _pada akhirnya_ akan lapar")." Ketika diterapkan pada verifikasi formal, logika temporal digunakan untuk menyatakan asersi tentang perilaku yang benar dari sistem yang dimodelkan sebagai mesin status. Secara khusus, logika temporal menggambarkan status masa depan yang dapat dialami oleh kontrak pintar dan bagaimana kontrak tersebut bertransisi antar status.

Spesifikasi tingkat tinggi umumnya menangkap dua properti temporal kritis untuk kontrak pintar: **keamanan (safety)** dan **kehidupan (liveness)**. Properti keamanan mewakili gagasan bahwa "tidak ada hal buruk yang pernah terjadi" dan biasanya mengekspresikan invariansi. Properti keamanan dapat mendefinisikan persyaratan perangkat lunak umum, seperti kebebasan dari [kebuntuan (deadlock)](https://www.techtarget.com/whatis/definition/deadlock), atau mengekspresikan properti khusus domain untuk kontrak (misalnya, invarian pada kontrol akses untuk fungsi, nilai variabel status yang dapat diterima, atau kondisi untuk transfer token).

Ambil contoh persyaratan keamanan ini yang mencakup kondisi untuk menggunakan `transfer()` atau `transferFrom()` dalam kontrak token ERC-20: _"Saldo pengirim tidak pernah lebih rendah dari jumlah token yang diminta untuk dikirim."_. Deskripsi bahasa alami dari invarian kontrak ini dapat diterjemahkan ke dalam spesifikasi formal (matematis), yang kemudian dapat diperiksa validitasnya secara ketat.

Properti kehidupan menegaskan bahwa "sesuatu yang baik pada akhirnya terjadi" dan berkaitan dengan kemampuan kontrak untuk maju melalui status yang berbeda. Contoh properti kehidupan adalah "likuiditas", yang mengacu pada kemampuan kontrak untuk mentransfer saldonya kepada pengguna berdasarkan permintaan. Jika properti ini dilanggar, pengguna tidak akan dapat menarik aset yang disimpan dalam kontrak, seperti yang terjadi pada [insiden dompet Parity](https://www.cnbc.com/2017/11/08/accidental-bug-may-have-frozen-280-worth-of-ether-on-parity-wallet.html).

### Spesifikasi tingkat rendah {#low-level-specifications}

Spesifikasi tingkat tinggi mengambil model status terbatas dari kontrak sebagai titik awal dan mendefinisikan properti yang diinginkan dari model ini. Sebaliknya, spesifikasi tingkat rendah (juga disebut "spesifikasi berorientasi properti") sering memodelkan program (kontrak pintar) sebagai sistem yang terdiri dari kumpulan fungsi matematika dan menggambarkan perilaku yang benar dari sistem tersebut.

Secara lebih sederhana, spesifikasi tingkat rendah menganalisis _jejak program_ dan mencoba mendefinisikan properti kontrak pintar atas jejak ini. Jejak mengacu pada urutan eksekusi fungsi yang mengubah status kontrak pintar; oleh karena itu, spesifikasi tingkat rendah membantu menentukan persyaratan untuk eksekusi internal kontrak.

Spesifikasi formal tingkat rendah dapat diberikan sebagai properti bergaya Hoare atau invarian pada jalur eksekusi.

### Properti bergaya Hoare {#hoare-style-properties}

[Logika Hoare](https://en.wikipedia.org/wiki/Hoare_logic) menyediakan seperangkat aturan formal untuk menalar kebenaran program, termasuk kontrak pintar. Properti bergaya Hoare diwakili oleh tripel Hoare `{P}c{Q}`, di mana `c` adalah program dan `P` serta `Q` adalah predikat pada status `c` (yaitu, program), yang secara formal digambarkan masing-masing sebagai _prakondisi_ dan _pascakondisi_.

Prakondisi adalah predikat yang menggambarkan kondisi yang diperlukan untuk eksekusi fungsi yang benar; pengguna yang memanggil kontrak harus memenuhi persyaratan ini. Pascakondisi adalah predikat yang menggambarkan kondisi yang ditetapkan oleh fungsi jika dieksekusi dengan benar; pengguna dapat mengharapkan kondisi ini menjadi benar setelah memanggil fungsi tersebut. Sebuah _invarian_ dalam logika Hoare adalah predikat yang dipertahankan oleh eksekusi suatu fungsi (yaitu, tidak berubah).

Spesifikasi bergaya Hoare dapat menjamin _kebenaran parsial_ atau _kebenaran total_. Implementasi fungsi kontrak "benar secara parsial" jika prakondisi berlaku benar sebelum fungsi dieksekusi, dan jika eksekusi berakhir, pascakondisi juga benar. Bukti kebenaran total diperoleh jika prakondisi benar sebelum fungsi dieksekusi, eksekusi dijamin akan berakhir dan ketika itu terjadi, pascakondisi berlaku benar.

Memperoleh bukti kebenaran total itu sulit karena beberapa eksekusi mungkin tertunda sebelum berakhir, atau tidak pernah berakhir sama sekali. Meskipun demikian, pertanyaan apakah eksekusi berakhir bisa dibilang merupakan poin yang dapat diperdebatkan karena mekanisme gas Ethereum mencegah perulangan program yang tak terbatas (eksekusi berakhir dengan sukses atau berakhir karena kesalahan 'kehabisan gas').

Spesifikasi kontrak pintar yang dibuat menggunakan logika Hoare akan memiliki prakondisi, pascakondisi, dan invarian yang ditentukan untuk eksekusi fungsi dan perulangan dalam kontrak. Prakondisi sering kali mencakup kemungkinan masukan yang salah ke suatu fungsi, dengan pascakondisi yang menggambarkan respons yang diharapkan terhadap masukan tersebut (misalnya, memunculkan pengecualian tertentu). Dengan cara ini, properti bergaya Hoare efektif untuk memastikan kebenaran implementasi kontrak.

Banyak kerangka kerja verifikasi formal menggunakan spesifikasi bergaya Hoare untuk membuktikan kebenaran semantik fungsi. Dimungkinkan juga untuk menambahkan properti bergaya Hoare (sebagai asersi) secara langsung ke kode kontrak dengan menggunakan pernyataan `require` dan `assert` di Solidity.

Pernyataan `require` mengekspresikan prakondisi atau invarian dan sering digunakan untuk memvalidasi masukan pengguna, sementara `assert` menangkap pascakondisi yang diperlukan untuk keamanan. Misalnya, kontrol akses yang tepat untuk fungsi (contoh properti keamanan) dapat dicapai menggunakan `require` sebagai pemeriksaan prakondisi pada identitas akun pemanggil. Demikian pula, invarian pada nilai variabel status yang diizinkan dalam kontrak (misalnya, jumlah total token yang beredar) dapat dilindungi dari pelanggaran dengan menggunakan `assert` untuk mengonfirmasi status kontrak setelah eksekusi fungsi.

### Properti tingkat jejak {#trace-level-properties}

Spesifikasi berbasis jejak menggambarkan operasi yang mentransisikan kontrak di antara status yang berbeda dan hubungan antara operasi ini. Seperti yang dijelaskan sebelumnya, jejak adalah urutan operasi yang mengubah status kontrak dengan cara tertentu.

Pendekatan ini bergantung pada model kontrak pintar sebagai sistem transisi status dengan beberapa status yang telah ditentukan sebelumnya (dijelaskan oleh variabel status) bersama dengan serangkaian transisi yang telah ditentukan sebelumnya (dijelaskan oleh fungsi kontrak). Selanjutnya, [grafik aliran kontrol](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/) (CFG), yang merupakan representasi grafis dari aliran eksekusi program, sering digunakan untuk menggambarkan semantik operasional kontrak. Di sini, setiap jejak direpresentasikan sebagai jalur pada grafik aliran kontrol.

Terutama, spesifikasi tingkat jejak digunakan untuk menalar pola eksekusi internal dalam kontrak pintar. Dengan membuat spesifikasi tingkat jejak, kami menegaskan jalur eksekusi yang dapat diterima (yaitu, transisi status) untuk kontrak pintar. Menggunakan teknik, seperti eksekusi simbolik, kita dapat memverifikasi secara formal bahwa eksekusi tidak pernah mengikuti jalur yang tidak ditentukan dalam model formal.

Mari kita gunakan contoh kontrak [DAO](/dao/) yang memiliki beberapa fungsi yang dapat diakses publik untuk menggambarkan properti tingkat jejak. Di sini, kami berasumsi bahwa kontrak DAO memungkinkan pengguna untuk melakukan operasi berikut:

- Menyetor dana

- Memberikan suara pada proposal setelah menyetor dana

- Mengklaim pengembalian dana jika mereka tidak memberikan suara pada proposal

Contoh properti tingkat jejak bisa berupa _"pengguna yang tidak menyetor dana tidak dapat memberikan suara pada proposal"_ atau _"pengguna yang tidak memberikan suara pada proposal harus selalu dapat mengklaim pengembalian dana"_. Kedua properti tersebut menegaskan urutan eksekusi yang disukai (pemungutan suara tidak dapat terjadi _sebelum_ menyetor dana dan mengklaim pengembalian dana tidak dapat terjadi _setelah_ memberikan suara pada proposal).

## Teknik untuk verifikasi formal kontrak pintar {#formal-verification-techniques}

### Pemeriksaan model {#model-checking}

Pemeriksaan model adalah teknik verifikasi formal di mana algoritma memeriksa model formal kontrak pintar terhadap spesifikasinya. Dalam pemeriksaan model, kontrak pintar sering direpresentasikan sebagai sistem transisi status, sementara properti pada status kontrak yang diizinkan didefinisikan menggunakan logika temporal.

Pemeriksaan model memerlukan pembuatan representasi matematis abstrak dari suatu sistem (yaitu, kontrak) dan mengekspresikan properti sistem ini menggunakan rumus yang berakar pada [logika proposisional](https://www.baeldung.com/cs/propositional-logic). Hal ini menyederhanakan tugas algoritma pemeriksaan model, yaitu untuk membuktikan bahwa model matematika memenuhi rumus logika yang diberikan.

Pemeriksaan model dalam verifikasi formal terutama digunakan untuk mengevaluasi properti temporal yang menggambarkan perilaku kontrak dari waktu ke waktu. Properti temporal untuk kontrak pintar mencakup _keamanan_ dan _kehidupan_, yang telah kami jelaskan sebelumnya.

Misalnya, properti keamanan yang terkait dengan kontrol akses (misalnya, _Hanya pemilik kontrak yang dapat memanggil `selfdestruct`_) dapat ditulis dalam logika formal. Setelah itu, algoritma pemeriksaan model dapat memverifikasi apakah kontrak memenuhi spesifikasi formal ini.

Pemeriksaan model menggunakan eksplorasi ruang status, yang melibatkan konstruksi semua kemungkinan status dari kontrak pintar dan mencoba menemukan status yang dapat dijangkau yang mengakibatkan pelanggaran properti. Namun, hal ini dapat menyebabkan jumlah status yang tak terbatas (dikenal sebagai "masalah ledakan status"), oleh karena itu pemeriksa model mengandalkan teknik abstraksi untuk memungkinkan analisis kontrak pintar yang efisien.

### Pembuktian teorema {#theorem-proving}

Pembuktian teorema adalah metode penalaran matematis tentang kebenaran program, termasuk kontrak pintar. Ini melibatkan transformasi model sistem kontrak dan spesifikasinya menjadi rumus matematika (pernyataan logika).

Tujuan pembuktian teorema adalah untuk memverifikasi ekuivalensi logis antara pernyataan-pernyataan ini. "Ekuivalensi logis" (juga disebut "bi-implikasi logis") adalah jenis hubungan antara dua pernyataan sedemikian rupa sehingga pernyataan pertama benar _jika dan hanya jika_ pernyataan kedua benar.

Hubungan yang diperlukan (ekuivalensi logis) antara pernyataan tentang model kontrak dan propertinya dirumuskan sebagai pernyataan yang dapat dibuktikan (disebut teorema). Menggunakan sistem inferensi formal, pembukti teorema otomatis dapat memverifikasi validitas teorema tersebut. Dengan kata lain, pembukti teorema dapat secara meyakinkan membuktikan bahwa model kontrak pintar sama persis dengan spesifikasinya.

Sementara pemeriksaan model memodelkan kontrak sebagai sistem transisi dengan status terbatas, pembuktian teorema dapat menangani analisis sistem status tak terbatas. Namun, ini berarti pembukti teorema otomatis tidak selalu dapat mengetahui apakah masalah logika "dapat diputuskan" atau tidak.

Akibatnya, bantuan manusia sering kali diperlukan untuk memandu pembukti teorema dalam memperoleh bukti kebenaran. Penggunaan upaya manusia dalam pembuktian teorema membuatnya lebih mahal untuk digunakan daripada pemeriksaan model, yang sepenuhnya otomatis.

### Eksekusi simbolik {#symbolic-execution}

Eksekusi simbolik adalah metode menganalisis kontrak pintar dengan mengeksekusi fungsi menggunakan _nilai simbolik_ (misalnya, `x > 5`) alih-alih _nilai konkret_ (misalnya, `x == 5`). Sebagai teknik verifikasi formal, eksekusi simbolik digunakan untuk menalar secara formal tentang properti tingkat jejak dalam kode kontrak.

Eksekusi simbolik merepresentasikan jejak eksekusi sebagai rumus matematika atas nilai masukan simbolik, yang juga disebut _predikat jalur_. Sebuah [pemecah SMT (SMT solver)](https://en.wikipedia.org/wiki/Satisfiability_modulo_theories) digunakan untuk memeriksa apakah predikat jalur "dapat dipenuhi" (yaitu, ada nilai yang dapat memenuhi rumus tersebut). Jika jalur yang rentan dapat dipenuhi, pemecah SMT akan menghasilkan nilai konkret yang memicu dan mengarahkan eksekusi ke jalur tersebut.

Misalkan fungsi kontrak pintar mengambil nilai `uint` (`x`) sebagai masukan dan dikembalikan (revert) ketika `x` lebih besar dari `5` dan juga lebih rendah dari `10`. Menemukan nilai untuk `x` yang memicu kesalahan menggunakan prosedur pengujian normal akan memerlukan penjalanan puluhan kasus uji (atau lebih) tanpa jaminan benar-benar menemukan masukan yang memicu kesalahan.

Sebaliknya, alat eksekusi simbolik akan mengeksekusi fungsi dengan nilai simbolik: `X > 5 ∧ X < 10` (yaitu, `x` lebih besar dari 5 DAN `x` kurang dari 10). Predikat jalur terkait `x = X > 5 ∧ X < 10` kemudian akan diberikan ke pemecah SMT untuk dipecahkan. Jika nilai tertentu memenuhi rumus `x = X > 5 ∧ X < 10`, pemecah SMT akan menghitungnya—misalnya, pemecah mungkin menghasilkan `7` sebagai nilai untuk `x`.

Karena eksekusi simbolik bergantung pada masukan ke suatu program, dan kumpulan masukan untuk mengeksplorasi semua status yang dapat dijangkau berpotensi tak terbatas, ini masih merupakan bentuk pengujian. Namun, seperti yang ditunjukkan dalam contoh, eksekusi simbolik lebih efisien daripada pengujian biasa untuk menemukan masukan yang memicu pelanggaran properti.

Selain itu, eksekusi simbolik menghasilkan lebih sedikit positif palsu daripada teknik berbasis properti lainnya (misalnya, fuzzing) yang secara acak menghasilkan masukan ke suatu fungsi. Jika status kesalahan dipicu selama eksekusi simbolik, maka dimungkinkan untuk menghasilkan nilai konkret yang memicu kesalahan dan mereproduksi masalah tersebut.

Eksekusi simbolik juga dapat memberikan beberapa tingkat bukti matematis tentang kebenaran. Pertimbangkan contoh berikut dari fungsi kontrak dengan perlindungan overflow:

```
function safe_add(uint x, uint y) returns(uint z){

  z = x + y;
  require(z>=x);
  require(z>=y);

  return z;
}
```

Jejak eksekusi yang menghasilkan integer overflow perlu memenuhi rumus: `z = x + y AND (z >= x) AND (z >= y) AND (z < x OR z < y)` Rumus semacam itu tidak mungkin dipecahkan, oleh karena itu rumus ini berfungsi sebagai bukti matematis bahwa fungsi `safe_add` tidak pernah mengalami overflow.

### Mengapa menggunakan verifikasi formal untuk kontrak pintar? {#benefits-of-formal-verification}

#### Kebutuhan akan keandalan {#need-for-reliability}

Verifikasi formal digunakan untuk menilai kebenaran sistem kritis keselamatan yang kegagalannya dapat memiliki konsekuensi yang menghancurkan, seperti kematian, cedera, atau kehancuran finansial. Kontrak pintar adalah aplikasi bernilai tinggi yang mengendalikan jumlah nilai yang sangat besar, dan kesalahan sederhana dalam desain dapat menyebabkan [kerugian yang tidak dapat dipulihkan bagi pengguna](https://www.freecodecamp.org/news/a-hacker-stole-31m-of-ether-how-it-happened-and-what-it-means-for-ethereum-9e5dc29e33ce/amp/). Namun, memverifikasi kontrak secara formal sebelum penerapan dapat meningkatkan jaminan bahwa kontrak tersebut akan berkinerja seperti yang diharapkan setelah berjalan di blockchain.

Keandalan adalah kualitas yang sangat diinginkan dalam kontrak pintar apa pun, terutama karena kode yang diterapkan di Mesin Virtual [Ethereum](/) (EVM) biasanya tetap (immutable). Dengan peningkatan pasca-peluncuran yang tidak mudah diakses, kebutuhan untuk menjamin keandalan kontrak membuat verifikasi formal diperlukan. Verifikasi formal mampu mendeteksi masalah rumit, seperti integer underflow dan overflow, re-entrancy, dan pengoptimalan gas yang buruk, yang mungkin terlewatkan oleh auditor dan penguji.

#### Membuktikan kebenaran fungsional {#prove-functional-correctness}

Pengujian program adalah metode paling umum untuk membuktikan bahwa kontrak pintar memenuhi beberapa persyaratan. Ini melibatkan eksekusi kontrak dengan sampel data yang diharapkan untuk ditangani dan menganalisis perilakunya. Jika kontrak mengembalikan hasil yang diharapkan untuk data sampel, maka pengembang memiliki bukti objektif tentang kebenarannya.

Namun, pendekatan ini tidak dapat membuktikan eksekusi yang benar untuk nilai masukan yang bukan bagian dari sampel. Oleh karena itu, menguji kontrak dapat membantu mendeteksi bug (yaitu, jika beberapa jalur kode gagal mengembalikan hasil yang diinginkan selama eksekusi), tetapi **itu tidak dapat secara meyakinkan membuktikan tidak adanya bug**.

Sebaliknya, verifikasi formal dapat secara formal membuktikan bahwa kontrak pintar memenuhi persyaratan untuk rentang eksekusi yang tak terbatas _tanpa_ menjalankan kontrak sama sekali. Ini memerlukan pembuatan spesifikasi formal yang secara tepat menggambarkan perilaku kontrak yang benar dan mengembangkan model formal (matematis) dari sistem kontrak. Kemudian kita dapat mengikuti prosedur pembuktian formal untuk memeriksa konsistensi antara model kontrak dan spesifikasinya.

Dengan verifikasi formal, pertanyaan untuk memverifikasi apakah logika bisnis kontrak memenuhi persyaratan adalah proposisi matematis yang dapat dibuktikan atau disangkal. Dengan membuktikan proposisi secara formal, kita dapat memverifikasi jumlah kasus uji yang tak terbatas dengan jumlah langkah yang terbatas. Dengan cara ini, verifikasi formal memiliki prospek yang lebih baik untuk membuktikan bahwa kontrak secara fungsional benar sehubungan dengan spesifikasi.

#### Target verifikasi yang ideal {#ideal-verification-targets}

Target verifikasi menggambarkan sistem yang akan diverifikasi secara formal. Verifikasi formal paling baik digunakan dalam "sistem tertanam" (perangkat lunak kecil dan sederhana yang membentuk bagian dari sistem yang lebih besar). Mereka juga ideal untuk domain khusus yang memiliki sedikit aturan, karena ini memudahkan untuk memodifikasi alat untuk memverifikasi properti khusus domain.

Kontrak pintar—setidaknya, sampai batas tertentu—memenuhi kedua persyaratan tersebut. Misalnya, ukuran kontrak Ethereum yang kecil membuatnya dapat menerima verifikasi formal. Demikian pula, EVM mengikuti aturan sederhana, yang membuat penentuan dan verifikasi properti semantik untuk program yang berjalan di EVM menjadi lebih mudah.

### Siklus pengembangan yang lebih cepat {#faster-development-cycle}

Teknik verifikasi formal, seperti pemeriksaan model dan eksekusi simbolik, umumnya lebih efisien daripada analisis reguler kode kontrak pintar (dilakukan selama pengujian atau audit). Ini karena verifikasi formal bergantung pada nilai simbolik untuk menguji asersi ("bagaimana jika pengguna mencoba menarik _n_ ether?") tidak seperti pengujian yang menggunakan nilai konkret ("bagaimana jika pengguna mencoba menarik 5 ether?").

Variabel masukan simbolik dapat mencakup beberapa kelas nilai konkret, sehingga pendekatan verifikasi formal menjanjikan cakupan kode yang lebih banyak dalam jangka waktu yang lebih singkat. Jika digunakan secara efektif, verifikasi formal dapat mempercepat siklus pengembangan bagi pengembang.

Verifikasi formal juga meningkatkan proses membangun aplikasi terdesentralisasi (dapps) dengan mengurangi kesalahan desain yang mahal. Meningkatkan kontrak (jika memungkinkan) untuk memperbaiki kerentanan memerlukan penulisan ulang basis kode yang ekstensif dan lebih banyak upaya yang dihabiskan untuk pengembangan. Verifikasi formal dapat mendeteksi banyak kesalahan dalam implementasi kontrak yang mungkin terlewatkan oleh penguji dan auditor dan memberikan banyak kesempatan untuk memperbaiki masalah tersebut sebelum menerapkan kontrak.

## Kekurangan verifikasi formal {#drawbacks-of-formal-verification}

### Biaya tenaga kerja manual {#cost-of-manual-labor}

Verifikasi formal, terutama verifikasi semi-otomatis di mana manusia memandu pembukti untuk memperoleh bukti kebenaran, membutuhkan tenaga kerja manual yang cukup besar. Selain itu, membuat spesifikasi formal adalah aktivitas kompleks yang menuntut tingkat keterampilan yang tinggi.

Faktor-faktor ini (upaya dan keterampilan) membuat verifikasi formal lebih menuntut dan mahal dibandingkan dengan metode biasa untuk menilai kebenaran dalam kontrak, seperti pengujian dan audit. Namun demikian, membayar biaya untuk audit verifikasi penuh adalah praktis, mengingat biaya kesalahan dalam implementasi kontrak pintar.

### Negatif palsu {#false-negatives}

Verifikasi formal hanya dapat memeriksa apakah eksekusi kontrak pintar sesuai dengan spesifikasi formal. Oleh karena itu, penting untuk memastikan spesifikasi tersebut dengan benar menggambarkan perilaku yang diharapkan dari kontrak pintar.

Jika spesifikasi ditulis dengan buruk, pelanggaran properti—yang mengarah pada eksekusi yang rentan—tidak dapat dideteksi oleh audit verifikasi formal. Dalam hal ini, pengembang mungkin secara keliru berasumsi bahwa kontrak tersebut bebas bug.

### Masalah kinerja {#performance-issues}

Verifikasi formal menghadapi sejumlah masalah kinerja. Misalnya, masalah ledakan status dan jalur yang masing-masing ditemui selama pemeriksaan model dan pemeriksaan simbolik, dapat memengaruhi prosedur verifikasi. Selain itu, alat verifikasi formal sering menggunakan pemecah SMT dan pemecah kendala lainnya di lapisan dasarnya, dan pemecah ini bergantung pada prosedur yang intensif secara komputasi.

Selain itu, tidak selalu mungkin bagi pemverifikasi program untuk menentukan apakah suatu properti (dijelaskan sebagai rumus logika) dapat dipenuhi atau tidak ("[masalah desidabilitas](https://en.wikipedia.org/wiki/Decision_problem)") karena suatu program mungkin tidak pernah berakhir. Oleh karena itu, mungkin tidak mungkin untuk membuktikan beberapa properti untuk suatu kontrak bahkan jika kontrak tersebut ditentukan dengan baik.

## Alat verifikasi formal untuk kontrak pintar Ethereum {#formal-verification-tools}

### Bahasa spesifikasi untuk membuat spesifikasi formal {#specification-languages}

**Act**: _*Act memungkinkan spesifikasi pembaruan penyimpanan, pra/pasca kondisi, dan invarian kontrak. Rangkaian alatnya juga memiliki backend pembuktian yang mampu membuktikan banyak properti melalui Coq, pemecah SMT, atau hevm.*_

- [GitHub](https://github.com/ethereum/act)
- [Dokumentasi](https://github.com/argotorg/act)

**Scribble** - _*Scribble mengubah anotasi kode dalam bahasa spesifikasi Scribble menjadi asersi konkret yang memeriksa spesifikasi.*_

- [Dokumentasi](https://docs.scribble.codes/)

**Dafny** - _*Dafny adalah bahasa pemrograman siap verifikasi yang mengandalkan anotasi tingkat tinggi untuk menalar dan membuktikan kebenaran kode.*_

- [GitHub](https://github.com/dafny-lang/dafny)

### Pemverifikasi program untuk memeriksa kebenaran {#program-verifiers}

**Certora Prover** - _Certora Prover adalah alat verifikasi formal otomatis untuk memeriksa kebenaran kode dalam kontrak pintar. Spesifikasi ditulis dalam CVL (Certora Verification Language), dengan pelanggaran properti dideteksi menggunakan kombinasi analisis statis dan pemecahan kendala._

- [Situs Web](https://www.certora.com/)
- [Dokumentasi](https://docs.certora.com/en/latest/index.html)

**Solidity SMTChecker** - _*SMTChecker Solidity adalah pemeriksa model bawaan berdasarkan SMT (Satisfiability Modulo Theories) dan pemecahan Horn. Ini mengonfirmasi apakah kode sumber kontrak cocok dengan spesifikasi selama kompilasi dan secara statis memeriksa pelanggaran properti keamanan.*_

- [GitHub](https://github.com/ethereum/solidity)

**solc-verify** - _*solc-verify adalah versi lanjutan dari kompiler Solidity yang dapat melakukan verifikasi formal otomatis pada kode Solidity menggunakan anotasi dan verifikasi program modular.*_

- [GitHub](https://github.com/SRI-CSL/solidity)

**KEVM** - _*KEVM adalah semantik formal dari Mesin Virtual Ethereum (EVM) yang ditulis dalam kerangka kerja K. KEVM dapat dieksekusi dan dapat membuktikan asersi terkait properti tertentu menggunakan logika keterjangkauan.*_

- [GitHub](https://github.com/runtimeverification/evm-semantics)
- [Dokumentasi](https://jellopaper.org/)

### Kerangka kerja logis untuk pembuktian teorema {#theorem-provers}

**Isabelle** - _Isabelle/HOL adalah asisten pembuktian yang memungkinkan rumus matematika diekspresikan dalam bahasa formal dan menyediakan alat untuk membuktikan rumus tersebut. Aplikasi utamanya adalah formalisasi bukti matematis dan khususnya verifikasi formal, yang mencakup pembuktian kebenaran perangkat keras atau perangkat lunak komputer dan pembuktian properti bahasa dan protokol komputer._

- [GitHub](https://github.com/isabelle-prover)
- [Dokumentasi](https://isabelle.in.tum.de/documentation.html)

**Rocq** - _Rocq adalah pembukti teorema interaktif yang memungkinkan Anda mendefinisikan program menggunakan teorema dan secara interaktif menghasilkan bukti kebenaran yang diperiksa oleh mesin._

- [GitHub](https://github.com/rocq-prover/rocq)
- [Dokumentasi](https://rocq-prover.org/docs)

### Alat berbasis eksekusi simbolik untuk mendeteksi pola rentan dalam kontrak pintar {#symbolic-execution-tools}

**Manticore** - _*Alat untuk menganalisis bytecode EVM berdasarkan eksekusi simbolik*._

- [GitHub](https://github.com/trailofbits/manticore)
- [Dokumentasi](https://github.com/trailofbits/manticore/wiki)

**hevm** - _*hevm adalah mesin eksekusi simbolik dan pemeriksa ekuivalensi untuk bytecode EVM.*_

- [GitHub](https://github.com/dapphub/dapptools/tree/master/src/hevm)

**Mythril** - _Alat eksekusi simbolik untuk mendeteksi kerentanan dalam kontrak pintar Ethereum_

- [GitHub](https://github.com/ConsenSys/mythril-classic)
- [Dokumentasi](https://mythril-classic.readthedocs.io/en/develop/)

## Bacaan lebih lanjut {#further-reading}

- [Cara Kerja Verifikasi Formal Kontrak Pintar](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/)
- [Bagaimana Verifikasi Formal Dapat Memastikan Kontrak Pintar yang Sempurna](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1)
- [Tinjauan Proyek Verifikasi Formal di Ekosistem Ethereum](https://github.com/leonardoalt/ethereum_formal_verification_overview)
- [Verifikasi Formal End-to-End dari Kontrak Pintar Deposit Ethereum 2.0](https://runtimeverification.com/blog/end-to-end-formal-verification-of-ethereum-2-0-deposit-smart-contract/)
- [Memverifikasi Secara Formal Kontrak Pintar Paling Populer di Dunia](https://www.zellic.io/blog/formal-verification-weth)
- [SMTChecker dan Verifikasi Formal](https://docs.soliditylang.org/en/v0.8.15/smtchecker.html)