---
title: Bagaimana The Merge berdampak pada pasokan ETH
description: Rincian tentang bagaimana The Merge berdampak pada pasokan ETH
lang: id
---

# Bagaimana The Merge berdampak pada pasokan ETH {#how-the-merge-impacts-ETH-supply}

The Merge mewakili transisi jaringan [Ethereum](/) dari proof-of-work ke proof-of-stake yang terjadi pada bulan September 2022. Cara ETH diterbitkan mengalami perubahan pada saat transisi tersebut. Sebelumnya, ETH baru diterbitkan dari dua sumber: lapisan eksekusi (yaitu, Mainnet) dan lapisan konsensus (yaitu, Beacon Chain). Sejak The Merge, penerbitan pada lapisan eksekusi sekarang menjadi nol. Mari kita uraikan hal ini.

## Komponen penerbitan ETH {#components-of-eth-issuance}

Kita dapat membagi pasokan ETH menjadi dua kekuatan utama: penerbitan dan pembakaran.

**Penerbitan** ETH adalah proses menciptakan ETH yang sebelumnya tidak ada. **Pembakaran** ETH adalah ketika ETH yang ada dihancurkan, menghapusnya dari peredaran. Tingkat penerbitan dan pembakaran dihitung berdasarkan beberapa parameter, dan keseimbangan di antara keduanya menentukan tingkat inflasi/deflasi ether yang dihasilkan.

<Card
emoji=":chart_decreasing:"
title="Ringkasan singkat penerbitan ETH">

- Sebelum beralih ke proof-of-stake, penambang diterbitkan sekitar 13.000 ETH/hari
- Staker diterbitkan sekitar 1.700 ETH/hari, berdasarkan sekitar 14 juta total ETH yang di-stake
- Penerbitan mengunci yang tepat berfluktuasi berdasarkan jumlah total ETH yang di-stake
- **Sejak The Merge, hanya tersisa ~1.700 ETH/hari, menurunkan total penerbitan ETH baru sebesar ~88%**
- Pembakaran: Ini berfluktuasi sesuai dengan permintaan jaringan. _Jika_ harga gas rata-rata setidaknya 16 gwei diamati untuk hari tertentu, ini secara efektif mengimbangi ~1.700 ETH yang diterbitkan kepada validator dan membawa inflasi ETH bersih menjadi nol atau kurang untuk hari itu.
</Card>

## Pra-merge (historis) {#pre-merge}

### Penerbitan lapisan eksekusi {#el-issuance-pre-merge}

Di bawah proof-of-work, penambang hanya berinteraksi dengan lapisan eksekusi dan diberi imbalan dengan hadiah blok jika mereka adalah penambang pertama yang memecahkan blok berikutnya. Sejak [pembaruan Constantinople](/ethereum-forks/#constantinople) pada tahun 2019, hadiah ini adalah 2 ETH per blok. Penambang juga diberi imbalan karena menerbitkan blok [ommer](/glossary/#ommer), yang merupakan blok valid yang tidak berakhir di rantai terpanjang/kanonikal. Hadiah ini maksimal 1,75 ETH per ommer, dan merupakan _tambahan dari_ hadiah yang diterbitkan dari blok kanonikal. Proses penambangan adalah aktivitas yang intensif secara ekonomi, yang secara historis membutuhkan tingkat penerbitan ETH yang tinggi untuk dipertahankan.

### Penerbitan lapisan konsensus {#cl-issuance-pre-merge}

[Beacon Chain](/ethereum-forks/#beacon-chain-genesis) ditayangkan pada tahun 2020. Alih-alih penambang, ini diamankan oleh validator menggunakan proof-of-stake. Rantai ini dimulai oleh pengguna Ethereum yang menyetorkan ETH satu arah ke dalam kontrak pintar di Mainnet (lapisan eksekusi), yang didengarkan oleh Beacon Chain, mengkredit pengguna dengan jumlah ETH yang sama di rantai baru. Sampai The Merge terjadi, validator Beacon Chain tidak memproses transaksi dan pada dasarnya mencapai konsensus tentang status dari kumpulan validator itu sendiri.

Validator di Beacon Chain diberi imbalan ETH karena mengesahkan status rantai dan mengusulkan blok. Hadiah (atau penalti) dihitung dan didistribusikan pada setiap epoch (setiap 6,4 menit) berdasarkan kinerja validator. Hadiah validator **secara signifikan** lebih kecil daripada hadiah penambangan yang sebelumnya diterbitkan di bawah proof-of-work (2 ETH setiap ~13,5 detik), karena mengoperasikan node validasi tidak seintensif secara ekonomi dan karenanya tidak memerlukan atau menjamin hadiah yang setinggi itu.

### Rincian penerbitan pra-merge {#pre-merge-issuance-breakdown}

Total pasokan ETH: **\~120.520.000 ETH** (pada saat The Merge di bulan September 2022)

**Penerbitan lapisan eksekusi:**

- Diperkirakan sebesar 2,08 ETH per 13,3 detik\*: **\~4.930.000** ETH diterbitkan dalam setahun
- Menghasilkan tingkat inflasi **sekitar 4,09%** (4,93 juta per tahun / total 120,5 juta)
- \*Ini termasuk 2 ETH per blok kanonikal, ditambah rata-rata 0,08 ETH dari waktu ke waktu dari blok ommer. Juga menggunakan 13,3 detik, target waktu blok dasar tanpa pengaruh apa pun dari [bom kesulitan (difficulty bomb)](/glossary/#difficulty-bomb). ([Lihat sumber](https://bitinfocharts.com/ethereum/))

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

Penerbitan lapisan eksekusi sejak The Merge adalah nol. Proof-of-work tidak lagi menjadi cara produksi blok yang valid di bawah aturan konsensus yang diperbarui. Semua aktivitas lapisan eksekusi dikemas ke dalam "blok beacon", yang diterbitkan dan disahkan oleh validator proof-of-stake. Hadiah untuk mengesahkan dan menerbitkan blok beacon dicatat secara terpisah di lapisan konsensus.

### Penerbitan lapisan konsensus {#cl-issuance-post-merge}

Penerbitan lapisan konsensus berlanjut hari ini seperti sebelum The Merge, dengan hadiah kecil untuk validator yang mengesahkan dan mengusulkan blok. Hadiah validator terus bertambah ke _saldo validator_ yang dikelola di dalam lapisan konsensus. Tidak seperti akun saat ini (akun "eksekusi"), yang dapat bertransaksi di Mainnet, ini adalah akun Ethereum terpisah yang tidak dapat bertransaksi secara bebas dengan akun Ethereum lainnya. Dana di akun ini hanya dapat ditarik ke satu alamat eksekusi yang ditentukan.

Sejak pembaruan Shanghai/Capella yang berlangsung pada bulan April 2023, penarikan ini telah diaktifkan untuk staker. Staker diberi insentif untuk menghapus _penghasilan/hadiah mereka (saldo di atas 32 ETH)_ karena dana ini tidak berkontribusi pada bobot stake mereka (yang maksimal 32).

Staker juga dapat memilih untuk keluar dan menarik seluruh saldo validator mereka. Untuk memastikan Ethereum stabil, jumlah validator yang keluar secara bersamaan dibatasi.

Sekitar 0,33% dari total jumlah validator dapat keluar pada hari tertentu. Secara default, empat (4) validator dapat keluar per epoch (setiap 6,4 menit, atau 900 per hari). Tambahan satu (1) validator diizinkan untuk keluar untuk setiap 65.536 (2<sup>16</sup>) validator tambahan di atas 262.144 (2<sup>18</sup>). Misalnya, dengan lebih dari 327.680 validator, lima (5) dapat keluar per epoch (1.125 per hari). Enam (6) akan diizinkan dengan total jumlah validator aktif di atas 393.216, dan seterusnya.

Semakin banyak validator yang menarik diri, jumlah maksimum validator yang keluar secara bertahap akan dikurangi menjadi minimal empat untuk secara sengaja mencegah sejumlah besar ETH yang di-stake ditarik secara bersamaan yang dapat mengganggu stabilitas.

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

Kekuatan yang berlawanan dengan penerbitan ETH adalah tingkat di mana ETH dibakar. Agar transaksi dapat dieksekusi di Ethereum, biaya minimum (dikenal sebagai "biaya dasar") harus dibayar, yang berfluktuasi terus menerus (dari blok ke blok) tergantung pada aktivitas jaringan. Biaya dibayarkan dalam ETH dan _diperlukan_ agar transaksi dianggap valid. Biaya ini _dibakar_ selama proses transaksi, menghapusnya dari peredaran.

<Alert variant="update">
<AlertContent>
<AlertDescription>

Pembakaran biaya ditayangkan dengan [pembaruan London](/ethereum-forks/#london) pada bulan Agustus 2021, dan tetap tidak berubah sejak The Merge.
</AlertDescription>
</AlertContent>
</Alert>

Selain pembakaran biaya yang diimplementasikan oleh pembaruan London, validator juga dapat dikenakan penalti karena offline, atau lebih buruk lagi, mereka dapat dipotong karena melanggar aturan tertentu yang mengancam keamanan jaringan. Penalti ini mengakibatkan pengurangan ETH dari saldo validator tersebut, yang tidak secara langsung diberikan sebagai hadiah ke akun lain mana pun, secara efektif membakar/menghapusnya dari peredaran.

### Menghitung harga gas rata-rata untuk deflasi {#calculating-average-gas-price-for-deflation}

Seperti yang dibahas di atas, jumlah ETH yang diterbitkan pada hari tertentu bergantung pada total ETH yang di-stake. Pada saat penulisan, ini adalah sekitar 1.700 ETH/hari.

Untuk menentukan harga gas rata-rata yang diperlukan untuk sepenuhnya mengimbangi penerbitan ini dalam periode 24 jam tertentu, kita akan mulai dengan menghitung jumlah total blok dalam sehari, dengan waktu blok 12 detik:

- `(1 blok / 12 detik) * (60 detik/menit) = 5 blok/menit`
- `(5 blok/menit) * (60 menit/jam) = 300 blok/jam`
- `(300 blok/jam) * (24 jam/hari) = 7200 blok/hari`

Setiap blok menargetkan `15x10^6 gas/blok` ([lebih lanjut tentang gas](/developers/docs/gas/)). Dengan menggunakan ini, kita dapat memecahkan harga gas rata-rata (dalam satuan gwei/gas) yang diperlukan untuk mengimbangi penerbitan, dengan total penerbitan ETH harian sebesar 1.700 ETH:

- `7200 blok/hari * 15x10^6 gas/blok * `**`Y gwei/gas`**` * 1 ETH/ 10^9 gwei = 1700 ETH/hari`

Memecahkan untuk `Y`:

- `Y = (1700(10^9))/(7200 * 15(10^6)) = (17x10^3)/(72 * 15) = 16 gwei` (dibulatkan menjadi hanya dua angka penting)

Cara lain untuk mengatur ulang langkah terakhir ini adalah dengan mengganti `1700` dengan variabel `X` yang mewakili penerbitan ETH harian, dan menyederhanakan sisanya menjadi:

- `Y = (X(10^3)/(7200 * 15)) = X/108`

Kita dapat menyederhanakan dan menulis ini sebagai fungsi dari `X`:

- `f(X) = X/108` di mana `X` adalah penerbitan ETH harian, dan `f(X)` mewakili harga gwei/gas yang diperlukan untuk mengimbangi semua ETH yang baru diterbitkan.

Jadi, misalnya, jika `X` (penerbitan ETH harian) naik menjadi 1800 berdasarkan total ETH yang di-stake, `f(X)` (gwei yang diperlukan untuk mengimbangi semua penerbitan) kemudian akan menjadi `17 gwei` (menggunakan 2 angka penting)

## Bacaan lebih lanjut {#further-reading}

- [The Merge](/roadmap/merge/)
- [Ultrasound.money](https://ultrasound.money/) - _Dasbor tersedia untuk memvisualisasikan penerbitan dan pembakaran ETH secara real-time_
- [Charting Ethereum Issuance](https://www.attestant.io/posts/charting-ethereum-issuance/) - _Jim McDonald 2020_