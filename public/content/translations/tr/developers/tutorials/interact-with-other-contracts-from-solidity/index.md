---
title: Solidity'nin diğer sözleşmeleriyle etkileşime geçin
description: Mevcut bir sözleşmeden akıllı bir sözleşme nasıl kurulur ve onunla nasıl etkileşim kurulur
author: "jdourlens"
tags:
  - "akıllı kontratlar"
  - "solidity"
  - "remix"
  - "fabrikalar"
  - "dağıtma"
  - "birleştirilebilirlik"
skill: advanced
lang: tr
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Önceki öğreticilerde [ilk akıllı sözleşmenizi nasıl dağıtacağınızla](/developers/tutorials/deploying-your-first-smart-contract/) ve ona nasıl [niteleyicilerle erişim kontrolü](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) veya [Solidity'de hata işleme](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/) gibi bazı özellikler ekleyeceğinizle ilgili çok şey öğrendik. Bu öğreticide, mevcut bir sözleşmeden akıllı bir sözleşmenin nasıl dağıtılacağını ve onunla nasıl etkileşime geçileceğini öğreneceğiz.

Bunun için bir fabrika oluşturarak herkesin kendi `Counter` (Sayaç) akıllı sözleşmesine sahip olmasını sağlayan bir sözleşme yapacağız, adı `CounterFactory` (Sayaç Fabrikası) olacak. İlk olarak, ilk `Counter` akıllı sözleşmemizin kodu:

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

Fabrikanın adresini ve sözleşme sahibinin adresini takip etmek için sözleşme kodunu biraz değiştirdiğimizi unutmayın. Başka bir sözleşmeden bir sözleşme kodunu aradığınızda, msg.sender sözleşmeli fabrikamızın adresine başvuracaktır. Diğer sözleşmelerle etkileşim kurmak için bir sözleşme kullanmak yaygın bir uygulama olduğundan, bu **anlaşılması gerçekten önemli bir noktadır**. Bu nedenle, karmaşık durumlarda gönderenin kim olduğuna dikkat etmelisiniz.

Bunun için ayrıca, durum değiştirme işlevinin yalnızca orijinal çağrı yapan parametre olarak geçirecek olan fabrika tarafından çağrılabilmesini sağlayan bir `onlyFactory` niteleyicisi ekledik.

Diğer tüm Counter'ları yönetecek olan yeni `CounterFactory`'nin içine, bir sahibi karşı sözleşmenin adresiyle ilişkilendirecek bir eşleştirme ekleyeceğiz:

```solidity
mapping(address => Counter) _counters;
```

Ethereum'da eşleştirme, javascript'teki nesnelerin eş değeridir, A tipi bir anahtarı B tipi bir değere eşlemeyi sağlar. Bu durumda, bir sahibinin adresini Counter'ın örneğiyle eşleştiririz.

Birisi için yeni bir Counter başlatmak şöyle görünür:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Önce kişinin zaten bir counter'ı olup olmadığını kontrol ediyoruz. Eğer bir counter'ı yoksa, adresini `Counter` yapıcısına ileterek yeni bir counter başlatırız ve yeni oluşturulan örneği eşleştirmeye atarız.

Belirli bir Counter'ın sayısını almak için şöyle görünür:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

İlk işlev, belirli bir adres için Counter sözleşmesinin var olup olmadığını kontrol eder ve ardından örnekten `getCount` yöntemini çağırır. İkinci fonksiyon: `getMyCount` sadece `getCount` fonksiyonuna doğrudan msg.sender geçirmek için bir kısayoldur.

`increment` fonksiyonu oldukça benzerdir ancak orijinal işlem göndericisini `Counter` sözleşmesine iletir:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

Birçok kez aranırsa, counter'ımızın muhtemelen bir taşma kurbanı olabileceğini unutmayın. Bu olası durumdan korunmak için mümkün olduğunca [SafeMath kütüphanesini](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) kullanmalısınız.

Sözleşmemizi dağıtmak için hem `CounterFactory` kodunu hem de `Counter` kodunu sağlamanız gerekir. Örneğin Remix'te dağıtırken CounterFactory'yi seçmeniz gerekir.

Tam kod burada:

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

Derlemeden sonra, Remix dağıtımı bölümünde dağıtılacak fabrikayı seçeceksiniz:

![Remix'te dağıtılacak fabrikanın seçilmesi](./counterfactory-deploy.png)

Ardından sözleşmeli fabrikanızla oynayabilir ve değerin değiştiğini kontrol edebilirsiniz. Akıllı sözleşmeyi farklı bir adresten aramak isterseniz, Remix'in Hesap seçiminde adresi değiştirmeniz gerekir.
