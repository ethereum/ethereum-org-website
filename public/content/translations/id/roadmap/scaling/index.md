---
title: Penskalaan Ethereum
description: Melakukan rollup transaksi batch secara bersamaan di luar rantai, sehingga mengurangi biaya bagi pengguna. Namun, cara rollup yang saat ini menggunakan data terlalu mahal, sehingga membatasi seberapa murah transaksi dapat dilakukan. Proto-Danksharding memperbaiki hal ini.
lang: id
image: /images/roadmap/roadmap-transactions.png
alt: "Peta Perjalanan Ethereum"
template: roadmap
---

Ethereum diskalakan menggunakan [lapisan ke-2](/layer-2/#rollups) (juga dikenal sebagai rollup), yang mengumpulkan transaksi secara bersamaan dan mengirimkan hasilnya ke Ethereum. Meskipun rollup hingga delapan kali lebih murah daripada Jaringan Utama Ethereum, Anda dapat mengoptimalkan rollup lebih lanjut untuk mengurangi biaya bagi pengguna akhir. Rollup juga bergantung pada beberapa komponen terpusat yang dapat dihapus oleh pengembang saat rollup sudah matang.

<InfoBanner mb={8} title="Biaya transaksi">
  <ul style={{ marginBottom: 0 }}>
    <li>Rollup hari ini <strong>~5-20x</strong> lebih murah dari lapisan 1 Ethereum</li>
    <li>Rollup ZK akan segera menurunkan biaya sebesar <strong>~40-100x</strong></li>
    <li>Perubahan yang akan datang pada Ethereum akan memberikan penskalaan <strong>~100-1000x</strong> lainnya</li>
    <li style={{ marginBottom: 0 }}>Pengguna harus mendapatkan keuntungan dari transaksi <strong>berharga kurang dari $0,001</strong></li>
  </ul>
</InfoBanner>

## Membuat data lebih murah {#making-data-cheaper}

Rollup mengumpulkan sejumlah besar transaksi, mengeksekusinya, dan mengirimkan hasilnya ke Ethereum. Hal ini menghasilkan banyak data yang harus tersedia secara terbuka sehingga siapa pun dapat melakukan transaksi untuk diri mereka sendiri dan memverifikasi bahwa operator rollup tersebut jujur. Jika seseorang menemukan ketidaksesuaian, mereka dapat mengajukan tantangan.

### Proto-Danksharding {#proto-danksharding}

Data rollup secara historis disimpan secara permanen di Ethereum, yang biayanya mahal. Lebih dari 90% dari biaya transaksi yang dibayarkan pengguna pada rollup disebabkan oleh penyimpanan data ini. Untuk mengurangi biaya transaksi, kita dapat memindahkan data ke dalam penyimpanan 'blob' sementara yang baru. Blob lebih murah karena tidak permanen; data ini akan dihapus dari Ethereum setelah tidak lagi dibutuhkan. Penyimpanan data rollup jangka panjang menjadi tanggung jawab pihak yang membutuhkannya, seperti operator rollup, bursa, layanan pengindeksan, dan lain-lain. Menambahkan transaksi blob ke Ethereum adalah bagian dari peningkatan yang dikenal sebagai "Proto-Danksharding".

Dengan Proto-Danksharding, dimungkinkan untuk menambahkan banyak blob ke dalam blok Ethereum. Ini memungkinkan peningkatan substansial (>100x) pada keluaran Ethereum dan penurunan biaya transaksi.

### Danksharding {#danksharding}

Tahap kedua dalam memperluas data blob cukup rumit karena memerlukan metode baru untuk memeriksa ketersediaan data rollup di jaringan dan bergantung pada [validator](/glossary/#validator) yang memisahkan tanggung jawab [pembuatan blok](/glossary/#block) dan pengajuan blok. Hal ini juga membutuhkan cara untuk membuktikan secara kriptografis bahwa validator telah memverifikasi subset data blob.

Langkah kedua ini dikenal sebagai ["Danksharding"](/roadmap/danksharding/). **Kemungkinan akan memerlukan beberapa tahun lagi** untuk sepenuhnya diterapkan. Danksharding bergantung pada pengembangan lain seperti [pemisahan pembangunan blok dan proposal blok](/roadmap/pbs) dan desain jaringan baru yang memungkinkan jaringan secara efisien mengonfirmasi bahwa data tersedia dengan mengambil sampel beberapa kilobita secara acak dalam satu waktu, yang dikenal dengan nama [pengambilan sampel data (DAS)](/developers/docs/data-availability).

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">Lebih lanjut tentang Danksharding</ButtonLink>

## Desentralisasi rollup {#decentralizing-rollups}

[Rollup](/layer-2) sudah menskalakan Ethereum. Ekosistem [yang kaya akan proyek rollup](https://l2beat.com/scaling/tvl) memungkinkan pengguna untuk bertransaksi dengan cepat dan murah, dengan berbagai jaminan keamanan. Namun, rollup telah di-bootstrap menggunakan sequencer terpusat (komputer yang melakukan semua pemrosesan dan agregasi transaksi sebelum mengirimkannya ke Ethereum). Hal ini rentan terhadap penyensoran, karena operator sequencer dapat dikenai sanksi, disuap, atau dikompromikan. Pada saat yang sama, [rollup bervariasi](https://l2beat.com) dalam cara mereka memvalidasi data yang masuk. Cara terbaik adalah dengan "pembuktian" yang mengajukan [bukti penipuan](/glossary/#fraud-proof) atau bukti keabsahan, tetapi tidak semua rollup saat ini sudah menerapkan hal ini. Bahkan rollup yang menggunakan bukti validitas/penipuan menggunakan kumpulan kecil pemberi bukti yang diketahui. Oleh karena itu, langkah penting berikutnya dalam penskalaan Ethereum adalah mendistribusikan tanggung jawab untuk menjalankan sequencer dan pembuktian kepada lebih banyak orang.

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">Lebih lanjut tentang rollup</ButtonLink>

## Kemajuan saat ini {#current-progress}

Proto-Danksharding adalah item pertama dari daftar peta perjalanan ini yang akan diterapkan sebagai bagian dari pembaruan jaringan Cancun-Deneb ("Dencun") pada Maret 2024. **Danksharding penuh kemungkinan akan memerlukan beberapa tahun lagi**, karena bergantung pada penyelesaian beberapa item peta perjalanan lainnya terlebih dahulu. Desentralisasi infrastruktur rollup kemungkinan besar akan menjadi proses yang bertahap - ada banyak rollup berbeda yang membangun sistem yang sedikit berbeda dan akan sepenuhnya terdesentralisasi dengan kecepatan yang berbeda.

[Lebih lanjut tentang pembaruan jaringan Dencun](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />
