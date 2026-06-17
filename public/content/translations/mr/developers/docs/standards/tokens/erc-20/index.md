---
title: ERC-20 टोकन मानक
description: इथेरियमवरील विनिमयक्षम टोकन्ससाठीचे मानक असलेल्या ERC-20 बद्दल जाणून घ्या, जे आंतरकार्यक्षम टोकन ॲप्लिकेशन्स सक्षम करते.
lang: mr
---

## परिचय {#introduction}

**टोकन म्हणजे काय?**

टोकन्स [इथेरियम](/) मध्ये अक्षरशः कशाचेही प्रतिनिधित्व करू शकतात:

- ऑनलाइन प्लॅटफॉर्मवरील रेपुटेशन पॉइंट्स
- गेममधील पात्राची कौशल्ये
- कंपनीतील शेअरसारखी आर्थिक मालमत्ता
- USD सारखे फियाट चलन
- एक औंस सोने
- आणि बरेच काही...

इथेरियमच्या अशा शक्तिशाली वैशिष्ट्याला एका मजबूत मानकाद्वारे हाताळले गेले पाहिजे, बरोबर? नेमकी इथेच ERC-20 ची भूमिका येते! हे मानक डेव्हलपर्सना इतर उत्पादने आणि सेवांशी आंतरकार्यक्षम असलेले टोकन ॲप्लिकेशन्स तयार करण्याची अनुमती देते. ERC-20 मानकाचा वापर [इथर](/glossary/#ether) ला अतिरिक्त कार्यक्षमता प्रदान करण्यासाठी देखील केला जातो.

**ERC-20 म्हणजे काय?**

ERC-20 विनिमयक्षम टोकन्ससाठी (Fungible Tokens) एक मानक सादर करते, दुसऱ्या शब्दांत, त्यांच्यात असा एक गुणधर्म असतो ज्यामुळे प्रत्येक टोकन (प्रकार आणि मूल्यानुसार) दुसऱ्या टोकनसारखेच असते. उदाहरणार्थ, एक ERC-20 टोकन अगदी ETH प्रमाणेच कार्य करते, याचा अर्थ 1 टोकन हे नेहमी इतर सर्व टोकन्सच्या समान असते आणि राहील.

## पूर्वतयारी {#prerequisites}

- [खाती](/developers/docs/accounts)
- [स्मार्ट कॉन्ट्रॅक्ट्स](/developers/docs/smart-contracts/)
- [टोकन मानके](/developers/docs/standards/tokens/)

## मुख्य भाग {#body}

नोव्हेंबर 2015 मध्ये फॅबियन वोगेलस्टेलर (Fabian Vogelsteller) यांनी प्रस्तावित केलेले ERC-20 (Ethereum Request for Comments 20), हे एक टोकन मानक आहे जे स्मार्ट कॉन्ट्रॅक्ट्समधील टोकन्ससाठी API लागू करते.

ERC-20 द्वारे प्रदान केल्या जाणाऱ्या कार्यक्षमतेची उदाहरणे:

- एका खात्यातून दुसऱ्या खात्यात टोकन्सचे हस्तांतरण करणे
- खात्यातील सध्याची टोकन शिल्लक मिळवणे
- नेटवर्कवर उपलब्ध असलेल्या टोकनचा एकूण पुरवठा मिळवणे
- एखाद्या खात्यातील टोकनची रक्कम तृतीय-पक्ष खात्याद्वारे खर्च केली जाऊ शकते की नाही हे मंजूर करणे

जर एखादे स्मार्ट कॉन्ट्रॅक्ट खालील पद्धती आणि घटना लागू करत असेल, तर त्याला ERC-20 टोकन कॉन्ट्रॅक्ट म्हटले जाऊ शकते आणि एकदा डिप्लॉय झाल्यानंतर, ते इथेरियमवर तयार केलेल्या टोकन्सचा मागोवा ठेवण्यासाठी जबाबदार असेल.

[EIP-20](https://eips.ethereum.org/EIPS/eip-20) मधून:

### पद्धती (Methods) {#methods}

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

### घटना {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### उदाहरणे {#web3py-example}

इथेरियमवरील कोणत्याही ERC-20 टोकन कॉन्ट्रॅक्टची तपासणी करणे आपल्यासाठी सोपे करण्यासाठी एखादे मानक किती महत्त्वाचे आहे ते पाहूया. कोणत्याही ERC-20 टोकनसाठी इंटरफेस तयार करण्यासाठी आपल्याला फक्त कॉन्ट्रॅक्ट ॲप्लिकेशन बायनरी इंटरफेस (ABI) ची आवश्यकता आहे. तुम्ही खाली पाहू शकता त्याप्रमाणे, हे एक सोपे उदाहरण बनवण्यासाठी आम्ही एक सरलीकृत ABI वापरू.

#### Web3.py उदाहरण {#web3py-example-2}

प्रथम, तुम्ही [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python लायब्ररी इन्स्टॉल केली असल्याची खात्री करा:

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # रॅप्ड इथर (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # युनिस्वॅप V2: DAI 2

# हे ERC-20 टोकन कॉन्ट्रॅक्टचे सरलीकृत कॉन्ट्रॅक्ट ॲप्लिकेशन बायनरी इंटरफेस (ABI) आहे.
# हे फक्त या पद्धती उपलब्ध करेल: balanceOf(address), decimals(), symbol() आणि totalSupply()
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

## ज्ञात समस्या {#erc20-issues}

### ERC-20 टोकन प्राप्त करण्याची समस्या {#reception-issue}

**06/20/2024 पर्यंत या समस्येमुळे किमान $83,656,418 किमतीचे ERC-20 टोकन्स गमावले गेले आहेत. लक्षात घ्या की जोपर्यंत तुम्ही खाली सूचीबद्ध केल्याप्रमाणे मानकावर अतिरिक्त निर्बंधांचा संच लागू करत नाही, तोपर्यंत शुद्ध ERC-20 अंमलबजावणी या समस्येस प्रवण असते.**

जेव्हा ERC-20 टोकन्स अशा स्मार्ट कॉन्ट्रॅक्टला पाठवले जातात जे ERC-20 टोकन्स हाताळण्यासाठी डिझाइन केलेले नसते, तेव्हा ते टोकन्स कायमचे गमावले जाऊ शकतात. असे घडते कारण प्राप्त करणाऱ्या कॉन्ट्रॅक्टमध्ये येणाऱ्या टोकन्सना ओळखण्याची किंवा त्यांना प्रतिसाद देण्याची कार्यक्षमता नसते आणि येणाऱ्या टोकन्सबद्दल प्राप्त करणाऱ्या कॉन्ट्रॅक्टला सूचित करण्यासाठी ERC-20 मानकामध्ये कोणतीही यंत्रणा नसते. ही समस्या प्रामुख्याने खालील मार्गांनी उद्भवते:

1.	टोकन हस्तांतरण यंत्रणा
  - ERC-20 टोकन्स transfer किंवा transferFrom फंक्शन्स वापरून हस्तांतरित केले जातात
	- जेव्हा एखादा वापरकर्ता ही फंक्शन्स वापरून कॉन्ट्रॅक्ट पत्त्यावर टोकन्स पाठवतो, तेव्हा प्राप्त करणारे कॉन्ट्रॅक्ट ते हाताळण्यासाठी डिझाइन केलेले आहे की नाही याची पर्वा न करता टोकन्स हस्तांतरित केले जातात
2.	सूचनेचा अभाव
	- प्राप्त करणाऱ्या कॉन्ट्रॅक्टला टोकन्स पाठवले गेल्याची कोणतीही सूचना किंवा कॉलबॅक मिळत नाही
	- जर प्राप्त करणाऱ्या कॉन्ट्रॅक्टमध्ये टोकन्स हाताळण्यासाठी यंत्रणेचा अभाव असेल (उदा. फॉलबॅक फंक्शन किंवा टोकन प्राप्ती व्यवस्थापित करण्यासाठी समर्पित फंक्शन), तर टोकन्स प्रभावीपणे कॉन्ट्रॅक्टच्या पत्त्यावर अडकतात
3.	अंगभूत हाताळणी नाही
	- ERC-20 मानकामध्ये प्राप्त करणाऱ्या कॉन्ट्रॅक्ट्ससाठी लागू करण्यासाठी कोणतेही अनिवार्य फंक्शन समाविष्ट नाही, ज्यामुळे अशी परिस्थिती निर्माण होते जिथे अनेक कॉन्ट्रॅक्ट्स येणाऱ्या टोकन्सचे योग्यरित्या व्यवस्थापन करण्यास अक्षम असतात

**संभाव्य उपाय**

जरी ERC-20 सह ही समस्या पूर्णपणे टाळणे शक्य नसले तरी, अशा काही पद्धती आहेत ज्या अंतिम वापरकर्त्यासाठी टोकन्स गमावण्याची शक्यता लक्षणीयरीत्या कमी करू शकतात:

- सर्वात सामान्य समस्या तेव्हा उद्भवते जेव्हा वापरकर्ता टोकन कॉन्ट्रॅक्टच्या पत्त्यावरच टोकन्स पाठवतो (उदा. USDT टोकन कॉन्ट्रॅक्टच्या पत्त्यावर जमा केलेले USDT). अशा हस्तांतरण प्रयत्नांना पूर्ववत करण्यासाठी `transfer(..)` फंक्शन प्रतिबंधित करण्याची शिफारस केली जाते. `transfer(..)` फंक्शनच्या अंमलबजावणीमध्ये `require(_to != address(this));` तपासणी जोडण्याचा विचार करा.
- सर्वसाधारणपणे `transfer(..)` फंक्शन कॉन्ट्रॅक्ट्समध्ये टोकन्स जमा करण्यासाठी डिझाइन केलेले नाही. त्याऐवजी कॉन्ट्रॅक्ट्समध्ये ERC-20 टोकन्स जमा करण्यासाठी `approve(..) & transferFrom(..)` पॅटर्न वापरला जातो. कोणत्याही कॉन्ट्रॅक्ट्समध्ये टोकन्स जमा करण्यास मनाई करण्यासाठी हस्तांतरण फंक्शन प्रतिबंधित करणे शक्य आहे, तथापि हे अशा कॉन्ट्रॅक्ट्ससह सुसंगतता खंडित करू शकते जे असे गृहीत धरतात की `transfer(..)` फंक्शनसह कॉन्ट्रॅक्ट्समध्ये टोकन्स जमा केले जाऊ शकतात (उदा. युनिस्वॅप तरलता पूल्स).
- नेहमी असे गृहीत धरा की ERC-20 टोकन्स तुमच्या कॉन्ट्रॅक्टमध्ये येऊ शकतात, जरी तुमच्या कॉन्ट्रॅक्टला कधीही कोणतेही टोकन्स मिळणे अपेक्षित नसले तरीही. प्राप्तकर्त्याच्या बाजूने अपघाती ठेवी रोखण्याचा किंवा नाकारण्याचा कोणताही मार्ग नाही. चुकून जमा झालेले ERC-20 टोकन्स काढण्याची अनुमती देणारे फंक्शन लागू करण्याची शिफारस केली जाते.
- पर्यायी टोकन मानके वापरण्याचा विचार करा.

या समस्येमधून काही पर्यायी मानके पुढे आली आहेत जसे की [ERC-223](/developers/docs/standards/tokens/erc-223) किंवा [ERC-1363](/developers/docs/standards/tokens/erc-1363).

## पुढील वाचन {#further-reading}

- [EIP-20: ERC-20 टोकन मानक](https://eips.ethereum.org/EIPS/eip-20)
- [ओपनझेपलिन - टोकन्स](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [ओपनझेपलिन - ERC-20 अंमलबजावणी](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Solidity ERC20 टोकन्ससाठी मार्गदर्शक](https://www.alchemy.com/overviews/erc20-solidity)

## इतर विनिमयक्षम टोकन मानके {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - टोकनाइज्ड व्हॉल्ट्स](/developers/docs/standards/tokens/erc-4626)

## ट्युटोरियल्स: इथेरियमवर ERC-20 सह तयार करा {#tutorials}

- [ERC-20 कॉन्ट्रॅक्ट वॉक-थ्रू](/developers/tutorials/erc20-annotated-code/) _– ओपनझेपलिन ERC-20 कॉन्ट्रॅक्ट अंमलबजावणीचे ओळीनुसार स्पष्टीकरणात्मक वॉकथ्रू._
- [सुरक्षा रेलसह ERC-20](/developers/tutorials/erc20-with-safety-rails/) _– वापरकर्त्यांना सामान्य चुका टाळण्यास मदत करण्यासाठी ERC-20 टोकन्समध्ये सुरक्षा उपाय कसे जोडावेत._
- [Ethers.js वापरून टोकन्स पाठवणे](/developers/tutorials/send-token-ethersjs/) _– Ethers.js वापरून ERC-20 टोकन्स हस्तांतरित करण्यासाठी नवशिक्यांसाठी अनुकूल मार्गदर्शक._
- [स्कॅम टोकन्सद्वारे वापरल्या जाणाऱ्या काही युक्त्या आणि त्या कशा ओळखाव्या](/developers/tutorials/scam-token-tricks/) _– स्कॅम ERC-20 टोकन पॅटर्न आणि ते कसे ओळखावे याबद्दल सविस्तर माहिती._