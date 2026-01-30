---
title: ERC-721 – standard tokenów niewymiennych
description: Dowiedz się więcej o ERC-721, standardzie dotyczącym tokenów niezamiennych (NFT), które reprezentują unikalne zasoby cyfrowe Ethereum.
lang: pl
---

## Wprowadzenie {#introduction}

**Czym jest niewymienny token (NFT)?**

Niewymienny token (NFT) służy do identyfikacji czegoś lub kogoś w unikalny sposób. Ten typ tokenu jest idealny do
użycia na platformach, które oferują przedmioty kolekcjonerskie, klucze dostępu, bilety loteryjne, numerowane miejsca na koncerty i
mecze sportowe itp. Ten specjalny rodzaj tokena ma niesamowite możliwości, dlatego załuguje na właściwy standart i ERC-721 jest tym standardem.

**Czym jest ERC-721?**

ERC-721 wprowadza standard dla NFT, innymi słowy ten typ tokena jest unikalny i może mieć różną wartość
niż inny token z tego samego inteligentnego kontraktu, być może ze względu na jego wiek, rzadkość, a nawet coś innego, jak jego wygląd.
Czekaj, wizualnie?

Tak! Wszystkie NFT mają zmienną `uint256` o nazwie `tokenId`, więc dla każdego kontraktu ERC-721 para `adres kontraktu, uint256 tokenId` musi być globalnie unikalna. To powiedziawszy, dappka może mieć „konwerter”, który używa `tokenId` jako danych wejściowych i wyświetla obraz czegoś fajnego, na przykład zombie, broni, umiejętności lub niesamowitych kociaków!

## Wymagania wstępne {#prerequisites}

- [Konta](/developers/docs/accounts/)
- [Inteligentne kontrakty](/developers/docs/smart-contracts/)
- [Standardy tokenów](/developers/docs/standards/tokens/)

## Treść {#body}

ERC-721 (Ethereum Request for Comments 721), zaproponowany przez Williama Entrikena, Dietera Shirleya, Jacoba Evansa, Nastassia Sachs w styczniu 2018 r. to standard tokenów niewymiennych, który implementuje interfejs API dla tokenów w ramach inteligentnych kontraktów.

Zapewnia funkcjonalności, takie jak transfer tokenów z jednego konta na drugie, uzyskanie aktualnego salda tokenów na koncie, uzyskanie informacji o właścicielu określonego tokena, a także o całkowitej podaży tokena dostępnej w sieci.
Poza tym ma również kilka innych funkcji, takich jak zatwierdzanie, że ilość tokenu z konta może być
wydana przez konto osób trzecich.

Jeśli inteligentny kontrakt implementuje następujące metody i zdarzenia, można go nazwać kontraktem tokenów niewymiennych ERC-721
, a po wdrożeniu będzie odpowiedzialny za śledzenie utworzonych tokenów w Ethereum.

Na podstawie [EIP-721](https://eips.ethereum.org/EIPS/eip-721):

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

Zobaczmy, dlaczego standard jest tak ważny, aby ułatwić nam sprawdza kontraktów z tokenami ERC-721 na Ethereum.
Potrzebujemy tylko interfejsu binarnego Umowy (ABI), aby utworzyć interfejs dla każdego tokenu ERC-721. Jak możesz
zobaczyć poniżej, użyjemy uproszczonego ABI, aby zmniejszyć złożoność przykładu.

#### Przykład Web3.py {#web3py-example}

Najpierw upewnij się, że masz zainstalowaną bibliotekę Pythona [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # Kontrakt CryptoKitties

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # Aukcja sprzedaży CryptoKitties

# To jest uproszczony binarny interfejs aplikacji kontraktu (ABI) kontraktu ERC-721 NFT.
# Udostępnia on tylko następujące metody: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
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
print(f"{name} [{symbol}] NFT na aukcjach: {kitties_auctions}")

pregnant_kitties = ck_contract.functions.pregnantKitties().call()
print(f"{name} [{symbol}] Ciężarne NFT: {pregnant_kitties}")

# Użycie ABI zdarzenia Transfer do uzyskania informacji o przetransferowanych Kociakach.
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# Potrzebujemy sygnatury zdarzenia do filtrowania logów
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# Uwagi:
#   - Zwiększ liczbę bloków powyżej 120, jeśli żadne zdarzenie Transfer nie zostanie zwrócone.
#   - Jeśli nie znalazłeś żadnego zdarzenia Transfer, możesz również spróbować uzyskać tokenId pod adresem:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       Kliknij, aby rozwinąć logi zdarzenia i skopiować jego argument „tokenId”
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # Wklej tutaj „tokenId” z powyższego linku
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFT {kitty_id} jest w ciąży: {is_pregnant}")
```

Kontrakt CryptoKitties zawiera kilka ciekawych wydarzeń poza standardowymi.

Sprawdźmy dwa z nich, `Pregnant` i `Birth`.

```python
# Użycie ABI zdarzeń Pregnant i Birth do uzyskania informacji o nowych Kociakach.
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

# Potrzebujemy sygnatury zdarzenia do filtrowania logów
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

- [Etherscan NFT Tracker](https://etherscan.io/nft-top-contracts) wyświetla listę najpopularniejszych NFT na Ethereum według wolumenu transferów.
- [CryptoKitties](https://www.cryptokitties.co/) to gra o hodowaniu i kolekcjonowaniu przesłodkich stworzeń, które nazywamy CryptoKitties.
- [Sorare](https://sorare.com/) to globalna gra piłkarska typu fantasy, w której można zbierać przedmioty kolekcjonerskie z limitowanych edycji, zarządzać swoimi drużynami i rywalizować o nagrody.
- [Usługa nazw Ethereum (ENS)](https://ens.domains/) oferuje bezpieczny i zdecentralizowany sposób adresowania zasobów zarówno w blockchainie, jak i poza nim, przy użyciu prostych, czytelnych dla człowieka nazw.
- [POAP](https://poap.xyz) dostarcza darmowe NFT osobom, które uczestniczą w wydarzeniach lub wykonują określone działania. POAPy tworzy się i rozpowszechnia za darmo.
- [Unstoppable Domains](https://unstoppabledomains.com/) to firma z siedzibą w San Francisco, która tworzy domeny na blockchainach. Domeny blockchain zastępują adresy kryptowalut nazwami czytelnymi dla człowieka i mogą być używane do tworzenia stron internetowych odpornych na cenzurę.
- [Gods Unchained Cards](https://godsunchained.com/) to gra karciana TCG na blockchainie Ethereum, która wykorzystuje NFT do zapewnienia prawdziwej własności aktywów w grze.
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) to kolekcja 10 000 unikalnych NFT, która oprócz tego, że jest dziełem sztuki o udowodnionej rzadkości, działa jako token członkowski klubu, zapewniając członkom przywileje i korzyści, które z czasem rosną w wyniku wysiłków społeczności.

## Dalsza lektura {#further-reading}

- [EIP-721: Standard tokena niewymiennego ERC-721](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - Dokumentacja ERC-721](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - Implementacja ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)
