---
title: "Mengapa membangun di Ethereum"
description: "Desentralisasi, ketahanan sensor, penyebaran tanpa izin, dan komposabilitas bukanlah nilai jual yang terpisah. Semuanya saling memperkuat. Panduan praktis tentang mengapa pembangun harus memilih Ethereum."
author: "Philip Krause"
team: "EF Builder Growth"
tags:
  - "desentralisasi"
  - "ketahanan sensor"
  - "komposabilitas"
published: 2026-05-12
image: /images/developers/blog/latest-post-header-1.png
breadcrumb: Mengapa membangun di Ethereum
lang: id
---

Pembangun memilih infrastruktur berdasarkan janji yang harus ditepati oleh aplikasi mereka.

Sebagian besar janji perangkat lunak bergantung pada operator. Penyedia cloud menjaga server tetap berjalan. Sebuah platform menjaga akun tetap terbuka. Pemroses pembayaran menjaga pedagang tetap aktif. Penyedia API menjaga kunci tetap valid. Hal itu tidak masalah untuk banyak produk. Namun, itu tidak cukup ketika nilai produk bergantung pada akses netral, state bersama, dan komitmen yang dapat diverifikasi sendiri oleh pengguna dan pengembang lain.

Ethereum dibangun untuk kasus kedua, di mana akses netral dan komitmen yang dapat diverifikasi adalah produknya. Tidak ada yang memilikinya. Rantai ini berjalan di banyak negara, banyak operator, dan berbagai implementasi klien independen, dan tidak ada satu pun perusahaan, validator, atau yayasan yang dapat secara diam-diam menulis ulang aturannya. Bagi seorang pembangun, itu berarti ini bukan sekadar tempat untuk meng-host kode. Ini adalah tempat untuk membuat komitmen publik. Anda dapat merilis tanpa meminta izin siapa pun, pengguna dapat terus menjangkau apa yang Anda sebarkan, pengembang lain dapat membangun di atasnya tanpa izin Anda, dan aplikasi Anda dapat terus berfungsi bahkan ketika salah satu pihak, termasuk Anda, berhenti bekerja sama.

## Desentralisasi {#decentralization}

Desentralisasi adalah fondasi tempat berdirinya properti-properti tersebut. Ethereum menyediakannya melalui jaringan komputer, yang disebut node, yang masing-masing menyimpan salinan rantai dan memeriksa setiap transaksi. Setiap node menjalankan perangkat lunak klien. Sebagian dari node, yang disebut validator, bergiliran mengusulkan dan mengonfirmasi blok baru melalui proses yang disebut konsensus. Untuk berpartisipasi, validator menempatkan ETH sebagai kolateral, yang disebut stake, yang akan hilang jika mereka melanggar aturan. Sekitar 13.700 hingga 14.000 node terlacak di pelacak node Etherscan pada bulan April 2026, tersebar di Amerika Serikat, Jerman, Tiongkok, Inggris, Rusia, Jepang, dan puluhan negara lainnya.

Desentralisasi juga bersifat ekonomi. Sekitar 32 hingga 36 juta ETH, sekitar 27 hingga 29% dari pasokan, di-stake sebagai kolateral yang akan dipotong oleh protokol ketika validator terbukti berperilaku buruk. Seorang penyerang perlu memperoleh dan mempertaruhkan sebagian besar dari stake tersebut untuk merusak rantai. Pada harga ETH bulan April 2026, itu berarti puluhan miliar dolar akan dipertaruhkan.

Dimensi lainnya adalah perangkat lunak itu sendiri. Setiap node Ethereum menjalankan dua perangkat lunak secara berdampingan. Klien eksekusi menjalankan EVM dan melacak state kontrak. Klien konsensus menangani Bukti Kepemilikan (PoS). Klien ini melacak validator mana yang mengusulkan blok, blok mana yang diterima jaringan, dan kapan sebuah blok mencapai finalitas. Desentralisasi yang sehat membutuhkan beberapa implementasi independen dari masing-masing klien, sehingga bug pada satu klien tidak secara otomatis menjadi bug di Ethereum.

Lapisan eksekusi memiliki lima klien utama dalam produksi. Go Ethereum (Geth) berjalan pada sekitar 50%, Nethermind sekitar 25%, Besu sekitar 9%, Reth sekitar 8%, dan Erigon sekitar 7%. Lapisan konsensus berjalan pada Lighthouse, Prysm, Teku, Nimbus, Lodestar, dan klien lainnya. Ethereum bukanlah rantai klien tunggal pada lapisan mana pun.

Pangsa Geth yang mendekati 50% adalah kerentanan yang nyata. Bug pada klien minoritas menyusahkan operatornya, tetapi sisa jaringan dapat terus berjalan. Bug yang parah pada klien mayoritas jauh lebih berbahaya. Itulah sebabnya keragaman klien menjadi prioritas operasional yang aktif.

Prioritas tersebut telah diuji. Ethereum tidak pernah mengalami penghentian rantai penuh sejak genesis pada 30 Juli 2015. Insiden besar yang paling mendekati terjadi pada 11 hingga 12 Mei 2023, ketika lapisan konsensus, yang disebut Rantai suar, gagal mencapai finalitas selama sekitar 25 menit dan kemudian selama sekitar 64 menit. Penyebabnya adalah bug klien Prysm. Finalitas mensyaratkan lebih dari dua pertiga validator untuk membuktikan (attest), dan pangsa Prysm pada saat itu cukup tinggi sehingga masalahnya secara singkat menarik jaringan di bawah ambang batas tersebut.

Kemacetan finalitas tidak sama dengan penghentian rantai. Blok baru terus diproduksi, transaksi terus dimasukkan, dan sebagian besar pengguna serta aplikasi terus bekerja. Yang macet adalah jaminan penyelesaian terkuat Ethereum. Di bawah asumsi konsensus normal, blok yang lebih lama dari sekitar 13 menit tidak dapat dikembalikan. Jembatan (bridge), bursa, dan sistem lain yang menunggu finalitas sebelum mengkreditkan deposit akan menghentikan sementara aliran tersebut. Rantai itu sendiri pulih secara otomatis setelah cukup banyak validator yang menyusul, tanpa intervensi manual.

Bagi pembangun, sejarah itu penting. Jika orang lain akan menyimpan aset di kontrak Anda, merutekan pesanan melalui pasar Anda, atau membangun di atas primitif Anda, mereka membutuhkan fondasi di bawahnya untuk terus berjalan melewati bug, kegagalan klien, dan tekanan institusional.

## Ketahanan sensor {#censorship-resistance}

Desentralisasi adalah strukturnya. Ketahanan sensor adalah salah satu hal praktis yang dihasilkannya. Pengguna seharusnya tidak memerlukan izin dari perusahaan, pemerintah, relai, validator, penyedia RPC, atau operator aplikasi untuk mengirim transaksi yang valid ke kontrak Anda.

Itu tidak berarti setiap transaksi mendarat di blok berikutnya. Itu berarti tidak ada satu pihak pun yang dapat menjauhkan transaksi yang valid dari rantai selamanya. Setiap blok diusulkan oleh validator yang berbeda, yang bekerja dengan pihak luar, yang disebut pembangun dan relai, untuk merakitnya. Jika salah satu dari mereka memfilter transaksi Anda, slot berikutnya memiliki kumpulan yang berbeda, dan pada akhirnya salah satu dari mereka akan memasukkannya. Penyensoran harus bertahan di seluruh pemeran yang berputar itu, yang jauh lebih sulit daripada satu operator yang mengatakan tidak. Periode pasca-Tornado Cash menunjukkan seperti apa hal itu di bawah tekanan.

Tornado Cash adalah kontrak pencampur privasi yang memutus tautan onchain antara deposit dan penarikan. Setelah OFAC memberikan sanksi pada bulan Agustus 2022, beberapa relai MEV-Boost utama menolak untuk meneruskan blok yang berisi transaksi dari alamat yang disanksi. Pangsa blok yang dibangun melalui relai yang mematuhi OFAC tersebut memuncak di dekat 79% pada bulan November 2022. Sisa 21% berasal dari relai dan pembangun yang tidak memfilter, sehingga transaksi Tornado Cash tetap mendarat, hanya saja lebih lambat. Waktu tunggu yang diharapkan naik dari sekitar 12 detik menjadi sekitar satu menit.

Hal itu tampak mengkhawatirkan, dan memang demikian. Kemudian pangsanya turun. Relai baru diluncurkan secara eksplisit tanpa filter, termasuk Ultra Sound dan Agnostic, dan pengusul bebas menambahkannya ke pengaturan MEV-Boost mereka. Tidak ada yang bisa memaksa setiap pengusul ke relai pemfilteran, sehingga pangsanya tidak bisa bertahan di puncaknya. Pada awal 2023, angkanya berada di bawah 50%, dan sepanjang sisa tahun 2023 berkisar antara 27% dan 47%. OFAC menghapus Tornado Cash dari daftar sanksi pada bulan Maret 2025. Episode ini tetap menjadi uji stres ketahanan sensor Ethereum yang paling jelas.

Ethereum juga memindahkan lebih banyak jaminan ini ke dalam protokol itu sendiri. Peningkatan yang direncanakan yang disebut FOCIL (EIP-7805) menambahkan daftar inklusi. Validator yang dipilih secara acak memublikasikan transaksi yang mereka lihat di mempool publik, dan blok berikutnya diharapkan memenuhi daftar tersebut. Jika sebuah blok mengabaikannya, sisa jaringan dapat menolaknya. Jadi tidak ada yang bisa menghentikan pengguna Anda untuk menggunakan aplikasi Anda.

## Tanpa izin {#permissionless}

Ketahanan sensor adalah tentang apakah pengguna dapat terus menjangkau aplikasi Anda setelah Anda merilisnya. Sifat tanpa izin adalah tentang apakah Anda dapat merilisnya sejak awal.

Menyebarkan di Ethereum tidak memerlukan kemitraan, akun, persetujuan pencatatan, ulasan toko aplikasi, atau perjanjian komersial. Siapa pun dapat menyebarkan kode, memanggil kontrak, menjalankan node, mengindeks data, membangun dompet, atau memublikasikan antarmuka. Lapisan dasar tidak tahu apakah Anda sebuah startup, bank, pengembang solo, agen, DAO, atau pengguna tanpa perusahaan sama sekali.

Hal itu mengubah model pembangun. Di sebuah platform, pemilik platform dapat mengubah persyaratan, mencabut kunci, memblokir wilayah, menghapus aplikasi, atau membuat akses bersyarat pada hubungan bisnis. Di Ethereum, protokol mengevaluasi transaksi dengan aturan publik yang sama untuk pemanggil mana pun. Kontrak yang disebarkan hari ini berjalan berdasarkan aturan publik tersebut untuk setiap alamat selama rantai terus berjalan.

Ini tidak menghilangkan setiap ketergantungan. Sebagian besar pengguna tidak menjangkau kontrak Anda secara langsung. Mereka melalui frontend, dompet, dan penyedia RPC, dan lapisan mana pun dari lapisan tersebut dapat rusak atau memfilter. Frontend dapat diturunkan. Penyedia RPC, layanan yang merutekan sebagian besar permintaan aplikasi dan dompet ke rantai, dapat menolak untuk meneruskan transaksi atau memblokir wilayah dan alamat tertentu. Dompet dapat memilih apa yang mereka tampilkan.

Lingkungan eksekusi dasar tetap terbuka di bawahnya. Jika frontend Anda mati, pengguna masih dapat memanggil kontrak secara langsung, dan pengembang lain dapat membangun antarmuka baru. Jika dompet berhenti mendukung token Anda, kontrak tetap berfungsi. Jika satu penyedia RPC memfilter, aplikasi dapat merutekan melalui penyedia lain atau menjalankan node-nya sendiri untuk menjangkau jaringan.

## Komposabilitas {#composability}

Sifat tanpa izin membawa kode Anda ke rantai. Setelah berada di sana, tidak ada yang bisa menurunkannya, sehingga pengembang lain dapat membangun di atas kontrak Anda, dan Anda dapat membangun di atas kontrak mereka.

WETH adalah contoh paling jelas. Ini adalah kontrak yang membungkus ETH sehingga dapat digunakan seperti token standar di kontrak lain. Kontrak ini berada di satu alamat Ethereum tetap, menyimpan sekitar 1,8 juta WETH pada Mei 2026, memiliki sekitar 3,25 juta pemegang, dan bertindak sebagai unit umum di seluruh DEX, pasar peminjaman, brankas (vault), dan jembatan. Ini adalah kode yang dapat digunakan secara langsung oleh ribuan kontrak dan aplikasi lain.

Pola tersebut berulang di seluruh ekosistem. Dari genesis hingga awal 2025, Ethereum melihat puluhan juta penyebaran kontrak dan sekitar 2,5 juta bytecode unik menurut hitungan Zellic. Standar seperti ERC-20 untuk token yang dapat dipertukarkan (fungible) dan ERC-721 untuk token yang tidak dapat dipertukarkan (NFT) menjadi lapisan koordinasi. Token yang dipancarkan kontrak Anda dapat diperdagangkan di DEX, dipinjam di pasar uang, diindeks oleh alat analitik, ditampilkan di dompet, dan dijembatani atau dibungkus oleh sistem lain tanpa setiap tim menegosiasikan perjanjian khusus.

Pada Mei 2026, sekitar $46 miliar berada di keuangan terdesentralisasi (DeFi) di Ethereum. Uang tersebut terkunci di dalam ribuan protokol yang berfungsi, termasuk aset, pasar, oracle, dompet, sistem akun, kontrak tata kelola, jembatan, analitik, dan alat pengembang. Semuanya adalah kode yang dapat Anda panggil secara langsung pada hari pertama, alih-alih membangun dari awal atau menunggu kemitraan.

## Ekonomi agen {#the-agent-economy}

Akses tanpa izin dan ketahanan sensor, dengan desentralisasi di bawahnya, menjadi lebih penting bagi gelombang pengguna berikutnya yang memasuki Ethereum. Agen AI adalah gelombang tersebut, dan mereka membayar layanan, memegang modal, dan melakukan penyelesaian dengan agen lain melalui transaksi dan panggilan kontrak, semuanya tanpa campur tangan manusia. Agen tidak memiliki kartu untuk ditagih, tidak ada akun platform untuk ditangguhkan, dan tidak ada manusia untuk dihubungi ketika relai menolak untuk meneruskan transaksi. Itulah sebabnya keduanya berhenti menjadi opsional untuk jenis perangkat lunak tersebut, dan properti Ethereum sangat cocok dengan apa yang sebenarnya dibutuhkan oleh agen. Ethereum adalah tempat di mana ekonomi tersebut diharapkan akan berlangsung, dan itu dapat menumbuhkan basis pengguna secara luar biasa.

Baik Anda merilis agen atau merilis kontrak yang dipanggil agen, masalah yang sama akan muncul. Pada tumpukan yang di-host pada umumnya, identitas agen disewa dari akun platform yang dapat dicabut. Pembayarannya bergantung pada kartu manusia atau kunci API. Aturannya berjalan di server yang dikendalikan operator. Kelangsungannya bergantung pada host yang bisa menghilang. Setiap ketergantungan tersebut adalah apa yang dirancang untuk dihilangkan oleh lapisan dasar Ethereum.

Di Ethereum, tidak satu pun dari hal itu bergantung pada operator. Kunci agen adalah miliknya sendiri, dan aturan yang ditandatanganinya tidak dapat ditulis ulang secara sepihak. Transaksinya melalui pemeran validator, pembangun, dan relai yang berputar sama yang melindungi alamat lain mana pun dari pemblokiran yang ditargetkan. Transisi state terjadi di depan umum, sehingga kontrak di sisi lain panggilan tidak perlu memercayai operator untuk melaporkan apa yang terjadi.

Relnya sudah terpasang. Kontrak pintar (smart contract), stablecoin, dan abstraksi akun memberi aktor otonom alamat yang berfungsi, saldo yang berfungsi, dan batas pengeluaran yang dapat diprogram saat ini. Standar untuk identitas agen dan pembayaran asli mesin sedang mengejar ketertinggalan. ERC-8004 mendefinisikan registri onchain untuk identitas, reputasi, dan validasi agen. x402 menggunakan kode status HTTP 402 untuk memungkinkan klien, termasuk agen, membayar API dan layanan digital dalam stablecoin tanpa akun tradisional. Adopsinya masih awal tetapi terus bergerak, dan permukaan integrasinya kecil. Terima pembayaran x402 di titik akhir (endpoint) Anda, daftar atau periksa identitas melalui ERC-8004, dan perlakukan alamat agen sebagai pengguna kelas satu di kontrak Anda.

Bagi pembangun mana pun yang memilih rantai untuk merilis, agen adalah kelas pengguna berikutnya yang terbentuk, dan relnya sudah aktif. Kontrak yang Anda sebarkan hari ini dapat melayani mereka besok tanpa menunggu protokol masa depan.

## Kesimpulan {#conclusion}

Desentralisasi, ketahanan sensor, penyebaran tanpa izin, dan komposabilitas bukanlah nilai jual yang terpisah. Semuanya saling memperkuat. Desentralisasi membuat ketahanan sensor menjadi kredibel dan memungkinkan pengguna terus menjangkau apa yang dirilis. Penyebaran tanpa izin memungkinkan pembangun untuk merilis. Komposabilitas mengubah aplikasi tersebut menjadi infrastruktur bersama. Agen otonom dapat bertransaksi melaluinya dan tidak ada yang dapat menghentikan mereka. Apa yang Anda rilis adalah komitmen publik. Itu terus berjalan tanpa Anda.

## Bacaan lebih lanjut {#further-reading}

- [Yayasan Ethereum Checkpoint #9 (April 2026)](https://blog.ethereum.org/2026/04/10/checkpoint-9)
- [clientdiversity.org](https://clientdiversity.org/)
- [Pelacak Node Etherscan](https://etherscan.io/nodetracker)
- [validator beaconcha.in](https://beaconcha.in/charts/validators)
- [Post-mortem: Finalitas Mainnet Mei 2023](https://medium.com/offchainlabs/post-mortem-report-ethereum-mainnet-finality-05-11-2023-95e271dfd8b2)
- [mevwatch.info](https://www.mevwatch.info/)
- [The Block: Blok yang mematuhi OFAC turun menjadi 27%](https://www.theblock.co/post/230179/ethereums-ofac-compliant-blocks-fall-to-27-marking-a-drop-in-protocol-level-censorship)
- [Proposal Hegotá Headliner: FOCIL (EIP-7805)](https://ethereum-magicians.org/t/hegota-headliner-proposal-focil-eip-7805/27604)
- [EIP-7805: Daftar Inklusi yang Ditegakkan Pilihan Percabangan (FOCIL)](https://eips.ethereum.org/EIPS/eip-7805)
- [EIP-8004: Identitas Agen Onchain](https://eips.ethereum.org/EIPS/eip-8004)
- [GitHub coinbase/x402](https://github.com/coinbase/x402)
- [CoinDesk: Permintaan x402 belum terwujud](https://www.coindesk.com/markets/2026/03/11/coinbase-backed-ai-payments-protocol-wants-to-fix-micropayment-but-demand-is-just-not-there-yet)
- [WETH di Etherscan](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
- [Zellic: Semua kontrak Ethereum](https://www.zellic.io/blog/all-ethereum-contracts/)
- [DefiLlama: Rantai Ethereum](https://defillama.com/chain/ethereum)
- [OpenZeppelin: Penilaian Risiko Teknis pada Jaringan Rantai Blok (April 2026)](https://openzeppelin.com/hubfs/OpenZeppelin%20%7C%20Technical%20Risk%20Assessment%20on%20Blockchain%20Networks.pdf)