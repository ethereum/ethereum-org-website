---
title: Validium
description: Pengantar Validium sebagai solusi peningkatan yang saat ini digunakan oleh komunitas Ethereum.
lang: id
sidebarDepth: 3
---

Validium adalah [solusi peningkatan](/developers/docs/scaling/) yang menegakkan integritas transaksi menggunakan bukti validitas seperti [ZK-rollup](/developers/docs/scaling/zk-rollups/), tetapi tidak menyimpan data transaksi di Mainnet [Ethereum](/). Meskipun ketersediaan data offchain memperkenalkan pertukaran (trade-off), hal ini dapat mengarah pada peningkatan skalabilitas yang masif (validium dapat memproses [\~9.000 transaksi, atau lebih, per detik](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)).

## Prasyarat {#prerequisites}

Anda harus sudah membaca dan memahami halaman kami tentang [peningkatan Ethereum](/developers/docs/scaling/) dan [layer 2](/layer-2).

## Apa itu validium? {#what-is-validium}

Validium adalah solusi peningkatan yang menggunakan ketersediaan data dan komputasi offchain yang dirancang untuk meningkatkan throughput dengan memproses transaksi di luar Mainnet Ethereum. Seperti zero-knowledge rollup (ZK-rollup), validium menerbitkan [bukti zero-knowledge](/glossary/#zk-proof) untuk memverifikasi transaksi offchain di Ethereum. Ini mencegah transisi status yang tidak valid dan meningkatkan jaminan keamanan dari rantai validium.

"Bukti validitas" ini dapat berupa ZK-SNARK (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) atau ZK-STARK (Zero-Knowledge Scalable Transparent ARgument of Knowledge). Lebih lanjut tentang [bukti zero-knowledge](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/).

Dana milik pengguna validium dikendalikan oleh kontrak pintar di Ethereum. Validium menawarkan penarikan yang hampir instan, sama seperti yang dilakukan ZK-rollup; setelah bukti validitas untuk permintaan penarikan telah diverifikasi di Mainnet, pengguna dapat menarik dana dengan memberikan [bukti Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/). Bukti Merkle memvalidasi penyertaan transaksi penarikan pengguna dalam kumpulan transaksi yang diverifikasi, memungkinkan kontrak onchain untuk memproses penarikan tersebut.

Namun, pengguna validium dapat mengalami pembekuan dana dan pembatasan penarikan. Hal ini dapat terjadi jika manajer ketersediaan data di rantai validium menahan data status offchain dari pengguna. Tanpa akses ke data transaksi, pengguna tidak dapat menghitung bukti Merkle yang diperlukan untuk membuktikan kepemilikan dana dan mengeksekusi penarikan.

Ini adalah perbedaan utama antara validium dan ZK-rollup—posisi mereka pada spektrum ketersediaan data. Kedua solusi tersebut melakukan pendekatan penyimpanan data secara berbeda, yang memiliki implikasi terhadap keamanan dan ketiadaan kepercayaan (trustlessness).

## Bagaimana validium berinteraksi dengan Ethereum? {#how-do-validiums-interact-with-ethereum}

Validium adalah protokol peningkatan yang dibangun di atas rantai Ethereum yang ada. Meskipun mengeksekusi transaksi secara offchain, rantai validium dikelola oleh kumpulan kontrak pintar yang diterapkan di Mainnet termasuk:

1. **Kontrak pemverifikasi**: Kontrak pemverifikasi memverifikasi validitas bukti yang dikirimkan oleh operator validium saat melakukan pembaruan status. Ini termasuk bukti validitas yang membuktikan kebenaran transaksi offchain dan bukti ketersediaan data yang memverifikasi keberadaan data transaksi offchain.

2. **Kontrak utama**: Kontrak utama menyimpan komitmen status (akar Merkle) yang dikirimkan oleh produsen blok dan memperbarui status validium setelah bukti validitas diverifikasi secara onchain. Kontrak ini juga memproses deposit ke dan penarikan dari rantai validium.

Validium juga bergantung pada rantai utama Ethereum untuk hal-hal berikut:

### Penyelesaian {#settlement}

Transaksi yang dieksekusi di validium tidak dapat dikonfirmasi sepenuhnya sampai rantai induk memverifikasi validitasnya. Semua bisnis yang dilakukan di validium pada akhirnya harus diselesaikan di Mainnet. Blockchain Ethereum juga memberikan "jaminan penyelesaian" untuk pengguna validium, yang berarti transaksi offchain tidak dapat dibatalkan atau diubah setelah dikomit ke onchain.

### Keamanan {#security}

Ethereum, yang bertindak sebagai lapisan penyelesaian, juga menjamin validitas transisi status di validium. Transaksi offchain yang dieksekusi di rantai validium diverifikasi melalui kontrak pintar di lapisan dasar Ethereum.

Jika kontrak pemverifikasi onchain menganggap bukti tersebut tidak valid, transaksi akan ditolak. Ini berarti operator harus memenuhi kondisi validitas yang ditegakkan oleh protokol Ethereum sebelum memperbarui status validium.

## Bagaimana cara kerja validium? {#how-does-validium-work}

### Transaksi {#transactions}

Pengguna mengirimkan transaksi ke operator, sebuah node yang bertanggung jawab untuk mengeksekusi transaksi di rantai validium. Beberapa validium mungkin menggunakan operator tunggal untuk mengeksekusi rantai atau bergantung pada mekanisme [proof-of-stake (PoS)](/developers/docs/consensus-mechanisms/pos/) untuk merotasi operator.

Operator menggabungkan transaksi ke dalam sebuah kumpulan (batch) dan mengirimkannya ke sirkuit pembuktian untuk dibuktikan. Sirkuit pembuktian menerima kumpulan transaksi (dan data relevan lainnya) sebagai input dan menghasilkan bukti validitas yang memverifikasi bahwa operasi dilakukan dengan benar.

### Komitmen status {#state-commitments}

Status validium di-hash sebagai pohon Merkle dengan akar yang disimpan dalam kontrak utama di Ethereum. Akar Merkle, juga dikenal sebagai akar status, bertindak sebagai komitmen kriptografi terhadap status akun dan saldo saat ini di validium.

Untuk melakukan pembaruan status, operator harus menghitung akar status baru (setelah mengeksekusi transaksi) dan mengirimkannya ke kontrak onchain. Jika bukti validitas berhasil diperiksa, status yang diusulkan diterima dan validium beralih ke akar status yang baru.

### Deposit dan penarikan {#deposits-and-withdrawals}

Pengguna memindahkan dana dari Ethereum ke validium dengan mendepositkan ETH (atau token apa pun yang kompatibel dengan ERC) di kontrak onchain. Kontrak meneruskan peristiwa deposit ke validium secara offchain, di mana alamat pengguna dikreditkan dengan jumlah yang sama dengan deposit mereka. Operator juga menyertakan transaksi deposit ini dalam kumpulan baru.

Untuk memindahkan dana kembali ke Mainnet, pengguna validium memulai transaksi penarikan dan mengirimkannya ke operator yang memvalidasi permintaan penarikan dan menyertakannya dalam sebuah kumpulan. Aset pengguna di rantai validium juga dihancurkan sebelum mereka dapat keluar dari sistem. Setelah bukti validitas yang terkait dengan kumpulan tersebut diverifikasi, pengguna dapat memanggil kontrak utama untuk menarik sisa deposit awal mereka.

Sebagai mekanisme anti-penyensoran, protokol validium memungkinkan pengguna untuk menarik langsung dari kontrak validium tanpa melalui operator. Dalam hal ini, pengguna perlu memberikan bukti Merkle ke kontrak pemverifikasi yang menunjukkan penyertaan akun dalam akar status. Jika bukti diterima, pengguna dapat memanggil fungsi penarikan kontrak utama untuk mengeluarkan dana mereka dari validium.

### Pengiriman kumpulan {#batch-submission}

Setelah mengeksekusi sekumpulan transaksi, operator mengirimkan bukti validitas terkait ke kontrak pemverifikasi dan mengusulkan akar status baru ke kontrak utama. Jika bukti tersebut valid, kontrak utama memperbarui status validium dan memfinalisasi hasil transaksi dalam kumpulan tersebut.

Tidak seperti ZK-rollup, produsen blok di validium tidak diharuskan untuk menerbitkan data transaksi untuk kumpulan transaksi (hanya header blok). Hal ini menjadikan validium sebagai protokol peningkatan murni offchain, berbeda dengan protokol peningkatan "hibrida" (yaitu, [layer 2](/layer-2/)) yang menerbitkan data status di rantai utama Ethereum menggunakan data blob, `calldata`, atau kombinasi keduanya.

### Ketersediaan data {#data-availability}

Seperti yang disebutkan, validium memanfaatkan model ketersediaan data offchain, di mana operator menyimpan semua data transaksi di luar Mainnet Ethereum. Jejak data onchain validium yang rendah meningkatkan skalabilitas (throughput tidak dibatasi oleh kapasitas pemrosesan data Ethereum) dan mengurangi biaya pengguna (biaya penerbitan data onchain lebih rendah).

Namun, ketersediaan data offchain menghadirkan masalah: data yang diperlukan untuk membuat atau memverifikasi bukti Merkle mungkin tidak tersedia. Ini berarti pengguna mungkin tidak dapat menarik dana dari kontrak onchain jika operator bertindak jahat.

Berbagai solusi validium mencoba memecahkan masalah ini dengan mendesentralisasi penyimpanan data status. Ini melibatkan pemaksaan produsen blok untuk mengirim data yang mendasarinya ke "manajer ketersediaan data" yang bertanggung jawab untuk menyimpan data offchain dan menyediakannya bagi pengguna berdasarkan permintaan.

Manajer ketersediaan data di validium membuktikan ketersediaan data untuk transaksi offchain dengan menandatangani setiap kumpulan validium. Tanda tangan ini merupakan bentuk "bukti ketersediaan" yang diperiksa oleh kontrak pemverifikasi onchain sebelum menyetujui pembaruan status.

Validium berbeda dalam pendekatannya terhadap manajemen ketersediaan data. Beberapa bergantung pada pihak tepercaya untuk menyimpan data status, sementara yang lain menggunakan validator yang ditugaskan secara acak untuk tugas tersebut.

#### Komite ketersediaan data (DAC) {#data-availability-committee}

Untuk menjamin ketersediaan data offchain, beberapa solusi validium menunjuk sekelompok entitas tepercaya, yang secara kolektif dikenal sebagai komite ketersediaan data (DAC), untuk menyimpan salinan status dan memberikan bukti ketersediaan data. DAC lebih mudah diimplementasikan dan membutuhkan lebih sedikit koordinasi karena keanggotaannya sedikit.

Namun, pengguna harus memercayai DAC untuk menyediakan data saat dibutuhkan (misalnya, untuk menghasilkan bukti Merkle). Ada kemungkinan anggota komite ketersediaan data [disusupi oleh aktor jahat](https://notes.ethereum.org/DD7GyItYQ02d0ax_X-UbWg?view) yang kemudian dapat menahan data offchain.

[Lebih lanjut tentang komite ketersediaan data di validium](https://medium.com/starkware/data-availability-e5564c416424).

#### Ketersediaan data terikat {#bonded-data-availability}

Validium lain mengharuskan peserta yang bertugas menyimpan data offline untuk melakukan stake (yaitu, mengunci) token dalam kontrak pintar sebelum mengambil peran mereka. Stake ini berfungsi sebagai "ikatan" (bond) untuk menjamin perilaku jujur di antara manajer ketersediaan data dan mengurangi asumsi kepercayaan. Jika peserta ini gagal membuktikan ketersediaan data, ikatan tersebut akan dipotong.

Dalam skema ketersediaan data terikat (bonded), siapa pun dapat ditugaskan untuk menyimpan data offchain setelah mereka memberikan stake yang diperlukan. Ini memperluas kumpulan manajer ketersediaan data yang memenuhi syarat, mengurangi sentralisasi yang memengaruhi komite ketersediaan data (DAC). Lebih penting lagi, pendekatan ini bergantung pada insentif kriptoekonomi untuk mencegah aktivitas jahat, yang jauh lebih aman daripada menunjuk pihak tepercaya untuk mengamankan data offline di validium.

[Lebih lanjut tentang ketersediaan data terikat di validium](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf).

## Volition dan validium {#volitions-and-validium}

Validium menawarkan banyak manfaat tetapi datang dengan pertukaran (terutama, ketersediaan data). Namun, seperti banyak solusi peningkatan lainnya, validium cocok untuk kasus penggunaan tertentu—itulah sebabnya volition diciptakan.

Volition menggabungkan ZK-rollup dan rantai validium serta memungkinkan pengguna untuk beralih di antara kedua solusi peningkatan tersebut. Dengan volition, pengguna dapat memanfaatkan ketersediaan data offchain validium untuk transaksi tertentu, sambil mempertahankan kebebasan untuk beralih ke solusi ketersediaan data onchain (ZK-rollup) jika diperlukan. Ini pada dasarnya memberi pengguna kebebasan untuk memilih pertukaran seperti yang didiktekan oleh keadaan unik mereka.

Sebuah pertukaran terdesentralisasi (DEX) mungkin lebih suka menggunakan infrastruktur validium yang dapat diskalakan dan privat untuk perdagangan bernilai tinggi. Ia juga dapat menggunakan ZK-rollup untuk pengguna yang menginginkan jaminan keamanan yang lebih tinggi dan ketiadaan kepercayaan dari ZK-rollup.

## Validium dan kompatibilitas EVM {#validiums-and-evm-compatibility}

Seperti ZK-rollup, validium sebagian besar cocok untuk aplikasi sederhana, seperti pertukaran token dan pembayaran. Mendukung komputasi umum dan eksekusi kontrak pintar di antara validium sulit untuk diimplementasikan, mengingat overhead yang cukup besar dalam membuktikan instruksi [EVM](/developers/docs/evm/) dalam sirkuit bukti zero-knowledge.

Beberapa proyek validium mencoba menghindari masalah ini dengan mengompilasi bahasa yang kompatibel dengan EVM (misalnya, Solidity, Vyper) untuk membuat bytecode kustom yang dioptimalkan untuk pembuktian yang efisien. Kelemahan dari pendekatan ini adalah bahwa VM baru yang ramah bukti zero-knowledge mungkin tidak mendukung opcode EVM yang penting, dan pengembang harus menulis langsung dalam bahasa tingkat tinggi untuk pengalaman yang optimal. Ini menciptakan lebih banyak masalah: hal ini memaksa pengembang untuk membangun dapps dengan tumpukan pengembangan yang sama sekali baru dan merusak kompatibilitas dengan infrastruktur Ethereum saat ini.

Namun, beberapa tim sedang mencoba untuk mengoptimalkan opcode EVM yang ada untuk sirkuit pembuktian ZK. Ini akan menghasilkan pengembangan Mesin Virtual Ethereum zero-knowledge (zkEVM), sebuah VM yang kompatibel dengan EVM yang menghasilkan bukti untuk memverifikasi kebenaran eksekusi program. Dengan zkEVM, rantai validium dapat mengeksekusi kontrak pintar secara offchain dan mengirimkan bukti validitas untuk memverifikasi komputasi offchain (tanpa harus mengeksekusinya kembali) di Ethereum.

[Lebih lanjut tentang zkEVM](https://www.alchemy.com/overviews/zkevm).

## Bagaimana validium meningkatkan Ethereum? {#scaling-ethereum-with-validiums}

### 1. Penyimpanan data offchain {#offchain-data-storage}

Proyek peningkatan layer 2, seperti optimistic rollup dan ZK-rollup, menukar skalabilitas tak terbatas dari protokol peningkatan murni offchain (misalnya, [Plasma](/developers/docs/scaling/plasma/)) dengan keamanan dengan menerbitkan beberapa data transaksi di L1. Namun ini berarti properti skalabilitas rollup dibatasi oleh bandwidth data di Mainnet Ethereum ([sharding data](/roadmap/danksharding/) mengusulkan untuk meningkatkan kapasitas penyimpanan data Ethereum karena alasan ini).

Validium mencapai skalabilitas dengan menyimpan semua data transaksi secara offchain dan hanya memposting komitmen status (dan bukti validitas) saat meneruskan pembaruan status ke rantai utama Ethereum. Namun, keberadaan bukti validitas memberi validium jaminan keamanan yang lebih tinggi daripada solusi peningkatan murni offchain lainnya, termasuk Plasma dan [sidechain](/developers/docs/scaling/sidechains/). Dengan mengurangi jumlah data yang harus diproses Ethereum sebelum memvalidasi transaksi offchain, desain validium sangat memperluas throughput di Mainnet.

### 2. Bukti rekursif {#recursive-proofs}

Bukti rekursif adalah bukti validitas yang memverifikasi validitas bukti lainnya. "Bukti dari bukti" ini dihasilkan dengan menggabungkan beberapa bukti secara rekursif hingga satu bukti akhir yang memverifikasi semua bukti sebelumnya dibuat. Bukti rekursif meningkatkan kecepatan pemrosesan blockchain dengan meningkatkan jumlah transaksi yang dapat diverifikasi per bukti validitas.

Biasanya, setiap bukti validitas yang dikirimkan operator validium ke Ethereum untuk verifikasi memvalidasi integritas satu blok. Sedangkan satu bukti rekursif dapat digunakan untuk mengonfirmasi validitas beberapa blok validium pada saat yang sama—ini dimungkinkan karena sirkuit pembuktian dapat menggabungkan beberapa bukti blok secara rekursif menjadi satu bukti akhir. Jika kontrak pemverifikasi onchain menerima bukti rekursif, semua blok yang mendasarinya akan segera difinalisasi.

## Kelebihan dan kekurangan validium {#pros-and-cons-of-validium}

| Kelebihan | Kekurangan |
| --- | --- |
| Bukti validitas menegakkan integritas transaksi offchain dan mencegah operator memfinalisasi pembaruan status yang tidak valid. | Menghasilkan bukti validitas membutuhkan perangkat keras khusus, yang menimbulkan risiko sentralisasi. |
| Meningkatkan efisiensi modal bagi pengguna (tidak ada penundaan dalam menarik dana kembali ke Ethereum). | Dukungan terbatas untuk komputasi umum/kontrak pintar; bahasa khusus diperlukan untuk pengembangan. |
| Tidak rentan terhadap serangan ekonomi tertentu yang dihadapi oleh sistem berbasis anti-penipuan dalam aplikasi bernilai tinggi. | Daya komputasi tinggi diperlukan untuk menghasilkan bukti ZK; tidak hemat biaya untuk aplikasi dengan throughput rendah. |
| Mengurangi biaya gas bagi pengguna dengan tidak memposting calldata ke Mainnet Ethereum. | Waktu finalitas subjektif lebih lambat (10-30 menit untuk menghasilkan bukti ZK) tetapi lebih cepat menuju finalitas penuh karena tidak ada penundaan waktu sengketa. |
| Cocok untuk kasus penggunaan tertentu, seperti perdagangan atau permainan blockchain yang memprioritaskan privasi transaksi dan skalabilitas. | Pengguna dapat dicegah untuk menarik dana karena menghasilkan bukti kepemilikan Merkle mengharuskan data offchain tersedia setiap saat. |
| Ketersediaan data offchain memberikan tingkat throughput yang lebih tinggi dan meningkatkan skalabilitas. | Model keamanan bergantung pada asumsi kepercayaan dan insentif kriptoekonomi, tidak seperti ZK-rollup, yang murni bergantung pada mekanisme keamanan kriptografi. |

### Gunakan Validium/Volition {#use-validium-and-volitions}

Beberapa proyek menyediakan implementasi Validium dan volition yang dapat Anda integrasikan ke dalam dapps Anda:

**StarkWare StarkEx** - _StarkEx adalah solusi skalabilitas Layer 2 (L2) Ethereum yang didasarkan pada bukti validitas. Ia dapat beroperasi dalam mode ketersediaan data ZK-Rollup atau Validium._

- [Dokumentasi](https://docs.starkware.co/starkex-v4/starkex-deep-dive/data-availability-modes#validium)
- [Situs Web](https://starkware.co/starkex/)

**Matter Labs zkPorter**- _zkPorter adalah protokol peningkatan Layer 2 yang menangani ketersediaan data dengan pendekatan hibrida yang menggabungkan ide-ide zkRollup dan sharding. Ia dapat mendukung banyak shard secara sewenang-wenang, masing-masing dengan kebijakan ketersediaan datanya sendiri._

- [Blog](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Dokumentasi](https://docs.zksync.io/zksync-protocol/rollup/data-availability)
- [Situs Web](https://zksync.io/)

## Bacaan lebih lanjut {#further-reading}

- [Validium And The Layer 2 Two-By-Two — Issue No. 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- [ZK-rollups vs Validium](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)
- [Volition and the Emerging Data Availability spectrum](https://medium.com/starkware/volition-and-the-emerging-data-availability-spectrum-87e8bfa09bb)
- [The Practical Guide to Ethereum Rollups](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)