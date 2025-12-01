---
title: Menskala Ethereum
description: Urus niaga kelompok rollup bersama di luar rantaian, mengurangkan kos untuk pengguna. Walau bagaimanapun, cara rollup pada masa ini menggunakan data adalah terlalu mahal, mengehadkan betapa murahnya transaksi. Proto-Danksharding membetulkan perkara ini.
lang: ms
image: /images/roadmap/roadmap-transactions.png
alt: "Peta hala tuju Ethereum"
template: roadmap
---

Ethereum diskalakan menggunakan [lapisan 2s](/layer-2/#rollups) (juga dikenali sebagai rollup), yang menggabungkan transaksi bersama-sama dan menghantar output ke Ethereum. Walaupun rollup adalah sehingga lapan kali lebih murah daripada Rangkaian Utama Ethereum, itu mungkin untuk mengoptimumkan rollup selanjutnya bagi mengurangkan kos untuk pengguna akhir. Rollup juga bergantung pada beberapa komponen terpusat yang boleh dialih keluar oleh pembangun apabila rollup matang.

<InfoBanner mb={8} title="Kos transaksi">
  <ul style={{ marginBottom: 0 }}>
    <li>Rollup hari ini ialah <strong>~5-20x</strong> lebih murah daripada Ethereum lapisan 1</li>
    <li>ZK-rollups tidak lama lagi akan menurunkan yuran sebanyak <strong>~40-100x</strong></li>
    <li>Perubahan yang akan datang kepada Ethereum akan memberikan satu lagi <strong>~100-1000x</strong> penskalaan</li>
    <li style={{ marginBottom: 0 }}>Pengguna harus mendapat manfaat daripada transaksi <strong>berkos kurang daripada $0.001</strong></li>
  </ul>
</InfoBanner>

## Menjadikan data lebih murah {#making-data-cheaper}

Rollup mengumpulkan sejumlah besar transaksi, melaksanakannya dan menghantar hasilnya ke Ethereum. Ini menghasilkan banyak data yang perlu tersedia secara terbuka supaya sesiapa sahaja boleh melaksanakan transaksi tersebut sendiri dan mengesahkan bahawa pengendali rollup bertindak jujur. Jika seseorang menemui percanggahan, mereka boleh mengemukakan cabaran.

### Proto-Danksharding {#proto-danksharding}

Data rollup secara sejarah disimpan secara kekal di Ethereum, yang mahal. Lebih 90% daripada kos transaksi yang dibayar pengguna pada rollup disebabkan oleh penyimpanan data ini. Untuk mengurangkan kos transaksi, kita boleh memindahkan data ke dalam storan sementara 'blob' yang baharu. Blob lebih murah kerana ia tidak kekal; ia dipadamkan daripada Ethereum setelah tidak lagi diperlukan. Menyimpan data rollup dalam jangka panjang menjadi tanggungjawab pihak yang memerlukannya, seperti pengendali rollup, pertukaran, perkhidmatan pengindeksan, dan sebagainya. Menambah transaksi blob ke Ethereum adalah sebahagian daripada peningkatan yang dikenali sebagai "Proto-Danksharding".

Dengan Proto-Danksharding, anda mungkin boleh menambah banyak blob ke blok Ethereum. Ini membolehkan peningkatan skala yang besar (>100x) terhadap keupayaan pemprosesan Ethereum dan pengurangan kos transaksi.

### Danksharding {#danksharding}

Tahap kedua pengembangan data blob adalah rumit kerana ia memerlukan kaedah baharu untuk memeriksa ketersediaan data rollup di rangkaian dan bergantung kepada [pengesah](/glossary/#validator) untuk memisahkan tanggungjawab mereka antara pembinaan [block](/glossary/#block) dan cadangan blok. Ia juga memerlukan cara untuk membuktikan secara kriptografi bahawa pengesah telah mengesahkan subset kecil data blob.

Langkah kedua ini dikenali sebagai ["Danksharding"](/roadmap/danksharding/). Kerja pelaksanaan diteruskan, dengan kemajuan dicapai pada prasyarat seperti [memisahkan pembinaan blok dan cadangan blok](/roadmap/pbs) dan reka bentuk rangkaian baharu yang membolehkan rangkaian mengesahkan dengan cekap bahawa data tersedia dengan mengambil sampel beberapa kilobait secara rawak pada satu-satu masa, yang dikenali sebagai [pensampelan ketersediaan data (DAS)](/developers/docs/data-availability).

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">Lebih lanjut mengenai Danksharding</ButtonLink>

## Menyahpusatkan rollup {#decentralizing-rollups}

[Rollup](/layer-2) sudah pun meningkatkan skala Ethereum. [Satu ekosistem projek rollup yang beraneka](https://l2beat.com/scaling/tvl) membolehkan pengguna bertransaksi dengan pantas dan murah, disertai pelbagai jaminan keselamatan. Walau bagaimanapun, rollup telah dimulakan menggunakan penyusun berpusat (komputer yang melakukan semua pemprosesan dan penggabungan transaksi sebelum menghantarnya ke Ethereum). Ini terdedah kepada penapisan, kerana pengendali penyusun boleh dikenakan sekatan, disogok, atau diganggu dengan cara lain. Pada masa yang sama, [rollup berbeza-beza](https://l2beat.com) dalam cara mereka mengesahkan data yang masuk. Cara terbaik adalah untuk "pembukti" menghantar [bukti penipuan](/glossary/#fraud-proof) atau bukti kesahihan, tetapi tidak semua rollup berada di tahap itu lagi. Malah rollup yang menggunakan bukti kesahihan/bukti penipuan hanya menggunakan kumpulan kecil "pembukti" yang dikenali. Oleh itu, langkah kritikal seterusnya dalam meningkatkan skala Ethereum ialah mengagihkan tanggungjawab untuk menjalankan penyusun dan pembukti kepada lebih ramai orang.

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">Seterusnya tentang "rollup"</ButtonLink>

## Kemajuan semasa {#current-progress}

Proto-Danksharding berjaya dilaksanakan sebagai sebahagian daripada naik taraf rangkaian Cancun-Deneb ("Dencun") pada Mac 2024. Sejak pelaksanaannya, rollup telah mula menggunakan storan blob, mengakibatkan kos transaksi berkurangan untuk pengguna dan berjuta-juta transaksi diproses dalam blob.

Kerja pada Danksharding penuh diteruskan, dengan kemajuan dicapai pada prasyaratnya seperti PBS (Pemisahan Pencadang- Pembina) dan DAS (Pensampelan Ketersediaan Data). Menyahpusatkan infrastruktur rollup ialah satu proses berperingkat – terdapat banyak rollup berbeza yang membina sistem sedikit berbeza dan akan menyahpusat sepenuhnya pada kadar yang berbeza.

[Lebih lanjut tentang naik taraf rangkaian Dencun dan kesannya](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />