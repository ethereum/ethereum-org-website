---
title: "स्मार्ट कॉन्ट्रॅक्ट्सची चाचणी घेण्यासाठी Echidna चा वापर कसा करावा"
description: "स्मार्ट कॉन्ट्रॅक्ट्सची आपोआप चाचणी घेण्यासाठी Echidna चा वापर कसा करावा"
author: "Trailofbits"
lang: mr
tags:
  [
    "Solidity",
    "स्मार्ट कॉन्ट्रॅक्ट",
    "सुरक्षा",
    "चाचणी",
    "fuzzing"
  ]
skill: advanced
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## इन्स्टॉलेशन {#installation}

Echidna डॉकरद्वारे किंवा प्री-कंपाइल बायनरी वापरून इन्स्टॉल केले जाऊ शकते.

### डॉकरद्वारे Echidna {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_शेवटचा कमांड तुमच्या सध्याच्या डिरेक्टरीमध्ये ऍक्सेस असलेल्या docker मध्ये eth-security-toolbox चालवतो. तुम्ही तुमच्या होस्टमधून फाइल्स बदलू शकता, आणि docker मधून फाइल्सवर टूल्स चालवू शकता_

डॉकरमध्ये, चालवा :

```bash
solc-select 0.5.11
cd /home/training
```

### बायनरी {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## प्रॉपर्टी-आधारित फझिंगची ओळख {#introduction-to-property-based-fuzzing}

Echidna एक प्रॉपर्टी-आधारित फझर आहे, ज्याचे वर्णन आम्ही आमच्या मागील ब्लॉगपोस्टमध्ये केले आहे ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### फझिंग {#fuzzing}

[Fuzzing](https://wikipedia.org/wiki/Fuzzing) हे सुरक्षा समुदायामध्ये एक सुप्रसिद्ध तंत्र आहे. यात प्रोग्राममधील बग शोधण्यासाठी कमी-अधिक प्रमाणात यादृच्छिक इनपुट तयार करणे समाविष्ट आहे. पारंपारिक सॉफ्टवेअरसाठी फझर्स (जसे की [AFL](http://lcamtuf.coredump.cx/afl/) किंवा [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) बग शोधण्यासाठी कार्यक्षम साधने म्हणून ओळखले जातात.

केवळ यादृच्छिक इनपुट तयार करण्यापलीकडे, चांगले इनपुट तयार करण्यासाठी अनेक तंत्रे आणि धोरणे आहेत, ज्यात खालील गोष्टींचा समावेश आहे:

- प्रत्येक अंमलबजावणीतून अभिप्राय मिळवा आणि त्याचा वापर करून पिढीला मार्गदर्शन करा. उदाहरणार्थ, जर नवीन तयार केलेल्या इनपुटमुळे नवीन मार्ग सापडला, तर त्याच्या जवळ नवीन इनपुट तयार करणे अर्थपूर्ण ठरू शकते.
- रचनात्मक मर्यादांचा आदर करून इनपुट तयार करणे. उदाहरणार्थ, जर तुमच्या इनपुटमध्ये चेकसमसह हेडर असेल, तर फझरला चेकसम प्रमाणित करणारे इनपुट तयार करू देणे अर्थपूर्ण ठरेल.
- नवीन इनपुट तयार करण्यासाठी ज्ञात इनपुट वापरणे: जर तुमच्याकडे वैध इनपुटच्या मोठ्या डेटासेटमध्ये प्रवेश असेल, तर तुमचा फझर सुरवातीपासून त्याची निर्मिती सुरू करण्याऐवजी त्यातून नवीन इनपुट तयार करू शकतो. यांना सहसा _seeds_ म्हटले जाते.

### प्रॉपर्टी-आधारित फझिंग {#property-based-fuzzing}

Echidna फझरच्या एका विशिष्ट कुटुंबाशी संबंधित आहे: [QuickCheck](https://wikipedia.org/wiki/QuickCheck) द्वारे मोठ्या प्रमाणावर प्रेरित प्रॉपर्टी-आधारित फझिंग. क्रॅश शोधण्याचा प्रयत्न करणाऱ्या क्लासिक फझरच्या विपरीत, Echidna वापरकर्ता-परिभाषित इनव्हेरियंट्स तोडण्याचा प्रयत्न करेल.

स्मार्ट कॉन्ट्रॅक्ट्समध्ये, इनव्हेरियंट्स हे Solidity फंक्शन्स असतात, जे कॉन्ट्रॅक्ट पोहोचू शकणाऱ्या कोणत्याही चुकीच्या किंवा अवैध स्थितीचे प्रतिनिधित्व करू शकतात, ज्यात खालील गोष्टींचा समावेश आहे:

- चुकीचे प्रवेश नियंत्रण: आक्रमणकर्ता कॉन्ट्रॅक्टचा मालक बनला.
- चुकीचे स्टेट मशीन: कॉन्ट्रॅक्ट थांबवलेले असताना टोकन हस्तांतरित केले जाऊ शकतात.
- चुकीचे अंकगणित: वापरकर्ता त्याचे शिल्लक कमी करू शकतो आणि अमर्यादित विनामूल्य टोकन मिळवू शकतो.

### Echidna सह प्रॉपर्टीची चाचणी करणे {#testing-a-property-with-echidna}

आम्ही Echidna सह स्मार्ट कॉन्ट्रॅक्टची चाचणी कशी करायची ते पाहू. लक्ष्य खालील स्मार्ट कॉन्ट्रॅक्ट आहे [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

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

आम्ही असे गृहीत धरू की या टोकनमध्ये खालील गुणधर्म असणे आवश्यक आहे:

- कोणाकडेही जास्तीत जास्त 1000 टोकन असू शकतात
- टोकन हस्तांतरित केले जाऊ शकत नाही (ते ERC20 टोकन नाही)

### एक प्रॉपर्टी लिहा {#write-a-property}

Echidna प्रॉपर्टीज या Solidity फंक्शन्स आहेत. एका प्रॉपर्टीमध्ये हे असणे आवश्यक आहे:

- कोणतेही आर्ग्युमेंट नसावे
- यशस्वी झाल्यास `true` परत करा
- त्याचे नाव `echidna` ने सुरू झाले पाहिजे

Echidna हे करेल:

- प्रॉपर्टीची चाचणी घेण्यासाठी आपोआप अनियंत्रित व्यवहार तयार करा.
- एखाद्या प्रॉपर्टीला `false` परत करण्यास किंवा त्रुटी निर्माण करण्यास कारणीभूत ठरलेल्या कोणत्याही व्यवहारांची तक्रार करा.
- प्रॉपर्टी कॉल करताना साईड-इफेक्ट टाळा (म्हणजे, जर प्रॉपर्टी स्टेट व्हेरिएबल बदलत असेल, तर चाचणीनंतर ते टाकून दिले जाते)

खालील प्रॉपर्टी तपासते की कॉलरकडे 1000 पेक्षा जास्त टोकन नाहीत:

```solidity
function echidna_balance_under_1000() public view returns(bool){
      return balances[msg.sender] <= 1000;
}
```

तुमच्या कॉन्ट्रॅक्टला तुमच्या प्रॉपर्टीजपासून वेगळे करण्यासाठी इनहेरिटन्स वापरा:

```solidity
contract TestToken is Token{
      function echidna_balance_under_1000() public view returns(bool){
            return balances[msg.sender] <= 1000;
      }
  }
```

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) प्रॉपर्टी लागू करते आणि टोकनमधून इनहेरिट करते.

### एक कॉन्ट्रॅक्ट सुरू करा {#initiate-a-contract}

Echidna ला आर्ग्युमेंटशिवाय [constructor](/developers/docs/smart-contracts/anatomy/#constructor-functions) ची आवश्यकता आहे. जर तुमच्या कॉन्ट्रॅक्टला विशिष्ट इनिशिएलायझेशनची आवश्यकता असेल, तर तुम्हाला ते कन्स्ट्रक्टरमध्ये करावे लागेल.

Echidna मध्ये काही विशिष्ट ॲड्रेसेस आहेत:

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72` जे कन्स्ट्रक्टरला कॉल करते.
- `0x10000`, `0x20000`, आणि `0x00a329C0648769a73afAC7F9381e08fb43DBEA70` जे यादृच्छिकपणे इतर फंक्शन्सना कॉल करतात.

आमच्या सध्याच्या उदाहरणात आम्हाला कोणत्याही विशिष्ट इनिशिएलायझेशनची आवश्यकता नाही, परिणामी आमचा कन्स्ट्रक्टर रिकामा आहे.

### Echidna चालवा {#run-echidna}

Echidna यासह लॉन्च केले जाते:

```bash
echidna-test contract.sol
```

जर contract.sol मध्ये अनेक कॉन्ट्रॅक्ट्स असतील, तर तुम्ही लक्ष्य निर्दिष्ट करू शकता:

```bash
echidna-test contract.sol --contract MyContract
```

### सारांश: एका प्रॉपर्टीची चाचणी करणे {#summary-testing-a-property}

खालील आमच्या उदाहरणावरील Echidna च्या रनचा सारांश देते:

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

Echidna ला आढळले की जर `backdoor` कॉल केला तर प्रॉपर्टीचे उल्लंघन होते.

## फझिंग मोहिमेदरम्यान कॉल करण्यासाठी फंक्शन्स फिल्टर करणे {#filtering-functions-to-call-during-a-fuzzing-campaign}

आम्ही फझ करण्यासाठी फंक्शन्स कसे फिल्टर करायचे ते पाहू.
लक्ष्य खालील स्मार्ट कॉन्ट्रॅक्ट आहे:

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

हे लहान उदाहरण Echidna ला स्टेट व्हेरिएबल बदलण्यासाठी व्यवहारांचा एक विशिष्ट क्रम शोधण्यास भाग पाडते.
हे फझरसाठी कठीण आहे (यासाठी [Manticore](https://github.com/trailofbits/manticore) सारखे सिम्बॉलिक एक्झिक्युशन टूल वापरण्याची शिफारस केली जाते).
हे तपासण्यासाठी आपण Echidna चालवू शकतो:

```bash
echidna-test multi.sol
...
echidna_state4: passed! 🎉
Seed: -3684648582249875403
```

### फिल्टरिंग फंक्शन्स {#filtering-functions}

Echidna ला या कॉन्ट्रॅक्टची चाचणी घेण्यासाठी योग्य क्रम शोधण्यात अडचण येत आहे कारण दोन रीसेट फंक्शन्स (`reset1` आणि `reset2`) सर्व स्टेट व्हेरिएबल्स `false` वर सेट करतील.
तथापि, आपण एक विशेष Echidna वैशिष्ट्य वापरू शकतो, एकतर रीसेट फंक्शनला ब्लॅकलिस्ट करण्यासाठी किंवा फक्त `f`, `g`,
`h` आणि `i` फंक्शन्सना व्हाइटलिस्ट करण्यासाठी.

फंक्शन्स ब्लॅकलिस्ट करण्यासाठी, आम्ही ही कॉन्फिगरेशन फाइल वापरू शकतो:

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

फंक्शन्स फिल्टर करण्याचा दुसरा दृष्टिकोन म्हणजे व्हाइटलिस्ट केलेल्या फंक्शन्सची यादी करणे. ते करण्यासाठी, आम्ही ही कॉन्फिगरेशन फाइल वापरू शकतो:

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist` हे डीफॉल्टनुसार `true` असते.
- फिल्टरिंग केवळ नावाने केले जाईल (पॅरामीटर्सशिवाय). जर तुमच्याकडे `f()` आणि `f(uint256)` असेल, तर `"f"` फिल्टर दोन्ही फंक्शन्सना जुळेल.

### Echidna चालवा {#run-echidna-1}

`blacklist.yaml` कॉन्फिगरेशन फाइलसह Echidna चालवण्यासाठी:

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

Echidna जवळजवळ त्वरित प्रॉपर्टीला खोटे ठरवण्यासाठी व्यवहारांचा क्रम शोधेल.

### सारांश: फिल्टरिंग फंक्शन्स {#summary-filtering-functions}

Echidna फझिंग मोहिमेदरम्यान कॉल करण्यासाठी फंक्शन्स ब्लॅकलिस्ट किंवा व्हाइटलिस्ट करू शकते:

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

`filterBlacklist` बुलियनच्या मूल्यांनुसार Echidna `f1`, `f2` आणि `f3` ला ब्लॅकलिस्ट करून किंवा फक्त त्यांना कॉल करून फझिंग मोहीम सुरू करते.

## Echidna सह Solidity's assert ची चाचणी कशी करावी {#how-to-test-soliditys-assert-with-echidna}

या लहान ट्युटोरियलमध्ये, आम्ही कॉन्ट्रॅक्ट्समध्ये अॅसर्शन चेकिंगची चाचणी घेण्यासाठी Echidna चा वापर कसा करायचा हे दाखवणार आहोत. समजा आपल्याकडे यासारखा एक कॉन्ट्रॅक्ट आहे:

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

### एक अॅसर्शन लिहा {#write-an-assertion}

त्यातील फरक परत केल्यानंतर `tmp` हे `counter` पेक्षा कमी किंवा समान आहे याची आम्ही खात्री करू इच्छितो. आपण Echidna
प्रॉपर्टी लिहू शकतो, पण आपल्याला `tmp` मूल्य कुठेतरी साठवावे लागेल. त्याऐवजी, आपण यासारखे अॅसर्शन वापरू शकतो:

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

### Echidna चालवा {#run-echidna-2}

अॅसर्शन अयशस्वी चाचणी सक्षम करण्यासाठी, एक [Echidna कॉन्फिगरेशन फाइल](https://github.com/crytic/echidna/wiki/Config) `config.yaml` तयार करा:

```yaml
checkAsserts: true
```

जेव्हा आपण Echidna मध्ये हा कॉन्ट्रॅक्ट चालवतो, तेव्हा आपल्याला अपेक्षित परिणाम मिळतात:

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

तुम्ही बघू शकता, Echidna `inc` फंक्शनमध्ये काही अॅसर्शन अयशस्वी झाल्याची तक्रार करते. प्रत्येक फंक्शनमध्ये एकापेक्षा जास्त अॅसर्शन जोडणे शक्य आहे, परंतु कोणते अॅसर्शन अयशस्वी झाले हे Echidna सांगू शकत नाही.

### अॅसर्शन्स केव्हा आणि कसे वापरावे {#when-and-how-use-assertions}

अॅसर्शन्स स्पष्ट प्रॉपर्टीजसाठी पर्याय म्हणून वापरले जाऊ शकतात, विशेषतः जर तपासण्याची परिस्थिती थेट काही ऑपरेशन `f` च्या योग्य वापराशी संबंधित असेल. काही कोडनंतर अॅसर्शन्स जोडल्याने हे सुनिश्चित होईल की तपासणी त्याच्या अंमलबजावणीनंतर लगेच होईल:

```solidity
function f(..) public {
    // काही जटिल कोड
    ...
    assert (condition);
    ...
}

```

याउलट, स्पष्ट Echidna प्रॉपर्टी वापरल्याने व्यवहार यादृच्छिकपणे अंमलात येतील आणि ते केव्हा तपासले जाईल हे लागू करण्याचा कोणताही सोपा मार्ग नाही. हा वर्कअराउंड करणे अजूनही शक्य आहे:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

तथापि, काही समस्या आहेत:

- जर `f` हे `internal` किंवा `external` म्हणून घोषित केले असेल तर ते अयशस्वी होते.
- `f` ला कॉल करण्यासाठी कोणते आर्ग्युमेंट्स वापरावे हे अस्पष्ट आहे.
- जर `f` रिव्हर्ट झाले, तर प्रॉपर्टी अयशस्वी होईल.

सर्वसाधारणपणे, आम्ही अॅसर्शन्स कसे वापरावे यावर [जॉन रेगेहर यांच्या शिफारसीचे](https://blog.regehr.org/archives/1091) पालन करण्याची शिफारस करतो:

- अॅसर्शन तपासणी दरम्यान कोणताही साईड इफेक्ट जबरदस्तीने करू नका. उदाहरणार्थ: `assert(ChangeStateAndReturn() == 1)`
- स्पष्ट विधाने निश्चित करू नका. उदाहरणार्थ, `assert(var >= 0)` जेथे `var` हे `uint` म्हणून घोषित केले आहे.

शेवटी, कृपया `assert` ऐवजी `require` **वापरू नका**, कारण Echidna ते शोधू शकणार नाही (परंतु कॉन्ट्रॅक्ट तरीही रिव्हर्ट होईल).

### सारांश: अॅसर्शन चेकिंग {#summary-assertion-checking}

खालील आमच्या उदाहरणावरील Echidna च्या रनचा सारांश देते:

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

Echidna ला आढळले की `inc` मधील अॅसर्शन अयशस्वी होऊ शकते जर हे फंक्शन मोठ्या आर्ग्युमेंट्ससह अनेक वेळा कॉल केले गेले.

## Echidna कॉर्पस गोळा करणे आणि त्यात बदल करणे {#collecting-and-modifying-an-echidna-corpus}

आम्ही Echidna सह व्यवहारांचा कॉर्पस कसा गोळा करायचा आणि वापरायचा ते पाहू. लक्ष्य खालील स्मार्ट कॉन्ट्रॅक्ट आहे [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

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

हे लहान उदाहरण Echidna ला स्टेट व्हेरिएबल बदलण्यासाठी काही विशिष्ट मूल्ये शोधण्यास भाग पाडते. हे फझरसाठी कठीण आहे
(यासाठी [Manticore](https://github.com/trailofbits/manticore) सारखे सिम्बॉलिक एक्झिक्युशन टूल वापरण्याची शिफारस केली जाते).
हे तपासण्यासाठी आपण Echidna चालवू शकतो:

```bash
echidna-test magic.sol
...

echidna_magic_values: passed! 🎉

Seed: 2221503356319272685
```

तथापि, ही फझिंग मोहीम चालवताना कॉर्पस गोळा करण्यासाठी आम्ही अजूनही Echidna वापरू शकतो.

### कॉर्पस गोळा करणे {#collecting-a-corpus}

कॉर्पस संकलन सक्षम करण्यासाठी, एक कॉर्पस डिरेक्टरी तयार करा:

```bash
mkdir corpus-magic
```

आणि एक [Echidna कॉन्फिगरेशन फाइल](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
coverage: true
corpusDir: "corpus-magic"
```

आता आपण आपले टूल चालवू शकतो आणि गोळा केलेला कॉर्पस तपासू शकतो:

```bash
echidna-test magic.sol --config config.yaml
```

Echidna अजूनही योग्य मॅजिक व्हॅल्यूज शोधू शकत नाही, परंतु आपण त्याने गोळा केलेल्या कॉर्पसवर एक नजर टाकू शकतो.
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

स्पष्टपणे, हे इनपुट आमच्या प्रॉपर्टीमध्ये अपयश आणणार नाही. तथापि, पुढील चरणात, आम्ही त्यासाठी त्यात कसे बदल करायचे ते पाहू.

### कॉर्पस सीडिंग करणे {#seeding-a-corpus}

`magic` फंक्शन हाताळण्यासाठी Echidna ला काही मदतीची गरज आहे. आम्ही इनपुट कॉपी करणार आहोत आणि त्यासाठी योग्य
पॅरामीटर्स वापरण्यासाठी त्यात बदल करणार आहोत:

```bash
cp corpus/2712688662897926208.txt corpus/new.txt
```

आम्ही `magic(42,129,333,0)` ला कॉल करण्यासाठी `new.txt` मध्ये बदल करू. आता, आपण Echidna पुन्हा चालवू शकतो:

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

यावेळी, त्याला आढळले की प्रॉपर्टीचे त्वरित उल्लंघन झाले आहे.

## उच्च गॅस वापरासह व्यवहार शोधणे {#finding-transactions-with-high-gas-consumption}

आम्ही Echidna सह उच्च गॅस वापरासह व्यवहार कसे शोधायचे ते पाहू. लक्ष्य खालील स्मार्ट कॉन्ट्रॅक्ट आहे:

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

येथे `expensive` मध्ये मोठा गॅस वापर असू शकतो.

सध्या, Echidna ला नेहमी चाचणीसाठी एक प्रॉपर्टीची आवश्यकता असते: येथे `echidna_test` नेहमी `true` परत करते.
हे तपासण्यासाठी आपण Echidna चालवू शकतो:

```
echidna-test gas.sol
...
echidna_test: passed! 🎉

Seed: 2320549945714142710
```

### गॅस वापर मोजणे {#measuring-gas-consumption}

Echidna सह गॅस वापर सक्षम करण्यासाठी, एक कॉन्फिगरेशन फाइल `config.yaml` तयार करा:

```yaml
estimateGas: true
```

या उदाहरणात, आम्ही परिणाम समजण्यास सोपे करण्यासाठी व्यवहार क्रमाचा आकार देखील कमी करू:

```yaml
seqLen: 2
estimateGas: true
```

### Echidna चालवा {#run-echidna-3}

एकदा आम्ही कॉन्फिगरेशन फाइल तयार केल्यावर, आम्ही Echidna याप्रमाणे चालवू शकतो:

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

- दाखवलेला गॅस हा [HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-) द्वारे प्रदान केलेला एक अंदाज आहे.

### गॅस-कमी करणारे कॉल्स फिल्टर करणे {#filtering-out-gas-reducing-calls}

वरील **फझिंग मोहिमेदरम्यान कॉल करण्यासाठी फंक्शन्स फिल्टर करणे** यावरील ट्युटोरियल तुमच्या चाचणीमधून काही फंक्शन्स कसे काढायचे हे दाखवते.  
अचूक गॅस अंदाज मिळवण्यासाठी हे महत्त्वपूर्ण असू शकते.
खालील उदाहरण विचारात घ्या:

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

जर Echidna सर्व फंक्शन्सना कॉल करू शकत असेल, तर त्याला उच्च गॅस खर्चासह व्यवहार सहज सापडणार नाहीत:

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

कारण खर्च `addrs` च्या आकारावर अवलंबून असतो आणि यादृच्छिक कॉल्समुळे ॲरे जवळजवळ रिकामा राहतो.
तथापि, `pop` आणि `clear` ला ब्लॅकलिस्ट केल्याने आम्हाला बरेच चांगले परिणाम मिळतात:

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

### सारांश: उच्च गॅस वापरासह व्यवहार शोधणे {#summary-finding-transactions-with-high-gas-consumption}

`estimateGas` कॉन्फिगरेशन पर्याय वापरून Echidna उच्च गॅस वापरासह व्यवहार शोधू शकते:

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
...
```

एकदा फझिंग मोहीम संपली की, Echidna प्रत्येक फंक्शनसाठी कमाल गॅस वापरासह एक क्रम नोंदवेल.
