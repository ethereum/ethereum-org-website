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

Blokzincir geliştirmeye yeniyseniz ve nereden başlayacağınızı bilmiyorsanız veya sadece akıllı sözleşmeleri nasıl dağıtacağınızı ve onlarla nasıl etkileşime gireceğinizi anlamak istiyorsanız, bu rehber tam size göre. Sanal bir cüzdan olan [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/), [Hardhat](https://hardhat.org/) ve [Alchemy](https://www.alchemy.com/eth) kullanarak Sepolia test ağında basit bir akıllı sözleşme oluşturma ve dağıtma adımlarını inceleyeceğiz (bunların ne anlama geldiğini henüz anlamadıysanız endişelenmeyin, açıklayacağız).

Sözleşmeniz dağıtıldıktan sonra, [onun için bir kullanıcı arayüzü oluşturabilirsiniz](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

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

## Adım 3: Bir Ethereum hesabı (adres) oluşturun {#step-3}

İşlem göndermek ve almak için bir Ethereum hesabına ihtiyacımız var. Bu eğitim için, Ethereum hesap adresinizi yönetmek için kullanılan tarayıcıdaki sanal bir cüzdan olan MetaMask'ı kullanacağız. [İşlemler](/developers/docs/transactions/) hakkında daha fazla bilgi edinin.

MetaMask'ı indirebilir ve [buradan](https://metamask.io/download) ücretsiz olarak bir Ethereum hesabı oluşturabilirsiniz. Bir hesap oluştururken veya zaten bir hesabınız varsa, ağ açılır menüsünü kullanarak "Sepolia" test ağına geçtiğinizden emin olun (böylece gerçek parayla uğraşmamış oluruz).

Sepolia'nın listelendiğini görmüyorsanız, sağ üst köşedeki menüyü açın, "Networks" (Ağlar) seçeneğini belirleyin ve ağ listesinin altındaki "Show test networks" (Test ağlarını göster) seçeneğini açın ([MetaMask'ın test ağlarını görüntüleme rehberine](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/) bakın). Ardından ağ seçim menüsünden "Sepolia"yı seçin.

![metamask sepolia example](./metamask-sepolia-example.png)

## Adım 4: Bir musluktan ether ekleyin {#step-4}

Akıllı sözleşmemizi test ağına dağıtmak için biraz sahte ETH'ye ihtiyacımız olacak. Sepolia ETH almak için çeşitli muslukların bir listesini görüntülemek üzere [Sepolia ağ detaylarına](/developers/docs/networks/#sepolia) gidebilirsiniz. Biri çalışmazsa, bazen kuruyabilecekleri için diğerini deneyin. Bazı muslukların uygunluk kuralları vardır; örneğin, Alchemy'nin Sepolia musluğu, alıcı adresin Ethereum Ana Ağında en az 0.001 ETH tutmasını gerektirir. Ağ trafiği nedeniyle sahte ETH'nizi almanız biraz zaman alabilir. Kısa bir süre sonra MetaMask hesabınızda ETH görmelisiniz!

## Adım 5: Bakiyenizi Kontrol Edin {#step-5}

Bakiyemizin orada olduğunu iki kez kontrol etmek için, [Alchemy'nin composer aracını](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest) kullanarak bir [eth_getBalance](/developers/docs/apis/json-rpc/#eth-getbalance) isteği yapalım. Bu, cüzdanımızdaki ETH miktarını döndürecektir. MetaMask hesap adresinizi girip "Send Request" (İsteği Gönder) düğmesine tıkladıktan sonra şöyle bir yanıt görmelisiniz:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **NOT:** Bu sonuç ETH değil Wei cinsindendir. Wei, ether'in en küçük birimi olarak kullanılır. Wei'den ETH'ye dönüşüm şöyledir: 1 eth = 10<sup>18</sup> wei. Yani 0x2B5E3AF16B1880000 değerini ondalık sayıya çevirirsek 5\*10¹⁸ elde ederiz, bu da 5 ETH'ye eşittir.
>
> Oh be! Sahte paramızın hepsi orada <Emoji text=":money_mouth_face:" size={1} />.

## Adım 6: Projemizi başlatın {#step-6}

İlk olarak, projemiz için bir klasör oluşturmamız gerekecek. Komut satırınıza gidin ve şunu yazın:

```sh
mkdir hello-world
cd hello-world
```

Artık proje klasörümüzün içinde olduğumuza göre, projeyi başlatmak için `npm init` kullanacağız. Eğer npm henüz yüklü değilse, [Node.js kurulum talimatlarını](https://nodejs.org/en/download/) izleyin (bu eğitim için Node.js ve npm'e ihtiyacımız olacak).

```sh
npm init
```

Kurulum sorularını nasıl yanıtladığınız pek önemli değil, referans olması için biz şu şekilde yaptık:

```console
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

package.json dosyasını onaylayın. Bir sonraki adımda kuracağımız Hardhat 3, yalnızca ES modülü projelerini destekler, bu nedenle projeyi şu şekilde işaretleyin:

```sh
npm pkg set type=module
```

Ve artık hazırız!

## Adım 7: [Hardhat](https://hardhat.org/docs/getting-started)'i indirin {#step-7}

Hardhat, Ethereum yazılımınızı derlemek, dağıtmak, test etmek ve hatalarını ayıklamak için bir geliştirme ortamıdır. Geliştiricilere, canlı zincire dağıtmadan önce yerel olarak akıllı sözleşmeler ve merkeziyetsiz uygulamalar (dapp'ler) oluştururken yardımcı olur.

Hardhat 3, Node.js v22.13.0 veya daha yeni bir sürümünü gerektirir. `hello-world` projemizin içinde şunu çalıştırın:

```sh
npm install --save-dev hardhat
```

[Kurulum talimatları](https://hardhat.org/docs/getting-started) hakkında daha fazla detay için bu sayfaya göz atın.

## Adım 8: Hardhat projesi oluşturun {#step-8}

`npx hardhat --init` komutunu çalıştırmak eksiksiz bir örnek proje oluşturur, ancak bu eğitimde her parçayı görebilmeniz için her şeyi elle ayarlayacağız. Proje klasörünüzün kök dizininde, aşağıdaki içeriğe sahip `hardhat.config.js` adında bir dosya oluşturun:

```js
import { defineConfig } from "hardhat/config"

export default defineConfig({
  solidity: "0.8.34",
})
```

Burası, projemiz için tüm kurulumu belirteceğimiz yerdir (13. adımda). Şimdilik, sadece Hardhat'e Solidity derleyicisinin hangi sürümünü kullanacağını söyler.

## Adım 9: Proje klasörlerini ekleyin {#step-9}

Projemizi düzenli tutmak için iki yeni klasör oluşturacağız. Komut satırınızda projenizin kök dizinine gidin ve şunu yazın:

```sh
mkdir contracts
mkdir scripts
```

- `contracts/`, merhaba dünya akıllı sözleşme kod dosyamızı tutacağımız yerdir
- `scripts/`, sözleşmemizi dağıtmak ve onunla etkileşime girmek için komut dosyalarını tutacağımız yerdir

## Adım 10: Sözleşmemizi yazın {#step-10}

Kendi kendinize, ne zaman kod yazacağız diye soruyor olabilirsiniz?? İşte buradayız, 10. adımda.

hello-world projesini favori düzenleyicinizde açın (biz [VSCode](https://code.visualstudio.com/)'u seviyoruz). Akıllı sözleşmeler, HelloWorld.sol akıllı sözleşmemizi yazmak için kullanacağımız Solidity adlı bir dilde yazılır.‌

1.  "contracts" klasörüne gidin ve HelloWorld.sol adında yeni bir dosya oluşturun
2.  Aşağıda, bu eğitim için kullanacağımız Ethereum Vakfı'ndan örnek bir Hello World akıllı sözleşmesi bulunmaktadır. Aşağıdaki içeriği kopyalayıp HelloWorld.sol dosyanıza yapıştırın ve bu sözleşmenin ne yaptığını anlamak için yorumları okuduğunuzdan emin olun:

```solidity
// SPDX-License-Identifier: MIT
// Anlamsal sürümleme kullanarak Solidity sürümünü belirtir.
// Daha fazla bilgi edinin: https://docs.soliditylang.org/en/latest/layout-of-source-files.html#pragma
pragma solidity ^0.8.24;

// `HelloWorld` adında bir sözleşme tanımlar.
// Bir sözleşme, işlevlerin ve verilerin (durumunun) bir koleksiyonudur. Dağıtıldıktan sonra, bir sözleşme Ethereum Blokzincir üzerinde belirli bir adreste bulunur. Daha fazla bilgi edinin: https://docs.soliditylang.org/en/latest/structure-of-a-contract.html
contract HelloWorld {

   // `string` türünde bir `message` durum değişkeni bildirir.
   // Durum değişkenleri, değerleri sözleşme deposunda kalıcı olarak saklanan değişkenlerdir. `public` anahtar kelimesi, değişkenleri bir sözleşme dışından erişilebilir hale getirir ve diğer sözleşmelerin veya istemcilerin değere erişmek için çağırabileceği bir işlev oluşturur.
   string public message;

   // Sınıf tabanlı nesne yönelimli birçok dile benzer şekilde, kurucu (constructor), yalnızca sözleşme oluşturulduğunda yürütülen özel bir işlevdir.
   // Kurucular, sözleşmenin verilerini başlatmak için kullanılır. Daha fazla bilgi edinin: https://docs.soliditylang.org/en/latest/contracts.html#constructors
   constructor(string memory initMessage) {

      // Bir dize argümanı olan `initMessage` değerini kabul eder ve değeri sözleşmenin `message` depolama değişkenine ayarlar).
      message = initMessage;
   }

   // Bir dize argümanı kabul eden ve `message` depolama değişkenini güncelleyen genel (public) bir işlev.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

Bu, oluşturulduğunda bir mesaj depolayan ve `update` işlevi çağrılarak güncellenebilen süper basit bir akıllı sözleşmedir.

## Adım 11: MetaMask ve Alchemy'yi projenize bağlayın {#step-11}

Bir MetaMask cüzdanı, Alchemy hesabı oluşturduk ve akıllı sözleşmemizi yazdık, şimdi bu üçünü bağlama zamanı.

Sanal cüzdanınızdan gönderilen her işlem, benzersiz özel anahtarınızı kullanarak bir imza gerektirir. Programımıza bu izni sağlamak için özel anahtarımızı (ve Alchemy API anahtarını) bir ortam dosyasında güvenle saklayabiliriz.

> İşlem gönderme hakkında daha fazla bilgi edinmek için [işlemler belgelerine](/developers/docs/transactions/) göz atın.

Projemizin kök dizininde bir `.env` dosyası oluşturun ve MetaMask özel anahtarınızı ve HTTP Alchemy API URL'nizi buna ekleyin.

- Özel anahtarınızı dışa aktarmak için [bu talimatları](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) izleyin
- HTTP Alchemy API URL'sini almak için aşağıya bakın

![get alchemy api key](./get-alchemy-api-key.png)

Alchemy API URL'sini kopyalayın

`.env` dosyanız şu şekilde görünmelidir:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

Bunları kodumuza gerçekten bağlamak için, 13. adımda `hardhat.config.js` dosyamızda bu değişkenlere referans vereceğiz. Node.js `.env` dosyalarını kendi başına okuyabilir, bu nedenle yüklenecek fazladan bir paket yoktur.

<Alert variant="warning">
<AlertContent>
<AlertDescription>
<code>.env</code> dosyasını işlemeyin (commit)! Lütfen <code>.env</code> dosyanızı asla kimseyle paylaşmadığınızdan veya ifşa etmediğinizden emin olun, çünkü bunu yaparak sırlarınızı tehlikeye atarsınız. Sürüm kontrolü kullanıyorsanız, <code>.env</code> dosyanızı bir <a href="https://git-scm.com/docs/gitignore">gitignore</a> dosyasına ekleyin.
</AlertDescription>
</AlertContent>
</Alert>

## Adım 12: Ethers.js'i yükleyin {#step-12-install-ethersjs}

Ethers.js, [standart JSON-RPC yöntemlerini](/developers/docs/apis/json-rpc/) daha kullanıcı dostu yöntemlerle sararak Ethereum ile etkileşime girmeyi ve istekte bulunmayı kolaylaştıran bir kütüphanedir.

Hardhat, ek araçlar ve genişletilmiş işlevsellik için [Eklentileri](https://hardhat.org/docs/plugins/official-plugins) entegre etmeyi çok kolaylaştırır. Sözleşme dağıtımı için [Ethers eklentisinden](https://hardhat.org/docs/plugins/hardhat-ethers) yararlanacağız ([Ethers.js](https://docs.ethers.org/v6/) bazı süper temiz sözleşme dağıtım yöntemlerine sahiptir).

Proje dizininizde şunu yazın:

```sh
npm install --save-dev @nomicfoundation/hardhat-ethers ethers
```

Ayrıca bir sonraki adımda eklentiyi `hardhat.config.js` dosyamıza ekleyeceğiz.

## Adım 13: hardhat.config.js dosyasını güncelleyin {#step-13-update-hardhatconfigjs}

Şimdiye kadar birkaç bağımlılık ve eklenti ekledik, şimdi projemizin hepsinden haberdar olması için `hardhat.config.js` dosyasını güncellememiz gerekiyor.

`hardhat.config.js` dosyanızı şu şekilde görünecek biçimde güncelleyin:

```js
import { existsSync } from "node:fs"
import hardhatEthers from "@nomicfoundation/hardhat-ethers"
import { configVariable, defineConfig } from "hardhat/config"

// Eğer varsa, .env dosyasından API_URL ve PRIVATE_KEY değerlerini process.env içine yükle
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

`configVariable`, Hardhat'e her bir değeri yalnızca ihtiyaç duyulduğunda bir ortam değişkeninden okumasını söyler, böylece `compile` gibi komutlar değerler ayarlanmadan önce bile çalışır. Özel anahtarınızı düz metin dosyasında tutmamayı tercih ederseniz, Hardhat [şifrelenmiş bir anahtar deposundan yapılandırma değişkenlerini](https://hardhat.org/docs/guides/configuration-variables) de okuyabilir.

## Adım 14: Sözleşmemizi derleyin {#step-14-compile-our-contracts}

Şimdiye kadar her şeyin çalıştığından emin olmak için sözleşmemizi derleyelim. `compile` görevi, yerleşik hardhat görevlerinden biridir.

Komut satırından şunu çalıştırın:

```sh
npx hardhat compile
```

İlk derlediğinizde, Hardhat Solidity derleyicisini indirir. Ardından `Compiled 1 Solidity file with solc 0.8.34` gibi bir şey görmelisiniz. Görmezseniz, her zaman [Alchemy Discord](https://discord.gg/gWuC7zB) kanalından mesaj atabilirsiniz.

## Adım 15: Dağıtım betiğimizi yazın {#step-15-write-our-deploy-scripts}

Artık sözleşmemiz yazıldığına ve yapılandırma dosyamız hazır olduğuna göre, sözleşme dağıtım betiğimizi yazma zamanı geldi.

`scripts/` klasörüne gidin ve `deploy.js` adında yeni bir dosya oluşturarak içine aşağıdaki içeriği ekleyin:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const HelloWorld = await ethers.getContractFactory("HelloWorld")

// Bir sözleşme nesnesine çözümlenen bir söz (promise) döndürerek dağıtımı başlat
const hello_world = await HelloWorld.deploy("Hello World!")
await hello_world.waitForDeployment()
console.log("Contract deployed to address:", await hello_world.getAddress())
```

Bu kod satırlarının her birinin ne yaptığına bir göz atalım.

```js
const { ethers } = await network.create()
```

Hardhat 3'te, bir betik bir ağa açıkça bir bağlantı açar. `network.create()`, betiği çalıştırdığınızda `--network` seçeneğiyle seçtiğiniz ağa bağlanır ve `hardhat-ethers` eklentisi bu bağlantıya bir `ethers` nesnesi ekler.

```js
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

ethers.js'deki bir `ContractFactory`, yeni akıllı sözleşmeleri dağıtmak için kullanılan bir soyutlamadır, bu nedenle buradaki `HelloWorld`, hello world sözleşmemizin örnekleri için bir fabrikadır. `hardhat-ethers` eklentisini kullanırken `ContractFactory` ve `Contract` örnekleri varsayılan olarak ilk imzalayana bağlanır.

```js
const hello_world = await HelloWorld.deploy("Hello World!")
```

Bir `ContractFactory` üzerinde `deploy()` çağırmak dağıtımı başlatacak ve bir `Contract`'a çözümlenen bir `Promise` döndürecektir. Bu, akıllı sözleşme işlevlerimizin her biri için bir yöntemi olan nesnedir. `deploy()`'a ilettiğiniz argümanlar sözleşmenin kurucusuna gider, burada başlangıç mesajıdır.

`waitForDeployment()`, dağıtım işlemi bir bloğa dahil edilene kadar bekler ve `getAddress()` yeni sözleşmenin adresini döndürür. Daha fazla detay için [ethers.js sözleşme belgelerine](https://docs.ethers.org/v6/api/contract/) bakın.

## Adım 16: Sözleşmemizi dağıtın {#step-16-deploy-our-contract}

Sonunda akıllı sözleşmemizi dağıtmaya hazırız! Komut satırına gidin ve şunu çalıştırın:

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

Ardından şuna benzer bir şey görmelisiniz:

```text
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

[Sepolia etherscan](https://sepolia.etherscan.io/)'e gidip sözleşme adresimizi aratırsak, başarıyla dağıtıldığını görebilmeliyiz. İşlem şuna benzer görünecektir:

![etherscan contract](./etherscan-contract.png)

`From` adresi MetaMask hesap adresinizle eşleşmelidir ve To adresi "Contract Creation" (Sözleşme Oluşturma) diyecektir, ancak işleme tıklarsak `To` alanında sözleşme adresimizi göreceğiz:

![etherscan transaction](./etherscan-transaction.png)

Tebrikler! Ethereum zincirine bir akıllı sözleşme dağıttınız 🎉

Arka planda neler olup bittiğini anlamak için, [Alchemy kontrol panelinizde](https://dashboard.alchemy.com/) "Hello World" uygulamanızın aldığı isteklere bakabilirsiniz.

Orada, `.deploy()` işlevini çağırdığımızda Hardhat/Ethers'ın bizim için arka planda yaptığı bir avuç JSON-RPC çağrısını göreceksiniz. Burada dikkat edilmesi gereken iki önemli çağrı, sözleşmemizi gerçekten Sepolia zincirine yazma isteği olan [`eth_sendRawTransaction`](/developers/docs/apis/json-rpc/#eth-sendrawtransaction) ve hash verildiğinde işlemimiz hakkında bilgi okuma isteği olan [`eth_getTransactionByHash`](/developers/docs/apis/json-rpc/#eth-gettransactionbyhash)'tir (işlem gönderirken tipik bir model). İşlem gönderme hakkında daha fazla bilgi edinmek için [işlemler belgelerine](/developers/docs/transactions/) göz atın.

Bu eğitim için hepsi bu kadar. Ardından, [sözleşmeniz için bir kullanıcı arayüzü oluşturabilirsiniz](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).
