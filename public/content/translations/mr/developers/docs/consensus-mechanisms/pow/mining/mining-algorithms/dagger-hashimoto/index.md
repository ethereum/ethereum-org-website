---
title: Dagger-Hashimoto
description: Dagger-Hashimoto अल्गोरिदमवर एक सविस्तर नजर.
lang: mr
---

Dagger-Hashimoto हे इथेरियमच्या (Ethereum) खनन अल्गोरिदमसाठी मूळ संशोधन अंमलबजावणी आणि तपशील होते. Dagger-Hashimoto ची जागा [इथहॅश](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/#ethash) ने घेतली. 15 सप्टेंबर 2022 रोजी [द मर्ज](/roadmap/merge/) मध्ये खनन पूर्णपणे बंद करण्यात आले. तेव्हापासून, त्याऐवजी [प्रूफ-ऑफ-स्टेक (PoS)](/developers/docs/consensus-mechanisms/pos) यंत्रणेचा वापर करून इथेरियम सुरक्षित केले गेले आहे. हे पृष्ठ ऐतिहासिक स्वारस्यासाठी आहे - येथील माहिती पोस्ट-मर्ज इथेरियमसाठी यापुढे संबंधित नाही.

## पूर्वअटी {#prerequisites}

हे पृष्ठ अधिक चांगल्या प्रकारे समजून घेण्यासाठी, आम्ही शिफारस करतो की तुम्ही प्रथम [प्रूफ-ऑफ-वर्क (PoW) एकमत](/developers/docs/consensus-mechanisms/pow), [खनन](/developers/docs/consensus-mechanisms/pow/mining), आणि [खनन अल्गोरिदम](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms) बद्दल वाचा.

## Dagger-Hashimoto {#dagger-hashimoto}

Dagger-Hashimoto चे दोन उद्दिष्टे पूर्ण करण्याचे ध्येय आहे:

1.  **ASIC-प्रतिरोध**: अल्गोरिदमसाठी विशेष हार्डवेअर तयार करण्याचा फायदा शक्य तितका कमी असावा
2.  **लाइट क्लायंट पडताळणी**: लाइट क्लायंटद्वारे ब्लॉकची कार्यक्षमतेने पडताळणी करता आली पाहिजे.

अतिरिक्त बदलासह, इच्छित असल्यास तिसरे उद्दिष्ट कसे पूर्ण करायचे हे देखील आम्ही निर्दिष्ट करतो, परंतु अतिरिक्त गुंतागुंतीच्या किंमतीवर:

**संपूर्ण चेन स्टोरेज**: खननासाठी संपूर्ण ब्लॉकचेन स्थितीचे स्टोरेज आवश्यक असावे (इथेरियम स्टेट ट्रायच्या अनियमित रचनेमुळे, आम्ही अपेक्षा करतो की काही प्रूनिंग शक्य होईल, विशेषतः काही वारंवार वापरल्या जाणार्‍या करारांचे, परंतु आम्हाला हे कमीत कमी करायचे आहे).

## DAG निर्मिती {#dag-generation}

अल्गोरिदमसाठी कोड खाली Python मध्ये परिभाषित केला जाईल. प्रथम, आम्ही निर्दिष्ट अचूकतेच्या अनसाइन्ड इंट्सना स्ट्रिंगमध्ये मार्शल करण्यासाठी `encode_int` देतो. त्याचे व्यस्त देखील दिले आहे:

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

आम्ही पुढे असे गृहीत धरतो की `sha3` हे एक फंक्शन आहे जे एक पूर्णांक घेते आणि एक पूर्णांक आउटपुट करते, आणि `dbl_sha3` हे डबल-sha3 फंक्शन आहे; जर हा संदर्भ कोड अंमलबजावणीमध्ये रूपांतरित करत असाल तर वापरा:

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

### पॅरामीटर्स {#parameters}

अल्गोरिदमसाठी वापरलेले पॅरामीटर्स खालीलप्रमाणे आहेत:

```python
SAFE_PRIME_512 = 2**512 - 38117     # 2**512 पेक्षा लहान असलेली सर्वात मोठी सुरक्षित मूळ संख्या

params = {
      "n": 4000055296 * 8 // NUM_BITS,  # डेटासेटचा आकार (4 गिगाबाइट्स); 65536 च्या पटीत असणे आवश्यक आहे
      "n_inc": 65536,                   # प्रति कालावधी n च्या मूल्यात वाढ; 65536 च्या पटीत असणे आवश्यक आहे
                                        # epochtime=20000 सह प्रति वर्ष 882 MB वाढ देते
      "cache_size": 2500,               # लाइट क्लायंटच्या कॅशेचा आकार (लाइट द्वारे निवडला जाऊ शकतो
                                        # क्लायंट; अल्गोरिदम स्पेसिफिकेशनचा भाग नाही)
      "diff": 2**14,                    # काठिण्य पातळी (ब्लॉक मूल्यांकनादरम्यान समायोजित केली जाते)
      "epochtime": 100000,              # इपोकची लांबी ब्लॉकमध्ये (डेटासेट किती वेळा अपडेट केला जातो)
      "k": 1,                           # नोडच्या पॅरेंट्सची संख्या
      "w": w,                          # मॉड्युलर एक्स्पोनेन्शिएशन हॅशिंगसाठी वापरले जाते
      "accesses": 200,                  # हाशिमोटो दरम्यान डेटासेट अ‍ॅक्सेसची संख्या
      "P": SAFE_PRIME_512               # हॅशिंग आणि यादृच्छिक संख्या निर्मितीसाठी सुरक्षित मूळ संख्या
}
```

या प्रकरणात `P` ही एक मूळ संख्या (prime) निवडली आहे जेणेकरून `log₂(P)` हे 512 पेक्षा थोडे कमी असेल, जे आपण आपले क्रमांक दर्शवण्यासाठी वापरत असलेल्या 512 बिट्सशी संबंधित आहे. लक्षात घ्या की DAG चा फक्त उत्तरार्ध प्रत्यक्षात संचयित करणे आवश्यक आहे, त्यामुळे डी-फॅक्टो RAM ची आवश्यकता 1 GB पासून सुरू होते आणि दरवर्षी 441 MB ने वाढते.

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

मूलत:, हे एकाच नोड, `sha3(seed)` म्हणून ग्राफ सुरू करते आणि तेथून यादृच्छिक मागील नोड्सवर आधारित इतर नोड्स अनुक्रमे जोडण्यास सुरुवात करते. जेव्हा नवीन नोड तयार केला जातो, तेव्हा `i` पेक्षा कमी काही निर्देशांक यादृच्छिकपणे निवडण्यासाठी (वरील `x % i` वापरून) सीडची मॉड्युलर पॉवर मोजली जाते, आणि त्या निर्देशांकांवरील नोड्सची मूल्ये `x` साठी नवीन मूल्य व्युत्पन्न करण्यासाठी गणनेमध्ये वापरली जातात, जे नंतर निर्देशांक `i` वर ग्राफचे मूल्य अंतिमरित्या व्युत्पन्न करण्यासाठी एका लहान प्रूफ ऑफ वर्क फंक्शनमध्ये (XOR वर आधारित) दिले जाते. या विशिष्ट डिझाइनमागील तर्क म्हणजे DAG च्या अनुक्रमिक प्रवेशास भाग पाडणे; जोपर्यंत वर्तमान मूल्य ज्ञात होत नाही तोपर्यंत प्रवेश केल्या जाणार्‍या DAG चे पुढील मूल्य निर्धारित केले जाऊ शकत नाही. शेवटी, मॉड्युलर एक्सपोनेन्शिएशन परिणामाला आणखी हॅश करते.

हा अल्गोरिदम संख्या सिद्धांतातील (number theory) अनेक परिणामांवर अवलंबून आहे. चर्चेसाठी खालील परिशिष्ट पहा.

## लाइट क्लायंट मूल्यांकन {#light-client-evaluation}

वरील ग्राफ रचनेचा उद्देश ग्राफमधील प्रत्येक नोडची पुनर्रचना केवळ थोड्या संख्येच्या नोड्सच्या सबट्रीची गणना करून आणि केवळ थोड्या प्रमाणात सहायक मेमरीची आवश्यकता भासवून करणे हा आहे. लक्षात घ्या की k=1 सह, सबट्री ही केवळ DAG मधील पहिल्या घटकापर्यंत जाणारी मूल्यांची एक चेन आहे.

DAG साठी लाइट क्लायंट संगणन फंक्शन खालीलप्रमाणे कार्य करते:

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

मूलत:, हे वरील अल्गोरिदमचे फक्त एक पुनर्लेखन आहे जे संपूर्ण DAG साठी मूल्यांची गणना करण्याचा लूप काढून टाकते आणि पूर्वीच्या नोड लुकअपला रिकर्सिव्ह कॉल किंवा कॅशे लुकअपने बदलते. लक्षात घ्या की `k=1` साठी कॅशे अनावश्यक आहे, जरी पुढील ऑप्टिमायझेशन प्रत्यक्षात DAG च्या पहिल्या काही हजार मूल्यांची पूर्वगणना करते आणि ते संगणनासाठी स्टॅटिक कॅशे म्हणून ठेवते; याच्या कोड अंमलबजावणीसाठी परिशिष्ट पहा.

## DAGs चा डबल बफर {#double-buffer}

पूर्ण क्लायंटमध्ये, वरील सूत्राद्वारे तयार केलेल्या 2 DAGs चा [_डबल बफर_](https://wikipedia.org/wiki/Multiple_buffering) वापरला जातो. कल्पना अशी आहे की वरील पॅरामीटर्सनुसार प्रत्येक `epochtime` ब्लॉक्सच्या संख्येवर DAGs तयार केले जातात. क्लायंटने तयार केलेला नवीनतम DAG वापरण्याऐवजी, तो मागील एक वापरतो. याचा फायदा असा आहे की यामुळे खनिजांना (miners) अचानक सर्व डेटाची पूर्वगणना करावी लागणारी पायरी समाविष्ट न करता कालांतराने DAGs बदलण्याची अनुमती मिळते. अन्यथा, नियमित अंतराने चेन प्रक्रियेत अचानक तात्पुरती मंदी येण्याची आणि केंद्रीकरण नाटकीयरित्या वाढण्याची शक्यता असते. अशा प्रकारे सर्व डेटाची पूर्वगणना होण्यापूर्वीच्या त्या काही मिनिटांत 51% हल्ल्याचा धोका असतो.

ब्लॉकसाठी कामाची गणना करण्यासाठी वापरल्या जाणार्‍या DAGs चा संच तयार करण्यासाठी वापरला जाणारा अल्गोरिदम खालीलप्रमाणे आहे:

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
        # कोणताही बॅक बफर शक्य नाही, फक्त फ्रंट बफर बनवा
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": 0}}
    else:
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": seedset["front_number"]},
                "back": {"dag": produce_dag(params, seedset["back_hash"], dagsz),
                         "block_number": seedset["back_number"]}}
```

## Hashimoto {#hashimoto}

मूळ Hashimoto मागील कल्पना ब्लॉकचेनचा डेटासेट म्हणून वापर करणे, ब्लॉकचेनमधून N निर्देशांक निवडणारे संगणन करणे, त्या निर्देशांकांवरील व्यवहार गोळा करणे, या डेटाचे XOR करणे आणि परिणामाचा हॅश परत करणे ही आहे. Thaddeus Dryja चा मूळ अल्गोरिदम, सुसंगततेसाठी Python मध्ये अनुवादित केलेला, खालीलप्रमाणे आहे:

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

दुर्दैवाने, Hashimoto ला RAM हार्ड मानले जात असले तरी, ते 256-बिट अंकगणितावर अवलंबून आहे, ज्यामध्ये लक्षणीय संगणकीय ओव्हरहेड आहे. तथापि, या समस्येचे निराकरण करण्यासाठी Dagger-Hashimoto आपला डेटासेट अनुक्रमित करताना केवळ सर्वात कमी महत्त्वपूर्ण 64 बिट्स वापरते.

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

डबल SHA3 चा वापर झिरो-डेटा, जवळजवळ-त्वरित पूर्व-पडताळणीच्या स्वरूपास अनुमती देतो, केवळ योग्य मध्यवर्ती मूल्य प्रदान केले गेले होते याची पडताळणी करतो. प्रूफ-ऑफ-वर्कचा हा बाह्य स्तर अत्यंत ASIC-अनुकूल आणि बऱ्यापैकी कमकुवत आहे, परंतु DDoS ला आणखी कठीण बनवण्यासाठी अस्तित्वात आहे कारण त्वरित नाकारला जाणार नाही असा ब्लॉक तयार करण्यासाठी ते थोडेसे काम करणे आवश्यक आहे. येथे लाइट-क्लायंट आवृत्ती आहे:

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## खनन आणि पडताळणी {#mining-and-verifying}

आता, आपण हे सर्व खनन अल्गोरिदममध्ये एकत्र करूया:

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

येथे पडताळणी अल्गोरिदम आहे:

```python
def verify(daggerset, params, block, nonce):
    result = hashimoto(daggerset, get_dagsize(params, block),
                       params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

लाइट-क्लायंट अनुकूल पडताळणी:

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

तसेच, लक्षात घ्या की Dagger-Hashimoto ब्लॉक हेडरवर अतिरिक्त आवश्यकता लादते:

- द्वि-स्तरीय पडताळणी कार्य करण्यासाठी, ब्लॉक हेडरमध्ये नॉन्स आणि मध्य मूल्य pre-sha3 दोन्ही असणे आवश्यक आहे
- कुठेतरी, ब्लॉक हेडरने वर्तमान सीडसेटचा sha3 संचयित करणे आवश्यक आहे

## पुढील वाचन {#further-reading}

_तुम्हाला मदत केलेल्या समुदाय संसाधनाबद्दल माहिती आहे? हे पृष्ठ संपादित करा आणि ते जोडा!_

## परिशिष्ट {#appendix}

वर नमूद केल्याप्रमाणे, DAG निर्मितीसाठी वापरला जाणारा RNG संख्या सिद्धांतातील काही परिणामांवर अवलंबून असतो. प्रथम, आम्ही खात्री देतो की `picker` व्हेरिएबलचा आधार असलेल्या Lehmer RNG चा कालावधी मोठा आहे. दुसरे, आम्ही दर्शवितो की `pow(x,3,P)` हे `x` ला `1` किंवा `P-1` वर मॅप करणार नाही, जर सुरू करण्यासाठी `x ∈ [2,P-2]` प्रदान केले असेल. शेवटी, आम्ही दर्शवितो की हॅशिंग फंक्शन म्हणून मानले जाते तेव्हा `pow(x,3,P)` चा टक्कर दर (collision rate) कमी असतो.

### Lehmer random number generator {#lehmer-random-number}

जरी `produce_dag` फंक्शनला निःपक्षपाती यादृच्छिक संख्या तयार करण्याची आवश्यकता नसली तरी, एक संभाव्य धोका असा आहे की `seed**i % P` केवळ मूठभर मूल्ये घेते. हे पॅटर्न ओळखणाऱ्या खनिजांना (miners) न ओळखणाऱ्यांपेक्षा फायदा देऊ शकते.

हे टाळण्यासाठी, संख्या सिद्धांतातील एका परिणामाचा आधार घेतला जातो. एक [_सेफ प्राइम (Safe Prime)_](https://en.wikipedia.org/wiki/Safe_prime) अशी मूळ संख्या (prime) `P` म्हणून परिभाषित केली जाते की `(P-1)/2` देखील मूळ संख्या असते. [मल्टिप्लिकेटिव्ह ग्रुप](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `ℤ/nℤ` च्या सदस्य `x` ची _ऑर्डर_ किमान `m` म्हणून परिभाषित केली जाते जेणेकरून <pre>xᵐ mod P ≡ 1</pre>
या व्याख्या दिल्यास, आपल्याकडे आहे:

> निरीक्षण 1. समजा `x` हा सेफ प्राइम `P` साठी मल्टिप्लिकेटिव्ह ग्रुप `ℤ/Pℤ` चा सदस्य आहे. जर `x mod P ≠ 1 mod P` आणि `x mod P ≠ P-1 mod P` असेल, तर `x` ची ऑर्डर एकतर `P-1` किंवा `(P-1)/2` असते.

_पुरावा_. `P` हा सेफ प्राइम असल्याने, [Lagrange's Theorem][lagrange] नुसार आपल्याकडे `x` ची ऑर्डर एकतर `1`, `2`, `(P-1)/2`, किंवा `P-1` आहे.

`x` ची ऑर्डर `1` असू शकत नाही, कारण Fermat's Little Theorem नुसार आपल्याकडे आहे:

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

म्हणून `x` ही `ℤ/nℤ` ची मल्टिप्लिकेटिव्ह आयडेंटिटी असली पाहिजे, जी अद्वितीय आहे. आपण गृहीत धरल्याप्रमाणे `x ≠ 1` असल्याने, हे शक्य नाही.

`x` ची ऑर्डर `2` असू शकत नाही जोपर्यंत `x = P-1` नसेल, कारण यामुळे `P` मूळ संख्या (prime) असल्याचे उल्लंघन होईल.

वरील प्रस्तावावरून, आपण ओळखू शकतो की `(picker * init) % P` ची पुनरावृत्ती केल्यास सायकलची लांबी किमान `(P-1)/2` असेल. याचे कारण असे की आपण `P` ला दोनच्या उच्च घातांकाच्या अंदाजे समान सेफ प्राइम म्हणून निवडले आहे, आणि `init` हे `[2,2**256+1]` अंतराळात आहे. `P` चे परिमाण पाहता, आपण मॉड्युलर एक्सपोनेन्शिएशनमधून सायकलची अपेक्षा कधीही करू नये.

जेव्हा आपण DAG मधील पहिला सेल नियुक्त करत असतो (`init` लेबल केलेले व्हेरिएबल), तेव्हा आपण `pow(sha3(seed) + 2, 3, P)` ची गणना करतो. पहिल्या दृष्टीक्षेपात, हे हमी देत नाही की परिणाम `1` किंवा `P-1` नाही. तथापि, `P-1` हा सेफ प्राइम असल्याने, आपल्याकडे खालील अतिरिक्त आश्वासन आहे, जे निरीक्षण 1 चे उपप्रमेय (corollary) आहे:

> निरीक्षण 2. समजा `x` हा सेफ प्राइम `P` साठी मल्टिप्लिकेटिव्ह ग्रुप `ℤ/Pℤ` चा सदस्य आहे, आणि `w` ही नैसर्गिक संख्या आहे. जर `x mod P ≠ 1 mod P` आणि `x mod P ≠ P-1 mod P`, तसेच `w mod P ≠ P-1 mod P` आणि `w mod P ≠ 0 mod P` असेल, तर `xʷ mod P ≠ 1 mod P` आणि `xʷ mod P ≠ P-1 mod P`

### मॉड्युलर एक्सपोनेन्शिएशन हॅश फंक्शन म्हणून {#modular-exponentiation}

`P` आणि `w` च्या विशिष्ट मूल्यांसाठी, `pow(x, w, P)` फंक्शनमध्ये अनेक टक्कर (collisions) असू शकतात. उदाहरणार्थ, `pow(x,9,19)` केवळ `{1,18}` मूल्ये घेते.

`P` ही मूळ संख्या (prime) आहे हे लक्षात घेता, मॉड्युलर एक्सपोनेन्शिएशन हॅशिंग फंक्शनसाठी योग्य `w` खालील परिणामाचा वापर करून निवडले जाऊ शकते:

> निरीक्षण 3. समजा `P` ही मूळ संख्या आहे; `w` आणि `P-1` हे सापेक्षतः मूळ (relatively prime) आहेत जर आणि फक्त जर `ℤ/Pℤ` मधील सर्व `a` आणि `b` साठी:<center>`aʷ mod P ≡ bʷ mod P` जर आणि फक्त जर `a mod P ≡ b mod P`</center>

अशा प्रकारे, `P` ही मूळ संख्या आहे आणि `w` हे `P-1` शी सापेक्षतः मूळ आहे हे लक्षात घेता, आपल्याकडे `|{pow(x, w, P) : x ∈ ℤ}| = P` आहे, ज्याचा अर्थ असा आहे की हॅशिंग फंक्शनचा टक्कर दर शक्य तितका कमी आहे.

आपण निवडल्याप्रमाणे `P` हा सेफ प्राइम असलेल्या विशेष प्रकरणात, `P-1` चे केवळ 1, 2, `(P-1)/2` आणि `P-1` हे अवयव (factors) आहेत. `P` > 7 असल्याने, आपल्याला माहित आहे की 3 हे `P-1` शी सापेक्षतः मूळ आहे, म्हणून `w=3` वरील प्रस्तावाचे समाधान करते.

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