---
title: Trie ya Merkle Patricia
description: Utangulizi wa Trie ya Merkle Patricia.
lang: sw
sidebarDepth: 2
---

Hali ya [Ethereum](/) (jumla ya akaunti zote, salio, na mikataba mahiri), imesimbwa katika toleo maalum la muundo wa data unaojulikana kwa ujumla katika sayansi ya kompyuta kama mti wa Merkle. Muundo huu ni muhimu kwa matumizi mengi katika kriptografia kwa sababu unaunda uhusiano unaoweza kuthibitishwa kati ya vipande vyote vya data vilivyounganishwa kwenye mti, na kusababisha thamani moja ya **mzizi** ambayo inaweza kutumika kuthibitisha mambo kuhusu data.

Muundo wa data wa Ethereum ni 'Trie ya Merkle-Patricia iliyobadilishwa', iliyopewa jina hilo kwa sababu inachukua baadhi ya vipengele vya PATRICIA (Practical Algorithm To Retrieve Information Coded in Alphanumeric), na kwa sababu imeundwa kwa ajili ya urejeshaji (re**trie**val) mzuri wa data wa vipengee vinavyounda hali ya Ethereum.

Trie ya Merkle-Patricia ni thabiti na inaweza kuthibitishwa kikriptografia: Njia pekee ya kuzalisha mzizi wa hali ni kwa kuukokotoa kutoka kwa kila kipande cha hali, na hali mbili zinazofanana zinaweza kuthibitishwa kwa urahisi kwa kulinganisha heshi ya mzizi na heshi zilizosababisha (_uthibitisho wa Merkle_). Kinyume chake, hakuna njia ya kuunda hali mbili tofauti zenye heshi ya mzizi sawa, na jaribio lolote la kurekebisha hali kwa thamani tofauti litasababisha heshi tofauti ya mzizi wa hali. Kinadharia, muundo huu unatoa 'kikombe kitakatifu' cha ufanisi wa `O(log(n))` kwa uwekaji, utafutaji na ufutaji.

Katika siku za usoni, Ethereum inapanga kuhamia kwenye muundo wa [Mti wa Verkle](/roadmap/verkle-trees), ambao utafungua uwezekano mwingi mpya wa maboresho ya itifaki ya baadaye.

## Mahitaji ya Awali {#prerequisites}

Ili kuelewa vyema ukurasa huu, itakuwa na manufaa kuwa na ujuzi wa kimsingi wa [heshi](https://en.wikipedia.org/wiki/Hash_function), [miti ya Merkle](https://en.wikipedia.org/wiki/Merkle_tree), [trie](https://en.wikipedia.org/wiki/Trie) na [usanjari](https://en.wikipedia.org/wiki/Serialization). Makala haya yanaanza na maelezo ya [mti wa radix](https://en.wikipedia.org/wiki/Radix_tree) wa kimsingi, kisha hatua kwa hatua inatambulisha marekebisho muhimu kwa muundo wa data ulioboreshwa zaidi wa Ethereum.

## Trie za kimsingi za radix {#basic-radix-tries}

Katika trie ya kimsingi ya radix, kila nodi inaonekana kama ifuatavyo:

```
[i_0, i_1 ... i_n, value]
```

Ambapo `i_0 ... i_n` inawakilisha alama za alfabeti (mara nyingi mfumo wa jozi au heksadesimali), `value` ni thamani ya mwisho kwenye nodi, na thamani katika sloti za `i_0, i_1 ... i_n` ni ama `NULL` au vielekezi kwa (katika kesi yetu, heshi za) nodi zingine. Hii inaunda hifadhi ya kimsingi ya `(key, value)`.

Tuseme ungetaka kutumia muundo wa data wa mti wa radix kwa kuhifadhi mpangilio juu ya seti ya jozi za thamani za ufunguo. Ili kupata thamani iliyopangwa kwa sasa kwenye ufunguo `dog` katika trie, kwanza ungebadilisha `dog` kuwa herufi za alfabeti (kutoa `64 6f 67`), na kisha kushuka kwenye trie kufuatia njia hiyo hadi upate thamani. Yaani, unaanza kwa kutafuta heshi ya mzizi katika hifadhidata (DB) bapa ya ufunguo/thamani ili kupata nodi ya mzizi ya trie. Inawakilishwa kama safu ya funguo zinazoelekeza kwenye nodi zingine. Ungetumia thamani kwenye faharisi `6` kama ufunguo na kuitafuta katika DB bapa ya ufunguo/thamani ili kupata nodi ngazi moja chini. Kisha chagua faharisi `4` ili kutafuta thamani inayofuata, kisha chagua faharisi `6`, na kadhalika, hadi, mara tu unapofuata njia: `root -> 6 -> 4 -> 6 -> 15 -> 6 -> 7`, ungetafuta thamani ya nodi na kurudisha matokeo.

Kuna tofauti kati ya kutafuta kitu katika 'trie' na 'DB' bapa ya msingi ya ufunguo/thamani. Zote mbili zinafafanua mipangilio ya ufunguo/thamani, lakini DB ya msingi inaweza kufanya utafutaji wa kitamaduni wa hatua 1 wa ufunguo. Kutafuta ufunguo katika trie kunahitaji utafutaji mwingi wa DB ya msingi ili kufikia thamani ya mwisho iliyoelezwa hapo juu. Hebu turejelee hii ya mwisho kama `path` ili kuondoa utata.

Operesheni za kusasisha na kufuta kwa trie za radix zinaweza kufafanuliwa kama ifuatavyo:

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

Mti wa Radix wa "Merkle" unajengwa kwa kuunganisha nodi kwa kutumia muhtasari wa heshi za kriptografia zinazozalishwa kwa uthabiti. Uelekezaji huu wa maudhui (katika DB ya ufunguo/thamani `key == keccak256(rlp(value))`) unatoa hakikisho la uadilifu wa kriptografia wa data iliyohifadhiwa. Ikiwa heshi ya mzizi ya trie fulani inajulikana hadharani, basi mtu yeyote aliye na ufikiaji wa data ya jani ya msingi anaweza kuunda uthibitisho kwamba trie inajumuisha thamani fulani kwenye njia maalum kwa kutoa heshi za kila nodi inayounganisha thamani maalum kwenye mzizi wa mti.

Haiwezekani kwa mshambuliaji kutoa uthibitisho wa jozi ya `(path, value)` ambayo haipo kwa kuwa heshi ya mzizi hatimaye inategemea heshi zote zilizo chini yake. Marekebisho yoyote ya msingi yangebadilisha heshi ya mzizi. Unaweza kufikiria heshi kama uwakilishi uliobanwa wa taarifa za kimuundo kuhusu data, uliolindwa na ulinzi wa picha ya awali wa utendakazi wa uheshiji.

Tutarejelea kipimo cha atomiki cha mti wa radix (k.m., herufi moja ya heksadesimali, au nambari ya jozi ya biti 4) kama "nibble". Wakati wa kupitia njia nibble moja kwa wakati, kama ilivyoelezwa hapo juu, nodi zinaweza kurejelea watoto 16 kwa kiwango cha juu lakini zinajumuisha kipengele cha `value`. Kwa hivyo, tunaziwakilisha kama safu ya urefu wa 17. Tunaita safu hizi za vipengele 17 "nodi za tawi".

## Trie ya Merkle Patricia {#merkle-patricia-trees}

Trie za radix zina kizuizi kimoja kikuu: hazina ufanisi. Ikiwa unataka kuhifadhi muunganisho mmoja wa `(path, value)` ambapo njia, kama ilivyo katika Ethereum, ina urefu wa herufi 64 (idadi ya nibble katika `bytes32`), tutahitaji zaidi ya kilobaiti ya nafasi ya ziada ili kuhifadhi kiwango kimoja kwa kila herufi, na kila utafutaji au ufutaji utachukua hatua zote 64. Trie ya Patricia iliyoletwa katika yafuatayo inasuluhisha suala hili.

### Uboreshaji {#optimization}

Nodi katika Trie ya Merkle Patricia ni mojawapo ya yafuatayo:

1.  `NULL` (inawakilishwa kama mfuatano tupu)
2.  `branch` Nodi ya vipengee 17 `[ v0 ... v15, vt ]`
3.  `leaf` Nodi ya vipengee 2 `[ encodedPath, value ]`
4.  `extension` Nodi ya vipengee 2 `[ encodedPath, key ]`

Kwa njia za herufi 64 ni jambo lisiloepukika kwamba baada ya kupitia tabaka chache za kwanza za trie, utafikia nodi ambapo hakuna njia tofauti iliyopo kwa angalau sehemu ya njia ya chini. Ili kuepuka kulazimika kuunda hadi nodi 15 tupu za `NULL` kando ya njia, tunafupisha mshuko kwa kuweka nodi ya `extension` ya muundo `[ encodedPath, key ]`, ambapo `encodedPath` ina "njia kiasi" ya kuruka mbele (kwa kutumia usimbaji thabiti ulioelezwa hapa chini), na `key` ni kwa ajili ya utafutaji unaofuata wa DB.

Kwa nodi ya `leaf`, ambayo inaweza kuwekewa alama na bendera katika nibble ya kwanza ya `encodedPath`, njia inasimba vipande vyote vya njia ya nodi ya awali na tunaweza kutafuta `value` moja kwa moja.

Uboreshaji huu wa hapo juu, hata hivyo, unaleta utata.

Wakati wa kupitia njia katika nibble, tunaweza kuishia na idadi isiyo ya kawaida (witiri) ya nibble za kupitia, lakini kwa sababu data yote imehifadhiwa katika muundo wa `bytes`. Haiwezekani kutofautisha kati ya, kwa mfano, nibble `1`, na nibble `01` (zote lazima zihifadhiwe kama `<01>`). Ili kubainisha urefu usio wa kawaida, njia kiasi inatanguliwa na bendera.

### Uainishaji: Usimbaji thabiti wa mfuatano wa heksadesimali na kikomo cha hiari {#specification}

Uwekaji bendera wa _urefu wa njia kiasi uliosalia wa witiri dhidi ya shufwa_ na _nodi ya jani dhidi ya kiendelezi_ kama ilivyoelezwa hapo juu unakaa katika nibble ya kwanza ya njia kiasi ya nodi yoyote ya vipengee 2. Zinasababisha yafuatayo:

| herufi ya heksadesimali | biti | aina ya nodi kiasi | urefu wa njia |
| -------- | ---- | ------------------ | ----------- |
| 0        | 0000 | kiendelezi          | shufwa        |
| 1        | 0001 | kiendelezi          | witiri         |
| 2        | 0010 | kikomo (jani) | shufwa        |
| 3        | 0011 | kikomo (jani) | witiri         |

Kwa urefu wa njia uliosalia wa shufwa (`0` au `2`), nibble nyingine ya "kujaza" ya `0` itafuata kila wakati.

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
        # hexarray sasa ina urefu shufwa ambao nibble yake ya kwanza ni bendera.
        o = ""
        for i in range(0, len(hexarray), 2):
            o += chr(16 * hexarray[i] + hexarray[i + 1])
        return o
```

Mifano:

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

Hapa kuna msimbo uliopanuliwa wa kupata nodi katika Trie ya Merkle Patricia:

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

### Mfano wa Trie {#example-trie}

Tuseme tunataka trie iliyo na jozi nne za njia/thamani `('do', 'verb')`, `('dog', 'puppy')`, `('doge', 'coins')`, `('horse', 'stallion')`.

Kwanza, tunabadilisha njia na thamani zote kuwa `bytes`. Hapa chini, uwakilishi halisi wa baiti kwa _njia_ unaonyeshwa na `<>`, ingawa _thamani_ bado zinaonyeshwa kama mifuatano, inayoonyeshwa na `''`, kwa ufahamu rahisi (hizo pia, kwa kweli zingekuwa `bytes`):

```
<64 6f> : 'verb'
    <64 6f 67> : 'puppy'
    <64 6f 67 65> : 'coins'
    <68 6f 72 73 65> : 'stallion'
```

Sasa, tunajenga trie kama hiyo na jozi zifuatazo za ufunguo/thamani katika DB ya msingi:

```
rootHash: [ <16>, hashA ]
    hashA:    [ <>, <>, <>, <>, hashB, <>, <>, <>, [ <20 6f 72 73 65>, 'stallion' ], <>, <>, <>, <>, <>, <>, <>, <> ]
    hashB:    [ <00 6f>, hashC ]
    hashC:    [ <>, <>, <>, <>, <>, <>, hashD, <>, <>, <>, <>, <>, <>, <>, <>, <>, 'verb' ]
    hashD:    [ <17>, [ <>, <>, <>, <>, <>, <>, [ <35>, 'coins' ], <>, <>, <>, <>, <>, <>, <>, <>, <>, 'puppy' ] ]
```

Wakati nodi moja inarejelewa ndani ya nodi nyingine, kinachojumuishwa ni `keccak256(rlp.encode(node))`, ikiwa `len(rlp.encode(node)) >= 32` vinginevyo `node` ambapo `rlp.encode` ni utendakazi wa usimbaji wa [RLP](/developers/docs/data-structures-and-encoding/rlp).

Kumbuka kwamba wakati wa kusasisha trie, mtu anahitaji kuhifadhi jozi ya ufunguo/thamani `(keccak256(x), x)` katika jedwali la utafutaji la kudumu _ikiwa_ nodi mpya iliyoundwa ina urefu >= 32. Hata hivyo, ikiwa nodi ni fupi kuliko hiyo, mtu hahitaji kuhifadhi chochote, kwa kuwa utendakazi f(x) = x unaweza kugeuzwa.

## Trie katika Ethereum {#tries-in-ethereum}

Trie zote za merkle katika tabaka la utekelezaji la Ethereum zinatumia Trie ya Merkle Patricia.

Kutoka kwenye kichwa cha kizuizi kuna mizizi 3 kutoka kwa trie 3 kati ya hizi.

1.  stateRoot
2.  transactionsRoot
3.  receiptsRoot

### Trie ya Hali {#state-trie}

Kuna trie moja ya hali ya kimataifa, na inasasishwa kila wakati mteja anapochakata kitalu. Ndani yake, `path` daima ni: `keccak256(ethereumAddress)` na `value` daima ni: `rlp(ethereumAccount)`. Hasa zaidi `account` ya Ethereum ni safu ya vipengee 4 vya `[nonce,balance,storageRoot,codeHash]`. Katika hatua hii, inafaa kuzingatia kwamba `storageRoot` hii ni mzizi wa trie nyingine ya patricia:

### Trie ya Hifadhi {#storage-trie}

Trie ya hifadhi ni mahali ambapo data _yote_ ya mkataba inakaa. Kuna trie tofauti ya hifadhi kwa kila akaunti. Ili kurejesha thamani katika nafasi maalum za hifadhi kwenye anwani fulani, anwani ya hifadhi, nafasi ya nambari kamili ya data iliyohifadhiwa katika hifadhi, na kitambulisho cha kitalu vinahitajika. Hizi zinaweza kupitishwa kama hoja kwa `eth_getStorageAt` iliyofafanuliwa katika API ya JSON-RPC, k.m., kurejesha data katika sloti ya hifadhi 0 kwa anwani `0x295a70b2de5e3953354a6a8344e616ed314d7251`:

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}

```

Kurejesha vipengele vingine katika hifadhi kunahusisha zaidi kidogo kwa sababu nafasi katika trie ya hifadhi lazima ikokotolewe kwanza. Nafasi inakokotolewa kama heshi ya `keccak256` ya anwani na nafasi ya hifadhi, zote zikiwa zimejazwa sufuri upande wa kushoto hadi urefu wa baiti 32. Kwa mfano, nafasi ya data katika sloti ya hifadhi 1 kwa anwani `0x391694e7e0b0cce554cb130d723a9d27458f9298` ni:

```python
keccak256(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```

Katika kiweko cha Geth, hii inaweza kukokotolewa kama ifuatavyo:

```
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Kwa hivyo `path` ni `keccak256(<6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9>)`. Hii sasa inaweza kutumika kurejesha data kutoka kwa trie ya hifadhi kama hapo awali:

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

Kumbuka: `storageRoot` kwa akaunti ya Ethereum ni tupu kwa chaguo-msingi ikiwa si akaunti ya mkataba.

### Trie ya Miamala {#transaction-trie}

Kuna trie tofauti ya miamala kwa kila kitalu, tena ikihifadhi jozi za `(key, value)`. Njia hapa ni: `rlp(transactionIndex)` ambayo inawakilisha ufunguo unaolingana na thamani inayoamuliwa na:

```python
if legacyTx:
  value = rlp(tx)
else:
  value = TxType | encode(tx)
```

Maelezo zaidi kuhusu hili yanaweza kupatikana katika nyaraka za [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718).

### Trie ya Stakabadhi {#receipts-trie}

Kila kitalu kina trie yake ya Stakabadhi. `path` hapa ni: `rlp(transactionIndex)`. `transactionIndex` ni faharisi yake ndani ya kitalu ilimojumuishwa. Trie ya stakabadhi haisasishwi kamwe. Sawa na trie ya Miamala, kuna stakabadhi za sasa na za zamani. Ili kuuliza stakabadhi maalum katika trie ya Stakabadhi, faharisi ya muamala katika kitalu chake, mzigo wa stakabadhi na aina ya muamala vinahitajika. Stakabadhi iliyorejeshwa inaweza kuwa ya aina ya `Receipt` ambayo inafafanuliwa kama muunganisho wa `TransactionType` na `ReceiptPayload` au inaweza kuwa ya aina ya `LegacyReceipt` ambayo inafafanuliwa kama `rlp([status, cumulativeGasUsed, logsBloom, logs])`.

Maelezo zaidi kuhusu hili yanaweza kupatikana katika nyaraka za [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718).

## Usomaji Zaidi {#further-reading}

- [Trie ya Merkle Patricia Iliyobadilishwa — Jinsi Ethereum inavyohifadhi hali](https://medium.com/codechain/modified-merkle-patricia-trie-how-ethereum-saves-a-state-e6d7555078dd)
- [Umerkli katika Ethereum](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum)
- [Kuelewa trie ya Ethereum](https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/)