---
title: ERC-20 Token-Standard
description:
lang: de
---

## Einführung {#introduction}

**Was ist ein Token?**

Token können praktisch alles in Ethereum darstellen:

- Reputationspunkte auf einer Online-Platform
- Fähigkeiten eines Charakters in einem Spiel
- Lotteriescheine
- Vermögenswerte wie Anteile an einer Firma
- Eine Fiat-Währung wie der US-Dollar
- Eine Goldunze
- und weitere...

Diese mächtigen Eigenschaften von Ethereum sollten in einem stabilen Standard bereitgestellt werden, oder? Und genau das ist der Punkt, an dem ERC-20 ins Spiel kommt! Dieser Standard ermöglicht es Entwicklern, Token zu erstellen, die mit anderen Produkten und Services interagieren können.

**Was ist ERC-20?**

Der ERC-20 führt einen Standard für Fungible Token ein. Mit anderen Worten, sie haben eine Eigenschaft, bei der jeder Token in Bezug auf Typ und Wert anderen Token entspricht. Zum Beispiel verhält sich ein ERC-20-Token genau wie der ETH. Das bedeutet, dass ein Token immer dem Wert aller anderen Token entspricht.

## Voraussetzungen {#prerequisites}

- [Konten](/developers/docs/accounts)
- [Smart Contracts](/developers/docs/smart-contracts/)
- [Token-Standards](/developers/docs/standards/tokens/)

## Hauptteil {#body}

Der im November 2015 von Fabian Vogelsteller eingereichte ERC-20-Antrag (Ethereum Request for Comments 20) ist ein Token-Standard, der eine API für Tokens innerhalb von Smart Contracts implementiert.

Beispielfunktionalitäten, die ERC-20 bietet:

- Token von einem Konto auf ein anderes übertragen
- den aktuellen Token-Saldo eines Kontos abfragen
- den im Netz verfügbaren Gesamtvorrat an Token ermitteln
- genehmigen, ob ein Token-Betrag von einem Konto durch ein Drittkonto ausgegeben werden kann

Wenn ein Smart Contract die folgenden Methoden und Ereignisse implementiert, kann er als ERC-20-Token-Vertrag bezeichnet werden und ist nach der Bereitstellung dafür verantwortlich, die erstellten Token auf Ethereum zu verfolgen.

Von [EIP-20](https://eips.ethereum.org/EIPS/eip-20):

### Methoden {#methods}

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

### Events {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### Beispiele {#web3py-example}

Sehen wir uns an, wie wichtig ein Standard ist, um uns die Überprüfung jedes ERC-20-Token-Vertrags auf Ethereum zu erleichtern. Wir benötigen lediglich das Contract Application Binary Interface (ABI), um eine Schnittstelle zu einem beliebigen ERC-20-Token zu erstellen. Wie Sie unten sehen können, werden wir ein vereinfachtes ABI verwenden, um es zu einem Beispiel mit geringer Reibung zu machen.

#### Web3.py Beispiel {#web3py-example}

Stellen Sie zuerst sicher, dass Sie [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python-Bibliothek installiert haben:

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # Wrapped ether (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# Dies ist ein vereinfachtes Contract Application Binary Interface (ABI) eines ERC-20 Token Contracts.
# Es werden nur die Methoden verfügbar gemacht: balanceOf(address), decimals(), symbol() und totalSupply()
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

## Weiterführende Informationen {#further-reading}

- [EIP-20: ERC-20 Token Standard](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - Token](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - ERC-20 Implementierung](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
