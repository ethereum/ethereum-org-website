---
title: ERC-721 Nicht-fungibler Token-Standard
description:
lang: de
---

## Einführung {#introduction}

**Was ist ein nicht-fungibler Token?**

Ein nicht-fungibler Token (NFT) wird verwendet, um etwas oder jemanden auf eine einzigartige Weise zu identifizieren. Diese Art von Token ist perfekt, um auf Plattformen verwendet zu werden, die Sammelartikel anbieten, Zugang zu Schlüsseln, Lotteriekarten, nummerierten Plätzen für Konzerte und Sportspiele, etc. Diese spezielle Art von Token hat erstaunliche Möglichkeiten, so dass er einen angemessenen Standard verdient. Der ERC-721 hat dies gelöst!

**Was ist ERC-721?**

Der ERC-721 führt eine Norm für NFT ein, mit anderen Worten, diese Art von Token ist einzigartig und kann einen anderen Wert haben als ein anderer Token des gleichen Smart Contract, vielleicht wegen seines Alters, seiner Seltenheit oder auch so etwas wie sein visuelles Bild. Moment mal, visuell?

Ja! Alle NFTs haben eine `uint256` Variable namens `TokenId` und bei jedem ERC-721 Contract muss das Paar aus `Kontaktadresse uint256 TokenId` global eindeutig sein. Eine dApp kann einen „Konverter" haben, der die `TokenId` als Eingabe verwendet und ein Bild von etwas Coolem ausgibt, wie Zombies, Waffen, Fertigkeiten oder Krypto-Kitties!

## Voraussetzungen {#prerequisites}

- [Konten](/developers/docs/accounts/)
- [Smart Contracts](/developers/docs/smart-contracts/)
- [Token-Standards](/developers/docs/standards/tokens/)

## Hauptteil {#body}

Der ERC-721 (Ethereum Request for Comments 721), im Januar 2018 von William Entriken, Dieter Shirley, Jacob Evans und Nastassia Sachs vorgeschlagen, ist ein nicht-fungibler Token-Standard, der eine API für Tokens innerhalb von Smart Contracts implementiert.

Er bietet Funktionen wie die Übertragung von Token von einem Konto auf ein anderes, um den aktuellen Token-Saldo eines Kontos, den Eigentümer eines spezifischen Tokens sowie den Gesamtbestand der im Netzwerk verfügbaren Token abzurufen. Daneben gibt es auch einige andere Funktionalitäten wie zum Beispiel zu genehmigen, dass eine gewisse Menge an Token von einem Konto von einem Drittkonto verschoben werden kann.

Wenn ein Smart Contract folgende Methoden und Ereignisse implementiert, kann er als ERC-721 nicht-fungibler Token-Vertrag bezeichnet werden. Einmal implementiert, werden mit ihm die erstellten Token auf Ethereum verfolgt.

Aus [EIP-721](https://eips.ethereum.org/EIPS/eip-721):

#### Methoden {#methods}

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

#### Events {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### Beispiele {#web3py-example}

Lassen Sie uns sehen, wie wichtig ein Standard ist, um es uns einfach zu machen, jeden ERC-721 Token-Vertrag auf Ethereum zu inspizieren. Wir benötigen nur das Application Binary Interface (ABI) des Vertrags, um eine Schnittstelle zu jedem ERC-721 Token zu erstellen. Wie Sie unten sehen können, werden wir ein vereinfachtes ABI verwenden, um es zu einem Beispiel mit geringer Reibung zu machen.

#### Web3.py Beispiel {#web3py-example}

Stellen Sie zuerst sicher, dass Sie [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python-Bibliothek installiert haben:

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
# Es werden nur folgende Methoden betrachtet: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
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

# Nutzung des Transfer Event ABI um Informationen über übertragene Kitties zu erhalten.
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

Der Krypto-Kitties-Vertrag hat neben den Standard-Events noch einige weitere interessante Events.

Lassen Sie uns zwei dieser Events genauer ansehen, `Schwanger` und `Geburt`.

```python
# Verwendung des Pregnant und Birth Events ABI um Informationen über neue Kitties zu erhalten.
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

## Beliebte NFTs {#popular-nfts}

- [Etherscan NFT Tracker](https://etherscan.io/tokens-nft) Liste der Top-NFT auf Ethereum, nach Transfervolumen sortiert.
- [Krypto-Kitties](https://www.cryptokitties.co/) ist ein Spiel mit Fokus auf das Züchten und Sammeln liebenswerter Kreaturen, die wir Krypto-Kitties nennen.
- [Sorare](https://sorare.com/) ist ein Fantasie-Fußballspiel, bei dem es darum geht, limitierte Karten zu sammeln, Ihre Teams zu verwalten und gegeneinander anzutreten, um Preise zu gewinnen.
- [Der Ethereum Namen-Service (ENS)](https://ens.domains/) bietet einen sicheren & dezentralen Weg, Informationen mit Hilfe von verständlichen Namen auf und neben der Blockchains zu adressieren.
- [Unstoppable Domains](https://unstoppabledomains.com/) ist ein Unternehmen aus San Francisco, welches Domains auf Blockchains baut. Blockchain-Domains ersetzen Krypto-Adressen mit verständlichen und lesbaren Namen, um zensurresistente Websites zu ermöglichen.
- [Gods Unchained Cards](https://godsunchained.com/) ist ein TCG auf der Ethereum-Blockchain, welches NFTs verwendet, um In-Game-Assets als Eigentum zu verleihen.
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) ist eine Sammlung von 10.000 einzigartigen NFTs, die nicht nur ein nachweislich seltenes Kunstwerk sind, sondern auch als Mitgliedschaftsmarke für den Club fungieren und den Mitgliedern Vergünstigungen und Vorteile bieten, die sich im Laufe der Zeit aufgrund der Bemühungen der Gemeinschaft erhöhen.

## Weiterführende Informationen {#further-reading}

- [EIP-721: ERC-721 Nicht-Fungibler Token-Standard](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - ERC-721 Dokumentation](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - ERC-721 Implementierung](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Alchemy NFT API](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)
