---
title: Dagger-Hashimoto
description: "Dagger-Hashimoto एल्गोरिदम पर एक विस्तृत नज़र।"
lang: hi
---

Dagger-Hashimoto इथेरियम के खनन एल्गोरिदम के लिए मूल शोध कार्यान्वयन और विनिर्देश था। Dagger-Hashimoto का स्थान [एथैश](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/#ethash) ने ले लिया था। 15 सितंबर 2022 को [द मर्ज](/roadmap/merge/) पर खनन पूरी तरह से बंद कर दिया गया था। तब से, इथेरियम को इसके बजाय [प्रूफ-ऑफ़-स्टेक (PoS)](/developers/docs/consensus-mechanisms/pos) तंत्र का उपयोग करके सुरक्षित किया गया है। यह पृष्ठ ऐतिहासिक रुचि के लिए है - यहाँ दी गई जानकारी अब मर्ज के बाद के इथेरियम के लिए प्रासंगिक नहीं है।

## पूर्वापेक्षाएँ {#prerequisites}

इस पृष्ठ को बेहतर ढंग से समझने के लिए, हम अनुशंसा करते हैं कि आप पहले [प्रूफ-ऑफ-वर्क (PoW) सर्वसम्मति](/developers/docs/consensus-mechanisms/pow), [खनन](/developers/docs/consensus-mechanisms/pow/mining), और [खनन एल्गोरिदम](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms) के बारे में पढ़ें।

## Dagger-Hashimoto {#dagger-hashimoto}

Dagger-Hashimoto का उद्देश्य दो लक्ष्यों को पूरा करना है:

1.  **ASIC-प्रतिरोध**: एल्गोरिदम के लिए विशेष हार्डवेयर बनाने का लाभ जितना संभव हो उतना कम होना चाहिए
2.  **लाइट क्लाइंट सत्यापन क्षमता**: एक ब्लॉक को लाइट क्लाइंट द्वारा कुशलतापूर्वक सत्यापित किया जाना चाहिए।

एक अतिरिक्त संशोधन के साथ, हम यह भी निर्दिष्ट करते हैं कि यदि वांछित हो तो तीसरे लक्ष्य को कैसे पूरा किया जाए, लेकिन अतिरिक्त जटिलता की कीमत पर:

**पूर्ण चेन स्टोरेज**: खनन के लिए संपूर्ण ब्लॉकचेन स्थिति के भंडारण की आवश्यकता होनी चाहिए (इथेरियम स्टेट ट्राई की अनियमित संरचना के कारण, हम अनुमान लगाते हैं कि कुछ प्रूनिंग संभव होगी, विशेष रूप से कुछ अक्सर उपयोग किए जाने वाले अनुबंधों की, लेकिन हम इसे कम से कम करना चाहते हैं)।

## DAG जनरेशन {#dag-generation}

एल्गोरिदम के लिए कोड नीचे Python में परिभाषित किया जाएगा। सबसे पहले, हम निर्दिष्ट सटीकता के अनसाइंड इंट्स (unsigned ints) को स्ट्रिंग्स में मार्शल करने के लिए `encode_int` देते हैं। इसका विलोम भी दिया गया है:

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

इसके बाद हम मान लेते हैं कि `sha3` एक फ़ंक्शन है जो एक पूर्णांक लेता है और एक पूर्णांक आउटपुट करता है, और `dbl_sha3` एक डबल-sha3 फ़ंक्शन है; यदि इस संदर्भ कोड को कार्यान्वयन में परिवर्तित कर रहे हैं तो इसका उपयोग करें:

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

### पैरामीटर्स {#parameters}

एल्गोरिदम के लिए उपयोग किए जाने वाले पैरामीटर्स हैं:

```python
SAFE_PRIME_512 = 2**512 - 38117     # 2**512 से कम सबसे बड़ी सुरक्षित अभाज्य संख्या

params = {
      "n": 4000055296 * 8 // NUM_BITS,  # डेटासेट का आकार (4 गीगाबाइट); 65536 का गुणज होना चाहिए
      "n_inc": 65536,                   # प्रति अवधि n के मान में वृद्धि; 65536 का गुणज होना चाहिए
                                        # epochtime=20000 के साथ प्रति वर्ष 882 MB की वृद्धि देता है
      "cache_size": 2500,               # लाइट क्लाइंट के कैश का आकार (लाइट द्वारा चुना जा सकता है
                                        # क्लाइंट; एल्गो स्पेक का हिस्सा नहीं है)
      "diff": 2**14,                    # कठिनाई (ब्लॉक मूल्यांकन के दौरान समायोजित)
      "epochtime": 100000,              # ब्लॉक में एक एपोक की लंबाई (डेटासेट कितनी बार अपडेट किया जाता है)
      "k": 1,                           # एक नोड के पैरेंट्स की संख्या
      "w": w,                          # मॉड्यूलर एक्सपोनेंशिएशन हैशिंग के लिए उपयोग किया जाता है
      "accesses": 200,                  # हाशिमोटो के दौरान डेटासेट एक्सेस की संख्या
      "P": SAFE_PRIME_512               # हैशिंग और रैंडम नंबर जनरेशन के लिए सुरक्षित अभाज्य संख्या
}
```

इस मामले में `P` एक अभाज्य (prime) संख्या है जिसे इस प्रकार चुना गया है कि `log₂(P)` 512 से थोड़ा कम है, जो उन 512 बिट्स से मेल खाता है जिनका उपयोग हम अपनी संख्याओं को दर्शाने के लिए कर रहे हैं। ध्यान दें कि वास्तव में DAG के केवल बाद वाले आधे हिस्से को संग्रहीत करने की आवश्यकता होती है, इसलिए वास्तविक RAM आवश्यकता 1 GB से शुरू होती है और प्रति वर्ष 441 MB बढ़ती है।

### Dagger ग्राफ़ निर्माण {#dagger-graph-building}

Dagger ग्राफ़ निर्माण प्रिमिटिव को निम्नानुसार परिभाषित किया गया है:

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

अनिवार्य रूप से, यह एक ग्राफ़ को एकल नोड, `sha3(seed)` के रूप में शुरू करता है, और वहां से यादृच्छिक (random) पिछले नोड्स के आधार पर क्रमिक रूप से अन्य नोड्स को जोड़ना शुरू करता है। जब एक नया नोड बनाया जाता है, तो `i` से कम कुछ सूचकांकों को यादृच्छिक रूप से चुनने के लिए सीड की एक मॉड्यूलर पावर की गणना की जाती है (ऊपर `x % i` का उपयोग करके), और उन सूचकांकों पर नोड्स के मानों का उपयोग `x` के लिए एक नया मान उत्पन्न करने के लिए एक गणना में किया जाता है, जिसे बाद में सूचकांक `i` पर ग्राफ़ का मान उत्पन्न करने के लिए एक छोटे प्रूफ-ऑफ-वर्क फ़ंक्शन (XOR पर आधारित) में फीड किया जाता है। इस विशेष डिज़ाइन के पीछे का तर्क DAG के क्रमिक एक्सेस को बाध्य करना है; DAG का अगला मान जिसे एक्सेस किया जाएगा, तब तक निर्धारित नहीं किया जा सकता जब तक कि वर्तमान मान ज्ञात न हो। अंत में, मॉड्यूलर एक्सपोनेंशिएशन परिणाम को आगे हैश करता है।

यह एल्गोरिदम संख्या सिद्धांत (number theory) के कई परिणामों पर निर्भर करता है। चर्चा के लिए नीचे दिया गया परिशिष्ट देखें।

## लाइट क्लाइंट मूल्यांकन {#light-client-evaluation}

उपरोक्त ग्राफ़ निर्माण का उद्देश्य ग्राफ़ में प्रत्येक नोड को केवल कुछ ही नोड्स के सबट्री की गणना करके और केवल थोड़ी मात्रा में सहायक मेमोरी की आवश्यकता के द्वारा फिर से बनाने की अनुमति देना है। ध्यान दें कि k=1 के साथ, सबट्री केवल DAG में पहले तत्व तक जाने वाले मानों की एक चेन है।

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

अनिवार्य रूप से, यह केवल उपरोक्त एल्गोरिदम का पुनर्लेखन है जो संपूर्ण DAG के लिए मानों की गणना करने वाले लूप को हटा देता है और पहले के नोड लुकअप को रिकर्सिव कॉल या कैश लुकअप से बदल देता है। ध्यान दें कि `k=1` के लिए कैश अनावश्यक है, हालांकि एक और अनुकूलन वास्तव में DAG के पहले कुछ हज़ार मानों की पूर्व-गणना करता है और उसे गणनाओं के लिए एक स्थिर कैश के रूप में रखता है; इसके कोड कार्यान्वयन के लिए परिशिष्ट देखें।

## DAGs का डबल बफ़र {#double-buffer}

एक पूर्ण क्लाइंट में, उपरोक्त सूत्र द्वारा निर्मित 2 DAGs के [_डबल बफ़र_](https://wikipedia.org/wiki/Multiple_buffering) का उपयोग किया जाता है। विचार यह है कि उपरोक्त पैरामीटर्स के अनुसार हर `epochtime` ब्लॉक की संख्या पर DAGs का निर्माण किया जाता है। क्लाइंट नवीनतम निर्मित DAG का उपयोग करने के बजाय, पिछले वाले का उपयोग करता है। इसका लाभ यह है कि यह खनिकों को अचानक सभी डेटा की फिर से गणना करने वाले चरण को शामिल किए बिना समय के साथ DAGs को बदलने की अनुमति देता है। अन्यथा, नियमित अंतराल पर चेन प्रोसेसिंग में अचानक अस्थायी मंदी और नाटकीय रूप से केंद्रीकरण बढ़ने की संभावना होती है। इस प्रकार सभी डेटा की फिर से गणना होने से पहले उन कुछ मिनटों के भीतर 51% हमले का जोखिम होता है।

एक ब्लॉक के लिए कार्य की गणना करने के लिए उपयोग किए जाने वाले DAGs के सेट को उत्पन्न करने के लिए उपयोग किया जाने वाला एल्गोरिदम निम्नानुसार है:

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
        # कोई बैक बफर संभव नहीं है, बस फ्रंट बफर बनाएं
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": 0}}
    else:
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": seedset["front_number"]},
                "back": {"dag": produce_dag(params, seedset["back_hash"], dagsz),
                         "block_number": seedset["back_number"]}}
```

## Hashimoto {#hashimoto}

मूल Hashimoto के पीछे का विचार ब्लॉकचेन को एक डेटासेट के रूप में उपयोग करना है, एक ऐसी गणना करना जो ब्लॉकचेन से N सूचकांकों का चयन करती है, उन सूचकांकों पर लेनदेन एकत्र करती है, इस डेटा का XOR करती है, और परिणाम का हैश लौटाती है। Thaddeus Dryja का मूल एल्गोरिदम, जिसे स्थिरता के लिए Python में अनुवादित किया गया है, निम्नानुसार है:

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

दुर्भाग्य से, जबकि Hashimoto को RAM हार्ड माना जाता है, यह 256-बिट अंकगणित पर निर्भर करता है, जिसमें काफी कम्प्यूटेशनल ओवरहेड होता है। हालाँकि, Dagger-Hashimoto इस समस्या को दूर करने के लिए अपने डेटासेट को अनुक्रमित करते समय केवल सबसे कम महत्वपूर्ण 64 बिट्स का उपयोग करता है।

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

डबल SHA3 का उपयोग शून्य-डेटा, लगभग-तत्काल पूर्व-सत्यापन के एक रूप की अनुमति देता है, जो केवल यह सत्यापित करता है कि एक सही मध्यवर्ती मान प्रदान किया गया था। प्रूफ-ऑफ-वर्क की यह बाहरी परत अत्यधिक ASIC-अनुकूल और काफी कमजोर है, लेकिन DDoS को और भी अधिक कठिन बनाने के लिए मौजूद है क्योंकि एक ब्लॉक का उत्पादन करने के लिए वह छोटा सा काम किया जाना चाहिए जिसे तुरंत अस्वीकार नहीं किया जाएगा। यहाँ लाइट-क्लाइंट संस्करण है:

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## खनन और सत्यापन {#mining-and-verifying}

अब, आइए इन सभी को खनन एल्गोरिदम में एक साथ रखें:

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

यहाँ सत्यापन एल्गोरिदम है:

```python
def verify(daggerset, params, block, nonce):
    result = hashimoto(daggerset, get_dagsize(params, block),
                       params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

लाइट-क्लाइंट अनुकूल सत्यापन:

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

इसके अलावा, ध्यान दें कि Dagger-Hashimoto ब्लॉक हेडर पर अतिरिक्त आवश्यकताएं लगाता है:

- दो-परत सत्यापन के काम करने के लिए, एक ब्लॉक हेडर में नॉन्स और मध्य मान pre-sha3 दोनों होने चाहिए
- कहीं न कहीं, एक ब्लॉक हेडर को वर्तमान सीडसेट के sha3 को संग्रहीत करना चाहिए

## आगे की पढ़ाई {#further-reading}

_क्या आप किसी ऐसे सामुदायिक संसाधन के बारे में जानते हैं जिसने आपकी मदद की? इस पृष्ठ को संपादित करें और इसे जोड़ें!_

## परिशिष्ट {#appendix}

जैसा कि ऊपर उल्लेख किया गया है, DAG जनरेशन के लिए उपयोग किया जाने वाला RNG संख्या सिद्धांत के कुछ परिणामों पर निर्भर करता है। सबसे पहले, हम आश्वासन प्रदान करते हैं कि Lehmer RNG जो `picker` चर का आधार है, उसकी एक विस्तृत अवधि (wide period) है। दूसरा, हम दिखाते हैं कि `pow(x,3,P)`, `x` को `1` या `P-1` पर मैप नहीं करेगा, बशर्ते कि शुरुआत करने के लिए `x ∈ [2,P-2]` हो। अंत में, हम दिखाते हैं कि हैशिंग फ़ंक्शन के रूप में व्यवहार किए जाने पर `pow(x,3,P)` की टकराव दर (collision rate) कम होती है।

### Lehmer रैंडम नंबर जनरेटर {#lehmer-random-number}

जबकि `produce_dag` फ़ंक्शन को निष्पक्ष रैंडम नंबर उत्पन्न करने की आवश्यकता नहीं है, एक संभावित खतरा यह है कि `seed**i % P` केवल कुछ ही मान लेता है। यह उन खनिकों को लाभ प्रदान कर सकता है जो पैटर्न को पहचानते हैं, उनके मुकाबले जो नहीं पहचानते हैं।

इससे बचने के लिए, संख्या सिद्धांत के एक परिणाम का सहारा लिया जाता है। एक [_सुरक्षित अभाज्य (Safe Prime)_](https://en.wikipedia.org/wiki/Safe_prime) को एक अभाज्य `P` के रूप में परिभाषित किया गया है जैसे कि `(P-1)/2` भी अभाज्य है। [मल्टीप्लिकेटिव ग्रुप](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `ℤ/nℤ` के एक सदस्य `x` के _क्रम (order)_ को न्यूनतम `m` के रूप में परिभाषित किया गया है जैसे कि <pre>xᵐ mod P ≡ 1</pre>
इन परिभाषाओं को देखते हुए, हमारे पास है:

> अवलोकन 1. मान लें कि `x` एक सुरक्षित अभाज्य `P` के लिए मल्टीप्लिकेटिव ग्रुप `ℤ/Pℤ` का सदस्य है। यदि `x mod P ≠ 1 mod P` और `x mod P ≠ P-1 mod P` है, तो `x` का क्रम या तो `P-1` है या `(P-1)/2` है।

_प्रमाण_। चूँकि `P` एक सुरक्षित अभाज्य है, इसलिए [Lagrange's Theorem][lagrange] के अनुसार हमारे पास `x` का क्रम या तो `1`, `2`, `(P-1)/2`, या `P-1` है।

`x` का क्रम `1` नहीं हो सकता, क्योंकि Fermat's Little Theorem के अनुसार हमारे पास है:

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

इसलिए `x` को `ℤ/nℤ` की एक मल्टीप्लिकेटिव पहचान (multiplicative identity) होना चाहिए, जो अद्वितीय है। चूँकि हमने धारणा के अनुसार यह मान लिया था कि `x ≠ 1`, यह संभव नहीं है।

`x` का क्रम `2` नहीं हो सकता जब तक कि `x = P-1` न हो, क्योंकि यह इस बात का उल्लंघन करेगा कि `P` अभाज्य है।

उपरोक्त प्रस्ताव से, हम यह पहचान सकते हैं कि `(picker * init) % P` को दोहराने पर कम से कम `(P-1)/2` की चक्र लंबाई (cycle length) होगी। ऐसा इसलिए है क्योंकि हमने `P` को दो की उच्च शक्ति के लगभग बराबर एक सुरक्षित अभाज्य के रूप में चुना है, और `init` अंतराल `[2,2**256+1]` में है। `P` के परिमाण को देखते हुए, हमें कभी भी मॉड्यूलर एक्सपोनेंशिएशन से चक्र की उम्मीद नहीं करनी चाहिए।

जब हम DAG में पहला सेल (चर जिसे `init` लेबल किया गया है) असाइन कर रहे होते हैं, तो हम `pow(sha3(seed) + 2, 3, P)` की गणना करते हैं। पहली नज़र में, यह गारंटी नहीं देता है कि परिणाम न तो `1` है और न ही `P-1`। हालाँकि, चूँकि `P-1` एक सुरक्षित अभाज्य है, हमारे पास निम्नलिखित अतिरिक्त आश्वासन है, जो अवलोकन 1 का एक उपप्रमेय (corollary) है:

> अवलोकन 2. मान लें कि `x` एक सुरक्षित अभाज्य `P` के लिए मल्टीप्लिकेटिव ग्रुप `ℤ/Pℤ` का सदस्य है, और मान लें कि `w` एक प्राकृतिक संख्या है। यदि `x mod P ≠ 1 mod P` और `x mod P ≠ P-1 mod P`, साथ ही `w mod P ≠ P-1 mod P` और `w mod P ≠ 0 mod P` है, तो `xʷ mod P ≠ 1 mod P` और `xʷ mod P ≠ P-1 mod P`

### हैश फ़ंक्शन के रूप में मॉड्यूलर एक्सपोनेंशिएशन {#modular-exponentiation}

`P` और `w` के कुछ मानों के लिए, फ़ंक्शन `pow(x, w, P)` में कई टकराव हो सकते हैं। उदाहरण के लिए, `pow(x,9,19)` केवल `{1,18}` मान लेता है।

यह देखते हुए कि `P` अभाज्य है, तो मॉड्यूलर एक्सपोनेंशिएशन हैशिंग फ़ंक्शन के लिए एक उपयुक्त `w` को निम्नलिखित परिणाम का उपयोग करके चुना जा सकता है:

> अवलोकन 3. मान लें कि `P` एक अभाज्य है; `w` और `P-1` अपेक्षाकृत अभाज्य (relatively prime) हैं यदि और केवल यदि `ℤ/Pℤ` में सभी `a` और `b` के लिए:<center>`aʷ mod P ≡ bʷ mod P` यदि और केवल यदि `a mod P ≡ b mod P`</center>

इस प्रकार, यह देखते हुए कि `P` अभाज्य है और `w`, `P-1` के अपेक्षाकृत अभाज्य है, हमारे पास `|{pow(x, w, P) : x ∈ ℤ}| = P` है, जिसका अर्थ है कि हैशिंग फ़ंक्शन में न्यूनतम संभव टकराव दर है।

विशेष मामले में कि `P` एक सुरक्षित अभाज्य है जैसा कि हमने चुना है, तो `P-1` के केवल 1, 2, `(P-1)/2` और `P-1` कारक (factors) हैं। चूँकि `P` > 7 है, हम जानते हैं कि 3, `P-1` के अपेक्षाकृत अभाज्य है, इसलिए `w=3` उपरोक्त प्रस्ताव को संतुष्ट करता है।

## अधिक कुशल कैश-आधारित मूल्यांकन एल्गोरिदम {#cache-based-evaluation}

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