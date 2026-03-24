---
title: Pemisahan pengusul-pembangun
description: Pelajari bagaimana dan mengapa validator Ethereum akan membagi tanggung jawab pembuatan blok dan penyiaran blok mereka.
lang: id
---

# Pemisahan pengusul-pembangun {#proposer-builder-separation}

[Ethereum](/) saat ini memiliki validator yang membuat _dan_ menyiarkan blok. Mereka menggabungkan transaksi yang telah mereka dengar melalui jaringan gosip dan mengemasnya ke dalam sebuah blok yang dikirimkan ke rekan-rekan (peers) di jaringan Ethereum. **Pemisahan pengusul-pembangun (Proposer-builder separation/PBS)** membagi tugas-tugas ini ke beberapa validator. Pembangun blok menjadi bertanggung jawab untuk membuat blok dan menawarkannya kepada pengusul blok di setiap slot. Pengusul blok tidak dapat melihat isi blok tersebut, mereka hanya memilih yang paling menguntungkan, membayar biaya kepada pembangun blok sebelum mengirimkan blok tersebut ke rekan-rekannya.

Ini adalah peningkatan yang penting karena beberapa alasan. Pertama, ini menciptakan peluang untuk mencegah penyensoran transaksi di tingkat protokol. Kedua, ini mencegah validator hobi kalah bersaing dengan pemain institusional yang dapat mengoptimalkan profitabilitas pembuatan blok mereka dengan lebih baik. Ketiga, ini membantu peningkatan (scaling) Ethereum dengan memungkinkan peningkatan Danksharding.

## PBS dan ketahanan terhadap penyensoran {#pbs-and-censorship-resistance}

Memisahkan pembangun blok dan pengusul blok membuatnya jauh lebih sulit bagi pembangun blok untuk menyensor transaksi. Hal ini karena kriteria penyertaan yang relatif kompleks dapat ditambahkan untuk memastikan tidak ada penyensoran yang terjadi sebelum blok diusulkan. Karena pengusul blok adalah entitas yang terpisah dari pembangun blok, ia dapat mengambil peran sebagai pelindung terhadap pembangun blok yang melakukan penyensoran.

Sebagai contoh, daftar penyertaan (inclusion lists) dapat diperkenalkan sehingga ketika validator mengetahui tentang transaksi tetapi tidak melihatnya disertakan dalam blok, mereka dapat memaksakannya sebagai keharusan di blok berikutnya. Daftar penyertaan dihasilkan dari mempool lokal pengusul blok (daftar transaksi yang diketahuinya) dan dikirim ke rekan-rekan mereka tepat sebelum sebuah blok diusulkan. Jika ada transaksi dari daftar penyertaan yang hilang, pengusul dapat menolak blok tersebut, menambahkan transaksi yang hilang sebelum mengusulkannya, atau mengusulkannya dan membiarkannya ditolak oleh validator lain ketika mereka menerimanya. Ada juga versi yang berpotensi lebih efisien dari ide ini yang menegaskan bahwa pembangun harus sepenuhnya memanfaatkan ruang blok yang tersedia dan jika tidak, transaksi ditambahkan dari daftar penyertaan pengusul. Ini masih merupakan area penelitian aktif dan konfigurasi optimal untuk daftar penyertaan belum ditentukan.

[Mempool terenkripsi](https://www.youtube.com/watch?v=fHDjgFcha0M&list=PLpktWkixc1gUqkyc1-iE6TT0RWQTBJELe&index=3) juga dapat membuat pembangun dan pengusul tidak mungkin mengetahui transaksi mana yang mereka sertakan dalam sebuah blok sampai setelah blok tersebut disiarkan.

<ExpandableCard title="Jenis penyensoran apa yang diselesaikan oleh PBS?" eventCategory="/roadmap/pbs" eventName="clicked what kinds of censorship does PBS solve?">

Organisasi yang kuat dapat menekan validator untuk menyensor transaksi ke atau dari alamat tertentu. Validator mematuhi tekanan ini dengan mendeteksi alamat yang masuk daftar hitam di kumpulan transaksi mereka dan menghilangkannya dari blok yang mereka usulkan. Setelah PBS, hal ini tidak akan mungkin lagi terjadi karena pengusul blok tidak akan mengetahui transaksi mana yang mereka siarkan di blok mereka. Mungkin penting bagi individu atau aplikasi tertentu untuk mematuhi aturan penyensoran, misalnya ketika hal itu dijadikan hukum di wilayah mereka. Dalam kasus ini, kepatuhan terjadi di tingkat aplikasi, sementara protokol tetap tanpa izin dan bebas penyensoran.
</ExpandableCard>

## PBS dan MEV {#pbs-and-mev}

**Nilai ekstraksi maksimum (MEV)** mengacu pada validator yang memaksimalkan profitabilitas mereka dengan mengurutkan transaksi secara menguntungkan. Contoh umum termasuk arbitrase tukar (swap) di pertukaran terdesentralisasi (misalnya, mendahului penjualan atau pembelian besar) atau mengidentifikasi peluang untuk melikuidasi posisi DeFi. Memaksimalkan MEV membutuhkan pengetahuan teknis yang canggih dan perangkat lunak khusus yang ditambahkan ke validator normal, sehingga jauh lebih mungkin bagi operator institusional untuk mengungguli individu dan validator hobi dalam ekstraksi MEV. Ini berarti imbal hasil mengunci (staking) kemungkinan akan lebih tinggi dengan operator terpusat, menciptakan kekuatan pemusatan yang mengurangi insentif untuk mengunci di rumah.

PBS memecahkan masalah ini dengan mengonfigurasi ulang ekonomi MEV. Alih-alih pengusul blok melakukan pencarian MEV mereka sendiri, mereka cukup memilih sebuah blok dari banyak blok yang ditawarkan kepada mereka oleh pembangun blok. Pembangun blok mungkin telah melakukan ekstraksi MEV yang canggih, tetapi hadiah untuk itu diberikan kepada pengusul blok. Ini berarti bahwa meskipun sekelompok kecil pembangun blok khusus mendominasi ekstraksi MEV, hadiah untuk itu dapat diberikan kepada validator mana pun di jaringan, termasuk staker rumahan individu.

<ExpandableCard title="Mengapa memusatkan pembuatan blok tidak masalah?" eventCategory="/roadmap/pbs" eventName="clicked why is it OK to centralize block building?">

Individu dapat diberi insentif untuk melakukan stake dengan kolam staking daripada melakukannya sendiri karena hadiah yang ditingkatkan yang ditawarkan oleh strategi MEV yang canggih. Memisahkan pembuatan blok dari usulan blok berarti bahwa MEV yang diekstraksi akan didistribusikan ke lebih banyak validator daripada memusatkannya pada pencari MEV yang paling efektif. Pada saat yang sama, membiarkan pembangun blok khusus ada akan menghilangkan beban pembuatan blok dari individu, dan juga mencegah individu mencuri MEV untuk diri mereka sendiri, sambil memaksimalkan jumlah validator independen dan individu yang dapat memeriksa bahwa blok tersebut jujur. Konsep pentingnya adalah "asimetri pembukti-pemverifikasi" (prover-verifier asymmetry) yang mengacu pada gagasan bahwa produksi blok terpusat tidak masalah selama ada jaringan validator yang kuat dan terdesentralisasi secara maksimal yang mampu membuktikan bahwa blok tersebut jujur. Desentralisasi adalah sarana, bukan tujuan akhir - apa yang kita inginkan adalah blok yang jujur.
</ExpandableCard>

## PBS dan Danksharding {#pbs-and-danksharding}

Danksharding adalah cara Ethereum akan melakukan peningkatan hingga >100.000 transaksi per detik dan meminimalkan biaya untuk pengguna rollup. Ini bergantung pada PBS karena menambah beban kerja bagi pembangun blok, yang harus menghitung bukti untuk data rollup hingga 64 MB dalam waktu kurang dari 1 detik. Ini mungkin akan membutuhkan pembangun khusus yang dapat mendedikasikan perangkat keras yang cukup besar untuk tugas tersebut. Namun, dalam situasi saat ini, pembuatan blok dapat menjadi semakin terpusat di sekitar operator yang lebih canggih dan kuat karena ekstraksi MEV. Pemisahan pengusul-pembangun adalah cara untuk merangkul kenyataan ini dan mencegahnya memberikan kekuatan pemusatan pada validasi blok (bagian yang penting) atau distribusi hadiah mengunci. Manfaat sampingan yang luar biasa adalah bahwa pembangun blok khusus juga bersedia dan mampu menghitung bukti data yang diperlukan untuk Danksharding.

## Kemajuan saat ini {#current-progress}

PBS berada dalam tahap penelitian lanjutan, tetapi masih ada beberapa pertanyaan desain penting yang perlu diselesaikan sebelum dapat dibuat prototipenya di klien Ethereum. Belum ada spesifikasi yang diselesaikan. Ini berarti PBS kemungkinan masih satu tahun lagi atau lebih. Periksa [status penelitian](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance) terbaru.

## Bacaan Lebih Lanjut {#further-reading}

- [Status penelitian: ketahanan terhadap penyensoran di bawah PBS](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)
- [Desain pasar biaya yang ramah PBS](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725)
- [PBS dan ketahanan terhadap penyensoran](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Secondary-auctions)
- [Daftar penyertaan (Inclusion lists)](https://notes.ethereum.org/@fradamt/forward-inclusion-lists)