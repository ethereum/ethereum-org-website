---
title: "Merkle Patricia Ağacı"
description: "Merkle Patricia Ağacına giriş."
lang: tr
sidebarDepth: 2
---

[Ethereum](/) durumu (tüm hesapların, bakiyelerin ve akıllı sözleşmelerin bütünü), bilgisayar bilimlerinde genel olarak Merkle Ağacı olarak bilinen veri yapısının özel bir sürümüne kodlanır. Bu yapı, kriptografideki birçok uygulama için faydalıdır çünkü ağaçta birbirine dolanmış tüm bireysel veri parçaları arasında doğrulanabilir bir ilişki yaratır ve veriler hakkında bir şeyleri kanıtlamak için kullanılabilecek tek bir **kök** (root) değeriyle sonuçlanır.

Ethereum'un veri yapısı, PATRICIA'nın (Alfanümerik Olarak Kodlanmış Bilgileri Geri Almak İçin Pratik Algoritma - Practical Algorithm To Retrieve Information Coded in Alphanumeric) bazı özelliklerini ödünç aldığı ve Ethereum durumunu oluşturan öğelerin verimli bir şekilde geri alınması (re**trie**val) için tasarlandığı için bu şekilde adlandırılan 'değiştirilmiş bir Merkle-Patricia Ağacı'dır.

Bir Merkle-Patricia ağacı deterministiktir ve kriptografik olarak doğrulanabilir: Bir durum kökü oluşturmanın tek yolu, onu durumun her bir parçasından hesaplamaktır ve tamamen aynı olan iki durum, kök hash'i ve ona yol açan hash'ler karşılaştırılarak kolayca kanıtlanabilir (_bir Merkle kanıtı_). Aksine, aynı kök hash'ine sahip iki farklı durum yaratmanın hiçbir yolu yoktur ve durumu farklı değerlerle değiştirme girişimi farklı bir durum kök hash'i ile sonuçlanacaktır. Teorik olarak bu yapı, eklemeler, aramalar ve silmeler için `O(log(n))` verimliliğinin 'kutsal kasesini' sağlar.

Yakın gelecekte Ethereum, gelecekteki protokol iyileştirmeleri için birçok yeni olasılığın kapısını açacak olan bir [Verkle Ağacı](/roadmap/verkle-trees) yapısına geçmeyi planlamaktadır.

## Ön Koşullar {#prerequisites}

Bu sayfayı daha iyi anlamak için [hash'ler](https://en.wikipedia.org/wiki/Hash_function), [Merkle ağaçları](https://en.wikipedia.org/wiki/Merkle_tree), [trie'ler](https://en.wikipedia.org/wiki/Trie) ve [serileştirme](https://en.wikipedia.org/wiki/Serialization) hakkında temel bilgiye sahip olmak faydalı olacaktır. Bu makale, temel bir [radix ağacının](https://en.wikipedia.org/wiki/Radix_tree) açıklamasıyla başlar, ardından Ethereum'un daha optimize edilmiş veri yapısı için gerekli değişiklikleri kademeli olarak tanıtır.

## Temel radix trie'leri {#basic-radix-tries}

Temel bir radix trie'sinde, her düğüm aşağıdaki gibi görünür:

```
[i_0, i_1 ... i_n, value]
```

Burada `i_0 ... i_n` alfabenin sembollerini (genellikle ikili veya onaltılı) temsil eder, `value` düğümdeki terminal değeridir ve `i_0, i_1 ... i_n` slotlarındaki değerler ya `NULL` ya da diğer düğümlere işaretçilerdir (bizim durumumuzda, hash'leridir). Bu, temel bir `(key, value)` deposu oluşturur.

Diyelim ki bir anahtar değer çiftleri kümesi üzerinde bir sırayı kalıcı kılmak için bir radix ağacı veri yapısı kullanmak istediniz. Trie'de şu anda `dog` anahtarıyla eşlenen değeri bulmak için, önce `dog`'u alfabenin harflerine dönüştürürsünüz (`64 6f 67` elde edersiniz) ve ardından değeri bulana kadar bu yolu izleyerek trie'den aşağı inersiniz. Yani, trie'nin kök düğümünü bulmak için düz bir anahtar/değer veritabanında kök hash'ini arayarak başlarsınız. Bu, diğer düğümlere işaret eden bir anahtarlar dizisi olarak temsil edilir. Bir alt seviyedeki düğümü elde etmek için `6` endeksindeki değeri bir anahtar olarak kullanır ve düz anahtar/değer veritabanında ararsınız. Ardından bir sonraki değeri aramak için `4` endeksini seçer, sonra `6` endeksini seçer ve bu şekilde devam edersiniz, ta ki `root -> 6 -> 4 -> 6 -> 15 -> 6 -> 7` yolunu izledikten sonra düğümün değerini arayıp sonucu döndürene kadar.

'Trie' içinde bir şey aramak ile altta yatan düz anahtar/değer 'veritabanı' (DB) içinde aramak arasında bir fark vardır. Her ikisi de anahtar/değer düzenlemelerini tanımlar, ancak altta yatan veritabanı bir anahtarın geleneksel 1 adımlı aramasını yapabilir. Trie'de bir anahtar aramak, yukarıda açıklanan nihai değere ulaşmak için birden fazla temel veritabanı araması gerektirir. Belirsizliği ortadan kaldırmak için ikincisine `path` diyelim.

Radix trie'leri için güncelleme ve silme işlemleri aşağıdaki gibi tanımlanabilir:

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

Bir "Merkle" Radix ağacı, deterministik olarak oluşturulmuş kriptografik hash özetleri kullanılarak düğümlerin birbirine bağlanmasıyla inşa edilir. Bu içerik adresleme (anahtar/değer veritabanında `key == keccak256(rlp(value))`), depolanan verilerin kriptografik bütünlük garantisini sağlar. Belirli bir trie'nin kök hash'i herkesçe biliniyorsa, altta yatan yaprak verilerine erişimi olan herkes, belirli bir değeri ağaç köküne bağlayan her bir düğümün hash'lerini sağlayarak trie'nin belirli bir yolda belirli bir değeri içerdiğine dair bir kanıt oluşturabilir.

Kök hash'i nihayetinde altındaki tüm hash'lere dayandığından, bir saldırganın var olmayan bir `(path, value)` çiftinin kanıtını sunması imkansızdır. Altta yatan herhangi bir değişiklik kök hash'ini değiştirecektir. Hash'i, hashleme fonksiyonunun ön görüntü korumasıyla güvence altına alınmış, veriler hakkındaki yapısal bilgilerin sıkıştırılmış bir temsili olarak düşünebilirsiniz.

Bir radix ağacının atomik birimine (örneğin, tek bir onaltılı karakter veya 4 bitlik ikili sayı) "nibble" diyeceğiz. Yukarıda açıklandığı gibi bir yolu her seferinde bir nibble olarak geçerken, düğümler en fazla 16 çocuğa başvurabilir ancak bir `value` öğesi içerir. Bu nedenle, onları 17 uzunluğunda bir dizi olarak temsil ediyoruz. Bu 17 elemanlı dizilere "dal düğümleri" diyoruz.

## Merkle Patricia Ağacı {#merkle-patricia-trees}

Radix trie'lerinin önemli bir sınırlaması vardır: verimsizdirler. Ethereum'da olduğu gibi yolun 64 karakter uzunluğunda (`bytes32` içindeki nibble sayısı) olduğu bir `(path, value)` bağlamasını depolamak isterseniz, karakter başına bir seviye depolamak için bir kilobayttan fazla ekstra alana ihtiyacımız olacak ve her arama veya silme işlemi tam 64 adım sürecektir. Aşağıda tanıtılan Patricia ağacı bu sorunu çözmektedir.

### Optimizasyon {#optimization}

Bir Merkle Patricia ağacındaki bir düğüm aşağıdakilerden biridir:

1.  `NULL` (boş dize olarak temsil edilir)
2.  `branch` 17 öğeli bir düğüm `[ v0 ... v15, vt ]`
3.  `leaf` 2 öğeli bir düğüm `[ encodedPath, value ]`
4.  `extension` 2 öğeli bir düğüm `[ encodedPath, key ]`

64 karakterlik yollarla, trie'nin ilk birkaç katmanını geçtikten sonra, en azından yolun bir kısmı için hiçbir farklı yolun bulunmadığı bir düğüme ulaşmanız kaçınılmazdır. Yol boyunca 15'e kadar seyrek `NULL` düğümü oluşturmak zorunda kalmamak için, `encodedPath`'in ileri atlamak için "kısmi yolu" içerdiği (aşağıda açıklanan kompakt bir kodlama kullanarak) ve `key`'in bir sonraki veritabanı araması için olduğu `[ encodedPath, key ]` biçiminde bir `extension` düğümü kurarak inişi kısaltıyoruz.

`encodedPath`'in ilk nibble'ındaki bir bayrakla işaretlenebilen bir `leaf` düğümü için yol, önceki tüm düğümlerin yol parçalarını kodlar ve doğrudan `value` değerini arayabiliriz.

Ancak yukarıdaki bu optimizasyon belirsizliğe yol açar.

Yolları nibble'lar halinde geçerken, geçilecek tek sayıda nibble ile karşılaşabiliriz, ancak tüm veriler `bytes` formatında depolandığı için. Örneğin, `1` nibble'ı ile `01` nibble'ları arasında ayrım yapmak mümkün değildir (her ikisi de `<01>` olarak depolanmalıdır). Tek uzunluğu belirtmek için, kısmi yolun önüne bir bayrak eklenir.

### Spesifikasyon: İsteğe bağlı sonlandırıcı ile onaltılı dizinin kompakt kodlaması {#specification}

Yukarıda açıklandığı gibi hem _tek ve çift kalan kısmi yol uzunluğunun_ hem de _yaprak ve uzantı düğümünün_ işaretlenmesi, herhangi bir 2 öğeli düğümün kısmi yolunun ilk nibble'ında bulunur. Bunlar aşağıdakilerle sonuçlanır:

| onaltılı karakter | bitler | düğüm türü kısmi | yol uzunluğu |
| -------- | ---- | ------------------ | ----------- |
| 0        | 0000 | uzantı             | çift        |
| 1        | 0001 | uzantı             | tek         |
| 2        | 0010 | sonlandırıcı (yaprak) | çift        |
| 3        | 0011 | sonlandırıcı (yaprak) | tek         |

Çift kalan yol uzunluğu için (`0` veya `2`), her zaman başka bir `0` "dolgu" nibble'ı takip edecektir.

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
        # hexarray artık ilk nibble'ı bayraklar olan çift bir uzunluğa sahip.
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

İşte Merkle Patricia ağacında bir düğüm elde etmek için genişletilmiş kod:

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

### Örnek Trie {#example-trie}

Dört yol/değer çifti içeren bir trie istediğimizi varsayalım: `('do', 'verb')`, `('dog', 'puppy')`, `('doge', 'coins')`, `('horse', 'stallion')`.

İlk olarak, hem yolları hem de değerleri `bytes` formatına dönüştürüyoruz. Aşağıda, _yollar_ için gerçek bayt temsilleri `<>` ile gösterilirken, _değerler_ daha kolay anlaşılması için hala `''` ile gösterilen dizeler olarak gösterilmektedir (onlar da aslında `bytes` olacaktır):

```
<64 6f> : 'verb'
    <64 6f 67> : 'puppy'
    <64 6f 67 65> : 'coins'
    <68 6f 72 73 65> : 'stallion'
```

Şimdi, altta yatan veritabanında aşağıdaki anahtar/değer çiftleriyle böyle bir trie oluşturuyoruz:

```
rootHash: [ <16>, hashA ]
    hashA:    [ <>, <>, <>, <>, hashB, <>, <>, <>, [ <20 6f 72 73 65>, 'stallion' ], <>, <>, <>, <>, <>, <>, <>, <> ]
    hashB:    [ <00 6f>, hashC ]
    hashC:    [ <>, <>, <>, <>, <>, <>, hashD, <>, <>, <>, <>, <>, <>, <>, <>, <>, 'verb' ]
    hashD:    [ <17>, [ <>, <>, <>, <>, <>, <>, [ <35>, 'coins' ], <>, <>, <>, <>, <>, <>, <>, <>, <>, 'puppy' ] ]
```

Bir düğüm başka bir düğümün içinde referans gösterildiğinde, dahil edilen şey `keccak256(rlp.encode(node))`'dir, eğer `len(rlp.encode(node)) >= 32` ise aksi takdirde `node` olur, burada `rlp.encode` [RLP](/developers/docs/data-structures-and-encoding/rlp) kodlama fonksiyonudur.

Bir trie'yi güncellerken, yeni oluşturulan düğümün uzunluğu >= 32 _ise_ `(keccak256(x), x)` anahtar/değer çiftini kalıcı bir arama tablosunda saklamak gerektiğine dikkat edin. Ancak, düğüm bundan daha kısaysa, f(x) = x fonksiyonu tersine çevrilebilir olduğundan hiçbir şey saklamaya gerek yoktur.

## Ethereum'daki Trie'ler {#tries-in-ethereum}

Ethereum'un yürütme katmanındaki tüm merkle trie'leri bir Merkle Patricia Ağacı kullanır.

Bir blok başlığından bu trie'lerin 3'ünden gelen 3 kök vardır.

1.  stateRoot
2.  transactionsRoot
3.  receiptsRoot

### Durum Ağacı {#state-trie}

Bir tane küresel durum ağacı vardır ve bir istemci bir bloğu her işlediğinde güncellenir. İçinde, bir `path` her zaman: `keccak256(ethereumAddress)` ve bir `value` her zaman: `rlp(ethereumAccount)` şeklindedir. Daha spesifik olarak bir Ethereum `account`'ı, 4 öğeli bir `[nonce,balance,storageRoot,codeHash]` dizisidir. Bu noktada, bu `storageRoot`'nun başka bir patricia ağacının kökü olduğunu belirtmekte fayda var:

### Depolama Trie'si {#storage-trie}

Depolama trie'si, _tüm_ sözleşme verilerinin yaşadığı yerdir. Her hesap için ayrı bir depolama trie'si vardır. Belirli bir adresteki belirli depolama konumlarındaki değerleri almak için depolama adresi, depolanan verilerin depolamadaki tam sayı konumu ve blok kimliği gereklidir. Bunlar daha sonra JSON-RPC API'sinde tanımlanan `eth_getStorageAt`'ye argüman olarak geçirilebilir, örneğin `0x295a70b2de5e3953354a6a8344e616ed314d7251` adresi için depolama slot 0'daki verileri almak için:

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}

```

Depolamadaki diğer öğeleri almak biraz daha karmaşıktır çünkü önce depolama trie'sindeki konum hesaplanmalıdır. Konum, adresin ve depolama konumunun `keccak256` hash'i olarak hesaplanır ve her ikisi de 32 bayt uzunluğunda olacak şekilde sola sıfırlarla doldurulur. Örneğin, `0x391694e7e0b0cce554cb130d723a9d27458f9298` adresi için depolama slot 1'deki verilerin konumu şöyledir:

```python
keccak256(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```

Bir Geth konsolunda, bu aşağıdaki gibi hesaplanabilir:

```
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Bu nedenle `path` `keccak256(<6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9>)` olur. Bu artık verileri depolama trie'sinden daha önce olduğu gibi almak için kullanılabilir:

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

Not: Bir Ethereum hesabı için `storageRoot`, bir kontrat hesabı değilse varsayılan olarak boştur.

### İşlemler Trie'si {#transaction-trie}

Her blok için ayrı bir işlemler trie'si vardır ve yine `(key, value)` çiftlerini depolar. Buradaki bir yol şöyledir: `rlp(transactionIndex)` ve bu, aşağıdakiler tarafından belirlenen bir değere karşılık gelen anahtarı temsil eder:

```python
if legacyTx:
  value = rlp(tx)
else:
  value = TxType | encode(tx)
```

Bu konuda daha fazla bilgi [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) belgelerinde bulunabilir.

### Makbuzlar Trie'si {#receipts-trie}

Her bloğun kendi Makbuzlar trie'si vardır. Buradaki bir `path` şöyledir: `rlp(transactionIndex)`. `transactionIndex`, dahil edildiği blok içindeki endeksidir. Makbuzlar trie'si asla güncellenmez. İşlemler trie'sine benzer şekilde, mevcut ve eski makbuzlar vardır. Makbuzlar trie'sinde belirli bir makbuzu sorgulamak için, işlemin bloğundaki endeksi, makbuz yükü ve işlem türü gereklidir. Döndürülen makbuz, `TransactionType` ve `ReceiptPayload`'nin birleştirilmesi olarak tanımlanan `Receipt` türünde olabilir veya `rlp([status, cumulativeGasUsed, logsBloom, logs])` olarak tanımlanan `LegacyReceipt` türünde olabilir.

Bu konuda daha fazla bilgi [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) belgelerinde bulunabilir.

## Daha Fazla Okuma {#further-reading}

- [Değiştirilmiş Merkle Patricia Ağacı — Ethereum bir durumu nasıl kaydeder](https://medium.com/codechain/modified-merkle-patricia-trie-how-ethereum-saves-a-state-e6d7555078dd)
- [Ethereum'da Merkle İşlemleri](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum)
- [Ethereum trie'sini anlamak](https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/)