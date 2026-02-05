---
title: Merkle Patricia Trie
description: Úvod do Merkle Patricia Trie.
lang: cs
sidebarDepth: 2
---

Stav Etherea (tj. souhrn všech účtů, zůstatků a smart kontraktů) je zakódován do speciální verze datové struktury, která je obecně v informatice známá jako Merkle tree. Tato struktura je užitečná pro mnoho aplikací v kryptografii, protože vytváří ověřitelný vztah mezi všemi jednotlivými datovými prvky propletenými ve stromu, což vede k jediné **kořenové** hodnotě, kterou lze použít k prokazování různých skutečností o datech.

Datová struktura Etherea je „modifikovaný Merkle-Patricia Trie“, pojmenovaný tak proto, že si půjčuje některé vlastnosti z PATRICIA (Practical Algorithm To Retrieve Information Coded in Alphanumeric) a protože je navržen pro efektivní re**trie**val (vyhledávání) položek, které tvoří stav Etherea.

Datová struktura Merkle-Patricia trie je deterministická a kryptograficky ověřitelná: Jediný způsob, jak vygenerovat kořen stavu, je jeho výpočet z každé jednotlivé části stavu, a dva identické stavy lze snadno prokázat porovnáním kořenového haše a hašů, které k němu vedly (_Merkleho důkaz_). Naopak není možné vytvořit dva různé stavy se stejným kořenovým hashem a jakýkoli pokus o modifikaci stavu s jinými hodnotami povede k odlišnému kořenovému hashi stavu. Teoreticky tato struktura poskytuje „svatý grál“ efektivity `O(log(n))` pro vkládání, vyhledávání a mazání.

V blízké budoucnosti Ethereum plánuje přejít na strukturu [stromu Verkle](/roadmap/verkle-trees), což otevře mnoho nových možností pro budoucí vylepšení protokolu.

## Předpoklady {#prerequisites}

Pro lepší pochopení této stránky je užitečné mít základní znalosti o [haších](https://en.wikipedia.org/wiki/Hash_function), [Merkleho stromech](https://en.wikipedia.org/wiki/Merkle_tree), [trie](https://en.wikipedia.org/wiki/Trie) a [serializaci](https://en.wikipedia.org/wiki/Serialization). Tento článek začíná popisem základního [radixového stromu](https://en.wikipedia.org/wiki/Radix_tree) a postupně zavádí úpravy nezbytné pro optimalizovanější datovou strukturu Etherea.

## Základní radixové trie {#basic-radix-tries}

V základním radixovém trie vypadá každý síťový uzel následovně:

```
    [i_0, i_1 ... i_n, value]
```

Kde `i_0 ...` i_n`představují symboly abecedy (často binární nebo hexadecimální),`value`je konečná hodnota v uzlu a hodnoty v`i_0, i_1 ...` i_n` slotech jsou buď `NULL`, nebo ukazatele na (v našem případě haše) jiné uzly. To tvoří základní úložiště `(key, value)`.

Řekněme, že chcete použít strukturu radixového stromu pro uchování uspořádání nad sadou párů key-value. Chcete-li najít hodnotu aktuálně namapovanou na klíč `dog` v trie, nejprve byste `dog` převedli na písmena abecedy (což dá `64 6f 67`) a poté sestupovali v trie po této cestě, dokud nenajdete hodnotu. To znamená, že začnete vyhledáním kořenového hashe v ploché databázi key-value, abyste našli kořenový uzel trie. Ten je reprezentován jako pole klíčů ukazujících na jiné uzly. Použili byste hodnotu na indexu `6` jako klíč a vyhledali ji v ploché databázi klíč/hodnota, abyste získali uzel o jednu úroveň níže. Poté zvolíte index `4` pro vyhledání další hodnoty, pak index `6` a tak dále, dokud po sledování cesty: `root -> 6 -> 4 -> 6 -> 15 -> 6 -> 7` nevyhledáte hodnotu uzlu a nevrátíte výsledek.

Existuje rozdíl mezi vyhledáváním něčeho v „trie“ a v podkladové ploché databázi key-value. Obě definují uspořádání key-value, ale podkladová databáze může provést tradiční jednorázové vyhledání klíče. Vyhledávání klíče v trie vyžaduje několik podkladových vyhledávání v databázi, aby se dospělo k finální hodnotě popsané výše. Nazvěme to druhé jako `path`, abychom eliminovali nejednoznačnost.

Operace aktualizace a mazání pro radixové trie mohou být definovány následovně:

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

"Merkle" radixový strom je vytvořen propojením uzlů pomocí deterministicky generovaných kryptografických hash digestů. Toto adresování obsahu (v databázi klíč/hodnota `key == keccak256(rlp(value))`) poskytuje kryptografickou záruku integrity uložených dat. Pokud je kořenový hash daného trie veřejně známý, pak kdokoli s přístupem k podkladovým datům listů může vytvořit důkaz, že trie obsahuje danou hodnotu na konkrétní cestě tím, že poskytne hashe každého uzlu spojujícího danou hodnotu s kořenem stromu.

Je nemožné, aby útočník poskytl důkaz o páru `(path, value)`, který neexistuje, protože kořenový haš je nakonec založen na všech haších pod ním. Jakákoli podkladová modifikace by změnila kořenový haš. Můžete si představit haš jako komprimované zobrazení strukturálních informací o datech, zajištěné ochranou před obrazy hašovací funkce.

Atomickou jednotku radixového stromu (např. jeden hexadecimální znak nebo 4bitové binární číslo) budeme nazývat „nibble“. Při procházení cesty po jednom nibble, jak je popsáno výše, mohou uzly odkazovat na maximálně 16 potomků, ale obsahují prvek `value`. Proto je reprezentujeme jako pole o délce 17. Těmto 17prvkovým polím říkáme "větvové uzly".

## Merkle Patricia Trie {#merkle-patricia-trees}

Radixové trie mají jednu zásadní nevýhodu: jsou neefektivní. Pokud chcete uložit jednu vazbu `(path, value)`, kde cesta, stejně jako na Ethereu, má délku 64 znaků (počet nibblů v `bytes32`), budete potřebovat více než kilobajt dalšího prostoru pro uložení jedné úrovně na znak a každé vyhledání nebo smazání bude trvat celých 64 kroků. Patricia trie, představené níže, tento problém řeší.

### Optimalizace {#optimization}

Uzel v Merkle Patricia trie je jedním z následujících:

1. `NULL` (reprezentován jako prázdný řetězec)
2. `branch` 17položkový uzel `[ v0 ...` v15, vt ]\`
3. `leaf` 2položkový uzel `[ encodedPath, value ]`
4. `extension` 2položkový uzel `[ encodedPath, key ]`

S cestami 64 znaků je nevyhnutelné, že po projití několika prvních vrstev trie se dostanete do uzlu, kde alespoň část cesty dolů neexistuje žádná divergentní cesta. Abychom se vyhnuli vytváření až 15 řídkých uzlů `NULL` podél cesty, zkrátíme sestup nastavením uzlu `extension` ve tvaru `[ encodedPath, key ]`, kde `encodedPath` obsahuje „částečnou cestu“ pro přeskočení (pomocí kompaktního kódování popsaného níže) a `key` je pro další vyhledávání v DB.

U uzlu `leaf`, který může být označen příznakem v prvním nibble `encodedPath`, cesta kóduje všechny fragmenty cesty předchozích uzlů a hodnotu `value` můžeme vyhledat přímo.

Tato výše uvedená optimalizace však zavádí nejednoznačnost.

Při procházení cest po nibblech můžeme skončit s lichým počtem nibblů k procházení, ale protože všechna data jsou uložena ve formátu `bytes`. Není možné rozlišit například mezi nibblem `1` a nibbly `01` (obojí musí být uloženo jako `<01>`). Abychom specifikovali lichou délku, je částečná cesta předznačena příznakem.

### Specifikace: Kompaktní kódování hexadecimální sekvence s volitelným terminátorem {#specification}

Příznaky pro _lichou vs. sudou zbývající délku částečné cesty_ i pro _uzel list vs. uzel rozšíření_, jak je popsáno výše, se nacházejí v prvním nibblu částečné cesty jakéhokoli 2položkového uzlu. Výsledkem je následující:

| hex znak | bity | částečný typ uzlu                    | délka cesty |
| -------- | ---- | ------------------------------------ | ----------- |
| 0        | 0000 | rozšíření                            | sudá        |
| 1        | 0001 | rozšíření                            | lichá       |
| 2        | 0010 | ukončující (list) | sudá        |
| 3        | 0011 | ukončující (list) | lichá       |

Pro sudou zbývající délku cesty (`0` nebo `2`) bude vždy následovat další „vycpávkový“ nibble `0`.

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

Příklady:

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

Zde je rozšířený kód pro získání uzlu v Merkle Patricia trie:

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

### Příklad Trie {#example-trie}

Předpokládejme, že chceme trie obsahující čtyři páry cesta/hodnota `('do', 'verb')`, `('dog', 'puppy')`, `('doge', 'coins')`, `('horse', 'stallion')`.

Nejprve převedeme cesty i hodnoty na `bytes`. Níže jsou skutečné bajtové reprezentace _cest_ označeny `<>`, ačkoli _hodnoty_ jsou pro snazší pochopení stále zobrazeny jako řetězce označené `''` (i ony by ve skutečnosti byly `bytes`):

```
    <64 6f> : 'verb'
    <64 6f 67> : 'puppy'
    <64 6f 67 65> : 'coins'
    <68 6f 72 73 65> : 'stallion'
```

Nyní vytvoříme takový trie s následujícími páry klíč/hodnota v podkladové DB:

```
    rootHash: [ <16>, hashA ]
    hashA:    [ <>, <>, <>, <>, hashB, <>, <>, <>, [ <20 6f 72 73 65>, 'stallion' ], <>, <>, <>, <>, <>, <>, <>, <> ]
    hashB:    [ <00 6f>, hashC ]
    hashC:    [ <>, <>, <>, <>, <>, <>, hashD, <>, <>, <>, <>, <>, <>, <>, <>, <>, 'verb' ]
    hashD:    [ <17>, [ <>, <>, <>, <>, <>, <>, [ <35>, 'coins' ], <>, <>, <>, <>, <>, <>, <>, <>, <>, 'puppy' ] ]
```

Pokud jeden uzel odkazuje na jiný uzel, je zahrnuto `keccak256(rlp.encode(node))`, pokud `len(rlp.encode(node)) >= 32`, jinak `node`, kde `rlp.encode` je kódovací funkce [RLP](/developers/docs/data-structures-and-encoding/rlp).

Všimněte si, že při aktualizaci trie je třeba uložit pár klíč/hodnota `(keccak256(x), x)` do perzistentní vyhledávací tabulky, _pokud_ má nově vytvořený uzel délku >= 32. Pokud je však uzel kratší, není třeba nic ukládat, protože funkce f(x) = x je reverzibilní.

## Trie v Ethereu {#tries-in-ethereum}

Všechny merkle trie v exekuční vrstvě Etherea používají Merkle Patricia Trie.

V hlavičce bloku jsou 3 kořeny z 3 těchto trie.

1. stateRoot
2. transactionsRoot
3. receiptsRoot

### Stavová trie {#state-trie}

Existuje jedna globální stavová trie, která se aktualizuje pokaždé, když klient zpracuje blok. V ní je `path` vždy: `keccak256(ethereumAddress)` a `value` je vždy: `rlp(ethereumAccount)`. Konkrétně je ethereový `účet` 4položkové pole `[nonce,balance,storageRoot,codeHash]`. V tomto bodě stojí za zmínku, že tento `storageRoot` je kořenem další patricia trie:

### Úložná trie {#storage-trie}

V úložné trie jsou uložena _všechna_ data kontraktu. Pro každý účet existuje samostatná úložná trie. K načtení hodnot na konkrétních pozicích úložiště na dané adrese je nutná adresa úložiště, celočíselná pozice uložených dat v úložišti a ID bloku. Ty pak mohou být předány jako argumenty do `eth_getStorageAt` definovaného v JSON-RPC API, např. pro načtení dat v úložném slotu 0 pro adresu `0x295a70b2de5e3953354a6a8344e616ed314d7251`:

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}

```

Načítání dalších prvků v úložišti je o něco složitější, protože se nejprve musí vypočítat pozice v úložné trie. Pozice se vypočítá jako haš `keccak256` adresy a pozice v úložišti, obě doplněné zleva nulami na délku 32 bajtů. Například pozice pro data v úložném slotu 1 pro adresu `0x391694e7e0b0cce554cb130d723a9d27458f9298` je:

```python
keccak256(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```

V konzoli Geth to lze vypočítat následovně:

```
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

`path` je tedy `keccak256(<6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9>)`. To lze nyní použít k načtení dat z úložné trie jako předtím:

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

Poznámka: `storageRoot` pro ethereový účet je ve výchozím nastavení prázdný, pokud se nejedná o účet kontraktu.

### Transakční trie {#transaction-trie}

Pro každý blok existuje samostatná transakční trie, která opět ukládá páry `(klíč, hodnota)`. Cesta je zde: `rlp(transactionIndex)`, která představuje klíč odpovídající hodnotě určené:

```python
if legacyTx:
  value = rlp(tx)
else:
  value = TxType | encode(tx)
```

Více informací o tomto naleznete v dokumentaci k [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718).

### Trie účtenek {#receipts-trie}

Každý blok má svou vlastní trie účtenek. `path` zde je: `rlp(transactionIndex)`. `transactionIndex` je jeho index v bloku, ve kterém byl zahrnut. Trie účtenek se nikdy neaktualizuje. Podobně jako transakční trie, existují aktuální a starší účtenky. Pro dotaz na konkrétní účtenku v trie účtenek je nutný index transakce v jejím bloku, datová část účtenky a typ transakce. Vrácená účtenka může být typu `Receipt`, který je definován jako zřetězení `TransactionType` a `ReceiptPayload`, nebo může být typu `LegacyReceipt`, který je definován jako `rlp([status, cumulativeGasUsed, logsBloom, logs])`.

Více informací o tomto naleznete v dokumentaci k [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718).

## Další čtení {#further-reading}

- [Modifikovaný Merkle Patricia Trie – jak Ethereum ukládá stav](https://medium.com/codechain/modified-merkle-patricia-trie-how-ethereum-saves-a-state-e6d7555078dd)
- [Merkling v Ethereu](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum/)
- [Pochopení Ethereum trie](https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/)
