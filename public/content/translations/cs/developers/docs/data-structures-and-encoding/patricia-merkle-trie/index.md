---
title: Merkle-Patricia trie
description: "Úvod do Merkle-Patricia trie."
lang: cs
sidebarDepth: 2
---

Stav [Etherea](/) (souhrn všech účtů, zůstatků a chytrých kontraktů) je zakódován do speciální verze datové struktury, která je v informatice obecně známá jako Merkleův strom. Tato struktura je užitečná pro mnoho aplikací v kryptografii, protože vytváří ověřitelný vztah mezi všemi jednotlivými částmi dat propletenými ve stromu, což vede k jediné hodnotě **kořene** (root), kterou lze použít k dokazování skutečností o těchto datech.

Datová struktura Etherea je „modifikovaná Merkle-Patricia trie“, pojmenovaná tak proto, že si vypůjčuje některé vlastnosti algoritmu PATRICIA (Practical Algorithm To Retrieve Information Coded in Alphanumeric), a protože je navržena pro efektivní získávání (re**trie**val) datových položek, které tvoří stav Etherea.

Merkle-Patricia trie je deterministická a kryptograficky ověřitelná: Jediný způsob, jak vygenerovat kořen stavu, je vypočítat jej z každé jednotlivé části stavu, a to, že jsou dva stavy identické, lze snadno dokázat porovnáním kořenového hashe a hashů, které k němu vedly (_Merkleův důkaz_). Naopak neexistuje způsob, jak vytvořit dva různé stavy se stejným kořenovým hashem, a jakýkoli pokus o úpravu stavu s jinými hodnotami povede k jinému kořenovému hashi stavu. Teoreticky tato struktura poskytuje „svatý grál“ efektivity `O(log(n))` pro vkládání, vyhledávání a mazání.

V blízké budoucnosti plánuje Ethereum přejít na strukturu [Verkle Tree](/roadmap/verkle-trees), což otevře mnoho nových možností pro budoucí vylepšení protokolu.

## Předpoklady {#prerequisites}

Pro lepší pochopení této stránky by bylo užitečné mít základní znalosti o [hashích](https://en.wikipedia.org/wiki/Hash_function), [Merkleových stromech](https://en.wikipedia.org/wiki/Merkle_tree), [trie](https://en.wikipedia.org/wiki/Trie) a [serializaci](https://en.wikipedia.org/wiki/Serialization). Tento článek začíná popisem základního [radixového stromu](https://en.wikipedia.org/wiki/Radix_tree) a poté postupně představuje úpravy nezbytné pro optimalizovanější datovou strukturu Etherea.

## Základní radixové trie {#basic-radix-tries}

V základní radixové trii vypadá každý uzel následovně:

```
[i_0, i_1 ... i_n, value]
```

Kde `i_0 ... i_n` představují symboly abecedy (často binární nebo hexadecimální), `value` je koncová hodnota v uzlu a hodnoty ve slotech `i_0, i_1 ... i_n` jsou buď `NULL`, nebo ukazatele na (v našem případě hashe) další uzly. To tvoří základní úložiště `(key, value)`.

Řekněme, že byste chtěli použít datovou strukturu radixového stromu pro zachování pořadí nad sadou párů klíč-hodnota. Chcete-li najít hodnotu aktuálně namapovanou na klíč `dog` v trii, nejprve byste převedli `dog` na písmena abecedy (což by dalo `64 6f 67`) a poté byste sestupovali trií po této cestě, dokud byste nenašli hodnotu. To znamená, že začnete vyhledáním kořenového hashe v ploché databázi klíč/hodnota, abyste našli kořenový uzel trie. Ten je reprezentován jako pole klíčů ukazujících na další uzly. Použili byste hodnotu na indexu `6` jako klíč a vyhledali ji v ploché databázi klíč/hodnota, abyste získali uzel o úroveň níže. Poté vyberete index `4` pro vyhledání další hodnoty, pak vyberete index `6` a tak dále, dokud po sledování cesty: `root -> 6 -> 4 -> 6 -> 15 -> 6 -> 7` nevyhledáte hodnotu uzlu a nevrátíte výsledek.

Je rozdíl mezi vyhledáváním něčeho v „trii“ a v podkladové ploché „databázi“ klíč/hodnota. Obě definují uspořádání klíč/hodnota, ale podkladová databáze dokáže provést tradiční jednokrokové vyhledání klíče. Vyhledání klíče v trii vyžaduje vícenásobné vyhledávání v podkladové databázi, abyste se dostali ke konečné hodnotě popsané výše. Abychom předešli nejasnostem, budeme to druhé označovat jako `path`.

Operace aktualizace a mazání pro radixové trie lze definovat následovně:

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

„Merkleův“ radixový strom je vytvořen propojením uzlů pomocí deterministicky generovaných kryptografických hashů. Toto adresování podle obsahu (v databázi klíč/hodnota `key == keccak256(rlp(value))`) poskytuje kryptografickou záruku integrity uložených dat. Pokud je kořenový hash dané trie veřejně známý, pak kdokoli s přístupem k podkladovým datům listů může zkonstruovat důkaz, že trie obsahuje danou hodnotu na konkrétní cestě, a to poskytnutím hashů každého uzlu spojujícího konkrétní hodnotu s kořenem stromu.

Pro útočníka je nemožné poskytnout důkaz o páru `(path, value)`, který neexistuje, protože kořenový hash je v konečném důsledku založen na všech hashích pod ním. Jakákoli podkladová úprava by změnila kořenový hash. Hash si můžete představit jako komprimovanou reprezentaci strukturálních informací o datech, zabezpečenou ochranou proti nalezení vzoru (pre-image) hashovací funkce.

Atomickou jednotku radixového stromu (např. jeden hexadecimální znak nebo 4bitové binární číslo) budeme označovat jako „nibble“ (půlbajt). Při procházení cesty po jednom nibblu, jak je popsáno výše, mohou uzly maximálně odkazovat na 16 potomků, ale obsahují prvek `value`. Proto je reprezentujeme jako pole o délce 17. Tato 17prvková pole nazýváme „uzly větve“ (branch nodes).

## Merkle-Patricia trie {#merkle-patricia-trees}

Radixové trie mají jedno hlavní omezení: jsou neefektivní. Pokud chcete uložit jednu vazbu `(path, value)`, kde je cesta, jako v Ethereu, dlouhá 64 znaků (počet nibblů v `bytes32`), budeme potřebovat více než kilobajt prostoru navíc k uložení jedné úrovně na znak a každé vyhledání nebo smazání zabere celých 64 kroků. Patricia trie představená v následujícím textu tento problém řeší.

### Optimalizace {#optimization}

Uzel v Merkle-Patricia trii je jedním z následujících:

1.  `NULL` (reprezentováno jako prázdný řetězec)
2.  `branch` 17prvkový uzel `[ v0 ... v15, vt ]`
3.  `leaf` 2prvkový uzel `[ encodedPath, value ]`
4.  `extension` 2prvkový uzel `[ encodedPath, key ]`

U cest o délce 64 znaků je nevyhnutelné, že po projití prvních několika vrstev trie narazíte na uzel, kde alespoň po část cesty dolů neexistuje žádná odlišná cesta. Abychom se vyhnuli nutnosti vytvářet podél cesty až 15 řídkých uzlů `NULL`, zkrátíme sestup nastavením uzlu `extension` ve tvaru `[ encodedPath, key ]`, kde `encodedPath` obsahuje „částečnou cestu“ pro přeskočení vpřed (pomocí kompaktního kódování popsaného níže) a `key` slouží pro další vyhledávání v databázi.

U uzlu `leaf`, který může být označen příznakem v prvním nibblu `encodedPath`, cesta kóduje všechny fragmenty cest předchozích uzlů a můžeme přímo vyhledat `value`.

Výše uvedená optimalizace však vnáší nejednoznačnost.

Při procházení cest po nibblech můžeme skončit s lichým počtem nibblů k projití, ale protože jsou všechna data uložena ve formátu `bytes`, není možné rozlišit například mezi nibblem `1` a nibbly `01` (oba musí být uloženy jako `<01>`). Pro specifikaci liché délky je částečná cesta uvozena příznakem.

### Specifikace: Kompaktní kódování hexadecimální sekvence s volitelným ukončovačem {#specification}

Označení jak _liché vs. sudé zbývající délky částečné cesty_, tak _uzlu listu vs. rozšíření_, jak je popsáno výše, se nachází v prvním nibblu částečné cesty jakéhokoli 2prvkového uzlu. Výsledkem je následující:

| hex znak | bity | typ uzlu částečné  | délka cesty |
| -------- | ---- | ------------------ | ----------- |
| 0        | 0000 | rozšíření          | sudá        |
| 1        | 0001 | rozšíření          | lichá       |
| 2        | 0010 | ukončující (list)  | sudá        |
| 3        | 0011 | ukončující (list)  | lichá       |

Pro sudou zbývající délku cesty (`0` nebo `2`) bude vždy následovat další „výplňový“ nibble `0`.

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
        # hexarray má nyní sudou délku, přičemž jeho první nibble představuje příznaky.
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

Zde je rozšířený kód pro získání uzlu v Merkle-Patricia trii:

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

### Příklad trie {#example-trie}

Předpokládejme, že chceme trii obsahující čtyři páry cesta/hodnota `('do', 'verb')`, `('dog', 'puppy')`, `('doge', 'coins')`, `('horse', 'stallion')`.

Nejprve převedeme cesty i hodnoty na `bytes`. Níže jsou skutečné bajtové reprezentace pro _cesty_ označeny pomocí `<>`, ačkoli _hodnoty_ jsou pro snazší pochopení stále zobrazeny jako řetězce, označené pomocí `''` (i ty by ve skutečnosti byly `bytes`):

```
<64 6f> : 'verb'
    <64 6f 67> : 'puppy'
    <64 6f 67 65> : 'coins'
    <68 6f 72 73 65> : 'stallion'
```

Nyní vytvoříme takovou trii s následujícími páry klíč/hodnota v podkladové databázi:

```
rootHash: [ <16>, hashA ]
    hashA:    [ <>, <>, <>, <>, hashB, <>, <>, <>, [ <20 6f 72 73 65>, 'stallion' ], <>, <>, <>, <>, <>, <>, <>, <> ]
    hashB:    [ <00 6f>, hashC ]
    hashC:    [ <>, <>, <>, <>, <>, <>, hashD, <>, <>, <>, <>, <>, <>, <>, <>, <>, 'verb' ]
    hashD:    [ <17>, [ <>, <>, <>, <>, <>, <>, [ <35>, 'coins' ], <>, <>, <>, <>, <>, <>, <>, <>, <>, 'puppy' ] ]
```

Když je jeden uzel odkazován uvnitř jiného uzlu, je zahrnuto `keccak256(rlp.encode(node))`, pokud `len(rlp.encode(node)) >= 32`, jinak `node`, kde `rlp.encode` je kódovací funkce [RLP](/developers/docs/data-structures-and-encoding/rlp).

Všimněte si, že při aktualizaci trie je nutné uložit pár klíč/hodnota `(keccak256(x), x)` do trvalé vyhledávací tabulky, _pokud_ má nově vytvořený uzel délku >= 32. Pokud je však uzel kratší, není nutné ukládat nic, protože funkce f(x) = x je reverzibilní.

## Trie v Ethereu {#tries-in-ethereum}

Všechny Merkleovy trie v exekuční vrstvě Etherea používají Merkle-Patricia trii.

Z hlavičky bloku vycházejí 3 kořeny ze 3 těchto trií.

1.  stateRoot
2.  transactionsRoot
3.  receiptsRoot

### Stavová trie {#state-trie}

Existuje jedna globální stavová trie a ta se aktualizuje pokaždé, když klient zpracuje blok. V ní je `path` vždy: `keccak256(ethereumAddress)` a `value` je vždy: `rlp(ethereumAccount)`. Přesněji řečeno, `account` Etherea je 4prvkové pole `[nonce,balance,storageRoot,codeHash]`. V tomto bodě stojí za zmínku, že tento `storageRoot` je kořenem další Patricia trie:

### Strom úložiště {#storage-trie}

Strom úložiště je místo, kde se nacházejí _všechna_ data kontraktu. Pro každý účet existuje samostatný strom úložiště. K získání hodnot na konkrétních pozicích úložiště na dané adrese je vyžadována adresa úložiště, celočíselná pozice uložených dat v úložišti a ID bloku. Ty pak mohou být předány jako argumenty do `eth_getStorageAt` definovaného v JSON-RPC API, např. pro získání dat ve slotu úložiště 0 pro adresu `0x295a70b2de5e3953354a6a8344e616ed314d7251`:

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}

```

Získávání dalších prvků v úložišti je o něco složitější, protože nejprve musí být vypočítána pozice ve stromu úložiště. Pozice se vypočítá jako hash `keccak256` adresy a pozice v úložišti, obojí doplněné zleva nulami na délku 32 bajtů. Například pozice pro data ve slotu úložiště 1 pro adresu `0x391694e7e0b0cce554cb130d723a9d27458f9298` je:

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

`path` je tedy `keccak256(<6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9>)`. To lze nyní použít k získání dat ze stromu úložiště jako dříve:

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

Poznámka: `storageRoot` pro účet Etherea je ve výchozím nastavení prázdný, pokud se nejedná o kontraktový účet.

### Trie transakcí {#transaction-trie}

Pro každý blok existuje samostatná trie transakcí, která opět ukládá páry `(key, value)`. Cesta je zde: `rlp(transactionIndex)`, což představuje klíč, který odpovídá hodnotě určené pomocí:

```python
if legacyTx:
  value = rlp(tx)
else:
  value = TxType | encode(tx)
```

Více informací o tom naleznete v dokumentaci [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718).

### Trie stvrzenek {#receipts-trie}

Každý blok má svou vlastní trii stvrzenek. `path` je zde: `rlp(transactionIndex)`. `transactionIndex` je její index v rámci bloku, do kterého byla zahrnuta. Trie stvrzenek se nikdy neaktualizuje. Podobně jako u trie transakcí existují aktuální a starší (legacy) stvrzenky. K dotazování na konkrétní stvrzenku v trii stvrzenek je vyžadován index transakce v jejím bloku, datová část (payload) stvrzenky a typ transakce. Vrácená stvrzenka může být typu `Receipt`, který je definován jako zřetězení `TransactionType` a `ReceiptPayload`, nebo může být typu `LegacyReceipt`, který je definován jako `rlp([status, cumulativeGasUsed, logsBloom, logs])`.

Více informací o tom naleznete v dokumentaci [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718).

## Další čtení {#further-reading}

- [Modifikovaná Merkle-Patricia trie — Jak Ethereum ukládá stav](https://medium.com/codechain/modified-merkle-patricia-trie-how-ethereum-saves-a-state-e6d7555078dd)
- [Merkling v Ethereu](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum)
- [Porozumění trii Etherea](https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/)