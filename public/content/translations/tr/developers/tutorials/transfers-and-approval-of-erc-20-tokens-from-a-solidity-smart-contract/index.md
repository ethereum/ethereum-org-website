---
title: "Bir Solidity akıllı sözleşmesinden ERC-20 Token transferleri ve onayları"
description: "Solidity kullanarak ERC-20 Token transferlerini ve onaylarını işleyen bir DEX akıllı sözleşmesi oluşturun."
author: "jdourlens"
tags: ["akıllı sözleşmeler", "token'lar", "Solidity", "erc-20"]
skill: intermediate
breadcrumb: ERC-20 transferleri
lang: tr
published: 2020-04-07
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Önceki eğitimde Ethereum Blokzinciri üzerinde [Solidity'de bir ERC-20 Token'ının anatomisini](/developers/tutorials/erc20-annotated-code/) inceledik. Bu makalede, Solidity dilini kullanarak bir Token ile etkileşime girmek için bir akıllı sözleşmeyi nasıl kullanabileceğimizi göreceğiz.

Bu akıllı sözleşme için, bir kullanıcının yeni dağıtılan [ERC-20 Token'ımız](/developers/docs/standards/tokens/erc-20/) karşılığında Ether takas edebileceği örnek bir merkeziyetsiz borsa (DEX) oluşturacağız.

Bu eğitim için temel olarak minimal bir ERC-20 uygulaması kullanacağız. DEX'imiz, kurucusunda sözleşmenin bir örneğini oluşturacak ve şu işlemleri gerçekleştirecektir:

- Token'ları Ether ile takas etmek
- Ether'i Token'lar ile takas etmek

Basit ERC20 kod tabanımızı ekleyerek Merkeziyetsiz borsa kodumuza başlayacağız:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

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

Artık DEX'imize sahibiz ve tüm Token rezervi mevcut. Sözleşmenin iki işlevi vardır:

- `buy`: Kullanıcı Ether gönderebilir ve karşılığında Token alabilir
- `sell`: Kullanıcı Ether'i geri almak için Token göndermeye karar verebilir

## buy işlevi {#the-buy-function}

buy işlevini kodlayalım. İlk olarak mesajın içerdiği Ether miktarını kontrol etmemiz, sözleşmelerin yeterli Token'a sahip olduğunu ve mesajın içinde bir miktar Ether bulunduğunu doğrulamamız gerekecek. Sözleşme yeterli Token'a sahipse, kullanıcıya Token miktarını gönderecek ve `Bought` olayını yayınlayacaktır.

Bir hata durumunda require işlevini çağırırsak, gönderilen Ether'in doğrudan geri alınacağını ve kullanıcıya iade edileceğini unutmayın.

İşleri basit tutmak için, 1 Token temel birimini 1 Wei ile takas ediyoruz. Token, Ether gibi 18 ondalık basamağa sahip olduğundan, 1 Ether göndermek tam olarak 1 Token satın alır.

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "You need to send some ether");
    require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
    require(token.transfer(msg.sender, amountTobuy), "Token transfer failed");
    emit Bought(amountTobuy);
}
```

Satın alma işleminin başarılı olması durumunda işlemde iki olay görmeliyiz: Token `Transfer` ve `Bought` olayı.

![İşlemdeki iki olay: Transfer ve Bought](./transfer-and-bought-events.png)

## sell işlevi {#the-sell-function}

Satıştan sorumlu işlev, ilk olarak kullanıcının önceden approve işlevini çağırarak miktarı onaylamış olmasını gerektirecektir. Transferi onaylamak, DEX tarafından örneği oluşturulan ERC20Basic Token'ının kullanıcı tarafından çağrılmasını gerektirir. Bu, DEX'in `token` adlı ERC20Basic sözleşmesini dağıttığı adresi almak için önce DEX sözleşmesinin `token()` işlevini çağırarak gerçekleştirilebilir. Ardından onun `approve` işlevini çağırırız. Daha sonra DEX'in `sell` işlevini çağırabilir ve Token'larımızı tekrar Ether ile takas edebiliriz.

Remix'te, `token()` tarafından döndürülen adresi kopyalayın, Deploy & Run panelinin sözleşme listesinde `ERC20Basic` öğesini seçin, adresi **At Address** alanına yapıştırın ve oradan `approve` işlevini çağırın. Komut satırından, aynısını [Foundry](https://getfoundry.sh/introduction/installation) ile yapabilirsiniz: bu eğitimin sonundaki tam kodu yeni bir projede (`forge init dex`) `src/DEX.sol` olarak kaydedin, ardından ayrı bir terminalde yerel bir geliştirme zinciri başlatın:

```sh
anvil
```

Anvil, fonlanmış test hesaplarının ve bunların özel anahtarlarının bir listesini yazdırır. DEX'i dağıtmak, Token satın almak ve DEX'in bunları harcamasını onaylamak için bunlardan ikisini kullanın:

```sh
export RPC_URL=http://127.0.0.1:8545
export ACCOUNT1_KEY=<private key (0) printed by anvil>
export ACCOUNT2_KEY=<private key (1) printed by anvil>

# DEX'i dağıt
forge create src/DEX.sol:DEX --rpc-url $RPC_URL --private-key $ACCOUNT1_KEY --broadcast

# yukarıdaki çıktıdan "Deployed to" adresini kopyala
export DEX=<DEX contract address>

# Ether'i Token'lar ile takas etmek için buy fonksiyonunu çağır
# 1 Ether 10^18 Wei'dir, bu yüzden bu 1 tam Token satın alır
cast send $DEX "buy()" --value 1ether --rpc-url $RPC_URL --private-key $ACCOUNT2_KEY

# ERC20 Token'ı için dağıtım adresini al
# DEX Sözleşmesi oluşturulurken dağıtılan
export TOKEN=$(cast call $DEX "token()(address)" --rpc-url $RPC_URL)

# Token'ın onaylama fonksiyonunu çağır
# DEX adresini harcayıcı olarak onayla
# ve Token'larınızın ne kadarını harcamasına izin verildiğini
cast send $TOKEN "approve(address,uint256)" $DEX 1ether --rpc-url $RPC_URL --private-key $ACCOUNT2_KEY
```

Ardından sell işlevi çağrıldığında, çağıran adresinden sözleşme adresine yapılan transferin başarılı olup olmadığını kontrol edeceğiz ve ardından Ether'leri çağıran adresine geri göndereceğiz. Ether, [kontroller-etkiler-etkileşimler (checks-effects-interactions) modelini](https://docs.soliditylang.org/en/latest/security-considerations.html#use-the-checks-effects-interactions-pattern) izleyerek tüm kontrollerden ve durum değişikliklerinden sonra en son gönderilir. `transfer` Solidity'nin son sürümlerinde kullanımdan kaldırıldığı için, onu düşük seviyeli bir `call` ile gönderiyor ve başarılı olduğunu kontrol ediyoruz.

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "You need to sell at least some tokens");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "Check the token allowance");
    require(token.transferFrom(msg.sender, address(this), amount), "Token transfer failed");
    emit Sold(amount);
    (bool sent, ) = payable(msg.sender).call{value: amount}("");
    require(sent, "Failed to send ether");
}
```

Foundry ile geri takas işlemi şu şekilde görünür:

```sh
cast send $DEX "sell(uint256)" 1ether --rpc-url $RPC_URL --private-key $ACCOUNT2_KEY

# ikinci hesabın bakiyelerini kontrol et
export ACCOUNT2=$(cast wallet address --private-key $ACCOUNT2_KEY)
cast call $TOKEN "balanceOf(address)(uint256)" $ACCOUNT2 --rpc-url $RPC_URL
cast balance $ACCOUNT2 --ether --rpc-url $RPC_URL
```

Her şey çalışırsa, işlemde 2 olay (bir `Transfer` ve `Sold`) görmelisiniz ve Token bakiyeniz ile Ether bakiyeniz güncellenmiş olmalıdır.

![İşlemdeki iki olay: Transfer ve Sold](./transfer-and-sold-events.png)

<Divider />

Bu eğitimden, bir ERC-20 Token'ının bakiyesini ve harcama iznini nasıl kontrol edeceğimizi ve ayrıca arayüzü kullanarak bir ERC20 akıllı sözleşmesinin `Transfer` ve `TransferFrom` işlevlerini nasıl çağıracağımızı gördük.

DEX'in `transfer` ve `transferFrom` tarafından döndürülen `bool` değerini kontrol ettiğini unutmayın. Pratikteki bazı Token'lar standardı tam olarak takip etmez ve hiçbir şey döndürmez; sözleşmenizin rastgele ERC-20 Token'ları ile çalışması gerektiğinde, OpenZeppelin'in [SafeERC20](https://docs.openzeppelin.com/contracts/5.x/api/token/erc20#SafeERC20) gibi bir sarmalayıcı kullanın.

Bir işlem yaptıktan sonra, ABI'ye sahip olduğunuz sürece [işlemin bir bloğa dahil edilmesini beklemek](https://viem.sh/docs/actions/public/waitForTransactionReceipt) ve Token transferleri veya diğer olaylar tarafından oluşturulan [olayları çözmek](https://viem.sh/docs/contract/parseEventLogs) için Viem gibi bir JavaScript kütüphanesi kullanabilirsiniz. Ayrıca bkz. [olaylarla akıllı sözleşmelerden veri kaydetme](/developers/tutorials/logging-events-smart-contracts/).

İşte eğitim için tam kod:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

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
        require(token.transfer(msg.sender, amountTobuy), "Token transfer failed");
        emit Bought(amountTobuy);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "You need to sell at least some tokens");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "Check the token allowance");
        require(token.transferFrom(msg.sender, address(this), amount), "Token transfer failed");
        emit Sold(amount);
        (bool sent, ) = payable(msg.sender).call{value: amount}("");
        require(sent, "Failed to send ether");
    }

}
```
