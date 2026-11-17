---
title: "स्मार्ट कॉन्ट्रॅक्ट्सची चाचणी करण्यासाठी एकिडना कसे वापरावे"
description: "स्मार्ट कॉन्ट्रॅक्ट्सची स्वयंचलितपणे चाचणी करण्यासाठी एकिडना कसे वापरावे"
author: "ट्रेलऑफबिट्स"
lang: mr
tags: ["Solidity", "स्मार्ट कॉन्ट्रॅक्ट्स", "सुरक्षा", "चाचणी", "फझिंग"]
skill: advanced
breadcrumb: "एकिडना"
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## इन्स्टॉलेशन {#installation}

एकिडना Docker, Homebrew द्वारे किंवा प्री-कंपाइल्ड बायनरी वापरून इन्स्टॉल केले जाऊ शकते. या ट्युटोरिअलमधील उदाहरणांची एकिडना 2.3.3 आणि solc 0.8.37 सह चाचणी केली गेली आहे.

### Docker द्वारे एकिडना {#echidna-through-docker}

```sh
docker pull ghcr.io/crytic/echidna/echidna:latest
docker run --rm -it -v "$PWD":/src ghcr.io/crytic/echidna/echidna:latest
```

_शेवटची कमांड तुमच्या सध्याच्या डिरेक्टरीमध्ये प्रवेश असलेल्या Docker मध्ये एकिडना इमेज चालवते. तुम्ही तुमच्या होस्टवरून फाइल्स बदलू शकता आणि Docker मधील फाइल्सवर टूल्स चालवू शकता. ही इमेज [स्लिदर](https://github.com/crytic/slither), [crytic-compile](https://github.com/crytic/crytic-compile) आणि [solc-select](https://github.com/crytic/solc-select) सह देखील येते._

Docker च्या आत, हे चालवा:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
cd /src
```

### बायनरी {#binary}

तुमच्या प्लॅटफॉर्मसाठी नवीनतम रिलीज [https://github.com/crytic/echidna/releases/latest](https://github.com/crytic/echidna/releases/latest) वरून डाउनलोड करा. macOS किंवा Linux वर तुम्ही `brew install echidna` देखील चालवू शकता, जे त्यासोबत स्लिदर आणि crytic-compile इन्स्टॉल करते.

रिलीज बायनरी वापरताना, [स्लिदर](https://github.com/crytic/slither) आणि [solc-select](https://github.com/crytic/solc-select) स्वतः इन्स्टॉल करा (उदाहरणार्थ Python व्हर्च्युअल एन्व्हायर्नमेंटमध्ये `pip3 install slither-analyzer solc-select`) आणि कंपायलर आवृत्ती निवडा:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
```

एकिडना स्लिदरशिवाय चालते, परंतु स्लिदर `require` स्टेटमेंट्समध्ये वापरल्या जाणाऱ्या मॅजिक नंबर्ससारखे कॉन्स्टंट्स काढते आणि खालील अनेक उदाहरणे बग्स लवकर शोधण्यासाठी त्यावर अवलंबून आहेत.

## प्रॉपर्टी-आधारित फझिंगची ओळख {#introduction-to-property-based-fuzzing}

एकिडना हे एक प्रॉपर्टी-आधारित फझर आहे, ज्याचे वर्णन आम्ही आमच्या मागील ब्लॉगपोस्ट्समध्ये केले आहे ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### फझिंग {#fuzzing}

सुरक्षा समुदायामध्ये [फझिंग](https://wikipedia.org/wiki/Fuzzing) हे एक सुप्रसिद्ध तंत्र आहे. प्रोग्राममधील बग्स शोधण्यासाठी कमी-अधिक प्रमाणात यादृच्छिक इनपुट्स तयार करणे यात समाविष्ट आहे. पारंपारिक सॉफ्टवेअरसाठी फझर्स (जसे की [AFL](http://lcamtuf.coredump.cx/afl/) किंवा [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) बग्स शोधण्यासाठी कार्यक्षम साधने म्हणून ओळखले जातात.

केवळ यादृच्छिक इनपुट्स तयार करण्यापलीकडे, चांगले इनपुट्स तयार करण्यासाठी अनेक तंत्रे आणि धोरणे आहेत, ज्यामध्ये खालील गोष्टींचा समावेश आहे:

- प्रत्येक अंमलबजावणीतून अभिप्राय मिळवणे आणि त्याचा वापर करून निर्मितीला मार्गदर्शन करणे. उदाहरणार्थ, जर नव्याने तयार केलेल्या इनपुटमुळे नवीन मार्गाचा शोध लागला, तर त्याच्या जवळचे नवीन इनपुट्स तयार करणे अर्थपूर्ण ठरू शकते.
- स्ट्रक्चरल मर्यादांचा आदर करून इनपुट तयार करणे. उदाहरणार्थ, जर तुमच्या इनपुटमध्ये चेकसम असलेले हेडर असेल, तर फझरला चेकसम प्रमाणित करणारे इनपुट तयार करू देणे अर्थपूर्ण ठरेल.
- नवीन इनपुट्स तयार करण्यासाठी ज्ञात इनपुट्स वापरणे: जर तुमच्याकडे वैध इनपुटच्या मोठ्या डेटासेटचा अ‍ॅक्सेस असेल, तर तुमचा फझर शून्यापासून निर्मिती सुरू करण्याऐवजी त्यातून नवीन इनपुट्स तयार करू शकतो. यांना सहसा _सीड्स_ म्हटले जाते.

### प्रॉपर्टी-आधारित फझिंग {#property-based-fuzzing}

एकिडना फझरच्या एका विशिष्ट कुटुंबातील आहे: प्रॉपर्टी-आधारित फझिंग जे [QuickCheck](https://wikipedia.org/wiki/QuickCheck) द्वारे मोठ्या प्रमाणावर प्रेरित आहे. क्रॅश शोधण्याचा प्रयत्न करणाऱ्या क्लासिक फझरच्या विपरीत, एकिडना वापरकर्त्याने परिभाषित केलेले इनव्हेरियंट्स खंडित करण्याचा प्रयत्न करेल.

स्मार्ट कॉन्ट्रॅक्ट्समध्ये, इनव्हेरियंट्स हे Solidity फंक्शन्स असतात, जे कॉन्ट्रॅक्ट पोहोचू शकणाऱ्या कोणत्याही चुकीच्या किंवा अवैध स्थितीचे प्रतिनिधित्व करू शकतात, ज्यामध्ये खालील गोष्टींचा समावेश आहे:

- चुकीचे अ‍ॅक्सेस कंट्रोल: हल्लेखोर कॉन्ट्रॅक्टचा मालक बनला.
- चुकीचे स्टेट मशीन: कॉन्ट्रॅक्ट थांबवलेले असताना टोकन्स ट्रान्सफर केले जाऊ शकतात.
- चुकीचे अंकगणित: वापरकर्ता त्याच्या बॅलन्सला अंडरफ्लो करू शकतो आणि अमर्यादित मोफत टोकन्स मिळवू शकतो.

### एकिडनासह प्रॉपर्टीची चाचणी करणे {#testing-a-property-with-echidna}

आपण एकिडनासह स्मार्ट कॉन्ट्रॅक्टची चाचणी कशी करायची ते पाहू. लक्ष्य खालील स्मार्ट कॉन्ट्रॅक्ट [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) आहे:

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

आपण असे गृहीत धरू की या टोकनमध्ये खालील प्रॉपर्टीज असणे आवश्यक आहे:

- कोणाकडेही जास्तीत जास्त 1000 टोकन्स असू शकतात
- टोकन ट्रान्सफर केले जाऊ शकत नाही (हे ERC-20 टोकन नाही)

### प्रॉपर्टी लिहा {#write-a-property}

एकिडना प्रॉपर्टीज हे Solidity फंक्शन्स आहेत. प्रॉपर्टीमध्ये हे असणे आवश्यक आहे:

- कोणतेही आर्ग्युमेंट नसावे
- जर ते यशस्वी झाले तर `true` रिटर्न करावे
- त्याचे नाव `echidna` ने सुरू होणारे असावे

एकिडना हे करेल:

- प्रॉपर्टीची चाचणी करण्यासाठी स्वयंचलितपणे अनियंत्रित व्यवहार तयार करेल.
- प्रॉपर्टीला `false` रिटर्न करण्यास किंवा एरर थ्रो करण्यास प्रवृत्त करणाऱ्या कोणत्याही व्यवहारांची तक्रार करेल.
- प्रॉपर्टी कॉल करताना साइड-इफेक्ट काढून टाकेल (म्हणजेच, जर प्रॉपर्टीने स्थिती व्हेरिएबल बदलले, तर ते चाचणीनंतर काढून टाकले जाते)

खालील प्रॉपर्टी तपासते की कॉलरकडे 1000 पेक्षा जास्त टोकन्स नाहीत:

```solidity
function echidna_balance_under_1000() public view returns (bool) {
    return balances[msg.sender] <= 1000;
}
```

तुमचे कॉन्ट्रॅक्ट तुमच्या प्रॉपर्टीजपासून वेगळे करण्यासाठी इनहेरिटन्स वापरा:

```solidity
contract TestToken is Token {
    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

[`testtoken.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/testtoken.sol) प्रॉपर्टी लागू करते आणि टोकनमधून इनहेरिट करते.

### कॉन्ट्रॅक्ट सुरू करा {#initiate-a-contract}

एकिडनाला आर्ग्युमेंट नसलेला [कन्स्ट्रक्टर](/developers/docs/smart-contracts/anatomy/#constructor-functions) आवश्यक आहे. जर तुमच्या कॉन्ट्रॅक्टला विशिष्ट इनिशिएलायझेशनची आवश्यकता असेल, तर तुम्हाला ते कन्स्ट्रक्टरमध्ये करावे लागेल.

एकिडनामध्ये काही विशिष्ट पत्ते आहेत:

- `0x30000` जे कन्स्ट्रक्टरला कॉल करते.
- `0x10000`, `0x20000`, आणि `0x30000` जे यादृच्छिकपणे इतर फंक्शन्सना कॉल करतात.
- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72` जिथे चाचणी अंतर्गत असलेले कॉन्ट्रॅक्ट डिप्लॉय केले जाते.

आपल्याला आपल्या सध्याच्या उदाहरणात कोणत्याही विशिष्ट इनिशिएलायझेशनची आवश्यकता नाही, परिणामी आपला कन्स्ट्रक्टर रिकामा आहे.

### एकिडना चालवा {#run-echidna}

एकिडना यासह लाँच केले जाते:

```sh
echidna contract.sol
```

जर contract.sol मध्ये एकाधिक कॉन्ट्रॅक्ट्स असतील, तर तुम्ही लक्ष्य निर्दिष्ट करू शकता:

```sh
echidna contract.sol --contract MyContract
```

टर्मिनलमध्ये चालवल्यावर, एकिडना एक संवादात्मक UI दाखवते. खालील उदाहरणांप्रमाणे प्लेन टेक्स्ट आउटपुट मिळवण्यासाठी `--format text` जोडा.

### सारांश: प्रॉपर्टीची चाचणी करणे {#summary-testing-a-property}

खालीलप्रमाणे आपल्या उदाहरणावरील एकिडनाच्या रनचा सारांश आहे:

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

एकिडनाला आढळले की जर `backdoor` ला कॉल केला तर प्रॉपर्टीचे उल्लंघन होते.

## फझिंग मोहिमेदरम्यान कॉल करण्यासाठी फंक्शन्स फिल्टर करणे {#filtering-functions-to-call-during-a-fuzzing-campaign}

फझ करायची फंक्शन्स कशी फिल्टर करायची ते आपण पाहू.
लक्ष्य खालील स्मार्ट कॉन्ट्रॅक्ट आहे:

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

हे छोटे उदाहरण एकिडनाला स्थिती व्हेरिएबल बदलण्यासाठी व्यवहारांचा एक विशिष्ट क्रम शोधण्यास भाग पाडते.
फझरसाठी हे कठीण आहे.
याची पडताळणी करण्यासाठी आपण एकिडना चालवू शकतो:

```sh
echidna multi.sol
...
echidna_state4: passing
...
```

### फंक्शन्स फिल्टर करणे {#filtering-functions}

या कॉन्ट्रॅक्टची चाचणी करण्यासाठी योग्य क्रम शोधण्यात एकिडनाला अडचण येते कारण दोन रीसेट फंक्शन्स (`reset1` आणि `reset2`) सर्व स्थिती व्हेरिएबल्स `false` वर सेट करतील.
तथापि, आपण रीसेट फंक्शनला ब्लॅकलिस्ट करण्यासाठी किंवा फक्त `f`, `g`,
`h` आणि `i` फंक्शन्सना व्हाईटलिस्ट करण्यासाठी एक विशेष एकिडना वैशिष्ट्य वापरू शकतो.

फंक्शन्स ब्लॅकलिस्ट करण्यासाठी, आपण ही कॉन्फिगरेशन फाइल वापरू शकतो:

```yaml
filterBlacklist: true
filterFunctions: ["C.reset1()", "C.reset2()"]
```

फंक्शन्स फिल्टर करण्याचा दुसरा दृष्टिकोन म्हणजे व्हाईटलिस्ट केलेल्या फंक्शन्सची यादी करणे. ते करण्यासाठी, आपण ही कॉन्फिगरेशन फाइल वापरू शकतो:

```yaml
filterBlacklist: false
filterFunctions: ["C.f(uint256)", "C.g(uint256)", "C.h(uint256)", "C.i()"]
```

- `filterBlacklist` डीफॉल्टनुसार `true` असते.
- फिल्टरिंग पूर्ण फंक्शन नावावर केले जाते: कॉन्ट्रॅक्टचे नाव, एक `.`, आणि ॲप्लिकेशन बायनरी इंटरफेस (ABI) स्वाक्षरी (उदाहरणार्थ `C.f(uint256)`). जर तुमच्याकडे `f()` आणि `f(uint256)` असेल, तर तुम्ही नेमके कोणते फिल्टर करायचे ते निवडू शकता. `"reset1"` सारखे केवळ नाव कशाशीही जुळत नाही.

### एकिडना चालवा {#run-echidna-1}

कॉन्फिगरेशन फाइल `blacklist.yaml` सह एकिडना चालवण्यासाठी:

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

एकिडनाला प्रॉपर्टी खोटी ठरवण्यासाठी व्यवहारांचा क्रम जवळजवळ लगेच सापडेल.

### सारांश: फंक्शन्स फिल्टर करणे {#summary-filtering-functions}

एकिडना फझिंग मोहिमेदरम्यान कॉल करण्यासाठी फंक्शन्स ब्लॅकलिस्ट किंवा व्हाईटलिस्ट करू शकते, यासाठी याचा वापर केला जातो:

```yaml
filterBlacklist: true
filterFunctions: ["C.f1()", "C.f2()", "C.f3()"]
```

```sh
echidna contract.sol --config config.yaml
...
```

`filterBlacklist` बुलियनच्या मूल्यानुसार, एकिडना एकतर `C.f1()`, `C.f2()` आणि `C.f3()` ब्लॅकलिस्ट करून किंवा फक्त त्यांनाच कॉल करून फझिंग मोहीम सुरू करते.

## एकिडनासह Solidity च्या assert ची चाचणी कशी करावी {#how-to-test-soliditys-assert-with-echidna}

या छोट्या ट्युटोरिअलमध्ये, आम्ही कॉन्ट्रॅक्ट्समध्ये दृढकथन तपासणीची चाचणी करण्यासाठी एकिडना कसे वापरावे हे दाखवणार आहोत. समजा आपल्याकडे यासारखे एक कॉन्ट्रॅक्ट आहे:

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

Solidity 0.8 पासून, अंकगणितीय ओव्हरफ्लो डीफॉल्टनुसार पूर्ववत करणे होतात. `unchecked` ब्लॉक रॅपिंग वर्तन पुनर्संचयित करतो जेणेकरून `counter` ओव्हरफ्लो होऊ शकेल, जो बग आपल्याला एकिडनाने शोधावा असे वाटते.

### एक दृढकथन लिहा {#write-an-assertion}

आपल्याला हे सुनिश्चित करायचे आहे की `tmp` त्याचा फरक रिटर्न केल्यानंतर `counter` पेक्षा कमी किंवा समान आहे. आपण एकिडना प्रॉपर्टी लिहू शकतो, परंतु आपल्याला `tmp` मूल्य कुठेतरी साठवावे लागेल. त्याऐवजी, आपण यासारखे दृढकथन वापरू शकतो:

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

### एकिडना चालवा {#run-echidna-2}

दृढकथन अपयश चाचणी सक्षम करण्यासाठी, कमांड लाइनवर `--test-mode assertion` पास करा, किंवा एक [एकिडना कॉन्फिगरेशन फाइल](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml` तयार करा:

```yaml
testMode: assertion
```

जेव्हा आपण हे कॉन्ट्रॅक्ट एकिडनामध्ये चालवतो, तेव्हा आपल्याला अपेक्षित परिणाम मिळतात:

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

जसे तुम्ही पाहू शकता, एकिडना `inc` फंक्शनमध्ये काही दृढकथन अपयशाची तक्रार करते. प्रति फंक्शन एकापेक्षा जास्त दृढकथन जोडणे शक्य आहे, परंतु कोणते दृढकथन अयशस्वी झाले हे एकिडना सांगू शकत नाही.

### दृढकथने कधी आणि कशी वापरावीत {#when-and-how-use-assertions}

दृढकथने स्पष्ट प्रॉपर्टीजला पर्याय म्हणून वापरली जाऊ शकतात, विशेषतः जर तपासायच्या अटी काही ऑपरेशन `f` च्या योग्य वापराशी थेट संबंधित असतील. काही कोडनंतर दृढकथने जोडल्याने हे लागू होईल की त्याची अंमलबजावणी झाल्यानंतर लगेचच तपासणी होईल:

```solidity
function f(..) public {
    // काही गुंतागुंतीचा कोड
    ...
    assert (condition);
    ...
}

```

याउलट, स्पष्ट एकिडना प्रॉपर्टी वापरल्याने यादृच्छिकपणे व्यवहारांची अंमलबजावणी होईल आणि ते नेमके कधी तपासले जाईल हे लागू करण्याचा कोणताही सोपा मार्ग नाही. तरीही हा उपाय करणे शक्य आहे:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

तथापि, काही समस्या आहेत:

- जर `f` हे `internal` किंवा `external` म्हणून घोषित केले असेल तर ते अयशस्वी होते.
- `f` ला कॉल करण्यासाठी कोणते आर्ग्युमेंट्स वापरावेत हे अस्पष्ट आहे.
- जर `f` पूर्ववत करणे झाले, तर प्रॉपर्टी अयशस्वी होईल.

सर्वसाधारणपणे, आम्ही दृढकथने कशी वापरावीत यावरील [जॉन रेगेहर यांच्या शिफारसीचे](https://blog.regehr.org/archives/1091) पालन करण्याची शिफारस करतो:

- दृढकथन तपासणीदरम्यान कोणत्याही साइड इफेक्टची सक्ती करू नका. उदाहरणार्थ: `assert(ChangeStateAndReturn() == 1)`
- उघड विधानांचे दृढकथन करू नका. उदाहरणार्थ `assert(var >= 0)` जिथे `var` हे `uint` म्हणून घोषित केले आहे.

शेवटी, कृपया `assert` ऐवजी `require` **वापरू नका**, कारण एकिडना ते शोधू शकणार नाही (परंतु कॉन्ट्रॅक्ट तरीही पूर्ववत करणे होईल).

### सारांश: दृढकथन तपासणी {#summary-assertion-checking}

खालीलप्रमाणे आपल्या उदाहरणावरील एकिडनाच्या रनचा सारांश आहे:

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

एकिडनाला आढळले की जर या फंक्शनला मोठ्या आर्ग्युमेंट्ससह अनेक वेळा कॉल केले तर `inc` मधील दृढकथन अयशस्वी होऊ शकते.

## एकिडना कॉर्पस गोळा करणे आणि सुधारित करणे {#collecting-and-modifying-an-echidna-corpus}

एकिडनासह व्यवहारांचा कॉर्पस कसा गोळा करायचा आणि कसा वापरायचा ते आपण पाहू. लक्ष्य खालील स्मार्ट कॉन्ट्रॅक्ट [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol) आहे:

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

हे छोटे उदाहरण एकिडनाला स्थिती व्हेरिएबल बदलण्यासाठी विशिष्ट मूल्ये शोधण्यास भाग पाडते. फझरसाठी हे कठीण आहे.
याची पडताळणी करण्यासाठी आपण एकिडना चालवू शकतो:

```sh
echidna magic.sol
...

echidna_magic_values: passing
...
```

तथापि, ही फझिंग मोहीम चालवताना आपण कॉर्पस गोळा करण्यासाठी तरीही एकिडना वापरू शकतो.

### कॉर्पस गोळा करणे {#collecting-a-corpus}

कॉर्पस संकलन सक्षम करण्यासाठी, एक कॉर्पस डिरेक्टरी तयार करा:

```sh
mkdir corpus-magic
```

आणि एक [एकिडना कॉन्फिगरेशन फाइल](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml`:

```yaml
corpusDir: "corpus-magic"
```

आता आपण आपले टूल चालवू शकतो आणि गोळा केलेला कॉर्पस तपासू शकतो:

```sh
echidna magic.sol --config config.yaml
```

एकिडनाला अद्याप योग्य मॅजिक व्हॅल्यूज सापडत नाहीत. ते कुठे अडकते हे पाहण्यासाठी, `corpus-magic/covered.*.txt` कव्हरेज रिपोर्ट पहा:

```text
7 | *   |     function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
  8 | *r  |         require(magic_1 == 42);
  9 | *r  |         require(magic_2 == 129);
 10 | *r  |         require(magic_3 == magic_4 + 333);
 11 |     |         value_found = true;
 12 |     |         return;
```

`r` लेबलचा अर्थ असा आहे की एकिडना त्या ओळीपर्यंत पोहोचले परंतु अंमलबजावणी तिथे पूर्ववत करणे झाली, आणि शेवटच्या `require` नंतरच्या ओळी कधीही अंमलात आणल्या जात नाहीत.

एकिडनाने गोळा केलेले व्यवहारांचे क्रम `corpus-magic/coverage/` मध्ये JSON फाइल्स म्हणून साठवले जातात. उदाहरणार्थ, यापैकी एका फाइलचा पहिला व्यवहार असा होता:

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

स्पष्टपणे, हे इनपुट आपल्या प्रॉपर्टीमधील अपयश ट्रिगर करणार नाही. तथापि, पुढील चरणात, आपण त्यासाठी ते कसे सुधारायचे ते पाहू.

### कॉर्पस सीड करणे {#seeding-a-corpus}

`magic` फंक्शन हाताळण्यासाठी एकिडनाला काही मदतीची आवश्यकता आहे. आपण त्यासाठी योग्य पॅरामीटर्स वापरण्यासाठी इनपुट कॉपी आणि सुधारित करणार आहोत (फाइलची नावे यादृच्छिक आहेत, त्यामुळे तुमच्या स्वतःच्या `corpus-magic/coverage/` डिरेक्टरीमधील एक वापरा):

```sh
cp corpus-magic/coverage/249425678654647553.txt corpus-magic/coverage/new.txt
```

आपण `new.txt` मध्ये सुधारणा करू जेणेकरून त्यात `magic(42,129,333,0)` ला कॉल करणारा एकच व्यवहार असेल. आता, आपण एकिडना पुन्हा चालवू शकतो:

```sh
echidna magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    C.magic(42,129,333,0)

...
```

यावेळी, त्याला आढळले की प्रॉपर्टीचे त्वरित उल्लंघन झाले आहे.

## जास्त गॅस वापरणारे व्यवहार शोधणे {#finding-transactions-with-high-gas-consumption}

एकिडनासह जास्त गॅस वापरणारे व्यवहार कसे शोधायचे ते आपण पाहू. एकिडनाच्या जुन्या आवृत्त्यांमध्ये यासाठी `estimateGas` पर्याय होता; तो एकिडना 2.3.0 मध्ये काढून टाकण्यात आला. त्याऐवजी, आपण `gasleft()` सह गॅस मोजतो आणि एकिडनाच्या [ऑप्टिमायझेशन मोडला](https://secure-contracts.com/program-analysis/echidna/advanced/optimization_mode.html) ते जास्तीत जास्त करू देतो. लक्ष्य खालील स्मार्ट कॉन्ट्रॅक्ट आहे:

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

येथे `expensive` मध्ये गॅसचा मोठा वापर होऊ शकतो.

### गॅसचा वापर मोजणे {#measuring-gas-consumption}

ऑप्टिमायझेशन मोडमध्ये, एकिडना `echidna_` ने सुरू होणारी फंक्शन्स शोधते जी कोणतेही आर्ग्युमेंट घेत नाहीत आणि `int256` रिटर्न करतात, आणि रिटर्न केलेले मूल्य जास्तीत जास्त वाढवणारा व्यवहारांचा क्रम शोधण्याचा प्रयत्न करते. आपण एक चाचणी कॉन्ट्रॅक्ट जोडतो जे `f` ला कॉल करते, त्याने वापरलेला गॅस रेकॉर्ड करते आणि जास्तीत जास्त मूल्य उघड करते (दोन्ही कॉन्ट्रॅक्ट्स `gas.sol` मध्ये सेव्ह करा):

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

ऑप्टिमायझेशन मोड सक्षम करण्यासाठी, एक कॉन्फिगरेशन फाइल `config.yaml` तयार करा. या उदाहरणात, परिणाम समजण्यास सोपे करण्यासाठी आपण व्यवहारांच्या क्रमाचा आकार देखील कमी करू:

```yaml
testMode: optimization
seqLen: 2
```

### एकिडना चालवा {#run-echidna-3}

एकदा आपण कॉन्फिगरेशन फाइल तयार केली की, आपण एकिडना याप्रमाणे चालवू शकतो:

```sh
echidna gas.sol --contract TestGas --config config.yaml
...
echidna_opt_gas_f: max value: 127128

  Call sequence:
    TestGas.measureF(42,123,223)

...
```

- दर्शविलेला गॅस एकिडना ज्या इथरियम व्हर्च्युअल मशीन (EVM) अंमलबजावणीवर चालते, [hevm](https://github.com/argotorg/hevm) द्वारे मोजला जातो आणि त्यात `measureF` मधील अंतर्गत कॉलच्या ओव्हरहेडचा समावेश असतो.
- जास्तीत जास्त मूल्य अद्वितीय नसते: प्रत्येक मोहीम यादृच्छिक असते, आणि लांब मोहिमा (उदाहरणार्थ `--test-limit 200000`) मोठी मूल्ये शोधण्याकडे कल दर्शवतात.

### गॅस कमी करणारे कॉल्स फिल्टर करणे {#filtering-out-gas-reducing-calls}

वरील **फझिंग मोहिमेदरम्यान कॉल करण्यासाठी फंक्शन्स फिल्टर करणे** यावरील ट्युटोरिअल तुमच्या चाचणीमधून काही फंक्शन्स कशी काढून टाकायची हे दाखवते.  
अचूक गॅस अंदाज मिळवण्यासाठी हे महत्त्वपूर्ण असू शकते.
खालील उदाहरणाचा विचार करा:

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

`echidna_opt_gas_check` हे `check` ला कॉल करते आणि त्याची गॅस किंमत रिटर्न करते. प्रत्येक एकिडना चाचणी फंक्शनप्रमाणे, त्याचे स्थिती बदल नंतर काढून टाकले जातात.

जर एकिडना सर्व फंक्शन्सना कॉल करू शकत असेल, तर त्याला जास्त गॅस किंमत असलेले व्यवहार सहज सापडणार नाहीत:

```sh
echidna pushpop.sol --test-mode optimization
...
echidna_opt_gas_check: max value: 265706
...
```

कारण किंमत `addrs` च्या आकारावर अवलंबून असते आणि यादृच्छिक कॉल्स अ‍ॅरे जवळजवळ रिकामा ठेवण्याकडे कल दर्शवतात.
तथापि, `pop` आणि `clear` ब्लॅकलिस्ट केल्याने आपल्याला खूप चांगले परिणाम मिळतात:

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

या परिणामासाठी कॉल क्रम संकुचित करण्यासाठी अनेक मिनिटे लागतात, कारण प्रत्येक रिप्ले महागड्या `check` फंक्शनला कॉल करतो.

### सारांश: जास्त गॅस वापरणारे व्यवहार शोधणे {#summary-finding-transactions-with-high-gas-consumption}

एकिडना `echidna_` फंक्शनमध्ये `gasleft()` सह गॅस मोजून जास्त गॅस वापरणारे व्यवहार शोधू शकते जे `int256` रिटर्न करते, आणि ऑप्टिमायझेशन मोडमध्ये चालते:

```yaml
testMode: optimization
```

```sh
echidna contract.sol --config config.yaml
...
```

फझिंग मोहीम संपल्यानंतर, एकिडना सापडलेले जास्तीत जास्त मूल्य आणि ते तयार करणाऱ्या व्यवहारांच्या क्रमाची तक्रार करेल.
