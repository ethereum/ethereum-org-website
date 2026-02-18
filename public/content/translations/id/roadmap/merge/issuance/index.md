---
title: Bagaimana Penggabungan mempengaruhi pasokan ETH
description: Perincian tentang bagaimana Penggabungan mempengaruhi pasokan ETH
lang: id
---

# Bagaimana Penggabungan berdampak pada pasokan ETH {#how-the-merge-impacts-ETH-supply}

Penggabungan mewakili transisi jaringan Ethereum dari bukti kerja ke bukti taruhan yang terjadi pada bulan September 2022. Cara ETH diterbitkan mengalami perubahan pada saat masa transisi tersebut. Sebelumnya, ETH baru diterbitkan dari dua sumber: lapisan eksekusi (yaitu, Jaringan Utama) dan lapisan konsensus (yaitu, Rantai Suar). Sejak Penggabungan, penerbitan pada lapisan eksekusi sekarang menjadi nol. Mari kita uraikan hal ini.

## Komponen penerbitan ETH {#components-of-eth-issuance}

Kita dapat memecah pasokan ETH menjadi dua kekuatan utama: penerbitan dan pembakaran.

**Penerbitan** ETH adalah proses pembuatan ETH yang sebelumnya tidak ada. **Pembakaran** ETH adalah ketika ETH yang ada dihancurkan, menghapusnya dari peredaran. Laju penerbitan dan pembakaran dihitung berdasarkan beberapa parameter, dan keseimbangan di antara keduanya menentukan tingkat inflasi/deflasi ether yang dihasilkan.

<Card
emoji=":chart_decreasing:"
title="TLDR penerbitan ETH">

- Sebelum bertransisi ke bukti taruhan, para penambang diterbitkan sekitar 13.000 ETH/hari
- Para penaruh diterbitkan sekitar 1.700 ETH/hari, berdasarkan sekitar 14 juta total ETH yang dipertaruhkan
- Penerbitan penaruhan yang pasti berfluktuasi berdasarkan jumlah total ETH yang dipertaruhkan
- **Sejak Penggabungan, hanya tersisa ~1.700 ETH/hari, menurunkan total penerbitan ETH baru sebesar ~88%**
- Pembakaran: Ini berfluktuasi sesuai dengan permintaan jaringan. _Jika_ harga gas rata-rata setidaknya 16 gwei diamati pada hari tertentu, ini secara efektif mengimbangi ~1.700 ETH yang diternitkan untuk validator dan membuat inflasi ETH bersih menjadi nol atau kurang untuk hari itu.
</Card>

## Pra-penggabungan (historis) {#pre-merge}

### Penerbitan lapisan eksekusi {#el-issuance-pre-merge}

Pada bukti kerja, penambang hanya berinteraksi dengan lapisan eksekusi dan mendapatkan reward blok jika mereka adalah penambang pertama yang menyelesaikan blok berikutnya. Sejak [peningkatan Constantinople](/ethereum-forks/#constantinople) pada tahun 2019, imbalan ini adalah 2 ETH per blok. Para penambang juga diberi imbalan karena menerbitkan blok [ommer](/glossary/#ommer), yang merupakan blok valid yang tidak berakhir di rantai terpanjang/kanonis. Imbalan ini maksimal sebesar 1,75 ETH per ommer, dan merupakan _tambahan_ dari imbalan yang dikeluarkan dari blok kanonis. Proses penambangan adalah kegiatan yang intensif secara ekonomi, yang secara historis membutuhkan tingkat penerbitan ETH yang tinggi untuk mempertahankannya.

### Penerbitan lapisan konsensus {#cl-issuance-pre-merge}

[Rantai Suar](/ethereum-forks/#beacon-chain-genesis) ditayangkan pada tahun 2020. Alih-alih penambang, ini diamankan oleh validator menggunakan bukti taruhan. Rantai ini di-bootstrap oleh pengguna Ethereum yang menyetor ETH satu arah ke dalam kontrak pintar di Jaringan Utama (lapisan eksekusi), yang kemudian didengarkan oleh Rantai Suar, dan mengkreditkan pengguna dengan jumlah ETH yang sama di rantai yang baru. Hingga Penggabungan terjadi, validator Rantai Suar tidak memproses transaksi dan pada dasarnya mencapai konsensus tentang keadaan kumpulan validator itu sendiri.

Validator di Rantai Suar diberi imbalan dengan ETH karena telah membuktikan status rantai dan mengusulkan blok. Imbalan (atau penalti) dihitung dan didistribusikan pada setiap jangka waktu (setiap 6,4 menit) berdasarkan kinerja validator. Imbalan validator secara **signifikan** lebih kecil daripada imbalan penambangan yang sebelumnya dikeluarkan di bawah bukti-kerja (2 ETH setiap ~13,5 detik), karena mengoperasikan simpul validasi tidak terlalu intensif secara ekonomi dan dengan demikian tidak memerlukan atau menjamin imbalan setinggi itu.

### Rincian penerbitan pra-penggabungan {#pre-merge-issuance-breakdown}

Total pasokan ETH: **~120.520.000 ETH** (pada saat Penggabungan pada bulan September 2022)

**Penerbitan lapisan eksekusi:**

- Diperkirakan sebesar 2,08 ETH per 13,3 detik\*: **~4.930.000** ETH diterbitkan dalam setahun
- Menghasilkan tingkat inflasi **sekitar 4,09%** (4,93 juta per tahun / 120,5 juta total)
- \*Ini termasuk 2 ETH per blok kanonikal, ditambah rata-rata 0,08 ETH dari blok ommer dari waktu ke waktu. Juga menggunakan 13,3 detik, target waktu blok dasar tanpa pengaruh apa pun dari [bom kesulitan](/glossary/#difficulty-bomb). ([Lihat sumber](https://bitinfocharts.com/ethereum/))

**Penerbitan lapisan konsensus:**

- Menggunakan total 14.000.000 ETH yang dipertaruhkan, tingkat penerbitan ETH sekitar 1700 ETH/hari ([Lihat sumber](https://ultrasound.money/))
- Menghasilkan **~620.500** ETH yang diterbitkan dalam setahun
- Menghasilkan tingkat inflasi **sekitar 0,52%** (620,5K per tahun / 119,3 juta total)

<Alert variant="update">
<AlertContent>
<AlertDescription>
**Total tingkat penerbitan tahunan (pra-penggabungan): ~4,61%** (4,09% + 0,52%)

**~88,7%** dari penerbitan diberikan kepada penambang di lapisan eksekusi (4,09 / 4,61 \* 100)

**~11,3%** diterbitkan untuk para penaruh di lapisan konsensus (0,52 / 4,61 \* 100)
</AlertDescription>

</AlertContent>

</Alert>

## Pasca-penggabungan (saat ini) {#post-merge}

### Penerbitan lapisan eksekusi {#el-issuance-post-merge}

Penerbitan lapisan eksekusi sejak Penggabungan adalah nol. Bukti kerja bukan lagi cara yang valid untuk produksi blok berdasarkan aturan konsensus yang telah ditingkatkan. Semua aktivitas lapisan eksekusi dikemas ke dalam "blok suar", yang dipublikasikan dan diatestasi oleh validator bukti taruhan. Imbalan untuk melakukan atestasi dan menerbitkan blok suar dicatat secara terpisah di lapisan konsensus.

### Penerbitan lapisan konsensus {#cl-issuance-post-merge}

Penerbitan lapisan konsensus berlanjut hingga hari ini seperti sebelum Penggabungan, dengan imbalan kecil untuk validator yang melakukan atestasi dan mengusulkan blok. Imbalan validator terus bertambah ke _saldo validator_ yang dikelola di dalam lapisan konsensus. Berbeda dengan akun saat ini (akun "eksekusi"), yang dapat melakukan transaksi di Jaringan Utama, akun-akun Ethereum terpisah ini tidak dapat bertransaksi secara bebas dengan akun Ethereum lainnya. Dana di akun-akun ini hanya dapat ditarik ke satu alamat eksekusi yang ditentukan.

Sejak peningkatan Shanghai/Capella yang terjadi pada April 2023, penarikan ini telah diaktifkan untuk para penaruh. Para penaruh diinsentifkan untuk menarik _pendapatan/imbalan (saldo di atas 32 ETH)_ mereka karena dana tersebut tidak berkontribusi pada bobot taruhan mereka (yang maksimalnya 32).

Penaruh juga dapat memilih untuk keluar dan menarik seluruh saldo validator mereka. Untuk memastikan Ethereum tetap stabil, jumlah validator yang keluar secara bersamaan dibatasi.

Sekitar 0,33% dari total jumlah validator dapat keluar dalam satu hari. Secara default, empat (4) validator dapat keluar untuk setiap jangka waktu (setiap 6,4 menit, atau 900 per hari). Satu (1) validator tambahan diperbolehkan keluar untuk setiap 65.536 (2<sup>16</sup>) validator tambahan di atas 262.144 (2<sup>18</sup>). Sebagai contoh, dengan lebih dari 327.680 validator, lima (5) validator dapat keluar untuk setiap jangka waktu (1.125 per hari). Enam (6) akan diizinkan dengan jumlah total validator aktif lebih dari 393.216, dan seterusnya.

Seiring bertambahnya validator yang menarik diri, jumlah maksimum validator yang keluar akan secara bertahap berkurang menjadi minimum empat untuk sengaja mencegah jumlah besar ETH yang dipertaruhkan dan berpotensi mengganggu kestabilan ditarik secara bersamaan.

### Rincian inflasi pasca-penggabungan {#post-merge-inflation-breakdown}

- Total pasokan ETH: **~120.520.000 ETH** (pada saat Penggabungan pada bulan September 2022)
- Penerbitan lapisan eksekusi: **0**
- Penerbitan lapisan konsensus: Sama seperti di atas, tingkat penerbitan tahunan **~0,52%** (dengan total 14 juta ETH dipertaruhkan)

<Alert variant="update">
<AlertContent>
<AlertDescription>
Tingkat penerbitan tahunan total: **~0,52%**

Pengurangan bersih dalam penerbitan ETH tahunan: **~88,7%** ((4,61% - 0,52%) / 4,61% \* 100)
</AlertDescription>

</AlertContent>

</Alert>

## <Emoji text=":fire:" size="1" /> Pembakaran {#the-burn}

Kekuatan berlawanan dengan penerbitan ETH adalah tingkat pembakaran ETH. Untuk sebuah transaksi dieksekusi di Ethereum, biaya minimum (dikenal sebagai "biaya dasar") harus dibayarkan, yang terus berfluktuasi (dari blok ke blok) tergantung pada aktivitas jaringan. Biaya dibayar dalam ETH dan _wajib_ agar transaksi dianggap sah. Biaya ini akan _dibakar_ selama proses transaksi, menghilangkannya dari peredaran.

<Alert variant="update">
<AlertContent>
<AlertDescription>

Pembakaran biaya mulai berlaku dengan [peningkatan London](/ethereum-forks/#london) pada bulan Agustus 2021, dan tidak berubah sejak Penggabungan.
</AlertDescription>

</AlertContent>

</Alert>

Selain pembakaran biaya yang diimplementasikan oleh peningkatan London, validator juga dapat dikenakan denda karena tidak aktif, atau bahkan lebih buruk lagi, mereka dapat dipotong karena melanggar aturan tertentu yang mengancam keamanan jaringan. Penalti ini mengakibatkan pengurangan ETH dari saldo validator tersebut, yang tidak langsung diberikan sebagai imbalan kepada akun lain, secara efektif dibakar/mengeluarkannya dari sirkulasi.

### Menghitung harga gas rata-rata untuk deflasi {#calculating-average-gas-price-for-deflation}

Seperti yang dibahas di atas, jumlah ETH yang diterbitkan dalam satu hari tertentu tergantung pada total ETH yang dipertaruhkan. Pada saat penulisan ini, jumlahnya kira-kira adalah 1700 ETH per hari.

Untuk menentukan harga gas rata-rata yang diperlukan untuk sepenuhnya menutupi penerbitan dalam periode 24 jam tertentu, kita akan mulai dengan menghitung total jumlah blok dalam sehari, dengan waktu blok 12 detik:

- `(1 blok / 12 detik) * (60 detik/menit) = 5 blok/menit`
- `(5 blok/menit) * (60 menit/jam) = 300 blok/jam`
- `(300 blok/jam) * (24 jam/hari) = 7200 blok/hari`

Setiap blok menargetkan `15x10^6 gas/blok` ([lebih lanjut tentang gas](/developers/docs/gas/)). Dengan demikian, kita dapat mencari solusi untuk harga gas rata-rata (dalam satuan gwei/gas) yang diperlukan untuk menutupi penerbitan, dengan total penerbitan ETH harian sebesar 1700 ETH:

- `7200 blok/hari * 15x10^6 gas/blok * `**`Y gwei/gas`**` * 1 ETH/ 10^9 gwei = 1700 ETH/hari`

Menyelesaikan untuk `Y`:

- `Y = (1700(10^9))/(7200 * 15(10^6)) = (17x10^3)/(72 * 15) = 16 gwei` (dibulatkan menjadi hanya dua angka penting)

Cara lain untuk menyusun ulang langkah terakhir ini adalah dengan mengganti `1700` dengan variabel `X` yang mewakili penerbitan ETH harian, dan untuk menyederhanakan sisanya menjadi:

- `Y = (X(10^3)/(7200 * 15)) = X/108`

Kita dapat menyederhanakan dan menulis ini sebagai fungsi dari `X`:

- `f(X) = X/108` di mana `X` adalah penerbitan ETH harian, dan `f(X)` mewakili harga gwei/gas yang diperlukan untuk mengimbangi semua ETH yang baru diterbitkan.

Jadi, misalnya, jika `X` (penerbitan ETH harian) naik menjadi 1800 berdasarkan total ETH yang dipertaruhkan, `f(X)` (gwei yang diperlukan untuk mengimbangi semua penerbitan) akan menjadi `17 gwei` (menggunakan 2 angka penting)

## Bacaan lebih lanjut {#further-reading}

- [Penggabungan](/roadmap/merge/)
- [Ultrasound.money](https://ultrasound.money/) - _Dasbor tersedia untuk memvisualisasikan penerbitan dan pembakaran ETH secara waktu nyata_
- [Memetakan Penerbitan Ethereum](https://www.attestant.io/posts/charting-ethereum-issuance/) - _Jim McDonald 2020_
