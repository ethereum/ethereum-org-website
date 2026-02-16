---
title: "ERC-721 नॉन-फंजिबल टोकन मानक"
description: "ERC-721 बद्दल जाणून घ्या, जे Ethereum वरील युनिक डिजिटल मालमत्तेचे प्रतिनिधित्व करणाऱ्या नॉन-फंजिबल टोकन (NFTs) साठी एक मानक आहे."
lang: mr
---

## प्रस्तावना {#introduction}

**नॉन-फंजिबल टोकन म्हणजे काय?**

नॉन-फंजिबल टोकन (NFT) हे काहीतरी किंवा कोणालातरी अद्वितीय पद्धतीने ओळखण्यासाठी वापरले जाते. हे टोकन संग्रहणीय वस्तू, ॲक्सेस की, लॉटरीची तिकिटे, कॉन्सर्ट आणि क्रीडा सामन्यांसाठी क्रमांकित जागा इत्यादी देणाऱ्या प्लॅटफॉर्मवर वापरण्यासाठी योग्य आहे. या विशेष प्रकारच्या टोकनमध्ये अद्भूत शक्यता आहेत, त्यामुळे ते एका योग्य मानकास पात्र आहे, आणि ERC-721
हेच निराकरण करण्यासाठी आले आहे!

**ERC-721 म्हणजे काय?**

ERC-721 हे NFT साठी एक मानक सादर करते, दुसऱ्या शब्दांत, या प्रकारचे टोकन अद्वितीय असते आणि त्याचे मूल्य त्याच स्मार्ट कॉन्ट्रॅक्टमधील दुसऱ्या टोकनपेक्षा वेगळे असू शकते,
kदाचित त्याचे वय, दुर्मिळता किंवा अगदी त्याच्या व्हिज्युअलसारख्या इतर गोष्टींमुळे.
थांबा, व्हिज्युअल?

होय! सर्व NFTs मध्ये `tokenId` नावाचे `uint256` व्हेरिएबल असते, म्हणून कोणत्याही ERC-721 कॉन्ट्रॅक्टसाठी, `contract address, uint256 tokenId` ही जोडी
जागतिक स्तरावर अद्वितीय असणे आवश्यक आहे. असे असले तरी, एका dApp मध्ये एक "कन्व्हर्टर" असू शकतो जो
`tokenId` इनपुट म्हणून वापरतो आणि झोम्बी, शस्त्रे, कौशल्ये किंवा आश्चर्यकारक किटीजसारख्या छान गोष्टीची इमेज आउटपुट करतो!

## पूर्वतयारी {#prerequisites}

- [खाती](/developers/docs/accounts/)
- [स्मार्ट कॉन्ट्रॅक्ट्स](/developers/docs/smart-contracts/)
- [टोकन मानके](/developers/docs/standards/tokens/)

## मुख्य भाग {#body}

जानेवारी 2018 मध्ये विल्यम एंट्रिंकन, डायटर शिर्ले, जेकब इव्हान्स,
नास्तासिया सॅक्स यांनी प्रस्तावित केलेले ERC-721 (Ethereum रिक्वेस्ट फॉर कमेंट्स 721), हे एक नॉन-फंजिबल टोकन मानक आहे जे स्मार्ट कॉन्ट्रॅक्ट्समधील टोकन्ससाठी API लागू करते.

हे एका खात्यातून दुसऱ्या खात्यात टोकन हस्तांतरित करणे, खात्यातील सध्याची टोकन शिल्लक मिळवणे,
एका विशिष्ट टोकनचा मालक मिळवणे आणि नेटवर्कवर उपलब्ध असलेल्या टोकनचा एकूण पुरवठा मिळवणे यासारख्या कार्यक्षमता प्रदान करते.
या व्यतिरिक्त, यात इतर काही कार्यक्षमता आहेत, जसे की एखाद्या खात्यातून टोकनची रक्कम तृतीय-पक्ष खात्याद्वारे
हलवली जाऊ शकते याला मान्यता देणे.

जर एखादा स्मार्ट कॉन्ट्रॅक्ट खालील पद्धती आणि इव्हेंट्स लागू करत असेल तर त्याला ERC-721 नॉन-फंजिबल टोकन कॉन्ट्रॅक्ट म्हटले जाऊ शकते
आणि, एकदा तैनात केल्यावर, ते Ethereum वर तयार केलेल्या टोकनचा मागोवा ठेवण्यासाठी जबाबदार असेल.

[EIP-721](https://eips.ethereum.org/EIPS/eip-721) मधून:

### मेथड्स {#methods}

```solidity
    function balanceOf(address _owner) external view returns (uint256);
    function ownerOf(uint256 _tokenId) external view returns (address);
    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable;
    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable;
    function transferFrom(address _from, address _to, uint256 _tokenId) external payable;
    function approve(address _approved, uint256 _tokenId) external payable;
    function setApprovalForAll(address _operator, bool _approved) external;
    function getApproved(uint256 _tokenId) external view returns (address);
    function isApprovedForAll(address _owner, address _operator) external view returns (bool);
```

### इव्हेंट्स {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### उदाहरणे {#web3py-example}

Ethereum वरील कोणत्याही ERC-721 टोकन कॉन्ट्रॅक्टची तपासणी करणे आपल्यासाठी सोपे करण्यासाठी एक मानक किती महत्त्वाचे आहे ते पाहूया.
कोणत्याही ERC-721 टोकनसाठी इंटरफेस तयार करण्यासाठी आपल्याला फक्त कॉन्ट्रॅक्ट ॲप्लिकेशन बायनरी इंटरफेस (ABI) ची आवश्यकता आहे. तुम्ही खाली पाहू शकता की आम्ही एक सरलीकृत ABI वापरणार आहोत, जेणेकरून हे एक कमी घर्षणाचे उदाहरण बनेल.

#### Web3.py उदाहरण {#web3py-example}

प्रथम, आपण [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python लायब्ररी स्थापित केली असल्याची खात्री करा:

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # CryptoKitties कॉन्ट्रॅक्ट

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # CryptoKitties सेल्स ऑक्शन

# हे ERC-721 NFT कॉन्ट्रॅक्टचे एक सरलीकृत कॉन्ट्रॅक्ट ॲप्लिकेशन बायनरी इंटरफेस (ABI) आहे.
# हे फक्त balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply() या पद्धती उघड करेल.
simplified_abi = [
    {
        'inputs': [{'internalType': 'address', 'name': 'owner', 'type': 'address'}],
        'name': 'balanceOf',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'name',
        'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [{'internalType': 'uint256', 'name': 'tokenId', 'type': 'uint256'}],
        'name': 'ownerOf',
        'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
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
    },
]

ck_extra_abi = [
    {
        'inputs': [],
        'name': 'pregnantKitties',
        'outputs': [{'name': '', 'type': 'uint256'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [{'name': '_kittyId', 'type': 'uint256'}],
        'name': 'isPregnant',
        'outputs': [{'name': '', 'type': 'bool'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    }
]

ck_contract = w3.eth.contract(address=w3.to_checksum_address(ck_token_addr), abi=simplified_abi+ck_extra_abi)
name = ck_contract.functions.name().call()
symbol = ck_contract.functions.symbol().call()
kitties_auctions = ck_contract.functions.balanceOf(acc_address).call()
print(f"{name} [{symbol}] NFTs in Auctions: {kitties_auctions}")

pregnant_kitties = ck_contract.functions.pregnantKitties().call()
print(f"{name} [{symbol}] NFTs Pregnants: {pregnant_kitties}")

# हस्तांतरित किटीजची माहिती मिळविण्यासाठी ट्रान्सफर इव्हेंट ABI चा वापर करणे.
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# लॉग फिल्टर करण्यासाठी आम्हाला इव्हेंटच्या स्वाक्षरीची आवश्यकता आहे
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# टीप:
#   - जर कोणताही ट्रान्सफर इव्हेंट परत आला नाही तर ब्लॉकची संख्या 120 पासून वाढवा.
#   - जर तुम्हाला कोणताही ट्रान्सफर इव्हेंट आढळला नाही तर तुम्ही येथे tokenId मिळवण्याचा प्रयत्न करू शकता:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       इव्हेंटचे लॉग विस्तृत करण्यासाठी क्लिक करा आणि त्याचा "tokenId" युक्तिवाद कॉपी करा
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # वरील लिंकवरून "tokenId" येथे पेस्ट करा
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

CryptoKitties कॉन्ट्रॅक्टमध्ये मानक इव्हेंट्स व्यतिरिक्त काही मनोरंजक इव्हेंट्स आहेत.

चला त्यापैकी `Pregnant` आणि `Birth` हे दोन तपासूया.

```python
# नवीन किटीजची माहिती मिळविण्यासाठी प्रेग्नंट आणि बर्थ इव्हेंट्स ABI चा वापर करणे.
ck_extra_events_abi = [
    {
        'anonymous': False,
        'inputs': [
            {'indexed': False, 'name': 'owner', 'type': 'address'},
            {'indexed': False, 'name': 'matronId', 'type': 'uint256'},
            {'indexed': False, 'name': 'sireId', 'type': 'uint256'},
            {'indexed': False, 'name': 'cooldownEndBlock', 'type': 'uint256'}],
        'name': 'Pregnant',
        'type': 'event'
    },
    {
        'anonymous': False,
        'inputs': [
            {'indexed': False, 'name': 'owner', 'type': 'address'},
            {'indexed': False, 'name': 'kittyId', 'type': 'uint256'},
            {'indexed': False, 'name': 'matronId', 'type': 'uint256'},
            {'indexed': False, 'name': 'sireId', 'type': 'uint256'},
            {'indexed': False, 'name': 'genes', 'type': 'uint256'}],
        'name': 'Birth',
        'type': 'event'
    }]

# लॉग फिल्टर करण्यासाठी आम्हाला इव्हेंटच्या स्वाक्षरीची आवश्यकता आहे
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# येथे एक प्रेग्नंट इव्हेंट आहे:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# येथे एक बर्थ इव्हेंट आहे:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## लोकप्रिय NFTs {#popular-nfts}

- [Etherscan NFT Tracker](https://etherscan.io/nft-top-contracts) हस्तांतरण व्हॉल्यूमनुसार Ethereum वरील शीर्ष NFT ची यादी करते.
- [CryptoKitties](https://www.cryptokitties.co/) हा प्रजननक्षम, संग्रहणीय आणि अत्यंत मोहक प्राण्यांभोवती केंद्रित असलेला एक खेळ आहे,
  ज्यांना आपण CryptoKitties म्हणतो.
- [Sorare](https://sorare.com/) हा एक जागतिक फँटसी फुटबॉल खेळ आहे जिथे तुम्ही मर्यादित आवृत्तीचे संग्रहणीय वस्तू गोळा करू शकता,
  तुमच्या संघांचे व्यवस्थापन करू शकता आणि बक्षिसे मिळवण्यासाठी स्पर्धा करू शकता.
- [The Ethereum Name Service (ENS)](https://ens.domains/) सोप्या, मानवी-वाचनीय नावांचा वापर करून ब्लॉकचेनवर आणि ब्लॉकचेनबाहेर
  संसाधनांना संबोधित करण्याचा एक सुरक्षित आणि विकेंद्रित मार्ग प्रदान करते.
- [POAP](https://poap.xyz) जे लोक कार्यक्रमांना उपस्थित राहतात किंवा विशिष्ट क्रिया पूर्ण करतात त्यांना मोफत NFTs वितरीत करते. POAPs तयार करणे आणि वितरित करणे विनामूल्य आहे.
- [Unstoppable Domains](https://unstoppabledomains.com/) ही सॅन फ्रान्सिस्को-स्थित कंपनी आहे जी ब्लॉकचेनवर
  डोमेन तयार करत आहे. ब्लॉकचेन डोमेन मानवी-वाचनीय नावांनी क्रिप्टोकरन्सी पत्त्यांची जागा घेतात आणि सेन्सॉरशिप-प्रतिरोधक वेबसाइट्स
  सक्षम करण्यासाठी वापरल्या जाऊ शकतात.
- [Gods Unchained Cards](https://godsunchained.com/) हा Ethereum ब्लॉकचेनवरील एक TCG आहे जो इन-गेम मालमत्तेला खरी मालकी
  देण्यासाठी NFT's चा वापर करतो.
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) हा 10,000 युनिक NFTs चा संग्रह आहे, जो, एक सिद्ध-दुर्मिळ कलाकृती असण्यासोबतच, क्लबसाठी सदस्यत्व टोकन म्हणून काम करतो, आणि सदस्यांना फायदे आणि लाभ प्रदान करतो जे सामुदायिक प्रयत्नांच्या परिणामी कालांतराने वाढतात.

## पुढील वाचन {#further-reading}

- [EIP-721: ERC-721 नॉन-फंजिबल टोकन मानक](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - ERC-721 डॉक्स](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - ERC-721 अंमलबजावणी](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)
