---
title: Merkle Patricia-fa
description: Bevezetés a Merkle Patricia-fa témájába.
lang: hu
sidebarDepth: 2
---

Az Ethereum státusza (az összes számla, egyenleg és okosszerződés) bele van kódolva az informatikában Merkle-fa néven ismert adatszerkezet egy speciális változatába. Ez a struktúra számos kriptográfiai alkalmazásban hasznos, mert ellenőrizhető kapcsolatot hoz létre a fában összefonódott összes egyedi adat között, és egyetlen **gyökérértéket** eredményez, amely felhasználható az adatok bizonyítására.

Az Ethereum adatszerkezete egy „módosított Merkle-Patricia-fa (trie)”, amely azért kapta ezt a nevet, mert a PATRICIA (Practical Algorithm To Retrieve Information Coded in Alphanumeric/gyakorlati algoritmus az alfanumerikusan kódolt információk visszakeresésére) néhány jellemzőjét kölcsönzi, továbbá az Ethereum státuszát alkotó elemek hatékony lekérdezésére (re**trie**val) tervezték.

A Merkle-Patricia-fa determinisztikus és kriptográfiailag ellenőrizhető: a státusz gyökerét csak úgy lehet előállítani, ha azt a státusz minden egyes darabjából kiszámítjuk, és két azonos státusz könnyen bizonyítható a gyökér-hash és az ahhoz vezető hash-ek az összehasonlításával (_Merkle-bizonyíték_). Ezzel szemben nem lehet két különböző státuszt létrehozni ugyanazzal a gyökér-hash-értékkel, és minden olyan kísérlet, hogy a státuszt különböző értékekkel módosítsák, más státusz gyökér-hash-t eredményez. Elméletileg ez a struktúra biztosítja a `O(log(n))` hatékonyság „szent grálját” a beleírások, keresések és törlések esetében.

A közeljövőben az Ethereum tervezi, hogy áttér a [Verkle-fastruktúrára](https://ethereum.org/en/roadmap/verkle-trees), amely új lehetőségeket nyit a jövőbeli protokollfejlesztések előtt.

## Előfeltételek {#prerequisites}

A jelen téma könnyebb megértése érdekben tekintse meg a [hashek](https://en.wikipedia.org/wiki/Hash_function), [Merkle-fák](https://en.wikipedia.org/wiki/Merkle_tree), [fák](https://en.wikipedia.org/wiki/Trie) és [sorosítás](https://en.wikipedia.org/wiki/Serialization) témákat. Ez a cikk egy alapvető [radix-fa](https://en.wikipedia.org/wiki/Radix_tree) leírásával kezdődik, majd lépésenként bemutatja az Ethereum optimalizáltabb adatszerkezetéhez szükséges módosításokat.

## Alapvető radix-fák {#basic-radix-tries}

Egy alapvető radix-fában minden csomópont a következőképpen néz ki:

```
    [i_0, i_1 ... i_n, value]
```

Ahol `i_0 ... i_n` az ábécé (gyakran bináris vagy hexadecimális) szimbólumait jelöli, `value` a csomópontban lévő végérték, és az `i_0, i_1 ... i_n` a slotokban lévő értékek, melyek értéke `NULL` vagy más csomópontokra (itt hashekre) mutató mutatók. Ez egy alapvető `(key, value)` (kulcs, érték) tárolót alkot.

Tegyük fel, hogy egy radixfa adatstruktúráját szeretnénk használni a kulcs-érték párosok halmaza feletti sorrend tárolására. Ahhoz, hogy megtaláljuk a `dog` kulcshoz jelenleg hozzárendelt értéket a fában, először a `dog` szót alakítjuk át az ábécé betűivé (amely `64 6f 67`), majd haladunk lefelé a fában, amíg meg nem találjuk az értéket. Ez azt jelenti, hogy a gyökérhash keresésével kezdjük egy kulcs/érték adatbázisban (DB), hogy megtaláljuk a fa gyökérpontját. Ez más (csomó)pontokra mutató kulcsok tömbjeként jelenik meg. Ehhez a `6`-os indexnél lévő értéket kulcsként használjuk, és ezt a kulcs-érték adatbázisban megkeressük, hogy megkapjuk az egy szinttel lejjebbi csomópontot. Ezután a `4`-es indexet választjuk a következő érték megkereséséhez, majd a `6`-os indexet, és így tovább, amíg egyszer végig nem követtük az utat: `gyökér -> 6 -> 4 -> 6 -> 15 -> 6 -> 7`, ekkor megnézzük a csomópont értékét, és visszaadjuk az eredményt.

Különbség van aközött, hogy valamit a fában vagy az alapjául szolgáló kulcs-érték adatbázisban keresünk. Mindkettő kulcs-érték elrendezést definiál, de a mögöttes adatbázis képes a kulcsok hagyományos, egylépéses keresésére. Egy kulcs keresése a fában többszöri adatbáziskeresést igényel a végső érték eléréséhez. Az adatbáziskeresést nevezzük `path` néven, hogy kiküszöböljük a félreérthetőséget.

A radix-fák frissítési és törlési műveletei a következőképpen definiálhatók:

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

A „Merkle” radix-fa a csomópontok összekapcsolásával épül fel, determinisztikusan generált kriptográfiai hash digest-ek segítségével. Ez a tartalomcímzés (a kulcs-érték adatbázisban `key == keccak256(rlp(value))`) biztosítja a tárolt adatok kriptográfiai integritását. Ha egy adott fa gyökérhashe nyilvánosan ismert, akkor aki hozzáférhet a mögöttes levél szintű adatokhoz, bizonyítékot állíthat össze arra, hogy a fa egy adott értéket tartalmaz egy adott útvonalon, azáltal hogy megadja az egyes csomópontok hashét, amelyek egy adott értéket a fa gyökeréhez kapcsolnak.

Egy támadó számára lehetetlen egy nem létező `(path, value)` pár bizonyítása, mivel a gyökérhash az összes alatta lévő hashre épül. A mögöttes adatok módosítása megváltoztatná a gyökérhasht. A hashre úgy is gondolhat, mint az adatok szerkezeti információinak tömörített reprezentációjára, amelyet a hashfüggvény előképvédelme (pre-image) biztosít.

A radix-fa egy atomnyi egységére (például egyetlen hexadecimális karakter vagy 4 bites bináris szám) „nibble”-ként hivatkozunk. Miközben az útvonalat bejárjuk egy-egy nibble mentén, a csomópontnak legfeljebb 16 gyermeke lehet addig, amíg egy `value` értéket tartalmaz. Ezért ezeket 17 hosszúságú tömbként ábrázoljuk. Ezeket a 17 elemű tömböket „elágazási csomópontoknak” nevezzük.

## Merkle Patricia-fa {#merkle-patricia-trees}

A radix-fáknak egy fő korlátja van: nem hatékonyak. Ha egy `(path, value)` kötést szeretnénk tárolni, ahol az útvonal, mint az Ethereumban, 64 karakter hosszú (a `bytes32` nibble száma), akkor több mint egy kilobájtnyi extra helyre lesz szükségünk, hogy karakterenként egy szintet tároljunk, és minden keresés vagy törlés mind a 64 lépést megteszi. A bevezetett Patricia-fa megoldotta ezt a gondot.

### Optimalizálás {#optimization}

A Merkle Patricia-fa egy csomópontja az egyik a következőkből:

1.  `NULL` (egy üres string)
2.  `branch` Egy 17 elemű csomópont `[ v0 ... v15, vt ]`
3.  `leaf` Egy 2 elemű csomópont `[ encodedPath, value ]`
4.  `extension` Egy 2 elemű csomópont `[ encodedPath, key ]`

A 64 karakteres útvonalak esetén elkerülhetetlen, hogy a fa első néhány rétegének bejárása után olyan csomóponthoz érjünk, ahol legalább az út egy részén nem létezik elágazás. Annak elkerülése érdekében, hogy az útvonal mentén akár 15 ritka `NULL` csomópontot kelljen létrehozni, a lefelé haladást egy `extension` csomópont létrehozásával levágjuk, amely a `[ encodedPath, key ]` formájú, ahol `encodedPath` tartalmazza a „részleges útvonalat”, amelyet át kell ugrani (az alább ismertetett kompakt kódolással), és a `key` a következő DB-keresésre szolgál.

Egy `level` (levél) csomópont esetében, amelyet a `encodedPath` első nibble-jében lévő jelölővel (flag) jelölhetünk, az útvonal kódolja az összes korábbi csomópont útvonalrészletét, és közvetlenül megnézhetjük a `value` mezőt.

Ez az optimalizálás azonban kétértelműséget eredményez.

A nibble-ekben történő útvonalak bejárásakor előfordulhat, hogy páratlan számú nibble-t kell bejárnunk, de minden adat `bytes` formátumban van tárolva. Nem lehet különbséget tenni például az `1` és a `01` nibble között (mindkettőt `<01>`-ként kell tárolni). A páratlan hosszúság megadásához a részleges útvonal elé egy jelölőt (flag) kell illeszteni.

### Specifikáció: Hexadecimális szekvencia kompakt kódolása opcionális befejezővel {#specification}

Mind a _páratlan és páros fennmaradó részleges útvonalhossz_, mind a _levél és bővítmény csomópont_ jelölése a fent leírtak szerint bármely 2 elemű csomópont részleges útvonalának első nibble-jében megtalálható. Az eredmény így néz ki:

    hex char    bits    |    node type partial     path length
    ----------------------------------------------------------
       0        0000    |       extension              even
       1        0001    |       extension              odd
       2        0010    |   terminating (leaf)         even
       3        0011    |   terminating (leaf)         odd

A páros fennmaradó útvonalhossz (`0` vagy `2`) esetén mindig egy `0` „kitöltő” nibble következik.

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

Példák:

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

Ez a Merkle Patricia-fa egy csomópontjának megadásához szükséges bővített kód:

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

### Példa fa {#example-trie}

Tegyük fel, hogy egy olyan fát szeretnénk, amely négy út-érték párt tartalmaz `('do', 'verb')`, `('dog', 'puppy')`, `('doge', 'coins')`, `('horse', 'stallion')`.

Először az elérési utakat és az értékeket `bytes` formába alakítjuk át. Az alábbiakban a _útvonalak_ tényleges bájt ábrázolását `<>` jelöli, bár a _values_ a könnyebb érthetőség érdekében továbbra is sztringként jelennek meg, `''` jelöléssel (ezek is `bytes` formában lennének):

```
    <64 6f> : 'verb'
    <64 6f 67> : 'puppy'
    <64 6f 67 65> : 'coins'
    <68 6f 72 73 65> : 'stallion'
```

Most létrehozunk egy ilyen fát a következő kulcs-érték párokkal a mögöttes adatbázisban:

```
    rootHash: [ <16>, hashA ]
    hashA:    [ <>, <>, <>, <>, hashB, <>, <>, <>, [ <20 6f 72 73 65>, 'stallion' ], <>, <>, <>, <>, <>, <>, <>, <> ]
    hashB:    [ <00 6f>, hashC ]
    hashC:    [ <>, <>, <>, <>, <>, <>, hashD, <>, <>, <>, <>, <>, <>, <>, <>, <>, 'verb' ]
    hashD:    [ <17>, [ <>, <>, <>, <>, <>, <>, [ <35>, 'coins' ], <>, <>, <>, <>, <>, <>, <>, <>, <>, 'puppy' ] ]
```

Amikor egy csomópontra egy másik csomóponton belül hivatkozunk, akkor a `H(rlp.encode(node))` szerepel, ahol `H(x) = keccak256(x) if len(x) >= 32 else x` és `rlp.encode` az [RLP](/developers/docs/data-structures-and-encoding/rlp) kódolási függvény.

Vegyük észre, hogy egy fa frissítésekor a kulcs-érték párt `(keccak256(x), x)` egy állandó keresőtáblában kell tárolni, _ha_ az újonnan létrehozott csomópont hossza >= 32. Ha a csomópont ennél rövidebb, nem kell tárolni, mivel az f(x) = x függvény megfordítható.

## Fák az Ethereumban {#tries-in-ethereum}

Az Ethereum végrehajtási rétegén minden Merkle-fa Merkle Patricia-fát használ.

Egy blokk fejlécében 3 gyökér 3 fából származik.

1.  stateRoot (státuszgyökér)
2.  transactionsRoot (tranzakciógyökér)
3.  receiptsRoot (visszaigazolásgyökér)

### Státuszfa {#state-trie}

Egy globális státuszfa van, amely minden alkalommal frissül, amikor egy kliens feldolgoz egy blokkot. Ebben a `path` (útvonal) mindig `keccak256(ethereumAddress)` és a `value` (érték) mindig:`rlp(ethereumAccount)`. Tehát egy Ethereum `account` (számla) az egy 4 elemű tömb a következőkkel: `[nonce,balance,storageRoot,codeHash]`. Ezen a ponton érdemes megjegyezni, hogy ez a `storageRoot` (tárolási fa) egy másik Patricia-fa gyökere:

### Tárolási fa {#storage-trie}

A tárolási fa az, ahol _minden_ szerződésadat tárolódik. Minden számlához külön tárolási fa tartozik. Egy adott címen adott tárolási pozíción lévő értékek lekérdezéséhez szükség van a tárolási címre, a tárolt adat egész számú pozíciójára a tárolóban és a blokk azonosítójára. Ezek azután átadhatók a JSON-RPC API-ban definiált `eth_getStorageAt` paraméterként, például a 0 tárolóhelyén lévő adatok lekérdezéséhez erre a címre `0x295a70b2de5e3953354a6a8344e616ed314d7251`:

```
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}

```

A tároló egyéb elemeinek visszakeresése bonyolultabb, mivel először ki kell számítani a tárolási fában elfoglalt pozíciót. A pozíciót a cím és a tárolási pozíció `keccak256` hasheként kell kiszámítani, mindkettőt balra nullákkal kitöltve 32 bájt hosszúságúra. Például az adatok pozíciója az 1-es tárolóhelyen erre a címre `0x391694e7e0b0cce554cb130d723a9d27458f9298`:

```
keccak256(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```

A Geth konzolban ez a következőképpen kalkulálható:

```
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

A `path` (útvonal) ezért `keccak256(<6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9>)`. Ez már használható az adatok lekérdezésére a tároló fából:

```
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

Megjegyzés: A `storageRoot` az Ethereum számlára alapvetően üres, ha az nem egy szerződéses számla.

### Tranzakciófa {#transaction-trie}

Minden blokkhoz külön tranzakciós fa tartozik, amely ismét `(key, value)` (kulcs, érték) párokat tárol. Az út `rlp(transactionIndex)`, amely azt a kulcsot jelöli, amely megfelel egy értéknek, amelyet a következők határoznak meg:

```
if legacyTx:
  value = rlp(tx)
else:
  value = TxType | encode(tx)
```

Bővebb információt az [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) dokumentációban talál.

### Visszaigazolásfa {#receipts-trie}

Minden blokknak saját visszaigazolásfája van. A `path` (útvonal): `rlp(transactionIndex)`. A `transactionIndex` az indexe a blokkban, melybe bekerült. A visszaigazolásfát sosem frissítik. A tranzakciófához hasonlóan vannak jelenlegi és régi visszaigazolások. Egy adott visszaigazolás lekérdezéséhez visszaigazolásfából szükség van a blokkban lévő tranzakció indexére, a visszaigazoláscsomagra (payload) és a tranzakciótípusra. A visszaigazolás lehet `Receipt` típusú, amely a `TransactionType` és a `ReceiptPayload` összeadása, vagy lehet `LegacyReceipt` típusú, amely `rlp([status, cumulativeGasUsed, logsBloom, logs])` kódként van meghatározva.

Bővebb információt az [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) dokumentációban talál.

## További olvasnivaló {#further-reading}

- [Módosított Merkle Patricia-fa — Hogyan menti az Ethereum a státuszt](https://medium.com/codechain/modified-merkle-patricia-trie-how-ethereum-saves-a-state-e6d7555078dd)
- [Merkle-használat az Ethereumban](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum/)
- [Az Ethereum-fa megértése](https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/)
