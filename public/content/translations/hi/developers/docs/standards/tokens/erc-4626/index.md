---
title: "ERC-4626 टोकनाइज़्ड वॉल्ट मानक"
description: "यील्ड देने वाले वॉल्ट के लिए एक मानक।"
lang: hi
---

## परिचय {#introduction}

ERC-4626 यील्ड देने वाले वॉल्ट के तकनीकी पैरामीटर को अनुकूलित और एकीकृत करने का एक मानक है। यह टोकनाइज़्ड यील्ड-बेअरिंग वॉल्ट के लिए एक मानक API प्रदान करता है जो एकल अंतर्निहित ERC-20 टोकन के शेयरों का प्रतिनिधित्व करते हैं। ERC-4626 ERC-20 का उपयोग करने वाले टोकनाइज़्ड वॉल्ट के लिए एक वैकल्पिक विस्तार की भी रूपरेखा तैयार करता है, जो टोकन जमा करने, निकालने और शेष राशि पढ़ने के लिए बुनियादी कार्यक्षमता प्रदान करता है।

**यील्ड देने वाले वॉल्ट में ERC-4626 की भूमिका**

उधार देने वाले बाजार, एग्रीगेटर और स्वाभाविक रूप से ब्याज वाले टोकन विभिन्न रणनीतियों को निष्पादित करके उपयोगकर्ताओं को उनके क्रिप्टो टोकन पर सर्वोत्तम यील्ड खोजने में मदद करते हैं। ये रणनीतियां मामूली भिन्नता के साथ की जाती हैं, जो त्रुटि-प्रवण हो सकती हैं या विकास संसाधनों को बर्बाद कर सकती हैं।

यील्ड-बेअरिंग वॉल्ट में ERC-4626 अधिक सुसंगत और मजबूत कार्यान्वयन पैटर्न बनाकर डेवलपर्स के थोड़े से विशेष प्रयास के साथ एकीकरण प्रयास को कम करेगा और विभिन्न अनुप्रयोगों में यील्ड तक पहुंच को अनलॉक करेगा।

ERC-4626 टोकन का [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626) में पूरी तरह से वर्णन किया गया है।

**अतुल्यकालिक वॉल्ट विस्तार (ERC-7540)**

ERC-4626 एक सीमा तक एटॉमिक डिपॉजिट और रिडेम्पशन के लिए अनुकूलित है। यदि सीमा पूरी हो जाती है, तो कोई नया डिपॉजिट या रिडेम्पशन जमा नहीं किया जा सकता है। यह सीमा वॉल्ट (जैसे, वास्तविक-विश्व संपत्ति प्रोटोकॉल, अंडरकोलेटरलाइज्ड लेंडिंग प्रोटोकॉल, क्रॉस-चेन लेंडिंग प्रोटोकॉल, लिक्विड स्टेकिंग टोकन, या बीमा सुरक्षा मॉड्यूल) के साथ इंटरफेस करने के लिए एक शर्त के रूप में अतुल्यकालिक कार्यों या देरी के साथ किसी भी स्मार्ट अनुबंध प्रणाली के लिए अच्छी तरह से काम नहीं करती है।

ERC-7540 अतुल्यकालिक उपयोग के मामलों के लिए ERC-4626 वॉल्ट की उपयोगिता का विस्तार करता है। मौजूदा वॉल्ट इंटरफ़ेस (`deposit`/`withdraw`/`mint`/`redeem`) का उपयोग अतुल्यकालिक अनुरोधों का दावा करने के लिए पूरी तरह से किया जाता है।

ERC-7540 एक्सटेंशन का [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540) में पूरी तरह से वर्णन किया गया है।

**बहु-संपत्ति वॉल्ट विस्तार (ERC-7575)**

एक अनुपलब्ध उपयोग का मामला जो ERC-4626 द्वारा समर्थित नहीं है, वह वॉल्ट हैं जिनमें चलनिधि प्रदाता (LP) टोकन जैसी कई संपत्तियां या प्रवेश बिंदु हैं। ERC-4626 की स्वयं एक ERC-20 होने की आवश्यकता के कारण ये आम तौर पर बोझिल या गैर-अनुपालक होते हैं।

ERC-7575, ERC-4626 कार्यान्वयन से ERC-20 टोकन कार्यान्वयन को बाहरी बनाकर कई संपत्तियों वाले वॉल्ट के लिए समर्थन जोड़ता है।

ERC-7575 एक्सटेंशन का [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575) में पूरी तरह से वर्णन किया गया है।

## पूर्वापेक्षाएं {#prerequisites}

इस पेज को बेहतर ढंग से समझने के लिए, हम अनुशंसा करते हैं कि आप पहले [टोकन मानकों](/developers/docs/standards/tokens/) और [ERC-20](/developers/docs/standards/tokens/erc-20/) के बारे में पढ़ें।

## ERC-4626 कार्य और सुविधाएँ: {#body}

### तरीके {#methods}

#### संपत्ति {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

यह फ़ंक्शन लेखांकन, जमा करने और निकालने के लिए वॉल्ट के लिए उपयोग किए जाने वाले अंतर्निहित टोकन का पता लौटाता है।

#### कुल संपत्ति {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

यह फ़ंक्शन वॉल्ट द्वारा धारित अंतर्निहित संपत्तियों की कुल राशि लौटाता है।

#### शेयरों में बदलें {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

यह फ़ंक्शन `shares` की राशि लौटाता है जिसे प्रदान की गई `assets` की राशि के लिए वॉल्ट द्वारा एक्सचेंज किया जाएगा।

#### संपत्ति में बदलें {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

यह फ़ंक्शन `assets` की राशि लौटाता है जिसे प्रदान की गई `shares` की राशि के लिए वॉल्ट द्वारा एक्सचेंज किया जाएगा।

#### अधिकतम जमा {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

यह फ़ंक्शन अंतर्निहित संपत्ति की अधिकतम राशि लौटाता है जिसे एक [`deposit`](#deposit) कॉल में जमा किया जा सकता है, `receiver` के लिए शेयर मिंट किए गए हैं।

#### जमा का पूर्वावलोकन {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

यह फ़ंक्शन उपयोगकर्ताओं को वर्तमान ब्लॉक पर अपनी जमा राशि के प्रभावों का अनुकरण करने की अनुमति देता है।

#### जमा करें {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

यह फ़ंक्शन अंतर्निहित टोकन की `assets` वॉल्ट में जमा करता है और `receiver` को `shares` का स्वामित्व प्रदान करता है।

#### अधिकतम मिंट {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

यह फ़ंक्शन उन शेयरों की अधिकतम राशि लौटाता है जिन्हें एक [`mint`](#mint) कॉल में मिंट किया जा सकता है, `receiver` के लिए मिंट किए गए शेयरों के साथ।

#### मिंट का पूर्वावलोकन करें {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

यह फ़ंक्शन उपयोगकर्ताओं को वर्तमान ब्लॉक पर उनके मिंट के प्रभावों का अनुकरण करने की अनुमति देता है।

#### मिंट करें {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

यह फ़ंक्शन अंतर्निहित टोकन की `assets` जमा करके `receiver` को ठीक `shares` वॉल्ट शेयर मिंट करता है।

#### अधिकतम निकासी {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

यह फ़ंक्शन अंतर्निहित संपत्ति की अधिकतम राशि लौटाता है जिसे एक [`withdraw`](#withdraw) कॉल के साथ `owner` की शेष राशि से निकाला जा सकता है।

#### निकासी का पूर्वावलोकन {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

यह फ़ंक्शन उपयोगकर्ताओं को वर्तमान ब्लॉक पर उनकी निकासी के प्रभावों का अनुकरण करने की अनुमति देता है।

#### निकालना {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

यह फ़ंक्शन `owner` से `shares` को बर्न करता है और वॉल्ट से `receiver` को ठीक `assets` टोकन भेजता है।

#### अधिकतम रिडीम {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

यह फ़ंक्शन उन शेयरों की अधिकतम राशि लौटाता है जिन्हें [`redeem`](#redeem) कॉल के माध्यम से `owner` शेष राशि से रिडीम किया जा सकता है।

#### रिडीम का पूर्वावलोकन करें {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

यह फ़ंक्शन उपयोगकर्ताओं को वर्तमान ब्लॉक पर उनके रिडेम्पशन के प्रभावों का अनुकरण करने की अनुमति देता है।

#### रिडीम करें {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

यह फ़ंक्शन `owner` से `shares` की एक विशिष्ट संख्या को रिडीम करता है और वॉल्ट से `receiver` को अंतर्निहित टोकन की `assets` भेजता है।

#### कुल आपूर्ति {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

प्रचलन में अप्रतिदेय वॉल्ट शेयरों की कुल संख्या लौटाता है।

#### शेष राशि {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

वॉल्ट शेयरों की कुल राशि लौटाता है जो `owner` के पास वर्तमान में है।

### इंटरफ़ेस का मानचित्र {#mapOfTheInterface}

![ERC-4626 इंटरफ़ेस का नक्शा](./map-of-erc-4626.png)

### घटनाएँ {#events}

#### जमा इवेंट

जब टोकन [`mint`](#mint) और [`deposit`](#deposit) तरीकों के माध्यम से वॉल्ट में जमा किए जाते हैं तो **अवश्य** उत्सर्जित होना चाहिए।

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

जहाँ `sender` वह उपयोगकर्ता है जिसने `assets` के बदले `shares` का आदान-प्रदान किया, और उन `shares` को `owner` को हस्तांतरित किया।

#### निकासी इवेंट

जब एक जमाकर्ता द्वारा [`redeem`](#redeem) या [`withdraw`](#withdraw) विधियों में वॉल्ट से शेयर निकाले जाते हैं तो **अवश्य** उत्सर्जित होना चाहिए।

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

जहाँ `sender` वह उपयोगकर्ता है जिसने निकासी शुरू की और `owner` के स्वामित्व वाले `shares` को `assets` के बदले में एक्सचेंज किया। `receiver` वह उपयोगकर्ता है जिसे निकाली गई `assets` प्राप्त हुई।

## आगे की रीडिंग {#further-reading}

- [EIP-4626: टोकनाइज़्ड वॉल्ट मानक](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: GitHub रेपो](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)
