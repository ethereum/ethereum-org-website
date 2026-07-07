---
title: "Стандарт токенов ERC-20"
description: "Узнайте об ERC-20, стандарте взаимозаменяемых токенов в Эфириуме, который позволяет создавать интероперабельные приложения для токенов."
lang: ru
---

## Введение {#introduction}

**Что такое токен?**

Токены могут представлять практически что угодно в [Эфириуме](/):

- очки репутации на онлайн-платформе
- навыки персонажа в игре
- финансовые активы, такие как доля в компании
- фиатную валюту, такую как USD
- унцию золота
- и многое другое...

Такая мощная функция Эфириума должна управляться надежным стандартом, верно? Именно здесь ERC-20 играет свою роль! Этот стандарт позволяет разработчикам создавать приложения для токенов, которые интероперабельны с другими продуктами и сервисами. Стандарт ERC-20 также используется для предоставления дополнительных функций [эфиру](/glossary/#ether).

**Что такое ERC-20?**

ERC-20 вводит стандарт для взаимозаменяемых токенов. Иными словами, они обладают свойством, которое делает каждый токен абсолютно идентичным (по типу и стоимости) другому токену. Например, токен ERC-20 действует так же, как ETH, что означает, что 1 токен есть и всегда будет равен всем остальным токенам.

## Предварительные требования {#prerequisites}

- [Аккаунты](/developers/docs/accounts)
- [Смарт-контракты](/developers/docs/smart-contracts/)
- [Стандарты токенов](/developers/docs/standards/tokens/)

## Основная часть {#body}

ERC-20 (Ethereum Request for Comments 20), предложенный Фабианом Фогельштеллером (Fabian Vogelsteller) в ноябре 2015 года, — это стандарт токенов, который реализует API для токенов внутри смарт-контрактов.

Примеры функций, которые предоставляет ERC-20:

- перевод токенов с одного аккаунта на другой
- получение текущего баланса токенов аккаунта
- получение общего предложения токена, доступного в сети
- одобрение того, может ли определенное количество токенов с аккаунта быть потрачено сторонним аккаунтом

Если смарт-контракт реализует следующие методы и события, его можно назвать контрактом токена ERC-20, и после развертывания он будет отвечать за отслеживание созданных токенов в Эфириуме.

Из [EIP-20](https://eips.ethereum.org/EIPS/eip-20):

### Методы {#methods}

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
function approve(address _spender, uint256 _value) public returns (bool success)
function allowance(address _owner, address _spender) public view returns (uint256 remaining)
```

### События {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### Примеры {#web3py-example}

Давайте посмотрим, насколько важен стандарт для упрощения проверки любого контракта токена ERC-20 в Эфириуме. Нам просто нужен двоичный интерфейс приложения (ABI) контракта, чтобы создать интерфейс для любого токена ERC-20. Как вы можете видеть ниже, мы будем использовать упрощенный ABI, чтобы сделать этот пример максимально понятным.

#### Пример с Web3.py {#web3py-example-2}

Сначала убедитесь, что вы установили библиотеку Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # Обернутый эфир (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Юнисвоп V2: DAI 2

# Это упрощенный бинарный интерфейс приложения (ABI) контракта токена ERC-20.
# Он предоставляет только методы: balanceOf(address), decimals(), symbol() и totalSupply()
simplified_abi = [
    {
        'inputs': [{'internalType': 'address', 'name': 'account', 'type': 'address'}],
        'name': 'balanceOf',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'decimals',
        'outputs': [{'internalType': 'uint8', 'name': '', 'type': 'uint8'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
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
    }
]

dai_contract = w3.eth.contract(address=w3.to_checksum_address(dai_token_addr), abi=simplified_abi)
symbol = dai_contract.functions.symbol().call()
decimals = dai_contract.functions.decimals().call()
totalSupply = dai_contract.functions.totalSupply().call() / 10**decimals
addr_balance = dai_contract.functions.balanceOf(acc_address).call() / 10**decimals

#  DAI
print("===== %s =====" % symbol)
print("Total Supply:", totalSupply)
print("Addr Balance:", addr_balance)

weth_contract = w3.eth.contract(address=w3.to_checksum_address(weth_token_addr), abi=simplified_abi)
symbol = weth_contract.functions.symbol().call()
decimals = weth_contract.functions.decimals().call()
totalSupply = weth_contract.functions.totalSupply().call() / 10**decimals
addr_balance = weth_contract.functions.balanceOf(acc_address).call() / 10**decimals

#  WETH
print("===== %s =====" % symbol)
print("Total Supply:", totalSupply)
print("Addr Balance:", addr_balance)
```

## Известные проблемы {#erc20-issues}

### Проблема получения токенов ERC-20 {#reception-issue}

**По состоянию на 20.06.2024 из-за этой проблемы было потеряно токенов ERC-20 на сумму не менее 83 656 418 долларов США. Обратите внимание, что чистая реализация ERC-20 подвержена этой проблеме, если вы не внедрите набор дополнительных ограничений поверх стандарта, как указано ниже.**

Когда токены ERC-20 отправляются на смарт-контракт, который не предназначен для обработки токенов ERC-20, эти токены могут быть безвозвратно утеряны. Это происходит потому, что получающий контракт не имеет функциональности для распознавания или реагирования на входящие токены, а в стандарте ERC-20 нет механизма для уведомления получающего контракта о входящих токенах. Основные формы проявления этой проблемы:

1.	Механизм перевода токенов
  - Токены ERC-20 переводятся с использованием функций transfer или transferFrom
	-	Когда пользователь отправляет токены на адрес контракта с помощью этих функций, токены переводятся независимо от того, предназначен ли получающий контракт для их обработки
2.	Отсутствие уведомления
	-	Получающий контракт не получает уведомления или обратного вызова о том, что ему были отправлены токены
	-	Если у получающего контракта нет механизма для обработки токенов (например, резервной функции или специальной функции для управления получением токенов), токены фактически застревают на адресе контракта
3.	Отсутствие встроенной обработки
	-	Стандарт ERC-20 не включает обязательную функцию для реализации получающими контрактами, что приводит к ситуации, когда многие контракты не могут должным образом управлять входящими токенами

**Возможные решения**

Хотя полностью предотвратить эту проблему с ERC-20 невозможно, существуют методы, которые позволили бы значительно снизить вероятность потери токенов для конечного пользователя:

- Самая распространенная проблема возникает, когда пользователь отправляет токены на адрес самого контракта токена (например, USDT вносится на адрес контракта токена USDT). Рекомендуется ограничить функцию `transfer(..)`, чтобы вызывать откат таких попыток перевода. Рассмотрите возможность добавления проверки `require(_to != address(this));` в реализацию функции `transfer(..)`.
- Функция `transfer(..)` в целом не предназначена для внесения токенов на контракты. Вместо этого для внесения токенов ERC-20 на контракты используется паттерн `approve(..) & transferFrom(..)`. Можно ограничить функцию перевода, чтобы запретить внесение токенов на любые контракты с ее помощью, однако это может нарушить совместимость с контрактами, которые предполагают, что токены могут быть внесены на контракты с помощью функции `transfer(..)` (например, пулы ликвидности Юнисвоп).
- Всегда исходите из того, что токены ERC-20 могут оказаться в вашем контракте, даже если ваш контракт вообще не должен их получать. Не существует способа предотвратить или отклонить случайные депозиты на стороне получателя. Рекомендуется реализовать функцию, которая позволила бы извлекать случайно внесенные токены ERC-20.
- Рассмотрите возможность использования альтернативных стандартов токенов.

Из-за этой проблемы появились некоторые альтернативные стандарты, такие как [ERC-223](/developers/docs/standards/tokens/erc-223) или [ERC-1363](/developers/docs/standards/tokens/erc-1363).

## Дополнительная литература {#further-reading}

- [EIP-20: Стандарт токенов ERC-20](https://eips.ethereum.org/EIPS/eip-20)
- [ОпенЗеппелин - Токены](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [ОпенЗеппелин - Реализация ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Руководство по токенам ERC20 на Solidity](https://www.alchemy.com/overviews/erc20-solidity)

## Другие стандарты взаимозаменяемых токенов {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - Токенизированные хранилища](/developers/docs/standards/tokens/erc-4626)

## Руководства: Создание с использованием ERC-20 в Эфириуме {#tutorials}

- [Пошаговое руководство по контракту ERC-20](/developers/tutorials/erc20-annotated-code/) _— построчный аннотированный разбор реализации контракта ERC-20 от ОпенЗеппелин._
- [ERC-20 с мерами безопасности](/developers/tutorials/erc20-with-safety-rails/) _— как добавить защитные механизмы в токены ERC-20, чтобы помочь пользователям избежать распространенных ошибок._
- [Отправка токенов с использованием Ethers.js](/developers/tutorials/send-token-ethersjs/) _— руководство для начинающих по переводу токенов ERC-20 с помощью Ethers.js._
- [Некоторые уловки, используемые мошенническими токенами, и как их обнаружить](/developers/tutorials/scam-token-tricks/) _— подробный разбор паттернов мошеннических токенов ERC-20 и способов их выявления._