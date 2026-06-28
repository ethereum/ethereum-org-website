---
title: Konsumsi Energi Ethereum
description: Informasi dasar yang perlu Anda ketahui untuk memahami konsumsi energi Ethereum.
lang: id
---

# Pengeluaran energi Ethereum {#proof-of-stake-energy}

[Ethereum](/) adalah blockchain yang ramah lingkungan. [Mekanisme konsensus](/developers/docs/consensus-mechanisms/pos) [proof-of-stake](/developers/docs/consensus-mechanisms/pos) Ethereum menggunakan ETH alih-alih [energi untuk mengamankan jaringan](/developers/docs/consensus-mechanisms/pow). Konsumsi energi Ethereum adalah sekitar [\~0,0026 TWh/tahun](https://carbon-ratings.com/eth-report-2022) di seluruh jaringan global.

Perkiraan konsumsi energi untuk Ethereum berasal dari studi [CCRI (Crypto Carbon Ratings Institute)](https://carbon-ratings.com). Mereka menghasilkan perkiraan bottom-up dari konsumsi listrik dan jejak karbon jaringan Ethereum ([lihat laporannya](https://carbon-ratings.com/eth-report-2022)). Mereka mengukur konsumsi listrik dari berbagai node dengan berbagai konfigurasi perangkat keras dan perangkat lunak klien. Perkiraan **2.601 MWh** (0,0026 TWh) untuk konsumsi listrik tahunan jaringan setara dengan emisi karbon tahunan sebesar **870 ton CO2e** dengan menerapkan faktor intensitas karbon spesifik regional. Nilai ini berubah seiring dengan masuk dan keluarnya node dari jaringan - Anda dapat melacaknya menggunakan perkiraan rata-rata bergulir 7 hari oleh [Cambridge Blockchain network Sustainability Index](https://ccaf.io/cbnsi/ethereum) (perhatikan bahwa mereka menggunakan metode yang sedikit berbeda untuk perkiraan mereka - detail tersedia di situs mereka).

Untuk mengontekstualisasikan konsumsi energi Ethereum, kita dapat membandingkan perkiraan tahunan untuk beberapa produk dan industri lain. Hal ini membantu kita lebih memahami apakah perkiraan untuk Ethereum tinggi atau rendah.

<EnergyConsumptionChart />

Grafik di atas menampilkan perkiraan konsumsi energi dalam TWh/tahun untuk Ethereum, dibandingkan dengan beberapa produk dan industri lainnya. Perkiraan yang diberikan bersumber dari informasi yang tersedia untuk umum, diakses pada Juli 2023, dengan tautan ke sumber yang tersedia pada tabel di bawah ini.

|                     | Konsumsi energi tahunan (TWh) | Perbandingan dengan PoS Ethereum |                                                                                      Sumber                                                                                       |
| :------------------ | :---------------------------------: | :------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Pusat data global |                 190                 |          73.000x           |                                    [sumber](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                    |
| Bitcoin             |                 149                 |          53.000x           |                                                                 [sumber](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Penambangan emas         |                 131                 |          50.000x           |                                                                 [sumber](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Bermain game di AS\*     |                 34                  |          13.000x           |                 [sumber](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                 |
| PoW Ethereum        |                 21                  |           8.100x           |                                                                    [sumber](https://ccaf.io/cbnsi/ethereum/1)                                                                     |
| Google              |                 19                  |           7.300x           |                                           [sumber](https://www.gstatic.com/gumdrop/sustainability/google-2022-environmental-report.pdf)                                           |
| Netflix             |                0,457                |            176x            | [sumber](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| PayPal              |                0,26                 |            100x            |                                 [sumber](<https://s202.q4cdn.com/805890769/files/doc_downloads/global-impact/CDP_Climate_Change_PayPal-(1).pdf>)                                  |
| AirBnB              |                0,02                 |             8x             |                              [sumber](<https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-(Final).pdf>)                              |
| **PoS Ethereum**    |             **0,0026**              |           **1x**           |                                                               [sumber](https://carbon-ratings.com/eth-report-2022)                                                                |

\*Termasuk perangkat pengguna akhir seperti PC, laptop, dan konsol game.

Mendapatkan perkiraan yang akurat untuk konsumsi energi adalah hal yang rumit, terutama ketika apa yang diukur memiliki rantai pasokan yang kompleks atau detail penerapan yang memengaruhi efisiensinya. Misalnya, perkiraan konsumsi energi untuk Netflix dan Google bervariasi tergantung pada apakah mereka hanya menyertakan energi yang digunakan untuk memelihara sistem mereka dan mengirimkan konten kepada pengguna (_pengeluaran langsung_) atau apakah mereka menyertakan pengeluaran yang diperlukan untuk memproduksi konten, menjalankan kantor perusahaan, beriklan, dll (_pengeluaran tidak langsung_). Pengeluaran tidak langsung juga dapat mencakup energi yang dibutuhkan untuk mengonsumsi konten pada perangkat pengguna akhir seperti TV, komputer, dan ponsel.

Perkiraan di atas bukanlah perbandingan yang sempurna. Jumlah pengeluaran tidak langsung yang diperhitungkan bervariasi berdasarkan sumber, dan jarang menyertakan energi dari perangkat pengguna akhir. Setiap sumber yang mendasarinya menyertakan lebih banyak detail tentang apa yang sedang diukur.

Tabel dan grafik di atas juga menyertakan perbandingan dengan Bitcoin dan proof-of-work Ethereum. Penting untuk dicatat bahwa konsumsi energi dari jaringan proof-of-work tidak statis dan berubah dari hari ke hari. Perkiraan juga dapat sangat bervariasi antar sumber. Topik ini menarik [perdebatan](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/) yang bernuansa, tidak hanya tentang jumlah energi yang dikonsumsi, tetapi juga tentang sumber energi tersebut dan etika yang terkait. Konsumsi energi tidak selalu memetakan secara tepat ke jejak lingkungan karena proyek yang berbeda mungkin menggunakan sumber energi yang berbeda, termasuk proporsi energi terbarukan yang lebih kecil atau lebih besar. Misalnya, [Cambridge Bitcoin Electricity Consumption Index](https://ccaf.io/cbnsi/cbeci/comparisons) menunjukkan bahwa permintaan jaringan Bitcoin secara teoritis dapat didukung oleh pembakaran gas atau listrik yang jika tidak akan hilang dalam transmisi dan distribusi. Rute Ethereum menuju keberlanjutan adalah mengganti bagian jaringan yang haus energi dengan alternatif yang ramah lingkungan.

Anda dapat menelusuri perkiraan konsumsi energi dan emisi karbon untuk banyak industri di [situs Cambridge Blockchain Network Sustainability Index](https://ccaf.io/cbnsi/ethereum).

## Perkiraan per transaksi {#per-transaction-estimates}

Banyak artikel memperkirakan pengeluaran energi "per transaksi" untuk blockchain. Hal ini dapat menyesatkan karena energi yang dibutuhkan untuk mengusulkan dan memvalidasi sebuah blok tidak bergantung pada jumlah transaksi di dalamnya. Unit pengeluaran energi per transaksi menyiratkan bahwa lebih sedikit transaksi akan mengarah pada pengeluaran energi yang lebih kecil dan sebaliknya, yang mana tidak demikian. Selain itu, perkiraan per transaksi sangat sensitif terhadap bagaimana throughput transaksi blockchain didefinisikan, dan mengubah definisi ini dapat dimanipulasi untuk membuat nilainya tampak lebih besar atau lebih kecil.

Di Ethereum, misalnya, throughput transaksi tidak hanya pada lapisan dasar - ini juga merupakan jumlah throughput transaksi dari semua rollup "[layer 2](/layer-2/)"-nya. Layer 2 umumnya tidak disertakan dalam perhitungan, tetapi memperhitungkan energi tambahan yang dikonsumsi oleh sequencer (kecil) dan jumlah transaksi yang mereka proses (besar) kemungkinan akan secara drastis mengurangi perkiraan per transaksi. Ini adalah salah satu alasan mengapa perbandingan konsumsi energi per transaksi di berbagai platform dapat menyesatkan.

## Utang karbon Ethereum {#carbon-debt}

Pengeluaran energi Ethereum sangat rendah, tetapi tidak selalu demikian. Ethereum pada awalnya menggunakan proof-of-work yang memiliki biaya lingkungan yang jauh lebih besar daripada mekanisme proof-of-stake saat ini.

Sejak awal, Ethereum berencana untuk menerapkan mekanisme konsensus berbasis proof-of-stake, tetapi melakukannya tanpa mengorbankan keamanan dan desentralisasi membutuhkan penelitian dan pengembangan terfokus selama bertahun-tahun. Oleh karena itu, mekanisme proof-of-work digunakan untuk memulai jaringan. Proof-of-work mengharuskan penambang untuk menggunakan perangkat keras komputasi mereka untuk menghitung sebuah nilai, yang menghabiskan energi dalam prosesnya.

![Membandingkan konsumsi energi Ethereum sebelum dan sesudah The Merge, menggunakan Menara Eiffel (tinggi 330 meter) di sebelah kiri untuk melambangkan konsumsi energi yang tinggi sebelum The Merge, dan figur Lego kecil setinggi 4 cm di sebelah kanan untuk mewakili pengurangan dramatis dalam penggunaan energi setelah The Merge](energy_consumption_pre_post_merge.png)

CCRI memperkirakan bahwa The Merge mengurangi konsumsi listrik tahunan Ethereum hingga lebih dari **99,988%**. Demikian pula, jejak karbon Ethereum berkurang sekitar **99,992%** (dari 11.016.000 menjadi 870 ton CO2e). Untuk menempatkan ini dalam perspektif, pengurangan emisi ini seperti beralih dari ketinggian Menara Eiffel ke figur mainan plastik kecil, seperti yang diilustrasikan pada gambar di atas. Akibatnya, biaya lingkungan untuk mengamankan jaringan berkurang secara drastis. Pada saat yang sama, keamanan jaringan diyakini telah meningkat.

## Lapisan aplikasi yang ramah lingkungan {#green-applications}

Meskipun konsumsi energi Ethereum sangat rendah, ada juga komunitas [**keuangan regeneratif (ReFi)**](/refi/) yang substansial, berkembang, dan sangat aktif yang membangun di atas Ethereum. Aplikasi ReFi menggunakan komponen DeFi untuk membangun aplikasi keuangan yang memiliki eksternalitas positif yang bermanfaat bagi lingkungan. ReFi adalah bagian dari gerakan ["solarpunk"](https://en.wikipedia.org/wiki/Solarpunk) yang lebih luas yang selaras dengan Ethereum dan bertujuan untuk menggabungkan kemajuan teknologi dan pemeliharaan lingkungan. Sifat Ethereum yang terdesentralisasi, tanpa izin, dan dapat disusun menjadikannya lapisan dasar yang ideal untuk komunitas ReFi dan solarpunk.

Platform pendanaan barang publik asli Web3 seperti [Gitcoin](https://gitcoin.co) menjalankan putaran iklim untuk merangsang pembangunan yang sadar lingkungan pada lapisan aplikasi Ethereum. Melalui pengembangan inisiatif ini (dan lainnya, mis., [DeSci](/desci/)), Ethereum menjadi teknologi yang positif secara bersih bagi lingkungan dan sosial.

<Alert variant="update">
<AlertEmoji text=":evergreen_tree:" />
<AlertContent>
<AlertDescription>
  Jika Anda merasa halaman ini dapat dibuat lebih akurat, silakan buat issue atau PR. Statistik di halaman ini adalah perkiraan berdasarkan data yang tersedia untuk umum - statistik tersebut tidak mewakili pernyataan atau janji resmi dari tim ethereum.org, atau Ethereum Foundation.
</AlertDescription>
</AlertContent>
</Alert>

## Bacaan lebih lanjut {#further-reading}

- [Cambridge Blockchain Network Sustainability Index](https://ccaf.io/cbnsi/ethereum)
- [Laporan Gedung Putih tentang blockchain proof-of-work](https://web.archive.org/web/20221109005700/https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [Emisi Ethereum: Perkiraan Bottom-up](https://kylemcdonald.github.io/ethereum-emissions/) - _Kyle McDonald_
- [Indeks Konsumsi Energi Ethereum](https://digiconomist.net/ethereum-energy-consumption/) - _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) - _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [The Merge - Implikasi pada Konsumsi Listrik dan Jejak Karbon Jaringan Ethereum](https://carbon-ratings.com/eth-report-2022) - _CCRI_
- [Konsumsi energi Ethereum](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)

## Topik terkait {#related-topics}

- [Beacon Chain](/roadmap/beacon-chain)
- [The Merge](/roadmap/merge/)