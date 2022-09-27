---
title: Standardul de tokenuri nefungibile ERC-721
description:
lang: ro
---

## Introducere {#introduction}

**Ce este un token nefungibil?**

Tokenurile nefungibile (NFT) sunt folosite pentru a identifica ceva sau pe cineva într-un mod unic. Acest tip de token este perfect pentru a fi utilizat pe platforme care oferă articole de colecții, chei de acces, bilete la loterie, locuri numerotate pentru concerte și meciuri sportive etc. Acest tip special de Token are posibilități uimitoare, așa că merită un Standard adecvat, iar ERC-721 a apărut ca soluţie!

**Ce este ERC-721?**

ERC-721 introduce un standard pentru NFT-uri, cu alte cuvinte, acest tip de Token este unic și poate avea o valoare diferită de un alt Token din același Contract inteligent, poate din cauza vârstei, a rarității sau chiar din alt motiv, cum ar fi reprezentarea sa vizuală. Ia staţi, vizuală?

Da! Toate NFT-urile au o variabilă `uint256` numită `tokenId`, astfel încât pentru orice contract ERC-721, perechea `contract address, uint256 tokenId` trebuie să fie unică la nivel global. Acestea fiind spuse, o aplicaţie dApp poate avea un „convertor” care folosește `tokenId` ca date de intrare și produce la ieşire ceva grozav, cum ar fi o imagine cu zombi, arme, abilități sau pisicuțe uimitoare!

## Condiții prealabile {#prerequisites}

- [Conturi](/developers/docs/accounts/)
- [Contracte inteligente](/developers/docs/smart-contracts/)
- [Standarde de tokenuri](/developers/docs/standards/tokens/)

## Conținut {#body}

ERC-721 (Cerere de comentarii Ethereum), propus de William Entriken, Dieter Shirley, Jacob Evans, Nastassia Sachs în ianuarie 2018, este un Standard de tokenuri nefungibile care implementează un API pentru tokenuri în cadrul Contractelor inteligente.

Acesta oferă funcționalități cum ar fi transferul de tokenuri dintr-un cont în altul, obținerea soldului actual al tokenurilor unui cont, obținerea proprietarului unui token specific și de asemenea a totalului de tokenuri disponibile în rețea. Pe lângă acestea, are și alte funcționalități, cum ar fi aceea de a aproba ca o cantitate de tokenuri dintr-un cont să poată fi mutată de către un cont terț.

În cazul în care un Contract inteligent implementează următoarele metode și evenimente, acesta poate fi numit un contract de tokenuri nefungibile ERC-721 și, odată implementat, va avea responsabilitatea de a ține evidența tokenurilor create pe Ethereum.

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

Să vedem cât de important este un standard pentru a ne simplifica lucrurile când inspectăm orice contract de tokenuri ERC-721 pe Ethereum. Avem nevoie doar de interfața binară cu aplicația (ABI) a contractului pentru a crea o interfață pentru orice token ERC-721. După cum puteţi vedea mai jos, vom folosi un ABI simplificat, pentru a facilita înţelegerea exemplului.

#### Exemplu Web3.py {#web3py-example}

În primul rând aveţi grijă să instalaţi librăria Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

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

Contractul CryptoKitties are câteva Evenimente interesante, altele decât cele standard.

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

## NFT-uri populare {#popular-nfts}

- [Etherscan NFT Tracker](https://etherscan.io/tokens-nft) listează NFT-urile de top pe Ethereum după volumul transferurilor.
- [CryptoKitties](https://www.cryptokitties.co/) este un joc centrat pe creaturile care pot fi crescute, colecționate și sunt atât de adorabile pe care le numim CryptoKitties.
- [Sorare](https://sorare.com/) este un joc global de fotbal fantezie unde puteţi colecta obiecte de colecţie de ediție limitată, vă puteţi gestiona echipele și puteţi concura pentru a câștiga premii.
- [Serviciul de nume Ethereum (ENS)](https://ens.domains/) oferă o modalitate securizată & și descentralizată de a aborda resursele, atât în ​​cadrul blockchain-ului, cât și în afara acestuia, folosind nume simple, care pot fi citite de oameni.
- [Unstoppable Domains](https://unstoppabledomains.com/) este o companie din San Francisco care construiește domenii pe blockchain-uri. Domeniile blockchain înlocuiesc adresele criptomonedei cu nume care pot fi citite de oameni și pot fi folosite pentru activarea de site-uri web rezistente la cenzură.
- [Gods Unchained Cards](https://godsunchained.com/) este un TCG (joc de cărți de tranzacționare) pe blockchain-ul Ethereum care folosește NFT-uri pentru a aduce proprietate reală activelor din joc.
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) este o colecție de 10.000 de NFT-uri unice, care, în afară de a fi o piesă artistică cu adevărat rară, funcționează ca token de membru al clubului, oferind membrilor avantaje și beneficii care cresc în timp, ca rezultat al eforturilor comunității.

## Referințe suplimentare {#further-reading}

- [EIP-721: Standardul de tokenuri nefungibile ERC-721](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - Documentație ERC-721](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - Implementare ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Alchemy NFT API](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)
