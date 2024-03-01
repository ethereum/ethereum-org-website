---
title: Yeni Başlayanlar İçin Merhaba Dünya Akıllı Sözleşmesi - FullStack
description: Ethereum üzerinde basit bir akıllı sözleşme yazma ve dağıtmaya yönelik giriş seviyesinde öğretici.
author: "nstrike2"
tags:
  - "solidity"
  - "hardhat"
  - "alchemy"
  - "akıllı sözleşmeler"
  - "dağıtma"
  - "blok bulucu"
  - "ön yüz"
  - "İşlemler"
skill: beginner
lang: tr
published: 2021-10-25
---

Bu rehber, blokzincir geliştirme konusunda yeniyseniz, nereden başlayacağınızı bilmiyorsanız veya akıllı sözleşmeleri nasıl dağıtacağınızı ya da onlarla nasıl etkileşim kuracağınızı bilmiyorsanız tam size göre. Size, Goerli test ağında [MetaMask](https://metamask.io), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org) ve [Alchemy](https://alchemyapi.io/eth)'yi kullanarak basit bir akıllı sözleşme oluşturmayı ve dağıtmayı öğreteceğiz.

Bu öğreticiyi tamamlamak için bir Alchemy hesabına ihtiyacınız olacak. [Ücretsiz bir hesap açmak için kaydolun](https://www.alchemy.com/).

Herhangi bir noktada sorunuz olursa, [Alchemy Discord](https://discord.gg/gWuC7zB)'unu ziyaret etmekten çekinmeyin!

## 1. Bölüm - Hardhat Kullanarak Akıllı Sözleşmenizi Oluşturma ve Dağıtma {#part-1}

### Ethereum ağına bağlanın {#connect-to-the-ethereum-network}

Ethereum zincirine istek göndermenin birçok yolu vardır. Kolay anlaşılabilmesi için düğümü kendimiz çalıştırmadan Ethereum zinciriyle bağlantı kurabilmemize olanak tanıyan bir blokzincir geliştirme platformu ve API'si olan Alchemy'de açtığımız ücretsiz bir hesabı kullanacağız. Alchemy ayrıca, akıllı sözleşme dağıtımımızda arka planda neler olup bittiğini anlamak için bu öğreticide yararlanacağımız izleme ve analitiğe yönelik geliştirici araçlarına sahiptir.

### Uygulamanızı ve API anahtarınızı oluşturun {#create-your-app-and-api-key}

Bir Alchemy hesabı oluşturduktan sonra, bir uygulama yaratarak bir API anahtarı oluşturabilirsiniz. Bu Goerli test ağına taleplerde bulunmanızı sağlayacaktır. Test ağlarıyla ilgili pek bilginiz yoksa [Alchemy'nin ağ seçme rehberini okuyabilirsiniz](https://docs.alchemyapi.io/guides/choosing-a-network).

Alchemy'nin sayfasında **Uygulamalar** seçeneğini bulun ve aşağı inip **Uygulama Oluştur**'a tıklayın.

![Merhaba dünya uygulama oluşturma](./hello-world-create-app.png)

Uygulamanıza "_Merhaba Dünya_" ismini verin ve kısa bir açıklama yazın. Ortam olarak **Hazırlama**'yı ve ağ olarak da **Goerli**'yi seçin.

![merhaba dünya görüntüleme uygulamasını oluşturma](./create-app-view-hello-world.png)

_Not: **Goerli**'yi seçmezseniz bu öğretici çalışmaz._

**Uygulama oluştur**'a tıklayın. Uygulamanız aşağıdaki tabloda görünecektir.

### Bir Ethereum hesabı oluşturun {#create-an-ethereum-account}

İşlem göndermek ve almak için bir Ethereum hesabına ihtiyacınız vardır. Kullanıcıların Ethereum hesap adreslerini yönetmelerini sağlayan bir sanal tarayıcı cüzdanı olan MetaMask'i kullanacağız.

[Buradan](https://metamask.io/download.html) ücretsiz olarak bir MetaMask hesabı indirebilir ve oluşturabilirsiniz. Bir hesap oluştururken ya da zaten bir hesabınız varsa, sağ üstten "Goerli Test Ağına" geçin (bu sayede gerçek parayla denemeler yapmayız).

### Adım 4: Bir Musluktan ether ekleyin {#step-4-add-ether-from-a-faucet}

Akıllı sözleşmenizi test ağına dağıtmak için biraz sahte ETH'ye ihtiyacınız olacak. Goerli ağında ETH alabilmek için bir Goerli musluğuna gidin ve Goerli hesabınızın adresini girin. Goerli musluklarının son zamanlarda biraz güvenilmez olduğunu da dikkate alın; [test ağları sayfası](/developers/docs/networks/#goerli)'ndan denenebilecek seçeneklerin listesine göz atın:

_Not: Ağ sıkışıklığı sebebiyle bu biraz zaman alabilir._ ``

### Adım 5: Bakiyenizi kontrol edin {#step-5-check-your-balance}

ETH'nin cüzdanınızda olduğundan emin olmak için [Alchemy'nin derleyici aracını](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) kullanarak bir [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) isteği oluşturalım. Bu, cüzdanımızdaki ETH miktarını döndürür. Daha fazla bilgi edinmek için [Alchemy'nin derleyici aracını kullanma hakkındaki kısa öğreticisine](https://youtu.be/r6sjRxBZJuU) göz atabilirsiniz.

Metamask hesap adresinizi girin ve **İstek Gönder**'e tıklayın. Aşağıdaki ufak kod parçası gibi bir cevap göreceksiniz.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _Not: Bu sonuç ETH değil, wei cinsindendir. Wei, ether'ın en küçük birimi olarak kullanılır._

Vay be! Tüm sahte paramız yerli yerinde.

### Adım 6: Projemizi başlatın {#step-6-initialize-our-project}

Önce, projemiz için bir klasör oluşturmamız gerekecek. Komut satırınıza gidin ve aşağıdakini girin.

```
mkdir hello-world
cd hello-world
```

Artık proje klasörümüzün içinde olduğumuza göre, projeyi başlatmak için `npm init` kullanacağız.

> Eğer npm'i hala yüklemediyseniz [Node.js ve npm'i yüklemek için bu talimatları uygulayın](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm).

Başlangıç sorularını nasıl cevapladığınız bu öğreticinin amacıyla alakasızdır. Biz referans olarak bu şekilde yaptık:

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

package.json'ı onayladıktan sonra hazırız!

### 7. Adım: Hardhat'i indirin {#step-7-download-hardhat}

Hardhat, Ethereum yazılımınızı derlemek, dağıtmak, test etmek ve hatalarını ayıklamak için bir geliştirme ortamıdır. Bu geliştiricilere canlı zincirde dağıtmadan önce akıllı sözleşmelerini ve merkeziyetsiz uygulamalarını geliştirirken yardımcı olur.

`hello-world` projemizin içinde şunu yürütün:

```
npm install --save-dev hardhat
```

[Kurulum talimatları](https://hardhat.org/getting-started/#overview) hakkında daha fazla ayrıntı için bu sayfaya göz atın.

### Adım 8: Hardhat projesi oluşturun {#step-8-create-hardhat-project}

`hello-world` proje klasörümüzde aşağıdaki komutu çalıştırın:

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

👷 Welcome to Hardhat v2.0.11 👷‍

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Bu, projenin içinde bir `hardhat.config.js` dosyası oluşturacaktır. Bunu, bu öğreticinin içinde daha sonra projemizin kurulumunu özelleştirmek için kullanacağız.

### Adım 9: Proje klasörleri ekleyin {#step-9-add-project-folders}

Bu projeyi düzenli tutmak için iki yeni klasör daha oluşturalım. Komut satırına `hello-world` projenizin kök rehberine gidip şunları yazın:

```
mkdir contracts
mkdir scripts
```

- `contracts/` merhaba dünya akıllı sözleşme kod dosyamızı tutacağımız yerdir
- `scripts/`, sözleşmemizi dağıtmak ve etkileşim kurmak için komut dosyalarını tutacağımız yerdir

### Adım 10: Sözleşmemizi yazın {#step-10-write-our-contract}

Kendinize, ne zaman kod yazmaya başlayacağız diye mi soruyorsunuz? İşte o vakit geldi!

En sevdiğiniz düzenleyicide hello-world projenizi açın. Akıllı sözleşmeler genelde Solidity'de yazılır, biz de akıllı sözleşmemizi yazmak için onu kullanacağız.

1. `contracts` klasörüne gidin ve `HelloWorld.sol` adında bir dosya oluşturun
2. Aşağıda bu öğreticide kullanacağımız örnek bir Hello World akıllı sözleşmesi var. Aşağıdaki içerikleri `HelloWorld.sol` dosyasına kopyalayın.

_Not: Bu sözleşmenin ne yaptığını anlayabilmek için yorumları okuduğunuzdan emin olun._

```
// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state). Once deployed, a contract resides at a specific address on the Ethereum blockchain. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitted when update function is called
   //Smart contract events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
   event UpdatedMessages(string oldStr, string newStr);

   // Declares a state variable `message` of type `string`.
   // State variables are variables whose values are permanently stored in contract storage. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // Constructors are used to initialize the contract's data. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Bu, oluşturma aşaması tamamlandığında bir mesaj depolayan temel bir akıllı sözleşmedir. `update` fonksiyonunu kullanarak bu akıllı sözleşmeyi güncelleyebiliriz.

### Adım 11: MetaMask ve Alchemy'i projenize bağlayın {#step-11-connect-metamask-alchemy-to-your-project}

Bir MetaMask cüzdanı ile Alchemy hesabı oluşturduk ve akıllı sözleşmemizi yazdık, şimdi üçünü birleştirme zamanı.

Cüzdanınızdan gönderilen her işlem kendi benzersiz özel anahtarınızı kullanan bir imzaya ihtiyaç duyar. Programımıza bu izni sağlamak için özel anahtarımızı bir ortam dosyasında güvenle saklayabiliriz. Ayrıca burada, Alchemy için bir API anahtarı da depolayacağız.

> İşlem gönderme hakkında daha fazla bilgi edinmek için web3 kullanarak işlem gönderme ile ilgili [bu öğreticiye](https://docs.alchemyapi.io/alchemy/tutorials/sending-transactions-using-web3-and-alchemy) göz atın.

İlk önce dotenv paketini proje dizininize kurun:

```
npm install dotenv --save
```

Sonra, projenin kök rehberinde bir `.env` dosyası oluşturun. MetaMask özel anahtarınızı ve HTTP Alchemy API URL'nizi bu dosyaya ekleyin.

Ortam dosyanızın adı `.env` olmak zorundadır, aksi takdirde ortam dosyası olarak tanınmaz.

Dosyanıza `process.env`, `.env-custom` ya da başka bir isim vermeyin.

- Özel anahtarınızı almak için [şu talimatları](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) takip edin
- HTTP Alchemy API URL'sini almak için aşağıya göz atın

![](./get-alchemy-api-key.gif)

`.env` dosyanız şu şekilde görünmelidir:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Bunları kodumuza gerçekten bağlamak için, adım 13'te `hardhat.config.js` dosyamızda bu değişkenlere başvuracağız.

### Adım 12: Ethers.js'yi kurun {#step-12-install-ethersjs}

Ethers.js, [standart JSON-RPC yöntemlerini](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) daha kullanıcı dostu yöntemlerle birleştirerek Ethereum'la etkileşimde bulunmayı ve Ethereum'a istek göndermeyi kolaylaştıran bir kütüphanedir.

Hardhat, ek araçlar ve daha fazla işlevsellik için [eklentiler](https://hardhat.org/plugins/) kullanmamıza olanak tanır. Sözleşme dağıtımı için [Ethers eklentisinden](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html) yararlanacağız.

Proje klasörünüzde şunu yazın:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### Adım 13: hardhat.config.js'yi güncelleyin {#step-13-update-hardhat.configjs}

Şimdiye kadar birkaç bağımlılık ve eklenti ekledik, şimdi projemizin bunların hepsini tanıması için `hardhat.config.js`'yi güncellememiz gerekiyor.

`hardhat.config.js` dosyanızı şöyle görünecek şekilde güncelleyin:

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

### Adım 14: Sözleşmemizi derleyin {#step-14-compile-our-contract}

Şimdiye kadar yaptığımız her şeyin çalıştığından emin olmak için sözleşmemizi derleyelim. `compile` görevi, yerleşik hardhat görevlerden biridir.

Komut satırından şunu yürütün:

```bash
npx hardhat compile
```

`SPDX license identifier not provided in source file` uyarısı alabilirsiniz, ancak bunun için endişelenmenize gerek yok, geri kalan her şey düzgün olacaktır! Düzgün değilse, istediğiniz zaman [Alchemy discord](https://discord.gg/u72VCg3)'da mesaj gönderebilirsiniz.

### Adım 15: Dağıtım komut dosyamızı yazın {#step-15-write-our-deploy-script}

Artık sözleşmemiz yazıldığına ve yapılandırma dosyamız kullanıma hazır olduğuna göre, sözleşme dağıtım komut dosyanızı yazmanın zamanı geldi.

`scripts/` klasörüne gidin ve aşağıdaki içeriği ekleyerek `deploy.js` adlı yeni bir dosya oluşturun:

```javascript
async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld")

  // Start deployment, returning a promise that resolves to a contract object
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

Hardhat, bu kod satırlarının her birinin ne işe yaradığını [Sözleşme öğreticisinde](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) harika bir şekilde açıklıyor, Hardhat açıklamalarını buraya aktardık.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

Ethers.js'deki bir `ContractFactory`, yeni akıllı sözleşmeleri dağıtmak için kullanılan bir soyutlamadır, bu nedenle `HelloWorld`, merhaba dünya sözleşmemizin örnekleri için bir [fabrika](<https://en.wikipedia.org/wiki/Factory_(object-oriented_programming)>)'dır. `hardhat-ethers` eklentisini kullanırken `ContractFactory` ve `Contract` örnekleri varsayılan olarak ilk imzalayana (sahip) bağlanır.

```javascript
const hello_world = await HelloWorld.deploy()
```

Bir `ContractFactory` üzerinde `deploy()` öğesinin çağrılması, dağıtımı başlatır ve `Contract` nesnesi olarak çözümlenen bir `Promise` döndürür. Bu, akıllı sözleşme fonksiyonlarımızın her biri için bir yöntemi olan nesnedir.

### Adım 16: Sözleşmemizi dağıtın {#step-16-deploy-our-contract}

Sonunda akıllı sözleşmemizi uygulamaya hazırız! Komut satırına gidin ve şunu yürütün:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

Daha sonra şöyle bir şey görmelisiniz:

```bash
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**Bu adresi lütfen kaydedin**. Öğreticide daha sonra kullanacağız.

[Goerli etherscan](https://goerli.etherscan.io)'e gider ve sözleşme adresimizi aratırsak başarıyla dağıtılmış olduğunu görürüz. İşlem şunun gibi gözükecektir:

![](./etherscan-contract.png)

`From` adresi MetaMask hesap adresinizle eşleşmelidir ve `To` adresi **Sözleşme Oluşturma** ifadesini barındıracaktır. İşleme tıklarsak `To` alanında sözleşme adresimizi görürüz.

![](./etherscan-transaction.png)

Tebrikler! Az önce Ethereum test ağına bir akıllı sözleşme dağıttınız.

Perde arkasında neler olduğunu anlamak için [Alchemy gösterge panelimizde](https://dashboard.alchemyapi.io/explorer) Explorer (Gezgin) sekmesine gidelim. Birden fazla Alchemy uygulamanız varsa, uygulamaya göre filtreleme yaptığınızdan ve **Merhaba Dünya**'yı seçtiğinizden emin olun.

![](./hello-world-explorer.png)

Burada, `.deploy()` fonksiyonunu çağırdığımızda Hardhat/Ethers'ın bizim için arka planda oluşturduğu bir avuç JSON-RPC yöntemini göreceksiniz. Buradaki iki önemli yöntem, akıllı sözleşmemizi Goerli zincirine yazma isteği olan [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction) ve karma değerine göre işlemimiz hakkındaki bilgileri okuma isteği olan [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash) öğeleridir. İşlem gönderme hakkında daha fazla bilgi edinmek için [Web3 kullanarak işlem göndermeyle ilgili öğreticimize](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) göz atın.

## 2. Bölüm: Akıllı Sözleşmenizle etkileşime geçin {#part-2-interact-with-your-smart-contract}

Akıllı sözleşmemizi Goerli ağına başarılı bir şekilde dağıttığımıza göre, artık sözleşmeyle nasıl etkileşim kuracağımızı öğrenebiliriz.

### Bir interact.js dosyası oluşturun {#create-a-interactjs-file}

Bu etkileşim komut dosyamızı yazacağımız dosyadır. Burada, daha önce 1.Bölüm'de yüklemiş olduğunuz Ethers.js kütüphanesini kullancağız.

`scripts/` dosyasının içinde `interact.js` adında yeni bir dosya oluşturun ve aşağıdaki kodu ekleyin:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### .env dosyanızı güncelleyin {#update-your-env-file}

Yeni ortam değişkenleri kullanacağımız için bu değişkenleri [daha önce oluşturduğumuz](#step-11-connect-metamask-&-alchemy-to-your-project) `.env` dosyasında tanımlayacağız.

Alchemy `API_KEY`'imiz ve akıllı sözleşmenizin dağıtıldığı yer olan `CONTRACT_ADDRESS` için bir tanım eklememiz gerekecektir.

`.env` aşağıdaki gibi görünmelidir:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### Sözleşme ABI'nizi alın {#grab-your-contract-ABI}

Sözleşme [ABI 'miz (Uygulama İkili Arayüzü)](/glossary/#abi), akıllı sözleşmemizle etkileşim kurmak için kullanılan arayüzdür. Hardhat otomatik olarak bir ABI oluşturur ve `HelloWorld.json`'un içine kaydeder. ABI'yi kullanmak için `interact.js` dosyamıza aşağıdaki kod satırlarını ekleyerek içeriği ayrıştırmamız gerekir:

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

ABI'yi görmek istiyorsanız onu konsolunuza yazdırabilirsiniz:

```javascript
console.log(JSON.stringify(contract.abi))
```

ABI'nizin konsola yazdırıldığını görmek için terminalinize gidin ve şunu çalıştırın:

```bash
npx hardhat run scripts/interact.js
```

### Sözleşmenizin bir örneğini oluşturun {#create-an-instance-of-your-contract}

Sözleşmenizle etkileşim kurmak için kodumuzda bir sözleşme örneği oluşturmamız gerekir. Bunu Ethers.js ile yapmak için üç konseptle çalışacağız:

1. Sağlayıcı - size blockzincir için okuma ve yazma erişimi veren bir düğüm sağlayıcısıdır
2. İmzalayıcı - işlem imzalayabilen bir Ethereum hesabını gösterir
3. Sözleşme - zincir üstünde dağıtılmış olan spesifik bir sözleşmeyi temsil eden bir Ethers.js objesidir

Sözleşme örneğimizi oluşturmak için önceki adımdaki sözleşme ABI'mizi kullanacağız:

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

Sağlayıcı, İmzalayıcı ve Sözleşmelerle ilgili [ethers.js dokümanlarından](https://docs.ethers.io/v5/) daha fazla bilgi edinebilirsiniz.

### Başlangıç mesajını okuyun {#read-the-init-message}

Sözleşmemizi `initMessage = "Hello world!"` ile dağıttığımızı hatırlıyor musunuz? Şimdi akıllı sözleşmemizde depolanmış olan bu mesajı okuyacağız ve konsola yazdıracağız.

JavaScript'te ağlarla etkileşim kurulurken asenkronize fonksiyonlar kullanılır. Asenkronize fonksiyonlarla ilgili daha fazla bilgi edinmek için [bu medium makalesini okuyun](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff).

Akıllı sözleşmemizdeki `message` fonksiyonunu çağırmak için aşağıdaki kodu kullanın ve başlangıç mesajını okuyun:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)
}
main()
```

Dosyayı terminaldeki `npx hardhat run scripts/interact.js` öğesini kullanarak çalıştırdıktan sonra şu yanıtı görmeliyiz:

```
The message is: Hello world!
```

Tebrikler! Az önce Ethereum blokzincirinden başarıyla bir akıllı sözleşme verisi okudunuz, bravo!

### Mesajı güncelleyin {#update-the-message}

Sadece mesajı okumak yerine, `update` fonksiyonunu kullanarak akıllı sözleşmemizde kayıtlı olan mesajı güncelleyebiliriz! Oldukça havalı, değil mi?

Bu mesajı güncellemek için somutlaşmış sözleşme nesnemizde doğrudan `update` fonksiyonunu çağırabiliriz:

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

11. satırda dönen işlem nesnesi için `.wait()` çağrısını yaptığımızı not alın. Bunu yapmak, komut dosyamızın fonksiyondan çıkmadan önce işlemin blokzincirde basılmasını beklediğinden emin olmamızı sağlar. Eğer `.wait()` çağrısı dahil edilmemişse komut dosyası, sözleşmedeki güncellenmiş `message` değerini görmeyebilir.

### Yeni mesajı okuyun {#read-the-new-message}

Güncellenmiş `message` değerini okumak için [önceki adımı](#read-the-init-message) tekrar edebilmelisiniz. Bir saniye durun ve yeni değeri yazdırabilmek için gerekli değişiklikleri yapıp yapamadığınıza bakın!

Eğer ipucuna ihtiyacınız varsa, bu noktada `interact.js` dosyanız bu şekilde görünmelidir:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")

// provider - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// signer - you
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// contract instance
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

Şimdi sadece komut dosyasını çalıştırın; eski mesajı, güncelleme durumunu ve yeni mesajı terminalinizde yazdırılmış şekilde görebilmelisiniz!

`npx hardhat run scripts/interact.js --network goerli`

```
The message is: Hello World!
Updating the message...
The new message is: This is the new message.
```

Komut dosyasını çalıştırırken, yeni mesaj yüklenmeden önce `Updating the message...` adımının biraz uzun sürdüğünü fark edebilirsiniz. Bunun sebebi madencilik sürecidir; işlemleri çıkarılırken takip etme konusunda meraklıysanız işlemin durumunu görüntülemek için [Alchemy bellek havuzunu](https://dashboard.alchemyapi.io/mempool) ziyaret edebilirsiniz. İşlem düştüyse, [Goerli Etherscan](https://goerli.etherscan.io)'i kontrol etmek ve işlem karmanızı aramak da faydalı olur.

## 3. Bölüm: Akıllı Sözleşmenizi Etherscan'de yayımlayın {#part-3-publish-your-smart-contract-to-etherscan}

Akıllı sözleşmenizi hayata geçirmek için tüm zor işleri hallettiniz, şimdi bunu dünyayla paylaşma zamanı!

Akıllı sözleşmenizi Etherscan'de doğruladığınızda, herkes kaynak kodunuzu görebilir ve akıllı sözleşmenizle etkileşim kurabilir. Haydi başlayalım!

### 1. Adım: Etherscan hesabınızda bir API anahtarı oluşturun {#step-1-generate-an-api-key-on-your-etherscan-account}

Etherscan API anahtarı paylaşmaya çalıştığınız akıllı sözleşmenin sahibinin siz olduğunu onaylamak için gereklidir.

Eğer hala bir Etherscan hesabınız yoksa [hesap oluşturmak için kaydolun](https://etherscan.io/register).

Hesaba girdiğinizde, gezinti çubuğunda kullanıcı adınızı bulun, imleci üstüne getirin ve **Profilim** butonuna tıklayın.

Profil sayfanızda, bir yan gezinti çubuğu görmelisiniz. Yan gezinti çubuğundan **API Anahtarları**'nı seçin. Sonra, yeni bir API anahtarı oluşturmak için "Ekle" butonuna tıklayın, uygulamanıza **hello-world** adını verin ve **Yeni API Anahtarı Oluştur** butonuna tıklayın.

Yeni API anahtarınız API anahtar tablosunda görünüyor olmalıdır. API anahtarını panonuza kopyalayın.

Şimdi, `.env` dosyamıza Etherscan API anahtarını eklemeliyiz.

Ekledikten sonra, `.env` dosyanız şu şekilde görünmelidir:

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### Hardhat dağıtılmış akıllı sözleşmeler {#hardhat-deployed-smart-contracts}

#### Hardhat-etherscan'i yükleme {#install-hardhat-etherscan}

Sözleşmenizi Hardhat kullanarak Etherscan'de yayımlamak basittir. Başlamak için öncelikle `hardhat-etherscan` eklentisini yüklemeniz gerekir. `hardhat-etherscan`, akıllı sözleşmenin kaynak kodunu ve ABI'sini Etherscan'de otomatik olarak doğrulayacaktır. Bunu eklemek için `hello-world` rehberinizde şunu çalıştırın:

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

Yüklendiğinde, aşağıdaki ifadeyi `hardhat.config.js`'nizin en üstüne dahil edin ve Etherscan yapılandırma seçeneklerini ekleyin:

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
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### Akıllı Sözleşmenizi Etherscan üzerinden doğrulama {#verify-your-smart-contract-on-etherscan}

Tüm dosyaların kaydedildiğinden ve tüm değişkenlerin `.env` doğru şekilde yapılandırıldığından emin olun.

`verify` görevini çalıştırarak sözleşme adresinizi ve ağınızı dağıtıldığı konuma aktarın:

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

`DEPLOYED_CONTRACT_ADDRESS` adresinin Goerli test ağında dağıtılan akıllı sözleşmenizin adresi olduğundan emin olun. Ayrıca son bağımsız değişken olan (`'Hello World!'`), 1. Bölüm'de dağıtım aşamasında kullanılan dizi değeriyle [ aynı olmak zorundadır](#write-our-deploy-script).

Eğer her şey yolunda gittiyse, terminalinizde aşağıdaki mesajı göreceksiniz:

```text
Successfully submitted source code for contract
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
for verification on Etherscan. Waiting for verification result...


Successfully verified contract HelloWorld on Etherscan.
https://goerli.etherscan.io/address/<contract-address>#contracts
```

Tebrikler! Akıllı sözleşmeniz artık Etherscan'de!

### Akıllı sözleşmenize Etherscan'de göz atın! {#check-out-your-smart-contract-on-etherscan}

Terminalinizde sağlanan bağlantıya gittiğinizde, akıllı sözleşme kodunuzun ve ABI'nizin Etherscan'de yayımlandığını göreceksiniz!

**Bravo, başardınız! Artık herkes akıllı sözleşmenize yazabilir ya da onu çağırabilir! Bir dahaki sefere ne geliştireceğinizi görmek için sabırsızlanıyoruz!**

## 4. Bölüm - Akıllı sözleşmenizi ön yüzle entegre etme {#part-4-integrating-your-smart-contract-with-the-frontend}

Bu öğreticinin sonuna geldiğinize, şunları nasıl yapacağınızı biliyor olacaksınız:

- Merkeziyetsiz uygulamanıza bir MetaMask cüzdanı bağlamak
- [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) API'sini kullanarak akıllı sözleşmenizden veri okumak
- MetaMask kullanarak Ethereum işlemlerini imzalamak

Bu merkeziyetsiz uygulama için ön yüz çerçevemiz olarak [React](https://reactjs.org/)'i kullanacağız, fakat genel olarak projemize Web3 işlevselliğini getirmeye odaklanacağımız için temellerini açıklamaya çok vakit ayırmayacağımızı unutmayın.

Ön şart olarak, React'i yeni başlayan seviyesinde anlıyor olmanız gerekir. Eğer böyle değilse, [Resmi React öğreticisini](https://reactjs.org/tutorial/tutorial.html) bitirmenizi tavsiye ederiz.

### Başlangıç ​​dosyalarını klonlayın {#clone-the-starter-files}

İlk olarak, bu projenin başlangıç dosyalarını almak ve bu kaynağı kendi yerel makinemize klonlamak için [hello-world-part-four GitHub deposuna](https://github.com/alchemyplatform/hello-world-part-four-tutorial) gideceğiz.

Klonlanmış depoyu yerel olarak açın. İki klasöre sahip olduğunu göreceksiniz: `starter-files` ve `completed`.

- `starter-files`- **bu dizinde çalışacağız**, kullanıcı arayüzünü Ethereum cüzdanınıza ve [3. Bölüm](#part-3)'de Etherscan'de yayımladığımız akıllı sözleşmeye bağlayacağız.
- Bu `completed`, tamamlanmış olan öğreticiyi içerir ve sadece takıldığınızda yararlanacağınız bir kaynak olarak kullanılmalıdır.

Ardından, `starter-files` kopyanızı en sevdiğiniz kod düzenleyicide açın ve `src` klasörüne gidin.

Yazacağımız tüm kodlar `src` klasörünün altında yer alacaktır. Projemize Web3 işlevselliğini eklemek için `HelloWorld.js` bileşenini ve `util/interact.js` JavaScript dosyalarını düzenleyeceğiz.

### Başlangıç dosyalarına göz atın {#check-out-the-starter-files}

Kodlamaya başlamadan önce, başlangıç dosyalarında bize neler sağlandığını öğrenelim.

#### React projenizi çalıştırın {#get-your-react-project-running}

Tarayıcımızda React projesini çalıştırarak başlayalım. React'in güzelliği, projemizi tarayıcımızda çalıştırdıktan sonra, kaydettiğimiz tüm değişikliklerin tarayıcımızda canlı olarak güncellenmesidir.

Projeyi çalıştırmak için `starter-files` klasörünün kök dizinine gidip projenin bağımlılıklarını yüklemek için terminalinizde `npm install`'ı çalıştırın:

```bash
cd starter-files
npm install
```

Bunların kurulumu tamamlandıktan sonra terminalinizde `npm start` komutunu çalıştırın:

```bash
npm start
```

Bunu yaptığınızda, tarayıcınızda projemizin ön ucunu göreceğiniz [http://localhost:3000/](http://localhost:3000/) adresi açılmalıdır. Bu, bir alandan \(akıllı sözleşmenizde depolanan mesajı güncellemek için bir yer\), bir "Connect Wallet" butonundan ve bir "Udate" butonundan oluşmalıdır.

Butonlardan birini tıklamayı denediğinizde çalışmadığını göreceksiniz, bunun sebebi hala işlevselliklerini programlamamız gerekmesidir.

#### `HelloWorld.js` bileşeni {#the-helloworld-js-component}

Düzenleyicimizdeki `src` klasörüne geri dönelim ve `HelloWorld.js` dosyasını açalım. Üzerinde çalışacağımız birincil React bileşeni olduğu için bu dosyadaki her şeyi anlamamız çok önemlidir.

Bu dosyanın en üstünde React kütüphanesini, useEffect ve useState kancalarını, `./util/interact.js`'den bazı öğeleri (bunları yakında daha detaylı anlatacağız!) ve Alchemy logosunu içeren ve projemizi çalışır hale getirmemiz için gerekli olan birkaç önemli içe aktarım ifadeleri olduğunu fark edeceksiniz.

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

Sırada, belirli olaylardan sonra güncelleyeceğimiz durum değişkenlerimiz var.

```javascript
// HelloWorld.js

//State variables
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("No connection to the network.")
const [newMessage, setNewMessage] = useState("")
```

Değişkenlerin her birinin temsil ettiği şeyler:

- `walletAddress` - kullanıcının cüzdan adresini saklayan bir dize
- `status`- kullanıcıya, merkeziyetsiz uygulama ile nasıl etkileşim kuracağı konusunda yardımcı olacak mesajlar içeren bir dizi
- `message` - akıllı sözleşmedeki güncel mesajı depolayan bir dizi
- `newMessage` - akıllı sözleşmeye yazılacak yeni mesajı depolayan bir dizi

Durum değişkenlerinden sonra, beş tane uygulanmamış fonksiyon göreceksiniz: `useEffect` ,`addSmartContractListener`, `addWalletListener`, `connectWalletPressed` ve `onUpdatePressed`. Bu fonksiyonların neler yaptığını aşağıda açıklayacağız:

```javascript
// HelloWorld.js

//called only once
useEffect(async () => {
  //TODO: implement
}, [])

function addSmartContractListener() {
  //TODO: implement
}

function addWalletListener() {
  //TODO: implement
}

const connectWalletPressed = async () => {
  //TODO: implement
}

const onUpdatePressed = async () => {
  //TODO: implement
}
```

- [`useEffect`](https://reactjs.org/docs/hooks-effect.html)- bu, bileşeniniz oluşturulduktan sonra çağrılan bir React kancasıdır. İçine geçirilen boş bir `[]` dizisine sahip olduğundan \(4. satıra bakın\), yalnızca bileşenin _ilk_ oluşturmasında çağrılır. Buraya akıllı sözleşmemizde depolanan mesajı yükleyecek, akıllı sözleşmelerimizi ve cüzdan dinleyicilerimizi çağıracak ve kullanıcı arayüzümüzü, bir cüzdanın zaten bağlı olup olmadığını yansıtacak şekilde güncelleyeceğiz.
- `addSmartContractListener`- bu fonksiyon, Merhaba Dünya sözleşmemizin `UpdatedMessages` olayını takip edecek ve akıllı sözleşmemizdeki mesaj değiştiğinde kullanıcı arayüzümüzü güncelleyecek bir dinleyici oluşturur.
- `addWalletListener`- bu fonksiyon, kullanıcının bağlantıyı kesmesi ve adres değişiklikleri yapması gibi MetaMask cüzdan durumundaki değişiklikleri takip eder.
- `connectWalletPressed`- bu fonksiyon, kullanıcının MetaMask cüzdanını merkeziyetsiz uygulamamıza bağlamak için çağrılır.
- `onUpdatePressed` - bu fonksiyon, kullanıcı akıllı sözleşmede depolanan mesajı güncellemek istediğinde çağrılır.

Bu dosyanın sonuna doğru, bileşenimizin kullanıcı arayüzü bulunuyor.

```javascript
// HelloWorld.js

//the UI of our component
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

Bu kodu dikkatli bir şekilde tararsanız, kullanıcı arayüzümüzde çeşitli durum değişkenleri kullandığımız yeri fark edeceksiniz:

- 6 ila 12. satırlar arasında, kullanıcının cüzdanı bağlıysa \(örn.`walletAddress.length > 0`\), "walletButton;" kimlikli butonda kullanıcının `walletAddress`'inin kırpılmış bir versiyonunu gösteririz; aksi takdirde, sadece "Connect Wallet" yazar.
- 17. satırda, akıllı sözleşmemizde depolanan ve `message` dizesinde bulunan güncel mesajımızı görüntüleriz.
- 23-26. satırlar arasında `newMessage` durum değişkenimizi metin alanındaki girdi değiştiğinde güncelleyebilmek için bir [kontrollü bileşen](https://reactjs.org/docs/forms.html#controlled-components) kullanıyoruz.

Durum değişkenlerimize ek olarak `publishButton` ve `walletButton` butonları sırasıyla tıklandığında `connectWalletPressed` ve `onUpdatePressed` fonksiyonlarının çağrıldığını da göreceksiniz.

Son olarak, `HelloWorld.js` bileşeninin nereye eklendiğine değinelim.

React'teki diğer tüm bileşenler için bir kapsayıcı görevi gören ana bileşen olan `App.js` dosyasına giderseniz, `HelloWorld.js` bileşenimizin 7. satıra enjekte edildiğini görürsünüz.

Sonuncu ama diğerleriyle eşit öneme sahip olarak, size sağlanan bir dosyaya daha göz atalım: `interact.js` dosyası.

#### `interact.js` dosyası {#the-interact-js-file}

[M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) paradigmasını kurala bağlamak istediğimiz için merkeziyetsiz uygulamamızın mantığını, verilerini ve kurallarını yönetmek amacıyla fonksiyonlarımızı içeren ayrı bir dosya oluşturmak ve ardından bu fonksiyonları ön ucumuza \(our `HelloWorld.js` component\) aktarabilmek isteyeceğiz.

👆🏽Bu tam olarak `interact.js` dosyamızın amacı!

`src` dizininizde `util` klasörüne gittiğinizde bütün akıllı sözleşme etkileşimlerimizi, cüzdan işlevlerini ve değişkenleri içeren `interact.js` adında bir dosya eklemiş olduğumuzu göreceksiniz.

```javascript
// interact.js

//export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

Bu dosyanın en üstündeki `helloWorldContract` nesnesine yorum yazdığımızı fark edeceksiniz. Bu öğreticinin ilerleyen kısımlarında, nesnenin yorumkarını kaldıracak, akıllı sözleşmemimizi bu değişkenin içinde oluşturacak ve ardından `HelloWorld.js` bileşenimize aktaracağız.

`helloWorldContract` nesnemiz aşağıdakileri yaptıktan sonra dört uygulanmamış fonksiyon:

- `loadCurrentMessage` - bu fonksiyon, akıllı sözleşmede depolanan güncel mesajın yüklenmesinin mantığını işler. Merhaba Dünya akıllı sözleşmesine, [Alchemy Web3 API](https://github.com/alchemyplatform/alchemy-web3)'sini kullanarak bir _okuma_ çağrısı yapacaktır.
- `connectWallet` - bu fonksiyon, kullanıcının MetaMask'ını merkeziyetsiz uygulamamıza bağlar.
- `getCurrentWalletConnected` - bu fonksiyon, sayfa yüklendiğinde merkeziyetsiz uygulamamıza zaten bir Ethereum hesabının bağlı olup olmadığını kontrol eder ve kullanıcı arayüzümüzü buna göre günceller.
- `updateMessage` - bu fonksiyon, akıllı sözleşmede depolanmış olan mesajı günceller. Merhaba Dünya akıllı sözleşmesine bir _write_ çağrısı yapar ve bu sayede kullanıcının MetaMask cüzdanının mesajı güncelleyebilmek için bir Ethereum işlemi imzalaması gerekir.

Ne üzerinde çalıştığımızı anladığımıza göre, akıllı sözleşmemizi nasıl okuyacağımızı öğrenelim!

### 3. Adım: Akıllı sözleşmenizden okuma {#step-3-read-from-your-smart-contract}

Akıllı sözleşmenizi okuyabilmek için aşağıdakileri başarıyla kurmanız gerekir:

- Ethereum zincirine bir API bağlantısı
- Akıllı sözleşmenizin yüklenmiş bir örneği
- Akıllı sözleşme fonksiyonunuzu çağıran bir fonksiyon
- Akıllı sözleşme değişikliklerinden okuduğunuz verilerin güncellemelerini takip eden bir dinleyici

Çok fazla adım varmış gibi görünebilir, fakat endişe etmeyin! Hepsini nasıl yapacağınızı adım adım göstereceğiz! :\)

#### Ethereum zincirine bir API bağlantısı kurma {#establish-an-api-connection-to-the-ethereum-chain}

Bu öğreticinin 2. Bölümü'nde [Alchemy Web3 anahtarını akıllı sözleşmemizi okuyabilmek için kullandığımızı hatırlıyor musunuz](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library)? Zinciri okuyabilmek için de merkeziyetsiz uygulamanızda bir Alchemy Web3 anahtarına ihtiyacınız olacak.

Eğer sizde hala yoksa, ilk olarak kök dizininizin `starter-files` öğesinden [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)'e gidip yüklemek için aşağıdaki kodu terminalinizde çalıştırın:

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3), [Web3.js](https://docs.web3js.org/) paketleyicisidir. Bir web3 geliştiricisi olarak hayatınızı kolaylaştıracak gelişmiş API yöntemleri ve diğer önemli avantajlar sağlar. Uygulamanızda hemen kullanmaya başlayabilmeniz için minimum yapılandırma gerektirecek şekilde tasarlanmıştır!

Ardından, API anahtarımızı aldıktan sonra depolayacağımız güvenli bir yerimiz olması için [dotenv](https://www.npmjs.com/package/dotenv) paketini proje dizinimize yükleyin.

```text
npm install dotenv --save
```

Merkeziyetsiz uygulamamız için HTTP API anahtarımız yerine **Websockets API anahtarımızı kullanıyor** olacağız; bu, bizim akıllı sözleşmemizdeki mesajların değişip değişmediğini kontrol eden bir dinleyici kurmamızı sağlayacaktır.

API anahtarına sahip olduğunuzda, kök dizininizde bir `.env` dosyası oluşturun ve Alchemy Websockets url'nizi içine ekleyin. Sonrasında `.env` dosyanız şu şekilde görünmelidir:

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<key>
```

Artık Alchemy Web3 uç noktamızı merkeziyetsiz uygulamamıza kurmaya hazırız! `util` klasörümüzde yuvalanmış `interact.js` öğemize geri dönelim ve dosyanın başına aşağıdaki kodu ekleyelim:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```

Yukarıda, ilk olarak Alchemy anahtarımızı `.env` dosyasından içe aktardık ve sonra da Alchemy Web3 uç noktamızı kurmak için `alchemyKey`'imizi `createAlchemyWeb3`'e gönderdik.

Bu uç nokta hazır olduğuna göre akıllı sözleşmemizi yükleme zamanı!

#### Merhaba Dünya akıllı sözleşmenizi yükleme {#loading-your-hello-world-smart-contract}

Merhaba Dünya akıllı sözleşmenizi yükleyebilmek için sözleşmenin adresine ve ABI'sine ihtiyacınız olacak. [Bu öğreticinin 3. Bölümü'nü](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan) bitirdiyseniz bunların ikisini de Etherscan'de bulabilirsiniz.

#### Sözleşme ABI'nizi Etherscan'den alma {#how-to-get-your-contract-abi-from-etherscan}

Bu öğreticinin 3. Bölüm'ünü atladıysanız, [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code) adresli Merhaba Dünya sözleşmesini kullanabilirsiniz. Sözleşmenin ABI'sini [burada](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code) bulabilirsiniz.

Bir sözleşmenin hangi fonksiyonu çağıracağını belirlemek ve fonksiyonun beklediğiniz biçimde veri döndürmesini sağlamak için bir sözleşme ABI'si gereklidir. Sözleşme ABI'mizi kopyaladıktan sonra onu `src` dizinindeki `contract-abi.json` adlı JSON dosyasına kaydedelim.

Contract-abi.json'unuz src klasöründe depolanmış olmalıdır.

Sözleşme adresimiz, ABI ve Alchemy Web3 uç noktamız hazır olduğuna göre, sözleşmemizin bir örneğini yüklemek için bu [sözleşme yöntemini](https://docs.web3js.org/api/web3-eth-contract/class/Contract) kullanabiliriz. Sözleşme ABI'nizi `interact.js` dosyasının içine aktarın ve sözleşme adresinizi ekleyin.

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

Sonunda `helloWorldContract` değişkenimizin yorumunu kaldırabilir ve AlchemyWeb3 uç noktasını kullanarak akıllı sözleşmemizi yükleyebiliriz:

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

Hatırlatma olarak, `interact.js` kodunuzun ilk 12 satırı aşağıdaki gibi görünmelidir:

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

Sözleşmemizi yüklediğimize göre, artık `loadCurrentMessage` fonksiyonunu uygulayabiliriz!

#### `interact.js` dosyanıza `loadCurrentMessage`'ı uygulama {#implementing-loadCurrentMessage-in-your-interact-js-file}

Bu fonksiyon aşırı basittir. Sözleşmemizi okumak için basit bir asenkronize web3 çağrısı yapacağız. Fonksiyonumuz akıllı sözleşmede depolanmış olan mesajı döndürecek:

`interact.js` dosyanızdaki `loadCurrentMessage`'ı aşağıdaki şekilde güncelleyin:

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

Kullanıcı arayüzümüzde akıllı sözleşmeyi görüntülemek istediğimiz için `HelloWorld.js` bileşenimizdeki `useEffect` fonksiyonunu aşağıdaki şekilde güncelleyelim:

```javascript
// HelloWorld.js

//called only once
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

Bileşenin ilk işlemesinde sadece `loadCurrentMessage`'ın çağrılmasını istediğimize dikkat edin. Yakında akıllı sözleşmedeki mesaj değiştiğinde kullanıcı arayüzünü otomatik olarak güncelleyen `addSmartContractListener`'ı uygulayacağız.

Dinleyicimize geçmeden önce, şu anda elimizde ne olduğuna bir bakalım! `HelloWorld.js` ve `interact.js` dosyalarınızı kaydedip [http://localhost:3000/](http://localhost:3000/) öğesine gidin

Güncel mesajda artık "Ağ bağlantısı yok" yazmadığını göreceksiniz. Onun yerine, akıllı sözleşmede depolanmış olan mesajı yansıtır. İnanılmaz!

#### Kullanıcı arayüzünüz artık akıllı sözleşmede depolanan mesajı yansıtıyor olmalı {#your-UI-should-now-reflect-the-message-stored-in-the-smart-contract}

Dinleyiciye gelirsek...

#### `addSmartContractListener`'ı uygulayın {#implement-addsmartcontractlistener}

[Bu öğretici serisinin 1. Bölümü'nde](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract) yazdığımız `HelloWorld.sol` dosyasına dönerseniz, burada akıllı sözleşmemizin `update` fonksiyonunu çağırdıktan sonra meydana gelen `UpdatedMessages` adlı bir olay olduğunu hatırlayacaksınız \(bkz. satır 9 ve 27\):

```javascript
// HelloWorld.sol

// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state). Once deployed, a contract resides at a specific address on the Ethereum blockchain. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitted when update function is called
   //Smart contract events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
   event UpdatedMessages(string oldStr, string newStr);

   // Declares a state variable `message` of type `string`.
   // State variables are variables whose values are permanently stored in contract storage. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // Constructors are used to initialize the contract's data. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Akıllı sözleşme olayları sözleşmenizin, ön yüz uygulamanızın blokzinciri üzerinde bir olay olduğunda \(yani bir _olay_ gerçekleştiğinde\) iletişim kurmasının bir yoludur. Bu yol, belli başlı olaylar için bir şeyleri dinlemek ve bu olaylar olduğunda aksiyon almak olabilir.

`addSmartContractListener` fonksiyonu spesifik olarak Merhaba Dünya akıllı sözleşmemizin `UpdatedMessages` olayını dinleyecek ve kullanıcı arayüzümüzü yeni mesajı gösterecek şekilde güncelleyecektir.

`addSmartContractListener`'ı aşağıdaki gibi değiştirin:

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

Dinleyici bir olay algıladığında olacakları masaya yatıralım:

- Olay yayımlandığında bir hata oluşursa, `status` durum değişkenimiz bu hatayı kullanıcı arayüzüne yansıtır.
- Aksi takdirde döndürülen `data` nesnesini kullanacağız. `data.returnValues` dizinin ilk öğesinin önceki mesajı ve ikinci öğesinin güncellenmiş mesajı depoladığı sıfırdan başlatılan bir dizidir. Bütün olarak bakıldığında, başarılı bir olayda güncellenmiş mesajımıza `message` dizemizi kuracağız, `newMessage` dizesini sileceğiz ve `status` durum değişkenimizi akıllı sözleşmemizde yeni bir mesajın yayımlandığını yansıtacak şekilde güncelleyeceğiz.

Son olarak, `useEffect` fonksiyonumuzdaki dinleyicimizi çağırarak `HelloWorld.js` bileşenimizin ilk işlemesini başlatalım. Toparlarsak, `useEffect` fonksiyonunuz şu şekilde görünmelidir:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

Artık akıllı sözleşmemizi okuyabildiğimize göre, ona nasıl bir şeyler yazabileceğimizi öğrenmek de süper olur! Bununla birlikte, merkeziyetsiz uygulamamıza yazabilmek için önce ona bağlı bir Ethereum cüzdanı olmalıdır.

Yapacağımız bir sonraki şey ise Ethereum cüzdanımızı \(MetaMask\) kurmak ve merkeziyetsiz uygulamamıza bağlamaktır!

### 4. Adım: Ethereum cüzdanınızı kurun {#step-4-set-up-your-ethereum-wallet}

Kullanıcılar, Ethereum zincirine herhangi bir şey yazabilmek için sanal cüzdanlarının özel anahtarlarını kullanarak işlemler imzalamalıdır. Bu öğreticide, Ethereum hesap adresinizi yönetmeniz için tarayıcıda bulunan bir sanal cüzdan olan ve son kullanıcı için işlem imzalamayı çok basit bir hale getiren [MetaMask](https://metamask.io/)'ı kullanacağız.

Ethereum'daki işlemlerin nasıl çalıştığı hakkında daha fazla bilgi edinmek istiyorsanız, Ethereum Vakfı'nın [bu sayfasına](/developers/docs/transactions/) göz atın.

#### MetaMask'i indirin {#download-metamask}

[Buradan](https://metamask.io/download.html) ücretsiz olarak bir MetaMask hesabı indirebilir ve oluşturabilirsiniz. Bir hesap oluştururken ya da zaten bir hesabınız varsa, sağ üstten "Goerli Test Ağına" geçin \(bu sayede gerçek parayla denemeler yapmayız\).

#### Bir Musluktan ether ekleyin {#add-ether-from-a-faucet}

Ethereum blokzincirinde bir işlem imzalamak için biraz sahte Eth'ye ihtiyacımız olacak. Eth almak için [FaucETH](https://fauceth.komputing.org)'e gidip Goerli hesap adresinizi girebilir, "Fon iste" öğesine tıklayıp açılır menüden "Ethereum Test Ağı Goerli" seçimi yapabilir ve son olarak tekrar "Fon iste" düğmesine tıklayabilirsiniz. Kısa bir süre sonra MetaMask hesabınızda Eth'i görmelisiniz!

#### Bakiyenizi kontrol etme {#check-your-balance}

Bakiyemizin yerinde olduğundan emin olmak için [Alchemy'nin düzenleyici aracını](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) kullanarak bir [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) isteği oluşturalım. Bu, cüzdanımızdaki Eth miktarını döndürür. MetaMask hesap adresinizi girdikten ve "Send Request"e tıkladıktan sonra aşağıdaki gibi bir yanıt görmelisiniz:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**NOT:** Bu sonuç eth değil wei hâlindedir. Wei, ether'ın en küçük birimi olarak kullanılır. Wei'den eth'e dönüşüm: 1 eth = 10¹⁸ wei. Yani 0xde0b6b3a7640000'ı ondalık sayıya dönüştürürsek 1\*10¹⁸ elde ederiz, bu da 1 eth'e eşittir.

Vay be! Tüm sahte paramız yerli yerinde! 🤑

### 5. Adım: MetaMask'ı kullanıcı arayüzünüze bağlayın {#step-5-connect-metamask-to-your-UI}

Artık MetaMask cüzdanımız kurulduğuna göre, merkeziyetsiz uygulamamızı ona bağlayalım!

#### `connectWallet` fonksiyonu {#the-connectWallet-function}

`interact.js` dosyamızda `connectWallet` fonksiyonunu uygulayalım, bu fonksiyonu sonrasında `HelloWorld.js` bileşenimizde çağırabiliriz.

`connectWallet`'u aşağıdaki gibi değiştirelim:

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
            🦊 <a target="_blank" href={`https://metamask.io/download.html`}>
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

Bu dev kod bloğu tam olarak ne yapar?

İlk olarak, tarayıcınızda `window.ethereum`'un etkinleştirilmiş olup olmadığını kontrol eder.

`window.ethereum`, MetaMask ve diğer cüzdan sağlayıcıları tarafından enjekte edilen ve web sitelerinin kullanıcıların Ethereum hesaplarını talep etmesine izin veren küresel bir API'dir. Onaylandıysa, kullanıcının bağlı olduğu blokzincirlerden veri okuyabilir ve kullanıcıya mesajlar ve işlemler imzalamasını önerebilir. Daha fazla bilgi için [MetaMask belgelerine](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) göz atın!

`window.ethereum` _yoksa_, MetaMask kurulu değil demektir. Bu, bir JSON nesnesinin döndürülmesiyle sonuçlanır; burada döndürülen `address` boş bir dizedir ve `status` JSX nesnesi, kullanıcının MetaMask'i yüklemesi gerektiğini bildirir.

Şimdi, eğer `window.ethereum` _varsa_, işte o zaman işler ilginçleşiyor.

Bir deneme/yakalama döngüsü ile [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts) çağrısı yaparak MetaMask'a bağlanmaya çalışacağız. Bu fonksiyonun çağrılması, tarayıcıda MetaMask'i açar ve bu sayede kullanıcıdan cüzdanını merkeziyetsiz uygulamanıza bağlaması istenir.

- Kullanıcı bağlanmayı seçerse, `method: "eth_requestAccounts"`, kullanıcının merkeziyetsiz uygulamaya bağlı tüm hesap adreslerini içeren bir dizi döndürür. Toplamda, `connectWallet` fonksiyonumuz bu dizideki _ilk_ `address`'i içeren bir JSON nesnesi \(9. satıra bakın\) ve kullanıcıdan akıllı sözleşmeye bir mesaj yazmasını isteyen bir `status` mesajı döndürür.
- Kullanıcı bağlantıyı reddederse, JSON nesnesi, döndürülen `address` için boş bir dize ve kullanıcının bağlantıyı reddettiğini yansıtan bir `status` mesajı içerir.

Artık bu `connectWallet`'ı yazdığımıza göre, sonraki adım onu `HelloWorld.js` bileşenimize çağırmaktır.

#### `HelloWorld.js` Kullanıcı Arayüzü Bileşenimize `connectWallet` fonksiyonunu ekleyelim {#add-the-connectWallet-function-to-your-HelloWorld-js-ui-component}

`HelloWorld.js` içinde bulunan `connectWalletPressed`'a gidin ve aşağıdaki gibi güncelleyin:

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

İşlevselliğimizin çoğunun `interact.js` dosyasındaki `HelloWorld.js`'den nasıl da soyutlandığını görebiliyor musunuz? Bu, M-V-C paradigmasına uymamız içindir!

`connectWalletPressed`'de, içe aktarılan `connectWallet` fonksiyonumuza bir bekleme çağrısı yaparız ve yanıtını kullanarak durum kancaları aracılığıyla `status` ve `walletAddress` değişkenlerimizi güncelleriz.

Şimdi, iki dosyayı da \(`HelloWorld.js` and `interact.js`\) kaydedelim ve şu ana kadarki kullanıcı arayüzümüzü test edelim.

[http://localhost:3000/](http://localhost:3000/) sayfasında tarayıcınızı açın ve sayfanın sağ üst tarafında bulunan "Connect Wallet" butonuna tıklayın.

MetaMask yüklüyse, cüzdanınızı merkeziyetsiz uygulamanıza bağlamanız istenecektir. Bağlanmak için daveti kabul edin.

Cüzdan butonunuzun, adresinizin artık bağlı olduğunu gösterdiğini görmeniz beklenir! Eveeet 🔥

Ardından, sayfayı yenilemeyi deneyin... Garip. Cüzdan düğmemiz zaten bağlı olmasına rağmen MetaMask'i bağlamamızı istiyor...

Yine de korkmanıza gerek yok! Bunu, `getCurrentWalletConnected`'ı uygulayarak kolaylıkla adresleyebiliriz (anladınız mı)?; bu da merkeziyetsiz uygulamamıza bir adresin bağlı olup olmadığını kontrol edecek ve buna göre kullanıcı arayüzümüzü güncelleyecektir!

#### `getCurrentWalletConnected` fonksiyonu {#the-getcurrentwalletconnected-function}

`interact.js` dosyasındaki `getCurrentWalletConnected` fonksiyonunuzu aşağıdaki gibi güncelleyin:

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
            🦊 <a target="_blank" href={`https://metamask.io/download.html`}>
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

Bu kod, önceki adımda yazdığımız `connectWallet` fonksiyonuna _çok_ benzer.

Temel fark, kullanıcının cüzdanını bağlaması için MetaMask'i açan `eth_requestAccounts` yöntemini çağırmak yerine, burada yalnızca şu anda merkeziyetsiz uygulamamıza bağlı olan MetaMask adreslerini içeren bir dizi döndüren `eth_accounts` yöntemini çağırmamızdır.

Bu fonksiyonu çalışırken görmek için onu `HelloWorld.js` bileşenimizin `useEffect` fonksiyonuyla çağıralım:

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

Dikkat edin, `walletAddress` ve `status` durum değişkenlerimizi güncellemek için `getCurrentWalletConnected` çağrımızın yanıtını kullanıyoruz.

Artık bu kodu eklediğinize göre, sayfayı yenilemeyi deneyin.

Güzeeeeeel! Düğme, bağlı olduğunuzu söylemeli ve yeniledikten sonra bile bağlı cüzdanınızın adresinin bir önizlemesini göstermelidir!

#### `addWalletListener`'ı uygulayın {#implement-addwalletlistener}

Merkeziyetsiz uygulama cüzdanı kurulumumuzun son adımı, örneğin kullanıcı bağlantısını keserek veya hesap değiştirerek cüzdanımızın durumunu değiştirdiğinde kullanıcı arayüzümüzün güncellenmesi için cüzdan dinleyicisini uygulamaktır.

`HelloWorld.js` dosyanızda `addWalletListener` fonksiyonunu aşağıdaki gibi değiştirin:

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
        🦊 <a target="_blank" href={`https://metamask.io/download.html`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

Bu noktada ne olup bittiğini anlamak için bizim yardımımıza ihtiyacınız olmadığına bahse girebilirim, fakat hiçbir ayrıntıyı atlamamak adına hızlıca anlatalım:

- İlk olarak, fonksiyonumuz `window.ethereum`'un etkin olup olmadığını kontrol eder \(yani MetaMask kurulu olup olmadığını\).
  - Değilse, `status` durum değişkenimizi, kullanıcının MetaMask'i yüklemesini isteyen bir JSX dizesine ayarlamamız yeterlidir.
  - Etkinleştirilirse, 3. satırda `window.ethereum.on("accountsChanged")` dinleyicisini kurarız ve bu dinleyici MetaMask cüzdanındaki, kullanıcının merkeziyetsiz uygulamaya ek bir hesap bağladığı, hesapları değiştirdiği veya bir hesabın bağlantısını kestiği anları da içeren durum değişikliklerini dinler. Bağlı en az bir hesap varsa, `walletAddress` durum değişkeni, dinleyici tarafından döndürülen `accounts` dizisindeki ilk hesap olarak güncellenir. Aksi takdirde, `walletAddress` boş bir dize olarak ayarlanır.

Son ama bir o kadar da önemli olarak, bunu `useEffect` fonksiyonumuzda çağırmalıyız:

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

İşte bu kadar! Cüzdan fonksiyonlarımızın tümünün programlanmasını başarıyla tamamladık! Şimdi sıra son görevimizde: akıllı sözleşmemizde depolanan mesajı güncellemek!

### 6. Adım: `updateMessage` fonksiyonunu uygulama {#step-6-implement-the-updateMessage-function}

Evet dostum, evimizdeki rahatlığa ulaştık! `interact.js` dosyanızın `updateMessage` kısmında şunları yapacağız:

1. Yayımlayamak istediğimiz mesajın geçerli olduğundan emin olmak
2. MetaMask kullanarak işlemimizi imzalamak
3. `HelloWorld.js` ön yüz bileşenimizden bu fonksiyonu çağırmak

Bu, fazla zaman almayacak; hadi bu merkeziyetsiz uygulamayı bitirelim!

#### Girdi hatası işleme {#input-error-handling}

Doğal olarak, fonksiyonun başında bir çeşit girdi hatasını işlemek mantıklı olur.

Yüklü bir MetaMask uzantısı veya bağlı bir cüzdan yoksa \(yani aktarılan `address` boş bir dizeyse\) ya da `message` boş bir dizeyse fonksiyonumuzun erken dönüş yapmasını isteriz. Hadi `updateMessage`'a aşağıdaki hata işlemeleri ekleyelim:

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

Artık düzgün bir girdi hatası işleme sistemimiz olduğuna göre, işlemi MetaMask üzerinden imzalama zamanı geldi demektir!

#### İşlemimizi imzalama {#signing-our-transaction}

Geleneksel web3 Ethereum işlemleri ile haşır neşirseniz, az sonra yazacağımız kod tanıdık gelecektir. Girdi hatası işleme kodunuzun altında `updateMessage`'a şunları ekleyin:

```javascript
// interact.js

//set up transaction parameters
const transactionParameters = {
  to: contractAddress, // Required except during contract publications.
  from: address, // must match user's active address.
  data: helloWorldContract.methods.update(message).encodeABI(),
}

//sign the transaction
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

Olan biteni açıklayalım. Önce, işlem parametrelerimizi oluşturuyoruz; burada:

- `to` alıcı adresini belirtir \(akıllı sözleşmemiz\)
- `from`, fonksiyonumuza aktardığımız `address` değişkeni olan işlemin imzalayıcısını belirtir
- `data` ise Merhaba Dünya akıllı sözleşmesinin `update` yöntemlerine yönelik çağrıları içerir ve `message` dizesi değişkenlerini girdi olarak alır

Ardından, MetaMask'ten işlemi imzalamasını istediğimiz bir `window.ethereum.request` bekleme çağrısı yaparız. 11. ve 12. satırlarda eth yöntemimizi, `eth_sendTransaction`, belirttiğimizi ve `transactionParameters`'ımıza aktardığımızı gözdn kaçırmayın.

Bu noktada, MetaMask tarayıcıda açılır ve kullanıcıdan işlemi imzalamasını veya reddetmesini ister.

- İşlem başarılı olursa fonksiyon, `status` JSX dizesinin kullanıcıya Etherscan'den işlem hakkında daha fazla bilgi edinmesini anımsattığı bir JSON nesnesi döndürür.
- İşlem başarısız olursa fonksiyon, `status` dizesinin hata mesajını aktardığı bir JSON öğesi döndürür.

Toparlarsak, `updateMessage` fonksiyonumuz şu şekilde görünmelidir:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //input error handling
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

  //set up transaction parameters
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: address, // must match user's active address.
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  //sign the transaction
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

Son ama bir o kadar da önemli olarak, `updateMessage` fonksiyonumuzu `HelloWorld.js` bileşenimize bağlamalıyız.

#### `updateMessage`'ı `HelloWorld.js` ön yüzüne bağlama {#connect-updatemessage-to-the-helloworld-js-frontend}

`onUpdatePressed` fonksiyonumuz içeri aktarılan `updateMessage` fonksiyonuna bir bekleme çağrısı yapmalı ve `status` durum değişkenini işlemimizin başarılı ya da başarısız olduğunu yansıtacak şekilde güncellemelidir:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

Bu çok açık ve basit. Bilin bakalım ne oldu? MERKEZİYETSİZ UYGULAMANIZ TAMAMLANDI!!!

Devam edin ve **Güncelle** butonunu test edin!

### Kişiye özel merkeziyetsiz uygulamanızı üretin {#make-your-own-custom-dapp}

Tebrikler, öğreticinin sonuna geldiniz! Hatırlatma olarak, burada şunları nasıl yapacağınızı öğrendiniz:

- Merkeziyetsiz uygulama projenize bir MetaMask cüzdanı bağlama
- [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) API'sini kullanarak akıllı sözleşmenizden veri okumak
- MetaMask kullanarak Ethereum işlemlerini imzalamak

Artık bu öğreticide size verilmiş olan bu becerileri kullanarak kendi kişisel merkeziyetsiz uygulama projenizi yapabilirsiniz! Her zamanki gibi, herhangi bir sorunuz varsa yardım istemek için bize [Alchemy Discord](https://discord.gg/gWuC7zB) aracılığıyla ulaşmaktan çekinmeyin. 🧙‍♂️

Bu öğreticiyi bitirdiğinize, yaşadığınız deneyimi ya da yorumlarınızı Twitter'dan [@alchemyplatform](https://twitter.com/AlchemyPlatform) bizi etiketleyerek aktarabilirsiniz!
