---
title: "आप जितना कैश कर सकते हैं"
description: सस्ते रोलअप लेन-देन के लिए कैशिंग अनुबंध बनाना और उसका उपयोग करना सीखें
author: ओरी पोमेरेंट्ज़
tags: ["लेयर 2", "कैशिंग", "स्टोरेज", "स्केलिंग"]
skill: intermediate
breadcrumb: रोलअप्स के लिए कैशिंग
published: 2022-09-15
lang: hi
---

रोलअप्स का उपयोग करते समय लेन-देन में एक बाइट की लागत स्टोरेज स्लॉट की लागत से बहुत अधिक महंगी होती है। इसलिए, ऑनचेन पर अधिक से अधिक जानकारी कैश करना समझदारी है।

इस लेख में आप सीखेंगे कि कैशिंग अनुबंध कैसे बनाया और उपयोग किया जाए ताकि कोई भी पैरामीटर मान जिसका कई बार उपयोग होने की संभावना है, उसे कैश किया जा सके और (पहली बार के बाद) बहुत कम बाइट्स के साथ उपयोग के लिए उपलब्ध कराया जा सके, और इस कैश का उपयोग करने वाला ऑफचेन कोड कैसे लिखा जाए।

यदि आप लेख को छोड़ना चाहते हैं और केवल स्रोत कोड देखना चाहते हैं, तो [यह यहाँ है](https://github.com/qbzzt/20220915-all-you-can-cache)। डेवलपमेंट स्टैक [Foundry](https://getfoundry.sh/introduction/installation/) है।

## समग्र डिज़ाइन {#overall-design}

सरलता के लिए हम मान लेंगे कि सभी लेन-देन पैरामीटर `uint256` हैं, जो 32 बाइट्स लंबे हैं। जब हमें कोई लेन-देन प्राप्त होता है, तो हम प्रत्येक पैरामीटर को इस प्रकार पार्स करेंगे:

1. यदि पहला बाइट `0xFF` है, तो अगले 32 बाइट्स को पैरामीटर मान के रूप में लें और इसे कैश में लिखें।

2. यदि पहला बाइट `0xFE` है, तो अगले 32 बाइट्स को पैरामीटर मान के रूप में लें लेकिन इसे कैश में _न_ लिखें।

3. किसी भी अन्य मान के लिए, शीर्ष चार बिट्स को अतिरिक्त बाइट्स की संख्या के रूप में लें, और निचले चार बिट्स को कैश कुंजी के सबसे महत्वपूर्ण बिट्स के रूप में लें। यहाँ कुछ उदाहरण दिए गए हैं:

   | कॉल डेटा में बाइट्स | कैश कुंजी |
   | :---------------- | --------: |
   | 0x0F              |      0x0F |
   | 0x10,0x10         |      0x10 |
   | 0x12,0xAC         |    0x02AC |
   | 0x2D,0xEA, 0xD6   |  0x0DEAD6 |

## कैश हेरफेर {#cache-manipulation}

कैश को [`Cache.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol) में लागू किया गया है। आइए इसे पंक्ति दर पंक्ति समझते हैं।

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

इन स्थिरांकों का उपयोग उन विशेष मामलों की व्याख्या करने के लिए किया जाता है जहाँ हम सभी जानकारी प्रदान करते हैं और या तो इसे कैश में लिखना चाहते हैं या नहीं। कैश में लिखने के लिए पहले से अप्रयुक्त स्टोरेज स्लॉटों में दो [`SSTORE`](https://www.evm.codes/#55) ऑपरेशनों की आवश्यकता होती है, जिनमें से प्रत्येक की लागत 22100 गैस होती है, इसलिए हम इसे वैकल्पिक बनाते हैं।

```solidity

    mapping(uint => uint) public val2key;
```

मानों और उनकी कुंजियों के बीच एक [मैपिंग](https://www.geeksforgeeks.org/solidity/solidity-mappings/)। लेन-देन भेजने से पहले मानों को एन्कोड करने के लिए यह जानकारी आवश्यक है।

```solidity
    // स्थान n में कुंजी n+1 का मान है, क्योंकि हमें संरक्षित करने की आवश्यकता है
    // शून्य को "कैश में नहीं" के रूप में।
    uint[] public key2val;
```

हम कुंजियों से मानों की मैपिंग के लिए एक ऐरे का उपयोग कर सकते हैं क्योंकि हम कुंजियाँ निर्दिष्ट करते हैं, और सरलता के लिए हम इसे क्रमिक रूप से करते हैं।

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "Reading uninitialize cache entry");
        return key2val[_key-1];
    }  // cacheRead
```

कैश से एक मान पढ़ें।

```solidity
    // यदि कोई मान पहले से कैश में नहीं है, तो उसे कैश में लिखें
    // परीक्षण को काम करने में सक्षम बनाने के लिए केवल सार्वजनिक (public) है
    function cacheWrite(uint _value) public returns (uint) {
        // यदि मान पहले से ही कैश में है, तो वर्तमान कुंजी लौटाएं
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```

एक ही मान को कैश में एक से अधिक बार रखने का कोई मतलब नहीं है। यदि मान पहले से ही वहाँ है, तो बस मौजूदा कुंजी वापस कर दें।

```solidity
        // चूंकि 0xFE एक विशेष मामला है, इसलिए सबसे बड़ी कुंजी जिसे कैश
        // रख सकता है वह 0x0D है जिसके बाद 15 0xFF हैं। यदि कैश की लंबाई पहले से ही इतनी
        // बड़ी है, तो विफल हो जाएं।
        //                              1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "cache overflow");
```

मुझे नहीं लगता कि हमें कभी इतना बड़ा कैश मिलेगा (लगभग 1.8\*10<sup>37</sup> प्रविष्टियाँ, जिन्हें स्टोर करने के लिए लगभग 10<sup>27</sup> TB की आवश्यकता होगी)। हालाँकि, मैं इतना पुराना हूँ कि मुझे याद है ["640kB हमेशा पर्याप्त होगा"](https://quoteinvestigator.com/2011/09/08/640k-enough/)। यह परीक्षण बहुत सस्ता है।

```solidity
        // अगली कुंजी का उपयोग करके मान लिखें
        val2key[_value] = key2val.length+1;
```

रिवर्स लुकअप जोड़ें (मान से कुंजी तक)।

```solidity
        key2val.push(_value);
```

फॉरवर्ड लुकअप जोड़ें (कुंजी से मान तक)। चूँकि हम मानों को क्रमिक रूप से निर्दिष्ट करते हैं, इसलिए हम इसे अंतिम ऐरे मान के बाद जोड़ सकते हैं।

```solidity
        return key2val.length;
    }  // cacheWrite
```

`key2val` की नई लंबाई वापस करें, जो वह सेल है जहाँ नया मान संग्रहीत किया जाता है।

```solidity
    function _calldataVal(uint startByte, uint length)
        private pure returns (uint)
```

यह फ़ंक्शन मनमानी लंबाई (32 बाइट्स तक, शब्द का आकार) के कॉल डेटा से एक मान पढ़ता है।

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "_calldataVal length limit is 32 bytes");
        require(length + startByte <= msg.data.length,
            "_calldataVal trying to read beyond calldatasize");
```

यह फ़ंक्शन आंतरिक है, इसलिए यदि बाकी कोड सही ढंग से लिखा गया है तो इन परीक्षणों की आवश्यकता नहीं है। हालाँकि, इनकी लागत अधिक नहीं है इसलिए हम इन्हें रख सकते हैं।

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

यह कोड [Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html) में है। यह कॉल डेटा से 32 बाइट मान पढ़ता है। यह तब भी काम करता है जब कॉल डेटा `startByte+32` से पहले रुक जाता है क्योंकि EVM में अप्रारंभीकृत स्थान को शून्य माना जाता है।

```solidity
        _retVal = _retVal >> (256-length*8);
```

हमें आवश्यक रूप से 32 बाइट मान नहीं चाहिए। यह अतिरिक्त बाइट्स से छुटकारा दिलाता है।

```solidity
        return _retVal;
    } // _calldataVal


    // कॉल डेटा से एक एकल पैरामीटर पढ़ें, जो _fromByte से शुरू होता है
    function _readParam(uint _fromByte) internal
        returns (uint _nextByte, uint _parameterValue)
    {
```

कॉल डेटा से एक एकल पैरामीटर पढ़ें। ध्यान दें कि हमें न केवल वह मान वापस करना है जो हमने पढ़ा है, बल्कि अगले बाइट का स्थान भी वापस करना है क्योंकि पैरामीटर 1 बाइट से लेकर 33 बाइट्स तक लंबे हो सकते हैं।

```solidity
        // पहला बाइट हमें बताता है कि बाकी की व्याख्या कैसे करें
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

Solidity संभावित रूप से खतरनाक [निहित प्रकार के रूपांतरणों](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions) को रोककर बग्स की संख्या को कम करने का प्रयास करता है। एक डाउनग्रेड, उदाहरण के लिए 256 बिट्स से 8 बिट्स तक, स्पष्ट होना चाहिए।

```solidity

        // मान पढ़ें, लेकिन इसे कैश में न लिखें
        if (_firstByte == uint8(DONT_CACHE))
            return(_fromByte+33, _calldataVal(_fromByte+1, 32));

        // मान पढ़ें, और इसे कैश में लिखें
        if (_firstByte == uint8(INTO_CACHE)) {
            uint _param = _calldataVal(_fromByte+1, 32);
            cacheWrite(_param);
            return(_fromByte+33, _param);
        }

        // यदि हम यहाँ पहुँच गए हैं तो इसका मतलब है कि हमें कैश से पढ़ने की आवश्यकता है

        // पढ़ने के लिए अतिरिक्त बाइट्स की संख्या
        uint8 _extraBytes = _firstByte / 16;
```

निचले [निबल](https://en.wikipedia.org/wiki/Nibble) को लें और कैश से मान पढ़ने के लिए इसे अन्य बाइट्स के साथ मिलाएँ।

```solidity
        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) +
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    }  // _readParam


    // n पैरामीटर पढ़ें (फ़ंक्शंस जानते हैं कि वे कितने पैरामीटर की अपेक्षा करते हैं)
    function _readParams(uint _paramNum) internal returns (uint[] memory) {
```

हम कॉल डेटा से ही हमारे पास मौजूद पैरामीटरों की संख्या प्राप्त कर सकते हैं, लेकिन जो फ़ंक्शन हमें कॉल करते हैं वे जानते हैं कि वे कितने पैरामीटरों की अपेक्षा करते हैं। उन्हें हमें बताने देना आसान है।

```solidity
        // हमारे द्वारा पढ़े गए पैरामीटर
        uint[] memory params = new uint[](_paramNum);

        // पैरामीटर बाइट 4 से शुरू होते हैं, उससे पहले यह फ़ंक्शन सिग्नेचर है
        uint _atByte = 4;

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

जब तक आपके पास आवश्यक संख्या न हो तब तक पैरामीटर पढ़ें। यदि हम कॉल डेटा के अंत से आगे जाते हैं, तो `_readParams` कॉल को रिवर्ट कर देगा।

```solidity

        return(params);
    }   // readParams

    // _readParams के परीक्षण के लिए, चार पैरामीटर पढ़ने का परीक्षण करें
    function fourParam() public
        returns (uint256,uint256,uint256,uint256)
    {
        uint[] memory params;
        params = _readParams(4);
        return (params[0], params[1], params[2], params[3]);
    }    // fourParam
```

Foundry का एक बड़ा फायदा यह है कि यह परीक्षणों को Solidity में लिखने की अनुमति देता है ([नीचे कैश का परीक्षण देखें](#testing-the-cache))। इससे यूनिट परीक्षण बहुत आसान हो जाते हैं। यह एक फ़ंक्शन है जो चार पैरामीटर पढ़ता है और उन्हें वापस करता है ताकि परीक्षण सत्यापित कर सके कि वे सही थे।

```solidity
    // एक मान प्राप्त करें, बाइट्स लौटाएं जो इसे एन्कोड करेंगे (यदि संभव हो तो कैश का उपयोग करके)
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal` एक फ़ंक्शन है जिसे ऑफचेन कोड कॉल डेटा बनाने में मदद करने के लिए कॉल करता है जो कैश का उपयोग करता है। यह एक एकल मान प्राप्त करता है और इसे एन्कोड करने वाले बाइट्स वापस करता है। यह फ़ंक्शन एक `view` है, इसलिए इसे लेन-देन की आवश्यकता नहीं होती है और बाहरी रूप से कॉल किए जाने पर कोई गैस खर्च नहीं होती है।

```solidity
        uint _key = val2key[_val];

        // मान अभी तक कैश में नहीं है, इसे जोड़ें
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

[EVM](/developers/docs/evm/) में सभी अप्रारंभीकृत स्टोरेज को शून्य माना जाता है। इसलिए यदि हम किसी ऐसे मान की कुंजी खोजते हैं जो वहाँ नहीं है, तो हमें शून्य मिलता है। उस स्थिति में इसे एन्कोड करने वाले बाइट्स `INTO_CACHE` होते हैं (ताकि अगली बार इसे कैश किया जा सके), जिसके बाद वास्तविक मान होता है।

```solidity
        // यदि कुंजी <0x10 है, तो इसे एकल बाइट के रूप में लौटाएं
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```

सिंगल बाइट्स सबसे आसान हैं। हम बस `bytes<n>` प्रकार को बाइट ऐरे में बदलने के लिए [`bytes.concat`](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat) का उपयोग करते हैं जो किसी भी लंबाई का हो सकता है। नाम के बावजूद, यह केवल एक तर्क प्रदान किए जाने पर ठीक काम करता है।

```solidity
        // दो बाइट मान, 0x1vvv के रूप में एन्कोड किया गया
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

जब हमारे पास 16<sup>3</sup> से कम की कुंजी होती है, तो हम इसे दो बाइट्स में व्यक्त कर सकते हैं। हम पहले `_key` को, जो 256 बिट मान है, 16 बिट मान में बदलते हैं और पहले बाइट में अतिरिक्त बाइट्स की संख्या जोड़ने के लिए लॉजिकल OR का उपयोग करते हैं। फिर हम इसे `bytes2` मान में बदल देते हैं, जिसे `bytes` में बदला जा सकता है।

```solidity
        // निम्नलिखित पंक्तियों को लूप के रूप में करने का शायद कोई चतुर तरीका है,
        // लेकिन यह एक व्यू (view) फ़ंक्शन है इसलिए मैं प्रोग्रामर के समय और
        // सरलता के लिए अनुकूलन कर रहा हूँ।

        if (_key < 16*256**2)
            return bytes.concat(bytes3(uint24(_key) | (0x2 * 16 * 256**2)));
        if (_key < 16*256**3)
            return bytes.concat(bytes4(uint32(_key) | (0x3 * 16 * 256**3)));
             .
             .
             .
        if (_key < 16*256**14)
            return bytes.concat(bytes15(uint120(_key) | (0xE * 16 * 256**14)));
        if (_key < 16*256**15)
            return bytes.concat(bytes16(uint128(_key) | (0xF * 16 * 256**15)));
```

अन्य मानों (3 बाइट्स, 4 बाइट्स, आदि) को उसी तरह से संभाला जाता है, बस अलग-अलग फ़ील्ड आकारों के साथ।

```solidity
        // अगर हम यहाँ पहुँचते हैं, तो कुछ गलत है।
        revert("Error in encodeVal, should not happen");
```

यदि हम यहाँ पहुँचते हैं तो इसका मतलब है कि हमें एक कुंजी मिली है जो 16\*256<sup>15</sup> से कम नहीं है। लेकिन `cacheWrite` कुंजियों को सीमित करता है इसलिए हम 14\*256<sup>16</sup> तक भी नहीं पहुँच सकते (जिसका पहला बाइट 0xFE होगा, इसलिए यह `DONT_CACHE` जैसा दिखेगा)। लेकिन भविष्य के प्रोग्रामर द्वारा बग पेश किए जाने की स्थिति में परीक्षण जोड़ने में हमें अधिक लागत नहीं आती है।

```solidity
    } // encodeVal

}  // Cache
```

### कैश का परीक्षण {#testing-the-cache}

Foundry के फायदों में से एक यह है कि [यह आपको Solidity में परीक्षण लिखने देता है](https://getfoundry.sh/forge/tests/overview/), जिससे यूनिट परीक्षण लिखना आसान हो जाता है। `Cache` क्लास के लिए परीक्षण [यहाँ](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol) हैं। चूँकि परीक्षण कोड दोहराव वाला होता है, जैसा कि परीक्षणों में होता है, यह लेख केवल दिलचस्प हिस्सों की व्याख्या करता है।

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// कंसोल के लिए `forge test -vv` चलाने की आवश्यकता है।
import "forge-std/console.sol";
```

यह केवल बॉयलरप्लेट है जो परीक्षण पैकेज और `console.log` का उपयोग करने के लिए आवश्यक है।

```solidity
import "src/Cache.sol";
```

हमें उस अनुबंध को जानना होगा जिसका हम परीक्षण कर रहे हैं।

```solidity
contract CacheTest is Test {
    Cache cache;

    function setUp() public {
        cache = new Cache();
    }
```

`setUp` फ़ंक्शन को प्रत्येक परीक्षण से पहले कॉल किया जाता है। इस मामले में हम बस एक नया कैश बनाते हैं, ताकि हमारे परीक्षण एक-दूसरे को प्रभावित न करें।

```solidity
    function testCaching() public {
```

परीक्षण वे फ़ंक्शन हैं जिनके नाम `test` से शुरू होते हैं। यह फ़ंक्शन बुनियादी कैश कार्यक्षमता की जाँच करता है, मान लिखता है और उन्हें फिर से पढ़ता है।

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

इस तरह आप [`assert...` फ़ंक्शनों](https://getfoundry.sh/reference/forge-std/std-assertions/) का उपयोग करके वास्तविक परीक्षण करते हैं। इस मामले में, हम जाँचते हैं कि जो मान हमने लिखा है वही हमने पढ़ा है। हम `cache.cacheWrite` के परिणाम को छोड़ सकते हैं क्योंकि हम जानते हैं कि कैश कुंजियाँ रैखिक रूप से निर्दिष्ट की जाती हैं।

```solidity
        }
    }    // testCaching


    // एक ही मान को कई बार कैश करें, सुनिश्चित करें कि कुंजी वही
    // रहे
    function testRepeatCaching() public {
        for(uint i=1; i<100; i++) {
            uint _key1 = cache.cacheWrite(i);
            uint _key2 = cache.cacheWrite(i);
            assertEq(_key1, _key2);
        }
```

पहले हम प्रत्येक मान को कैश में दो बार लिखते हैं और सुनिश्चित करते हैं कि कुंजियाँ समान हैं (जिसका अर्थ है कि दूसरी बार लिखना वास्तव में नहीं हुआ)।

```solidity
        for(uint i=1; i<100; i+=3) {
            uint _key = cache.cacheWrite(i);
            assertEq(_key, i);
        }
    }    // testRepeatCaching
```

सिद्धांत रूप में एक बग हो सकता है जो लगातार कैश लिखने को प्रभावित नहीं करता है। इसलिए यहाँ हम कुछ ऐसे मान लिखते हैं जो लगातार नहीं हैं और देखते हैं कि मान अभी भी फिर से नहीं लिखे गए हैं।

```solidity
    // मेमोरी बफर से एक uint पढ़ें (यह सुनिश्चित करने के लिए कि हमें वे पैरामीटर वापस मिलें
    // जो हमने भेजे थे)
    function toUint256(bytes memory _bytes, uint256 _start) internal pure
        returns (uint256)
```

`bytes memory` बफ़र से 256 बिट शब्द पढ़ें। यह उपयोगिता फ़ंक्शन हमें यह सत्यापित करने देता है कि जब हम कैश का उपयोग करने वाले फ़ंक्शन कॉल को चलाते हैं तो हमें सही परिणाम मिलते हैं।

```solidity
    {
        require(_bytes.length >= _start + 32, "toUint256_outOfBounds");
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
```

Yul `uint256` से परे डेटा संरचनाओं का समर्थन नहीं करता है, इसलिए जब आप अधिक परिष्कृत डेटा संरचना का संदर्भ देते हैं, जैसे कि मेमोरी बफ़र `_bytes`, तो आपको उस संरचना का पता मिलता है। Solidity `bytes memory` मानों को 32 बाइट शब्द के रूप में संग्रहीत करता है जिसमें लंबाई होती है, जिसके बाद वास्तविक बाइट्स होते हैं, इसलिए बाइट संख्या `_start` प्राप्त करने के लिए हमें `_bytes+32+_start` की गणना करने की आवश्यकता है।

```solidity

        return tempUint;
    }     // toUint256

    // fourParams() के लिए फ़ंक्शन सिग्नेचर, सौजन्य से
    // https://www.4byte.directory/signatures/?bytes4_signature=0x3edc1e6d
    bytes4 constant FOUR_PARAMS = 0x3edc1e6d;

    // यह देखने के लिए कि हमें सही मान वापस मिल रहे हैं, बस कुछ स्थिर (constant) मान
    uint256 constant VAL_A = 0xDEAD60A7;
    uint256 constant VAL_B =     0xBEEF;
    uint256 constant VAL_C =     0x600D;
    uint256 constant VAL_D = 0x600D60A7;
```

परीक्षण के लिए हमें कुछ स्थिरांकों की आवश्यकता है।

```solidity
    function testReadParam() public {
```

यह परीक्षण करने के लिए कि हम पैरामीटरों को सही ढंग से पढ़ सकते हैं, `fourParams()` को कॉल करें, जो एक फ़ंक्शन है जो `readParams` का उपयोग करता है।

```solidity
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;
```

हम कैश का उपयोग करके किसी फ़ंक्शन को कॉल करने के लिए सामान्य ABI तंत्र का उपयोग नहीं कर सकते हैं, इसलिए हमें निम्न स्तर के [`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html#members-of-addresses) तंत्र का उपयोग करने की आवश्यकता है। वह तंत्र इनपुट के रूप में `bytes memory` लेता है, और उसे (साथ ही एक बूलियन मान) आउटपुट के रूप में वापस करता है।

```solidity
        // पहली कॉल, कैश खाली है
        _callInput = bytes.concat(
            FOUR_PARAMS,
```

एक ही अनुबंध के लिए कैश्ड फ़ंक्शन (सीधे लेन-देन से कॉल के लिए) और गैर-कैश्ड फ़ंक्शन (अन्य स्मार्ट अनुबंधों से कॉल के लिए) दोनों का समर्थन करना उपयोगी है। ऐसा करने के लिए हमें सब कुछ [एक `fallback` फ़ंक्शन](https://docs.soliditylang.org/en/v0.8.16/contracts.html#fallback-function) में रखने के बजाय, सही फ़ंक्शन को कॉल करने के लिए Solidity तंत्र पर निर्भर रहना जारी रखना होगा। ऐसा करने से संयोजकता बहुत आसान हो जाती है। अधिकांश मामलों में फ़ंक्शन की पहचान करने के लिए एक बाइट पर्याप्त होगा, इसलिए हम तीन बाइट्स (16\*3=48 गैस) बर्बाद कर रहे हैं। हालाँकि, जब मैं यह लिख रहा हूँ तो उन 48 गैस की कीमत 0.07 सेंट है, जो सरल, कम बग प्रवण कोड की उचित लागत है।

```solidity
            // पहला मान, इसे कैश में जोड़ें
            cache.INTO_CACHE(),
            bytes32(VAL_A),
```

पहला मान: एक ध्वज जो कहता है कि यह एक पूर्ण मान है जिसे कैश में लिखा जाना चाहिए, जिसके बाद मान के 32 बाइट्स होते हैं। अन्य तीन मान समान हैं, सिवाय इसके कि `VAL_B` कैश में नहीं लिखा गया है और `VAL_C` तीसरा पैरामीटर और चौथा दोनों है।

```solidity
             .
             .
             .
        );
        (_success, _callOutput) = _cacheAddr.call(_callInput);
```

यहीं पर हम वास्तव में `Cache` अनुबंध को कॉल करते हैं।

```solidity
        assertEq(_success, true);
```

हम उम्मीद करते हैं कि कॉल सफल होगी।

```solidity
        assertEq(cache.cacheRead(1), VAL_A);
        assertEq(cache.cacheRead(2), VAL_C);
```

हम एक खाली कैश से शुरू करते हैं और फिर `VAL_A` जोड़ते हैं जिसके बाद `VAL_C` होता है। हम उम्मीद करेंगे कि पहले वाले की कुंजी 1 होगी, और दूसरे वाले की 2 होगी।

```
assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_C);
```

आउटपुट चार पैरामीटर हैं। यहाँ हम सत्यापित करते हैं कि यह सही है।

```solidity
        // दूसरी कॉल, हम कैश का उपयोग कर सकते हैं
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // कैश में पहला मान
            bytes1(0x01),
```

16 से नीचे की कैश कुंजियाँ केवल एक बाइट की होती हैं।

```solidity
            // दूसरा मान, इसे कैश में न जोड़ें
            cache.DONT_CACHE(),
            bytes32(VAL_B),

            // तीसरा और चौथा मान, समान मान
            bytes1(0x02),
            bytes1(0x02)
        );
        .
        .
        .
    }   // testReadParam
```

कॉल के बाद के परीक्षण पहली कॉल के बाद के परीक्षणों के समान हैं।

```solidity
    function testEncodeVal() public {
```

यह फ़ंक्शन `testReadParam` के समान है, सिवाय इसके कि पैरामीटरों को स्पष्ट रूप से लिखने के बजाय हम `encodeVal()` का उपयोग करते हैं।

```solidity
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(VAL_A),
            cache.encodeVal(VAL_B),
            cache.encodeVal(VAL_C),
            cache.encodeVal(VAL_D)
        );
        .
        .
        .
        assertEq(_callInput.length, 4+1*4);
    }   // testEncodeVal
```

`testEncodeVal()` में एकमात्र अतिरिक्त परीक्षण यह सत्यापित करना है कि `_callInput` की लंबाई सही है। पहली कॉल के लिए यह 4+33\*4 है। दूसरे के लिए, जहाँ प्रत्येक मान पहले से ही कैश में है, यह 4+1\*4 है।

```solidity
    // जब कुंजी एक बाइट से अधिक हो तो encodeVal का परीक्षण करें
    // अधिकतम तीन बाइट्स क्योंकि कैश को चार बाइट्स तक भरने में
    // बहुत अधिक समय लगता है।
    function testEncodeValBig() public {
        // कैश में कई मान रखें।
        // चीजों को सरल रखने के लिए, मान n के लिए कुंजी n का उपयोग करें।
        for(uint i=1; i<0x1FFF; i++) {
            cache.cacheWrite(i);
        }
```

ऊपर दिया गया `testEncodeVal` फ़ंक्शन केवल चार मानों को कैश में लिखता है, इसलिए [फ़ंक्शन का वह भाग जो मल्टी-बाइट मानों से संबंधित है](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol#L144-L171) उसकी जाँच नहीं की जाती है। लेकिन वह कोड जटिल और त्रुटि-प्रवण है।

इस फ़ंक्शन का पहला भाग एक लूप है जो 1 से 0x1FFF तक के सभी मानों को क्रम में कैश में लिखता है, ताकि हम उन मानों को एन्कोड कर सकें और जान सकें कि वे कहाँ जा रहे हैं।

```solidity
        .
        .
        .

        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(0x000F),   // एक बाइट        0x0F
            cache.encodeVal(0x0010),   // दो बाइट्स     0x1010
            cache.encodeVal(0x0100),   // दो बाइट्स     0x1100
            cache.encodeVal(0x1000)    // तीन बाइट्स 0x201000
        );
```

एक बाइट, दो बाइट और तीन बाइट मानों का परीक्षण करें। हम उससे आगे परीक्षण नहीं करते हैं क्योंकि पर्याप्त स्टैक प्रविष्टियाँ (कम से कम 0x10000000, लगभग एक चौथाई बिलियन) लिखने में बहुत अधिक समय लगेगा।

```solidity
        .
        .
        .
        .
    }    // testEncodeValBig


    // परीक्षण करें कि अत्यधिक छोटे बफर के साथ हमें एक रिवर्ट मिलता है
    function testShortCalldata() public {
```

परीक्षण करें कि असामान्य स्थिति में क्या होता है जहाँ पर्याप्त पैरामीटर नहीं होते हैं।

```solidity
        .
        .
        .
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, false);
    }   // testShortCalldata
```

चूँकि यह रिवर्ट होता है, इसलिए हमें जो परिणाम मिलना चाहिए वह `false` है।

```
// उन कैश कुंजियों के साथ कॉल करें जो वहाँ नहीं हैं
    function testNoCacheKey() public {
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // पहला मान, इसे कैश में जोड़ें
            cache.INTO_CACHE(),
            bytes32(VAL_A),

            // दूसरा मान
            bytes1(0x0F),
            bytes2(0x1234),
            bytes11(0xA10102030405060708090A)
        );
```

इस फ़ंक्शन को चार पूरी तरह से वैध पैरामीटर मिलते हैं, सिवाय इसके कि कैश खाली है इसलिए वहाँ पढ़ने के लिए कोई मान नहीं है।

```solidity
        .
        .
        .
    // परीक्षण करें कि अत्यधिक लंबे बफर के साथ सब कुछ ठीक काम करता है
    function testLongCalldata() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // पहली कॉल, कैश खाली है
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // पहला मान, इसे कैश में जोड़ें
            cache.INTO_CACHE(), bytes32(VAL_A),

            // दूसरा मान, इसे कैश में जोड़ें
            cache.INTO_CACHE(), bytes32(VAL_B),

            // तीसरा मान, इसे कैश में जोड़ें
            cache.INTO_CACHE(), bytes32(VAL_C),

            // चौथा मान, इसे कैश में जोड़ें
            cache.INTO_CACHE(), bytes32(VAL_D),

            // और "गुड लक" के लिए एक और मान
            bytes4(0x31112233)
        );
```

यह फ़ंक्शन पाँच मान भेजता है। हम जानते हैं कि पाँचवें मान को अनदेखा कर दिया जाता है क्योंकि यह एक वैध कैश प्रविष्टि नहीं है, जिसे शामिल न किए जाने पर रिवर्ट हो जाता।

```solidity
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, true);
        .
        .
        .
    }   // testLongCalldata

}        // CacheTest

```

## एक नमूना एप्लिकेशन {#a-sample-app}

Solidity में परीक्षण लिखना बहुत अच्छी बात है, लेकिन अंततः एक विकेंद्रीकृत एप्लिकेशन (dapp) को उपयोगी होने के लिए चेन के बाहर से अनुरोधों को संसाधित करने में सक्षम होना चाहिए। यह लेख प्रदर्शित करता है कि `WORM` के साथ एक dapp में कैशिंग का उपयोग कैसे किया जाए, जिसका अर्थ है "एक बार लिखें, कई बार पढ़ें" (Write Once, Read Many)। यदि कोई कुंजी अभी तक नहीं लिखी गई है, तो आप उसमें एक मान लिख सकते हैं। यदि कुंजी पहले से ही लिखी गई है, तो आपको एक रिवर्ट मिलता है।

### अनुबंध {#the-contract}

[यह अनुबंध है](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/WORM.sol)। यह अधिकतर वही दोहराता है जो हमने पहले ही `Cache` और `CacheTest` के साथ किया है, इसलिए हम केवल उन हिस्सों को कवर करते हैं जो दिलचस्प हैं।

```solidity
import "./Cache.sol";

contract WORM is Cache {
```

`Cache` का उपयोग करने का सबसे आसान तरीका इसे हमारे अपने अनुबंध में इनहेरिट करना है।

```solidity
    function writeEntryCached() external {
        uint[] memory params = _readParams(2);
        writeEntry(params[0], params[1]);
    }    // writeEntryCached
```

यह फ़ंक्शन ऊपर `CacheTest` में `fourParam` के समान है। चूँकि हम ABI विनिर्देशों का पालन नहीं करते हैं, इसलिए फ़ंक्शन में किसी भी पैरामीटर की घोषणा न करना सबसे अच्छा है।

```solidity
    // हमें कॉल करना आसान बनाएं
    // writeEntryCached() के लिए फ़ंक्शन सिग्नेचर, सौजन्य से
    // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3
    bytes4 constant public WRITE_ENTRY_CACHED = 0xe4e4f2d3;
```

`writeEntryCached` को कॉल करने वाले बाहरी कोड को `worm.writeEntryCached` का उपयोग करने के बजाय मैन्युअल रूप से कॉल डेटा बनाना होगा, क्योंकि हम ABI विनिर्देशों का पालन नहीं करते हैं। इस स्थिर मान का होना इसे लिखना आसान बनाता है।

ध्यान दें कि भले ही हम `WRITE_ENTRY_CACHED` को एक स्थिति चर के रूप में परिभाषित करते हैं, इसे बाहरी रूप से पढ़ने के लिए इसके लिए गेटर फ़ंक्शन, `worm.WRITE_ENTRY_CACHED()` का उपयोग करना आवश्यक है।

```solidity
    function readEntry(uint key) public view
        returns (uint _value, address _writtenBy, uint _writtenAtBlock)
```

रीड फ़ंक्शन एक `view` है, इसलिए इसे लेन-देन की आवश्यकता नहीं होती है और इसमें गैस खर्च नहीं होती है। परिणामस्वरूप, पैरामीटर के लिए कैश का उपयोग करने का कोई लाभ नहीं है। व्यू फ़ंक्शन के साथ मानक तंत्र का उपयोग करना सबसे अच्छा है जो सरल है।

### परीक्षण कोड {#the-testing-code}

[यह अनुबंध के लिए परीक्षण कोड है](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/WORM.t.sol)। फिर से, आइए केवल उसी पर नज़र डालें जो दिलचस्प है।

```solidity
    function testWReadWrite() public {
        worm.writeEntry(0xDEAD, 0x60A7);

        vm.expectRevert(bytes("entry already written"));
        worm.writeEntry(0xDEAD, 0xBEEF);
```

[इस तरह (`vm.expectRevert`)](https://book.getfoundry.sh/cheatcodes/expect-revert#expectrevert) हम Foundry परीक्षण में निर्दिष्ट करते हैं कि अगली कॉल विफल होनी चाहिए, और विफलता का रिपोर्ट किया गया कारण क्या है। यह तब लागू होता है जब हम कॉल डेटा बनाने और निम्न स्तर के इंटरफ़ेस (`<contract>.call()`, आदि) का उपयोग करके अनुबंध को कॉल करने के बजाय `<contract>.<function name>()` सिंटैक्स का उपयोग करते हैं।

```solidity
    function testReadWriteCached() public {
        uint cacheGoat = worm.cacheWrite(0x60A7);
```

यहाँ हम इस तथ्य का उपयोग करते हैं कि `cacheWrite` कैश कुंजी वापस करता है। यह कुछ ऐसा नहीं है जिसकी हम उत्पादन में उपयोग करने की उम्मीद करेंगे, क्योंकि `cacheWrite` स्थिति को बदलता है, और इसलिए इसे केवल लेन-देन के दौरान ही कॉल किया जा सकता है। लेन-देन में रिटर्न मान नहीं होते हैं, यदि उनके परिणाम होते हैं तो उन परिणामों को घटनाएँ के रूप में उत्सर्जित किया जाना चाहिए। इसलिए `cacheWrite` रिटर्न मान केवल ऑनचेन कोड से ही सुलभ है, और ऑनचेन कोड को पैरामीटर कैशिंग की आवश्यकता नहीं होती है।

```solidity
        (_success,) = address(worm).call(_callInput);
```

इस तरह हम Solidity को बताते हैं कि जबकि `<contract address>.call()` के दो रिटर्न मान हैं, हमें केवल पहले वाले की परवाह है।

```solidity
        (_success,) = address(worm).call(_callInput);
        assertEq(_success, false);
```

चूँकि हम निम्न स्तर के `<address>.call()` फ़ंक्शन का उपयोग करते हैं, इसलिए हम `vm.expectRevert()` का उपयोग नहीं कर सकते हैं और हमें कॉल से मिलने वाले बूलियन सफलता मान को देखना होगा।

```solidity
    event EntryWritten(uint indexed key, uint indexed value);

        .
        .
        .

        _callInput = bytes.concat(
            worm.WRITE_ENTRY_CACHED(), worm.encodeVal(a), worm.encodeVal(b));
        vm.expectEmit(true, true, false, false);
        emit EntryWritten(a, b);
        (_success,) = address(worm).call(_callInput);
```

इस तरह हम सत्यापित करते हैं कि कोड Foundry में [किसी घटना को सही ढंग से उत्सर्जित करता है](https://getfoundry.sh/reference/cheatcodes/expect-emit/)।

### क्लाइंट {#the-client}
Solidity परीक्षणों के साथ आपको एक चीज़ जो नहीं मिलती है वह है JavaScript कोड जिसे आप अपने स्वयं के एप्लिकेशन में कट और पेस्ट कर सकते हैं। उस कोड को लिखने के लिए मैंने WORM को [ऑप्टिमिज़्म गोएर्ली](https://community.optimism.io/docs/useful-tools/networks/#optimism-goerli) पर तैनात किया, जो [ऑप्टिमिज़्म](https://www.optimism.io/) का नया टेस्टनेट है। यह [`0xd34335b1d818cee54e3323d3246bd31d94e6a78a`](https://goerli-optimism.etherscan.io/address/0xd34335b1d818cee54e3323d3246bd31d94e6a78a) पते पर है।

[आप यहाँ क्लाइंट के लिए JavaScript कोड देख सकते हैं](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/javascript/index.js)। इसका उपयोग करने के लिए:

1. गिट रिपॉजिटरी को क्लोन करें:

   ```sh
   git clone https://github.com/qbzzt/20220915-all-you-can-cache.git
   ```

2. आवश्यक पैकेज स्थापित करें:

   ```sh
   cd javascript
   yarn
   ```

3. कॉन्फ़िगरेशन फ़ाइल कॉपी करें:

   ```sh
   cp .env.example .env
   ```

4. अपने कॉन्फ़िगरेशन के लिए `.env` को संपादित करें:

   | पैरामीटर           | मान                                                                                                                                                               |
   | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | MNEMONIC            | एक खाते के लिए निमोनिक (mnemonic) जिसमें लेन-देन का भुगतान करने के लिए पर्याप्त ETH है। [आप यहाँ ऑप्टिमिज़्म गोएर्ली नेटवर्क के लिए मुफ्त ETH प्राप्त कर सकते हैं](https://optimismfaucet.xyz/)। |
   | OPTIMISM_GOERLI_URL | ऑप्टिमिज़्म गोएर्ली का URL। सार्वजनिक एंडपॉइंट, `https://goerli.optimism.io`, दर सीमित है लेकिन यहाँ हमें जो चाहिए उसके लिए पर्याप्त है                                      |

5. `index.js` चलाएँ।

   ```sh
   node index.js
   ```

   यह नमूना एप्लिकेशन पहले WORM में एक प्रविष्टि लिखता है, कॉल डेटा और Etherscan पर लेन-देन का लिंक प्रदर्शित करता है। फिर यह उस प्रविष्टि को वापस पढ़ता है, और इसके द्वारा उपयोग की जाने वाली कुंजी और प्रविष्टि में मान (मान, ब्लॉक संख्या और लेखक) प्रदर्शित करता है।

अधिकांश क्लाइंट सामान्य Dapp JavaScript है। इसलिए फिर से हम केवल दिलचस्प हिस्सों पर ही चर्चा करेंगे।

```javascript
.
.
.
const main = async () => {
    const func = await worm.WRITE_ENTRY_CACHED()

    // हर बार एक नई कुंजी की आवश्यकता है
    const key = await worm.encodeVal(Number(new Date()))
```

किसी दिए गए स्लॉट में केवल एक बार ही लिखा जा सकता है, इसलिए हम यह सुनिश्चित करने के लिए टाइमस्टैम्प का उपयोग करते हैं कि हम स्लॉटों का पुन: उपयोग न करें।

```javascript
const val = await worm.encodeVal("0x600D")

// एक प्रविष्टि (entry) लिखें
const calldata = func + key.slice(2) + val.slice(2)
```

Ethers उम्मीद करता है कि कॉल डेटा एक हेक्स स्ट्रिंग होगा, `0x` जिसके बाद हेक्साडेसिमल अंकों की एक सम संख्या होगी। चूँकि `key` और `val` दोनों `0x` से शुरू होते हैं, इसलिए हमें उन हेडर को हटाने की आवश्यकता है।

```javascript
const tx = await worm.populateTransaction.writeEntryCached()
tx.data = calldata

sentTx = await wallet.sendTransaction(tx)
```

Solidity परीक्षण कोड की तरह, हम सामान्य रूप से कैश्ड फ़ंक्शन को कॉल नहीं कर सकते हैं। इसके बजाय, हमें निम्न स्तर के तंत्र का उपयोग करने की आवश्यकता है।

```javascript
    .
    .
    .
    // अभी लिखी गई प्रविष्टि पढ़ें
    const realKey = '0x' + key.slice(4)  // FF फ़्लैग हटाएँ
    const entryRead = await worm.readEntry(realKey)
    .
    .
    .
```

प्रविष्टियों को पढ़ने के लिए हम सामान्य तंत्र का उपयोग कर सकते हैं। `view` फ़ंक्शनों के साथ पैरामीटर कैशिंग का उपयोग करने की कोई आवश्यकता नहीं है।

## निष्कर्ष {#conclusion}

इस लेख में दिया गया कोड एक अवधारणा का प्रमाण (proof of concept) है, जिसका उद्देश्य विचार को समझने में आसान बनाना है। उत्पादन के लिए तैयार सिस्टम के लिए आप कुछ अतिरिक्त कार्यक्षमता लागू करना चाह सकते हैं:

- उन मानों को संभालें जो `uint256` नहीं हैं। उदाहरण के लिए, स्ट्रिंग्स।
- वैश्विक कैश के बजाय, शायद उपयोगकर्ताओं और कैश के बीच एक मैपिंग हो। अलग-अलग उपयोगकर्ता अलग-अलग मानों का उपयोग करते हैं।
- पतों के लिए उपयोग किए जाने वाले मान अन्य उद्देश्यों के लिए उपयोग किए जाने वाले मानों से भिन्न होते हैं। केवल पतों के लिए एक अलग कैश रखना समझदारी हो सकती है।
- वर्तमान में, कैश कुंजियाँ "पहले आओ, सबसे छोटी कुंजी" एल्गोरिदम पर हैं। पहले सोलह मानों को एक बाइट के रूप में भेजा जा सकता है। अगले 4080 मानों को दो बाइट्स के रूप में भेजा जा सकता है। अगले लगभग दस लाख मान तीन बाइट्स हैं, आदि। एक उत्पादन प्रणाली को कैश प्रविष्टियों पर उपयोग काउंटर रखना चाहिए और उन्हें पुनर्गठित करना चाहिए ताकि सोलह _सबसे आम_ मान एक बाइट हों, अगले 4080 सबसे आम मान दो बाइट्स हों, आदि।

  हालाँकि, यह संभावित रूप से एक खतरनाक ऑपरेशन है। घटनाओं के निम्नलिखित क्रम की कल्पना करें:

  1. नोम नाइव (Noam Naive) उस पते को एन्कोड करने के लिए `encodeVal` को कॉल करता है जिस पर वह टोकन भेजना चाहता है। वह पता एप्लिकेशन पर उपयोग किए जाने वाले पहले पतों में से एक है, इसलिए एन्कोड किया गया मान 0x06 है। यह एक `view` फ़ंक्शन है, लेन-देन नहीं, इसलिए यह नोम और उसके द्वारा उपयोग किए जाने वाले नोड के बीच है, और किसी और को इसके बारे में पता नहीं है

  2. ओवेन ओनर (Owen Owner) कैश पुनर्व्यवस्थापन ऑपरेशन चलाता है। वास्तव में बहुत कम लोग उस पते का उपयोग करते हैं, इसलिए अब इसे 0x201122 के रूप में एन्कोड किया गया है। एक अलग मान, 10<sup>18</sup>, को 0x06 निर्दिष्ट किया गया है।

  3. नोम नाइव अपने टोकन 0x06 पर भेजता है। वे `0x0000000000000000000000000de0b6b3a7640000` पते पर जाते हैं, और चूँकि कोई भी उस पते के लिए निजी कुंजी नहीं जानता है, वे बस वहीं फँस जाते हैं। नोम _खुश नहीं_ है।

  इस समस्या को हल करने के तरीके हैं, और कैश पुनर्व्यवस्थापन के दौरान मेमपूल में मौजूद लेन-देन की संबंधित समस्या को भी, लेकिन आपको इसके बारे में पता होना चाहिए।

मैंने यहाँ ऑप्टिमिज़्म के साथ कैशिंग का प्रदर्शन किया, क्योंकि मैं एक ऑप्टिमिज़्म कर्मचारी हूँ और यह वह रोलअप है जिसे मैं सबसे अच्छी तरह जानता हूँ। लेकिन इसे किसी भी रोलअप के साथ काम करना चाहिए जो आंतरिक प्रसंस्करण के लिए न्यूनतम लागत लेता है, ताकि तुलना में लेन-देन डेटा को लेयर 1 (l1) पर लिखना प्रमुख खर्च हो।

[मेरे और काम के लिए यहाँ देखें](https://cryptodocguy.pro/)।