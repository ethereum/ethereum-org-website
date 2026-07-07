---
title: "ERC-721 गैर-विनिमेय टोकन मानक"
description: "ERC-721 के बारे में जानें, जो गैर-विनिमेय टोकन (NFTs) के लिए मानक है और इथेरियम पर अद्वितीय डिजिटल संपत्तियों का प्रतिनिधित्व करता है।"
lang: hi
---

## परिचय {#introduction}

**गैर-विनिमेय टोकन (Non-Fungible Token) क्या है?**

एक गैर-विनिमेय टोकन (NFT) का उपयोग किसी चीज़ या व्यक्ति को विशिष्ट तरीके से पहचानने के लिए किया जाता है। इस प्रकार का टोकन उन प्लेटफ़ॉर्म पर उपयोग करने के लिए एकदम सही है जो संग्रहणीय वस्तुएँ, एक्सेस कुंजियाँ, लॉटरी टिकट, संगीत कार्यक्रमों और खेल मैचों के लिए क्रमांकित सीटें आदि प्रदान करते हैं। इस विशेष प्रकार के टोकन में अद्भुत संभावनाएँ हैं, इसलिए यह एक उचित मानक का हकदार है, और ERC-721 ने इसे हल करने का काम किया है!

**ERC-721 क्या है?**

ERC-721 NFT के लिए एक मानक पेश करता है, दूसरे शब्दों में, इस प्रकार का टोकन अद्वितीय होता है और एक ही स्मार्ट अनुबंध के किसी अन्य टोकन की तुलना में इसका मूल्य अलग हो सकता है, शायद इसकी उम्र, दुर्लभता या यहाँ तक कि इसके दृश्य (विज़ुअल) जैसी किसी अन्य चीज़ के कारण। रुकिए, दृश्य?

हाँ! सभी NFTs में एक `uint256` चर (वेरिएबल) होता है जिसे `tokenId` कहा जाता है, इसलिए किसी भी ERC-721 अनुबंध के लिए, `contract address, uint256 tokenId` की जोड़ी विश्व स्तर पर अद्वितीय होनी चाहिए। इसके साथ ही, एक विकेंद्रीकृत एप्लिकेशन (dapp) में एक "कनवर्टर" हो सकता है जो `tokenId` का उपयोग इनपुट के रूप में करता है और ज़ॉम्बी, हथियार, कौशल या अद्भुत किटीज़ जैसी किसी शानदार चीज़ की छवि आउटपुट करता है!

## पूर्वापेक्षाएँ {#prerequisites}

- [खाते](/developers/docs/accounts/)
- [स्मार्ट अनुबंध](/developers/docs/smart-contracts/)
- [टोकन मानक](/developers/docs/standards/tokens/)

## मुख्य भाग {#body}

ERC-721 ([इथेरियम](/) रिक्वेस्ट फॉर कमेंट्स 721), जिसे जनवरी 2018 में विलियम एंट्रिकेन, डाइटर शर्ली, जैकब इवांस, नास्तासिया सैक्स द्वारा प्रस्तावित किया गया था, एक गैर-विनिमेय टोकन मानक है जो स्मार्ट अनुबंधों के भीतर टोकन के लिए एक API लागू करता है।

यह एक खाते से दूसरे खाते में टोकन ट्रांसफर करने, किसी खाते का वर्तमान टोकन बैलेंस प्राप्त करने, किसी विशिष्ट टोकन के मालिक का पता लगाने और नेटवर्क पर उपलब्ध टोकन की कुल आपूर्ति प्राप्त करने जैसी कार्यक्षमताएँ प्रदान करता है। इनके अलावा इसमें कुछ अन्य कार्यक्षमताएँ भी हैं जैसे यह स्वीकृति देना कि किसी खाते से टोकन की एक निश्चित मात्रा को किसी तीसरे पक्ष के खाते द्वारा स्थानांतरित किया जा सकता है।

यदि कोई स्मार्ट अनुबंध निम्नलिखित विधियों (methods) और घटनाओं (events) को लागू करता है, तो इसे ERC-721 गैर-विनिमेय टोकन अनुबंध कहा जा सकता है और, एक बार तैनात करने के बाद, यह इथेरियम पर बनाए गए टोकन का ट्रैक रखने के लिए ज़िम्मेदार होगा।

[EIP-721](https://eips.ethereum.org/EIPS/eip-721) से:

### विधियाँ (Methods) {#methods}

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

### घटनाएँ {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### उदाहरण {#web3py-example}

आइए देखें कि इथेरियम पर किसी भी ERC-721 टोकन अनुबंध का निरीक्षण करने के लिए चीजों को सरल बनाने के लिए एक मानक कितना महत्वपूर्ण है। हमें किसी भी ERC-721 टोकन के लिए एक इंटरफ़ेस बनाने के लिए केवल अनुबंध एप्लिकेशन बाइनरी इंटरफ़ेस (ABI) की आवश्यकता होती है। जैसा कि आप नीचे देख सकते हैं, हम इसे एक सरल उदाहरण बनाने के लिए एक सरलीकृत ABI का उपयोग करेंगे।

#### Web3.py उदाहरण {#web3py-example-2}

सबसे पहले, सुनिश्चित करें कि आपने [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python लाइब्रेरी स्थापित कर ली है:

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # क्रिप्टोकिटीज़ अनुबंध

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # क्रिप्टोकिटीज़ बिक्री नीलामी

# यह एक ERC-721 NFT अनुबंध का सरलीकृत अनुबंध एप्लिकेशन बाइनरी इंटरफ़ेस (ABI) है।
# यह केवल इन विधियों को प्रदर्शित करेगा: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
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

# ट्रांसफर की गई किटीज़ के बारे में जानकारी प्राप्त करने के लिए ट्रांसफर घटना ABI का उपयोग करना।
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# लॉग को फ़िल्टर करने के लिए हमें घटना के हस्ताक्षर की आवश्यकता है
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# नोट:
#   - यदि कोई ट्रांसफर घटना वापस नहीं आती है, तो ब्लॉकों की संख्या 120 से बढ़ाएं।
#   - यदि आपको कोई ट्रांसफर घटना नहीं मिली, तो आप यहाँ से भी tokenId प्राप्त करने का प्रयास कर सकते हैं:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       घटना के लॉग का विस्तार करने के लिए क्लिक करें और इसके "tokenId" तर्क को कॉपी करें
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # ऊपर दिए गए लिंक से "tokenId" को यहाँ पेस्ट करें
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

क्रिप्टोकिटीज़ अनुबंध में मानक घटनाओं के अलावा कुछ दिलचस्प घटनाएँ भी हैं।

आइए उनमें से दो की जाँच करें, `Pregnant` और `Birth`।

```python
# नई किटीज़ के बारे में जानकारी प्राप्त करने के लिए Pregnant और Birth घटनाएँ ABI का उपयोग करना।
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

# लॉग को फ़िल्टर करने के लिए हमें घटना के हस्ताक्षर की आवश्यकता है
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# यहाँ एक Pregnant घटना है:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# यहाँ एक Birth घटना है:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## लोकप्रिय NFTs {#popular-nfts}

- [Etherscan NFT ट्रैकर](https://etherscan.io/nft-top-contracts) ट्रांसफर वॉल्यूम के आधार पर इथेरियम पर शीर्ष NFT को सूचीबद्ध करता है।
- [क्रिप्टोकिटीज़](https://www.cryptokitties.co/) एक ऐसा गेम है जो प्रजनन योग्य, संग्रहणीय वस्तु और बेहद मनमोहक जीवों के इर्द-गिर्द केंद्रित है जिन्हें हम क्रिप्टोकिटीज़ कहते हैं।
- [Sorare](https://sorare.com/) एक वैश्विक फैंटेसी फुटबॉल गेम है जहाँ आप सीमित संस्करण वाली संग्रहणीय वस्तुएँ एकत्र कर सकते हैं, अपनी टीमों का प्रबंधन कर सकते हैं और पुरस्कार जीतने के लिए प्रतिस्पर्धा कर सकते हैं।
- [इथेरियम नेम सर्विस (ENS)](https://ens.domains/) सरल, मानव-पठनीय नामों का उपयोग करके ब्लॉकचेन पर और उसके बाहर दोनों जगह संसाधनों को संबोधित करने का एक सुरक्षित और विकेंद्रीकृत तरीका प्रदान करता है।
- [POAP](https://poap.xyz) उन लोगों को मुफ्त NFTs प्रदान करता है जो घटनाओं में भाग लेते हैं या विशिष्ट कार्य पूरे करते हैं। POAP बनाने और वितरित करने के लिए स्वतंत्र हैं।
- [Unstoppable Domains](https://unstoppabledomains.com/) सैन फ्रांसिस्को स्थित एक कंपनी है जो ब्लॉकचेन पर डोमेन बनाती है। ब्लॉकचेन डोमेन क्रिप्टोकरेंसी पतों को मानव-पठनीय नामों से बदल देते हैं और इनका उपयोग सेंसरशिप-प्रतिरोधी वेबसाइटों को सक्षम करने के लिए किया जा सकता है।
- [Gods Unchained Cards](https://godsunchained.com/) इथेरियम ब्लॉकचेन पर एक TCG है जो इन-गेम संपत्तियों में वास्तविक स्वामित्व लाने के लिए NFT का उपयोग करता है।
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) 10,000 अद्वितीय NFTs का एक संग्रह है, जो कला का एक प्रमाणित रूप से दुर्लभ नमूना होने के साथ-साथ क्लब के लिए सदस्यता टोकन के रूप में कार्य करता है, जो सदस्यों को ऐसे भत्ते और लाभ प्रदान करता है जो सामुदायिक प्रयासों के परिणामस्वरूप समय के साथ बढ़ते हैं।

## आगे की पढ़ाई {#further-reading}

- [EIP-721: ERC-721 गैर-विनिमेय टोकन मानक](https://eips.ethereum.org/EIPS/eip-721)
- [ओपनजेपेलिन - ERC-721 दस्तावेज़](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [ओपनजेपेलिन - ERC-721 कार्यान्वयन](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)

## ट्यूटोरियल: इथेरियम पर गैर-विनिमेय टोकन (ERC-721) के साथ निर्माण करें {#tutorials}

- [Vyper ERC-721 अनुबंध वॉकथ्रू](/developers/tutorials/erc-721-vyper-annotated-code/) _– Vyper में लिखे गए एक पूर्ण ERC-721 NFT अनुबंध का एनोटेट वॉकथ्रू।_
- [NFT कैसे लिखें और तैनात करें (भाग 1/3)](/developers/tutorials/how-to-write-and-deploy-an-nft/) _– अपना पहला ERC-721 स्मार्ट अनुबंध लिखने और तैनात करने के लिए चरण-दर-चरण मार्गदर्शिका।_
- [NFT कैसे मिंट करें (भाग 2/3)](/developers/tutorials/how-to-mint-an-nft/) _– अपने तैनात स्मार्ट अनुबंध और Web3 का उपयोग करके ERC-721 NFT को मिंट करने का तरीका।_
- [अपने वॉलेट में अपना NFT कैसे देखें (भाग 3/3)](/developers/tutorials/how-to-view-nft-in-metamask/) _– तैनाती के बाद मेटामास्क में अपने मिंट किए गए NFT को प्रदर्शित करने का तरीका।_
- [NFT मिंटर ट्यूटोरियल](/developers/tutorials/nft-minter/) _– React फ्रंटएंड, मेटामास्क और Alchemy के साथ एक फुल-स्टैक NFT मिंटिंग विकेंद्रीकृत एप्लिकेशन (dapp) बनाएँ।_