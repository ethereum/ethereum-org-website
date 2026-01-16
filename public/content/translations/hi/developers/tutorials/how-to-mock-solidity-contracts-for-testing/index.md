---
title: परीक्षण के लिए Solidity स्मार्ट अनुबंधों को कैसे मॉक करें
description: परीक्षण करते समय आपको अपने अनुबंधों का मज़ाक क्यों उड़ाना चाहिए
author: Markus Waas
lang: hi
tags: [ "सोलिडीटी", "स्मार्ट अनुबंध", "परिक्षण", "मॉक करना" ]
skill: intermediate
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[मॉक ऑब्जेक्ट](https://wikipedia.org/wiki/Mock_object) ऑब्जेक्ट-ओरिएंटेड प्रोग्रामिंग में एक सामान्य डिज़ाइन पैटर्न हैं। यह पुराने फ्रांसीसी शब्द 'mocquer' से आया है, जिसका अर्थ है 'मज़ाक उड़ाना', और यह 'किसी वास्तविक चीज़ की नकल करने' के रूप में विकसित हुआ, जो वास्तव में हम प्रोग्रामिंग में करते हैं। कृपया केवल तभी अपने स्मार्ट अनुबंधों का मज़ाक उड़ाएँ जब आप चाहें, लेकिन जब भी संभव हो उन्हें मॉक करें। यह आपके जीवन को आसान बनाता है।

## मॉक्स के साथ अनुबंधों का यूनिट-परीक्षण {#unit-testing-contracts-with-mocks}

किसी अनुबंध को मॉक करने का अनिवार्य रूप से मतलब है उस अनुबंध का दूसरा संस्करण बनाना जो मूल अनुबंध के समान ही व्यवहार करता है, लेकिन इस तरह से कि डेवलपर द्वारा आसानी से नियंत्रित किया जा सके। आप अक्सर जटिल अनुबंधों के साथ काम करते हैं जहाँ आप केवल [अनुबंध के छोटे हिस्सों का यूनिट-परीक्षण करना](/developers/docs/smart-contracts/testing/) चाहते हैं। समस्या यह है कि क्या होगा यदि इस छोटे से हिस्से का परीक्षण करने के लिए एक बहुत ही विशिष्ट अनुबंध स्थिति की आवश्यकता हो जिसमें पहुँचना मुश्किल हो?

आप हर बार एक जटिल परीक्षण सेटअप लॉजिक लिख सकते हैं जो अनुबंध को आवश्यक स्थिति में लाता है या आप एक मॉक लिख सकते हैं। इनहेरिटेंस के साथ किसी अनुबंध को मॉक करना आसान है। बस एक दूसरा मॉक अनुबंध बनाएँ जो मूल अनुबंध से इनहेरिट करता हो। अब आप अपने मॉक में फंक्शन को ओवरराइड कर सकते हैं। आइए इसे एक उदाहरण के साथ देखें।

## उदाहरण: निजी ERC20 {#example-private-erc20}

हम एक उदाहरण ERC-20 अनुबंध का उपयोग करते हैं जिसमें एक प्रारंभिक निजी समय होता है। मालिक निजी यूज़र को प्रबंधित कर सकता है और शुरुआत में केवल उन्हें ही टोकन प्राप्त करने की अनुमति होगी। एक निश्चित समय बीत जाने के बाद, सभी को टोकन का उपयोग करने की अनुमति होगी। यदि आप उत्सुक हैं, तो हम नए OpenZeppelin अनुबंध v3 से [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) हुक का उपयोग कर रहे हैं।

```solidity
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PrivateERC20 is ERC20, Ownable {
    mapping (address => bool) public isPrivateUser;
    uint256 private publicAfterTime;

    constructor(uint256 privateERC20timeInSec) ERC20("PrivateERC20", "PRIV") public {
        publicAfterTime = now + privateERC20timeInSec;
    }

    function addUser(address user) external onlyOwner {
        isPrivateUser[user] = true;
    }

    function isPublic() public view returns (bool) {
        return now >= publicAfterTime;
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);

        require(_validRecipient(to), "PrivateERC20: invalid recipient");
    }

    function _validRecipient(address to) private view returns (bool) {
        if (isPublic()) {
            return true;
        }

        return isPrivateUser[to];
    }
}
```

और अब इसे मॉक करते हैं।

```solidity
pragma solidity ^0.6.0;
import "../PrivateERC20.sol";

contract PrivateERC20Mock is PrivateERC20 {
    bool isPublicConfig;

    constructor() public PrivateERC20(0) {}

    function setIsPublic(bool isPublic) external {
        isPublicConfig = isPublic;
    }

    function isPublic() public view returns (bool) {
        return isPublicConfig;
    }
}
```

आपको निम्नलिखित में से एक त्रुटि संदेश मिलेगा:

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing "override" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function. Did you forget to add "virtual"?.`

चूंकि हम नए 0.6 Solidity संस्करण का उपयोग कर रहे हैं, इसलिए हमें उन फंक्शन के लिए `virtual` कीवर्ड जोड़ना होगा जिन्हें ओवरराइड किया जा सकता है और ओवरराइडिंग फंक्शन के लिए `override` जोड़ना होगा। तो चलिए इन्हें दोनों `isPublic` फंक्शन में जोड़ते हैं।

अब अपने यूनिट परीक्षणों में, आप इसके बजाय `PrivateERC20Mock` का उपयोग कर सकते हैं। जब आप निजी उपयोग समय के दौरान व्यवहार का परीक्षण करना चाहते हैं, तो `setIsPublic(false)` का उपयोग करें और इसी तरह सार्वजनिक उपयोग समय के परीक्षण के लिए `setIsPublic(true)` का उपयोग करें। बेशक हमारे उदाहरण में, हम समय को तदनुसार बदलने के लिए [समय सहायकों](https://docs.openzeppelin.com/test-helpers/0.5/api#increase) का भी उपयोग कर सकते हैं। लेकिन मॉक करने का विचार अब तक स्पष्ट हो जाना चाहिए और आप ऐसे परिदृश्यों की कल्पना कर सकते हैं जहां यह केवल समय को आगे बढ़ाने जितना आसान नहीं है।

## कई अनुबंधों को मॉक करना {#mocking-many-contracts}

अगर आपको हर एक मॉक के लिए एक और अनुबंध बनाना पड़े तो यह अव्यवस्थित हो सकता है। अगर यह आपको परेशान करता है, तो आप [MockContract](https://github.com/gnosis/mock-contract) लाइब्रेरी देख सकते हैं। यह आपको अनुबंधों के व्यवहार को तुरंत ओवरराइड करने और बदलने की अनुमति देता है। हालांकि, यह केवल किसी अन्य अनुबंध पर कॉल को मॉक करने के लिए काम करता है, इसलिए यह हमारे उदाहरण के लिए काम नहीं करेगा।

## मॉक करना और भी शक्तिशाली हो सकता है {#mocking-can-be-even-more-powerful}

मॉक करने की शक्तियां यहीं खत्म नहीं होतीं।

- फंक्शन जोड़ना: न केवल किसी विशिष्ट फंक्शन को ओवरराइड करना उपयोगी है, बल्कि अतिरिक्त फंक्शन जोड़ना भी उपयोगी है। टोकन के लिए एक अच्छा उदाहरण एक अतिरिक्त `mint` फंक्शन होना है जो किसी भी यूज़र को मुफ्त में नए टोकन प्राप्त करने की अनुमति देता है।
- टेस्टनेट में उपयोग: जब आप अपने डैप के साथ टेस्टनेट पर अपने अनुबंधों को डिप्लॉय और परीक्षण करते हैं, तो मॉक किए गए संस्करण का उपयोग करने पर विचार करें। फंक्शन को ओवरराइड करने से बचें जब तक कि आपको वास्तव में ऐसा करने की आवश्यकता न हो। आखिरकार, आप असली लॉजिक का परीक्षण करना चाहते हैं। लेकिन उदाहरण के लिए एक रीसेट फंक्शन जोड़ना उपयोगी हो सकता है जो अनुबंध की स्थिति को बस शुरुआत में रीसेट कर देता है, किसी नए डिप्लॉयमेंट की आवश्यकता नहीं है। ज़ाहिर है कि आप मेननेट अनुबंध में ऐसा नहीं चाहेंगे।
