---
title: Validium
description: Pengantar Validium sebagai solusi penskalaan yang saat ini digunakan oleh komunitas Ethereum.
lang: id
sidebarDepth: 3
---

Validium adalah [solusi penskalaan](/developers/docs/scaling/) yang menegakkan integritas transaksi menggunakan bukti validitas seperti [ZK-rollup](/developers/docs/scaling/zk-rollups/), tetapi tidak menyimpan data transaksi di Mainnet [Ethereum](/). Meskipun ketersediaan data offchain memperkenalkan kompromi, hal ini dapat mengarah pada peningkatan skalabilitas yang masif (validium dapat memproses [~9.000 transaksi, atau lebih, per detik](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)).

## Prasyarat {#prerequisites}

Anda harus sudah membaca dan memahami halaman kami tentang [penskalaan Ethereum](/developers/docs/scaling/) dan [lapisan 2 (l2)](/layer-2).

## Apa itu validium? {#what-is-validium}

Validium adalah solusi penskalaan yang menggunakan ketersediaan data dan komputasi offchain yang dirancang untuk meningkatkan laju pemrosesan dengan memproses transaksi di luar Mainnet Ethereum. Seperti zero-knowledge rollup (ZK-rollup), validium menerbitkan [bukti tanpa pengetahuan](/glossary/#zk-proof) untuk memverifikasi transaksi offchain di Ethereum. Ini mencegah transisi state yang tidak valid dan meningkatkan jaminan keamanan dari rantai validium.

"Bukti validitas" ini dapat berupa ZK-SNARKs (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) atau ZK-STARKs (Zero-Knowledge Scalable Transparent ARgument of Knowledge). Selengkapnya tentang [bukti tanpa pengetahuan](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/).

Dana milik pengguna validium dikendalikan oleh kontrak pintar di Ethereum. Validium menawarkan penarikan yang hampir instan, sama seperti ZK-rollup; setelah bukti validitas untuk permintaan penarikan telah diverifikasi di Mainnet, pengguna dapat menarik dana dengan memberikan [bukti Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/). Bukti Merkle memvalidasi penyertaan transaksi penarikan pengguna dalam kumpulan transaksi yang diverifikasi, memungkinkan kontrak onchain untuk memproses penarikan tersebut.

Namun, pengguna validium dapat mengalami pembekuan dana dan pembatasan penarikan. Hal ini dapat terjadi jika manajer ketersediaan data di rantai validium menahan data state offchain dari pengguna. Tanpa akses ke data transaksi, pengguna tidak dapat menghitung bukti Merkle yang diwajibkan untuk membuktikan kepemilikan dana dan mengeksekusi penarikan.

Ini adalah perbedaan utama antara validium dan ZK-rollup—posisi mereka pada spektrum ketersediaan data. Kedua solusi tersebut melakukan pendekatan penyimpanan data secara berbeda, yang memiliki implikasi terhadap keamanan dan sifat tanpa kepercayaan.

## Bagaimana validium berinteraksi dengan Ethereum? {#how-do-validiums-interact-with-ethereum}

Validium adalah protokol penskalaan yang dibangun di atas rantai Ethereum yang ada. Meskipun mengeksekusi transaksi secara offchain, rantai validium dikelola oleh kumpulan kontrak pintar yang diterapkan di Mainnet termasuk:

1. **Kontrak pemverifikasi**: Kontrak pemverifikasi memverifikasi validitas bukti yang dikirimkan oleh operator validium saat melakukan pembaruan state. Ini termasuk bukti validitas yang membuktikan kebenaran transaksi offchain dan bukti ketersediaan data yang memverifikasi keberadaan data transaksi offchain.

2. **Kontrak utama**: Kontrak utama menyimpan komitmen state (akar Merkle) yang dikirimkan oleh produsen blok dan memperbarui state validium setelah bukti validitas diverifikasi secara onchain. Kontrak ini juga memproses setoran ke dan penarikan dari rantai validium.

Validium juga bergantung pada rantai utama Ethereum untuk hal-hal berikut:

### Penyelesaian {#settlement}

Transaksi yang dieksekusi di validium tidak dapat dikonfirmasi sepenuhnya hingga rantai induk memverifikasi validitasnya. Semua urusan yang dilakukan di validium pada akhirnya harus diselesaikan di Mainnet. Rantai blok Ethereum juga memberikan "jaminan penyelesaian" bagi pengguna validium, yang berarti transaksi offchain tidak dapat dibatalkan atau diubah setelah dikomitmenkan secara onchain.

### Keamanan {#security}

Ethereum, yang bertindak sebagai lapisan penyelesaian, juga menjamin validitas transisi state di validium. Transaksi offchain yang dieksekusi di rantai validium diverifikasi melalui kontrak pintar di lapisan dasar Ethereum.

Jika kontrak pemverifikasi onchain menganggap bukti tersebut tidak valid, transaksi akan ditolak. Ini berarti operator harus memenuhi kondisi validitas yang ditegakkan oleh protokol Ethereum sebelum memperbarui state validium.

## Bagaimana cara kerja validium? {#how-does-validium-work}

### Transaksi {#transactions}

Pengguna mengirimkan transaksi ke operator, sebuah node yang bertanggung jawab untuk mengeksekusi transaksi di rantai validium. Beberapa validium mungkin menggunakan operator tunggal untuk mengeksekusi rantai atau bergantung pada mekanisme [Bukti Kepemilikan (PoS)](/developers/docs/consensus-mechanisms/pos/) untuk merotasi operator.

Operator mengagregasi transaksi ke dalam sebuah kumpulan dan mengirimkannya ke sirkuit pembuktian untuk dibuktikan. Sirkuit pembuktian menerima kumpulan transaksi (dan data relevan lainnya) sebagai input dan menghasilkan bukti validitas yang memverifikasi bahwa operasi telah dilakukan dengan benar.

### Komitmen state {#state-commitments}

State validium di-hash sebagai pohon Merkle dengan akar yang disimpan dalam kontrak utama di Ethereum. Akar Merkle, juga dikenal sebagai akar state, bertindak sebagai komitmen kriptografi terhadap state akun dan saldo saat ini di validium.

Untuk melakukan pembaruan state, operator harus menghitung akar state baru (setelah mengeksekusi transaksi) dan mengirimkannya ke kontrak onchain. Jika bukti validitasnya benar, state yang diusulkan akan diterima dan validium beralih ke akar state yang baru.

### Setoran dan penarikan {#deposits-and-withdrawals}

Pengguna memindahkan dana dari Ethereum ke validium dengan menyetorkan ETH (atau token apa pun yang kompatibel dengan ERC) di kontrak onchain. Kontrak meneruskan peristiwa setoran ke validium secara offchain, di mana alamat pengguna dikreditkan dengan jumlah yang sama dengan setoran mereka. Operator juga menyertakan transaksi setoran ini dalam kumpulan baru.

Untuk memindahkan dana kembali ke Mainnet, pengguna validium memulai transaksi penarikan dan mengirimkannya ke operator yang memvalidasi permintaan penarikan dan menyertakannya dalam sebuah kumpulan. Aset pengguna di rantai validium juga dihancurkan sebelum mereka dapat keluar dari sistem. Setelah bukti validitas yang terkait dengan kumpulan tersebut diverifikasi, pengguna dapat memanggil kontrak utama untuk menarik sisa setoran awal mereka.

Sebagai mekanisme anti-penyensoran, protokol validium memungkinkan pengguna untuk menarik langsung dari kontrak validium tanpa melalui operator. Dalam hal ini, pengguna perlu memberikan bukti Merkle ke kontrak pemverifikasi yang menunjukkan penyertaan akun dalam akar state. Jika bukti diterima, pengguna dapat memanggil fungsi penarikan kontrak utama untuk mengeluarkan dana mereka dari validium.

### Pengiriman kumpulan {#batch-submission}

Setelah mengeksekusi kumpulan transaksi, operator mengirimkan bukti validitas terkait ke kontrak pemverifikasi dan mengusulkan akar state baru ke kontrak utama. Jika bukti tersebut valid, kontrak utama memperbarui state validium dan memfinalisasi hasil transaksi dalam kumpulan tersebut.

Tidak seperti ZK-rollup, produsen blok di validium tidak diwajibkan untuk menerbitkan data transaksi untuk kumpulan transaksi (hanya header blok). Hal ini menjadikan validium sebagai protokol penskalaan murni offchain, berbeda dengan protokol penskalaan "hibrida" (yaitu, [lapisan 2 (l2)](/layer-2/)) yang menerbitkan data state di rantai utama Ethereum menggunakan data blob, `calldata`, atau kombinasi keduanya.

### Ketersediaan data {#data-availability}

Seperti yang disebutkan, validium memanfaatkan model ketersediaan data offchain, di mana operator menyimpan semua data transaksi di luar Mainnet Ethereum. Jejak data onchain validium yang rendah meningkatkan skalabilitas (laju pemrosesan tidak dibatasi oleh kapasitas pemrosesan data Ethereum) dan mengurangi biaya pengguna (biaya penerbitan data secara onchain lebih rendah).

Namun, ketersediaan data offchain menghadirkan masalah: data yang diperlukan untuk membuat atau memverifikasi bukti Merkle mungkin tidak tersedia. Ini berarti pengguna mungkin tidak dapat menarik dana dari kontrak onchain jika operator bertindak jahat.

Berbagai solusi validium mencoba memecahkan masalah ini dengan mendesentralisasi penyimpanan data state. Ini melibatkan pemaksaan produsen blok untuk mengirimkan data yang mendasarinya ke "manajer ketersediaan data" yang bertanggung jawab untuk menyimpan data offchain dan menyediakannya bagi pengguna berdasarkan permintaan.

Manajer ketersediaan data di validium membuktikan ketersediaan data untuk transaksi offchain dengan menandatangani setiap kumpulan validium. Tanda tangan ini merupakan bentuk "bukti ketersediaan" yang diperiksa oleh kontrak pemverifikasi onchain sebelum menyetujui pembaruan state.

Validium berbeda dalam pendekatannya terhadap manajemen ketersediaan data. Beberapa bergantung pada pihak tepercaya untuk menyimpan data state, sementara yang lain menggunakan validator yang ditugaskan secara acak untuk tugas tersebut.

#### DAC {#data-availability-committee}

Untuk menjamin ketersediaan data offchain, beberapa solusi validium menunjuk sekelompok entitas tepercaya, yang secara kolektif dikenal sebagai DAC, untuk menyimpan salinan state dan memberikan bukti ketersediaan data. DAC lebih mudah diimplementasikan dan membutuhkan lebih sedikit koordinasi karena keanggotaannya sedikit.

Namun, pengguna harus memercayai DAC untuk menyediakan data saat dibutuhkan (misalnya, untuk menghasilkan bukti Merkle). Ada kemungkinan anggota DAC [disusupi oleh aktor jahat](https://notes.ethereum.org/DD7GyItYQ02d0ax_X-UbWg?view) yang kemudian dapat menahan data offchain.

[Selengkapnya tentang DAC di validium](https://medium.com/starkware/data-availability-e5564c416424).

#### Ketersediaan data berobligasi {#bonded-data-availability}

Validium lain mewajibkan peserta yang bertugas menyimpan data offline untuk melakukan stake (yaitu, mengunci) token dalam kontrak pintar sebelum mengambil peran mereka. Stake ini berfungsi sebagai “obligasi” untuk menjamin perilaku jujur di antara manajer ketersediaan data dan mengurangi asumsi kepercayaan. Jika peserta ini gagal membuktikan ketersediaan data, obligasi tersebut akan mengalami pemotongan.

Dalam skema ketersediaan data berobligasi, siapa pun dapat ditugaskan untuk menyimpan data offchain setelah mereka memberikan stake yang diwajibkan. Ini memperluas kumpulan manajer ketersediaan data yang memenuhi syarat, mengurangi sentralisasi yang memengaruhi DAC. Lebih penting lagi, pendekatan ini bergantung pada insentif kriptoekonomi untuk mencegah aktivitas jahat, yang jauh lebih aman daripada menunjuk pihak tepercaya untuk mengamankan data offline di validium.

[Selengkapnya tentang ketersediaan data berobligasi di validium](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf).

## Volition dan validium {#volitions-and-validium}

Validium menawarkan banyak manfaat tetapi datang dengan kompromi (terutama, ketersediaan data). Namun, seperti banyak solusi penskalaan lainnya, validium cocok untuk kasus penggunaan tertentu—itulah sebabnya volition diciptakan.

Volition menggabungkan ZK-rollup dan rantai validium serta memungkinkan pengguna untuk beralih di antara kedua solusi penskalaan tersebut. Dengan volition, pengguna dapat memanfaatkan ketersediaan data offchain validium untuk transaksi tertentu, sambil mempertahankan kebebasan untuk beralih ke solusi ketersediaan data onchain (ZK-rollup) jika diperlukan. Ini pada dasarnya memberi pengguna kebebasan untuk memilih kompromi seperti yang didiktekan oleh keadaan unik mereka.

Bursa terdesentralisasi (DEX) mungkin lebih suka menggunakan infrastruktur validium yang dapat diskalakan dan privat untuk perdagangan bernilai tinggi. Bursa tersebut juga dapat menggunakan ZK-rollup untuk pengguna yang menginginkan jaminan keamanan yang lebih tinggi dan sifat tanpa kepercayaan dari ZK-rollup.

## Validium dan kompatibilitas EVM {#validiums-and-evm-compatibility}

Seperti ZK-rollup, validium sebagian besar cocok untuk aplikasi sederhana, seperti pertukaran token dan pembayaran. Mendukung komputasi umum dan eksekusi kontrak pintar di antara validium sulit untuk diimplementasikan, mengingat overhead yang cukup besar untuk membuktikan instruksi [EVM](/developers/docs/evm/) dalam sirkuit bukti tanpa pengetahuan.

Beberapa proyek validium mencoba menghindari masalah ini dengan melakukan kompilasi bahasa yang kompatibel dengan EVM (misalnya, Solidity, Vyper) untuk membuat kode bita kustom yang dioptimalkan untuk pembuktian yang efisien. Kelemahan dari pendekatan ini adalah bahwa VM baru yang ramah bukti tanpa pengetahuan mungkin tidak mendukung opcode EVM yang penting, dan pengembang harus menulis langsung dalam bahasa tingkat tinggi untuk pengalaman yang optimal. Ini menciptakan lebih banyak masalah: hal ini memaksa pengembang untuk membangun aplikasi terdesentralisasi (dapp) dengan tumpukan pengembangan yang sama sekali baru dan merusak kompatibilitas dengan infrastruktur Ethereum saat ini.

Namun, beberapa tim sedang mencoba untuk mengoptimalkan opcode EVM yang ada untuk sirkuit pembuktian ZK. Ini akan menghasilkan pengembangan zero-knowledge Ethereum Virtual Machine (zkEVM), sebuah VM yang kompatibel dengan EVM yang menghasilkan bukti untuk memverifikasi kebenaran eksekusi program. Dengan zkEVM, rantai validium dapat mengeksekusi kontrak pintar secara offchain dan mengirimkan bukti validitas untuk memverifikasi komputasi offchain (tanpa harus mengeksekusinya kembali) di Ethereum.

[Selengkapnya tentang zkEVM](https://www.alchemy.com/overviews/zkevm).

## Bagaimana validium menskalakan Ethereum? {#scaling-ethereum-with-validiums}

### 1. Penyimpanan data offchain {#offchain-data-storage}

Proyek penskalaan lapisan 2 (l2), seperti optimistic rollup dan ZK-rollup, menukar skalabilitas tak terbatas dari protokol penskalaan murni offchain (misalnya, [Plasma](/developers/docs/scaling/plasma/)) dengan keamanan dengan menerbitkan beberapa data transaksi di lapisan 1 (l1). Namun ini berarti properti skalabilitas rollup dibatasi oleh bandwidth data di Mainnet Ethereum ([sharding data](/roadmap/danksharding/) mengusulkan untuk meningkatkan kapasitas penyimpanan data Ethereum karena alasan ini).

Validium mencapai skalabilitas dengan menyimpan semua data transaksi secara offchain dan hanya memposting komitmen state (dan bukti validitas) saat meneruskan pembaruan state ke rantai utama Ethereum. Namun, keberadaan bukti validitas memberi validium jaminan keamanan yang lebih tinggi daripada solusi penskalaan murni offchain lainnya, termasuk Plasma dan [sidechain](/developers/docs/scaling/sidechains/). Dengan mengurangi jumlah data yang harus diproses Ethereum sebelum memvalidasi transaksi offchain, desain validium sangat memperluas laju pemrosesan di Mainnet.

### 2. Bukti rekursif {#recursive-proofs}

Bukti rekursif adalah bukti validitas yang memverifikasi validitas bukti lainnya. "Bukti dari bukti" ini dihasilkan dengan mengagregasi beberapa bukti secara rekursif hingga satu bukti akhir yang memverifikasi semua bukti sebelumnya dibuat. Bukti rekursif menskalakan kecepatan pemrosesan rantai blok dengan meningkatkan jumlah transaksi yang dapat diverifikasi per bukti validitas.

Biasanya, setiap bukti validitas yang dikirimkan operator validium ke Ethereum untuk verifikasi memvalidasi integritas satu blok. Sedangkan satu bukti rekursif dapat digunakan untuk mengonfirmasi validitas beberapa blok validium pada saat yang sama—ini dimungkinkan karena sirkuit pembuktian dapat mengagregasi beberapa bukti blok secara rekursif menjadi satu bukti akhir. Jika kontrak pemverifikasi onchain menerima bukti rekursif, semua blok yang mendasarinya akan segera difinalisasi.

## Kelebihan dan kekurangan validium {#pros-and-cons-of-validium}

| Kelebihan                                                                                                                     | Kekurangan                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bukti validitas menegakkan integritas transaksi offchain dan mencegah operator memfinalisasi pembaruan state yang tidak valid. | Menghasilkan bukti validitas membutuhkan perangkat keras khusus, yang menimbulkan risiko sentralisasi.                                                              |
| Meningkatkan efisiensi modal bagi pengguna (tidak ada penundaan dalam menarik dana kembali ke Ethereum)                                 | Dukungan terbatas untuk komputasi umum/kontrak pintar; bahasa khusus diwajibkan untuk pengembangan.                                             |
| Tidak rentan terhadap serangan ekonomi tertentu yang dihadapi oleh sistem berbasis bukti penipuan dalam aplikasi bernilai tinggi.                | Daya komputasi tinggi diwajibkan untuk menghasilkan bukti ZK; tidak hemat biaya untuk aplikasi dengan laju pemrosesan rendah.                                         |
| Mengurangi biaya gas bagi pengguna dengan tidak memposting data panggilan ke Mainnet Ethereum.                                                  | Waktu finalitas subjektif lebih lambat (10-30 menit untuk menghasilkan bukti ZK) tetapi lebih cepat menuju finalitas penuh karena tidak ada penundaan waktu sengketa.               |
| Cocok untuk kasus penggunaan tertentu, seperti perdagangan atau permainan rantai blok yang memprioritaskan privasi dan skalabilitas transaksi.  | Pengguna dapat dicegah untuk menarik dana karena menghasilkan bukti Merkle kepemilikan mewajibkan data offchain tersedia setiap saat.      |
| Ketersediaan data offchain memberikan tingkat laju pemrosesan yang lebih tinggi dan meningkatkan skalabilitas.                              | Model keamanan bergantung pada asumsi kepercayaan dan insentif kriptoekonomi, tidak seperti ZK-rollup, yang murni bergantung pada mekanisme keamanan kriptografi. |

### Gunakan Validium/Volition {#use-validium-and-volitions}

Beberapa proyek menyediakan implementasi Validium dan volition yang dapat Anda integrasikan ke dalam dapp Anda:

**StarkWare StarkEx** - _StarkEx adalah solusi skalabilitas Lapisan 2 (L2) Ethereum yang didasarkan pada bukti validitas. Solusi ini dapat beroperasi dalam mode ketersediaan data ZK-Rollup atau Validium._

- [Dokumentasi](https://docs.starkware.co/starkex-v4/starkex-deep-dive/data-availability-modes#validium)
- [Situs web](https://starkware.co/starkex/)

**Matter Labs zkPorter**- _zkPorter adalah protokol penskalaan Lapisan 2 yang menangani ketersediaan data dengan pendekatan hibrida yang menggabungkan ide zkRollup dan sharding. Protokol ini dapat mendukung banyak shard secara sewenang-wenang, masing-masing dengan kebijakan ketersediaan datanya sendiri._

- [Blog](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Dokumentasi](https://docs.zksync.io/zksync-protocol/rollup/data-availability)
- [Situs web](https://zksync.io/)

## Bacaan lebih lanjut {#further-reading}

- [Validium Dan Lapisan 2 Dua-Kali-Dua — Edisi No. 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- [ZK-rollup vs Validium](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)
- [Volition dan Spektrum Ketersediaan Data yang Muncul](https://medium.com/starkware/volition-and-the-emerging-data-availability-spectrum-87e8bfa09bb)
- [Panduan Praktis untuk Rollup Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)