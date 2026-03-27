---
title: "ERC-721 பூஞ்சையற்ற டோக்கன் (Non-Fungible Token) தரநிலை"
description: "Ethereum இல் தனித்துவமான டிஜிட்டல் சொத்துகளைக் குறிக்கும் பூஞ்சையற்ற டோக்கன்களுக்கான (NFTs) தரநிலையான ERC-721 பற்றி அறிக."
lang: ta
---

## அறிமுகம் {#introduction}

**பூஞ்சையற்ற டோக்கன் (Non-Fungible Token) என்றால் என்ன?**

ஒரு பூஞ்சையற்ற டோக்கன் (NFT) என்பது ஏதேனும் ஒன்றையோ அல்லது யாரையாவது தனித்துவமான முறையில் அடையாளம் காணப் பயன்படுகிறது. சேகரிக்கக்கூடிய பொருட்கள், அணுகல் திறவுகோல்கள் (access keys), லாட்டரி சீட்டுகள், கச்சேரிகள் மற்றும் விளையாட்டுப் போட்டிகளுக்கான எண்ணிடப்பட்ட இருக்கைகள் போன்றவற்றை வழங்கும் தளங்களில் பயன்படுத்த இந்த வகையான டோக்கன் சரியானது. இந்த சிறப்பு வகை டோக்கன் அற்புதமான சாத்தியக்கூறுகளைக் கொண்டுள்ளது, எனவே இதற்கு சரியான தரநிலை தேவை, அதைத் தீர்க்கவே ERC-721 வந்தது!

**ERC-721 என்றால் என்ன?**

ERC-721 ஆனது NFT க்கான ஒரு தரநிலையை அறிமுகப்படுத்துகிறது, வேறுவிதமாகக் கூறினால், இந்த வகையான டோக்கன் தனித்துவமானது மற்றும் அதே ஸ்மார்ட் ஒப்பந்தத்தில் (Smart Contract) உள்ள மற்றொரு டோக்கனை விட வேறுபட்ட மதிப்பைக் கொண்டிருக்கலாம், ஒருவேளை அதன் வயது, அரிதான தன்மை அல்லது அதன் காட்சி (visual) போன்ற வேறு ஏதேனும் காரணமாக இருக்கலாம். காத்திருங்கள், காட்சியா?

ஆம்! அனைத்து NFTகளும் `tokenId` எனப்படும் `uint256` மாறியைக் கொண்டுள்ளன, எனவே எந்தவொரு ERC-721 ஒப்பந்தத்திற்கும், `contract address, uint256 tokenId` என்ற இணை உலகளவில் தனித்துவமாக இருக்க வேண்டும். அதன்படி, ஒரு dapp ஆனது `tokenId` ஐ உள்ளீடாகப் பயன்படுத்தி, ஜோம்பிஸ், ஆயுதங்கள், திறன்கள் அல்லது அற்புதமான பூனைகள் போன்ற அருமையான ஒன்றின் படத்தை வெளியீடாக வழங்கும் "மாற்றியை (converter)" கொண்டிருக்கலாம்!

## முன்நிபந்தனைகள் {#prerequisites}

- [கணக்குகள்](/developers/docs/accounts/)
- [ஸ்மார்ட் ஒப்பந்தங்கள்](/developers/docs/smart-contracts/)
- [டோக்கன் தரநிலைகள்](/developers/docs/standards/tokens/)

## முக்கிய பகுதி {#body}

ஜனவரி 2018 இல் William Entriken, Dieter Shirley, Jacob Evans, Nastassia Sachs ஆகியோரால் முன்மொழியப்பட்ட ERC-721 ([Ethereum](/) Request for Comments 721), ஸ்மார்ட் ஒப்பந்தங்களுக்குள் டோக்கன்களுக்கான API ஐச் செயல்படுத்தும் ஒரு பூஞ்சையற்ற டோக்கன் தரநிலையாகும்.

இது ஒரு கணக்கிலிருந்து மற்றொரு கணக்கிற்கு டோக்கன்களை மாற்றுவது, ஒரு கணக்கின் தற்போதைய டோக்கன் இருப்பைப் பெறுவது, ஒரு குறிப்பிட்ட டோக்கனின் உரிமையாளரைப் பெறுவது மற்றும் நெட்வொர்க்கில் கிடைக்கும் டோக்கனின் மொத்த விநியோகத்தைப் பெறுவது போன்ற செயல்பாடுகளை வழங்குகிறது. இவை தவிர, ஒரு கணக்கிலிருந்து குறிப்பிட்ட அளவு டோக்கனை மூன்றாம் தரப்பு கணக்கு மூலம் நகர்த்த முடியும் என்பதை அங்கீகரிப்பது போன்ற வேறு சில செயல்பாடுகளையும் இது கொண்டுள்ளது.

ஒரு ஸ்மார்ட் ஒப்பந்தம் பின்வரும் முறைகள் மற்றும் நிகழ்வுகளைச் செயல்படுத்தினால், அதை ERC-721 பூஞ்சையற்ற டோக்கன் ஒப்பந்தம் என்று அழைக்கலாம், மேலும் அது பயன்படுத்தப்பட்டவுடன் (deployed), Ethereum இல் உருவாக்கப்பட்ட டோக்கன்களைக் கண்காணிக்கும் பொறுப்பை அது ஏற்கும்.

[EIP-721](https://eips.ethereum.org/EIPS/eip-721) இலிருந்து:

### முறைகள் {#methods}

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

### நிகழ்வுகள் {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### எடுத்துக்காட்டுகள் {#web3py-example}

Ethereum இல் உள்ள எந்தவொரு ERC-721 டோக்கன் ஒப்பந்தத்தையும் ஆய்வு செய்வதை எளிதாக்குவதற்கு ஒரு தரநிலை எவ்வளவு முக்கியமானது என்பதைப் பார்ப்போம். எந்தவொரு ERC-721 டோக்கனுக்கும் ஒரு இடைமுகத்தை (interface) உருவாக்க, ஒப்பந்த பயன்பாட்டு பைனரி இடைமுகம் (Contract Application Binary Interface - ABI) மட்டுமே நமக்குத் தேவை. கீழே நீங்கள் பார்ப்பது போல், குறைந்த உராய்வு (low friction) கொண்ட எடுத்துக்காட்டாக மாற்ற, எளிமைப்படுத்தப்பட்ட ABI ஐப் பயன்படுத்துவோம்.

#### Web3.py எடுத்துக்காட்டு {#web3py-example}

முதலில், நீங்கள் [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) பைதான் நூலகத்தை (Python library) நிறுவியுள்ளீர்கள் என்பதை உறுதிப்படுத்திக் கொள்ளுங்கள்:

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d" # கிரிப்டோகிட்டிஸ் ஒப்பந்தம்

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C" # கிரிப்டோகிட்டிஸ் விற்பனை ஏலம்

# இது ஒரு ERC-721 NFT ஒப்பந்தத்தின் எளிமையாக்கப்பட்ட Contract Application Binary Interface (ABI) ஆகும்.
# இது இந்த முறைகளை மட்டுமே வெளிப்படுத்தும்: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
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

# பரிமாற்றம் செய்யப்பட்ட கிட்டிகள் (Kitties) பற்றிய தகவல்களைப் பெற Transfer Event ABI பயன்படுத்தப்படுகிறது.
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# பதிவுகளை (logs) வடிகட்ட நிகழ்வின் கையொப்பம் (signature) எங்களுக்குத் தேவை
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# குறிப்புகள்:
# - எந்தவொரு Transfer நிகழ்வும் கிடைக்கவில்லை என்றால், பிளாக்குகளின் (blocks) எண்ணிக்கையை 120-லிருந்து அதிகரிக்கவும்.
# - நீங்கள் எந்த Transfer நிகழ்வையும் கண்டுபிடிக்கவில்லை என்றால், இதிலிருந்து ஒரு tokenId-ஐப் பெற முயற்சி செய்யலாம்:
# https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
# நிகழ்வின் பதிவுகளை (logs) விரிவுபடுத்த கிளிக் செய்து, அதன் "tokenId" வாதத்தை (argument) நகலெடுக்கவும்
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # மேலே உள்ள இணைப்பிலிருந்து "tokenId"-ஐ இங்கே ஒட்டவும்
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

CryptoKitties ஒப்பந்தத்தில் நிலையான நிகழ்வுகளைத் தவிர வேறு சில சுவாரஸ்யமான நிகழ்வுகளும் உள்ளன.

அவற்றில் இரண்டை சரிபார்ப்போம், `Pregnant` மற்றும் `Birth`.

```python
# புதிய கிட்டிகள் (Kitties) பற்றிய தகவல்களைப் பெற Pregnant மற்றும் Birth Events ABI பயன்படுத்தப்படுகிறது.
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

# பதிவுகளை (logs) வடிகட்ட நிகழ்வின் கையொப்பம் (signature) எங்களுக்குத் தேவை
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# இங்கே ஒரு Pregnant நிகழ்வு உள்ளது:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# இங்கே ஒரு Birth நிகழ்வு உள்ளது:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## பிரபலமான NFTகள் {#popular-nfts}

- [Etherscan NFT Tracker](https://etherscan.io/nft-top-contracts) பரிமாற்ற அளவின் அடிப்படையில் Ethereum இல் உள்ள சிறந்த NFTகளைப் பட்டியலிடுகிறது.
- [CryptoKitties](https://www.cryptokitties.co/) என்பது நாம் CryptoKitties என்று அழைக்கும் இனப்பெருக்கம் செய்யக்கூடிய, சேகரிக்கக்கூடிய மற்றும் மிகவும் அபிமான உயிரினங்களை மையமாகக் கொண்ட ஒரு விளையாட்டாகும்.
- [Sorare](https://sorare.com/) என்பது உலகளாவிய கற்பனை கால்பந்து (fantasy football) விளையாட்டாகும், இதில் நீங்கள் வரையறுக்கப்பட்ட பதிப்பு சேகரிப்புகளைச் சேகரிக்கலாம், உங்கள் அணிகளை நிர்வகிக்கலாம் மற்றும் பரிசுகளைப் பெறப் போட்டியிடலாம்.
- [The Ethereum Name Service (ENS)](https://ens.domains/) ஆனது எளிய, மனிதர்கள் படிக்கக்கூடிய பெயர்களைப் பயன்படுத்தி பிளாக்செயினிலும் அதற்கு வெளியேயும் வளங்களை முகவரியிடுவதற்கான பாதுகாப்பான மற்றும் பரவலாக்கப்பட்ட வழியை வழங்குகிறது.
- [POAP](https://poap.xyz) நிகழ்வுகளில் கலந்துகொள்ளும் அல்லது குறிப்பிட்ட செயல்களை முடிக்கும் நபர்களுக்கு இலவச NFTகளை வழங்குகிறது. POAPகளை உருவாக்கவும் விநியோகிக்கவும் இலவசம்.
- [Unstoppable Domains](https://unstoppabledomains.com/) என்பது சான் பிரான்சிஸ்கோவை தளமாகக் கொண்ட ஒரு நிறுவனமாகும், இது பிளாக்செயின்களில் டொமைன்களை உருவாக்குகிறது. பிளாக்செயின் டொமைன்கள் கிரிப்டோகரன்சி முகவரிகளை மனிதர்கள் படிக்கக்கூடிய பெயர்களுடன் மாற்றுகின்றன, மேலும் தணிக்கை-எதிர்ப்பு வலைத்தளங்களை இயக்கப் பயன்படுத்தலாம்.
- [Gods Unchained Cards](https://godsunchained.com/) என்பது Ethereum பிளாக்செயினில் உள்ள ஒரு TCG ஆகும், இது விளையாட்டு சொத்துக்களுக்கு உண்மையான உரிமையைக் கொண்டுவர NFTகளைப் பயன்படுத்துகிறது.
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) என்பது 10,000 தனித்துவமான NFTகளின் தொகுப்பாகும், இது நிரூபிக்கக்கூடிய-அரிதான கலைப் படைப்பாக இருப்பதுடன், கிளப்பிற்கான உறுப்பினர் டோக்கனாகவும் செயல்படுகிறது, சமூக முயற்சிகளின் விளைவாக காலப்போக்கில் அதிகரிக்கும் உறுப்பினர் சலுகைகள் மற்றும் நன்மைகளை வழங்குகிறது.

## மேலும் படிக்க {#further-reading}

- [EIP-721: ERC-721 பூஞ்சையற்ற டோக்கன் தரநிலை](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - ERC-721 ஆவணங்கள்](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - ERC-721 செயலாக்கம்](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)

## பயிற்சிகள்: Ethereum இல் பூஞ்சையற்ற டோக்கன்களுடன் (ERC-721) உருவாக்குதல் {#tutorials}

- [Vyper ERC-721 ஒப்பந்த ஒத்திகை](/developers/tutorials/erc-721-vyper-annotated-code/) _– Vyper இல் எழுதப்பட்ட முழு ERC-721 NFT ஒப்பந்தத்தின் சிறுகுறிப்பு ஒத்திகை._
- [ஒரு NFT ஐ எழுதுவது மற்றும் பயன்படுத்துவது எப்படி (பகுதி 1/3)](/developers/tutorials/how-to-write-and-deploy-an-nft/) _– உங்களின் முதல் ERC-721 ஸ்மார்ட் ஒப்பந்தத்தை எழுதுவதற்கும் பயன்படுத்துவதற்குமான படிப்படியான வழிகாட்டி._
- [ஒரு NFT ஐ மின்ட் செய்வது எப்படி (பகுதி 2/3)](/developers/tutorials/how-to-mint-an-nft/) _– நீங்கள் பயன்படுத்திய ஸ்மார்ட் ஒப்பந்தம் மற்றும் Web3 ஐப் பயன்படுத்தி ERC-721 NFT ஐ எவ்வாறு மின்ட் செய்வது._
- [உங்கள் வாலட்டில் உங்கள் NFT ஐ எவ்வாறு பார்ப்பது (பகுதி 3/3)](/developers/tutorials/how-to-view-nft-in-metamask/) _– பயன்படுத்திய பிறகு MetaMask இல் நீங்கள் மின்ட் செய்த NFT ஐ எவ்வாறு காண்பிப்பது._
- [NFT மின்டர் பயிற்சி](/developers/tutorials/nft-minter/) _– React முன்பக்கம், MetaMask மற்றும் Alchemy உடன் முழு-அடுக்கு NFT மின்டிங் dapp ஐ உருவாக்குங்கள்._