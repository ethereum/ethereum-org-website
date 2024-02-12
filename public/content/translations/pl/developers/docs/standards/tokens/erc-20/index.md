---
title: Standard tokena ERC-20
description:
lang: pl
---

## Wprowadzenie {#introduction}

**Czym jest token?**

Tokeny mogą reprezentować praktycznie wszystko w Ethereum:

- punkty reputacji na platformie internetowej
- umiejętności postaci w grze
- bilety na loterię
- aktywa finansowe, takie jak udział w spółce
- walutę fiducjarną, taką jak USD
- uncję złota
- i więcej...

Tak potężna funkcja Ethereum musi być obsługiwana przez solidny standard, prawda? To jest dokładnie to, gdzie ERC-20 odgrywa rolę! Te standardy umożliwiają programistom tworzenie aplikacji tokenów, które mogą współpracować z innymi produktami i usługami.

**Co to jest ERC-20?**

ERC-20 wprowadza standard dla tokenów wymiennych, innymi słowy mają one właściwość, która sprawia, że każdy token jest dokładnie taki sam (pod względem typu i wartości) jak inny token. Na przykład token ERC-20 działa podobnie jak ETH, oznacza, że 1 token jest i będzie zawsze równy wszystkim pozostałym tokenom.

## Warunki wstępne {#prerequisites}

- [Konta](/developers/docs/accounts)
- [Inteligentne kontrakty](/developers/docs/smart-contracts/)
- [Standardy tokenów](/developers/docs/standards/tokens/)

## Treść {#body}

ERC-20 (Ethereum Request for Comments 20) zaproponowany przez Fabiana Vogelstellera w listopadzie 2015 r. jest standardem tokenów, który implementuje API dla tokenów w inteligentnych kontraktach.

Zapewnia funkcje takie jak przesyłanie tokenów z jednego konta na drugie, uzyskanie aktualnego salda tokenów na koncie oraz całkowitą podaż tokenów dostępnych w sieci. Poza tym ma również kilka innych funkcji , takich jak zatwierdzanie, że ilość tokenów z konta może być wydana przez konto osoby trzeciej.

Jeśli inteligentny kontrakt implementuje następujące metody i zdarzenia, można go nazwać kontraktem tokena ERC-20, a po wdrożeniu będzie odpowiedzialny za śledzenie utworzonych tokenów w Ethereum.

Od [EIP-20](https://eips.ethereum.org/EIPS/eip-20):

### Metody {#methods}

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

### Wydarzenia {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)

```

### Przykłady {#web3py-example}

Zobaczmy, dlaczego standard jest tak ważny, aby ułatwić nam sprawdza kontraktów z tokenami ERC-20 na Ethereum. Potrzebujemy tylko interfejsu binarnego Umowy (ABI), aby utworzyć interfejs dla każdego tokenu ERC-20. Jak możesz zobaczyć poniżej, użyjemy uproszczonego ABI, aby zmniejszyć złożoność przykładu.

#### Przykład Web3.py {#web3py-example}

Najpierw upewnij się, że zainstalowałeś [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) bibliotekę Pythona:

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # Wrapped ether (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# This is a simplified Contract Application Binary Interface (ABI) of an ERC-20 Token Contract.

# It will expose only the methods: balanceOf(address), decimals(), symbol() and totalSupply()
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

dai_contract = w3.eth.contract(address=w3.toChecksumAddress(dai_token_addr), abi=simplified_abi)
symbol = dai_contract.functions.symbol().call()
decimals = dai_contract.functions.decimals().call()
totalSupply = dai_contract.functions.totalSupply().call() / 10**decimals
addr_balance = dai_contract.functions.balanceOf(acc_address).call() / 10**decimals

#  DAI
print("===== %s =====" % symbol)
print("Total Supply:", totalSupply)
print("Addr Balance:", addr_balance)

weth_contract = w3.eth.contract(address=w3.toChecksumAddress(weth_token_addr), abi=simplified_abi)
symbol = weth_contract.functions.symbol().call()
decimals = weth_contract.functions.decimals().call()
totalSupply = weth_contract.functions.totalSupply().call() / 10**decimals
addr_balance = weth_contract.functions.balanceOf(acc_address).call() / 10**decimals

#  WETH
print("===== %s =====" % symbol)
print("Total Supply:", totalSupply)
print("Addr Balance:", addr_balance)
```

## Dalsza lektura {#further-reading}

- [EIP-20: standard tokena ERC-20](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin – tokeny](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin – implementacja ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [ConsenSys – wdrożenie ERC-20](https://github.com/ConsenSys/Tokens/blob/master/contracts/eip20/EIP20.sol)

## Powiązane tematy {#related-topics}

- [ERC-721](/developers/docs/standards/tokens/erc-721/)
- [ERC-777](/developers/docs/standards/tokens/erc-777/)
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/)
