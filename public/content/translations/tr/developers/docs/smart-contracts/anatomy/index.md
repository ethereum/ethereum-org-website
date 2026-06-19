---
title: "Akıllı sözleşmelerin anatomisi"
description: "Bir akıllı sözleşmenin anatomisine derinlemesine bir bakış – işlevler, veriler ve değişkenler."
lang: tr
---

Bir akıllı sözleşme, Ethereum üzerindeki bir adreste çalışan bir programdır. Bir işlem alındığında yürütülebilen veriler ve işlevlerden oluşurlar. İşte bir akıllı sözleşmeyi nelerin oluşturduğuna dair bir genel bakış.

## Ön koşullar {#prerequisites}

Önce [akıllı sözleşmeler](/developers/docs/smart-contracts/) hakkında okuduğunuzdan emin olun. Bu belge, JavaScript veya Python gibi programlama dillerine zaten aşina olduğunuzu varsayar.

## Veriler {#data}

Herhangi bir sözleşme verisi bir konuma atanmalıdır: `storage` veya `memory`. Bir akıllı sözleşmede depolamayı değiştirmek maliyetlidir, bu nedenle verilerinizin nerede yaşaması gerektiğini düşünmeniz gerekir.

### Depolama {#storage}

Kalıcı veriler depolama olarak adlandırılır ve durum değişkenleri ile temsil edilir. Bu değerler Blokzincir üzerinde kalıcı olarak depolanır. Sözleşmenin derlendiğinde Blokzincir üzerinde ne kadar depolamaya ihtiyacı olduğunu takip edebilmesi için türü bildirmeniz gerekir.

```solidity
// Solidity örneği
contract SimpleStorage {
    uint storedData; // Durum değişkeni
    // ...
}
```

```python
# Vyper örneği
storedData: int128
```

Nesne yönelimli dillerde zaten programlama yaptıysanız, muhtemelen çoğu türe aşinasınızdır. Ancak, [Ethereum](/) geliştirmeye yeniyseniz `address` sizin için yeni olmalıdır.

Bir `address` türü, 20 bayt veya 160 bite eşit olan bir Ethereum adresi tutabilir. Başında 0x bulunan onaltılık (hexadecimal) gösterimde döner.

Diğer türler şunları içerir:

- boolean (mantıksal)
- tam sayı (integer)
- sabit noktalı sayılar
- sabit boyutlu bayt dizileri
- dinamik boyutlu bayt dizileri
- rasyonel ve tam sayı sabitleri (literals)
- dize (string) sabitleri
- onaltılık (hexadecimal) sabitler
- enum'lar (numaralandırmalar)

Daha fazla açıklama için belgelere göz atın:

- [Vyper türlerine bakın](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [Solidity türlerine bakın](https://docs.soliditylang.org/en/latest/types.html#value-types)

### Bellek {#memory}

Yalnızca bir sözleşme işlevinin yürütülme ömrü boyunca depolanan değerlere bellek değişkenleri denir. Bunlar Blokzincir üzerinde kalıcı olarak depolanmadığından, kullanımları çok daha ucuzdur.

Ethereum Sanal Makinesi (EVM)'nin verileri nasıl depoladığı (Depolama, Bellek ve Yığın) hakkında daha fazla bilgiyi [Solidity belgelerinde](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack) öğrenebilirsiniz.

### Ortam değişkenleri {#environment-variables}

Sözleşmenizde tanımladığınız değişkenlere ek olarak, bazı özel küresel değişkenler vardır. Bunlar öncelikle Blokzincir veya mevcut işlem hakkında bilgi sağlamak için kullanılır.

Örnekler:

| **Özellik**          | **Durum değişkeni** | **Açıklama**                      |
| ----------------- | ------------------ | ------------------------------------ |
| `block.timestamp` | uint256            | Mevcut blok dönem zaman damgası        |
| `msg.sender`      | address            | Mesajın göndericisi (mevcut çağrı) |

## İşlevler {#functions}

En basit ifadeyle işlevler, gelen işlemlere yanıt olarak bilgi alabilir veya bilgi ayarlayabilir.

İki tür işlev çağrısı vardır:

- `internal` – bunlar bir EVM çağrısı oluşturmaz
  - Dahili işlevlere ve durum değişkenlerine yalnızca dahili olarak (yani, mevcut sözleşmenin içinden veya ondan türetilen sözleşmelerden) erişilebilir
- `external` – bunlar bir EVM çağrısı oluşturur
  - Harici işlevler sözleşme arayüzünün bir parçasıdır, bu da diğer sözleşmelerden ve işlemler aracılığıyla çağrılabilecekleri anlamına gelir. Harici bir `f` işlevi dahili olarak çağrılamaz (yani, `f()` çalışmaz, ancak `this.f()` çalışır).

Ayrıca `public` veya `private` olabilirler

- `public` işlevleri sözleşme içinden dahili olarak veya mesajlar aracılığıyla harici olarak çağrılabilir
- `private` işlevleri yalnızca tanımlandıkları sözleşme için görünürdür ve türetilmiş sözleşmelerde görünmez

Hem işlevler hem de durum değişkenleri genel (public) veya özel (private) yapılabilir

İşte bir sözleşmedeki bir durum değişkenini güncellemek için bir işlev:

```solidity
// Solidity örneği
function update_name(string value) public {
    dapp_name = value;
}
```

- `string` türündeki `value` parametresi işleve geçirilir: `update_name`
- `public` olarak bildirilmiştir, yani herkes erişebilir
- `view` olarak bildirilmemiştir, bu nedenle sözleşme durumunu değiştirebilir

### View (Görüntüleme) işlevleri {#view-functions}

Bu işlevler, sözleşme verilerinin durumunu değiştirmemeyi taahhüt eder. Yaygın örnekler "getter" (alıcı) işlevleridir – örneğin bunu bir kullanıcının bakiyesini almak için kullanabilirsiniz.

```solidity
// Solidity örneği
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

Durumu değiştirmek olarak kabul edilenler:

1. Durum değişkenlerine yazmak.
2. [Olaylar yaymak](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events).
3. [Başka sözleşmeler oluşturmak](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts).
4. `selfdestruct` kullanmak.
5. Çağrılar aracılığıyla Ether göndermek.
6. `view` veya `pure` olarak işaretlenmemiş herhangi bir işlevi çağırmak.
7. Düşük seviyeli çağrılar kullanmak.
8. Belirli işlem kodlarını (opcodes) içeren satır içi (inline) assembly kullanmak.

### Kurucu işlevler {#constructor-functions}

`constructor` işlevleri, sözleşme ilk dağıtıldığında yalnızca bir kez yürütülür. Sınıf tabanlı birçok programlama dilindeki `constructor` gibi, bu işlevler genellikle durum değişkenlerini belirtilen değerlerine başlatır.

```solidity
// Solidity örneği
// Sözleşmenin verilerini başlatır, `owner` değerini
// sözleşme oluşturucusunun adresine ayarlar.
constructor() public {
    // Tüm akıllı sözleşmeler, işlevlerini tetiklemek için harici işlemlere güvenir.
    // `msg`, verilen işlemle ilgili verileri içeren küresel bir değişkendir,
    // gönderenin adresi ve işleme dahil edilen ETH değeri gibi.
    // Daha fazla bilgi edinin: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# Vyper örneği

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### Yerleşik işlevler {#built-in-functions}

Sözleşmenizde tanımladığınız değişkenlere ve işlevlere ek olarak, bazı özel yerleşik işlevler vardır. En belirgin örnek şudur:

- `address.send()` – Solidity
- `send(address)` – Vyper

Bunlar, sözleşmelerin diğer hesaplara ETH göndermesine olanak tanır.

## İşlevler yazmak {#writing-functions}

İşlevinizin şunlara ihtiyacı vardır:

- parametre değişkeni ve türü (parametre kabul ediyorsa)
- internal/external (dahili/harici) bildirimi
- pure/view/payable bildirimi
- dönüş türü (bir değer döndürüyorsa)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // durum değişkeni

    // Sözleşme dağıtıldığında çağrılır ve değeri başlatır
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // Get İşlevi
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Set İşlevi
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

Tam bir sözleşme buna benzer bir şey olabilir. Burada `constructor` işlevi, `dapp_name` değişkeni için bir başlangıç değeri sağlar.

## Olaylar ve günlükler {#events-and-logs}

Olaylar, akıllı sözleşmenizin ön yüzünüzle veya abone olan diğer uygulamalarla iletişim kurmasını sağlar. Bir işlem doğrulanıp bir bloğa eklendiğinde, akıllı sözleşmeler olaylar yayabilir ve bilgileri günlüğe kaydedebilir; ön yüz daha sonra bunları işleyebilir ve kullanabilir.

## Açıklamalı örnekler {#annotated-examples}

Bunlar Solidity ile yazılmış bazı örneklerdir. Kodla oynamak isterseniz, onlarla [Remix](https://remix.ethereum.org) üzerinde etkileşime girebilirsiniz.

### Merhaba dünya {#hello-world}

```solidity
// Anlamsal sürümleme kullanarak Solidity sürümünü belirtir.
// Daha fazla bilgi edinin: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// `HelloWorld` adında bir sözleşme tanımlar.
// Bir sözleşme, işlevlerin ve verilerin (durumunun) bir koleksiyonudur.
// Dağıtıldıktan sonra, bir sözleşme Ethereum Blokzincir üzerinde belirli bir adreste bulunur.
// Daha fazla bilgi edinin: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // `string` türünde bir `message` durum değişkeni bildirir.
    // Durum değişkenleri, değerleri sözleşme depolamasında kalıcı olarak saklanan değişkenlerdir.
    // `public` anahtar kelimesi, değişkenleri bir sözleşmenin dışından erişilebilir hale getirir
    // ve diğer sözleşmelerin veya istemcilerin değere erişmek için çağırabileceği bir işlev oluşturur.
    string public message;

    // Sınıf tabanlı nesne yönelimli birçok dile benzer şekilde, bir kurucu
    // yalnızca sözleşme oluşturulduğunda yürütülen özel bir işlevdir.
    // Kurucular, sözleşmenin verilerini başlatmak için kullanılır.
    // Daha fazla bilgi edinin: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // Bir dize argümanı olan `initMessage` değerini kabul eder ve değeri
        // sözleşmenin `message` depolama değişkenine ayarlar).
        message = initMessage;
    }

    // Bir dize argümanı kabul eden genel bir işlev
    // ve `message` depolama değişkenini günceller.
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### Token {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // Bir `address` bir e-posta adresine benzetilebilir - Ethereum üzerinde bir hesabı tanımlamak için kullanılır.
    // Adresler bir akıllı sözleşmeyi veya harici (kullanıcı) hesaplarını temsil edebilir.
    // Daha fazla bilgi edinin: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // Bir `mapping` temel olarak bir karma tablo veri yapısıdır.
    // Bu `mapping`, bir adrese (Token sahibine) işaretsiz bir tamsayı (Token bakiyesi) atar.
    // Daha fazla bilgi edinin: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // Olaylar, Blokzincir üzerindeki etkinliklerin günlüğe kaydedilmesine olanak tanır.
    // Ethereum istemcileri, sözleşme durum değişikliklerine tepki vermek için olayları dinleyebilir.
    // Daha fazla bilgi edinin: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // Sözleşmenin verilerini başlatır, `owner` değerini
    // sözleşme oluşturucusunun adresine ayarlar.
    constructor() public {
        // Tüm akıllı sözleşmeler, işlevlerini tetiklemek için harici işlemlere güvenir.
        // `msg`, verilen işlemle ilgili verileri içeren küresel bir değişkendir,
        // gönderenin adresi ve işleme dahil edilen ETH değeri gibi.
        // Daha fazla bilgi edinin: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // Belirli bir miktarda yeni Token oluşturur ve bunları bir adrese gönderir.
    function mint(address receiver, uint amount) public {
        // `require`, belirli koşulları zorunlu kılmak için kullanılan bir kontrol yapısıdır.
        // Eğer bir `require` ifadesi `false` olarak değerlendirilirse, bir istisna tetiklenir,
        // bu da mevcut çağrı sırasında duruma yapılan tüm değişiklikleri geri alır.
        // Daha fazla bilgi edinin: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // Bu işlevi yalnızca sözleşme sahibi çağırabilir
        require(msg.sender == owner, "You are not the owner.");

        // Maksimum Token miktarını zorunlu kılar
        require(amount < 1e60, "Maximum issuance exceeded");

        // `receiver` bakiyesini `amount` kadar artırır
        balances[receiver] += amount;
    }

    // Herhangi bir arayandan bir adrese belirli bir miktarda mevcut Token gönderir.
    function transfer(address receiver, uint amount) public {
        // Gönderenin göndermek için yeterli Token'ı olmalıdır
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // İki adresin Token bakiyelerini ayarlar
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // Daha önce tanımlanan olayı yayar
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### Benzersiz dijital varlık {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// Diğer dosyalardaki sembolleri mevcut sözleşmeye içe aktarır.
// Bu durumda, OpenZeppelin'den bir dizi yardımcı sözleşme.
// Daha fazla bilgi edinin: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// `is` anahtar kelimesi, harici sözleşmelerden işlevleri ve anahtar kelimeleri devralmak için kullanılır.
// Bu durumda, `CryptoPizza`, `IERC721` ve `ERC165` sözleşmelerinden devralır.
// Daha fazla bilgi edinin: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // Aritmetik işlemleri güvenli bir şekilde gerçekleştirmek için OpenZeppelin'in SafeMath kütüphanesini kullanır.
    // Daha fazla bilgi edinin: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Solidity'deki sabit durum değişkenleri diğer dillere benzer
    // ancak derleme zamanında sabit olan bir ifadeden atama yapmalısınız.
    // Daha fazla bilgi edinin: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Yapı türleri kendi türünüzü tanımlamanıza olanak tanır
    // Daha fazla bilgi edinin: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Pizza yapılarından oluşan boş bir dizi oluşturur
    Pizza[] public pizzas;

    // Pizza kimliğinden sahibinin adresine eşleme
    mapping(uint256 => address) public pizzaToOwner;

    // Sahibinin adresinden sahip olunan Token sayısına eşleme
    mapping(address => uint256) public ownerPizzaCount;

    // Token kimliğinden onaylı adrese eşleme
    mapping(uint256 => address) pizzaApprovals;

    // Eşlemeleri iç içe yerleştirebilirsiniz, bu örnek sahibini operatör onaylarıyla eşler
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // Dize (isim) ve DNA'dan rastgele bir Pizza oluşturmak için dahili işlev
    function _createPizza(string memory _name, uint256 _dna)
        // `internal` anahtar kelimesi, bu işlevin yalnızca
        // bu sözleşme ve bu sözleşmeden türetilen sözleşmeler içinde görünür olduğu anlamına gelir
        // Daha fazla bilgi edinin: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique`, pizzanın zaten var olup olmadığını kontrol eden bir işlev değiştiricisidir
        // Daha fazla bilgi edinin: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // Pizzayı Pizzalar dizisine ekler ve kimliği alır
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // Pizza sahibinin mevcut kullanıcıyla aynı olup olmadığını kontrol eder
        // Daha fazla bilgi edinin: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // address(0)'ın sıfır adresi olduğunu unutmayın,
        // bu, pizza[id]'nin henüz belirli bir kullanıcıya tahsis edilmediğini gösterir.

        assert(pizzaToOwner[id] == address(0));

        // Pizzayı sahibine eşler
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // Dizeden (isim) rastgele bir Pizza oluşturur
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // Dizeden (isim) ve sahibinin (oluşturanın) adresinden rastgele DNA üretir
    function generateRandomDna(string memory _str, address _owner)
        public
        // `pure` olarak işaretlenen işlevler, durumu okumamayı veya değiştirmemeyi taahhüt eder
        // Daha fazla bilgi edinin: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // Dize (isim) + adresten (sahip) rastgele uint üretir
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // Sahibi tarafından bulunan Pizzaların dizisini döndürür
    function getPizzasByOwner(address _owner)
        public
        // `view` olarak işaretlenen işlevler durumu değiştirmemeyi taahhüt eder
        // Daha fazla bilgi edinin: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // `memory` depolama konumunu, değerleri yalnızca
        // bu işlev çağrısının yaşam döngüsü boyunca saklamak için kullanır.
        // Daha fazla bilgi edinin: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
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

    // Pizzayı ve sahipliğini diğer adrese aktarır
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // İçe aktarılan IERC721 sözleşmesinde tanımlanan olayı yayar
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * Belirli bir Token kimliğinin sahipliğini güvenli bir şekilde başka bir adrese aktarır
     * Hedef adres bir sözleşme ise, güvenli bir aktarım üzerine çağrılan
     * `onERC721Received` işlevini uygulamalı ve sihirli değeri döndürmelidir
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * aksi takdirde aktarım geri alınır.
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * Belirli bir Token kimliğinin sahipliğini güvenli bir şekilde başka bir adrese aktarır
     * Hedef adres bir sözleşme ise, güvenli bir aktarım üzerine çağrılan
     * `onERC721Received` işlevini uygulamalı ve sihirli değeri döndürmelidir
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * aksi takdirde aktarım geri alınır.
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
     * Hedef adreste `onERC721Received` işlevini çağırmak için dahili işlev
     * Hedef adres bir sözleşme değilse çağrı yürütülmez
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

    // Bir Pizzayı yakar - Token'ı tamamen yok eder
    // `external` işlev değiştiricisi, bu işlevin
    // sözleşme arayüzünün bir parçası olduğu ve diğer sözleşmelerin onu çağırabileceği anlamına gelir
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

    // Adrese göre Pizza sayısını döndürür
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // Kimliğe göre bulunan Pizzanın sahibini döndürür
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // Pizzanın sahipliğini aktarmak için diğer adresi onaylar
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // Belirli bir Pizza için onaylı adresi döndürür
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza does not exist.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * Belirli bir Token kimliğinin mevcut onayını temizlemek için özel işlev
     * Verilen adres gerçekten Token'ın sahibi değilse geri alınır
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Must be pizza owner.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * Belirli bir operatörün onayını ayarlar veya kaldırır
     * Bir operatörün, gönderenin tüm Token'larını onun adına aktarmasına izin verilir
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // Bir operatörün belirli bir sahip tarafından onaylanıp onaylanmadığını belirtir
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // Pizzanın sahipliğini alır - yalnızca onaylı kullanıcılar için
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // Pizzanın var olup olmadığını kontrol eder
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // Adresin sahip olup olmadığını veya Pizzayı aktarmak için onaylanıp onaylanmadığını kontrol eder
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // Solium kontrolünü devre dışı bırak, nedeni:
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // Pizzanın benzersiz olup olmadığını ve henüz var olmadığını kontrol et
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

    // Hedef adresin bir sözleşme olup olmadığını döndürür
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // Şu anda bir adreste bir sözleşme olup olmadığını kontrol etmenin daha iyi bir yolu yoktur
        // o adresteki kodun boyutunu kontrol etmekten başka.
        // Bkz. https://ethereum.stackexchange.com/a/14016/36603
        // bunun nasıl çalıştığı hakkında daha fazla ayrıntı için.
        // YAPILACAKLAR Serenity sürümünden önce bunu tekrar kontrol edin, çünkü o zaman tüm adresler
        // sözleşme olacaktır.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## Daha fazla okuma {#further-reading}

Akıllı sözleşmelere dair daha eksiksiz bir genel bakış için Solidity ve Vyper belgelerine göz atın:

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## İlgili konular {#related-topics}

- [Akıllı sözleşmeler](/developers/docs/smart-contracts/)
- [Ethereum Sanal Makinesi](/developers/docs/evm/)

## İlgili eğitimler {#related-tutorials}

- [Sözleşme boyutu sınırıyla mücadele etmek için sözleşmeleri küçültmek](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– Akıllı sözleşmenizin boyutunu küçültmek için bazı pratik ipuçları._
- [Olaylarla akıllı sözleşmelerden veri günlüğe kaydetme](/developers/tutorials/logging-events-smart-contracts/) _– Akıllı sözleşme olaylarına ve bunları veri günlüğe kaydetmek için nasıl kullanabileceğinize dair bir giriş._
- [Solidity'den diğer sözleşmelerle etkileşim kurma](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Mevcut bir sözleşmeden bir akıllı sözleşmenin nasıl dağıtılacağı ve onunla nasıl etkileşim kurulacağı._