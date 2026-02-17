---
title: Dagger-Hashimoto
description: Mtazamo wa kina kuhusu kanuni ya Dagger-Hashimoto.
lang: sw
---

Dagger-Hashimoto ilikuwa utekelezaji wa awali wa utafiti na maelezo ya kanuni ya uchimbaji ya Ethereum. Dagger-Hashimoto ilibadilishwa na [Ethash](#ethash). Uchimbaji ulizimwa kabisa wakati wa [Muungano](/roadmap/merge/) mnamo tarehe 15 Septemba 2022. Tangu wakati huo, Ethereum imekuwa ikilindwa kwa kutumia utaratibu wa [uthibitisho wa hisa](/developers/docs/consensus-mechanisms/pos) badala yake. Ukurasa huu ni kwa ajili ya maslahi ya kihistoria - maelezo yaliyomo hapa hayahusiani tena na Ethereum ya baada ya Muungano.

## Mahitaji ya awali {#prerequisites}

Ili kuelewa ukurasa huu vizuri zaidi, tunapendekeza kwanza usome kuhusu [makubaliano ya uthibitishaji-wa-kazi](/developers/docs/consensus-mechanisms/pow), [uchimbaji](/developers/docs/consensus-mechanisms/pow/mining), na [kanuni za uchimbaji](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms).

## Dagger-Hashimoto {#dagger-hashimoto}

Dagger-Hashimoto inalenga kutimiza malengo mawili:

1. **Ukinzani-wa-ASIC**: faida ya kutengeneza maunzi maalum kwa ajili ya kanuni inapaswa kuwa ndogo iwezekanavyo
2. **Uthibitisho wa mteja mwepesi**: bloku inapaswa kuthibitishwa kwa ufanisi na mteja mwepesi.

Kwa marekebisho ya ziada, pia tunaeleza jinsi ya kutimiza lengo la tatu ikiwa inahitajika, lakini kwa gharama ya utata wa ziada:

**Hifadhi kamili ya mnyororo**: uchimbaji unapaswa kuhitaji hifadhi ya hali kamili ya mnyororo wa bloku (kutokana na muundo usio wa kawaida wa trie ya hali ya Ethereum, tunatarajia kuwa upunguzaji fulani utawezekana, hasa wa baadhi ya mikataba inayotumiwa mara kwa mara, lakini tunataka kupunguza hili).

## Uzazi wa DAG {#dag-generation}

Msimbo wa kanuni utaelezwa katika Python hapa chini. Kwanza, tunatoa `encode_int` kwa ajili ya kupanga nambari kamili zisizo na alama za usahihi maalum kuwa mifuatano. Kinyume chake pia kimetolewa:

```python
NUM_BITS = 512

def encode_int(x):
    "Weka nambari kamili x kama mfuatano wa herufi 64 ukitumia mpango wa big-endian"
    o = ''
    for _ in range(NUM_BITS / 8):
        o = chr(x % 256) + o
        x //= 256
    return o

def decode_int(s):
    "Ondoa msimbo wa nambari kamili x kutoka kwenye mfuatano ukitumia mpango wa big-endian"
    x = 0
    for c in s:
        x *= 256
        x += ord(c)
    return x
```

Ifuatayo, tunadhani kwamba `sha3` ni chaguo la kukokotoa linalochukua nambari kamili na kutoa nambari kamili, na `dbl_sha3` ni chaguo la kukokotoa la double-sha3; ikiwa unabadilisha msimbo huu wa marejeleo kuwa utekelezaji, tumia:

```python
from pyethereum import utils
def sha3(x):
    if isinstance(x, (int, long)):
        x = encode_int(x)
    return decode_int(utils.sha3(x))

def dbl_sha3(x):
    if isinstance(x, (int, long)):
        x = encode_int(x)
    return decode_int(utils.sha3(utils.sha3(x)))
```

### Vigezo {#parameters}

Vigezo vinavyotumika kwa kanuni ni:

```python
SAFE_PRIME_512 = 2**512 - 38117 # Nambari Kuu Salama iliyo chini ya 2**512

params = {
 "n": 4000055296 * 8 // NUM_BITS, # Ukubwa wa seti ya data (Gigabaiti 4); LAZIMA IWE ZIDISHO LA 65536
 "n_inc": 65536, # Ongezeko la thamani ya n kwa kila kipindi; LAZIMA IWE ZIDISHO LA 65536
 # na epochtime=20000 inatoa ukuaji wa MB 882 kwa mwaka
 "cache_size": 2500, # Ukubwa wa kache ya mteja mwepesi (inaweza kuchaguliwa na mteja mwepesi; si sehemu ya vipimo vya kanuni)
 "diff": 2**14, # Ugumu (hurekebishwa wakati wa tathmini ya bloku)
 "epochtime": 100000, # Urefu wa kipindi katika bloku (mara ngapi seti ya data inasasishwa)
 "k": 1, # Idadi ya wazazi wa nodi
 "w": w, # Inatumika kwa ajili ya uhasishaji wa kipeo cha kimodula
 "accesses": 200, # Idadi ya ufikiaji wa seti ya data wakati wa hashimoto
 "P": SAFE_PRIME_512 # Nambari Kuu Salama kwa ajili ya uhasishaji na uzalishaji wa nambari nasibu
}
```

`P` katika kesi hii ni nambari kuu iliyochaguliwa kiasi kwamba `log₂(P)` ni chini kidogo ya 512, ambayo inalingana na biti 512 ambazo tumekuwa tukitumia kuwakilisha nambari zetu. Kumbuka kwamba ni nusu ya mwisho tu ya DAG ndiyo inayohitaji kuhifadhiwa, kwa hivyo mahitaji halisi ya RAM huanza kwa GB 1 na kukua kwa MB 441 kwa mwaka.

### Uundaji wa grafu ya Dagger {#dagger-graph-building}

Asili ya uundaji wa grafu ya dagger imefafanuliwa kama ifuatavyo:

```python
def produce_dag(params, seed, length):
    P = params["P"]
    picker = init = pow(sha3(seed), params["w"], P)
    o = [init]
    for i in range(1, length):
        x = picker = (picker * init) % P
        for _ in range(params["k"]):
            x ^= o[x % i]
        o.append(pow(x, params["w"], P))
    return o
```

Kimsingi, inaanza grafu kama nodi moja, `sha3(seed)`, na kutoka hapo huanza kuongeza kwa mfuatano nodi zingine kulingana na nodi za awali za nasibu. Wakati nodi mpya inaundwa, nguvu ya kimodula ya mbegu huhesabiwa ili kuchagua kwa nasibu fahirisi fulani zilizo chini ya `i` (kwa kutumia `x % i` hapo juu), na thamani za nodi kwenye fahirisi hizo hutumiwa katika hesabu ili kuzalisha thamani mpya ya `x`, ambayo hupelekwa kwenye chaguo dogo la uthibitisho wa kazi (kulingana na XOR) ili hatimaye kuzalisha thamani ya grafu kwenye fahirisi `i`. Sababu ya muundo huu maalum ni kulazimisha ufikiaji wa mfuatano wa DAG; thamani inayofuata ya DAG itakayofikiwa haiwezi kubainishwa hadi thamani ya sasa ijulikane. Mwishowe, upeo wa kimodula huhasisha matokeo zaidi.

Kanuni hii inategemea matokeo kadhaa kutoka kwa nadharia ya nambari. Tazama kiambatisho hapa chini kwa majadiliano.

## Tathmini ya mteja mwepesi {#light-client-evaluation}

Uundaji wa grafu hapo juu unakusudia kuruhusu kila nodi kwenye grafu kujengwa upya kwa kukokotoa mti mdogo wa idadi ndogo tu ya nodi na kuhitaji kiasi kidogo tu cha kumbukumbu saidizi. Kumbuka kuwa kwa k=1, mti mdogo ni mnyororo tu wa thamani zinazopanda hadi kwenye elementi ya kwanza katika DAG.

Chaguo la kukokotoa la kompyuta ya mteja mwepesi kwa DAG hufanya kazi kama ifuatavyo:

```python
def quick_calc(params, seed, p):
    w, P = params["w"], params["P"]
    cache = {}

    def quick_calc_cached(p):
        if p in cache:
            pass
        elif p == 0:
            cache[p] = pow(sha3(seed), w, P)
        else:
            x = pow(sha3(seed), (p + 1) * w, P)
            for _ in range(params["k"]):
                x ^= quick_calc_cached(x % p)
            cache[p] = pow(x, w, P)
        return cache[p]

    return quick_calc_cached(p)
```

Kimsingi, ni uandishi upya wa kanuni iliyo hapo juu ambao huondoa kitanzi cha kukokotoa thamani za DAG nzima na kubadilisha utafutaji wa nodi ya awali na wito wa kujirudia au utafutaji wa kache. Kumbuka kuwa kwa `k=1` kache si lazima, ingawa uboreshaji zaidi kwa kweli huhesabu mapema thamani elfu chache za kwanza za DAG na kuweka hiyo kama kache tuli kwa ajili ya hesabu; tazama kiambatisho kwa utekelezaji wa msimbo wa hili.

## Bafa maradufu ya DAGs {#double-buffer}

Katika mteja kamili, [_bafa maradufu_](https://wikipedia.org/wiki/Multiple_buffering) ya DAGs 2 zinazozalishwa na fomula iliyo hapo juu hutumiwa. Wazo ni kwamba DAGs huzalishwa kila `epochtime` idadi ya bloku kulingana na vigezo vilivyo hapo juu. Badala ya mteja kutumia DAG ya hivi karibuni iliyozalishwa, hutumia ile ya awali. Faida ya hili ni kwamba inaruhusu DAGs kubadilishwa kwa muda bila kuhitaji kujumuisha hatua ambapo wachimbaji lazima ghafla wahesabu upya data yote. Vinginevyo, kuna uwezekano wa kupungua kwa ghafla kwa muda katika usindikaji wa mnyororo kwa vipindi vya kawaida na kuongezeka kwa kiasi kikubwa kwa umilikishwaji. Hivyo hatari za shambulizi la asilimia 51% ndani ya dakika hizo chache kabla ya data yote kuhesabiwa upya.

Kanuni inayotumika kuzalisha seti ya DAGs zinazotumika kukokotoa kazi kwa ajili ya bloku ni kama ifuatavyo:

```python
def get_prevhash(n):
    from pyethereum.blocks import GENESIS_PREVHASH
    from pyethereum import chain_manager
    if n <= 0:
        return hash_to_int(GENESIS_PREVHASH)
    else:
        prevhash = chain_manager.index.get_block_by_number(n - 1)
        return decode_int(prevhash)

def get_seedset(params, block):
    seedset = {}
    seedset["back_number"] = block.number - (block.number % params["epochtime"])
    seedset["back_hash"] = get_prevhash(seedset["back_number"])
    seedset["front_number"] = max(seedset["back_number"] - params["epochtime"], 0)
    seedset["front_hash"] = get_prevhash(seedset["front_number"])
    return seedset

def get_dagsize(params, block):
    return params["n"] + (block.number // params["epochtime"]) * params["n_inc"]

def get_daggerset(params, block):
    dagsz = get_dagsize(params, block)
    seedset = get_seedset(params, block)
    if seedset["front_hash"] <= 0:
        # No back buffer is possible, just make front buffer
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": 0}}
    else:
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": seedset["front_number"]},
                "back": {"dag": produce_dag(params, seedset["back_hash"], dagsz),
                         "block_number": seedset["back_number"]}}
```

## Hashimoto {#hashimoto}

Wazo la awali la Hashimoto ni kutumia mnyororo wa bloku kama seti ya data, kufanya hesabu inayochagua fahirisi za N kutoka kwenye mnyororo wa bloku, kukusanya miamala kwenye fahirisi hizo, kufanya XOR ya data hii, na kurudisha hashi ya matokeo. Kanuni ya awali ya Thaddeus Dryja, iliyotafsiriwa kwa Python kwa ajili ya uwiano, ni kama ifuatavyo:

```python
def orig_hashimoto(prev_hash, merkle_root, list_of_transactions, nonce):
    hash_output_A = sha256(prev_hash + merkle_root + nonce)
    txid_mix = 0
    for i in range(64):
        shifted_A = hash_output_A >> i
        transaction = shifted_A % len(list_of_transactions)
        txid_mix ^= list_of_transactions[transaction] << i
    return txid_mix ^ (nonce << 192)
```

Kwa bahati mbaya, ingawa Hashimoto inachukuliwa kuwa ngumu kwa RAM, inategemea hesabu za biti 256, ambazo zina gharama kubwa za kikokotozi. Hata hivyo, Dagger-Hashimoto hutumia tu biti 64 za chini kabisa wakati wa kufaharisi seti yake ya data ili kushughulikia suala hili.

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

Matumizi ya SHA3 maradufu huruhusu aina ya uthibitishaji wa awali wa data-sifuri, karibu wa papo hapo, kuthibitisha tu kwamba thamani sahihi ya kati ilitolewa. Safu hii ya nje ya uthibitishaji-wa-kazi inafaa sana kwa ASIC na ni dhaifu kiasi, lakini ipo ili kufanya DDoS iwe ngumu zaidi kwa kuwa kiasi hicho kidogo cha kazi lazima kifanyike ili kuzalisha bloku ambayo haitakataliwa mara moja. Hii ndiyo toleo la mteja-mwepesi:

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## Uchimbaji na uthibitishaji {#mining-and-verifying}

Sasa, hebu tuviweke vyote pamoja katika kanuni ya uchimbaji:

```python
def mine(daggerset, params, block):
    from random import randint
    nonce = randint(0, 2**64)
    while 1:
        result = hashimoto(daggerset, get_dagsize(params, block),
                           params, decode_int(block.prevhash), nonce)
        if result * params["diff"] < 2**256:
            break
        nonce += 1
        if nonce >= 2**64:
            nonce = 0
    return nonce
```

Hii ndiyo kanuni ya uthibitishaji:

```python
def verify(daggerset, params, block, nonce):
    result = hashimoto(daggerset, get_dagsize(params, block),
                       params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Uthibitishaji unaofaa kwa mteja-mwepesi:

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Pia, kumbuka kuwa Dagger-Hashimoto inaweka mahitaji ya ziada kwenye kichwa cha bloku:

- Ili uthibitishaji wa safu-mbili ufanye kazi, kichwa cha bloku lazima kiwe na nonce na thamani ya kati kabla ya sha3
- Mahali fulani, kichwa cha bloku lazima kihifadhi sha3 ya seti ya mbegu ya sasa

## Masomo zaidi {#further-reading}

_Unajua rasilimali ya jamii iliyokusaidia?_ Hariri ukurasa huu na uiongeze!_

## Kiambatisho {#appendix}

Kama ilivyoelezwa hapo juu, RNG inayotumika kwa uzalishaji wa DAG inategemea matokeo fulani kutoka kwa nadharia ya nambari. Kwanza, tunatoa uhakikisho kwamba Lehmer RNG ambayo ni msingi wa kigezo cha `picker` ina kipindi kirefu. Pili, tunaonyesha kwamba `pow(x,3,P)` haitapanga `x` kwa `1` au `P-1` mradi `x ∈ [2,P-2]` mwanzoni. Mwishowe, tunaonyesha kwamba `pow(x,3,P)` ina kiwango cha chini cha mgongano inapotumika kama chaguo la kukokotoa la uhasishaji.

### Jenereta ya nambari nasibu ya Lehmer {#lehmer-random-number}

Ingawa chaguo la kukokotoa la `produce_dag` halihitaji kutoa nambari nasibu zisizo na upendeleo, tishio linalowezekana ni kwamba `seed**i % P` huchukua thamani chache tu. Hii inaweza kuwapa faida wachimbaji wanaotambua mchoro kuliko wale wasiotambua.

Ili kuepuka hili, matokeo kutoka kwa nadharia ya nambari yanatumika. [_Nambari Kuu Salama_](https://en.wikipedia.org/wiki/Safe_prime) inafafanuliwa kuwa nambari kuu `P` kiasi kwamba `(P-1)/2` pia ni nambari kuu. _Mpangilio_ wa mwanachama `x` wa [kikundi cha kuzidisha](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `ℤ/nℤ` unafafanuliwa kuwa `m` ndogo zaidi kiasi kwamba <pre>xᵐ mod P ≡ 1</pre>
Kutokana na ufafanuzi huu, tuna:

> Uchunguzi 1. Acha `x` iwe mwanachama wa kikundi cha kuzidisha `ℤ/Pℤ` kwa nambari kuu salama `P`. Ikiwa `x mod P ≠ 1 mod P` na `x mod P ≠ P-1 mod P`, basi mpangilio wa `x` ni `P-1` au `(P-1)/2`.

_Uthibitisho_. Kwa kuwa `P` ni nambari kuu salama, basi kwa [Nadharia ya Lagrange][lagrange] tuna kwamba mpangilio wa `x` ni `1`, `2`, `(P-1)/2`, au `P-1`.

Mpangilio wa `x` hauwezi kuwa `1`, kwa kuwa kwa Nadharia Ndogo ya Fermat tuna:

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

Kwa hiyo `x` lazima iwe utambulisho wa kuzidisha wa `ℤ/nℤ`, ambayo ni ya kipekee. Kwa kuwa tulidhani kwamba `x ≠ 1` kwa dhana, hili haliwezekani.

Mpangilio wa `x` hauwezi kuwa `2` isipokuwa `x = P-1`, kwa kuwa hili lingekiuka kwamba `P` ni nambari kuu.

Kutoka kwa pendekezo lililo hapo juu, tunaweza kutambua kwamba kurudia `(picker * init) % P` kutakuwa na urefu wa mzunguko wa angalau `(P-1)/2`. Hii ni kwa sababu tulichagua `P` kuwa nambari kuu salama takriban sawa na kuwa nguvu ya juu ya mbili, na `init` iko katika muda wa `[2,2**256+1]`. Kutokana na ukubwa wa `P`, hatupaswi kamwe kutarajia mzunguko kutoka kwa upeo wa kimodula.

Tunapogawa seli ya kwanza katika DAG (kigezo kilichoandikwa `init`), tunakokotoa `pow(sha3(seed) + 2, 3, P)`. Kwa mtazamo wa kwanza, hili halihakikishi kwamba matokeo si `1` wala `P-1`. Hata hivyo, kwa kuwa `P-1` ni nambari kuu salama, tuna uhakikisho wa ziada ufuatao, ambao ni matokeo ya Uchunguzi 1:

> Uchunguzi 2. Acha `x` iwe mwanachama wa kikundi cha kuzidisha `ℤ/Pℤ` kwa nambari kuu salama `P`, na acha `w` iwe nambari asilia. Ikiwa `x mod P ≠ 1 mod P` na `x mod P ≠ P-1 mod P`, na vile vile `w mod P ≠ P-1 mod P` na `w mod P ≠ 0 mod P`, basi `xʷ mod P ≠ 1 mod P` na `xʷ mod P ≠ P-1 mod P`

### Upeo wa kimodula kama chaguo la kukokotoa la hashi {#modular-exponentiation}

Kwa thamani fulani za `P` na `w`, chaguo la kukokotoa la `pow(x, w, P)` linaweza kuwa na migongano mingi. Kwa mfano, `pow(x,9,19)` huchukua tu thamani za `{1,18}`.

Kwa kuwa `P` ni nambari kuu, basi `w` inayofaa kwa chaguo la kukokotoa la uhasishaji wa upeo wa kimodula inaweza kuchaguliwa kwa kutumia matokeo yafuatayo:

> Uchunguzi 3. Acha `P` iwe nambari kuu; `w` na `P-1` ni nambari kuu za jamaa ikiwa na tu ikiwa kwa `a` na `b` zote katika `ℤ/Pℤ`:<center>`aʷ mod P ≡ bʷ mod P` ikiwa na tu ikiwa `a mod P ≡ b mod P`</center>

Hivyo, kwa kuwa `P` ni nambari kuu na `w` ni nambari kuu ya jamaa na `P-1`, tuna `|{pow(x, w, P) : x ∈ ℤ}| = P`, ikimaanisha kwamba chaguo la kukokotoa la uhasishaji lina kiwango cha chini zaidi cha mgongano kinachowezekana.

Katika kesi maalum ambapo `P` ni nambari kuu salama kama tulivyochagua, basi `P-1` ina vigawanyo 1, 2, `(P-1)/2` na `P-1` pekee. Kwa kuwa `P` > 7, tunajua kwamba 3 ni nambari kuu ya jamaa na `P-1`, kwa hivyo `w=3` inakidhi pendekezo lililo hapo juu.

## Kanuni ya tathmini yenye ufanisi zaidi inayotegemea kache {#cache-based-evaluation}

```python
def quick_calc(params, seed, p):
    cache = produce_dag(params, seed, params["cache_size"])
    return quick_calc_cached(cache, params, p)

def quick_calc_cached(cache, params, p):
    P = params["P"]
    if p < len(cache):
        return cache[p]
    else:
        x = pow(cache[0], p + 1, P)
        for _ in range(params["k"]):
            x ^= quick_calc_cached(cache, params, x % p)
        return pow(x, params["w"], P)

def quick_hashimoto(seed, dagsize, params, header, nonce):
    cache = produce_dag(params, seed, params["cache_size"])
    return quick_hashimoto_cached(cache, dagsize, params, header, nonce)

def quick_hashimoto_cached(cache, dagsize, params, header, nonce):
    m = dagsize // 2
    mask = 2**64 - 1
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc_cached(cache, params, m + (mix & mask) % m)
    return dbl_sha3(mix)
```
