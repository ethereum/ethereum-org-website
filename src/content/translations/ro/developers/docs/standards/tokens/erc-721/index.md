---
title: ERC-721 Token standard nefungibil
description:
lang: ro
sidebar: true
---

## Introducere {#introduction}

**Ce este un token nefungibil?**

Tokenurile nefungibile (NFT) sunt folosite pentru a identifica ceva sau pe cineva într-un mod unic. Acest tip de token este perfect pentru a fi utilizat pe platforme care oferă articole de colecții, chei de acces, bilete la loterie, locuri numerotate pentru concerte și meciuri sportive etc. Acest tip special de Token are posibilități uimitoare, așa că merită un standard adecvat, ERC-721 vine ca să rezolve aceasta!

**Ce este ERC-721?**

ERC-721 introduce un standard pentru NFT, cu alte cuvinte, acest tip de token este unic și poate avea o valoare diferită decât un alt token din același contract inteligent, poate din cauza vârstei, rarității sau chiar altui motiv, cum ar fi reprezentarea sa vizuală. Stai, vizual?

Da! Toate NFT-urile au o variabilă `uint256` numită `tokenId`, astfel încât pentru orice contract ERC-721, perechea `contract address, uint256 tokenId` trebuie să fie unică la nivel global. Să spunem că o aplicație dapp poate avea un „convertor” care folosește `tokenId` ca intrare, iar ca ieșire, afișarea unei imagini a ceva interesant, cum ar fi un zombi, arme, abilități sau pisici uimitoare!

## Condiții prealabile {#prerequisites}

- [Conturi](/developers/docs/accounts/)
- [Contracte inteligente](/developers/docs/smart-contracts/)
- [Standarde token](/developers/docs/standards/tokens/)

## Conținut {#body}

ERC-721 (Cerere de comentarii Ethereum), propus de William Entriken, Dieter Shirley, Jacob Evans, Nastassia Sachs, în ianuarie 2018, este un standard de tokenuri nefungibile care implementează un API pentru tokenuri în cadrul contractelor inteligente.

Acesta oferă funcționalități cum ar fi transferul de tokenuri dintr-un cont în altul, obținerea soldului actual al tokenurilor unui cont, obținerea proprietarul unui token specific și de asemenea, furnizarea totalului de tokenuri disponibile în rețea. Pe lângă acestea, are și alte funcționalități, cum ar fi aceea de a aproba ca o cantitate de tokenuri dintr-un cont să poată fi mutată de un cont terț.

În cazul în care un contract inteligent implementează următoarele metode și evenimente, acesta poate fi numit contract token ERC-721 nefungibil și, odată implementat, va fi responsabil cu ținerea în evidență a tokenurilor create pe Ethereum.

De la [EIP-721](https://eips.ethereum.org/EIPS/eip-721):

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

#### Evenimente {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### Exemple {#web3py-example}

Să vedem cum un standard este atât de important pentru noi, simplificând procedura de verificare a oricărui contract token ERC-721 pe Ethereum. Avem nevoie doar de interfața binară aplicație (ABI) a contractului pentru a crea o interfață pentru orice token ERC-721. După cum poți să vezi mai jos, vom folosi un ABI simplificat, pentru a face exemplul ușor de înțeles.

#### Exemplu Web3.py {#web3py-example}

În primul rând, asigură-te că ai instalat librăria Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
$ pip install web3
```

```python
from web3 import Web3
from web3.utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # Contract CryptoKitties

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # Licitație de vânzări de CryptoKitties

# Acesta este un contract simplificat de interfață binară de aplicație (ABI) pentru un contract ERC-721 NFT.
# Va expune numai metodele: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
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

# Folosind evenimentul ABI „transfer” pentru a obține informații despre „Pisicile” transferate.
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# Avem nevoie de semnătura evenimentului pentru a filtra jurnalele
event_signature = w3.sha3(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.getLogs({
    "fromBlock": w3.eth.blockNumber - 120,
    "address": w3.toChecksumAddress(ck_token_addr),
    "topics": [event_signature]
})

# Note:
# - 120 de blocuri este intervalul maxim pentru furnizorul CloudFlare
# - Dacă nu ai găsit niciun eveniment de transfer, poți încerca, de asemenea, să obții un tokenId la:
# https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
# Fă clic pentru a extinde jurnalele evenimentului și copiază argumentul „tokenId”
recent_tx = [get_event_data(tx_event_abi, log)["args"] for log in logs]

kitty_id = recent_tx[0]['tokenId'] # Inserează  "tokenId" aici din linkul de mai sus
is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
print(f"{name} [{symbol}] NFTs {kitty_id} este gestantă: {is_pregnant}")
```

Contractul CryptoKitties are câteva evenimente interesante, altele decât cele standard.

Să verificăm două dintre ele, `Pregnant` și `Birth`.

```python
# Utilizarea evenimentelor ABI „Pregnant” și „Birth” pentru a obține informații despre noile pisici.
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

# Avem nevoie de semnătura evenimentului pentru a filtra jurnalele
ck_event_signatures = [
    w3.sha3(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.sha3(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# Iată un eveniment Pregnant:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.getLogs({
    "fromBlock": w3.eth.blockNumber - 120,
    "address": w3.toChecksumAddress(ck_token_addr),
    "topics": [ck_extra_events_abi[0]]
})

recent_pregnants = [get_event_data(ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# Iată un eveniment Birth:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.getLogs({
    "fromBlock": w3.eth.blockNumber - 120,
    "address": w3.toChecksumAddress(ck_token_addr),
    "topics": [ck_extra_events_abi[1]]
})

recent_births = [get_event_data(ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## NFT-uri populare {#popular-nfts}

- [Etherscan NFT Tracker](https://etherscan.io/tokens-nft) listează NFT de top pe Ethereum după volumul transferurilor.
- [CryptoKitties](https://www.cryptokitties.co/) este un joc centrat în jurul creaturilor care pot fi crescute, colecționate și atât de adorabile pe care le numim CryptoKitties.
- [Sorare](https://sorare.com/) este un joc global de fotbal fantezie unde poți colecta colecții de ediție limitată, îți poți gestiona echipele și poți concura pentru a câștiga premii.
- [Serviciul de nume Ethereum (ENS)](https://ens.domains/) oferă o modalitate sigură și descentralizată de a aborda resursele, atât în ​​cadrul blockchain-ului, cât și în afara acestuia, folosind nume simple, care pot fi citite de o persoană.
- [Unstoppable Domains](https://unstoppabledomains.com/) este o companie din San Francisco care construiește domenii pe blockchain-uri. Domeniile blockchain înlocuiesc adresele criptomonedei cu nume care pot fi citite de om și pot fi folosite pentru activarea de site-uri web rezistente la cenzură.
- [Gods Unchained Cards](https://godsunchained.com/) este un TCG (joc de cărți de tranzacționare) pe blockchain-ul Ethereum care folosește NFT-uri pentru a aduce proprietate reală la activele din joc.

## Referințe suplimentare {#further-reading}

- [EIP-721: Token standard nefungibil ERC-721](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - Documentație ERC-721](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - Implementare ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)

## Subiecte corelate {#related-topics}

- [ERC-20](/developers/docs/standards/tokens/erc-20/)
- [ERC-777](/developers/docs/standards/tokens/erc-777/)
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/)
