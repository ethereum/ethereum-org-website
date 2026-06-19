---
title: Menskalakan Ethereum
description: Rollup menggabungkan transaksi secara offchain, mengurangi biaya bagi pengguna. Namun, cara rollup saat ini menggunakan data terlalu mahal, membatasi seberapa murah transaksi tersebut. Proto-Danksharding memperbaiki hal ini.
lang: id
image: /images/roadmap/roadmap-transactions.png
alt: "Peta jalan Ethereum"
template: roadmap
---

Ethereum diskalakan menggunakan [lapisan 2](/layer-2/#rollups) (juga dikenal sebagai rollup), yang menggabungkan transaksi dan mengirimkan outputnya ke Ethereum. Meskipun rollup hingga delapan kali lebih murah daripada Mainnet Ethereum, rollup masih dapat dioptimalkan lebih lanjut untuk mengurangi biaya bagi pengguna akhir. Rollup juga bergantung pada beberapa komponen terpusat yang dapat dihapus oleh pengembang seiring dengan semakin matangnya rollup tersebut.

<Alert variant="update">
<AlertContent>
<AlertTitle className="mb-4">
  Biaya transaksi
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>Rollup saat ini <strong>~5-20x</strong> lebih murah daripada lapisan 1 Ethereum</li>
    <li>ZK-rollup akan segera menurunkan biaya sebesar <strong>~40-100x</strong></li>
    <li>Perubahan mendatang pada Ethereum akan memberikan penskalaan tambahan sebesar <strong>~100-1000x</strong></li>
    <li style={{ marginBottom: 0 }}>Pengguna akan mendapatkan keuntungan dari transaksi <strong>dengan biaya kurang dari $0,001</strong></strong>
  </strong>
</AlertContent>
</Alert>

## Membuat data menjadi lebih murah {#making-data-cheaper}

Rollup mengumpulkan sejumlah besar transaksi, mengeksekusinya, dan mengirimkan hasilnya ke Ethereum. Hal ini menghasilkan banyak data yang harus tersedia secara terbuka sehingga siapa pun dapat mengeksekusi transaksi tersebut sendiri dan memverifikasi bahwa operator rollup bertindak jujur. Jika seseorang menemukan ketidaksesuaian, mereka dapat mengajukan sanggahan.

### Proto-Danksharding {#proto-danksharding}

Secara historis, data rollup telah disimpan di Ethereum secara permanen, yang mana hal ini mahal. Lebih dari 90% biaya transaksi yang dibayar pengguna pada rollup disebabkan oleh penyimpanan data ini. Untuk mengurangi biaya transaksi, kita dapat memindahkan data ke dalam penyimpanan 'blob' sementara yang baru. Blob lebih murah karena tidak permanen; blob akan dihapus dari Ethereum setelah tidak lagi dibutuhkan. Menyimpan data rollup dalam jangka panjang menjadi tanggung jawab pihak-pihak yang membutuhkannya, seperti operator rollup, bursa, layanan pengindeksan, dll. Menambahkan transaksi blob ke Ethereum adalah bagian dari pembaruan yang dikenal sebagai "Proto-Danksharding".

Dengan Proto-Danksharding, dimungkinkan untuk menambahkan banyak blob ke dalam blok Ethereum. Hal ini memungkinkan peningkatan substansial lainnya (>100x) pada laju pemrosesan Ethereum dan penurunan biaya transaksi.

### Danksharding {#danksharding}

Tahap kedua dari perluasan data blob cukup rumit karena memerlukan metode baru untuk memeriksa ketersediaan data rollup di jaringan dan bergantung pada [validator](/glossary/#validator) yang memisahkan tanggung jawab pembangunan [blok](/glossary/#block) dan proposal blok mereka. Hal ini juga memerlukan cara untuk membuktikan secara kriptografis bahwa validator telah memverifikasi sebagian kecil dari data blob tersebut.

Langkah kedua ini dikenal sebagai ["danksharding"](/roadmap/danksharding/). Pekerjaan implementasi terus berlanjut, dengan kemajuan yang dicapai pada prasyarat seperti [memisahkan pembangunan blok dan proposal blok](/roadmap/pbs) serta desain jaringan baru yang memungkinkan jaringan untuk secara efisien mengonfirmasi bahwa data tersedia dengan mengambil sampel acak beberapa kilobita pada satu waktu, yang dikenal sebagai [pengambilan sampel ketersediaan data (DAS)](/developers/docs/data-availability).

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">Lebih lanjut tentang Danksharding</ButtonLink>

## Mendesentralisasikan rollup {#decentralizing-rollups}

[Rollup](/layer-2) telah menskalakan Ethereum. Sebuah [ekosistem proyek rollup yang kaya](https://l2beat.com/scaling/tvs) memungkinkan pengguna untuk bertransaksi dengan cepat dan murah, dengan berbagai jaminan keamanan. Namun, rollup telah dimulai menggunakan sekuenser terpusat (komputer yang melakukan semua pemrosesan dan agregasi transaksi sebelum mengirimkannya ke Ethereum). Hal ini rentan terhadap penyensoran, karena operator sekuenser dapat disanksi, disuap, atau disusupi. Pada saat yang sama, [rollup bervariasi](https://l2beat.com/scaling/summary) dalam cara mereka memvalidasi data yang masuk. Cara terbaik adalah agar "pembukti" mengirimkan [bukti penipuan](/glossary/#fraud-proof) atau bukti validitas, tetapi belum semua rollup mencapai tahap tersebut. Bahkan rollup yang menggunakan bukti validitas/penipuan menggunakan sekelompok kecil pembukti yang dikenal. Oleh karena itu, langkah penting berikutnya dalam menskalakan Ethereum adalah mendistribusikan tanggung jawab untuk menjalankan sekuenser dan pembukti ke lebih banyak orang.

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">Lebih lanjut tentang rollup</ButtonLink>

## Kemajuan saat ini {#current-progress}

Proto-Danksharding berhasil diimplementasikan sebagai bagian dari pembaruan jaringan Cancun-Deneb ("Dencun") pada bulan Maret 2024. Sejak implementasinya, rollup telah mulai memanfaatkan penyimpanan blob, yang menghasilkan pengurangan biaya transaksi bagi pengguna dan jutaan transaksi yang diproses dalam blob.

Pekerjaan pada Danksharding penuh terus berlanjut, dengan kemajuan yang dicapai pada prasyaratnya seperti PBS (pemisahan pengusul-pembangun) dan DAS (pengambilan sampel ketersediaan data). Mendesentralisasikan infrastruktur rollup adalah proses bertahap - ada banyak rollup berbeda yang membangun sistem yang sedikit berbeda dan akan sepenuhnya terdesentralisasi pada tingkat yang berbeda.

[Lebih lanjut tentang pembaruan jaringan Dencun dan dampaknya](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />