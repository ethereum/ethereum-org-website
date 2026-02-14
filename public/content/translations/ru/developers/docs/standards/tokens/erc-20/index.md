---
title: "Стандарт токенов ERC- 20"
description: "Узнайте об ERC-20, стандарте для взаимозаменяемых токенов на Ethereum, который обеспечивает совместимость приложений для токенов."
lang: ru
---

## Введение {#introduction}

**Что такое токен?**

Токены в Ethereum могут представлять практически все, что угодно:

- баллы репутации на онлайн-платформе
- навыки персонажа в игре
- финансовые активы, такие как доля в компании
- фиатная валюта, как доллар США
- унция золота
- и многое другое...

Такая важная функция Ethereum должна обрабатываться надежным стандартом, верно? Именно эту роль выполняет ERC-20. Этот стандарт позволяет разработчикам создавать приложения для токенов, которые совместимы с другими продуктами и услугами. Стандарт ERC-20 также используется для предоставления дополнительной функциональности [эфиру](/glossary/#ether).

**Что такое ERC-20?**

ERC-20 вводит стандарт для взаимозаменяемых токенов, другими словами, они обладают свойством, которое делает каждый токен точно таким же (по типу и ценности), как и другой токен. Например, токен ERC-20 действует точно так же, как ETH, означая, что 1 токен всегда равен и всегда будет равен всем остальным токенам.

## Предварительные условия {#prerequisites}

- [Аккаунты](/developers/docs/accounts)
- [Смарт-контракты](/developers/docs/smart-contracts/)
- [Стандарты токенов](/developers/docs/standards/tokens/)

## Тело {#body}

ERC-20 (Ethereum Request for Comments 20), предложенный Фабианом Фогельстеллером в ноябре 2015 года, является стандартом токенов, который реализует API для токенов в смарт-контрактах.

Примеры функциональности, которую предоставляет ERC-20:

- перевод токенов с одного аккаунта на другой
- узнать текущий баланс токенов на счету
- узнать количество доступных токенов в сети
- подтвердить, может ли сумма токена со счета быть потрачена аккаунтом третьей стороны

Если Смарт-контракт реализует следующие методы и события, его можно назвать контрактом ERC-20 токенов, и после развертывания он будет отвечать за отслеживание созданных токенов в Ethereum.

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

Давайте разберемся почему Стандарт настолько важен, чтобы упростить для нас проверку любого контракта токена ERC-20 в Ethereum.
Нам просто нужен двоичный интерфейс приложения контракта (ABI) для создания интерфейса для любого токена ERC-20. Как вы можете увидеть ниже, мы будем использовать упрощенный ABI, чтобы сделать пример простым.

#### Пример Web3.py {#web3py-example}

Во-первых, убедитесь, что вы установили библиотеку Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # Обернутый эфир (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# Это упрощенный двоичный интерфейс приложения (ABI) контракта токена ERC-20.
# Он будет предоставлять только методы: balanceOf(address), decimals(), symbol() и totalSupply()
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
print("Общее предложение:", totalSupply)
print("Баланс адреса:", addr_balance)

weth_contract = w3.eth.contract(address=w3.to_checksum_address(weth_token_addr), abi=simplified_abi)
symbol = weth_contract.functions.symbol().call()
decimals = weth_contract.functions.decimals().call()
totalSupply = weth_contract.functions.totalSupply().call() / 10**decimals
addr_balance = weth_contract.functions.balanceOf(acc_address).call() / 10**decimals

#  WETH
print("===== %s =====" % symbol)
print("Общее предложение:", totalSupply)
print("Баланс адреса:", addr_balance)
```

## Известные проблемы {#erc20-issues}

### Проблема с получением токенов ERC-20 {#reception-issue}

**По состоянию на 20.06.2024 из-за этой проблемы было потеряно токенов ERC-20 на сумму не менее 83 656 418 долларов США. Обратите внимание, что чистая реализация ERC-20 подвержена этой проблеме, если вы не примените набор дополнительных ограничений поверх стандарта, перечисленных ниже.**

Когда токены ERC-20 отправляются на умный контракт, который не предназначен для обработки токенов ERC-20, эти токены могут быть безвозвратно утеряны. Это происходит потому, что у принимающего контракта нет функциональности для распознавания входящих токенов или реагирования на них, и в стандарте ERC-20 нет механизма для уведомления принимающего контракта о входящих токенах. Эта проблема проявляется в основном следующими способами:

1. Механизм перевода токенов

- Токены ERC-20 переводятся с помощью функций transfer или transferFrom
  - Когда пользователь отправляет токены на адрес контракта с помощью этих функций, токены переводятся независимо от того, предназначен ли принимающий контракт для их обработки

2. Отсутствие уведомления
   - Принимающий контракт не получает уведомления или обратного вызова о том, что на него были отправлены токены
   - Если в принимающем контракте отсутствует механизм для обработки токенов (например, резервная функция или специальная функция для управления приемом токенов), токены фактически застревают на адресе контракта
3. Отсутствие встроенной обработки
   - Стандарт ERC-20 не включает обязательную функцию для реализации принимающими контрактами, что приводит к ситуации, когда многие контракты не могут должным образом управлять входящими токенами

**Возможные решения**

Хотя полностью предотвратить эту проблему с ERC-20 невозможно, существуют методы, которые позволяют значительно снизить вероятность потери токенов для конечного пользователя:

- Наиболее распространенная проблема возникает, когда пользователь отправляет токены на адрес самого контракта токена (например, USDT, депонированный на адрес контракта токена USDT). Рекомендуется ограничить функцию `transfer(..)` , чтобы отменять такие попытки перевода. Рассмотрите возможность добавления проверки `require(_to != address(this));` в реализацию функции `transfer(..)`.
- Функция `transfer(..)` в целом не предназначена для внесения токенов на контракты. `approve(..) и шаблон `transferFrom(..)`используется для внесения токенов ERC-20 на контракты. Можно ограничить функцию перевода, чтобы запретить с ее помощью вносить токены на любые контракты, однако это может нарушить совместимость с контрактами, которые предполагают, что токены могут быть депонированы на контракты с помощью функции`trasnfer(..)` (например, пулы ликвидности Uniswap).
- Всегда предполагайте, что токены ERC-20 могут оказаться в вашем контракте, даже если ваш контракт не должен их получать. Не существует способа предотвратить или отклонить случайные пополнения на стороне получателя. Рекомендуется реализовать функцию, которая позволит извлекать случайно депонированные токены ERC-20.
- Рассмотрите возможность использования альтернативных стандартов токенов.

В результате этой проблемы появились некоторые альтернативные стандарты, такие как [ERC-223](/developers/docs/standards/tokens/erc-223) или [ERC-1363](/developers/docs/standards/tokens/erc-1363).

## Дополнительные материалы {#further-reading}

- [EIP-20: Стандарт токенов ERC-20](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - Токены](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - Реализация ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Руководство по токенам ERC20 на Solidity](https://www.alchemy.com/overviews/erc20-solidity)

## Другие стандарты взаимозаменяемых токенов {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - Токенизированные хранилища](/developers/docs/standards/tokens/erc-4626)
