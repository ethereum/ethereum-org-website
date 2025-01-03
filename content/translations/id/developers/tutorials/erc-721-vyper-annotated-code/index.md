---
title: "Panduan Lengkap Kontrak ERC-721 Vyper"
description: Kontrak ERC-721 Ryuya Nakamura dan cara kerjanya
author: Ori Pomerantz
lang: id
tags:
  - "vyper"
  - "erc-721"
  - "python"
skill: beginner
published: 2021-04-01
---

## Pendahuluan {#introduction}

Standar [ERC-721](/developers/docs/standards/tokens/erc-721/) digunakan untuk memegang kepemilikan Token yang Tak Dapat Dipertukarkan (NFT). Token [ERC-20](/developers/docs/standards/tokens/erc-20/) berperilaku sebagai komoditas, karena tidak ada perbedaan antara token individu. Sebaliknya, token ERC-721 dirancang untuk aset yang serupa tetapi tidak sama, seperti [kartun kucing](https://www.cryptokitties.co/) atau judul untuk bagian dari real estate yang berbeda.

Dalam artikel ini kita akan menganalisa [kontrak ERC-721 Ryuya Nakamura](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy). Kontrak ini ditulis dalam [Vyper](https://vyper.readthedocs.io/en/latest/index.html), bahasa kontrak seperti Python yang dirancang untuk lebih menyulitkan penulisan kode yang tidak aman ketimbang yang ada di Solidity.

## Kontrak {#contract}

```python
# @dev Implementation of ERC-721 non-fungible token standard.
# @author Ryuya Nakamura (@nrryuya)
# Modified from: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Komentar pada Vyper, seperti juga pada Python, diawali dengan tanda pagar (`#`) dan dilanjutkan hingga akhir baris. Komentar yang menggunakan `@<keyword>` digunakan oleh [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) untuk memproduksi dokumentasi yang dapat dibaca oleh manusia.

```python
from vyper.interfaces import ERC721

implements: ERC721
```

Antarmuka ERC-721 dibangun dalam bahasa Vyper. [Anda dapat melihat definisi kode tersebut di sini](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py). Definisi antarmuka ditulis dalam Python, alih-alih Vyper, karena antarmuka tidak hanya digunakan dalam blockchain, tetapi juga saat mengirimkan transaksi ke blockchain dari klien eksternal, yang mungkin saja ditulis dalam Python.

Baris pertama mengimpor antarmuka, dan baris kedua menunjukkan bahwa kita mengimplementasikannya di sini.

### Antarmuka ERC721Receiver {#receiver-interface}

```python
# Interface for the contract called by safeTransferFrom()
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721 mendukung dua jenis transfer:

- `transferFrom`, yang memungkinkan pengirim menentukan alamat tujuan dan meletakkan tanggung jawab pentransferan pada pengirimnya. Ini berarti Anda dapat mentransfer ke alamat tidak valid, yang berarti pula NFT akan hilang jika dikirim ke alamat tersebut.
- `safeTransferFrom`, yang memeriksa apakah alamat tujuannya merupakan sebuah kontrak atau bukan. Jika memang demikian, maka kontrak ERC-721 akan menanyakan kontrak penerima apakah ia ingin menerima NFT atau tidak.

Untuk menjawab permintaan `safeTransferFrom` kontrak penerima harus mengimplementasikan `ERC721Receiver`.

```python
            _operator: address,
            _from: address,
```

Alamat `_from` adalah pemiliki token saat ini. Alamat `_operator` adalah yang meminta transfer (keduanya mungkin tidak sama, karena perbedaan uang tunjangan).

```python
            _tokenId: uint256,
```

ID token ERC-721 adalah 256 bit. Biasanya ID token itu diciptakan dengan melakukan hash terhadap deskripsi mengenai apapun yang direpresentasikan token tersebut.

```python
            _data: Bytes[1024]
```

Permintaan dapat memiliki hingga 1024 bita data pengguna.

```python
        ) -> bytes32: view
```

Untuk menghindari kejadian di mana kontrak secara tidak sengaja menerima transfer, nilai pengembaliannya bukan merupakan boolean, melainkan 256 bit dengan nilai spesifik.

Fungsi ini merupakan sebuah `view`, yang berarti dapat membaca status blockchain tersebut, tetapi tidak dapat memodifikasinya.

### Aksi {#events}

[Aksi](https://media.consensys.net/technical-introduction-to-events-and-logs-in-ethereum-a074d65dd61e) dipancarkan untuk memberitahu aksi kepada pengguna dan server yang ada di luar blockchain. Perhatikan bahwa konten aksi tidak tersedia untuk kontrak di blockchain.

```python
# @dev Emits when ownership of any NFT changes by any mechanism. This event emits when NFTs are
#      created (`from` == 0) and destroyed (`to` == 0). Exception: during contract creation, any
#      number of NFTs may be created and assigned without emitting Transfer. At the time of any
#      transfer, the approved address for that NFT (if any) is reset to none.
# @param _from Sender of NFT (if address is zero address it indicates token creation).
# @param _to Receiver of NFT (if address is zero address it indicates token destruction).
# @param _tokenId The NFT that got transfered.
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

Ini sama dengan aksi Transfer ERC-20, kecuali bahwa kita melaporkan `tokenId` ketimbang suatu jumlah. Tidak ada seorangpun yang memiliki alamat nol, sehingga secara konvensi, kita menggunakannya untuk melaporkan pembuatan dan penghancuran token.

```python
# @dev This emits when the approved address for an NFT is changed or reaffirmed. The zero
#      address indicates there is no approved address. When a Transfer event emits, this also
#      indicates that the approved address for that NFT (if any) is reset to none.
# @param _owner Owner of NFT.
# @param _approved Address that we are approving.
# @param _tokenId NFT which we are approving.
event Approval:
    owner: indexed(address)
    approved: indexed(address)
    tokenId: indexed(uint256)
```

Persetujuan ERC-721 sama dengan uang tunjangan ERC-20. Suatu alamat tertentu diizinkan untuk mentransfer token tertentu. Ini memberikan mekanisme bagi kontrak untuk merespons saat mereka menerima token. Kontrak tidak dapat mendengarkan kejadian, sehingga jika Anda hanya mentransfer token ke mereka, mereka tidak "tahu" tentang itu. Dalam cara ini, pemilik pertama mengirim persetujuan dan kemudian mengirim permintaan ke kontrak: "Saya menyetujui Anda mentransfer token X, silahkan lakukan ...".

Ini adalah pilihan rancangan untuk membuat standar ERC-721 serupa dengan standar ERC-20. Karena token ERC-721 tidak dapat dipertukarkan, suatu kontrak juga dapat mengenali bahwa ia mendapatkan token tertentu dengan melihat kepemilikan token.

```python
# @dev This emits when an operator is enabled or disabled for an owner. The operator can manage
#      all NFTs of the owner.
# @param _owner Owner of NFT.
# @param _operator Address to which we are setting operator rights.
# @param _approved Status of operator rights(true if operator rights are given and false if
# revoked).
event ApprovalForAll:
    owner: indexed(address)
    operator: indexed(address)
    approved: bool
```

Terkadang ada gunanya memiliki _operator_ yang dapat mengelola semua token akun dari jenis tertentu (yang dikelola oleh kontrak tertentu), sama seperti surat kuasa. Contohnya, saya mungkin ingin memberi kuasa tersebut ke kontrak yang memeriksa apakah saya belum menghubunginya selama enam bulan, dan jika demikian bagikan aset saya kepada pewaris saya (jika salah satu dari mereka memintanya, kontrak tidak dapat melakukan apa pun tanpa dipanggil oleh transaksi). Dalam ERC-20, kita hanya dapat memberi uang tunjangan besar ke kontrak warisan, tetapi itu tidak bekerja di ERC-721 karena token tidak dapat dipertukarkan. Ini bersifat setara.

Nilai `approved` memberi tahu kita apakah aksi merupakan persetujuan, atau penarikan dari persetujuan.

### Variabel State {#state-vars}

Variabel ini berisi state token saat ini: yang mana yang tersedia dan siapa yang memilikinya. Kebanyakan dari ini merupakan objek `HashMap`, [pemetaan satu arah yang ada di antara dua jenis](https://vyper.readthedocs.io/en/latest/types.html#mappings).

```python
# @dev Mapping from NFT ID to the address that owns it.
idToOwner: HashMap[uint256, address]

# @dev Mapping from NFT ID to approved address.
idToApprovals: HashMap[uint256, address]
```

Indentitas pengguna dan kontrak di Ethereum diwakili oleh alamat 160 bit. Kedua variable tersebut dipetakan dari ID token pemilik mereka dan siapa pun yang setuju untuk mentransfernya (dengan jumlah maksimum satu untuk setiap pemilik). Dalam Ethereum, data yang tidak terinisialisasi selalu bernilai nol, jadi jika tidak ada pemilik atau pentransfer yang menyetujui, nilai token tersebut menjadi nol.

```python
# @dev Mapping from owner address to count of his tokens.
ownerToNFTokenCount: HashMap[address, uint256]
```

Variabel ini menampung hitungan token untuk setiap pemilik. Tidak ada pemetaan dari pemilik ke token, sehingga satu-satunya cara untuk mengidentifikasi token yang dimiliki pemilik tertentu adalah dengan melihat kembali di riwayat aksi blockchain-nya dan melihat aksi `Transfer` yang sesuai. Kita dapat menggunakan variabel ini untuk mengetahui kapan kita mendapat semua NFT tersebut dan tidak perlu memeriksanya beberapa kali sepanjang waktu.

Ingatlah bahwa algoritma ini hanya bekerja untuk antarmuka pengguna dan server eksternal. Kode yang beroperasi pada blockchain itu sendiri tidak dapat membaca aksi lampau.

```python
# @dev Mapping from owner address to mapping of operator addresses.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

Sebuah akun mungkin saja dapat memiliki lebih dari satu operator. Sebuah `HashMap` sederhana tidak cukup untuk terus melacaknya, karena setiap kunci mengarah ke sebuah nilai tunggal. Alih-alih, Anda dapat menggunakan `HashMap[address, bool]` sebagai nilai. Secara bawaan, nilai untuk setiap alamat adalah `False`, yang berarti ini bukanlah sebuah operator. Anda dapat menetapkan nilai ke `True` sesuai keperluan.

```python
# @dev Address of minter, who can mint a token
minter: address
```

Token baru telah dibuat. Dalam kontrak ini ada entitas tunggal yang diizinkan untuk melakukannya, `minter`. Sebagai contoh, ini mungkin cukup untuk sebuah permainan. Untuk keperluan lainnya, membuat logika bisnis yang lebih rumit mungkin diperlukan.

```python
# @dev Mapping of interface id to bool about whether or not it's supported
supportedInterfaces: HashMap[bytes32, bool]

# @dev ERC165 interface ID of ERC165
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ERC165 interface ID of ERC721
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) menentukan mekanisme pada kontrak untuk mengungkapkan cara agar aplikasi dapat berkomunikasi dengannya, ke ERC mana yang akan ia sesuaikan. Dalam kasus ini, kontrak menyesuaikan dengan ERC-165 dan ERC-721.

### Fungsi {#functions}

Ini adalah fungsi-fungsi yang benar-benar mengimplementasikan ERC-721.

#### Konstruktor {#constructor}

```python
@external
def __init__():
```

Pada Vyper, seperti di Python, fungsi konstruktor disebut `__init__`.

```python
    """
    @dev Contract constructor.
    """
```

Di Python, dan di Vyper, Anda juga dapat membuat komentar dengan menentukan string multibaris (yang dimulai dan diakhiri dengan `"""`), dan tidak menggunakannya sama sekali. Komentar ini juga dapat mencakup [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html).

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

Untuk mengakses variable status, Anda menggunakan `self.<variable name>` (sekali lagi, sama seperti di Python).

#### Lihat Fungsi {#views}

Berikut adalah fungsi-fungsi yang tidak mengubah state blockchain, dan karenanya dapat dieksekusikan secara bebas jika dipanggil secara eksternal. Jika fungsi tampilan dipanggil oleh sebuah kontrak, fungsi tersebut masih harus dieksekusi di setiap node dan karena itu terkena biaya gas.

```python
@view
@external
```

Kata kunci berikut yang berhubungan dengan definisi fungsi yang dimulai dengan tanda at (`@`) disebut _dekorasi_. Tanda ini menentukan keadaan dimana sebuah fungsi dapat dipanggil.

- `@view` menunjukkan bahwa fungsi ini merupakan sebuah tampilan.
- `@external` menunjukkan bahwa fungsi tersebut dapat dipanggil oleh transaksi dan oleh kontrak lainnya.

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

Berkebalikan dengan Python, Vyper adalah [bahasa berjenis statis](https://wikipedia.org/wiki/Type_system#Static_type_checking). Anda tidak dapat mendeklarasikan sebuah variabel, atau sebuah fungsi parameter, tanpa mengidentifikasi [tipe datanya](https://vyper.readthedocs.io/en/latest/types.html). Dalam kasus ini parameter inputnya adalah `bytes32`, sebuah nilai 256-bit (256 bit adalah ukuran kata asal dari [Mesin Virtual Ethereum](/developers/docs/evm/)). Keluarannya berupa nilai boolean. Secara konvensi, nama parameter fungsinya dimulai dengan garis bawah (`_`).

```python
    """
    @dev Interface identification is specified in ERC-165.
    @param _interfaceID Id of the interface
    """
    return self.supportedInterfaces[_interfaceID]
```

Kembalikan nilai dari HashMap `self.supportedInterfaces`, yang ditetapkan dalam konstruktor (`__init__`).

```python
### VIEW FUNCTIONS ###
```

Berikut adalah fungsi-fungsi tampilan yang membuat informasi mengenai token tersedia untuk pengguna dan kontrak-kontrak lainnya.

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev Returns the number of NFTs owned by `_owner`.
         Throws if `_owner` is the zero address. NFTs assigned to the zero address are considered invalid.
    @param _owner Address for whom to query the balance.
    """
    assert _owner != ZERO_ADDRESS
```

Baris ini [menegaskan](https://vyper.readthedocs.io/en/latest/statements.html#assert) bahwa `_owner` bukan nol. Jika benar demikian, maka ada kesalahan dan operasi akan dibalikkan.

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev Returns the address of the owner of the NFT.
         Throws if `_tokenId` is not a valid NFT.
    @param _tokenId The identifier for an NFT.
    """
    owner: address = self.idToOwner[_tokenId]
    # Throws if `_tokenId` is not a valid NFT
    assert owner != ZERO_ADDRESS
    return owner
```

Dalam Mesin Virtual Ethereum (evm), penyimpanan mana pun yang tidak memiliki nilai yang tersimpan di dalamnya adalah nol. Jika tidak ada token pada `_tokenId` maka nilai dari `self.idToOwner[_tokenId]` adalah nol. Dalam kasus tersebut fungsinya melakukan pembalikan.

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev Get the approved address for a single NFT.
         Throws if `_tokenId` is not a valid NFT.
    @param _tokenId ID of the NFT to query the approval of.
    """
    # Throws if `_tokenId` is not a valid NFT
    assert self.idToOwner[_tokenId] != ZERO_ADDRESS
    return self.idToApprovals[_tokenId]
```

Ingatlah bahwa `getApproved` _dapat_ mengembalikan nol. Jika tokennya valid, maka akan mengembalikan `self.idToApprovals[_tokenId]`. Jika tidak ada pemberi persetujuan maka nilainya adalah nol.

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev Checks if `_operator` is an approved operator for `_owner`.
    @param _owner The address that owns the NFTs.
    @param _operator The address that acts on behalf of the owner.
    """
    return (self.ownerToOperators[_owner])[_operator]
```

Fungsi ini memeriksa jika `_operator` diizinkan mengelola semua token milik `_owner` dalam kontrak ini. Dikarenakan dapat terjadi multioperator, ini merupakan HashMap dua tingkat.

#### Fungsi Transfer Pembantu {#transfer-helpers}

Fungsi-fungsi berikut mengimplementasikan operasi yang merupakan bagian pentransferan atau pengelolaan token.

```python

### TRANSFER FUNCTION HELPERS ###

@view
@internal
```

Dekorasi ini, `@internal`, berarti bahwa fungsi hanya dapat diakses dari fungsi lainnya dalam kontrak yang sama. Secara konvensi, nama fungsi ini juga dimulai dengan garis bawah (`_`).

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
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

Ada tiga cara di mana suatu alamat dapat dizinkan untuk mentransfer token:

1. Alamatnya adalah pemilik token
2. Alamat disetujui untuk menggunakan token tersebut
3. Alamat adalah operator untuk pemilik token

Fungsi di atas dapat merupakan suatu tampilan karena ia tidak mengubah state. Untuk mengurangi biaya pengoperasian, fungsi mana pun yang _dapat_ berfungsi sebagai tampilan _seharusnya_ menjadi tampilan.

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev Add a NFT to a given address
         Throws if `_tokenId` is owned by someone.
    """
    # Throws if `_tokenId` is owned by someone
    assert self.idToOwner[_tokenId] == ZERO_ADDRESS
    # Change the owner
    self.idToOwner[_tokenId] = _to
    # Change count tracking
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev Remove a NFT from a given address
         Throws if `_from` is not the current owner.
    """
    # Throws if `_from` is not the current owner
    assert self.idToOwner[_tokenId] == _from
    # Change the owner
    self.idToOwner[_tokenId] = ZERO_ADDRESS
    # Change count tracking
    self.ownerToNFTokenCount[_from] -= 1
```

Saat ada masalah dengan transfer, kita membalikkan pemanggilan.

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev Clear an approval of a given address
         Throws if `_owner` is not the current owner.
    """
    # Throws if `_owner` is not the current owner
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != ZERO_ADDRESS:
        # Reset approvals
        self.idToApprovals[_tokenId] = ZERO_ADDRESS
```

Hanya ubah nilainya jika diperlukan. Variabel state tinggal di penyimpanan. Menulis penyimpanan adalah salah satu operasi yang paling mahal yang dilakukan EVM (Mesin Virtual Ethereum) (jika dilhat dari penggunaan [gas](/developers/docs/gas/)). Oleh karena itu, adalah ide bagus untuk meminimalkannya, bahkan menulis nilai yang sudah ada memakan biaya yang besar.

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev Exeute transfer of a NFT.
         Throws unless `msg.sender` is the current owner, an authorized operator, or the approved
         address for this NFT. (NOTE: `msg.sender` not allowed in private function so pass `_sender`.)
         Throws if `_to` is the zero address.
         Throws if `_from` is not the current owner.
         Throws if `_tokenId` is not a valid NFT.
    """
```

Kita memiliki fungsi internal ini karena ada dua cara untuk mentransfer token (reguler dan aman), tetapi kita hanya ingin melakukannya di satu lokasi dalam kode di mana kita melakukannya untuk membuat proses audit menjadi lebih mudah.

```python
    # Check requirements
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # Throws if `_to` is the zero address
    assert _to != ZERO_ADDRESS
    # Clear approval. Throws if `_from` is not the current owner
    self._clearApproval(_from, _tokenId)
    # Remove NFT. Throws if `_tokenId` is not a valid NFT
    self._removeTokenFrom(_from, _tokenId)
    # Add NFT
    self._addTokenTo(_to, _tokenId)
    # Log the transfer
    log Transfer(_from, _to, _tokenId)
```

Untuk memancarkan aksi dalam Vyper, Anda menggunakan pernyataan `log` ([lihat di sini untuk selengkapnya](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)).

#### Fungsi Transfer {#transfer-funs}

```python

### TRANSFER FUNCTIONS ###

@external
def transferFrom(_from: address, _to: address, _tokenId: uint256):
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

Fungsi ini memungkinkan Anda mentransfer ke alamat arbitrari. Kecuali alamatnya adalah seorang pengguna, atau kontrak yang mengetahui cara mentransfer token, token mana pun yang Anda transfer akan terjebak dalam alamat tersebut dan menjadi tidak berguna.

```python
@external
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
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

Tidak apa-apa melakukan transfer terlebih dahulu karena lagipula jika ada masalah, kita akan membalikkannya, sehingga semua hal yang dilakukan dalam pemanggilan akan dibatalkan.

```python
    if _to.is_contract: # check if `_to` is a contract address
```

Pertama-tama, periksa untuk melihat apakah alamatnya adalah suatu kontrak (jika ia memiliki kode). Jika tidak, anggaplah itu adalah alamat pengguna dan penggunanya akan dapat menggunakan token atau mentransfernya. Tetapi, jangan biarkan itu membuat Anda menjadi lengah karena rasa aman yang palsu. Anda dapat kehilangan token, bahkan dengan `safeTransferFrom`, jika Anda mentransfer mereka ke suatu alamat yang kunci privatnya tidak diketahui siapa pun.

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

Panggil kontrak target untuk melihat apakah ia dapat menerima token ERC-721.

```python
        # Throws if transfer destination is a contract which does not implement 'onERC721Received'
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

Jika tujuannya adalah suatu kontrak, tetapi itu tidak menerima token ERC-721 (atau itu memutuskan untuk tidak menerima transfer tertentu ini), balikkan.

```python
@external
def approve(_approved: address, _tokenId: uint256):
    """
    @dev Set or reaffirm the approved address for an NFT. The zero address indicates there is no approved address.
         Throws unless `msg.sender` is the current NFT owner, or an authorized operator of the current owner.
         Throws if `_tokenId` is not a valid NFT. (NOTE: This is not written the EIP)
         Throws if `_approved` is the current owner. (NOTE: This is not written the EIP)
    @param _approved Address to be approved for the given NFT ID.
    @param _tokenId ID of the token to be approved.
    """
    owner: address = self.idToOwner[_tokenId]
    # Throws if `_tokenId` is not a valid NFT
    assert owner != ZERO_ADDRESS
    # Throws if `_approved` is the current owner
    assert _approved != owner
```

Berdasarkan konvensi jika Anda tidak ingin memiliki pemberi persetujuan, maka Anda akan menugaskan ke alamat kosong, bukan ke alamat diri Anda sendiri.

```python
    # Check requirements
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

Untuk menetapkan persetujuan, Anda dapat menjadi pemiliknya, atau operator yang diotorisasi oleh pemilik.

```python
    # Set the approval
    self.idToApprovals[_tokenId] = _approved
    log Approval(owner, _approved, _tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev Enables or disables approval for a third party ("operator") to manage all of
         `msg.sender`'s assets. It also emits the ApprovalForAll event.
         Throws if `_operator` is the `msg.sender`. (NOTE: This is not written the EIP)
    @notice This works even if sender doesn't own any tokens at the time.
    @param _operator Address to add to the set of authorized operators.
    @param _approved True if the operators is approved, false to revoke approval.
    """
    # Throws if `_operator` is the `msg.sender`
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)
```

#### Cetak Token Baru dan Hancurkan Token Yang Sudah Ada {#mint-burn}

Akun yang membuat kontrak adalah `minter`, pengguna super yang diotorisasi untuk mencetak NFT baru. Namun, bahkan pencetak tidak diizinkan untuk membakar token yang sudah ada. Hanya pemiliklah, atau entitas yang diotorisasi oleh pemilik, yang dapat melakukannya.

```python
### MINT & BURN FUNCTIONS ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

Fungsi ini selalu mengembalikan `True`, karena jika operasinya gagal maka ia akan dibalikkan.

```python
    """
    @dev Function to mint tokens
         Throws if `msg.sender` is not the minter.
         Throws if `_to` is zero address.
         Throws if `_tokenId` is owned by someone.
    @param _to The address that will receive the minted tokens.
    @param _tokenId The token id to mint.
    @return A boolean that indicates if the operation was successful.
    """
    # Throws if `msg.sender` is not the minter
    assert msg.sender == self.minter
```

Hanya pencetak (akun yang membuat kontrak ERC-721) yang dapat mencetak token baru. Ini dapat menjadi masalah di kemudian hari jika kita ingin mengubah identitas pencetak. Dalam kontrak produksi, Anda mungkin menginginkan fungsi yang memungkinkan pencetak mentransfer hak-hak istimewa pencetak kepada orang lain.

```python
    # Throws if `_to` is zero address
    assert _to != ZERO_ADDRESS
    # Add NFT. Throws if `_tokenId` is owned by someone
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

Berdasarkan konvensi, pencetakan token baru dihitung sebagai sebuah transfer dari alamat nol.

```python

@external
def burn(_tokenId: uint256):
    """
    @dev Burns a specific ERC721 token.
         Throws unless `msg.sender` is the current owner, an authorized operator, or the approved
         address for this NFT.
         Throws if `_tokenId` is not a valid NFT.
    @param _tokenId uint256 id of the ERC721 token to be burned.
    """
    # Check requirements
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # Throws if `_tokenId` is not a valid NFT
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)
```

Siapa pun yang diizinkan untuk mentransfer sebuah token diizinkan untuk membakarnya. Sekalipun pembakaran tampak sama dengan transfer ke alamat kosong, alamat nolnya tidak benar-benar menerima token. Ini memungkinkan kita untuk membebaskan semua penyimpanan yang digunakan untuk token, yang dapat mengurangi biaya gas transaksi.

# Menggunakan Kontrak ini {#using-contract}

Berlawanan dengan Solidity, Vyper tidak memiliki warisan. Ini adalah pilihan rancangan yang disengaja untuk membuat kode lebih jelas dan karena itu lebih mudah untuk diamankan. Jadi, untuk membuat kontrak ERC-721 Vyper Anda, Anda mengambil [kontrak ini](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy) dan memodifikasinya untuk mengimplementasikan logika bisnis yang Anda inginkan.

# Kesimpulan {#conclusion}

Sebagai tinjauan, berikut adalah beberapa dari pokok pikiran terpenting dalam kontrak ini:

- Untuk menerima token ERC-721 dengan transfer yang aman, kontrak harus mengimplementasikan antarmuka `ERC721Receiver`.
- Bahkan jika Anda menggunakan transfer yang aman, token masih dapat terjebak jika Anda mengirimkannya ke alamat yang kunci privatnya tidak diketahui.
- Saat ada masalah dengan suatu operasi, adalah ide bagus untuk `revert` pemanggilan, ketimbang hanya mengembalikan nilai gagal.
- Token-token ERC-721 ada saat memiliki pemilik.
- Ada tiga cara untuk memiliki izin mentransfer suatu NFT. Anda dapat menjadi pemilik, disetujui untuk token tertentu, atau menjadi operator untuk semua token pemilik.
- Aksi lampau hanya terlihat dari luar blockchain. Kode yang beroperasi dalam blockchain tidak dapat melihat mereka.

Sekarang buat dan implementasikan kontrak Vyper yang aman.
