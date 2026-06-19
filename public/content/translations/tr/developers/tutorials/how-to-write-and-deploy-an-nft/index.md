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

NFT'lerin blokzinciri halkın gözü önüne getirmesiyle, Ethereum blokzincirinde kendi NFT sözleşmenizi (ERC-721 Token) yayınlayarak bu heyecanı kendiniz anlamak için şimdi mükemmel bir fırsat!

Alchemy; Makersplace (yakın zamanda Christie's'de 69 Milyon dolara rekor bir dijital sanat eseri satışı gerçekleştirdi), Dapper Labs (NBA Top Shot ve Crypto Kitties'in yaratıcıları), OpenSea (dünyanın en büyük NFT pazaryeri), Zora, Super Rare, NFTfi, Foundation, Enjin, Origin Protocol, Immutable ve daha fazlası dahil olmak üzere NFT alanındaki en büyük isimlere güç vermekten son derece gurur duyuyor.

Bu eğitimde, [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) ve [Alchemy](https://alchemy.com/signup/eth) kullanarak Sepolia test ağında bir ERC-721 akıllı sözleşmesi oluşturma ve dağıtma adımlarını inceleyeceğiz (bunların ne anlama geldiğini henüz anlamıyorsanız endişelenmeyin — açıklayacağız!).

Bu eğitimin 2. Bölümünde, bir NFT basmak için akıllı sözleşmemizi nasıl kullanabileceğimizi inceleyeceğiz ve 3. Bölümde NFT'nizi MetaMask'te nasıl görüntüleyeceğinizi açıklayacağız.

Ve elbette, herhangi bir noktada sorularınız olursa, [Alchemy Discord](https://discord.gg/gWuC7zB) üzerinden ulaşmaktan veya [Alchemy'nin NFT API belgelerini](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api) ziyaret etmekten çekinmeyin!

## 1. Adım: Ethereum ağına bağlanın {#connect-to-ethereum}

Ethereum blokzincirine istekte bulunmanın birçok yolu vardır, ancak işleri kolaylaştırmak için, kendi düğümlerimizi çalıştırmak zorunda kalmadan Ethereum zinciriyle iletişim kurmamızı sağlayan bir blokzincir geliştirici platformu ve API'si olan [Alchemy](https://alchemy.com/signup/eth) üzerinde ücretsiz bir hesap kullanacağız.

Bu eğitimde, akıllı sözleşme dağıtımımızın arka planında neler olup bittiğini anlamak için Alchemy'nin izleme ve analitik amaçlı geliştirici araçlarından da yararlanacağız. Henüz bir Alchemy hesabınız yoksa, [buradan](https://alchemy.com/signup/eth) ücretsiz kaydolabilirsiniz.

## 2. Adım: Uygulamanızı (ve API anahtarınızı) oluşturun {#make-api-key}

Bir Alchemy hesabı oluşturduktan sonra, bir uygulama oluşturarak bir API anahtarı üretebilirsiniz. Bu, Sepolia test ağına istekte bulunmamızı sağlayacaktır. Test ağları hakkında daha fazla bilgi edinmek isterseniz [bu rehbere](https://docs.alchemyapi.io/guides/choosing-a-network) göz atın.

1. Gezinme çubuğundaki "Apps" (Uygulamalar) üzerine gelip "Create App" (Uygulama Oluştur) seçeneğine tıklayarak Alchemy Kontrol Panelinizdeki "Create App" sayfasına gidin.

![Create your app](./create-your-app.png)

2. Uygulamanızı adlandırın (biz "My First NFT!" seçtik), kısa bir açıklama sunun, Zincir için "Ethereum"u seçin ve ağınız için "Sepolia"yı seçin. Birleşme'den bu yana diğer test ağları kullanımdan kaldırıldı.

![Configure and publish your app](./alchemy-explorer-sepolia.png)

3. "Create app" (Uygulama oluştur) düğmesine tıklayın ve işte bu kadar! Uygulamanız aşağıdaki tabloda görünmelidir.

## 3. Adım: Bir Ethereum hesabı (adresi) oluşturun {#create-eth-address}

İşlemleri göndermek ve almak için bir Ethereum hesabına ihtiyacımız var. Bu eğitim için, Ethereum hesap adresinizi yönetmek amacıyla tarayıcıda kullanılan sanal bir cüzdan olan MetaMask'i kullanacağız. Ethereum'daki işlemlerin nasıl çalıştığı hakkında daha fazla bilgi edinmek istiyorsanız, Ethereum Vakfı'nın [bu sayfasına](/developers/docs/transactions/) göz atın.

[Buradan](https://metamask.io/download) ücretsiz olarak MetaMask'i indirebilir ve bir hesap oluşturabilirsiniz. Bir hesap oluştururken veya zaten bir hesabınız varsa, sağ üstteki "Sepolia Test Network" (Sepolia Test Ağı) seçeneğine geçtiğinizden emin olun (böylece gerçek parayla işlem yapmamış oluruz).

![Set Sepolia as your network](./metamask-goerli.png)

## 4. Adım: Bir musluktan Ether ekleyin {#step-4-add-ether-from-a-faucet}

Akıllı sözleşmemizi test ağına dağıtmak için biraz sahte ETH'ye ihtiyacımız olacak. ETH almak için Alchemy tarafından barındırılan [Sepolia Musluğu](https://sepoliafaucet.com/)'na gidebilir, giriş yapıp hesap adresinizi girebilir ve "Send Me ETH" (Bana ETH Gönder) düğmesine tıklayabilirsiniz. Kısa bir süre sonra MetaMask hesabınızda ETH görmelisiniz!

## 5. Adım: Bakiyenizi Kontrol Edin {#check-balance}

Bakiyemizin orada olduğunu iki kez kontrol etmek için, [Alchemy'nin oluşturucu aracını](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) kullanarak bir [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) isteği yapalım. Bu, cüzdanımızdaki ETH miktarını döndürecektir. MetaMask hesap adresinizi girip "Send Request" (İstek Gönder) düğmesine tıkladıktan sonra şöyle bir yanıt görmelisiniz:

    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`

> **Not** Bu sonuç ETH değil, Wei cinsindendir. Wei, Ether'in en küçük birimi olarak kullanılır. Wei'den ETH'ye dönüşüm 1 eth = 10<sup>18</sup> Wei şeklindedir. Yani 0xde0b6b3a7640000 değerini ondalık sayıya çevirirsek 1\*10<sup>18</sup> Wei elde ederiz, bu da 1 ETH'ye eşittir.

Oh be! Sahte paramızın hepsi orada.

## 6. Adım: Projemizi başlatın {#initialize-project}

İlk olarak, projemiz için bir klasör oluşturmamız gerekecek. Komut satırınıza gidin ve şunu yazın:

    mkdir my-nft
    cd my-nft

Artık proje klasörümüzün içinde olduğumuza göre, projeyi başlatmak için npm init kullanacağız. Eğer npm henüz yüklü değilse, [bu talimatları](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) izleyin (ayrıca [Node.js](https://nodejs.org/en/download/)'e de ihtiyacımız olacak, bu yüzden onu da indirin!).

    npm init

Kurulum sorularını nasıl yanıtladığınız pek önemli değil; referans olması için biz şu şekilde yaptık:

```json
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

package.json dosyasını onaylayın, artık hazırız!

## 7. Adım: [Hardhat](https://hardhat.org/getting-started/#overview) Kurulumu {#install-hardhat}

Hardhat, Ethereum yazılımınızı derlemek, dağıtmak, test etmek ve hatalarını ayıklamak için bir geliştirme ortamıdır. Canlı zincire dağıtmadan önce yerel olarak akıllı sözleşmeler ve merkeziyetsiz uygulamalar (dapp'ler) oluştururken geliştiricilere yardımcı olur.

my-nft projemizin içinde şunu çalıştırın:

    npm install --save-dev hardhat

[Kurulum talimatları](https://hardhat.org/getting-started/#overview) hakkında daha fazla ayrıntı için bu sayfaya göz atın.

## 8. Adım: Hardhat projesi oluşturun {#create-hardhat-project}

Proje klasörümüzün içinde şunu çalıştırın:

    npx hardhat

Ardından bir karşılama mesajı ve ne yapmak istediğinizi seçme seçeneği görmelisiniz. "create an empty hardhat.config.js" (boş bir hardhat.config.js oluştur) seçeneğini seçin:

    888    888                      888 888               888
    888    888                      888 888               888
    888    888                      888 888               888
    8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
    888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
    888    888 .d888888 888    888  888 888  888 .d888888 888
    888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
    888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
    👷 Welcome to Hardhat v2.0.11 👷‍
    ? What do you want to do? …
    Create a sample project
    ❯ Create an empty hardhat.config.js
    Quit

Bu, projemiz için tüm kurulumu belirteceğimiz (13. adımda) bir hardhat.config.js dosyası oluşturacaktır.

## 9. Adım: Proje klasörlerini ekleyin {#add-project-folders}

Projemizi düzenli tutmak için iki yeni klasör oluşturacağız. Komut satırınızda projenizin kök dizinine gidin ve şunu yazın:

    mkdir contracts
    mkdir scripts

- contracts/, NFT akıllı sözleşme kodumuzu tutacağımız yerdir

- scripts/, akıllı sözleşmemizi dağıtmak ve onunla etkileşime girmek için komut dosyalarını tutacağımız yerdir

## 10. Adım: Sözleşmemizi yazın {#write-contract}

Artık ortamımız kurulduğuna göre, daha heyecan verici şeylere geçebiliriz: _akıllı sözleşme kodumuzu yazmak!_

my-nft projesini favori düzenleyicinizde açın (biz [VSCode](https://code.visualstudio.com/)'u seviyoruz). Akıllı sözleşmeler, MyNFT.sol akıllı sözleşmemizi yazmak için kullanacağımız Solidity adlı bir dilde yazılır.‌

1. `contracts` klasörüne gidin ve MyNFT.sol adında yeni bir dosya oluşturun.

2. Aşağıda, [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc721) kütüphanesinin ERC-721 uygulamasına dayandırdığımız NFT akıllı sözleşme kodumuz bulunmaktadır. Aşağıdaki içerikleri kopyalayıp MyNFT.sol dosyanıza yapıştırın.

   ```solidity
   //[https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721) tabanlı Sözleşme
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.0;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/utils/Counters.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       using Counters for Counters.Counter;
       Counters.Counter private _tokenIds;

       constructor() ERC721("MyNFT", "NFT") {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           _tokenIds.increment();

           uint256 newItemId = _tokenIds.current();
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
   ```

3. OpenZeppelin sözleşmeler kütüphanesinden sınıfları miras aldığımız için, kütüphaneyi klasörümüze kurmak üzere komut satırınızda `npm install @openzeppelin/contracts^4.0.0` komutunu çalıştırın.

Peki, bu kod tam olarak ne _yapıyor_? Satır satır inceleyelim.

Akıllı sözleşmemizin en üstünde, üç [OpenZeppelin](https://openzeppelin.com/) akıllı sözleşme sınıfını içe aktarıyoruz:

- @openzeppelin/contracts/token/ERC721/ERC721.sol, NFT akıllı sözleşmemizin miras alacağı ERC-721 standardının uygulamasını içerir. (Geçerli bir NFT olmak için akıllı sözleşmenizin ERC-721 standardının tüm yöntemlerini uygulaması gerekir.) Miras alınan ERC-721 işlevleri hakkında daha fazla bilgi edinmek için [buradaki](https://eips.ethereum.org/EIPS/eip-721) arayüz tanımına göz atın.

- @openzeppelin/contracts/utils/Counters.sol, yalnızca birer birer artırılabilen veya azaltılabilen sayaçlar sağlar. Akıllı sözleşmemiz, basılan toplam NFT sayısını takip etmek ve yeni NFT'mizde benzersiz kimliği (ID) ayarlamak için bir sayaç kullanır. (Bir akıllı sözleşme kullanılarak basılan her NFT'ye benzersiz bir kimlik atanmalıdır—burada benzersiz kimliğimiz yalnızca var olan toplam NFT sayısına göre belirlenir. Örneğin, akıllı sözleşmemizle bastığımız ilk NFT'nin kimliği "1", ikinci NFT'mizin kimliği "2" vb. olur.)

- @openzeppelin/contracts/access/Ownable.sol, akıllı sözleşmemizde [erişim kontrolü](https://docs.openzeppelin.com/contracts/3.x/access-control) kurar, böylece yalnızca akıllı sözleşmenin sahibi (siz) NFT basabilir. (Not: Erişim kontrolünü dahil etmek tamamen bir tercihtir. Akıllı sözleşmenizi kullanarak herkesin bir NFT basabilmesini istiyorsanız, 10. satırdaki Ownable ve 17. satırdaki onlyOwner kelimelerini kaldırın.)

İçe aktarma ifadelerimizden sonra, şaşırtıcı derecede kısa olan özel NFT akıllı sözleşmemiz var — yalnızca bir sayaç, bir kurucu ve tek bir işlev içeriyor! Bu, NFT'nin sahibini döndüren `ownerOf` ve NFT'nin sahipliğini bir hesaptan diğerine aktaran `transferFrom` gibi bir NFT oluşturmak için ihtiyaç duyduğumuz yöntemlerin çoğunu uygulayan miras aldığımız OpenZeppelin sözleşmeleri sayesindedir.

ERC-721 kurucumuzda, "MyNFT" ve "NFT" olmak üzere 2 dize (string) geçirdiğimizi fark edeceksiniz. İlk değişken akıllı sözleşmenin adı, ikincisi ise sembolüdür. Bu değişkenlerin her birini dilediğiniz gibi adlandırabilirsiniz!

Son olarak, bir NFT basmamızı sağlayan `mintNFT(address recipient, string memory tokenURI)` işlevimiz var! Bu işlevin iki değişken aldığını fark edeceksiniz:

- `address recipient`, yeni basılmış NFT'nizi alacak adresi belirtir

- `string memory tokenURI`, NFT'nin meta verilerini açıklayan bir JSON belgesine çözümlenmesi gereken bir dizedir. Bir NFT'nin meta verileri, ad, açıklama, resim ve diğer öznitelikler gibi yapılandırılabilir özelliklere sahip olmasını sağlayarak onu gerçekten hayata geçiren şeydir. Bu eğitimin 2. bölümünde, bu meta verilerin nasıl yapılandırılacağını açıklayacağız.

`mintNFT`, miras alınan ERC-721 kütüphanesinden bazı yöntemleri çağırır ve nihayetinde yeni basılan NFT'nin kimliğini temsil eden bir sayı döndürür.

## 11. Adım: MetaMask ve Alchemy'yi projenize bağlayın {#connect-metamask-and-alchemy}

Artık bir MetaMask cüzdanı, Alchemy hesabı oluşturduğumuza ve akıllı sözleşmemizi yazdığımıza göre, bu üçünü birbirine bağlamanın zamanı geldi.

Sanal cüzdanınızdan gönderilen her işlem, benzersiz özel anahtarınızı kullanarak bir imza gerektirir. Programımıza bu izni sağlamak için özel anahtarımızı (ve Alchemy API anahtarını) bir ortam dosyasında güvenle saklayabiliriz.

İşlem gönderme hakkında daha fazla bilgi edinmek için, Web3 kullanarak işlem gönderme hakkındaki [bu eğitime](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) göz atın.

İlk olarak, proje dizininize dotenv paketini kurun:

    npm install dotenv --save

Ardından, projemizin kök dizininde bir `.env` dosyası oluşturun ve MetaMask özel anahtarınızı ve HTTP Alchemy API URL'nizi buna ekleyin.

- MetaMask'ten özel anahtarınızı dışa aktarmak için [bu talimatları](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) izleyin

- HTTP Alchemy API URL'sini almak ve panonuza kopyalamak için aşağıya bakın

![Copy your Alchemy API URL](./copy-alchemy-api-url.gif)

`.env` dosyanız artık şu şekilde görünmelidir:

    API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"

Bunları kodumuza fiilen bağlamak için, 13. adımda hardhat.config.js dosyamızda bu değişkenlere referans vereceğiz.

<EnvWarningBanner />

## 12. Adım: Ethers.js Kurulumu {#install-ethers}

Ethers.js, [standart JSON-RPC yöntemlerini](/developers/docs/apis/json-rpc/) daha kullanıcı dostu yöntemlerle sararak Ethereum ile etkileşime girmeyi ve istekte bulunmayı kolaylaştıran bir kütüphanedir.

Hardhat, ek araçlar ve genişletilmiş işlevsellik için [Eklentileri](https://hardhat.org/plugins/) entegre etmeyi son derece kolaylaştırır. Sözleşme dağıtımı için [Ethers eklentisinden](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) yararlanacağız ([Ethers.js](https://github.com/ethers-io/ethers.js/) çok temiz sözleşme dağıtım yöntemlerine sahiptir).

Proje dizininizde şunu yazın:

    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0

Bir sonraki adımda hardhat.config.js dosyamızda ethers'ı da dahil etmemiz gerekecek.

## 13. Adım: hardhat.config.js dosyasını güncelleyin {#update-hardhat-config}

Şimdiye kadar birkaç bağımlılık ve eklenti ekledik, şimdi projemizin hepsinden haberdar olması için hardhat.config.js dosyasını güncellememiz gerekiyor.

hardhat.config.js dosyanızı şu şekilde görünecek biçimde güncelleyin:

```js
    /**
    * @type import('hardhat/config').HardhatUserConfig
    */
    require('dotenv').config();
    require("@nomiclabs/hardhat-ethers");
    const { API_URL, PRIVATE_KEY } = process.env;
    module.exports = {
       solidity: "0.8.1",
       defaultNetwork: "sepolia",
       networks: {
          hardhat: {},
          sepolia: {
             url: API_URL,
             accounts: [`0x${PRIVATE_KEY}`]
          }
       },
    }
```

## 14. Adım: Sözleşmemizi derleyin {#compile-contract}

Şu ana kadar her şeyin çalıştığından emin olmak için sözleşmemizi derleyelim. Derleme görevi, yerleşik Hardhat görevlerinden biridir.

Komut satırından şunu çalıştırın:

    npx hardhat compile

Kaynak dosyada SPDX lisans tanımlayıcısının sağlanmadığına dair bir uyarı alabilirsiniz, ancak bunun için endişelenmenize gerek yok — umarız geri kalan her şey iyi görünüyordur! Değilse, her zaman [Alchemy Discord](https://discord.gg/u72VCg3) üzerinden mesaj atabilirsiniz.

## 15. Adım: Dağıtım komut dosyamızı yazın {#write-deploy}

Artık sözleşmemiz yazıldığına ve yapılandırma dosyamız hazır olduğuna göre, sözleşme dağıtım komut dosyamızı yazmanın zamanı geldi.

`scripts/` klasörüne gidin ve `deploy.js` adında yeni bir dosya oluşturarak içine aşağıdaki içerikleri ekleyin:

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // Dağıtımı başlatır ve bir Sözleşme nesnesine çözümlenen bir promise döndürür
  const myNFT = await MyNFT.deploy()
  await myNFT.deployed()
  console.log("Contract deployed to address:", myNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat, [Sözleşmeler eğitiminde](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) bu kod satırlarının her birinin ne yaptığını açıklamakta harika bir iş çıkarıyor, biz de onların açıklamalarını buraya uyarladık.

    const MyNFT = await ethers.getContractFactory("MyNFT");

Ethers.js'deki bir ContractFactory, yeni akıllı sözleşmeleri dağıtmak için kullanılan bir soyutlamadır, bu nedenle buradaki MyNFT, NFT sözleşmemizin örnekleri için bir fabrikadır. hardhat-ethers eklentisini kullanırken ContractFactory ve Contract örnekleri varsayılan olarak ilk imzalayana bağlanır.

    const myNFT = await MyNFT.deploy();

Bir ContractFactory üzerinde deploy() işlevini çağırmak dağıtımı başlatacak ve bir Sözleşmeye çözümlenen bir Promise döndürecektir. Bu, akıllı sözleşme işlevlerimizin her biri için bir yöntemi olan nesnedir.

## 16. Adım: Sözleşmemizi dağıtın {#deploy-contract}

Sonunda akıllı sözleşmemizi dağıtmaya hazırız! Proje dizininizin köküne geri dönün ve komut satırında şunu çalıştırın:

    npx hardhat --network sepolia run scripts/deploy.js

Ardından şuna benzer bir şey görmelisiniz:

    Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650

[Sepolia Etherscan](https://sepolia.etherscan.io/)'e gidip sözleşme adresimizi aratırsak, başarıyla dağıtıldığını görebilmeliyiz. Hemen göremiyorsanız, biraz zaman alabileceğinden lütfen bir süre bekleyin. İşlem şuna benzer görünecektir:

![View your transaction address on Etherscan](./etherscan-sepoila-contract-creation.png)

From (Gönderen) adresi MetaMask hesap adresinizle eşleşmeli ve To (Alıcı) adresi "Contract Creation" (Sözleşme Oluşturma) demelidir. İşleme tıklarsak, To alanında sözleşme adresimizi göreceğiz:

![View your contract address on Etherscan](./etherscan-sepolia-tx-details.png)

Eveeeet! NFT akıllı sözleşmenizi Ethereum (test ağı) zincirine başarıyla dağıttınız!

Arka planda neler olup bittiğini anlamak için [Alchemy kontrol panelimizdeki](https://dashboard.alchemyapi.io/explorer) Explorer (Gezgin) sekmesine gidelim. Birden fazla Alchemy uygulamanız varsa, uygulamaya göre filtrelediğinizden ve "MyNFT"yi seçtiğinizden emin olun.

![View calls made “under the hood” with Alchemy’s Explorer Dashboard](./alchemy-explorer-goerli.png)

Burada, .deploy() işlevini çağırdığımızda Hardhat/Ethers'ın arka planda bizim için yaptığı bir avuç JSON-RPC çağrısını göreceksiniz. Burada belirtilmesi gereken iki önemli çağrı, akıllı sözleşmemizi fiilen Sepolia zincirine yazma isteği olan [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction) ve hash verildiğinde işlemimiz hakkındaki bilgileri okuma isteği olan [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash)'tir (işlem gönderirken tipik bir model). İşlem gönderme hakkında daha fazla bilgi edinmek için [Web3 kullanarak işlem gönderme](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) hakkındaki bu eğitime göz atın.

Bu eğitimin 1. Bölümü için hepsi bu kadar. [2. Bölümde, bir NFT basarak akıllı sözleşmemizle fiilen etkileşime gireceğiz](/developers/tutorials/how-to-mint-an-nft/) ve [3. Bölümde NFT'nizi Ethereum cüzdanınızda nasıl görüntüleyeceğinizi göstereceğiz](/developers/tutorials/how-to-view-nft-in-metamask/)!