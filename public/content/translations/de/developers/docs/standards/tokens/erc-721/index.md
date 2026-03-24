---
title: "ERC-721 Standard für nicht-fungible Token"
description: "Erfahren Sie mehr über ERC-721, den Standard für nicht-fungible Token (NFTs), die einzigartige digitale Vermögenswerte auf Ethereum repräsentieren."
lang: de
---

## Einführung {#introduction}

**Was ist ein nicht-fungibler Token?**

Ein nicht-fungibler Token (NFT) wird verwendet, um etwas oder jemanden auf einzigartige Weise zu identifizieren. Diese Art von Token eignet sich perfekt für Plattformen, die Sammlerstücke, Zugangsschlüssel, Lotterielose, nummerierte Sitzplätze für Konzerte und Sportveranstaltungen usw. anbieten. Diese spezielle Art von Token bietet erstaunliche Möglichkeiten und verdient daher einen eigenen Standard. Der ERC-721 wurde entwickelt, um genau das zu lösen!

**Was ist ERC-721?**

Der ERC-721 führt einen Standard für NFTs ein. Mit anderen Worten: Diese Art von Token ist einzigartig und kann einen anderen Wert haben als ein anderer Token aus demselben Smart Contract, vielleicht aufgrund seines Alters, seiner Seltenheit oder sogar aufgrund von etwas anderem wie seinem Aussehen. Moment, Aussehen?

Ja! Alle NFTs haben eine `uint256`-Variable namens `tokenId`. Für jeden ERC-721-Vertrag muss das Paar `contract address, uint256 tokenId` (Vertragsadresse, uint256 tokenId) also global einzigartig sein. Das bedeutet, dass eine Dapp einen „Konverter“ haben kann, der die `tokenId` als Eingabe verwendet und ein Bild von etwas Coolem ausgibt, wie Zombies, Waffen, Fähigkeiten oder fantastische Kätzchen!

## Voraussetzungen {#prerequisites}

- [Konten](/developers/docs/accounts/)
- [Smart Contracts](/developers/docs/smart-contracts/)
- [Token-Standards](/developers/docs/standards/tokens/)

## Hauptteil {#body}

Der ERC-721 ([Ethereum](/) Request for Comments 721), der im Januar 2018 von William Entriken, Dieter Shirley, Jacob Evans und Nastassia Sachs vorgeschlagen wurde, ist ein Standard für nicht-fungible Token, der eine API für Token innerhalb von Smart Contracts implementiert.

Er bietet Funktionen wie die Übertragung von Token von einem Konto auf ein anderes, die Abfrage des aktuellen Token-Guthabens eines Kontos, die Ermittlung des Eigentümers eines bestimmten Tokens sowie des Gesamtangebots des im Netzwerk verfügbaren Tokens. Darüber hinaus verfügt er über einige weitere Funktionen, wie z. B. die Genehmigung, dass eine bestimmte Menge an Token von einem Konto durch ein Drittkonto verschoben werden kann.

Wenn ein Smart Contract die folgenden Methoden und Ereignisse implementiert, kann er als ERC-721-Vertrag für nicht-fungible Token bezeichnet werden und ist nach seiner Bereitstellung dafür verantwortlich, die auf Ethereum erstellten Token zu verfolgen.

Aus [EIP-721](https://eips.ethereum.org/EIPS/eip-721):

### Methoden {#methods}

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

### Ereignisse {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### Beispiele {#web3py-example}

Schauen wir uns an, warum ein Standard so wichtig ist, um es uns einfach zu machen, jeden ERC-721-Token-Vertrag auf Ethereum zu überprüfen. Wir benötigen lediglich das Contract Application Binary Interface (ABI), um eine Schnittstelle zu einem beliebigen ERC-721-Token zu erstellen. Wie Sie unten sehen können, werden wir ein vereinfachtes ABI verwenden, um es zu einem reibungslosen Beispiel zu machen.

#### Web3.py-Beispiel {#web3py-example}

Stellen Sie zunächst sicher, dass Sie die Python-Bibliothek [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) installiert haben:

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d" # CryptoKitties-Contract

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C" # CryptoKitties-Verkaufsauktion

# Dies ist ein vereinfachtes Contract Application Binary Interface (ABI) eines ERC-721 NFT-Contracts.
# Es stellt nur die folgenden Methoden bereit: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
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

# Verwendung der Transfer-Event-ABI, um Informationen über übertragene Kitties zu erhalten.
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# Wir benötigen die Signatur des Events, um die Logs zu filtern
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# Hinweise:
# - Erhöhen Sie die Anzahl der Blöcke über 120 hinaus, wenn kein Transfer-Event zurückgegeben wird.
# - Wenn Sie kein Transfer-Event gefunden haben, können Sie auch versuchen, eine tokenId hier zu erhalten:
# https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
# Klicken Sie, um die Logs des Events zu erweitern, und kopieren Sie das Argument "tokenId"
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # Fügen Sie die "tokenId" aus dem obigen Link hier ein
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

Der CryptoKitties-Vertrag hat neben den Standardereignissen noch einige andere interessante Ereignisse.

Schauen wir uns zwei davon an: `Pregnant` und `Birth`.

```python
# Verwendung der Pregnant- und Birth-Event-ABI, um Informationen über neue Kitties zu erhalten.
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

# Wir benötigen die Signatur des Events, um die Logs zu filtern
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# Hier ist ein Pregnant-Event:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# Hier ist ein Birth-Event:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## Beliebte NFTs {#popular-nfts}

- [Etherscan NFT Tracker](https://etherscan.io/nft-top-contracts) listet die Top-NFTs auf Ethereum nach Transfervolumen auf.
- [CryptoKitties](https://www.cryptokitties.co/) ist ein Spiel, das sich um züchtbare, sammelbare und ach so entzückende Kreaturen dreht, die wir CryptoKitties nennen.
- [Sorare](https://sorare.com/) ist ein globales Fantasy-Fußballspiel, bei dem Sie Sammlerstücke in limitierter Auflage sammeln, Ihre Teams verwalten und antreten können, um Preise zu gewinnen.
- [Der Ethereum Name Service (ENS)](https://ens.domains/) bietet eine sichere und dezentralisierte Möglichkeit, Ressourcen sowohl auf der Blockchain als auch Off-Chain mit einfachen, für Menschen lesbaren Namen zu adressieren.
- [POAP](https://poap.xyz) liefert kostenlose NFTs an Personen, die an Veranstaltungen teilnehmen oder bestimmte Aktionen abschließen. POAPs können kostenlos erstellt und verteilt werden.
- [Unstoppable Domains](https://unstoppabledomains.com/) ist ein in San Francisco ansässiges Unternehmen, das Domains auf Blockchains aufbaut. Blockchain-Domains ersetzen Kryptowährungsadressen durch für Menschen lesbare Namen und können verwendet werden, um zensurresistente Websites zu ermöglichen.
- [Gods Unchained Cards](https://godsunchained.com/) ist ein TCG auf der Ethereum-Blockchain, das NFTs verwendet, um echtes Eigentum an In-Game-Assets zu ermöglichen.
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) ist eine Sammlung von 10.000 einzigartigen NFTs, die nicht nur ein nachweislich seltenes Kunstwerk sind, sondern auch als Mitgliedschafts-Token für den Club fungieren und Mitgliedervorteile und Vergünstigungen bieten, die im Laufe der Zeit durch die Bemühungen der Community zunehmen.

## Weiterführende Literatur {#further-reading}

- [EIP-721: ERC-721 Standard für nicht-fungible Token](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - ERC-721-Dokumentation](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - ERC-721-Implementierung](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Alchemy NFT-API](https://www.alchemy.com/docs/reference/nft-api-quickstart)

## Tutorials: Bauen mit nicht-fungiblen Token (ERC-721) auf Ethereum {#tutorials}

- [Vyper ERC-721 Contract Walkthrough](/developers/tutorials/erc-721-vyper-annotated-code/) _– Ein kommentierter Durchgang durch einen vollständigen ERC-721-NFT-Vertrag, der in Vyper geschrieben wurde._
- [Wie man einen NFT schreibt und bereitstellt (Teil 1/3)](/developers/tutorials/how-to-write-and-deploy-an-nft/) _– Schritt-für-Schritt-Anleitung zum Schreiben und Bereitstellen Ihres ersten ERC-721 Smart Contracts._
- [Wie man einen NFT prägt (Teil 2/3)](/developers/tutorials/how-to-mint-an-nft/) _– Wie man einen ERC-721-NFT mit Ihrem bereitgestellten Smart Contract und Web3 prägt._
- [Wie Sie Ihren NFT in Ihrer Wallet anzeigen (Teil 3/3)](/developers/tutorials/how-to-view-nft-in-metamask/) _– Wie Sie Ihren geprägten NFT nach der Bereitstellung in MetaMask anzeigen._
- [NFT-Minter-Tutorial](/developers/tutorials/nft-minter/) _– Erstellen Sie eine Full-Stack-Dapp zum Prägen von NFTs mit einem React-Frontend, MetaMask und Alchemy._