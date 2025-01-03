---
title: JSON-RPC API
description: Ethereum istemcileri için durum bilgisi olmayan, hafif bir uzaktan prosedür çağrısı (RPC) protokolü.
lang: tr
---

Bir yazılım uygulamasının Ethereum blok zinciriyle etkileşimde bulunabilmesi - blok zincir verilerini okuma ya da ağa işlemler gönderme yoluyla - bir Ethereum düğümüne bağlanmasını gerektirmektedir.

Bu amaçla, her [Ethereum müşterisi](/developers/docs/nodes-and-clients/#execution-clients), belirli bir düğüm veya istemci uygulamasından bağımsız olarak uygulamaların güvendikleri bir yöntem seti olması için bir [JSON-RPC özellikleri](https://github.com/ethereum/execution-apis) uygular.

[JSON-RPC](https://www.jsonrpc.org/specification) durumsuz, hafifliği özel bir uzaktan prosedür çağrısı (RPC) protokolüdür. Birkaç veri yapısını ve bunların işlenmesiyle ilgili kuralları tanımlar. Kavramların aynı süreç içinde, soketler üzerinden, HTTP üzerinden veya birçok farklı mesaj geçiş ortamında kullanılabilir olması açısından aktarımdan bağımsızdır. Veri formatı olarak JSON (RFC 4627) kullanır.

## İstemci uygulamaları {#client-implementations}

Ethereum istemcilerinin her biri, JSON-RPC şartnamesini uygularken farklı programlama dilleri kullanabilir. Belirli programlama dilleriyle ilgili daha fazla ayrıntı için [istemci belgelerine](/developers/docs/nodes-and-clients/#execution-clients) bakın. En güncel API destek bilgileri için her istemcinin belgelerini kontrol etmenizi öneririz.

## Kolaylık Kütüphaneleri {#convenience-libraries}

JSON-RPC API aracılığıyla Ethereum istemcileriyle doğrudan etkileşim kurmayı seçebilseniz de, dapp geliştiricileri için genellikle daha kolay seçenekler vardır. JSON-RPC API'sinin üzerinde paketleyiciler sağlamak için birçok [JavaScript](/developers/docs/apis/javascript/#available-libraries) ve [arka uç API'si](/developers/docs/apis/backend/#available-libraries) kütüphanesi bulunur. Bu kütüphanelerle geliştiriciler, Ethereum ile etkileşime giren JSON RPC taleplerini (arka planda) başlatmak için tercih ettikleri programlama dilinde sezgisel ve tek satırlı yöntemler yazabilirler.

## Fikir birliği istemci API'ları {#consensus-clients}

Bu sayfa, özellikle Ethereum yürütüm istemcileri tarafından kullanılan JSON-RPC API'sı ile ilgilidir. Ancak, fikir birliği istemcileri de kullanıcıların bir düğümden bilgi sorgulamasına, İşaret bloklarını, İşaret durumunu ve mutabakat ile ilgili diğer bilgileri direkt talep etmesine olanak veren bir RPC API'sına sahiptir. Bu API, [Beacon API web sayfasında](https://ethereum.github.io/beacon-APIs/#/) belgelenmiştir.

Bir düğüm içinde müşteri veya istemci arası iletişim için dahili bir API da kullanılır; - yani, bu fikir birliği istemcisinin ve yürütüm istemcisinin veri takas etmesini sağlar. Buna "Motor API'sı" denir ve özellikler [GitHub](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md)'da mevcuttur.

## Yürütüm istemcisi özellikleri {#spec}

[GitHub'da tam JSON-RPC API özelliklerini okuyun](https://github.com/ethereum/execution-apis). Bu API, [Yürütme API'si web sayfasında](https://ethereum.github.io/execution-apis/api-documentation/) belgelenmiştir ve mevcut tüm yöntemleri denemek için bir Denetçi içerir.

## Konvansiyonlar {#conventions}

### Onaltılık değer kodlaması {#hex-encoding}

JSON üzerinden iki temel veri türü geçirilir: biçimlendirilmemiş bayt dizileri ve miktarlar. Her ikisi de bir on altılı kodlamayla geçirilir, ancak biçimlendirme için farklı gereksinimler vardır.

#### Miktarlar {#quantities-encoding}

Miktarları (tamsayılar, sayılar) kodlarken: on altılı olarak kodlayın, önek "0x", en kompakt gösterim (küçük istisna: sıfır "0x0" olarak gösterilmelidir).

İşte bazı örnekler:

- 0x41 (ondalık olarak 65)
- 0x400 (ondalık olarak 1024)
- YANLIŞ: 0x (her zaman en az bir rakama sahip olmalıdır - sıfır "0x0" dır)
- YANLIŞ: 0x0400 (baştaki sıfırlara izin verilmez)
- YANLIŞ: ff (0x ön eki olmalıdır)

### Formatlanmamış bilgi {#unformatted-data-encoding}

Biçimlendirilmemiş verileri kodlarken (bayt dizileri, hesap adresleri, karmalar, bayt kodu dizileri): ön ek "0x" ile, bayt başına iki on altılık basamak ve on altılı olarak kodlayın.

İşte bazı örnekler:

- 0x41 (size 1, "A")
- 0x004200 (boyut 3, "0B0")
- 0x (size 0, "")
- YANLIŞ: 0xf0f0f (hane sayısı çift olmalıdır)
- YANLIŞ: 004200 (0x ön eki olmalıdır)

### Varsayılan blok parametresi {#default-block}

Aşağıdaki yöntemlerde fazladan bir varsayılan blok parametresi bulunur:

- [eth_getBalance](#eth_getbalance)
- [eth_getCode](#eth_getcode)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_call](#eth_call)

Ethereum durumuna göre hareket eden istekler yapıldığında, son varsayılan blok parametresi blokun yüksekliğini belirler.

DefaultBlock parametresi için aşağıdaki seçenekler mümkündür:

- `HEX String` - bir tamsayı blok numarası
- `String "earliest"` en erken/genesis bloğu için
- `String "latest"` - önerilen son blok için
- `"Güvenli" dizesi` - en son güvenli baş blok için
- `"Kesinleşmiş" dizesi` - kesinleşmiş en son blok için
- `"Bekleyen" dizesi` - bekleyen durum/işlemler için

## Örnekler

Bu sayfada, komut satırı aracı [curl](https://curl.se) kullanılarak ayrı ayrı JSON_RPC API uç noktalarının nasıl kullanılacağına ilişkin örnekler sunuyoruz. Bu ayrı uç nokta örnekleri, aşağıda [Kıvrılma örnekleri](#curl-examples) bölümünde bulunur. Sayfanın ilerleyen kısımlarında, Geth düğümü, JSON_RPC API ve kıvrılma kullanarak akıllı bir sözleşme derlemek ve dağıtmak için [uçtan uca bir örnek](#usage-example) de sağlıyoruz.

## Kıvrılma örnekleri {#curl-examples}

Bir Ethereum düğümüne [curl](https://curl.se) istekleri yaparak JSON_RPC API'sını kullanma örnekleri aşağıda verilmiştir. Her örnek belirli uç noktanın bir tanımını, parametrelerini, dönüş türünü ve nasıl kullanılması gerektiğine dair çalışılmış bir örneği içerir.

Kıvrılma istekleri, içerik türüyle ilgili bir hata mesajı döndürebilir. Bunun nedeni, `--data` seçeneğinin içerik türünü `application/x-www-form-urlencoded` olarak ayarlamasıdır. Düğümünüz bundan şikâyet ederse, aramanın başına `-H "Content-Type: application/json"` koyarak başlığı manuel olarak ayarlayın. Örnekler ayrıca kıvrılma için verilen son argüman olması gereken URL/IP ve bağlantı noktası kombinasyonunu içermez. (ör. `127.0.0.1:8545`). Bu ek verileri içeren eksiksiz bir kıvrılma isteği aşağıdaki formu alır:

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## Dedikodu, Durum, Geçiş {#gossip-state-history}

Bir avuç temel JSON-RPC yöntemi, Ethereum ağından veri gerektirir ve düzgün bir şekilde üç ana kategoriye ayrılır: _Dedikodu, Durum ve Geçmiş_. Her bir yönteme atlamak için bu bölümlerdeki bağlantıları kullanın veya tüm yöntemler listesini keşfetmek için içindekiler tablosunu kullanın.

### Dedikodu Yöntemleri {#gossip-methods}

> Bu yöntemler zincirin başını izler. Bu, işlemlerin ağ etrafında nasıl dolaştığını, blokların içinde nasıl yer bulduğunu ve istemcilerin yeni bloklar hakkında nasıl bilgi sahibi olduğunu gösterir.

- [eth_blockNumber](#eth_blocknumber)
- [eth_sendRawTransaction](#eth_sendrawtransaction)

### Durum Yöntemleri {#state_methods}

> Depolanan tüm verinin mevcut durumunu raporlayan yöntemlerdir. "Durum" RAM'nin paylaşımlı, büyük tek bir parçası gibidir ve hesap bakiyelerini, sözleşme verilerini ve gaz tahminlerini içerir.

- [eth_getBalance](#eth_getbalance)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getCode](#eth_getcode)
- [eth_call](#eth_call)
- [eth_estimateGas](#eth_estimategas)

### Geçmiş Yöntemleri {#history_methods}

> Başlangıça kadar her blokun geçmiş kayıtlarını alır. Bu tek büyük sadece ekleme yapılabilen bir dosya gibidir ve tüm blok başlıklarını, blok gövdelerini, amca bloklarını ve işlem makbuzlarını içerir.

- [eth_getBlockTransactionCountByHash](#eth_getblocktransactioncountbyhash)
- [eth_getBlockTransactionCountByNumber](#eth_getblocktransactioncountbynumber)
- [eth_getUncleCountByBlockHash](#eth_getunclecountbyblockhash)
- [eth_getUncleCountByBlockNumber](#eth_getunclecountbyblocknumber)
- [eth_getBlockByHash](#eth_getblockbyhash)
- [eth_getBlockByNumber](#eth_getblockbynumber)
- [eth_getTransactionByHash](#eth_gettransactionbyhash)
- [eth_getTransactionByBlockHashAndIndex](#eth_gettransactionbyblockhashandindex)
- [eth_getTransactionByBlockNumberAndIndex](#eth_gettransactionbyblocknumberandindex)
- [eth_getTransactionReceipt](#eth_gettransactionreceipt)
- [eth_getUncleByBlockHashAndIndex](#eth_getunclebyblockhashandindex)
- [eth_getUncleByBlockNumberAndIndex](#eth_getunclebyblocknumberandindex)

## JSON-RPC API Deneme Alanı

API yöntemlerini denemek ve yeni yöntemler keşfetmek için [deneme alanı aracını](https://ethereum-json-rpc.com) kullanabilirsiniz. Ayrıca, çeşitli düğüm sağlayıcıları tarafından hangi yöntemlerin ve ağların desteklendiğini de gösterir.

## JSON-RPC API Yöntemleri {#json-rpc-methods}

### web3_clientVersion {#web3_clientversion}

Geçerli istemci sürümünü döndürür.

**Parametreler**

Hiçbiri

**Dönüşler**

`String` - Geçerli istemci sürümü

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Geth/v1.12.1-stable/linux-amd64/go1.19.1"
}
```

### web3_sha3 {#web3_sha3}

Verilen verilerin Keccak-256'sını (standartlaştırılmış SHA3-256 _olmayan_) döndürür.

**Parametreler**

1. `DATA` - SHA3 karmasına dönüştürülecek veriler

```js
params: ["0x68656c6c6f20776f726c64"]
```

**Dönüşler**

`DATA` - Verilen dizenin SHA3 sonucu.

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
// Result
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

### net_version {#net_version}

Geçerli ağ kimliğini döndürür.

**Parametreler**

Hiçbiri

**Dönüşler**

`String` - Geçerli ağ kimliği.

Mevcut ağ kimliklerinin tam listesi [chainlist.org](https://chainlist.org) adresinde bulunabilir. Bazı yaygın olanları:

- `1`: Ethereum Ana Ağı
- `5`: Goerli test ağı
- `11155111`: Sepolia test ağı

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "3"
}
```

### net_listening {#net_listening}

İstemci aktif olarak ağ bağlantılarını dinliyorsa `true` değerini döndürür.

**Parametreler**

Hiçbiri

**Dönüşler**

`Boolean` - Dinlerken `true`, aksi takdirde `false`.

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

### net_peerCount {#net_peercount}

Şu anda istemciye bağlı olan eşlerin sayısını döndürür.

**Parametreler**

Hiçbiri

**Dönüşler**

`QUANTITY` - bağlı eşlerin sayısının tam sayısı.

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'
// Result
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2
}
```

### eth_protocolVersion {#eth_protocolversion}

Geçerli Ethereum protokol sürümünü döndürür. Bu yöntemin [Geth'de mevcut olmadığını](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924) aklınızda tutun.

**Parametreler**

Hiçbiri

**Dönüşler**

`String` - Geçerli Ethereum protokolü sürümü

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "54"
}
```

### eth_syncing {#eth_syncing}

Senkronizasyon durumu veya `false` ile ilgili verileri içeren bir nesne döndürür.

**Parametreler**

Hiçbiri

**Dönüşler**

Kesin dönüş verileri, istemci uygulamaları arasında farklılık gösterir. Tüm istemciler düğüm eşitlenmediğinde `False` değerini döndürür aynı zamanda da tüm istemciler aşağıdaki alanları döndürür.

`Nesne|Boolean`, Senkronizasyon durumu verisi olan veya senkronize edilmediğinde `FALSE` olan bir nesne:

- `startingBlock`: `QUANTITY` - İçe aktarmanın başladığı blok (yalnızca senkronizasyon kafasına ulaştıktan sonra sıfırlanır)
- `currentBlock`: `QUANTITY` - Geçerli blok, eth_blockNumber ile aynı
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

Oysa Besu bunları döndürür:

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

Daha fazla ayrıntı için bakmak istediğiniz spesifik istemcinin dokümanlarına göz atın.

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
    startingBlock: '0x384',
    currentBlock: '0x386',
    highestBlock: '0x454'
  }
}
// Or when not syncing
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth_coinbase}

İstemci para tabanı adresini döndürür.

**Parametreler**

Hiçbiri

**Dönüşler**

`DATA`, 20 bayt - mevcut para tabanı adresi.

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'
// Result
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
}
```

### eth_chainId {#eth_chainId}

Tekrardan korumalı işlemleri imzalamak için kullanılan zincir kimliğini döndürür.

**Parametreler**

Hiçbiri

**Dönüşler**

`chainId`, mevcut zincir kimliğinin sayısal değerini temsil eden metin olarak on altılı değer.

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x1"
}
```

### eth_mining {#eth_mining}

İstemci aktif olarak yeni bloklar basıyorsa `true` değerini döndürür. Bu, yalnızca iş ispatı kullanan ağlar için `true` değerini döndürebilir ancak [Birleşim](/roadmap/merge/) gerçekleştiğinden beri bazı istemcilerde kullanılamıyor olabilir.

**Parametreler**

Hiçbiri

**Dönüşler**

`Boolean` - istemcinin madencilik yaptığı `true` değerini, aksi takdirde `false` değerini döndürür.

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'
//
{
  "id":71,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_hashrate {#eth_hashrate}

Düğümün madencilik yaptığı saniye başına karma sayısını döndürür. Bu, yalnızca iş ispatı kullanan ağlar için `true` değerini döndürebilir ancak [Birleşim](/roadmap/merge/) gerçekleştiğinden beri bazı istemcilerde kullanılamıyor olabilir.

**Parametreler**

Hiçbiri

**Dönüşler**

`QUANTITY` - saniyedeki karma sayısı.

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71}'
// Result
{
  "id":71,
  "jsonrpc": "2.0",
  "result": "0x38a"
}
```

### eth_gasPrice {#eth_gasprice}

Wei cinsinden gaz başına mevcut fiyatın bir tahminini döndürür. Örneğin, Besu istemcisi son 100 bloğu inceler ve varsayılan medyan gaz birim fiyatını döndürür.

**Parametreler**

Hiçbiri

**Dönüşler**

`QUANTITY` - wei cinsinden mevcut gaz fiyatının tam sayısıdır.

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
// Result
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x1dfd14000" // 8049999872 Wei
}
```

### eth_accounts {#eth_accounts}

İstemcinin sahip olduğu adreslerin listesini döndürür.

**Parametreler**

Hiçbiri

**Dönüşler**

`Array of DATA`, 20 Bayt, istemciye ait adresler.

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}
```

### eth_blockNumber {#eth_blocknumber}

En son bloğun numarasını döndürür.

**Parametreler**

Hiçbiri

**Dönüşler**

`QUANTITY` - istemcinin açık olduğu mevcut blok numarasının tam sayısıdır.

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
// Result
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0x4b7" // 1207
}
```

### eth_getBalance {#eth_getbalance}

Verilen adresin hesabının bakiyesini döndürür.

**Parametreler**

1. `DATA`, 20 Bayt - bakiye için bakılması gereken adres.
2. `QUANTITY|TAG` - tamsayı blok numarası veya `"latest"`,`"earliest"`,`"pending"`,`"safe"` veya `"finalized"` dizesi, [default block parameter](/developers/docs/apis/json-rpc/#default-block) kısmına göz atabilirsiniz

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**Dönüşler**

`QUANTITY` - mevcut bakiyenin wei cinsinden tam sayısıdır.

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

### eth_getStorageAt {#eth_getstorageat}

Belirli bir adresteki bir depolama konumundan değeri döndürür.

**Parametreler**

1. `DATA`, 20 Bayt - depolamanın adresi.
2. `QUANTITY` - depolamadaki pozisyonun sayısı.
3. `QUANTITY|TAG`- tamsayı blok numarası veya `"latest"`,`"earliest"`,`"pending"`,`"safe"` veya `"finalized"` dizesi, [default block parameter](/developers/docs/apis/json-rpc/#default-block) kısmına göz atabilirsiniz

**Dönüşler**

`DATA` - bu depolama konumundaki değerdir.

**Örnek** Doğru konumun hesaplanması, alınacak depolamaya bağlıdır. `0x295a70b2de5e3953354a6a8344e616ed314d7251`, `0x391694e7e0b0cce554cb130d723a9d27458f9298` adresinde dağıtılan aşağıdaki sözleşmeyi dikkate alın.

```
contract Storage {
    uint pos0;
    mapping(address => uint) pos1;
    function Storage() {
        pos0 = 1234;
        pos1[msg.sender] = 5678;
    }
}
```

Pos0 değerini almak basittir:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

Haritanın bir öğesini almak daha zordur. Bir elemanın haritadaki konumu şu şekilde hesaplanır:

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

Web3 kütüphanesi ile birlikte gelen geth konsolu, hesaplama yapmak için kullanılabilir:

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Şimdi depolamayı almak için:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### eth_getTransactionCount {#eth_gettransactioncount}

Bir adresten _gönderilen_ işlem sayısını döndürür.

**Parametreler**

1. `DATA`, 20 Bayt - adres.
2. `QUANTITY|TAG`- tamsayı blok numarası veya `"latest"`,`earliest"`,`"pending"`,`"safe"` veya `"finalized"` dizesi, [default block parameter](/developers/docs/apis/json-rpc/#default-block) kısmına göz atabilirsiniz

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // state at the latest block
]
```

**Dönüşler**

`QUANTITY` - bu adresten gönderilen işlem sayısının tamsayısıdır.

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1","latest"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getBlockTransactionCountByHash {#eth_getblocktransactioncountbyhash}

Verilen blok karması ile eşleşen bir bloktaki işlem sayısını döndürür.

**Parametreler**

1. `DATA`, 32 Bayt - bir blokun karması

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**Dönüşler**

`QUANTITY` - bu bloktaki işlem sayısının tamsayısıdır.

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getBlockTransactionCountByNumber {#eth_getblocktransactioncountbynumber}

Verilen blok numarasıyla eşleşen bloktaki işlem sayısını döndürür.

**Parametreler**

1. `QUANTITY|TAG`- tamsayı blok numarası veya `"latest"`,`earliest"`,`"pending"`,`"safe"` veya `"finalized"` dizesi, [default block parameter](/developers/docs/apis/json-rpc/#default-block) kısmına göz atabilirsiniz.

```js
params: [
  "0x13738ca", // 20396234
]
```

**Dönüşler**

`QUANTITY` - bu bloktaki işlem sayısının tamsayısıdır.

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0x13738ca"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getUncleCountByBlockHash {#eth_getunclecountbyblockhash}

Verilen blok karması ile eşleşen bir bloktaki amcaların sayısını döndürür.

**Parametreler**

1. `VERİ`, 32 Bayt - bir bloğun karması

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**Dönüşler**

`QUANTITY` - bu bloktaki amcaların sayısının tamsayısıdır.

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getUncleCountByBlockNumber {#eth_getunclecountbyblocknumber}

Verilen blok numarası ile eşleşen bir bloktan olan bir bloktaki amcaların sayısını döndürür.

**Parametreler**

1. `QUANTITY|TAG`- tamsayı blok numarası veya `"latest"`,`earliest"`,`"pending"`,`"safe"` veya `"finalized"` dizesi, [default block parameter](/developers/docs/apis/json-rpc/#default-block) kısmına göz atabilirsiniz

```js
params: [
  "0xe8", // 232
]
```

**Dönüşler**

`QUANTITY` - bu bloktaki amcaların sayısının tamsayısıdır.

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0" // 0
}
```

### eth_getCode {#eth_getcode}

Belirli bir adreste kod döndürür.

**Parametreler**

1. `DATA`, 20 Bayt - adres
2. `QUANTITY|TAG`- tamsayı blok numarası veya `"latest"`,`earliest"`,`"pending"`,`"safe"` veya `"finalized"` dizesi, [default block parameter](/developers/docs/apis/json-rpc/#default-block) kısmına göz atabilirsiniz

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**Dönüşler**

`DATA` - verilen adresten gelen kod.

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0x5daf3b"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x6060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b9578063095ea7b31461014757806318160ddd146101a157806323b872dd146101ca5780632e1a7d4d14610243578063313ce5671461026657806370a082311461029557806395d89b41146102e2578063a9059cbb14610370578063d0e30db0146103ca578063dd62ed3e146103d4575b6100b7610440565b005b34156100c457600080fd5b6100cc6104dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010c5780820151818401526020810190506100f1565b50505050905090810190601f1680156101395780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561015257600080fd5b610187600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061057b565b604051808215151515815260200191505060405180910390f35b34156101ac57600080fd5b6101b461066d565b6040518082815260200191505060405180910390f35b34156101d557600080fd5b610229600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061068c565b604051808215151515815260200191505060405180910390f35b341561024e57600080fd5b61026460048080359060200190919050506109d9565b005b341561027157600080fd5b610279610b05565b604051808260ff1660ff16815260200191505060405180910390f35b34156102a057600080fd5b6102cc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b18565b6040518082815260200191505060405180910390f35b34156102ed57600080fd5b6102f5610b30565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561033557808201518184015260208101905061031a565b50505050905090810190601f1680156103625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561037b57600080fd5b6103b0600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610bce565b604051808215151515815260200191505060405180910390f35b6103d2610440565b005b34156103df57600080fd5b61042a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610be3565b6040518082815260200191505060405180910390f35b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a2565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105735780601f1061054857610100808354040283529160200191610573565b820191906000526020600020905b81548152906001019060200180831161055657829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b600081600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515156106dc57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141580156107b457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b156108cf5781600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561084457600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a2757600080fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610ab457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65826040518082815260200191505060405180910390a250565b600260009054906101000a900460ff1681565b60036020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bc65780601f10610b9b57610100808354040283529160200191610bc6565b820191906000526020600020905b815481529060010190602001808311610ba957829003601f168201915b505050505081565b6000610bdb33848461068c565b905092915050565b60046020528160005260406000206020528060005260406000206000915091505054815600a165627a7a72305820deb4c2ccab3c2fdca32ab3f46728389c2fe2c165d5fafa07661e4e004f6c344a0029"
}
```

### eth_sign {#eth_sign}

İmza yöntemi, Ethereum'a özel bir imzayı şu şekilde hesaplar: `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`.

Mesaja bir önek ekleyerek hesaplanan imzanın Ethereum'a özel bir imza olarak tanınmasını sağlar. Bu, kötü niyetli bir merkeziyetsiz uygulamanın keyfi verileri imzalayabildiği (ör. işlem) ve imzayı kurbanın kimliğine bürünmek için kullandığı durumlarda kötüye kullanımı önler.

Not: İmzalanacak adresin kilidi açık olmalıdır.

**Parametreler**

1. `VERİ`, 20 Bayt - adres
2. `DATA`, N Bayt - imzalanacak mesaj

**Dönüşler**

`DATA`: İmza

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_signTransaction {#eth_signtransaction}

[eth_sendRawTransaction](#eth_sendrawtransaction) ile kullanılarak daha sonra ağa gönderilebilecek bir işlemi imzalar.

**Parametreler**

1. `Object` - İşlem nesnesi

- `type`:
- `from`: `DATA`, 20 Bayt - İşlemin gönderildiği adres.
- `to`: `DATA`, 20 Bayt - (yeni sözleşme oluştururken isteğe bağlı) İşlemin yönlendirildiği adres.
- `gas`: `QUANTITY` - (isteğe bağlı, varsayılan: 90000) İşlemin yürütülmesi için sağlanan gazın tam sayısı. Kullanılmayan gazı geri verecektir.
- `gasPrice`: `QUANTITY` - (isteğe bağlı, varsayılan: Belirlenecek) Wei'de her ücretli gaz için kullanılan gasPrice'ın tamsayısıdır.
- `value`: `QUANTITY` - (isteğe bağlı) Wei cinsinden bu işlemle gönderilen değerin tamsayısıdır.
- `data`: `DATA` - Bir sözleşmenin derlenmiş kodu VEYA çağrılan yöntem imzasının ve kodlanmış parametrelerin karması.
- `nonce`: `QUANTITY` - (isteğe bağlı) nonce tam sayısı. Bu, aynı nonce'yi kullanan kendi bekleyen işlemlerinizin üzerine yazmanıza izin verir.

**Dönüşler**

`DATA`, Belirtilen hesap tarafından imzalanan RLP kodlu işlem nesnesidir.

**Örnek**

```js
// Request
curl -X POST --data '{"id": 1,"jsonrpc": "2.0","method": "eth_signTransaction","params": [{"data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","gas": "0x76c0","gasPrice": "0x9184e72a000","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","value": "0x9184e72a"}]}'
// Result
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_sendTransaction {#eth_sendtransaction}

Veri alanı kod içeriyorsa, yeni bir mesaj çağrı işlemi veya sözleşme oluşturma işlemi oluşturur ve `from` alanında belirtilen hesabı kullanarak imzalar.

**Parametreler**

1. `Object` - İşlem nesnesi

- `from`: `DATA`, 20 Bayt - İşlemin gönderildiği adres.
- `to`: `DATA`, 20 Bayt - (yeni sözleşme oluştururken isteğe bağlı) İşlemin yönlendirildiği adres.
- `gas`: `QUANTITY` - (isteğe bağlı, varsayılan: 90000) İşlemin yürütülmesi için sağlanan gazın tam sayısı. Kullanılmayan gazı geri verecektir.
- `gasPrice`: `QUANTITY` - (isteğe bağlı, varsayılan: Belirlenecek) Ücretli her gaz için kullanılan gasPrice'ın tam sayısı.
- `değer`: `QUANTITY` - (isteğe bağlı) Bu işlemle gönderilen değerin tam sayısı.
- `input`: `DATA` - Bir sözleşmenin derlenmiş kodu VEYA çağrılan yöntem imzasının ve kodlanmış parametrelerin karmasıdır.
- `nonce`: `QUANTITY` - (isteğe bağlı) nonce tam sayısı. Bu, aynı nonce'yi kullanan kendi bekleyen işlemlerinizin üzerine yazmanıza izin verir.

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

**Dönüşler**

`DATA`, 32 Bayt - işlem karması veya işlem henüz mevcut değilse sıfır karma.

Bir sözleşme oluşturduğunuzda, işlem bir blokta önerildikten sonra sözleşme adresini almak için [eth_getTransactionReceipt](#eth_gettransactionreceipt) öğesini kullanın.

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_sendRawTransaction {#eth_sendrawtransaction}

İmzalı işlemler için yeni mesaj arama işlemi veya sözleşme oluşturma gerçekleşir.

**Parametreler**

1. `DATA`, İmzalanmış işlem verisi.

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**Dönüşler**

`DATA`, 32 Bayt - işlem karması veya işlem henüz mevcut değilse sıfır karma.

Bir sözleşme oluşturduğunuzda, işlem bir blokta önerildikten sonra sözleşme adresini almak için [eth_getTransactionReceipt](#eth_gettransactionreceipt) öğesini kullanın.

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_call {#eth_call}

Blokzincirde bir işlem oluşturmadan hemen yeni bir mesaj çağrısı yürütür. Genellikle yalnızca okuma işlemi yapan akıllı sözleşme fonksiyonlarını çalıştırmak için kullanılır, örneğin bir ERC-20 sözleşmesi için `balanceOf` fonksiyonu.

**Parametreler**

1. `Object` - İşlem çağrısı nesnesi

- `from`: `DATA`, 20 Bayt - (isteğe bağlı) İşlemin gönderildiği adres.
- `to`: `DATA`, 20 Bayt - İşlemin yönlendirildiği adres.
- `gas`: `QUANTITY` - (isteğe bağlı) İşlemin yürütülmesi için sağlanan gazın tam sayısı. eth_call sıfır gaz tüketir, ancak bazı uygulamalarda bu parametreye ihtiyaç duyulabilir.
- `gasPrice`: `QUANTITY` - (isteğe bağlı) Ücretli her gaz için kullanılan gasPrice'ın tam sayısı
- `değer`: `QUANTITY` - (isteğe bağlı) Bu işlemle gönderilen değerin tam sayısı
- `input`: `DATA` - (isteğe bağlı) Yöntem imzasının ve kodlanmış parametrelerin karmasıdır. Ayrıntılar için [Solidity dokümanlarındaki Ethereum Sözleşmesi ABI'sine bakın](https://docs.soliditylang.org/en/latest/abi-spec.html).

2. `QUANTITY|TAG`- tamsayı blok numarası veya `"latest"`,`earliest"`,`"pending"`,`"safe"` veya `"finalized"` dizesi, [default block parameter](/developers/docs/apis/json-rpc/#default-block) kısmına göz atabilirsiniz

**Dönüşler**

`DATA` - yürütülen sözleşmenin dönüş değeridir.

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

### eth_estimateGas {#eth_estimategas}

İşlemin tamamlanmasına izin vermek için ne kadar gazın gerekli olduğuna dair bir tahmin oluşturur ve döndürür. İşlem, blokzincire eklenmez. Tahminin, ESM mekaniği ve düğüm performansı dahil olmak üzere çeşitli nedenlerle işlem tarafından fiilen kullanılan gaz miktarından önemli ölçüde daha fazla olabileceğini unutmayın.

**Parametreler**

[eth_call](#eth_call) parametrelerine bakın, tüm seçeneklerin isteğe bağlı olması hariç. Gaz limiti belirtilmemişse geth, bekleyen bloktan gelen blok gaz limitini üst sınır olarak kullanır. Sonuç olarak, gaz miktarı bekleyen blok gaz limitinden daha yüksek olduğunda, döndürülen tahmin çağrıyı/işlemi gerçekleştirmek için yeterli olmayabilir.

**Dönüşler**

`QUANTITY` - kullanılan gaz miktarıdır.

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

### eth_getBlockByHash {#eth_getblockbyhash}

Karma ile bir blok hakkında bilgi döndürür.

**Parametreler**

1. `DATA`, 32 Bayt - bir blokun şifresi.
2. `Boolean` - `true` ise tam işlem nesnelerini döndürür, `false` ise yalnızca işlemlerin karmalarını döndürür.

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**Dönüşler**

`Object` - Bir blok nesnesi veya blok bulunamadığında `null`:

- `number`: `QUANTITY` - blok numarası. `null` Bekleyen blok olduğunda.
- `hash`: `DATA`, 32 Bayt - blokun özeti. `null` Bekleyen blok olduğunda.
- `parentHash`: `DATA`, 32 Bayt - ana blokun karması.
- `nonce`: `DATA`, 8 Bayt - oluşturulan iş ispatının karması. `null` Bekleyen blok olduğunda.
- `sha3Uncles`: `DATA`, 32 Bayt - bloktaki amca verilerinin SHA3'ü.
- `logsBloom`: `DATA`, 256 Bayt - blokun günlükleri için çiçek filtresi. `null` Bekleyen blok olduğunda.
- `transactionsRoot`: `DATA`, 32 Bayt - blokun işlem denemesinin kökü.
- `stateRoot`: `DATA`, 32 Bayt - blokun son durum denemesinin kökü.
- `receiptsRoot`: `DATA`, 32 Bayt - blokun makbuz denemesinin kökü.
- `madenci`: `DATA`, 20 Bayt - madencilik ödüllerinin verildiği yararlanıcının adresi.
- `difficulty`: `QUANTITY` - bu blok için zorluğun tam sayısı.
- `totalDifficulty`: `QUANTITY` - bu bloka kadar zincirin toplam zorluğunun tam sayısı.
- `extraData`: `DATA` - bu blokun "ekstra veri" alanı.
- `size`: `QUANTITY` - bu blokun bayt cinsinden boyutunun tam sayısı.
- `gasLimit`: `QUANTITY` - bu blokta izin verilen maksimum gaz.
- `GasUsed`: `QUANTITY` - bu bloktaki tüm işlemler tarafından kullanılan toplam gaz.
- `timestamp`: `QUANTITY` - blokun harmanlandığı zamana ilişkin unix zaman damgası.
- `transactions`: `Array` - Son verilen parametreye bağlı olarak işlem nesneleri dizisi veya 32 Bayt işlem karmaları.
- `uncles`: `Array` - Amca karmaları dizisi.

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae", false],"id":1}'
// Result
{
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

### eth_getBlockByNumber {#eth_getblockbynumber}

Blok numarasına göre bir blok hakkında bilgi döndürür.

**Parametreler**

1. `QUANTITY|TAG`- tamsayı blok numarası veya `"latest"`,`earliest"`,`"pending"`,`"safe"` veya `"finalized"` dizesi, [default block parameter](/developers/docs/apis/json-rpc/#default-block) kısmına göz atabilirsiniz.
2. `Boolean` - `true` ise tam işlem nesnelerini döndürür, `false` ise yalnızca işlemlerin karmalarını döndürür.

```js
params: [
  "0x1b4", // 436
  true,
]
```

**İadeler** Bkz. [eth_getBlockByHash](#eth_getblockbyhash)

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

Sonuç bkz. [eth_getBlockByHash](#eth_getblockbyhash)

### eth_getTransactionByHash {#eth_gettransactionbyhash}

İşlem karması tarafından istenen bir işlem hakkındaki bilgileri döndürür.

**Parametreler**

1. `DATA`, 32 Bayt - bir işlemin özeti

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**Dönüşler**

`Object` - Bir işlem nesnesi veya işlem bulunamadığında `null`:

- `blockHash`: `DATA`, 32 Bayt - bu işlemin yapıldığı blokun karması. `null` beklediğinde.
- `blockNumber`: `QUANTITY` - bu işlemin yapıldığı blok numarası. `null` beklediğinde.
- `from`: `DATA`, 20 Bayt - gönderenin adresi.
- `gas`: `QUANTITY` - gönderen tarafından sağlanan gaz.
- `gasPrice`: `QUANTITY` - Wei'de gönderen tarafından sağlanan gaz fiyatı.
- `hash`: `DATA`, 32 Bayt - işlemin özeti.
- `input`: `DATA` - işlemle birlikte gönderilen veriler.
- `nonce`: `QUANTITY` - göndericinin bundan önce yaptığı işlem sayısı.
- `to`: `DATA`, 20 Bayt - alıcının adresi. `null` bir sözleşme oluşturma işlemi olduğunda.
- `transactionIndex`: `QUANTITY` - bloktaki işlem endeksi pozisyonunun tam sayısı. `null` beklediğinde.
- `value`: `QUANTITY` - Wei'de aktarılan değer.
- `v`: `QUANTITY` - ECDSA kurtarma kimliği
- `r`: `QUANTITY` - ECDSA imzası r
- `r`: `QUANTITY` - ECDSA imzası s

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"],"id":1}'
// Result
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

### eth_getTransactionByBlockHashAndIndex {#eth_gettransactionbyblockhashandindex}

Blok karması ve işlem dizini konumuna göre bir işlem hakkındaki bilgileri döndürür.

**Parametreler**

1. `DATA`, 32 Bayt - bir blokun karması.
2. `QUANTITY` - işlem endeks pozisyonunun sayısı.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Dönüşler** Bkz. [eth_getTransactionByHash](#eth_gettransactionbyhash)

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Sonuç bkz. [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionByBlockNumberAndIndex {#eth_gettransactionbyblocknumberandindex}

Blok numarasına ve işlem dizini konumuna göre bir işlem hakkında bilgi döndürür.

**Parametreler**

1. `QUANTITY|TAG`- tamsayı blok numarası veya `"earliest"`,`"latest""`,`"pending"`,`"safe"` veya `"finalized"` dizesi, [default block parameter](/developers/docs/apis/json-rpc/#default-block) kısmına göz atabilirsiniz.
2. `QUANTITY` - işlem endeks pozisyonu.

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**Dönüşler** Bkz. [eth_getTransactionByHash](#eth_gettransactionbyhash)

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

Sonuç bkz. [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionReceipt {#eth_gettransactionreceipt}

İşlem karmasına göre bir işlemin makbuzunu döndürür.

**Not** Makbuzun bekleyen işlemler için mevcut olmadığına dikkat edin.

**Parametreler**

1. `VERİ`, 32 Bayt - bir işlemin özeti

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**Dönüşler** `Object` - Bir işlem makbuzu nesnesi veya makbuz bulunamadığında `null`:

- `transactionHash`: `DATA`, 32 Bayt - işlemin özeti.
- `transactionIndex`: `QUANTITY` - bloktaki işlem endeksi pozisyonunun tam sayısı.
- `blockHash`: `DATA`, 32 Bayt - bu işlemin yapıldığı blokun karması.
- `blockNumber`: `QUANTITY` - bu işlemin yapıldığı blok numarası.
- `from`: `DATA`, 20 Bayt - gönderenin adresi.
- `to`: `DATA`, 20 Bayt - alıcının adresi. bir sözleşme oluşturma işlemi olduğunda null.
- `cumulativeGasUsed` : `QUANTITY` - Bu işlem blokta yürütüldüğünde kullanılan toplam gaz miktarı.
- `effectiveGasPrice` : `QUANTITY` - Ana ücretin ve gaz birimi başına ödenen bahşişin toplamı.
- `GasUsed`: `QUANTITY` - Yalnızca bu özel işlem tarafından kullanılan gaz miktarı.
- `contractAddress`: `DATA`, 20 Bayt - İşlem bir sözleşme oluşturma ise, oluşturulan sözleşme adresi, aksi takdirde `null`.
- `logs`: `Array` - Bu işlemin oluşturduğu günlük nesneleri dizisi.
- `logsBloom`: `DATA`, 256 Bayt - Hafif istemcilerin ilgili günlükleri hızlı bir şekilde alması için çiçek filtresi.
- `type`: `QUANTITY` - işlem türünün tam sayısı, eski tarz işlemler için `0x0`, erişim listesi türleri için `0x1`, değişken ücretler için `0x2`.

Ayrıca _her ikisinden birini_ döndürür:

- `root` : `DATA` 32 bayt işlem sonrası durum kökü (Bizans öncesi)
- `status`: `QUANTITY` ya `1` (başarılı) veya `0` (başarısız)

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"],"id":1}'
// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash":
      "0xa957d47df264a31badc3ae823e10ac1d444b098d9b73d204c40426e57f47e8c3",
    "blockNumber": "0xeff35f",
    "contractAddress": null, // string of the address if it was created
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // logs as returned by getFilterLogs, etc.
    }],
    "logsBloom": "0x00...0", // 256 byte bloom filter
    "status": "0x1",
    "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "transactionHash":
      "0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5",
    "transactionIndex": "0x66",
    "type": "0x2"
  }
}
```

### eth_getUncleByBlockHashAndIndex {#eth_getunclebyblockhashandindex}

Karma ve amca dizin konumuna göre bir bloğun amcası hakkında bilgi verir.

**Parametreler**

1. `DATA`, 32 Bayt - Bir blokun şifresi.
2. `QUANTITY` - Amcanın endeks pozisyonu.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**İadeler** Bkz. [eth_getBlockByHash](#eth_getblockbyhash)

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Sonuç bkz. [eth_getBlockByHash](#eth_getblockbyhash)

**Not**: Bir amca, bireysel işlemler içermez.

### eth_getUncleByBlockNumberAndIndex {#eth_getunclebyblocknumberandindex}

Sayıya ve amca dizin konumuna göre bir bloğun amcası hakkında bilgi verir.

**Parametreler**

1. `QUANTITY|TAG`- tamsayı blok numarası veya `"earliest"`,`"latest""`,`"pending"`,`"safe"`, `"finalized"` dizesi, [default block parameter](/developers/docs/apis/json-rpc/#default-block) kısmına göz atabilirsiniz.
2. `QUANTITY` - amcanın endeks pozisyonu.

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**İadeler** Bkz. [eth_getBlockByHash](#eth_getblockbyhash)

**Not**: Bir amca, bireysel işlemler içermez.

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

Sonuç bkz. [eth_getBlockByHash](#eth_getblockbyhash)

### eth_newFilter {#eth_newfilter}

Durum değiştiğinde (günlükler) bildirimde bulunmak için filtre seçeneklerine dayalı olarak bir filtre nesnesi oluşturur. Durumun değişip değişmediğini kontrol etmek için [eth_getFilterChanges](#eth_getfilterchanges)'i arayın.

**Konu filtrelerinin belirlenmesiyle ilgili bir not:** Konular sıraya bağlıdır. [A, B] konularına sahip günlük içeren bir işlem, aşağıdaki konu filtreleriyle eşleştirilecektir:

- `[]` "herhangi bir şey"
- `[A]` "A birinci konumda (ve sonraki herhangi bir şey)"
- `[null, B]` "birinci konumdaki herhangi bir şey VE ikinci konumdaki B (ve sonraki herhangi bir şey)"
- `[A, B]` "A birinci konumda VE B ikinci konumda (ve sonraki herhangi bir şey)"
- `[[A, B], [A, B]]` "(A VEYA B) birinci konumda VE (A VEYA B) ikinci konumda (ve sonraki herhangi bir şey)"
- **Parametreler**

1. `Object` - Filtre seçenekleri:

- `fromBlock`: `QUANTITY|TAG` - (isteğe bağlı, default: `"latest"`) Tamsayı blok numarası veya son önerilen blok için `"latest"`, en son güvenli blok için `"safe"`, en son sonlandırılmış blok için `"finalized"`, henüz bir blokta olmayan işlemler için `"pending"` ve `"earliest"`.
- `toBlock`: `QUANTITY|TAG` - (isteğe bağlı, default: `"latest"`) Tamsayı blok numarası veya son önerilen blok için `"latest"`, en son güvenli blok için `"safe"`, en son sonlandırılmış blok için `"finalized"`, henüz bir blokta olmayan işlemler için `"pending"` ve `"earliest"`.
- `address`: `DATA|Array`, 20 Bayt - (isteğe bağlı) Sözleşme adresi veya günlüklerin kaynaklanması gereken adreslerin listesi.
- `topics`: `Array of DATA`, - (isteğe bağlı) 32 Baytlık dizi `DATA` konu. Konular sıraya bağlıdır. Her konu, "veya" seçenekleriyle birlikte bir VERİ dizisi de olabilir.

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

**Dönüşler** `QUANTITY` - Bir filtre kimliğidir.

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x12341234"]}],"id":73}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_newBlockFilter {#eth_newblockfilter}

Yeni bir blok geldiğinde bildirimde bulunmak için düğümde bir filtre oluşturur. Durumun değişip değişmediğini kontrol etmek için [eth_getFilterChanges](#eth_getfilterchanges)'i arayın.

**Parametreler** Hiçbiri

**Dönüşler** `QUANTITY` - Bir filtre kimliğidir.

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_newPendingTransactionFilter {#eth_newpendingtransactionfilter}

Yeni bekleyen işlemler geldiğinde bildirimde bulunmak için düğümde bir filtre oluşturur. Durumun değişip değişmediğini kontrol etmek için [eth_getFilterChanges](#eth_getfilterchanges)'i arayın.

**Parametreler** Hiçbiri

**Dönüşler** `QUANTITY` - Bir filtre kimliğidir.

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_uninstallFilter {#eth_uninstallfilter}

Verilen kimliğe sahip bir filtreyi kaldırır. Saate artık ihtiyaç duyulmadığında daima çağrılmalıdır. Ek olarak Filtreler, belirli bir süre için [eth_getFilterChanges](#eth_getfilterchanges) ile istenmediğinde zaman aşımına uğrar.

**Parametreler**

1. `QUANTITY` - Filtre kimliğidir.

```js
params: [
  "0xb", // 11
]
```

**Dönüşler** `Boolean` - Filtre başarıyla kaldırıldıysa `true`, aksi takdirde `false`.

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_getFilterChanges {#eth_getfilterchanges}

Son yoklamadan bu yana oluşan günlüklerin bir dizisini döndüren bir filtre için yoklama yöntemidir.

**Parametreler**

1. `QUANTITY` - filtre kimliğidir.

```js
params: [
  "0x16", // 22
]
```

**Dönüşler** `Array` - Günlük nesneleri dizisi veya son anketten bu yana hiçbir şey değişmediyse boş bir dizi.

- `eth_newBlockFilter` ile oluşturulan filtreler için dönüş, blok karmalarıdır (`DATA`, 32 Bayt), ör. `["0x345464563453..."]`.
- `eth_newPendingTransactionFilter` ile oluşturulan filtreler için dönüş, işlem karmalarıdır (`DATA`, 32 Bayt), ör. `["0x6345343454645..."]`.
- `eth_newFilter` günlükleriyle oluşturulan filtreler için aşağıdaki parametrelere sahip nesnelerdir:
  - `removed`: `TAG` - Zincirin yeniden düzenlenmesi nedeniyle günlük kaldırıldığında `true`. Geçerli bir günlükse `false`.
  - `logIndex`: `QUANTITY` - bloktaki günlük dizini konumunun tam sayısı. `null` Bekleyen kayıt defteri olduğunda.
  - `transactionIndex`: `QUANTITY` - işlem dizini pozisyon günlüğünün oluşturulduğu tam sayı. `null` Bekleyen kayıt defteri olduğunda.
  - `transactionHash`: `DATA`, 32 Bayt - bu günlüğün oluşturulduğu işlemlerin karması. `null` Bekleyen kayıt defteri olduğunda.
  - `blockHash`: `DATA`, 32 Bayt - bu günlüğün bulunduğu blokun karması. `null` beklediğinde. `null` Bekleyen kayıt defteri olduğunda.
  - `blockNumber`: `QUANTITY` - bu günlüğün bulunduğu blok numarası. `null` beklediğinde. `null` Bekleyen kayıt defteri olduğunda.
  - `address`: `DATA`, 20 Bayt - bu günlüğün kaynaklandığı adres.
  - `data`: `DATA` - günlüğün sıfır veya daha fazla sayıda 32 Baytlık dizine eklenmemiş bağımsız değişkenlerini içerir.
  - `topics`: `Array of DATA` - 0 ila 4 arası dizi 32 Bayt `DATA` dizine alınmış günlük bağımsız değişkenleri. (_solidity_'de: İlk konu, olayın imzasının _karma değeridir_ (ör. `Deposit(address,bytes32,uint256)`), ancak olayı `anonymous` belirteci ile bildirmeniz dışında.)
- **Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0x16"],"id":73}'
// Result
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

### eth_getFilterLogs {#eth_getfilterlogs}

Verilen kimliğe sahip filtreyle eşleşen tüm günlüklerin bir dizisini döndürür.

**Parametreler**

1. `QUANTITY` - Filtre kimliğidir.

```js
params: [
  "0x16", // 22
]
```

**Dönüşler** Bkz. [eth_getFilterChanges](#eth_getfilterchanges)

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

Sonuç, bkz. [eth_getFilterChanges](#eth_getfilterchanges)

### eth_getLogs {#eth_getlogs}

Belirli bir filtre nesnesiyle eşleşen tüm günlüklerin bir dizisini döndürür.

**Parametreler**

1. `Object` - Filtre seçenekleri:

- `fromBlock`: `QUANTITY|TAG` - (isteğe bağlı, default: `"latest"`) Tamsayı blok numarası veya son önerilen blok için `"latest"`, en son güvenli blok için `"safe"`, en son sonlandırılmış blok için `"finalized"`, henüz bir blokta olmayan işlemler için `"pending"` ve `"earliest"`.
- `toBlock`: `QUANTITY|TAG` - (isteğe bağlı, default: `"latest"`) Tamsayı blok numarası veya son önerilen blok için `"latest"`, en son güvenli blok için `"safe"`, en son sonlandırılmış blok için `"finalized"`, henüz bir blokta olmayan işlemler için `"pending"` ve `"earliest"`.
- `address`: `DATA|Array`, 20 Bayt - (isteğe bağlı) Sözleşme adresi veya günlüklerin kaynaklanması gereken adreslerin listesi.
- `topics`: `Array of DATA`, - (isteğe bağlı) 32 Baytlık dizi `DATA` konu. Konular sıraya bağlıdır. Her konu, "veya" seçenekleriyle birlikte bir VERİ dizisi de olabilir.
- `blockhash`: `DATA`, 32 Bayt - (isteğe bağlı, **gelecek**) EIP-234 eklenmesiyle, `blockHash`, 32 baytlık `blockHash` ile tek bloka döndürülen günlükleri kısıtlayan yeni bir filtre seçeneği olacaktır. `blockHash` kullanımı, `fromBlock` ile eş değerdir = `toBlock` = `blockHash` karmalı blok numarası. Filtre ölçütlerinde `blockHash` varsa, ne `fromBlock` ne de `toBlock`'a izin verilmez.

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**Dönüşler** Bkz. [eth_getFilterChanges](#eth_getfilterchanges)

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

Sonuç, bkz. [eth_getFilterChanges](#eth_getfilterchanges)

## Kullanım Örneği {#usage-example}

### JSON_RPC kullanarak bir sözleşmeyi dağıtma {#deploying-contract}

Bu bölüm, yalnızca RPC arayüzünü kullanarak bir sözleşmenin nasıl dağıtılacağının gösterimini içerir. Bu karmaşıklığın ortadan kaldırıldığı sözleşmeleri dağıtmanın alternatif yolları vardır; örneğin, [web3.js](https://web3js.readthedocs.io/) ve [web3.py](https://github.com/ethereum/web3.py) gibi RPC arayüzünün üzerine kurulmuş kitaplıkları kullanmak gibi. Bu soyutlamaların anlaşılması genellikle daha kolaydır ve hataya karşı daha korumalıdır, ancak kaputun altında neler oldup bittiğini anlamak yine de yardımcı olur.

JSON-RPC arabirimi kullanılarak bir Ethereum düğümüne dağıtılacak olan `Multiply7` adlı basit bir akıllı sözleşmeyi aşağıda görebilirsiniz. Bu öğretici, okuyucunun zaten bir Geth düğümü çalıştırdığını varsayar. Düğümler ve istemciler hakkında daha fazla bilgiyi [burada](/developers/docs/nodes-and-clients/run-a-node) bulabilirsiniz. Geth olmayan istemciler için HTTP JSON-RPC'nin nasıl başlatılacağını görmek için lütfen bireysel [istemci](/developers/docs/nodes-and-clients/) dokümanlarına bakın. Çoğu istemci, varsayılan olarak `localhost:8545` üzerinde hizmet verir.

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

Yapılacak ilk şey, HTTP RPC arayüzünün etkinleştirilmesini sağlamaktır. Bu, Geth'e başlangıçta `--http` bayrağını sağladığımız anlamına gelir. Bu örnekte, özel bir geliştirme zincirinde Geth düğümünü kullanıyoruz. Bu yaklaşımı kullandığımızda gerçek ağda ether'e ihtiyacımız olmaz.

```bash
geth --http --dev console 2>>geth.log
```

Bu, `http://localhost:8545` üzerinde HTTP RPC arayüzünü başlatır.

[curl](https://curl.se) kullanarak Coinbase adresini ve bakiyeyi alarak arayüzün çalıştığını doğrulayabiliriz. Lütfen bu örneklerdeki verilerin yerel düğümünüzde farklılık göstereceğini unutmayın. Bu komutları denemek istiyorsanız, ikinci kıvrılma isteğindeki istek paragraflarını ilkinden döndürülen sonuçla değiştirin.

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_coinbase", "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

Sayılar on altılık kodlandığından, bakiye wei'de on altılılık bir dize olarak döndürülür. Ether'de bir sayı olarak bakiyeye sahip olmak istiyorsak, Geth konsolundan web3'ü kullanabiliriz.

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

Artık özel geliştirme zincirimizde bir miktar ether olduğuna göre sözleşmeyi dağıtabiliriz. İlk adım, Multiply7 sözleşmesini EVM'ye gönderilebilecek bayt kodunu derlemektir. Solidity derleyicisi olan solc'yi kurmak için [Solidity dokümanlarını](https://docs.soliditylang.org/en/latest/installing-solidity.html) izleyin. (Örneğimizde kullanılan derleyici sürümüyle eşleşmesi için [daha eski bir `solc` sürümü kullanmak isteyebilirsiniz](https://github.com/ethereum/solidity/releases/tag/v0.4.20).)

Bir sonraki adım, Multiply7 sözleşmesini EVM'ye gönderilebilecek bayt kodunu derlemektir.

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

Artık derlenmiş koda sahip olduğumuza göre, onu dağıtmanın ne kadar gaza mal olacağını belirlememiz gerekiyor. RPC arayüzünde bize bir tahmin verecek bir `eth_estimateGas` yöntemi mevcuttur.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

Ve son olarak sözleşmeyi dağıtın.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

İşlem, düğüm tarafından kabul edilir ve bir işlem karması döndürülür. Bu karma, işlemi takip etmek için kullanılabilir. Bir sonraki adım, sözleşmemizin dağıtıldığı adresi belirlemektir. Gerçekleştirilen her işlemi bir makbuz oluşturacaktır. Bu makbuz, işlemin hangi bloğa dahil olduğu ve ESM tarafından ne kadar gaz kullanıldığı gibi işlemle ilgili çeşitli bilgileri içerir. Bir işlem bir sözleşme oluşturuyorsa, sözleşme adresini de içerecektir. `eth_getTransactionReceipt` RPC yöntemiyle makbuzu alabiliriz.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

Sözleşmemiz `0x4d03d617d700cf81935d7f797f4e2ae719648262` üzerinde oluşturuldu. Makbuz yerine boş bir sonuç, işlemin henüz bir bloğa dahil edilmediği anlamına gelir. Bir dakika bekleyin ve fikir birliği istemcinizin çalışıp çalışmadığını kontrol edip tekrar deneyin.

#### Akıllı sözleşmelerle etkileşim {#interacting-with-smart-contract}

Bu örnekte, sözleşmenin `multiply` yöntemine, `eth_sendTransaction` kullanarak bir işlem göndereceğiz.

`eth_sendTransaction`, özellikle `from`, `to` ve `data` olmak üzere birkaç bağımsız değişken gerektirir. `From` hesabımızın genel adresidir ve `to` da sözleşme adresidir. `Data` bağımsız değişkeni, hangi yöntemin hangi bağımsız değişkenlerle çağrılması gerektiğini tanımlayan bir yük içerir. Burada [ABI (uygulama ikili arayüzü)](https://docs.soliditylang.org/en/latest/abi-spec.html) devreye girer. ABI, EVM için verilerin nasıl tanımlanacağını ve kodlanacağını tanımlayan bir JSON dosyasıdır.

Yükün baytları, sözleşmedeki hangi yöntemin çağrılacağını tanımlar. Bu, fonksiyon adı ve argüman türleri üzerindeki Keccak karma değerinin ilk 4 baytıdır ve on altılık şekilde kodlanmıştır. Çarpma fonksiyonu, uint256 için bir takma ad olan uint'i kabul eder. Bu, bize şunu bırakır:

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

Bir sonraki adım, argümanları kodlamaktır. Yalnızca bir uint256 var, diyelim ki değeri 6. ABI, uint256 türlerinin nasıl kodlanacağını belirten bir bölüme sahiptir.

`int<M>: enc(X)`, yüksek dereceden (sol) tarafta negatif X için 0xff ve sıfır > Uzunluk 32 baytın katı olacak şekilde pozitif X için baytlardan oluşan X'in büyük endian ikinin tümleyeni kodlamasıdır.

Bu, `0000000000000000000000000000000000000000000000000000000000000006` olarak kodlar.

Fonksiyon seçiciyi ve kodlanmış argümanı birleştirdiğimizde verilerimiz `0xc6888fa1000000000000000000000000000000000000000000000000000000000000000` olur.

Bu, artık düğüme gönderilebilir:

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

Bir işlem gönderildiğinden, bir işlem karması döndürülmüştür. Makbuzun alınması şunları sağlar:

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

Makbuz, bir günlük içerir. Bu günlük, işlem yürütülürken EVM tarafından oluşturulur ve makbuza dahil edilir. `multiply` işlevi, `Print` olayının 7 giriş değeriyle tetiklendiğini gösterir. `Print` olayının argümanı uint256 olduğundan, bunu ABI kurallarına göre çözebiliriz ve bu da bize beklenen ondalık sayı 42'yi bırakır. Verilerin yanı sıra, günlüğü hangi olayın oluşturduğunu belirlemek için konuların kullanılabileceğini belirtmekte fayda vardır:

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

Bu, JSON-RPC'nin doğrudan kullanımını gösteren en yaygın görevlerden bazılarına kısa bir giriş niteliğindeydi.

## İlgili konular {#related-topics}

- [JSON-RPC spesifikasyonu](http://www.jsonrpc.org/specification)
- [ Düğümler ve İstemciler](/developers/docs/nodes-and-clients/)
- [JavaScript API'ları](/developers/docs/apis/javascript/)
- [Arka Uç API'ları](/developers/docs/apis/backend/)
- [Yürütme istemcileri](/developers/docs/nodes-and-clients/#execution-clients)
