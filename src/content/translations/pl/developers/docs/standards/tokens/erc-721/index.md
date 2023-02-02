---
title: ERC-721 – standard tokenów niewymiennych
description:
lang: pl
---

## Wprowadzenie {#introduction}

**Czym jest niewymienny token (NFT)?**

Niewymienne tokeny (NFT) służą do identyfikacji czegoś lub kogoś w unikalny sposób. Ten typ tokenu jest idealny do użycia na platformach, które oferują przedmioty kolekcjonerskie, klucze dostępu, bilety loteryjne, numerowane miejsca na koncerty i mecze sportowe itp. Ten specjalny rodzaj tokena ma niesamowite możliwości, dlatego zasługuje na odpowiedni standard, ERC-721 pojawił się, aby to rozwiązać!

**Co to jest ERC-721?**

ERC-721 wprowadza standard dla NFT, innymi słowy ten typ tokena jest unikalny i może mieć różną wartość niż inny token z tego samego inteligentnego kontraktu, być może ze względu na jego wiek, rzadkość, a nawet coś innego, jak jego wygląd. Czekaj, wizualnie?

Tak! Wszystkie NFT mają zmienną `uint256` o nazwie `tokenId`, więc dla każdego kontraktu ERC-721, para `contract address, uint256 tokenId` musi być unikatowa globalnie. Dzięki temu zdecentralizowana aplikacja może mieć „konwerter”, który używa `tokenId` jako danych wejściowych i wyświetla obraz czegoś fajnego, takiego jak zombie, broń, umiejętności lub niesamowite kociaki!

## Warunki wstępne {#prerequisites}

- [Konta](/developers/docs/accounts/)
- [Inteligentne kontrakty](/developers/docs/smart-contracts/)
- [Standardy tokenów](/developers/docs/standards/tokens/)

## Treść {#body}

ERC-721 (Ethereum Request for Comments 721), zaproponowany przez Williama Entrikena, Dietera Shirleya, Jacoba Evansa, Nastassia Sachs w styczniu 2018 r. to standard tokenów niewymiennych, który implementuje interfejs API dla tokenów w ramach inteligentnych kontraktów.

Zapewnia funkcje, takie jak transfer tokenów z jednego konta na drugie, uzyskanie aktualnego salda tokenów na koncie, uzyskanie informacji o właścicielu określonego tokena, a także o całkowitej podaży tokena dostępnej w sieci. Poza tym ma również kilka innych funkcji, takich jak zatwierdzanie, że ilość tokenu z konta może być wydana przez konto osób trzecich.

Jeśli inteligentny kontrakt implementuje następujące metody i zdarzenia, można go nazwać kontraktem tokenów niewymiennych ERC-721 , a po wdrożeniu będzie odpowiedzialny za śledzenie utworzonych tokenów w Ethereum.

Od [EIP-721](https://eips.ethereum.org/EIPS/eip-721):

#### Metody {#methods}

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

#### Wydarzenia {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### Przykłady {#web3py-example}

Zobaczmy, dlaczego standard jest tak ważny, aby ułatwić nam sprawdza kontraktów z tokenami ERC-721 na Ethereum. Potrzebujemy tylko interfejsu binarnego Umowy (ABI), aby utworzyć interfejs dla każdego tokenu ERC-721. Jak możesz zobaczyć poniżej, użyjemy uproszczonego ABI, aby zmniejszyć złożoność przykładu.

#### Przykład Web3.py {#web3py-example}

Najpierw upewnij się, że zainstalowałeś [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) bibliotekę Pythona:

```
$ pip install web3
```

```python
from web3 import Web3
from web3.utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # CryptoKitties Contract

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # CryptoKitties Sales Auction

# To jest uproszczony interfejs ABI kontraktu ERC-721 NFT.
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

recent_tx = [get_event_data(tx_event_abi, log)["args"] for log in logs]

kitty_id = recent_tx[0]['tokenId'] # Paste the "tokenId" here from the link above
is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

Kontrakt CryptoKitties zawiera kilka ciekawych wydarzeń poza standardowymi.

Sprawdźmy dwa z nich, `Pregnant ` i `Birth`.

```python
# Używanie ABI zdarzeń Pregnant i Birth w celu uzyskania informacji o nowych kociakach.

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
    "topics": [ck_extra_events_abi[0]]
})

recent_pregnants = [get_event_data(ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# Here is a Birth Event:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.getLogs({
    "fromBlock": w3.eth.blockNumber - 120,
    "address": w3.toChecksumAddress(ck_token_addr),
    "topics": [ck_extra_events_abi[1]]
})

recent_births = [get_event_data(ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## Popularne NFT {#popular-nfts}

- [Etherscan NFT Tracker](https://etherscan.io/tokens-nft) wyświetla listę najpopularniejszych NFT na Ethereum według wielkości transferów.
- [CryptoKitties](https://www.cryptokitties.co/) to gra skoncentrowana wokół rozmnażania, kolekcjonerskiego i słodkich stworzonek – CryptoKitties.
- [Sorare](https://sorare.com/) to globalna gra piłkarska fantasy, w której możesz zbierać limitowane edycje przedmiotów kolekcjonerskich, zarządzać swoimi zespołami i konkurować o zdobycie nagród.
- [Usługa Nazw Ethereum (ENS)](https://ens.domains/) oferuje bezpieczny i zdecentralizowany sposób na zajęcie się zasobami w i poza łańcuchem bloków przy użyciu prostych imiona czytelne dla człowieka.
- [Unstoppable Domains](https://unstoppabledomains.com/) jest to firma z San Francisco budująca domeny w blockchainach. Domeny blockchainu zastępują adresy kryptowalut nazwami czytelnymi dla człowieka i mogą być używane do włączenia stron odpornych na cenzurę.
- [Gods Unchained Cards](https://godsunchained.com/) to TCG w blockchainie Ethereum, który używa NFT do zapewnienia rzeczywistego prawa własności w grze.

## Dalsza lektura {#further-reading}

- [EIP-721: ERC-721 – standard tokenów niewymiennych](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin – dokumentacja ERC-721](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin – implementacja ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)

## Powiązane tematy {#related-topics}

- [ERC-20](/developers/docs/standards/tokens/erc-20/)
- [ERC-777](/developers/docs/standards/tokens/erc-777/)
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/)
