---
title: Token ERC-20 Standard
description:
lang: ro
sidebar: true
---

## Introducere {#introduction}

**Ce este un token?**

Tokenurile pot reprezenta practic orice în Ethereum:

- puncte de reputație într-o platformă online
- abilități ale unui personaj într-un joc
- bilete de loterie
- active financiare cum ar fi o acțiune într-o întreprindere
- o monedă fiat precum USD
- o uncie de aur
- și altele...

O caracteristică atât de puternică a lui Ethereum trebuie gestionată printr-un standard robust, nu? Exact aici ERC-20 își joacă rolul! Aceste standarde permit programatorilor să construiască aplicații token care sunt interoperabile cu alte produse și servicii.

**Ce este ERC-20?**

ERC-20 introduce un standard pentru tokenurile Fungibile, cu alte cuvinte, au o proprietate care face ca fiecare token să fie exact la fel (în tip și valoare) cu alt token. De exemplu, un token ERC-20 acționează exact ca ETH-ul, însemnând că 1 token este și va fi întotdeauna egal cu toate celelalte tokenuri.

## Condiții prealabile {#prerequisites}

- [Conturi](/developers/docs/accounts)
- [Contracte inteligente](/developers/docs/smart-contracts/)
- [Standarde token](/developers/docs/standards/tokens/)

## Conținut {#body}

ERC-20 (Cerere pentru comentarii Ethereum 20), propus de Fabian Vogelsteller în noiembrie 2015, este un standard de tokenuri care implementează un API pentru tokenuri în cadrul contractelor inteligente.

Oferă funcționalități cum ar fi transferul de tokenuri dintr-un cont în altul, pentru a obține soldul actual al tokenurilor unui cont și de asemenea, furnizarea totalului de tokenuri disponibile în rețea. Pe lângă acestea, are și alte funcționalități cum ar fi să aprobe ca o sumă de tokenuri dintr-un cont să poată fi cheltuită de un cont terț.

Dacă un contract inteligent implementează următoarele metode și evenimente, poate fi numit contract token ERC-20 și, odată implementat, acesta va fi responsabil să țină evidența tokenelor create pe Ethereum.

De la [EIP-20](https://eips.ethereum.org/EIPS/eip-20):

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

#### Evenimente {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### Exemple {#web3py-example}

Să vedem cum un standard este atât de important pentru a simplifica lucrurile pentru noi pentru a inspecta orice contract token ERC-20 pe Ethereum. Avem nevoie doar de Interfața binară aplicație (ABI) a contractului pentru a crea o interfață pentru orice token ERC-20. După cum poți să vezi mai jos, vom folosi un ABI simplificat, pentru a face exemplul ușor de înțeles.

#### Exemplu Web3.py {#web3py-example}

În primul rând, asigură-te că ai instalat librăria Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
$ pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # Wrapped eter (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# Aceasta este o interfață binară simplificată pentru aplicația contractuală (ABI) a unui token Contract ERC-20.
# Va expune doar metodele: balanceOf(address), decimals(), symbol() and totalSupply()
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

## Referințe suplimentare {#further-reading}

- [EIP-20: Standard de token ERC-20](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - Tokenuri](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - Implementare ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [ConsenSys - Implementarea ERC-20](https://github.com/ConsenSys/Tokens/blob/master/contracts/eip20/EIP20.sol)

## Subiecte corelate {#related-topics}

- [ERC-721](/developers/docs/standards/tokens/erc-721/)
- [ERC-777](/developers/docs/standards/tokens/erc-777/)
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/)
