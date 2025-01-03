---
title: Bagaimana Penggabungan mempengaruhi pasokan ETH
description: Perincian tentang bagaimana Penggabungan mempengaruhi pasokan ETH
lang: id
---

# Bagaimana Penggabungan mempengaruhi pasokan ETH {#how-the-merge-impacts-ETH-supply}

Penggabungan mewakili transisi jaringan Ethereum dari bukti kerja ke bukti taruhan yang terjadi pada bulan September 2022. Cara ETH diterbitkan mengalami perubahan pada saat masa transisi tersebut. Sebelumnya, ETH baru telah diterbitkan dari dua sumber: lapisan eksekusi (yaitu. Jaringan Utama) dan lapisan konsensus (yaitu. Rantai Suar). Sejak Penggabungan, penerbitan pada lapisan eksekusi sekarang menjadi nol. Mari kita uraikan hal ini.

## Komponen penerbitan ETH {#components-of-eth-issuance}

Kita dapat memecah pasokan ETH menjadi dua kekuatan utama: penerbitan dan pembakaran.

**Penerbitan** ETH adalah proses pembuatan ETH yang sebelumnya tidak ada. **Pembakaran** ETH adalah ketika ETH yang ada dihancurkan, menghapusnya dari peredaran. Laju penerbitan dan pembakaran dihitung berdasarkan beberapa parameter, dan keseimbangan di antara keduanya menentukan tingkat inflasi/deflasi ether yang dihasilkan.

<Card
emoji=":chart_decreasing:"
title="Ringkasan penerbitan ETH">

- Sebelum beralih ke bukti taruhan, penambang diterbitkan sekitar 13.000 ETH/hari
- Penaruh diterbitkan sekitar 1.700 ETH/hari, berdasarkan sekitar 14 juta total ETH yang dipertaruhkan
- Penerbitan penaruhan yang tepat berfluktuasi berdasarkan jumlah total ETH yang dipertaruhkan
- **Sejak Penggabungan, hanya tersisa ~1.700 ETH/hari, menurunkan total penerbitan ETH baru sebesar ~88%**
- Pembakaran: Ini berfluktuasi sesuai dengan permintaan jaringan. _Jika_ harga gas rata-rata setidaknya 16 gwei diamati pada hari tertentu, ini secara efektif mengimbangi ~1.700 ETH yang diternitkan untuk validator dan membuat inflasi ETH bersih menjadi nol atau kurang untuk hari itu.

</Card>

## Pra-penggabungan (historis) {#pre-merge}

### Penerbitan lapisan eksekusi {#el-issuance-pre-merge}

Pada bukti kerja, penambang hanya berinteraksi dengan lapisan eksekusi dan mendapatkan reward blok jika mereka adalah penambang pertama yang menyelesaikan blok berikutnya. Sejak [peningkatan Constantinople](/history/#constantinople) pada tahun 2019, rewardnya adalah 2 ETH per blok. Para penambang juga diberi imbalan dengan menerbitkan blok [ommer](/glossary/#ommer), yang merupakan blok valid yang tidak berakhir di rantai terpanjang/kanonik. Imbalan ini maksimal sebesar 1,75 ETH per ommer, dan _sebagai tambahan untuk_ imbalan yang diterbitkan dari blok kanonik. Proses penambangan adalah kegiatan yang intensif secara ekonomi, yang secara historis membutuhkan tingkat penerbitan ETH yang tinggi untuk mempertahankannya.

### Penerbitan lapisan konsensus {#cl-issuance-pre-merge}

[Rantai Suar](/history/#beacon-chain-genesis) mulai beroperasi pada tahun 2020. Alih-alih penambang, ini diamankan oleh validator menggunakan bukti taruhan. Rantai ini di-bootstrap oleh pengguna Ethereum yang menyetor ETH satu arah ke dalam kontrak pintar di Jaringan Utama (lapisan eksekusi), yang kemudian didengarkan oleh Rantai Suar, dan mengkreditkan pengguna dengan jumlah ETH yang sama di rantai yang baru. Hingga Penggabungan terjadi, validator Rantai Suar tidak memproses transaksi dan pada dasarnya mencapai konsensus tentang keadaan kumpulan validator itu sendiri.

Validator di Rantai Suar diberi imbalan dengan ETH karena telah membuktikan status rantai dan mengusulkan blok. Imbalan (atau penalti) dihitung dan didistribusikan pada setiap jangka waktu (setiap 6,4 menit) berdasarkan kinerja validator. Imbalan validator **secara signifikan** lebih kecil daripada imbalan penambangan yang sebelumnya dikeluarkan di bawah bukti kerja (2 ETH setiap ~13,5 detik), karena mengoperasikan simpul validasi tidak terlalu membutuhkan biaya yang besar sehingga tidak membutuhkan imbalan yang tinggi.

### Pembagian penerbitan sebelum penggabungan {#pre-merge-issuance-breakdown}

Total pasokan ETH: **~120.520.000 ETH** (saat Penggabungan pada September 2022)

**Penerbitan lapisan eksekusi:**

- Diperkirakan sekitar 2,08 ETH setiap 13,3 detik\*: **~4.930.000** ETH diterbitkan dalam setahun
- Menghasilkan tingkat inflasi sekitar **sekitar 4,09%** (4,93 juta per tahun / total 120,5 juta)
- \*Ini termasuk 2 ETH per blok kanonikal, ditambah rata-rata 0,08 ETH dari blok ommer dari waktu ke waktu. Juga menggunakan waktu 13,3 detik, target waktu blok dasar tanpa pengaruh dari [bom kesulitan](/glossary/#difficulty-bomb). ([Lihat sumber](https://bitinfocharts.com/ethereum/))

**Penerbitan lapisan konsensus:**

- Dengan menggunakan total 14.000.000 ETH yang dipertaruhkan, tingkat penerbitan ETH adalah sekitar 1700 ETH/hari ([Lihat sumber](https://ultrasound.money/))
- Hasilnya adalah **~620.500** ETH yang diterbitkan dalam setahun
- Menghasilkan tingkat inflasi **sekitar 0,52%** (620,5 ribu per tahun / total 119,3 juta)

<InfoBanner>
<strong>Tingkat penerbitan tahunan total (sebelum penggabungan): ~4,61%</strong> (4,09% + 0,52%)<br/><br/>
<strong>~88,7%</strong> dari penerbitan diberikan kepada penambang pada lapisan eksekusi (4,09 / 4,61 * 100)<br/><br/>
<strong>~11,3%</strong> diterbitkan kepada para penaruh pada lapisan konsensus (0,52 / 4,61 * 100)
</InfoBanner>

## Setelah penggabungan (saat ini) {#post-merge}

### Penerbitan lapisan eksekusi {#el-issuance-post-merge}

Penerbitan lapisan eksekusi sejak Penggabungan adalah nol. Bukti kerja bukan lagi cara yang valid untuk produksi blok berdasarkan aturan konsensus yang telah ditingkatkan. Seluruh aktivitas lapisan eksekusi dikemas ke dalam "blok suar", yang dipublikasikan dan diakui oleh validator bukti taruhan. Imbalan untuk membuktikan dan menerbitkan blok suar dihitung secara terpisah pada lapisan konsensus.

### Penerbitan lapisan konsensus {#cl-issuance-post-merge}

Penerbitan lapisan konsensus berlanjut hingga hari ini seperti sebelum Penggabungan, dengan imbalan kecil untuk validator yang menyetujui dan mengusulkan blok. Imbalan validator terus mengalir ke _saldo validator_ yang dikelola di dalam lapisan konsensus. Berbeda dengan akun saat ini (akun "eksekusi"), yang dapat melakukan transaksi di Jaringan Utama, akun Ethereum ini terpisah dan tidak dapat bertransaksi secara bebas dengan akun Ethereum lainnya. Dana di akun-akun ini hanya dapat ditarik ke satu alamat eksekusi yang ditentukan.

Sejak peningkatan Shanghai/Capella yang terjadi pada April 2023, penarikan ini telah diaktifkan untuk para penaruh. Penaruh di anjurkan untuk mengambil _pendapatan/imbalan (saldo di atas 32 ETH)_ mereka karena dana tersebut sebaliknya tidak berkontribusi pada bobot taruhan mereka (yang mencapai maksimal 32).

Penaruh juga dapat memilih untuk keluar dan menarik seluruh saldo validator mereka. Untuk memastikan Ethereum tetap stabil, jumlah validator yang keluar secara bersamaan dibatasi.

Kira kira sekitar 0,33% dari total jumlah validator dapat keluar dalam satu hari tertentu. Secara default, empat (4) validator dapat keluar untuk setiap jangka waktu (setiap 6,4 menit, atau 900 per hari). Satu (1) validator tambahan diperbolehkan keluar untuk setiap 65.536 (2<sup>16</sup>) validator tambahan di atas 262.144 (2<sup>18</sup>). Sebagai contoh, dengan lebih dari 327.680 validator, lima (5) validator dapat keluar untuk setiap jangka waktu (1.125 per hari). Enam (6) validator akan diizinkan dengan jumlah validator aktif total lebih dari 393.216, dan seterusnya.

Seiring bertambahnya validator yang menarik diri, jumlah maksimum validator yang keluar akan secara bertahap berkurang menjadi minimum empat untuk sengaja mencegah jumlah ETH yang dipertaruhkan besar dan mengganggu yang ditarik secara bersamaan.

### Pembagian inflasi setelah penggabungan {#post-merge-inflation-breakdown}

- Total pasokan ETH: **~120.520.000 ETH** (saat Penggabungan pada September 2022)
- Penerbitan lapisan eksekusi: **0**
- Penerbitan lapisan konsensus: Sama seperti sebelumnya, tingkat penerbitan tahunan sebesar **~0,52%** (dengan total 14 juta ETH yang dipertaruhkan)

<InfoBanner>
Tingkat penerbitan tahunan total: <strong>~0,52%</strong><br/><br/>
Pengurangan bersih dalam penerbitan ETH tahunan: <strong>~88,7%</strong> ((4,61% - 0,52%) / 4,61% * 100)
</InfoBanner>

## <Emoji text=":fire:" size="1" /> Pembakaran {#the-burn}

Kekuatan berlawanan dengan penerbitan ETH adalah tingkat pembakaran ETH. Untuk sebuah transaksi dieksekusi di Ethereum, biaya minimum (dikenal sebagai "biaya dasar") harus dibayarkan, yang terus berfluktuasi (dari blok ke blok) tergantung pada aktivitas jaringan. Biaya tersebut dibayarkan dalam bentuk ETH dan _wajib_ agar transaksi dianggap sah. Biaya ini akan _dibakar_ selama proses transaksi, mengeluarkannya dari sirkulasi.

<InfoBanner>
Pembakaran biaya diaktifkan dengan <a href="/history/#london">peningkatan London</a> pada Agustus 2021, dan tetap tidak berubah sejak Terjadinya Penggabungan.
</InfoBanner>

Selain pembakaran biaya yang diimplementasikan oleh peningkatan London, validator juga dapat dikenakan denda karena tidak aktif, atau bahkan lebih buruk lagi, mereka dapat dipotong karena melanggar aturan tertentu yang mengancam keamanan jaringan. Penalti ini mengakibatkan pengurangan ETH dari saldo validator tersebut, yang tidak langsung diberikan sebagai imbalan kepada akun lain, secara efektif dibakar/mengeluarkannya dari sirkulasi.

### Menghitung harga gas rata-rata untuk deflasi {#calculating-average-gas-price-for-deflation}

Seperti yang dibahas di atas, jumlah ETH yang diterbitkan dalam satu hari tertentu tergantung pada total ETH yang dipertaruhkan. Pada saat penulisan ini, jumlahnya kira-kira adalah 1700 ETH per hari.

Untuk menentukan harga gas rata-rata yang diperlukan untuk sepenuhnya menutupi penerbitan dalam periode 24 jam tertentu, kita akan mulai dengan menghitung total jumlah blok dalam sehari, dengan waktu blok 12 detik:

- `(1 blok / 12 detik) * (60 detik/menit) = 5 blok/menit`
- `(5 blok/menit) * (60 menit/jam) = 300 blok/jam`
- `(300 blok/jam) * (24 jam/hari) = 7200 blok/hari`

Setiap blok ditargetkan untuk `15x10^6 gas/block` ([selanjutnya tentang gas](/developers/docs/gas/)). Dengan demikian, kita dapat mencari solusi untuk harga gas rata-rata (dalam satuan gwei/gas) yang diperlukan untuk menutupi penerbitan, dengan total penerbitan ETH harian sebesar 1700 ETH:

- `7200 blocks/day * 15x10^6 gas/block *`**`Y gwei/gas`**`* 1 ETH/ 10^9 gwei = 1700 ETH/day`

Menyelesaikan untuk `Y`:

- `Y = (1700(10^9))/(7200 * 15(10^6)) = (17x10^3)/(72 * 15) = 16 gwei` (dibulatkan menjadi hanya dua angka penting)

Cara lain untuk menyusun ulang langkah terakhir adalah dengan mengganti `1700` dengan variabel `X` yang mewakili penerbitan ETH harian, dan menyederhanakan sisanya menjadi:

- `Y = (X(10^3)/(7200 * 15)) = X/108`

Kita bisa menyederhanakan dan menulisnya sebagai fungsi dari `X`:

- `f(X) = X/108` di mana `X` adalah penerbitan ETH harian, dan `f(X)` mewakili harga gwei/gas yang diperlukan untuk menutupi semua ETH yang baru diterbitkan.

Jadi, sebagai contoh, jika `X` (penerbitan ETH harian) meningkat menjadi 1800 berdasarkan total ETH yang dipertaruhkan, maka `f(X)` (harga gwei yang diperlukan untuk menutupi seluruh penerbitan) akan menjadi `17 gwei` (menggunakan 2 angka penting)

## Bacaan lebih Lanjut {#further-reading}

- [Penggabungan](/roadmap/merge/)
- [Ultrasound.money](https://ultrasound.money/) - _Dasbor yang tersedia untuk memvisualisasikan penerbitan dan pembakaran ETH secara real-time_
- [Charting Ethereum Issuance](https://www.attestant.io/posts/charting-ethereum-issuance/) - _Jim McDonald 2020_
