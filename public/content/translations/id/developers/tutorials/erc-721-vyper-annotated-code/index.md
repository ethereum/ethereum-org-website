---
title: "Panduan Kontrak ERC-721 Vyper"
description: Kontrak ERC-721 Ryuya Nakamura dan cara kerjanya
author: Ori Pomerantz
lang: id
tags: ["Vyper", "erc-721", "Python"]
skill: beginner
breadcrumb: "Vyper ERC-721"
published: 2021-04-01
---

## Pengantar {#introduction}

Standar [ERC-721](/developers/docs/standards/tokens/erc-721/) digunakan untuk memegang kepemilikan Non-Fungible Token (NFT).
Token [ERC-20](/developers/docs/standards/tokens/erc-20/) berperilaku sebagai komoditas, karena tidak ada perbedaan antara masing-masing token.
Sebaliknya, token ERC-721 dirancang untuk aset yang serupa tetapi tidak identik, seperti [kartun kucing](https://www.cryptokitties.co/) yang berbeda atau sertifikat untuk berbagai bidang real estat.

Dalam artikel ini kita akan menganalisis [kontrak ERC-721 Ryuya Nakamura](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy).
Kontrak ini ditulis dalam [Vyper](https://vyper.readthedocs.io/en/latest/index.html), bahasa kontrak mirip Python yang dirancang untuk membuatnya lebih sulit menulis kode yang tidak aman dibandingkan dengan Solidity.

## Kontrak {#contract}

```python
# @dev Implementation of ERC-721 non-fungible token standard. # @dev Implementasi standar token non-fungible ERC-721.
# @author Ryuya Nakamura (@nrryuya) # @author Ryuya Nakamura (@nrryuya)
# Modified from: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy # Dimodifikasi dari: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Komentar di Vyper, seperti di Python, dimulai dengan tanda pagar (`#`) dan berlanjut hingga akhir baris. Komentar yang menyertakan `@<keyword>` digunakan oleh [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) untuk menghasilkan dokumentasi yang dapat dibaca manusia.

```python
from vyper.interfaces import ERC721

implements: ERC721
```

Antarmuka ERC-721 dibangun ke dalam bahasa Vyper.
[Anda dapat melihat definisi kodenya di sini](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py).
Definisi antarmuka ditulis dalam Python, bukan Vyper, karena antarmuka digunakan tidak hanya di dalam blockchain, tetapi juga saat mengirimkan transaksi ke blockchain dari klien eksternal, yang mungkin ditulis dalam Python.

Baris pertama mengimpor antarmuka, dan yang kedua menentukan bahwa kita mengimplementasikannya di sini.

### Antarmuka ERC721Receiver {#receiver-interface}

```python
# Interface for the contract called by safeTransferFrom() # Antarmuka untuk kontrak yang dipanggil oleh safeTransferFrom()
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

Alamat `_from` adalah pemilik token saat ini. Alamat `_operator` adalah pihak yang meminta transfer (keduanya mungkin tidak sama, karena adanya jatah/allowance).

```python
            _tokenId: uint256,
```

ID token ERC-721 berukuran 256 bit. Biasanya ID ini dibuat dengan melakukan hash pada deskripsi dari apa pun yang diwakili oleh token tersebut.

```python
            _data: Bytes[1024]
```

Permintaan dapat memiliki hingga 1024 byte data pengguna.

```python
        ) -> bytes32: view
```

Untuk mencegah kasus di mana sebuah kontrak secara tidak sengaja menerima transfer, nilai kembaliannya bukanlah boolean, melainkan 256 bit dengan nilai tertentu.

Fungsi ini adalah `view`, yang berarti ia dapat membaca status blockchain, tetapi tidak dapat memodifikasinya.

### Event {#events}

[Event](https://media.consensys.net/technical-introduction-to-events-and-logs-in-ethereum-a074d65dd61e) dipancarkan untuk memberi tahu pengguna dan server di luar blockchain tentang suatu kejadian. Perhatikan bahwa konten event tidak tersedia untuk kontrak di blockchain.

```python
# @dev Emits when ownership of any NFT changes by any mechanism. This event emits when NFTs are # @dev Memancarkan saat kepemilikan NFT apa pun berubah melalui mekanisme apa pun. Event ini memancarkan saat NFT
#      created (`from` == 0) and destroyed (`to` == 0). Exception: during contract creation, any # dibuat (`from` == 0) dan dihancurkan (`to` == 0). Pengecualian: selama pembuatan kontrak, sejumlah
#      number of NFTs may be created and assigned without emitting Transfer. At the time of any # NFT dapat dibuat dan ditetapkan tanpa memancarkan Transfer. Pada saat
#      transfer, the approved address for that NFT (if any) is reset to none. # transfer apa pun, alamat yang disetujui untuk NFT tersebut (jika ada) diatur ulang menjadi tidak ada.
# @param _from Sender of NFT (if address is zero address it indicates token creation). # @param _from Pengirim NFT (jika alamat adalah alamat nol, ini menunjukkan pembuatan token).
# @param _to Receiver of NFT (if address is zero address it indicates token destruction). # @param _to Penerima NFT (jika alamat adalah alamat nol, ini menunjukkan penghancuran token).
# @param _tokenId The NFT that got transferred. # @param _tokenId NFT yang ditransfer.
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

Ini mirip dengan event Transfer ERC-20, kecuali bahwa kita melaporkan `tokenId` alih-alih jumlah. Tidak ada yang memiliki alamat nol, jadi berdasarkan konvensi kita menggunakannya untuk melaporkan pembuatan dan penghancuran token.

```python
# @dev This emits when the approved address for an NFT is changed or reaffirmed. The zero # @dev Ini memancarkan saat alamat yang disetujui untuk NFT diubah atau ditegaskan kembali. Alamat
#      address indicates there is no approved address. When a Transfer event emits, this also # nol menunjukkan tidak ada alamat yang disetujui. Saat event Transfer memancarkan, ini juga
#      indicates that the approved address for that NFT (if any) is reset to none. # menunjukkan bahwa alamat yang disetujui untuk NFT tersebut (jika ada) diatur ulang menjadi tidak ada.
# @param _owner Owner of NFT. # @param _owner Pemilik NFT.
# @param _approved Address that we are approving. # @param _approved Alamat yang kami setujui.
# @param _tokenId NFT which we are approving. # @param _tokenId NFT yang kami setujui.
event Approval:
    owner: indexed(address)
    approved: indexed(address)
    tokenId: indexed(uint256)
```

Persetujuan (approval) ERC-721 mirip dengan jatah (allowance) ERC-20. Alamat tertentu diizinkan untuk mentransfer token tertentu. Ini memberikan mekanisme bagi kontrak untuk merespons ketika mereka menerima token. Kontrak tidak dapat mendengarkan event, jadi jika Anda hanya mentransfer token kepada mereka, mereka tidak "tahu" tentang hal itu. Dengan cara ini, pemilik pertama-tama mengirimkan persetujuan dan kemudian mengirimkan permintaan ke kontrak: "Saya menyetujui Anda untuk mentransfer token X, silakan lakukan ...".

Ini adalah pilihan desain untuk membuat standar ERC-721 mirip dengan standar ERC-20. Karena token ERC-721 bersifat non-fungible, sebuah kontrak juga dapat mengidentifikasi bahwa ia mendapatkan token tertentu dengan melihat kepemilikan token tersebut.

```python
# @dev This emits when an operator is enabled or disabled for an owner. The operator can manage # @dev Ini memancarkan saat operator diaktifkan atau dinonaktifkan untuk pemilik. Operator dapat mengelola
#      all NFTs of the owner. # semua NFT milik pemilik.
# @param _owner Owner of NFT. # @param _owner Pemilik NFT.
# @param _operator Address to which we are setting operator rights. # @param _operator Alamat yang kami tetapkan hak operatornya.
# @param _approved Status of operator rights(true if operator rights are given and false if # @param _approved Status hak operator (true jika hak operator diberikan dan false jika
# revoked). # dicabut).
event ApprovalForAll:
    owner: indexed(address)
    operator: indexed(address)
    approved: bool
```

Terkadang berguna untuk memiliki _operator_ yang dapat mengelola semua token akun dari jenis tertentu (yang dikelola oleh kontrak tertentu), mirip dengan surat kuasa. Misalnya, saya mungkin ingin memberikan kekuasaan seperti itu kepada kontrak yang memeriksa apakah saya belum menghubunginya selama enam bulan, dan jika demikian mendistribusikan aset saya kepada ahli waris saya (jika salah satu dari mereka memintanya, kontrak tidak dapat melakukan apa pun tanpa dipanggil oleh sebuah transaksi). Di ERC-20 kita bisa memberikan jatah yang tinggi ke kontrak warisan, tetapi itu tidak berlaku untuk ERC-721 karena tokennya bersifat non-fungible. Ini adalah padanannya.

Nilai `approved` memberi tahu kita apakah event tersebut untuk persetujuan, atau penarikan persetujuan.

### Variabel Status {#state-vars}

Variabel-variabel ini berisi status token saat ini: mana yang tersedia dan siapa pemiliknya. Sebagian besar dari ini adalah objek `HashMap`, [pemetaan searah yang ada di antara dua tipe](https://vyper.readthedocs.io/en/latest/types.html#mappings).

```python
# @dev Mapping from NFT ID to the address that owns it. # @dev Pemetaan dari ID NFT ke alamat yang memilikinya.
idToOwner: HashMap[uint256, address]

# @dev Mapping from NFT ID to approved address. # @dev Pemetaan dari ID NFT ke alamat yang disetujui.
idToApprovals: HashMap[uint256, address]
```

Identitas pengguna dan kontrak di Ethereum diwakili oleh alamat 160-bit. Kedua variabel ini memetakan dari ID token ke pemiliknya dan mereka yang disetujui untuk mentransfernya (maksimal satu untuk masing-masing). Di Ethereum, data yang tidak diinisialisasi selalu nol, jadi jika tidak ada pemilik atau pentransfer yang disetujui, nilai untuk token tersebut adalah nol.

```python
# @dev Mapping from owner address to count of his tokens. # @dev Pemetaan dari alamat pemilik ke jumlah tokennya.
ownerToNFTokenCount: HashMap[address, uint256]
```

Variabel ini menyimpan jumlah token untuk setiap pemilik. Tidak ada pemetaan dari pemilik ke token, jadi satu-satunya cara untuk mengidentifikasi token yang dimiliki oleh pemilik tertentu adalah dengan melihat kembali riwayat event blockchain dan melihat event `Transfer` yang sesuai. Kita dapat menggunakan variabel ini untuk mengetahui kapan kita memiliki semua NFT dan tidak perlu melihat lebih jauh ke masa lalu.

Perhatikan bahwa algoritma ini hanya berfungsi untuk antarmuka pengguna dan server eksternal. Kode yang berjalan di blockchain itu sendiri tidak dapat membaca event masa lalu.

```python
# @dev Mapping from owner address to mapping of operator addresses. # @dev Pemetaan dari alamat pemilik ke pemetaan alamat operator.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

Sebuah akun mungkin memiliki lebih dari satu operator. `HashMap` sederhana tidak cukup untuk melacaknya, karena setiap kunci mengarah ke satu nilai. Sebagai gantinya, Anda dapat menggunakan `HashMap[address, bool]` sebagai nilainya. Secara default, nilai untuk setiap alamat adalah `False`, yang berarti ia bukan operator. Anda dapat mengatur nilai menjadi `True` sesuai kebutuhan.

```python
# @dev Address of minter, who can mint a token # @dev Alamat minter, yang dapat melakukan mint token
minter: address
```

Token baru harus dibuat dengan suatu cara. Dalam kontrak ini ada satu entitas yang diizinkan untuk melakukannya, yaitu `minter`. Ini kemungkinan cukup untuk sebuah game, misalnya. Untuk tujuan lain, mungkin perlu membuat logika bisnis yang lebih rumit.

```python
# @dev Mapping of interface id to bool about whether or not it's supported # @dev Pemetaan id antarmuka ke bool tentang apakah itu didukung atau tidak
supportedInterfaces: HashMap[bytes32, bool]

# @dev ERC165 interface ID of ERC165 # @dev ID antarmuka ERC165 dari ERC165
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ERC165 interface ID of ERC721 # @dev ID antarmuka ERC165 dari ERC721
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
    # @dev Konstruktor kontrak.
    """
    @dev Contract constructor.
    """
```

Di Python, dan di Vyper, Anda juga dapat membuat komentar dengan menentukan string multi-baris (yang dimulai dan diakhiri dengan `"""`), dan tidak menggunakannya dengan cara apa pun. Komentar ini juga dapat menyertakan [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html).

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

Untuk mengakses variabel status, Anda menggunakan `self.<variable name>` (sekali lagi, sama seperti di Python).

#### Fungsi View {#views}

Ini adalah fungsi-fungsi yang tidak memodifikasi status blockchain, dan oleh karena itu dapat dieksekusi secara gratis jika dipanggil secara eksternal. Jika fungsi view dipanggil oleh sebuah kontrak, fungsi tersebut tetap harus dieksekusi di setiap node dan oleh karena itu membutuhkan biaya gas.

```python
@view
@external
```

Kata kunci sebelum definisi fungsi yang dimulai dengan tanda at (`@`) disebut _dekorasi_ (decorations). Mereka menentukan keadaan di mana suatu fungsi dapat dipanggil.

- `@view` menentukan bahwa fungsi ini adalah sebuah view.
- `@external` menentukan bahwa fungsi khusus ini dapat dipanggil oleh transaksi dan oleh kontrak lain.

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

Berbeda dengan Python, Vyper adalah [bahasa bertipe statis](https://wikipedia.org/wiki/Type_system#Static_type_checking). Anda tidak dapat mendeklarasikan variabel, atau parameter fungsi, tanpa mengidentifikasi [tipe data](https://vyper.readthedocs.io/en/latest/types.html). Dalam hal ini parameter inputnya adalah `bytes32`, nilai 256-bit (256 bit adalah ukuran kata asli dari [Mesin Virtual Ethereum](/developers/docs/evm/)). Outputnya adalah nilai boolean. Berdasarkan konvensi, nama parameter fungsi dimulai dengan garis bawah (`_`).

```python
    # @dev Identifikasi antarmuka ditentukan dalam ERC-165.
    @param _interfaceID Id dari antarmuka
    """
    @dev Interface identification is specified in ERC-165.
    @param _interfaceID Id of the interface
    """
    return self.supportedInterfaces[_interfaceID]
```

Mengembalikan nilai dari HashMap `self.supportedInterfaces`, yang diatur dalam konstruktor (`__init__`).

```python
### VIEW FUNCTIONS ### # ## FUNGSI VIEW ###
```

Ini adalah fungsi view yang membuat informasi tentang token tersedia bagi pengguna dan kontrak lainnya.

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    # @dev Mengembalikan jumlah NFT yang dimiliki oleh `_owner`.
         Melempar kesalahan jika `_owner` adalah alamat nol. NFT yang ditetapkan ke alamat nol dianggap tidak valid.
    @param _owner Alamat untuk menanyakan saldo.
    """
    @dev Returns the number of NFTs owned by `_owner`.
         Throws if `_owner` is the zero address. NFTs assigned to the zero address are considered invalid.
    @param _owner Address for whom to query the balance.
    """
    assert _owner != ZERO_ADDRESS
```

Baris ini [menegaskan](https://vyper.readthedocs.io/en/latest/statements.html#assert) bahwa `_owner` bukan nol. Jika ya, terjadi kesalahan dan operasi dibatalkan (reverted).

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    # @dev Mengembalikan alamat pemilik NFT.
         Melempar kesalahan jika `_tokenId` bukan NFT yang valid.
    @param _tokenId Pengidentifikasi untuk NFT.
    """
    @dev Returns the address of the owner of the NFT.
         Throws if `_tokenId` is not a valid NFT.
    @param _tokenId The identifier for an NFT.
    """
    owner: address = self.idToOwner[_tokenId]
    # Throws if `_tokenId` is not a valid NFT # Melempar kesalahan jika `_tokenId` bukan NFT yang valid
    assert owner != ZERO_ADDRESS
    return owner
```

Di Mesin Virtual Ethereum (EVM), penyimpanan apa pun yang tidak memiliki nilai yang tersimpan di dalamnya adalah nol. Jika tidak ada token di `_tokenId` maka nilai `self.idToOwner[_tokenId]` adalah nol. Dalam hal ini fungsi dibatalkan.

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    # @dev Dapatkan alamat yang disetujui untuk satu NFT.
         Melempar kesalahan jika `_tokenId` bukan NFT yang valid.
    @param _tokenId ID NFT untuk menanyakan persetujuannya.
    """
    @dev Get the approved address for a single NFT.
         Throws if `_tokenId` is not a valid NFT.
    @param _tokenId ID of the NFT to query the approval of.
    """
    # Throws if `_tokenId` is not a valid NFT # Melempar kesalahan jika `_tokenId` bukan NFT yang valid
    assert self.idToOwner[_tokenId] != ZERO_ADDRESS
    return self.idToApprovals[_tokenId]
```

Perhatikan bahwa `getApproved` _dapat_ mengembalikan nol. Jika token valid, ia mengembalikan `self.idToApprovals[_tokenId]`. Jika tidak ada pemberi persetujuan, nilai tersebut adalah nol.

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    # @dev Memeriksa apakah `_operator` adalah operator yang disetujui untuk `_owner`.
    @param _owner Alamat yang memiliki NFT.
    @param _operator Alamat yang bertindak atas nama pemilik.
    """
    @dev Checks if `_operator` is an approved operator for `_owner`.
    @param _owner The address that owns the NFTs.
    @param _operator The address that acts on behalf of the owner.
    """
    return (self.ownerToOperators[_owner])[_operator]
```

Fungsi ini memeriksa apakah `_operator` diizinkan untuk mengelola semua token `_owner` dalam kontrak ini. Karena bisa ada beberapa operator, ini adalah HashMap dua tingkat.

#### Fungsi Pembantu Transfer {#transfer-helpers}

Fungsi-fungsi ini mengimplementasikan operasi yang merupakan bagian dari mentransfer atau mengelola token.

```python

### TRANSFER FUNCTION HELPERS ### # ## PEMBANTU FUNGSI TRANSFER ###

@view
@internal
```

Dekorasi ini, `@internal`, berarti bahwa fungsi tersebut hanya dapat diakses dari fungsi lain dalam kontrak yang sama. Berdasarkan konvensi, nama fungsi ini juga dimulai dengan garis bawah (`_`).

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    # @dev Mengembalikan apakah pembelanja yang diberikan dapat mentransfer ID token yang diberikan
    @param spender alamat pembelanja untuk ditanyakan
    @param tokenId uint256 ID token yang akan ditransfer
    @return bool apakah msg.sender disetujui untuk ID token yang diberikan,
        adalah operator dari pemilik, atau adalah pemilik token
    """
    @dev Returns whether the given spender can transfer a given token ID
    @param spender address of the spender to query
    @param tokenId uint256 ID of the token to be transferred
    @return bool whether the msg.sender is approved for the given token ID,
        is an operator of the owner, or is the owner of the token
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

Fungsi di atas bisa menjadi view karena tidak mengubah status. Untuk mengurangi biaya operasi, fungsi apa pun yang _bisa_ menjadi view _seharusnya_ menjadi view.

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    # @dev Tambahkan NFT ke alamat yang diberikan
         Melempar kesalahan jika `_tokenId` dimiliki oleh seseorang.
    """
    @dev Add a NFT to a given address
         Throws if `_tokenId` is owned by someone.
    """
    # Throws if `_tokenId` is owned by someone # Melempar kesalahan jika `_tokenId` dimiliki oleh seseorang
    assert self.idToOwner[_tokenId] == ZERO_ADDRESS
    # Change the owner # Ubah pemilik
    self.idToOwner[_tokenId] = _to
    # Change count tracking # Ubah pelacakan jumlah
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    # @dev Hapus NFT dari alamat yang diberikan
         Melempar kesalahan jika `_from` bukan pemilik saat ini.
    """
    @dev Remove a NFT from a given address
         Throws if `_from` is not the current owner.
    """
    # Throws if `_from` is not the current owner # Melempar kesalahan jika `_from` bukan pemilik saat ini
    assert self.idToOwner[_tokenId] == _from
    # Change the owner # Ubah pemilik
    self.idToOwner[_tokenId] = ZERO_ADDRESS
    # Change count tracking # Ubah pelacakan jumlah
    self.ownerToNFTokenCount[_from] -= 1
```

Ketika ada masalah dengan transfer, kita membatalkan (revert) panggilan tersebut.

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    # @dev Hapus persetujuan dari alamat yang diberikan
         Melempar kesalahan jika `_owner` bukan pemilik saat ini.
    """
    @dev Clear an approval of a given address
         Throws if `_owner` is not the current owner.
    """
    # Throws if `_owner` is not the current owner # Melempar kesalahan jika `_owner` bukan pemilik saat ini
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != ZERO_ADDRESS:
        # Reset approvals # Atur ulang persetujuan
        self.idToApprovals[_tokenId] = ZERO_ADDRESS
```

Hanya ubah nilai jika perlu. Variabel status berada di penyimpanan. Menulis ke penyimpanan adalah salah satu operasi paling mahal yang dilakukan EVM (Mesin Virtual Ethereum) (dalam hal [gas](/developers/docs/gas/)). Oleh karena itu, ada baiknya untuk meminimalkannya, bahkan menulis nilai yang ada pun memiliki biaya yang tinggi.

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    # @dev Eksekusi transfer NFT.
         Melempar kesalahan kecuali `msg.sender` adalah pemilik saat ini, operator yang berwenang, atau alamat
         yang disetujui untuk NFT ini. (CATATAN: `msg.sender` tidak diizinkan dalam fungsi privat jadi teruskan `_sender`.)
         Melempar kesalahan jika `_to` adalah alamat nol.
         Melempar kesalahan jika `_from` bukan pemilik saat ini.
         Melempar kesalahan jika `_tokenId` bukan NFT yang valid.
    """
    @dev Execute transfer of a NFT.
         Throws unless `msg.sender` is the current owner, an authorized operator, or the approved
         address for this NFT. (NOTE: `msg.sender` not allowed in private function so pass `_sender`.)
         Throws if `_to` is the zero address.
         Throws if `_from` is not the current owner.
         Throws if `_tokenId` is not a valid NFT.
    """
```

Kita memiliki fungsi internal ini karena ada dua cara untuk mentransfer token (biasa dan aman), tetapi kita hanya menginginkan satu lokasi dalam kode di mana kita melakukannya untuk mempermudah audit.

```python
    # Check requirements # Periksa persyaratan
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # Throws if `_to` is the zero address # Melempar kesalahan jika `_to` adalah alamat nol
    assert _to != ZERO_ADDRESS
    # Clear approval. Throws if `_from` is not the current owner # Hapus persetujuan. Melempar kesalahan jika `_from` bukan pemilik saat ini
    self._clearApproval(_from, _tokenId)
    # Remove NFT. Throws if `_tokenId` is not a valid NFT # Hapus NFT. Melempar kesalahan jika `_tokenId` bukan NFT yang valid
    self._removeTokenFrom(_from, _tokenId)
    # Add NFT # Tambahkan NFT
    self._addTokenTo(_to, _tokenId)
    # Log the transfer # Catat transfer
    log Transfer(_from, _to, _tokenId)
```

Untuk memancarkan event di Vyper, Anda menggunakan pernyataan `log` ([lihat di sini untuk detail lebih lanjut](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)).

#### Fungsi Transfer {#transfer-funs}

```python

### TRANSFER FUNCTIONS ### # ## FUNGSI TRANSFER ###

@external
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    # @dev Melempar kesalahan kecuali `msg.sender` adalah pemilik saat ini, operator yang berwenang, atau alamat
         yang disetujui untuk NFT ini.
         Melempar kesalahan jika `_from` bukan pemilik saat ini.
         Melempar kesalahan jika `_to` adalah alamat nol.
         Melempar kesalahan jika `_tokenId` bukan NFT yang valid.
    @notice Pemanggil bertanggung jawab untuk mengonfirmasi bahwa `_to` mampu menerima NFT atau jika tidak
            mereka mungkin hilang secara permanen.
    @param _from Pemilik NFT saat ini.
    @param _to Pemilik baru.
    @param _tokenId NFT yang akan ditransfer.
    """
    @dev Throws unless `msg.sender` is the current owner, an authorized operator, or the approved
         address for this NFT.
         Throws if `_from` is not the current owner.
         Throws if `_to` is the zero address.
         Throws if `_tokenId` is not a valid NFT.
    @notice The caller is responsible to confirm that `_to` is capable of receiving NFTs or else
            they maybe be permanently lost.
    @param _from The current owner of the NFT.
    @param _to The new owner.
    @param _tokenId The NFT to transfer.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Fungsi ini memungkinkan Anda mentransfer ke alamat sembarang. Kecuali alamat tersebut adalah pengguna, atau kontrak yang tahu cara mentransfer token, token apa pun yang Anda transfer akan tersangkut di alamat tersebut dan tidak berguna.

```python
@external
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    # @dev Mentransfer kepemilikan NFT dari satu alamat ke alamat lain.
         Melempar kesalahan kecuali `msg.sender` adalah pemilik saat ini, operator yang berwenang, atau
         alamat yang disetujui untuk NFT ini.
         Melempar kesalahan jika `_from` bukan pemilik saat ini.
         Melempar kesalahan jika `_to` adalah alamat nol.
         Melempar kesalahan jika `_tokenId` bukan NFT yang valid.
         Jika `_to` adalah smart contract, ia memanggil `onERC721Received` pada `_to` dan melempar kesalahan jika
         nilai kembaliannya bukan `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
         CATATAN: bytes4 diwakili oleh bytes32 dengan padding
    @param _from Pemilik NFT saat ini.
    @param _to Pemilik baru.
    @param _tokenId NFT yang akan ditransfer.
    @param _data Data tambahan tanpa format yang ditentukan, dikirim dalam panggilan ke `_to`.
    """
    @dev Transfers the ownership of an NFT from one address to another address.
         Throws unless `msg.sender` is the current owner, an authorized operator, or the
         approved address for this NFT.
         Throws if `_from` is not the current owner.
         Throws if `_to` is the zero address.
         Throws if `_tokenId` is not a valid NFT.
         If `_to` is a smart contract, it calls `onERC721Received` on `_to` and throws if
         the return value is not `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
         NOTE: bytes4 is represented by bytes32 with padding
    @param _from The current owner of the NFT.
    @param _to The new owner.
    @param _tokenId The NFT to transfer.
    @param _data Additional data with no specified format, sent in call to `_to`.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Tidak masalah untuk melakukan transfer terlebih dahulu karena jika ada masalah kita akan membatalkannya (revert), sehingga semua yang dilakukan dalam panggilan akan dibatalkan.

```python
    if _to.is_contract: # check if `_to` is a contract address # periksa apakah `_to` adalah alamat kontrak
```

Pertama periksa untuk melihat apakah alamat tersebut adalah sebuah kontrak (jika memiliki kode). Jika tidak, asumsikan itu adalah alamat pengguna dan pengguna akan dapat menggunakan token atau mentransfernya. Namun jangan biarkan hal itu membuat Anda merasa aman yang semu. Anda bisa kehilangan token, bahkan dengan `safeTransferFrom`, jika Anda mentransfernya ke alamat yang tidak ada seorang pun yang mengetahui kunci pribadinya.

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

Panggil kontrak target untuk melihat apakah ia dapat menerima token ERC-721.

```python
        # Throws if transfer destination is a contract which does not implement 'onERC721Received' # Melempar kesalahan jika tujuan transfer adalah kontrak yang tidak mengimplementasikan 'onERC721Received'
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

Jika tujuannya adalah sebuah kontrak, tetapi kontrak yang tidak menerima token ERC-721 (atau yang memutuskan untuk tidak menerima transfer khusus ini), batalkan (revert).

```python
@external
def approve(_approved: address, _tokenId: uint256):
    # @dev Tetapkan atau tegaskan kembali alamat yang disetujui untuk NFT. Alamat nol menunjukkan tidak ada alamat yang disetujui.
         Melempar kesalahan kecuali `msg.sender` adalah pemilik NFT saat ini, atau operator yang berwenang dari pemilik saat ini.
         Melempar kesalahan jika `_tokenId` bukan NFT yang valid. (CATATAN: Ini tidak ditulis di EIP)
         Melempar kesalahan jika `_approved` adalah pemilik saat ini. (CATATAN: Ini tidak ditulis di EIP)
    @param _approved Alamat yang akan disetujui untuk ID NFT yang diberikan.
    @param _tokenId ID token yang akan disetujui.
    """
    @dev Set or reaffirm the approved address for an NFT. The zero address indicates there is no approved address.
         Throws unless `msg.sender` is the current NFT owner, or an authorized operator of the current owner.
         Throws if `_tokenId` is not a valid NFT. (NOTE: This is not written the EIP)
         Throws if `_approved` is the current owner. (NOTE: This is not written the EIP)
    @param _approved Address to be approved for the given NFT ID.
    @param _tokenId ID of the token to be approved.
    """
    owner: address = self.idToOwner[_tokenId]
    # Throws if `_tokenId` is not a valid NFT # Melempar kesalahan jika `_tokenId` bukan NFT yang valid
    assert owner != ZERO_ADDRESS
    # Throws if `_approved` is the current owner # Melempar kesalahan jika `_approved` adalah pemilik saat ini
    assert _approved != owner
```

Berdasarkan konvensi, jika Anda tidak ingin memiliki pemberi persetujuan, Anda menunjuk alamat nol, bukan diri Anda sendiri.

```python
    # Check requirements # Periksa persyaratan
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

Untuk menetapkan persetujuan, Anda bisa menjadi pemilik, atau operator yang diberi wewenang oleh pemilik.

```python
    # Set the approval # Tetapkan persetujuan
    self.idToApprovals[_tokenId] = _approved
    log Approval(owner, _approved, _tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    # @dev Mengaktifkan atau menonaktifkan persetujuan untuk pihak ketiga ("operator") untuk mengelola semua
         aset `msg.sender`. Ini juga memancarkan event ApprovalForAll.
         Melempar kesalahan jika `_operator` adalah `msg.sender`. (CATATAN: Ini tidak ditulis di EIP)
    @notice Ini berfungsi bahkan jika pengirim tidak memiliki token apa pun pada saat itu.
    @param _operator Alamat untuk ditambahkan ke kumpulan operator yang berwenang.
    @param _approved True jika operator disetujui, false untuk mencabut persetujuan.
    """
    @dev Enables or disables approval for a third party ("operator") to manage all of
         `msg.sender`'s assets. It also emits the ApprovalForAll event.
         Throws if `_operator` is the `msg.sender`. (NOTE: This is not written the EIP)
    @notice This works even if sender doesn't own any tokens at the time.
    @param _operator Address to add to the set of authorized operators.
    @param _approved True if the operators is approved, false to revoke approval.
    """
    # Throws if `_operator` is the `msg.sender` # Melempar kesalahan jika `_operator` adalah `msg.sender`
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)
```

#### Mint Token Baru dan Hancurkan yang Sudah Ada {#mint-burn}

Akun yang membuat kontrak adalah `minter`, pengguna super yang berwenang untuk melakukan mint NFT baru. Namun, bahkan ia tidak diizinkan untuk membakar (burn) token yang sudah ada. Hanya pemilik, atau entitas yang diberi wewenang oleh pemilik, yang dapat melakukannya.

```python
### MINT & BURN FUNCTIONS ### # ## FUNGSI MINT & BURN ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

Fungsi ini selalu mengembalikan `True`, karena jika operasi gagal, ia akan dibatalkan (reverted).

```python
    # @dev Fungsi untuk melakukan mint token
         Melempar kesalahan jika `msg.sender` bukan minter.
         Melempar kesalahan jika `_to` adalah alamat nol.
         Melempar kesalahan jika `_tokenId` dimiliki oleh seseorang.
    @param _to Alamat yang akan menerima token yang di-mint.
    @param _tokenId Id token untuk di-mint.
    @return Boolean yang menunjukkan apakah operasi berhasil.
    """
    @dev Function to mint tokens
         Throws if `msg.sender` is not the minter.
         Throws if `_to` is zero address.
         Throws if `_tokenId` is owned by someone.
    @param _to The address that will receive the minted tokens.
    @param _tokenId The token id to mint.
    @return A boolean that indicates if the operation was successful.
    """
    # Throws if `msg.sender` is not the minter # Melempar kesalahan jika `msg.sender` bukan minter
    assert msg.sender == self.minter
```

Hanya minter (akun yang membuat kontrak ERC-721) yang dapat melakukan mint token baru. Ini bisa menjadi masalah di masa depan jika kita ingin mengubah identitas minter. Dalam kontrak produksi, Anda mungkin menginginkan fungsi yang memungkinkan minter untuk mentransfer hak istimewa minter kepada orang lain.

```python
    # Throws if `_to` is zero address # Melempar kesalahan jika `_to` adalah alamat nol
    assert _to != ZERO_ADDRESS
    # Add NFT. Throws if `_tokenId` is owned by someone # Tambahkan NFT. Melempar kesalahan jika `_tokenId` dimiliki oleh seseorang
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

Berdasarkan konvensi, proses mint token baru dihitung sebagai transfer dari alamat nol.

```python

@external
def burn(_tokenId: uint256):
    # @dev Membakar token ERC721 tertentu.
         Melempar kesalahan kecuali `msg.sender` adalah pemilik saat ini, operator yang berwenang, atau alamat
         yang disetujui untuk NFT ini.
         Melempar kesalahan jika `_tokenId` bukan NFT yang valid.
    @param _tokenId uint256 id dari token ERC721 yang akan dibakar.
    """
    @dev Burns a specific ERC721 token.
         Throws unless `msg.sender` is the current owner, an authorized operator, or the approved
         address for this NFT.
         Throws if `_tokenId` is not a valid NFT.
    @param _tokenId uint256 id of the ERC721 token to be burned.
    """
    # Check requirements # Periksa persyaratan
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # Throws if `_tokenId` is not a valid NFT # Melempar kesalahan jika `_tokenId` bukan NFT yang valid
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)
```

Siapa pun yang diizinkan untuk mentransfer token diizinkan untuk membakarnya (burn). Meskipun pembakaran tampak setara dengan transfer ke alamat nol, alamat nol sebenarnya tidak menerima token tersebut. Ini memungkinkan kita untuk membebaskan semua penyimpanan yang digunakan untuk token, yang dapat mengurangi biaya gas dari transaksi.

## Menggunakan Kontrak Ini {#using-contract}

Berbeda dengan Solidity, Vyper tidak memiliki pewarisan (inheritance). Ini adalah pilihan desain yang disengaja untuk membuat kode lebih jelas dan karenanya lebih mudah diamankan. Jadi untuk membuat kontrak ERC-721 Vyper Anda sendiri, Anda mengambil [kontrak ini](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy) dan memodifikasinya untuk mengimplementasikan logika bisnis yang Anda inginkan.

## Kesimpulan {#conclusion}

Sebagai ulasan, berikut adalah beberapa ide terpenting dalam kontrak ini:

- Untuk menerima token ERC-721 dengan transfer yang aman, kontrak harus mengimplementasikan antarmuka `ERC721Receiver`.
- Bahkan jika Anda menggunakan transfer yang aman, token masih bisa tersangkut jika Anda mengirimkannya ke alamat yang kunci pribadinya tidak diketahui.
- Ketika ada masalah dengan suatu operasi, ada baiknya untuk membatalkan (`revert`) panggilan tersebut, daripada hanya mengembalikan nilai kegagalan.
- Token ERC-721 ada ketika mereka memiliki pemilik.
- Ada tiga cara untuk diberi wewenang mentransfer NFT. Anda bisa menjadi pemilik, disetujui untuk token tertentu, atau menjadi operator untuk semua token pemilik.
- Event masa lalu hanya terlihat di luar blockchain. Kode yang berjalan di dalam blockchain tidak dapat melihatnya.

Sekarang pergilah dan implementasikan kontrak Vyper yang aman.

[Lihat di sini untuk karya saya yang lain](https://cryptodocguy.pro/).