---
title: Bir NFT Nasıl Yazılır ve Dağıtılır (NFT Öğretici Serisi Bölüm 1/3)
description: Bu öğretici, Ethereum ve Gezegenler Arası Dosya Sistemi (IPFS) kullanarak bir Değiştirilemez Token (ERC-721 token'ı) akıllı sözleşmesinin nasıl yazılacağı ve dağıtılacağı konusunda adım adım yol gösterecek olan NFT'lerle ilgili bir dizinin 1. Bölümüdür.
author: "Sumi Mudgil"
tags:
  - "NFT'ler"
  - "ERC-721"
  - "Alchemy"
  - "Solidity"
  - "akıllı sözleşmeler"
skill: beginner
lang: tr
published: 2021-04-22
---

Şu anda NFT'lerin blok zincirini insanlara sunması, Ethereum blok zincirinde kendi NFT'nizi (ERC-721 Token'ı) yayınlarak bu heyecanı bizzat deneyimlemeniz için mükemmel bir fırsattır!

Alchemy; Makersplace (son zamanlarda Christie's'de 69 Milyon ABD Doları değerinde rekor bir dijital sanat eseri satışı gerçekleştirdi), Dapper Labs (NBA Top Shot ve Crypto Kitties'in yaratıcıları), OpenSea (dünyanın en büyük NFT pazarı), Zora, Super Rare, NFTfi, Foundation, Enjin, Origin Protocol, Immutable ve daha fazlası gibi NFT alanındaki büyük isimleri desteklemekten büyük bir gurur duyuyor.

Bu öğreticide; [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) ve [Alchemy](https://alchemy.com/signup/eth) kullanarak Ropsten test ağında bir ERC-721 akıllı sözleşmesi oluşturma ve dağıtma adımlarını inceleyeceğiz (ne olduğunu anlamıyorsanız üzülmeyin, açıklayacağız!).

Bu öğreticinin 2. Bölümünde, bir NFT'yi basmak için akıllı sözleşmemizi nasıl kullanabileceğimizi inceleyeceğiz ve 3. Bölümde NFT'nizi MetaMask üzerinde nasıl görüntüleyeceğinizi açıklayacağız.

Ve elbette, herhangi bir noktada sorunuz olursa, [Alchemy Discord](https://discord.gg/gWuC7zB)'dan bize ulaşmaktan veya [Alchemy'nin NFT API belgelerini](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api) ziyaret etmekten çekinmeyin!

## Adım 1: Ethereum ağına bağlanın {#connect-to-ethereum}

Ethereum blok zincirine istek göndermenin birçok yolu vardır, ancak işleri kolaylaştırmak için, kendi düğümlerimizi çalıştırmak zorunda kalmadan Ethereum zinciri ile iletişim kurmamızı sağlayan bir blok zinciri geliştirici platformu ve API'si olan[Alchemy](https://alchemy.com/signup/eth)'de ücretsiz bir hesap kullanacağız.

Bu eğitimde, akıllı sözleşme dağıtımımızda perde arkasında neler olup bittiğini anlamak için Alchemy'nin izleme ve analitik geliştirici araçlarından da yararlanacağız. Henüz bir Alchemy hesabınız yoksa, [buradan](https://alchemy.com/signup/eth) ücretsiz kaydolabilirsiniz.

## Adım 2: Uygulamanızı (ve API anahtarınızı) oluşturun {#make-api-key}

Bir Alchemy hesabı oluşturduktan sonra, bir uygulama oluşturarak bir API anahtarı oluşturabilirsiniz. Bu, Ropsten test ağına istekte bulunmamıza izin verecektir. Eğer test ağları hakkında daha fazlasını öğrenmeye meraklıysanız [bu rehbere](https://docs.alchemyapi.io/guides/choosing-a-network) göz atın.

1. İmlecinizi gezinme çubuğundaki "Apps"in (Uygulamalar) üzerine gelip "Create App"e (Uygulama Oluştur) tıklayarak Alchemy Gösterge Panelinizdeki "Create App" sayfasına gidin

![Uygulamanızı oluşturun](./create-your-app.png)

2. Uygulamanıza bir ad verin (biz, "İlk NFT'm!"i seçtik), kısa bir açıklama yazın, Environment (Ortam) için "Staging"i (Hazırlama) seçin (uygulamanızın muhasebesi için kullanılır) ve network (ağ) için "Ropsten"i seçin.

![Uygulamanızı yapılandırın ve yayınlayın](./configure-and-publish-your-app.png)

3. "Create app"e (Uygulama oluştur) tıklamanız yeterlidir! Uygulamanız aşağıdaki tabloda görünmelidir.

## Adım 3: Bir Ethereum hesabı oluşturun (adres) {#create-eth-address}

İşlem göndermek ve almak için bir Ethereum hesabına ihtiyacımız var. Bu eğitim için, Ethereum hesap adresinizi yönetmek için kullanılan tarayıcı üstü bir sanal cüzdan olan MetaMask'i kullanacağız. Ethereum'daki işlemlerin nasıl çalıştığı hakkında daha fazla bilgi edinmek istiyorsanız, Ethereum Vakfı'nın [bu sayfasına](/developers/docs/transactions/) göz atın.

[Buradan](https://metamask.io/download.html) ücretsiz olarak bir MetaMask hesabı indirebilir ve oluşturabilirsiniz. Bir hesap oluşturuyorsanız veya zaten bir hesabınız varsa, sağ üstteki "Ropsten Test Ağı"na geçtiğinizden emin olun (böylece gerçek parayla uğraşmayız).

![Ropsten'i ağınız olarak ayarlayın](./metamask-ropsten.png)

## Adım 4: Bir Musluktan ether ekleyin {#step-4-add-ether-from-a-faucet}

Akıllı sözleşmemizi test ağına dağıtmak için biraz sahte ETH'ye ihtiyacımız olacak. ETH almak için [FaucETH](https://fauceth.komputing.org)'e gidip Ropsten hesap adresinizi girebilir, "Request funds"a (Para talep et) tıklayabilir, ardından açılır menüden "Ethereum Testnet Ropsten"i seçebilir ve son olarak tekrar "Request funds" düğmesine tıklayabilirsiniz. Kısa bir süre sonra MetaMask hesabınızda ETH'yi görmelisiniz!

## Adım 5: Bakiyenizi kontrol edin {#check-balance}

Bakiyemizin yerinde olduğundan emin olmak için [Alchemy düzenleyici arayıcını](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) kullanarak bir [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) talebi oluşturalım. Bu, cüzdanımızdaki ETH miktarını döndürür. MetaMask hesap adresinizi girdikten ve "Send Request"e tıkladıktan sonra aşağıdaki gibi bir yanıt görmelisiniz:

    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`

**NOT: **Bu sonuç ETH değil, wei biçimindedir. Wei, ether'ın en küçük birimi olarak kullanılır. Wei'den ETH'ye dönüşüm 1 eth = 10<sup>18</sup> wei'dir. Yani 0xde0b6b3a7640000'i ondalık sayıya dönüştürürsek 1\*10<sup>18</sup> wei elde ederiz, bu da 1 ETH'ye eşittir.

Vay be! Tüm sahte paramız yerli yerinde.

## Adım 6: Projemizi başlatın {#initialize-project}

Öncelikle projemiz için bir klasör oluşturmamız gerekecek. Komut satırınıza gidin ve şunu yazın:

    mkdir my-nft
    cd my-nft

Artık proje klasörümüzün içinde olduğumuza göre, projeyi başlatmak için npm init kullanacağız. Hâlihazırda npm kurulu değilse, [bu talimatları izleyin](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) ([Node.js](https://nodejs.org/en/download/)'ye de ihtiyacımız olacak, onu da indirin!).

    npm init

Kurulum sorularına nasıl cevap verdiğiniz çok önemli değil; referans olması için nasıl yaptığımız aşağıda açıklanmıştır:

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

package.json'ı onayladıktan sonra hazırız!

## Adım 7: [Hardhat](https://hardhat.org/getting-started/#overview)'i kurun {#install-hardhat}

Hardhat, Ethereum yazılımınızı derlemek, dağıtmak, test etmek ve hatalarını ayıklamak için bir geliştirme ortamıdır. Canlı zincire dağıtmadan önce yerel olarak akıllı sözleşmeler ve dApp'ler oluştururken geliştiricilere yardımcı olur.

my-nft projemizin içinde şunu yürütün:

    npm install --save-dev hardhat

[Kurulum talimatları](https://hardhat.org/getting-started/#overview) hakkında daha fazla ayrıntı için bu sayfaya göz atın.

## Adım 8: Hardhat projesi oluşturun {#create-hardhat-project}

Proje klasörümüzün içinde şunu yürütün:

    npx hardhat

Daha sonra bir karşılama mesajı ve ne yapmak istediğinizi seçme seçeneği görmelisiniz. "create an empty hardhat.config.js"yi (boş bir hardhat.config.js oluştur) seçin:

    888    888                      888 888               888
    888    888                      888 888               888
    888    888                      888 888               888
    8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
    888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
    888    888 .d888888 888    888  888 888  888 .d888888 888
    888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
    888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
    👷 Hardhat v2.0.11 Hoşgeldin 👷‍
    ?
     Ne yapmak istersin? …
    Create a sample project
    ❯ Create an empty hardhat.config.js
    Quit

Bu, bizim için bir hardhat.config.js dosyası oluşturacak ve burada projemiz için tüm ayarları belirteceğiz (adım 13'te).

## Adım 9: Proje klasörleri ekleyin {#add-project-folders}

Projemizi düzenli tutmak için iki yeni klasör oluşturacağız. Komut satırınızda projenizin kök dizinine gidin ve şunu yazın:

    mkdir contracts
    mkdir scripts

- contracts/, NFT akıllı sözleşme kodumuzu tutacağımız yerdir

- scripts/, akıllı sözleşmemizle dağıtmak ve etkileşim kurmak için komut dosyalarını tutacağımız yerdir

## Adım 10: Sözleşmemizi yazın {#write-contract}

Artık ortamımız hazır olduğuna göre, daha heyecan verici şeylere geçelim: _akıllı sözleşme kodumuzu yazmak!_

Favori düzenleyicinizde my-nft projesini açın. (biz [VSCode](https://code.visualstudio.com/)'u tercih ediyoruz). Akıllı sözleşmeler, MyNFT.sol akıllı sözleşmemizi yazmak için kullanacağımız Solidity adlı bir dilde yazılır.‌

1. `contracts` klasörüne gidin ve MyNFT.sol adlı yeni bir dosya oluşturun

2. Aşağıda, [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc721) kütüphanesinin ERC-721 uygulamasını temel aldığımız NFT akıllı sözleşme kodumuz yer almaktadır. Aşağıdaki içeriği kopyalayıp MyNFT.sol dosyanıza yapıştırın.

   ```solidity
   //Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
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

3. Sınıfları OpenZeppelin sözleşme kütüphanesinden aldığımız için, kütüphaneyi klasörümüze kurmak için komut satırınızda `npm install @openzeppelin/contracts` komutunu yürütün.

Peki, bu kod tam olarak ne _yapar_? Satır satır inceleyelim.

Akıllı sözleşmemizin en üstüne, üç tane [OpenZeppelin](https://openzeppelin.com/) akıllı sözleşme sınıfını içe aktararak ekliyoruz:

- @openzeppelin/contracts/token/ERC721/ERC721.sol, NFT akıllı sözleşmemizin devralacağı ERC-721 standardının uygulamasını içerir. (Geçerli bir NFT olması için akıllı sözleşmenizin ERC-721 standardının tüm yöntemlerini uygulaması gerekir.) Devralınan ERC-721 fonksiyonları hakkında daha fazla bilgi edinmek için [buradaki](https://eips.ethereum.org/EIPS/eip-721) arayüz tanımına bakın.

- @openzeppelin/contracts/utils/Counters.sol, yalnızca bir artırılabilen veya azaltılabilen sayaçlar sağlar. Akıllı sözleşmemiz, basılan toplam NFT sayısını takip etmek ve yeni NFT'mizde benzersiz kimliği belirlemek için bir sayaç kullanır. (Akıllı bir sözleşme kullanılarak basılan her NFT'ye benzersiz bir kimlik atanmalıdır: Burada benzersiz kimliğimiz yalnızca mevcut toplam NFT sayısı tarafından belirlenir. Örneğin, akıllı sözleşmemizle bastığımız ilk NFT'nin kimliği "1", ikinci NFT'mizin kimliği "2" vb. olacaktır.)

- @openzeppelin/contracts/access/Ownable.sol, akıllı sözleşmemizde sadece akıllı sözleşmenin sahibinin (sizin) NFT basabilmesi için [erişim kontrolü](https://docs.openzeppelin.com/contracts/3.x/access-control) kurulumu yapar. (Erişim kontrolünün dahil edilmesinin tamamen bir tercih olduğunu unutmayın. Herhangi birinin akıllı sözleşmenizi kullanarak bir NFT basabilmesini istiyorsanız, 10. satırdaki Ownable ve 17. satırdaki onlyOwner kelimelerini kaldırın.)

İçe aktarma ifadelerimizden sonra, şaşırtıcı derecede kısa olan özel NFT akıllı sözleşmemiz var: Yalnızca bir sayaç, bir yapıcı (constructor) ve tek bir fonksiyon içeriyor! Bu, NFT'nin sahibini döndüren `ownerOf` ve `transferFrom` gibi bir NFT oluşturmak için ihtiyaç duyduğumuz yöntemlerin çoğunu uygulayan devralınan, NFT'nin sahipliğini bir hesaptan diğerine aktaran OpenZeppelin sözleşmelerimiz sayesindedir.

ERC-721 yapıcımızda, "MyNFT" ve "NFT" olmak üzere 2 dize geçirdiğimizi göreceksiniz İlk değişken akıllı sözleşmenin adı, ikincisi ise sembolüdür. Bu değişkenlerin her birine dilediğiniz gibi isim verebilirsiniz!

Son olarak, bir NFT basmamızı sağlayan `mintNFT(address recipient, string memory tokenURI)` fonksiyonumuz var! Bu fonksiyonun iki değişken aldığını fark edeceksiniz:

- `recipient`, yeni basılmış NFT'nizi alacak adresi belirtir

- `string memory tokenURI`, NFT'nin meta verilerini tanımlayan bir JSON belgesine çözümlenmesi gereken bir dizedir. Bir NFT'nin meta verileri, onu gerçekten hayata geçiren şeydir ve bir ad, açıklama, görüntü ve diğer nitelikler gibi yapılandırılabilir özelliklere sahip olmasını sağlar. Bu öğreticinin 2. bölümünde, bu meta verilerin nasıl yapılandırılacağını açıklayacağız.

`mintNFT`, devralınan ERC-721 kitaplığından bazı yöntemleri çağırır ve nihayetinde yeni basılmış NFT'nin kimliğini temsil eden bir sayı döndürür.

## Adım 11: MetaMask ve Alchemy'i projenize bağlayın {#connect-metamask-and-alchemy}

Artık bir MetaMask cüzdanı ile Alchemy hesabı oluşturduğumuza ve akıllı sözleşmemizi yazdığımıza göre, üçünü birbirine bağlamanın zamanı geldi.

Sanal cüzdanınızdan gönderilen her işlem, benzersiz özel anahtarınızı kullanan bir imza gerektirir. Programımıza bu izni sağlamak için özel anahtarımızı (ve Alchemy API anahtarımızı) bir ortam dosyasında güvenle saklayabiliriz.

İşlem gönderme hakkında daha fazla bilgi edinmek için web3 kullanarak işlem göndermeyle ilgili [bu öğreticiye](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) göz atın.

İlk önce dotenv paketini proje dizininize kurun:

    npm install dotenv --save

Ardından projemizin kök dizininde bir `.env` dosyası oluşturun ve buna MetaMask özel anahtarınızı ve HTTP Alchemy API URL'nizi ekleyin.

- Özel anahtarınızı MetaMask'ten almak için [şu talimatları](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) takip edin

- HTTP Alchemy API URL'sini almak ve panonuza kopyalamak için aşağıya göz atın

![Alchemy API URL'nizi kopyalayın](./copy-alchemy-api-url.gif)

`.env`, şimdi şöyle görünmelidir:

    API_URL="https://eth-ropsten.alchemyapi.io/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"

Bunları kodumuza gerçekten bağlamak için, adım 13'te hardhat.config.js dosyamızda bu değişkenlere başvuracağız.

<InfoBanner isWarning={true}>
<code>.env</code> taahhüt etmeyin! Lütfen <code>.env</code> dosyanızı asla kimseyle paylaşmadığınızdan veya ifşa etmediğinizden emin olun, çünkü bunu yaparken sırlarınızı tehlikeye atıyorsunuz. Sürüm kontrolü kullanıyorsanız, <code>.env</code> dosyanızı bir <a href="https://git-scm.com/docs/gitignore">gitignore</a> dosyasına ekleyin.
</InfoBanner>

## Adım 12: Ethers.js'yi kurun {#install-ethers}

Ethers.js, [standart JSON-RPC yöntemlerini](/developers/docs/apis/json-rpc/) daha kullanıcı dostu yöntemlerle birleştirerek Ethereum'la etkileşimde bulunmayı ve Ethereum'a istek göndermeyi kolaylaştıran bir kütüphanedir.

Hardhat, ek araçlar ve genişletilmiş işlevsellik için [Eklentiler](https://hardhat.org/plugins/)'i entegre etmeyi çok kolaylaştırır. Sözleşme dağıtımı için [Ethers eklentisinden](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html) yararlanacağız ([Ethers.js](https://github.com/ethers-io/ethers.js/)'nin bazı aşırı temiz sözleşme dağıtım yöntemleri vardır).

Proje klasörünüzde şunu yazın:

    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0

Bir sonraki adımda hardhat.config.js'mizde de ether'lara ihtiyacımız olacak.

## Adım 13: hardhat.config.js'yi güncelleyin {#update-hardhat-config}

Şimdiye kadar birkaç bağımlılık ve eklenti ekledik, şimdi projemizin bunların hepsini tanıması için hardhat.config.js'yi güncellememiz gerekiyor.

Hardhat.config.js dosyanızı şöyle görünecek şekilde güncelleyin:

    /**
    * @type import('hardhat/config').HardhatUserConfig
    */
    require('dotenv').config();
    require("@nomiclabs/hardhat-ethers");
    const { API_URL, PRIVATE_KEY } = process.env;
    module.exports = {
       solidity: "0.8.1",
       defaultNetwork: "ropsten",
       networks: {
          hardhat: {},
          ropsten: {
             url: API_URL,
             accounts: [`0x${PRIVATE_KEY}`]
          }
       },
    }

## Adım 14: Sözleşmemizi derleyin {#compile-contract}

Şimdiye kadar yaptığımız her şeyin çalıştığından emin olmak için sözleşmemizi derleyelim. Derleme görevi, yerleşik hardhat görevlerden biridir.

Komut satırından şunu yürütün:

    npx hardhat compile

Kaynak dosyada verilmeyen SPDX lisans tanımlayıcısı hakkında bir uyarı alabilirsiniz, ancak bunun için endişelenmenize gerek yok, geri kalan her şey düzgün olacaktır! Düzgün değilse, istediğiniz zaman [Alchemy discord](https://discord.gg/u72VCg3)'da mesaj gönderebilirsiniz.

## Adım 15: Dağıtım komut dosyamızı yazın {#write-deploy}

Artık sözleşmemiz yazıldığına ve yapılandırma dosyamız kullanıma hazır olduğuna göre, sözleşme dağıtım komut dosyanızı yazmanın zamanı geldi.

`scripts/` klasörüne gidin ve aşağıdaki içerikleri ekleyerek `deploy.js` adlı yeni bir dosya oluşturun:

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // Start deployment, returning a promise that resolves to a contract object
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

Hardhat, bu kod satırlarının her birinin ne işe yaradığını [Sözleşme öğreticisinde](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) harika bir şekilde açıklıyor, Hardhat açıklamalarını buraya aktardık.

    const MyNFT = await ethers.getContractFactory("MyNFT");

Ethers.js'deki bir ContractFactory, yeni akıllı sözleşmeleri dağıtmak için kullanılan bir soyutlamadır, bu nedenle MyNFT burada, NFT sözleşmemizin örnekleri için bir fabrikadır. Hardhat-ethers eklentisini kullanırken ContractFactory ve Sözleşme örnekleri varsayılan olarak ilk imzalayana bağlanır.

    const myNFT = await MyNFT.deploy();

Bir Sözleşme Fabrikasında deploy() öğesinin çağrılması, dağıtımı başlatır ve bir Sözleşmeye çözümlenen bir Söz verir. Bu, akıllı sözleşme fonksiyonlarımızın her biri için bir yöntemi olan nesnedir.

## Adım 16: Sözleşmemizi dağıtın {#deploy-contract}

Sonunda akıllı sözleşmemizi uygulamaya hazırız! Proje dizininizin kök dizinine geri dönün ve komut satırında şunu çalıştırın:

    npx hardhat --network ropsten run scripts/deploy.js

Daha sonra şöyle bir şey görmelisiniz:

    Contract deployed to address: 0x81c587EB0fE773404c42c1d2666b5f557C470eED

[Ropsten etherscan](https://ropsten.etherscan.io/)'e gidersek ve sözleşme adresimizi ararsak, bunun başarıyla dağıtıldığını görebiliriz. Bu işlem biraz zaman alabileceğinden dolayı hemen göremezseniz lütfen biraz bekleyin. İşlem şunun gibi gözükecektir:

![İşlem adresinizi Etherscan'de görüntüleyin](./etherscan-transaction.png)

From (gönderen) adresi, MetaMask hesap adresinizle eşleşmelidir ve To (alıcı) adresinde "Contract Creation" (Sözleşme Oluşturma) yazacaktır. İşleme tıklarsak, To alanında sözleşme adresimizi görürüz:

![Etherscan'da sözleşme adresinizi görüntüleyin](./etherscan-contract.png)

Eveeet! NFT akıllı sözleşmenizi Ethereum zincirine dağıttınız!

Perde arkasında neler olduğunu anlamak için [Alchemy gösterge panelimizde](https://dashboard.alchemyapi.io/explorer) Explorer (Gezgin) sekmesine gidelim. Birden fazla Alchemy uygulamanız varsa, uygulamaya göre filtreleme yaptığınızdan ve "MyNFT"yi seçtiğinizden emin olun.

![Alchemy'nin Gezgin Gösterge Panosu ile "perde arkasında" yapılan aramaları görüntüleyin](./alchemy-explorer.png)

Burada, .deploy() fonksiyonunu çağırdığımızda Hardhat/Ethers'ın bizim için arka planda yaptığı bir avuç JSON-RPC çağrısı göreceksiniz. Burada belirtilmesi gereken iki önemli şey, akıllı sözleşmemizi Ropsten zincirine yazma isteği olan [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction) ve hash değerine göre işlemimiz hakkındaki bilgileri okuma isteği olan (işlem gönderirken sık kullanılan bir şablon) [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash) öğeleridir. İşlem gönderme hakkında daha fazla bilgi edinmek için web3 kullanarak işlem göndermeyle ilgili [bu öğreticiye](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) göz atın.

Bu öğreticinin 1. Bölümü bu kadardı. [2. Bölümde, bir NFT'yi basarak](/developers/tutorials/how-to-mint-an-nft/) akıllı sözleşmemizle gerçekten etkileşime geçeceğiz ve [3. Bölümde, Ethereum cüzdanınızda NFT'nizi nasıl görüntüleyeceğinizi göstereceğiz](/developers/tutorials/how-to-view-nft-in-metamask/)!
