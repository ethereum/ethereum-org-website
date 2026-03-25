---
title: Penyimpanan Terdesentralisasi
description: Gambaran umum tentang apa itu penyimpanan terdesentralisasi dan alat yang tersedia untuk mengintegrasikannya ke dalam dapp.
lang: id
---

Tidak seperti server terpusat yang dioperasikan oleh satu perusahaan atau organisasi, sistem penyimpanan terdesentralisasi terdiri dari jaringan peer-to-peer dari pengguna-operator yang menyimpan sebagian dari keseluruhan data, menciptakan sistem berbagi penyimpanan file yang tangguh. Ini bisa berada dalam aplikasi berbasis blockchain atau jaringan berbasis peer-to-peer apa pun.

Ethereum sendiri dapat digunakan sebagai sistem penyimpanan terdesentralisasi, dan memang demikian halnya dalam penyimpanan kode di semua kontrak pintar. Namun, ketika menyangkut jumlah data yang besar, bukan itu tujuan desain Ethereum. Rantai ini terus berkembang, tetapi pada saat penulisan, rantai Ethereum berukuran sekitar 500GB - 1TB ([tergantung pada klien](https://etherscan.io/chartsync/chaindefault)), dan setiap node di jaringan harus dapat menyimpan semua data tersebut. Jika rantai tersebut diperluas ke jumlah data yang besar (katakanlah 5TB), tidak akan layak bagi semua node untuk terus berjalan. Selain itu, biaya untuk menerapkan data sebanyak ini ke Mainnet akan sangat mahal karena biaya [gas](/developers/docs/gas).

Karena kendala ini, kita memerlukan rantai atau metodologi yang berbeda untuk menyimpan data dalam jumlah besar secara terdesentralisasi.

Saat melihat opsi penyimpanan terdesentralisasi (dStorage), ada beberapa hal yang harus diingat oleh pengguna.

- Mekanisme persistensi / struktur insentif
- Penegakan retensi data
- Desentralisasi
- Konsensus

## Mekanisme persistensi / struktur insentif {#persistence-mechanism}

### Berbasis blockchain {#blockchain-based}

Agar sepotong data dapat bertahan selamanya, kita perlu menggunakan mekanisme persistensi. Misalnya, di Ethereum, mekanisme persistensinya adalah seluruh rantai perlu diperhitungkan saat menjalankan node. Potongan data baru ditambahkan ke ujung rantai, dan terus berkembang - mengharuskan setiap node untuk mereplikasi semua data yang tertanam.

Ini dikenal sebagai persistensi **berbasis blockchain**.

Masalah dengan persistensi berbasis blockchain adalah bahwa rantai bisa menjadi terlalu besar untuk dipelihara dan menyimpan semua data secara layak (misalnya, [banyak sumber](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/) memperkirakan Internet membutuhkan lebih dari 40 Zettabyte kapasitas penyimpanan).

Blockchain juga harus memiliki semacam struktur insentif. Untuk persistensi berbasis blockchain, ada pembayaran yang dilakukan kepada validator. Ketika data ditambahkan ke rantai, validator dibayar untuk menambahkan data tersebut.

Platform dengan persistensi berbasis blockchain:

- Ethereum
- [Arweave](https://www.arweave.org/)

### Berbasis kontrak {#contract-based}

Persistensi **berbasis kontrak** memiliki intuisi bahwa data tidak dapat direplikasi oleh setiap node dan disimpan selamanya, melainkan harus dipelihara dengan perjanjian kontrak. Ini adalah perjanjian yang dibuat dengan beberapa node yang telah berjanji untuk menyimpan sepotong data untuk jangka waktu tertentu. Perjanjian ini harus didanai kembali atau diperbarui setiap kali habis masa berlakunya agar data tetap bertahan.

Dalam kebanyakan kasus, alih-alih menyimpan semua data secara onchain, hash dari lokasi data di rantai yang disimpan. Dengan cara ini, seluruh rantai tidak perlu ditingkatkan skalanya untuk menyimpan semua data.

Platform dengan persistensi berbasis kontrak:

- [Filecoin](https://docs.filecoin.io/basics/what-is-filecoin)
- [Skynet](https://sia.tech/)
- [Storj](https://storj.io/)
- [Züs](https://zus.network/)
- [Crust Network](https://crust.network)
- [Swarm](https://www.ethswarm.org/)
- [4EVERLAND](https://www.4everland.org/)

### Pertimbangan tambahan {#additional-consideration}

IPFS adalah sistem terdistribusi untuk menyimpan dan mengakses file, situs web, aplikasi, dan data. Sistem ini tidak memiliki skema insentif bawaan, tetapi dapat digunakan dengan salah satu solusi insentif berbasis kontrak di atas untuk persistensi jangka panjang. Cara lain untuk mempertahankan data di IPFS adalah dengan bekerja sama dengan layanan penyematan (pinning), yang akan "menyematkan" data untuk Anda. Anda bahkan dapat menjalankan node IPFS Anda sendiri dan berkontribusi pada jaringan untuk mempertahankan data Anda dan/atau orang lain secara gratis!

- [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/) _(Layanan penyematan IPFS)_
- [web3.storage](https://web3.storage/) _(Layanan penyematan IPFS/Filecoin)_
- [Infura](https://infura.io/product/ipfs) _(Layanan penyematan IPFS)_
- [IPFS Scan](https://ipfs-scan.io) _(Penjelajah penyematan IPFS)_
- [4EVERLAND](https://www.4everland.org/)_（Layanan penyematan IPFS）_
- [Filebase](https://filebase.com) _(Layanan Penyematan IPFS)_
- [Spheron Network](https://spheron.network/) _(Layanan penyematan IPFS/Filecoin)_

SWARM adalah teknologi penyimpanan dan distribusi data terdesentralisasi dengan sistem insentif penyimpanan dan oracle harga sewa penyimpanan.

## Retensi data {#data-retention}

Untuk mempertahankan data, sistem harus memiliki semacam mekanisme untuk memastikan data tetap dipertahankan.

### Mekanisme tantangan {#challenge-mechanism}

Salah satu cara paling populer untuk memastikan data dipertahankan adalah dengan menggunakan semacam tantangan kriptografi yang dikeluarkan ke node untuk memastikan mereka masih memiliki data tersebut. Contoh sederhananya adalah melihat proof-of-access milik Arweave. Mereka mengeluarkan tantangan ke node untuk melihat apakah mereka memiliki data baik di blok terbaru maupun blok acak di masa lalu. Jika node tidak dapat memberikan jawaban, mereka akan dihukum.

Jenis dStorage dengan mekanisme tantangan:

- Züs
- Skynet
- Arweave
- Filecoin
- Crust Network
- 4EVERLAND

### Desentralisasi {#decentrality}

Belum ada alat yang hebat untuk mengukur tingkat desentralisasi platform, tetapi secara umum, Anda akan ingin menggunakan alat yang tidak memiliki semacam KYC untuk memberikan bukti bahwa mereka tidak terpusat.

Alat terdesentralisasi tanpa KYC:

- Skynet
- Arweave
- Filecoin
- IPFS
- Ethereum
- Crust Network
- 4EVERLAND

### Konsensus {#consensus}

Sebagian besar alat ini memiliki versi [mekanisme konsensus](/developers/docs/consensus-mechanisms/) mereka sendiri, tetapi umumnya didasarkan pada [**proof-of-work (PoW)**](/developers/docs/consensus-mechanisms/pow/) atau [**proof-of-stake (PoS)**](/developers/docs/consensus-mechanisms/pos/).

Berbasis proof-of-work:

- Skynet
- Arweave

Berbasis proof-of-stake:

- Ethereum
- Filecoin
- Züs
- Crust Network

## Alat terkait {#related-tools}

**IPFS - _InterPlanetary File System adalah sistem penyimpanan terdesentralisasi dan referensi file untuk Ethereum._**

- [Ipfs.io](https://ipfs.io/)
- [Dokumentasi](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS - _Penyimpanan objek cloud terdesentralisasi yang aman, privat, dan kompatibel dengan S3 untuk pengembang._**

- [Storj.io](https://storj.io/)
- [Dokumentasi](https://docs.storj.io/)
- [GitHub](https://github.com/storj/storj)

**Sia - _Memanfaatkan kriptografi untuk menciptakan pasar penyimpanan cloud tanpa kepercayaan (trustless), memungkinkan pembeli dan penjual bertransaksi secara langsung._**

- [Skynet.net](https://sia.tech/)
- [Dokumentasi](https://docs.sia.tech/)
- [GitHub](https://github.com/SiaFoundation/)

**Filecoin - _Filecoin dibuat oleh tim yang sama di balik IPFS. Ini adalah lapisan insentif di atas cita-cita IPFS._**

- [Filecoin.io](https://filecoin.io/)
- [Dokumentasi](https://docs.filecoin.io/)
- [GitHub](https://github.com/filecoin-project/)

**Arweave - _Arweave adalah platform dStorage untuk menyimpan data._**

- [Arweave.org](https://www.arweave.org/)
- [Dokumentasi](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**Züs - _Züs adalah platform dStorage proof-of-stake dengan sharding dan blobber._**

- [zus.network](https://zus.network/)
- [Dokumentasi](https://docs.zus.network/zus-docs/)
- [GitHub](https://github.com/0chain/)

**Crust Network - _Crust adalah platform dStorage di atas IPFS._**

- [Crust.network](https://crust.network)
- [Dokumentasi](https://wiki.crust.network)
- [GitHub](https://github.com/crustio)

**Swarm - _Platform penyimpanan terdistribusi dan layanan distribusi konten untuk tumpukan web3 Ethereum._**

- [EthSwarm.org](https://www.ethswarm.org/)
- [Dokumentasi](https://docs.ethswarm.org/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB - _Basis data peer-to-peer terdesentralisasi di atas IPFS._**

- [OrbitDB.org](https://orbitdb.org/)
- [Dokumentasi](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im - _Proyek cloud terdesentralisasi (basis data, penyimpanan file, komputasi, dan DID). Perpaduan unik dari teknologi peer-to-peer offchain dan onchain. Kompatibilitas IPFS dan multi-rantai._**

- [Aleph.im](https://aleph.cloud/)
- [Dokumentasi](https://docs.aleph.cloud/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic - _Penyimpanan basis data IPFS yang dikendalikan pengguna untuk aplikasi yang kaya data dan menarik._**

- [Ceramic.network](https://ceramic.network/)
- [Dokumentasi](https://developers.ceramic.network/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

**Filebase - _Penyimpanan terdesentralisasi yang kompatibel dengan S3 dan layanan penyematan IPFS yang geo-redundan. Semua file yang diunggah ke IPFS melalui Filebase secara otomatis disematkan ke infrastruktur Filebase dengan replikasi 3x di seluruh dunia._**

- [Filebase.com](https://filebase.com/)
- [Dokumentasi](https://docs.filebase.com/)
- [GitHub](https://github.com/filebase)

**4EVERLAND - _Platform komputasi cloud Web 3.0 yang mengintegrasikan kemampuan inti penyimpanan, komputasi, dan jaringan, kompatibel dengan S3 dan menyediakan penyimpanan data sinkron di jaringan penyimpanan terdesentralisasi seperti IPFS dan Arweave._**

- [4everland.org](https://www.4everland.org/)
- [Dokumentasi](https://docs.4everland.org/)
- [GitHub](https://github.com/4everland)

**Kaleido - _Platform blockchain-as-a-service dengan Node IPFS sekali klik_**

- [Kaleido](https://kaleido.io/)
- [Dokumentasi](https://docs.kaleido.io/kaleido-services/ipfs/)
- [GitHub](https://github.com/kaleido-io)

**Spheron Network - _Spheron adalah platform-as-a-service (PaaS) yang dirancang untuk dapps yang ingin meluncurkan aplikasi mereka di infrastruktur terdesentralisasi dengan kinerja terbaik. Ini menyediakan komputasi, penyimpanan terdesentralisasi, CDN & web hosting yang siap pakai._**

- [spheron.network](https://spheron.network/)
- [Dokumentasi](https://docs.spheron.network/)
- [GitHub](https://github.com/spheronFdn)

## Bacaan lebih lanjut {#further-reading}

- [Apa Itu Penyimpanan Terdesentralisasi?](https://coinmarketcap.com/academy/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) - _CoinMarketCap_
- [Mematahkan Lima Mitos Umum tentang Penyimpanan Terdesentralisasi](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) - _Storj_

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Topik terkait {#related-topics}

- [Kerangka kerja pengembangan](/developers/docs/frameworks/)