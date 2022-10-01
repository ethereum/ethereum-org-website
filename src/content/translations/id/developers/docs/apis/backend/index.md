---
title: Pustaka API Backend
description: Pengantar API klien Ethereum yang membantu Anda berinteraksi dengan blockchain dari aplikasi Anda.
lang: id
---

Agar aplikasi perangkat lunak dapat berinteraksi dengan blockchain Ethereum (yaitu membaca data blockchain dan/atau mengirim transaksi ke jaringan), aplikasi harus terhubung ke node Ethereum.

Untuk keperluan ini, setiap klien Ethereum mengimplementasikan spesifikasi [JSON-RPC](/developers/docs/apis/json-rpc/), sehingga ada keseragaman kumpulan [titik akhir](/developers/docs/apis/json-rpc/#json-rpc-methods) yang bisa menjadi tumpuan aplikasi.

Jika Anda ingin menggunakan bahasa pemrograman tertentu untuk terhubung dengan node Ethereum, ada banyak pustaka praktis di dalam ekosistem yang membuatnya lebih mudah. Dengan pustaka ini, pengembang dapat menulis metode satu baris yang intuitif untuk memulai permintaan JSON-RPC (di bawah tenda) yang berinteraksi dengan Ethereum.

## Prasyarat {#prerequisites}

Mungkin akan membantu memahami [tumpukan Ethereum](/developers/docs/ethereum-stack/) dan [klien Ethereum](/developers/docs/nodes-and-clients/).

## Mengapa menggunakan pustaka? {#why-use-a-library}

Pustaka ini menyederhanakan banyak kerumitan dalam interaksi langsung dengan node Ethereum. Pustaka juga menyediakan fungsi utilitas (seperti mengubah ETH ke Gwei) sehingga pengembang dapat menghemat waktu dalam menangani kerumitan klien Ethereum dan dapat lebih memusatkan perhatian pada fungsi unik aplikasi Anda.

## Pustaka yang tersedia {#available-libraries}

**Alchemy -** **_Platform Pengembangan Ethereum._**

- [alchemy.com](https://www.alchemy.com/)
- [Dokumentasi](https://docs.alchemyapi.io/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/A39JVCM)

**BlockCypher -** **_API Web Ethereum_**

- [blockcypher.com](https://www.blockcypher.com/)
- [Dokumentasi](https://www.blockcypher.com/dev/ethereum/)

**Infura -** **_API Ethereum sebagai layanan._**

- [infura.io](https://infura.io)
- [Dokumentasi](https://infura.io/docs)
- [GitHub](https://github.com/INFURA)

**Gateway Ethereum untuk Cloudfare.**

- [cloudflare-eth.com](https://cloudflare-eth.com)

**DataHub oleh Figment -** **_layanan API Web3 dengan Jaringan Utama Ethereum dan testnet._**

- [DataHub](https://www.figment.io/datahub)
- [Dokumentasi](https://docs.figment.io/introduction/what-is-datahub)

**Nodesmith -** **_Akses API JSON-RPC ke Jaringan Utama dan testnet Ethereum._**

- [nodesmith.io](https://nodesmith.io/network/ethereum/)
- [Dokumentasi](https://nodesmith.io/docs/#/ethereum/apiRef)

**Ethercluster -** **_Jalankan layanan API Ethereum Anda sendiri yang mendukung baik ETH dan ETC._**

- [ethercluster.com](https://www.ethercluster.com/)

**Chainstack -** **_Node Ethereum yang dibagikan dan didedikasikan sebagai layanan._**

- [chainstack.com](https://chainstack.com)
- [Dokumentasi](https://docs.chainstack.com)

**QuikNode -** **_Platform pengembang blockchain._**

- [quiknode.io](https://quiknode.io)

**Perangkat Python -** **_Berbagai macam pustaka untuk interaksi Ethereum dengan Python._**

- [py.ethereum.org](http://python.ethereum.org/)
- [GitHub web3.py](https://github.com/ethereum/web3.py)
- [Obrolan web3.py](https://gitter.im/ethereum/web3.py)

**web3j -** **_Pustaka integrasi Java/Android/Kotlin/Scala untuk Ethereum._**

- [GitHub](https://github.com/web3j/web3j)
- [Dokumen](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

**Rivet -** **_Ethereum dan API Klasik Ethereum sebagai layanan yang didukung oleh sumber terbuka._**

- [rivet.cloud](https://rivet.cloud)
- [Dokumentasi](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Nethereum -** **_Pustaka integrasi .NET sumber terbuka untuk blockchain._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [Dokumentasi](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Tatum -** **_Platform pengembangan blockchain terbaik._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [Dokumentasi](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

## Bacaan lebih lanjut {#further-reading}

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Topik terkait {#related-topics}

- [Node dan klien](/developers/docs/nodes-and-clients/)
- [Kerangka kerja pengembangan](/developers/docs/frameworks/)

## Tutorial terkait {#related-tutorials}

- [Menyiapkan Web3js untuk menggunakan blockchain Ethereum dalam JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Instruksi untuk menyiapkan web3.js dalam proyek Anda._
- [Memanggil kontrak pintar dari JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Menggunakan token DAI, lihat cara memanggil fungsi kontrak menggunakan JavaScript._
