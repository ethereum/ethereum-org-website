---
title: Bukti sifar pengetahuan
description: Pengenalan bukan teknikal kepada bukti pengetahuan sifar untuk pemula.
lang: ms
---

# Apakah bukti pengetahuan sifar? {#what-are-zk-proofs}

Bukti pengetahuan sifar ialah satu cara untuk membuktikan kesahihan sesuatu kenyataan tanpa mendedahkan kenyataan itu sendiri. ‘Pembukti’ ialah pihak yang cuba membuktikan sesuatu tuntutan, manakala ‘pengesah’ bertanggungjawab untuk mengesahkan tuntutan tersebut.

Bukti pengetahuan sifar pertama kali muncul dalam makalah 1985, "[Kerumitan pengetahuan sistem bukti interaktif](http://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf)" yang menyediakan takrifan bukti pengetahuan sifar yang digunakan secara meluas hari ini:

> Protokol pengetahuan sifar ialah kaedah yang mana satu pihak (pembukti) **boleh membuktikan** kepada pihak lain (pengesah) **bahawa sesuatu itu benar, tanpa mendedahkan sebarang maklumat** selain daripada hakikat bahawa kenyataan khusus ini adalah benar.

Bukti sifar pengetahuan telah bertambah baik selama bertahun-tahun dan ia kini digunakan dalam beberapa aplikasi dunia sebenar.

<YouTube id="fOGdb1CTu5c" />

## Mengapakah kita memerlukan bukti pengetahuan sifar? {#why-zero-knowledge-proofs-are-important}

Bukti pengetahuan sifar mewakili satu kejayaan dalam kriptografi gunaan, kerana ia berjanji untuk meningkatkan keselamatan maklumat untuk individu. Pertimbangkan cara anda boleh membuktikan tuntutan (cth., “Saya warga negara X”) kepada pihak lain (cth., pembekal perkhidmatan). Anda perlu memberikan “bukti” untuk menyandarkan tuntutan anda, seperti pasport negara atau lesen memandu.

Tetapi terdapat masalah dengan pendekatan ini, terutamanya kekurangan privasi. Maklumat Pengenalan Peribadi (PII) yang dikongsi dengan perkhidmatan pihak ketiga disimpan dalam pangkalan data pusat, yang terdedah kepada penggodaman. Dengan kecurian identiti menjadi isu kritikal, terdapat panggilan untuk lebih banyak cara melindungi privasi untuk berkongsi maklumat sensitif.

Bukti sifar pengetahuan menyelesaikan masalah ini dengan **menghapuskan keperluan untuk mendedahkan maklumat untuk membuktikan kesahihan tuntutan**. Protokol pengetahuan sifar menggunakan pernyataan (dipanggil ‘saksi’) sebagai input untuk menjana bukti ringkas tentang kesahihannya. Bukti ini memberikan jaminan kukuh bahawa kenyataan adalah benar tanpa mendedahkan maklumat yang digunakan dalam menciptanya.

Berbalik kepada contoh terdahulu kami, satu-satunya bukti yang anda perlukan untuk membuktikan tuntutan kewarganegaraan anda ialah bukti pengetahuan sifar. Pengesah hanya perlu menyemak sama ada sifat tertentu bagi bukti itu benar untuk diyakinkan bahawa pernyataan asas itu juga benar.

## Kes penggunaan untuk bukti pengetahuan sifar {#use-cases-for-zero-knowledge-proofs}

### Pembayaran tanpa nama {#anonymous-payments}

Pembayaran kad kredit selalunya kelihatan kepada berbilang pihak, termasuk penyedia pembayaran, bank dan pihak lain yang berminat (mis., pihak berkuasa kerajaan). Walaupun pengawasan kewangan mempunyai faedah untuk mengenal pasti aktiviti haram, ia juga menjejaskan privasi rakyat biasa.

Mata wang kripto bertujuan untuk menyediakan cara kepada pengguna untuk menjalankan transaksi persendirian, rakan ke rakan. Tetapi kebanyakan transaksi mata wang kripto boleh dilihat secara terbuka pada blok rantai awam. Identiti pengguna selalunya adalah nama samaran dan sama ada dengan sengaja dikaitkan dengan identiti dunia sebenar (mis. dengan memasukkan alamat ETH pada profil Twitter atau GitHub) atau boleh dikaitkan dengan identiti dunia sebenar menggunakan analisis data asas dalam dan luar rantai.

Terdapat "syiling privasi" khusus yang direka untuk transaksi tanpa nama sepenuhnya. Blok rantai yang memfokuskan privasi, seperti Zcash dan Monero, melindungi butiran transaksi, termasuk alamat penghantar/penerima, jenis aset, kuantiti dan garis masa transaksi.

Dengan membakar teknologi pengetahuan sifar ke dalam protokol, rangkaian [blok rantaik](/glossary/#blockchain) yang memfokuskan privasi membenarkan [nod](/glossary/#node) untuk mengesahkan transaksi tanpa perlu mengakses data transaksi.

**Bukti pengetahuan sifar juga digunakan untuk penyamaran transaksi pada blok rantai awam**. Contohnya ialah Tornado Cash, perkhidmatan teragih, bukan penjagaan yang membolehkan pengguna menjalankan transaksi peribadi di Ethereum. Tornado Cash menggunakan bukti pengetahuan sifar untuk mengelirukan butiran transaksi dan menjamin privasi kewangan. Malangnya, kerana ini adalah alat privasi "ikut serta", ia dikaitkan dengan aktiviti haram. Untuk mengatasinya, privasi akhirnya harus menjadi lalai pada blok rantai awam.

### Perlindungan identiti {#identity-protection}

Sistem pengurusan identiti semasa meletakkan maklumat peribadi pada risiko. Bukti pengetahuan sifar boleh membantu individu mengesahkan identiti sambil melindungi butiran sensitif.

Bukti sifar pengetahuan amat berguna dalam konteks [identiti teragih](/decentralized-identity/). Identiti teragih (juga digambarkan sebagai 'identiti kedaulatan diri') memberikan individu keupayaan untuk mengawal akses kepada pengecam peribadi. Membuktikan kewarganegaraan anda tanpa mendedahkan butiran ID cukai atau pasport anda ialah contoh yang baik tentang cara teknologi pengetahuan sifar mendayakan identiti teragih.

### Pengesahan {#authentication}

Menggunakan perkhidmatan dalam talian memerlukan pembuktian identiti dan hak anda untuk mengakses platform tersebut. Ini selalunya memerlukan pemberian maklumat peribadi, seperti nama, alamat e-mel, tarikh lahir, dan sebagainya. Anda juga mungkin perlu menghafal kata laluan yang panjang atau berisiko kehilangan akses.

Bukti sifar pengetahuan, bagaimanapun, boleh memudahkan pengesahan untuk kedua-dua platform dan pengguna. Setelah bukti ZK dijana menggunakan input awam (cth., data yang membuktikan keahlian pengguna platform) dan input peribadi (cth., butiran pengguna), pengguna hanya perlu menunjuknya untuk mengesahkan identiti mereka apabila mereka perlu mengakses perkhidmatan tersebut. Ini meningkatkan pengalaman pengguna dan membebaskan organisasi daripada keperluan untuk menyimpan sejumlah besar maklumat pengguna.

### Pengiraan yang boleh disahkan {#verifiable-computation}

Pengiraan yang boleh disahkan ialah satu lagi aplikasi teknologi pengetahuan sifar untuk menambah baik reka bentuk blok rantai. Pengkomputeran yang boleh disahkan membolehkan kami menyumber luar pengiraan kepada entiti lain sambil mengekalkan keputusan yang boleh disahkan. Entiti menyerahkan keputusan bersama-sama dengan bukti yang mengesahkan bahawa program telah dilaksanakan dengan betul.

Pengiraan yang boleh disahkan adalah **penting untuk meningkatkan kelajuan pemprosesan pada blok rantai** tanpa mengurangkan keselamatan. Memahami ini memerlukan pengetahuan tentang perbezaan dalam penyelesaian yang dicadangkan untuk mengembangkan Ethereum.

[Penyelesaian penskalaan pada rantaian](/developers/docs/scaling/#on-chain-scaling), seperti pembahagian, memerlukan pengubahsuaian meluas lapisan asas blok rantai. Walau bagaimanapun, pendekatan ini sangat kompleks dan kesilapan dalam pelaksanaan boleh menjejaskan model keselamatan Ethereum.

[Penyelesaian penskalaan luar rantaian](/developers/docs/scaling/#off-chain-scaling) tidak memerlukan mereka bentuk semula protokol teras Ethereum. Sebaliknya mereka bergantung pada model pengiraan penyumberan luar untuk meningkatkan daya pengeluaran pada lapisan asas Ethereum.

Begini cara ia berfungsi secara praktikal:

- Daripada memproses setiap transaksi, Ethereum memunggah pelaksanaan ke rantaian berasingan.

- Selepas memproses transaksi, rantaian lain mengembalikan keputusan untuk digunakan pada keadaan Ethereum.

Faedah di sini ialah Ethereum tidak perlu melakukan apa-apa pelaksanaan dan hanya perlu menggunakan hasil daripada pengiraan penyumberan luar kepada keadaannya. Ini mengurangkan kesesakan rangkaian dan juga meningkatkan kelajuan transaksi (protokol luar rantaian dioptimumkan untuk pelaksanaan yang lebih pantas).

Rantaian memerlukan cara untuk mengesahkan transaksi luar rantaian tanpa melaksanakannya semula, atau nilai pelaksanaan luar rantaian hilang.

Di sinilah pengiraan yang boleh disahkan digunakan. Apabila nod melaksanakan transaksi di luar Ethereum, ia menyerahkan bukti pengetahuan sifar untuk membuktikan ketepatan pelaksanaan luar rantaian. Bukti ini (dipanggil [bukti kesahihan](/glossary/#validity-proof)) menjamin bahawa transaksi adalah sah, membolehkan Ethereum menggunakan keputusan itu kepada keadaannya—tanpa menunggu sesiapa pun mempertikaikannya.

[Penggulungan pengetahuan sifar](/developers/docs/scaling/zk-rollups) dan [validium](/developers/docs/scaling/validium/) ialah dua penyelesaian penskalaan luar rantaian yang menggunakan bukti kesahihan untuk menyediakan kebolehskalaan yang selamat. Protokol ini melaksanakan beribu-ribu transaksi di luar rantaian dan menyerahkan bukti untuk pengesahan pada Ethereum. Keputusan tersebut boleh digunakan serta-merta sebaik sahaja bukti disahkan, membolehkan Ethereum memproses lebih banyak transaksi tanpa meningkatkan pengiraan pada lapisan asas.

### Mengurangkan rasuah dan pakatan sulit dalam pengundian berantai {#secure-blockchain-voting}

Skim pengundian blok rantai mempunyai banyak ciri yang menguntungkan: ia boleh diaudit sepenuhnya, selamat daripada serangan, tahan terhadap penapisan dan bebas daripada kekangan geografi. Tetapi walaupun skim pengundian dalam rantaian tidak terlepas daripada masalah **pakatan sulit**.

Ditakrifkan sebagai "menyelaraskan untuk mengehadkan persaingan terbuka dengan memperdaya, menipu dan mengelirukan orang lain", pakatan sulit mungkin berbentuk pelakon yang berniat jahat yang mempengaruhi pengundian dengan menawarkan rasuah. Sebagai contoh, Alice mungkin menerima rasuah daripada Bob untuk mengundi `pilihan B` pada undi walaupun dia memilih `pilihan A`.

Rasuah dan pakatan sulit mengehadkan keberkesanan sebarang proses yang menggunakan pengundian sebagai mekanisme isyarat (terutamanya di mana pengguna boleh membuktikan cara mereka mengundi). Ini boleh membawa kesan yang ketara, terutamanya apabila undi bertanggungjawab untuk memperuntukkan sumber yang terhad.

Sebagai contoh, [mekanisme pembiayaan kuadratik](https://www.radicalxchange.org/concepts/plural-funding/) bergantung pada derma untuk mengukur keutamaan bagi pilihan tertentu di antara projek kebaikan awam yang berbeza. Setiap derma dikira sebagai "undi" untuk projek tertentu, dengan projek yang menerima lebih banyak undian mendapat lebih banyak dana daripada kumpulan yang sepadan.

Menggunakan pengundian dalam rantaian menjadikan pembiayaan kuadratik terdedah kepada pakatan sulit: transaksi blok rantai adalah awam, jadi perasuah boleh memeriksa aktiviti dalam rantaian penerima rasuah untuk melihat cara mereka "mengundi". Dengan cara ini pembiayaan kuadratik tidak lagi menjadi cara yang berkesan untuk memperuntukkan dana berdasarkan keutamaan agregat masyarakat.

Mujur, penyelesaian yang lebih baharu seperti MACI (Infrastruktur Antipakatan Sulit Minimum) menggunakan bukti pengetahuan sifar untuk membuat undian pada rantaian (cth., mekanisme pembiayaan kuadratik) tahan terhadap rasuah dan pakatan sulit. MACI ialah satu set kontrak pintar dan skrip yang membenarkan pentadbir pusat (dipanggil "penyelaras") untuk mengagregat undi dan mengira keputusan _tanpa_ mendedahkan secara spesifik cara setiap individu mengundi. Walaupun begitu, masih boleh untuk mengesahkan bahawa undi telah dikira dengan betul, atau mengesahkan bahawa individu tertentu menyertai pusingan pengundian.

#### Bagaimanakah MACI berfungsi dengan bukti pengetahuan sifar? {#how-maci-works-with-zk-proofs}

Pada permulaannya, penyelaras menggunakan kontrak MACI pada Ethereum, selepas itu pengguna boleh mendaftar untuk mengundi (dengan mendaftarkan kunci awam mereka dalam kontrak pintar). Pengguna membuang undi dengan menghantar mesej yang disulitkan dengan kunci awam mereka kepada kontrak pintar (undi yang sah mesti ditandatangani dengan kunci awam terkini yang dikaitkan dengan identiti pengguna, antara kriteria lain). Selepas itu, penyelaras memproses semua mesej sebaik sahaja tempoh pengundian tamat, mengira undian dan mengesahkan keputusan dalam rantaian.

Dalam MACI, bukti pengetahuan sifar digunakan untuk memastikan ketepatan pengiraan dengan menyukarkan penyelaras untuk memproses undi dan keputusan pengiraan secara salah. Ini dicapai dengan menghendaki penyelaras menjana bukti ZK-SNARK yang mengesahkan bahawa a) semua mesej telah diproses dengan betul b) keputusan akhir sepadan dengan jumlah semua undian _sah_.

Oleh itu, walaupun tanpa berkongsi pecahan undi bagi setiap pengguna (seperti yang biasa berlaku), MACI menjamin integriti keputusan yang dikira semasa proses penjumlahan. Ciri ini berguna dalam mengurangkan keberkesanan skim pakatan sulit asas. Kita boleh meneroka kemungkinan ini dengan menggunakan contoh Bob merasuah Alice sebelum ini untuk mengundi pilihan:

- Alice mendaftar untuk mengundi dengan menghantar kunci awam mereka kepada kontrak pintar.
- Alice bersetuju untuk mengundi `pilihan B` sebagai pertukaran untuk rasuah daripada Bob.
- Alice mengundi untuk `pilihan B`.
- Alice secara rahsia menghantar transaksi yang disulitkan untuk menukar kunci awam yang dikaitkan dengan identitinya.
- Alice menghantar satu lagi mesej (disulitkan) kepada mengundi kontrak pintar untuk `pilihan A` menggunakan kunci awam baharu.
- Alice menunjukkan kepada Bob transaksi yang menunjukkan dia mengundi `pilihan B` (yang tidak sah kerana kunci awam tidak lagi dikaitkan dengan identiti Alice dalam sistem)
- Semasa memproses mesej, penyelaras melangkau undian Alice untuk `pilihan B` dan hanya mengira undian untuk `pilihan A`. Oleh itu, percubaan Bob untuk bersekongkol dengan Alice dan memanipulasi undi atas rantai gagal.

Menggunakan MACI _ada_ memerlukan kepercayaan kepada penyelaras untuk tidak bersekongkol dengan rasuah atau cuba merasuah pengundi sendiri. Penyelaras boleh menyahsulit mesej pengguna (diperlukan untuk mencipta bukti), supaya mereka boleh mengesahkan dengan tepat cara setiap orang mengundi.

Tetapi dalam kes di mana penyelaras tetap jujur, MACI mewakili alat yang berkuasa untuk menjamin kesucian pengundian dalam rantaian. Ini menerangkan popularitinya dalam kalangan aplikasi pembiayaan kuadratik (cth., [clr.fund](https://clr.fund/#/about/maci)) yang sangat bergantung pada integriti pilihan pengundian setiap individu.

[Ketahui lebih lanjut tentang MACI](https://privacy-scaling-explorations.github.io/maci/).

## Bagaimanakah bukti pengetahuan sifar berfungsi? {#how-do-zero-knowledge-proofs-work}

Bukti pengetahuan sifar membolehkan anda membuktikan kebenaran kenyataan tanpa berkongsi kandungan pernyataan itu atau mendedahkan cara anda menemukan kebenaran. Untuk membolehkan ini, protokol pengetahuan sifar bergantung pada algoritma yang mengambil beberapa data sebagai input dan mengembalikan 'benar' atau 'salah' sebagai output.

Protokol pengetahuan sifar mesti memenuhi kriteria berikut:

1. **Kelengkapan**: Jika input adalah sah, protokol pengetahuan sifar sentiasa mengembalikan 'benar'. Oleh itu, jika pernyataan asas adalah benar, dan pembukti dan pengesah bertindak jujur, buktinya boleh diterima.

2. **Ketulenan**: Jika input tidak sah, secara teorinya mustahil untuk menipu protokol pengetahuan sifar untuk mengembalikan 'benar'. Oleh itu, pembohong tidak boleh menipu pengesah yang jujur ​​untuk mempercayai pernyataan yang tidak sah adalah sah (kecuali dengan margin kebarangkalian yang kecil).

3. **Pengetahuan sifar**: Pengesah tidak mengetahui apa-apa tentang pernyataan di luar kesahihan atau kepalsuannya (mereka mempunyai "pengetahuan sifar" tentang pernyataan itu). Keperluan ini juga menghalang pengesah daripada memperoleh input asal (kandungan pernyataan) daripada bukti.

Dalam bentuk asas, bukti pengetahuan sifar terdiri daripada tiga elemen: **saksi**, **cabaran** dan **tindak balas**.

- **Saksi**: Dengan bukti pengetahuan sifar, pembukti ingin membuktikan pengetahuan tentang beberapa maklumat tersembunyi. Maklumat rahsia adalah "saksi" kepada bukti, dan pengetahuan yang diandaikan oleh pembukti tentang saksi mewujudkan satu set soalan yang hanya boleh dijawab oleh pihak yang mengetahui maklumat tersebut. Oleh itu, pembukti memulakan proses pembuktian dengan memilih soalan secara rawak, mengira jawapan, dan menghantarnya kepada pengesah.

- **Cabaran**: Pengesah memilih soalan lain secara rawak daripada set dan meminta pembukti menjawabnya.

- **Jawapan**: Pengesah menerima soalan, mengira jawapan dan mengembalikannya kepada pengesah. Respons pembukti membolehkan pengesah menyemak sama ada pembukti benar-benar mempunyai akses kepada saksi. Untuk memastikan pembukti tidak meneka secara membuta tuli dan mendapat jawapan yang betul secara kebetulan, pengesah memilih lebih banyak soalan untuk ditanya. Dengan mengulangi interaksi ini berkali-kali, kemungkinan pembukti yang menipu tentang pengetahuan saksi berkurang dengan ketara sehingga pihak pengesah berpuas hati.

Di atas menerangkan struktur 'bukti pengetahuan sifar interaktif'. Protokol pengetahuan sifar awal menggunakan pembuktian interaktif, di mana mengesahkan kesahihan pernyataan memerlukan komunikasi bolak-balik antara pembukti dengan pengesah.

Contoh yang baik yang menggambarkan cara pembuktian interaktif berfungsi ialah [kisah gua Ali Baba](https://en.wikipedia.org/wiki/Zero-knowledge_proof#The_Ali_Baba_cave) Jean-Jacques Quisquater yang terkenal. Dalam cerita itu, Peggy (pembukti) ingin membuktikan kepada Victor (pengesah) bahawa dia mengetahui frasa rahsia untuk membuka pintu ajaib tanpa mendedahkan frasa itu.

### Bukti sifar pengetahuan bukan interaktif {#non-interactive-zero-knowledge-proofs}

Walaupun satu revolusi, pembuktian interaktif mempunyai kegunaan yang terhad kerana ia memerlukan kedua-dua pihak untuk tersedia dan berinteraksi berulang kali. Walaupun seorang pengesah yakin dengan kejujuran seorang pembukti, bukti itu tidak akan tersedia untuk pengesahan bebas (mengira bukti baharu memerlukan satu set mesej baharu antara pembukti dan pengesah).

Untuk menyelesaikan masalah ini, Manuel Blum, Paul Feldman dan Silvio Micali mencadangkan [bukti pengetahuan sifar bukan interaktif](https://dl.acm.org/doi/10.1145/62212.62222) yang pertama di mana pembukti dan pengesah mempunyai kunci dikongsi. Ini membolehkan pembukti menunjukkan pengetahuan mereka tentang beberapa maklumat (iaitu, saksi) tanpa memberikan maklumat itu sendiri.

Tidak seperti bukti interaktif, bukti bukan interaktif memerlukan hanya satu pusingan komunikasi antara peserta (pembukti dan pengesah). Pembukti menghantar maklumat rahsia kepada algoritma khas untuk mengira bukti pengetahuan sifar. Bukti ini dihantar kepada pengesah, yang menyemak bahawa pembukti mengetahui maklumat rahsia menggunakan algoritma lain.

Pembuktian tidak interaktif mengurangkan komunikasi antara pembukti dan pengesah, menjadikan pembuktian ZK lebih cekap. Selain itu, sebaik sahaja bukti dijana, ia tersedia untuk orang lain (dengan akses kepada kunci kongsi dan algoritma pengesahan) untuk mengesahkan.

Bukti bukan interaktif mewakili satu kejayaan untuk teknologi pengetahuan sifar dan mendorong pembangunan sistem pembuktian yang digunakan hari ini. Kami membincangkan jenis bukti ini di bawah:

### Jenis bukti pengetahuan sifar {#types-of-zero-knowledge-proofs}

#### ZK-SNARKs {#zk-snarks}

ZK-SNARK ialah akronim untuk **Argumen Pengetahuan Tidak Interaktif Sifar Pengetahuan Ringkas**. Protokol ZK-SNARK mempunyai kualiti berikut:

- **Pengetahuan sifar**: Pengesah boleh mengesahkan integriti pernyataan tanpa mengetahui apa-apa lagi tentang pernyataan itu. Satu-satunya pengetahuan yang diketahui oleh pengesah tentang pernyataan itu ialah sama ada ia benar atau palsu.

- **Ringkas**: Bukti pengetahuan sifar adalah lebih kecil daripada saksi dan boleh disahkan dengan cepat.

- **Tidak interaktif**: Buktinya adalah 'tidak interaktif' kerana pembukti dan pengesah hanya berinteraksi sekali, tidak seperti bukti interaktif yang memerlukan beberapa pusingan komunikasi.

- **Hujah**: Buktinya memenuhi keperluan 'ketulenan', jadi penipuan sangat tidak mungkin.

- **(Daripada) Pengetahuan**: Bukti pengetahuan sifar tidak boleh dibina tanpa akses kepada maklumat rahsia (saksi). Sukar, jika tidak mustahil, bagi seorang pembukti yang tidak mempunyai saksi untuk mengira bukti pengetahuan sifar yang sah.

'Kunci kongsi' yang disebut sebelum ini merujuk kepada parameter awam yang pembukti dan pengesah bersetuju untuk gunakan dalam menjana dan mengesahkan bukti. Menjana parameter awam (secara kolektif dikenali sebagai Common Reference String (CRS)) ialah operasi yang sensitif kerana kepentingannya dalam keselamatan protokol. Jika entropi (kerawakan) yang digunakan dalam menghasilkan CRS jatuh ke tangan pembukti yang tidak jujur, mereka boleh mengira bukti palsu.

[Pengiraan berbilang pihak (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) ialah satu cara untuk mengurangkan risiko dalam menjana parameter awam. Berbilang pihak mengambil bahagian dalam [majlis persediaan yang dipercayai](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), di mana setiap orang menyumbang beberapa nilai rawak untuk menjana CRS. Selagi satu pihak yang jujur memusnahkan bahagian entropi mereka, protokol ZK-SNARK mengekalkan keteguhan pengiraan.

Persediaan yang dipercayai memerlukan pengguna mempercayai peserta dalam penjanaan parameter. Walau bagaimanapun, pembangunan ZK-STARK telah mendayakan protokol pembuktian yang berfungsi dengan persediaan yang tidak dipercayai.

#### ZK-STARKs {#zk-starks}

ZK-STARK ialah akronim untuk **Argumen Pengetahuan Telus Boleh Skala Sifar Pengetahuan**. ZK-STARK adalah serupa dengan ZK-SNARK, kecuali ia adalah:

- **Boleh skala**: ZK-STARK lebih pantas daripada ZK-SNARK dalam menjana dan mengesahkan bukti apabila saiz saksi lebih besar. Dengan pembuktian STARK, masa pembuktian dan pengesahan hanya meningkat sedikit apabila saksi bertambah (masa pembukti dan pengesahan SNARK meningkat secara linear dengan saiz saksi).

- **Telus**: ZK-STARK bergantung pada kerawakan yang boleh disahkan secara terbuka untuk menjana parameter awam untuk pembuktian dan pengesahan dan bukannya persediaan yang dipercayai. Oleh itu, mereka lebih telus berbanding ZK-SNARK.

ZK-STARK menghasilkan bukti yang lebih besar daripada ZK-SNARK bermakna ia biasanya mempunyai overhed pengesahan yang lebih tinggi. Walau bagaimanapun, terdapat kes (seperti membuktikan set data yang besar) di mana ZK-STARK mungkin lebih kos efektif daripada ZK-SNARK.

## Kelemahan menggunakan bukti pengetahuan sifar {#drawbacks-of-using-zero-knowledge-proofs}

### Kos perkakasan {#hardware-costs}

Menjana bukti pengetahuan sifar melibatkan pengiraan yang sangat kompleks yang terbaik dilakukan pada mesin khusus. Memandangkan mesin ini mahal, ia selalunya tidak dapat dicapai oleh individu biasa. Selain itu, aplikasi yang ingin menggunakan teknologi pengetahuan sifar mesti mengambil kira kos perkakasan—yang mungkin meningkatkan kos untuk pengguna akhir.

### Kos pengesahan bukti {#proof-verification-costs}

Mengesahkan bukti juga memerlukan pengiraan yang kompleks dan meningkatkan kos untuk melaksanakan teknologi pengetahuan sifar dalam aplikasi. Kos ini amat relevan dalam konteks pembuktian pengiraan. Contohnya, ZK-rollups membayar ~ 500,000 gas untuk mengesahkan satu bukti ZK-SNARK pada Ethereum, dengan ZK-STARK memerlukan bayaran yang lebih tinggi.

### Andaian kepercayaan {#trust-assumptions}

Dalam ZK-SNARK, Rentetan Rujukan Biasa (parameter awam) dijana sekali dan tersedia untuk digunakan semula kepada pihak yang ingin mengambil bahagian dalam protokol pengetahuan sifar. Parameter awam dibuat melalui upacara persediaan yang dipercayai, di mana peserta diandaikan jujur.

Tetapi tidak ada cara untuk pengguna menilai kejujuran peserta dan pengguna perlu menerima pembangun mengikut kata-kata mereka. ZK-STARK bebas daripada andaian kepercayaan kerana kerawak yang digunakan dalam menjana rentetan boleh disahkan secara umum. Sementara itu, penyelidik sedang mengusahakan tetapan yang tidak dipercayai untuk ZK-SNARK untuk meningkatkan keselamatan mekanisme pembuktian.

### Ancaman pengkomputeran kuantum {#quantum-computing-threats}

ZK-SNARK menggunakan kriptografi lengkung eliptik untuk penyulitan. Walaupun masalah logaritma diskret keluk eliptik diandaikan sukar diatasi buat masa ini, pembangunan komputer kuantum boleh memecahkan model keselamatan ini pada masa hadapan.

ZK-STARK dianggap kebal terhadap ancaman pengkomputeran kuantum, kerana ia hanya bergantung pada fungsi cincang tahan perlanggaran untuk keselamatannya. Tidak seperti gandingan kunci awam-swasta yang digunakan dalam kriptografi lengkung eliptik, pencincangan tahan perlanggaran lebih sukar untuk dipecahkan oleh algoritma pengkomputeran kuantum.

## Bacaan lanjut {#further-reading}

- [Gambaran keseluruhan kes penggunaan untuk bukti sifar pengetahuan](https://pse.dev/projects) — _Pasukan Penerokaan Privasi dan Penskalaan_
- [SNARK lwn. STARK lwn. SNARK Rekursif](https://www.alchemy.com/overviews/snarks-vs-starks) — _Gambaran Keseluruhan Alkimia_
- [Bukti Pengetahuan Sifar: Meningkatkan Privasi pada Blok Rantai](https://www.altoros.com/blog/zero-knowledge-proof-improving-privacy-for-a-blockchain/) — _Dmitry Lavrenov_
- [zk-SNARK — Contoh dan Penghuraian Mendalam Pengetahuan Sifar Realistik](https://medium.com/coinmonks/zk-snarks-a-realistic-zero-knowledge-example-and-deep-dive-c5e6eaa7131c) — _Adam Luciano_
- [ZK-STARK — Cipta Kepercayaan Boleh Disahkan, walaupun terhadap Komputer Kuantum](https://medium.com/coinmonks/zk-starks-create-verifiable-trust-even-against-quantum-computers-dd9c6a2bb13d) — _Adam Luciano_
- [Anggaran pengenalan tentang cara zk-SNARK mungkin](https://vitalik.eth.limo/general/2021/01/26/snarks.html) — _Vitalik Buterin_
- [Sebab Bukti Pengetahuan Sifar (ZKP) ialah Pengubah Permainan untuk Identiti Berdaulat Diri](https://frankiefab.hashnode.dev/why-zero-knowledge-proofs-zkps-is-a-game-changer-for-self-sovereign-identity) — _Franklin Ohaegbulam_

