---
title: "Yeni Başlayanlar İçin Merhaba Dünya Akıllı Sözleşmesi"
description: "Ethereum üzerinde basit bir akıllı sözleşme yazma ve dağıtma üzerine giriş niteliğinde eğitim."
author: "elanh"
tags:
  - solidity
  - hardhat
  - alchemy
  - akıllı sözleşmeler
  - dağıtım
skill: beginner
breadcrumb: "Merhaba Dünya sözleşmesi"
lang: tr
published: 2021-03-31
---

Blokzincir geliştirmeye yeniyseniz ve nereden başlayacağınızı bilmiyorsanız veya sadece akıllı sözleşmeleri nasıl dağıtacağınızı ve onlarla nasıl etkileşime gireceğinizi anlamak istiyorsanız, bu rehber tam size göre. Sanal bir cüzdan olan [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/) ve [Alchemy](https://www.alchemy.com/eth) kullanarak Sepolia test ağında basit bir akıllı sözleşme oluşturma ve dağıtma adımlarını inceleyeceğiz (bunların ne anlama geldiğini henüz anlamıyorsanız endişelenmeyin, açıklayacağız).

Bu eğitimin [2. bölümünde](/developers/tutorials/hello-world-smart-contract-fullstack/#part-2-interact-with-your-smart-contract), akıllı sözleşmemiz burada dağıtıldıktan sonra onunla nasıl etkileşime girebileceğimizi inceleyeceğiz ve [3. bölümünde](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan) onu Etherscan'de nasıl yayınlayacağımızı ele alacağız.

Herhangi bir noktada sorularınız olursa [Alchemy Discord](https://discord.gg/gWuC7zB) kanalından ulaşmaktan çekinmeyin!

## Adım 1: Ethereum ağına bağlanın {#step-1}

Ethereum zincirine istekte bulunmanın birçok yolu vardır. Basitlik adına, kendi düğümlerimizi çalıştırmak zorunda kalmadan Ethereum zinciriyle iletişim kurmamızı sağlayan bir blokzincir geliştirici platformu ve API'si olan Alchemy'de ücretsiz bir hesap kullanacağız. Platform ayrıca, akıllı sözleşme dağıtımımızın arka planında neler olup bittiğini anlamak için bu eğitimde yararlanacağımız izleme ve analiz için geliştirici araçlarına da sahiptir. Henüz bir Alchemy hesabınız yoksa, [buradan ücretsiz kaydolabilirsiniz](https://dashboard.alchemy.com/signup).

## Adım 2: Uygulamanızı (ve API anahtarınızı) oluşturun {#step-2}

Bir Alchemy hesabı oluşturduktan sonra, bir uygulama oluşturarak bir API anahtarı üretebilirsiniz. Bu, Sepolia test ağına istekte bulunmamızı sağlayacaktır. Test ağlarına aşina değilseniz, [bu sayfaya](/developers/docs/networks/) göz atın.

1.  Gezinme çubuğunda "Select an app" (Bir uygulama seç) seçeneğini belirleyip "Create new app" (Yeni uygulama oluştur) düğmesine tıklayarak Alchemy Kontrol Panelinizdeki "Create new app" sayfasına gidin.

![Hello world create app](./hello-world-create-app.png)

2. Uygulamanıza "Hello World" adını verin, kısa bir açıklama sunun ve bir kullanım senaryosu seçin, örn. "Infra & Tooling". Ardından, "Ethereum"u arayın ve ağı seçin.

![create app view hello world](./create-app-view-hello-world.png)

3. İlerlemek için "Next" (İleri) düğmesine, ardından "Create app" (Uygulama oluştur) düğmesine tıklayın ve işte bu kadar! Uygulamanız, kopyalanmaya hazır bir API Anahtarı ile birlikte gezinme çubuğu açılır menüsünde görünmelidir.

## Adım 3: Bir Ethereum hesabı (adresi) oluşturun {#step-3}

İşlemleri göndermek ve almak için bir Ethereum hesabına ihtiyacımız var. Bu eğitim için, Ethereum hesap adresinizi yönetmek için kullanılan tarayıcıdaki sanal bir cüzdan olan MetaMask'ı kullanacağız. [İşlemler](/developers/docs/transactions/) hakkında daha fazla bilgi.

MetaMask'ı indirebilir ve [buradan](https://metamask.io/download) ücretsiz olarak bir Ethereum hesabı oluşturabilirsiniz. Bir hesap oluştururken veya zaten bir hesabınız varsa, ağ açılır menüsünü kullanarak "Sepolia" test ağına geçtiğinizden emin olun (böylece gerçek parayla uğraşmamış oluruz).

Sepolia'nın listelendiğini görmüyorsanız, menüye, ardından Gelişmiş'e (Advanced) gidin ve "Test ağlarını göster" (Show test networks) seçeneğini açmak için aşağı kaydırın. Ağ seçim menüsünde, test ağlarının bir listesini bulmak için "Özel" (Custom) sekmesini seçin ve "Sepolia"yı seçin.

![metamask sepolia example](./metamask-sepolia-example.png)

## Adım 4: Bir musluktan ether ekleyin {#step-4}

Akıllı sözleşmemizi test ağına dağıtmak için biraz sahte ETH'ye ihtiyacımız olacak. Sepolia ETH almak için çeşitli muslukların bir listesini görüntülemek üzere [Sepolia ağ ayrıntılarına](/developers/docs/networks/#sepolia) gidebilirsiniz. Biri çalışmazsa, bazen kuruyabildikleri için diğerini deneyin. Ağ trafiği nedeniyle sahte ETH'nizi almanız biraz zaman alabilir. Kısa bir süre sonra MetaMask hesabınızda ETH görmelisiniz!

## Adım 5: Bakiyenizi Kontrol Edin {#step-5}

Bakiyemizin orada olduğunu iki kez kontrol etmek için, [Alchemy'nin composer aracını](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest) kullanarak bir [eth_getBalance](/developers/docs/apis/json-rpc/#eth_getbalance) isteği yapalım. Bu, cüzdanımızdaki ETH miktarını döndürecektir. MetaMask hesap adresinizi girip "Send Request" (İsteği Gönder) düğmesine tıkladıktan sonra şöyle bir yanıt görmelisiniz:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **NOT:** Bu sonuç ETH değil Wei cinsindendir. Wei, ether'in en küçük birimi olarak kullanılır. Wei'den ETH'ye dönüşüm şöyledir: 1 eth = 10<sup>18</sup> wei. Yani 0x2B5E3AF16B1880000 değerini ondalık sayıya çevirirsek 5\*10¹⁸ elde ederiz, bu da 5 ETH'ye eşittir.
>
> Oh be! Sahte paramızın hepsi orada <Emoji text=":money_mouth_face:" size={1} />.

## Adım 6: Projemizi başlatın {#step-6}

İlk olarak, projemiz için bir klasör oluşturmamız gerekecek. Komut satırınıza gidin ve şunu yazın:

```
mkdir hello-world
cd hello-world
```

Artık proje klasörümüzün içinde olduğumuza göre, projeyi başlatmak için `npm init` komutunu kullanacağız. Eğer npm henüz kurulu değilse, [Node.js kurulum talimatlarını](https://nodejs.org/en/download/) izleyin (bu eğitim için Node.js ve npm'e ihtiyacımız olacak).

```
npm init
```

Kurulum sorularını nasıl yanıtladığınız pek önemli değil, referans olması için biz şu şekilde yaptık:

```
package name: (hello-world)
version: (1.0.0)
description: hello world smart contract
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to /Users/.../.../.../hello-world/package.json:

{
  "name": "hello-world",
  "version": "1.0.0",
  "description": "hello world smart contract",
  "main": "index.js",
  "scripts": {
     "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

package.json dosyasını onaylayın ve artık hazırız!
## Adım 7: [Hardhat](https://hardhat.org/getting-started/#overview)'i İndirin {#step-7}

Hardhat, Ethereum yazılımınızı derlemek, dağıtmak, test etmek ve hatalarını ayıklamak için bir geliştirme ortamıdır. Geliştiricilere, canlı zincire dağıtmadan önce akıllı sözleşmeler ve merkeziyetsiz uygulamalar (dapp'ler) oluştururken yerel olarak yardımcı olur.

`hello-world` projemizin içinde şunu çalıştırın:

```
npm install --save-dev hardhat
```

[Kurulum talimatları](https://hardhat.org/getting-started/#overview) hakkında daha fazla ayrıntı için bu sayfaya göz atın.

## Adım 8: Hardhat projesi oluşturun {#step-8}

Proje klasörümüzün içinde şunu çalıştırın:

```
npx hardhat
```

Ardından bir karşılama mesajı ve ne yapmak istediğinizi seçme seçeneği görmelisiniz. "create an empty hardhat.config.js" seçeneğini belirleyin:

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍?

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Bu, bizim için projemizin tüm kurulumunu belirteceğimiz (13. adımda) bir `hardhat.config.js` dosyası oluşturacaktır.

## Adım 9: Proje klasörlerini ekleyin {#step-9}

Projemizi düzenli tutmak için iki yeni klasör oluşturacağız. Komut satırınızda projenizin kök dizinine gidin ve şunu yazın:

```
mkdir contracts
mkdir scripts
```

- `contracts/`, merhaba dünya akıllı sözleşme kod dosyamızı tutacağımız yerdir
- `scripts/`, sözleşmemizi dağıtmak ve onunla etkileşime girmek için komut dosyalarını tutacağımız yerdir

## Adım 10: Sözleşmemizi yazın {#step-10}

Kendi kendinize, ne zaman kod yazacağız diye soruyor olabilirsiniz?? İşte buradayız, 10. adımda.

hello-world projesini favori düzenleyicinizde açın (biz [VSCode](https://code.visualstudio.com/)'u seviyoruz). Akıllı sözleşmeler, HelloWorld.sol akıllı sözleşmemizi yazmak için kullanacağımız Solidity adlı bir dilde yazılır.‌

1.  "contracts" klasörüne gidin ve HelloWorld.sol adında yeni bir dosya oluşturun
2.  Aşağıda, bu eğitim için kullanacağımız Ethereum Vakfı'ndan örnek bir Merhaba Dünya akıllı sözleşmesi bulunmaktadır. Aşağıdaki içerikleri kopyalayıp HelloWorld.sol dosyanıza yapıştırın ve bu sözleşmenin ne yaptığını anlamak için yorumları okuduğunuzdan emin olun:

```solidity
// Anlamsal sürümleme kullanarak Solidity sürümünü belirtir.
// Daha fazla bilgi edinin: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// `HelloWorld` adında bir sözleşme tanımlar.
// Bir sözleşme, işlevlerin ve verilerin (durumunun) bir koleksiyonudur. Dağıtıldıktan sonra, bir sözleşme Ethereum Blokzinciri üzerinde belirli bir adreste bulunur. Daha fazla bilgi edinin: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // `string` türünde bir `message` durum değişkeni bildirir.
   // Durum değişkenleri, değerleri sözleşme depolamasında kalıcı olarak saklanan değişkenlerdir. `public` anahtar kelimesi, değişkenleri bir sözleşme dışından erişilebilir hale getirir ve diğer sözleşmelerin veya istemcilerin değere erişmek için çağırabileceği bir işlev oluşturur.
   string public message;

   // Sınıf tabanlı nesne yönelimli birçok dile benzer şekilde, kurucu (constructor), yalnızca sözleşme oluşturulduğunda yürütülen özel bir işlevdir.
   // Kurucular, sözleşmenin verilerini başlatmak için kullanılır. Daha fazla bilgi edinin:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Bir dize argümanı olan `initMessage` değerini kabul eder ve bu değeri sözleşmenin `message` depolama değişkenine atar).
      message = initMessage;
   }

   // Bir dize argümanı kabul eden ve `message` depolama değişkenini güncelleyen public bir işlev.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

Bu, oluşturulduğunda bir mesajı depolayan ve `update` işlevi çağrılarak güncellenebilen süper basit bir akıllı sözleşmedir.

## Adım 11: MetaMask ve Alchemy'yi projenize bağlayın {#step-11}

Bir MetaMask cüzdanı, Alchemy hesabı oluşturduk ve akıllı sözleşmemizi yazdık, şimdi bu üçünü birbirine bağlama zamanı.

Sanal cüzdanınızdan gönderilen her işlem, benzersiz özel anahtarınızı kullanarak bir imza gerektirir. Programımıza bu izni sağlamak için özel anahtarımızı (ve Alchemy API anahtarını) bir ortam dosyasında güvenle saklayabiliriz.

> İşlem gönderme hakkında daha fazla bilgi edinmek için, Web3 kullanarak işlem gönderme hakkındaki [bu eğitime](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) göz atın.

İlk olarak, proje dizininize dotenv paketini kurun:

```
npm install dotenv --save
```

Ardından, projemizin kök dizininde bir `.env` dosyası oluşturun ve MetaMask özel anahtarınızı ve HTTP Alchemy API URL'nizi buna ekleyin.

- Özel anahtarınızı dışa aktarmak için [bu talimatları](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) izleyin
- HTTP Alchemy API URL'sini almak için aşağıya bakın

![get alchemy api key](./get-alchemy-api-key.png)

Alchemy API URL'sini Kopyalayın

`.env` dosyanız şu şekilde görünmelidir:

```
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Bunları kodumuza fiilen bağlamak için, 13. adımda `hardhat.config.js` dosyamızda bu değişkenlere referans vereceğiz.

<Alert variant="warning">
<AlertContent>
<AlertDescription>
<code>.env</code> dosyasını işlemeyin (commit etmeyin)! Lütfen <code>.env</code> dosyanızı asla kimseyle paylaşmadığınızdan veya ifşa etmediğinizden emin olun, çünkü bunu yaparak sırlarınızı tehlikeye atmış olursunuz. Sürüm kontrolü kullanıyorsanız, <code>.env</code> dosyanızı bir <a href="https://git-scm.com/docs/gitignore">gitignore</a> dosyasına ekleyin.
</AlertDescription>
</AlertContent>
</Alert>

## Adım 12: Ethers.js'i Kurun {#step-12-install-ethersjs}

Ethers.js, [standart JSON-RPC yöntemlerini](/developers/docs/apis/json-rpc/) daha kullanıcı dostu yöntemlerle sararak Ethereum ile etkileşime girmeyi ve istekte bulunmayı kolaylaştıran bir kütüphanedir.

Hardhat, ek araçlar ve genişletilmiş işlevsellik için [Eklentileri](https://hardhat.org/plugins/) entegre etmeyi son derece kolaylaştırır. Sözleşme dağıtımı için [Ethers eklentisinden](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) yararlanacağız ([Ethers.js](https://github.com/ethers-io/ethers.js/) bazı süper temiz sözleşme dağıtım yöntemlerine sahiptir).

Proje dizininizde şunu yazın:

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

Bir sonraki adımda `hardhat.config.js` dosyamızda ethers'ı da gerektireceğiz.

## Adım 13: hardhat.config.js dosyasını güncelleyin {#step-13-update-hardhatconfigjs}

Şimdiye kadar birkaç bağımlılık ve eklenti ekledik, şimdi projemizin hepsinden haberdar olması için `hardhat.config.js` dosyasını güncellememiz gerekiyor.

`hardhat.config.js` dosyanızı şu şekilde görünecek biçimde güncelleyin:

```
require('dotenv').config();

require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;

/**
* @type import('hardhat/config').HardhatUserConfig
*/
module.exports = {
   solidity: "0.7.3",
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

## Adım 14: Sözleşmemizi derleyin {#step-14-compile-our-contracts}

Şimdiye kadar her şeyin çalıştığından emin olmak için sözleşmemizi derleyelim. `compile` görevi, yerleşik hardhat görevlerinden biridir.

Komut satırından şunu çalıştırın:

```
npx hardhat compile
```

`SPDX license identifier not provided in source file` hakkında bir uyarı alabilirsiniz, ancak bunun için endişelenmenize gerek yok — umarım diğer her şey iyi görünüyordur! Değilse, her zaman [Alchemy Discord](https://discord.gg/u72VCg3) kanalından mesaj atabilirsiniz.

## Adım 15: Dağıtım komut dosyamızı yazın {#step-15-write-our-deploy-scripts}

Artık sözleşmemiz yazıldığına ve yapılandırma dosyamız hazır olduğuna göre, sözleşme dağıtım komut dosyamızı yazma zamanı geldi.

`scripts/` klasörüne gidin ve `deploy.js` adında yeni bir dosya oluşturarak içine aşağıdaki içerikleri ekleyin:

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Dağıtımı başlatır, bir sözleşme nesnesine çözümlenen bir promise döndürür
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("Contract deployed to address:", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Hardhat, [Sözleşmeler eğitiminde](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) bu kod satırlarının her birinin ne yaptığını açıklamakta harika bir iş çıkarıyor, biz de onların açıklamalarını burada benimsedik.

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

Ethers.js'deki bir `ContractFactory`, yeni akıllı sözleşmeleri dağıtmak için kullanılan bir soyutlamadır, bu nedenle buradaki `HelloWorld`, merhaba dünya sözleşmemizin örnekleri için bir fabrikadır. `hardhat-ethers` eklentisini kullanırken `ContractFactory` ve `Contract` örnekleri varsayılan olarak ilk imzalayana bağlanır.

```
const hello_world = await HelloWorld.deploy();
```

Bir `ContractFactory` üzerinde `deploy()` çağırmak dağıtımı başlatacak ve bir `Contract` nesnesine çözümlenen bir `Promise` döndürecektir. Bu, akıllı sözleşme işlevlerimizin her biri için bir yöntemi olan nesnedir.

## Adım 16: Sözleşmemizi dağıtın {#step-16-deploy-our-contract}

Sonunda akıllı sözleşmemizi dağıtmaya hazırız! Komut satırına gidin ve şunu çalıştırın:

```
npx hardhat run scripts/deploy.js --network sepolia
```

Ardından şuna benzer bir şey görmelisiniz:

```
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

[Sepolia Etherscan](https://sepolia.etherscan.io/)'e gidip sözleşme adresimizi aratırsak, başarıyla dağıtıldığını görebilmeliyiz. İşlem şuna benzer görünecektir:

![etherscan contract](./etherscan-contract.png)

`From` adresi MetaMask hesap adresinizle eşleşmelidir ve Alıcı (To) adresi "Contract Creation" (Sözleşme Oluşturma) diyecektir, ancak işleme tıklarsak sözleşme adresimizi `To` alanında göreceğiz:

![etherscan transaction](./etherscan-transaction.png)

Tebrikler! Ethereum zincirine az önce bir akıllı sözleşme dağıttınız 🎉

Arka planda neler olup bittiğini anlamak için [Alchemy kontrol panelimizdeki](https://dashboard.alchemy.com/explorer) Explorer (Gezgin) sekmesine gidelim. Birden fazla Alchemy uygulamanız varsa, uygulamaya göre filtrelediğinizden ve "Hello World"ü seçtiğinizden emin olun.
![hello world explorer](./hello-world-explorer.png)

Burada, `.deploy()` işlevini çağırdığımızda Hardhat/Ethers'ın arka planda bizim için yaptığı bir avuç JSON-RPC çağrısını göreceksiniz. Burada belirtilmesi gereken iki önemli çağrı, sözleşmemizi fiilen Sepolia zincirine yazma isteği olan [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction) ve hash verildiğinde işlemimiz hakkındaki bilgileri okuma isteği olan [`eth_getTransactionByHash`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-by-hash)'dir (işlemlerde tipik bir modeldir). İşlem gönderme hakkında daha fazla bilgi edinmek için, [Web3 kullanarak işlem gönderme](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) hakkındaki bu eğitime göz atın.

Bu eğitimin 1. bölümü için bu kadar, 2. bölümde başlangıç mesajımızı güncelleyerek [akıllı sözleşmemizle fiilen etkileşime gireceğiz](/developers/tutorials/hello-world-smart-contract-fullstack/#part-2-interact-with-your-smart-contract) ve 3. bölümde herkesin onunla nasıl etkileşime gireceğini bilmesi için [akıllı sözleşmemizi Etherscan'de yayınlayacağız](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan).

**Alchemy hakkında daha fazla bilgi edinmek ister misiniz? [Web sitemize](https://www.alchemy.com/eth) göz atın. Hiçbir güncellemeyi kaçırmak istemiyor musunuz? [Buradan](https://www.alchemy.com/newsletter) bültenimize abone olun! Ayrıca [Discord](https://discord.gg/u72VCg3) kanalımıza da katıldığınızdan emin olun.**
