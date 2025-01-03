---
title: Penyimpanan Terdesentralisasi
description: Gambaran umum tentang penyimpanan terdesentralisasi dan peralatan yang tersedia untuk menintegrasikannya ke dalam dapp.
lang: id
---

Tidak seperti server terpusat yang dijalankan oleh satu perusahaan atau organisasi, sistem penyimpanan terdesentralisasi terdiri dari jaringan peer-to-peer dari operator pengguna yang memegang satu bagian dari keseluruhan data, yang menciptakan sistem berbagi penyimpana file yang tangguh. Ini dapat dalam bentuk aplikasi berbasis blockchain atau jaringan berbasis peer-to-peer.

Ethereum sendiri dapat digunakan sebagai sistem penyimpanan terdesentralisasi, dan akan berfungsi demikian ketika berkaitan dengan penyimpanan kode di dalam semua kontrak pintar. Namun, ketika berkaitan dengan jumlah data yang besar, ini bukanlah bagian dari tujuan pembuatan Ethereum. Rantainya terus-menerus berkembang, tetapi pada saat penulisan ini, rantai Ethereum memiliki panjang sekitar 500GB - 1TB ([tergantung pada klien](https://etherscan.io/chartsync/chaindefault)), dan setiap node di jaringan harus dapat menyimpan semua data. Jika rantai diperluas ke jumlah data yang sangat besar (anggaplah 5TB), tidak akan memungkinkan bagi semua node untuk terus dijalankan. Selain itu, biaya untuk penggunaan data sebesar ini ke Jaringan Utama akan sangat mahal karena biaya [gas](/developers/docs/gas).

Karena keterbatasan ini, kita memerlukan rantai atau metodologi berbeda untuk menyimpan jumlah data yang sangat besar dalam cara yang terdesentralisasi.

Ketika mempertimbangkan opsi penyimpanan terdesentralisasi (dStorage), ada beberapa hal yang harus diingat oleh pengguna.

- Mekanisme persistensi / struktur insentif
- Pelaksanaan retensi data
- Desentralisasi
- Konsensus

## Mekanisme persistensi / struktur insentif {#persistence-mechanism}

### Berbasis blockchain {#blockchain-based}

Agar sepotong data bertahan selamanya, kita perlu menggunakan mekanisme persistensi. Misalnya, di Ethereum, mekanisme persistensi adalah keseluruhan rantai yang perlu diperhitungkan ketika menjalankan node. Bagian data terbaru dilekatkan pada ujung rantai, dan terus berkembang - yang mengharuskan setiap node mereplikasi semua data yang tersemat.

Ini dikenal sebagai persistensi **berbasis blockhain**.

Masalah dengan persistensi berbasis blockchain adalah bahwa rantainya dapat menjadi terlalu besar untuk dipertahankan dan untuk secara memungkinkan menyimpan semua data (misalnya [banyak sumber](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/) memperkirakan Internet akan mengharuskan kapasitas penyimpanan lebih dari 40 Zetabita).

Blockchain juga harus memiliki beberapa tipe struktur insentif. Dalam persistensi berbasis blockchain, ada pembayaran yang diberikan kepada penambang. Ketika data ditambahkan ke rantai, node dibayar untuk menambahkan data.

Platform dengan persistensi berbasis blockchain:

- Ethereum
- [Arweave](https://www.arweave.org/)

### Berbasis kontrak {#contract-based}

Persistensi **berbasis kontrak** memiliki intuisi bahwa data tidak dapat direplikasi oleh setiap node dan disimpan selamanya, dan sebagai gantinya harus dipelihara dengan kesepakatan kontrak. Ini adalah kesepakatan yang dibuat dengan berbagai node yang telah berjanji untuk menampung sepotong data dalam satu periode waktu. Dananya harus dikembalikan atau diperbarui setiap kali node tidak dapat lagi mempertahankan keberadaan data.

Dalam kebanyakan kasus, alih-alih menyimpan semua data secara on-chain, hash tempat data berada di rantailah yang disimpan. Dengan cara ini, seluruh rantai tidak perlu melakukan penskalaan untuk menyimpan semua data.

Platform dengan persistensi berbasis kontrak:

- [Filecoin](https://docs.filecoin.io/about-filecoin/what-is-filecoin/)
- [Skynet](https://siasky.net/)
- [Storj](https://storj.io/)
- [Züs](https://zus.network/)

### Pertimbangan tambahan {#additional-consideration}

IPFS adalah sistem terdistribusi untuk menyimpan dan mengakses berkas, situs web, aplikasi, dan data. Ia tidak memiliki skema insentif bawaan, tetapi dapat sebagai gantinya digunakan dengan apa pun dari solusi insentif berbasis kontrak di atas untuk persistensi yang berjangka waktu lebih lama. Cara lain untuk mempertahankan data pada IPFS adalah bekerja dengan layanan penyematan, yang akan "menyematkan" data Anda untuk Anda. Anda bahkan dapat menjalankan node IPFS Anda sendiri dan berkontribusi terhadap jaringan untuk mempertahankan data Anda dan/atau orang lain tanpa biaya!

- [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/) _(layanan penyematan IPFS)_
- [web3.storage](https://web3.storage/) _(layanan penyematan IPFS/Filecoin)_
- [Infura](https://infura.io/product/ipfs) _(layanan pinning IPFS)_

## Retensi data {#data-retention}

Untuk mempertahankan data, sistem harus memiliki beberapa jenis mekanisme untuk memastikan data dipertahankan.

### Mekanisme tantangan {#challenge-mechanism}

Salah satu cara populer untuk memastikan data dipertahankan, adalah dengan menggunakan beberapa jenis tantangan kriptografik yang diterbitkan ke node untuk memastikan datanya masih ada. Cara sederhananya adalah mencari bukti akses Arweave. Mereka mengeluarkan tantangan terhadap node untuk melihat apakah node memiliki data baik di blok terbaru dan di blok acak yang dibuat sebelumnya. Jika node tidak dapat memberikan jawaban, mereka diberi penalti.

Jenis dStorage dengan mekanisme tantangan:

- Züs
- Skynet
- Arweave
- Filecoin

### Desentralisasi {#decentrality}

Tidak ada peralatan yang bagus untuk mengukur tingkat desentralisasi platform, tapi secara umum, Anda mungkin ingin menggunakan peralatan yang tidak memiliki beberapa bentuk KYC untuk menyediakan bukti bahwa peralatan itu tidak terpusat.

Peralatan desentralisasi tanpa KYC:

- Züs (mengimplementasikan sebuah edisi non-KYC)
- Skynet
- Arweave
- Filecoin
- IPFS
- Ethereum

### Konsensus {#consensus}

Kebanyakan peralatan ini memiliki versi [mekanisme konsensus](/developers/docs/consensus-mechanisms/)sendiri tetapi secara umum, peralatan ini didasarkan pada [**bukti kerja (PoW)**](/developers/docs/consensus-mechanisms/pow/) atau [**bukti taruhan (PoS)**](/developers/docs/consensus-mechanisms/pos/).

Berbasis PoW:

- Skynet
- Arweave
- Ethereum

Berbasis PoS:

- [Rantai Suar](/eth2/beacon-chain/)
- Filecoin
- Züs

## Peralatan terkait {#related-tools}

**IPFS - _Sistem File InterPlanetary adalah penyimpanan terdesentralisasi dan sistem referensi file untuk Ethereum._**

- [Ipfs.io](https://ipfs.io/)
- [Dokumentasi](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS - _Tempat penyimpanan objek cloud terdesentralisasi yang aman, privat, dan kompatibel dengan S3 bagi para pengembang._**

- [Storj.io](https://storj.io/)
- [Dokumentasi](https://docs.storj.io/)

**Skynet - _Skynet adalah sebuah rantai PoW terdesentralisasi yang didedikasikan untuk web terdesentralisasi._**

- [Skynet.net](https://siasky.net/)
- [Dokumentasi](https://siasky.net/docs/)
- [GitHub](https://github.com/SkynetLabs/)

**Filecoin - _Filecoin dibuat oleh tim yang sama yang membuat IPFS. Ini adalah lapisan insentif yang didasarkan pada idealisme IPFS._**

- [Filecoin.io](https://filecoin.io/)
- [Dokumentasi](https://docs.filecoin.io/)
- [GitHub](https://github.com/filecoin-project/)

**Arweave - _Arweave adalah sebuah platform dStorage untuk menyimpan data._**

- [Arweave.org](https://www.arweave.org/)
- [Dokumentasi](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**Züs - _Züs adalah sebuah platform dStorage bukti taruhan dengan sharding dan blobber._**

- [zus.network](https://zus.network/)
- [Dokumentasi](https://0chaindocs.gitbook.io/zus-docs)
- [GitHub](https://github.com/0chain/)

**Swarm - _Sebuah plaftorm penyimpanan terdistribusi dan layanan distribusi konten untuk tumpukan web3 Ethereum._**

- [EthSwarm.org](https://www.ethswarm.org/)
- [Dokumentasi](https://docs.ethswarm.org/docs/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB - _Basis data peer to peer terdesentralisasi yang dibangun berdasarkan IPFS._**

- [OrbitDB.org](https://orbitdb.org/)
- [Dokumentasi](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im - _Proyek cloud terdesentralisasi (basis data, penyimpanan file, komputasi, dan DID). Sebuah penggabungan unik teknologi peer-to-peer offchain dan onchain. Kompatibel dengan IPFS dan multirantai._**

- [Aleph.im](https://aleph.im/)
- [Dokumentasi](https://aleph.im/#/developers/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic - _Penyimpanan basis data IPFS yang dikontrol pengguna untuk aplikasi yang kaya data dan menarik._**

- [Ceramic.network](https://ceramic.network/)
- [Dokumentasi](https://developers.ceramic.network/learn/welcome/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

## Bacaan lebih lanjut {#further-reading}

- [Apa itu Penyimpanan Terdesentralisasi?](https://coinmarketcap.com/alexandria/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) - _CoinMarketCap_
- [Mematahkan Lima Mitos Umum tentang Penyimpanan Terdesentralisasi](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) - _Storj_

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Topik terkait {#related-topics}

- [Kerangka kerja pengembangan](/developers/docs/frameworks/)
