---
title: "Web3 Kullanarak İşlem Gönderme"
description: "Bu, Web3 kullanarak Ethereum işlemleri göndermeye yönelik başlangıç dostu bir rehberdir. Ethereum blokzincirine bir işlem göndermek için üç ana adım vardır: oluşturma, imzalama ve yayınlama. Bu üçünü de inceleyeceğiz."
author: "Elan Halpern"
tags: ["işlemler", "web3.js", "Alchemy"]
skill: beginner
breadcrumb: "İşlem gönder"
lang: tr
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

Bu, Web3 kullanarak Ethereum işlemleri göndermeye yönelik başlangıç dostu bir rehberdir. Ethereum blokzincirine bir işlem göndermek için üç ana adım vardır: oluşturma, imzalama ve yayınlama. Aklınıza takılabilecek tüm soruları yanıtlamayı umarak bu üçünü de inceleyeceğiz! Bu eğitimde, işlemlerimizi Ethereum zincirine göndermek için [Alchemy](https://www.alchemy.com/) kullanacağız. Buradan [ücretsiz bir Alchemy hesabı oluşturabilirsiniz](https://auth.alchemy.com/signup).

**NOT:** Bu rehber, uygulamanızın _arka ucunda (backend)_ işlemlerinizi imzalamak içindir. İşlemlerinizi ön uçta (frontend) imzalamayı entegre etmek istiyorsanız, [Web3'ü bir tarayıcı sağlayıcısıyla](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider) entegre etme konusuna göz atın.

## Temeller {#the-basics}

Çoğu blokzincir geliştiricisinin ilk başladığında yaptığı gibi, bir işlemin nasıl gönderileceği (oldukça basit olması gereken bir şey) hakkında biraz araştırma yapmış ve her biri farklı şeyler söyleyen, sizi biraz bunaltan ve kafanızı karıştıran çok sayıda rehberle karşılaşmış olabilirsiniz. Eğer bu durumdaysanız endişelenmeyin; hepimiz bir noktada aynı durumdaydık! Bu yüzden, başlamadan önce birkaç şeyi açıklığa kavuşturalım:

### 1\. Alchemy özel anahtarlarınızı saklamaz {#alchemy-does-not-store-your-private-keys}

- Bu, Alchemy'nin sizin adınıza işlemleri imzalayamayacağı ve gönderemeyeceği anlamına gelir. Bunun nedeni güvenlik amaçlıdır. Alchemy sizden asla özel anahtarınızı paylaşmanızı istemez ve özel anahtarınızı asla barındırılan bir düğümle (veya bu konuda herhangi biriyle) paylaşmamalısınız.
- Alchemy'nin çekirdek API'sini kullanarak blokzincirden okuma yapabilirsiniz, ancak ona yazmak için işlemlerinizi Alchemy aracılığıyla göndermeden önce imzalamak üzere başka bir şey kullanmanız gerekecektir (bu, diğer herhangi bir [düğüm hizmeti](/developers/docs/nodes-and-clients/nodes-as-a-service/) için de aynıdır).

### 2\. "İmzalayıcı" (signer) nedir?

- İmzalayıcılar, özel anahtarınızı kullanarak sizin adınıza işlemleri imzalar. Bu eğitimde işlemimizi imzalamak için [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) kullanacağız, ancak başka herhangi bir Web3 kütüphanesini de kullanabilirsiniz.
- Ön uçta (frontend), sizin adınıza işlemleri imzalayacak ve gönderecek olan [MetaMask](https://metamask.io/) iyi bir imzalayıcı örneğidir.
### 3\. İşlemlerimi neden imzalamam gerekiyor? {#why-do-i-need-to-sign-my-transactions}

- Ethereum ağında bir işlem göndermek isteyen her kullanıcı, işlemin kaynağının iddia ettiği kişi olduğunu doğrulamak için işlemi (özel anahtarını kullanarak) imzalamalıdır.
- Bu özel anahtarı korumak son derece önemlidir, çünkü ona erişim sağlamak Ethereum hesabınız üzerinde tam kontrol sağlayarak sizin (veya erişimi olan herhangi birinin) adınıza işlemler gerçekleştirmesine olanak tanır.

### 4\. Özel anahtarımı nasıl korurum? {#how-do-i-protect-my-private-key}

- Özel anahtarınızı korumanın ve onu işlemler göndermek için kullanmanın birçok yolu vardır. Bu eğitimde bir `.env` dosyası kullanacağız. Ancak, özel anahtarları saklayan ayrı bir sağlayıcı kullanabilir, bir anahtar deposu dosyası veya başka seçenekler de kullanabilirsiniz.

### 5\. `eth_sendTransaction` ve `eth_sendRawTransaction` arasındaki fark nedir? {#difference-between-send-and-send-raw}

`eth_sendTransaction` ve `eth_sendRawTransaction`, gelecekteki bir bloğa eklenmesi için Ethereum ağına bir işlem yayınlayan Ethereum API işlevleridir. İşlemlerin imzalanmasını nasıl ele aldıkları konusunda farklılık gösterirler.

- [`eth_sendTransaction`](https://docs.web3js.org/api/web3-eth/function/sendTransaction), _imzasız_ işlemleri göndermek için kullanılır; bu, gönderdiğiniz düğümün işlemi zincire yayınlamadan önce imzalayabilmesi için özel anahtarınızı yönetmesi gerektiği anlamına gelir. Alchemy kullanıcıların özel anahtarlarını tutmadığı için bu yöntemi desteklemez.
- [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction), halihazırda imzalanmış işlemleri yayınlamak için kullanılır. Bu, önce [`signTransaction(tx, private_key)`](https://docs.web3js.org/api/web3-eth-accounts/function/signTransaction) kullanmanız, ardından sonucu `eth_sendRawTransaction` içine geçirmeniz gerektiği anlamına gelir.

Web3 kullanırken, `eth_sendRawTransaction` işlevine [web3.eth.sendSignedTransaction](https://docs.web3js.org/api/web3-eth/function/sendSignedTransaction) çağrılarak erişilir.

Bu eğitimde kullanacağımız şey budur.

### 6\. Web3 kütüphanesi nedir? {#what-is-the-web3-library}

- Web3.js, Ethereum geliştirmede kullanımı oldukça yaygın olan standart JSON-RPC çağrılarının etrafındaki bir sarmalayıcı kütüphanedir.
- Farklı diller için birçok Web3 kütüphanesi vardır. Bu eğitimde JavaScript ile yazılmış olan [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) kullanacağız. [Ethers.js](https://docs.ethers.org/v5/) gibi diğer seçeneklere [buradan](/developers/docs/apis/javascript/) göz atabilirsiniz.

Tamam, bu sorulardan birkaçını aradan çıkardığımıza göre, eğitime geçebiliriz. Alchemy [Discord](https://discord.gg/gWuC7zB) kanalında istediğiniz zaman soru sormaktan çekinmeyin!

### 7\. Güvenli, gaz için optimize edilmiş ve gizli işlemler nasıl gönderilir?

- [Alchemy'nin bir dizi işlem kaynağı vardır](https://www.alchemy.com/docs/sending-transactions). Bunları işlemler göndermek, gerçekleşmeden önce işlemleri simüle etmek, gizli işlemler göndermek ve gaz için optimize edilmiş işlemler göndermek için kullanabilirsiniz.
- İşleminiz bellek havuzundan çekilip zincire eklendiğinde uyarılmak için [Alchemy web kancalarını (webhooks)](https://www.alchemy.com/docs/reference/webhooks-overview) da kullanabilirsiniz.

**NOT:** Bu rehber bir Alchemy hesabı, bir Ethereum adresi veya MetaMask cüzdanı, Node.js ve npm'in kurulu olmasını gerektirir. Eğer kurulu değilse, şu adımları izleyin:

1.  [Ücretsiz bir Alchemy hesabı oluşturun](https://auth.alchemy.com/signup)
2.  [MetaMask hesabı oluşturun](https://metamask.io/) (veya bir Ethereum adresi edinin)
3.  [Node.js ve npm'i kurun](https://nodejs.org/en/download/)
## İşleminizi Gönderme Adımları {#steps-to-sending-your-transaction}

### 1\. Sepolia test ağında bir Alchemy uygulaması oluşturun {#create-an-alchemy-app-on-the-sepolia-testnet}

[Alchemy Kontrol Panelinize](https://dashboard.alchemy.com/) gidin ve ağınız için Sepolia'yı (veya başka bir test ağını) seçerek yeni bir uygulama oluşturun.

### 2\. Sepolia musluğundan ETH talep edin {#request-eth-from-sepolia-faucet}

ETH almak için [Alchemy Sepolia musluğundaki](https://www.sepoliafaucet.com/) talimatları izleyin. Başka bir ağın değil, **Sepolia** Ethereum adresinizi (MetaMask'ten) eklediğinizden emin olun. Talimatları izledikten sonra, cüzdanınıza ETH'nin ulaştığını iki kez kontrol edin.

### 3\. Yeni bir proje dizini oluşturun ve içine `cd` yapın {#create-a-new-project-direction}

Komut satırından (Mac'ler için terminal) yeni bir proje dizini oluşturun ve içine gidin:

```
mkdir sendtx-example
cd sendtx-example
```

### 4\. Alchemy Web3'ü (veya herhangi bir Web3 kütüphanesini) kurun {#install-alchemy-web3}

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)'ü kurmak için proje dizininizde aşağıdaki komutu çalıştırın:

Not, Ethers.js kütüphanesini kullanmak isterseniz, [buradaki talimatları izleyin](https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```
npm install @alch/alchemy-web3
```

### 5\. dotenv'i kurun {#install-dotenv}

API anahtarımızı ve özel anahtarımızı güvenli bir şekilde saklamak için bir `.env` dosyası kullanacağız.

```
npm install dotenv --save
```

### 6\. `.env` dosyasını oluşturun {#create-the-dotenv-file}

Proje dizininizde bir `.env` dosyası oluşturun ve aşağıdakileri ekleyin (“`your-api-url`" ve "`your-private-key`" kısımlarını değiştirerek)

- Alchemy API URL'nizi bulmak için, kontrol panelinizde yeni oluşturduğunuz uygulamanın uygulama ayrıntıları sayfasına gidin, sağ üst köşedeki “View Key” (Anahtarı Görüntüle) seçeneğine tıklayın ve HTTP URL'sini alın.
- MetaMask kullanarak özel anahtarınızı bulmak için bu [rehbere](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) göz atın.

```
API_URL = "your-api-url"
PRIVATE_KEY = "your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
<code>.env</code> dosyasını işlemeyin (commit)! Sırlarınızı tehlikeye atacağınız için <code>.env</code> dosyanızı asla kimseyle paylaşmadığınızdan veya ifşa etmediğinizden emin olun. Sürüm kontrolü kullanıyorsanız, <code>.env</code> dosyanızı bir <a href="https://git-scm.com/docs/gitignore">gitignore</a> dosyasına ekleyin.
</AlertDescription>
</AlertContent>
</Alert>

### 7\. `sendTx.js` dosyasını oluşturun

Harika, artık hassas verilerimizi bir `.env` dosyasında koruduğumuza göre kodlamaya başlayabiliriz. İşlem gönderme örneğimiz için, Sepolia musluğuna ETH'yi geri göndereceğiz.

Örnek işlemimizi yapılandıracağımız ve göndereceğimiz yer olan bir `sendTx.js` dosyası oluşturun ve içine aşağıdaki kod satırlarını ekleyin:

```
async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63' //YAPILACAK: bu adresi kendi genel adresinizle değiştirin

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce 0'dan saymaya başlar

    const transaction = {
     'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // eth'yi iade etmek için musluk adresi
     'value': 1000000000000000000, // 1 ETH
     'gas': 30000,
     'nonce': nonce,
     // mesaj göndermek veya akıllı sözleşme yürütmek için isteğe bağlı veri alanı
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 İşleminizin hash'i: ", hash, "\n İşleminizin durumunu görüntülemek için Alchemy'nin Bellek Havuzunu kontrol edin!");
    } else {
      console.log("❗İşleminiz gönderilirken bir şeyler ters gitti:", error)
    }
   });
}

main();
```

**6. satırdaki** adresi kendi genel adresinizle değiştirdiğinizden emin olun.

Şimdi, bu kodu çalıştırmaya geçmeden önce, buradaki bazı bileşenler hakkında konuşalım.

- `nonce` : Nonce belirtimi, adresinizden gönderilen işlemlerin sayısını takip etmek için kullanılır. Buna güvenlik amacıyla ve tekrarlama saldırılarını (replay attacks) önlemek için ihtiyacımız var. Adresinizden gönderilen işlemlerin sayısını almak için [getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count) kullanırız.
- `transaction`: İşlem nesnesinin belirtmemiz gereken birkaç yönü vardır
  - `to`: Bu, ETH göndermek istediğimiz adrestir. Bu durumda, ETH'yi başlangıçta talep ettiğimiz [Sepolia musluğuna](https://sepoliafaucet.com/) geri gönderiyoruz.
  - `value`: Bu, 10^18 Wei = 1 ETH olacak şekilde Wei cinsinden belirtilen, göndermek istediğimiz miktardır.
  - `gas`: İşleminize dahil edilecek doğru gaz miktarını belirlemenin birçok yolu vardır. Alchemy, zincir içi etkinlikler hakkında sizi bilgilendirebilecek [web kancalarını (webhooks)](https://www.alchemy.com/docs/reference/webhooks-overview) destekler. Ana Ağ işlemleri için, dahil edilecek doğru gaz miktarını belirlemek amacıyla mevcut gaz koşullarını kontrol etmek iyi bir uygulamadır. 21000, Ethereum'daki bir işlemin kullanacağı minimum gaz miktarıdır, bu nedenle işlemimizin yürütüleceğinden emin olmak için buraya 30000 koyuyoruz.
  - `nonce`: yukarıdaki nonce tanımına bakın. Nonce sıfırdan saymaya başlar.
  - [İSTEĞE BAĞLI] data: Transferinizle birlikte ek bilgi göndermek veya bir akıllı sözleşmeyi çağırmak için kullanılır, bakiye transferleri için gerekli değildir, aşağıdaki nota göz atın.
- `signedTx`: İşlem nesnemizi imzalamak için `PRIVATE_KEY`'imiz ile `signTransaction` yöntemini kullanacağız.
- `sendSignedTransaction`: İmzalı bir işlemimiz olduğunda, `sendSignedTransaction` kullanarak onu sonraki bir bloğa dahil edilmesi için gönderebiliriz.

**Veri (data) üzerine bir Not**
Ethereum'da gönderilebilecek iki ana işlem türü vardır.

- Bakiye transferi: Bir adresten diğerine ETH gönderin. Veri alanı gerekmez, ancak işleminizle birlikte ek bilgi göndermek isterseniz, bu bilgiyi bu alana HEX formatında dahil edebilirsiniz.
  - Örneğin, değişmez bir zaman damgası vermek için bir IPFS belgesinin hash'ini Ethereum zincirine yazmak istediğimizi varsayalım. Bu durumda veri alanımız şu şekilde görünmelidir: data: `web3.utils.toHex(‘IPFS hash‘)`. Ve artık herkes zinciri sorgulayabilir ve o belgenin ne zaman eklendiğini görebilir.
- Akıllı sözleşme işlemi: Zincir üzerinde bir akıllı sözleşme kodu yürütün. Bu durumda, veri alanı, herhangi bir parametreyle birlikte yürütmek istediğiniz akıllı işlevi içermelidir.
  - Pratik bir örnek için [Merhaba Dünya Akıllı Sözleşme eğitimine](/developers/tutorials/hello-world-smart-contract/) göz atın.
### 8\. `node sendTx.js` kullanarak kodu çalıştırın {#run-the-code-using-node-sendtx-js}

Terminalinize veya komut satırınıza geri dönün ve şunu çalıştırın:

```
node sendTx.js
```

### 9\. İşleminizi Bellek Havuzunda (Mempool) görün

Alchemy kontrol panelinizdeki [Bellek Havuzu (Mempool) sayfasını](https://dashboard.alchemy.com/mempool) açın ve işleminizi bulmak için oluşturduğunuz uygulamaya göre filtreleyin. Burası, işlemimizin beklemede (pending) durumundan kazılmış (mined) durumuna (başarılıysa) veya başarısızsa düşmüş (dropped) durumuna geçişini izleyebileceğimiz yerdir. "Kazılmış", "beklemede" ve "düşmüş" işlemleri yakalamak için bunu "Tümü" (All) olarak tuttuğunuzdan emin olun. Ayrıca `0x31b98d14007bdee637298086988a0bbd31184523` adresine gönderilen işlemleri arayarak da işleminizi arayabilirsiniz.

İşleminizi bulduktan sonra ayrıntılarını görüntülemek için, sizi şuna benzer bir görünüme götürecek olan işlem hash'ini seçin:

![Bellek havuzu izleyici ekran görüntüsü](./mempool.png)

Oradan, kırmızı daire içine alınmış simgeye tıklayarak işleminizi Etherscan üzerinde görüntüleyebilirsiniz!

**Yaşasıııın! Alchemy kullanarak ilk Ethereum işleminizi gönderdiniz 🎉**

_Bu rehber hakkındaki geri bildirimleriniz ve önerileriniz için lütfen Alchemy'nin [Discord](https://discord.gg/A39JVCM) kanalından Elan'a mesaj gönderin!_

_Orijinal olarak Alchemy tarafından yayımlanmıştır._
