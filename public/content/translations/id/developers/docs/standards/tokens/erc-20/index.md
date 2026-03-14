---
title: Standar Token ERC-20
description: Pelajari tentang ERC-20, standar untuk token yang dapat dipertukarkan pada Ethereum yang memungkinkan aplikasi token yang dapat dioperasikan.
lang: id
---

## Pengenalan {#introduction}

**Apa itu Token?**

Token bisa melambangkan hampir semua hal di Ethereum:

- poin reputasi dalam sebuah platform online
- kemampuan suatu karakter dalam game
- aset keuangan seperti saham dalam sebuah perusahaan
- mata uang fiat seperti USD
- satu ons emas
- dan banyak lagi...

Fitur yang begitu kuat dari Ethereum ini harus ditangani oleh standar yang juga kuat, bukan? Di situlah tepatnya
ERC-20 memainkan perannya! Standar ini memungkinkan pengembang menyusun aplikasi token yang dapat bertukar informasi dengan produk dan layanan lainnya. Standar ERC-20 juga digunakan untuk memberikan fungsionalitas tambahan pada [ether](/glossary/#ether).

**Apa itu ERC-20?**

ERC-20 memperkenalkan standar untuk Token Fungible, dengan kata lain, mereka memiliki sifat yang membuat setiap Token menjadi persis sama (dalam tipe dan nilai) dengan Token lainnya. Sebagai contoh, satu Token ERC-20 bertindak sama seperti ETH, berarti 1 Token
adalah dan akan selalu sama dengan semua Token lainnya.

## Persyaratan {#prerequisites}

- [Akun](/developers/docs/accounts)
- [Kontrak Pintar](/developers/docs/smart-contracts/)
- [Standar token](/developers/docs/standards/tokens/)

## Body {#body}

ERC-20 (Ethereum Request for Comments 20), yang diusulkan oleh Fabian Vogelsteller pada November 2015, adalah Standar Token yang
menerapkan API untuk token dalam Kontrak Pintar.

ERC-20 fungsionalitas percontohan menyediakan:

- transfer token dari satu akun ke akun lainnya
- mendapatkan saldo token saat ini dari suatu akun
- mendapatkan total persediaan token yang tersedia di jaringan
- menyetujui apakah jumlah token dari suatu akun dapat dipakai oleh akun pihak ketiga

Jika Kontrak Pintar menerapkan metode dan aksi berikut ini, kontrak tersebut dapat disebut sebagai Kontrak Token ERC-20 dan,
setelah digunakan, kontrak ini akan bertanggungjawab untuk melacak token yang dibuat di Ethereum.

Dari [EIP-20](https://eips.ethereum.org/EIPS/eip-20):

### Methods {#methods}

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

### Peristiwa {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### Contoh {#web3py-example}

Mari kita lihat bagaimana sebuah Standar begitu penting untuk mempermudah pemeriksaan Kontrak Token ERC-20 di Ethereum.
Kita hanya memerlukan Application Binary Interface (ABI) Kontrak untuk membuat antarmuka untuk Token ERC-20 mana pun. Seperti yang dapat
Anda lihat di bawah, kita akan menggunakan satu ABI yang disederhanakan, untuk membuatnya menjadi contoh bergesekan rendah.

#### Contoh Web3.py {#web3py-example}

Pertama, pastikan Anda telah menginstal pustaka Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # Ether terbungkus (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# Ini adalah Antarmuka Biner Aplikasi (ABI) Kontrak yang disederhanakan dari Kontrak Token ERC-20.
# Ini hanya akan mengekspos metode: balanceOf(address), decimals(), symbol() dan totalSupply()
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
print("Pasokan Total:", totalSupply)
print("Saldo Alamat:", addr_balance)

weth_contract = w3.eth.contract(address=w3.to_checksum_address(weth_token_addr), abi=simplified_abi)
symbol = weth_contract.functions.symbol().call()
decimals = weth_contract.functions.decimals().call()
totalSupply = weth_contract.functions.totalSupply().call() / 10**decimals
addr_balance = weth_contract.functions.balanceOf(acc_address).call() / 10**decimals

#  WETH
print("===== %s =====" % symbol)
print("Pasokan Total:", totalSupply)
print("Saldo Alamat:", addr_balance)
```

## Masalah yang diketahui {#erc20-issues}

### Masalah penerimaan token ERC-20 {#reception-issue}

**Hingga 20/06/2024 setidaknya token ERC-20 senilai $83.656.418 hilang karena masalah ini. Perhatikan bahwa implementasi murni ERC-20 rentan terhadap masalah ini kecuali Anda mengimplementasikan serangkaian batasan tambahan di atas standar seperti yang tercantum di bawah ini.**

Saat token ERC-20 dikirim ke smart contract yang tidak dirancang untuk menangani token ERC-20, token tersebut bisa hilang secara permanen. Hal ini terjadi karena kontrak penerima tidak memiliki fungsionalitas untuk mengenali atau merespons token yang masuk, dan tidak ada mekanisme dalam standar ERC-20 untuk memberi tahu kontrak penerima tentang token yang masuk tersebut. Masalah ini biasanya terjadi melalui:

1. Mekanisme transfer token

- Token ERC-20 dikirim lewat fungsi transfer atau transferFrom
  - Saat pengguna mengirim token ke alamat kontrak melalui fungsi ini, token tetap terkirim meski kontrak penerima tidak siap menanganinya

2. Kurangnya pemberitahuan
   - Kontrak penerima tidak menerima pemberitahuan atau panggilan balik bahwa token telah dikirim kepadanya
   - Jika kontrak penerima tidak mempunyai mekanisme untuk menangani token (misalnya, fungsi diterima atau fungsi khusus untuk mengelola penerimaan token), maka token tersebut secara efektif terjebak di alamat kontrak.
3. Tidak ada penanganan bawaan
   - Standar ERC-20 tidak mencakup fungsi wajib yang harus diimplementasikan oleh kontrak penerima, sehingga banyak kontrak tidak dapat menangani token yang masuk dengan benar

**Solusi yang Mungkin**

Meskipun tidak mungkin sepenuhnya mencegah masalah ini pada ERC-20, ada metode yang memungkinkan mengurangi kemungkinan hilangnya token bagi pengguna secara signifikan:

- Masalah yang paling umum terjadi ketika pengguna mengirim token ke alamat kontrak token itu sendiri (misalnya, USDT disetorkan ke alamat kontrak token USDT). Disarankan untuk membatasi fungsi `transfer(..)` untuk mengembalikan upaya transfer tersebut. Pertimbangkan untuk menambahkan pemeriksaan `require(_to != address(this));` dalam implementasi fungsi `transfer(..)`.
- Fungsi `transfer(..)` secara umum tidak dirancang untuk menyetorkan token ke kontrak. `menyetujui(..) Pola `& transferFrom(..)`digunakan untuk menyetorkan token ERC-20 ke kontrak sebagai gantinya. Dimungkinkan untuk membatasi fungsi transfer agar tidak mengizinkan penyetoran token ke kontrak mana pun dengannya, namun hal ini dapat merusak kompatibilitas dengan kontrak yang mengasumsikan token dapat disetorkan ke kontrak dengan fungsi`trasnfer(..)` (misalnya, pool likuiditas Uniswap).
- Selalu berasumsi bahwa token ERC-20 dapat berakhir di kontrak Anda meskipun kontrak Anda tidak seharusnya pernah menerima apa pun. Tidak ada cara untuk mencegah atau menolak penyetoran yang tidak disengaja di pihak penerima. Disarankan untuk mengimplementasikan fungsi yang memungkinkan ekstraksi token ERC-20 yang tersimpan secara tidak sengaja.
- Pertimbangkan untuk menggunakan standar token alternatif.

Beberapa standar alternatif telah muncul dari masalah ini seperti [ERC-223](/developers/docs/standards/tokens/erc-223) atau [ERC-1363](/developers/docs/standards/tokens/erc-1363).

## Bacaan lebih lanjut {#further-reading}

- [EIP-20: ERC-20 Token Standard](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - Token](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - Implementasi ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Panduan untuk Token ERC20 Solidity](https://www.alchemy.com/overviews/erc20-solidity)

## Standar token dapat dipertukarkan lainnya {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - Vault yang ditokenisasi](/developers/docs/standards/tokens/erc-4626)
