---
title: Dagger-Hashimoto
description: Dagger-Hashimoto అల్గారిథమ్ గురించి ఒక వివరణాత్మక పరిశీలన.
lang: te
---

Dagger-Hashimoto అనేది ఎథీరియం యొక్క మైనింగ్ అల్గారిథమ్ కోసం అసలు పరిశోధన అమలు మరియు స్పెసిఫికేషన్. Dagger-Hashimoto స్థానంలో [ఎథాష్](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/#ethash) వచ్చింది. 15 సెప్టెంబర్ 2022న [ది మెర్జ్](/roadmap/merge/) వద్ద మైనింగ్ పూర్తిగా నిలిపివేయబడింది. అప్పటి నుండి, ఎథీరియం దానికి బదులుగా [ప్రూఫ్-ఆఫ్-స్టేక్ (PoS)](/developers/docs/consensus-mechanisms/pos) యంత్రాంగాన్ని ఉపయోగించి సురక్షితం చేయబడింది. ఈ పేజీ చారిత్రక ఆసక్తి కోసం ఉద్దేశించబడింది - ఇక్కడ ఉన్న సమాచారం మెర్జ్ తర్వాత ఎథీరియంకు ఇకపై వర్తించదు.

## ముందస్తు అవసరాలు {#prerequisites}

ఈ పేజీని బాగా అర్థం చేసుకోవడానికి, మీరు ముందుగా [ప్రూఫ్-ఆఫ్-వర్క్ (PoW) ఏకాభిప్రాయం](/developers/docs/consensus-mechanisms/pow), [మైనింగ్](/developers/docs/consensus-mechanisms/pow/mining), మరియు [మైనింగ్ అల్గారిథమ్‌ల](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms) గురించి చదవాలని మేము సిఫార్సు చేస్తున్నాము.

## Dagger-Hashimoto {#dagger-hashimoto}

Dagger-Hashimoto రెండు లక్ష్యాలను సంతృప్తి పరచాలని లక్ష్యంగా పెట్టుకుంది:

1.  **ASIC-నిరోధకత**: అల్గారిథమ్ కోసం ప్రత్యేకమైన హార్డ్‌వేర్‌ను సృష్టించడం వల్ల కలిగే ప్రయోజనం వీలైనంత తక్కువగా ఉండాలి
2.  **తేలికపాటి క్లయింట్ ధృవీకరణ**: ఒక బ్లాక్ తేలికపాటి క్లయింట్ ద్వారా సమర్థవంతంగా ధృవీకరించబడాలి.

అదనపు సవరణతో, కావాలనుకుంటే మూడవ లక్ష్యాన్ని ఎలా నెరవేర్చాలో కూడా మేము నిర్దేశిస్తాము, కానీ ఇది అదనపు సంక్లిష్టతకు దారితీస్తుంది:

**పూర్తి చైన్ నిల్వ**: మైనింగ్‌కు పూర్తి బ్లాక్‌చైన్ స్థితి యొక్క నిల్వ అవసరం (ఎథీరియం స్థితి ట్రై యొక్క క్రమరహిత నిర్మాణం కారణంగా, ముఖ్యంగా తరచుగా ఉపయోగించే కొన్ని కాంట్రాక్ట్‌ల విషయంలో కొంత కత్తిరింపు సాధ్యమవుతుందని మేము ఆశిస్తున్నాము, కానీ మేము దీనిని తగ్గించాలనుకుంటున్నాము).

## DAG జనరేషన్ {#dag-generation}

అల్గారిథమ్ కోసం కోడ్ క్రింద Pythonలో నిర్వచించబడుతుంది. ముందుగా, పేర్కొన్న ఖచ్చితత్వం గల అన్‌సైన్డ్ ఇంట్‌లను స్ట్రింగ్‌లుగా మార్చడానికి మేము `encode_int` ఇస్తాము. దాని విలోమం కూడా ఇవ్వబడింది:

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

తరువాత `sha3` అనేది ఒక పూర్ణాంకాన్ని తీసుకుని పూర్ణాంకాన్ని అవుట్‌పుట్ చేసే ఫంక్షన్ అని, మరియు `dbl_sha3` అనేది డబుల్-sha3 ఫంక్షన్ అని మేము ఊహిస్తాము; ఈ రిఫరెన్స్ కోడ్‌ను అమలులోకి మార్చినట్లయితే దీన్ని ఉపయోగించండి:

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

### పారామితులు {#parameters}

అల్గారిథమ్ కోసం ఉపయోగించే పారామితులు:

```python
SAFE_PRIME_512 = 2**512 - 38117     # 2**512 కంటే తక్కువైన అతిపెద్ద సురక్షిత ప్రధాన సంఖ్య

params = {
      "n": 4000055296 * 8 // NUM_BITS,  # డేటాసెట్ పరిమాణం (4 గిగాబైట్లు); తప్పనిసరిగా 65536 యొక్క గుణిజం అయి ఉండాలి
      "n_inc": 65536,                   # ప్రతి కాలానికి n విలువలో పెరుగుదల; తప్పనిసరిగా 65536 యొక్క గుణిజం అయి ఉండాలి
                                        # epochtime=20000 తో సంవత్సరానికి 882 MB వృద్ధిని ఇస్తుంది
      "cache_size": 2500,               # తేలికపాటి క్లయింట్ యొక్క కాష్ పరిమాణం (తేలికపాటి
                                        # క్లయింట్ ద్వారా ఎంచుకోబడవచ్చు; ఆల్గో స్పెక్ లో భాగం కాదు)
      "diff": 2**14,                    # క్లిష్టత (బ్లాక్ మూల్యాంకనం సమయంలో సర్దుబాటు చేయబడుతుంది)
      "epochtime": 100000,              # బ్లాక్‌లలో ఒక ఎపోక్ పొడవు (డేటాసెట్ ఎంత తరచుగా నవీకరించబడుతుంది)
      "k": 1,                           # ఒక నోడ్ యొక్క పేరెంట్స్ సంఖ్య
      "w": w,                          # మాడ్యులర్ ఎక్స్‌పోనెన్షియేషన్ హాషింగ్ కోసం ఉపయోగించబడుతుంది
      "accesses": 200,                  # హషిమోటో సమయంలో డేటాసెట్ యాక్సెస్‌ల సంఖ్య
      "P": SAFE_PRIME_512               # హాషింగ్ మరియు యాదృచ్ఛిక సంఖ్య ఉత్పత్తి కోసం సురక్షిత ప్రధాన సంఖ్య
}
```

ఈ సందర్భంలో `P` అనేది `log₂(P)` కేవలం 512 కంటే కొంచెం తక్కువగా ఉండేలా ఎంచుకోబడిన ఒక ప్రధాన సంఖ్య, ఇది మన సంఖ్యలను సూచించడానికి మనం ఉపయోగిస్తున్న 512 బిట్‌లకు అనుగుణంగా ఉంటుంది. DAG యొక్క రెండవ సగం మాత్రమే వాస్తవానికి నిల్వ చేయబడాలని గమనించండి, కాబట్టి వాస్తవ RAM అవసరం 1 GB వద్ద ప్రారంభమవుతుంది మరియు సంవత్సరానికి 441 MB పెరుగుతుంది.

### Dagger గ్రాఫ్ నిర్మాణం {#dagger-graph-building}

Dagger గ్రాఫ్ నిర్మాణ ప్రాథమిక అంశం ఈ క్రింది విధంగా నిర్వచించబడింది:

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

ముఖ్యంగా, ఇది గ్రాఫ్‌ను ఒకే నోడ్ `sha3(seed)`గా ప్రారంభిస్తుంది మరియు అక్కడి నుండి యాదృచ్ఛిక మునుపటి నోడ్‌ల ఆధారంగా ఇతర నోడ్‌లను వరుసగా జోడించడం ప్రారంభిస్తుంది. కొత్త నోడ్ సృష్టించబడినప్పుడు, `i` కంటే తక్కువ ఉన్న కొన్ని సూచికలను యాదృచ్ఛికంగా ఎంచుకోవడానికి సీడ్ యొక్క మాడ్యులర్ పవర్ లెక్కించబడుతుంది (పైన ఉన్న `x % i` ఉపయోగించి), మరియు ఆ సూచికల వద్ద ఉన్న నోడ్‌ల విలువలు `x` కోసం కొత్త విలువను రూపొందించడానికి గణనలో ఉపయోగించబడతాయి, ఇది అంతిమంగా `i` సూచిక వద్ద గ్రాఫ్ విలువను రూపొందించడానికి ఒక చిన్న ప్రూఫ్ ఆఫ్ వర్క్ ఫంక్షన్‌లోకి (XOR ఆధారంగా) పంపబడుతుంది. ఈ నిర్దిష్ట రూపకల్పన వెనుక ఉన్న హేతువు DAG యొక్క సీక్వెన్షియల్ యాక్సెస్‌ను బలవంతం చేయడం; ప్రస్తుత విలువ తెలిసే వరకు యాక్సెస్ చేయబడే DAG యొక్క తదుపరి విలువను నిర్ణయించలేము. చివరగా, మాడ్యులర్ ఎక్స్‌పోనెన్షియేషన్ ఫలితాన్ని మరింత హాష్ చేస్తుంది.

ఈ అల్గారిథమ్ సంఖ్యా సిద్ధాంతం నుండి వచ్చిన అనేక ఫలితాలపై ఆధారపడి ఉంటుంది. చర్చ కోసం క్రింద ఉన్న అనుబంధాన్ని చూడండి.

## తేలికపాటి క్లయింట్ మూల్యాంకనం {#light-client-evaluation}

పై గ్రాఫ్ నిర్మాణం గ్రాఫ్‌లోని ప్రతి నోడ్‌ను కేవలం తక్కువ సంఖ్యలో నోడ్‌ల సబ్‌ట్రీని లెక్కించడం ద్వారా మరియు తక్కువ మొత్తంలో సహాయక మెమరీని మాత్రమే అవసరం చేయడం ద్వారా పునర్నిర్మించడానికి అనుమతించే ఉద్దేశ్యంతో ఉంది. k=1తో, సబ్‌ట్రీ అనేది DAGలోని మొదటి మూలకం వరకు వెళ్లే విలువల చైన్ మాత్రమే అని గమనించండి.

DAG కోసం తేలికపాటి క్లయింట్ కంప్యూటింగ్ ఫంక్షన్ ఈ క్రింది విధంగా పనిచేస్తుంది:

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

ముఖ్యంగా, ఇది పై అల్గారిథమ్ యొక్క పునర్లేఖనం మాత్రమే, ఇది మొత్తం DAG కోసం విలువలను లెక్కించే లూప్‌ను తొలగిస్తుంది మరియు మునుపటి నోడ్ లుకప్‌ను రికర్సివ్ కాల్ లేదా కాష్ లుకప్‌తో భర్తీ చేస్తుంది. `k=1` కోసం కాష్ అనవసరం అని గమనించండి, అయినప్పటికీ మరింత ఆప్టిమైజేషన్ వాస్తవానికి DAG యొక్క మొదటి కొన్ని వేల విలువలను ముందుగా లెక్కిస్తుంది మరియు గణనల కోసం దానిని స్టాటిక్ కాష్‌గా ఉంచుతుంది; దీని కోడ్ అమలు కోసం అనుబంధాన్ని చూడండి.

## DAGల డబుల్ బఫర్ {#double-buffer}

పూర్తి క్లయింట్‌లో, పై ఫార్ములా ద్వారా ఉత్పత్తి చేయబడిన 2 DAGల [_డబుల్ బఫర్_](https://wikipedia.org/wiki/Multiple_buffering) ఉపయోగించబడుతుంది. పైన ఉన్న పారామితుల ప్రకారం ప్రతి `epochtime` బ్లాక్‌లకు DAGలు ఉత్పత్తి చేయబడతాయి అనేది ఆలోచన. క్లయింట్ ఉత్పత్తి చేయబడిన తాజా DAGని ఉపయోగించడానికి బదులుగా, ఇది మునుపటి దాన్ని ఉపయోగిస్తుంది. దీని ప్రయోజనం ఏమిటంటే, మైనర్లు అకస్మాత్తుగా మొత్తం డేటాను తిరిగి లెక్కించాల్సిన దశను చేర్చాల్సిన అవసరం లేకుండా కాలక్రమేణా DAGలను భర్తీ చేయడానికి ఇది అనుమతిస్తుంది. లేకపోతే, క్రమం తప్పకుండా చైన్ ప్రాసెసింగ్‌లో ఆకస్మిక తాత్కాలిక మందగమనం మరియు కేంద్రీకరణ నాటకీయంగా పెరిగే అవకాశం ఉంది. అందువల్ల మొత్తం డేటా తిరిగి లెక్కించబడటానికి ముందు ఆ కొన్ని నిమిషాల్లో 51% దాడి ప్రమాదాలు ఉంటాయి.

బ్లాక్ కోసం పనిని లెక్కించడానికి ఉపయోగించే DAGల సెట్‌ను రూపొందించడానికి ఉపయోగించే అల్గారిథమ్ ఈ క్రింది విధంగా ఉంటుంది:

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
        # బ్యాక్ బఫర్ సాధ్యం కాదు, కేవలం ఫ్రంట్ బఫర్‌ను మాత్రమే తయారు చేయండి
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": 0}}
    else:
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": seedset["front_number"]},
                "back": {"dag": produce_dag(params, seedset["back_hash"], dagsz),
                         "block_number": seedset["back_number"]}}
```

## Hashimoto {#hashimoto}

అసలు Hashimoto వెనుక ఉన్న ఆలోచన ఏమిటంటే, బ్లాక్‌చైన్‌ను డేటాసెట్‌గా ఉపయోగించడం, బ్లాక్‌చైన్ నుండి N సూచికలను ఎంచుకునే గణనను నిర్వహించడం, ఆ సూచికల వద్ద లావాదేవీలను సేకరించడం, ఈ డేటా యొక్క XORను నిర్వహించడం మరియు ఫలితం యొక్క హాష్‌ను తిరిగి ఇవ్వడం. Thaddeus Dryja యొక్క అసలు అల్గారిథమ్, స్థిరత్వం కోసం Pythonకు అనువదించబడింది, ఇది ఈ క్రింది విధంగా ఉంటుంది:

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

దురదృష్టవశాత్తు, Hashimoto RAM హార్డ్‌గా పరిగణించబడుతున్నప్పటికీ, ఇది 256-బిట్ అంకగణితంపై ఆధారపడి ఉంటుంది, ఇది గణనీయమైన గణన ఓవర్‌హెడ్‌ను కలిగి ఉంటుంది. అయితే, ఈ సమస్యను పరిష్కరించడానికి Dagger-Hashimoto దాని డేటాసెట్‌ను సూచిక చేస్తున్నప్పుడు అతి తక్కువ ముఖ్యమైన 64 బిట్‌లను మాత్రమే ఉపయోగిస్తుంది.

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

డబుల్ SHA3 వాడకం జీరో-డేటా, దాదాపు తక్షణ ముందస్తు-ధృవీకరణ రూపానికి అనుమతిస్తుంది, సరైన ఇంటర్మీడియట్ విలువ అందించబడిందని మాత్రమే ధృవీకరిస్తుంది. ప్రూఫ్-ఆఫ్-వర్క్ యొక్క ఈ బయటి పొర అత్యంత ASIC-స్నేహపూర్వకమైనది మరియు చాలా బలహీనమైనది, కానీ వెంటనే తిరస్కరించబడని బ్లాక్‌ను ఉత్పత్తి చేయడానికి ఆ చిన్న మొత్తంలో పని చేయాలి కాబట్టి DDoSను మరింత కష్టతరం చేయడానికి ఇది ఉనికిలో ఉంది. తేలికపాటి-క్లయింట్ వెర్షన్ ఇక్కడ ఉంది:

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## మైనింగ్ మరియు ధృవీకరణ {#mining-and-verifying}

ఇప్పుడు, వాటన్నింటినీ మైనింగ్ అల్గారిథమ్‌లో కలుపుదాం:

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

ధృవీకరణ అల్గారిథమ్ ఇక్కడ ఉంది:

```python
def verify(daggerset, params, block, nonce):
    result = hashimoto(daggerset, get_dagsize(params, block),
                       params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

తేలికపాటి-క్లయింట్ స్నేహపూర్వక ధృవీకరణ:

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

అలాగే, Dagger-Hashimoto బ్లాక్ శీర్షికపై అదనపు అవసరాలను విధిస్తుందని గమనించండి:

- రెండు-పొరల ధృవీకరణ పనిచేయడానికి, బ్లాక్ శీర్షిక నాన్స్ మరియు మధ్య విలువ pre-sha3 రెండింటినీ కలిగి ఉండాలి
- ఎక్కడో ఒకచోట, బ్లాక్ శీర్షిక ప్రస్తుత సీడ్‌సెట్ యొక్క sha3ని నిల్వ చేయాలి

## మరింత చదవడానికి {#further-reading}

_మీకు సహాయపడిన కమ్యూనిటీ వనరు గురించి తెలుసా? ఈ పేజీని సవరించి, దాన్ని జోడించండి!_

## అనుబంధం {#appendix}

పైన గమనించినట్లుగా, DAG జనరేషన్ కోసం ఉపయోగించే RNG సంఖ్యా సిద్ధాంతం నుండి కొన్ని ఫలితాలపై ఆధారపడి ఉంటుంది. ముందుగా, `picker` వేరియబుల్‌కు ఆధారమైన Lehmer RNG విస్తృత వ్యవధిని కలిగి ఉందని మేము హామీ ఇస్తున్నాము. రెండవది, ప్రారంభించడానికి `x ∈ [2,P-2]` అందించబడితే `pow(x,3,P)` అనేది `x`ని `1` లేదా `P-1`కి మ్యాప్ చేయదని మేము చూపుతాము. చివరగా, హాషింగ్ ఫంక్షన్‌గా పరిగణించినప్పుడు `pow(x,3,P)` తక్కువ తాకిడి రేటును కలిగి ఉందని మేము చూపుతాము.

### Lehmer యాదృచ్ఛిక సంఖ్య జనరేటర్ {#lehmer-random-number}

`produce_dag` ఫంక్షన్ నిష్పాక్షికమైన యాదృచ్ఛిక సంఖ్యలను ఉత్పత్తి చేయాల్సిన అవసరం లేనప్పటికీ, `seed**i % P` కేవలం కొన్ని విలువలను మాత్రమే తీసుకుంటుందనేది సంభావ్య ముప్పు. ఇది నమూనాను గుర్తించని వారి కంటే గుర్తించే మైనర్లకు ప్రయోజనాన్ని అందిస్తుంది.

దీన్ని నివారించడానికి, సంఖ్యా సిద్ధాంతం నుండి ఒక ఫలితం ఉపయోగించబడుతుంది. `(P-1)/2` కూడా ప్రధాన సంఖ్య అయ్యేలా ఒక ప్రధాన సంఖ్య `P`ని [_సేఫ్ ప్రైమ్_](https://en.wikipedia.org/wiki/Safe_prime) అని నిర్వచిస్తారు. [మల్టిప్లికేటివ్ గ్రూప్](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `ℤ/nℤ` యొక్క సభ్యుడు `x` యొక్క _క్రమం_ <pre>xᵐ mod P ≡ 1</pre> అయ్యేలా కనీస `m`గా నిర్వచించబడింది.
ఈ నిర్వచనాల ఆధారంగా, మనకు ఇవి ఉన్నాయి:

> పరిశీలన 1. సేఫ్ ప్రైమ్ `P` కోసం మల్టిప్లికేటివ్ గ్రూప్ `ℤ/Pℤ`లో `x` ఒక సభ్యుడు అనుకుందాం. `x mod P ≠ 1 mod P` మరియు `x mod P ≠ P-1 mod P` అయితే, `x` యొక్క క్రమం `P-1` లేదా `(P-1)/2` అవుతుంది.

_రుజువు_. `P` అనేది సేఫ్ ప్రైమ్ కాబట్టి, [Lagrange's Theorem][lagrange] ద్వారా `x` యొక్క క్రమం `1`, `2`, `(P-1)/2`, లేదా `P-1` అని మనకు తెలుసు.

Fermat's Little Theorem ద్వారా మనకు ఇది ఉన్నందున, `x` యొక్క క్రమం `1` కాలేదు:

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

అందువల్ల `x` తప్పనిసరిగా `ℤ/nℤ` యొక్క మల్టిప్లికేటివ్ ఐడెంటిటీ అయి ఉండాలి, ఇది ప్రత్యేకమైనది. ఊహ ద్వారా మనం `x ≠ 1` అని ఊహించినందున, ఇది సాధ్యం కాదు.

`x = P-1` అయితే తప్ప `x` యొక్క క్రమం `2` కాలేదు, ఎందుకంటే ఇది `P` ప్రధాన సంఖ్య అనే దాన్ని ఉల్లంఘిస్తుంది.

పై ప్రతిపాదన నుండి, `(picker * init) % P`ని పునరావృతం చేయడం కనీసం `(P-1)/2` సైకిల్ పొడవును కలిగి ఉంటుందని మనం గుర్తించవచ్చు. ఎందుకంటే మనం `P`ని రెండు యొక్క అధిక పవర్‌కు దాదాపు సమానంగా ఉండే సేఫ్ ప్రైమ్‌గా ఎంచుకున్నాము మరియు `init` అనేది `[2,2**256+1]` విరామంలో ఉంటుంది. `P` యొక్క పరిమాణాన్ని బట్టి, మాడ్యులర్ ఎక్స్‌పోనెన్షియేషన్ నుండి మనం ఎప్పుడూ సైకిల్‌ను ఆశించకూడదు.

మనం DAGలో మొదటి సెల్‌ను కేటాయిస్తున్నప్పుడు (`init` అని లేబుల్ చేయబడిన వేరియబుల్), మనం `pow(sha3(seed) + 2, 3, P)`ని లెక్కిస్తాము. మొదటి చూపులో, ఫలితం `1` లేదా `P-1` కాదని ఇది హామీ ఇవ్వదు. అయితే, `P-1` అనేది సేఫ్ ప్రైమ్ కాబట్టి, మనకు ఈ క్రింది అదనపు హామీ ఉంది, ఇది పరిశీలన 1 యొక్క ఉపసిద్ధాంతం:

> పరిశీలన 2. సేఫ్ ప్రైమ్ `P` కోసం మల్టిప్లికేటివ్ గ్రూప్ `ℤ/Pℤ`లో `x` ఒక సభ్యుడు అనుకుందాం, మరియు `w` ఒక సహజ సంఖ్య అనుకుందాం. `x mod P ≠ 1 mod P` మరియు `x mod P ≠ P-1 mod P`, అలాగే `w mod P ≠ P-1 mod P` మరియు `w mod P ≠ 0 mod P` అయితే, అప్పుడు `xʷ mod P ≠ 1 mod P` మరియు `xʷ mod P ≠ P-1 mod P`

### హాష్ ఫంక్షన్‌గా మాడ్యులర్ ఎక్స్‌పోనెన్షియేషన్ {#modular-exponentiation}

`P` మరియు `w` యొక్క నిర్దిష్ట విలువల కోసం, `pow(x, w, P)` ఫంక్షన్ అనేక తాకిడిలను కలిగి ఉండవచ్చు. ఉదాహరణకు, `pow(x,9,19)` కేవలం `{1,18}` విలువలను మాత్రమే తీసుకుంటుంది.

`P` ప్రధాన సంఖ్య అయినందున, మాడ్యులర్ ఎక్స్‌పోనెన్షియేషన్ హాషింగ్ ఫంక్షన్ కోసం తగిన `w`ని ఈ క్రింది ఫలితాన్ని ఉపయోగించి ఎంచుకోవచ్చు:

> పరిశీలన 3. `P` ఒక ప్రధాన సంఖ్య అనుకుందాం; `ℤ/Pℤ`లోని అన్ని `a` మరియు `b`ల కోసం మాత్రమే `w` మరియు `P-1` సాపేక్షంగా ప్రధానమైనవి:<center>`a mod P ≡ b mod P` అయితే మాత్రమే `aʷ mod P ≡ bʷ mod P`</center>

అందువల్ల, `P` ప్రధాన సంఖ్య మరియు `w` అనేది `P-1`కి సాపేక్షంగా ప్రధానమైనది కాబట్టి, మనకు `|{pow(x, w, P) : x ∈ ℤ}| = P` ఉంది, అంటే హాషింగ్ ఫంక్షన్ సాధ్యమైనంత తక్కువ తాకిడి రేటును కలిగి ఉందని సూచిస్తుంది.

మనం ఎంచుకున్నట్లుగా `P` సేఫ్ ప్రైమ్ అయిన ప్రత్యేక సందర్భంలో, `P-1` కేవలం 1, 2, `(P-1)/2` మరియు `P-1` కారకాలను మాత్రమే కలిగి ఉంటుంది. `P` > 7 కాబట్టి, 3 అనేది `P-1`కి సాపేక్షంగా ప్రధానమైనదని మనకు తెలుసు, అందువల్ల `w=3` పై ప్రతిపాదనను సంతృప్తి పరుస్తుంది.

## మరింత సమర్థవంతమైన కాష్-ఆధారిత మూల్యాంకన అల్గారిథమ్ {#cache-based-evaluation}

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