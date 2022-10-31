---
title: Mulai pengembangan frontend dapp Anda dengan create-eth-app
description: Gambaran umum cara menggunakan create-eth-app beserta fiturnya
author: "Markus Waas"
tags:
  - "create-eth-app"
  - "frontend"
  - "javascript"
  - "ethers.js"
  - "the graph"
  - "aave"
  - "compound"
  - "uniswap"
  - "sablier"
skill: beginner
lang: id
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

Sebelumnya, kita membahas tentang [gambaran besar Solidity](https://soliditydeveloper.com/solidity-overview-2020) dan telah menyebutkan [create-eth-app](https://github.com/PaulRBerg/create-eth-app). Sekarang Anda akan melihat cara menggunakannya, fitur apa saja yang terintegrasi di dalamnya, dan ide tambahan untuk memperluas penggunaanya. Dimulai oleh Paul Razvan Berg, pendiri [Sablier](http://sablier.finance/), aplikasi ini akan memulai pengembangan frontend Anda dan memiliki beberapa integrasi opsional yang dapat dipilih.

## Instalasi {#installation}

Instalasi membutuhkan versi Yarn 0.25 atau yang lebih tinggi (`npm install yarn --global`). Ini hanya tinggal dijalankan:

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

Ini menggunakan [create-react-app](https://github.com/facebook/create-react-app) yang di bawah hood. Untuk melihat aplikasi Anda, buka `http://localhost:3000/`. Bila sudah siap untuk digunakan ke produksi, buat paket yang diperkecil dengan yarn build. Salah cara mudah untuk menghostingnya adalah dengan menggunakan [Netlify](https://www.netlify.com/). You can create a GitHub repo, add it to Netlify, setup the build command and you are finished! Aplikasi Anda akan di-host dan dapat digunakan oleh semua orang. Dan semua ini tidak berbayar.

## Fitur {#features}

### React dan create-react-app {#react--create-react-app}

Pertama-tama, inti aplikasinya: React dan semua fitur tambahannya dilengkapi dengan _create-react-app_. Hanya menggunakan ini adalah opsi yang sangat baik jika Anda tidak ingin mengintegrasikan Ethereum. [React](https://reactjs.org/) sendiri membuat penyusunan UI interaktif menjadi sangat mudah. Ini mungkin tidak seramah [Vue](https://vuejs.org/) bagi pemula, tapi masih yang paling sering digunakan, memiliki lebih banyak fitur, dan yang paling penting ribuan pustaka tambahan yang dapat dipilih. _create-react-app_ membuat sangat mudah untuk memulai dan mencakup:

- Dukungan sintaksis React, JSX, ES6, TypeScript, Flow.
- Tambahan bahasa di luar ES6 seperti operator penyebaran objek.
- CSS dengan prefiks otomatis, sehingga Anda tidak memerlukan -webkit- atau prefiks lainnya.
- Pengeksekusi tes unit interaktif cepat dengan dukungan bawaan untuk pelaporan cakupan.
- Server pengembangan langsung yang memperingatkan tentang kesalahan-kesalahan umum.
- Sebuah skrip build untuk membuat bundle JS, CSS, dan gambar untuk produksi, dengan hash dan peta sumber.

_create-eth-app_ secara khusus memanfaatkan [efek kaitan](https://reactjs.org/docs/hooks-effect.html) yang baru. Sebuah metode untuk menulis apa yang dinamakan komponen fungsional yang efektif, tapi berukuran kecil. Lihat bagian tentang Apollo di bawah untuk mengetahui cara pemakaiannya di _create-eth-app_.

### Ruang Kerja Yarn {#yarn-workspaces}

[Ruang Kerja Yarn](https://classic.yarnpkg.com/en/docs/workspaces/) memungkinkan Anda memiliki beberapa paket, tetapi mampu mengelola semuanya dari folder akar dan menginstal dependensinya sekaligus dengan menggunakan `yarn install`. Ini masuk akal terutama untuk paket tambahan yang lebih kecil seperti alamat kontrak pintar/manajemen ABI (informasi tentang di mana Anda menggunakan kontrak pintar tertentu dan bagaimanan cara berkomunikasi dengannya) atau integrasi grafik, keduanya merupakan bagian dari `create-eth-app`.

### ethers.js {#ethersjs}

Meskipun [Web3](https://web3js.readthedocs.io/en/v1.2.7/) masih menjadi yang paling sering digunakan, [ether.js](https://docs.ethers.io/) telah mendapatkan lebih banyak daya tarik sebagai alternatif pada tahun lalu dan merupakan salah satu yang diintegrasikan ke dalam _create-eth-app_. Anda dapat bekerja dengan ini, mengubahnya ke Web3, atau mempertimbangkan untuk meningkatkannya ke [ether.js v5](https://docs-beta.ethers.io/) yang hampir keluar dari versi beta.

### The Graph {#the-graph}

[GraphQL](https://graphql.org/) adalah sebuah cara alternatif untuk menangani data yang dibandingkan dengan sebuah [API Restful](https://restfulapi.net/). The Graph memiliki beberapa keunggulan dibandingkan Api Restful, khususnya untuk data blockchain terdesentralisasi. Jika Anda tertarik dengan pemikiran di balik ini, silakan lihat [GraphQL Akan Mendukung Web Terdesentralisasi](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a).

Biasanya Anda akan mengambil data dari kontrak pintar Anda secara langsung. Ingin membaca waktu perdagangan terbaru? Cukup panggil `MyContract.methods.latestTradeTime().call()` yang mengambilkan data dari node Ethereum seperti Infura ke dalam Dapp Anda. Tetapi bagaimana jika Anda membutuhkan ratusan titik data yang berbeda? Itu akan menghasilkan ratusan pengambilan data ke node, yang setiap kali pengambilan memerlukan [RTT](https://wikipedia.org/wiki/Round-trip_delay_time) yang membuat Dapp Anda menjadi lambat dan tidak efisien. Satu solusi untuk ini mungkin adalah dengan menggunakan fungsi pemanggilan pengambil di dalam kontrak Anda yang mengembalikan beberapa data sekaligus. Namun, ini tidak selalu merupakan cara yang ideal.

Lalu, Anda juga mungkin tertarik dengan data riwayat. Anda ingin mengetahui tidak hanya waktu perdagangan terakhir, tapi juga waktu dari semua perdagangan yang pernah Anda lakukan sendiri. Gunakan paket subgraph _create-eth-app_, baca [dokumentasi](https://thegraph.com/docs/define-a-subgraph) dan sesuaikan dengan kontrak Anda. Jika Anda berencana menggunakan kontrak pintar populer, mungkin telah ada subgraph di dalamnya. Lihat [penjelajah subgraph](https://thegraph.com/explorer/).

Setelah memiliki subgraph, ini memungkinkan Anda menulis kueri sederhana di Dapp Anda yang mengambil semua data blockchain penting termasuk data riwayat yang Anda perlukan, cukup dengan satu kali pengambilan.

### Apollo {#apollo}

Berkat integrasi [Apollo Boost](https://www.apollographql.com/docs/react/get-started/), Anda dapat dengan mudah mengintegrasikan graph ke dalam Dapp React Anda. Khususnya ketika menggunakan [kaitan React dan Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks-676d116eeae2), mengambil data menjadi semudah menulis sebuah kueri GraphQl dalam kompenen Anda:

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## Templat {#templates}

Di atas, Anda dapat memilih dari beberapa templat beragam. Sejauh ini, Anda dapat menggunakan integrasi Aave, Compound, UniSwap, atau sablier. Mereka semua menambahkan layanan penting: alamat kontrak pintar beserta integrasi subgraph yang dibuat sebelumnya. Cukup tambahkan templat ke dalam perintah pembuatan seperti `yarn create eth-app my-eth-app --with-template aave`.

### Aave {#aave}

[Aave](https://aave.com/) adalah sebuah pasar pemberian pinjaman uang terdesentralisasi. Deposan memberikan likuidasi ke pasar untuk menghasilkan pendapatan pasif, sedangkan para peminjam dapat meminjam dengan menyediakan jaminan. Salah satu fitur unik dari Aave adalah [pinjaman cepat](https://docs.aave.com/developers/guides/flash-loans) yang memungkinkan Anda meminjam uang tanpa jaminan apa pun, selama Anda mengembalikan pinjaman dalam satu transaksi. Ini dapat berguna, misalnya, untuk memberikan Anda uang tambahan pada perdagangan arbitrase.

Token yang diperdagangkan yang menghasilkan bunga disebut _aTokens_.

Ketika Anda memilih untuk mengintegrasikan Aave dengan _create-eth-app_, Anda akan mendapatkan [integrasi subgraph](https://docs.aave.com/developers/getting-started/using-graphql). Aave uses The Graph and already provides you with several ready-to-use subgraphs on [Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) and [Mainnet](https://thegraph.com/explorer/subgraph/aave/protocol) in [raw](https://thegraph.com/explorer/subgraph/aave/protocol-raw) or [formatted](https://thegraph.com/explorer/subgraph/aave/protocol) form.

![Meme Pinjaman Cepat Aave – "Yah, jika saya bisa mendapatkan pinjaman cepat lebih lama dari 1 transaksi, itu akan sangat bagus"](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/) mirip dengan Aave. Integrasinya telah mencakup [Compound v2 Subgraph](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195) baru. Token penghasil bunga di sini secara mengejutkan disebut _cTokens_.

### Uniswap {#uniswap}

[Uniswap](https://uniswap.exchange/) adalah decentralized exchange (DEX). Penyedia likuiditas bisa memperoleh bayaran dengan menyediakan token atau ether yang dibutuhkan bagi kedua pihak dalam sebuah perdagangan. Uniswap dipakai secara luas dan oleh karena itu memiliki salah satu dari likuiditas tertinggi untuk kisaran token yang sangat luas. Anda dapat dengan mudah mengintegrasikannya ke dalam Dapp Anda untuk, misalnya, memungkinkan para pengguna menukar ETH mereka dengan DAI.

Sayangnya, pada saat penulisan ini, integrasi hanya dapat dilakukan untuk Uniswap v1 dan bukan [v2 yang baru saja dirilis](https://uniswap.org/blog/uniswap-v2/).

### Sablier {#sablier}

[Sablier](https://sablier.finance/) memungkinkan para pengguna menyiarkan pembayaran uang. Alih alih sekali pembayaran, Anda mendapatkan uang secara konstan tanpa administrasi tambahan setelah pengaturan awalnya selesai. Integrasinya mencakup [subgraphnya](https://thegraph.com/explorer/subgraph/sablierhq/sablier) sendiri.

## Selajutnya? {#whats-next}

Jika Anda memiliki pertanyaan tentang _create-eth-app_, kunjungi [server komunitas Sablier](https://discord.gg/bsS8T47), di mana Anda dapat berinteraksi dengan para penulis _create-eth-app_. Sebagai beberapa langkah pertama berikutnya, Anda mungkin ingin mengintegrasikan kerangka kerja UI seperti [Material UI](https://material-ui.com/), menulis kueri GraphQL untuk data yang benar-benar Anda perlukan dan menyiapkan penggunaannya.
