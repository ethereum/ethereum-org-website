---
title: "Yeni Başlayanlar İçin Merhaba Dünya Akıllı Sözleşmesi - Fullstack"
description: "Ethereum üzerinde basit bir akıllı sözleşme yazma ve dağıtma üzerine giriş niteliğinde eğitim."
author: "nstrike2"
breadcrumb: "Merhaba Dünya fullstack"
tags:
  [
    "Solidity",
    "Hardhat",
    "Alchemy",
    "akıllı sözleşmeler",
    "dağıtım",
    "blok gezgini",
    "ön yüz",
    "işlemler",
    "çerçeve",
  ]
skill: beginner
lang: tr
published: 2021-10-25
---

Blokzincir geliştirmeye yeniyseniz ve nereden başlayacağınızı veya akıllı sözleşmeleri nasıl dağıtacağınızı ve onlarla nasıl etkileşime gireceğinizi bilmiyorsanız, bu rehber tam size göre. [MetaMask](https://metamask.io), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org) ve [Alchemy](https://alchemy.com/eth) kullanarak Goerli test ağında basit bir akıllı sözleşme oluşturmayı ve dağıtmayı adım adım inceleyeceğiz.

Bu eğitimi tamamlamak için bir Alchemy hesabına ihtiyacınız olacak. [Ücretsiz bir hesap için kaydolun](https://www.alchemy.com/).

Herhangi bir noktada sorularınız olursa, [Alchemy Discord](https://discord.gg/gWuC7zB) üzerinden bize ulaşmaktan çekinmeyin!

## Bölüm 1 - Hardhat Kullanarak Akıllı Sözleşmenizi Oluşturun ve Dağıtın {#part-1}

### Ethereum ağına bağlanın {#connect-to-the-ethereum-network}

Ethereum zincirine istek yapmanın birçok yolu vardır. Basitlik adına, kendi başımıza bir düğüm çalıştırmadan Ethereum zinciriyle iletişim kurmamızı sağlayan bir Blokzincir geliştirici platformu ve API'si olan Alchemy'de ücretsiz bir hesap kullanacağız. Alchemy ayrıca izleme ve analitik için geliştirici araçlarına sahiptir; akıllı sözleşme dağıtımımızın arka planında neler olup bittiğini anlamak için bu eğitimde bunlardan yararlanacağız.

### Uygulamanızı ve API anahtarınızı oluşturun {#create-your-app-and-api-key}

Bir Alchemy hesabı oluşturduktan sonra, bir uygulama oluşturarak bir API anahtarı üretebilirsiniz. Bu, Goerli test ağına istek yapmanızı sağlayacaktır. Test ağlarına aşina değilseniz [Alchemy'nin ağ seçme kılavuzunu okuyabilirsiniz](https://www.alchemy.com/docs/choosing-a-web3-network).

Alchemy kontrol panelinde, gezinme çubuğundaki **Apps** (Uygulamalar) açılır menüsünü bulun ve **Create App** (Uygulama Oluştur) seçeneğine tıklayın.

![Hello world create app](./hello-world-create-app.png)

Uygulamanıza '_Hello World_' adını verin ve kısa bir açıklama yazın. Ortamınız olarak **Staging**'i ve ağınız olarak **Goerli**'yi seçin.

![create app view hello world](./create-app-view-hello-world.png)

_Not: **Goerli**'yi seçtiğinizden emin olun, aksi takdirde bu eğitim çalışmayacaktır._

**Create app** (Uygulama oluştur) düğmesine tıklayın. Uygulamanız aşağıdaki tabloda görünecektir.

### Bir Ethereum hesabı oluşturun {#create-an-ethereum-account}

İşlem göndermek ve almak için bir Ethereum hesabına ihtiyacınız var. Kullanıcıların Ethereum hesap adreslerini yönetmelerini sağlayan tarayıcı içi sanal bir cüzdan olan MetaMask'ı kullanacağız.

MetaMask'ı ücretsiz olarak indirebilir ve [buradan](https://metamask.io/download) bir hesap oluşturabilirsiniz. Bir hesap oluştururken veya zaten bir hesabınız varsa, sağ üstteki "Goerli Test Network" (Goerli Test Ağı) seçeneğine geçtiğinizden emin olun (böylece gerçek parayla işlem yapmamış oluruz).

### Adım 4: Bir Musluktan Ether Ekleyin {#step-4-add-ether-from-a-faucet}

Akıllı sözleşmenizi test ağına dağıtmak için biraz sahte ETH'ye ihtiyacınız olacak. Goerli ağında ETH almak için bir Goerli musluğuna gidin ve Goerli hesap adresinizi girin. Goerli musluklarının son zamanlarda biraz güvenilmez olabileceğini unutmayın - denenebilecek seçeneklerin bir listesi için [test ağları sayfasına](/developers/docs/networks/#goerli) bakın:

_Not: ağ yoğunluğu nedeniyle bu biraz zaman alabilir._
``

### Adım 5: Bakiyenizi Kontrol Edin {#step-5-check-your-balance}

ETH'nin cüzdanınızda olduğunu iki kez kontrol etmek için, [Alchemy'nin composer aracını](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) kullanarak bir [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) isteği yapalım. Bu, cüzdanımızdaki ETH miktarını döndürecektir. Daha fazlasını öğrenmek için [Alchemy'nin composer aracının nasıl kullanılacağına dair kısa eğitimine](https://youtu.be/r6sjRxBZJuU) göz atın.

MetaMask hesap adresinizi girin ve **Send Request** (İstek Gönder) düğmesine tıklayın. Aşağıdaki kod parçacığına benzeyen bir yanıt göreceksiniz.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _Not: Bu sonuç ETH değil, wei cinsindendir. Wei, Ether'in en küçük birimi olarak kullanılır._

Oh be! Sahte paramızın hepsi orada.

### Adım 6: Projemizi başlatalım {#step-6-initialize-our-project}

İlk olarak, projemiz için bir klasör oluşturmamız gerekecek. Komut satırınıza gidin ve aşağıdakileri girin.

```
mkdir hello-world
cd hello-world
```

Artık proje klasörümüzün içinde olduğumuza göre, projeyi başlatmak için `npm init` kullanacağız.

> Henüz npm yüklü değilse, [Node.js ve npm'i yüklemek için bu talimatları](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) izleyin.

Bu eğitimin amacı doğrultusunda, başlatma sorularını nasıl yanıtladığınız önemli değildir. Referans olması açısından biz şu şekilde yaptık:

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
      "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

package.json dosyasını onaylayın ve başlamaya hazırız!

### Adım 7: Hardhat'i İndirin {#step-7-download-hardhat}

Hardhat, Ethereum yazılımınızı derlemek, dağıtmak, test etmek ve hatalarını ayıklamak için bir geliştirme ortamıdır. Geliştiricilere, canlı zincire dağıtmadan önce yerel olarak akıllı sözleşmeler ve merkeziyetsiz uygulamalar (dapp) oluştururken yardımcı olur.

`hello-world` projemizin içinde şunu çalıştırın:

```
npm install --save-dev hardhat
```

[Kurulum talimatları](https://hardhat.org/getting-started/#overview) hakkında daha fazla ayrıntı için bu sayfaya göz atın.

### Adım 8: Hardhat projesi oluşturun {#step-8-create-hardhat-project}

`hello-world` proje klasörümüzün içinde şunu çalıştırın:

```
npx hardhat
```

Daha sonra bir karşılama mesajı ve ne yapmak istediğinizi seçme seçeneği görmelisiniz. "create an empty hardhat.config.js" (boş bir hardhat.config.js oluştur) seçeneğini seçin:

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Bu, projede bir `hardhat.config.js` dosyası oluşturacaktır. Bunu eğitimin ilerleyen kısımlarında projemizin kurulumunu belirtmek için kullanacağız.

### Adım 9: Proje klasörleri ekleyin {#step-9-add-project-folders}

Projeyi düzenli tutmak için iki yeni klasör oluşturalım. Komut satırında, `hello-world` projenizin kök dizinine gidin ve şunu yazın:

```
mkdir contracts
mkdir scripts
```

- `contracts/`, hello world akıllı sözleşme kod dosyamızı tutacağımız yerdir
- `scripts/`, sözleşmemizi dağıtmak ve onunla etkileşime girmek için komut dosyalarını tutacağımız yerdir

### Adım 10: Sözleşmemizi yazalım {#step-10-write-our-contract}

Kendi kendinize ne zaman kod yazacağız diye soruyor olabilirsiniz. Zamanı geldi!

Favori düzenleyicinizde hello-world projesini açın. Akıllı sözleşmeler en yaygın olarak, bizim de akıllı sözleşmemizi yazmak için kullanacağımız Solidity dilinde yazılır.‌

1. `contracts` klasörüne gidin ve `HelloWorld.sol` adında yeni bir dosya oluşturun
2. Aşağıda bu eğitim için kullanacağımız örnek bir Hello World akıllı sözleşmesi bulunmaktadır. Aşağıdaki içerikleri `HelloWorld.sol` dosyasına kopyalayın.

_Not: Bu sözleşmenin ne yaptığını anlamak için yorumları okuduğunuzdan emin olun._

```
// Anlamsal sürümleme kullanarak Solidity sürümünü belirtir.
// Daha fazla bilgi edinin: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// `HelloWorld` adında bir sözleşme tanımlar.
// Bir sözleşme, işlevlerin ve verilerin (durumunun) bir koleksiyonudur. Dağıtıldıktan sonra, bir sözleşme Ethereum Blokzinciri üzerinde belirli bir adreste bulunur. Daha fazla bilgi edinin: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // update işlevi çağrıldığında yayınlanır
   // Akıllı sözleşme olayları, sözleşmenizin Blokzinciri üzerinde bir şey olduğunu, belirli olayları 'dinleyebilen' ve bunlar gerçekleştiğinde harekete geçebilen uygulamanızın ön yüzüne iletmesinin bir yoludur.
   event UpdatedMessages(string oldStr, string newStr);

   // `string` türünde bir `message` durum değişkeni bildirir.
   // Durum değişkenleri, değerleri sözleşme depolamasında kalıcı olarak saklanan değişkenlerdir. `public` anahtar kelimesi, değişkenleri bir sözleşmenin dışından erişilebilir hale getirir ve diğer sözleşmelerin veya istemcilerin değere erişmek için çağırabileceği bir işlev oluşturur.
   string public message;

   // Sınıf tabanlı nesne yönelimli birçok dile benzer şekilde, bir kurucu (constructor), yalnızca sözleşme oluşturulduğunda yürütülen özel bir işlevdir.
   // Kurucular, sözleşmenin verilerini başlatmak için kullanılır. Daha fazla bilgi edinin: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Bir `initMessage` dize argümanını kabul eder ve değeri sözleşmenin `message` depolama değişkenine ayarlar).
      message = initMessage;
   }

   // Bir dize argümanını kabul eden ve `message` depolama değişkenini güncelleyen genel (public) bir işlev.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Bu, oluşturulduğunda bir mesajı saklayan temel bir akıllı sözleşmedir. `update` işlevi çağrılarak güncellenebilir.

### Adım 11: MetaMask ve Alchemy'yi projenize bağlayın {#step-11-connect-metamask-alchemy-to-your-project}

Bir MetaMask cüzdanı, Alchemy hesabı oluşturduk ve akıllı sözleşmemizi yazdık, şimdi bu üçünü birbirine bağlama zamanı.

Cüzdanınızdan gönderilen her işlem, benzersiz özel anahtarınızı kullanan bir imza gerektirir. Programımıza bu izni sağlamak için özel anahtarımızı bir ortam (environment) dosyasında güvenle saklayabiliriz. Ayrıca Alchemy için bir API anahtarını da burada saklayacağız.

> İşlem gönderme hakkında daha fazla bilgi edinmek için, Web3 kullanarak işlem gönderme hakkındaki [bu eğitime](https://www.alchemy.com/docs/hello-world-smart-contract#step-11-connect-metamask--alchemy-to-your-project) göz atın.

İlk olarak, proje dizininize dotenv paketini kurun:

```
npm install dotenv --save
```

Ardından, projenin kök dizininde bir `.env` dosyası oluşturun. MetaMask özel anahtarınızı ve HTTP Alchemy API URL'nizi buna ekleyin.

Ortam dosyanızın adı `.env` olmalıdır, aksi takdirde bir ortam dosyası olarak tanınmayacaktır.

`process.env` veya `.env-custom` veya başka bir isim vermeyin.

- Özel anahtarınızı dışa aktarmak için [bu talimatları](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) izleyin
- HTTP Alchemy API URL'sini almak için aşağıya bakın

![Animated walkthrough of getting an Alchemy API key](./get-alchemy-api-key.gif)

`.env` dosyanız şu şekilde görünmelidir:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Bunları kodumuza fiilen bağlamak için, 13. adımda `hardhat.config.js` dosyamızda bu değişkenlere referans vereceğiz.

### Adım 12: Ethers.js'yi Kurun {#step-12-install-ethersjs}

Ethers.js, [standart JSON-RPC yöntemlerini](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) daha kullanıcı dostu yöntemlerle sararak Ethereum ile etkileşime girmeyi ve istekte bulunmayı kolaylaştıran bir kütüphanedir.

Hardhat, ek araçlar ve genişletilmiş işlevsellik için [eklentileri](https://hardhat.org/plugins/) entegre etmemize olanak tanır. Sözleşme dağıtımı için [Ethers eklentisinden](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) yararlanacağız.

Proje dizininizde şunu yazın:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### Adım 13: hardhat.config.js dosyasını güncelleyin {#step-13-update-hardhat-configjs}

Şimdiye kadar birkaç bağımlılık ve eklenti ekledik, şimdi projemizin hepsinden haberdar olması için `hardhat.config.js` dosyasını güncellememiz gerekiyor.

`hardhat.config.js` dosyanızı şu şekilde görünecek biçimde güncelleyin:

```javascript
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")

const { API_URL, PRIVATE_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
}
```

### Adım 14: Sözleşmemizi derleyelim {#step-14-compile-our-contract}

Şimdiye kadar her şeyin çalıştığından emin olmak için sözleşmemizi derleyelim. `compile` görevi, yerleşik hardhat görevlerinden biridir.

Komut satırından şunu çalıştırın:

```bash
npx hardhat compile
```

`SPDX license identifier not provided in source file` hakkında bir uyarı alabilirsiniz, ancak bunun için endişelenmenize gerek yok — umarım diğer her şey iyi görünüyordur! Değilse, her zaman [Alchemy Discord](https://discord.gg/u72VCg3) kanalından mesaj atabilirsiniz.

### Adım 15: Dağıtım komut dosyamızı yazalım {#step-15-write-our-deploy-script}

Artık sözleşmemiz yazıldığına ve yapılandırma dosyamız hazır olduğuna göre, sözleşme dağıtım komut dosyamızı yazmanın zamanı geldi.

`scripts/` klasörüne gidin ve `deploy.js` adında yeni bir dosya oluşturarak içine aşağıdaki içerikleri ekleyin:

```javascript
async function main() {
  const HelloWorld = await ethers.getSözleşmeFactory("HelloWorld")

  // Dağıtımı başlatır, bir Sözleşme nesnesine çözümlenen bir promise döndürür
  const hello_world = await HelloWorld.deploy("Hello World!")
  console.log("Contract deployed to address:", hello_world.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat, [Sözleşmeler eğitiminde](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) bu kod satırlarının her birinin ne yaptığını açıklama konusunda harika bir iş çıkarıyor, biz de onların açıklamalarını buraya uyarladık.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

ethers.js'deki bir `ContractFactory`, yeni akıllı sözleşmeleri dağıtmak için kullanılan bir soyutlamadır, bu nedenle buradaki `HelloWorld`, hello world sözleşmemizin örnekleri için bir [fabrika](<https://en.wikipedia.org/wiki/Factory_(object-oriented_programming)>)'dır. `hardhat-ethers` eklentisi `ContractFactory` ve `Contract` kullanıldığında, örnekler varsayılan olarak ilk imzalayana (sahibine) bağlanır.

```javascript
const hello_world = await HelloWorld.deploy()
```

Bir `ContractFactory` üzerinde `deploy()` çağırmak dağıtımı başlatacak ve bir `Contract` nesnesine çözümlenen bir `Promise` döndürecektir. Bu, akıllı sözleşme işlevlerimizin her biri için bir yöntemi olan nesnedir.

### Adım 16: Sözleşmemizi dağıtalım {#step-16-deploy-our-contract}

Sonunda akıllı sözleşmemizi dağıtmaya hazırız! Komut satırına gidin ve şunu çalıştırın:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

Daha sonra şuna benzer bir şey görmelisiniz:

```bash
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**Lütfen bu adresi kaydedin**. Bunu eğitimin ilerleyen kısımlarında kullanacağız.

[Goerli Etherscan](https://goerli.etherscan.io)'e gider ve sözleşme adresimizi aratırsak, başarıyla dağıtıldığını görebilmeliyiz. İşlem şuna benzer görünecektir:

![](./etherscan-contract.png)

`From` adresi MetaMask hesap adresinizle eşleşmelidir ve `To` adresi **Contract Creation** (Sözleşme Oluşturma) diyecektir. İşleme tıklarsak, sözleşme adresimizi `To` alanında göreceğiz.

![](./etherscan-transaction.png)

Tebrikler! Az önce bir Ethereum test ağına bir akıllı sözleşme dağıttınız.

Arka planda neler olup bittiğini anlamak için [Alchemy kontrol panelimizdeki](https://dashboard.alchemy.com/explorer) Explorer (Gezgin) sekmesine gidelim. Birden fazla Alchemy uygulamanız varsa, uygulamaya göre filtrelediğinizden ve **Hello World**'ü seçtiğinizden emin olun.

![](./hello-world-explorer.png)

Burada, `.deploy()` işlevini çağırdığımızda Hardhat/Ethers'ın bizim için arka planda yaptığı bir avuç JSON-RPC yöntemini göreceksiniz. Buradaki iki önemli yöntem, sözleşmemizi Goerli zincirine yazma isteği olan [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction) ve hash değeri verilen işlemimiz hakkında bilgi okuma isteği olan [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash)'dir. İşlem gönderme hakkında daha fazla bilgi edinmek için, [Web3 kullanarak işlem gönderme hakkındaki eğitimimize](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) göz atın.

## Bölüm 2: Akıllı Sözleşmenizle Etkileşime Geçin {#part-2-interact-with-your-smart-contract}

Artık Goerli ağına başarılı bir şekilde bir akıllı sözleşme dağıttığımıza göre, onunla nasıl etkileşime geçeceğimizi öğrenelim.

### Bir interact.js dosyası oluşturun {#create-a-interactjs-file}

Bu, etkileşim betiğimizi yazacağımız dosyadır. Bölüm 1'de daha önce yüklediğiniz Ethers.js kütüphanesini kullanacağız.

`scripts/` klasörünün içinde `interact.js` adında yeni bir dosya oluşturun ve aşağıdaki kodu ekleyin:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### .env dosyanızı güncelleyin {#update-your-env-file}

Yeni ortam değişkenleri kullanacağız, bu yüzden onları [daha önce oluşturduğumuz](#step-11-connect-metamask-alchemy-to-your-project) `.env` dosyasında tanımlamamız gerekiyor.

Alchemy `API_KEY` değerimiz ve akıllı sözleşmenizin dağıtıldığı `CONTRACT_ADDRESS` için bir tanım eklememiz gerekecek.

`.env` dosyanız şuna benzer görünmelidir:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### Sözleşme ABI'nizi alın {#grab-your-contract-abi}

Sözleşme [ABI'miz (Uygulama İkili Arayüzü)](/glossary/#abi), akıllı sözleşmemizle etkileşime geçmek için kullanılan arayüzdür. Hardhat otomatik olarak bir ABI oluşturur ve bunu `HelloWorld.json` içine kaydeder. ABI'yi kullanmak için, `interact.js` dosyamıza aşağıdaki kod satırlarını ekleyerek içerikleri ayrıştırmamız gerekecek:

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

Eğer ABI'yi görmek isterseniz, konsolunuza yazdırabilirsiniz:

```javascript
console.log(JSON.stringify(contract.abi))
```

ABI'nizin konsola yazdırıldığını görmek için terminalinize gidin ve şunu çalıştırın:

```bash
npx hardhat run scripts/interact.js
```

### Sözleşmenizin bir örneğini oluşturun {#create-an-instance-of-your-contract}

Sözleşmemizle etkileşime geçmek için kodumuzda bir sözleşme örneği oluşturmamız gerekiyor. Bunu Ethers.js ile yapmak için üç kavramla çalışmamız gerekecek:

1. Sağlayıcı (Sağlayıcı) - size Blokzincir'e okuma ve yazma erişimi veren bir düğüm sağlayıcısı
2. İmzalayıcı (İmzalayıcı) - işlemleri imzalayabilen bir Ethereum hesabını temsil eder
3. Sözleşme (Contract) - zinciriçi dağıtılmış belirli bir sözleşmeyi temsil eden bir Ethers.js nesnesi

Sözleşmemizin örneğini oluşturmak için önceki adımdaki sözleşme ABI'sini kullanacağız:

```javascript
// interact.js

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// Contract
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```

Sağlayıcılar, İmzalayıcılar ve Sözleşmeler hakkında daha fazla bilgiyi [ethers.js belgelerinde](https://docs.ethers.io/v5/) bulabilirsiniz.

### Başlangıç mesajını okuyun {#read-the-init-message}

Sözleşmemizi `initMessage = "Hello world!"` ile dağıttığımızı hatırlıyor musunuz? Şimdi akıllı sözleşmemizde saklanan o mesajı okuyacağız ve konsola yazdıracağız.

JavaScript'te ağlarla etkileşime girerken asenkron fonksiyonlar kullanılır. Asenkron fonksiyonlar hakkında daha fazla bilgi edinmek için [bu Medium makalesini okuyun](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff).

Akıllı sözleşmemizdeki `message` fonksiyonunu çağırmak ve başlangıç mesajını okumak için aşağıdaki kodu kullanın:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)
}
main()
```

Terminalde `npx hardhat run scripts/interact.js` kullanarak dosyayı çalıştırdıktan sonra şu yanıtı görmeliyiz:

```
The message is: Hello world!
```

Tebrikler! Ethereum Blokzincir'inden akıllı sözleşme verilerini başarıyla okudunuz, harika iş çıkardınız!

### Mesajı güncelleyin {#update-the-message}

Sadece mesajı okumak yerine, `update` fonksiyonunu kullanarak akıllı sözleşmemizde kayıtlı olan mesajı da güncelleyebiliriz! Oldukça havalı, değil mi?

Mesajı güncellemek için, oluşturduğumuz Sözleşme nesnesi üzerinde doğrudan `update` fonksiyonunu çağırabiliriz:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("This is the new message.")
  await tx.wait()
}
main()
```

11. satırda, döndürülen işlem nesnesi üzerinde `.wait()` çağrısı yaptığımıza dikkat edin. Bu, betiğimizin fonksiyondan çıkmadan önce işlemin Blokzincir'de kazılmasını beklemesini sağlar. Eğer `.wait()` çağrısı dahil edilmezse, betik sözleşmedeki güncellenmiş `message` değerini göremeyebilir.

### Yeni mesajı okuyun {#read-the-new-message}

Güncellenmiş `message` değerini okumak için [önceki adımı](#read-the-init-message) tekrarlayabilmelisiniz. Bir dakikanızı ayırın ve bu yeni değeri yazdırmak için gerekli değişiklikleri yapıp yapamayacağınızı görün!

Eğer bir ipucuna ihtiyacınız varsa, bu noktada `interact.js` dosyanızın nasıl görünmesi gerektiği aşağıda verilmiştir:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")

// sağlayıcı - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// imzalayıcı - siz
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// Sözleşme örneği
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("this is the new message")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("The new message is: " + newMessage)
}

main()
```

Şimdi sadece betiği çalıştırın; eski mesajı, güncelleme durumunu ve yeni mesajı terminalinize yazdırılmış olarak görebilmelisiniz!

`npx hardhat run scripts/interact.js --network goerli`

```
The message is: Hello World!
Updating the message...
The new message is: This is the new message.
```

Bu betiği çalıştırırken, yeni mesaj yüklenmeden önce `Updating the message...` adımının yüklenmesinin biraz zaman aldığını fark edebilirsiniz. Bunun nedeni madencilik sürecidir; işlemlerin kazılırken nasıl takip edileceğini merak ediyorsanız, bir işlemin durumunu görmek için [Alchemy bellek havuzunu (mempool)](https://dashboard.alchemyapi.io/mempool) ziyaret edin. Eğer işlem düşerse, [Goerli Etherscan](https://goerli.etherscan.io)'i kontrol etmek ve işlem özetinizi (hash) aramak da faydalı olacaktır.

## Bölüm 3: Akıllı Sözleşmenizi Etherscan'de Yayınlayın {#part-3-publish-your-smart-contract-to-etherscan}

Akıllı sözleşmenizi hayata geçirmek için tüm zor işleri yaptınız; şimdi onu dünyayla paylaşma zamanı!

Akıllı sözleşmenizi Etherscan'de doğrulayarak, herkesin kaynak kodunuzu görüntülemesini ve akıllı sözleşmenizle etkileşime girmesini sağlayabilirsiniz. Hadi başlayalım!

### 1. Adım: Etherscan hesabınızda bir API Anahtarı oluşturun {#step-1-generate-an-api-key-on-your-etherscan-account}

Yayınlamaya çalıştığınız akıllı sözleşmenin size ait olduğunu doğrulamak için bir Etherscan API Anahtarı gereklidir.

Henüz bir Etherscan hesabınız yoksa, [bir hesap için kaydolun](https://etherscan.io/register).

Giriş yaptıktan sonra, gezinme çubuğunda kullanıcı adınızı bulun, üzerine gelin ve **My profile** düğmesini seçin.

Profil sayfanızda bir yan gezinme çubuğu görmelisiniz. Yan gezinme çubuğundan **API Keys**'i seçin. Ardından, yeni bir API anahtarı oluşturmak için "Add" düğmesine basın, uygulamanıza **hello-world** adını verin ve **Create New API Key** düğmesine basın.

Yeni API anahtarınız API anahtarı tablosunda görünmelidir. API anahtarını panonuza kopyalayın.

Ardından, Etherscan API anahtarını `.env` dosyamıza eklememiz gerekiyor.

Ekledikten sonra, `.env` dosyanız şu şekilde görünmelidir:

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### Hardhat ile dağıtılan akıllı sözleşmeler {#hardhat-deployed-smart-contracts}

#### hardhat-etherscan kurulumu {#install-hardhat-etherscan}

Sözleşmenizi Hardhat kullanarak Etherscan'de yayınlamak basittir. Başlamak için öncelikle `hardhat-etherscan` eklentisini kurmanız gerekecek. `hardhat-etherscan`, akıllı sözleşmenin kaynak kodunu ve ABI'sini Etherscan'de otomatik olarak doğrulayacaktır. Bunu eklemek için `hello-world` dizininde şunu çalıştırın:

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

Kurulduktan sonra, `hardhat.config.js` dosyanızın en üstüne aşağıdaki ifadeyi ekleyin ve Etherscan yapılandırma seçeneklerini ekleyin:

```javascript
// hardhat.config.js

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan")

const { API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    // Etherscan için API anahtarınız
    // https://etherscan.io/ adresinden bir tane edinin
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### Akıllı sözleşmenizi Etherscan'de doğrulayın {#verify-your-smart-contract-on-etherscan}

Tüm dosyaların kaydedildiğinden ve tüm `.env` değişkenlerinin doğru şekilde yapılandırıldığından emin olun.

Sözleşme adresini ve dağıtıldığı ağı ileterek `verify` görevini çalıştırın:

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

`DEPLOYED_CONTRACT_ADDRESS` değerinin Goerli test ağında dağıtılan akıllı sözleşmenizin adresi olduğundan emin olun. Ayrıca, son argüman (`'Hello World!'`), [1. bölümdeki dağıtım adımı sırasında](#step-15-write-our-deploy-script) kullanılan dize değeriyle aynı olmalıdır.

Her şey yolunda giderse, terminalinizde aşağıdaki mesajı göreceksiniz:

```text
Successfully submitted source code for contract
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
for verification on Etherscan. Waiting for verification result...


Successfully verified contract HelloWorld on Etherscan.
https://goerli.etherscan.io/address/<contract-address>#contracts
```

Tebrikler! Akıllı sözleşme kodunuz Etherscan'de!

### Akıllı sözleşmenizi Etherscan'de inceleyin! {#check-out-your-smart-contract-on-etherscan}

Terminalinizde sağlanan bağlantıya gittiğinizde, Etherscan'de yayınlanan akıllı sözleşme kodunuzu ve ABI'nizi görebilmelisiniz!

**Harika - başardın şampiyon! Artık herkes akıllı sözleşmenizi çağırabilir veya ona yazabilir! Bir sonraki adımda ne inşa edeceğinizi görmek için sabırsızlanıyoruz!**

## Bölüm 4 - Akıllı sözleşmenizi önyüz ile entegre etme {#part-4-integrating-your-smart-contract-with-the-frontend}

Bu eğitimin sonunda şunları nasıl yapacağınızı öğreneceksiniz:

- Bir MetaMask cüzdanını merkeziyetsiz uygulamanıza (dapp) bağlamak
- [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) API'sini kullanarak akıllı sözleşmenizden veri okumak
- MetaMask kullanarak Ethereum işlemlerini imzalamak

Bu dapp için önyüz çerçevemiz olarak [React](https://react.dev/) kullanacağız; ancak, çoğunlukla projemize Web3 işlevselliği kazandırmaya odaklanacağımız için temel prensiplerini açıklamaya çok fazla zaman ayırmayacağımızı belirtmek önemlidir.

Ön koşul olarak, başlangıç seviyesinde React bilgisine sahip olmalısınız. Eğer değilseniz, resmi [React'e Giriş eğitimini](https://react.dev/learn) tamamlamanızı öneririz.

### Başlangıç dosyalarını klonlayın {#clone-the-starter-files}

İlk olarak, bu projenin başlangıç dosyalarını almak için [hello-world-part-four GitHub deposuna](https://github.com/alchemyplatform/hello-world-part-four-tutorial) gidin ve bu depoyu yerel makinenize klonlayın.

Klonlanan depoyu yerel olarak açın. İki klasör içerdiğine dikkat edin: `starter-files` ve `completed`.

- `starter-files`- **bu dizinde çalışacağız**, kullanıcı arayüzünü (UI) Ethereum cüzdanınıza ve [Bölüm 3](#part-3-publish-your-smart-contract-to-etherscan)'te Etherscan'de yayınladığımız akıllı sözleşmeye bağlayacağız.
- `completed` tamamlanmış eğitimin tamamını içerir ve yalnızca takıldığınızda referans olarak kullanılmalıdır.

Ardından, `starter-files` kopyanızı favori kod düzenleyicinizde açın ve `src` klasörüne gidin.

Yazacağımız tüm kodlar `src` klasörü altında yer alacaktır. Projemize Web3 işlevselliği kazandırmak için `HelloWorld.js` bileşenini ve `util/interact.js` JavaScript dosyalarını düzenleyeceğiz.

### Başlangıç dosyalarını inceleyin {#check-out-the-starter-files}

Kodlamaya başlamadan önce, başlangıç dosyalarında bize nelerin sağlandığını inceleyelim.

#### React projenizi çalıştırın {#get-your-react-project-running}

React projesini tarayıcımızda çalıştırarak başlayalım. React'in güzelliği, projemizi tarayıcımızda çalıştırdıktan sonra, kaydettiğimiz tüm değişikliklerin tarayıcımızda canlı olarak güncellenmesidir.

Projenin çalışmasını sağlamak için `starter-files` klasörünün kök dizinine gidin ve projenin bağımlılıklarını yüklemek için terminalinizde `npm install` komutunu çalıştırın:

```bash
cd starter-files
npm install
```

Bunların yüklenmesi bittikten sonra terminalinizde `npm start` komutunu çalıştırın:

```bash
npm start
```

Bunu yaptığınızda tarayıcınızda projemizin önyüzünü göreceğiniz [http://localhost:3000/](http://localhost:3000/) adresi açılmalıdır. Bir alan (akıllı sözleşmenizde saklanan mesajı güncellemek için bir yer), bir "Connect Wallet" (Cüzdanı Bağla) düğmesi ve bir "Update" (Güncelle) düğmesinden oluşmalıdır.

Herhangi bir düğmeye tıklamayı denerseniz, çalışmadıklarını fark edeceksiniz; bunun nedeni, işlevlerini henüz programlamamış olmamızdır.

#### `HelloWorld.js` bileşeni {#the-helloworld-js-component}

Düzenleyicimizde `src` klasörüne geri dönelim ve `HelloWorld.js` dosyasını açalım. Üzerinde çalışacağımız birincil React bileşeni olduğu için bu dosyadaki her şeyi anlamamız son derece önemlidir.

Bu dosyanın en üstünde, React kütüphanesi, useEffect ve useState hook'ları, `./util/interact.js` dosyasından bazı öğeler (bunları yakında daha ayrıntılı olarak açıklayacağız!) ve Alchemy logosu dahil olmak üzere projemizi çalıştırmak için gerekli olan birkaç içe aktarma (import) ifadesi olduğunu fark edeceksiniz.

```javascript
// HelloWorld.js

import React from "react"
import { useEffect, useState } from "react"
import {
  helloWorldContract,
  connectWallet,
  updateMessage,
  loadCurrentMessage,
  getCurrentWalletConnected,
} from "./util/interact.js"

import alchemylogo from "./alchemylogo.svg"
```

Sırada, belirli olaylardan sonra güncelleyeceğimiz durum (state) değişkenlerimiz var.

```javascript
// HelloWorld.js

//Durum değişkenleri
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("No connection to the network.")
const [newMessage, setNewMessage] = useState("")
```

İşte değişkenlerin her birinin temsil ettiği şeyler:

- `walletAddress` - kullanıcının cüzdan adresini saklayan bir dize (string)
- `status` - kullanıcıya dapp ile nasıl etkileşime gireceği konusunda rehberlik eden yararlı bir mesajı saklayan bir dize
- `message` - akıllı sözleşmedeki mevcut mesajı saklayan bir dize
- `newMessage` - akıllı sözleşmeye yazılacak yeni mesajı saklayan bir dize

Durum değişkenlerinden sonra, henüz uygulanmamış beş işlev göreceksiniz: `useEffect`, `addSmartContractListener`, `addWalletListener`, `connectWalletPressed` ve `onUpdatePressed`. Aşağıda ne işe yaradıklarını açıklayacağız:

```javascript
// HelloWorld.js

//sadece bir kez çağrılır
useEffect(async () => {
  //TODO: uygula
}, [])

function addSmartContractListener() {
  //TODO: uygula
}

function addWalletListener() {
  //TODO: uygula
}

const connectWalletPressed = async () => {
  //TODO: uygula
}

const onUpdatePressed = async () => {
  //TODO: uygula
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - bu, bileşeniniz oluşturulduktan (render) sonra çağrılan bir React hook'udur. İçine boş bir dizi `[]` prop'u geçirildiği için (bkz. satır 4), yalnızca bileşenin _ilk_ oluşturulmasında çağrılacaktır. Burada akıllı sözleşmemizde saklanan mevcut mesajı yükleyeceğiz, akıllı sözleşme ve cüzdan dinleyicilerimizi çağıracağız ve bir cüzdanın zaten bağlı olup olmadığını yansıtmak için kullanıcı arayüzümüzü güncelleyeceğiz.
- `addSmartContractListener` - bu işlev, HelloWorld sözleşmemizin `UpdatedMessages` olayını izleyecek ve akıllı sözleşmemizde mesaj değiştirildiğinde kullanıcı arayüzümüzü güncelleyecek bir dinleyici kurar.
- `addWalletListener` - bu işlev, kullanıcının cüzdanının bağlantısını kesmesi veya adres değiştirmesi gibi kullanıcının MetaMask cüzdan durumundaki değişiklikleri algılayan bir dinleyici kurar.
- `connectWalletPressed` - bu işlev, kullanıcının MetaMask cüzdanını dapp'imize bağlamak için çağrılacaktır.
- `onUpdatePressed` - bu işlev, kullanıcı akıllı sözleşmede saklanan mesajı güncellemek istediğinde çağrılacaktır.

Bu dosyanın sonuna doğru, bileşenimizin kullanıcı arayüzü (UI) bulunmaktadır.

```javascript
// HelloWorld.js

//bileşenimizin kullanıcı arayüzü
return (
  <div id="container">
    <img id="logo" src={alchemylogo}></img>
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <h2 style={{ paddingTop: "50px" }}>Current Message:</h2>
    <p>{message}</p>

    <h2 style={{ paddingTop: "18px" }}>New Message:</h2>

    <div>
      <input
        type="text"
        placeholder="Update the message in your smart contract."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <p id="status">{status}</p>

      <button id="publishButton" onClick={onUpdatePressed}>
        Update
      </button>
 
</div>
 
</div>
)
```

Bu kodu dikkatlice incelerseniz, çeşitli durum değişkenlerimizi kullanıcı arayüzümüzde nerede kullandığımızı fark edeceksiniz:

- 6-12 satırlarında, kullanıcının cüzdanı bağlıysa (yani `walletAddress.length > 0`), "walletButton" kimliğine sahip düğmede kullanıcı `walletAddress` değerinin kısaltılmış bir sürümünü görüntüleriz; aksi takdirde sadece "Connect Wallet" (Cüzdanı Bağla) yazar.
- 17. satırda, `message` dizesinde yakalanan, akıllı sözleşmede saklanan mevcut mesajı görüntüleriz.
- 23-26 satırlarında, metin alanındaki girdi değiştiğinde `newMessage` durum değişkenimizi güncellemek için [kontrollü bir bileşen](https://legacy.reactjs.org/docs/forms.html#controlled-components) kullanırız.

Durum değişkenlerimize ek olarak, sırasıyla `publishButton` ve `walletButton` kimliklerine sahip düğmelere tıklandığında `connectWalletPressed` ve `onUpdatePressed` işlevlerinin çağrıldığını da göreceksiniz.

Son olarak, bu `HelloWorld.js` bileşeninin nereye eklendiğine değinelim.

React'te diğer tüm bileşenler için bir kapsayıcı görevi gören ana bileşen olan `App.js` dosyasına giderseniz, `HelloWorld.js` bileşenimizin 7. satırda enjekte edildiğini göreceksiniz.

Son olarak, sizin için sağlanan bir dosyayı daha, `interact.js` dosyasını inceleyelim.

#### `interact.js` dosyası {#the-interact-js-file}

[M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) paradigmasına uymak istediğimizden, dapp'imizin mantığını, verilerini ve kurallarını yönetmek için tüm işlevlerimizi içeren ayrı bir dosya isteyeceğiz ve ardından bu işlevleri önyüzümüze (`HelloWorld.js` bileşenimize) dışa aktarabileceğiz.

👆🏽`interact.js` dosyamızın tam olarak amacı budur!

`src` dizininizdeki `util` klasörüne gidin; tüm akıllı sözleşme etkileşimi ve cüzdan işlevlerimizi ve değişkenlerimizi içerecek `interact.js` adlı bir dosya eklediğimizi fark edeceksiniz.

```javascript
// interact.js

//export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

Dosyanın en üstünde `helloWorldContract` nesnesini yorum satırı haline getirdiğimizi fark edeceksiniz. Bu eğitimin ilerleyen kısımlarında, bu nesneyi yorum satırı olmaktan çıkaracağız ve akıllı sözleşmemizi bu değişkende örneklendireceğiz, ardından bunu `HelloWorld.js` bileşenimize dışa aktaracağız.

`helloWorldContract` nesnemizden sonraki uygulanmamış dört işlev şunları yapar:

- `loadCurrentMessage` - bu işlev, akıllı sözleşmede saklanan mevcut mesajı yükleme mantığını işler. [Alchemy Web3 API'sini](https://github.com/alchemyplatform/alchemy-web3) kullanarak Hello World akıllı sözleşmesine bir _okuma_ çağrısı yapacaktır.
- `connectWallet` - bu işlev, kullanıcının MetaMask'ini dapp'imize bağlayacaktır.
- `getCurrentWalletConnected` - bu işlev, sayfa yüklendiğinde dapp'imize zaten bağlı bir Ethereum hesabı olup olmadığını kontrol edecek ve kullanıcı arayüzümüzü buna göre güncelleyecektir.
- `updateMessage` - bu işlev, akıllı sözleşmede saklanan mesajı güncelleyecektir. Hello World akıllı sözleşmesine bir _yazma_ çağrısı yapacaktır, bu nedenle kullanıcının MetaMask cüzdanının mesajı güncellemek için bir Ethereum işlemini imzalaması gerekecektir.

Artık neyle çalıştığımızı anladığımıza göre, akıllı sözleşmemizden nasıl okuma yapacağımızı öğrenelim!

### Adım 3: Akıllı sözleşmenizden okuma yapın {#step-3-read-from-your-smart-contract}

Akıllı sözleşmenizden okuma yapmak için şunları başarıyla kurmanız gerekir:

- Ethereum zincirine bir API bağlantısı
- Akıllı sözleşmenizin yüklenmiş bir örneği
- Akıllı sözleşme işlevinize çağrı yapacak bir işlev
- Akıllı sözleşmeden okuduğunuz veriler değiştiğinde güncellemeleri izleyecek bir dinleyici

Bu çok fazla adım gibi gelebilir, ancak endişelenmeyin! Her birini nasıl yapacağınızı adım adım göstereceğiz! :\)

#### Ethereum zincirine bir API bağlantısı kurun {#establish-an-api-connection-to-the-ethereum-chain}

Bu eğitimin 2. Bölümünde [akıllı sözleşmemizden okuma yapmak için Alchemy Web3 anahtarımızı](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library) nasıl kullandığımızı hatırlıyor musunuz? Zincirden okuma yapmak için dapp'inizde de bir Alchemy Web3 anahtarına ihtiyacınız olacak.

Eğer henüz sahip değilseniz, ilk olarak `starter-files` klasörünüzün kök dizinine gidip terminalinizde aşağıdakini çalıştırarak [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)'ü yükleyin:

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3), [Web3.js](https://docs.web3js.org/) etrafında bir sarmalayıcıdır ve bir Web3 geliştiricisi olarak hayatınızı kolaylaştırmak için gelişmiş API yöntemleri ve diğer önemli avantajlar sağlar. Uygulamanızda hemen kullanmaya başlayabilmeniz için minimum yapılandırma gerektirecek şekilde tasarlanmıştır!

Ardından, API anahtarımızı aldıktan sonra saklayabileceğimiz güvenli bir yere sahip olmak için proje dizininize [dotenv](https://www.npmjs.com/package/dotenv) paketini yükleyin.

```text
npm install dotenv --save
```

Dapp'imiz için, HTTP API anahtarımız yerine **Websockets API anahtarımızı kullanacağız**, çünkü bu, akıllı sözleşmede saklanan mesajın ne zaman değiştiğini algılayan bir dinleyici kurmamıza olanak tanıyacaktır.

API anahtarınızı aldıktan sonra, kök dizininizde bir `.env` dosyası oluşturun ve Alchemy Websockets URL'nizi buna ekleyin. Sonrasında `.env` dosyanız şu şekilde görünmelidir:

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<anahtar>
```

Artık dapp'imizde Alchemy Web3 uç noktamızı kurmaya hazırız! `util` klasörümüzün içinde yer alan `interact.js` dosyamıza geri dönelim ve dosyanın en üstüne aşağıdaki kodu ekleyelim:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```

Yukarıda, ilk olarak `.env` dosyamızdan Alchemy anahtarını içe aktardık ve ardından Alchemy Web3 uç noktamızı kurmak için `alchemyKey` değerimizi `createAlchemyWeb3` işlevine geçirdik.

Bu uç nokta hazır olduğuna göre, akıllı sözleşmemizi yükleme zamanı geldi!

#### Hello World akıllı sözleşmenizi yükleme {#loading-your-hello-world-smart-contract}

Hello World akıllı sözleşmenizi yüklemek için sözleşme adresine ve ABI'sine ihtiyacınız olacak; [bu eğitimin 3. Bölümünü](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan) tamamladıysanız her ikisi de Etherscan'de bulunabilir.

#### Etherscan'den sözleşme ABI'nizi nasıl alırsınız {#how-to-get-your-contract-abi-from-etherscan}

Bu eğitimin 3. Bölümünü atladıysanız, [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code) adresine sahip HelloWorld sözleşmesini kullanabilirsiniz. ABI'si [burada](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code) bulunabilir.

Bir sözleşme ABI'si, bir sözleşmenin hangi işlevi çağıracağını belirlemek ve işlevin verileri beklediğiniz biçimde döndürmesini sağlamak için gereklidir. Sözleşme ABI'mizi kopyaladıktan sonra, onu `src` dizininize `contract-abi.json` adlı bir JSON dosyası olarak kaydedelim.

contract-abi.json dosyanız src klasörünüzde saklanmalıdır.

Sözleşme adresimiz, ABI'miz ve Alchemy Web3 uç noktamızla donanmış olarak, akıllı sözleşmemizin bir örneğini yüklemek için [sözleşme yöntemini](https://docs.web3js.org/api/web3-eth-contract/class/Contract) kullanabiliriz. Sözleşme ABI'nizi `interact.js` dosyasına içe aktarın ve sözleşme adresinizi ekleyin.

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

Artık nihayet `helloWorldContract` değişkenimizi yorum satırı olmaktan çıkarabilir ve AlchemyWeb3 uç noktamızı kullanarak akıllı sözleşmeyi yükleyebiliriz:

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

Özetlemek gerekirse, `interact.js` dosyanızın ilk 12 satırı artık şu şekilde görünmelidir:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"

export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

Sözleşmemizi yüklediğimize göre, artık `loadCurrentMessage` işlevimizi uygulayabiliriz!

#### `interact.js` dosyanızda `loadCurrentMessage` işlevini uygulama {#implementing-loadcurrentmessage-in-your-interact-js-file}

Bu işlev son derece basittir. Sözleşmemizden okuma yapmak için basit bir asenkron web3 çağrısı yapacağız. İşlevimiz akıllı sözleşmede saklanan mesajı döndürecektir:

`interact.js` dosyanızdaki `loadCurrentMessage` işlevini aşağıdaki gibi güncelleyin:

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

Bu akıllı sözleşmeyi kullanıcı arayüzümüzde görüntülemek istediğimizden, `HelloWorld.js` bileşenimizdeki `useEffect` işlevini aşağıdaki gibi güncelleyelim:

```javascript
// HelloWorld.js

//sadece bir kez çağrılır
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

Unutmayın, `loadCurrentMessage` işlevimizin yalnızca bileşenin ilk oluşturulması sırasında bir kez çağrılmasını istiyoruz. Akıllı sözleşmedeki mesaj değiştikten sonra kullanıcı arayüzünü otomatik olarak güncellemek için yakında `addSmartContractListener` işlevini uygulayacağız.

Dinleyicimize dalmadan önce, şu ana kadar elimizde ne olduğuna bir bakalım! `HelloWorld.js` ve `interact.js` dosyalarınızı kaydedin ve ardından [http://localhost:3000/](http://localhost:3000/) adresine gidin.

Mevcut mesajın artık "Ağa bağlantı yok" demediğini fark edeceksiniz. Bunun yerine akıllı sözleşmede saklanan mesajı yansıtıyor. Harika!

#### Kullanıcı arayüzünüz artık akıllı sözleşmede saklanan mesajı yansıtmalıdır {#your-ui-should-now-reflect-the-message-stored-in-the-smart-contract}

Şimdi o dinleyiciden bahsetmişken...

#### `addSmartContractListener` işlevini uygulayın {#implement-addsmartcontractlistener}

[Bu eğitim serisinin 1. Bölümünde](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract) yazdığımız `HelloWorld.sol` dosyasını hatırlarsanız, akıllı sözleşmemizin `update` işlevi çağrıldıktan sonra yayımlanan `UpdatedMessages` adlı bir akıllı sözleşme olayı olduğunu anımsayacaksınız (bkz. satır 9 ve 27):

```javascript
// HelloWorld.sol

// Anlamsal sürümleme kullanarak Solidity sürümünü belirtir.
// Daha fazla bilgi edinin: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// `HelloWorld` adında bir Sözleşme tanımlar.
// Bir Sözleşme, işlevlerin ve verilerin (durumunun) bir koleksiyonudur. Dağıtıldıktan sonra, bir Sözleşme Ethereum Blokzincir üzerinde belirli bir Adreste bulunur. Daha fazla bilgi edinin: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Güncelleme işlevi çağrıldığında yayınlanır
   //Akıllı sözleşme olayları, Sözleşmenizin Blokzincir üzerinde bir şey olduğunu uygulamanızın ön yüzüne iletmesinin bir yoludur; ön yüz belirli olayları 'dinleyebilir' ve gerçekleştiklerinde harekete geçebilir.
   event UpdatedMessages(string oldStr, string newStr);

   // `string` türünde bir `message` durum değişkeni bildirir.
   // Durum değişkenleri, değerleri Sözleşme deposunda kalıcı olarak saklanan değişkenlerdir. `public` anahtar kelimesi, değişkenleri bir Sözleşme dışından erişilebilir hale getirir ve diğer Sözleşmelerin veya istemcilerin değere erişmek için çağırabileceği bir işlev oluşturur.
   string public message;

   // Sınıf tabanlı nesne yönelimli birçok dile benzer şekilde, kurucu (constructor), yalnızca Sözleşme oluşturulduğunda yürütülen özel bir işlevdir.
   // Kurucular, Sözleşmenin verilerini başlatmak için kullanılır. Daha fazla bilgi edinin:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Bir dize argümanı olan `initMessage`ı kabul eder ve değeri Sözleşmenin `message` depolama değişkenine ayarlar).
      message = initMessage;
   }

   // Bir dize argümanı kabul eden ve `message` depolama değişkenini güncelleyen genel (public) bir işlev.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Akıllı sözleşme olayları, sözleşmenizin blokzincirde bir şeyin gerçekleştiğini (yani bir _olay_ olduğunu), belirli olayları 'dinleyebilen' ve bunlar gerçekleştiğinde harekete geçebilen önyüz uygulamanıza iletmesinin bir yoludur.

`addSmartContractListener` işlevi, özellikle Hello World akıllı sözleşmemizin `UpdatedMessages` olayını dinleyecek ve yeni mesajı görüntülemek için kullanıcı arayüzümüzü güncelleyecektir.

`addSmartContractListener` işlevini aşağıdaki gibi değiştirin:

```javascript
// HelloWorld.js

function addSmartContractListener() {
  helloWorldContract.events.UpdatedMessages({}, (error, data) => {
    if (error) {
      setStatus("😥 " + error.message)
    } else {
      setMessage(data.returnValues[1])
      setNewMessage("")
      setStatus("🎉 Your message has been updated!")
    }
  })
}
```

Dinleyici bir olayı algıladığında ne olduğunu inceleyelim:

- Olay yayımlandığında bir hata oluşursa, bu `status` durum değişkenimiz aracılığıyla kullanıcı arayüzüne yansıtılacaktır.
- Aksi takdirde, döndürülen `data` nesnesini kullanacağız. `data.returnValues`, dizideki ilk öğenin önceki mesajı ve ikinci öğenin güncellenmiş mesajı sakladığı sıfır indeksli bir dizidir. Sonuç olarak, başarılı bir olayda `message` dizemizi güncellenmiş mesaja ayarlayacağız, `newMessage` dizesini temizleyeceğiz ve akıllı sözleşmemizde yeni bir mesajın yayınlandığını yansıtmak için `status` durum değişkenimizi güncelleyeceğiz.

Son olarak, `HelloWorld.js` bileşeninin ilk oluşturulmasında başlatılması için dinleyicimizi `useEffect` işlevimizde çağıralım. Sonuç olarak, `useEffect` işleviniz şu şekilde görünmelidir:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

Artık akıllı sözleşmemizden okuma yapabildiğimize göre, ona nasıl yazacağımızı da öğrenmek harika olurdu! Ancak, dapp'imize yazmak için öncelikle ona bağlı bir Ethereum cüzdanımız olmalıdır.

Bu yüzden, bir sonraki adımda Ethereum cüzdanımızı (MetaMask) kurmayı ve ardından onu dapp'imize bağlamayı ele alacağız!

### Adım 4: Ethereum cüzdanınızı kurun {#step-4-set-up-your-ethereum-wallet}

Ethereum zincirine herhangi bir şey yazmak için kullanıcıların sanal cüzdanlarının özel anahtarlarını kullanarak işlemleri imzalaması gerekir. Bu eğitim için, son kullanıcı için bu işlem imzalama sürecini son derece kolaylaştırdığından, Ethereum hesap adresinizi yönetmek için kullanılan tarayıcıdaki sanal bir cüzdan olan [MetaMask](https://metamask.io/)'ı kullanacağız.

Ethereum'daki işlemlerin nasıl çalıştığı hakkında daha fazla bilgi edinmek istiyorsanız, Ethereum Vakfı'nın [bu sayfasına](/developers/docs/transactions/) göz atın.

#### MetaMask'ı İndirin {#download-metamask}

[Buradan](https://metamask.io/download) ücretsiz olarak MetaMask'ı indirebilir ve bir hesap oluşturabilirsiniz. Bir hesap oluştururken veya zaten bir hesabınız varsa, sağ üstteki "Goerli Test Network" (Goerli Test Ağı) seçeneğine geçtiğinizden emin olun (böylece gerçek parayla işlem yapmamış oluruz).

#### Bir Musluktan (Faucet) Ether Ekleyin {#add-ether-from-a-faucet}

Ethereum blokzincirinde bir işlemi imzalamak için biraz sahte ETH'ye ihtiyacımız olacak. ETH almak için [FaucETH](https://fauceth.komputing.org)'e gidebilir ve Goerli hesap adresinizi girebilir, "Request funds" (Fon talep et) seçeneğine tıklayabilir, ardından açılır menüden "Ethereum Testnet Goerli"yi seçebilir ve son olarak tekrar "Request funds" düğmesine tıklayabilirsiniz. Kısa bir süre sonra MetaMask hesabınızda ETH görmelisiniz!

#### Bakiyenizi Kontrol Edin {#check-your-balance}

Bakiyemizin orada olduğunu iki kez kontrol etmek için, [Alchemy'nin oluşturucu aracını](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) kullanarak bir [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) isteği yapalım. Bu, cüzdanımızdaki ETH miktarını döndürecektir. MetaMask hesap adresinizi girip "Send Request" (İstek Gönder) düğmesine tıkladıktan sonra şöyle bir yanıt görmelisiniz:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**NOT:** Bu sonuç ETH değil, wei cinsindendir. Wei, Ether'in en küçük birimi olarak kullanılır. Wei'den ETH'ye dönüşüm şöyledir: 1 ETH = 10¹⁸ wei. Yani 0xde0b6b3a7640000 değerini ondalık sayıya çevirirsek 1\*10¹⁸ elde ederiz, bu da 1 ETH'ye eşittir.

Oh be! Sahte paramızın hepsi orada! 🤑

### Adım 5: MetaMask'ı Kullanıcı Arayüzünüze Bağlayın {#step-5-connect-metamask-to-your-ui}

MetaMask cüzdanımız kurulduğuna göre, dapp'imizi ona bağlayalım!

#### `connectWallet` işlevi {#the-connectwallet-function}

`interact.js` dosyamızda, daha sonra `HelloWorld.js` bileşenimizde çağırabileceğimiz `connectWallet` işlevini uygulayalım.

`connectWallet` işlevini aşağıdaki gibi değiştirelim:

```javascript
// interact.js

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Peki bu devasa kod bloğu tam olarak ne yapıyor?

Öncelikle, tarayıcınızda `window.ethereum` nesnesinin etkin olup olmadığını kontrol eder.

`window.ethereum`, MetaMask ve diğer cüzdan sağlayıcıları tarafından enjekte edilen ve web sitelerinin kullanıcıların Ethereum hesaplarını talep etmesine olanak tanıyan küresel bir API'dir. Onaylanırsa, kullanıcının bağlı olduğu blokzincirlerden veri okuyabilir ve kullanıcının mesajları ve işlemleri imzalamasını önerebilir. Daha fazla bilgi için [MetaMask belgelerine](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) göz atın!

Eğer `window.ethereum` mevcut _değilse_, bu MetaMask'ın yüklü olmadığı anlamına gelir. Bu, döndürülen `address` değerinin boş bir dize olduğu ve `status` JSX nesnesinin kullanıcının MetaMask'ı yüklemesi gerektiğini ilettiği bir JSON nesnesinin döndürülmesiyle sonuçlanır.

Şimdi, eğer `window.ethereum` mevcut _ise_, işte o zaman işler ilginçleşir.

Bir try/catch döngüsü kullanarak, [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts) çağrısı yaparak MetaMask'a bağlanmayı deneyeceğiz. Bu işlevi çağırmak tarayıcıda MetaMask'ı açacak ve kullanıcıdan cüzdanını dapp'inize bağlaması istenecektir.

- Kullanıcı bağlanmayı seçerse, `method: "eth_requestAccounts"`, kullanıcının dapp'e bağlanan tüm hesap adreslerini içeren bir dizi döndürecektir. Sonuç olarak, `connectWallet` işlevimiz, bu dizideki _ilk_ `address` değerini (bkz. satır 9) ve kullanıcıdan akıllı sözleşmeye bir mesaj yazmasını isteyen bir `status` mesajını içeren bir JSON nesnesi döndürecektir.
- Kullanıcı bağlantıyı reddederse, JSON nesnesi döndürülen `address` için boş bir dize ve kullanıcının bağlantıyı reddettiğini yansıtan bir `status` mesajı içerecektir.

Bu `connectWallet` işlevini yazdığımıza göre, bir sonraki adım onu `HelloWorld.js` bileşenimizde çağırmaktır.

#### `connectWallet` işlevini `HelloWorld.js` Kullanıcı Arayüzü Bileşeninize Ekleyin {#add-the-connectwallet-function-to-your-helloworld-js-ui-component}

`HelloWorld.js` içindeki `connectWalletPressed` işlevine gidin ve onu aşağıdaki gibi güncelleyin:

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

İşlevselliğimizin çoğunun `interact.js` dosyasından `HelloWorld.js` bileşenimizden nasıl soyutlandığına dikkat ettiniz mi? Bu, M-V-C paradigmasına uymamız içindir!

`connectWalletPressed` içinde, içe aktarılan `connectWallet` işlevimize basitçe bir await çağrısı yaparız ve yanıtını kullanarak `status` ve `walletAddress` değişkenlerimizi durum hook'ları aracılığıyla güncelleriz.

Şimdi, her iki dosyayı da (`HelloWorld.js` ve `interact.js`) kaydedelim ve şu ana kadarki kullanıcı arayüzümüzü test edelim.

Tarayıcınızı [http://localhost:3000/](http://localhost:3000/) sayfasında açın ve sayfanın sağ üst köşesindeki "Connect Wallet" (Cüzdanı Bağla) düğmesine basın.

MetaMask yüklüyse, cüzdanınızı dapp'inize bağlamanız istenecektir. Bağlanma davetini kabul edin.

Cüzdan düğmesinin artık adresinizin bağlı olduğunu yansıttığını görmelisiniz! Eveeeet 🔥

Ardından, sayfayı yenilemeyi deneyin... bu garip. Cüzdan düğmemiz, zaten bağlı olmasına rağmen bizden MetaMask'ı bağlamamızı istiyor...

Ancak korkmayın! Bir adresin dapp'imize zaten bağlı olup olmadığını kontrol edecek ve kullanıcı arayüzümüzü buna göre güncelleyecek olan `getCurrentWalletConnected` işlevini uygulayarak bunu kolayca çözebiliriz!

#### `getCurrentWalletConnected` işlevi {#the-getcurrentwalletconnected-function}

`interact.js` dosyasındaki `getCurrentWalletConnected` işlevinizi aşağıdaki gibi güncelleyin:

```javascript
// interact.js

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Bu kod, bir önceki adımda yazdığımız `connectWallet` işlevine _çok_ benzer.

Temel fark, kullanıcının cüzdanını bağlaması için MetaMask'ı açan `eth_requestAccounts` yöntemini çağırmak yerine, burada basitçe şu anda dapp'imize bağlı olan MetaMask adreslerini içeren bir dizi döndüren `eth_accounts` yöntemini çağırmamızdır.

Bu işlevi çalışırken görmek için, onu `HelloWorld.js` bileşenimizin `useEffect` işlevinde çağıralım:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

`walletAddress` ve `status` durum değişkenlerimizi güncellemek için `getCurrentWalletConnected` çağrımızın yanıtını kullandığımıza dikkat edin.

Bu kodu eklediğinize göre, tarayıcı penceremizi yenilemeyi deneyelim.

Harikaaaa! Düğme bağlı olduğunuzu söylemeli ve yeniledikten sonra bile bağlı cüzdanınızın adresinin bir önizlemesini göstermelidir!

#### `addWalletListener` işlevini uygulayın {#implement-addwalletlistener}

Dapp cüzdan kurulumumuzdaki son adım, kullanıcının bağlantıyı kesmesi veya hesap değiştirmesi gibi cüzdanımızın durumu değiştiğinde kullanıcı arayüzümüzün güncellenmesi için cüzdan dinleyicisini uygulamaktır.

`HelloWorld.js` dosyanızda, `addWalletListener` işlevinizi aşağıdaki gibi değiştirin:

```javascript
// HelloWorld.js

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

Eminim bu noktada burada neler olup bittiğini anlamak için yardımımıza bile ihtiyacınız yoktur, ancak eksiksiz olması adına hızlıca inceleyelim:

- İlk olarak, işlevimiz `window.ethereum` nesnesinin etkin olup olmadığını (yani MetaMask'ın yüklü olup olmadığını) kontrol eder.
  - Eğer değilse, `status` durum değişkenimizi kullanıcıdan MetaMask'ı yüklemesini isteyen bir JSX dizesine ayarlarız.
  - Etkinse, 3. satırda kullanıcının dapp'e ek bir hesap bağlaması, hesap değiştirmesi veya bir hesabın bağlantısını kesmesi gibi MetaMask cüzdanındaki durum değişikliklerini dinleyen `window.ethereum.on("accountsChanged")` dinleyicisini kurarız. Bağlı en az bir hesap varsa, `walletAddress` durum değişkeni, dinleyici tarafından döndürülen `accounts` dizisindeki ilk hesap olarak güncellenir. Aksi takdirde, `walletAddress` boş bir dize olarak ayarlanır.

Son olarak, onu `useEffect` işlevimizde çağırmalıyız:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

Ve işte bu kadar! Tüm cüzdan işlevselliğimizi programlamayı başarıyla tamamladık! Şimdi son görevimize geçelim: akıllı sözleşmemizde saklanan mesajı güncellemek!

### Adım 6: `updateMessage` işlevini uygulayın {#step-6-implement-the-updatemessage-function}

Pekala millet, son düzlüğe geldik! `interact.js` dosyanızın `updateMessage` işlevinde şunları yapacağız:

1. Akıllı sözleşmemizde yayınlamak istediğimiz mesajın geçerli olduğundan emin olmak
2. MetaMask kullanarak işlemimizi imzalamak
3. Bu işlevi `HelloWorld.js` önyüz bileşenimizden çağırmak

Bu çok uzun sürmeyecek; hadi bu dapp'i bitirelim!

#### Girdi hatası işleme {#input-error-handling}

Doğal olarak, işlevin başında bir tür girdi hatası işleme mekanizmasına sahip olmak mantıklıdır.

MetaMask uzantısı yüklü değilse, bağlı bir cüzdan yoksa (yani geçirilen `address` boş bir dizeyse) veya `message` boş bir dizeyse işlevimizin erken dönmesini isteyeceğiz. `updateMessage` işlevine aşağıdaki hata işleme kodunu ekleyelim:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }
}
```

Artık uygun bir girdi hatası işleme mekanizmasına sahip olduğuna göre, işlemi MetaMask aracılığıyla imzalama zamanı geldi!

#### İşlemimizi imzalama {#signing-our-transaction}

Geleneksel web3 Ethereum işlemlerine zaten aşinaysanız, bir sonraki yazacağımız kod çok tanıdık gelecektir. Girdi hatası işleme kodunuzun altına, `updateMessage` işlevine aşağıdakini ekleyin:

```javascript
// interact.js

//işlem parametrelerini ayarla
const transactionParameters = {
  to: contractAddress, // Sözleşme yayınları dışında gereklidir.
  from: address, // kullanıcının aktif Adresi ile eşleşmelidir.
  data: helloWorldContract.methods.update(message).encodeABI(),
}

//işlemi imzala
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    status: (
      <span>
        ✅{" "}
        <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
          View the status of your transaction on Etherscan!
        </a>
        <br />
        ℹ️ Once the transaction is verified by the network, the message will be
        updated automatically.
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```

Neler olduğunu inceleyelim. İlk olarak, işlem parametrelerimizi ayarlıyoruz, burada:

- `to` alıcı adresini (akıllı sözleşmemizi) belirtir
- `from` işlemin imzalayıcısını, işlevimize geçirdiğimiz `address` değişkenini belirtir
- `data`, `message` dize değişkenimizi girdi olarak alan Hello World akıllı sözleşmemizin `update` yöntemine yapılan çağrıyı içerir

Ardından, MetaMask'tan işlemi imzalamasını istediğimiz bir await çağrısı olan `window.ethereum.request` çağrısını yaparız. 11. ve 12. satırlarda eth yöntemimiz olan `eth_sendTransaction` yöntemini belirttiğimize ve `transactionParameters` parametremizi geçirdiğimize dikkat edin.

Bu noktada, tarayıcıda MetaMask açılacak ve kullanıcıdan işlemi imzalamasını veya reddetmesini isteyecektir.

- İşlem başarılı olursa, işlev, `status` JSX dizesinin kullanıcıdan işlemi hakkında daha fazla bilgi için Etherscan'i kontrol etmesini istediği bir JSON nesnesi döndürecektir.
- İşlem başarısız olursa, işlev, `status` dizesinin hata mesajını ilettiği bir JSON nesnesi döndürecektir.

Sonuç olarak, `updateMessage` işlevimiz şu şekilde görünmelidir:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //girdi hatası işleme
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }

  //işlem parametrelerini ayarla
  const transactionParameters = {
    to: contractAddress, // Sözleşme yayınları dışında gereklidir.
    from: address, // kullanıcının aktif Adresi ile eşleşmelidir.
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  //işlemi imzala
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      ),
    }
  } catch (error) {
    return {
      status: "😥 " + error.message,
    }
  }
}
```

Son olarak, `updateMessage` işlevimizi `HelloWorld.js` bileşenimize bağlamamız gerekiyor.

#### `updateMessage` işlevini `HelloWorld.js` önyüzüne bağlayın {#connect-updatemessage-to-the-helloworld-js-frontend}

`onUpdatePressed` işlevimiz, içe aktarılan `updateMessage` işlevine bir await çağrısı yapmalı ve işlemimizin başarılı olup olmadığını yansıtmak için `status` durum değişkenini değiştirmelidir:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

Son derece temiz ve basit. Ve bilin bakalım ne oldu... DAPP'İNİZ TAMAMLANDI!!!

Devam edin ve **Update** (Güncelle) düğmesini test edin!

### Kendi özel dapp'inizi yapın {#make-your-own-custom-dapp}

Vay canına, eğitimin sonuna geldiniz! Özetlemek gerekirse, şunları nasıl yapacağınızı öğrendiniz:

- Dapp projenize bir MetaMask cüzdanı bağlamak
- [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) API'sini kullanarak akıllı sözleşmenizden veri okumak
- MetaMask kullanarak Ethereum işlemlerini imzalamak

Artık kendi özel dapp projenizi oluşturmak için bu eğitimdeki becerileri uygulamak üzere tam donanımlısınız! Her zaman olduğu gibi, herhangi bir sorunuz varsa, yardım için [Alchemy Discord](https://discord.gg/gWuC7zB) üzerinden bize ulaşmaktan çekinmeyin. 🧙‍♂️

Bu eğitimi tamamladığınızda, Twitter'da [@alchemyplatform](https://twitter.com/AlchemyPlatform) hesabımızı etiketleyerek deneyiminizin nasıl olduğunu veya herhangi bir geri bildiriminiz olup olmadığını bize bildirin!