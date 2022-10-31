---
title: Standard za žetone ERC-20
description:
lang: sl
---

## Uvod {#introduction}

**Kaj je žeton?**

V Ethereumu lahko žetoni predstavljajo praktično karkoli:

- točke ugleda na spletni platformi,
- spretnosti osebe v igri,
- loterijske srečke,
- finančna sredstva, kot je delež v podjetju,
- fiat valuto, kot je USD,
- unčo zlata.
- in drugo ...

Tako mogočna funkcionalnost Ethereuma mora biti upravljana z robustnim standardom, kajne? Točno to je področje, kjer ima ERC-20 svojo vlogo! Ta standard razvijalcem omogoča razvoj aplikacij žetonov, ki so interoperabilni z drugimi produkti in storitvami.

**Kaj je ERC-20?**

ERC-20 predstavlja standard za zamenljive žetone. Z drugimi besedami: žetoni imajo značilnost, ki vsak žeton naredi popolnoma identičen (po vrsti in vrednosti) drugemu žetonu. Na primer, žeton ERC-20 deluje enako kot ETH, kar pomeni, da je in vedno bo 1 žeton enak vsem drugim žetonom.

## Predpogoji {#prerequisites}

- [Računi](/developers/docs/accounts)
- [Pametne pogodbe](/developers/docs/smart-contracts/)
- [Standardi za žetone](/developers/docs/standards/tokens/)

## Jedro {#body}

ERC-20 (Zahteva Ethereum za komentarje 20), ki ga je novembra 2015 predlagal Fabian Vogelsteller, je standard za žetone, ki implementira API za žetone znotraj pametnih pogodb.

Primeri funkcionalnosti, ki jih zagotavlja ERC-20:

- prenos žetonov z enega računa na drugega,
- pridobitev trenutnega stanja žetonov računa,
- pridobitev celotne zaloge žetona, dostopne na omrežju,
- odobritev možnosti, da lahko količino žetona z enega računa porabi račun tretje osebe.

Če pametna pogodba implementira naslednje metode in dogodke, se lahko imenuje pogodba žetona ERC-20; in ko je enkrat uveljavljena, bo odgovorna za sledenje ustvarjenih žetonov na Ethereumu.

Od [EIP-20](https://eips.ethereum.org/EIPS/eip-20):

#### Metode {#methods}

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

#### Dogodki {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### Primeri {#web3py-example}

Oglejmo si, zakaj je standard tako pomemben za to, da poenostavi pregled katerekoli pogodbe žetona ERC-20 na Ethereumu. Za ustvarjanje vmesnika za katerikoli žeton ERC-20 potrebujemo le binarni vmesnik pogodbene aplikacije (ABI). Kot lahko vidite spodaj, bomo uporabili poenostavljen ABI, da bi ustvarili primer z nizkim trenjem.

#### Primer Web3.py {#web3py-example}

Najprej se prepričajte, da ste namestili knjižnico [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python:

```
$ pip install web3
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

## Nadaljnje branje {#further-reading}

- [EIP-20: ERC-20 standard za žetone](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin – žetoni](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin – implementacija ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
