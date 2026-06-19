---
title: Anatomi kontrak pintar
description: Panduan mendalam tentang anatomi kontrak pintar – fungsi, data, dan variabel.
lang: id
---

Kontrak pintar adalah program yang berjalan pada sebuah alamat di Ethereum. Kontrak pintar terdiri dari data dan fungsi yang dapat dieksekusi setelah menerima sebuah transaksi. Berikut adalah gambaran umum tentang apa yang membentuk sebuah kontrak pintar.

## Prasyarat {#prerequisites}

Pastikan Anda telah membaca tentang [kontrak pintar](/developers/docs/smart-contracts/) terlebih dahulu. Dokumen ini mengasumsikan Anda sudah familier dengan bahasa pemrograman seperti JavaScript atau Python.

## Data {#data}

Setiap data kontrak harus ditetapkan ke sebuah lokasi: baik ke `storage` maupun `memory`. Memodifikasi penyimpanan dalam kontrak pintar memakan biaya yang mahal, jadi Anda perlu mempertimbangkan di mana data Anda harus disimpan.

### Penyimpanan {#storage}

Data persisten disebut sebagai penyimpanan dan direpresentasikan oleh variabel state. Nilai-nilai ini disimpan secara permanen di rantai blok. Anda perlu mendeklarasikan tipenya agar kontrak dapat melacak berapa banyak penyimpanan di rantai blok yang dibutuhkannya saat dikompilasi.

```solidity
// Contoh Solidity
contract SimpleStorage {
    uint storedData; // Variabel state
    // ...
}
```

```python
# Contoh Vyper
storedData: int128
```

Jika Anda sudah pernah memprogram dengan bahasa berorientasi objek, Anda mungkin akan familier dengan sebagian besar tipenya. Namun, `address` mungkin baru bagi Anda jika Anda baru mengenal pengembangan [Ethereum](/).

Tipe `address` dapat menampung sebuah alamat Ethereum yang setara dengan 20 bita atau 160 bit. Tipe ini mengembalikan nilai dalam notasi heksadesimal yang diawali dengan 0x.

Tipe lainnya meliputi:

- boolean
- bilangan bulat (integer)
- angka titik tetap (fixed point)
- larik bita berukuran tetap
- larik bita berukuran dinamis
- literal rasional dan bilangan bulat
- literal string
- literal heksadesimal
- enum

Untuk penjelasan lebih lanjut, lihat dokumentasinya:

- [Lihat tipe Vyper](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [Lihat tipe Solidity](https://docs.soliditylang.org/en/latest/types.html#value-types)

### Memori {#memory}

Nilai yang hanya disimpan selama masa eksekusi fungsi kontrak disebut variabel memori. Karena tidak disimpan secara permanen di rantai blok, variabel ini jauh lebih murah untuk digunakan.

Pelajari lebih lanjut tentang bagaimana EVM menyimpan data (Penyimpanan, Memori, dan Tumpukan) di [dokumentasi Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack).

### Variabel lingkungan {#environment-variables}

Selain variabel yang Anda definisikan pada kontrak Anda, ada beberapa variabel global khusus. Variabel ini utamanya digunakan untuk memberikan informasi tentang rantai blok atau transaksi saat ini.

Contoh:

| **Properti**          | **Variabel state** | **Deskripsi**                      |
| ----------------- | ------------------ | ------------------------------------ |
| `block.timestamp` | uint256            | Stempel waktu Epok blok saat ini        |
| `msg.sender`      | address            | Pengirim pesan (panggilan saat ini) |

## Fungsi {#functions}

Dalam istilah yang paling sederhana, fungsi dapat mengambil informasi atau menetapkan informasi sebagai respons terhadap transaksi yang masuk.

Ada dua jenis panggilan fungsi:

- `internal` – ini tidak membuat panggilan EVM
  - Fungsi internal dan variabel state hanya dapat diakses secara internal (yaitu, dari dalam kontrak saat ini atau kontrak yang diturunkan darinya)
- `external` – ini membuat panggilan EVM
  - Fungsi eksternal adalah bagian dari antarmuka kontrak, yang berarti fungsi tersebut dapat dipanggil dari kontrak lain dan melalui transaksi. Fungsi eksternal `f` tidak dapat dipanggil secara internal (yaitu, `f()` tidak berfungsi, tetapi `this.f()` berfungsi).

Fungsi juga dapat bersifat `public` atau `private`

- Fungsi `public` dapat dipanggil secara internal dari dalam kontrak atau secara eksternal melalui pesan
- Fungsi `private` hanya terlihat untuk kontrak tempat fungsi tersebut didefinisikan dan tidak pada kontrak turunannya

Baik fungsi maupun variabel state dapat dibuat publik atau privat

Berikut adalah fungsi untuk memperbarui variabel state pada sebuah kontrak:

```solidity
// Contoh Solidity
function update_name(string value) public {
    dapp_name = value;
}
```

- Parameter `value` bertipe `string` diteruskan ke dalam fungsi: `update_name`
- Fungsi ini dideklarasikan sebagai `public`, yang berarti siapa pun dapat mengaksesnya
- Fungsi ini tidak dideklarasikan sebagai `view`, sehingga dapat memodifikasi state kontrak

### Fungsi view {#view-functions}

Fungsi-fungsi ini menjanjikan untuk tidak memodifikasi state dari data kontrak. Contoh umumnya adalah fungsi "getter" – Anda mungkin menggunakan ini untuk menerima saldo pengguna misalnya.

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

Apa yang dianggap memodifikasi state:

1. Menulis ke variabel state.
2. [Memancarkan peristiwa](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events).
3. [Membuat kontrak lain](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts).
4. Menggunakan `selfdestruct`.
5. Mengirim ether melalui panggilan.
6. Memanggil fungsi apa pun yang tidak ditandai `view` atau `pure`.
7. Menggunakan panggilan tingkat rendah.
8. Menggunakan rakitan sebaris (inline assembly) yang berisi opcode tertentu.

### Fungsi konstruktor {#constructor-functions}

Fungsi `constructor` hanya dieksekusi sekali saat kontrak pertama kali disebarkan. Seperti `constructor` dalam banyak bahasa pemrograman berbasis kelas, fungsi ini sering kali menginisialisasi variabel state ke nilai yang ditentukannya.

```solidity
// Contoh Solidity
// Menginisialisasi data kontrak, mengatur `owner`
// ke alamat pembuat kontrak.
constructor() public {
    // Semua kontrak pintar bergantung pada transaksi eksternal untuk memicu fungsinya.
    // `msg` adalah variabel global yang mencakup data relevan pada transaksi yang diberikan,
    // seperti alamat pengirim dan nilai ETH yang disertakan dalam transaksi.
    // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# Contoh Vyper

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### Fungsi bawaan {#built-in-functions}

Selain variabel dan fungsi yang Anda definisikan pada kontrak Anda, ada beberapa fungsi bawaan khusus. Contoh yang paling jelas adalah:

- `address.send()` – Solidity
- `send(address)` – Vyper

Fungsi ini memungkinkan kontrak untuk mengirim ETH ke akun lain.

## Menulis fungsi {#writing-functions}

Fungsi Anda membutuhkan:

- variabel dan tipe parameter (jika menerima parameter)
- deklarasi internal/eksternal
- deklarasi pure/view/payable
- tipe kembalian (jika mengembalikan sebuah nilai)

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

Kontrak yang lengkap mungkin terlihat seperti ini. Di sini fungsi `constructor` memberikan nilai awal untuk variabel `dapp_name`.

## Peristiwa dan Log {#events-and-logs}

Peristiwa memungkinkan kontrak pintar Anda untuk berkomunikasi dengan frontend Anda atau aplikasi berlangganan lainnya. Setelah sebuah transaksi divalidasi dan ditambahkan ke sebuah blok, kontrak pintar dapat memancarkan peristiwa dan informasi Log, yang kemudian dapat diproses dan dimanfaatkan oleh frontend.

## Contoh beranotasi {#annotated-examples}

Berikut adalah beberapa contoh yang ditulis dalam Solidity. Jika Anda ingin bermain dengan kodenya, Anda dapat berinteraksi dengannya di [Remix](https://remix.ethereum.org).

### Hello world {#hello-world}

```solidity
// Menentukan versi Solidity, menggunakan pembuatan versi semantik.
// Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// Mendefinisikan kontrak bernama `HelloWorld`.
// Sebuah kontrak adalah kumpulan fungsi dan data (state-nya).
// Setelah disebarkan, sebuah kontrak berada di alamat tertentu di rantai blok Ethereum.
// Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // Mendeklarasikan variabel state `message` dengan tipe `string`.
    // Variabel state adalah variabel yang nilainya disimpan secara permanen di penyimpanan kontrak.
    // Kata kunci `public` membuat variabel dapat diakses dari luar kontrak
    // dan membuat fungsi yang dapat dipanggil oleh kontrak atau klien lain untuk mengakses nilainya.
    string public message;

    // Mirip dengan banyak bahasa berorientasi objek berbasis kelas, sebuah konstruktor adalah
    // fungsi khusus yang hanya dieksekusi saat pembuatan kontrak.
    // Konstruktor digunakan untuk menginisialisasi data kontrak.
    // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // Menerima argumen string `initMessage` dan mengatur nilainya
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
    // Sebuah `address` sebanding dengan alamat email - ini digunakan untuk mengidentifikasi akun di Ethereum.
    // Alamat dapat mewakili kontrak pintar atau akun (pengguna) eksternal.
    // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // Sebuah `mapping` pada dasarnya adalah struktur data tabel hash.
    // `mapping` ini menetapkan bilangan bulat tak bertanda (saldo token) ke sebuah alamat (pemegang token).
    // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // Peristiwa memungkinkan pencatatan Log aktivitas di rantai blok.
    // Klien Ethereum dapat mendengarkan peristiwa untuk bereaksi terhadap perubahan state kontrak.
    // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // Menginisialisasi data kontrak, mengatur `owner`
    // ke alamat pembuat kontrak.
    constructor() public {
        // Semua kontrak pintar bergantung pada transaksi eksternal untuk memicu fungsinya.
        // `msg` adalah variabel global yang mencakup data relevan pada transaksi yang diberikan,
        // seperti alamat pengirim dan nilai ETH yang disertakan dalam transaksi.
        // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // Membuat sejumlah token baru dan mengirimkannya ke sebuah alamat.
    function mint(address receiver, uint amount) public {
        // `require` adalah struktur kontrol yang digunakan untuk memaksakan kondisi tertentu.
        // Jika pernyataan `require` dievaluasi menjadi `false`, pengecualian akan dipicu,
        // yang mengembalikan semua perubahan yang dibuat pada state selama panggilan saat ini.
        // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // Hanya pemilik kontrak yang dapat memanggil fungsi ini
        require(msg.sender == owner, "You are not the owner.");

        // Memaksakan jumlah maksimum token
        require(amount < 1e60, "Maximum issuance exceeded");

        // Meningkatkan saldo `receiver` sebesar `amount`
        balances[receiver] += amount;
    }

    // Mengirim sejumlah token yang ada dari pemanggil mana pun ke sebuah alamat.
    function transfer(address receiver, uint amount) public {
        // Pengirim harus memiliki cukup token untuk dikirim
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // Menyesuaikan saldo token dari kedua alamat
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // Memancarkan peristiwa yang didefinisikan sebelumnya
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

    // Variabel state konstan di Solidity mirip dengan bahasa lain
    // tetapi Anda harus menetapkan dari ekspresi yang konstan pada saat kompilasi.
    // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Tipe Struct memungkinkan Anda mendefinisikan tipe Anda sendiri
    // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Membuat array kosong dari struct Pizza
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
        // di dalam kontrak ini dan kontrak yang diturunkan dari kontrak ini
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
        // menunjukkan bahwa pizza[id] belum dialokasikan ke pengguna tertentu.

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
        // Fungsi yang ditandai sebagai `pure` berjanji untuk tidak membaca dari atau memodifikasi state
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
        // Fungsi yang ditandai sebagai `view` berjanji untuk tidak memodifikasi state
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
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // Memancarkan peristiwa yang didefinisikan dalam kontrak IERC721 yang diimpor
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * Mentransfer kepemilikan ID token yang diberikan dengan aman ke alamat lain
     * Jika alamat target adalah kontrak, ia harus mengimplementasikan `onERC721Received`,
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
     * Jika alamat target adalah kontrak, ia harus mengimplementasikan `onERC721Received`,
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
        require(_checkOnERC721Received(from, to, pizzaId, _data), "Must implement onERC721Received.");
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

    // Membakar Pizza - menghancurkan token sepenuhnya
    // Pengubah fungsi `external` berarti fungsi ini adalah
    // bagian dari antarmuka kontrak dan kontrak lain dapat memanggilnya
    function burn(uint256 _pizzaId) external {
        require(msg.sender != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

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
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // Menyetujui alamat lain untuk mentransfer kepemilikan Pizza
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // Mengembalikan alamat yang disetujui untuk Pizza tertentu
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza does not exist.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * Fungsi privat untuk menghapus persetujuan saat ini dari ID token yang diberikan
     * Mengembalikan jika alamat yang diberikan memang bukan pemilik token
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Must be pizza owner.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * Mengatur atau membatalkan persetujuan dari operator yang diberikan
     * Seorang operator diizinkan untuk mentransfer semua token pengirim atas nama mereka
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // Memberi tahu apakah seorang operator disetujui oleh pemilik yang diberikan
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // Mengambil kepemilikan Pizza - hanya untuk pengguna yang disetujui
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");
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
        require(result, "Pizza with such name already exists.");
        _;
    }

    // Mengembalikan apakah alamat target adalah kontrak
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // Saat ini tidak ada cara yang lebih baik untuk memeriksa apakah ada kontrak di sebuah alamat
        // daripada memeriksa ukuran kode di alamat tersebut.
        // Lihat https://ethereum.stackexchange.com/a/14016/36603
        // untuk detail lebih lanjut tentang cara kerjanya.
        // TODO Periksa ini lagi sebelum rilis Serenity, karena semua alamat akan menjadi
        // kontrak pada saat itu.
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
- [Mesin Virtual Ethereum (EVM)](/developers/docs/evm/)

## Tutorial terkait {#related-tutorials}

- [Memperkecil kontrak untuk mengatasi batas ukuran kontrak](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– Beberapa kiat praktis untuk mengurangi ukuran kontrak pintar Anda._
- [Mencatat data Log dari kontrak pintar dengan peristiwa](/developers/tutorials/logging-events-smart-contracts/) _– Pengantar tentang peristiwa kontrak pintar dan bagaimana Anda dapat menggunakannya untuk mencatat data Log._
- [Berinteraksi dengan kontrak lain dari Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Cara menyebarkan kontrak pintar dari kontrak yang sudah ada dan berinteraksi dengannya._