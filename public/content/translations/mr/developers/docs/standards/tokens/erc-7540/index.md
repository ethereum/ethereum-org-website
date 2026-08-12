---
title: "⁦ERC-7540⁩ असिंक्रोनस टोकनाइज्ड तिजोरी मानक"
description: "⁦ERC-4626⁩ चा एक विस्तार जो टोकनाइज्ड तिजोऱ्यांसाठी असिंक्रोनस डिपॉझिट आणि रिडेम्प्शन फ्लो जोडतो."
lang: mr
---

## परिचय {#introduction}

ERC-7540 हे असिंक्रोनस डिपॉझिट आणि रिडेम्प्शन फ्लोसाठी समर्थन जोडून [ERC-4626 टोकनाइज्ड तिजोरी मानक](/developers/docs/standards/tokens/erc-4626/) विस्तारित करते. हे एक विनंती-मग-दावा (request-then-claim) पॅटर्न सादर करते: वापरकर्ते प्रथम विनंती सबमिट करतात (त्यांची मालमत्ता किंवा शेअर्स लॉक करून), त्यानंतर तिजोरीने त्यावर प्रक्रिया केल्यानंतर परिणामावर दावा करतात.

जेव्हा एखादी तिजोरी एका व्यवहारामध्ये त्वरित अंतिम पूर्तता करू शकत नाही तेव्हा याची आवश्यकता असते, उदाहरणार्थ:

- वास्तविक जगातील मालमत्ता (RWA) प्रोटोकॉल जसे की टोकनाइज्ड ट्रेझरीज, खाजगी क्रेडिट आणि T+1 किंवा T+2 अंतिम पूर्तता सायकल असलेल्या इतर मालमत्ता
- अंडरकोलॅटरलाइज्ड कर्ज देणे जिथे क्रेडिट मूल्यांकन साखळीबाह्य होते
- क्रॉस-चेन तिजोरी रणनीती जिथे ब्रिजिंगमुळे विलंब होतो
- अनबॉन्डिंग कालावधीसह तरल स्टेकिंग टोकन (LST)

तिजोऱ्या केवळ डिपॉझिट्सवर, केवळ रिडेम्प्शनवर किंवा दोन्हीवर असिंक्रोनस असणे निवडू शकतात. ही लवचिकता तिजोरी डेव्हलपर्सना केवळ तिथेच असिंक (async) फ्लो जोडण्याची परवानगी देते जिथे अंतर्निहित रणनीतीला त्याची आवश्यकता असते, तर दुसरी बाजू सिंक्रोनस ठेवते.

## पूर्व शर्ती {#prerequisites}

हे पृष्ठ अधिक चांगल्या प्रकारे समजून घेण्यासाठी, आम्ही शिफारस करतो की तुम्ही प्रथम [टोकन मानके](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/), आणि [ERC-4626](/developers/docs/standards/tokens/erc-4626/) बद्दल वाचावे.

## ERC-4626 विरुद्ध ERC-7540 {#comparison}

ERC-4626 मध्ये, डिपॉझिटची अंतिम पूर्तता ॲटॉमिकली होते: गुंतवणूकदार मालमत्ता पाठवतो आणि एकाच व्यवहारामध्ये शेअर्स परत मिळवतो.

![ERC-4626 synchronous deposit flow](./erc-4626-sync-flow.svg)

ERC-7540 याला दोन चरणांमध्ये विभागते. गुंतवणूकदार प्रथम मालमत्ता लॉक करण्यासाठी `requestDeposit()` कॉल करतो, त्यानंतर तिजोरी व्यवस्थापकाने विनंतीवर प्रक्रिया करण्याची प्रतीक्षा करतो. एकदा पूर्ण झाल्यावर, गुंतवणूकदार त्यांच्या शेअर्सवर दावा करण्यासाठी `deposit()` कॉल करतो. विनिमय दर विनंतीच्या वेळी नाही, तर पूर्ततेच्या वेळी निश्चित केले जातात.

![ERC-7540 asynchronous deposit flow](./erc-7540-async-flow.svg)

रिडेम्प्शन फ्लो त्याच प्रकारे कार्य करतो: `requestRedeem()` शेअर्स लॉक करते, आणि एकदा पूर्ण झाल्यावर गुंतवणूकदार मालमत्तेवर दावा करण्यासाठी `redeem()` कॉल करतो.

## ERC-7540 कार्ये आणि वैशिष्ट्ये {#body}

ERC-7540 संपूर्ण ERC-4626 इंटरफेस इनहेरिट करते परंतु `deposit`/`mint`/`withdraw`/`redeem` ला दावा कार्ये म्हणून पुनर्उद्देशित करते. नवीन `requestDeposit` आणि `requestRedeem` कार्ये प्रारंभिक विनंती चरण हाताळतात.

प्रत्येक विनंती तीन स्थितींमधून जाते: प्रलंबित (सबमिट केलेली, प्रक्रियेची प्रतीक्षा करत असलेली), दावा करण्यायोग्य (पूर्ण झालेली आणि किंमत ठरलेली), आणि दावा केलेली (गुंतवणूकदाराने त्यांचे शेअर्स किंवा मालमत्ता गोळा केली आहे).

![Request lifecycle: Pending, Claimable, Claimed](./request-lifecycle.svg)

### डिपॉझिट विनंती फ्लो {#deposit-request-flow}

#### requestDeposit {#requestdeposit}

```solidity
function requestDeposit(uint256 assets, address controller, address owner) external returns (uint256 requestId)
```

`owner` कडून `assets` तिजोरीत हस्तांतरित करते आणि डिपॉझिट करण्यासाठी विनंती सबमिट करते. `controller` पत्त्याला विनंतीचे नियंत्रण प्राप्त होते. विनंती बॅच ओळखणारा `requestId` परत करते.

#### pendingDepositRequest {#pendingdepositrequest}

```solidity
function pendingDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

दिलेल्या `controller` आणि `requestId` साठी प्रलंबित (अद्याप दावा करण्यायोग्य नसलेल्या) डिपॉझिट विनंतीमधील `assets` ची रक्कम परत करते.

#### claimableDepositRequest {#claimabledepositrequest}

```solidity
function claimableDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

दिलेल्या `controller` आणि `requestId` साठी दावा करण्यायोग्य (पूर्ण झालेल्या परंतु अद्याप दावा न केलेल्या) डिपॉझिट विनंतीमधील `assets` ची रक्कम परत करते.

#### डिपॉझिट्सवर दावा करणे {#claiming-deposits}

एकदा डिपॉझिट विनंती दावा करण्यायोग्य झाली की, वापरकर्ता त्यांच्या शेअर्सवर दावा करण्यासाठी मानक ERC-4626 [`deposit`](/developers/docs/standards/tokens/erc-4626/#deposit) किंवा [`mint`](/developers/docs/standards/tokens/erc-4626/#mint) कार्याला कॉल करतो. ERC-7540 मध्ये, ही कार्ये यापुढे मालमत्ता हस्तांतरित करत नाहीत (ते विनंतीच्या वेळी आधीच घडले आहे). ते केवळ प्राप्तकर्त्याला शेअर्स मिंट करतात.

### रिडेम्प्शन विनंती फ्लो {#redemption-request-flow}

#### requestRedeem {#requestredeem}

```solidity
function requestRedeem(uint256 shares, address controller, address owner) external returns (uint256 requestId)
```

`owner` कडून `shares` लॉक करते आणि रिडीम करण्यासाठी विनंती सबमिट करते. `controller` पत्त्याला विनंतीचे नियंत्रण प्राप्त होते.

#### pendingRedeemRequest {#pendingredeemrequest}

```solidity
function pendingRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

दिलेल्या `controller` आणि `requestId` साठी प्रलंबित रिडेम्प्शन विनंतीमधील `shares` ची रक्कम परत करते.

#### claimableRedeemRequest {#claimableredeemrequest}

```solidity
function claimableRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

दिलेल्या `controller` आणि `requestId` साठी दावा करण्यायोग्य रिडेम्प्शन विनंतीमधील `shares` ची रक्कम परत करते.

#### रिडेम्प्शनवर दावा करणे {#claiming-redemptions}

एकदा रिडेम्प्शन विनंती दावा करण्यायोग्य झाली की, वापरकर्ता त्यांच्या मालमत्तेवर दावा करण्यासाठी मानक ERC-4626 [`redeem`](/developers/docs/standards/tokens/erc-4626/#redeem) किंवा [`withdraw`](/developers/docs/standards/tokens/erc-4626/#withdraw) कार्याला कॉल करतो.

### ऑपरेटर व्यवस्थापन {#operator-management}

ERC-7540 मध्ये एक ऑपरेटर पॅटर्न समाविष्ट आहे ([ERC-6909](https://eips.ethereum.org/EIPS/eip-6909) मधून) जो तृतीय पक्षांना वापरकर्त्याच्या वतीने विनंत्या व्यवस्थापित करण्याची अनुमती देतो.

#### setOperator {#setoperator}

```solidity
function setOperator(address operator, bool approved) external returns (bool)
```

डिपॉझिट/रिडीम विनंत्या आणि दाव्यांसाठी `msg.sender` च्या वतीने कार्य करण्यासाठी `operator` ला मंजूर किंवा रद्द करते.

#### isOperator {#isoperator}

```solidity
function isOperator(address controller, address operator) external view returns (bool)
```

`controller` च्या वतीने कार्य करण्यासाठी `operator` मंजूर आहे की नाही हे परत करते.

### विनंती आयडी (Request IDs) {#request-ids}

विनंती आयडी विनंत्यांच्या वेगवेगळ्या बॅचेसमध्ये फरक करतात. समान `requestId` सामायिक करणाऱ्या सर्व विनंत्या फंजिबल (fungible) असतात: त्या एकत्र स्थितींमध्ये बदलतात आणि त्यांना समान विनिमय दर प्राप्त होतो.

जेव्हा एखादी तिजोरी सर्व विनंत्यांसाठी `requestId = 0` परत करते, तेव्हा केवळ `controller` पत्ता विनंती स्थितीमध्ये फरक करतो. एकाच नियंत्रकाकडून आलेल्या अनेक विनंत्या एकत्रित केल्या जातात.

### घटना {#events}

#### DepositRequest घटना {#depositrequest-event}

जेव्हा [`requestDeposit`](#requestdeposit) द्वारे डिपॉझिट विनंती सबमिट केली जाते तेव्हा उत्सर्जित करणे आवश्यक आहे.

```solidity
event DepositRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 assets
)
```

#### RedeemRequest घटना {#redeemrequest-event}

जेव्हा [`requestRedeem`](#requestredeem) द्वारे रिडेम्प्शन विनंती सबमिट केली जाते तेव्हा उत्सर्जित करणे आवश्यक आहे.

```solidity
event RedeemRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 shares
)
```

#### OperatorSet घटना {#operatorset-event}

जेव्हा [`setOperator`](#setoperator) द्वारे ऑपरेटर मंजूर किंवा रद्द केला जातो तेव्हा उत्सर्जित करणे आवश्यक आहे.

```solidity
event OperatorSet(
    address indexed controller,
    address indexed operator,
    bool approved
)
```

### पूर्वावलोकन कार्ये {#preview-functions}

पूर्वावलोकन कार्ये केवळ असिंक्रोनस असलेल्या फ्लोसाठी पूर्ववत करणे आवश्यक आहे, कारण विनंती पूर्ण होईपर्यंत विनिमय दर ज्ञात नसतो. असिंक-डिपॉझिट तिजोरीमध्ये, `previewDeposit` आणि `previewMint` पूर्ववत करणे आवश्यक आहे, तर `previewRedeem` आणि `previewWithdraw` ERC-4626 प्रमाणेच कार्य करत राहतात (आणि असिंक-रिडीम तिजोरीसाठी याच्या उलट). हा ERC-4626 मधील एक प्रमुख वर्तणुकीचा फरक आहे.

## पुढील वाचन {#further-reading}

- [EIP-7540: असिंक्रोनस ERC-4626 टोकनाइज्ड तिजोऱ्या](https://eips.ethereum.org/EIPS/eip-7540)
- [EIP-4626: टोकनाइज्ड तिजोरी मानक](https://eips.ethereum.org/EIPS/eip-4626)
- [ओपनझेपलिन ERC-7540 अंमलबजावणी](https://github.com/OpenZeppelin/openzeppelin-community-contracts/blob/master/contracts/token/ERC20/extensions/ERC7540.sol)