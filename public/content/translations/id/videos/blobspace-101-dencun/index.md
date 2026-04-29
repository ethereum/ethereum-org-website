---
title: "Peningkatan Ethereum berikutnya: blobspace 101"
description: "Domothy menjelaskan blobspace, lapisan ketersediaan data baru yang diperkenalkan oleh peningkatan Dencun Ethereum, mencakup cara kerja transaksi blob, mengapa hal tersebut penting untuk penskalaan Ethereum, dan apa yang akan terjadi selanjutnya untuk ketersediaan data."
lang: id
youtubeId: "dFjyUY3e53Q"
uploadDate: 2024-02-27
duration: "1:02:31"
educationLevel: intermediate
topic:
  - "penskalaan"
  - "blob"
  - "dencun"
  - "peningkatan"
format: interview
author: Bankless
breadcrumb: "Blobspace 101"
---

Wawancara ini membahas sumber daya ruang blob Ethereum, yang diperkenalkan dengan [EIP-4844 (Proto-Danksharding)](https://www.eip4844.com/). Peneliti Ethereum, Domothy, bergabung dengan David Hoffman dan Ryan Sean Adams di podcast Bankless untuk menjelaskan sejarah peta jalan yang berpusat pada rollup, mekanisme teknis blob, dan implikasi ekonomi dari pemisahan ruang blok dari ruang blob.

*Transkrip ini adalah salinan yang dapat diakses dari [transkrip video asli](https://www.youtube.com/watch?v=dFjyUY3e53Q) yang dipublikasikan oleh Bankless. Transkrip ini telah diedit sedikit agar lebih mudah dibaca.*

#### Pengantar ruang blob (0:00) {#introduction-to-blob-space-000}

**Ryan Sean Adams:** Selamat datang di Bankless, tempat kami menjelajahi batas terdepan (frontier) dari uang internet dan keuangan internet. Ini adalah cara untuk memulai, cara untuk menjadi lebih baik, cara untuk mendahului peluang. Saya di sini bersama David Hoffman, dan kami di sini untuk membantu Anda menjadi lebih *bankless* (tanpa bank). Anda tahu bagaimana kita mengatakan bahwa rantai blok menjual blok? Nah, sebentar lagi Ethereum akan menjual lebih dari sekadar blok — Ethereum juga akan menjual blob.

**David Hoffman:** Benar sekali, blob. Jadi kita hanya beberapa bulan lagi dari rilis Ethereum terbesar sejak The Merge, dan saya rasa belum ada yang sepenuhnya memetakan implikasi dari hal ini, tetapi ini akan menjadi sangat besar. Ethereum mendapatkan produk baru untuk dijual. Ini disebut ruang blob, dan itu merupakan tambahan untuk ruang blok. Biaya transaksi di lapisan 2 (l2) akan segera turun mendekati nol. Ekonomi gas ETH dan mekanisme bakar akan berubah selamanya. Kami menyebut peningkatan ini sebagai peningkatan ruang blob, EIP-4844, Proto-Danksharding. Kami ingin membahas semua yang perlu Anda ketahui tentang ruang blob.

**Ryan Sean Adams:** Ada beberapa poin penting di sini. Nomor satu, kita membahas apa itu ruang blob. Nomor dua, kita membahas sejarah bagaimana kita bisa sampai di sini — peta jalan yang berpusat pada rollup ini. Nomor tiga, kita membahas ekonominya. Apa artinya ini bagi ekonomi Ethereum, bagi pertambahan nilai ETH, bagi ETH sebagai aset? David, mengapa episode ini penting bagi Anda?

**David Hoffman:** Saya rasa jika ada sektor percakapan yang benar-benar kita sukai, itu adalah persimpangan antara kriptografi dan ekonomi — seperti angka dan manifestasi ekonomi. Saya suka memainkan protokol-protokol ini.

**Ryan Sean Adams:** Ya, itu adalah bahasa cinta kita.

**David Hoffman:** Kita telah berbicara tentang EIP-4844, kita telah berbicara tentang Proto-Danksharding. Keduanya adalah hal yang sama. Kita telah mendefinisikannya beberapa kali dalam berbagai kapasitas yang berbeda. Namun, kita belum pernah melakukan eksplorasi mendalam ke dalam lubang kelinci dan keluar di sisi lain dengan menjawab sisi ekonominya. Jadi kita secara teknis telah menskalakan ketersediaan data pada tingkat teknis — itu adalah peningkatan protokol. Namun, bagaimana hal itu terhubung dengan sisi pasar Ethereum? Satu pasar kini dipecah menjadi dua: ruang blok dan ruang blob kini menjadi dua pasar independen berbeda yang terkandung di dalam sebuah blok Ethereum.

Apa artinya itu bagi Ether? Apa artinya itu bagi pasar yang muncul di sekitar hal-hal ini? Bagaimana keseimbangan penawaran dan permintaan dari masing-masing saling tarik-menarik? Apa dampaknya terhadap skalabilitas lapisan 2? Apa dampaknya terhadap kasus penggunaan ekonomi di atas lapisan 2? Kita akan mulai dengan dasar-dasarnya, tetapi kemudian kita akan menembus ujung lain dari lubang kelinci ke sisi ekonomi dari percakapan ini.

Mari kita sambut tamu kita, Dom, yang juga dikenal sebagai Domothy. Dia adalah seorang peneliti di Yayasan Ethereum yang mengerjakan penelitian dan pengembangan peningkatan utama Ethereum yang akan datang, termasuk EIP-4844 (topik hari ini), danksharding penuh, dan pembakaran MEV.

#### Sejarah peta jalan yang berpusat pada rollup (10:00) {#the-history-of-the-rollup-centric-roadmap-1000}

**Ryan Sean Adams:** Jadi Dom, untuk sepenuhnya memahami bagaimana kita bisa sampai ke ruang blob, saya rasa ada gunanya bernostalgia untuk memahami keseluruhan peta jalan Ethereum, karena ini mencapai kesimpulan yang sangat logis tentang blob dan ruang blob. Bisakah Anda membawa kita kembali ke masa lalu? Karena pada satu titik waktu, peta jalan Ethereum yang berpusat pada rollup belum ada. Kita memiliki sesuatu yang disebut sharding eksekusi, yang sebenarnya tidak pernah kita dapatkan. Di bagian mana dalam sejarah peta jalan Ethereum yang tepat untuk benar-benar memahami konteks penuh dari ruang blob?

**Domothy:** Tentu. Bahkan sebelum Ethereum diluncurkan, sudah ada pemikiran tentang cara menskalakannya karena semua orang tahu bahkan pada saat itu bahwa satu rantai blok dengan setiap node menjalankan semuanya tidak akan cukup. Jadi pada awalnya ada banyak ide berbeda untuk sharding. Upaya pertama untuk benar-benar merincinya adalah sharding dengan eksekusi di mana Anda pada dasarnya memiliki, katakanlah, 64 rantai independen yang berbeda dan mereka mencoba untuk saling berkomunikasi. Ternyata itu sulit dilakukan — ada banyak kerumitan yang terlibat.

Itu dibagi menjadi beberapa fase yang berbeda. Pertama, kita akan meluncurkan Rantai suar, lalu mencari cara untuk benar-benar menggabungkannya dengan lapisan eksekusi saat ini. Kemudian kita akan melakukan Fase Satu, yang hanya berupa sharding data — jadi tidak ada eksekusi, hanya rantai blok yang lebih kecil yang berisi data. Dan kemudian mencari cara untuk melakukan sharding eksekusi. Ada banyak hal yang harus dicari tahu seiring berjalannya waktu, tetapi dengan aman sehingga kita tidak melakukan sesuatu yang kita sesali nanti dan merusak seluruh rantai blok, karena ada begitu banyak aktivitas ekonomi di dalamnya.

**David Hoffman:** Untuk memberikan detail tentang sharding eksekusi — ini adalah pengacakan validator secara acak di berbagai shard yang berbeda dari rantai blok, dengan setiap shard pada dasarnya menjadi rantai blok mininya sendiri yang berjalan secara paralel dengan Rantai suar. Kedengarannya sedikit seperti apa yang kita miliki saat ini dengan rollup, tetapi perbedaannya di sini adalah bahwa shard Ethereum sebenarnya adalah bagian dari protokol lapisan 1 (l1). Protokol lapisan 1 menentukan apa saja shard tersebut, sedangkan rollup terpisah. Awalnya, akan ada 64 shard ini yang dioperasikan, dikelola, dan diproduksi oleh protokol lapisan 1 Ethereum. Apakah saya mengartikulasikannya dengan benar?

**Domothy:** Tepat sekali. Mendapatkan penskalaan eksekusi dengan cara ini lebih tidak langsung dengan rollup dan sharding data, tetapi ini seperti kode curang dari perspektif penelitian karena lapisan 1 Ethereum memiliki jauh lebih sedikit hal untuk dilakukan dan dikhawatirkan. Sisanya dialihkan ke rollup, yang menurut pandangan saya lebih baik daripada rencana awal. Dalam rencana awal shard yang disponsori oleh state, semuanya sama — rantai blok yang sama, EVM yang sama, pertukaran yang sama. Sekarang sebagai gantinya, Anda dapat memiliki rollup yang saling bersaing untuk mendapatkan lingkungan dan pertukaran terbaik. Jika Anda lebih menyukai kecepatan super daripada keamanan super, Anda dapat menggunakan rollup yang berbeda. Anda memiliki pilihan, inovasi, dan persaingan di lapisan 2.

**Ryan Sean Adams:** Mari kita singgung dunia modular tempat Ethereum berada. Ada lapisan konsensus, lapisan ketersediaan data, dan lapisan eksekusi. Lapisan konsensus mendefinisikan apa yang benar — urutan blok. Lapisan ketersediaan data adalah apa yang terjadi — lapisan data. Lapisan terluar adalah eksekusi, tempat aktivitas terjadi saat ini. Awalnya, Ethereum menggabungkan ketiganya di rantai utama.

Sekarang apa yang kita lakukan dengan peta jalan yang berpusat pada rollup adalah kita melakukan sharding eksekusi dari rantai utama ke dalam rollup ini. Namun, agar rollup dapat diamankan sepenuhnya dengan jaminan yang serupa dengan Mainnet Ethereum, mereka harus memposting data mereka kembali ke Mainnet Ethereum. Ketika mereka melakukan itu, saat ini hal tersebut memakan ruang blok, dan memakan banyak biaya. Alasan untuk Proto-Danksharding (EIP-4844) adalah ekonomi berubah dengan cara yang sangat menguntungkan rollup. Dom, ada yang ingin ditambahkan?

**Domothy:** Saya hanya ingin menambahkan bahwa saat ini ketersediaan data lebih implisit dan bermuara pada verifikasi tanpa kepercayaan. Kami ingin semua orang dapat memverifikasi rantai itu sendiri dan tidak perlu memiliki pihak ketiga "percayalah padaku bro" di tengah-tengah. Itulah hambatannya. Anda harus dapat memverifikasi semuanya, yang secara implisit berarti Anda harus memiliki data yang tersedia bagi Anda untuk memeriksa transisi state.

Kembali pada akhir tahun 2020, orang-orang menyadari bahwa rollup mulai menjadi sangat bagus dan populer, dan mereka memecahkan masalah penskalaan eksekusi kita tanpa perlu sharding eksekusi. Dengan menggunakan ekosistem rollup daripada mencoba menjadi maksimalis lapisan 1, rollup dapat membuat pertukaran mereka sendiri, memutar rantai blok mereka sendiri, dan bereksperimen dengan hal-hal baru. Ethereum menangani verifikasinya — itulah inti dari apa itu rantai blok.

#### Apa itu ruang blob? (30:00) {#what-is-blob-space-3000}

**Ryan Sean Adams:** Sekarang bawa kita ke state saat ini, Dom. Kita memiliki banyak rollup yang menggunakan ruang blok lapisan 1 Ethereum, membayar biaya gas yang tinggi untuk memposting data state mereka sehingga siapa pun dapat memverifikasinya. Jadi, Dom, apa itu blob?

**Domothy:** Blob hanyalah sepotong data — pada dasarnya secara spesifik adalah susunan angka mentah yang besar. Sebuah blob di Ethereum saat ini memiliki ukuran tetap sekitar 128 kilobyte. Ini hanyalah data mentah yang dilampirkan pada sebuah transaksi, yang dikenal sebagai transaksi pembawa blob, yang Anda kirimkan ke lapisan 1.

Batasan desain yang krusial di sini adalah bahwa EVM (Ethereum Virtual Machine) lapisan 1 Ethereum — mesin eksekusi — tidak memiliki akses ke data di dalam blob. Dalam blok standar, data seperti data panggilan melibatkan sistem yang melihat fungsi apa yang dipanggil, uang apa yang dipindahkan, dan memverifikasi perubahan state. EVM mengakses semua itu. Namun, jika penskalaan lapisan 2 melibatkan memposting data rollup secara tepat sehingga pemverifikasi *offchain* dapat melakukan komputasi, maka *lapisan 1* Ethereum secara fungsional tidak perlu benar-benar melihatnya dan mengeksekusinya.

Ini pada dasarnya adalah paket tertutup. Lapisan 1 mengambilnya, menjamin bahwa setiap orang memiliki akses untuk melihat ke dalam jika mereka ingin mengunduhnya secara fisik, tetapi lapisan eksekusi pemrosesan utama Ethereum itu sendiri tidak secara aktif membaca dan menghitung data tersebut. Karena tidak membaca dan menghitung data di EVM, ini membutuhkan sumber daya pemrosesan yang jauh lebih sedikit dari node. Itulah mengapa ini jauh lebih murah.

**David Hoffman:** Jadi untuk meringkas: Ruang blok peduli dengan komputasi, eksekusi state, dan penyimpanan logika. Ruang blob peduli secara eksklusif tentang ketersediaan data. Lapisan 1 tidak peduli siapa yang memposting apa di dalam blob ini; yang dipedulikannya hanyalah menerima blob ini dan menyimpannya untuk jendela ketersediaan yang ditentukan sehingga pihak yang berkepentingan (seperti pengurut rollup dan pengguna) dapat menariknya, memverifikasi bahwa data tersebut tidak ditahan secara jahat, dan melanjutkan.

**Domothy:** Tepat sekali. Dan properti penting lainnya dari blob adalah bahwa mereka secara otomatis dipangkas setelah jangka waktu tertentu — saat ini sekitar 18 hari. Alasan mereka dipangkas adalah untuk menjamin verifikasi tanpa kepercayaan, individu hanya membutuhkan data tersebut tersedia untuk membuktikan finalitas dan konsensus atas state rollup dalam jendela tantangan tertentu. Anda tidak memerlukan seribu node yang menyimpan blob dari dua tahun lalu untuk memverifikasi transaksi Anda hari ini. Ketika jendela tersebut berakhir, Anda tidak akan mendapatkannya dari node Ethereum lagi; Anda mendapatkannya dari penyedia riwayat, pengindeks, atau penjelajah blok asli rollup. Penyimpanan di Ethereum sangat mahal selamanya. Menghilangkan persyaratan penyimpanan memungkinkan kita untuk menskalakan laju pemrosesan blob tanpa menghancurkan hard drive operator node.

#### Ekonomi dan danksharding penuh (55:00) {#economics-and-full-danksharding-5500}

**Ryan Sean Adams:** Kita tahu bahwa 4844 adalah langkah pertama — apa yang kita sebut Proto-Danksharding. Ini menetapkan format blob dan pasar biaya yang terisolasi, tetapi target jumlah blob per blok yang sebenarnya dibatasi pada awalnya agar cukup aman. Seperti apa bentuknya saat menskalakan menuju danksharding penuh?

**Domothy:** Saat ini, di bawah EIP-4844, pada dasarnya kami menargetkan 3 blob per blok, dengan batas maksimum 6. Hal itu membatasi laju pemrosesan data maksimum absolut pada lapisan 1 segera setelah peningkatan untuk mencegah tekanan jaringan apa pun sementara kami melihat bagaimana fitur tersebut berfungsi dalam produksi berkelanjutan.

Danksharding penuh menskalakan ini secara dramatis. Ini bergerak menuju pencuplikan ketersediaan data (DAS). Dengan DAS, node penuh tidak perlu lagi mengunduh setiap blob secara individual untuk memverifikasi bahwa data telah tersedia. Mereka dapat mengambil sampel statistik dari potongan kecil data blob. Jika sampel statistik terbukti tersedia, probabilitas matematis bahwa penyerang menyembunyikan data secara efektif mendekati nol (seperti peluang satu banding satu miliar). Setelah Anda tidak memerlukan unduhan penuh dari seluruh blob, Anda dapat menskalakan kapasitas blob menjadi dua digit atau lebih tinggi per blok.

**David Hoffman:** Ini menciptakan pasar biaya yang terpecah di dalam sebuah blok Ethereum. Saat ini, rollup lapisan 2 harus bersaing dengan pedagang Uniswap dan OpenSea untuk sumber daya ruang blok yang sama di dalam sebuah blok Ethereum. Namun, ini pada dasarnya adalah pola penggunaan yang berbeda. Jika ada cetak NFT yang gila-gilaan di L1 Ethereum, gas melonjak, dan rollup lapisan 2 yang mencoba memposting state data mereka tiba-tiba menghadapi biaya bisnis yang meroket hanya untuk melakukan tugas keamanan yang diperlukan.

Dengan pasar biaya dua dimensi — pada dasarnya jalan terisolasi yang terpisah untuk dilalui blob — cetak NFT di L1 Ethereum itu melonjakkan gas eksekusi dengan cara yang sama, tetapi tidak menggunakan ruang blob. Blob tetap sepenuhnya tidak padat dan secara efektif hanya memakan biaya beberapa sen. Cetak NFT bernilai jutaan dolar di rantai utama tidak berdampak sama sekali pada biaya ekonomi untuk memfinalisasi transaksi di Arbitrum atau Optimism.

**Domothy:** Ya, keduanya sepenuhnya terputus. Dan sebaliknya juga benar. Jika laju pemrosesan lapisan 2 melonjak sangat besar dan ribuan rollup beroperasi serta memadatkan ruang blob, lonjakan biaya dasar blob yang dihasilkan tidak akan memengaruhi biaya untuk melakukan transaksi sederhana di Mainnet Ethereum. Biaya dasar blob beroperasi persis seperti biaya dasar EIP-1559, tetapi pada dimensinya sendiri. Dan untuk pertanyaan Anda sebelumnya tentang pembakaran — ya, biaya blob menghasilkan ETH yang dibakar untuk membayar penyertaan data ruang blob, benar-benar terpisah dari pembakaran biaya dasar ruang blok.

#### Masa depan skalabilitas Ethereum (75:00) {#the-future-of-ethereum-scalability-7500}

**Ryan Sean Adams:** Saya ingin membahas apa yang terjadi secara spesifik pada rilis 4844. Awalnya, jelas ada ekspektasi yang sangat tinggi bahwa ketika kapasitas blob tiba-tiba terbuka, tidak akan ada cukup permintaan rollup pada mikrodetik yang tepat itu untuk mengisinya sepenuhnya. Ruang blob akan menjadi sangat murah pada saat peluncuran. Namun, bukankah ada hukum permintaan yang diinduksi? Jika Anda memiliki sumber daya yang sangat murah, aplikasi yang mengonsumsi sumber daya tersebut akan meledak dalam volume.

**Domothy:** Transisi awal pada dasarnya akan menurunkan biaya lapisan 2 mendekati nol, karena semua rollup yang ada saat ini yang bersaing untuk ruang blok yang mahal akan bertransisi dengan mulus ke kumpulan ruang blob masif yang hampir kosong. Itu adalah ekspansi margin yang masif dan instan untuk jaringan lapisan 2, yang akan diteruskan langsung ke pengguna saat mereka mengintegrasikan logika pembuktian baru mereka dengan 4844.

Namun Anda benar — ruang blok yang murah mendorong desain aplikasi berkecepatan tinggi. Ketika Anda tiba-tiba dapat membangun game onchain yang menghasilkan jutaan transisi state mikro dengan biaya sepersekian sen karena *overhead* persistensi data telah hilang, klasifikasi aplikasi yang sama sekali baru menjadi layak secara ekonomi yang sebelumnya tidak mungkin dilakukan di bawah batasan standar.

Ini mengatur dinamika ekonomi yang menarik dalam bagaimana ETH mengakumulasi nilai. Jika transaksi lapisan 2 meledak 10x atau 100x karena aplikasi baru yang dimungkinkan berjalan pada ketersediaan data yang hampir gratis, volume agregat pada akhirnya akan mulai bersaing untuk ruang blob. Kemudian biaya dasar blob EIP-1559 secara alami naik hingga pasar mencapai keseimbangan, menciptakan putaran berkelanjutan yang berlipat ganda dari pembakaran ETH sambil memperluas utilitas lapisan 2.

**David Hoffman:** Ini mewakili keberhasilan dan pematangan peta jalan yang berpusat pada rollup. Ethereum sebagai lingkungan eksekusi monolitik menabrak dinding di mana penskalaan laju pemrosesan secara linier menghancurkan mandat desentralisasinya. Rollup menyediakan cara untuk melewati hambatan eksekusi tetapi masih terikat pada hambatan data lapisan 1. Ruang blob membuka hambatan data dengan cara yang sama seperti rollup membuka hambatan eksekusi. Ketika peningkatan ini diluncurkan, Ethereum bertransisi sepenuhnya dari memproses transaksi tunggal menjadi memproses jaringan eksekusi yang diverifikasi.

**Ryan Sean Adams:** Untuk meringkas garis waktunya, EIP-4844 secara optimis akan hadir pada akhir tahun ini atau awal tahun depan, dan danksharding penuh akan menyusul pada siklus pengembangan berikutnya. Ini benar-benar merupakan perancah infrastruktur yang diperlukan bagi Ethereum untuk mengikutsertakan seluruh planet, dan kita sudah sangat dekat dengan pengoperasiannya di dunia nyata. Dom, terima kasih telah memandu kami melalui pembukaan besar-besaran untuk jaringan ini.

**Domothy:** Terima kasih telah mengundang saya.