---
title: ERC-721 Caighdeán Comhartha Neamh-idirmhalartach
description:
lang: ga
---

## Réamhrá {#introduction}

**Cad is Comhartha Neamh-idirmhalartach ann?**

Baintear úsáid as Comhartha Neamh-idirmhalartach (NFT) chun rud nó duine éigin a aithint ar bhealach uathúil. Tá an cineál seo Comhartha foirfe le húsáid ar ardáin a thairgeann míreanna inbhailithe, eochracha rochtana, ticéid chrannchuir, suíocháin uimhrithe do cheolchoirmeacha agus cluichí spóirt, srl. Tá féidearthachtaí iontacha ag an gcineál speisialta Comhartha seo agus mar sin tá Caighdeán ceart, ERC-721, a tháinig chun é sin a réiteach, tuillte aige!

**Cad é ERC-721?**

Tugann an ERC-721 isteach caighdeán do NFT, i bhfocail eile, tá an cineál Comhartha seo uathúil agus is féidir luach difriúil a bheith aige ó Chomhartha eile ón gConradh Cliste céanna, b'fhéidir mar gheall ar a aois, a theirce nó fiú rud éigin eile cosúil lena amharc. Fan, amharc?

Sin é! Tá athróg `uint256` ag gach NFT ar a dtugtar `tokenId`, mar sin d'aon Chonradh ERC-721, ní mór an péire `contract address, uint256 tokenId` a bheith uathúil ar fud an domhain. Mar sin féin, is féidir "tiontaire" a bheith ag dapp a úsáideann an `tokenId` mar ionchur agus a aschuireann íomhá de rud éigin faiseanta, cosúil le zombaithe, airm, scileanna nó puisíní gleoite!

## Réamhriachtanais {#prerequisites}

- [Cuntais](/developers/docs/accounts/)
- [Conarthaí Cliste](/developers/docs/smart-contracts/)
- [Caighdeáin comharthaí](/developers/docs/standards/tokens/)

## Comhlacht {#body}

An ERC-721 (Iarratas Ethereum ar Thuairimí 721), molta ag William Entriken, Dieter Shirley, Jacob Evans, Tá Nastassia Sachs i mí Eanáir 2018, ina Chaighdeán Comhartha Neamh-idirmhalartacha a chuireann API le haghaidh comharthaí laistigh de Chonarthaí Cliste i bhfeidhm.

Soláthraíonn sé feidhmiúlachtaí cosúil le comharthaí a aistriú ó chuntas amháin go cuntas eile, chun an iarmhéid reatha chomharthaí a fháil ar chuntas, chun úinéir chomhartha sainiúil a aimsiú agus freisin soláthar iomlán an chomhartha atá ar fáil ar an líonra. Chomh maith leo seo tá roinnt feidhmiúlachtaí eile aige ar nós an méid de chomhartha is féidir le cuntas tríú pháirtí a bhogadh ó chuntas a fhaomhadh.

Má chuireann Conradh Cliste na modhanna agus na teagmhais seo a leanas i bhfeidhm is féidir Conradh Comhartha Neamh-idirmhalartach ERC-721 a thabhairt air agus, ar é a imscaradh, beidh sé freagrach as súil a choinneáil ar na comharthaí cruthaithe ar Ethereum.

Ó [EIP-721](https://eips.ethereum.org/EIPS/eip-721):

### Modhanna {#methods}

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

### Imeachtaí {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### Samplaí {#web3py-example}

Feicimis conas atá Caighdeán chomh tábhachtach chun go mbeadh sé simplí dúinn iniúchadh a dhéanamh ar aon Chonradh Chomhartha ERC-721 ar Ethereum. Níl uainn ach Comhéadan Dénártha Feidhmchláir Conartha (ABI) chun comhéadan a chruthú d’aon Chomhartha ERC-721. Mar atá le feiceáil thíos bainfimid úsáid as ABI simplithe, chun sampla frithchuimilte íseal a dhéanamh de.

#### Sampla Web3.py {#web3py-example}

Ar dtús, déan cinnte go bhfuil [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) leabharlann Python suiteáilte agat:

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # CryptoKitties Contract

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # CryptoKitties Sales Auction

# This is a simplified Contract Application Binary Interface (ABI) of an ERC-721 NFT Contract.
# It will expose only the methods: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
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

# Using the Transfer Event ABI to get info about transferred Kitties.
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# We need the event's signature to filter the logs
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# Notes:
#   - Increase the number of blocks up from 120 if no Transfer event is returned.
#   - If you didn't find any Transfer event you can also try to get a tokenId at:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       Click to expand the event's logs and copy its "tokenId" argument
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # Paste the "tokenId" here from the link above
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

Tá roinnt Imeachtaí suimiúla ag CryptoKitties Contract seachas na cinn Caighdeánacha.

Déanaimis seiceáil ar dhá cheann acu, `Toirchis` agus `Breith`.

```python
# Using the Pregnant and Birth Events ABI to get info about new Kitties.
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

# We need the event's signature to filter the logs
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# Here is a Pregnant Event:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# Here is a Birth Event:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## NFTanna Coitianta {#popular-nfts}

- Liostaíonn [ Etherscan NFT Tracker](https://etherscan.io/tokens-nft) an NFT is fearr ar Ethereum de réir méid aistrithe.
- Is cluiche é [CryptoKitties](https://www.cryptokitties.co/) atá dírithe ar neacha inphóraithe, inbhailithe aoibhne a dtugtar CryptoKitties orthu.
- Is cluiche peile fantaisíochta domhanda é [Sorare](https://sorare.com/) inar féidir leat eagráin teoranta nithe inbhailithe a bhailiú, do chuid foirne a bhainistiú agus dul san iomaíocht chun duaiseanna a thuilleamh.
- [Soláthraíonn Seirbhís Ainmneacha Ethereum (ENS)](https://ens.domains/) bealach díláraithe slán & chun aghaidh a thabhairt ar acmhainní ar an mblocshlabhra agus as, ag baint úsáide as ainmneacha simplí atá inléite ag an duine.
- Seachadann [POAP](https://poap.xyz) NFTanna saor in aisce do dhaoine a fhreastalaíonn ar imeachtaí nó a dhéanann gníomhartha sonracha. Is féidir POAPanna a chruthú agus a dháileadh.
- Is cuideachta atá lonnaithe i San Francisco é [Unstoppable Domains](https://unstoppabledomains.com/) a thógann fearainn ar blocshlabhra. Cuireann fearainn Bhlocshlabhra ainmneacha inléite daonna in ionad seoltaí criptea-airgeadra agus is féidir iad a úsáid chun a chumasú láithreáin ghréasáin atá díonach ar chinsireacht.
- Is TCG é [ Gods Unchained Cards](https://godsunchained.com/) ar bhlocshlabhra Ethereum a úsáideann NFTanna chun fíor-úinéireacht a thabhairt chuig sócmhainní in-chluiche.
- Is bailiúchán é [Bored Ape Yacht Club](https://boredapeyachtclub.com) bailiúchán de 10,000 NFT uathúla, a fheidhmíonn, chomh maith le bheith ina phíosa ealaíne annamh, mar chomhartha ballraíochta don chlub, ag soláthar buntáistí agus tairbhí do chomhaltaí a mhéadaíonn le himeacht ama mar thoradh ar iarrachtaí pobail.

## Tuilleadh léitheoireachta {#further-reading}

- [EIP-721: ERC-721 Caighdeán Comhartha Neamh-idirmhalartach](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - ERC-721 Doiciméid](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - ERC-721 Feidhmiú](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Ailceimic NFT API](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)
