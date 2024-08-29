---
title: "The Graph: Web3 veri sorgusunu düzeltme"
description: Blok zinciri, SQL olmayan bir veri tabanı gibidir. Tüm veriler orada, ancak erişmenin bir yolu yok. Bunu The Graph ve GraphQL ile nasıl düzelteceğinizi göstereyim.
author: Markus Waas
lang: tr
tags:
  - "solidity"
  - "akıllı kontratlar"
  - "sorgulama"
  - "the graph"
  - "create-eth-app"
  - "react"
skill: intermediate
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

Bu kez, geçen yıl merkeziyetsiz uygulamalar geliştirmeye yönelik standart yığının asli bir parçası hâline gelen Graph'e daha yakından bakacağız. Önce geleneksel yöntemlerle bunları nasıl yapacağımızı görelim...

## The Graph olmasaydı... {#without-the-graph}

O hâlde örnekleme amacıyla basit bir örnekle gidelim. Hepimiz oyunları severiz, bu yüzden kullanıcıların bahis oynadığı basit bir oyun hayal edin:

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

Şimdi diyelim ki, merkeziyetsiz uygulamamızda toplam bahisleri, kaybedilen/kazanılan toplam oyunları görüntülemek ve ayrıca birisi tekrar oynadığında güncellemek istiyoruz. Yaklaşım şöyle olurdu:

1. `totalGamesPlayerWon` al.
2. `totalGamesPlayerLost` al.
3. `BetPlaced` olaylarına abone ol.

Sağda gösterildiği gibi [etkinliği Web3](https://docs.web3js.org/api/web3/class/Contract#events)'te dinleyebiliriz ancak bu, birkaç durumu çözmeyi gerektiriyor.

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

Şimdi bu, basit örneğimiz için hâlâ biraz fazla sofistike. Ama diyelim ki artık sadece mevcut oyuncu için kaybedilen/kazanılan bahis miktarlarını görüntülemek istiyoruz. Şansımız kalmadı, bu değerleri depolayan ve getiren yeni bir sözleşme yapsan iyi olur. Şimdi çok daha karmaşık bir akıllı sözleşme ve merkeziyetsiz uygulama hayal edin, işler hızla karışabilir.

![Sorgulamak Öyle Kolay Değil](./one-does-not-simply-query.jpg)

Bunun neden optimal olmadığını görebilirsiniz:

- Zaten dağıtılmış sözleşmeler için çalışmaz.
- Bu değerleri saklamak için ekstra gaz maliyetleri.
- Bir Ethereum düğümünün verilerini almak için başka bir çağrı gerektirir.

![Bu, yeterince iyi değil](./not-good-enough.jpg)

Şimdi daha iyi bir çözüme bakalım.

## Sizi GraphQL ile tanıştırayım {#let-me-introduce-to-you-graphql}

İlk önce, orijinal olarak Facebook tarafından tasarlanan ve uygulanan GraphQL'den bahsedelim. Geleneksel Rest API modeline aşina olabilirsiniz. Şimdi bunun yerine tam olarak istediğiniz veriler için bir sorgu yazabileceğinizi hayal edin:

![GraphQL API ile REST API Karşılaştırması](./graphql.jpg)

<img src="https://cdn0.scrvt.com/b095ee27d37b3d7b6b150adba9ac6ec8/42226f4816a77656/bc5c8b270798/graphql-querygif.gif" width="100%" />

İki görüntü, GraphQL'in özünü hemen hemen yakalar. Sağdaki sorgu ile tam olarak hangi verileri istediğimizi tanımlayabiliriz, böylece orada her şeyi tek bir istekte alırız ve tam olarak ihtiyacımız olandan fazlasını elde ederiz. Bir GraphQL sunucusu, gerekli tüm verilerin alınmasını yönetir, bu nedenle ön uç tüketici tarafının kullanımı inanılmaz derecede kolaydır. [Bu, ilgileniyorsanız sunucunun bir sorguyu tam olarak nasıl ele aldığının güzel bir açıklamasıdır](https://www.apollographql.com/blog/graphql-explained-5844742f195e/).

Şimdi bu bilgiyle, nihayet blok zinciri alanına ve The Graph'a geçelim.

## The Graph nedir? {#what-is-the-graph}

Blok zinciri, merkeziyetsiz bir veri tabanıdır ancak normalden farklı olarak bu veri tabanı için bir sorgu dilimiz yoktur. Verileri almak için çözümler, zahmetli veya tamamen imkansızdır. The Graph, blok zinciri verilerini endekslemek ve sorgulamak için merkeziyetsiz bir protokoldür. Tahmin etmişsinizdir, sorgulama dili olarak GraphQL kullanıyor.

![The Graph](./thegraph.png)

Bir şeyleri anlamanın en iyi yolu örnekler olduğu için GameContract örneğimiz için The Graph'i kullanalım.

## Bir Alt grafik nasıl oluşturulur {#how-to-create-a-subgraph}

Verilerin nasıl endeksleneceğinin tanımına alt grafik denir. Üç bileşen gerektirir:

1. Manifesto (`subgraph.yaml`)
2. Şema (`schema.graphql`)
3. Eşleştirme (`mapping.ts`)

### Manifesto (`subgraph.yaml`) {#manifest}

Manifesto, yapılandırma dosyamızdır ve şunları tanımlar:

- hangi akıllı sözleşmelerin endeksleneceği (adres, ağ, ABI...)
- hangi olayların dinleneceği
- fonksiyon çağrıları veya bloklar gibi dinlenecek diğer şeyler
- çağrılan eşleştirme fonksiyonları (aşağıdaki `mapping.ts`'e bakın)

Burada birden fazla sözleşme ve işleyici tanımlayabilirsiniz. Tipik bir kurulum, Hardhat projesinin içinde kendi deposuna sahip bir alt grafik klasörüne sahip olacaktır. Ardından ABI'ye kolayca başvurabilirsiniz.

Kolaylık sağlamak için mustache gibi bir şablon aracı da kullanmak isteyebilirsiniz. Ardından bir `subgraph.template.yaml` oluşturur ve en son dağıtımlara göre adresleri eklersiniz. Daha gelişmiş örnek bir kurulum için, örnek olarak [Aave alt grafik deposuna](https://github.com/aave/aave-protocol/tree/master/thegraph) bakınız.

Ayrıca belgelerin tamamına [buradan](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest) erişilebilir.

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

Şema, GraphQL veri tanımıdır. Hangi varlıkların var olduğunu ve bunların türlerini tanımlamanıza izin verecektir. The Graph tarafından desteklenen veri türleri şunlardır

- Bayt
- ID
- String
- Boolean
- Int
- BigInt
- BigDecimal

İlişkileri tanımlamak için varlıkları tür olarak da kullanabilirsiniz. Örneğimizde, oyuncudan bahislere "1'e çok" ilişkisi tanımladık. "!", değerin boş olamayacağı anlamına gelir. Belgelerin tamamına [buradan](https://thegraph.com/docs/define-a-subgraph#the-graphql-schema) erişilebilir.

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

### Eşleştirme (`mapping.ts`) {#mapping}

Graph'teki eşleştirme dosyası, gelen olayları varlıklara dönüştüren fonksiyonlarımzı tanımlar. TypeScript'in bir alt kümesi olan AssemblyScript ile yazılmıştır. Bu, eşleştirmenin daha verimli ve taşınabilir yürütülmesi için WASM'de (WebAssembly) derlenebileceği anlamına gelir.

`subgraph.yaml` dosyasında adı geçen her fonksiyonu tanımlamanız gerekecek, bu nedenle bizim durumumuzda yalnızca bir taneye ihtiyacımız var: `handleNewBet`. İlk önce gönderici adresinden Player varlığını id olarak yüklemeye çalışıyoruz. Eğer mevcut değilse, yeni bir varlık yaratır ve onu başlangıç değerleri ile doldururuz.

Sonrasında yeni bir Bet varlığı oluştururuz. Bunun kimliği, her zaman benzersiz bir değer sağlayan `event.transaction.hash.toHex() + "-" + event.logIndex.toString()` olacaktır. Birisi bir akıllı sözleşme aracılığıyla placeBet fonksiyonunu bir işlemde birkaç kez çağırıyor olabileceğinden, yalnızca hash değerini kullanmak yeterli değildir.

Son olarak Player varlığını tüm verilerle güncelleyebiliriz. Diziler doğrudan aktarılamaz, ancak burada gösterildiği gibi güncellenmesi gerekir. Bahise başvurmak için id'yi kullanırız. Ve bir varlığı saklamak için sonunda `.save()` gereklidir.

Belgelerin tamamına buradan erişilebilir: https://thegraph.com/docs/define-a-subgraph#writing-mappings. Ayrıca eşleştirme dosyasında kayıt çıktısı da ekleyebilirsiniz, [buraya](https://thegraph.com/docs/assemblyscript-api#api-reference) göz atın.

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

  // update array like this
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## Bunu Ön Uçta kullanma {#using-it-in-the-frontend}

Apollo Boost gibi bir şey kullanarak Graph'i React merkeziyetsiz uygulamanıza (veya Apollo-Vue) kolayca entegre edebilirsiniz. Özellikle React kancaları ve Apollo kullanırken veri almak, bileşeninize tek bir GraphQl sorgusu yazmak kadar basittir. Tipik bir kurulum şöyle görünebilir:

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

Ve şimdi örneğin şöyle bir sorgu yazabiliriz. Bu bize şunları alacaktır:

- mevcut kullanıcının kaç kez kazandığını
- mevcut kullanıcının kaç kez kaybettiğini
- önceki tüm bahisleriyle birlikte zaman damgalarının bir listesini

GraphQL sunucusuna hepsi tek yerde istek.

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

Ama yapbozun son bir parçası eksik: sunucu. Kendiniz çalıştırabilir veya barındırılan hizmeti kullanabilirsiniz.

## The Graph sunucusu {#the-graph-server}

### Graph Arayıcısı: Barındırılan hizmet {#graph-explorer-the-hosted-service}

En kolay yol, barındırılan hizmeti kullanmaktır. Bir alt grafik dağıtmak için [buradaki](https://thegraph.com/docs/deploy-a-subgraph) yönergeleri takip edin. Birçok proje için mevcut alt grafikleri [explorer](https://thegraph.com/explorer/)'da bulabilirsiniz.

![Graph-Arayıcısı](./thegraph-explorer.png)

### Kendi düğümünüzü çalıştırma {#running-your-own-node}

Alternatif olarak kendi düğümünüzü çalıştırabilirsiniz. Dosyalar [buradadır](https://github.com/graphprotocol/graph-node#quick-start). Bunu yapmanın bir nedeni, barındırılan hizmet tarafından desteklenmeyen bir ağ kullanmak olabilir. Şu anda Ana Ağ, Kovan, Rinkeby, Ropsten, Goerli, PoA-Core, xDAI ve Sokol desteklenmektedir.

## Merkeziyetsiz gelecek {#the-decentralized-future}

GraphQL, yeni gelen olaylar için akışları da destekler. Bu henüz The Graph tarafından tam olarak desteklenmiyor, ancak yakında yayınlanacak.

Amcal merkeziyetsizleştirme eksik bir özelliktir. Graph, sonunda tamamen merkeziyetsiz bir protokol hâline gelmek için geleceğe yönelik planlara sahiptir. Planı daha ayrıntılı açıklayan iki harika makale:

- https://thegraph.com/blog/the-graph-network-in-depth-part-1
- https://thegraph.com/blog/the-graph-network-in-depth-part-2

İki kilit noktası şunlardır:

1. Kullanıcılar, sorgular için endeksleyicilere ödeme yapacaklar.
2. Endeksleyiciler, Graph Token'larını (GRT) stake edecekler.
