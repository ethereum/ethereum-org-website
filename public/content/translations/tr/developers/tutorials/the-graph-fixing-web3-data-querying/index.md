---
title: "The Graph: Web3 veri sorgulamasını düzeltmek"
description: Blokzincir, SQL'i olmayan bir veritabanı gibidir. Tüm veriler oradadır ancak bunlara erişmenin bir yolu yoktur. The Graph ve GraphQL ile bunu nasıl düzelteceğinizi göstereyim.
author: Markus Waas
lang: tr
tags: ["solidity", "akıllı sözleşmeler", "sorgulama", "the graph", "react"]
skill: intermediate
breadcrumb: The Graph
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

Bu sefer, geçtiğimiz yıl merkeziyetsiz uygulamalar (dapp'ler) geliştirmek için standart yığının (stack) bir parçası haline gelen The Graph'e daha yakından bakacağız. Öncelikle işleri geleneksel yolla nasıl yapacağımızı görelim...

## The Graph Olmadan... {#without-the-graph}

Örnekleme amacıyla basit bir örnekle başlayalım. Hepimiz oyunları severiz, bu yüzden kullanıcıların bahis oynadığı basit bir oyun hayal edin:

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

Şimdi dapp'imizde toplam bahisleri, kaybedilen/kazanılan toplam oyunları göstermek ve ayrıca biri tekrar oynadığında bunu güncellemek istediğimizi varsayalım. Yaklaşım şu şekilde olacaktır:

1. `totalGamesPlayerWon` değerini getirin.
2. `totalGamesPlayerLost` değerini getirin.
3. `BetPlaced` olaylarına abone olun.

Sağda gösterildiği gibi [Web3'teki olayı](https://docs.web3js.org/api/web3/class/Contract#events) dinleyebiliriz, ancak bu oldukça fazla durumu ele almayı gerektirir.

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // olay tetiklendi
})
.on('changed', function(event) {
    // olay tekrar kaldırıldı
})
.on('error', function(error, receipt) {
    // işlem reddedildi
});
```

Şimdi bu, basit örneğimiz için hala bir dereceye kadar iyi. Ancak şimdi kaybedilen/kazanılan bahis miktarlarını yalnızca mevcut oyuncu için göstermek istediğimizi varsayalım. Şansımıza küselim, bu değerleri saklayan yeni bir sözleşme dağıtmanız ve bunları getirmeniz daha iyi olur. Ve şimdi çok daha karmaşık bir akıllı sözleşme ve dapp hayal edin, işler hızla karışabilir.

![One Does Not Simply Query](./one-does-not-simply-query.jpg)

Bunun neden optimal olmadığını görebilirsiniz:

- Zaten dağıtılmış sözleşmeler için çalışmaz.
- Bu değerleri saklamak için ekstra gaz maliyetleri.
- Bir Ethereum düğümü için verileri getirmek üzere başka bir çağrı gerektirir.

![Thats not good enough](./not-good-enough.jpg)

Şimdi daha iyi bir çözüme bakalım.

## Sizi GraphQL ile tanıştırayım {#let-me-introduce-to-you-graphql}

Öncelikle, orijinal olarak Facebook tarafından tasarlanan ve uygulanan GraphQL hakkında konuşalım. Geleneksel REST API modeline aşina olabilirsiniz. Şimdi bunun yerine tam olarak istediğiniz veriler için bir sorgu yazabildiğinizi hayal edin:

![GraphQL API vs. REST API](./graphql.jpg)

![Animated demonstration of a GraphQL query in The Graph playground](./graphql-query.gif)

İki görsel GraphQL'in özünü oldukça iyi yakalıyor. Sağdaki sorgu ile tam olarak hangi verileri istediğimizi tanımlayabiliriz, böylece her şeyi tek bir istekte alırız ve tam olarak ihtiyacımız olandan fazlasını almayız. Bir GraphQL sunucusu, gereken tüm verilerin getirilmesini yönetir, bu nedenle ön uç (frontend) tüketici tarafının kullanması inanılmaz derecede kolaydır. İlgileniyorsanız, sunucunun bir sorguyu tam olarak nasıl işlediğine dair [güzel bir açıklamayı burada bulabilirsiniz](https://www.apollographql.com/blog/graphql-explained).

Şimdi bu bilgiyle, nihayet blokzincir alanına ve The Graph'e geçelim.

## The Graph nedir? {#what-is-the-graph}

Bir blokzincir merkeziyetsiz bir veritabanıdır, ancak genellikle olanın aksine, bu veritabanı için bir sorgu dilimiz yoktur. Veri almak için çözümler zahmetlidir veya tamamen imkansızdır. The Graph, blokzincir verilerini endekslemek ve sorgulamak için merkeziyetsiz bir protokoldür. Ve tahmin etmiş olabileceğiniz gibi, sorgu dili olarak GraphQL kullanıyor.

![The Graph](./thegraph.png)

Örnekler bir şeyi anlamak için her zaman en iyisidir, bu yüzden GameContract örneğimiz için The Graph'i kullanalım.

## Bir Alt Grafik (Subgraph) nasıl oluşturulur {#how-to-create-a-subgraph}

Verilerin nasıl endeksleneceğinin tanımına alt grafik (subgraph) denir. Üç bileşen gerektirir:

1. Manifest (`subgraph.yaml`)
2. Şema (`schema.graphql`)
3. Eşleme (`mapping.ts`)

### Manifest (`subgraph.yaml`) {#manifest}

Manifest bizim yapılandırma dosyamızdır ve şunları tanımlar:

- hangi akıllı sözleşmelerin endeksleneceği (adres, ağ, ABI...)
- hangi olayların dinleneceği
- işlev çağrıları veya bloklar gibi dinlenecek diğer şeyler
- çağrılan eşleme işlevleri (aşağıdaki `mapping.ts` dosyasına bakın)

Burada birden fazla sözleşme ve işleyici tanımlayabilirsiniz. Tipik bir kurulum, Hardhat projesi içinde kendi deposuna sahip bir alt grafik klasörüne sahip olacaktır. Ardından ABI'ye kolayca referans verebilirsiniz.

Kolaylık sağlaması açısından mustache gibi bir şablon aracı da kullanmak isteyebilirsiniz. Ardından bir `subgraph.template.yaml` oluşturur ve en son dağıtımlara göre adresleri eklersiniz. Daha gelişmiş bir örnek kurulum için, örneğin [Aave alt grafik deposuna](https://github.com/aave/aave-protocol/tree/master/thegraph) bakın.

Ve tam belgelendirme [burada](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest) görülebilir.

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

### Şema (`schema.graphql`) {#schema}

Şema, GraphQL veri tanımıdır. Hangi varlıkların (entities) var olduğunu ve türlerini tanımlamanıza olanak tanır. The Graph tarafından desteklenen türler şunlardır:

- Bytes
- ID
- String
- Boolean
- Int
- BigInt
- BigDecimal

İlişkileri tanımlamak için varlıkları tür olarak da kullanabilirsiniz. Örneğimizde oyuncudan bahislere 1'den çoğa (1-to-many) bir ilişki tanımlıyoruz. ! işareti değerin boş olamayacağı anlamına gelir. Tam belgelendirme [burada](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest) görülebilir.

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

### Eşleme (`mapping.ts`) {#mapping}

The Graph'teki eşleme dosyası, gelen olayları varlıklara dönüştüren işlevlerimizi tanımlar. Typescript'in bir alt kümesi olan AssemblyScript ile yazılmıştır. Bu, eşlemenin daha verimli ve taşınabilir bir şekilde yürütülmesi için WASM (WebAssembly) olarak derlenebileceği anlamına gelir.

`subgraph.yaml` dosyasında adlandırılan her işlevi tanımlamanız gerekecektir, bu nedenle bizim durumumuzda yalnızca birine ihtiyacımız var: `handleNewBet`. İlk olarak Player varlığını gönderen adresinden id olarak yüklemeye çalışıyoruz. Eğer mevcut değilse, yeni bir varlık oluşturuyor ve onu başlangıç değerleriyle dolduruyoruz.

Ardından yeni bir Bet varlığı oluşturuyoruz. Bunun id'si `event.transaction.hash.toHex() + "-" + event.logIndex.toString()` olacak ve her zaman benzersiz bir değer olmasını sağlayacaktır. Birisi bir akıllı sözleşme aracılığıyla tek bir işlemde placeBet işlevini birkaç kez çağırabileceğinden, yalnızca hash kullanmak yeterli değildir.

Son olarak Player varlığını tüm verilerle güncelleyebiliriz. Dizilere (arrays) doğrudan ekleme (push) yapılamaz, ancak burada gösterildiği gibi güncellenmeleri gerekir. Bahse referans vermek için id'yi kullanırız. Ve bir varlığı saklamak için sonda `.save()` gereklidir.

Tam belgelendirme burada görülebilir: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings. Eşleme dosyasına günlük (log) çıktısı da ekleyebilirsiniz, [buraya](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference) bakın.

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // henüz yoksa oluştur
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

  // diziyi bu şekilde güncelle
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## Ön Uçta (Frontend) Kullanımı {#using-it-in-the-frontend}

Apollo Boost gibi bir şey kullanarak The Graph'i React dapp'inize (veya Apollo-Vue) kolayca entegre edebilirsiniz. Özellikle React kancaları (hooks) ve Apollo kullanırken, veri getirmek bileşeninizde tek bir GraphQL sorgusu yazmak kadar basittir. Tipik bir kurulum şuna benzeyebilir:

```javascript
// Tüm alt grafikleri görün: https://thegraph.com/explorer/
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

Ve şimdi örneğin böyle bir sorgu yazabiliriz. Bu bize şunları getirecektir:

- mevcut kullanıcının kaç kez kazandığını
- mevcut kullanıcının kaç kez kaybettiğini
- önceki tüm bahislerinin zaman damgalarını içeren bir listeyi

Hepsi GraphQL sunucusuna tek bir istekte.

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

![Magic](./magic.jpg)

Ancak yapbozun son bir parçası eksik, o da sunucu. Ya kendiniz çalıştırabilirsiniz ya da barındırılan (hosted) hizmeti kullanabilirsiniz.

## The Graph sunucusu {#the-graph-server}

### Graph Explorer: Barındırılan hizmet {#graph-explorer-the-hosted-service}

En kolay yol barındırılan hizmeti kullanmaktır. Bir alt grafik dağıtmak için [buradaki](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/) talimatları izleyin. Birçok proje için aslında [gezgin (explorer)](https://thegraph.com/explorer/) içinde mevcut alt grafikleri bulabilirsiniz.

![The Graph-Explorer](./thegraph-explorer.png)

### Kendi düğümünüzü çalıştırmak {#running-your-own-node}

Alternatif olarak kendi düğümünüzü çalıştırabilirsiniz. Belgeler [burada](https://github.com/graphprotocol/graph-node#quick-start). Bunu yapmanın bir nedeni, barındırılan hizmet tarafından desteklenmeyen bir ağ kullanmak olabilir. Şu anda desteklenen ağlar [burada bulunabilir](https://thegraph.com/docs/en/developing/supported-networks/).

## Merkeziyetsiz gelecek {#the-decentralized-future}

GraphQL, yeni gelen olaylar için akışları (streams) da destekler. Bunlar, şu anda açık beta aşamasında olan [Substreams](https://thegraph.com/docs/en/substreams/) aracılığıyla The Graph üzerinde desteklenmektedir.

[2021](https://thegraph.com/blog/mainnet-migration/) yılında The Graph, merkeziyetsiz bir endeksleme ağına geçişine başladı. Bu merkeziyetsiz endeksleme ağının mimarisi hakkında daha fazla bilgiyi [buradan](https://thegraph.com/docs/en/network/explorer/) okuyabilirsiniz.

İki temel yönü şunlardır:

1. Kullanıcılar sorgular için endeksleyicilere ödeme yapar.
2. Endeksleyiciler Graph Token'larını (GRT) stake eder.