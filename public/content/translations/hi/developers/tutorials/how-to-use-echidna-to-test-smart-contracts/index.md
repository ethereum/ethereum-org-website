---
title: "स्मार्ट अनुबंधों का परीक्षण करने के लिए एकिड्ना का उपयोग कैसे करें"
description: "स्मार्ट अनुबंधों का स्वचालित रूप से परीक्षण करने के लिए एकिड्ना का उपयोग कैसे करें"
author: "ट्रेलऑफ़बिट्स"
lang: hi
tags: ["Solidity", "स्मार्ट अनुबंध", "सुरक्षा", "परीक्षण", "फ़ज़िंग"]
skill: advanced
breadcrumb: "एकिड्ना"
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## इंस्टॉलेशन {#installation}

एकिड्ना को Docker, Homebrew के माध्यम से या पूर्व-संकलित बाइनरी का उपयोग करके इंस्टॉल किया जा सकता है। इस ट्यूटोरियल के उदाहरणों का परीक्षण एकिड्ना 2.3.3 और solc 0.8.37 के साथ किया गया था।

### Docker के माध्यम से एकिड्ना {#echidna-through-docker}

```sh
docker pull ghcr.io/crytic/echidna/echidna:latest
docker run --rm -it -v "$PWD":/src ghcr.io/crytic/echidna/echidna:latest
```

_अंतिम कमांड एकिड्ना इमेज को एक Docker में चलाता है जिसकी आपकी वर्तमान डायरेक्टरी तक पहुंच होती है। आप अपने होस्ट से फ़ाइलें बदल सकते हैं, और Docker से फ़ाइलों पर टूल चला सकते हैं। यह इमेज [स्लिथर](https://github.com/crytic/slither), [crytic-compile](https://github.com/crytic/crytic-compile) और [solc-select](https://github.com/crytic/solc-select) के साथ भी आती है।_

Docker के अंदर, चलाएं:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
cd /src
```

### बाइनरी {#binary}

अपने प्लेटफ़ॉर्म के लिए नवीनतम रिलीज़ [https://github.com/crytic/echidna/releases/latest](https://github.com/crytic/echidna/releases/latest) से डाउनलोड करें। macOS या Linux पर आप `brew install echidna` भी चला सकते हैं, जो इसके साथ स्लिथर और crytic-compile इंस्टॉल करता है।

रिलीज़ बाइनरी का उपयोग करते समय, [स्लिथर](https://github.com/crytic/slither) और [solc-select](https://github.com/crytic/solc-select) को स्वयं इंस्टॉल करें (उदाहरण के लिए Python वर्चुअल वातावरण में `pip3 install slither-analyzer solc-select`) और एक कंपाइलर संस्करण चुनें:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
```

एकिड्ना स्लिथर के बिना चलता है, लेकिन स्लिथर `require` स्टेटमेंट में उपयोग किए गए मैजिक नंबर जैसे स्थिरांक निकालता है, और नीचे दिए गए कई उदाहरण बग को जल्दी खोजने के लिए इस पर निर्भर करते हैं।

## प्रॉपर्टी-आधारित फ़ज़िंग का परिचय {#introduction-to-property-based-fuzzing}

एकिड्ना एक प्रॉपर्टी-आधारित फ़ज़र है, जिसका वर्णन हमने अपने पिछले ब्लॉगपोस्ट ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)) में किया है।

### फ़ज़िंग {#fuzzing}

[फ़ज़िंग](https://wikipedia.org/wiki/Fuzzing) सुरक्षा समुदाय में एक प्रसिद्ध तकनीक है। इसमें प्रोग्राम में बग खोजने के लिए ऐसे इनपुट उत्पन्न करना शामिल है जो कमोबेश यादृच्छिक (रैंडम) होते हैं। पारंपरिक सॉफ़्टवेयर के लिए फ़ज़र (जैसे [AFL](http://lcamtuf.coredump.cx/afl/) या [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) बग खोजने के लिए कुशल उपकरण माने जाते हैं।

इनपुट के विशुद्ध रूप से यादृच्छिक निर्माण से परे, अच्छे इनपुट उत्पन्न करने के लिए कई तकनीकें और रणनीतियाँ हैं, जिनमें शामिल हैं:

- प्रत्येक निष्पादन से फ़ीडबैक प्राप्त करना और उसका उपयोग करके निर्माण का मार्गदर्शन करना। उदाहरण के लिए, यदि कोई नया उत्पन्न इनपुट एक नए पथ की खोज की ओर ले जाता है, तो उसके करीब नए इनपुट उत्पन्न करना समझदारी हो सकती है।
- संरचनात्मक बाधा का सम्मान करते हुए इनपुट उत्पन्न करना। उदाहरण के लिए, यदि आपके इनपुट में चेकसम के साथ एक हेडर है, तो फ़ज़र को चेकसम को मान्य करने वाला इनपुट उत्पन्न करने देना समझदारी होगी।
- नए इनपुट उत्पन्न करने के लिए ज्ञात इनपुट का उपयोग करना: यदि आपके पास मान्य इनपुट के एक बड़े डेटासेट तक पहुंच है, तो आपका फ़ज़र शून्य से शुरू करने के बजाय उनसे नए इनपुट उत्पन्न कर सकता है। इन्हें आमतौर पर _सीड्स (seeds)_ कहा जाता है।

### प्रॉपर्टी-आधारित फ़ज़िंग {#property-based-fuzzing}

एकिड्ना फ़ज़र के एक विशिष्ट परिवार से संबंधित है: प्रॉपर्टी-आधारित फ़ज़िंग जो [QuickCheck](https://wikipedia.org/wiki/QuickCheck) से काफी प्रेरित है। क्लासिक फ़ज़र के विपरीत जो क्रैश खोजने का प्रयास करेगा, एकिड्ना उपयोगकर्ता-परिभाषित इनवेरिएंट्स (invariants) को तोड़ने का प्रयास करेगा।

स्मार्ट अनुबंधों में, इनवेरिएंट्स Solidity फ़ंक्शन होते हैं, जो किसी भी गलत या अमान्य स्थिति का प्रतिनिधित्व कर सकते हैं जिस तक अनुबंध पहुंच सकता है, जिनमें शामिल हैं:

- गलत एक्सेस कंट्रोल: हमलावर अनुबंध का मालिक बन गया।
- गलत स्थिति मशीन: अनुबंध के रुके होने पर भी टोकन स्थानांतरित किए जा सकते हैं।
- गलत अंकगणित: उपयोगकर्ता अपने बैलेंस को अंडरफ़्लो कर सकता है और असीमित मुफ़्त टोकन प्राप्त कर सकता है।

### एकिड्ना के साथ एक प्रॉपर्टी का परीक्षण करना {#testing-a-property-with-echidna}

हम देखेंगे कि एकिड्ना के साथ स्मार्ट अनुबंध का परीक्षण कैसे किया जाए। लक्ष्य निम्नलिखित स्मार्ट अनुबंध [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) है:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Token {
    mapping(address => uint256) public balances;

    function airdrop() public {
        balances[msg.sender] = 1000;
    }

    function consume() public {
        require(balances[msg.sender] > 0);
        balances[msg.sender] -= 1;
    }

    function backdoor() public {
        balances[msg.sender] += 1;
    }
}
```

हम यह मान लेंगे कि इस टोकन में निम्नलिखित गुण (प्रॉपर्टीज़) होने चाहिए:

- किसी के पास भी अधिकतम 1000 टोकन हो सकते हैं
- टोकन को स्थानांतरित नहीं किया जा सकता (यह ERC-20 टोकन नहीं है)

### एक प्रॉपर्टी लिखें {#write-a-property}

एकिड्ना प्रॉपर्टीज़ Solidity फ़ंक्शन हैं। एक प्रॉपर्टी में यह होना चाहिए:

- कोई तर्क (argument) न हो
- यदि यह सफल होता है तो `true` लौटाएं
- इसका नाम `echidna` से शुरू होना चाहिए

एकिड्ना करेगा:

- प्रॉपर्टी का परीक्षण करने के लिए स्वचालित रूप से मनमाने लेन-देन उत्पन्न करेगा।
- किसी भी ऐसे लेन-देन की रिपोर्ट करेगा जिसके कारण प्रॉपर्टी `false` लौटाती है या कोई त्रुटि उत्पन्न करती है।
- प्रॉपर्टी को कॉल करते समय साइड-इफ़ेक्ट को छोड़ देगा (यानी, यदि प्रॉपर्टी किसी स्थिति चर को बदलती है, तो परीक्षण के बाद इसे छोड़ दिया जाता है)

निम्नलिखित प्रॉपर्टी जांचती है कि कॉलर के पास 1000 से अधिक टोकन नहीं हैं:

```solidity
function echidna_balance_under_1000() public view returns (bool) {
    return balances[msg.sender] <= 1000;
}
```

अपने अनुबंध को अपनी प्रॉपर्टीज़ से अलग करने के लिए इनहेरिटेंस का उपयोग करें:

```solidity
contract TestToken is Token {
    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

[`testtoken.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/testtoken.sol) प्रॉपर्टी को लागू करता है और टोकन से इनहेरिट करता है।

### एक अनुबंध आरंभ करें {#initiate-a-contract}

एकिड्ना को बिना तर्क वाले [कंस्ट्रक्टर](/developers/docs/smart-contracts/anatomy/#constructor-functions) की आवश्यकता होती है। यदि आपके अनुबंध को एक विशिष्ट आरंभीकरण (initialization) की आवश्यकता है, तो आपको इसे कंस्ट्रक्टर में करना होगा।

एकिड्ना में कुछ विशिष्ट पते हैं:

- `0x30000` जो कंस्ट्रक्टर को कॉल करता है।
- `0x10000`, `0x20000`, और `0x30000` जो यादृच्छिक रूप से अन्य फ़ंक्शंस को कॉल करते हैं।
- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72` जहां परीक्षण के तहत अनुबंध तैनात किया गया है।

हमें अपने वर्तमान उदाहरण में किसी विशेष आरंभीकरण की आवश्यकता नहीं है, परिणामस्वरूप हमारा कंस्ट्रक्टर खाली है।

### एकिड्ना चलाएं {#run-echidna}

एकिड्ना को इसके साथ लॉन्च किया जाता है:

```sh
echidna contract.sol
```

यदि contract.sol में कई अनुबंध हैं, तो आप लक्ष्य निर्दिष्ट कर सकते हैं:

```sh
echidna contract.sol --contract MyContract
```

टर्मिनल में चलाए जाने पर, एकिड्ना एक इंटरैक्टिव UI दिखाता है। नीचे दिए गए उदाहरणों की तरह सादा टेक्स्ट आउटपुट प्राप्त करने के लिए `--format text` जोड़ें।

### सारांश: एक प्रॉपर्टी का परीक्षण करना {#summary-testing-a-property}

निम्नलिखित हमारे उदाहरण पर एकिड्ना के रन का सारांश देता है:

```solidity
contract TestToken is Token {
    constructor() {}

    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

```sh
echidna testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence:
    TestToken.airdrop()
    TestToken.backdoor()

...
```

एकिड्ना ने पाया कि यदि `backdoor` को कॉल किया जाता है तो प्रॉपर्टी का उल्लंघन होता है।

## फ़ज़िंग अभियान के दौरान कॉल करने के लिए फ़ंक्शंस को फ़िल्टर करना {#filtering-functions-to-call-during-a-fuzzing-campaign}

हम देखेंगे कि फ़ज़ किए जाने वाले फ़ंक्शंस को कैसे फ़िल्टर किया जाए।
लक्ष्य निम्नलिखित स्मार्ट अनुबंध है:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool state1 = false;
    bool state2 = false;
    bool state3 = false;
    bool state4 = false;

    function f(uint256 x) public {
        require(x == 12);
        state1 = true;
    }

    function g(uint256 x) public {
        require(state1);
        require(x == 8);
        state2 = true;
    }

    function h(uint256 x) public {
        require(state2);
        require(x == 42);
        state3 = true;
    }

    function i() public {
        require(state3);
        state4 = true;
    }

    function reset1() public {
        state1 = false;
        state2 = false;
        state3 = false;
        return;
    }

    function reset2() public {
        state1 = false;
        state2 = false;
        state3 = false;
        return;
    }

    function echidna_state4() public view returns (bool) {
        return (!state4);
    }
}
```

यह छोटा उदाहरण एकिड्ना को स्थिति चर को बदलने के लिए लेन-देन का एक निश्चित क्रम खोजने के लिए मजबूर करता है।
यह एक फ़ज़र के लिए कठिन है।
हम इसे सत्यापित करने के लिए एकिड्ना चला सकते हैं:

```sh
echidna multi.sol
...
echidna_state4: passing
...
```

### फ़ंक्शंस को फ़िल्टर करना {#filtering-functions}

एकिड्ना को इस अनुबंध का परीक्षण करने के लिए सही क्रम खोजने में परेशानी होती है क्योंकि दो रीसेट फ़ंक्शन (`reset1` और `reset2`) सभी स्थिति चरों को `false` पर सेट कर देंगे।
हालाँकि, हम रीसेट फ़ंक्शन को ब्लैकलिस्ट करने या केवल `f`, `g`,
`h` और `i` फ़ंक्शंस को व्हाइटलिस्ट करने के लिए एक विशेष एकिड्ना सुविधा का उपयोग कर सकते हैं।

फ़ंक्शंस को ब्लैकलिस्ट करने के लिए, हम इस कॉन्फ़िगरेशन फ़ाइल का उपयोग कर सकते हैं:

```yaml
filterBlacklist: true
filterFunctions: ["C.reset1()", "C.reset2()"]
```

फ़ंक्शंस को फ़िल्टर करने का एक अन्य दृष्टिकोण व्हाइटलिस्ट किए गए फ़ंक्शंस को सूचीबद्ध करना है। ऐसा करने के लिए, हम इस कॉन्फ़िगरेशन फ़ाइल का उपयोग कर सकते हैं:

```yaml
filterBlacklist: false
filterFunctions: ["C.f(uint256)", "C.g(uint256)", "C.h(uint256)", "C.i()"]
```

- `filterBlacklist` डिफ़ॉल्ट रूप से `true` है।
- फ़िल्टरिंग पूर्ण फ़ंक्शन नाम पर की जाती है: अनुबंध का नाम, एक `.`, और ABI हस्ताक्षर (उदाहरण के लिए `C.f(uint256)`)। यदि आपके पास `f()` और `f(uint256)` हैं, तो आप ठीक से चुन सकते हैं कि किसे फ़िल्टर करना है। `"reset1"` जैसा केवल नाम किसी से मेल नहीं खाता है।

### एकिड्ना चलाएं {#run-echidna-1}

कॉन्फ़िगरेशन फ़ाइल `blacklist.yaml` के साथ एकिड्ना चलाने के लिए:

```sh
echidna multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    C.f(12)
    C.g(8)
    C.h(42)
    C.i()
```

एकिड्ना लगभग तुरंत ही प्रॉपर्टी को गलत साबित करने के लिए लेन-देन का क्रम खोज लेगा।

### सारांश: फ़ंक्शंस को फ़िल्टर करना {#summary-filtering-functions}

एकिड्ना फ़ज़िंग अभियान के दौरान कॉल करने के लिए फ़ंक्शंस को ब्लैकलिस्ट या व्हाइटलिस्ट कर सकता है, इसका उपयोग करके:

```yaml
filterBlacklist: true
filterFunctions: ["C.f1()", "C.f2()", "C.f3()"]
```

```sh
echidna contract.sol --config config.yaml
...
```

एकिड्ना `filterBlacklist` बूलियन के मान के अनुसार, या तो `C.f1()`, `C.f2()` और `C.f3()` को ब्लैकलिस्ट करके या केवल इन्हें कॉल करके फ़ज़िंग अभियान शुरू करता है।

## एकिड्ना के साथ Solidity के दावे (assert) का परीक्षण कैसे करें {#how-to-test-soliditys-assert-with-echidna}

इस छोटे ट्यूटोरियल में, हम यह दिखाने जा रहे हैं कि अनुबंधों में दावा (assertion) जाँच का परीक्षण करने के लिए एकिड्ना का उपयोग कैसे करें। मान लीजिए कि हमारे पास इस तरह का एक अनुबंध है:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        // tmp <= counter
        return (counter - tmp);
    }
}
```

Solidity 0.8 के बाद से, अंकगणितीय ओवरफ़्लो डिफ़ॉल्ट रूप से रिवर्ट हो जाते हैं। `unchecked` ब्लॉक रैपिंग व्यवहार को पुनर्स्थापित करता है ताकि `counter` ओवरफ़्लो हो सके, जो वह बग है जिसे हम चाहते हैं कि एकिड्ना खोजे।

### एक दावा (assertion) लिखें {#write-an-assertion}

हम यह सुनिश्चित करना चाहते हैं कि `tmp` अपना अंतर लौटाने के बाद `counter` से कम या उसके बराबर हो। हम एक एकिड्ना प्रॉपर्टी लिख सकते हैं, लेकिन हमें `tmp` मान को कहीं संग्रहीत करने की आवश्यकता होगी। इसके बजाय, हम इस तरह के दावे का उपयोग कर सकते हैं:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

### एकिड्ना चलाएं {#run-echidna-2}

दावा विफलता परीक्षण को सक्षम करने के लिए, कमांड लाइन पर `--test-mode assertion` पास करें, या एक [एकिड्ना कॉन्फ़िगरेशन फ़ाइल](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml` बनाएं:

```yaml
testMode: assertion
```

जब हम इस अनुबंध को एकिड्ना में चलाते हैं, तो हमें अपेक्षित परिणाम प्राप्त होते हैं:

```sh
echidna assert.sol --config config.yaml
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

जैसा कि आप देख सकते हैं, एकिड्ना `inc` फ़ंक्शन में कुछ दावा विफलता की रिपोर्ट करता है। प्रति फ़ंक्शन एक से अधिक दावे जोड़ना संभव है, लेकिन एकिड्ना यह नहीं बता सकता कि कौन सा दावा विफल रहा।

### दावों का उपयोग कब और कैसे करें {#when-and-how-use-assertions}

दावों का उपयोग स्पष्ट प्रॉपर्टीज़ के विकल्प के रूप में किया जा सकता है, विशेष रूप से यदि जांची जाने वाली शर्तें सीधे किसी ऑपरेशन `f` के सही उपयोग से संबंधित हैं। कुछ कोड के बाद दावे जोड़ने से यह लागू होगा कि इसके निष्पादित होने के तुरंत बाद जाँच होगी:

```solidity
function f(..) public {
    // कुछ जटिल कोड
    ...
    assert (condition);
    ...
}

```

इसके विपरीत, एक स्पष्ट एकिड्ना प्रॉपर्टी का उपयोग करने से लेन-देन यादृच्छिक रूप से निष्पादित होंगे और यह लागू करने का कोई आसान तरीका नहीं है कि इसकी जाँच कब की जाएगी। यह वर्कअराउंड करना अभी भी संभव है:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

हालाँकि, कुछ समस्याएँ हैं:

- यह विफल हो जाता है यदि `f` को `internal` या `external` के रूप में घोषित किया गया है।
- यह स्पष्ट नहीं है कि `f` को कॉल करने के लिए किन तर्कों का उपयोग किया जाना चाहिए।
- यदि `f` रिवर्ट होता है, तो प्रॉपर्टी विफल हो जाएगी।

सामान्य तौर पर, हम दावों का उपयोग करने के तरीके पर [जॉन रेगेहर की सिफारिश](https://blog.regehr.org/archives/1091) का पालन करने की सलाह देते हैं:

- दावा जाँच के दौरान किसी भी साइड इफ़ेक्ट को बाध्य न करें। उदाहरण के लिए: `assert(ChangeStateAndReturn() == 1)`
- स्पष्ट कथनों का दावा न करें। उदाहरण के लिए `assert(var >= 0)` जहाँ `var` को `uint` के रूप में घोषित किया गया है।

अंत में, कृपया `assert` के बजाय `require` का **उपयोग न करें**, क्योंकि एकिड्ना इसका पता लगाने में सक्षम नहीं होगा (लेकिन अनुबंध वैसे भी रिवर्ट हो जाएगा)।

### सारांश: दावा जाँच {#summary-assertion-checking}

निम्नलिखित हमारे उदाहरण पर एकिड्ना के रन का सारांश देता है:

```solidity
contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

```sh
echidna assert.sol --test-mode assertion
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

एकिड्ना ने पाया कि `inc` में दावा विफल हो सकता है यदि इस फ़ंक्शन को बड़े तर्कों के साथ कई बार कॉल किया जाता है।

## एकिड्ना कॉर्पस एकत्र करना और संशोधित करना {#collecting-and-modifying-an-echidna-corpus}

हम देखेंगे कि एकिड्ना के साथ लेन-देन का कॉर्पस कैसे एकत्र करें और उसका उपयोग कैसे करें। लक्ष्य निम्नलिखित स्मार्ट अनुबंध [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol) है:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool value_found = false;

    function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
        require(magic_1 == 42);
        require(magic_2 == 129);
        require(magic_3 == magic_4 + 333);
        value_found = true;
        return;
    }

    function echidna_magic_values() public view returns (bool) {
        return !value_found;
    }
}
```

यह छोटा उदाहरण एकिड्ना को स्थिति चर को बदलने के लिए कुछ मान खोजने के लिए मजबूर करता है। यह एक फ़ज़र के लिए कठिन है।
हम इसे सत्यापित करने के लिए एकिड्ना चला सकते हैं:

```sh
echidna magic.sol
...

echidna_magic_values: passing
...
```

हालाँकि, हम अभी भी इस फ़ज़िंग अभियान को चलाते समय कॉर्पस एकत्र करने के लिए एकिड्ना का उपयोग कर सकते हैं।

### एक कॉर्पस एकत्र करना {#collecting-a-corpus}

कॉर्पस संग्रह को सक्षम करने के लिए, एक कॉर्पस डायरेक्टरी बनाएं:

```sh
mkdir corpus-magic
```

और एक [एकिड्ना कॉन्फ़िगरेशन फ़ाइल](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml`:

```yaml
corpusDir: "corpus-magic"
```

अब हम अपना टूल चला सकते हैं और एकत्र किए गए कॉर्पस की जांच कर सकते हैं:

```sh
echidna magic.sol --config config.yaml
```

एकिड्ना अभी भी सही मैजिक मान नहीं खोज सकता है। यह देखने के लिए कि यह कहाँ अटक जाता है, `corpus-magic/covered.*.txt` कवरेज रिपोर्ट देखें:

```text
7 | *   |     function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
  8 | *r  |         require(magic_1 == 42);
  9 | *r  |         require(magic_2 == 129);
 10 | *r  |         require(magic_3 == magic_4 + 333);
 11 |     |         value_found = true;
 12 |     |         return;
```

`r` लेबल का अर्थ है कि एकिड्ना लाइन तक पहुंच गया लेकिन निष्पादन वहां रिवर्ट हो गया, और अंतिम `require` के बाद की लाइनें कभी निष्पादित नहीं होती हैं।

एकिड्ना द्वारा एकत्र किए गए लेन-देन अनुक्रम `corpus-magic/coverage/` में JSON फ़ाइलों के रूप में संग्रहीत किए जाते हैं। उदाहरण के लिए, इनमें से किसी एक फ़ाइल का पहला लेन-देन था:

```json
[
  {
    "call": {
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639806"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "761"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "91238239174727894896282446013839801776340298206661877345279631871841712965531"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639804"
            ],
            "tag": "AbiUInt"
          }
        ]
      ],
      "tag": "SolCall"
    },
    "delay": [
      "0x00000000000000000000000000000000000000000000000000000000000103ef",
      "0x000000000000000000000000000000000000000000000000000000000000d38b"
    ],
    "dst": "0x00a329c0648769A73afAc7F9381E08FB43dBEA72",
    "gas": 12500000,
    "gasprice": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "src": "0x0000000000000000000000000000000000020000",
    "value": "0x0000000000000000000000000000000000000000000000000000000000000000"
  }
]
```

स्पष्ट रूप से, यह इनपुट हमारी प्रॉपर्टी में विफलता को ट्रिगर नहीं करेगा। हालाँकि, अगले चरण में, हम देखेंगे कि इसके लिए इसे कैसे संशोधित किया जाए।

### एक कॉर्पस को सीड करना {#seeding-a-corpus}

एकिड्ना को `magic` फ़ंक्शन से निपटने के लिए कुछ मदद की आवश्यकता है। हम इसके लिए उपयुक्त मापदंडों का उपयोग करने के लिए इनपुट को कॉपी और संशोधित करने जा रहे हैं (फ़ाइल नाम यादृच्छिक हैं, इसलिए अपनी स्वयं की `corpus-magic/coverage/` डायरेक्टरी से एक का उपयोग करें):

```sh
cp corpus-magic/coverage/249425678654647553.txt corpus-magic/coverage/new.txt
```

हम `new.txt` को संशोधित करेंगे ताकि इसमें `magic(42,129,333,0)` को कॉल करने वाला एक ही लेन-देन हो। अब, हम एकिड्ना को फिर से चला सकते हैं:

```sh
echidna magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    C.magic(42,129,333,0)

...
```

इस बार, इसने पाया कि प्रॉपर्टी का तुरंत उल्लंघन हो गया है।

## उच्च गैस खपत वाले लेन-देन खोजना {#finding-transactions-with-high-gas-consumption}

हम देखेंगे कि एकिड्ना के साथ उच्च गैस खपत वाले लेन-देन कैसे खोजें। एकिड्ना के पुराने संस्करणों में इसके लिए `estimateGas` विकल्प था; इसे एकिड्ना 2.3.0 में हटा दिया गया था। इसके बजाय, हम `gasleft()` के साथ गैस मापते हैं और एकिड्ना के [अनुकूलन मोड (optimization mode)](https://secure-contracts.com/program-analysis/echidna/advanced/optimization_mode.html) को इसे अधिकतम करने देते हैं। लक्ष्य निम्नलिखित स्मार्ट अनुबंध है:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    uint256 state;

    function expensive(uint8 times) internal {
        for (uint8 i = 0; i < times; i++) {
            state = state + i;
        }
    }

    function f(uint256 x, uint256 y, uint8 times) public {
        if (x == 42 && y == 123) {
            expensive(times);
        } else {
            state = 0;
        }
    }
}
```

यहाँ `expensive` में बड़ी गैस खपत हो सकती है।

### गैस खपत मापना {#measuring-gas-consumption}

अनुकूलन मोड में, एकिड्ना `echidna_` से शुरू होने वाले फ़ंक्शंस की तलाश करता है जो कोई तर्क नहीं लेते हैं और `int256` लौटाते हैं, और लेन-देन के उस क्रम को खोजने का प्रयास करता है जो लौटाए गए मान को अधिकतम करता है। हम एक परीक्षण अनुबंध जोड़ते हैं जो `f` को कॉल करता है, इसके द्वारा उपयोग की गई गैस को रिकॉर्ड करता है, और अधिकतम को उजागर करता है (दोनों अनुबंधों को `gas.sol` में सहेजें):

```solidity
contract TestGas is C {
    int256 maxGasUsed;

    function measureF(uint256 x, uint256 y, uint8 times) public {
        uint256 start = gasleft();
        f(x, y, times);
        int256 used = int256(start - gasleft());
        if (used > maxGasUsed) {
            maxGasUsed = used;
        }
    }

    function echidna_opt_gas_f() public view returns (int256) {
        return maxGasUsed;
    }
}
```

अनुकूलन मोड को सक्षम करने के लिए, एक कॉन्फ़िगरेशन फ़ाइल `config.yaml` बनाएं। इस उदाहरण में, हम परिणामों को समझने में आसान बनाने के लिए लेन-देन अनुक्रम का आकार भी कम करेंगे:

```yaml
testMode: optimization
seqLen: 2
```

### एकिड्ना चलाएं {#run-echidna-3}

एक बार जब हम कॉन्फ़िगरेशन फ़ाइल बना लेते हैं, तो हम एकिड्ना को इस तरह चला सकते हैं:

```sh
echidna gas.sol --contract TestGas --config config.yaml
...
echidna_opt_gas_f: max value: 127128

  Call sequence:
    TestGas.measureF(42,123,223)

...
```

- दिखाई गई गैस को उस EVM कार्यान्वयन द्वारा मापा जाता है जिस पर एकिड्ना चलता है, [hevm](https://github.com/argotorg/hevm), और इसमें `measureF` से आंतरिक कॉल का ओवरहेड शामिल है।
- अधिकतम अद्वितीय नहीं है: प्रत्येक अभियान यादृच्छिक है, और लंबे अभियान (उदाहरण के लिए `--test-limit 200000`) बड़े मान खोजने की प्रवृत्ति रखते हैं।

### गैस कम करने वाली कॉल्स को फ़िल्टर करना {#filtering-out-gas-reducing-calls}

ऊपर **फ़ज़िंग अभियान के दौरान कॉल करने के लिए फ़ंक्शंस को फ़िल्टर करना** पर ट्यूटोरियल दिखाता है कि अपने परीक्षण से कुछ फ़ंक्शंस को कैसे हटाया जाए।  
सटीक गैस अनुमान प्राप्त करने के लिए यह महत्वपूर्ण हो सकता है।
निम्नलिखित उदाहरण पर विचार करें:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    address[] addrs;

    function push(address a) public {
        addrs.push(a);
    }

    function pop() public {
        addrs.pop();
    }

    function clear() public {
        delete addrs;
    }

    function check() public {
        for (uint256 i = 0; i < addrs.length; i++)
            for (uint256 j = i + 1; j < addrs.length; j++)
                if (addrs[i] == addrs[j]) addrs[j] = address(0x0);
    }

    function echidna_opt_gas_check() public returns (int256) {
        uint256 start = gasleft();
        check();
        return int256(start - gasleft());
    }
}
```

`echidna_opt_gas_check` `check` को कॉल करता है और इसकी गैस लागत लौटाता है। हर एकिड्ना परीक्षण फ़ंक्शन की तरह, इसके स्थिति परिवर्तन बाद में छोड़ दिए जाते हैं।

यदि एकिड्ना सभी फ़ंक्शंस को कॉल कर सकता है, तो यह आसानी से उच्च गैस लागत वाले लेन-देन नहीं खोज पाएगा:

```sh
echidna pushpop.sol --test-mode optimization
...
echidna_opt_gas_check: max value: 265706
...
```

ऐसा इसलिए है क्योंकि लागत `addrs` के आकार पर निर्भर करती है और यादृच्छिक कॉल ऐरे को लगभग खाली छोड़ने की प्रवृत्ति रखते हैं।
हालाँकि, `pop` और `clear` को ब्लैकलिस्ट करने से हमें बहुत बेहतर परिणाम मिलते हैं:

```yaml
testMode: optimization
filterBlacklist: true
filterFunctions: ["C.pop()", "C.clear()"]
```

```sh
echidna pushpop.sol --config config.yaml
...
echidna_opt_gas_check: max value: 2446228
...
```

इस परिणाम के लिए कॉल अनुक्रम को छोटा करने में कई मिनट लगते हैं, क्योंकि हर रीप्ले महंगे `check` फ़ंक्शन को कॉल करता है।

### सारांश: उच्च गैस खपत वाले लेन-देन खोजना {#summary-finding-transactions-with-high-gas-consumption}

एकिड्ना `echidna_` फ़ंक्शन में `gasleft()` के साथ गैस को मापकर उच्च गैस खपत वाले लेन-देन खोज सकता है जो `int256` लौटाता है, और अनुकूलन मोड में चलता है:

```yaml
testMode: optimization
```

```sh
echidna contract.sol --config config.yaml
...
```

फ़ज़िंग अभियान समाप्त होने के बाद, एकिड्ना पाए गए अधिकतम मान और इसे उत्पन्न करने वाले लेन-देन के अनुक्रम की रिपोर्ट करेगा।
