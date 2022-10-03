---
title: Bir DeFi uygulaması oluşturun ve dağıtın
description: ERC20 token'larını akıllı sözleşmeye yatırın ve Farm Token'ları basın
author: "strykerin"
tags:
  - "solidity"
  - "defi"
  - "web3.js"
  - "truffle"
  - "ganache"
  - "akıllı sözleşmeler"
skill: intermediate
lang: tr
published: 2020-12-31
source: github.com
sourceUrl: https://github.com/strykerin/DeFi-Token-Farm
---

Bu öğreticide, kullanıcıların akıllı sözleşmeye bir ERC20 token'ı yatırabilecekleri ve Farm Token'larını basıp onlara aktarabilecekleri, Solidity ile bir DeFi Uygulaması oluşturacağız. Kullanıcılar daha sonra Farm Token'larını akıllı sözleşmede yakarak ERC20 token'larını geri çekebilirler ve ERC20 token'ları kendilerine geri aktarılır.

## Truffle ve Ganache kurun {#install-truffle-and-ganache}

İlk kez bir akıllı sözleşme yazıyorsanız, ortamınızı ayarlamanız gerekecektir. İki araç kullanacağız: [Truffle](https://www.trufflesuite.com/) ve [Ganache](https://www.trufflesuite.com/ganache).

Truffle, Ethereum için akıllı sözleşmeler geliştirmek için bir geliştirme ortamı ve test çerçevesidir. Truffle ile akıllı sözleşmeler oluşturmak ve blok zincirine yerleştirmek kolaydır. Ganache, akıllı sözleşmeleri test etmek için yerel bir Ethereum blok zinciri oluşturmamıza izin veriyor. Gerçek ağın özelliklerini simüle eder ve ilk 10 hesap 100 test ether'ı ile finanse edilir, böylece akıllı sözleşme dağıtımını ve testini ücretsiz ve kolay hâle getirir. Ganache, bir masaüstü uygulaması ve bir komut satırı aracı olarak mevcuttur. Bu makale için UI masaüstü uygulamasını kullanacağız.

![Ganache UI masaüstü uygulaması](https://cdn-images-1.medium.com/max/2360/1*V1iQ5onbLbT5Ib2QaiOSyg.png)_Ganache UI masaüstü uygulaması_

Projeyi oluşturmak için aşağıdaki komutları çalıştırın

```bash
mkdir your-project-name
cd your-project-name
truffle init
```

Bu, akıllı sözleşmelerimizin geliştirilmesi ve uygulanması için boş bir proje oluşturacaktır. Oluşturulan proje yapısı aşağıdaki gibidir:

- `contracts`: Solidity akıllı sözleşmeleri için klasör

- `migrations`: Dağıtım komut dosyaları için klasör

- `test`: Akıllı sözleşmelerimizin testi için klasör

- `truffle-config.js`: Truffle yapılandırma dosyası

## ERC20 Token'ını Oluşturun {#create-the-erc20-token}

Öncelikle akıllı sözleşmede stake etmek için kullanacağımız ERC20 token'ımızı oluşturmamız gerekiyor. Değiştirilebilir simgemizi oluşturmak için önce OpenZeppelin kütüphanesini kurmamız gerekecek. Bu kütüphane, ERC20 ve ERC721 gibi standartların uygulamalarını içerir. Onu kurmak için, şu komutu çalıştırın:

```bash
npm install @openzeppelin/contracts
```

OpenZeppelin kütüphanesini kullanarak, aşağıdaki solidity koduyla `contracts/MyToken.sol`'a yazarak ERC20 token'ımızı oluşturabiliriz:

```solidity
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() public ERC20("MyToken", "MTKN"){
        _mint(msg.sender, 1000000000000000000000000);
    }
}
```

Yukarıdaki kodda:

- 3. Satır: openzeppelin'den bu token standardının uygulamasını içeren ERC20.sol sözleşmesini içe aktarıyoruz.

- 5. Satır: ERC20.sol sözleşmesinden kalıtıma uğruyoruz.

- Satır 6: ERC20.sol yapıcısını çağırıp ad ve sembol parametrelerini sırasıyla `"MyToken"` ve `"MTKN"` olarak geçiyoruz.

- 7. Satır: Akıllı sözleşmeyi dağıtan hesap için 1 milyon token basıyor ve aktarıyoruz (ERC20 token'ı için varsayılan 18 ondalık basamağı kullanıyoruz. Bu, 1 token basmak istiyorsak, onu 10000000000000000000, 1'den sonra 18 sıfır, olarak temsil edeceğiniz anlamına gelir).

`_decimals` alanının 18 olarak ayarlandığı ERC20.sol yapıcı uygulamasını aşağıda görebiliriz:

```solidity
string private _name;
string private _symbol;
uint8 private _decimals;

constructor (string memory name_, string memory symbol_) public {
    _name = name_;
    _symbol = symbol_;
    _decimals = 18;
}
```

## ERC20 Token'ını Derleyin {#compile-the-erc20-token}

Akıllı sözleşmemizi derlemek için önce solidity derleyici versiyonumuzu kontrol etmeliyiz. Bunu şu komutu çalıştırarak kontrol edebilirsiniz:

```bash
truffle version
```

Varsayılan versiyon `Solidity v0.5.16`'dır. Token'ımız `0.6.2` solidity versiyonu kullanılarak yazıldığından, sözleşmelerimizi derlemek için komutu çalıştırırsak bir derleyici hatası alırız. Hangi solidity derleyici sürümünün kullanılacağını belirlemek için `truffle-config.js` dosyasına gidin ve aşağıda görüldüğü gibi istediğiniz derleyici sürümüne ayarlayın:

```javascript
// Configure your compilers
compilers: {
  solc: {
    version: "^0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)
    // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
    // settings: {          // See the solidity docs for advice about optimization and evmVersion
    //  optimizer: {
    //    enabled: false,
    //    runs: 200
    //  },
    //  evmVersion: "byzantium"
    // }
  }
}
```

Şimdi aşağıdaki komutu çalıştırarak akıllı sözleşmemizi derleyebiliriz:

```bash
truffle compile
```

## ERC20 Token'ını Dağıtın {#deploy-erc20-token}

Derlemeden sonra artık token'ımızı dağıtabiliriz.

`migrations` klasöründe, `2_deploy_Tokens.js` isimli bir dosya oluşturun. Bu dosya, hem ERC20 Token'ımızı hem de FarmToken akıllı sözleşmemizi dağıtacağımız yerdir. Aşağıdaki kod, MyToken.sol sözleşmemizi dağıtmak için kullanılır:

```javascript
const MyToken = artifacts.require("MyToken")

module.exports = async function (deployer, network, accounts) {
  // Deploy MyToken
  await deployer.deploy(MyToken)
  const myToken = await MyToken.deployed()
}
```

Ganache'yi açın ve yerel bir Ethereum blok zinciri başlatmak için "Quickstart" (Hızlı Başlangıç) seçeneğini seçin. Sözleşmemizi dağıtmak için, şunu çalıştırın:

```bash
truffle migrate
```

Sözleşmelerimizi dağıtmak için kullanılan adres, Ganache'nin bize gösterdiği adresler listesinden ilkidir. Bunu doğrulamak için Ganache masaüstü uygulamasını açabiliriz ve akıllı sözleşmelerimizi dağıtmak için ether maliyeti nedeniyle ilk hesap için ether bakiyesinin düştüğünü doğrulayabiliriz:

![Ganache masaüstü uygulaması](https://cdn-images-1.medium.com/max/2346/1*1iJ9VRlyLuza58HL3DLfpg.png)_Ganache masaüstü uygulaması_

Dağıtıcı adresine 1 milyon MyToken token'ının gönderildiğini doğrulamak amacıyla, dağıtılan akıllı sözleşmemizle etkileşim kurmak için Truffle Konsolunu kullanabiliriz.

> [Truffle Konsolu, herhangi bir Ethereum istemcisine bağlanan temel bir etkileşimli konsoldur.](https://www.trufflesuite.com/docs/truffle/getting-started/using-truffle-develop-and-the-console)

Akıllı sözleşmemizle etkileşim kurmak için aşağıdaki komutu çalıştırın:

```bash
truffle console
```

Artık sıradaki komutları terminale yazabiliriz:

- Akıllı sözleşmeyi alın: `myToken = await MyToken.deployed()`

- Ganache'dan hesap dizisini alın: `accounts = await web3.eth.getAccounts()`

- İlk hesabın bakiyesini alın: `balance = await myToken.balanceOf(accounts[0])`

- Bakiyeyi 18 ondalık basamak olarak biçimlendirin: `web3.utils.fromWei(balance.toString())`

Yukarıdaki komutları çalıştırarak, ilk adreste gerçekten de 1 milyon MyTokens olduğunu göreceğiz:

![İlk adreste 1000000 MyToken var](https://cdn-images-1.medium.com/max/2000/1*AQlj9A7dw-qtY4QAD3Bpxw.png)

_İlk adreste 1000000 MyToken var_

## FarmToken Akıllı Sözleşmesini Oluşturun {#create-farmtoken-smart-contract}

FarmToken akıllı sözleşmesinin 3 fonksiyonu olacaktır:

- `balance()`: FarmToken akıllı sözleşmesindeki MyToken bakiyesini alın.

- `deposit(uint256 _amount)`: MyToken'ı kullanıcı adına FarmToken akıllı sözleşmesine aktarın ve ardından FarmToken'ı kullanıcıya aktarın.

- `withdraw(uint256 _amount)`: Kullanıcının FarmToken token'larını yakın ve MyToken token'larını kullanıcının adresine aktarın.

FarmToken yapıcısına bakalım:

```solidity
pragma solidity ^0.6.2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FarmToken is ERC20 {
    using Address for address;
    using SafeMath for uint256; // As of Solidity v0.8.0, mathematical operations can be done safely without the need for SafeMath
    using SafeERC20 for IERC20;

    IERC20 public token;

    constructor(address _token)
        public
        ERC20("FarmToken", "FRM")
    {
        token = IERC20(_token);
    }
```

- 3.-6. Satır: Openzeppelin'den şu sözleşmeleri içe aktarıyoruz: IERC20.sol, Address.sol, SafeERC20.sol ve ERC20.sol.

- Satır 8: FarmToken, ERC20 sözleşmesinden kalıtıma uğrar.

- 14.-19. Satır: FarmToken yapıcısı parametre olarak MyToken sözleşmesinin adresini alacak ve onun sözleşmesini `token` adlı genel değişkenimize atayacağız.

Hadi `balance()` fonksiyonunu uygulayalım. Hiçbir parametre almayacak ve bu akıllı sözleşmedeki MyToken bakiyesini iade edecek. Aşağıda gösterildiği gibi uygulanır:

```solidity
function balance() public view returns (uint256) {
    return token.balanceOf(address(this));
}
```

`deposit(uint256 _amount)` fonksiyonu için, kullanıcının yatırmak istediği miktarı parametre olarak alacak ve FarmToken token'larını basıp kullanıcıya aktaracak:

```solidity
function deposit(uint256 _amount) public {
    // Amount must be greater than zero
    require(_amount > 0, "amount cannot be 0");

    // Transfer MyToken to smart contract
    token.safeTransferFrom(msg.sender, address(this), _amount);

    // Mint FarmToken to msg sender
    _mint(msg.sender, _amount);
}
```

`withdraw(uint256 _amount)` fonksiyonu için, kullanıcının yakmak istediği FarmToken miktarını parametre olarak alacağız ve ardından aynı miktarda MyToken'ı kullanıcıya geri aktaracağız:

```solidity
function withdraw(uint256 _amount) public {
    // Burn FarmTokens from msg sender
    _burn(msg.sender, _amount);

    // Transfer MyTokens from this smart contract to msg sender
    token.safeTransfer(msg.sender, _amount);
}
```

Şimdi akıllı sözleşmemizi dağıtacağız. Bunu yapmak için `2_deploy_Tokens.js` dosyasına geri döneceğiz ve dağıtılacak yeni sözleşmeyi ekleyeceğiz:

```javascript
const MyToken = artifacts.require("MyToken")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (deployer, network, accounts) {
  // Deploy MyToken
  await deployer.deploy(MyToken)
  const myToken = await MyToken.deployed()

  // Deploy Farm Token
  await deployer.deploy(FarmToken, myToken.address)
  const farmToken = await FarmToken.deployed()
}
```

FarmToken'ı dağıtırken, dağıtılmış MyToken sözleşmesinin adresini parametre olarak ilettiğimizi unutmayın.

Şimdi, sözleşmelerimizi dağıtmak için, `truffle compile` ve `truffle migrate` komutlarını çalıştırın.

Akıllı sözleşmemizi test edelim. Akıllı sözleşmemizle etkileşim kurmak için `truffle console` kullanmak yerine, bu işlemi otomatikleştirmek için bir komut dosyası oluşturacağız. `scripts` isimli bir klasör oluşturun ve aşağıdaki `getMyTokenBalance.js` dosyasını ekleyin. FarmToken akıllı sözleşmesindeki MyToken bakiyesini kontrol edecek:

```javascript
const MyToken = artifacts.require("MyToken")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (callback) {
  myToken = await MyToken.deployed()
  farmToken = await FarmToken.deployed()
  balance = await myToken.balanceOf(farmToken.address)
  console.log(web3.utils.fromWei(balance.toString()))
  callback()
}
```

Bu komut dosyasını çalıştırmak için aşağıdaki cli komutunu çalıştırın:

```bash
truffle exec .\scripts\getMyTokenBalance.js
```

0 olan beklenen sonucu alacağız. FarmToken'ın henüz dağıtılmadığına dair bir hata alırsanız truffle ağı, sözleşme kodunuzun en son sürümünü almamıştır. Ganache'yi kapatın, yeniden hızlı bir şekilde başlatın ve `truffle migrate`'i çalıştırdığınızdan emin olun.

Şimdi, akıllı sözleşmeye MyToken stake edelim. `deposit(uint256 _amount)` fonksiyonu ERC20'den `safeTransferFrom` fonksiyonunu çağırdığından, kullanıcının MyToken'ı kullanıcı adına aktarmak için önce akıllı sözleşmeyi onaylaması gerekir. Yani aşağıdaki komut dosyasında önce bu adımı onaylayacağız, sonra fonksiyonu çağıracağız:

```javascript
const MyToken = artifacts.require("MyToken")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (callback) {
  const accounts = await new web3.eth.getAccounts()
  const myToken = await MyToken.deployed()
  const farmToken = await FarmToken.deployed()

  // Returns the remaining number of tokens that spender will be allowed to spend on behalf of owner through transferFrom.
  // This is zero by default.
  const allowanceBefore = await myToken.allowance(
    accounts[0],
    farmToken.address
  )
  console.log(
    "Amount of MyToken FarmToken is allowed to transfer on our behalf Before: " +
      allowanceBefore.toString()
  )

  // In order to allow the Smart Contract to transfer to MyToken (ERC-20) on the accounts[0] behalf,
  // we must explicitly allow it.
  // We allow farmToken to transfer x amount of MyToken on our behalf
  await myToken.approve(farmToken.address, web3.utils.toWei("100", "ether"))

  // Validate that the farmToken can now move x amount of MyToken on our behalf
  const allowanceAfter = await myToken.allowance(accounts[0], farmToken.address)
  console.log(
    "Amount of MyToken FarmToken is allowed to transfer on our behalf After: " +
      allowanceAfter.toString()
  )

  // Verify accounts[0] and farmToken balance of MyToken before and after the transfer
  balanceMyTokenBeforeAccounts0 = await myToken.balanceOf(accounts[0])
  balanceMyTokenBeforeFarmToken = await myToken.balanceOf(farmToken.address)
  console.log("*** My Token ***")
  console.log(
    "Balance MyToken Before accounts[0] " +
      web3.utils.fromWei(balanceMyTokenBeforeAccounts0.toString())
  )
  console.log(
    "Balance MyToken Before TokenFarm " +
      web3.utils.fromWei(balanceMyTokenBeforeFarmToken.toString())
  )

  console.log("*** Farm Token ***")
  balanceFarmTokenBeforeAccounts0 = await farmToken.balanceOf(accounts[0])
  balanceFarmTokenBeforeFarmToken = await farmToken.balanceOf(farmToken.address)
  console.log(
    "Balance FarmToken Before accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenBeforeAccounts0.toString())
  )
  console.log(
    "Balance FarmToken Before TokenFarm " +
      web3.utils.fromWei(balanceFarmTokenBeforeFarmToken.toString())
  )
  // Call Deposit function from FarmToken
  console.log("Call Deposit Function")
  await farmToken.deposit(web3.utils.toWei("100", "ether"))
  console.log("*** My Token ***")
  balanceMyTokenAfterAccounts0 = await myToken.balanceOf(accounts[0])
  balanceMyTokenAfterFarmToken = await myToken.balanceOf(farmToken.address)
  console.log(
    "Balance MyToken After accounts[0] " +
      web3.utils.fromWei(balanceMyTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance MyToken After TokenFarm " +
      web3.utils.fromWei(balanceMyTokenAfterFarmToken.toString())
  )

  console.log("*** Farm Token ***")
  balanceFarmTokenAfterAccounts0 = await farmToken.balanceOf(accounts[0])
  balanceFarmTokenAfterFarmToken = await farmToken.balanceOf(farmToken.address)
  console.log(
    "Balance FarmToken After accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance FarmToken After TokenFarm " +
      web3.utils.fromWei(balanceFarmTokenAfterFarmToken.toString())
  )

  // End function
  callback()
}
```

Bu komut dosyasını çalıştırmak için: `truffle exec .\scripts\transferMyTokenToFarmToken.js`. Konsolunuzda şunu görmelisiniz:

![transferMyTokenToFarmToken.js çıktısı](https://cdn-images-1.medium.com/max/2000/1*MoekE2QCw7vB98u5dl7ang.png)

_transferMyTokenToFarmToken.js çıktısı_

Gördüğümüz gibi, ilk hesapta FarmToken'ları olduğu için MyToken'ları akıllı sözleşmeye başarıyla yatırdık.

Çekmek için:

```javascript
const MyToken = artifacts.require("MyToken")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (callback) {
  const accounts = await new web3.eth.getAccounts()
  const myToken = await MyToken.deployed()
  const farmToken = await FarmToken.deployed()

  // Verify accounts[0] and farmToken balance of MyToken before and after the transfer
  balanceMyTokenBeforeAccounts0 = await myToken.balanceOf(accounts[0])
  balanceMyTokenBeforeFarmToken = await myToken.balanceOf(farmToken.address)
  console.log("*** My Token ***")
  console.log(
    "Balance MyToken Before accounts[0] " +
      web3.utils.fromWei(balanceMyTokenBeforeAccounts0.toString())
  )
  console.log(
    "Balance MyToken Before TokenFarm " +
      web3.utils.fromWei(balanceMyTokenBeforeFarmToken.toString())
  )

  console.log("*** Farm Token ***")
  balanceFarmTokenBeforeAccounts0 = await farmToken.balanceOf(accounts[0])
  balanceFarmTokenBeforeFarmToken = await farmToken.balanceOf(farmToken.address)
  console.log(
    "Balance FarmToken Before accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenBeforeAccounts0.toString())
  )
  console.log(
    "Balance FarmToken Before TokenFarm " +
      web3.utils.fromWei(balanceFarmTokenBeforeFarmToken.toString())
  )

  // Call Deposit function from FarmToken
  console.log("Call Withdraw Function")
  await farmToken.withdraw(web3.utils.toWei("100", "ether"))

  console.log("*** My Token ***")
  balanceMyTokenAfterAccounts0 = await myToken.balanceOf(accounts[0])
  balanceMyTokenAfterFarmToken = await myToken.balanceOf(farmToken.address)
  console.log(
    "Balance MyToken After accounts[0] " +
      web3.utils.fromWei(balanceMyTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance MyToken After TokenFarm " +
      web3.utils.fromWei(balanceMyTokenAfterFarmToken.toString())
  )

  console.log("*** Farm Token ***")
  balanceFarmTokenAfterAccounts0 = await farmToken.balanceOf(accounts[0])
  balanceFarmTokenAfterFarmToken = await farmToken.balanceOf(farmToken.address)
  console.log(
    "Balance FarmToken After accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance FarmToken After TokenFarm " +
      web3.utils.fromWei(balanceFarmTokenAfterFarmToken.toString())
  )

  // End function
  callback()
}
```

Bu komut dosyasını çalıştırmak için: `truffle exec .\scripts\withdrawMyTokenFromTokenFarm.js`. Aşağıdaki çıktıda görebileceğimiz gibi, MyTokens'i başarıyla geri aldık ve FarmTokens'i yaktık:

![withdrawMyTokenFromTokenFarm.js çıktısı](https://cdn-images-1.medium.com/max/2000/1*jHYlTFg0NgGbhASpsRvc0w.png)

_withdrawMyTokenFromTokenFarm.js çıktısı_

## Referanslar {#references}

[Sözleşmeler - OpenZeppelin Belgeleri](https://docs.openzeppelin.com/contracts/3.x/)

[Akıllı Sözleşmeler için Güzel Araçlar | Truffle Suite](https://www.trufflesuite.com/)

[Ganache | Truffle Suite](https://www.trufflesuite.com/ganache)

[DeFi nedir? Başlangıç Rehberi (2021 Güncellendi) (99bitcoins.com)](https://99bitcoins.com/what-is-defi/)

[DeFi - DeFi Pulse'da Merkeziyetsiz Finans Lider Tablosu](https://defipulse.com/)
