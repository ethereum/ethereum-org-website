---
title: "ERC-1363 पेयबल टोकन मानक"
description: "ERC-1363 हा ERC-20 टोकनसाठी एक एक्सटेंशन इंटरफेस आहे जो हस्तांतरणानंतर प्राप्तकर्त्याच्या करारावर किंवा मंजुरीनंतर खर्च करणाऱ्याच्या करारावर, सर्व काही एकाच व्यवहारामध्ये, कस्टम लॉजिक कार्यान्वित करण्यास समर्थन देतो."
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
 * @dev An extension interface for ERC-20 tokens that supports executing code on a recipient contract
 * after `transfer` or `transferFrom`, or code on a spender contract after `approve`, in a single transaction.
 */
interface ERC1363 is ERC20, ERC165 {
  /*
   * NOTE: the ERC-165 identifier for this interface is 0xb0202a11.
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
   */

  /**
   * @dev Moves a `value` amount of tokens from the caller's account to `to`
   * and then calls `ERC1363Receiver::onTransferReceived` on `to`.
   * @param to The address to which tokens are being transferred.
   * @param value The amount of tokens to be transferred.
   * @return A boolean value indicating the operation succeeded unless throwing.
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev Moves a `value` amount of tokens from the caller's account to `to`
   * and then calls `ERC1363Receiver::onTransferReceived` on `to`.
   * @param to The address to which tokens are being transferred.
   * @param value The amount of tokens to be transferred.
   * @param data Additional data with no specified format, sent in call to `to`.
   * @return A boolean value indicating the operation succeeded unless throwing.
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Moves a `value` amount of tokens from `from` to `to` using the allowance mechanism
   * and then calls `ERC1363Receiver::onTransferReceived` on `to`.
   * @param from The address from which to send tokens.
   * @param to The address to which tokens are being transferred.
   * @param value The amount of tokens to be transferred.
   * @return A boolean value indicating the operation succeeded unless throwing.
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev Moves a `value` amount of tokens from `from` to `to` using the allowance mechanism
   * and then calls `ERC1363Receiver::onTransferReceived` on `to`.
   * @param from The address from which to send tokens.
   * @param to The address to which tokens are being transferred.
   * @param value The amount of tokens to be transferred.
   * @param data Additional data with no specified format, sent in call to `to`.
   * @return A boolean value indicating the operation succeeded unless throwing.
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Sets a `value` amount of tokens as the allowance of `spender` over the caller's tokens
   * and then calls `ERC1363Spender::onApprovalReceived` on `spender`.
   * @param spender The address which will spend the funds.
   * @param value The amount of tokens to be spent.
   * @return A boolean value indicating the operation succeeded unless throwing.
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev Sets a `value` amount of tokens as the allowance of `spender` over the caller's tokens
   * and then calls `ERC1363Spender::onApprovalReceived` on `spender`.
   * @param spender The address which will spend the funds.
   * @param value The amount of tokens to be spent.
   * @param data Additional data with no specified format, sent in call to `spender`.
   * @return A boolean value indicating the operation succeeded unless throwing.
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
 * @dev Interface for any contract that wants to support `transferAndCall` or `transferFromAndCall` from ERC-1363 token contracts.
 */
interface ERC1363Receiver {
  /**
   * @dev Whenever ERC-1363 tokens are transferred to this contract via `ERC1363::transferAndCall` or `ERC1363::transferFromAndCall`
   * by `operator` from `from`, this function is called.
   *
   * NOTE: To accept the transfer, this must return
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (i.e. 0x88a7ca5c, or its own function selector).
   *
   * @param operator The address which called `transferAndCall` or `transferFromAndCall` function.
   * @param from The address which are tokens transferred from.
   * @param value The amount of tokens transferred.
   * @param data Additional data with no specified format.
   * @return `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))` if transfer is allowed unless throwing.
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

`approveAndCall` द्वारे ERC-1363 टोकन स्वीकारू इच्छिणाऱ्या स्मार्ट कराराने `ERC1363Spender` इंटरफेस **अवश्य** लागू केला पाहिजे:

```solidity
/**
 * @title ERC1363Spender
 * @dev Interface for any contract that wants to support `approveAndCall` from ERC-1363 token contracts.
 */
interface ERC1363Spender {
  /**
   * @dev Whenever an ERC-1363 tokens `owner` approves this contract via `ERC1363::approveAndCall`
   * to spend their tokens, this function is called.
   *
   * NOTE: To accept the approval, this must return
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (i.e. 0x7b04a2d0, or its own function selector).
   *
   * @param owner The address which called `approveAndCall` function and previously owned the tokens.
   * @param value The amount of tokens to be spent.
   * @param data Additional data with no specified format.
   * @return `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))` if approval is allowed unless throwing.
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## पुढील वाचन {#further-reading}

- [ERC-1363: पेयबल टोकन मानक](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: GitHub रेपो](https://github.com/vittominacori/erc1363-payable-token)
