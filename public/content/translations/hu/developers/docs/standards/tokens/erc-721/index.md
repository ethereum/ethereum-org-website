---
title: ERC-721 Nem Felcserélhető Token Szabvány
description:
lang: hu
---

## Bevezetés {#introduction}

**Mi az a nem felcserélhető token?**

Egy nem felcserélhető tokent (NFT) valaki vagy valami egyedi beazonosítására lehet használni. Ezt a token típust tökéletesen lehet használni olyan platformokon, melyek gyűjthető tárgyakat, hozzáférési kulcsokat, lottó szelvényeket, sorszámozott koncert jegyeket vagy sportesemény jegyeket stb. árulnak. Ez a speciális token típus csodás lehetőségeket rejt magában, így megérdemel egy rendes szabványt, az ERC-721 szolgál megoldásul!

**Mi az az ERC-721?**

Az ERC-721 bevezeti az NFT szabványt, vagyis ez a token típus egyedi és különböző értékekkel rendelkezhet, mint egy másik token ugyanabból az okosszerződésből, ami esetleg a korából, ritkaságából vagy a kinézetéből származik. Egy pillanat, kinézet?

Igen! Minden NFT-nek van egy `uint256` változója `tokenId` néven, így minden ERC-721 szerződéshez tartozó `contract address-nek és a uint256 tokenId-nek` globálisan egyedinek kell lennie. Mondjuk egy dappnak lehet egy "konvertere", mely a `tokenId` változót használja bemenetre és kimenetként valami menő dolog képét adja vissza például zombikat, fegyvereket, képességeket vagy csodálatos kiscicákat!

## Előfeltételek {#prerequisites}

- [Számlák](/developers/docs/accounts/)
- [Okosszerződések](/developers/docs/smart-contracts/)
- [Token szabványok](/developers/docs/standards/tokens/)

## Törzs {#body}

Az ERC-721 (Ethereum Request for Comments 721), melyet William Entriken, Dieter Shirley, Jacob Evans és Nastassia Sachs javasolt 2018 januárjában, egy nem felcserélhető token szabványt vezet be, mely egy token API-t implementál az okosszerződéseken belül.

Olyan funkcionalitásokat tartalmaz, mint a token átutalás egyik számláról a másikra, a token jelenlegi egyenlege az adott számlán, az adott token jelenlegi tulajdonosa valamint a teljes elérhető tokenmennyiség a hálózaton. Emellett vannak más más funkciók is, mint például annak jóváhagyása, hogy egy harmadik fél számlája átmozgasson egy bizonyos mennyiségű tokent az adott számláról.

Ha egy okosszerződés implementálja a következő metódusokat és eseményeket, akkor egy ERC-721 nem felcserélhető token szerződésnek lehet nevezni, és a telepítés után a létrejött tokenek számontartásáért lesz felelős az Ethereumon.

Az [EIP-721-ből](https://eips.ethereum.org/EIPS/eip-721):

### Metódusok {#methods}

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

### Események {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### Példák {#web3py-example}

Nézzük meg, miért olyan fontos egy szabvány, hogy egyszerűbbé tegye számunkra azt, hogy bármely ERC-721 token szerződést megtekinthessük az Ethereumon. Csak a szerződés Application Binary Interface-ére (ABI) lesz szükség, hogy egy felületet készítsünk bármely ERC-721 tokennek. Ahogy lentebb látni fogod, egy egyszerűsített ABI-t használunk, hogy egy egyszerűbb példával éljünk.

#### Web3.py példa {#web3py-example}

Először győződj meg arról, hogy a [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python könyvtár telepítve van:

```
pip install web3
```

```python
from web3 import Web3
from web3.utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # CryptoKitties Szerződés

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # CryptoKitties Aukció

# Ez az ERC-721 NFT szerződésnek az egyszerűsített Contract Application Binary Interface-e (ABI).
# Csak a következő metódusokat tartalmazza: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
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

# Szükségünk van az esemény szignójára, hogy kiszűrjük a logokat
event_signature = w3.sha3(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.getLogs({
    "fromBlock": w3.eth.blockNumber - 120,
    "address": w3.toChecksumAddress(ck_token_addr),
    "topics": [event_signature]
})

# Megjegyzések:
#   - a Cloudflare szolgáltatónak 120 blokk a maximum hatótávja
#   - Ha nem találtál semmilyen Transfer eseményt, akkor a tokenId-t megkapthatod itt is:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       Kattints az esemény logok kiterjesztésére és másold ki a "tokenId" paraméterét

recent_tx = [get_event_data(tx_event_abi, log)["args"] for log in logs]

kitty_id = recent_tx[0]['tokenId'] # Paste the "tokenId" here from the link above
is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

A CryptoKitties szerződésnek van egy pár érdekes eseménye, ami nem standard.

Nézzünk meg kettőt közülük, `Pregnant` és `Birth`.

```python
# A Pregnant és a Birth esemény ABI-ok használata, hogy infókat kapjunk meg az új cicákról.
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

# Szükségünk van az esemény szignójára, hogy kiszűrjük a logokat
ck_event_signatures = [
    w3.sha3(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.sha3(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# Itt a Pregnant Event:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.getLogs({
    "fromBlock": w3.eth.blockNumber - 120,
    "address": w3.toChecksumAddress(ck_token_addr),
    "topics": [ck_extra_events_abi[0]]
})

recent_pregnants = [get_event_data(ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# Itt a Birth Event:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.getLogs({
    "fromBlock": w3.eth.blockNumber - 120,
    "address": w3.toChecksumAddress(ck_token_addr),
    "topics": [ck_extra_events_abi[1]]
})

recent_births = [get_event_data(ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## Népszerű NFT-k {#popular-nfts}

- [Etherscan NFT Tracker](https://etherscan.io/tokens-nft) legnagyobb forgalommal rendelkező NFT-k listája az Ethereumon.
- [CryptoKitties](https://www.cryptokitties.co/) egy játék, mely pároztatható, gyűjthető és imádnivaló lényekről szól, melyeket CryptoKittinek nevezünk.
- [Sorare](https://sorare.com/) egy globális fantáziafutball-játék, ahol korlátozott példányszámú gyűjtögetni valót gyűjthetsz, irányíthatod a csapataidat, és versenyezhetsz, hogy díjakat szerezz.
- [Az Ethereum Name Service (ENS)](https://ens.domains/) egy biztonságos & decentralizált módját kínálja az erőforrások kezelésére a blokkláncon vagy azon kívül egyszerű, emberek számára is olvasható nevek használatával.
- [Unstoppable Domains](https://unstoppabledomains.com/) egy San Francisco székhelyű vállalat, mely domain neveket fejleszt a blokkláncra. A blokklánc domainek a kriptovaluta-címeket ember által is olvasható nevekre cserélik, és használhatók cenzúra-ellenálló weboldalakhoz is.
- [Gods Unchained Cards](https://godsunchained.com/) egy TCG az Ethereum blokkláncon, mely NFT-ket használ, hogy valódi tulajdonjogot biztosítson a játékon belüli eszközökre.

## További olvasnivaló {#further-reading}

- [ERC-721: Nem Felcserélhető Token Szabvány](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - ERC-721 Dokumentáció](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - ERC-721 Implementáció](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)

## Kapcsolódó témák {#related-topics}

- [ERC-20](/developers/docs/standards/tokens/erc-20/)
- [ERC-777](/developers/docs/standards/tokens/erc-777/)
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/)
