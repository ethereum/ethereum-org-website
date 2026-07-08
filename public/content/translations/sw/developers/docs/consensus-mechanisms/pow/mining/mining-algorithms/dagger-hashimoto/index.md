---
title: Dagger-Hashimoto
description: Mtazamo wa kina wa algoriti ya Dagger-Hashimoto.
lang: sw
---

Dagger-Hashimoto ilikuwa utekelezaji na vipimo vya utafiti wa asili kwa algoriti ya uchimbaji ya Ethereum. Dagger-Hashimoto ilibadilishwa na [Ethash](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/#ethash). Uchimbaji ulizimwa kabisa kwenye [Unganisho](/roadmap/merge/) mnamo tarehe 15 Septemba 2022. Tangu wakati huo, Ethereum imelindwa kwa kutumia utaratibu wa [Uthibitisho wa Dau (PoS)](/developers/docs/consensus-mechanisms/pos) badala yake. Ukurasa huu ni kwa ajili ya maslahi ya kihistoria - maelezo hapa hayana umuhimu tena kwa Ethereum ya baada ya Unganisho.

## Mahitaji ya awali {#prerequisites}

Ili kuelewa vyema ukurasa huu, tunapendekeza kwanza usome kuhusu [mwafaka wa Uthibitisho wa Kazi (PoW)](/developers/docs/consensus-mechanisms/pow), [uchimbaji](/developers/docs/consensus-mechanisms/pow/mining), na [algoriti za uchimbaji](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms).

## Dagger-Hashimoto {#dagger-hashimoto}

Dagger-Hashimoto inalenga kutimiza malengo mawili:

1.  **Ukinzani wa ASIC**: faida inayotokana na kuunda maunzi maalum kwa ajili ya algoriti inapaswa kuwa ndogo iwezekanavyo
2.  **Uthibitishaji wa kiteja chepesi**: kitalu kinapaswa kuthibitishwa kwa ufanisi na kiteja chepesi.

Kwa marekebisho ya ziada, pia tunabainisha jinsi ya kutimiza lengo la tatu ikihitajika, lakini kwa gharama ya utata wa ziada:

**Hifadhi kamili ya mnyororo**: uchimbaji unapaswa kuhitaji uhifadhi wa hali kamili ya mnyororo wa vitalu (kutokana na muundo usio wa kawaida wa trie ya hali ya Ethereum, tunatarajia kwamba upunguzaji fulani utawezekana, hasa wa baadhi ya mikataba inayotumiwa mara kwa mara, lakini tunataka kupunguza hili).

## Uzalishaji wa DAG {#dag-generation}

Msimbo wa algoriti utafafanuliwa katika Python hapa chini. Kwanza, tunatoa `encode_int` kwa ajili ya kupanga nambari kamili zisizo na saini za usahihi uliobainishwa kuwa mifuatano. Kinyume chake pia kinatolewa:

```python
NUM_BITS = 512

def encode_int(x):
    "Encode an integer x as a string of 64 characters using a big-endian scheme"
    o = ''
    for _ in range(NUM_BITS / 8):
        o = chr(x % 256) + o
        x //= 256
    return o

def decode_int(s):
    "Unencode an integer x from a string using a big-endian scheme"
    x = 0
    for c in s:
        x *= 256
        x += ord(c)
    return x
```

Kisha tunachukulia kwamba `sha3` ni kazi inayochukua nambari kamili na kutoa nambari kamili, na `dbl_sha3` ni kazi ya double-sha3; ikiwa unabadilisha msimbo huu wa marejeleo kuwa utekelezaji tumia:

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

Vigezo vinavyotumika kwa algoriti ni:

```python
SAFE_PRIME_512 = 2**512 - 38117     # Namba Tasa Salama Kubwa Zaidi ndogo kuliko 2**512

params = {
      "n": 4000055296 * 8 // NUM_BITS,  # Ukubwa wa seti ya data (Gigabaiti 4); LAZIMA IWE KIZIDISHO CHA 65536
      "n_inc": 65536,                   # Ongezeko la thamani ya n kwa kila kipindi; LAZIMA IWE KIZIDISHO CHA 65536
                                        # kwa epochtime=20000 inatoa ukuaji wa MB 882 kwa mwaka
      "cache_size": 2500,               # Ukubwa wa kache ya kiteja chepesi (inaweza kuchaguliwa na kiteja
                                        # chepesi; sio sehemu ya vipimo vya aligoriti)
      "diff": 2**14,                    # Ugumu (hurekebishwa wakati wa tathmini ya kitalu)
      "epochtime": 100000,              # Urefu wa epoki katika vitalu (ni mara ngapi seti ya data inasasishwa)
      "k": 1,                           # Idadi ya wazazi wa nodi
      "w": w,                          # Hutumika kwa uheshiji wa kipeo cha moduli
      "accesses": 200,                  # Idadi ya ufikiaji wa seti ya data wakati wa hashimoto
      "P": SAFE_PRIME_512               # Namba Tasa Salama kwa uheshiji na uzalishaji wa namba nasibu
}
```

`P` katika kesi hii ni nambari tasa iliyochaguliwa ili `log₂(P)` iwe chini kidogo ya 512, ambayo inalingana na biti 512 ambazo tumekuwa tukitumia kuwakilisha nambari zetu. Kumbuka kwamba ni nusu ya mwisho tu ya DAG ndiyo inayohitaji kuhifadhiwa, kwa hivyo hitaji halisi la RAM linaanza kwa GB 1 na kukua kwa MB 441 kwa mwaka.

### Ujenzi wa grafu ya Dagger {#dagger-graph-building}

Msingi wa ujenzi wa grafu ya dagger unafafanuliwa kama ifuatavyo:

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

Kimsingi, inaanza grafu kama nodi moja, `sha3(seed)`, na kutoka hapo inaanza kuongeza nodi zingine kwa mfuatano kulingana na nodi za awali za nasibu. Wakati nodi mpya inapoundwa, nguvu ya msimu ya mbegu inakokotolewa ili kuchagua kwa nasibu baadhi ya faharisi zilizo chini ya `i` (kwa kutumia `x % i` hapo juu), na thamani za nodi kwenye faharisi hizo zinatumika katika ukokotoaji ili kuzalisha thamani mpya ya `x`, ambayo kisha inaingizwa kwenye kazi ndogo ya uthibitisho wa kazi (kulingana na XOR) ili hatimaye kuzalisha thamani ya grafu kwenye faharisi `i`. Mantiki nyuma ya muundo huu mahususi ni kulazimisha ufikiaji wa mfuatano wa DAG; thamani inayofuata ya DAG itakayofikiwa haiwezi kubainishwa hadi thamani ya sasa ijulikane. Hatimaye, upeo wa msimu unaheshi matokeo zaidi.

Algoriti hii inategemea matokeo kadhaa kutoka kwa nadharia ya nambari. Tazama kiambatisho hapa chini kwa mjadala.

## Tathmini ya kiteja chepesi {#light-client-evaluation}

Ujenzi wa grafu hapo juu unakusudia kuruhusu kila nodi katika grafu kujengwa upya kwa kukokotoa mti mdogo wa idadi ndogo tu ya nodi na kuhitaji kiasi kidogo tu cha kumbukumbu ya ziada. Kumbuka kwamba kwa k=1, mti mdogo ni mnyororo tu wa thamani zinazopanda hadi kipengele cha kwanza katika DAG.

Kazi ya ukokotoaji ya kiteja chepesi kwa DAG inafanya kazi kama ifuatavyo:

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

Kimsingi, ni uandishi upya tu wa algoriti iliyo hapo juu ambayo inaondoa kitanzi cha kukokotoa thamani za DAG nzima na kubadilisha utafutaji wa nodi wa awali na wito wa kujirudia au utafutaji wa kache. Kumbuka kwamba kwa `k=1` kache sio lazima, ingawa uboreshaji zaidi kwa kweli hukokotoa mapema thamani elfu chache za kwanza za DAG na kuiweka kama kache tuli kwa ukokotoaji; tazama kiambatisho kwa utekelezaji wa msimbo wa hili.

## Bafa mbili za DAG {#double-buffer}

Katika kiteja kamili, [_bafa mbili_](https://wikipedia.org/wiki/Multiple_buffering) za DAG 2 zinazozalishwa na fomula iliyo hapo juu zinatumika. Wazo ni kwamba DAG zinazalishwa kila idadi ya `epochtime` ya vitalu kulingana na vigezo hapo juu. Badala ya kiteja kutumia DAG ya hivi punde iliyozalishwa, kinatumia ile ya awali. Faida ya hili ni kwamba inaruhusu DAG kubadilishwa kwa muda bila kuhitaji kujumuisha hatua ambapo wachimbaji lazima wakokotoe upya data yote ghafla. Vinginevyo, kuna uwezekano wa kupungua kwa kasi kwa muda kwa ghafla katika usindikaji wa mnyororo kwa vipindi vya kawaida na kuongeza kwa kiasi kikubwa uwekaji kati. Hivyo hatari za shambulio la asilimia 51 ndani ya dakika hizo chache kabla ya data yote kukokotolewa upya.

Algoriti inayotumika kuzalisha seti ya DAG zinazotumika kukokotoa kazi kwa kitalu ni kama ifuatavyo:

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
        # Hakuna bafa ya nyuma inayowezekana, tengeneza tu bafa ya mbele
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": 0}}
    else:
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": seedset["front_number"]},
                "back": {"dag": produce_dag(params, seedset["back_hash"], dagsz),
                         "block_number": seedset["back_number"]}}
```

## Hashimoto {#hashimoto}

Wazo nyuma ya Hashimoto ya asili ni kutumia mnyororo wa vitalu kama seti ya data, kufanya ukokotoaji unaochagua faharisi N kutoka kwenye mnyororo wa vitalu, kukusanya miamala kwenye faharisi hizo, kufanya XOR ya data hii, na kurudisha heshi ya matokeo. Algoriti ya asili ya Thaddeus Dryja, iliyotafsiriwa kwa Python kwa uthabiti, ni kama ifuatavyo:

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

Kwa bahati mbaya, ingawa Hashimoto inachukuliwa kuwa ngumu kwa RAM, inategemea hesabu ya biti 256, ambayo ina mzigo mkubwa wa ukokotoaji. Hata hivyo, Dagger-Hashimoto inatumia tu biti 64 zenye umuhimu mdogo zaidi wakati wa kuweka faharisi seti yake ya data ili kushughulikia suala hili.

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

Matumizi ya SHA3 mbili yanaruhusu aina ya uthibitishaji wa awali wa data sifuri, unaokaribia papo hapo, kuthibitisha tu kwamba thamani sahihi ya kati ilitolewa. Safu hii ya nje ya uthibitisho wa kazi ni rafiki sana kwa ASIC na ni dhaifu kiasi, lakini ipo ili kufanya DDoS kuwa ngumu zaidi kwa kuwa kiasi hicho kidogo cha kazi lazima kifanyike ili kuzalisha kitalu ambacho hakitakataliwa mara moja. Hapa kuna toleo la kiteja chepesi:

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## Uchimbaji na uthibitishaji {#mining-and-verifying}

Sasa, hebu tuweke yote pamoja katika algoriti ya uchimbaji:

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

Hapa kuna algoriti ya uthibitishaji:

```python
def verify(daggerset, params, block, nonce):
    result = hashimoto(daggerset, get_dagsize(params, block),
                       params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Uthibitishaji rafiki kwa kiteja chepesi:

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Pia, kumbuka kwamba Dagger-Hashimoto inaweka mahitaji ya ziada kwenye kichwa cha kizuizi:

- Ili uthibitishaji wa tabaka mbili ufanye kazi, kichwa cha kizuizi lazima kiwe na nonsi na thamani ya kati kabla ya sha3
- Mahali fulani, kichwa cha kizuizi lazima kihifadhi sha3 ya seti ya mbegu ya sasa

## Usomaji zaidi {#further-reading}

_Unajua rasilimali ya jamii iliyokusaidia? Hariri ukurasa huu na uiongeze!_

## Kiambatisho {#appendix}

Kama ilivyoelezwa hapo juu, RNG inayotumika kwa uzalishaji wa DAG inategemea baadhi ya matokeo kutoka kwa nadharia ya nambari. Kwanza, tunatoa hakikisho kwamba Lehmer RNG ambayo ni msingi wa kigezo cha `picker` ina kipindi kipana. Pili, tunaonyesha kwamba `pow(x,3,P)` haitapanga `x` kwa `1` au `P-1` mradi `x ∈ [2,P-2]` kuanza. Hatimaye, tunaonyesha kwamba `pow(x,3,P)` ina kiwango cha chini cha mgongano inapotibiwa kama kazi ya heshi.

### Jenereta ya nambari nasibu ya Lehmer {#lehmer-random-number}

Ingawa kazi ya `produce_dag` haihitaji kuzalisha nambari nasibu zisizo na upendeleo, tishio linalowezekana ni kwamba `seed**i % P` inachukua tu thamani chache. Hili linaweza kutoa faida kwa wachimbaji wanaotambua muundo huo dhidi ya wale wasiotambua.

Ili kuepuka hili, matokeo kutoka kwa nadharia ya nambari yanatumika. [_Nambari Tasa Salama_](https://en.wikipedia.org/wiki/Safe_prime) inafafanuliwa kuwa nambari tasa `P` ili `(P-1)/2` pia iwe nambari tasa. _Mpangilio_ wa mwanachama `x` wa [kikundi cha kuzidisha](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `ℤ/nℤ` unafafanuliwa kuwa `m` ya chini zaidi ili <pre>xᵐ mod P ≡ 1</pre>
Kwa kuzingatia ufafanuzi huu, tuna:

> Uchunguzi 1. Acha `x` iwe mwanachama wa kikundi cha kuzidisha `ℤ/Pℤ` kwa nambari tasa salama `P`. Ikiwa `x mod P ≠ 1 mod P` na `x mod P ≠ P-1 mod P`, basi mpangilio wa `x` ni ama `P-1` au `(P-1)/2`.

_Uthibitisho_. Kwa kuwa `P` ni nambari tasa salama, basi kwa [Nadharia ya Lagrange][lagrange] tuna kwamba mpangilio wa `x` ni ama `1`, `2`, `(P-1)/2`, au `P-1`.

Mpangilio wa `x` hauwezi kuwa `1`, kwa kuwa kwa Nadharia Ndogo ya Fermat tuna:

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

Kwa hivyo `x` lazima iwe utambulisho wa kuzidisha wa `ℤ/nℤ`, ambao ni wa kipekee. Kwa kuwa tulichukulia kwamba `x ≠ 1` kwa dhana, hili haliwezekani.

Mpangilio wa `x` hauwezi kuwa `2` isipokuwa `x = P-1`, kwa kuwa hii ingekiuka kwamba `P` ni nambari tasa.

Kutoka kwa pendekezo hapo juu, tunaweza kutambua kwamba kurudia `(picker * init) % P` kutakuwa na urefu wa mzunguko wa angalau `(P-1)/2`. Hii ni kwa sababu tulichagua `P` kuwa nambari tasa salama inayokaribia kuwa sawa na nguvu ya juu ya mbili, na `init` iko katika muda wa `[2,2**256+1]`. Kwa kuzingatia ukubwa wa `P`, hatupaswi kamwe kutarajia mzunguko kutoka kwa upeo wa msimu.

Tunapokabidhi seli ya kwanza katika DAG (kigezo kilichoitwa `init`), tunakokotoa `pow(sha3(seed) + 2, 3, P)`. Kwa mtazamo wa kwanza, hii haihakikishi kwamba matokeo sio `1` wala `P-1`. Hata hivyo, kwa kuwa `P-1` ni nambari tasa salama, tuna hakikisho la ziada lifuatalo, ambalo ni tokeo la Uchunguzi 1:

> Uchunguzi 2. Acha `x` iwe mwanachama wa kikundi cha kuzidisha `ℤ/Pℤ` kwa nambari tasa salama `P`, na acha `w` iwe nambari asilia. Ikiwa `x mod P ≠ 1 mod P` na `x mod P ≠ P-1 mod P`, pamoja na `w mod P ≠ P-1 mod P` na `w mod P ≠ 0 mod P`, basi `xʷ mod P ≠ 1 mod P` na `xʷ mod P ≠ P-1 mod P`

### Upeo wa msimu kama kazi ya heshi {#modular-exponentiation}

Kwa thamani fulani za `P` na `w`, kazi ya `pow(x, w, P)` inaweza kuwa na migongano mingi. Kwa mfano, `pow(x,9,19)` inachukua tu thamani za `{1,18}`.

Kwa kuwa `P` ni nambari tasa, basi `w` inayofaa kwa kazi ya uheshiji ya upeo wa msimu inaweza kuchaguliwa kwa kutumia matokeo yafuatayo:

> Uchunguzi 3. Acha `P` iwe nambari tasa; `w` na `P-1` ni nambari tasa kiasi ikiwa na tu ikiwa kwa `a` na `b` zote katika `ℤ/Pℤ`:<center>`aʷ mod P ≡ bʷ mod P` ikiwa na tu ikiwa `a mod P ≡ b mod P`</center>

Hivyo, kwa kuwa `P` ni nambari tasa na `w` ni nambari tasa kiasi kwa `P-1`, tuna kwamba `|{pow(x, w, P) : x ∈ ℤ}| = P`, ikimaanisha kwamba kazi ya uheshiji ina kiwango cha chini zaidi cha mgongano kinachowezekana.

Katika kesi maalum kwamba `P` ni nambari tasa salama kama tulivyochagua, basi `P-1` ina vigawo 1, 2, `(P-1)/2` na `P-1` pekee. Kwa kuwa `P` > 7, tunajua kwamba 3 ni nambari tasa kiasi kwa `P-1`, kwa hivyo `w=3` inakidhi pendekezo hapo juu.

## Algoriti ya tathmini inayotegemea kache yenye ufanisi zaidi {#cache-based-evaluation}

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