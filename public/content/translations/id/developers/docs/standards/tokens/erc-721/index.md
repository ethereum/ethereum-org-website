---
title: Standar Token yang Tidak Dapat Dipertukarkan ERC-721
description: Pelajari tentang ERC-721, standar untuk token yang tidak dapat dipertukarkan (NFT) yang mewakili aset digital unik di Ethereum.
lang: id
---

## Pengenalan {#introduction}

**Apa itu Token Non-Fungible?**

Token yang Tidak Dapat Dipertukarkan (NFT) digunakan untuk mengenali sesuatu atau seseorang dengan cara yang unik. Jenis Token ini tepat untuk
digunakan pada platform yang menawarkan item yang dapat dikoleksi, kunci akses, tiket lotre, kursi bernomor untuk konser dan
pertandingan olahraga, dll. Jenis Token spesial ini memiliki kemungkinan yang luar biasa sehingga layak mendapatkan Standar yang sesuai, ERC-721
hadir untuk memecahkannya!

**Apa itu ERC-721?**

ERC-721 memperkenalkan sebuah standar untuk NFT, dengan kata lain, tipe Token ini adalah unik dan bisa memiliki nilai yang
berbeda dari Token lainnya yang berasal dari Kontrak Pintar yang sama, mungkin dikarenakan usia, keunikan, atau bahkan hal lain seperti visualnya.
Tunggu, visualnya?

Ya! Semua NFT memiliki variabel `uint256` yang disebut `tokenId`, jadi untuk Kontrak ERC-721 mana pun, pasangan
`alamat kontrak, uint256 tokenId` harus unik secara global. Meskipun begitu, sebuah dapp dapat memiliki "konverter" yang
menggunakan `tokenId` sebagai masukan dan menghasilkan gambar sesuatu yang keren, seperti zombi, senjata, keterampilan, atau kucing-kucing yang luar biasa!

## Persyaratan {#prerequisites}

- [Akun](/developers/docs/accounts/)
- [Kontrak Pintar](/developers/docs/smart-contracts/)
- [Standar token](/developers/docs/standards/tokens/)

## Body {#body}

ERC-721 (Ethereum Request for Comments 721), yang diusulkan oleh William Entriken, Dieter Shirley, Jacob Evans,
Nastassia Sachs pada Januari 2018, adalah Standar Token yang Tidak Dapat Dipertukarkan yang menerapkan API untuk token di dalam Kontrak Pintar.

ERC-721 ini menyediakan fungsionalitas seperti mentransfer token dari satu akun ke akun lainnya, mendapatkan informasi saldo token saat ini dari sebuah
akun, mendapatkan pemilik token tertentu, dan juga informasi persediaan total dari token yang tersedia di jaringan.
Selain itu, juga memiliki beberapa fungsionalitas lain seperti memberi persetujuan untuk pemindahan sejumlah token dari sebuah akun
oleh akun pihak ketiga.

Jika Kontrak Pintar menerapkan metode dan aksi berikut, kontrak itu dapat disebut Kontrak Token yang Tidak Dapat Dipertukarkan ERC-721
dan, setelah digunakan, akan bertanggungjawab untuk melacak token yang dibuat di Ethereum.

Dari [EIP-721](https://eips.ethereum.org/EIPS/eip-721):

### Methods {#methods}

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

### Peristiwa {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### Contoh {#web3py-example}

Mari kita lihat bagaimana sebuah Standar begitu penting untuk mempermudah pemeriksaan Kontrak Token ERC-721 di Ethereum.
Kita hanya memerlukan Application Binary Interface (ABI) Kontrak untuk membuat antarmuka untuk Token ERC-721 mana pun. Seperti yang dapat
Anda lihat di bawah, kita akan menggunakan satu ABI yang disederhanakan, untuk membuatnya menjadi contoh bergesekan rendah.

#### Contoh Web3.py {#web3py-example}

Pertama, pastikan Anda telah menginstal pustaka Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # Kontrak CryptoKitties

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # Lelang Penjualan CryptoKitties

# Ini adalah Antarmuka Biner Aplikasi (ABI) Kontrak yang disederhanakan dari Kontrak NFT ERC-721.
# Ini hanya akan mengekspos metode: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
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

ck_contract = w3.eth.contract(address=w3.to_checksum_address(ck_token_addr), abi=simplified_abi+ck_extra_abi)
name = ck_contract.functions.name().call()
symbol = ck_contract.functions.symbol().call()
kitties_auctions = ck_contract.functions.balanceOf(acc_address).call()
print(f"{name} [{symbol}] NFT dalam Lelang: {kitties_auctions}")

pregnant_kitties = ck_contract.functions.pregnantKitties().call()
print(f"{name} [{symbol}] NFT Hamil: {pregnant_kitties}")

# Menggunakan ABI Event Transfer untuk mendapatkan info tentang Kitties yang ditransfer.
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# Kita memerlukan tanda tangan event untuk memfilter log
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# Catatan:
#   - Tambah jumlah blok dari 120 jika tidak ada event Transfer yang dikembalikan.
#   - Jika Anda tidak menemukan event Transfer, Anda juga dapat mencoba mendapatkan tokenId di:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       Klik untuk memperluas log event dan salin argumen "tokenId"-nya
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # Tempel "tokenId" dari tautan di atas di sini
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFT {kitty_id} sedang hamil: {is_pregnant}")
```

Kontrak CryptoKitties memiliki beberapa Aksi menarik selain dari aksi Standar.

Mari kita periksa dua di antaranya, `Pregnant` dan `Birth`.

```python
# Menggunakan ABI Event Pregnant dan Birth untuk mendapatkan info tentang Kitties baru.
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

# Kita memerlukan tanda tangan event untuk memfilter log
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# Ini adalah Event Pregnant:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# Ini adalah Event Birth:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## NFT Populer {#popular-nfts}

- [Etherscan NFT Tracker](https://etherscan.io/nft-top-contracts) mendaftarkan NFT teratas di Ethereum berdasarkan volume transfer.
- [CryptoKitties](https://www.cryptokitties.co/) adalah sebuah game yang berpusat pada makhluk yang dapat dikembangbiakkan, dapat dikoleksi, dan sangat menggemaskan
  yang kita sebut CryptoKitties.
- [Sorare](https://sorare.com/) adalah sebuah game sepakbola fantasi global tempat Anda dapat mengumpulkan item koleksi edisi terbatas,
  mengelola tim, dan bersaing untuk mendapatkan hadiah.
- [Layanan Nama Ethereum (ENS)](https://ens.domains/) menawarkan cara yang aman & terdesentralisasi untuk mengalamatkan sumber daya baik
  di dalam maupun di luar rantai blok menggunakan nama-nama yang sederhana dan dapat dibaca manusia.
- [POAP](https://poap.xyz) memberikan NFT gratis kepada orang-orang yang menghadiri acara atau menyelesaikan tindakan tertentu. POAP gratis untuk dibuat dan didistribusikan.
- [Unstoppable Domains](https://unstoppabledomains.com/) adalah sebuah perusahaan yang berbasis di San Francisco yang membangun domain di
  rantai blok. Domain rantai blok menggantikan alamat mata uang kripto dengan nama yang dapat dibaca manusia dan dapat digunakan untuk mengaktifkan
  situs web yang tahan sensor.
- [Gods Unchained Cards](https://godsunchained.com/) adalah TCG di rantai blok Ethereum yang menggunakan NFT untuk memberikan kepemilikan nyata
  atas aset dalam game.
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) adalah koleksi 10.000 NFT unik, yang, selain menjadi sebuah karya seni yang terbukti langka, juga berfungsi sebagai token keanggotaan klub, yang menyediakan fasilitas dan keuntungan bagi anggota yang meningkat seiring waktu sebagai hasil dari upaya komunitas.

## Bacaan lebih lanjut {#further-reading}

- [EIP-721: Standar Token ERC-721 yang Tidak Dapat Dipertukarkan](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - Dokumentasi ERC-721](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - Implementasi ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [API NFT Alchemy](https://www.alchemy.com/docs/reference/nft-api-quickstart)
