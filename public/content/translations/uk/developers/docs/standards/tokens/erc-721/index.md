---
title: ERC-721 Звичайний маркер
description: Дізнайтеся про ERC-721, стандарт для незамінних токенів (NFT), які представляють унікальні цифрові активи на Ethereum.
lang: uk
---

## Вступ {#introduction}

**Що таке невзаємозамінний токен?**

Невзаємозамінний токен використовується для визначення чогось або когось унікальним способом. Цей тип токену ідеальний для
використання на платформах, які пропонують зібрані елементи, ключі доступу, лотерейні квитки, нумеровані місця для концертів і
спортивних матчів тощо. Цей особливий тип токену має дивовижні можливості, тож заслуговує належного стандарту ERC-721, що вирішує це!

**Що таке ERC-721?**

ERC-721 представляє стандарт NFT, інакше кажучи, цей тип токену унікальний і може мати різні значення
інший токен з того ж Смарт-контракту, можливо через його вік, рідкість або ж навіть через дещо інше, як візуал.
Зачекайте, візуал?

Так! Усі NFT мають змінну `uint256` під назвою `tokenId`, тому для будь-якого контракту ERC-721 пара
`адреса контракту, uint256 tokenId` має бути глобально унікальною. При цьому децентралізований застосунок (dapp) може мати «конвертер», який
використовує `tokenId` як вхідні дані та виводить зображення чогось крутого, наприклад, зомбі, зброї, навичок або дивовижних кошенят!

## Передумови {#prerequisites}

- [Облікові записи](/developers/docs/accounts/)
- [Смарт-контракти](/developers/docs/smart-contracts/)
- [Стандарти токенів](/developers/docs/standards/tokens/)

## Основна частина {#body}

ERC-721, запропонований Вільямом Ентрікеном, Дітером Ширлі, Джейкобом Евансом, Анастасією Сачс в січні 2018, стандарт невзаємозамінного токену, що реалізує API для токенів в рамках Смарт контракту.

Він надає функції передавати токени з одного облікового запису в інший, щоб отримати поточний баланс токену з
аккаунту, щоб отримати власника конкретного токену, а також загальний запас токену, доступного в мережі.
Крім цього він також має деякі інші функції, як стверджувати, що сума токенів може бути переміщена на інший обліковий запис.

Якщо Смарт-контракт реалізує наступні методи та події, він може називатися ERC-721 невзаємозамінним токеном
і після розгортання, він несе відповідальність за відстеження створених токенів на Ethereum.

З [EIP-721](https://eips.ethereum.org/EIPS/eip-721):

### Методи {#methods}

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

### Події {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### Приклади {#web3py-example}

Давайте подивимося наскільки стандарт важливий для того, щоб зробити речі простішими для нас, щоб оглянути будь-який контракт токену ERC-721, на Ethereum.
Нам потрібен лише контракт двійкового програмного інтерфейсу для того щоб створити для будь-яких токенів ERC-721. Як ви можете побачити нижче, ми використовуємо спрощений ABI, щоб зробити чіткий приклад.

#### Приклад Web3.py {#web3py-example}

Спочатку переконайтеся, що ви встановили бібліотеку Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # Контракт CryptoKitties

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # Аукціон продажів CryptoKitties

# Це спрощений двійковий інтерфейс програми (ABI) контракту NFT ERC-721.
# Він надасть доступ лише до методів: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
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
print(f"{name} [{symbol}] NFT на аукціонах: {kitties_auctions}")

pregnant_kitties = ck_contract.functions.pregnantKitties().call()
print(f"{name} [{symbol}] Вагітних NFT: {pregnant_kitties}")

# Використання ABI події Transfer для отримання інформації про переказаних кошенят.
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# Нам потрібен підпис події для фільтрації логів
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# Примітки:
#   - Збільште кількість блоків понад 120, якщо подія Transfer не повертається.
#   - Якщо ви не знайшли жодної події Transfer, ви також можете спробувати отримати tokenId за адресою:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       Клацніть, щоб розгорнути логи події, і скопіюйте її аргумент "tokenId"
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # Вставте "tokenId" сюди за посиланням вище
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFT {kitty_id} вагітний: {is_pregnant}")
```

Контракт CryptoKitties має деякі цікаві події, відмінні від стандартних.

Давайте перевіримо два з них: `Pregnant` і `Birth`.

```python
# Використання ABI подій Pregnant та Birth для отримання інформації про нових кошенят.
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

# Нам потрібен підпис події для фільтрації логів
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# Ось подія Pregnant:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# Ось подія Birth:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## Популярні NFT {#popular-nfts}

- [Etherscan NFT Tracker](https://etherscan.io/nft-top-contracts) містить список найпопулярніших NFT на Ethereum за обсягом переказів.
- [CryptoKitties](https://www.cryptokitties.co/) — це гра, в основі якої лежить розведення, колекціонування та надзвичайно чарівних
  істот, яких ми називаємо CryptoKitties.
- [Sorare](https://sorare.com/) — це глобальна фентезі-гра у футбол, де ви можете збирати колекційні предмети обмеженого випуску,
  керувати своїми командами та змагатися за призи.
- [Служба імен Ethereum (ENS)](https://ens.domains/) пропонує безпечний і децентралізований спосіб адресувати ресурси як
  у блокчейні, так і поза ним, використовуючи прості, зрозумілі для людини імена.
- [POAP](https://poap.xyz) надає безкоштовні NFT людям, які відвідують заходи або виконують певні дії. POAPи можна створювати та поширювати безплатно.
- [Unstoppable Domains](https://unstoppabledomains.com/) — це компанія із Сан-Франциско, що створює домени на
  блокчейнах. Блокчейн-домени замінюють криптовалютні адреси на зрозумілі для людини імена та можуть використовуватися для створення
  стійких до цензури вебсайтів.
- [Gods Unchained Cards](https://godsunchained.com/) — це TCG (колекційна карткова гра) на блокчейні Ethereum, яка використовує NFT, щоб забезпечити реальне право власності
  на внутрішньоігрові активи.
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) — це колекція з 10 000 унікальних NFT, яка, окрім того, що є витвором мистецтва, рідкість якого можна довести, діє як членський токен клубу, надаючи учасникам привілеї та переваги, які з часом зростають у результаті зусиль спільноти.

## Для подальшого читання {#further-reading}

- [EIP-721: стандарт незамінних токенів ERC-721](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin — документація по ERC-721](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin — реалізація ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)
