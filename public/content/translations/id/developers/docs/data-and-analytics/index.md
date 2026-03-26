---
title: Data dan analitik
description: Cara mendapatkan analitik dan data onchain untuk digunakan dalam dapps Anda
lang: id
---

## Pengantar {#Introduction}

Seiring dengan terus berkembangnya pemanfaatan jaringan, semakin banyak informasi berharga yang akan ada dalam data onchain. Karena volume data meningkat dengan cepat, menghitung dan mengumpulkan informasi ini untuk dilaporkan atau menggerakkan sebuah dapp dapat menjadi upaya yang memakan banyak waktu dan proses.

Memanfaatkan penyedia data yang ada dapat mempercepat pengembangan, menghasilkan hasil yang lebih akurat, dan mengurangi upaya pemeliharaan yang berkelanjutan. Hal ini akan memungkinkan tim untuk berkonsentrasi pada fungsionalitas inti yang coba disediakan oleh proyek mereka.

## Prasyarat {#prerequisites}

Anda harus memahami konsep dasar [Penjelajah Blok](/developers/docs/data-and-analytics/block-explorers/) agar dapat lebih memahami penggunaannya dalam konteks analitik data. Selain itu, biasakan diri Anda dengan konsep [indeks](/glossary/#index) untuk memahami manfaat yang mereka tambahkan ke desain sistem.

Dalam hal dasar-dasar arsitektur, pahami apa itu [API](https://www.wikipedia.org/wiki/API) dan [REST](https://www.wikipedia.org/wiki/Representational_state_transfer), bahkan secara teori.

## Penjelajah blok {#block-explorers}

Banyak [Penjelajah Blok](/developers/docs/data-and-analytics/block-explorers/) menawarkan gateway [API](https://www.wikipedia.org/wiki/API) [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) yang akan memberikan pengembang visibilitas ke dalam data waktu nyata pada blok, transaksi, validator, akun, dan aktivitas onchain lainnya.

Pengembang kemudian dapat memproses dan mengubah data ini untuk memberikan wawasan dan interaksi unik kepada pengguna mereka dengan [blockchain](/glossary/#blockchain). Misalnya, [Etherscan](https://etherscan.io) dan [Blockscout](https://eth.blockscout.com) menyediakan data eksekusi dan konsensus untuk setiap slot 12 detik.

## The Graph {#the-graph}

[The Graph](https://thegraph.com/) adalah protokol pengindeksan yang menyediakan cara mudah untuk meminta (query) data blockchain melalui API terbuka yang dikenal sebagai subgraf.

Dengan The Graph, pengembang dapat memperoleh manfaat dari:

- Pengindeksan terdesentralisasi: Memungkinkan pengindeksan data blockchain melalui beberapa pengindeks, sehingga menghilangkan titik kegagalan tunggal
- Kueri GraphQL: Menyediakan antarmuka GraphQL yang kuat untuk meminta data yang diindeks, membuat pengambilan data menjadi sangat sederhana
- Kustomisasi: Tentukan logika Anda sendiri untuk mengubah & menyimpan data blockchain, dan gunakan kembali subgraf yang diterbitkan oleh pengembang lain di The Graph Network

Ikuti panduan [mulai cepat](https://thegraph.com/docs/en/quick-start/) ini untuk membuat, menerapkan, dan meminta subgraf dalam waktu 5 menit.

## Keragaman klien {#client-diversity}

[Keragaman klien](/developers/docs/nodes-and-clients/client-diversity/) penting untuk kesehatan jaringan Ethereum secara keseluruhan karena memberikan ketahanan terhadap bug dan eksploitasi. Sekarang ada beberapa dasbor keragaman klien termasuk [clientdiversity.org](https://clientdiversity.org/), [rated.network](https://www.rated.network), [supermajority.info](https://supermajority.info//) dan [Ethernodes](https://ethernodes.org/).

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/) memproses awal data blockchain ke dalam tabel basis data relasional (DuneSQL), memungkinkan pengguna untuk meminta data blockchain menggunakan SQL dan membangun dasbor berdasarkan hasil kueri. Data onchain diatur ke dalam 4 tabel mentah: `blocks`, `transactions`, `logs` (acara), dan `traces` (panggilan). Kontrak dan protokol populer telah didekodekan, dan masing-masing memiliki kumpulan tabel acara dan panggilannya sendiri. Tabel acara dan panggilan tersebut diproses lebih lanjut dan diatur ke dalam tabel abstraksi berdasarkan jenis protokol, misalnya, dex, pinjaman, stablecoin, dll.

## SQD {#sqd}

[SQD](https://sqd.dev/) adalah platform data hiper-skalabel terdesentralisasi yang dioptimalkan untuk menyediakan akses tanpa izin yang efisien ke volume data yang besar. Saat ini, platform ini menyajikan data onchain historis, termasuk log acara, tanda terima transaksi, jejak, dan perbedaan status per transaksi. SQD menawarkan perangkat yang kuat untuk membuat ekstraksi data kustom dan alur pemrosesan, mencapai kecepatan pengindeksan hingga 150 ribu blok per detik.

Untuk memulai, kunjungi [dokumentasi](https://docs.sqd.dev/) atau lihat [contoh EVM](https://github.com/subsquid-labs/squid-evm-examples) tentang apa yang dapat Anda bangun dengan SQD.

## SubQuery Network {#subquery-network}

[SubQuery](https://subquery.network/) adalah pengindeks data terkemuka yang memberikan pengembang API yang cepat, andal, terdesentralisasi, dan dapat disesuaikan untuk proyek web3 mereka. SubQuery memberdayakan pengembang dari lebih dari 165+ ekosistem (termasuk Ethereum) dengan data terindeks yang kaya untuk membangun pengalaman yang intuitif dan imersif bagi pengguna mereka. SubQuery Network menggerakkan aplikasi Anda yang tak terhentikan dengan jaringan infrastruktur yang tangguh dan terdesentralisasi. Gunakan perangkat pengembang blockchain SubQuery untuk membangun aplikasi web3 masa depan, tanpa menghabiskan waktu membangun backend kustom untuk aktivitas pemrosesan data.

Untuk memulai, kunjungi [panduan mulai cepat Ethereum](https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html) untuk mulai mengindeks data blockchain Ethereum dalam hitungan menit di lingkungan Docker lokal untuk pengujian sebelum ditayangkan di [layanan terkelola SubQuery](https://managedservice.subquery.network/) atau di [jaringan terdesentralisasi SubQuery](https://app.subquery.network/dashboard).

## Codex {#codex}

[Codex](https://www.codex.io/) adalah API data blockchain waktu nyata yang menyediakan data yang diperkaya untuk lebih dari 70 juta token di 80+ jaringan. Pengembang dapat mengakses harga token terstruktur, saldo dompet, riwayat transaksi, dan analitik agregat (volume, likuiditas, dompet unik) tanpa memelihara infrastruktur pengindeksan kustom. Codex mendukung pengiriman data sub-detik melalui integrasi WebSocket dan webhook.

Untuk memulai, kunjungi [dokumentasi](https://docs.codex.io), coba [Explorer](https://docs.codex.io/explore), atau daftar di [dasbor](https://dashboard.codex.io/signup).

## EVM Query Language {#evm-query-language}

EVM Query Language (EQL) adalah bahasa mirip SQL yang dirancang untuk meminta (query) rantai EVM (Mesin Virtual Ethereum). Tujuan utama EQL adalah untuk mendukung kueri relasional yang kompleks pada warga kelas satu rantai EVM (blok, akun, dan transaksi) sambil memberikan pengembang dan peneliti sintaksis yang ergonomis untuk penggunaan sehari-hari. Dengan EQL, pengembang dapat mengambil data blockchain menggunakan sintaksis mirip SQL yang familier dan menghilangkan kebutuhan akan kode boilerplate yang kompleks. EQL mendukung permintaan data blockchain standar (misalnya, mengambil nonce dan saldo akun di Ethereum atau mengambil ukuran blok dan stempel waktu saat ini) dan terus menambahkan dukungan untuk permintaan dan kumpulan fitur yang lebih kompleks.

## Bacaan Lebih Lanjut {#further-reading}

- [Mengeksplorasi Data Kripto I: Arsitektur Aliran Data](https://web.archive.org/web/20250125012042/https://research.2077.xyz/exploring-crypto-data-1-data-flow-architectures)
- [Ikhtisar Graph Network](https://thegraph.com/docs/en/about/)
- [Taman Bermain Kueri Graph](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [Contoh kode API di EtherScan](https://etherscan.io/apis#contracts)
- [Dokumentasi API di Blockscout](https://docs.blockscout.com/devs/apis)
- [Penjelajah Beacon Chain Beaconcha.in](https://beaconcha.in)
- [Dasar-dasar Dune](https://docs.dune.com/#dune-basics)
- [Panduan Mulai Cepat Ethereum SubQuery](https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-gravatar.html)
- [Ikhtisar Jaringan SQD](https://docs.sqd.dev/)
- [EVM Query Language](https://eql.sh/blog/alpha-release-notes)

## Tutorial: Data & analitik / SQL di Ethereum {#tutorials}

- [Pelajari Topik Dasar Ethereum dengan SQL](/developers/tutorials/learn-foundational-ethereum-topics-with-sql/) _– Kueri data Ethereum onchain dengan SQL untuk memahami dasar-dasar transaksi, blok, dan gas._