---
title: ERC-20 token akıllı sözleşmesini anlamak
description: Ethereum test ağında ilk akıllı sözleşmenizi dağıtmaya giriş
author: "jdourlens"
tags:
  - "akıllı sözleşmeler"
  - "token'lar"
  - "solidity"
  - "başlarken"
  - "erc-20"
skill: beginner
lang: tr
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Ethereum'daki en önemli [akıllı sözleşme standartlarından](/developers/docs/standards/) [ERC-20](/developers/docs/standards/tokens/erc-20/) olarak bilinir: Bu standart, Ethereum blok zincirinde tüm değiştirilebilir token uygulamalarının akıllı sözleşmeleri için kullanılan teknik standart olarak öne çıkmıştır.

ERC-20 tüm değiştirilebilir Ethereum token'larının uyması gereken ortak bir kural listesi belirler. Bundan dolayı bu token standardı, her türden geliştiriciyi yeni token'ların daha büyük Ethereum sisteminde nasıl çalışacağını isabetli bir şekilde tahmin edebilmeleri için destekler. Bu, token kurallara uyduğu sürece yeni bir token yayınlandığında her yeni projenin yeniden yapılmasına gerek duyulmayacağını bilerek işlerine devam edebilecekleri için geliştiricilerin görevlerini kolaylaştırır ve basitleştirir.

Burada bir ERC-20'nin uygulaması gereken fonksiyonlar bir arayüz şeklinde sunulmaktadır. Bir arayüzün ne olduğundan emin değilseniz: [Solidity'de OOP programlama](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/) hakkındaki makalemize bakabilirsiniz.

```solidity
pragma solidity ^0.6.0;

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

Burada her bir fonksiyonun ne işe yaradığının satır satır açıklaması mevcuttur. Bundan sonra bir ERC-20 token'ının basit bir uygulamasını göstereceğiz.

## Getters {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

Var olan token miktarını döndürür. Bu fonksiyon bir alıcıdır (getter) ve sözleşmenin durumunu değiştirmez. Solidity'de kesirli sayıların bulunmadığını unutmayın. Bu yüzden birçok token 18 ondalığı benimser, toplam arzı ve diğer sonuçları örnek verecek olursak 1 token için 1000000000000000000 şeklinde döndürür. Her token 18 ondalık kullanmaz ve bu, token'larla uğraşırken dikkate almanız gereken şeylerden biridir.

```solidity
function balanceOf(address account) external view returns (uint256);
```

Bir adresin sahip olduğu token miktarını döndürür (`account`). Bu fonksiyon bir alıcıdır (getter) ve sözleşmenin durumunu değiştirmez.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

ERC-20 standartı, bir adresin başka bir adresten token alabilmesi için ödenek vermesine izin verir. Bu alıcı, `spender` adresinin `owner` adresinin adına harcayabileceği kalan token'ların sayısını döndürür. Bu fonksiyon bir alıcıdır, sözleşmenin durumunu değiştirmez ve varsayılan olarak 0 döndürür.

## Fonksiyonlar {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

`amount` miktarında tokeni fonksiyon çağıran adresten (`msg.sender`) alıcı adrese aktarır. Bu fonksiyon sonradan belirtilecek olan `Transfer` olayını tetikler. Transfer mümkün olmuşsa "true" döndürür.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

`spender` hesabının fonksiyonu çağıran hesabın (`msg.sender`) bakiyesinden transfer edebileceği `allowance` miktarını belirler. Bu fonksiyon Approval olayını tetikler. Bu fonksiyon, ödeneğin (allowance) başarılı şekilde belirlenip belirlenemediğini döndürür.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Ödenek mekanizmasını kullanarak `amount` miktarında tokeni `sender` adresinden `recipient` adresine aktarır. miktar bunun sonrasında çağıranın ödeneğinden azaltılır. Bu fonksiyon `Transfer` olayını tetikler.

## Olaylar {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Bu olay, token miktarı (value) `from` adresinden `to` adresine gönderilince tetiklenir.

Yeni tokenlerin basılması durumunda transfer normalde `from` 0x00..0000 şeklinde; buna karşın yakma durumunda ise transfer `to` 0x00..0000 şeklindedir.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

Bu olay, token miktarının (`value`) `spender` tarafından kullanılması için `owner` tarafından izin verildiğinde tetiklenir.

## Basit bir ERC-20 token uygulaması {#a-basic-implementation-of-erc-20-tokens}

Bu, ERC-20 token'ınızı temellendirmek için en basit koddur:

```solidity
pragma solidity ^0.8.0;

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}


contract ERC20Basic is IERC20 {

    string public constant name = "ERC20Basic";
    string public constant symbol = "ERC";
    uint8 public constant decimals = 18;


    mapping(address => uint256) balances;

    mapping(address => mapping (address => uint256)) allowed;

    uint256 totalSupply_ = 10 ether;


   constructor() {
    balances[msg.sender] = totalSupply_;
    }

    function totalSupply() public override view returns (uint256) {
    return totalSupply_;
    }

    function balanceOf(address tokenOwner) public override view returns (uint256) {
        return balances[tokenOwner];
    }

    function transfer(address receiver, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender]-numTokens;
        balances[receiver] = balances[receiver]+numTokens;
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }

    function approve(address delegate, uint256 numTokens) public override returns (bool) {
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }

    function allowance(address owner, address delegate) public override view returns (uint) {
        return allowed[owner][delegate];
    }

    function transferFrom(address owner, address buyer, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[owner]);
        require(numTokens <= allowed[owner][msg.sender]);

        balances[owner] = balances[owner]-numTokens;
        allowed[owner][msg.sender] = allowed[owner][msg.sender]-numTokens;
        balances[buyer] = balances[buyer]+numTokens;
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
}
```

[OpenZeppelin ERC-20 uygulaması](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20), ERC-20 token standardının bir diğer mükemmel uygulamasıdır.
