---
title: "Стандарт невзаємозамінних токенів ERC-721"
description: "Дізнайтеся про ERC-721, стандарт для невзаємозамінних токенів (NFT), які представляють унікальні цифрові активи в Етеріумі."
lang: uk
---

## Вступ {#introduction}

**Що таке невзаємозамінний токен?**

Невзаємозамінний токен (NFT) використовується для унікальної ідентифікації чогось або когось. Цей тип токенів ідеально підходить для використання на платформах, які пропонують колекційні предмети, ключі доступу, лотерейні білети, пронумеровані місця на концертах і спортивних матчах тощо. Цей особливий тип токенів має неймовірні можливості, тому він заслуговує на належний стандарт, і ERC-721 був створений саме для цього!

**Що таке ERC-721?**

ERC-721 запроваджує стандарт для NFT. Іншими словами, цей тип токенів є унікальним і може мати іншу цінність, ніж інший токен з того ж смарт-контракту, можливо, через його вік, рідкість або навіть щось інше, наприклад, його зовнішній вигляд. Зачекайте, зовнішній вигляд?

Так! Усі NFT мають змінну `uint256`, яка називається `tokenId`, тому для будь-якого контракту ERC-721 пара `contract address, uint256 tokenId` має бути глобально унікальною. З огляду на це, децентралізований застосунок (dapp) може мати «конвертер», який використовує `tokenId` як вхідні дані та виводить зображення чогось крутого, наприклад, зомбі, зброї, навичок або дивовижних кошенят!

## Передумови {#prerequisites}

- [Акаунти](/developers/docs/accounts/)
- [Смарт-контракти](/developers/docs/smart-contracts/)
- [Стандарти токенів](/developers/docs/standards/tokens/)

## Основна частина {#body}

ERC-721 ([Ethereum](/) Request for Comments 721), запропонований Вільямом Ентрікеном (William Entriken), Дітером Ширлі (Dieter Shirley), Джейкобом Евансом (Jacob Evans) та Настасією Сакс (Nastassia Sachs) у січні 2018 року, є стандартом невзаємозамінних токенів, який реалізує API для токенів у смарт-контрактах.

Він надає такі функції, як переказ токенів з одного акаунта на інший, отримання поточного балансу токенів акаунта, визначення власника певного токена, а також загальної пропозиції токенів, доступних у мережі. Крім цього, він також має деякі інші функції, наприклад, схвалювати переміщення певної кількості токенів з акаунта стороннім акаунтом.

Якщо смарт-контракт реалізує наведені нижче методи та події, його можна назвати контрактом невзаємозамінних токенів ERC-721, і після розгортання він відповідатиме за відстеження створених токенів в Етеріумі.

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

Давайте подивимося, наскільки важливим є стандарт для спрощення перевірки будь-якого контракту токенів ERC-721 в Етеріумі. Нам потрібен лише двійковий інтерфейс застосунку (ABI) контракту, щоб створити інтерфейс для будь-якого токена ERC-721. Як ви можете бачити нижче, ми будемо використовувати спрощений ABI, щоб зробити цей приклад максимально зрозумілим.

#### Приклад з Web3.py {#web3py-example-2}

Спочатку переконайтеся, що ви встановили бібліотеку Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # Контракт CryptoKitties

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # Аукціон з продажу CryptoKitties

# Це спрощений двійковий інтерфейс застосунку (ABI) контракту NFT ERC-721.
# Він надаватиме доступ лише до методів: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
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

# Використовуємо ABI події переказу, щоб отримати інформацію про переказаних котиків.
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# Нам потрібен підпис події, щоб відфільтрувати журнали
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# Примітки:
#   - Збільште кількість блоків понад 120, якщо не повернуто жодної події переказу.
#   - Якщо ви не знайшли жодної події переказу, ви також можете спробувати отримати tokenId за адресою:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       Натисніть, щоб розгорнути журнали події, та скопіюйте її аргумент "tokenId"
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # Вставте "tokenId" сюди з посилання вище
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

Контракт CryptoKitties має деякі цікаві події, окрім стандартних.

Давайте розглянемо дві з них: `Pregnant` та `Birth`.

```python
# Використовуємо ABI подій Pregnant та Birth, щоб отримати інформацію про нових котиків.
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

# Нам потрібен підпис події, щоб відфільтрувати журнали
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

- [Etherscan NFT Tracker](https://etherscan.io/nft-top-contracts) містить список найкращих NFT в Етеріумі за обсягом переказів.
- [CryptoKitties](https://www.cryptokitties.co/) — це гра, зосереджена навколо колекційних і дуже чарівних істот, яких можна розводити і яких ми називаємо CryptoKitties.
- [Sorare](https://sorare.com/) — це глобальна фентезі-гра у футбол, де ви можете збирати лімітовані колекційні предмети, керувати своїми командами та змагатися за призи.
- [Служба імен Етеріуму (ENS)](https://ens.domains/) пропонує безпечний і децентралізований спосіб адресації ресурсів як у блокчейні, так і поза ним, використовуючи прості, зрозумілі людині імена.
- [POAP](https://poap.xyz) надає безкоштовні NFT людям, які відвідують події або виконують певні дії. POAP можна створювати та розповсюджувати безкоштовно.
- [Unstoppable Domains](https://unstoppabledomains.com/) — це компанія з Сан-Франциско, яка створює домени на блокчейнах. Блокчейн-домени замінюють адреси криптовалют на зрозумілі людині імена і можуть використовуватися для створення стійких до цензури вебсайтів.
- [Gods Unchained Cards](https://godsunchained.com/) — це колекційна карткова гра (TCG) на блокчейні Етеріум, яка використовує NFT для забезпечення реального права власності на внутрішньоігрові активи.
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) — це колекція з 10 000 унікальних NFT, які, окрім того, що є доказово рідкісними витворами мистецтва, діють як токен членства в клубі, надаючи учасникам привілеї та переваги, що з часом зростають завдяки зусиллям спільноти.

## Подальше читання {#further-reading}

- [EIP-721: Стандарт невзаємозамінних токенів ERC-721](https://eips.ethereum.org/EIPS/eip-721)
- [ОупенЗеппелін — Документація ERC-721](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [ОупенЗеппелін — Реалізація ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)

## Посібники: Створення з використанням невзаємозамінних токенів (ERC-721) в Етеріумі {#tutorials}

- [Огляд контракту ERC-721 на Vyper](/developers/tutorials/erc-721-vyper-annotated-code/) _— Анотований огляд повного контракту NFT ERC-721, написаного на Vyper._
- [Як написати та розгорнути NFT (Частина 1/3)](/developers/tutorials/how-to-write-and-deploy-an-nft/) _— Покроковий посібник із написання та розгортання вашого першого смарт-контракту ERC-721._
- [Як карбувати NFT (Частина 2/3)](/developers/tutorials/how-to-mint-an-nft/) _— Як карбувати NFT ERC-721 за допомогою розгорнутого смарт-контракту та Web3._
- [Як переглянути свій NFT у гаманці (Частина 3/3)](/developers/tutorials/how-to-view-nft-in-metamask/) _— Як відобразити викарбуваний NFT у МетаМаск після розгортання._
- [Посібник зі створення карбувальника NFT](/developers/tutorials/nft-minter/) _— Створіть повноцінний децентралізований застосунок (dapp) для карбування NFT із фронтендом на React, МетаМаск та Alchemy._