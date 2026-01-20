---
title: Zero-Knowledge Proofs
description: Pengenalan non-teknis tentang bukti zero-knowledge untuk pemula.
lang: id
---

# Apa itu bukti tanpa pengetahuan? {#what-are-zk-proofs}

Bukti tanpa pengetahuan adalah cara untuk membuktikan keabsahan suatu pernyataan tanpa mengungkapkan pernyataan itu sendiri. 'Pembukti' adalah pihak yang mencoba membuktikan klaim, sedangkan 'pemeriksa' bertanggung jawab untuk memvalidasi klaim.

Bukti zero-knowledge pertama kali muncul dalam sebuah makalah tahun 1985, “[The knowledge complexity of interactive proof systems](http://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf)” yang memberikan definisi bukti zero-knowledge yang banyak digunakan saat ini:

> Protokol zero-knowledge adalah sebuah metode di mana satu pihak (pembukti) **dapat membuktikan** kepada pihak lain (pemverifikasi) **bahwa sesuatu itu benar, tanpa mengungkapkan informasi apa pun** selain fakta bahwa pernyataan spesifik ini benar.

Bukti tanpa pengetahuan telah mengalami perbaikan selama bertahun-tahun dan kini digunakan dalam beberapa aplikasi dunia nyata.

<YouTube id="fOGdb1CTu5c" />

## Mengapa kita memerlukan bukti tanpa pengetahuan? {#why-zero-knowledge-proofs-are-important}

Bukti tanpa pengetahuan mewakili terobosan dalam kriptografi terapan, karena mereka berjanji untuk meningkatkan keamanan informasi bagi individu. Pertimbangkan bagaimana Anda dapat membuktikan suatu klaim (misalnya, "Saya adalah warga negara X") kepada pihak lain (misalnya, penyedia layanan). Anda perlu menyediakan "bukti" untuk mendukung klaim, seperti paspor nasional atau izin mengemudi.

Namun, ada masalah dengan pendekatan ini, terutama kurangnya privasi. Informasi Identifikasi Pribadi (PII) yang dibagikan dengan layanan pihak ketiga disimpan dalam basis data pusat, yang rentan terhadap peretasan. Dengan pencurian identitas menjadi masalah yang kritis, ada panggilan untuk cara berbagi informasi sensitif yang lebih melindungi privasi.

Bukti zero-knowledge memecahkan masalah ini dengan **menghilangkan kebutuhan untuk mengungkapkan informasi demi membuktikan validitas klaim**. Protokol bukti tanpa pengetahuan menggunakan pernyataan (yang disebut 'saksi') sebagai masukan untuk menghasilkan bukti singkat keabsahannya. Bukti ini memberikan jaminan kuat bahwa suatu pernyataan benar tanpa mengungkap informasi yang digunakan dalam pembuatannya.

Kembali ke contoh sebelumnya, satu-satunya bukti yang Anda butuhkan untuk membuktikan klaim kewarganegaraan adalah bukti tanpa pengetahuan. Verifikator hanya perlu memeriksa apakah beberapa properti dari bukti tersebut benar agar meyakinkan bahwa pernyataan mendasar juga benar.

## Kasus penggunaan bukti zero-knowledge {#use-cases-for-zero-knowledge-proofs}

### Pembayaran anonim {#anonymous-payments}

Pembayaran kartu kredit sering kali terlihat oleh beberapa pihak, termasuk penyedia pembayaran, bank, dan pihak-pihak lain yang berkepentingan (misalnya, otoritas pemerintah). Meskipun pemantauan keuangan memiliki manfaat untuk mengidentifikasi aktivitas ilegal, hal tersebut juga merusak privasi seorang pengguna.

Mata uang kripto dimaksudkan untuk memberikan sarana bagi pengguna untuk melakukan transaksi pribadi antar sesama tanpa perantara. Namun, sebagian besar transaksi mata uang kripto terlihat dengan terbuka pada rantai blok publik. Identitas pengguna sering kali bersifat pseudonim dan sengaja ditautkan ke identitas dunia nyata (misalnya, dengan menyertakan alamat ETH di profil Twitter atau GitHub) atau dapat dikaitkan dengan identitas dunia nyata menggunakan analisis data on-chain dan off-chain dasar.

Terdapat "mata uang privasi" khusus yang dirancang untuk transaksi yang benar-benar anonim. Rantai blok yang berfokus pada privasi, seperti Zcash dan Monero, melindungi detail transaksi, termasuk alamat pengirim/penerima, jenis aset, jumlah, dan jangka waktu transaksi.

Dengan memasukkan teknologi zero-knowledge ke dalam protokol, jaringan [blockchain](/glossary/#blockchain) yang berfokus pada privasi memungkinkan [node](/glossary/#node) untuk memvalidasi transaksi tanpa perlu mengakses data transaksi. [EIP-7503](https://eips.ethereum.org/EIPS/eip-7503) adalah contoh desain yang diusulkan yang akan memungkinkan transfer nilai pribadi asli di blockchain Ethereum. Namun, proposal semacam itu sulit untuk diimplementasikan karena adanya masalah keamanan, peraturan, dan UX.

**Bukti tanpa pengetahuan juga diterapkan untuk menganonimkan transaksi di blockchain publik**. Contohnya adalah Tornado Cash, layanan terdesentralisasi dan non-kustodial yang memungkinkan pengguna untuk melakukan transaksi pribadi di Ethereum. Tornado Cash menggunakan bukti tanpa pengetahuan untuk menyembunyikan detail transaksi dan menjamin privasi finansial. Sayangnya, karena ini adalah perangkat privasi "opt-in," mereka seringkali dikaitkan dengan aktivitas ilegal. Untuk mengatasi hal ini, privasi pada akhirnya harus menjadi standar bawaan di rantai blok publik. Pelajari lebih lanjut tentang [privasi di Ethereum](/privacy/).

### Perlindungan identitas {#identity-protection}

Sistem manajemen identitas saat ini mengancam informasi pribadi. Bukti tanpa pengetahuan dapat membantu individu memvalidasi identitas sambil melindungi detail sensitif.

Bukti zero-knowledge sangat berguna dalam konteks [identitas terdesentralisasi](/decentralized-identity/). Identitas terdesentralisasi (juga dikenal sebagai 'identitas berdaulat diri') memberikan individu kemampuan untuk mengontrol akses ke pengenal pribadi. Membuktikan kewarganegaraan Anda tanpa mengungkapkan detail nomor identifikasi pajak atau paspor adalah contoh bagus bagaimana teknologi bukti tanpa pengetahuan memungkinkan identitas terdesentralisasi.

<Alert variant="info">
  <AlertEmoji text="💡" />
  <AlertContent>
    <AlertTitle className="mb-2">
      ZKP + Identitas dalam aksi: ID Digital Nasional (NDI) Bhutan di Ethereum
    </AlertTitle>
    <AlertDescription>
      <p>
        Contoh dunia nyata penggunaan ZKP untuk sistem manajemen identitas adalah sistem ID Digital Nasional (NDI) Kerajaan Bhutan, yang dibangun di atas Ethereum. NDI Bhutan menggunakan ZKP untuk memungkinkan warga negara secara kriptografis membuktikan fakta tentang diri mereka sendiri, seperti "Saya adalah warga negara" atau "Saya berusia di atas 18 tahun," tanpa mengungkapkan data pribadi yang sensitif pada ID mereka.
      </p>
      <p>
        Pelajari lebih lanjut tentang NDI Bhutan di <a href="/decentralized-identity/#national-and-government-id">studi kasus Identitas Terdesentralisasi</a>.
      </p>
</AlertDescription>
</AlertContent>
</Alert>

### Bukti Kemanusiaan {#proof-of-humanity}

Salah satu contoh bukti zero-knowledge yang paling banyak digunakan saat ini adalah [protokol World ID](https://world.org/blog/world/world-id-faqs), yang dapat dianggap sebagai “paspor digital global untuk era AI.” Hal ini memungkinkan orang untuk membuktikan bahwa mereka adalah individu yang unik tanpa mengungkapkan informasi pribadi. Hal ini dicapai melalui perangkat yang disebut Orb, yang memindai iris mata seseorang dan menghasilkan kode iris mata. Kode iris mata diperiksa dan diverifikasi untuk mengonfirmasi bahwa orang tersebut adalah manusia yang unik secara biologis. Setelah verifikasi, sebuah komitmen identitas yang dihasilkan pada perangkat pengguna (dan tidak ditautkan ke atau berasal dari data biometrik) ditambahkan ke sebuah daftar yang aman pada rantai blok. Kemudian, kapan pun pengguna ingin membuktikan bahwa mereka adalah orang yang terverifikasi–untuk masuk, memberikan suara, atau melakukan tindakan lain–mereka dapat membuat bukti tanpa pengetahuan yang mengonfirmasi keanggotaan mereka di dalam daftar. Kelebihan dari penggunaan bukti tanpa pengetahuan adalah bahwa hanya satu pernyataan yang akan terungkap: orang ini unik. Selebihnya tetap bersifat pribadi.

World ID bergantung pada [protokol Semaphore](https://docs.semaphore.pse.dev/) yang dikembangkan oleh [tim PSE](https://pse.dev/) di Ethereum Foundation. Semaphore dirancang untuk menjadi cara yang ringan namun kuat untuk menghasilkan dan memverifikasi bukti-bukti tanpa pengetahuan. Fitur ini memungkinkan pengguna membuktikan bahwa mereka adalah bagian dari sebuah grup (dalam hal ini, manusia yang telah diverifikasi) tanpa harus menunjukkan siapa anggota grup tersebut. Semaphore juga sangat fleksibel, memungkinkan grup dibuat berdasarkan berbagai kriteria seperti verifikasi identitas, partisipasi dalam acara, atau kepemilikan kredensial.

### Autentikasi {#authentication}

Menggunakan layanan daring memerlukan pembuktian identitas dan hak Anda untuk mengakses platform-platform tersebut. Hal ini seringkali memerlukan penyediaan informasi pribadi, seperti nama, alamat email, tanggal lahir, dan sebagainya. Anda mungkin juga perlu menghafal kata sandi panjang atau berisiko kehilangan akses.

Namun, bukti tanpa pengetahuan dapat menyederhanakan otentikasi baik untuk platform maupun pengguna. Setelah bukti ZK telah dihasilkan menggunakan input publik (misalnya, data yang membuktikan keanggotaan pengguna pada platform) dan input pribadi (misalnya, detail pengguna), pengguna dapat dengan mudah menyajikannya untuk mengotentikasi identitas mereka saat perlu mengakses layanan tersebut. Hal ini meningkatkan pengalaman bagi pengguna dan membebaskan organisasi dari kebutuhan untuk menyimpan sejumlah besar informasi pengguna.

### Komputasi yang dapat diverifikasi {#verifiable-computation}

Komputasi yang dapat diverifikasi adalah aplikasi lain dari teknologi bukti tanpa pengetahuan untuk meningkatkan desain rantai blok. Komputasi yang dapat diverifikasi memungkinkan kita untuk mengalihkan komputasi ke entitas lain sambil mempertahankan hasil yang dapat diverifikasi. Entitas tersebut mengirimkan hasil beserta bukti yang terverifikasi bahwa program dieksekusi dengan benar.

Komputasi yang dapat diverifikasi **sangat penting untuk meningkatkan kecepatan pemrosesan di blockchain** tanpa mengurangi keamanan. Untuk memahaminya memerlukan pengetahuan tentang perbedaan dalam solusi yang diusulkan untuk meningkatkan Penskalaan Ethereum.

[Solusi penskalaan on-chain](/developers/docs/scaling/#onchain-scaling), seperti sharding, memerlukan modifikasi ekstensif pada lapisan dasar blockchain. Tetapi, pendekatan ini sangat kompleks dan kesalahan dalam implementasi dapat merusak model keamanan Ethereum.

[Solusi penskalaan off-chain](/developers/docs/scaling/#offchain-scaling) tidak memerlukan perancangan ulang protokol inti Ethereum. Sebaliknya, mereka mengandalkan model komputasi yang sementara untuk meningkatkan keluaran pada lapisan dasar Ethereum.

Berikut adalah bagaimana hal tersebut bekerja dalam praktiknya:

- Sebagai gantinya, Ethereum tidak memproses setiap transaksi secara langsung, melainkan memindahkan eksekusinya ke rantai terpisah.

- Setelah melakukan transaksi, rantai lain mengembalikan hasilnya agar dapat diterapkan pada status Ethereum.

Manfaatnya adalah Ethereum tidak perlu melakukan eksekusi apa pun dan hanya perlu menerapkan hasil dari komputasi yang dioutsourcing ke keadaannya. Hal ini mengurangi kepadatan jaringan dan juga meningkatkan kecepatan transaksi (protokol di luar rantai dioptimalkan untuk eksekusi yang lebih cepat).

Rantai membutuhkan cara untuk memvalidasi transaksi di luar rantai tanpa mengeksekusinya kembali, atau nilai eksekusi di luar rantai akan hilang.

Di sinilah komputasi yang dapat diverifikasi berperan. Ketika sebuah simpul mengeksekusi transaksi di luar Ethereum, bukti tanpa pengetahuan akan dikirim oleh Ethereum untuk membuktikan kebenaran eksekusi di luar rantai. Bukti ini (disebut [bukti validitas](/glossary/#validity-proof)) menjamin bahwa sebuah transaksi valid, yang memungkinkan Ethereum untuk menerapkan hasilnya ke keadaannya—tanpa menunggu siapa pun menyengketakannya.

[Rollup zero-knowledge](/developers/docs/scaling/zk-rollups) dan [validium](/developers/docs/scaling/validium/) adalah dua solusi penskalaan off-chain yang menggunakan bukti validitas untuk menyediakan skalabilitas yang aman. Protokol ini mengeksekusi ribuan transaksi di luar rantai dan mengirimkan bukti untuk verifikasi di Ethereum. Hasil-hasil tersebut dapat diterapkan segera setelah bukti diverifikasi, memungkinkan Ethereum memproses lebih banyak transaksi tanpa meningkatkan perhitungan pada lapisan dasar.

### Mengurangi penyuapan dan kolusi dalam pemungutan suara on-chain {#secure-blockchain-voting}

Skema pemungutan suara rantai blok memiliki banyak karakteristik yang menguntungkan: mereka sepenuhnya dapat diaudit, aman terhadap serangan, tahan terhadap sensor, dan bebas dari pembatasan wilayah. Namun, bahkan skema pemungutan suara on-chain pun tidak kebal terhadap masalah **kolusi**.

Didefinisikan sebagai "berkoordinasi untuk membatasi persaingan terbuka dengan memperdaya, menipu, dan mengelabui orang lain," kolusi dapat mengambil bentuk seorang aktor jahat yang memengaruhi pemungutan suara dengan menawarkan suap. Misalnya, Alice mungkin menerima suap dari Bob untuk memilih `option B` pada surat suara meskipun dia lebih menyukai `option A`.

Suap dan kolusi membatasi efektivitas dari setiap proses yang menggunakan pemungutan suara sebagai mekanisme penanda (terutama di mana pengguna dapat membuktikan bagaimana mereka memilih). Hal ini dapat memiliki konsekuensi yang signifikan, terutama di mana suara bertanggung jawab untuk mengalokasikan sumber daya yang langka.

Misalnya, [mekanisme pendanaan kuadratik](https://www.radicalxchange.org/wiki/plural-funding/) mengandalkan donasi untuk mengukur preferensi untuk opsi tertentu di antara berbagai proyek barang publik. Setiap sumbangan dihitung sebagai "suara" untuk proyek tertentu, dengan proyek-proyek yang menerima lebih banyak suara mendapatkan lebih banyak dana dari pool pencocokan.

Menggunakan pemungutan suara di dalam rantai membuat pendanaan kuadratik rentan terhadap kolusi: transaksi rantai blok bersifat publik, sehingga penyuap dapat memeriksa aktivitas di dalam rantai penerima suap untuk melihat cara mereka “memberikan suara”. Dengan cara ini, pendanaan kuadratik tidak lagi menjadi cara yang efektif untuk mengalokasikan dana berdasarkan preferensi yang terkumpul dari komunitas.

Untungnya, solusi yang lebih baru seperti MACI (Infrastruktur Anti-Kolusi Minimum) menggunakan bukti zero-knowledge untuk membuat pemungutan suara on-chain (misalnya, mekanisme pendanaan kuadratik) tahan terhadap penyuapan dan kolusi. MACI adalah seperangkat smart contract dan skrip yang memungkinkan administrator pusat (disebut "koordinator") untuk mengagregasi suara dan menghitung hasil _tanpa_ mengungkapkan secara spesifik tentang bagaimana setiap individu memberikan suara. Meskipun begitu, masih memungkinkan untuk memverifikasi bahwa suara telah dihitung dengan benar, atau mengonfirmasi bahwa individu tertentu berpartisipasi dalam putaran pemungutan suara.

#### Bagaimana cara kerja MACI dengan bukti tanpa pengetahuan? {#how-maci-works-with-zk-proofs}

Pada awalnya, koordinator mendeploy kontrak MACI di Ethereum, setelah itu pengguna dapat mendaftar untuk memilih (dengan mendaftarkan kunci publik mereka dalam kontrak pintar tersebut). Pengguna memasukkan suara dengan mengirim pesan yang dienkripsi dengan kunci publik mereka ke kontrak pintar (suara yang sah harus ditandatangani dengan kunci publik terbaru yang terkait dengan identitas pengguna, di antara kriteria lainnya). Setelah itu, koordinator akan memproses semua pesan setelah periode pemungutan suara berakhir, menghitung suara, dan memverifikasi hasilnya di rantai blok.

Dalam MACI, bukti tanpa pengetahuan digunakan untuk memastikan kebenaran komputasi dengan membuatnya tidak mungkin bagi koordinator untuk salah memproses suara dan menghitung hasil. Ini dicapai dengan mewajibkan koordinator untuk menghasilkan bukti ZK-SNARK yang memverifikasi bahwa a) semua pesan diproses dengan benar b) hasil akhir sesuai dengan jumlah semua suara yang _valid_.

Dengan demikian, bahkan tanpa membagikan rincian suara per pengguna (seperti biasanya), MACI menjamin integritas hasil yang dihitung selama proses penghitungan. Fitur ini berguna dalam mengurangi efektivitas skema kolusi dasar. Kita dapat menjelajahi kemungkinan ini dengan menggunakan contoh sebelumnya di mana Bob memberi suap kepada Alice agar memilih suatu opsi:

- Alice mendaftar untuk memilih dengan mengirimkan kunci publik ke dalam kontrak pintar.
- Alice setuju untuk memilih `option B` dengan imbalan suap dari Bob.
- Alice memilih `option B`.
- Alice secara rahasia mengirimkan transaksi terenkripsi untuk mengganti kunci publik yang terkait dengan identitasnya.
- Alice mengirimkan pesan lain (terenkripsi) ke smart contract untuk memilih `option A` menggunakan kunci publik yang baru.
- Alice menunjukkan transaksi kepada Bob yang menunjukkan dia memilih `option B` (yang tidak valid karena kunci publik tidak lagi terkait dengan identitas Alice di dalam sistem)
- Saat memproses pesan, koordinator melewati suara Alice untuk `option B` dan hanya menghitung suara untuk `option A`. Oleh karena itu, upaya Bob untuk berkolusi dengan Alice dan memanipulasi pemungutan suara di dalam rantai gagal.

Menggunakan MACI _memang_ memerlukan kepercayaan kepada koordinator untuk tidak berkolusi dengan penyuap atau mencoba menyuap pemilih itu sendiri. Koordinator dapat mendekripsi pesan pengguna (yang diperlukan untuk membuat bukti), sehingga mereka dapat dengan akurat memverifikasi bagaimana setiap orang memberikan suaranya.

Tetapi dalam kasus-kasus di mana koordinator tetap jujur, MACI merupakan alat yang ampuh untuk menjamin kebersihan pemungutan suara di dalam rantai. Ini menjelaskan popularitasnya di antara aplikasi pendanaan kuadratik (mis., [clr.fund](https://clr.fund/#/about/maci)) yang sangat bergantung pada integritas pilihan suara setiap individu.

[Pelajari lebih lanjut tentang MACI](https://maci.pse.dev/).

## Bagaimana bukti tanpa pengetahuan bekerja? {#how-do-zero-knowledge-proofs-work}

Bukti tanpa pengetahuan memungkinkan Anda membuktikan kebenaran suatu pernyataan tanpa berbagi isi pernyataan tersebut atau mengungkapkan bagaimana Anda menemukan kebenarannya. Untuk membuat ini menjadi mungkin, protokol bukti tanpa pengetahuan bergantung pada algoritma yang mengambil beberapa data sebagai masukan dan mengembalikan 'benar' atau 'salah' sebagai luaran.

Protokol bukti tanpa pengetahuan harus memenuhi kriteria berikut:

1. **Kelengkapan**: Jika inputnya valid, protokol zero-knowledge selalu mengembalikan ‘benar’. Oleh karena itu, jika pernyataan mendasar benar, dan pembuktian dan verifikator bertindak jujur, bukti dapat diterima.

2. **Kesahihan**: Jika inputnya tidak valid, secara teoretis mustahil untuk menipu protokol zero-knowledge agar mengembalikan ‘benar’. Oleh karena itu, pembuktian yang berbohong tidak dapat menipu verifikator yang jujur untuk percaya bahwa suatu pernyataan yang tidak valid adalah benar (kecuali dengan margin probabilitas yang sangat kecil).

3. **Zero-knowledge**: Pemverifikasi tidak mempelajari apa pun tentang suatu pernyataan di luar validitas atau kepalsuannya (mereka memiliki “pengetahuan nol” atas pernyataan tersebut). Persyaratan ini juga mencegah verifikator untuk mendapatkan masukan asli (isi pernyataan) dari bukti.

Dalam bentuk dasarnya, bukti zero-knowledge terdiri dari tiga elemen: **saksi**, **tantangan**, dan **respons**.

- **Saksi**: Dengan bukti zero-knowledge, pembukti ingin membuktikan pengetahuan tentang beberapa informasi tersembunyi. Informasi rahasia adalah "saksi" dari bukti, dan pengetahuan yang diasumsikan oleh pembuktian tentang saksi membentuk set pertanyaan yang hanya dapat dijawab oleh pihak yang memiliki pengetahuan tentang informasi tersebut. Oleh karena itu, pembukti memulai proses membuktikan dengan secara acak memilih pertanyaan, menghitung jawabannya, dan mengirimkannya kepada verifikator.

- **Tantangan**: Pemverifikasi secara acak memilih pertanyaan lain dari set tersebut dan meminta pembukti untuk menjawabnya.

- **Respons**: Pembukti menerima pertanyaan, menghitung jawaban, dan mengembalikannya kepada pemverifikasi. Respon dari pembukti memungkinkan verifikator untuk memeriksa apakah pembukti sebelumnya benar-benar memiliki akses ke saksi. Untuk memastikan pembukti tidak menebak secara sembarangan dan mendapatkan jawaban yang benar secara kebetulan, verifikator memilih lebih banyak pertanyaan untuk ditanyakan. Dengan mengulang interaksi ini berkali-kali, kemungkinan pembukti berpura-pura memiliki pengetahuan tentang saksi turun secara signifikan hingga verifikator puas.

Di atas menjelaskan struktur dari sebuah 'bukti tanpa pengetahuan interaktif'. Protokol bukti tanpa pengetahuan awal menggunakan pembuktian interaktif, di mana memverifikasi kebenaran suatu pernyataan memerlukan komunikasi bolak-balik antara pembukti dan verifikator.

Contoh bagus yang mengilustrasikan cara kerja bukti interaktif adalah kisah [gua Ali Baba](https://en.wikipedia.org/wiki/Zero-knowledge_proof#The_Ali_Baba_cave) yang terkenal dari Jean-Jacques Quisquater. Dalam cerita tersebut, Peggy (pembukti) ingin membuktikan kepada Victor (verifikator) bahwa dia tahu frasa rahasia untuk membuka pintu ajaib tanpa mengungkapkan frasa tersebut.

### Bukti zero-knowledge non-interaktif {#non-interactive-zero-knowledge-proofs}

Meskipun revolusioner, pembuktian interaktif memiliki kegunaan terbatas karena memerlukan dua pihak yang tersedia dan berinteraksi secara berulang. Bahkan jika seorang verifikator yakin terhadap kejujuran seorang pembukti, bukti tersebut tidak akan tersedia untuk verifikasi independen (menghitung bukti baru memerlukan satu set pesan baru antara pembukti dan verifikator).

Untuk mengatasi masalah ini, Manuel Blum, Paul Feldman, dan Silvio Micali menyarankan [bukti zero-knowledge non-interaktif](https://dl.acm.org/doi/10.1145/62212.62222) pertama di mana pembukti dan pemverifikasi memiliki kunci bersama. Hal ini memungkinkan pembukti untuk menunjukkan pengetahuan mereka tentang suatu informasi (yaitu, saksi) tanpa menyediakan informasi itu sendiri.

Tidak seperti bukti interaktif, bukti non-interaktif hanya memerlukan satu putaran komunikasi antara peserta (pembukti dan verifikator). Pembukti mengirimkan informasi rahasia ke dalam algoritma khusus untuk menghitung bukti tanpa pengetahuan. Bukti ini dikirimkan kepada verifikator, yang memeriksa bahwa pembukti mengetahui informasi rahasia menggunakan algoritma lain.

Pembuktian non-interaktif mengurangi komunikasi antara pembukti dan verifikator, menjadikan bukti ZK lebih efisien. Selain itu, setelah suatu bukti dihasilkan, bukti tersebut tersedia bagi siapa pun (dengan akses ke kunci bersama dan algoritma verifikasi) untuk memverifikasinya.

Bukti non-interaktif mewakili terobosan bagi teknologi bukti tanpa pengetahuan dan mendorong perkembangan sistem pembuktian yang digunakan saat ini. Kami membahas jenis-jenis bukti ini di bawah ini:

### Jenis-jenis bukti zero-knowledge {#types-of-zero-knowledge-proofs}

#### ZK-SNARK {#zk-snarks}

ZK-SNARK adalah akronim untuk **Argumen Pengetahuan Non-Interaktif Ringkas Zero-Knowledge**. Protokol ZK-SNARK memiliki kualitas-kualitas berikut:

- **Zero-knowledge**: Seorang pemverifikasi dapat memvalidasi integritas sebuah pernyataan tanpa mengetahui apa pun tentang pernyataan tersebut. Satu-satunya pengetahuan yang dimiliki verifikator tentang pernyataan adalah apakah itu benar atau salah.

- **Ringkas**: Bukti zero-knowledge lebih kecil dari saksi dan dapat diverifikasi dengan cepat.

- **Non-interaktif**: Bukti ini ‘non-interaktif’ karena pembukti dan pemverifikasi hanya berinteraksi sekali, tidak seperti bukti interaktif yang memerlukan beberapa putaran komunikasi.

- **Argumen**: Bukti ini memenuhi persyaratan ‘kesahihan’, sehingga kecurangan sangat tidak mungkin terjadi.

- **(Tentang) Pengetahuan**: Bukti zero-knowledge tidak dapat dibuat tanpa akses ke informasi rahasia (saksi). Sulit, jika tidak mungkin, bagi seorang pembukti yang tidak memiliki saksi untuk menghitung bukti tanpa pengetahuan yang valid.

'Kunci bersama' yang disebutkan sebelumnya merujuk pada parameter publik yang pembuktian dan pemeriksa sepakat untuk digunakan dalam pembuatan dan verifikasi bukti. Menghasilkan parameter publik (yang secara kolektif dikenal sebagai String Referensi Bersama (CRS)) adalah operasi yang sensitif karena pentingnya dalam keamanan protokol. Jika entropi (acak) yang digunakan dalam menghasilkan CRS jatuh ke tangan pembuktian yang tidak jujur, mereka dapat menghitung bukti-bukti palsu.

[Komputasi multi-pihak (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) adalah cara untuk mengurangi risiko dalam menghasilkan parameter publik. Beberapa pihak berpartisipasi dalam [upacara penyiapan tepercaya](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), di mana setiap orang menyumbangkan beberapa nilai acak untuk menghasilkan CRS. Selama satu pihak jujur menghancurkan bagian entropinya, protokol ZK-SNARK tetap mempertahankan kebenaran komputasinya.

Pengaturan tepercaya mengharuskan pengguna untuk percaya pada peserta dalam pembentukan parameter. Namun, pengembangan ZK-STARK telah memungkinkan protokol pembuktian yang bekerja dengan pengaturan yang tidak tepercaya.

#### ZK-STARK {#zk-starks}

ZK-STARK adalah akronim untuk **Argumen Pengetahuan Zero-Knowledge yang Skalabel dan Transparan**. ZK-STARK serupa dengan ZK-SNARK, hanya saja mereka:

- **Skalabel**: ZK-STARK lebih cepat daripada ZK-SNARK dalam menghasilkan dan memverifikasi bukti ketika ukuran saksi lebih besar. Dengan bukti STARK, waktu pembuktian dan verifikasi hanya sedikit meningkat seiring dengan pertumbuhan saksi (waktu pembuktian dan verifikasi SNARK meningkat secara linear dengan ukuran saksi).

- **Transparan**: ZK-STARK mengandalkan keacakan yang dapat diverifikasi secara publik untuk menghasilkan parameter publik untuk pembuktian dan verifikasi, alih-alih penyiapan tepercaya. Karena itu, mereka lebih transparan dibandingkan dengan ZK-SNARK.

ZK-STARK menghasilkan bukti yang lebih besar daripada ZK-SNARK, yang berarti umumnya memiliki beban verifikasi yang lebih tinggi. Namun, ada kasus (seperti membuktikan kumpulan data besar) di mana ZK-STARK mungkin lebih hemat biaya dibandingkan dengan ZK-SNARK.

## Kekurangan penggunaan bukti zero-knowledge {#drawbacks-of-using-zero-knowledge-proofs}

### Biaya perangkat keras {#hardware-costs}

Menghasilkan bukti tanpa pengetahuan melibatkan perhitungan yang sangat kompleks yang sebaiknya dilakukan pada mesin khusus. Karena mesin-mesin ini mahal, mereka sering di luar jangkauan individu biasa. Selain itu, aplikasi yang ingin menggunakan teknologi tanpa pengetahuan harus mempertimbangkan biaya perangkat keras—yang dapat meningkatkan biaya bagi pengguna akhir.

### Biaya verifikasi bukti {#proof-verification-costs}

Verifikasi bukti juga memerlukan perhitungan yang kompleks dan meningkatkan biaya dalam mengimplementasikan teknologi tanpa pengetahuan dalam aplikasi. Biaya ini sangat relevan dalam konteks pembuktian komputasi. Sebagai contoh, ZK-rollup membayar sekitar 500.000 gas untuk memverifikasi satu bukti ZK-SNARK di Ethereum, dengan ZK-STARK memerlukan biaya yang lebih tinggi lagi.

### Asumsi kepercayaan {#trust-assumptions}

Dalam ZK-SNARK, String Referensi Umum (parameter publik) dihasilkan sekali dan tersedia untuk digunakan ulang oleh pihak-pihak yang ingin berpartisipasi dalam protokol tanpa pengetahuan. Parameter publik dihasilkan melalui sebuah acara pengaturan kepercayaan, di mana para peserta diasumsikan jujur.

Namun pada kenyataannya, tidak ada cara bagi pengguna untuk menilai kejujuran para peserta dan pengguna harus memercayai kata-kata para pengembang. ZK-STARK bebas dari asumsi kepercayaan karena pada dasarnya yang digunakan dalam menghasilkan string dapat diverifikasi secara publik. Sementara itu, para peneliti sedang bekerja pada pengaturan tanpa kepercayaan untuk ZK-SNARK guna meningkatkan keamanan mekanisme pembuktian.

### Ancaman komputasi kuantum {#quantum-computing-threats}

ZK-SNARK menggunakan kriptografi kurva elips untuk enkripsi. Meskipun masalah logaritma diskrit kurva eliptik diasumsikan tidak dapat dipecahkan untuk saat ini, pengembangan komputer kuantum dapat mematahkan model keamanan ini di masa depan.

ZK-STARK dianggap kebal terhadap ancaman komputasi kuantum, karena hanya mengandalkan fungsi hash yang tahan tabrakan untuk keamanannya. Berbeda dengan pasangan kunci pribadi publik yang digunakan dalam kriptografi kurva eliptik, hash tahan tumbukan lebih sulit bagi algoritma komputasi kuantum untuk dipecahkan.

## Bacaan lebih lanjut {#further-reading}

- [Ikhtisar kasus penggunaan untuk bukti zero-knowledge](https://pse.dev/projects) — _Tim Privacy and Scaling Explorations_
- [SNARK vs. STARK vs. SNARK Rekursif](https://www.alchemy.com/overviews/snarks-vs-starks) — _Alchemy Overviews_
- [Bukti Zero-Knowledge: Meningkatkan Privasi di Blockchain](https://www.altoros.com/blog/zero-knowledge-proof-improving-privacy-for-a-blockchain/) — _Dmitry Lavrenov_
- [zk-SNARK — Contoh Zero-Knowledge yang Realistis dan Penyelaman Mendalam](https://medium.com/coinmonks/zk-snarks-a-realistic-zero-knowledge-example-and-deep-dive-c5e6eaa7131c) — _Adam Luciano_
- [ZK-STARK — Menciptakan Kepercayaan yang Dapat Diverifikasi, bahkan terhadap Komputer Kuantum](https://medium.com/coinmonks/zk-starks-create-verifiable-trust-even-against-quantum-computers-dd9c6a2bb13d) — _Adam Luciano_
- [Pengenalan perkiraan tentang bagaimana zk-SNARK dimungkinkan](https://vitalik.eth.limo/general/2021/01/26/snarks.html) — _Vitalik Buterin_
- [Mengapa Bukti Zero-Knowledge (ZKP) Merupakan Pengubah Permainan untuk Identitas Berdaulat Sendiri](https://frankiefab.hashnode.dev/why-zero-knowledge-proofs-zkps-is-a-game-changer-for-self-sovereign-identity) — _Franklin Ohaegbulam_
- [Penjelasan EIP-7503: Mengaktifkan Transfer Pribadi di Ethereum dengan Bukti ZK](https://research.2077.xyz/eip-7503-zero-knowledge-wormholes-for-private-ethereum-transactions#introduction) — _Emmanuel Awosika_
- [Permainan Kartu ZK: permainan untuk mempelajari dasar-dasar ZK dan kasus penggunaan di dunia nyata](https://github.com/ZK-card/zk-cards) - _ZK-Cards_
