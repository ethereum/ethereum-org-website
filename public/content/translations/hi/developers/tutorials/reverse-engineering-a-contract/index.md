---
title: "एक अनुबंध की रिवर्स इंजीनियरिंग"
description: "जब आपके पास सोर्स कोड न हो तो किसी अनुबंध को कैसे समझें"
author: "ओरी पोमेरेंट्ज़"
lang: hi
tags: ["evm", "ऑपकोड"]
skill: advanced
breadcrumb: "रिवर्स इंजीनियरिंग"
published: 2021-12-30
---
## परिचय {#introduction}

_ब्लॉकचेन पर कोई रहस्य नहीं होते हैं_, जो कुछ भी होता है वह सुसंगत, सत्यापन योग्य और सार्वजनिक रूप से उपलब्ध होता है। आदर्श रूप से, [अनुबंधों का सोर्स कोड Etherscan पर प्रकाशित और सत्यापित होना चाहिए](https://etherscan.io/address/0xb8901acb165ed027e32754e0ffe830802919727f#code)। हालाँकि, [हमेशा ऐसा नहीं होता है](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#code)। इस लेख में आप सीखेंगे कि बिना सोर्स कोड वाले अनुबंध को देखकर अनुबंधों की रिवर्स इंजीनियरिंग कैसे की जाती है, [`0x2510c039cc3b061d79e564b38836da87e31b342f`](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f)।

रिवर्स कंपाइलर मौजूद हैं, लेकिन वे हमेशा [उपयोगी परिणाम](https://etherscan.io/bytecode-decompiler?a=0x2510c039cc3b061d79e564b38836da87e31b342f) नहीं देते हैं। इस लेख में आप सीखेंगे कि [ऑपकोड](https://github.com/wolflo/evm-opcodes) से मैन्युअल रूप से रिवर्स इंजीनियरिंग करके किसी अनुबंध को कैसे समझा जाए, साथ ही डीकंपाइलर के परिणामों की व्याख्या कैसे की जाए।

इस लेख को समझने के लिए आपको पहले से ही EVM की बुनियादी जानकारी होनी चाहिए, और EVM असेंबलर से कम से कम थोड़ा परिचित होना चाहिए। [आप इन विषयों के बारे में यहाँ पढ़ सकते हैं](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e)।

## निष्पादन योग्य कोड तैयार करें {#prepare-the-executable-code}

आप अनुबंध के लिए Etherscan पर जाकर, **Contract** टैब पर क्लिक करके और फिर **Switch to Opcodes View** पर क्लिक करके ऑपकोड प्राप्त कर सकते हैं। आपको एक ऐसा दृश्य मिलता है जिसमें प्रति पंक्ति एक ऑपकोड होता है।

![Opcode View from Etherscan](opcode-view.png)

हालाँकि, जंप (jumps) को समझने में सक्षम होने के लिए, आपको यह जानना होगा कि कोड में प्रत्येक ऑपकोड कहाँ स्थित है। ऐसा करने का एक तरीका Google Spreadsheet खोलना और ऑपकोड को कॉलम C में पेस्ट करना है। [आप इस पहले से तैयार स्प्रेडशीट की एक कॉपी बनाकर निम्नलिखित चरणों को छोड़ सकते हैं](https://docs.google.com/spreadsheets/d/1tKmTJiNjUwHbW64wCKOSJxHjmh0bAUapt6btUYE7kDA/edit?usp=sharing)।

अगला कदम सही कोड स्थान प्राप्त करना है ताकि हम जंप को समझ सकें। हम ऑपकोड का आकार कॉलम B में, और स्थान (हेक्साडेसिमल में) कॉलम A में रखेंगे। इस फ़ंक्शन को सेल `B1` में टाइप करें और फिर इसे कोड के अंत तक, कॉलम B के बाकी हिस्सों के लिए कॉपी और पेस्ट करें। ऐसा करने के बाद आप कॉलम B को छिपा सकते हैं।

```
=1+IF(REGEXMATCH(C1,"PUSH"),REGEXEXTRACT(C1,"PUSH(\d+)"),0)
```

सबसे पहले यह फ़ंक्शन स्वयं ऑपकोड के लिए एक बाइट जोड़ता है, और फिर `PUSH` को खोजता है। PUSH ऑपकोड विशेष होते हैं क्योंकि उन्हें पुश किए जा रहे मान के लिए अतिरिक्त बाइट्स की आवश्यकता होती है। यदि ऑपकोड एक `PUSH` है, तो हम बाइट्स की संख्या निकालते हैं और उसे जोड़ते हैं।

`A1` में पहला ऑफ़सेट, शून्य रखें। फिर, `A2` में, इस फ़ंक्शन को रखें और इसे फिर से कॉलम A के बाकी हिस्सों के लिए कॉपी और पेस्ट करें:

```
=dec2hex(hex2dec(A1)+B1)
```

हमें हेक्साडेसिमल मान देने के लिए इस फ़ंक्शन की आवश्यकता है क्योंकि जंप (`JUMP` और `JUMPI`) से पहले पुश किए गए मान हमें हेक्साडेसिमल में दिए जाते हैं।

## एंट्री पॉइंट (0x00) {#the-entry-point-0x00}

अनुबंध हमेशा पहले बाइट से निष्पादित होते हैं। यह कोड का प्रारंभिक भाग है:

| ऑफ़सेट | ऑपकोड       | स्टैक (ऑपकोड के बाद) |
| -----: | ------------ | ------------------------ |
|      0 | PUSH1 0x80   | 0x80                     |
|      2 | PUSH1 0x40   | 0x40, 0x80               |
|      4 | MSTORE       | खाली                    |
|      5 | PUSH1 0x04   | 0x04                     |
|      7 | CALLDATASIZE | CALLDATASIZE 0x04        |
|      8 | LT           | CALLDATASIZE\<4           |
|      9 | PUSH2 0x005e | 0x5E CALLDATASIZE\<4      |
|      C | JUMPI        | खाली                    |

यह कोड दो काम करता है:

1. मेमोरी लोकेशन 0x40-0x5F में 32 बाइट वैल्यू के रूप में 0x80 लिखें (0x80 को 0x5F में स्टोर किया जाता है, और 0x40-0x5E सभी शून्य हैं)।
2. कॉल डेटा का आकार पढ़ें। आमतौर पर एक Ethereum अनुबंध के लिए कॉल डेटा [ABI (एप्लिकेशन बाइनरी इंटरफ़ेस)](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html) का पालन करता है, जिसके लिए फ़ंक्शन चयनकर्ता के लिए कम से कम चार बाइट्स की आवश्यकता होती है। यदि कॉल डेटा का आकार चार से कम है, तो 0x5E पर जंप करें।

![Flowchart for this portion](flowchart-entry.png)

### 0x5E पर हैंडलर (गैर-ABI कॉल डेटा के लिए) {#the-handler-at-0x5e-for-non-abi-call-data}

| ऑफ़सेट | ऑपकोड       |
| -----: | ------------ |
|     5E | JUMPDEST     |
|     5F | CALLDATASIZE |
|     60 | PUSH2 0x007c |
|     63 | JUMPI        |

यह स्निपेट `JUMPDEST` के साथ शुरू होता है। EVM (Ethereum वर्चुअल मशीन) प्रोग्राम एक अपवाद (एक्सेप्शन) थ्रो करते हैं यदि आप किसी ऐसे ऑपकोड पर जंप करते हैं जो `JUMPDEST` नहीं है। फिर यह CALLDATASIZE को देखता है, और यदि यह "सत्य" (यानी, शून्य नहीं) है तो 0x7C पर जंप करता है। हम नीचे इस पर चर्चा करेंगे।

| ऑफ़सेट | ऑपकोड     | स्टैक (ऑपकोड के बाद)                                                       |
| -----: | ---------- | -------------------------------------------------------------------------- |
|     64 | CALLVALUE  | कॉल द्वारा प्रदान किया गया [Wei](/glossary/#wei)। Solidity में इसे `msg.value` कहा जाता है |
|     65 | PUSH1 0x06 | 6 CALLVALUE                                                                |
|     67 | PUSH1 0x00 | 0 6 CALLVALUE                                                              |
|     69 | DUP3       | CALLVALUE 0 6 CALLVALUE                                                    |
|     6A | DUP3       | 6 CALLVALUE 0 6 CALLVALUE                                                  |
|     6B | SLOAD      | Storage[6] CALLVALUE 0 6 CALLVALUE                                         |

इसलिए जब कोई कॉल डेटा नहीं होता है तो हम Storage[6] का मान पढ़ते हैं। हम अभी तक नहीं जानते कि यह मान क्या है, लेकिन हम उन लेन-देन की तलाश कर सकते हैं जो अनुबंध को बिना किसी कॉल डेटा के प्राप्त हुए हैं। ऐसे लेन-देन जो बिना किसी कॉल डेटा (और इसलिए बिना किसी विधि) के केवल ETH ट्रांसफर करते हैं, Etherscan में उनकी विधि `Transfer` होती है। वास्तव में, [अनुबंध को प्राप्त हुआ सबसे पहला लेन-देन](https://etherscan.io/tx/0xeec75287a583c36bcc7ca87685ab41603494516a0f5986d18de96c8e630762e7) एक ट्रांसफर है।

यदि हम उस लेन-देन में देखते हैं और **Click to see More** पर क्लिक करते हैं, तो हम देखते हैं कि कॉल डेटा, जिसे इनपुट डेटा कहा जाता है, वास्तव में खाली है (`0x`)। यह भी ध्यान दें कि मान 1.559 ETH है, जो बाद में प्रासंगिक होगा।

![The call data is empty](calldata-empty.png)

इसके बाद, **स्थिति** टैब पर क्लिक करें और उस अनुबंध का विस्तार करें जिसे हम रिवर्स इंजीनियर कर रहे हैं (0x2510...)। आप देख सकते हैं कि लेन-देन के दौरान `Storage[6]` बदल गया था, और यदि आप Hex को **Number** में बदलते हैं, तो आप देखते हैं कि यह 1,559,000,000,000,000,000 हो गया, जो wei में ट्रांसफर किया गया मान है (मैंने स्पष्टता के लिए अल्पविराम जोड़े हैं), जो अगले अनुबंध मान के अनुरूप है।

![Storage[6] में बदलाव](storage6.png)

यदि हम [उसी अवधि के अन्य `Transfer` लेन-देन](https://etherscan.io/tx/0xf708d306de39c422472f43cb975d97b66fd5d6a6863db627067167cbf93d84d1#statechange) के कारण हुए स्थिति परिवर्तनों को देखते हैं, तो हम देखते हैं कि `Storage[6]` ने कुछ समय के लिए अनुबंध के मान को ट्रैक किया। अभी के लिए हम इसे `Value*` कहेंगे। तारांकन (`*`) हमें याद दिलाता है कि हम अभी तक यह नहीं _जानते_ हैं कि यह वेरिएबल क्या करता है, लेकिन यह केवल अनुबंध के मान को ट्रैक करने के लिए नहीं हो सकता है क्योंकि स्टोरेज का उपयोग करने की कोई आवश्यकता नहीं है, जो बहुत महंगा है, जब आप `ADDRESS BALANCE` का उपयोग करके अपने खाते का बैलेंस प्राप्त कर सकते हैं। पहला ऑपकोड अनुबंध के स्वयं के पते को पुश करता है। दूसरा स्टैक के शीर्ष पर मौजूद पते को पढ़ता है और उसे उस पते के बैलेंस से बदल देता है।

| ऑफ़सेट | ऑपकोड       | स्टैक                                       |
| -----: | ------------ | ------------------------------------------- |
|     6C | PUSH2 0x0075 | 0x75 Value\* CALLVALUE 0 6 CALLVALUE        |
|     6F | SWAP2        | CALLVALUE Value\* 0x75 0 6 CALLVALUE        |
|     70 | SWAP1        | Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|     71 | PUSH2 0x01a7 | 0x01A7 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|     74 | JUMP         |

हम जंप डेस्टिनेशन पर इस कोड को ट्रेस करना जारी रखेंगे।

| ऑफ़सेट | ऑपकोड     | स्टैक                                                       |
| -----: | ---------- | ----------------------------------------------------------- |
|    1A7 | JUMPDEST   | Value\* CALLVALUE 0x75 0 6 CALLVALUE                        |
|    1A8 | PUSH1 0x00 | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE                   |
|    1AA | DUP3       | CALLVALUE 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AB | NOT        | 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |

`NOT` बिटवाइज़ है, इसलिए यह कॉल वैल्यू में प्रत्येक बिट के मान को उलट देता है।

| ऑफ़सेट | ऑपकोड       | स्टैक                                                                       |
| -----: | ------------ | --------------------------------------------------------------------------- |
|    1AC | DUP3         | Value\* 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AD | GT           | Value\*>2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AE | ISZERO       | Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|    1AF | PUSH2 0x01df | 0x01DF Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1B2 | JUMPI        |

हम जंप करते हैं यदि `Value*`, 2^256-CALLVALUE-1 से छोटा या उसके बराबर है। यह ओवरफ़्लो को रोकने के लॉजिक जैसा दिखता है। और वास्तव में, हम देखते हैं कि कुछ निरर्थक ऑपरेशनों (उदाहरण के लिए, मेमोरी में लिखना जो डिलीट होने वाला है) के बाद ऑफ़सेट 0x01DE पर, यदि ओवरफ़्लो का पता चलता है तो अनुबंध रिवर्ट हो जाता है, जो कि सामान्य व्यवहार है।

ध्यान दें कि इस तरह का ओवरफ़्लो होने की संभावना बहुत कम है, क्योंकि इसके लिए कॉल वैल्यू और `Value*` का योग 2^256 wei के बराबर होना चाहिए, जो लगभग 10^59 ETH है। [लिखते समय, कुल ETH आपूर्ति दो सौ मिलियन से कम है](https://etherscan.io/stat/supply)।

| ऑफ़सेट | ऑपकोड   | स्टैक                                     |
| -----: | -------- | ----------------------------------------- |
|    1DF | JUMPDEST | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1E0 | POP      | Value\* CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E1 | ADD      | Value\*+CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E2 | SWAP1    | 0x75 Value\*+CALLVALUE 0 6 CALLVALUE      |
|    1E3 | JUMP     |

यदि हम यहाँ पहुँच गए हैं, तो `Value* + CALLVALUE` प्राप्त करें और ऑफ़सेट 0x75 पर जंप करें।

| ऑफ़सेट | ऑपकोड   | स्टैक                           |
| -----: | -------- | ------------------------------- |
|     75 | JUMPDEST | Value\*+CALLVALUE 0 6 CALLVALUE |
|     76 | SWAP1    | 0 Value\*+CALLVALUE 6 CALLVALUE |
|     77 | SWAP2    | 6 Value\*+CALLVALUE 0 CALLVALUE |
|     78 | SSTORE   | 0 CALLVALUE                     |

यदि हम यहाँ पहुँचते हैं (जिसके लिए कॉल डेटा का खाली होना आवश्यक है) तो हम `Value*` में कॉल वैल्यू जोड़ते हैं। यह उस बात के अनुरूप है जो हम कहते हैं कि `Transfer` लेन-देन करते हैं।

| ऑफ़सेट | ऑपकोड |
| -----: | ------ |
|     79 | POP    |
|     7A | POP    |
|     7B | STOP   |

अंत में, स्टैक को साफ़ करें (जो आवश्यक नहीं है) और लेन-देन के सफल अंत का संकेत दें।

संक्षेप में कहें तो, यहाँ प्रारंभिक कोड के लिए एक फ़्लोचार्ट दिया गया है।

![Entry point flowchart](flowchart-entry.png)

## 0x7C पर हैंडलर {#the-handler-at-0x7c}

मैंने जानबूझकर हेडिंग में यह नहीं बताया कि यह हैंडलर क्या करता है। इसका उद्देश्य आपको यह सिखाना नहीं है कि यह विशिष्ट अनुबंध कैसे काम करता है, बल्कि यह सिखाना है कि अनुबंधों को रिवर्स इंजीनियर कैसे किया जाए। आप उसी तरह सीखेंगे कि यह क्या करता है जैसे मैंने सीखा था, कोड का पालन करके।

हम यहां कई जगहों से आते हैं:

- यदि 1, 2, या 3 बाइट्स का कॉल डेटा है (ऑफ़सेट 0x63 से)
- यदि विधि का हस्ताक्षर अज्ञात है (ऑफ़सेट 0x42 और 0x5D से)

| ऑफ़सेट | ऑपकोड | स्टैक |
| -----: | ------------ | -------------------- |
|     7C | JUMPDEST     |
|     7D | PUSH1 0x00   | 0x00                 |
|     7F | PUSH2 0x009d | 0x9D 0x00            |
|     82 | PUSH1 0x03   | 0x03 0x9D 0x00       |
|     84 | SLOAD        | Storage[3] 0x9D 0x00 |

यह एक और स्टोरेज सेल है, जो मुझे किसी भी लेन-देन में नहीं मिला, इसलिए यह जानना कठिन है कि इसका क्या अर्थ है। नीचे दिया गया कोड इसे और स्पष्ट कर देगा।

| ऑफ़सेट | ऑपकोड | स्टैक |
| -----: | ------------------------------------------------- | ------------------------------- |
|     85 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xff....ff Storage[3] 0x9D 0x00 |
|     9A | AND                                               | Storage[3]-as-address 0x9D 0x00 |

ये ऑपकोड Storage[3] से पढ़े गए मान को 160 बिट्स तक छोटा कर देते हैं, जो कि एक Ethereum पते की लंबाई है।

| ऑफ़सेट | ऑपकोड | स्टैक |
| -----: | ------ | ------------------------------- |
|     9B | SWAP1  | 0x9D Storage[3]-as-address 0x00 |
|     9C | JUMP   | Storage[3]-as-address 0x00      |

यह जंप अनावश्यक है, क्योंकि हम अगले ऑपकोड पर जा रहे हैं। यह कोड उतना गैस-कुशल नहीं है जितना यह हो सकता था।

| ऑफ़सेट | ऑपकोड | स्टैक |
| -----: | ---------- | ------------------------------- |
|     9D | JUMPDEST   | Storage[3]-as-address 0x00      |
|     9E | SWAP1      | 0x00 Storage[3]-as-address      |
|     9F | POP        | Storage[3]-as-address           |
|     A0 | PUSH1 0x40 | 0x40 Storage[3]-as-address      |
|     A2 | MLOAD      | Mem[0x40] Storage[3]-as-address |

कोड की बिल्कुल शुरुआत में हमने Mem[0x40] को 0x80 पर सेट किया था। यदि हम बाद में 0x40 को देखते हैं, तो हम पाते हैं कि हम इसे नहीं बदलते हैं - इसलिए हम मान सकते हैं कि यह 0x80 है।

| ऑफ़सेट | ऑपकोड | स्टैक |
| -----: | ------------ | ------------------------------------------------- |
|     A3 | CALLDATASIZE | CALLDATASIZE 0x80 Storage[3]-as-address           |
|     A4 | PUSH1 0x00   | 0x00 CALLDATASIZE 0x80 Storage[3]-as-address      |
|     A6 | DUP3         | 0x80 0x00 CALLDATASIZE 0x80 Storage[3]-as-address |
|     A7 | CALLDATACOPY | 0x80 Storage[3]-as-address                        |

सभी कॉल डेटा को मेमोरी में कॉपी करें, जो 0x80 से शुरू होता है।

| ऑफ़सेट | ऑपकोड | स्टैक |
| -----: | ------------- | -------------------------------------------------------------------------------- |
|     A8 | PUSH1 0x00    | 0x00 0x80 Storage[3]-as-address                                                  |
|     AA | DUP1          | 0x00 0x00 0x80 Storage[3]-as-address                                             |
|     AB | CALLDATASIZE  | CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                                |
|     AC | DUP4          | 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                           |
|     AD | DUP6          | Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address     |
|     AE | GAS           | GAS Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address |
|     AF | DELEGATE_CALL |

अब चीजें बहुत स्पष्ट हैं। यह अनुबंध एक [प्रॉक्सी](https://blog.openzeppelin.com/proxy-patterns/) के रूप में कार्य कर सकता है, जो वास्तविक काम करने के लिए Storage[3] में पते को कॉल करता है। `DELEGATE_CALL` एक अलग अनुबंध को कॉल करता है, लेकिन उसी स्टोरेज में रहता है। इसका मतलब है कि डेलिगेटेड अनुबंध, जिसके लिए हम एक प्रॉक्सी हैं, उसी स्टोरेज स्पेस तक पहुंचता है। कॉल के लिए पैरामीटर हैं:

- _गैस_: बची हुई सभी गैस
- _कॉल किया गया पता_: Storage[3]-as-address
- _कॉल डेटा_: 0x80 से शुरू होने वाले CALLDATASIZE बाइट्स, जहां हमने मूल कॉल डेटा रखा था
- _रिटर्न डेटा_: कोई नहीं (0x00 - 0x00) हम अन्य माध्यमों से रिटर्न डेटा प्राप्त करेंगे (नीचे देखें)

| ऑफ़सेट | ऑपकोड | स्टैक |
| -----: | -------------- | --------------------------------------------------------------------------------------------- |
|     B0 | RETURNDATASIZE | RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                          |
|     B1 | DUP1           | RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address           |
|     B2 | PUSH1 0x00     | 0x00 RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|     B4 | DUP5           | 0x80 0x00 RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|     B5 | RETURNDATACOPY | RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                          |

यहां हम सभी रिटर्न डेटा को 0x80 से शुरू होने वाले मेमोरी बफर में कॉपी करते हैं।

| ऑफ़सेट | ऑपकोड | स्टैक |
| -----: | ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
|     B6 | DUP2         | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                              |
|     B7 | DUP1         | (((call success/failure))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address   |
|     B8 | ISZERO       | (((did the call fail))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|     B9 | PUSH2 0x00c0 | 0xC0 (((did the call fail))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|     BC | JUMPI        | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                              |
|     BD | DUP2         | RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address               |
|     BE | DUP5         | 0x80 RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address          |
|     BF | RETURN       |                                                                                                                              |

तो कॉल के बाद हम रिटर्न डेटा को बफर 0x80 - 0x80+RETURNDATASIZE में कॉपी करते हैं, और यदि कॉल सफल होती है तो हम ठीक उसी बफर के साथ `RETURN` करते हैं।

### DELEGATECALL विफल रहा {#delegatecall-failed}

यदि हम यहां 0xC0 पर आते हैं, तो इसका मतलब है कि जिस अनुबंध को हमने कॉल किया था वह रिवर्ट हो गया। चूंकि हम उस अनुबंध के लिए केवल एक प्रॉक्सी हैं, हम वही डेटा वापस करना चाहते हैं और रिवर्ट भी करना चाहते हैं।

| ऑफ़सेट | ऑपकोड | स्टैक |
| -----: | -------- | ------------------------------------------------------------------------------------------------------------------- |
|     C0 | JUMPDEST | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                     |
|     C1 | DUP2     | RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|     C2 | DUP5     | 0x80 RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|     C3 | REVERT   |

इसलिए हम उसी बफर के साथ `REVERT` करते हैं जिसका उपयोग हमने पहले `RETURN` के लिए किया था: 0x80 - 0x80+RETURNDATASIZE

![Call to proxy flowchart](flowchart-proxy.png)

## ABI कॉल {#abi-calls}

यदि कॉल डेटा का आकार चार बाइट्स या उससे अधिक है, तो यह एक मान्य ABI कॉल हो सकता है।

| ऑफ़सेट | ऑपकोड | स्टैक |
| -----: | ------------ | ------------------------------------------------- |
|      D | PUSH1 0x00   | 0x00                                              |
|      F | CALLDATALOAD | (((कॉल डेटा का पहला शब्द (256 बिट्स))))      |
|     10 | PUSH1 0xe0   | 0xE0 (((कॉल डेटा का पहला शब्द (256 बिट्स)))) |
|     12 | SHR          | (((कॉल डेटा के पहले 32 बिट्स (4 बाइट्स))))    |

Etherscan हमें बताता है कि `1C` एक अज्ञात ऑपकोड है, क्योंकि [इसे Etherscan द्वारा इस सुविधा को लिखने के बाद जोड़ा गया था](https://eips.ethereum.org/EIPS/eip-145) और उन्होंने इसे अपडेट नहीं किया है। एक [अप-टू-डेट ऑपकोड तालिका](https://github.com/wolflo/evm-opcodes) हमें दिखाती है कि यह शिफ्ट राइट (shift right) है

| ऑफ़सेट | ऑपकोड           | स्टैक                                                                                                    |
| -----: | ---------------- | -------------------------------------------------------------------------------------------------------- |
|     13 | DUP1             | (((कॉल डेटा के पहले 32 बिट्स (4 बाइट्स)))) (((कॉल डेटा के पहले 32 बिट्स (4 बाइट्स))))            |
|     14 | PUSH4 0x3cd8045e | 0x3CD8045E (((कॉल डेटा के पहले 32 बिट्स (4 बाइट्स)))) (((कॉल डेटा के पहले 32 बिट्स (4 बाइट्स)))) |
|     19 | GT               | 0x3CD8045E>first-32-bits-of-the-call-data (((कॉल डेटा के पहले 32 बिट्स (4 बाइट्स))))                 |
|     1A | PUSH2 0x0043     | 0x43 0x3CD8045E>first-32-bits-of-the-call-data (((कॉल डेटा के पहले 32 बिट्स (4 बाइट्स))))            |
|     1D | JUMPI            | (((कॉल डेटा के पहले 32 बिट्स (4 बाइट्स))))                                                           |

इस तरह विधि हस्ताक्षर मिलान परीक्षणों को दो भागों में विभाजित करने से औसतन आधे परीक्षण बच जाते हैं। इसके तुरंत बाद आने वाला कोड और 0x43 में मौजूद कोड एक ही पैटर्न का पालन करते हैं: कॉल डेटा के पहले 32 बिट्स को `DUP1` करें, `PUSH4 (((method signature>` करें, समानता की जांच करने के लिए `EQ` चलाएं, और फिर यदि विधि हस्ताक्षर मेल खाता है तो `JUMPI` करें। यहाँ विधि हस्ताक्षर, उनके पते, और यदि ज्ञात हो तो [संबंधित विधि परिभाषा](https://www.4byte.directory/) दी गई है:

| विधि                                                                                 | विधि हस्ताक्षर | जंप करने के लिए ऑफ़सेट |
| -------------------------------------------------------------------------------------- | ---------------- | ------------------- |
| [splitter()](https://www.4byte.directory/signatures/?bytes4_signature=0x3cd8045e)      | 0x3cd8045e       | 0x0103              |
| ???                                                                                    | 0x81e580d3       | 0x0138              |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4) | 0xba0bafb4       | 0x0158              |
| ???                                                                                    | 0x1f135823       | 0x00C4              |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)    | 0x2eb4a7ab       | 0x00ED              |

यदि कोई मिलान नहीं मिलता है, तो कोड इस उम्मीद में [0x7C पर प्रॉक्सी हैंडलर](#the-handler-at-0x7c) पर जंप करता है, कि जिस अनुबंध के लिए हम एक प्रॉक्सी हैं, उसमें कोई मिलान हो।

![ABI calls flowchart](flowchart-abi.png)

## splitter() {#splitter}

| ऑफ़सेट | ऑपकोड       | स्टैक                         |
| -----: | ------------ | ----------------------------- |
|    103 | JUMPDEST     |
|    104 | CALLVALUE    | CALLVALUE                     |
|    105 | DUP1         | CALLVALUE CALLVALUE           |
|    106 | ISZERO       | CALLVALUE==0 CALLVALUE        |
|    107 | PUSH2 0x010f | 0x010F CALLVALUE==0 CALLVALUE |
|    10A | JUMPI        | CALLVALUE                     |
|    10B | PUSH1 0x00   | 0x00 CALLVALUE                |
|    10D | DUP1         | 0x00 0x00 CALLVALUE           |
|    10E | REVERT       |

यह फ़ंक्शन सबसे पहले यह जांचता है कि कॉल ने कोई ETH तो नहीं भेजा है। यह फ़ंक्शन [`payable`](https://solidity-by-example.org/payable/) नहीं है। अगर किसी ने हमें ETH भेजा है तो यह एक गलती होनी चाहिए और हम `REVERT` करना चाहते हैं ताकि वह ETH ऐसी जगह न फंस जाए जहां से वे उसे वापस न पा सकें।

| ऑफ़सेट | ऑपकोड                                            | स्टैक                                                                       |
| -----: | ------------------------------------------------- | --------------------------------------------------------------------------- |
|    10F | JUMPDEST                                          |
|    110 | POP                                               |
|    111 | PUSH1 0x03                                        | 0x03                                                                        |
|    113 | SLOAD                                             | (((Storage[3] यानी वह अनुबंध जिसके लिए हम एक प्रॉक्सी हैं)))                |
|    114 | PUSH1 0x40                                        | 0x40 (((Storage[3] यानी वह अनुबंध जिसके लिए हम एक प्रॉक्सी हैं)))           |
|    116 | MLOAD                                             | 0x80 (((Storage[3] यानी वह अनुबंध जिसके लिए हम एक प्रॉक्सी हैं)))           |
|    117 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xFF...FF 0x80 (((Storage[3] यानी वह अनुबंध जिसके लिए हम एक प्रॉक्सी हैं))) |
|    12C | SWAP1                                             | 0x80 0xFF...FF (((Storage[3] यानी वह अनुबंध जिसके लिए हम एक प्रॉक्सी हैं))) |
|    12D | SWAP2                                             | (((Storage[3] यानी वह अनुबंध जिसके लिए हम एक प्रॉक्सी हैं))) 0xFF...FF 0x80 |
|    12E | AND                                               | ProxyAddr 0x80                                                              |
|    12F | DUP2                                              | 0x80 ProxyAddr 0x80                                                         |
|    130 | MSTORE                                            | 0x80                                                                        |

और 0x80 में अब प्रॉक्सी का पता है

| ऑफ़सेट | ऑपकोड       | स्टैक     |
| -----: | ------------ | --------- |
|    131 | PUSH1 0x20   | 0x20 0x80 |
|    133 | ADD          | 0xA0      |
|    134 | PUSH2 0x00e4 | 0xE4 0xA0 |
|    137 | JUMP         | 0xA0      |

### E4 कोड {#the-e4-code}

हम पहली बार इन पंक्तियों को देख रहे हैं, लेकिन इन्हें अन्य विधियों (methods) के साथ साझा किया गया है (नीचे देखें)। इसलिए हम स्टैक में मौजूद मान को X कहेंगे, और बस यह याद रखेंगे कि `splitter()` में इस X का मान 0xA0 है।

| ऑफ़सेट | ऑपकोड     | स्टैक       |
| -----: | ---------- | ----------- |
|     E4 | JUMPDEST   | X           |
|     E5 | PUSH1 0x40 | 0x40 X      |
|     E7 | MLOAD      | 0x80 X      |
|     E8 | DUP1       | 0x80 0x80 X |
|     E9 | SWAP2      | X 0x80 0x80 |
|     EA | SUB        | X-0x80 0x80 |
|     EB | SWAP1      | 0x80 X-0x80 |
|     EC | RETURN     |

तो यह कोड स्टैक (X) में एक मेमोरी पॉइंटर प्राप्त करता है, और अनुबंध को एक बफ़र के साथ `RETURN` करने का कारण बनता है जो 0x80 - X है।

`splitter()` के मामले में, यह वह पता लौटाता है जिसके लिए हम एक प्रॉक्सी हैं। `RETURN` 0x80-0x9F में बफ़र लौटाता है, जहां हमने यह डेटा लिखा था (ऊपर ऑफ़सेट 0x130)।

## currentWindow() {#currentwindow}

ऑफ़सेट 0x158-0x163 में कोड बिल्कुल वैसा ही है जैसा हमने `splitter()` में 0x103-0x10E में देखा था (`JUMPI` गंतव्य के अलावा), इसलिए हम जानते हैं कि `currentWindow()` भी `payable` नहीं है।

| ऑफ़सेट | ऑपकोड       | स्टैक                |
| -----: | ------------ | -------------------- |
|    164 | JUMPDEST     |
|    165 | POP          |
|    166 | PUSH2 0x00da | 0xDA                 |
|    169 | PUSH1 0x01   | 0x01 0xDA            |
|    16B | SLOAD        | Storage[1] 0xDA      |
|    16C | DUP2         | 0xDA Storage[1] 0xDA |
|    16D | JUMP         | Storage[1] 0xDA      |

### DA कोड {#the-da-code}

यह कोड अन्य विधियों के साथ भी साझा किया गया है। इसलिए हम स्टैक में मौजूद मान को Y कहेंगे, और बस यह याद रखेंगे कि `currentWindow()` में इस Y का मान Storage[1] है।

| ऑफ़सेट | ऑपकोड     | स्टैक            |
| -----: | ---------- | ---------------- |
|     DA | JUMPDEST   | Y 0xDA           |
|     DB | PUSH1 0x40 | 0x40 Y 0xDA      |
|     DD | MLOAD      | 0x80 Y 0xDA      |
|     DE | SWAP1      | Y 0x80 0xDA      |
|     DF | DUP2       | 0x80 Y 0x80 0xDA |
|     E0 | MSTORE     | 0x80 0xDA        |

Y को 0x80-0x9F पर लिखें।

| ऑफ़सेट | ऑपकोड     | स्टैक          |
| -----: | ---------- | -------------- |
|     E1 | PUSH1 0x20 | 0x20 0x80 0xDA |
|     E3 | ADD        | 0xA0 0xDA      |

और बाकी को [ऊपर](#the-e4-code) पहले ही समझाया जा चुका है। इसलिए 0xDA पर जंप (jumps) स्टैक के शीर्ष (Y) को 0x80-0x9F पर लिखते हैं, और उस मान को वापस (return) करते हैं। `currentWindow()` के मामले में, यह Storage[1] वापस करता है।

## merkleRoot() {#merkleroot}

ऑफ़सेट 0xED-0xF8 का कोड बिल्कुल वैसा ही है जैसा हमने `splitter()` के 0x103-0x10E में देखा था (`JUMPI` डेस्टिनेशन के अलावा), इसलिए हम जानते हैं कि `merkleRoot()` भी `payable` नहीं है।

| ऑफ़सेट | ऑपकोड       | स्टैक                |
| -----: | ------------ | -------------------- |
|     F9 | JUMPDEST     |
|     FA | POP          |
|     FB | PUSH2 0x00da | 0xDA                 |
|     FE | PUSH1 0x00   | 0x00 0xDA            |
|    100 | SLOAD        | Storage[0] 0xDA      |
|    101 | DUP2         | 0xDA Storage[0] 0xDA |
|    102 | JUMP         | Storage[0] 0xDA      |

जंप के बाद क्या होता है, [यह हम पहले ही पता लगा चुके हैं](#the-da-code)। इसलिए `merkleRoot()` Storage[0] रिटर्न करता है।

## 0x81e580d3 {#0x81e580d3}

ऑफ़सेट 0x138-0x143 में मौजूद कोड बिल्कुल वैसा ही है जैसा हमने `splitter()` में 0x103-0x10E में देखा था (`JUMPI` गंतव्य के अलावा), इसलिए हम जानते हैं कि यह फ़ंक्शन भी `payable` नहीं है।

| ऑफ़सेट | ऑपकोड       | स्टैक                                                        |
| -----: | ------------ | ------------------------------------------------------------ |
|    144 | JUMPDEST     |
|    145 | POP          |
|    146 | PUSH2 0x00da | 0xDA                                                         |
|    149 | PUSH2 0x0153 | 0x0153 0xDA                                                  |
|    14C | CALLDATASIZE | CALLDATASIZE 0x0153 0xDA                                     |
|    14D | PUSH1 0x04   | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    14F | PUSH2 0x018f | 0x018F 0x04 CALLDATASIZE 0x0153 0xDA                         |
|    152 | JUMP         | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    18F | JUMPDEST     | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    190 | PUSH1 0x00   | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |
|    192 | PUSH1 0x20   | 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                      |
|    194 | DUP3         | 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                 |
|    195 | DUP5         | CALLDATASIZE 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA    |
|    196 | SUB          | CALLDATASIZE-4 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    197 | SLT          | CALLDATASIZE-4\<32 0x00 0x04 CALLDATASIZE 0x0153 0xDA         |
|    198 | ISZERO       | CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA        |
|    199 | PUSH2 0x01a0 | 0x01A0 CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19C | JUMPI        | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |

ऐसा लगता है कि यह फ़ंक्शन कम से कम 32 बाइट्स (एक वर्ड) कॉल डेटा लेता है।

| ऑफ़सेट | ऑपकोड | स्टैक                                        |
| -----: | ------ | -------------------------------------------- |
|    19D | DUP1   | 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA      |
|    19E | DUP2   | 0x00 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19F | REVERT |

यदि इसे कॉल डेटा नहीं मिलता है, तो लेन-देन बिना किसी रिटर्न डेटा के रिवर्ट हो जाता है।

आइए देखें कि क्या होता है यदि फ़ंक्शन को वह कॉल डेटा मिल _जाता_ है जिसकी उसे आवश्यकता है।

| ऑफ़सेट | ऑपकोड       | स्टैक                                    |
| -----: | ------------ | ---------------------------------------- |
|    1A0 | JUMPDEST     | 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    1A1 | POP          | 0x04 CALLDATASIZE 0x0153 0xDA            |
|    1A2 | CALLDATALOAD | calldataload(4) CALLDATASIZE 0x0153 0xDA |

`calldataload(4)` मेथड हस्ताक्षर के _बाद_ कॉल डेटा का पहला वर्ड है

| ऑफ़सेट | ऑपकोड       | स्टैक                                                                        |
| -----: | ------------ | ---------------------------------------------------------------------------- |
|    1A3 | SWAP2        | 0x0153 CALLDATASIZE calldataload(4) 0xDA                                     |
|    1A4 | SWAP1        | CALLDATASIZE 0x0153 calldataload(4) 0xDA                                     |
|    1A5 | POP          | 0x0153 calldataload(4) 0xDA                                                  |
|    1A6 | JUMP         | calldataload(4) 0xDA                                                         |
|    153 | JUMPDEST     | calldataload(4) 0xDA                                                         |
|    154 | PUSH2 0x016e | 0x016E calldataload(4) 0xDA                                                  |
|    157 | JUMP         | calldataload(4) 0xDA                                                         |
|    16E | JUMPDEST     | calldataload(4) 0xDA                                                         |
|    16F | PUSH1 0x04   | 0x04 calldataload(4) 0xDA                                                    |
|    171 | DUP2         | calldataload(4) 0x04 calldataload(4) 0xDA                                    |
|    172 | DUP2         | 0x04 calldataload(4) 0x04 calldataload(4) 0xDA                               |
|    173 | SLOAD        | Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA                         |
|    174 | DUP2         | calldataload(4) Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    175 | LT           | calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    176 | PUSH2 0x017e | 0x017EC calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA |
|    179 | JUMPI        | calldataload(4) 0x04 calldataload(4) 0xDA                                    |

यदि पहला वर्ड Storage[4] से कम नहीं है, तो फ़ंक्शन विफल हो जाता है। यह बिना किसी रिटर्न वैल्यू के रिवर्ट हो जाता है:

| ऑफ़सेट | ऑपकोड     | स्टैक         |
| -----: | ---------- | ------------- |
|    17A | PUSH1 0x00 | 0x00 ...      |
|    17C | DUP1       | 0x00 0x00 ... |
|    17D | REVERT     |

यदि calldataload(4), Storage[4] से कम है, तो हमें यह कोड मिलता है:

| ऑफ़सेट | ऑपकोड     | स्टैक                                               |
| -----: | ---------- | --------------------------------------------------- |
|    17E | JUMPDEST   | calldataload(4) 0x04 calldataload(4) 0xDA           |
|    17F | PUSH1 0x00 | 0x00 calldataload(4) 0x04 calldataload(4) 0xDA      |
|    181 | SWAP2      | 0x04 calldataload(4) 0x00 calldataload(4) 0xDA      |
|    182 | DUP3       | 0x00 0x04 calldataload(4) 0x00 calldataload(4) 0xDA |
|    183 | MSTORE     | calldataload(4) 0x00 calldataload(4) 0xDA           |

और मेमोरी लोकेशन 0x00-0x1F में अब डेटा 0x04 है (0x00-0x1E सभी शून्य हैं, 0x1F चार है)

| ऑफ़सेट | ऑपकोड     | स्टैक                                                                   |
| -----: | ---------- | ----------------------------------------------------------------------- |
|    184 | PUSH1 0x20 | 0x20 calldataload(4) 0x00 calldataload(4) 0xDA                          |
|    186 | SWAP1      | calldataload(4) 0x20 0x00 calldataload(4) 0xDA                          |
|    187 | SWAP2      | 0x00 0x20 calldataload(4) calldataload(4) 0xDA                          |
|    188 | SHA3       | (((SHA3 of 0x00-0x1F))) calldataload(4) calldataload(4) 0xDA            |
|    189 | ADD        | (((SHA3 of 0x00-0x1F)))+calldataload(4) calldataload(4) 0xDA            |
|    18A | SLOAD      | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] calldataload(4) 0xDA |

इसलिए स्टोरेज में एक लुकअप टेबल है, जो 0x000...0004 के SHA3 से शुरू होती है और इसमें प्रत्येक वैध कॉल डेटा वैल्यू (Storage[4] से कम वैल्यू) के लिए एक एंट्री होती है।

| ऑफ़सेट | ऑपकोड | स्टैक                                                                   |
| -----: | ------ | ----------------------------------------------------------------------- |
|    18B | SWAP1  | calldataload(4) Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA |
|    18C | POP    | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |
|    18D | DUP2   | 0xDA Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA            |
|    18E | JUMP   | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |

हम पहले से ही जानते हैं कि [ऑफ़सेट 0xDA पर मौजूद कोड](#the-da-code) क्या करता है, यह कॉलर को स्टैक टॉप वैल्यू लौटाता है। इसलिए यह फ़ंक्शन लुकअप टेबल से कॉलर को वैल्यू लौटाता है।

## 0x1f135823 {#0x1f135823}

ऑफ़सेट 0xC4-0xCF में मौजूद कोड बिल्कुल वैसा ही है जैसा हमने `splitter()` में 0x103-0x10E में देखा था (`JUMPI` डेस्टिनेशन के अलावा), इसलिए हम जानते हैं कि यह फ़ंक्शन भी `payable` नहीं है।

| ऑफ़सेट | ऑपकोड       | स्टैक             |
| -----: | ------------ | ----------------- |
|     D0 | JUMPDEST     |
|     D1 | POP          |
|     D2 | PUSH2 0x00da | 0xDA              |
|     D5 | PUSH1 0x06   | 0x06 0xDA         |
|     D7 | SLOAD        | Value\* 0xDA      |
|     D8 | DUP2         | 0xDA Value\* 0xDA |
|     D9 | JUMP         | Value\* 0xDA      |

हम पहले से ही जानते हैं कि [ऑफ़सेट 0xDA पर मौजूद कोड](#the-da-code) क्या करता है, यह कॉलर को स्टैक की टॉप वैल्यू लौटाता है। इसलिए यह फ़ंक्शन `Value*` लौटाता है।

### मेथड सारांश {#method-summary}

क्या आपको लगता है कि आप इस बिंदु पर अनुबंध को समझ गए हैं? मुझे तो नहीं लगता। अब तक हमारे पास ये मेथड हैं:

| मेथड                            | अर्थ                                                                              |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| Transfer                          | कॉल द्वारा प्रदान की गई वैल्यू को स्वीकार करें और `Value*` को उस राशि से बढ़ाएं           |
| [splitter()](#splitter)           | Storage[3], प्रॉक्सी पता लौटाएं                                                 |
| [currentWindow()](#currentwindow) | Storage[1] लौटाएं                                                                    |
| [merkleRoot()](#merkleroot)        | Storage[0] लौटाएं                                                                    |
| [0x81e580d3](#0x81e580d3)         | लुकअप टेबल से वैल्यू लौटाएं, बशर्ते पैरामीटर Storage[4] से कम हो |
| [0x1f135823](#0x1f135823)         | Storage[6] लौटाएं, जिसे Value\* भी कहा जाता है                                                    |

लेकिन हम जानते हैं कि कोई भी अन्य कार्यक्षमता Storage[3] में मौजूद अनुबंध द्वारा प्रदान की जाती है। शायद अगर हमें पता होता कि वह अनुबंध क्या है, तो हमें कोई सुराग मिल जाता। शुक्र है, यह ब्लॉकचेन है और सब कुछ ज्ञात है, कम से कम सिद्धांत रूप में। हमने Storage[3] को सेट करने वाला कोई मेथड नहीं देखा, इसलिए इसे कंस्ट्रक्टर द्वारा सेट किया गया होगा।

## कंस्ट्रक्टर {#the-constructor}

जब हम [किसी अनुबंध को देखते हैं](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f) तो हम उस लेन-देन को भी देख सकते हैं जिसने इसे बनाया था।

![Click the create transaction](create-tx.png)

यदि हम उस लेन-देन पर क्लिक करते हैं, और फिर **स्थिति** टैब पर, तो हम पैरामीटर्स के प्रारंभिक मान देख सकते हैं। विशेष रूप से, हम देख सकते हैं कि Storage[3] में [0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761](https://etherscan.io/address/0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761) शामिल है। उस अनुबंध में छूटी हुई कार्यक्षमता होनी चाहिए। हम इसे उन्हीं टूल्स का उपयोग करके समझ सकते हैं जिनका उपयोग हमने उस अनुबंध के लिए किया था जिसकी हम जांच कर रहे हैं।

## प्रॉक्सी कॉन्ट्रैक्ट {#the-proxy-contract}

ऊपर दिए गए मूल अनुबंध के लिए हमने जिन तकनीकों का उपयोग किया था, उन्हीं का उपयोग करके हम देख सकते हैं कि अनुबंध रिवर्ट हो जाता है यदि:

- कॉल के साथ कोई ETH जुड़ा हुआ है (0x05-0x0F)
- कॉल डेटा का आकार चार से कम है (0x10-0x19 और 0xBE-0xC2)

और यह जिन विधियों (methods) का समर्थन करता है वे हैं:

| विधि                                                                                                            | विधि हस्ताक्षर               | जंप करने के लिए ऑफसेट |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------- |
| [scaleAmountByPercentage(uint256,uint256)](https://www.4byte.directory/signatures/?bytes4_signature=0x8ffb5c97)          | 0x8ffb5c97                   | 0x0135              |
| [isClaimed(uint256,address)](https://www.4byte.directory/signatures/?bytes4_signature=0xd2ef0795)               | 0xd2ef0795                   | 0x0151              |
| [claim(uint256,address,uint256,bytes32[])](https://www.4byte.directory/signatures/?bytes4_signature=0x2e7ba6ef) | 0x2e7ba6ef                   | 0x00F4              |
| [incrementWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0x338b1d31)                        | 0x338b1d31                   | 0x0110              |
| ???                                                                                                             | 0x3f26479e                   | 0x0118              |
| ???                                                                                                             | 0x1e7df9d3                   | 0x00C3              |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4)                          | [0xba0bafb4](#currentwindow) | 0x0148              |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)                             | [0x2eb4a7ab](#merkleroot)    | 0x0107              |
| ???                                                                                                             | [0x81e580d3](#0x81e580d3)    | 0x0122              |
| ???                                                                                                             | [0x1f135823](#0x1f135823)    | 0x00D8              |

हम नीचे की चार विधियों को अनदेखा कर सकते हैं क्योंकि हम कभी उन तक नहीं पहुंचेंगे। उनके हस्ताक्षर ऐसे हैं कि हमारा मूल अनुबंध स्वयं ही उन्हें संभाल लेता है (आप ऊपर विवरण देखने के लिए हस्ताक्षरों पर क्लिक कर सकते हैं), इसलिए वे [ओवरराइड की गई विधियां](https://medium.com/upstate-interactive/solidity-override-vs-virtual-functions-c0a5dfb83aaf) होनी चाहिए।

शेष विधियों में से एक `claim(<params>)` है, और दूसरी `isClaimed(<params>)` है, इसलिए यह एक एयरड्रॉप अनुबंध जैसा लगता है। बाकी को ऑपकोड दर ऑपकोड देखने के बजाय, हम [डीकंपाइलर आज़मा सकते हैं](https://etherscan.io/bytecode-decompiler?a=0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761), जो इस अनुबंध के तीन फ़ंक्शंस के लिए उपयोगी परिणाम देता है। अन्य को रिवर्स इंजीनियर करना पाठक के लिए एक अभ्यास के रूप में छोड़ दिया गया है।

### scaleAmountByPercentage {#scaleamountbypercentage}

इस फ़ंक्शन के लिए डीकंपाइलर हमें यह देता है:

```python
def unknown8ffb5c97(uint256 _param1, uint256 _param2) payable:
  require calldata.size - 4 >=′ 64
  if _param1 and _param2 > -1 / _param1:
      revert with 0, 17
  return (_param1 * _param2 / 100 * 10^6)
```

पहला `require` यह परीक्षण करता है कि कॉल डेटा में, फ़ंक्शन हस्ताक्षर के चार बाइट्स के अलावा, कम से कम 64 बाइट्स हैं, जो दो मापदंडों (parameters) के लिए पर्याप्त हैं। यदि नहीं, तो स्पष्ट रूप से कुछ गलत है।

`if` कथन यह जांचता हुआ प्रतीत होता है कि `_param1` शून्य नहीं है, और `_param1 * _param2` नकारात्मक नहीं है। यह संभवतः रैप अराउंड (wrap around) के मामलों को रोकने के लिए है।

अंत में, फ़ंक्शन एक स्केल किया गया मान (scaled value) लौटाता है।

### claim {#claim}

डीकंपाइलर द्वारा बनाया गया कोड जटिल है, और इसका पूरा हिस्सा हमारे लिए प्रासंगिक नहीं है। मैं उन पंक्तियों पर ध्यान केंद्रित करने के लिए कुछ हिस्सों को छोड़ने जा रहा हूं जो मुझे लगता है कि उपयोगी जानकारी प्रदान करती हैं

```python
def unknown2e7ba6ef(uint256 _param1, uint256 _param2, uint256 _param3, array _param4) payable:
  ...
  require _param2 == addr(_param2)
  ...
  if currentWindow <= _param1:
      revert with 0, 'cannot claim for a future window'
```

हम यहां दो महत्वपूर्ण चीजें देखते हैं:

- `_param2`, हालांकि इसे `uint256` के रूप में घोषित किया गया है, वास्तव में एक पता है
- `_param1` वह विंडो है जिसका दावा किया जा रहा है, जिसे `currentWindow` या उससे पहले का होना चाहिए।

```python
  ...
  if stor5[_claimWindow][addr(_claimFor)]:
      revert with 0, 'Account already claimed the given window'
```

तो अब हम जानते हैं कि Storage[5] विंडो और पतों का एक एरे (array) है, और क्या पते ने उस विंडो के लिए पुरस्कार का दावा किया है।

```python
  ...
  idx = 0
  s = 0
  while idx < _param4.length:
  ...
      if s + sha3(mem[(32 * _param4.length) + 328 len mem[(32 * _param4.length) + 296]]) > mem[(32 * idx) + 296]:
          mem[mem[64] + 32] = mem[(32 * idx) + 296]
          ...
          s = sha3(mem[_62 + 32 len mem[_62]])
          continue
      ...
      s = sha3(mem[_66 + 32 len mem[_66]])
      continue
  if unknown2eb4a7ab != s:
      revert with 0, 'Invalid proof'
```

हम जानते हैं कि `unknown2eb4a7ab` वास्तव में `merkleRoot()` फ़ंक्शन है, इसलिए यह कोड ऐसा लगता है कि यह एक [मर्कल प्रमाण](https://medium.com/crypto-0-nite/merkle-proofs-explained-6dd429623dc5) को सत्यापित कर रहा है। इसका मतलब है कि `_param4` एक मर्कल प्रमाण है।

```python
  call addr(_param2) with:
     value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
       gas 30000 wei
```

इस तरह एक अनुबंध अपने स्वयं के ETH को किसी अन्य पते (अनुबंध या बाहरी रूप से स्वामित्व वाले) में ट्रांसफर करता है। यह इसे एक ऐसे मान के साथ कॉल करता है जो ट्रांसफर की जाने वाली राशि है। तो ऐसा लगता है कि यह ETH का एक एयरड्रॉप है।

```python
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
```

नीचे की दो पंक्तियां हमें बताती हैं कि Storage[2] भी एक अनुबंध है जिसे हम कॉल करते हैं। यदि हम [कंस्ट्रक्टर लेन-देन को देखें](https://etherscan.io/tx/0xa1ea0549fb349eb7d3aff90e1d6ce7469fdfdcd59a2fd9b8d1f5e420c0d05b58#statechange) तो हम देखते हैं कि यह अनुबंध [0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) है, जो एक रैप्ड ईथर (WETH) अनुबंध है [जिसका स्रोत कोड Etherscan पर अपलोड किया गया है](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code)।

तो ऐसा लगता है कि अनुबंध `_param2` को ETH भेजने का प्रयास करता है। यदि यह ऐसा कर सकता है, तो बहुत अच्छा। यदि नहीं, तो यह [WETH](https://weth.tkn.eth.limo/) भेजने का प्रयास करता है। यदि `_param2` एक बाहरी रूप से स्वामित्व वाला खाता (EOA) है तो यह हमेशा ETH प्राप्त कर सकता है, लेकिन अनुबंध ETH प्राप्त करने से इंकार कर सकते हैं। हालांकि, WETH एक ERC-20 है और अनुबंध इसे स्वीकार करने से इंकार नहीं कर सकते हैं।

```python
  ...
  log 0xdbd5389f: addr(_param2), unknown81e580d3[_param1] * _param3 / 100 * 10^6, bool(ext_call.success)
```

फ़ंक्शन के अंत में हम देखते हैं कि एक लॉग प्रविष्टि (log entry) उत्पन्न हो रही है। [उत्पन्न लॉग प्रविष्टियों को देखें](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#events) और उस विषय पर फ़िल्टर करें जो `0xdbd5...` से शुरू होता है। यदि हम [ऐसी प्रविष्टि उत्पन्न करने वाले लेन-देन में से किसी एक पर क्लिक करते हैं](https://etherscan.io/tx/0xe7d3b7e00f645af17dfbbd010478ef4af235896c65b6548def1fe95b3b7d2274) तो हम देखते हैं कि वास्तव में यह एक दावे जैसा दिखता है - खाते ने उस अनुबंध को एक संदेश भेजा जिसे हम रिवर्स इंजीनियर कर रहे हैं, और बदले में ETH प्राप्त किया।

![A claim transaction](claim-tx.png)

### 1e7df9d3 {#1e7df9d3}

यह फ़ंक्शन ऊपर दिए गए [`claim`](#claim) के बहुत समान है। यह भी एक मर्कल प्रमाण की जांच करता है, पहले वाले को ETH ट्रांसफर करने का प्रयास करता है, और उसी प्रकार की लॉग प्रविष्टि उत्पन्न करता है।

```python
def unknown1e7df9d3(uint256 _param1, uint256 _param2, array _param3) payable:
  ...
  idx = 0
  s = 0
  while idx < _param3.length:
      if idx >= mem[96]:
          revert with 0, 50
      _55 = mem[(32 * idx) + 128]
      if s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]]) > mem[(32 * idx) + 128]:
          ...
          s = sha3(mem[_58 + 32 len mem[_58]])
          continue
      mem[mem[64] + 32] = s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]])
  ...
  if unknown2eb4a7ab != s:
      revert with 0, 'Invalid proof'
  ...
  call addr(_param1) with:
     value s wei
       gas 30000 wei
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value s wei
               gas gas_remaining wei
  ...
  log 0xdbd5389f: addr(_param1), s, bool(ext_call.success)
```

मुख्य अंतर यह है कि पहला पैरामीटर, निकालने के लिए विंडो, वहां नहीं है। इसके बजाय, उन सभी विंडो पर एक लूप है जिनका दावा किया जा सकता है।

```python
  idx = 0
  s = 0
  while idx < currentWindow:
      ...
      if stor5[mem[0]]:
          if idx == -1:
              revert with 0, 17
          idx = idx + 1
          s = s
          continue
      ...
      stor5[idx][addr(_param1)] = 1
      if idx >= unknown81e580d3.length:
          revert with 0, 50
      mem[0] = 4
      if unknown81e580d3[idx] and _param2 > -1 / unknown81e580d3[idx]:
          revert with 0, 17
      if s > !(unknown81e580d3[idx] * _param2 / 100 * 10^6):
          revert with 0, 17
      if idx == -1:
          revert with 0, 17
      idx = idx + 1
      s = s + (unknown81e580d3[idx] * _param2 / 100 * 10^6)
      continue
```

तो यह एक `claim` संस्करण (variant) जैसा लगता है जो सभी विंडो का दावा करता है।

## निष्कर्ष {#conclusion}

अब तक आपको पता चल गया होगा कि ऑपकोड या (जब यह काम करता है) डीकंपाइलर का उपयोग करके उन अनुबंधों को कैसे समझा जाए जिनका सोर्स कोड उपलब्ध नहीं है। जैसा कि इस लेख की लंबाई से स्पष्ट है, किसी अनुबंध की रिवर्स इंजीनियरिंग करना कोई मामूली बात नहीं है, लेकिन एक ऐसे सिस्टम में जहां सुरक्षा आवश्यक है, यह सत्यापित करने में सक्षम होना एक महत्वपूर्ण कौशल है कि अनुबंध वादे के अनुसार काम करते हैं।

[मेरे और काम के लिए यहां देखें](https://cryptodocguy.pro/)।