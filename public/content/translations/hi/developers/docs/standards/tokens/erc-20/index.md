---
title: ERC-20 टोकन मानक
description: ERC-20 के बारे में जानें, जो एथेरियम पर फंजेबल टोकन के लिए मानक है जो इंटरऑपरेबल टोकन एप्लिकेशन को सक्षम बनाता है।
lang: hi
---

## परिचय {#introduction}

**टोकन क्या है?**

टोकन एथेरियम में वस्तुतः किसी भी चीज़ का प्रतिनिधित्व कर सकते हैं:

- एक ऑनलाइन मंच में प्रतिष्ठा अंक
- एक खेल में एक चरित्र के कौशल
- एक कंपनी में शेयर की तरह वित्तीय संपत्ति
- uSD जैसी फिएट मुद्रा
- सोने का एक औंस
- और अधिक...

एथेरियम की इतनी शक्तिशाली विशेषता को एक मजबूत मानक द्वारा नियंत्रित किया जाना चाहिए, है ना? बिल्कुल यही है
जहां ईआरसी -20 अपनी भूमिका निभाता है! यह मानक डेवलपर्स को टोकन एप्लिकेशन बनाने की अनुमति देता है जो अन्य उत्पादों और सेवाओं के साथ इंटरऑपरेबल हैं। ERC-20 मानक का उपयोग [ईथर](/glossary/#ether) को अतिरिक्त कार्यक्षमता प्रदान करने के लिए भी किया जाता है।

**ERC-20 क्या है?**

ERC-20 फंजिबल टोकन के लिए एक मानक पेश करता है, दूसरे शब्दों में, उनके पास एक संपत्ति है जो प्रत्येक टोकन को बिल्कुल बनाती है
एक और टोकन के समान (प्रकार और मूल्य में)। उदाहरण के लिए, एक ERC-20 टोकन ETH की तरह ही कार्य करता है, जिसका अर्थ है कि 1 टोकन
है और हमेशा अन्य सभी टोकन के बराबर होगा।

## पूर्वापेक्षाएं {#prerequisites}

- [Accounts](/developers/docs/accounts)
- [स्मार्ट कॉन्ट्रैक्ट्स] (/डेवलपर्स/डॉक्स/स्मार्ट-कॉन्ट्रैक्ट्स/)
- [टोकन मानक] (/developers/docs/standards/tokens/)

## Body {#body}

ERC-20 (टिप्पणियों के लिए Ethereum अनुरोध 20), नवंबर में फैबियन Vogelsteller द्वारा प्रस्तावित 2015, एक टोकन मानक है कि
स्मार्ट कॉन्ट्रैक्ट्स के भीतर टोकन के लिए एक एपीआई लागू करता है।

उदाहरण कार्यात्मकताएं ERC-20 प्रदान करती हैं:

- टोकन को एक खाते से दूसरे खाते में स्थानांतरित करें
- खाते का वर्तमान टोकन बैलेंस प्राप्त करें
- नेटवर्क पर उपलब्ध टोकन की कुल आपूर्ति प्राप्त करें
- अनुमोदित करें कि क्या किसी खाते से टोकन की राशि किसी तृतीय-पक्ष खाते द्वारा खर्च की जा सकती है

यदि कोई स्मार्ट कॉन्ट्रैक्ट निम्नलिखित विधियों और घटनाओं को लागू करता है तो इसे ERC-20 टोकन कॉन्ट्रैक्ट कहा जा सकता है और एक बार तैनात होने के बाद, इसे
एथेरियम पर बनाए गए टोकन का ट्रैक रखने के लिए जिम्मेदार होगा।

From [EIP-20](https://eips.ethereum.org/EIPS/eip-20):

### तरीके {#methods}

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
function approve(address _spender, uint256 _value) public returns (bool success)
function allowance(address _owner, address _spender) public view returns (uint256 remaining)
```

### घटनाएँ {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### उदाहरण {#web3py-example}

आइए देखें कि एथेरियम पर किसी भी ERC-20 टोकन अनुबंध का निरीक्षण करने के लिए हमारे लिए चीजों को सरल बनाने के लिए एक मानक कितना महत्वपूर्ण है।
हमें किसी भी ERC-20 टोकन के लिए एक इंटरफ़ेस बनाने के लिए कॉन्ट्रैक्ट एप्लिकेशन बाइनरी इंटरफ़ेस (ABI) की आवश्यकता है। जैसा आप कर सकते हैं
नीचे देखें कि हम इसे कम घर्षण उदाहरण बनाने के लिए एक सरलीकृत एबीआई का उपयोग करेंगे।

#### Web3.py उदाहरण {#web3py-example}

सबसे पहले, सुनिश्चित करें कि आपने [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python लाइब्रेरी इंस्टॉल कर ली है:

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # रैप्ड ईथर (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# यह एक ERC-20 टोकन अनुबंध का एक सरलीकृत अनुबंध एप्लिकेशन बाइनरी इंटरफ़ेस (ABI) है।
# यह केवल इन तरीकों को उजागर करेगा: balanceOf(address), decimals(), symbol() और totalSupply()
simplified_abi = [
    {
        'inputs': [{'internalType': 'address', 'name': 'account', 'type': 'address'}],
        'name': 'balanceOf',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'decimals',
        'outputs': [{'internalType': 'uint8', 'name': '', 'type': 'uint8'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'symbol',
        'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'totalSupply',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    }
]

dai_contract = w3.eth.contract(address=w3.to_checksum_address(dai_token_addr), abi=simplified_abi)
symbol = dai_contract.functions.symbol().call()
decimals = dai_contract.functions.decimals().call()
totalSupply = dai_contract.functions.totalSupply().call() / 10**decimals
addr_balance = dai_contract.functions.balanceOf(acc_address).call() / 10**decimals

#  DAI
print("===== %s =====" % symbol)
print("Total Supply:", totalSupply)
print("Addr Balance:", addr_balance)

weth_contract = w3.eth.contract(address=w3.to_checksum_address(weth_token_addr), abi=simplified_abi)
symbol = weth_contract.functions.symbol().call()
decimals = weth_contract.functions.decimals().call()
totalSupply = weth_contract.functions.totalSupply().call() / 10**decimals
addr_balance = weth_contract.functions.balanceOf(acc_address).call() / 10**decimals

#  WETH
print("===== %s =====" % symbol)
print("Total Supply:", totalSupply)
print("Addr Balance:", addr_balance)
```

## ज्ञात समस्याएँ {#erc20-issues}

### ERC-20 टोकन प्राप्ति समस्या {#reception-issue}

**20/06/2024 तक, इस समस्या के कारण कम से कम $83,656,418 मूल्य के ERC-20 टोकन खो गए थे। ध्यान दें कि एक शुद्ध ERC-20 कार्यान्वयन इस समस्या से ग्रस्त है जब तक कि आप नीचे सूचीबद्ध मानक के शीर्ष पर अतिरिक्त प्रतिबंधों का एक सेट लागू नहीं करते हैं।**

जब ERC-20 टोकन एक स्मार्ट अनुबंध को भेजे जाते हैं जिसे ERC-20 टोकन को संभालने के लिए डिज़ाइन नहीं किया गया है, तो वे टोकन स्थायी रूप से खो सकते हैं। ऐसा इसलिए होता है क्योंकि प्राप्त अनुबंध में आने वाले टोकन को पहचानने या प्रतिक्रिया देने की कार्यक्षमता नहीं होती है, और आने वाले टोकन के बारे में प्राप्त अनुबंध को सूचित करने के लिए ERC-20 मानक में कोई तंत्र नहीं है। इस मुद्दे के रूप में मुख्य तरीके हैं:

1. टोकन हस्तांतरण तंत्र

- ERC-20 टोकन स्थानांतरण या स्थानांतरण का उपयोग करके स्थानांतरित किए जाते हैंFrom फ़ंक्शन
  - जब कोई उपयोगकर्ता इन कार्यों का उपयोग करके अनुबंध पते पर टोकन भेजता है, तो टोकन को स्थानांतरित कर दिया जाता है, भले ही प्राप्त अनुबंध उन्हें संभालने के लिए डिज़ाइन किया गया हो

2. सूचना का अभाव
   - प्राप्त अनुबंध को एक सूचना या कॉलबैक प्राप्त नहीं होता है कि टोकन उसे भेजे गए हैं
   - यदि प्राप्त अनुबंध में टोकन को संभालने के लिए एक तंत्र का अभाव है (उदाहरण के लिए, एक फ़ॉलबैक फ़ंक्शन या टोकन रिसेप्शन का प्रबंधन करने के लिए एक समर्पित फ़ंक्शन), तो टोकन प्रभावी रूप से अनुबंध के पते में फंस गए हैं
3. कोई अंतर्निहित हैंडलिंग नहीं
   - ERC-20 मानक में लागू करने के लिए अनुबंध प्राप्त करने के लिए एक अनिवार्य कार्य शामिल नहीं है, जिससे ऐसी स्थिति पैदा होती है जहां कई अनुबंध आने वाले टोकन को ठीक से प्रबंधित करने में असमर्थ होते हैं

**संभावित समाधान**

हालांकि ERC-20 के साथ इस समस्या को पूरी तरह से रोकना संभव नहीं है, लेकिन ऐसे तरीके हैं जो अंतिम यूज़र के लिए टोकन के नुकसान की संभावना को काफी कम कर सकते हैं:

- सबसे आम समस्या तब होती है जब कोई यूज़र टोकन को टोकन अनुबंध पते पर ही भेजता है (उदाहरण के लिए, USDT टोकन अनुबंध के पते पर जमा किया गया USDT)। इस तरह के स्थानांतरण प्रयासों को वापस करने के लिए `transfer(..)` फ़ंक्शन को प्रतिबंधित करने की अनुशंसा की जाती है। `transfer(..)` फ़ंक्शन के कार्यान्वयन के भीतर `require(_to != address(this));` जांच जोड़ने पर विचार करें।
- `transfer(..)` फ़ंक्शन सामान्य रूप से अनुबंधों में टोकन जमा करने के लिए डिज़ाइन नहीं किया गया है। `approve(..)` और transferFrom(..)`पैटर्न का उपयोग इसके बजाय अनुबंधों में ERC-20 टोकन जमा करने के लिए किया जाता है। स्थानांतरण फ़ंक्शन को प्रतिबंधित करना संभव है ताकि इसके साथ किसी भी अनुबंध में टोकन जमा करने की अनुमति न हो, हालांकि यह उन अनुबंधों के साथ संगतता को तोड़ सकता है जो मानते हैं कि टोकन`trasnfer(..)\` फ़ंक्शन (जैसे, Uniswap लिक्विडिटी पूल) के साथ अनुबंधों में जमा किए जा सकते हैं।
- हमेशा यह मानकर चलें कि ERC-20 टोकन आपके अनुबंध में आ सकते हैं, भले ही आपके अनुबंध को कभी भी कोई टोकन प्राप्त करने की उम्मीद न हो। प्राप्तकर्ताओं के अंत में आकस्मिक जमा को रोकने या अस्वीकार करने का कोई तरीका नहीं है। एक फ़ंक्शन को लागू करने की अनुशंसा की जाती है जो गलती से जमा किए गए ERC-20 टोकन को निकालने की अनुमति देगा।
- वैकल्पिक टोकन मानकों का उपयोग करने पर विचार करें।

इस मुद्दे से कुछ वैकल्पिक मानक सामने आए हैं जैसे [ERC-223](/developers/docs/standards/tokens/erc-223) या [ERC-1363](/developers/docs/standards/tokens/erc-1363)।

## आगे की रीडिंग {#further-reading}

- [EIP-20: ERC-20 टोकन मानक] (https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - टोकन](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - ERC-20 कार्यान्वयन](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - सॉलिडिटी ERC20 टोकन के लिए गाइड](https://www.alchemy.com/overviews/erc20-solidity)

## अन्य फंजेबल टोकन मानक {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - टोकनाइज्ड वॉल्ट](/developers/docs/standards/tokens/erc-4626)
