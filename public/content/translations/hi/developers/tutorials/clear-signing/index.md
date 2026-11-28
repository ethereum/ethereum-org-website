---
title: "ERC-7730 के साथ अपने प्रोटोकॉल में स्पष्ट हस्ताक्षर करना (clear signing) जोड़ें"
description: "जानें कि ERC-7730 डिस्क्रिप्टर कैसे लिखें ताकि आपके स्मार्ट अनुबंध इंटरैक्शन उपयोगकर्ताओं के हस्ताक्षर करने से पहले वॉलेट में मानव-पठनीय विवरण प्रदर्शित करें।"
author: "हेस्टर ब्रुइकमैन"
lang: hi
tags: ["ERC-7730", "सुरक्षा", "हस्ताक्षर करना", "स्मार्ट अनुबंध", "वॉलेट"]
skill: intermediate
breadcrumb: "स्पष्ट हस्ताक्षर करना"
published: 2026-05-11
---

इथेरियम के अधिकांश बड़े कारनामों (exploits) का अंतिम चरण एक ही था: एक उपयोगकर्ता द्वारा ऐसे लेन-देन को स्वीकृति देना जिसे वे सार्थक रूप से समझ नहीं सकते थे। हार्डवेयर वॉलेट कच्चे हेक्स कॉल डेटा (raw hex calldata) दिखाते हैं, और इससे भी बदतर, आपको ब्लाइंड हस्ताक्षर करने (blind signing) के लिए मजबूर करते हैं। सॉफ़्टवेयर वॉलेट डिकोड किए गए फ़ील्ड दिखाते हैं, लेकिन केवल तभी जब वे अनुबंध को पहचानते हैं। जब वे ऐसा नहीं करते हैं, चाहे इसलिए कि प्रोटोकॉल नया है, ऐप से समझौता किया गया है (compromised), या डिवाइस ऑफ़लाइन है, तो उपयोगकर्ता ब्लाइंड हस्ताक्षर करते हैं।

[ERC-7730](https://eips.ethereum.org/EIPS/eip-7730) आपके अनुबंध के फ़ंक्शन कॉल का *क्या अर्थ है*, इसका वर्णन करने के लिए एक मानक JSON प्रारूप को परिभाषित करता है।

एक वॉलेट जो ERC-7730 का समर्थन करता है, वह आपके डिस्क्रिप्टर को पढ़ता है और दिखाता है:

> **स्वैप (Swap)**  
> भेजें: 1,000 USDC  
> न्यूनतम प्राप्त करें: 0.42 WETH  
> प्रोटोकॉल: Uniswap V2

या मनुष्यों और एजेंटों दोनों द्वारा पढ़ने योग्य एक एकल निर्मित वाक्य:

> कम से कम 0.42 WETH के लिए 1,000 USDC स्वैप करें

फ़ंक्शन चयनकर्ता (function selector) और कच्चे पूर्णांक मानों (raw integer values) की सूची के बजाय।

यह [स्पष्ट हस्ताक्षर करना (clear signing)](https://clearsigning.org/) है — "आप जो देखते हैं वही आप हस्ताक्षर करते हैं (What You See Is What You Sign)।" यह ट्यूटोरियल आपको अपने स्वयं के अनुबंध के लिए एक डिस्क्रिप्टर लिखने, आधिकारिक CLI टूल के साथ इसे मान्य करने और इसे ओपन रजिस्ट्री में सबमिट करने के बारे में बताता है।

## पूर्वापेक्षाएँ (Prerequisites) {#prerequisites}

- Solidity और स्मार्ट अनुबंध ABI से परिचित होना
- एक सत्यापित ABI के साथ एक तैनात स्मार्ट अनुबंध (रजिस्ट्री में डिस्क्रिप्टर स्वीकार किए जाने से पहले [Sourcify](https://sourcify.dev) सत्यापन आवश्यक है)
- सत्यापन CLI के लिए Python 3.12 (पिन किया गया `erc7730` पैकेज Python 3.13 या बाद के संस्करण पर इंस्टॉल नहीं होता है)। यदि आपके सिस्टम का Python एक अलग संस्करण है, तो [uv](https://docs.astral.sh/uv/) आपके लिए Python 3.12 डाउनलोड और चला सकता है
- बुनियादी JSON ज्ञान

## ERC-7730 डिस्क्रिप्टर क्या है? {#what-is-an-erc-7730-descriptor}

डिस्क्रिप्टर तीन खंडों वाली एक एकल JSON फ़ाइल है:

| खंड | उद्देश्य |
| :---- | :---- |
| `context` | चेन ID और पते के आधार पर डिस्क्रिप्टर को विशिष्ट अनुबंध तैनाती से बांधता है |
| `metadata` | प्रोजेक्ट का नाम देता है और पुन: प्रयोज्य स्थिरांक (constants) को परिभाषित करता है |
| `display` | प्रत्येक फ़ंक्शन हस्ताक्षर को मानव-पठनीय लेबल और फ़ील्ड प्रारूपों में मैप करता है |

चूँकि डिस्क्रिप्टर अनुबंध से अलग होता है, इसलिए आप बिना पुन: तैनाती के किसी भी मौजूदा प्रोटोकॉल में स्पष्ट हस्ताक्षर करने का समर्थन जोड़ सकते हैं। वॉलेट रजिस्ट्री से डिस्क्रिप्टर प्राप्त करते हैं और हस्ताक्षर करने के समय उनका उपयोग करते हैं।

## चरण 1: फ़ाइल का ढांचा (skeleton) बनाएँ {#step-1-create-the-file-skeleton}

`calldata-<ContractName>.json` नाम की एक फ़ाइल बनाएँ, उदाहरण के लिए `calldata-SwapRouter.json`। `calldata-` उपसर्ग (prefix) रजिस्ट्री को बताता है कि यह डिस्क्रिप्टर अनुबंध फ़ंक्शन कॉल को कवर करता है, न कि टाइप-डेटा संदेशों के लिए `eip712-` को। यदि आपको किसी अनुबंध के कई संस्करणों का वर्णन करने की आवश्यकता है, तो नाम में अनुबंध संस्करण शामिल करें, जैसा कि रजिस्ट्री के `calldata-UniswapV3Router02.json` में है।

```json
{
  "$schema": "https://eips.ethereum.org/assets/eip-7730/erc7730-v2.schema.json",
  "context": {},
  "metadata": {},
  "display": {
    "formats": {}
  }
}
```

## चरण 2: संदर्भ (context) खंड लिखें {#step-2-write-the-context-section}

`context` खंड डिस्क्रिप्टर को एक या अधिक अनुबंध तैनाती से बांधता है। वॉलेट इसका उपयोग आने वाले लेन-देन को सही डिस्क्रिप्टर से मिलाने के लिए करते हैं।

```json
"context": {
  "$id": "example-swap-router",
  "contract": {
    "deployments": [
      { "chainId": 1, "address": "0xYourContractAddressOnMainnet" },
      { "chainId": 137, "address": "0xYourContractAddressOnPolygon" }
    ]
  }
}
```

### संदर्भ फ़ील्ड (Context fields) {#context-fields}

- `context.$id` — इस डिस्क्रिप्टर दस्तावेज़ या तैनाती कॉन्फ़िगरेशन के लिए एक विशिष्ट पहचानकर्ता।
- `contract.deployments` — तैनाती का वह सेट जिस पर यह डिस्क्रिप्टर लागू होता है।
- `deployments[].chainId` — तैनाती के लिए EVM चेन ID। हर उस चेन को शामिल करें जहाँ आपका अनुबंध तैनात है।
- `deployments[].address` — वह अनुबंध पता जिसे वॉलेट को इस डिस्क्रिप्टर के साथ जोड़ना चाहिए। यह वह पता है जिस पर उपयोगकर्ता वास्तव में लेन-देन भेजते हैं। यदि आपका अनुबंध अपग्रेड करने योग्य है, तो वह प्रॉक्सी पता है, कार्यान्वयन (implementation) पता नहीं, जबकि `display.formats` में फ़ंक्शन हस्ताक्षर कार्यान्वयन के ABI से आते हैं।

## चरण 3: मेटाडेटा खंड लिखें {#step-3-write-the-metadata-section}

मेटाडेटा खंड इस फ़ाइल द्वारा वर्णित प्रोजेक्ट और अनुबंध के बारे में मानव-पठनीय जानकारी प्रदान करता है। वॉलेट हस्ताक्षर करने के दौरान प्रोटोकॉल नाम, लिंक और अन्य प्रासंगिक विवरण प्रदर्शित करने के लिए इस जानकारी का उपयोग कर सकते हैं।

```json
"metadata": {
  "owner": "Example Swap Protocol",
  "info": { "url": "https://example.xyz" },
  "contractName": "SwapRouter"
}
```

### मेटाडेटा फ़ील्ड {#metadata-fields}

- `owner` — इस डिस्क्रिप्टर के लिए ज़िम्मेदार प्रोजेक्ट, प्रोटोकॉल, संगठन या मेंटेनर।
- `info.url` — एक विहित (canonical) प्रोजेक्ट या दस्तावेज़ URL जिसे वॉलेट अतिरिक्त संदर्भ के लिए उपयोगकर्ताओं को प्रदर्शित कर सकते हैं।
- `contractName` — इस फ़ाइल द्वारा वर्णित अनुबंध या कार्यान्वयन का नाम, जो आमतौर पर सत्यापित स्रोत कोड या ABI से मेल खाता है।

यदि आपकी ERC-7730 फ़ाइल किसी ERC-20 अनुबंध का वर्णन करती है, तो आपको एक टोकन ऑब्जेक्ट भी जोड़ना चाहिए। 

## चरण 4: प्रदर्शन प्रारूप (display formats) खंड लिखें {#step-4-write-the-displayformats-section}

`display.formats` ऑब्जेक्ट फ़ंक्शन हस्ताक्षरों को मानव-पठनीय हस्ताक्षर निर्देशों में मैप करता है। इस तरह वॉलेट उपयोगकर्ताओं द्वारा लेन-देन को स्वीकृति देने से पहले आपके फ़ंक्शन को दिखाते हैं!

प्रत्येक कुंजी एक मानव-पठनीय ABI अंश है — फ़ंक्शन हस्ताक्षर जिसमें पैरामीटर नाम और पैरामीटर प्रकार दोनों ठीक वैसे ही शामिल होते हैं जैसे वे आपके ABI में दिखाई देते हैं।


### उदाहरण: टोकन स्वैप का वर्णन करना {#eg-describing-token-swap}

यह उदाहरण Uniswap V2 `Router02` अनुबंध से `swapExactTokensForTokens` का वर्णन करता है। इनपुट टोकन `path` का पहला तत्व है, और आउटपुट टोकन अंतिम है (मल्टी-हॉप स्वैप के लिए `path` में दो से अधिक तत्व हो सकते हैं)।

```json
"display": {
  "formats": {
    "swapExactTokensForTokens(uint256 amountIn,uint256 amountOutMin,address[] path,address to,uint256 deadline)": {
      "intent": "Swap",
      "interpolatedIntent": "Swap {amountIn} for at least {amountOutMin}",
      "fields": [
        {
          "path": "#.amountIn",
          "label": "Send",
          "format": "tokenAmount",
          "params": {
            "tokenPath": "#.path.[0]"
          }
        },
        {
          "path": "#.amountOutMin",
          "label": "Receive minimum",
          "format": "tokenAmount",
          "params": {
            "tokenPath": "#.path.[-1]"
          }
        },
        {
          "path": "#.to",
          "label": "Recipient",
          "format": "addressName",
          "params": {
            "types": ["eoa", "contract"],
            "sources": ["local", "ens"]
          }
        },
        {
          "path": "#.deadline",
          "label": "Expires",
          "format": "date",
          "params": {
            "encoding": "timestamp"
          }
        }
      ]
    }
  }
}
```

### प्रदर्शन फ़ील्ड (Display fields) {#display-fields}

- **`intent`** — **(आवश्यक)** कार्रवाई का एक संक्षिप्त, उपयोगकर्ता के अनुकूल विवरण, जैसे "स्वैप (Swap)"।
- **`interpolatedIntent`** — **(अनुशंसित)** एक समृद्ध वाक्य टेम्पलेट जो स्वरूपित फ़ील्ड मानों को एम्बेड करता है, जैसे `"Swap {amountIn} for at least {amountOutMin}"`। इसे `intent` के साथ शामिल करें ताकि एक और भी अधिक उपयोगकर्ता के अनुकूल डिस्क्रिप्टर प्रदान किया जा सके जिसे वॉलेट किसी भी प्रदर्शन बाधाओं (display constraints) के अधीन दिखाना चुन सकते हैं।
- **`fields`** — **(आवश्यक)** लेन-देन फ़ील्ड की क्रमित सूची जिसे वॉलेट को उपयोगकर्ताओं को प्रदर्शित करना चाहिए।
  - **`path`** — **(आवश्यक)** लेन-देन डेटा का संदर्भ। `#.fieldName` ABI में नाम के आधार पर डिकोड किए गए कॉल डेटा पैरामीटर को इंगित करता है। `@.value` लेन-देन के साथ भेजे गए ETH मान को संदर्भित करता है। एरे (Array) तत्वों को कोष्ठक से पहले `.` के साथ लिखा जाता है: `#.path.[0]` पहला तत्व है और `#.path.[-1]` अंतिम है। `#.path[0]` (बिंदु के बिना) लिंटर (linter) द्वारा अस्वीकार कर दिया जाता है।
  - **`label`** — **(आवश्यक)** मान के बगल में दिखाया गया मानव-पठनीय लेबल।
  - **`format`** — **(अनुशंसित)** नियंत्रित करता है कि मान को कैसे प्रस्तुत (render) किया जाना चाहिए। सामान्य स्वरूपों में शामिल हैं:
    - `tokenAmount`
    - `addressName`
    - `date`

    जब किसी अतिरिक्त स्वरूपण की आवश्यकता न हो तो `raw` का उपयोग करें। कुछ स्वरूप अतिरिक्त **`params`** कॉन्फ़िगरेशन स्वीकार करते हैं। उदाहरण के लिए:

    - `tokenAmount` यह पहचानने के लिए `tokenPath` का उपयोग कर सकता है कि कौन सा टोकन पता दशमलव (decimals) और टिकर मेटाडेटा प्रदान करता है।
    - `date` यह वर्णन करने के लिए `encoding` का उपयोग कर सकता है कि टाइमस्टैम्प को कैसे एन्कोड किया गया है।

    यदि चयनित स्वरूप को अतिरिक्त जानकारी की आवश्यकता नहीं है, तो `params` को छोड़ दें।

## संपूर्ण डिस्क्रिप्टर {#the-complete-descriptor}

प्लेसहोल्डर पतों को अपने तैनात अनुबंध के पतों से बदलें। लिंटर उन पतों पर सत्यापित ABI के विरुद्ध डिस्क्रिप्टर की जाँच करता है, इसलिए जब तक आप ऐसा नहीं करते तब तक यह त्रुटियों की रिपोर्ट करता है।

```json
{
  "$schema": "https://eips.ethereum.org/assets/eip-7730/erc7730-v2.schema.json",
  "context": {
    "$id": "example-swap-router",
    "contract": {
      "deployments": [
        {
          "chainId": 1,
          "address": "0xYourContractAddressOnMainnet"
        },
        {
          "chainId": 137,
          "address": "0xYourContractAddressOnPolygon"
        }
      ]
    }
  },
  "metadata": {
    "owner": "Example Swap Protocol",
    "info": {
      "url": "https://example.xyz"
    },
    "contractName": "SwapRouter"
  },
  "display": {
    "formats": {
      "swapExactTokensForTokens(uint256 amountIn,uint256 amountOutMin,address[] path,address to,uint256 deadline)": {
        "intent": "Swap",
        "interpolatedIntent": "Swap {amountIn} for at least {amountOutMin}",
        "fields": [
          {
            "path": "#.amountIn",
            "label": "Send",
            "format": "tokenAmount",
            "params": {
              "tokenPath": "#.path.[0]"
            }
          },
          {
            "path": "#.amountOutMin",
            "label": "Receive minimum",
            "format": "tokenAmount",
            "params": {
              "tokenPath": "#.path.[-1]"
            }
          },
          {
            "path": "#.to",
            "label": "Recipient",
            "format": "addressName",
            "params": {
              "types": ["eoa", "contract"],
              "sources": ["local", "ens"]
            }
          },
          {
            "path": "#.deadline",
            "label": "Expires",
            "format": "date",
            "params": {
              "encoding": "timestamp"
            }
          }
        ]
      }
    }
  }
}
```

## चरण 5: रजिस्ट्री में सबमिट करें {#step-5-submit-to-the-registry}

[ERC-7730 रजिस्ट्री](https://github.com/ethereum/clear-signing-erc7730-registry) एक तटस्थ प्रबंधक (neutral steward) के रूप में [एथेरियम फाउंडेशन](/foundation/) द्वारा होस्ट की गई एक ओपन रिपॉजिटरी है। कोई भी इसे क्लोन करने और स्वयं-होस्ट करने के लिए स्वतंत्र है — वॉलेट स्वतंत्र रूप से तय करते हैं कि वे किन रजिस्ट्री इंस्टेंस पर भरोसा करते हैं।

1. GitHub पर रिपॉजिटरी को फ़ोर्क करें
2. `registry/<your-project-name>/` पर एक फ़ोल्डर बनाएँ
3. अपनी फ़ाइल को इसके अंदर रखें: `registry/myproject/calldata-SwapRouter.json`
4. `$schema` फ़ील्ड को रेपो के भीतर उपयोग किए जाने वाले सापेक्ष पथ (relative path) में अपडेट करें: `"../../specs/erc7730-v2.schema.json"`। CI यहाँ एक URL को अस्वीकार करता है।
5. एक परीक्षण फ़ाइल जोड़ें (नीचे देखें)
6. अपनी फ़ाइलों को स्थानीय रूप से मान्य करें (नीचे देखें)
7. एक पुल रिक्वेस्ट (pull request) खोलें। प्रत्येक पुल रिक्वेस्ट `registry/` के अंतर्गत केवल एक फ़ोल्डर को बदल सकती है

### एक परीक्षण फ़ाइल जोड़ें {#add-a-test-file}

आपके द्वारा जोड़े या बदले गए प्रत्येक डिस्क्रिप्टर को एक परीक्षण फ़ाइल की आवश्यकता होती है, ताकि स्पष्ट हस्ताक्षर करने के कार्यान्वयन (clear signing implementations) को इसके विरुद्ध जाँचा जा सके। `display.formats` में प्रत्येक फ़ंक्शन के लिए कम से कम एक परीक्षण मामले (test case) के साथ `registry/<your-project-name>/testsv2/calldata-<ContractName>.tests.json` बनाएँ। CI प्रत्येक प्रारूप के फ़ंक्शन चयनकर्ता (function selector) को प्राप्त करता है और यदि कोई परीक्षण लेन-देन इसे कॉल नहीं करता है तो विफल हो जाता है।

```json
{
  "$schema": "../../../specs/erc7730-tests-v2.schema.json",
  "descriptor": "../calldata-SwapRouter.json",
  "dataProvider": {
    "tokens": {
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": { "symbol": "USDC", "decimals": 6, "name": "USD Coin" },
      "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": { "symbol": "WETH", "decimals": 18, "name": "Wrapped Ether" }
    }
  },
  "tests": [
    {
      "description": "Swap 1,000 USDC for at least 0.42 WETH",
      "rawTx": "0x02f9012f0180843b9aca00...",
      "expected": {
        "intent": "Swap",
        "interpolatedIntent": "Swap 1000 USDC for at least 0.42 WETH",
        "owner": "Example Swap Protocol",
        "fields": [
          { "label": "Send", "value": "1000 USDC" },
          { "label": "Receive minimum", "value": "0.42 WETH" },
          { "label": "Recipient", "value": "0x1234567890123456789012345678901234567890" },
          { "label": "Expires", "value": "2026-01-01 00:00:00Z" }
        ]
      }
    }
  ]
}
```

- `rawTx` पूर्ण क्रमबद्ध (serialized) **बिना हस्ताक्षर वाला (unsigned)** लेन-देन है (यहाँ छोटा किया गया है), न कि केवल कॉल डेटा। आपके अनुबंध के वास्तविक लेन-देन सबसे अच्छे परीक्षण मामले हैं।
- `dataProvider` टोकन मेटाडेटा (और वैकल्पिक रूप से पता और ENS नाम) की आपूर्ति करता है ताकि परीक्षणों को नेटवर्क एक्सेस की आवश्यकता न हो।
- `expected` वह है जो एक वॉलेट को प्रदर्शित करना चाहिए। CI स्पष्ट हस्ताक्षर करने के कार्यान्वयन के साथ प्रत्येक परीक्षण मामले को प्रस्तुत करता है और पुल रिक्वेस्ट पर किसी भी अंतर की रिपोर्ट करता है।

EIP-712 डिस्क्रिप्टर के लिए परीक्षण फ़ाइलों सहित पूर्ण प्रारूप के लिए रजिस्ट्री README में [संदर्भ परीक्षण मामले (Reference test cases)](https://github.com/ethereum/clear-signing-erc7730-registry#reference-test-cases) देखें।

### स्थानीय रूप से मान्य करें {#validate-locally}

रजिस्ट्री [`erc7730`](https://github.com/sourcifyeth/python-erc7730) कमांड-लाइन टूल के साथ डिस्क्रिप्टर की जाँच करती है, जिसे `.github/requirements.txt` में पिन किया गया है। इसे अपने फ़ोर्क के रूट से, Python 3.12 वातावरण में चलाएँ:

```sh
python3.12 -m venv .venv
source .venv/bin/activate
pip install -r .github/requirements.txt
erc7730 lint registry/myproject/calldata-SwapRouter.json
```

यदि आप [uv](https://docs.astral.sh/uv/) का उपयोग करते हैं, तो आप वर्चुअल वातावरण को छोड़ सकते हैं, और यदि आवश्यक हो तो uv Python 3.12 डाउनलोड करता है:

```sh
uvx --python 3.12 --from "$(cat .github/requirements.txt)" erc7730 lint registry/myproject/calldata-SwapRouter.json
```

लिंटर स्कीमा के विरुद्ध और आपके अनुबंध के सत्यापित ABI के विरुद्ध डिस्क्रिप्टर की जाँच करता है। हर त्रुटि को ठीक करें। `Missing display format` जैसी चेतावनियों का मतलब है कि अनुबंध में ऐसे फ़ंक्शन हैं जिनका आपका डिस्क्रिप्टर अभी तक वर्णन नहीं करता है। `$schema` पथों और परीक्षण फ़ाइल को उसी तरह जाँचने के लिए जैसे CI करता है, रजिस्ट्री README में [मान्य कैसे करें (How to validate)](https://github.com/ethereum/clear-signing-erc7730-registry#how-to-validate) देखें।

जब आप PR खोलते हैं, तो CI स्वचालित रूप से स्कीमा सत्यापन चलाता है, जाँचता है कि फ़ंक्शन हस्ताक्षर मान्य चयनकर्ता (selectors) उत्पन्न करते हैं, पुष्टि करता है कि अनुबंध पता Sourcify पर सत्यापित है, और ABI विसंगतियों को फ़्लैग करता है। जाँच परिणाम PR पर इनलाइन दिखाई देते हैं। रजिस्ट्री मेंटेनर विकृत (malformed) या संभावित रूप से दुर्भावनापूर्ण डिस्क्रिप्टर के लिए सबमिशन की जाँच करते हैं। रजिस्ट्री में शामिल होने का मतलब ऑडिट या समर्थन नहीं है।

<Alert variant="info">
<AlertContent>
<AlertDescription>
**नोट:** आपका PR स्वीकार किए जाने से पहले आपका अनुबंध <a href="https://repo.sourcify.dev">Sourcify</a> पर सत्यापित होना चाहिए। यदि यह अभी तक सत्यापित नहीं है, तो पहले <a href="https://verify.sourcify.dev/">सत्यापन सबमिट करें</a>।
</AlertDescription>
</AlertContent>
</Alert>

## मर्ज करने के बाद क्या होता है? {#what-happens-after-merging}

रजिस्ट्री में सभी डिस्क्रिप्टर ऑडिटर्स के लिए खुले हैं। आपके PR के मर्ज होने के बाद, कोई भी ऑडिटर आपके डिस्क्रिप्टर की समीक्षा कर सकता है और इसकी सटीकता की पुष्टि करते हुए एक क्रिप्टोग्राफ़िक अनुप्रमाणन ([ERC-8176](https://eips.ethereum.org/EIPS/eip-8176) के तहत) प्रकाशित कर सकता है। 

ये अनुप्रमाणन संकेत वॉलेट को अपनी स्वयं की विश्वास नीतियां लागू करने देते हैं — कई स्वतंत्र अनुप्रमाणन वाले डिस्क्रिप्टर का महत्व बिना अनुप्रमाणन वाले डिस्क्रिप्टर से अधिक होता है। आप [clearsigning.org](https://clearsigning.org) के माध्यम से ऑडिटर समुदाय तक पहुँच सकते हैं।

वॉलेट चुनते हैं कि वे किस रजिस्ट्री का समर्थन करेंगे। एक बार जब आपका डिस्क्रिप्टर रजिस्ट्री में आ जाता है, तो ERC-7730 का समर्थन करने वाले वॉलेट इसे प्राप्त करना शुरू कर देंगे यदि यह उनकी रजिस्ट्री में है और जब उपयोगकर्ता आपके अनुबंध के साथ इंटरैक्ट करेंगे तो मानव-पठनीय डेटा प्रदर्शित करेंगे।

## आगे की पढ़ाई {#further-reading}

- [ERC-7730 विनिर्देश (specification)](https://eips.ethereum.org/EIPS/eip-7730)  
- [ERC-7730 रजिस्ट्री](https://github.com/ethereum/clear-signing-erc7730-registry)  
- [clearsigning.org](https://clearsigning.org) — टूलिंग, इकोसिस्टम की स्थिति और शासन  
- [Sourcify अनुबंध सत्यापन](https://sourcify.dev)  
- [ट्रिलियन डॉलर सुरक्षा पहल](https://trilliondollarsecurity.org)

