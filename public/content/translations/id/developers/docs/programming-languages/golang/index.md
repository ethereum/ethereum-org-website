---
title: Ethereum untuk pengembang Go
description: Pelajari cara mengembangkan Ethereum menggunakan proyek dan perkakas berbasis Go
lang: id
incomplete: true
---

<FeaturedText>Pelajari cara mengembangkan Ethereum menggunakan proyek dan perkakas berbasis Go</FeaturedText>

Gunakan Ethereum untuk membuat aplikasi terdesentralisasi (atau "dapps"). Dapps ini dapat dipercaya, yang berarti setelah disebarkan ke Ethereum, mereka akan selalu berjalan sesuai program. Mereka terdesentralisasi, yang berarti mereka berjalan di jaringan peer-to-peer dan tidak ada titik kegagalan tunggal. Tidak ada entitas atau orang tunggal yang mengendalikannya dan mereka hampir tidak mungkin untuk disensor. Mereka dapat mengendalikan aset digital untuk membuat jenis aplikasi baru.

## Memulai dengan kontrak pintar dan bahasa Solidity {#getting-started-with-smart-contracts-and-solidity}

**Ambil langkah pertama Anda untuk mengintegrasikan Go dengan Ethereum**

Butuh pengantar yang lebih mendasar terlebih dahulu? Kunjungi [ethereum.org/learn](/learn/) atau [ethereum.org/developers](/developers/).

- [Penjelasan Blockchain](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Memahami Kontrak Pintar](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [Tulis Kontrak Pintar Pertama Anda](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Pelajari Cara Mengompilasi dan Menyebarkan Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [Tutorial Kontrak](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## Artikel dan buku untuk pemula {#beginner-articles-and-books}

- [Memulai dengan Geth](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [Gunakan Golang untuk Terhubung ke Ethereum](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [Menyebarkan Kontrak Pintar Ethereum Menggunakan Golang](https://www.youtube.com/watch?v=pytGqQmDslE)
- [Panduan Langkah Demi Langkah untuk Menguji dan Menyebarkan Kontrak Pintar Ethereum di Go](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [eBook: Pengembangan Ethereum dengan Go](https://goethereumbook.org/) - _Mengembangkan aplikasi Ethereum dengan Go_

## Artikel dan dokumen tingkat menengah {#intermediate-articles-and-docs}

- [Dokumentasi Go Ethereum](https://geth.ethereum.org/docs) - _Dokumentasi untuk Golang Ethereum resmi_
- [Panduan Pemrogram Erigon](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) - _Panduan bergambar termasuk pohon status, multi-bukti, dan pemrosesan transaksi_
- [Erigon dan Ethereum Tanpa Status](https://youtu.be/3-Mn7OckSus?t=394) - _Konferensi Komunitas Ethereum 2020 (EthCC 3)_
- [Erigon: mengoptimalkan klien Ethereum](https://www.youtube.com/watch?v=CSpc1vZQW2Q) - _Devcon 4 2018_
- [GoDoc Go Ethereum](https://godoc.org/github.com/ethereum/go-ethereum)
- [Membuat dapp di Go dengan Geth](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [Bekerja dengan Jaringan Pribadi Ethereum dengan Golang dan Geth](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [Pengujian unit kontrak Solidity di Ethereum dengan Go](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [Referensi cepat untuk menggunakan Geth sebagai pustaka](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## Pola penggunaan tingkat lanjut {#advanced-use-patterns}

- [Backend Simulasi GETH](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [Aplikasi Blockchain-as-a-Service Menggunakan Ethereum dan Quorum](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [Penyimpanan Terdistribusi IPFS dan Swarm dalam Aplikasi Blockchain Ethereum](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [Klien Seluler: Pustaka dan Node Ethereum Inproc](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [Dapps asli: Binding Go ke kontrak Ethereum](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Proyek dan perkakas Go {#go-projects-and-tools}

- [Geth / Go Ethereum](https://github.com/ethereum/go-ethereum) - _Implementasi Go resmi dari protokol Ethereum_
- [Analisis Kode Go Ethereum](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _Tinjauan dan analisis kode sumber Go Ethereum_
- [Erigon](https://github.com/ledgerwatch/erigon) - _Turunan Go Ethereum yang lebih cepat, dengan fokus pada node arsip_
- [Golem](https://github.com/golemfactory/golem) - _Golem menciptakan pasar global untuk daya komputasi_
- [Quorum](https://github.com/jpmorganchase/quorum) - _Implementasi Ethereum berizin yang mendukung privasi data_
- [Prysm](https://github.com/prysmaticlabs/prysm) - _Implementasi Go Ethereum 'Serenity' 2.0_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _Twitter Terdesentralisasi: Layanan mikroblog yang berjalan di blockchain Ethereum_
- [Plasma MVP Golang](https://github.com/kyokan/plasma) — _Implementasi dan ekstensi Golang dari spesifikasi Minimum Viable Plasma_
- [Kolam Penambangan Ethereum Terbuka](https://github.com/sammy007/open-ethereum-pool) - _Kolam penambangan Ethereum sumber terbuka_
- [Dompet HD Ethereum](https://github.com/miguelmota/go-ethereum-hdwallet) - _Derivasi Dompet HD Ethereum di Go_
- [Multi Geth](https://github.com/multi-geth/multi-geth) - _Dukungan untuk banyak spesies jaringan Ethereum_
- [Klien Ringan Geth](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _Implementasi Geth dari Subprotokol Ethereum Ringan_
- [SDK Golang Ethereum](https://github.com/everFinance/goether) - _Implementasi dompet Ethereum sederhana dan utilitas di Golang_
- [SDK Golang Covalent](https://github.com/covalenthq/covalent-api-sdk-go) - _Akses data blockchain yang efisien melalui SDK Go untuk 200+ blockchain_

Mencari lebih banyak sumber daya? Kunjungi [ethereum.org/developers](/developers/)

## Kontributor komunitas Go {#go-community-contributors}

- [Discord Geth](https://discordapp.com/invite/nthXNEv)
- [Gist Geth](https://gitter.im/ethereum/go-ethereum)
- [Slack Gophers](https://invite.slack.golangbridge.org/) - [saluran #ethereum](https://gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange - Ethereum](https://ethereum.stackexchange.com/)
- [Gitter Multi Geth](https://gitter.im/ethoxy/multi-geth)
- [Gitter Ethereum](https://gitter.im/ethereum/home)
- [Gitter Klien Ringan Geth](https://gitter.im/ethereum/light-client)

## Daftar agregat lainnya {#other-aggregated-lists}

- [Awesome Ethereum](https://github.com/btomashvili/awesome-ethereum)
- [Consensys: Daftar Definitif Perkakas Pengembang Ethereum](https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [Sumber GitHub](https://github.com/ConsenSys/ethereum-developer-tools-list)