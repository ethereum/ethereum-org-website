---
title: "Bir NFT Nasıl Yazılır ve Dağıtılır (NFT Öğretici Serisi Bölüm 1/3)"
description: "Bu öğretici, Ethereum ve Gezegenler Arası Dosya Sistemi (IPFS) kullanarak bir Değiştirilemez Token (ERC-721 token'ı) akıllı sözleşmesinin nasıl yazılacağı ve dağıtılacağı konusunda adım adım yol gösterecek olan NFT'lerle ilgili bir dizinin 1. Bölümüdür."
author: "Sumi Mudgil"
tags: [ "ERC-721", "Alchemy", "Solidity", "akıllı kontratlar" ]
skill: beginner
lang: tr
published: 2021-04-22
---

NFT'lerin blokzinciri geniş kitlelere tanıtmasıyla, Ethereum blokzinciri üzerinde kendi NFT sözleşmenizi (ERC-721 Jetonu) yayımlayarak bu konudaki heyecanı kendiniz anlamanız için harika bir fırsat doğdu!

Alchemy; Makersplace (son zamanlarda Christie's'de 69 Milyon ABD Doları değerinde rekor bir dijital sanat eseri satışı gerçekleştirdi), Dapper Labs (NBA Top Shot ve Crypto Kitties'in yaratıcıları), OpenSea (dünyanın en büyük NFT pazarı), Zora, Super Rare, NFTfi, Foundation, Enjin, Origin Protocol, Immutable ve daha fazlası gibi NFT alanındaki büyük isimleri desteklemekten büyük bir gurur duyuyor.

Bu öğreticide, [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) ve [Alchemy](https://alchemy.com/signup/eth) kullanarak Sepolia test ağında bir ERC-721 akıllı sözleşmesi oluşturma ve dağıtma adımlarını inceleyeceğiz (bunların ne anlama geldiğini henüz anlamıyorsanız endişelenmeyin, açıklayacağız!).

Bu öğreticinin 2. Bölümünde, bir NFT'yi basmak için akıllı sözleşmemizi nasıl kullanabileceğimizi inceleyeceğiz ve 3. Bölümde NFT'nizi MetaMask üzerinde nasıl görüntüleyeceğinizi açıklayacağız.

Ve elbette, herhangi bir noktada sorularınız olursa, [Alchemy Discord](https://discord.gg/gWuC7zB)'dan bize ulaşmaktan veya [Alchemy'nin NFT API belgelerini](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api) ziyaret etmekten çekinmeyin!

## Adım 1: Ethereum ağına bağlanın {#connect-to-ethereum}

Ethereum blok zincirine istek göndermenin birçok yolu vardır, ancak işleri kolaylaştırmak için, kendi düğümlerimizi çalıştırmak zorunda kalmadan Ethereum zinciri ile iletişim kurmamızı sağlayan bir blok zinciri geliştirici platformu ve API'si olan [Alchemy](https://alchemy.com/signup/eth)'de ücretsiz bir hesap kullanacağız.

Bu eğitimde, akıllı sözleşme dağıtımımızda perde arkasında neler olup bittiğini anlamak için Alchemy'nin izleme ve analitik geliştirici araçlarından da yararlanacağız. Henüz bir Alchemy hesabınız yoksa, [buradan](https://alchemy.com/signup/eth) ücretsiz kaydolabilirsiniz.

## Adım 2: Uygulamanızı (ve API anahtarınızı) oluşturun {#make-api-key}

Bir Alchemy hesabı oluşturduktan sonra, bir uygulama yaratarak bir API anahtarı oluşturabilirsiniz. Bu, Sepolia test ağına istekte bulunmamıza izin verecektir. Test ağları hakkında daha fazla bilgi edinmek isterseniz [bu kılavuza](https://docs.alchemyapi.io/guides/choosing-a-network) göz atın.

1. İmlecinizi gezinme çubuğundaki "Apps"in (Uygulamalar) üzerine gelip "Create App"e (Uygulama Oluştur) tıklayarak Alchemy Gösterge Panelinizdeki "Create App" sayfasına gidin

![Uygulamanızı oluşturun](./create-your-app.png)

2. Uygulamanıza bir ad verin (biz, "İlk NFT'm!"i seçtik), kısa bir açıklama yazın, Zincir için "Ethereum"', ağınız için "Sepolia" seçimi yapın. Birleşim sonrasında diğer test ağları kullanımdan kaldırılmıştır.

![Uygulamanızı yapılandırın ve yayınlayın](./alchemy-explorer-sepolia.png)

3. "Create app"e (Uygulama oluştur) tıklamanız yeterlidir! Uygulamanız aşağıdaki tabloda görünmelidir.

## Adım 3: Bir Ethereum hesabı oluşturun (adres) {#create-eth-address}

İşlem göndermek ve almak için bir Ethereum hesabına ihtiyacımız var. Bu öğretici için, Ethereum hesap adresinizi yönetmek için kullanılan tarayıcıda sanal bir cüzdan olan MetaMask'ı kullanacağız. Ethereum'daki işlemlerin nasıl çalıştığı hakkında daha fazla bilgi edinmek istiyorsanız, Ethereum Vakfı'nın [bu sayfasına](/developers/docs/transactions/) göz atın.

MetaMask'ı [buradan](https://metamask.io/download) ücretsiz indirip bir hesap oluşturabilirsiniz. Bir hesap oluştururken, ya da bir hesabınız çoktan varsa, sağ üstten Sepolia Test Ağına geçtiğinizden emin olun (bu sayede gerçek parayla denemeler yapmayız).

![Sepolia'yı ağınız olarak ayarlayın](./metamask-goerli.png)

## Adım 4: Bir Musluktan ether ekleyin {#step-4-add-ether-from-a-faucet}

Akıllı sözleşmemizi test ağına dağıtmak için biraz sahte ETH'ye ihtiyacımız olacak. ETH almak için Alchemy tarafından barındırılan [Sepolia Musluğuna](https://sepoliafaucet.com/) gidin, oturum açın, hesap adresinizi girin ve “Bana ETH Gönder”e tıklayın. Kısa bir süre sonra Metamask hesabınızda ETH'yi görmelisiniz!

## Adım 5: Bakiyenizi kontrol edin {#check-balance}

Bakiyemizin mevcut olup olmadığını iki kez kontrol etmek için [Alchemy'nin Composer aracını](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) kullanarak bir [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) isteği yapalım. Bu, cüzdanımızdaki ETH miktarını döndürür. MetaMask hesap adresinizi girdikten ve "Send Request"e tıkladıktan sonra aşağıdaki gibi bir yanıt görmelisiniz:

    ```
    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`
    ```

> **Not**: Bu sonuç ETH değil, wei cinsindendir. Wei, ether'ın en küçük birimi olarak kullanılır. Wei'den ETH'ye dönüştürme 1 eth = 10<sup>18</sup> wei şeklindedir. Yani 0xde0b6b3a7640000'ı ondalık sayıya dönüştürürsek 1\*10<sup>18</sup> wei elde ederiz, bu da 1 ETH'ye eşittir.

Vay be! Tüm sahte paramız yerli yerinde.

## Adım 6: Projemizi başlatın {#initialize-project}

Öncelikle projemiz için bir klasör oluşturmamız gerekecek. Komut satırınıza gidin ve şunu yazın:

    ```
    mkdir my-nft
    cd my-nft
    ```

Artık proje klasörümüzün içinde olduğumuza göre, projeyi başlatmak için npm init kullanacağız. Eğer npm zaten kurulu değilse, [bu talimatları](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) takip edin ([Node.js](https://nodejs.org/en/download/)'e de ihtiyacımız olacak, bu yüzden onu da indirin!).

    ```
    npm init
    ```

Kurulum sorularına nasıl cevap verdiğiniz çok önemli değil; referans olması için nasıl yaptığımızı aşağıda açıkladık:

```json
    package name: (my-nft)
    version: (1.0.0)
    description: İlk NFT'm!
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
      "description": "İlk NFT'm!",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC"
    }
```

package.json'ı onaylayın ve artık hazırız!

## Adım 7: [Hardhat](https://hardhat.org/getting-started/#overview)'i Kurun {#install-hardhat}

Hardhat, Ethereum yazılımınızı derlemek, dağıtmak, test etmek ve hatalarını ayıklamak için bir geliştirme ortamıdır. Bu geliştiricilere canlı zincirde dağıtmadan önce akıllı sözleşmelerini ve merkeziyetsiz uygulamalarını geliştirirken yardımcı olur.

my-nft projemizin içinde şunu yürütün:

    ```
    npm install --save-dev hardhat
    ```

[Kurulum talimatları](https://hardhat.org/getting-started/#overview) hakkında daha fazla ayrıntı için bu sayfaya göz atın.

## Adım 8: Hardhat projesi oluşturun {#create-hardhat-project}

Proje klasörümüzün içinde şunu yürütün:

    ```
    npx hardhat
    ```

Daha sonra bir karşılama mesajı ve ne yapmak istediğinizi seçme seçeneği görmelisiniz. "create an empty hardhat.config.js"yi (boş bir hardhat.config.js oluştur) seçin:

    ```
    888    888                      888 888               888
    888    888                      888 888               888
    888    888                      888 888               888
    8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
    888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
    888    888 .d888888 888    888  888 888  888 .d888888 888
    888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
    888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
    👷 Hardhat v2.0.11 sürümüne hoş geldiniz 👷‍
    ? Ne yapmak istersiniz? …
    Örnek bir proje oluşturun
    ❯ Boş bir hardhat.config.js oluşturun
    Çıkış
    ```

Bu, bizim için bir hardhat.config.js dosyası oluşturacak ve burada projemiz için tüm ayarları belirteceğiz (adım 13'te).

## Adım 9: Proje klasörleri ekleyin {#add-project-folders}

Projemizi düzenli tutmak için iki yeni klasör oluşturacağız. Komut satırınızda projenizin kök dizinine gidin ve şunu yazın:

    ```
    mkdir contracts
    mkdir scripts
    ```

- contracts/, NFT akıllı sözleşme kodumuzu tutacağımız yerdir

- scripts/, akıllı sözleşmemizle dağıtmak ve etkileşim kurmak için komut dosyalarını tutacağımız yerdir

## Adım 10: Sözleşmemizi yazın {#write-contract}

Artık ortamımız hazır olduğuna göre, daha heyecan verici şeylere geçelim: _akıllı sözleşme kodumuzu yazmak!_

`my-nft` projesini tercih ettiğiniz bir düzenleyicide açın (biz [VSCode](https://code.visualstudio.com/)'u tercih ediyoruz). Akıllı sözleşmeler, MyNFT.sol akıllı sözleşmemizi yazmak için kullanacağımız Solidity adlı bir dilde yazılır.‌

1. `contracts` klasörüne gidin ve `MyNFT.sol` adında yeni bir dosya oluşturun.

2. Aşağıda, [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc721) kütüphanesinin ERC-721 uygulamasını temel alan NFT akıllı sözleşme kodumuz bulunmaktadır. Aşağıdaki içeriği kopyalayıp MyNFT.sol dosyanıza yapıştırın.

   ```solidity
   //Sözleşme [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)'i temel almıştır.
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

3. OpenZeppelin sözleşme kütüphanesinden sınıfları miras aldığımız için, komut satırınızda `npm install @openzeppelin/contracts^4.0.0` komutunu çalıştırarak kütüphaneyi klasörümüze kurun.

Peki, bu kod tam olarak ne _yapar_? Satır satır inceleyelim.

Akıllı sözleşmemizin en üstünde, üç [OpenZeppelin](https://openzeppelin.com/) akıllı sözleşme sınıfını içe aktarıyoruz:

- @openzeppelin/contracts/token/ERC721/ERC721.sol, NFT akıllı sözleşmemizin devralacağı ERC-721 standardının uygulamasını içerir. (Geçerli bir NFT olması için akıllı sözleşmenizin ERC-721 standardının tüm yöntemlerini uygulaması gerekir.) Miras alınan ERC-721 fonksiyonları hakkında daha fazla bilgi edinmek için [buradaki](https://eips.ethereum.org/EIPS/eip-721) arayüz tanımına göz atın.

- @openzeppelin/contracts/utils/Counters.sol, yalnızca bir artırılabilen veya azaltılabilen sayaçlar sağlar. Akıllı sözleşmemiz, basılan toplam NFT sayısını takip etmek ve yeni NFT'mizde benzersiz kimliği belirlemek için bir sayaç kullanır. (Akıllı bir sözleşme kullanılarak basılan her NFT'ye benzersiz bir kimlik atanmalıdır: Burada benzersiz kimliğimiz yalnızca mevcut toplam NFT sayısı tarafından belirlenir. Örneğin, akıllı sözleşmemizle bastığımız ilk NFT'nin kimliği "1", ikinci NFT'mizin kimliği "2" vb. olacaktır.)

- `@openzeppelin/contracts/access/Ownable.sol`, akıllı sözleşmemizde [erişim kontrolü](https://docs.openzeppelin.com/contracts/3.x/access-control) kurar, böylece yalnızca akıllı sözleşmenin sahibi (yani siz) NFT basabilir. (Erişim kontrolünün dahil edilmesinin tamamen bir tercih olduğunu unutmayın. Herhangi birinin akıllı sözleşmenizi kullanarak bir NFT basabilmesini istiyorsanız, 10. satırdaki Ownable ve 17. satırdaki onlyOwner kelimelerini kaldırın.)

İçe aktarma ifadelerimizden sonra, şaşırtıcı derecede kısa olan özel NFT akıllı sözleşmemiz var: Yalnızca bir sayaç, bir oluşturucu ve tek bir fonksiyon içeriyor! Bu, miras aldığımız OpenZeppelin sözleşmeleri sayesindedir. Bu sözleşmeler, bir NFT oluşturmak için ihtiyaç duyduğumuz yöntemlerin çoğunu uygular; örneğin NFT'nin sahibini döndüren `ownerOf` ve NFT'nin sahipliğini bir hesaptan diğerine aktaran `transferFrom`.

ERC-721 oluşturucumuzda, "MyNFT" ve "NFT" olmak üzere 2 dize geçirdiğimizi göreceksiniz. İlk değişken akıllı sözleşmenin adı, ikincisi ise sembolüdür. Bu değişkenlerin her birine dilediğiniz gibi isim verebilirsiniz!

Son olarak, bir NFT basmamızı sağlayan `mintNFT(address recipient, string memory tokenURI)` fonksiyonumuz var! Bu fonksiyonun iki değişken aldığını fark edeceksiniz:

- `address recipient`, yeni bastığınız NFT'yi alacak adresi belirtir.

- `string memory tokenURI`, NFT'nin meta verilerini tanımlayan bir JSON belgesine çözümlenmesi gereken bir dizedir. Bir NFT'nin meta verileri, onu gerçekten hayata geçiren şeydir ve bir ad, açıklama, görüntü ve diğer nitelikler gibi yapılandırılabilir özelliklere sahip olmasını sağlar. Bu öğreticinin 2. bölümünde, bu meta verilerin nasıl yapılandırılacağını açıklayacağız.

`mintNFT`, devralınan ERC-721 kitaplığından bazı yöntemleri çağırır ve nihayetinde yeni basılmış NFT'nin kimliğini temsil eden bir sayı döndürür.

## Adım 11: MetaMask ve Alchemy'yi projenize bağlayın {#connect-metamask-and-alchemy}

Artık bir MetaMask cüzdanı ile Alchemy hesabı oluşturduğumuza ve akıllı sözleşmemizi yazdığımıza göre, üçünü birbirine bağlamanın zamanı geldi.

Sanal cüzdanınızdan gönderilen her işlem, benzersiz özel anahtarınızı kullanan bir imza gerektirir. Programımıza bu izni sağlamak için özel anahtarımızı (ve Alchemy API anahtarımızı) bir ortam dosyasında güvenle saklayabiliriz.

İşlem gönderme hakkında daha fazla bilgi edinmek için, web3 kullanarak işlem göndermeyle ilgili [bu öğreticiye](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) göz atın.

İlk önce dotenv paketini proje dizininize kurun:

    ```
    npm install dotenv --save
    ```

Ardından, projemizin kök dizininde bir `.env` dosyası oluşturun ve MetaMask özel anahtarınızı ve HTTP Alchemy API URL'nizi buna ekleyin.

- MetaMask'ten özel anahtarınızı dışa aktarmak için [bu talimatları](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) izleyin.

- HTTP Alchemy API URL'sini almak ve panonuza kopyalamak için aşağıya göz atın

![Alchemy API URL'nizi kopyalayın](./copy-alchemy-api-url.gif)

`.env` dosyanız şimdi şöyle görünmelidir:

    ```
    API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"
    ```

Bunları kodumuza gerçekten bağlamak için adım 13'te hardhat.config.js dosyamızda bu değişkenlere başvuracağız.

<EnvWarningBanner />

## Adım 12: Ethers.js Kurun {#install-ethers}

Ethers.js, [standart JSON-RPC yöntemlerini](/developers/docs/apis/json-rpc/) daha kullanıcı dostu yöntemlerle sarmalayarak Ethereum ile etkileşim kurmayı ve istek göndermeyi kolaylaştıran bir kütüphanedir.

Hardhat, ek araçlar ve genişletilmiş işlevsellik için [Eklentileri](https://hardhat.org/plugins/) entegre etmeyi çok kolaylaştırır. Sözleşme dağıtımı için [Ethers eklentisinden](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) yararlanacağız ([Ethers.js](https://github.com/ethers-io/ethers.js/) çok temiz sözleşme dağıtım yöntemlerine sahiptir).

Proje klasörünüzde şunu yazın:

    ```
    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0
    ```

Bir sonraki adımda hardhat.config.js'mizde de ether'lere ihtiyacımız olacak.

## Adım 13: hardhat.config.js'yi güncelleyin {#update-hardhat-config}

Şimdiye kadar birkaç bağımlılık ve eklenti ekledik, şimdi projemizin bunların hepsini tanıması için hardhat.config.js'yi güncellememiz gerekiyor.

Hardhat.config.js dosyanızı şöyle görünecek şekilde güncelleyin:

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

## Adım 14: Sözleşmemizi derleyin {#compile-contract}

Şimdiye kadar yaptığımız her şeyin çalıştığından emin olmak için sözleşmemizi derleyelim. Derleme görevi, yerleşik hardhat görevlerden biridir.

Komut satırından şunu yürütün:

    ```
    npx hardhat compile
    ```

Kaynak dosyada verilmeyen SPDX lisans tanımlayıcısı hakkında bir uyarı alabilirsiniz, ancak bunun için endişelenmenize gerek yok, geri kalan her şey düzgün olacaktır! Sorun yaşarsanız [Alchemy Discord](https://discord.gg/u72VCg3) üzerinden her zaman mesaj atabilirsiniz.

## Adım 15: Dağıtım betiğimizi yazın {#write-deploy}

Artık sözleşmemiz yazıldığına ve yapılandırma dosyamız kullanıma hazır olduğuna göre, sözleşme dağıtım komut dosyanızı yazmanın zamanı geldi.

`scripts/` klasörüne gidin ve `deploy.js` adında yeni bir dosya oluşturup aşağıdaki içeriği ekleyin:

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // Dağıtımı başlat, bir sözleşme nesnesine dönüşecek bir promise döndürür
  const myNFT = await MyNFT.deploy()
  await myNFT.deployed()
  console.log("Sözleşme şu adrese dağıtıldı:", myNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat, [Sözleşmeler öğreticisinde](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) bu kod satırlarının her birinin ne işe yaradığını harika bir şekilde açıklıyor, biz de buraya onların açıklamalarını aldık.

    ```
    const MyNFT = await ethers.getContractFactory("MyNFT");
    ```

Ethers.js'deki ContractFactory, yeni akıllı sözleşmeleri dağıtmak için kullanılan bir soyutlamadır, bu nedenle MyNFT burada, NFT sözleşmemizin örnekleri için bir fabrikadır. Hardhat-ethers eklentisini kullanırken ContractFactory ve Sözleşme örnekleri, varsayılan olarak ilk imzalayana bağlanır.

    ```
    const myNFT = await MyNFT.deploy();
    ```

Bir ContractFactory üzerinde deploy() öğesinin çağrılması, dağıtımı başlatır ve bir çözümlendiğinde Sözleşme oluşturacak bir Söz döndürür. Bu, akıllı sözleşme fonksiyonlarımızın her biri için bir yöntemi olan nesnedir.

## Adım 16: Sözleşmemizi dağıtın {#deploy-contract}

Sonunda akıllı sözleşmemizi uygulamaya hazırız! Proje dizininizin kök dizinine geri dönün ve komut satırında şunu çalıştırın:

    ```
    npx hardhat --network sepolia run scripts/deploy.js
    ```

Daha sonra şöyle bir şey görmelisiniz:

    ```
    Sözleşme şu adrese dağıtıldı: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650
    ```

[Sepolia etherscan](https://sepolia.etherscan.io/) adresine gidip sözleşme adresimizi aratırsak, başarıyla dağıtıldığını görebilmeliyiz. Bu işlem biraz zaman alabileceğinden dolayı hemen göremezseniz lütfen biraz bekleyin. İşlem şunun gibi gözükecektir:

![İşlem adresinizi Etherscan'de görüntüleyin](./etherscan-sepoila-contract-creation.png)

`From` adresi MetaMask hesap adresinizle eşleşmeli ve `To` adresinde “Sözleşme Oluşturma” yazmalıdır. İşleme tıklarsak, Alıcı alanında sözleşme adresimizi görürüz:

![Sözleşme adresinizi Etherscan'de görüntüleyin](./etherscan-sepolia-tx-details.png)

Evet! NFT akıllı sözleşmenizi Ethereum (test ağı) zincirinde dağıttınız!

Perde arkasında neler olduğunu anlamak için [Alchemy gösterge panelimizdeki](https://dashboard.alchemyapi.io/explorer) Explorer sekmesine gidelim. Birden fazla Alchemy uygulamanız varsa, uygulamaya göre filtreleme yaptığınızdan ve "MyNFT"yi seçtiğinizden emin olun.

![Alchemy'nin Explorer Panosu ile “perde arkasında” yapılan çağrıları görüntüleyin](./alchemy-explorer-goerli.png)

Burada, .deploy() fonksiyonunu çağırdığımızda Hardhat/Ethers'in bizim için arka planda yaptığı birkaç JSON-RPC çağrısı göreceksiniz. Burada değinilmesi gereken iki önemli olanı şunlardır: akıllı sözleşmemizi Sepolia zincirine yazma isteği olan [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction) ve karma değeri verildiğinde işlemimiz hakkındaki bilgileri okuma isteği olan [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash) (işlem gönderirken tipik bir model). İşlem gönderme hakkında daha fazla bilgi edinmek için [Web3 kullanarak işlem gönderme](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) hakkındaki bu öğreticiye göz atın.

Bu öğreticinin 1. Bölümü bu kadardı. [2. Bölüm'de, bir NFT basarak akıllı sözleşmemizle gerçekten etkileşime gireceğiz](/developers/tutorials/how-to-mint-an-nft/) ve [3. Bölüm'de, NFT'nizi Ethereum cüzdanınızda nasıl görüntüleyeceğinizi göstereceğiz](/developers/tutorials/how-to-view-nft-in-metamask/)!
