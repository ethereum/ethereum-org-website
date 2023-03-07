---
title: ERC-223 Token Standard
description:
lang: en
---

## Introduction {#introduction}

**What is ERC-223?**

The ERC-223 is another standard for Fungible Tokens, like the ERC-20. The key difference is that ERC-223 defines not only the token API, but also the logic of how tokens should be transferred from sender to recipient and introduces a communication model that allows token transfers to be handled on the recipients side.

**How is it different from ERC-20 and why we need another token standard?**

ERC-223 addresses some limitations of ERC-20 and introduces a new method of interactions between token contract and a contract that may receive the tokens. There are few things that are possible with ERC-223 but not with ERC-20:

- Token transfer handling on the recipient's side. Recipient can detect that a ERC-223 token is being deposited.
- Rejection of improperly sent tokens. If a user sent ERC-223 tokens to a contract that is not supposed to receive tokens then the contract can reject the transaction and the tokens will not be lost.
- The transfer of ERC-223 tokens may contain metadata, which allows arbitrary information to be attached to the token transactions.

## Prerequisites {#prerequisites}

- [Accounts](/developers/docs/accounts)
- [Smart Contracts](/developers/docs/smart-contracts/)
- [Token standards](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Body {#body}

The ERC-20 (Ethereum Request for Comments 20), proposed by Fabian Vogelsteller in November 2015, is a Token Standard that
implements an API for tokens within Smart Contracts.

Example functionalities ERC-20 provides:

- transfer tokens from one account to another
- get the current token balance of an account
- get the total supply of the token available on the network
- approve whether an amount of token from an account can be spent by a third-party account

If a Smart Contract implements the following methods and events it can be called an ERC-20 Token Contract and, once deployed, it
will be responsible to keep track of the created tokens on Ethereum.

From [EIP-20](https://eips.ethereum.org/EIPS/eip-20):

#### Methods {#methods}

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

#### Events {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### Examples {#web3py-example}

Let's see how a Standard is so important to make things simple for us to inspect any ERC-20 Token Contract on Ethereum.
We just need the Contract Application Binary Interface (ABI) to create an interface to any ERC-20 Token. As you can
see below we will use a simplified ABI, to make it a low friction example.

#### Web3.py Example {#web3py-example}

First, make sure you have installed [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python library:

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

## Further reading {#further-reading}

- [EIP-223: ERC-223 Token Standard](https://eips.ethereum.org/EIPS/eip-223)
- [Initial ERC-223 proposal](https://github.com/ethereum/eips/issues/223)
