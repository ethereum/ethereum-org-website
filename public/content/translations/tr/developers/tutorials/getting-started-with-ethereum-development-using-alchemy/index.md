---
title: "Ethereum Geliştirmeye Başlarken"
description: "Bu, Ethereum geliştirmeye başlamak için bir başlangıç rehberidir. Sizi bir API uç noktası kurmaktan, bir komut satırı isteğinde bulunmaya ve ilk web3 betiğinizi yazmaya kadar götüreceğiz! Blokzincir geliştirme deneyimi gerekmez!"
author: "Elan Halpern"
tags:
  [
    "javascript",
    "ethers.js",
    "düğümler",
    "sorgulama",
    "alchemy"
  ]
skill: beginner
breadcrumb: "Başlangıç"
lang: tr
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Ethereum ve Alchemy logoları](./ethereum-alchemy.png)

Bu, Ethereum geliştirmeye başlamak için bir başlangıç rehberidir. Bu eğitim için; Maker, 0x, MyEtherWallet, Dharma ve Kyber dahil en iyi blokzincir uygulamalarının %70'inden milyonlarca kullanıcıya destek veren lider blokzincir geliştirici platformu [Alchemy](https://alchemyapi.io/)'yi kullanacağız. Alchemy, işlemleri okuyup yazabilmemiz için Ethereum zincirindeki bir API uç noktasına erişmemizi sağlayacak.

Sizi Alchemy'ye kaydolmaktan ilk web3 betiğinizi yazmaya götüreceğiz! Blokzincir geliştirme deneyimi gerekmez!

## 1. Ücretsiz Bir Alchemy Hesabına Kaydolun {#sign-up-for-a-free-alchemy-account}

Alchemy ile bir hesap oluşturmak kolaydır, [buradan ücretsiz kaydolun](https://auth.alchemy.com/).

## 2. Bir Alchemy Uygulaması Oluşturun {#create-an-alchemy-app}

Ethereum zinciriyle iletişim kurmak ve Alchemy'nin ürünlerini kullanmak amacıyla isteklerinizi doğrulamak için bir API anahtarına ihtiyacınız var.

[Gösterge panelinden API anahtarları oluşturabilirsiniz](https://dashboard.alchemy.com/). Yeni bir anahtar oluşturmak için aşağıda gösterildiği gibi "Create App" (Uygulama Oluştur) bölümüne gidin:

_Bize kendi gösterge panellerini gösterme izni verdikleri için [_ShapeShift_](https://shapeshift.com/)'e özel teşekkürler!_

![Alchemy gösterge paneli](./alchemy-dashboard.png)

Yeni anahtarınızı almak için "Create App" altındaki ayrıntıları doldurun. Ayrıca daha önce yaptığınız uygulamaları ve ekibiniz tarafından yapılanları burada görebilirsiniz. Herhangi bir uygulama için "View Key" (Anahtarı Görüntüle) seçeneğine tıklayarak mevcut anahtarları alabilirsiniz.

![Alchemy ile uygulama oluşturma ekran görüntüsü](./create-app.png)

Ayrıca, "Apps" (Uygulamalar) üzerine gelip birini seçerek mevcut API anahtarlarını da alabilirsiniz. Buradan "View Key" (Anahtarı Görüntüle) ile anahtarı görüntüleyebilir, "Edit App" (Uygulamayı Düzenle) ile belirli alan adlarını beyaz listeye ekleyebilir, çeşitli geliştirici araçlarını görebilir ve analizleri görüntüleyebilirsiniz.

![Bir kullanıcıya API anahtarlarının nasıl alınacağını gösteren GIF](./pull-api-keys.gif)

## 3. Komut Satırından İstek Yapma {#make-a-request-from-the-command-line}

JSON-RPC ve curl kullanarak Alchemy aracılığıyla Ethereum blokzinciriyle etkileşim kurun.

Manuel istekler için `JSON-RPC` ile `POST` istekleri aracılığıyla etkileşim kurmanızı öneririz. `Content-Type: application/json` başlığını ve sorgunuzu aşağıdaki alanlarla birlikte `POST` gövdesi olarak iletmeniz yeterlidir:

- `jsonrpc`: JSON-RPC sürümü—şu anda yalnızca `2.0` desteklenmektedir.
- `method`: ETH API yöntemi. [API referansına bakın.](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: Yönteme geçirilecek parametrelerin listesi.
- `id`: İsteğinizin ID'si. Bir yanıtın hangi isteğe ait olduğunu takip edebilmeniz için yanıtla birlikte döndürülür.

Mevcut gaz fiyatını almak için komut satırından çalıştırabileceğiniz bir örnek:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**NOT:** [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) adresini kendi API anahtarınızla değiştirin: `https://eth-mainnet.alchemyapi.io/v2/**your-api-key`._

**Sonuçlar:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. Web3 İstemcinizi Kurun {#set-up-your-web3-client}

**Mevcut bir istemciniz varsa,** mevcut düğüm sağlayıcı URL'nizi API anahtarınızı içeren bir Alchemy URL'siyle değiştirin: `"https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_NOT:_** Aşağıdaki betiklerin, komut satırından değil, bir **düğüm bağlamında** çalıştırılması veya **bir dosyaya kaydedilmesi** gerekir. Eğer Node veya npm zaten kurulu değilse, mac'ler için bu hızlı [kurulum kılavuzuna](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs) göz atın.

Alchemy ile entegre edebileceğiniz tonlarca [Web3 kütüphanesi](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) vardır, ancak biz, web3.js'nin yerine geçen, Alchemy ile sorunsuz çalışacak şekilde oluşturulmuş ve yapılandırılmış olan [Alchemy Web3](https://docs.alchemy.com/reference/api-overview)'ü kullanmanızı öneririz. Bu, otomatik yeniden denemeler ve güçlü WebSocket desteği gibi birçok avantaj sağlar.

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

## 5. İlk Web3 Betiğinizi Yazın! {#write-your-first-web3-script}

Şimdi web3 programlamasına ufak bir giriş yapmak için Ethereum Ana Ağı'ndan en son blok numarasını yazdıran basit bir betik yazacağız.

**1. Henüz yapmadıysanız, terminalinizde yeni bir proje dizini oluşturun ve `cd` komutuyla o dizine girin:**

```
mkdir web3-example
cd web3-example
```

**2. Henüz yapmadıysanız, Alchemy web3 (veya herhangi bir web3) bağımlılığını projenize yükleyin:**

```
npm install @alch/alchemy-web3
```

**3. `index.js` adında bir dosya oluşturun ve aşağıdaki içeriği ekleyin:**

> Son olarak `demo`'yu Alchemy HTTP API anahtarınızla değiştirmelisiniz.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("En son blok numarası " + blockNumber)
}
main()
```

`async` konusuna yabancı mısınız? Bu [Medium gönderisine](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c) göz atın.

**4. Terminalinizde node kullanarak çalıştırın**

```
node index.js
```

**5. Şimdi konsolunuzda en son blok numarası çıktısını görmelisiniz!**

```
En son blok numarası 11043912
```

**Harika! Tebrikler! Alchemy'yi kullanarak ilk web3 betiğinizi yazdınız 🎉**

Sırada ne yapacağınızdan emin değil misiniz? İlk akıllı sözleşmenizi dağıtmayı deneyin ve [Merhaba Dünya Akıllı Sözleşme Kılavuzumuzda](https://www.alchemy.com/docs/hello-world-smart-contract) biraz Solidity programlamasıyla pratik yapın ya da [Gösterge Paneli Demo Uygulaması](https://docs.alchemyapi.io/tutorials/demo-app) ile gösterge paneli bilginizi test edin!

_[Alchemy'ye ücretsiz kaydolun](https://auth.alchemy.com/), [dokümanlarımıza](https://www.alchemy.com/docs/) göz atın ve en son haberler için bizi [Twitter](https://twitter.com/AlchemyPlatform)'da takip edin_.
