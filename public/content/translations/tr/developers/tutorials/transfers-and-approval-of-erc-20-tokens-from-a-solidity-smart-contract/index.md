---
title: ERC-20 token'larının bir solidity akıllı sözleşmesinden transferleri ve doğrulanması
description: Solidity dilini kullanarak bir token'la etkileşim kurmak için akıllı bir sözleşme nasıl kullanılır
author: "jdourlens"
tags:
  - "akıllı sözleşmeler"
  - "token'lar"
  - "katılık"
  - "erc-20"
skill: intermediate
lang: tr
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Önceki öğreticide Ethereum blok zincirindeki [bir ERC-20 token'ının Solidity içindeki anatomisi](/developers/tutorials/understand-the-erc-20-token-smart-contract/) üzerine çalıştık. Bu makalede, bir akıllı sözleşmeyi bir token'la etkileşime geçmek için Solidity diliyle nasıl kullanabileceğimizi göreceğiz.

Bu akıllı sözleşme için bir kullanıcının yeni dağıtılmış [ERC-20 jetonumuz](/developers/docs/standards/tokens/erc-20/) karşılığında ether takas edebileceği sahte bir merkeziyetsiz borsa oluşturacağız.

Bu öğreticide, önceki öğreticide yazdığımız kodu temel olarak kullanacağız. DEX'imiz, kendi inşasında sözleşmenin bir örneğini oluşturacak ve bu işlemleri gerçekleştirecektir:

- token'ları ether ile takas etmek
- ether'ı token'lar ile takas etmek

Merkeziyetsiz borsa kodumuza basit ERC20 kod temelimizi ekleyerek başlayacağız:

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

Yeni DEX akıllı sözleşmemiz ERC-20'yi dağıtacak ve tüm arzı alacak:

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

Artık kendi DEX'imize sahibiz ve DEX'imiz mevcut tüm token rezervlerine sahip. Sözleşmede iki fonksiyon bulunur:

- `buy`: Kullanıcı ether gönderip karşılığında token alabilir
- `sell`: Kullanıcı token göndererek karşılığında ether almayı seçebilir

## "Buy" Fonksiyonu {#the-buy-function}

"Buy" fonksiyonunu kodlayalım. İlk olarak, mesajın içerdiği ether miktarını kontrol etmemiz; sözleşmenin yeterli token'a sahip olduğunu ve mesajın ether içerdiğini doğrulamamız gerekir. Eğer sözleşme yeterli token'a sahipse token miktarını kullanıcıya gönderecek ve `Bought` olayını yayacaktır.

Bir hata durumunda "require" fonksiyonunu çağırırsak gönderilen ether'ın doğrudan eskiye döndürüleceğini ve kullanıcıya geri verileceğini unutmayın.

İşleri basitleştirmek için 1 token'ı 1 Wei ile takas ediyoruz.

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

"Buy" fonksiyonunun başarılı olduğu durumda işlemde iki olay görmeliyiz: token `Transfer` olayı ve `Bought` olayı.

![İşlemdeki iki olay: Transfer ve Bought](./transfer-and-bought-events.png)

## "Sell" fonksiyonu {#the-sell-function}

Satıştan sorumlu olan fonksiyon, ilk olarak kullanıcının önceden doğrulama fonksiyonunu çağırarak miktarı doğrulamış olmasını gerektirecektir. Aktarımı onaylamak, DEX tarafından somutlaştırılan ERC20Basic token'ınını kullanıcı tarafından çağrılmasını gerektirir. Bu, DEX'in `token` adlı ERC20Basic sözleşmesini dağıttığı adresi almak için önce DEX sözleşmesinin `token()` fonksiyonunu çağırarak başarılabilir. Ardından, oturumumuzda bu sözleşmenin bir örneğini oluşturur ve `onay` fonksiyonunu çağırırız. Ardından, DEX'in `sell` fonksiyonunu çağırabilir ve token'larımızı ether için geri değiştirebiliriz. Örneğin, etkileşimli bir kek oturumunda bu, şöyle görünür:

```python
#### Python in interactive brownie console...

# deploy the DEX
dex = DEX.deploy({'from':account1})

# call the buy function to swap ether for token
# 1e18 is 1 ether denominated in wei
dex.buy({'from': account2, 1e18})

# get the deployment address for the ERC20 token
# that was deployed during DEX contract creation
# dex.token() returns the deployed address for token
token = ERC20Basic.at(dex.token())

# call the token's approve function
# approve the dex address as spender
# and how many of your tokens it is allowed to spend
token.approve(dex.address, 3e18, {'from':account2})

```

Sonra "sell" fonksiyonu çağırıldığında, çağıran adresten sözleşme adresine olan transferin başarılı olup olmadığını kontrol edeceğiz ve çağıran adrese ether'ları geri göndereceğiz.

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

Her şey çalışıyorsa işlemde 2 olay görmelisiniz (`Transfer` ve `Sold`) ve jeton bakiyeniz ile ether bakiyeniz güncellenmiş olmalıdır.

![İşlemdeki iki olay: Transfer ve Sold](./transfer-and-sold-events.png)

<Divider />

Bu öğreticide, bir ERC-20 tokenin bakiyesi ve ödeneği nasıl kontrol edilir ve bir ERC20 akıllı sözleşmesinden `Transfer` ve `TransferFrom` arayüzleri kullanılarak nasıl çağırılır gördük.

Bir işlem yaptıktan sonra, [beklemek ve sözleşmenizde yapılan işlemlerle ilgili detayları almak](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) için bir JavaScript öğreticimiz ve [ABI'ye sahip olduğunuz sürece token transferleri veya diğer olaylar tarafından oluşturulan olayların kodunu çözmek için bir öğreticimiz bulunuyor](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/).

Öğretici için tam kod buradadır:

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
