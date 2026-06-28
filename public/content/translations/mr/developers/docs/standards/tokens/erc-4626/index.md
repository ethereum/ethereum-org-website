---
title: "⁦ERC-4626⁩ टोकनाइज्ड तिजोरी मानक"
description: "उत्पन्न देणाऱ्या तिजोऱ्यांसाठी एक मानक."
lang: mr
---

## परिचय {#introduction}

ERC-4626 हे उत्पन्न देणाऱ्या तिजोऱ्यांचे तांत्रिक मापदंड ऑप्टिमाइझ आणि एकत्रित करण्यासाठी एक मानक आहे. हे टोकनाइज्ड उत्पन्न देणाऱ्या तिजोऱ्यांसाठी एक मानक API प्रदान करते जे एकाच अंतर्निहित ERC-20 टोकनचे शेअर्स दर्शवतात. ERC-4626 हे ERC-20 चा वापर करणाऱ्या टोकनाइज्ड तिजोऱ्यांसाठी एक पर्यायी विस्तार देखील रूपरेखित करते, जे टोकन जमा करणे, रक्कम काढणे आणि शिल्लक वाचण्यासाठी मूलभूत कार्यक्षमता प्रदान करते.

**उत्पन्न देणाऱ्या तिजोऱ्यांमध्ये ERC-4626 ची भूमिका**

कर्ज देण्याचे (lending) बाजार, ॲग्रीगेटर्स आणि अंगभूत व्याज देणारे टोकन्स वापरकर्त्यांना वेगवेगळ्या धोरणांची अंमलबजावणी करून त्यांच्या क्रिप्टो टोकन्सवर सर्वोत्तम उत्पन्न शोधण्यात मदत करतात. ही धोरणे थोड्या फरकाने केली जातात, ज्यामुळे चुका होऊ शकतात किंवा विकास संसाधने वाया जाऊ शकतात.

उत्पन्न देणाऱ्या तिजोऱ्यांमधील ERC-4626 अधिक सुसंगत आणि मजबूत अंमलबजावणीचे नमुने तयार करून एकत्रीकरणाचे प्रयत्न कमी करेल आणि विकासकांकडून कमी विशेष प्रयत्नांसह विविध ॲप्लिकेशन्समध्ये उत्पन्नाचा प्रवेश खुला करेल.

ERC-4626 टोकनचे [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626) मध्ये पूर्णपणे वर्णन केले आहे.

**असिंक्रोनस तिजोरी विस्तार (ERC-7540)**

ERC-4626 एका मर्यादेपर्यंत ॲटॉमिक ठेवी आणि रिडेम्प्शनसाठी ऑप्टिमाइझ केलेले आहे. जर मर्यादा गाठली गेली, तर नवीन ठेवी किंवा रिडेम्प्शन सबमिट केले जाऊ शकत नाहीत. ही मर्यादा तिजोरीशी (Vault) संवाद साधण्यासाठी पूर्वअट म्हणून असिंक्रोनस क्रिया किंवा विलंब असलेल्या कोणत्याही स्मार्ट कॉन्ट्रॅक्ट प्रणालीसाठी चांगली काम करत नाही (उदा. रिअल-वर्ल्ड ॲसेट प्रोटोकॉल, अंडरकोलॅटरलाइज्ड कर्ज देण्याचे प्रोटोकॉल, क्रॉस-चेन कर्ज देण्याचे प्रोटोकॉल, तरल स्टेकिंग टोकन (LST), किंवा विमा सुरक्षा मॉड्यूल्स).

ERC-7540 असिंक्रोनस वापर प्रकरणांसाठी ERC-4626 तिजोऱ्यांची उपयुक्तता वाढवते. विद्यमान तिजोरी इंटरफेस (`deposit`/`withdraw`/`mint`/`redeem`) असिंक्रोनस विनंत्यांवर दावा करण्यासाठी पूर्णपणे वापरला जातो.

ERC-7540 विस्ताराचे [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540) मध्ये पूर्णपणे वर्णन केले आहे.

**मल्टी-ॲसेट तिजोरी विस्तार (ERC-7575)**

ERC-4626 द्वारे समर्थित नसलेले एक गहाळ वापर प्रकरण म्हणजे तिजोऱ्या ज्यामध्ये एकाधिक मालमत्ता किंवा तरलता प्रदाता (LP) टोकन्स सारखे प्रवेश बिंदू आहेत. ERC-4626 ला स्वतः एक ERC-20 असण्याच्या आवश्यकतेमुळे हे सामान्यतः अवजड किंवा गैर-अनुपालन करणारे असतात.

ERC-7575 हे ERC-4626 अंमलबजावणीमधून ERC-20 टोकन अंमलबजावणी बाह्य करून एकाधिक मालमत्ता असलेल्या तिजोऱ्यांसाठी समर्थन जोडते.

ERC-7575 विस्ताराचे [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575) मध्ये पूर्णपणे वर्णन केले आहे.

## पूर्वअटी {#prerequisites}

हे पृष्ठ अधिक चांगल्या प्रकारे समजून घेण्यासाठी, आम्ही शिफारस करतो की तुम्ही प्रथम [टोकन मानके](/developers/docs/standards/tokens/) आणि [ERC-20](/developers/docs/standards/tokens/erc-20/) बद्दल वाचा.

## ERC-4626 कार्ये आणि वैशिष्ट्ये: {#body}

### पद्धती {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

हे फंक्शन अकाउंटिंग, जमा करणे, रक्कम काढणे यासाठी तिजोरीसाठी वापरल्या जाणाऱ्या अंतर्निहित टोकनचा पत्ता परत करते.

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

हे फंक्शन तिजोरीत असलेल्या अंतर्निहित मालमत्तेची एकूण रक्कम परत करते.

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

हे फंक्शन प्रदान केलेल्या `assets` च्या रकमेसाठी तिजोरीद्वारे बदलल्या जाणाऱ्या `shares` ची रक्कम परत करते.

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

हे फंक्शन प्रदान केलेल्या `shares` च्या रकमेसाठी तिजोरीद्वारे बदलल्या जाणाऱ्या `assets` ची रक्कम परत करते.

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

हे फंक्शन अंतर्निहित मालमत्तेची कमाल रक्कम परत करते जी एकाच [`deposit`](#deposit) कॉलमध्ये जमा केली जाऊ शकते, ज्यामध्ये `receiver` साठी शेअर्स मिंट केले जातात.

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

हे फंक्शन वापरकर्त्यांना सध्याच्या ब्लॉकवर त्यांच्या ठेवीच्या परिणामांचे अनुकरण करण्यास अनुमती देते.

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

हे फंक्शन तिजोरीत अंतर्निहित टोकन्सचे `assets` जमा करते आणि `receiver` ला `shares` ची मालकी प्रदान करते.

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

हे फंक्शन शेअर्सची कमाल रक्कम परत करते जी एकाच [`mint`](#mint) कॉलमध्ये मिंट केली जाऊ शकते, ज्यामध्ये `receiver` साठी शेअर्स मिंट केले जातात.

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

हे फंक्शन वापरकर्त्यांना सध्याच्या ब्लॉकवर त्यांच्या मिंटच्या परिणामांचे अनुकरण करण्यास अनुमती देते.

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

हे फंक्शन अंतर्निहित टोकन्सचे `assets` जमा करून `receiver` ला अचूक `shares` तिजोरी शेअर्स मिंट करते.

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

हे फंक्शन अंतर्निहित मालमत्तेची कमाल रक्कम परत करते जी एकाच [`withdraw`](#withdraw) कॉलसह `owner` शिल्लकमधून काढली जाऊ शकते.

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

हे फंक्शन वापरकर्त्यांना सध्याच्या ब्लॉकवर त्यांच्या रक्कम काढण्याच्या परिणामांचे अनुकरण करण्यास अनुमती देते.

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

हे फंक्शन `owner` मधून `shares` बर्न करते आणि तिजोरीतून `receiver` ला अचूक `assets` टोकन पाठवते.

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

हे फंक्शन शेअर्सची कमाल रक्कम परत करते जी [`redeem`](#redeem) कॉलद्वारे `owner` शिल्लकमधून रिडीम केली जाऊ शकते.

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

हे फंक्शन वापरकर्त्यांना सध्याच्या ब्लॉकवर त्यांच्या रिडेम्प्शनच्या परिणामांचे अनुकरण करण्यास अनुमती देते.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

हे फंक्शन `owner` मधून विशिष्ट संख्येचे `shares` रिडीम करते आणि तिजोरीतून `receiver` ला अंतर्निहित टोकनचे `assets` पाठवते.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

चलनात असलेल्या रिडीम न केलेल्या तिजोरी शेअर्सची एकूण संख्या परत करते.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

`owner` कडे सध्या असलेल्या तिजोरी शेअर्सची एकूण रक्कम परत करते.

### इंटरफेसचा नकाशा {#mapoftheinterface}

![Map of the ERC-4626 interface](./map-of-erc-4626.png)

### घटना {#events}

#### Deposit घटना {#deposit-event}

जेव्हा [`mint`](#mint) आणि [`deposit`](#deposit) पद्धतींद्वारे तिजोरीत टोकन्स जमा केले जातात तेव्हा हे उत्सर्जित केले **पाहिजे**.

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

जेथे `sender` हा तो वापरकर्ता आहे ज्याने `shares` साठी `assets` बदलले, आणि ते `shares` `owner` ला हस्तांतरित केले.

#### Withdraw घटना {#withdraw-event}

जेव्हा [`redeem`](#redeem) किंवा [`withdraw`](#withdraw) पद्धतींमध्ये ठेवीदाराद्वारे तिजोरीतून शेअर्स काढले जातात तेव्हा हे उत्सर्जित केले **पाहिजे**.

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

जेथे `sender` हा तो वापरकर्ता आहे ज्याने रक्कम काढण्याची प्रक्रिया सुरू केली आणि `owner` च्या मालकीचे `shares`, `assets` साठी बदलले. `receiver` हा तो वापरकर्ता आहे ज्याला काढलेले `assets` प्राप्त झाले.

## पुढील वाचन {#further-reading}

- [EIP-4626: टोकनाइज्ड तिजोरी मानक](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: GitHub रेपो](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)