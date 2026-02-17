---
title: "ERC-20 jeton akıllı sözleşmesini anlamak"
description: "Eksiksiz bir Solidity akıllı sözleşme örneği ve açıklamasıyla ERC-20 jeton standardının nasıl uygulanacağını öğrenin."
author: "jdourlens"
tags: [ "akıllı kontratlar", "token'lar", "solidity", "erc-20" ]
skill: beginner
lang: tr
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Ethereum'daki en önemli [akıllı sözleşme standartlarından](/developers/docs/standards/) biri olan [ERC-20](/developers/docs/standards/tokens/erc-20/), Ethereum blokzincirindeki misli jeton uygulamaları için kullanılan teknik standart olarak ortaya çıkmıştır.

ERC-20, tüm misli Ethereum jetonlarının uyması gereken ortak bir kural listesi tanımlar. Sonuç olarak bu jeton standardı, her türden geliştiricinin yeni jetonların daha büyük Ethereum sisteminde nasıl işlev göreceğini doğru bir şekilde tahmin etmesine olanak tanır. Bu durum, geliştiricilerin görevlerini basitleştirir ve kolaylaştırır, çünkü jeton kurallara uyduğu sürece, yeni bir jeton piyasaya sürüldüğünde her yeni projenin yeniden yapılması gerekmeyeceğini bilerek işlerine devam edebilirler.

Burada bir ERC-20'nin uygulaması gereken fonksiyonlar bir arayüz şeklinde sunulmaktadır. Bir arayüzün ne olduğundan emin değilseniz [Solidity'de Nesne Yönelimli Programlama](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/) hakkındaki makalemize göz atın.

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

Burada her bir fonksiyonun ne işe yaradığının satır satır açıklaması mevcuttur. Bunun ardından ERC-20 jetonunun basit bir uygulamasını sunacağız.

## Alıcılar {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

Mevcut jeton miktarını döndürür. Bu fonksiyon bir alıcıdır (getter) ve sözleşmenin durumunu değiştirmez. Solidity'de ondalıklı sayıların (float) olmadığını unutmayın. Bu nedenle çoğu jeton 18 ondalık basamağı benimser ve toplam arzı ve diğer sonuçları 1 jeton için 1000000000000000000 olarak döndürür. Her jeton 18 ondalık basamağa sahip değildir ve bu, jetonlarla işlem yaparken gerçekten dikkat etmeniz gereken bir şeydir.

```solidity
function balanceOf(address account) external view returns (uint256);
```

Bir adresin (`account`) sahip olduğu jeton miktarını döndürür. Bu fonksiyon bir alıcıdır (getter) ve sözleşmenin durumunu değiştirmez.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

ERC-20 standardı, bir adresin başka bir adresten jeton alabilmesi için o adrese bir harcama izni (ödenek) vermesine olanak tanır. Bu alıcı, `spender`'ın `owner` adına harcamasına izin verilecek kalan jeton sayısını döndürür. Bu fonksiyon bir alıcıdır, sözleşmenin durumunu değiştirmez ve varsayılan olarak 0 döndürmelidir.

## Fonksiyonlar {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

`amount` miktarda jetonu, fonksiyonu çağıran adresten (`msg.sender`) alıcı adrese aktarır. Bu fonksiyon, daha sonra tanımlanan `Transfer` olayını tetikler. Transfer mümkün olduysa true değerini döndürür.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

`spender`'ın, fonksiyonu çağıranın (`msg.sender`) bakiyesinden transfer etmesine izin verilen harcama izni (`allowance`) miktarını belirler. Bu fonksiyon `Approval` olayını tetikler. Fonksiyon, harcama izninin başarıyla ayarlanıp ayarlanmadığını döndürür.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Harcama izni mekanizmasını kullanarak `amount` miktarındaki jetonu `sender` adresinden `recipient` adresine aktarır. `amount` daha sonra arayanın harcama izninden düşülür. Bu fonksiyon `Transfer` olayını tetikler.

## Olaylar {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Bu olay, `value` değerindeki jeton miktarı `from` adresinden `to` adresine gönderildiğinde tetiklenir.

Yeni jetonları basma (minting) durumunda, transfer genellikle `from` 0x00..0000 adresinden yapılırken, jetonları yakma (burning) durumunda transfer `to` 0x00..0000 adresine yapılır.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

Bu olay, `value` miktarındaki jetonun `spender` tarafından kullanılması için `owner` tarafından onaylandığında tetiklenir.

## ERC-20 jetonlarının temel bir uygulaması {#a-basic-implementation-of-erc-20-tokens}

Aşağıda, ERC-20 jetonunuzu temel alabileceğiniz en basit kod yer almaktadır:

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

ERC-20 jeton standardının bir başka mükemmel uygulaması da [OpenZeppelin ERC-20 uygulamasıdır](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
