---
title: Praha-Electra (Pectra)
description: Pelajari tentang peningkatan protokol Pectra
lang: id
---

# Pectra {#pectra}

Peningkatan jaringan Pectra mengikuti [Dencun](/roadmap/dencun/) dan membawa perubahan pada lapisan eksekusi dan konsensus Ethereum. Nama singkat Pectra merupakan gabungan dari Prague dan Electra, yang masing-masing merujuk pada perubahan spesifikasi execution layer dan consensus layer. Secara keseluruhan, perubahan ini menghadirkan berbagai peningkatan bagi pengguna, pengembang, dan validator Ethereum.

Upgrade ini berhasil diaktifkan di Ethereum mainnet pada epoch `364032`, **07 Mei 2025 pukul 10:05 (UTC)**.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Peningkatan Pectra hanyalah satu langkah dalam tujuan pengembangan jangka panjang Ethereum. Pelajari lebih lanjut tentang [peta jalan protokol](/roadmap/) dan [peningkatan sebelumnya](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

## Peningkatan di Pectra {#new-improvements}

Pectra menghadirkan jumlah [eips](https://eips.ethereum.org/) terbesar dari semua peningkatan sebelumnya! Terdapat banyak perubahan kecil, tetapi juga beberapa fitur baru yang signifikan. Daftar lengkap perubahan dan rincian teknis dapat ditemukan di masing-masing EIP yang disertakan.

### Kode akun EOA {#7702}

[eip-7702](https://eips.ethereum.org/EIPS/eip-7702) merupakan langkah besar menuju [abstraksi akun](/roadmap/account-abstraction/) yang meluas. Dengan fitur ini, pengguna dapat mengatur alamat mereka ([EOA](/glossary/#eoa)) untuk diperluas dengan kontrak pintar. EIP ini memperkenalkan jenis transaksi baru dengan fungsi khusus — memungkinkan pemilik alamat menandatangani otorisasi yang membuat alamat mereka meniru smart contract yang dipilih.

Dengan EIP ini, pengguna dapat memilih untuk menggunakan dompet yang dapat diprogram, memungkinkan fitur baru seperti penggabungan transaksi, transaksi tanpa gas, dan akses aset khusus untuk skema pemulihan alternatif. Pendekatan hibrida ini menggabungkan kesederhanaan EOA dengan kemampuan pemrograman dari akun berbasis kontrak.

Baca lebih lanjut tentang 7702 [di sini](/roadmap/pectra/7702/)

### Tingkatkan saldo efektif maksimum {#7251}

Saldo efektif validator saat ini tepat 32 ETH. Ini adalah jumlah minimum yang diperlukan untuk berpartisipasi dalam konsensus tetapi pada saat yang sama merupakan jumlah maksimum yang dapat dipertaruhkan oleh satu validator.

[eip-7251](https://eips.ethereum.org/EIPS/eip-7251) meningkatkan saldo efektif maksimum yang mungkin menjadi 2048 ETH, yang berarti bahwa satu validator sekarang dapat mempertaruhkan antara 32 dan 2048 ETH. Alih-alih kelipatan 32, para pemangku kepentingan sekarang dapat memilih jumlah ETH yang sembarangan untuk dipertaruhkan dan menerima hadiah pada setiap 1 ETH di atas jumlah minimum. Misalnya, jika saldo validator bertambah seiring dengan hadiahnya menjadi 33 ETH, 1 ETH tambahan juga dianggap sebagai bagian dari saldo efektif dan menerima hadiah.

Namun manfaat dari sistem penghargaan yang lebih baik bagi validator hanyalah sebagian dari peningkatan ini. [Staker](/staking/) yang menjalankan beberapa validator kini dapat menggabungkan semuanya menjadi satu, yang memungkinkan pengoperasian lebih mudah dan mengurangi overhead jaringan. Karena setiap validator di Beacon Chain mengirimkan tanda tangan di setiap epoch, persyaratan bandwidth bertambah seiring dengan lebih banyak validator dan sejumlah besar tanda tangan yang harus disebarkan. Agregat validator akan mengurangi beban jaringan dan membuka opsi penskalaan baru sambil tetap menjaga keamanan ekonomi yang sama.

Baca lebih lanjut tentang maxEB [di sini](/roadmap/pectra/maxeb/)

### Peningkatan throughput blob {#7691}

Blob menyediakan [ketersediaan data](/developers/docs/data-availability/#data-availability-and-layer-2-rollups) untuk L2s. Mereka diperkenalkan pada [peningkatan jaringan sebelumnya](/roadmap/dencun/).

Saat ini, jaringan menargetkan rata-rata 3 gumpalan per blok dengan maksimum 6 gumpalan. Dengan [eip-7691](https://eips.ethereum.org/EIPS/eip-7691), jumlah blob rata-rata akan ditingkatkan menjadi 6, dengan maksimum 9 per blok, sehingga menghasilkan peningkatan kapasitas untuk Ethereum rollup. EIP ini membantu menjembatani kesenjangan hingga [peerdas](https://eips.ethereum.org/EIPS/eip-7594) memungkinkan jumlah blob yang lebih tinggi.

### Meningkatkan biaya panggilan data {#7623}

Sebelum diperkenalkannya [blobs dalam peningkatan Dencun](/roadmap/danksharding), L2 menggunakan [calldata](/developers/docs/data-availability/blockchain-data-storage-strategies/#calldata) untuk menyimpan data mereka di Ethereum. Baik blob maupun calldata memengaruhi penggunaan bandwidth Ethereum. Meskipun sebagian besar blok hanya menggunakan sejumlah kecil calldata, blok-blok dengan banyak data yang juga mengandung banyak gumpalan dapat membahayakan jaringan p2p Ethereum.

Untuk mengatasi hal ini, [EIP-7623](https://eips.ethereum.org/EIPS/eip-7623) meningkatkan harga data panggilan, tetapi hanya untuk transaksi yang membutuhkan banyak data. Ini membatasi ukuran blok terburuk, memberikan insentif bagi L2 untuk hanya menggunakan blob dan membuat lebih dari 99% transaksi tidak terpengaruh.

### Lapisan eksekusi yang dapat dipicu keluar {#7002}

Saat ini, keluar dari validator dan [menarik ETH yang di-staking](/staking/withdrawals/) adalah operasi lapisan konsensus yang membutuhkan kunci validator aktif, kunci BLS yang sama dengan yang digunakan oleh validator untuk melakukan tugas aktif seperti pengesahan. Kredensial penarikan adalah kunci dingin terpisah yang menerima saham yang keluar tetapi tidak dapat memicu keluar. Satu-satunya cara bagi stakers untuk keluar adalah dengan mengirimkan pesan khusus ke jaringan Beacon Chain yang ditandatangani menggunakan kunci validator yang aktif. Hal ini membatasi dalam skenario di mana kredensial penarikan dan kunci validator dipegang oleh entitas yang berbeda atau ketika kunci validator hilang.

[EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) memperkenalkan kontrak baru yang dapat digunakan untuk memicu keluar menggunakan kredensial penarikan lapisan eksekusi. Stakers akan dapat keluar dari validator mereka dengan memanggil sebuah fungsi dalam kontrak khusus ini tanpa memerlukan kunci penandatanganan validator atau akses ke Beacon Chain sama sekali. Yang terpenting, dengan mengaktifkan penarikan validator di dalam blockchain memungkinkan protokol staking dengan asumsi kepercayaan yang lebih rendah terhadap operator node.

### Setoran validator dalam jaringan {#6110}

Setoran validator saat ini diproses oleh [eth1data poll](https://eth2book.info/capella/part2/deposits-withdrawals/deposit-processing/) yang merupakan fungsi pada Beacon Chain yang mengambil data dari lapisan eksekusi. Ini adalah semacam utang teknis dari masa-masa sebelum The Merge ketika Beacon Chain adalah jaringan yang terpisah dan harus memperhatikan dirinya sendiri dengan pengorganisasian ulang bukti kerja.

[EIP-6110](https://eips.ethereum.org/EIPS/eip-6110) adalah cara baru untuk mengirimkan setoran dari eksekusi ke lapisan konsensus, yang memungkinkan pemrosesan instan dengan kerumitan implementasi yang lebih sedikit. Ini adalah cara yang lebih aman untuk menangani setoran asli Ethereum yang digabungkan. Ini juga membantu protokol yang tahan terhadap masa depan karena tidak memerlukan simpanan historis untuk melakukan bootstrap pada simpul, yang diperlukan untuk kedaluwarsa riwayat.

### Prakompilasi untuk BLS12-381 {#2537}

Prakompilasi adalah seperangkat kontrak pintar khusus yang dibangun langsung ke dalam Ethereum Virtual Machine ([EVM](/developers/docs/evm/)). Tidak seperti kontrak biasa, precompile tidak diterapkan oleh pengguna, tetapi merupakan bagian dari implementasi klien itu sendiri, yang ditulis dalam bahasa aslinya (misalnya, Go, Java, dll., bukan Solidity). Prakompilasi berfungsi untuk fungsi-fungsi yang digunakan secara luas dan terstandardisasi seperti operasi kriptografi. Pengembang smart contract dapat memanggil prakompilasi sebagai kontrak biasa tetapi dengan keamanan dan efisiensi yang lebih baik.

[EIP-2537](https://eips.ethereum.org/EIPS/eip-2537) menambahkan prakompilasi baru untuk operasi kurva di atas [BLS12-381](https://hackmd.io/@benjaminion/bls12-381). Kurva elips ini menjadi banyak digunakan dalam ekosistem mata uang kripto berkat sifat praktisnya. Lebih khusus lagi, ini telah diadopsi oleh lapisan konsensus Ethereum, di mana ia digunakan oleh para validator.

Prakompilasi baru ini menambahkan kemampuan bagi setiap pengembang untuk dengan mudah, efisien, dan aman melakukan operasi kriptografi menggunakan kurva ini, misalnya, memverifikasi tanda tangan. Aplikasi di dalam jaringan yang bergantung pada kurva ini dapat menjadi lebih efisien dan aman dengan mengandalkan prakompilasi, bukan kontrak khusus. Ini terutama berlaku untuk aplikasi yang perlu memproses informasi tentang validator di dalam EVM, misalnya, pool penaruhan, [restaking](/restaking/), klien ringan, jembatan, dan juga zero-knowledge.

### Sajikan hash blok historis dari state {#2935}

EVM saat ini menyediakan opcode `BLOCKHASH` yang memungkinkan pengembang kontrak untuk mengambil hash dari sebuah blok secara langsung di lapisan eksekusi. Namun, ini hanya terbatas pada 256 blok terakhir dan mungkin menjadi masalah bagi klien tanpa kewarganegaraan di masa mendatang.

[EIP-2935](https://eips.ethereum.org/EIPS/eip-2935) membuat kontrak sistem baru yang dapat melayani 8192 blok hash terakhir sebagai slot penyimpanan. Hal ini membantu membuktikan protokol untuk eksekusi tanpa kewarganegaraan di masa depan dan menjadi lebih efisien ketika percobaan verkle diadopsi. Namun, terlepas dari hal ini, rollup dapat langsung mendapatkan keuntungan dari hal ini, karena mereka dapat menanyakan kontrak secara langsung dengan jendela historis yang lebih panjang.

### Pindahkan indeks komite di luar Pengesahan {#7549}

Konsensus Beacon Chain didasarkan pada validator yang memberikan suara mereka untuk blok terbaru dan epoch yang telah diselesaikan. Pengesahan ini mencakup 3 elemen, 2 di antaranya adalah suara dan yang ketiga adalah nilai indeks komite.

[EIP-7549](https://eips.ethereum.org/EIPS/eip-7549) memindahkan indeks ini di luar pesan pengesahan yang ditandatangani, yang membuatnya lebih mudah untuk memverifikasi dan mengagregasi suara konsensus. Ini akan memungkinkan lebih banyak efisiensi di setiap klien konsensus dan dapat membawa peningkatan kinerja yang signifikan pada sirkuit zero-knowledge untuk membuktikan konsensus Ethereum.

### Tambahkan jadwal blob ke file konfigurasi EL {#7840}

[EIP-7840](https://eips.ethereum.org/EIPS/eip-7840) adalah perubahan sederhana yang menambahkan bidang baru ke konfigurasi klien lapisan eksekusi. Fitur ini mengkonfigurasi jumlah blok, memungkinkan pengaturan dinamis untuk target dan jumlah blob maksimum per blok serta penyesuaian biaya blob. Dengan konfigurasi yang ditentukan secara langsung, klien dapat menghindari kerumitan pertukaran informasi ini melalui Engine API.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Untuk mempelajari lebih lanjut tentang bagaimana Pectra secara khusus memengaruhi Anda sebagai pengguna, pengembang, atau validator Ethereum, lihat <a href="https://epf.wiki/#/wiki/pectra-faq">FAQ Pectra</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Apakah peningkatan ini memengaruhi semua node dan validator Ethereum? {#client-impact}

Ya, peningkatan Pectra memerlukan pembaruan untuk [klien eksekusi dan klien konsensus](/developers/docs/nodes-and-clients/). Semua klien utama Ethereum akan merilis versi yang mendukung hard fork yang ditandai sebagai prioritas tinggi. Untuk menjaga sinkronisasi dengan jaringan Ethereum setelah upgrade, operator node harus memastikan bahwa mereka menjalankan versi client yang didukung. Perlu dicatat bahwa informasi mengenai rilis client bersifat sensitif terhadap waktu, sehingga pengguna harus merujuk pada pembaruan terbaru untuk mendapatkan detail yang paling terkini.

## Bagaimana cara menukarkan ETH setelah hard fork? {#scam-alert}

- **Tidak Ada Tindakan yang Diperlukan untuk ETH Anda**: Setelah peningkatan Ethereum Pectra, Anda tidak perlu mengonversi atau meningkatkan ETH Anda. Saldo akun Anda akan tetap sama, dan ETH yang Anda miliki saat ini akan tetap dapat diakses dalam bentuknya yang ada setelah hard fork.
- Waspada Penipuan! <Emoji text="⚠️" /> Siapa pun yang menyuruh Anda "meng-upgrade" ETH Anda sedang mencoba menipu Anda. Tidak ada tindakan yang perlu dilakukan terkait upgrade ini. Aset milik anda tidak akan terpengaruh sama sekali. Ingat, tetap terinformasi adalah pertahanan terbaik untuk melawan penipuan.

[Lebih lanjut tentang mengenali dan menghindari penipuan](/security/)

## Selengkapnya tentang pelajar visual? {#visual-learner}

<YouTube id="ufIDBCgdGwY" />

_Apa Saja yang Terjadi pada Upgrade Pectra? - Christine Kim_

<YouTube id="_UpAFpC7X6Y" />

_Upgrade Ethereum Pectra: Apa yang Perlu Diketahui Stakers - Blockdaemon_

## Bacaan lebih lanjut {#further-reading}

- [Peta jalan Ethereum](/roadmap/)
- [Pectra FAQ](https://epf.wiki/#/wiki/pectra-faq)
- [Halaman info Pectra.wtf](https://pectra.wtf)
- [Bagaimana Pectra meningkatkan pengalaman staker](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Halaman info EIP7702](https://eip7702.io/)
- [Pectra devnets](https://github.com/ethereum/pm/blob/master/Pectra/pectra-pm.md)
