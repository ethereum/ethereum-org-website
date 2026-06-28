---
title: Ketersediaan data
description: Gambaran umum tentang masalah dan solusi yang berkaitan dengan ketersediaan data di Ethereum
lang: id
---

"Jangan percaya, verifikasi" adalah pepatah umum di Ethereum. Idenya adalah bahwa node Anda dapat memverifikasi secara independen bahwa informasi yang diterimanya benar dengan mengeksekusi semua transaksi di dalam blok yang mereka terima dari rekan (peer) untuk memastikan bahwa perubahan yang diusulkan sama persis dengan yang dihitung secara independen oleh node. Ini berarti node tidak perlu memercayai bahwa pengirim blok tersebut jujur. Hal ini tidak mungkin dilakukan jika ada data yang hilang.

**Ketersediaan data** mengacu pada keyakinan yang dapat dimiliki pengguna bahwa data yang diperlukan untuk memverifikasi sebuah blok benar-benar tersedia bagi semua peserta jaringan. Untuk full node di lapisan 1 (l1) [Ethereum](/), ini relatif sederhana; full node mengunduh salinan semua data di setiap blok - data tersebut _harus_ tersedia agar pengunduhan dapat dilakukan. Sebuah blok dengan data yang hilang akan dibuang alih-alih ditambahkan ke rantai blok. Ini adalah "ketersediaan data onchain" dan merupakan fitur dari rantai blok monolitik. Full node tidak dapat ditipu untuk menerima transaksi yang tidak valid karena mereka mengunduh dan mengeksekusi setiap transaksi sendiri. Namun, untuk rantai blok modular, rollup lapisan 2 (l2), dan klien ringan, lanskap ketersediaan data lebih kompleks, sehingga memerlukan beberapa prosedur verifikasi yang lebih canggih.

## Prasyarat {#prerequisites}

Anda harus memiliki pemahaman yang baik tentang [dasar-dasar rantai blok](/developers/docs/intro-to-ethereum/), terutama [mekanisme konsensus](/developers/docs/consensus-mechanisms/). Halaman ini juga mengasumsikan pembaca sudah familier dengan [blok](/developers/docs/blocks/), [transaksi](/developers/docs/transactions/), [node](/developers/docs/nodes-and-clients/), [solusi penskalaan](/developers/docs/scaling/), dan topik relevan lainnya.

## Masalah ketersediaan data {#the-data-availability-problem}

Masalah ketersediaan data adalah kebutuhan untuk membuktikan kepada seluruh jaringan bahwa bentuk ringkasan dari beberapa data transaksi yang ditambahkan ke rantai blok benar-benar mewakili sekumpulan transaksi yang valid, tetapi melakukannya tanpa mewajibkan semua node untuk mengunduh semua data. Data transaksi lengkap diperlukan untuk memverifikasi blok secara independen, tetapi mewajibkan semua node untuk mengunduh semua data transaksi merupakan hambatan untuk penskalaan. Solusi untuk masalah ketersediaan data bertujuan untuk memberikan jaminan yang memadai bahwa data transaksi lengkap telah tersedia untuk verifikasi bagi peserta jaringan yang tidak mengunduh dan menyimpan data tersebut sendiri.

[Node ringan](/developers/docs/nodes-and-clients/light-clients) dan [rollup lapisan 2 (l2)](/developers/docs/scaling) adalah contoh penting dari peserta jaringan yang memerlukan jaminan ketersediaan data yang kuat tetapi tidak dapat mengunduh dan memproses data transaksi sendiri. Menghindari pengunduhan data transaksi adalah hal yang membuat node ringan menjadi ringan dan memungkinkan rollup menjadi solusi penskalaan yang efektif.

Ketersediaan data juga merupakan perhatian penting bagi klien Ethereum ["stateless" (tanpa state)](/roadmap/statelessness) di masa depan yang tidak perlu mengunduh dan menyimpan data state untuk memverifikasi blok. Klien tanpa state masih perlu memastikan bahwa data tersebut tersedia _di suatu tempat_ dan telah diproses dengan benar.

## Solusi ketersediaan data {#data-availability-solutions}

### Pengambilan sampel ketersediaan data (DAS) {#data-availability-sampling}

Pengambilan Sampel Ketersediaan Data (DAS) adalah cara bagi jaringan untuk memeriksa bahwa data tersedia tanpa memberikan terlalu banyak beban pada node individu mana pun. Setiap node (termasuk node non-staking) mengunduh sebagian kecil subset yang dipilih secara acak dari total data. Keberhasilan mengunduh sampel mengonfirmasi dengan tingkat keyakinan tinggi bahwa semua data tersedia. Hal ini bergantung pada pengodean penghapusan data, yang memperluas kumpulan data tertentu dengan informasi yang redundan (cara ini dilakukan dengan menyesuaikan fungsi yang dikenal sebagai _polinomial_ pada data dan mengevaluasi polinomial tersebut pada titik-titik tambahan). Ini memungkinkan data asli dipulihkan dari data yang redundan bila diperlukan. Konsekuensi dari pembuatan data ini adalah jika _ada_ data asli yang tidak tersedia, _setengah_ dari data yang diperluas akan hilang! Jumlah sampel data yang diunduh oleh setiap node dapat disesuaikan sehingga _sangat_ mungkin bahwa setidaknya satu dari fragmen data yang diambil sampelnya oleh setiap klien akan hilang _jika_ kurang dari setengah data yang benar-benar tersedia.

DAS akan digunakan untuk memastikan operator rollup menyediakan data transaksi mereka setelah [danksharding Penuh](/roadmap/danksharding/#what-is-danksharding) diimplementasikan. Node Ethereum akan mengambil sampel data transaksi secara acak yang disediakan dalam blob menggunakan skema redundansi yang dijelaskan di atas untuk memastikan bahwa semua data ada. Teknik yang sama juga dapat digunakan untuk memastikan produsen blok menyediakan semua data mereka untuk mengamankan klien ringan. Demikian pula, di bawah [pemisahan pengusul-pembangun (PBS)](/roadmap/pbs), hanya pembangun blok yang diwajibkan untuk memproses seluruh blok - validator lain akan memverifikasi menggunakan pengambilan sampel ketersediaan data.

### Komite ketersediaan data {#data-availability-committees}

Komite Ketersediaan Data (DAC) adalah pihak tepercaya yang menyediakan, atau membuktikan, ketersediaan data. DAC dapat digunakan sebagai pengganti, [atau dikombinasikan dengan](https://hackmd.io/@vbuterin/sharding_proposal#Why-not-use-just-committees-and-not-DAS) DAS. Jaminan keamanan yang menyertai komite bergantung pada pengaturan spesifiknya. Ethereum menggunakan subset validator yang diambil sampelnya secara acak untuk membuktikan ketersediaan data bagi node ringan, misalnya.

DAC juga digunakan oleh beberapa validium. DAC adalah sekumpulan node tepercaya yang menyimpan salinan data secara offline. DAC diwajibkan untuk menyediakan data jika terjadi perselisihan. Anggota DAC juga memublikasikan pengesahan onchain untuk membuktikan bahwa data tersebut memang tersedia. Beberapa validium mengganti DAC dengan sistem validator Bukti Kepemilikan (PoS). Di sini, siapa pun dapat menjadi validator dan menyimpan data secara offchain. Namun, mereka harus memberikan "jaminan", yang disetorkan ke dalam kontrak pintar. Jika terjadi perilaku jahat, seperti validator menahan data, jaminan tersebut dapat dikenakan pemotongan. Komite ketersediaan data Bukti Kepemilikan jauh lebih aman daripada DAC biasa karena mereka secara langsung memberikan insentif untuk perilaku jujur.

## Ketersediaan data dan node ringan {#data-availability-and-light-nodes}

[Node ringan](/developers/docs/nodes-and-clients/light-clients) perlu memvalidasi kebenaran header blok yang mereka terima tanpa mengunduh data blok. Konsekuensi dari keringanan ini adalah ketidakmampuan untuk memverifikasi header blok secara independen dengan mengeksekusi ulang transaksi secara lokal seperti yang dilakukan full node.

Node ringan Ethereum memercayai sekumpulan acak 512 validator yang telah ditugaskan ke _komite sinkronisasi_. Komite sinkronisasi bertindak sebagai DAC yang memberi sinyal kepada klien ringan bahwa data di dalam header sudah benar menggunakan tanda tangan kriptografi. Setiap hari, komite sinkronisasi diperbarui. Setiap header blok memberi tahu node ringan tentang validator mana yang diharapkan untuk menandatangani blok _berikutnya_, sehingga mereka tidak dapat ditipu untuk memercayai kelompok jahat yang berpura-pura menjadi komite sinkronisasi yang asli.

Namun, apa yang terjadi jika penyerang entah bagaimana _berhasil_ meneruskan header blok berbahaya ke klien ringan dan meyakinkan mereka bahwa itu ditandatangani oleh komite sinkronisasi yang jujur? Dalam hal ini, penyerang dapat menyertakan transaksi yang tidak valid dan klien ringan akan menerimanya secara membabi buta, karena mereka tidak memeriksa secara independen semua perubahan state yang diringkas dalam header blok. Untuk melindungi dari hal ini, klien ringan dapat menggunakan bukti penipuan.

Cara kerja bukti penipuan ini adalah bahwa full node, yang melihat transisi state tidak valid sedang digosipkan di sekitar jaringan, dapat dengan cepat menghasilkan sepotong kecil data yang menunjukkan bahwa transisi state yang diusulkan tidak mungkin muncul dari sekumpulan transaksi tertentu dan menyiarkan data tersebut ke rekan-rekan (peers). Node ringan dapat mengambil bukti penipuan tersebut dan menggunakannya untuk membuang header blok yang buruk, memastikan mereka tetap berada di rantai jujur yang sama dengan full node.

Hal ini bergantung pada full node yang memiliki akses ke data transaksi lengkap. Penyerang yang menyiarkan header blok yang buruk dan juga gagal menyediakan data transaksi akan dapat mencegah full node menghasilkan bukti penipuan. Full node mungkin dapat memberi sinyal peringatan tentang blok yang buruk, tetapi mereka tidak dapat mendukung peringatan mereka dengan bukti, karena data tidak tersedia untuk menghasilkan bukti tersebut!

Solusi untuk masalah ketersediaan data ini adalah DAS. Node ringan mengunduh potongan acak yang sangat kecil dari data state lengkap dan menggunakan sampel tersebut untuk memverifikasi bahwa kumpulan data lengkap tersedia. Kemungkinan aktual dari asumsi yang salah tentang ketersediaan data lengkap setelah mengunduh N potongan acak dapat dihitung ([untuk 100 potongan, kemungkinannya adalah 10^-30](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html), yaitu, sangat tidak mungkin).

Bahkan dalam skenario ini, serangan yang menahan hanya beberapa bita dapat dengan mudah tidak disadari oleh klien yang membuat permintaan data acak. Pengodean penghapusan memperbaiki hal ini dengan merekonstruksi potongan kecil data yang hilang yang dapat digunakan untuk memeriksa perubahan state yang diusulkan. Bukti penipuan kemudian dapat dibangun menggunakan data yang direkonstruksi, mencegah node ringan menerima header yang buruk.

**Catatan:** DAS dan bukti penipuan belum diimplementasikan untuk klien ringan Ethereum Bukti Kepemilikan, tetapi mereka ada di peta jalan, kemungkinan besar mengambil bentuk bukti berbasis ZK-SNARK. Klien ringan saat ini mengandalkan bentuk DAC: mereka memverifikasi identitas komite sinkronisasi dan kemudian memercayai header blok yang ditandatangani yang mereka terima.

## Ketersediaan data dan rollup lapisan 2 {#data-availability-and-layer-2-rollups}

[Solusi penskalaan lapisan 2 (l2)](/layer-2/), seperti [rollup](/glossary/#rollups), mengurangi biaya transaksi dan meningkatkan laju pemrosesan Ethereum dengan memproses transaksi secara offchain. Transaksi rollup dikompresi dan diposting di Ethereum dalam bentuk batch. Batch mewakili ribuan transaksi offchain individu dalam satu transaksi di Ethereum. Hal ini mengurangi kemacetan di lapisan dasar dan mengurangi biaya bagi pengguna.

Namun, kita hanya dapat memercayai transaksi 'ringkasan' yang diposting ke Ethereum jika perubahan state yang diusulkan dapat diverifikasi secara independen dan dikonfirmasi sebagai hasil dari penerapan semua transaksi offchain individu. Jika operator rollup tidak menyediakan data transaksi untuk verifikasi ini, maka mereka dapat mengirimkan data yang salah ke Ethereum.

[Rollup optimis](/developers/docs/scaling/optimistic-rollups/) memposting data transaksi terkompresi ke Ethereum dan menunggu beberapa waktu (biasanya 7 hari) untuk memungkinkan pemverifikasi independen memeriksa data tersebut. Jika ada yang mengidentifikasi masalah, mereka dapat menghasilkan bukti penipuan dan menggunakannya untuk menantang rollup. Hal ini akan menyebabkan rantai bergulir kembali (roll back) dan menghilangkan blok yang tidak valid. Hal ini hanya mungkin terjadi jika data tersedia. Saat ini, ada dua cara rollup optimis memposting data transaksi ke L1. Beberapa rollup membuat data tersedia secara permanen sebagai `CALLDATA` yang hidup secara permanen secara onchain. Dengan implementasi EIP-4844, beberapa rollup memposting data transaksi mereka ke penyimpanan blob yang lebih murah sebagai gantinya. Ini bukan penyimpanan permanen. Pemverifikasi independen harus menanyakan blob dan mengajukan tantangan mereka dalam waktu ~18 hari sebelum data dihapus dari lapisan 1 (l1) Ethereum. Ketersediaan data hanya dijamin oleh protokol Ethereum untuk jendela waktu tetap yang singkat tersebut. Setelah itu, hal tersebut menjadi tanggung jawab entitas lain dalam ekosistem Ethereum. Node mana pun dapat memverifikasi ketersediaan data menggunakan DAS, yaitu dengan mengunduh sampel kecil dan acak dari data blob.

[Rollup zero-knowledge (ZK)](/developers/docs/scaling/zk-rollups) tidak perlu memposting data transaksi karena [bukti validitas zero-knowledge](/glossary/#zk-proof) menjamin kebenaran transisi state. Namun, ketersediaan data masih menjadi masalah karena kita tidak dapat menjamin fungsionalitas rollup ZK (atau berinteraksi dengannya) tanpa akses ke data state-nya. Misalnya, pengguna tidak dapat mengetahui saldo mereka jika operator menahan detail tentang state rollup. Selain itu, mereka tidak dapat melakukan pembaruan state menggunakan informasi yang terkandung dalam blok yang baru ditambahkan.

## Ketersediaan data vs. kemampuan pengambilan data {#data-availability-vs-data-retrievability}

Ketersediaan data berbeda dengan kemampuan pengambilan data (data retrievability). Ketersediaan data adalah jaminan bahwa full node telah dapat mengakses dan memverifikasi kumpulan transaksi lengkap yang terkait dengan blok tertentu. Hal ini tidak serta merta berarti bahwa data tersebut dapat diakses selamanya.

Kemampuan pengambilan data adalah kemampuan node untuk mengambil _informasi historis_ dari rantai blok. Data historis ini tidak diperlukan untuk memverifikasi blok baru, melainkan hanya diperlukan untuk menyinkronkan full node dari blok genesis atau melayani permintaan historis tertentu.

Protokol inti Ethereum terutama berkaitan dengan ketersediaan data, bukan kemampuan pengambilan data. Kemampuan pengambilan data dapat disediakan oleh populasi kecil node arsip yang dijalankan oleh pihak ketiga, atau dapat didistribusikan ke seluruh jaringan menggunakan penyimpanan file terdesentralisasi seperti [Portal Network](https://www.ethportal.net/).

## Bacaan lebih lanjut {#further-reading}

- [Apa itu Ketersediaan Data?](https://medium.com/blockchain-capital-blog/wtf-is-data-availability-80c2c95ded0f)
- [Apa Itu Ketersediaan Data?](https://coinmarketcap.com/academy/article/what-is-data-availability)
- [Pengantar tentang pemeriksaan ketersediaan data](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html)
- [Penjelasan tentang proposal sharding + DAS](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Catatan tentang ketersediaan data dan pengodean penghapusan](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding#can-an-attacker-not-circumvent-this-scheme-by-releasing-a-full-unavailable-block-but-then-only-releasing-individual-bits-of-data-as-clients-query-for-them)
- [Komite ketersediaan data.](https://medium.com/starkware/data-availability-e5564c416424)
- [Komite ketersediaan data Bukti Kepemilikan.](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Solusi untuk masalah kemampuan pengambilan data](https://notes.ethereum.org/@vbuterin/data_sharding_roadmap#Who-would-store-historical-data-under-sharding)
- [Ketersediaan Data Atau: Bagaimana Rollup Belajar Berhenti Khawatir Dan Mencintai Ethereum](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [EIP-7623: Meningkatkan Biaya Calldata](https://web.archive.org/web/20250515194659/https://research.2077.xyz/eip-7623-increase-calldata-cost)