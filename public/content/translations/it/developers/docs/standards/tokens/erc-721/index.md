---
title: Standard dei token non fungibili ERC-721
description: Scopri l'ERC-721, lo standard per i token non fungibili (NFT) che rappresentano risorse digitali uniche su Ethereum.
lang: it
---

## Introduzione {#introduction}

**Cos'è un token non fungibile?**

Un token non fungibile (NFT) è utilizzato per identificare qualcosa o qualcuno in modo unico. Questo tipo di token è perfetto per essere utilizzato su piattaforme che offrono oggetti da collezione, chiavi di accesso, biglietti della lotteria, posti numerati per concerti e partite sportive, ecc. Questo tipo speciale di token ha possibilità incredibili, quindi merita uno standard adeguato, e l'ERC-721 è nato per risolvere questo problema!

**Cos'è l'ERC-721?**

L'ERC-721 introduce uno standard per gli NFT; in altre parole, questo tipo di token è unico e può avere un valore diverso rispetto a un altro token proveniente dallo stesso contratto intelligente, magari a causa della sua età, rarità o persino di qualcos'altro come il suo aspetto visivo.
Aspetta, aspetto visivo?

Sì! Tutti gli NFT hanno una variabile `uint256` chiamata `tokenId`, quindi per qualsiasi contratto ERC-721, la coppia `indirizzo del contratto, uint256 tokenId` deve essere globalmente unica. Detto questo, una dApp può avere un "convertitore" che utilizza il `tokenId` come input e restituisce un'immagine di qualcosa di fantastico, come zombi, armi, abilità o gattini incredibili!

## Prerequisiti {#prerequisites}

- [Account](/developers/docs/accounts/)
- [Contratti intelligenti](/developers/docs/smart-contracts/)
- [Standard dei token](/developers/docs/standards/tokens/)

## Corpo {#body}

L'ERC-721 ([Ethereum](/) Request for Comments 721), proposto da William Entriken, Dieter Shirley, Jacob Evans e Nastassia Sachs nel gennaio 2018, è uno standard per token non fungibili che implementa un'API per i token all'interno dei contratti intelligenti.

Fornisce funzionalità come il trasferimento di token da un account a un altro, l'ottenimento del saldo attuale dei token di un account, l'identificazione del proprietario di un token specifico e anche l'offerta totale del token disponibile sulla rete.
Oltre a queste, ha anche altre funzionalità, come l'approvazione affinché una quantità di token da un account possa essere spostata da un account di terze parti.

Se un contratto intelligente implementa i seguenti metodi ed eventi, può essere definito un contratto di token non fungibili ERC-721 e, una volta distribuito, sarà responsabile di tenere traccia dei token creati su Ethereum.

Da [EIP-721](https://eips.ethereum.org/EIPS/eip-721):

### Metodi {#methods}

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

### Eventi {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### Esempi {#web3py-example}

Vediamo come uno standard sia così importante per semplificarci l'ispezione di qualsiasi contratto di token ERC-721 su Ethereum.
Abbiamo solo bisogno dell'Application Binary Interface (ABI) del contratto per creare un'interfaccia verso qualsiasi token ERC-721. Come puoi vedere di seguito, utilizzeremo un'ABI semplificata, per renderlo un esempio a basso attrito.

#### Esempio con Web3.py {#web3py-example}

Innanzitutto, assicurati di aver installato la libreria Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d" # Contratto CryptoKitties

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C" # Asta di vendita CryptoKitties

# Questa è una Contract Application Binary Interface (ABI) semplificata di un contratto NFT ERC-721.
# Esporrà solo i metodi: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
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

# Utilizzo dell'ABI dell'evento Transfer per ottenere informazioni sui Kitties trasferiti.
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# Abbiamo bisogno della firma dell'evento per filtrare i log
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# Note:
# - Aumenta il numero di blocchi oltre 120 se non viene restituito alcun evento Transfer.
# - Se non hai trovato alcun evento Transfer, puoi anche provare a ottenere un tokenId su:
# https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
# Fai clic per espandere i log dell'evento e copia il suo argomento "tokenId"
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # Incolla qui il "tokenId" dal link sopra
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

Il contratto di CryptoKitties ha alcuni eventi interessanti oltre a quelli standard.

Controlliamone due: `Pregnant` e `Birth`.

```python
# Utilizzo dell'ABI degli eventi Pregnant e Birth per ottenere informazioni sui nuovi Kitties.
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

# Abbiamo bisogno della firma dell'evento per filtrare i log
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# Ecco un evento Pregnant:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# Ecco un evento Birth:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## NFT popolari {#popular-nfts}

- [Etherscan NFT Tracker](https://etherscan.io/nft-top-contracts) elenca i migliori NFT su Ethereum per volume di trasferimenti.
- [CryptoKitties](https://www.cryptokitties.co/) è un gioco incentrato su creature allevabili, collezionabili e adorabili che chiamiamo CryptoKitties.
- [Sorare](https://sorare.com/) è un gioco di fantacalcio globale in cui puoi raccogliere oggetti da collezione in edizione limitata, gestire le tue squadre e competere per vincere premi.
- [L'Ethereum Name Service (ENS)](https://ens.domains/) offre un modo sicuro e decentralizzato per indirizzare le risorse sia sulla blockchain che fuori utilizzando nomi semplici e leggibili dall'uomo.
- [POAP](https://poap.xyz) distribuisce NFT gratuiti alle persone che partecipano a eventi o completano azioni specifiche. I POAP sono gratuiti da creare e distribuire.
- [Unstoppable Domains](https://unstoppabledomains.com/) è un'azienda con sede a San Francisco che crea domini sulle blockchain. I domini blockchain sostituiscono gli indirizzi di criptovaluta con nomi leggibili dall'uomo e possono essere utilizzati per abilitare siti web resistenti alla censura.
- [Gods Unchained Cards](https://godsunchained.com/) è un gioco di carte collezionabili (TCG) sulla blockchain di Ethereum che utilizza gli NFT per conferire la vera proprietà alle risorse di gioco.
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) è una collezione di 10.000 NFT unici che, oltre a essere un'opera d'arte di comprovata rarità, funge da token di appartenenza al club, fornendo vantaggi e benefici ai membri che aumentano nel tempo grazie agli sforzi della community.

## Letture consigliate {#further-reading}

- [EIP-721: Standard dei token non fungibili ERC-721](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - Documentazione ERC-721](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - Implementazione ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [API per NFT di Alchemy](https://www.alchemy.com/docs/reference/nft-api-quickstart)

## Tutorial: Sviluppare con i token non fungibili (ERC-721) su Ethereum {#tutorials}

- [Guida al contratto ERC-721 in Vyper](/developers/tutorials/erc-721-vyper-annotated-code/) _– Una guida annotata di un contratto NFT ERC-721 completo scritto in Vyper._
- [Come scrivere e distribuire un NFT (Parte 1/3)](/developers/tutorials/how-to-write-and-deploy-an-nft/) _– Guida passo passo per scrivere e distribuire il tuo primo contratto intelligente ERC-721._
- [Come coniare un NFT (Parte 2/3)](/developers/tutorials/how-to-mint-an-nft/) _– Come coniare un NFT ERC-721 utilizzando il tuo contratto intelligente distribuito e Web3._
- [Come visualizzare il tuo NFT nel tuo portafoglio (Parte 3/3)](/developers/tutorials/how-to-view-nft-in-metamask/) _– Come visualizzare il tuo NFT coniato in MetaMask dopo la distribuzione._
- [Tutorial per coniare NFT](/developers/tutorials/nft-minter/) _– Crea una dApp full-stack per coniare NFT con un frontend React, MetaMask e Alchemy._