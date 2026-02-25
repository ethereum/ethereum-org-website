---
title: PeerDAS
description: Pelajari tentang PeerDAS sebagai bagian dari peningkatan protokol Ethereum Fusaka
lang: id
---

# PeerDAS {#peer-das}

Protokol Ethereum sedang menjalani peningkatan penskalaan yang paling signifikan sejak [diperkenalkannya transaksi blob dengan EIP-4844](/roadmap/danksharding/). Sebagai bagian dari [peningkatan Fusaka](/roadmap/fusaka/), PeerDAS memperkenalkan cara baru dalam menangani data blob, yang memberikan peningkatan kapasitas **[ketersediaan data (DA)](/developers/docs/data-availability/)** untuk L2 sekitar satu urutan besaran.

[Selengkapnya tentang peta perjalanan penskalaan blob](https://blog.ethereum.org/2025/08/22/protocol-update-002)

## Skalabilitas {#scalability}

Visi Ethereum adalah menjadi platform yang netral, aman, dan terdesentralisasi yang tersedia untuk semua orang di dunia. Seiring pertumbuhan penggunaan jaringan, hal ini memerlukan penyeimbangan trilema skala, keamanan, dan desentralisasi jaringan. Jika Ethereum hanya meningkatkan data yang ditangani oleh jaringan dalam desainnya saat ini, ia akan berisiko membebani [simpul-simpul yang diandalkan Ethereum untuk desentralisasinya](/developers/docs/nodes-and-clients/). Skalabilitas memerlukan desain mekanisme yang ketat yang meminimalkan trade-off.

Salah satu strategi untuk mencapai tujuan ini adalah dengan memungkinkan ekosistem solusi penskalaan lapisan ke-2 yang beragam daripada memproses semua transaksi di Jaringan Utama [lapisan ke-1 (L1)](/glossary/#layer-1). [Lapisan ke-2 (L2)](/glossary/#layer-2) atau [rollup](/glossary#rollups) memproses transaksi pada rantai terpisahnya sendiri dan menggunakan Ethereum untuk verifikasi dan keamanan. Menerbitkan hanya komitmen yang kritis terhadap keamanan dan mengompresi payload memungkinkan L2 menggunakan kapasitas DA Ethereum secara lebih efisien. Pada gilirannya, L1 membawa lebih sedikit data tanpa mengorbankan jaminan keamanan, sementara L2 menampung lebih banyak pengguna dengan biaya gas yang lebih rendah. Awalnya, L2 menerbitkan data sebagai `calldata` dalam transaksi biasa, yang bersaing dengan transaksi L1 untuk gas dan tidak praktis untuk ketersediaan data massal.

## Proto-Danksharding {#proto-danksharding}

Langkah besar pertama menuju penskalaan L2 adalah peningkatan Dencun, yang memperkenalkan [Proto-Danksharding](/roadmap/danksharding/) (EIP-4844). Peningkatan ini menciptakan tipe data baru yang terspesialisasi untuk rollup yang disebut blob. [Blob](/developers/docs/data-availability/blockchain-data-storage-strategies/#eip-4844-blobs), atau objek besar biner, adalah potongan data arbitrer yang bersifat sementara yang tidak memerlukan eksekusi EVM dan hanya disimpan oleh simpul untuk waktu yang terbatas. Pemrosesan yang lebih efisien ini memungkinkan L2 untuk memublikasikan lebih banyak data ke Ethereum dan melakukan penskalaan lebih jauh lagi.

Meskipun sudah memiliki manfaat yang kuat untuk penskalaan, penggunaan blob hanyalah bagian dari tujuan akhir. Dalam protokol saat ini, setiap simpul dalam jaringan masih perlu mengunduh setiap blob. Hambatannya menjadi bandwidth yang diperlukan oleh masing-masing simpul, dengan jumlah data yang perlu diunduh meningkat secara langsung seiring dengan jumlah blob yang lebih tinggi.

Ethereum tidak berkompromi pada desentralisasi, dan bandwidth adalah salah satu parameter yang paling sensitif. Bahkan dengan komputasi canggih yang tersedia secara luas bagi siapa saja yang mampu membelinya, [keterbatasan bandwidth unggah](https://www.speedtest.net/global-index) bahkan di kota-kota yang sangat urban di negara maju (seperti [Jerman](https://www.speedtest.net/global-index/germany), [Belgia](https://www.speedtest.net/global-index/belgium), [Australia](https://www.speedtest.net/global-index/australia) atau [Amerika Serikat](https://www.speedtest.net/global-index/united-states)) dapat membatasi simpul sehingga hanya dapat dijalankan dari pusat data jika persyaratan bandwidth tidak diatur dengan cermat.

Operator simpul memiliki persyaratan bandwidth dan ruang disk yang semakin tinggi seiring dengan bertambahnya blob. Ukuran dan kuantitas blob dibatasi oleh batasan ini. Setiap blob dapat membawa hingga 128kb data dengan rata-rata 6 blob per blok. Ini hanyalah langkah pertama menuju desain masa depan yang menggunakan blob dengan cara yang lebih efisien lagi.

## Pengambilan sampel ketersediaan data {#das}

[Ketersediaan data](/developers/docs/data-availability/) adalah jaminan bahwa semua data yang diperlukan untuk memvalidasi rantai secara independen dapat diakses oleh semua peserta jaringan. Ini memastikan bahwa data telah dipublikasikan sepenuhnya dan dapat digunakan untuk memverifikasi status baru dari rantai atau transaksi yang masuk tanpa memerlukan kepercayaan.

Blob Ethereum memberikan jaminan ketersediaan data yang kuat yang menjamin keamanan L2. Untuk melakukan ini, simpul Ethereum perlu mengunduh dan menyimpan blob secara keseluruhan. Tetapi bagaimana jika kita dapat mendistribusikan blob di jaringan secara lebih efisien dan menghindari batasan ini?

Pendekatan yang berbeda untuk menyimpan data dan memastikan ketersediaannya adalah **pengambilan sampel ketersediaan data (DAS)**. Daripada setiap komputer yang menjalankan Ethereum menyimpan setiap blob secara penuh, DAS memperkenalkan pembagian kerja yang terdesentralisasi. Ini memecah beban pemrosesan data dengan mendistribusikan tugas-tugas yang lebih kecil dan dapat dikelola ke seluruh jaringan simpul. Blob dibagi menjadi beberapa bagian dan setiap simpul hanya mengunduh beberapa bagian menggunakan mekanisme untuk distribusi acak yang seragam di semua simpul.

Ini menimbulkan masalah baru—membuktikan ketersediaan dan integritas data. Bagaimana jaringan dapat menjamin bahwa data tersedia dan semuanya benar ketika masing-masing simpul hanya memegang potongan-potongan kecil? Sebuah simpul jahat dapat menyajikan data palsu dan dengan mudah merusak jaminan ketersediaan data yang kuat! Di sinilah kriptografi berperan untuk membantu.

Untuk memastikan integritas data, EIP-4844 sudah diimplementasikan dengan komitmen KZG. Ini adalah bukti kriptografis yang dibuat ketika sebuah blob baru ditambahkan ke jaringan. Sebuah bukti kecil disertakan dalam setiap blok, dan simpul dapat memverifikasi bahwa blob yang diterima sesuai dengan komitmen KZG blok tersebut.

DAS adalah mekanisme yang dibangun di atas ini dan memastikan data benar sekaligus tersedia. Pengambilan sampel adalah proses di mana sebuah simpul hanya menanyakan sebagian kecil dari data dan memverifikasinya terhadap komitmen. KZG adalah skema komitmen polinomial yang berarti bahwa setiap titik tunggal pada kurva polinomial dapat diverifikasi. Dengan memeriksa hanya beberapa titik pada polinomial, klien yang melakukan pengambilan sampel dapat memiliki jaminan probabilistik yang kuat bahwa data tersebut tersedia.

## PeerDAS {#peer-das}

[PeerDAS (EIP-7594)](https://eips.ethereum.org/EIPS/eip-7594) adalah proposal spesifik yang mengimplementasikan mekanisme DAS di Ethereum, yang mungkin menandai peningkatan terbesar sejak Penggabungan. PeerDAS dirancang untuk memperluas data blob, membaginya menjadi beberapa kolom dan mendistribusikan subset ke simpul-simpul.

Ethereum menggunakan beberapa matematika cerdas untuk mencapai ini: ia menerapkan pengodean penghapusan gaya Reed-Solomon ke data blob. Data blob direpresentasikan sebagai polinomial yang koefisiennya mengodekan data, kemudian mengevaluasi polinomial tersebut pada titik-titik tambahan untuk membuat blob yang diperluas, sehingga menggandakan jumlah evaluasi. Redundansi tambahan ini memungkinkan pemulihan penghapusan: bahkan jika beberapa evaluasi hilang, blob asli dapat direkonstruksi selama setidaknya setengah dari total data, termasuk potongan yang diperluas, tersedia.

![Polinomial yang diperluas](./polynomial.png)

Pada kenyataannya, polinomial ini memiliki ribuan koefisien. Komitmen KZG adalah nilai dari beberapa bita, seperti sebuah hash, yang diketahui oleh semua simpul. Setiap simpul yang memegang titik data yang cukup dapat [merekonstruksi satu set lengkap data blob secara efisien](https://arxiv.org/abs/2207.11079).

> Fakta menarik: teknik pengodean yang sama digunakan oleh DVD. Jika Anda menggores DVD, pemutarnya masih dapat membacanya berkat pengodean Reed-Solomon yang menambahkan potongan polinomial yang hilang.

Secara historis, data dalam rantai blok, baik blok maupun blob, disiarkan ke semua simpul. Dengan pendekatan pisah-dan-sampel dari PeerDAS, menyiarkan semuanya ke semua orang tidak lagi diperlukan. Pasca-Fusaka, jaringan lapisan konsensus diatur ke dalam topik/subnet gosip: kolom blob ditetapkan ke subnet tertentu, dan setiap simpul berlangganan ke subset yang telah ditentukan sebelumnya dan hanya menyimpan potongan-potongan tersebut.

Dengan PeerDAS, data blob yang diperluas dibagi menjadi 128 bagian yang disebut kolom. Data didistribusikan ke simpul-simpul ini melalui protokol gosip khusus pada subnet spesifik yang mereka langgani. Setiap simpul reguler di jaringan berpartisipasi dalam setidaknya 8 subnet kolom yang dipilih secara acak. Menerima data hanya dari 8 dari 128 subnet berarti bahwa simpul default ini hanya menerima 1/16 dari semua data, tetapi karena datanya diperluas, ini adalah 1/8 dari data asli.

Hal ini memungkinkan batas penskalaan teoretis baru sebesar 8x dari skema “semua orang mengunduh semuanya” yang ada saat ini. Dengan simpul yang berlangganan ke subnet acak yang berbeda yang melayani kolom blob, probabilitasnya sangat tinggi bahwa mereka didistribusikan secara seragam dan oleh karena itu setiap bagian data ada di suatu tempat dalam jaringan. Simpul yang menjalankan validator diwajibkan untuk berlangganan lebih banyak subnet dengan setiap validator yang mereka jalankan.

> Setiap simpul memiliki ID unik yang dibuat secara acak, yang biasanya berfungsi sebagai identitas publiknya untuk koneksi. Di PeerDAS, nomor ini digunakan untuk menentukan set subnet acak yang harus dilangganinya, yang menghasilkan distribusi acak yang seragam dari semua data blob.

Setelah simpul berhasil merekonstruksi data asli, simpul tersebut kemudian mendistribusikan kembali kolom yang dipulihkan ke dalam jaringan, secara aktif memulihkan setiap celah data dan meningkatkan ketahanan sistem secara keseluruhan. Simpul yang terhubung ke validator dengan saldo gabungan ≥4096 ETH harus menjadi supernode dan oleh karena itu harus berlangganan ke semua subnet kolom data dan menyimpan semua kolom. Supernode ini akan terus-menerus memulihkan celah data. Sifat pemulihan mandiri secara probabilistik dari protokol memungkinkan jaminan ketersediaan yang kuat tanpa membatasi operator rumahan yang hanya memegang sebagian data.

![Simpul-simpul berlangganan kolom yang didistribusikan melalui subnet](./subnets.png)

Ketersediaan data dapat dikonfirmasi oleh simpul mana pun yang hanya memegang sebagian kecil dari data blob berkat mekanisme pengambilan sampel yang dijelaskan di atas. Ketersediaan ini ditegakkan: validator harus mengikuti aturan pilihan-fork yang baru, yang berarti mereka hanya akan menerima dan memilih blok setelah mereka memverifikasi ketersediaan data.

Dampak langsung pada pengguna (terutama pengguna L2) adalah biaya yang lebih rendah. Dengan ruang 8x lebih banyak untuk data rollup, operasi pengguna di rantai mereka menjadi lebih murah seiring berjalannya waktu. Namun, biaya yang lebih rendah pasca-Fusaka akan memakan waktu dan bergantung pada BPO.

## Hanya Parameter Blob (BPO) {#bpo}

Jaringan secara teoretis akan dapat memproses 8x lebih banyak blob, tetapi peningkatan blob adalah perubahan yang perlu diuji dengan benar dan dieksekusi dengan aman secara bertahap. Jaringan percobaan memberikan keyakinan yang cukup untuk menyebarkan fitur-fitur di Jaringan Utama, tetapi kami perlu memastikan stabilitas jaringan p2p sebelum mengaktifkan jumlah blob yang jauh lebih tinggi.

Untuk secara bertahap meningkatkan jumlah target blob per blok tanpa membebani jaringan, Fusaka memperkenalkan fork **[Hanya-Parameter-Blob (BPO)](https://ethereum-magicians.org/t/blob-parameter-only-bpo-forks/22623)**. Tidak seperti fork biasa yang memerlukan koordinasi ekosistem yang luas, kesepakatan, dan pembaruan perangkat lunak, [BPO (EIP-7892)](https://eips.ethereum.org/EIPS/eip-7892) adalah peningkatan yang telah diprogram sebelumnya yang meningkatkan jumlah maksimum blob dari waktu ke waktu tanpa intervensi.

Ini berarti bahwa segera setelah Fusaka diaktifkan dan PeerDAS ditayangkan, jumlah blob akan tetap tidak berubah. Jumlah blob akan mulai berlipat ganda setiap beberapa minggu hingga mencapai maksimum 48, sementara para pengembang memantau untuk memastikan mekanisme bekerja seperti yang diharapkan dan tidak menimbulkan efek merugikan pada simpul yang menjalankan jaringan.

## Arah masa depan {#future-directions}

PeerDAS hanyalah sebuah langkah [menuju visi penskalaan yang lebih besar dari FullDAS](https://ethresear.ch/t/fulldas-towards-massive-scalability-with-32mb-blocks-and-beyond/19529), atau Danksharding. Sementara PeerDAS menggunakan pengodean penghapusan 1D untuk setiap blob secara individual, Danksharding penuh akan menggunakan skema pengodean penghapusan 2D yang lebih lengkap di seluruh matriks data blob. Memperluas data dalam dua dimensi menciptakan properti redundansi yang lebih kuat serta rekonstruksi dan verifikasi yang lebih efisien. Mewujudkan FullDAS akan memerlukan optimisasi jaringan dan protokol yang substansial, bersama dengan penelitian tambahan.

## Bacaan lebih lanjut {#further-reading}

- [PeerDAS: Pengambilan sampel Ketersediaan Data Peer oleh Francesco D'Amato](https://www.youtube.com/watch?v=WOdpO1tH_Us)
- [Dokumentasi PeerDAS Ethereum](https://eprint.iacr.org/2024/1362.pdf)
- [Membuktikan Keamanan PeerDAS tanpa AGM](https://eprint.iacr.org/2025/1683)
- [Vitalik tentang PeerDAS, dampaknya, dan pengujian Fusaka](https://x.com/VitalikButerin/status/1970983281090085200)