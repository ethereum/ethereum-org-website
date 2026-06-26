---
title: Standar Token ERC-20
description: Pelajari tentang ERC-20, standar untuk token sepadan di Ethereum yang memungkinkan aplikasi token yang interoperabel.
lang: id
---

## Pengantar {#introduction}

**Apa itu Token?**

Token dapat mewakili hampir apa saja di [Ethereum](/):

- poin reputasi di platform online
- keterampilan karakter dalam sebuah permainan
- aset keuangan seperti saham di sebuah perusahaan
- mata uang fiat seperti USD
- satu ons emas
- dan banyak lagi...

Fitur Ethereum yang begitu kuat harus ditangani oleh standar yang tangguh, bukan? Di situlah tepatnya ERC-20 memainkan perannya! Standar ini memungkinkan pengembang untuk membangun aplikasi token yang interoperabel dengan produk dan layanan lain. Standar ERC-20 juga digunakan untuk memberikan fungsionalitas tambahan pada [Ether](/glossary/#ether).

**Apa itu ERC-20?**

ERC-20 memperkenalkan standar untuk Token Sepadan, dengan kata lain, mereka memiliki properti yang membuat setiap Token sama persis (dalam jenis dan nilai) dengan Token lainnya. Misalnya, Token ERC-20 bertindak seperti halnya ETH, yang berarti bahwa 1 Token adalah dan akan selalu sama dengan semua Token lainnya.

## Prasyarat {#prerequisites}

- [Akun](/developers/docs/accounts)
- [Kontrak Pintar](/developers/docs/smart-contracts/)
- [Standar token](/developers/docs/standards/tokens/)

## Isi {#body}

ERC-20 (Ethereum Request for Comments 20), yang diusulkan oleh Fabian Vogelsteller pada November 2015, adalah Standar Token yang mengimplementasikan API untuk token di dalam Kontrak Pintar.

Contoh fungsionalitas yang disediakan ERC-20:

- mentransfer token dari satu akun ke akun lainnya
- mendapatkan saldo token saat ini dari sebuah akun
- mendapatkan total pasokan token yang tersedia di jaringan
- menyetujui apakah sejumlah token dari suatu akun dapat dihabiskan oleh akun pihak ketiga

Jika sebuah Kontrak Pintar mengimplementasikan metode dan peristiwa berikut, kontrak tersebut dapat disebut sebagai Kontrak Token ERC-20 dan, setelah diterapkan, kontrak tersebut akan bertanggung jawab untuk melacak token yang dibuat di Ethereum.

Dari [EIP-20](https://eips.ethereum.org/EIPS/eip-20):

### Metode {#methods}

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

Mari kita lihat bagaimana sebuah Standar sangat penting untuk memudahkan kita dalam memeriksa Kontrak Token ERC-20 apa pun di Ethereum.
Kita hanya memerlukan Contract Application Binary Interface (ABI) untuk membuat antarmuka ke Token ERC-20 mana pun. Seperti yang dapat Anda lihat di bawah ini, kita akan menggunakan ABI yang disederhanakan, untuk menjadikannya contoh yang mudah dipahami.

#### Contoh Web3.py {#web3py-example-2}

Pertama, pastikan Anda telah menginstal pustaka Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # Wrapped Ether (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# Ini adalah Application Binary Interface (ABI) Kontrak yang disederhanakan dari kontrak token ERC-20.
# Ini hanya akan mengekspos metode: balanceOf(alamat), decimals(), symbol(), dan totalSupply()
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

## Masalah yang diketahui {#erc20-issues}

### Masalah penerimaan token ERC-20 {#reception-issue}

**Hingga 20/06/2024, setidaknya token ERC-20 senilai $83.656.418 hilang karena masalah ini. Perhatikan bahwa implementasi ERC-20 murni rentan terhadap masalah ini kecuali Anda menerapkan serangkaian batasan tambahan di atas standar seperti yang tercantum di bawah ini.**

Ketika token ERC-20 dikirim ke kontrak pintar yang tidak dirancang untuk menangani token ERC-20, token tersebut dapat hilang secara permanen. Hal ini terjadi karena kontrak penerima tidak memiliki fungsionalitas untuk mengenali atau merespons token yang masuk, dan tidak ada mekanisme dalam standar ERC-20 untuk memberi tahu kontrak penerima tentang token yang masuk. Cara utama masalah ini terjadi adalah melalui:

1.	Mekanisme transfer token
  - Token ERC-20 ditransfer menggunakan fungsi transfer atau transferFrom
	-	Ketika pengguna mengirim token ke alamat kontrak menggunakan fungsi-fungsi ini, token ditransfer terlepas dari apakah kontrak penerima dirancang untuk menanganinya
2.	Kurangnya pemberitahuan
	-	Kontrak penerima tidak menerima pemberitahuan atau panggilan balik bahwa token telah dikirim kepadanya
	-	Jika kontrak penerima tidak memiliki mekanisme untuk menangani token (misalnya, fungsi fallback atau fungsi khusus untuk mengelola penerimaan token), token tersebut secara efektif tertahan di alamat kontrak
3.	Tidak ada penanganan bawaan
	-	Standar ERC-20 tidak menyertakan fungsi wajib untuk diimplementasikan oleh kontrak penerima, yang mengarah pada situasi di mana banyak kontrak tidak dapat mengelola token yang masuk dengan benar

**Kemungkinan Solusi**

Meskipun tidak mungkin untuk mencegah masalah ini dengan ERC-20 sepenuhnya, ada metode yang memungkinkan untuk secara signifikan mengurangi kemungkinan hilangnya token bagi pengguna akhir:

- Masalah yang paling umum adalah ketika pengguna mengirim token ke alamat kontrak token itu sendiri (misalnya, USDT disetorkan ke alamat kontrak token USDT). Disarankan untuk membatasi fungsi `transfer(..)` untuk mengembalikan upaya transfer semacam itu. Pertimbangkan untuk menambahkan pemeriksaan `require(_to != address(this));` di dalam implementasi fungsi `transfer(..)`.
- Fungsi `transfer(..)` pada umumnya tidak dirancang untuk menyetorkan token ke kontrak. Pola `approve(..) & transferFrom(..)` digunakan untuk menyetorkan token ERC-20 ke kontrak sebagai gantinya. Dimungkinkan untuk membatasi fungsi transfer agar tidak mengizinkan penyetoran token ke kontrak apa pun dengannya, namun hal itu dapat merusak kompatibilitas dengan kontrak yang mengasumsikan token dapat disetorkan ke kontrak dengan fungsi `transfer(..)` (misalnya, kolam Likuiditas Uniswap).
- Selalu asumsikan bahwa token ERC-20 dapat berakhir di kontrak Anda meskipun kontrak Anda tidak seharusnya menerimanya. Tidak ada cara untuk mencegah atau menolak setoran yang tidak disengaja di pihak penerima. Disarankan untuk mengimplementasikan fungsi yang memungkinkan untuk mengekstrak token ERC-20 yang disetorkan secara tidak sengaja.
- Pertimbangkan untuk menggunakan standar token alternatif.

Beberapa standar alternatif telah muncul dari masalah ini seperti [ERC-223](/developers/docs/standards/tokens/erc-223) atau [ERC-1363](/developers/docs/standards/tokens/erc-1363).

## Bacaan lebih lanjut {#further-reading}

- [EIP-20: Standar Token ERC-20](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - Token](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - Implementasi ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Panduan untuk Token ERC20 Solidity](https://www.alchemy.com/overviews/erc20-solidity)

## Standar token sepadan lainnya {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - Brankas yang ditokenisasi](/developers/docs/standards/tokens/erc-4626)

## Tutorial: Membangun dengan ERC-20 di Ethereum {#tutorials}

- [Panduan Kontrak ERC-20](/developers/tutorials/erc20-annotated-code/) _– Panduan beranotasi baris demi baris dari implementasi kontrak ERC-20 OpenZeppelin._
- [ERC-20 dengan Rel Pengaman](/developers/tutorials/erc20-with-safety-rails/) _– Cara menambahkan pengamanan pada token ERC-20 untuk membantu pengguna menghindari kesalahan umum._
- [Mengirim Token Menggunakan Ethers.js](/developers/tutorials/send-token-ethersjs/) _– Panduan ramah pemula untuk mentransfer token ERC-20 menggunakan Ethers.js._
- [Beberapa trik yang digunakan oleh token penipuan dan cara mendeteksinya](/developers/tutorials/scam-token-tricks/) _– Eksplorasi mendetail tentang pola token ERC-20 penipuan dan cara mengidentifikasinya._