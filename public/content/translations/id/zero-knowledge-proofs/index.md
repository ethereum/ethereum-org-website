---
title: Apa itu bukti tanpa pengetahuan?
metaTitle: Bukti tanpa pengetahuan
description: Pengantar non-teknis tentang bukti tanpa pengetahuan untuk pemula.
lang: id
---

Bukti tanpa pengetahuan adalah cara untuk membuktikan validitas suatu pernyataan tanpa mengungkapkan pernyataan itu sendiri. 'Pembukti' adalah pihak yang mencoba membuktikan suatu klaim, sedangkan 'pemverifikasi' bertanggung jawab untuk memvalidasi klaim tersebut.

Bukti tanpa pengetahuan pertama kali muncul dalam makalah tahun 1985, “[The knowledge complexity of interactive proof systems](http://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf)” yang memberikan definisi bukti tanpa pengetahuan yang banyak digunakan saat ini:

> Protokol zero-knowledge adalah metode di mana satu pihak (pembukti) **dapat membuktikan** kepada pihak lain (pemverifikasi) **bahwa sesuatu itu benar, tanpa mengungkapkan informasi apa pun** selain fakta bahwa pernyataan spesifik ini benar.

Bukti tanpa pengetahuan telah meningkat selama bertahun-tahun dan sekarang digunakan dalam beberapa aplikasi dunia nyata.

<VideoWatch slug="zero-knowledge-proofs-5-levels" />

## Mengapa kita membutuhkan bukti tanpa pengetahuan? {#why-zero-knowledge-proofs-are-important}

Bukti tanpa pengetahuan mewakili terobosan dalam kriptografi terapan, karena menjanjikan peningkatan keamanan informasi bagi individu. Pertimbangkan bagaimana Anda mungkin membuktikan sebuah klaim (misalnya, “Saya adalah warga negara X”) kepada pihak lain (misalnya, penyedia layanan). Anda harus memberikan “bukti” untuk mendukung klaim Anda, seperti paspor nasional atau SIM.

Namun ada masalah dengan pendekatan ini, terutama kurangnya privasi. Informasi Identitas Pribadi (PII) yang dibagikan dengan layanan pihak ketiga disimpan dalam basis data pusat, yang rentan terhadap peretasan. Dengan pencurian identitas yang menjadi masalah kritis, ada seruan untuk cara berbagi informasi sensitif yang lebih melindungi privasi.

Bukti tanpa pengetahuan memecahkan masalah ini dengan **menghilangkan kebutuhan untuk mengungkapkan informasi untuk membuktikan validitas klaim**. Protokol zero-knowledge menggunakan pernyataan (disebut 'Saksi') sebagai input untuk menghasilkan bukti ringkas tentang validitasnya. Bukti ini memberikan jaminan kuat bahwa suatu pernyataan benar tanpa mengekspos informasi yang digunakan dalam membuatnya.

Kembali ke contoh kita sebelumnya, satu-satunya bukti yang Anda butuhkan untuk membuktikan klaim kewarganegaraan Anda adalah bukti tanpa pengetahuan. Pemverifikasi hanya perlu memeriksa apakah properti tertentu dari bukti tersebut benar untuk diyakinkan bahwa pernyataan yang mendasarinya juga benar.

## Kasus penggunaan untuk bukti tanpa pengetahuan {#use-cases-for-zero-knowledge-proofs}

### Pembayaran anonim {#anonymous-payments}

Pembayaran kartu kredit sering kali terlihat oleh banyak pihak, termasuk penyedia pembayaran, bank, dan pihak berkepentingan lainnya (misalnya, otoritas pemerintah). Meskipun pengawasan keuangan memiliki manfaat untuk mengidentifikasi aktivitas ilegal, hal itu juga merusak privasi warga biasa.

Mata uang kripto dimaksudkan untuk menyediakan sarana bagi pengguna untuk melakukan transaksi peer-to-peer yang privat. Namun sebagian besar transaksi mata uang kripto terlihat secara terbuka di rantai blok publik. Identitas pengguna sering kali menggunakan nama samaran dan baik secara sengaja ditautkan ke identitas dunia nyata (misalnya, dengan menyertakan alamat ETH di profil Twitter atau GitHub) atau dapat dikaitkan dengan identitas dunia nyata menggunakan analisis data onchain dan offchain dasar.

Ada “koin privasi” khusus yang dirancang untuk transaksi yang sepenuhnya anonim. Rantai blok yang berfokus pada privasi, seperti Zcash dan Monero, melindungi detail transaksi, termasuk alamat pengirim/penerima, jenis aset, kuantitas, dan garis waktu transaksi.

Dengan memasukkan teknologi zero-knowledge ke dalam protokol, jaringan [rantai blok](/glossary/#blockchain) yang berfokus pada privasi memungkinkan [node](/glossary/#node) untuk memvalidasi transaksi tanpa perlu mengakses data transaksi. [EIP-7503](https://eips.ethereum.org/EIPS/eip-7503) adalah contoh desain yang diusulkan yang akan memungkinkan transfer nilai privat asli di rantai blok [Ethereum](/). Namun, proposal semacam itu sulit diimplementasikan karena campuran masalah keamanan, peraturan, dan UX.  

**Bukti tanpa pengetahuan juga diterapkan untuk menganonimkan transaksi di rantai blok publik**. Contohnya adalah Tornado Cash, layanan non-kustodial terdesentralisasi yang memungkinkan pengguna melakukan transaksi privat di Ethereum. Tornado Cash menggunakan bukti tanpa pengetahuan untuk mengaburkan detail transaksi dan menjamin privasi finansial. Sayangnya, karena ini adalah alat privasi "opt-in" (opsional), alat ini dikaitkan dengan aktivitas terlarang. Untuk mengatasinya, privasi pada akhirnya harus menjadi standar di rantai blok publik. Pelajari lebih lanjut tentang [privasi di Ethereum](/privacy/).

### Perlindungan identitas {#identity-protection}

Sistem manajemen identitas saat ini menempatkan informasi pribadi dalam risiko. Bukti tanpa pengetahuan dapat membantu individu memvalidasi identitas sambil melindungi detail sensitif.

Bukti tanpa pengetahuan sangat berguna dalam konteks [identitas terdesentralisasi (DID)](/decentralized-identity/). Identitas terdesentralisasi (juga digambarkan sebagai 'identitas berdaulat sendiri') memberi individu kemampuan untuk mengontrol akses ke pengidentifikasi pribadi. Membuktikan kewarganegaraan Anda tanpa mengungkapkan NPWP atau detail paspor Anda adalah contoh yang baik tentang bagaimana teknologi zero-knowledge memungkinkan identitas terdesentralisasi.

<Alert variant="info">
  <AlertEmoji text="💡" />
  <AlertContent>
    <AlertTitle className="mb-2">
      ZKP + Identitas dalam praktiknya: ID Digital Nasional (NDI) Bhutan di Ethereum
    </AlertTitle>
    <AlertDescription>
      <p>
        Contoh dunia nyata penggunaan ZKP untuk sistem manajemen identitas adalah sistem ID Digital Nasional (NDI) Kerajaan Bhutan, yang dibangun di atas Ethereum. NDI Bhutan menggunakan ZKP untuk memungkinkan warga negara membuktikan fakta tentang diri mereka sendiri secara kriptografi, seperti "Saya adalah warga negara" atau "Saya berusia di atas 18 tahun," tanpa mengungkapkan data pribadi yang sensitif pada ID mereka.
      </p>
      <p>
        Pelajari lebih lanjut tentang NDI Bhutan dalam <a href="/decentralized-identity/#national-and-government-id">studi kasus Identitas Terdesentralisasi</a>.
      </p>
    </AlertDescription>
  </AlertContent>
</Alert>

### Bukti Kemanusiaan {#proof-of-humanity}

Salah satu contoh bukti tanpa pengetahuan yang paling banyak digunakan dalam praktiknya saat ini adalah [protokol World ID](https://world.org/blog/world/world-id-faqs), yang dapat dianggap sebagai “paspor digital global untuk era AI.” Ini memungkinkan orang untuk membuktikan bahwa mereka adalah individu yang unik tanpa mengungkapkan informasi pribadi. Hal ini dicapai melalui perangkat yang disebut Orb, yang memindai iris mata seseorang dan menghasilkan kode iris. Kode iris diperiksa dan diverifikasi untuk mengonfirmasi bahwa orang tersebut adalah manusia yang unik secara biologis. Setelah verifikasi, komitmen identitas yang dihasilkan di perangkat pengguna (dan tidak ditautkan ke atau diturunkan dari data biometrik) ditambahkan ke daftar aman di rantai blok. Kemudian, kapan pun pengguna ingin membuktikan bahwa mereka adalah manusia yang terverifikasi – baik untuk masuk, memilih, atau mengambil tindakan lain – mereka dapat menghasilkan bukti tanpa pengetahuan yang mengonfirmasi keanggotaan mereka dalam daftar tersebut. Keindahan menggunakan bukti tanpa pengetahuan adalah bahwa hanya satu pernyataan yang diungkapkan: orang ini unik. Segala hal lainnya tetap privat.

World ID bergantung pada [protokol Semaphore](https://docs.semaphore.pse.dev/) yang dikembangkan oleh [tim PSE](https://pse.dev/) di Yayasan Ethereum. Semaphore dirancang untuk menjadi cara yang ringan namun kuat untuk menghasilkan dan memverifikasi bukti tanpa pengetahuan. Ini memungkinkan pengguna membuktikan bahwa mereka adalah bagian dari suatu grup (dalam hal ini, manusia yang terverifikasi) tanpa menunjukkan anggota grup mana mereka. Semaphore juga sangat fleksibel, memungkinkan grup dibuat berdasarkan berbagai kriteria seperti verifikasi identitas, partisipasi dalam peristiwa, atau kepemilikan kredensial.

### Autentikasi {#authentication}

Menggunakan layanan online mewajibkan Anda membuktikan identitas dan hak Anda untuk mengakses platform tersebut. Ini sering kali mewajibkan Anda memberikan informasi pribadi, seperti nama, alamat email, tanggal lahir, dan sebagainya. Anda mungkin juga perlu menghafal kata sandi yang panjang atau berisiko kehilangan akses.

Namun, bukti tanpa pengetahuan dapat menyederhanakan autentikasi untuk platform dan pengguna. Setelah bukti ZK dihasilkan menggunakan input publik (misalnya, data yang membuktikan keanggotaan pengguna di platform) dan input privat (misalnya, detail pengguna), pengguna cukup menyajikannya untuk mengautentikasi identitas mereka saat mereka perlu mengakses layanan. Ini meningkatkan pengalaman bagi pengguna dan membebaskan organisasi dari kebutuhan untuk menyimpan sejumlah besar informasi pengguna.

### Komputasi yang dapat diverifikasi {#verifiable-computation}

Komputasi yang dapat diverifikasi adalah aplikasi lain dari teknologi zero-knowledge untuk meningkatkan desain rantai blok. Komputasi yang dapat diverifikasi memungkinkan kita untuk mengalihdayakan komputasi ke entitas lain sambil mempertahankan hasil yang dapat diverifikasi. Entitas tersebut mengirimkan hasil bersama dengan bukti yang memverifikasi bahwa program dieksekusi dengan benar.

Komputasi yang dapat diverifikasi **sangat penting untuk meningkatkan kecepatan pemrosesan di rantai blok** tanpa mengurangi keamanan. Memahami hal ini mewajibkan kita mengetahui perbedaan dalam solusi yang diusulkan untuk menskalakan Ethereum.

[Solusi penskalaan onchain](/developers/docs/scaling/#onchain-scaling), seperti sharding, mewajibkan modifikasi ekstensif pada lapisan dasar rantai blok. Namun, pendekatan ini sangat kompleks dan kesalahan dalam implementasi dapat merusak model keamanan Ethereum.

[Solusi penskalaan offchain](/developers/docs/scaling/#offchain-scaling) tidak mewajibkan desain ulang protokol inti Ethereum. Sebaliknya, mereka mengandalkan model komputasi yang dialihdayakan untuk meningkatkan laju pemrosesan pada lapisan dasar Ethereum.

Berikut cara kerjanya dalam praktiknya:

- Alih-alih memproses setiap transaksi, Ethereum memindahkan eksekusi ke rantai terpisah.

- Setelah memproses transaksi, rantai lain mengembalikan hasil untuk diterapkan ke state Ethereum.

Manfaatnya di sini adalah Ethereum tidak perlu melakukan eksekusi apa pun dan hanya perlu menerapkan hasil dari komputasi yang dialihdayakan ke state-nya. Ini mengurangi kemacetan jaringan dan juga meningkatkan kecepatan transaksi (protokol offchain mengoptimalkan eksekusi yang lebih cepat).

Rantai tersebut membutuhkan cara untuk memvalidasi transaksi offchain tanpa mengeksekusinya kembali, atau nilai eksekusi offchain akan hilang.

Di sinilah komputasi yang dapat diverifikasi berperan. Ketika sebuah node mengeksekusi transaksi di luar Ethereum, ia mengirimkan bukti tanpa pengetahuan untuk membuktikan kebenaran eksekusi offchain. Bukti ini (disebut [bukti validitas](/glossary/#validity-proof)) menjamin bahwa suatu transaksi valid, memungkinkan Ethereum untuk menerapkan hasilnya ke state-nya—tanpa menunggu siapa pun untuk menyengketakannya.

[Rollup zero-knowledge](/developers/docs/scaling/zk-rollups) dan [validium](/developers/docs/scaling/validium/) adalah dua solusi penskalaan offchain yang menggunakan bukti validitas untuk memberikan skalabilitas yang aman. Protokol ini mengeksekusi ribuan transaksi offchain dan mengirimkan bukti untuk verifikasi di Ethereum. Hasil tersebut dapat diterapkan segera setelah bukti diverifikasi, memungkinkan Ethereum untuk memproses lebih banyak transaksi tanpa meningkatkan komputasi pada lapisan dasar.

Di luar penskalaan Lapisan 2, bukti tanpa pengetahuan juga dapat memverifikasi eksekusi blok L1 Ethereum itu sendiri. [zkEVM untuk verifikasi L1](/roadmap/zkevm/) akan memungkinkan validator untuk memverifikasi blok dengan memeriksa bukti daripada mengeksekusi ulang semua transaksi—memungkinkan batas gas yang lebih tinggi tanpa menaikkan persyaratan perangkat keras validator.

### Mengurangi penyuapan dan kolusi dalam pemungutan suara onchain {#secure-blockchain-voting}

Skema pemungutan suara rantai blok memiliki banyak karakteristik yang menguntungkan: sepenuhnya dapat diaudit, aman terhadap serangan, tahan terhadap penyensoran, dan bebas dari kendala geografis. Namun, bahkan skema pemungutan suara onchain tidak kebal terhadap masalah **kolusi**.

Didefinisikan sebagai “berkoordinasi untuk membatasi persaingan terbuka dengan menipu, mencurangi, dan menyesatkan orang lain,” kolusi dapat berbentuk aktor jahat yang memengaruhi pemungutan suara dengan menawarkan suap. Misalnya, Alice mungkin menerima suap dari Bob untuk memilih `option B` pada surat suara meskipun dia lebih suka `option A`.

Penyuapan dan kolusi membatasi efektivitas proses apa pun yang menggunakan pemungutan suara sebagai mekanisme sinyal (terutama di mana pengguna dapat membuktikan bagaimana mereka memilih). Hal ini dapat memiliki konsekuensi yang signifikan, terutama di mana suara bertanggung jawab untuk mengalokasikan sumber daya yang langka.

Misalnya, [mekanisme pendanaan kuadratik](https://www.radicalxchange.org/wiki/plural-funding/) mengandalkan donasi untuk mengukur preferensi opsi tertentu di antara berbagai proyek barang publik. Setiap donasi dihitung sebagai "suara" untuk proyek tertentu, dengan proyek yang menerima lebih banyak suara mendapatkan lebih banyak dana dari kumpulan pencocokan.

Menggunakan pemungutan suara onchain membuat pendanaan kuadratik rentan terhadap kolusi: transaksi rantai blok bersifat publik, sehingga penyuap dapat memeriksa aktivitas onchain penerima suap untuk melihat bagaimana mereka “memilih”. Dengan cara ini, pendanaan kuadratik tidak lagi menjadi sarana yang efektif untuk mengalokasikan dana berdasarkan preferensi agregat komunitas.

Untungnya, solusi yang lebih baru seperti MACI (Minimum Anti-Collusion Infrastructure) menggunakan bukti tanpa pengetahuan untuk membuat pemungutan suara onchain (misalnya, mekanisme pendanaan kuadratik) tahan terhadap penyuapan dan kolusi. MACI adalah serangkaian kontrak pintar dan skrip yang memungkinkan administrator pusat (disebut "koordinator") untuk menggabungkan suara dan menghitung hasil _tanpa_ mengungkapkan secara spesifik bagaimana setiap individu memilih. Meskipun demikian, masih dimungkinkan untuk memverifikasi bahwa suara dihitung dengan benar, atau mengonfirmasi bahwa individu tertentu berpartisipasi dalam putaran pemungutan suara.

#### Bagaimana cara kerja MACI dengan bukti tanpa pengetahuan? {#how-maci-works-with-zk-proofs}

Pada awalnya, koordinator menerapkan kontrak MACI di Ethereum, setelah itu pengguna dapat mendaftar untuk pemungutan suara (dengan mendaftarkan kunci publik mereka di kontrak pintar). Pengguna memberikan suara dengan mengirimkan pesan yang dienkripsi dengan kunci publik mereka ke kontrak pintar (suara yang valid harus ditandatangani dengan kunci publik terbaru yang terkait dengan identitas pengguna, di antara kriteria lainnya). Setelah itu, koordinator memproses semua pesan setelah periode pemungutan suara berakhir, menghitung suara, dan memverifikasi hasilnya secara onchain.

Dalam MACI, bukti tanpa pengetahuan digunakan untuk memastikan kebenaran komputasi dengan membuatnya tidak mungkin bagi koordinator untuk memproses suara dan menghitung hasil secara tidak benar. Hal ini dicapai dengan mewajibkan koordinator untuk menghasilkan bukti ZK-SNARK yang memverifikasi bahwa a) semua pesan diproses dengan benar b) hasil akhir sesuai dengan jumlah semua suara yang _valid_.

Dengan demikian, bahkan tanpa membagikan rincian suara per pengguna (seperti yang biasanya terjadi), MACI menjamin integritas hasil yang dihitung selama proses penghitungan. Fitur ini berguna dalam mengurangi efektivitas skema kolusi dasar. Kita dapat mengeksplorasi kemungkinan ini dengan menggunakan contoh sebelumnya tentang Bob yang menyuap Alice untuk memilih suatu opsi:

- Alice mendaftar untuk memilih dengan mengirimkan kunci publiknya ke kontrak pintar.
- Alice setuju untuk memilih `option B` dengan imbalan suap dari Bob.
- Alice memilih `option B`.
- Alice secara diam-diam mengirimkan transaksi terenkripsi untuk mengubah kunci publik yang terkait dengan identitasnya.
- Alice mengirim pesan (terenkripsi) lain ke kontrak pintar untuk memilih `option A` menggunakan kunci publik yang baru.
- Alice menunjukkan kepada Bob sebuah transaksi yang menunjukkan bahwa dia memilih `option B` (yang tidak valid karena kunci publik tidak lagi terkait dengan identitas Alice dalam sistem)
- Saat memproses pesan, koordinator melewati suara Alice untuk `option B` dan hanya menghitung suara untuk `option A`. Oleh karena itu, upaya Bob untuk berkolusi dengan Alice dan memanipulasi suara onchain gagal.

Menggunakan MACI _memang_ mewajibkan kepercayaan kepada koordinator untuk tidak berkolusi dengan penyuap atau mencoba menyuap pemilih itu sendiri. Koordinator dapat mendekripsi pesan pengguna (diperlukan untuk membuat bukti), sehingga mereka dapat memverifikasi secara akurat bagaimana setiap orang memilih.

Namun dalam kasus di mana koordinator tetap jujur, MACI mewakili alat yang ampuh untuk menjamin kesucian pemungutan suara onchain. Ini menjelaskan popularitasnya di antara aplikasi pendanaan kuadratik (misalnya, [clr.fund](https://clr.fund/#/about/maci)) yang sangat bergantung pada integritas pilihan pemungutan suara masing-masing individu.

[Pelajari lebih lanjut tentang MACI](https://maci.pse.dev/).

## Bagaimana cara kerja bukti tanpa pengetahuan? {#how-do-zero-knowledge-proofs-work}

Bukti tanpa pengetahuan memungkinkan Anda membuktikan kebenaran suatu pernyataan tanpa membagikan isi pernyataan atau mengungkapkan bagaimana Anda menemukan kebenaran tersebut. Untuk mewujudkannya, protokol zero-knowledge mengandalkan algoritma yang mengambil beberapa data sebagai input dan mengembalikan 'benar' atau 'salah' sebagai output.

Protokol zero-knowledge harus memenuhi kriteria berikut:

1. **Kelengkapan**: Jika input valid, protokol zero-knowledge selalu mengembalikan 'benar'. Oleh karena itu, jika pernyataan yang mendasarinya benar, dan pembukti serta pemverifikasi bertindak jujur, bukti tersebut dapat diterima.

2. **Kekokohan**: Jika input tidak valid, secara teoritis tidak mungkin untuk mengelabui protokol zero-knowledge agar mengembalikan 'benar'. Oleh karena itu, pembukti yang berbohong tidak dapat menipu pemverifikasi yang jujur agar percaya bahwa pernyataan yang tidak valid adalah valid (kecuali dengan margin probabilitas yang sangat kecil).

3. **Zero-knowledge**: Pemverifikasi tidak mempelajari apa pun tentang suatu pernyataan di luar validitas atau kepalsuannya (mereka memiliki “zero knowledge” atau tanpa pengetahuan tentang pernyataan tersebut). Persyaratan ini juga mencegah pemverifikasi untuk mendapatkan input asli (isi pernyataan) dari bukti tersebut.

Dalam bentuk dasar, bukti tanpa pengetahuan terdiri dari tiga elemen: **Saksi**, **tantangan**, dan **respons**.

- **Saksi**: Dengan bukti tanpa pengetahuan, pembukti ingin membuktikan pengetahuan tentang beberapa informasi tersembunyi. Informasi rahasia adalah “Saksi” untuk bukti tersebut, dan asumsi pengetahuan pembukti tentang Saksi menetapkan serangkaian pertanyaan yang hanya dapat dijawab oleh pihak yang memiliki pengetahuan tentang informasi tersebut. Dengan demikian, pembukti memulai proses pembuktian dengan memilih pertanyaan secara acak, menghitung jawabannya, dan mengirimkannya ke pemverifikasi.

- **Tantangan**: Pemverifikasi secara acak memilih pertanyaan lain dari kumpulan tersebut dan meminta pembukti untuk menjawabnya.

- **Respons**: Pembukti menerima pertanyaan, menghitung jawabannya, dan mengembalikannya ke pemverifikasi. Respons pembukti memungkinkan pemverifikasi untuk memeriksa apakah pembukti benar-benar memiliki akses ke Saksi. Untuk memastikan pembukti tidak menebak secara membabi buta dan mendapatkan jawaban yang benar secara kebetulan, pemverifikasi memilih lebih banyak pertanyaan untuk diajukan. Dengan mengulangi interaksi ini berkali-kali, kemungkinan pembukti memalsukan pengetahuan tentang Saksi turun secara signifikan hingga pemverifikasi merasa puas.

Hal di atas menjelaskan struktur 'bukti tanpa pengetahuan interaktif'. Protokol zero-knowledge awal menggunakan pembuktian interaktif, di mana memverifikasi validitas suatu pernyataan mewajibkan komunikasi bolak-balik antara pembukti dan pemverifikasi.

Contoh bagus yang mengilustrasikan cara kerja bukti interaktif adalah [cerita gua Ali Baba](https://en.wikipedia.org/wiki/Zero-knowledge_proof#The_Ali_Baba_cave) yang terkenal dari Jean-Jacques Quisquater. Dalam cerita tersebut, Peggy (pembukti) ingin membuktikan kepada Victor (pemverifikasi) bahwa dia mengetahui frasa rahasia untuk membuka pintu ajaib tanpa mengungkapkan frasa tersebut.

### Bukti tanpa pengetahuan non-interaktif {#non-interactive-zero-knowledge-proofs}

Meskipun revolusioner, pembuktian interaktif memiliki kegunaan yang terbatas karena mewajibkan kedua belah pihak untuk tersedia dan berinteraksi berulang kali. Bahkan jika pemverifikasi yakin akan kejujuran pembukti, bukti tersebut tidak akan tersedia untuk verifikasi independen (menghitung bukti baru mewajibkan serangkaian pesan baru antara pembukti dan pemverifikasi).

Untuk memecahkan masalah ini, Manuel Blum, Paul Feldman, dan Silvio Micali menyarankan [bukti tanpa pengetahuan non-interaktif](https://dl.acm.org/doi/10.1145/62212.62222) pertama di mana pembukti dan pemverifikasi memiliki kunci bersama. Ini memungkinkan pembukti untuk mendemonstrasikan pengetahuan mereka tentang beberapa informasi (yaitu, Saksi) tanpa memberikan informasi itu sendiri.

Tidak seperti bukti interaktif, bukti non-interaktif hanya mewajibkan satu putaran komunikasi antara peserta (pembukti dan pemverifikasi). Pembukti meneruskan informasi rahasia ke algoritma khusus untuk menghitung bukti tanpa pengetahuan. Bukti ini dikirim ke pemverifikasi, yang memeriksa bahwa pembukti mengetahui informasi rahasia menggunakan algoritma lain.

Pembuktian non-interaktif mengurangi komunikasi antara pembukti dan pemverifikasi, membuat bukti ZK lebih efisien. Selain itu, setelah bukti dihasilkan, bukti tersebut tersedia bagi siapa saja (dengan akses ke kunci bersama dan algoritma verifikasi) untuk diverifikasi.

Bukti non-interaktif mewakili terobosan untuk teknologi zero-knowledge dan memacu pengembangan sistem pembuktian yang digunakan saat ini. Kami membahas jenis-jenis bukti ini di bawah ini:

### Jenis-jenis bukti tanpa pengetahuan {#types-of-zero-knowledge-proofs}

#### ZK-SNARK {#zk-snarks}

ZK-SNARK adalah akronim untuk **Zero-Knowledge Succinct Non-Interactive Argument of Knowledge**. Protokol ZK-SNARK memiliki kualitas berikut:

- **Zero-knowledge**: Pemverifikasi dapat memvalidasi integritas suatu pernyataan tanpa mengetahui apa pun tentang pernyataan tersebut. Satu-satunya pengetahuan yang dimiliki pemverifikasi tentang pernyataan tersebut adalah apakah itu benar atau salah.

- **Ringkas (Succinct)**: Bukti tanpa pengetahuan lebih kecil dari Saksi dan dapat diverifikasi dengan cepat.

- **Non-interaktif**: Bukti ini 'non-interaktif' karena pembukti dan pemverifikasi hanya berinteraksi sekali, tidak seperti bukti interaktif yang mewajibkan beberapa putaran komunikasi.

- **Argumen**: Bukti ini memenuhi persyaratan 'kekokohan', sehingga kecurangan sangat tidak mungkin terjadi.

- **Pengetahuan (Knowledge)**: Bukti tanpa pengetahuan tidak dapat dibangun tanpa akses ke informasi rahasia (Saksi). Sulit, jika bukan tidak mungkin, bagi pembukti yang tidak memiliki Saksi untuk menghitung bukti tanpa pengetahuan yang valid.

'Kunci bersama' yang disebutkan sebelumnya mengacu pada parameter publik yang disetujui oleh pembukti dan pemverifikasi untuk digunakan dalam menghasilkan dan memverifikasi bukti. Menghasilkan parameter publik (secara kolektif dikenal sebagai Common Reference String (CRS)) adalah operasi yang sensitif karena kepentingannya dalam keamanan protokol. Jika Entropi (keacakan) yang digunakan dalam menghasilkan CRS jatuh ke tangan pembukti yang tidak jujur, mereka dapat menghitung bukti palsu.

[Komputasi multi-pihak (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) adalah cara untuk mengurangi risiko dalam menghasilkan parameter publik. Beberapa pihak berpartisipasi dalam [upacara pengaturan tepercaya](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), di mana setiap orang menyumbangkan beberapa nilai acak untuk menghasilkan CRS. Selama satu pihak yang jujur menghancurkan bagian Entropi mereka, protokol ZK-SNARK mempertahankan kekokohan komputasional.

Pengaturan tepercaya mewajibkan pengguna untuk memercayai peserta dalam pembuatan parameter. Namun, pengembangan ZK-STARK telah memungkinkan protokol pembuktian yang bekerja dengan pengaturan yang tidak tepercaya.

#### ZK-STARK {#zk-starks}

ZK-STARK adalah akronim untuk **Zero-Knowledge Scalable Transparent Argument of Knowledge**. ZK-STARK mirip dengan ZK-SNARK, kecuali bahwa mereka:

- **Dapat Diskalakan (Scalable)**: ZK-STARK lebih cepat daripada ZK-SNARK dalam menghasilkan dan memverifikasi bukti ketika ukuran Saksi lebih besar. Dengan bukti STARK, waktu pembukti dan verifikasi hanya sedikit meningkat seiring bertambahnya Saksi (waktu pembukti dan pemverifikasi SNARK meningkat secara linier dengan ukuran Saksi).

- **Transparan**: ZK-STARK mengandalkan keacakan yang dapat diverifikasi secara publik untuk menghasilkan parameter publik untuk pembuktian dan verifikasi alih-alih pengaturan tepercaya. Dengan demikian, mereka lebih transparan dibandingkan dengan ZK-SNARK.

ZK-STARK menghasilkan bukti yang lebih besar daripada ZK-SNARK yang berarti mereka umumnya memiliki overhead verifikasi yang lebih tinggi. Namun, ada kasus (seperti membuktikan kumpulan data besar) di mana ZK-STARK mungkin lebih hemat biaya daripada ZK-SNARK.

## Kekurangan menggunakan bukti tanpa pengetahuan {#drawbacks-of-using-zero-knowledge-proofs}

### Biaya perangkat keras {#hardware-costs}

Menghasilkan bukti tanpa pengetahuan melibatkan perhitungan yang sangat kompleks yang paling baik dilakukan pada mesin khusus. Karena mesin ini mahal, mereka sering kali di luar jangkauan individu biasa. Selain itu, aplikasi yang ingin menggunakan teknologi zero-knowledge harus memperhitungkan biaya perangkat keras—yang dapat meningkatkan biaya bagi pengguna akhir.

### Biaya verifikasi bukti {#proof-verification-costs}

Memverifikasi bukti juga mewajibkan komputasi yang kompleks dan meningkatkan biaya penerapan teknologi zero-knowledge dalam aplikasi. Biaya ini sangat relevan dalam konteks pembuktian komputasi. Misalnya, rollup ZK membayar ~ 500.000 gas untuk memverifikasi satu bukti ZK-SNARK di Ethereum, dengan ZK-STARK mewajibkan biaya yang lebih tinggi.

### Asumsi kepercayaan {#trust-assumptions}

Dalam ZK-SNARK, Common Reference String (parameter publik) dihasilkan sekali dan tersedia untuk digunakan kembali oleh pihak yang ingin berpartisipasi dalam protokol zero-knowledge. Parameter publik dibuat melalui upacara pengaturan tepercaya, di mana peserta diasumsikan jujur.

Namun sebenarnya tidak ada cara bagi pengguna untuk menilai kejujuran peserta dan pengguna harus memercayai kata-kata pengembang. ZK-STARK bebas dari asumsi kepercayaan karena keacakan yang digunakan dalam menghasilkan string dapat diverifikasi secara publik. Sementara itu, para peneliti sedang mengerjakan pengaturan yang tidak tepercaya untuk ZK-SNARK guna meningkatkan keamanan mekanisme pembuktian.

### Ancaman komputasi kuantum {#quantum-computing-threats}

ZK-SNARK menggunakan kriptografi kurva eliptik untuk enkripsi. Meskipun masalah logaritma diskrit kurva eliptik diasumsikan tidak dapat diselesaikan untuk saat ini, pengembangan komputer kuantum dapat merusak model keamanan ini di masa depan.

ZK-STARK dianggap kebal terhadap ancaman komputasi kuantum, karena hanya mengandalkan fungsi hash yang tahan benturan untuk keamanannya. Tidak seperti pasangan kunci publik-privat yang digunakan dalam kriptografi kurva eliptik, proses hash yang tahan benturan lebih sulit untuk dipecahkan oleh algoritma komputasi kuantum.

## Bacaan lebih lanjut {#further-reading}

- [Gambaran umum kasus penggunaan untuk bukti tanpa pengetahuan](https://pse.dev/projects) — _Tim Privacy and Scaling Explorations_
- [SNARK vs. STARK vs. SNARK Rekursif](https://www.alchemy.com/overviews/snarks-vs-starks) — _Alchemy Overviews_
- [Bukti Tanpa Pengetahuan: Meningkatkan Privasi di Rantai Blok](https://www.altoros.com/blog/zero-knowledge-proof-improving-privacy-for-a-blockchain/) — _Dmitry Lavrenov_
- [zk-SNARK — Contoh Zero-Knowledge yang Realistis dan Pembahasan Mendalam](https://medium.com/coinmonks/zk-snarks-a-realistic-zero-knowledge-example-and-deep-dive-c5e6eaa7131c) — _Adam Luciano_
- [ZK-STARK — Ciptakan Kepercayaan yang Dapat Diverifikasi, bahkan terhadap Komputer Kuantum](https://medium.com/coinmonks/zk-starks-create-verifiable-trust-even-against-quantum-computers-dd9c6a2bb13d) — _Adam Luciano_
- [Pengantar perkiraan tentang bagaimana zk-SNARK dimungkinkan](https://vitalik.eth.limo/general/2021/01/26/snarks.html) — _Vitalik Buterin_
- [Mengapa Bukti Tanpa Pengetahuan (ZKP) adalah Pengubah Permainan untuk Identitas Berdaulat Sendiri](https://frankiefab.hashnode.dev/why-zero-knowledge-proofs-zkps-is-a-game-changer-for-self-sovereign-identity) — _Franklin Ohaegbulam_
- [Penjelasan EIP-7503: Memungkinkan Transfer Privat di Ethereum Dengan Bukti ZK](https://research.2077.xyz/eip-7503-zero-knowledge-wormholes-for-private-ethereum-transactions#introduction) — _Emmanuel Awosika_
- [Permainan Kartu ZK: permainan untuk mempelajari dasar-dasar ZK dan kasus penggunaan di kehidupan nyata](https://github.com/ZK-card/zk-cards) - _ZK-Cards_