---
title: "Ethereum Geliştirmeye Başlarken"
description: "Bu, Ethereum geliştirmeye başlamak için yeni başlayanlara yönelik bir rehberdir. Sizi bir API uç noktası oluşturmaktan, komut satırı isteği yapmaya ve ilk Web3 betiğinizi yazmaya kadar götüreceğiz! Blokzincir geliştirme deneyimi gerekmez!"
author: "Elan Halpern"
tags: ["JavaScript", "ethers.js", "düğümler", "sorgulama", "Alchemy"]
skill: beginner
breadcrumb: "Başlarken"
lang: tr
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Ethereum and Alchemy logos](./ethereum-alchemy.png)

Bu, Ethereum geliştirmeye başlamak için yeni başlayanlara yönelik bir rehberdir. Bu eğitim için Maker, 0x, MyEtherWallet, Dharma ve Kyber dahil olmak üzere en iyi blokzincir uygulamalarının %70'inden milyonlarca kullanıcıya güç veren lider blokzincir geliştirici platformu [Alchemy](https://www.alchemy.com/)'yi kullanacağız. Alchemy, işlemleri okuyup yazabilmemiz için Ethereum Zinciri üzerinde bir API uç noktasına erişmemizi sağlayacaktır.

Sizi Alchemy'ye kaydolmaktan ilk Web3 betiğinizi yazmaya kadar götüreceğiz! Blokzincir geliştirme deneyimi gerekmez!

## 1. Ücretsiz Bir Alchemy Hesabı İçin Kaydolun {#sign-up-for-a-free-alchemy-account}

Alchemy ile bir hesap oluşturmak kolaydır, [buradan ücretsiz kaydolun](https://auth.alchemy.com/).

## 2. Bir Alchemy Uygulaması Oluşturun {#create-an-alchemy-app}

Ethereum Zinciri ile iletişim kurmak ve Alchemy'nin ürünlerini kullanmak için, isteklerinizin kimliğini doğrulamak üzere bir API anahtarına ihtiyacınız vardır.

[Kontrol panelinden API anahtarları oluşturabilirsiniz](https://dashboard.alchemy.com/). Yeni bir anahtar oluşturmak için aşağıda gösterildiği gibi “Create App” (Uygulama Oluştur) bölümüne gidin:

Kontrol panellerini göstermemize izin verdikleri için [_ShapeShift_](https://shapeshift.com/)_'e özel teşekkürler!_

![Alchemy dashboard](./alchemy-dashboard.png)

Yeni anahtarınızı almak için “Create App” altındaki ayrıntıları doldurun. Ayrıca daha önce yaptığınız ve ekibiniz tarafından yapılan uygulamaları da burada görebilirsiniz. Herhangi bir uygulama için “View Key” (Anahtarı Görüntüle) seçeneğine tıklayarak mevcut anahtarları çekebilirsiniz.

![Create app with Alchemy screenshot](./create-app.png)

Ayrıca “Apps” (Uygulamalar) üzerine gelip birini seçerek mevcut API anahtarlarını çekebilirsiniz. Belirli alan adlarını beyaz listeye almak, çeşitli geliştirici araçlarını görmek ve analizleri görüntülemek için burada “View Key” ve “Edit App” (Uygulamayı Düzenle) işlemlerini yapabilirsiniz.

![Gif showing a user how to pull API keys](./pull-api-keys.mp4#600x340)

## 3. Komut Satırından Bir İstek Yapın

JSON-RPC ve curl kullanarak Alchemy aracılığıyla Ethereum Blokzinciri ile etkileşime geçin.

Manuel istekler için, `JSON-RPC` ile `POST` istekleri aracılığıyla etkileşime geçmenizi öneririz. Sadece `Content-Type: application/json` başlığını ve aşağıdaki alanları içeren sorgunuzu `POST` gövdesi olarak iletin:

- `jsonrpc`: JSON-RPC sürümü—şu anda yalnızca `2.0` desteklenmektedir.
- `method`: ETH API yöntemi. [API referansına bakın.](/developers/docs/apis/json-rpc/)
- `params`: Yönteme iletilecek parametrelerin bir listesi.
- `id`: İsteğinizin kimliği. Yanıtın hangi isteğe ait olduğunu takip edebilmeniz için yanıtta döndürülecektir.

İşte mevcut gas fiyatını almak için komut satırından çalıştırabileceğiniz bir örnek:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**NOT:** `https://eth-mainnet.alchemyapi.io/v2/demo` adresini kendi API anahtarınız olan `https://eth-mainnet.alchemyapi.io/v2/**your-api-key` ile değiştirin._

**Sonuçlar:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```
## 4. Web3 İstemcinizi Kurun

**Mevcut bir istemciniz varsa,** mevcut düğüm sağlayıcı URL'nizi API anahtarınızı içeren bir Alchemy URL'si ile değiştirin: `“https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_NOT:_** Aşağıdaki betiklerin komut satırından çalıştırılması yerine bir **Node bağlamında** çalıştırılması veya **bir dosyaya kaydedilmesi** gerekir. Node veya npm henüz yüklü değilse, [Node.js kurulum talimatlarını](https://nodejs.org/en/download/) izleyin.

Alchemy ile entegre edebileceğiniz pek çok [Web3 kütüphanesi](/developers/docs/apis/javascript/) vardır, ancak Alchemy ile sorunsuz çalışacak şekilde oluşturulmuş ve yapılandırılmış, web3.js'nin doğrudan bir alternatifi olan [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)'ü kullanmanızı öneririz. Bu, otomatik yeniden denemeler ve sağlam WebSocket desteği gibi birçok avantaj sağlar.

AlchemyWeb3.js'yi kurmak için **proje dizininize gidin** ve şunu çalıştırın:

**Yarn ile:**

```
yarn add @alch/alchemy-web3
```

**NPM ile:**

```
npm install @alch/alchemy-web3
```

Alchemy'nin düğüm altyapısıyla etkileşime geçmek için NodeJS'te çalıştırın veya bunu bir JavaScript dosyasına ekleyin:

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```
## 5. İlk Web3 Betiğinizi Yazın!

Şimdi biraz Web3 programlaması için kolları sıvamak adına Ethereum Ana Ağı'ndan en son blok numarasını yazdıran basit bir betik yazacağız.

**1. Henüz yapmadıysanız, terminalinizde yeni bir proje dizini oluşturun ve içine girin (cd):**

```
mkdir web3-example
cd web3-example
```

**2. Henüz yapmadıysanız, Alchemy Web3 (veya herhangi bir Web3) bağımlılığını projenize kurun:**

```
npm install @alch/alchemy-web3
```

**3. `index.js` adında bir dosya oluşturun ve aşağıdaki içerikleri ekleyin:**

> Sonuç olarak `demo` ifadesini Alchemy HTTP API anahtarınızla değiştirmelisiniz.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("The latest block number is " + blockNumber)
}
main()
```

Asenkron (async) kavramlara aşina değil misiniz? Bu [Medium gönderisine](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c) göz atın.

**4. Node kullanarak terminalinizde çalıştırın**

```
node index.js
```

**5. Artık konsolunuzda en son blok numarası çıktısını görmelisiniz!**

```
The latest block number is 11043912
```

**Harika! Tebrikler! Alchemy kullanarak ilk Web3 betiğinizi yazdınız 🎉**

Sırada ne yapacağınızdan emin değil misiniz? İlk akıllı sözleşmenizi dağıtmayı deneyin ve [Merhaba Dünya Akıllı Sözleşme Rehberimizde](/developers/tutorials/hello-world-smart-contract/) biraz Solidity programlaması için kolları sıvayın veya daha fazla örnek için [Alchemy belgelerini](https://www.alchemy.com/docs/) keşfetmeye devam edin.

_[Alchemy'ye ücretsiz kaydolun](https://auth.alchemy.com/), [belgelerimize](https://www.alchemy.com/docs/) göz atın ve en son haberler için bizi [Twitter'da](https://twitter.com/AlchemyPlatform) takip edin_.
