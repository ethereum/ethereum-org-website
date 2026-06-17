---
title: "⁨ERC-20⁩ टोकन मानक"
description: "⁨ERC-20⁩ के बारे में जानें, जो इथेरियम पर विनिमेय टोकन के लिए मानक है और अंतरप्रचालनीय टोकन एप्लिकेशन को सक्षम बनाता है।"
lang: hi
---

## परिचय {#introduction}

**टोकन क्या है?**

टोकन [इथेरियम](/) में लगभग किसी भी चीज़ का प्रतिनिधित्व कर सकते हैं:

- एक ऑनलाइन प्लेटफ़ॉर्म में प्रतिष्ठा (reputation) अंक
- किसी गेम में कैरेक्टर का कौशल
- किसी कंपनी में शेयर जैसी वित्तीय संपत्तियां
- USD जैसी फिएट मुद्रा
- एक औंस सोना
- और भी बहुत कुछ...

इथेरियम की इतनी शक्तिशाली विशेषता को एक मजबूत मानक द्वारा नियंत्रित किया जाना चाहिए, है ना? यहीं पर ERC-20 अपनी भूमिका निभाता है! यह मानक डेवलपर्स को ऐसे टोकन एप्लिकेशन बनाने की अनुमति देता है जो अन्य उत्पादों और सेवाओं के साथ अंतरप्रचालनीय (interoperable) हों। ERC-20 मानक का उपयोग [ईथर](/glossary/#ether) को अतिरिक्त कार्यक्षमता प्रदान करने के लिए भी किया जाता है।

**ERC-20 क्या है?**

ERC-20 विनिमेय टोकन (Fungible Tokens) के लिए एक मानक पेश करता है, दूसरे शब्दों में, उनमें एक ऐसा गुण होता है जो प्रत्येक टोकन को (प्रकार और मूल्य में) दूसरे टोकन के बिल्कुल समान बनाता है। उदाहरण के लिए, एक ERC-20 टोकन बिल्कुल ETH की तरह काम करता है, जिसका अर्थ है कि 1 टोकन हमेशा अन्य सभी टोकन के बराबर होता है और रहेगा।

## पूर्वापेक्षाएँ {#prerequisites}

- [खाते](/developers/docs/accounts)
- [स्मार्ट अनुबंध](/developers/docs/smart-contracts/)
- [टोकन मानक](/developers/docs/standards/tokens/)

## मुख्य भाग {#body}

नवंबर 2015 में फैबियन वोगेलस्टेलर (Fabian Vogelsteller) द्वारा प्रस्तावित ERC-20 (Ethereum Request for Comments 20), एक टोकन मानक है जो स्मार्ट अनुबंधों के भीतर टोकन के लिए एक API लागू करता है।

ERC-20 द्वारा प्रदान की जाने वाली कार्यक्षमताओं के उदाहरण:

- एक खाते से दूसरे खाते में टोकन ट्रांसफर करना
- किसी खाते का वर्तमान टोकन बैलेंस प्राप्त करना
- नेटवर्क पर उपलब्ध टोकन की कुल आपूर्ति प्राप्त करना
- यह स्वीकृति देना कि क्या किसी खाते से टोकन की एक निश्चित राशि किसी तीसरे पक्ष के खाते द्वारा खर्च की जा सकती है

यदि कोई स्मार्ट अनुबंध निम्नलिखित विधियों (methods) और घटनाओं (events) को लागू करता है, तो इसे ERC-20 टोकन अनुबंध कहा जा सकता है और, एक बार डिप्लॉय होने के बाद, यह इथेरियम पर बनाए गए टोकन का ट्रैक रखने के लिए जिम्मेदार होगा।

[EIP-20](https://eips.ethereum.org/EIPS/eip-20) से:

### विधियाँ (Methods) {#methods}

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

आइए देखें कि इथेरियम पर किसी भी ERC-20 टोकन अनुबंध का निरीक्षण करने के लिए चीजों को सरल बनाने के लिए एक मानक कितना महत्वपूर्ण है। हमें किसी भी ERC-20 टोकन के लिए एक इंटरफ़ेस बनाने के लिए केवल अनुबंध एप्लिकेशन बाइनरी इंटरफ़ेस (ABI) की आवश्यकता होती है। जैसा कि आप नीचे देख सकते हैं, हम इसे समझने में आसान उदाहरण बनाने के लिए एक सरलीकृत ABI का उपयोग करेंगे।

#### Web3.py उदाहरण {#web3py-example-2}

सबसे पहले, सुनिश्चित करें कि आपने [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python लाइब्रेरी इंस्टॉल कर ली है:

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # रैप्ड ईथर (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # यूनिस्वैप V2: DAI 2

# यह एक ERC-20 टोकन अनुबंध का सरलीकृत अनुबंध एप्लिकेशन बाइनरी इंटरफ़ेस (ABI) है।
# यह केवल इन विधियों को प्रदर्शित करेगा: balanceOf(address), decimals(), symbol() और totalSupply()
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

### ERC-20 टोकन प्राप्ति की समस्या {#reception-issue}

**06/20/2024 तक इस समस्या के कारण कम से कम $83,656,418 मूल्य के ERC-20 टोकन खो गए थे। ध्यान दें कि एक शुद्ध ERC-20 कार्यान्वयन इस समस्या से ग्रस्त है जब तक कि आप नीचे सूचीबद्ध मानक के ऊपर अतिरिक्त प्रतिबंधों का एक सेट लागू नहीं करते हैं।**

जब ERC-20 टोकन किसी ऐसे स्मार्ट अनुबंध में भेजे जाते हैं जो ERC-20 टोकन को संभालने के लिए डिज़ाइन नहीं किया गया है, तो वे टोकन स्थायी रूप से खो सकते हैं। ऐसा इसलिए होता है क्योंकि प्राप्त करने वाले अनुबंध में आने वाले टोकन को पहचानने या प्रतिक्रिया देने की कार्यक्षमता नहीं होती है, और ERC-20 मानक में प्राप्त करने वाले अनुबंध को आने वाले टोकन के बारे में सूचित करने के लिए कोई तंत्र नहीं है। यह समस्या मुख्य रूप से निम्नलिखित तरीकों से सामने आती है:

1.	टोकन ट्रांसफर तंत्र
  - ERC-20 टोकन को transfer या transferFrom फ़ंक्शन का उपयोग करके ट्रांसफर किया जाता है
	-	जब कोई उपयोगकर्ता इन फ़ंक्शन का उपयोग करके किसी अनुबंध पते पर टोकन भेजता है, तो टोकन ट्रांसफर हो जाते हैं, भले ही प्राप्त करने वाला अनुबंध उन्हें संभालने के लिए डिज़ाइन किया गया हो या नहीं
2.	अधिसूचना का अभाव
	-	प्राप्त करने वाले अनुबंध को कोई अधिसूचना या कॉलबैक प्राप्त नहीं होता है कि उसे टोकन भेजे गए हैं
	-	यदि प्राप्त करने वाले अनुबंध में टोकन को संभालने के लिए किसी तंत्र का अभाव है (उदा., एक फॉलबैक फ़ंक्शन या टोकन प्राप्ति को प्रबंधित करने के लिए एक समर्पित फ़ंक्शन), तो टोकन प्रभावी रूप से अनुबंध के पते में फंस जाते हैं
3.	कोई अंतर्निहित हैंडलिंग नहीं
	-	ERC-20 मानक में प्राप्त करने वाले अनुबंधों को लागू करने के लिए कोई अनिवार्य फ़ंक्शन शामिल नहीं है, जिससे ऐसी स्थिति पैदा होती है जहां कई अनुबंध आने वाले टोकन को ठीक से प्रबंधित करने में असमर्थ होते हैं

**संभावित समाधान**

हालांकि ERC-20 के साथ इस समस्या को पूरी तरह से रोकना संभव नहीं है, लेकिन ऐसे तरीके हैं जो अंतिम उपयोगकर्ता के लिए टोकन के नुकसान की संभावना को काफी कम करने की अनुमति देंगे:

- सबसे आम समस्या तब होती है जब कोई उपयोगकर्ता टोकन अनुबंध पते पर ही टोकन भेजता है (उदा., USDT टोकन अनुबंध के पते पर जमा किया गया USDT)। ऐसे ट्रांसफर प्रयासों को रिवर्ट करने के लिए `transfer(..)` फ़ंक्शन को प्रतिबंधित करने की अनुशंसा की जाती है। `transfer(..)` फ़ंक्शन के कार्यान्वयन के भीतर `require(_to != address(this));` जांच जोड़ने पर विचार करें।
- `transfer(..)` फ़ंक्शन सामान्य रूप से अनुबंधों में टोकन जमा करने के लिए डिज़ाइन नहीं किया गया है। इसके बजाय ERC-20 टोकन को अनुबंधों में जमा करने के लिए `approve(..) & transferFrom(..)` पैटर्न का उपयोग किया जाता है। ट्रांसफर फ़ंक्शन को प्रतिबंधित करना संभव है ताकि इसके साथ किसी भी अनुबंध में टोकन जमा करने की अनुमति न हो, हालांकि यह उन अनुबंधों के साथ संगतता को तोड़ सकता है जो यह मानते हैं कि `transfer(..)` फ़ंक्शन के साथ अनुबंधों में टोकन जमा किए जा सकते हैं (उदा., यूनिस्वैप तरलता पूल)।
- हमेशा यह मान लें कि ERC-20 टोकन आपके अनुबंध में आ सकते हैं, भले ही आपके अनुबंध को कभी भी कोई टोकन प्राप्त नहीं होना चाहिए। प्राप्तकर्ता के छोर पर आकस्मिक जमा को रोकने या अस्वीकार करने का कोई तरीका नहीं है। एक ऐसा फ़ंक्शन लागू करने की अनुशंसा की जाती है जो गलती से जमा किए गए ERC-20 टोकन को निकालने की अनुमति देगा।
- वैकल्पिक टोकन मानकों का उपयोग करने पर विचार करें।

इस समस्या से कुछ वैकल्पिक मानक सामने आए हैं जैसे [ERC-223](/developers/docs/standards/tokens/erc-223) या [ERC-1363](/developers/docs/standards/tokens/erc-1363)।

## आगे की पढ़ाई {#further-reading}

- [EIP-20: ERC-20 टोकन मानक](https://eips.ethereum.org/EIPS/eip-20)
- [ओपनजेपेलिन - टोकन](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [ओपनजेपेलिन - ERC-20 कार्यान्वयन](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Solidity ERC20 टोकन के लिए गाइड](https://www.alchemy.com/overviews/erc20-solidity)

## अन्य विनिमेय टोकन मानक {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - टोकनाइज़्ड वॉल्ट](/developers/docs/standards/tokens/erc-4626)

## ट्यूटोरियल: इथेरियम पर ERC-20 के साथ निर्माण करें {#tutorials}

- [ERC-20 अनुबंध वॉक-थ्रू](/developers/tutorials/erc20-annotated-code/) _– ओपनजेपेलिन ERC-20 अनुबंध कार्यान्वयन का एक पंक्ति-दर-पंक्ति एनोटेट किया गया वॉकथ्रू।_
- [सुरक्षा रेल के साथ ERC-20](/developers/tutorials/erc20-with-safety-rails/) _– उपयोगकर्ताओं को सामान्य गलतियों से बचने में मदद करने के लिए ERC-20 टोकन में सुरक्षा उपाय कैसे जोड़ें।_
- [Ethers.js का उपयोग करके टोकन भेजना](/developers/tutorials/send-token-ethersjs/) _– Ethers.js का उपयोग करके ERC-20 टोकन ट्रांसफर करने के लिए शुरुआती-अनुकूल गाइड।_
- [घोटाले वाले टोकन द्वारा उपयोग की जाने वाली कुछ तरकीबें और उनका पता कैसे लगाएं](/developers/tutorials/scam-token-tricks/) _– घोटाले वाले ERC-20 टोकन पैटर्न और उन्हें पहचानने के तरीके पर एक विस्तृत नज़र।_