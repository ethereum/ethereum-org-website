---
title: Standar Non-Fungible Token ERC-721
description: Pelajari tentang ERC-721, standar untuk non-fungible token (NFT) yang mewakili aset digital unik di Ethereum.
lang: id
---

## Pengantar {#introduction}

**Apa itu Non-Fungible Token?**

Non-Fungible Token (NFT) digunakan untuk mengidentifikasi sesuatu atau seseorang dengan cara yang unik. Jenis Token ini sangat cocok digunakan pada platform yang menawarkan barang koleksi, kunci akses, tiket lotre, kursi bernomor untuk konser dan pertandingan olahraga, dll. Jenis Token khusus ini memiliki kemungkinan yang luar biasa sehingga layak mendapatkan Standar yang tepat, ERC-721 hadir untuk menyelesaikannya!

**Apa itu ERC-721?**

ERC-721 memperkenalkan standar untuk NFT, dengan kata lain, jenis Token ini unik dan dapat memiliki nilai yang berbeda dari Token lain dari kontrak pintar yang sama, mungkin karena usianya, kelangkaannya, atau bahkan hal lain seperti visualnya. Tunggu, visual?

Ya! Semua NFT memiliki variabel `uint256` yang disebut `tokenId`, jadi untuk Kontrak ERC-721 apa pun, pasangan `alamat kontrak, uint256 tokenId` harus unik secara global. Oleh karena itu, sebuah dapp dapat memiliki "konverter" yang menggunakan `tokenId` sebagai input dan menghasilkan gambar sesuatu yang keren, seperti zombi, senjata, keterampilan, atau anak kucing yang luar biasa!

## Prasyarat {#prerequisites}

- [Akun](/developers/docs/accounts/)
- [Kontrak Pintar](/developers/docs/smart-contracts/)
- [Standar token](/developers/docs/standards/tokens/)

## Isi {#body}

ERC-721 ([Ethereum](/) Request for Comments 721), yang diusulkan oleh William Entriken, Dieter Shirley, Jacob Evans, Nastassia Sachs pada Januari 2018, adalah Standar Non-Fungible Token yang mengimplementasikan API untuk token di dalam kontrak pintar.

Ini menyediakan fungsionalitas seperti mentransfer token dari satu akun ke akun lain, untuk mendapatkan saldo token saat ini dari sebuah akun, untuk mendapatkan pemilik token tertentu dan juga total pasokan token yang tersedia di jaringan. Selain itu, ini juga memiliki beberapa fungsionalitas lain seperti menyetujui bahwa sejumlah token dari sebuah akun dapat dipindahkan oleh akun pihak ketiga.

Jika sebuah kontrak pintar mengimplementasikan metode dan peristiwa berikut, itu dapat disebut Kontrak Non-Fungible Token ERC-721 dan, setelah diterapkan, ia akan bertanggung jawab untuk melacak token yang dibuat di Ethereum.

Dari [EIP-721](https://eips.ethereum.org/EIPS/eip-721):

### Metode {#methods}

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

Mari kita lihat bagaimana sebuah Standar sangat penting untuk memudahkan kita memeriksa Kontrak Token ERC-721 apa pun di Ethereum. Kita hanya memerlukan Antarmuka Biner Aplikasi (ABI) Kontrak untuk membuat antarmuka ke Token ERC-721 apa pun. Seperti yang dapat Anda lihat di bawah ini, kita akan menggunakan ABI yang disederhanakan, untuk menjadikannya contoh dengan hambatan rendah.

#### Contoh Web3.py {#web3py-example}

Pertama, pastikan Anda telah menginstal pustaka Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # CryptoKitties Contract # Kontrak CryptoKitties

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # CryptoKitties Sales Auction # Lelang Penjualan CryptoKitties

# This is a simplified Contract Application Binary Interface (ABI) of an ERC-721 NFT Contract. # Ini adalah Contract Application Binary Interface (ABI) yang disederhanakan dari Kontrak NFT ERC-721.
# It will expose only the methods: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply() # Ini hanya akan mengekspos metode: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
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
print(f"{name} [{symbol}] NFTs in Auctions: {kitties_auctions}")

pregnant_kitties = ck_contract.functions.pregnantKitties().call()
print(f"{name} [{symbol}] NFTs Pregnants: {pregnant_kitties}")

# Using the Transfer Event ABI to get info about transferred Kitties. # Menggunakan ABI Event Transfer untuk mendapatkan info tentang Kitties yang ditransfer.
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# We need the event's signature to filter the logs # Kita memerlukan tanda tangan event untuk memfilter log
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# Notes: # Catatan:
#   - Increase the number of blocks up from 120 if no Transfer event is returned. # - Tingkatkan jumlah blok lebih dari 120 jika tidak ada event Transfer yang dikembalikan.
#   - If you didn't find any Transfer event you can also try to get a tokenId at: # - Jika Anda tidak menemukan event Transfer apa pun, Anda juga dapat mencoba mendapatkan tokenId di:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events # https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       Click to expand the event's logs and copy its "tokenId" argument # Klik untuk memperluas log event dan salin argumen "tokenId"-nya
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # Paste the "tokenId" here from the link above # Tempel "tokenId" di sini dari tautan di atas
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

Kontrak CryptoKitties memiliki beberapa Peristiwa menarik selain yang Standar.

Mari kita periksa dua di antaranya, `Pregnant` dan `Birth`.

```python
# Using the Pregnant and Birth Events ABI to get info about new Kitties. # Menggunakan ABI Event Pregnant dan Birth untuk mendapatkan info tentang Kitties baru.
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

# We need the event's signature to filter the logs # Kita memerlukan tanda tangan event untuk memfilter log
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# Here is a Pregnant Event: # Berikut adalah Event Pregnant:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog # - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# Here is a Birth Event: # Berikut adalah Event Birth:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a # - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## NFT Populer {#popular-nfts}

- [Etherscan NFT Tracker](https://etherscan.io/nft-top-contracts) mencantumkan NFT teratas di Ethereum berdasarkan volume transfer.
- [CryptoKitties](https://www.cryptokitties.co/) adalah permainan yang berpusat pada makhluk yang dapat dikembangbiakkan, dikoleksi, dan sangat menggemaskan yang kita sebut CryptoKitties.
- [Sorare](https://sorare.com/) adalah permainan sepak bola fantasi global di mana Anda dapat mengumpulkan barang koleksi edisi terbatas, mengelola tim Anda, dan bersaing untuk mendapatkan hadiah.
- [The Ethereum Name Service (ENS)](https://ens.domains/) menawarkan cara yang aman & terdesentralisasi untuk mengalamatkan sumber daya baik di dalam maupun di luar blockchain menggunakan nama yang sederhana dan dapat dibaca manusia.
- [POAP](https://poap.xyz) memberikan NFT gratis kepada orang-orang yang menghadiri acara atau menyelesaikan tindakan tertentu. POAP gratis untuk dibuat dan didistribusikan.
- [Unstoppable Domains](https://unstoppabledomains.com/) adalah perusahaan yang berbasis di San Francisco yang membangun domain di blockchain. Domain blockchain menggantikan alamat mata uang kripto dengan nama yang dapat dibaca manusia dan dapat digunakan untuk mengaktifkan situs web yang tahan sensor.
- [Gods Unchained Cards](https://godsunchained.com/) adalah TCG di blockchain Ethereum yang menggunakan NFT untuk membawa kepemilikan nyata pada aset dalam permainan.
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) adalah koleksi 10.000 NFT unik, yang, selain menjadi karya seni yang terbukti langka, bertindak sebagai token keanggotaan ke klub, memberikan fasilitas dan manfaat anggota yang meningkat seiring waktu sebagai hasil dari upaya komunitas.

## Bacaan lebih lanjut {#further-reading}

- [EIP-721: Standar Non-Fungible Token ERC-721](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - Dokumen ERC-721](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - Implementasi ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [API NFT Alchemy](https://www.alchemy.com/docs/reference/nft-api-quickstart)

## Tutorial: Membangun dengan non-fungible token (ERC-721) di Ethereum {#tutorials}

- [Panduan Kontrak ERC-721 Vyper](/developers/tutorials/erc-721-vyper-annotated-code/) _– Panduan beranotasi dari kontrak NFT ERC-721 lengkap yang ditulis dalam Vyper._
- [Cara Menulis & Menerapkan NFT (Bagian 1/3)](/developers/tutorials/how-to-write-and-deploy-an-nft/) _– Panduan langkah demi langkah untuk menulis dan menerapkan kontrak pintar ERC-721 pertama Anda._
- [Cara Melakukan Mint NFT (Bagian 2/3)](/developers/tutorials/how-to-mint-an-nft/) _– Cara melakukan mint NFT ERC-721 menggunakan kontrak pintar yang Anda terapkan dan Web3._
- [Cara Melihat NFT Anda di Dompet Anda (Bagian 3/3)](/developers/tutorials/how-to-view-nft-in-metamask/) _– Cara menampilkan NFT yang telah di-mint di MetaMask setelah penerapan._
- [Tutorial Minter NFT](/developers/tutorials/nft-minter/) _– Membangun dapp minting NFT full-stack dengan frontend React, MetaMask, dan Alchemy._