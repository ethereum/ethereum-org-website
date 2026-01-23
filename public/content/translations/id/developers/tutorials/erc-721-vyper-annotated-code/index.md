---
title: "Panduan Lengkap Kontrak ERC-721 Vyper"
description: Kontrak ERC-721 Ryuya Nakamura dan cara kerjanya
author: Ori Pomerantz
lang: id
tags: [ "vyper", "erc-721", "python" ]
skill: beginner
published: 2021-04-01
---

## Pengenalan {#introduction}

Standar [ERC-721](/developers/docs/standards/tokens/erc-721/) digunakan untuk memegang kepemilikan Token yang Tidak Dapat Dipertukarkan (NFT).
Token [ERC-20](/developers/docs/standards/tokens/erc-20/) berperilaku sebagai komoditas, karena tidak ada perbedaan antara token individu.
Sebaliknya, token ERC-721 dirancang untuk aset yang serupa tetapi tidak identik, seperti berbagai kartun
kucing
atau hak atas bagian real estat yang berbeda.

Dalam artikel ini kami akan menganalisis [kontrak ERC-721 Ryuya Nakamura](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy).
Kontrak ini ditulis dalam [Vyper](https://vyper.readthedocs.io/en/latest/index.html), bahasa kontrak seperti Python yang dirancang untuk mempersulit
penulisan kode yang tidak aman daripada di Solidity.

## Kontrak {#contract}

```python
# @dev Implementasi standar token yang tidak dapat dipertukarkan ERC-721.
# @author Ryuya Nakamura (@nrryuya)
# Dimodifikasi dari: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Komentar di Vyper, seperti di Python, dimulai dengan tanda pagar (`#`) dan berlanjut hingga akhir baris. Komentar yang menyertakan
`@<keyword>` digunakan oleh [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) untuk menghasilkan dokumentasi
yang dapat dibaca manusia.

```python
from vyper.interfaces import ERC721

implements: ERC721
```

Antarmuka ERC-721 dibangun ke dalam bahasa Vyper.
[Anda dapat melihat definisi kode di sini](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py).
Definisi antarmuka ditulis dalam Python, bukan Vyper, karena antarmuka tidak hanya digunakan di dalam
rantai blok, tetapi juga saat mengirimkan transaksi ke rantai blok dari klien eksternal, yang mungkin ditulis dalam
Python.

Baris pertama mengimpor antarmuka, dan yang kedua menentukan bahwa kita mengimplementasikannya di sini.

### Antarmuka ERC721Receiver {#receiver-interface}

```python
# Antarmuka untuk kontrak yang dipanggil oleh safeTransferFrom()
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721 mendukung dua jenis transfer:

- `transferFrom`, yang memungkinkan pengirim menentukan alamat tujuan apa pun dan menempatkan tanggung jawab
  untuk transfer pada pengirim. Ini berarti Anda dapat mentransfer ke alamat yang tidak valid, yang dalam hal ini
  NFT akan hilang selamanya.
- `safeTransferFrom`, yang memeriksa apakah alamat tujuan adalah kontrak. Jika demikian, kontrak ERC-721
  akan menanyakan kontrak penerima apakah ingin menerima NFT.

Untuk menjawab permintaan `safeTransferFrom`, kontrak penerima harus mengimplementasikan `ERC721Receiver`.

```python
            _operator: address,
            _from: address,
```

Alamat `_from` adalah pemilik token saat ini. Alamat `_operator` adalah alamat yang
meminta transfer (keduanya mungkin tidak sama, karena alokasi).

```python
            _tokenId: uint256,
```

ID token ERC-721 berukuran 256 bit. Biasanya token tersebut dibuat dengan melakukan hash pada deskripsi dari apa pun
yang diwakili oleh token.

```python
            _data: Bytes[1024]
```

Permintaan dapat memiliki hingga 1024 bita data pengguna.

```python
        ) -> bytes32: view
```

Untuk mencegah kasus di mana kontrak secara tidak sengaja menerima transfer, nilai kembaliannya bukanlah boolean,
melainkan 256 bit dengan nilai tertentu.

Fungsi ini adalah `view`, yang berarti ia dapat membaca state dari rantai blok, tetapi tidak dapat mengubahnya.

### Peristiwa {#events}

[Aksi](https://media.consensys.net/technical-introduction-to-events-and-logs-in-ethereum-a074d65dd61e)
dikeluarkan untuk menginformasikan pengguna dan server di luar rantai blok tentang aksi. Perhatikan bahwa konten aksi
tidak tersedia untuk kontrak di rantai blok.

```python
# @dev Dikeluarkan saat kepemilikan NFT apa pun berubah oleh mekanisme apa pun. Aksi ini dikeluarkan saat NFT
#      dibuat (`from` == 0) dan dihancurkan (`to` == 0). Pengecualian: selama pembuatan kontrak, sejumlah
#      NFT apa pun dapat dibuat dan ditetapkan tanpa mengeluarkan Transfer. Pada saat
#      transfer apa pun, alamat yang disetujui untuk NFT tersebut (jika ada) diatur ulang menjadi tidak ada.
# @param _from Pengirim NFT (jika alamat adalah alamat nol, ini menunjukkan pembuatan token).
# @param _to Penerima NFT (jika alamat adalah alamat nol, ini menunjukkan penghancuran token).
# @param _tokenId NFT yang ditransfer.
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

Ini serupa dengan aksi Transfer ERC-20, kecuali bahwa kita melaporkan `tokenId` alih-alih jumlah.
Tidak ada yang memiliki alamat nol, jadi berdasarkan konvensi kita menggunakannya untuk melaporkan pembuatan dan penghancuran token.

```python
# @dev Ini dikeluarkan saat alamat yang disetujui untuk suatu NFT diubah atau ditegaskan kembali. Alamat
#      nol menunjukkan tidak ada alamat yang disetujui. Saat aksi Transfer dikeluarkan, ini juga
#      menunjukkan bahwa alamat yang disetujui untuk NFT tersebut (jika ada) diatur ulang menjadi tidak ada.
# @param _owner Pemilik NFT.
# @param _approved Alamat yang kami setujui.
# @param _tokenId NFT yang kami setujui.
event Approval:
    owner: indexed(address)
    approved: indexed(address)
    tokenId: indexed(uint256)
```

Persetujuan ERC-721 serupa dengan alokasi ERC-20. Alamat tertentu diizinkan untuk mentransfer token
tertentu. Ini memberikan mekanisme bagi kontrak untuk merespons ketika mereka menerima token. Kontrak tidak dapat
mendengarkan aksi, jadi jika Anda hanya mentransfer token kepada mereka, mereka tidak "tahu" tentang hal itu. Dengan cara ini, pemilik
pertama-tama mengirimkan persetujuan dan kemudian mengirimkan permintaan ke kontrak: "Saya menyetujui Anda untuk mentransfer token
X, silakan lakukan ...".

Ini adalah pilihan desain untuk membuat standar ERC-721 serupa dengan standar ERC-20. Karena
token ERC-721 tidak dapat dipertukarkan, sebuah kontrak juga dapat mengidentifikasi bahwa ia mendapatkan token tertentu dengan
melihat kepemilikan token tersebut.

```python
# @dev Ini dikeluarkan saat operator diaktifkan atau dinonaktifkan untuk seorang pemilik. Operator dapat mengelola
#      semua NFT milik pemilik.
# @param _owner Pemilik NFT.
# @param _operator Alamat di mana kami menetapkan hak operator.
# @param _approved Status hak operator (benar jika hak operator diberikan dan salah jika
# dicabut).
event ApprovalForAll:
    owner: indexed(address)
    operator: indexed(address)
    approved: bool
```

Terkadang berguna untuk memiliki _operator_ yang dapat mengelola semua token suatu akun dari jenis tertentu (yang dikelola oleh
kontrak tertentu), serupa dengan surat kuasa. Misalnya, saya mungkin ingin memberikan kuasa semacam itu kepada kontrak yang memeriksa apakah
saya belum menghubunginya selama enam bulan, dan jika demikian, mendistribusikan aset saya kepada ahli waris saya (jika salah satu dari mereka memintanya, kontrak
tidak dapat melakukan apa pun tanpa dipanggil oleh transaksi). Di ERC-20, kita bisa saja memberikan alokasi yang tinggi kepada kontrak warisan,
tetapi itu tidak berfungsi untuk ERC-721 karena tokennya tidak dapat dipertukarkan. Ini adalah ekuivalennya.

Nilai `approved` memberitahu kita apakah aksi tersebut untuk persetujuan, atau penarikan persetujuan.

### Variabel State {#state-vars}

Variabel-variabel ini berisi state token saat ini: mana yang tersedia dan siapa yang memilikinya. Sebagian besar dari ini
adalah objek `HashMap`, [pemetaan searah yang ada di antara dua jenis](https://vyper.readthedocs.io/en/latest/types.html#mappings).

```python
# @dev Pemetaan dari ID NFT ke alamat yang memilikinya.
idToOwner: HashMap[uint256, address]

# @dev Pemetaan dari ID NFT ke alamat yang disetujui.
idToApprovals: HashMap[uint256, address]
```

Identitas pengguna dan kontrak di Ethereum diwakili oleh alamat 160-bit. Kedua variabel ini memetakan
dari ID token ke pemiliknya dan mereka yang disetujui untuk mentransfernya (maksimal satu untuk setiap token). Di Ethereum,
data yang tidak diinisialisasi selalu nol, jadi jika tidak ada pemilik atau pentransfer yang disetujui, nilai untuk token itu
adalah nol.

```python
# @dev Pemetaan dari alamat pemilik ke jumlah tokennya.
ownerToNFTokenCount: HashMap[address, uint256]
```

Variabel ini menampung jumlah token untuk setiap pemilik. Tidak ada pemetaan dari pemilik ke token, jadi
satu-satunya cara untuk mengidentifikasi token yang dimiliki oleh pemilik tertentu adalah dengan melihat kembali riwayat aksi rantai blok
dan melihat aksi `Transfer` yang sesuai. Kita dapat menggunakan variabel ini untuk mengetahui kapan kita memiliki semua NFT dan tidak
perlu melihat lebih jauh ke belakang.

Perhatikan bahwa algoritme ini hanya berfungsi untuk antarmuka pengguna dan server eksternal. Kode yang berjalan di rantai blok
itu sendiri tidak dapat membaca aksi masa lalu.

```python
# @dev Pemetaan dari alamat pemilik ke pemetaan alamat operator.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

Sebuah akun mungkin memiliki lebih dari satu operator. `HashMap` sederhana tidak cukup untuk
melacaknya, karena setiap kunci mengarah ke satu nilai. Sebagai gantinya, Anda dapat menggunakan
`HashMap[address, bool]` sebagai nilainya. Secara default, nilai untuk setiap alamat adalah `False`, yang berarti alamat tersebut
bukan operator. Anda dapat mengatur nilainya menjadi `True` sesuai kebutuhan.

```python
# @dev Alamat minter, yang dapat mencetak token
minter: address
```

Token baru harus dibuat dengan suatu cara. Dalam kontrak ini, ada satu entitas tunggal yang diizinkan untuk melakukannya, yaitu
`minter`. Ini kemungkinan cukup untuk sebuah permainan, misalnya. Untuk tujuan lain, mungkin perlu
untuk membuat logika bisnis yang lebih rumit.

```python
# @dev Pemetaan ID antarmuka ke bool tentang apakah antarmuka tersebut didukung atau tidak
supportedInterfaces: HashMap[bytes32, bool]

# @dev ID antarmuka ERC165 dari ERC165
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ID antarmuka ERC165 dari ERC721
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) menetapkan mekanisme bagi kontrak untuk mengungkapkan bagaimana aplikasi
dapat berkomunikasi dengannya, dan ERC mana yang diikutinya. Dalam hal ini, kontrak sesuai dengan ERC-165 dan ERC-721.

### Fungsi {#functions}

Ini adalah fungsi-fungsi yang sebenarnya mengimplementasikan ERC-721.

#### Konstruktor {#constructor}

```python
@external
def __init__():
```

Di Vyper, seperti di Python, fungsi konstruktor disebut `__init__`.

```python
    """
    @dev Konstruktor kontrak.
    """
```

Di Python, dan di Vyper, Anda juga dapat membuat komentar dengan menentukan string multi-baris (yang dimulai dan diakhiri
dengan `"""`), dan tidak menggunakannya dengan cara apa pun. Komentar-komentar ini juga dapat mencakup
[NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html).

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

Untuk mengakses variabel state, Anda menggunakan `self.<nama variabel>` (sekali lagi, sama seperti di Python).

#### Fungsi Tampilan {#views}

Ini adalah fungsi-fungsi yang tidak mengubah state rantai blok, dan oleh karena itu dapat dieksekusi secara
gratis jika dipanggil secara eksternal. Jika fungsi tampilan dipanggil oleh sebuah kontrak, fungsi tersebut masih harus dieksekusi di setiap simpul dan
karena itu memerlukan biaya gas.

```python
@view
@external
```

Kata kunci sebelum definisi fungsi yang dimulai dengan tanda at (`@`) ini disebut _dekorasi_. Dekorasi ini
menentukan keadaan di mana suatu fungsi dapat dipanggil.

- `@view` menentukan bahwa fungsi ini adalah tampilan.
- `@external` menentukan bahwa fungsi khusus ini dapat dipanggil oleh transaksi dan oleh kontrak lain.

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

Berbeda dengan Python, Vyper adalah [bahasa yang diketik secara statis](https://wikipedia.org/wiki/Type_system#Static_type_checking).
Anda tidak dapat mendeklarasikan variabel, atau parameter fungsi, tanpa mengidentifikasi [tipe data](https://vyper.readthedocs.io/en/latest/types.html). Dalam hal ini, parameter input adalah `bytes32`, sebuah nilai 256-bit
(256 bit adalah ukuran kata asli dari [Mesin Virtual Ethereum](/developers/docs/evm/)). Outputnya adalah nilai
boolean. Berdasarkan konvensi, nama parameter fungsi dimulai dengan garis bawah (`_`).

```python
    """
    @dev Identifikasi antarmuka ditentukan dalam ERC-165.
    @param _interfaceID Id antarmuka
    """
    return self.supportedInterfaces[_interfaceID]
```

Mengembalikan nilai dari HashMap `self.supportedInterfaces`, yang diatur dalam konstruktor (`__init__`).

```python
### FUNGSI TAMPILAN ###
```

Ini adalah fungsi-fungsi tampilan yang membuat informasi tentang token tersedia untuk pengguna dan kontrak lain.

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev Mengembalikan jumlah NFT yang dimiliki oleh `_owner`.
         Melempar jika `_owner` adalah alamat nol. NFT yang ditetapkan ke alamat nol dianggap tidak valid.
    @param _owner Alamat untuk menanyakan saldo.
    """
    assert _owner != ZERO_ADDRESS
```

Baris ini [memastikan](https://vyper.readthedocs.io/en/latest/statements.html#assert) bahwa `_owner` bukan
nol. Jika demikian, terjadi kesalahan dan operasi dibatalkan.

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev Mengembalikan alamat pemilik NFT.
         Melempar jika `_tokenId` bukan NFT yang valid.
    @param _tokenId Pengidentifikasi untuk NFT.
    """
    owner: address = self.idToOwner[_tokenId]
    # Melempar jika `_tokenId` bukan NFT yang valid
    assert owner != ZERO_ADDRESS
    return owner
```

Di Mesin Virtual Ethereum (evm), setiap penyimpanan yang tidak memiliki nilai yang tersimpan di dalamnya adalah nol.
Jika tidak ada token di `_tokenId`, maka nilai `self.idToOwner[_tokenId]` adalah nol. Dalam kasus
itu, fungsi akan dibatalkan.

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev Mendapatkan alamat yang disetujui untuk satu NFT.
         Melempar jika `_tokenId` bukan NFT yang valid.
    @param _tokenId ID NFT untuk menanyakan persetujuan.
    """
    # Melempar jika `_tokenId` bukan NFT yang valid
    assert self.idToOwner[_tokenId] != ZERO_ADDRESS
    return self.idToApprovals[_tokenId]
```

Perhatikan bahwa `getApproved` _dapat_ mengembalikan nol. Jika token valid, ia mengembalikan `self.idToApprovals[_tokenId]`.
Jika tidak ada yang menyetujui, nilai tersebut adalah nol.

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

Fungsi ini memeriksa apakah `_operator` diizinkan untuk mengelola semua token milik `_owner` di kontrak ini.
Karena bisa ada beberapa operator, ini adalah HashMap dua tingkat.

#### Fungsi Bantuan Transfer {#transfer-helpers}

Fungsi-fungsi ini mengimplementasikan operasi yang merupakan bagian dari transfer atau pengelolaan token.

```python

### BANTUAN FUNGSI TRANSFER ###

@view
@internal
```

Dekorasi ini, `@internal`, berarti bahwa fungsi hanya dapat diakses dari fungsi lain di dalam
kontrak yang sama. Berdasarkan konvensi, nama-nama fungsi ini juga dimulai dengan garis bawah (`_`).

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev Mengembalikan apakah spender yang diberikan dapat mentransfer ID token yang diberikan
    @param spender alamat spender untuk ditanyakan
    @param tokenId ID uint256 dari token yang akan ditransfer
    @return bool apakah msg.sender disetujui untuk ID token yang diberikan,
        adalah operator dari pemilik, atau adalah pemilik token
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

Ada tiga cara sebuah alamat dapat diizinkan untuk mentransfer token:

1. Alamat tersebut adalah pemilik token
2. Alamat tersebut disetujui untuk membelanjakan token itu
3. Alamat tersebut adalah operator untuk pemilik token

Fungsi di atas bisa menjadi tampilan karena tidak mengubah state. Untuk mengurangi biaya operasi, setiap
fungsi yang _bisa_ menjadi tampilan _harus_ menjadi tampilan.

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev Menambahkan NFT ke alamat yang diberikan
         Melempar jika `_tokenId` dimiliki oleh seseorang.
    """
    # Melempar jika `_tokenId` dimiliki oleh seseorang
    assert self.idToOwner[_tokenId] == ZERO_ADDRESS
    # Mengubah pemilik
    self.idToOwner[_tokenId] = _to
    # Mengubah pelacakan jumlah
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev Menghapus NFT dari alamat yang diberikan
         Melempar jika `_from` bukan pemilik saat ini.
    """
    # Melempar jika `_from` bukan pemilik saat ini
    assert self.idToOwner[_tokenId] == _from
    # Mengubah pemilik
    self.idToOwner[_tokenId] = ZERO_ADDRESS
    # Mengubah pelacakan jumlah
    self.ownerToNFTokenCount[_from] -= 1
```

Ketika ada masalah dengan transfer, kami membatalkan panggilan.

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev Menghapus persetujuan dari alamat yang diberikan
         Melempar jika `_owner` bukan pemilik saat ini.
    """
    # Melempar jika `_owner` bukan pemilik saat ini
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != ZERO_ADDRESS:
        # Mengatur ulang persetujuan
        self.idToApprovals[_tokenId] = ZERO_ADDRESS
```

Hanya ubah nilai jika perlu. Variabel state berada di penyimpanan. Menulis ke penyimpanan adalah
salah satu operasi paling mahal yang dilakukan EVM (Mesin Virtual Ethereum) (dalam hal
[gas](/developers/docs/gas/)). Oleh karena itu, merupakan ide yang baik untuk meminimalkannya, bahkan menulis
nilai yang ada pun memiliki biaya yang tinggi.

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev Mengeksekusi transfer NFT.
         Melempar kecuali `msg.sender` adalah pemilik saat ini, operator yang berwenang, atau alamat yang
         disetujui untuk NFT ini. (CATATAN: `msg.sender` tidak diizinkan dalam fungsi pribadi jadi berikan `_sender`.)
         Melempar jika `_to` adalah alamat nol.
         Melempar jika `_from` bukan pemilik saat ini.
         Melempar jika `_tokenId` bukan NFT yang valid.
    """
```

Kami memiliki fungsi internal ini karena ada dua cara untuk mentransfer token (reguler dan aman), tetapi
kami hanya ingin satu lokasi tunggal di dalam kode tempat kami melakukannya untuk mempermudah audit.

```python
    # Memeriksa persyaratan
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # Melempar jika `_to` adalah alamat nol
    assert _to != ZERO_ADDRESS
    # Hapus persetujuan. Melempar jika `_from` bukan pemilik saat ini
    self._clearApproval(_from, _tokenId)
    # Hapus NFT. Melempar jika `_tokenId` bukan NFT yang valid
    self._removeTokenFrom(_from, _tokenId)
    # Tambah NFT
    self._addTokenTo(_to, _tokenId)
    # Mencatat transfer
    log Transfer(_from, _to, _tokenId)
```

Untuk mengeluarkan aksi di Vyper, Anda menggunakan pernyataan `log` ([lihat di sini untuk detail lebih lanjut](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)).

#### Fungsi Transfer {#transfer-funs}

```python

### FUNGSI TRANSFER ###

@external
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev Melempar kecuali `msg.sender` adalah pemilik saat ini, operator yang berwenang, atau alamat
         yang disetujui untuk NFT ini.
         Melempar jika `_from` bukan pemilik saat ini.
         Melempar jika `_to` adalah alamat nol.
         Melempar jika `_tokenId` bukan NFT yang valid.
    @notice Pemanggil bertanggung jawab untuk mengonfirmasi bahwa `_to` mampu menerima NFT atau jika tidak
            NFT tersebut mungkin akan hilang secara permanen.
    @param _from Pemilik NFT saat ini.
    @param _to Pemilik baru.
    @param _tokenId NFT yang akan ditransfer.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Fungsi ini memungkinkan Anda mentransfer ke alamat mana pun. Kecuali jika alamatnya adalah pengguna, atau kontrak yang
tahu cara mentransfer token, token apa pun yang Anda transfer akan terjebak di alamat itu dan tidak berguna.

```python
@external
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev Mentransfer kepemilikan NFT dari satu alamat ke alamat lain.
         Melempar kecuali `msg.sender` adalah pemilik saat ini, operator yang berwenang, atau
         alamat yang disetujui untuk NFT ini.
         Melempar jika `_from` bukan pemilik saat ini.
         Melempar jika `_to` adalah alamat nol.
         Melempar jika `_tokenId` bukan NFT yang valid.
         Jika `_to` adalah kontrak pintar, ia memanggil `onERC721Received` pada `_to` dan melempar jika
         nilai kembaliannya bukan `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
         CATATAN: bytes4 diwakili oleh bytes32 dengan padding
    @param _from Pemilik NFT saat ini.
    @param _to Pemilik baru.
    @param _tokenId NFT yang akan ditransfer.
    @param _data Data tambahan tanpa format yang ditentukan, dikirim dalam panggilan ke `_to`.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Tidak apa-apa untuk melakukan transfer terlebih dahulu karena jika ada masalah, kami akan membatalkannya,
jadi semua yang dilakukan dalam panggilan akan dibatalkan.

```python
    if _to.is_contract: # periksa apakah `_to` adalah alamat kontrak
```

Pertama, periksa untuk melihat apakah alamatnya adalah kontrak (jika memiliki kode). Jika tidak, asumsikan itu adalah alamat
pengguna dan pengguna akan dapat menggunakan token atau mentransfernya. Tapi jangan biarkan itu membuat Anda
merasa aman secara keliru. Anda dapat kehilangan token, bahkan dengan `safeTransferFrom`, jika Anda mentransfernya
ke alamat yang kunci privatnya tidak diketahui siapa pun.

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

Panggil kontrak target untuk melihat apakah ia dapat menerima token ERC-721.

```python
        # Melempar jika tujuan transfer adalah kontrak yang tidak mengimplementasikan 'onERC721Received'
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

Jika tujuannya adalah kontrak, tetapi yang tidak menerima token ERC-721 (atau yang memutuskan untuk tidak menerima
transfer khusus ini), batalkan.

```python
@external
def approve(_approved: address, _tokenId: uint256):
    """
    @dev Menetapkan atau menegaskan kembali alamat yang disetujui untuk NFT. Alamat nol menunjukkan tidak ada alamat yang disetujui.
         Melempar kecuali `msg.sender` adalah pemilik NFT saat ini, atau operator yang berwenang dari pemilik saat ini.
         Melempar jika `_tokenId` bukan NFT yang valid. (CATATAN: Ini tidak ditulis dalam EIP)
         Melempar jika `_approved` adalah pemilik saat ini. (CATATAN: Ini tidak ditulis dalam EIP)
    @param _approved Alamat yang akan disetujui untuk ID NFT yang diberikan.
    @param _tokenId ID token yang akan disetujui.
    """
    owner: address = self.idToOwner[_tokenId]
    # Melempar jika `_tokenId` bukan NFT yang valid
    assert owner != ZERO_ADDRESS
    # Melempar jika `_approved` adalah pemilik saat ini
    assert _approved != owner
```

Berdasarkan konvensi, jika Anda tidak ingin memiliki pemberi persetujuan, Anda menunjuk alamat nol, bukan diri Anda sendiri.

```python
    # Memeriksa persyaratan
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

Untuk menetapkan persetujuan, Anda bisa menjadi pemilik, atau operator yang diotorisasi oleh pemilik.

```python
    # Menetapkan persetujuan
    self.idToApprovals[_tokenId] = _approved
    log Approval(owner, _approved, _tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev Mengaktifkan atau menonaktifkan persetujuan untuk pihak ketiga ("operator") untuk mengelola semua
         aset `msg.sender`. Ini juga mengeluarkan aksi ApprovalForAll.
         Melempar jika `_operator` adalah `msg.sender`. (CATATAN: Ini tidak ditulis dalam EIP)
    @notice Ini berfungsi bahkan jika pengirim tidak memiliki token apa pun pada saat itu.
    @param _operator Alamat yang akan ditambahkan ke set operator yang berwenang.
    @param _approved Benar jika operator disetujui, salah untuk mencabut persetujuan.
    """
    # Melempar jika `_operator` adalah `msg.sender`
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)
```

#### Mencetak Token Baru dan Menghancurkan yang Sudah Ada {#mint-burn}

Akun yang membuat kontrak adalah `minter`, pengguna super yang berwenang untuk mencetak
NFT baru. Namun, bahkan `minter` pun tidak diizinkan untuk membakar token yang sudah ada. Hanya pemilik, atau entitas yang
diizinkan oleh pemilik, yang dapat melakukannya.

```python
### FUNGSI CETAK & BAKAR ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

Fungsi ini selalu mengembalikan `True`, karena jika operasi gagal, ia dibatalkan.

```python
    """
    @dev Fungsi untuk mencetak token
         Melempar jika `msg.sender` bukan minter.
         Melempar jika `_to` adalah alamat nol.
         Melempar jika `_tokenId` dimiliki oleh seseorang.
    @param _to Alamat yang akan menerima token yang dicetak.
    @param _tokenId Id token yang akan dicetak.
    @return Sebuah boolean yang menunjukkan apakah operasi berhasil.
    """
    # Melempar jika `msg.sender` bukan minter
    assert msg.sender == self.minter
```

Hanya minter (akun yang membuat kontrak ERC-721) yang dapat mencetak token baru. Ini bisa menjadi
masalah di masa depan jika kita ingin mengubah identitas minter. Dalam
kontrak produksi, Anda mungkin ingin fungsi yang memungkinkan minter untuk mentransfer
hak istimewa minter kepada orang lain.

```python
    # Melempar jika `_to` adalah alamat nol
    assert _to != ZERO_ADDRESS
    # Tambah NFT. Melempar jika `_tokenId` dimiliki oleh seseorang
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

Berdasarkan konvensi, pencetakan token baru dihitung sebagai transfer dari alamat nol.

```python

@external
def burn(_tokenId: uint256):
    """
    @dev Membakar token ERC721 tertentu.
         Melempar kecuali `msg.sender` adalah pemilik saat ini, operator yang berwenang, atau alamat
         yang disetujui untuk NFT ini.
         Melempar jika `_tokenId` bukan NFT yang valid.
    @param _tokenId id uint256 dari token ERC721 yang akan dibakar.
    """
    # Memeriksa persyaratan
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # Melempar jika `_tokenId` bukan NFT yang valid
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)
```

Siapa pun yang diizinkan untuk mentransfer token diizinkan untuk membakarnya. Meskipun pembakaran tampak setara dengan
transfer ke alamat nol, alamat nol sebenarnya tidak menerima token. Ini memungkinkan kita untuk
membebaskan semua penyimpanan yang digunakan untuk token, yang dapat mengurangi biaya gas transaksi.

## Menggunakan Kontrak Ini {#using-contract}

Berbeda dengan Solidity, Vyper tidak memiliki pewarisan. Ini adalah pilihan desain yang disengaja untuk membuat
kode lebih jelas dan oleh karena itu lebih mudah untuk diamankan. Jadi untuk membuat kontrak ERC-721 Vyper Anda sendiri, Anda mengambil kontrak
ini dan memodifikasinya
untuk mengimplementasikan logika bisnis yang Anda inginkan.

## Kesimpulan {#conclusion}

Sebagai ulasan, berikut adalah beberapa ide terpenting dalam kontrak ini:

- Untuk menerima token ERC-721 dengan transfer yang aman, kontrak harus mengimplementasikan antarmuka `ERC721Receiver`.
- Bahkan jika Anda menggunakan transfer aman, token masih bisa terjebak jika Anda mengirimkannya ke alamat yang kunci privatnya
  tidak diketahui.
- Ketika ada masalah dengan suatu operasi, ide yang baik adalah untuk `membatalkan` panggilan, daripada hanya mengembalikan
  nilai kegagalan.
- Token ERC-721 ada ketika mereka memiliki pemilik.
- Ada tiga cara untuk diotorisasi mentransfer NFT. Anda bisa menjadi pemilik, disetujui untuk token tertentu,
  atau menjadi operator untuk semua token pemilik.
- Aksi masa lalu hanya terlihat di luar rantai blok. Kode yang berjalan di dalam rantai blok tidak dapat melihatnya.

Sekarang pergilah dan implementasikan kontrak Vyper yang aman.

[Lihat di sini untuk lebih banyak pekerjaan saya](https://cryptodocguy.pro/).

