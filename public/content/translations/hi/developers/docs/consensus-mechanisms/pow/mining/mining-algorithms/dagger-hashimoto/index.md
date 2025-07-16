---
title: डैगर-हाशिमोटो
description: डैगर-हाशिमोटो एल्गोरिथम पर एक विस्तृत नज़र।
lang: hi
---

डैगर-हाशिमोटो एथेरियम के माईनिंग एल्गोरिथम के लिए मूल अनुसंधान कार्यान्वयन और विनिर्देश था। डैगर-हाशिमोतो को [एथाश](#ethash) द्वारा प्रतिस्थापित किया गया था। माईनिंग को 15 सितंबर 2022 को [द मर्ज](/roadmap/merge/) के बाद पूरी तरह से बंद कर दिया गया था। तब से, एथेरियम को इसके बजाय [प्रूफ-ऑफ-स्टेक](/developers/docs/consensus-mechanisms/pos) मैकेनिज्म का उपयोग करके सुरक्षित किया गया है। यह पृष्ठ ऐतिहासिक रुचि के लिए है - यहां दी गई जानकारी अब मर्ज के बाद के एथेरियम के लिए प्रासंगिक नहीं है।

## आवश्यक शर्तें {#prerequisites}

इस पृष्ठ को बेहतर ढंग से समझने के लिए, हम अनुशंसा करते हैं कि आप पहले [प्रूफ-ऑफ-वर्क कंसेंसस](/developers/docs/consensus-mechanisms/pow), [माईनिंग](/developers/docs/consensus-mechanisms/pow/mining), और [माईनिंग एल्गोरिथम](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms) पढें।

## डैगर-हाशिमोटो {#dagger-hashimoto}

डैगर-हाशिमोटो का लक्ष्य दो लक्ष्यों को पूरा करना है:

1.  **ASIC-प्रतिरोध**: एल्गोरिथम के लिए विशेष हार्डवेयर बनाने से लाभ जितना संभव हो उतना छोटा होना चाहिए
2.  **लाइट क्लाइंट सत्यापनीयता**: एक ब्लॉक को एक लाइट क्लाइंट द्वारा कुशलता से सत्यापित किया जाना चाहिए।

एक अतिरिक्त संशोधन के साथ, हम यह भी निर्दिष्ट करते हैं कि वांछित होने पर तीसरे लक्ष्य को कैसे पूरा किया जाए, लेकिन अतिरिक्त जटिलता की कीमत पर:

**फुल चेन स्टोरेज**: माईनिंग को फुल ब्लॉकचेन स्थिति के स्टोरेज की आवश्यकता होनी चाहिए (एथेरियम स्टेट ट्राई की अनियमित संरचना के कारण, हम आशा करते हैं कि कुछ छंटाई संभव होगी, विशेष रूप से कुछ अक्सर उपयोग किए जाने वाले अनुबंध, लेकिन हम इसे कम करना चाहते हैं)।

## DAG जनरेशन {#dag-generation}

एल्गोरिथम के लिए कोड नीचे Python में परिभाषित किया जाएगा। सबसे पहले, हम स्ट्रिंग्स को निर्दिष्ट परिशुद्धता के अहस्ताक्षरित इंट्स को मार्शल करने के लिए `encode_int` देते हैं। इसका रिवर्स भी दिया गया है:

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

हम आगे मानते हैं कि `sha3` एक फ़ंक्शन है जो एक पूर्णांक लेता है और एक पूर्णांक आउटपुट के रूप में प्रदान करता है, और `dbl_sha3` एक double-sha3 फ़ंक्शन है; यदि इस संदर्भ कोड को कार्यान्वयन में परिवर्तित करते हैं, तो उपयोग करें:

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

### पैरामीटर {#parameters}

एल्गोरिथम के लिए उपयोग किए जाने वाले पैरामीटर हैं:

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

इस मामले में `P` एक प्राइम चुना गया है जैसे कि `log₂(P)` 512 से थोड़ा कम है, जो उन 512 बिट्स से मेल खाता है जिनका उपयोग हम अपनी संख्याओं का प्रतिनिधित्व करने के लिए कर रहे हैं। ध्यान दें कि DAG के केवल उत्तरार्ध को वास्तव में संग्रहीत करने की आवश्यकता है, इसलिए वास्तविक RAM की आवश्यकता 1 GB से शुरू होती है और प्रति वर्ष 441 MB तक बढ़ती है।

### डैगर ग्राफ बिल्डिंग {#dagger-graph-building}

डैगर ग्राफ बिल्डिंग प्रिमिटिव को निम्नानुसार परिभाषित किया गया है:

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

अनिवार्य रूप से, यह एक एकल नोड, `sha3(seed)` के रूप में एक ग्राफ से शुरू होता है, और वहां से रैंडम पिछले नोड्स के आधार पर क्रमिक रूप से अन्य नोड्स पर जोड़ना शुरू कर देता है। जब एक नया नोड बनाया जाता है, तो सीड की एक मॉड्यूलर शक्ति की गणना रैंडम रूप से `i` से कम कुछ इंडाइस का चयन करने के लिए की जाती है (ऊपर `x % i` का उपयोग करके), और उन इंडाइस पर मौजूद नोड्स के मानों का उपयोग `x` के लिए एक नया मान उत्पन्न करने के लिए गणना करने में किया जाता है, जिसे तब एक छोटे काम का सबूत फ़ंक्शन (XOR पर आधारित) में फ़ीड किया जाता है ताकि अंततः सूचकांक `i` पर ग्राफ का मूल्य उत्पन्न किया जा सके। इस विशेष डिजाइन के पीछे तर्क DAG की अनुक्रमिक पहुंच को प्रेरित करना है; एक्सेस किए जाने वाले DAG का अगला मान तब तक निर्धारित नहीं किया जा सकता जब तक कि वर्तमान मान ज्ञात न हो। अंत में, मॉड्यूलर घातांक परिणाम को आगे बढ़ाता है।

यह एल्गोरिथम संख्या सिद्धांत के कई परिणामों पर निर्भर करता है। चर्चा के लिए नीचे दिया गया परिशिष्ट देखें।

## लाइट क्लाइंट मूल्यांकन {#light-client-evaluation}

उपरोक्त ग्राफ निर्माण का उद्देश्य ग्राफ में प्रत्येक नोड को केवल थोड़ी संख्या में नोड्स के सबट्री की गणना करके पुनर्निर्माण करने की अनुमति देना और केवल थोड़ी मात्रा में सहायक मेमोरी आवश्यक होने की सुविधा देना है। ध्यान दें कि k = 1 के साथ, सबट्री केवल DAG में पहले तत्व तक जाने वाले मानों की एक श्रृंखला है।

DAG के लिए लाइट क्लाइंट कंप्यूटिंग फ़ंक्शन निम्नानुसार काम करता है:

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

अनिवार्य रूप से, यह केवल उपरोक्त एल्गोरिथम का एक पुनर्लेखन है जो पूरे DAG के लिए मानों की गणना करने के लूप को हटा देता है और पहले के नोड लुकअप को रिकर्सिव कॉल या कैश लुकअप से बदल देता है। ध्यान दें कि `k=1` के लिए कैश अनावश्यक है, हालांकि एक और अनुकूलन वास्तव में DAG के पहले कुछ हजार मानों को पूर्व-गणना करता है और इसे गणना के लिए स्थिर कैश के रूप में रखता है; इस के कोड कार्यान्वयन के लिए परिशिष्ट देखें।

## DAG का डबल बफर {#double-buffer}

एक फ़ुल क्लाइंट में, उपरोक्त सूत्र द्वारा उत्पादित 2 DAG के [_डबल बफर_](https://wikipedia.org/wiki/Multiple_buffering) का उपयोग किया जाता है। विचार यह है कि DAG उपरोक्त पैराम्स के अनुसार ब्लॉक के हर `युग` संख्या में उत्पादित होते हैं। उत्पादित नवीनतम DAG का उपयोग करने वाले क्लाइंट के बजाय, यह पिछले एक का उपयोग करता है। इसका लाभ यह है कि यह DAG को समय के साथ एक चरण को शामिल करने की आवश्यकता के बिना बदलने की अनुमति देता है जहां माईनर को अचानक सभी डेटा की पुनर्गणना करनी होगी। अन्यथा, नियमित अंतराल पर चेन प्रोसेसिंग में अचानक अस्थायी रूप से गति में कमी और नाटकीय रूप से बढ़ते केंद्रीकरण की संभावना है। इस प्रकार सभी डेटा की पुनर्गणना करने से पहले उन कुछ मिनटों के भीतर 51% हमले का जोखिम होता है।

ब्लॉक के लिए काम की गणना करने के लिए उपयोग किए जाने वाले DAG के सेट को उत्पन्न करने के लिए उपयोग किया जाने वाला एल्गोरिथम इस प्रकार है:

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

## हाशिमोटो {#hashimoto}

मूल हाशिमोटो के पीछे का विचार ब्लॉकचेन को डेटासेट के रूप में उपयोग करना है, एक गणना करना जो ब्लॉकचेन से N इंडाइस का चयन करता है, उन इंडाइस पर लेनदेन को इकट्ठा करता है, इस डेटा पर XOR निष्पादित करता है, और परिणाम का हैश लौटाता है। थैडियस ड्रायजा का मूल एल्गोरिथम, स्थिरता के लिए Python में अनुवादित, इस प्रकार है:

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

दुर्भाग्य से, जबकि हाशिमोटो को RAM हार्ड माना जाता है, यह 256-बिट अंकगणित पर निर्भर करता है, जिसमें काफी कम्प्यूटेशनल ओवरहेड है। हालाँकि, डैगर-हाशिमोटो इस समस्या को हल करने के लिए अपने डेटासेट को अनुक्रमित करते समय केवल कम से कम महत्वपूर्ण 64 बिट्स का उपयोग करता है।

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

डबल SHA3 का उपयोग शून्य-डेटा के एक रूप, निकट-तत्काल पूर्व-सत्यापन की अनुमति देता है, जिससे यह सत्यापित होता है कि एक सही मध्यवर्ती मान प्रदान किया गया था। प्रूफ-ऑफ-वर्क की यह बाहरी परत अत्यधिक ASIC-अनुकूल और काफी कमजोर है, लेकिन DDoS को और भी कठिन बनाने के लिए मौजूद है क्योंकि उस छोटी मात्रा में काम एक ब्लॉक का उत्पादन करने के लिए किया जाना चाहिए जिसे तुरंत अस्वीकार नहीं किया जाएगा। लाइट-क्लाइंट संस्करण निम्न है:

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## माईनिंग और सत्यापन {#mining-and-verifying}

अब, हम इसे माईनिंग एल्गोरिथम में एक साथ रखते हैं:

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

सत्यापन एल्गोरिथम निम्न है:

```python
def verify(daggerset, params, block, nonce):
    result = hashimoto(daggerset, get_dagsize(params, block),
                       params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

लाइट-क्लाइंट फ्रेंडली वेरिफिकेशन:

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

इसके अलावा, ध्यान दें कि डैगर-हाशिमोटो ब्लॉक हेडर पर अतिरिक्त आवश्यकताओं को लागू करता है:

- काम करने के लिए दो-परत सत्यापन के लिए, एक ब्लॉक हेडर में नॉन्स और मध्य मान प्री-sha3 दोनों होना चाहिए
- कहीं न कहीं, एक ब्लॉक हेडर को वर्तमान सीडसेट के sha3 को स्टोर करना चाहिए

## अग्रिम पठन {#further-reading}

_एक सामुदायिक संसाधन के बारे में जानें, जिसने आपकी मदद की? इस पृष्ठ को संपादित करें और इसे जोड़ें!_

## परिशिष्ट {#appendix}

जैसा कि ऊपर उल्लेख किया गया है, DAG पीढ़ी के लिए उपयोग किया जाने वाला RNG संख्या सिद्धांत के कुछ परिणामों पर निर्भर करता है। सबसे पहले, हम आश्वासन देते हैं कि लेहमर RNG जो `पिकर` वेरिएबल का आधार है, उसकी एक विस्तृत अवधि है। दूसरा, हम दिखाते हैं कि `pow(x,3,P)` `x` को `1` या `P-1` से मैप नहीं करेगा, बशर्ते `x ∈ [2,P-2]` शुरू करने के लिए हो। अंत में, हम दिखाते हैं कि हैशिंग फ़ंक्शन के रूप में प्रयुक्त किए जाने पर `pow(x,3,P)` की कॉलिज़न दर कम होती है।

### लेहमर रैंडम नंबर जनरेटर {#lehmer-random-number}

हालांकि `produce_dag` फ़ंक्शन को निष्पक्ष रैंडम संख्याओं का उत्पादन करने की आवश्यकता नहीं है, एक संभावित खतरा यह है कि `seed**i % P` केवल कुछ ही मानों को ग्रहण करता है। यह उन माईनर को एक लाभ प्रदान कर सकता है जो उन लोगों पर पैटर्न को पहचानते हैं जो नहीं करते हैं।

इससे बचने के लिए, संख्या सिद्धांत से परिणाम की अपील की जाती है। एक [_सेफ़ प्राइम_](https://en.wikipedia.org/wiki/Safe_prime) को एक प्राइम `P` के रूप में परिभाषित किया गया है जैसे कि `(P-1)/2` भी प्राइम है। [गुणक समूह](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) के सदस्य `x` का _क्रम_ `Z/nZ` को न्यूनतम `m` के रूप में इस प्रकार निर्धारित किया गया है कि <pre>xᵐ mod P ≡ 1</pre>
इन निर्धारणों को देखते हुए, हमारे पास है:

> ऑब्जर्वेशन 1. माना कि एक सेफ प्राइम `P` के लिए `x` गुणक समूह `ℤ/Pℤ` का सदस्य है। यदि `x mod P ≠ 1 mod P` और `x mod P ≠ P-1 mod P` है, तो `x` का क्रम या तो `P-1` या `(P-1)/2` है।

_प्रमाण_। चूँकि `P` एक सेफ प्राइम है, तो \[लैग्रेंज प्रमेय\] \[लैग्रेंज\] द्वारा सिद्ध होता है कि `x` का क्रम या तो `1`, `2`, `(P-1)/2`, या `P-1` है।

`x` का क्रम `1` नहीं हो सकता है, क्योंकि फर्मेट के लिटिल प्रमेय द्वारा सिद्ध होता है:

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

अतः `x`, `Z/nZ` की गुणक पहचान होनी चाहिए, जो अद्वितीय है। चूँकि हमने मान लिया है कि `x ≠ 1` धारणा द्वारा, यह संभव नहीं है।

`x` का क्रम `2` नहीं हो सकता जब तक कि `x = P-1` न हो, क्योंकि यह उल्लंघन करेगा कि `P` अभाज्य है।

उपरोक्त प्रस्ताव से, हम पहचान सकते हैं कि पुनरावृत्त `(picker * init) % P` की चक्र लंबाई कम से कम `(P-1)/2` होगी। ऐसा इसलिए है क्योंकि हमने `P` को लगभग दो की उच्च शक्ति के बराबर एक सेफ़ प्राइम के रूप में चुना है, और `init` अंतराल `[2,2**256+1]` में है। `P` के परिमाण को देखते हुए, हमें मॉड्यूलर घातांक से चक्र की उम्मीद कभी नहीं करनी चाहिए।

जब हम DAG (`init` लेबल वाला वेरिएबल) में पहला सेल असाइन कर रहे होते हैं, तो हम `pow(sha3(seed) + 2, 3, P)` की गणना करते हैं। पहली नज़र में, यह गारंटी नहीं देता है कि परिणाम न तो `1` है और न ही `P-1` है। हालांकि, चूंकि `P-1` एक सेफ़ प्राइम है, इसलिए हमारे पास निम्नलिखित अतिरिक्त आश्वासन हैं, जो अवलोकन 1 का एक परिणाम है:

> ऑब्जर्वेशन 2. माना कि सेफ़ प्राइम `P` के लिए `x` गुणक समूह `ℤ/Pℤ` का सदस्य है, और मान लीजिए `w` एक प्राकृत संख्या है। यदि `x mod P ≠ 1 mod P` और `x mod P ≠ P-1 mod P`, साथ ही `w mod P ≠ P-1 mod P` और `w mod P ≠ 0 mod P` है, तो `xw mod P ≠ 1 mod P` और `xw mod P ≠ P-1 mod P`

### एक हैश फ़ंक्शन के रूप में मॉड्यूलर घातांक {#modular-exponentiation}

`P` और `w` के कुछ मानों के लिए, फ़ंक्शन `pow(x, w, P)` में कई टकराव हो सकते हैं। उदाहरण के लिए, `pow(x,9,19)` केवल `{1,18}` मान लेता है।

चूंकि `P` प्राइम है, तो मॉड्यूलर घातांक हैशिंग फ़ंक्शन के लिए एक उपयुक्त `w` को निम्नलिखित परिणाम का उपयोग करके चुना जा सकता है:

> ऑब्जर्वेशन 3. मान लीजिए `P` एक प्राइम है; `w` और `P-1` अपेक्षाकृत प्राइम हैं यदि और केवल यदि `a` और `b` `ℤ/Pℤ`में:
> 
> <center>
>   'aw mod P ≡ bw mod P' if और only if 'a mod P ≡ b mod P'
> </center>

इस प्रकार, चूंकि `P` प्राइम है और `w` `P-1` के लिए अपेक्षाकृत प्राइम है, हमें ज्ञात होता है कि `|{pow(x, w, P) : x ∈ ℤ}| = P`, जिसका अर्थ है कि हैशिंग फ़ंक्शन में न्यूनतम टक्कर दर संभव है।

विशेष मामले में कि `P` एक सेफ़ प्राइम है जैसा कि हमने चुना है, तो `P-1` में केवल कारक 1, 2, `(P-1)/2` `P-1`। चूँकि `P` > 7, हम जानते हैं कि `P-1` के लिए 3 अपेक्षाकृत प्राइम है, इसलिए `w = 3` उपरोक्त प्रस्ताव को संतुष्ट करता है।

## अधिक कुशल कैश-आधारित मूल्यांकन एल्गोरिथम {#cache-based-evaluation}

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
