---
title: Стандарт токенів ERC-20
description: Дізнайтеся про ERC-20 — стандарт для взаємозамінних токенів в Етеріумі, який дозволяє створювати інтероперабельні застосунки для токенів.
lang: uk
---

## Вступ {#introduction}

**Що таке токен?**

Токени можуть представляти практично будь-що в [Етеріумі](/):

- бали репутації на онлайн-платформі
- навички персонажа у грі
- фінансові активи, як-от частка в компанії
- фіатну валюту, як-от USD
- унцію золота
- та багато іншого...

Така потужна функція Етеріуму має підтримуватися надійним стандартом, чи не так? Саме тут ERC-20 відіграє свою роль! Цей стандарт дозволяє розробникам створювати застосунки для токенів, які є інтероперабельними з іншими продуктами та сервісами. Стандарт ERC-20 також використовується для надання додаткової функціональності [етеру](/glossary/#ether).

**Що таке ERC-20?**

ERC-20 запроваджує стандарт для взаємозамінних токенів. Іншими словами, вони мають властивість, яка робить кожен токен абсолютно однаковим (за типом і вартістю) з іншим токеном. Наприклад, токен ERC-20 діє так само, як і ETH, тобто 1 токен є і завжди буде дорівнювати всім іншим токенам.

## Передумови {#prerequisites}

- [Акаунти](/developers/docs/accounts)
- [Смарт-контракти](/developers/docs/smart-contracts/)
- [Стандарти токенів](/developers/docs/standards/tokens/)

## Основна частина {#body}

ERC-20 (Ethereum Request for Comments 20), запропонований Фабіаном Фогельштеллером (Fabian Vogelsteller) у листопаді 2015 року, — це стандарт токенів, який реалізує API для токенів у смарт-контрактах.

Приклади функціональних можливостей, які надає ERC-20:

- переказ токенів з одного акаунта на інший
- отримання поточного балансу токенів на акаунті
- отримання загальної пропозиції токенів, доступних у мережі
- схвалювати, чи може певна кількість токенів з акаунта бути витрачена стороннім акаунтом

Якщо смарт-контракт реалізує наведені нижче методи та події, його можна назвати контрактом токена ERC-20, і після розгортання він відповідатиме за відстеження створених токенів в Етеріумі.

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

Давайте подивимося, наскільки важливим є стандарт для спрощення перевірки будь-якого контракту токена ERC-20 в Етеріумі. Нам потрібен лише двійковий інтерфейс застосунку (ABI) контракту, щоб створити інтерфейс для будь-якого токена ERC-20. Як ви можете бачити нижче, ми будемо використовувати спрощений ABI, щоб зробити цей приклад максимально зрозумілим.

#### Приклад з Web3.py {#web3py-example-2}

Спочатку переконайтеся, що ви встановили бібліотеку Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # Обгорнутий етер (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Юнісвоп V2: DAI 2

# Це спрощений бінарний інтерфейс застосунку (ABI) контракту токена ERC-20.
# Він відкриватиме лише методи: balanceOf(address), decimals(), symbol() та totalSupply()
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

**Станом на 20.06.2024 через цю проблему було втрачено токенів ERC-20 на суму щонайменше 83 656 418 доларів США. Зверніть увагу, що чиста реалізація ERC-20 схильна до цієї проблеми, якщо ви не запровадите низку додаткових обмежень поверх стандарту, як зазначено нижче.**

Коли токени ERC-20 надсилаються на смарт-контракт, який не призначений для обробки токенів ERC-20, ці токени можуть бути назавжди втрачені. Це відбувається тому, що контракт-одержувач не має функціональності для розпізнавання або реагування на вхідні токени, а в стандарті ERC-20 немає механізму сповіщення контракту-одержувача про вхідні токени. Основні шляхи виникнення цієї проблеми:

1.	Механізм переказу токенів
  - Токени ERC-20 переказуються за допомогою функцій transfer або transferFrom
	-	Коли користувач надсилає токени на адресу контракту за допомогою цих функцій, токени переказуються незалежно від того, чи призначений контракт-одержувач для їх обробки
2.	Відсутність сповіщення
	-	Контракт-одержувач не отримує сповіщення або зворотного виклику про те, що йому були надіслані токени
	-	Якщо контракт-одержувач не має механізму для обробки токенів (наприклад, резервної функції або спеціальної функції для управління отриманням токенів), токени фактично застрягають на адресі контракту
3.	Відсутність вбудованої обробки
	-	Стандарт ERC-20 не містить обов'язкової функції для реалізації контрактами-одержувачами, що призводить до ситуації, коли багато контрактів не можуть належним чином управляти вхідними токенами

**Можливі рішення**

Хоча повністю запобігти цій проблемі з ERC-20 неможливо, існують методи, які дозволять значно знизити ймовірність втрати токенів для кінцевого користувача:

- Найпоширеніша проблема виникає, коли користувач надсилає токени на саму адресу контракту токена (наприклад, USDT, внесені на адресу контракту токена USDT). Рекомендується обмежити функцію `transfer(..)`, щоб скасувати такі спроби переказу. Розгляньте можливість додавання перевірки `require(_to != address(this));` в межах реалізації функції `transfer(..)`.
- Функція `transfer(..)` загалом не призначена для внесення токенів на контракти. Натомість для внесення токенів ERC-20 на контракти використовується патерн `approve(..) & transferFrom(..)`. Можна обмежити функцію переказу, щоб заборонити внесення токенів на будь-які контракти за її допомогою, однак це може порушити сумісність із контрактами, які передбачають можливість внесення токенів на контракти за допомогою функції `transfer(..)` (наприклад, пули ліквідності Юнісвоп).
- Завжди припускайте, що токени ERC-20 можуть опинитися у вашому контракті, навіть якщо ваш контракт ніколи не повинен їх отримувати. Немає способу запобігти або відхилити випадкові депозити на стороні одержувача. Рекомендується реалізувати функцію, яка дозволить вилучати випадково внесені токени ERC-20.
- Розгляньте можливість використання альтернативних стандартів токенів.

Деякі альтернативні стандарти виникли через цю проблему, наприклад [ERC-223](/developers/docs/standards/tokens/erc-223) або [ERC-1363](/developers/docs/standards/tokens/erc-1363).

## Додаткові матеріали {#further-reading}

- [EIP-20: Стандарт токенів ERC-20](https://eips.ethereum.org/EIPS/eip-20)
- [ОупенЗеппелін — Токени](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [ОупенЗеппелін — Реалізація ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy — Посібник з токенів ERC-20 у Solidity](https://www.alchemy.com/overviews/erc20-solidity)

## Інші стандарти взаємозамінних токенів {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 — Токенізовані сховища](/developers/docs/standards/tokens/erc-4626)

## Посібники: Створення з ERC-20 в Етеріумі {#tutorials}

- [Огляд контракту ERC-20](/developers/tutorials/erc20-annotated-code/) _— Порядковий анотований огляд реалізації контракту ERC-20 від ОупенЗеппелін._
- [ERC-20 із запобіжниками](/developers/tutorials/erc20-with-safety-rails/) _— Як додати запобіжні заходи до токенів ERC-20, щоб допомогти користувачам уникнути поширених помилок._
- [Надсилання токенів за допомогою Ethers.js](/developers/tutorials/send-token-ethersjs/) _— Посібник для початківців із переказу токенів ERC-20 за допомогою Ethers.js._
- [Деякі хитрощі, які використовують шахрайські токени, і як їх виявити](/developers/tutorials/scam-token-tricks/) _— Детальний огляд патернів шахрайських токенів ERC-20 та способів їх ідентифікації._