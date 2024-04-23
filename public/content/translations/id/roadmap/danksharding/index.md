---
title: Danksharding
description: Pelajari tentang Proto-Danksharding dan Danksharding - dua peningkatan berurutan untuk penskalaan Ethereum.
lang: id
summaryPoints:
  - Danksharding adalah peningkatan multi-fase untuk meningkatkan skalabilitas dan kapasitas Ethereum.
  - Tahap pertama, Proto-Danksharding, menambahkan blob data ke dalam blok
  - Blob data menawarkan cara rollup yang lebih murah untuk memposting data ke Ethereum dan biaya tersebut dapat diteruskan kepada pengguna dalam bentuk biaya transaksi yang lebih rendah.
  - Nantinya, Danksharding penuh akan menyebarkan tanggung jawab untuk memverifikasi blob data di seluruh subset simpul, yang selanjutnya akan melakukan penskalaan Ethereum menjadi lebih dari 100.000 transaksi per detik.
---

# Danksharding {#danksharding}

**Danksharding** adalah bagaimana Ethereum menjadi rantai blok yang benar-benar dapat diskalakan, tetapi ada beberapa peningkatan protokol yang diperlukan untuk mencapainya. **Proto-Danksharding** adalah langkah menengah di sepanjang prosesnya. Keduanya bertujuan untuk membuat transaksi di Lapisan ke-2 semurah mungkin bagi pengguna dan harus meningkatkan skala Ethereum hingga >100.000 transaksi per detik.

## Apa yang dimaksud dengan Proto-Danksharding? {#what-is-protodanksharding}

Proto-Danksharding, juga dikenal sebagai [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), adalah sebuah cara [rollup](/layer-2/#rollups) untuk menambahkan data yang lebih murah ke dalam blok. Nama ini berasal dari dua peneliti yang mengusulkan ide tersebut: Protolambda dan Dankrad Feist. Saat ini, rollup terbatas pada seberapa murahnya mereka dapat melakukan transaksi pengguna karena mereka memposting transaksi mereka dalam `CALLDATA`. Ini mahal karena diproses oleh semua simpul Ethereum dan berada di rantai selamanya, meskipun rollup hanya membutuhkan data untuk waktu yang singkat. Proto-Danksharding memperkenalkan blob data yang dapat dikirim dan dilampirkan ke blok. Data dalam blob ini tidak dapat diakses oleh EVM dan secara otomatis dihapus setelah periode waktu tertentu (1-3 bulan). Ini berarti rollup dapat mengirimkan data mereka dengan lebih murah dan meneruskan penghematan tersebut kepada pengguna akhir dalam bentuk transaksi yang lebih murah.

<ExpandableCard title="Mengapa blob membuat rollup menjadi lebih murah?" eventCategory="/roadmap/danksharding" eventName="clicked why do blocks make rollups cheaper?">

Rollup adalah cara untuk menskalakan Ethereum dengan mengelompokkan transaksi di luar rantai dan kemudian memposting hasilnya ke Ethereum. Rollup pada dasarnya terdiri dari dua bagian: data dan pemeriksaan eksekusi. Data tersebut merupakan urutan lengkap dari transaksi yang sedang diproses oleh rollup untuk menghasilkan perubahan status yang diposting ke Ethereum. Pemeriksaan eksekusi adalah eksekusi ulang transaksi-transaksi tersebut oleh beberapa aktor yang jujur ("prover") untuk memastikan bahwa perubahan status yang diusulkan adalah benar. Agar pemeriksaan eksekusi dapat dilakukan, data transaksi harus tersedia cukup lama agar dapat diunduh dan diperiksa oleh siapa pun. Ini berarti setiap perilaku tidak jujur dari rollup sequencer dapat diidentifikasi dan ditantang oleh prover. Namun demikian, ini tidak harus tersedia selamanya.

</ExpandableCard>

<ExpandableCard title="Mengapa menghapus data blob diperbolehkan?" eventCategory="/roadmap/danksharding" eventName="clicked why is it OK to delete the blob data?">

Rollup memposting komitmen ke data transaksinya di dalam rantai dan juga membuat data aktual tersedia dalam blob data. Ini berarti pembuktian dapat memeriksa apakah komitmen tersebut valid atau menantang data yang mereka anggap salah. Pada tingkat simpul, blob data disimpan di klien konsensus. Klien konsensus membuktikan bahwa mereka telah melihat data tersebut dan telah disebarkan di seluruh jaringan. Jika data disimpan selamanya, klien-klien ini akan membengkak dan menyebabkan kebutuhan perangkat keras yang besar untuk menjalankan simpul. Sebagai gantinya, data secara otomatis dipangkas dari simpul setiap 1-3 bulan. Pengesahan klien konsensus menunjukkan bahwa ada kesempatan yang cukup bagi para prover untuk memverifikasi data. Data aktual dapat disimpan di luar rantai oleh operator rollup, pengguna, atau lainnya.

</ExpandableCard>

### Bagaimana data blob diverifikasi? {#how-are-blobs-verified}

Rollup memposting transaksi yang mereka lakukan dalam blob data. Mereka juga memposting "komitmen" terhadap data. Mereka melakukan ini dengan menyesuaikan fungsi polinomial pada data. Fungsi ini kemudian dapat dievaluasi pada berbagai titik. Sebagai contoh, jika kita mendefinisikan fungsi yang sangat sederhana `f(x) = 2x-1` maka kita dapat mengevaluasi fungsi ini untk `x = 1`, `x = 2`, `x = 3` yang memberi hasil `1, 3, 5`. Peribahasa menerapkan fungsi yang sama pada data dan mengevaluasinya pada titik-titik yang sama. Jika data asli diubah, fungsi tidak akan sama, dan oleh karena itu, nilai yang dievaluasi pada setiap titik juga tidak sama. Pada kenyataannya, komitmen dan pembuktian menjadi lebih rumit karena dibungkus dengan fungsi kriptografi.

### Apa itu KZG? {#what-is-kzg}

KZG adalah singkatan dari Kate-Zaverucha-Goldberg - nama dari tiga [penulis asli](https://link.springer.com/chapter/10.1007/978-3-642-17373-8_11) dari skema yang mereduksi blob data menjadi sebuah ["komitmen" kriptografi](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html) yang kecil. Blob data yang dikirimkan oleh rollup harus diverifikasi untuk memastikan rollup tidak bermasalah. Ini melibatkan prover yang mengeksekusi ulang transaksi dalam blob untuk memeriksa apakah komitmen itu valid. Hal ini secara konseptual sama dengan cara klien eksekusi memeriksa keabsahan transaksi Ethereum pada lapisan 1 menggunakan bukti Merkle. KZG adalah sebuah bukti alternatif yang sesuai dengan persamaan polinomial pada data. Komitmen mengevaluasi polinomial pada beberapa titik data rahasia. Seorang prover akan memasukkan polinomial yang sama ke dalam data dan mengevaluasinya pada nilai yang sama, memeriksa apakah hasilnya sama. Ini adalah cara untuk memverifikasi data yang kompatibel dengan teknik zero-knowledge yang digunakan oleh beberapa rollup dan pada akhirnya bagian lain dari protokol Ethereum.

### Apa yang dimaksud dengan Upacara KZG? {#what-is-a-kzg-ceremony}

Upacara KZG adalah cara bagi banyak orang dari seluruh komunitas Ethereum untuk menghasilkan serangkaian angka acak rahasia yang dapat digunakan untuk memverifikasi beberapa data. Sangat penting bahwa rangkaian angka ini tidak diketahui dan tidak dapat dibuat ulang oleh siapa pun. Untuk memastikan hal ini, setiap orang yang berpartisipasi dalam upacara ini menerima seutas tali dari peserta sebelumnya. Mereka kemudian membuat beberapa nilai acak baru (misalnya dengan mengizinkan peramban mereka untuk mengukur pergerakan mouse mereka) dan mencampurkannya dengan nilai sebelumnya. Mereka kemudian mengirimkan nilai tersebut ke peserta berikutnya dan menghancurkannya dari mesin lokal mereka. Selama satu orang dalam upacara tersebut melakukan hal ini dengan jujur, nilai akhirnya tidak akan dapat diketahui oleh penyerang. Upacara EIP-4844 KZG terbuka untuk umum dan puluhan ribu orang berpartisipasi untuk menambahkan entropi mereka sendiri. Agar upacara dapat dirusak, 100% dari para peserta harus secara aktif tidak jujur. Dari sudut pandang peserta, jika mereka tahu bahwa mereka jujur, tidak perlu mempercayai orang lain karena mereka tahu bahwa mereka telah mengamankan upacara tersebut (mereka secara individu memenuhi persyaratan 1 dari N peserta yang jujur).

<ExpandableCard title="Untuk apa nomor acak dari upacara KZG digunakan?" eventCategory="/roadmap/danksharding" eventName="clicked why is the random number from the KZG ceremony used for?">

Ketika sebuah rollup memposting data dalam sebuah blob, mereka memberikan "komitmen" yang mereka posting pada rantai. Komitmen ini merupakan hasil evaluasi kecocokan polinomial terhadap data pada titik-titik tertentu. Titik-titik ini ditentukan oleh angka acak yang dihasilkan dalam upacara KZG. Prover kemudian dapat mengevaluasi polinomial pada titik-titik yang sama untuk memverifikasi data - jika mereka sampai pada nilai yang sama, maka data tersebut benar.

</ExpandableCard>

<ExpandableCard title="Mengapa data acak KZG harus tetap dirahasiakan?" eventCategory="/roadmap/danksharding" eventName="clicked why does the KZG random data have to stay secret?">

Jika seseorang mengetahui lokasi acak yang digunakan untuk komitmen, maka akan mudah bagi mereka untuk membuat polinomial baru yang sesuai dengan titik-titik tertentu (yaitu "tabrakan"). Ini berarti mereka bisa menambahkan atau menghapus data dari blob dan tetap memberikan bukti yang sah. Untuk mencegah hal ini, alih-alih memberikan pembuktian lokasi rahasia yang sebenarnya, mereka benar-benar menerima lokasi yang dibungkus dalam "kotak hitam" kriptografi menggunakan kurva elips. Ini secara efektif mengacak nilai sedemikian rupa sehingga nilai asli tidak dapat direkayasa, tetapi dengan beberapa pembuktian aljabar yang cerdas dan pemeriksa masih dapat mengevaluasi polinomial pada titik-titik yang diwakilinya.

</ExpandableCard>

<InfoBanner isWarning mb={8}>
  Baik Danksharding maupun Proto-Danksharding tidak mengikuti model "pecahan" tradisional yang bertujuan untuk membagi rantai blok menjadi beberapa bagian. Rantai pecahan tidak lagi menjadi bagian dari peta perjalanan. Sebagai gantinya, Danksharding menggunakan pengambilan sampel data terdistribusi di seluruh blob untuk menskalakan Ethereum. Ini jauh lebih sederhana untuk diterapkan. Model ini kadang-kadang disebut sebagai "data-pecahan".
</InfoBanner>

## Apa yang dimaksud dengan Danksharding? {#what-is-danksharding}

Danksharding adalah realisasi penuh dari penskalaan rollup yang dimulai dengan Proto-Danksharding. Danksharding akan memberikan ruang yang sangat besar di Ethereum untuk melakukan rollup untuk membuang data transaksi yang telah dikompresi. Ini berarti Ethereum akan dapat mendukung ratusan rollup individu dengan mudah dan membuat jutaan transaksi per detik menjadi kenyataan.

Cara kerjanya adalah dengan memperluas blob yang melekat pada blok dari 1 pada Proto-Danksharding menjadi 64 pada Danksharding penuh. Perubahan lainnya yang diperlukan adalah pembaruan pada cara klien konsensus beroperasi untuk memungkinkan mereka menangani blob besar yang baru. Beberapa dari perubahan ini sudah ada di peta perjalanan untuk tujuan lain yang tidak terkait dengan Danksharding. Sebagai contoh, Danksharding mengharuskan pemisahan pengusul-pembangun untuk diimplementasikan. Ini adalah peningkatan yang memisahkan tugas membangun blok dan mengusulkan blok di seluruh validator yang berbeda. Demikian pula, pengambilan sampel ketersediaan data diperlukan untuk Danksharding, tetapi juga diperlukan untuk pengembangan klien yang sangat ringan yang tidak menyimpan banyak data historis ("klien tanpa kewarganegaraan").

<ExpandableCard title="Mengapa Danksharding memerlukan pemisahan pengusul-pembangun?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require proposer-builder separation?">

Pemisahan pengusul-pembuat diperlukan untuk mencegah keharusan validator individual membuat komitmen dan bukti yang mahal untuk data blob sebesar 32MB. Hal ini akan memberikan beban yang terlalu berat bagi para penaruh rumahan dan mengharuskan mereka untuk berinvestasi pada perangkat keras yang lebih kuat, yang akan merugikan desentralisasi. Sebagai gantinya, pembuat blok khusus bertanggung jawab atas pekerjaan komputasi yang mahal ini. Kemudian, mereka membuat blok mereka tersedia bagi para pengusul blok untuk disiarkan. Pengusul blok hanya memilih blok yang paling menguntungkan. Siapa pun bisa memverifikasi blob dengan biaya yang murah dan cepat, artinya setiap validator biasa dapat memeriksa apakah pembangun blok berperilaku jujur. Ini memungkinkan blob besar diproses tanpa mengorbankan desentralisasi. Pembangun blok yang berperilaku buruk dapat dengan mudah dikeluarkan dari jaringan dan dihukum pemotongan imbalan - orang lain akan menggantikannya karena membangun blok adalah kegiatan yang menguntungkan.

</ExpandableCard>

<ExpandableCard title="Mengapa Danksharding memerlukan pengambilan sampel ketersediaan data?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require data availability sampling?">

Pengambilan sampel ketersediaan data diperlukan oleh validator untuk dengan cepat dan efisien memverifikasi data blob. Dengan menggunakan pengambilan sampel ketersediaan data, para validator dapat yakin bahwa data blob tersedia dan tercatat dengan benar. Setiap validator dapat secara acak memilih beberapa titik data dan membuat bukti, artinya tidak ada validator yang harus memeriksa seluruh blob. Jika ada data yang hilang, hal itu akan segera teridentifikasi dan blob akan ditolak.

</ExpandableCard>

### Kemajuan saat ini {#current-progress}

Danksharding penuh masih beberapa tahun lagi. Namun, Proto-Danksharding seharusnya tiba dalam waktu yang relatif singkat. Pada saat penulisan (Feb 2023), upacara KZG masih terbuka dan telah menarik lebih dari 50.000 kontributor. [EIP](https://eips.ethereum.org/EIPS/eip-4844) untuk Proto-Danksharding sudah siap, spesifikasinya disetujui, dan klien telah mengimplementasikan prototipe yang saat ini sedang diuji dan disiapkan untuk produksi. Langkah selanjutnya adalah menerapkan perubahan tersebut di jaringan percobaan publik. Anda bisa terus mendapatkan info terbaru menggunakan [daftar periksa kesiapan EIP 4844](https://github.com/ethereum/pm/blob/master/Dencun/4844-readiness-checklist.md).

### Bacaan lebih lanjut {#further-reading}

- [Catatan Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Catatan Dankrad tentang Danksharding](https://notes.ethereum.org/@dankrad/new_sharding)
- [Dankrad, Proto, dan Vitalik membahas tentang Danksharding](https://www.youtube.com/watch?v=N5p0TB77flM)
- [Upacara KZG](https://ceremony.ethereum.org/)
- [Pemaparan Carl Beekhuizen tentang pengaturan tepercaya di konferensi Devcon](https://archive.devcon.org/archive/watch/6/the-kzg-ceremony-or-how-i-learnt-to-stop-worrying-and-love-trusted-setups/?tab=YouTube)
- [Lebih lanjut tentang pengambilan sampel ketersediaan data untuk blob](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Dankrad Feist tentang komitmen dan bukti KZG](https://youtu.be/8L2C6RDMV9Q)
- [Komitmen polinomial KZG](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)
