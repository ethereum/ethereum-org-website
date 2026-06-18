---
title: ERC-721 నాన్-ఫంజిబుల్ టోకెన్ ప్రమాణం
description: ఎథీరియంపై ప్రత్యేకమైన డిజిటల్ ఆస్తులను సూచించే నాన్-ఫంజిబుల్ టోకెన్‌ల (NFTలు) ప్రమాణమైన ERC-721 గురించి తెలుసుకోండి.
lang: te
---

## పరిచయం {#introduction}

**నాన్-ఫంజిబుల్ టోకెన్ అంటే ఏమిటి?**

నాన్-ఫంజిబుల్ టోకెన్ (NFT) అనేది ఏదైనా లేదా ఎవరినైనా ప్రత్యేకమైన రీతిలో గుర్తించడానికి ఉపయోగించబడుతుంది. సేకరణ వస్తువులు, యాక్సెస్ కీలు, లాటరీ టిక్కెట్‌లు, కచేరీలు మరియు క్రీడా మ్యాచ్‌ల కోసం నంబర్ చేయబడిన సీట్లు మొదలైన వాటిని అందించే ప్లాట్‌ఫారమ్‌లలో ఉపయోగించడానికి ఈ రకమైన టోకెన్ సరైనది. ఈ ప్రత్యేక రకమైన టోకెన్‌కు అద్భుతమైన అవకాశాలు ఉన్నాయి కాబట్టి దీనికి సరైన ప్రమాణం అవసరం, దాన్ని పరిష్కరించడానికి ERC-721 వచ్చింది!

**ERC-721 అంటే ఏమిటి?**

ERC-721 అనేది NFT కోసం ఒక ప్రమాణాన్ని పరిచయం చేస్తుంది, మరో మాటలో చెప్పాలంటే, ఈ రకమైన టోకెన్ ప్రత్యేకమైనది మరియు అదే స్మార్ట్ కాంట్రాక్ట్ నుండి వచ్చిన మరొక టోకెన్ కంటే భిన్నమైన విలువను కలిగి ఉంటుంది, బహుశా దాని వయస్సు, అరుదైనది లేదా దాని దృశ్యరూపం వంటి వాటి వల్ల కావచ్చు. ఆగండి, దృశ్యరూపమా?

అవును! అన్ని NFTలు `tokenId` అనే `uint256` వేరియబుల్‌ను కలిగి ఉంటాయి, కాబట్టి ఏదైనా ERC-721 కాంట్రాక్ట్ కోసం, `contract address, uint256 tokenId` జత ప్రపంచవ్యాప్తంగా ప్రత్యేకంగా ఉండాలి. అంటే, ఒక వికేంద్రీకృత అప్లికేషన్ (dapp) `tokenId`ని ఇన్‌పుట్‌గా ఉపయోగించి జాంబీస్, ఆయుధాలు, నైపుణ్యాలు లేదా అద్భుతమైన పిల్లులు వంటి అద్భుతమైన వాటి చిత్రాన్ని అవుట్‌పుట్‌గా ఇచ్చే "కన్వర్టర్"ని కలిగి ఉండవచ్చు!

## ముందస్తు అవసరాలు {#prerequisites}

- [ఖాతాలు](/developers/docs/accounts/)
- [స్మార్ట్ కాంట్రాక్ట్‌లు](/developers/docs/smart-contracts/)
- [టోకెన్ ప్రమాణాలు](/developers/docs/standards/tokens/)

## ప్రధాన భాగం {#body}

జనవరి 2018లో విలియం ఎంట్రికెన్, డైటర్ షిర్లీ, జాకబ్ ఎవాన్స్, నస్తాసియా సాచ్స్ ప్రతిపాదించిన ERC-721 ([ఎథీరియం](/) రిక్వెస్ట్ ఫర్ కామెంట్స్ 721), స్మార్ట్ కాంట్రాక్ట్‌లలోని టోకెన్‌ల కోసం APIని అమలు చేసే నాన్-ఫంజిబుల్ టోకెన్ ప్రమాణం.

ఇది ఒక ఖాతా నుండి మరొక ఖాతాకు టోకెన్‌లను బదిలీ చేయడం, ఖాతా యొక్క ప్రస్తుత టోకెన్ బ్యాలెన్స్‌ను పొందడం, నిర్దిష్ట టోకెన్ యజమానిని పొందడం మరియు నెట్‌వర్క్‌లో అందుబాటులో ఉన్న టోకెన్ మొత్తం సరఫరాను పొందడం వంటి కార్యాచరణలను అందిస్తుంది. వీటితో పాటు, ఒక ఖాతా నుండి కొంత మొత్తంలో టోకెన్‌ను మూడవ పక్షం ఖాతా ద్వారా తరలించవచ్చని ఆమోదించడం వంటి కొన్ని ఇతర కార్యాచరణలను కూడా ఇది కలిగి ఉంది.

ఒక స్మార్ట్ కాంట్రాక్ట్ కింది పద్ధతులు మరియు ఈవెంట్‌లను అమలు చేస్తే దానిని ERC-721 నాన్-ఫంజిబుల్ టోకెన్ కాంట్రాక్ట్ అని పిలవవచ్చు మరియు ఒకసారి డిప్లాయ్ చేయబడిన తర్వాత, ఎథీరియంలో సృష్టించబడిన టోకెన్‌లను ట్రాక్ చేయడానికి ఇది బాధ్యత వహిస్తుంది.

[EIP-721](https://eips.ethereum.org/EIPS/eip-721) నుండి:

### పద్ధతులు {#methods}

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

### ఈవెంట్‌లు {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### ఉదాహరణలు {#web3py-example}

ఎథీరియంలో ఏదైనా ERC-721 టోకెన్ కాంట్రాక్ట్‌ను తనిఖీ చేయడం మనకు సులభతరం చేయడానికి ఒక ప్రమాణం ఎంత ముఖ్యమో చూద్దాం. ఏదైనా ERC-721 టోకెన్‌కు ఇంటర్‌ఫేస్‌ను సృష్టించడానికి మనకు కాంట్రాక్ట్ అప్లికేషన్ బైనరీ ఇంటర్‌ఫేస్ (ABI) మాత్రమే అవసరం. మీరు క్రింద చూడగలిగినట్లుగా, దీన్ని తక్కువ ఘర్షణ ఉదాహరణగా చేయడానికి మేము సరళీకృత ABIని ఉపయోగిస్తాము.

#### Web3.py ఉదాహరణ {#web3py-example-2}

ముందుగా, మీరు [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python లైబ్రరీని ఇన్‌స్టాల్ చేశారని నిర్ధారించుకోండి:

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # CryptoKitties కాంట్రాక్ట్

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # CryptoKitties విక్రయ వేలం

# ఇది ఒక ERC-721 NFT కాంట్రాక్ట్ యొక్క సరళీకృతమైన కాంట్రాక్ట్ అప్లికేషన్ బైనరీ ఇంటర్‌ఫేస్ (ABI).
# ఇది ఈ పద్ధతులను మాత్రమే బహిర్గతం చేస్తుంది: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
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

# బదిలీ చేయబడిన Kitties గురించి సమాచారాన్ని పొందడానికి బదిలీ ఈవెంట్ ABIని ఉపయోగించడం.
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# లాగ్‌లను ఫిల్టర్ చేయడానికి మనకు ఈవెంట్ యొక్క సంతకం అవసరం
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# గమనికలు:
#   - ఏ బదిలీ ఈవెంట్ తిరిగి రాకపోతే బ్లాక్‌ల సంఖ్యను 120 నుండి పెంచండి.
#   - మీకు ఏ బదిలీ ఈవెంట్ కనుగొనబడకపోతే, మీరు ఇక్కడ tokenIdని పొందడానికి కూడా ప్రయత్నించవచ్చు:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       ఈవెంట్ యొక్క లాగ్‌లను విస్తరించడానికి క్లిక్ చేయండి మరియు దాని "tokenId" ఆర్గ్యుమెంట్‌ను కాపీ చేయండి
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # పై లింక్ నుండి "tokenId"ని ఇక్కడ అతికించండి
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

CryptoKitties కాంట్రాక్ట్ ప్రామాణికమైన వాటి కంటే కొన్ని ఆసక్తికరమైన ఈవెంట్‌లను కలిగి ఉంది.

వాటిలో రెండింటిని తనిఖీ చేద్దాం, `Pregnant` మరియు `Birth`.

```python
# కొత్త Kitties గురించి సమాచారాన్ని పొందడానికి Pregnant మరియు Birth ఈవెంట్‌ల ABIని ఉపయోగించడం.
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

# లాగ్‌లను ఫిల్టర్ చేయడానికి మనకు ఈవెంట్ యొక్క సంతకం అవసరం
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# ఇక్కడ ఒక Pregnant ఈవెంట్ ఉంది:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# ఇక్కడ ఒక Birth ఈవెంట్ ఉంది:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## ప్రసిద్ధ NFTలు {#popular-nfts}

- [Etherscan NFT ట్రాకర్](https://etherscan.io/nft-top-contracts) బదిలీల పరిమాణం ఆధారంగా ఎథీరియంలోని అగ్ర NFTలను జాబితా చేస్తుంది.
- [CryptoKitties](https://www.cryptokitties.co/) అనేది మనం CryptoKitties అని పిలిచే పెంపకం చేయగల, సేకరించదగిన మరియు ఎంతో పూజ్యమైన జీవుల చుట్టూ కేంద్రీకృతమైన గేమ్.
- [Sorare](https://sorare.com/) అనేది గ్లోబల్ ఫాంటసీ ఫుట్‌బాల్ గేమ్, ఇక్కడ మీరు పరిమిత ఎడిషన్‌ల సేకరణ వస్తువులను సేకరించవచ్చు, మీ జట్లను నిర్వహించవచ్చు మరియు బహుమతులు సంపాదించడానికి పోటీపడవచ్చు.
- [ఎథీరియం నేమ్ సర్వీస్ (ENS)](https://ens.domains/) సరళమైన, మానవులు చదవగలిగే పేర్లను ఉపయోగించి బ్లాక్‌చైన్‌లో మరియు వెలుపల వనరులను పరిష్కరించడానికి సురక్షితమైన & వికేంద్రీకృత మార్గాన్ని అందిస్తుంది.
- [POAP](https://poap.xyz) ఈవెంట్‌లకు హాజరయ్యే లేదా నిర్దిష్ట చర్యలను పూర్తి చేసే వ్యక్తులకు ఉచిత NFTలను అందిస్తుంది. POAPలను సృష్టించడం మరియు పంపిణీ చేయడం ఉచితం.
- [Unstoppable Domains](https://unstoppabledomains.com/) అనేది శాన్ ఫ్రాన్సిస్కో ఆధారిత సంస్థ, ఇది బ్లాక్‌చైన్‌లలో డొమైన్‌లను నిర్మిస్తోంది. బ్లాక్‌చైన్ డొమైన్‌లు క్రిప్టోకరెన్సీ చిరునామాలను మానవులు చదవగలిగే పేర్లతో భర్తీ చేస్తాయి మరియు సెన్సార్‌షిప్-నిరోధక వెబ్‌సైట్‌లను ప్రారంభించడానికి ఉపయోగించబడతాయి.
- [Gods Unchained Cards](https://godsunchained.com/) అనేది ఎథీరియం బ్లాక్‌చైన్‌లోని TCG, ఇది గేమ్‌లోని ఆస్తులకు నిజమైన యాజమాన్యాన్ని తీసుకురావడానికి NFTలను ఉపయోగిస్తుంది.
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) అనేది 10,000 ప్రత్యేకమైన NFTల సేకరణ, ఇది నిరూపించదగిన అరుదైన కళాఖండంగా ఉండటమే కాకుండా, క్లబ్‌కు సభ్యత్వ టోకెన్‌గా పనిచేస్తుంది, కమ్యూనిటీ ప్రయత్నాల ఫలితంగా కాలక్రమేణా పెరిగే సభ్యుల ప్రోత్సాహకాలు మరియు ప్రయోజనాలను అందిస్తుంది.

## మరింత చదవడానికి {#further-reading}

- [EIP-721: ERC-721 నాన్-ఫంజిబుల్ టోకెన్ ప్రమాణం](https://eips.ethereum.org/EIPS/eip-721)
- [ఓపెన్‌జెప్పెలిన్ - ERC-721 డాక్స్](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [ఓపెన్‌జెప్పెలిన్ - ERC-721 అమలు](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)

## ట్యుటోరియల్స్: ఎథీరియంలో నాన్-ఫంజిబుల్ టోకెన్‌లతో (ERC-721) నిర్మించండి {#tutorials}

- [Vyper ERC-721 కాంట్రాక్ట్ వాక్‌త్రూ](/developers/tutorials/erc-721-vyper-annotated-code/) _– Vyperలో వ్రాయబడిన పూర్తి ERC-721 NFT కాంట్రాక్ట్ యొక్క ఉల్లేఖన వాక్‌త్రూ._
- [NFTని ఎలా వ్రాయాలి & డిప్లాయ్ చేయాలి (పార్ట్ 1/3)](/developers/tutorials/how-to-write-and-deploy-an-nft/) _– మీ మొదటి ERC-721 స్మార్ట్ కాంట్రాక్ట్‌ను వ్రాయడానికి మరియు డిప్లాయ్ చేయడానికి దశల వారీ మార్గదర్శి._
- [NFTని ఎలా ముద్రించాలి (పార్ట్ 2/3)](/developers/tutorials/how-to-mint-an-nft/) _– మీరు డిప్లాయ్ చేసిన స్మార్ట్ కాంట్రాక్ట్ మరియు Web3ని ఉపయోగించి ERC-721 NFTని ఎలా ముద్రించాలి._
- [మీ వాలెట్‌లో మీ NFTని ఎలా చూడాలి (పార్ట్ 3/3)](/developers/tutorials/how-to-view-nft-in-metamask/) _– డిప్లాయ్‌మెంట్ తర్వాత మెటామాస్క్‌లో మీరు ముద్రించిన NFTని ఎలా ప్రదర్శించాలి._
- [NFT మింటర్ ట్యుటోరియల్](/developers/tutorials/nft-minter/) _– React ఫ్రంటెండ్, మెటామాస్క్ మరియు Alchemyతో ఫుల్-స్టాక్ NFT ముద్రించే వికేంద్రీకృత అప్లికేషన్ (dapp)ని నిర్మించండి._