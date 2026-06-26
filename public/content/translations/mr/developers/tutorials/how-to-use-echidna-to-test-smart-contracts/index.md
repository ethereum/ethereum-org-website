---
title: "स्मार्ट कॉन्ट्रॅक्ट्सची चाचणी करण्यासाठी एकिडना कसे वापरावे"
description: "स्मार्ट कॉन्ट्रॅक्ट्सची स्वयंचलितपणे चाचणी करण्यासाठी एकिडना कसे वापरावे"
author: "Trailofbits"
lang: mr
tags: ["Solidity", "स्मार्ट कॉन्ट्रॅक्ट्स", "सुरक्षा", "चाचणी", "फझिंग"]
skill: advanced
breadcrumb: "एकिडना"
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## इन्स्टॉलेशन {#installation}

एकिडना Docker द्वारे किंवा प्री-कंपाइल्ड बायनरी वापरून इन्स्टॉल केले जाऊ शकते.

### Docker द्वारे एकिडना {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_शेवटची कमांड eth-security-toolbox ला अशा Docker मध्ये चालवते ज्याला तुमच्या सध्याच्या डिरेक्टरीचा अ‍ॅक्सेस असतो. तुम्ही तुमच्या होस्टवरून फाइल्स बदलू शकता आणि Docker मधून फाइल्सवर टूल्स चालवू शकता._

Docker च्या आत, हे चालवा:

```bash
solc-select 0.5.11
cd /home/training
```

### बायनरी {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## प्रॉपर्टी-आधारित फझिंगची ओळख {#introduction-to-property-based-fuzzing}

एकिडना हा एक प्रॉपर्टी-आधारित फझर आहे, ज्याचे वर्णन आम्ही आमच्या मागील ब्लॉगपोस्ट्समध्ये केले आहे ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### फझिंग {#fuzzing}

[फझिंग](https://wikipedia.org/wiki/Fuzzing) हे सुरक्षा समुदायातील एक सुप्रसिद्ध तंत्र आहे. प्रोग्राममधील बग्स शोधण्यासाठी कमी-अधिक प्रमाणात यादृच्छिक (random) इनपुट्स तयार करणे यात समाविष्ट असते. पारंपारिक सॉफ्टवेअरसाठीचे फझर्स (जसे की [AFL](http://lcamtuf.coredump.cx/afl/) किंवा [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) बग्स शोधण्यासाठी कार्यक्षम टूल्स म्हणून ओळखले जातात.

केवळ यादृच्छिक इनपुट्स तयार करण्यापलीकडे, चांगले इनपुट्स तयार करण्यासाठी अनेक तंत्रे आणि धोरणे आहेत, ज्यामध्ये खालील गोष्टींचा समावेश आहे:

- प्रत्येक अंमलबजावणीतून फीडबॅक मिळवणे आणि त्याचा वापर करून निर्मितीला मार्गदर्शन करणे. उदाहरणार्थ, जर नव्याने तयार केलेल्या इनपुटमुळे नवीन मार्गाचा शोध लागला, तर त्याच्या जवळचे नवीन इनपुट्स तयार करणे अर्थपूर्ण ठरू शकते.
- संरचनात्मक मर्यादांचे पालन करून इनपुट तयार करणे. उदाहरणार्थ, जर तुमच्या इनपुटमध्ये चेकसमसह हेडर असेल, तर फझरला चेकसम प्रमाणित करणारे इनपुट तयार करू देणे अर्थपूर्ण ठरेल.
- नवीन इनपुट्स तयार करण्यासाठी ज्ञात इनपुट्स वापरणे: जर तुमच्याकडे वैध इनपुटच्या मोठ्या डेटासेटचा अ‍ॅक्सेस असेल, तर तुमचा फझर शून्यापासून सुरुवात करण्याऐवजी त्यातून नवीन इनपुट्स तयार करू शकतो. यांना सहसा _सीड्स (seeds)_ म्हटले जाते.

### प्रॉपर्टी-आधारित फझिंग {#property-based-fuzzing}

एकिडना फझरच्या एका विशिष्ट कुटुंबातील आहे: प्रॉपर्टी-आधारित फझिंग जे [QuickCheck](https://wikipedia.org/wiki/QuickCheck) द्वारे मोठ्या प्रमाणावर प्रेरित आहे. क्रॅश शोधण्याचा प्रयत्न करणाऱ्या क्लासिक फझरच्या विपरीत, एकिडना वापरकर्त्याने परिभाषित केलेले इनव्हेरियंट्स (invariants) खंडित करण्याचा प्रयत्न करेल.

स्मार्ट कॉन्ट्रॅक्ट्समध्ये, इनव्हेरियंट्स हे Solidity फंक्शन्स असतात, जे कॉन्ट्रॅक्ट पोहोचू शकणाऱ्या कोणत्याही चुकीच्या किंवा अवैध स्थितीचे प्रतिनिधित्व करू शकतात, ज्यामध्ये खालील गोष्टींचा समावेश आहे:

- चुकीचे अ‍ॅक्सेस नियंत्रण: हल्लेखोर कॉन्ट्रॅक्टचा मालक बनला.
- चुकीची स्थिती मशीन: कॉन्ट्रॅक्ट थांबवलेले असताना टोकन ट्रान्सफर केले जाऊ शकतात.
- चुकीचे अंकगणित: वापरकर्ता त्याच्या बॅलन्सला अंडरफ्लो करू शकतो आणि अमर्यादित मोफत टोकन मिळवू शकतो.

### एकिडनासह प्रॉपर्टीची चाचणी करणे {#testing-a-property-with-echidna}

एकिडनासह स्मार्ट कॉन्ट्रॅक्टची चाचणी कशी करायची ते आपण पाहू. खालील स्मार्ट कॉन्ट्रॅक्ट हे लक्ष्य आहे [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

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

आम्ही असे गृहीत धरू की या टोकनमध्ये खालील प्रॉपर्टीज असणे आवश्यक आहे:

- कोणाकडेही जास्तीत जास्त 1000 टोकन असू शकतात
- टोकन ट्रान्सफर केले जाऊ शकत नाही (हे ERC-20 टोकन नाही)

### प्रॉपर्टी लिहा {#write-a-property}

एकिडना प्रॉपर्टीज हे Solidity फंक्शन्स आहेत. प्रॉपर्टीमध्ये हे असणे आवश्यक आहे:

- कोणतेही आर्ग्युमेंट नसावे
- जर ते यशस्वी झाले तर `true` रिटर्न करावे
- त्याचे नाव `echidna` ने सुरू व्हावे

एकिडना हे करेल:

- प्रॉपर्टीची चाचणी करण्यासाठी स्वयंचलितपणे अनियंत्रित व्यवहार तयार करेल.
- प्रॉपर्टीला `false` रिटर्न करण्यास किंवा एरर थ्रो करण्यास कारणीभूत ठरणाऱ्या कोणत्याही व्यवहारांची तक्रार करेल.
- प्रॉपर्टी कॉल करताना साइड-इफेक्ट काढून टाकेल (म्हणजेच, जर प्रॉपर्टीने स्थिती व्हेरिएबल बदलले, तर ते चाचणीनंतर काढून टाकले जाते)

खालील प्रॉपर्टी तपासते की कॉलरकडे 1000 पेक्षा जास्त टोकन नाहीत:

```solidity
function echidna_balance_under_1000() public view returns(bool){
      return balances[msg.sender] <= 1000;
}
```

तुमचे कॉन्ट्रॅक्ट तुमच्या प्रॉपर्टीजपासून वेगळे करण्यासाठी इनहेरिटन्स वापरा:

```solidity
contract TestToken is Token{
      function echidna_balance_under_1000() public view returns(bool){
            return balances[msg.sender] <= 1000;
      }
  }
```

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) प्रॉपर्टी लागू करते आणि टोकनमधून इनहेरिट करते.

### कॉन्ट्रॅक्ट सुरू करा {#initiate-a-contract}

एकिडनाला आर्ग्युमेंट नसलेला [कन्स्ट्रक्टर](/developers/docs/smart-contracts/anatomy/#constructor-functions) आवश्यक आहे. जर तुमच्या कॉन्ट्रॅक्टला विशिष्ट इनिशिएलायझेशनची आवश्यकता असेल, तर तुम्हाला ते कन्स्ट्रक्टरमध्ये करावे लागेल.

एकिडनामध्ये काही विशिष्ट पत्ते आहेत:

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72` जे कन्स्ट्रक्टरला कॉल करते.
- `0x10000`, `0x20000`, आणि `0x00a329C0648769a73afAC7F9381e08fb43DBEA70` जे यादृच्छिकपणे इतर फंक्शन्सना कॉल करतात.

आपल्या सध्याच्या उदाहरणात आपल्याला कोणत्याही विशिष्ट इनिशिएलायझेशनची आवश्यकता नाही, परिणामी आपला कन्स्ट्रक्टर रिकामा आहे.

### एकिडना चालवा {#run-echidna}

एकिडना यासह लाँच केले जाते:

```bash
echidna-test contract.sol
```

जर contract.sol मध्ये एकाधिक कॉन्ट्रॅक्ट्स असतील, तर तुम्ही लक्ष्य निर्दिष्ट करू शकता:

```bash
echidna-test contract.sol --contract MyContract
```

### सारांश: प्रॉपर्टीची चाचणी करणे {#summary-testing-a-property}

खालीलप्रमाणे आपल्या उदाहरणावरील एकिडनाच्या रनचा सारांश आहे:

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

एकिडनाला आढळले की जर `backdoor` कॉल केले तर प्रॉपर्टीचे उल्लंघन होते.

## फझिंग मोहिमेदरम्यान कॉल करण्यासाठी फंक्शन्स फिल्टर करणे {#filtering-functions-to-call-during-a-fuzzing-campaign}

फझ करायच्या फंक्शन्सना कसे फिल्टर करायचे ते आपण पाहू.
खालील स्मार्ट कॉन्ट्रॅक्ट हे लक्ष्य आहे:

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

हे छोटे उदाहरण एकिडनाला स्थिती व्हेरिएबल बदलण्यासाठी व्यवहारांचा एक विशिष्ट क्रम शोधण्यास भाग पाडते.
हे फझरसाठी कठीण आहे ([मॅन्टिकोर](https://github.com/trailofbits/manticore) सारखे सिम्बॉलिक एक्झिक्यूशन टूल वापरण्याची शिफारस केली जाते).
याची पडताळणी करण्यासाठी आपण एकिडना चालवू शकतो:

```bash
echidna-test multi.sol
...
echidna_state4: passed! 🎉
Seed: -3684648582249875403
```

### फंक्शन्स फिल्टर करणे {#filtering-functions}

एकिडनाला या कॉन्ट्रॅक्टची चाचणी करण्यासाठी योग्य क्रम शोधण्यात अडचण येते कारण दोन रीसेट फंक्शन्स (`reset1` आणि `reset2`) सर्व स्थिती व्हेरिएबल्स `false` वर सेट करतील.
तथापि, आपण रीसेट फंक्शनला ब्लॅकलिस्ट करण्यासाठी किंवा फक्त `f`, `g`,
`h` आणि `i` फंक्शन्सना व्हाईटलिस्ट करण्यासाठी एक विशेष एकिडना वैशिष्ट्य वापरू शकतो.

फंक्शन्स ब्लॅकलिस्ट करण्यासाठी, आपण ही कॉन्फिगरेशन फाइल वापरू शकतो:

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

फंक्शन्स फिल्टर करण्याचा दुसरा दृष्टीकोन म्हणजे व्हाईटलिस्ट केलेल्या फंक्शन्सची यादी करणे. ते करण्यासाठी, आपण ही कॉन्फिगरेशन फाइल वापरू शकतो:

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist` डीफॉल्टनुसार `true` असते.
- फिल्टरिंग केवळ नावाने केले जाईल (पॅरामीटर्सशिवाय). जर तुमच्याकडे `f()` आणि `f(uint256)` असेल, तर `"f"` फिल्टर दोन्ही फंक्शन्सशी जुळेल.

### एकिडना चालवा {#run-echidna-1}

कॉन्फिगरेशन फाइल `blacklist.yaml` सह एकिडना चालवण्यासाठी:

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

एकिडना प्रॉपर्टी खोटी ठरवण्यासाठी व्यवहारांचा क्रम जवळजवळ लगेच शोधेल.

### सारांश: फंक्शन्स फिल्टर करणे {#summary-filtering-functions}

एकिडना फझिंग मोहिमेदरम्यान कॉल करण्यासाठी फंक्शन्स ब्लॅकलिस्ट किंवा व्हाईटलिस्ट करू शकते, यासाठी हे वापरले जाते:

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

एकिडना `filterBlacklist` बुलियनच्या मूल्यानुसार `f1`, `f2` आणि `f3` ला ब्लॅकलिस्ट करून किंवा फक्त त्यांनाच कॉल करून फझिंग मोहीम सुरू करते.

## एकिडनासह Solidity च्या दृढकथनाची (assert) चाचणी कशी करावी {#how-to-test-soliditys-assert-with-echidna}

या छोट्या ट्युटोरियलमध्ये, आम्ही कॉन्ट्रॅक्ट्समधील दृढकथन तपासणीची चाचणी करण्यासाठी एकिडना कसे वापरावे हे दाखवणार आहोत. समजा आपल्याकडे यासारखे एक कॉन्ट्रॅक्ट आहे:

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

### दृढकथन लिहा {#write-an-assertion}

आपल्याला हे सुनिश्चित करायचे आहे की `tmp` त्याचा फरक रिटर्न केल्यानंतर `counter` पेक्षा कमी किंवा समान आहे. आपण एकिडना प्रॉपर्टी लिहू शकतो, परंतु आपल्याला `tmp` मूल्य कुठेतरी स्टोअर करावे लागेल. त्याऐवजी, आपण यासारखे दृढकथन वापरू शकतो:

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

### एकिडना चालवा {#run-echidna-2}

दृढकथन अपयश चाचणी सक्षम करण्यासाठी, एक [एकिडना कॉन्फिगरेशन फाइल](https://github.com/crytic/echidna/wiki/Config) `config.yaml` तयार करा:

```yaml
checkAsserts: true
```

जेव्हा आपण हे कॉन्ट्रॅक्ट एकिडनामध्ये चालवतो, तेव्हा आपल्याला अपेक्षित परिणाम मिळतात:

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

जसे तुम्ही पाहू शकता, एकिडना `inc` फंक्शनमध्ये काही दृढकथन अपयशाची तक्रार करते. प्रति फंक्शन एकापेक्षा जास्त दृढकथन जोडणे शक्य आहे, परंतु कोणते दृढकथन अयशस्वी झाले हे एकिडना सांगू शकत नाही.

### दृढकथने कधी आणि कशी वापरावीत {#when-and-how-use-assertions}

दृढकथने स्पष्ट प्रॉपर्टीजसाठी पर्याय म्हणून वापरली जाऊ शकतात, विशेषतः जर तपासायच्या अटी थेट काही ऑपरेशन `f` च्या योग्य वापराशी संबंधित असतील. काही कोडनंतर दृढकथने जोडल्याने हे सुनिश्चित होईल की ते कार्यान्वित झाल्यानंतर लगेचच तपासणी होईल:

```solidity
function f(..) public {
    // काही क्लिष्ट कोड
    ...
    assert (condition);
    ...
}

```

याउलट, स्पष्ट एकिडना प्रॉपर्टी वापरल्याने यादृच्छिकपणे व्यवहार कार्यान्वित होतील आणि ते नेमके कधी तपासले जाईल हे लागू करण्याचा कोणताही सोपा मार्ग नाही. तरीही हा उपाय करणे शक्य आहे:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

तथापि, काही समस्या आहेत:

- जर `f` ला `internal` किंवा `external` म्हणून घोषित केले असेल तर ते अयशस्वी होते.
- `f` ला कॉल करण्यासाठी कोणते आर्ग्युमेंट्स वापरावेत हे अस्पष्ट आहे.
- जर `f` पूर्ववत (revert) झाले, तर प्रॉपर्टी अयशस्वी होईल.

सर्वसाधारणपणे, दृढकथने कशी वापरावीत यावर आम्ही [जॉन रेगेहर यांच्या शिफारसीचे](https://blog.regehr.org/archives/1091) पालन करण्याची शिफारस करतो:

- दृढकथन तपासणीदरम्यान कोणत्याही साइड इफेक्टची सक्ती करू नका. उदाहरणार्थ: `assert(ChangeStateAndReturn() == 1)`
- स्पष्ट विधानांचे दृढकथन करू नका. उदाहरणार्थ `assert(var >= 0)` जिथे `var` ला `uint` म्हणून घोषित केले आहे.

शेवटी, कृपया `assert` ऐवजी `require` **वापरू नका**, कारण एकिडना ते शोधू शकणार नाही (परंतु कॉन्ट्रॅक्ट तरीही पूर्ववत होईल).

### सारांश: दृढकथन तपासणी {#summary-assertion-checking}

खालीलप्रमाणे आपल्या उदाहरणावरील एकिडनाच्या रनचा सारांश आहे:

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

एकिडनाला आढळले की जर हे फंक्शन मोठ्या आर्ग्युमेंट्ससह अनेक वेळा कॉल केले तर `inc` मधील दृढकथन अयशस्वी होऊ शकते.

## एकिडना कॉर्पस गोळा करणे आणि सुधारित करणे {#collecting-and-modifying-an-echidna-corpus}

एकिडनासह व्यवहारांचा कॉर्पस कसा गोळा करायचा आणि वापरायचा ते आपण पाहू. खालील स्मार्ट कॉन्ट्रॅक्ट हे लक्ष्य आहे [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

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

हे छोटे उदाहरण एकिडनाला स्थिती व्हेरिएबल बदलण्यासाठी विशिष्ट मूल्ये शोधण्यास भाग पाडते. हे फझरसाठी कठीण आहे
([मॅन्टिकोर](https://github.com/trailofbits/manticore) सारखे सिम्बॉलिक एक्झिक्यूशन टूल वापरण्याची शिफारस केली जाते).
याची पडताळणी करण्यासाठी आपण एकिडना चालवू शकतो:

```bash
echidna-test magic.sol
...

echidna_magic_values: passed! 🎉

Seed: 2221503356319272685
```

तथापि, ही फझिंग मोहीम चालवताना आपण कॉर्पस गोळा करण्यासाठी तरीही एकिडना वापरू शकतो.

### कॉर्पस गोळा करणे {#collecting-a-corpus}

कॉर्पस संकलन सक्षम करण्यासाठी, एक कॉर्पस डिरेक्टरी तयार करा:

```bash
mkdir corpus-magic
```

आणि एक [एकिडना कॉन्फिगरेशन फाइल](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
coverage: true
corpusDir: "corpus-magic"
```

आता आपण आपले टूल चालवू शकतो आणि गोळा केलेला कॉर्पस तपासू शकतो:

```bash
echidna-test magic.sol --config config.yaml
```

एकिडनाला अद्याप योग्य मॅजिक मूल्ये सापडत नाहीत, परंतु आपण त्याने गोळा केलेल्या कॉर्पसवर एक नजर टाकू शकतो.
उदाहरणार्थ, यापैकी एक फाइल होती:

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

स्पष्टपणे, हे इनपुट आपल्या प्रॉपर्टीमध्ये अपयश ट्रिगर करणार नाही. तथापि, पुढील चरणात, आपण त्यासाठी ते कसे सुधारायचे ते पाहू.

### कॉर्पस सीड करणे {#seeding-a-corpus}

एकिडनाला `magic` फंक्शन हाताळण्यासाठी काही मदतीची आवश्यकता आहे. आपण त्यासाठी योग्य पॅरामीटर्स वापरण्यासाठी इनपुट कॉपी आणि सुधारित करणार आहोत:

```bash
cp corpus/2712688662897926208.txt corpus/new.txt
```

आपण `magic(42,129,333,0)` ला कॉल करण्यासाठी `new.txt` मध्ये सुधारणा करू. आता, आपण एकिडना पुन्हा चालवू शकतो:

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

यावेळी, त्याला आढळले की प्रॉपर्टीचे लगेच उल्लंघन झाले आहे.

## जास्त गॅस वापरणारे व्यवहार शोधणे {#finding-transactions-with-high-gas-consumption}

एकिडनासह जास्त गॅस वापरणारे व्यवहार कसे शोधायचे ते आपण पाहू. खालील स्मार्ट कॉन्ट्रॅक्ट हे लक्ष्य आहे:

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

येथे `expensive` मध्ये मोठ्या प्रमाणात गॅसचा वापर होऊ शकतो.

सध्या, एकिडनाला चाचणी करण्यासाठी नेहमी एका प्रॉपर्टीची आवश्यकता असते: येथे `echidna_test` नेहमी `true` रिटर्न करते.
याची पडताळणी करण्यासाठी आपण एकिडना चालवू शकतो:

```
echidna-test gas.sol
...
echidna_test: उत्तीर्ण! 🎉

सीड: 2320549945714142710
```

### गॅस वापराचे मोजमाप करणे {#measuring-gas-consumption}

एकिडनासह गॅस वापर सक्षम करण्यासाठी, एक कॉन्फिगरेशन फाइल `config.yaml` तयार करा:

```yaml
estimateGas: true
```

या उदाहरणात, परिणाम समजण्यास सोपे करण्यासाठी आपण व्यवहारांच्या क्रमाचा आकार देखील कमी करू:

```yaml
seqLen: 2
estimateGas: true
```

### एकिडना चालवा {#run-echidna-3}

एकदा आपण कॉन्फिगरेशन फाइल तयार केली की, आपण एकिडना याप्रमाणे चालवू शकतो:

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

- दर्शविलेला गॅस हा [HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-) द्वारे प्रदान केलेला अंदाज आहे.

### गॅस कमी करणारे कॉल्स फिल्टर करणे {#filtering-out-gas-reducing-calls}

वरील **फझिंग मोहिमेदरम्यान कॉल करण्यासाठी फंक्शन्स फिल्टर करणे** यावरील ट्युटोरियल तुमच्या चाचणीमधून काही फंक्शन्स कसे काढायचे हे दाखवते.  
अचूक गॅस अंदाज मिळवण्यासाठी हे महत्त्वपूर्ण असू शकते.
खालील उदाहरणाचा विचार करा:

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

जर एकिडना सर्व फंक्शन्सना कॉल करू शकत असेल, तर त्याला जास्त गॅस खर्च असलेले व्यवहार सहज सापडणार नाहीत:

```
echidna-test pushpop.sol --config config.yaml
...
pop ने जास्तीत जास्त 10746 गॅस वापरला
...
check ने जास्तीत जास्त 23730 गॅस वापरला
...
clear ने जास्तीत जास्त 35916 गॅस वापरला
...
push ने जास्तीत जास्त 40839 गॅस वापरला
```

याचे कारण असे की खर्च `addrs` च्या आकारावर अवलंबून असतो आणि यादृच्छिक कॉल्स अ‍ॅरे जवळजवळ रिकामा ठेवतात.
तथापि, `pop` आणि `clear` ला ब्लॅकलिस्ट केल्याने आपल्याला बरेच चांगले परिणाम मिळतात:

```yaml
filterBlacklist: true
filterFunctions: ["pop", "clear"]
```

```
echidna-test pushpop.sol --config config.yaml
...
push ने जास्तीत जास्त 40839 गॅस वापरला
...
check ने जास्तीत जास्त 1484472 गॅस वापरला
```

### सारांश: जास्त गॅस वापरणारे व्यवहार शोधणे {#summary-finding-transactions-with-high-gas-consumption}

एकिडना `estimateGas` कॉन्फिगरेशन पर्याय वापरून जास्त गॅस वापरणारे व्यवहार शोधू शकते:

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
...
```

एकदा फझिंग मोहीम संपली की, एकिडना प्रत्येक फंक्शनसाठी जास्तीत जास्त गॅस वापर असलेल्या क्रमाची तक्रार करेल.