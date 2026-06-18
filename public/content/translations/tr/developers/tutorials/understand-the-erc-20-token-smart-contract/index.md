---
title: ERC-20 Token akıllı sözleşmesini anlamak
description: Eksiksiz bir Solidity akıllı sözleşme örneği ve açıklamasıyla ERC-20 Token standardını nasıl uygulayacağınızı öğrenin.
author: "jdourlens"
tags: ["akıllı sözleşmeler", "tokenlar", "solidity", "erc-20"]
skill: beginner
breadcrumb: ERC-20 Token temelleri
lang: tr
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Ethereum üzerindeki en önemli [akıllı sözleşme standartlarından](/developers/docs/standards/) biri, misli token uygulamaları için Ethereum blokzincirindeki tüm akıllı sözleşmelerde kullanılan teknik standart olarak ortaya çıkan [ERC-20](/developers/docs/standards/tokens/erc-20/)'dir.

ERC-20, tüm misli Ethereum tokenlarının uyması gereken ortak bir kurallar listesi tanımlar. Sonuç olarak bu Token standardı, her türden geliştiricinin yeni tokenların daha geniş Ethereum sistemi içinde nasıl işleyeceğini doğru bir şekilde tahmin etmesini sağlar. Bu, geliştiricilerin görevlerini basitleştirir ve kolaylaştırır; çünkü Token kurallara uyduğu sürece, yeni bir Token piyasaya sürüldüğünde her yeni projenin baştan yapılması gerekmeyeceğini bilerek çalışmalarına devam edebilirler.

İşte bir arayüz olarak sunulan, bir ERC-20'nin uygulaması gereken işlevler. Bir arayüzün ne olduğundan emin değilseniz: [Solidity'de OOP programlama](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/) hakkındaki makalemize göz atın.

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

İşte her bir işlevin ne işe yaradığının satır satır açıklaması. Bundan sonra ERC-20 Token'ının basit bir uygulamasını sunacağız.

## Getter'lar {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

Var olan Token miktarını döndürür. Bu işlev bir getter'dır ve sözleşmenin durumunu değiştirmez. Solidity'de ondalıklı sayı (float) olmadığını unutmayın. Bu nedenle çoğu Token 18 ondalık basamak benimser ve toplam arzı ve diğer sonuçları 1 Token için 1000000000000000000 şeklinde döndürür. Her Token 18 ondalık basamağa sahip değildir ve bu, tokenlarla uğraşırken gerçekten dikkat etmeniz gereken bir şeydir.

```solidity
function balanceOf(address account) external view returns (uint256);
```

Bir adresin (`account`) sahip olduğu Token miktarını döndürür. Bu işlev bir getter'dır ve sözleşmenin durumunu değiştirmez.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

ERC-20 standardı, bir adresin kendisinden Token alabilmesi için başka bir adrese harcama izni vermesine olanak tanır. Bu getter, `spender` adresinin `owner` adına harcamasına izin verilecek kalan Token sayısını döndürür. Bu işlev bir getter'dır, sözleşmenin durumunu değiştirmez ve varsayılan olarak 0 döndürmelidir.

## İşlevler {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

`amount` miktarındaki Token'ı işlevi çağıran adresten (`msg.sender`) alıcı adresine transfer eder. Bu işlev, daha sonra tanımlanan `Transfer` olayını yayar. Transfer mümkün olduysa true döndürür.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

`spender` adresinin, işlevi çağıranın (`msg.sender`) bakiyesinden transfer etmesine izin verilen `allowance` miktarını ayarlar. Bu işlev Approval olayını yayar. İşlev, harcama izninin başarıyla ayarlanıp ayarlanmadığını döndürür.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Harcama izni mekanizmasını kullanarak `amount` miktarındaki Token'ı `sender` adresinden `recipient` adresine transfer eder. Miktar daha sonra çağıranın harcama izninden düşülür. Bu işlev `Transfer` olayını yayar.

## Olaylar {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Bu olay, Token miktarı (value) `from` adresinden `to` adresine gönderildiğinde yayılır.

Yeni Token basımı (minting) durumunda, transfer genellikle 0x00..0000 adresinden (`from`) yapılırken, Token yakımı (burn) durumunda transfer 0x00..0000 adresine (`to`) yapılır.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

Bu olay, Token miktarı (`value`) `owner` tarafından `spender` adresinin kullanımına onaylandığında yayılır.

## ERC-20 tokenlarının temel bir uygulaması {#a-basic-implementation-of-erc-20-tokens}

İşte ERC-20 Token'ınızı dayandırabileceğiniz en basit kod:

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

ERC-20 Token standardının bir başka mükemmel uygulaması da [OpenZeppelin ERC-20 uygulamasıdır](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).