---
title: "ERC-721 अविनिमयक्षम टोकन स्टँडर्ड"
description: "ERC-721 बद्दल जाणून घ्या, जे इथेरियमवरील अद्वितीय डिजिटल मालमत्तांचे प्रतिनिधित्व करणाऱ्या अविनिमयक्षम टोकन्स (NFTs) चे स्टँडर्ड आहे."
lang: mr
---

## परिचय {#introduction}

**अविनिमयक्षम टोकन म्हणजे काय?**

अविनिमयक्षम टोकन (NFT) चा वापर एखाद्या गोष्टीला किंवा व्यक्तीला अद्वितीय मार्गाने ओळखण्यासाठी केला जातो. या प्रकारचे टोकन अशा प्लॅटफॉर्मवर वापरण्यासाठी योग्य आहे जे संग्रहणीय वस्तू, ॲक्सेस की, लॉटरीची तिकिटे, कॉन्सर्ट आणि क्रीडा सामन्यांसाठी क्रमांकित जागा इत्यादी ऑफर करतात. या विशेष प्रकारच्या टोकनमध्ये आश्चर्यकारक शक्यता आहेत त्यामुळे ते एका योग्य स्टँडर्डसाठी पात्र आहे, ERC-721 ने हे सोडवण्यासाठी प्रवेश केला!

**ERC-721 म्हणजे काय?**

ERC-721 हे NFT साठी एक स्टँडर्ड सादर करते, दुसऱ्या शब्दांत, या प्रकारचे टोकन अद्वितीय असते आणि त्याचे मूल्य त्याच स्मार्ट कॉन्ट्रॅक्टमधील दुसऱ्या टोकनपेक्षा वेगळे असू शकते, कदाचित त्याचे वय, दुर्मिळता किंवा अगदी त्याच्या दृश्यासारख्या (visual) इतर गोष्टींमुळे. थांबा, दृश्य?

होय! सर्व NFTs मध्ये `tokenId` नावाचे एक `uint256` व्हेरिएबल असते, त्यामुळे कोणत्याही ERC-721 कॉन्ट्रॅक्टसाठी, `contract address, uint256 tokenId` ही जोडी जागतिक स्तरावर अद्वितीय असणे आवश्यक आहे. असे म्हटल्यावर, एका विकेंद्रित ॲप्लिकेशन (dapp) मध्ये एक "कन्व्हर्टर" असू शकतो जो `tokenId` चा इनपुट म्हणून वापर करतो आणि झोम्बी, शस्त्रे, कौशल्ये किंवा आश्चर्यकारक किटीज (kitties) सारख्या छान गोष्टींची प्रतिमा आउटपुट करतो!

## पूर्व शर्ती {#prerequisites}

- [खाती](/developers/docs/accounts/)
- [स्मार्ट कॉन्ट्रॅक्ट्स](/developers/docs/smart-contracts/)
- [टोकन स्टँडर्ड्स](/developers/docs/standards/tokens/)

## मुख्य भाग {#body}

जानेवारी 2018 मध्ये विल्यम एंट्रिकन, डायटर शर्ली, जेकब इव्हान्स, नस्तासिया सॅक्स यांनी प्रस्तावित केलेले ERC-721 ([इथेरियम](/) रिक्वेस्ट फॉर कॉमेंट्स 721), हे एक अविनिमयक्षम टोकन स्टँडर्ड आहे जे स्मार्ट कॉन्ट्रॅक्ट्समध्ये टोकन्ससाठी API लागू करते.

हे एका खात्यातून दुसऱ्या खात्यात टोकन्सचे हस्तांतरण करणे, खात्यातील सध्याचे टोकन बॅलन्स मिळवणे, विशिष्ट टोकनचा मालक मिळवणे आणि नेटवर्कवर उपलब्ध असलेल्या टोकनचा एकूण पुरवठा मिळवणे यासारख्या कार्यक्षमता प्रदान करते. याव्यतिरिक्त, यामध्ये इतर काही कार्यक्षमता देखील आहेत जसे की एखाद्या खात्यातील टोकनची रक्कम तृतीय पक्ष खात्याद्वारे हलविली जाऊ शकते हे मंजूर करणे.

जर एखादे स्मार्ट कॉन्ट्रॅक्ट खालील पद्धती आणि घटना लागू करत असेल तर त्याला ERC-721 अविनिमयक्षम टोकन कॉन्ट्रॅक्ट म्हटले जाऊ शकते आणि एकदा प्रस्थापित केल्यानंतर, ते इथेरियमवर तयार केलेल्या टोकन्सचा मागोवा ठेवण्यासाठी जबाबदार असेल.

[EIP-721](https://eips.ethereum.org/EIPS/eip-721) मधून:

### पद्धती {#methods}

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

### घटना {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### उदाहरणे {#web3py-example}

इथेरियमवरील कोणत्याही ERC-721 टोकन कॉन्ट्रॅक्टची तपासणी करणे आपल्यासाठी सोपे करण्यासाठी स्टँडर्ड किती महत्त्वाचे आहे ते पाहूया. कोणत्याही ERC-721 टोकनसाठी इंटरफेस तयार करण्यासाठी आपल्याला फक्त कॉन्ट्रॅक्ट ॲप्लिकेशन बायनरी इंटरफेस (ABI) ची आवश्यकता आहे. जसे तुम्ही खाली पाहू शकता की आपण एक सोपे उदाहरण बनवण्यासाठी, सरलीकृत ABI वापरू.

#### Web3.py उदाहरण {#web3py-example-2}

प्रथम, तुम्ही [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python लायब्ररी इन्स्टॉल केली असल्याची खात्री करा:

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # क्रिप्टोकिटीज् कॉन्ट्रॅक्ट

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # क्रिप्टोकिटीज् विक्री लिलाव

# हे ERC-721 NFT कॉन्ट्रॅक्टचा एक सरलीकृत कॉन्ट्रॅक्ट ॲप्लिकेशन बायनरी इंटरफेस (ABI) आहे.
# हे फक्त या पद्धती उपलब्ध करेल: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
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

# हस्तांतरित केलेल्या किटीज् बद्दल माहिती मिळवण्यासाठी हस्तांतरण घटना ABI चा वापर करत आहे.
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# लॉग फिल्टर करण्यासाठी आपल्याला घटनेच्या स्वाक्षरीची आवश्यकता आहे
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# टिपा:
#   - जर कोणतीही हस्तांतरण घटना परत आली नाही तर ब्लॉकची संख्या 120 च्या वर वाढवा.
#   - जर तुम्हाला कोणतीही हस्तांतरण घटना सापडली नाही तर तुम्ही येथे tokenId मिळवण्याचा प्रयत्न देखील करू शकता:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       घटनेचे लॉग विस्तृत करण्यासाठी क्लिक करा आणि त्याचा "tokenId" आर्ग्युमेंट कॉपी करा
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # वरील लिंकवरून "tokenId" येथे पेस्ट करा
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

क्रिप्टोकिटीज् कॉन्ट्रॅक्टमध्ये स्टँडर्ड घटनांव्यतिरिक्त काही मनोरंजक घटना आहेत.

चला त्यापैकी दोन तपासूया, `Pregnant` आणि `Birth`.

```python
# नवीन किटीज् बद्दल माहिती मिळवण्यासाठी प्रेग्नंट आणि बर्थ घटना ABI चा वापर करत आहे.
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

# लॉग फिल्टर करण्यासाठी आपल्याला घटनेच्या स्वाक्षरीची आवश्यकता आहे
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# येथे एक प्रेग्नंट घटना आहे:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# येथे एक बर्थ घटना आहे:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## लोकप्रिय NFTs {#popular-nfts}

- [Etherscan NFT ट्रॅकर](https://etherscan.io/nft-top-contracts) हस्तांतरण आकारमानानुसार इथेरियमवरील शीर्ष NFT ची यादी करते.
- [क्रिप्टोकिटीज्](https://www.cryptokitties.co/) हा एक गेम आहे जो प्रजनन करण्यायोग्य, संग्रहणीय वस्तू आणि अतिशय मोहक प्राण्यांभोवती केंद्रित आहे ज्यांना आपण क्रिप्टोकिटीज् म्हणतो.
- [Sorare](https://sorare.com/) हा एक जागतिक फँटसी फुटबॉल गेम आहे जिथे तुम्ही मर्यादित आवृत्तीच्या संग्रहणीय वस्तू गोळा करू शकता, तुमच्या संघांचे व्यवस्थापन करू शकता आणि बक्षिसे मिळवण्यासाठी स्पर्धा करू शकता.
- [इथेरियम नेम सर्व्हिस (ENS)](https://ens.domains/) साध्या, मानवांना वाचता येण्याजोग्या नावांचा वापर करून ब्लॉकचेनवर आणि त्याबाहेर दोन्ही संसाधनांना संबोधित करण्यासाठी एक सुरक्षित आणि विकेंद्रित मार्ग ऑफर करते.
- [POAP](https://poap.xyz) जे लोक इव्हेंटमध्ये उपस्थित राहतात किंवा विशिष्ट क्रिया पूर्ण करतात त्यांना मोफत NFTs वितरित करते. POAPs तयार करण्यासाठी आणि वितरित करण्यासाठी विनामूल्य आहेत.
- [Unstoppable Domains](https://unstoppabledomains.com/) ही सॅन फ्रान्सिस्को-आधारित कंपनी आहे जी ब्लॉकचेनवर डोमेन तयार करते. ब्लॉकचेन डोमेन क्रिप्टोकरन्सी पत्त्यांना मानवांना वाचता येण्याजोग्या नावांनी बदलतात आणि सेन्सॉरशिप-प्रतिरोधक वेबसाइट्स सक्षम करण्यासाठी वापरले जाऊ शकतात.
- [Gods Unchained Cards](https://godsunchained.com/) हा इथेरियम ब्लॉकचेनवरील एक TCG आहे जो इन-गेम मालमत्तांना वास्तविक मालकी मिळवून देण्यासाठी NFT चा वापर करतो.
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) हा 10,000 अद्वितीय NFTs चा संग्रह आहे, जो एक सिद्ध-दुर्मिळ कलाकृती असण्यासोबतच, क्लबचे सदस्यत्व टोकन म्हणून कार्य करतो, जे सदस्य भत्ते आणि फायदे प्रदान करते जे समुदायाच्या प्रयत्नांचा परिणाम म्हणून कालांतराने वाढतात.

## पुढील वाचन {#further-reading}

- [EIP-721: ERC-721 अविनिमयक्षम टोकन स्टँडर्ड](https://eips.ethereum.org/EIPS/eip-721)
- [ओपनझेपलिन - ERC-721 डॉक्स](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [ओपनझेपलिन - ERC-721 अंमलबजावणी](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)

## ट्यूटोरियल्स: इथेरियमवर अविनिमयक्षम टोकन्स (ERC-721) सह तयार करा {#tutorials}

- [Vyper ERC-721 कॉन्ट्रॅक्ट वॉकथ्रू](/developers/tutorials/erc-721-vyper-annotated-code/) _– Vyper मध्ये लिहिलेल्या संपूर्ण ERC-721 NFT कॉन्ट्रॅक्टचा भाष्य केलेला वॉकथ्रू._
- [NFT कसे लिहावे आणि प्रस्थापित करावे (भाग 1/3)](/developers/tutorials/how-to-write-and-deploy-an-nft/) _– तुमचे पहिले ERC-721 स्मार्ट कॉन्ट्रॅक्ट लिहिण्यासाठी आणि प्रस्थापित करण्यासाठी टप्प्याटप्प्याने मार्गदर्शक._
- [NFT कसे मिंट करावे (भाग 2/3)](/developers/tutorials/how-to-mint-an-nft/) _– तुमचे प्रस्थापित केलेले स्मार्ट कॉन्ट्रॅक्ट आणि Web3 वापरून ERC-721 NFT कसे मिंट करावे._
- [तुमच्या वॉलेटमध्ये तुमचे NFT कसे पहावे (भाग 3/3)](/developers/tutorials/how-to-view-nft-in-metamask/) _– प्रस्थापनेनंतर मेटामास्कमध्ये तुमचे मिंट केलेले NFT कसे प्रदर्शित करावे._
- [NFT मिंटर ट्यूटोरियल](/developers/tutorials/nft-minter/) _– React फ्रंटएंड, मेटामास्क आणि Alchemy सह फुल-स्टॅक NFT मिंटिंग विकेंद्रित ॲप्लिकेशन (dapp) तयार करा._