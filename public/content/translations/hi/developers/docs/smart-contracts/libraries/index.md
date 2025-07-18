---
title: स्मार्ट अनुबंध लाइब्रेरी
description:
lang: hi
---

आपको अपने प्रोजेक्ट में हर स्मार्ट अनुबंध को शुरू से लिखने की आवश्यकता नहीं है। कई ओपन सोर्स स्मार्ट अनुबंध लाइब्रेरी उपलब्ध हैं जो आपकी परियोजना के लिए पुन: प्रयोज्य बिल्डिंग ब्लॉक प्रदान करती हैं जिससे आपको इसे फिर से बनाने की मेहनत नहीं करनी पड़ती।

## आवश्यक शर्तें {#prerequisites}

स्मार्ट अनुबंध लाइब्रेरी में प्रवेश करने से पहले, स्मार्ट अनुबंध की संरचना की अच्छी समझ प्राप्त करना अच्छा विचार है। यदि आपने अभी तक ऐसा नहीं किया है तो [स्मार्ट अनुबंध की संरचना](/developers/docs/smart-contracts/anatomy/) पर जाएं।

## लाइब्रेरी में क्या है {#whats-in-a-library}

आप आमतौर पर स्मार्ट अनुबंध लाइब्रेरी में दो प्रकार के बिल्डिंग ब्लॉक पा सकते हैं: पुन: प्रयोज्य व्यवहार जिन्हें आप अपने अनुबंधों में जोड़ सकते हैं, और विभिन्न मानकों के कार्यान्वयन।

### व्यवहार {#behaviors}

स्मार्ट अनुबंध लिखते समय, इस बात की अच्छी संभावना है कि आप खुद को बार-बार एक जैसे पैटर्न लिखते हुए पाएंगे, जैसे अनुबंध में संरक्षित संचालन करने के लिए _एडमिन_ पता असाइन करना, या एक अप्रत्याशित समस्या की स्थिति में आपातकालीन _पॉज़_ बटन जोड़ना।

स्मार्ट अनुबंध लाइब्रेरीआमतौर पर [लाइब्रेरी](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries) के रूप में या Solidity में [इनहेरिटेंस](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance) के माध्यम से इन व्यवहारों के पुन: प्रयोज्य कार्यान्वयन प्रदान करती हैं।

एक उदाहरण के रूप में, नीचे [OpenZeppelin अनुबंध लाइब्रेरी](https://github.com/OpenZeppelin/openzeppelin-contracts) से [`Ownable` अनुबंध](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol) का सरलीकृत संस्करण दिया गया है, जो एक पते को अनुबंध के स्वामी के रूप में निर्दिष्ट करता है, और किसी विधि तक पहुंच को केवल उस स्वामी तक सीमित करने के लिए संशोधक प्रदान करता है।

```solidity
contract Ownable {
    address public owner;

    constructor() internal {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }
}
```

अपने अनुबंध में इस तरह के बिल्डिंग ब्लॉक का उपयोग करने के लिए, आपको पहले इसे आयात करना होगा, और फिर इसे अपने स्वयं के अनुबंधों में विस्तारित करना होगा। यह आपको अपने स्वयं के फंक्शंस को सुरक्षित करने के लिए आधार `Ownable` अनुबंध द्वारा प्रदान किए गए संशोधक का उपयोग करने की अनुमति देगा।

```solidity
import ".../Ownable.sol"; // Path to the imported library

contract MyContract is Ownable {
    // The following function can only be called by the owner
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

एक अन्य लोकप्रिय उदाहरण है [SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math) या [DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html)। ये लाइब्रेरी हैं (आधार अनुबंधों के विपरीत) जो ओवरफ्लो जांच के साथ अंकगणितीय फंक्शंस प्रदान करते हैं, जो भाषा द्वारा प्रदान नहीं किए जाते हैं। ओवरफ्लो के खिलाफ अपने अनुबंध की रक्षा के लिए मूल अंकगणितीय संचालन के बजाय इन लाइब्रेरी में से किसी एक का उपयोग करना एक अच्छा अभ्यास है, जिसके विनाशकारी परिणाम हो सकते हैं!

### मानक {#standards}

[कम्पोज़ेबिलिटी और इंटरऑपरेटेबिलिटी](/developers/docs/smart-contracts/composability/) को सुविधाजनक बनाने के लिए, एथेरियम समुदाय ने **ERC** के रूप में कई मानकों को परिभाषित किया है। आप उनके बारे में [मानक](/developers/docs/standards/) अनुभाग में अधिक पढ़ सकते हैं।

अपने अनुबंधों के हिस्से के रूप में एक ERC को शामिल करते समय, अपने स्वयं के रोल आउट करने की कोशिश करने के बजाय मानक कार्यान्वयनों की तलाश करना एक अच्छा विचार है। कई स्मार्ट अनुबंध लाइब्रेरी में सबसे लोकप्रिय ERC के लिए कार्यान्वयन शामिल हैं। उदाहरण के लिए, सर्वव्यापी [ERC20 फंजिबल टोकन मानक](/developers/tutorials/understand-the-erc-20-token-smart-contract/) [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md), [DappSys](https://github.com/dapphub/ds-token/) और [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc20) में पाया जा सकता है। इसके अतिरिक्त, कुछ ERC स्वयं ERC के हिस्से के रूप में विहित कार्यान्वयन भी प्रदान करते हैं।

यह उल्लेखनीय है कि कुछ ERC स्टैंडअलोन नहीं हैं, बल्कि अन्य ERC के अतिरिक्त हैं। उदाहरण के लिए, [ERC2612](https://eips.ethereum.org/EIPS/eip-2612) अपनी उपयोगिता में सुधार के लिए ERC20 के लिए एक एक्सटेंशन जोड़ता है।

## लाइब्रेरी कैसे जोड़ें {#how-to}

हमेशा उस लाइब्रेरी के प्रलेखन को देखें जिसे आप अपने प्रोजेक्ट में शामिल करने के तरीके के बारे में विशिष्ट निर्देशों के लिए शामिल कर रहे हैं। कई Solidity अनुबंध लाइब्रेरी `npm` का उपयोग करके पैक की जाती हैं, इसलिए आप उन्हें केवल `npm install` कर सकते हैं। अनुबंधों का [संकलन](/developers/docs/smart-contracts/compiling/) करने के लिए अधिकांश उपकरण स्मार्ट अनुबंध लाइब्रेरी के लिए आपके `node_modules` पर गौर करेंगे, ताकि आप निम्न कार्य कर सकें:

```solidity
// This will load the @openzeppelin/contracts library from your node_modules
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

आपके द्वारा उपयोग की जाने वाली विधि पर ध्यान दिए बिना, लाइब्रेरी को शामिल करते समय, हमेशा [भाषा](/developers/docs/smart-contracts/languages/) संस्करण पर नज़र रखें। उदाहरण के लिए, यदि आप Solidity 0.5 में अपने अनुबंध लिख रहे हैं तो आप Solidity 0.6 के लिए लाइब्रेरी का उपयोग नहीं कर सकते।

## कब इस्तेमाल करना है {#when-to-use}

अपने प्रोजेक्ट के लिए स्मार्ट अनुबंध लाइब्रेरी का उपयोग करने के कई लाभ हैं। सबसे पहले और सबसे महत्वपूर्ण, यह आपको रेडी-टू-यूज़ बिल्डिंग ब्लॉक्स प्रदान करके आपका समय बचाता है, जिन्हें आप अपने सिस्टम में शामिल कर सकते हैं, बजाय उन्हें स्वयं कोड करने के।

सुरक्षा भी एक प्रमुख लाभ है। ओपन सोर्स स्मार्ट अनुबंध लाइब्रेरी की भी अक्सर गहन जांच की जाती है। यह देखते हुए कि कई प्रोजेक्ट उन पर निर्भर करते हैं, समुदाय द्वारा उन्हें निरंतर समीक्षा के तहत रखने के लिए एक मजबूत प्रोत्साहन है। पुन: प्रयोज्य अनुबंध लाइब्रेरी की तुलना में एप्लिकेशन कोड में त्रुटियों को ढूंढना अधिक सामान्य है। कुछ लाइब्रेरी अतिरिक्त सुरक्षा के लिए [बाहरी ऑडिट](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audits) भी कराती हैं।

हालाँकि, स्मार्ट अनुबंध लाइब्रेरी का उपयोग करने से उस कोड को शामिल करने का जोखिम होता है जिससे आप अपने प्रोजेक्ट में परिचित नहीं हैं। एक अनुबंध आयात करना और इसे सीधे अपने प्रोजेक्ट में शामिल करना आकर्षक लगता है, लेकिन उस अनुबंध की अच्छी समझ के बिना, आप अनजाने में एक अप्रत्याशित व्यवहार के कारण अपने सिस्टम में एक समस्या पैदा कर सकते हैं। हमेशा उस कोड के प्रलेखन को पढ़ना सुनिश्चित करें जिसे आप आयात कर रहे हैं और फिर इसे अपने प्रोजेक्ट का हिस्सा बनाने से पहले कोड की समीक्षा करें!

अंत में, लाइब्रेरी को शामिल करने का निर्णय लेते समय, इसके समग्र उपयोग पर विचार करें। व्यापक रूप से अपनाया गया एक बड़ा समुदाय होने के लाभ हैं और मुद्दों पर अधिक लोग विचार करते हैं। स्मार्ट अनुबंधों के साथ निर्माण करते समय सुरक्षा आपका प्राथमिक ध्यान होना चाहिए!

## संबंधित उपकरण {#related-tools}

**OpenZeppelin अनुबंध -** **_सुरक्षित स्मार्ट अनुबंध विकास के लिए सबसे लोकप्रिय लाइब्रेरी।_**

- [प्रलेखन](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [सामुदायिक फोरम](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_स्मार्ट अनुबंधों के लिए सुरक्षित, सरल, लचीले बिल्डिंग-ब्लॉक।_**

- [प्रलेखन](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 -** **_वास्तविक दुनिया के लिए पूर्ण-विशेषताओं वाले वितरित एप्लिकेशन का निर्माण करने में आपकी सहायता के लिए अनुबंधों, लाइब्रेरी और उदाहरणों के साथ Solidity प्रोजेक्ट।_**

- [GitHub](https://github.com/HQ20/contracts)

**thirdweb Solidity SDK -** **_कस्टम स्मार्ट अनुबंध को कुशलतापूर्वक बनाने के लिए आवश्यक उपकरण प्रदान करता है_**

- [प्रलेखन](https://portal.thirdweb.com/contracts/build/overview)
- [GitHub](https://github.com/thirdweb-dev/contracts)

## संबंधित ट्यूटोरियल {#related-tutorials}

- [एथेरियम डेवलपर्स के लिए सुरक्षा विचार](/developers/docs/smart-contracts/security/) _– स्मार्ट अनुबंध बनाते समय सुरक्षा विचारों पर एक ट्यूटोरियल, जिसमें लाइब्रेरी उपयोग शामिल है।_
- [ERC-20 टोकन स्मार्ट अनुबंध को समझें](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _-ERC20 मानक पर ट्यूटोरियल, जो कई लाइब्रेरी द्वारा प्रदान किया गया है।_

## अग्रिम पठन {#further-reading}

_एक सामुदायिक संसाधन के बारे में जानें जिसने आपकी मदद की? इस पृष्ठ को संपादित करें और इसे जोड़ें!_
