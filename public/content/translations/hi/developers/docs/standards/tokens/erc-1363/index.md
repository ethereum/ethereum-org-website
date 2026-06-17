---
title: "ERC-1363 पेएबल टोकन स्टैंडर्ड"
description: "ERC-1363, ERC-20 टोकन के लिए एक एक्सटेंशन इंटरफ़ेस है जो ट्रांसफर के बाद प्राप्तकर्ता अनुबंध पर, या अनुमोदन के बाद खर्च करने वाले अनुबंध पर कस्टम लॉजिक निष्पादित करने का समर्थन करता है, वह भी एक ही लेन-देन में।"
lang: hi
---

## परिचय {#introduction}

### ERC-1363 क्या है? {#what-is-erc1363}

ERC-1363, ERC-20 टोकन के लिए एक एक्सटेंशन इंटरफ़ेस है जो ट्रांसफर के बाद प्राप्तकर्ता अनुबंध पर, या अनुमोदन के बाद खर्च करने वाले अनुबंध पर कस्टम लॉजिक निष्पादित करने का समर्थन करता है, वह भी एक ही लेन-देन में।

### ERC-20 से अंतर {#erc20-differences}

मानक ERC-20 संचालन जैसे `transfer`, `transferFrom` और `approve`, एक अलग लेन-देन के बिना प्राप्तकर्ता या खर्च करने वाले अनुबंध पर कोड निष्पादन की अनुमति नहीं देते हैं।
यह UI विकास में जटिलता और अपनाने में बाधा उत्पन्न करता है क्योंकि उपयोगकर्ताओं को पहले लेन-देन के निष्पादित होने की प्रतीक्षा करनी पड़ती है और फिर दूसरा सबमिट करना पड़ता है।
उन्हें दो बार गैस (GAS) का भुगतान भी करना पड़ता है।

ERC-1363 फंजिबल टोकन को अधिक आसानी से कार्य करने और किसी भी ऑफचेन श्रोता (listener) के उपयोग के बिना काम करने में सक्षम बनाता है।
यह एक ही लेन-देन में, ट्रांसफर या अनुमोदन के बाद, प्राप्तकर्ता या खर्च करने वाले अनुबंध पर कॉलबैक करने की अनुमति देता है।

## पूर्वापेक्षाएँ {#prerequisites}

इस पृष्ठ को बेहतर ढंग से समझने के लिए, हम अनुशंसा करते हैं कि आप पहले इनके बारे में पढ़ें:

- [टोकन मानक](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## मुख्य भाग {#body}

ERC-1363, ERC-20 टोकन के लिए `transfer`, `transferFrom` या `approve` के बाद स्मार्ट अनुबंधों के साथ इंटरैक्ट करने के लिए एक मानक API पेश करता है।

यह मानक टोकन ट्रांसफर करने के लिए बुनियादी कार्यक्षमता प्रदान करता है, साथ ही टोकन को अनुमोदित करने की अनुमति देता है ताकि उन्हें किसी अन्य ऑनचेन तीसरे पक्ष द्वारा खर्च किया जा सके, और फिर प्राप्तकर्ता या खर्च करने वाले अनुबंध पर कॉलबैक किया जा सके।

स्मार्ट अनुबंधों के कई प्रस्तावित उपयोग हैं जो ERC-1363 कॉलबैक स्वीकार कर सकते हैं।

उदाहरण हो सकते हैं:

- **क्राउडसेल्स (Crowdsales)**: भेजे गए टोकन तत्काल पुरस्कार आवंटन को ट्रिगर करते हैं।
- **सेवाएं**: भुगतान एक ही चरण में सेवा पहुंच को सक्रिय करता है।
- **चालान (Invoices)**: टोकन स्वचालित रूप से चालान का निपटान करते हैं।
- **सदस्यता (Subscriptions)**: वार्षिक दर को मंजूरी देने से पहले महीने के भुगतान के भीतर सदस्यता सक्रिय हो जाती है।

इन्हीं कारणों से इसे मूल रूप से **"पेएबल टोकन (Payable Token)"** नाम दिया गया था।

कॉलबैक व्यवहार इसकी उपयोगिता को और बढ़ाता है, जिससे इस तरह के निर्बाध इंटरैक्शन सक्षम होते हैं:

- **स्टेकिंग**: ट्रांसफर किए गए टोकन एक स्टेकिंग अनुबंध में स्वचालित लॉकिंग को ट्रिगर करते हैं।
- **वोटिंग**: प्राप्त टोकन एक शासन प्रणाली में वोट दर्ज करते हैं।
- **स्वैपिंग**: टोकन अनुमोदन एक ही चरण में स्वैप लॉजिक को सक्रिय करते हैं।

ERC-1363 टोकन का उपयोग उन सभी मामलों में विशिष्ट उपयोगिताओं के लिए किया जा सकता है जिनमें ट्रांसफर या अनुमोदन प्राप्त होने के बाद कॉलबैक निष्पादित करने की अपेक्षा की जाती है।
ERC-1363 प्राप्तकर्ता की टोकन को संभालने की क्षमता को सत्यापित करके स्मार्ट अनुबंधों में टोकन के नुकसान या टोकन लॉकिंग से बचने के लिए भी उपयोगी है।

अन्य ERC-20 एक्सटेंशन प्रस्तावों के विपरीत, ERC-1363, ERC-20 के `transfer` और `transferFrom` तरीकों को ओवरराइड नहीं करता है और ERC-20 के साथ बैकवर्ड संगतता बनाए रखते हुए लागू किए जाने वाले इंटरफेस आईडी को परिभाषित करता है।

[EIP-1363](https://eips.ethereum.org/EIPS/eip-1363) से:

### तरीके (Methods) {#methods}

ERC-1363 मानक को लागू करने वाले स्मार्ट अनुबंधों को `ERC1363` इंटरफ़ेस के साथ-साथ `ERC20` और `ERC165` इंटरफेस के सभी कार्यों को लागू करना **चाहिए**।

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev ERC-20 टोकन के लिए एक एक्सटेंशन इंटरफ़ेस जो एक ही लेन-देन में `transfer` या `transferFrom` के बाद प्राप्तकर्ता अनुबंध पर कोड निष्पादित करने, या `approve` के बाद खर्च करने वाले (spender) अनुबंध पर कोड निष्पादित करने का समर्थन करता है।
 */
interface ERC1363 is ERC20, ERC165 {
  /*
   * NOTE: इस इंटरफ़ेस के लिए ERC-165 पहचानकर्ता 0xb0202a11 है।
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
   */

  /**
   * @dev कॉलर के खाते से `to` में टोकन की `value` मात्रा को ट्रांसफर करता है
   * और फिर `to` पर `ERC1363Receiver::onTransferReceived` को कॉल करता है।
   * @param to वह पता जिस पर टोकन ट्रांसफर किए जा रहे हैं।
   * @param value ट्रांसफर किए जाने वाले टोकन की मात्रा।
   * @return एक बूलियन मान जो यह दर्शाता है कि ऑपरेशन सफल रहा (जब तक कि कोई त्रुटि न फेंकी जाए)।
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev कॉलर के खाते से `to` में टोकन की `value` मात्रा को ट्रांसफर करता है
   * और फिर `to` पर `ERC1363Receiver::onTransferReceived` को कॉल करता है।
   * @param to वह पता जिस पर टोकन ट्रांसफर किए जा रहे हैं।
   * @param value ट्रांसफर किए जाने वाले टोकन की मात्रा।
   * @param data बिना किसी निर्दिष्ट प्रारूप के अतिरिक्त डेटा, जिसे `to` पर कॉल में भेजा जाता है।
   * @return एक बूलियन मान जो यह दर्शाता है कि ऑपरेशन सफल रहा (जब तक कि कोई त्रुटि न फेंकी जाए)।
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev छूट (allowance) तंत्र का उपयोग करके `from` से `to` में टोकन की `value` मात्रा को ट्रांसफर करता है
   * और फिर `to` पर `ERC1363Receiver::onTransferReceived` को कॉल करता है।
   * @param from वह पता जहाँ से टोकन भेजने हैं।
   * @param to वह पता जिस पर टोकन ट्रांसफर किए जा रहे हैं।
   * @param value ट्रांसफर किए जाने वाले टोकन की मात्रा।
   * @return एक बूलियन मान जो यह दर्शाता है कि ऑपरेशन सफल रहा (जब तक कि कोई त्रुटि न फेंकी जाए)।
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev छूट (allowance) तंत्र का उपयोग करके `from` से `to` में टोकन की `value` मात्रा को ट्रांसफर करता है
   * और फिर `to` पर `ERC1363Receiver::onTransferReceived` को कॉल करता है।
   * @param from वह पता जहाँ से टोकन भेजने हैं।
   * @param to वह पता जिस पर टोकन ट्रांसफर किए जा रहे हैं।
   * @param value ट्रांसफर किए जाने वाले टोकन की मात्रा।
   * @param data बिना किसी निर्दिष्ट प्रारूप के अतिरिक्त डेटा, जिसे `to` पर कॉल में भेजा जाता है।
   * @return एक बूलियन मान जो यह दर्शाता है कि ऑपरेशन सफल रहा (जब तक कि कोई त्रुटि न फेंकी जाए)।
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev कॉलर के टोकन पर `spender` की छूट (allowance) के रूप में टोकन की `value` मात्रा सेट करता है
   * और फिर `spender` पर `ERC1363Spender::onApprovalReceived` को कॉल करता है।
   * @param spender वह पता जो फंड खर्च करेगा।
   * @param value खर्च किए जाने वाले टोकन की मात्रा।
   * @return एक बूलियन मान जो यह दर्शाता है कि ऑपरेशन सफल रहा (जब तक कि कोई त्रुटि न फेंकी जाए)।
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev कॉलर के टोकन पर `spender` की छूट (allowance) के रूप में टोकन की `value` मात्रा सेट करता है
   * और फिर `spender` पर `ERC1363Spender::onApprovalReceived` को कॉल करता है।
   * @param spender वह पता जो फंड खर्च करेगा।
   * @param value खर्च किए जाने वाले टोकन की मात्रा।
   * @param data बिना किसी निर्दिष्ट प्रारूप के अतिरिक्त डेटा, जिसे `spender` पर कॉल में भेजा जाता है।
   * @return एक बूलियन मान जो यह दर्शाता है कि ऑपरेशन सफल रहा (जब तक कि कोई त्रुटि न फेंकी जाए)।
   */
  function approveAndCall(address spender, uint256 value, bytes calldata data) external returns (bool);
}

interface ERC20 {
  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
  function transfer(address to, uint256 value) external returns (bool);
  function transferFrom(address from, address to, uint256 value) external returns (bool);
  function approve(address spender, uint256 value) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address account) external view returns (uint256);
  function allowance(address owner, address spender) external view returns (uint256);
}

interface ERC165 {
  function supportsInterface(bytes4 interfaceId) external view returns (bool);
}
```

एक स्मार्ट अनुबंध जो `transferAndCall` या `transferFromAndCall` के माध्यम से ERC-1363 टोकन स्वीकार करना चाहता है, उसे `ERC1363Receiver` इंटरफ़ेस लागू करना **चाहिए**:

```solidity
/**
 * @title ERC1363Receiver
 * @dev किसी भी अनुबंध के लिए इंटरफ़ेस जो ERC-1363 टोकन अनुबंधों से `transferAndCall` या `transferFromAndCall` का समर्थन करना चाहता है।
 */
interface ERC1363Receiver {
  /**
   * @dev जब भी ERC-1363 टोकन इस अनुबंध में `ERC1363::transferAndCall` या `ERC1363::transferFromAndCall` के माध्यम से
   * `operator` द्वारा `from` से ट्रांसफर किए जाते हैं, तो यह फ़ंक्शन कॉल किया जाता है।
   *
   * NOTE: ट्रांसफर को स्वीकार करने के लिए, इसे
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (अर्थात 0x88a7ca5c, या इसका अपना फ़ंक्शन चयनकर्ता) वापस करना होगा।
   *
   * @param operator वह पता जिसने `transferAndCall` या `transferFromAndCall` फ़ंक्शन को कॉल किया।
   * @param from वह पता जहाँ से टोकन ट्रांसफर किए गए हैं।
   * @param value ट्रांसफर किए गए टोकन की मात्रा।
   * @param data बिना किसी निर्दिष्ट प्रारूप के अतिरिक्त डेटा।
   * @return `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))` यदि ट्रांसफर की अनुमति है (जब तक कि कोई त्रुटि न फेंकी जाए)।
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

एक स्मार्ट अनुबंध जो `approveAndCall` के माध्यम से ERC-1363 टोकन स्वीकार करना चाहता है, उसे `ERC1363Spender` इंटरफ़ेस लागू करना **चाहिए**:

```solidity
/**
 * @title ERC1363Spender
 * @dev किसी भी अनुबंध के लिए इंटरफ़ेस जो ERC-1363 टोकन अनुबंधों से `approveAndCall` का समर्थन करना चाहता है।
 */
interface ERC1363Spender {
  /**
   * @dev जब भी कोई ERC-1363 टोकन `owner` इस अनुबंध को `ERC1363::approveAndCall` के माध्यम से
   * अपने टोकन खर्च करने की स्वीकृति देता है, तो यह फ़ंक्शन कॉल किया जाता है।
   *
   * NOTE: स्वीकृति को स्वीकार करने के लिए, इसे
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (अर्थात 0x7b04a2d0, या इसका अपना फ़ंक्शन चयनकर्ता) वापस करना होगा।
   *
   * @param owner वह पता जिसने `approveAndCall` फ़ंक्शन को कॉल किया और पहले टोकन का मालिक था।
   * @param value खर्च किए जाने वाले टोकन की मात्रा।
   * @param data बिना किसी निर्दिष्ट प्रारूप के अतिरिक्त डेटा।
   * @return `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))` यदि स्वीकृति की अनुमति है (जब तक कि कोई त्रुटि न फेंकी जाए)।
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## आगे की जानकारी {#further-reading}

- [ERC-1363: पेएबल टोकन स्टैंडर्ड](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: GitHub रेपो](https://github.com/vittominacori/erc1363-payable-token)