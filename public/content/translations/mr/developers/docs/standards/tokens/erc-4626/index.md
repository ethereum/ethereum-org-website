---
title: "ERC-4626 टोकनाइज्ड वॉल्ट स्टँडर्ड"
description: "उत्पन्न देणाऱ्या वॉल्ट्ससाठी एक मानक."
lang: mr
---

## प्रस्तावना {#introduction}

ERC-4626 हे उत्पन्न देणाऱ्या वॉल्ट्सचे तांत्रिक पॅरामीटर्स ऑप्टिमाइझ आणि एकीकृत करण्यासाठी एक मानक आहे. हे टोकनाइज्ड उत्पन्न-देणाऱ्या वॉल्ट्ससाठी एक मानक API प्रदान करते जे एकाच मूळ ERC-20 टोकनच्या शेअर्सचे प्रतिनिधित्व करतात. ERC-4626 ERC-20 वापरणाऱ्या टोकनाइज्ड वॉल्ट्ससाठी एक पर्यायी विस्तार देखील दर्शवते, जे टोकन जमा करण्यासाठी, काढण्यासाठी आणि शिल्लक वाचण्यासाठी मूलभूत कार्यक्षमता प्रदान करते.

**उत्पन्न देणाऱ्या वॉल्ट्समध्ये ERC-4626 ची भूमिका**

लेंडिंग मार्केट्स, एग्रीगेटर्स, आणि स्वाभाविकपणे व्याज-देणारे टोकन वापरकर्त्यांना त्यांच्या क्रिप्टो टोकनवर सर्वोत्तम उत्पन्न शोधण्यात वेगवेगळ्या स्ट्रॅटेजीस कार्यान्वित करून मदत करतात. या स्ट्रॅटेजीस थोड्या फरकाने केल्या जातात, ज्यामुळे चुका होण्याची शक्यता असते किंवा डेव्हलपमेंट संसाधने वाया जातात.

उत्पन्न-देणाऱ्या वॉल्ट्समधील ERC-4626 अधिक सुसंगत आणि मजबूत अंमलबजावणी पॅटर्न तयार करून डेव्हलपर्सकडून कमी विशेष प्रयत्नांसह एकत्रीकरण प्रयत्न कमी करेल आणि विविध ॲप्लिकेशन्समध्ये उत्पन्नाचा ॲक्सेस अनलॉक करेल.

ERC-4626 टोकनचे संपूर्ण वर्णन [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626) मध्ये केले आहे.

**असिंक्रोनस वॉल्ट विस्तार (ERC-7540)**

ERC-4626 एका मर्यादेपर्यंत ॲटॉमिक डिपॉझिट आणि रिडेम्प्शनसाठी ऑप्टिमाइझ केलेले आहे. जर मर्यादा गाठली गेली, तर कोणतेही नवीन डिपॉझिट किंवा रिडेम्प्शन सबमिट केले जाऊ शकत नाहीत. ही मर्यादा कोणत्याही स्मार्ट कॉन्ट्रॅक्ट सिस्टीमसाठी योग्यरित्या काम करत नाही, ज्यात वॉल्टसोबत इंटरफेस करण्यासाठी पूर्वअट म्हणून असिंक्रोनस क्रिया किंवा विलंब असतो (उदा., वास्तविक-जगातील मालमत्ता प्रोटोकॉल, अंडरकोलॅटरलाइज्ड लेंडिंग प्रोटोकॉल, क्रॉस-चेन लेंडिंग प्रोटोकॉल, लिक्विड स्टेकिंग टोकन, किंवा विमा सुरक्षा मॉड्यूल).

ERC-7540 असिंक्रोनस वापराच्या प्रकरणांसाठी ERC-4626 वॉल्ट्सची उपयोगिता वाढवते. विद्यमान वॉल्ट इंटरफेस (`deposit`/`withdraw`/`mint`/`redeem`) असिंक्रोनस रिक्वेस्ट्सवर दावा करण्यासाठी पूर्णपणे वापरला जातो.

ERC-7540 विस्ताराचे संपूर्ण वर्णन [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540) मध्ये केले आहे.

**बहु-मालमत्ता वॉल्ट विस्तार (ERC-7575)**

एक गहाळ वापर प्रकरण जे ERC-4626 द्वारे समर्थित नाही ते असे वॉल्ट्स आहेत ज्यात लिक्विडिटी प्रोव्हायडर (LP) टोकनसारख्या अनेक मालमत्ता किंवा एंट्री पॉइंट्स आहेत. ERC-4626 स्वतः एक ERC-20 असण्याच्या आवश्यकतेमुळे हे साधारणपणे अवजड किंवा गैर-अनुपालक असतात.

ERC-7575, ERC-4626 अंमलबजावणीतून ERC-20 टोकन अंमलबजावणीला बाह्य करून अनेक मालमत्ता असलेल्या वॉल्ट्ससाठी समर्थन जोडते.

ERC-7575 विस्ताराचे संपूर्ण वर्णन [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575) मध्ये केले आहे.

## पूर्वतयारी {#prerequisites}

हे पृष्ठ अधिक चांगल्या प्रकारे समजून घेण्यासाठी, आम्ही शिफारस करतो की तुम्ही आधी [टोकन मानक](/developers/docs/standards/tokens/) आणि [ERC-20](/developers/docs/standards/tokens/erc-20/) बद्दल वाचा.

## ERC-4626 कार्ये आणि वैशिष्ट्ये: {#body}

### मेथड्स {#methods}

#### ॲसेट {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

हे फंक्शन वॉल्टसाठी अकाउंटिंग, डिपॉझिटिंग, विथड्रॉइंगसाठी वापरल्या जाणाऱ्या मूळ टोकनचा ॲड्रेस परत करते.

#### एकूण ॲसेट्स {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

हे फंक्शन वॉल्टमध्ये ठेवलेल्या मूळ ॲसेट्सची एकूण रक्कम परत करते.

#### शेअर्समध्ये रूपांतरित करा {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

हे फंक्शन `shares` ची रक्कम परत करते जी प्रदान केलेल्या `assets` च्या रकमेसाठी वॉल्टद्वारे एक्सचेंज केली जाईल.

#### ॲसेट्समध्ये रूपांतरित करा {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

हे फंक्शन `assets` ची रक्कम परत करते जी प्रदान केलेल्या `shares` च्या रकमेसाठी वॉल्टद्वारे एक्सचेंज केली जाईल.

#### कमाल डिपॉझिट {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

हे फंक्शन मूळ ॲसेट्सची कमाल रक्कम परत करते जी एकाच [`deposit`](#deposit) कॉलमध्ये जमा केली जाऊ शकते, ज्यात `receiver` साठी शेअर्स मिंट केले जातात.

#### डिपॉझिटचे पूर्वावलोकन {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

हे फंक्शन वापरकर्त्यांना सध्याच्या ब्लॉकवर त्यांच्या डिपॉझिटच्या परिणामांचे सिम्युलेशन करण्याची परवानगी देते.

#### डिपॉझिट {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

हे फंक्शन मूळ टोकनचे `assets` वॉल्टमध्ये जमा करते आणि `receiver` ला `shares` ची मालकी देते.

#### कमाल मिंट {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

हे फंक्शन शेअर्सची कमाल रक्कम परत करते जी एकाच [`mint`](#mint) कॉलमध्ये मिंट केली जाऊ शकते, ज्यात `receiver` साठी शेअर्स मिंट केले जातात.

#### मिंटचे पूर्वावलोकन {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

हे फंक्शन वापरकर्त्यांना सध्याच्या ब्लॉकवर त्यांच्या मिंटच्या परिणामांचे सिम्युलेशन करण्याची परवानगी देते.

#### मिंट {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

हे फंक्शन मूळ टोकनचे `assets` जमा करून `receiver` ला तंतोतंत `shares` वॉल्ट शेअर्स मिंट करते.

#### कमाल विथड्रॉ {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

हे फंक्शन मूळ ॲसेट्सची कमाल रक्कम परत करते जी `owner` च्या बॅलन्समधून एकाच [`withdraw`](#withdraw) कॉलने काढली जाऊ शकते.

#### विथड्रॉचे पूर्वावलोकन {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

हे फंक्शन वापरकर्त्यांना सध्याच्या ब्लॉकवर त्यांच्या विथड्रॉवलच्या परिणामांचे सिम्युलेशन करण्याची परवानगी देते.

#### विथड्रॉ {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

हे फंक्शन `owner` कडून `shares` बर्न करते आणि वॉल्टमधून तंतोतंत `assets` टोकन `receiver` ला पाठवते.

#### कमाल रिडीम {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

हे फंक्शन शेअर्सची कमाल रक्कम परत करते जी `owner` च्या बॅलन्समधून [`redeem`](#redeem) कॉलद्वारे रिडीम केली जाऊ शकते.

#### रिडीमचे पूर्वावलोकन {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

हे फंक्शन वापरकर्त्यांना सध्याच्या ब्लॉकवर त्यांच्या रिडेम्पशनच्या परिणामांचे सिम्युलेशन करण्याची परवानगी देते.

#### रिडीम {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

हे फंक्शन `owner` कडून विशिष्ट संख्येचे `shares` रिडीम करते आणि वॉल्टमधून `receiver` ला मूळ टोकनचे `assets` पाठवते.

#### एकूण पुरवठा {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

वापरात असलेल्या, न रिडीम केलेल्या वॉल्ट शेअर्सची एकूण संख्या परत करते.

#### शिल्लक {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

`owner` कडे सध्या असलेल्या वॉल्ट शेअर्सची एकूण रक्कम परत करते.

### इंटरफेसचा नकाशा {#mapOfTheInterface}

![ERC-4626 इंटरफेसचा नकाशा](./map-of-erc-4626.png)

### इव्हेंट्स {#events}

#### डिपॉझिट इव्हेंट

[`mint`](#mint) आणि [`deposit`](#deposit) मेथड्सद्वारे जेव्हा टोकन वॉल्टमध्ये जमा केले जातात तेव्हा **अवश्य** उत्सर्जित केले पाहिजे.

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

जिथे `sender` हा वापरकर्ता आहे ज्याने `shares` साठी `assets` एक्सचेंज केले, आणि ते `shares` `owner` ला हस्तांतरित केले.

#### विथड्रॉ इव्हेंट

[`redeem`](#redeem) किंवा [`withdraw`](#withdraw) मेथड्समध्ये जेव्हा ठेवीदाराद्वारे वॉल्टमधून शेअर्स काढले जातात तेव्हा **अवश्य** उत्सर्जित केले पाहिजे.

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

जिथे `sender` हा वापरकर्ता आहे ज्याने विथड्रॉवल सुरू केले आणि `owner` च्या मालकीचे `shares` `assets` साठी एक्सचेंज केले. `receiver` हा वापरकर्ता आहे ज्याला काढलेले `assets` मिळाले.

## पुढील वाचन {#further-reading}

- [EIP-4626: टोकनाइज्ड वॉल्ट स्टँडर्ड](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: GitHub रेपो](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)
