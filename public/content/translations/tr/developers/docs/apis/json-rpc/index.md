---
title: JSON-RPC API
description: Ethereum istemcileri için durumsuz, hafif bir uzak prosedür çağrısı (RPC) protokolü.
lang: tr
---

Bir yazılım uygulamasının [Ethereum](/) blokzinciri ile etkileşime girmesi için - blokzincir verilerini okuyarak veya ağa işlemler göndererek - bir Ethereum düğümüne bağlanması gerekir.

Bu amaçla, her [Ethereum istemcisi](/developers/docs/nodes-and-clients/#execution-clients) bir [JSON-RPC spesifikasyonunu](https://github.com/ethereum/execution-apis) uygular, böylece belirli düğüm veya istemci uygulamasından bağımsız olarak uygulamaların güvenebileceği tek tip bir yöntemler kümesi bulunur.

[JSON-RPC](https://www.jsonrpc.org/specification), durumsuz, hafif bir uzak prosedür çağrısı (RPC) protokolüdür. Çeşitli veri yapılarını ve bunların işlenmesiyle ilgili kuralları tanımlar. Kavramların aynı süreç içinde, soketler üzerinden, HTTP üzerinden veya birçok farklı mesaj iletme ortamında kullanılabilmesi bakımından taşıma bağımsızdır. Veri formatı olarak JSON (RFC 4627) kullanır.

## İstemci uygulamaları {#client-implementations}

Ethereum istemcilerinin her biri, JSON-RPC spesifikasyonunu uygularken farklı programlama dilleri kullanabilir. Belirli programlama dilleriyle ilgili daha fazla ayrıntı için ilgili [istemci belgelerine](/developers/docs/nodes-and-clients/#execution-clients) bakın. En güncel API destek bilgileri için her bir istemcinin belgelerini kontrol etmenizi öneririz.

## Yardımcı Kütüphaneler {#convenience-libraries}

Ethereum istemcileriyle doğrudan JSON-RPC API aracılığıyla etkileşime girmeyi seçebilseniz de, merkeziyetsiz uygulama (dapp) geliştiricileri için genellikle daha kolay seçenekler vardır. JSON-RPC API'sinin üzerinde sarmalayıcılar sağlamak için birçok [JavaScript](/developers/docs/apis/javascript/#available-libraries) ve [arka uç API](/developers/docs/apis/backend/#available-libraries) kütüphanesi mevcuttur. Bu kütüphaneler sayesinde geliştiriciler, Ethereum ile etkileşime giren JSON-RPC isteklerini (arka planda) başlatmak için seçtikleri programlama dilinde sezgisel, tek satırlık metotlar yazabilirler.

## Fikir birliği istemcisi API'leri {#consensus-clients}

Bu sayfa temel olarak Ethereum yürütme istemcileri tarafından kullanılan JSON-RPC API'sini ele alır. Ancak, fikir birliği istemcilerinin de kullanıcıların doğrudan bir düğümden düğüm hakkında bilgi sorgulamasına, Beacon bloklarını, Beacon durumunu ve fikir birliği ile ilgili diğer bilgileri talep etmesine olanak tanıyan bir RPC API'si vardır. Bu API, [Beacon API web sayfasında](https://ethereum.github.io/beacon-APIs/#/) belgelenmiştir.

Bir düğüm içindeki istemciler arası iletişim için de dahili bir API kullanılır - yani, fikir birliği istemcisi ile yürütme istemcisinin veri takası yapmasını sağlar. Buna 'Engine API' adı verilir ve spesifikasyonları [GitHub](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) üzerinde mevcuttur.

## Yürütme istemcisi spesifikasyonu {#spec}

[GitHub'daki tam JSON-RPC API spesifikasyonunu okuyun](https://github.com/ethereum/execution-apis). Bu API, [Yürütme API'si web sayfasında](https://ethereum.github.io/execution-apis/) belgelenmiştir ve mevcut tüm yöntemleri denemek için bir Denetleyici içerir.

## Kurallar {#conventions}

### Hex değeri kodlaması {#hex-encoding}

JSON üzerinden iki temel veri türü aktarılır: biçimlendirilmemiş bayt dizileri ve nicelikler. Her ikisi de hex kodlaması ile aktarılır ancak biçimlendirme için farklı gereksinimlere sahiptir.

#### Nicelikler {#quantities-encoding}

Nicelikleri (tam sayılar, sayılar) kodlarken: hex olarak kodlayın, "0x" ön ekini ekleyin, en kompakt gösterimi kullanın (küçük bir istisna: sıfır "0x0" olarak temsil edilmelidir).

İşte bazı örnekler:

- 0x41 (ondalık sistemde 65)
- 0x400 (ondalık sistemde 1024)
- YANLIŞ: 0x (her zaman en az bir basamağa sahip olmalıdır - sıfır "0x0"dır)
- YANLIŞ: 0x0400 (başta sıfır bulunmasına izin verilmez)
- YANLIŞ: ff (0x ön eki almalıdır)

### Biçimlendirilmemiş veri {#unformatted-data-encoding}

Biçimlendirilmemiş verileri (bayt dizileri, hesap adresleri, hash'ler, baytkod dizileri) kodlarken: hex olarak kodlayın, "0x" ön ekini ekleyin, her bayt için iki hex basamağı kullanın.

İşte bazı örnekler:

- 0x41 (boyut 1, "A")
- 0x004200 (boyut 3, "0B0")
- 0x (boyut 0, "")
- YANLIŞ: 0xf0f0f (çift sayıda basamak olmalıdır)
- YANLIŞ: 004200 (0x ön eki almalıdır)

### Blok parametresi {#block-parameter}

Aşağıdaki metotlar bir blok parametresine sahiptir:

- [eth_getBalance](#eth-getbalance)
- [eth_getCode](#eth-getcode)
- [eth_getTransactionCount](#eth-gettransactioncount)
- [eth_getStorageAt](#eth-getstorageat)
- [eth_call](#eth-call)

Ethereum'un durumunu sorgulayan istekler yapıldığında, sağlanan blok parametresi bloğun yüksekliğini belirler.

Blok parametresi için aşağıdaki seçenekler mümkündür:

- `HEX String` - bir tam sayı blok numarası
- `String "earliest"` en eski/başlangıç bloğu için
- `String "latest"` - önerilen en son blok için
- `String "safe"` - en son güvenli baş blok için
- `String "finalized"` - en son kesinleşmiş blok için
- `String "pending"` - bekleyen durum/işlemler için

## Örnekler {#examples}

Bu sayfada, komut satırı aracı [curl](https://curl.se) kullanarak bireysel JSON_RPC API uç noktalarının nasıl kullanılacağına dair örnekler sunuyoruz. Bu bireysel uç nokta örnekleri aşağıdaki [Curl örnekleri](#curl-examples) bölümünde bulunabilir. Sayfanın ilerleyen kısımlarında, bir Geth düğümü, JSON_RPC API ve curl kullanarak bir akıllı sözleşmeyi derlemek ve dağıtmak için [uçtan uca bir örnek](#usage-example) de sunuyoruz.

## Curl örnekleri {#curl-examples}

Bir Ethereum düğümüne [curl](https://curl.se) istekleri yaparak JSON_RPC API'sini kullanma örnekleri aşağıda sunulmuştur. Her örnek; ilgili uç noktanın bir açıklamasını, parametrelerini, dönüş türünü ve nasıl kullanılması gerektiğine dair uygulamalı bir örneği içerir.

Curl istekleri, içerik türüyle ilgili bir hata mesajı döndürebilir. Bunun nedeni, `--data` seçeneğinin içerik türünü `application/x-www-form-urlencoded` olarak ayarlamasıdır. Düğümünüz bu konuda hata verirse, çağrının başına `-H "Content-Type: application/json"` yerleştirerek başlığı manuel olarak ayarlayın. Örnekler ayrıca, curl'e verilen son argüman olması gereken URL/IP ve port kombinasyonunu (örn. `127.0.0.1:8545`) içermez. Bu ek verileri içeren eksiksiz bir curl isteği aşağıdaki biçimi alır:

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## Dedikodu, Durum, Geçmiş {#gossip-state-history}

Birkaç temel JSON-RPC yöntemi, Ethereum ağından veri gerektirir ve düzgün bir şekilde üç ana kategoriye ayrılır: _Dedikodu, Durum ve Geçmiş_. Her bir yönteme atlamak için bu bölümlerdeki bağlantıları kullanın veya yöntemlerin tam listesini keşfetmek için içindekiler tablosunu kullanın.

### Dedikodu Yöntemleri {#gossip-methods}

> Bu yöntemler zincirin başını takip eder. İşlemler ağda bu şekilde dolaşır, bloklardaki yerlerini bulur ve istemciler yeni bloklardan bu şekilde haberdar olur.

- [eth_blockNumber](#eth-blocknumber)
- [eth_sendRawTransaction](#eth-sendrawtransaction)

### Durum Yöntemleri {#state-methods}

> Depolanan tüm verilerin mevcut durumunu bildiren yöntemler. "Durum", paylaşılan büyük bir RAM parçası gibidir ve hesap bakiyelerini, sözleşme verilerini ve gaz tahminlerini içerir.

- [eth_getBalance](#eth-getbalance)
- [eth_getStorageAt](#eth-getstorageat)
- [eth_getTransactionCount](#eth-gettransactioncount)
- [eth_getCode](#eth-getcode)
- [eth_call](#eth-call)
- [eth_estimateGas](#eth-estimategas)

### Geçmiş Yöntemleri {#history-methods}

> Başlangıç bloğuna kadar her bloğun geçmiş kayıtlarını getirir. Bu, yalnızca ekleme yapılabilen büyük bir dosya gibidir ve tüm blok başlıklarını, blok gövdelerini, amca blokları ve işlem makbuzlarını içerir.

- [eth_getBlockTransactionCountByHash](#eth-getblocktransactioncountbyhash)
- [eth_getBlockTransactionCountByNumber](#eth-getblocktransactioncountbynumber)
- [eth_getUncleCountByBlockHash](#eth-getunclecountbyblockhash)
- [eth_getUncleCountByBlockNumber](#eth-getunclecountbyblocknumber)
- [eth_getBlockByHash](#eth-getblockbyhash)
- [eth_getBlockByNumber](#eth-getblockbynumber)
- [eth_getTransactionByHash](#eth-gettransactionbyhash)
- [eth_getTransactionByBlockHashAndIndex](#eth-gettransactionbyblockhashandindex)
- [eth_getTransactionByBlockNumberAndIndex](#eth-gettransactionbyblocknumberandindex)
- [eth_getTransactionReceipt](#eth-gettransactionreceipt)
- [eth_getUncleByBlockHashAndIndex](#eth-getunclebyblockhashandindex)
- [eth_getUncleByBlockNumberAndIndex](#eth-getunclebyblocknumberandindex)

## JSON-RPC API Oyun Alanı {#json-rpc-api-playground}

API metotlarını keşfetmek ve denemek için [oyun alanı aracını](https://ethereum-json-rpc.com) kullanabilirsiniz. Ayrıca çeşitli düğüm sağlayıcıları tarafından hangi metotların ve ağların desteklendiğini de gösterir.

## JSON-RPC API Metotları {#json-rpc-methods}

### web3_clientVersion {#web3-clientversion}

Mevcut istemci sürümünü döndürür.

**Parametreler**

Yok

**Dönüşler**

`String` - Mevcut istemci sürümü

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
// Sonuç
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Geth/v1.12.1-stable/linux-amd64/go1.19.1"
}
```

### web3_sha3 {#web3-sha3}

Verilen verinin Keccak-256'sını (standartlaştırılmış SHA3-256 _değil_) döndürür.

**Parametreler**

1. `DATA` - Bir SHA3 hash'ine dönüştürülecek veri

```js
params: ["0x68656c6c6f20776f726c64"]
```

**Döndürülenler**

`DATA` - Verilen dizenin SHA3 sonucu.

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
// Sonuç
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

### net_version {#net-version}

Mevcut ağ kimliğini döndürür.

**Parametreler**

Yok

**Döndürülenler**

`String` - Mevcut ağ kimliği.

Mevcut ağ kimliklerinin tam listesi [chainlist.org](https://chainlist.org) adresinde bulunabilir. Yaygın olanlardan bazıları şunlardır:

- `1`: Ethereum Ana Ağı
- `11155111`: Sepolia test ağı
- `560048` : Hoodi Test Ağı

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
// Sonuç
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "3"
}
```

### net_listening {#net-listening}

İstemci ağ bağlantıları için aktif olarak dinliyorsa `true` döndürür.

**Parametreler**

Yok

**Döndürülenler**

`Boolean` - Dinlerken `true`, aksi takdirde `false`.

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
// Sonuç
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

### net_peerCount {#net-peercount}

Şu anda istemciye bağlı olan eşlerin sayısını döndürür.

**Parametreler**

Yok

**Dönüş Değeri**

`QUANTITY` - bağlı eşlerin sayısını belirten tam sayı.

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'
// Sonuç
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2
}
```

### eth_protocolVersion {#eth-protocolversion}

Mevcut Ethereum protokol sürümünü döndürür. Bu metodun [Geth'te mevcut olmadığını](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924) unutmayın.

**Parametreler**

Yok

**Döndürülenler**

`String` - Mevcut Ethereum protokol sürümü

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'
// Sonuç
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "54"
}
```

### eth_syncing {#eth-syncing}

Eşzamanlama durumu hakkında veriler içeren bir nesne veya `false` döndürür.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_syncing">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

Yok

**Döndürülenler**

Kesin dönüş verileri istemci uygulamaları arasında değişiklik gösterir. Düğüm eşzamanlama yapmadığında tüm istemciler `False` döndürür ve tüm istemciler aşağıdaki alanları döndürür.

`Object|Boolean`, Eşzamanlama durumu verilerini içeren bir nesne veya eşzamanlama yapılmadığında `FALSE`:

- `startingBlock`: `QUANTITY` - İçe aktarmanın başladığı blok (yalnızca eşzamanlama zincir ucuna ulaştıktan sonra sıfırlanacaktır)
- `currentBlock`: `QUANTITY` - Mevcut blok, eth_blockNumber ile aynı
- `highestBlock`: `QUANTITY` - Tahmini en yüksek blok

Ancak, bireysel istemciler ek veriler de sağlayabilir. Örneğin Geth aşağıdakileri döndürür:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "currentBlock": "0x3cf522",
    "healedBytecodeBytes": "0x0",
    "healedBytecodes": "0x0",
    "healedTrienodes": "0x0",
    "healingBytecode": "0x0",
    "healingTrienodes": "0x0",
    "highestBlock": "0x3e0e41",
    "startingBlock": "0x3cbed5",
    "syncedAccountBytes": "0x0",
    "syncedAccounts": "0x0",
    "syncedBytecodeBytes": "0x0",
    "syncedBytecodes": "0x0",
    "syncedStorage": "0x0",
    "syncedStorageBytes": "0x0"
  }
}
```

Besu ise şunları döndürür:

```json
{
  "jsonrpc": "2.0",
  "id": 51,
  "result": {
    "startingBlock": "0x0",
    "currentBlock": "0x1518",
    "highestBlock": "0x9567a3",
    "pulledStates": "0x203ca",
    "knownStates": "0x200636"
  }
}
```

Daha fazla ayrıntı için kendi istemcinizin belgelerine başvurun.

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'
// Sonuç
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
    startingBlock: '0x384',
    currentBlock: '0x386',
    highestBlock: '0x454'
  }
}
// Veya eşzamanlama yapılmadığında
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth-coinbase}

İstemci coinbase adresini döndürür.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_coinbase">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

> **Not:** Bu metot **v1.14.0** itibarıyla kullanımdan kaldırılmıştır ve artık desteklenmemektedir. Bu metodu kullanmaya çalışmak "Method not supported" hatasıyla sonuçlanacaktır.

**Parametreler**

Yok

**Döndürülenler**

`DATA`, 20 bayt - mevcut coinbase adresi.

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'
// Sonuç
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
}
```

### eth_chainId {#eth-chainid}

Tekrar oynatmaya karşı korumalı işlemleri imzalamak için kullanılan zincir kimliğini döndürür.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_chainId">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

Yok

**Döndürülenler**

`chainId`, mevcut zincir kimliğinin tam sayısını temsil eden dize biçiminde onaltılık değer.

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":67}'
// Sonuç
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x1"
}
```

### eth_mining {#eth-mining}

İstemci aktif olarak yeni bloklar için madencilik yapıyorsa `true` döndürür. Bu, yalnızca İş Kanıtı (PoW) ağları için `true` döndürebilir ve [Birleşme](/roadmap/merge/)'den bu yana bazı istemcilerde kullanılamayabilir.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_mining">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

Yok

**Dönen Değerler**

`Boolean` - istemci madencilik yapıyorsa `true`, aksi takdirde `false` döndürür.

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'
//
{
  "id":71,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_hashrate {#eth-hashrate}

Düğümün madencilik yaptığı saniye başına hash sayısını döndürür. Bu, yalnızca İş Kanıtı (PoW) ağları için `true` döndürebilir ve [Birleşme](/roadmap/merge/)'den bu yana bazı istemcilerde mevcut olmayabilir.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_hashrate">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

Yok

**Döndürülenler**

`QUANTITY` - saniye başına hash sayısı.

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71}'
// Sonuç
{
  "id":71,
  "jsonrpc": "2.0",
  "result": "0x38a"
}
```

### eth_gasPrice {#eth-gasprice}

Wei cinsinden gaz başına mevcut fiyatın bir tahminini döndürür. Örneğin, Besu istemcisi varsayılan olarak son 100 bloğu inceler ve medyan gaz birim fiyatını döndürür.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_gasPrice">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

Yok

**Döndürülenler**

`QUANTITY` - Wei cinsinden mevcut gas fiyatının tam sayısı.

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
// Sonuç
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x1dfd14000" // 8049999872 Wei
}
```

### eth_accounts {#eth-accounts}

İstemciye ait adreslerin bir listesini döndürür.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_accounts">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

Yok

**Döndürülenler**

`Array of DATA`, 20 Bayt - istemciye ait adresler.

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
// Sonuç
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}
```

### eth_blockNumber {#eth-blocknumber}

En son bloğun numarasını döndürür.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_blockNumber">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

Yok

**Döndürülenler**

`QUANTITY` - istemcinin bulunduğu mevcut blok numarasını ifade eden tam sayı.

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
// Sonuç
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0x4b7" // 1207
}
```

### eth_getBalance {#eth-getbalance}

Belirli bir adresteki hesabın bakiyesini döndürür.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBalance">
  Oyun alanında uç noktayı deneyin
</ButtonLink>

**Parametreler**

1. `DATA`, 20 Bayt - bakiyesi kontrol edilecek adres.
2. `QUANTITY|TAG` - tam sayı blok numarası veya `"latest"`, `"earliest"`, `"pending"`, `"safe"` ya da `"finalized"` dizesi, bkz. [blok parametresi](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**Döndürülenler**

`QUANTITY` - Wei cinsinden mevcut bakiyenin tam sayı değeri.

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":1}'
// Sonuç
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

### eth_getStorageAt {#eth-getstorageat}

Belirli bir adresteki depolama konumundan değeri döndürür.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getStorageAt">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

1. `DATA`, 20 Bayt - depolamanın adresi.
2. `QUANTITY` - depolamadaki konumun tam sayısı.
3. `QUANTITY|TAG` - tam sayı blok numarası veya `"latest"`, `"earliest"`, `"pending"`, `"safe"`, `"finalized"` dizesi, bkz. [blok parametresi](/developers/docs/apis/json-rpc/#block-parameter)

**Döndürür**

`DATA` - bu depolama konumundaki değer.

**Örnek**
Doğru konumu hesaplamak, alınacak depolamaya bağlıdır. `0x391694e7e0b0cce554cb130d723a9d27458f9298` adresi tarafından `0x295a70b2de5e3953354a6a8344e616ed314d7251` adresinde dağıtılan aşağıdaki sözleşmeyi göz önünde bulundurun.

```
contract Storage {
    uint pos0;
    mapping(address => uint) pos1;
    constructor() {
        pos0 = 1234;
        pos1[msg.sender] = 5678;
    }
}
```

pos0 değerini almak basittir:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

Eşlemenin (mapping) bir elemanını almak daha zordur. Eşlemedeki bir elemanın konumu şu şekilde hesaplanır:

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

Bu, pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"] üzerindeki depolamayı almak için konumu şu şekilde hesaplamamız gerektiği anlamına gelir:

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

Hesaplamayı yapmak için Web3 kütüphanesi ile birlikte gelen geth konsolu kullanılabilir:

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Şimdi depolamayı getirmek için:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### eth_getTransactionCount {#eth-gettransactioncount}

Bir adresten _gönderilen_ işlemlerin sayısını döndürür.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionCount">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

1. `DATA`, 20 Bayt - adres.
2. `QUANTITY|TAG` - tam sayı blok numarası veya `"latest"`, `"earliest"`, `"pending"`, `"safe"` ya da `"finalized"` dizesi, bkz. [blok parametresi](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // en son bloktaki durum
]
```

**Döndürülenler**

`QUANTITY` - bu adresten gönderilen işlemlerin sayısını belirten tam sayı.

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1","latest"],"id":1}'
// Sonuç
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getBlockTransactionCountByHash {#eth-getblocktransactioncountbyhash}

Verilen blok hash'i ile eşleşen bir bloktaki işlem sayısını döndürür.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByHash">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

1. `DATA`, 32 Bayt - bir bloğun hash'i

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**Döndürülenler**

`QUANTITY` - bu bloktaki işlem sayısının tam sayı değeri.

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"],"id":1}'
// Sonuç
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getBlockTransactionCountByNumber {#eth-getblocktransactioncountbynumber}

Verilen blok numarasıyla eşleşen bir bloktaki işlem sayısını döndürür.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByNumber">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

1. `QUANTITY|TAG` - bir blok numarasının tam sayısı veya [blok parametresinde](/developers/docs/apis/json-rpc/#block-parameter) olduğu gibi `"earliest"`, `"latest"`, `"pending"`, `"safe"` veya `"finalized"` dizesi.

```js
params: [
  "0x13738ca", // 20396234
]
```

**Döndürülenler**

`QUANTITY` - bu bloktaki işlem sayısının tam sayısı.

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0x13738ca"],"id":1}'
// Sonuç
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getUncleCountByBlockHash {#eth-getunclecountbyblockhash}

Verilen blok hash'i ile eşleşen bir bloktaki amca sayısını döndürür.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockHash">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

1. `DATA`, 32 Bayt - bir bloğun hash'i

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**Döndürülenler**

`QUANTITY` - bu bloktaki amca sayısının tam sayı değeri.

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"],"id":1}'
// Sonuç
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getUncleCountByBlockNumber {#eth-getunclecountbyblocknumber}

Verilen blok numarasıyla eşleşen bir bloktaki amca sayısını döndürür.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockNumber">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

1. `QUANTITY|TAG` - bir blok numarasının tam sayısı veya `"latest"`, `"earliest"`, `"pending"`, `"safe"` ya da `"finalized"` dizesi, bkz. [blok parametresi](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xe8", // 232
]
```

**Döndürülenler**

`QUANTITY` - bu bloktaki amca sayısının tam sayısı.

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
// Sonuç
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0" // 0
}
```

### eth_getCode {#eth-getcode}

Belirli bir adresteki kodu döndürür.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getCode">
  Oyun alanında uç noktayı deneyin
</ButtonLink>

**Parametreler**

1. `DATA`, 20 Bayt - adres
2. `QUANTITY|TAG` - tam sayı blok numarası veya `"latest"`, `"earliest"`, `"pending"`, `"safe"` ya da `"finalized"` dizesi, bkz. [blok parametresi](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**Dönen Değerler**

`DATA` - verilen adresten alınan kod.

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0x5daf3b"],"id":1}'
// Sonuç
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x6060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b9578063095ea7b31461014757806318160ddd146101a157806323b872dd146101ca5780632e1a7d4d14610243578063313ce5671461026657806370a082311461029557806395d89b41146102e2578063a9059cbb14610370578063d0e30db0146103ca578063dd62ed3e146103d4575b6100b7610440565b005b34156100c457600080fd5b6100cc6104dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010c5780820151818401526020810190506100f1565b50505050905090810190601f1680156101395780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561015257600080fd5b610187600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061057b565b604051808215151515815260200191505060405180910390f35b34156101ac57600080fd5b6101b461066d565b6040518082815260200191505060405180910390f35b34156101d557600080fd5b610229600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061068c565b604051808215151515815260200191505060405180910390f35b341561024e57600080fd5b61026460048080359060200190919050506109d9565b005b341561027157600080fd5b610279610b05565b604051808260ff1660ff16815260200191505060405180910390f35b34156102a057600080fd5b6102cc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b18565b6040518082815260200191505060405180910390f35b34156102ed57600080fd5b6102f5610b30565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561033557808201518184015260208101905061031a565b50505050905090810190601f1680156103625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561037b57600080fd5b6103b0600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610bce565b604051808215151515815260200191505060405180910390f35b6103d2610440565b005b34156103df57600080fd5b61042a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610be3565b6040518082815260200191505060405180910390f35b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a2565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105735780601f1061054857610100808354040283529160200191610573565b820191906000526020600020905b81548152906001019060200180831161055657829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b600081600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515156106dc57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141580156107b457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b156108cf5781600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561084457600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a2757600080fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610ab457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65826040518082815260200191505060405180910390a250565b600260009054906101000a900460ff1681565b60036020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bc65780601f10610b9b57610100808354040283529160200191610bc6565b820191906000526020600020905b815481529060010190602001808311610ba957829003601f168201915b505050505081565b6000610bdb33848461068c565b905092915050565b60046020528160005260406000206020528060005260406000206000915091505054815600a165627a7a72305820deb4c2ccab3c2fdca32ab3f46728389c2fe2c165d5fafa07661e4e004f6c344a0029"
}
```

### eth_sign {#eth-sign}

sign metodu, şununla Ethereum'a özgü bir imza hesaplar: `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`.

Mesaja bir önek eklenmesi, hesaplanan imzanın Ethereum'a özgü bir imza olarak tanınmasını sağlar. Bu, kötü niyetli bir merkeziyetsiz uygulamanın (dapp) rastgele verileri (örneğin, işlem) imzalayıp imzayı kurbanın kimliğine bürünmek için kullanması gibi kötüye kullanımları önler.

Not: imzalama yapılacak adresin kilidi açık olmalıdır.

**Parametreler**

1. `DATA`, 20 Bayt - adres
2. `DATA`, N Bayt - imzalanacak mesaj

**Döndürülenler**

`DATA`: İmza

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}'
// Sonuç
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_signTransaction {#eth-signtransaction}

[eth_sendRawTransaction](#eth-sendrawtransaction) kullanarak daha sonraki bir zamanda ağa gönderilebilecek bir işlemi imzalar.

**Parametreler**

1. `Object` - İşlem nesnesi

- `type`:
- `from`: `DATA`, 20 Bayt - İşlemin gönderildiği adres.
- `to`: `DATA`, 20 Bayt - (yeni sözleşme oluşturulurken isteğe bağlıdır) İşlemin yönlendirildiği adres.
- `gas`: `QUANTITY` - (isteğe bağlı, varsayılan: 90000) İşlemin yürütülmesi için sağlanan gazın tam sayı değeri. Kullanılmayan gazı iade edecektir.
- `gasPrice`: `QUANTITY` - (isteğe bağlı, varsayılan: Belirlenecek) Ödenen her gaz için kullanılan gas fiyatının Wei cinsinden tam sayı değeri.
- `value`: `QUANTITY` - (isteğe bağlı) Bu işlemle birlikte gönderilen değerin Wei cinsinden tam sayı değeri.
- `data`: `DATA` - Bir sözleşmenin derlenmiş kodu VEYA çağrılan yöntem imzasının ve kodlanmış parametrelerin hash'i.
- `nonce`: `QUANTITY` - (isteğe bağlı) Bir nonce'un tam sayı değeri. Bu, aynı nonce'u kullanan kendi bekleyen işlemlerinizin üzerine yazmanıza olanak tanır.

**Döndürülenler**

`DATA`, Belirtilen hesap tarafından imzalanmış, RLP kodlamalı işlem nesnesi.

**Örnek**

```js
// İstek
curl -X POST --data '{"id": 1,"jsonrpc": "2.0","method": "eth_signTransaction","params": [{"data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","gas": "0x76c0","gasPrice": "0x9184e72a000","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","value": "0x9184e72a"}]}'
// Sonuç
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_sendTransaction {#eth-sendtransaction}

Veri alanı kod içeriyorsa yeni bir mesaj çağrısı işlemi veya sözleşme oluşturma işlemi yaratır ve bunu `from` içinde belirtilen hesabı kullanarak imzalar.

**Parametreler**

1. `Object` - İşlem nesnesi

- `from`: `DATA`, 20 Bayt - İşlemin gönderildiği adres.
- `to`: `DATA`, 20 Bayt - (yeni sözleşme oluşturulurken isteğe bağlıdır) İşlemin yönlendirildiği adres.
- `gas`: `QUANTITY` - (isteğe bağlı, varsayılan: 90000) İşlemin yürütülmesi için sağlanan gazın tam sayısı. Kullanılmayan gazı iade edecektir.
- `gasPrice`: `QUANTITY` - (isteğe bağlı, varsayılan: Belirlenecek) Ödenen her gaz için kullanılan gas fiyatının tam sayısı.
- `value`: `QUANTITY` - (isteğe bağlı) Bu işlemle birlikte gönderilen değerin tam sayısı.
- `input`: `DATA` - Bir sözleşmenin derlenmiş kodu VEYA çağrılan yöntem imzasının ve kodlanmış parametrelerin hash'i.
- `nonce`: `QUANTITY` - (isteğe bağlı) Bir nonce tam sayısı. Bu, aynı nonce'u kullanan kendi bekleyen işlemlerinizin üzerine yazmanıza olanak tanır.

```js
params: [
  {
    from: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
    to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
    gas: "0x76c0", // 30400
    gasPrice: "0x9184e72a000", // 10000000000000
    value: "0x9184e72a", // 2441406250
    input:
      "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
  },
]
```

**Döndürülenler**

`DATA`, 32 Bayt - işlem hash'i veya işlem henüz mevcut değilse sıfır hash'i.

Bir sözleşme oluşturduğunuzda, işlem bir blokta önerildikten sonra sözleşme adresini almak için [eth_getTransactionReceipt](#eth-gettransactionreceipt) kullanın.

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'
// Sonuç
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_sendRawTransaction {#eth-sendrawtransaction}

İmzalı işlemler için yeni bir mesaj çağrısı işlemi veya sözleşme oluşturma işlemi yaratır.

**Parametreler**

1. `DATA`, İmzalı işlem verisi.

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**Dönen Değerler**

`DATA`, 32 Bayt - işlem hash'i veya işlem henüz mevcut değilse sıfır hash'i.

Bir sözleşme oluşturduğunuzda, işlem bir blokta önerildikten sonra sözleşme adresini almak için [eth_getTransactionReceipt](#eth-gettransactionreceipt) kullanın.

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}'
// Sonuç
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_call {#eth-call}

Blokzincir üzerinde bir işlem oluşturmadan hemen yeni bir mesaj çağrısı yürütür. Genellikle salt okunur akıllı sözleşme işlevlerini yürütmek için kullanılır, örneğin bir ERC-20 sözleşmesi için `balanceOf`.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_call">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

1. `Object` - İşlem çağrısı nesnesi

- `from`: `DATA`, 20 Bayt - (isteğe bağlı) İşlemin gönderildiği adres.
- `to`: `DATA`, 20 Bayt - İşlemin yönlendirildiği adres.
- `gas`: `QUANTITY` - (isteğe bağlı) İşlem yürütmesi için sağlanan gazın tam sayısı. eth_call sıfır gaz tüketir, ancak bu parametre bazı yürütmeler için gerekli olabilir.
- `gasPrice`: `QUANTITY` - (isteğe bağlı) Ödenen her gaz için kullanılan gasPrice tam sayısı
- `value`: `QUANTITY` - (isteğe bağlı) Bu işlemle gönderilen değerin tam sayısı
- `input`: `DATA` - (isteğe bağlı) Yöntem imzasının ve kodlanmış parametrelerin hash'i. Ayrıntılar için [Solidity belgelerindeki Ethereum Sözleşme ABI'sine](https://docs.soliditylang.org/en/latest/abi-spec.html) bakın.

2. `QUANTITY|TAG` - tam sayı blok numarası veya `"latest"`, `"earliest"`, `"pending"`, `"safe"` ya da `"finalized"` dizesi, [blok parametresine](/developers/docs/apis/json-rpc/#block-parameter) bakın

**Dönüşler**

`DATA` - yürütülen sözleşmenin dönüş değeri.

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'
// Sonuç
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

### eth_estimateGas {#eth-estimategas}

İşlemin tamamlanmasına izin vermek için ne kadar gaz gerektiğini tahmin eder ve döndürür. İşlem Blokzincire eklenmeyecektir. EVM mekanikleri ve düğüm performansı gibi çeşitli nedenlerden dolayı, tahminin işlem tarafından fiilen kullanılan gaz miktarından önemli ölçüde daha fazla olabileceğini unutmayın.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_estimateGas">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

Tüm özelliklerin isteğe bağlı olması dışında [eth_call](#eth-call) parametrelerine bakın. Hiçbir gaz limiti belirtilmezse Geth, bekleyen bloktaki blok gaz limitini üst sınır olarak kullanır. Sonuç olarak, gaz miktarı bekleyen blok gaz limitinden yüksek olduğunda, döndürülen tahmin çağrıyı/işlemi yürütmek için yeterli olmayabilir.

**Döndürülenler**

`QUANTITY` - kullanılan gaz miktarı.

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'
// Sonuç
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

### eth_getBlockByHash {#eth-getblockbyhash}

Hash değerine göre bir blok hakkında bilgi döndürür.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByHash">
  Oyun alanında uç noktayı deneyin
</ButtonLink>

**Parametreler**

1. `DATA`, 32 Bayt - Bir bloğun hash'i.
2. `Boolean` - Eğer `true` ise tam işlem nesnelerini, `false` ise yalnızca işlemlerin hash'lerini döndürür.

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**Döndürülenler**

`Object` - Bir blok nesnesi veya hiçbir blok bulunamadığında `null` döndürür:

- `number`: `QUANTITY` - blok numarası. Bekleyen blok olduğunda `null`.
- `hash`: `DATA`, 32 Bayt - bloğun hash'i. Bekleyen blok olduğunda `null`.
- `parentHash`: `DATA`, 32 Bayt - üst bloğun hash'i.
- `nonce`: `DATA`, 8 Bayt - oluşturulan İş Kanıtı (PoW) hash'i. Bekleyen blok olduğunda `null`, Hisse Kanıtı (PoS) blokları için (Birleşme'den beri) `0x0`.
- `sha3Uncles`: `DATA`, 32 Bayt - bloktaki uncle verilerinin SHA3'ü.
- `logsBloom`: `DATA`, 256 Bayt - bloğun günlükleri için bloom filtresi. Bekleyen blok olduğunda `null`.
- `transactionsRoot`: `DATA`, 32 Bayt - bloğun işlem ağacının (trie) kökü.
- `stateRoot`: `DATA`, 32 Bayt - bloğun nihai durum ağacının kökü.
- `receiptsRoot`: `DATA`, 32 Bayt - bloğun makbuz ağacının (trie) kökü.
- `miner`: `DATA`, 20 Bayt - blok ödüllerinin verildiği lehtarın adresi.
- `difficulty`: `QUANTITY` - bu blok için zorluğun tam sayı değeri.
- `totalDifficulty`: `QUANTITY` - bu bloğa kadar zincirin toplam zorluğunun tam sayı değeri.
- `extraData`: `DATA` - bu bloğun "ekstra veri" alanı.
- `size`: `QUANTITY` - bu bloğun bayt cinsinden boyutunun tam sayı değeri.
- `gasLimit`: `QUANTITY` - bu blokta izin verilen maksimum gaz.
- `gasUsed`: `QUANTITY` - bu bloktaki tüm işlemler tarafından kullanılan toplam gaz.
- `timestamp`: `QUANTITY` - bloğun derlendiği zamanın unix zaman damgası.
- `transactions`: `Array` - Verilen son parametreye bağlı olarak işlem nesneleri dizisi veya 32 Baytlık işlem hash'leri.
- `uncles`: `Array` - Uncle hash'leri dizisi.

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae", false],"id":1}'
// Sonuç
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "difficulty": "0x4ea3f27bc",
    "extraData": "0x476574682f4c5649562f76312e302e302f6c696e75782f676f312e342e32",
    "gasLimit": "0x1388",
    "gasUsed": "0x0",
    "hash": "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "miner": "0xbb7b8287f3f0a933474a79eae42cbca977791171",
    "mixHash": "0x4fffe9ae21f1c9e15207b1f472d5bbdd68c9595d461666602f2be20daf5e7843",
    "nonce": "0x689056015818adbe",
    "number": "0x1b4",
    "parentHash": "0xe99e022112df268087ea7eafaf4790497fd21dbeeb6bd7a1721df161a6657a54",
    "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    "size": "0x220",
    "stateRoot": "0xddc8b0234c2e0cad087c8b389aa7ef01f7d79b2570bccb77ce48648aa61c904d",
    "timestamp": "0x55ba467c",
    "totalDifficulty": "0x78ed983323d",
    "transactions": [
    ],
    "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "uncles": [
    ]
  }
}
```

### eth_getBlockByNumber {#eth-getblockbynumber}

Blok numarasına göre bir blok hakkında bilgi döndürür.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByNumber">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

1. `QUANTITY|TAG` - bir blok numarası tam sayısı veya [blok parametresi](/developers/docs/apis/json-rpc/#block-parameter) içinde olduğu gibi `"earliest"`, `"latest"`, `"pending"`, `"safe"` veya `"finalized"` dizesi.
2. `Boolean` - Eğer `true` ise tam işlem nesnelerini, `false` ise yalnızca işlemlerin hash'lerini döndürür.

```js
params: [
  "0x1b4", // 436
  true,
]
```

**Döndürülenler**
Bkz. [eth_getBlockByHash](#eth-getblockbyhash)

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

Sonuç için bkz. [eth_getBlockByHash](#eth-getblockbyhash)

### eth_getTransactionByHash {#eth-gettransactionbyhash}

İşlem hash'i ile talep edilen bir işlem hakkındaki bilgileri döndürür.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByHash">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

1. `DATA`, 32 Bayt - bir işlemin hash'i

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**Döndürülenler**

`Object` - Bir işlem nesnesi veya hiçbir işlem bulunamadığında `null`:

- `blockHash`: `DATA`, 32 Bayt - bu işlemin içinde bulunduğu bloğun hash'i. Beklemedeyken `null`.
- `blockNumber`: `QUANTITY` - bu işlemin içinde bulunduğu blok numarası. Beklemedeyken `null`.
- `from`: `DATA`, 20 Bayt - gönderenin adresi.
- `gas`: `QUANTITY` - gönderen tarafından sağlanan gaz.
- `gasPrice`: `QUANTITY` - gönderen tarafından sağlanan Wei cinsinden gas fiyatı.
- `hash`: `DATA`, 32 Bayt - işlemin hash'i.
- `input`: `DATA` - işlemle birlikte gönderilen veri.
- `nonce`: `QUANTITY` - gönderen tarafından bundan önce yapılan işlemlerin sayısı.
- `to`: `DATA`, 20 Bayt - alıcının adresi. Bir sözleşme oluşturma işlemi olduğunda `null`.
- `transactionIndex`: `QUANTITY` - bloğun içindeki işlemlerin endeks konumunun tam sayısı. Beklemedeyken `null`.
- `value`: `QUANTITY` - Wei cinsinden aktarılan değer.
- `v`: `QUANTITY` - ECDSA kurtarma kimliği
- `r`: `QUANTITY` - ECDSA imza r
- `s`: `QUANTITY` - ECDSA imza s

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"],"id":1}'
// Sonuç
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
    "blockNumber":"0x5daf3b", // 6139707
    "from":"0xa7d9ddbe1f17865597fbd27ec712455208b6b76d",
    "gas":"0xc350", // 50000
    "gasPrice":"0x4a817c800", // 20000000000
    "hash":"0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b",
    "input":"0x68656c6c6f21",
    "nonce":"0x15", // 21
    "to":"0xf02c1c8e6114b1dbe8937a39260b5b0a374432bb",
    "transactionIndex":"0x41", // 65
    "value":"0xf3dbb76162000", // 4290000000000000
    "v":"0x25", // 37
    "r":"0x1b5e176d927f8e9ab405058b2d2457392da3e20f328b16ddabcebc33eaac5fea",
    "s":"0x4ba69724e8f69de52f0125ad8b3c5c2cef33019bac3249e2c0a2192766d1721c"
  }
}
```

### eth_getTransactionByBlockHashAndIndex {#eth-gettransactionbyblockhashandindex}

Blok hash'i ve işlem endeksi konumuna göre bir işlem hakkında bilgi döndürür.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockHashAndIndex">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

1. `DATA`, 32 Bayt - bir bloğun hash'i.
2. `QUANTITY` - işlem endeksi konumunun tam sayısı.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Döndürdükleri**
Bkz. [eth_getTransactionByHash](#eth-gettransactionbyhash)

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Sonuç için bkz. [eth_getTransactionByHash](#eth-gettransactionbyhash)

### eth_getTransactionByBlockNumberAndIndex {#eth-gettransactionbyblocknumberandindex}

Blok numarası ve işlem endeksi konumuna göre bir işlem hakkında bilgi döndürür.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockNumberAndIndex">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

1. `QUANTITY|TAG` - bir blok numarası veya [blok parametresi](/developers/docs/apis/json-rpc/#block-parameter) içinde olduğu gibi `"earliest"`, `"latest"`, `"pending"`, `"safe"` veya `"finalized"` dizesi.
2. `QUANTITY` - işlem endeksi konumu.

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**Döndürülenler**
Bkz. [eth_getTransactionByHash](#eth-gettransactionbyhash)

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

Sonuç için bkz. [eth_getTransactionByHash](#eth-gettransactionbyhash)

### eth_getTransactionReceipt {#eth-gettransactionreceipt}

İşlem hash'ine göre bir işlemin makbuzunu döndürür.

**Not** Makbuz, bekleyen işlemler için mevcut değildir.

**Parametreler**

1. `DATA`, 32 Bayt - bir işlemin hash'i

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**Döndürülenler**
`Object` - Bir işlem makbuzu nesnesi veya hiçbir makbuz bulunamadığında `null`:

- `transactionHash `: `DATA`, 32 Bayt - işlemin hash'i.
- `transactionIndex`: `QUANTITY` - işlemin bloktaki endeks konumunun tam sayısı.
- `blockHash`: `DATA`, 32 Bayt - bu işlemin içinde bulunduğu bloğun hash'i.
- `blockNumber`: `QUANTITY` - bu işlemin içinde bulunduğu blok numarası.
- `from`: `DATA`, 20 Bayt - gönderenin adresi.
- `to`: `DATA`, 20 Bayt - alıcının adresi. Bir sözleşme oluşturma işlemi olduğunda null olur.
- `cumulativeGasUsed` : `QUANTITY ` - Bu işlem blokta yürütüldüğünde kullanılan toplam gaz miktarı.
- `effectiveGasPrice` : `QUANTITY` - Gaz birimi başına ödenen taban ücret ve öncelik ücretinin toplamı.
- `gasUsed `: `QUANTITY ` - Yalnızca bu belirli işlem tarafından kullanılan gaz miktarı.
- `contractAddress `: `DATA`, 20 Bayt - İşlem bir sözleşme oluşturma işlemiyse oluşturulan sözleşme adresi, aksi takdirde `null`.
- `logs`: `Array` - Bu işlemin oluşturduğu günlük nesneleri dizisi.
- `logsBloom`: `DATA`, 256 Bayt - Hafif istemcilerin ilgili günlükleri hızlıca alması için Bloom filtresi.
- `type`: `QUANTITY` - işlem türünün tam sayısı, eski işlemler için `0x0`, erişim listesi türleri için `0x1`, dinamik ücretler için `0x2`.

Ayrıca _şunlardan birini_ döndürür:

- `root` : `DATA` 32 baytlık işlem sonrası durum kökü (Bizans öncesi)
- `status`: `QUANTITY` `1` (başarılı) veya `0` (başarısız)

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"],"id":1}'
// Sonuç
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash":
      "0xa957d47df264a31badc3ae823e10ac1d444b098d9b73d204c40426e57f47e8c3",
    "blockNumber": "0xeff35f",
    "contractAddress": null, // oluşturulduysa Adres dizesi
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // getFilterLogs vb. tarafından döndürülen günlükler
    }],
    "logsBloom": "0x00...0", // 256 bayt bloom filtresi
    "status": "0x1",
    "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "transactionHash":
      "0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5",
    "transactionIndex": "0x66",
    "type": "0x2"
  }
}
```

### eth_getUncleByBlockHashAndIndex {#eth-getunclebyblockhashandindex}

Bir bloğun amcası hakkında hash ve amca endeks konumuna göre bilgi döndürür.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockHashAndIndex">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

1. `DATA`, 32 Bayt - Bir bloğun hash'i.
2. `QUANTITY` - Amcanın endeks konumu.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Döndürür**
Bkz. [eth_getBlockByHash](#eth-getblockbyhash)

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Sonuç için bkz. [eth_getBlockByHash](#eth-getblockbyhash)

**Not**: Bir amca, bireysel işlemler içermez.

### eth_getUncleByBlockNumberAndIndex {#eth-getunclebyblocknumberandindex}

Numarasına ve amca endeks konumuna göre bir bloğun amcası hakkında bilgi döndürür.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockNumberAndIndex">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

1. `QUANTITY|TAG` - bir blok numarası veya [blok parametresi](/developers/docs/apis/json-rpc/#block-parameter)nde olduğu gibi `"earliest"`, `"latest"`, `"pending"`, `"safe"`, `"finalized"` dizesi.
2. `QUANTITY` - amcanın endeks konumu.

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**Dönen Değerler**
Bkz. [eth_getBlockByHash](#eth-getblockbyhash)

**Not**: Bir amca, bireysel işlemleri içermez.

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

Sonuç için bkz. [eth_getBlockByHash](#eth-getblockbyhash)

### eth_newFilter {#eth-newfilter}

Durum değiştiğinde (günlükler) bildirim yapmak için filtre seçeneklerine dayalı olarak bir filtre nesnesi oluşturur.
Durumun değişip değişmediğini kontrol etmek için [eth_getFilterChanges](#eth-getfilterchanges) çağrısı yapın.

**Topic filtrelerini belirleme üzerine bir not:**
Topic'ler sıraya bağlıdır. [A, B] topic'lerine sahip bir günlüğü olan bir işlem, aşağıdaki topic filtreleriyle eşleşecektir:

- `[]` "herhangi bir şey"
- `[A]` "İlk konumda A (ve sonrasında herhangi bir şey)"
- `[null, B]` "İlk konumda herhangi bir şey VE ikinci konumda B (ve sonrasında herhangi bir şey)"
- `[A, B]` "İlk konumda A VE ikinci konumda B (ve sonrasında herhangi bir şey)"
- `[[A, B], [A, B]]` "İlk konumda (A VEYA B) VE ikinci konumda (A VEYA B) (ve sonrasında herhangi bir şey)"
- **Parametreler**

1. `Object` - Filtre seçenekleri:

- `fromBlock`: `QUANTITY|TAG` - (isteğe bağlı, varsayılan: `"latest"`) Tam sayı blok numarası veya önerilen son blok için `"latest"`, en son güvenli blok için `"safe"`, en son kesinleşmiş blok için `"finalized"` veya henüz bir blokta olmayan işlemler için `"pending"`, `"earliest"`.
- `toBlock`: `QUANTITY|TAG` - (isteğe bağlı, varsayılan: `"latest"`) Tam sayı blok numarası veya önerilen son blok için `"latest"`, en son güvenli blok için `"safe"`, en son kesinleşmiş blok için `"finalized"` veya henüz bir blokta olmayan işlemler için `"pending"`, `"earliest"`.
- `address`: `DATA|Array`, 20 Bayt - (isteğe bağlı) Günlüklerin kaynaklanması gereken sözleşme adresi veya adreslerin bir listesi.
- `topics`: `Array of DATA`, - (isteğe bağlı) 32 Baytlık `DATA` topic dizisi. Topic'ler sıraya bağlıdır. Her bir topic, "veya" seçeneklerine sahip bir VERİ (DATA) dizisi de olabilir.

```js
params: [
  {
    fromBlock: "0x1",
    toBlock: "0x2",
    address: "0x8888f1f195afa192cfee860698584c030f4c9db1",
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
      null,
      [
        "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
        "0x0000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc",
      ],
    ],
  },
]
```

**Dönen Değerler**
`QUANTITY` - Bir filtre kimliği.

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x12341234"]}],"id":73}'
// Sonuç
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_newBlockFilter {#eth-newblockfilter}

Yeni bir blok geldiğinde bildirimde bulunmak için düğümde bir filtre oluşturur.
Durumun değişip değişmediğini kontrol etmek için [eth_getFilterChanges](#eth-getfilterchanges) çağırın.

**Parametreler**
Yok

**Döndürülenler**
`QUANTITY` - Bir filtre kimliği.

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'
// Sonuç
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_newPendingTransactionFilter {#eth-newpendingtransactionfilter}

Yeni bekleyen işlemler ulaştığında bildirimde bulunmak için düğümde bir filtre oluşturur.
Durumun değişip değişmediğini kontrol etmek için [eth_getFilterChanges](#eth-getfilterchanges) çağrısı yapın.

**Parametreler**
Yok

**Döndürdükleri**
`QUANTITY` - Bir filtre kimliği.

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'
// Sonuç
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_uninstallFilter {#eth-uninstallfilter}

Verilen id'ye sahip bir filtreyi kaldırır. İzlemeye artık ihtiyaç duyulmadığında her zaman çağrılmalıdır.
Ayrıca filtreler, belirli bir süre boyunca [eth_getFilterChanges](#eth-getfilterchanges) ile talep edilmediklerinde zaman aşımına uğrar.

**Parametreler**

1. `QUANTITY` - Filtre id'si.

```js
params: [
  "0xb", // 11
]
```

**Döndürülenler**
`Boolean` - Filtre başarıyla kaldırıldıysa `true`, aksi takdirde `false`.

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}'
// Sonuç
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_getFilterChanges {#eth-getfilterchanges}

Bir filtre için yoklama yöntemi, son yoklamadan bu yana oluşan günlüklerin bir dizisini döndürür.

**Parametreler**

1. `QUANTITY` - filtre kimliği.

```js
params: [
  "0x16", // 22
]
```

**Döndürülenler**
`Array` - Günlük nesnelerinden oluşan bir dizi veya son yoklamadan bu yana hiçbir şey değişmediyse boş bir dizi.

- `eth_newBlockFilter` ile oluşturulan filtreler için dönüş değerleri blok hash'leridir (`DATA`, 32 Bayt), örn. `["0x3454645634534..."]`.
- `eth_newPendingTransactionFilter ` ile oluşturulan filtreler için dönüş değerleri işlem hash'leridir (`DATA`, 32 Bayt), örn. `["0x6345343454645..."]`.
- `eth_newFilter` ile oluşturulan filtreler için günlükler aşağıdaki parametrelere sahip nesnelerdir:
  - `removed`: `TAG` - Günlük, bir zincir yeniden düzenlemesi nedeniyle kaldırıldığında `true` olur. Geçerli bir günlükse `false` olur.
  - `logIndex`: `QUANTITY` - günlüğün bloktaki endeks konumunun tam sayısı. Bekleyen bir günlük olduğunda `null` olur.
  - `transactionIndex`: `QUANTITY` - günlüğün oluşturulduğu işlemin endeks konumunun tam sayısı. Bekleyen bir günlük olduğunda `null` olur.
  - `transactionHash`: `DATA`, 32 Bayt - bu günlüğün oluşturulduğu işlemin hash'i. Bekleyen bir günlük olduğunda `null` olur.
  - `blockHash`: `DATA`, 32 Bayt - bu günlüğün içinde bulunduğu bloğun hash'i. Beklemede olduğunda `null` olur. Bekleyen bir günlük olduğunda `null` olur.
  - `blockNumber`: `QUANTITY` - bu günlüğün içinde bulunduğu blok numarası. Beklemede olduğunda `null` olur. Bekleyen bir günlük olduğunda `null` olur.
  - `address`: `DATA`, 20 Bayt - bu günlüğün kaynaklandığı adres.
  - `data`: `DATA` - değişken uzunluklu endekslenmemiş günlük verisi. (_solidity_'de: sıfır veya daha fazla 32 Baytlık endekslenmemiş günlük argümanı.)
  - `topics`: `Array of DATA` - 0 ila 4 adet 32 Baytlık `DATA` endekslenmiş günlük argümanı dizisi. (_solidity_'de: Olayı `anonymous` belirteci ile bildirmediğiniz sürece, ilk konu olayın imzasının _hash_'idir (örn. `Deposit(address,bytes32,uint256)`).)

- **Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0x16"],"id":73}'
// Sonuç
{
  "id":1,
  "jsonrpc":"2.0",
  "result": [{
    "logIndex": "0x1", // 1
    "blockNumber":"0x1b4", // 436
    "blockHash": "0x8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "transactionHash":  "0xdf829c5a142f1fccd7d8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcf",
    "transactionIndex": "0x0", // 0
    "address": "0x16c5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "data":"0x0000000000000000000000000000000000000000000000000000000000000000",
    "topics": ["0x59ebeb90bc63057b6515673c3ecf9438e5058bca0f92585014eced636878c9a5"]
    },{
      ...
    }]
}
```

### eth_getFilterLogs {#eth-getfilterlogs}

Verilen id'ye sahip filtreyle eşleşen tüm günlüklerin bir dizisini döndürür.

**Parametreler**

1. `QUANTITY` - Filtre id'si.

```js
params: [
  "0x16", // 22
]
```

**Döndürülenler**
Bkz. [eth_getFilterChanges](#eth-getfilterchanges)

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

Sonuç için bkz. [eth_getFilterChanges](#eth-getfilterchanges)

### eth_getLogs {#eth-getlogs}

Belirli bir filtre nesnesiyle eşleşen tüm günlüklerin bir dizisini döndürür.

**Parametreler**

1. `Object` - Filtre seçenekleri:

- `fromBlock`: `QUANTITY|TAG` - (isteğe bağlı, varsayılan: `"latest"`) Tam sayı blok numarası veya önerilen son blok için `"latest"`, en son güvenli blok için `"safe"`, en son kesinleşmiş blok için `"finalized"` veya henüz bir blokta olmayan işlemler için `"pending"`, `"earliest"`.
- `toBlock`: `QUANTITY|TAG` - (isteğe bağlı, varsayılan: `"latest"`) Tam sayı blok numarası veya önerilen son blok için `"latest"`, en son güvenli blok için `"safe"`, en son kesinleşmiş blok için `"finalized"` veya henüz bir blokta olmayan işlemler için `"pending"`, `"earliest"`.
- `address`: `DATA|Array`, 20 Bayt - (isteğe bağlı) Günlüklerin kaynaklanması gereken sözleşme adresi veya adreslerin bir listesi.
- `topics`: `Array of DATA`, - (isteğe bağlı) 32 Baytlık `DATA` konuları dizisi. Konular sıraya bağlıdır. Her konu ayrıca "veya" seçeneklerine sahip bir DATA dizisi olabilir.
- `blockHash`: `DATA`, 32 Bayt - (isteğe bağlı, **gelecek**) EIP-234'ün eklenmesiyle, `blockHash`, döndürülen günlükleri 32 baytlık `blockHash` hash'ine sahip tek bir blokla sınırlayan yeni bir filtre seçeneği olacaktır. `blockHash` kullanmak, `fromBlock` = `toBlock` = `blockHash` hash'ine sahip blok numarası ile eşdeğerdir. Filtre kriterlerinde `blockHash` mevcutsa, ne `fromBlock` ne de `toBlock` kullanımına izin verilir.

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**Döndürülenler**
Bkz. [eth_getFilterChanges](#eth-getfilterchanges)

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

Sonuç için bkz. [eth_getFilterChanges](#eth-getfilterchanges)

## Kullanım Örneği {#usage-example}

### JSON-RPC kullanarak bir sözleşme dağıtmak {#deploying-contract}

Bu bölüm, yalnızca RPC arayüzünü kullanarak bir sözleşmenin nasıl dağıtılacağına dair bir gösterim içerir. Bu karmaşıklığın soyutlandığı sözleşmeleri dağıtmanın alternatif yolları vardır; örneğin, RPC arayüzü üzerine inşa edilmiş [web3.js](https://web3js.readthedocs.io/) ve [web3.py](https://github.com/ethereum/web3.py) gibi kütüphaneleri kullanmak. Bu soyutlamaların anlaşılması genellikle daha kolaydır ve daha az hataya açıktır, ancak arka planda neler olduğunu anlamak yine de faydalıdır.

Aşağıdaki, bir Ethereum düğümüne JSON-RPC arayüzü kullanılarak dağıtılacak olan `Multiply7` adlı basit bir akıllı sözleşmedir. Bu eğitim, okuyucunun halihazırda bir Geth düğümü çalıştırdığını varsaymaktadır. Düğümler ve istemciler hakkında daha fazla bilgi [burada](/developers/docs/nodes-and-clients/run-a-node) mevcuttur. Geth dışındaki istemciler için HTTP JSON-RPC'nin nasıl başlatılacağını görmek üzere lütfen ilgili [istemci](/developers/docs/nodes-and-clients/) belgelerine başvurun. Çoğu istemci varsayılan olarak `localhost:8545` üzerinde hizmet verir.

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

Yapılacak ilk şey, HTTP RPC arayüzünün etkinleştirildiğinden emin olmaktır. Bu, başlangıçta Geth'e `--http` bayrağını sağladığımız anlamına gelir. Bu örnekte, özel bir geliştirme zincirindeki Geth düğümünü kullanıyoruz. Bu yaklaşımı kullanarak gerçek ağda Ether'e ihtiyacımız olmaz.

```bash
geth --http --dev console 2>>geth.log
```

Bu, `http://localhost:8545` üzerinde HTTP RPC arayüzünü başlatacaktır.

[curl](https://curl.se) kullanarak Coinbase adresini (hesaplar dizisinden ilk adresi alarak) ve bakiyeyi alıp arayüzün çalıştığını doğrulayabiliriz. Lütfen bu örneklerdeki verilerin yerel düğümünüzde farklılık göstereceğini unutmayın. Bu komutları denemek isterseniz, ikinci curl isteğindeki istek parametrelerini ilkinden dönen sonuçla değiştirin.

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[], "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

Sayılar onaltılık (hex) olarak kodlandığından, bakiye Wei cinsinden bir onaltılık dize olarak döndürülür. Bakiyeyi sayı olarak Ether cinsinden almak istersek, Geth konsolundan web3 kullanabiliriz.

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

Artık özel geliştirme zincirimizde bir miktar Ether olduğuna göre, sözleşmeyi dağıtabiliriz. İlk adım, Multiply7 sözleşmesini EVM'ye gönderilebilecek baytkoda derlemektir. Solidity derleyicisi olan solc'yi kurmak için [Solidity belgelerini](https://docs.soliditylang.org/en/latest/installing-solidity.html) izleyin. ([Örneğimiz için kullanılan derleyici sürümüyle](https://github.com/ethereum/solidity/releases/tag/v0.4.20) eşleşmesi için daha eski bir `solc` sürümü kullanmak isteyebilirsiniz.)

Bir sonraki adım, Multiply7 sözleşmesini EVM'ye gönderilebilecek baytkoda derlemektir.

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

Artık derlenmiş koda sahip olduğumuza göre, onu dağıtmanın ne kadar gaza mal olacağını belirlememiz gerekiyor. RPC arayüzü, bize bir tahmin verecek olan bir `eth_estimateGas` yöntemine sahiptir.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

Ve son olarak sözleşmeyi dağıtın.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

İşlem düğüm tarafından kabul edilir ve bir işlem hash'i döndürülür. Bu hash, işlemi izlemek için kullanılabilir. Bir sonraki adım, sözleşmemizin dağıtıldığı adresi belirlemektir. Yürütülen her işlem bir makbuz oluşturacaktır. Bu makbuz, işlemin hangi bloğa dahil edildiği ve EVM tarafından ne kadar gaz kullanıldığı gibi işlem hakkında çeşitli bilgiler içerir. Bir işlem bir sözleşme oluşturursa, sözleşme adresini de içerecektir. Makbuzu `eth_getTransactionReceipt` RPC yöntemiyle alabiliriz.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

Sözleşmemiz `0x4d03d617d700cf81935d7f797f4e2ae719648262` üzerinde oluşturuldu. Makbuz yerine boş (null) bir sonuç, işlemin henüz bir bloğa dahil edilmediği anlamına gelir. Bir süre bekleyin, fikir birliği istemcinizin çalışıp çalışmadığını kontrol edin ve yeniden deneyin.

#### Akıllı sözleşmelerle etkileşim kurmak {#interacting-with-smart-contract}

Bu örnekte, sözleşmenin `multiply` yöntemine `eth_sendTransaction` kullanarak bir işlem göndereceğiz.

`eth_sendTransaction` birkaç argüman gerektirir, özellikle `from`, `to` ve `data`. `From` hesabımızın genel adresidir ve `to` sözleşme adresidir. `data` argümanı, hangi yöntemin hangi argümanlarla çağrılması gerektiğini tanımlayan bir yük (payload) içerir. İşte bu noktada [ABI (uygulama ikili arayüzü)](https://docs.soliditylang.org/en/latest/abi-spec.html) devreye girer. ABI, EVM için verilerin nasıl tanımlanacağını ve kodlanacağını belirleyen bir JSON dosyasıdır.

Yükün baytları, sözleşmede hangi yöntemin çağrılacağını tanımlar. Bu, işlev adı ve argüman türleri üzerinden alınan Keccak hash'inin onaltılık (hex) olarak kodlanmış ilk 4 baytıdır. Çarpma (multiply) işlevi, uint256 için bir takma ad olan bir uint kabul eder. Bu bize şunu verir:

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

Bir sonraki adım argümanları kodlamaktır. Sadece bir tane uint256 vardır, diyelim ki 6 değeri. ABI'nin uint256 türlerinin nasıl kodlanacağını belirten bir bölümü vardır.

`int<M>: enc(X)`, X'in büyük uçlu (big-endian) ikiye tümleyen kodlamasıdır; uzunluğun 32 baytın katı olması için negatif X için yüksek dereceli (sol) tarafta 0xff ile ve pozitif X için sıfır baytlarıyla doldurulur.

Bu, `0000000000000000000000000000000000000000000000000000000000000006` olarak kodlanır.

İşlev seçiciyi ve kodlanmış argümanı birleştirdiğimizde verimiz `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006` olacaktır.

Bu artık düğüme gönderilebilir:

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

Bir işlem gönderildiği için bir işlem hash'i döndürüldü. Makbuzu almak şunu verir:

```javascript
{
   blockHash: "0xbf0a347307b8c63dd8c1d3d7cbdc0b463e6e7c9bf0a35be40393588242f01d55",
   blockNumber: 268,
   contractAddress: null,
   cumulativeGasUsed: 22631,
   gasUsed: 22631,
   logs: [{
      address: "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d",
      blockHash: "0xbf0a347307b8c63dd8c1d3d7cbdc0b463e6e7c9bf0a35be40393588242f01d55",
      blockNumber: 268,
      data: "0x000000000000000000000000000000000000000000000000000000000000002a",
      logIndex: 0,
      topics: ["0x24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"],
      transactionHash: "0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74",
      transactionIndex: 0
  }],
  transactionHash: "0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74",
  transactionIndex: 0
}
```

Makbuz bir günlük içerir. Bu günlük, işlem yürütülürken EVM tarafından oluşturulmuş ve makbuza dahil edilmiştir. `multiply` işlevi, `Print` olayının girdinin 7 katı ile tetiklendiğini gösterir. `Print` olayı için argüman bir uint256 olduğundan, onu ABI kurallarına göre çözebiliriz, bu da bize beklenen ondalık 42 değerini verecektir. Verilerin yanı sıra, günlüğü hangi olayın oluşturduğunu belirlemek için konuların (topics) kullanılabileceğini belirtmekte fayda var:

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

Bu, JSON-RPC'nin doğrudan kullanımını gösteren, en yaygın görevlerden bazılarına kısa bir girişti.

## İlgili konular {#related-topics}

- [JSON-RPC spesifikasyonu](http://www.jsonrpc.org/specification)
- [Düğümler ve istemciler](/developers/docs/nodes-and-clients/)
- [JavaScript API'leri](/developers/docs/apis/javascript/)
- [Arka uç API'leri](/developers/docs/apis/backend/)
- [Yürütme istemcileri](/developers/docs/nodes-and-clients/#execution-clients)