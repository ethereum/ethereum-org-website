---
title: Pectra
metaTitle: Prague-Electra (Pectra)
description: Pelajari tentang pembaruan protokol Pectra
lang: id
authors: ["Nixo", "Mario Havel"]
---

Pembaruan jaringan Pectra mengikuti [Dencun](/roadmap/dencun/) dan membawa perubahan pada lapisan eksekusi dan lapisan konsensus Ethereum. Nama singkatan Pectra adalah kombinasi dari Prague dan Electra, yang masing-masing merupakan nama untuk perubahan spesifikasi lapisan eksekusi dan lapisan konsensus. Bersama-sama, perubahan ini membawa sejumlah peningkatan bagi pengguna, pengembang, dan validator [Ethereum](/).

Pembaruan ini berhasil diaktifkan di Mainnet Ethereum pada Epok `364032`, pada **07-Mei-2025 pukul 10:05 (UTC)**.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Pembaruan Pectra hanyalah satu langkah dalam tujuan pengembangan jangka panjang Ethereum. Pelajari lebih lanjut tentang [peta jalan protokol](/roadmap/) dan [pembaruan sebelumnya](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

## Peningkatan di Pectra {#new-improvements}

Pectra membawa jumlah [EIP](https://eips.ethereum.org/) terbanyak dari pembaruan sebelumnya! Ada banyak perubahan kecil tetapi juga beberapa fitur baru yang signifikan. Daftar lengkap perubahan dan detail teknis dapat ditemukan di masing-masing EIP yang disertakan.

### Kode akun EOA {#7702}

[EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) mewakili langkah besar menuju [abstraksi akun](/roadmap/account-abstraction/) yang meluas. Dengan fitur ini, pengguna dapat mengatur alamat mereka ([EOA](/glossary/#eoa)) untuk diperluas dengan kontrak pintar. EIP ini memperkenalkan jenis transaksi baru dengan fungsi spesifik - untuk memungkinkan pemilik alamat menandatangani otorisasi yang mengatur alamat mereka agar meniru kontrak pintar yang dipilih. 

Dengan EIP ini, pengguna dapat memilih untuk menggunakan dompet yang dapat diprogram yang memungkinkan fitur-fitur baru seperti penggabungan transaksi, transaksi tanpa gas, dan akses aset kustom untuk skema pemulihan alternatif. Pendekatan hibrida ini menggabungkan kesederhanaan EOA dengan kemampuan pemrograman dari akun berbasis kontrak. 

Baca pembahasan mendalam tentang 7702 [di sini](/roadmap/pectra/7702/)

### Peningkatan saldo efektif maksimum {#7251}

Saldo efektif validator saat ini adalah tepat 32 ETH. Ini adalah jumlah minimum yang diperlukan untuk berpartisipasi dalam konsensus tetapi pada saat yang sama merupakan jumlah maksimum yang dapat di-stake oleh satu validator.

[EIP-7251](https://eips.ethereum.org/EIPS/eip-7251) menaikkan saldo efektif maksimum yang dimungkinkan menjadi 2048 ETH, yang berarti bahwa satu validator sekarang dapat melakukan staking antara 32 dan 2048 ETH. Alih-alih kelipatan 32, staker sekarang dapat memilih jumlah ETH arbitrer untuk di-stake dan menerima imbalan pada setiap 1 ETH di atas batas minimum. Misalnya, jika saldo validator bertambah dengan imbalan mereka menjadi 33 ETH, tambahan 1 ETH tersebut juga dianggap sebagai bagian dari saldo efektif dan menerima imbalan.

Namun, manfaat dari sistem imbalan yang lebih baik untuk validator hanyalah sebagian dari peningkatan ini. [Staker](/staking/) yang menjalankan beberapa validator sekarang dapat menggabungkannya menjadi satu, yang memungkinkan pengoperasian yang lebih mudah dan mengurangi beban jaringan. Karena setiap validator di Rantai suar mengirimkan tanda tangan di setiap Epok, persyaratan bandwidth tumbuh dengan lebih banyak validator dan sejumlah besar tanda tangan yang harus disebarkan. Menggabungkan validator akan mengurangi beban jaringan dan membuka opsi penskalaan baru sambil mempertahankan keamanan ekonomi yang sama.

Baca pembahasan mendalam tentang MaxEB [di sini](/roadmap/pectra/maxeb/)

### Peningkatan laju pemrosesan blob {#7691}

Blob menyediakan ketersediaan data untuk L2. Blob diperkenalkan pada [pembaruan jaringan sebelumnya](/roadmap/dencun/). 

Saat ini, jaringan menargetkan rata-rata 3 blob per blok dengan maksimum 6 blob. Dengan [EIP-7691](https://eips.ethereum.org/EIPS/eip-7691), jumlah blob rata-rata akan ditingkatkan menjadi 6, dengan maksimum 9 per blok, yang menghasilkan peningkatan kapasitas untuk rollup Ethereum. EIP ini membantu menjembatani kesenjangan hingga [PeerDAS](https://eips.ethereum.org/EIPS/eip-7594) memungkinkan jumlah blob yang lebih tinggi.

### Peningkatan biaya calldata {#7623}

Sebelum pengenalan [blob pada pembaruan Dencun](/roadmap/danksharding), L2 menggunakan [calldata](/developers/docs/data-availability/blockchain-data-storage-strategies/#calldata) untuk menyimpan data mereka di Ethereum. Baik blob maupun calldata memengaruhi penggunaan bandwidth Ethereum. Meskipun sebagian besar blok hanya menggunakan jumlah calldata yang minimal, blok padat data yang juga berisi banyak blob dapat membahayakan jaringan p2p Ethereum. 

Untuk mengatasi hal ini, [EIP-7623](https://eips.ethereum.org/EIPS/eip-7623) meningkatkan penetapan harga calldata, tetapi hanya untuk transaksi padat data. Ini membatasi ukuran blok dalam skenario terburuk, memberikan insentif bagi L2 untuk hanya menggunakan blob, dan membiarkan lebih dari 99% transaksi tidak terpengaruh.

### Keluar yang dapat dipicu oleh lapisan eksekusi {#7002}

Saat ini, keluar dari validator dan [menarik ETH yang di-stake](/staking/withdrawals/) adalah operasi lapisan konsensus yang mewajibkan kunci validator aktif, kunci BLS yang sama yang digunakan oleh validator untuk melakukan tugas aktif seperti atestasi. Kredensial penarikan adalah kunci dingin terpisah yang menerima stake yang keluar tetapi tidak dapat memicu keluar. Satu-satunya cara bagi staker untuk keluar adalah dengan mengirimkan pesan khusus ke jaringan Rantai suar yang ditandatangani menggunakan kunci validator aktif. Hal ini membatasi dalam skenario di mana kredensial penarikan dan kunci validator dipegang oleh entitas yang berbeda atau ketika kunci validator hilang.

[EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) memperkenalkan kontrak baru yang dapat digunakan untuk memicu keluar menggunakan kredensial penarikan lapisan eksekusi. Staker akan dapat keluar dari validator mereka dengan memanggil fungsi dalam kontrak khusus ini tanpa memerlukan kunci penandatanganan validator mereka atau akses ke Rantai suar sama sekali. Yang terpenting, mengaktifkan penarikan validator secara onchain memungkinkan protokol staking dengan asumsi kepercayaan yang berkurang terhadap operator node.

### Deposit validator secara onchain {#6110}

Deposit validator saat ini diproses oleh [eth1data poll](https://eth2book.info/capella/part2/deposits-withdrawals/deposit-processing/) yang merupakan fungsi pada Rantai suar yang mengambil data dari lapisan eksekusi. Ini semacam utang teknis dari masa sebelum The Merge ketika Rantai suar adalah jaringan terpisah dan harus berurusan dengan reorganisasi Bukti Kerja (PoW). 

[EIP-6110](https://eips.ethereum.org/EIPS/eip-6110) adalah cara baru untuk mengirimkan deposit dari lapisan eksekusi ke lapisan konsensus, yang memungkinkan pemrosesan instan dengan kompleksitas implementasi yang lebih sedikit. Ini adalah cara yang lebih aman untuk menangani deposit yang asli pada Ethereum yang telah digabungkan. Ini juga membantu mempersiapkan protokol untuk masa depan karena tidak mewajibkan deposit historis untuk melakukan bootstrap pada node, yang diperlukan untuk kedaluwarsa riwayat.

### Prakompilasi untuk BLS12-381 {#2537}

Prakompilasi adalah serangkaian kontrak pintar khusus yang dibangun langsung ke dalam Mesin Virtual Ethereum ([EVM](/developers/docs/evm/)). Tidak seperti kontrak biasa, prakompilasi tidak disebarkan oleh pengguna melainkan merupakan bagian dari implementasi klien itu sendiri, yang ditulis dalam bahasa aslinya (misalnya, Go, Java, dll., bukan Solidity). Prakompilasi berfungsi untuk fungsi yang banyak digunakan dan distandarisasi seperti operasi kriptografi. Pengembang kontrak pintar dapat memanggil prakompilasi sebagai kontrak biasa tetapi dengan keamanan dan efisiensi yang lebih tinggi.

[EIP-2537](https://eips.ethereum.org/EIPS/eip-2537) menambahkan prakompilasi baru untuk operasi kurva pada [BLS12-381](https://hackmd.io/@benjaminion/bls12-381). Kurva eliptik ini menjadi banyak digunakan dalam ekosistem mata uang kripto berkat sifat praktisnya. Lebih spesifiknya, kurva ini telah diadopsi oleh lapisan konsensus Ethereum, di mana ia digunakan oleh validator.

Prakompilasi baru ini menambahkan kemampuan bagi setiap pengembang untuk dengan mudah, efisien, dan aman melakukan operasi kriptografi menggunakan kurva ini, misalnya, memverifikasi tanda tangan. Aplikasi onchain yang bergantung pada kurva ini dapat menjadi lebih efisien gas dan aman dengan mengandalkan prakompilasi alih-alih beberapa kontrak kustom. Hal ini terutama berlaku untuk aplikasi yang ingin menalar tentang validator di dalam EVM, misalnya, pool staking, [staking ulang](/restaking/), klien ringan, jembatan, tetapi juga zero-knowledge.

### Menyajikan hash blok historis dari state {#2935}

EVM saat ini menyediakan opcode `BLOCKHASH` yang memungkinkan pengembang kontrak untuk mengambil hash dari sebuah blok secara langsung di lapisan eksekusi. Namun, ini terbatas hanya pada 256 blok terakhir dan mungkin menjadi masalah bagi klien stateless di masa mendatang.

[EIP-2935](https://eips.ethereum.org/EIPS/eip-2935) membuat kontrak sistem baru yang dapat menyajikan 8192 hash blok terakhir sebagai slot penyimpanan. Ini membantu mempersiapkan protokol untuk masa depan untuk eksekusi stateless dan menjadi lebih efisien ketika verkle tries diadopsi. Namun, terlepas dari ini, rollup dapat langsung memanfaatkannya, karena mereka dapat meminta kontrak secara langsung dengan jendela historis yang lebih panjang.

### Memindahkan indeks komite ke luar Atestasi {#7549}

Konsensus Rantai suar didasarkan pada validator yang memberikan suara mereka untuk blok terbaru dan Epok yang difinalisasi. Atestasi mencakup 3 elemen, 2 di antaranya adalah suara dan yang ketiga adalah nilai indeks komite.

[EIP-7549](https://eips.ethereum.org/EIPS/eip-7549) memindahkan indeks ini ke luar pesan atestasi yang ditandatangani, yang membuatnya lebih mudah untuk memverifikasi dan menggabungkan suara konsensus. Ini akan memungkinkan efisiensi yang lebih besar di setiap klien konsensus dan dapat membawa peningkatan kinerja yang signifikan pada sirkuit zero-knowledge untuk membuktikan konsensus Ethereum.

### Menambahkan jadwal blob ke file konfigurasi EL {#7840}

[EIP-7840](https://eips.ethereum.org/EIPS/eip-7840) adalah perubahan sederhana yang menambahkan bidang baru ke konfigurasi klien lapisan eksekusi. Ini mengonfigurasi jumlah blok, memungkinkan pengaturan dinamis untuk target dan jumlah blob maksimum per blok serta penyesuaian biaya blob. Dengan konfigurasi yang ditentukan secara langsung, klien dapat menghindari kompleksitas pertukaran informasi ini melalui Engine API.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Untuk mempelajari lebih lanjut tentang bagaimana Pectra memengaruhi Anda secara spesifik sebagai pengguna, pengembang, atau validator Ethereum, lihat <a href="https://epf.wiki/#/wiki/pectra-faq">Tanya Jawab Pectra</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Apakah pembaruan ini memengaruhi semua node dan validator Ethereum? {#client-impact}

Ya, pembaruan Pectra mewajibkan pembaruan pada [klien eksekusi dan klien konsensus](/developers/docs/nodes-and-clients/). Semua klien utama Ethereum akan merilis versi yang mendukung percabangan keras yang ditandai sebagai prioritas tinggi. Untuk mempertahankan sinkronisasi dengan jaringan Ethereum pasca-pembaruan, operator node harus memastikan mereka menjalankan versi klien yang didukung. Perhatikan bahwa informasi tentang rilis klien bersifat sensitif terhadap waktu, dan pengguna harus merujuk pada pembaruan terbaru untuk detail paling terkini.

## Bagaimana ETH dapat dikonversi setelah percabangan keras? {#scam-alert}

- **Tidak Ada Tindakan yang Diperlukan untuk ETH Anda**: Setelah pembaruan Pectra Ethereum, tidak perlu mengonversi atau memperbarui ETH Anda. Saldo akun Anda akan tetap sama, dan ETH yang Anda pegang saat ini akan tetap dapat diakses dalam bentuknya yang ada setelah percabangan keras.
- **Waspada Penipuan!** <Emoji text="⚠️" /> **siapa pun yang menginstruksikan Anda untuk "memperbarui" ETH Anda sedang mencoba menipu Anda.** Tidak ada yang perlu Anda lakukan sehubungan dengan pembaruan ini. Aset Anda akan tetap sama sekali tidak terpengaruh. Ingat, tetap mendapat informasi adalah pertahanan terbaik terhadap penipuan.

[Lebih lanjut tentang mengenali dan menghindari penipuan](/security/)

## Lebih suka belajar secara visual? {#visual-learner}

<VideoWatch slug="pectra-upgrade-overview" />

_Apa Saja yang Ada di Pembaruan Pectra? - Christine Kim_

<VideoWatch slug="pectra-what-stakers-need-to-know" />

_Pembaruan Pectra Ethereum: Apa yang Perlu Diketahui Staker — Blockdaemon_

## Bacaan lebih lanjut {#further-reading}

- [Peta jalan Ethereum](/roadmap/)
- [Tanya Jawab Pectra](https://epf.wiki/#/wiki/pectra-faq)
- [Bagaimana Pectra meningkatkan pengalaman staker](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Halaman info EIP7702](https://eip7702.io/)
- [Devnet Pectra](https://github.com/ethereum/pm/blob/master/Network-Upgrade-Archive/Pectra/pectra-pm.md)
