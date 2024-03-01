---
title: Ethereum Geliştirmeye Başlarken
description: "Bu, Ethereum geliştirmeye başlamak için bir başlangıç rehberidir. Sizi bir API uç noktasını döndürmekten, bir komut satırı isteğinde bulunmaya ve ilk web3 komut dosyanızı yazmaya kadar götüreceğiz! Blok zinciri geliştirme deneyimi gerekmez!"
author: "Elan Halpern"
tags:
  - "javascript"
  - "ethers.js"
  - "düğümler"
  - "sorgulama"
  - "alchemy"
skill: beginner
lang: tr
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Ethereum ve Alchemy logoları](./ethereum-alchemy.png)

Bu, Ethereum geliştirmeye başlamak için bir başlangıç rehberidir. Bu eğitim için; Maker, 0x, MyEtherWallet, Dharma ve Kyber dahil en iyi blok zinciri uygulamalarının %70'inden milyonlarca kullanıcıya destek veren lider blok zinciri geliştirici platformu [Alchemy](https://alchemyapi.io/)'yi kullanacağız. Alchemy, işlemleri okuyup yazabilmemiz için Ethereum zincirindeki bir API uç noktasına erişmemizi sağlayacak.

Sizi Alchemy'ye kaydolmaktan ilk web3 komut dosyanızı yazmaya götüreceğiz! Blok zinciri geliştirme deneyimi gerekmez!

## 1. Ücretsiz Alchemy Hesabı için Üye Olun {#sign-up-for-a-free-alchemy-account}

Alchemy ile bir hesap oluşturmak kolaydır, [buradan ücretsiz üye olun](https://auth.alchemyapi.io/signup).

## 2. Bir Alchemy Uygulaması Oluşturun {#create-an-alchemy-app}

Ethereum zinciriyle iletişim kurmak ve Alchemy'nin ürünlerini kullanmak amacıyla isteklerinizi doğrulamak için bir API anahtarına ihtiyacınız var.

[Gösterge panelinden API anahtarları oluşturabilirsiniz](http://dashboard.alchemyapi.io/). Yeni bir anahtar oluşturmak için aşağıda gösterildiği gibi "Create App"e (Uygulama Oluştur) gidin:

[_ShapeShift_](https://shapeshift.com/)'e _gösterge panelini göstermemize izin verdiği için teşekkür ederiz!_

![Alchemy gösterge paneli](./alchemy-dashboard.png)

Yeni anahtarınızı almak için "Create App" altındaki ayrıntıları doldurun. Ayrıca daha önce yaptığınız uygulamaları ve ekibiniz tarafından yapılanları burada görebilirsiniz. Herhangi bir uygulama için "View Key"ye (Anahtarı Görüntüle) tıklayarak var olan anahtarları alabilirsiniz.

![Alchemy ile uygulama oluşturma ekran görüntüsü](./create-app.png)

Ayrıca, "Apps"in (Uygulamalar) üzerine gelip birini seçerek mevcut API anahtarlarını da alabilirsiniz. Burada anahtarı görüntüleyebilir, belirli alanları beyaz listeye almak için "Edit App"e tıklayabilir, çeşitli geliştirici araçlarını görebilir ve analizleri görüntüleyebilirsiniz.

![Bir kullanıcıya API anahtarlarının nasıl alınacağını gösteren GIF](./pull-api-keys.gif)

## 3. Komut Satırından İstekte Bulunun {#make-a-request-from-the-command-line}

JSON-RPC ve curl kullanarak Alchemy aracılığıyla Ethereum blok zinciriyle etkileşim kurun.

Manuel istekler için `JSON-RPC` ile `POST` istekleri aracılığıyla etkileşim kurmanızı öneririz. `Content-Type: application/json` başlığını ve sorgunuzu aşağıdaki alanlarla birlikte `POST` gövdesi olarak iletmeniz yeterlidir:

- `jsonrpc`: JSON-RPC versiyonu. Şu anda, sadece `2.0` desteklidir.
- `method`: ETH API yöntemi. [API referansına bakınız.](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: Yönteme geçirilecek parametre listesi.
- `id`: İsteğinizin ID'si. Bir yanıtın hangi isteğe ait olduğunu takip edebilmeniz için yanıt tarafından döndürülür.

Mevcut gaz fiyatını almak için komut satırından çalıştırabileceğiniz bir örnek:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**NOT:** [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) bağlantısını kendi API anahtarınızla değiştirin `https://eth-mainnet.alchemyapi.io/v2/**your-api-key`._

**Sonuçlar:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. Web3 İstemcinizi kurun {#set-up-your-web3-client}

**Mevcut bir istemciniz varsa,** API anahtarınızla mevcut düğüm sağlayıcı URL'nizi bir Alchemy URL'si olarak değiştirin: `“https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_NOT:_** Aşağıdaki komut dosyaları **düğüm bağlamında** çalıştırılmalı veya **bir dosyaya kaydedilmeli**, komut satırından çalıştırılmamalı. Eğer hâlihazırda Node veya npm kurulu değilse, bu hızlı [mac kurulum rehberine](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs) bir göz atın.

Alchemy ile entegre edebileceğiniz tonlarca [Web3 kütüphanesi](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) bulunur ancak web3.js'nin yerine bir eklenti olan [Alchemy Web3](https://docs.alchemy.com/reference/api-overview), Alchemy ile sorunsuz çalışacak şekilde oluşturulmuş ve yapılandırılmıştır. Bu, otomatik yeniden denemeler ve güçlü WebSocket desteği gibi birçok avantaj sağlar.

AlchemyWeb3.js'yi yüklemek için **proje dizininize gidin** ve şunu çalıştırın:

**Yarn ile:**

```
yarn add @alch/alchemy-web3
```

**NPM ile:**

```
npm install @alch/alchemy-web3
```

Alchemy'nin düğüm altyapısıyla etkileşim kurmak için NodeJS'de çalıştırın veya bunu bir JavaScript dosyasına ekleyin:

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```

## 5. İlk Web3 Komut Dosyanızı Yazın! {#write-your-first-web3-script}

Şimdi web3 programlamasına ufak bir dalış yapmak için Ethereum Mainnet'ten en son blok numarasını yazdıran basit bir komut dosyası yazacağız.

**1. Henüz yapmadıysanız, terminalinizde yeni bir proje dizini oluşturun ve içine cd ekleyin:**

```
mkdir web3-example
cd web3-example
```

**2. Henüz yapmadıysanız, Alchemy web3 (veya herhangi bir web3) bağımlılığını projenize yükleyin:**

```
npm install @alch/alchemy-web3
```

**3. `index.js` adlı bir dosya oluşturun ve aşağıdaki içerikleri ekleyin:**

> Sonunda `demo`'yu Alchemy HTTP API anahtarınızla değiştirmelisiniz.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("The latest block number is " + blockNumber)
}
main()
```

async ile ilgili şeylere aşina değil misiniz? Bu [Medium gönderisine](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c) bir göz atın.

**4. Node kullanarak komut satırınızda çalıştırın**

```
node index.js
```

**5. Şimdi konsolunuzda en son blok numarası çıktısını görmelisiniz!**

```
The latest block number is 11043912
```

**Oley! Tebrikler! Alchemy kullanarak ilk web3 komut dosyanızı yazdınız 🎉**

Şimdi ne yapacağınızdan emin değil misiniz? İlk akıllı sözleşmenizi dağıtmayı deneyin ve [Merhaba Dünya Akıllı Sözleşme Kılavuzumuzda](https://docs.alchemyapi.io/tutorials/hello-world-smart-contract) biraz sağlamlık programlamasıyla uğraşın veya [Dashboard Demo App](https://docs.alchemyapi.io/tutorials/demo-app) ile gösterge paneli bilginizi test edin!

_[Alchemy'ye ücretsiz kaydolun](https://auth.alchemyapi.io/signup), [belgelerimize](https://docs.alchemyapi.io/) göz atın ve en son haberler için bizi [Twitter](https://twitter.com/AlchemyPlatform) adresinden takip edin_.
