---
title: Validium
description: Pengantar Validium sebagai solusi penskalaan yang saat ini digunakan oleh komunitas Ethereum.
lang: id
sidebarDepth: 3
---

Validium adalah [solusi penskalaan](/developers/docs/scaling/) yang menegakkan integritas transaksi menggunakan bukti validitas seperti [ZK-rollup](/developers/docs/scaling/zk-rollups/), tetapi tidak menyimpan data transaksi di Jaringan Utama Ethereum. Meskipun ketersediaan data di luar rantai memperkenalkan trade-off, hal ini dapat menghasilkan peningkatan skalabilitas yang masif (validium dapat memproses [~9.000 transaksi, atau lebih, per detik](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)).

## Persyaratan {#prerequisites}

Anda seharusnya sudah membaca dan memahami halaman kami tentang [penskalaan Ethereum](/developers/docs/scaling/) dan [lapisan 2](/layer-2).

## Apa itu validium? {#what-is-validium}

Validium adalah solusi skalabilitas yang menggunakan ketersediaan data dan komputasi di luar rantai yang dirancang untuk meningkatkan throughput dengan memproses transaksi di luar Ethereum Mainnet. Seperti zero-knowledge rollup (ZK-rollup), validium menerbitkan [bukti zero-knowledge](/glossary/#zk-proof) untuk memverifikasi transaksi di luar rantai di Ethereum. Hal ini mencegah transisi status yang tidak valid dan meningkatkan jaminan keamanan dari rantai validium.

Validity proof’ ini dapat berupa ZK-SNARKs (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) atau ZK-STARKs (Zero-Knowledge Scalable Transparent ARgument of Knowledge). Selengkapnya tentang [bukti zero-knowledge](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/).

Dana milik pengguna validium dikendalikan oleh kontrak pintar di Ethereum. Validium menawarkan penarikan yang nyaris instan, seperti halnya ZK-rollup; setelah bukti validitas untuk permintaan penarikan telah diverifikasi di Jaringan Utama, pengguna dapat menarik dana dengan memberikan [bukti Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/). Merkle proof memvalidasi inklusi transaksi penarikan pengguna dalam batch transaksi yang telah diverifikasi, sehingga kontrak onchain dapat memproses penarikan tersebut.

Namun, pengguna validium dapat mengalami pembekuan dana dan pembatasan penarikan. Hal ini dapat terjadi jika pengelola ketersediaan data di rantai validium menahan data status offchain dari pengguna. Tanpa akses ke data transaksi, pengguna tidak dapat menghitung Merkle proof yang diperlukan untuk membuktikan kepemilikan dana dan melakukan penarikan.

Inilah perbedaan utama antara validium dan ZK-rollup—posisi mereka pada spektrum ketersediaan data. Kedua solusi tersebut memiliki pendekatan berbeda terhadap penyimpanan data, yang berdampak pada keamanan dan sifat trustless.

## Bagaimana validium berinteraksi dengan Ethereum? {#how-do-validiums-interact-with-ethereum}

Validium adalah protokol penskalaan yang dibangun di atas rantai Ethereum yang sudah ada. Meskipun mengeksekusi transaksi di luar rantai, rantai validium dikelola oleh serangkaian kontrak pintar yang ditempatkan di Mainnet, termasuk:

1. **Kontrak pemverifikasi**: Kontrak pemverifikasi memverifikasi validitas bukti yang diajukan oleh operator validium saat melakukan pembaruan status. Ini mencakup validity proof yang menyatakan kebenaran transaksi offchain dan data availability proof yang memverifikasi keberadaan data transaksi offchain.

2. **Kontrak utama**: Kontrak utama menyimpan komitmen status (akar Merkle) yang diajukan oleh produsen blok dan memperbarui status validium setelah bukti validitas diverifikasi di dalam rantai. Kontrak ini juga memproses setoran ke dan penarikan dari rantai validium.

Validium juga bergantung pada rantai Ethereum utama untuk hal-hal berikut ini:

### Penyelesaian {#settlement}

Transaksi yang dieksekusi di validium tidak dapat dikonfirmasi sepenuhnya sampai rantai induk memverifikasi keabsahannya. Semua bisnis yang dilakukan di validium pada akhirnya harus diselesaikan di Mainnet. Blockchain Ethereum juga memberikan ‘jaminan penyelesaian' bagi pengguna validium, artinya transaksi offchain tidak dapat dibatalkan atau diubah setelah dicatat di onchain.

### Keamanan {#security}

Ethereum, yang bertindak sebagai lapisan penyelesaian, juga menjamin validitas transisi negara pada validium. Transaksi off-chain yang dieksekusi pada rantai validium diverifikasi melalui kontrak pintar pada lapisan dasar Ethereum.

Jika kontrak verifikator onchain menganggap bukti tersebut tidak valid, maka transaksi akan ditolak. Ini berarti operator harus memenuhi persyaratan validitas yang diberlakukan oleh protokol Ethereum sebelum memperbarui status validium.

## Bagaimana cara kerja validium? {#how-does-validium-work}

### Transaksi {#transactions}

Pengguna mengirimkan transaksi ke operator, sebuah node yang bertanggung jawab untuk mengeksekusi transaksi pada rantai validium. Beberapa validium dapat menggunakan satu operator untuk mengeksekusi rantai atau mengandalkan mekanisme [bukti taruhan (PoS)](/developers/docs/consensus-mechanisms/pos/) untuk merotasi operator.

Operator mengumpulkan transaksi ke dalam sebuah batch dan mengirimkannya ke sirkuit pembuktian untuk pembuktian. Sirkuit pembuktian menerima batch transaksi (dan data lain yang relevan) sebagai input dan mengeluarkan bukti validitas yang memverifikasi bahwa operasi dilakukan dengan benar.

### Komitmen status {#state-commitments}

Status validium di-hash sebagai pohon Merkle dengan root yang disimpan dalam kontrak utama di Ethereum. Akar Merkle, juga dikenal sebagai akar negara, bertindak sebagai komitmen kriptografi untuk status akun dan saldo saat ini pada validium.

Untuk melakukan pembaruan status, operator harus menghitung state root baru (setelah mengeksekusi transaksi) dan mengirimkannya ke kontrak yang ada di onchain. Jika bukti validitasnya sesuai, state yang diusulkan akan diterima dan validium akan beralih ke root state yang baru.

### Deposit dan penarikan {#deposits-and-withdrawals}

Pengguna memindahkan dana dari Ethereum ke validium dengan menyetor ETH (atau token yang kompatibel dengan ERC) dalam kontrak onchain. Kontrak tersebut merelay peristiwa setoran ke offchain validium, di mana alamat pengguna dikreditkan dengan jumlah yang sama dengan setoran mereka. Operator juga menyertakan transaksi setoran ini dalam kelompok baru.

Untuk memindahkan dana kembali ke Mainnet, pengguna validium memulai transaksi penarikan dan mengirimkannya ke operator yang memvalidasi permintaan penarikan dan memasukkannya ke dalam batch. Aset pengguna pada rantai validium juga dihancurkan sebelum mereka dapat keluar dari sistem. Setelah bukti validitas yang terkait dengan batch diverifikasi, pengguna dapat menghubungi kontrak utama untuk menarik sisa setoran awal mereka.

Sebagai mekanisme anti-sensor, protokol validium memungkinkan pengguna untuk menarik diri secara langsung dari kontrak validium tanpa melalui operator. Dalam hal ini, pengguna harus memberikan bukti Merkle kepada kontrak verifikator yang menunjukkan penyertaan akun di state root. Jika bukti tersebut diterima, pengguna dapat memanggil fungsi penarikan kontrak utama untuk mengeluarkan dana mereka dari validium.

### Pengajuan batch {#batch-submission}

Setelah mengeksekusi sekumpulan transaksi, operator mengirimkan bukti validitas yang terkait ke kontrak verifikator dan mengusulkan state root baru ke kontrak utama. Jika bukti tersebut valid, kontrak utama akan memperbarui status validium dan menyelesaikan hasil transaksi dalam batch tersebut.

Tidak seperti ZK-rollup, produsen blok di validium tidak diwajibkan untuk mempublikasikan data transaksi untuk batch transaksi (hanya header blok). Ini menjadikan validium protokol penskalaan yang murni di luar rantai, berbeda dengan protokol penskalaan "hibrida" (yaitu, [lapisan 2](/layer-2/)) yang menerbitkan data status di rantai utama Ethereum menggunakan data blob, `calldata`, atau kombinasi keduanya.

### Ketersediaan data {#data-availability}

Sebagaimana telah disebutkan, validium menggunakan model ketersediaan data offchain, di mana operator menyimpan seluruh data transaksi di luar Jaringan Utama Ethereum. Jejak data onchain yang rendah pada validium meningkatkan skalabilitas (karena throughput tidak dibatasi oleh kapasitas pemrosesan data Ethereum) serta menurunkan biaya pengguna (biaya untuk mempublikasikan data di onchain menjadi lebih rendah).

Ketersediaan data offchain menimbulkan masalah, yaitu data yang diperlukan untuk membuat atau memverifikasi bukti Merkle mungkin tidak tersedia. Hal ini berarti pengguna mungkin tidak dapat menarik dana dari kontrak onchain apabila operator bertindak secara jahat.

Berbagai solusi validium mencoba memecahkan masalah ini dengan mendesentralisasikan penyimpanan data negara. Hal ini melibatkan kewajiban bagi block producer untuk mengirimkan data dasar kepada data availability manager yang bertugas menyimpan data offchain dan menyediakannya bagi pengguna ketika diminta.

Data availability manager dalam validium memberikan pernyataan atas ketersediaan data untuk transaksi offchain dengan menandatangani setiap batch validium. Tanda tangan tersebut merupakan bentuk dari bukti ketersediaan yang akan diperiksa oleh kontrak verifikator onchain sebelum menyetujui pembaruan status.

Validium berbeda dalam pendekatan mereka terhadap manajemen ketersediaan data. Beberapa bergantung pada pihak tepercaya untuk menyimpan data negara, sementara yang lain menggunakan validator yang ditugaskan secara acak untuk tugas tersebut.

#### Panitia ketersediaan data (DAC) {#data-availability-committee}

Untuk menjamin ketersediaan data offchain, beberapa solusi validium menunjuk sekelompok entitas tepercaya yang secara kolektif dikenal sebagai data komite ketersediaan data (DAC), untuk menyimpan salinan status dan menyediakan bukti ketersediaan data. DAC lebih mudah diimplementasikan dan membutuhkan lebih sedikit koordinasi karena keanggotaannya sedikit.

Namun, pengguna harus mempercayai DAC untuk membuat data tersedia saat dibutuhkan (misalnya, untuk menghasilkan bukti Merkle). Ada kemungkinan anggota panitia ketersediaan data [disusupi oleh aktor jahat](https://notes.ethereum.org/DD7GyItYQ02d0ax_X-UbWg?view) yang kemudian dapat menahan data di luar rantai.

[Selengkapnya tentang panitia ketersediaan data di validium](https://medium.com/starkware/data-availability-e5564c416424).

#### Ketersediaan data terjamin {#bonded-data-availability}

Validium lain mengharuskan peserta yang bertanggung jawab untuk menyimpan data offline untuk mempertaruhkan (yaitu, mengunci) token dalam kontrak pintar sebelum mengambil peran mereka. Saham ini berfungsi sebagai "ikatan" untuk menjamin perilaku yang jujur di antara para manajer ketersediaan data dan mengurangi asumsi kepercayaan. Jika para peserta ini gagal membuktikan ketersediaan data, maka jaminan akan dipotong.

Dalam skema ketersediaan data terikat, siapa pun dapat ditugaskan untuk menyimpan data offchain setelah mereka memberikan jaminan yang dipersyaratkan. Hal ini memperluas kelompok manajer ketersediaan data yang memenuhi syarat, mengurangi sentralisasi yang memengaruhi komite ketersediaan data (DAC). Lebih penting lagi, pendekatan ini bergantung pada insentif ekonomi kripto untuk mencegah aktivitas jahat, yang jauh lebih aman daripada menunjuk pihak-pihak tepercaya untuk mengamankan data offline dalam validium.

[Selengkapnya tentang ketersediaan data terjamin dalam validium](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf).

## Volition dan validium {#volitions-and-validium}

Validium menawarkan banyak manfaat tetapi memiliki beberapa kekurangan (terutama ketersediaan data). Namun, seperti halnya banyak solusi penskalaan, validium cocok untuk kasus penggunaan tertentu-itulah sebabnya mengapa volition diciptakan.

Volitions menggabungkan rantai ZK-rollup dan validium dan memungkinkan pengguna untuk beralih di antara dua solusi penskalaan. Dengan volitions, pengguna dapat memanfaatkan ketersediaan data off-chain dari Validium untuk transaksi tertentu, sambil tetap memiliki kebebasan untuk beralih ke solusi ketersediaan data on-chain (ZK-rollup) jika diperlukan. Hal ini pada dasarnya memberikan kebebasan kepada pengguna untuk memilih trade-off yang ditentukan oleh keadaan unik mereka.

Pertukaran terdesentralisasi (DEX) mungkin lebih suka menggunakan infrastruktur yang dapat diskalakan dan privat dari validium untuk perdagangan bernilai tinggi. Ini juga dapat menggunakan ZK-rollup untuk pengguna yang menginginkan jaminan keamanan yang lebih tinggi dan tidak dapat dipercaya dari ZK-rollup.

## Validium dan kompatibilitas EVM {#validiums-and-evm-compatibility}

Seperti ZK-rollup, validium sebagian besar cocok untuk aplikasi sederhana, seperti pertukaran token dan pembayaran. Mendukung komputasi umum dan eksekusi kontrak pintar di antara validium sulit untuk diimplementasikan, mengingat overhead yang cukup besar untuk membuktikan instruksi [EVM](/developers/docs/evm/) dalam sirkuit bukti zero-knowledge.

Beberapa proyek validium mencoba untuk menghindari masalah ini dengan mengkompilasi bahasa yang kompatibel dengan EVM (misalnya, Solidity, Vyper) untuk membuat bytecode khusus yang dioptimalkan untuk pembuktian yang efisien. Kelemahan dari pendekatan ini adalah bahwa VM baru yang ramah terhadap zero-knowledge mungkin tidak mendukung opcode EVM yang penting, dan pengembang harus menulis secara langsung dalam bahasa tingkat tinggi untuk mendapatkan pengalaman yang optimal. Hal ini menciptakan masalah lebih lanjut: ini mendorong para pengembang untuk membangun dapps dengan tumpukan pengembangan yang benar-benar baru dan merusak kompatibilitas dengan infrastruktur Ethereum yang ada saat ini.

Namun, beberapa tim mencoba mengoptimalkan opcode EVM yang ada untuk sirkuit ZK-proving. Ini akan menghasilkan pengembangan Zero-Knowledge Ethereum Virtual Machine (zkEVM), sebuah mesin virtual (VM) yang kompatibel dengan EVM dan menghasilkan bukti untuk memverifikasi kebenaran dari eksekusi program. Dengan zkEVM, rantai Validium dapat mengeksekusi smart contract secara off-chain dan mengirim bukti validitas untuk memverifikasi komputasi off-chain (tanpa harus mengeksekusinya ulang) di Ethereum.

[Selengkapnya tentang zkEVM](https://www.alchemy.com/overviews/zkevm).

## Bagaimana validium mengatasi penskalaan Ethereum? {#scaling-ethereum-with-validiums}

### 1. Penyimpanan data di luar rantai {#offchain-data-storage}

Proyek penskalaan Lapisan 2, seperti optimistic rollup dan ZK-rollup, menukar skalabilitas tak terbatas dari protokol penskalaan murni di luar rantai (mis., [Plasma](/developers/docs/scaling/plasma/)) dengan keamanan dengan menerbitkan sebagian data transaksi di L1. Tetapi ini berarti properti skalabilitas rollup dibatasi oleh lebar pita data di Jaringan Utama Ethereum ([sharding data](/roadmap/danksharding/) diusulkan untuk meningkatkan kapasitas penyimpanan data Ethereum untuk alasan ini).

Validium mencapai skalabilitas dengan menyimpan semua data transaksi di off-chain dan hanya memposting komitmen status (beserta bukti validitas) saat mengirim pembaruan status ke rantai utama Ethereum. Namun, keberadaan bukti validitas memberikan jaminan keamanan yang lebih tinggi kepada validium daripada solusi penskalaan murni di luar rantai lainnya, termasuk Plasma dan [sidechain](/developers/docs/scaling/sidechains/). Dengan mengurangi jumlah data yang harus diproses Ethereum sebelum memvalidasi transaksi off-chain, desain Validium secara signifikan meningkatkan throughput di Jaringan Utama.

### 2. Bukti rekursif {#recursive-proofs}

Bukti rekursif adalah bukti keabsahan yang memverifikasi keabsahan bukti-bukti lain. "Proof of proofs" ini dihasilkan dengan cara menggabungkan secara rekursif beberapa bukti hingga tercipta satu bukti akhir yang memverifikasi semua bukti sebelumnya. Bukti rekursif meningkatkan kecepatan pemrosesan blockchain dengan meningkatkan jumlah transaksi yang dapat diverifikasi per bukti keabsahan.

Biasanya, setiap bukti keabsahan yang diajukan oleh operator validium ke Ethereum untuk diverifikasi memvalidasi integritas satu blok tunggal. Sementara bukti rekursif tunggal dapat digunakan untuk mengonfirmasi validitas beberapa blok validium sekaligus—hal ini dimungkinkan karena sirkuit pembuktian dapat menggabungkan secara rekursif beberapa bukti blok menjadi satu bukti akhir. Jika kontrak verifikator onchain menerima bukti rekursif, maka seluruh blok yang mendasarinya langsung difinalisasi.

## Kelebihan dan kekurangan validium {#pros-and-cons-of-validium}

| Kelebihan                                                                                                                                                  | Kekurangan                                                                                                                                                                                                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bukti keabsahan memperkuat integritas transaksi offchain dan mencegah operator memfinalisasi pembaruan status yang tidak valid.            | Menghasilkan bukti keabsahan memerlukan perangkat keras khusus, yang berpotensi menimbulkan risiko sentralisasi.                                                                                  |
| Meningkatkan efisiensi modal bagi pengguna (tidak ada penundaan dalam penarikan dana kembali ke Ethereum)                               | Dukungan terbatas untuk komputasi umum/kontrak pintar; diperlukan bahasa khusus untuk pengembangan.                                                                                               |
| Tidak rentan terhadap serangan ekonomi tertentu yang dihadapi oleh sistem berbasis bukti penipuan dalam aplikasi bernilai tinggi.          | Daya komputasi tinggi diperlukan untuk menghasilkan bukti ZK; tidak efisien secara biaya untuk aplikasi dengan throughput rendah.                                                                 |
| Mengurangi biaya gas bagi pengguna dengan tidak mengirimkan calldata ke Ethereum Mainnet.                                                  | Waktu kepastian subjektif yang lebih lambat (10-30 menit untuk menghasilkan bukti ZK) tetapi lebih cepat menuju kepastian penuh karena tidak ada penundaan waktu perselisihan. |
| Cocok untuk kasus penggunaan tertentu, seperti perdagangan atau permainan blockchain yang mengutamakan privasi transaksi dan skalabilitas. | Penarikan dana bisa terblokir jika data offchain tidak tersedia, sebab bukti kepemilikan Merkle hanya bisa dibuat saat data selalu dapat diakses.                                                 |
| Ketersediaan data off-chain memberikan tingkat throughput yang lebih tinggi dan meningkatkan skalabilitas.                                 | Model keamanan bergantung pada asumsi kepercayaan dan insentif kriptoekonomi, berbeda dengan ZK-rollups yang sepenuhnya mengandalkan mekanisme keamanan kriptografis.                             |

### Gunakan Validium/Volition {#use-validium-and-volitions}

Beberapa proyek menyediakan implementasi Validium dan volitions yang dapat Anda integrasikan ke dalam dapp Anda:

**StarkWare StarkEx** - _StarkEx adalah solusi skalabilitas Lapisan 2 (L2) Ethereum yang didasarkan pada bukti validitas. Ini dapat beroperasi dalam mode ZK-Rollup atau mode ketersediaan data Validium._

- [Dokumentasi](https://docs.starkware.co/starkex-v4/starkex-deep-dive/data-availability-modes#validium)
- [Situs web](https://starkware.co/starkex/)

**Matter Labs zkPorter** - _zkPorter adalah protokol penskalaan Lapisan 2 yang menangani ketersediaan data dengan pendekatan hibrida yang menggabungkan ide zkRollup dan sharding. Protokol ini dapat mendukung sejumlah shard sembarang, masing-masing dengan kebijakan ketersediaan datanya sendiri._

- [Blog](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Dokumentasi](https://docs.zksync.io/zksync-protocol/rollup/data-availability)
- [Situs web](https://zksync.io/)

## Bacaan lebih lanjut {#further-reading}

- [Validium dan Layer 2 Two-By-Two — Edisi No. 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- [ZK-rollup vs Validium](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)
- [Volition dan Spektrum Ketersediaan Data yang Muncul](https://medium.com/starkware/volition-and-the-emerging-data-availability-spectrum-87e8bfa09bb)
- [Rollup, Validium, dan Volition: Pelajari Solusi Penskalaan Ethereum Terpanas](https://www.defipulse.com/blog/rollups-validiums-and-volitions-learn-about-the-hottest-ethereum-scaling-solutions)
- [Panduan Praktis untuk Rollup Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
