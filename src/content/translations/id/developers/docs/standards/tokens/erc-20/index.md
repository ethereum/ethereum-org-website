---
title: Standar Token ERC-20
description:
lang: id
---

## Pendahuluan {#introduction}

**Apa itu Token?**

Token bisa melambangkan hampir semua hal di Ethereum:

- poin reputasi dalam sebuah platform online
- kemampuan suatu karakter dalam game
- tiket lotre
- aset keuangan seperti saham dalam sebuah perusahaan
- mata uang fiat seperti USD
- satu ons emas
- dan banyak lagi...

Fitur yang begitu kuat dari Ethereum ini harus ditangani oleh standar yang juga kuat, bukan? Di situlah tepatnya ERC-20 memainkan perannya! Standar ini memungkinkan pengembang menyusun aplikasi token yang dapat bertukar informasi dengan produk dan layanan lainnya.

**Apa itu ERC-20?**

ERC-20 memperkenalkan sebuah standar untuk Token Fungible, dengan kata lain, mereka memiliki properti yang membuat tiap Token sama persis (dalam tipe dan nilai) dengan Token lainnya. Sebagai contoh, satu Token ERC-20 bertindak sama seperti ETH, berarti 1 Token adalah dan akan selalu sama dengan semua Token lainnya.

## Prasyarat {#prerequisites}

- [Akun](/developers/docs/accounts)
- [Kontrak Pintar](/developers/docs/smart-contracts/)
- [Standar token](/developers/docs/standards/tokens/)

## Tubuh {#body}

ERC-20 (Ethereum Request for Comments 20), yang diusulkan oleh Fabian Vogelsteller pada November 2015, adalah Standar Token yang menerapkan API untuk token dalam Kontrak Pintar.

ERC-20 fungsionalitas percontohan menyediakan:

- transfer token dati satu akun ke akun lainnya
- mendapatkan saldo token saat ini dari suatu akun
- mendapatkan total persediaan token yang tersedia di jaringan
- menyetujui apakah jumlah token dari suatu akun dapat dipakai oleh akun pihak ketiga

Jika Kontrak Pintar menerapkan metode dan aksi berikut ini, kontrak tersebut dapat disebut sebagai Kontrak Token ERC-20 dan, setelah digunakan, kontrak ini akan bertanggungjawab untuk melacak token yang dibuat di Ethereum.

Dari [EIP-20](https://eips.ethereum.org/EIPS/eip-20):

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

#### Aksi {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### Contoh {#web3py-example}

Mari kita lihat bagaimana sebuah Standar begitu penting untuk mempermudah pemeriksaan Kontrak Token ERC-20 di Ethereum. Kita hanya memerlukan Application Binary Interface (ABI) Kontrak untuk membuat antarmuka untuk Token ERC-20 mana pun. Seperti yang dapat Anda lihat di bawah, kita akan menggunakan satu ABI yang disederhanakan, untuk membuatnya menjadi contoh bergesekan rendah.

#### Contoh Web3.py {#web3py-example}

Pertama-tama, pastikan Anda telah menginstal pustaka Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
$ pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # Wrapped ether (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# Ini adalah sebuah Application Binary Interface (ABI) Kontrak yang disederhanakan dari sebuah Kontrak Token ERC-20.
# Kontrak hanya akan menampilkan metode: balanceOf(address), decimals(), symbol() and totalSupply()
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

## Bacaan lebih lanjut {#further-reading}

- [EIP-20: Standar Token ERC-20](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - Token](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - Implementasi ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
