---
title: "स्मार्ट अनुबंधों का परीक्षण करने के लिए एकिड्ना का उपयोग कैसे करें"
description: "स्मार्ट अनुबंधों का स्वचालित रूप से परीक्षण करने के लिए एकिड्ना का उपयोग कैसे करें"
author: "Trailofbits"
lang: hi
tags:
  [
    "Solidity",
    "स्मार्ट अनुबंध",
    "सुरक्षा",
    "परिक्षण",
    "फ़ज़िंग"
  ]
skill: advanced
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## इंस्टॉलेशन {#installation}

एकिड्ना को डॉकर के माध्यम से या प्री-कंपाइल्ड बाइनरी का उपयोग करके इंस्टॉल किया जा सकता है।

### डॉकर के माध्यम से एकिड्ना {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_अंतिम कमांड आपकी वर्तमान डायरेक्टरी तक पहुंच वाले डॉकर में eth-security-toolbox चलाता है। आप अपने होस्ट से फ़ाइलें बदल सकते हैं, और डॉकर से फ़ाइलों पर टूल चला सकते हैं_

डॉकर के अंदर, चलाएँ:

```bash
solc-select 0.5.11
cd /home/training
```

### बाइनरी {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## प्रॉपर्टी-आधारित फ़ज़िंग का परिचय {#introduction-to-property-based-fuzzing}

एकिड्ना एक प्रॉपर्टी-आधारित फ़ज़र है, हमने अपने पिछले ब्लॉगपोस्ट में इसका वर्णन किया है ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/))।

### फ़ज़िंग {#fuzzing}

[फ़ज़िंग](https://wikipedia.org/wiki/Fuzzing) सुरक्षा समुदाय में एक जानी-मानी तकनीक है। इसमें प्रोग्राम में बग खोजने के लिए कमोबेश रैंडम इनपुट जेनरेट करना शामिल है। पारंपरिक सॉफ़्टवेयर के लिए फ़ज़र (जैसे [AFL](http://lcamtuf.coredump.cx/afl/) या [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) बग खोजने के लिए कुशल उपकरण माने जाते हैं।

इनपुट के पूरी तरह से रैंडम जेनरेशन से परे, अच्छे इनपुट जेनरेट करने के लिए कई तकनीकें और रणनीतियाँ हैं, जिनमें शामिल हैं:

- प्रत्येक निष्पादन से फ़ीडबैक प्राप्त करना और इसका उपयोग करके जेनरेशन को गाइड करना। उदाहरण के लिए, यदि एक नया जेनरेट किया गया इनपुट एक नए पाथ की खोज की ओर ले जाता है, तो इसके करीब नए इनपुट जेनरेट करना समझ में आता है।
- एक संरचनात्मक बाधा का सम्मान करते हुए इनपुट जेनरेट करना। उदाहरण के लिए, यदि आपके इनपुट में चेकसम के साथ एक हेडर है, तो फ़ज़र को चेकसम को मान्य करने वाला इनपुट जेनरेट करने देना समझ में आएगा।
- नए इनपुट जेनरेट करने के लिए ज्ञात इनपुट का उपयोग करना: यदि आपके पास मान्य इनपुट के एक बड़े डेटासेट तक पहुँच है, तो आपका फ़ज़र शुरू से जेनरेशन शुरू करने के बजाय उनसे नए इनपुट जेनरेट कर सकता है। इन्हें आमतौर पर _सीड_ कहा जाता है।

### प्रॉपर्टी-आधारित फ़ज़िंग {#property-based-fuzzing}

एकिड्ना फ़ज़र के एक विशिष्ट परिवार से संबंधित है: [QuickCheck](https://wikipedia.org/wiki/QuickCheck) से बहुत प्रेरित प्रॉपर्टी-आधारित फ़ज़िंग। क्लासिक फ़ज़र के विपरीत, जो क्रैश खोजने की कोशिश करेगा, एकिड्ना यूज़र-डिफाइंड इनवेरिएंट को तोड़ने की कोशिश करेगा।

स्मार्ट अनुबंधों में, इनवेरिएंट सॉलिडिटी फ़ंक्शन होते हैं, जो अनुबंध द्वारा पहुँचा जा सकने वाली किसी भी गलत या अमान्य स्टेट का प्रतिनिधित्व कर सकते हैं, जिनमें शामिल हैं:

- गलत एक्सेस कंट्रोल: हमलावर अनुबंध का मालिक बन गया।
- गलत स्टेट मशीन: अनुबंध के पॉज़ होने पर टोकन ट्रांसफर किए जा सकते हैं।
- गलत अंकगणित: यूज़र अपने बैलेंस को अंडरफ्लो कर सकता है और असीमित मुफ्त टोकन प्राप्त कर सकता है।

### एकिड्ना के साथ एक प्रॉपर्टी का परीक्षण करना {#testing-a-property-with-echidna}

हम देखेंगे कि एकिड्ना के साथ एक स्मार्ट अनुबंध का परीक्षण कैसे किया जाता है। लक्ष्य निम्नलिखित स्मार्ट अनुबंध [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) है:

```solidity
contract Token{
  mapping(address => uint) public balances;
  function airdrop() public{
      balances[msg.sender] = 1000;
  }
  function consume() public{
      require(balances[msg.sender]>0);
      balances[msg.sender] -= 1;
  }
  function backdoor() public{
      balances[msg.sender] += 1;
  }
}
```

हम यह मान लेंगे कि इस टोकन में निम्नलिखित गुण होने चाहिए:

- किसी के पास भी अधिकतम 1000 टोकन हो सकते हैं
- टोकन को ट्रांसफर नहीं किया जा सकता (यह एक ERC20 टोकन नहीं है)

### एक प्रॉपर्टी लिखें {#write-a-property}

एकिड्ना प्रॉपर्टीज़ सॉलिडिटी फ़ंक्शन हैं। एक प्रॉपर्टी में होना चाहिए:

- कोई आर्ग्युमेंट न हो
- सफल होने पर `true` लौटाएँ
- इसका नाम `echidna` से शुरू हो

एकिड्ना ये करेगा:

- प्रॉपर्टी का परीक्षण करने के लिए स्वचालित रूप से आर्बिट्ररी ट्रांज़ैक्शन जेनरेट करें।
- किसी भी ऐसे ट्रांज़ैक्शन की रिपोर्ट करें, जिसके कारण कोई प्रॉपर्टी `false` लौटाती है या एरर थ्रो करती है।
- किसी प्रॉपर्टी को कॉल करते समय साइड-इफेक्ट को खारिज कर दें (यानी, यदि प्रॉपर्टी स्टेट वैरिएबल को बदलती है, तो इसे परीक्षण के बाद खारिज कर दिया जाता है)

निम्नलिखित प्रॉपर्टी जाँचती है कि कॉलर के पास 1000 से अधिक टोकन नहीं हैं:

```solidity
function echidna_balance_under_1000() public view returns(bool){
      return balances[msg.sender] <= 1000;
}
```

अपने अनुबंध को अपनी प्रॉपर्टीज़ से अलग करने के लिए इनहेरिटेंस का उपयोग करें:

```solidity
contract TestToken is Token{
      function echidna_balance_under_1000() public view returns(bool){
            return balances[msg.sender] <= 1000;
      }
  }
```

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) प्रॉपर्टी को लागू करता है और टोकन से इनहेरिट करता है।

### एक अनुबंध शुरू करें {#initiate-a-contract}

एकिड्ना को बिना आर्ग्युमेंट वाले [कंस्ट्रक्टर](/developers/docs/smart-contracts/anatomy/#constructor-functions) की आवश्यकता है। यदि आपके अनुबंध को एक विशिष्ट इनिशियलाइज़ेशन की आवश्यकता है, तो आपको इसे कंस्ट्रक्टर में करना होगा।

एकिड्ना में कुछ विशिष्ट पते हैं:

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72` जो कंस्ट्रक्टर को कॉल करता है।
- `0x10000`, `0x20000`, और `0x00a329C0648769a73afAC7F9381e08fb43DBEA70` जो रैंडमली अन्य फ़ंक्शन को कॉल करते हैं।

हमारे वर्तमान उदाहरण में हमें किसी विशेष इनिशियलाइज़ेशन की आवश्यकता नहीं है, परिणामस्वरूप हमारा कंस्ट्रक्टर खाली है।

### एकिड्ना चलाएँ {#run-echidna}

एकिड्ना को इसके साथ लॉन्च किया जाता है:

```bash
echidna-test contract.sol
```

यदि contract.sol में कई अनुबंध हैं, तो आप लक्ष्य निर्दिष्ट कर सकते हैं:

```bash
echidna-test contract.sol --contract MyContract
```

### सारांश: एक प्रॉपर्टी का परीक्षण करना {#summary-testing-a-property}

निम्नलिखित हमारे उदाहरण पर एकिड्ना के रन का सारांश देता है:

```solidity
contract TestToken is Token{
    constructor() public {}
        function echidna_balance_under_1000() public view returns(bool){
          return balances[msg.sender] <= 1000;
        }
  }
```

```bash
echidna-test testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence, shrinking (1205/5000):
    airdrop()
    backdoor()

...
```

एकिड्ना ने पाया कि यदि `backdoor` को कॉल किया जाता है तो प्रॉपर्टी का उल्लंघन होता है।

## फ़ज़िंग अभियान के दौरान कॉल करने के लिए फ़ंक्शन फ़िल्टर करना {#filtering-functions-to-call-during-a-fuzzing-campaign}

हम देखेंगे कि फ़ज़ किए जाने वाले फ़ंक्शन को कैसे फ़िल्टर किया जाए।
लक्ष्य निम्नलिखित स्मार्ट अनुबंध है:

```solidity
contract C {
  bool state1 = false;
  bool state2 = false;
  bool state3 = false;
  bool state4 = false;

  function f(uint x) public {
    require(x == 12);
    state1 = true;
  }

  function g(uint x) public {
    require(state1);
    require(x == 8);
    state2 = true;
  }

  function h(uint x) public {
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

  function echidna_state4() public returns (bool) {
    return (!state4);
  }
}
```

यह छोटा उदाहरण एकिड्ना को एक स्टेट वैरिएबल को बदलने के लिए ट्रांज़ैक्शन के एक निश्चित अनुक्रम को खोजने के लिए मजबूर करता है।
यह एक फ़ज़र के लिए कठिन है (यह [मैंटिकोर](https://github.com/trailofbits/manticore) जैसे सिम्बॉलिक एक्सिक्यूशन टूल का उपयोग करने के लिए अनुशंसित है)।
हम इसे सत्यापित करने के लिए एकिड्ना चला सकते हैं:

```bash
echidna-test multi.sol
...
echidna_state4: passed! 🎉
Seed: -3684648582249875403
```

### फ़ंक्शन फ़िल्टर करना {#filtering-functions}

एकिड्ना को इस अनुबंध का परीक्षण करने के लिए सही अनुक्रम खोजने में परेशानी होती है क्योंकि दो रीसेट फ़ंक्शन (`reset1` और `reset2`) सभी स्टेट वैरिएबल को `false` पर सेट कर देंगे।
हालाँकि, हम रीसेट फ़ंक्शन को ब्लैकलिस्ट करने या केवल `f`, `g`,
`h` और `i` फ़ंक्शन को व्हाइटलिस्ट करने के लिए एक विशेष एकिड्ना सुविधा का उपयोग कर सकते हैं।

फ़ंक्शन को ब्लैकलिस्ट करने के लिए, हम इस कॉन्फ़िगरेशन फ़ाइल का उपयोग कर सकते हैं:

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

फ़ंक्शन को फ़िल्टर करने का एक और तरीका व्हाइटलिस्ट किए गए फ़ंक्शन को सूचीबद्ध करना है। ऐसा करने के लिए, हम इस कॉन्फ़िगरेशन फ़ाइल का उपयोग कर सकते हैं:

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist` डिफ़ॉल्ट रूप से `true` है।
- फ़िल्टरिंग केवल नाम से की जाएगी (पैरामीटर के बिना)। यदि आपके पास `f()` और `f(uint256)` है, तो फ़िल्टर `"f"` दोनों फ़ंक्शन से मेल खाएगा।

### एकिड्ना चलाएँ {#run-echidna-1}

`blacklist.yaml` कॉन्फ़िगरेशन फ़ाइल के साथ एकिड्ना चलाने के लिए:

```bash
echidna-test multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    f(12)
    g(8)
    h(42)
    i()
```

एकिड्ना प्रॉपर्टी को गलत साबित करने के लिए ट्रांज़ैक्शन का क्रम लगभग तुरंत खोज लेगा।

### सारांश: फ़ंक्शन फ़िल्टर करना {#summary-filtering-functions}

एकिड्ना एक फ़ज़िंग अभियान के दौरान कॉल करने के लिए फ़ंक्शन को ब्लैकलिस्ट या व्हाइटलिस्ट कर सकता है:

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

एकिड्ना `filterBlacklist` बूलियन के मान के अनुसार, या तो `f1`, `f2` और `f3` को ब्लैकलिस्ट करके या केवल इन्हें कॉल करके एक फ़ज़िंग अभियान शुरू करता है।

## एकिड्ना के साथ सॉलिडिटी के एसर्ट का परीक्षण कैसे करें {#how-to-test-soliditys-assert-with-echidna}

इस छोटे ट्यूटोरियल में, हम यह दिखाने जा रहे हैं कि अनुबंधों में एसर्शन चेकिंग का परीक्षण करने के लिए एकिड्ना का उपयोग कैसे करें। मान लीजिए कि हमारे पास इस तरह का एक अनुबंध है:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    // tmp <= counter
    return (counter - tmp);
  }
}
```

### एक एसर्शन लिखें {#write-an-assertion}

हम यह सुनिश्चित करना चाहते हैं कि `tmp` अपने अंतर को लौटाने के बाद `counter` से कम या उसके बराबर है। हम एक
एकिड्ना प्रॉपर्टी लिख सकते हैं, लेकिन हमें `tmp` मान को कहीं स्टोर करने की आवश्यकता होगी। इसके बजाय, हम इस तरह के एक एसर्शन का उपयोग कर सकते हैं:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

### एकिड्ना चलाएँ {#run-echidna-2}

एसर्शन विफलता परीक्षण को सक्षम करने के लिए, एक [एकिड्ना कॉन्फ़िगरेशन फ़ाइल](https://github.com/crytic/echidna/wiki/Config) `config.yaml` बनाएँ:

```yaml
checkAsserts: true
```

जब हम एकिड्ना में इस अनुबंध को चलाते हैं, तो हमें अपेक्षित परिणाम मिलते हैं:

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

जैसा कि आप देख सकते हैं, एकिड्ना `inc` फ़ंक्शन में कुछ एसर्शन विफलता की रिपोर्ट करता है। प्रति फ़ंक्शन एक से अधिक एसर्शन जोड़ना संभव है, लेकिन एकिड्ना यह नहीं बता सकता कि कौन सा एसर्शन विफल हुआ।

### एसर्शन का उपयोग कब और कैसे करें {#when-and-how-use-assertions}

एसर्शन का उपयोग स्पष्ट गुणों के विकल्प के रूप में किया जा सकता है, खासकर यदि जाँच की जाने वाली स्थितियाँ सीधे कुछ ऑपरेशन `f` के सही उपयोग से संबंधित हैं। कुछ कोड के बाद एसर्शन जोड़ने से यह लागू होगा कि जाँच उसके निष्पादित होने के तुरंत बाद होगी:

```solidity
function f(..) public {
    // some complex code
    ...
    assert (condition);
    ...
}

```

इसके विपरीत, एक स्पष्ट echidna प्रॉपर्टी का उपयोग करने से ट्रांज़ैक्शन को रैंडम रूप से निष्पादित किया जाएगा और यह लागू करने का कोई आसान तरीका नहीं है कि इसे कब जाँच की जाएगी। यह समाधान करना अभी भी संभव है:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

हालाँकि, कुछ समस्याएँ हैं:

- यह विफल हो जाता है यदि `f` को `internal` या `external` के रूप में घोषित किया जाता है।
- यह स्पष्ट नहीं है कि `f` को कॉल करने के लिए किन आर्ग्युमेंट का उपयोग किया जाना चाहिए।
- यदि `f` रिवर्ट होता है, तो प्रॉपर्टी विफल हो जाएगी।

सामान्य तौर पर, हम एसर्शन का उपयोग कैसे करें पर [जॉन रेगेर की सिफारिश](https://blog.regehr.org/archives/1091) का पालन करने की सलाह देते हैं:

- एसर्शन जाँच के दौरान किसी भी साइड इफेक्ट को मजबूर न करें। उदाहरण के लिए: `assert(ChangeStateAndReturn() == 1)`
- स्पष्ट कथनों का दावा न करें। उदाहरण के लिए `assert(var >= 0)` जहाँ `var` को `uint` के रूप में घोषित किया गया है।

अंत में, कृपया `assert` के बजाय `require` का **उपयोग न करें**, क्योंकि एकिड्ना इसका पता नहीं लगा पाएगा (लेकिन अनुबंध वैसे भी रिवर्ट हो जाएगा)।

### सारांश: एसर्शन चेकिंग {#summary-assertion-checking}

निम्नलिखित हमारे उदाहरण पर एकिड्ना के रन का सारांश देता है:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

एकिड्ना ने पाया कि `inc` में एसर्शन विफल हो सकता है यदि इस फ़ंक्शन को बड़े आर्ग्युमेंट्स के साथ कई बार कॉल किया जाता है।

## एक एकिड्ना कॉर्पस को एकत्र करना और संशोधित करना {#collecting-and-modifying-an-echidna-corpus}

हम देखेंगे कि एकिड्ना के साथ ट्रांज़ैक्शन के कॉर्पस को कैसे एकत्र और उपयोग किया जाए। लक्ष्य निम्नलिखित स्मार्ट अनुबंध [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol) है:

```solidity
contract C {
  bool value_found = false;
  function magic(uint magic_1, uint magic_2, uint magic_3, uint magic_4) public {
    require(magic_1 == 42);
    require(magic_2 == 129);
    require(magic_3 == magic_4+333);
    value_found = true;
    return;
  }

  function echidna_magic_values() public returns (bool) {
    return !value_found;
  }

}
```

यह छोटा उदाहरण एकिड्ना को एक स्टेट वैरिएबल को बदलने के लिए कुछ मान खोजने के लिए मजबूर करता है। यह एक फ़ज़र के लिए कठिन है
(यह [मैंटिकोर](https://github.com/trailofbits/manticore) जैसे सिम्बॉलिक एक्सिक्यूशन टूल का उपयोग करने के लिए अनुशंसित है)।
हम इसे सत्यापित करने के लिए एकिड्ना चला सकते हैं:

```bash
echidna-test magic.sol
...

echidna_magic_values: passed! 🎉

Seed: 2221503356319272685
```

हालांकि, हम अभी भी इस फ़ज़िंग अभियान को चलाते समय कॉर्पस एकत्र करने के लिए एकिड्ना का उपयोग कर सकते हैं।

### एक कॉर्पस एकत्र करना {#collecting-a-corpus}

कॉर्पस संग्रह को सक्षम करने के लिए, एक कॉर्पस डायरेक्टरी बनाएँ:

```bash
mkdir corpus-magic
```

और एक [एकिड्ना कॉन्फ़िगरेशन फ़ाइल](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
coverage: true
corpusDir: "corpus-magic"
```

अब हम अपना टूल चला सकते हैं और एकत्र किए गए कॉर्पस की जाँच कर सकते हैं:

```bash
echidna-test magic.sol --config config.yaml
```

एकिड्ना अभी भी सही मैजिक मान नहीं खोज सकता है, लेकिन हम उसके द्वारा एकत्र किए गए कॉर्पस पर एक नज़र डाल सकते हैं।
उदाहरण के लिए, इनमें से एक फ़ाइल थी:

```json
[
  {
    "_gas'": "0xffffffff",
    "_delay": ["0x13647", "0xccf6"],
    "_src": "00a329c0648769a73afac7f9381e08fb43dbea70",
    "_dst": "00a329c0648769a73afac7f9381e08fb43dbea72",
    "_value": "0x0",
    "_call": {
      "tag": "SolCall",
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "93723985220345906694500679277863898678726808528711107336895287282192244575836"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "334"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "68093943901352437066264791224433559271778087297543421781073458233697135179558"
            ],
            "tag": "AbiUInt"
          },
          {
            "tag": "AbiUInt",
            "contents": [256, "332"]
          }
        ]
      ]
    },
    "_gasprice'": "0xa904461f1"
  }
]
```

स्पष्ट रूप से, यह इनपुट हमारी प्रॉपर्टी में विफलता को ट्रिगर नहीं करेगा। हालांकि, अगले चरण में, हम देखेंगे कि इसे उसके लिए कैसे संशोधित किया जाए।

### एक कॉर्पस को सीड करना {#seeding-a-corpus}

`magic` फ़ंक्शन से निपटने के लिए एकिड्ना को कुछ मदद की आवश्यकता है। हम इसके लिए उपयुक्त
पैरामीटर का उपयोग करने के लिए इनपुट को कॉपी और संशोधित करने जा रहे हैं:

```bash
cp corpus/2712688662897926208.txt corpus/new.txt
```

हम `magic(42,129,333,0)` को कॉल करने के लिए `new.txt` को संशोधित करेंगे। अब, हम एकिड्ना को फिर से चला सकते हैं:

```bash
echidna-test magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    magic(42,129,333,0)


Unique instructions: 142
Unique codehashes: 1
Seed: -7293830866560616537

```

इस बार, इसने पाया कि प्रॉपर्टी का तुरंत उल्लंघन हुआ है।

## उच्च गैस खपत वाले ट्रांज़ैक्शन खोजना {#finding-transactions-with-high-gas-consumption}

हम देखेंगे कि एकिड्ना के साथ उच्च गैस खपत वाले ट्रांज़ैक्शन कैसे खोजें। लक्ष्य निम्नलिखित स्मार्ट अनुबंध है:

```solidity
contract C {
  uint state;

  function expensive(uint8 times) internal {
    for(uint8 i=0; i < times; i++)
      state = state + i;
  }

  function f(uint x, uint y, uint8 times) public {
    if (x == 42 && y == 123)
      expensive(times);
    else
      state = 0;
  }

  function echidna_test() public returns (bool) {
    return true;
  }

}
```

यहाँ `expensive` में एक बड़ी गैस खपत हो सकती है।

वर्तमान में, एकिड्ना को हमेशा परीक्षण करने के लिए एक प्रॉपर्टी की आवश्यकता होती है: यहाँ `echidna_test` हमेशा `true` लौटाता है।
हम इसे सत्यापित करने के लिए एकिड्ना चला सकते हैं:

```
echidna-test gas.sol
...
echidna_test: passed! 🎉

Seed: 2320549945714142710
```

### गैस की खपत को मापना {#measuring-gas-consumption}

एकिड्ना के साथ गैस की खपत को सक्षम करने के लिए, एक कॉन्फ़िगरेशन फ़ाइल `config.yaml` बनाएँ:

```yaml
estimateGas: true
```

इस उदाहरण में, हम परिणामों को समझने में आसान बनाने के लिए ट्रांज़ैक्शन अनुक्रम के आकार को भी कम करेंगे:

```yaml
seqLen: 2
estimateGas: true
```

### एकिड्ना चलाएँ {#run-echidna-3}

एक बार जब हमारे पास कॉन्फ़िगरेशन फ़ाइल बन जाती है, तो हम एकिड्ना को इस तरह चला सकते हैं:

```bash
echidna-test gas.sol --config config.yaml
...
echidna_test: passed! 🎉

f used a maximum of 1333608 gas
  Call sequence:
    f(42,123,249) Gas price: 0x10d5733f0a Time delay: 0x495e5 Block delay: 0x88b2

Unique instructions: 157
Unique codehashes: 1
Seed: -325611019680165325

```

- दिखाई गई गैस [HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-) द्वारा प्रदान किया गया एक अनुमान है।

### गैस कम करने वाली कॉल को फ़िल्टर करना {#filtering-out-gas-reducing-calls}

ऊपर **फ़ज़िंग अभियान के दौरान कॉल करने के लिए फ़ंक्शन फ़िल्टर करना** पर ट्यूटोरियल दिखाता है कि कैसे
अपने परीक्षण से कुछ फ़ंक्शन को हटाया जाए।  
यह एक सटीक गैस अनुमान प्राप्त करने के लिए महत्वपूर्ण हो सकता है।
निम्नलिखित उदाहरण पर विचार करें:

```solidity
contract C {
  address [] addrs;
  function push(address a) public {
    addrs.push(a);
  }
  function pop() public {
    addrs.pop();
  }
  function clear() public{
    addrs.length = 0;
  }
  function check() public{
    for(uint256 i = 0; i < addrs.length; i++)
      for(uint256 j = i+1; j < addrs.length; j++)
        if (addrs[i] == addrs[j])
          addrs[j] = address(0x0);
  }
  function echidna_test() public returns (bool) {
      return true;
  }
}
```

यदि एकिड्ना सभी फ़ंक्शन को कॉल कर सकता है, तो उसे उच्च गैस लागत वाले ट्रांज़ैक्शन आसानी से नहीं मिलेंगे:

```
echidna-test pushpop.sol --config config.yaml
...
pop used a maximum of 10746 gas
...
check used a maximum of 23730 gas
...
clear used a maximum of 35916 gas
...
push used a maximum of 40839 gas
```

ऐसा इसलिए है क्योंकि लागत `addrs` के आकार पर निर्भर करती है और रैंडम कॉल ऐरे को लगभग खाली छोड़ देते हैं।
`pop` और `clear` को ब्लैकलिस्ट करने से, हालांकि, हमें बहुत बेहतर परिणाम मिलते हैं:

```yaml
filterBlacklist: true
filterFunctions: ["pop", "clear"]
```

```
echidna-test pushpop.sol --config config.yaml
...
push used a maximum of 40839 gas
...
check used a maximum of 1484472 gas
```

### सारांश: उच्च गैस खपत वाले ट्रांज़ैक्शन खोजना {#summary-finding-transactions-with-high-gas-consumption}

एकिड्ना `estimateGas` कॉन्फ़िगरेशन विकल्प का उपयोग करके उच्च गैस खपत वाले ट्रांज़ैक्शन खोज सकता है:

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
...
```

एकिड्ना फ़ज़िंग अभियान समाप्त होने के बाद, हर फ़ंक्शन के लिए अधिकतम गैस खपत के साथ एक अनुक्रम की रिपोर्ट करेगा।
