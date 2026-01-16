---
title: ERC-721 अपूरणीय टोकन मानक
description: ERC-721 के बारे में जानें, जो अपूरणीय टोकन (एनएफ़टी) के लिए मानक है जो एथेरियम पर अद्वितीय डिजिटल संपत्ति का प्रतिनिधित्व करते हैं।
lang: hi
---

## परिचय {#introduction}

**अपूरणीय टोकन क्या है?**

एक अपूरणीय टोकन (एनएफटी) का उपयोग किसी चीज या किसी व्यक्ति को अनोखे तरीके से पहचानने के लिए किया जाता है। इस प्रकार का टोकन एकदम सही है
उन प्लेटफार्मों पर उपयोग किया जा सकता है जो संग्रहणीय वस्तुओं, एक्सेस की, लॉटरी टिकट, संगीत कार्यक्रमों के लिए गिने हुए सीटों की पेशकश करते हैं और खेल मैच, आदि। इस विशेष प्रकार के टोकन में अद्भुत संभावनाएं हैं, इसलिए यह एक उचित मानक, ERC-721 का हकदार है
इसे हल करने के लिए आया था!

**ERC-721 क्या है?**

ERC-721 NFT के लिए एक मानक पेश करता है, दूसरे शब्दों में, इस प्रकार का टोकन अद्वितीय है और इसका अलग-अलग मूल्य हो सकता है
उसी स्मार्ट कॉन्ट्रैक्ट से एक और टोकन की तुलना में, शायद इसकी उम्र, दुर्लभता या इसके दृश्य की तरह कुछ और भी।
रुको, दृश्य?

हां। सभी NFTs में `tokenId` नामक एक `uint256` वैरिएबल होता है, इसलिए किसी भी ERC-721 कॉन्ट्रैक्ट के लिए, `अनुबंध पता, uint256 tokenId` जोड़ी विश्व स्तर पर अद्वितीय होनी चाहिए। इसके अलावा, एक डैप में एक "कन्वर्टर" हो सकता है जो इनपुट के रूप में `tokenId` का उपयोग करता है और ज़ॉम्बी, हथियार, कौशल या अद्भुत बिल्लियों जैसी किसी शानदार चीज़ की छवि को आउटपुट करता है!

## पूर्वापेक्षाएं {#prerequisites}

- [Accounts](/developers/docs/accounts/)
- [स्मार्ट कॉन्ट्रैक्ट्स] (/डेवलपर्स/डॉक्स/स्मार्ट-कॉन्ट्रैक्ट्स/)
- [टोकन मानक] (/developers/docs/standards/tokens/)

## Body {#body}

ERC-721 (टिप्पणियों के लिए एथेरियम अनुरोध 721), विलियम एंट्रिकेन, डाइटर शर्ली, जैकब इवांस द्वारा प्रस्तावित,
जनवरी 2018 में नास्तासिया सैक्स, एक अपूरणीय टोकन मानक है जो स्मार्ट कॉन्ट्रैक्ट्स के भीतर टोकन के लिए एक एपीआई लागू करता है।

यह टोकन को एक खाते से दूसरे खाते में स्थानांतरित करने जैसी कार्यक्षमता प्रदान करता है, ताकि एक का वर्तमान टोकन बैलेंस प्राप्त किया जा सके
खाता, एक विशिष्ट टोकन के मालिक को प्राप्त करने के लिए और नेटवर्क पर उपलब्ध टोकन की कुल आपूर्ति भी।
इनके अलावा इसमें कुछ अन्य कार्यक्षमताएं भी हैं जैसे कि यह स्वीकार करना कि किसी खाते से टोकन की राशि हो सकती है
किसी तृतीय पक्ष खाते द्वारा ले जाया गया.

यदि कोई स्मार्ट कॉन्ट्रैक्ट निम्नलिखित विधियों और घटनाओं को लागू करता है, तो इसे ERC-721 नॉन-फंजिबल टोकन कॉन्ट्रैक्ट कहा जा सकता है
और, एक बार तैनात होने के बाद, एथेरियम पर बनाए गए टोकन का ट्रैक रखना जिम्मेदार होगा।

From [EIP-721](https://eips.ethereum.org/EIPS/eip-721):

### तरीके {#methods}

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

आइए देखें कि एथेरियम पर किसी भी ERC-721 टोकन अनुबंध का निरीक्षण करने के लिए हमारे लिए चीजों को सरल बनाने के लिए एक मानक कितना महत्वपूर्ण है।
हमें किसी भी ERC-721 टोकन के लिए एक इंटरफ़ेस बनाने के लिए कॉन्ट्रैक्ट एप्लिकेशन बाइनरी इंटरफ़ेस (ABI) की आवश्यकता है। जैसा आप कर सकते हैं
नीचे देखें कि हम इसे कम घर्षण उदाहरण बनाने के लिए एक सरलीकृत एबीआई का उपयोग करेंगे।

#### Web3.py उदाहरण {#web3py-example}

सबसे पहले, सुनिश्चित करें कि आपने [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python लाइब्रेरी इंस्टॉल कर ली है:

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # CryptoKitties कॉन्ट्रैक्ट

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # CryptoKitties सेल्स ऑक्शन

# यह एक ERC-721 NFT कॉन्ट्रैक्ट का एक सरलीकृत कॉन्ट्रैक्ट एप्लिकेशन बाइनरी इंटरफ़ेस (ABI) है।
# यह केवल इन तरीकों को उजागर करेगा: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
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

# हस्तांतरित किटियों के बारे में जानकारी प्राप्त करने के लिए ट्रांसफर इवेंट ABI का उपयोग करना।
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# लॉग को फ़िल्टर करने के लिए हमें इवेंट के हस्ताक्षर की आवश्यकता है
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# नोट्स:
#   - यदि कोई ट्रांसफर इवेंट वापस नहीं आता है तो ब्लॉक की संख्या 120 से बढ़ाएँ।
#   - यदि आपको कोई ट्रांसफर इवेंट नहीं मिला तो आप इस पर एक tokenId प्राप्त करने का भी प्रयास कर सकते हैं:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       इवेंट के लॉग का विस्तार करने के लिए क्लिक करें और इसके "tokenId" तर्क को कॉपी करें
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # ऊपर दिए गए लिंक से "tokenId" यहाँ पेस्ट करें
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

CryptoKitties अनुबंध में मानक लोगों के अलावा कुछ दिलचस्प घटनाएं हैं।

आइए उनमें से दो की जांच करें, `Pregnant` और `Birth`।

```python
# नई किटियों के बारे में जानकारी प्राप्त करने के लिए Pregnant और Birth इवेंट ABI का उपयोग करना।
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

# लॉग को फ़िल्टर करने के लिए हमें इवेंट के हस्ताक्षर की आवश्यकता है
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# यहाँ एक Pregnant इवेंट है:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# यहाँ एक Birth इवेंट है:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## लोकप्रिय एनएफ़टी {#popular-nfts}

- [Etherscan NFT Tracker](https://etherscan.io/nft-top-contracts) हस्तांतरण की मात्रा के आधार पर एथेरियम पर शीर्ष एनएफ़टी को सूचीबद्ध करता है।
- [CryptoKitties](https://www.cryptokitties.co/) एक ऐसा गेम है जो प्रजनन योग्य, संग्रहणीय और बहुत ही मनमोहक
  प्राणियों के इर्द-गिर्द केंद्रित है जिन्हें हम CryptoKitties कहते हैं।
- [Sorare](https://sorare.com/) एक वैश्विक फंतासी फुटबॉल गेम है जहाँ आप सीमित संस्करण संग्रहणीय वस्तुएं एकत्र कर सकते हैं,
  अपनी टीमों का प्रबंधन कर सकते हैं और पुरस्कार अर्जित करने के लिए प्रतिस्पर्धा कर सकते हैं।
- [एथेरियम नेम सर्विस (ENS)](https://ens.domains/) सरल, मानव-पठनीय नामों का उपयोग करके ब्लॉकचेन पर और उससे बाहर दोनों संसाधनों को संबोधित करने का एक सुरक्षित और विकेन्द्रीकृत तरीका प्रदान करता है।
- [POAP](https://poap.xyz) उन लोगों को मुफ्त एनएफ़टी देता है जो इवेंट में भाग लेते हैं या विशिष्ट कार्यों को पूरा करते हैं। पीओएपी बनाने और वितरित करने के लिए स्वतंत्र हैं।
- [Unstoppable Domains](https://unstoppabledomains.com/) एक सैन फ्रांसिस्को-आधारित कंपनी है जो
  ब्लॉकचेन पर डोमेन बना रही है। ब्लॉकचेन डोमेन क्रिप्टोकरेंसी पतों को मानव-पठनीय नामों से बदल देते हैं और इसका उपयोग
  सेंसरशिप-प्रतिरोधी वेबसाइटों को सक्षम करने के लिए किया जा सकता है।
- [Gods Unchained Cards](https://godsunchained.com/) एथेरियम ब्लॉकचेन पर एक TCG है जो इन-गेम संपत्तियों का वास्तविक स्वामित्व लाने के लिए NFTs का उपयोग करता है।
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) 10,000 अद्वितीय एनएफ़टी का एक संग्रह है, जो कला का एक सिद्ध-दुर्लभ टुकड़ा होने के साथ-साथ, क्लब के लिए एक सदस्यता टोकन के रूप में कार्य करता है, जो सामुदायिक प्रयासों के परिणामस्वरूप समय के साथ बढ़ने वाले सदस्य अनुलाभ और लाभ प्रदान करता है।

## आगे की रीडिंग {#further-reading}

- [EIP-721: ERC-721 अपूरणीय टोकन मानक](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - ERC-721 डॉक्स](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - ERC-721 कार्यान्वयन](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)
