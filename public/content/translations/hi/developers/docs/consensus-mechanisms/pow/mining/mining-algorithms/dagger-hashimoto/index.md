---
title: "डैगर-हाशिमोटो"
description: "डैगर-हाशिमोटो एल्गोरिथम पर एक विस्तृत नज़र।"
lang: hi
---

डैगर-हाशिमोटो एथेरियम के माईनिंग एल्गोरिथम के लिए मूल अनुसंधान कार्यान्वयन और विनिर्देश था। डैगर-हाशिमोतो को [एथाश](#ethash) द्वारा प्रतिस्थापित किया गया था। 15 सितंबर 2022 को [द मर्ज](/roadmap/merge/) पर माइनिंग को पूरी तरह से बंद कर दिया गया था। तब से, एथेरियम को इसके बजाय [प्रूफ-ऑफ-स्टेक](/developers/docs/consensus-mechanisms/pos) तंत्र का उपयोग करके सुरक्षित किया गया है। यह पृष्ठ ऐतिहासिक रुचि के लिए है - यहां दी गई जानकारी अब मर्ज के बाद के एथेरियम के लिए प्रासंगिक नहीं है।

## पूर्वापेक्षाएं {#prerequisites}

इस पृष्ठ को बेहतर ढंग से समझने के लिए, हम अनुशंसा करते हैं कि आप पहले [प्रूफ-ऑफ-वर्क सहमति](/developers/docs/consensus-mechanisms/pow), [माइनिंग](/developers/docs/consensus-mechanisms/pow/mining), और [माइनिंग एल्गोरिदम](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms) के बारे में पढ़ें।

## डैगर-हाशिमोटो {#dagger-hashimoto}

डैगर-हाशिमोटो का लक्ष्य दो लक्ष्यों को पूरा करना है:

1. **ASIC-प्रतिरोध**: एल्गोरिथम के लिए विशेष हार्डवेयर बनाने से होने वाला लाभ जितना संभव हो उतना कम होना चाहिए।
2. **लाइट क्लाइंट सत्यापनीयता**: एक ब्लॉक को एक लाइट क्लाइंट द्वारा कुशलता से सत्यापित किया जाना चाहिए।

एक अतिरिक्त संशोधन के साथ, हम यह भी निर्दिष्ट करते हैं कि वांछित होने पर तीसरे लक्ष्य को कैसे पूरा किया जाए, लेकिन अतिरिक्त जटिलता की कीमत पर:

**पूरी चेन का भंडारण**: माइनिंग के लिए पूरी ब्लॉकचेन स्थिति के भंडारण की आवश्यकता होनी चाहिए (एथेरियम स्टेट ट्राई की अनियमित संरचना के कारण, हम अनुमान लगाते हैं कि कुछ छंटाई संभव होगी, विशेष रूप से कुछ अक्सर उपयोग किए जाने वाले अनुबंधों की, लेकिन हम इसे कम से कम करना चाहते हैं)।

## DAG जनरेशन {#dag-generation}

एल्गोरिथम के लिए कोड नीचे Python में परिभाषित किया जाएगा। सबसे पहले, हम निर्दिष्ट परिशुद्धता के अनसाइंड इंटीजर्स (unsigned ints) को स्ट्रिंग्स में बदलने के लिए `encode_int` प्रस्तुत करते हैं। इसका रिवर्स भी दिया गया है:

```python
NUM_BITS = 512

def encode_int(x):
    "बिग-एंडियन स्कीम का उपयोग करके एक पूर्णांक x को 64 वर्णों की स्ट्रिंग के रूप में एनकोड करें"
    o = ''
    for _ in range(NUM_BITS / 8):
        o = chr(x % 256) + o
        x //= 256
    return o

def decode_int(s):
    "बिग-एंडियन स्कीम का उपयोग करके एक स्ट्रिंग से एक पूर्णांक x को अनएनकोड करें"
    x = 0
    for c in s:
        x *= 256
        x += ord(c)
    return x
```

हम आगे यह मानते हैं कि `sha3` एक फ़ंक्शन है जो एक पूर्णांक लेता है और एक पूर्णांक आउटपुट करता है, और `dbl_sha3` एक डबल-sha3 फ़ंक्शन है; यदि इस संदर्भ कोड को एक कार्यान्वयन में परिवर्तित कर रहे हैं, तो इसका उपयोग करें:

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

एल्गोरिथम के लिए उपयोग किए जाने वाले पैरामीटर हैं:

```python
SAFE_PRIME_512 = 2**512 - 38117     # 2**512 से कम सबसे बड़ा सेफ प्राइम

params = {
      "n": 4000055296 * 8 // NUM_BITS,  # डेटासेट का आकार (4 गीगाबाइट); 65536 का गुणज होना चाहिए
      "n_inc": 65536,                   # प्रति अवधि n के मान में वृद्धि; 65536 का गुणज होना चाहिए
                                        # epochtime=20000 के साथ प्रति वर्ष 882 MB की वृद्धि देता है
      "cache_size": 2500,               # लाइट क्लाइंट के कैश का आकार (लाइट क्लाइंट द्वारा चुना जा सकता है;
                                        # एल्गो स्पेक का हिस्सा नहीं)
      "diff": 2**14,                    # कठिनाई (ब्लॉक मूल्यांकन के दौरान समायोजित)
      "epochtime": 100000,              # ब्लॉक में एक युग की लंबाई (डेटासेट कितनी बार अपडेट किया जाता है)
      "k": 1,                           # एक नोड के पेरेंट्स की संख्या
      "w": w,                          # मॉड्यूलर एक्सपोनेंशिएशन हैशिंग के लिए उपयोग किया जाता है
      "accesses": 200,                  # हाशिमोटो के दौरान डेटासेट एक्सेस की संख्या
      "P": SAFE_PRIME_512               # हैशिंग और रैंडम नंबर जनरेशन के लिए सेफ प्राइम
}
```

`P` इस मामले में एक ऐसा प्राइम है जिसे इस तरह चुना गया है कि `log₂(P)` 512 से थोड़ा कम हो, जो उन 512 बिट्स के अनुरूप है जिनका उपयोग हम अपनी संख्याओं को दर्शाने के लिए कर रहे हैं। ध्यान दें कि DAG के केवल उत्तरार्ध को वास्तव में संग्रहीत करने की आवश्यकता है, इसलिए वास्तविक RAM की आवश्यकता 1 GB से शुरू होती है और प्रति वर्ष 441 MB तक बढ़ती है।

### डैगर ग्राफ़ बिल्डिंग {#dagger-graph-building}

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

मूल रूप से, यह एक ग्राफ को एक एकल नोड, `sha3(seed)` के रूप में शुरू करता है, और वहां से रैंडम पिछले नोड्स के आधार पर क्रमिक रूप से अन्य नोड्स को जोड़ना शुरू कर देता है। जब एक नया नोड बनाया जाता है, तो `i` से कम कुछ सूचकांकों को रैंडम रूप से चुनने के लिए सीड की एक मॉड्यूलर पावर की गणना की जाती है (ऊपर `x % i` का उपयोग करके), और उन सूचकांकों पर नोड्स के मानों का उपयोग `x` के लिए एक नया मान उत्पन्न करने वाली गणना में किया जाता है, जिसे बाद में इंडेक्स `i` पर ग्राफ का मान उत्पन्न करने के लिए एक छोटे प्रूफ-ऑफ-वर्क फ़ंक्शन (XOR पर आधारित) में फीड किया जाता है। इस विशेष डिजाइन के पीछे तर्क DAG की अनुक्रमिक पहुंच को प्रेरित करना है; एक्सेस किए जाने वाले DAG का अगला मान तब तक निर्धारित नहीं किया जा सकता जब तक कि वर्तमान मान ज्ञात न हो। अंत में, मॉड्यूलर घातांक परिणाम को आगे बढ़ाता है।

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

अनिवार्य रूप से, यह केवल उपरोक्त एल्गोरिथम का एक पुनर्लेखन है जो पूरे DAG के लिए मानों की गणना करने के लूप को हटा देता है और पहले के नोड लुकअप को रिकर्सिव कॉल या कैश लुकअप से बदल देता है। ध्यान दें कि `k=1` के लिए कैश अनावश्यक है, हालांकि एक और ऑप्टिमाइज़ेशन वास्तव में DAG के पहले कुछ हज़ार मानों की पूर्व-गणना करता है और उसे गणनाओं के लिए एक स्टैटिक कैश के रूप में रखता है; इसके कोड कार्यान्वयन के लिए परिशिष्ट देखें।

## DAGs का डबल बफ़र {#double-buffer}

एक फुल क्लाइंट में, उपरोक्त सूत्र द्वारा उत्पादित 2 DAGs के एक [_डबल बफ़र_](https://wikipedia.org/wiki/Multiple_buffering) का उपयोग किया जाता है। विचार यह है कि उपरोक्त पैरामीटर्स के अनुसार हर `epochtime` ब्लॉक के बाद DAGs उत्पन्न होते हैं। उत्पादित नवीनतम DAG का उपयोग करने वाले क्लाइंट के बजाय, यह पिछले एक का उपयोग करता है। इसका लाभ यह है कि यह DAG को समय के साथ एक चरण को शामिल करने की आवश्यकता के बिना बदलने की अनुमति देता है जहां माईनर को अचानक सभी डेटा की पुनर्गणना करनी होगी। अन्यथा, नियमित अंतराल पर चेन प्रोसेसिंग में अचानक अस्थायी रूप से गति में कमी और नाटकीय रूप से बढ़ते केंद्रीकरण की संभावना है। इस प्रकार सभी डेटा की पुनर्गणना करने से पहले उन कुछ मिनटों के भीतर 51% हमले का जोखिम होता है।

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
        # कोई बैक बफ़र संभव नहीं है, बस फ्रंट बफ़र बनाएं
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

## माइनिंग और सत्यापन {#mining-and-verifying}

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

## आगे की रीडिंग {#further-reading}

_क्या आप किसी सामुदायिक संसाधन के बारे में जानते हैं जिसने आपकी मदद की? इस पृष्ठ को संपादित करें और इसे जोड़ें!_

## परिशिष्ट {#appendix}

जैसा कि ऊपर उल्लेख किया गया है, DAG पीढ़ी के लिए उपयोग किया जाने वाला RNG संख्या सिद्धांत के कुछ परिणामों पर निर्भर करता है। सबसे पहले, हम यह आश्वासन देते हैं कि लेहमर RNG, जो `picker` वैरिएबल का आधार है, की एक विस्तृत अवधि है। दूसरा, हम दिखाते हैं कि `pow(x,3,P)`, `x` को `1` या `P-1` पर मैप नहीं करेगा, बशर्ते कि शुरू करने के लिए `x ∈ [2,P-2]` हो। अंत में, हम दिखाते हैं कि जब `pow(x,3,P)` को हैशिंग फ़ंक्शन के रूप में माना जाता है तो इसकी कॉलिज़न दर कम होती है।

### लेहमर रैंडम नंबर जेनरेटर {#lehmer-random-number}

हालांकि `produce_dag` फ़ंक्शन को निष्पक्ष रैंडम नंबर बनाने की आवश्यकता नहीं है, एक संभावित खतरा यह है कि `seed**i % P` केवल कुछ ही मान लेता है। यह उन माईनर को एक लाभ प्रदान कर सकता है जो उन लोगों पर पैटर्न को पहचानते हैं जो नहीं करते हैं।

इससे बचने के लिए, संख्या सिद्धांत से परिणाम की अपील की जाती है। एक [_सेफ प्राइम_](https://en.wikipedia.org/wiki/Safe_prime) को एक ऐसे प्राइम `P` के रूप में परिभाषित किया गया है, जिसके लिए `(P-1)/2` भी एक प्राइम है। [गुणक समूह](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `ℤ/nℤ` के किसी सदस्य `x` का _क्रम_ (order) वह न्यूनतम `m` होता है जिसके लिए <pre>xᵐ mod P ≡ 1</pre>
इन परिभाषाओं को देखते हुए, हमें यह मिलता है:

> ऑब्जर्वेशन 1. मान लें कि एक सेफ प्राइम `P` के लिए `x`, गुणक समूह `ℤ/Pℤ` का सदस्य है। यदि `x mod P ≠ 1 mod P` और `x mod P ≠ P-1 mod P` है, तो `x` का क्रम या तो `P-1` या `(P-1)/2` है।

_प्रमाण_। चूंकि `P` एक सेफ प्राइम है, तो [लैग्रेंज के प्रमेय][lagrange] के अनुसार `x` का क्रम या तो `1`, `2`, `(P-1)/2`, या `P-1` है।

`x` का क्रम `1` नहीं हो सकता, क्योंकि फर्मेट के छोटे प्रमेय के अनुसार:

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

अतः `x` को `ℤ/nℤ` की गुणक पहचान होना चाहिए, जो अद्वितीय है। चूंकि हमने यह मान लिया है कि `x ≠ 1`, यह संभव नहीं है।

`x` का क्रम `2` नहीं हो सकता जब तक कि `x = P-1` न हो, क्योंकि यह इस बात का उल्लंघन करेगा कि `P` प्राइम है।

उपरोक्त प्रस्ताव से, हम यह पहचान सकते हैं कि `(picker * init) % P` को दोहराने पर चक्र की लंबाई कम से कम `(P-1)/2` होगी। ऐसा इसलिए है क्योंकि हमने `P` को दो की उच्च घात के लगभग बराबर एक सेफ प्राइम के रूप में चुना है, और `init` अंतराल `[2,2**256+1]` में है। `P` के परिमाण को देखते हुए, हमें मॉड्यूलर एक्सपोनेंशिएशन से कभी भी एक चक्र की उम्मीद नहीं करनी चाहिए।

जब हम DAG में पहला सेल निर्दिष्ट कर रहे होते हैं (जिसे `init` वैरिएबल से लेबल किया गया है), हम `pow(sha3(seed) + 2, 3, P)` की गणना करते हैं। पहली नज़र में, यह इस बात की गारंटी नहीं देता है कि परिणाम न तो `1` है और न ही `P-1`। हालांकि, चूंकि `P-1` एक सेफ प्राइम है, हमारे पास निम्नलिखित अतिरिक्त आश्वासन है, जो अवलोकन 1 का एक उप-प्रमेय है:

> ऑब्जर्वेशन 2. मान लें कि एक सेफ प्राइम `P` के लिए `x` गुणक समूह `ℤ/Pℤ` का एक सदस्य है, और मान लें कि `w` एक प्राकृत संख्या है। यदि `x mod P ≠ 1 mod P` और `x mod P ≠ P-1 mod P` है, साथ ही `w mod P ≠ P-1 mod P` और `w mod P ≠ 0 mod P` है, तो `xʷ mod P ≠ 1 mod P` और `xʷ mod P ≠ P-1 mod P`

### एक हैश फ़ंक्शन के रूप में मॉड्यूलर एक्सपोनेंशिएशन {#modular-exponentiation}

`P` और `w` के कुछ मानों के लिए, फ़ंक्शन `pow(x, w, P)` में कई टकराव हो सकते हैं। उदाहरण के लिए, `pow(x,9,19)` केवल `{1,18}` मान लेता है।

यह देखते हुए कि `P` प्राइम है, मॉड्यूलर एक्सपोनेंशिएशन हैशिंग फ़ंक्शन के लिए एक उपयुक्त `w` निम्नलिखित परिणाम का उपयोग करके चुना जा सकता है:

> ऑब्जर्वेशन 3. मान लें `P` एक प्राइम है; `w` और `P-1` सह-अभाज्य हैं यदि और केवल यदि `ℤ/Pℤ` में सभी `a` और `b` के लिए:<center>`aʷ mod P ≡ bʷ mod P` यदि और केवल यदि `a mod P ≡ b mod P`</center>

इस प्रकार, यह देखते हुए कि `P` प्राइम है और `w`, `P-1` के साथ सह-अभाज्य है, हमें मिलता है कि `|{pow(x, w, P) : x ∈ ℤ}| = P`, जिसका अर्थ है कि हैशिंग फ़ंक्शन की कॉलिज़न दर न्यूनतम संभव है।

उस विशेष मामले में जहां `P` एक सेफ प्राइम है जैसा कि हमने चुना है, तो `P-1` के केवल 1, 2, `(P-1)/2` और `P-1` गुणनखंड होते हैं। चूँकि `P` > 7, हम जानते हैं कि 3, `P-1` के साथ सह-अभाज्य है, इसलिए `w=3` उपरोक्त प्रस्ताव को संतुष्ट करता है।

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
