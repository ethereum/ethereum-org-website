---
title: Danksharding
description: Pelajari tentang Proto-Danksharding dan Danksharding - dua peningkatan berurutan untuk peningkatan Ethereum.
lang: id
summaryPoints:
  - Danksharding adalah peningkatan multi-fase untuk memperbaiki skalabilitas dan kapasitas Ethereum.
  - Tahap pertama, Proto-Danksharding, menambahkan blob data ke blok
  - Blob data menawarkan cara yang lebih murah bagi rollup untuk memposting data ke Ethereum dan biaya tersebut dapat diteruskan kepada pengguna dalam bentuk biaya transaksi yang lebih rendah.
  - Nantinya, Danksharding penuh akan menyebarkan tanggung jawab untuk memverifikasi blob data di seluruh subset node, lebih lanjut melakukan peningkatan Ethereum hingga lebih dari 100.000 transaksi per detik.
---

# Danksharding {#danksharding}

**Danksharding** adalah cara [Ethereum](/) menjadi blockchain yang benar-benar dapat diskalakan, tetapi ada beberapa peningkatan protokol yang diperlukan untuk mencapainya. **Proto-Danksharding** adalah langkah menengah di sepanjang jalan tersebut. Keduanya bertujuan untuk membuat transaksi di layer 2 semurah mungkin bagi pengguna dan harus melakukan peningkatan Ethereum hingga >100.000 transaksi per detik.

## Apa itu Proto-Danksharding? {#what-is-protodanksharding}

Proto-Danksharding, juga dikenal sebagai [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), adalah cara bagi [rollup](/layer-2/#rollups) untuk menambahkan data yang lebih murah ke blok. Nama ini berasal dari dua peneliti yang mengusulkan ide tersebut: Protolambda dan Dankrad Feist. Secara historis, rollup telah dibatasi dalam seberapa murah mereka dapat membuat transaksi pengguna oleh fakta bahwa mereka memposting transaksi mereka di `CALLDATA`.

Ini mahal karena diproses oleh semua node Ethereum dan hidup onchain selamanya, meskipun rollup hanya membutuhkan data tersebut untuk waktu yang singkat. Proto-Danksharding memperkenalkan blob data yang dapat dikirim dan dilampirkan ke blok. Data dalam blob ini tidak dapat diakses oleh EVM dan secara otomatis dihapus setelah periode waktu yang tetap (ditetapkan ke 4096 epoch pada saat penulisan, atau sekitar 18 hari). Ini berarti rollup dapat mengirim data mereka dengan jauh lebih murah dan meneruskan penghematan tersebut kepada pengguna akhir dalam bentuk transaksi yang lebih murah.

<ExpandableCard title="Mengapa blob membuat rollup menjadi lebih murah?" eventCategory="/roadmap/danksharding" eventName="clicked why do blocks make rollups cheaper?">

Rollup adalah cara untuk melakukan peningkatan Ethereum dengan mengelompokkan transaksi secara offchain dan kemudian memposting hasilnya ke Ethereum. Sebuah rollup pada dasarnya terdiri dari dua bagian: data dan pemeriksaan eksekusi. Data adalah urutan penuh transaksi yang sedang diproses oleh rollup untuk menghasilkan perubahan status yang diposting ke Ethereum. Pemeriksaan eksekusi adalah eksekusi ulang dari transaksi tersebut oleh aktor yang jujur (seorang "pembukti" atau "prover") untuk memastikan bahwa perubahan status yang diusulkan adalah benar. Untuk melakukan pemeriksaan eksekusi, data transaksi harus tersedia cukup lama agar siapa pun dapat mengunduh dan memeriksanya. Ini berarti setiap perilaku tidak jujur oleh sequencer rollup dapat diidentifikasi dan ditantang oleh pembukti. Namun, data tersebut tidak perlu tersedia selamanya.
</ExpandableCard>

<ExpandableCard title="Mengapa tidak apa-apa untuk menghapus data blob?" eventCategory="/roadmap/danksharding" eventName="clicked why is it OK to delete the blob data?">

Rollup memposting komitmen terhadap data transaksi mereka secara onchain dan juga membuat data aktual tersedia dalam blob data. Ini berarti pembukti dapat memeriksa bahwa komitmen tersebut valid atau menantang data yang mereka anggap salah. Pada tingkat node, blob data disimpan di klien konsensus. Klien konsensus memberikan pengesahan bahwa mereka telah melihat data tersebut dan bahwa data itu telah disebarkan ke seluruh jaringan. Jika data disimpan selamanya, klien ini akan membengkak dan menyebabkan persyaratan perangkat keras yang besar untuk menjalankan node. Sebaliknya, data secara otomatis dipangkas dari node setiap 18 hari. Pengesahan klien konsensus menunjukkan bahwa ada kesempatan yang cukup bagi pembukti untuk memverifikasi data. Data aktual dapat disimpan secara offchain oleh operator rollup, pengguna, atau pihak lainnya.
</ExpandableCard>

### Bagaimana data blob diverifikasi? {#how-are-blobs-verified}

Rollup memposting transaksi yang mereka eksekusi dalam blob data. Mereka juga memposting "komitmen" terhadap data tersebut. Mereka melakukan ini dengan menyesuaikan fungsi polinomial ke data. Fungsi ini kemudian dapat dievaluasi di berbagai titik. Misalnya, jika kita mendefinisikan fungsi yang sangat sederhana `f(x) = 2x-1` maka kita dapat mengevaluasi fungsi ini untuk `x = 1`, `x = 2`, `x = 3` yang memberikan hasil `1, 3, 5`. Seorang pembukti menerapkan fungsi yang sama ke data dan mengevaluasinya pada titik yang sama. Jika data asli diubah, fungsinya tidak akan identik, dan oleh karena itu nilai yang dievaluasi pada setiap titik juga tidak akan sama. Pada kenyataannya, komitmen dan bukti lebih rumit karena dibungkus dalam fungsi kriptografi.

### Apa itu KZG? {#what-is-kzg}

KZG adalah singkatan dari Kate-Zaverucha-Goldberg - nama dari tiga [penulis asli](https://link.springer.com/chapter/10.1007/978-3-642-17373-8_11) dari skema yang mengurangi blob data menjadi ["komitmen" kriptografi](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html) kecil. Blob data yang dikirimkan oleh rollup harus diverifikasi untuk memastikan rollup tidak berperilaku buruk. Ini melibatkan pembukti yang mengeksekusi ulang transaksi dalam blob untuk memeriksa bahwa komitmen tersebut valid. Secara konseptual, ini sama dengan cara klien eksekusi memeriksa validitas transaksi Ethereum di layer 1 menggunakan bukti Merkle. KZG adalah bukti alternatif yang menyesuaikan persamaan polinomial ke data. Komitmen mengevaluasi polinomial pada beberapa titik data rahasia. Seorang pembukti akan menyesuaikan polinomial yang sama pada data dan mengevaluasinya pada nilai yang sama, memeriksa bahwa hasilnya sama. Ini adalah cara untuk memverifikasi data yang kompatibel dengan teknik zero-knowledge yang digunakan oleh beberapa rollup dan pada akhirnya bagian lain dari protokol Ethereum.

### Apa itu Upacara KZG? {#what-is-a-kzg-ceremony}

Upacara KZG adalah cara bagi banyak orang dari seluruh komunitas Ethereum untuk secara kolektif menghasilkan string angka acak rahasia yang dapat digunakan untuk memverifikasi beberapa data. Sangat penting bahwa string angka ini tidak diketahui dan tidak dapat dibuat ulang oleh siapa pun. Untuk memastikan hal ini, setiap orang yang berpartisipasi dalam upacara menerima string dari peserta sebelumnya. Mereka kemudian membuat beberapa nilai acak baru (misalnya, dengan membiarkan peramban mereka mengukur pergerakan tetikus mereka) dan mencampurnya dengan nilai sebelumnya. Mereka kemudian mengirimkan nilai tersebut ke peserta berikutnya dan menghancurkannya dari mesin lokal mereka. Selama satu orang dalam upacara melakukan ini dengan jujur, nilai akhirnya tidak akan dapat diketahui oleh penyerang.

Upacara KZG EIP-4844 terbuka untuk umum dan puluhan ribu orang berpartisipasi untuk menambahkan entropi (keacakan) mereka sendiri. Secara total ada lebih dari 140.000 kontribusi, menjadikannya upacara terbesar di dunia dari jenisnya. Agar upacara ini dapat dirusak, 100% dari peserta tersebut harus secara aktif tidak jujur. Dari sudut pandang peserta, jika mereka tahu bahwa mereka jujur, tidak perlu mempercayai orang lain karena mereka tahu bahwa mereka telah mengamankan upacara tersebut (mereka secara individu memenuhi persyaratan 1-dari-N peserta yang jujur).

<ExpandableCard title="Untuk apa angka acak dari upacara KZG digunakan?" eventCategory="/roadmap/danksharding" eventName="clicked why is the random number from the KZG ceremony used for?">

Ketika sebuah rollup memposting data dalam blob, mereka memberikan "komitmen" yang mereka posting secara onchain. Komitmen ini adalah hasil dari mengevaluasi kecocokan polinomial ke data pada titik-titik tertentu. Titik-titik ini ditentukan oleh angka acak yang dihasilkan dalam upacara KZG. Pembukti kemudian dapat mengevaluasi polinomial pada titik yang sama untuk memverifikasi data - jika mereka mendapatkan nilai yang sama maka data tersebut benar.
</ExpandableCard>

<ExpandableCard title="Mengapa data acak KZG harus tetap rahasia?" eventCategory="/roadmap/danksharding" eventName="clicked why does the KZG random data have to stay secret?">

Jika seseorang mengetahui lokasi acak yang digunakan untuk komitmen, mudah bagi mereka untuk menghasilkan polinomial baru yang cocok pada titik-titik spesifik tersebut (yaitu, sebuah "tabrakan"). Ini berarti mereka dapat menambah atau menghapus data dari blob dan tetap memberikan bukti yang valid. Untuk mencegah hal ini, alih-alih memberikan lokasi rahasia yang sebenarnya kepada pembukti, mereka sebenarnya menerima lokasi yang dibungkus dalam "kotak hitam" kriptografi menggunakan kurva eliptik. Ini secara efektif mengacak nilai sedemikian rupa sehingga nilai aslinya tidak dapat direkayasa balik, tetapi dengan beberapa aljabar yang cerdas, pembukti dan pemverifikasi masih dapat mengevaluasi polinomial pada titik yang diwakilinya.
</ExpandableCard>

<Alert variant="warning" className="mb-8">
  Baik Danksharding maupun Proto-Danksharding tidak mengikuti model "sharding" tradisional yang bertujuan untuk membagi blockchain menjadi beberapa bagian. Rantai shard tidak lagi menjadi bagian dari peta jalan. Sebaliknya, Danksharding menggunakan pengambilan sampel data terdistribusi di seluruh blob untuk melakukan peningkatan Ethereum. Ini jauh lebih sederhana untuk diimplementasikan. Model ini terkadang disebut sebagai "data-sharding".
</Alert>

## Apa itu Danksharding? {#what-is-danksharding}

Danksharding adalah realisasi penuh dari peningkatan rollup yang dimulai dengan Proto-Danksharding. Danksharding akan membawa ruang dalam jumlah besar di Ethereum bagi rollup untuk membuang data transaksi terkompresi mereka. Ini berarti Ethereum akan dapat mendukung ratusan rollup individu dengan mudah dan mewujudkan jutaan transaksi per detik.

Cara kerjanya adalah dengan memperluas blob yang dilampirkan ke blok dari enam (6) di Proto-Danksharding, menjadi 64 di Danksharding penuh. Sisa perubahan yang diperlukan semuanya adalah pembaruan pada cara klien konsensus beroperasi untuk memungkinkan mereka menangani blob besar yang baru. Beberapa dari perubahan ini sudah ada di peta jalan untuk tujuan lain yang tidak bergantung pada Danksharding. Misalnya, Danksharding mengharuskan pemisahan pengusul-pembangun (proposer-builder separation) telah diimplementasikan. Ini adalah peningkatan yang memisahkan tugas membangun blok dan mengusulkan blok di berbagai validator yang berbeda. Demikian pula, pengambilan sampel ketersediaan data diperlukan untuk Danksharding, tetapi juga diperlukan untuk pengembangan klien yang sangat ringan yang tidak menyimpan banyak data historis ("klien tanpa status").

<ExpandableCard title="Mengapa Danksharding memerlukan pemisahan pengusul-pembangun?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require proposer-builder separation?">

Pemisahan pengusul-pembangun diperlukan untuk mencegah validator individu harus menghasilkan komitmen dan bukti yang mahal untuk 32MB data blob. Ini akan memberikan terlalu banyak tekanan pada staker rumahan dan mengharuskan mereka untuk berinvestasi dalam perangkat keras yang lebih kuat, yang merugikan desentralisasi. Sebaliknya, pembangun blok khusus mengambil tanggung jawab untuk pekerjaan komputasi yang mahal ini. Kemudian, mereka membuat blok mereka tersedia bagi pengusul blok untuk disiarkan. Pengusul blok cukup memilih blok yang paling menguntungkan. Siapa pun dapat memverifikasi blob dengan murah dan cepat, yang berarti setiap validator normal dapat memeriksa bahwa pembangun blok berperilaku jujur. Ini memungkinkan blob besar diproses tanpa mengorbankan desentralisasi. Pembangun blok yang berperilaku buruk dapat dengan mudah dikeluarkan dari jaringan dan mengalami pemotongan - yang lain akan menggantikan tempat mereka karena membangun blok adalah aktivitas yang menguntungkan.
</ExpandableCard>

<ExpandableCard title="Mengapa Danksharding memerlukan pengambilan sampel ketersediaan data?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require data availability sampling?">

Pengambilan sampel ketersediaan data diperlukan bagi validator untuk memverifikasi data blob dengan cepat dan efisien. Menggunakan pengambilan sampel ketersediaan data, validator dapat sangat yakin bahwa data blob tersedia dan dikomit dengan benar. Setiap validator dapat mengambil sampel secara acak hanya beberapa titik data dan membuat bukti, yang berarti tidak ada validator yang harus memeriksa seluruh blob. Jika ada data yang hilang, itu akan diidentifikasi dengan cepat dan blob ditolak.
</ExpandableCard>

### Kemajuan saat ini {#current-progress}

Danksharding penuh masih beberapa tahun lagi. Sementara itu, upacara KZG telah berakhir dengan lebih dari 140.000 kontribusi, dan [EIP](https://eips.ethereum.org/EIPS/eip-4844) untuk Proto-Danksharding telah matang. Proposal ini telah diimplementasikan sepenuhnya di semua testnet, dan ditayangkan di mainnet dengan peningkatan jaringan Cancun-Deneb ("Dencun") pada bulan Maret 2024.

### Bacaan lebih lanjut {#further-reading}

- [Catatan Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Catatan Dankrad tentang Danksharding](https://notes.ethereum.org/@dankrad/new_sharding)
- [Dankrad, Proto, dan Vitalik membahas Danksharding](https://www.youtube.com/watch?v=N5p0TB77flM)
- [Upacara KZG](https://ceremony.ethereum.org/)
- [Pembicaraan Devcon Carl Beekhuizen tentang pengaturan tepercaya](https://archive.devcon.org/archive/watch/6/the-kzg-ceremony-or-how-i-learnt-to-stop-worrying-and-love-trusted-setups/?tab=YouTube)
- [Lebih lanjut tentang pengambilan sampel ketersediaan data untuk blob](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Dankrad Feist tentang komitmen dan bukti KZG](https://youtu.be/8L2C6RDMV9Q)
- [Komitmen polinomial KZG](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)