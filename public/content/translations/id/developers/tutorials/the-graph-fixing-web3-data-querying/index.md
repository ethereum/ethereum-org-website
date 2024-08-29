---
title: "The Graph: Memperbaiki pembuatan kueri data Web3"
description: Blockchain adalah seperti sebuah basis data tapi tanpa SQL. Semua data di sana, tapi tidak ada cara mengaksesnya. Saya akan menunjukkan pada Anda cara memperbaiki ini dengan The Graph dan GraphQL.
author: Markus Waas
lang: id
tags:
  - "solidity"
  - "kontrak pintar"
  - "membuat kueri"
  - "the graph"
  - "create-eth-app"
  - "bereaksi"
skill: intermediate
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

Kali ini kita akan melihat lebih dekat The Graph yang pada dasarnya menjadi bagian dari tumpukan standar untuk mengembangkan Dapp pada tahun lalu. Mari lihat bagaimana kita akan melakukan prosesnya secara tradisional...

## Tanpa The Graph... {#without-the-graph}

Mari kita memulai dengan contoh sederhana untuk tujuan ilustrasi. Kita semua menyukai game, jadi bayangkan game sederhana di mana pengguna memasang taruhan:

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

Now let's say in our Dapp, we want to display total bets, the total games lost/won and also update it whenever someone plays again. Pendekatannya akan seperti:

1. Ambilkan `totalGamesPlayerWon`.
2. Ambilkan `totalGamesPlayerLost`.
3. Berlangganan dengan aksi `BetPlaced`.

Kita bisa mendengarkan [aksi di Web3](https://docs.web3js.org/api/web3/class/Contract#events) seperti yang ditunjukkan di sebelah kanan, tapi ini memerlukan beberapa kasus.

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // event fired
})
.on('changed', function(event) {
    // event was removed again
})
.on('error', function(error, receipt) {
    // tx rejected
});
```

Sekarang, ini masih tampak cukup baik untuk contoh sederhana kita. Tapi mari anggaplah sekarang kita mau menampilkan jumlah taruhan kalah/menang hanya untuk pemain saat ini. Sayangnya kita tidak beruntung, Anda sebaiknya menggunakan kontrak baru yang menyimpan nilai tersebut dan mengambilnya. Dan sekarang bayangkan kontrak pintar dan Dapp yang lebih rumit, semua hal bisa menjadi kacau dengan cepat.

![Seseorang Tidak Hanya Membuat Kueri](./one-does-not-simply-query.jpg)

Anda bisa melihat bagaimana ini tidak optimal:

- Tidak berfungsi untuk kontrak yang sudah digunakan.
- Memerlukan biaya gas tambahan untuk menyimpan nilai tersebut.
- Memerlukan pemanggilan lainnya untuk mengambil data dari node Ethereum.

![Itu belum cukup baik](./not-good-enough.jpg)

Sekarang, mari kita lihat solusi yang lebih baik.

## Perkenalkan, ini GraphQL {#let-me-introduce-to-you-graphql}

Pertama, mari kita bicara tentang GraphQL, yang semula dirancang dan diimplementasikan oleh Facebook. Anda mungkin sudah mengenal model API Rest tradisional. Sekarang bayangkan sebaliknya, Anda bisa menulis kueri untuk data yang persis Anda inginkan:

![API GraphQL vs. API REST](./graphql.jpg)

<img src="https://cdn0.scrvt.com/b095ee27d37b3d7b6b150adba9ac6ec8/42226f4816a77656/bc5c8b270798/graphql-querygif.gif" width="100%" />

Kedua gambar cukup menangkap inti GraphQL. Dengan kueri di sebelah kanan, kita bisa secara persis menentukan data apa yang kita inginkan, sehingga di sana kita mendapatkan semua hal dalam satu permintaan dan tidak lebih dari yang benar-benar kita butuhkan. Server GraphQL menangani pengambilan semua data yang diperlukan, sehingga itu sangat mudah digunakan dari sisi pengguna frontend. [Ini adalah penjelasan baik](https://www.apollographql.com/blog/graphql-explained-5844742f195e/) tentang bagaimana sebenarnya server menangani kueri jika Anda tertarik.

Sekarang dengan pengetahuan itu, mari akhirnya masuk ke dalam ruang blockchain dan The Graph.

## Apa itu The Graph? {#what-is-the-graph}

Sebuah blockchain adalah basis data terdesentralisasi, tapi berbeda dari basis data umumnya, kita tidak memiliki bahasa kueri untuk basis data ini. Solusi untuk mengambil data sulit atau benar-benar mustahil. The Graph adalah protokol terdesentralisasi untuk mengindeks dan membuat kueri data blockchain. Dan Anda mungkin telah menebaknya, blockchain menggunakan GraphQL sebagai bahasa kuerinya.

![The Graph](./thegraph.png)

Contoh penggunaan adalah cara paling baik untuk memahami sesuatu, jadi mari kita gunakan The Graph untuk contoh GameContract kita.

## Bagaimana membuat Subgraph {#how-to-create-a-subgraph}

Definisi bagaimana mengindeks data disebut subgraph. Subgraph memerlukan tiga komponen:

1. Manifest (`subgraph.yaml`)
2. Schema (`schema.graphql`)
3. Mapping (`mapping.ts`)

### Manifest (`subgraph.yaml`) {#manifest}

Manifestasi adalah file konfigurasi kita dan menentukan:

- kontrak pintar mana yang diindeks (alamat, jaringan, ABI...)
- aksi mana yang didengarkan
- hal lain untuk didengarkan seperti fungsi pemanggilan atau blok
- the mapping functions being called (see `mapping.ts` below)

Anda bisa menentukan kontrak dan handler beragam di sini. Pengaturan umumnya akan memiliki folder subgraph di dalam proyek Hardhat dengan repositorinya sendiri. Lalu Anda bisa dengan mudah merujuk ABI-nya.

Untuk alasan kenyamanan, Anda mungkin juga mau menggunakan peralatan templat seperti mustache. Then you create a `subgraph.template.yaml` and insert the addresses based on the latest deployments. Untuk pengaturan percontohan yang lebih canggih, lihat contoh [repo subgraph Aave](https://github.com/aave/aave-protocol/tree/master/thegraph).

Dan dokumentasi lengkapnya bisa dilihat di sini: https://thegraph.com/docs/define-a-subgraph#the-subgraph-manifest.

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

### Schema (`schema.graphql`) {#schema}

Skema adalah definisi data GraphQL. Skema akan memungkinkan Anda menentukan entitas mana yang ada dan jenisnya. Jenis yang didukung The Graph adalah

- Bita
- ID
- String
- Boolean
- Int
- BigInt
- BigDecimal

Anda bisa juga menggunakan entitas sebagai jenis untuk menentukan hubungan. Dalam contoh kita, kita menentukan 1 untuk banyak hubungan dari pemain ke taruhan. Tanda ! berarti nilai tidak boleh kosong. Dokumentasi lengkapnya bisa dilihat di sini: https://thegraph.com/docs/define-a-subgraph#the-graphql-schema.

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

### Mapping (`mapping.ts`) {#mapping}

File pemetaan dalam The Graph menentukan fungsi kita yang mengubah aksi selanjutnya ke dalam entitas. File ini ditulis dalam AssemblyScript, subset dari Typescript. Ini berarti bisa dikompilasi ke dalam WASM (WebAssembly) untuk eksekusi pemetaan yang lebih efisien dan portabel.

You will need to define each function named in the `subgraph.yaml` file, so in our case we need only one: `handleNewBet`. Pertama kita mencoba memuat entitas Pemain dari alamat pengirim sebagai id. Jika itu tidak ada, kita membuat entitas baru dan mengisinya dengan nilai awal.

Lalu kita membuat entitas Bet baru. The id for this will be `event.transaction.hash.toHex() + "-" + event.logIndex.toString()` ensuring always a unique value. Hanya menggunakan hash tidak cukup karena seseorang mungkin memanggil fungsi placeBet beberapa kali dalam satu transaksi lewat kontrak pintar.

Lastly we can update the Player entity with all the data. Array tidak boleh didorong secara langsung, tapi perlu diperbarui seperti yang ditunjukkan di sini. Kita menggunakan id untuk merujuk pada taruhannya. And `.save()` is required at the end to store an entity.

Dokumentasi lengkapnya bisa dilihat di sini: https://thegraph.com/docs/define-a-subgraph#writing-mappings. Anda juga bisa menambahkan output yang membuat log ke file pemetaan, lihat [di sini](https://thegraph.com/docs/assemblyscript-api#api-reference).

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // create if doesn't exist yet
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

## Menggunakannya pada Frontend {#using-it-in-the-frontend}

Dengan menggunakan sesuatu seperti Apollo Boost, Anda bisa dengan mudah mengintegrasikan The Graph dalam Dapp React Anda (atau Apollo-Vue). Khususnya ketika menggunakan kail React dan Apollo, mengambil data sesederhana menulis kueri GraphQl tunggal dalam komponen Anda. Pengaturan umumnya mungkin tampak seperti ini:

```javascript
// See all subgraphs: https://thegraph.com/explorer/
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

Dan sekarang, kita bisa menulis contoh kueri seperti ini. Ini akan mengambilkan kita

- berapa kali pengguna saat ini telah menang
- berapa kali pengguna saat ini telah kalah
- daftar stempel waktu dengan semua taruhan sebelumnya

Permintaan semua informasinya ke server GraphQL.

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

Tapi kita kehilangan satu keping teka-teki terakhirnya dan itu adalah server. Anda bisa entah menjalankannya sendiri atau menggunakan layanan berhost.

## Server The Graph {#the-graph-server}

### Penjelajah Graph: Layanan berhost {#graph-explorer-the-hosted-service}

Cara termudahnya adalah menggunakan layanan berhost. Ikuti instruksinya [di sini](https://thegraph.com/docs/deploy-a-subgraph) untuk menggunakan subgraph. Untuk penggunaan pada banyak proyek, Anda bisa menemukan subgraph yang ada dalam penjelajah di https://thegraph.com/explorer/.

![Penjelajah Graph](./thegraph-explorer.png)

### Menjalankan node milik Anda sendiri {#running-your-own-node}

Sebagai alternatif, Anda bisa menjalankan node Anda sendiri: https://github.com/graphprotocol/graph-node#quick-start. Satu alasan untuk melakukan ini adalah mungkin karena menggunakan jaringan yang tidak didukung oleh layanan berhost. Saat ini jaringan yang didukung adalah Jaringan Utama, Kovan, Rinkeby, Ropsten, Goerli, PoA-Core, xDAI, dan Sokol.

## Masa depan terdesentralisasi {#the-decentralized-future}

GraphQL mendukung penyiaran maupun aksi berikutnya yang baru dibuat. Ini belum sepenuhnya didukung oleh The Graph, tapi itu akan dirilis segera.

Satu aspek yang masih hilang adalah desentralisasi. The Graph memiliki rencana masa depan untuk pada akhirnya menjadi protokol terdesentralisasi penuh. Berikut adalah dua artikel hebat yang menjelaskan rencana ini dalam lebih banyak detail:

- https://thegraph.com/blog/the-graph-network-in-depth-part-1
- https://thegraph.com/blog/the-graph-network-in-depth-part-2

Dua aspek kuncinya adalah:

1. Pengguna akan membayar pengindeks untuk pembuatan kueri.
2. Pengindeks akan mempertaruhkan Token Graph (GRT).
