---
title: "Standard tokenów ERC-20"
description: "Dowiedz się więcej o ERC-20, standardzie zamiennych tokenów na Ethereum, który umożliwia interoperacyjne zastosowania dla tokenów."
lang: pl
---

## Wprowadzenie {#introduction}

**Czym jest token?**

Tokeny mogą reprezentować praktycznie wszystko w Ethereum:

- punkty reputacji na platformie internetowej
- umiejętności postaci w grze
- aktywa finansowe, takie jak udział w spółce
- walutę fiducjarną, taką jak USD
- uncję złota
- i nie tylko...

Tak potężna funkcja Ethereum musi być obsługiwana przez solidny standard, prawda? To jest dokładnie to,
gdzie ERC-20 odgrywa rolę! Ten standard umożliwia deweloperom tworzenie aplikacji tokenowych, które są interoperacyjne z innymi produktami i usługami. Standard ERC-20 jest również używany do zapewnienia dodatkowej funkcjonalności [etherowi](/glossary/#ether).

**Czym jest ERC-20?**

ERC-20 wprowadza standard dla tokenów wymiennych, innymi słowy mają one właściwość, która sprawia, że każdy token jest dokładnie
taki sam (pod względem typu i wartości) jak inny token. Na przykład token ERC-20 działa podobnie jak ETH, oznacza, że 1 token
jest i będzie zawsze równy wszystkim pozostałym tokenom.

## Wymagania wstępne {#prerequisites}

- [Konta](/developers/docs/accounts)
- [Inteligentne kontrakty](/developers/docs/smart-contracts/)
- [Standardy tokenów](/developers/docs/standards/tokens/)

## Treść {#body}

ERC-20 (Ethereum Request for Comments 20) zaproponowany przez Fabiana Vogelstellera w listopadzie 2015 r. jest standardem tokenów, który
implementuje API dla tokenów w inteligentnych kontraktach.

Przykładowe funkcje zapewniane przez ERC-20 to:

- transfer tokenów z jednego konta na drugie
- uzyskanie bieżącego salda tokenów na koncie
- uzyskanie całkowitej podaży tokena dostępnego w sieci
- zatwierdzanie, czy kwota tokena z konta może zostać wydana przez konto strony trzeciej

Jeśli inteligentny kontrakt implementuje następujące metody i zdarzenia, można go nazwać kontraktem tokena ERC-20, a po wdrożeniu
będzie odpowiedzialny za śledzenie utworzonych tokenów w Ethereum.

Na podstawie [EIP-20](https://eips.ethereum.org/EIPS/eip-20):

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

### Zdarzenia {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### Przykłady {#web3py-example}

Zobaczmy, dlaczego standard jest tak ważny, aby ułatwić nam sprawdzanie dowolnego kontraktu tokena ERC-20 na Ethereum.
Potrzebujemy tylko interfejsu binarnego aplikacji (ABI) kontraktu, aby utworzyć interfejs dla dowolnego tokena ERC-20. Jak możesz
zobaczyć poniżej, użyjemy uproszczonego ABI, aby zmniejszyć złożoność przykładu.

#### Przykład Web3.py {#web3py-example}

Najpierw upewnij się, że masz zainstalowaną bibliotekę Pythona [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # Zapakowany ether (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# Jest to uproszczony interfejs binarny aplikacji (ABI) kontraktu tokena ERC-20.
# Uwidoczni on tylko metody: balanceOf(address), decimals(), symbol() oraz totalSupply()
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
print("Całkowita podaż:", totalSupply)
print("Saldo adresu:", addr_balance)

weth_contract = w3.eth.contract(address=w3.to_checksum_address(weth_token_addr), abi=simplified_abi)
symbol = weth_contract.functions.symbol().call()
decimals = weth_contract.functions.decimals().call()
totalSupply = weth_contract.functions.totalSupply().call() / 10**decimals
addr_balance = weth_contract.functions.balanceOf(acc_address).call() / 10**decimals

#  WETH
print("===== %s =====" % symbol)
print("Całkowita podaż:", totalSupply)
print("Saldo adresu:", addr_balance)
```

## Znane problemy {#erc20-issues}

### Problem z odbiorem tokenów ERC-20 {#reception-issue}

**Do dnia 20.06.2024 r. z powodu tego problemu utracono tokeny ERC-20 o wartości co najmniej 83 656 418 $. Należy pamiętać, że czysta implementacja ERC-20 jest podatna na ten problem, chyba że zaimplementuje się dodatkowy zestaw ograniczeń do standardu, jak wymieniono poniżej.**

Kiedy tokeny ERC-20 zostają wysłane do inteligentnego kontraktu, który nie jest zaprojektowany do obsługi tokenów ERC-20, to mogą one zostać utracone na zawsze. Dzieje się tak, ponieważ kontrakt odbierający nie ma funkcji rozpoznawania lub reagowanie na nadchodzące tokeny, a w standardzie ERC-20 nie ma mechanizmu powiadamianie kontraktu odbierającego o przychodzących tokenach. Główne formy tego problemu to:

1. Mechanizm transferu tokenów

- Tokeny ERC-20 są przenoszone przy użyciu funkcji transfer lub transferFrom
  - Kiedy użytkownik wysyła tokeny do inteligentnego kontraktu przy użyciu tych funkcji, to tokeny są przenoszone bez względu na to, czy kontrakt odbierający jest zaprojektowany do ich obsługi

2. Brak powiadomień
   - Kontrakt odbierający nie otrzymuje żadnego powiadomienia lub wywołania zwrotnego, że tokeny zostały do niego wysłane
   - Jeśli kontrakt odbierający nie posiada mechanizmu do obsługi tokenów (np. funkcji awaryjnej lub dedykowanej funkcji to zarządzania odbiorem tokenów) to tokeny pozostają utknięte w adresie kontraktu
3. Brak wbudowanej obsługi
   - Standard ERC-20 nie zawiera obowiązkowej funkcji do zaimplementowania przez kontrakty odbierające, co prowadzi do sytuacji, w których wiele kontraktów nie jest w stanie prawidłowo zarządzać przychodzącymi tokenami

**Możliwe rozwiązania**

Niemożliwym jest całkowite zapobieżenie temu problemowi z ERC-20, ale są metody, które pozwalają znacząco ograniczyć ryzyko utraty tokenów przez końcowego użytkownika:

- Najczęstszym problemem jest sytuacja, w której użytkownik wysyła tokeny na adres samego kontraktu tokena (np. USDT zdeponowane na adresie kontraktu tokena USDT). Zaleca się ograniczenie funkcji `transfer(..)` tak, aby wycofywała takie próby transferu. Należy rozważyć dodanie sprawdzenia `require(_to != address(this));` w implementacji funkcji `transfer(..)`.
- Zasadniczo funkcja `transfer(..)` nie jest przeznaczona do deponowania tokenów w kontraktach. `approve(..) Zamiast tego, do deponowania tokenów ERC-20 w kontraktach używany jest wzorzec `& transferFrom(..)`. Można ograniczyć funkcję transfer, aby uniemożliwić deponowanie za jej pomocą tokenów w kontraktach, jednak może to naruszyć kompatybilność z kontraktami, które zakładają, że tokeny można deponować w kontraktach za pomocą funkcji `trasnfer(..)` (np. pule płynności Uniswap).
- Zawsze zakładaj możliwość, że tokeny ERC-20 mogą trafić do Twojego kontraktu, nawet jeśli kontrakt nie powinien nigdy ich otrzymać. Nie ma możliwości zapobieżenia lub odrzucenia przypadkowych depozytów ze strony odbiorcy. Zaleca się zaimplementowanie funkcji, która umożliwiłaby wycofanie przypadkowo przesłanych tokenów ERC-20.
- Rozważ użycie alternatywnych standardów tokenów.

W odpowiedzi na ten problem powstały alternatywne standardy, takie jak [ERC-223](/developers/docs/standards/tokens/erc-223) lub [ERC-1363](/developers/docs/standards/tokens/erc-1363).

## Dalsza lektura {#further-reading}

- [EIP-20: standard tokenów ERC-20](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin – Tokeny](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin – Implementacja ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy – Przewodnik po tokenach ERC20 w Solidity](https://www.alchemy.com/overviews/erc20-solidity)

## Inne standardy tokenów zamiennych {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 – Stokenizowane skarbce](/developers/docs/standards/tokens/erc-4626)
