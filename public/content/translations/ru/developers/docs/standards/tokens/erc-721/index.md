---
title: "Стандарт невзаимозаменяемых токенов ERC-721"
description: "Узнайте о ERC-721, стандарте для невзаимозаменяемых токенов (NFT), которые представляют собой уникальные цифровые активы в сети Ethereum."
lang: ru
---

## Введение {#introduction}

**Что такое невзаимозаменяемый токен?**

Невзаимозаменяемые токены (NFT) используются для уникальной идентификации чего-то или кого-то. Этот тип токена идеально подходит для использования на платформах, предлагающих коллекционные предметы, ключи доступа, лотерейные билеты, пронумерованные места на концерты, спортивные матчи и т.д. Этот особый тип токена имеет удивительные возможности, поэтому он заслуживает надлежащего стандарта, ERC-721 призван решить эту проблему!

**Что такое ERC-721?**

ERC-721 вводит стандарт для NFT, другими словами, этот тип токена уникален и может иметь значение, отличное от другого токена из того же смарт-контракта, возможно, из-за его возраста, редкости или даже из-за чего-то другого, например его внешнего вида.
Подожди, визуально?

Да! У всех NFT есть переменная `uint256` под названием `tokenId`, поэтому для любого контракта ERC-721 пара
`contract address, uint256 tokenId` должна быть глобально уникальной. При этом у децентрализованного приложения может быть "конвертер", который
использует `tokenId` в качестве входных данных и выводит изображение чего-то классного, например: зомби, оружия, навыков или удивительных котят!

## Предварительные условия {#prerequisites}

- [Аккаунты](/developers/docs/accounts/)
- [Смарт-контракты](/developers/docs/smart-contracts/)
- [Стандарты токенов](/developers/docs/standards/tokens/)

## Тело {#body}

ERC-721 (Ethereum Request for Comments 721), предложенный Уильямом Энтрикеном, Дитером Ширли, Якобом Эвансом и Настасьей Сакс в январе 2018 года, является стандартом невзаимозаменяемых токенов, который реализует API для токенов в смарт-контрактах.

Он предоставляет такие функции, как: перенос токенов из одной учетной записи в другую, получение текущего баланса токенов учетной записи, узнать кто владелец определенного токена, а также узнать общее количество токенов, доступных в сети.
Помимо этого, он также имеет некоторые другие функции, такие как подтверждение того, что количество токенов из учетной записи может быть перемещено сторонней учетной записью.

Если в смарт-контракте реализованы следующие методы и события, его можно назвать контрактом невзаимозаменяемых токенов ERC-721, и после развертывания он будет нести ответственность за отслеживание созданных токенов в Ethereum.

Из [EIP-721](https://eips.ethereum.org/EIPS/eip-721):

### Методы {#methods}

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

### События {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### Примеры {#web3py-example}

Давайте посмотрим, насколько важен стандарт, чтобы упростить нам проверку любого контракта токена ERC-721 на Ethereum.
Нам просто нужен двоичный интерфейс приложения контракта (ABI) для создания интерфейса к любому токену ERC-721. Как вы можете увидеть ниже, мы будем использовать упрощенный ABI, чтобы сделать пример простым.

#### Пример Web3.py {#web3py-example}

Во-первых, убедитесь, что вы установили библиотеку Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # Контракт CryptoKitties

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # Аукцион по продаже CryptoKitties

# Это упрощенный двоичный интерфейс приложения (ABI) для контракта ERC-721 NFT.
# Он будет раскрывать только методы: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
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
print(f"{name} [{symbol}] NFT на аукционах: {kitties_auctions}")

pregnant_kitties = ck_contract.functions.pregnantKitties().call()
print(f"{name} [{symbol}] беременных NFT: {pregnant_kitties}")

# Используем ABI события Transfer для получения информации о переданных Kitties.
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# Нам нужна подпись события для фильтрации журналов
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# Примечания:
#   - Увеличьте количество блоков с 120, если событие Transfer не будет возвращено.
#   - Если вы не нашли событие Transfer, вы можете попытаться получить tokenId по адресу:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       Нажмите, чтобы развернуть журналы события и скопировать его аргумент "tokenId"
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # Вставьте сюда tokenId по ссылке выше
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFT {kitty_id} беременен: {is_pregnant}")
```

В контракте CryptoKitties есть несколько интересных событий, помимо стандартных.

Давайте проверим два из них: `Pregnant` и `Birth`.

```python
# Используем ABI событий Pregnant и Birth для получения информации о новых Kitties.
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

# Нам нужна подпись события для фильтрации журналов
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# Вот событие Pregnant:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# Вот событие Birth:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## Популярные NFT {#popular-nfts}

- [Etherscan NFT Tracker](https://etherscan.io/nft-top-contracts) перечисляет лучшие NFT на Ethereum по объему переводов.
- [CryptoKitties](https://www.cryptokitties.co/) — это игра, основанная на разведении и коллекционировании очаровательных
  существ, которых мы называем CryptoKitties.
- [Sorare](https://sorare.com/) — это глобальный фэнтези-футбол, в котором вы можете коллекционировать предметы ограниченного выпуска,
  управлять своими командами и соревноваться за призы.
- [Служба имён Ethereum (ENS)](https://ens.domains/) предлагает безопасный и децентрализованный способ адресации ресурсов как
  в блокчейне, так и за его пределами, используя простые, удобочитаемые имена.
- [POAP](https://poap.xyz) предоставляет бесплатные NFT людям, которые посещают мероприятия или выполняют определенные действия. POAP-ы бесплатные для создания и распространения.
- [Unstoppable Domains](https://unstoppabledomains.com/) — это компания из Сан-Франциско, которая создает домены на
  блокчейнах. Домены на блокчейне заменяют адреса криптовалют на удобочитаемые имена и могут использоваться для создания
  устойчивых к цензуре веб-сайтов.
- [Gods Unchained Cards](https://godsunchained.com/) — это ККИ (коллекционная карточная игра) в блокчейне Ethereum, которая использует NFT для обеспечения реального права собственности
  на внутриигровые активы.
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) — это коллекция из 10 000 уникальных NFT, которые, помимо того, что являются доказуемо редкими произведениями искусства, действуют как членский токен клуба, предоставляя участникам льготы и преимущества, которые со временем увеличиваются в результате усилий сообщества.

## Дополнительные материалы {#further-reading}

- [EIP-721: стандарт невзаимозаменяемых токенов ERC-721](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin — документация по ERC-721](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin — реализация ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)
