---
title: ERC-1363 पेयबल टोकन मानक
description: ERC-1363 हा ERC-20 टोकनसाठी एक एक्सटेंशन इंटरफेस आहे जो हस्तांतरणानंतर प्राप्तकर्त्याच्या करारावर किंवा मंजुरीनंतर खर्च करणाऱ्याच्या करारावर, सर्व काही एकाच व्यवहारामध्ये, कस्टम लॉजिक कार्यान्वित करण्यास समर्थन देतो.
lang: mr
---

## प्रस्तावना {#introduction}

### ERC-1363 म्हणजे काय? {#what-is-erc1363}

ERC-1363 हा ERC-20 टोकनसाठी एक एक्सटेंशन इंटरफेस आहे जो हस्तांतरणानंतर प्राप्तकर्त्याच्या करारावर किंवा मंजुरीनंतर खर्च करणाऱ्याच्या करारावर, सर्व काही एकाच व्यवहारामध्ये, कस्टम लॉजिक कार्यान्वित करण्यास समर्थन देतो.

### ERC-20 मधील फरक {#erc20-differences}

`transfer`, `transferFrom` आणि `approve` यासारख्या मानक ERC-20 ऑपरेशन्स स्वतंत्र व्यवहाराशिवाय प्राप्तकर्ता किंवा खर्च करणाऱ्या करारावर कोड अंमलबजावणीस परवानगी देत नाहीत.
यामुळे UI विकासात गुंतागुंत निर्माण होते आणि अवलंब करण्यामध्ये अडथळा येतो कारण वापरकर्त्यांना पहिला व्यवहार कार्यान्वित होण्याची वाट पाहावी लागते आणि मग दुसरा व्यवहार सबमिट करावा लागतो.
त्यांना दोनदा GAS देखील भरावा लागतो.

ERC-1363 फंजिबल टोकनला अधिक सहजपणे क्रिया करण्यास आणि कोणत्याही ऑफ-चेन लिसनरचा वापर न करता काम करण्यास सक्षम बनवते.
हे हस्तांतरण किंवा मंजुरीनंतर, एकाच व्यवहारामध्ये, रिसीव्हर किंवा स्पेंडर करारावर कॉलबॅक करण्याची परवानगी देते.

## पूर्वतयारी {#prerequisites}

हे पान अधिक चांगल्या प्रकारे समजून घेण्यासाठी, आम्ही शिफारस करतो की तुम्ही प्रथम याबद्दल वाचा:

- [टोकन मानके](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## मुख्य भाग {#body}

ERC-1363, `transfer`, `transferFrom` किंवा `approve` नंतर ERC-20 टोकनला स्मार्ट करारांशी संवाद साधण्यासाठी एक मानक API सादर करते.

हे मानक टोकन हस्तांतरित करण्यासाठी मूलभूत कार्यक्षमता प्रदान करते, तसेच टोकनला मंजूर करण्याची परवानगी देते जेणेकरून ते दुसऱ्या ऑन-चेन तृतीय पक्षाद्वारे खर्च केले जाऊ शकतात, आणि नंतर रिसीव्हर किंवा स्पेंडर करारावर कॉलबॅक करते.

ERC-20 कॉलबॅक स्वीकारू शकणार्‍या स्मार्ट करारांचे अनेक प्रस्तावित उपयोग आहेत.

उदाहरणे असू शकतात:

- **क्राउडसेल्स**: पाठवलेले टोकन त्वरित रिवॉर्ड वाटप सुरू करतात.
- **सेवा**: पेमेंट एकाच टप्प्यात सेवा प्रवेश सक्रिय करते.
- **इन्व्हॉइसेस**: टोकन आपोआप इन्व्हॉइसेस सेटल करतात.
- **सबस्क्रिप्शन्स**: वार्षिक दराला मंजुरी दिल्याने पहिल्या महिन्याच्या पेमेंटमध्येच सबस्क्रिप्शन सक्रिय होते.

या कारणांमुळे याला मूळतः **"पेयबल टोकन"** असे नाव देण्यात आले होते.

कॉलबॅक वर्तणूक त्याची उपयुक्तता आणखी वाढवते, ज्यामुळे यांसारखे अखंड संवाद सक्षम होतात:

- **स्टेकिंग**: हस्तांतरित केलेले टोकन स्टेकिंग करारामध्ये स्वयंचलित लॉकिंग सुरू करतात.
- **मतदान**: प्राप्त झालेले टोकन प्रशासन प्रणालीमध्ये मते नोंदवतात.
- **स्वॅपिंग**: टोकन मान्यता एकाच टप्प्यात स्वॅप लॉजिक सक्रिय करतात.

ERC-1363 टोकन सर्व प्रकरणांमध्ये विशिष्ट उपयुक्ततांसाठी वापरले जाऊ शकतात, ज्यात हस्तांतरण किंवा मंजुरी मिळाल्यानंतर कॉलबॅक कार्यान्वित करणे आवश्यक असते.
प्राप्तकर्त्याच्या टोकन हाताळण्याच्या क्षमतेची पडताळणी करून स्मार्ट करारांमध्ये टोकनचे नुकसान किंवा टोकन लॉकिंग टाळण्यासाठी ERC-1363 उपयुक्त आहे.

इतर ERC-20 एक्सटेंशन प्रस्तावांच्या विपरीत, ERC-1363 हे ERC-20 `transfer` आणि `transferFrom` पद्धतींना ओव्हरराइड करत नाही आणि ERC-20 सह बॅकवर्ड सुसंगतता राखून अंमलबजावणीसाठी इंटरफेस आयडी परिभाषित करते.

[EIP-1363](https://eips.ethereum.org/EIPS/eip-1363) वरून:

### मेथड्स {#methods}

ERC-1363 मानक लागू करणाऱ्या स्मार्ट करारांनी `ERC1363` इंटरफेसमधील सर्व फंक्शन्स, तसेच `ERC20` आणि `ERC165` इंटरफेस **अवश्य** लागू केले पाहिजेत.

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev ERC-20 टोकनसाठी एक एक्सटेंशन इंटरफेस जो `transfer` किंवा `transferFrom` नंतर प्राप्तकर्ता करारावर कोड कार्यान्वित करण्यास, किंवा `approve` नंतर स्पेंडर करारावर कोड कार्यान्वित करण्यास समर्थन देतो, हे सर्व एकाच व्यवहारामध्ये.
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
   * @dev कॉलरच्या खात्यातून `to` कडे `value` रकमेचे टोकन हलवते
   * आणि नंतर `to` वर `ERC1363Receiver::onTransferReceived` कॉल करते.
   * @param to तो पत्ता जिथे टोकन हस्तांतरित केले जात आहेत.
   * @param value हस्तांतरित करायच्या टोकनची रक्कम.
   * @return एक बुलियन मूल्य जे ऑपरेशन यशस्वी झाले असल्याचे दर्शवते, एरर थ्रो न केल्यास.
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev कॉलरच्या खात्यातून `to` कडे `value` रकमेचे टोकन हलवते
   * आणि नंतर `to` वर `ERC1363Receiver::onTransferReceived` कॉल करते.
   * @param to तो पत्ता जिथे टोकन हस्तांतरित केले जात आहेत.
   * @param value हस्तांतरित करायच्या टोकनची रक्कम.
   * @param data अतिरिक्त डेटा, ज्याचे कोणतेही विशिष्ट स्वरूप नाही, `to` ला कॉलमध्ये पाठवला जातो.
   * @return एक बुलियन मूल्य जे ऑपरेशन यशस्वी झाले असल्याचे दर्शवते, एरर थ्रो न केल्यास.
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev अलाउन्स मेकॅनिझम वापरून `from` कडून `to` कडे `value` रकमेचे टोकन हलवते
   * आणि नंतर `to` वर `ERC1363Receiver::onTransferReceived` कॉल करते.
   * @param from तो पत्ता जिथून टोकन पाठवायचे आहेत.
   * @param to तो पत्ता जिथे टोकन हस्तांतरित केले जात आहेत.
   * @param value हस्तांतरित करायच्या टोकनची रक्कम.
   * @return एक बुलियन मूल्य जे ऑपरेशन यशस्वी झाले असल्याचे दर्शवते, एरर थ्रो न केल्यास.
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev अलाउन्स मेकॅनिझम वापरून `from` कडून `to` कडे `value` रकमेचे टोकन हलवते
   * आणि नंतर `to` वर `ERC1363Receiver::onTransferReceived` कॉल करते.
   * @param from तो पत्ता जिथून टोकन पाठवायचे आहेत.
   * @param to तो पत्ता जिथे टोकन हस्तांतरित केले जात आहेत.
   * @param value हस्तांतरित करायच्या टोकनची रक्कम.
   * @param data अतिरिक्त डेटा, ज्याचे कोणतेही विशिष्ट स्वरूप नाही, `to` ला कॉलमध्ये पाठवला जातो.
   * @return एक बुलियन मूल्य जे ऑपरेशन यशस्वी झाले असल्याचे दर्शवते, एरर थ्रो न केल्यास.
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev कॉलरच्या टोकनवर `spender` च्या अलाउन्स म्हणून `value` रकमेचे टोकन सेट करते
   * आणि नंतर `spender` वर `ERC1363Spender::onApprovalReceived` कॉल करते.
   * @param spender तो पत्ता जो निधी खर्च करेल.
   * @param value खर्च करायच्या टोकनची रक्कम.
   * @return एक बुलियन मूल्य जे ऑपरेशन यशस्वी झाले असल्याचे दर्शवते, एरर थ्रो न केल्यास.
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev कॉलरच्या टोकनवर `spender` च्या अलाउन्स म्हणून `value` रकमेचे टोकन सेट करते
   * आणि नंतर `spender` वर `ERC1363Spender::onApprovalReceived` कॉल करते.
   * @param spender तो पत्ता जो निधी खर्च करेल.
   * @param value खर्च करायच्या टोकनची रक्कम.
   * @param data अतिरिक्त डेटा, ज्याचे कोणतेही विशिष्ट स्वरूप नाही, `spender` ला कॉलमध्ये पाठवला जातो.
   * @return एक बुलियन मूल्य जे ऑपरेशन यशस्वी झाले असल्याचे दर्शवते, एरर थ्रो न केल्यास.
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

`transferAndCall` किंवा `transferFromAndCall` द्वारे ERC-1363 टोकन स्वीकारू इच्छिणाऱ्या स्मार्ट कराराने `ERC1363Receiver` इंटरफेस **अवश्य** लागू केला पाहिजे:

```solidity
/**
 * @title ERC1363Receiver
 * @dev कोणत्याही करारासाठी इंटरफेस जो ERC-1363 टोकन करारांमधून `transferAndCall` किंवा `transferFromAndCall` ला समर्थन देऊ इच्छितो.
 */
interface ERC1363Receiver {
  /**
   * @dev जेव्हा ERC-1363 टोकन `operator` द्वारे `from` कडून `ERC1363::transferAndCall` किंवा `ERC1363::transferFromAndCall` द्वारे या करारावर हस्तांतरित केले जातात,
   * तेव्हा हे फंक्शन कॉल केले जाते.
   *
   * टीप: हस्तांतरण स्वीकारण्यासाठी, याने हे परत केले पाहिजे
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (म्हणजे 0x88a7ca5c, किंवा त्याचे स्वतःचे फंक्शन सिलेक्टर).
   *
   * @param operator तो पत्ता ज्याने `transferAndCall` किंवा `transferFromAndCall` फंक्शन कॉल केले.
   * @param from तो पत्ता जिथून टोकन हस्तांतरित केले आहेत.
   * @param value हस्तांतरित केलेल्या टोकनची रक्कम.
   * @param data कोणत्याही विशिष्ट स्वरूपाशिवाय अतिरिक्त डेटा.
   * @return `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))` जर हस्तांतरणास परवानगी असेल, एरर थ्रो न केल्यास.
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

`approveAndCall` द्वारे ERC-1363 टोकन स्वीकारू इच्छिणाऱ्या स्मार्ट कराराने `ERC1363Spender` इंटरफेस **अवश्य** लागू केला पाहिजे:

```solidity
/**
 * @title ERC1363Spender
 * @dev कोणत्याही करारासाठी इंटरफेस जो ERC-1363 टोकन करारांमधून `approveAndCall` ला समर्थन देऊ इच्छितो.
 */
interface ERC1363Spender {
  /**
   * @dev जेव्हा एखादा ERC-1363 टोकनचा `owner` `ERC1363::approveAndCall` द्वारे या कराराला
   * त्यांचे टोकन खर्च करण्यासाठी मंजूर करतो, तेव्हा हे फंक्शन कॉल केले जाते.
   *
   * टीप: मंजुरी स्वीकारण्यासाठी, याने हे परत केले पाहिजे
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (म्हणजे 0x7b04a2d0, किंवा त्याचे स्वतःचे फंक्शन सिलेक्टर).
   *
   * @param owner तो पत्ता ज्याने `approveAndCall` फंक्शन कॉल केले आणि जो पूर्वी टोकनचा मालक होता.
   * @param value खर्च करायच्या टोकनची रक्कम.
   * @param data कोणत्याही विशिष्ट स्वरूपाशिवाय अतिरिक्त डेटा.
   * @return `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))` जर मंजुरीस परवानगी असेल, एरर थ्रो न केल्यास.
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## पुढील वाचन {#further-reading}

- [ERC-1363: पेयबल टोकन मानक](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: GitHub रेपो](https://github.com/vittominacori/erc1363-payable-token)
