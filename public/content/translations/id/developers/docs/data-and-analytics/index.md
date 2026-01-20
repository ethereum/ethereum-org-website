---
title: Data dan analitik
description: Cara mendapatkan analitik dan data onchain untuk digunakan di dapps Anda
lang: id
---

## Pengenalan {#Introduction}

Karena pemanfaatan jaringan terus tumbuh, akan semakin banyak informasi berharga yang ada dalam data onchain. Seiring dengan peningkatan volume data yang cepat, menghitung dan menggabungkan informasi ini untuk melaporkannya atau menggerakkan suatu aplikasi terdesentralisasi bisa menjadi upaya yang memakan waktu dan proses yang besar.

Memanfaatkan penyedia data yang ada dapat mempercepat pengembangan, menghasilkan hasil yang lebih akurat, dan mengurangi upaya pemeliharaan yang sedang berlangsung. Ini akan memungkinkan tim untuk berkonsentrasi pada fungsionalitas inti yang coba disediakan oleh proyek mereka.

## Persyaratan {#prerequisites}

Anda harus memahami konsep dasar [Penjelajah Blok](/developers/docs/data-and-analytics/block-explorers/) untuk lebih memahami penggunaannya dalam konteks analitik data. Selain itu, biasakan diri Anda dengan konsep [indeks](/glossary/#index) untuk memahami manfaat yang ditambahkan ke desain sistem.

Dalam hal fundamental arsitektur, pahami apa itu [API](https://www.wikipedia.org/wiki/API) dan [REST](https://www.wikipedia.org/wiki/Representational_state_transfer), bahkan secara teori.

## Penjelajah blok {#block-explorers}

Banyak [Penjelajah Blok](/developers/docs/data-and-analytics/block-explorers/) menawarkan gateway [API](https://www.wikipedia.org/wiki/API) [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) yang akan memberikan visibilitas kepada para pengembang ke dalam data waktu nyata tentang blok, transaksi, validator, akun, dan aktivitas on-chain lainnya.

Pengembang kemudian dapat memproses dan mengubah data ini untuk memberikan wawasan dan interaksi unik kepada pengguna mereka dengan [blockchain](/glossary/#blockchain). Misalnya, [Etherscan](https://etherscan.io) dan [Blockscout](https://eth.blockscout.com) menyediakan data eksekusi dan konsensus untuk setiap slot 12 detik.

## The Graph {#the-graph}

[The Graph](https://thegraph.com/) adalah protokol pengindeksan yang menyediakan cara mudah untuk menanyakan data blockchain melalui API terbuka yang dikenal sebagai subgraf.

Dengan The Graph, pengembang dapat memperoleh manfaat dari:

- Pengindeksan terdesentralisasi: Memungkinkan pengindeksan data blockchain melalui beberapa pengindeks, sehingga menghilangkan titik kegagalan tunggal
- Kueri GraphQL: Menyediakan antarmuka GraphQL yang canggih untuk melakukan kueri pada data indeks, sehingga pengambilan data menjadi sangat mudah
- Kustomisasi: Definisikan logika Anda sendiri untuk mengubah & menyimpan data blockchain, dan gunakan kembali subgraf yang diterbitkan oleh pengembang lain di The Graph Network

Ikuti panduan [mulai cepat](https://thegraph.com/docs/en/quick-start/) ini untuk membuat, menerapkan, dan menanyakan subgraf dalam 5 menit.

## Keanekaragaman klien {#client-diversity}

[Keanekaragaman klien](/developers/docs/nodes-and-clients/client-diversity/) penting untuk kesehatan jaringan Ethereum secara keseluruhan karena memberikan ketahanan terhadap bug dan eksploitasi. Saat ini ada beberapa dasbor keanekaragaman klien termasuk [clientdiversity.org](https://clientdiversity.org/), [rated.network](https://www.rated.network), [supermajority.info](https://supermajority.info//) dan [Ethernodes](https://ethernodes.org/).

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/) memproses awal data blockchain ke dalam tabel basis data relasional (DuneSQL), memungkinkan pengguna untuk menanyakan data blockchain menggunakan SQL dan membangun dasbor berdasarkan hasil kueri. Data on-chain diatur ke dalam 4 tabel mentah: `blocks`, `transactions`, `logs` (peristiwa), dan `traces` (panggilan). Kontrak dan protokol populer telah diterjemahkan, dan masing-masing memiliki rangkaian acara dan tabel panggilannya sendiri. Tabel peristiwa dan tabel panggilan tersebut diproses lebih lanjut dan diatur ke dalam tabel abstraksi berdasarkan jenis protokol, misalnya, dex, peminjaman, stablecoin, dll.

## SQD {#sqd}

[SQD](https://sqd.dev/) adalah platform data terdesentralisasi yang sangat dapat diskalakan yang dioptimalkan untuk menyediakan akses tanpa izin yang efisien ke volume data yang besar. Saat ini melayani data on-chain historis, termasuk log peristiwa, tanda terima transaksi, pelacakan, dan perbedaan status per transaksi. SQD menawarkan toolkit yang kuat untuk membuat ekstraksi data khusus dan jalur pemrosesan, mencapai kecepatan pengindeksan hingga 150 ribu blok per detik.

Untuk memulai, kunjungi [dokumentasi](https://docs.sqd.dev/) atau lihat [contoh EVM](https://github.com/subsquid-labs/squid-evm-examples) tentang apa yang dapat Anda bangun dengan SQD.

## Jaringan SubQuery {#subquery-network}

[SubQuery](https://subquery.network/) adalah pengindeks data terkemuka yang memberi pengembang API yang cepat, andal, terdesentralisasi, dan dapat disesuaikan untuk proyek web3 mereka. SubQuery memberdayakan para pengembang dari lebih dari 165+ ekosistem (termasuk Ethereum) dengan data yang diindeks yang kaya untuk membangun pengalaman yang intuitif dan imersif bagi para penggunanya. Jaringan SubQuery memberdayakan aplikasi Anda yang tak terhentikan dengan jaringan infrastruktur yang tangguh dan terdesentralisasi. Gunakan toolkit pengembang blockchain SubQuery untuk membangun aplikasi web3 di masa depan, tanpa menghabiskan waktu untuk membangun backend khusus untuk aktivitas pemrosesan data.

Untuk memulai, kunjungi [panduan mulai cepat Ethereum](https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html) untuk mulai mengindeks data blockchain Ethereum dalam beberapa menit di lingkungan Docker lokal untuk pengujian sebelum ditayangkan di [layanan terkelola SubQuery](https://managedservice.subquery.network/) atau di [jaringan terdesentralisasi SubQuery](https://app.subquery.network/dashboard).

## Bahasa Kueri EVM {#evm-query-language}

EVM Query Language (EQL) adalah bahasa mirip SQL yang dirancang untuk melakukan kueri terhadap rantai EVM (Ethereum Virtual Machine). Tujuan utama EQL adalah mendukung query relasional yang kompleks pada first-class citizens di EVM chain (blok, akun, dan transaksi), sekaligus menyediakan sintaks yang ergonomis bagi pengembang dan peneliti untuk penggunaan sehari-hari. Dengan EQL, pengembang dapat mengambil data blockchain menggunakan sintaks mirip SQL yang sudah dikenal, sehingga menghilangkan kebutuhan akan kode boilerplate yang kompleks. EQL mendukung permintaan data blockchain standar (misalnya, mengambil nonce dan saldo akun di Ethereum atau mendapatkan ukuran blok dan timestamp saat ini) dan secara terus-menerus menambahkan dukungan untuk permintaan dan fitur yang lebih kompleks.

## Bacaan Lebih Lanjut {#bacaan-lebih lanjut}

- [Menjelajahi Data Kripto I: Arsitektur Aliran Data](https://web.archive.org/web/20250125012042/https://research.2077.xyz/exploring-crypto-data-1-data-flow-architectures)
- [Tinjauan Graph Network](https://thegraph.com/docs/en/about/)
- [Arena Kueri Graph](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [Contoh kode API di EtherScan](https://etherscan.io/apis#contracts)
- [Dokumentasi API di Blockscout](https://docs.blockscout.com/devs/apis)
- [Penjelajah Rantai Suar Beaconcha.in](https://beaconcha.in)
- [Dasar-dasar Dune](https://docs.dune.com/#dune-basics)
- [Panduan Mulai Cepat SubQuery Ethereum](https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-gravatar.html)
- [Gambaran Jaringan SQD](https://docs.sqd.dev/)
- [Bahasa Kueri EVM](https://eql.sh/blog/alpha-release-notes)
