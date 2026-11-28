---
title: "सुरक्षा उपायों (Safety Rails) के साथ ERC-20"
description: "लोगों को छोटी-मोटी गलतियों से बचने में कैसे मदद करें"
author: "ओरी पोमेरेंट्ज़"
lang: hi
tags: ["erc-20"]
skill: beginner
breadcrumb: "ERC-20 सुरक्षा"
published: 2022-08-15
---

## परिचय {#introduction}

इथेरियम के बारे में एक अच्छी बात यह है कि कोई केंद्रीय प्राधिकरण नहीं है जो आपके लेन-देन को संशोधित या पूर्ववत (undo) कर सके। इथेरियम के साथ एक बड़ी समस्या यह है कि उपयोगकर्ता की गलतियों या अवैध लेन-देन को पूर्ववत करने की शक्ति वाला कोई केंद्रीय प्राधिकरण नहीं है। इस लेख में आप उन कुछ सामान्य गलतियों के बारे में जानेंगे जो उपयोगकर्ता [ERC-20](/developers/docs/standards/tokens/erc-20/) टोकन के साथ करते हैं, साथ ही ऐसे ERC-20 अनुबंध कैसे बनाएं जो उपयोगकर्ताओं को उन गलतियों से बचने में मदद करें, या जो किसी केंद्रीय प्राधिकरण को कुछ शक्ति दें (उदाहरण के लिए खातों को फ्रीज करने के लिए)।

ध्यान दें कि हालांकि हम [OpenZeppelin ERC-20 टोकन अनुबंध](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20) का उपयोग करेंगे, यह लेख इसे बहुत विस्तार से नहीं समझाता है। आप यह जानकारी [यहाँ](/developers/tutorials/erc20-annotated-code) पा सकते हैं।

यदि आप पूरा स्रोत कोड देखना चाहते हैं:

1. [Remix IDE](https://remix.ethereum.org/) खोलें।
2. क्लोन GitHub आइकन (![clone github icon](icon-clone.png)) पर क्लिक करें।
3. GitHub रिपॉजिटरी `https://github.com/qbzzt/20220815-erc20-safety-rails` को क्लोन करें।
4. **contracts > erc20-safety-rails.sol** खोलें।

ध्यान दें कि रिपॉजिटरी OpenZeppelin Contracts 4.7.2 के लिए लिखी गई थी, जहाँ इस लेख द्वारा ओवरराइड किए जाने वाले फ़ंक्शन को `_beforeTokenTransfer` कहा जाता है। यह लेख वर्तमान OpenZeppelin Contracts 5.x का उपयोग करता है, जहाँ आप इसके बजाय `_update` को ओवरराइड करते हैं, इसलिए इस लेख का कोड रिपॉजिटरी के कोड से थोड़ा अलग है।

## एक ERC-20 अनुबंध बनाना {#creating-an-erc-20-contract}

सुरक्षा उपाय (safety rail) कार्यक्षमता जोड़ने से पहले हमें एक ERC-20 अनुबंध की आवश्यकता है। इस लेख में हम [OpenZeppelin Contracts Wizard](https://docs.openzeppelin.com/contracts/5.x/wizard) का उपयोग करेंगे। इसे किसी अन्य ब्राउज़र में खोलें और इन निर्देशों का पालन करें:

1. **ERC20** चुनें।
2. ये सेटिंग्स दर्ज करें:

   | पैरामीटर (Parameter) | मान (Value) |
   | -------------- | ------------------------- |
   | Name           | SafetyRailsToken          |
   | Symbol         | SAFE                      |
   | Premint        | 1000                      |
   | Features       | None (**Permit** को अनचेक करें) |
   | Access Control | Ownable                   |
   | Upgradability  | None                      |

3. ऊपर स्क्रॉल करें और **Open in Remix** (Remix के लिए) या किसी भिन्न वातावरण का उपयोग करने के लिए **Download** पर क्लिक करें। मैं यह मानकर चल रहा हूँ कि आप Remix का उपयोग कर रहे हैं, यदि आप किसी और चीज़ का उपयोग करते हैं तो बस उचित परिवर्तन करें।
4. अब हमारे पास पूरी तरह से काम करने वाला ERC-20 अनुबंध है। आप आयातित (imported) कोड देखने के लिए `.deps` > `npm` का विस्तार कर सकते हैं।
5. अनुबंध को संकलित (compile) करें, तैनात करें (deploy), और इसके साथ खेलकर देखें कि यह ERC-20 अनुबंध के रूप में कार्य करता है। यदि आपको यह सीखने की आवश्यकता है कि Remix का उपयोग कैसे करें, तो [इस ट्यूटोरियल का उपयोग करें](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth)।

## सामान्य गलतियाँ {#common-mistakes}

### गलतियाँ {#the-mistakes}

उपयोगकर्ता कभी-कभी गलत पते पर टोकन भेज देते हैं। हालांकि हम यह जानने के लिए उनका दिमाग नहीं पढ़ सकते कि वे क्या करना चाहते थे, दो प्रकार की त्रुटियां हैं जो बहुत होती हैं और जिनका पता लगाना आसान है:

1. अनुबंध के स्वयं के पते पर टोकन भेजना। उदाहरण के लिए, [ऑप्टिमिज़्म (Optimism) के OP टोकन](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) ने दो महीने से भी कम समय में [120,000 से अधिक](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) OP टोकन जमा कर लिए। यह धन की एक महत्वपूर्ण राशि का प्रतिनिधित्व करता है जिसे संभवतः लोगों ने खो दिया है।

2. टोकन को एक खाली पते पर भेजना, जो किसी [बाहरी रूप से स्वामित्व वाले खाते (externally owned account - EOA)](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) या [स्मार्ट अनुबंध](/developers/docs/smart-contracts) से मेल नहीं खाता है। हालांकि मेरे पास इस बात के आंकड़े नहीं हैं कि ऐसा कितनी बार होता है, [एक घटना में 20,000,000 टोकन का नुकसान हो सकता था](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595)।

### ट्रांसफर को रोकना {#preventing-transfers}

OpenZeppelin ERC-20 अनुबंध में शेष राशि (balances) में हर बदलाव, चाहे वह ट्रांसफर हो, मिंट हो, या बर्न हो, [एक आंतरिक फ़ंक्शन, `_update`](https://docs.openzeppelin.com/contracts/5.x/api/token/erc20#ERC20-_update-address-address-uint256-) के माध्यम से होता है। हम अपनी खुद की कार्यक्षमता को इस पर जोड़ने के लिए इसे ओवरराइड कर सकते हैं, जैसे कि ऐसे चेक जो कोई समस्या होने पर रिवर्ट कर देते हैं।

ऐसा करने के लिए, कंस्ट्रक्टर के बाद यह फ़ंक्शन जोड़ें:

```solidity
    function _update(address from, address to, uint256 value)
        internal virtual
        override(ERC20)
    {
        super._update(from, to, value);
    }
```

यदि आप Solidity से बहुत परिचित नहीं हैं तो इस फ़ंक्शन के कुछ भाग नए हो सकते हैं:

```solidity
        internal virtual
```

`virtual` कीवर्ड का अर्थ है कि जिस तरह हमने `ERC20` से कार्यक्षमता प्राप्त (inherit) की और इस फ़ंक्शन को ओवरराइड किया, उसी तरह अन्य अनुबंध हमसे इनहेरिट कर सकते हैं और इस फ़ंक्शन को ओवरराइड कर सकते हैं।

```solidity
        override(ERC20)
```

हमें स्पष्ट रूप से निर्दिष्ट करना होगा कि हम `_update` की ERC20 टोकन परिभाषा को [ओवरराइड](https://docs.soliditylang.org/en/latest/contracts.html#function-overriding) कर रहे हैं। सामान्य तौर पर, सुरक्षा के दृष्टिकोण से, स्पष्ट परिभाषाएँ निहित (implicit) परिभाषाओं की तुलना में बहुत बेहतर होती हैं - यदि कोई चीज़ आपके ठीक सामने है तो आप यह नहीं भूल सकते कि आपने कुछ किया है। यही कारण है कि हमें यह निर्दिष्ट करने की आवश्यकता है कि हम किस सुपरक्लास के `_update` को ओवरराइड कर रहे हैं।

```solidity
        super._update(from, to, value);
```

यह लाइन उस अनुबंध या अनुबंधों के `_update` फ़ंक्शन को कॉल करती है जिससे हमने इनहेरिट किया है और जिसमें यह मौजूद है। इस मामले में, वह केवल `ERC20` है, `Ownable` में यह फ़ंक्शन नहीं है। एक खाली हुक के विपरीत, `ERC20._update` वह है जो वास्तव में टोकन को स्थानांतरित करता है, इसलिए इसे कॉल करना आवश्यक है। हमारे चेक इस कॉल से पहले जाते हैं, ताकि वे किसी भी शेष राशि में बदलाव से पहले रिवर्ट कर सकें।

### आवश्यकताओं की कोडिंग {#coding-the-requirements}

हम फ़ंक्शन में इन आवश्यकताओं को जोड़ना चाहते हैं। क्योंकि जब टोकन बर्न किए जाते हैं तब भी `_update` को कॉल किया जाता है, जिसमें `to` को `address(0)` पर सेट किया जाता है, हम `to` की जांच केवल तभी करते हैं जब यह `address(0)` न हो:

- `to` पता `address(this)` के बराबर नहीं हो सकता, जो कि स्वयं ERC-20 अनुबंध का पता है।
- `to` पता खाली नहीं हो सकता, यह इनमें से कोई एक होना चाहिए:
  - एक बाह्य स्वामित्व वाला खाता (EOA)। हम सीधे यह जांच नहीं कर सकते कि कोई पता EOA है या नहीं, लेकिन हम किसी पते के ETH बैलेंस की जांच कर सकते हैं। EOA में लगभग हमेशा बैलेंस होता है, भले ही उनका अब उपयोग न किया जा रहा हो - उन्हें अंतिम Wei तक खाली करना मुश्किल है।
  - एक स्मार्ट अनुबंध। यह परीक्षण करना कि कोई पता स्मार्ट अनुबंध है या नहीं, थोड़ा कठिन है। एक ऑपकोड है जो बाहरी कोड की लंबाई की जांच करता है, जिसे [`EXTCODESIZE`](https://www.evm.codes/#3b) कहा जाता है। Solidity में आप इसे [`<address>.code.length`](https://docs.soliditylang.org/en/latest/units-and-global-variables.html#members-of-address-types) के साथ प्राप्त कर सकते हैं, जिसे कंपाइलर `EXTCODESIZE` में बदल देता है। यहाँ हम [Yul](https://docs.soliditylang.org/en/latest/yul.html) का उपयोग करते हैं, जो EVM असेंबली है, यह दिखाने के लिए कि ऑपकोड को सीधे कैसे कॉल किया जाए। ध्यान दें कि [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) के बाद से एक EOA में कोड (एक अनुबंध का प्रत्यायोजन) भी हो सकता है, इसलिए यह चेक कोड वाले खातों की पहचान करता है, न कि सख्ती से अनुबंधों की। हमारे उद्देश्य के लिए, खाली पतों को अस्वीकार करना, यह ठीक है।

यहाँ पूरा फ़ंक्शन दिया गया है:

```solidity
    function _update(address from, address to, uint256 value)
        internal virtual
        override(ERC20)
    {
        // बर्न करने पर टोकन पता(0) पर भेजे जाते हैं, इसे ब्लॉक न करें
        if (to != address(0)) {
            require(to != address(this), "Can't send tokens to the contract address");

            bool isToContract;
            assembly {
               isToContract := gt(extcodesize(to), 0)
            }

            require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
        }

        super._update(from, to, value);
    }
```

आइए नए कोड को लाइन दर लाइन समझें:

```solidity
        require(to != address(this), "Can't send tokens to the contract address");
```

यह पहली आवश्यकता है, जांचें कि `to` और `this(address)` एक ही चीज़ नहीं हैं।

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

इस तरह हम जांचते हैं कि कोई पता अनुबंध है या नहीं। हम सीधे Yul से आउटपुट प्राप्त नहीं कर सकते, इसलिए इसके बजाय हम परिणाम को रखने के लिए एक चर (variable) परिभाषित करते हैं (इस मामले में `isToContract`)। Yul जिस तरह से काम करता है वह यह है कि हर ऑपकोड को एक फ़ंक्शन माना जाता है। इसलिए पहले हम अनुबंध का आकार प्राप्त करने के लिए [`EXTCODESIZE`](https://www.evm.codes/#3b) को कॉल करते हैं, और फिर यह जांचने के लिए [`GT`](https://www.evm.codes/#11) का उपयोग करते हैं कि यह शून्य नहीं है (हम अनसाइंड इंटिजर्स के साथ काम कर रहे हैं, इसलिए निश्चित रूप से यह नकारात्मक नहीं हो सकता)। फिर हम परिणाम को `isToContract` में लिखते हैं।

```solidity
        require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
```

और अंत में, हमारे पास खाली पतों के लिए वास्तविक चेक है।

## प्रशासनिक एक्सेस {#admin-access}

कभी-कभी एक प्रशासक का होना उपयोगी होता है जो गलतियों को सुधार सके। दुरुपयोग की संभावना को कम करने के लिए, यह प्रशासक एक [मल्टीसिग](https://blog.logrocket.com/security-choices-multi-signature-wallets/) हो सकता है ताकि कई लोगों को किसी कार्रवाई पर सहमत होना पड़े। इस लेख में हमारे पास दो प्रशासनिक विशेषताएं होंगी:

1. खातों को फ्रीज और अनफ्रीज करना। यह उपयोगी हो सकता है, उदाहरण के लिए, जब किसी खाते से समझौता (compromise) किया गया हो।
2. एसेट क्लीनअप (संपत्ति की सफाई)।

   कभी-कभी धोखेबाज वैधता हासिल करने के लिए असली टोकन के अनुबंध में धोखाधड़ी वाले टोकन भेजते हैं। उदाहरण के लिए, [यहाँ देखें](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders)। वैध ERC-20 अनुबंध [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042) है। जो घोटाला इसका दिखावा करता है वह [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe) है।

   यह भी संभव है कि लोग गलती से हमारे अनुबंध में वैध ERC-20 टोकन भेज दें, जो उन्हें बाहर निकालने का एक तरीका चाहने का एक और कारण है।

ओपनजेपेलिन प्रशासनिक एक्सेस को सक्षम करने के लिए दो तंत्र प्रदान करता है:

- [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) अनुबंधों का एक ही मालिक होता है। जिन फ़ंक्शन्स में `onlyOwner` [मॉडिफायर](https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers) होता है, उन्हें केवल उसी मालिक द्वारा कॉल किया जा सकता है। मालिक स्वामित्व को किसी और को ट्रांसफर कर सकते हैं या इसे पूरी तरह से त्याग सकते हैं। अन्य सभी खातों के अधिकार आमतौर पर समान होते हैं।
- [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) अनुबंधों में [रोल बेस्ड एक्सेस कंट्रोल (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control) होता है।

सरलता के लिए, इस लेख में हम `Ownable` का उपयोग करते हैं।

### अनुबंधों को फ्रीज और अनफ्रीज (thaw) करना {#freezing-and-thawing-contracts}

अनुबंधों को फ्रीज और अनफ्रीज (thaw) करने के लिए कई बदलावों की आवश्यकता होती है:

- यह ट्रैक करने के लिए कि कौन से पते फ्रीज हैं, पतों से [बूलियन (booleans)](https://en.wikipedia.org/wiki/Boolean_data_type) तक एक [मैपिंग (mapping)](https://docs.soliditylang.org/en/latest/types.html#mapping-types)। सभी मान शुरू में शून्य होते हैं, जिसे बूलियन मानों के लिए गलत (false) के रूप में समझा जाता है। हम यही चाहते हैं क्योंकि डिफ़ॉल्ट रूप से खाते फ्रीज नहीं होते हैं।

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- जब कोई खाता फ्रीज या अनफ्रीज होता है तो किसी भी इच्छुक व्यक्ति को सूचित करने के लिए [इवेंट](https://docs.soliditylang.org/en/latest/contracts.html#events)। तकनीकी रूप से कहें तो इन कार्यों के लिए इवेंट की आवश्यकता नहीं होती है, लेकिन यह ऑफचेन कोड को इन इवेंट को सुनने और यह जानने में मदद करता है कि क्या हो रहा है। जब कुछ ऐसा होता है जो किसी और के लिए प्रासंगिक हो सकता है, तो स्मार्ट अनुबंध के लिए उन्हें एमिट (emit) करना अच्छा शिष्टाचार माना जाता है।

  इवेंट अनुक्रमित (indexed) होते हैं इसलिए उन सभी समयों को खोजना संभव होगा जब किसी खाते को फ्रीज या अनफ्रीज किया गया हो।

  ```solidity
    // जब खाते फ्रीज या अनफ्रीज किए जाते हैं
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- खातों को फ्रीज और अनफ्रीज करने के लिए फ़ंक्शन। ये दोनों फ़ंक्शन लगभग समान हैं, इसलिए हम केवल फ्रीज फ़ंक्शन पर चर्चा करेंगे।

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  [`public`](https://docs.soliditylang.org/en/latest/contracts.html#function-visibility) के रूप में चिह्नित फ़ंक्शन को अन्य स्मार्ट अनुबंधों से या सीधे किसी लेन-देन द्वारा कॉल किया जा सकता है।

  ```solidity
    {
        require(!frozenAccounts[addr], "Account already frozen");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // खाता फ्रीज करना
  ```

  यदि खाता पहले से ही फ्रीज है, तो रिवर्ट करें। अन्यथा, इसे फ्रीज करें और एक इवेंट `emit` करें।

- किसी फ्रीज किए गए खाते से पैसे को स्थानांतरित होने से रोकने के लिए `_update` को बदलें। ध्यान दें कि पैसे को अभी भी फ्रीज किए गए खाते में ट्रांसफर किया जा सकता है। इस लाइन को फ़ंक्शन की शुरुआत में, `if` ब्लॉक के बाहर रखें, ताकि यह फ्रीज किए गए खाते से टोकन बर्न करने से भी रोके।

  ```solidity
       require(!frozenAccounts[from], "The account is frozen");
  ```

### एसेट क्लीनअप {#asset-cleanup}

इस अनुबंध द्वारा रखे गए ERC-20 टोकन को जारी करने के लिए हमें उस टोकन अनुबंध पर एक फ़ंक्शन कॉल करने की आवश्यकता है जिससे वे संबंधित हैं, या तो [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) या [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve)। इस मामले में भत्ते (allowances) पर गैस बर्बाद करने का कोई मतलब नहीं है, हम सीधे ट्रांसफर भी कर सकते हैं।

```solidity
    function cleanupERC20(
        address erc20,
        address dest
    )
        public
        onlyOwner
    {
        IERC20 token = IERC20(erc20);
```

जब हमें पता प्राप्त होता है तो अनुबंध के लिए एक ऑब्जेक्ट बनाने का यह सिंटैक्स है। इसका उपयोग करने के लिए हमें [IERC20 की परिभाषा](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) की आवश्यकता है, जो OpenZeppelin ERC-20 अनुबंध के लिए इंटरफ़ेस है। विज़ार्ड की `import {ERC20} from ...` लाइन केवल `ERC20` लाती है, इसलिए फ़ाइल के शीर्ष पर अन्य आयात (imports) के आगे यह लाइन जोड़ें:

```solidity
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

यह एक क्लीनअप फ़ंक्शन है, इसलिए संभवतः हम कोई टोकन नहीं छोड़ना चाहते हैं। उपयोगकर्ता से मैन्युअल रूप से बैलेंस प्राप्त करने के बजाय, हम इस प्रक्रिया को स्वचालित भी कर सकते हैं।

## निष्कर्ष {#conclusion}

यह एक आदर्श समाधान नहीं है - "उपयोगकर्ता ने गलती की" समस्या का कोई आदर्श समाधान नहीं है। हालाँकि, इस प्रकार के चेक का उपयोग करने से कम से कम कुछ गलतियों को रोका जा सकता है। खातों को फ्रीज करने की क्षमता, हालांकि खतरनाक है, हैकर को चोरी किए गए फंड से वंचित करके कुछ हैक के नुकसान को सीमित करने के लिए उपयोग की जा सकती है।

[मेरे और काम के लिए यहाँ देखें](https://cryptodocguy.pro/)।
