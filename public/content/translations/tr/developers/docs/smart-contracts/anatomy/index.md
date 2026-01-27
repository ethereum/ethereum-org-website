---
title: Akıllı sözleşmelerin anatomisi
description: Akıllı bir sözleşmenin anatomisine derinlemesine bir bakış - fonksiyonlar, veriler ve değişkenler.
lang: tr
---

Bir akıllı sözleşme Ethereum üzerindeki bir adreste çalışan bir programdır. Bir işlem alındığında yürütülebilen fonksiyonlar ve verilerden oluşurlar. Burada bir akıllı sözleşmenin nelerden oluştuğu hakkında genel bir bakış bulunmaktadır.

## Ön Koşullar {#prerequisites}

Önce [akıllı sözleşmeler](/developers/docs/smart-contracts/) hakkında bilgi edindiğinizden emin olun. Bu belge, hâlihazırda JavaScript veya Python gibi programlama dillerine aşina olduğunuzu varsayar.

## Veri {#data}

Herhangi bir sözleşme verisi bir konuma atanmalıdır: ya `storage` ya da `memory`. Bir akıllı sözleşmede depolamayı değiştirmek pahalıdır, bundan dolayı verinizin nerede yaşayacağını düşünmelisiniz.

### Depolama {#storage}

Kalıcı veriden depolama olarak bahsedilir ve durum değişkenleri tarafından temsil edilir. Bu değerler kalıcı olarak blok zincirinde depolanır. Sözleşmenin derlendiğinde blok zincirinde ne kadar depolama ihtiyacı duyacağını takip edebilmesi için türünü deklare etmelisiniz.

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

Hâlihazırda nesne odaklı dillerde programlama yaptıysanız, büyük ihtimalle çoğu türe aşinasınızdır. Ancak, Ethereum geliştirmede yeniyseniz `address` sizin için yeni olmalıdır.

Bir `address` türü, 20 bayt veya 160 bite eşdeğer bir Ethereum adresi tutabilir. Önünde 0x olan onaltılık gösterim şeklinde döndürür.

Diğer türler:

- boolean
- tam sayı
- sabit noktalı sayılar
- sabit boyutlu bayt dizileri
- dinamik olarak boyutlandırılmış bayt dizileri
- rasyonel ve tam sayı değişmezleri
- metin değişmezleri
- onaltılık değişmezler
- enum'lar

Daha fazla açıklama için belgelere göz atın:

- [Vyper türlerini görün](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [Solidity türlerini görün](https://docs.soliditylang.org/en/latest/types.html#value-types)

### Bellek {#memory}

Sadece bir sözleşme fonksiyonunun yürütümü esnasında depolanan değerlere bellek değişkenleri denir. Bunlar blok zincirinde kalıcı şekilde depolanmadıkları için kullanımları çok daha ucuzdur.

EVM'nin verileri nasıl depoladığı (Depolama, Bellek ve Yığın) hakkında daha fazla bilgiyi [Solidity belgelerinden](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack) edinin.

### Ortam değişkenleri {#environment-variables}

Sözleşmenizde tanımladığınız değişkenlere ek olarak, bazı özel global değişkenler bulunmaktadır. Başlıca blok zinciri veya mevcut işlem hakkında bilgi sağlamak için kullanılırlar.

Örnekler:

| **Özellik**       | **Durum değişkeni** | **Açıklama**                                          |
| ----------------- | ------------------- | ----------------------------------------------------- |
| `block.timestamp` | uint256             | Mevcut blok dönemi zaman damgası                      |
| `msg.sender`      | adres               | Mesajın göndericisi (mevcut çağrı) |

## Fonksiyonlar {#functions}

En basit şekilde, fonksiyonlar gelen işlemlere yanıt olarak bilgi alabilir veya düzenleyebilir.

İki tip fonksiyon çağrısı bulunur:

- `internal` – bunlar bir EVM çağrısı oluşturmaz
  - Dahili fonksiyonlara ve durum değişkenlerine yalnızca dahili olarak erişilebilir (yani mevcut sözleşmenin içinden veya ondan türetilen sözleşmelerden)
- `external` – bunlar bir EVM çağrısı oluşturur
  - External fonksiyonlar sözleşme arayüzünün bir parçasıdır, bu da diğer sözleşmelerden ve işlemler aracılığıyla çağrılabilecekleri anlamına gelir. Harici bir `f` fonksiyonu dahili olarak çağrılamaz (yani `f()` çalışmaz, ancak `this.f()` çalışır).

Ayrıca `public` veya `private` olabilirler

- `public` fonksiyonlar, sözleşme içinden dahili olarak veya mesajlar aracılığıyla harici olarak çağrılabilir
- `private` fonksiyonlar yalnızca tanımlandıkları sözleşme için görünürdür ve türetilmiş sözleşmelerde görünmezler

Hem fonksiyonlar hem de durum değişkenleri public veya private yapılabilir

Burada bir sözleşmedeki bir durum değişkenini güncellemek için bir fonksiyon bulunmaktadır:

```solidity
// Solidity örneği
function update_name(string value) public {
    dapp_name = value;
}
```

- `string` türündeki `value` parametresi, `update_name` fonksiyonuna geçirilir
- `public` olarak bildirilmiştir, yani herkes erişebilir
- `view` olarak bildirilmemiştir, bu nedenle sözleşme durumunu değiştirebilir

### Görünüm fonksiyonları {#view-functions}

Bu fonksiyonlar sözleşmenin verisinin durumunu değiştirmemeye söz verirler. Yaygın örnekler "alıcı" fonksiyonlardır – örnek olarak bunu bir kullanıcının bakiyesini almak için kullanabilirsiniz.

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

Durumu değiştirme olarak sayılan şeyler:

1. Değişkenlikleri belirtmek için yazma.
2. [Olayları yayma](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events).
3. [Diğer sözleşmeleri oluşturma](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts).
4. `selfdestruct` kullanma.
5. Çağrılar aracılığıyla ether gönderme.
6. `view` veya `pure` olarak işaretlenmemiş herhangi bir fonksiyonu çağırma.
7. Alt düzey çağrıları kullanma.
8. Belirli işlem kodları içeren satır içi tümleşkeler kullanma.

### Yapıcı fonksiyonlar {#constructor-functions}

`constructor` fonksiyonları yalnızca sözleşme ilk kez dağıtıldığında bir kez yürütülür. Birçok sınıf tabanlı programlama dilindeki `constructor` gibi, bu fonksiyonlar da genellikle durum değişkenlerini belirtilen değerlere başlatır.

```solidity
// Solidity örneği
// Sözleşmenin verilerini başlatır, `owner`'ı
// sözleşmeyi oluşturanın adresine ayarlar.
constructor() public {
    // Tüm akıllı sözleşmeler, fonksiyonlarını tetiklemek için harici işlemlere güvenir.
    // `msg`, gönderenin adresi ve işlemde yer alan ETH değeri gibi
    // belirli bir işlemle ilgili verileri içeren genel bir değişkendir.
    // Daha fazlasını öğrenin: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
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

### Yerleşik fonksiyonlar {#built-in-functions}

Sözleşmenizde tanımladığınız değişkenler ve fonksiyonlara ek olarak, bazı özel yerleşik fonksiyonlar bulunmaktadır. En bariz örnek şudur:

- `address.send()` – Solidity
- `send(address)` – Vyper

Bunlar sözleşmelerin başka hesaplara ETH göndermesini sağlar.

## Fonksiyon yazma {#writing-functions}

Fonksiyonunuz şunlara ihtiyaç duyar:

- parametre değişkeni ve türü (eğer parametre kabul ediyorsa)
- internal/external deklarasyonu
- pure/view/payable deklarasyonu
- dönüş türü (eğer bir değer döndürüyorsa)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // durum değişkeni

    // Sözleşme dağıtıldığında çağrılır ve değeri başlatır
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // Get Fonksiyonu
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Set Fonksiyonu
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

Tam bir sözleşme bu şekilde gözükebilir. Burada `constructor` fonksiyonu, `dapp_name` değişkeni için bir başlangıç değeri sağlar.

## Olaylar ve günlükler {#events-and-logs}

Olaylar, akıllı sözleşmelerinizin ön yüzünüz ya da diğer abonelik uygulamalarınızla iletişime geçebilmesini sağlar. Bir işlem doğrulandıktan ve bir bloğa eklendikten sonra akıllı sözleşmeler, ön ucun daha sonra işleyebileceği ve kullanabileceği olayları ve günlük bilgilerini yayabilir.

## Açıklamalı örnekler {#annotated-examples}

Bunlar Solidity ile yazılmış bazı örneklerdir. Kodla oynamak isterseniz, [Remix](http://remix.ethereum.org) üzerinde onlarla etkileşime girebilirsiniz.

### Merhaba dünya {#hello-world}

```solidity
// Anlamsal sürüm oluşturmayı kullanarak Solidity sürümünü belirtir.
// Daha fazlasını öğrenin: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// `HelloWorld` adında bir sözleşme tanımlar.
// Bir sözleşme, fonksiyonlar ve verilerden (durumundan) oluşan bir koleksiyondur.
// Dağıtıldıktan sonra, bir sözleşme Ethereum blokzincirinde belirli bir adreste bulunur.
// Daha fazlasını öğrenin: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // `string` türünde bir `message` durum değişkeni bildirir.
    // Durum değişkenleri, değerleri kalıcı olarak sözleşme depolama alanında saklanan değişkenlerdir.
    // `public` anahtar kelimesi, değişkenleri bir sözleşmenin dışından erişilebilir hale getirir
    // ve diğer sözleşmelerin veya istemcilerin değere erişmek için çağırabileceği bir fonksiyon oluşturur.
    string public message;

    // Birçok sınıf tabanlı nesne yönelimli dilde olduğu gibi, bir yapıcı
    // yalnızca sözleşme oluşturulduğunda yürütülen özel bir fonksiyondur.
    // Yapıcılar, sözleşmenin verilerini başlatmak için kullanılır.
    // Daha fazlasını öğrenin: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // Bir `initMessage` dize bağımsız değişkenini kabul eder ve değeri
        // sözleşmenin `message` depolama değişkenine ayarlar).
        message = initMessage;
    }

    // Bir dize bağımsız değişkenini kabul eden
    // ve `message` depolama değişkenini güncelleyen genel bir fonksiyon.
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### Jeton {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // Bir `address` bir e-posta adresine benzer; Ethereum'da bir hesabı tanımlamak için kullanılır.
    // Adresler bir akıllı sözleşmeyi veya harici (kullanıcı) hesapları temsil edebilir.
    // Daha fazlasını öğrenin: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // Bir `mapping` aslında bir karma tablo veri yapısıdır.
    // Bu `mapping`, işaretsiz bir tam sayıyı (jeton bakiyesi) bir adrese (jeton sahibi) atar.
    // Daha fazlasını öğrenin: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // Olaylar, blokzincirindeki etkinliğin günlüğe kaydedilmesine olanak tanır.
    // Ethereum istemcileri, sözleşme durumu değişikliklerine tepki vermek için olayları dinleyebilir.
    // Daha fazlasını öğrenin: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // Sözleşmenin verilerini başlatır, `owner`'ı
    // sözleşmeyi oluşturanın adresine ayarlar.
    constructor() public {
        // Tüm akıllı sözleşmeler, fonksiyonlarını tetiklemek için harici işlemlere güvenir.
        // `msg`, gönderenin adresi ve işlemde yer alan ETH değeri gibi
        // belirli bir işlemle ilgili verileri içeren genel bir değişkendir.
        // Daha fazlasını öğrenin: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // Yeni jetonlar oluşturur ve bunları bir adrese gönderir.
    function mint(address receiver, uint amount) public {
        // `require`, belirli koşulları zorlamak için kullanılan bir kontrol yapısıdır.
        // Bir `require` ifadesi `false` olarak değerlendirilirse, bir istisna tetiklenir,
        // bu da mevcut çağrı sırasında durumda yapılan tüm değişiklikleri geri alır.
        // Daha fazlasını öğrenin: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // Bu fonksiyonu yalnızca sözleşme sahibi çağırabilir
        require(msg.sender == owner, "Sahip siz değilsiniz.");

        // Maksimum jeton miktarını zorlar
        require(amount < 1e60, "Maksimum ihraç aşıldı");

        // `receiver` bakiyesini `amount` kadar artırır
        balances[receiver] += amount;
    }

    // Herhangi bir çağırandan bir adrese mevcut jeton miktarını gönderir.
    function transfer(address receiver, uint amount) public {
        // Gönderenin göndermek için yeterli jetonu olmalıdır
        require(amount <= balances[msg.sender], "Yetersiz bakiye.");

        // İki adresin jeton bakiyelerini ayarlar
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

// Diğer dosyalardan sembolleri mevcut sözleşmeye aktarır.
// Bu durumda, OpenZeppelin'den bir dizi yardımcı sözleşme.
// Daha fazlasını öğrenin: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// `is` anahtar kelimesi, harici sözleşmelerden fonksiyonları ve anahtar kelimeleri miras almak için kullanılır.
// Bu durumda `CryptoPizza`, `IERC721` ve `ERC165` sözleşmelerinden miras alır.
// Daha fazlasını öğrenin: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // Aritmetik işlemleri güvenli bir şekilde gerçekleştirmek için OpenZeppelin'in SafeMath kütüphanesini kullanır.
    // Daha fazlasını öğrenin: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Solidity'deki sabit durum değişkenleri diğer dillere benzer
    // ancak derleme zamanında sabit olan bir ifadeden atama yapmanız gerekir.
    // Daha fazlasını öğrenin: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Struct türleri kendi türünüzü tanımlamanızı sağlar
    // Daha fazlasını öğrenin: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Pizza yapılarından oluşan boş bir dizi oluşturur
    Pizza[] public pizzas;

    // Pizza kimliğinden sahibinin adresine eşleme
    mapping(uint256 => address) public pizzaToOwner;

    // Sahibin adresinden sahip olunan jeton sayısına eşleme
    mapping(address => uint256) public ownerPizzaCount;

    // Jeton kimliğinden onaylanmış adrese eşleme
    mapping(uint256 => address) pizzaApprovals;

    // Eşlemeleri iç içe kullanabilirsiniz, bu örnek sahibi operatör onaylarıyla eşler
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // Dizeden (ad) ve DNA'dan rastgele bir Pizza oluşturmak için dahili fonksiyon
    function _createPizza(string memory _name, uint256 _dna)
        // `internal` anahtar kelimesi, bu fonksiyonun yalnızca
        // bu sözleşme ve bu sözleşmeyi türeten sözleşmeler içinde görünür olduğu anlamına gelir
        // Daha fazlasını öğrenin: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique`, pizzanın zaten var olup olmadığını kontrol eden bir fonksiyon değiştiricisidir
        // Daha fazlasını öğrenin: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // Pizza'yı Pizza dizisine ekler ve kimliği alır
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // Pizza sahibinin mevcut kullanıcıyla aynı olup olmadığını kontrol eder
        // Daha fazlasını öğrenin: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // address(0)'ın sıfır adresi olduğunu unutmayın,
        // pizza[id]'nin henüz belirli bir kullanıcıya atanmadığını gösterir.

        assert(pizzaToOwner[id] == address(0));

        // Pizza'yı sahibine eşler
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // Dizeden (ad) rastgele bir Pizza oluşturur
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // Dizeden (ad) ve sahibinin adresinden (oluşturan) rastgele DNA oluşturur
    function generateRandomDna(string memory _str, address _owner)
        public
        // `pure` olarak işaretlenmiş fonksiyonlar durumu okumama veya değiştirmeme sözü verir
        // Daha fazlasını öğrenin: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // Dizeden (ad) + adresten (sahip) rastgele uint oluşturur
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // Sahibe göre bulunan Pizza dizisini döndürür
    function getPizzasByOwner(address _owner)
        public
        // `view` olarak işaretlenmiş fonksiyonlar durumu değiştirmeme sözü verir
        // Daha fazlasını öğrenin: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // Değerleri yalnızca bu fonksiyon çağrısının
        // yaşam döngüsü için saklamak üzere `memory` depolama konumunu kullanır.
        // Daha fazlasını öğrenin: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
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

    // Pizza'yı ve sahipliğini başka bir adrese aktarır
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Geçersiz adres.");
        require(_exists(_pizzaId), "Pizza mevcut değil.");
        require(_from != _to, "Aynı adrese transfer yapılamaz.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Adres onaylı değil.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // İçe aktarılan IERC721 sözleşmesinde tanımlanan olayı yayar
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * Belirli bir jeton kimliğinin sahipliğini başka bir adrese güvenli bir şekilde aktarır
     * Hedef adres bir sözleşme ise `onERC721Received` uygulamalıdır,
     * bu, güvenli bir aktarım üzerine çağrılır ve sihirli değeri döndürür
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * aksi takdirde, aktarım geri alınır.
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * Belirli bir jeton kimliğinin sahipliğini başka bir adrese güvenli bir şekilde aktarır
     * Hedef adres bir sözleşme ise `onERC721Received` uygulamalıdır,
     * bu, güvenli bir aktarım üzerine çağrılır ve sihirli değeri döndürür
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * aksi takdirde, aktarım geri alınır.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) public {
        this.transferFrom(from, to, pizzaId);
        require(_checkOnERC721Received(from, to, pizzaId, _data), "onERC721Received uygulanmalıdır.");
    }

    /**
     * Hedef bir adreste `onERC721Received`'i çağırmak için dahili fonksiyon
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

    // Bir Pizza'yı yakar - Jetonu tamamen yok eder
    // `external` fonksiyon değiştiricisi, bu fonksiyonun
    // sözleşme arayüzünün bir parçası olduğu ve diğer sözleşmelerin onu çağırabileceği anlamına gelir
    function burn(uint256 _pizzaId) external {
        require(msg.sender != address(0), "Geçersiz adres.");
        require(_exists(_pizzaId), "Pizza mevcut değil.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Adres onaylı değil.");

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

    // Kimliğe göre bulunan Pizza'nın sahibini döndürür
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Geçersiz Pizza Kimliği.");
        return owner;
    }

    // Pizza sahipliğini devretmek için başka bir adresi onaylar
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Pizza sahibi olmalısınız.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // Belirli Pizza için onaylanmış adresi döndürür
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza mevcut değil.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * Belirli bir jeton kimliğinin mevcut onayını temizlemek için özel fonksiyon
     * Verilen adres gerçekten jetonun sahibi değilse geri alınır
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Pizza sahibi olmalısınız.");
        require(_exists(_pizzaId), "Pizza mevcut değil.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * Belirli bir operatörün onayını ayarlar veya kaldırır
     * Bir operatörün, gönderenin tüm jetonlarını kendi adına transfer etmesine izin verilir
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Kendi adresinizi onaylayamazsınız");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // Bir operatörün belirli bir sahip tarafından onaylanıp onaylanmadığını söyler
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // Pizza'nın sahipliğini alır - yalnızca onaylı kullanıcılar için
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Adres onaylı değil.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // Pizza'nın var olup olmadığını kontrol eder
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // Adresin sahip olup olmadığını veya Pizza'yı transfer etme yetkisi olup olmadığını kontrol eder
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // Solium kontrolünü devre dışı bırak, çünkü
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // Pizza'nın benzersiz olup olmadığını ve henüz mevcut olup olmadığını kontrol edin
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
        require(result, "Bu isimde bir pizza zaten var.");
        _;
    }

    // Hedef adresin bir sözleşme olup olmadığını döndürür
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // Şu anda bir adreste sözleşme olup olmadığını kontrol etmenin, o adresteki kodun boyutunu kontrol etmekten daha iyi bir yolu yoktur.
        // Bunun nasıl çalıştığı hakkında daha fazla ayrıntı için
        // bkz. https://ethereum.stackexchange.com/a/14016/36603.
        // TODO Serenity sürümünden önce bunu tekrar kontrol edin, çünkü o zaman tüm adresler
        // sözleşme olacak.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## Daha fazla kaynak {#further-reading}

Akıllı sözleşmelere daha detaylı bir genel bakış için Solidity ve Vyper'ın belgelerine bakın:

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## Alakalı başlıklar {#related-topics}

- [Akıllı sözleşmeler](/developers/docs/smart-contracts/)
- [Ethereum Sanal Makinesi](/developers/docs/evm/)

## İlgili öğreticiler {#related-tutorials}

- [Sözleşme boyutu limitiyle mücadele etmek için sözleşmeleri küçültme](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– Akıllı sözleşmenizin boyutunu küçültmek için bazı pratik ipuçları._
- [Akıllı sözleşmelerden olaylarla veri günlüğü tutma](/developers/tutorials/logging-events-smart-contracts/) _– Akıllı sözleşme olaylarına ve bunları veri günlüğü tutmak için nasıl kullanabileceğinize bir giriş._
- [Solidity'den diğer sözleşmelerle etkileşim kurma](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Mevcut bir sözleşmeden bir akıllı sözleşmenin nasıl dağıtılacağı ve onunla nasıl etkileşim kurulacağı._
