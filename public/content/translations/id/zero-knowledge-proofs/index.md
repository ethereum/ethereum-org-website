---
title: Zero-knowledge proof
description: Pengantar non-teknis tentang zero-knowledge proof untuk pemula.
lang: id
---

# Apa itu zero-knowledge proof? {#what-are-zk-proofs}

Zero-knowledge proof adalah cara untuk membuktikan validitas suatu pernyataan tanpa mengungkapkan pernyataan itu sendiri. 'Pembukti' (prover) adalah pihak yang mencoba membuktikan suatu klaim, sementara 'pemverifikasi' (verifier) bertanggung jawab untuk memvalidasi klaim tersebut.

Zero-knowledge proof pertama kali muncul dalam makalah tahun 1985, "[The knowledge complexity of interactive proof systems](http://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf)" yang memberikan definisi zero-knowledge proof yang banyak digunakan saat ini:

> Protokol zero-knowledge adalah metode di mana satu pihak (pembukti) **dapat membuktikan** kepada pihak lain (pemverifikasi) **bahwa sesuatu itu benar, tanpa mengungkapkan informasi apa pun** selain fakta bahwa pernyataan spesifik ini benar.

Zero-knowledge proof telah berkembang selama bertahun-tahun dan sekarang digunakan dalam beberapa aplikasi dunia nyata.

<YouTube id="fOGdb1CTu5c" />

## Mengapa kita membutuhkan zero-knowledge proof? {#why-zero-knowledge-proofs-are-important}

Zero-knowledge proof mewakili terobosan dalam kriptografi terapan, karena menjanjikan peningkatan keamanan informasi bagi individu. Pertimbangkan bagaimana Anda mungkin membuktikan sebuah klaim (misalnya, "Saya adalah warga negara X") kepada pihak lain (misalnya, penyedia layanan). Anda perlu memberikan "bukti" untuk mendukung klaim Anda, seperti paspor nasional atau SIM.

Namun ada masalah dengan pendekatan ini, terutama kurangnya privasi. Informasi Identitas Pribadi (PII) yang dibagikan dengan layanan pihak ketiga disimpan dalam basis data pusat, yang rentan terhadap peretasan. Dengan pencurian identitas yang menjadi masalah kritis, ada seruan untuk cara berbagi informasi sensitif yang lebih melindungi privasi.

Zero-knowledge proof memecahkan masalah ini dengan **menghilangkan kebutuhan untuk mengungkapkan informasi guna membuktikan validitas klaim**. Protokol zero-knowledge menggunakan pernyataan (disebut 'saksi' atau 'witness') sebagai input untuk menghasilkan bukti validitas yang ringkas. Bukti ini memberikan jaminan kuat bahwa suatu pernyataan adalah benar tanpa mengekspos informasi yang digunakan dalam pembuatannya.

Kembali ke contoh kita sebelumnya, satu-satunya bukti yang Anda butuhkan untuk membuktikan klaim kewarganegaraan Anda adalah zero-knowledge proof. Pemverifikasi hanya perlu memeriksa apakah properti tertentu dari bukti tersebut bernilai benar untuk diyakinkan bahwa pernyataan yang mendasarinya juga bernilai benar.

## Kasus penggunaan untuk zero-knowledge proof {#use-cases-for-zero-knowledge-proofs}

### Pembayaran anonim {#anonymous-payments}

Pembayaran kartu kredit sering kali terlihat oleh banyak pihak, termasuk penyedia pembayaran, bank, dan pihak berkepentingan lainnya (misalnya, otoritas pemerintah). Meskipun pengawasan keuangan memiliki manfaat untuk mengidentifikasi aktivitas ilegal, hal itu juga merusak privasi warga biasa.

Mata uang kripto dimaksudkan untuk menyediakan sarana bagi pengguna untuk melakukan transaksi peer-to-peer secara pribadi. Namun sebagian besar transaksi mata uang kripto terlihat secara terbuka di blockchain publik. Identitas pengguna sering kali menggunakan nama samaran dan baik secara sengaja ditautkan ke identitas dunia nyata (misalnya, dengan menyertakan alamat ETH di profil Twitter atau GitHub) atau dapat dikaitkan dengan identitas dunia nyata menggunakan analisis data onchain dan offchain dasar.

Ada "koin privasi" khusus yang dirancang untuk transaksi yang sepenuhnya anonim. Blockchain yang berfokus pada privasi, seperti Zcash dan Monero, melindungi detail transaksi, termasuk alamat pengirim/penerima, jenis aset, kuantitas, dan garis waktu transaksi.

Dengan memasukkan teknologi zero-knowledge ke dalam protokol, jaringan [blockchain](/glossary/#blockchain) yang berfokus pada privasi memungkinkan [node](/glossary/#node) untuk memvalidasi transaksi tanpa perlu mengakses data transaksi. [EIP-7503](https://eips.ethereum.org/EIPS/eip-7503) adalah contoh desain yang diusulkan yang akan memungkinkan transfer nilai pribadi asli di blockchain [Ethereum](/). Namun, proposal semacam itu sulit diimplementasikan karena campuran masalah keamanan, peraturan, dan UX.  

**Zero-knowledge proof juga diterapkan untuk menganonimkan transaksi di blockchain publik**. Contohnya adalah Tornado Cash, layanan non-kustodian yang terdesentralisasi yang memungkinkan pengguna untuk melakukan transaksi pribadi di Ethereum. Tornado Cash menggunakan zero-knowledge proof untuk mengaburkan detail transaksi dan menjamin privasi keuangan. Sayangnya, karena ini adalah alat privasi "opt-in" (opsional), alat ini dikaitkan dengan aktivitas terlarang. Untuk mengatasi hal ini, privasi pada akhirnya harus menjadi default di blockchain publik. Pelajari lebih lanjut tentang [privasi di Ethereum](/privacy/).

### Perlindungan identitas {#identity-protection}

Sistem manajemen identitas saat ini menempatkan informasi pribadi dalam risiko. Zero-knowledge proof dapat membantu individu memvalidasi identitas sambil melindungi detail sensitif.

Zero-knowledge proof sangat berguna dalam konteks [identitas terdesentralisasi](/decentralized-identity/). Identitas terdesentralisasi (juga digambarkan sebagai 'identitas berdaulat sendiri') memberi individu kemampuan untuk mengontrol akses ke pengidentifikasi pribadi. Membuktikan kewarganegaraan Anda tanpa mengungkapkan ID pajak atau detail paspor Anda adalah contoh yang baik tentang bagaimana teknologi zero-knowledge memungkinkan identitas terdesentralisasi.

<Alert variant="info">
  <AlertEmoji text="💡" />
  <AlertContent>
    <AlertTitle className="mb-2">
      ZKP + Identitas beraksi: ID Digital Nasional (NDI) Bhutan di Ethereum
    </AlertTitle>
    <AlertDescription>
      <p>
        Contoh dunia nyata penggunaan ZKP untuk sistem manajemen identitas adalah sistem ID Digital Nasional (NDI) Kerajaan Bhutan, yang dibangun di atas Ethereum. NDI Bhutan menggunakan ZKP untuk memungkinkan warga negara membuktikan fakta tentang diri mereka secara kriptografi, seperti "Saya adalah warga negara" atau "Saya berusia di atas 18 tahun," tanpa mengungkapkan data pribadi yang sensitif pada ID mereka.
      </p>
      <p>
        Pelajari lebih lanjut tentang NDI Bhutan dalam <a href="/decentralized-identity/#national-and-government-id">Studi kasus Identitas Terdesentralisasi</a>.
      </p>
</AlertDescription>
</AlertContent>
</Alert>

### Bukti Kemanusiaan (Proof of Humanity) {#proof-of-humanity}

Salah satu contoh zero-knowledge proof yang paling banyak digunakan saat ini adalah [protokol World ID](https://world.org/blog/world/world-id-faqs), yang dapat dianggap sebagai "paspor digital global untuk era AI." Ini memungkinkan orang untuk membuktikan bahwa mereka adalah individu yang unik tanpa mengungkapkan informasi pribadi. Hal ini dicapai melalui perangkat yang disebut Orb, yang memindai iris mata seseorang dan menghasilkan kode iris. Kode iris diperiksa dan diverifikasi untuk mengonfirmasi bahwa orang tersebut adalah manusia yang unik secara biologis. Setelah verifikasi, komitmen identitas yang dihasilkan di perangkat pengguna (dan tidak ditautkan ke atau diturunkan dari data biometrik) ditambahkan ke daftar aman di blockchain. Kemudian, setiap kali pengguna ingin membuktikan bahwa mereka adalah manusia yang terverifikasi – baik untuk masuk, memberikan suara, atau mengambil tindakan lain – mereka dapat menghasilkan zero-knowledge proof yang mengonfirmasi keanggotaan mereka dalam daftar tersebut. Keindahan menggunakan zero-knowledge proof adalah hanya satu pernyataan yang terungkap: orang ini unik. Segala hal lainnya tetap pribadi.

World ID bergantung pada [protokol Semaphore](https://docs.semaphore.pse.dev/) yang dikembangkan oleh [tim PSE](https://pse.dev/) di Ethereum Foundation. Semaphore dirancang untuk menjadi cara yang ringan namun kuat untuk menghasilkan dan memverifikasi zero-knowledge proof. Ini memungkinkan pengguna membuktikan bahwa mereka adalah bagian dari suatu grup (dalam hal ini, manusia yang terverifikasi) tanpa menunjukkan anggota grup mana mereka. Semaphore juga sangat fleksibel, memungkinkan grup dibuat berdasarkan berbagai kriteria seperti verifikasi identitas, partisipasi dalam acara, atau kepemilikan kredensial.

### Autentikasi {#authentication}

Menggunakan layanan online memerlukan pembuktian identitas Anda dan hak untuk mengakses platform tersebut. Ini sering kali memerlukan penyediaan informasi pribadi, seperti nama, alamat email, tanggal lahir, dan sebagainya. Anda mungkin juga perlu menghafal kata sandi yang panjang atau berisiko kehilangan akses.

Namun, zero-knowledge proof dapat menyederhanakan autentikasi untuk platform dan pengguna. Setelah ZK-proof dihasilkan menggunakan input publik (misalnya, data yang membuktikan keanggotaan pengguna di platform) dan input pribadi (misalnya, detail pengguna), pengguna cukup menyajikannya untuk mengautentikasi identitas mereka saat mereka perlu mengakses layanan. Ini meningkatkan pengalaman bagi pengguna dan membebaskan organisasi dari kebutuhan untuk menyimpan sejumlah besar informasi pengguna.

### Komputasi yang dapat diverifikasi {#verifiable-computation}

Komputasi yang dapat diverifikasi adalah aplikasi lain dari teknologi zero-knowledge untuk meningkatkan desain blockchain. Komputasi yang dapat diverifikasi memungkinkan kita untuk mengalihdayakan komputasi ke entitas lain sambil mempertahankan hasil yang dapat diverifikasi. Entitas tersebut mengirimkan hasil bersama dengan bukti yang memverifikasi bahwa program dieksekusi dengan benar.

Komputasi yang dapat diverifikasi sangat **penting untuk meningkatkan kecepatan pemrosesan di blockchain** tanpa mengurangi keamanan. Memahami hal ini memerlukan pengetahuan tentang perbedaan dalam solusi yang diusulkan untuk peningkatan Ethereum.

[Solusi peningkatan onchain](/developers/docs/scaling/#onchain-scaling), seperti sharding, memerlukan modifikasi ekstensif pada lapisan dasar blockchain. Namun, pendekatan ini sangat kompleks dan kesalahan dalam implementasi dapat merusak model keamanan Ethereum.

[Solusi peningkatan offchain](/developers/docs/scaling/#offchain-scaling) tidak memerlukan perancangan ulang protokol inti Ethereum. Sebaliknya, mereka mengandalkan model komputasi yang dialihdayakan untuk meningkatkan throughput pada lapisan dasar Ethereum.

Berikut adalah cara kerjanya dalam praktik:

- Alih-alih memproses setiap transaksi, Ethereum mengalihkan eksekusi ke rantai terpisah.

- Setelah memproses transaksi, rantai lain mengembalikan hasil untuk diterapkan ke status Ethereum.

Manfaatnya di sini adalah Ethereum tidak perlu melakukan eksekusi apa pun dan hanya perlu menerapkan hasil dari komputasi yang dialihdayakan ke statusnya. Ini mengurangi kemacetan jaringan dan juga meningkatkan kecepatan transaksi (protokol offchain dioptimalkan untuk eksekusi yang lebih cepat).

Rantai tersebut membutuhkan cara untuk memvalidasi transaksi offchain tanpa mengeksekusinya kembali, atau nilai dari eksekusi offchain akan hilang.

Di sinilah komputasi yang dapat diverifikasi berperan. Ketika sebuah node mengeksekusi transaksi di luar Ethereum, ia mengirimkan zero-knowledge proof untuk membuktikan kebenaran eksekusi offchain. Bukti ini (disebut [bukti validitas](/glossary/#validity-proof)) menjamin bahwa sebuah transaksi valid, memungkinkan Ethereum untuk menerapkan hasilnya ke statusnya—tanpa menunggu siapa pun untuk membantahnya.

[Zero-knowledge rollup](/developers/docs/scaling/zk-rollups) dan [validium](/developers/docs/scaling/validium/) adalah dua solusi peningkatan offchain yang menggunakan bukti validitas untuk memberikan skalabilitas yang aman. Protokol ini mengeksekusi ribuan transaksi offchain dan mengirimkan bukti untuk verifikasi di Ethereum. Hasil tersebut dapat diterapkan segera setelah bukti diverifikasi, memungkinkan Ethereum untuk memproses lebih banyak transaksi tanpa meningkatkan komputasi pada lapisan dasar.

Di luar penskalaan layer 2, bukti zero-knowledge juga dapat memverifikasi eksekusi blok L1 Ethereum itu sendiri. zkEVM untuk verifikasi L1 akan memungkinkan validator untuk memverifikasi blok dengan memeriksa bukti alih-alih menjalankan kembali semua transaksi -- memungkinkan batas gas yang lebih tinggi tanpa meningkatkan persyaratan perangkat keras validator.

### Mengurangi penyuapan dan kolusi dalam pemungutan suara onchain {#secure-blockchain-voting}

Skema pemungutan suara blockchain memiliki banyak karakteristik yang menguntungkan: sepenuhnya dapat diaudit, aman terhadap serangan, tahan terhadap penyensoran, dan bebas dari kendala geografis. Namun, bahkan skema pemungutan suara onchain tidak kebal terhadap masalah **kolusi**.

Didefinisikan sebagai "berkoordinasi untuk membatasi persaingan terbuka dengan menipu, mencurangi, dan menyesatkan orang lain," kolusi dapat berbentuk aktor jahat yang memengaruhi pemungutan suara dengan menawarkan suap. Misalnya, Alice mungkin menerima suap dari Bob untuk memilih `option B` pada surat suara meskipun dia lebih suka `option A`.

Penyuapan dan kolusi membatasi efektivitas proses apa pun yang menggunakan pemungutan suara sebagai mekanisme sinyal (terutama di mana pengguna dapat membuktikan bagaimana mereka memilih). Hal ini dapat memiliki konsekuensi yang signifikan, terutama di mana suara bertanggung jawab untuk mengalokasikan sumber daya yang langka.

Misalnya, [mekanisme pendanaan kuadratik](https://www.radicalxchange.org/wiki/plural-funding/) bergantung pada donasi untuk mengukur preferensi terhadap opsi tertentu di antara berbagai proyek barang publik. Setiap donasi dihitung sebagai "suara" untuk proyek tertentu, dengan proyek yang menerima lebih banyak suara mendapatkan lebih banyak dana dari kumpulan pencocokan.

Menggunakan pemungutan suara onchain membuat pendanaan kuadratik rentan terhadap kolusi: transaksi blockchain bersifat publik, sehingga penyuap dapat memeriksa aktivitas onchain penerima suap untuk melihat bagaimana mereka "memilih". Dengan cara ini, pendanaan kuadratik berhenti menjadi sarana yang efektif untuk mengalokasikan dana berdasarkan preferensi agregat komunitas.

Untungnya, solusi yang lebih baru seperti MACI (Minimum Anti-Collusion Infrastructure) menggunakan zero-knowledge proof untuk membuat pemungutan suara onchain (misalnya, mekanisme pendanaan kuadratik) tahan terhadap penyuapan dan kolusi. MACI adalah serangkaian kontrak pintar dan skrip yang memungkinkan administrator pusat (disebut "koordinator") untuk menggabungkan suara dan menghitung hasil _tanpa_ mengungkapkan secara spesifik bagaimana setiap individu memilih. Meskipun demikian, masih dimungkinkan untuk memverifikasi bahwa suara dihitung dengan benar, atau mengonfirmasi bahwa individu tertentu berpartisipasi dalam putaran pemungutan suara.

#### Bagaimana cara kerja MACI dengan zero-knowledge proof? {#how-maci-works-with-zk-proofs}

Pada awalnya, koordinator menyebarkan kontrak MACI di Ethereum, setelah itu pengguna dapat mendaftar untuk pemungutan suara (dengan mendaftarkan kunci publik mereka di kontrak pintar). Pengguna memberikan suara dengan mengirimkan pesan yang dienkripsi dengan kunci publik mereka ke kontrak pintar (suara yang valid harus ditandatangani dengan kunci publik terbaru yang terkait dengan identitas pengguna, di antara kriteria lainnya). Setelah itu, koordinator memproses semua pesan setelah periode pemungutan suara berakhir, menghitung suara, dan memverifikasi hasilnya secara onchain.

Dalam MACI, zero-knowledge proof digunakan untuk memastikan kebenaran komputasi dengan membuatnya tidak mungkin bagi koordinator untuk memproses suara dan menghitung hasil secara tidak benar. Hal ini dicapai dengan mengharuskan koordinator untuk menghasilkan bukti ZK-SNARK yang memverifikasi bahwa a) semua pesan diproses dengan benar b) hasil akhir sesuai dengan jumlah semua suara yang _valid_.

Dengan demikian, bahkan tanpa membagikan rincian suara per pengguna (seperti yang biasanya terjadi), MACI menjamin integritas hasil yang dihitung selama proses penghitungan. Fitur ini berguna dalam mengurangi efektivitas skema kolusi dasar. Kita dapat mengeksplorasi kemungkinan ini dengan menggunakan contoh sebelumnya tentang Bob yang menyuap Alice untuk memilih suatu opsi:

- Alice mendaftar untuk memilih dengan mengirimkan kunci publiknya ke kontrak pintar.
- Alice setuju untuk memilih `option B` dengan imbalan suap dari Bob.
- Alice memilih `option B`.
- Alice secara diam-diam mengirimkan transaksi terenkripsi untuk mengubah kunci publik yang terkait dengan identitasnya.
- Alice mengirimkan pesan (terenkripsi) lain ke kontrak pintar untuk memilih `option A` menggunakan kunci publik yang baru.
- Alice menunjukkan kepada Bob sebuah transaksi yang menunjukkan bahwa dia memilih `option B` (yang tidak valid karena kunci publik tersebut tidak lagi terkait dengan identitas Alice dalam sistem)
- Saat memproses pesan, koordinator melewati suara Alice untuk `option B` dan hanya menghitung suara untuk `option A`. Oleh karena itu, upaya Bob untuk berkolusi dengan Alice dan memanipulasi suara onchain gagal.

Menggunakan MACI _memang_ membutuhkan kepercayaan pada koordinator untuk tidak berkolusi dengan penyuap atau mencoba menyuap pemilih itu sendiri. Koordinator dapat mendekripsi pesan pengguna (diperlukan untuk membuat bukti), sehingga mereka dapat memverifikasi secara akurat bagaimana setiap orang memilih.

Namun dalam kasus di mana koordinator tetap jujur, MACI mewakili alat yang ampuh untuk menjamin kesucian pemungutan suara onchain. Ini menjelaskan popularitasnya di antara aplikasi pendanaan kuadratik (misalnya, [clr.fund](https://clr.fund/#/about/maci)) yang sangat bergantung pada integritas pilihan pemungutan suara masing-masing individu.

[Pelajari lebih lanjut tentang MACI](https://maci.pse.dev/).

## Bagaimana cara kerja zero-knowledge proof? {#how-do-zero-knowledge-proofs-work}

Zero-knowledge proof memungkinkan Anda untuk membuktikan kebenaran suatu pernyataan tanpa membagikan isi pernyataan tersebut atau mengungkapkan bagaimana Anda menemukan kebenaran tersebut. Untuk memungkinkan hal ini, protokol zero-knowledge bergantung pada algoritma yang mengambil beberapa data sebagai input dan mengembalikan 'benar' atau 'salah' sebagai output.

Protokol zero-knowledge harus memenuhi kriteria berikut:

1. **Kelengkapan (Completeness)**: Jika input valid, protokol zero-knowledge selalu mengembalikan 'benar'. Oleh karena itu, jika pernyataan yang mendasarinya benar, dan pembukti serta pemverifikasi bertindak jujur, buktinya dapat diterima.

2. **Kekuatan (Soundness)**: Jika input tidak valid, secara teoritis tidak mungkin untuk mengelabui protokol zero-knowledge agar mengembalikan 'benar'. Oleh karena itu, pembukti yang berbohong tidak dapat menipu pemverifikasi yang jujur agar percaya bahwa pernyataan yang tidak valid adalah valid (kecuali dengan margin probabilitas yang sangat kecil).

3. **Zero-knowledge**: Pemverifikasi tidak mempelajari apa pun tentang suatu pernyataan di luar validitas atau kepalsuannya (mereka memiliki "pengetahuan nol" tentang pernyataan tersebut). Persyaratan ini juga mencegah pemverifikasi untuk mendapatkan input asli (isi pernyataan) dari bukti tersebut.

Dalam bentuk dasar, zero-knowledge proof terdiri dari tiga elemen: **saksi (witness)**, **tantangan (challenge)**, dan **tanggapan (response)**.

- **Saksi (Witness)**: Dengan zero-knowledge proof, pembukti ingin membuktikan pengetahuan tentang beberapa informasi tersembunyi. Informasi rahasia adalah "saksi" dari bukti tersebut, dan asumsi pengetahuan pembukti tentang saksi menetapkan serangkaian pertanyaan yang hanya dapat dijawab oleh pihak yang memiliki pengetahuan tentang informasi tersebut. Dengan demikian, pembukti memulai proses pembuktian dengan memilih pertanyaan secara acak, menghitung jawabannya, dan mengirimkannya ke pemverifikasi.

- **Tantangan (Challenge)**: Pemverifikasi secara acak memilih pertanyaan lain dari kumpulan tersebut dan meminta pembukti untuk menjawabnya.

- **Tanggapan (Response)**: Pembukti menerima pertanyaan, menghitung jawabannya, dan mengembalikannya ke pemverifikasi. Tanggapan pembukti memungkinkan pemverifikasi untuk memeriksa apakah pembukti benar-benar memiliki akses ke saksi. Untuk memastikan pembukti tidak menebak secara membabi buta dan mendapatkan jawaban yang benar secara kebetulan, pemverifikasi memilih lebih banyak pertanyaan untuk diajukan. Dengan mengulangi interaksi ini berkali-kali, kemungkinan pembukti memalsukan pengetahuan tentang saksi turun secara signifikan hingga pemverifikasi merasa puas.

Hal di atas menjelaskan struktur 'zero-knowledge proof interaktif'. Protokol zero-knowledge awal menggunakan pembuktian interaktif, di mana memverifikasi validitas suatu pernyataan memerlukan komunikasi bolak-balik antara pembukti dan pemverifikasi.

Contoh bagus yang mengilustrasikan cara kerja bukti interaktif adalah [kisah gua Ali Baba](https://en.wikipedia.org/wiki/Zero-knowledge_proof#The_Ali_Baba_cave) yang terkenal dari Jean-Jacques Quisquater. Dalam cerita tersebut, Peggy (pembukti) ingin membuktikan kepada Victor (pemverifikasi) bahwa dia mengetahui frasa rahasia untuk membuka pintu ajaib tanpa mengungkapkan frasa tersebut.

### Zero-knowledge proof non-interaktif {#non-interactive-zero-knowledge-proofs}

Meskipun revolusioner, pembuktian interaktif memiliki kegunaan yang terbatas karena mengharuskan kedua belah pihak untuk tersedia dan berinteraksi berulang kali. Bahkan jika pemverifikasi yakin akan kejujuran pembukti, bukti tersebut tidak akan tersedia untuk verifikasi independen (menghitung bukti baru memerlukan serangkaian pesan baru antara pembukti dan pemverifikasi).

Untuk memecahkan masalah ini, Manuel Blum, Paul Feldman, dan Silvio Micali menyarankan [zero-knowledge proof non-interaktif](https://dl.acm.org/doi/10.1145/62212.62222) pertama di mana pembukti dan pemverifikasi memiliki kunci bersama. Ini memungkinkan pembukti untuk mendemonstrasikan pengetahuan mereka tentang beberapa informasi (yaitu, saksi) tanpa memberikan informasi itu sendiri.

Tidak seperti bukti interaktif, bukti non-interaktif hanya memerlukan satu putaran komunikasi antara peserta (pembukti dan pemverifikasi). Pembukti meneruskan informasi rahasia ke algoritma khusus untuk menghitung zero-knowledge proof. Bukti ini dikirim ke pemverifikasi, yang memeriksa bahwa pembukti mengetahui informasi rahasia tersebut menggunakan algoritma lain.

Pembuktian non-interaktif mengurangi komunikasi antara pembukti dan pemverifikasi, membuat ZK-proof lebih efisien. Selain itu, setelah bukti dihasilkan, bukti tersebut tersedia bagi siapa saja (dengan akses ke kunci bersama dan algoritma verifikasi) untuk diverifikasi.

Bukti non-interaktif mewakili terobosan untuk teknologi zero-knowledge dan memacu pengembangan sistem pembuktian yang digunakan saat ini. Kami membahas jenis-jenis bukti ini di bawah ini:

### Jenis-jenis zero-knowledge proof {#types-of-zero-knowledge-proofs}

#### ZK-SNARK {#zk-snarks}

ZK-SNARK adalah akronim dari **Zero-Knowledge Succinct Non-Interactive Argument of Knowledge**. Protokol ZK-SNARK memiliki kualitas berikut:

- **Zero-knowledge**: Pemverifikasi dapat memvalidasi integritas suatu pernyataan tanpa mengetahui apa pun tentang pernyataan tersebut. Satu-satunya pengetahuan yang dimiliki pemverifikasi tentang pernyataan tersebut adalah apakah itu benar atau salah.

- **Ringkas (Succinct)**: Zero-knowledge proof lebih kecil dari saksi dan dapat diverifikasi dengan cepat.

- **Non-interaktif (Non-interactive)**: Bukti ini 'non-interaktif' karena pembukti dan pemverifikasi hanya berinteraksi sekali, tidak seperti bukti interaktif yang memerlukan beberapa putaran komunikasi.

- **Argumen (Argument)**: Bukti ini memenuhi persyaratan 'kekuatan' (soundness), sehingga kecurangan sangat tidak mungkin terjadi.

- **Pengetahuan (Of Knowledge)**: Zero-knowledge proof tidak dapat dibangun tanpa akses ke informasi rahasia (saksi). Sulit, jika bukan tidak mungkin, bagi pembukti yang tidak memiliki saksi untuk menghitung zero-knowledge proof yang valid.

'Kunci bersama' yang disebutkan sebelumnya mengacu pada parameter publik yang disetujui oleh pembukti dan pemverifikasi untuk digunakan dalam menghasilkan dan memverifikasi bukti. Menghasilkan parameter publik (secara kolektif dikenal sebagai Common Reference String (CRS)) adalah operasi yang sensitif karena pentingnya dalam keamanan protokol. Jika entropi (keacakan) yang digunakan dalam menghasilkan CRS jatuh ke tangan pembukti yang tidak jujur, mereka dapat menghitung bukti palsu.

[Komputasi multi-pihak (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) adalah cara untuk mengurangi risiko dalam menghasilkan parameter publik. Beberapa pihak berpartisipasi dalam [upacara pengaturan tepercaya (trusted setup ceremony)](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), di mana setiap orang menyumbangkan beberapa nilai acak untuk menghasilkan CRS. Selama satu pihak yang jujur menghancurkan bagian entropi mereka, protokol ZK-SNARK mempertahankan kekuatan komputasinya.

Pengaturan tepercaya mengharuskan pengguna untuk memercayai peserta dalam pembuatan parameter. Namun, pengembangan ZK-STARK telah memungkinkan protokol pembuktian yang bekerja dengan pengaturan yang tidak tepercaya.

#### ZK-STARK {#zk-starks}

ZK-STARK adalah akronim dari **Zero-Knowledge Scalable Transparent Argument of Knowledge**. ZK-STARK mirip dengan ZK-SNARK, kecuali bahwa mereka:

- **Dapat Diskalakan (Scalable)**: ZK-STARK lebih cepat daripada ZK-SNARK dalam menghasilkan dan memverifikasi bukti ketika ukuran saksi lebih besar. Dengan bukti STARK, waktu pembukti dan verifikasi hanya sedikit meningkat seiring bertambahnya saksi (waktu pembukti dan pemverifikasi SNARK meningkat secara linier dengan ukuran saksi).

- **Transparan (Transparent)**: ZK-STARK bergantung pada keacakan yang dapat diverifikasi secara publik untuk menghasilkan parameter publik untuk pembuktian dan verifikasi alih-alih pengaturan tepercaya. Dengan demikian, mereka lebih transparan dibandingkan dengan ZK-SNARK.

ZK-STARK menghasilkan bukti yang lebih besar daripada ZK-SNARK yang berarti mereka umumnya memiliki overhead verifikasi yang lebih tinggi. Namun, ada kasus (seperti membuktikan kumpulan data besar) di mana ZK-STARK mungkin lebih hemat biaya daripada ZK-SNARK.

## Kekurangan menggunakan zero-knowledge proof {#drawbacks-of-using-zero-knowledge-proofs}

### Biaya perangkat keras {#hardware-costs}

Menghasilkan zero-knowledge proof melibatkan perhitungan yang sangat kompleks yang paling baik dilakukan pada mesin khusus. Karena mesin ini mahal, mereka sering kali di luar jangkauan individu biasa. Selain itu, aplikasi yang ingin menggunakan teknologi zero-knowledge harus memperhitungkan biaya perangkat keras—yang dapat meningkatkan biaya bagi pengguna akhir.

### Biaya verifikasi bukti {#proof-verification-costs}

Memverifikasi bukti juga memerlukan komputasi yang kompleks dan meningkatkan biaya penerapan teknologi zero-knowledge dalam aplikasi. Biaya ini sangat relevan dalam konteks pembuktian komputasi. Misalnya, ZK-rollup membayar ~ 500.000 gas untuk memverifikasi satu bukti ZK-SNARK di Ethereum, dengan ZK-STARK membutuhkan biaya yang lebih tinggi.

### Asumsi kepercayaan {#trust-assumptions}

Dalam ZK-SNARK, Common Reference String (parameter publik) dihasilkan sekali dan tersedia untuk digunakan kembali oleh pihak yang ingin berpartisipasi dalam protokol zero-knowledge. Parameter publik dibuat melalui upacara pengaturan tepercaya, di mana peserta diasumsikan jujur.

Namun sebenarnya tidak ada cara bagi pengguna untuk menilai kejujuran peserta dan pengguna harus memercayai kata-kata pengembang. ZK-STARK bebas dari asumsi kepercayaan karena keacakan yang digunakan dalam menghasilkan string dapat diverifikasi secara publik. Sementara itu, para peneliti sedang mengerjakan pengaturan yang tidak tepercaya untuk ZK-SNARK guna meningkatkan keamanan mekanisme pembuktian.

### Ancaman komputasi kuantum {#quantum-computing-threats}

ZK-SNARK menggunakan kriptografi kurva eliptik untuk enkripsi. Meskipun masalah logaritma diskrit kurva eliptik diasumsikan tidak dapat dipecahkan untuk saat ini, pengembangan komputer kuantum dapat merusak model keamanan ini di masa depan.

ZK-STARK dianggap kebal terhadap ancaman komputasi kuantum, karena hanya bergantung pada fungsi hash yang tahan benturan untuk keamanannya. Tidak seperti pasangan kunci publik-pribadi yang digunakan dalam kriptografi kurva eliptik, hashing yang tahan benturan lebih sulit dipecahkan oleh algoritma komputasi kuantum.

## Bacaan lebih lanjut {#further-reading}

- [Overview of use cases for zero-knowledge proofs](https://pse.dev/projects) — _Tim Privacy and Scaling Explorations_
- [SNARKs vs. STARKS vs. Recursive SNARKs](https://www.alchemy.com/overviews/snarks-vs-starks) — _Alchemy Overviews_
- [A Zero-Knowledge Proof: Improving Privacy on a Blockchain](https://www.altoros.com/blog/zero-knowledge-proof-improving-privacy-for-a-blockchain/) — _Dmitry Lavrenov_
- [zk-SNARKs — A Realistic Zero-Knowledge Example and Deep Dive](https://medium.com/coinmonks/zk-snarks-a-realistic-zero-knowledge-example-and-deep-dive-c5e6eaa7131c) — _Adam Luciano_
- [ZK-STARKs — Create Verifiable Trust, even against Quantum Computers](https://medium.com/coinmonks/zk-starks-create-verifiable-trust-even-against-quantum-computers-dd9c6a2bb13d) — _Adam Luciano_
- [An approximate introduction to how zk-SNARKs are possible](https://vitalik.eth.limo/general/2021/01/26/snarks.html) — _Vitalik Buterin_
- [Why Zero Knowledge Proofs (ZKPs) is a Game Changer for Self-Sovereign Identity](https://frankiefab.hashnode.dev/why-zero-knowledge-proofs-zkps-is-a-game-changer-for-self-sovereign-identity) — _Franklin Ohaegbulam_
- [EIP-7503 Explained: Enabling Private Transfers On Ethereum With ZK Proofs](https://research.2077.xyz/eip-7503-zero-knowledge-wormholes-for-private-ethereum-transactions#introduction) — _Emmanuel Awosika_
- [ZK Card Game: game to learn ZK fundamentals and real-life use cases](https://github.com/ZK-card/zk-cards) - _ZK-Cards_