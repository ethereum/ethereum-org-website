---
title: Anatomi kontrak pintar
description: "Pandangan mendalam tentang anatomi kontrak pintar – fungsi, data, dan variabel."
lang: id
---

Kontrak pintar adalah program yang berjalan pada sebuah alamat di Ethereum. Kontrak pintar terdiri dari data dan fungsi yang dapat dieksekusi setelah menerima transaksi. Berikut adalah gambaran umum tentang apa yang membentuk sebuah kontrak pintar.

## Prasyarat {#prerequisites}

Pastikan Anda telah membaca tentang [kontrak pintar](/developers/docs/smart-contracts/) terlebih dahulu. Dokumen ini mengasumsikan Anda sudah familier dengan bahasa pemrograman seperti JavaScript atau Python.

## Data {#data}

Setiap data kontrak harus ditetapkan ke sebuah lokasi: baik ke `storage` (penyimpanan) maupun `memory` (memori). Memodifikasi penyimpanan dalam kontrak pintar membutuhkan biaya yang mahal, jadi Anda perlu mempertimbangkan di mana data Anda harus berada.

### Penyimpanan {#storage}

Data persisten disebut sebagai penyimpanan dan diwakili oleh variabel status. Nilai-nilai ini disimpan secara permanen di blockchain. Anda perlu mendeklarasikan tipenya sehingga kontrak dapat melacak berapa banyak penyimpanan di blockchain yang dibutuhkannya saat dikompilasi.

```solidity
// Solidity example // Contoh Solidity
contract SimpleStorage {
    uint storedData; // State variable // Variabel state
    // ... // ...
}
```

```python
# Vyper example # Contoh Vyper
storedData: int128
```

Jika Anda sudah pernah memprogram dengan bahasa berorientasi objek, Anda mungkin akan familier dengan sebagian besar tipenya. Namun, `address` (alamat) mungkin merupakan hal baru bagi Anda jika Anda baru dalam pengembangan [Ethereum](/).

Tipe `address` dapat menampung alamat Ethereum yang setara dengan 20 bita atau 160 bit. Tipe ini mengembalikan nilai dalam notasi heksadesimal dengan awalan 0x.

Tipe lainnya meliputi:

- boolean
- integer (bilangan bulat)
- fixed point numbers (bilangan titik tetap)
- fixed-size byte arrays (larik bita berukuran tetap)
- dynamically sized byte arrays (larik bita berukuran dinamis)
- rational and integer literals (literal rasional dan bilangan bulat)
- string literals (literal string)
- hexadecimal literals (literal heksadesimal)
- enums

Untuk penjelasan lebih lanjut, lihat dokumentasinya:

- [Lihat tipe Vyper](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [Lihat tipe Solidity](https://docs.soliditylang.org/en/latest/types.html#value-types)

### Memori {#memory}

Nilai yang hanya disimpan selama masa eksekusi fungsi kontrak disebut variabel memori. Karena tidak disimpan secara permanen di blockchain, variabel ini jauh lebih murah untuk digunakan.

Pelajari lebih lanjut tentang bagaimana EVM menyimpan data (Penyimpanan, Memori, dan Tumpukan) di [dokumentasi Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack).

### Variabel lingkungan {#environment-variables}

Selain variabel yang Anda tentukan pada kontrak Anda, ada beberapa variabel global khusus. Variabel ini terutama digunakan untuk memberikan informasi tentang blockchain atau transaksi saat ini.

Contoh:

| **Properti**      | **Variabel status** | **Deskripsi**                        |
| ----------------- | ------------------- | ------------------------------------ |
| `block.timestamp` | uint256             | Stempel waktu epoch blok saat ini    |
| `msg.sender`      | address             | Pengirim pesan (panggilan saat ini)  |

## Fungsi {#functions}

Dalam istilah yang paling sederhana, fungsi dapat mengambil informasi atau mengatur informasi sebagai respons terhadap transaksi yang masuk.

Ada dua jenis panggilan fungsi:

- `internal` – ini tidak membuat panggilan EVM
  - Fungsi internal dan variabel status hanya dapat diakses secara internal (yaitu, dari dalam kontrak saat ini atau kontrak yang diturunkan darinya)
- `external` – ini membuat panggilan EVM
  - Fungsi eksternal adalah bagian dari antarmuka kontrak, yang berarti fungsi tersebut dapat dipanggil dari kontrak lain dan melalui transaksi. Fungsi eksternal `f` tidak dapat dipanggil secara internal (yaitu, `f()` tidak berfungsi, tetapi `this.f()` berfungsi).

Fungsi juga dapat bersifat `public` (publik) atau `private` (pribadi)

- Fungsi `public` dapat dipanggil secara internal dari dalam kontrak atau secara eksternal melalui pesan
- Fungsi `private` hanya terlihat untuk kontrak tempat fungsi tersebut didefinisikan dan tidak dalam kontrak turunan

Baik fungsi maupun variabel status dapat dibuat publik atau pribadi

Berikut adalah fungsi untuk memperbarui variabel status pada sebuah kontrak:

```solidity
// Solidity example // Contoh Solidity
function update_name(string value) public {
    dapp_name = value;
}
```

- Parameter `value` bertipe `string` diteruskan ke dalam fungsi: `update_name`
- Fungsi ini dideklarasikan sebagai `public`, yang berarti siapa pun dapat mengaksesnya
- Fungsi ini tidak dideklarasikan sebagai `view`, sehingga dapat memodifikasi status kontrak

### Fungsi view {#view-functions}

Fungsi-fungsi ini berjanji untuk tidak memodifikasi status data kontrak. Contoh umumnya adalah fungsi "getter" – Anda mungkin menggunakan ini untuk menerima saldo pengguna misalnya.

```solidity
// Solidity example // Contoh Solidity
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

Apa yang dianggap memodifikasi status:

1. Menulis ke variabel status.
2. [Memancarkan peristiwa (emitting events)](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events).
3. [Membuat kontrak lain](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts).
4. Menggunakan `selfdestruct`.
5. Mengirim ether melalui panggilan.
6. Memanggil fungsi apa pun yang tidak ditandai `view` atau `pure`.
7. Menggunakan panggilan tingkat rendah.
8. Menggunakan perakitan sebaris (inline assembly) yang berisi opcode tertentu.

### Fungsi konstruktor {#constructor-functions}

Fungsi `constructor` hanya dieksekusi sekali saat kontrak pertama kali disebarkan. Seperti `constructor` dalam banyak bahasa pemrograman berbasis kelas, fungsi-fungsi ini sering kali menginisialisasi variabel status ke nilai yang ditentukannya.

```solidity
// Solidity example // Contoh Solidity
// Initializes the contract's data, setting the `owner` // Menginisialisasi data kontrak, mengatur `owner`
// to the address of the contract creator. // ke alamat pembuat kontrak.
constructor() public {
    // All smart contracts rely on external transactions to trigger its functions. // Semua kontrak pintar bergantung pada transaksi eksternal untuk memicu fungsinya.
    // `msg` is a global variable that includes relevant data on the given transaction, // `msg` adalah variabel global yang mencakup data relevan pada transaksi yang diberikan,
    // such as the address of the sender and the ETH value included in the transaction. // seperti alamat pengirim dan nilai ETH yang disertakan dalam transaksi.
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# Vyper example # Contoh Vyper

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### Fungsi bawaan {#built-in-functions}

Selain variabel dan fungsi yang Anda tentukan pada kontrak Anda, ada beberapa fungsi bawaan khusus. Contoh yang paling jelas adalah:

- `address.send()` – Solidity
- `send(address)` – Vyper

Fungsi-fungsi ini memungkinkan kontrak untuk mengirim ETH ke akun lain.

## Menulis fungsi {#writing-functions}

Fungsi Anda membutuhkan:

- variabel parameter dan tipe (jika menerima parameter)
- deklarasi internal/eksternal
- deklarasi pure/view/payable
- tipe pengembalian (jika mengembalikan nilai)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // state variable // variabel state

    // Called when the contract is deployed and initializes the value // Dipanggil saat kontrak disebarkan dan menginisialisasi nilai
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // Get Function // Fungsi Get
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Set Function // Fungsi Set
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

Kontrak yang lengkap mungkin terlihat seperti ini. Di sini fungsi `constructor` memberikan nilai awal untuk variabel `dapp_name`.

## Peristiwa dan log {#events-and-logs}

Peristiwa (events) memungkinkan kontrak pintar Anda untuk berkomunikasi dengan frontend Anda atau aplikasi berlangganan lainnya. Setelah transaksi divalidasi dan ditambahkan ke sebuah blok, kontrak pintar dapat memancarkan peristiwa dan mencatat informasi, yang kemudian dapat diproses dan dimanfaatkan oleh frontend.

## Contoh beranotasi {#annotated-examples}

Berikut adalah beberapa contoh yang ditulis dalam Solidity. Jika Anda ingin bermain dengan kodenya, Anda dapat berinteraksi dengannya di [Remix](http://remix.ethereum.org).

### Halo dunia {#hello-world}

```solidity
// Specifies the version of Solidity, using semantic versioning. // Menentukan versi Solidity, menggunakan pembuatan versi semantik.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// Defines a contract named `HelloWorld`. // Mendefinisikan kontrak bernama `HelloWorld`.
// A contract is a collection of functions and data (its state). // Kontrak adalah kumpulan fungsi dan data (state-nya).
// Once deployed, a contract resides at a specific address on the Ethereum blockchain. // Setelah disebarkan, kontrak berada di alamat tertentu di blockchain Ethereum.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // Declares a state variable `message` of type `string`. // Mendeklarasikan variabel state `message` dengan tipe `string`.
    // State variables are variables whose values are permanently stored in contract storage. // Variabel state adalah variabel yang nilainya disimpan secara permanen di penyimpanan kontrak.
    // The keyword `public` makes variables accessible from outside a contract // Kata kunci `public` membuat variabel dapat diakses dari luar kontrak
    // and creates a function that other contracts or clients can call to access the value. // dan membuat fungsi yang dapat dipanggil oleh kontrak atau klien lain untuk mengakses nilainya.
    string public message;

    // Similar to many class-based object-oriented languages, a constructor is // Mirip dengan banyak bahasa berorientasi objek berbasis kelas, konstruktor adalah
    // a special function that is only executed upon contract creation. // fungsi khusus yang hanya dieksekusi saat pembuatan kontrak.
    // Constructors are used to initialize the contract's data. // Konstruktor digunakan untuk menginisialisasi data kontrak.
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // Accepts a string argument `initMessage` and sets the value // Menerima argumen string `initMessage` dan mengatur nilainya
        // into the contract's `message` storage variable). // ke dalam variabel penyimpanan `message` kontrak).
        message = initMessage;
    }

    // A public function that accepts a string argument // Fungsi publik yang menerima argumen string
    // and updates the `message` storage variable. // dan memperbarui variabel penyimpanan `message`.
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### Token {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // An `address` is comparable to an email address - it's used to identify an account on Ethereum. // Sebuah `address` sebanding dengan alamat email - ini digunakan untuk mengidentifikasi akun di Ethereum.
    // Addresses can represent a smart contract or an external (user) accounts. // Alamat dapat mewakili kontrak pintar atau akun (pengguna) eksternal.
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/types.html#address // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // A `mapping` is essentially a hash table data structure. // Sebuah `mapping` pada dasarnya adalah struktur data tabel hash.
    // This `mapping` assigns an unsigned integer (the token balance) to an address (the token holder). // `mapping` ini menetapkan bilangan bulat tak bertanda (saldo token) ke sebuah alamat (pemegang token).
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // Events allow for logging of activity on the blockchain. // Event memungkinkan pencatatan aktivitas di blockchain.
    // Ethereum clients can listen for events in order to react to contract state changes. // Klien Ethereum dapat mendengarkan event untuk bereaksi terhadap perubahan state kontrak.
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // Initializes the contract's data, setting the `owner` // Menginisialisasi data kontrak, mengatur `owner`
    // to the address of the contract creator. // ke alamat pembuat kontrak.
    constructor() public {
        // All smart contracts rely on external transactions to trigger its functions. // Semua kontrak pintar bergantung pada transaksi eksternal untuk memicu fungsinya.
        // `msg` is a global variable that includes relevant data on the given transaction, // `msg` adalah variabel global yang mencakup data relevan pada transaksi yang diberikan,
        // such as the address of the sender and the ETH value included in the transaction. // seperti alamat pengirim dan nilai ETH yang disertakan dalam transaksi.
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // Creates an amount of new tokens and sends them to an address. // Membuat sejumlah token baru dan mengirimkannya ke sebuah alamat.
    function mint(address receiver, uint amount) public {
        // `require` is a control structure used to enforce certain conditions. // `require` adalah struktur kontrol yang digunakan untuk memaksakan kondisi tertentu.
        // If a `require` statement evaluates to `false`, an exception is triggered, // Jika pernyataan `require` dievaluasi menjadi `false`, pengecualian akan dipicu,
        // which reverts all changes made to the state during the current call. // yang mengembalikan semua perubahan yang dibuat pada state selama panggilan saat ini.
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // Only the contract owner can call this function // Hanya pemilik kontrak yang dapat memanggil fungsi ini
        require(msg.sender == owner, "You are not the owner.");

        // Enforces a maximum amount of tokens // Memaksakan jumlah maksimum token
        require(amount < 1e60, "Maximum issuance exceeded");

        // Increases the balance of `receiver` by `amount` // Meningkatkan saldo `receiver` sebesar `amount`
        balances[receiver] += amount;
    }

    // Sends an amount of existing tokens from any caller to an address. // Mengirim sejumlah token yang ada dari pemanggil mana pun ke sebuah alamat.
    function transfer(address receiver, uint amount) public {
        // The sender must have enough tokens to send // Pengirim harus memiliki cukup token untuk dikirim
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // Adjusts token balances of the two addresses // Menyesuaikan saldo token dari kedua alamat
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // Emits the event defined earlier // Memancarkan event yang didefinisikan sebelumnya
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### Aset digital unik {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// Imports symbols from other files into the current contract. // Mengimpor simbol dari file lain ke dalam kontrak saat ini.
// In this case, a series of helper contracts from OpenZeppelin. // Dalam hal ini, serangkaian kontrak pembantu dari OpenZeppelin.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// The `is` keyword is used to inherit functions and keywords from external contracts. // Kata kunci `is` digunakan untuk mewarisi fungsi dan kata kunci dari kontrak eksternal.
// In this case, `CryptoPizza` inherits from the `IERC721` and `ERC165` contracts. // Dalam hal ini, `CryptoPizza` mewarisi dari kontrak `IERC721` dan `ERC165`.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // Uses OpenZeppelin's SafeMath library to perform arithmetic operations safely. // Menggunakan pustaka SafeMath OpenZeppelin untuk melakukan operasi aritmatika dengan aman.
    // Learn more: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath // Pelajari lebih lanjut: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Constant state variables in Solidity are similar to other languages // Variabel state konstan di Solidity mirip dengan bahasa lain
    // but you must assign from an expression which is constant at compile time. // tetapi Anda harus menetapkan dari ekspresi yang konstan pada waktu kompilasi.
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Struct types let you define your own type // Tipe struct memungkinkan Anda mendefinisikan tipe Anda sendiri
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Creates an empty array of Pizza structs // Membuat array kosong dari struct Pizza
    Pizza[] public pizzas;

    // Mapping from pizza ID to its owner's address // Pemetaan dari ID pizza ke alamat pemiliknya
    mapping(uint256 => address) public pizzaToOwner;

    // Mapping from owner's address to number of owned token // Pemetaan dari alamat pemilik ke jumlah token yang dimiliki
    mapping(address => uint256) public ownerPizzaCount;

    // Mapping from token ID to approved address // Pemetaan dari ID token ke alamat yang disetujui
    mapping(uint256 => address) pizzaApprovals;

    // You can nest mappings, this example maps owner to operator approvals // Anda dapat menyarangkan pemetaan, contoh ini memetakan pemilik ke persetujuan operator
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // Internal function to create a random Pizza from string (name) and DNA // Fungsi internal untuk membuat Pizza acak dari string (nama) dan DNA
    function _createPizza(string memory _name, uint256 _dna)
        // The `internal` keyword means this function is only visible // Kata kunci `internal` berarti fungsi ini hanya terlihat
        // within this contract and contracts that derive this contract // di dalam kontrak ini dan kontrak yang diturunkan dari kontrak ini
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` is a function modifier that checks if the pizza already exists // `isUnique` adalah pengubah fungsi yang memeriksa apakah pizza sudah ada
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // Adds Pizza to array of Pizzas and get id // Menambahkan Pizza ke array Pizza dan mendapatkan id
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // Checks that Pizza owner is the same as current user // Memeriksa bahwa pemilik Pizza sama dengan pengguna saat ini
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // note that address(0) is the zero address, // perhatikan bahwa address(0) adalah alamat nol,
        // indicating that pizza[id] is not yet allocated to a particular user. // menunjukkan bahwa pizza[id] belum dialokasikan ke pengguna tertentu.

        assert(pizzaToOwner[id] == address(0));

        // Maps the Pizza to the owner // Memetakan Pizza ke pemilik
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // Creates a random Pizza from string (name) // Membuat Pizza acak dari string (nama)
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // Generates random DNA from string (name) and address of the owner (creator) // Menghasilkan DNA acak dari string (nama) dan alamat pemilik (pembuat)
    function generateRandomDna(string memory _str, address _owner)
        public
        // Functions marked as `pure` promise not to read from or modify the state // Fungsi yang ditandai sebagai `pure` berjanji untuk tidak membaca dari atau memodifikasi state
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // Generates random uint from string (name) + address (owner) // Menghasilkan uint acak dari string (nama) + alamat (pemilik)
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // Returns array of Pizzas found by owner // Mengembalikan array Pizza yang ditemukan oleh pemilik
    function getPizzasByOwner(address _owner)
        public
        // Functions marked as `view` promise not to modify state // Fungsi yang ditandai sebagai `view` berjanji untuk tidak memodifikasi state
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // Uses the `memory` storage location to store values only for the // Menggunakan lokasi penyimpanan `memory` untuk menyimpan nilai hanya untuk
        // lifecycle of this function call. // siklus hidup panggilan fungsi ini.
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
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

    // Transfers Pizza and ownership to other address // Mentransfer Pizza dan kepemilikan ke alamat lain
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // Emits event defined in the imported IERC721 contract // Memancarkan event yang didefinisikan dalam kontrak IERC721 yang diimpor
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /* *
     * Mentransfer kepemilikan ID token yang diberikan dengan aman ke alamat lain
     * Jika alamat target adalah kontrak, ia harus mengimplementasikan `onERC721Received`,
     * yang dipanggil saat transfer aman, dan mengembalikan nilai ajaib
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * jika tidak, transfer akan dikembalikan. */
    /**
     * Safely transfers the ownership of a given token ID to another address
     * If the target address is a contract, it must implement `onERC721Received`,
     * which is called upon a safe transfer, and return the magic value
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * otherwise, the transfer is reverted.
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /* *
     * Mentransfer kepemilikan ID token yang diberikan dengan aman ke alamat lain
     * Jika alamat target adalah kontrak, ia harus mengimplementasikan `onERC721Received`,
     * yang dipanggil saat transfer aman, dan mengembalikan nilai ajaib
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * jika tidak, transfer akan dikembalikan. */
    /**
     * Safely transfers the ownership of a given token ID to another address
     * If the target address is a contract, it must implement `onERC721Received`,
     * which is called upon a safe transfer, and return the magic value
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * otherwise, the transfer is reverted.
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

    /* *
     * Fungsi internal untuk memanggil `onERC721Received` pada alamat target
     * Panggilan tidak dieksekusi jika alamat target bukan kontrak */
    /**
     * Internal function to invoke `onERC721Received` on a target address
     * The call is not executed if the target address is not a contract
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

    // Burns a Pizza - destroys Token completely // Membakar Pizza - menghancurkan Token sepenuhnya
    // The `external` function modifier means this function is // Pengubah fungsi `external` berarti fungsi ini adalah
    // part of the contract interface and other contracts can call it // bagian dari antarmuka kontrak dan kontrak lain dapat memanggilnya
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

    // Returns count of Pizzas by address // Mengembalikan jumlah Pizza berdasarkan alamat
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // Returns owner of the Pizza found by id // Mengembalikan pemilik Pizza yang ditemukan berdasarkan id
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // Approves other address to transfer ownership of Pizza // Menyetujui alamat lain untuk mentransfer kepemilikan Pizza
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // Returns approved address for specific Pizza // Mengembalikan alamat yang disetujui untuk Pizza tertentu
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza does not exist.");
        return pizzaApprovals[_pizzaId];
    }

    /* *
     * Fungsi privat untuk menghapus persetujuan saat ini dari ID token yang diberikan
     * Dikembalikan jika alamat yang diberikan memang bukan pemilik token */
    /**
     * Private function to clear current approval of a given token ID
     * Reverts if the given address is not indeed the owner of the token
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Must be pizza owner.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /* * Mengatur atau membatalkan persetujuan dari operator yang diberikan
     * Operator diizinkan untuk mentransfer semua token pengirim atas nama mereka */
    /*
     * Sets or unsets the approval of a given operator
     * An operator is allowed to transfer all tokens of the sender on their behalf
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // Tells whether an operator is approved by a given owner // Memberi tahu apakah operator disetujui oleh pemilik yang diberikan
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // Takes ownership of Pizza - only for approved users // Mengambil kepemilikan Pizza - hanya untuk pengguna yang disetujui
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // Checks if Pizza exists // Memeriksa apakah Pizza ada
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // Checks if address is owner or is approved to transfer Pizza // Memeriksa apakah alamat adalah pemilik atau disetujui untuk mentransfer Pizza
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // Disable solium check because of // Nonaktifkan pemeriksaan solium karena
        // https://github.com/duaraghav8/Solium/issues/175 // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // Check if Pizza is unique and doesn't exist yet // Periksa apakah Pizza unik dan belum ada
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

    // Returns whether the target address is a contract // Mengembalikan apakah alamat target adalah kontrak
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // Currently there is no better way to check if there is a contract in an address // Saat ini tidak ada cara yang lebih baik untuk memeriksa apakah ada kontrak di sebuah alamat
        // than to check the size of the code at that address. // daripada memeriksa ukuran kode di alamat tersebut.
        // See https://ethereum.stackexchange.com/a/14016/36603 // Lihat https://ethereum.stackexchange.com/a/14016/36603
        // for more details about how this works. // untuk detail lebih lanjut tentang cara kerjanya.
        // TODO Check this again before the Serenity release, because all addresses will be // TODO Periksa ini lagi sebelum rilis Serenity, karena semua alamat akan menjadi
        // contracts then. // kontrak pada saat itu.
        // solium-disable-next-line security/no-inline-assembly // solium-disable-next-line security/no-inline-assembly
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

- [Memperkecil ukuran kontrak untuk mengatasi batas ukuran kontrak](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– Beberapa kiat praktis untuk mengurangi ukuran kontrak pintar Anda._
- [Mencatat data dari kontrak pintar dengan peristiwa](/developers/tutorials/logging-events-smart-contracts/) _– Pengantar peristiwa kontrak pintar dan bagaimana Anda dapat menggunakannya untuk mencatat data._
- [Berinteraksi dengan kontrak lain dari Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Cara menyebarkan kontrak pintar dari kontrak yang ada dan berinteraksi dengannya._