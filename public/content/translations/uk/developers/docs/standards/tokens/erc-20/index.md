---
title: "Стандарт Токену ERC-20"
description: "Дізнайтеся про ERC-20, стандарт для взаємозамінних токенів на Ethereum, який дає змогу створювати сумісні токен-додатки."
lang: uk
---

## Вступ {#introduction}

**Що таке токен?**

Токен може представляти практично будь-що в Ethereum:

- бали репутації в онлайн-платформі
- навички персонажа в грі
- фінансові активи, такі як частка в компанії
- фіатна валюта, як от USD
- унція золота
- та багато іншого…

Така потужна особливість Ethereum має керуватися надійним стандартом, так? Саме тут на сцену виходить ERC-20! Цей стандарт дозволяє розробникам створювати токен-додатки, які можуть взаємодіяти з іншими продуктами й послугами. Стандарт ERC-20 також використовується для надання додаткової функціональності [ефіру](/glossary/#ether).

**Що таке ERC-20?**

ERC-20 - це стандарт взаємно-заміняючих токенів, іншими словами, вони мають властивість, що робить кожен токен таким же (по типу та значенню) як інший токен. Наприклад, токен ERC-20 працює так само, як ETH, що означає, що 1 токен
рівний всім іншим токенам.

## Передумови {#prerequisites}

- [Облікові записи](/developers/docs/accounts)
- [Смарт-контракти](/developers/docs/smart-contracts/)
- [Стандарти токенів](/developers/docs/standards/tokens/)

## Основна частина {#body}

ERC-20 (Ethereum Request for Comments 20), запропонований Фабіаном Фогельстеллером у листопаді 2015 році, є стандартом токенів, який реалізує API для маркерів у Smart-Contract.

Приклад функцій ERC-20:

- перевести токени з одного рахунку на інший
- отримати теперішній баланс токену на акаунті
- отримати загальну кількість токенів у мережі
- дозволити витратити деяку кількість токенів з Вашого акаунту іншим акаунтом

Якщо Смарт-Контракт реалізує наступні методи і події, він може називатись ERC-20 контракт і, після розгортання, він буде відповідальним за відстеженням створених токенів на Ethereum.

З [EIP-20](https://eips.ethereum.org/EIPS/eip-20):

### Методи {#methods}

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

### Події {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### Приклади {#web3py-example}

Давайте подивимося наскільки є важливим стандарт, щоб спростити нам перевірку будь-якого контракту на токен ERC-20 на Ethereum.
Нам потрібен лише контракт Application Binary Interface (ABI), щоб створити інтерфейс до будь-якого ERC-20 токену. Як ви можете побачити нижче, ми використовуємо спрощений ABI, щоб зробити чіткий приклад.

#### Приклад Web3.py {#web3py-example}

Спочатку переконайтеся, що ви встановили бібліотеку Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # Wrapped ether (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# Це спрощений двійковий інтерфейс програми (ABI) контракту токена ERC-20.
# Він надає доступ лише до методів: balanceOf(address), decimals(), symbol() і totalSupply()
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

## Відомі проблеми {#erc20-issues}

### Проблема з отриманням токенів ERC-20 {#reception-issue}

**Станом на 20.06.2024 через цю проблему було втрачено токенів ERC-20 на суму щонайменше $83,656,418. Зауважте, що чиста реалізація ERC-20 схильна до цієї проблеми, якщо ви не застосуєте набір додаткових обмежень поверх стандарту, як зазначено нижче.**

Коли токени ERC-20 надсилаються на смарт-контракт, який не призначений для обробки токенів ERC-20, ці токени можуть бути втрачені назавжди. Це відбувається тому, що контракт-одержувач не має функціональності для розпізнавання або реагування на вхідні токени, а в стандарті ERC-20 немає механізму для повідомлення контракту-одержувача про вхідні токени. Основні форми прояву цієї проблеми:

1. Механізм передачі токенів

- Токени ERC-20 передаються за допомогою функцій transfer або transferFrom
  - Коли користувач надсилає токени на адресу контракту за допомогою цих функцій, токени передаються незалежно від того, чи призначений контракт-одержувач для їх обробки

2. Відсутність сповіщення
   - Контракт-одержувач не отримує сповіщення або зворотного виклику про те, що на нього були надіслані токени
   - Якщо в контракті-одержувачі відсутній механізм для обробки токенів (наприклад, резервна функція або спеціальна функція для керування отриманням токенів), токени фактично застрягають на адресі контракту
3. Немає вбудованої обробки
   - Стандарт ERC-20 не містить обов'язкової функції, яку мають реалізовувати контракти-одержувачі, що призводить до ситуації, коли багато контрактів не можуть належним чином керувати вхідними токенами

**Можливі рішення**

Хоча повністю запобігти цій проблемі з ERC-20 неможливо, існують методи, які дозволяють значно зменшити ймовірність втрати токенів для кінцевого користувача:

- Найпоширеніша проблема виникає, коли користувач надсилає токени на адресу самого контракту токена (наприклад, USDT, внесений на адресу контракту токена USDT). Рекомендується обмежити функцію `transfer(..)` , щоб скасовувати такі спроби переказу. Розгляньте можливість додавання перевірки `require(_to != address(this));` у реалізацію функції `transfer(..)`.
- Функція `transfer(..)` загалом не призначена для внесення токенів на контракти. `approve(..)` та `transferFrom(..)` — патерн, що натомість використовується для депонування токенів ERC-20 на контракти. Можна обмежити функцію переказу, щоб заборонити внесення токенів на будь-які контракти за її допомогою, однак це може порушити сумісність із контрактами, які припускають, що токени можна вносити на контракти за допомогою функції `trasnfer(..)` (наприклад, пули ліквідності Uniswap).
- Завжди виходьте з припущення, що токени ERC-20 можуть опинитися у вашому контракті, навіть якщо ваш контракт не повинен їх отримувати. Немає способу запобігти або відхилити випадкові депозити з боку одержувача. Рекомендується реалізувати функцію, яка дозволить витягти випадково внесені токени ERC-20.
- Розгляньте можливість використання альтернативних стандартів токенів.

Унаслідок цієї проблеми з’явилися деякі альтернативні стандарти, як-от [ERC-223](/developers/docs/standards/tokens/erc-223) або [ERC-1363](/developers/docs/standards/tokens/erc-1363).

## Для подальшого читання {#further-reading}

- [EIP-20: Стандарт токенів ERC-20](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - Токени](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - Реалізація ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Посібник з токенів ERC20 на Solidity](https://www.alchemy.com/overviews/erc20-solidity)

## Інші стандарти взаємозамінних токенів {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 – Токенізовані сховища](/developers/docs/standards/tokens/erc-4626)
