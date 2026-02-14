---
title: "ERC-20 टोकन मानक"
description: "ERC-20 बद्दल जाणून घ्या, Ethereum वरील फंजिबल टोकन्ससाठीचे मानक जे इंटरऑपरेबल टोकन ऍप्लिकेशन्सना सक्षम करते."
lang: mr
---

## प्रस्तावना {#introduction}

**टोकन म्हणजे काय?**

Ethereum मध्ये टोकन्स अक्षरशः काहीही दर्शवू शकतात:

- ऑनलाइन प्लॅटफॉर्ममधील प्रतिष्ठेचे गुण
- गेममधील कॅरॅक्टरची कौशल्ये
- कंपनीमधील शेअरसारखी आर्थिक मालमत्ता
- USD सारखे फियाट चलन
- एक औंस सोने
- आणि बरेच काही...

Ethereum चे इतके शक्तिशाली वैशिष्ट्य एका मजबूत मानकाद्वारे हाताळले जाणे आवश्यक आहे, बरोबर? अगदी इथेच ERC-20 आपली भूमिका बजावते! हे मानक डेव्हलपर्सना असे टोकन ऍप्लिकेशन्स बनविण्याची परवानगी देते जे इतर उत्पादने आणि सेवांसह इंटरऑपरेबल आहेत. ERC-20 मानकाचा वापर [ether](/glossary/#ether) ला अतिरिक्त कार्यक्षमता प्रदान करण्यासाठी देखील केला जातो.

**ERC-20 म्हणजे काय?**

ERC-20 फंजिबल टोकन्ससाठी एक मानक सादर करते, दुसऱ्या शब्दांत, त्यांच्याकडे एक वैशिष्ट्य आहे जे प्रत्येक टोकनला दुसऱ्या टोकनसारखेच (प्रकार आणि मूल्यात) बनवते. उदाहरणार्थ, ERC-20 टोकन ETH प्रमाणेच कार्य करते, याचा अर्थ असा की 1 टोकन इतर सर्व टोकन्सच्या समान आहे आणि नेहमीच असेल.

## पूर्वतयारी {#prerequisites}

- [खाती](/developers/docs/accounts)
- [स्मार्ट कॉन्ट्रॅक्ट्स](/developers/docs/smart-contracts/)
- [टोकन मानके](/developers/docs/standards/tokens/)

## मुख्य भाग {#body}

ERC-20 (Ethereum Request for Comments 20), नोव्हेंबर 2015 मध्ये फॅबियन व्होगेलस्टेलर यांनी प्रस्तावित केले, हे एक टोकन मानक आहे जे स्मार्ट कॉन्ट्रॅक्ट्समधील टोकन्ससाठी API लागू करते.

ERC-20 द्वारे प्रदान केलेल्या उदाहरण कार्यक्षमता:

- एका खात्यातून दुसऱ्या खात्यात टोकन हस्तांतरित करणे
- खात्यातील सध्याची टोकन शिल्लक मिळवणे
- नेटवर्कवर उपलब्ध असलेल्या टोकनचा एकूण पुरवठा मिळवणे
- एखाद्या खात्यातील टोकनची रक्कम तृतीय-पक्ष खात्याद्वारे खर्च केली जाऊ शकते की नाही हे मंजूर करणे

जर एखादे स्मार्ट कॉन्ट्रॅक्ट खालील पद्धती आणि इव्हेंट्स लागू करत असेल, तर त्याला ERC-20 टोकन कॉन्ट्रॅक्ट म्हटले जाऊ शकते आणि एकदा तैनात केल्यावर ते Ethereum वर तयार केलेल्या टोकन्सचा मागोवा ठेवण्यासाठी जबाबदार असेल.

[EIP-20](https://eips.ethereum.org/EIPS/eip-20) वरून:

### मेथड्स {#methods}

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

### इव्हेंट्स {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### उदाहरणे {#web3py-example}

चला पाहूया की Ethereum वरील कोणत्याही ERC-20 टोकन कॉन्ट्रॅक्टची तपासणी करणे आपल्यासाठी सोपे करण्यासाठी एक मानक किती महत्त्वाचे आहे.
कोणत्याही ERC-20 टोकनसाठी इंटरफेस तयार करण्यासाठी आपल्याला फक्त कॉन्ट्रॅक्ट ऍप्लिकेशन बायनरी इंटरफेस (ABI) ची आवश्यकता आहे. तुम्ही खाली पाहू शकता की आम्ही एक सरलीकृत ABI वापरणार आहोत, जेणेकरून हे एक कमी घर्षणाचे उदाहरण बनेल.

#### Web3.py उदाहरण {#web3py-example}

प्रथम, आपण [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python लायब्ररी स्थापित केली असल्याची खात्री करा:

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # रॅप्ड इथर (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# हा ERC-20 टोकन कॉन्ट्रॅक्टचा एक सरलीकृत कॉन्ट्रॅक्ट ऍप्लिकेशन बायनरी इंटरफेस (ABI) आहे.
# हे फक्त balanceOf(address), decimals(), symbol() आणि totalSupply() या पद्धती उघड करेल
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

### ERC-20 टोकन स्वीकृतीची समस्या {#reception-issue}

**06/20/2024 पर्यंत, या समस्येमुळे किमान $83,656,418 किमतीचे ERC-20 टोकन गमावले गेले आहेत. लक्षात घ्या की शुद्ध ERC-20 अंमलबजावणी या समस्येस बळी पडू शकते, जोपर्यंत तुम्ही खाली सूचीबद्ध केल्यानुसार मानकाच्या वर अतिरिक्त निर्बंधांचा संच लागू करत नाही.**

जेव्हा ERC-20 टोकन्स अशा स्मार्ट कॉन्ट्रॅक्टला पाठवले जातात जे ERC-20 टोकन्स हाताळण्यासाठी डिझाइन केलेले नाहीत, तेव्हा ते टोकन्स कायमचे गमावले जाऊ शकतात. हे घडते कारण प्राप्त करणाऱ्या कॉन्ट्रॅक्टमध्ये येणाऱ्या टोकन्सना ओळखण्याची किंवा प्रतिसाद देण्याची कार्यक्षमता नसते आणि ERC-20 मानकामध्ये प्राप्त करणाऱ्या कॉन्ट्रॅक्टला येणाऱ्या टोकन्सबद्दल सूचित करण्याची कोणतीही यंत्रणा नसते. ही समस्या मुख्यत्वे खालील मार्गांनी स्वरूप घेते:

1. टोकन हस्तांतरण यंत्रणा

- ERC-20 टोकन transfer किंवा transferFrom फंक्शन्स वापरून हस्तांतरित केले जातात
  - जेव्हा एखादा वापरकर्ता या फंक्शन्सचा वापर करून कॉन्ट्रॅक्ट पत्त्यावर टोकन पाठवतो, तेव्हा प्राप्त करणारा कॉन्ट्रॅक्ट ते हाताळण्यासाठी डिझाइन केलेला आहे की नाही याची पर्वा न करता टोकन हस्तांतरित केले जातात

2. सूचनेचा अभाव
   - प्राप्त करणाऱ्या कॉन्ट्रॅक्टला टोकन पाठवले गेल्याची सूचना किंवा कॉलबॅक मिळत नाही
   - जर प्राप्त करणाऱ्या कॉन्ट्रॅक्टमध्ये टोकन हाताळण्यासाठी यंत्रणेचा अभाव असेल (उदा. फॉलबॅक फंक्शन किंवा टोकन स्वीकृती व्यवस्थापित करण्यासाठी एक समर्पित फंक्शन), तर टोकन प्रभावीपणे कॉन्ट्रॅक्टच्या पत्त्यावर अडकून पडतात
3. अंगभूत हाताळणी नाही
   - ERC-20 मानकामध्ये प्राप्त करणाऱ्या कॉन्ट्रॅक्ट्ससाठी लागू करण्यासाठी कोणतेही अनिवार्य फंक्शन समाविष्ट नाही, ज्यामुळे अनेक कॉन्ट्रॅक्ट्स येणाऱ्या टोकन्सचे योग्यरित्या व्यवस्थापन करण्यास असमर्थ ठरतात

**संभाव्य उपाय**

जरी ERC-20 सह ही समस्या पूर्णपणे टाळणे शक्य नसले तरी, अशा पद्धती आहेत ज्यामुळे अंतिम वापरकर्त्यासाठी टोकन गमावण्याची शक्यता लक्षणीयरीत्या कमी होऊ शकते:

- सर्वात सामान्य समस्या म्हणजे जेव्हा वापरकर्ता टोकन कॉन्ट्रॅक्टच्या पत्त्यावरच टोकन पाठवतो (उदा. USDT टोकन कॉन्ट्रॅक्टच्या पत्त्यावर जमा केलेले USDT). अशा हस्तांतरणाच्या प्रयत्नांना परत फिरवण्यासाठी `transfer(..)` फंक्शन प्रतिबंधित करण्याची शिफारस केली जाते. `transfer(..)` फंक्शनच्या अंमलबजावणीमध्ये `require(_to != address(this));` तपासणी जोडण्याचा विचार करा.
- `transfer(..)` फंक्शन सर्वसाधारणपणे कॉन्ट्रॅक्ट्समध्ये टोकन जमा करण्यासाठी डिझाइन केलेले नाही. `approve(..) आणि transferFrom(..)` पॅटर्नचा वापर त्याऐवजी ERC-20 टोकन कॉन्ट्रॅक्ट्समध्ये जमा करण्यासाठी केला जातो. ट्रान्सफर फंक्शनला कोणत्याही कॉन्ट्रॅक्टमध्ये टोकन जमा करण्यास मनाई करण्यासाठी प्रतिबंधित करणे शक्य आहे, तथापि ते `trasnfer(..)` फंक्शनसह कॉन्ट्रॅक्टमध्ये टोकन जमा केले जाऊ शकतात असे गृहीत धरणाऱ्या कॉन्ट्रॅक्ट्ससह (उदा. Uniswap लिक्विडिटी पूल्स) सुसंगतता खंडित करू शकते.
- तुमच्या कॉन्ट्रॅक्टला कधीही कोणतेही टोकन मिळणे अपेक्षित नसले तरी, ERC-20 टोकन तुमच्या कॉन्ट्रॅक्टमध्ये येऊ शकतात असे नेहमी गृहीत धरा. प्राप्तकर्त्याच्या बाजूने अपघाती ठेवी रोखण्याचा किंवा नाकारण्याचा कोणताही मार्ग नाही. असे फंक्शन लागू करण्याची शिफारस केली जाते जे अपघाताने जमा केलेले ERC-20 टोकन काढण्यास अनुमती देईल.
- वैकल्पिक टोकन मानके वापरण्याचा विचार करा.

या समस्येतून काही पर्यायी मानके समोर आली आहेत जसे की [ERC-223](/developers/docs/standards/tokens/erc-223) किंवा [ERC-1363](/developers/docs/standards/tokens/erc-1363).

## पुढील वाचन {#further-reading}

- [EIP-20: ERC-20 टोकन मानक](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - टोकन्स](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - ERC-20 अंमलबजावणी](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Solidity ERC20 टोकन्ससाठी मार्गदर्शक](https://www.alchemy.com/overviews/erc20-solidity)

## इतर फंजिबल टोकन मानके {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - टोकनाइज्ड वॉल्ट्स](/developers/docs/standards/tokens/erc-4626)
