---
title: Dagger-Hashimoto
description: Súil mhionsonraithe ar algartam Dagger-Hashimoto.
lang: ga
---

Ba é Dagger-Hashimoto an cur i bhfeidhm taighde agus an tsonraíocht bhunaidh le haghaidh algartam mianadóireachta Ethereum. Ghlac [Ethash](#ethash) ionad Dagger-Hashimoto. Múchadh an mhianadóireacht go hiomlán ag [An Cumasc](/roadmap/merge/) ar 15ú Meán Fómhair 2022. Ó shin i leith, tá Ethereum daingnithe le meicníocht [cruthúnas-gill](/developers/docs/consensus-mechanisms/pos) ina ionad sin. Baineann an leathanach seo leis an stair - níl an fhaisnéis anseo ábhartha a thuilleadh le haghaidh Ethereum iar-Chumaisc.

## Réamhriachtanais {#prerequisites}

Chun an leathanach seo a thuiscint níos fearr, molaimid duit léamh ar dtús ar [cruthúnas-oibre comhdhearcaidh](/developers/docs/consensus-mechanisms/pow), <[mianadóireacht](/developers/docs/consensus-mechanisms/pow/mining), agus [algartaim mhianadóireachta](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms).

## Dagger-Hashimoto {#dagger-hashimoto}

Tá sé mar aidhm ag Dagger-Hashimoto dhá sprioc a shásamh:

1.  **friotaíocht-ASIC**: ba cheart go mbeadh an tairbhe as crua-earraí speisialaithe a chruthú don algartam chomh beag agus is féidir
2.  **Infhíoraitheacht chliant éadrom**: ba cheart go mbeadh bloc infhíoraithe go héifeachtach ag cliant éadrom.

Le modhnú breise, sonraímid freisin conas an tríú sprioc a chomhlíonadh más mian linn, ach ar chostas castachta breise:

**Stóráil slabhra iomláin**: ba cheart go n-éileodh mianadóireacht staid iomlán na mbloc slabhra a stóráil (mar gheall ar struchtúr neamhrialta de chuid trie stáit Ethereum, measaimid go mbeifear in ann roinnt prúnála a dhéanamh, go háirithe roinnt conarthaí a úsáidtear go minic, ach ba mhaith linn é sin a íoslaghdú).

## Giniúint DAG {#dag-generation}

Déanfar an cód don algartam a shainiú in Python thíos. Ar dtús, tugaimid `encode_int` chun ionracha neamhshínithe de chruinneas sonraithe a chomhordú chuig teaghráin. Tugtar a inbhéartach freisin:

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

Glacaimid leis gur feidhm é `sha3` a ghlacann slánuimhir agus a aschuireann slánuimhir, agus gur feidhm dbl-sha3 é `dbl_sha3`; má dhéantar an cód tagartha seo a thiontú ina úsáid feidhmithe:

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

### Paraiméadair {#parameters}

Is iad seo a leanas na paraiméadair a úsáidtear don algartam:

```python
SAFE_PRIME_512 = 2**512 - 38117     # Largest Safe Prime less than 2**512

params = {
      "n": 4000055296 * 8 // NUM_BITS,  # Size of the dataset (4 Gigabytes); MUST BE MULTIPLE OF 65536
      "n_inc": 65536,                   # Increment in value of n per period; MUST BE MULTIPLE OF 65536
                                        # with epochtime=20000 gives 882 MB growth per year
      "cache_size": 2500,               # Size of the light client's cache (can be chosen by light
                                        # client; not part of the algo spec)
      "diff": 2**14,                    # Difficulty (adjusted during block evaluation)
      "epochtime": 100000,              # Length of an epoch in blocks (how often the dataset is updated)
      "k": 1,                           # Number of parents of a node
      "w": w,                          # Used for modular exponentiation hashing
      "accesses": 200,                  # Number of dataset accesses during hashimoto
      "P": SAFE_PRIME_512               # Safe Prime for hashing and random number generation
}
```

Roghnaítear `P` sa chás seo sa chás seo go bhfuil uimhir phríomha`log₂(P)` beagán níos lú ná 512, a fhreagraíonn do na 512 giotán a bhí in úsáid againn chun ár n-uimhreacha a léiriú. Tabhair faoi deara nach gá ach an dara leath den DAG a stóráil, mar sin tosaíonn an riachtanas RAM de-facto ag 1 GB agus fásann sé 441 MB in aghaidh na bliana.

### Tógáil graf Dagger {#dagger-graph-building}

Sainmhínítear an foirgneamh bunghraf Dagger mar a leanas:

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

Go bunúsach, tosaíonn sé le graf mar nód singil, `sha3(seed)`, agus as sin tosaíonn sé ag cur nóid eile leis go seicheamhach bunaithe ar nóid randamacha roimhe sin. Nuair a chruthaítear nód nua, ríomhtar cumhacht mhodúlach an tsíl chun roinnt innéacsanna níos lú ná `i` a roghnú go randamach (ag úsáid `x % i` thuas), agus úsáidtear luachanna an tsíl ag na hinnéacsanna sin i ríomh chun luach nua a ghiniúint do `x`, a chuirtear isteach ansin i bhfeidhm bheag cruthúnais oibre (bunaithe ar XOR) chun luach an ghraif a ghiniúint ar deireadh thiar ag innéacs `i`. Is é an réasúnaíocht atá taobh thiar den dearadh áirithe seo ná rochtain sheicheamhach ar an DAG a bhrú; ní féidir an chéad luach eile den DAG a fhaightear rochtain air a chinneadh go dtí go mbeidh an luach reatha ar eolas. Ar deireadh, déanann easpónantúchán modúlach breis haiseála ar an toradh.

Braitheann an t-algartam seo ar roinnt torthaí ó theoiric uimhreach. Pléitear é seo san aguisín thíos.

## Meastóireacht chliant éadrom {#light-client-evaluation}

Tá sé beartaithe ag tógáil an ghraif thuas ligean do gach nód sa ghraf a athchruthú trí fho-chrann de líon beag nód a ríomh agus gan ach méid beag de chuimhne chúnta a cheangal. Tabhair faoi deara le k=1, nach bhfuil san fho-chrann ach slabhra luachanna a théann suas go dtí an chéad eilimint sa DAG.

Feidhmíonn feidhm ríomhaireachta éadrom an chliaint don DAG mar a leanas:

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

Go bunúsach, níl ann ach athscríobh ar an algartam thuas a bhainann an lúb de ríomh na luachanna don DAG ar fad agus a chuireann glao athchúrsach nó cuardach taisce in ionad an chuardach nód níos luaithe. Tabhair faoi deara nach gá taisce do `k=1`, cé go ndéanann optamú réamhríomh ar an gcéad chúpla míle luach den DAG agus coimeádann sé sin mar thaisce statach le haghaidh ríomhanna; féach an aguisín le haghaidh cur i bhfeidhm cód seo.

## Maolán dúbailte DAG {#double-buffer}

I gcliant iomlán, úsáidtear [_maolán dúbailte_](https://wikipedia.org/wiki/Multiple_buffering) de 2 DAG arna dtáirgeadh ag an bhfoirmle thuas. Is é an smaoineamh go dtáirgtear DAG gach `amré` líon bloc de réir na bparaiméadar thuas. In ionad an chliaint a úsáideann an DAG is déanaí a tháirgtear, úsáideann sé an ceann roimhe seo. Is é an buntáiste a bhaineann leis seo ná go gceadaíonn sé athsholáthar DAG le himeacht ama gan gá le céim a thabhairt isteach ina gcaithfidh mianadóirí na sonraí go léir a athríomh go tobann. Seachas sin, d’fhéadfadh moilliú tobann sealadach i bpróiseáil slabhra a bheith ann go tráthrialta a dhéanfadh méadú as cuimse ar lárú. Mar sin bíonn rioscaí ionsaí 51% ann a athríomh laistigh de chúpla nóiméad sula ndéantar athríomh ar na sonraí go léir.

Seo a leanas an t-algartam a úsáidtear chun an tacar DAG a úsáidtear chun an obair a ríomh do bhloc:

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

Is é an smaoineamh atá taobh thiar den Hashimoto bunaidh ná an blocshlabhra a úsáid mar thacar sonraí, ag déanamh ríomha a roghnaíonn innéacsanna N ón mblocshlabhra, a bhailíonn na hidirbhearta ag na hinnéacsanna sin, a fheidhmíonn XOR de na sonraí seo, agus a sheolann hais an toraidh ar ais. Seo a leanas bunalgartam Thaddeus Dryja, a aistríodh go Python ar mhaithe le comhsheasmhacht:

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

Ar an drochuair, cé go meastar Hashimoto a bheith RAM-crua, braitheann sé ar uimhríocht 256-giotán, a bhfuil forchostais ríomhaireachtúla suntasacha aige. Mar sin féin, ní úsáideann Dagger-Hashimoto ach na 64 giotán is lú suntais nuair a bhíonn a thacar sonraí á innéacsú chun aghaidh a thabhairt ar an tsaincheist seo.

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

Trí úsáid a bhaint as SHA3 dúbailte ceadaítear cineál réamhfhíorú dífhianaise beagnach láithreach, a fhíoraíonn gur soláthraíodh luach idirmheánach ceart. Tá an ciseal seachtrach cruthúnas-oibre seo an-chairdiúil do ASIC agus measartha lag, ach tá sé ann chun DDoS a dhéanamh níos deacra fós ós rud é go gcaithfear méid beag oibre a dhéanamh chun bloc a tháirgeadh nach ndiúltófar láithreach. Seo é an leagan cliaint éadrom:

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## Mianadóireacht agus fíorú {#mining-and-verifying}

Anois, cuirimis é go léir le chéile san algartam mianadóireachta:

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

Seo é an t-algartam fíoraithe:

```python
def verify(daggerset, params, block, nonce):
    result = hashimoto(daggerset, get_dagsize(params, block),
                       params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Fíorú cairdiúil don chliant éadrom:

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Chomh maith leis sin, tabhair faoi deara go gcuireann Dagger-Hashimoto ceanglais bhreise ar an gceannteideal bloc:

- Chun go n-oibreoidh fíorú dhá chiseal, ní mór go mbeadh an nonce agus an luach lár réamh-sha3 ag ceannteideal bloc
- Ní mór don bhloc-cheanntásc sha3 an tacar síolta reatha a stóráil in áit éigin

## Tuilleadh léitheoireachta {#further-reading}

_Ar eolas agat ar acmhainn pobail a chabhraigh leat? Cuir an leathanach seo in eagar agus cuir leis!_

## Aguisín {#appendix}

Mar a luadh thuas, braitheann an RNG a úsáidtear le haghaidh ghiniúint DAG ar thorthaí áirithe ó theoiric uimhreacha. Sa chéad áit, dearbhaímid go bhfuil tréimhse leathan ag an Lehmer RNG atá mar bhunús leis an athróg ` roghnóir`. Sa dara háit, léirímid nach ndéanfaidh `pow(x,3,P)` `x`mapáil go `1` nó `P-1` chuir ` x ∈ [2,P-2]` ar fáil chun tosú. Ar deireadh, léirímid go bhfuil ráta imbhuailte íseal ag `pow(x,3,P)` nuair a chaitear leis mar fheidhm haiseála.

### Gineadóir uimhreacha randamacha Lehmer {#lehmer-random-number}

Cé nach gá don fheidhm `product_dag` uimhreacha randamacha neamhchlaonta a tháirgeadh, ní thógfadh bagairt ionchasach `síol** i % P` ach dornán luachanna. D'fhéadfadh sé seo buntáiste a thabhairt do mhianadóirí agus an patrún á aithint acu ó na cinn nach ndéanann.

Chun é seo a sheachaint, iarrtar toradh ó theoiric uimhreacha. Sainmhínítear [_Safe Prime_](https://en.wikipedia.org/wiki/Safe_prime) mar phríomh ` P` ionas go bhfuil `(P-1)/2` príomha freisin. _Ordú_ de bhall `x` den [grúpa iolraíoch](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) Sainmhínítear `ℤ/nℤ` mar an `m` íosta sa chaoi is go <pre>xᵐ mod P ≡ 1</pre>
I bhfianaise na sainmhínithe seo, tá:

> Barúil 1. Bíodh `x` mar bhall den ghrúpa iolraíoch `ℤ/Pℤ` le haghaidh príomh `P` sábháilte. Má tá `x mod P ≠ 1 mod P` agus `x mod P ≠ P-1 mod P`, ansin is é an t-ord `x` ná ` P-1` nó `(P-1)/2`.

_Cruthúnas_. Ós rud é go bhfuil `P` ina phríomhuimhir shábháilte, ansin faoi \[Teoirim Lagrange\]\[lagrange\] is é an t-ord ar `x` ná `1`, `2`, `(P-1)/2`, nó `P-1`.

Ní féidir `1` a bheith san ord `x`, mar de réir Teoirim Bheag Fermat tá:

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

Mar sin caithfidh `x` a bheith ina aitheantas iolraíoch de `ℤ/nℤ`, atá uathúil. Ós rud é gur ghlacamar leis go bhfuil `x ≠ 1` trí thoimhde, ní féidir é seo a dhéanamh.

Ní féidir `2` a bheith san ord `x` mura `x = P-1`, mar sháródh sé seo gurb é `P` an phríomhuimhir.

Ón tairiscint thuas, is féidir linn a aithint go mbeidh fad timthriall de `(P-1)/2` ar a laghad ag `(picker * init) % P`. Tá sé seo amhlaidh toisc gur roghnaigh muid `P` le bheith ina phríomhuimhir shábháilte cothrom le cumhacht níos airde de dhá cheann, agus tá `init` san eatramh `[2,2** 256+1]`. I bhfianaise mhéid `P`, níor cheart dúinn a bheith ag súil le timthriall ó easpónantúchán modúlach.

Agus an chéad chill á sannadh againn sa DAG (an athróg lipéadaithe `init`), ríomhaimid ` pow(sha3(sed) + 2, 3, P)`. Ar an gcéad amharc, ní ráthaíonn sé seo nach `1` ná `P-1` an toradh. Mar sin féin, ós rud é gur príomhuimhir shábháilte é `P-1`, tá an dearbhú breise seo a leanas againn, arb é atoradh bharúil 1 é:

> Barúil 2. Bíodh `x` i do bhall den ghrúpa iolraíoch `ℤ/Pℤ` le haghaidh príomhuimhreacha sábháilte `P`, agus bíodh `w` ina uimhir nádúrtha. Má tá `x mod P ≠ 1 mod P` agus `x mod P ≠ P-1 mod P`, chomh maith le `w mod P ≠ P-1 mod P` cód> agus `w mod P ≠ 0 mod P`, ansin `xʷ mod P ≠ 1 mod P` agus `xʷ mod P ≠ P-1 mod P`

### Léiriú modúlach mar fheidhm hais {#modular-exponentiation}

I gcás luachanna áirithe `P` agus `w`, d’fhéadfadh go leor imbhuailtí a bheith ag an bhfeidhm `pow(x, w, P)`. Mar shampla, ní ghlacann `pow(x,9,19)` ach le luachanna `{1,18}`.

Ós rud é go bhfuil `P` príomhúil, is féidir `w` oiriúnach d'fheidhm haiseála easpónantúcháin modúlach a roghnú leis an toradh seo a leanas:

> Barúil 3. Bíodh `P` ina phríomhuimhir; Tá `w` agus `P-1` réasúnta príomha nuair amháin atá sé do gach `a` agus `b` i `ℤ /Pℤ`:
> 
> <center>
>   `aʷ mod P ≡ bʷ mod P` más rud é agus amháin má tá `a mod P ≡ b mod P`
> </center>

Mar sin, ós rud é go bhfuil `P` príomhúil agus go bhfuil `w` sách príomhúil do `P-1`, tá an ` sin againn |{pow(x, w, P): x ∈ ℤ}| = P`, rud a thugann le tuiscint go bhfuil an ráta imbhuailte íosta is féidir ag an bhfeidhm haiseála.

Sa chás speisialta go bhfuil `P` ina phríomhuimhir shábháilte mar atá roghnaithe againn, ansin níl ag `P-1` ach fachtóirí 1, 2, `(P-1)/2 ` agus `P-1`. Ós rud é `P` > 7, tá a fhios againn go bhfuil 3 sách príomhúil do `P-1`, mar sin sásaíonn `w=3` an tairiscint thuas.

## Algartam meastóireachta níos éifeachtaí bunaithe ar thaisce {#cache-based-evaluation}

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
