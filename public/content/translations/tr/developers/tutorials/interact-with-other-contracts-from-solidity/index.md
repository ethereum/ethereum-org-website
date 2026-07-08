---
title: "Solidity'den diğer sözleşmelerle etkileşim kurun"
description: "Mevcut bir sözleşmeden bir akıllı sözleşme nasıl dağıtılır ve onunla nasıl etkileşim kurulur"
author: "jdourlens"
tags: ["akıllı sözleşmeler", "Solidity", "Remix", "dağıtma", "birleştirilebilirlik"]
skill: advanced
breadcrumb: "Sözleşme etkileşimleri"
lang: tr
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Önceki eğitimlerde [ilk akıllı sözleşmenizi nasıl dağıtacağınız](/developers/tutorials/deploying-your-first-smart-contract/) ve ona [değiştiricilerle erişimi kontrol etme](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) veya [Solidity'de hata işleme](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/) gibi bazı özellikleri nasıl ekleyeceğiniz hakkında çok şey öğrendik. Bu eğitimde, mevcut bir sözleşmeden bir akıllı sözleşmeyi nasıl dağıtacağımızı ve onunla nasıl etkileşim kuracağımızı öğreneceğiz.

Herkesin kendi `Counter` akıllı sözleşmesine sahip olmasını sağlayan bir fabrika oluşturarak bir sözleşme yapacağız, adı `CounterFactory` olacak. İlk olarak, başlangıçtaki `Counter` akıllı sözleşmemizin kodu şöyledir:

```solidity
pragma solidity 0.5.17;

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

Fabrikanın adresini ve sözleşme sahibinin adresini takip etmek için sözleşme kodunu biraz değiştirdiğimizi unutmayın. Başka bir sözleşmeden bir sözleşme kodu çağırdığınızda, msg.sender sözleşme fabrikamızın adresini referans alacaktır. Diğer sözleşmelerle etkileşim kurmak için bir sözleşme kullanmak yaygın bir uygulama olduğundan, bu **anlaşılması gerçekten önemli bir noktadır**. Bu nedenle karmaşık durumlarda gönderenin kim olduğuna dikkat etmelisiniz.

Bunun için, durum değiştiren işlevin yalnızca orijinal arayanı bir parametre olarak geçirecek olan fabrika tarafından çağrılabildiğinden emin olan bir `onlyFactory` değiştiricisi de ekledik.

Diğer tüm Sayaçları (Counters) yönetecek olan yeni `CounterFactory` sözleşmemizin içine, bir sahibini kendi sayaç sözleşmesinin adresiyle ilişkilendirecek bir eşleme (mapping) ekleyeceğiz:

```solidity
mapping(address => Counter) _counters;
```

Ethereum'da eşlemeler (mapping), JavaScript'teki nesnelerin eşdeğeridir; A türündeki bir anahtarı B türündeki bir değerle eşlemeyi sağlarlar. Bu durumda, bir sahibin adresini kendi Sayacının (Counter) örneğiyle eşliyoruz.

Birisi için yeni bir Sayaç (Counter) örneği oluşturmak şu şekilde görünecektir:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Önce kişinin zaten bir sayacı olup olmadığını kontrol ediyoruz. Eğer bir sayacı yoksa, adresini `Counter` kurucusuna geçirerek yeni bir sayaç örneği oluşturuyoruz ve yeni oluşturulan örneği eşlemeye atıyoruz.

Belirli bir Sayacın (Counter) sayısını almak şu şekilde görünecektir:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

İlk işlev, belirli bir adres için Sayaç (Counter) sözleşmesinin var olup olmadığını kontrol eder ve ardından örnekten `getCount` yöntemini çağırır. İkinci işlev olan `getMyCount`, msg.sender'ı doğrudan `getCount` işlevine geçirmek için sadece kısa bir yoldur.

`increment` işlevi oldukça benzerdir ancak orijinal işlem göndericisini `Counter` sözleşmesine geçirir:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

Çok fazla çağrılırsa, sayacımızın muhtemelen bir taşma kurbanı olabileceğini unutmayın. Bu olası durumdan korunmak için mümkün olduğunca [SafeMath kütüphanesini](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) kullanmalısınız.

Sözleşmemizi dağıtmak için hem `CounterFactory` hem de `Counter` kodunu sağlamanız gerekecektir. Örneğin Remix'te dağıtırken CounterFactory'yi seçmeniz gerekecektir.

İşte tam kod:

```solidity
pragma solidity 0.5.17;

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

Derlemeden sonra, Remix dağıtma bölümünde dağıtılacak fabrikayı seçeceksiniz:

![Selecting the factory to be deployed in Remix](./counterfactory-deploy.png)

Ardından sözleşme fabrikanızla oynayabilir ve değişen değeri kontrol edebilirsiniz. Akıllı sözleşmeyi farklı bir adresten çağırmak isterseniz, Remix'in Hesap (Account) seçiminden adresi değiştirmeniz gerekecektir.