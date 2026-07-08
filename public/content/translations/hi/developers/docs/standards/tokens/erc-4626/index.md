---
title: "ERC-4626 टोकनाइज़्ड वॉल्ट मानक"
description: "यील्ड देने वाले वॉल्ट के लिए एक मानक।"
lang: hi
---

## परिचय {#introduction}

ERC-4626 यील्ड देने वाले वॉल्ट के तकनीकी मापदंडों को अनुकूलित और एकीकृत करने के लिए एक मानक है। यह टोकनाइज़्ड यील्ड देने वाले वॉल्ट के लिए एक मानक API प्रदान करता है जो एक ही अंतर्निहित ERC-20 टोकन के शेयरों का प्रतिनिधित्व करते हैं। ERC-4626, ERC-20 का उपयोग करने वाले टोकनाइज़्ड वॉल्ट के लिए एक वैकल्पिक एक्सटेंशन की रूपरेखा भी तैयार करता है, जो टोकन जमा करने, निकासी करने और बैलेंस पढ़ने के लिए बुनियादी कार्यक्षमता प्रदान करता है।

**यील्ड देने वाले वॉल्ट में ERC-4626 की भूमिका**

ऋण देने वाले बाज़ार, एग्रीगेटर, और स्वाभाविक रूप से ब्याज देने वाले टोकन विभिन्न रणनीतियों को निष्पादित करके उपयोगकर्ताओं को उनके क्रिप्टो टोकन पर सर्वोत्तम यील्ड खोजने में मदद करते हैं। ये रणनीतियाँ थोड़े बदलाव के साथ की जाती हैं, जिनमें त्रुटि होने की संभावना हो सकती है या विकास संसाधनों की बर्बादी हो सकती है।

यील्ड देने वाले वॉल्ट में ERC-4626 अधिक सुसंगत और मजबूत कार्यान्वयन पैटर्न बनाकर एकीकरण के प्रयास को कम करेगा और डेवलपर्स के थोड़े विशेष प्रयास के साथ विभिन्न एप्लिकेशन में यील्ड तक पहुंच को अनलॉक करेगा।

ERC-4626 टोकन का पूरी तरह से [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626) में वर्णन किया गया है।

**एसिंक्रोनस वॉल्ट एक्सटेंशन (ERC-7540)**

ERC-4626 को एक सीमा तक एटॉमिक जमा और मोचन (redemptions) के लिए अनुकूलित किया गया है। यदि सीमा तक पहुँच जाते हैं, तो कोई नया जमा या मोचन सबमिट नहीं किया जा सकता है। यह सीमा किसी भी ऐसे स्मार्ट अनुबंध सिस्टम के लिए अच्छी तरह से काम नहीं करती है जिसमें वॉल्ट के साथ इंटरफेस करने के लिए एसिंक्रोनस क्रियाएं या देरी एक शर्त के रूप में होती है (जैसे, वास्तविक दुनिया के एसेट प्रोटोकॉल, अंडरकोलैटरलाइज़्ड ऋण देने वाले प्रोटोकॉल, क्रॉस-चेन ऋण देने वाले प्रोटोकॉल, लिक्विड स्टेकिंग टोकन (LST), या बीमा सुरक्षा मॉड्यूल)।

ERC-7540 एसिंक्रोनस उपयोग के मामलों के लिए ERC-4626 वॉल्ट की उपयोगिता का विस्तार करता है। मौजूदा वॉल्ट इंटरफ़ेस (`deposit`/`withdraw`/`mint`/`redeem`) का पूरी तरह से एसिंक्रोनस अनुरोधों का दावा करने के लिए उपयोग किया जाता है।

ERC-7540 एक्सटेंशन का पूरी तरह से [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540) में वर्णन किया गया है।

**मल्टी-एसेट वॉल्ट एक्सटेंशन (ERC-7575)**

एक छूटा हुआ उपयोग का मामला जो ERC-4626 द्वारा समर्थित नहीं है, वह वॉल्ट है जिसमें कई एसेट या प्रवेश बिंदु होते हैं जैसे कि तरलता प्रदाता (LP) टोकन। ERC-4626 के स्वयं एक ERC-20 होने की आवश्यकता के कारण ये आम तौर पर बोझिल या गैर-अनुपालन वाले होते हैं।

ERC-7575, ERC-4626 कार्यान्वयन से ERC-20 टोकन कार्यान्वयन को बाहरी बनाकर कई एसेट वाले वॉल्ट के लिए समर्थन जोड़ता है।

ERC-7575 एक्सटेंशन का पूरी तरह से [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575) में वर्णन किया गया है।

## पूर्वापेक्षाएँ {#prerequisites}

इस पृष्ठ को बेहतर ढंग से समझने के लिए, हम अनुशंसा करते हैं कि आप पहले [टोकन मानकों](/developers/docs/standards/tokens/) और [ERC-20](/developers/docs/standards/tokens/erc-20/) के बारे में पढ़ें।

## ERC-4626 कार्य और विशेषताएँ: {#body}

### विधियाँ {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

यह फ़ंक्शन अकाउंटिंग, जमा करने, निकासी के लिए वॉल्ट के लिए उपयोग किए जाने वाले अंतर्निहित टोकन का पता लौटाता है।

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

यह फ़ंक्शन वॉल्ट द्वारा धारित अंतर्निहित एसेट की कुल मात्रा लौटाता है।

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

यह फ़ंक्शन `shares` की वह मात्रा लौटाता है जिसे प्रदान किए गए `assets` की मात्रा के लिए वॉल्ट द्वारा एक्सचेंज किया जाएगा।

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

यह फ़ंक्शन `assets` की वह मात्रा लौटाता है जिसे प्रदान किए गए `shares` की मात्रा के लिए वॉल्ट द्वारा एक्सचेंज किया जाएगा।

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

यह फ़ंक्शन अंतर्निहित एसेट की अधिकतम मात्रा लौटाता है जिसे एक ही [`deposit`](#deposit) कॉल में जमा किया जा सकता है, जिसमें `receiver` के लिए शेयर मिंट किए जाते हैं।

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

यह फ़ंक्शन उपयोगकर्ताओं को वर्तमान ब्लॉक पर उनके जमा के प्रभावों का अनुकरण करने की अनुमति देता है।

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

यह फ़ंक्शन वॉल्ट में अंतर्निहित टोकन के `assets` जमा करता है और `receiver` को `shares` का स्वामित्व प्रदान करता है।

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

यह फ़ंक्शन शेयरों की अधिकतम मात्रा लौटाता है जिसे एक ही [`mint`](#mint) कॉल में मिंट किया जा सकता है, जिसमें `receiver` के लिए शेयर मिंट किए जाते हैं।

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

यह फ़ंक्शन उपयोगकर्ताओं को वर्तमान ब्लॉक पर उनके मिंट के प्रभावों का अनुकरण करने की अनुमति देता है।

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

यह फ़ंक्शन अंतर्निहित टोकन के `assets` जमा करके `receiver` को ठीक `shares` वॉल्ट शेयर मिंट करता है।

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

यह फ़ंक्शन अंतर्निहित एसेट की अधिकतम मात्रा लौटाता है जिसे एक ही [`withdraw`](#withdraw) कॉल के साथ `owner` बैलेंस से निकाला जा सकता है।

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

यह फ़ंक्शन उपयोगकर्ताओं को वर्तमान ब्लॉक पर उनकी निकासी के प्रभावों का अनुकरण करने की अनुमति देता है।

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

यह फ़ंक्शन `owner` से `shares` को बर्न करता है और वॉल्ट से `receiver` को ठीक `assets` टोकन भेजता है।

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

यह फ़ंक्शन शेयरों की अधिकतम मात्रा लौटाता है जिसे [`redeem`](#redeem) कॉल के माध्यम से `owner` बैलेंस से भुनाया जा सकता है।

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

यह फ़ंक्शन उपयोगकर्ताओं को वर्तमान ब्लॉक पर उनके मोचन के प्रभावों का अनुकरण करने की अनुमति देता है।

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

यह फ़ंक्शन `owner` से `shares` की एक विशिष्ट संख्या को भुनाता है और वॉल्ट से `receiver` को अंतर्निहित टोकन का `assets` भेजता है।

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

प्रचलन में बिना भुनाए गए वॉल्ट शेयरों की कुल संख्या लौटाता है।

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

वॉल्ट शेयरों की कुल मात्रा लौटाता है जो वर्तमान में `owner` के पास है।

### इंटरफ़ेस का नक्शा {#mapoftheinterface}

![Map of the ERC-4626 interface](./map-of-erc-4626.png)

### घटनाएँ {#events}

#### Deposit घटना {#deposit-event}

जब [`mint`](#mint) और [`deposit`](#deposit) विधियों के माध्यम से वॉल्ट में टोकन जमा किए जाते हैं, तो इसे **अवश्य** उत्सर्जित किया जाना चाहिए।

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

जहाँ `sender` वह उपयोगकर्ता है जिसने `shares` के लिए `assets` का एक्सचेंज किया, और उन `shares` को `owner` में स्थानांतरित कर दिया।

#### Withdraw घटना {#withdraw-event}

जब [`redeem`](#redeem) या [`withdraw`](#withdraw) विधियों में जमाकर्ता द्वारा वॉल्ट से शेयर निकाले जाते हैं, तो इसे **अवश्य** उत्सर्जित किया जाना चाहिए।

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

जहाँ `sender` वह उपयोगकर्ता है जिसने निकासी को ट्रिगर किया और `owner` के स्वामित्व वाले `shares` को `assets` के लिए एक्सचेंज किया। `receiver` वह उपयोगकर्ता है जिसे निकाली गई `assets` प्राप्त हुई।

## आगे की जानकारी {#further-reading}

- [EIP-4626: टोकनाइज़्ड वॉल्ट मानक](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: GitHub रेपो](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)