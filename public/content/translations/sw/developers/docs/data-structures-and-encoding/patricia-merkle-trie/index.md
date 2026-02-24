---
title: Merkle Patricia Trie
description: Utangulizi wa Merkle Patricia Trie.
lang: sw
sidebarDepth: 2
---

Hali ya Ethereum (jumla ya akaunti zote, salio, na mikataba-erevu), imesimbwa katika toleo maalum la muundo wa data unaojulikana kwa ujumla katika sayansi ya kompyuta kama Mti wa Merkle. Muundo huu ni muhimu kwa matumizi mengi katika kriptografia kwa sababu huunda uhusiano unaoweza kuthibitishwa kati ya vipande vyote vya data vilivyofungamanishwa kwenye mti, na kusababisha thamani moja ya **mzizi** ambayo inaweza kutumika kuthibitisha mambo kuhusu data.

Muundo wa data wa Ethereum ni 'Merkle-Patricia Trie iliyobadilishwa', iliyopewa jina hilo kwa sababu inakopa baadhi ya vipengele vya PATRICIA (Kanuni Vitendo ya Kupata Taarifa Zilizosimbwa katika Alfanumeriki), na kwa sababu imeundwa kwa ajili ya upatikanaji wa data wenye ufanisi wa vipengee vinavyounda hali ya Ethereum.

Merkle-Patricia trie ni bainifu na inaweza kuthibitishwa kikriptografia: Njia pekee ya kuzalisha mzizi wa hali ni kwa kuikokotoa kutoka kwa kila kipande cha hali, na hali mbili zinazofanana zinaweza kuthibitishwa kwa urahisi kwa kulinganisha hashi ya mzizi na hashi zilizoielekeza (_uthibitisho wa Merkle_). Kinyume chake, hakuna njia ya kuunda hali mbili tofauti zenye hashi ya mzizi sawa, na jaribio lolote la kurekebisha hali kwa thamani tofauti litasababisha hashi tofauti ya mzizi wa hali. Kinadharia, muundo huu unatoa 'grail takatifu' ya ufanisi wa `O(log(n))` kwa uwekaji, utafutaji na ufutaji.

Katika siku za usoni, Ethereum inapanga kuhamia kwenye muundo wa [Mti wa Verkle](/roadmap/verkle-trees), ambao utafungua uwezekano mwingi mpya kwa maboresho ya itifaki ya baadaye.

## Mahitaji ya awali {#prerequisites}

Ili kuelewa ukurasa huu vizuri, itasaidia kuwa na maarifa ya msingi ya [hashi](https://en.wikipedia.org/wiki/Hash_function), [Miti ya Merkle](https://en.wikipedia.org/wiki/Merkle_tree), [tries](https://en.wikipedia.org/wiki/Trie) na [ufuatishaji](https://en.wikipedia.org/wiki/Serialization). Makala hii inaanza na maelezo ya msingi ya [mti wa radix](https://en.wikipedia.org/wiki/Radix_tree), kisha polepole inaleta marekebisho muhimu kwa muundo wa data ulioboreshwa zaidi wa Ethereum.

## Tries za msingi za radix {#basic-radix-tries}

Katika trie ya msingi ya radix, kila nodi inaonekana kama ifuatavyo:

```
    [i_0, i_1 ... i_n, value]
```

Ambapo `i_0 ...` `i_n` zinawakilisha alama za alfabeti (mara nyingi za kibinadamu au heksi), `thamani` ni thamani ya mwisho kwenye nodi, na thamani katika `i_0, i_1 ...` yanayopangwa ya `i_n` ni ama `NULL` au viashiria kwa (katika kesi yetu, hashi za) nodi zingine. Hii huunda hifadhi ya msingi ya `(ufunguo, thamani)`.

Sema ungetaka kutumia muundo wa data wa mti wa radix kuhifadhi mpangilio juu ya seti ya jozi za ufunguo na thamani. Ili kupata thamani iliyopangwa kwa sasa kwa ufunguo `dog` katika trie, ungeanza kwa kubadilisha `dog` kuwa herufi za alfabeti (kutoa `64 6f 67`), na kisha kushuka chini ya trie ukifuata njia hiyo hadi upate thamani. Hiyo ni, unaanza kwa kutafuta hashi ya mzizi katika DB ya ufunguo/thamani tambarare ili kupata nodi ya mzizi wa trie. Inawakilishwa kama safu ya funguo zinazoelekeza kwa nodi zingine. Ungetumia thamani kwenye faharisi `6` kama ufunguo na uitafute katika DB ya ufunguo/thamani tambarare ili kupata nodi ngazi moja chini. Kisha chagua faharisi `4` kutafuta thamani inayofuata, kisha chagua faharisi `6`, na kadhalika, hadi, mara tu ulipofuata njia: `mzizi -> 6 -> 4 -> 6 -> 15 -> 6 -> 7`, ungetafuta thamani ya nodi na kurudisha matokeo.

Kuna tofauti kati ya kutafuta kitu katika 'trie' na DB ya ufunguo/thamani 'DB' ya msingi. Zote mbili zinafafanua mipangilio ya ufunguo/thamani, lakini DB ya msingi inaweza kufanya utafutaji wa hatua 1 wa jadi wa ufunguo. Kutafuta ufunguo katika trie kunahitaji utafutaji mwingi wa DB ya msingi ili kufikia thamani ya mwisho iliyoelezwa hapo juu. Wacha turejelee ya mwisho kama `njia` ili kuondoa utata.

Shughuli za sasisho na ufutaji kwa tries za radix zinaweza kufafanuliwa kama ifuatavyo:

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

Mti wa Radix wa "Merkle" hujengwa kwa kuunganisha nodi kwa kutumia muhtasari wa hashi za kikriptografia zinazozalishwa kwa njia bainifu. Utambulisho huu wa maudhui (katika DB ya ufunguo/thamani `ufunguo == keccak256(rlp(thamani))`) unatoa dhamana ya uadilifu wa kikriptografia wa data iliyohifadhiwa. Ikiwa hashi ya mzizi wa trie fulani inajulikana hadharani, basi mtu yeyote aliye na ufikiaji wa data ya majani ya msingi anaweza kutengeneza uthibitisho kwamba trie inajumuisha thamani fulani kwenye njia maalum kwa kutoa hashi za kila nodi inayounganisha thamani maalum kwenye mzizi wa mti.

Haiwezekani kwa mshambuliaji kutoa uthibitisho wa jozi ya `(njia, thamani)` ambayo haipo kwani hashi ya mzizi hatimaye inategemea hashi zote zilizo chini yake. Marekebisho yoyote ya msingi yangebadilisha hashi ya mzizi. Unaweza kufikiria hashi kama uwakilishi ulioshinikizwa wa habari za kimuundo kuhusu data, iliyolindwa na ulinzi wa kabla ya picha wa kazi ya kuhasi.

Tutarejelea kitengo cha atomiki cha mti wa radix (k.m., herufi moja ya heksi, au nambari ya kibinadamu ya biti 4) kama "nibble". Wakati wa kupitia njia nibble moja kwa wakati, kama ilivyoelezwa hapo juu, nodi zinaweza kurejelea watoto 16 kwa kiwango cha juu lakini zinajumuisha kipengele cha `thamani`. Kwa hivyo, tunaziwakilisha kama safu ya urefu 17. Tunaziita safu hizi za vipengele 17 "nodi za tawi".

## Merkle Patricia Trie {#merkle-patricia-trees}

Tries za Radix zina kizuizi kimoja kikuu: hazina ufanisi. Ikiwa unataka kuhifadhi kifungo kimoja cha `(njia, thamani)` ambapo njia, kama ilivyo katika Ethereum, ina urefu wa herufi 64 (idadi ya nibbles katika `bytes32`), tutahitaji zaidi ya kilobaiti ya nafasi ya ziada kuhifadhi ngazi moja kwa kila herufi, na kila utafutaji au ufutaji utachukua hatua zote 64. Trie ya Patricia iliyoletwa katika yafuatayo inatatua suala hili.

### Uboreshaji {#optimization}

Nodi katika Merkle Patricia trie ni mojawapo ya yafuatayo:

1. `NULL` (inayowakilishwa kama kamba tupu)
2. `tawi` Nodi ya vipengee 17 `[ v0 ...` `v15, vt ]`
3. `jani` Nodi ya vipengee 2 `[ njiaIliyosimbwa, thamani ]`
4. `kiendelezi` Nodi ya vipengee 2 `[ njiaIliyosimbwa, ufunguo ]`

Kwa njia za herufi 64 haiwezi kuepukika kwamba baada ya kupitia safu chache za kwanza za trie, utafikia nodi ambapo hakuna njia inayotofautiana kwa angalau sehemu ya njia ya kushuka. Ili kuepuka kulazimika kuunda hadi nodi 15 za `NULL` zenye nafasi njiani, tunafupisha mteremko kwa kuanzisha nodi ya `kiendelezi` ya fomu `[ njiaIliyosimbwa, ufunguo ]`, ambapo `njiaIliyosimbwa` ina "njia sehemu" ya kuruka mbele (kwa kutumia usimbaji fupi ulioelezwa hapa chini), na `ufunguo` ni kwa ajili ya utafutaji unaofuata wa DB.

Kwa nodi ya `jani`, ambayo inaweza kuwekwa alama na bendera katika nibble ya kwanza ya `njiaIliyosimbwa`, njia inasimba vipande vyote vya njia za nodi za awali na tunaweza kutafuta `thamani` moja kwa moja.

Uboreshaji huu hapo juu, hata hivyo, unaleta utata.

Wakati wa kupitia njia katika nibbles, tunaweza kuishia na idadi isiyo ya kawaida ya nibbles za kupitia, lakini kwa sababu data yote imehifadhiwa katika umbizo la `baiti`. Haiwezekani kutofautisha kati ya, kwa mfano, nibble `1`, na nibbles `01` (zote mbili lazima zihifadhiwe kama `<01>`). Ili kubainisha urefu usio wa kawaida, njia sehemu inatangulizwa na bendera.

### Maelezo: Usimbaji fupi wa mfuatano wa heksi na kituo cha hiari {#specification}

Uwekaji alama wa _urefu wa njia sehemu uliobaki usio wa kawaida dhidi ya wa kawaida_ na _nodi ya jani dhidi ya nodi ya kiendelezi_ kama ilivyoelezwa hapo juu unapatikana katika nibble ya kwanza ya njia sehemu ya nodi yoyote ya vipengee 2. Zinaleta yafuatayo:

| herufi ya heksi | biti | sehemu ya aina ya nodi              | urefu wa njia    |
| --------------- | ---- | ----------------------------------- | ---------------- |
| 0               | 0000 | kiendelezi                          | hata             |
| 1               | 0001 | kiendelezi                          | isiyo ya kawaida |
| 2               | 0010 | inayokoma (jani) | hata             |
| 3               | 0011 | inayokoma (jani) | isiyo ya kawaida |

Kwa urefu wa njia uliobaki hata (`0` au `2`), nibble nyingine ya `0` ya "kujazia" itafuata daima.

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

Hapa kuna msimbo uliopanuliwa wa kupata nodi katika Merkle Patricia trie:

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

Kwanza, tunabadilisha njia na thamani zote kuwa `baiti`. Hapa chini, uwakilishi halisi wa baiti kwa _njia_ umeonyeshwa na `<>`, ingawa _thamani_ bado zinaonyeshwa kama kamba, zilizoonyeshwa na `''`, kwa ufahamu rahisi (nazo, pia, zingekuwa `baiti`):

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

Wakati nodi moja inarejelewa ndani ya nodi nyingine, kinachojumuishwa ni `keccak256(rlp.encode(node))`, ikiwa `len(rlp.encode(node)) >= 32` vinginevyo `nodi` ambapo `rlp.encode` ni kazi ya usimbaji ya [RLP](/developers/docs/data-structures-and-encoding/rlp).

Kumbuka kwamba wakati wa kusasisha trie, mtu anahitaji kuhifadhi jozi ya ufunguo/thamani `(keccak256(x), x)` katika jedwali la utafutaji la kudumu _ikiwa_ nodi mpya iliyoundwa ina urefu >= 32. Hata hivyo, ikiwa nodi ni fupi kuliko hiyo, mtu hahitaji kuhifadhi chochote, kwani kazi f(x) = x inaweza kugeuzwa.

## Tries katika Ethereum {#tries-in-ethereum}

Tries zote za merkle katika safu ya utekelezaji ya Ethereum hutumia Merkle Patricia Trie.

Kutoka kwa kichwa cha bloku kuna mizizi 3 kutoka kwa tries 3 hizi.

1. stateRoot
2. transactionsRoot
3. receiptsRoot

### Trie ya Hali {#state-trie}

Kuna trie moja ya hali ya kimataifa, na inasasishwa kila wakati mteja anapochakata bloku. Ndani yake, `njia` daima ni: `keccak256(ethereumAddress)` na `thamani` daima ni: `rlp(ethereumAccount)`. Kwa usahihi zaidi `akaunti` ya Ethereum ni safu ya vitu 4 ya `[nonce,salio,mziziGhala,codeHash]`. Kwa wakati huu, inafaa kuzingatia kwamba `mziziGhala` hii ni mzizi wa trie nyingine ya patricia:

### Trie ya Ghala {#storage-trie}

Trie ya ghala ni mahali ambapo data _yote_ ya mkataba huishi. Kuna trie tofauti ya ghala kwa kila akaunti. Ili kupata thamani katika nafasi maalum za ghala kwenye anwani fulani, anwani ya ghala, nafasi ya nambari kamili ya data iliyohifadhiwa katika ghala, na ID ya bloku zinahitajika. Hizi zinaweza kupitishwa kama hoja kwa `eth_getStorageAt` iliyofafanuliwa katika API ya JSON-RPC, k.m., kupata data katika yanayopangwa kwa ghala 0 kwa anwani `0x295a70b2de5e3953354a6a8344e616ed314d7251`:

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}

```

Kupata vipengele vingine katika ghala ni ngumu kidogo kwa sababu nafasi katika trie ya ghala lazima kwanza ikokotolewe. Nafasi inakokotolewa kama hashi ya `keccak256` ya anwani na nafasi ya ghala, zote zimejazwa upande wa kushoto na sufuri hadi urefu wa baiti 32. Kwa mfano, nafasi ya data katika yanayopangwa kwa ghala 1 kwa anwani `0x391694e7e0b0cce554cb130d723a9d27458f9298` ni:

```python
keccak256(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```

Katika koni ya Geth, hii inaweza kukokotolewa kama ifuatavyo:

```
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

`Njia` kwa hiyo ni `keccak256(<6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9>)`. Hii sasa inaweza kutumika kupata data kutoka kwa trie ya ghala kama hapo awali:

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

Kumbuka: `mziziGhala` ya akaunti ya Ethereum huwa tupu kwa chaguo-msingi ikiwa si akaunti ya mkataba.

### Trie ya Miamala {#transaction-trie}

Kuna trie tofauti ya miamala kwa kila bloku, tena ikihifadhi jozi za `(ufunguo, thamani)`. Njia hapa ni: `rlp(transactionIndex)` ambayo inawakilisha ufunguo unaolingana na thamani iliyobainishwa na:

```python
if legacyTx:
  value = rlp(tx)
else:
  value = TxType | encode(tx)
```

Maelezo zaidi kuhusu hili yanaweza kupatikana katika nyaraka za [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718).

### Trie ya Risiti {#receipts-trie}

Kila bloku ina trie yake ya Risiti. `Njia` hapa ni: `rlp(transactionIndex)`. `transactionIndex` ni faharisi yake ndani ya bloku iliyojumuishwa. Trie ya risiti haisasishwi kamwe. Sawa na trie ya Miamala, kuna risiti za sasa na za zamani. Ili kuuliza risiti maalum katika trie ya Risiti, faharisi ya muamala katika bloku yake, mzigo wa risiti na aina ya muamala zinahitajika. Risiti Iliyorejeshwa inaweza kuwa ya aina ya `Risiti` ambayo inafafanuliwa kama muunganisho wa `AinaYaMuamala` na `MzigoWaRisiti` au inaweza kuwa ya aina ya `RisitiYaZamani` ambayo inafafanuliwa kama `rlp([hali, cumulativeGasUsed, logsBloom, kumbukumbu])`.

Maelezo zaidi kuhusu hili yanaweza kupatikana katika nyaraka za [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718).

## Masomo zaidi {#further-reading}

- [Merkle Patricia Trie Iliyobadilishwa — Jinsi Ethereum inavyohifadhi hali](https://medium.com/codechain/modified-merkle-patricia-trie-how-ethereum-saves-a-state-e6d7555078dd)
- [Kufanya Merkle katika Ethereum](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum/)
- [Kuelewa trie ya Ethereum](https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/)
