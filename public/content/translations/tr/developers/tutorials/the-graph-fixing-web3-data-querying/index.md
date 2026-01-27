---
title: "The Graph: Web3 veri sorgusunu düzeltme"
description: Blokzincir, SQL'i olmayan bir veritabanı gibidir. Tüm veriler orada, ancak erişmenin bir yolu yok. Bunu The Graph ve GraphQL ile nasıl düzelteceğinizi göstereyim.
author: Markus Waas
lang: tr
tags:
  [
    "katılık",
    "akıllı kontratlar",
    "sorgulama",
    "the graph",
    "react"
  ]
skill: intermediate
published: 06/09/2020
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

Bu kez, geçen yıl merkeziyetsiz uygulamalar geliştirmek için standart yığının esasen bir parçası haline gelen The Graph'e daha yakından bakacağız. Önce geleneksel yöntemlerle bunları nasıl yapacağımızı görelim...

## The Graph olmasaydı... {#without-the-graph}

O hâlde, göstermek amacıyla basit bir örnekle devam edelim. Hepimiz oyunları severiz, bu yüzden kullanıcıların bahis oynadığı basit bir oyun hayal edin:

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
            require(success, "Aktarım başarısız");
            totalGamesPlayerWon++;
        } else {
            totalGamesPlayerLost++;
        }

        emit BetPlaced(msg.sender, msg.value, hasWon);
    }
}
```

Şimdi diyelim ki merkeziyetsiz uygulamamızda, toplam bahisleri, kaybedilen/kazanılan toplam oyunları görüntülemek ve birisi tekrar oynadığında bunu güncellemek istiyoruz. Yaklaşım şöyle olurdu:

1. `totalGamesPlayerWon`'ı alın.
2. `totalGamesPlayerLost`'u alın.
3. `BetPlaced` olaylarına abone olun.

Sağda gösterildiği gibi [Web3'teki olayı](https://docs.web3js.org/api/web3/class/Contract#events) dinleyebiliriz, ancak bu, epey bir durumu ele almayı gerektirir.

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

Bu durum, basit örneğimiz için hâlâ bir dereceye kadar kabul edilebilir. Ama diyelim ki şimdi sadece mevcut oyuncu için kaybedilen/kazanılan bahis miktarlarını görüntülemek istiyoruz. Pekala, şansımız yaver gitmedi, bu değerleri depolayan ve onları çeken yeni bir sözleşme dağıtmanız daha iyi olur. Ve şimdi çok daha karmaşık bir akıllı sözleşme ve merkeziyetsiz uygulama hayal edin, işler çabucak karışabilir.

![Öyle Basitçe Sorgulama Yapılmaz](./one-does-not-simply-query.jpg)

Bunun neden optimal olmadığını görebilirsiniz:

- Halihazırda dağıtılmış sözleşmeler için çalışmaz.
- Bu değerleri depolamak için ek gaz maliyetleri.
- Bir Ethereum düğümünden veri çekmek için başka bir çağrı gerektirir.

![Bu yeterince iyi değil](./not-good-enough.jpg)

Şimdi daha iyi bir çözüme bakalım.

## GraphQL ile tanıştırayım {#let-me-introduce-to-you-graphql}

İlk olarak, Facebook tarafından tasarlanan ve uygulanan GraphQL'den bahsedelim. Geleneksel REST API modeline aşina olabilirsiniz. Şimdi bunun yerine, tam olarak istediğiniz veriler için bir sorgu yazabildiğinizi hayal edin:

![GraphQL API ve REST API Karşılaştırması](./graphql.jpg)

![](./graphql-query.gif)

Bu iki görsel, GraphQL'in özünü büyük ölçüde yansıtıyor. Sağdaki sorguyla tam olarak hangi verileri istediğimizi tanımlayabiliriz, böylece her şeyi tek bir istekte alırız ve ihtiyacımız olandan fazlasını da almayız. Bir GraphQL sunucusu, gerekli tüm verilerin çekilmesini yönetir, bu nedenle ön yüz tarafında kullanımı inanılmaz derecede kolaydır. İlgileniyorsanız, [bu bağlantı](https://www.apollographql.com/blog/graphql-explained) sunucunun bir sorguyu tam olarak nasıl ele aldığını güzel bir şekilde açıklıyor.

Şimdi bu bilgiyle, nihayet blokzincir alanına ve The Graph'e geçelim.

## The Graph nedir? {#what-is-the-graph}

Blokzincir merkeziyetsiz bir veritabanıdır, ancak alışılmışın aksine, bu veritabanı için bir sorgu dilimiz yoktur. Veri almak için çözümler ya zahmetlidir ya da tamamen imkansızdır. The Graph, blokzincir verilerini dizine eklemek ve sorgulamak için merkeziyetsiz bir protokoldür. Tahmin etmişsinizdir, sorgu dili olarak GraphQL kullanıyor.

![The Graph](./thegraph.png)

Bir şeyi anlamanın en iyi yolu her zaman örneklerdir, bu yüzden GameContract örneğimiz için The Graph'i kullanalım.

## Subgraph nasıl oluşturulur {#how-to-create-a-subgraph}

Verilerin nasıl dizine ekleneceğinin tanımına subgraph denir. Üç bileşen gerektirir:

1. Manifest (`subgraph.yaml`)
2. Şema (`schema.graphql`)
3. Eşleme (`mapping.ts`)

### Manifest (`subgraph.yaml`) {#manifest}

Manifest, yapılandırma dosyamızdır ve şunları tanımlar:

- hangi akıllı sözleşmelerin dizine ekleneceği (adres, ağ, ABI...)
- hangi olayların dinleneceği
- fonksiyon çağrıları veya bloklar gibi dinlenecek diğer şeyler
- çağrılan eşleme fonksiyonları (aşağıdaki `mapping.ts`'ye bakın)

Burada birden fazla sözleşme ve işleyici tanımlayabilirsiniz. Tipik bir kurulum, Hardhat projesi içinde kendi deposu olan bir subgraph klasörüne sahip olacaktır. Ardından ABI'ye kolayca başvurabilirsiniz.

Kolaylık sağlamak için mustache gibi bir şablon aracı da kullanmak isteyebilirsiniz. Ardından bir `subgraph.template.yaml` oluşturur ve en son dağıtımlara göre adresleri eklersiniz. Daha gelişmiş bir örnek kurulum için, örneğin [Aave subgraph deposuna](https://github.com/aave/aave-protocol/tree/master/thegraph) bakın.

Tüm belgelere [buradan](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest) ulaşabilirsiniz.

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

Şema, GraphQL veri tanımıdır. Hangi varlıkların var olduğunu ve bunların türlerini tanımlamanıza olanak tanır. The Graph tarafından desteklenen türler şunlardır:

- Bayt
- ID
- String
- Boolean
- Int
- BigInt
- BigDecimal

İlişkileri tanımlamak için varlıkları tür olarak da kullanabilirsiniz. Örneğimizde, oyuncudan bahislere bire çok ilişki tanımlıyoruz. ! işareti, değerin boş olamayacağı anlamına gelir. Tüm belgelere [buradan](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest) ulaşabilirsiniz.

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

The Graph'teki eşleme dosyası, gelen olayları varlıklara dönüştüren işlevlerimizi tanımlar. TypeScript'in bir alt kümesi olan AssemblyScript ile yazılmıştır. Bu, eşlemenin daha verimli ve taşınabilir yürütülmesi için WASM'de (WebAssembly) derlenebileceği anlamına gelir.

`subgraph.yaml` dosyasında adı geçen her fonksiyonu tanımlamanız gerekecek, bu nedenle bizim durumumuzda yalnızca bir taneye ihtiyacımız var: `handleNewBet`. İlk önce gönderici adresinden Player varlığını kimlik olarak yüklemeye çalışıyoruz. Eğer mevcut değilse, yeni bir varlık yaratır ve onu başlangıç değerleri ile doldururuz.

Sonrasında yeni bir Bet varlığı oluştururuz. Bunun kimliği, her zaman benzersiz bir değer sağlayan `event.transaction.hash.toHex() + "-" + event.logIndex.toString()` olacaktır. Birisi bir akıllı sözleşme aracılığıyla placeBet fonksiyonunu bir işlemde birkaç kez çağırıyor olabileceğinden, yalnızca hash değerini kullanmak yeterli değildir.

Son olarak Player varlığını tüm verilerle güncelleyebiliriz. Dizilere doğrudan gönderim yapılamaz, ancak burada gösterildiği gibi güncellenmesi gerekir. Bahse başvurmak için kimliği kullanırız. Ve bir varlığı saklamak için sonunda `.save()` gereklidir.

Tüm belgelere buradan erişilebilir: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings. Ayrıca eşleme dosyasına günlük kaydı çıktısı da ekleyebilirsiniz, [buraya](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference) bakın.

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // henüz mevcut değilse oluştur
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

## Ön Yüzde Kullanımı {#using-it-in-the-frontend}

Apollo Boost gibi bir şey kullanarak The Graph'i React merkeziyetsiz uygulamanıza (veya Apollo-Vue) kolayca entegre edebilirsiniz. Özellikle React kancaları ve Apollo kullanırken veri almak, bileşeninize tek bir GraphQL sorgusu yazmak kadar basittir. Tipik bir kurulum şöyle görünebilir:

```javascript
// Tüm subgraph'ları gör: https://thegraph.com/explorer/
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

Ve şimdi örneğin şöyle bir sorgu yazabiliriz. Bu bize şunları getirecektir:

- mevcut kullanıcının kaç kez kazandığını
- mevcut kullanıcının kaç kez kaybettiğini
- önceki tüm bahisleriyle birlikte zaman damgalarının bir listesini

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

![Sihir](./magic.jpg)

Ama yapbozun son bir parçası eksik: sunucu. Kendiniz çalıştırabilir veya barındırılan hizmeti kullanabilirsiniz.

## The Graph sunucusu {#the-graph-server}

### Graph Explorer: Barındırılan hizmet {#graph-explorer-the-hosted-service}

En kolay yol, barındırılan hizmeti kullanmaktır. Bir subgraph dağıtmak için [buradaki](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/) talimatları izleyin. Birçok proje için, mevcut subgraph'ları [explorer](https://thegraph.com/explorer/) içinde bulabilirsiniz.

![The Graph-Explorer](./thegraph-explorer.png)

### Kendi düğümünüzü çalıştırma {#running-your-own-node}

Alternatif olarak kendi düğümünüzü çalıştırabilirsiniz. Belgeler [burada](https://github.com/graphprotocol/graph-node#quick-start). Bunu yapmanın bir nedeni, barındırılan hizmet tarafından desteklenmeyen bir ağ kullanmak olabilir. Şu anda desteklenen ağlar [burada bulunabilir](https://thegraph.com/docs/en/developing/supported-networks/).

## Merkeziyetsiz gelecek {#the-decentralized-future}

GraphQL, yeni gelen olaylar için akışları da destekler. Bunlar şu anda açık beta sürümünde olan [Substreams](https://thegraph.com/docs/en/substreams/) aracılığıyla grafikte desteklenmektedir.

The Graph, [2021](https://thegraph.com/blog/mainnet-migration/) yılında merkeziyetsiz bir dizin oluşturma ağına geçişine başladı. Bu merkeziyetsiz dizin oluşturma ağının mimarisi hakkında daha fazla bilgiyi [buradan](https://thegraph.com/docs/en/network/explorer/) okuyabilirsiniz.

İki temel unsur şunlardır:

1. Kullanıcılar sorgular için dizin oluşturuculara ödeme yapar.
2. Dizin oluşturucular, Graph Jetonlarını (GRT) stake eder.
