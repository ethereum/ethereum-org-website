---
title: Anatomi kontrak pintar
description: "Penjabaran mendalam tentang anatomi kontak cerdas – fungsi, data, dan variabel."
lang: id
---

Kontrak pintar adalah program yang dijalankan pada sebuah alamat di Ethereum. Kontrak pintar terbuat dari data dan fungsi yang bisa dieksekusi saat menerima sebuah transaksi. Berikut adalah gambaran umum dari komponen yang menyusun sebuah kontrak pintar.

## Persyaratan {#prerequisites}

Pastikan Anda telah membaca tentang [kontrak pintar](/developers/docs/smart-contracts/) terlebih dahulu. Dokumen ini menganggap Anda telah terbiasa dengan bahasa pemrograman seperti JavaScript atau Python.

## Data {#data}

Setiap data kontrak harus ditetapkan ke suatu lokasi: baik ke `storage` atau `memory`. Untuk memodifikasi penyimpanan di sebuah kontrak pintar biayanya mahal, jadi Anda perlu mempertimbangkan tempat untuk menyimpan data Anda.

### Penyimpanan {#storage}

Data yang persisten dirujuk sebagai penyimpanan dan diwakilkan oleh variabel state. Nilai-nilai ini disimpan secara permanen di blockchain. Anda perlu mendeklarasikan jenisnya sehingga kontrak bisa tetap melacak kapasitas penyimpanan pada blockchain yang diperlukan kontrak ketika dikompilasi.

```solidity
// Contoh Solidity
contract SimpleStorage {
    uint storedData; // Variabel state
    // ...
}
```

```python
# Vyper example
storedData: int128
```

Jika Anda telah memprogram bahasa yang berorientasi objek, Anda mungkin akan lebih mengenal sebagian besar jenisnya. Namun, `address` mungkin baru bagi Anda jika Anda baru dalam pengembangan Ethereum.

Jenis `address` dapat menampung alamat Ethereum yang setara dengan 20 bita atau 160 bit. Alamat kembali dalam notasi heksadesimal dengan awalan 0x.

Jenis lainnya meliputi:

- boolean
- bilangan bulat
- angka poin tetap
- array bita berukuran tetap
- array bita berukuran dinamis
- literal rasional dan bilangan bulat
- literal string
- literal heksadesimal
- enums

Untuk penjelasan lebih lanjut, lihat dokumen:

- [Lihat jenis Vyper](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [Lihat jenis Solidity](https://docs.soliditylang.org/en/latest/types.html#value-types)

### Memori {#memory}

Nilai yang hanya disimpan selama masa eksekusi fungsi kontrak disebut variabel memori. Karena nilai ini tidak disimpan secara permanen di blockchain, lebih murah untuk digunakan.

Pelajari lebih lanjut tentang bagaimana EVM menyimpan data (Penyimpanan, Memori, dan Stack) di [dokumen Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack).

### Variabel lingkungan {#environment-variables}

Selain variabel yang Anda tetapkan pada kontrak, ada beberapa variabel global khusus. Variabel ini terutama digunakan untuk memberikan informasi tentang blockchain atau transaksi saat ini.

Contoh:

| **Properti**      | **Variabel state** | **Deskripsi**                                            |
| ----------------- | ------------------ | -------------------------------------------------------- |
| `block.timestamp` | uint256            | Stempel waktu epoch blok saat ini                        |
| `msg.sender`      | alamat             | Pengirim pesan (pemanggilan saat ini) |

## Fungsi {#functions}

Dalam istilah yang paling sederhana, fungsi bisa mendapatkan informasi atau mengatur informasi dalam menanggapi transaksi yang masuk.

Ada dua jenis pemanggilan fungsi:

- `internal` – ini tidak membuat panggilan EVM
  - Fungsi internal dan variabel state hanya dapat diakses secara internal (yaitu, dari dalam kontrak saat ini atau kontrak yang diturunkan darinya)
- `external` – ini membuat panggilan EVM
  - Fungsi eksternal adalah bagian dari antarmuka kontrak, yang berarti bisa dipanggil dari kontrak lain dan melalui transaksi. Fungsi eksternal `f` tidak dapat dipanggil secara internal (yaitu, `f()` tidak berfungsi, tetapi `this.f()` berfungsi).

Fungsi juga dapat bersifat `public` atau `private`

- Fungsi `public` dapat dipanggil secara internal dari dalam kontrak atau secara eksternal melalui pesan
- Fungsi `private` hanya terlihat untuk kontrak tempat fungsi tersebut didefinisikan dan tidak di dalam kontrak turunan

Kedua fungsi dan variabel state ini bisa dibuat menjadi publik atau privat

Berikut adalah fungsi untuk memperbarui variabel state dalam sebuah kontrak:

```solidity
// Contoh Solidity
function update_name(string value) public {
    dapp_name = value;
}
```

- Parameter `value` dari jenis `string` diteruskan ke dalam fungsi: `update_name`
- Fungsi ini dideklarasikan `public`, yang berarti siapa pun dapat mengaksesnya
- Fungsi ini tidak dideklarasikan `view`, sehingga dapat mengubah state kontrak

### Fungsi view {#view-functions}

Fungsi ini berjanji untuk tidak memodifikasi state dari data kontrak. Contoh umumnya adalah fungsi "pengambil" – Anda mungkin menggunakan ini untuk mendapatkan saldo pengguna sebagai contohnya.

```solidity
// Contoh Solidity
function balanceOf(address _owner) public view returns (uint256 _balance) {
    return ownerPizzaCount[_owner];
}
```

```python
dappName: public(string)

@view
@public
def readName() -> string:
  return dappName
```

Apa yang dianggap sebagai memodifikasi state:

1. Menulis ke dalam variabel state.
2. [Memancarkan aksi](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events).
3. [Membuat kontrak lain](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts).
4. Menggunakan `selfdestruct`.
5. Mengirim eter melalui panggilan.
6. Memanggil fungsi apa pun yang tidak ditandai `view` atau `pure`.
7. Menggunakan pemanggilan level rendah.
8. Menggunakan perakitan sebaris yang berisi opcode tertentu.

### Fungsi constructor {#constructor-functions}

Fungsi `constructor` hanya dijalankan sekali saat kontrak pertama kali disebarkan. Seperti `constructor` di banyak bahasa pemrograman berbasis kelas, fungsi ini sering menginisialisasi variabel state ke nilai yang ditentukan.

```solidity
// Contoh Solidity
// Menginisialisasi data kontrak, mengatur `owner`
// ke alamat pembuat kontrak.
constructor() public {
    // Semua kontrak pintar bergantung pada transaksi eksternal untuk memicu fungsinya.
    // `msg` adalah variabel global yang mencakup data relevan pada transaksi yang diberikan,
    // seperti alamat pengirim dan nilai ETH yang termasuk dalam transaksi.
    // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# contoh Vyper

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### Fungsi bawaan {#built-in-functions}

Selain dari variabel dan fungsi yang Anda tetapkan pada kontrak Anda, ada beberapa fungsi bawaan spesial. Contoh paling jelas adalah:

- `address.send()` – Solidity
- `send(address)` – Vyper

Ini memungkinkan kontrak untuk mengirim ETH ke akun lain.

## Menulis fungsi {#writing-functions}

Fungsi Anda memerlukan:

- variabel dan tipe parameter (jika fungsi menerima parameter)
- deklarasi internal/eksternal
- deklarasi pure/view/payable
- tipe pengembalian (jika fungsi mengembalikan nilai)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // variabel state

    // Dipanggil saat kontrak disebarkan dan menginisialisasi nilai
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // Fungsi Get
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Fungsi Set
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

Sebuah kontrak lengkap mungkin tampak seperti ini. Di sini, fungsi `constructor` memberikan nilai awal untuk variabel `dapp_name`.

## Aksi dan log {#events-and-logs}

Event memungkinkan smart contract Anda berkomunikasi dengan frontend atau aplikasi lain yang berlangganan. Setelah transaksi divalidasi dan ditambahkan ke blok, smart contract dapat memancarkan event dan mencatat informasi, yang kemudian dapat diproses dan digunakan oleh frontend.

## Contoh beranotasi {#annotated-examples}

Ini adalah beberapa contoh yang ditulis dalam Solidity. Jika Anda ingin bermain dengan kode tersebut, Anda dapat berinteraksi dengannya di [Remix](http://remix.ethereum.org).

### Hello world {#hello-world}

```solidity
// Menentukan versi Solidity, menggunakan pemversian semantik.
// Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// Mendefinisikan kontrak bernama `HelloWorld`.
// Kontrak adalah kumpulan fungsi dan data (state-nya).
// Setelah disebarkan, kontrak berada di alamat tertentu di blockchain Ethereum.
// Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // Mendeklarasikan variabel state `message` dengan jenis `string`.
    // Variabel state adalah variabel yang nilainya disimpan secara permanen di penyimpanan kontrak.
    // Kata kunci `public` membuat variabel dapat diakses dari luar kontrak
    // dan membuat fungsi yang dapat dipanggil oleh kontrak atau klien lain untuk mengakses nilainya.
    string public message;

    // Serupa dengan banyak bahasa berorientasi objek berbasis kelas, constructor adalah
    // fungsi khusus yang hanya dijalankan saat pembuatan kontrak.
    // Constructor digunakan untuk menginisialisasi data kontrak.
    // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // Menerima argumen string `initMessage` dan mengatur nilai
        // ke dalam variabel penyimpanan `message` kontrak).
        message = initMessage;
    }

    // Fungsi publik yang menerima argumen string
    // dan memperbarui variabel penyimpanan `message`.
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### Token {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // `address` sebanding dengan alamat email - digunakan untuk mengidentifikasi akun di Ethereum.
    // Alamat dapat mewakili kontrak pintar atau akun eksternal (pengguna).
    // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // `mapping` pada dasarnya adalah struktur data tabel hash.
    // `mapping` ini menetapkan bilangan bulat tak bertanda (saldo token) ke alamat (pemegang token).
    // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // Aksi memungkinkan pencatatan aktivitas di rantai blok.
    // Klien Ethereum dapat mendengarkan aksi untuk bereaksi terhadap perubahan state kontrak.
    // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // Menginisialisasi data kontrak, mengatur `owner`
    // ke alamat pembuat kontrak.
    constructor() public {
        // Semua kontrak pintar bergantung pada transaksi eksternal untuk memicu fungsinya.
        // `msg` adalah variabel global yang mencakup data relevan pada transaksi yang diberikan,
        // seperti alamat pengirim dan nilai ETH yang termasuk dalam transaksi.
        // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // Membuat sejumlah token baru dan mengirimkannya ke suatu alamat.
    function mint(address receiver, uint amount) public {
        // `require` adalah struktur kontrol yang digunakan untuk memberlakukan kondisi tertentu.
        // Jika pernyataan `require` dievaluasi menjadi `false`, pengecualian dipicu,
        // yang mengembalikan semua perubahan yang dibuat pada state selama panggilan saat ini.
        // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // Hanya pemilik kontrak yang dapat memanggil fungsi ini
        require(msg.sender == owner, "Anda bukan pemiliknya.");

        // Memberlakukan jumlah token maksimum
        require(amount < 1e60, "Penerbitan maksimum terlampaui");

        // Meningkatkan saldo `receiver` sebesar `amount`
        balances[receiver] += amount;
    }

    // Mengirim sejumlah token yang ada dari pemanggil mana pun ke suatu alamat.
    function transfer(address receiver, uint amount) public {
        // Pengirim harus memiliki cukup token untuk dikirim
        require(amount <= balances[msg.sender], "Saldo tidak mencukupi.");

        // Menyesuaikan saldo token dari kedua alamat
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // Memancarkan aksi yang didefinisikan sebelumnya
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### Aset digital unik {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// Mengimpor simbol dari file lain ke dalam kontrak saat ini.
// Dalam hal ini, serangkaian kontrak pembantu dari OpenZeppelin.
// Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// Kata kunci `is` digunakan untuk mewarisi fungsi dan kata kunci dari kontrak eksternal.
// Dalam hal ini, `CryptoPizza` mewarisi dari kontrak `IERC721` dan `ERC165`.
// Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // Menggunakan pustaka SafeMath dari OpenZeppelin untuk melakukan operasi aritmatika dengan aman.
    // Pelajari lebih lanjut: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Variabel state konstan di Solidity serupa dengan bahasa lain
    // tetapi Anda harus menugaskan dari ekspresi yang konstan pada waktu kompilasi.
    // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Jenis struct memungkinkan Anda mendefinisikan jenis Anda sendiri
    // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Membuat array kosong dari Pizza struct
    Pizza[] public pizzas;

    // Pemetaan dari ID pizza ke alamat pemiliknya
    mapping(uint256 => address) public pizzaToOwner;

    // Pemetaan dari alamat pemilik ke jumlah token yang dimiliki
    mapping(address => uint256) public ownerPizzaCount;

    // Pemetaan dari ID token ke alamat yang disetujui
    mapping(uint256 => address) pizzaApprovals;

    // Anda dapat menyarangkan pemetaan, contoh ini memetakan pemilik ke persetujuan operator
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // Fungsi internal untuk membuat Pizza acak dari string (nama) dan DNA
    function _createPizza(string memory _name, uint256 _dna)
        // Kata kunci `internal` berarti fungsi ini hanya terlihat
        // di dalam kontrak ini dan kontrak yang menurunkannya
        // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` adalah pengubah fungsi yang memeriksa apakah pizza sudah ada
        // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // Menambahkan Pizza ke array Pizza dan mendapatkan id
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // Memeriksa bahwa pemilik Pizza sama dengan pengguna saat ini
        // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // perhatikan bahwa address(0) adalah alamat nol,
        // yang menunjukkan bahwa pizza[id] belum dialokasikan ke pengguna tertentu.

        assert(pizzaToOwner[id] == address(0));

        // Memetakan Pizza ke pemilik
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // Membuat Pizza acak dari string (nama)
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // Menghasilkan DNA acak dari string (nama) dan alamat pemilik (pembuat)
    function generateRandomDna(string memory _str, address _owner)
        public
        // Fungsi yang ditandai sebagai `pure` berjanji untuk tidak membaca atau mengubah state
        // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // Menghasilkan uint acak dari string (nama) + alamat (pemilik)
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // Mengembalikan array Pizza yang ditemukan oleh pemilik
    function getPizzasByOwner(address _owner)
        public
        // Fungsi yang ditandai sebagai `view` berjanji untuk tidak mengubah state
        // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // Menggunakan lokasi penyimpanan `memory` untuk menyimpan nilai hanya untuk
        // siklus hidup panggilan fungsi ini.
        // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
        uint256[] memory result = new uint256[](ownerPizzaCount[_owner]);
        uint256 counter = 0;
        for (uint256 i = 0; i < pizzas.length; i++) {
            if (pizzaToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    // Mentransfer Pizza dan kepemilikan ke alamat lain
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Alamat tidak valid.");
        require(_exists(_pizzaId), "Pizza tidak ada.");
        require(_from != _to, "Tidak dapat mentransfer ke alamat yang sama.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Alamat tidak disetujui.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // Memancarkan aksi yang didefinisikan dalam kontrak IERC721 yang diimpor
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * Mentransfer kepemilikan ID token yang diberikan dengan aman ke alamat lain
     * Jika alamat target adalah kontrak, itu harus mengimplementasikan `onERC721Received`,
     * yang dipanggil saat transfer aman, dan mengembalikan nilai ajaib
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * jika tidak, transfer akan dikembalikan.
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * Mentransfer kepemilikan ID token yang diberikan dengan aman ke alamat lain
     * Jika alamat target adalah kontrak, itu harus mengimplementasikan `onERC721Received`,
     * yang dipanggil saat transfer aman, dan mengembalikan nilai ajaib
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * jika tidak, transfer akan dikembalikan.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) public {
        this.transferFrom(from, to, pizzaId);
        require(_checkOnERC721Received(from, to, pizzaId, _data), "Harus mengimplementasikan onERC721Received.");
    }

    /**
     * Fungsi internal untuk memanggil `onERC721Received` pada alamat target
     * Panggilan tidak dieksekusi jika alamat target bukan kontrak
     */
    function _checkOnERC721Received(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) internal returns (bool) {
        if (!isContract(to)) {
            return true;
        }

        bytes4 retval = IERC721Receiver(to).onERC721Received(
            msg.sender,
            from,
            pizzaId,
            _data
        );
        return (retval == _ERC721_RECEIVED);
    }

    // Membakar Pizza - menghancurkan Token sepenuhnya
    // Pengubah fungsi `external` berarti fungsi ini adalah
    // bagian dari antarmuka kontrak dan kontrak lain dapat memanggilnya
    function burn(uint256 _pizzaId) external {
        require(msg.sender != address(0), "Alamat tidak valid.");
        require(_exists(_pizzaId), "Pizza tidak ada.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Alamat tidak disetujui.");

        ownerPizzaCount[msg.sender] = SafeMath.sub(
            ownerPizzaCount[msg.sender],
            1
        );
        pizzaToOwner[_pizzaId] = address(0);
    }

    // Mengembalikan jumlah Pizza berdasarkan alamat
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // Mengembalikan pemilik Pizza yang ditemukan berdasarkan id
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "ID Pizza tidak valid.");
        return owner;
    }

    // Menyetujui alamat lain untuk mentransfer kepemilikan Pizza
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Harus pemilik Pizza.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // Mengembalikan alamat yang disetujui untuk Pizza tertentu
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza tidak ada.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * Fungsi pribadi untuk menghapus persetujuan saat ini dari ID token yang diberikan
     * Mengembalikan jika alamat yang diberikan memang bukan pemilik token
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Harus pemilik pizza.");
        require(_exists(_pizzaId), "Pizza tidak ada.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * Mengatur atau membatalkan pengaturan persetujuan operator yang diberikan
     * Operator diizinkan untuk mentransfer semua token pengirim atas nama mereka
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Tidak dapat menyetujui alamat sendiri");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // Memberi tahu apakah operator disetujui oleh pemilik tertentu
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // Mengambil kepemilikan Pizza - hanya untuk pengguna yang disetujui
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Alamat tidak disetujui.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // Memeriksa apakah Pizza ada
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // Memeriksa apakah alamat adalah pemilik atau disetujui untuk mentransfer Pizza
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // Nonaktifkan pemeriksaan solium karena
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // Periksa apakah Pizza unik dan belum ada
    modifier isUnique(string memory _name, uint256 _dna) {
        bool result = true;
        for (uint256 i = 0; i < pizzas.length; i++) {
            if (
                keccak256(abi.encodePacked(pizzas[i].name)) ==
                keccak256(abi.encodePacked(_name)) &&
                pizzas[i].dna == _dna
            ) {
                result = false;
            }
        }
        require(result, "Pizza dengan nama seperti itu sudah ada.");
        _;
    }

    // Mengembalikan apakah alamat target adalah kontrak
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // Saat ini tidak ada cara yang lebih baik untuk memeriksa apakah ada kontrak di suatu alamat
        // selain memeriksa ukuran kode di alamat itu.
        // Lihat https://ethereum.stackexchange.com/a/14016/36603
        // untuk detail lebih lanjut tentang cara kerjanya.
        // TODO Periksa ini lagi sebelum rilis Serenity, karena semua alamat akan menjadi
        // kontrak saat itu.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## Bacaan lebih lanjut {#further-reading}

Lihat dokumentasi Solidity dan Vyper untuk gambaran umum yang lebih lengkap tentang kontrak pintar:

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## Topik terkait {#related-topics}

- [Kontrak pintar](/developers/docs/smart-contracts/)
- [Mesin Virtual Ethereum](/developers/docs/evm/)

## Tutorial terkait {#related-tutorials}

- [Memperkecil kontrak untuk mengatasi batas ukuran kontrak](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– Beberapa tips praktis untuk mengurangi ukuran kontrak pintar Anda._
- [Mencatat data dari kontrak pintar dengan aksi](/developers/tutorials/logging-events-smart-contracts/) _– Pengantar aksi kontrak pintar dan cara menggunakannya untuk mencatat data._
- [Berinteraksi dengan kontrak lain dari Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Cara menyebarkan kontrak pintar dari kontrak yang ada dan berinteraksi dengannya._
