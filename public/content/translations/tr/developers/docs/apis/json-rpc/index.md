---
title: JSON-RPC API
description: Ethereum istemcileri için durum bilgisi olmayan, hafif bir uzaktan prosedür çağrısı (RPC) protokolü.
lang: tr
---

Bir yazılım uygulamasının Ethereum blok zinciriyle etkileşimde bulunabilmesi - blok zincir verilerini okuma ya da ağa işlemler gönderme yoluyla - bir Ethereum düğümüne bağlanmasını gerektirmektedir.

Bu amaçla her [Ethereum istemcisi](/developers/docs/nodes-and-clients/#execution-clients), belirli düğüm veya istemci uygulamasından bağımsız olarak uygulamaların güvenebileceği tek tip bir metotlar kümesi olması için bir [JSON-RPC spesifikasyonu](https://github.com/ethereum/execution-apis) uygular.

[JSON-RPC](https://www.jsonrpc.org/specification), durum bilgisi olmayan, hafif bir uzaktan yordam çağrısı (RPC) protokolüdür. Birkaç veri yapısını ve bunların işlenmesiyle ilgili kuralları tanımlar. Kavramların aynı süreç içinde, soketler üzerinden, HTTP üzerinden veya birçok farklı mesaj geçiş ortamında kullanılabilir olması açısından aktarımdan bağımsızdır. Veri formatı olarak JSON (RFC 4627) kullanır.

## İstemci uygulamaları {#client-implementations}

Ethereum istemcilerinin her biri, JSON-RPC şartnamesini uygularken farklı programlama dilleri kullanabilir. Belirli programlama dilleriyle ilgili daha fazla ayrıntı için bireysel [istemci belgelerine](/developers/docs/nodes-and-clients/#execution-clients) bakın. En güncel API destek bilgileri için her istemcinin belgelerini kontrol etmenizi öneririz.

## Kolaylaştırıcı Kütüphaneler {#convenience-libraries}

JSON-RPC API aracılığıyla Ethereum istemcileriyle doğrudan etkileşim kurmayı seçebilseniz de, dapp geliştiricileri için genellikle daha kolay seçenekler vardır. JSON-RPC API'sinin üzerinde sarmalayıcılar sağlamak için birçok [JavaScript](/developers/docs/apis/javascript/#available-libraries) ve [arka uç API](/developers/docs/apis/backend/#available-libraries) kütüphanesi mevcuttur. Bu kütüphanelerle geliştiriciler, Ethereum ile etkileşime giren JSON RPC taleplerini (arka planda) başlatmak için tercih ettikleri programlama dilinde sezgisel ve tek satırlı yöntemler yazabilirler.

## Mutabakat istemcisi API'leri {#consensus-clients}

Bu sayfa, özellikle Ethereum yürütüm istemcileri tarafından kullanılan JSON-RPC API'sı ile ilgilidir. Ancak, fikir birliği istemcileri de kullanıcıların bir düğümden bilgi sorgulamasına, İşaret bloklarını, İşaret durumunu ve mutabakat ile ilgili diğer bilgileri direkt talep etmesine olanak veren bir RPC API'sına sahiptir. Bu API, [Beacon API web sayfasında](https://ethereum.github.io/beacon-APIs/#/) belgelenmiştir.

Bir düğüm içinde müşteri veya istemci arası iletişim için dahili bir API da kullanılır; - yani, bu fikir birliği istemcisinin ve yürütüm istemcisinin veri takas etmesini sağlar. Buna 'Motor API'si' denir ve teknik özellikler [GitHub](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) üzerinde mevcuttur.

## Yürütme istemcisi spesifikasyonu {#spec}

[GitHub'daki tam JSON-RPC API spesifikasyonunu okuyun](https://github.com/ethereum/execution-apis). Bu API, [Yürütme API'si web sayfasında](https://ethereum.github.io/execution-apis/) belgelenmiştir ve mevcut tüm yöntemleri denemek için bir Denetçi içerir.

## Kurallar {#conventions}

### Hex değer kodlaması {#hex-encoding}

JSON üzerinden iki temel veri türü geçirilir: biçimlendirilmemiş bayt dizileri ve miktarlar. Her ikisi de bir on altılı kodlamayla geçirilir, ancak biçimlendirme için farklı gereksinimler vardır.

#### Miktarlar {#quantities-encoding}

Miktarları (tamsayılar, sayılar) kodlarken: on altılı olarak kodlayın, önek "0x", en kompakt gösterim (küçük istisna: sıfır "0x0" olarak gösterilmelidir).

İşte bazı örnekler:

- 0x41 (ondalık olarak 65)
- 0x400 (ondalık olarak 1024)
- YANLIŞ: 0x (her zaman en az bir rakama sahip olmalıdır - sıfır "0x0" dır)
- YANLIŞ: 0x0400 (baştaki sıfırlara izin verilmez)
- YANLIŞ: ff (0x ön eki olmalıdır)

### Biçimlendirilmemiş veri {#unformatted-data-encoding}

Biçimlendirilmemiş verileri kodlarken (bayt dizileri, hesap adresleri, karmalar, bayt kodu dizileri): ön ek "0x" ile, bayt başına iki on altılık basamak ve on altılı olarak kodlayın.

İşte bazı örnekler:

- 0x41 (size 1, "A")
- 0x004200 (boyut 3, "0B0")
- 0x (size 0, "")
- YANLIŞ: 0xf0f0f (hane sayısı çift olmalıdır)
- YANLIŞ: 004200 (0x ön eki olmalıdır)

### Blok parametresi {#block-parameter}

Aşağıdaki metotların bir blok parametresi vardır:

- [eth_getBalance](#eth_getbalance)
- [eth_getCode](#eth_getcode)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_call](#eth_call)

Ethereum'un durumunu sorgulayan istekler yapıldığında, sağlanan blok parametresi bloğun yüksekliğini belirler.

Blok parametresi için aşağıdaki seçenekler mevcuttur:

- `HEX Dizesi` - bir tam sayı blok numarası
- `"earliest" Dizesi` - en erken/başlangıç bloğu için
- `"latest" Dizesi` - en son önerilen blok için
- `"safe" Dizesi` - en son güvenli baş blok için
- `"finalized" Dizesi` - en son kesinleşmiş blok için
- `"pending" Dizesi` - bekleyen durum/işlemler için

## Örnekler

Bu sayfada, komut satırı aracı olan [curl](https://curl.se) kullanarak bireysel JSON_RPC API uç noktalarının nasıl kullanılacağına dair örnekler sunuyoruz. Bu bireysel uç nokta örnekleri, aşağıdaki [Curl örnekleri](#curl-examples) bölümünde bulunmaktadır. Sayfanın ilerleyen bölümlerinde, bir Geth düğümü, JSON_RPC API'si ve curl kullanarak bir akıllı sözleşmeyi derlemek ve dağıtmak için bir [uçtan uca örnek](#usage-example) de sunuyoruz.

## Curl örnekleri {#curl-examples}

Bir Ethereum düğümüne [curl](https://curl.se) istekleri yaparak JSON_RPC API'sini kullanma örnekleri aşağıda verilmiştir. Her örnek
belirli uç noktanın bir tanımını, parametrelerini, dönüş türünü ve nasıl kullanılması gerektiğine dair çalışılmış bir örneği içerir.

Kıvrılma istekleri, içerik türüyle ilgili bir hata mesajı döndürebilir. Bunun nedeni, `--data` seçeneğinin içerik türünü `application/x-www-form-urlencoded` olarak ayarlamasıdır. Düğümünüz bu konuda şikayet ederse, çağrının başına `-H "Content-Type: application/json"` yerleştirerek başlığı manuel olarak ayarlayın. Örnekler ayrıca curl'e verilen son argüman olması gereken URL/IP ve bağlantı noktası kombinasyonunu içermez (örn. `127.0.0.1:8545`). Bu ek verileri içeren eksiksiz bir kıvrılma isteği aşağıdaki formu alır:

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## Gossip, Durum, Geçmiş {#gossip-state-history}

Birkaç temel JSON-RPC metodu, Ethereum ağından veri gerektirir ve üç ana kategoriye ayrılır: _Gossip, Durum ve Geçmiş_. Her bir yönteme atlamak için bu bölümlerdeki bağlantıları kullanın veya tüm yöntemler listesini keşfetmek için içindekiler tablosunu kullanın.

### Gossip Metotları {#gossip-methods}

> Bu yöntemler zincirin başını izler. Bu, işlemlerin ağ etrafında nasıl dolaştığını, blokların içinde nasıl yer bulduğunu ve istemcilerin yeni bloklar hakkında nasıl bilgi sahibi olduğunu gösterir.

- [eth_blockNumber](#eth_blocknumber)
- [eth_sendRawTransaction](#eth_sendrawtransaction)

### Durum Metotları {#state_methods}

> Depolanan tüm verinin mevcut durumunu raporlayan yöntemlerdir. "Durum" RAM'nin paylaşımlı, büyük tek bir parçası gibidir ve hesap bakiyelerini, sözleşme verilerini ve gaz tahminlerini içerir.

- [eth_getBalance](#eth_getbalance)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getCode](#eth_getcode)
- [eth_call](#eth_call)
- [eth_estimateGas](#eth_estimategas)

### Geçmiş Metotları {#history_methods}

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

API metotlarını keşfetmek ve denemek için [oyun alanı aracını](https://ethereum-json-rpc.com) kullanabilirsiniz. Ayrıca, çeşitli düğüm sağlayıcıları tarafından hangi yöntemlerin ve ağların desteklendiğini de gösterir.

## JSON-RPC API Metotları {#json-rpc-methods}

### web3_clientVersion {#web3_clientversion}

Geçerli istemci sürümünü döndürür.

**Parametreler**

Hiçbiri

**Döndürülenler**

`Dize` - Mevcut istemci sürümü

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

### web3_sha3 {#web3_sha3}

Verilen verinin Keccak-256'sını (_standartlaştırılmış SHA3-256'yı değil_) döndürür.

**Parametreler**

1. `VERİ` - SHA3 karmasına dönüştürülecek veri

```js
params: ["0x68656c6c6f20776f726c64"]
```

**Döndürülenler**

`VERİ` - Verilen dizenin SHA3 sonucu.

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

### net_version {#net_version}

Geçerli ağ kimliğini döndürür.

**Parametreler**

Hiçbiri

**Döndürülenler**

`Dize` - Mevcut ağ kimliği.

Mevcut ağ kimliklerinin tam listesi [chainlist.org](https://chainlist.org) adresinde mevcuttur. Bazı yaygın olanları:

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

### net_listening {#net_listening}

İstemci ağ bağlantılarını aktif olarak dinliyorsa `true` döndürür.

**Parametreler**

Hiçbiri

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

### net_peerCount {#net_peercount}

Şu anda istemciye bağlı olan eşlerin sayısını döndürür.

**Parametreler**

Hiçbiri

**Döndürülenler**

`MİKTAR` - bağlı olan eşlerin sayısının tam sayısı.

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

### eth_protocolVersion {#eth_protocolversion}

Geçerli Ethereum protokol sürümünü döndürür. Bu metodun [Geth'te mevcut olmadığını](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924) unutmayın.

**Parametreler**

Hiçbiri

**Döndürülenler**

`Dize` - Mevcut Ethereum protokol sürümü

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

### eth_syncing {#eth_syncing}

Senkronizasyon durumu hakkında veri içeren bir nesne veya `false` döndürür.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_syncing">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

Hiçbiri

**Döndürülenler**

Kesin dönüş verileri, istemci uygulamaları arasında farklılık gösterir. Düğüm senkronize olmadığında tüm istemciler `False` döndürür ve tüm istemciler aşağıdaki alanları döndürür.

`Nesne|Boolean`, Senkronizasyon durumu verileri içeren bir nesne veya senkronize olmadığında `FALSE`:

- `startingBlock`: `MİKTAR` - İçe aktarmanın başladığı blok (yalnızca senkronizasyon kendi baş bloğuna ulaştıktan sonra sıfırlanır)
- `currentBlock`: `MİKTAR` - Mevcut blok, eth_blockNumber ile aynı
- `highestBlock`: `MİKTAR` - Tahmini en yüksek blok

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
// Veya senkronize değilken
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth_coinbase}

İstemci para tabanı adresini döndürür.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_coinbase">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

> **Not:** Bu metot **v1.14.0** itibarıyla kullanımdan kaldırılmıştır ve artık desteklenmemektedir. Bu metodu kullanmaya çalışmak "Metot desteklenmiyor" hatasıyla sonuçlanacaktır.

**Parametreler**

Hiçbiri

**Döndürülenler**

`VERİ`, 20 bayt - mevcut coinbase adresi.

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

### eth_chainId {#eth_chainId}

Tekrardan korumalı işlemleri imzalamak için kullanılan zincir kimliğini döndürür.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_chainId">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

Hiçbiri

**Döndürülenler**

`chainId`, mevcut zincir kimliğinin tam sayısını temsil eden bir dize olarak onaltılık değer.

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

### eth_mining {#eth_mining}

İstemci aktif olarak yeni bloklar çıkarıyorsa `true` döndürür. Bu, yalnızca iş ispatı ağları için `true` döndürebilir ve [Birleşim](/roadmap/merge/) sonrasında bazı istemcilerde mevcut olmayabilir.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_mining">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

Hiçbiri

**Döndürülenler**

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

### eth_hashrate {#eth_hashrate}

Düğümün madencilik yaptığı saniye başına karma sayısını döndürür. Bu, yalnızca iş ispatı ağları için `true` döndürebilir ve [Birleşim](/roadmap/merge/) sonrasında bazı istemcilerde mevcut olmayabilir.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_hashrate">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

Hiçbiri

**Döndürülenler**

`MİKTAR` - saniye başına karma sayısı.

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

### eth_gasPrice {#eth_gasprice}

Wei cinsinden gaz başına mevcut fiyatın bir tahminini döndürür. Örneğin, Besu istemcisi son 100 bloğu inceler ve varsayılan medyan gaz birim fiyatını döndürür.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_gasPrice">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

Hiçbiri

**Döndürülenler**

`MİKTAR` - wei cinsinden mevcut gaz fiyatının tam sayısı.

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

### eth_accounts {#eth_accounts}

İstemcinin sahip olduğu adreslerin listesini döndürür.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_accounts">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

Hiçbiri

**Döndürülenler**

`VERİ Dizisi`, 20 Bayt - istemcinin sahip olduğu adresler.

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

### eth_blockNumber {#eth_blocknumber}

En son bloğun numarasını döndürür.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_blockNumber">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

Hiçbiri

**Döndürülenler**

`MİKTAR` - istemcinin bulunduğu mevcut blok numarasının tam sayısı.

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

### eth_getBalance {#eth_getbalance}

Belirli bir adresteki hesabın bakiyesini döndürür.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBalance">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

1. `VERİ`, 20 Bayt - bakiye kontrolü için adres.
2. `MİKTAR|ETİKET` - tam sayı blok numarası veya `"latest"`, `"earliest"`, `"pending"`, `"safe"` ya da `"finalized"` dizesi, bkz. [blok parametresi](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**Döndürülenler**

`MİKTAR` - wei cinsinden mevcut bakiyenin tam sayısı.

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

### eth_getStorageAt {#eth_getstorageat}

Belirli bir adresteki bir depolama konumundan değeri döndürür.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getStorageAt">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

1. `VERİ`, 20 Bayt - depolama adresi.
2. `MİKTAR` - depolamadaki konumun tam sayısı.
3. `MİKTAR|ETİKET` - tam sayı blok numarası veya `"latest"`, `"earliest"`, `"pending"`, `"safe"` ya da `"finalized"` dizesi, bkz. [blok parametresi](/developers/docs/apis/json-rpc/#block-parameter)

**Döndürülenler**

`VERİ` - bu depolama konumundaki değer.

**Örnek**
Doğru konumu hesaplamak, alınacak depolamaya bağlıdır. Aşağıdaki, `0x391694e7e0b0cce554cb130d723a9d27458f9298` adresi tarafından `0x295a70b2de5e3953354a6a8344e616ed314d7251` adresinde dağıtılan sözleşmeyi göz önünde bulundurun.

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

pos0'ın değerini almak basittir:

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

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionCount">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

1. `VERİ`, 20 Bayt - adres.
2. `MİKTAR|ETİKET` - tam sayı blok numarası veya `"latest"`, `"earliest"`, `"pending"`, `"safe"` ya da `"finalized"` dizesi, bkz. [blok parametresi](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // en son bloktaki durum
]
```

**Döndürülenler**

`MİKTAR` - bu adresten gönderilen işlem sayısının tam sayısı.

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

### eth_getBlockTransactionCountByHash {#eth_getblocktransactioncountbyhash}

Verilen blok karması ile eşleşen bir bloktaki işlem sayısını döndürür.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByHash">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

1. `VERİ`, 32 Bayt - bir bloğun karması

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**Döndürülenler**

`MİKTAR` - bu bloktaki işlem sayısının tam sayısı.

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

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByNumber">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

1. `MİKTAR|ETİKET` - bir blok numarasının tam sayısı veya [blok parametresinde](/developers/docs/apis/json-rpc/#block-parameter) olduğu gibi `"earliest"`, `"latest"`, `"pending"`, `"safe"` ya da `"finalized"` dizesi.

```js
params: [
  "0x13738ca", // 20396234
]
```

**Döndürülenler**

`MİKTAR` - bu bloktaki işlem sayısının tam sayısı.

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

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockHash">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

1. `VERİ`, 32 Bayt - bir bloğun karması

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**Döndürülenler**

`MİKTAR` - bu bloktaki amca (uncle) sayısının tam sayısı.

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

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockNumber">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

1. `MİKTAR|ETİKET` - tam sayı blok numarası veya `"latest"`, `"earliest"`, `"pending"`, `"safe"` ya da `"finalized"` dizesi, bkz. [blok parametresi](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xe8", // 232
]
```

**Döndürülenler**

`MİKTAR` - bu bloktaki amca (uncle) sayısının tam sayısı.

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

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getCode">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

1. `VERİ`, 20 Bayt - adres
2. `MİKTAR|ETİKET` - tam sayı blok numarası veya `"latest"`, `"earliest"`, `"pending"`, `"safe"` ya da `"finalized"` dizesi, bkz. [blok parametresi](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**Döndürülenler**

`VERİ` - verilen adresten kod.

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

İmzalama yöntemi, Ethereum'a özgü bir imzayı şu şekilde hesaplar: `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`.

Mesaja bir önek ekleyerek hesaplanan imzanın Ethereum'a özel bir imza olarak tanınmasını sağlar. Bu, kötü niyetli bir merkeziyetsiz uygulamanın rastgele verileri (ör. işlem) imzalayabildiği ve imzayı kurbanın kimliğine bürünmek için kullandığı kötüye kullanımı önler.

Not: İmzalanacak adresin kilidi açık olmalıdır.

**Parametreler**

1. `VERİ`, 20 Bayt - adres
2. `VERİ`, N Bayt - imzalanacak mesaj

**Döndürülenler**

`VERİ`: İmza

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

### eth_signTransaction {#eth_signtransaction}

Daha sonra [eth_sendRawTransaction](#eth_sendrawtransaction) ile ağa gönderilebilecek bir işlemi imzalar.

**Parametreler**

1. `Nesne` - İşlem nesnesi

- `tür`:
- `from`: `VERİ`, 20 Bayt - İşlemin gönderildiği adres.
- `to`: `VERİ`, 20 Bayt - (yeni sözleşme oluştururken isteğe bağlı) İşlemin yönlendirildiği adres.
- `gas`: `MİKTAR` - (isteğe bağlı, varsayılan: 90000) İşlemin yürütülmesi için sağlanan gazın tam sayısı. Kullanılmayan gazı geri verecektir.
- `gasPrice`: `MİKTAR` - (isteğe bağlı, varsayılan: Belirlenecek) Wei cinsinden ödenen her gaz için kullanılan gasPrice tam sayısı.
- `value`: `MİKTAR` - (isteğe bağlı) Wei cinsinden bu işlemle gönderilen değerin tam sayısı.
- `data`: `VERİ` - Bir sözleşmenin derlenmiş kodu VEYA çağrılan metot imzasının ve kodlanmış parametrelerin karması.
- `nonce`: `MİKTAR` - (isteğe bağlı) Bir nonce'un tam sayısı. Bu, aynı nonce'yi kullanan kendi bekleyen işlemlerinizin üzerine yazmanıza izin verir.

**Döndürülenler**

`VERİ`, Belirtilen hesap tarafından imzalanan RLP kodlu işlem nesnesi.

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

### eth_sendTransaction {#eth_sendtransaction}

Veri alanı kod içeriyorsa, yeni bir mesaj çağrı işlemi veya sözleşme oluşturma işlemi oluşturur ve `from` alanında belirtilen hesabı kullanarak imzalar.

**Parametreler**

1. `Nesne` - İşlem nesnesi

- `from`: `VERİ`, 20 Bayt - İşlemin gönderildiği adres.
- `to`: `VERİ`, 20 Bayt - (yeni sözleşme oluştururken isteğe bağlı) İşlemin yönlendirildiği adres.
- `gas`: `MİKTAR` - (isteğe bağlı, varsayılan: 90000) İşlemin yürütülmesi için sağlanan gazın tam sayısı. Kullanılmayan gazı geri verecektir.
- `gasPrice`: `MİKTAR` - (isteğe bağlı, varsayılan: Belirlenecek) Ücretli her gaz için kullanılan gasPrice tam sayısı.
- `value`: `MİKTAR` - (isteğe bağlı) Bu işlemle gönderilen değerin tam sayısı.
- `input`: `VERİ` - Bir sözleşmenin derlenmiş kodu VEYA çağrılan metot imzasının ve kodlanmış parametrelerin karması.
- `nonce`: `MİKTAR` - (isteğe bağlı) Bir nonce'un tam sayısı. Bu, aynı nonce'yi kullanan kendi bekleyen işlemlerinizin üzerine yazmanıza izin verir.

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

`VERİ`, 32 Bayt - işlem karması veya işlem henüz mevcut değilse sıfır karma.

Bir sözleşme oluşturduğunuzda, işlem bir blokta önerildikten sonra sözleşme adresini almak için [eth_getTransactionReceipt](#eth_gettransactionreceipt) öğesini kullanın.

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

### eth_sendRawTransaction {#eth_sendrawtransaction}

İmzalı işlemler için yeni mesaj arama işlemi veya sözleşme oluşturma gerçekleşir.

**Parametreler**

1. `VERİ`, İmzalanmış işlem verisi.

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**Döndürülenler**

`VERİ`, 32 Bayt - işlem karması veya işlem henüz mevcut değilse sıfır karma.

Bir sözleşme oluşturduğunuzda, işlem bir blokta önerildikten sonra sözleşme adresini almak için [eth_getTransactionReceipt](#eth_gettransactionreceipt) öğesini kullanın.

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

### eth_call {#eth_call}

Blokzincirde bir işlem oluşturmadan hemen yeni bir mesaj çağrısı yürütür. Genellikle yalnızca okuma işlemi yapan akıllı sözleşme fonksiyonlarını çalıştırmak için kullanılır, örneğin bir ERC-20 sözleşmesi için `balanceOf` fonksiyonu.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_call">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

1. `Nesne` - İşlem çağrısı nesnesi

- `from`: `VERİ`, 20 Bayt - (isteğe bağlı) İşlemin gönderildiği adres.
- `to`: `VERİ`, 20 Bayt - İşlemin yönlendirildiği adres.
- `gas`: `MİKTAR` - (isteğe bağlı) İşlemin yürütülmesi için sağlanan gazın tam sayısı. eth_call sıfır gaz tüketir, ancak bazı uygulamalarda bu parametreye ihtiyaç duyulabilir.
- `gasPrice`: `MİKTAR` - (isteğe bağlı) Ücretli her gaz için kullanılan gasPrice'ın tam sayısı
- `value`: `MİKTAR` - (isteğe bağlı) Bu işlemle gönderilen değerin tam sayısı
- `input`: `VERİ` - (isteğe bağlı) Metot imzasının ve kodlanmış parametrelerin karması. Ayrıntılar için [Solidity belgelerindeki Ethereum Contract ABI](https://docs.soliditylang.org/en/latest/abi-spec.html) bölümüne bakın.

2. `MİKTAR|ETİKET` - tam sayı blok numarası veya `"latest"`, `"earliest"`, `"pending"`, `"safe"` ya da `"finalized"` dizesi, bkz. [blok parametresi](/developers/docs/apis/json-rpc/#block-parameter)

**Döndürülenler**

`VERİ` - yürütülen sözleşmenin dönüş değeri.

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

### eth_estimateGas {#eth_estimategas}

İşlemin tamamlanmasına izin vermek için ne kadar gazın gerekli olduğuna dair bir tahmin oluşturur ve döndürür. İşlem, blokzincire eklenmez. Tahminin, ESM mekaniği ve düğüm performansı dahil olmak üzere çeşitli nedenlerle işlem tarafından fiilen kullanılan gaz miktarından önemli ölçüde daha fazla olabileceğini unutmayın.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_estimateGas">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

[eth_call](#eth_call) parametrelerine bakın, tüm özelliklerin isteğe bağlı olması dışında. Gaz limiti belirtilmemişse geth, bekleyen bloktan gelen blok gaz limitini üst sınır olarak kullanır. Sonuç olarak, gaz miktarı bekleyen blok gaz limitinden daha yüksek olduğunda, döndürülen tahmin çağrıyı/işlemi yürütmek için yeterli olmayabilir.

**Döndürülenler**

`MİKTAR` - kullanılan gaz miktarı.

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

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByHash">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

1. `VERİ`, 32 Bayt - Bir bloğun karması.
2. `Boolean` - `true` ise tam işlem nesnelerini döndürür, `false` ise yalnızca işlemlerin karmalarını döndürür.

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**Döndürülenler**

`Nesne` - Bir blok nesnesi veya blok bulunamadığında `null`:

- `number`: `MİKTAR` - blok numarası. Bekleyen bir blok olduğunda `null`.
- `hash`: `VERİ`, 32 Bayt - bloğun karması. Bekleyen bir blok olduğunda `null`.
- `parentHash`: `VERİ`, 32 Bayt - ana bloğun karması.
- `nonce`: `VERİ`, 8 Bayt - oluşturulan iş ispatının karması. Bekleyen bir blok olduğunda `null`, hisse ispatı blokları için `0x0` (Birleşim'den beri)
- `sha3Uncles`: `VERİ`, 32 Bayt - bloktaki amca (uncle) verilerinin SHA3'ü.
- `logsBloom`: `VERİ`, 256 Bayt - bloğun günlükleri için bloom filtresi. Bekleyen bir blok olduğunda `null`.
- `transactionsRoot`: `VERİ`, 32 Bayt - bloğun işlem trie'sinin kökü.
- `stateRoot`: `VERİ`, 32 Bayt - bloğun son durum trie'sinin kökü.
- `receiptsRoot`: `VERİ`, 32 Bayt - bloğun makbuz trie'sinin kökü.
- `miner`: `VERİ`, 20 Bayt - blok ödüllerinin verildiği lehtarın adresi.
- `difficulty`: `MİKTAR` - bu bloğun zorluğunun tam sayısı.
- `totalDifficulty`: `MİKTAR` - bu bloka kadar zincirin toplam zorluğunun tam sayısı.
- `extraData`: `VERİ` - bu bloğun "ekstra veri" alanı.
- `size`: `MİKTAR` - bu bloğun bayt cinsinden boyutunun tam sayısı.
- `gasLimit`: `MİKTAR` - bu blokta izin verilen maksimum gaz.
- `gasUsed`: `MİKTAR` - bu bloktaki tüm işlemler tarafından kullanılan toplam gaz.
- `timestamp`: `MİKTAR` - bloğun derlendiği zamana ilişkin unix zaman damgası.
- `transactions`: `Dizi` - İşlem nesneleri dizisi veya son verilen parametreye bağlı olarak 32 Bayt'lık işlem karmaları.
- `uncles`: `Dizi` - Amca (uncle) karmaları dizisi.

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

### eth_getBlockByNumber {#eth_getblockbynumber}

Blok numarasına göre bir blok hakkında bilgi döndürür.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByNumber">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

1. `MİKTAR|ETİKET` - bir blok numarasının tam sayısı veya [blok parametresinde](/developers/docs/apis/json-rpc/#block-parameter) olduğu gibi `"earliest"`, `"latest"`, `"pending"`, `"safe"` ya da `"finalized"` dizesi.
2. `Boolean` - `true` ise tam işlem nesnelerini döndürür, `false` ise yalnızca işlemlerin karmalarını döndürür.

```js
params: [
  "0x1b4", // 436
  true,
]
```

**Döndürülenler**
Bkz. [eth_getBlockByHash](#eth_getblockbyhash)

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

Sonuç bkz. [eth_getBlockByHash](#eth_getblockbyhash)

### eth_getTransactionByHash {#eth_gettransactionbyhash}

İşlem karması tarafından istenen bir işlem hakkındaki bilgileri döndürür.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByHash">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

1. `VERİ`, 32 Bayt - bir işlemin karması

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**Döndürülenler**

`Nesne` - Bir işlem nesnesi veya işlem bulunamadığında `null`:

- `blockHash`: `VERİ`, 32 Bayt - bu işlemin bulunduğu bloğun karması. Beklemedeyken `null`.
- `blockNumber`: `MİKTAR` - bu işlemin bulunduğu blok numarası. Beklemedeyken `null`.
- `from`: `VERİ`, 20 Bayt - göndericinin adresi.
- `gas`: `MİKTAR` - gönderici tarafından sağlanan gaz.
- `gasPrice`: `MİKTAR` - gönderici tarafından Wei cinsinden sağlanan gaz fiyatı.
- `hash`: `VERİ`, 32 Bayt - işlemin karması.
- `input`: `VERİ` - işlemle birlikte gönderilen veriler.
- `nonce`: `MİKTAR` - göndericinin bundan önce yaptığı işlem sayısı.
- `to`: `VERİ`, 20 Bayt - alıcının adresi. Bir sözleşme oluşturma işlemi olduğunda `null`.
- `transactionIndex`: `MİKTAR` - bloktaki işlemler dizin konumunun tam sayısı. Beklemedeyken `null`.
- `value`: `MİKTAR` - Wei cinsinden aktarılan değer.
- `v`: `MİKTAR` - ECDSA kurtarma kimliği
- `r`: `MİKTAR` - ECDSA imzası r
- `s`: `MİKTAR` - ECDSA imzası s

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

### eth_getTransactionByBlockHashAndIndex {#eth_gettransactionbyblockhashandindex}

Blok karması ve işlem dizini konumuna göre bir işlem hakkındaki bilgileri döndürür.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockHashAndIndex">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

1. `VERİ`, 32 Bayt - bir bloğun karması.
2. `MİKTAR` - işlem dizin konumunun tam sayısı.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Döndürülenler**
Bkz. [eth_getTransactionByHash](#eth_gettransactionbyhash)

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Sonuç bkz. [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionByBlockNumberAndIndex {#eth_gettransactionbyblocknumberandindex}

Blok numarasına ve işlem dizini konumuna göre bir işlem hakkında bilgi döndürür.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockNumberAndIndex">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

1. `MİKTAR|ETİKET` - bir blok numarası veya [blok parametresinde](/developers/docs/apis/json-rpc/#block-parameter) olduğu gibi `"earliest"`, `"latest"`, `"pending"`, `"safe"` ya da `"finalized"` dizesi.
2. `MİKTAR` - işlem dizin konumu.

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**Döndürülenler**
Bkz. [eth_getTransactionByHash](#eth_gettransactionbyhash)

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

Sonuç bkz. [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionReceipt {#eth_gettransactionreceipt}

İşlem karmasına göre bir işlemin makbuzunu döndürür.

**Not** Makbuzun bekleyen işlemler için mevcut olmadığına dikkat edin.

**Parametreler**

1. `VERİ`, 32 Bayt - bir işlemin karması

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**Döndürülenler**
`Nesne` - Bir işlem makbuzu nesnesi veya makbuz bulunamadığında `null`:

- `transactionHash `: `VERİ`, 32 Bayt - işlemin karması.
- `transactionIndex`: `MİKTAR` - bloktaki işlemler dizin konumunun tam sayısı.
- `blockHash`: `VERİ`, 32 Bayt - bu işlemin bulunduğu bloğun karması.
- `blockNumber`: `MİKTAR` - bu işlemin bulunduğu blok numarası.
- `from`: `VERİ`, 20 Bayt - göndericinin adresi.
- `to`: `VERİ`, 20 Bayt - alıcının adresi. bir sözleşme oluşturma işlemi olduğunda null.
- `cumulativeGasUsed` : `MİKTAR` - Bu işlem blokta yürütüldüğünde kullanılan toplam gaz miktarı.
- `effectiveGasPrice` : `MİKTAR` - Taban ücretin ve gaz birimi başına ödenen bahşişin toplamı.
- `gasUsed `: `MİKTAR` - Yalnızca bu özel işlem tarafından kullanılan gaz miktarı.
- `contractAddress `: `VERİ`, 20 Bayt - İşlem bir sözleşme oluşturma ise, oluşturulan sözleşme adresi, aksi takdirde `null`.
- `logs`: `Dizi` - Bu işlemin oluşturduğu günlük nesneleri dizisi.
- `logsBloom`: `VERİ`, 256 Bayt - İlgili günlükleri hızlı bir şekilde almak için hafif istemciler için Bloom filtresi.
- `type`: `MİKTAR` - işlem türünün tam sayısı, eski işlemler için `0x0`, erişim listesi türleri için `0x1`, dinamik ücretler için `0x2`.

Ayrıca şunlardan birini döndürür:

- `root` : `VERİ` 32 bayt işlem sonrası durum kökü (Bizans öncesi)
- `status`: `MİKTAR` ya `1` (başarılı) ya da `0` (başarısız)

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
    "contractAddress": null, // oluşturulmuşsa adresin dizesi
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // getFilterLogs tarafından döndürülen günlükler, vb.
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

### eth_getUncleByBlockHashAndIndex {#eth_getunclebyblockhashandindex}

Karma ve amca (uncle) dizin konumuna göre bir bloğun amcası hakkında bilgi verir.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockHashAndIndex">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

1. `VERİ`, 32 Bayt - Bir bloğun karması.
2. `MİKTAR` - Amcanın (uncle) dizin konumu.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Döndürülenler**
Bkz. [eth_getBlockByHash](#eth_getblockbyhash)

**Örnek**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Sonuç bkz. [eth_getBlockByHash](#eth_getblockbyhash)

**Not**: Bir amca (uncle), bireysel işlemler içermez.

### eth_getUncleByBlockNumberAndIndex {#eth_getunclebyblocknumberandindex}

Numaraya ve amca (uncle) dizin konumuna göre bir bloğun amcası hakkında bilgi verir.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockNumberAndIndex">
  Uç noktayı oyun alanında deneyin
</ButtonLink>

**Parametreler**

1. `MİKTAR|ETİKET` - bir blok numarası veya [blok parametresinde](/developers/docs/apis/json-rpc/#block-parameter) olduğu gibi `"earliest"`, `"latest"`, `"pending"`, `"safe"` ya da `"finalized"` dizesi.
2. `MİKTAR` - amcanın (uncle) dizin konumu.

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**Döndürülenler**
Bkz. [eth_getBlockByHash](#eth_getblockbyhash)

**Not**: Bir amca (uncle), bireysel işlemler içermez.

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

Sonuç bkz. [eth_getBlockByHash](#eth_getblockbyhash)

### eth_newFilter {#eth_newfilter}

Durum değiştiğinde (günlükler) bildirimde bulunmak için filtre seçeneklerine dayalı olarak bir filtre nesnesi oluşturur.
Durumun değişip değişmediğini kontrol etmek için [eth_getFilterChanges](#eth_getfilterchanges) çağrısı yapın.

**Konu filtrelerini belirtme hakkında bir not:**
Konular sıraya bağlıdır. [A, B] konularına sahip günlük içeren bir işlem, aşağıdaki konu filtreleriyle eşleştirilecektir:

- `[]` "herhangi bir şey"
- `[A]` "birinci konumda A (ve sonrası herhangi bir şey)"
- `[null, B]` "birinci konumda herhangi bir şey VE ikinci konumda B (ve sonrası herhangi bir şey)"
- `[A, B]` "birinci konumda A VE ikinci konumda B (ve sonrası herhangi bir şey)"
- `[[A, B], [A, B]]` "birinci konumda (A VEYA B) VE ikinci konumda (A VEYA B) (ve sonrası herhangi bir şey)"
- **Parametreler**

1. `Nesne` - Filtre seçenekleri:

- `fromBlock`: `MİKTAR|ETİKET` - (isteğe bağlı, varsayılan: `"latest"`) Tam sayı blok numarası veya son önerilen blok için `"latest"`, en son güvenli blok için `"safe"`, en son kesinleşmiş blok için `"finalized"` veya henüz bir blokta olmayan işlemler için `"pending"`, `"earliest"`.
- `toBlock`: `MİKTAR|ETİKET` - (isteğe bağlı, varsayılan: `"latest"`) Tam sayı blok numarası veya son önerilen blok için `"latest"`, en son güvenli blok için `"safe"`, en son kesinleşmiş blok için `"finalized"` veya henüz bir blokta olmayan işlemler için `"pending"`, `"earliest"`.
- `address`: `VERİ|Dizi`, 20 Bayt - (isteğe bağlı) Sözleşme adresi veya günlüklerin kaynaklanması gereken adreslerin listesi.
- `topics`: `VERİ Dizisi`, - (isteğe bağlı) 32 Baytlık `VERİ` konuları dizisi. Konular sıraya bağlıdır. Her konu, "veya" seçenekleriyle birlikte bir VERİ dizisi de olabilir.

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

**Döndürülenler**
`MİKTAR` - Bir filtre kimliği.

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

### eth_newBlockFilter {#eth_newblockfilter}

Yeni bir blok geldiğinde bildirimde bulunmak için düğümde bir filtre oluşturur.
Durumun değişip değişmediğini kontrol etmek için [eth_getFilterChanges](#eth_getfilterchanges) çağrısı yapın.

**Parametreler**
Yok

**Döndürülenler**
`MİKTAR` - Bir filtre kimliği.

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

### eth_newPendingTransactionFilter {#eth_newpendingtransactionfilter}

Yeni bekleyen işlemler geldiğinde bildirimde bulunmak için düğümde bir filtre oluşturur.
Durumun değişip değişmediğini kontrol etmek için [eth_getFilterChanges](#eth_getfilterchanges) çağrısı yapın.

**Parametreler**
Yok

**Döndürülenler**
`MİKTAR` - Bir filtre kimliği.

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

Verilen kimliğe sahip bir filtreyi kaldırır. Saate artık ihtiyaç duyulmadığında daima çağrılmalıdır.
Ayrıca Filtreler, belirli bir süre boyunca [eth_getFilterChanges](#eth_getfilterchanges) ile istenmediğinde zaman aşımına uğrar.

**Parametreler**

1. `MİKTAR` - Filtre kimliği.

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

### eth_getFilterChanges {#eth_getfilterchanges}

Son yoklamadan bu yana oluşan günlüklerin bir dizisini döndüren bir filtre için yoklama yöntemidir.

**Parametreler**

1. `MİKTAR` - filtre kimliği.

```js
params: [
  "0x16", // 22
]
```

**Döndürülenler**
`Dizi` - Günlük nesneleri dizisi veya son yoklamadan bu yana hiçbir şey değişmediyse boş bir dizi.

- `eth_newBlockFilter` ile oluşturulan filtreler için dönüş, blok karmalarıdır (`VERİ`, 32 Bayt), örn., `["0x3454645634534..."]`.

- `eth_newPendingTransactionFilter` ile oluşturulan filtreler için dönüş, işlem karmalarıdır (`VERİ`, 32 Bayt), örn., `["0x6345343454645..."]`.

- `eth_newFilter` ile oluşturulan filtreler için günlükler, aşağıdaki parametrelere sahip nesnelerdir:
  - `removed`: `ETİKET` - `true`, günlük bir zincir yeniden düzenlenmesi nedeniyle kaldırıldığında. Geçerli bir günlükse `false`.
  - `logIndex`: `MİKTAR` - bloktaki günlük dizin konumunun tam sayısı. Bekleyen bir günlük olduğunda `null`.
  - `transactionIndex`: `MİKTAR` - günlüğün oluşturulduğu işlemler dizin konumunun tam sayısı. Bekleyen bir günlük olduğunda `null`.
  - `transactionHash`: `VERİ`, 32 Bayt - bu günlüğün oluşturulduğu işlemlerin karması. Bekleyen bir günlük olduğunda `null`.
  - `blockHash`: `VERİ`, 32 Bayt - bu günlüğün bulunduğu bloğun karması. Beklemedeyken `null`. Bekleyen bir günlük olduğunda `null`.
  - `blockNumber`: `MİKTAR` - bu günlüğün bulunduğu blok numarası. Beklemedeyken `null`. Bekleyen bir günlük olduğunda `null`.
  - `address`: `VERİ`, 20 Bayt - bu günlüğün kaynaklandığı adres.
  - `data`: `VERİ` - değişken uzunluklu, dizine alınmamış günlük verileri. (_Solidity_'de: sıfır veya daha fazla 32 Bayt'lık dizine alınmamış günlük argümanları.)
  - `topics`: `VERİ Dizisi` - 0 ila 4 arası 32 Baytlık dizine alınmış günlük argümanlarının `VERİ` dizisi. (_Solidity_'de: `anonymous` belirteciyle olayı bildirdiğiniz durumlar dışında, ilk konu olayın imzasının _karmasıdır_ (örneğin, `Deposit(address,bytes32,uint256)`)).

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

### eth_getFilterLogs {#eth_getfilterlogs}

Verilen kimliğe sahip filtreyle eşleşen tüm günlüklerin bir dizisini döndürür.

**Parametreler**

1. `MİKTAR` - Filtre kimliği.

```js
params: [
  "0x16", // 22
]
```

**Döndürülenler**
Bkz. [eth_getFilterChanges](#eth_getfilterchanges)

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

Sonuç bkz. [eth_getFilterChanges](#eth_getfilterchanges)

### eth_getLogs {#eth_getlogs}

Belirli bir filtre nesnesiyle eşleşen tüm günlüklerin bir dizisini döndürür.

**Parametreler**

1. `Nesne` - Filtre seçenekleri:

- `fromBlock`: `MİKTAR|ETİKET` - (isteğe bağlı, varsayılan: `"latest"`) Tam sayı blok numarası veya son önerilen blok için `"latest"`, en son güvenli blok için `"safe"`, en son kesinleşmiş blok için `"finalized"` veya henüz bir blokta olmayan işlemler için `"pending"`, `"earliest"`.
- `toBlock`: `MİKTAR|ETİKET` - (isteğe bağlı, varsayılan: `"latest"`) Tam sayı blok numarası veya son önerilen blok için `"latest"`, en son güvenli blok için `"safe"`, en son kesinleşmiş blok için `"finalized"` veya henüz bir blokta olmayan işlemler için `"pending"`, `"earliest"`.
- `address`: `VERİ|Dizi`, 20 Bayt - (isteğe bağlı) Sözleşme adresi veya günlüklerin kaynaklanması gereken adreslerin listesi.
- `topics`: `VERİ Dizisi`, - (isteğe bağlı) 32 Baytlık `VERİ` konuları dizisi. Konular sıraya bağlıdır. Her konu, "veya" seçenekleriyle birlikte bir VERİ dizisi de olabilir.
- `blockHash`: `VERİ`, 32 Bayt - (isteğe bağlı, **gelecek**) EIP-234'ün eklenmesiyle, `blockHash`, döndürülen günlükleri 32 baytlık karma `blockHash` ile tek bir blokla kısıtlayan yeni bir filtre seçeneği olacaktır. `blockHash` kullanmak, `fromBlock` = `toBlock` = `blockHash` karmasına sahip blok numarası ile eşdeğerdir. Filtre kriterlerinde `blockHash` mevcutsa, ne `fromBlock` ne de `toBlock`'a izin verilmez.

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
Bkz. [eth_getFilterChanges](#eth_getfilterchanges)

**Örnek**

```js
// İstek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

Sonuç bkz. [eth_getFilterChanges](#eth_getfilterchanges)

## Kullanım Örneği {#usage-example}

### JSON_RPC kullanarak bir sözleşme dağıtma {#deploying-contract}

Bu bölüm, yalnızca RPC arayüzünü kullanarak bir sözleşmenin nasıl dağıtılacağının gösterimini içerir. Bu karmaşıklığın soyutlandığı, sözleşmeleri dağıtmak için alternatif yollar vardır — örneğin, [web3.js](https://web3js.readthedocs.io/) ve [web3.py](https://github.com/ethereum/web3.py) gibi RPC arayüzünün üzerine kurulu kütüphaneleri kullanmak. Bu soyutlamaların anlaşılması genellikle daha kolaydır ve hataya karşı daha korumalıdır, ancak kaputun altında neler oldup bittiğini anlamak yine de yardımcı olur.

Aşağıdaki, JSON-RPC arayüzü kullanılarak bir Ethereum düğümüne dağıtılacak olan `Multiply7` adlı basit bir akıllı sözleşmedir. Bu öğretici, okuyucunun zaten bir Geth düğümü çalıştırdığını varsayar. Düğümler ve istemciler hakkında daha fazla bilgiye [buradan](/developers/docs/nodes-and-clients/run-a-node) ulaşabilirsiniz. Geth olmayan istemciler için HTTP JSON-RPC'nin nasıl başlatılacağını görmek için lütfen bireysel [istemci](/developers/docs/nodes-and-clients/) belgelerine bakın. Çoğu istemci, varsayılan olarak `localhost:8545` üzerinde hizmet verir.

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

Arayüzün çalıştığını, coinbase adresini (hesaplar dizisinden ilk adresi alarak) ve bakiyeyi [curl](https://curl.se) kullanarak alarak doğrulayabiliriz. Lütfen bu örneklerdeki verilerin yerel düğümünüzde farklılık göstereceğini unutmayın. Bu komutları denemek istiyorsanız, ikinci kıvrılma isteğindeki istek paragraflarını ilkinden döndürülen sonuçla değiştirin.

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[], "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

Sayılar on altılık kodlandığından, bakiye wei'de on altılılık bir dize olarak döndürülür. Ether'de bir sayı olarak bakiyeye sahip olmak istiyorsak, Geth konsolundan web3'ü kullanabiliriz.

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

Artık özel geliştirme zincirimizde bir miktar ether olduğuna göre sözleşmeyi dağıtabiliriz. İlk adım, Multiply7 sözleşmesini EVM'ye gönderilebilecek bayt kodunu derlemektir. Solidity derleyicisi olan solc'u kurmak için [Solidity belgelerini](https://docs.soliditylang.org/en/latest/installing-solidity.html) takip edin. (Örneğimizde kullanılan derleyici sürümüyle ([v0.4.20](https://github.com/ethereum/solidity/releases/tag/v0.4.20)) eşleşmesi için daha eski bir `solc` sürümü kullanmak isteyebilirsiniz.)

Bir sonraki adım, Multiply7 sözleşmesini EVM'ye gönderilebilecek bayt koduna derlemektir.

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

Artık derlenmiş koda sahip olduğumuza göre, onu dağıtmanın ne kadar gaza mal olacağını belirlememiz gerekiyor. RPC arayüzünde bize bir tahmin verecek bir `eth_estimateGas` metodu mevcuttur.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

Ve son olarak sözleşmeyi dağıtın.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

İşlem, düğüm tarafından kabul edilir ve bir işlem karması döndürülür. Bu karma, işlemi takip etmek için kullanılabilir. Bir sonraki adım, sözleşmemizin dağıtıldığı adresi belirlemektir. Gerçekleştirilen her işlemi bir makbuz oluşturacaktır. Bu makbuz, işlemin hangi bloka dahil olduğu ve ESM tarafından ne kadar gaz kullanıldığı gibi işlemle ilgili çeşitli bilgileri içerir. Bir işlem bir sözleşme oluşturuyorsa, sözleşme adresini de içerecektir. `eth_getTransactionReceipt` RPC metoduyla makbuzu alabiliriz.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

Sözleşmemiz `0x4d03d617d700cf81935d7f797f4e2ae719648262` üzerinde oluşturuldu. Makbuz yerine boş bir sonuç, işlemin henüz bir bloğa dahil edilmediği anlamına gelir. Bir dakika bekleyin ve fikir birliği istemcinizin çalışıp çalışmadığını kontrol edip tekrar deneyin.

#### Akıllı sözleşmelerle etkileşim {#interacting-with-smart-contract}

Bu örnekte, `eth_sendTransaction` kullanarak sözleşmenin `multiply` metoduna bir işlem göndereceğiz.

`eth_sendTransaction` özellikle `from`, `to` ve `data` olmak üzere birkaç argüman gerektirir. `From` hesabımızın genel adresidir ve `to` da sözleşme adresidir. `data` argümanı, hangi metodun hangi argümanlarla çağrılması gerektiğini tanımlayan bir yük içerir. İşte bu noktada [ABI (uygulama ikili arayüzü)](https://docs.soliditylang.org/en/latest/abi-spec.html) devreye giriyor. ABI, EVM için verilerin nasıl tanımlanacağını ve kodlanacağını tanımlayan bir JSON dosyasıdır.

Yükün baytları, sözleşmedeki hangi yöntemin çağrılacağını tanımlar. Bu, fonksiyon adı ve argüman türleri üzerindeki Keccak karma değerinin ilk 4 baytıdır ve on altılık şekilde kodlanmıştır. Çarpma fonksiyonu, uint256 için bir takma ad olan uint'i kabul eder. Bu, bize şunu bırakır:

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

Bir sonraki adım, argümanları kodlamaktır. Yalnızca bir uint256 var, diyelim ki değeri 6. ABI, uint256 türlerinin nasıl kodlanacağını belirten bir bölüme sahiptir.

`int<M>: enc(X)`, X'in büyük endian ikinin tümleyeni kodlamasıdır, yüksek dereceli (sol) tarafta negatif X için 0xff ve uzunluk 32 baytın katı olacak şekilde pozitif X için sıfır baytlarla doldurulmuştur.

Bu, `0000000000000000000000000000000000000000000000000000000000000006` olarak kodlanır.

Fonksiyon seçiciyi ve kodlanmış argümanı birleştirdiğimizde verilerimiz `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006` olacaktır.

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

Makbuz, bir günlük içerir. Bu günlük, işlem yürütülürken EVM tarafından oluşturulur ve makbuza dahil edilir. `multiply` fonksiyonu, `Print` olayının girdinin 7 katı ile tetiklendiğini gösterir. `Print` olayının argümanı bir uint256 olduğundan, bunu ABI kurallarına göre çözebiliriz ve bu da bize beklenen ondalık sayı 42'yi verir. Verilerin yanı sıra, günlüğü hangi olayın oluşturduğunu belirlemek için konuların kullanılabileceğini belirtmekte fayda vardır:

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

Bu, JSON-RPC'nin doğrudan kullanımını gösteren en yaygın görevlerden bazılarına kısa bir giriş niteliğindeydi.

## Alakalı başlıklar {#related-topics}

- [JSON-RPC spesifikasyonu](http://www.jsonrpc.org/specification)
- [Düğümler ve istemciler](/developers/docs/nodes-and-clients/)
- [JavaScript API'leri](/developers/docs/apis/javascript/)
- [Arka uç API'leri](/developers/docs/apis/backend/)
- [Yürütme istemcileri](/developers/docs/nodes-and-clients/#execution-clients)
