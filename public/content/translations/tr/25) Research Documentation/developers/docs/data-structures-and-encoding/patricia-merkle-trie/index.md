---
title: Merkle Patricia Dijital Ağacı
description: Merkle Patricia Dijital Ağacına Giriş.
lang: tr
sidebarDepth: 2
---

Ethereum'un durumu (tüm hesapların, bakiyelerin ve akıllı sözleşmelerin toplamı), bilgisayar biliminde genel olarak Merkle Ağacı olarak bilinen veri yapısının özel bir versiyonuna kodlanır. Bu yapı, kriptografideki birçok uygulama için kullanışlıdır. Çünkü ağaca dolanmış tüm bireysel veri parçaları arasında doğrulanabilir bir ilişki oluşturur ve bu da, veriler hakkında bir şeyler kanıtlamak için kullanılabilecek tek bir **kök** değeriyle sonuçlanır.

Ethereum'un veri yapısı PATRICIA'nın (Alfasayısal Kodlanmış Bilgileri Almak için Pratik Algoritma) bazı özelliklerini ödünç aldığı ve Ethereum durumunu oluşturan öğelerin verimli şekilde veri alımı (re**trie**val) için tasarlandığından "değiştirilmiş Merkle-Patricia Trie"dir.

Merkle-Patricia trie, kesin ve kriptografik olarak doğrulanabilirdir: Bir durum kökü üretmenin tek yolu, onu durumun her bir parçasından hesaplamaktır ve aynı olan iki durum, kök karması ve ona yol açan karmalar karşılaştırılarak kolayca kanıtlanabilir (_bir Merkle ispatı_). Tam tersinden bakacak olursak, aynı kök karmasına sahip iki farklı durum oluşturmak mümkün değildir ve farklı değerlere sahip durumları değiştirme girişimi farklı bir durum kök karmasına yol açar. Teorik olarak bu yapı, eklemeler, aramalar ve silmeler için `O(log(n))` verimliliğinin "kutsal kasesini" sağlar.

Ethereum, yakın gelecekte olası protokol geliştirmeleri açısından birçok fırsat yaratacak olan [Verkle Ağacı](https://ethereum.org/en/roadmap/verkle-trees) yapısına geçmeyi düşünüyor.

## Ön koşullar {#prerequisites}

Bu sayfayı daha iyi anlamak için [karmalar](https://en.wikipedia.org/wiki/Hash_function), [Merkle ağaçları](https://en.wikipedia.org/wiki/Merkle_tree), [tries](https://en.wikipedia.org/wiki/Trie) ve [serileştirme](https://en.wikipedia.org/wiki/Serialization) hakkında temel düzeyde bilgi sahibi olmak faydalı olabilir. Bu makale, temel bir [dijital ağacın](https://en.wikipedia.org/wiki/Radix_tree) tanımıyla başlıyor, ardından Ethereum'un daha optimize edilmiş veri yapısı için gerekli değişiklikleri aşamalı olarak tanıtıyor.

## Temel taban dijital ağaçları {#basic-radix-tries}

Temel bir taban dijital ağacında her düğüm aşağıdaki şekilde görünür:

```
    [i_0, i_1 ... i_n, value]
```

Burada `i_0 ... i_n`, alfabenin sembollerini (genellikle ikili veya altılı) temsil eder; `value`, düğümdeki terminal değerdir ve `i_0, i_1 ... i_n` yuvalarındaki değerler ya `NULL` veya diğer düğümlerin (bizim durumumuzda, karmaları) işaretçilerdir. Bu, temel düzeyde bir `(key, value)` deposunu oluşturur.

Bir dizi anahtar değer çiftinin tabi olduğu sıralamayı sürdürmek için bir taban ağaç veri yapısını kullanmak istediğinizi varsayalım. Örneğin, dijital ağaçta şu anda `dog` anahtarı ile eşlenen değeri bulmak istiyorsanız, önce `dog` anahtarını alfabenin harflerine dönüştürün (`64 6f 67` değerini vererek) ve ardından değeri bulana kadar bu yolu takip ederek dijital ağaçtan aşağı doğru inin. Diğer bir deyişle, dijital ağacın kök düğümünü bulmak için kök karmasını düz bir anahtar/değer veritabanında arayarak başlayın. Kök düğüm, diğer düğümlere işaret eden bir dizi anahtar olarak gösterilir. Dizin `6`'daki değeri bir anahtar olarak kullanın ve düğümü bir seviye aşağı çekmek için düz anahtar/değer veritabanına bakın. Daha sonra bir sonraki değere bakmak için dizin `4`'ü seçin, ardından dizin `6`'yı seçin ve şu yolu izleyene kadar bu şekilde devam edin: `root -> 6 -> 4 -> 6 -> 15 -> 6 -> 7`, düğümün değerine bakın ve sonucu döndürün.

"Dijital ağaçta" bir şeye bakmak ile altta yatan düz anahtar/değer "veritabanı" arasında bir fark vardır. Her ikisi de anahtar/değer düzenlemelerini tanımlasa da temel veritabanı, bir anahtarın geleneksel 1 adımlık aramasını yapabilir. Dijital ağaçtaki bir anahtara bakmak, yukarıda açıklanan son değere ulaşmak için birden çok temel veritabanı araması yapılmasını gerektirir. Belirsizliği ortadan kaldırmak için gelin ikincisine `path` adını verelim.

Taban dijital ağaçları için güncelleme ve silme işlemleri aşağıdaki gibi tanımlanabilir:

```
    def update(node,path,value):
        curnode = db.get(node) if node else [ NULL ] * 17
        newnode = curnode.copy()
        if path == '':
            newnode[-1] = value
        else:
            newindex = update(curnode[path[0]],path[1:],value)
            newnode[path[0]] = newindex
        db.put(hash(newnode),newnode)
        return hash(newnode)

    def delete(node,path):
        if node is NULL:
            return NULL
        else:
            curnode = db.get(node)
            newnode = curnode.copy()
            if path == '':
                newnode[-1] = NULL
            else:
                newindex = delete(curnode[path[0]],path[1:])
                newnode[path[0]] = newindex

            if all(x is NULL for x in newnode):
                return NULL
            else:
                db.put(hash(newnode),newnode)
                return hash(newnode)
```

Bir "Merkle" Taban ağacı, düğümleri birbirine bağlayıp deterministik olarak oluşturulmuş kriptografik karma özetlerini kullanarak oluşturulur. Bu içerik adresleme (anahtar/değer veritabanında `key == keccak256(rlp(value))`), depolanan veri için kriptografik bütünlük garantisi sağlar. Belli bir dijital ağacın kök karmasının herkesçe bilinmesi durumunda, alttaki yaprak verilere erişimi olan herkes, belirli bir değeri ağaç köküne ekleyen her düğümün karmasını sağlayarak dijital ağacın belirli bir yol üzerinde bir değeri içerdiğine dair kanıt oluşturabilir.

Bir saldırganın var olmayan bir `(path, value)` çiftinin kanıtını sunması imkansızdır, çünkü kök karması nihayetinde onun altındaki tüm karmalara dayanmaktadır. Temelde yapılacak herhangi bir değişiklik kök karmasını değiştirecektir. Karmayı, veri hakkındaki yapısal bilgilerin, karma işlevinin ön görüntü koruması ile güvence altına alınan sıkıştırılmış bir gösterimi olarak düşünebilirsiniz.

Bir taban ağacının atomik birimini (örneğin tek bir onaltılık karakter veya 4 bitlik bir ikili sayı) "nibble" olarak adlandıracağız. Yukarıda açıklandığı gibi, bir seferde bir nibble boyunca bir yol üzerinde gezinirken düğümler maksimum olarak 16 alt öğeye atıfta bulunabilirken ancak bir `value` öğesi içerebilir. Bu nedenle onları, uzunluğu 17 olan bir dizi olarak gösteririz. 17 öğeli bu dizileri "dal düğümleri" olarak adlandırıyoruz.

## Merkle Patricia Önek Ağacı {#merkle-patricia-trees}

Taban dijital ağaçları, büyük bir kısıtlamaya tabidir: bu ağaçlar verimsizdir. Ethereum'daki olduğu gibi, yolun 64 karakter uzunluğunda (`bytes32` içindeki nibble sayısı) olduğu durumda bir `(path, value)` bağlaması depolamak istiyorsanız, her karakter için bir seviye depolamak için bir kilobayttan fazla ekstra alan gerekecektir ve her arama veya silme işlemi, 64 adımın tamamından geçecektir. Aşağıda açıklanan Patricia dijital ağacı bu sorunu çözer.

### Optimizasyon {#optimization}

Merkle Patricia dijital ağacındaki bir düğüm aşağıdaki şekillerden biri gibi gözükür:

1.  `NULL` (boş dize olarak gösterilir)
2.  `branch` 17 öğeli bir düğüm `[ v0 ... v15, vt ]`
3.  `leaf` 2-öğeli bir düğüm `[ encodedPath, value ]`
4.  `extension` 2 öğeli bir düğüm `[ encodedPath, key ]`

64 karakterlik yollar sayesinde dijital ağacın ilk birkaç katmanını geçtikten sonra, aşağı inerken yolun en azından bir kısmında ayrılan yolun bulunmadığı bir düğüme ulaşmanız kaçınılmazdır. Yol boyunca en fazla 15 seyrek `NULL` düğüm oluşturmak zorunda kalmaktan kaçınmak için `[ encodedPath, key ]` biçiminde bir `extension` düğümü kurarak inişi kısaltıyoruz. Burada `encodedPath`, ileri atlamayı sağlayan "kısmi yolu" içerir (aşağıda açıklanan sıkıştırılmış bir kodlama kullanılarak) ve `key`, bir sonraki veritabanı araması içindir.

`encodedPath`'in ilk nibble'ında bir bayrakla işaretlenebilecek bir `leaf` düğümü söz konusu olduğunda yol, önceki düğümlerin tüm yol parçalarını kodlar ve `value`'yu doğrudan arayabiliriz.

Bununla birlikte, yukarıdaki optimizasyondan iki anlam çıkıyor.

Nibble'larda yolların üzerinden geçerken geçmemiz gereken nibble sayısının tek olduğu durumlar olabilir ancak bunun nedeni, tüm verilerin `bytes` biçiminde depolanmasıdır. Örneğin, nibble `1` ile nibble `01` (her ikisi de `<01>` olarak depolanmalıdır) arasında ayrım yapmak mümkün değildir. Tek sayıda uzunluğu belirtmek için kısmi yola önek olarak bir bayrak verilir.

### Özellik: İsteğe bağlı sonlandırıcılı onaltılık dizinin sıkıştırılmış kodlaması {#specification}

Yukarıda açıklandığı gibi, hem _tek ve çift kalan kısmi yol uzunluğu_ hem de _yaprak ve uzantı düğümü_ işaretlemesi, herhangi bir 2 öğeli düğümün kısmi yolunun ilk nibble'ında bulunur. Bu, aşağıdaki sonuçları verir:

    hex char    bits    |    node type partial     path length
    ----------------------------------------------------------
       0        0000    |       extension              even
       1        0001    |       extension              odd
       2        0010    |   terminating (leaf)         even
       3        0011    |   terminating (leaf)         odd

Çift kalan yol uzunluğu (`0` veya `2`) için ardından her zaman başka bir `0` "dolgu" nibble'ı gelecektir.

```
    def compact_encode(hexarray):
        term = 1 if hexarray[-1] == 16 else 0
        if term: hexarray = hexarray[:-1]
        oddlen = len(hexarray) % 2
        flags = 2 * term + oddlen
        if oddlen:
            hexarray = [flags] + hexarray
        else:
            hexarray = [flags] + [0] + hexarray
        // hexarray now has an even length whose first nibble is the flags.
        o = ''
        for i in range(0,len(hexarray),2):
            o += chr(16 * hexarray[i] + hexarray[i+1])
        return o
```

Örnekler:

```
    > [ 1, 2, 3, 4, 5, ...]
    '11 23 45'
    > [ 0, 1, 2, 3, 4, 5, ...]
    '00 01 23 45'
    > [ 0, f, 1, c, b, 8, 10]
    '20 0f 1c b8'
    > [ f, 1, c, b, 8, 10]
    '3f 1c b8'
```

Merkle Patricia dijital ağacında bir düğüm almak için genişletilmiş kod:

```
    def get_helper(node,path):
        if path == []: return node
        if node = '': return ''
        curnode = rlp.decode(node if len(node) < 32 else db.get(node))
        if len(curnode) == 2:
            (k2, v2) = curnode
            k2 = compact_decode(k2)
            if k2 == path[:len(k2)]:
                return get(v2, path[len(k2):])
            else:
                return ''
        elif len(curnode) == 17:
            return get_helper(curnode[path[0]],path[1:])

    def get(node,path):
        path2 = []
        for i in range(len(path)):
            path2.push(int(ord(path[i]) / 16))
            path2.push(ord(path[i]) % 16)
        path2.push(16)
        return get_helper(node,path2)
```

### Örnek Dijital Ağaç {#example-trie}

Şu dört yol/değer çiftini içeren bir trie istediğimizi varsayalım: `('do', 'verb')`, `('dog', 'puppy')`, `('doge', 'coins')`, `('horse', 'stallion')`.

İlk olarak, hem yolları hem de değerleri `bytes`' dönüştürürüz. Aşağıda, daha kolay anlaşılması için _yollar_ için gerçek bayt gösterimleri `<>` ile gösterilirken _değerler_ hala `''` dizeler olarak gösterilir(bunlar da aslında `byte` olacaktır):

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

Bir düğüme başka bir düğüm içinde başvurulduğunda, dahil edilenler `H(rlp.encode(node))`, where `H(x) = keccak256(x) if len(x) >= 32 else x` and `rlp.encode` is the [RLP](/developers/docs/data-structures-and-encoding/rlp) kodlama işlevidir.

Bir dijital ağacı güncellerken _eğer_ yeni oluşturulan düğümün uzunluğu >= 32 ise, `(keccak 256 (x), x)` anahtar/değer çiftini kalıcı bir arama tablosunda saklamanız gerektiğini unutmayın. Bununla birlikte düğüm bundan daha kısaysa, f (x) = x işlevi tersine çevrilebilir olduğundan hiçbir şeyin depolanmasına gerek yoktur.

## Ethereum'da Dijital Ağaçlar {#tries-in-ethereum}

Ethereum'ün yürütüm katmanındaki tüm merkle ağaçları, Merkle Patricia Dijital Ağacını kullanır.

Bir blok başlığında bu dijital ağaçların 3'ünden 3 kök vardır.

1.  durumKökü (stateRoot)
2.  işlemKökü (transactionsRoot)
3.  makbuzKökü (receiptsRoot)

### Durum Dijital Ağacı {#state-trie}

Bir adet genel durum dijital ağacı vardır ve bu, bir istemci bir bloğu her işlediğinde güncellenir. İçindeki `path` her zaman şudur: `keccak 256 (ethereumAddress)` ve `value` her zaman şudur: `rlp(ethereumAccount)`. Bir Ethereum `account`'u 4 öğeli bir `[nonce,balance,storageRoot,codeHash]` dizisidir. Bu noktada, bu `storageRoot` öğesinin başka bir patricia dijital ağacının kökü olduğunu belirtmekte fayda vardır:

### Depolama Dijital Ağacı {#storage-trie}

Depolama dijital ağacı, _tüm_ sözleşme verilerinin bulunduğu yerdir. Her bir hesap için ayrı bir depolama dijital ağacı vardır. Verilen bir adresteki belirli depolama konumlarındaki değerleri alabilmek için depolama adresi, depoda depolanan verilerin tam sayı konumu ve blok kimliği gereklidir. Bunlar daha sonra JSON-RPC API'sinde tanımlanan `eth_getStorageAt` öğesine bağımsız değişkenler olarak yapıştırılabilir, ör. `0x295a70b2de5e3953354a6a8344e616ed314d7251` adresi için depolama yuvası 0'daki verileri almak amacıyla:

```
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}

```

Depolama alanındaki diğer öğelerin alınması biraz daha karmaşıktır çünkü ilk önce depolama alanındaki konumun hesaplanması gerekir. Konum, adresin `keccak 256` karması ve depolama konumu alınarak hesaplanır, her ikisi de 32 bayt uzunluğa kadar sıfırlarla doldurulmuştur. Örneğin, `0x391694e7e0b0cce554cb130d723a9d27458f9298` adresi için depolama yuvası 1'deki verilerin konumu:

```
keccak256(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```

Geth konsolunda bu aşağıdaki şekilde hesaplanabilir:

```
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Buradaki `path` bu nedenle `keccak256(<6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9>)`'dır. Bu, artık daha önce olduğu gibi verileri depolama ağacından almak için kullanılabilir:

```
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

Not: Bir Ethereum hesabının `storageRoot`'u, eğer bir sözleşme hesabı değilse varsayılan olarak boştur.

### İşlem Dijital Ağacı {#transaction-trie}

Her blok için ayrı bir işlem dijital ağacı vardır ve aynı şekilde `(key, value)` çiftlerini saklar. Buradaki yol: aşağıdakiler tarafından belirlenen bir değere karşılık gelen anahtarı temsil eden `rlp(transactionIndex)`'dir:

```
if legacyTx:
  value = rlp(tx)
else:
  value = TxType | encode(tx)
```

Bununla ilgili daha fazla bilgiyi [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718) belgelerinde bulabilirsiniz.

### Makbuz Dijital Ağaçları {#receipts-trie}

Her bloğun kendi makbuz dijital ağacı vardır. Burada `path`: `rlp(transactionIndex)`'dir. `transactionIndex`, dahil edildiği blok içerisindeki indeksidir. Makbuz dijital ağacı hiçbir zaman güncellenmez. İşlemler dijital ağacına benzer şekilde güncel ve eski makbuzlar mevcuttur. Makbuzlar dijital ağacı içerisinde belirli bir makbuzu sorgulamak için bloktaki işlemin indeksi, makbuz yükü ve işlem türü gereklidir. Döndürülen makbuz, `TransactionType` ve `ReceiptPayload`'un birleşimi olarak tanımlanan `Receipt` türünde ya da `rlp([status, cumulativeGasUsed, logsBloom, logs])` olarak tanımlanan `LegacyReceipt` türünde olabilir.

Bununla ilgili daha fazla bilgiyi [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718) belgelerinde bulabilirsiniz.

## Daha Fazla Okuma {#further-reading}

- [Değiştirilmiş Merkle Patricia Dijital Ağacı - Ethereum bir durumu nasıl kaydeder?](https://medium.com/codechain/modified-merkle-patricia-trie-how-ethereum-saves-a-state-e6d7555078dd)
- [Ethereum'da Merkle işlemi](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum/)
- [Ethereum dijital ağacını anlama](https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/)
