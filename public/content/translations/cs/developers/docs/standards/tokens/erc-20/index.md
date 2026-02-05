---
title: Standart tokenu ERC-20
description: "Seznamte se s ERC-20, standardem pro zaměnitelné tokeny na síti Ethereum, který umožňuje interoperabilní tokenové aplikace."
lang: cs
---

## Úvod {#introduction}

**Co je to token?**

Tokeny mohou v ekosystému Etherea reprezentovat prakticky cokoliv:

- reputační body na online platformě
- dovednosti postavy ve hře
- finanční aktiva, jako je podíl ve společnosti
- fiat měnu, jako je USD
- unci zlata
- a více...

Takováto mocná funkce Etherea musí být samozřejmě ošetřena robustním standardem, že? A právě zde hraje svou roli ERC-20! Tento standard umožňuje vývojářům vytvářet tokenové aplikace, které jsou interoperabilní s jinými produkty a službami. Standard ERC-20 se také používá k poskytnutí dodatečné funkcionality pro [ether](/glossary/#ether).

**Co je ERC-20?**

ERC-20 zavádí standard pro zaměnitelné tokeny, které, jinými slovy, mají vlastnost, díky níž je každý token naprosto stejný (typem i hodnotou) jako jiný token. ERC-20 token funguje stejně jako ETH, což znamená, že 1 token je a vždy bude roven všem ostatním tokenům.

## Předpoklady {#prerequisites}

- [Účty](/developers/docs/accounts)
- [Chytré kontrakty](/developers/docs/smart-contracts/)
- [Standardy tokenů](/developers/docs/standards/tokens/)

## Tělo {#body}

ERC-20 (Ethereum Request for Comments 20), navržený Fabianem Vogelstellerem v listopadu 2015, je tokenový standard, který implementuje API pro tokeny v rámci smart kontraktů.

Příklady funkcionalit, které ERC-20 poskytuje:

- převod tokenů z jednoho účtu na druhý
- získání informace o aktuálním zůstatku tokenů na účtu
- získání celkové nabídky tokenů dostupných v síti
- schválení, zda může být určitá částka tokenů z účtu použita třetí stranou

Pokud smart kontrakt implementuje následující metody a události, může být nazván ERC-20 kontraktem a po spuštění bude zodpovědný za sledování tokenů vytvořených na Ethereu.

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

### Události {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### Příklady {#web3py-example}

Podívejme se, proč je tento standard tak důležitý pro zjednodušení prohlížení jakéhokoliv kontraktu ERC-20 tokenu na Ethereu.
Abychom mohli vytvořit rozhraní pro jakýkoliv ERC-20 token, stačí nám Contract Application Binary Interface (ABI). Jak můžete vidět níže, použijeme zjednodušené ABI, abychom vám to ukázali na jednoduchém příkladu.

#### Příklad Web3.py {#web3py-example}

Nejprve se ujistěte, že máte nainstalovanou knihovnu Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # Zabalený ether (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# Toto je zjednodušené binární rozhraní aplikace (ABI) kontraktu tokenu ERC-20.
# Zpřístupní pouze metody: balanceOf(address), decimals(), symbol() a totalSupply()
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
print("Celková zásoba:", totalSupply)
print("Zůstatek na adrese:", addr_balance)

weth_contract = w3.eth.contract(address=w3.to_checksum_address(weth_token_addr), abi=simplified_abi)
symbol = weth_contract.functions.symbol().call()
decimals = weth_contract.functions.decimals().call()
totalSupply = weth_contract.functions.totalSupply().call() / 10**decimals
addr_balance = weth_contract.functions.balanceOf(acc_address).call() / 10**decimals

#  WETH
print("===== %s =====" % symbol)
print("Celková zásoba:", totalSupply)
print("Zůstatek na adrese:", addr_balance)
```

## Známé problémy {#erc20-issues}

### Problém s příjmem tokenů ERC-20 {#reception-issue}

**K 20. červnu 2024 byly kvůli tomuto problému ztraceny tokeny ERC-20 v hodnotě nejméně 83 656 418 $.** **Všimněte si, že čistá implementace ERC-20 je náchylná k tomuto problému, pokud nad rámec níže uvedeného standardu neimplementujete sadu dodatečných omezení.**

Když jsou ERC-20 tokeny poslány do smart kontraktu, který není k práci s nimi konstruován, mohou být tyto tokeny ztraceny navždy. K tomu dochází, když přijímající kontrakt nemá funkci, která by rozpoznala příchozí tokeny, nebo na ně dokázala reagovat, a ve standardu ERC-20 neexistuje mechanismus, který by přijímající kontrakt upozornil na příchozí tokeny. Hlavní způsoby, jak může tento problém vzniknout, jsou:

1. Mechanismus přenosu tokenů

- ERC-20 tokeny jsou přenášeny pomocí funkcí transfer nebo transferFrom
  - Když uživatel odešle tokeny na adresu kontraktu pomocí těchto funkcí, tokeny jsou přeneseny bez ohledu na to, zda je přijímající kontrakt navržen k jejich zpracování

2. Nedostatek upozornění
   - Přijímající kontrakt nedostává žádné upozornění nebo zpětné volání, že mu byly odeslány nějaké tokeny
   - Pokud přijímající kontrakt postrádá mechanismus pro zpracování příchozích tokenů (například fallback funkci nebo speciální funkci pro správu přijetí tokenů), tokeny jsou fakticky na adrese tohoto kontraktu zaseknuté
3. Bez vestavěné manipulace
   - Standard ERC-20 nemá povinnou funkci, kterou by přijímající kontrakty musely implementovat, což vede k situacím, kdy kontrakty nejsou schopny příchozí tokeny správně spravovat

**Možná řešení**

I když není možné tomuto problému s ERC-20 zcela zabránit, existují metody, které umožňují výrazně snížit možnost ztráty tokenů pro koncového uživatele:

- Nejčastějším problémem je, když uživatel pošle tokeny na adresu samotného kontraktu tokenu (např. USDT vložené na adresu kontraktu tokenu USDT). Doporučuje se omezit funkci `transfer(..)` tak, aby takové pokusy o převod vrátila zpět. Zvažte přidání kontroly `require(_to != address(this));` v rámci implementace funkce `transfer(..)`.
- Funkce `transfer(..)` obecně není určena k vkládání tokenů do kontraktů. `approve(..) Vzor `& transferFrom(..)`se namísto toho používá k vkládání tokenů ERC-20 do kontraktů. Je možné omezit funkci převodu tak, aby se s ní zakázalo vkládání tokenů do jakýchkoli kontraktů, může to však narušit kompatibilitu s kontrakty, které předpokládají, že tokeny lze vkládat do kontraktů pomocí funkce`trasnfer(..)` (např. u poolů likvidity Uniswap).
- Vždy předpokládejte, že tokeny ERC-20 mohou skončit ve vašem kontraktu, i když váš kontrakt nemá nikdy žádné přijímat. Na straně příjemce neexistuje žádný způsob, jak zabránit náhodným vkladům nebo je odmítnout. Doporučuje se implementovat funkci, která by umožnila extrahovat náhodně vložené tokeny ERC-20.
- Zvažte použití alternativních standardů tokenů.

Z tohoto problému vzešly některé alternativní standardy, jako například [ERC-223](/developers/docs/standards/tokens/erc-223) nebo [ERC-1363](/developers/docs/standards/tokens/erc-1363).

## Další čtení {#further-reading}

- [EIP-20: Standard tokenu ERC-20](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin – Tokeny](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin – Implementace ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy – Průvodce tokeny ERC20 v Solidity](https://www.alchemy.com/overviews/erc20-solidity)

## Další standardy zaměnitelných tokenů {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 – Tokenizované trezory](/developers/docs/standards/tokens/erc-4626)
