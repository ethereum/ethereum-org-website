---
title: Bir Solidity akıllı sözleşmesinden ERC-20 jetonlarının transferleri ve onaylanması
description: Solidity kullanarak ERC-20 jeton transferlerini ve onaylarını yöneten bir DEX akıllı sözleşmesi oluşturun.
author: "jdourlens"
tags: [ "akıllı kontratlar", "token'lar", "katılık", "erc-20" ]
skill: intermediate
lang: tr
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Önceki öğreticide, Ethereum blokzincirindeki [bir ERC-20 jetonunun Solidity'deki anatomisi](/developers/tutorials/understand-the-erc-20-token-smart-contract/) üzerine çalıştık. Bu makalede, bir akıllı sözleşmeyi bir jetonla etkileşime geçmek için Solidity diliyle nasıl kullanabileceğimizi göreceğiz.

Bu akıllı sözleşme için, bir kullanıcının yeni dağıtılan [ERC-20 jetonumuz](/developers/docs/standards/tokens/erc-20/) karşılığında ether takas edebileceği, deneme amaçlı bir merkeziyetsiz borsa oluşturacağız.

Bu öğreticide, önceki öğreticide yazdığımız kodu temel olarak kullanacağız. Merkeziyetsiz borsamız (DEX), kurucusunda sözleşmenin bir örneğini oluşturacak ve aşağıdaki işlemleri gerçekleştirecektir:

- jetonları ether ile takas etme
- ether'ı jetonlar ile takas etme

Merkeziyetsiz borsa kodumuza basit ERC20 kod tabanımızı ekleyerek başlayacağız:

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

Yeni DEX akıllı sözleşmemiz ERC-20'yi dağıtacak ve tüm arzı alacaktır:

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

Böylece artık kendi DEX'imiz var ve mevcut tüm jeton rezervine sahip. Sözleşmenin iki fonksiyonu vardır:

- `buy`: Kullanıcı ether gönderip karşılığında jeton alabilir
- `sell`: Kullanıcı, ether'larını geri almak için jeton göndermeyi seçebilir

## Satın alma fonksiyonu {#the-buy-function}

`buy` fonksiyonunu kodlayalım. Öncelikle mesajın içerdiği ether miktarını kontrol etmemiz ve sözleşmelerin yeterli jetona sahip olduğunu ve mesajda bir miktar ether bulunduğunu doğrulamamız gerekecek. Sözleşme yeterli jetona sahipse, kullanıcıya ilgili sayıda jetonu gönderir ve `Bought` olayını yayar.

Bir hata durumunda `require` fonksiyonunu çağırırsak gönderilen ether'in doğrudan geri çevrileceğini ve kullanıcıya iade edileceğini unutmayın.

İşleri basitleştirmek için, 1 jetonu 1 Wei ile takas ediyoruz.

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

Satın alma işleminin başarılı olduğu durumda, işlemde iki olay görmeliyiz: Jeton `Transfer` olayı ve `Bought` olayı.

![İşlemdeki iki olay: Transfer ve Bought](./transfer-and-bought-events.png)

## Satış fonksiyonu {#the-sell-function}

Satıştan sorumlu fonksiyon, öncelikle kullanıcının `approve` (onaylama) fonksiyonunu önceden çağırarak miktarı onaylamış olmasını gerektirecektir. Transferin onaylanması, DEX tarafından örneği oluşturulan ERC20Basic jetonunun kullanıcı tarafından çağrılmasını gerektirir. Bu, DEX'in `token` adlı ERC20Basic sözleşmesini dağıttığı adresi almak için önce DEX sözleşmesinin `token()` fonksiyonu çağrılarak sağlanabilir. Ardından, oturumumuzda bu sözleşmenin bir örneğini oluşturur ve `approve` fonksiyonunu çağırırız. Ardından DEX'in `sell` fonksiyonunu çağırabilir ve jetonlarımızı tekrar ether ile takas edebiliriz. Örneğin, etkileşimli bir brownie oturumunda bu şöyle görünür:

```python
#### Etkileşimli brownie konsolunda Python...

# DEX'i dağıt
dex = DEX.deploy({'from':account1})

# ether'ı jetonla takas etmek için buy fonksiyonunu çağır
# 1e18, wei cinsinden 1 ether'dir
dex.buy({'from': account2, 1e18})

# DEX sözleşmesi oluşturulurken dağıtılan
# ERC20 jetonunun dağıtım adresini al
# dex.token(), jetonun dağıtım adresini döndürür
token = ERC20Basic.at(dex.token())

# jetonun approve fonksiyonunu çağır
# dex adresini harcayıcı olarak onayla
# ve jetonlarından ne kadarını harcamasına izin verildiğini belirt
token.approve(dex.address, 3e18, {'from':account2})

```

Ardından `sell` fonksiyonu çağrıldığında, çağıranın adresinden sözleşme adresine transferin başarılı olup olmadığını kontrol edecek ve ardından ether'i çağıranın adresine geri göndereceğiz.

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

Her şey yolunda giderse, işlemde 2 olay (`Transfer` ve `Sold`) görmeli ve jeton bakiyeniz ile ether bakiyenizin güncellendiğini görmelisiniz.

![İşlemdeki iki olay: Transfer ve Sold](./transfer-and-sold-events.png)

<Divider />

Bu öğreticide, bir ERC-20 jetonunun bakiyesini ve harcama iznini (allowance) nasıl kontrol edeceğimizi ve ayrıca arayüzü kullanarak bir ERC20 akıllı sözleşmesinin `Transfer` ve `TransferFrom` fonksiyonlarını nasıl çağıracağımızı gördük.

Bir işlem gerçekleştirdiğinizde, sözleşmenize yapılan [işlemlerin tamamlanmasını beklemek ve ayrıntılarını almak](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) ve ABI'niz olduğu sürece [jeton transferleri veya diğer herhangi bir olay tarafından oluşturulan olayların kodunu çözmek](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/) için bir JavaScript öğreticimiz var.

Öğreticinin tam kodu aşağıdadır:

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
