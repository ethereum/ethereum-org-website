---
title: ERC-1363 देय टोकन मानक
description: ERC-1363 ERC-20 टोकन के लिए एक विस्तार इंटरफ़ेस है जो एक ही लेनदेन के भीतर, ट्रांसफर के बाद प्राप्तकर्ता अनुबंध पर या अनुमोदन के बाद खर्च करने वाले अनुबंध पर कस्टम लॉजिक के निष्पादन का समर्थन करता है।
lang: hi
---

## परिचय {#introduction}

### ERC-1363 क्या है? {#what-is-erc1363}

ERC-1363 ERC-20 टोकन के लिए एक विस्तार इंटरफ़ेस है जो एक ही लेनदेन के भीतर, ट्रांसफर के बाद प्राप्तकर्ता अनुबंध पर या अनुमोदन के बाद खर्च करने वाले अनुबंध पर कस्टम लॉजिक के निष्पादन का समर्थन करता है।

### ERC-20 से अंतर {#erc20-differences}

`transfer`, `transferFrom` और `approve` जैसे मानक ERC-20 संचालन, एक अलग लेनदेन के बिना प्राप्तकर्ता या खर्च करने वाले अनुबंध पर कोड निष्पादन की अनुमति नहीं देते हैं।
यह UI विकास में जटिलता और अपनाने में घर्षण पैदा करता है क्योंकि यूज़र्स को पहले लेनदेन के निष्पादित होने की प्रतीक्षा करनी चाहिए और फिर दूसरा सबमिट करना होगा।
उन्हें दो बार गैस का भुगतान भी करना होगा।

ERC-1363 फंजिबल टोकन को अधिक आसानी से कार्य करने और किसी भी ऑफ़-चेन लिसनर के उपयोग के बिना काम करने में सक्षम बनाता है।
यह एक ही लेनदेन में, ट्रांसफर या अनुमोदन के बाद, रिसीवर या खर्च करने वाले अनुबंध पर कॉलबैक करने की अनुमति देता है।

## पूर्वापेक्षाएं {#prerequisites}

इस पेज को बेहतर ढंग से समझने के लिए, हम अनुशंसा करते हैं कि आप पहले इनके बारे में पढ़ें:

- [टोकन मानक] (/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Body {#body}

ERC-1363 `transfer`, `transferFrom` या `approve` के बाद स्मार्ट अनुबंधों के साथ इंटरैक्ट करने के लिए ERC-20 टोकन के लिए एक मानक API प्रस्तुत करता है।

यह मानक टोकन ट्रांसफर करने के लिए बुनियादी कार्यक्षमता प्रदान करता है, साथ ही टोकन को अनुमोदित करने की अनुमति देता है ताकि उन्हें किसी अन्य ऑन-चेन तीसरे पक्ष द्वारा खर्च किया जा सके, और फिर रिसीवर या खर्च करने वाले अनुबंध पर कॉलबैक किया जा सके।

स्मार्ट अनुबंधों के कई प्रस्तावित उपयोग हैं जो ERC-20 कॉलबैक स्वीकार कर सकते हैं।

उदाहरणों में शामिल हैं:

- **क्राउडसेल्स**: भेजे गए टोकन तत्काल इनाम आवंटन को ट्रिगर करते हैं।
- **सेवाएँ**: भुगतान एक चरण में सेवा तक पहुँच को सक्रिय करता है।
- **चालान**: टोकन स्वचालित रूप से चालान का निपटान करते हैं।
- **सदस्यताएँ**: वार्षिक दर को मंजूरी देने से पहले महीने के भुगतान के भीतर सदस्यता सक्रिय हो जाती है।

इन्हीं कारणों से इसे मूल रूप से **"देय टोकन"** नाम दिया गया था।

कॉलबैक व्यवहार इसकी उपयोगिता का और विस्तार करता है, जिससे इस तरह के सहज इंटरैक्शन सक्षम होते हैं:

- **स्टेकिंग**: ट्रांसफर किए गए टोकन एक स्टेकिंग अनुबंध में स्वचालित लॉकिंग को ट्रिगर करते हैं।
- **मतदान**: प्राप्त टोकन एक शासन प्रणाली में वोट रजिस्टर करते हैं।
- **स्वैपिंग**: टोकन अनुमोदन एक ही चरण में स्वैप लॉजिक को सक्रिय करते हैं।

ERC-1363 टोकन का उपयोग उन सभी मामलों में विशिष्ट उपयोगिताओं के लिए किया जा सकता है, जिनमें ट्रांसफर या अनुमोदन प्राप्त होने के बाद कॉलबैक को निष्पादित करने की आवश्यकता होती है।
ERC-1363 प्राप्तकर्ता की टोकन को संभालने की क्षमता को सत्यापित करके स्मार्ट अनुबंधों में टोकन हानि या टोकन लॉकिंग से बचने के लिए भी उपयोगी है।

अन्य ERC-20 विस्तार प्रस्तावों के विपरीत, ERC-1363 ERC-20 `transfer` और `transferFrom` विधियों को ओवरराइड नहीं करता है और ERC-20 के साथ पश्चगामी संगतता बनाए रखते हुए कार्यान्वित किए जाने वाले इंटरफ़ेस ID को परिभाषित करता है।

From [EIP-1363](https://eips.ethereum.org/EIPS/eip-1363):

### तरीके {#methods}

ERC-1363 मानक को लागू करने वाले स्मार्ट अनुबंधों को `ERC1363` इंटरफ़ेस के सभी फ़ंक्शन, साथ ही `ERC20` और `ERC165` इंटरफ़ेस को **अवश्य** लागू करना चाहिए।

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev ERC-20 टोकन के लिए एक विस्तार इंटरफ़ेस जो एक ही लेनदेन में, `transfer` या `transferFrom` के बाद प्राप्तकर्ता अनुबंध पर कोड निष्पादित करने, या `approve` के बाद खर्च करने वाले अनुबंध पर कोड का समर्थन करता है।
 */
interface ERC1363 is ERC20, ERC165 {
  /*
   * ध्यान दें: इस इंटरफ़ेस के लिए ERC-165 पहचानकर्ता 0xb0202a11 है।
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
   */

  /**
   * @dev कॉलर के खाते से `to` में टोकन की एक `value` राशि ले जाता है और फिर `to` पर `ERC1363Receiver::onTransferReceived` को कॉल करता है।
   * @param to वह पता जिस पर टोकन ट्रांसफर किए जा रहे हैं।
   * @param value ट्रांसफर किए जाने वाले टोकन की राशि।
   * @return एक बूलियन मान जो यह दर्शाता है कि थ्रो करने तक ऑपरेशन सफल रहा।
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev कॉलर के खाते से `to` में टोकन की एक `value` राशि ले जाता है और फिर `to` पर `ERC1363Receiver::onTransferReceived` को कॉल करता है।
   * @param to वह पता जिस पर टोकन ट्रांसफर किए जा रहे हैं।
   * @param value ट्रांसफर किए जाने वाले टोकन की राशि।
   * @param data बिना किसी निर्दिष्ट प्रारूप के अतिरिक्त डेटा, `to` पर कॉल में भेजा गया।
   * @return एक बूलियन मान जो यह दर्शाता है कि थ्रो करने तक ऑपरेशन सफल रहा।
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev अनुमति तंत्र का उपयोग करके `from` से `to` तक टोकन की एक `value` राशि ले जाता है और फिर `to` पर `ERC1363Receiver::onTransferReceived` को कॉल करता है।
   * @param from वह पता जहाँ से टोकन भेजने हैं।
   * @param to वह पता जिस पर टोकन ट्रांसफर किए जा रहे हैं।
   * @param value ट्रांसफर किए जाने वाले टोकन की राशि।
   * @return एक बूलियन मान जो यह दर्शाता है कि थ्रो करने तक ऑपरेशन सफल रहा।
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev अनुमति तंत्र का उपयोग करके `from` से `to` तक टोकन की एक `value` राशि ले जाता है और फिर `to` पर `ERC1363Receiver::onTransferReceived` को कॉल करता है।
   * @param from वह पता जहाँ से टोकन भेजने हैं।
   * @param to वह पता जिस पर टोकन ट्रांसफर किए जा रहे हैं।
   * @param value ट्रांसफर किए जाने वाले टोकन की राशि।
   * @param data बिना किसी निर्दिष्ट प्रारूप के अतिरिक्त डेटा, `to` पर कॉल में भेजा गया।
   * @return एक बूलियन मान जो यह दर्शाता है कि थ्रो करने तक ऑपरेशन सफल रहा।
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev कॉलर के टोकन पर `spender` के भत्ते के रूप में टोकन की एक `value` राशि निर्धारित करता है और फिर `spender` पर `ERC1363Spender::onApprovalReceived` को कॉल करता है।
   * @param spender वह पता जो फंड खर्च करेगा।
   * @param value खर्च किए जाने वाले टोकन की राशि।
   * @return एक बूलियन मान जो यह दर्शाता है कि थ्रो करने तक ऑपरेशन सफल रहा।
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev कॉलर के टोकन पर `spender` के भत्ते के रूप में टोकन की एक `value` राशि निर्धारित करता है और फिर `spender` पर `ERC1363Spender::onApprovalReceived` को कॉल करता है।
   * @param spender वह पता जो फंड खर्च करेगा।
   * @param value खर्च किए जाने वाले टोकन की राशि।
   * @param data बिना किसी निर्दिष्ट प्रारूप के अतिरिक्त डेटा, `spender` पर कॉल में भेजा गया।
   * @return एक बूलियन मान जो यह दर्शाता है कि थ्रो करने तक ऑपरेशन सफल रहा।
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

एक स्मार्ट अनुबंध जो `transferAndCall` या `transferFromAndCall` के माध्यम से ERC-1363 टोकन स्वीकार करना चाहता है, उसे `ERC1363Receiver` इंटरफ़ेस को **अवश्य** लागू करना चाहिए:

```solidity
/**
 * @title ERC1363Receiver
 * @dev किसी भी अनुबंध के लिए इंटरफ़ेस जो ERC-1363 टोकन अनुबंधों से `transferAndCall` या `transferFromAndCall` का समर्थन करना चाहता है।
 */
interface ERC1363Receiver {
  /**
   * @dev जब भी ERC-1363 टोकन `operator` द्वारा `from` से `ERC1363::transferAndCall` या `ERC1363::transferFromAndCall` के माध्यम से इस अनुबंध में ट्रांसफर किए जाते हैं, तो यह फ़ंक्शन कॉल किया जाता है।
   *
   * ध्यान दें: ट्रांसफर स्वीकार करने के लिए, इसे वापस करना होगा
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (यानी 0x88a7ca5c, या इसका अपना फ़ंक्शन चयनकर्ता)।
   *
   * @param operator वह पता जिसने `transferAndCall` या `transferFromAndCall` फ़ंक्शन को कॉल किया।
   * @param from वह पता जहाँ से टोकन ट्रांसफर किए गए हैं।
   * @param value ट्रांसफर किए गए टोकन की राशि।
   * @param data बिना किसी निर्दिष्ट प्रारूप के अतिरिक्त डेटा।
   * @return `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))` यदि थ्रोइंग को छोड़कर ट्रांसफर की अनुमति है।
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

एक स्मार्ट अनुबंध जो `approveAndCall` के माध्यम से ERC-1363 टोकन स्वीकार करना चाहता है, उसे `ERC1363Spender` इंटरफ़ेस को **अवश्य** लागू करना चाहिए:

```solidity
/**
 * @title ERC1363Spender
 * @dev किसी भी अनुबंध के लिए इंटरफ़ेस जो ERC-1363 टोकन अनुबंधों से `approveAndCall` का समर्थन करना चाहता है।
 */
interface ERC1363Spender {
  /**
   * @dev जब भी एक ERC-1363 टोकन का `owner` अपने टोकन खर्च करने के लिए `ERC1363::approveAndCall` के माध्यम से इस अनुबंध को मंजूरी देता है, तो यह फ़ंक्शन कॉल किया जाता है।
   *
   * ध्यान दें: अनुमोदन स्वीकार करने के लिए, इसे वापस करना होगा
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (यानी 0x7b04a2d0, या इसका अपना फ़ंक्शन चयनकर्ता)।
   *
   * @param owner वह पता जिसने `approveAndCall` फ़ंक्शन को कॉल किया और पहले टोकन का मालिक था।
   * @param value खर्च किए जाने वाले टोकन की राशि।
   * @param data बिना किसी निर्दिष्ट प्रारूप के अतिरिक्त डेटा।
   * @return `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))` यदि थ्रोइंग को छोड़कर अनुमोदन की अनुमति है।
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## आगे की रीडिंग {#further-reading}

- [ERC-1363: देय टोकन मानक](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: GitHub रेपो](https://github.com/vittominacori/erc1363-payable-token)
