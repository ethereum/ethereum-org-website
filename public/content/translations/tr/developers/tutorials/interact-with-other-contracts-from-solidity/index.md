---
title: "Solidity'den diğer sözleşmelerle etkileşim kurun"
description: "Mevcut bir sözleşmeden bir akıllı sözleşme nasıl dağıtılır ve onunla nasıl etkileşim kurulur"
author: "jdourlens"
tags: ["akıllı sözleşmeler", "Solidity", "Remix", "dağıtma", "birleştirilebilirlik"]
skill: advanced
breadcrumb: "Sözleşme etkileşimleri"
lang: tr
published: 2020-04-05
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Önceki eğitimlerde [ilk akıllı sözleşmenizi nasıl dağıtacağınız](/developers/tutorials/deploying-your-first-smart-contract/) ve ona [değiştiricilerle erişim kontrolü](https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers) veya [Solidity'de hata işleme](https://docs.soliditylang.org/en/latest/control-structures.html#error-handling-assert-require-revert-and-exceptions) gibi bazı özellikleri nasıl ekleyeceğiniz hakkında çok şey öğrendik. Bu eğitimde, mevcut bir sözleşmeden bir akıllı sözleşmeyi nasıl dağıtacağımızı ve onunla nasıl etkileşim kuracağımızı öğreneceğiz.

Herkesin kendi `Counter` akıllı sözleşmesine sahip olmasını sağlayan bir fabrika oluşturarak bir sözleşme yapacağız, adı `CounterFactory` olacak. İlk olarak, başlangıçtaki `Counter` akıllı sözleşmemizin kodu şöyledir:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "You're not the owner of the contract");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "You need to use the factory");
        _;
    }

     constructor(address owner) {
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

Fabrikanın adresini ve sözleşme sahibinin adresini takip etmek için sözleşme kodunu biraz değiştirdiğimizi unutmayın. Başka bir sözleşmeden bir sözleşme kodu çağırdığınızda, msg.sender sözleşme fabrikamızın adresini referans alacaktır. Diğer sözleşmelerle etkileşim kurmak için bir sözleşme kullanmak yaygın bir uygulama olduğundan, bu **anlaşılması gerçekten önemli bir noktadır**. Bu nedenle karmaşık durumlarda gönderenin kim olduğuna dikkat etmelisiniz.

Bunun için, durum değiştiren fonksiyonun yalnızca orijinal çağırıcıyı bir parametre olarak geçirecek olan fabrika tarafından çağrılabileceğinden emin olan bir `onlyFactory` değiştiricisi de ekledik.

Diğer tüm Counter'ları yönetecek olan yeni `CounterFactory` sözleşmemizin içine, bir sahibini kendi sayaç sözleşmesinin adresiyle ilişkilendirecek bir eşleme ekleyeceğiz:

```solidity
mapping(address => Counter) _counters;
```

Solidity'de [eşlemeler](https://docs.soliditylang.org/en/latest/types.html#mapping-types) JavaScript'teki nesnelere benzer: A türündeki bir anahtarı B türündeki bir değerle eşlerler. Bu durumda, bir sahibin adresini kendi Counter örneğiyle eşliyoruz.

Birisi için yeni bir Counter örneği oluşturmak şu şekilde görünecektir:

```solidity
  function createCounter() public {
      require(address(_counters[msg.sender]) == address(0), "You already have a counter");
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Önce kişinin zaten bir sayacı olup olmadığını kontrol ediyoruz. Bir eşleme, hiç ayarlanmamış anahtarlar için varsayılan değeri döndürür; bu, bir sözleşme türü için sıfır adresidir, bu nedenle depolanan sözleşmenin adresini `address(0)` ile karşılaştırırız. Eğer bir sayacı yoksa, adresini `Counter` kurucusuna geçirerek yeni bir sayaç örneği oluştururuz ve yeni oluşturulan örneği eşlemeye atarız.

Belirli bir Counter'ın sayımını almak şu şekilde görünecektir:

```solidity
function getCount(address account) public view returns (uint256) {
    require(address(_counters[account]) != address(0), "This account has no counter");
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

İlk fonksiyon, belirli bir adres için Counter sözleşmesinin var olup olmadığını kontrol eder ve ardından örnekten `getCount` metodunu çağırır. İkinci fonksiyon: `getMyCount`, msg.sender'ı doğrudan `getCount` fonksiyonuna geçirmek için sadece bir kısayoldur.

`increment` fonksiyonu oldukça benzerdir ancak orijinal işlem göndericisini `Counter` sözleşmesine geçirir:

```solidity
function increment() public {
      require(address(_counters[msg.sender]) != address(0), "You need to create a counter first");
      _counters[msg.sender].increment(msg.sender);
  }
```

Solidity 0.8'den bu yana, aritmetik [varsayılan olarak kontrol edilir](https://docs.soliditylang.org/en/latest/control-structures.html#checked-or-unchecked-arithmetic): eğer `_count` herhangi bir zamanda taşarsa (overflow), `_count++` sessizce başa sarmak yerine işlemi geri alır, bu nedenle SafeMath gibi ekstra bir kütüphaneye ihtiyaç duyulmaz.

Sözleşmemizi dağıtmak için hem `CounterFactory` hem de `Counter` kodunu sağlamanız gerekecektir. Örneğin Remix'te dağıtırken CounterFactory'yi seçmeniz gerekecektir.

İşte tam kod:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "You're not the owner of the contract");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "You need to use the factory");
        _;
    }

     constructor(address owner) {
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
        require(address(_counters[msg.sender]) == address(0), "You already have a counter");
        _counters[msg.sender] = new Counter(msg.sender);
    }

    function increment() public {
        require(address(_counters[msg.sender]) != address(0), "You need to create a counter first");
        _counters[msg.sender].increment(msg.sender);
    }

    function getCount(address account) public view returns (uint256) {
        require(address(_counters[account]) != address(0), "This account has no counter");
        return (_counters[account].getCount());
    }

    function getMyCount() public view returns (uint256) {
        return (getCount(msg.sender));
    }

}
```

Derlemeden sonra, Remix dağıtma bölümünde dağıtılacak fabrikayı seçeceksiniz:

![Remix'te dağıtılacak fabrikayı seçme](./counterfactory-deploy.png)

Ardından sözleşme fabrikanızla oynayabilir ve değerin değiştiğini kontrol edebilirsiniz. Akıllı sözleşmeyi farklı bir adresten çağırmak isterseniz, Remix'in Hesap seçimi kısmından adresi değiştirmeniz gerekecektir.
