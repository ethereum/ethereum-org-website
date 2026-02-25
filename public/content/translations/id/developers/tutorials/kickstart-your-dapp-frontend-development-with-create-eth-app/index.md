---
title: Mulai pengembangan frontend dapp Anda dengan create-eth-app
description: Gambaran umum cara menggunakan create-eth-app beserta fiturnya
author: "Markus Waas"
tags:
  [
    "frontend",
    "javascript",
    "ethers.js",
    "the graph",
    "defi"
  ]
skill: beginner
lang: id
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

Terakhir kali kita melihat [gambaran besar Solidity](https://soliditydeveloper.com/solidity-overview-2020) dan telah menyebutkan [create-eth-app](https://github.com/PaulRBerg/create-eth-app). Sekarang Anda akan mengetahui cara menggunakannya, fitur-fitur apa yang terintegrasi, dan ide-ide tambahan tentang cara mengembangkannya. Dimulai oleh Paul Razvan Berg, pendiri [Sablier](http://sablier.com/), aplikasi ini akan memulai pengembangan frontend Anda dan dilengkapi dengan beberapa integrasi opsional yang dapat dipilih.

## Instalasi {#installation}

Instalasi ini memerlukan Yarn 0.25 atau yang lebih tinggi (`npm install yarn --global`). Caranya semudah menjalankan:

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

Aplikasi ini menggunakan [create-react-app](https://github.com/facebook/create-react-app) di balik layarnya. Untuk melihat aplikasi Anda, buka `http://localhost:3000/`. Saat Anda siap untuk menyebarkan ke produksi, buat bundel yang diperkecil dengan yarn build. Salah satu cara mudah untuk meng-host-nya adalah [Netlify](https://www.netlify.com/). Anda dapat membuat repositori GitHub, menambahkannya ke Netlify, mengatur perintah build, dan selesai! Aplikasi Anda akan di-host dan dapat digunakan oleh semua orang. Dan semua ini gratis.

## Fitur {#features}

### React & create-react-app {#react--create-react-app}

Pertama-tama, inti dari aplikasi: React dan semua fitur tambahan yang disertakan dengan _create-react-app_. Hanya menggunakan ini adalah opsi yang bagus jika Anda tidak ingin mengintegrasikan Ethereum. [React](https://react.dev/) sendiri membuat pembuatan UI interaktif menjadi sangat mudah. Mungkin tidak seramah [Vue](https://vuejs.org/) bagi pemula, tetapi masih menjadi yang paling banyak digunakan, memiliki lebih banyak fitur, dan yang terpenting, ribuan pustaka tambahan untuk dipilih. _create-react-app_ juga membuatnya sangat mudah untuk memulai dan menyertakan:

- Dukungan sintaksis React, JSX, ES6, TypeScript, Flow.
- Tambahan bahasa di luar ES6 seperti operator penyebaran objek.
- CSS dengan prefiks otomatis, sehingga Anda tidak memerlukan -webkit- atau prefiks lainnya.
- Pengeksekusi tes unit interaktif cepat dengan dukungan bawaan untuk pelaporan cakupan.
- Server pengembangan langsung yang memperingatkan tentang kesalahan-kesalahan umum.
- Skrip build untuk memaketkan JS, CSS, dan gambar untuk produksi, dengan hash dan peta sumber.

_create-eth-app_ secara khusus menggunakan [efek hook](https://legacy.reactjs.org/docs/hooks-effect.html) yang baru. Sebuah metode untuk menulis apa yang disebut komponen fungsional yang kuat, tetapi sangat kecil. Lihat bagian tentang Apollo di bawah ini untuk mengetahui cara penggunaannya di _create-eth-app_.

### Yarn Workspaces {#yarn-workspaces}

[Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) memungkinkan Anda untuk memiliki beberapa paket, tetapi dapat mengelola semuanya dari folder root dan menginstal dependensi untuk semuanya sekaligus menggunakan `yarn install`. Ini sangat masuk akal untuk paket tambahan yang lebih kecil seperti manajemen alamat/ABI kontrak pintar (informasi tentang di mana Anda menyebarkan kontrak pintar dan cara berkomunikasi dengannya) atau integrasi The Graph, keduanya merupakan bagian dari `create-eth-app`.

### ethers.js {#ethersjs}

Meskipun [Web3](https://docs.web3js.org/) masih paling banyak digunakan, [ethers.js](https://docs.ethers.io/) telah mendapatkan lebih banyak daya tarik sebagai alternatif dalam setahun terakhir dan merupakan salah satu yang diintegrasikan ke dalam _create-eth-app_. Anda dapat menggunakan yang ini, mengubahnya ke Web3 atau mempertimbangkan untuk meningkatkan ke [ethers.js v5](https://docs.ethers.org/v5/) yang hampir keluar dari versi beta.

### The Graph {#the-graph}

[GraphQL](https://graphql.org/) adalah cara alternatif untuk menangani data dibandingkan dengan [API Restful](https://restfulapi.net/). GraphQL memiliki beberapa keunggulan dibandingkan API Restful, terutama untuk data blockchain terdesentralisasi. Jika Anda tertarik dengan alasan di baliknya, lihatlah [GraphQL Will Power the Decentralized Web](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a).

Biasanya Anda akan mengambil data dari kontrak pintar Anda secara langsung. Ingin membaca waktu perdagangan terbaru? Cukup panggil `MyContract.methods.latestTradeTime().call()` yang mengambil data dari node Ethereum ke dalam dapp Anda. Tetapi bagaimana jika Anda memerlukan ratusan titik data yang berbeda? Itu akan mengakibatkan ratusan pengambilan data ke node, yang setiap kalinya memerlukan [RTT](https://wikipedia.org/wiki/Round-trip_delay_time), membuat dapp Anda lambat dan tidak efisien. Salah satu solusinya adalah fungsi panggilan pengambil (fetcher) di dalam kontrak Anda yang mengembalikan beberapa data sekaligus. Namun, ini tidak selalu ideal.

Lalu, Anda mungkin juga tertarik dengan data historis. Anda ingin tahu tidak hanya waktu perdagangan terakhir, tetapi juga waktu dari semua perdagangan yang pernah Anda lakukan sendiri. Gunakan paket subgraph _create-eth-app_, baca [dokumentasinya](https://thegraph.com/docs/en/subgraphs/developing/creating/starting-your-subgraph) dan adaptasikan ke kontrak Anda sendiri. Jika Anda mencari kontrak pintar yang populer, mungkin sudah ada subgraph untuknya. Kunjungi [penjelajah subgraph](https://thegraph.com/explorer/).

Setelah Anda memiliki subgraph, Anda dapat menulis satu kueri sederhana di dapp Anda yang mengambil semua data blockchain penting yang Anda perlukan, termasuk data historis, dengan hanya satu kali pengambilan data.

### Apollo {#apollo}

Berkat integrasi [Apollo Boost](https://www.apollographql.com/docs/react/get-started/), Anda dapat dengan mudah mengintegrasikan The Graph di dapp React Anda. Terutama saat menggunakan [React hook dan Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks), pengambilan data menjadi semudah menulis satu kueri GraphQL di komponen Anda:

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## Templat {#templates}

Selain itu, Anda dapat memilih dari beberapa templat yang berbeda. Sejauh ini, Anda dapat menggunakan integrasi Aave, Compound, UniSwap, atau Sablier. Semuanya menambahkan alamat kontrak pintar layanan yang penting beserta integrasi subgraph yang sudah jadi. Cukup tambahkan templat ke perintah pembuatan seperti `yarn create eth-app my-eth-app --with-template aave`.

### Aave {#aave}

[Aave](https://aave.com/) adalah pasar pinjaman uang terdesentralisasi. Depositor menyediakan likuiditas ke pasar untuk mendapatkan penghasilan pasif, sementara peminjam dapat meminjam dengan menggunakan jaminan. Salah satu fitur unik Aave adalah [pinjaman kilat (flash loan)](https://aave.com/docs/developers/flash-loans) yang memungkinkan Anda meminjam uang tanpa jaminan apa pun, selama Anda mengembalikan pinjaman dalam satu transaksi. Ini bisa berguna, misalnya, untuk memberi Anda uang tunai tambahan pada perdagangan arbitrase.

Token yang diperdagangkan yang memberi Anda bunga disebut _aTokens_.

Saat Anda memilih untuk mengintegrasikan Aave dengan _create-eth-app_, Anda akan mendapatkan [integrasi subgraph](https://docs.aave.com/developers/getting-started/using-graphql). Aave menggunakan The Graph dan sudah menyediakan beberapa subgraph siap pakai di [Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) dan [Mainnet](https://thegraph.com/explorer/subgraph/aave/protocol) dalam bentuk [mentah](https://thegraph.com/explorer/subgraph/aave/protocol-raw) atau [terformat](https://thegraph.com/explorer/subgraph/aave/protocol).

![Meme Pinjaman Kilat Aave – "Yeahhh, kalau saja saya bisa menyimpan pinjaman kilat saya lebih lama dari 1 transaksi, itu akan luar biasa"](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/) mirip dengan Aave. Integrasi ini sudah menyertakan [Compound v2 Subgraph](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195) yang baru. Token penghasil bunga di sini secara mengejutkan disebut _cTokens_.

### Uniswap {#uniswap}

[Uniswap](https://uniswap.exchange/) adalah bursa terdesentralisasi (DEX). Penyedia likuiditas dapat memperoleh biaya dengan menyediakan token atau ether yang diperlukan untuk kedua sisi perdagangan. Ini digunakan secara luas dan oleh karena itu memiliki salah satu likuiditas tertinggi untuk berbagai macam token. Anda dapat dengan mudah mengintegrasikannya ke dalam dapp Anda, misalnya, untuk memungkinkan pengguna menukar ETH mereka dengan DAI.

Sayangnya, pada saat penulisan ini, integrasi hanya untuk Uniswap v1 dan bukan [v2 yang baru dirilis](https://uniswap.org/blog/uniswap-v2/).

### Sablier {#sablier}

[Sablier](https://sablier.com/) memungkinkan pengguna untuk mengalirkan pembayaran uang. Alih-alih menerima pembayaran sekaligus, Anda akan terus menerima uang secara konstan tanpa perlu administrasi lebih lanjut setelah pengaturan awal. Integrasi ini menyertakan [subgraph-nya sendiri](https://thegraph.com/explorer/subgraph/sablierhq/sablier).

## Apa selanjutnya? {#whats-next}

Jika Anda memiliki pertanyaan tentang _create-eth-app_, kunjungi [server komunitas Sablier](https://discord.gg/bsS8T47), tempat Anda dapat menghubungi para pembuat _create-eth-app_. Sebagai beberapa langkah awal berikutnya, Anda mungkin ingin mengintegrasikan kerangka kerja UI seperti [Material UI](https://mui.com/material-ui/), menulis kueri GraphQL untuk data yang benar-benar Anda butuhkan, dan menyiapkan penyebarannya.
