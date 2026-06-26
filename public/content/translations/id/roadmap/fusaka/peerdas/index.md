---
title: PeerDAS
description: Pelajari tentang PeerDAS sebagai bagian dari pembaruan protokol Ethereum Fusaka
lang: id
authors: ["Nixo", "Mario Havel"]
---

Protokol [Ethereum](/) sedang menjalani pembaruan penskalaan paling signifikan sejak [pengenalan transaksi blob dengan EIP-4844](/roadmap/danksharding/). Sebagai bagian dari [pembaruan Fusaka](/roadmap/fusaka/), PeerDAS memperkenalkan cara baru untuk menangani data blob, memberikan peningkatan kapasitas **[ketersediaan data (DA)](/developers/docs/data-availability/)** sekitar satu tingkat besaran untuk lapisan 2 (l2).

[Lebih lanjut tentang peta jalan penskalaan blob](https://blog.ethereum.org/2025/08/22/protocol-update-002)

## Penskalaan {#scalability}

Visi Ethereum adalah menjadi platform yang netral, aman, dan terdesentralisasi yang tersedia untuk semua orang di dunia. Seiring dengan pertumbuhan penggunaan jaringan, hal ini memerlukan penyeimbangan trilema skala, keamanan, dan desentralisasi jaringan. Jika Ethereum hanya meningkatkan data yang ditangani oleh jaringan dalam desainnya saat ini, hal itu akan berisiko membebani [node yang diandalkan Ethereum untuk desentralisasinya](/developers/docs/nodes-and-clients/). Penskalaan memerlukan desain mekanisme yang ketat yang meminimalkan pengorbanan (trade-off).

Salah satu strategi untuk mencapai tujuan ini adalah dengan memungkinkan ekosistem solusi penskalaan lapisan 2 (l2) yang beragam daripada memproses semua transaksi di Mainnet [lapisan 1 (l1)](/glossary/#layer-1). [Lapisan 2 (l2)](/glossary/#layer-2) atau [rollup](/glossary#rollups) memproses transaksi di rantai terpisah mereka sendiri dan menggunakan Ethereum untuk verifikasi dan keamanan. Dengan hanya menerbitkan komitmen yang penting untuk keamanan dan mengompresi muatan (payload), l2 dapat menggunakan kapasitas DA Ethereum dengan lebih efisien. Pada gilirannya, l1 membawa lebih sedikit data tanpa mengorbankan jaminan keamanan, sementara l2 menerima lebih banyak pengguna dengan biaya gas yang lebih rendah. Awalnya, l2 menerbitkan data sebagai `calldata` dalam transaksi biasa, yang bersaing dengan transaksi l1 untuk mendapatkan gas dan tidak praktis untuk ketersediaan data dalam jumlah besar.

## Proto-Danksharding {#proto-danksharding}

Langkah besar pertama menuju penskalaan lapisan 2 (l2) adalah pembaruan Dencun, yang memperkenalkan [Proto-Danksharding](/roadmap/danksharding/) (EIP-4844). Pembaruan ini menciptakan tipe data baru yang dikhususkan untuk rollup yang disebut blob. [Blob](/developers/docs/data-availability/blockchain-data-storage-strategies/#eip-4844-blobs), atau objek besar biner (binary large objects), adalah potongan data arbitrer sementara yang tidak memerlukan eksekusi EVM dan hanya disimpan oleh node untuk waktu yang terbatas. Pemrosesan yang lebih efisien ini memungkinkan l2 untuk menerbitkan lebih banyak data ke Ethereum dan menskalakan lebih jauh lagi. 

Meskipun sudah memiliki manfaat yang kuat untuk penskalaan, penggunaan blob hanyalah sebagian dari tujuan akhir. Dalam protokol saat ini, setiap node di jaringan masih perlu mengunduh setiap blob. Hambatannya menjadi pada bandwidth yang dibutuhkan oleh masing-masing node, dengan jumlah data yang perlu diunduh meningkat secara langsung seiring dengan jumlah blob yang lebih tinggi. 

Ethereum tidak mengorbankan desentralisasi, dan bandwidth adalah salah satu faktor yang paling sensitif. Bahkan dengan komputasi canggih yang tersedia secara luas bagi siapa saja yang mampu membelinya, [keterbatasan bandwidth unggah](https://www.speedtest.net/global-index) bahkan di kota-kota yang sangat urban di negara maju (seperti [Jerman](https://www.speedtest.net/global-index/germany), [Belgia](https://www.speedtest.net/global-index/belgium), [Australia](https://www.speedtest.net/global-index/australia), atau [Amerika Serikat](https://www.speedtest.net/global-index/united-states)) dapat membatasi node sehingga hanya dapat dijalankan dari pusat data jika persyaratan bandwidth tidak disesuaikan dengan cermat.

Operator node memiliki persyaratan bandwidth dan ruang disk yang semakin tinggi seiring dengan bertambahnya blob. Ukuran dan jumlah blob dibatasi oleh kendala ini. Setiap blob dapat membawa hingga 128kb data dengan rata-rata 6 blob per blok. Ini hanyalah langkah pertama menuju desain masa depan yang menggunakan blob dengan cara yang jauh lebih efisien.

## Pengambilan sampel ketersediaan data (Data availability sampling) {#das}

[Ketersediaan data](/developers/docs/data-availability/) adalah jaminan bahwa semua data yang diperlukan untuk memvalidasi rantai secara independen dapat diakses oleh semua peserta jaringan. Hal ini memastikan bahwa data telah diterbitkan sepenuhnya dan dapat digunakan untuk memverifikasi state baru dari rantai atau transaksi yang masuk tanpa perlu rasa percaya (trustlessly). 

Blob Ethereum memberikan jaminan ketersediaan data yang kuat yang memastikan keamanan lapisan 2 (l2). Untuk melakukan ini, node Ethereum perlu mengunduh dan menyimpan blob secara keseluruhan. Namun, bagaimana jika kita dapat mendistribusikan blob di jaringan dengan lebih efisien dan menghindari batasan ini? 

Pendekatan berbeda untuk menyimpan data dan memastikan ketersediaannya adalah **pengambilan sampel ketersediaan data (DAS)**. Alih-alih setiap komputer yang menjalankan Ethereum menyimpan setiap blob secara penuh, DAS memperkenalkan pembagian kerja yang terdesentralisasi. Hal ini memecah beban pemrosesan data dengan mendistribusikan tugas-tugas yang lebih kecil dan dapat dikelola ke seluruh jaringan node. Blob dibagi menjadi beberapa bagian dan setiap node hanya mengunduh beberapa bagian menggunakan mekanisme untuk distribusi acak yang seragam di semua node. 

Hal ini menimbulkan masalah baru—membuktikan ketersediaan dan integritas data. Bagaimana jaringan dapat menjamin bahwa data tersedia dan semuanya benar ketika masing-masing node hanya menyimpan bagian-bagian kecil? Node yang berbahaya dapat menyajikan data palsu dan dengan mudah merusak jaminan ketersediaan data yang kuat! Di sinilah kriptografi hadir untuk membantu. 

Untuk memastikan integritas data, EIP-4844 telah diimplementasikan dengan komitmen KZG. Ini adalah bukti kriptografi yang dibuat ketika blob baru ditambahkan ke jaringan. Bukti kecil disertakan dalam setiap blok, dan node dapat memverifikasi bahwa blob yang diterima sesuai dengan komitmen KZG blok tersebut.

DAS adalah mekanisme yang dibangun di atas hal ini dan memastikan data tersebut benar dan tersedia. Pengambilan sampel adalah proses di mana node hanya meminta sebagian kecil data dan memverifikasinya terhadap komitmen. KZG adalah skema komitmen polinomial yang berarti bahwa setiap titik tunggal pada kurva polinomial dapat diverifikasi. Dengan hanya memeriksa beberapa titik pada polinomial, klien yang melakukan pengambilan sampel dapat memiliki jaminan probabilistik yang kuat bahwa data tersebut tersedia. 

## PeerDAS {#peer-das-2}

[PeerDAS (EIP-7594)](https://eips.ethereum.org/EIPS/eip-7594) adalah proposal spesifik yang mengimplementasikan mekanisme DAS di Ethereum, yang mungkin menandai pembaruan terbesar sejak The Merge. PeerDAS dirancang untuk memperluas data blob, membaginya menjadi beberapa kolom, dan mendistribusikan sebagian kecilnya ke node.

Ethereum meminjam beberapa matematika cerdas untuk mencapai hal ini: ia menerapkan pengodean penghapusan gaya Reed-Solomon ke data blob. Data blob direpresentasikan sebagai polinomial yang koefisiennya menyandikan data, kemudian mengevaluasi polinomial tersebut pada titik-titik tambahan untuk membuat blob yang diperluas, menggandakan jumlah evaluasi. Redundansi tambahan ini memungkinkan pemulihan penghapusan: bahkan jika beberapa evaluasi hilang, blob asli dapat direkonstruksi selama setidaknya setengah dari total data, termasuk bagian yang diperluas, tersedia.

![Extended polynomial](./polynomial.png)

Pada kenyataannya, polinomial ini memiliki ribuan koefisien. Komitmen KZG adalah nilai beberapa byte, sesuatu seperti hash, yang diketahui oleh semua node. Setiap node yang menyimpan cukup titik data dapat [merekonstruksi sekumpulan penuh data blob secara efisien](https://arxiv.org/abs/2207.11079). 

> Fakta menarik: teknik pengodean yang sama digunakan oleh DVD. Jika Anda menggores DVD, pemutar masih dapat membacanya berkat pengodean Reed-Solomon yang menambahkan bagian polinomial yang hilang. 

Secara historis, data dalam blockchain, baik blok maupun blob, disiarkan ke semua node. Dengan pendekatan pemisahan-dan-pengambilan sampel (split-and-sample) PeerDAS, menyiarkan semuanya ke semua orang tidak lagi diperlukan. Pasca-Fusaka, jaringan lapisan konsensus diatur ke dalam topik/subnet protokol gosip: kolom blob ditetapkan ke subnet tertentu, dan setiap node berlangganan ke subset yang telah ditentukan sebelumnya dan hanya menyimpan bagian-bagian tersebut.

Dengan PeerDAS, data blob yang diperluas dibagi menjadi 128 bagian yang disebut kolom. Data didistribusikan ke node-node ini melalui protokol gosip khusus pada subnet tertentu yang mereka langgani. Setiap node reguler di jaringan berpartisipasi dalam setidaknya 8 subnet kolom yang dipilih secara acak. Menerima data dari hanya 8 dari 128 subnet berarti bahwa node bawaan ini hanya menerima 1/16 dari semua data, tetapi karena data tersebut diperluas, ini adalah 1/8 dari data asli. 

Hal ini memungkinkan batas penskalaan teoretis baru sebesar 8x dari skema "semua orang mengunduh semuanya" saat ini. Dengan node yang berlangganan ke subnet acak berbeda yang melayani kolom blob, probabilitasnya sangat tinggi bahwa mereka didistribusikan secara seragam dan oleh karena itu setiap bagian data ada di suatu tempat di jaringan. Node yang menjalankan validator diwajibkan untuk berlangganan ke lebih banyak subnet dengan setiap validator yang mereka jalankan.

> Setiap node memiliki ID unik yang dihasilkan secara acak, yang biasanya berfungsi sebagai identitas publiknya untuk koneksi. Dalam PeerDAS, angka ini digunakan untuk menentukan kumpulan subnet acak yang harus dilangganinya, yang menghasilkan distribusi acak yang seragam dari semua data blob.

Setelah node berhasil merekonstruksi data asli, ia kemudian mendistribusikan kembali kolom yang dipulihkan ke dalam jaringan, secara aktif menyembuhkan celah data apa pun dan meningkatkan ketahanan sistem secara keseluruhan. Node yang terhubung ke validator dengan saldo gabungan ≥4096 ETH harus menjadi supernode dan oleh karena itu harus berlangganan ke semua subnet kolom data dan menyimpan semua kolom. Supernode ini akan terus menyembuhkan celah data. Sifat protokol yang dapat menyembuhkan diri sendiri secara probabilistik memungkinkan jaminan ketersediaan yang kuat tanpa membatasi operator rumahan yang hanya menyimpan sebagian data. 

![Nodes subscribing to columns distributed via subnets](./subnets.png)

Ketersediaan data dapat dikonfirmasi oleh node mana pun yang hanya menyimpan sebagian kecil data blob berkat mekanisme pengambilan sampel yang dijelaskan di atas. Ketersediaan ini ditegakkan: validator harus mengikuti aturan pilihan percabangan (fork-choice) yang baru, yang berarti mereka hanya akan menerima dan memberikan suara untuk blok setelah mereka memverifikasi ketersediaan data tersebut.

Dampak langsung pada pengguna (terutama pengguna lapisan 2 (l2)) adalah biaya yang lebih rendah. Dengan ruang 8x lebih banyak untuk data rollup, operasi pengguna di rantai mereka menjadi lebih murah seiring berjalannya waktu. Namun, biaya yang lebih rendah pasca-Fusaka akan memakan waktu dan bergantung pada BPO.

## Blob-Parameter-Only (BPO) {#bpo}

Jaringan secara teoretis akan dapat memproses blob 8x lebih banyak, tetapi peningkatan blob adalah perubahan yang perlu diuji dengan benar dan dieksekusi dengan aman secara bertahap. Testnet memberikan keyakinan yang cukup untuk menyebarkan fitur-fitur tersebut di Mainnet, tetapi kita perlu memastikan stabilitas jaringan p2p sebelum mengaktifkan jumlah blob yang jauh lebih tinggi. 

Untuk secara bertahap menaikkan target jumlah blob per blok tanpa membebani jaringan, Fusaka memperkenalkan percabangan **[Blob-Parameter-Only (BPO)](https://ethereum-magicians.org/t/blob-parameter-only-bpo-forks/22623)**. Tidak seperti percabangan biasa yang membutuhkan koordinasi ekosistem yang luas, kesepakatan, dan pembaruan perangkat lunak, [BPO (EIP-7892)](https://eips.ethereum.org/EIPS/eip-7892) adalah pembaruan yang telah diprogram sebelumnya yang meningkatkan jumlah maksimum blob dari waktu ke waktu tanpa intervensi.

Ini berarti bahwa segera setelah Fusaka aktif dan PeerDAS ditayangkan, jumlah blob akan tetap tidak berubah. Jumlah blob akan mulai berlipat ganda setiap beberapa minggu hingga mencapai maksimum 48, sementara pengembang memantau untuk memastikan mekanismenya bekerja seperti yang diharapkan dan tidak memiliki efek buruk pada node yang menjalankan jaringan.

## Arah masa depan {#future-directions}

PeerDAS hanyalah sebuah langkah [menuju visi penskalaan FullDAS yang lebih besar](https://ethresear.ch/t/fulldas-towards-massive-scalability-with-32mb-blocks-and-beyond/19529), atau danksharding. Sementara PeerDAS menggunakan pengodean penghapusan 1D untuk setiap blob secara individual, danksharding penuh akan menggunakan skema pengodean penghapusan 2D yang lebih lengkap di seluruh matriks data blob. Memperluas data dalam dua dimensi menciptakan properti redundansi yang lebih kuat serta rekonstruksi dan verifikasi yang lebih efisien. Mewujudkan FullDAS akan membutuhkan pengoptimalan jaringan dan protokol yang substansial, bersama dengan penelitian tambahan.

## Bacaan lebih lanjut {#further-reading}

- [PeerDAS: Pengambilan sampel Ketersediaan Data Peer oleh Francesco D'Amato](https://www.youtube.com/watch?v=WOdpO1tH_Us)
- [Dokumentasi PeerDAS Ethereum](https://eprint.iacr.org/2024/1362.pdf)
- [Membuktikan Keamanan PeerDAS tanpa AGM](https://eprint.iacr.org/2025/1683)
- [Vitalik tentang PeerDAS, dampaknya, dan pengujian Fusaka](https://x.com/VitalikButerin/status/1970983281090085200)