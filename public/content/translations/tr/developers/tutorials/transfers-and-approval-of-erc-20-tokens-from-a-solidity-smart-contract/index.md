---
title: "Bir Solidity akıllı sözleşmesinden ERC-20 Token transferleri ve onayları"
description: "Solidity kullanarak ERC-20 Token transferlerini ve onaylarını işleyen bir DEX akıllı sözleşmesi oluşturun."
author: "jdourlens"
tags: ["akıllı sözleşmeler", "token'lar", "Solidity", "erc-20"]
skill: intermediate
breadcrumb: ERC-20 transferleri
lang: tr
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Önceki eğitimde Ethereum Blokzincir üzerinde [Solidity'de bir ERC-20 Token'ının anatomisini](/developers/tutorials/understand-the-erc-20-token-smart-contract/) incelemiştik. Bu makalede, Solidity dilini kullanarak bir Token ile etkileşime girmek için bir akıllı sözleşmeyi nasıl kullanabileceğimizi göreceğiz.

Bu akıllı sözleşme için, bir kullanıcının yeni dağıttığımız [ERC-20 Token'ı](/developers/docs/standards/tokens/erc-20/) karşılığında Ether takas edebileceği gerçek bir sahte merkeziyetsiz borsa (DEX) oluşturacağız.

Bu eğitim için önceki eğitimde yazdığımız kodu temel olarak kullanacağız. DEX'imiz, kurucu (constructor) içinde sözleşmenin bir örneğini oluşturacak ve şu işlemleri gerçekleştirecektir:

- Token'ları Ether ile takas etmek
- Ether'i Token'lar ile takas etmek

Basit ERC20 kod tabanımızı ekleyerek Merkeziyetsiz borsa kodumuza başlayacağız:

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

Yeni DEX akıllı sözleşmemiz ERC-20'yi dağıtacak ve sağlanan tüm arzı alacaktır:

```solidity
contract DEX {

    IERC20 public token;

    event Bought(uint256 amount);
    event Sold(uint256 amount);

    constructor() {
        token = new ERC20Basic();
    }

    function buy() payable public {
        // TODO
    }

    function sell(uint256 amount) public {
        // TODO
    }

}
```

Böylece artık DEX'imize sahibiz ve tüm Token rezervi mevcut. Sözleşmenin iki işlevi vardır:

- `buy`: Kullanıcı Ether gönderip karşılığında Token alabilir
- `sell`: Kullanıcı Ether'i geri almak için Token göndermeye karar verebilir

## Satın alma (buy) işlevi {#the-buy-function}

Satın alma işlevini kodlayalım. İlk olarak mesajın içerdiği Ether miktarını kontrol etmemiz, sözleşmelerin yeterli Token'a sahip olduğunu ve mesajın bir miktar Ether içerdiğini doğrulamamız gerekecek. Sözleşme yeterli Token'a sahipse, kullanıcıya Token miktarını gönderecek ve `Bought` olayını (event) yayınlayacaktır.

Bir hata durumunda `require` işlevini çağırırsak, gönderilen Ether'in doğrudan geri alınacağını (revert) ve kullanıcıya geri verileceğini unutmayın.

İşleri basit tutmak için, sadece 1 Token'ı 1 Wei ile takas ediyoruz.

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "You need to send some ether");
    require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
}
```

Satın alma işleminin başarılı olması durumunda işlemde iki olay görmeliyiz: Token `Transfer` ve `Bought` olayı.

![Two events in the transaction: Transfer and Bought](./transfer-and-bought-events.png)

## Satış (sell) işlevi {#the-sell-function}

Satıştan sorumlu işlev, ilk olarak kullanıcının önceden `approve` işlevini çağırarak miktarı onaylamasını gerektirecektir. Transferi onaylamak, DEX tarafından örneği oluşturulan ERC20Basic Token'ının kullanıcı tarafından çağrılmasını gerektirir. Bu, DEX'in `token` adlı ERC20Basic sözleşmesini dağıttığı Adresi almak için önce DEX sözleşmesinin `token()` işlevini çağırarak elde edilebilir. Ardından oturumumuzda bu sözleşmenin bir örneğini oluştururuz ve onun `approve` işlevini çağırırız. Daha sonra DEX'in `sell` işlevini çağırabilir ve Token'larımızı tekrar Ether ile takas edebiliriz. Örneğin, etkileşimli bir Brownie oturumunda bu şu şekilde görünür:

```python
#### Etkileşimli Brownie konsolunda Python...

# DEX'i dağıt
dex = DEX.deploy({'from':account1})

# Ether'i Token ile takas etmek için buy fonksiyonunu çağır
# 1e18, Wei cinsinden 1 Ether'dir
dex.buy({'from': account2, 1e18})

# ERC-20 Token için dağıtım Adresini al
# DEX Sözleşmesi oluşturulurken dağıtılan
# dex.token(), Token için dağıtılan Adresi döndürür
token = ERC20Basic.at(dex.token())

# Token'ın approve fonksiyonunu çağır
# DEX Adresini harcayıcı olarak onayla
# ve Token'larınızdan ne kadarını harcamasına izin verildiğini
token.approve(dex.address, 3e18, {'from':account2})

```

Ardından satış işlevi çağrıldığında, çağıran Adresten sözleşme Adresine yapılan transferin başarılı olup olmadığını kontrol edeceğiz ve ardından Ether'leri çağıran Adrese geri göndereceğiz.

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "You need to sell at least some tokens");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "Check the token allowance");
    token.transferFrom(msg.sender, address(this), amount);
    payable(msg.sender).transfer(amount);
    emit Sold(amount);
}
```

Her şey çalışırsa, işlemde 2 olay (bir `Transfer` ve `Sold`) görmelisiniz ve Token bakiyeniz ile Ether bakiyeniz güncellenmiş olmalıdır.

![Two events in the transaction: Transfer and Sold](./transfer-and-sold-events.png)

<Divider />

Bu eğitimden, bir ERC-20 Token'ının bakiyesini ve harcama iznini (allowance) nasıl kontrol edeceğimizi ve ayrıca arayüzü kullanarak bir ERC20 akıllı sözleşmesinin `Transfer` ve `TransferFrom` işlevlerini nasıl çağıracağımızı gördük.

Bir işlem yaptıktan sonra, sözleşmenize yapılan [işlemleri beklemek ve bunlar hakkında ayrıntılı bilgi almak](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) için bir JavaScript eğitimimiz ve ABI'ye sahip olduğunuz sürece [Token transferleri veya diğer olaylar tarafından oluşturulan olayları çözmek için bir eğitimimiz](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/) bulunmaktadır.

İşte eğitimin tam kodu:

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


contract DEX {

    event Bought(uint256 amount);
    event Sold(uint256 amount);


    IERC20 public token;

    constructor() {
        token = new ERC20Basic();
    }

    function buy() payable public {
        uint256 amountTobuy = msg.value;
        uint256 dexBalance = token.balanceOf(address(this));
        require(amountTobuy > 0, "You need to send some ether");
        require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "You need to sell at least some tokens");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "Check the token allowance");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
        emit Sold(amount);
    }

}
```