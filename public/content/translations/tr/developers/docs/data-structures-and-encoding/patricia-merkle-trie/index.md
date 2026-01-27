---
title: "Merkle Patricia Dijital Ağacı"
description: "Merkle Patricia Dijital Ağacına Giriş."
lang: tr
sidebarDepth: 2
---

Ethereum'un durumu (tüm hesapların, bakiyelerin ve akıllı sözleşmelerin toplamı), bilgisayar biliminde genel olarak Merkle Ağacı olarak bilinen veri yapısının özel bir versiyonuna kodlanır. Bu yapı, kriptografideki birçok uygulama için kullanışlıdır çünkü ağaca dolanmış tüm bireysel veri parçaları arasında doğrulanabilir bir ilişki oluşturur ve bu da veriler hakkında bir şeyler kanıtlamak için kullanılabilecek tek bir **kök** değeriyle sonuçlanır.

Ethereum'un veri yapısı, PATRICIA'nın (Practical Algorithm To Retrieve Information Coded in Alphanumeric - Alfasayısal Kodlanmış Bilgileri Almak için Pratik Algoritma) bazı özelliklerini ödünç aldığı ve Ethereum durumunu oluşturan öğelerin verimli şekilde veri geri alımı (re**trie**val) için tasarlandığından 'değiştirilmiş Merkle-Patricia Trie'dir.

Bir Merkle-Patricia trie deterministik ve kriptografik olarak doğrulanabilirdir: Bir durum kökü oluşturmanın tek yolu, onu durumun her bir parçasından hesaplamaktır ve aynı olan iki durum, kök karması ve ona yol açan karmalar karşılaştırılarak kolayca kanıtlanabilir (_bir Merkle kanıtı_). Tam tersinden bakacak olursak, aynı kök karmasına sahip iki farklı durum oluşturmak mümkün değildir ve farklı değerlere sahip durumları değiştirme girişimi farklı bir durum kök karmasına yol açar. Teorik olarak, bu yapı eklemeler, aramalar ve silmeler için `O(log(n))` verimliliğinin 'kutsal kasesini' sağlar.

Yakın gelecekte Ethereum, gelecekteki protokol iyileştirmeleri için birçok yeni olasılığın önünü açacak olan bir [Verkle Ağacı](/roadmap/verkle-trees) yapısına geçmeyi planlıyor.

## Ön Koşullar {#prerequisites}

Bu sayfayı daha iyi anlamak için [karmalar](https://en.wikipedia.org/wiki/Hash_function), [Merkle ağaçları](https://en.wikipedia.org/wiki/Merkle_tree), [trie'lar](https://en.wikipedia.org/wiki/Trie) ve [serileştirme](https://en.wikipedia.org/wiki/Serialization) hakkında temel bilgilere sahip olmak faydalı olacaktır. Bu makale, temel bir [radix ağacının](https://en.wikipedia.org/wiki/Radix_tree) tanımıyla başlıyor, ardından Ethereum'un daha optimize edilmiş veri yapısı için gerekli değişiklikleri kademeli olarak tanıtıyor.

## Temel radix trie'lar {#basic-radix-tries}

Temel bir taban dijital ağacında her düğüm aşağıdaki şekilde görünür:

```
    [i_0, i_1 ... i_n, value]
```

Burada `i_0 ...` `i_n` alfabenin sembollerini (genellikle ikili veya onaltılık) temsil eder, `value` düğümdeki terminal değerdir ve `i_0, i_1 ...` içindeki değerler `i_n` yuvaları ya `NULL` ya da diğer düğümlere yönelik işaretçilerdir (bizim durumumuzda, karmalarıdır). Bu, temel bir `(anahtar, değer)` deposu oluşturur.

Bir dizi anahtar değer çiftinin tabi olduğu sıralamayı sürdürmek için bir taban ağaç veri yapısını kullanmak istediğinizi varsayalım. Trie'da `dog` anahtarıyla eşleştirilmiş geçerli değeri bulmak için, önce `dog` kelimesini alfabe harflerine dönüştürür (`64 6f 67` vererek) ve ardından değeri bulana kadar bu yolu izleyerek trie'dan aşağı inersiniz. Diğer bir deyişle, dijital ağacın kök düğümünü bulmak için kök karmasını düz bir anahtar/değer veritabanında arayarak başlayın. Kök düğüm, diğer düğümlere işaret eden bir dizi anahtar olarak gösterilir. `6` dizinindeki değeri bir anahtar olarak kullanır ve düğümü bir seviye aşağı indirmek için düz anahtar/değer veritabanında aratırsınız. Ardından bir sonraki değere bakmak için `4` dizinini, sonra `6` dizinini seçersiniz ve bu böyle devam eder, ta ki şu yolu izleyene kadar: `root -> 6 -> 4 -> 6 -> 15 -> 6 -> 7`, düğümün değerine bakar ve sonucu döndürürsünüz.

"Dijital ağaçta" bir şeye bakmak ile altta yatan düz anahtar/değer "veritabanı" arasında bir fark vardır. Her ikisi de anahtar/değer düzenlemelerini tanımlasa da temel veritabanı, bir anahtarın geleneksel 1 adımlık aramasını yapabilir. Dijital ağaçtaki bir anahtara bakmak, yukarıda açıklanan son değere ulaşmak için birden çok temel veritabanı araması yapılmasını gerektirir. Belirsizliği ortadan kaldırmak için ikincisine `yol` diyelim.

Taban dijital ağaçları için güncelleme ve silme işlemleri aşağıdaki gibi tanımlanabilir:

```python
    def update(node_hash, path, value):
        curnode = db.get(node_hash) if node_hash else [NULL] * 17
        newnode = curnode.copy()
        if path == "":
            newnode[-1] = value
        else:
            newindex = update(curnode[path[0]], path[1:], value)
            newnode[path[0]] = newindex
        db.put(hash(newnode), newnode)
        return hash(newnode)

    def delete(node_hash, path):
        if node_hash is NULL:
            return NULL
        else:
            curnode = db.get(node_hash)
            newnode = curnode.copy()
            if path == "":
                newnode[-1] = NULL
            else:
                newindex = delete(curnode[path[0]], path[1:])
                newnode[path[0]] = newindex

            if all(x is NULL for x in newnode):
                return NULL
            else:
                db.put(hash(newnode), newnode)
                return hash(newnode)
```

Bir "Merkle" Taban ağacı, düğümleri birbirine bağlayıp deterministik olarak oluşturulmuş kriptografik karma özetlerini kullanarak oluşturulur. Bu içerik adresleme (anahtar/değer veritabanında `key == keccak256(rlp(value))`) depolanan veriler için kriptografik bir bütünlük garantisi sağlar. Belli bir dijital ağacın kök karmasının herkesçe bilinmesi durumunda, alttaki yaprak verilere erişimi olan herkes, belirli bir değeri ağaç köküne ekleyen her düğümün karmasını sağlayarak dijital ağacın belirli bir yol üzerinde bir değeri içerdiğine dair kanıt oluşturabilir.

Kök karması nihayetinde altındaki tüm karmalara dayandığından, bir saldırganın var olmayan bir `(yol, değer)` çiftinin kanıtını sunması imkansızdır. Temelde yapılacak herhangi bir değişiklik kök karmasını değiştirecektir. Karmayı, veri hakkındaki yapısal bilgilerin, karma işlevinin ön görüntü koruması ile güvence altına alınan sıkıştırılmış bir gösterimi olarak düşünebilirsiniz.

Bir radix ağacının atomik bir birimine (örneğin, tek bir onaltılık karakter veya 4 bitlik ikili sayı) "nibble" diyeceğiz. Yukarıda açıklandığı gibi, bir yolu her seferinde bir nibble ilerleyerek geçerken, düğümler en fazla 16 alt öğeye başvurabilir ancak bir `değer` öğesi de içerebilir. Bu nedenle onları, uzunluğu 17 olan bir dizi olarak gösteririz. 17 öğeli bu dizileri "dal düğümleri" olarak adlandırıyoruz.

## Merkle Patricia Trie {#merkle-patricia-trees}

Taban dijital ağaçları, büyük bir kısıtlamaya tabidir: bu ağaçlar verimsizdir. Ethereum'da olduğu gibi, yolun 64 karakter uzunluğunda olduğu (`bytes32` içindeki nibble sayısı) bir `(yol, değer)` bağlamasını saklamak isterseniz, karakter başına bir seviye depolamak için bir kilobayttan fazla ekstra alana ihtiyacınız olacaktır ve her arama veya silme işlemi tam 64 adım sürecektir. Aşağıda açıklanan Patricia dijital ağacı bu sorunu çözer.

### Optimizasyon {#optimization}

Merkle Patricia dijital ağacındaki bir düğüm aşağıdaki şekillerden biri gibi gözükür:

1. `NULL` (boş dize olarak temsil edilir)
2. `dal` 17 öğeli bir düğüm `[ v0 ...` `v15, vt ]`
3. `yaprak` 2 öğeli bir düğüm `[ encodedPath, value ]`
4. `uzantı` 2 öğeli bir düğüm `[ encodedPath, key ]`

64 karakterlik yollar sayesinde dijital ağacın ilk birkaç katmanını geçtikten sonra, aşağı inerken yolun en azından bir kısmında ayrılan yolun bulunmadığı bir düğüme ulaşmanız kaçınılmazdır. Yol boyunca 15'e kadar seyrek `NULL` düğüm oluşturmaktan kaçınmak için, `[ encodedPath, key ]` biçiminde bir `uzantı` düğümü kurarak inişi kısaltırız; burada `encodedPath` ileri atlamak için "kısmi yolu" içerir (aşağıda açıklanan sıkıştırılmış bir kodlama kullanılarak) ve `anahtar` sonraki veritabanı araması içindir.

`encodedPath`'in ilk nibble'ındaki bir bayrakla işaretlenebilen bir `yaprak` düğüm için, yol önceki tüm düğümün yol parçalarını kodlar ve `değeri` doğrudan arayabiliriz.

Bununla birlikte, yukarıdaki optimizasyondan iki anlam çıkıyor.

Yolları nibble'lar halinde geçerken, geçilecek tek sayıda nibble ile karşılaşabiliriz, ancak tüm veriler `bayt` formatında saklandığı için. Örneğin, `1` nibble'ı ile `01` nibble'larını (her ikisi de `<01>` olarak saklanmalıdır) ayırt etmek mümkün değildir. Tek sayıda uzunluğu belirtmek için kısmi yola önek olarak bir bayrak verilir.

### Belirtim: İsteğe bağlı sonlandırıcılı onaltılık dizinin sıkıştırılmış kodlaması {#specification}

Yukarıda açıklandığı gibi, hem _tek ve çift kalan kısmi yol uzunluğu_ hem de _yaprak ve uzantı düğümü_ işaretlemesi, herhangi bir 2 öğeli düğümün kısmi yolunun ilk nibble'ında bulunur. Bu, aşağıdaki sonuçları verir:

| onaltılık karakter | bitler | düğüm türü                               | yol uzunluğu |
| ------------------ | ------ | ---------------------------------------- | ------------ |
| 0                  | 0000   | uzantı                                   | çift         |
| 1                  | 0001   | uzantı                                   | tek          |
| 2                  | 0010   | sonlandırıcı (yaprak) | çift         |
| 3                  | 0011   | sonlandırıcı (yaprak) | tek          |

Kalan yol uzunluğu çift olduğunda (`0` veya `2`), bunu her zaman başka bir `0` "dolgu" nibble'ı takip edecektir.

```python
    def compact_encode(hexarray):
        term = 1 if hexarray[-1] == 16 else 0
        if term:
            hexarray = hexarray[:-1]
        oddlen = len(hexarray) % 2
        flags = 2 * term + oddlen
        if oddlen:
            hexarray = [flags] + hexarray
        else:
            hexarray = [flags] + [0] + hexarray
        # hexarray now has an even length whose first nibble is the flags.
        o = ""
        for i in range(0, len(hexarray), 2):
            o += chr(16 * hexarray[i] + hexarray[i + 1])
        return o
```

Örnekler:

```python
    > [1, 2, 3, 4, 5, ...]
    '11 23 45'
    > [0, 1, 2, 3, 4, 5, ...]
    '00 01 23 45'
    > [0, f, 1, c, b, 8, 10]
    '20 0f 1c b8'
    > [f, 1, c, b, 8, 10]
    '3f 1c b8'
```

Merkle Patricia dijital ağacında bir düğüm almak için genişletilmiş kod:

```python
    def get_helper(node_hash, path):
        if path == []:
            return node_hash
        if node_hash == "":
            return ""
        curnode = rlp.decode(node_hash if len(node_hash) < 32 else db.get(node_hash))
        if len(curnode) == 2:
            (k2, v2) = curnode
            k2 = compact_decode(k2)
            if k2 == path[: len(k2)]:
                return get(v2, path[len(k2) :])
            else:
                return ""
        elif len(curnode) == 17:
            return get_helper(curnode[path[0]], path[1:])

    def get(node_hash, path):
        path2 = []
        for i in range(len(path)):
            path2.push(int(ord(path[i]) / 16))
            path2.push(ord(path[i]) % 16)
        path2.push(16)
        return get_helper(node_hash, path2)
```

### Trie Örneği {#example-trie}

Dört yol/değer çifti içeren bir trie istediğimizi varsayalım: `('do', 'verb')`, `('dog', 'puppy')`, `('doge', 'coins')`, `('horse', 'stallion')`.

İlk olarak hem yolları hem de değerleri `bayt`'a dönüştürürüz. Aşağıda, _yollar_ için gerçek bayt gösterimleri `<>` ile belirtilirken, _değerler_ daha kolay anlaşılması için hâlâ `''` ile belirtilen dizeler olarak gösterilmektedir (onlar da aslında `bayt` olacaktır):

```
    <64 6f> : 'verb'
    <64 6f 67> : 'puppy'
    <64 6f 67 65> : 'coins'
    <68 6f 72 73 65> : 'stallion'
```

Şimdi, temel veritabanında aşağıdaki anahtar/değer çiftleriyle böyle bir dijital ağaç oluşturuyoruz:

```
    rootHash: [ <16>, hashA ]
    hashA:    [ <>, <>, <>, <>, hashB, <>, <>, <>, [ <20 6f 72 73 65>, 'stallion' ], <>, <>, <>, <>, <>, <>, <>, <> ]
    hashB:    [ <00 6f>, hashC ]
    hashC:    [ <>, <>, <>, <>, <>, <>, hashD, <>, <>, <>, <>, <>, <>, <>, <>, <>, 'verb' ]
    hashD:    [ <17>, [ <>, <>, <>, <>, <>, <>, [ <35>, 'coins' ], <>, <>, <>, <>, <>, <>, <>, <>, <>, 'puppy' ] ]
```

Bir düğüme başka bir düğüm içinde referans verildiğinde, dahil edilen şey, eğer `len(rlp.encode(node)) >= 32` ise `keccak256(rlp.encode(node))`, değilse `node`'dur; burada `rlp.encode` [RLP](/developers/docs/data-structures-and-encoding/rlp) kodlama işlevidir.

Bir trie'ı güncellerken, yeni oluşturulan düğümün uzunluğu >= 32 _ise_, `(keccak256(x), x)` anahtar/değer çiftini kalıcı bir arama tablosunda saklamak gerektiğini unutmayın. Bununla birlikte düğüm bundan daha kısaysa, f (x) = x işlevi tersine çevrilebilir olduğundan hiçbir şeyin depolanmasına gerek yoktur.

## Ethereum'daki Trie'lar {#tries-in-ethereum}

Ethereum'ün yürütüm katmanındaki tüm merkle ağaçları, Merkle Patricia Dijital Ağacını kullanır.

Bir blok başlığında bu dijital ağaçların 3'ünden 3 kök vardır.

1. durumKökü (stateRoot)
2. işlemKökü (transactionsRoot)
3. makbuzKökü (receiptsRoot)

### Durum Trie'ı {#state-trie}

Bir adet genel durum dijital ağacı vardır ve bu, bir istemci bir bloğu her işlediğinde güncellenir. İçinde bir `yol` her zaman `keccak256(ethereumAddress)` ve bir `değer` her zaman `rlp(ethereumAccount)`'dır. Daha spesifik olarak bir Ethereum `hesabı`, 4 öğeli bir `[nonce,balance,storageRoot,codeHash]` dizisidir. Bu noktada, bu `storageRoot`'un başka bir patricia trie'ının kökü olduğunu belirtmekte fayda var:

### Depolama Trie'ı {#storage-trie}

Depolama trie'ı _tüm_ sözleşme verilerinin bulunduğu yerdir. Her bir hesap için ayrı bir depolama dijital ağacı vardır. Verilen bir adresteki belirli depolama konumlarındaki değerleri alabilmek için depolama adresi, depoda depolanan verilerin tam sayı konumu ve blok kimliği gereklidir. Bunlar daha sonra JSON-RPC API'sinde tanımlanan `eth_getStorageAt`'e argüman olarak aktarılabilir, ör. `0x295a70b2de5e3953354a6a8344e616ed314d7251` adresi için depolama yuvası 0'daki verileri almak için:

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

Depolama alanındaki diğer öğelerin alınması biraz daha karmaşıktır çünkü ilk önce depolama alanındaki konumun hesaplanması gerekir. Konum, adresin ve depolama konumunun `keccak256` karması olarak hesaplanır, her ikisi de 32 bayt uzunluğa ulaşacak şekilde başlarına sıfır eklenir. Örneğin, `0x391694e7e0b0cce554cb130d723a9d27458f9298` adresi için depolama yuvası 1'deki verilerin konumu şöyledir:

```python
keccak256(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```

Geth konsolunda bu aşağıdaki şekilde hesaplanabilir:

```
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Bu nedenle `yol`, `keccak256(<6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9>)`'dır. Bu, artık daha önce olduğu gibi verileri depolama ağacından almak için kullanılabilir:

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

Not: Bir Ethereum hesabının `storageRoot`'u, bir sözleşme hesabı değilse varsayılan olarak boştur.

### İşlemler Trie'ı {#transaction-trie}

Her blok için ayrı bir işlemler trie'ı bulunur ve bu da yine `(anahtar, değer)` çiftlerini saklar. Buradaki bir yol, `rlp(transactionIndex)`'tir ve bu, şu şekilde belirlenen bir değere karşılık gelen anahtarı temsil eder:

```python
if legacyTx:
  value = rlp(tx)
else:
  value = TxType | encode(tx)
```

Bununla ilgili daha fazla bilgi [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718) belgelerinde bulunabilir.

### Makbuzlar Trie'ı {#receipts-trie}

Her bloğun kendi makbuz dijital ağacı vardır. Buradaki bir `yol`: `rlp(transactionIndex)`'dir. `transactionIndex`, dahil edildiği blok içindeki dizinidir. Makbuz dijital ağacı hiçbir zaman güncellenmez. İşlemler dijital ağacına benzer şekilde güncel ve eski makbuzlar mevcuttur. Makbuzlar dijital ağacı içerisinde belirli bir makbuzu sorgulamak için bloktaki işlemin indeksi, makbuz yükü ve işlem türü gereklidir. Döndürülen makbuz, `TransactionType` ve `ReceiptPayload`'un birleşimi olarak tanımlanan `Receipt` türünde veya `rlp([status, cumulativeGasUsed, logsBloom, logs])` olarak tanımlanan `LegacyReceipt` türünde olabilir.

Bununla ilgili daha fazla bilgi [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718) belgelerinde bulunabilir.

## Ek Okumalar {#further-reading}

- [Değiştirilmiş Merkle Patricia Trie — Ethereum bir durumu nasıl kaydeder](https://medium.com/codechain/modified-merkle-patricia-trie-how-ethereum-saves-a-state-e6d7555078dd)
- [Ethereum'da Merkle'lama](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum/)
- [Ethereum trie'ını anlama](https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/)
