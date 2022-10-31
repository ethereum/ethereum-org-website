---
title: ERC-721 standard za nezamenljive žetone
description:
lang: sl
---

## Uvod {#introduction}

**Kaj je nezamenljiv žeton?**

Nezamenljiv žeton (NFT) se uporablja za identifikacijo nečesa oz. nekoga na edinstven način. Ta tip žetona je popoln za uporabo na platformah, ki ponujajo zbirateljske predmete, ključe za dostop, loterijske srečke, oštevilčene sedeže za koncerte in športne tekme itd. Ta posebni tip žetona ima izjemne možnosti, zato si zasluži lasten standard. ERC-721 je namenjen točno temu!

**Kaj je ERC-721?**

ERC-721 predstavlja standard za NFT-je. Z drugimi besedami: ta tip žetona je edinstven in ima lahko različno vrednost glede na drug žeton iz iste pametne pogodbe, morda zaradi svoje starosti, redkosti ali celo nečesa drugega, kot je njegov videz. Počakajte, videz?

Da! Vsi NFT-ji imajo spremenljivko `uint256`, ki se imenuje `tokenId`, tako da morata biti za katerokoli pogodbo ERC-721 `naslov pogodbe, uint256 tokenId` globalno edinstvena. Glede na to ima lahko dapp "pretvornik", ki uporablja `tokenId` kot vnos in tako izda sliko nečesa zanimivega, kot so zombiji, orožje, vrline ali izjemni mucki!

## Predpogoji {#prerequisites}

- [Računi](/developers/docs/accounts/)
- [Pametne pogodbe](/developers/docs/smart-contracts/)
- [Standardi za žetone](/developers/docs/standards/tokens/)

## Jedro {#body}

ERC-721 (Zahteva Ethereum za komentarje 721), ki so ga januarja 2018 predlagali William Entriken, Dieter Shirley, Jacob Evans in Nastassia Sachs, je standard za nezamenljive žetone, ki implementira API za žetone znotraj pametnih pogodb.

Zagotavlja funkcionalnosti, kot so prenos žetonov z enega računa na drugega, prejem trenutnega stanja žetonov določenega računa in tudi prejem skupne količine žetonov, ki je na voljo v omrežju. Poleg tega ima tudi nekaj drugih funkcionalnosti, kot je potrditev porabe določene količine žetonov z enega računa s strani računa tretje osebe.

Če pametna pogodba implementira naslednje metode in dogodke, se lahko imenuje pogodba nezamenljivega žetona ERC-721. Ko je enkrat uveljavljena, bo odgovorna za sledenje ustvarjenih žetonov na Ethereumu.

Od [EIP-721](https://eips.ethereum.org/EIPS/eip-721):

#### Metode {#methods}

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

#### Dogodki {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### Primeri {#web3py-example}

Oglejmo si, zakaj je standard tako pomemben za to, da poenostavi pregled katerekoli pogodbe žetona ERC-721 na Ethereumu. Za ustvarjanje vmesnika za katerikoli žeton ERC-721 potrebujemo le binarni vmesnik pogodbene aplikacije (ABI). Kot lahko vidite spodaj, bomo uporabili poenostavljen ABI, da bi ustvarili primer z nizkim trenjem.

#### Primer Web3.py {#web3py-example}

Najprej se prepričajte, da ste namestili knjižnico [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python:

```
$ pip install web3
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

ck_contract = w3.eth.contract(address=w3.toChecksumAddress(ck_token_addr), abi=simplified_abi+ck_extra_abi)
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
event_signature = w3.sha3(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.getLogs({
    "fromBlock": w3.eth.blockNumber - 120,
    "address": w3.toChecksumAddress(ck_token_addr),
    "topics": [event_signature]
})

# Notes:
#   - 120 blocks is the max range for CloudFlare Provider
#   - If you didn't find any Transfer event you can also try to get a tokenId at:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       Click to expand the event's logs and copy its "tokenId" argument

recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

kitty_id = recent_tx[0]['tokenId'] # Paste the "tokenId" here from the link above
is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

Pogodba CryptoKitties ima poleg standardnih tudi nekaj drugih zanimivih dogodkov.

Oglejmo si dva od njih: `Nosečnost` in `Rojstvo`.

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
    w3.sha3(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.sha3(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# Here is a Pregnant Event:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.getLogs({
    "fromBlock": w3.eth.blockNumber - 120,
    "address": w3.toChecksumAddress(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# Here is a Birth Event:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.getLogs({
    "fromBlock": w3.eth.blockNumber - 120,
    "address": w3.toChecksumAddress(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## Priljubljeni NFT-ji {#popular-nfts}

- [Sledilnik Etherscan NFT](https://etherscan.io/tokens-nft) navaja NFT-je na Ethereumu z najvišjo količino trgovanja.
- [CryptoKitties](https://www.cryptokitties.co/) je igra, osredotočena okoli vzreje, zbiranja in prisrčnih bitij, ki jih imenujemo CryptoKitties.
- [Sorare](https://sorare.com/) je globalna igra fantazijskega nogometa, kjer lahko zbirate omejene izdaje zbirateljskih predmetov, upravljate svoje ekipe in tekmujete za nagrade.
- [Storitev za Ethereum imena (ENS)](https://ens.domains/) ponuja varen in decentraliziran način za naslavljanje virov tako na kot tudi izven blokovne verige z uporabo preprostih, človeku berljivih imen.
- [Unstoppable Domains](https://unstoppabledomains.com/) je podjetje iz San Francisca, ki razvija imena na blokovnih verigah. Imena na blokovnih verigah nadomestijo naslove kriptovalut s človeško berljivimi imeni in so lahko uporabljena za omogočanje spletnih strani, odpornih na cenzuro.
- [Gods Unchained Cards](https://godsunchained.com/) je igra izmenjave kart na blokovni verigi Ethereum, ki za prenos dejanskega lastništva predmetov v igrah uporablja NFT-je.
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) je zbirka 10 000 edinstvenih NFT-jev, ki poleg tega, da so dokazljivo redki umetniški kosi, delujejo tudi kot članski žeton kluba, ki članom zagotavlja prednosti in ugodnosti, ki se kot rezultat prizadevanja skupnosti s časom povečujejo.

## Nadaljnje branje {#further-reading}

- [EIP-721: standard za nezamenljive žetone ERC-721](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin – dokumentacija ERC-721](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin – implementacija ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Alchemy NFT API](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)
