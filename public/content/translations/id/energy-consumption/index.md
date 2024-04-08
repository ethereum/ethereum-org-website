---
title: Konsumsi Energi Ethereum
description: Informasi dasar yang Anda perlukan untuk memahami konsumsi energi Ethereum.
lang: id
---

# Pengeluaran energi Ethereum {#proof-of-stake-energy}

Ethereum adalah rantai blok hijau. Mekanisme konsensus [bukti taruhan](/developers/docs/consensus-mechanisms/pos) Ethereum menggunakan ETH dan bukannya [energi untuk mengamankan jaringan](/developers/docs/consensus-mechanisms/pow). Konsumsi energi Ethereum sekitar [~0,0026 TWh/thn](https://carbon-ratings.com/eth-report-2022) di seluruh jaringan global.

Perkiraan konsumsi energi untuk Ethereum berasal dari studi [CCRI (Crypto Carbon Ratings Institute)](https://carbon-ratings.com). Mereka menghasilkan estimasi bottom-up dari konsumsi listrik dan jejak karbon jaringan Ethereum ([lihat laporannya](https://carbon-ratings.com/eth-report-2022)). Mereka mengukur konsumsi listrik dari berbagai titik yang berbeda dengan berbagai konfigurasi perangkat keras dan perangkat lunak klien. Perkiraan **2.601 MWh** (0,0026 TWh) untuk konsumsi listrik tahunan jaringan sesuai dengan emisi karbon tahunan sebesar **870 ton CO2e** dengan menggunakan faktor intensitas karbon spesifik regional. Nilai ini berubah ketika simpul masuk dan keluar dari jaringan - Anda dapat melacak menggunakan estimasi rata-rata 7 hari bergulir oleh [Indeks Keberlanjutan Jaringan Rantai Blok Cambridge](https://ccaf.io/cbnsi/ethereum) (perhatikan bahwa mereka menggunakan metode yang sedikit berbeda untuk estimasi mereka - perinciannya tersedia di situs mereka).

Untuk mengkontekstualisasikan konsumsi energi Ethereum, kita dapat membandingkan estimasi tahunan untuk beberapa produk dan industri lain. Hal ini membantu kita untuk lebih memahami apakah estimasi untuk Ethereum tinggi atau rendah.

<EnergyConsumptionChart />

Grafik di atas menampilkan perkiraan konsumsi energi tahunan dalam TWh/thn untuk Ethereum, dibandingkan dengan beberapa industri lainnya. Estimasi yang diberikan bersumber dari informasi yang tersedia untuk umum, yang diakses pada bulan Juli 2023, dengan tautan ke sumber-sumber yang tersedia pada tabel di bawah ini.

|                        | Konsumsi energi tahunan (TWh) | Perbandingan dengan PoS Ethereum |                                                                                      Sumber                                                                                       |
|:---------------------- |:-----------------------------:|:--------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| Pusat data global      |              190              |             73,000x              |                                    [sumber](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                    |
| Bitcoin                |              149              |             53,000x              |                                                                 [sumber](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Penambangan emas       |              131              |             50,000x              |                                                                 [sumber](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Bermain game di AS\* |              34               |             13,000x              |                 [sumber](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                 |
| PoW Ethereum           |              21               |              8,100x              |                                                                    [sumber](https://ccaf.io/cbnsi/ethereum/1)                                                                     |
| Google                 |              19               |              7,300x              |                                           [sumber](https://www.gstatic.com/gumdrop/sustainability/google-2022-environmental-report.pdf)                                           |
| Netflix                |             0,457             |               176x               | [sumber](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| PayPal                 |             0.26              |               100x               |                                  [sumber](https://s202.q4cdn.com/805890769/files/doc_downloads/global-impact/CDP_Climate_Change_PayPal-(1).pdf)                                   |
| AirBnB                 |             0.02              |                8x                |                               [sumber](https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-(Final).pdf)                               |
| **PoS Ethereum**       |          **0,0026**           |              **1x**              |                                                               [sumber](https://carbon-ratings.com/eth-report-2022)                                                                |

\*Mencakup perangkatan pengguna akhir seperti PC, laptop, dan konsol game.

Sangatlah rumit untuk mendapatkan estimasi yang akurat untuk konsumsi energi, terutama jika apa yang diukur memiliki rantai pasokan yang kompleks atau detail penyebaran yang memengaruhi efisiensinya. Misalnya, perkiraan konsumsi energi untuk Netflix dan Google bervariasai, tergantung pada apakah mereka hanya menyertakan energi yang digunakan untuk memelihara sistem mereka dan mengirmkan konten kepada pengguna (_pengeluaran langsung_) atau apakah mereka menyertakan pengeluaran yang diperlukan untuk memproduksi konten, menjalankan kantor korporat, mengiklankan, dan sebagainya (_pengeluaran tidak langsung_). Pengeluaran tidak langsung juga dapat mencakup energi yang dibutuhkan untuk mengonsumsi konten di perangkat pengguna akhir seperti TV, komputer, dan ponsel.

Perkiraan di atas bukanlah perbandingan yang tepat. Jumlah pengeluaran tidak langsung yang diperhitungkan berbeda-beda menurut sumber, dan jarang menyertakan energi dari perangkat pengguna akhir. Setiap sumber yang mendasari menyertakan detail selengkapnya tentang apa yang akan diukur.

Tabel dan grafik di atas juga menyertakan perbandingan dengan Bitcoin dan bukti kerja Ethereum. Penting untuk dicatat bahwa konsumsi energi jaringan bukti kerja tidaklah statis dan berubah dari hari ke hari. Perkiraan juga bisa sangat bervariasi antar sumber. Topik ini menarik berbagai [perdebatan](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/), bukan hanya mengenai jumlah energi yang dikonsumsi, tetapi juga mengenai sumber energi tersebut dan etika terkait. Konsumsi energi tidak selalu dapat dipetakan secara tepat ke jejak lingkungan karena proyek yang berbeda dapat menggunakan sumber energi yang berbeda, termasuk proporsi energi terbarukan yang lebih sedikit atau lebih banyak. Misalnya, [Indeks Konsumsi Listrik Bitcoin Cambridge](https://ccaf.io/cbnsi/cbeci/comparisons) mengindikasikan bahwa permintaan jaringan Bitcoin secara teoritis dapat ditenagai oleh pembakaran gas atau listrik yang akan hilang dalam transmisi dan distribusi. Rute Ethereum menuju keberlanjutan adalah dengan mengganti bagian jaringan yang haus energi dengan alternatif yang ramah lingkungan.

Anda dapat menelusuri konsumsi energi dan perkiraan emisi karbon untuk banyak industri di [situs Indeks Keberlanjutan Jaringan Rantai Blok Cambridge](https://ccaf.io/cbnsi/ethereum).

## Perkiraan per transaksi {#per-transaction-estimates}

Banyak artikel yang memperkirakan pengeluaran energi "per-transaksi" untuk rantai blok. Hal ini dapat menyesatkan karena energi yang dibutuhkan untuk mengajukan dan memvalidasi sebuah blok tidak bergantung pada jumlah transaksi di dalamnya. Masalahnya bukan pada unit pengeluaran energi per transaksi yang mengimplikasikan bahwa lebih sedikit transaksi akan menghasilkan pengeluaran energi yang lebih kecil dan sebaliknya. Selain itu, estimasi per-transaksi sangat sensitif terhadap bagaimana keluaran transaksi rantai blok didefinisikan, dan mengutak-atik definisi ini dapat dimainkan untuk membuat nilainya tampak lebih besar atau lebih kecil.

Di Ethereum, misalnya, keluaran transaksi tidak hanya dari lapisan dasar - ini juga merupakan jumlah keluaran transaksi dari semua rollup "[lapisan ke-2](/layer-2/)". Lapisan ke-2 umumnya tidak disertakan dalam perhitungan, tetapi dengan memperhitungkan energi tambahan yang dikonsumsi oleh pengurut (kecil) dan jumlah transaksi yang mereka proses (besar), kemungkinan besar akan mengurangi estimasi per transaksi secara drastis. Inilah salah satu alasan mengapa perbandingan konsumsi energi per transaksi di seluruh platform dapat menyesatkan.

## Utang karbon Ethereum {#carbon-debt}

Pengeluaran energi Ethereum sangat rendah, tetapi tidak selalu demikian. Ethereum pada awalnya menggunakan bukti kerja yang memiliki biaya lingkungan yang jauh lebih besar dibandingkan dengan mekanisme bukti taruhan saat ini.

Sejak awal, Ethereum berencana untuk mengimplementasikan mekanisme konsensus berbasis bukti taruhan, tetapi untuk melakukannya tanpa mengorbankan keamanan dan desentralisasi, diperlukan waktu bertahun-tahun untuk melakukan penelitian dan pengembangan yang terfokus. Oleh karena itu, mekanisme bukti kerja digunakan untuk memulai jaringan. Bukti kerja mengharuskan para penambang untuk menggunakan perangkat keras komputasi mereka untuk menghitung sebuah nilai, mengeluarkan energi dalam prosesnya.

![Membandingkan konsumsi energi Ethereum sebelum dan sesudah Penggabungan, menggunakan Menara Eiffel (tinggi 330 meter) di sebelah kiri untuk melambangkan konsumsi energi yang tinggi sebelum Penggabungan, dan figur Lego kecil setinggi 4 cm di sebelah kanan untuk melambangkan pengurangan dramatis dalam penggunaan energi setelah Penggabungan](energy_consumption_pre_post_merge.png)

CCRI memperkirakan bahwa Penggabungan mengurangi konsumsi listrik tahunan Ethereum hingga lebih dari **99,988%**. Demikian juga, jejak karbon Ethereum berkurang sekitar **99,992%** (dari 11,016,000 menjadi 870 ton CO2e). Untuk menempatkan hal ini dalam perspektif, pengurangan emisi seperti pergi dari ketinggian Menara Eiffel ke sebuah figur mainan plastik kecil, seperti yang diilustrasikan pada gambar di atas. Hasilnya, biaya lingkungan untuk mengamankan jaringan berkurang secara drastis. Pada saat yang sama, keamanan jaringan diyakini telah meningkat.

## Lapisan aplikasi hijau {#green-applications}

Meskipun konsumsi energi Ethereum sangat rendah, ada juga komunitas [**keuangan regeneratif (ReFi)**](/refi/) yang substansial, terus berkembang, dan sangat aktif yang dibangun di Ethereum. Aplikasi ReFi menggunakan komponen DeFi untuk membangun aplikasi keuangan yang memiliki eksternalitas positif yang bermanfaat bagi lingkungan. ReFi adalah bagian dari gerakan ["solarpunk"](https://en.wikipedia.org/wiki/Solarpunk) yang lebih luas yang selaras dengan Ethereum dan bertujuan untuk memadukan kemajuan teknologi dan pengelolaan lingkungan. Sifat Ethereum yang terdesentralisasi, tanpa izin, dan dapat disusun menjadikannya lapisan dasar yang ideal untuk komunitas ReFi dan solarpunk.

Platform pendanaan barang publik asli Web3 seperti [Gitcoin](https://gitcoin.co) menjalankan putaran iklim untuk menstimulasi pembangunan yang sadar lingkungan pada lapisan aplikasi Ethereum. Melalui pengembangan inisiatif-inisiatif ini (dan yang lainnya, misalnya [DeSci](/desci/)), Ethereum menjadi teknologi yang positif bagi lingkungan dan sosial.

<InfoBanner emoji=":evergreen_tree:">
  Jika menurut Anda halaman ini dapat dibuat lebih akurat, silakan ajukan masalah atau PR. Statistik di halaman ini adalah perkiraan berdasarkan data yang tersedia untuk umum - statistik ini tidak mewakili pernyataan atau janji resmi dari tim ethereum.org, atau Ethereum Foundation.
</InfoBanner>

## Bacaan lebih lanjut {#further-reading}

- [Indeks Keberlanjutan Jaringan Rantai Blok Cambridge](https://ccaf.io/cbnsi/ethereum)
- [Laporan Gedung Putih tentang rantai blok bukti kerja](https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [Emisi Ethereum: Perkiraan dari Bawah ke Atas](https://kylemcdonald.github.io/ethereum-emissions/) - _Kyle McDonald_
- [Indeks Konsumsi Energi Ethereum](https://digiconomist.net/ethereum-energy-consumption/) - _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) - _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [Penggabungan - Implikasi pada Konsumsi Listrik dan Jejak Karbon Jaringan Ethereum](https://carbon-ratings.com/eth-report-2022) - _CCRI_
- [Konsumsi energi Ethereum](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)

## Topik terkait {#related-topics}

- [Visi Ethereum](/roadmap/vision/)
- [Rantai Suar](/roadmap/beacon-chain)
- [Penggabungan](/roadmap/merge/)
