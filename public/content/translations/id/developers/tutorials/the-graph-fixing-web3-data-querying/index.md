---
title: "The Graph: Memperbaiki kueri data Web3"
description: Rantai blok seperti basis data, tetapi tanpa SQL. Semua data ada di sana, tetapi tidak ada cara untuk mengaksesnya. Mari saya tunjukkan cara memperbaiki ini dengan The Graph dan GraphQL.
author: Markus Waas
lang: id
tags:
  [
    "Solidity",
    "kontrak pintar",
    "membuat kueri",
    "the graph",
    "react"
  ]
skill: intermediate
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

Kali ini kita akan melihat lebih dekat The Graph yang pada dasarnya menjadi bagian dari tumpukan standar untuk mengembangkan dapps pada tahun lalu. Mari kita lihat dulu bagaimana kita akan melakukannya dengan cara tradisional...

## Tanpa The Graph... {#without-the-graph}

Jadi, mari kita gunakan contoh sederhana untuk tujuan ilustrasi. Kita semua suka game, jadi bayangkan sebuah game sederhana tempat pengguna memasang taruhan:

```solidity
pragma solidity 0.7.1;

contract Game {
    uint256 totalGamesPlayerWon = 0;
    uint256 totalGamesPlayerLost = 0;
    event BetPlaced(address player, uint256 value, bool hasWon);

    function placeBet() external payable {
        bool hasWon = evaluateBetForPlayer(msg.sender);

        if (hasWon) {
            (bool success, ) = msg.sender.call{ value: msg.value * 2 }('');
            require(success, "Transfer gagal");
            totalGamesPlayerWon++;
        } else {
            totalGamesPlayerLost++;
        }

        emit BetPlaced(msg.sender, msg.value, hasWon);
    }
}
```

Sekarang, katakanlah di dapp kita, kita ingin menampilkan total taruhan, total game yang kalah/menang, dan juga memperbaruinya setiap kali ada yang bermain lagi. Pendekatannya adalah:

1. Ambil `totalGamesPlayerWon`.
2. Ambil `totalGamesPlayerLost`.
3. Berlangganan ke event `BetPlaced`.

Kita bisa mendengarkan [event di Web3](https://docs.web3js.org/api/web3/class/Contract#events) seperti yang ditunjukkan di sebelah kanan, tetapi ini memerlukan penanganan untuk beberapa kasus.

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // event terpicu
})
.on('changed', function(event) {
    // event dihapus lagi
})
.on('error', function(error, receipt) {
    // tx ditolak
});
```

Sekarang, ini masih cukup baik untuk contoh sederhana kita. Tetapi, katakanlah kita sekarang ingin menampilkan jumlah taruhan kalah/menang hanya untuk pemain saat ini. Yah, kita kurang beruntung, Anda lebih baik menyebarkan kontrak baru yang menyimpan nilai-nilai tersebut dan mengambilnya. Dan sekarang bayangkan kontrak pintar dan dapp yang jauh lebih rumit, semuanya bisa menjadi berantakan dengan cepat.

![Membuat kueri itu tidak sesederhana itu](./one-does-not-simply-query.jpg)

Anda dapat melihat bahwa cara ini tidak optimal:

- Tidak berfungsi untuk kontrak yang sudah disebarkan.
- Biaya gas tambahan untuk menyimpan nilai-nilai tersebut.
- Memerlukan panggilan lain untuk mengambil data dari node Ethereum.

![Itu tidak cukup baik](./not-good-enough.jpg)

Sekarang, mari kita lihat solusi yang lebih baik.

## Mari saya perkenalkan Anda dengan GraphQL {#let-me-introduce-to-you-graphql}

Pertama, mari kita bicara tentang GraphQL, yang awalnya dirancang dan diimplementasikan oleh Facebook. Anda mungkin sudah familier dengan model API REST tradisional. Sekarang, bayangkan jika Anda bisa menulis kueri untuk mendapatkan data persis seperti yang Anda inginkan:

![API GraphQL vs. API REST](./graphql.jpg)

![](./graphql-query.gif)

Kedua gambar ini cukup menangkap esensi dari GraphQL. Dengan kueri di sebelah kanan, kita dapat menentukan dengan tepat data apa yang kita inginkan, sehingga kita mendapatkan semuanya dalam satu permintaan dan tidak lebih dari yang kita butuhkan. Server GraphQL menangani pengambilan semua data yang diperlukan, sehingga sangat mudah digunakan oleh sisi konsumen frontend. [Ini adalah penjelasan yang bagus](https://www.apollographql.com/blog/graphql-explained) tentang bagaimana persisnya server menangani kueri, jika Anda tertarik.

Sekarang dengan bekal pengetahuan itu, mari kita akhirnya terjun ke dunia rantai blok dan The Graph.

## Apa itu The Graph? {#what-is-the-graph}

Rantai blok adalah basis data terdesentralisasi, tetapi berbeda dari biasanya, kita tidak memiliki bahasa kueri untuk basis data ini. Solusi untuk mengambil data sangatlah sulit atau bahkan mustahil. The Graph adalah protokol terdesentralisasi untuk mengindeks dan membuat kueri data rantai blok. Dan seperti yang mungkin Anda duga, The Graph menggunakan GraphQL sebagai bahasa kuerinya.

![The Graph](./thegraph.png)

Contoh adalah cara terbaik untuk memahami sesuatu, jadi mari kita gunakan The Graph untuk contoh GameContract kita.

## Cara membuat Subgraph {#how-to-create-a-subgraph}

Definisi tentang cara mengindeks data disebut subgraph. Subgraph memerlukan tiga komponen:

1. Manifest (`subgraph.yaml`)
2. Skema (`schema.graphql`)
3. Pemetaan (`mapping.ts`)

### Manifest (`subgraph.yaml`) {#manifest}

Manifest adalah file konfigurasi kita dan mendefinisikan:

- kontrak pintar mana yang akan diindeks (alamat, jaringan, ABI...)
- event mana yang akan didengarkan
- hal lain yang perlu didengarkan seperti panggilan fungsi atau blok
- fungsi pemetaan yang dipanggil (lihat `mapping.ts` di bawah)

Anda dapat mendefinisikan beberapa kontrak dan handler di sini. Pengaturan umum biasanya memiliki folder subgraph di dalam proyek Hardhat dengan repositorinya sendiri. Kemudian Anda dapat dengan mudah mereferensikan ABI.

Untuk alasan kemudahan, Anda mungkin juga ingin menggunakan alat templat seperti mustache. Kemudian Anda membuat `subgraph.template.yaml` dan menyisipkan alamat berdasarkan penyebaran terbaru. Untuk contoh pengaturan yang lebih canggih, lihat misalnya [repo subgraph Aave](https://github.com/aave/aave-protocol/tree/master/thegraph).

Dan dokumentasi lengkapnya dapat dilihat [di sini](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

```yaml
specVersion: 0.0.1
description: Menempatkan Taruhan di Ethereum
repository: - tautan GitHub -
schema:
  file: ./schema.graphql
dataSources:
  - kind: ethereum/contract
    name: GameContract
    network: mainnet
    source:
      address: '0x2E6454...cf77eC'
      abi: GameContract
      startBlock: 6175244
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.1
      language: wasm/assemblyscript
      entities:
        - GameContract
      abis:
        - name: GameContract
          file: ../build/contracts/GameContract.json
      eventHandlers:
        - event: PlacedBet(address,uint256,bool)
          handler: handleNewBet
      file: ./src/mapping.ts
```

### Skema (`schema.graphql`) {#schema}

Skema adalah definisi data GraphQL. Skema ini memungkinkan Anda untuk mendefinisikan entitas mana yang ada beserta jenisnya. Jenis yang didukung dari The Graph adalah:

- Byte
- ID
- String
- Boolean
- Int
- BigInt
- BigDecimal

Anda juga dapat menggunakan entitas sebagai jenis untuk mendefinisikan hubungan. Dalam contoh kita, kita mendefinisikan hubungan satu-ke-banyak dari pemain ke taruhan. Tanda `!` berarti nilainya tidak boleh kosong. Dokumentasi lengkapnya dapat dilihat [di sini](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

```graphql
type Bet @entity {
  id: ID!
  player: Player!
  playerHasWon: Boolean!
  time: Int!
}

type Player @entity {
  id: ID!
  totalPlayedCount: Int
  hasWonCount: Int
  hasLostCount: Int
  bets: [Bet]!
}
```

### Pemetaan (`mapping.ts`) {#mapping}

File pemetaan di The Graph mendefinisikan fungsi-fungsi kita yang mengubah event yang masuk menjadi entitas. File ini ditulis dalam AssemblyScript, sebuah himpunan bagian (subset) dari Typescript. Ini berarti file tersebut dapat dikompilasi ke dalam WASM (WebAssembly) untuk eksekusi pemetaan yang lebih efisien dan portabel.

Anda perlu mendefinisikan setiap fungsi yang dinamai di file `subgraph.yaml`, jadi dalam kasus kita, kita hanya memerlukan satu: `handleNewBet`. Pertama, kita mencoba memuat entitas Player dari alamat pengirim sebagai id. Jika tidak ada, kita membuat entitas baru dan mengisinya dengan nilai awal.

Kemudian kita membuat entitas Bet yang baru. Id untuk ini akan menjadi `event.transaction.hash.toHex() + "-" + event.logIndex.toString()` untuk memastikan nilainya selalu unik. Hanya menggunakan hash saja tidak cukup karena seseorang mungkin memanggil fungsi `placeBet` beberapa kali dalam satu transaksi melalui kontrak pintar.

Terakhir, kita bisa memperbarui entitas Player dengan semua data. Elemen tidak dapat ditambahkan langsung ke array (`push`), tetapi perlu diperbarui seperti yang ditunjukkan di sini. Kita menggunakan id untuk mereferensikan taruhan. Dan `.save()` diperlukan di akhir untuk menyimpan sebuah entitas.

Dokumentasi lengkapnya dapat dilihat di sini: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings. Anda juga dapat menambahkan output logging ke file pemetaan, lihat [di sini](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference).

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // buat jika belum ada
    player = new Player(event.transaction.from.toHex())
    player.bets = new Array<string>(0)
    player.totalPlayedCount = 0
    player.hasWonCount = 0
    player.hasLostCount = 0
  }

  let bet = new Bet(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  bet.player = player.id
  bet.playerHasWon = event.params.hasWon
  bet.time = event.block.timestamp
  bet.save()

  player.totalPlayedCount++
  if (event.params.hasWon) {
    player.hasWonCount++
  } else {
    player.hasLostCount++
  }

  // perbarui array seperti ini
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## Menggunakannya di Frontend {#using-it-in-the-frontend}

Dengan menggunakan, misalnya, Apollo Boost, Anda dapat dengan mudah mengintegrasikan The Graph ke dalam dapp React Anda (atau Apollo-Vue). Terutama saat menggunakan React hook dan Apollo, pengambilan data menjadi semudah menulis satu kueri GraphQL di komponen Anda. Pengaturan umum mungkin terlihat seperti ini:

```javascript
// Lihat semua subgraph: https://thegraph.com/explorer/
const client = new ApolloClient({
  uri: "{{ subgraphUrl }}",
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
)
```

Dan sekarang kita bisa menulis, misalnya, kueri seperti ini. Kueri ini akan mengambil data untuk kita:

- berapa kali pengguna saat ini menang
- berapa kali pengguna saat ini kalah
- daftar stempel waktu dari semua taruhan sebelumnya

Semuanya dalam satu permintaan ke server GraphQL.

```javascript
const myGraphQlQuery = gql`
    players(where: { id: $currentUser }) {
      totalPlayedCount
      hasWonCount
      hasLostCount
      bets {
        time
      }
    }
`

const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

![Ajaib](./magic.jpg)

Tetapi kita kehilangan satu bagian terakhir dari teka-teki ini, yaitu server. Anda bisa menjalankannya sendiri atau menggunakan layanan yang di-hosting.

## Server The Graph {#the-graph-server}

### Graph Explorer: Layanan yang di-hosting {#graph-explorer-the-hosted-service}

Cara termudah adalah dengan menggunakan layanan yang di-hosting. Ikuti instruksi [di sini](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/) untuk menyebarkan subgraph. Untuk banyak proyek, Anda sebenarnya dapat menemukan subgraph yang sudah ada di [explorer](https://thegraph.com/explorer/).

![The Graph-Explorer](./thegraph-explorer.png)

### Menjalankan simpul Anda sendiri {#running-your-own-node}

Sebagai alternatif, Anda dapat menjalankan node Anda sendiri. Dokumentasi [di sini](https://github.com/graphprotocol/graph-node#quick-start). Salah satu alasannya mungkin karena Anda menggunakan jaringan yang tidak didukung oleh layanan yang di-hosting. Jaringan yang didukung saat ini [dapat ditemukan di sini](https://thegraph.com/docs/en/developing/supported-networks/).

## Masa depan yang terdesentralisasi {#the-decentralized-future}

GraphQL juga mendukung stream untuk event yang baru masuk. Fitur ini didukung di The Graph melalui [Substream](https://thegraph.com/docs/en/substreams/) yang saat ini dalam versi beta terbuka.

Pada [2021](https://thegraph.com/blog/mainnet-migration/), The Graph memulai transisinya ke jaringan pengindeksan terdesentralisasi. Anda dapat membaca lebih lanjut tentang arsitektur jaringan pengindeksan terdesentralisasi ini [di sini](https://thegraph.com/docs/en/network/explorer/).

Dua aspek kuncinya adalah:

1. Pengguna membayar para pengindeks (indexer) untuk kueri.
2. Para pengindeks (indexer) mempertaruhkan Token Graph (GRT).
