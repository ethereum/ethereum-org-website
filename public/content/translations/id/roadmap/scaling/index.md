---
title: Peningkatan Ethereum
description: Rollup menggabungkan transaksi bersama secara offchain, mengurangi biaya bagi pengguna. Namun, cara rollup saat ini menggunakan data terlalu mahal, membatasi seberapa murah transaksi bisa dilakukan. Proto-Danksharding memperbaiki hal ini.
lang: id
image: /images/roadmap/roadmap-transactions.png
alt: "Peta jalan Ethereum"
template: roadmap
---

Ethereum ditingkatkan menggunakan [layer 2](/layer-2/#rollups) (juga dikenal sebagai rollup), yang menggabungkan transaksi bersama dan mengirimkan outputnya ke Ethereum. Meskipun rollup hingga delapan kali lebih murah daripada Mainnet Ethereum, masih memungkinkan untuk mengoptimalkan rollup lebih lanjut guna mengurangi biaya bagi pengguna akhir. Rollup juga bergantung pada beberapa komponen terpusat yang dapat dihapus oleh pengembang seiring dengan semakin matangnya rollup tersebut.

<Alert variant="update" className="mb-8">
<AlertContent>
<AlertTitle className="mb-4">
  Biaya transaksi
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>Rollup saat ini <strong>\~5-20x</strong> lebih murah daripada layer 1 Ethereum</li>
    <li>ZK-rollup akan segera menurunkan biaya sebesar <strong>\~40-100x</strong></li>
    <li>Perubahan mendatang pada Ethereum akan memberikan <strong>\~100-1000x</strong> peningkatan lainnya</li>
    <li style={{ marginBottom: 0 }}>Pengguna akan mendapatkan keuntungan dari transaksi <strong>dengan biaya kurang dari $0,001</strong></li>
  </ul>
</AlertContent>
</Alert>

## Membuat data menjadi lebih murah {#making-data-cheaper}

Rollup mengumpulkan sejumlah besar transaksi, mengeksekusinya, dan mengirimkan hasilnya ke Ethereum. Hal ini menghasilkan banyak data yang harus tersedia secara terbuka sehingga siapa pun dapat mengeksekusi transaksi tersebut untuk diri mereka sendiri dan memverifikasi bahwa operator rollup tersebut jujur. Jika seseorang menemukan ketidaksesuaian, mereka dapat mengajukan tantangan.

### Proto-Danksharding {#proto-danksharding}

Data rollup secara historis telah disimpan di Ethereum secara permanen, yang mana ini mahal. Lebih dari 90% biaya transaksi yang dibayar pengguna pada rollup disebabkan oleh penyimpanan data ini. Untuk mengurangi biaya transaksi, kita dapat memindahkan data ke dalam penyimpanan 'blob' sementara yang baru. Blob lebih murah karena tidak permanen; blob akan dihapus dari Ethereum setelah tidak lagi dibutuhkan. Menyimpan data rollup dalam jangka panjang menjadi tanggung jawab orang-orang yang membutuhkannya, seperti operator rollup, bursa, layanan pengindeksan, dll. Menambahkan transaksi blob ke Ethereum adalah bagian dari peningkatan yang dikenal sebagai "Proto-Danksharding".

Dengan Proto-Danksharding, dimungkinkan untuk menambahkan banyak blob ke blok Ethereum. Hal ini memungkinkan peningkatan skala yang substansial (>100x) pada throughput Ethereum dan penurunan skala pada biaya transaksi.

### Danksharding {#danksharding}

Tahap kedua dari perluasan data blob ini rumit karena memerlukan metode baru untuk memeriksa ketersediaan data rollup di jaringan dan bergantung pada [validator](/glossary/#validator) yang memisahkan tanggung jawab pembuatan [blok](/glossary/#block) dan pengusulan blok mereka. Hal ini juga memerlukan cara untuk membuktikan secara kriptografi bahwa validator telah memverifikasi sebagian kecil dari data blob tersebut.

Langkah kedua ini dikenal sebagai ["Danksharding"](/roadmap/danksharding/). Pekerjaan implementasi terus berlanjut, dengan kemajuan yang dicapai pada prasyarat seperti [memisahkan pembuatan blok dan pengusulan blok](/roadmap/pbs) serta desain jaringan baru yang memungkinkan jaringan untuk secara efisien mengonfirmasi bahwa data tersedia dengan mengambil sampel acak beberapa kilobyte pada satu waktu, yang dikenal sebagai [pengambilan sampel ketersediaan data (DAS)](/developers/docs/data-availability).

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">Lebih lanjut tentang Danksharding</ButtonLink>

## Mendesentralisasi rollup {#decentralizing-rollups}

[Rollup](/layer-2) sudah meningkatkan Ethereum. Sebuah [ekosistem proyek rollup yang kaya](https://l2beat.com/scaling/tvs) memungkinkan pengguna untuk bertransaksi dengan cepat dan murah, dengan berbagai jaminan keamanan. Namun, rollup telah di-bootstrap menggunakan sequencer terpusat (komputer yang melakukan semua pemrosesan dan agregasi transaksi sebelum mengirimkannya ke Ethereum). Hal ini rentan terhadap penyensoran, karena operator sequencer dapat disanksi, disuap, atau dikompromikan. Pada saat yang sama, [rollup bervariasi](https://l2beat.com/scaling/summary) dalam cara mereka memvalidasi data yang masuk. Cara terbaik adalah agar "prover" mengirimkan [anti-penipuan](/glossary/#fraud-proof) atau bukti validitas, tetapi belum semua rollup mencapai tahap itu. Bahkan rollup yang menggunakan bukti validitas/anti-penipuan menggunakan kelompok kecil prover yang dikenal. Oleh karena itu, langkah penting berikutnya dalam peningkatan Ethereum adalah mendistribusikan tanggung jawab untuk menjalankan sequencer dan prover ke lebih banyak orang.

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">Lebih lanjut tentang rollup</ButtonLink>

## Kemajuan saat ini {#current-progress}

Proto-Danksharding berhasil diimplementasikan sebagai bagian dari peningkatan jaringan Cancun-Deneb ("Dencun") pada bulan Maret 2024. Sejak implementasinya, rollup telah mulai memanfaatkan penyimpanan blob, yang menghasilkan pengurangan biaya transaksi bagi pengguna dan jutaan transaksi diproses dalam blob.

Pekerjaan pada Danksharding penuh terus berlanjut, dengan kemajuan yang dicapai pada prasyaratnya seperti PBS (Pemisahan Pengusul-Pembuat) dan DAS (Pengambilan Sampel Ketersediaan Data). Mendesentralisasi infrastruktur rollup adalah proses bertahap - ada banyak rollup berbeda yang membangun sistem yang sedikit berbeda dan akan sepenuhnya terdesentralisasi pada tingkat yang berbeda.

[Lebih lanjut tentang peningkatan jaringan Dencun dan dampaknya](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />