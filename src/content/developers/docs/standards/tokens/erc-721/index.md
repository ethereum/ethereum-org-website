---
title: ERC-721 Non-Fungible Token Standard
description:
lang: en
sidebar: true
---

## Introduction

**What is a Non-Fungible Token?**

...

**What is ERC-721?**

...

## Prerequisites

- [Accounts](/developers/docs/accounts)
- [Smart Contracts](/developers/docs/smart-contracts/)
- [Token standards](/developers/docs/standards/tokens/)

## Body

...

From [EIP-721](https://eips.ethereum.org/EIPS/eip-721):

#### Methods:

```solidity
...
```

#### Events:

```solidity
...
```

### Examples

Let's see how a Standard is so important to make things simple for us to inspect any ERC-721 Token Contract on Ethereum.
We just need the Contract Application Binary Interface (ABI) to create an interface to any ERC-721 Token. As you can
see below we will use a simplified ABI, to make it a low friction example.

#### Web3.py Example

First, make sure you have installed [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python library:

```
$ pip install web3
```

```python
from web3 import Web3
from web3.utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # CryptoKitties Contract

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # CryptoKitties Sales Auction

# This is a simplified Contract Application Binary Interface (ABI) of an ERC-721 NFT Contract.
# It will expose only the methods: balanceOf(address), ownerOf()
simplified_abi = [
    {
        'inputs': [{'internalType': 'address', 'name': 'owner', 'type': 'address'}],
        'name': 'balanceOf',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'name',
        'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [{'internalType': 'uint256', 'name': 'tokenId', 'type': 'uint256'}],
        'name': 'ownerOf',
        'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
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
    },
]

extra_abi = [
    {
        'inputs': [],
        'name': 'pregnantKitties',
        'outputs': [{'name': '', 'type': 'uint256'}],
        'payable': False, 'stateMutability':'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [{'name': '_kittyId', 'type': 'uint256'}],
        'name': 'isPregnant',
        'outputs': [{'name': '', 'type': 'bool'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    }
]

ck_contract = w3.eth.contract(address=w3.toChecksumAddress(ck_token_addr), abi=simplified_abi+extra_abi)
name = ck_contract.functions.name().call()
symbol = ck_contract.functions.symbol().call()
kitties_auctions = ck_contract.functions.balanceOf(acc_address).call()
print(f"{name} [{symbol}] NFTs in Auctions: {kitties_auctions}")

pregnant_kitties = ck_contract.functions.pregnantKitties().call()
print(f"{name} [{symbol}] NFTs Pregnants: {pregnant_kitties}")

# Using the Transfer Event ABI to get info about transferred Kitties.
tx_event_abi = {
    'anonymous': False, 
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}], 
    'name': 'Transfer', 
    'type': 'event'
}

# We need the event's signature to filter the logs
event_signature = w3.sha3(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.getLogs({
    "fromBlock": w3.eth.blockNumber - 120,
    "address": w3.toChecksumAddress(ck_token_addr),
    "topics": [event_signature]
})

# Notes:
#   - 120 blocks is the max range for CloudFlare Provider
#   - If you didn't find any Transfer event you can get a tokenId at:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       Click to expand the event logs and copy its "tokenId" argument

recent_tx = [get_event_data(tx_event_abi, log)["args"] for log in logs]

kitty_id = recent_tx[0]['tokenId'] # Paste the "tokenId" here
is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```






```python
# Using the Pregnant and Birth Events ABI to get info about new Kitties.
ck_events_abi = [
{
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'owner', 'type': 'address'},
        {'indexed': False, 'name': 'matronId', 'type': 'uint256'},
        {'indexed': False, 'name': 'sireId', 'type': 'uint256'},
        {'indexed': False, 'name': 'cooldownEndBlock', 'type': 'uint256'}],
    'name': 'Pregnant',
    'type': 'event'
},
{
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'owner', 'type': 'address'},
        {'indexed': False, 'name': 'kittyId', 'type': 'uint256'},
        {'indexed': False, 'name': 'matronId', 'type': 'uint256'},
        {'indexed': False, 'name': 'sireId', 'type': 'uint256'},
        {'indexed': False, 'name': 'genes', 'type': 'uint256'}],
    'name': 'Birth',
    'type': 'event'
}]

# We need the event's signature to filter the logs
ck_event_signatures = [
    w3.sha3(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.sha3(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

import time
def check_events(n=10):
    for _ in range(n):
        pregnant_logs = w3.eth.getLogs({
            "fromBlock": w3.eth.blockNumber - 120,
            "address": w3.toChecksumAddress(ck_token_addr),
            "topics": [ck_event_signatures[0]]
        })
        birth_logs = w3.eth.getLogs({
            "fromBlock": w3.eth.blockNumber - 120,
            "address": w3.toChecksumAddress(ck_token_addr),
            "topics": [ck_event_signatures[1]]
        })
        if pregnant_logs or birth_logs:
            return pregnant_logs or birth_logs
        print("No Events...")
        time.sleep(15)
        print("Trying again...")
```

## Further reading

- [EIP-721: ERC-721 Non-Fungible Token Standard](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - ERC-721 Docs](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - ERC-721 Implementation](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)

## Related topics

- [ERC-20](/developers/docs/standards/tokens/erc-20/)
- [ERC-777](/developers/docs/standards/tokens/erc-777/)
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/)
