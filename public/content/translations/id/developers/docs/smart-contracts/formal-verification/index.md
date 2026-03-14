---
title: Verifikasi formal kontrak pintar
description: Ikhtisar tentang verifikasi formal untuk kontrak pintar Ethereum
lang: id
---

[Kontrak pintar](/developers/docs/smart-contracts/) memungkinkan untuk membuat aplikasi terdesentralisasi, tanpa perlu percaya, dan kuat yang memperkenalkan kasus penggunaan baru dan membuka nilai bagi pengguna. Karena kontrak pintar menangani nilai dalam jumlah besar, keamanan menjadi pertimbangan penting bagi para pengembang.

Verifikasi formal adalah salah satu teknik yang direkomendasikan untuk meningkatkan [keamanan kontrak pintar](/developers/docs/smart-contracts/security/). Verifikasi formal, yang menggunakan [metode formal](https://www.brookings.edu/techstream/formal-methods-as-a-path-toward-better-cybersecurity/) untuk menentukan, merancang, dan memverifikasi program, telah digunakan selama bertahun-tahun untuk memastikan kebenaran sistem perangkat keras dan perangkat lunak yang penting.

Ketika diimplementasikan dalam kontrak pintar, verifikasi formal dapat membuktikan bahwa logika bisnis kontrak memenuhi spesifikasi yang telah ditentukan. Dibandingkan dengan metode lain untuk menilai kebenaran kode kontrak, seperti pengujian, verifikasi formal memberikan jaminan yang lebih kuat bahwa kontrak pintar sudah benar secara fungsional.

## Apa itu verifikasi formal? {#what-is-formal-verification}

Verifikasi formal mengacu pada proses mengevaluasi kebenaran suatu sistem sehubungan dengan spesifikasi formal. Dalam istilah yang lebih sederhana, verifikasi formal memungkinkan kita untuk memeriksa apakah perilaku suatu sistem memenuhi beberapa persyaratan (yaitu, melakukan apa yang kita inginkan).

Perilaku yang diharapkan dari sistem (kontrak pintar dalam hal ini) dijelaskan dengan menggunakan pemodelan formal, sedangkan bahasa spesifikasi memungkinkan pembuatan sifat formal. Teknik verifikasi formal kemudian dapat memverifikasi bahwa implementasi kontrak sesuai dengan spesifikasinya dan memperoleh bukti matematis atas kebenaran kontrak tersebut. Ketika sebuah kontrak memenuhi spesifikasinya, kontrak tersebut digambarkan sebagai "benar secara fungsional", "benar secara desain", atau "benar secara konstruksi".

### Apa itu model formal? {#what-is-a-formal-model}

Dalam ilmu komputer, [model formal](https://en.wikipedia.org/wiki/Model_of_computation) adalah deskripsi matematis dari proses komputasi. Program diabstraksikan ke dalam fungsi matematika (persamaan), dengan model yang menggambarkan bagaimana keluaran ke fungsi dihitung dengan masukan yang diberikan.

Model formal memberikan tingkat abstraksi di mana analisis perilaku program dapat dievaluasi. Keberadaan model formal memungkinkan pembuatan _spesifikasi formal_, yang menjelaskan properti yang diinginkan dari model yang dimaksud.

Teknik yang berbeda digunakan untuk memodelkan kontrak pintar untuk verifikasi formal. Sebagai contoh, beberapa model digunakan untuk menalar perilaku tingkat tinggi dari kontrak pintar. Teknik pemodelan ini menerapkan tampilan kotak hitam pada kontrak pintar, melihatnya sebagai sistem yang menerima masukan dan mengeksekusi komputasi berdasarkan masukan tersebut.

Model tingkat tinggi berfokus pada hubungan antara kontrak pintar dan agen eksternal, seperti akun yang dimiliki secara eksternal (EOA), akun kontrak, dan lingkungan blockchain. Model tersebut berguna untuk mendefinisikan sifat yang menentukan bagaimana seharusnya perilaku kontrak dalam menanggapi interaksi pengguna tertentu.

Sebaliknya, model formal lainnya berfokus pada perilaku tingkat rendah dari kontrak pintar. Meskipun model tingkat tinggi bisa membantu memahami fungsionalitas kontrak, mereka mungkin tidak menangkap detail-detail penting tentang cara kontrak tersebut diimplementasikan. Model tingkat rendah menerapkan pandangan white-box untuk analisis program dan bergantung pada representasi tingkat lebih rendah dari aplikasi kontrak pintar, seperti jejak program dan [grafik alur kontrol](https://en.wikipedia.org/wiki/Control-flow_graph), untuk menalar properti yang relevan dengan eksekusi kontrak.

Model tingkat rendah dianggap ideal karena model ini mewakili eksekusi aktual dari kontrak pintar dalam lingkungan eksekusi Ethereum (yaitu, [EVM](/developers/docs/evm/)). Teknik pemodelan tingkat rendah sangat berguna dalam membangun sifat keamanan penting dalam kontrak pintar dan mendeteksi potensi kerentanan.

### Apa itu spesifikasi formal? {#what-is-a-formal-specification}

Spesifikasi hanyalah persyaratan teknis yang harus dipenuhi oleh sistem tertentu. Dalam pemrograman, spesifikasi mewakili gagasan umum tentang eksekusi program (yaitu, apa yang harus dilakukan oleh program).

Dalam konteks kontrak pintar, spesifikasi formal mengacu pada _properti_—deskripsi formal dari persyaratan yang harus dipenuhi oleh kontrak. Sifat tersebut digambarkan sebagai "invarian" dan mewakili pernyataan logika tentang eksekusi kontrak yang harus tetap benar dalam setiap keadaan yang mungkin terjadi, tanpa pengecualian apa pun.

Dengan demikian, kita dapat menganggap spesifikasi formal sebagai kumpulan pernyataan yang ditulis dalam bahasa formal yang menggambarkan eksekusi yang dimaksudkan kontrak pintar. Spesifikasi mencakup sifat kontrak dan menentukan bagaimana kontrak harus berperilaku dalam keadaan yang berbeda. Tujuan dari verifikasi formal adalah untuk menentukan apakah kontrak pintar memiliki sifat ini (invarian) dan bahwa sifat ini tidak dilanggar selama eksekusi.

Spesifikasi formal sangat penting dalam mengembangkan implementasi kontrak pintar yang aman. Kontrak yang gagal mengimplementasikan invarian atau sifat dilanggar selama eksekusi rentan terhadap kerentanan yang dapat membahayakan fungsionalitas atau menyebabkan eksploitasi jahat.

## Jenis-jenis spesifikasi formal untuk kontrak pintar {#formal-specifications-for-smart-contracts}

Spesifikasi formal memungkinkan penalaran matematis tentang kebenaran eksekusi program. Seperti halnya model formal, spesifikasi formal dapat menangkap sifat tingkat tinggi atau perilaku tingkat rendah dari implementasi kontrak.

Spesifikasi formal diturunkan menggunakan elemen [logika program](https://en.wikipedia.org/wiki/Logic_programming), yang memungkinkan penalaran formal tentang properti suatu program. Logika program memiliki aturan formal yang mengekspresikan (dalam bahasa matematika) perilaku yang diharapkan dari sebuah program. Berbagai logika program digunakan dalam membuat spesifikasi formal, termasuk [logika ketercapaian](https://en.wikipedia.org/wiki/Reachability_problem), [logika temporal](https://en.wikipedia.org/wiki/Temporal_logic), dan [logika Hoare](https://en.wikipedia.org/wiki/Hoare_logic).

Spesifikasi formal untuk kontrak pintar dapat diklasifikasikan secara luas sebagai spesifikasi **tingkat tinggi** atau **tingkat rendah**. Terlepas dari kategori apa yang termasuk dalam spesifikasi, spesifikasi tersebut harus cukup dan jelas menggambarkan sifat sistem yang sedang dianalisis.

### Spesifikasi tingkat tinggi {#high-level-specifications}

Seperti namanya, spesifikasi tingkat tinggi (juga disebut "spesifikasi berorientasi model") menggambarkan perilaku tingkat tinggi dari sebuah program. Spesifikasi tingkat tinggi memodelkan kontrak pintar sebagai [mesin keadaan terbatas](https://en.wikipedia.org/wiki/Finite-state_machine) (FSM), yang dapat bertransisi antar-keadaan dengan melakukan operasi, dengan logika temporal yang digunakan untuk mendefinisikan properti formal untuk model FSM.

[Logika temporal](https://en.wikipedia.org/wiki/Temporal_logic) adalah "aturan untuk menalar tentang proposisi yang dikualifikasikan dalam hal waktu (mis., "Saya _selalu_ lapar" atau "Saya _pada akhirnya_ akan lapar")." Ketika diterapkan pada verifikasi formal, logika temporal digunakan untuk menyatakan pernyataan tentang perilaku yang benar dari sistem yang dimodelkan sebagai mesin status. Secara khusus, logika temporal menggambarkan status masa depan yang bisa berada di kontrak pintar dan bagaimana itu bertransisi antar status.

Spesifikasi tingkat tinggi umumnya menangkap dua properti temporal penting untuk kontrak pintar: **keamanan (safety)** dan **keaktifan (liveness)**. Sifat keamanan mewakili gagasan bahwa "tidak ada hal buruk yang pernah terjadi" dan biasanya mengekspresikan invarian. Properti keamanan dapat mendefinisikan persyaratan perangkat lunak umum, seperti kebebasan dari [deadlock](https://www.techtarget.com/whatis/definition/deadlock), atau mengekspresikan properti khusus domain untuk kontrak (mis., invarian pada kontrol akses untuk fungsi, nilai variabel keadaan yang dapat diterima, atau kondisi untuk transfer token).

Ambil contoh persyaratan keamanan ini yang mencakup ketentuan untuk menggunakan `transfer()` atau `transferFrom()` dalam kontrak token ERC-20: _“Saldo pengirim tidak pernah lebih rendah dari jumlah token yang diminta untuk dikirim.”_ Deskripsi bahasa alami dari invarian kontrak ini dapat diterjemahkan ke dalam spesifikasi formal (matematis), yang kemudian dapat diperiksa validitasnya secara ketat.

Sifat keaktifan menyatakan bahwa "sesuatu yang baik pada akhirnya akan terjadi" dan menyangkut kemampuan kontrak untuk berkembang melalui status yang berbeda. Contoh dari sifat keaktifan adalah "likuiditas", yang mengacu pada kemampuan kontrak untuk memindahkan saldonya kepada pengguna berdasarkan permintaan. Jika properti ini dilanggar, pengguna tidak akan dapat menarik aset yang disimpan di dalam kontrak, seperti yang terjadi pada [insiden dompet Parity](https://www.cnbc.com/2017/11/08/accidental-bug-may-have-frozen-280-worth-of-ether-on-parity-wallet.html).

### Spesifikasi tingkat rendah {#low-level-specifications}

Spesifikasi tingkat tinggi mengambil sebagai titik awal model sifat terbatas dari sebuah kontrak dan menentukan sifat yang diinginkan dari model ini. Sebaliknya, spesifikasi tingkat rendah (juga disebut "spesifikasi berorientasi sifat") sering kali memodelkan program (kontrak pintar) sebagai sistem yang terdiri dari kumpulan fungsi matematis dan menggambarkan perilaku yang benar dari sistem tersebut.

Dalam istilah yang lebih sederhana, spesifikasi tingkat rendah menganalisis _jejak program_ dan mencoba mendefinisikan properti kontrak pintar di atas jejak ini. Jejak mengacu pada urutan eksekusi fungsi yang mengubah status kontrak pintar; oleh karena itu, spesifikasi tingkat rendah membantu menentukan persyaratan untuk eksekusi internal kontrak.

Spesifikasi formal tingkat rendah dapat diberikan sebagai sifat gaya Hoare atau invarian pada jalur eksekusi.

### Properti gaya Hoare {#hoare-style-properties}

[Logika Hoare](https://en.wikipedia.org/wiki/Hoare_logic) menyediakan seperangkat aturan formal untuk menalar tentang kebenaran program, termasuk kontrak pintar. Properti gaya Hoare direpresentasikan oleh triplet Hoare `{P}c{Q}`, dengan `c` adalah sebuah program dan `P` dan `Q` adalah predikat pada keadaan `c` (yaitu program), yang secara formal dideskripsikan sebagai _prakondisi_ dan _pascakondisi_.

Prakondisi adalah predikat yang menjelaskan kondisi yang diperlukan untuk eksekusi fungsi yang benar; pengguna yang memanggil ke dalam kontrak harus memenuhi persyaratan ini. Pascakondisi adalah predikat yang menggambarkan kondisi yang ditetapkan oleh sebuah fungsi jika dieksekusi dengan benar; pengguna dapat mengharapkan kondisi ini menjadi benar setelah memanggil fungsi tersebut. _Invarian_ dalam logika Hoare adalah predikat yang dipertahankan oleh eksekusi sebuah fungsi (yaitu, tidak berubah).

Spesifikasi gaya Hoare dapat menjamin _kebenaran parsial_ atau _kebenaran total_. Implementasi fungsi kontrak "sebagian benar" jika prakondisi bernilai benar sebelum fungsi dieksekusi, dan jika eksekusi berakhir, pascakondisi juga bernilai benar. Bukti kebenaran total diperoleh jika prakondisi bernilai benar sebelum fungsi dieksekusi, eksekusi dijamin akan berakhir dan ketika berakhir, pascakondisi bernilai benar.

Mendapatkan bukti kebenaran total sulit dilakukan karena beberapa eksekusi mungkin tertunda sebelum diakhiri, atau tidak pernah diakhiri sama sekali. Meskipun demikian, pertanyaan tentang apakah eksekusi berakhir dapat diperdebatkan karena mekanisme gas Ethereum mencegah perulangan program yang tak terbatas (eksekusi akan berakhir dengan sukses atau berakhir karena kesalahan 'kehabisan gas').

Spesifikasi kontrak pintar yang dibuat menggunakan logika Hoare akan memiliki prakondisi, pascakondisi, dan invarian yang ditentukan untuk eksekusi fungsi dan perulangan dalam kontrak. Prakondisi sering kali menyertakan kemungkinan masukan yang salah ke sebuah fungsi, dengan pascakondisi yang menggambarkan respon yang diharapkan terhadap masukan tersebut (misalnya, melempar pengecualian tertentu). Dengan cara ini, properti gaya Hoare efektif untuk memastikan kebenaran implementasi kontrak.

Banyak kerangka kerja verifikasi formal menggunakan spesifikasi gaya Hoare untuk membuktikan kebenaran fungsi semantik. Dimungkinkan juga untuk menambahkan properti gaya Hoare (sebagai asersi) langsung ke kode kontrak dengan menggunakan pernyataan `require` dan `assert` di Solidity.

Pernyataan `require` mengekspresikan prakondisi atau invarian dan sering digunakan untuk memvalidasi masukan pengguna, sedangkan `assert` menangkap pascakondisi yang diperlukan untuk keamanan. Misalnya, kontrol akses yang tepat untuk fungsi (contoh properti keamanan) dapat dicapai dengan menggunakan `require` sebagai pemeriksaan prakondisi pada identitas akun yang memanggil. Demikian pula, invarian pada nilai yang diizinkan dari variabel keadaan dalam sebuah kontrak (mis., jumlah total token yang beredar) dapat dilindungi dari pelanggaran dengan menggunakan `assert` untuk mengonfirmasi keadaan kontrak setelah eksekusi fungsi.

### Properti tingkat jejak {#trace-level-properties}

Spesifikasi berbasis jejak menggambarkan operasi yang mentransisikan kontrak antara status yang berbeda dan hubungan antara operasi ini. Seperti yang telah dijelaskan sebelumnya, jejak adalah urutan operasi yang mengubah status kontrak dengan cara tertentu.

Pendekatan ini bergantung pada model kontrak pintar sebagai sistem transisi status dengan beberapa status yang telah ditentukan sebelumnya (dijelaskan oleh variabel status) bersama dengan serangkaian transisi yang telah ditentukan sebelumnya (dijelaskan oleh fungsi kontrak). Selanjutnya, [grafik alur kontrol](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/) (CFG), yang merupakan representasi grafis dari alur eksekusi program, sering digunakan untuk menjelaskan semantik operasional suatu kontrak. Di sini, setiap jejak direpresentasikan sebagai jalur pada grafik alur kontrol.

Pada dasarnya, spesifikasi tingkat jejak digunakan untuk menalar pola eksekusi internal dalam kontrak pintar. Dengan membuat spesifikasi tingkat jejak, kami menegaskan jalur eksekusi yang dapat diterima (yaitu, transisi status) untuk kontrak pintar. Dengan menggunakan teknik, seperti eksekusi simbolik, kita dapat memverifikasi secara formal bahwa eksekusi tidak pernah mengikuti jalur yang tidak ditentukan dalam model formal.

Mari kita gunakan contoh kontrak [DAO](/dao/) yang memiliki beberapa fungsi yang dapat diakses publik untuk mendeskripsikan properti tingkat jejak. Di sini, kami berasumsi kontrak DAO memungkinkan pengguna untuk melakukan operasi berikut:

- Setor dana

- Memberikan suara pada proposal setelah menyetor dana

- Klaim pengembalian dana jika mereka tidak memberikan suara pada proposal

Contoh properti tingkat jejak bisa berupa _"pengguna yang tidak menyetor dana tidak dapat memberikan suara pada proposal"_ atau _"pengguna yang tidak memberikan suara pada proposal harus selalu dapat mengklaim pengembalian dana"_. Kedua properti tersebut menegaskan urutan eksekusi yang lebih disukai (pemungutan suara tidak dapat terjadi _sebelum_ menyetorkan dana dan mengklaim pengembalian dana tidak dapat terjadi _setelah_ memberikan suara pada proposal).

## Teknik untuk verifikasi formal kontrak pintar {#formal-verification-techniques}

### Pemeriksaan model {#model-checking}

Model pemeriksaan adalah teknik verifikasi formal di mana algoritme memeriksa model formal kontrak pintar terhadap spesifikasinya. Dalam model pemeriksaan, kontrak pintar sering direpresentasikan sebagai sistem transisi status, sementara sifat pada status kontrak yang diizinkan didefinisikan menggunakan logika temporal.

Pemeriksaan model memerlukan pembuatan representasi matematis abstrak dari suatu sistem (yaitu, kontrak) dan mengekspresikan properti sistem ini menggunakan rumus yang berakar pada [logika proposisional](https://www.baeldung.com/cs/propositional-logic). Hal ini menyederhanakan tugas algoritme model pemeriksaan, yaitu membuktikan bahwa model matematis memenuhi rumus logika yang diberikan.

Model pemeriksaan dalam verifikasi formal terutama digunakan untuk mengevaluasi sifat temporal yang menggambarkan perilaku kontrak dari waktu ke waktu. Properti temporal untuk kontrak pintar mencakup _keamanan (safety)_ dan _keaktifan (liveness)_, yang telah kami jelaskan sebelumnya.

Misalnya, properti keamanan yang terkait dengan kontrol akses (mis., _Hanya pemilik kontrak yang dapat memanggil `selfdestruct`_) dapat ditulis dalam logika formal. Setelah itu, algoritme model pemeriksaan dapat memverifikasi apakah kontrak memenuhi spesifikasi formal ini.

Model pemeriksaan menggunakan eksplorasi ruang status, yang melibatkan pembuatan semua status yang mungkin dari kontrak pintar dan mencoba menemukan status yang dapat dijangkau yang mengakibatkan pelanggaran sifat. Namun, hal ini dapat menyebabkan jumlah status yang tidak terbatas (dikenal sebagai "masalah ledakan status"), oleh karena itu model pemeriksa bergantung pada teknik abstraksi untuk memungkinkan analisis yang efisien terhadap kontrak pintar.

### Pembuktian teorema {#theorem-proving}

Pembuktian teorema adalah sebuah metode penalaran matematis tentang kebenaran program, termasuk kontrak pintar. Ini melibatkan transformasi model sistem kontrak dan spesifikasinya ke dalam rumus matematika (pernyataan logika).

Tujuan dari pembuktian teorema adalah untuk memverifikasi kesetaraan logika antara pernyataan-pernyataan ini. “Kesetaraan logis” (juga disebut “bi-implikasi logis”) adalah jenis hubungan antara dua pernyataan sedemikian rupa sehingga pernyataan pertama benar _jika dan hanya jika_ pernyataan kedua benar.

Hubungan yang diperlukan (kesetaraan logika) antara pernyataan tentang model kontrak dan sifatnya dirumuskan sebagai pernyataan yang dapat dibuktikan (disebut teorema). Dengan menggunakan sistem inferensi formal, pembuktian teorema otomatis dapat memverifikasi validitas teorema. Dengan kata lain, pembuktian teorema dapat secara meyakinkan membuktikan model kontrak pintar sesuai dengan spesifikasinya.

Sementara model memeriksa model kontrak sebagai sistem transisi dengan status terbatas, pembuktian teorema dapat menangani analisis sistem dengan status tak berhingga. Namun, ini berarti pembuktian teorema otomatis tidak selalu dapat mengetahui apakah suatu masalah logika "dapat diputuskan" atau tidak.

Akibatnya, bantuan manusia sering kali diperlukan untuk memandu pembuktian teorema dalam memperoleh bukti kebenaran. Penggunaan tenaga manusia dalam pembuktian teorema membuatnya lebih mahal untuk digunakan dibandingkan dengan model pemeriksaan, yang sepenuhnya otomatis.

### Eksekusi simbolis {#symbolic-execution}

Eksekusi simbolis adalah metode menganalisis kontrak pintar dengan mengeksekusi fungsi menggunakan _nilai simbolis_ (mis., `x > 5`) alih-alih _nilai konkret_ (mis., `x == 5`). Sebagai teknik verifikasi formal, eksekusi simbolik digunakan untuk secara formal bernalar tentang sifat tingkat jejak dalam kode kontrak.

Eksekusi simbolis merepresentasikan jejak eksekusi sebagai rumus matematika atas nilai masukan simbolis, atau disebut juga _predikat jalur_. [Pemecah SMT](https://en.wikipedia.org/wiki/Satisfiability_modulo_theories) digunakan untuk memeriksa apakah predikat jalur "dapat dipenuhi" (yaitu, ada nilai yang dapat memenuhi rumus). Jika jalur yang rentan dapat dipenuhi, pemecah SMT akan menghasilkan nilai konkret yang memicu eksekusi ke jalur tersebut.

Misalkan fungsi kontrak pintar menerima masukan berupa nilai `uint` (`x`) dan kembali ketika `x` lebih besar dari `5` dan juga lebih rendah dari `10`. Menemukan nilai untuk `x` yang memicu kesalahan menggunakan prosedur pengujian normal akan memerlukan penjalanan melalui puluhan kasus uji (atau lebih) tanpa jaminan benar-benar menemukan masukan yang memicu kesalahan.

Sebaliknya, alat eksekusi simbolis akan mengeksekusi fungsi dengan nilai simbolis: `X > 5 ∧ X < 10` (yaitu, `x` lebih besar dari 5 DAN `x` kurang dari 10). Predikat jalur terkait `x = X > 5 ∧ X < 10` kemudian akan diberikan ke pemecah SMT untuk diselesaikan. Jika nilai tertentu memenuhi rumus `x = X > 5 ∧ X < 10`, pemecah SMT akan menghitungnya—misalnya, pemecah mungkin menghasilkan `7` sebagai nilai untuk `x`.

Karena eksekusi simbolik bergantung pada masukan ke program, dan kumpulan masukan untuk mengeksplorasi semua status yang dapat dijangkau berpotensi tidak terbatas, hal ini masih merupakan bentuk pengujian. Namun, seperti yang ditunjukkan pada contoh, eksekusi simbolik lebih efisien daripada pengujian biasa untuk menemukan masukan yang memicu pelanggaran sifat.

Selain itu, eksekusi simbolik menghasilkan lebih sedikit positif palsu daripada teknik berbasis sifat lainnya (misalnya, fuzzing) yang secara acak menghasilkan masukan ke suatu fungsi. Jika status kesalahan terpicu selama eksekusi simbolik, maka dimungkinkan untuk menghasilkan nilai konkret yang memicu kesalahan dan mereproduksi masalah.

Eksekusi simbolik juga dapat memberikan beberapa tingkat bukti matematis yang benar. Perhatikan contoh fungsi kontrak dengan perlindungan melebihi batas berikut:

```
function safe_add(uint x, uint y) returns(uint z){

  z = x + y;
  require(z>=x);
  require(z>=y);

  return z;
}
```

Jejak eksekusi yang menghasilkan luapan bilangan bulat (integer overflow) perlu memenuhi rumus: `z = x + y AND (z >= x) AND (z >= y) AND (z < x OR z < y)` Rumus semacam itu tidak mungkin diselesaikan, sehingga berfungsi sebagai bukti matematis bahwa fungsi `safe_add` tidak pernah mengalami luapan.

### Mengapa menggunakan verifikasi formal untuk kontrak pintar? Keuntungan verifikasi formal {#benefits-of-formal-verification}

#### Kebutuhan akan keandalan {#need-for-reliability}

Verifikasi formal digunakan untuk menilai kebenaran sistem keamanan kritis yang kegagalannya dapat memiliki konsekuensi yang menghancurkan, seperti kematian, cedera, atau kehancuran finansial. Kontrak pintar adalah aplikasi bernilai tinggi yang mengontrol nilai dalam jumlah besar, dan kesalahan sederhana dalam desain dapat menyebabkan [kerugian yang tidak dapat dipulihkan bagi pengguna](https://www.freecodecamp.org/news/a-hacker-stole-31m-of-ether-how-it-happened-and-what-it-means-for-ethereum-9e5dc29e33ce/amp/). Namun, memverifikasi kontrak secara resmi sebelum penyebaran dapat meningkatkan jaminan bahwa kontrak tersebut akan bekerja sesuai dengan yang diharapkan ketika berjalan di blockchain.

Keandalan adalah kualitas yang sangat diinginkan dalam kontrak pintar apa pun, terutama karena kode yang diterapkan di Mesin Virtual Ethereum (EVM) biasanya tidak dapat diubah. Dengan peningkatan pasca-peluncuran yang tidak mudah diakses, kebutuhan untuk menjamin keandalan kontrak membuat verifikasi formal diperlukan. Verifikasi formal mampu mendeteksi masalah yang rumit, seperti bilangan bulat dibawah batas dan melebihi batas, masuk kembali, dan pengoptimalan gas yang buruk, yang mungkin lolos dari auditor dan penguji.

#### Buktikan kebenaran fungsional {#prove-functional-correctness}

Pengujian program adalah metode yang paling umum untuk membuktikan bahwa kontrak pintar memenuhi beberapa persyaratan. Hal ini melibatkan pelaksanaan kontrak dengan sampel data yang diharapkan untuk ditangani dan menganalisis perilakunya. Jika kontrak mengembalikan hasil yang diharapkan untuk data sampel, maka pengembang memiliki bukti objektif tentang kebenarannya.

Namun, pendekatan ini tidak dapat membuktikan eksekusi yang benar untuk nilai masukan yang bukan merupakan bagian dari sampel. Oleh karena itu, pengujian kontrak dapat membantu mendeteksi bug (yaitu, jika beberapa alur kode gagal mengembalikan hasil yang diinginkan selama eksekusi), tetapi **itu tidak dapat secara meyakinkan membuktikan ketiadaan bug**.

Sebaliknya, verifikasi formal dapat secara formal membuktikan bahwa kontrak pintar memenuhi persyaratan untuk rentang eksekusi tak terbatas _tanpa_ menjalankan kontrak sama sekali. Hal ini membutuhkan pembuatan spesifikasi formal yang secara tepat menggambarkan perilaku kontrak yang benar dan mengembangkan model formal (matematis) dari sistem kontrak. Kemudian kita dapat mengikuti prosedur pembuktian formal untuk memeriksa konsistensi antara model kontrak dan spesifikasinya.

Dengan verifikasi formal, pertanyaan untuk memverifikasi apakah logika bisnis kontrak memenuhi persyaratan adalah sebuah proposisi matematis yang dapat dibuktikan atau dibantah. Dengan membuktikan proposisi secara formal, kita dapat memverifikasi kasus uji coba dalam jumlah yang tidak terbatas dengan jumlah langkah yang terbatas. Dengan cara ini, verifikasi formal memiliki prospek yang lebih baik untuk membuktikan bahwa sebuah kontrak secara fungsional sudah benar sehubungan dengan spesifikasi.

#### Target verifikasi ideal {#ideal-verification-targets}

Target verifikasi menggambarkan sistem yang akan diverifikasi secara formal. Verifikasi formal paling baik digunakan pada "sistem tertanam" (perangkat lunak kecil dan sederhana yang merupakan bagian dari sistem yang lebih besar). Mereka juga ideal untuk domain khusus yang memiliki sedikit aturan, karena hal ini memudahkan untuk mengubah perangkat untuk memverifikasi sifat khusus domain.

Kontrak pintar—setidaknya, sampai batas tertentu—memenuhi kedua persyaratan tersebut. Sebagai contoh, ukuran kontrak Ethereum yang kecil membuatnya mudah untuk verifikasi formal. Demikian pula, EVM mengikuti aturan sederhana, yang membuat menentukan dan memverifikasi sifat semantik untuk program yang berjalan di EVM menjadi lebih mudah.

### Siklus pengembangan yang lebih cepat {#faster-development-cycle}

Teknik verifikasi formal, seperti model pemeriksaan dan eksekusi simbolik, umumnya lebih efisien dibandingkan dengan analisis biasa terhadap kode kontrak pintar (yang dilakukan selama pengujian atau audit). Ini karena verifikasi formal bergantung pada nilai-nilai simbolis untuk menguji asersi ("bagaimana jika pengguna mencoba menarik _n_ ether?") tidak seperti pengujian yang menggunakan nilai konkret ("bagaimana jika pengguna mencoba menarik 5 ether?").

Variabel masukan simbolik dapat mencakup beberapa kelas nilai konkret, sehingga pendekatan verifikasi formal menjanjikan lebih banyak cakupan kode dalam jangka waktu yang lebih singkat. Jika digunakan secara efektif, verifikasi formal dapat mempercepat siklus pengembangan bagi para pengembang.

Verifikasi formal juga meningkatkan proses pembuatan aplikasi terdesentralisasi (dapps) dengan mengurangi kesalahan desain yang merugikan. Meningkatkan kontrak (jika memungkinkan) untuk memperbaiki kerentanan membutuhkan penulisan ulang basis kode yang luas dan lebih banyak upaya yang dihabiskan dalam pengembangan. Verifikasi formal dapat mendeteksi banyak kesalahan dalam implementasi kontrak yang mungkin lolos dari penguji dan auditor, dan memberikan banyak kesempatan untuk memperbaiki masalah-masalah tersebut sebelum menyebarkan kontrak.

## Kelemahan verifikasi formal {#drawbacks-of-formal-verification}

### Biaya tenaga kerja manual {#cost-of-manual-labor}

Verifikasi formal, terutama verifikasi semi-otomatis di mana manusia memandu pembuktian untuk mendapatkan bukti kebenaran, membutuhkan tenaga kerja manual yang cukup besar. Selain itu, membuat spesifikasi formal adalah aktivitas rumit yang menuntut keterampilan tingkat tinggi.

Faktor-faktor ini (usaha dan keterampilan) membuat verifikasi formal menjadi lebih menuntut dan mahal dibandingkan dengan metode-metode yang biasa digunakan untuk menilai kebenaran kontrak, seperti pengujian dan audit. Namun demikian, membayar biaya untuk audit verifikasi penuh adalah hal yang praktis, mengingat biaya kesalahan dalam implementasi kontrak pintar.

### Negatif palsu {#false-negatives}

Verifikasi formal hanya dapat memeriksa apakah eksekusi kontrak pintar sesuai dengan spesifikasi formal. Oleh karena itu, penting untuk memastikan bahwa spesifikasi menggambarkan perilaku yang diharapkan dari kontrak pintar dengan benar.

Jika spesifikasi tidak ditulis dengan baik, pelanggaran sifat—yang mengarah pada eksekusi yang rentan—tidak dapat dideteksi oleh audit verifikasi formal. Dalam kasus ini, pengembang mungkin secara keliru berasumsi bahwa kontrak tersebut bebas dari bug.

### Masalah performa {#performance-issues}

Verifikasi formal mengalami sejumlah masalah kinerja. Misalnya, masalah ledakan status dan jalur yang dihadapi selama model pemeriksaan dan pemeriksaan simbolik, dapat mempengaruhi prosedur verifikasi. Selain itu, perangkat verifikasi formal sering kali menggunakan pemecah SMT dan pemecah kendala lainnya di lapisan dasarnya, dan pemecah ini bergantung pada prosedur komputasi yang intensif.

Juga, tidak selalu memungkinkan bagi pemverifikasi program untuk menentukan apakah suatu properti (dideskripsikan sebagai rumus logis) dapat dipenuhi atau tidak ("[masalah decidability](https://en.wikipedia.org/wiki/Decision_problem)") karena suatu program mungkin tidak akan pernah berhenti. Dengan demikian, mungkin mustahil untuk membuktikan beberapa sifat untuk suatu kontrak meskipun sudah ditentukan dengan baik.

## Alat verifikasi formal untuk kontrak pintar Ethereum {#formal-verification-tools}

### Bahasa spesifikasi untuk membuat spesifikasi formal {#specification-languages}

**Act**: __Act memungkinkan spesifikasi pembaruan penyimpanan, prakondisi/pascakondisi, dan invarian kontrak. Perangkatnya juga memiliki backend pembuktian yang mampu membuktikan banyak sifat melalui Coq, pemecah SMT, atau hevm.__

- [GitHub](https://github.com/ethereum/act)
- [Dokumentasi](https://github.com/argotorg/act)

**Scribble** - __Scribble mengubah anotasi kode dalam bahasa spesifikasi Scribble menjadi asersi konkret yang memeriksa spesifikasi tersebut.__

- [Dokumentasi](https://docs.scribble.codes/)

**Dafny** - __Dafny adalah bahasa pemrograman yang siap verifikasi yang mengandalkan anotasi tingkat tinggi untuk menalar dan membuktikan kebenaran kode.__

- [GitHub](https://github.com/dafny-lang/dafny)

### Pemverifikasi program untuk memeriksa kebenaran {#program-verifiers}

**Certora Prover** - _Certora Prover adalah alat verifikasi formal otomatis untuk memeriksa kebenaran kode dalam kontrak pintar. Spesifikasi ditulis dalam CVL (Certora Verification Language), dengan pelanggaran properti yang terdeteksi menggunakan kombinasi analisis statis dan pemecahan kendala._

- [Situs web](https://www.certora.com/)
- [Dokumentasi](https://docs.certora.com/en/latest/index.html)

**Solidity SMTChecker** - __SMTChecker dari Solidity adalah pemeriksa model bawaan berdasarkan SMT (Satisfiability Modulo Theories) dan pemecahan Horn. Ini mengkonfirmasi apakah kode sumber kontrak sesuai dengan spesifikasi selama kompilasi dan secara statis memeriksa pelanggaran sifat keamanan.__

- [GitHub](https://github.com/ethereum/solidity)

**solc-verify** - __solc-verify adalah versi yang diperluas dari kompiler Solidity yang dapat melakukan verifikasi formal otomatis pada kode Solidity menggunakan anotasi dan verifikasi program modular.__

- [GitHub](https://github.com/SRI-CSL/solidity)

**KEVM** - __KEVM adalah semantik formal dari Mesin Virtual Ethereum (EVM) yang ditulis dalam kerangka K. KEVM dapat dieksekusi dan dapat membuktikan pernyataan terkait sifat tertentu menggunakan logika keterjangkauan.__

- [GitHub](https://github.com/runtimeverification/evm-semantics)
- [Dokumentasi](https://jellopaper.org/)

### Kerangka kerja logis untuk pembuktian teorema {#theorem-provers}

**Isabelle** - _Isabelle/HOL adalah asisten pembuktian yang memungkinkan rumus matematika diekspresikan dalam bahasa formal dan menyediakan alat untuk membuktikan rumus-rumus tersebut. Penerapan utamanya adalah formalisasi bukti matematis dan khususnya verifikasi formal, yang meliputi pembuktian kebenaran perangkat keras atau perangkat lunak komputer dan pembuktian sifat bahasa dan protokol komputer._

- [GitHub](https://github.com/isabelle-prover)
- [Dokumentasi](https://isabelle.in.tum.de/documentation.html)

**Rocq** - _Rocq adalah pembukti teorema interaktif yang memungkinkan Anda mendefinisikan program menggunakan teorema dan secara interaktif menghasilkan bukti kebenaran yang diperiksa mesin._

- [GitHub](https://github.com/rocq-prover/rocq)
- [Dokumentasi](https://rocq-prover.org/docs)

### Alat berbasis eksekusi simbolis untuk mendeteksi pola rentan dalam kontrak pintar {#symbolic-execution-tools}

**Manticore** - __Alat analisis bytecode EVM berbasis eksekusi simbolis.__

- [GitHub](https://github.com/trailofbits/manticore)
- [Dokumentasi](https://github.com/trailofbits/manticore/wiki)

**hevm** - __hevm adalah mesin eksekusi simbolis dan pemeriksa kesetaraan untuk bytecode EVM.__

- [GitHub](https://github.com/dapphub/dapptools/tree/master/src/hevm)

**Mythril** - _Alat eksekusi simbolis untuk mendeteksi kerentanan dalam kontrak pintar Ethereum_

- [GitHub](https://github.com/ConsenSys/mythril-classic)
- [Dokumentasi](https://mythril-classic.readthedocs.io/en/develop/)

## Bacaan lebih lanjut {#further-reading}

- [Cara Kerja Verifikasi Formal pada Kontrak Pintar](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/)
- [Bagaimana Verifikasi Formal Dapat Memastikan Kontrak Pintar Tanpa Cacat](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1)
- [Tinjauan Proyek Verifikasi Formal di Ekosistem Ethereum](https://github.com/leonardoalt/ethereum_formal_verification_overview)
- [Verifikasi Formal Menyeluruh dari Kontrak Pintar Deposit Ethereum 2.0](https://runtimeverification.com/blog/end-to-end-formal-verification-of-ethereum-2-0-deposit-smart-contract/)
- [Memverifikasi Secara Formal Kontrak Pintar Terpopuler di Dunia](https://www.zellic.io/blog/formal-verification-weth)
- [SMTChecker dan Verifikasi Formal](https://docs.soliditylang.org/en/v0.8.15/smtchecker.html)
