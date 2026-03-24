---
title: Mulai pengembangan frontend dapp Anda dengan create-eth-app
description: Gambaran umum tentang cara menggunakan create-eth-app dan fitur-fiturnya
author: "Markus Waas"
tags:
  ["frontend", "JavaScript", "ethers.js", "the graph", "defi"]
skill: beginner
breadcrumb: "create-eth-app"
lang: id
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

Terakhir kali kita melihat [gambaran besar Solidity](https://soliditydeveloper.com/solidity-overview-2020) dan telah menyebutkan [create-eth-app](https://github.com/PaulRBerg/create-eth-app). Sekarang Anda akan mengetahui cara menggunakannya, fitur apa saja yang terintegrasi, dan ide tambahan tentang cara mengembangkannya. Dimulai oleh Paul Razvan Berg, pendiri [Sablier](http://sablier.com/), aplikasi ini akan memulai pengembangan frontend Anda dan dilengkapi dengan beberapa integrasi opsional untuk dipilih.

## Instalasi {#installation}

Instalasi ini membutuhkan Yarn 0.25 atau yang lebih baru (`npm install yarn --global`). Caranya semudah menjalankan:

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

Aplikasi ini menggunakan [create-react-app](https://github.com/facebook/create-react-app) di balik layar. Untuk melihat aplikasi Anda, buka `http://localhost:3000/`. Saat Anda siap untuk menerapkan ke produksi, buat bundel yang diperkecil dengan yarn build. Salah satu cara mudah untuk meng-host ini adalah [Netlify](https://www.netlify.com/). Anda dapat membuat repo GitHub, menambahkannya ke Netlify, mengatur perintah build dan Anda selesai! Aplikasi Anda akan di-host dan dapat digunakan oleh semua orang. Dan semuanya gratis.

## Fitur {#features}

### React & create-react-app {#react--create-react-app}

Pertama-tama, jantung dari aplikasi ini: React dan semua fitur tambahan yang menyertai _create-react-app_. Hanya menggunakan ini saja sudah merupakan pilihan yang bagus jika Anda tidak ingin mengintegrasikan Ethereum. [React](https://react.dev/) sendiri membuat pembuatan UI interaktif menjadi sangat mudah. Mungkin tidak seramah [Vue](https://vuejs.org/) bagi pemula, tetapi masih paling banyak digunakan, memiliki lebih banyak fitur, dan yang terpenting ribuan pustaka tambahan untuk dipilih. _create-react-app_ membuatnya sangat mudah untuk memulainya juga dan mencakup:

- Dukungan sintaks React, JSX, ES6, TypeScript, Flow.
- Tambahan bahasa di luar ES6 seperti operator object spread.
- CSS yang diawali secara otomatis (autoprefixed), sehingga Anda tidak memerlukan -webkit- atau awalan lainnya.
- Test runner unit interaktif yang cepat dengan dukungan bawaan untuk pelaporan cakupan.
- Server pengembangan langsung yang memperingatkan tentang kesalahan umum.
- Skrip build untuk membundel JS, CSS, dan gambar untuk produksi, dengan hash dan sourcemap.

_create-eth-app_ secara khusus memanfaatkan [hooks effects](https://legacy.reactjs.org/docs/hooks-effect.html) yang baru. Sebuah metode untuk menulis komponen fungsional yang kuat, namun sangat kecil. Lihat bagian di bawah tentang Apollo untuk mengetahui bagaimana mereka digunakan dalam _create-eth-app_.

### Yarn Workspaces {#yarn-workspaces}

[Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) memungkinkan Anda memiliki beberapa paket, tetapi dapat mengelola semuanya dari folder root dan menginstal dependensi untuk semuanya sekaligus menggunakan `yarn install`. Ini sangat berguna untuk paket tambahan yang lebih kecil seperti manajemen alamat/ABI kontrak pintar (informasi tentang di mana Anda menerapkan kontrak pintar mana dan bagaimana berkomunikasi dengannya) atau integrasi the graph, keduanya merupakan bagian dari `create-eth-app`.

### ethers.js {#ethersjs}

Meskipun [Web3](https://docs.web3js.org/) masih paling banyak digunakan, [ethers.js](https://docs.ethers.io/) telah mendapatkan lebih banyak daya tarik sebagai alternatif pada tahun lalu dan merupakan yang terintegrasi ke dalam _create-eth-app_. Anda dapat bekerja dengan yang satu ini, mengubahnya ke Web3 atau mempertimbangkan untuk meningkatkan ke [ethers.js v5](https://docs.ethers.org/v5/) yang hampir keluar dari versi beta.

### The Graph {#the-graph}

[GraphQL](https://graphql.org/) adalah cara alternatif untuk menangani data dibandingkan dengan [Restful API](https://restfulapi.net/). GraphQL memiliki beberapa keuntungan dibandingkan Restful API, terutama untuk data blockchain yang terdesentralisasi. Jika Anda tertarik dengan alasan di baliknya, lihat [GraphQL Will Power the Decentralized Web](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a).

Biasanya Anda akan mengambil data dari kontrak pintar Anda secara langsung. Ingin membaca waktu perdagangan terbaru? Cukup panggil `MyContract.methods.latestTradeTime().call()` yang mengambil data dari node Ethereum ke dalam dapp Anda. Tetapi bagaimana jika Anda membutuhkan ratusan titik data yang berbeda? Itu akan menghasilkan ratusan pengambilan data ke node, setiap kali membutuhkan [RTT](https://wikipedia.org/wiki/Round-trip_delay_time) yang membuat dapp Anda lambat dan tidak efisien. Salah satu solusinya mungkin adalah fungsi panggilan fetcher di dalam kontrak Anda yang mengembalikan beberapa data sekaligus. Namun, ini tidak selalu ideal.

Dan kemudian Anda mungkin tertarik dengan data historis juga. Anda ingin tahu tidak hanya waktu perdagangan terakhir, tetapi waktu untuk semua perdagangan yang pernah Anda lakukan sendiri. Gunakan paket subgraf _create-eth-app_, baca [dokumentasi](https://thegraph.com/docs/en/subgraphs/developing/creating/starting-your-subgraph) dan sesuaikan dengan kontrak Anda sendiri. Jika Anda mencari kontrak pintar yang populer, mungkin sudah ada subgrafnya. Lihat [penjelajah subgraf](https://thegraph.com/explorer/).

Setelah Anda memiliki subgraf, ini memungkinkan Anda untuk menulis satu kueri sederhana di dapp Anda yang mengambil semua data blockchain penting termasuk data historis yang Anda butuhkan, hanya diperlukan satu pengambilan.

### Apollo {#apollo}

Berkat integrasi [Apollo Boost](https://www.apollographql.com/docs/react/get-started/), Anda dapat dengan mudah mengintegrasikan the graph di dapp React Anda. Terutama saat menggunakan [React hooks dan Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks), mengambil data semudah menulis satu kueri GraphQl di komponen Anda:

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## Templat {#templates}

Selain itu, Anda dapat memilih dari beberapa templat yang berbeda. Sejauh ini Anda dapat menggunakan integrasi Aave, Compound, UniSwap, atau sablier. Semuanya menambahkan alamat kontrak pintar layanan penting bersama dengan integrasi subgraf yang sudah jadi. Cukup tambahkan templat ke perintah pembuatan seperti `yarn create eth-app my-eth-app --with-template aave`.

### Aave {#aave}

[Aave](https://aave.com/) adalah pasar peminjaman uang terdesentralisasi. Deposan memberikan likuiditas ke pasar untuk mendapatkan penghasilan pasif, sementara peminjam dapat meminjam menggunakan agunan. Salah satu fitur unik Aave adalah [pinjaman kilat (flash loans)](https://aave.com/docs/developers/flash-loans) yang memungkinkan Anda meminjam uang tanpa agunan apa pun, selama Anda mengembalikan pinjaman dalam satu transaksi. Ini dapat berguna misalnya untuk memberi Anda uang tunai ekstra pada perdagangan arbitrase.

Token yang diperdagangkan yang memberi Anda bunga disebut _aTokens_.

Saat Anda memilih untuk mengintegrasikan Aave dengan _create-eth-app_, Anda akan mendapatkan [integrasi subgraf](https://docs.aave.com/developers/getting-started/using-graphql). Aave menggunakan The Graph dan telah menyediakan beberapa subgraf siap pakai di [Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) dan [Mainnet](https://thegraph.com/explorer/subgraph/aave/protocol) dalam bentuk [mentah](https://thegraph.com/explorer/subgraph/aave/protocol-raw) atau [terformat](https://thegraph.com/explorer/subgraph/aave/protocol).

![Meme Pinjaman Kilat Aave – "Yeahhh, if I could keep my flash loan longer than 1 transaction, that would be great"](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/) mirip dengan Aave. Integrasi ini sudah mencakup [Subgraf Compound v2](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195) yang baru. Token yang menghasilkan bunga di sini secara mengejutkan disebut _cTokens_.

### Uniswap {#uniswap}

[Uniswap](https://uniswap.exchange/) adalah pertukaran terdesentralisasi (DEX). Penyedia likuiditas dapat memperoleh biaya dengan menyediakan token atau ether yang diperlukan untuk kedua sisi perdagangan. DEX ini banyak digunakan dan oleh karena itu memiliki salah satu likuiditas tertinggi untuk rentang token yang sangat luas. Anda dapat dengan mudah mengintegrasikannya di dapp Anda untuk, misalnya, memungkinkan pengguna menukar ETH mereka dengan DAI.

Sayangnya, pada saat penulisan ini, integrasi hanya untuk Uniswap v1 dan bukan [v2 yang baru saja dirilis](https://uniswap.org/blog/uniswap-v2/).

### Sablier {#sablier}

[Sablier](https://sablier.com/) memungkinkan pengguna melakukan streaming pembayaran uang. Alih-alih satu hari gajian, Anda benar-benar mendapatkan uang Anda secara konstan tanpa administrasi lebih lanjut setelah pengaturan awal. Integrasi ini mencakup [subgrafnya sendiri](https://thegraph.com/explorer/subgraph/sablierhq/sablier).

## Apa selanjutnya? {#whats-next}

Jika Anda memiliki pertanyaan tentang _create-eth-app_, kunjungi [server komunitas Sablier](https://discord.gg/bsS8T47), di mana Anda dapat menghubungi pembuat _create-eth-app_. Sebagai beberapa langkah pertama selanjutnya, Anda mungkin ingin mengintegrasikan kerangka kerja UI seperti [Material UI](https://mui.com/material-ui/), menulis kueri GraphQL untuk data yang benar-benar Anda butuhkan, dan mengatur penerapannya.