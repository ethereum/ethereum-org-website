---
title: Pemisahan pengusul-pembuat
description: Pelajari bagaimana dan mengapa validator Ethereum akan membagi tanggung jawab membangun blok dan menyiarkan blok mereka.
lang: id
---

# Pemisahan pengusul-pembuat {#proposer-builder-separation}

Validator Ethereum saat ini membuat _dan_ menyiarkan blok. Mereka mengelompokkan transaksi yang mereka dengar melalui jaringan gosip dan mengemasnya ke dalam blok yang dikirimkan kepada rekan-rekan di jaringan Ethereum. **Pemisahan pengusul-pembangun (PBS)** membagi tugas ini di antara beberapa validator. Pembangun blok menjadi bertanggung jawab untuk membuat blok dan menawarkannya kepada pengusul blok pada setiap ruang. Pengusul blok tidak dapat melihat konten blok, mereka hanya memilih yang paling menguntungkan, membayar biaya kepada pembangun blok sebelum mengirim blok ke rekan-rekannya.

Ini adalah peningkatan penting karena beberapa alasan. Pertama, menciptakan peluang untuk mencegah penyensoran transaksi pada tingkat protokol. Kedua, mencegah validator pemula dari persaingan dengan pemain institusi yang dapat lebih baik mengoptimalkan profitabilitas pembangunan blok mereka. Ketiga, membantu dalam penskalaan Ethereum dengan memungkinkan peningkatan Danksharding.

## PBS dan ketahanan terhadap penyensoran {#pbs-and-censorship-resistance}

Memisahkan pembangun blok dan pengusul blok membuat lebih sulit bagi pembangun blok untuk menyensor transaksi. Hal ini karena kriteria inklusi yang relatif kompleks dapat ditambahkan yang memastikan tidak ada penyensoran yang terjadi sebelum blok diusulkan. Karena pengusul blok adalah entitas terpisah dari pembangun blok, ia dapat mengambil peran pelindung terhadap penyensoran pembangun blok.

Sebagai contoh, daftar inklusi dapat diperkenalkan sehingga ketika validator mengetahui tentang transaksi tetapi tidak melihatnya dimasukkan dalam blok, mereka dapat memaksa agar transaksi tersebut menjadi syarat wajib dalam blok berikutnya. Daftar inklusi dihasilkan dari kolam memori lokal pengusul blok (daftar transaksi yang diwaspadai) dan dikirimkan kepada rekan-rekan mereka tepat sebelum blok diusulkan. Jika ada transaksi dari daftar inklusi yang hilang, pengusul dapat menolak blok, menambahkan transaksi yang hilang sebelum mengusulkannya, atau mengusulkannya dan membiarkan blok tersebut ditolak oleh validator lain ketika mereka menerimanya. Ada juga versi yang mungkin lebih efisien dari gagasan ini yang menyatakan bahwa pembangun harus sepenuhnya memanfaatkan ruang blok yang tersedia, dan jika tidak, transaksi ditambahkan dari daftar inklusi pengusul. Ini masih merupakan area penelitian aktif dan konfigurasi optimal untuk daftar inklusi belum ditentukan.

[Kolam memori yang dienkripsi](https://www.youtube.com/watch?v=fHDjgFcha0M&list=PLpktWkixc1gUqkyc1-iE6TT0RWQTBJELe&index=3) juga dapat membuat pembangun dan pengusul tidak bisa mengetahui transaksi mana yang mereka masukkan ke dalam blok hingga setelah blok disiarkan.

<ExpandableCard title="Jenis sensor apa yang dapat diatasi oleh PBS?" eventCategory="/roadmap/pbs" eventName="clicked what kinds of censorship does PBS solve?">

Organisasi yang kuat dapat memberi tekanan kepada validator untuk menyensor transaksi ke atau dari alamat tertentu. Validator mematuhi tekanan ini dengan mendeteksi alamat-alamat yang masuk dalam daftar hitam di dalam kolam memori transaksi mereka dan menghilangkannya dari blok yang mereka usulkan. Setelah PBS, hal ini tidak akan lagi mungkin terjadi karena pengusul blok tidak akan tahu transaksi mana yang mereka siarkan dalam blok mereka. Mungkin penting bagi individu atau aplikasi tertentu untuk mematuhi aturan penyensoran, misalnya ketika aturan tersebut dijadikan hukum di wilayah mereka. Dalam kasus-kasus ini, kepatuhan terjadi pada tingkat aplikasi, sementara protokol tetap terbuka dan bebas penyensoran.

</ExpandableCard>

## PBS dan MEV {#pbs-and-mev}

**Nilai ekstraksi maksimum (MEV)** mengacu pada validator memaksimalkan profitabilitas mereka dengan mengurutkan transaksi dengan cara yang menguntungkan. Contoh umum meliputi arbitrase pertukaran di bursa terdesentralisasi (misalnya, mendahului penjualan atau pembelian besar) atau mengidentifikasi peluang untuk likuidasi posisi DeFi. Memaksimalkan MEV memerlukan pemahaman teknis yang canggih dan perangkat lunak khusus yang ditambahkan ke validator normal, sehingga lebih mungkin bagi operator institusi untuk melampaui individu dan validator pemula dalam ekstraksi MEV. Ini berarti pengembalian penaruhan kemungkinan akan lebih tinggi dengan operator terpusat, menciptakan kekuatan sentralisasi yang mengurangi insentif untuk penaruhan di rumah.

PBS memecahkan masalah ini dengan mengonfigurasi ulang ekonomi MEV. Alih-alih pengusul blok melakukan pencarian MEV mereka sendiri, mereka hanya memilih blok dari banyak blok yang ditawarkan kepada mereka oleh pembangun blok. Pembangun blok mungkin telah melakukan ekstraksi MEV yang canggih, tetapi imbalannya diberikan kepada pengusul blok. Ini berarti bahwa meskipun sekelompok kecil pembangun blok khusus mendominasi ekstraksi MEV, imbalannya bisa diberikan kepada validator mana pun di jaringan, termasuk individu yang melakukan penaruhan di rumah.

<ExpandableCard title="Mengapa pembangunan blok terpusat dianggap wajar?" eventCategory="/roadmap/pbs" eventName="clicked why is it OK to centralize block building?">

Seseorang dapat diberi insentif untuk melakukan penaruhan dengan pool daripada melakukannya atas keinginan sendiri karena peningkatan imbalan yang ditawarkan oleh strategi MEV yang canggih. Memisahkan pembangunan blok dari usulan blok berarti bahwa MEV yang diekstraksi akan tersebar di lebih banyak validator daripada terpusat pada pencari MEV yang paling efektif. Pada saat yang sama, memungkinkan pembangun blok khusus untuk ada menghilangkan beban pembangunan blok dari individu, dan juga mencegah individu mencuri MEV untuk diri mereka sendiri, sambil memaksimalkan jumlah validator individu dan independen yang dapat memeriksa blok-blok yang jujur. Konsep penting adalah "asimetri pemberi bukti-pemverifikasi" yang mengacu pada gagasan bahwa produksi blok terpusat dapat diterima selama ada jaringan validator yang kuat dan sepenuhnya terdesentralisasi yang mampu membuktikan bahwa blok-blok tersebut jujur. Desentralisasi adalah sarana, bukan tujuan akhir - yang kita inginkan adalah blok-blok yang jujur.
</ExpandableCard>

## PBS dan Danksharding {#pbs-and-danksharding}

Danksharding adalah cara di mana Ethereum akan melakukan skalabilitas hingga >100.000 transaksi per detik dan meminimalkan biaya bagi pengguna rollup. Ini mengandalkan PBS karena menambah beban kerja bagi pembangun blok, yang harus menghitung bukti untuk hingga 64 MB data rollup dalam waktu kurang dari 1 detik. Hal ini mungkin akan memerlukan pembangun khusus yang dapat mengalokasikan perangkat keras yang cukup besar untuk tugas tersebut. Namun, dalam situasi saat ini, pembangunan blok bisa menjadi semakin terpusat di sekitar operator yang lebih canggih dan kuat karena ekstraksi MEV. Pemisahan pengusul-pembangun adalah cara untuk merangkul realitas ini dan mencegahnya memberikan tekanan terpusat pada validasi blok (bagian yang penting) atau distribusi imbalan penaruhan. Manfaat samping yang besar adalah bahwa pembangun blok khusus juga bersedia dan mampu menghitung bukti data yang diperlukan untuk Danksharding.

## Kemajuan saat ini {#current-progress}

PBS berada dalam tahap penelitian yang canggih, tetapi masih ada beberapa pertanyaan desain penting yang perlu dipecahkan sebelum dapat diprototipekan dalam klien Ethereum. Belum ada spesifikasi final yang tersedia. Ini berarti PBS kemungkinan akan memerlukan waktu setahun atau lebih lagi. Periksa [status terbaru penelitian](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance).

## Bacaan Lebih Lanjut {#further-reading}

- [Status penelitian: ketahanan terhadap penyensoran di bawah PBS](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)
- [Desain pasar bebas yang ramah PBS](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725)
- [PBS dan ketahanan terhadap penyensoran](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Secondary-auctions)
- [Daftar inklusi](https://notes.ethereum.org/@fradamt/H1ZqdtrBF)
