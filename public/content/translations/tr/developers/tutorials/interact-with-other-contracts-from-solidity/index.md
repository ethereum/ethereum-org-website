---
title: "Solidity'den diğer sözleşmelerle etkileşime geçme"
description: "Mevcut bir sözleşmeden akıllı sözleşme dağıtma ve onunla etkileşim kurma"
author: "jdourlens"
tags:
  [
    "akıllı kontratlar",
    "solidity",
    "remix",
    "dağıtma",
    "birleştirilebilirlik"
  ]
skill: advanced
lang: tr
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Önceki öğreticilerde [ilk akıllı sözleşmenizi nasıl dağıtacağınız](/developers/tutorials/deploying-your-first-smart-contract/) gibi pek çok şey öğrendik ve ona [değiştiricilerle erişimi kontrol etme](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) veya [Solidity'de hata yönetimi](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/) gibi bazı özellikler ekledik. Bu öğreticide mevcut bir sözleşmeden bir akıllı sözleşme dağıtmayı ve onunla etkileşim kurmayı öğreneceğiz.

Bunun için bir fabrika oluşturarak herkesin kendi `Counter` akıllı sözleşmesine sahip olmasını sağlayan bir sözleşme yapacağız, adı `CounterFactory` olacak. İlk olarak, ilk `Counter` akıllı sözleşmemizin kodu:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "Sözleşmenin sahibi siz değilsiniz");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "Fabrikayı kullanmanız gerekir");
        _;
    }

     constructor(address owner) public {
        _owner = owner;
        _factory = msg.sender;
    }

     function getCount() public view returns (uint256) {
        return _count;
    }

    function increment(address caller) public onlyFactory onlyOwner(caller) {
        _count++;
    }

}
```

Fabrikanın adresini ve sözleşme sahibinin adresini takip etmek için sözleşme kodunu biraz değiştirdiğimizi unutmayın. Başka bir sözleşmeden bir sözleşme kodu çağırdığınızda, `msg.sender` sözleşme fabrikamızın adresini gösterecektir. Diğer sözleşmelerle etkileşim kurmak için bir sözleşme kullanmak yaygın bir uygulama olduğundan, bu **anlaşılması gerçekten önemli bir noktadır**. Bu nedenle, karmaşık durumlarda göndericinin kim olduğuna dikkat etmelisiniz.

Bunun için, durum değiştiren fonksiyonun yalnızca orijinal çağırıcıyı parametre olarak geçiren fabrika tarafından çağrılabilmesini sağlayan bir `onlyFactory` değiştiricisi de ekledik.

Diğer tüm Sayaçları yönetecek olan yeni `CounterFactory`'mizin içine, bir sahibini kendi sayaç sözleşmesinin adresiyle ilişkilendirecek bir eşleme ekleyeceğiz:

```solidity
mapping(address => Counter) _counters;
```

Ethereum'da, eşlemeler javascript'teki nesnelerin eşdeğeridir; A türünde bir anahtarı B türünde bir değere eşlemeyi sağlarlar. Bu durumda, bir sahibinin adresini onun Counter örneği ile eşleriz.

Birisi için yeni bir Counter örneği oluşturmak şöyle görünür:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Önce kişinin zaten bir `Counter`'ı olup olmadığını kontrol ederiz. Eğer bir `Counter`'ı yoksa, adresini `Counter` yapıcısına geçirerek yeni bir `Counter` örneği oluştururuz ve yeni oluşturulan örneği eşlemeye atarız.

Belirli bir `Counter`'ın sayımını almak şöyle görünür:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

İlk fonksiyon, belirtilen adres için `Counter` sözleşmesinin mevcut olup olmadığını kontrol eder ve ardından örnekten `getCount` metodunu çağırır. İkinci fonksiyon olan `getMyCount`, `msg.sender`'ı doğrudan `getCount` fonksiyonuna geçirmek için kullanılan bir kısayoldur.

`increment` fonksiyonu oldukça benzerdir ancak orijinal işlem göndericisini `Counter` sözleşmesine iletir:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

Çok fazla kez çağrılırsa, `counter`'ımızın bir taşma hatasına maruz kalabileceğini unutmayın. Bu olası duruma karşı korunmak için [SafeMath kütüphanesini](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) mümkün olduğunca kullanmalısınız.

Sözleşmemizi dağıtmak için hem `CounterFactory` hem de `Counter` kodunu sağlamanız gerekecektir. Örneğin Remix'te dağıtım yaparken `CounterFactory`'yi seçmeniz gerekecektir.

İşte kodun tamamı:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "Sözleşmenin sahibi siz değilsiniz");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "Fabrikayı kullanmanız gerekir");
        _;
    }

     constructor(address owner) public {
        _owner = owner;
        _factory = msg.sender;
    }

     function getCount() public view returns (uint256) {
        return _count;
    }

    function increment(address caller) public onlyFactory onlyOwner(caller) {
        _count++;
    }

}

contract CounterFactory {

    mapping(address => Counter) _counters;

    function createCounter() public {
        require (_counters[msg.sender] == Counter(0));
        _counters[msg.sender] = new Counter(msg.sender);
    }

    function increment() public {
        require (_counters[msg.sender] != Counter(0));
        Counter(_counters[msg.sender]).increment(msg.sender);
    }

    function getCount(address account) public view returns (uint256) {
        require (_counters[account] != Counter(0));
        return (_counters[account].getCount());
    }

    function getMyCount() public view returns (uint256) {
        return (getCount(msg.sender));
    }

}
```

Derleme işleminden sonra, Remix dağıtım bölümünde dağıtılacak fabrikayı seçeceksiniz:

![Remix'te dağıtılacak fabrikayı seçme](./counterfactory-deploy.png)

Ardından sözleşme fabrikanızla denemeler yapabilir ve değerin değiştiğini kontrol edebilirsiniz. Akıllı sözleşmeyi farklı bir adresten çağırmak isterseniz Remix'in `Hesap` seçimi bölümündeki adresi değiştirmeniz gerekir.
