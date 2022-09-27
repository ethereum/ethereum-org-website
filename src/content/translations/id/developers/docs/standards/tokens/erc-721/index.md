---
title: Standar Token Non-Fungible ERC-721
description:
lang: id
---

## Pendahuluan {#introduction}

**Apa itu Token Non-Fungible?**

Token yang Tidak Dapat Dipertukarkan (NFT) digunakan untuk mengenali sesuatu atau seseorang dengan cara yang unik. Jenis Token ini tepat untuk digunakan pada platform yang menawarkan item yang dapat dikoleksi, kunci akses, tiket lotre, kursi bernomor untuk konser dan pertandingan olahraga, dll. Jenis Token spesial ini memiliki kemungkinan yang luar biasa sehingga layak mendapatkan Standar yang sesuai, ERC-721 hadir untuk memecahkannya!

**Apa itu ERC-721?**

ERC-721 memperkenalkan sebuah standar untuk NFT, dengan kata lain, tipe Token ini adalah unik dan bisa memiliki nilai yang berbeda dari Token lainnya yang berasal dari Kontrak Pintar yang sama, mungkin dikarenakan usia, keunikan, atau bahkan hal lain seperti visualnya. Tunggu, visualnya?

Ya! Semua NFT memiliki variabel `uint256` yang disebut `tokenId`, sehingga untuk Kontrak ERC-721 mana pun, pasangan `contract address, uint256 tokenId` harus bersifat unik secara global. Anggap saja, dApp bisa memiliki "konverter" yang menggunakan `tokenId` sebagai input dan output gambar dari sesuatu yang keren, seperti zombi, senjata, kemampuan, atau anak kucing yang menakjubkan!

## Prasyarat {#prerequisites}

- [Akun](/developers/docs/accounts/)
- [Kontrak Pintar](/developers/docs/smart-contracts/)
- [Standar token](/developers/docs/standards/tokens/)

## Tubuh {#body}

ERC-721 (Ethereum Request for Comments 721), yang diusulkan oleh William Entriken, Dieter Shirley, Jacob Evans, Nastassia Sachs pada Januari 2018, adalah Standar Token yang Tidak Dapat Dipertukarkan yang menerapkan API untuk token di dalam Kontrak Pintar.

ERC-721 ini menyediakan fungsionalitas seperti mentransfer token dari satu akun ke akun lainnya, mendapatkan informasi saldo token saat ini dari sebuah akun, mendapatkan pemilik token tertentu, dan juga informasi persediaan total dari token yang tersedia di jaringan. Selain itu, juga memiliki beberapa fungsionalitas lain seperti memberi persetujuan untuk pemindahan sejumlah token dari sebuah akun oleh akun pihak ketiga.

Jika Kontrak Pintar menerapkan metode dan aksi berikut, kontrak itu dapat disebut Kontrak Token yang Tidak Dapat Dipertukarkan ERC-721 dan, setelah digunakan, akan bertanggungjawab untuk melacak token yang dibuat di Ethereum.

Dari [EIP-721](https://eips.ethereum.org/EIPS/eip-721):

#### Metode {#methods}

```solidity
    function balanceOf(address _owner) external view returns (uint256);
    function ownerOf(uint256 _tokenId) external view returns (address);
    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable;
    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable;
    function transferFrom(address _from, address _to, uint256 _tokenId) external payable;
    function approve(address _approved, uint256 _tokenId) external payable;
    function setApprovalForAll(address _operator, bool _approved) external;
    function getApproved(uint256 _tokenId) external view returns (address);
    function isApprovedForAll(address _owner, address _operator) external view returns (bool);
```

#### Aksi {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### Contoh {#web3py-example}

Mari kita lihat bagaimana sebuah Standar begitu penting untuk mempermudah pemeriksaan Kontrak Token ERC-721 di Ethereum. Kita hanya memerlukan Application Binary Interface (ABI) Kontrak untuk membuat antarmuka untuk Token ERC-721 mana pun. Seperti yang dapat Anda lihat di bawah, kita akan menggunakan satu ABI yang disederhanakan, untuk membuatnya menjadi contoh bergesekan rendah.

#### Contoh Web3.py {#web3py-example}

Pertama-tama, pastikan Anda telah menginstal pustaka Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
$ pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # CryptoKitties Contract

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # CryptoKitties Sales Auction

# Ini adalah sebuah Kontrak Application Binary Interface (ABI) yang disederhanakan dari kontrak NFT ERC-721.
# Kontrak akan hanya menampilkan metode: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
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

ck_extra_abi = [
    {
        'inputs': [],
        'name': 'pregnantKitties',
        'outputs': [{'name': '', 'type': 'uint256'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [{'name': '_kittyId', 'type': 'uint256'}],
        'name': 'isPregnant',
        'outputs': [{'name': '', 'type': 'bool'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    }
]

ck_contract = w3.eth.contract(address=w3.toChecksumAddress(ck_token_addr), abi=simplified_abi+ck_extra_abi)
name = ck_contract.functions.name().call()
symbol = ck_contract.functions.symbol().call()
kitties_auctions = ck_contract.functions.balanceOf(acc_address).call()
print(f"{name} [{symbol}] NFTs in Auctions: {kitties_auctions}")

pregnant_kitties = ck_contract.functions.pregnantKitties().call()
print(f"{name} [{symbol}] NFTs Pregnants: {pregnant_kitties}")

# Menggunakan ABI Aksi Transfer untuk mendapat informasi tentang Kitties yang ditransfer.
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# Kita membutuhkan tanda tangan aksi untuk menyaring log
event_signature = w3.sha3(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.getLogs({
    "fromBlock": w3.eth.blockNumber - 120,
    "address": w3.toChecksumAddress(ck_token_addr),
    "topics": [event_signature]
})

# Catatan:
#   - 120 blok adalah kisaran maksimum yang disediakan layanan Penyedia CloudFlare
#   - Jika Anda tidak menemukan Transfer event apa pun, Anda juga dapat mendapatkan tokenId di:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       Klik untuk memperluas log aksi dan salin argumen "tokenId"nya

recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

kitty_id = recent_tx[0]['tokenId'] # Paste the "tokenId" here from the link above
is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

Kontrak CryptoKitties memiliki beberapa Aksi menarik selain dari aksi Standar.

Mari kita lihat dua di antaranya, `Pregnant` dan `Birth`.

```python
# Menggunakan ABI Aksi Pregnant dan Birth untuk mendapatkan informasi tentang Kitties baru.
ck_extra_events_abi = [
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

# Kita membutuhkan tanda tangan aksi untuk menyaring log
ck_event_signatures = [
    w3.sha3(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.sha3(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# Berikut adalah Aksi Pregnant:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.getLogs({
    "fromBlock": w3.eth.blockNumber - 120,
    "address": w3.toChecksumAddress(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# Berikut adalah Aksi Birth:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.getLogs({
    "fromBlock": w3.eth.blockNumber - 120,
    "address": w3.toChecksumAddress(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## NFT Populer {#popular-nfts}

- [Pelacak NFT Etherscan](https://etherscan.io/tokens-nft) mendaftarkan NFT populer di Ethereum berdasarkan volume transfer.
- [CryptoKitties](https://www.cryptokitties.co/) adalah sebuah game yang berpusat pada mahluk yang dapat dikembangbiakkan, dikoleksi, dan begitu menggemaskan yang kita sebut CryptoKitties.
- [Sorare](https://sorare.com/) adalah sebuah game sepakbola fantasi global di mana Anda bisa mengumpulkan item koleksi edisi terbatas, mengatur tim Anda, dan berkompetisi untuk mendapatkah hadiah.
- [Layanan Nama Ethereum (ENS)](https://ens.domains/) menawarkan cara yang aman dan terdesentralisasi untuk mengelola sumber daya baik on dan off blockchain menggunakan nama yang sederhana dan mudah dimengerti.
- [Unstoppable Domains](https://unstoppabledomains.com/) adalah sebuah perusahaan berbasis di San Fransisco yang membangun domain di blockchain. Domain blockchain menggantikan alamat mata uang kripto dengan nama yang mudah dimengerti dan bisa digunakan untuk memungkinkan situs web yang tahan penyensoran.
- [Gods Unchained Cards](https://godsunchained.com/) adalah sebuah TCG pada blockchain Ethereum yang menggunakan NFT untuk membawa kepemilikan asli ke aset dalam game.
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) adalah koleksi dari 10.000 NFT unik, yang, selain merupakan karya seni langkah yang terbukti, bertindak sebagai token keanggotaan klub, yang menyediakan fasilitas dan keuntungan yang bertambah seiring dengan waktu sebagai hasil dari usaha komunitas.

## Bacaan lebih lanjut {#further-reading}

- [EIP-721: Standar Token Non-Fungible ERC-721](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - Dokumen ERC-721](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - Implementasi ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
