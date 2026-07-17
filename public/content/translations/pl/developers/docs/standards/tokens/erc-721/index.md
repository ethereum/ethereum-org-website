---
title: Standard tokena niezamiennego (NFT) ERC-721
description: "Dowiedz się więcej o ERC-721, standardzie dla tokenów niezamiennych (NFT), które reprezentują unikalne zasoby cyfrowe w sieci Ethereum."
lang: pl
---

## Wprowadzenie {#introduction}

**Czym jest token niezamienny (NFT)?**

Token niezamienny (NFT) służy do unikalnej identyfikacji kogoś lub czegoś. Ten typ tokena idealnie nadaje się do wykorzystania na platformach oferujących przedmioty kolekcjonerskie, klucze dostępu, losy na loterię, numerowane miejsca na koncertach i meczach sportowych itp. Ten specjalny rodzaj tokena ma niesamowite możliwości, więc zasługuje na odpowiedni standard, a ERC-721 powstał, aby to rozwiązać!

**Czym jest ERC-721?**

ERC-721 wprowadza standard dla NFT, co oznacza, że ten typ tokena jest unikalny i może mieć inną wartość niż inny token z tego samego inteligentnego kontraktu, na przykład ze względu na jego wiek, rzadkość, a nawet coś innego, jak jego wygląd. Zaraz, wygląd?

Tak! Wszystkie NFT mają zmienną `uint256` o nazwie `tokenId`, więc dla każdego kontraktu ERC-721 para `contract address, uint256 tokenId` musi być globalnie unikalna. Oznacza to, że zdecentralizowana aplikacja (dapp) może mieć „konwerter”, który wykorzystuje `tokenId` jako dane wejściowe i generuje obraz czegoś fajnego, na przykład zombie, broni, umiejętności lub niesamowitych kotków!

## Wymagania wstępne {#prerequisites}

- [Konta](/developers/docs/accounts/)
- [Inteligentne kontrakty](/developers/docs/smart-contracts/)
- [Standardy tokenów](/developers/docs/standards/tokens/)

## Treść {#body}

ERC-721 ([Ethereum](/) Request for Comments 721), zaproponowany przez Williama Entrikena, Dietera Shirleya, Jacoba Evansa i Nastassię Sachs w styczniu 2018 roku, to standard tokena niezamiennego, który implementuje API dla tokenów w ramach inteligentnych kontraktów.

Zapewnia on funkcjonalności takie jak transfer tokenów z jednego konta na drugie, pobieranie aktualnego salda tokenów na koncie, sprawdzanie właściciela określonego tokena, a także całkowitej podaży tokena dostępnej w sieci. Oprócz tego posiada również inne funkcje, takie jak zatwierdzanie, że określona ilość tokenów z danego konta może zostać przeniesiona przez konto strony trzeciej.

Jeśli inteligentny kontrakt implementuje poniższe metody i zdarzenia, można go nazwać kontraktem tokena niezamiennego ERC-721, a po wdrożeniu będzie on odpowiedzialny za śledzenie utworzonych tokenów w sieci Ethereum.

Z [EIP-721](https://eips.ethereum.org/EIPS/eip-721):

### Metody {#methods}

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

### Zdarzenia {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### Przykłady {#web3py-example}

Zobaczmy, dlaczego standard jest tak ważny, aby ułatwić nam badanie dowolnego kontraktu tokena ERC-721 w sieci Ethereum. Potrzebujemy tylko binarnego interfejsu aplikacji (ABI) kontraktu, aby utworzyć interfejs do dowolnego tokena ERC-721. Jak widać poniżej, użyjemy uproszczonego ABI, aby przykład był jak najbardziej przystępny.

#### Przykład w Web3.py {#web3py-example-2}

Najpierw upewnij się, że masz zainstalowaną bibliotekę [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) dla języka Python:

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # Kontrakt CryptoKitties

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # Aukcja sprzedaży CryptoKitties

# To jest uproszczony interfejs binarny aplikacji (ABI) kontraktu NFT ERC-721.
# Udostępni on tylko metody: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
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

# Użycie ABI zdarzenia Transfer do uzyskania informacji o przetransferowanych kotkach.
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# Potrzebujemy sygnatury zdarzenia, aby przefiltrować logi
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# Uwagi:
#   - Zwiększ liczbę bloków powyżej 120, jeśli nie zostanie zwrócone żadne zdarzenie Transfer.
#   - Jeśli nie znalazłeś żadnego zdarzenia Transfer, możesz również spróbować pobrać tokenId pod adresem:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       Kliknij, aby rozwinąć logi zdarzenia i skopiować jego argument "tokenId"
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # Wklej tutaj "tokenId" z powyższego linku
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

Kontrakt CryptoKitties ma kilka interesujących zdarzeń innych niż te standardowe.

Sprawdźmy dwa z nich: `Pregnant` oraz `Birth`.

```python
# Użycie ABI zdarzeń Pregnant i Birth do uzyskania informacji o nowych kotkach.
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

# Potrzebujemy sygnatury zdarzenia, aby przefiltrować logi
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# Oto zdarzenie Pregnant:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# Oto zdarzenie Birth:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## Popularne NFT {#popular-nfts}

- [Etherscan NFT Tracker](https://etherscan.io/nft-top-contracts) wyświetla listę najlepszych NFT w sieci Ethereum według wolumenu transferów.
- [CryptoKitties](https://www.cryptokitties.co/) to gra skupiona wokół uroczych stworzeń, które można hodować i kolekcjonować, zwanych CryptoKitties.
- [Sorare](https://sorare.com/) to globalna gra fantasy football, w której możesz zbierać przedmioty kolekcjonerskie z limitowanych edycji, zarządzać swoimi drużynami i rywalizować o nagrody.
- [Ethereum Name Service (ENS)](https://ens.domains/) oferuje bezpieczny i zdecentralizowany sposób adresowania zasobów zarówno w blockchainie, jak i poza nim, przy użyciu prostych, czytelnych dla człowieka nazw.
- [POAP](https://poap.xyz) dostarcza darmowe NFT osobom, które uczestniczą w wydarzeniach lub wykonują określone działania. POAP-y można tworzyć i dystrybuować za darmo.
- [Unstoppable Domains](https://unstoppabledomains.com/) to firma z siedzibą w San Francisco, która tworzy domeny na blockchainach. Domeny blockchain zastępują adresy kryptowalut czytelnymi dla człowieka nazwami i mogą być używane do tworzenia stron internetowych odpornych na cenzurę.
- [Gods Unchained Cards](https://godsunchained.com/) to gra karciana (TCG) na blockchainie Ethereum, która wykorzystuje NFT, aby zapewnić graczom rzeczywistą własność zasobów w grze.
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) to kolekcja 10 000 unikalnych NFT, które oprócz tego, że są dziełami sztuki o udowodnionej rzadkości, działają jako tokeny członkowskie klubu, zapewniając członkom korzyści i przywileje, które z czasem rosną w wyniku działań społeczności.

## Dalsza lektura {#further-reading}

- [EIP-721: Standard tokena niezamiennego ERC-721](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin – dokumentacja ERC-721](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin – implementacja ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [API NFT od Alchemy](https://www.alchemy.com/docs/reference/nft-api-quickstart)

## Samouczki: Budowanie z użyciem tokenów niezamiennych (ERC-721) w sieci Ethereum {#tutorials}

- [Przewodnik po kontrakcie ERC-721 w języku Vyper](/developers/tutorials/erc-721-vyper-annotated-code/) _– Przewodnik z adnotacjami po pełnym kontrakcie NFT ERC-721 napisanym w języku Vyper._
- [Jak napisać i wdrożyć NFT (część 1/3)](/developers/tutorials/how-to-write-and-deploy-an-nft/) _– Przewodnik krok po kroku, jak napisać i wdrożyć swój pierwszy inteligentny kontrakt ERC-721._
- [Jak wybijać NFT (część 2/3)](/developers/tutorials/how-to-mint-an-nft/) _– Jak wybijać NFT ERC-721 przy użyciu wdrożonego inteligentnego kontraktu i Web3._
- [Jak wyświetlić NFT w swoim portfelu (część 3/3)](/developers/tutorials/how-to-view-nft-in-metamask/) _– Jak wyświetlić wybite NFT w portfelu MetaMask po wdrożeniu._
- [Samouczek tworzenia mintera NFT](/developers/tutorials/nft-minter/) _– Zbuduj pełnoprawną zdecentralizowaną aplikację (dapp) do wybijania NFT z frontendem w React, portfelem MetaMask i Alchemy._