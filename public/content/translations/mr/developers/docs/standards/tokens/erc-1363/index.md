---
title: ERC-1363 पेयेबल टोकन स्टँडर्ड
description: ERC-1363 हा ERC-20 टोकन्ससाठी एक विस्तार इंटरफेस आहे जो एकाच व्यवहारामध्ये हस्तांतरणानंतर प्राप्तकर्ता कॉन्ट्रॅक्टवर किंवा मंजुरीनंतर खर्च करणाऱ्या कॉन्ट्रॅक्टवर सानुकूल लॉजिक कार्यान्वित करण्यास समर्थन देतो.
lang: mr
---

## परिचय {#introduction}

### ERC-1363 म्हणजे काय? {#what-is-erc1363}

ERC-1363 हा ERC-20 टोकन्ससाठी एक विस्तार इंटरफेस आहे जो एकाच व्यवहारामध्ये हस्तांतरणानंतर प्राप्तकर्ता कॉन्ट्रॅक्टवर किंवा मंजुरीनंतर खर्च करणाऱ्या कॉन्ट्रॅक्टवर सानुकूल लॉजिक कार्यान्वित करण्यास समर्थन देतो.

### ERC-20 मधील फरक {#erc20-differences}

प्रमाणित ERC-20 ऑपरेशन्स जसे की `transfer`, `transferFrom` आणि `approve`, वेगळ्या व्यवहाराशिवाय प्राप्तकर्ता किंवा खर्च करणाऱ्या कॉन्ट्रॅक्टवर कोड कार्यान्वित करण्याची परवानगी देत नाहीत.
यामुळे UI विकासामध्ये गुंतागुंत निर्माण होते आणि अवलंबनामध्ये अडथळा येतो कारण वापरकर्त्यांना पहिला व्यवहार कार्यान्वित होण्याची प्रतीक्षा करावी लागते आणि नंतर दुसरा व्यवहार सबमिट करावा लागतो.
त्यांना दोनदा गॅस (GAS) देखील भरावा लागतो.

ERC-1363 फंजिबल टोकन्सना अधिक सहजपणे कृती करण्यास आणि कोणत्याही साखळीबाह्य लिसनरच्या वापराविना कार्य करण्यास सक्षम बनवते.
हे एकाच व्यवहारामध्ये, हस्तांतरण किंवा मंजुरीनंतर, प्राप्तकर्ता किंवा खर्च करणाऱ्या कॉन्ट्रॅक्टवर कॉलबॅक करण्याची परवानगी देते.

## पूर्वतयारी {#prerequisites}

हे पृष्ठ अधिक चांगल्या प्रकारे समजून घेण्यासाठी, आम्ही शिफारस करतो की तुम्ही प्रथम याबद्दल वाचा:

- [टोकन मानके](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## मुख्य भाग {#body}

ERC-1363 हे ERC-20 टोकन्ससाठी `transfer`, `transferFrom` किंवा `approve` नंतर स्मार्ट कॉन्ट्रॅक्ट्सशी संवाद साधण्यासाठी एक प्रमाणित API सादर करते.

हे मानक टोकन्स हस्तांतरित करण्यासाठी मूलभूत कार्यक्षमता प्रदान करते, तसेच टोकन्स मंजूर करण्याची परवानगी देते जेणेकरून ते दुसऱ्या ऑनचेन तृतीय पक्षाद्वारे खर्च केले जाऊ शकतील आणि नंतर प्राप्तकर्ता किंवा खर्च करणाऱ्या कॉन्ट्रॅक्टवर कॉलबॅक करू शकतील.

स्मार्ट कॉन्ट्रॅक्ट्सचे अनेक प्रस्तावित उपयोग आहेत जे ERC-20 कॉलबॅक स्वीकारू शकतात.

उदाहरणे अशी असू शकतात:

- **क्राउडसेल्स**: पाठवलेले टोकन्स त्वरित बक्षीस वाटप ट्रिगर करतात.
- **सेवा**: पेमेंट एकाच टप्प्यात सेवा प्रवेश सक्रिय करते.
- **इनव्हॉइसेस**: टोकन्स आपोआप इनव्हॉइसेस निकाली काढतात.
- **सदस्यत्वे**: वार्षिक दर मंजूर केल्याने पहिल्या महिन्याच्या पेमेंटमध्ये सदस्यत्व सक्रिय होते.

या कारणांमुळे याला मूळतः **"पेयेबल टोकन"** असे नाव देण्यात आले होते.

कॉलबॅक वर्तन त्याची उपयुक्तता आणखी वाढवते, ज्यामुळे यासारखे अखंड संवाद शक्य होतात:

- **स्टेकिंग**: हस्तांतरित केलेले टोकन्स स्टेकिंग कॉन्ट्रॅक्टमध्ये स्वयंचलित लॉकिंग ट्रिगर करतात.
- **मतदान**: प्राप्त झालेले टोकन्स प्रशासन प्रणालीमध्ये मत नोंदवतात.
- **अदलाबदल**: टोकन मंजुरी एकाच टप्प्यात अदलाबदल लॉजिक सक्रिय करतात.

ERC-1363 टोकन्सचा वापर अशा सर्व प्रकरणांमध्ये विशिष्ट उपयुक्ततेसाठी केला जाऊ शकतो जिथे हस्तांतरण किंवा मंजुरी मिळाल्यानंतर कॉलबॅक कार्यान्वित करणे आवश्यक असते.
प्राप्तकर्त्याची टोकन्स हाताळण्याची क्षमता तपासून स्मार्ट कॉन्ट्रॅक्ट्समध्ये टोकन गमावणे किंवा टोकन लॉक होणे टाळण्यासाठी देखील ERC-1363 उपयुक्त आहे.

इतर ERC-20 विस्तार प्रस्तावांच्या विपरीत, ERC-1363 हे ERC-20 च्या `transfer` आणि `transferFrom` पद्धतींना ओव्हरराइड करत नाही आणि ERC-20 सह बॅकवर्ड सुसंगतता राखून लागू करण्यासाठी इंटरफेस IDs परिभाषित करते.

[EIP-1363](https://eips.ethereum.org/EIPS/eip-1363) मधून:

### पद्धती {#methods}

ERC-1363 मानकाची अंमलबजावणी करणाऱ्या स्मार्ट कॉन्ट्रॅक्ट्सनी `ERC1363` इंटरफेसमधील सर्व फंक्शन्स, तसेच `ERC20` आणि `ERC165` इंटरफेसेस लागू करणे **आवश्यक** आहे.

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev ERC-20 टोकन्ससाठी एक विस्तार इंटरफेस जो एकाच व्यवहारामध्ये `transfer` किंवा `transferFrom` नंतर प्राप्तकर्त्याच्या कॉन्ट्रॅक्टवर कोड कार्यान्वित करण्यास, किंवा `approve` नंतर खर्च करणाऱ्याच्या (spender) कॉन्ट्रॅक्टवर कोड कार्यान्वित करण्यास समर्थन देतो.
 */
interface ERC1363 is ERC20, ERC165 {
  /*
   * टीप: या इंटरफेससाठी ERC-165 आयडेंटिफायर 0xb0202a11 आहे.
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
   */

  /**
   * @dev कॉलरच्या खात्यातून `to` कडे टोकन्सची `value` रक्कम हलवते
   * आणि नंतर `to` वर `ERC1363Receiver::onTransferReceived` कॉल करते.
   * @param to तो पत्ता ज्यावर टोकन्स हस्तांतरित केले जात आहेत.
   * @param value हस्तांतरित केल्या जाणाऱ्या टोकन्सची रक्कम.
   * @return एक बुलियन मूल्य जे त्रुटी (throw) न आल्यास ऑपरेशन यशस्वी झाल्याचे दर्शवते.
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev कॉलरच्या खात्यातून `to` कडे टोकन्सची `value` रक्कम हलवते
   * आणि नंतर `to` वर `ERC1363Receiver::onTransferReceived` कॉल करते.
   * @param to तो पत्ता ज्यावर टोकन्स हस्तांतरित केले जात आहेत.
   * @param value हस्तांतरित केल्या जाणाऱ्या टोकन्सची रक्कम.
   * @param data कोणत्याही निर्दिष्ट फॉरमॅटशिवाय अतिरिक्त डेटा, जो `to` ला कॉल करताना पाठवला जातो.
   * @return एक बुलियन मूल्य जे त्रुटी (throw) न आल्यास ऑपरेशन यशस्वी झाल्याचे दर्शवते.
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev अलोवन्स (allowance) यंत्रणेचा वापर करून `from` कडून `to` कडे टोकन्सची `value` रक्कम हलवते
   * आणि नंतर `to` वर `ERC1363Receiver::onTransferReceived` कॉल करते.
   * @param from तो पत्ता ज्यावरून टोकन्स पाठवायचे आहेत.
   * @param to तो पत्ता ज्यावर टोकन्स हस्तांतरित केले जात आहेत.
   * @param value हस्तांतरित केल्या जाणाऱ्या टोकन्सची रक्कम.
   * @return एक बुलियन मूल्य जे त्रुटी (throw) न आल्यास ऑपरेशन यशस्वी झाल्याचे दर्शवते.
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev अलोवन्स (allowance) यंत्रणेचा वापर करून `from` कडून `to` कडे टोकन्सची `value` रक्कम हलवते
   * आणि नंतर `to` वर `ERC1363Receiver::onTransferReceived` कॉल करते.
   * @param from तो पत्ता ज्यावरून टोकन्स पाठवायचे आहेत.
   * @param to तो पत्ता ज्यावर टोकन्स हस्तांतरित केले जात आहेत.
   * @param value हस्तांतरित केल्या जाणाऱ्या टोकन्सची रक्कम.
   * @param data कोणत्याही निर्दिष्ट फॉरमॅटशिवाय अतिरिक्त डेटा, जो `to` ला कॉल करताना पाठवला जातो.
   * @return एक बुलियन मूल्य जे त्रुटी (throw) न आल्यास ऑपरेशन यशस्वी झाल्याचे दर्शवते.
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev कॉलरच्या टोकन्सवर `spender` चे अलोवन्स (allowance) म्हणून टोकन्सची `value` रक्कम सेट करते
   * आणि नंतर `spender` वर `ERC1363Spender::onApprovalReceived` कॉल करते.
   * @param spender तो पत्ता जो निधी खर्च करेल.
   * @param value खर्च केल्या जाणाऱ्या टोकन्सची रक्कम.
   * @return एक बुलियन मूल्य जे त्रुटी (throw) न आल्यास ऑपरेशन यशस्वी झाल्याचे दर्शवते.
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev कॉलरच्या टोकन्सवर `spender` चे अलोवन्स (allowance) म्हणून टोकन्सची `value` रक्कम सेट करते
   * आणि नंतर `spender` वर `ERC1363Spender::onApprovalReceived` कॉल करते.
   * @param spender तो पत्ता जो निधी खर्च करेल.
   * @param value खर्च केल्या जाणाऱ्या टोकन्सची रक्कम.
   * @param data कोणत्याही निर्दिष्ट फॉरमॅटशिवाय अतिरिक्त डेटा, जो `spender` ला कॉल करताना पाठवला जातो.
   * @return एक बुलियन मूल्य जे त्रुटी (throw) न आल्यास ऑपरेशन यशस्वी झाल्याचे दर्शवते.
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

ज्या स्मार्ट कॉन्ट्रॅक्टला `transferAndCall` किंवा `transferFromAndCall` द्वारे ERC-1363 टोकन्स स्वीकारायचे आहेत त्यांनी `ERC1363Receiver` इंटरफेस लागू करणे **आवश्यक** आहे:

```solidity
/**
 * @title ERC1363Receiver
 * @dev कोणत्याही कॉन्ट्रॅक्टसाठी इंटरफेस ज्याला ERC-1363 टोकन कॉन्ट्रॅक्ट्समधून `transferAndCall` किंवा `transferFromAndCall` ला समर्थन द्यायचे आहे.
 */
interface ERC1363Receiver {
  /**
   * @dev जेव्हा जेव्हा `operator` द्वारे `from` कडून `ERC1363::transferAndCall` किंवा `ERC1363::transferFromAndCall` मार्गे या कॉन्ट्रॅक्टमध्ये ERC-1363 टोकन्स हस्तांतरित केले जातात, तेव्हा हे फंक्शन कॉल केले जाते.
   *
   * टीप: हस्तांतरण स्वीकारण्यासाठी, याने `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (म्हणजेच 0x88a7ca5c, किंवा स्वतःचा फंक्शन सिलेक्टर) परत करणे आवश्यक आहे.
   *
   * @param operator तो पत्ता ज्याने `transferAndCall` किंवा `transferFromAndCall` फंक्शन कॉल केले.
   * @param from तो पत्ता ज्यावरून टोकन्स हस्तांतरित केले जातात.
   * @param value हस्तांतरित केलेल्या टोकन्सची रक्कम.
   * @param data कोणत्याही निर्दिष्ट फॉरमॅटशिवाय अतिरिक्त डेटा.
   * @return त्रुटी (throw) न आल्यास आणि हस्तांतरण अनुमत असल्यास `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`.
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

ज्या स्मार्ट कॉन्ट्रॅक्टला `approveAndCall` द्वारे ERC-1363 टोकन्स स्वीकारायचे आहेत त्यांनी `ERC1363Spender` इंटरफेस लागू करणे **आवश्यक** आहे:

```solidity
/**
 * @title ERC1363Spender
 * @dev कोणत्याही कॉन्ट्रॅक्टसाठी इंटरफेस ज्याला ERC-1363 टोकन कॉन्ट्रॅक्ट्समधून `approveAndCall` ला समर्थन द्यायचे आहे.
 */
interface ERC1363Spender {
  /**
   * @dev जेव्हा जेव्हा ERC-1363 टोकन्सचा `owner` त्यांचे टोकन्स खर्च करण्यासाठी `ERC1363::approveAndCall` मार्गे या कॉन्ट्रॅक्टला मंजुरी देतो, तेव्हा हे फंक्शन कॉल केले जाते.
   *
   * टीप: मंजुरी स्वीकारण्यासाठी, याने `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (म्हणजेच 0x7b04a2d0, किंवा स्वतःचा फंक्शन सिलेक्टर) परत करणे आवश्यक आहे.
   *
   * @param owner तो पत्ता ज्याने `approveAndCall` फंक्शन कॉल केले आणि ज्याच्याकडे पूर्वी टोकन्सची मालकी होती.
   * @param value खर्च केल्या जाणाऱ्या टोकन्सची रक्कम.
   * @param data कोणत्याही निर्दिष्ट फॉरमॅटशिवाय अतिरिक्त डेटा.
   * @return त्रुटी (throw) न आल्यास आणि मंजुरी अनुमत असल्यास `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`.
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## पुढील वाचन {#further-reading}

- [ERC-1363: पेयेबल टोकन स्टँडर्ड](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: GitHub रेपो](https://github.com/vittominacori/erc1363-payable-token)