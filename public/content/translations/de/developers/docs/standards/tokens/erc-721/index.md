---
title: ERC-721 Nicht-fungibler Token-Standard
description: "Erfahren Sie mehr über ERC-721, den Standard für nicht fungible Token (NFTs), die einzigartige digitale Assets auf Ethereum darstellen."
lang: de
---

## Einführung {#introduction}

**Was ist ein nicht-fungibler Token?**

Ein nicht-fungibler Token (NFT) wird verwendet, um etwas oder jemanden auf eine einzigartige Weise zu identifizieren. Diese Art von Token ist perfekt, um
auf Plattformen verwendet zu werden, die Sammelartikel anbieten, Zugang zu Schlüsseln, Lotteriekarten, nummerierten Plätzen für Konzerte und
Sportspiele, etc. Diese spezielle Art von Token hat erstaunliche Möglichkeiten, so dass er einen angemessenen Standard verdient. Der ERC-721
hat dies gelöst!

**Was ist ERC-721?**

Der ERC-721 führt eine Norm für NFT ein, mit anderen Worten, diese Art von Token ist einzigartig und kann einen anderen Wert haben
als ein anderer Token des gleichen Smart Contract, vielleicht wegen seines Alters, seiner Seltenheit oder auch so etwas wie sein visuelles Bild.
Moment mal, visuell?

Ja! Alle NFTs haben eine `uint256`-Variable namens `tokenId`. Daher muss für jeden ERC-721-Vertrag das Paar
`Vertragsadresse, uint256 tokenId` global einzigartig sein. Eine Dapp kann jedoch einen "Konverter" haben, der
die `tokenId` als Eingabe verwendet und ein Bild von etwas Coolem ausgibt, wie Zombies, Waffen, Fähigkeiten oder fantastischen Kätzchen!

## Voraussetzungen {#prerequisites}

- [Konten](/developers/docs/accounts/)
- [Smart Contracts](/developers/docs/smart-contracts/)
- [Token-Standards](/developers/docs/standards/tokens/)

## Hauptteil {#body}

Der ERC-721 (Ethereum Request for Comments 721), im Januar 2018 von William Entriken, Dieter Shirley, Jacob Evans und
Nastassia Sachs vorgeschlagen, ist ein nicht-fungibler Token-Standard, der eine API für Tokens innerhalb von Smart Contracts implementiert.

Er bietet Funktionen wie die Übertragung von Token von einem Konto auf ein anderes, um den aktuellen Token-Saldo eines Kontos, den Eigentümer eines spezifischen Tokens sowie den Gesamtbestand der im Netzwerk verfügbaren Token abzurufen.
Daneben gibt es auch einige andere Funktionalitäten wie zum Beispiel zu genehmigen, dass eine gewisse Menge an Token von einem Konto
von einem Drittkonto verschoben werden kann.

Wenn ein Smart Contract folgende Methoden und Ereignisse implementiert, kann er als ERC-721 nicht-fungibler Token-Vertrag
bezeichnet werden. Einmal implementiert, werden mit ihm die erstellten Token auf Ethereum verfolgt.

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

Lassen Sie uns sehen, wie wichtig ein Standard ist, um es uns einfach zu machen, jeden ERC-721 Token-Vertrag auf Ethereum zu inspizieren.
Wir benötigen nur das Application Binary Interface (ABI) des Vertrags, um eine Schnittstelle zu jedem ERC-721 Token zu erstellen. Wie Sie
unten sehen können, werden wir ein vereinfachtes ABI verwenden, um es zu einem Beispiel mit geringer Reibung zu machen.

#### Web3.py-Beispiel {#web3py-example}

Stellen Sie zunächst sicher, dass Sie die Python-Bibliothek [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) installiert haben:

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # CryptoKitties-Vertrag

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # CryptoKitties-Verkaufsauktion

# Dies ist eine vereinfachte Contract Application Binary Interface (ABI) eines ERC-721-NFT-Vertrags.
# Es werden nur die folgenden Methoden offengelegt: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
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

# Die Transfer-Event-ABI verwenden, um Informationen über übertragene Kitties zu erhalten.
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# Wir benötigen die Signatur des Ereignisses, um die Protokolle zu filtern
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# Hinweise:
#   - Erhöhen Sie die Anzahl der Blöcke von 120, wenn kein Transfer-Ereignis zurückgegeben wird.
#   - Wenn Sie kein Transfer-Ereignis gefunden haben, können Sie auch versuchen, eine tokenId unter folgendem Link zu erhalten:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       Klicken Sie, um die Protokolle des Ereignisses zu erweitern, und kopieren Sie das Argument „tokenId“
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # Fügen Sie die „tokenId“ von dem obigen Link hier ein
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

Der Krypto-Kitties-Vertrag hat neben den Standard-Events noch einige weitere interessante Events.

Sehen wir uns zwei von ihnen an, `Pregnant` und `Birth`.

```python
# Verwendung der ABIs der Ereignisse „Pregnant“ und „Birth“, um Informationen über neue Kitties zu erhalten.
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

# Wir benötigen die Signatur des Ereignisses, um die Protokolle zu filtern
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# Hier ist ein „Pregnant“-Ereignis:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# Hier ist ein „Birth“-Ereignis:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## Beliebte NFTs {#popular-nfts}

- Der [Etherscan NFT Tracker](https://etherscan.io/nft-top-contracts) listet die Top-NFTs auf Ethereum nach Übertragungsvolumen auf.
- [CryptoKitties](https://www.cryptokitties.co/) ist ein Spiel, das sich um züchtbare, sammelbare und überaus entzückende
  Kreaturen dreht, die wir CryptoKitties nennen.
- [Sorare](https://sorare.com/) ist ein globales Fantasy-Football-Spiel, bei dem Sie Sammlerstücke in limitierter Auflage sammeln,
  Ihre Teams verwalten und um Preise wetteifern können.
- [Der Ethereum Name Service (ENS)](https://ens.domains/) bietet eine sichere und dezentralisierte Möglichkeit, Ressourcen sowohl
  on-chain als auch off-chain mithilfe einfacher, für Menschen lesbarer Namen zu adressieren.
- [POAP](https://poap.xyz) verteilt kostenlose NFTs an Personen, die an Veranstaltungen teilnehmen oder bestimmte Aktionen durchführen. POAPs können kostenlos erstellt und verteilt werden.
- [Unstoppable Domains](https://unstoppabledomains.com/) ist ein in San Francisco ansässiges Unternehmen, das Domains auf
  Blockchains erstellt. Blockchain-Domains ersetzen Kryptowährungsadressen durch für Menschen lesbare Namen und können verwendet werden, um
  zensurresistente Websites zu ermöglichen.
- [Gods Unchained Cards](https://godsunchained.com/) ist ein TCG auf der Ethereum-Blockchain, das NFTs verwendet, um echtes Eigentum
  an In-Game-Assets zu ermöglichen.
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) ist eine Sammlung von 10.000 einzigartigen NFTs. Diese sind nicht nur nachweislich seltene Kunstwerke, sondern fungieren auch als Mitgliedschafts-Token für den Club, der seinen Mitgliedern Vergünstigungen und Vorteile bietet, die im Laufe der Zeit durch die Bemühungen der Community zunehmen.

## Weiterführende Lektüre {#further-reading}

- [EIP-721: ERC-721-Standard für nicht-fungible Token](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin – ERC-721-Dokumentation](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin – ERC-721-Implementierung](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Alchemy NFT-API](https://www.alchemy.com/docs/reference/nft-api-quickstart)
