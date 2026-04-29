---
title: "Atom, institusi, rantai blok"
description: "Josh Stark mengusulkan kerangka kerja baru untuk memahami apa itu rantai blok, memperkenalkan konsep 'kekerasan' (hardness) sebagai sifat bersama yang menghubungkan atom, institusi, dan rantai blok sebagai bahan bangunan peradaban."
lang: id
youtubeId: "zI07mqNdxzA"
uploadDate: 2024-04-06
duration: "0:29:13"
educationLevel: beginner
topic:
  - "cara-kerja-ethereum"
  - "rantai-blok"
  - "ethereum"
format: presentation
author: ETHGlobal
breadcrumb: "Atom, Institusi, Rantai Blok"
---

Sebuah pidato utama filosofis oleh **Josh Stark** dari Yayasan Ethereum di Pragma Denver 2024, yang mengusulkan kerangka kerja baru untuk memahami rantai blok. Pembicaraan ini memperkenalkan konsep "kekerasan" (hardness) sebagai sifat bersama yang menghubungkan atom, institusi, dan rantai blok sebagai bahan bangunan peradaban.

*Transkrip ini adalah salinan yang dapat diakses dari [transkrip video asli](https://www.youtube.com/watch?v=zI07mqNdxzA) yang diterbitkan oleh ETHGlobal. Transkrip ini telah diedit sedikit agar lebih mudah dibaca.*

#### Mengapa kita tidak bisa menjelaskan rantai blok? (0:00) {#why-cant-we-explain-blockchains-000}

Halo semuanya, terima kasih sudah hadir di Pragma di Denver. Nama saya Josh. Saya bekerja di Yayasan Ethereum — saya sudah bersama EF selama sekitar lima tahun sekarang. Saya suka bercanda bahwa pekerjaan saya adalah mencari tahu apa yang seharusnya menjadi pekerjaan saya, dan itu berubah setiap enam bulan.

Saya telah melakukan banyak hal berbeda dalam karier saya di dunia kripto. Saya bekerja di dompet Bitcoin generasi awal. Saya membangun — yah, saya membeli — ATM Bitcoin di Toronto dan menjalankannya selama sekitar satu tahun pada 2015. Pada 2017 saya ikut mendirikan ETHGlobal, serta sebuah perusahaan bernama L4 yang mengerjakan solusi penskalaan lapisan 2 (l2) awal. Dan selama bertahun-tahun saya telah menulis banyak postingan blog.

Melalui semua ini, saya masih belum bisa benar-benar menjelaskan apa yang sedang kami lakukan atau mengapa. Saya memiliki perasaan bahwa ini sangat penting, bahwa ini akan mengubah dunia. Jangan salah paham — saya bisa berbicara tentang aplikasi individual. Kita bisa menjelaskan Bitcoin, NFT, Uniswap, ENS. Semua hal ini dalam ruang lingkup kecilnya tidak terlalu sulit untuk dijelaskan. Tetapi ketika kita mencoba berbicara tentang gambaran besarnya — apa artinya ada satu teknologi yang memungkinkan semua hal ini — kita mulai tersandung. Kita melakukan senam mental, melontarkan kata-kata populer (buzzwords) kepada orang-orang, mencoba menjelaskan berbagai hal.

Kita benar-benar perlu memahami intinya, dan saya rasa kita belum sedekat itu. Ini adalah sebuah masalah! Jika kita bisa berbicara tentang aplikasi-aplikasi individual ini tetapi tidak bisa mengartikulasikan apa kesamaan mereka — ada sesuatu yang kita lewatkan. Ada tingkat penjelasan yang belum ditemukan, dan saya pikir itu penting. Firasat saya adalah begitu kita menemukannya, itu akan terasa sangat jelas.

Jadi ini dimulai sebagai pertanyaan yang sangat spesifik yang saya miliki: apa itu teknologi serbaguna? Apa kapasitas fundamental ini? Dan itu berubah menjadi sesuatu yang menurut saya jauh lebih menarik.

#### Claude Shannon dan gagasan tentang informasi (4:00) {#claude-shannon-and-the-idea-of-information-400}

Izinkan saya bercerita. Pada tahun 1930-an dan 40-an, Claude Shannon dikelilingi oleh awal mula era baru. Di Bell Labs, ia mengerjakan sistem pengendalian tembakan dan kriptografi selama perang, dan ia mulai memikirkan pendekatan yang lebih umum terhadap informasi. Awalnya ia tidak menyebutnya informasi — pada tahun 1939 ia menulis kepada seorang rekan bahwa ia sedang memikirkan "transmisi kecerdasan." Kata informasi memiliki arti yang berbeda saat itu.

Ia menerbitkan "The Mathematical Theory of Communications" pada tahun 1948 — sebuah makalah dasar yang membuka jalan bagi era informasi. Yang paling penting bagi kita, makalah ini untuk pertama kalinya memperkenalkan gagasan abstrak tentang informasi — sebuah definisi yang tidak terikat pada musik, ucapan, sastra, atau kode. Ini adalah makalah yang memperkenalkan bit — unit informasi yang tidak dapat direduksi yang dapat Anda ukur dalam konteks apa pun.

Sebelum momen ini, tidak ada yang benar-benar memiliki konsep informasi sebagai hal yang universal dan umum. Itu mungkin tampak gila sekarang — kita telah menggunakan teknologi informasi selama ribuan tahun. Hal ini terkait erat dengan apa artinya menjadi manusia, menggunakan ucapan dan bahasa. Tetapi kita tidak menamai sifat mendasar yang umum di semua hal ini sampai baru-baru ini.

Apa yang saya ingin Anda ambil dari hal ini: ada masa sebelum kita memiliki gagasan tentang informasi dan masa sesudahnya. Bagaimana jika kita juga melewatkan sesuatu yang begitu mendasar? Itulah hipotesis saya.

#### Tiga petunjuk (7:00) {#three-clues-700}

Saat saya berjuang untuk menjelaskan rantai blok, saya terus menemukan hal-hal aneh ini yang menurut saya adalah petunjuk menuju sesuatu yang lebih besar.

**Petunjuk nomor satu** — kita mendeskripsikan rantai blok sebagai tanpa kepercayaan sekaligus dapat dipercaya. Itu aneh. Dalam buku putih Satoshi, kita berbicara tentang menghilangkan kebutuhan akan kepercayaan. Tetapi dalam buku putih Ethereum, kita berbicara tentang menggunakan Ethereum untuk membuat aplikasi lebih dapat dipercaya. The Economist menyebut rantai blok sebagai "mesin kepercayaan." Kita memaksudkan sesuatu yang nyata ketika kita mengatakan rantai blok itu tanpa kepercayaan, dan kita memaksudkan sesuatu yang nyata ketika kita mengatakan mereka dapat dipercaya. Bahasa kita belum mengejar ketertinggalan. Kontradiksi yang tampak ini selalu layak untuk diperhatikan — terkadang mereka mengungkapkan celah dalam abstraksi kita.

**Petunjuk nomor dua** — kita banyak berbicara tentang bagaimana rantai blok berbeda dari institusi terpusat — Bitcoin versus bank sentral, ENS versus DNS. Tetapi kita jarang berbicara tentang apa kesamaan mereka. Mereka bisa menjadi pengganti satu sama lain. Jika Anda pernah menukar uang fiat dengan Bitcoin, Anda telah menggantinya satu sama lain. Mereka pasti memiliki kesamaan agar pertukaran itu terjadi begitu teratur.

Dengan mobil, kita berbicara tentang "kereta tanpa kuda," tetapi setidaknya kita bisa menyebut apa itu — kendaraan. Dengan catatan digital, kita berbicara tentang media "tanpa kertas," tetapi kita tahu kategorinya — informasi. Sepertinya kita telah menemukan sebuah teknologi sebelum kita menemukan kategori tempat ia berada.

**Petunjuk nomor tiga** — makalah Satoshi dimulai dengan kata-kata ini: "perdagangan di internet telah bergantung hampir secara eksklusif pada institusi keuangan yang berfungsi sebagai pihak ketiga tepercaya." Satoshi membandingkan Bitcoin dengan institusi, bukan dengan perangkat lunak lain. Ada sesuatu di sana.

#### Memperkenalkan kekerasan (11:00) {#introducing-hardness-1100}

Inilah jawaban saya untuk apa yang ada di dalam kotak itu. Saya menyebutnya **kekerasan** (hardness). Inilah ceritanya dalam lima langkah sederhana, dan kemudian kita akan membahasnya lebih dalam.

Pertama — peradaban kita bergantung pada infrastruktur sosial seperti uang dan hukum serta banyak hal lainnya, dan mereka harus dapat diandalkan. Mereka harus berperilaku seperti yang kita harapkan, setidaknya sebagian besar waktu, agar mereka berguna bagi kita. Jika tidak, kita tidak akan mengandalkannya — mereka tidak akan menjadi uang.

Kedua — sangat sulit untuk mencapai tingkat keandalan yang diperlukan itu. Sejauh ini sebenarnya hanya ada tiga cara yang pernah kita lakukan: menggunakan atom, menggunakan institusi, dan sekarang menggunakan rantai blok.

Ketiga — ada sifat yang tidak dikenali yang umum pada ketiganya, yang saya sebut kekerasan. Kekerasan adalah kapasitas, kekuatan, untuk memungkinkan kita membuat masa depan lebih dapat diprediksi dengan cara yang sangat spesifik yang kita butuhkan untuk permainan koordinasi yang kompleks.

Keempat — bahwa ketiga sumber kekerasan ini masing-masing memiliki sifat berbeda yang membuatnya berguna dalam konteks yang berbeda.

Dan kelima — kita dapat menggunakannya bersama-sama dan menggantinya satu sama lain.

Tingkat inflasi emas dapat diandalkan karena sifat fisik planet kita — ia keras secara atom (atom-hard). Sebuah kontrak dapat diandalkan karena institusi akan datang dan mengambil barang-barang Anda jika Anda tidak mengikuti komitmen Anda. Sebuah kontrak pintar akan beroperasi karena diamankan oleh protokol kriptoekonomi dengan miliaran dolar yang dipertaruhkan.

Anda dapat menganggap atom, institusi, dan rantai blok seperti bahan bangunan — seperti kayu, beton, dan baja. Mereka berbeda, tetapi mereka adalah bagian dari kategori yang sama. Dan kita menggunakan hal-hal ini bukan untuk membangun gedung, tetapi untuk membangun peradaban. Mungkin dengan bahan yang lebih baik, kita dapat membangun peradaban yang lebih besar, lebih baik, dan lebih kuat daripada yang kita miliki sekarang.

#### Apa itu kekerasan? (14:00) {#what-is-hardness-1400}

Izinkan saya memberikan presisi lebih pada apa yang saya maksud dengan kekerasan. Ini bukan sekadar keandalan apa pun yang mungkin dimiliki oleh sesuatu. Kekerasan adalah jenis yang spesifik. Hal pertama yang perlu diperhatikan adalah bahwa ini adalah jenis keandalan yang penting untuk koordinasi sosial. Bukan sekadar, Anda tahu, meja ini secara andal adalah sebuah meja — tetapi bahwa Anda dapat membayar sewa Anda, bahwa sebuah kontrak akan ditegakkan, bahwa sebuah ekonomi itu kuat. Untuk hal-hal seperti itulah kekerasan ada.

Dan apa sebenarnya hasilnya? Sayangnya saya memperkenalkan kata baru lainnya di sini, yang saya sebut **cetakan** (cast). Cetakan adalah setiap kemungkinan keadaan masa depan dari dunia yang dibuat pasti atau aman menggunakan kekerasan. Saya minta maaf atas jargon ini, tetapi alasan untuk memiliki sebuah kata di sini adalah karena saya rasa kita tidak memiliki kata yang dapat digeneralisasi di semua sumber kekerasan. Ini mungkin seperti bit — kita membutuhkan sebuah konsep yang dapat kita bicarakan dalam banyak konteks berbeda dan beralih antar sumber tanpa terikat pada salah satunya.

Sebuah cetakan yang terkait dengan pinjaman akan menjadi: jika Alice tidak membayar kembali kepada Bob, maka institusi hukum akan menggunakan ancaman dan tindakan yang semakin parah untuk memaksanya. Cetakan ini dikeraskan menggunakan kekerasan institusional. Sebuah cetakan tentang emas mungkin adalah bahwa sejumlah emas tertentu akan memasuki pasar setiap tahun selama 20 tahun ke depan — dibuat andal oleh sifat fisik Bumi kita. Dan sebuah cetakan tentang Ethereum mungkin adalah klaim bahwa aset hanya dapat ditransfer jika Anda memegang kunci privat yang sesuai dengan kunci publik tertentu — dikeraskan oleh kekerasan rantai blok.

Dalam praktiknya, kita biasanya berinteraksi dengan bundel dari hal-hal ini yang semuanya terjalin bersama. Jika Anda memiliki emas dan menyimpannya di bank, banyak hal yang penting bagi Anda: cetakan tentang pasokan emas di masa depan, cetakan tentang kekuatan brankas bank, cetakan tentang kekuatan perjanjian hukum antara Anda dan bank Anda, cetakan tentang keandalan sistem hukum di negara Anda yang akan menegakkan aturan tersebut jika terjadi kesalahan.

Kedua, kekerasan dapat dibicarakan sebagai ukuran keamanan. Secara teori selalu dapat diukur, meskipun sulit dilakukan dalam praktiknya. Seberapa keras cetakan ini bahwa sejumlah emas tertentu akan memasuki pasar setiap tahun selama 20 tahun ke depan? Salah satu cara Anda dapat melihatnya adalah melalui probabilitas — lihat semua data dan coba prediksi kemungkinannya. Atau Anda dapat melihatnya dari perspektif biaya: berapa biaya yang dibutuhkan seseorang untuk menghancurkan cetakan itu? Jika Anda adalah sebuah negara bangsa, Anda dapat menggunakan kekuatan perang dan regulasi internasional. Atau Anda bisa menempuh jalan lain dan mengambil asteroid dari luar angkasa yang mengandung banyak emas, menghindari batasan fisik Bumi. Ada harga untuk menghancurkan hampir semua cetakan.

Dan terakhir, kekerasan berasal dari sumber-sumber tertentu — atom, institusi, dan rantai blok. Masing-masing memiliki sifat berbeda yang membuatnya berguna dalam konteks yang berbeda.

Yang saya sukai dari kerangka kerja ini adalah ia memungkinkan kita mengajukan pertanyaan yang lebih dalam — bukan hanya berbicara tentang sifat spesifik dari rantai blok, tetapi membandingkan semua hal yang berbeda ini dan memikirkan di mana mereka sesuai, bagaimana kita menggunakannya, dan dalam kombinasi apa.

#### Kekerasan atom (19:00) {#atom-hardness-1900}

Kekerasan atom adalah tentang ketika kita menemukan keandalan di alam sekitar kita — atom fisik secara harfiah tetapi juga sifat-sifat lain yang terjadi secara alami. Kita melakukan ini ketika kita menggunakan manik-manik emas untuk uang, ketika kita menggunakan struktur fisik untuk mendefinisikan hak milik, atau mencatat hak milik dalam objek fisik seperti akta.

Ini memiliki banyak keuntungan: penegakan otomatis, state bersama, seperangkat aturan universal. Sangat nyaman bagi peradaban manusia bahwa hukum fisika berlaku sama di mana-mana, setidaknya pada skala makroskopis yang paling penting bagi kita.

Tetapi ini memiliki kelemahan. Kita terbatas pada apa yang dapat kita temukan di dunia. Kekerasan atom itu seperti seorang arsitek yang ingin membangun tebing batu ke dalam rumah mereka — Anda harus menemukan yang sesuai. Anda tidak bisa begitu saja membuat tebing batu. Anda dapat mengubahnya sedikit, tetapi Anda mengandalkan penemuan fitur alami yang sesuai dengan kebutuhan khusus Anda.

Kita tidak bisa memberinya aturan baru. Kita memiliki emas, tetapi kita tidak bisa meminta alam semesta untuk memberi kita jenis emas baru dengan inflasi yang lebih rendah, distribusi geografis yang lebih adil, atau mungkin memperbaiki masalah beratnya. Kita tidak bisa melakukan ini. Dan ini memiliki kemampuan pemrograman yang sangat terbatas — hanya ada jenis hal-hal keras tertentu yang dapat Anda buat dari kekerasan atom, terutama uang. Anda tidak dapat membuat perjanjian pernikahan dari atom. Anda membutuhkan sesuatu yang lebih kompleks, seperti institusi, untuk melakukan itu.

Dan cetakan sering kali dirusak oleh meningkatnya kendali manusia atas alam. Menggunakan cangkang kerang untuk uang tidak masalah sampai Anda menjadi bagian dari ekonomi global yang mungkin secara radikal mengacaukan ekspektasi Anda tentang inflasi cangkang, dan tiba-tiba ekonomi Anda hancur. Menggunakan emas sebagai alat tukar mungkin menghadapi masalah yang sama suatu hari nanti jika dan ketika kita dapat memperoleh emas asteroid dan mengubah asumsi kita tentang pasokan.

Tetapi ini lebih halus dari itu. Terkadang kita memiliki cetakan yang bahkan tidak kita sadari keberadaannya, tetapi kemudian mereka hilang karena sesuatu berubah. Ada cetakan keras tentang kecepatan perdagangan di pasar keuangan untuk waktu yang lama — itu hanya bisa dilakukan pada kecepatan tertentu, mungkin kecepatan seseorang dapat berteriak satu sama lain di lantai bursa. Cetakan ini keras secara atom — kita tidak bisa berkomunikasi lebih cepat dari itu. Tetapi teknologi baru benar-benar merusak asumsi tersebut. Kita menyadari bahwa kita sebenarnya menyukai versi dari cetakan lama itu dan membuatnya kembali dari institusi — memperkenalkan regulasi yang membatasi kecepatan perdagangan dan memberlakukan penghentian sementara (circuit breakers).

#### Kekerasan institusional (22:00) {#institutional-hardness-2200}

Kekerasan institusional adalah kategori yang sangat luas — ini mencakup sebagian besar hal yang mungkin kita pikirkan ketika kita memikirkan peradaban. Sistem hukum kita, badan legislatif, kepolisian, perusahaan, semuanya. Semua institusi yang memberikan semacam kekerasan. Kita menciptakan cetakan yang memberikan ketertiban pada masyarakat kita, menghukum perilaku antisosial. Kita menciptakan kekerasan sebagai platform, membiarkan siapa pun membuat cetakan mereka sendiri yang dibuat keras oleh institusi jika Anda mengikuti aturan tertentu. Kita menciptakan cetakan yang melahirkan aset baru dan menyediakan sumber kredit untuk ekonomi yang sedang berkembang.

Kekerasan institusional memiliki banyak keuntungan. Ini sangat dapat diprogram — manusia yang dikelompokkan ke dalam organisasi dapat menerima instruksi yang sangat kompleks atau halus. Ini adalah ruang desain yang sangat besar dari kemungkinan cetakan. Dan mereka terbuat dari orang-orang, dan orang-orang itu baik. Mungkin ada baiknya terkadang seseorang dapat turun tangan dan berkata, "Saya tidak akan menegakkan itu karena saya pikir itu salah." Ada baiknya mungkin terkadang ada jeda dalam sistem bagi seseorang untuk menjadi pelapor pelanggaran (whistleblower) atau pemberontak.

Tetapi ini juga memiliki banyak kelemahan. Ini dibatasi oleh perbatasan — hanya di negara-negara tertentu Anda benar-benar memiliki akses ke institusi yang menegakkan supremasi hukum. Ini rentan terhadap kegagalan negara atau politik — jika pemerintah Anda tidak dapat menyepakati berbagai hal, atau Anda diserang oleh negara yang bermusuhan, institusi tertentu yang Anda andalkan untuk uang atau kontrak mungkin akan hancur. Mereka sering kali tidak transparan — sulit untuk mengetahui apakah sebuah institusi benar-benar keras atau tidak sampai terjadi kesalahan. Mereka memiliki biaya awal yang tinggi — kita tidak bisa dengan mudah membuat institusi baru pada skala The Fed atau sistem hukum untuk mengiterasinya. Kita agak terjebak dengan apa yang kita miliki.

Dan mereka terbuat dari orang-orang, dan orang-orang itu buruk. Kenyataannya di negara ini dan banyak negara lain adalah bahwa banyak orang belum benar-benar memiliki akses ke kekerasan yang diberikan oleh institusi. Mereka tidak bisa mendapatkan hipotek. Mereka tidak bisa membuka rekening bank. Karena ketika Anda mengisi sebuah institusi dengan orang-orang, itu tunduk pada kejahatan mereka, prasangka mereka, ideologi mereka. Dan ketergantungan kita pada kekerasan institusional terus meningkat. Masalah dengan perangkat lunak yang menguasai dunia adalah bahwa sebagian besar perangkat lunak sebenarnya hanya terbuat dari institusi di balik layar, dan sebagai hasilnya kita memberi mereka semakin banyak kekuatan.

#### Kekerasan rantai blok (24:20) {#blockchain-hardness-2420}

Penemuan Satoshi tentu saja lebih dari sekadar Bitcoin — itu adalah inti dari teknik serbaguna untuk menciptakan kekerasan digital dalam lingkungan digital. Ini memiliki banyak kekuatan: akses global universal, terbuat dari perangkat lunak dan siapa pun dapat menulis perangkat lunak, tingkat kekerasan dapat transparan dan dapat diaudit, biaya awal yang rendah, mudah diiterasi, dan diamankan oleh insentif pasar — dan pasar itu rasional.

Tetapi ini juga memiliki kelemahan. Ini membutuhkan peradaban teknologi — kita tidak mungkin memiliki rantai blok sebelum sekarang karena persyaratannya, dan peradaban di masa depan yang tidak memiliki apa yang kita miliki juga tidak akan dapat menggunakannya. Ini terbuat dari perangkat lunak, dan perangkat lunak dapat ditulis dengan buruk. Ruang lingkup cetakan terbatas pada lingkungan onchain. Dan ini diamankan oleh insentif pasar — dan pasar itu irasional.

#### Mengapa ini penting (25:10) {#why-this-matters-2510}

Jadi apa artinya ini? Apa yang diberikan ini kepada kita? Mengapa ini lebih dari sekadar minat akademis?

Banyak hal mulai jauh lebih masuk akal jika dilihat melalui lensa ini. Salah satunya adalah pertanyaan yang kita mulai: mengapa kita mengatakan bahwa rantai blok itu tanpa kepercayaan sekaligus dapat dipercaya? Penjelasannya adalah ini — ketika kita mengatakan rantai blok itu tanpa kepercayaan, yang sebenarnya kita maksud adalah bahwa kekerasannya tidak bergantung pada seseorang atau institusi. Dan ketika kita mengatakan mereka dapat dipercaya, kita hanya bermaksud bahwa mereka memang memiliki kekerasan — hanya saja dari jenis yang berbeda. Ketidakmampuan kita untuk membuat perbedaan itulah yang menyebabkan bahasa yang membingungkan ini.

Ini menjelaskan mengapa rantai blok privat atau terpusat tidak menarik. Rantai blok yang tidak terdesentralisasi hanya akan runtuh kembali menjadi sebuah institusi. Jika dikendalikan oleh tiga bank atau segelintir validator yang semuanya didanai oleh organisasi yang sama, maka itu hanyalah EVM yang diamankan oleh kekerasan institusional. Hal yang paling menarik tentang rantai blok bukanlah EVM — melainkan bahwa ada sumber kekerasan berbeda yang tidak berkorelasi atau tunduk pada kegagalan dan batasan yang sama seperti institusi. Itulah mengapa ini berbeda. Itulah mengapa ini penting.

Ini juga membantu memahami spektrum kemungkinan dan ideologi bawaan yang dianut orang-orang di ruang rantai blok. Banyak orang sangat fokus menggunakan kekerasan rantai blok untuk bersaing dengan atau menggantikan kekerasan institusional — inilah inti dari banyak komunitas Bitcoin, inti dari banyak keuangan terdesentralisasi (DeFi). Bahkan ENS mencoba menggantikan atau bersaing dengan DNS dalam beberapa hal. Tetapi kemudian ada juga orang-orang yang melihat bahwa kekerasan rantai blok dapat melakukan hal-hal yang tidak dapat dilakukan oleh kekerasan institusional — ide-ide yang belum pernah dicoba oleh siapa pun sebelumnya karena kita tidak pernah memiliki kapasitas ini, rasa kekerasan tertentu ini. Dan sekarang kita dapat mengeksplorasi hal-hal tersebut. Mungkin NFT ada di sana, atau permainan seperti Dark Forest, atau gerakan seputar dunia otonom.

#### Meningkatkan ambisi kita (27:00) {#raising-our-ambitions-2700}

Yang terpenting, saya pikir kerangka kerja ini meningkatkan ambisi kita. Secara pribadi, inilah yang penting bagi saya, dan mungkin ini selaras dengan Anda — saya tidak hanya di sini untuk aplikasi-aplikasi individual ini. Saya bukan seseorang yang hanya benar-benar peduli tentang Bitcoin atau semua tentang DeFi atau semua tentang NFT. Mungkin Anda juga begitu. Ada sesuatu yang lebih besar terjadi di sini.

Kita sejujurnya dapat menetapkan pandangan kita lebih tinggi dari sekadar uang. Kita dapat menetapkan pandangan kita lebih tinggi dari sekadar keuangan. Ada gambaran yang jauh lebih besar. Saya pikir ini sebenarnya membantu mendefinisikan visi yang terasa memadai dalam skala terhadap tantangan yang kita hadapi dan peluang yang ditawarkan oleh rantai blok.

Misinya bukan hanya untuk menggantikan The Fed. Misinya adalah untuk meningkatkan dan memperluas bahan-bahan yang telah kita gunakan untuk membangun peradaban kita — untuk menurunkan biaya alat-alat ini sehingga semua orang di Bumi memiliki akses ke sana, untuk memungkinkan lebih banyak perubahan terjadi. Dan omong-omong, biaya itu akan segera menjadi lebih rendah.

Untuk membantu umat manusia terus memainkan permainan tak terbatas ini dengan membiarkan lebih banyak orang mengubah aturannya. Sangat sedikit orang yang dapat memberlakukan undang-undang, tetapi siapa pun dapat menulis kontrak pintar. Kita sedang memperluas kapasitas itu.

Saya pikir banyak orang di banyak negara berbeda dan banyak ideologi merasa seperti kita terjebak — bahwa aturan mainnya tidak lagi seperti yang seharusnya, tetapi kita tidak berdaya untuk mengubahnya. Kita terjebak dalam banyak hal di titik maksimum lokal ini, dan kita merasa bahwa itu salah. Rantai blok tidak memperbaikinya, tetapi saya pikir mereka dapat membantu. Mereka membuka ruang baru untuk eksperimen. Mereka membiarkan lebih banyak orang mengubah aturan, menulis aturan baru, berkontribusi pada permainan tak terbatas itu. Kita tidak bisa menulis undang-undang, tetapi kita bisa menulis kontrak pintar.

Saya ingin mengakhiri dengan catatan ini: jika Anda pernah melihat pembicaraan oleh orang-orang di EF sebelumnya, Anda tahu kami menyukai buku *Finite and Infinite Games*. Salah satu pepatah dari buku ini adalah bahwa hanya apa yang dapat berubah yang dapat berlanjut. Kita tidak bisa terus terjebak di titik maksimum lokal ini. Kita harus mengubah berbagai hal. Dan saya pikir rantai blok membantu kita melakukan itu. Terima kasih banyak.