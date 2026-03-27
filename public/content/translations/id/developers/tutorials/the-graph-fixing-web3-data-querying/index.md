---
title: "The Graph: Memperbaiki kueri data Web3"
description: Blockchain itu seperti basis data tetapi tanpa SQL. Semua data ada di sana, tetapi tidak ada cara untuk mengaksesnya. Biarkan saya menunjukkan cara memperbaikinya dengan The Graph dan GraphQL.
author: Markus Waas
lang: id
tags: ["Solidity", "kontrak pintar", "kueri", "the graph", "react"]
skill: intermediate
breadcrumb: "The Graph"
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

Kali ini kita akan melihat lebih dekat The Graph yang pada dasarnya menjadi bagian dari tumpukan standar untuk mengembangkan dapps pada tahun lalu. Mari kita lihat terlebih dahulu bagaimana kita akan melakukan berbagai hal dengan cara tradisional...

## Tanpa The Graph... {#without-the-graph}

Jadi mari kita gunakan contoh sederhana untuk tujuan ilustrasi. Kita semua menyukai permainan, jadi bayangkan sebuah permainan sederhana dengan pengguna yang memasang taruhan:

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
            require(success, "Transfer failed");
            totalGamesPlayerWon++;
        } else {
            totalGamesPlayerLost++;
        }

        emit BetPlaced(msg.sender, msg.value, hasWon);
    }
}
```

Sekarang katakanlah di dapp kita, kita ingin menampilkan total taruhan, total permainan yang kalah/menang dan juga memperbaruinya setiap kali seseorang bermain lagi. Pendekatannya adalah:

1. Mengambil `totalGamesPlayerWon`.
2. Mengambil `totalGamesPlayerLost`.
3. Berlangganan ke event `BetPlaced`.

Kita dapat mendengarkan [event di Web3](https://docs.web3js.org/api/web3/class/Contract#events) seperti yang ditunjukkan di sebelah kanan, tetapi ini memerlukan penanganan beberapa kasus.

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // event fired // event dipicu
})
.on('changed', function(event) {
    // event was removed again // event dihapus lagi
})
.on('error', function(error, receipt) {
    // tx rejected // tx ditolak
});
```

Sekarang ini masih cukup baik untuk contoh sederhana kita. Tetapi katakanlah kita sekarang ingin menampilkan jumlah taruhan yang kalah/menang hanya untuk pemain saat ini. Sayangnya kita kurang beruntung, Anda lebih baik menerapkan kontrak baru yang menyimpan nilai-nilai tersebut dan mengambilnya. Dan sekarang bayangkan kontrak pintar dan dapp yang jauh lebih rumit, segalanya bisa menjadi berantakan dengan cepat.

![Seseorang Tidak Bisa Begitu Saja Mengkueri](./one-does-not-simply-query.jpg)

Anda dapat melihat bagaimana ini tidak optimal:

- Tidak berfungsi untuk kontrak yang sudah diterapkan.
- Biaya gas tambahan untuk menyimpan nilai-nilai tersebut.
- Memerlukan panggilan lain untuk mengambil data untuk sebuah node Ethereum.

![Itu tidak cukup baik](./not-good-enough.jpg)

Sekarang mari kita lihat solusi yang lebih baik.

## Izinkan saya memperkenalkan Anda pada GraphQL {#let-me-introduce-to-you-graphql}

Pertama mari kita bicara tentang GraphQL, yang awalnya dirancang dan diimplementasikan oleh Facebook. Anda mungkin akrab dengan model REST API tradisional. Sekarang bayangkan sebagai gantinya Anda dapat menulis kueri untuk data yang tepat seperti yang Anda inginkan:

![GraphQL API vs. REST API](./graphql.jpg)

![Demonstrasi animasi kueri GraphQL di The Graph playground](./graphql-query.gif)

Kedua gambar tersebut cukup menangkap esensi dari GraphQL. Dengan kueri di sebelah kanan kita dapat menentukan dengan tepat data apa yang kita inginkan, jadi di sana kita mendapatkan semuanya dalam satu permintaan dan tidak lebih dari apa yang kita butuhkan. Server GraphQL menangani pengambilan semua data yang diperlukan, sehingga sangat mudah digunakan oleh sisi konsumen frontend. [Ini adalah penjelasan yang bagus](https://www.apollographql.com/blog/graphql-explained) tentang bagaimana tepatnya server menangani kueri jika Anda tertarik.

Sekarang dengan pengetahuan itu, mari kita akhirnya melompat ke ruang blockchain dan The Graph.

## Apa itu The Graph? {#what-is-the-graph}

Sebuah blockchain adalah basis data yang terdesentralisasi, tetapi berbeda dengan apa yang biasanya terjadi, kita tidak memiliki bahasa kueri untuk basis data ini. Solusi untuk mengambil data sangat menyulitkan atau sama sekali tidak mungkin. The Graph adalah protokol terdesentralisasi untuk mengindeks dan mengkueri data blockchain. Dan Anda mungkin sudah bisa menebaknya, ia menggunakan GraphQL sebagai bahasa kueri.

![The Graph](./thegraph.png)

Contoh selalu menjadi yang terbaik untuk memahami sesuatu, jadi mari kita gunakan The Graph untuk contoh GameContract kita.

## Cara membuat Subgraph {#how-to-create-a-subgraph}

Definisi tentang cara mengindeks data disebut subgraph. Ini membutuhkan tiga komponen:

1. Manifes (`subgraph.yaml`)
2. Skema (`schema.graphql`)
3. Pemetaan (`mapping.ts`)

### Manifes (`subgraph.yaml`) {#manifest}

Manifes adalah file konfigurasi kita dan mendefinisikan:

- kontrak pintar mana yang akan diindeks (alamat, jaringan, ABI...)
- event mana yang akan didengarkan
- hal lain yang akan didengarkan seperti panggilan fungsi atau blok
- fungsi pemetaan yang dipanggil (lihat `mapping.ts` di bawah)

Anda dapat mendefinisikan beberapa kontrak dan penangan (handler) di sini. Pengaturan tipikal akan memiliki folder subgraph di dalam proyek Hardhat dengan repositorinya sendiri. Kemudian Anda dapat dengan mudah mereferensikan ABI.

Untuk alasan kenyamanan, Anda mungkin juga ingin menggunakan alat templat seperti mustache. Kemudian Anda membuat `subgraph.template.yaml` dan memasukkan alamat berdasarkan penerapan terbaru. Untuk contoh pengaturan yang lebih canggih, lihat misalnya [repo subgraph Aave](https://github.com/aave/aave-protocol/tree/master/thegraph).

Dan dokumentasi lengkapnya dapat dilihat [di sini](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

```yaml
specVersion: 0.0.1
description: Placing Bets on Ethereum
repository: - GitHub link -
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

Skema adalah definisi data GraphQL. Ini akan memungkinkan Anda untuk mendefinisikan entitas mana yang ada dan tipenya. Tipe yang didukung dari The Graph adalah

- Bytes
- ID
- String
- Boolean
- Int
- BigInt
- BigDecimal

Anda juga dapat menggunakan entitas sebagai tipe untuk mendefinisikan hubungan. Dalam contoh kita, kita mendefinisikan hubungan 1-ke-banyak dari pemain ke taruhan. Tanda ! berarti nilainya tidak boleh kosong. Dokumentasi lengkapnya dapat dilihat [di sini](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

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

File pemetaan di The Graph mendefinisikan fungsi kita yang mengubah event yang masuk menjadi entitas. Ini ditulis dalam AssemblyScript, bagian dari Typescript. Ini berarti ia dapat dikompilasi menjadi WASM (WebAssembly) untuk eksekusi pemetaan yang lebih efisien dan portabel.

Anda perlu mendefinisikan setiap fungsi yang dinamai dalam file `subgraph.yaml`, jadi dalam kasus kita, kita hanya membutuhkan satu: `handleNewBet`. Kita pertama-tama mencoba memuat entitas Player dari alamat pengirim sebagai id. Jika tidak ada, kita membuat entitas baru dan mengisinya dengan nilai awal.

Kemudian kita membuat entitas Bet baru. Id untuk ini adalah `event.transaction.hash.toHex() + "-" + event.logIndex.toString()` yang memastikan nilainya selalu unik. Hanya menggunakan hash tidak cukup karena seseorang mungkin memanggil fungsi placeBet beberapa kali dalam satu transaksi melalui kontrak pintar.

Terakhir kita dapat memperbarui entitas Player dengan semua data. Array tidak dapat didorong (push) secara langsung, tetapi perlu diperbarui seperti yang ditunjukkan di sini. Kita menggunakan id untuk mereferensikan taruhan. Dan `.save()` diperlukan di akhir untuk menyimpan entitas.

Dokumentasi lengkapnya dapat dilihat di sini: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings. Anda juga dapat menambahkan keluaran pencatatan (logging) ke file pemetaan, lihat [di sini](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference).

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // create if doesn't exist yet // buat jika belum ada
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

  // update array like this // perbarui array seperti ini
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## Menggunakannya di Frontend {#using-it-in-the-frontend}

Menggunakan sesuatu seperti Apollo Boost, Anda dapat dengan mudah mengintegrasikan The Graph di dapp React Anda (atau Apollo-Vue). Terutama saat menggunakan React hooks dan Apollo, mengambil data semudah menulis satu kueri GraphQL di komponen Anda. Pengaturan tipikal mungkin terlihat seperti ini:

```javascript
// See all subgraphs: https://thegraph.com/explorer/ // Lihat semua subgraph: https://thegraph.com/explorer/
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

Dan sekarang kita dapat menulis misalnya kueri seperti ini. Ini akan mengambilkan kita

- berapa kali pengguna saat ini telah menang
- berapa kali pengguna saat ini telah kalah
- daftar stempel waktu dengan semua taruhan sebelumnya

Semuanya dalam satu permintaan tunggal ke server GraphQL.

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

![Sihir](./magic.jpg)

Tetapi kita kehilangan satu bagian terakhir dari teka-teki dan itu adalah server. Anda dapat menjalankannya sendiri atau menggunakan layanan yang di-host.

## Server The Graph {#the-graph-server}

### Graph Explorer: Layanan yang di-host {#graph-explorer-the-hosted-service}

Cara termudah adalah menggunakan layanan yang di-host. Ikuti instruksi [di sini](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/) untuk menerapkan subgraph. Untuk banyak proyek, Anda sebenarnya dapat menemukan subgraph yang ada di [penjelajah](https://thegraph.com/explorer/).

![The Graph-Explorer](./thegraph-explorer.png)

### Menjalankan node Anda sendiri {#running-your-own-node}

Sebagai alternatif, Anda dapat menjalankan node Anda sendiri. Dokumen [di sini](https://github.com/graphprotocol/graph-node#quick-start). Salah satu alasan untuk melakukan ini mungkin karena menggunakan jaringan yang tidak didukung oleh layanan yang di-host. Jaringan yang saat ini didukung [dapat ditemukan di sini](https://thegraph.com/docs/en/developing/supported-networks/).

## Masa depan yang terdesentralisasi {#the-decentralized-future}

GraphQL juga mendukung aliran (stream) untuk event yang baru masuk. Ini didukung pada grafik melalui [Substreams](https://thegraph.com/docs/en/substreams/) yang saat ini dalam versi beta terbuka.

Pada tahun [2021](https://thegraph.com/blog/mainnet-migration/) The Graph memulai transisinya ke jaringan pengindeksan yang terdesentralisasi. Anda dapat membaca lebih lanjut tentang arsitektur jaringan pengindeksan yang terdesentralisasi ini [di sini](https://thegraph.com/docs/en/network/explorer/).

Dua aspek utama adalah:

1. Pengguna membayar pengindeks untuk kueri.
2. Pengindeks melakukan stake Graph Tokens (GRT).