---
title: Dagger-Hashimoto
description: "Dagger-Hashimoto अल्गोरिदमचा एक सविस्तर आढावा."
lang: mr
---

Dagger-Hashimoto हे Ethereum च्या मायनिंग अल्गोरिदमसाठी मूळ संशोधन अंमलबजावणी आणि विनिर्देश होते. Dagger-Hashimoto ची जागा [Ethash](#ethash) ने घेतली. 15 सप्टेंबर 2022 रोजी [द मर्ज](/roadmap/merge/) येथे मायनिंग पूर्णपणे बंद करण्यात आले. तेव्हापासून, त्याऐवजी [प्रुफ-ऑफ-स्टेक](/developers/docs/consensus-mechanisms/pos) यंत्रणा वापरून Ethereum सुरक्षित केले गेले आहे. हे पान ऐतिहासिक माहितीसाठी आहे - येथील माहिती मर्ज-नंतरच्या Ethereum साठी आता संबंधित नाही.

## पूर्वतयारी {#prerequisites}

हे पान अधिक चांगल्या प्रकारे समजून घेण्यासाठी, आम्ही शिफारस करतो की तुम्ही प्रथम [प्रुफ-ऑफ-वर्क कन्सेंसस](/developers/docs/consensus-mechanisms/pow), [मायनिंग](/developers/docs/consensus-mechanisms/pow/mining), आणि [मायनिंग अल्गोरिदम](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms) बद्दल वाचा.

## Dagger-Hashimoto {#dagger-hashimoto}

Dagger-Hashimoto चे उद्दिष्ट दोन उद्दिष्टे पूर्ण करणे आहे:

1. **ASIC-प्रतिरोध**: अल्गोरिदमसाठी विशेष हार्डवेअर तयार करण्याचा फायदा शक्य तितका कमी असावा
2. **लाईट क्लायंट पडताळणीक्षमता**: लाईट क्लायंटद्वारे एका ब्लॉकची कार्यक्षमतेने पडताळणी करता आली पाहिजे.

एका अतिरिक्त बदलासह, आम्ही इच्छित असल्यास तिसरे उद्दिष्ट कसे पूर्ण करायचे हे देखील निर्दिष्ट करतो, परंतु अतिरिक्त गुंतागुंतीच्या किंमतीवर:

**पूर्ण चेन स्टोरेज**: मायनिंगसाठी संपूर्ण ब्लॉकचेन स्थितीचा स्टोरेज आवश्यक असावा (Ethereum स्टेट ट्राईच्या अनियमित रचनेमुळे, आम्हाला अपेक्षा आहे की काही प्रूनिंग शक्य होईल, विशेषत: काही वारंवार वापरल्या जाणाऱ्या कॉन्ट्रॅक्ट्सची, परंतु आम्हाला हे कमी करायचे आहे).

## DAG जनरेशन {#dag-generation}

अल्गोरिदमसाठीचा कोड खाली Python मध्ये परिभाषित केला जाईल. प्रथम, आम्ही निर्दिष्ट अचूकतेचे अनसाईन्ड इंट्स स्ट्रिंग्समध्ये मार्शल करण्यासाठी `encode_int` देतो. त्याचा व्यस्त देखील दिला आहे:

```python
NUM_BITS = 512

def encode_int(x):
    "बिग-एंडियन स्कीम वापरून x या पूर्णांकाला 64 वर्णांच्या स्ट्रिंगमध्ये एन्कोड करा"
    o = ''
    for _ in range(NUM_BITS / 8):
        o = chr(x % 256) + o
        x //= 256
    return o

def decode_int(s):
    "बिग-एंडियन स्कीम वापरून स्ट्रिंगमधून x या पूर्णांकाला अनएन्कोड करा"
    x = 0
    for c in s:
        x *= 256
        x += ord(c)
    return x
```

पुढे आपण असे गृहीत धरतो की `sha3` हे एक फंक्शन आहे जे एक पूर्णांक घेते आणि एक पूर्णांक आउटपुट देते, आणि `dbl_sha3` हे एक डबल-sha3 फंक्शन आहे; हा संदर्भ कोड अंमलबजावणीमध्ये रूपांतरित करत असल्यास वापरा:

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

### मापदंड {#parameters}

अल्गोरिदमसाठी वापरलेले मापदंड आहेत:

```python
SAFE_PRIME_512 = 2**512 - 38117     # 2**512 पेक्षा कमी सर्वात मोठी सुरक्षित अविभाज्य संख्या

params = {
      "n": 4000055296 * 8 // NUM_BITS,  # डेटासेटचा आकार (4 गिगाबाईट्स); 65536 च्या पटीत असणे आवश्यक आहे
      "n_inc": 65536,                   # प्रति कालावधी n च्या मूल्यात वाढ; 65536 च्या पटीत असणे आवश्यक आहे
                                        # epochtime=20000 सह प्रति वर्ष 882 MB वाढ देते
      "cache_size": 2500,               # लाईट क्लायंटच्या कॅशेचा आकार (लाईट क्लायंटद्वारे निवडला जाऊ शकतो; अल्गो स्पेसिफिकेशनचा भाग नाही)
      "diff": 2**14,                    # अडचण (ब्लॉक मूल्यांकनादरम्यान समायोजित)
      "epochtime": 100000,              # ब्लॉक्समधील एका इपॉकची लांबी (डेटासेट किती वेळा अपडेट केला जातो)
      "k": 1,                           # नोडच्या पॅरेंट्सची संख्या
      "w": w,                          # मॉड्यूलर घातांक हॅशिंगसाठी वापरले जाते
      "accesses": 200,                  # हाशिमोटो दरम्यान डेटासेट प्रवेशांची संख्या
      "P": SAFE_PRIME_512               # हॅशिंग आणि यादृच्छिक संख्या निर्मितीसाठी सुरक्षित अविभाज्य संख्या
}
```

या प्रकरणात `P` ही एक अविभाज्य संख्या आहे जी अशी निवडली आहे की `log₂(P)` 512 पेक्षा किंचित कमी आहे, जे आपल्या संख्या दर्शवण्यासाठी आपण वापरत असलेल्या 512 बिट्सशी जुळते. लक्षात घ्या की प्रत्यक्षात DAG चा फक्त उत्तरार्ध संग्रहित करणे आवश्यक आहे, त्यामुळे वास्तविक रॅमची आवश्यकता 1 GB पासून सुरू होते आणि प्रति वर्ष 441 MB ने वाढते.

### डॅगर ग्राफ बिल्डिंग {#dagger-graph-building}

डॅगर ग्राफ बिल्डिंग प्रिमिटिव्ह खालीलप्रमाणे परिभाषित केले आहे:

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

मूलत:, हे एकाच नोड, `sha3(seed)` पासून ग्राफ सुरू करते आणि तेथून यादृच्छिक मागील नोड्सवर आधारित इतर नोड्स क्रमशः जोडण्यास सुरुवात करते. जेव्हा एक नवीन नोड तयार होतो, तेव्हा सीडची एक मॉड्यूलर पॉवर `i` पेक्षा कमी असलेले काही निर्देशांक यादृच्छिकपणे निवडण्यासाठी मोजली जाते (वर `x % i` वापरून), आणि त्या निर्देशांकांवर असलेल्या नोड्सची मूल्ये `x` साठी नवीन मूल्य तयार करण्यासाठी एका गणनेत वापरली जातात, जे नंतर एका लहान प्रुफ-ऑफ-वर्क फंक्शनमध्ये (XOR वर आधारित) दिले जाते, जेणेकरून शेवटी `i` निर्देशांकावर ग्राफचे मूल्य तयार होते. या विशिष्ट डिझाइनमागील तर्क म्हणजे DAG च्या क्रमशः प्रवेशासाठी सक्ती करणे; जोपर्यंत वर्तमान मूल्य ज्ञात नाही तोपर्यंत DAG चे पुढील मूल्य निर्धारित केले जाऊ शकत नाही. शेवटी, मॉड्यूलर घातांक परिणामास पुढे हॅश करते.

हा अल्गोरिदम संख्या सिद्धांतातील अनेक परिणामांवर अवलंबून आहे. चर्चेसाठी खालील परिशिष्ट पहा.

## लाईट क्लायंट मूल्यांकन {#light-client-evaluation}

वरील ग्राफ रचनेचा उद्देश ग्राफमधील प्रत्येक नोडची पुनर्रचना करण्यास परवानगी देणे आहे, फक्त थोड्या संख्येच्या नोड्सच्या सबट्रीची गणना करून आणि फक्त थोड्या प्रमाणात सहायक मेमरीची आवश्यकता असते. लक्षात घ्या की k=1 सह, सबट्री ही DAG मधील पहिल्या घटकापर्यंत जाणारी मूल्यांची एक साखळी आहे.

DAG साठी लाईट क्लायंट कंप्युटिंग फंक्शन खालीलप्रमाणे कार्य करते:

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

मूलत:, हे वरील अल्गोरिदमचे एक पुनर्लेखन आहे जे संपूर्ण DAG साठी मूल्ये मोजण्याचे लूप काढून टाकते आणि पूर्वीच्या नोड लूकअपला रिकर्सिव्ह कॉल किंवा कॅशे लूकअपसह बदलते. लक्षात घ्या की `k=1` साठी कॅशे अनावश्यक आहे, जरी पुढील ऑप्टिमायझेशन प्रत्यक्षात DAG ची पहिली काही हजार मूल्ये पूर्व-गणना करते आणि ते गणनेसाठी स्थिर कॅशे म्हणून ठेवते; याची कोड अंमलबजावणी परिशिष्टात पहा.

## DAGs चे डबल बफर {#double-buffer}

एका पूर्ण क्लायंटमध्ये, वरील सूत्राद्वारे तयार केलेल्या 2 DAGs चा एक [_डबल बफर_](https://wikipedia.org/wiki/Multiple_buffering) वापरला जातो. कल्पना अशी आहे की वरील पॅरामीटर्सनुसार प्रत्येक `epochtime` ब्लॉक संख्येवर DAGs तयार केले जातात. क्लायंटने तयार केलेला नवीनतम DAG वापरण्याऐवजी, तो मागील एक वापरतो. याचा फायदा हा आहे की ते DAGs वेळेनुसार बदलण्याची परवानगी देते, ज्यात मायनर्सना अचानक सर्व डेटाची पुनर्गणना करावी लागते असा टप्पा समाविष्ट करण्याची आवश्यकता नाही. अन्यथा, नियमित अंतराने चेन प्रक्रियेत अचानक तात्पुरती मंदी येण्याची आणि केंद्रीकरण नाटकीयरित्या वाढण्याची शक्यता आहे. त्यामुळे सर्व डेटाची पुनर्गणना होण्यापूर्वी त्या काही मिनिटांत 51% हल्ल्याचा धोका असतो.

ब्लॉकसाठी कार्य मोजण्यासाठी वापरल्या जाणाऱ्या DAGs चा संच तयार करण्यासाठी वापरलेला अल्गोरिदम खालीलप्रमाणे आहे:

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
        # बॅक बफर शक्य नाही, फक्त फ्रंट बफर तयार करा
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": 0}}
    else:
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": seedset["front_number"]},
                "back": {"dag": produce_dag(params, seedset["back_hash"], dagsz),
                         "block_number": seedset["back_number"]}}
```

## Hashimoto {#hashimoto}

मूळ हाशिमोटोमागील कल्पना ब्लॉकचेनला डेटासेट म्हणून वापरणे आहे, एक गणना करणे जी ब्लॉकचेनमधून N निर्देशांक निवडते, त्या निर्देशांकांवरील व्यवहार गोळा करते, या डेटाचे XOR करते आणि परिणामाचा हॅश परत करते. थॅडियस ड्रायजाचा मूळ अल्गोरिदम, सुसंगततेसाठी Python मध्ये अनुवादित, खालीलप्रमाणे आहे:

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

दुर्दैवाने, हाशिमोटोला रॅम हार्ड मानले जात असले तरी, ते 256-बिट अंकगणितावर अवलंबून आहे, ज्यात लक्षणीय संगणकीय ओव्हरहेड आहे. तथापि, या समस्येचे निराकरण करण्यासाठी Dagger-Hashimoto आपल्या डेटासेटला अनुक्रमित करताना फक्त सर्वात कमी लक्षणीय 64 बिट्स वापरते.

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

डबल SHA3 चा वापर शून्य-डेटा, जवळपास-तत्काळ पूर्व-पडताळणीसाठी परवानगी देतो, फक्त हे सत्यापित करतो की योग्य मध्यवर्ती मूल्य प्रदान केले गेले होते. प्रुफ-ऑफ-वर्कचा हा बाह्य थर अत्यंत ASIC-अनुकूल आणि बऱ्यापैकी कमकुवत आहे, परंतु DDoS आणखी कठीण करण्यासाठी अस्तित्वात आहे कारण असा ब्लॉक तयार करण्यासाठी ते लहान काम करणे आवश्यक आहे जो त्वरित नाकारला जाणार नाही. ही लाईट-क्लायंट आवृत्ती आहे:

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## मायनिंग आणि पडताळणी {#mining-and-verifying}

आता, आपण हे सर्व मायनिंग अल्गोरिदममध्ये एकत्र ठेवूया:

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

हा पडताळणी अल्गोरिदम आहे:

```python
def verify(daggerset, params, block, nonce):
    result = hashimoto(daggerset, get_dagsize(params, block),
                       params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

लाईट-क्लायंट अनुकूल पडताळणी:

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

तसेच, लक्षात घ्या की Dagger-Hashimoto ब्लॉक हेडरवर अतिरिक्त आवश्यकता लादते:

- दोन-स्तरीय पडताळणी कार्य करण्यासाठी, ब्लॉक हेडरमध्ये नॉन्स आणि मध्यवर्ती मूल्य दोन्ही प्री-sha3 असणे आवश्यक आहे
- कुठेतरी, ब्लॉक हेडरने वर्तमान सीडसेटचा sha3 संग्रहित करणे आवश्यक आहे

## पुढील वाचन {#further-reading}

_तुम्हाला मदत केलेल्या सामुदायिक संसाधनाबद्दल माहिती आहे का?_ हे पृष्ठ संपादित करा आणि ते जोडा!_

## परिशिष्ट {#appendix}

वर नमूद केल्याप्रमाणे, DAG जनरेशनसाठी वापरलेले RNG संख्या सिद्धांतातील काही परिणामांवर अवलंबून आहे. प्रथम, आम्ही आश्वासन देतो की लेमर RNG जे `picker` व्हेरिएबलचा आधार आहे त्याचा कालावधी मोठा आहे. दुसरे, आम्ही दाखवतो की `pow(x,3,P)` `x` ला `1` किंवा `P-1` वर मॅप करणार नाही, जर `x ∈ [2,P-2]` पासून सुरू होत असेल. शेवटी, आम्ही दाखवतो की `pow(x,3,P)` चा टक्कर दर कमी आहे जेव्हा त्याला हॅशिंग फंक्शन म्हणून मानले जाते.

### लेमर यादृच्छिक संख्या जनरेटर {#lehmer-random-number}

`produce_dag` फंक्शनला निःपक्षपाती यादृच्छिक संख्या तयार करण्याची आवश्यकता नसली तरी, एक संभाव्य धोका आहे की `seed**i % P` फक्त काही मोजकीच मूल्ये घेते. हे पॅटर्न ओळखणाऱ्या मायनर्सना जे ओळखत नाहीत त्यांच्यापेक्षा फायदा देऊ शकते.

हे टाळण्यासाठी, संख्या सिद्धांतातील एका निकालाचा आधार घेतला जातो. एक [_सुरक्षित अविभाज्य संख्या_](https://en.wikipedia.org/wiki/Safe_prime) अशी अविभाज्य संख्या `P` म्हणून परिभाषित केली जाते की `(P-1)/2` देखील अविभाज्य असते. [गुणाकार गट](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `ℤ/nℤ` च्या सदस्य `x` चा _ऑर्डर_ किमान `m` म्हणून परिभाषित केला जातो जसे की <pre>xᵐ mod P ≡ 1</pre>
या व्याख्या दिल्यावर, आपल्याकडे आहे:

> निरीक्षण 1. `x` हा सुरक्षित अविभाज्य `P` साठी गुणाकार गट `ℤ/Pℤ` चा सदस्य असू द्या. जर `x mod P ≠ 1 mod P` आणि `x mod P ≠ P-1 mod P` असेल, तर `x` चा ऑर्डर `P-1` किंवा `(P-1)/2` आहे.

_पुरावा_. `P` एक सुरक्षित अविभाज्य असल्यामुळे, नंतर [लाग्रेंजच्या प्रमेयानुसार][lagrange] आपल्याकडे `x` चा ऑर्डर `1`, `2`, `(P-1)/2`, किंवा `P-1` आहे.

`x` चा ऑर्डर `1` असू शकत नाही, कारण फर्माच्या लहान प्रमेयानुसार आपल्याकडे आहे:

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

म्हणून `x` हे `ℤ/nℤ` चे एक गुणाकार ओळख असणे आवश्यक आहे, जे अद्वितीय आहे. आपण गृहित धरल्याप्रमाणे `x ≠ 1` गृहित धरल्यामुळे, हे शक्य नाही.

`x` चा ऑर्डर `2` असू शकत नाही जोपर्यंत `x = P-1` नाही, कारण हे `P` अविभाज्य असल्याचे उल्लंघन करेल.

वरील प्रतिपादनावरून, आपण ओळखू शकतो की `(picker * init) % P` ची पुनरावृत्ती केल्यास चक्राची लांबी किमान `(P-1)/2` असेल. हे कारण आपण `P` ला दोनच्या उच्च घातांकाच्या अंदाजे समान असलेली एक सुरक्षित अविभाज्य संख्या म्हणून निवडले आहे, आणि `init` हे `[2,2**256+1]` या अंतराळात आहे. `P` चे परिमाण पाहता, आपण मॉड्यूलर घातांकातून चक्राची अपेक्षा कधीही करू नये.

जेव्हा आपण DAG मधील पहिली सेल (व्हेरिएबल `init` म्हणून लेबल केलेले) नियुक्त करत असतो, तेव्हा आपण `pow(sha3(seed) + 2, 3, P)` मोजतो. पहिल्या दृष्टीक्षेपात, हे परिणाम `1` किंवा `P-1` नसल्याची हमी देत नाही. तथापि, `P-1` एक सुरक्षित अविभाज्य असल्यामुळे, आपल्याकडे खालील अतिरिक्त आश्वासन आहे, जे निरीक्षण 1 चे एक उपप्रमेय आहे:

> निरीक्षण २. `x` हा सुरक्षित अविभाज्य `P` साठी गुणाकार गट `ℤ/Pℤ` चा सदस्य असू द्या, आणि `w` एक नैसर्गिक संख्या असू द्या. जर `x mod P ≠ 1 mod P` आणि `x mod P ≠ P-1 mod P` असेल, तसेच `w mod P ≠ P-1 mod P` आणि `w mod P ≠ 0 mod P` असेल, तर `xʷ mod P ≠ 1 mod P` आणि `xʷ mod P ≠ P-1 mod P`

### हॅश फंक्शन म्हणून मॉड्यूलर घातांक {#modular-exponentiation}

`P` आणि `w` च्या काही विशिष्ट मूल्यांसाठी, `pow(x, w, P)` या फंक्शनमध्ये अनेक टकराव असू शकतात. उदाहरणार्थ, `pow(x,9,19)` फक्त `{1,18}` ही मूल्ये घेते.

`P` अविभाज्य आहे हे लक्षात घेता, मॉड्यूलर घातांक हॅशिंग फंक्शनसाठी योग्य `w` खालील निकालाचा वापर करून निवडला जाऊ शकतो:

> निरीक्षण 3. `P` एक अविभाज्य संख्या असू द्या; `w` आणि `P-1` सापेक्ष अविभाज्य आहेत जर आणि फक्त जर `ℤ/Pℤ` मधील सर्व `a` आणि `b` साठी:<center>`aʷ mod P ≡ bʷ mod P` जर आणि फक्त जर `a mod P ≡ b mod P`</center>

म्हणून, `P` अविभाज्य आहे आणि `w` हे `P-1` च्या सापेक्ष अविभाज्य आहे हे लक्षात घेता, आपल्याकडे `|{pow(x, w, P) : x ∈ ℤ}| = P` आहे, याचा अर्थ असा की हॅशिंग फंक्शनचा टक्कर दर शक्य तितका किमान आहे.

आपण निवडल्याप्रमाणे `P` एक सुरक्षित अविभाज्य संख्या आहे या विशेष बाबतीत, तर `P-1` ला फक्त 1, 2, `(P-1)/2` आणि `P-1` हे घटक आहेत. `P` > 7 असल्यामुळे, आपल्याला माहित आहे की 3 हे `P-1` च्या सापेक्ष अविभाज्य आहे, म्हणून `w=3` वरील प्रतिपादनाची पूर्तता करते.

## अधिक कार्यक्षम कॅशे-आधारित मूल्यांकन अल्गोरिदम {#cache-based-evaluation}

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
