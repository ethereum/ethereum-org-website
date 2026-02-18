---
title: Pustaka API Backend
description: Pengantar API klien Ethereum yang membantu Anda berinteraksi dengan blockchain dari aplikasi Anda.
lang: id
---

Agar aplikasi perangkat lunak dapat berinteraksi dengan rantai blok Ethereum (misalnya membaca data rantai blok dan/atau mengirim transaksi ke jaringan), ia harus terhubung ke simpul Ethereum.

Untuk tujuan ini, setiap klien Ethereum mengimplementasikan spesifikasi [JSON-RPC](/developers/docs/apis/json-rpc/), sehingga ada serangkaian [metode](/developers/docs/apis/json-rpc/#json-rpc-methods) yang seragam yang dapat diandalkan oleh aplikasi.

Jika Anda ingin menggunakan bahasa pemrograman tertentu untuk terhubung dengan node Ethereum, ada banyak pustaka praktis di dalam ekosistem yang membuatnya lebih mudah. Dengan pustaka ini, pengembang dapat menulis metode satu baris yang intuitif untuk memulai permintaan JSON-RPC (di bawah tenda) yang berinteraksi dengan Ethereum.

## Persyaratan {#prerequisites}

Mungkin akan sangat membantu untuk memahami [tumpukan Ethereum](/developers/docs/ethereum-stack/) dan [klien Ethereum](/developers/docs/nodes-and-clients/).

## Mengapa menggunakan pustaka? {#why-use-a-library}

Pustaka ini menyederhanakan banyak kerumitan dalam interaksi langsung dengan node Ethereum. Pustaka juga menyediakan fungsi utilitas (misalnya, mengonversi ETH ke Gwei) sehingga sebagai pengembang Anda dapat menghabiskan lebih sedikit waktu berurusan dengan seluk-beluk klien Ethereum dan lebih banyak waktu berfokus pada fungsionalitas unik aplikasi Anda.

## Pustaka yang tersedia {#available-libraries}

### Layanan infrastruktur dan simpul {#infrastructure-and-node-services}

**Alchemy -** **_Platform Pengembangan Ethereum._**

- [alchemy.com](https://www.alchemy.com/)
- [Dokumentasi](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**All That Node -** **_Simpul-sebagai-Layanan._**

- [All That Node.com](https://www.allthatnode.com/)
- [Dokumentasi](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Blast by Bware Labs -** **_API Terdesentralisasi untuk Jaringan Utama dan testnet Ethereum._**

- [blastapi.io](https://blastapi.io/)
- [Dokumentasi](https://docs.blastapi.io)
- [Discord](https://discord.gg/SaRqmRUjjQ)

**BlockPi -** **_Menyediakan layanan RPC yang lebih efisien dan cepat_**

- [blockpi.io](https://blockpi.io/)
- [Dokumentasi](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Gateway Ethereum untuk Cloudfare.**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - Penjelajah Blok dan API Transaksi**

- [Dokumentasi](https://docs.etherscan.io/)

**Blockscout - Penjelajah Blok Sumber Terbuka**

- [Dokumentasi](https://docs.blockscout.com/)

**GetBlock -** **_Blockchain-sebagai-layanan untuk pengembangan Web3_**

- [GetBlock.io](https://getblock.io/)
- [Dokumentasi](https://docs.getblock.io/)

**Infura -** **_API Ethereum sebagai layanan._**

- [infura.io](https://infura.io)
- [Dokumentasi](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _Penyedia JSON-RPC EVM yang hemat biaya_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [Dokumentasi](https://docs.noderpc.xyz/node-rpc)

**NOWNodes -** **_Simpul Penuh dan Penjelajah Blok._**

- [NOWNodes.io](https://nownodes.io/)
- [Dokumentasi](https://nownodes.gitbook.io/documentation)

**QuickNode -** **_Infrastruktur Blockchain sebagai Layanan._**

- [quicknode.com](https://quicknode.com)
- [Dokumentasi](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet -** **_API Ethereum dan Ethereum Classic sebagai layanan yang didukung oleh perangkat lunak sumber terbuka._**

- [rivet.cloud](https://rivet.cloud)
- [Dokumentasi](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_Simpul Ethereum berorientasi kecepatan sebagai API JSON-RPC/WebSockets._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [Dokumentasi](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### Alat pengembangan {#development-tools}

**ethers-kt -** **_Pustaka Kotlin/Java/Android asinkron berkinerja tinggi untuk rantai blok berbasis EVM._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [Contoh](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_Pustaka integrasi .NET sumber terbuka untuk rantai blok._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [Dokumentasi](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Perkakas Python -** **_Berbagai pustaka untuk interaksi Ethereum melalui Python._**

- [py.ethereum.org](https://snakecharmers.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [Obrolan web3.py](https://gitter.im/ethereum/web3.py)

**Tatum -** **_Platform pengembangan rantai blok terbaik._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [Dokumentasi](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**web3j -** **_Pustaka integrasi Java/Android/Kotlin/Scala untuk Ethereum._**

- [GitHub](https://github.com/web3j/web3j)
- [Dokumentasi](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### Layanan rantai blok {#blockchain-services}

**BlockCypher -** **_API Web Ethereum._**

- [blockcypher.com](https://www.blockcypher.com/)
- [Dokumentasi](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_Infrastruktur data web3 lengkap untuk Ethereum._**

- [chainbase.com](https://chainbase.com/)
- [Dokumentasi](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_Simpul Ethereum yang elastis dan berdedikasi sebagai layanan._**

- [chainstack.com](https://chainstack.com)
- [Dokumentasi](https://docs.chainstack.com/)
- [Referensi API Ethereum](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase Cloud Node -** **_API Infrastruktur Rantai Blok._**

- [Coinbase Cloud Node](https://www.coinbase.com/developer-platform)
- [Dokumentasi](https://docs.cdp.coinbase.com/)

**DataHub oleh Figment -** **_Layanan API Web3 dengan Jaringan Utama dan testnet Ethereum._**

- [DataHub](https://www.figment.io/)
- [Dokumentasi](https://docs.figment.io/)

**Moralis -** **_Penyedia API EVM Kelas Perusahaan._**

- [moralis.io](https://moralis.io)
- [Dokumentasi](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [Forum](https://forum.moralis.io/)

**NFTPort -** **_API Data dan Cetak Ethereum._**

- [nftport.xyz](https://www.nftport.xyz/)
- [Dokumentasi](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_Platform API Rantai Blok Multi-Kripto Umum._**

- [services.tokenview.io](https://services.tokenview.io/)
- [Dokumentasi](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_Menyediakan akses API yang sederhana dan andal ke rantai blok Ethereum._**

- [Watchdata](https://watchdata.io/)
- [Dokumentasi](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Covalent -** **_API rantai blok yang diperkaya untuk 200+ Rantai._**

- [covalenthq.com](https://www.covalenthq.com/)
- [Dokumentasi](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)

## Bacaan lebih lanjut {#further-reading}

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Topik terkait {#related-topics}

- [Simpul dan klien](/developers/docs/nodes-and-clients/)
- [Kerangka kerja pengembangan](/developers/docs/frameworks/)

## Tutorial terkait {#related-tutorials}

- [Menyiapkan Web3js untuk menggunakan rantai blok Ethereum di JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Petunjuk untuk menyiapkan web3.js di proyek Anda._
- [Memanggil kontrak pintar dari JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Menggunakan token DAI, lihat cara memanggil fungsi kontrak menggunakan JavaScript._
