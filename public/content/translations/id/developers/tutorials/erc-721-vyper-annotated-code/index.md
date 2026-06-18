---
title: "Panduan Kontrak ERC-721 Vyper"
description: Kontrak ERC-721 Ryuya Nakamura dan cara kerjanya
author: Ori Pomerantz
lang: id
tags: ["vyper", "erc-721", "python"]
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

Komentar di Vyper, seperti di Python, dimulai dengan sebuah hash (`#`) dan berlanjut hingga akhir baris. Komentar yang menyertakan `@<keyword>` digunakan oleh [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) untuk menghasilkan dokumentasi yang dapat dibaca manusia.

```python
from vyper.interfaces import ERC721

implements: ERC721
```

Antarmuka ERC-721 dibangun ke dalam bahasa Vyper.
[Anda dapat melihat definisi kodenya di sini](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py).
Definisi antarmuka ditulis dalam Python, bukan Vyper, karena antarmuka digunakan tidak hanya di dalam rantai blok, tetapi juga saat mengirimkan transaksi ke rantai blok dari klien eksternal, yang mungkin ditulis dalam Python.

Baris pertama mengimpor antarmuka, dan yang kedua menentukan bahwa kita mengimplementasikannya di sini.

### Antarmuka ERC721Receiver {#receiver-interface}

```python
# Antarmuka untuk kontrak yang dipanggil oleh safeTransferFrom()
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721 mendukung dua jenis transfer:

- `transferFrom`, yang memungkinkan pengirim menentukan alamat tujuan mana pun dan menempatkan tanggung jawab transfer pada pengirim. Ini berarti Anda dapat mentransfer ke alamat yang tidak valid, yang dalam hal ini NFT akan hilang selamanya.
- `safeTransferFrom`, yang memeriksa apakah alamat tujuan adalah sebuah kontrak. Jika ya, kontrak ERC-721 bertanya kepada kontrak penerima apakah ia ingin menerima NFT tersebut.

Untuk menjawab permintaan `safeTransferFrom`, kontrak penerima harus mengimplementasikan `ERC721Receiver`.

```python
            _operator: address,
            _from: address,
```

Alamat `_from` adalah pemilik token saat ini. Alamat `_operator` adalah pihak yang meminta transfer (keduanya mungkin tidak sama, karena adanya jatah).

```python
            _tokenId: uint256,
```

ID token ERC-721 berukuran 256 bit. Biasanya ID ini dibuat dengan melakukan proses hash pada deskripsi dari apa pun yang diwakili oleh token tersebut.

```python
            _data: Bytes[1024]
```

Permintaan tersebut dapat memiliki hingga 1024 bita data pengguna.

```python
        ) -> bytes32: view
```

Untuk mencegah kasus di mana sebuah kontrak secara tidak sengaja menerima transfer, nilai kembaliannya bukanlah boolean, melainkan 256 bit dengan nilai tertentu.

Fungsi ini adalah `view`, yang berarti ia dapat membaca state dari rantai blok, tetapi tidak dapat memodifikasinya.

### Peristiwa {#events}

[Peristiwa](/developers/docs/smart-contracts/anatomy/#events-and-logs)
dipancarkan untuk memberi tahu pengguna dan server di luar rantai blok tentang peristiwa tersebut. Perhatikan bahwa konten peristiwa tidak tersedia untuk kontrak di rantai blok.

```python
# @dev Memancarkan peristiwa ketika kepemilikan NFT apa pun berubah melalui mekanisme apa pun. Peristiwa ini dipancarkan ketika NFT
#      diciptakan (`from` == 0) dan dihancurkan (`to` == 0). Pengecualian: selama pembuatan kontrak, sejumlah
#      NFT dapat diciptakan dan ditetapkan tanpa memancarkan peristiwa Transfer. Pada saat
#      transfer apa pun, alamat yang disetujui untuk NFT tersebut (jika ada) diatur ulang menjadi tidak ada.
# @param _from Pengirim NFT (jika alamat adalah alamat nol, ini menunjukkan penciptaan token).
# @param _to Penerima NFT (jika alamat adalah alamat nol, ini menunjukkan penghancuran token).
# @param _tokenId NFT yang ditransfer.
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

Ini mirip dengan peristiwa Transfer ERC-20, kecuali bahwa kita melaporkan `tokenId` alih-alih jumlah. Tidak ada yang memiliki alamat nol, jadi berdasarkan konvensi kita menggunakannya untuk melaporkan penciptaan dan penghancuran token.

```python
# @dev Ini memancarkan peristiwa ketika alamat yang disetujui untuk sebuah NFT diubah atau ditegaskan kembali. Alamat nol
#      menunjukkan tidak ada alamat yang disetujui. Ketika peristiwa Transfer dipancarkan, ini juga
#      menunjukkan bahwa alamat yang disetujui untuk NFT tersebut (jika ada) diatur ulang menjadi tidak ada.
# @param _owner Pemilik NFT.
# @param _approved Alamat yang kami setujui.
# @param _tokenId NFT yang kami setujui.
event Approval:
    owner: indexed(address)
    approved: indexed(address)
    tokenId: indexed(uint256)
```

Persetujuan ERC-721 mirip dengan jatah ERC-20. Alamat tertentu diizinkan untuk mentransfer token tertentu. Ini memberikan mekanisme bagi kontrak untuk merespons saat mereka menerima token. Kontrak tidak dapat mendengarkan peristiwa, jadi jika Anda hanya mentransfer token kepada mereka, mereka tidak akan "tahu" tentang hal itu. Dengan cara ini pemilik pertama-tama mengirimkan persetujuan dan kemudian mengirimkan permintaan ke kontrak: "Saya menyetujui Anda untuk mentransfer token X, silakan lakukan ...".

Ini adalah pilihan desain untuk membuat standar ERC-721 mirip dengan standar ERC-20. Karena token ERC-721 tidak sepadan, sebuah kontrak juga dapat mengidentifikasi bahwa ia mendapatkan token tertentu dengan melihat kepemilikan token tersebut.

```python
# @dev Ini memancarkan peristiwa ketika operator diaktifkan atau dinonaktifkan untuk seorang pemilik. Operator dapat mengelola
#      semua NFT milik pemilik tersebut.
# @param _owner Pemilik NFT.
# @param _operator Alamat yang kami tetapkan hak operatornya.
# @param _approved Status hak operator (true jika hak operator diberikan dan false jika
# dicabut).
event ApprovalForAll:
    owner: indexed(address)
    operator: indexed(address)
    approved: bool
```

Terkadang berguna untuk memiliki _operator_ yang dapat mengelola semua token akun dari jenis tertentu (yang dikelola oleh kontrak tertentu), mirip dengan surat kuasa. Misalnya, saya mungkin ingin memberikan kuasa tersebut kepada kontrak yang memeriksa apakah saya belum menghubunginya selama enam bulan, dan jika demikian mendistribusikan aset saya kepada ahli waris saya (jika salah satu dari mereka memintanya, kontrak tidak dapat melakukan apa pun tanpa dipanggil oleh sebuah transaksi). Di ERC-20 kita bisa saja memberikan jatah yang tinggi ke kontrak warisan, tetapi itu tidak berlaku untuk ERC-721 karena tokennya tidak sepadan. Ini adalah padanannya.

Nilai `approved` memberi tahu kita apakah peristiwa tersebut untuk persetujuan, atau penarikan persetujuan.

### Variabel State {#state-vars}

Variabel-variabel ini berisi state token saat ini: mana yang tersedia dan siapa pemiliknya. Sebagian besar dari ini adalah objek `HashMap`, [pemetaan searah yang ada di antara dua tipe](https://vyper.readthedocs.io/en/latest/types.html#mappings).

```python
# @dev Pemetaan dari ID NFT ke alamat yang memilikinya.
idToOwner: HashMap[uint256, address]

# @dev Pemetaan dari ID NFT ke alamat yang disetujui.
idToApprovals: HashMap[uint256, address]
```

Identitas pengguna dan kontrak di Ethereum diwakili oleh alamat 160-bit. Kedua variabel ini memetakan dari ID token ke pemiliknya dan mereka yang disetujui untuk mentransfernya (maksimal satu untuk masing-masing). Di Ethereum, data yang tidak diinisialisasi selalu nol, jadi jika tidak ada pemilik atau pentransfer yang disetujui, nilai untuk token tersebut adalah nol.

```python
# @dev Pemetaan dari alamat pemilik ke jumlah token miliknya.
ownerToNFTokenCount: HashMap[address, uint256]
```

Variabel ini menyimpan jumlah token untuk setiap pemilik. Tidak ada pemetaan dari pemilik ke token, jadi satu-satunya cara untuk mengidentifikasi token yang dimiliki oleh pemilik tertentu adalah dengan melihat kembali riwayat peristiwa rantai blok dan melihat peristiwa `Transfer` yang sesuai. Kita dapat menggunakan variabel ini untuk mengetahui kapan kita memiliki semua NFT dan tidak perlu melihat lebih jauh ke masa lalu.

Perhatikan bahwa algoritma ini hanya berfungsi untuk antarmuka pengguna dan server eksternal. Kode yang berjalan di rantai blok itu sendiri tidak dapat membaca peristiwa masa lalu.

```python
# @dev Pemetaan dari alamat pemilik ke pemetaan alamat operator.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

Sebuah akun mungkin memiliki lebih dari satu operator. `HashMap` sederhana tidak cukup untuk melacaknya, karena setiap kunci mengarah ke satu nilai. Sebagai gantinya, Anda dapat menggunakan `HashMap[address, bool]` sebagai nilainya. Secara bawaan, nilai untuk setiap alamat adalah `False`, yang berarti ia bukan operator. Anda dapat mengatur nilai ke `True` sesuai kebutuhan.

```python
# @dev Alamat pencetak, yang dapat mencetak token
minter: address
```

Token baru harus dibuat dengan suatu cara. Dalam kontrak ini ada satu entitas yang diizinkan untuk melakukannya, yaitu `minter`. Ini kemungkinan cukup untuk sebuah permainan, misalnya. Untuk tujuan lain, mungkin perlu membuat logika bisnis yang lebih rumit.

```python
# @dev Pemetaan ID antarmuka ke bool tentang apakah itu didukung atau tidak
supportedInterfaces: HashMap[bytes32, bool]

# @dev ID antarmuka ERC-165 dari ERC-165
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ID antarmuka ERC-165 dari ERC-721
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) menentukan mekanisme bagi kontrak untuk mengungkapkan bagaimana aplikasi dapat berkomunikasi dengannya, dan ERC mana yang dipatuhinya. Dalam hal ini, kontrak mematuhi ERC-165 dan ERC-721.

### Fungsi {#functions}

Ini adalah fungsi-fungsi yang benar-benar mengimplementasikan ERC-721.

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

Di Python, dan di Vyper, Anda juga dapat membuat komentar dengan menentukan string multi-baris (yang dimulai dan diakhiri dengan `"""`), dan tidak menggunakannya dengan cara apa pun. Komentar ini juga dapat menyertakan [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html).

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

Untuk mengakses variabel state Anda menggunakan `self.<variable name>` (sekali lagi, sama seperti di Python).

#### Fungsi View {#views}

Ini adalah fungsi-fungsi yang tidak memodifikasi state dari rantai blok, dan oleh karena itu dapat dieksekusi secara gratis jika dipanggil secara eksternal. Jika fungsi view dipanggil oleh sebuah kontrak, fungsi tersebut tetap harus dieksekusi di setiap node dan oleh karena itu membutuhkan biaya gas.

```python
@view
@external
```

Kata kunci sebelum definisi fungsi yang dimulai dengan tanda at (`@`) disebut _dekorasi_. Mereka menentukan keadaan di mana suatu fungsi dapat dipanggil.

- `@view` menentukan bahwa fungsi ini adalah sebuah view.
- `@external` menentukan bahwa fungsi khusus ini dapat dipanggil oleh transaksi dan oleh kontrak lain.

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

Berbeda dengan Python, Vyper adalah [bahasa bertipe statis](https://wikipedia.org/wiki/Type_system#Static_type_checking).
Anda tidak dapat mendeklarasikan variabel, atau parameter fungsi, tanpa mengidentifikasi [tipe data](https://vyper.readthedocs.io/en/latest/types.html). Dalam hal ini parameter masukannya adalah `bytes32`, nilai 256-bit (256 bit adalah ukuran kata asli dari [Ethereum Virtual Machine](/developers/docs/evm/)). Keluarannya adalah nilai boolean. Berdasarkan konvensi, nama parameter fungsi dimulai dengan garis bawah (`_`).

```python
    """
    @dev Identifikasi antarmuka ditentukan dalam ERC-165.
    @param _interfaceID Id dari antarmuka
    """
    return self.supportedInterfaces[_interfaceID]
```

Mengembalikan nilai dari HashMap `self.supportedInterfaces`, yang diatur dalam konstruktor (`__init__`).

```python
### FUNGSI VIEW ###
```

Ini adalah fungsi-fungsi view yang membuat informasi tentang token tersedia bagi pengguna dan kontrak lain.

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev Mengembalikan jumlah NFT yang dimiliki oleh `_owner`.
         Menghasilkan galat jika `_owner` adalah alamat nol. NFT yang ditetapkan ke alamat nol dianggap tidak valid.
    @param _owner Alamat yang akan dikueri saldonya.
    """
    assert _owner != ZERO_ADDRESS
```

Baris ini [menegaskan](https://vyper.readthedocs.io/en/latest/statements.html#assert) bahwa `_owner` bukan nol. Jika ya, terjadi kesalahan dan operasi dikembalikan.

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
    assert owner != ZERO_ADDRESS
    return owner
```

Di Ethereum Virtual Machine (EVM), penyimpanan apa pun yang tidak memiliki nilai yang tersimpan di dalamnya adalah nol.
Jika tidak ada token di `_tokenId` maka nilai `self.idToOwner[_tokenId]` adalah nol. Dalam hal itu fungsi mengembalikan.

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev Mendapatkan alamat yang disetujui untuk satu NFT.
         Menghasilkan galat jika `_tokenId` bukan NFT yang valid.
    @param _tokenId ID NFT untuk dikueri persetujuannya.
    """
    # Menghasilkan galat jika `_tokenId` bukan NFT yang valid
    assert self.idToOwner[_tokenId] != ZERO_ADDRESS
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

#### Fungsi Pembantu Transfer {#transfer-helpers}

Fungsi-fungsi ini mengimplementasikan operasi yang merupakan bagian dari mentransfer atau mengelola token.

```python

### PEMBANTU FUNGSI TRANSFER ###

@view
@internal
```

Dekorasi ini, `@internal`, berarti bahwa fungsi tersebut hanya dapat diakses dari fungsi lain dalam kontrak yang sama. Berdasarkan konvensi, nama fungsi ini juga dimulai dengan garis bawah (`_`).

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev Mengembalikan apakah pembelanja yang diberikan dapat mentransfer ID token yang diberikan
    @param spender alamat pembelanja untuk dikueri
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

Ada tiga cara di mana sebuah alamat dapat diizinkan untuk mentransfer token:

1. Alamat tersebut adalah pemilik token
2. Alamat tersebut disetujui untuk membelanjakan token itu
3. Alamat tersebut adalah operator untuk pemilik token

Fungsi di atas dapat berupa view karena tidak mengubah state. Untuk mengurangi biaya operasi, fungsi apa pun yang _dapat_ berupa view _seharusnya_ menjadi view.

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev Menambahkan NFT ke alamat yang diberikan
         Menghasilkan galat jika `_tokenId` dimiliki oleh seseorang.
    """
    # Menghasilkan galat jika `_tokenId` dimiliki oleh seseorang
    assert self.idToOwner[_tokenId] == ZERO_ADDRESS
    # Mengubah pemilik
    self.idToOwner[_tokenId] = _to
    # Mengubah pelacakan jumlah
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev Menghapus NFT dari alamat yang diberikan
         Menghasilkan galat jika `_from` bukan pemilik saat ini.
    """
    # Menghasilkan galat jika `_from` bukan pemilik saat ini
    assert self.idToOwner[_tokenId] == _from
    # Mengubah pemilik
    self.idToOwner[_tokenId] = ZERO_ADDRESS
    # Mengubah pelacakan jumlah
    self.ownerToNFTokenCount[_from] -= 1
```

Ketika ada masalah dengan transfer, kita mengembalikan panggilan tersebut.

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev Menghapus persetujuan dari alamat yang diberikan
         Menghasilkan galat jika `_owner` bukan pemilik saat ini.
    """
    # Menghasilkan galat jika `_owner` bukan pemilik saat ini
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != ZERO_ADDRESS:
        # Mengatur ulang persetujuan
        self.idToApprovals[_tokenId] = ZERO_ADDRESS
```

Hanya ubah nilai jika perlu. Variabel state hidup di penyimpanan. Menulis ke penyimpanan adalah
salah satu operasi paling mahal yang dilakukan EVM (Ethereum Virtual Machine) (dalam hal
[gas](/developers/docs/gas/)). Oleh karena itu, ada baiknya untuk meminimalkannya, bahkan menulis nilai yang ada pun memiliki biaya yang tinggi.

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev Mengeksekusi transfer NFT.
         Menghasilkan galat kecuali `msg.sender` adalah pemilik saat ini, operator yang sah, atau alamat
         yang disetujui untuk NFT ini. (CATATAN: `msg.sender` tidak diizinkan dalam fungsi privat jadi teruskan `_sender`.)
         Menghasilkan galat jika `_to` adalah alamat nol.
         Menghasilkan galat jika `_from` bukan pemilik saat ini.
         Menghasilkan galat jika `_tokenId` bukan NFT yang valid.
    """
```

Kita memiliki fungsi internal ini karena ada dua cara untuk mentransfer token (biasa dan aman), tetapi
kita hanya menginginkan satu lokasi dalam kode tempat kita melakukannya untuk mempermudah audit.

```python
    # Memeriksa persyaratan
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # Menghasilkan galat jika `_to` adalah alamat nol
    assert _to != ZERO_ADDRESS
    # Menghapus persetujuan. Menghasilkan galat jika `_from` bukan pemilik saat ini
    self._clearApproval(_from, _tokenId)
    # Menghapus NFT. Menghasilkan galat jika `_tokenId` bukan NFT yang valid
    self._removeTokenFrom(_from, _tokenId)
    # Menambahkan NFT
    self._addTokenTo(_to, _tokenId)
    # Mencatat transfer
    log Transfer(_from, _to, _tokenId)
```

Untuk memancarkan peristiwa di Vyper, Anda menggunakan pernyataan `log` ([lihat di sini untuk detail lebih lanjut](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)).

#### Fungsi Transfer {#transfer-funs}

```python

### FUNGSI TRANSFER ###

@external
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev Menghasilkan galat kecuali `msg.sender` adalah pemilik saat ini, operator yang sah, atau alamat
         yang disetujui untuk NFT ini.
         Menghasilkan galat jika `_from` bukan pemilik saat ini.
         Menghasilkan galat jika `_to` adalah alamat nol.
         Menghasilkan galat jika `_tokenId` bukan NFT yang valid.
    @notice Pemanggil bertanggung jawab untuk mengonfirmasi bahwa `_to` mampu menerima NFT atau jika tidak
            NFT tersebut mungkin hilang secara permanen.
    @param _from Pemilik NFT saat ini.
    @param _to Pemilik baru.
    @param _tokenId NFT yang akan ditransfer.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Fungsi ini memungkinkan Anda mentransfer ke alamat mana pun. Kecuali alamat tersebut adalah pengguna, atau kontrak yang
tahu cara mentransfer token, token apa pun yang Anda transfer akan tersangkut di alamat tersebut dan tidak berguna.

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
         Menghasilkan galat kecuali `msg.sender` adalah pemilik saat ini, operator yang sah, atau
         alamat yang disetujui untuk NFT ini.
         Menghasilkan galat jika `_from` bukan pemilik saat ini.
         Menghasilkan galat jika `_to` adalah alamat nol.
         Menghasilkan galat jika `_tokenId` bukan NFT yang valid.
         Jika `_to` adalah kontrak pintar, ini memanggil `onERC721Received` pada `_to` dan menghasilkan galat jika
         nilai kembaliannya bukan `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
         CATATAN: bytes4 direpresentasikan oleh bytes32 dengan padding
    @param _from Pemilik NFT saat ini.
    @param _to Pemilik baru.
    @param _tokenId NFT yang akan ditransfer.
    @param _data Data tambahan tanpa format yang ditentukan, dikirim dalam panggilan ke `_to`.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Tidak apa-apa untuk melakukan transfer terlebih dahulu karena jika ada masalah kita akan mengembalikannya,
jadi semua yang dilakukan dalam panggilan akan dibatalkan.

```python
    if _to.is_contract: # memeriksa apakah `_to` adalah alamat kontrak
```

Pertama periksa untuk melihat apakah alamat tersebut adalah sebuah kontrak (jika memiliki kode). Jika tidak, asumsikan itu adalah alamat pengguna
dan pengguna akan dapat menggunakan token atau mentransfernya. Namun jangan biarkan hal itu membuat Anda terlena
dalam rasa aman yang palsu. Anda bisa kehilangan token, bahkan dengan `safeTransferFrom`, jika Anda mentransfernya
ke alamat yang tidak ada seorang pun yang mengetahui kunci privatnya.

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

Panggil kontrak target untuk melihat apakah ia dapat menerima token ERC-721.

```python
        # Menghasilkan galat jika tujuan transfer adalah kontrak yang tidak mengimplementasikan 'onERC721Received'
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

Jika tujuannya adalah sebuah kontrak, tetapi kontrak yang tidak menerima token ERC-721 (atau yang memutuskan untuk tidak menerima transfer
khusus ini), kembalikan.

```python
@external
def approve(_approved: address, _tokenId: uint256):
    """
    @dev Menetapkan atau menegaskan kembali alamat yang disetujui untuk sebuah NFT. Alamat nol menunjukkan tidak ada alamat yang disetujui.
         Menghasilkan galat kecuali `msg.sender` adalah pemilik NFT saat ini, atau operator yang sah dari pemilik saat ini.
         Menghasilkan galat jika `_tokenId` bukan NFT yang valid. (CATATAN: Ini tidak ditulis dalam EIP)
         Menghasilkan galat jika `_approved` adalah pemilik saat ini. (CATATAN: Ini tidak ditulis dalam EIP)
    @param _approved Alamat yang akan disetujui untuk ID NFT yang diberikan.
    @param _tokenId ID token yang akan disetujui.
    """
    owner: address = self.idToOwner[_tokenId]
    # Menghasilkan galat jika `_tokenId` bukan NFT yang valid
    assert owner != ZERO_ADDRESS
    # Menghasilkan galat jika `_approved` adalah pemilik saat ini
    assert _approved != owner
```

Berdasarkan konvensi, jika Anda tidak ingin memiliki pemberi persetujuan, Anda menunjuk alamat nol, bukan diri Anda sendiri.

```python
    # Memeriksa persyaratan
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

Untuk mengatur persetujuan, Anda bisa menjadi pemilik, atau operator yang diberi wewenang oleh pemilik.

```python
    # Menetapkan persetujuan
    self.idToApprovals[_tokenId] = _approved
    log Approval(owner, _approved, _tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev Mengaktifkan atau menonaktifkan persetujuan untuk pihak ketiga ("operator") untuk mengelola semua
         aset `msg.sender`. Ini juga memancarkan peristiwa ApprovalForAll.
         Menghasilkan galat jika `_operator` adalah `msg.sender`. (CATATAN: Ini tidak ditulis dalam EIP)
    @notice Ini berfungsi bahkan jika pengirim tidak memiliki token apa pun pada saat itu.
    @param _operator Alamat untuk ditambahkan ke kumpulan operator yang sah.
    @param _approved True jika operator disetujui, false untuk mencabut persetujuan.
    """
    # Menghasilkan galat jika `_operator` adalah `msg.sender`
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)
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