---
title: Standard tokenu ERC-20
description: Přečtěte si o ERC-20, standardu pro zaměnitelné tokeny na Ethereu, který umožňuje interoperabilní tokenové aplikace.
lang: cs
---

## Úvod {#introduction}

**Co je to token?**

Tokeny mohou v [Ethereu](/) představovat prakticky cokoliv:

- body reputace na online platformě
- dovednosti postavy ve hře
- finanční aktiva, jako je podíl ve společnosti
- fiat měnu, jako je USD
- unci zlata
- a další...

Takto mocná funkce Etherea musí být řízena robustním standardem, že? Přesně v tom hraje svou roli ERC-20! Tento standard umožňuje vývojářům vytvářet tokenové aplikace, které jsou interoperabilní s jinými produkty a službami. Standard ERC-20 se také používá k poskytování dalších funkcí pro [ether](/glossary/#ether).

**Co je ERC-20?**

ERC-20 zavádí standard pro zaměnitelné tokeny (Fungible Tokens), jinými slovy mají vlastnost, díky které je každý token naprosto stejný (typem a hodnotou) jako jiný token. Například token ERC-20 se chová stejně jako ETH, což znamená, že 1 token je a vždy bude roven všem ostatním tokenům.

## Předpoklady {#prerequisites}

- [Účty](/developers/docs/accounts)
- [Chytré kontrakty](/developers/docs/smart-contracts/)
- [Standardy tokenů](/developers/docs/standards/tokens/)

## Hlavní část {#body}

ERC-20 (Ethereum Request for Comments 20), navržený Fabianem Vogelstellerem v listopadu 2015, je standard tokenu, který implementuje API pro tokeny v rámci chytrých kontraktů.

Příklady funkcí, které ERC-20 poskytuje:

- převod tokenů z jednoho účtu na druhý
- získání aktuálního zůstatku tokenů na účtu
- získání celkové nabídky tokenu dostupné v síti
- schválit, zda může být určité množství tokenů z účtu utraceno účtem třetí strany

Pokud chytrý kontrakt implementuje následující metody a události, může být nazýván kontraktem tokenu ERC-20 a po nasazení bude zodpovědný za sledování vytvořených tokenů na Ethereu.

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

Pojďme se podívat, proč je standard tak důležitý pro zjednodušení kontroly jakéhokoli kontraktu tokenu ERC-20 na Ethereu. K vytvoření rozhraní pro jakýkoli token ERC-20 potřebujeme pouze aplikační binární rozhraní kontraktu (ABI). Jak můžete vidět níže, použijeme zjednodušené ABI, aby byl příklad co nejsrozumitelnější.

#### Příklad s Web3.py {#web3py-example-2}

Nejprve se ujistěte, že máte nainstalovanou knihovnu [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) pro Python:

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # Zabalený ether (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# Toto je zjednodušené aplikační binární rozhraní (ABI) kontraktu ERC-20 tokenu.
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

## Známé problémy {#erc20-issues}

### Problém s příjmem tokenů ERC-20 {#reception-issue}

**K 20. 6. 2024 byly kvůli tomuto problému ztraceny tokeny ERC-20 v hodnotě nejméně 83 656 418 USD. Upozorňujeme, že čistá implementace ERC-20 je k tomuto problému náchylná, pokud nad rámec standardu neimplementujete sadu dalších omezení, jak je uvedeno níže.**

Když jsou tokeny ERC-20 odeslány do chytrého kontraktu, který není navržen pro práci s tokeny ERC-20, mohou být tyto tokeny trvale ztraceny. K tomu dochází proto, že přijímající kontrakt nemá funkci pro rozpoznání nebo reakci na příchozí tokeny a ve standardu ERC-20 neexistuje žádný mechanismus, který by přijímající kontrakt o příchozích tokenech informoval. Hlavní způsoby, jakými se tento problém projevuje, jsou:

1.	Mechanismus převodu tokenů
  - Tokeny ERC-20 se převádějí pomocí funkcí transfer nebo transferFrom
	- Když uživatel odešle tokeny na adresu kontraktu pomocí těchto funkcí, tokeny jsou převedeny bez ohledu na to, zda je přijímající kontrakt navržen tak, aby s nimi dokázal pracovat
2.	Chybějící upozornění
	- Přijímající kontrakt neobdrží upozornění ani zpětné volání (callback), že mu byly odeslány tokeny
	- Pokud přijímající kontrakt postrádá mechanismus pro zpracování tokenů (např. záložní funkci nebo vyhrazenou funkci pro správu příjmu tokenů), tokeny v podstatě uvíznou na adrese kontraktu
3.	Žádné vestavěné zpracování
	- Standard ERC-20 neobsahuje povinnou funkci, kterou by přijímající kontrakty musely implementovat, což vede k situaci, kdy mnoho kontraktů není schopno správně spravovat příchozí tokeny

**Možná řešení**

Ačkoli není možné tomuto problému u ERC-20 zcela zabránit, existují metody, které by umožnily výrazně snížit pravděpodobnost ztráty tokenů pro koncového uživatele:

- Nejčastějším problémem je, když uživatel odešle tokeny na samotnou adresu kontraktu tokenu (např. USDT vložené na adresu kontraktu tokenu USDT). Doporučuje se omezit funkci `transfer(..)`, aby takové pokusy o převod zvrátila. Zvažte přidání kontroly `require(_to != address(this));` v rámci implementace funkce `transfer(..)`.
- Funkce `transfer(..)` obecně není navržena pro vkládání tokenů do kontraktů. Místo toho se pro vkládání tokenů ERC-20 do kontraktů používá vzor `approve(..) & transferFrom(..)`. Je možné omezit funkci převodu tak, aby neumožňovala vkládání tokenů do jakýchkoli kontraktů, nicméně to může narušit kompatibilitu s kontrakty, které předpokládají, že tokeny lze do kontraktů vkládat pomocí funkce `transfer(..)` (např. fondy likvidity Uniswap).
- Vždy předpokládejte, že tokeny ERC-20 mohou skončit ve vašem kontraktu, i když váš kontrakt nemá nikdy žádné přijmout. Neexistuje způsob, jak zabránit nebo odmítnout náhodné vklady na straně příjemce. Doporučuje se implementovat funkci, která by umožnila extrahovat náhodně vložené tokeny ERC-20.
- Zvažte použití alternativních standardů tokenů.

Z tohoto problému vzešly některé alternativní standardy, jako je [ERC-223](/developers/docs/standards/tokens/erc-223) nebo [ERC-1363](/developers/docs/standards/tokens/erc-1363).

## Další čtení {#further-reading}

- [EIP-20: Standard tokenu ERC-20](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - Tokeny](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - Implementace ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Průvodce tokeny ERC-20 v Solidity](https://www.alchemy.com/overviews/erc20-solidity)

## Další standardy zaměnitelných tokenů {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - Tokenizované trezory](/developers/docs/standards/tokens/erc-4626)

## Návody: Vývoj s ERC-20 na Ethereu {#tutorials}

- [Průvodce kontraktem ERC-20](/developers/tutorials/erc20-annotated-code/) _– Komentovaný průvodce implementací kontraktu ERC-20 od OpenZeppelin řádek po řádku._
- [ERC-20 s bezpečnostními pojistkami](/developers/tutorials/erc20-with-safety-rails/) _– Jak přidat ochranné prvky k tokenům ERC-20, které uživatelům pomohou vyhnout se běžným chybám._
- [Odesílání tokenů pomocí Ethers.js](/developers/tutorials/send-token-ethersjs/) _– Průvodce převodem tokenů ERC-20 pomocí Ethers.js pro začátečníky._
- [Některé triky používané podvodnými tokeny a jak je odhalit](/developers/tutorials/scam-token-tricks/) _– Detailní pohled na vzorce podvodných tokenů ERC-20 a jak je identifikovat._