---
title: "Yeni Başlayanlar için Merhaba Dünya Akıllı Sözleşmesi"
description: "Ethereum'da basit bir akıllı sözleşme yazma ve dağıtma üzerine başlangıç seviyesi bir öğretici."
author: "elanh"
tags:
  [
    "solidity",
    "hardhat",
    "alchemy",
    "akıllı kontratlar",
    "dağıtma"
  ]
skill: beginner
breadcrumb: "Hello World sözleşmesi"
lang: tr
published: 2021-03-31
---

Blok zinciri geliştirme konusunda yeniyseniz ve nereden başlayacağınızı bilmiyorsanız veya sadece akıllı sözleşmelerin nasıl dağıtılacağını ve onlarla nasıl etkileşim kurulacağını anlamak istiyorsanız, bu kılavuz tam size göre. Sanal bir [MetaMask](https://metamask.io/) cüzdanı, [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/) ve [Alchemy](https://www.alchemy.com/eth) kullanarak Sepolia test ağında basit bir akıllı sözleşme oluşturma ve dağıtma sürecini adım adım anlatacağız (bu terimlerin ne anlama geldiğini henüz bilmiyorsanız endişelenmeyin, açıklayacağız).

Bu öğreticinin [2. bölümünde](https://docs.alchemy.com/docs/interacting-with-a-smart-contract), akıllı sözleşmemiz dağıtıldıktan sonra onunla nasıl etkileşim kurabileceğimizi ele alacağız ve [3. bölümde](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan) ise Etherscan'de nasıl yayınlayacağımızı anlatacağız.

Herhangi bir noktada sorularınız olursa [Alchemy Discord](https://discord.gg/gWuC7zB) üzerinden bize ulaşmaktan çekinmeyin!

## Adım 1: Ethereum ağına bağlanın {#step-1}

Ethereum zincirine istek göndermenin birçok yolu vardır. Basit olması için, kendi düğümlerimizi çalıştırmak zorunda kalmadan Ethereum zinciriyle iletişim kurmamıza olanak tanıyan bir blok zinciri geliştirici platformu ve API'si olan Alchemy'de ücretsiz bir hesap kullanacağız. Platform ayrıca, bu öğreticide akıllı sözleşme dağıtımımızın perde arkasında neler olup bittiğini anlamak için yararlanacağımız izleme ve analiz için geliştirici araçlarına da sahiptir. Henüz bir Alchemy hesabınız yoksa, [buradan ücretsiz olarak kaydolabilirsiniz](https://dashboard.alchemy.com/signup).

## Adım 2: Uygulamanızı (ve API anahtarınızı) oluşturun {#step-2}

Bir Alchemy hesabı oluşturduktan sonra, bir uygulama yaratarak bir API anahtarı oluşturabilirsiniz. Bu, Sepolia test ağına istekte bulunmamıza izin verecektir. Test ağlarına aşina değilseniz, [bu sayfaya](/developers/docs/networks/) göz atın.

1. Alchemy Panonuzda, gezinme çubuğundan "Bir uygulama seçin" ögesini seçip "Yeni uygulama oluştur" düğmesine tıklayarak "Yeni uygulama oluştur" sayfasına gidin.

![Merhaba dünya uygulama oluşturma](./hello-world-create-app.png)

2. Uygulamanıza “Merhaba Dünya” adını verin, kısa bir açıklama sunun ve örneğin "Altyapı ve Araçlar" gibi bir kullanım durumu seçin. Ardından, "Ethereum" için arama yapın ve ağı seçin.

![uygulama oluşturma görünümü merhaba dünya](./create-app-view-hello-world.png)

3. Devam etmek için "İleri"ye, ardından “Uygulama oluştur”a tıklayın, hepsi bu kadar! Uygulamanız, kopyalanmaya hazır bir API Anahtarı ile birlikte gezinme çubuğundaki açılır menüde görünmelidir.

## Adım 3: Bir Ethereum hesabı (adres) oluşturun {#step-3}

İşlem göndermek ve almak için bir Ethereum hesabına ihtiyacımız var. Bu öğretici için, Ethereum hesap adresinizi yönetmek için kullanılan tarayıcıda sanal bir cüzdan olan MetaMask'ı kullanacağız. [İşlemler](/developers/docs/transactions/) hakkında daha fazla bilgi.

[Buradan](https://metamask.io/download) MetaMask'ı indirebilir ve ücretsiz bir Ethereum hesabı oluşturabilirsiniz. Bir hesap oluştururken veya zaten bir hesabınız varsa, (gerçek parayla işlem yapmamak için) ağ açılır menüsünü kullanarak "Sepolia" test ağına geçtiğinizden emin olun.

Sepolia'yı listede görmüyorsanız, menüye, ardından Gelişmiş'e gidin ve "Test ağlarını göster" seçeneğini açmak için aşağı kaydırın. Ağ seçim menüsünde, test ağları listesini bulmak için "Özel" sekmesini seçin ve "Sepolia"yı seçin.

![metamask sepolia örneği](./metamask-sepolia-example.png)

## Adım 4: Bir musluktan ether ekleyin {#step-4}

Akıllı sözleşmemizi test ağına dağıtmak için sahte Eth'ye ihtiyacımız olacak. Sepolia ETH almak için, çeşitli muslukların bir listesini görüntülemek üzere [Sepolia ağ ayrıntıları](/developers/docs/networks/#sepolia) sayfasına gidebilirsiniz. Biri çalışmazsa, başka birini deneyin çünkü bazen kaynakları tükenebilir. Ağ trafiği nedeniyle sahte ETH'nizi almanız biraz zaman alabilir. Kısa bir süre sonra MetaMask hesabınızda ETH'yi görmelisiniz!

## Adım 5: Bakiyenizi kontrol edin {#step-5}

Bakiyemizin orada olup olmadığını iki kez kontrol etmek için, [Alchemy'nin oluşturucu aracını](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest) kullanarak bir [eth_getBalance](/developers/docs/apis/json-rpc/#eth_getbalance) isteği yapalım. Bu, cüzdanımızdaki ETH miktarını döndürür. MetaMask hesap adresinizi girdikten ve "Send Request"e tıkladıktan sonra aşağıdaki gibi bir yanıt görmelisiniz:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **NOT:** Bu sonuç ETH değil, wei cinsindendir. Wei, ether'ın en küçük birimi olarak kullanılır. wei'den ETH'ye dönüşüm: 1 eth = 10<sup>18</sup> wei'dir. Yani 0x2B5E3AF16B1880000 ondalık sayıya dönüştürürsek, 5 ETH'ye eşit olan 5\*10¹⁸ değerini elde ederiz.
>
> Vay be! Sahte paramızın tamamı burada <Emoji text=":money_mouth_face:" size={1} />.

## Adım 6: Projemizi başlatın {#step-6}

Öncelikle projemiz için bir klasör oluşturmamız gerekecek. Komut satırınıza gidin ve şunu yazın:

```
mkdir hello-world
cd hello-world
```

Artık proje klasörümüzün içinde olduğumuza göre projeyi başlatmak için `npm init` komutunu kullanacağız. Eğer npm zaten kurulu değilse, [bu talimatları](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) izleyin (Node.js'e de ihtiyacımız olacak, bu yüzden onu da indirin!).

```
npm init
```

Kurulum sorularını nasıl yanıtladığınız gerçekten önemli değil, referans olması için bizim nasıl yaptığımız aşağıda verilmiştir:

```
package name: (hello-world)
version: (1.0.0)
description: merhaba dünya akıllı sözleşmesi
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
  "description": "merhaba dünya akıllı sözleşmesi",
  "main": "index.js",
  "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

package.json dosyasını onaylayın ve artık hazırız!

## Adım 7: [Hardhat](https://hardhat.org/getting-started/#overview) İndirin {#step-7}

Hardhat, Ethereum yazılımınızı derlemek, dağıtmak, test etmek ve hatalarını ayıklamak için bir geliştirme ortamıdır. Bu geliştiricilere canlı zincirde dağıtmadan önce akıllı sözleşmelerini ve merkeziyetsiz uygulamalarını geliştirirken yardımcı olur.

`hello-world` projemizin içinde şunu çalıştırın:

```
npm install --save-dev hardhat
```

[Kurulum talimatları](https://hardhat.org/getting-started/#overview) hakkında daha fazla ayrıntı için bu sayfaya göz atın.

## Adım 8: Hardhat projesi oluşturun {#step-8}

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

👷 Hardhat v2.0.11'e Hoş Geldiniz 👷‍?

Ne yapmak istersiniz? …
Örnek bir proje oluştur
❯ Boş bir hardhat.config.js oluştur
Çıkış
```

Bu, bizim için projemizin tüm kurulumunu belirleyeceğimiz bir `hardhat.config.js` dosyası oluşturacaktır (13. adımda).

## Adım 9: Proje klasörleri ekleyin {#step-9}

Projemizi düzenli tutmak için iki yeni klasör oluşturacağız. Komut satırınızda projenizin kök dizinine gidin ve şunu yazın:

```
mkdir contracts
mkdir scripts
```

- `contracts/`, merhaba dünya akıllı sözleşme kodu dosyamızı tutacağımız yerdir
- `scripts/`, sözleşmemizi dağıtmak ve onunla etkileşim kurmak için komut dosyalarını tutacağımız yerdir

## Adım 10: Sözleşmemizi yazın {#step-10}

Ne zaman kod yazmaya başlayacağımızı merak ediyor olabilirsiniz?? İşte geldik, 10. adıma.

hello-world projesini favori düzenleyicinizde açın (biz [VSCode](https://code.visualstudio.com/)'u seviyoruz). Akıllı sözleşmeler, HelloWorld.sol akıllı sözleşmemizi yazmak için kullanacağımız Solidity adlı bir dilde yazılır.‌

1. “contracts” klasörüne gidin ve HelloWorld.sol adında yeni bir dosya oluşturun.
2. Aşağıda, bu öğretici için kullanacağımız Ethereum Vakfı'ndan örnek bir Merhaba Dünya akıllı sözleşmesi bulunmaktadır. Aşağıdaki içeriği kopyalayıp HelloWorld.sol dosyanıza yapıştırın ve bu sözleşmenin ne yaptığını anlamak için yorumları okuduğunuzdan emin olun:

```solidity
// Anlamsal sürümleme kullanarak Solidity sürümünü belirtir.
// Daha fazla bilgi edinin: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// `HelloWorld` adında bir sözleşme tanımlar.
// Bir sözleşme, fonksiyonlar ve verilerden (durumundan) oluşan bir koleksiyondur. Dağıtıldıktan sonra, bir sözleşme Ethereum blok zincirinde belirli bir adreste bulunur. Daha fazla bilgi edinin: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // `string` türünde `message` adında bir durum değişkeni bildirir.
   // Durum değişkenleri, değerleri kalıcı olarak sözleşme depolama alanında saklanan değişkenlerdir. `public` anahtar kelimesi, değişkenleri bir sözleşmenin dışından erişilebilir hale getirir ve diğer sözleşmelerin veya istemcilerin değere erişmek için çağırabileceği bir fonksiyon oluşturur.
   string public message;

   // Birçok sınıf tabanlı nesne yönelimli dilde olduğu gibi, kurucu yalnızca sözleşme oluşturulurken yürütülen özel bir fonksiyondur.
   // Kurucular, sözleşmenin verilerini başlatmak için kullanılır. Daha fazla bilgi edinin: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // `initMessage` dize bağımsız değişkenini kabul eder ve değeri sözleşmenin `message` depolama değişkenine ayarlar).
      message = initMessage;
   }

   // Bir dize bağımsız değişkenini kabul eden ve `message` depolama değişkenini güncelleyen bir genel fonksiyon.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

Bu, oluşturma sırasında bir mesaj depolayan ve `update` fonksiyonu çağrılarak güncellenebilen çok basit bir akıllı sözleşmedir.

## Adım 11: MetaMask ve Alchemy'yi projenize bağlayın {#step-11}

Bir MetaMask cüzdanı ve Alchemy hesabı oluşturduk ve akıllı sözleşmemizi yazdık, şimdi bu üçünü birbirine bağlama zamanı.

Sanal cüzdanınızdan gönderilen her işlem, benzersiz özel anahtarınızı kullanan bir imza gerektirir. Programımıza bu izni sağlamak için özel anahtarımızı (ve Alchemy API anahtarımızı) bir ortam dosyasında güvenle saklayabiliriz.

> İşlem gönderme hakkında daha fazla bilgi edinmek için, web3 kullanarak işlem göndermeyle ilgili [bu öğreticiye](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) göz atın.

İlk önce dotenv paketini proje dizininize kurun:

```
npm install dotenv --save
```

Ardından, projemizin kök dizininde bir `.env` dosyası oluşturun ve MetaMask özel anahtarınızı ve HTTP Alchemy API URL'nizi buna ekleyin.

- Özel anahtarınızı dışa aktarmak için [bu talimatları](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) izleyin.
- HTTP Alchemy API URL'sini almak için aşağıya bakın

![alchemy api anahtarını al](./get-alchemy-api-key.png)

Alchemy API URL'sini Kopyalayın

`.env` dosyanız şu şekilde görünmelidir:

```
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Bunları gerçekten kodumuza bağlamak için 13. adımda `hardhat.config.js` dosyamızdaki bu değişkenlere başvuracağız.

<Alert variant="warning">
<AlertContent>
<AlertDescription>
<code>.env</code> dosyasını commit'lemeyin! Lütfen <code>.env</code> dosyanızı asla kimseyle paylaşmadığınızdan veya ifşa etmediğinizden emin olun, çünkü bunu yaparken sırlarınızı tehlikeye atıyorsunuz. Sürüm kontrolü kullanıyorsanız, <code>.env</code> dosyanızı bir <a href="https://git-scm.com/docs/gitignore">gitignore</a> dosyasına ekleyin.
</AlertDescription>
</AlertContent>
</Alert>

## Adım 12: Ethers.js'i Yükleyin {#step-12-install-ethersjs}

Ethers.js, [standart JSON-RPC yöntemlerini](/developers/docs/apis/json-rpc/) daha kullanıcı dostu yöntemlerle sarmalayarak Ethereum ile etkileşim kurmayı ve istek göndermeyi kolaylaştıran bir kütüphanedir.

Hardhat, ek araçlar ve genişletilmiş işlevsellik için [Eklentileri](https://hardhat.org/plugins/) entegre etmeyi çok kolaylaştırır. Sözleşme dağıtımı için [Ethers eklentisinden](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) yararlanacağız ([Ethers.js](https://github.com/ethers-io/ethers.js/) çok temiz sözleşme dağıtım yöntemlerine sahiptir).

Proje klasörünüzde şunu yazın:

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

Bir sonraki adımda `hardhat.config.js` dosyamızda da ethers gerektireceğiz.

## Adım 13: hardhat.config.js dosyasını güncelleyin {#step-13-update-hardhatconfigjs}

Şimdiye kadar birkaç bağımlılık ve eklenti ekledik, şimdi projemizin hepsini tanıması için `hardhat.config.js` dosyasını güncellememiz gerekiyor.

`hardhat.config.js` dosyanızı aşağıdaki gibi görünecek şekilde güncelleyin:

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

Şimdiye kadar yaptığımız her şeyin çalıştığından emin olmak için sözleşmemizi derleyelim. `compile` görevi, yerleşik hardhat görevlerinden biridir.

Komut satırından şunu yürütün:

```
npx hardhat compile
```

`SPDX license identifier not provided in source file` hakkında bir uyarı alabilirsiniz, ancak bunun için endişelenmenize gerek yok — umarız diğer her şey yolundadır! Sorun yaşarsanız [Alchemy Discord](https://discord.gg/u72VCg3) üzerinden her zaman mesaj atabilirsiniz.

## Adım 15: Dağıtım betiğimizi yazın {#step-15-write-our-deploy-scripts}

Artık sözleşmemiz yazıldığına ve yapılandırma dosyamız kullanıma hazır olduğuna göre, sözleşme dağıtım komut dosyanızı yazmanın zamanı geldi.

`scripts/` klasörüne gidin ve `deploy.js` adında yeni bir dosya oluşturup içine aşağıdaki içeriği ekleyin:

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Dağıtımı başlatır, bir sözleşme nesnesine çözümlenen bir promise döndürür
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("Sözleşme şu adrese dağıtıldı:", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Hardhat, [Sözleşmeler öğreticisinde](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) bu kod satırlarının her birinin ne işe yaradığını harika bir şekilde açıklıyor, biz de buraya onların açıklamalarını aldık.

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

ethers.js'deki bir `ContractFactory`, yeni akıllı sözleşmeler dağıtmak için kullanılan bir soyutlamadır, bu nedenle buradaki `HelloWorld`, bizim merhaba dünya sözleşmemizin örnekleri için bir fabrikadır. `hardhat-ethers` eklentisini kullanırken, `ContractFactory` ve `Contract` örnekleri varsayılan olarak ilk imzalayana bağlanır.

```
const hello_world = await HelloWorld.deploy();
```

Bir `ContractFactory` üzerinde `deploy()` çağırmak dağıtımı başlatır ve bir `Contract`'a çözümlenen bir `Promise` döndürür. Bu, akıllı sözleşme fonksiyonlarımızın her biri için bir yöntemi olan nesnedir.

## Adım 16: Sözleşmemizi dağıtın {#step-16-deploy-our-contract}

Sonunda akıllı sözleşmemizi uygulamaya hazırız! Komut satırına gidin ve şunu çalıştırın:

```
npx hardhat run scripts/deploy.js --network sepolia
```

Daha sonra şöyle bir şey görmelisiniz:

```
Sözleşme şu adrese dağıtıldı: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

[Sepolia etherscan](https://sepolia.etherscan.io/) sitesine gider ve sözleşme adresimizi aratırsak, başarıyla dağıtıldığını görebilmeliyiz. İşlem şunun gibi gözükecektir:

![etherscan sözleşmesi](./etherscan-contract.png)

`From` adresi, MetaMask hesap adresinizle eşleşmelidir ve `To` adresinde “Contract Creation” yazar, ancak işleme tıklarsak `To` alanında sözleşme adresimizi görürüz:

![etherscan işlemi](./etherscan-transaction.png)

Tebrikler! Ethereum zincirine bir akıllı sözleşme dağıttınız 🎉

Perde arkasında neler olduğunu anlamak için [Alchemy gösterge panelimizdeki](https://dashboard.alchemyapi.io/explorer) Explorer sekmesine gidelim. Birden fazla Alchemy uygulamanız varsa, uygulamaya göre filtrelediğinizden ve “Merhaba Dünya”yı seçtiğinizden emin olun.
![merhaba dünya gezgini](./hello-world-explorer.png)

Burada, `.deploy()` fonksiyonunu çağırdığımızda Hardhat/Ethers'in bizim için perde arkasında yaptığı bir avuç JSON-RPC çağrısı göreceksiniz. Burada dikkat çekilmesi gereken iki önemli çağrı, aslında sözleşmemizi Sepolia zincirine yazma isteği olan [`eth_sendRawTransaction`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-send-raw-transaction) ve karma değeri verildiğinde işlemimiz hakkındaki bilgileri okuma isteği olan [`eth_getTransactionByHash`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-get-transaction-by-hash) çağrısıdır (işlemlerde tipik bir modeldir). İşlem gönderme hakkında daha fazla bilgi edinmek için, [Web3 kullanarak işlem gönderme](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) hakkındaki bu öğreticiye göz atın.

Bu öğreticinin 1. bölümü bu kadar; 2. bölümde, ilk mesajımızı güncelleyerek [akıllı sözleşmemizle gerçekten etkileşime gireceğiz](https://www.alchemy.com/docs/interacting-with-a-smart-contract) ve 3. bölümde herkesin onunla nasıl etkileşim kuracağını bilmesi için [akıllı sözleşmemizi Etherscan'de yayınlayacağız](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan).

**Alchemy hakkında daha fazla bilgi edinmek mi istiyorsunuz?** [Web sitemize](https://www.alchemy.com/eth) göz atın. Hiçbir güncellemeyi kaçırmak istemiyor musunuz? [Buradan](https://www.alchemy.com/newsletter) bültenimize abone olun! [Discord](https://discord.gg/u72VCg3) sunucumuza da katıldığınızdan emin olun.\*\*.
