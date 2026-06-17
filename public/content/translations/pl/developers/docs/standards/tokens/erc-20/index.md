---
title: Standard tokena ERC-20
description: Dowiedz się o ERC-20, standardzie dla tokenów zamiennych na Ethereum, który umożliwia tworzenie interoperacyjnych aplikacji opartych na tokenach.
lang: pl
---

## Wprowadzenie {#introduction}

**Czym jest token?**

Tokeny mogą reprezentować praktycznie wszystko w [Ethereum](/):

- punkty reputacji na platformie internetowej
- umiejętności postaci w grze
- aktywa finansowe, takie jak udziały w firmie
- walutę fiducjarną, taką jak USD
- uncję złota
- i wiele więcej...

Tak potężna funkcja Ethereum musi być obsługiwana przez solidny standard, prawda? Właśnie w tym miejscu swoją rolę odgrywa ERC-20! Ten standard pozwala deweloperom budować aplikacje oparte na tokenach, które są interoperacyjne z innymi produktami i usługami. Standard ERC-20 jest również używany do zapewnienia dodatkowej funkcjonalności dla [etheru](/glossary/#ether).

**Czym jest ERC-20?**

ERC-20 wprowadza standard dla tokenów zamiennych, co oznacza, że posiadają one właściwość sprawiającą, że każdy token jest dokładnie taki sam (pod względem typu i wartości) jak inny token. Na przykład token ERC-20 działa tak samo jak ETH, co oznacza, że 1 token jest i zawsze będzie równy wszystkim innym tokenom.

## Wymagania wstępne {#prerequisites}

- [Konta](/developers/docs/accounts)
- [Inteligentne kontrakty](/developers/docs/smart-contracts/)
- [Standardy tokenów](/developers/docs/standards/tokens/)

## Treść {#body}

ERC-20 (Ethereum Request for Comments 20), zaproponowany przez Fabiana Vogelstellera w listopadzie 2015 roku, to standard tokena, który implementuje API dla tokenów w ramach inteligentnych kontraktów.

Przykładowe funkcjonalności zapewniane przez ERC-20:

- transfer tokenów z jednego konta na drugie
- pobranie aktualnego salda tokenów na koncie
- pobranie całkowitej podaży tokena dostępnej w sieci
- zatwierdzenie, czy określona ilość tokenów z konta może zostać wydana przez konto strony trzeciej

Jeśli inteligentny kontrakt implementuje poniższe metody i zdarzenia, można go nazwać kontraktem tokena ERC-20, a po wdrożeniu będzie on odpowiedzialny za śledzenie utworzonych tokenów w Ethereum.

Z [EIP-20](https://eips.ethereum.org/EIPS/eip-20):

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

Zobaczmy, dlaczego standard jest tak ważny, aby ułatwić nam inspekcję dowolnego kontraktu tokena ERC-20 w Ethereum. Potrzebujemy jedynie binarnego interfejsu aplikacji (ABI) kontraktu, aby utworzyć interfejs do dowolnego tokena ERC-20. Jak widać poniżej, użyjemy uproszczonego ABI, aby przykład był jak najbardziej przystępny.

#### Przykład w Web3.py {#web3py-example-2}

Najpierw upewnij się, że masz zainstalowaną bibliotekę [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) dla języka Python:

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # Opakowany ether (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# To jest uproszczony interfejs binarny aplikacji (ABI) kontraktu tokena ERC-20.
# Udostępni tylko metody: balanceOf(adres), decimals(), symbol() i totalSupply()
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

## Znane problemy {#erc20-issues}

### Problem z odbiorem tokenów ERC-20 {#reception-issue}

**Według stanu na 20.06.2024 r. z powodu tego problemu utracono tokeny ERC-20 o wartości co najmniej 83 656 418 USD. Należy pamiętać, że czysta implementacja ERC-20 jest podatna na ten problem, chyba że wdrożysz zestaw dodatkowych ograniczeń wykraczających poza standard, jak wymieniono poniżej.**

Kiedy tokeny ERC-20 są wysyłane do inteligentnego kontraktu, który nie jest zaprojektowany do obsługi tokenów ERC-20, mogą one zostać bezpowrotnie utracone. Dzieje się tak, ponieważ kontrakt odbierający nie ma funkcjonalności pozwalającej na rozpoznanie lub zareagowanie na przychodzące tokeny, a w standardzie ERC-20 nie ma mechanizmu powiadamiania kontraktu odbierającego o przychodzących tokenach. Główne sposoby, w jakie ten problem się objawia, to:

1.	Mechanizm transferu tokenów
  - Tokeny ERC-20 są transferowane za pomocą funkcji transfer lub transferFrom
	-	Kiedy użytkownik wysyła tokeny na adres kontraktu za pomocą tych funkcji, tokeny są transferowane niezależnie od tego, czy kontrakt odbierający jest zaprojektowany do ich obsługi
2.	Brak powiadomienia
	-	Kontrakt odbierający nie otrzymuje powiadomienia ani wywołania zwrotnego, że tokeny zostały do niego wysłane
	-	Jeśli kontrakt odbierający nie ma mechanizmu do obsługi tokenów (np. funkcji rezerwowej lub dedykowanej funkcji do zarządzania odbiorem tokenów), tokeny skutecznie utkną na adresie kontraktu
3.	Brak wbudowanej obsługi
	-	Standard ERC-20 nie zawiera obowiązkowej funkcji, którą muszą zaimplementować kontrakty odbierające, co prowadzi do sytuacji, w której wiele kontraktów nie jest w stanie prawidłowo zarządzać przychodzącymi tokenami

**Możliwe rozwiązania**

Chociaż nie jest możliwe całkowite zapobieżenie temu problemowi w przypadku ERC-20, istnieją metody, które pozwoliłyby znacznie zmniejszyć prawdopodobieństwo utraty tokenów przez użytkownika końcowego:

- Najczęstszym problemem jest sytuacja, w której użytkownik wysyła tokeny na sam adres kontraktu tokena (np. USDT zdeponowane na adres kontraktu tokena USDT). Zaleca się ograniczenie funkcji `transfer(..)`, aby powodowała wycofanie takich prób transferu. Rozważ dodanie sprawdzenia `require(_to != address(this));` w ramach implementacji funkcji `transfer(..)`.
- Funkcja `transfer(..)` ogólnie nie jest przeznaczona do deponowania tokenów w kontraktach. Zamiast tego do deponowania tokenów ERC-20 w kontraktach używa się wzorca `approve(..) & transferFrom(..)`. Możliwe jest ograniczenie funkcji transferu, aby nie pozwalała na deponowanie tokenów w żadnych kontraktach za jej pomocą, jednak może to zepsuć kompatybilność z kontraktami, które zakładają, że tokeny mogą być deponowane w kontraktach za pomocą funkcji `transfer(..)` (np. pule płynności Uniswap).
- Zawsze zakładaj, że tokeny ERC-20 mogą trafić do Twojego kontraktu, nawet jeśli Twój kontrakt nie powinien ich nigdy otrzymywać. Nie ma sposobu, aby zapobiec lub odrzucić przypadkowe depozyty po stronie odbiorcy. Zaleca się zaimplementowanie funkcji, która pozwoliłaby na wydobycie przypadkowo zdeponowanych tokenów ERC-20.
- Rozważ użycie alternatywnych standardów tokenów.

Z powodu tego problemu powstały pewne alternatywne standardy, takie jak [ERC-223](/developers/docs/standards/tokens/erc-223) lub [ERC-1363](/developers/docs/standards/tokens/erc-1363).

## Dalsza lektura {#further-reading}

- [EIP-20: Standard tokena ERC-20](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - Tokeny](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - Implementacja ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Przewodnik po tokenach ERC-20 w Solidity](https://www.alchemy.com/overviews/erc20-solidity)

## Inne standardy tokenów zamiennych {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - Tokenizowane skarbce](/developers/docs/standards/tokens/erc-4626)

## Samouczki: Budowanie z ERC-20 na Ethereum {#tutorials}

- [Przewodnik po kontrakcie ERC-20](/developers/tutorials/erc20-annotated-code/) _– Opatrzony komentarzami przewodnik linijka po linijce po implementacji kontraktu ERC-20 od OpenZeppelin._
- [ERC-20 z barierami ochronnymi](/developers/tutorials/erc20-with-safety-rails/) _– Jak dodać zabezpieczenia do tokenów ERC-20, aby pomóc użytkownikom uniknąć typowych błędów._
- [Wysyłanie tokenów za pomocą Ethers.js](/developers/tutorials/send-token-ethersjs/) _– Przyjazny dla początkujących przewodnik po transferze tokenów ERC-20 za pomocą Ethers.js._
- [Sztuczki stosowane przez fałszywe tokeny i jak je wykryć](/developers/tutorials/scam-token-tricks/) _– Szczegółowe omówienie wzorców oszukańczych tokenów ERC-20 i sposobów ich identyfikacji._