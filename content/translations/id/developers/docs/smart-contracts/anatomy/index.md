---
title: Anatomi kontrak pintar
description: Penjabaran mendalam tentang anatomi kontak cerdas – fungsi, data, dan variabel.
lang: id
---

Kontrak pintar adalah program yang dijalankan pada sebuah alamat di Ethereum. Kontrak pintar terbuat dari data dan fungsi yang bisa dieksekusi saat menerima sebuah transaksi. Berikut adalah gambaran umum dari komponen yang menyusun sebuah kontrak pintar.

## Prasyarat {#prerequisites}

Pastikan Anda telah membaca tentang [kontrak pintar](/developers/docs/smart-contracts/) terlebih dahulu. Dokumen ini menganggap Anda telah terbiasa dengan bahasa pemrograman seperti JavaScript atau Python.

## Data {#data}

Setiap data kontrak harus ditetapkan ke suatu lokasi: baik ke `storage` atau `memory`. Untuk memodifikasi penyimpanan di sebuah kontrak pintar biayanya mahal, jadi Anda perlu mempertimbangkan tempat untuk menyimpan data Anda.

### Penyimpanan {#storage}

Data yang persisten dirujuk sebagai penyimpanan dan diwakilkan oleh variabel state. Nilai-nilai ini disimpan secara permanen di blockchain. Anda perlu mendeklarasikan jenisnya sehingga kontrak bisa tetap melacak kapasitas penyimpanan pada blockchain yang diperlukan kontrak ketika dikompilasi.

```solidity
// Contoh Solidity
contract SimpleStorage {
    uint storedData; // State variable
    // ...
}
```

```python
# Vyper example
storedData: int128
```

Jika Anda telah memprogram bahasa yang berorientasi objek, Anda mungkin akan lebih mengenal sebagian besar jenisnya. Namun `address` mungkin terdengar asing jika Anda seorang pengembang pemula di Ethereum.

Suatu jenis `address` bisa menampung alamat Ethereum yang setara dengan 20 bita atau 160 bit. Alamat kembali dalam notasi heksadesimal dengan awalan 0x.

Jenis lainnya meliputi:

- boolean
- bilangan bulat
- angka poin tetap
- array bita berukuran tetap
- array bita berukuran dinamis
- Literal rasional dan bilangan bulat
- Literal string
- Literal heksadesimal
- Enum

Untuk penjelasan lebih lanjut, lihat dokumen:

- [Lihat jenis Vyper](https://vyper.readthedocs.io/en/v0.1.0-beta.6/types.html#value-types)
- [Lihat jenis Solidity](https://solidity.readthedocs.io/en/latest/types.html#value-types)

### Memori {#memory}

Nilai yang hanya disimpan selama masa eksekusi fungsi kontrak disebut variabel memori. Karena nilai ini tidak disimpan secara permanen di blockchain, lebih murah untuk digunakan.

Pelajari selengkapnya tentang cara EVM menyimpan data (Penyimpanan, Memori, dan Tumpukan) di [dokumen Solidity](https://solidity.readthedocs.io/en/latest/introduction-to-smart-contracts.html?highlight=memory#storage-memory-and-the-stack).

### Variabel lingkungan {#environment-variables}

Selain variabel yang Anda tetapkan pada kontrak, ada beberapa variabel global khusus. Variabel ini terutama digunakan untuk memberikan informasi tentang blockchain atau transaksi saat ini.

Contoh:

| **Prop**          | **Variabel state** | **Deskripsi**                         |
| ----------------- | ------------------ | ------------------------------------- |
| `block.timestamp` | uint256            | Stempel waktu epoch blok saat ini     |
| `msg.sender`      | alamat             | Pengirim pesan (pemanggilan saat ini) |

## Fungsi {#functions}

Dalam istilah yang paling sederhana, fungsi bisa mendapatkan informasi atau mengatur informasi dalam menanggapi transaksi yang masuk.

Ada dua jenis pemanggilan fungsi:

- `internal` - ini tidak menghasilkan pemanggilan EVM
  - Fungsi internal dan variabel state hanya bisa diakses secara internal (yaitu dari dalam kontrak saat ini atau kontrak yang diturunkan darinya)
- `external` - ini menghasilkan pemanggilan EVM
  - Fungsi eksternal adalah bagian dari antarmuka kontrak, yang berarti bisa dipanggil dari kontrak lain dan melalui transaksi. Fungsi eksternal `f` tidak bisa dipanggil secara internal (yaitu `f()` tidak berfungsi, tapi `this.f()` dapat berfungsi).

Fungsi pemanggilan juga bisa bersifat `public` atau `private`

- Fungsi `public` bisa dipanggil secara internal dari dalam kontrak atau secara eksternal melalui message
- Fungsi `private` hanya terlihat untuk kontrak yang ditetapkan di dalam dan bukan dalam kontrak turunan

Kedua fungsi dan variabel state ini bisa dibuat menjadi publik atau privat

Berikut adalah fungsi untuk memperbarui variabel state dalam sebuah kontrak:

```solidity
// Contoh Solidity
function update_name(string value) public {
    dapp_name = value;
}
```

- `Nilai` parameter dari `string` jenis diteruskan ke dalam fungsi: `update_name`
- Fungsi dideklarasikan sebagai `public`, berarti siapa pun bisa mengaksesnya
- Fungsi tidak dideklarasikan sebagai `view`, sehingga bisa memodifikasi state kontrak

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
2. [Menerbitkan aksi](https://solidity.readthedocs.io/en/v0.7.0/contracts.html#events).
3. [Membuat kontrak lain](https://solidity.readthedocs.io/en/v0.7.0/control-structures.html#creating-contracts).
4. Menggunakan `selfdestruct`.
5. Mengirim eter melalui panggilan.
6. Memanggil fungsi apa pun yang tidak bertanda `view` atau `pure`.
7. Menggunakan pemanggilan level rendah.
8. Menggunakan perakitan sebaris yang berisi opcode tertentu.

### Fungsi pembangun {#constructor-functions}

Fungsi `constructor` hanya dijalankan sekali saat kontrak digunakan untuk pertama kalinya. Seperti `constructor` di banyak bahasa pemrograman berbasis kelas, fungsi ini sering menjalankan variabel state sesuai dengan nilai yang telah ditentukan.

```solidity
// Contoh Solidity
// Jalankan data kontrak, siapkan `pemilik`
// sesuai dengan alamat dari pembuat kontrak.
constructor() public {
    // Semua kontrak pintar bergantung pada transaksi eksternal untuk memicu fungsinya.
    // `msg` adalah sebuah variabel global yang mencakup data relevan sesuai dengan transaksi yang telah disiapkan,
    // seperti alamat dari pengirim dan nilai ETH yang termasuk dalam transaksi.
    // Pelajari lebih banyak: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
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
    string dapp_name; // state variable

    // Dipanggil saat kontrak disebarkan dan jalankan nilai
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // Fungsi Get
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Tetapkan Fungsi
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

Sebuah kontrak lengkap mungkin tampak seperti ini. Di sini, fungsi `constructor` menyediakan nilai awal untuk variabel `dapp_name`.

## Aksi dan log {#events-and-logs}

Aksi memungkinkan Anda berkomunikasi dengan kontrak pintar dari frontend Anda atau aplikasi berbayar lainnya. Ketika sebuah transaksi ditambang, kontrak pintar bisa menerbitkan aksi dan menulis log pada blockchain yang kemudian dapat diproses frontend.

## Contoh dengan anotasi {#annotated-examples}

Ini adalah beberapa contoh yang ditulis dalam Solidity. Jika Anda ingin bermain dengan kode tersebut, Anda dapat berinteraksi dengannya di [Remix](http://remix.ethereum.org).

### Hello world {#hello-world}

```solidity
// Tentukan versi Solidity, gunakan pembuatan versi semantik.
// Pelajari lebih banyak: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// Tentukan sebuah kontak bernama `HaloDunia`.
// Satu kontrak adalah koleksi dari fungsi dan data (statenya).
// Setelah disebarkan, sebuah kontrak tinggal di alamat spesifik pada blockchain Ethereum.
// Pelajari lebih banyak: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // Deklarasikan `message` variabel state dari `string` tipe.
    // Variabel state adalah variabel yang nilainya secara permanen disimpan dalam penyimpanan kontrak.
    // Kata kunci `publik` membuat variabel dapat diakses dari luar kontrak
    //dan menciptakan fungsi yang dengannya kontrak atau klien lain bisa memanggil untuk mengakses nilai.
    string public message;

    // Sama seperti banyak bahasa berorientasi objek yang berbasis kelas, sebuah pembangun adalah
    // sebuah fungsi spesial yang hanya dieksekusi saat pembuatan kontrak.
    // Pembangun digunakan untuk menjalankan data kontrak.
    // Pelajari lebih banyak: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // Menerima satu argumen string `initMessage` dan tetapkan nilai
        // ke dalam variabel penyimpanan `message` kontrak).
        message = initMessage;
    }

    // Sebuah fungsi publik yang menerima argumen string
    // dan memperbarui variabel penyimpanan`message`.
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### Token {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    //Sebuah `alamat` dapat disamakan dengan sebuah alamat email - ia digunakan untuk mengidentifikasi sebuah akun di Ethereum.
    // Alamat bisa mewakilkan sebuah kontrak pintar atau satu akun (pengguna) eksternal.
    // Pelajari lebih banyak: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // Sebuah `mapping` adalah satu struktur data tabel hash.
    // `mapping` ini menetapkan sebuah integer yang tidak ditentukan (saldo token) pada sebuah alamat (pemilik token).
    // Pelajari lebih banyak: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // Aksi memungkinkan logging aktivitas pada blockchain.
    // Klien Ethereum bisa mendengarkan aksi untuk bereaksi dengan perubahan state kontrak.
    // Pelajari lebih banyak: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // Jalankan data kontrak, siapkan `pemilik`
    // di alamat dari pembuat kontrak.
    constructor() public {
        // Semua kontrak pintar bergantung pada transaksi eksternal untuk memicu fungsinya.
        // `msg` adalah sebuah variabel global yang telah mencakup data relevan sesuai dengan transaksi yang telah disiapkan,
        // seperti alamat dari pengirim dan nilai ETH yang termasuk dalam transaksi.
        // Pelajari lebih banyak: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // Membuat sejumlah token baru dan mengirimkan mereka ke satu alamat.
    function mint(address receiver, uint amount) public {
        // `require` is struktur kontrol yang digunakan untuk melaksanakan kondisi tertentu.
        // Jika sebuah pernyataan `require` mengevaluasi ke `palsu`, satu pengecualian terpicu,
        // yang membalikkan semua perubahan yang dibuat pada state selama pemanggilan saat ini.
        //Pelajari lebih banyak: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // Hanya pemilik kontrak yang bisa memanggil fungsi ini
        require(msg.sender == owner, "You are not the owner.");

        // Melaksanakan sejumlah maksimum token
        require(amount < 1e60, "Maximum issuance exceeded");

        // Meningkatkan saldo dari `receiver` dalam `amount`
        balances[receiver] += amount;
    }

    // Mengirim sejumlah token yang ada dari pemanggil manapun ke satu alamat.
    function transfer(address receiver, uint amount) public {
        // Pengirim harus punya token cukup untuk mengirim
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // Sesuaikan saldo token dari dua alamat
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // Terbitkan aksi yang telah ditentukan sebelumnya
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### Aset digital unik {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// Impor simbol dari berkas lain ke dalam kontrak saat ini.
// Dalam kasus ini, sejumlah kontrak penolong dari OpenZeppelin.
// Pelajari lebih banyak: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// Kata kunci `is` digunakan untuk mewarisi fungsi dan kata kunci dari kontrak eksternal.
// Dalam kasus ini, `CryptoPizza` mewarisi dari kontrak `IERC721` dan `ERC165`.
// Pelajari lebih banyak: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // Gunakan pustaka Safe Math OpenZeppelin untuk melakukan operasi aritmatika dengan aman.
    // Pelajari lebih banyak: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Variabel state konstan di Solidity sama dengan bahasa lainnya
    // tapi Anda harus menetapkan satu ekpresi yang konstan pada waktu pengompilasian.
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Struct types let you define your own type
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Creates an empty array of Pizza structs
    Pizza[] public pizzas;

    // Mapping from pizza ID to its owner's address
    mapping(uint256 => address) public pizzaToOwner;

    // Mapping from owner's address to number of owned token
    mapping(address => uint256) public ownerPizzaCount;

    // Mapping from token ID to approved address
    mapping(uint256 => address) pizzaApprovals;

    // You can nest mappings, this example maps owner to operator approvals
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // Internal function to create a random Pizza from string (name) and DNA
    function _createPizza(string memory _name, uint256 _dna)
        // The `internal` keyword means this function is only visible
        // within this contract and contracts that derive this contract
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` is a function modifier that checks if the pizza already exists
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // Adds Pizza to array of Pizzas and get id
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // Checks that Pizza owner is the same as current user
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // note that address(0) is the zero address,
        // indicating that pizza[id] is not yet allocated to a particular user.

        assert(pizzaToOwner[id] == address(0));

        // Maps the Pizza to the owner
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // Creates a random Pizza from string (name)
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // Generates random DNA from string (name) and address of the owner (creator)
    function generateRandomDna(string memory _str, address _owner)
        public
        // Functions marked as `pure` promise not to read from or modify the state
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // Generates random uint from string (name) + address (owner)
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // Returns array of Pizzas found by owner
    function getPizzasByOwner(address _owner)
        public
        // Functions marked as `view` promise not to modify state
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // Uses the `memory` storage location to store values only for the
        // lifecycle of this function call.
        // Pelajari lebih banyak: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
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

        // Terbitkan aksi yang ditentukan di kontrak IERC721 yang diimpor
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * Transfer dengan aman kepemilikan dari ID token yang disediakan ke alamat lain
     * Jika alamat target adalah sebuah kontrak, ia harus mengimplementasi ``onERC721Received`,
     * yang dipanggil saat satu transfer aman, dan mengembalikan nilai ajaib
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * jika tidak, transfer dibalikkan.
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * Transfer dengan aman kepemilikan dari ID token yang disediakan ke alamat lain
     * Jika alamat target adalah satu kontrak, ia harus mengimplementasi `onERC721Received`,
     * yang dipanggil saat satu transfer aman, dan mengembalikan nilai ajaib
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * jika tidak, transfer dibalikkan.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) public {
        this.transferFrom(from, to, pizzaId);
        require(_checkOnERC721Received(from, to, pizzaId, _data), "Must implmement onERC721Received.");
    }

    /**
     * Fungsi internal untuk memohon `onERC721Received` pada satu alamat target
     * Pemanggilan tidak dieksekusi jika alamat target bukan sebuah kontrak
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

    // Bakar satu Pizza - hancurkan Token secara total
    // Modifier fungsi `external` berarti fungsi ini adalah
    // bagian dari antarmuka kontrak dan kontrak lain bisa memanggilnya
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

    // Kembalikan penghitungan Pizza lewat alamat
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // Kembalikan pemilik Pizza yang ditemukan id
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // Setujui alamat lain untuk mentransfer kepemilikan Pizza
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // Kembalikan alamat yang disetujui untuk Pizza spesifik
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza does not exist.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * Fungsi privat untuk menghapus persetujuan saat ini dari ID token yang disediakan
     * Balikkan jika alamat yang disediakan memang bukan pemilik token
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Must be pizza owner.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * Siapkan atau batalkan persetujuan untuk operator yang disediakan
     * Seorang operator diizinkan untuk mentransfer semua token dari pengirim atas nama mereka
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // Beritahu apakah seorang operator disetujui oleh seorang pemilik yang disediakan
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // Ambil kepemilikan Pizza - hanya untuk pengguna yang disetujui
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // Periksa apakah Pizza ada
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // Periksa apakah alamat adalah pemilik atau disetujui untuk mentransfer Pizza
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // Disable solium check because of
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // Periksa apakah Pizza unik dan belum ada sama sekali
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

    // Kembalikan apakah alamat target adalah sebuah kontrak
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // Currently there is no better way to check if there is a contract in an address
        // than to check the size of the code at that address.
        // Kunjungi https://ethereum.stackexchange.com/a/14016/36603
        // untuk lebih banyak detail tentang bagaimana ini bekerja.
        // UNTUK DILAKUKAN Periksa ini lagi sebelum pelepasan Serenity, karena semua alamat akan menjadi
        // kontrak kemudian.
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

- [Solidity](https://solidity.readthedocs.io/)
- [Vyper](https://vyper.readthedocs.io/)

## Topik terkait {#related-topics}

- [Kontrak pintar](/developers/docs/smart-contracts/)
- [Mesin Virtual Ethereum](/developers/docs/evm/)

## Tutorial terkait {#related-tutorials}

- [Memperkecil kontrak untuk mengatasi batas ukuran kontrak](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– Beberapa tips praktis untuk mengurangi ukuran kontrak pintar Anda._
- [Pembuatan log data dari kontrak pintar dengan aksi](/developers/tutorials/logging-events-smart-contracts/) _– Pengantar aksi kontrak pintar dan cara menggunakannya untuk log data._
- [Berinteraksi dengan kontrak lain dari Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Cara menggunakan kontrak pintar dari kontrak yang sudah ada dan berinteraksi dengan kontrak pintar tersebut._
