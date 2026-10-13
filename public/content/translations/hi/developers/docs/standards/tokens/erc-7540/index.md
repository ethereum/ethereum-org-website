---
title: ⁠ERC-7540⁠ एसिंक्रोनस टोकनाइज्ड वॉल्ट स्टैंडर्ड
description: ⁠ERC-4626⁠ का एक विस्तार जो टोकनाइज्ड वॉल्ट के लिए एसिंक्रोनस जमा और मोचन (redemption) प्रवाह जोड़ता है।
lang: hi
---

## परिचय {#introduction}

ERC-7540 एसिंक्रोनस जमा और मोचन (redemption) प्रवाह के लिए समर्थन जोड़कर [ERC-4626 टोकनाइज्ड वॉल्ट स्टैंडर्ड](/developers/docs/standards/tokens/erc-4626/) का विस्तार करता है। यह एक अनुरोध-फिर-दावा (request-then-claim) पैटर्न पेश करता है: उपयोगकर्ता पहले एक अनुरोध सबमिट करते हैं (अपनी संपत्तियों या शेयरों को लॉक करते हुए), फिर वॉल्ट द्वारा इसे संसाधित करने के बाद परिणाम का दावा करते हैं।

इसकी आवश्यकता तब होती है जब कोई वॉल्ट एक ही लेन-देन में तुरंत निपटान नहीं कर सकता, उदाहरण के लिए:

- वास्तविक दुनिया की संपत्तियां (RWA) प्रोटोकॉल जैसे टोकनाइज्ड ट्रेजरी, निजी क्रेडिट, और T+1 या T+2 निपटान चक्र वाली अन्य संपत्तियां
- अंडरकोलैटरलाइज्ड ऋण देना जहां क्रेडिट मूल्यांकन ऑफचेन होता है
- क्रॉस-चेन वॉल्ट रणनीतियाँ जहाँ ब्रिजिंग के कारण देरी होती है
- अनबॉन्डिंग अवधि वाले लिक्विड स्टेकिंग टोकन (LST)

वॉल्ट केवल जमा, केवल मोचन, या दोनों पर एसिंक्रोनस होना चुन सकते हैं। यह लचीलापन वॉल्ट डेवलपर्स को केवल वहीं एसिंक (async) प्रवाह जोड़ने की अनुमति देता है जहां अंतर्निहित रणनीति को इसकी आवश्यकता होती है, जबकि दूसरे पक्ष को सिंक्रोनस रखा जाता है।

## पूर्वापेक्षाएँ {#prerequisites}

इस पृष्ठ को बेहतर ढंग से समझने के लिए, हम अनुशंसा करते हैं कि आप पहले [टोकन मानकों](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/), और [ERC-4626](/developers/docs/standards/tokens/erc-4626/) के बारे में पढ़ें।

## ERC-4626 बनाम ERC-7540 {#comparison}

ERC-4626 में, जमा का निपटान परमाणु (atomically) रूप से होता है: निवेशक संपत्तियां भेजता है और एक ही लेन-देन में शेयर वापस प्राप्त करता है।

![ERC-4626 synchronous deposit flow](./erc-4626-sync-flow.svg)

ERC-7540 इसे दो चरणों में विभाजित करता है। निवेशक पहले संपत्तियों को लॉक करने के लिए `requestDeposit()` को कॉल करता है, फिर वॉल्ट मैनेजर द्वारा अनुरोध को संसाधित करने की प्रतीक्षा करता है। एक बार पूरा हो जाने पर, निवेशक अपने शेयरों का दावा करने के लिए `deposit()` को कॉल करता है। विनिमय दरें अनुरोध के समय नहीं, बल्कि पूरा होने के समय निर्धारित की जाती हैं।

![ERC-7540 asynchronous deposit flow](./erc-7540-async-flow.svg)

मोचन प्रवाह भी इसी तरह काम करता है: `requestRedeem()` शेयरों को लॉक करता है, और एक बार पूरा हो जाने पर निवेशक संपत्तियों का दावा करने के लिए `redeem()` को कॉल करता है।

## ERC-7540 फ़ंक्शन और विशेषताएँ {#body}

ERC-7540 पूर्ण ERC-4626 इंटरफ़ेस को इनहेरिट करता है लेकिन दावा फ़ंक्शन के रूप में `deposit`/`mint`/`withdraw`/`redeem` को फिर से उपयोग करता है। नए `requestDeposit` और `requestRedeem` फ़ंक्शन प्रारंभिक अनुरोध चरण को संभालते हैं।

प्रत्येक अनुरोध तीन स्थितियों से होकर गुजरता है: लंबित (सबमिट किया गया, प्रसंस्करण की प्रतीक्षा में), दावा करने योग्य (पूरा किया गया और मूल्य निर्धारित), और दावा किया गया (निवेशक ने अपने शेयर या संपत्तियां एकत्र कर ली हैं)।

![Request lifecycle: Pending, Claimable, Claimed](./request-lifecycle.svg)

### जमा अनुरोध प्रवाह {#deposit-request-flow}

#### requestDeposit {#requestdeposit}

```solidity
function requestDeposit(uint256 assets, address controller, address owner) external returns (uint256 requestId)
```

`owner` से `assets` को वॉल्ट में ट्रांसफर करता है और जमा करने का अनुरोध सबमिट करता है। `controller` पता अनुरोध का नियंत्रण प्राप्त करता है। अनुरोध बैच की पहचान करने वाला एक `requestId` लौटाता है।

#### pendingDepositRequest {#pendingdepositrequest}

```solidity
function pendingDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

दिए गए `controller` और `requestId` के लिए एक लंबित (अभी तक दावा करने योग्य नहीं) जमा अनुरोध में `assets` की राशि लौटाता है।

#### claimableDepositRequest {#claimabledepositrequest}

```solidity
function claimableDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

दिए गए `controller` और `requestId` के लिए एक दावा करने योग्य (पूरा हो गया लेकिन अभी तक दावा नहीं किया गया) जमा अनुरोध में `assets` की राशि लौटाता है।

#### जमा का दावा करना {#claiming-deposits}

एक बार जब जमा अनुरोध दावा करने योग्य हो जाता है, तो उपयोगकर्ता अपने शेयरों का दावा करने के लिए मानक ERC-4626 [`deposit`](/developers/docs/standards/tokens/erc-4626/#deposit) या [`mint`](/developers/docs/standards/tokens/erc-4626/#mint) फ़ंक्शन को कॉल करता है। ERC-7540 में, ये फ़ंक्शन अब संपत्तियों को ट्रांसफर नहीं करते हैं (वह अनुरोध के समय पहले ही हो चुका है)। वे केवल प्राप्तकर्ता को शेयर मिंट करते हैं।

### मोचन अनुरोध प्रवाह {#redemption-request-flow}

#### requestRedeem {#requestredeem}

```solidity
function requestRedeem(uint256 shares, address controller, address owner) external returns (uint256 requestId)
```

`owner` से `shares` को लॉक करता है और मोचन का अनुरोध सबमिट करता है। `controller` पता अनुरोध का नियंत्रण प्राप्त करता है।

#### pendingRedeemRequest {#pendingredeemrequest}

```solidity
function pendingRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

दिए गए `controller` और `requestId` के लिए एक लंबित मोचन अनुरोध में `shares` की राशि लौटाता है।

#### claimableRedeemRequest {#claimableredeemrequest}

```solidity
function claimableRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

दिए गए `controller` और `requestId` के लिए एक दावा करने योग्य मोचन अनुरोध में `shares` की राशि लौटाता है।

#### मोचन का दावा करना {#claiming-redemptions}

एक बार जब मोचन अनुरोध दावा करने योग्य हो जाता है, तो उपयोगकर्ता अपनी संपत्तियों का दावा करने के लिए मानक ERC-4626 [`redeem`](/developers/docs/standards/tokens/erc-4626/#redeem) या [`withdraw`](/developers/docs/standards/tokens/erc-4626/#withdraw) फ़ंक्शन को कॉल करता है।

### ऑपरेटर प्रबंधन {#operator-management}

ERC-7540 में एक ऑपरेटर पैटर्न ([ERC-6909](https://eips.ethereum.org/EIPS/eip-6909) से) शामिल है जो तीसरे पक्ष को उपयोगकर्ता की ओर से अनुरोधों का प्रबंधन करने की अनुमति देता है।

#### setOperator {#setoperator}

```solidity
function setOperator(address operator, bool approved) external returns (bool)
```

जमा/मोचन अनुरोधों और दावों के लिए `msg.sender` की ओर से कार्य करने के लिए `operator` को स्वीकृत या रद्द करता है।

#### isOperator {#isoperator}

```solidity
function isOperator(address controller, address operator) external view returns (bool)
```

यह लौटाता है कि क्या `operator` को `controller` की ओर से कार्य करने के लिए स्वीकृत किया गया है।

### अनुरोध आईडी (Request IDs) {#request-ids}

अनुरोध आईडी (Request IDs) अनुरोधों के विभिन्न बैचों के बीच अंतर करती हैं। समान `requestId` साझा करने वाले सभी अनुरोध फंजिबल (fungible) होते हैं: वे एक साथ स्थितियों के बीच संक्रमण करते हैं और समान विनिमय दर प्राप्त करते हैं।

जब कोई वॉल्ट सभी अनुरोधों के लिए `requestId = 0` लौटाता है, तो केवल `controller` पता अनुरोध की स्थिति को अलग करता है। एक ही नियंत्रक (controller) के कई अनुरोधों को एकत्रित किया जाता है।

### घटनाएँ {#events}

#### DepositRequest घटना {#depositrequest-event}

जब [`requestDeposit`](#requestdeposit) के माध्यम से जमा अनुरोध सबमिट किया जाता है, तो इसे उत्सर्जित (emitted) किया जाना चाहिए।

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

जब [`requestRedeem`](#requestredeem) के माध्यम से मोचन अनुरोध सबमिट किया जाता है, तो इसे उत्सर्जित किया जाना चाहिए।

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

जब किसी ऑपरेटर को [`setOperator`](#setoperator) के माध्यम से स्वीकृत या रद्द किया जाता है, तो इसे उत्सर्जित किया जाना चाहिए।

```solidity
event OperatorSet(
    address indexed controller,
    address indexed operator,
    bool approved
)
```

### पूर्वावलोकन (Preview) फ़ंक्शन {#preview-functions}

पूर्वावलोकन फ़ंक्शन को केवल उन प्रवाहों के लिए रिवर्ट करना चाहिए जो एसिंक्रोनस हैं, क्योंकि विनिमय दर तब तक ज्ञात नहीं होती जब तक कि अनुरोध पूरा नहीं हो जाता। एक एसिंक-जमा (async-deposit) वॉल्ट में, `previewDeposit` और `previewMint` को रिवर्ट करना चाहिए, जबकि `previewRedeem` और `previewWithdraw` ERC-4626 की तरह काम करते रहते हैं (और एसिंक-मोचन वॉल्ट के लिए इसके विपरीत)। यह ERC-4626 से एक प्रमुख व्यवहारिक अंतर है।

## आगे की पढ़ाई {#further-reading}

- [EIP-7540: एसिंक्रोनस ERC-4626 टोकनाइज्ड वॉल्ट](https://eips.ethereum.org/EIPS/eip-7540)
- [EIP-4626: टोकनाइज्ड वॉल्ट स्टैंडर्ड](https://eips.ethereum.org/EIPS/eip-4626)
- [ओपनजेपेलिन ERC-7540 कार्यान्वयन](https://github.com/OpenZeppelin/openzeppelin-community-contracts/blob/master/contracts/token/ERC20/extensions/ERC7540.sol)