---
title: Ketersediaan data
description: Tinjauan masalah dan solusi yang berkaitan dengan data di Ethereum
lang: id
---

"Jangan percaya, verifikasi" adalah peribahasa umum di Ethereum. Idenya adalah bahwa node Anda dapat memverifikasi secara mandiri bahwa informasi yang diterimanya benar dengan mengeksekusi semua transaksi dalam blok yang diterimanya dari rekan untuk memastikan bahwa perubahan yang diusulkan tepat sama dengan yang dihitung secara independen oleh node tersebut. Ini berarti simpul tidak harus percaya bahwa pengirim blok jujur. Ini tidak mungkin jika data hilang.

**Ketersediaan data** mengacu pada keyakinan yang dapat dimiliki pengguna bahwa data yang diperlukan untuk memverifikasi sebuah blok benar-benar tersedia bagi semua peserta jaringan. Bagi full node di Ethereum lapisan 1, ini relatif sederhana; full node mengunduh salinan semua data di setiap blok—data tersebut _harus_ tersedia agar pengunduhan bisa dilakukan. Blok dengan data yang hilang akan dibuang daripada ditambahkan ke rantai blok. Ini adalah "ketersediaan data on-chain" dan merupakan salah satu fitur dari blockchain monolitik. Full node tidak dapat dibohongi untuk menerima transaksi yang tidak valid karena mereka mengunduh dan mengeksekusi setiap transaksi sendiri. Namun, untuk blockchain modular, layer 2 rollups, dan light clients, lanskap ketersediaan data lebih kompleks, sehingga memerlukan prosedur verifikasi yang lebih canggih.

## Persyaratan {#prerequisites}

Anda sebaiknya memiliki pemahaman yang baik tentang [dasar-dasar rantai blok](/developers/docs/intro-to-ethereum/), terutama [mekanisme konsensus](/developers/docs/consensus-mechanisms/). Halaman ini juga mengasumsikan bahwa pembaca sudah mengenal [blok](/developers/docs/blocks/), [transaksi](/developers/docs/transactions/), [simpul](/developers/docs/nodes-and-clients/), [solusi penskalaan](/developers/docs/scaling/), dan topik relevan lainnya.

## Masalah ketersediaan data {#the-data-availability-problem}

Masalah ketersediaan data adalah kebutuhan untuk membuktikan kepada seluruh jaringan bahwa bentuk ringkasan dari beberapa data transaksi yang sedang ditambahkan ke blockchain benar-benar mewakili kumpulan transaksi yang valid, namun dilakukan tanpa mengharuskan semua node mengunduh seluruh data. Data transaksi lengkap diperlukan untuk memverifikasi blok secara independen, tetapi mewajibkan semua node mengunduh seluruh data transaksi menjadi penghalang bagi skalabilitas. Solusi untuk masalah ketersediaan data bertujuan memberikan jaminan yang cukup bahwa data transaksi lengkap tersedia untuk diverifikasi oleh peserta jaringan yang tidak mengunduh dan menyimpan data tersebut sendiri.

[Simpul ringan](/developers/docs/nodes-and-clients/light-clients) dan [rollup Lapisan 2](/developers/docs/scaling) adalah contoh penting dari peserta jaringan yang memerlukan jaminan ketersediaan data yang kuat tetapi tidak dapat mengunduh dan memproses data transaksi untuk diri mereka sendiri. Menghindari pengunduhan data transaksi adalah yang membuat light nodes tetap ringan dan memungkinkan rollups menjadi solusi skalabilitas yang efektif.

Ketersediaan data juga menjadi perhatian penting bagi klien Ethereum ["stateless"](/roadmap/statelessness) di masa depan yang tidak perlu mengunduh dan menyimpan data state untuk memverifikasi blok. Klien stateless tetap perlu memastikan bahwa data tersedia _di suatu tempat_ dan telah diproses dengan benar.

## Solusi ketersediaan data {#data-availability-solutions}

### Pengambilan sampel ketersediaan data (DAS) {#data-availability-sampling}

Pengambilan Sampel Ketersediaan Data (DAS) adalah cara bagi jaringan untuk memeriksa bahwa data tersedia tanpa memberikan beban terlalu besar pada simpul individu. Setiap simpul (termasuk simpul non-staking) mengunduh sebagian kecil, acak dari total data. Pengunduhan sampel yang berhasil mengonfirmasi dengan keyakinan tinggi bahwa semua data tersedia. Ini bergantung pada pengodean penghapusan data, yang memperluas kumpulan data yang diberikan dengan informasi redundan (caranya adalah dengan mencocokkan suatu fungsi yang dikenal sebagai _polinomial_ dengan data dan mengevaluasi polinomial tersebut pada titik-titik tambahan). Ini memungkinkan data asli dipulihkan dari data redundan bila perlu. Konsekuensi dari pembuatan data ini adalah jika _salah satu pun_ dari data asli tidak tersedia, _setengah_ dari data yang diperluas akan hilang! Jumlah sampel data yang diunduh oleh setiap simpul dapat disesuaikan sehingga _sangat_ mungkin bahwa setidaknya satu dari fragmen data yang diambil sampelnya oleh setiap klien akan hilang _jika_ kurang dari setengah data benar-benar tersedia.

DAS akan digunakan untuk memastikan operator rollup menyediakan data transaksi mereka setelah [Full Danksharding](/roadmap/danksharding/#what-is-danksharding) diimplementasikan. Simpul Ethereum akan mengambil sampel acak data transaksi yang disediakan dalam blob menggunakan skema redundansi yang dijelaskan di atas untuk memastikan bahwa semua data ada. Teknik yang sama juga dapat digunakan untuk memastikan produsen blok membuat semua data mereka tersedia untuk mengamankan klien ringan. Demikian pula, di bawah [pemisahan proposer-builder](/roadmap/pbs), hanya pembuat blok yang akan diharuskan untuk memproses seluruh blok - validator lain akan memverifikasi menggunakan pengambilan sampel ketersediaan data.

### Komite ketersediaan data {#data-availability-committees}

Panitia Ketersediaan Data (DAC) adalah pihak-pihak terpercaya yang menyediakan, atau membuktikan, ketersediaan data. DAC dapat digunakan sebagai pengganti, [atau dalam kombinasi dengan](https://hackmd.io/@vbuterin/sharding_proposal#Why-not-use-just-committees-and-not-DAS) DAS. Jaminan keamanan yang datang dengan panitia tergantung pada "set" spesifik. Ethereum menggunakan subset validator yang dipilih secara acak untuk membuktikan tentang ketersediaan data untuk simpul ringan, misalnya.

DAC juga digunakan oleh beberapa validium. DAC adalah sekumpulan simpul terpercaya yang menyimpan salinan data secara offline. DAC diharuskan membuat data tersedia dalam hal terjadi aksi sengketa. Anggota DAC juga menerbitkan attestations on-chain untuk membuktikan bahwa data tersebut memang tersedia. Beberapa validium mengganti DAC dengan sistem validator proof-of-stake (PoS). Di sini, siapa pun dapat menjadi validator dan menyimpan data secara off-chain. Namun, mereka harus memberikan “ikatan”, yang disetorkan ke kontrak pintar. Dalam hal perilaku jahat, seperti validator menahan data, ikatan dapat dipotong. Panitia ketersediaan data proof-of-stake jauh lebih aman daripada DAC biasa karena mereka secara langsung memberi insentif perilaku jujur.

## Ketersediaan data dan simpul ringan {#data-availability-and-light-nodes}

[Simpul ringan](/developers/docs/nodes-and-clients/light-clients) perlu memvalidasi kebenaran header blok yang mereka terima tanpa mengunduh data blok. Biaya dari ke-ringanan ini adalah ketidakmampuan untuk memverifikasi header blok secara mandiri dengan mengeksekusi ulang transaksi secara lokal seperti yang dilakukan simpul penuh.

Simpul ringan Ethereum mempercayai set acak dari 512 validator yang telah ditugaskan ke _komite sinkronisasi_. Panitia sinkronisasi bertindak sebagai DAC yang memberi sinyal kepada klien ringan bahwa data di header benar menggunakan tanda tangan kriptografis. Setiap hari, panitia sinkronisasi menyegarkan. Setiap header blok memberi tahu simpul ringan validator mana yang diharapkan untuk menandatangani blok _berikutnya_, sehingga mereka tidak dapat ditipu untuk mempercayai kelompok jahat yang berpura-pura menjadi komite sinkronisasi yang sebenarnya.

Namun, apa yang terjadi jika seorang penyerang entah bagaimana _berhasil_ meneruskan header blok jahat ke klien ringan dan meyakinkan mereka bahwa itu ditandatangani oleh komite sinkronisasi yang jujur? Dalam hal itu, penyerang dapat menyertakan transaksi yang tidak valid dan klien ringan akan menerimanya secara membabi buta, karena mereka tidak memeriksa secara mandiri semua perubahan status yang diringkas dalam header blok. Untuk melindungi dari hal ini, klien ringan dapat menggunakan bukti penipuan.

Cara kerja bukti penipuan ini adalah bahwa simpul penuh, melihat transisi keadaan yang tidak valid yang digosipkan di sekitar jaringan, dapat dengan cepat menghasilkan sepotong kecil data yang menunjukkan bahwa transisi keadaan yang diusulkan tidak mungkin timbul dari serangkaian transaksi yang diberikan dan menyiarkan data itu ke rekan-rekan. Simpul ringan dapat mengambil bukti-bukti penipuan itu dan menggunakannya untuk membuang header blok yang buruk, memastikan mereka tetap di rantai jujur yang sama dengan simpul penuh.

Ini bergantung pada simpul penuh memiliki akses ke data transaksi penuh. Penyerang yang menyiarkan header blok buruk dan juga gagal membuat data transaksi tersedia akan dapat mencegah simpul penuh dari menghasilkan bukti penipuan. Simpul penuh mungkin dapat memberikan peringatan tentang blok buruk, tetapi mereka tidak dapat mendukung peringatan mereka dengan bukti, karena data tidak tersedia untuk menghasilkan bukti dari!

Solusi untuk masalah ketersediaan data ini adalah DAS. Simpul ringan mengunduh potongan acak yang sangat kecil dari data dengan keadaan penuh dan menggunakan sampel-sampel tersebut untuk memverifikasi bahwa kumpulan data itu secara penuh tersedia. Kemungkinan aktual dari kesalahan asumsi ketersediaan data penuh setelah mengunduh N potongan acak dapat dihitung ([untuk 100 potongan, peluangnya adalah 10^-30](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html), yaitu, sangat tidak mungkin).

Bahkan dalam skenario ini, serangan yang menahan hanya beberapa bita dapat terlewatkan oleh klien yang membuat permintaan data acak. Erasure coding memperbaiki ini dengan merekonstruksi potongan-potongan data kecil yang hilang yang dapat digunakan untuk memeriksa perubahan keadaan yang diusulkan. Bukti penipuan kemudian dapat dibangun menggunakan data yang direkonstruksi, mencegah simpul ringan menerima header buruk.

**Catatan:** DAS dan bukti penipuan belum diimplementasikan untuk klien ringan Ethereum berbasis bukti taruhan, tetapi mereka ada di peta jalan, kemungkinan besar berupa bukti berbasis ZK-SNARK. Klien ringan saat ini mengandalkan bentuk DAC: mereka memverifikasi identitas sync-committee dan kemudian mempercayai header blok yang ditandatangani yang mereka terima.

## Ketersediaan data dan rollup Lapisan 2 {#data-availability-and-layer-2-rollups}

[Solusi penskalaan Lapisan 2](/layer-2/), seperti [rollup](/glossary/#rollups), mengurangi biaya transaksi dan meningkatkan kapasitas Ethereum dengan memproses transaksi secara offchain. Transaksi rollup dikompresi dan diposting di Ethereum dalam batch. Batch mewakili ribuan transaksi off-chain individual dalam satu transaksi di Ethereum. Ini mengurangi kemacetan di lapisan dasar dan mengurangi biaya untuk pengguna.

Namun, kepercayaan terhadap transaksi "ringkasan" yang diposting ke Ethereum hanya mungkin jika perubahan status yang diajukan dapat diverifikasi secara mandiri dan dikonfirmasi sebagai hasil dari penerapan semua transaksi off-chain individual. Jika operator rollup tidak membuat data transaksi tersedia untuk verifikasi ini, maka mereka dapat mengirim data yang salah ke Ethereum.

[Optimistic rollup](/developers/docs/scaling/optimistic-rollups/) memposting data transaksi yang terkompresi ke Ethereum dan menunggu selama beberapa waktu (biasanya 7 hari) untuk memungkinkan verifikator independen memeriksa data tersebut. Jika ada yang mengidentifikasi masalah, mereka dapat menghasilkan bukti penipuan dan menggunakannya untuk menantang rollup. Ini akan menyebabkan rantai mundur dan menghilangkan blok yang tidak valid. Ini hanya mungkin jika data tersedia. Saat ini, ada dua cara rollup optimistik memposting data transaksi ke L1. Beberapa rollup membuat data tersedia secara permanen sebagai `CALLDATA` yang tersimpan permanen secara onchain. Dengan implementasi EIP-4844, beberapa rollup memposting data transaksi mereka ke penyimpanan blob yang lebih murah sebagai gantinya. Ini bukan penyimpanan permanen. Verifier independen harus mengambil data dari blob dan mengajukan tantangan mereka dalam waktu sekitar ~18 hari sebelum data dihapus dari layer-1 Ethereum. Ketersediaan data hanya dijamin oleh protokol Ethereum untuk jendela tetap pendek itu. Setelah itu, menjadi tanggung jawab entitas lain dalam ekosistem Ethereum. Setiap simpul dapat memverifikasi ketersediaan data menggunakan DAS, yaitu dengan mengunduh sampel acak kecil dari data blob.

[Rollup zero-knowledge (ZK)](/developers/docs/scaling/zk-rollups) tidak perlu memposting data transaksi karena [bukti validitas zero-knowledge](/glossary/#zk-proof) menjamin kebenaran transisi keadaan. Namun, ketersediaan data masih menjadi masalah karena kita tidak dapat menjamin fungsionalitas ZK-rollup (atau berinteraksi dengan itu) tanpa akses ke data keadaannya. Misalnya, pengguna tidak dapat mengetahui saldo mereka jika operator menahan detail tentang keadaan rollup. Juga, mereka tidak dapat melakukan pembaruan keadaan menggunakan informasi yang terkandung dalam blok baru yang ditambahkan.

## Ketersediaan data vs. keterambilan data {#data-availability-vs-data-retrievability}

Ketersediaan data berbeda dari pengambilan kembali data. Ketersediaan data adalah jaminan bahwa simpul penuh telah dapat mengakses dan memverifikasi kumpulan transaksi penuh yang terkait dengan blok tertentu. Ini tidak selalu berarti bahwa data dapat diakses selamanya.

Keterambilan data adalah kemampuan simpul untuk mengambil _informasi historis_ dari rantai blok. Data historis ini tidak diperlukan untuk memverifikasi blok baru, data ini hanya diperlukan untuk menyinkronkan simpul penuh dari blok genesis atau melayani permintaan historis tertentu.

Protokol Ethereum inti terutama berkaitan dengan ketersediaan data, bukan pengambilan kembali data. Keterambilan data dapat disediakan oleh sejumlah kecil simpul arsip yang dijalankan oleh pihak ketiga, atau dapat didistribusikan ke seluruh jaringan menggunakan penyimpanan file terdesentralisasi seperti [Portal Network](https://www.ethportal.net/).

## Bacaan lebih lanjut {#further-reading}

- [WTF is Data Availability?](https://medium.com/blockchain-capital-blog/wtf-is-data-availability-80c2c95ded0f)
- [What Is Data Availability?](https://coinmarketcap.com/academy/article/what-is-data-availability)
- [A primer on data availability checks](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html)
- [An explanation of the sharding + DAS proposal](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [A note on data availability and erasure coding](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding#can-an-attacker-not-circumvent-this-scheme-by-releasing-a-full-unavailable-block-but-then-only-releasing-individual-bits-of-data-as-clients-query-for-them)
- [Data availability committees.](https://medium.com/starkware/data-availability-e5564c416424)
- [Proof-of-stake data availability committees.](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Solutions to the data retrievability problem](https://notes.ethereum.org/@vbuterin/data_sharding_roadmap#Who-would-store-historical-data-under-sharding)
- [Data Availability Or: How Rollups Learned To Stop Worrying And Love Ethereum](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [EIP-7623: Increasing Calldata Cost](https://web.archive.org/web/20250515194659/https://research.2077.xyz/eip-7623-increase-calldata-cost)
