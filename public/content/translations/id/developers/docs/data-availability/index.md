---
title: Ketersediaan data
description: Tinjauan tentang masalah dan solusi yang berkaitan dengan ketersediaan data di Ethereum
lang: id
---

"Jangan percaya, verifikasi" adalah pepatah umum di Ethereum. Idenya adalah bahwa node Anda dapat memverifikasi secara independen bahwa informasi yang diterimanya benar dengan mengeksekusi semua transaksi di dalam blok yang mereka terima dari rekan (peer) untuk memastikan bahwa perubahan yang diusulkan sama persis dengan yang dihitung secara independen oleh node. Ini berarti node tidak perlu percaya bahwa pengirim blok tersebut jujur. Hal ini tidak mungkin dilakukan jika ada data yang hilang.

**Ketersediaan data** mengacu pada keyakinan yang dapat dimiliki pengguna bahwa data yang diperlukan untuk memverifikasi sebuah blok benar-benar tersedia untuk semua peserta jaringan. Untuk node penuh di layer 1 [Ethereum](/) ini relatif sederhana; node penuh mengunduh salinan semua data di setiap blok - data _harus_ tersedia agar pengunduhan dapat dilakukan. Sebuah blok dengan data yang hilang akan dibuang alih-alih ditambahkan ke blockchain. Ini adalah "ketersediaan data onchain" dan merupakan fitur dari blockchain monolitik. Node penuh tidak dapat ditipu untuk menerima transaksi yang tidak valid karena mereka mengunduh dan mengeksekusi setiap transaksi sendiri. Namun, untuk blockchain modular, rollup layer 2, dan klien ringan, lanskap ketersediaan data lebih kompleks, membutuhkan beberapa prosedur verifikasi yang lebih canggih.

## Prasyarat {#prerequisites}

Anda harus memiliki pemahaman yang baik tentang [dasar-dasar blockchain](/developers/docs/intro-to-ethereum/), terutama [mekanisme konsensus](/developers/docs/consensus-mechanisms/). Halaman ini juga mengasumsikan pembaca sudah familier dengan [blok](/developers/docs/blocks/), [transaksi](/developers/docs/transactions/), [node](/developers/docs/nodes-and-clients/), [solusi peningkatan](/developers/docs/scaling/), dan topik relevan lainnya.

## Masalah ketersediaan data {#the-data-availability-problem}

Masalah ketersediaan data adalah kebutuhan untuk membuktikan kepada seluruh jaringan bahwa bentuk ringkasan dari beberapa data transaksi yang ditambahkan ke blockchain benar-benar mewakili serangkaian transaksi yang valid, tetapi melakukannya tanpa mengharuskan semua node untuk mengunduh semua data. Data transaksi lengkap diperlukan untuk memverifikasi blok secara independen, tetapi mengharuskan semua node untuk mengunduh semua data transaksi merupakan hambatan untuk peningkatan (scaling). Solusi untuk masalah ketersediaan data bertujuan untuk memberikan jaminan yang cukup bahwa data transaksi lengkap telah tersedia untuk verifikasi bagi peserta jaringan yang tidak mengunduh dan menyimpan data tersebut sendiri.

[Node ringan](/developers/docs/nodes-and-clients/light-clients) dan [rollup layer 2](/developers/docs/scaling) adalah contoh penting dari peserta jaringan yang membutuhkan jaminan ketersediaan data yang kuat tetapi tidak dapat mengunduh dan memproses data transaksi sendiri. Menghindari pengunduhan data transaksi adalah hal yang membuat node ringan menjadi ringan dan memungkinkan rollup menjadi solusi peningkatan yang efektif.

Ketersediaan data juga merupakan perhatian penting untuk klien Ethereum ["tanpa status" (stateless)](/roadmap/statelessness) di masa depan yang tidak perlu mengunduh dan menyimpan data status untuk memverifikasi blok. Klien tanpa status masih perlu memastikan bahwa data tersebut tersedia _di suatu tempat_ dan telah diproses dengan benar.

## Solusi ketersediaan data {#data-availability-solutions}

### Pengambilan sampel ketersediaan data (DAS) {#data-availability-sampling}

Pengambilan Sampel Ketersediaan Data (Data Availability Sampling/DAS) adalah cara bagi jaringan untuk memeriksa bahwa data tersedia tanpa memberikan terlalu banyak beban pada node individu mana pun. Setiap node (termasuk node non-staking) mengunduh sebagian kecil subset yang dipilih secara acak dari total data. Berhasil mengunduh sampel mengonfirmasi dengan keyakinan tinggi bahwa semua data tersedia. Hal ini bergantung pada pengkodean penghapusan data (data erasure coding), yang memperluas kumpulan data tertentu dengan informasi yang redundan (cara ini dilakukan adalah dengan menyesuaikan fungsi yang dikenal sebagai _polinomial_ pada data dan mengevaluasi polinomial tersebut pada titik-titik tambahan). Ini memungkinkan data asli dipulihkan dari data redundan bila diperlukan. Konsekuensi dari pembuatan data ini adalah jika _ada_ data asli yang tidak tersedia, _setengah_ dari data yang diperluas akan hilang! Jumlah sampel data yang diunduh oleh setiap node dapat disesuaikan sehingga _sangat_ mungkin bahwa setidaknya satu dari fragmen data yang diambil sampelnya oleh setiap klien akan hilang _jika_ kurang dari setengah data yang benar-benar tersedia.

DAS akan digunakan untuk memastikan operator rollup menyediakan data transaksi mereka setelah [Danksharding Penuh](/roadmap/danksharding/#what-is-danksharding) diimplementasikan. Node Ethereum akan mengambil sampel data transaksi secara acak yang disediakan dalam blob menggunakan skema redundansi yang dijelaskan di atas untuk memastikan bahwa semua data ada. Teknik yang sama juga dapat digunakan untuk memastikan produsen blok menyediakan semua data mereka untuk mengamankan klien ringan. Demikian pula, di bawah [pemisahan pengusul-pembangun (proposer-builder separation)](/roadmap/pbs), hanya pembangun blok yang diharuskan memproses seluruh blok - validator lain akan memverifikasi menggunakan pengambilan sampel ketersediaan data.

### Komite ketersediaan data {#data-availability-committees}

Komite Ketersediaan Data (Data Availability Committees/DAC) adalah pihak tepercaya yang menyediakan, atau membuktikan, ketersediaan data. DAC dapat digunakan sebagai pengganti, [atau dikombinasikan dengan](https://hackmd.io/@vbuterin/sharding_proposal#Why-not-use-just-committees-and-not-DAS) DAS. Jaminan keamanan yang menyertai komite bergantung pada pengaturan spesifiknya. Ethereum menggunakan subset validator yang diambil sampelnya secara acak untuk membuktikan ketersediaan data bagi node ringan, misalnya.

DAC juga digunakan oleh beberapa validium. DAC adalah sekumpulan node tepercaya yang menyimpan salinan data secara offline. DAC diharuskan untuk menyediakan data jika terjadi perselisihan. Anggota DAC juga menerbitkan pengesahan onchain untuk membuktikan bahwa data tersebut memang tersedia. Beberapa validium mengganti DAC dengan sistem validator proof-of-stake (PoS). Di sini, siapa pun dapat menjadi validator dan menyimpan data secara offchain. Namun, mereka harus memberikan "jaminan", yang disetorkan ke dalam kontrak pintar. Jika terjadi perilaku jahat, seperti validator menahan data, jaminan tersebut dapat dipotong. Komite ketersediaan data proof-of-stake jauh lebih aman daripada DAC biasa karena mereka secara langsung memberikan insentif untuk perilaku jujur.

## Ketersediaan data dan node ringan {#data-availability-and-light-nodes}

[Node ringan](/developers/docs/nodes-and-clients/light-clients) perlu memvalidasi kebenaran header blok yang mereka terima tanpa mengunduh data blok. Konsekuensi dari keringanan ini adalah ketidakmampuan untuk memverifikasi header blok secara independen dengan mengeksekusi ulang transaksi secara lokal seperti yang dilakukan node penuh.

Node ringan Ethereum memercayai kumpulan acak dari 512 validator yang telah ditugaskan ke _komite sinkronisasi (sync committee)_. Komite sinkronisasi bertindak sebagai DAC yang memberi sinyal kepada klien ringan bahwa data di header sudah benar menggunakan tanda tangan kriptografi. Setiap hari, komite sinkronisasi diperbarui. Setiap header blok memberi tahu node ringan tentang validator mana yang diharapkan untuk menandatangani blok _berikutnya_, sehingga mereka tidak dapat ditipu untuk memercayai kelompok jahat yang berpura-pura menjadi komite sinkronisasi yang asli.

Namun, apa yang terjadi jika penyerang entah bagaimana _berhasil_ meneruskan header blok berbahaya ke klien ringan dan meyakinkan mereka bahwa itu ditandatangani oleh komite sinkronisasi yang jujur? Dalam hal ini, penyerang dapat menyertakan transaksi yang tidak valid dan klien ringan akan menerimanya secara membabi buta, karena mereka tidak memeriksa secara independen semua perubahan status yang diringkas dalam header blok. Untuk melindungi dari hal ini, klien ringan dapat menggunakan anti-penipuan.

Cara kerja anti-penipuan ini adalah bahwa node penuh, yang melihat transisi status tidak valid sedang digosipkan di sekitar jaringan, dapat dengan cepat menghasilkan sepotong kecil data yang menunjukkan bahwa transisi status yang diusulkan tidak mungkin muncul dari serangkaian transaksi tertentu dan menyiarkan data tersebut ke rekan-rekan (peers). Node ringan dapat mengambil anti-penipuan tersebut dan menggunakannya untuk membuang header blok yang buruk, memastikan mereka tetap berada di rantai jujur yang sama dengan node penuh.

Hal ini bergantung pada node penuh yang memiliki akses ke data transaksi lengkap. Penyerang yang menyiarkan header blok yang buruk dan juga gagal menyediakan data transaksi akan dapat mencegah node penuh menghasilkan anti-penipuan. Node penuh mungkin dapat memberi sinyal peringatan tentang blok yang buruk, tetapi mereka tidak dapat mendukung peringatan mereka dengan bukti, karena data tidak tersedia untuk menghasilkan bukti tersebut!

Solusi untuk masalah ketersediaan data ini adalah DAS. Node ringan mengunduh potongan acak yang sangat kecil dari data status lengkap dan menggunakan sampel tersebut untuk memverifikasi bahwa kumpulan data lengkap tersedia. Kemungkinan aktual dari asumsi yang salah tentang ketersediaan data lengkap setelah mengunduh N potongan acak dapat dihitung ([untuk 100 potongan, peluangnya adalah 10^-30](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html), yaitu, sangat tidak mungkin).

Bahkan dalam skenario ini, serangan yang menahan hanya beberapa byte dapat dengan mudah tidak disadari oleh klien yang membuat permintaan data acak. Pengkodean penghapusan (erasure coding) memperbaiki hal ini dengan merekonstruksi potongan kecil data yang hilang yang dapat digunakan untuk memeriksa perubahan status yang diusulkan. Sebuah anti-penipuan kemudian dapat dibangun menggunakan data yang direkonstruksi, mencegah node ringan menerima header yang buruk.

**Catatan:** DAS dan anti-penipuan belum diimplementasikan untuk klien ringan Ethereum proof-of-stake, tetapi mereka ada di peta jalan, kemungkinan besar mengambil bentuk bukti berbasis ZK-SNARK. Klien ringan saat ini bergantung pada bentuk DAC: mereka memverifikasi identitas komite sinkronisasi dan kemudian memercayai header blok yang ditandatangani yang mereka terima.

## Ketersediaan data dan rollup layer 2 {#data-availability-and-layer-2-rollups}

[Solusi peningkatan layer 2](/layer-2/), seperti [rollup](/glossary/#rollups), mengurangi biaya transaksi dan meningkatkan throughput Ethereum dengan memproses transaksi secara offchain. Transaksi rollup dikompresi dan diposting di Ethereum dalam batch. Batch mewakili ribuan transaksi offchain individu dalam satu transaksi di Ethereum. Ini mengurangi kemacetan di lapisan dasar dan mengurangi biaya untuk pengguna.

Namun, transaksi 'ringkasan' yang diposting ke Ethereum hanya dapat dipercaya jika perubahan status yang diusulkan dapat diverifikasi secara independen dan dikonfirmasi sebagai hasil dari penerapan semua transaksi offchain individu. Jika operator rollup tidak menyediakan data transaksi untuk verifikasi ini, maka mereka dapat mengirimkan data yang salah ke Ethereum.

[Optimistic rollup](/developers/docs/scaling/optimistic-rollups/) memposting data transaksi terkompresi ke Ethereum dan menunggu beberapa waktu (biasanya 7 hari) untuk memungkinkan pemverifikasi independen memeriksa data tersebut. Jika ada yang mengidentifikasi masalah, mereka dapat menghasilkan anti-penipuan dan menggunakannya untuk menantang rollup. Ini akan menyebabkan rantai bergulir kembali (roll back) dan menghilangkan blok yang tidak valid. Hal ini hanya mungkin terjadi jika data tersedia. Saat ini, ada dua cara optimistic rollup memposting data transaksi ke L1. Beberapa rollup membuat data tersedia secara permanen sebagai `CALLDATA` yang hidup secara permanen secara onchain. Dengan implementasi EIP-4844, beberapa rollup memposting data transaksi mereka ke penyimpanan blob yang lebih murah sebagai gantinya. Ini bukan penyimpanan permanen. Pemverifikasi independen harus menanyakan blob dan mengajukan tantangan mereka dalam waktu ~18 hari sebelum data dihapus dari layer-1 Ethereum. Ketersediaan data hanya dijamin oleh protokol Ethereum untuk jendela waktu tetap yang singkat tersebut. Setelah itu, hal tersebut menjadi tanggung jawab entitas lain dalam ekosistem Ethereum. Node mana pun dapat memverifikasi ketersediaan data menggunakan DAS, yaitu, dengan mengunduh sampel kecil dan acak dari data blob.

[Zero-knowledge rollup (ZK)](/developers/docs/scaling/zk-rollups) tidak perlu memposting data transaksi karena [bukti validitas zero-knowledge](/glossary/#zk-proof) menjamin kebenaran transisi status. Namun, ketersediaan data masih menjadi masalah karena kita tidak dapat menjamin fungsionalitas ZK-rollup (atau berinteraksi dengannya) tanpa akses ke data statusnya. Misalnya, pengguna tidak dapat mengetahui saldo mereka jika operator menahan detail tentang status rollup. Selain itu, mereka tidak dapat melakukan pembaruan status menggunakan informasi yang terkandung dalam blok yang baru ditambahkan.

## Ketersediaan data vs. keterambilan data {#data-availability-vs-data-retrievability}

Ketersediaan data berbeda dengan keterambilan data (data retrievability). Ketersediaan data adalah jaminan bahwa node penuh telah dapat mengakses dan memverifikasi serangkaian transaksi lengkap yang terkait dengan blok tertentu. Hal ini tidak serta merta berarti bahwa data tersebut dapat diakses selamanya.

Keterambilan data adalah kemampuan node untuk mengambil _informasi historis_ dari blockchain. Data historis ini tidak diperlukan untuk memverifikasi blok baru, ini hanya diperlukan untuk menyinkronkan node penuh dari blok genesis atau melayani permintaan historis tertentu.

Protokol inti Ethereum terutama berkaitan dengan ketersediaan data, bukan keterambilan data. Keterambilan data dapat disediakan oleh populasi kecil node arsip yang dijalankan oleh pihak ketiga, atau dapat didistribusikan ke seluruh jaringan menggunakan penyimpanan file terdesentralisasi seperti [Portal Network](https://www.ethportal.net/).

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