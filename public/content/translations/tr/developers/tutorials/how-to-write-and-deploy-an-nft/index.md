---
title: "Bir NFT Nasıl Yazılır ve Dağıtılır (NFT Eğitim Serisi Bölüm 1/3)"
description: "Bu eğitim, Ethereum ve Gezegenlerarası Dosya Sistemi (IPFS) kullanarak bir Non Fungible Token (ERC-721 token) akıllı sözleşmesinin nasıl yazılacağı ve dağıtılacağı konusunda sizi adım adım yönlendirecek olan NFT'ler hakkındaki bir serinin 1. Bölümüdür."
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "akıllı sözleşmeler"]
skill: beginner
breadcrumb: "NFT yazın ve dağıtın"
lang: tr
published: 2021-04-22
---

NFT'lerin Blokzincir'i halkın gözü önüne getirmesiyle, Ethereum blokzincirinde kendi NFT sözleşmenizi (ERC-721 Token) yayınlayarak bu heyecanı kendiniz anlamak için şimdi mükemmel bir fırsat!

Bu eğitimde, [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) ve [Alchemy](https://alchemy.com/signup/eth) kullanarak Sepolia test ağında bir ERC-721 akıllı sözleşmesi oluşturma ve dağıtma adımlarını inceleyeceğiz (bunların ne anlama geldiğini henüz anlamıyorsanız endişelenmeyin — açıklayacağız!).

Bu eğitimin 2. Bölümünde, bir NFT basmak için akıllı sözleşmemizi nasıl kullanabileceğimizi inceleyeceğiz ve 3. Bölümde NFT'nizi MetaMask'te nasıl görüntüleyeceğinizi açıklayacağız.

Ve elbette, herhangi bir noktada sorularınız olursa, [Alchemy Discord](https://discord.gg/gWuC7zB) üzerinden ulaşmaktan veya [Alchemy'nin NFT API belgelerini](https://www.alchemy.com/docs/reference/nft-api-quickstart) ziyaret etmekten çekinmeyin!

## 1. Adım: Ethereum ağına bağlanın {#connect-to-ethereum}

Ethereum blokzincirine istekte bulunmanın birçok yolu vardır, ancak işleri kolaylaştırmak için, kendi düğümlerimizi çalıştırmak zorunda kalmadan Ethereum zinciriyle iletişim kurmamızı sağlayan bir blokzincir geliştirici platformu ve API'si olan [Alchemy](https://alchemy.com/signup/eth) üzerinde ücretsiz bir hesap kullanacağız.

Bu eğitimde, akıllı sözleşme dağıtımımızın arka planında neler olup bittiğini anlamak için Alchemy'nin izleme ve analitik amaçlı geliştirici araçlarından da yararlanacağız. Henüz bir Alchemy hesabınız yoksa, [buradan](https://alchemy.com/signup/eth) ücretsiz kaydolabilirsiniz.

## 2. Adım: Uygulamanızı (ve API anahtarınızı) oluşturun {#make-api-key}

Bir Alchemy hesabı oluşturduktan sonra, bir uygulama oluşturarak bir uygulama programlama arayüzü (API) anahtarı oluşturabilirsiniz. Bu, Sepolia test ağına istekte bulunmamızı sağlayacaktır. Test ağları hakkında daha fazla bilgi edinmek isterseniz [bu kılavuza](https://www.alchemy.com/docs/choosing-a-web3-network) göz atın.

1. Gezinme çubuğunda "Select an app" (Bir uygulama seçin) seçeneğini belirleyip "Create new app" (Yeni uygulama oluştur) düğmesine tıklayarak Alchemy Kontrol Panelinizdeki "Create new app" sayfasına gidin.

![Uygulamanızı oluşturun](./alchemy-create-new-app.png)

2. Uygulamanızı adlandırın (biz "My First NFT!" seçtik), kısa bir açıklama sunun ve bir kullanım durumu seçin. Ardından, "Ethereum" araması yapın ve ağı seçin. Uygulama geliştirme için önerilen test ağı olan Sepolia'yı kullanacağız (bkz. [Ethereum ağları](/developers/docs/networks/#ethereum-testnets)).

3. Devam etmek için "Next" (İleri) düğmesine, ardından "Create app" (Uygulama oluştur) düğmesine tıklayın ve işte bu kadar! Uygulamanız, kopyalanabilecek bir API Anahtarı ile birlikte gezinme çubuğu açılır menüsünde görünmelidir.

## 3. Adım: Bir Ethereum hesabı (adresi) oluşturun {#create-eth-address}

İşlem göndermek ve almak için bir Ethereum hesabına ihtiyacımız var. Bu eğitim için, Ethereum hesap adresinizi yönetmek için kullanılan tarayıcıdaki sanal bir cüzdan olan MetaMask'i kullanacağız. Ethereum'daki işlemlerin nasıl çalıştığı hakkında daha fazla bilgi edinmek istiyorsanız, Ethereum Vakfı'nın [bu sayfasına](/developers/docs/transactions/) göz atın.

[Buradan](https://metamask.io/download) ücretsiz olarak MetaMask'i indirebilir ve bir hesap oluşturabilirsiniz. Bir hesap oluştururken veya zaten bir hesabınız varsa, ağ seçim menüsünü kullanarak "Sepolia" test ağına geçtiğinizden emin olun (böylece gerçek parayla uğraşmamış oluruz). Sepolia'nın listelendiğini görmüyorsanız, sağ üst köşedeki menüyü açın, "Networks" (Ağlar) seçeneğini seçin ve "Show test networks" (Test ağlarını göster) seçeneğini açın (bkz. [MetaMask'in test ağlarını görüntüleme kılavuzu](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/)).

![Sepolia'yı ağınız olarak ayarlayın](./metamask-sepolia.png)

## 4. Adım: Bir Musluktan Ether ekleyin {#step-4-add-ether-from-a-faucet}

Akıllı sözleşmemizi test ağına dağıtmak için biraz sahte ETH'ye ihtiyacımız olacak. Sepolia ETH almak için, [Sepolia ağ ayrıntılarında](/developers/docs/networks/#sepolia) listelenen musluklardan birini seçin ve hesap adresinizi girin. Biri çalışmazsa, bazen kuruyabildikleri ve bazılarının uygunluk kuralları olduğu için diğerini deneyin: örneğin, [Alchemy Sepolia musluğu](https://www.alchemy.com/faucets/ethereum-sepolia), alıcı adresin Ethereum Ana Ağı'nda en az 0.001 ETH tutmasını gerektirir. Kısa bir süre sonra MetaMask hesabınızda ETH görmelisiniz!

## 5. Adım: Bakiyenizi kontrol edin {#check-balance}

Bakiyemizin orada olduğunu iki kez kontrol etmek için, [Alchemy'nin sandbox aracını](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest) kullanarak bir [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) isteği yapalım. Bu, cüzdanımızdaki ETH miktarını döndürecektir. MetaMask hesap adresinizi girip "Send Request" (İsteği Gönder) düğmesine tıkladıktan sonra, şuna benzer bir yanıt görmelisiniz:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000" }
```

> **Not** Bu sonuç ETH değil, Wei cinsindendir. Wei, Ether'in en küçük birimi olarak kullanılır. Wei'den ETH'ye dönüşüm 1 eth = 10<sup>18</sup> wei şeklindedir. Yani 0xde0b6b3a7640000 değerini ondalık sayıya dönüştürürsek 1\*10<sup>18</sup> wei elde ederiz, bu da 1 ETH'ye eşittir.

Oh be! Sahte paramızın hepsi orada.

## 6. Adım: Projemizi başlatın {#initialize-project}

İlk olarak, projemiz için bir klasör oluşturmamız gerekecek. Komut satırınıza gidin ve şunu yazın:

```sh
mkdir my-nft
cd my-nft
```

Artık proje klasörümüzün içinde olduğumuza göre, projeyi başlatmak için npm init kullanacağız. Henüz npm yüklü değilse, [Node.js kurulum talimatlarını](https://nodejs.org/en/download/) izleyin (bu eğitim için Node.js ve npm'e ihtiyacımız olacak).

```sh
npm init
```

Kurulum sorularını nasıl yanıtladığınız pek önemli değil; referans olması için biz şu şekilde yaptık:

```console
package name: (my-nft)
version: (1.0.0)
description: My first NFT!
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to /Users/thesuperb1/Desktop/my-nft/package.json:

{
  "name": "my-nft",
  "version": "1.0.0",
  "description": "My first NFT!",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

package.json dosyasını onaylayın. Bir sonraki adımda kuracağımız Hardhat 3, yalnızca ES modülü projelerini destekler, bu nedenle projeyi şu şekilde işaretleyin:

```sh
npm pkg set type=module
```

Ve artık hazırız!

## 7. Adım: [Hardhat](https://hardhat.org/docs/getting-started) Kurulumu {#install-hardhat}

Hardhat, Ethereum yazılımınızı derlemek, dağıtmak, test etmek ve hatalarını ayıklamak için bir geliştirme ortamıdır. Canlı zincire dağıtmadan önce yerel olarak akıllı sözleşmeler ve merkeziyetsiz uygulamalar (dapp'ler) oluştururken geliştiricilere yardımcı olur.

Hardhat 3, Node.js v22.13.0 veya daha yeni bir sürümünü gerektirir. my-nft projemizin içinde şunu çalıştırın:

```sh
npm install --save-dev hardhat
```

[Kurulum talimatları](https://hardhat.org/docs/getting-started) hakkında daha fazla ayrıntı için bu sayfaya göz atın.

## 8. Adım: Hardhat projesi oluşturun {#create-hardhat-project}

`npx hardhat --init` komutunu çalıştırmak eksiksiz bir örnek proje oluşturur, ancak bu eğitimde her parçayı görebilmeniz için her şeyi elle ayarlayacağız. Proje klasörünüzün kök dizininde, aşağıdaki içeriğe sahip `hardhat.config.js` adında bir dosya oluşturun:

```js
import { defineConfig } from "hardhat/config"

export default defineConfig({
  solidity: "0.8.34",
})
```

Burası, projemiz için tüm kurulumu belirteceğimiz yerdir (13. adımda). Şimdilik, sadece Hardhat'e Solidity derleyicisinin hangi sürümünü kullanacağını söyler.

## 9. Adım: Proje klasörlerini ekleyin {#add-project-folders}

Projemizi düzenli tutmak için iki yeni klasör oluşturacağız. Komut satırınızda projenizin kök dizinine gidin ve şunu yazın:

```sh
mkdir contracts
mkdir scripts
```

- contracts/, NFT akıllı sözleşme kodumuzu tutacağımız yerdir

- scripts/, akıllı sözleşmemizi dağıtmak ve onunla etkileşim kurmak için komut dosyalarını tutacağımız yerdir

## 10. Adım: Sözleşmemizi yazın {#write-contract}

Artık ortamımız kurulduğuna göre, daha heyecan verici şeylere geçelim: _akıllı sözleşme kodumuzu yazmak!_

Favori düzenleyicinizde (biz [VSCode](https://code.visualstudio.com/) seviyoruz) my-nft projesini açın. Akıllı sözleşmeler, MyNFT.sol akıllı sözleşmemizi yazmak için kullanacağımız Solidity adlı bir dilde yazılır.‌

1. `contracts` klasörüne gidin ve MyNFT.sol adında yeni bir dosya oluşturun

2. Aşağıda, [OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/erc721) kütüphanesinin ERC-721 uygulamasına dayandırdığımız NFT akıllı sözleşme kodumuz bulunmaktadır. Aşağıdaki içeriği kopyalayıp MyNFT.sol dosyanıza yapıştırın.

   ```solidity
   // https://docs.openzeppelin.com/contracts/5.x/erc721 tabanlı Sözleşme
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.24;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       uint256 private _nextTokenId;

       constructor(address initialOwner)
           ERC721("MyNFT", "NFT")
           Ownable(initialOwner)
       {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           uint256 newItemId = ++_nextTokenId;
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
   ```

3. OpenZeppelin sözleşmeler kütüphanesinden sınıfları miras aldığımız için, kütüphaneyi klasörümüze kurmak üzere komut satırınızda `npm install @openzeppelin/contracts` komutunu çalıştırın. Bu eğitim, Solidity 0.8.24 veya daha yeni bir sürümünü gerektiren OpenZeppelin Contracts 5.x'i kullanır.

Peki, bu kod tam olarak ne _yapıyor_? Satır satır inceleyelim.

Akıllı sözleşmemizin en üstünde, üç [OpenZeppelin](https://openzeppelin.com/) akıllı sözleşme sınıfını içe aktarıyoruz:

- @openzeppelin/contracts/token/ERC721/ERC721.sol, NFT akıllı sözleşmemizin miras alacağı ERC-721 standardının uygulamasını içerir. (Geçerli bir NFT olmak için, akıllı sözleşmeniz ERC-721 standardının tüm yöntemlerini uygulamalıdır.) Miras alınan ERC-721 işlevleri hakkında daha fazla bilgi edinmek için [buradaki](https://eips.ethereum.org/EIPS/eip-721) arayüz tanımına göz atın.

- @openzeppelin/contracts/access/Ownable.sol, akıllı sözleşmemizde [erişim kontrolü](https://docs.openzeppelin.com/contracts/5.x/access-control) kurar, böylece yalnızca akıllı sözleşmenin sahibi (siz) NFT'ler basabilir. Sahip, kurucuya iletilen `initialOwner` adresidir. (Not: erişim kontrolünü dahil etmek tamamen bir tercihtir. Akıllı sözleşmenizi kullanarak herkesin bir NFT basabilmesini istiyorsanız, sözleşme tanımından ve kurucudan `Ownable` ve `Ownable(initialOwner)` ifadelerini ve `mintNFT` işlevinden `onlyOwner` ifadesini kaldırın.)

- @openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol, ERC-721'i genişletir, böylece her token basım sırasında ayarladığımız kendi meta veri URI'sini saklayabilir.

İçe aktarma ifadelerimizden sonra, şaşırtıcı derecede kısa olan özel NFT akıllı sözleşmemiz var — yalnızca bir sayaç, bir kurucu ve tek bir işlev içerir! Bu, NFT'nin sahibini döndüren `ownerOf` ve NFT'nin sahipliğini bir hesaptan diğerine aktaran `transferFrom` gibi bir NFT oluşturmak için ihtiyacımız olan yöntemlerin çoğunu uygulayan miras aldığımız OpenZeppelin sözleşmeleri sayesindedir.

Sayaç, `_nextTokenId`, basılan toplam NFT sayısını takip eder ve yeni NFT'mizde benzersiz kimliği ayarlar. (Bir akıllı sözleşme kullanılarak basılan her NFT'ye benzersiz bir kimlik atanmalıdır—burada benzersiz kimliğimiz yalnızca var olan toplam NFT sayısına göre belirlenir. `++_nextTokenId`, kullanılmadan önce sayacı artırır, bu nedenle akıllı sözleşmemizle bastığımız ilk NFT'nin kimliği "1", ikinci NFT'mizin kimliği "2" vb. olur.)

ERC-721 kurucumuzda, "MyNFT" ve "NFT" olmak üzere 2 dize ilettiğimizi fark edeceksiniz. İlk değişken akıllı sözleşmenin adı, ikincisi ise sembolüdür. Bu değişkenlerin her birini istediğiniz gibi adlandırabilirsiniz!

Son olarak, bir NFT basmamızı sağlayan `mintNFT(address recipient, string memory tokenURI)` işlevimiz var! Bu işlevin iki değişken aldığını fark edeceksiniz:

- `address recipient`, yeni basılmış NFT'nizi alacak adresi belirtir

- `string memory tokenURI`, NFT'nin meta verilerini açıklayan bir JSON belgesine çözümlenmesi gereken bir dizedir. Bir NFT'nin meta verileri, ona ad, açıklama, resim ve diğer nitelikler gibi yapılandırılabilir özelliklere sahip olmasını sağlayarak onu gerçekten hayata geçiren şeydir. Bu eğitimin 2. bölümünde, bu meta verilerin nasıl yapılandırılacağını açıklayacağız.

`mintNFT`, miras alınan ERC-721 kütüphanesinden bazı yöntemleri çağırır ve nihayetinde yeni basılan NFT'nin kimliğini temsil eden bir sayı döndürür.

## 11. Adım: MetaMask ve Alchemy'yi projenize bağlayın {#connect-metamask-and-alchemy}

Artık bir MetaMask cüzdanı, Alchemy hesabı oluşturduğumuza ve akıllı sözleşmemizi yazdığımıza göre, bu üçünü birbirine bağlamanın zamanı geldi.

Sanal cüzdanınızdan gönderilen her işlem, benzersiz özel anahtarınızı kullanarak bir imza gerektirir. Programımıza bu izni sağlamak için özel anahtarımızı (ve Alchemy API anahtarını) bir ortam dosyasında güvenle saklayabiliriz.

İşlem gönderme hakkında daha fazla bilgi edinmek için [işlemler belgelerine](/developers/docs/transactions/) göz atın.

Projemizin kök dizininde bir `.env` dosyası oluşturun ve MetaMask özel anahtarınızı ve HTTP Alchemy API URL'nizi buna ekleyin.

- Özel anahtarınızı MetaMask'ten dışa aktarmak için [bu talimatları](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) izleyin

- HTTP Alchemy API URL'sini almak ve panonuza kopyalamak için aşağıya bakın

![Alchemy API URL'nizi kopyalayın](./copy-alchemy-api-url.mp4#842x480)

`.env` dosyanız artık şu şekilde görünmelidir:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

Bunları kodumuza gerçekten bağlamak için, 13. adımda hardhat.config.js dosyamızda bu değişkenlere başvuracağız. Node.js `.env` dosyalarını kendi başına okuyabilir, bu nedenle yüklenecek fazladan bir paket yoktur.

<EnvWarningBanner />

## 12. Adım: Ethers.js Kurulumu {#install-ethers}

Ethers.js, [standart JSON-RPC yöntemlerini](/developers/docs/apis/json-rpc/) daha kullanıcı dostu yöntemlerle sararak Ethereum ile etkileşim kurmayı ve istekte bulunmayı kolaylaştıran bir kütüphanedir.

Hardhat, ek araçlar ve genişletilmiş işlevsellik için [Eklentileri](https://hardhat.org/docs/plugins/official-plugins) entegre etmeyi çok kolaylaştırır. Sözleşme dağıtımı için [Ethers eklentisinden](https://hardhat.org/docs/plugins/hardhat-ethers) yararlanacağız ([Ethers.js](https://docs.ethers.org/v6/), bazı çok temiz sözleşme dağıtım yöntemlerine sahiptir).

Proje dizininizde şunu yazın:

```sh
npm install --save-dev @nomicfoundation/hardhat-ethers ethers
```

Eklentiyi bir sonraki adımda hardhat.config.js dosyamıza da ekleyeceğiz.

## 13. Adım: hardhat.config.js dosyasını güncelleyin {#update-hardhat-config}

Şimdiye kadar birkaç bağımlılık ve eklenti ekledik, şimdi projemizin hepsinden haberdar olması için hardhat.config.js dosyasını güncellememiz gerekiyor.

hardhat.config.js dosyanızı şu şekilde görünecek şekilde güncelleyin:

```js
import { existsSync } from "node:fs"
import hardhatEthers from "@nomicfoundation/hardhat-ethers"
import { configVariable, defineConfig } from "hardhat/config"

// Varsa, API_URL ve PRIVATE_KEY'i .env dosyasından process.env içine yükle
if (existsSync(".env")) process.loadEnvFile()

export default defineConfig({
  plugins: [hardhatEthers],
  solidity: "0.8.34",
  networks: {
    sepolia: {
      type: "http",
      url: configVariable("API_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
    },
  },
})
```

`configVariable`, Hardhat'e her bir değeri yalnızca ihtiyaç duyulduğunda bir ortam değişkeninden okumasını söyler, böylece `compile` gibi komutlar değerler ayarlanmadan önce bile çalışır. Özel anahtarınızı düz metin dosyasında tutmamayı tercih ederseniz, Hardhat [yapılandırma değişkenlerini şifrelenmiş bir anahtar deposundan](https://hardhat.org/docs/guides/configuration-variables) da okuyabilir.

## 14. Adım: Sözleşmemizi derleyin {#compile-contract}

Şimdiye kadar her şeyin çalıştığından emin olmak için sözleşmemizi derleyelim. Derleme görevi, yerleşik hardhat görevlerinden biridir.

Komut satırından şunu çalıştırın:

```sh
npx hardhat compile
```

İlk derlediğinizde, Hardhat Solidity derleyicisini indirir. Ardından `Compiled 1 Solidity file with solc 0.8.34` gibi bir şey görmelisiniz. Görmezseniz, her zaman [Alchemy Discord](https://discord.gg/gWuC7zB) üzerinden mesaj gönderebilirsiniz.

## 15. Adım: Dağıtım komut dosyamızı yazın {#write-deploy}

Artık sözleşmemiz yazıldığına ve yapılandırma dosyamız hazır olduğuna göre, sözleşme dağıtım komut dosyamızı yazmanın zamanı geldi.

`scripts/` klasörüne gidin ve `deploy.js` adında yeni bir dosya oluşturarak içine aşağıdaki içeriği ekleyin:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const [deployer] = await ethers.getSigners()
const MyNFT = await ethers.getContractFactory("MyNFT")

// Bir sözleşme nesnesine çözümlenen bir promise döndürerek dağıtımı başlat
const myNFT = await MyNFT.deploy(deployer.address)
await myNFT.waitForDeployment()
console.log("Contract deployed to address:", await myNFT.getAddress())
```

Bu kod satırlarının her birinin ne yaptığına bir göz atalım.

```js
const { ethers } = await network.create()
```

Hardhat 3'te, bir komut dosyası bir ağa açıkça bir bağlantı açar. `network.create()`, komut dosyasını çalıştırdığınızda `--network` seçeneğiyle seçtiğiniz ağa bağlanır ve `hardhat-ethers` eklentisi bu bağlantıya bir `ethers` nesnesi ekler.

```js
const [deployer] = await ethers.getSigners()
```

`getSigners()`, ağ için yapılandırılmış hesapları döndürür. Sepolia'da bu, özel anahtarını `.env` dosyasına koyduğunuz hesaptır. Sözleşmenin sahibi olmanız için adresini kurucuya iletiyoruz.

```js
const MyNFT = await ethers.getContractFactory("MyNFT")
```

ethers.js'deki bir ContractFactory, yeni akıllı sözleşmeleri dağıtmak için kullanılan bir soyutlamadır, bu nedenle buradaki MyNFT, NFT sözleşmemizin örnekleri için bir fabrikadır. hardhat-ethers eklentisini kullanırken ContractFactory ve Contract örnekleri varsayılan olarak ilk imzalayana bağlanır.

```js
const myNFT = await MyNFT.deploy(deployer.address)
```

Bir ContractFactory üzerinde deploy() çağrısı yapmak dağıtımı başlatacak ve bir Contract'a çözümlenen bir Promise döndürecektir. Bu, akıllı sözleşme işlevlerimizin her biri için bir yöntemi olan nesnedir. deploy() işlevine ilettiğiniz argümanlar sözleşmenin kurucusuna, burada `initialOwner` adresine gider.

`waitForDeployment()`, dağıtım işlemi bir bloğa dahil edilene kadar bekler ve `getAddress()` yeni sözleşmenin adresini döndürür. Daha fazla ayrıntı için [ethers.js sözleşme belgelerine](https://docs.ethers.org/v6/api/contract/) bakın.

## 16. Adım: Sözleşmemizi dağıtın {#deploy-contract}

Nihayet akıllı sözleşmemizi dağıtmaya hazırız! Proje dizininizin köküne geri dönün ve komut satırında şunu çalıştırın:

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

Ardından şuna benzer bir şey görmelisiniz:

```text
Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650
```

[Sepolia etherscan](https://sepolia.etherscan.io/)'e gidip sözleşme adresimizi aratırsak, başarıyla dağıtıldığını görebilmeliyiz. Hemen göremezseniz, biraz zaman alabileceğinden lütfen bir süre bekleyin. İşlem şuna benzer görünecektir:

![İşlem adresinizi Etherscan'de görüntüleyin](./etherscan-sepoila-contract-creation.png)

From (Kimden) adresi MetaMask hesap adresinizle eşleşmeli ve To (Kime) adresi "Contract Creation" (Sözleşme Oluşturma) demelidir. İşleme tıklarsak, To alanında sözleşme adresimizi göreceğiz:

![Sözleşme adresinizi Etherscan'de görüntüleyin](./etherscan-sepolia-tx-details.png)

Evetttt! NFT akıllı sözleşmenizi Ethereum (test ağı) zincirine yeni dağıttınız!

Arka planda neler olup bittiğini anlamak için, [Alchemy kontrol panelinizde](https://dashboard.alchemy.com/) uygulamanızın aldığı isteklere bakabilirsiniz.

Orada, .deploy() işlevini çağırdığımızda Hardhat/Ethers'ın arka planda bizim için yaptığı bir avuç JSON-RPC çağrısını göreceksiniz. Burada dikkat edilmesi gereken iki önemli çağrı, akıllı sözleşmemizi Sepolia zincirine gerçekten yazma isteği olan [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth-sendrawtransaction) ve hash verildiğinde işlemimiz hakkındaki bilgileri okuma isteği olan [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth-gettransactionbyhash)'tir (işlem gönderirken tipik bir model). İşlem gönderme hakkında daha fazla bilgi edinmek için [işlemler belgelerine](/developers/docs/transactions/) göz atın.

Bu eğitimin 1. Bölümü için bu kadar. [2. Bölümde, bir NFT basarak akıllı sözleşmemizle gerçekten etkileşime gireceğiz](/developers/tutorials/how-to-mint-an-nft/) ve [3. Bölümde NFT'nizi Ethereum cüzdanınızda nasıl görüntüleyeceğinizi göstereceğiz](/developers/tutorials/how-to-view-nft-in-metamask/)!
