---
title: "Стандарт невзаимозаменяемых токенов ERC-721"
description: "Узнайте об ERC-721, стандарте невзаимозаменяемых токенов (NFT), которые представляют уникальные цифровые активы в Эфириуме."
lang: ru
---

## Введение {#introduction}

**Что такое невзаимозаменяемый токен?**

Невзаимозаменяемый токен (NFT) используется для уникальной идентификации чего-либо или кого-либо. Этот тип токенов идеально подходит для использования на платформах, предлагающих коллекционные предметы, ключи доступа, лотерейные билеты, пронумерованные места на концертах и спортивных матчах и т. д. Этот особый тип токенов обладает потрясающими возможностями, поэтому он заслуживает надлежащего стандарта, и ERC-721 был создан для решения этой задачи!

**Что такое ERC-721?**

ERC-721 вводит стандарт для NFT, иными словами, этот тип токенов уникален и может иметь иную ценность, чем другой токен из того же смарт-контракта, возможно, из-за его возраста, редкости или даже чего-то еще, например, его внешнего вида. Подождите, внешнего вида?

Да! Все NFT имеют переменную `uint256` под названием `tokenId`, поэтому для любого контракта ERC-721 пара `contract address, uint256 tokenId` должна быть глобально уникальной. Тем не менее, децентрализованное приложение (dapp) может иметь «конвертер», который использует `tokenId` в качестве входных данных и выводит изображение чего-то крутого, например, зомби, оружия, навыков или удивительных котиков!

## Предварительные требования {#prerequisites}

- [Аккаунты](/developers/docs/accounts/)
- [Смарт-контракты](/developers/docs/smart-contracts/)
- [Стандарты токенов](/developers/docs/standards/tokens/)

## Основная часть {#body}

ERC-721 ([Ethereum](/) Request for Comments 721), предложенный Уильямом Энтрикеном (William Entriken), Дитером Ширли (Dieter Shirley), Джейкобом Эвансом (Jacob Evans) и Настасьей Сакс (Nastassia Sachs) в январе 2018 года, представляет собой стандарт невзаимозаменяемых токенов, который реализует API для токенов внутри смарт-контрактов.

Он предоставляет такие функции, как перевод токенов с одного аккаунта на другой, получение текущего баланса токенов аккаунта, получение владельца определенного токена, а также общего предложения токенов, доступного в сети. Кроме того, он также имеет некоторые другие функции, такие как одобрение того, что определенное количество токенов с аккаунта может быть перемещено сторонним аккаунтом.

Если смарт-контракт реализует следующие методы и события, его можно назвать контрактом невзаимозаменяемых токенов ERC-721, и после развертывания он будет отвечать за отслеживание созданных токенов в Эфириуме.

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

Давайте посмотрим, насколько важен стандарт для того, чтобы упростить нам проверку любого контракта токенов ERC-721 в Эфириуме. Нам просто нужен двоичный интерфейс приложения (ABI) контракта, чтобы создать интерфейс для любого токена ERC-721. Как вы можете видеть ниже, мы будем использовать упрощенный ABI, чтобы сделать этот пример максимально понятным.

#### Пример с Web3.py {#web3py-example-2}

Сначала убедитесь, что вы установили библиотеку Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # Контракт Криптокотиков

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # Аукцион продаж Криптокотиков

# Это упрощенный двоичный интерфейс приложения (ABI) NFT-контракта ERC-721.
# Он будет предоставлять только методы: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
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

# Использование ABI события Transfer для получения информации о переведенных котиках.
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# Нам нужна сигнатура события, чтобы отфильтровать логи
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# Примечания:
#   - Увеличьте количество блоков с 120, если не возвращено ни одного события Transfer.
#   - Если вы не нашли ни одного события Transfer, вы также можете попытаться получить tokenId по ссылке:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       Нажмите, чтобы развернуть логи события, и скопируйте его аргумент "tokenId"
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # Вставьте "tokenId" из ссылки выше сюда
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

Контракт Криптокотиков имеет некоторые интересные события, отличные от стандартных.

Давайте проверим два из них: `Pregnant` и `Birth`.

```python
# Использование ABI событий Pregnant и Birth для получения информации о новых котиках.
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

# Нам нужна сигнатура события, чтобы отфильтровать логи
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

- [Etherscan NFT Tracker](https://etherscan.io/nft-top-contracts) — список лучших NFT в Эфириуме по объему переводов.
- [Криптокотики](https://www.cryptokitties.co/) — это игра, в центре которой находятся разводимые, коллекционные и невероятно очаровательные существа, которых мы называем Криптокотиками.
- [Sorare](https://sorare.com/) — это глобальная фэнтези-игра о футболе, в которой вы можете собирать коллекционные предметы ограниченного выпуска, управлять своими командами и соревноваться за призы.
- [Служба имен Ethereum (ENS)](https://ens.domains/) предлагает безопасный и децентрализованный способ адресации ресурсов как внутри, так и вне блокчейна с использованием простых, удобочитаемых имен.
- [POAP](https://poap.xyz) доставляет бесплатные NFT людям, которые посещают мероприятия или выполняют определенные действия. POAP можно создавать и распространять бесплатно.
- [Unstoppable Domains](https://unstoppabledomains.com/) — компания из Сан-Франциско, создающая домены на блокчейнах. Блокчейн-домены заменяют адреса криптовалют на удобочитаемые имена и могут использоваться для создания устойчивых к цензуре веб-сайтов.
- [Gods Unchained Cards](https://godsunchained.com/) — это коллекционная карточная игра (TCG) на блокчейне Эфириума, которая использует NFT для обеспечения реального права собственности на внутриигровые активы.
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) — это коллекция из 10 000 уникальных NFT, которые, помимо того, что являются доказуемо редким произведением искусства, действуют как токен членства в клубе, предоставляя привилегии и преимущества участникам, которые со временем увеличиваются в результате усилий сообщества.

## Дополнительная литература {#further-reading}

- [EIP-721: Стандарт невзаимозаменяемых токенов ERC-721](https://eips.ethereum.org/EIPS/eip-721)
- [ОпенЗеппелин — Документация по ERC-721](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [ОпенЗеппелин — Реализация ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)

## Руководства: Создание с использованием невзаимозаменяемых токенов (ERC-721) в Эфириуме {#tutorials}

- [Пошаговое руководство по контракту ERC-721 на Vyper](/developers/tutorials/erc-721-vyper-annotated-code/) _— Аннотированное пошаговое руководство по полному контракту NFT ERC-721, написанному на Vyper._
- [Как написать и развернуть NFT (Часть 1/3)](/developers/tutorials/how-to-write-and-deploy-an-nft/) _— Пошаговое руководство по написанию и развертыванию вашего первого смарт-контракта ERC-721._
- [Как чеканить NFT (Часть 2/3)](/developers/tutorials/how-to-mint-an-nft/) _— Как чеканить NFT ERC-721 с использованием вашего развернутого смарт-контракта и Web3._
- [Как просмотреть свой NFT в кошельке (Часть 3/3)](/developers/tutorials/how-to-view-nft-in-metamask/) _— Как отобразить ваш отчеканенный NFT в МетаМаск после развертывания._
- [Руководство по чеканке NFT](/developers/tutorials/nft-minter/) _— Создание полнофункционального децентрализованного приложения (dapp) для чеканки NFT с фронтендом на React, МетаМаск и Alchemy._