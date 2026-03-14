---
title: "ERC-721 నాన్-ఫంగిబుల్ టోకెన్ ప్రమాణం"
description: "ఇతీరియముపై ప్రత్యేకమైన డిజిటల్ ఆస్తులను సూచించే నాన్-ఫంగిబుల్ టోకెన్ల (NFTల) ప్రమాణమైన ERC-721 గురించి తెలుసుకోండి."
lang: te
---

## పరిచయం {#introduction}

**నాన్-ఫంగిబుల్ టోకెన్ అంటే ఏమిటి?**

ఒక నాన్-ఫంగిబుల్ టోకెన్ (NFT) ఏదైనా లేదా ఎవరినైనా ప్రత్యేకమైన మార్గంలో గుర్తించడానికి ఉపయోగించబడుతుంది. సేకరించదగిన వస్తువులు, యాక్సెస్ కీలు, లాటరీ టిక్కెట్లు, కచేరీలు మరియు క్రీడా మ్యాచ్‌ల కోసం నంబర్ చేసిన సీట్లు మొదలైనవాటిని అందించే ప్లాట్‌ఫారమ్‌లపై ఉపయోగించడానికి ఈ రకమైన టోకెన్ సరైనది. ఈ ప్రత్యేక రకమైన టోకెన్‌కు అద్భుతమైన అవకాశాలు ఉన్నాయి కాబట్టి ఇది సరైన ప్రమాణానికి అర్హమైనది, ERC-721 దానిని పరిష్కరించడానికి వచ్చింది!

**ERC-721 అంటే ఏమిటి?**

ERC-721 NFT కోసం ఒక ప్రమాణాన్ని పరిచయం చేస్తుంది, మరో మాటలో చెప్పాలంటే, ఈ రకమైన టోకెన్ ప్రత్యేకమైనది మరియు అదే స్మార్ట్ కాంట్రాక్ట్ నుండి మరొక టోకెన్ కంటే దాని వయస్సు, అరుదుగా ఉండటం లేదా దాని దృశ్యం వంటి వాటి వలన భిన్నమైన విలువను కలిగి ఉండవచ్చు.
ఆగండి, దృశ్యమా?

అవును! అన్ని NFTలలో `tokenId` అని పిలువబడే `uint256` వేరియబుల్ ఉంటుంది, కాబట్టి ఏ ERC-721 కాంట్రాక్ట్ కోసమైనా, `కాంట్రాక్ట్ చిరునామా, uint256 tokenId` జత ప్రపంచవ్యాప్తంగా ప్రత్యేకంగా ఉండాలి. అది చెప్పాలంటే, ఒక డాప్‌కు "కన్వర్టర్" ఉండవచ్చు, అది `tokenId`ని ఇన్‌పుట్‌గా ఉపయోగించి, జాంబీలు, ఆయుధాలు, నైపుణ్యాలు లేదా అద్భుతమైన పిల్లుల వంటి అద్భుతమైన వాటి చిత్రాన్ని అవుట్‌పుట్ చేస్తుంది!

## అవసరాలు {#prerequisites}

- [ఖాతాలు](/developers/docs/accounts/)
- [స్మార్ట్ కాంట్రాక్టులు](/developers/docs/smart-contracts/)
- [టోకెన్ ప్రమాణాలు](/developers/docs/standards/tokens/)

## బాడీ {#body}

జనవరి 2018లో విలియం ఎంట్రికెన్, డీటర్ షిర్లీ, జాకబ్ ఎవాన్స్, నస్టాసియా సాచ్స్ ద్వారా ప్రతిపాదించబడిన ERC-721 (Ethereum రిక్వెస్ట్ ఫర్ కామెంట్స్ 721), స్మార్ట్ కాంట్రాక్ట్‌లలో టోకెన్‌ల కోసం APIని అమలు చేసే ఒక నాన్-ఫంగిబుల్ టోకెన్ ప్రమాణం.

ఇది ఒక ఖాతా నుండి మరొక ఖాతాకు టోకెన్‌లను బదిలీ చేయడం, ఒక ఖాతా యొక్క ప్రస్తుత టోకెన్ బ్యాలెన్స్‌ను పొందడం, ఒక నిర్దిష్ట టోకెన్ యజమానిని పొందడం మరియు నెట్‌వర్క్‌లో అందుబాటులో ఉన్న టోకెన్ యొక్క మొత్తం సరఫరాను పొందడం వంటి కార్యాచరణలను అందిస్తుంది.
వీటితో పాటు, ఒక ఖాతా నుండి కొంత మొత్తంలో టోకెన్‌ను మూడవ పార్టీ ఖాతా ద్వారా తరలించవచ్చని ఆమోదించడం వంటి ఇతర కార్యాచరణలు కూడా దీనికి ఉన్నాయి.

ఒక స్మార్ట్ కాంట్రాక్ట్ కింది పద్ధతులు మరియు ఈవెంట్‌లను అమలు చేస్తే దానిని ERC-721 నాన్-ఫంగిబుల్ టోకెన్ కాంట్రాక్ట్ అని పిలవవచ్చు మరియు, ఒకసారి అమలు చేయబడిన తర్వాత, ఇది ఇతీరియములో సృష్టించబడిన టోకెన్‌ల ట్రాక్‌ను ఉంచడానికి బాధ్యత వహిస్తుంది.

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

ఇతీరియములో ఏదైనా ERC-721 టోకెన్ కాంట్రాక్ట్‌ను పరిశీలించడానికి విషయాలను మన కోసం సులభతరం చేయడంలో ఒక ప్రమాణం ఎంత ముఖ్యమైనదో చూద్దాం.
ఏదైనా ERC-721 టోకెన్‌కు ఇంటర్‌ఫేస్‌ను సృష్టించడానికి మనకు కేవలం కాంట్రాక్ట్ అప్లికేషన్ బైనరీ ఇంటర్‌ఫేస్ (ABI) అవసరం. దిగువన మీరు చూడగలిగినట్లుగా
మేము దీనిని సులభమైన ఉదాహరణగా చేయడానికి ఒక సరళీకృత ABI ని ఉపయోగిస్తాము.

#### Web3.py ఉదాహరణ {#web3py-example}

మొదట, మీరు [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) పైథాన్ లైబ్రరీని ఇన్‌స్టాల్ చేసుకున్నారని నిర్ధారించుకోండి:

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # క్రిప్టోకిట్టీస్ కాంట్రాక్ట్

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # క్రిప్టోకిట్టీస్ సేల్స్ వేలం

# ఇది ఒక ERC-721 NFT కాంట్రాక్ట్ యొక్క సరళీకృత కాంట్రాక్ట్ అప్లికేషన్ బైనరీ ఇంటర్‌ఫేస్ (ABI).
# ఇది కేవలం పద్ధతులను మాత్రమే బహిర్గతం చేస్తుంది: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
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

# బదిలీ చేయబడిన కిట్టీల గురించి సమాచారం పొందడానికి ట్రాన్స్‌ఫర్ ఈవెంట్ ABIని ఉపయోగించడం.
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# లాగ్స్‌ను ఫిల్టర్ చేయడానికి మాకు ఈవెంట్ యొక్క సంతకం అవసరం
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# గమనికలు:
#   - ఏ ట్రాన్స్‌ఫర్ ఈవెంట్ తిరిగి రాకపోతే బ్లాక్‌ల సంఖ్యను 120 నుండి పెంచండి.
#   - మీకు ఏ ట్రాన్స్‌ఫర్ ఈవెంట్ కనుగొనబడకపోతే, మీరు ఇక్కడ కూడా ఒక tokenIdని పొందడానికి ప్రయత్నించవచ్చు:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       ఈవెంట్ యొక్క లాగ్‌లను విస్తరించడానికి క్లిక్ చేసి, దాని "tokenId" వాదనను కాపీ చేయండి
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # పైన ఉన్న లింక్ నుండి "tokenId"ని ఇక్కడ అతికించండి
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

క్రిప్టోకిట్టీస్ కాంట్రాక్ట్‌లో ప్రామాణికమైన వాటి కంటే కొన్ని ఆసక్తికరమైన ఈవెంట్‌లు ఉన్నాయి.

వాటిలో రెండింటిని చూద్దాం, `Pregnant` మరియు `Birth`.

```python
# కొత్త కిట్టీల గురించి సమాచారం పొందడానికి ప్రెగ్నెంట్ మరియు బర్త్ ఈవెంట్స్ ABIని ఉపయోగించడం.
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

# లాగ్స్‌ను ఫిల్టర్ చేయడానికి మాకు ఈవెంట్ యొక్క సంతకం అవసరం
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# ఇది ఒక ప్రెగ్నెంట్ ఈవెంట్:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# ఇది ఒక బర్త్ ఈవెంట్:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## ప్రజాదరణ పొందిన NFTలు {#popular-nfts}

- [Etherscan NFT ట్రాకర్](https://etherscan.io/nft-top-contracts) బదిలీల పరిమాణం ద్వారా ఇతీరియములో అగ్ర NFTలను జాబితా చేస్తుంది.
- [CryptoKitties](https://www.cryptokitties.co/) అనేది మనం క్రిప్టోకిట్టీస్ అని పిలిచే పెంపకానికి, సేకరించడానికి మరియు ఎంతో ఆరాధనీయమైన జీవుల చుట్టూ కేంద్రీకృతమైన ఒక గేమ్.
- [Sorare](https://sorare.com/) ఒక గ్లోబల్ ఫాంటసీ ఫుట్‌బాల్ గేమ్, ఇక్కడ మీరు పరిమిత ఎడిషన్ సేకరించదగిన వస్తువులను సేకరించవచ్చు, మీ జట్లను నిర్వహించవచ్చు మరియు బహుమతులు సంపాదించడానికి పోటీపడవచ్చు.
- [ఇతీరియము నేమ్ సర్వీస్ (ENS)](https://ens.domains/) బ్లాక్‌చైన్‌ పైన మరియు బయట వనరులను సరళమైన, మానవ-చదవగల పేర్లను ఉపయోగించి చిరునామా చేయడానికి సురక్షితమైన & వికేంద్రీకృత మార్గాన్ని అందిస్తుంది.
- [POAP](https://poap.xyz) ఈవెంట్‌లకు హాజరయ్యే లేదా నిర్దిష్ట చర్యలను పూర్తి చేసే వ్యక్తులకు ఉచిత NFTలను అందిస్తుంది. POAPలను సృష్టించడం మరియు పంపిణీ చేయడం ఉచితం.
- [Unstoppable Domains](https://unstoppabledomains.com/) అనేది శాన్ ఫ్రాన్సిస్కో ఆధారిత సంస్థ, ఇది బ్లాక్‌చైన్‌లపై డొమైన్‌లను నిర్మిస్తోంది. బ్లాక్‌చైన్ డొమైన్‌లు క్రిప్టోకరెన్సీ చిరునామాలను మానవ-చదవగల పేర్లతో భర్తీ చేస్తాయి మరియు సెన్సార్‌షిప్-నిరోధక వెబ్‌సైట్‌లను ప్రారంభించడానికి ఉపయోగించవచ్చు.
- [Gods Unchained Cards](https://godsunchained.com/) ఇతీరియము బ్లాక్‌చైన్‌పై ఒక TCG, ఇది గేమ్‌లోని ఆస్తులకు నిజమైన యాజమాన్యాన్ని తీసుకురావడానికి NFTలను ఉపయోగిస్తుంది.
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) అనేది 10,000 ప్రత్యేకమైన NFTల సమాహారం, ఇది నిరూపించదగిన-అరుదైన కళాఖండంగా ఉండటంతో పాటు, క్లబ్‌కు సభ్యత్వ టోకెన్‌గా పనిచేస్తుంది, కమ్యూనిటీ ప్రయత్నాల ఫలితంగా కాలక్రమేణా పెరిగే సభ్యుల ప్రోత్సాహకాలు మరియు ప్రయోజనాలను అందిస్తుంది.

## మరింత సమాచారం {#further-reading}

- [EIP-721: ERC-721 నాన్-ఫంగిబుల్ టోకెన్ ప్రమాణం](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - ERC-721 పత్రాలు](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - ERC-721 అమలు](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)
