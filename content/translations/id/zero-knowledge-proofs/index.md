---
title: Zero-knowledge proofs
description: Pengenalan non-teknis tentang bukti nol pengetahuan untuk pemula.
lang: id
---

# Apa itu bukti tanpa pengetahuan? {#what-are-zk-proofs}

Bukti tanpa pengetahuan adalah cara untuk membuktikan keabsahan suatu pernyataan tanpa mengungkapkan pernyataan itu sendiri. 'Pembukti' adalah pihak yang mencoba membuktikan klaim, sedangkan 'pemeriksa' bertanggung jawab untuk memvalidasi klaim.

Bukti tanpa pengetahuan pertama kali muncul dalam makalah tahun 1985, "[Kompleksitas pengetahuan dari sistem pembuktian interaktif](http://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf)" yang memberikan definisi bukti nol pengetahuan yang banyak digunakan saat ini:

> Protokol bukti tanpa pengetahuan adalah metode di mana satu pihak (pembukti) **dapat membuktikan** kepada pihak lain (pemeriksa) **bahwa sesuatu adalah benar, tanpa mengungkapkan informasi apa pun** selain fakta bahwa pernyataan tersebut memang benar.

Bukti tanpa pengetahuan telah mengalami perbaikan selama bertahun-tahun dan kini digunakan dalam beberapa aplikasi dunia nyata.

<YouTube id="fOGdb1CTu5c" />

## Mengapa kita memerlukan bukti tanpa pengetahuan? {#why-zero-knowledge-proofs-are-important}

Bukti tanpa pengetahuan mewakili terobosan dalam kriptografi terapan, karena mereka berjanji untuk meningkatkan keamanan informasi bagi individu. Pertimbangkan bagaimana Anda dapat membuktikan suatu klaim (misalnya, "Saya adalah warga negara X") kepada pihak lain (misalnya, penyedia layanan). Anda perlu menyediakan "bukti" untuk mendukung klaim, seperti paspor nasional atau izin mengemudi.

Namun, ada masalah dengan pendekatan ini, terutama kurangnya privasi. Informasi Identifikasi Pribadi (PII) yang dibagikan dengan layanan pihak ketiga disimpan dalam basis data pusat, yang rentan terhadap peretasan. Dengan pencurian identitas menjadi masalah yang kritis, ada panggilan untuk cara berbagi informasi sensitif yang lebih melindungi privasi.

Bukti tanpa pengetahuan menyelesaikan masalah ini dengan **menghilangkan kebutuhan untuk mengungkapkan informasi guna membuktikan kebenaran klaim**. Protokol bukti tanpa pengetahuan menggunakan pernyataan (yang disebut 'saksi') sebagai masukan untuk menghasilkan bukti singkat keabsahannya. Bukti ini memberikan jaminan kuat bahwa suatu pernyataan benar tanpa mengungkap informasi yang digunakan dalam pembuatannya.

Kembali ke contoh sebelumnya, satu-satunya bukti yang Anda butuhkan untuk membuktikan klaim kewarganegaraan adalah bukti tanpa pengetahuan. Verifikator hanya perlu memeriksa apakah beberapa properti dari bukti tersebut benar agar meyakinkan bahwa pernyataan mendasar juga benar.

## Kasus penggunaan untuk bukti tanpa pengetahuan {#use-cases-for-zero-knowledge-proofs}

### Pembayaran anonim {#anonymous-payments}

Pembayaran kartu kredit sering kali terlihat oleh beberapa pihak, termasuk penyedia pembayaran, bank, dan pihak-pihak lain yang berkepentingan (misalnya, otoritas pemerintah). Meskipun pemantauan keuangan memiliki manfaat untuk mengidentifikasi aktivitas ilegal, hal tersebut juga merusak privasi seorang pengguna.

Mata uang kripto dimaksudkan untuk memberikan sarana bagi pengguna untuk melakukan transaksi pribadi antar sesama tanpa perantara. Namun, sebagian besar transaksi mata uang kripto terlihat dengan terbuka pada rantai blok publik. Identitas pengguna sering kali pseudonim dan dapat disengaja dihubungkan dengan identitas dunia nyata (misalnya, dengan menyertakan alamat ETH di profil Twitter atau GitHub) atau dapat dikaitkan dengan identitas dunia nyata menggunakan analisis data dasar di rantai dan di luar rantai.

Terdapat "mata uang privasi" khusus yang dirancang untuk transaksi yang benar-benar anonim. Rantai blok yang berfokus pada privasi, seperti Zcash dan Monero, melindungi detail transaksi, termasuk alamat pengirim/penerima, jenis aset, jumlah, dan jangka waktu transaksi.

Dengan mengintegrasikan teknologi bukti tanpa pengetahuan ke dalam protokol, jaringan [rantai blok](/glossary/#blockchain) yang berfokus pada privasi memungkinkan [node](/glossary/#node) untuk memvalidasi transaksi tanpa perlu mengakses data transaksi.

**Bukti tanpa pengetahuan juga diterapkan untuk menganonimkan transaksi di blockchain publik**. Contohnya adalah Tornado Cash, layanan terdesentralisasi dan non-kustodial yang memungkinkan pengguna untuk melakukan transaksi pribadi di Ethereum. Tornado Cash menggunakan bukti tanpa pengetahuan untuk menyembunyikan detail transaksi dan menjamin privasi finansial. Sayangnya, karena ini adalah perangkat privasi "opt-in," mereka seringkali dikaitkan dengan aktivitas ilegal. Untuk mengatasi hal ini, privasi pada akhirnya harus menjadi standar bawaan di rantai blok publik.

### Perlindungan Identitas {#identity-protection}

Sistem manajemen identitas saat ini mengancam informasi pribadi. Bukti tanpa pengetahuan dapat membantu individu memvalidasi identitas sambil melindungi detail sensitif.

Bukti tanpa pengetahuan sangat berguna dalam konteks [identitas terdesentralisasi](/decentralized-identity/). Identitas terdesentralisasi (juga dikenal sebagai 'identitas berdaulat diri') memberikan individu kemampuan untuk mengontrol akses ke pengenal pribadi. Membuktikan kewarganegaraan Anda tanpa mengungkapkan detail nomor identifikasi pajak atau paspor adalah contoh bagus bagaimana teknologi bukti tanpa pengetahuan memungkinkan identitas terdesentralisasi.

### Autentikasi {#authentication}

Menggunakan layanan daring memerlukan pembuktian identitas dan hak Anda untuk mengakses platform-platform tersebut. Hal ini seringkali memerlukan penyediaan informasi pribadi, seperti nama, alamat email, tanggal lahir, dan sebagainya. Anda mungkin juga perlu menghafal kata sandi panjang atau berisiko kehilangan akses.

Namun, bukti tanpa pengetahuan dapat menyederhanakan otentikasi baik untuk platform maupun pengguna. Setelah bukti ZK telah dihasilkan menggunakan input publik (misalnya, data yang membuktikan keanggotaan pengguna pada platform) dan input pribadi (misalnya, detail pengguna), pengguna dapat dengan mudah menyajikannya untuk mengotentikasi identitas mereka saat perlu mengakses layanan tersebut. Hal ini meningkatkan pengalaman bagi pengguna dan membebaskan organisasi dari kebutuhan untuk menyimpan sejumlah besar informasi pengguna.

### Komputasi yang dapat diverifikasi {#verifiable-computation}

Komputasi yang dapat diverifikasi adalah aplikasi lain dari teknologi bukti tanpa pengetahuan untuk meningkatkan desain rantai blok. Komputasi yang dapat diverifikasi memungkinkan kita untuk mengalihkan komputasi ke entitas lain sambil mempertahankan hasil yang dapat diverifikasi. Entitas tersebut mengirimkan hasil beserta bukti yang terverifikasi bahwa program dieksekusi dengan benar.

Komputasi yang dapat diverifikasi **sangat penting untuk meningkatkan kecepatan pemrosesan di rantai blok** tanpa mengurangi keamanan. Untuk memahaminya memerlukan pengetahuan tentang perbedaan dalam solusi yang diusulkan untuk meningkatkan Penskalaan Ethereum.

[Solusi penskalaan di dalam rantai](/developers/docs/scaling/#on-chain-scaling), seperti Pecahan, memerlukan modifikasi yang luas pada lapisan dasar rantai blok. Tetapi, pendekatan ini sangat kompleks dan kesalahan dalam implementasi dapat merusak model keamanan Ethereum.

[Solusi penskalaan di luar rantai](/developers/docs/scaling/#off-chain-scaling) tidak memerlukan perancangan ulang protokol inti Ethereum. Sebaliknya, mereka mengandalkan model komputasi yang sementara untuk meningkatkan keluaran pada lapisan dasar Ethereum.

Berikut adalah bagaimana hal tersebut bekerja dalam praktiknya:

- Sebagai gantinya, Ethereum tidak memproses setiap transaksi secara langsung, melainkan memindahkan eksekusinya ke rantai terpisah.

- Setelah melakukan transaksi, rantai lain mengembalikan hasilnya agar dapat diterapkan pada status Ethereum.

Manfaatnya adalah Ethereum tidak perlu melakukan eksekusi apa pun dan hanya perlu menerapkan hasil dari komputasi yang dioutsourcing ke keadaannya. Hal ini mengurangi kepadatan jaringan dan juga meningkatkan kecepatan transaksi (protokol di luar rantai mengoptimalkan untuk eksekusi yang lebih cepat).

Rantai ini memerlukan cara untuk memvalidasi transaksi di luar rantai tanpa harus menjalankan ulang, atau nilai dari eksekusi di luar rantai akan hilang.

Di sinilah komputasi yang dapat diverifikasi berperan. Ketika sebuah simpul mengeksekusi transaksi di luar Ethereum, ia akan mengirimkan bukti tanpa pengetahuan untuk membuktikan kebenaran eksekusi rantai di luar. Bukti ini (disebut sebagai [bukti validitas](/glossary/#validity-proof)) menjamin bahwa sebuah transaksi valid, memungkinkan Ethereum untuk menerapkan hasilnya ke dalam keadaannya—tanpa harus menunggu ada sengketa.

[Rollup tanpa pengetahuan](/developers/docs/scaling/zk-rollups) dan [validiums](/developers/docs/scaling/validium/) adalah dua solusi pengembangan di luar rantai yang menggunakan validitas untuk meningkatkan penskalaan dengan aman. Protokol-protokol ini menjalankan ribuan transaksi di luar rantai dan mengirimkan bukti untuk diverifikasi di Ethereum. Hasil-hasil tersebut dapat diterapkan segera setelah bukti diverifikasi, memungkinkan Ethereum memproses lebih banyak transaksi tanpa meningkatkan perhitungan pada lapisan dasar.

### Mengurangi Suap dan Kolusi dalam Pemungutan suara di dalam rantai {#secure-blockchain-voting}

Skema pemungutan suara rantai blok memiliki banyak karakteristik yang menguntungkan: mereka sepenuhnya dapat diaudit, aman terhadap serangan, tahan terhadap sensor, dan bebas dari pembatasan wilayah. Namun demikian, skema pemungutan suara di dalam rantai juga tidak kebal terhadap **masalah kolusi**.

Didefinisikan sebagai "berkoordinasi untuk membatasi persaingan terbuka dengan memperdaya, menipu, dan mengelabui orang lain," kolusi dapat mengambil bentuk seorang aktor jahat yang memengaruhi pemungutan suara dengan menawarkan suap. Sebagai contoh, Alice mungkin menerima suap dari Bob untuk memilih `option B` pada suatu pemilihan meskipun sebenarnya dia lebih suka `option A`.

Suap dan kolusi membatasi efektivitas dari setiap proses yang menggunakan pemungutan suara sebagai mekanisme penanda (terutama di mana pengguna dapat membuktikan bagaimana mereka memilih). Hal ini dapat memiliki konsekuensi yang signifikan, terutama di mana suara bertanggung jawab untuk mengalokasikan sumber daya yang langka.

Sebagai contoh, mekanisme [pembiayaan kuadratik](https://www.radicalxchange.org/concepts/plural-funding/) mengandalkan pada sumbangan untuk mengukur preferensi terhadap opsi tertentu yang berbeda di antara berbagai proyek kebaikan publik. Setiap sumbangan dihitung sebagai "suara" untuk proyek tertentu, dengan proyek-proyek yang menerima lebih banyak suara mendapatkan lebih banyak dana dari pool pencocokan.

Menggunakan pemungutan suara di dalam rantai membuat pendanaan kuadratik rentan terhadap kolusi: transaksi rantai blok bersifat publik, sehingga pemberi suap dapat memeriksa aktivitas on-chain seseorang yang menerima suap untuk melihat bagaimana mereka "memilih". Dengan cara ini, pendanaan kuadratik tidak lagi menjadi cara yang efektif untuk mengalokasikan dana berdasarkan preferensi yang terkumpul dari komunitas.

Untungnya, solusi terbaru seperti MACI (Infrastruktur Anti-Kolusi Minimum) menggunakan bukti tanpa pengetahuan agar pemungutan suara di dalam rantai (misalnya, mekanisme pendanaan kuadratik) tetap tahan terhadap suap dan kolusi. MACI adalah kumpulan kontrak pintar dan skrip yang memungkinkan seorang administrator pusat (disebut "koordinator") untuk menggabungkan suara dan menghitung hasil _tanpa_ mengungkapkan rincian tentang bagaimana setiap individu memberikan suaranya. Meskipun begitu, masih memungkinkan untuk memverifikasi bahwa suara telah dihitung dengan benar, atau mengonfirmasi bahwa individu tertentu berpartisipasi dalam putaran pemungutan suara.

#### Bagaimana cara kerja MACI dengan bukti tanpa pengetahuan? {#how-maci-works-with-zk-proofs}

Pada awalnya, koordinator mendeploy kontrak MACI di Ethereum, setelah itu pengguna dapat mendaftar untuk memilih (dengan mendaftarkan kunci publik mereka dalam kontrak pintar tersebut). Pengguna memasukkan suara dengan mengirim pesan yang dienkripsi dengan kunci publik mereka ke kontrak pintar (suara yang sah harus ditandatangani dengan kunci publik terbaru yang terkait dengan identitas pengguna, di antara kriteria lainnya). Setelah itu, koordinator memproses semua pesan setelah periode pemungut di dalam rantai.

Dalam MACI, bukti tanpa pengetahuan digunakan untuk memastikan kebenaran komputasi dengan membuatnya tidak mungkin bagi koordinator untuk salah memproses suara dan menghitung hasil. Ini dicapai dengan mengharuskan koordinator untuk menghasilkan bukti ZK-SNARK yang memverifikasi bahwa a) semua pesan diproses dengan benar b) hasil akhir sesuai dengan jumlah semua suara yang _valid_.

Dengan demikian, bahkan tanpa membagikan rincian suara per pengguna (seperti biasanya), MACI menjamin integritas hasil yang dihitung selama proses penghitungan. Fitur ini berguna dalam mengurangi efektivitas skema kolusi dasar. Kita dapat menjelajahi kemungkinan ini dengan menggunakan contoh sebelumnya di mana Bob memberi suap kepada Alice agar memilih suatu opsi:

- Alice mendaftar untuk memilih dengan mengirimkan kunci publik ke dalam kontrak pintar.
- Alice setuju untuk memilih `option B` sebagai imbalan dari suap yang diberikan oleh Bob.
- Alice memberikan suaranya untuk `option B`.
- Alice secara rahasia mengirimkan transaksi terenkripsi untuk mengganti kunci publik yang terkait dengan identitasnya.
- Alice mengirim pesan lain (terenkripsi) ke kontrak pintar untuk memilih `option A` menggunakan kunci publik yang baru.
- Alice menunjukkan kepada Bob sebuah transaksi yang menunjukkan bahwa dia memilih untuk `option B` (yang tidak valid karena kunci publiknya tidak lagi terkait dengan identitas Alice dalam sistem)
- Saat memproses pesan, koordinator mengabaikan suara pilihan Alice untuk `option B` dan hanya menghitung suara untuk `option A`. Oleh karena itu, upaya Bob untuk berkolusi dengan Alice dan memanipulasi suara di dalam rantai gagal.

Menggunakan MACI _memerlukan_ kepercayaan pada koordinator untuk tidak berkolusi dengan pemberi suap atau mencoba memberi suap kepada para pemilih sendiri. Koordinator dapat mendekripsi pesan pengguna (yang diperlukan untuk membuat bukti), sehingga mereka dapat dengan akurat memverifikasi bagaimana setiap orang memberikan suaranya.

Namun dalam kasus di mana koordinator tetap jujur, MACI menjadi alat yang kuat untuk menjamin keadilan pemungutan suara di dalam rantai. Hal ini menjelaskan popularitasnya di antara aplikasi pendanaan kuadratik seperti ([clr.fund](https://clr.fund/#/about/maci)) yang sangat mengandalkan integritas dari setiap pilihan suara individu.

[Pelajari lebih lanjut tentang MACI](https://privacy-scaling-explorations.github.io/maci/).

## Bagaimana bukti tanpa pengetahuan bekerja? {#how-do-zero-knowledge-proofs-work}

Bukti tanpa pengetahuan memungkinkan Anda membuktikan kebenaran suatu pernyataan tanpa berbagi isi pernyataan tersebut atau mengungkapkan bagaimana Anda menemukan kebenarannya. Untuk membuat ini menjadi mungkin, protokol bukti tanpa pengetahuan bergantung pada algoritma yang mengambil beberapa data sebagai masukan dan mengembalikan 'benar' atau 'salah' sebagai luaran.

Protokol bukti tanpa pengetahuan harus memenuhi kriteria berikut:

1. **Kelengkapan**: Jika masukan valid, protokol bukti tanpa pengetahuan selalu mengembalikan 'benar'. Oleh karena itu, jika pernyataan mendasar benar, dan pembuktian dan verifikator bertindak jujur, bukti dapat diterima.

2. **Kesahihan**: Jika masukan tidak valid, secara teoritis tidak mungkin menipu protokol bukti tanpa pengetahuan agar mengembalikan 'benar'. Oleh karena itu, pembuktian yang berbohong tidak dapat menipu verifikator yang jujur untuk percaya bahwa suatu pernyataan yang tidak valid adalah benar (kecuali dengan margin probabilitas yang sangat kecil).

3. **Tanpa pengetahuan**: Verifikator tidak memperoleh informasi apa pun tentang suatu pernyataan selain dari kebenarannya atau kebohongannya (mereka memiliki "tanpa pengetahuan" tentang pernyataan tersebut). Persyaratan ini juga mencegah verifikator untuk mendapatkan masukan asli (isi pernyataan) dari bukti.

Dalam bentuk dasar, sebuah bukti tanpa pengetahuan terdiri dari tiga elemen: **saksi**, **tantangan**, dan **respon**.

- **Saksi**: Dalam bukti tanpa pengetahuan, pembukti ingin membuktikan pengetahuan tentang beberapa informasi yang tersembunyi. Informasi rahasia adalah "saksi" dari bukti, dan pengetahuan yang diasumsikan oleh pembuktian tentang saksi membentuk set pertanyaan yang hanya dapat dijawab oleh pihak yang memiliki pengetahuan tentang informasi tersebut. Oleh karena itu, pembukti memulai proses membuktikan dengan secara acak memilih pertanyaan, menghitung jawabannya, dan mengirimkannya kepada verifikator.

- **Tantangan**: Verifikator secara acak memilih pertanyaan lain dari set tersebut dan meminta pembuktian untuk menjawabnya.

- **Respon**: Pembuktian menerima pertanyaan tersebut, menghitung jawabannya, dan mengirimkannya kembali kepada verifikator. Respon dari pembukti memungkinkan verifikator untuk memeriksa apakah pembukti sebelumnya benar-benar memiliki akses ke saksi. Untuk memastikan pembukti tidak menebak secara sembarangan dan mendapatkan jawaban yang benar secara kebetulan, verifikator memilih lebih banyak pertanyaan untuk ditanyakan. Dengan mengulang interaksi ini berkali-kali, kemungkinan pembukti berpura-pura memiliki pengetahuan tentang saksi turun secara signifikan hingga verifikator puas.

Di atas menjelaskan struktur dari sebuah 'bukti tanpa pengetahuan interaktif'. Protokol bukti tanpa pengetahuan awal menggunakan pembuktian interaktif, di mana memverifikasi kebenaran suatu pernyataan memerlukan komunikasi bolak-balik antara pembukti dan verifikator.

Contoh yang bagus yang mengilustrasikan bagaimana bukti interaktif bekerja adalah kisah terkenal Jean-Jacques Quisquater mengenai [kisah gua Ali Baba](https://en.wikipedia.org/wiki/Zero-knowledge_proof#The_Ali_Baba_cave). Dalam cerita tersebut, Peggy (pembukti) ingin membuktikan kepada Victor (verifikator) bahwa dia tahu frasa rahasia untuk membuka pintu ajaib tanpa mengungkapkan frasa tersebut.

### Bukti tanpa pengetahuan non-interaktif {#non-interactive-zero-knowledge-proofs}

Meskipun revolusioner, pembuktian interaktif memiliki kegunaan terbatas karena memerlukan dua pihak yang tersedia dan berinteraksi secara berulang. Bahkan jika seorang verifikator yakin terhadap kejujuran seorang pembukti, bukti tersebut tidak akan tersedia untuk verifikasi independen (menghitung bukti baru memerlukan satu set pesan baru antara pembukti dan verifikator).

Untuk memecahkan masalah ini, Manuel Blum, Paul Feldman, dan Silvio Micali mengusulkan [bukti tanpa pengetahuan non-interaktif](https://dl.acm.org/doi/10.1145/62212.62222) pertama di mana pembukti dan verifikator memiliki kunci bersama. Hal ini memungkinkan pembukti untuk menunjukkan pengetahuan mereka tentang suatu informasi (yaitu, saksi) tanpa menyediakan informasi itu sendiri.

Tidak seperti bukti interaktif, bukti non-interaktif hanya memerlukan satu putaran komunikasi antara peserta (pembukti dan verifikator). Pembukti mengirimkan informasi rahasia ke dalam algoritma khusus untuk menghitung bukti tanpa pengetahuan. Bukti ini dikirimkan kepada verifikator, yang memeriksa bahwa pembukti mengetahui informasi rahasia menggunakan algoritma lain.

Pembuktian non-interaktif mengurangi komunikasi antara pembukti dan verifikator, menjadikan bukti ZK lebih efisien. Selain itu, setelah suatu bukti dihasilkan, bukti tersebut tersedia bagi siapa pun (dengan akses ke kunci bersama dan algoritma verifikasi) untuk memverifikasinya.

Bukti non-interaktif mewakili terobosan bagi teknologi bukti tanpa pengetahuan dan mendorong perkembangan sistem pembuktian yang digunakan saat ini. Kami membahas jenis-jenis bukti ini di bawah ini:

### Jenis-jenis bukti tanpa pengetahuan {#types-of-zero-knowledge-proofs}

#### ZK-SNARKs {#zk-snarks}

ZK-SNARK adalah akronim dari **Argumen Pengetahuan Tanpa Pengetahuan yang Ringkas dan Non-Interaktif**. Protokol ZK-SNARK memiliki kualitas-kualitas berikut:

- **Tanpa pengetahuan**: Verifikator dapat memvalidasi integritas suatu pernyataan tanpa mengetahui informasi lain tentang pernyataan tersebut. Satu-satunya pengetahuan yang dimiliki verifikator tentang pernyataan adalah apakah itu benar atau salah.

- **Ringkas**: Bukti tanpa pengetahuan lebih kecil daripada saksi dan dapat diverifikasi dengan cepat.

- **Non-interaktif**: Bukti ini 'non-interaktif' karena pembukti dan verifikator hanya berinteraksi sekali, tidak seperti bukti interaktif yang memerlukan beberapa putaran komunikasi.

- **Argumen**: Bukti ini memenuhi persyaratan 'kebenaran', sehingga kecurangan sangat tidak mungkin terjadi.

- **(Tentang) Pengetahuan**: Bukti tanpa pengetahuan tidak dapat dibangun tanpa akses ke informasi rahasia (saksi). Sulit, jika tidak mungkin, bagi seorang pembukti yang tidak memiliki saksi untuk menghitung bukti tanpa pengetahuan yang valid.

'Kunci bersama' yang disebutkan sebelumnya merujuk pada parameter publik yang pembuktian dan pemeriksa sepakat untuk digunakan dalam pembuatan dan verifikasi bukti. Menghasilkan parameter publik (yang secara kolektif dikenal sebagai String Referensi Bersama (CRS)) adalah operasi yang sensitif karena pentingnya dalam keamanan protokol. Jika entropi (acak) yang digunakan dalam menghasilkan CRS jatuh ke tangan pembuktian yang tidak jujur, mereka dapat menghitung bukti-bukti palsu.

[Komputasi multipihak (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) adalah cara untuk mengurangi risiko dalam menghasilkan parameter publik. Beberapa pihak berpartisipasi dalam sebuah [upacara pengaturan tepercaya](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), di mana setiap orang berkontribusi dengan beberapa nilai acak untuk menghasilkan CRS. Selama satu pihak jujur menghancurkan bagian entropinya, protokol ZK-SNARK tetap mempertahankan kebenaran komputasinya.

Pengaturan tepercaya mengharuskan pengguna untuk percaya pada peserta dalam pembentukan parameter. Namun, pengembangan ZK-STARK telah memungkinkan protokol pembuktian yang bekerja dengan pengaturan yang tidak tepercaya.

#### ZK-STARKs {#zk-starks}

ZK-STARK adalah singkatan dari **Argumen Pengetahuan yang Terukur dan Transparan**. ZK-STARK serupa dengan ZK-SNARK, hanya saja mereka:

- **Dapat Diskalakan**: ZK-STARK lebih cepat daripada ZK-SNARK dalam menghasilkan dan memverifikasi bukti ketika ukuran saksi lebih besar. Dengan bukti STARK, waktu pembuktian dan verifikasi hanya sedikit meningkat seiring dengan pertumbuhan saksi (waktu pembuktian dan verifikasi SNARK meningkat secara linear dengan ukuran saksi).

- **Transparan**: ZK-STARK mengandalkan acak yang dapat diverifikasi secara publik untuk menghasilkan parameter publik untuk pembuktian dan verifikasi alih-alih pengaturan yang dipercayai. Karena itu, mereka lebih transparan dibandingkan dengan ZK-SNARK.

ZK-STARK menghasilkan bukti yang lebih besar daripada ZK-SNARK, yang berarti umumnya memiliki beban verifikasi yang lebih tinggi. Namun, ada kasus (seperti membuktikan kumpulan data besar) di mana ZK-STARK mungkin lebih hemat biaya dibandingkan dengan ZK-SNARK.

## Kekurangan dalam menggunakan bukti tanpa pengetahuan {#drawbacks-of-using-zero-knowledge-proofs}

### Biaya perangkat keras {#hardware-costs}

Menghasilkan bukti tanpa pengetahuan melibatkan perhitungan yang sangat kompleks yang sebaiknya dilakukan pada mesin khusus. Karena mesin-mesin ini mahal, mereka sering di luar jangkauan individu biasa. Selain itu, aplikasi yang ingin menggunakan teknologi tanpa pengetahuan harus mempertimbangkan biaya perangkat keras—yang dapat meningkatkan biaya bagi pengguna akhir.

### Bukti biaya verifikasi {#proof-verification-costs}

Verifikasi bukti juga memerlukan perhitungan yang kompleks dan meningkatkan biaya dalam mengimplementasikan teknologi tanpa pengetahuan dalam aplikasi. Biaya ini sangat relevan dalam konteks pembuktian komputasi. Sebagai contoh, ZK-rollup membayar sekitar 500.000 gas untuk memverifikasi satu bukti ZK-SNARK di Ethereum, dengan ZK-STARK memerlukan biaya yang lebih tinggi lagi.

### Asumsi kepercayaan {#trust-assumptions}

Dalam ZK-SNARK, String Referensi Umum (parameter publik) dihasilkan sekali dan tersedia untuk digunakan ulang oleh pihak-pihak yang ingin berpartisipasi dalam protokol tanpa pengetahuan. Parameter publik dihasilkan melalui sebuah acara pengaturan kepercayaan, di mana para peserta diasumsikan jujur.

Namun pada kenyataannya, tidak ada cara bagi pengguna untuk menilai kejujuran para peserta dan pengguna harus memercayai kata-kata para pengembang. ZK-STARK bebas dari asumsi kepercayaan karena pada dasarnya yang digunakan dalam menghasilkan string dapat diverifikasi secara publik. Sementara itu, para peneliti sedang bekerja pada pengaturan tanpa kepercayaan untuk ZK-SNARK guna meningkatkan keamanan mekanisme pembuktian.

### Ancaman komputasi kuantum {#quantum-computing-threats}

ZK-SNARK menggunakan kriptografi kurva elips untuk enkripsi. Meskipun masalah logaritma diskrit kurva eliptik diasumsikan tidak dapat dipecahkan untuk saat ini, pengembangan komputer kuantum dapat mematahkan model keamanan ini di masa depan.

ZK-STARK dianggap kebal terhadap ancaman komputasi kuantum, karena hanya mengandalkan fungsi hash yang tahan tabrakan untuk keamanannya. Berbeda dengan pasangan kunci pribadi publik yang digunakan dalam kriptografi kurva eliptik, hash tahan tumbukan lebih sulit bagi algoritma komputasi kuantum untuk dipecahkan.

## Bacaan lebih lanjut {#further-reading}

- [Gambaran umum kasus penggunaan bukti tanpa pengetahuan](https://pse.dev/projects) — _Tim Eksplorasi Privasi dan Penskalaan_
- [SNARK vs. STARK vs. Recursive SNARK](https://www.alchemy.com/overviews/snarks-vs-starks) — _Tinjauan Alkimia_
- [Bukti tanpa Pengetahuan: Meningkatkan Privasi dalam sebuah Rantai blok](https://www.altoros.com/blog/zero-knowledge-proof-improving-privacy-for-a-blockchain/) — _Dmitry Lavrenov_
- [zk-SNARK — Contoh Bukti tanpa Pengetahuan yang Realistis dan Penjelasan Mendalam](https://medium.com/coinmonks/zk-snarks-a-realistic-zero-knowledge-example-and-deep-dive-c5e6eaa7131c) — _Adam Luciano_
- [ZK-STARK — Menciptakan Kepercayaan yang Dapat Diverifikasi, Bahkan Melawan Komputer Kuantum](https://medium.com/coinmonks/zk-starks-create-verifiable-trust-even-against-quantum-computers-dd9c6a2bb13d) — _Adam Luciano_
- [Perkiraan pengantar tentang bagaimana zk-SNARK bisa dilakukan](https://vitalik.eth.limo/general/2021/01/26/snarks.html) — _Vitalik Buterin_
- [Mengapa Bukti Tanpa Pengetahuan (ZKP) adalah Pengubah Permainan untuk Identitas Berdaulat Mandiri](https://frankiefab.hashnode.dev/why-zero-knowledge-proofs-zkps-is-a-game-changer-for-self-sovereign-identity) — _Franklin Ohaegbulam_

