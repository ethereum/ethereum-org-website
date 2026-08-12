---
title: "Panduan Kontrak ERC-721 Vyper"
description: Kontrak ERC-721 Ryuya Nakamura dan cara kerjanya
author: Ori Pomerantz
lang: id
tags: ["Vyper", "erc-721", "Python"]
skill: beginner
breadcrumb: ERC-721 Vyper
published: 2021-04-01
---

## Pengantar {#introduction}

Standar [ERC-721](/developers/docs/standards/tokens/erc-721/) digunakan untuk memegang kepemilikan Non-Fungible Token (NFT).
Token [ERC-20](/developers/docs/standards/tokens/erc-20/) berperilaku sebagai komoditas, karena tidak ada perbedaan antara masing-masing token.
Sebaliknya, token ERC-721 dirancang untuk aset yang serupa tetapi tidak identik, seperti [kartun kucing](https://www.cryptokitties.co/) yang berbeda atau sertifikat untuk berbagai bidang real estat.

Dalam artikel ini kita akan menganalisis [kontrak ERC-721 Ryuya Nakamura](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy).
Kontrak ini ditulis dalam [Vyper](https://vyper.readthedocs.io/en/latest/index.html), bahasa kontrak mirip Python yang dirancang untuk membuatnya lebih sulit menulis kode yang tidak aman dibandingkan di Solidity.

## Kontrak {#contract}

```python
# @dev Implementasi standar token non-fungible ERC-721.
# @author Ryuya Nakamura (@nrryuya)
# Dimodifikasi dari: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Komentar di Vyper, seperti di Python, dimulai dengan sebuah hash (`ethereum.ercs`) dan berlanjut hingga akhir baris. Komentar yang menyertakan `@<keyword>` digunakan oleh [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) untuk menghasilkan dokumentasi yang dapat dibaca manusia.

```python
from vyper.interfaces import ERC721

implements: ERC721
```

Antarmuka ERC-721 dibangun ke dalam bahasa Vyper.
[Anda dapat melihat definisi kodenya di sini](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py).
Definisi antarmuka ditulis dalam Python, bukan Vyper, karena antarmuka digunakan tidak hanya di dalam rantai blok, tetapi juga saat mengirimkan transaksi ke rantai blok dari klien eksternal, yang mungkin ditulis dalam Python.

Baris pertama mengimpor antarmuka, dan yang kedua menentukan bahwa kita mengimplementasikannya di sini.

```python
#pragma version >0.3.10
```

```python
#pragma version >0.3.10
```
### Antarmuka ERC721Receiver

```python
# Interface for the contract called by safeTransferFrom()
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721 mendukung dua jenis transfer:

- `transferFrom`, yang memungkinkan pengirim menentukan alamat tujuan mana pun dan menempatkan tanggung jawab
  untuk transfer pada pengirim. Ini berarti Anda dapat mentransfer ke alamat yang tidak valid, yang dalam hal ini
  NFT akan hilang selamanya.
- `safeTransferFrom`, yang memeriksa apakah alamat tujuan adalah sebuah kontrak. Jika ya, kontrak ERC-721
  bertanya kepada kontrak penerima apakah ia ingin menerima NFT tersebut.

Untuk menjawab permintaan `safeTransferFrom`, sebuah kontrak penerima harus mengimplementasikan `ERC721Receiver`.

```python
            _operator: address,
            _from: address,
```

Alamat `_from` adalah pemilik token saat ini. Alamat `_operator` adalah alamat yang
meminta transfer (keduanya mungkin tidak sama, karena adanya jatah). Berdasarkan konvensi, sebagian besar parameter
fungsi dalam kontrak ini dimulai dengan garis bawah (`_`).

```python
            _tokenId: uint256,
```

ID token ERC-721 berukuran 256 bit. Biasanya ID ini dibuat dengan melakukan proses hash pada deskripsi dari apa pun
yang diwakili oleh token tersebut.

```python
            _data: Bytes[1024]
```

Permintaan tersebut dapat memiliki hingga 1024 bita data pengguna.

```python
        ) -> bytes4: nonpayable
```

Untuk mencegah kasus di mana sebuah kontrak secara tidak sengaja menerima transfer, nilai kembaliannya bukanlah boolean,
melainkan nilai empat bita tertentu, yaitu pemilih fungsi dari `onERC721Received`. Fungsi ini bersifat `nonpayable` karena sebuah
kontrak penerima dapat mengubah state-nya sendiri ketika menerima sebuah token.
### Peristiwa

[Peristiwa](/developers/docs/smart-contracts/anatomy/#events-and-logs)
dipancarkan untuk memberi tahu pengguna dan server di luar rantai blok tentang peristiwa. Perhatikan bahwa konten peristiwa
tidak tersedia untuk kontrak di rantai blok. Tiga peristiwa ERC-721 didefinisikan oleh antarmuka `IERC721` yang kita
impor, sehingga kontrak ini tidak mendeklarasikannya sendiri; kontrak ini memancarkannya dengan `log IERC721.<Event>(...)`, seperti yang akan kita lihat
dalam fungsi transfer di bawah ini.

`Transfer` (`sender`, `receiver`, `token_id`) melaporkan perubahan kepemilikan sebuah NFT. Ini mirip dengan
peristiwa Transfer ERC-20, kecuali bahwa kita melaporkan `token_id` alih-alih jumlah. Tidak ada yang memiliki alamat nol, jadi berdasarkan
konvensi kita menggunakannya untuk melaporkan pembuatan dan penghancuran token. Satu pengecualian adalah pembuatan kontrak, di mana
sejumlah NFT dapat dibuat dan ditetapkan tanpa memancarkan `Transfer`.

Persetujuan ERC-721 mirip dengan jatah ERC-20: alamat tertentu diizinkan untuk mentransfer token tertentu,
dan `Approval` (`owner`, `approved`, `token_id`) dipancarkan setiap kali alamat yang disetujui tersebut ditetapkan atau ditegaskan kembali.
Ini memberikan mekanisme bagi kontrak untuk merespons ketika mereka menerima sebuah token. Kontrak tidak dapat mendengarkan peristiwa, jadi jika
Anda hanya mentransfer token kepada mereka, mereka tidak "tahu" tentang hal itu. Dengan cara ini, pemilik pertama-tama mengirimkan persetujuan dan
kemudian mengirimkan permintaan ke kontrak: "Saya menyetujui Anda untuk mentransfer token X, tolong lakukan ...". Ini adalah pilihan
desain untuk membuat standar ERC-721 mirip dengan standar ERC-20. Karena token ERC-721 tidak sepadan (non-fungible), sebuah
kontrak juga dapat mengidentifikasi bahwa ia mendapatkan token tertentu dengan melihat kepemilikan token tersebut.

Terakhir, `ApprovalForAll` (`owner`, `operator`, `approved`) dipancarkan ketika seorang _operator_ diaktifkan atau dinonaktifkan untuk
seorang pemilik. Terkadang berguna untuk memiliki operator yang dapat mengelola semua token akun dari jenis tertentu
(yang dikelola oleh kontrak tertentu), mirip dengan surat kuasa. Misalnya, saya mungkin ingin memberikan
kuasa semacam itu kepada kontrak yang memeriksa apakah saya belum menghubunginya selama enam bulan, dan jika demikian mendistribusikan aset saya kepada
ahli waris saya (jika salah satu dari mereka memintanya, kontrak tidak dapat melakukan apa pun tanpa dipanggil oleh sebuah transaksi). Di ERC-20
kita bisa saja memberikan jatah yang tinggi ke kontrak warisan, tetapi itu tidak berfungsi untuk ERC-721 karena tokennya
tidak sepadan. Ini adalah padanannya. Nilai `approved` memberi tahu kita apakah peristiwa tersebut untuk persetujuan, atau
penarikan persetujuan.
### Variabel State

Variabel-variabel ini berisi state token saat ini: mana yang tersedia dan siapa pemiliknya. Sebagian besar dari ini
adalah objek `HashMap`, [pemetaan searah yang ada di antara dua tipe](https://vyper.readthedocs.io/en/latest/types.html#mappings).

```python
# @dev Pemetaan dari ID NFT ke alamat yang memilikinya.
idToOwner: HashMap[uint256, address]

# @dev Pemetaan dari ID NFT ke alamat yang disetujui.
idToApprovals: HashMap[uint256, address]
```

Identitas pengguna dan kontrak di Ethereum diwakili oleh alamat 160-bit. Kedua variabel ini memetakan
dari ID token ke pemiliknya dan mereka yang disetujui untuk mentransfernya (maksimal satu untuk masing-masing). Di Ethereum,
data yang tidak diinisialisasi selalu nol, jadi jika tidak ada pemilik atau pentransfer yang disetujui, nilai untuk token tersebut
adalah nol.

```python
# @dev Pemetaan dari alamat pemilik ke jumlah tokennya.
ownerToNFTokenCount: HashMap[address, uint256]
```

Variabel ini menyimpan jumlah token untuk setiap pemilik. Tidak ada pemetaan dari pemilik ke token, jadi
satu-satunya cara untuk mengidentifikasi token yang dimiliki oleh pemilik tertentu adalah dengan melihat kembali riwayat peristiwa rantai blok
dan melihat peristiwa `Transfer` yang sesuai. Kita dapat menggunakan variabel ini untuk mengetahui kapan kita memiliki semua NFT dan tidak
perlu melihat lebih jauh ke masa lalu.

Perhatikan bahwa algoritma ini hanya berfungsi untuk antarmuka pengguna dan server eksternal. Kode yang berjalan di rantai blok
itu sendiri tidak dapat membaca peristiwa masa lalu.

```python
# @dev Pemetaan dari alamat pemilik ke pemetaan alamat operator.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

Sebuah akun mungkin memiliki lebih dari satu operator. `HashMap` sederhana tidak cukup untuk
melacak mereka, karena setiap kunci mengarah ke satu nilai. Sebagai gantinya, Anda dapat menggunakan
`HashMap[address, bool]` sebagai nilainya. Secara bawaan, nilai untuk setiap alamat adalah `False`, yang berarti ia
bukanlah operator. Anda dapat mengatur nilai menjadi `True` sesuai kebutuhan.

```python
# @dev Alamat pencetak, yang dapat mencetak token
minter: address
```

Token baru harus dibuat dengan suatu cara. Dalam kontrak ini ada satu entitas yang diizinkan untuk melakukannya, yaitu
`minter`. Ini kemungkinan cukup untuk sebuah permainan, misalnya. Untuk tujuan lain, mungkin perlu
untuk membuat logika bisnis yang lebih rumit.

```python
# @dev Daftar statis dari id antarmuka ERC165 yang didukung
SUPPORTED_INTERFACES: constant(bytes4[2]) = [
    # ID antarmuka ERC165 dari ERC165
    0x01ffc9a7,
    # ID antarmuka ERC165 dari ERC721
    0x80ac58cd,
]
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) menentukan mekanisme bagi sebuah kontrak untuk mengungkapkan bagaimana aplikasi
dapat berkomunikasi dengannya, ERC mana yang dipatuhinya. `SUPPORTED_INTERFACES` adalah daftar konstan dari dua ID antarmuka
empat bita yang dipatuhi kontrak ini: ERC-165 itu sendiri dan ERC-721.
### Fungsi {#functions}

Ini adalah fungsi-fungsi yang benar-benar mengimplementasikan ERC-721.

#### Konstruktor

```python
@deploy
def __init__():
```

Di Vyper, seperti di Python, fungsi konstruktor disebut `__init__`. Fungsi ini ditandai dengan dekorasi `@deploy`, yang berarti ia berjalan sekali, ketika kontrak disebarkan.

```python
    """
    @dev Konstruktor kontrak.
    """
```

Di Python, dan di Vyper, Anda juga dapat membuat komentar dengan menentukan string multi-baris (yang dimulai dan diakhiri
dengan `"""`), dan tidak menggunakannya dengan cara apa pun. Komentar ini juga dapat menyertakan
[NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html).

```python
    self.minter = msg.sender
```

Untuk mengakses variabel state, Anda menggunakan `self.<nama variabel>` (sekali lagi, sama seperti di Python). Konstruktor mencatat
akun yang menyebarkan kontrak sebagai `minter`.
#### Fungsi View

Ini adalah fungsi-fungsi yang tidak mengubah state rantai blok, dan oleh karena itu dapat dieksekusi secara
gratis jika dipanggil secara eksternal. Jika fungsi view dipanggil oleh sebuah kontrak, fungsi tersebut tetap harus dieksekusi di
setiap node dan oleh karena itu membutuhkan biaya gas.

```python
@view
@external
```

Kata kunci sebelum definisi fungsi yang dimulai dengan tanda at (`@`) ini disebut _dekorasi_. Mereka
menentukan keadaan di mana sebuah fungsi dapat dipanggil.

- `@view` menentukan bahwa fungsi ini adalah sebuah view.
- `@external` menentukan bahwa fungsi khusus ini dapat dipanggil oleh transaksi dan oleh kontrak lain.

```python
def supportsInterface(interface_id: bytes4) -> bool:
```

Berbeda dengan Python, Vyper adalah [bahasa bertipe statis](https://wikipedia.org/wiki/Type_system#Static_type_checking).
Anda tidak dapat mendeklarasikan variabel, atau parameter fungsi, tanpa mengidentifikasi [tipe data](https://vyper.readthedocs.io/en/latest/types.html). Dalam hal ini parameter inputnya adalah `bytes4`, nilai empat bita, dan outputnya adalah nilai
boolean.

```python
    """
    @dev Identifikasi antarmuka ditentukan dalam ERC-165.
    @param interface_id Id dari antarmuka
    """
    return interface_id in SUPPORTED_INTERFACES
```

Mengembalikan `True` jika `interface_id` adalah salah satu ID antarmuka dalam daftar `SUPPORTED_INTERFACES`.

```python
### FUNGSI VIEW ###
```

Ini adalah fungsi view yang membuat informasi tentang token tersedia bagi pengguna dan kontrak lain.

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev Mengembalikan jumlah NFT yang dimiliki oleh `_owner`.
         Menghasilkan galat jika `_owner` adalah alamat nol. NFT yang ditetapkan ke alamat nol dianggap tidak valid.
    @param _owner Alamat yang saldonya akan ditanyakan.
    """
    assert _owner != empty(address)
```

Baris ini [menegaskan](https://vyper.readthedocs.io/en/latest/statements.html#assert) bahwa `_owner` bukanlah
alamat nol, yang ditulis sebagai `empty(address)`. Jika ya, ada kesalahan dan operasi dikembalikan.

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev Mengembalikan alamat pemilik NFT.
         Menghasilkan galat jika `_tokenId` bukan NFT yang valid.
    @param _tokenId Pengidentifikasi untuk sebuah NFT.
    """
    owner: address = self.idToOwner[_tokenId]
    # Menghasilkan galat jika `_tokenId` bukan NFT yang valid
    assert owner != empty(address)
    return owner
```

Di Mesin Virtual Ethereum (EVM), penyimpanan apa pun yang tidak memiliki nilai yang disimpan di dalamnya adalah nol.
Jika tidak ada token di `_tokenId` maka nilai `self.idToOwner[_tokenId]` adalah nol. Dalam
kasus tersebut, fungsi dikembalikan.

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev Dapatkan alamat yang disetujui untuk satu NFT.
         Menghasilkan galat jika `_tokenId` bukan NFT yang valid.
    @param _tokenId ID NFT yang persetujuannya akan ditanyakan.
    """
    # Menghasilkan galat jika `_tokenId` bukan NFT yang valid
    assert self.idToOwner[_tokenId] != empty(address)
    return self.idToApprovals[_tokenId]
```

Perhatikan bahwa `getApproved` _dapat_ mengembalikan nol. Jika token valid, ia mengembalikan `self.idToApprovals[_tokenId]`.
Jika tidak ada pemberi persetujuan, nilai tersebut adalah nol.

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev Memeriksa apakah `_operator` adalah operator yang disetujui untuk `_owner`.
    @param _owner Alamat yang memiliki NFT.
    @param _operator Alamat yang bertindak atas nama pemilik.
    """
    return (self.ownerToOperators[_owner])[_operator]
```

Fungsi ini memeriksa apakah `_operator` diizinkan untuk mengelola semua token `_owner` dalam kontrak ini.
Karena bisa ada beberapa operator, ini adalah HashMap dua tingkat.
#### Fungsi Pembantu Transfer

Fungsi-fungsi ini mengimplementasikan operasi yang merupakan bagian dari transfer atau pengelolaan token.

```python

### PEMBANTU FUNGSI TRANSFER ###

@view
@internal
```

Dekorasi ini, `@internal`, berarti bahwa fungsi tersebut hanya dapat diakses dari fungsi lain di dalam
kontrak yang sama. Berdasarkan konvensi, nama fungsi ini juga dimulai dengan garis bawah (`_`).

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev Mengembalikan apakah pembelanja yang diberikan dapat mentransfer ID token yang diberikan
    @param spender alamat pembelanja yang akan ditanyakan
    @param tokenId uint256 ID token yang akan ditransfer
    @return bool apakah msg.sender disetujui untuk ID token yang diberikan,
        adalah operator dari pemilik, atau adalah pemilik token
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

Ada tiga cara di mana sebuah alamat dapat diizinkan untuk mentransfer sebuah token:

1. Alamat tersebut adalah pemilik token
2. Alamat tersebut disetujui untuk membelanjakan token tersebut
3. Alamat tersebut adalah operator untuk pemilik token

Fungsi di atas dapat berupa view karena tidak mengubah state. Untuk mengurangi biaya operasi, setiap
fungsi yang _dapat_ berupa view _seharusnya_ berupa view.

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev Tambahkan NFT ke alamat yang diberikan
         Menghasilkan galat jika `_tokenId` dimiliki oleh seseorang.
    """
    # Menghasilkan galat jika `_tokenId` dimiliki oleh seseorang
    assert self.idToOwner[_tokenId] == empty(address)
    # Ubah pemilik
    self.idToOwner[_tokenId] = _to
    # Ubah pelacakan jumlah
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev Hapus NFT dari alamat yang diberikan
         Menghasilkan galat jika `_from` bukan pemilik saat ini.
    """
    # Menghasilkan galat jika `_from` bukan pemilik saat ini
    assert self.idToOwner[_tokenId] == _from
    # Ubah pemilik
    self.idToOwner[_tokenId] = empty(address)
    # Ubah pelacakan jumlah
    self.ownerToNFTokenCount[_from] -= 1
```

Ketika ada masalah dengan transfer, kita mengembalikan panggilan tersebut.

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev Hapus persetujuan dari alamat yang diberikan
         Menghasilkan galat jika `_owner` bukan pemilik saat ini.
    """
    # Menghasilkan galat jika `_owner` bukan pemilik saat ini
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != empty(address):
        # Atur ulang persetujuan
        self.idToApprovals[_tokenId] = empty(address)
```

Hanya ubah nilai jika perlu. Variabel state hidup di penyimpanan. Menulis ke penyimpanan adalah
salah satu operasi paling mahal yang dilakukan EVM (Mesin Virtual Ethereum) (dalam hal
[gas](/developers/docs/gas/)). Oleh karena itu, merupakan ide yang baik untuk meminimalkannya, bahkan menulis
nilai yang ada memiliki biaya yang tinggi.

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev Eksekusi transfer sebuah NFT.
         Menghasilkan galat kecuali `msg.sender` adalah pemilik saat ini, operator yang sah, atau alamat
         yang disetujui untuk NFT ini. (CATATAN: `msg.sender` tidak diizinkan dalam fungsi privat jadi teruskan `_sender`.)
         Menghasilkan galat jika `_to` adalah alamat nol.
         Menghasilkan galat jika `_from` bukan pemilik saat ini.
         Menghasilkan galat jika `_tokenId` bukan NFT yang valid.
    """
```

Kita memiliki fungsi internal ini karena ada dua cara untuk mentransfer token (biasa dan aman), tetapi
kita hanya menginginkan satu lokasi dalam kode di mana kita melakukannya untuk mempermudah audit.

```python
    # Periksa persyaratan
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # Menghasilkan galat jika `_to` adalah alamat nol
    assert _to != empty(address)
    # Hapus persetujuan. Menghasilkan galat jika `_from` bukan pemilik saat ini
    self._clearApproval(_from, _tokenId)
    # Hapus NFT. Menghasilkan galat jika `_tokenId` bukan NFT yang valid
    self._removeTokenFrom(_from, _tokenId)
    # Tambahkan NFT
    self._addTokenTo(_to, _tokenId)
    # Catat transfer
    log IERC721.Transfer(sender=_from, receiver=_to, token_id=_tokenId)
```

Untuk memancarkan peristiwa di Vyper, Anda menggunakan pernyataan `log` ([lihat di sini untuk detail lebih lanjut](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)).
Karena peristiwa tersebut milik antarmuka yang diimpor, kita merujuknya sebagai `IERC721.Transfer` dan meneruskan bidangnya dengan
kata kunci.
#### Fungsi Transfer

```python

### FUNGSI TRANSFER ###

@external
@payable
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev Menghasilkan galat kecuali `msg.sender` adalah pemilik saat ini, operator yang sah, atau alamat
         yang disetujui untuk NFT ini.
         Menghasilkan galat jika `_from` bukan pemilik saat ini.
         Menghasilkan galat jika `_to` adalah alamat nol.
         Menghasilkan galat jika `_tokenId` bukan NFT yang valid.
    @notice Pemanggil bertanggung jawab untuk mengonfirmasi bahwa `_to` mampu menerima NFT atau jika tidak
            mereka mungkin akan hilang secara permanen.
    @param _from Pemilik NFT saat ini.
    @param _to Pemilik baru.
    @param _tokenId NFT yang akan ditransfer.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Fungsi ini memungkinkan Anda mentransfer ke alamat sembarang. Kecuali alamat tersebut adalah pengguna, atau kontrak yang
tahu cara mentransfer token, token apa pun yang Anda transfer akan tersangkut di alamat tersebut dan tidak berguna.

Dekorasi `@payable` ada di sini karena antarmuka `IERC721` mendeklarasikan `transferFrom`, `safeTransferFrom`, dan
`approve` sebagai payable, sehingga kontrak yang mengimplementasikan antarmuka tersebut harus cocok dengan tanda tangan tersebut.

```python
@external
@payable
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev Mentransfer kepemilikan NFT dari satu alamat ke alamat lain.
         Menghasilkan galat kecuali `msg.sender` adalah pemilik saat ini, operator yang sah, atau
         alamat yang disetujui untuk NFT ini.
         Menghasilkan galat jika `_from` bukan pemilik saat ini.
         Menghasilkan galat jika `_to` adalah alamat nol.
         Menghasilkan galat jika `_tokenId` bukan NFT yang valid.
         Jika `_to` adalah kontrak pintar, ia memanggil `onERC721Received` pada `_to` dan menghasilkan galat jika
         nilai kembaliannya bukan `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
    @param _from Pemilik NFT saat ini.
    @param _to Pemilik baru.
    @param _tokenId NFT yang akan ditransfer.
    @param _data Data tambahan tanpa format yang ditentukan, dikirim dalam panggilan ke `_to`.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Tidak masalah untuk melakukan transfer terlebih dahulu karena jika ada masalah kita akan tetap mengembalikannya,
sehingga semua yang dilakukan dalam panggilan akan dibatalkan.

```python
    if _to.is_contract: # periksa apakah `_to` adalah alamat kontrak
```

Pertama periksa untuk melihat apakah alamat tersebut adalah kontrak (jika memiliki kode). Jika tidak, asumsikan itu adalah alamat
pengguna dan pengguna akan dapat menggunakan token atau mentransfernya. Tetapi jangan biarkan hal itu meninabobokan Anda
ke dalam rasa aman yang palsu. Anda bisa kehilangan token, bahkan dengan `safeTransferFrom`, jika Anda mentransfernya
ke alamat yang kunci privatnya tidak diketahui oleh siapa pun.

```python
        returnValue: bytes4 = extcall ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

Panggil kontrak target untuk melihat apakah ia dapat menerima token ERC-721. Vyper 0.4 mewajibkan panggilan ke kontrak lain untuk
ditandai, sehingga panggilan diawali dengan `extcall`.

```python
        # Menghasilkan galat jika tujuan transfer adalah kontrak yang tidak mengimplementasikan 'onERC721Received'
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes4)
```

Jika tujuannya adalah kontrak, tetapi kontrak yang tidak menerima token ERC-721 (atau yang memutuskan untuk tidak menerima transfer
khusus ini), kembalikan.

```python
@external
@payable
def approve(_approved: address, _tokenId: uint256):
    """
    @dev Tetapkan atau tegaskan kembali alamat yang disetujui untuk sebuah NFT. Alamat nol menunjukkan tidak ada alamat yang disetujui.
         Menghasilkan galat kecuali `msg.sender` adalah pemilik NFT saat ini, atau operator yang sah dari pemilik saat ini.
         Menghasilkan galat jika `_tokenId` bukan NFT yang valid. (CATATAN: Ini tidak tertulis di EIP)
         Menghasilkan galat jika `_approved` adalah pemilik saat ini. (CATATAN: Ini tidak tertulis di EIP)
    @param _approved Alamat yang akan disetujui untuk ID NFT yang diberikan.
    @param _tokenId ID token yang akan disetujui.
    """
    owner: address = self.idToOwner[_tokenId]
    # Menghasilkan galat jika `_tokenId` bukan NFT yang valid
    assert owner != empty(address)
    # Menghasilkan galat jika `_approved` adalah pemilik saat ini
    assert _approved != owner
```

Berdasarkan konvensi, jika Anda tidak ingin memiliki pemberi persetujuan, Anda menunjuk alamat nol, bukan diri Anda sendiri.

```python
    # Periksa persyaratan
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

Untuk menetapkan persetujuan, Anda bisa menjadi pemilik, atau operator yang diberi wewenang oleh pemilik.

```python
    # Tetapkan persetujuan
    self.idToApprovals[_tokenId] = _approved
    log IERC721.Approval(owner=owner, approved=_approved, token_id=_tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev Mengaktifkan atau menonaktifkan persetujuan bagi pihak ketiga ("operator") untuk mengelola semua
         aset `msg.sender`. Ini juga memancarkan peristiwa ApprovalForAll.
         Menghasilkan galat jika `_operator` adalah `msg.sender`. (CATATAN: Ini tidak tertulis di EIP)
    @notice Ini berfungsi bahkan jika pengirim tidak memiliki token apa pun pada saat itu.
    @param _operator Alamat yang akan ditambahkan ke kumpulan operator yang sah.
    @param _approved True jika operator disetujui, false untuk mencabut persetujuan.
    """
    # Menghasilkan galat jika `_operator` adalah `msg.sender`
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log IERC721.ApprovalForAll(owner=msg.sender, operator=_operator, approved=_approved)
```
#### Mencetak Token Baru dan Menghancurkan yang Sudah Ada {#mint-burn}

Akun yang membuat kontrak adalah `minter`, pengguna super yang berwenang untuk mencetak
NFT baru. Namun, bahkan ia tidak diizinkan untuk membakar token yang ada. Hanya pemilik, atau entitas
yang diberi wewenang oleh pemilik, yang dapat melakukannya.

```python
### FUNGSI CETAK & BAKAR ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

Fungsi ini selalu mengembalikan `True`, karena jika operasi gagal, ia akan dikembalikan.

```python
    """
    @dev Fungsi untuk mencetak token
         Menghasilkan galat jika `msg.sender` bukan pencetak.
         Menghasilkan galat jika `_to` adalah alamat nol.
         Menghasilkan galat jika `_tokenId` dimiliki oleh seseorang.
    @param _to Alamat yang akan menerima token yang dicetak.
    @param _tokenId Id token untuk dicetak.
    @return Boolean yang menunjukkan apakah operasi berhasil.
    """
    # Menghasilkan galat jika `msg.sender` bukan pencetak
    assert msg.sender == self.minter
```

Hanya pencetak (akun yang membuat kontrak ERC-721) yang dapat mencetak token baru. Ini bisa menjadi
masalah di masa depan jika kita ingin mengubah identitas pencetak. Dalam
kontrak produksi, Anda mungkin menginginkan fungsi yang memungkinkan pencetak untuk mentransfer
hak istimewa pencetak kepada orang lain.

```python
    # Menghasilkan galat jika `_to` adalah alamat nol
    assert _to != ZERO_ADDRESS
    # Menambahkan NFT. Menghasilkan galat jika `_tokenId` dimiliki oleh seseorang
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

Berdasarkan konvensi, pencetakan token baru dihitung sebagai transfer dari alamat nol.

```python

@external
def burn(_tokenId: uint256):
    """
    @dev Membakar token ERC-721 tertentu.
         Menghasilkan galat kecuali `msg.sender` adalah pemilik saat ini, operator yang sah, atau alamat
         yang disetujui untuk NFT ini.
         Menghasilkan galat jika `_tokenId` bukan NFT yang valid.
    @param _tokenId uint256 id dari token ERC-721 yang akan dibakar.
    """
    # Memeriksa persyaratan
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # Menghasilkan galat jika `_tokenId` bukan NFT yang valid
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)
```

Siapa pun yang diizinkan untuk mentransfer token diizinkan untuk membakarnya. Meskipun pembakaran tampak setara dengan
transfer ke alamat nol, alamat nol sebenarnya tidak menerima token tersebut. Ini memungkinkan kita untuk
membebaskan semua penyimpanan yang digunakan untuk token, yang dapat mengurangi biaya gas dari transaksi.

## Menggunakan Kontrak Ini {#using-contract}

Berbeda dengan Solidity, Vyper tidak memiliki pewarisan. Ini adalah pilihan desain yang disengaja untuk membuat
kode lebih jelas dan karenanya lebih mudah diamankan. Jadi untuk membuat kontrak ERC-721 Vyper Anda sendiri, Anda mengambil [kontrak
ini](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy) dan memodifikasinya
untuk mengimplementasikan logika bisnis yang Anda inginkan.

## Kesimpulan {#conclusion}

Sebagai ulasan, berikut adalah beberapa ide terpenting dalam kontrak ini:

- Untuk menerima token ERC-721 dengan transfer yang aman, kontrak harus mengimplementasikan antarmuka `ERC721Receiver`.
- Bahkan jika Anda menggunakan transfer yang aman, token masih bisa tersangkut jika Anda mengirimkannya ke alamat yang kunci privatnya
  tidak diketahui.
- Ketika ada masalah dengan suatu operasi, ada baiknya untuk `revert` panggilan tersebut, daripada hanya mengembalikan
  nilai kegagalan.
- Token ERC-721 ada ketika mereka memiliki pemilik.
- Ada tiga cara untuk diberi wewenang mentransfer NFT. Anda bisa menjadi pemilik, disetujui untuk token tertentu,
  atau menjadi operator untuk semua token pemilik.
- Peristiwa masa lalu hanya terlihat di luar rantai blok. Kode yang berjalan di dalam rantai blok tidak dapat melihatnya.

Sekarang pergilah dan implementasikan kontrak Vyper yang aman.

[Lihat di sini untuk karya saya yang lain](https://cryptodocguy.pro/).
