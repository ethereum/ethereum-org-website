---
title: Akıllı sözleşmelerin anatomisi
description: Akıllı bir sözleşmenin anatomisine derinlemesine bir bakış - fonksiyonlar, veriler ve değişkenler.
lang: tr
---

Bir akıllı sözleşme Ethereum üzerindeki bir adreste çalışan bir programdır. Bir işlem alındığında yürütülebilen fonksiyonlar ve verilerden oluşurlar. Burada bir akıllı sözleşmenin nelerden oluştuğu hakkında genel bir bakış bulunmaktadır.

## Ön koşullar {#prerequisites}

İlk olarak [akıllı sözleşmeler](/developers/docs/smart-contracts/) hakkında okuduğunuzdan emin olun. Bu belge, hâlihazırda JavaScript veya Python gibi programlama dillerine aşina olduğunuzu varsayar.

## Veriler {#data}

Her sözleşme verisi bir lokasyona atanmalıdır: ya `storage` ya da `memory`. Bir akıllı sözleşmede depolamayı değiştirmek pahalıdır, bundan dolayı verinizin nerede yaşayacağını düşünmelisiniz.

### Depolama {#storage}

Kalıcı veriden depolama olarak bahsedilir ve durum değişkenleri tarafından temsil edilir. Bu değerler kalıcı olarak blok zincirinde depolanır. Sözleşmenin derlendiğinde blok zincirinde ne kadar depolama ihtiyacı duyacağını takip edebilmesi için türünü deklare etmelisiniz.

```solidity
// Solidity example
contract SimpleStorage {
    uint storedData; // State variable
    // ...
}
```

```python
# Vyper example
storedData: int128
```

Hâlihazırda nesne odaklı dillerde programlama yaptıysanız, büyük ihtimalle çoğu türe aşinasınızdır. Ancak eğer Ethereum geliştirme konusunda acemiyseniz `address` türünü pek görmemişsinizdir.

Bir `address` türü 20 bayt veya 160 bite eşit olan bir Ethereum adresi tutabilir. Önünde 0x olan onaltılık gösterim şeklinde döndürür.

Diğer türler:

- boolean
- tam sayı
- sabit noktalı sayılar
- sabit boyutlu bayt dizileri
- dinamik olarak boyutlandırılmış bayt dizileri
- Rasyonel ve tam sayı sabitleri
- Metin değişmezleri
- Değişmez onaltılıklar
- Sıralamalar

Daha fazla açıklama için belgelere göz atın:

- [Vyper türlerini gör](https://vyper.readthedocs.io/en/v0.1.0-beta.6/types.html#value-types)
- [Solidity türlerini gör](https://solidity.readthedocs.io/en/latest/types.html#value-types)

### Bellek {#memory}

Sadece bir sözleşme fonksiyonunun yürütümü esnasında depolanan değerlere bellek değişkenleri denir. Bunlar blok zincirinde kalıcı şekilde depolanmadıkları için kullanımları çok daha ucuzdur.

[Solidity belgelerinden](https://solidity.readthedocs.io/en/latest/introduction-to-smart-contracts.html?highlight=memory#storage-memory-and-the-stack) EVM'nin nasıl veri depoladığıyla (Depolama, Bellek ve Yığın) ilgili daha fazla bilgi edinin.

### Ortam değişkenleri {#environment-variables}

Sözleşmenizde tanımladığınız değişkenlere ek olarak, bazı özel global değişkenler bulunmaktadır. Başlıca blok zinciri veya mevcut işlem hakkında bilgi sağlamak için kullanılırlar.

Örnekler:

| **Özellik**       | **Durum değişkeni** | **Açıklama**                       |
| ----------------- | ------------------- | ---------------------------------- |
| `block.timestamp` | uint256             | Mevcut blok dönemi zaman damgası   |
| `msg.sender`      | adres               | Mesajın göndericisi (mevcut çağrı) |

## Fonksiyonlar {#functions}

En basit şekilde, fonksiyonlar gelen işlemlere yanıt olarak bilgi alabilir veya düzenleyebilir.

İki tip fonksiyon çağrısı bulunur:

- `internal` – bunlar bir EVM çağrısı oluşturmazlar
  - Internal fonksiyonlar ve durum değişkenleri sadece içten erişilebilir (yani mevcut sözleşmeden veya ondan türemiş sözleşmelerden)
- `external` – bunlar bir EVM çağrısı oluştururlar
  - External fonksiyonlar sözleşme arayüzünün bir parçasıdır, bu da diğer sözleşmelerden ve işlemler aracılığıyla çağrılabilecekleri anlamına gelir. Bir external fonksiyon olan `f` içten çağrılamaz (yani `f()` çalışmaz ama `this.f()` çalışır).

Ayrıca `public` veya `private` olabilirler

- `public` fonksiyonları sözleşmenin içinden veya mesajlar aracılığıyla çağrılabilirler
- `private` fonksiyonları sadece tanımlandıkları sözleşmede mevcutturlar ve türetilmiş sözleşmelerde olmazlar

Hem fonksiyonlar hem de durum değişkenleri public veya private yapılabilir

Burada bir sözleşmedeki bir durum değişkenini güncellemek için bir fonksiyon bulunmaktadır:

```solidity
// Solidity example
function update_name(string value) public {
    dapp_name = value;
}
```

- `string` türünün `value` parametresi müteakip fonksiyona geçirilir: `update_name`
- `public` olarak deklare edilir, bu da herkesin ona erişebileceği anlamına gelir
- `view` olarak deklare edilmez, yani sözleşme durumunu değiştirebilir

### Fonksiyonları görüntüleme {#view-functions}

Bu fonksiyonlar sözleşmenin verisinin durumunu değiştirmemeye söz verirler. Yaygın örnekler "alıcı" fonksiyonlardır – örnek olarak bunu bir kullanıcının bakiyesini almak için kullanabilirsiniz.

```solidity
// Solidity example
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

Durumu değiştirme olarak sayılan şeyler:

1. Değişkenlikleri belirtmek için yazma.
2. [Olaylar yayınlama](https://solidity.readthedocs.io/en/v0.7.0/contracts.html#events).
3. [Başka sözleşmeler oluşturma](https://solidity.readthedocs.io/en/v0.7.0/control-structures.html#creating-contracts).
4. Müteakip komutun kullanımı, `selfdestruct`.
5. Çağrılar aracılığıyla ether gönderme.
6. İşareti `view` ya da `pure` olmayan herhangi bir fonksiyonu çağırma.
7. Alt düzey çağrıları kullanma.
8. Belirli işlem kodları içeren satır içi tümleşkeler kullanma.

### Yapıcı fonksiyonları {#constructor-functions}

`constructor` fonksiyonları sadece sözleşme ilk dağıtılığında tek sefer yürütülür. Birçok sınıf odaklı programlama dilinde olan `constructor` gibi, bu fonksiyonlar genellikle durum değişkenlerini belirtilmiş değerlere ilkler.

```solidity
// Solidity example
// Initializes the contract's data, setting the `owner`
// to the address of the contract creator.
constructor() public {
    // All smart contracts rely on external transactions to trigger its functions.
    // `msg` is a global variable that includes relevant data on the given transaction,
    // such as the address of the sender and the ETH value included in the transaction.
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# Vyper example

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### Yerleşik fonksiyonlar {#built-in-functions}

Sözleşmenizde tanımladığınız değişkenler ve fonksiyonlara ek olarak, bazı özel yerleşik fonksiyonlar bulunmaktadır. En bariz örnek şudur:

- `address.send()` – Solidity
- `send(address)` – Vyper

Bunlar sözleşmelerin başka hesaplara ETH göndermesini sağlar.

## Fonksiyonları yazma {#writing-functions}

Fonksiyonunuz şunlara ihtiyaç duyar:

- parametre değişkeni ve türü (eğer parametre kabul ediyorsa)
- internal/external deklarasyonu
- pure/view/payable deklarasyonu
- dönüş türü (eğer bir değer döndürüyorsa)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // state variable

    // Called when the contract is deployed and initializes the value
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // Get Function
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Set Function
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

Tam bir sözleşme bu şekilde gözükebilir. Burada `constructor` fonksiyonu `dapp_name` değişkeni için bir başlangıç değeri sağlıyor.

## Olaylar ve günlükler {#events-and-logs}

Olaylar, akıllı sözleşmelerinizin ön yüzünüz ya da diğer abonelik uygulamalarınızla iletişime geçebilmesini sağlar. Bir işlem doğrulandıktan ve bir bloğa eklendikten sonra akıllı sözleşmeler, ön ucun daha sonra işleyebileceği ve kullanabileceği olayları ve günlük bilgilerini yayabilir.

## Açıklamalı örnekler {#annotated-examples}

Bunlar Solidity ile yazılmış bazı örneklerdir. Eğer kodlarla oynamak isterseniz, onlarla [Remix](http://remix.ethereum.org) içinde etkileşime geçebilirsiniz.

### Merhaba dünya {#hello-world}

```solidity
// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state).
// Once deployed, a contract resides at a specific address on the Ethereum blockchain.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // Declares a state variable `message` of type `string`.
    // State variables are variables whose values are permanently stored in contract storage.
    // The keyword `public` makes variables accessible from outside a contract
    // and creates a function that other contracts or clients can call to access the value.
    string public message;

    // Similar to many class-based object-oriented languages, a constructor is
    // a special function that is only executed upon contract creation.
    // Constructors are used to initialize the contract's data.
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // Accepts a string argument `initMessage` and sets the value
        // into the contract's `message` storage variable).
        message = initMessage;
    }

    // A public function that accepts a string argument
    // and updates the `message` storage variable.
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### Jeton {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // An `address` is comparable to an email address - it's used to identify an account on Ethereum.
    // Addresses can represent a smart contract or an external (user) accounts.
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // A `mapping` is essentially a hash table data structure.
    // This `mapping` assigns an unsigned integer (the token balance) to an address (the token holder).
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // Events allow for logging of activity on the blockchain.
    // Ethereum clients can listen for events in order to react to contract state changes.
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // Initializes the contract's data, setting the `owner`
    // to the address of the contract creator.
    constructor() public {
        // All smart contracts rely on external transactions to trigger its functions.
        // `msg` is a global variable that includes relevant data on the given transaction,
        // such as the address of the sender and the ETH value included in the transaction.
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // Creates an amount of new tokens and sends them to an address.
    function mint(address receiver, uint amount) public {
        // `require` is a control structure used to enforce certain conditions.
        // If a `require` statement evaluates to `false`, an exception is triggered,
        // which reverts all changes made to the state during the current call.
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // Only the contract owner can call this function
        require(msg.sender == owner, "You are not the owner.");

        // Enforces a maximum amount of tokens
        require(amount < 1e60, "Maximum issuance exceeded");

        // Increases the balance of `receiver` by `amount`
        balances[receiver] += amount;
    }

    // Sends an amount of existing tokens from any caller to an address.
    function transfer(address receiver, uint amount) public {
        // The sender must have enough tokens to send
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // Adjusts token balances of the two addresses
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // Emits the event defined earlier
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### Benzersiz dijital varlık {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// Imports symbols from other files into the current contract.
// In this case, a series of helper contracts from OpenZeppelin.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// The `is` keyword is used to inherit functions and keywords from external contracts.
// In this case, `CryptoPizza` inherits from the `IERC721` and `ERC165` contracts.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // Uses OpenZeppelin's SafeMath library to perform arithmetic operations safely.
    // Learn more: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Constant state variables in Solidity are similar to other languages
    // but you must assign from an expression which is constant at compile time.
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
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
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

    // Transfers Pizza and ownership to other address
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // Emits event defined in the imported IERC721 contract
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

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
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

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

    // Burns a Pizza - destroys Token completely
    // The `external` function modifier means this function is
    // part of the contract interface and other contracts can call it
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

    // Returns count of Pizzas by address
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // Returns owner of the Pizza found by id
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // Approves other address to transfer ownership of Pizza
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // Returns approved address for specific Pizza
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza does not exist.");
        return pizzaApprovals[_pizzaId];
    }

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

    /*
     * Sets or unsets the approval of a given operator
     * An operator is allowed to transfer all tokens of the sender on their behalf
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // Tells whether an operator is approved by a given owner
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // Takes ownership of Pizza - only for approved users
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // Checks if Pizza exists
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // Checks if address is owner or is approved to transfer Pizza
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

    // Check if Pizza is unique and doesn't exist yet
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

    // Returns whether the target address is a contract
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // Currently there is no better way to check if there is a contract in an address
        // than to check the size of the code at that address.
        // Bunun nasıl çalıştığı hakkında daha fazla ayrıntı için
        // bkz. https://ethereum.stackexchange.com/a/14016/36603.
        // Serenity sürümünden önce bunu tekrar kontrol edin, 
        // çünkü o zaman tüm adresler sözleşme olacaktır.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## Daha fazla bilgi {#further-reading}

Akıllı sözleşmelere daha detaylı bir genel bakış için Solidity ve Vyper'ın belgelerine bakın:

- [Solidity](https://solidity.readthedocs.io/)
- [Vyper](https://vyper.readthedocs.io/)

## İlgili konular {#related-topics}

- [Akıllı sözleşmeler](/developers/docs/smart-contracts/)
- [Ethereum Sanal Makinesi](/developers/docs/evm/)

## İlgili öğreticiler {#related-tutorials}

- [Sözleşme boyut limitiyle savaşmak için sözleşmelerin boyutunu azaltma](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– Akıllı sözleşmenizin boyutunu küçültmek için bazı pratik ipuçları._
- [Olaylar ile akıllı sözleşmelerden veri kaydetme](/developers/tutorials/logging-events-smart-contracts/) _– Akıllı sözleşme olaylarına ve onları veri kaydetmek için nasıl kullanabileceğinize bir giriş._
- [Solidity ile başka sözleşmelerle etkileşime geçmek](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Mevcut bir sözleşmeden nasıl bir akıllı sözleşme dağıtılır ve etkileşime geçilir._
