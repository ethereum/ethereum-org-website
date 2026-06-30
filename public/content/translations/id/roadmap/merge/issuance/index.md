---
title: Bagaimana The Merge berdampak pada pasokan ETH
description: Rincian tentang bagaimana The Merge berdampak pada pasokan ETH
lang: id
---

The Merge mewakili transisi jaringan [Ethereum](/) dari Bukti Kerja (PoW) ke Bukti Kepemilikan (PoS) yang terjadi pada bulan September 2022. Cara ETH diterbitkan mengalami perubahan pada saat transisi tersebut. Sebelumnya, ETH baru diterbitkan dari dua sumber: lapisan eksekusi (yaitu, Mainnet) dan lapisan konsensus (yaitu, Rantai suar). Sejak The Merge, penerbitan pada lapisan eksekusi sekarang menjadi nol. Mari kita rincikan hal ini.

## Komponen penerbitan ETH {#components-of-eth-issuance}

Kita dapat membagi pasokan ETH menjadi dua kekuatan utama: penerbitan dan pembakaran.

**Penerbitan** ETH adalah proses pembuatan ETH yang sebelumnya tidak ada. **Pembakaran** ETH adalah ketika ETH yang ada dihancurkan, menghapusnya dari peredaran. Tingkat penerbitan dan pembakaran dihitung berdasarkan beberapa parameter, dan keseimbangan di antara keduanya menentukan tingkat inflasi/deflasi Ether yang dihasilkan.

<Card
emoji=":chart_decreasing:"
title="TLDR penerbitan ETH">

- Sebelum beralih ke Bukti Kepemilikan (PoS), penambang diterbitkan sekitar 13.000 ETH/hari
- Staker diterbitkan sekitar 1.700 ETH/hari, berdasarkan sekitar 14 juta total ETH yang di-stake
- Penerbitan staking yang tepat berfluktuasi berdasarkan jumlah total ETH yang di-stake
- **Sejak The Merge, hanya tersisa ~1.700 ETH/hari, menurunkan total penerbitan ETH baru sekitar 88%**
- Pembakaran: Ini berfluktuasi sesuai dengan permintaan jaringan. _Jika_ harga gas rata-rata setidaknya 16 Gwei diamati untuk hari tertentu, ini secara efektif mengimbangi ~1.700 ETH yang diterbitkan kepada validator dan membawa inflasi ETH bersih menjadi nol atau kurang untuk hari itu.

</Card>

## Pra-merge (historis) {#pre-merge}

### Penerbitan lapisan eksekusi {#el-issuance-pre-merge}

Di bawah Bukti Kerja (PoW), penambang hanya berinteraksi dengan lapisan eksekusi dan diberi imbalan dengan imbalan blok jika mereka adalah penambang pertama yang memecahkan blok berikutnya. Sejak [pembaruan Constantinople](/ethereum-forks/#constantinople) pada tahun 2019, imbalan ini adalah 2 ETH per blok. Penambang juga diberi imbalan karena menerbitkan blok [ommer](/glossary/#ommer), yang merupakan blok valid yang tidak berakhir di rantai terpanjang/kanonikal. Imbalan ini maksimal 1,75 ETH per ommer, dan merupakan _tambahan_ dari imbalan yang diterbitkan dari blok kanonikal. Proses penambangan adalah aktivitas yang intensif secara ekonomi, yang secara historis membutuhkan tingkat penerbitan ETH yang tinggi untuk dipertahankan.

### Penerbitan lapisan konsensus {#cl-issuance-pre-merge}

[Rantai suar](/ethereum-forks/#beacon-chain-genesis) ditayangkan pada tahun 2020. Alih-alih penambang, ini diamankan oleh validator menggunakan Bukti Kepemilikan (PoS). Rantai ini dimulai oleh pengguna Ethereum yang menyetorkan ETH satu arah ke dalam kontrak pintar di Mainnet (lapisan eksekusi), yang didengarkan oleh Rantai suar, mengkreditkan pengguna dengan jumlah ETH yang sama di rantai baru. Sampai The Merge terjadi, validator Rantai suar tidak memproses transaksi dan pada dasarnya mencapai konsensus pada state dari kumpulan validator itu sendiri.

Validator di Rantai suar diberi imbalan dengan ETH karena membuktikan state rantai dan mengusulkan blok. Imbalan (atau penalti) dihitung dan didistribusikan pada setiap Epok (setiap 6,4 menit) berdasarkan kinerja validator. Imbalan validator **secara signifikan** lebih kecil daripada imbalan penambangan yang sebelumnya diterbitkan di bawah Bukti Kerja (PoW) (2 ETH setiap ~13,5 detik), karena mengoperasikan node validasi tidak seintensif secara ekonomi dan karenanya tidak memerlukan atau menjamin imbalan yang setinggi itu.

### Rincian penerbitan pra-merge {#pre-merge-issuance-breakdown}

Total pasokan ETH: **\~120.520.000 ETH** (pada saat The Merge di bulan September 2022)

**Penerbitan lapisan eksekusi:**

- Diperkirakan sebesar 2,08 ETH per 13,3 detik\*: **\~4.930.000** ETH diterbitkan dalam setahun
- Menghasilkan tingkat inflasi **sekitar 4,09%** (4,93 juta per tahun / total 120,5 juta)
- \*Ini termasuk 2 ETH per blok kanonikal, ditambah rata-rata 0,08 ETH dari waktu ke waktu dari blok ommer. Juga menggunakan 13,3 detik, target waktu blok dasar tanpa pengaruh apa pun dari [Bom kesulitan](/glossary/#difficulty-bomb). ([Lihat sumber](https://bitinfocharts.com/ethereum/))

**Penerbitan lapisan konsensus:**

- Menggunakan total 14.000.000 ETH yang di-stake, tingkat penerbitan ETH adalah sekitar 1.700 ETH/hari ([Lihat sumber](https://ultrasound.money/))
- Menghasilkan **\~620.500** ETH yang diterbitkan dalam setahun
- Menghasilkan tingkat inflasi **sekitar 0,52%** (620,5 ribu per tahun / total 119,3 juta)

<Alert variant="update">
<AlertContent>
<AlertDescription>
**Total tingkat penerbitan tahunan (pra-merge): ~4,61%** (4,09% + 0,52%)

**\~88,7%** dari penerbitan diberikan kepada penambang di lapisan eksekusi (4,09 / 4,61 * 100)

**\~11,3%** diterbitkan kepada staker di lapisan konsensus (0,52 / 4,61 * 100)
</AlertDescription>
</AlertContent>
</Alert>

## Pasca-merge (saat ini) {#post-merge}

### Penerbitan lapisan eksekusi {#el-issuance-post-merge}

Penerbitan lapisan eksekusi sejak The Merge adalah nol. Bukti Kerja (PoW) tidak lagi menjadi cara produksi blok yang valid di bawah aturan konsensus yang diperbarui. Semua aktivitas lapisan eksekusi dikemas ke dalam "blok suar", yang diterbitkan dan dibuktikan oleh validator Bukti Kepemilikan (PoS). Imbalan untuk membuktikan dan menerbitkan blok suar diperhitungkan secara terpisah pada lapisan konsensus.

### Penerbitan lapisan konsensus {#cl-issuance-post-merge}

Penerbitan lapisan konsensus berlanjut hari ini seperti sebelum The Merge, dengan imbalan kecil untuk validator yang membuktikan dan mengusulkan blok. Imbalan validator terus bertambah ke _saldo validator_ yang dikelola di dalam lapisan konsensus. Tidak seperti akun saat ini (akun "eksekusi"), yang dapat bertransaksi di Mainnet, ini adalah akun Ethereum terpisah yang tidak dapat bertransaksi secara bebas dengan akun Ethereum lainnya. Dana di akun ini hanya dapat ditarik ke satu alamat eksekusi yang ditentukan.

Sejak pembaruan Shanghai/Capella yang berlangsung pada bulan April 2023, penarikan ini telah diaktifkan untuk staker. Staker diberi insentif untuk menghapus _penghasilan/imbalan mereka (saldo di atas 32 ETH)_ karena dana ini tidak berkontribusi pada bobot stake mereka (yang maksimal 32).

Staker juga dapat memilih untuk keluar dan menarik seluruh saldo validator mereka. Untuk memastikan Ethereum stabil, jumlah validator yang keluar secara bersamaan dibatasi.

Sekitar 0,33% dari total jumlah validator dapat keluar pada hari tertentu. Secara default, empat (4) validator dapat keluar per Epok (setiap 6,4 menit, atau 900 per hari). Tambahan satu (1) validator diizinkan untuk keluar untuk setiap 65.536 (2<sup>16</sup>) validator tambahan di atas 262.144 (2<sup>18</sup>). Misalnya, dengan lebih dari 327.680 validator, lima (5) dapat keluar per Epok (1.125 per hari). Enam (6) akan diizinkan dengan total jumlah validator aktif di atas 393.216, dan seterusnya.

Semakin banyak validator yang menarik diri, jumlah maksimum validator yang keluar secara bertahap akan dikurangi menjadi minimal empat untuk secara sengaja mencegah penarikan sejumlah besar ETH yang di-stake secara bersamaan yang dapat mengganggu stabilitas.

### Rincian inflasi pasca-merge {#post-merge-inflation-breakdown}

- [Total pasokan ETH](/eth/supply/): **\~120.520.000 ETH** (pada saat The Merge di bulan September 2022)
- Penerbitan lapisan eksekusi: **0**
- Penerbitan lapisan konsensus: Sama seperti di atas, tingkat penerbitan tahunan **\~0,52%** (dengan total 14 juta ETH yang di-stake)

<Alert variant="update">
<AlertContent>
<AlertDescription>
Total tingkat penerbitan tahunan: **\~0,52%**

Pengurangan bersih dalam penerbitan ETH tahunan: **\~88,7%** ((4,61% - 0,52%) / 4,61% * 100)
</AlertDescription>
</AlertContent>
</Alert>

## <Emoji text=":fire:" size="1" /> Pembakaran {#the-burn}

Kekuatan yang berlawanan dengan penerbitan ETH adalah tingkat di mana ETH dibakar. Agar transaksi dapat dieksekusi di Ethereum, biaya minimum (dikenal sebagai "biaya dasar") harus dibayar, yang berfluktuasi terus menerus (dari blok ke blok) tergantung pada aktivitas jaringan. Biaya dibayarkan dalam ETH dan _diwajibkan_ agar transaksi dianggap valid. Biaya ini _dibakar_ selama proses transaksi, menghapusnya dari peredaran.

<Alert variant="update">
<AlertContent>
<AlertDescription>

Pembakaran biaya ditayangkan dengan [pembaruan London](/ethereum-forks/#london) pada bulan Agustus 2021, dan tetap tidak berubah sejak The Merge.
</AlertDescription>
</AlertContent>
</Alert>

Selain pembakaran biaya yang diimplementasikan oleh pembaruan London, validator juga dapat dikenakan penalti karena offline, atau lebih buruk lagi, mereka dapat dipotong karena melanggar aturan tertentu yang mengancam keamanan jaringan. Penalti ini mengakibatkan pengurangan ETH dari saldo validator tersebut, yang tidak secara langsung diberikan sebagai imbalan ke akun lain mana pun, yang secara efektif membakar/menghapusnya dari peredaran.

### Menghitung harga gas rata-rata untuk deflasi {#calculating-average-gas-price-for-deflation}

Seperti yang dibahas di atas, jumlah ETH yang diterbitkan pada hari tertentu bergantung pada total ETH yang di-stake. Pada saat penulisan, ini adalah sekitar 1.700 ETH/hari.

Untuk menentukan harga gas rata-rata yang diperlukan untuk sepenuhnya mengimbangi penerbitan ini dalam periode 24 jam tertentu, kita akan mulai dengan menghitung jumlah total blok dalam sehari, dengan waktu blok 12 detik:

- `(1 block / 12 seconds) * (60 seconds/minute) = 5 blocks/minute`
- `(5 blocks/minute) * (60 minutes/hour) = 300 blocks/hour`
- `(300 blocks/hour) * (24 hours/day) = 7200 blocks/day`

Setiap blok menargetkan `15x10^6 gas/block` ([lebih lanjut tentang gas](/developers/docs/gas/)). Dengan menggunakan ini, kita dapat menyelesaikan harga gas rata-rata (dalam satuan Gwei/gas) yang diperlukan untuk mengimbangi penerbitan, dengan total penerbitan ETH harian sebesar 1.700 ETH:

- `7200 blocks/day * 15x10^6 gas/block * `**`Y gwei/gas`**` * 1 ETH/ 10^9 gwei = 1700 ETH/day`

Menyelesaikan untuk `Y`:

- `Y = (1700(10^9))/(7200 * 15(10^6)) = (17x10^3)/(72 * 15) = 16 gwei` (pembulatan hanya menjadi dua angka penting)

Cara lain untuk mengatur ulang langkah terakhir ini adalah dengan mengganti `1700` dengan variabel `X` yang mewakili penerbitan ETH harian, dan menyederhanakan sisanya menjadi:

- `Y = (X(10^3)/(7200 * 15)) = X/108`

Kita dapat menyederhanakan dan menulis ini sebagai fungsi dari `X`:

- `f(X) = X/108` di mana `X` adalah penerbitan ETH harian, dan `f(X)` mewakili harga Gwei/gas yang diperlukan untuk mengimbangi semua ETH yang baru diterbitkan.

Jadi, misalnya, jika `X` (penerbitan ETH harian) naik menjadi 1.800 berdasarkan total ETH yang di-stake, `f(X)` (Gwei yang diperlukan untuk mengimbangi semua penerbitan) kemudian akan menjadi `17 gwei` (menggunakan 2 angka penting)

## Bacaan lebih lanjut {#further-reading}

- [The Merge](/roadmap/merge/)
- [Ultrasound.money](https://ultrasound.money/) - _Dasbor tersedia untuk memvisualisasikan penerbitan dan pembakaran ETH secara real-time_
- [Memetakan Penerbitan Ethereum](https://www.attestant.io/posts/charting-ethereum-issuance/) - _Jim McDonald 2020_
