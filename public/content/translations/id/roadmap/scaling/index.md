---
title: Penskalaan Ethereum
description: Melakukan rollup transaksi batch secara bersamaan di luar rantai, sehingga mengurangi biaya bagi pengguna. Namun, cara rollup yang saat ini menggunakan data terlalu mahal, sehingga membatasi seberapa murah transaksi dapat dilakukan. Proto-Danksharding memperbaiki hal ini.
lang: id
image: /images/roadmap/roadmap-transactions.png
alt: "Peta Jalan Ethereum"
template: roadmap
---

Ethereum diskalakan menggunakan [lapisan 2](/layer-2/#rollups) (juga dikenal sebagai rollup), yang mengelompokkan transaksi dan mengirimkan hasilnya ke Ethereum. Meskipun rollup hingga delapan kali lebih murah daripada Jaringan Utama Ethereum, Anda dapat mengoptimalkan rollup lebih lanjut untuk mengurangi biaya bagi pengguna akhir. Rollup juga bergantung pada beberapa komponen terpusat yang dapat dihapus oleh pengembang saat rollup sudah matang.

<Alert variant="update" className="mb-8">
<AlertContent>
<AlertTitle className="mb-4">
  Biaya transaksi
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>Rollup hari ini <strong>~5-20x</strong> lebih murah dari lapisan 1 Ethereum</li>
    <li>Rollup ZK akan segera menurunkan biaya sebesar <strong>~40-100x</strong></li>
    <li>Perubahan yang akan datang pada Ethereum akan memberikan penskalaan <strong>~100-1000x</strong> lainnya</li>
    <li style={{ marginBottom: 0 }}>Pengguna harus mendapatkan keuntungan dari transaksi <strong>berharga kurang dari $0,001</strong></li>
  </ul>
</AlertContent>
</Alert>

## Membuat data lebih murah {#making-data-cheaper}

Rollup mengumpulkan sejumlah besar transaksi, mengeksekusinya, dan mengirimkan hasilnya ke Ethereum. Hal ini menghasilkan banyak data yang harus tersedia secara terbuka sehingga siapa pun dapat melakukan transaksi untuk diri mereka sendiri dan memverifikasi bahwa operator rollup tersebut jujur. Jika seseorang menemukan ketidaksesuaian, mereka dapat mengajukan tantangan.

### Proto-Danksharding {#proto-danksharding}

Data rollup secara historis disimpan secara permanen di Ethereum, yang biayanya mahal. Lebih dari 90% dari biaya transaksi yang dibayarkan pengguna pada rollup disebabkan oleh penyimpanan data ini. Untuk mengurangi biaya transaksi, kita dapat memindahkan data ke dalam penyimpanan 'blob' sementara yang baru. Blob lebih murah karena tidak permanen; data ini akan dihapus dari Ethereum setelah tidak lagi dibutuhkan. Penyimpanan data rollup jangka panjang menjadi tanggung jawab pihak yang membutuhkannya, seperti operator rollup, bursa, layanan pengindeksan, dan lain-lain. Menambahkan transaksi blob ke Ethereum adalah bagian dari peningkatan yang dikenal sebagai "Proto-Danksharding".

Dengan Proto-Danksharding, dimungkinkan untuk menambahkan banyak blob ke dalam blok Ethereum. Hal ini memungkinkan peningkatan skala substansial (>100x) lainnya pada keluaran Ethereum dan penurunan biaya transaksi.

### Danksharding {#danksharding}

Tahap kedua dari perluasan data blob cukup rumit karena membutuhkan metode baru untuk memeriksa data rollup yang tersedia di jaringan dan bergantung pada [para validator](/glossary/#validator) yang memisahkan tanggung jawab pembangunan [blok](/glossary/#block) dan proposal blok mereka. Hal ini juga membutuhkan cara untuk membuktikan secara kriptografis bahwa validator telah memverifikasi subset data blob.

Langkah kedua ini dikenal sebagai ["Danksharding"](/roadmap/danksharding/). Pekerjaan implementasi terus berlanjut, dengan kemajuan yang dicapai pada prasyarat seperti [pemisahan pembangunan blok dan proposal blok](/roadmap/pbs) dan desain jaringan baru yang memungkinkan jaringan untuk secara efisien mengonfirmasi bahwa data tersedia dengan mengambil sampel acak beberapa kilobita sekaligus, yang dikenal sebagai [pengambilan sampel ketersediaan data (DAS)](/developers/docs/data-availability).

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">Selengkapnya tentang Danksharding</ButtonLink>

## Mendesentralisasikan rollup {#decentralizing-rollups}

[Rollup](/layer-2) sudah menskalakan Ethereum. Sebuah [ekosistem proyek rollup yang kaya](https://l2beat.com/scaling/tvs) memungkinkan para pengguna untuk bertransaksi dengan cepat dan murah, dengan berbagai jaminan keamanan. Namun, rollup telah di-bootstrap menggunakan sequencer terpusat (komputer yang melakukan semua pemrosesan dan agregasi transaksi sebelum mengirimkannya ke Ethereum). Hal ini rentan terhadap penyensoran, karena operator sequencer dapat dikenai sanksi, disuap, atau dikompromikan. Pada saat yang sama, [rollup bervariasi](https://l2beat.com/scaling/summary) dalam cara mereka memvalidasi data yang masuk. Cara terbaik adalah "para pembukti" mengirimkan [bukti penipuan](/glossary/#fraud-proof) atau bukti validitas, tetapi belum semua rollup mencapai tahap itu. Bahkan rollup yang menggunakan bukti validitas/penipuan menggunakan kumpulan kecil pemberi bukti yang diketahui. Oleh karena itu, langkah penting berikutnya dalam penskalaan Ethereum adalah mendistribusikan tanggung jawab untuk menjalankan sequencer dan pembuktian kepada lebih banyak orang.

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">Selengkapnya tentang rollup</ButtonLink>

## Kemajuan saat ini {#current-progress}

roto-Danksharding was successfully implemented as part of the Cancun-Deneb ("Dencun") network upgrade in March 2024.. Sejak fitur ini berjalan,roll up sudah pakai penyimpanan blob , hasilnya biaya transaksi jadi lebih murah bagi user, dan jutaan transaksi dapat di akses oleh blob.

Kerjaan full Danksharding masih terus berjalan, dengan kemajuan yang dicapai pada psrasyaratnta seperti PBS(Proposer-builder-separation) dan DAS (Data avaibility simpling). Desentralisasi infrastuktur roll up merupakan proses bertahap , terdapat banyak roll up berbeda yang membangun sistem tertentu  dan variasi tertentu untuk mencapai dessentralisasi dengan kecepatan yang berbeda.

[Selengkapnya tentang peningkatan jaringan Dencun dan dampaknya](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />
