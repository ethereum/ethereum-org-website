---
title: ERC-721 Nem helyettesíthető tokenekről szóló szabvány
description:
lang: hu
---

## Bevezetés {#introduction}

**Mi az a nem helyettesíthető token?**

Egy nem helyettesíthető tokent (NFT) valami vagy valaki egyedi beazonosítására lehet használni. Ezt a tokentípust tökéletesen lehet használni olyan platformokon, melyek gyűjthető tárgyakat, hozzáférési kulcsokat, lottószelvényeket, sorszámozott koncertjegyeket vagy sporteseményjegyeket stb. árulnak. Ez a speciális tokentípus csodás lehetőségeket rejt magában, így megérdemel egy megfelelő szabványt, így az ERC-721 szolgál megoldásul!

**Mi az az ERC-721?**

Az ERC-721 bevezeti az NFT-szabványt, vagyis ez a tokentípus egyedi és különböző értékekkel rendelkezhet, mint egy másik token ugyanabból az okosszerződésből, ami esetleg a korából, ritkaságából vagy a kinézetéből származik. Egy pillanat, kinézet?

Igen! Minden NFT-nek van egy `uint256` változója `tokenId` néven, így minden ERC-721 szerződéshez tartozó `contract address, uint256 tokenId` globálisan egyedi. Tehát egy dappnak lehet egy „konvertere”, amely a `tokenId` változót használja bemenetre, kimenetként pedig valami menő dolog képét adja vissza, például zombikat, fegyvereket, képességeket vagy csodás kiscicákat!

## Előfeltételek {#prerequisites}

- [Számlák](/developers/docs/accounts/)
- [Okosszerződések](/developers/docs/smart-contracts/)
- [Token szabványok](/developers/docs/standards/tokens/)

## Törzs {#body}

Az ERC-721 (Ethereum Request for Comments 721), melyet William Entriken, Dieter Shirley, Jacob Evans és Nastassia Sachs javasolt 2018. januárjában, egy nem helyettesíthető tokenre vonatkozó szabványt vezet be, mely egy token API-t implementál az okosszerződéseken belül.

Olyan funkcionalitásokat tartalmaz, mint a tokenátutalás egyik számláról a másikra, a token jelenlegi egyenlegének lekérdezése az adott számlán, az adott token jelenlegi tulajdonosa, valamint a teljes elérhető tokenmennyiség a hálózaton. Emellett vannak más funkciók is, mint például annak jóváhagyása, hogy egy harmadik fél számlája átmozgasson egy bizonyos mennyiségű tokent az adott számláról.

Ha egy okosszerződés implementálja a következő metódusokat és eseményeket, akkor egy ERC-721 nem helyettesíthető tokenszerződésnek lehet nevezni, és a telepítés után a létrejött tokenek számontartásáért lesz felelős az Ethereumon.

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

Nézzük meg, miért olyan fontos egy szabvány, hogy egyszerűbbé tegye számunkra azt, hogy bármely ERC-721 tokenszerződést megtekinthessük az Ethereumon. Csak a szerződés Alkalmazás bináris interfészére (ABI) lesz szükség, hogy egy felületet készítsünk bármely ERC-721 tokennek. Ahogy lentebb látni fogod, egy egyszerűsített ABI-t használunk, hogy egy egyszerűbb példával éljünk.

#### Web3.py példa {#web3py-example}

Először győződj meg arról, hogy a [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python könyvtár telepítve van:

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

A CryptoKitties szerződésnek van egy pár érdekes eseménye, ami nem sztenderd.

Nézzünk meg kettőt közülük: `Pregnant` és `Birth`.

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

## Népszerű NFT-k {#popular-nfts}

- [Etherscan NFT Tracker](https://etherscan.io/tokens-nft) legnagyobb forgalommal rendelkező NFT-k listája az Ethereumon.
- [CryptoKitties](https://www.cryptokitties.co/) egy játék, mely tenyészthető, gyűjthető és imádnivaló lényekről szól, melyeket CryptoKittiknek nevezünk.
- [Sorare](https://sorare.com/) egy globális fantáziafutball-játék, ahol korlátozott példányszámú gyűjthető dolgot lehet összeszedni, Ön irányíthatja a csapatait, és versenyezhet díjakért.
- [Az Ethereum Name Service (ENS)](https://ens.domains/) egy biztonságos & decentralizált módját kínálja az erőforrások kezelésére a blokkláncon vagy azon kívül egyszerű, emberek számára is olvasható nevek használatával.
- A [POAP](https://poap.xyz) ingyenes NFT-ket biztosít azoknak, akik részt vesznek eseményeken vagy meghatározott akciókat hajtanak végre. A POAP-ok létrehozása és terjesztése ingyenes.
- Az [Unstoppable Domains](https://unstoppabledomains.com/) egy San Francisco székhelyű vállalat, amely domainneveket fejleszt a blokkláncra. A blokklánc-domainek a kriptovalutacímeket ember által is olvasható nevekre cserélik, és cenzúraellenálló weboldalakhoz is használhatók.
- A [Gods Unchained Cards](https://godsunchained.com/) egy TCG (Trading Card Game) az Ethereum-blokkláncon, amely NFT-ket használ, hogy valódi tulajdonjogot biztosítson a játékon belüli eszközökre.
- A [Bored Ape Yacht Club](https://boredapeyachtclub.com) egy 10 000 egyedi NFT-ből álló gyűjtemény, amely amellett, hogy bizonyíthatóan ritka műalkotás, a klub tagsági zálogaként is szolgál, és a közösségi erőfeszítések eredményeként idővel növekvő tagsági kedvezményeket és előnyöket biztosít.

## További olvasnivaló {#further-reading}

- [ERC-721: Nem helyettesíthető tokenekről szóló szabvány](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - ERC-721 Dokumentáció](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - ERC-721 Implementáció](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Alchemy NFT API](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)
