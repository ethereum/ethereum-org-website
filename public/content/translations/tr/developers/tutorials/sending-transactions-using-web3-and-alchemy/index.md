---
title: "Web3 Kullanarak İşlem Gönderme"
description: "Bu, Web3 kullanarak Ethereum işlemleri göndermek için başlangıç dostu bir rehberdir. Ethereum blokzincirine bir işlem göndermek için üç ana adım vardır: oluşturma, imzalama ve yayımlama. Bu üç adımı da inceleyeceğiz."
author: "Elan Halpern"
tags: [ "işlemler", "web3.js", "alchemy" ]
skill: beginner
lang: tr
published: 04.11.2020
source: Alchemy belgeleri
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

Bu, Web3 kullanarak Ethereum işlemleri göndermek için başlangıç dostu bir rehberdir. Ethereum blokzincirine bir işlem göndermek için üç ana adım vardır: oluşturma, imzalama ve yayımlama. Üçünü de gözden geçirerek aklınızdaki soruları cevaplamayı umuyoruz! Bu öğreticide, işlemlerimizi Ethereum zincirine göndermek için [Alchemy](https://www.alchemy.com/) kullanacağız. [Buradan ücretsiz bir Alchemy hesabı oluşturabilirsiniz](https://auth.alchemyapi.io/signup).

**NOT:** Bu rehber, uygulamanızın _backend_ tarafında işlemlerinizi imzalamak içindir. İşlemlerinizi imzalamayı frontend'e entegre etmek istiyorsanız, [Web3'ü bir tarayıcı sağlayıcısıyla entegre etme](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider) konusuna göz atın.

## Temel Bilgiler {#the-basics}

Çoğu blokzincir geliştiricisi gibi, işe ilk başladığınızda, (oldukça basit olması gereken) bir işlemin nasıl gönderileceği üzerine araştırma yapmış ve her biri farklı şeyler söyleyen, sizi biraz bunaltıp kafanızı karıştıran çok sayıda rehberle karşılaşmış olabilirsiniz. Bu durumdaysanız merak etmeyin; hepimiz o yollardan geçtik! O zaman başlamadan önce birkaç şeyi açıklığa kavuşturalım:

### 1. Alchemy özel anahtarlarınızı saklamaz {#alchemy-does-not-store-your-private-keys}

- Bu, Alchemy'nin sizin adınıza işlemleri imzalayamayacağı ve gönderemeyeceği anlamına gelir. Bunun nedeni güvenlik amaçlıdır. Alchemy asla özel anahtarınızı paylaşmanızı istemez ve özel anahtarınızı barındırılan bir düğümle (veya bu konuda herhangi biriyle) asla paylaşmamalısınız.
- Alchemy'nin çekirdek API'sini kullanarak blokzincirden okuma yapabilirsiniz, ancak blokzincire yazmak için işlemlerinizi Alchemy aracılığıyla göndermeden önce imzalamak için başka bir araç kullanmanız gerekir (bu durum diğer tüm [düğüm hizmetleri](/developers/docs/nodes-and-clients/nodes-as-a-service/) için de geçerlidir).

### 2. “İmzalayıcı” nedir? {#what-is-a-signer}

- İmzalayıcılar, özel anahtarınızı kullanarak işlemleri sizin için imzalar. Bu öğreticide, işlemimizi imzalamak için [Alchemy web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3) kullanacağız, ancak başka bir web3 kütüphanesi de kullanabilirsiniz.
- Frontend'de iyi bir imzalayıcı örneği, sizin adınıza işlemleri imzalayıp gönderecek olan [MetaMask](https://metamask.io/)'tır.

### 3. İşlemlerimi neden imzalamam gerekiyor? {#why-do-i-need-to-sign-my-transactions}

- Ethereum ağında bir işlem göndermek isteyen her kullanıcı, işlemin kaynağının iddia ettiği kişi olduğunu doğrulamak için işlemi (özel anahtarını kullanarak) imzalamalıdır.
- Bu özel anahtarı korumak çok önemlidir, çünkü erişime sahip olmak Ethereum hesabınız üzerinde tam kontrol sağlayarak sizin (veya erişimi olan herhangi birinin) sizin adınıza işlem gerçekleştirmesine izin verir.

### 4. Özel anahtarımı nasıl korurum? {#how-do-i-protect-my-private-key}

- Özel anahtarınızı korumanın ve işlemleri göndermek için kullanmanın birçok yolu vardır. Bu öğreticide bir `.env` dosyası kullanacağız. Ancak özel anahtarları saklayan ayrı bir sağlayıcı, bir keystore dosyası veya başka seçenekler de kullanabilirsiniz.

### 5. `eth_sendTransaction` ve `eth_sendRawTransaction` arasındaki fark nedir? {#difference-between-send-and-send-raw}

`eth_sendTransaction` ve `eth_sendRawTransaction`, gelecekteki bir bloğa eklenmesi için Ethereum ağına bir işlem yayınlayan Ethereum API fonksiyonlarıdır. İşlemlerin imzalanmasını ele alma biçimlerinde farklılık gösterirler.

- [`eth_sendTransaction`](https://docs.web3js.org/api/web3-eth/function/sendTransaction) _imzasız_ işlemleri göndermek için kullanılır; bu da gönderim yaptığınız düğümün, işlemi zincire yayınlamadan önce imzalayabilmesi için özel anahtarınızı yönetmesi gerektiği anlamına gelir. Alchemy kullanıcıların özel anahtarlarını tutmadığı için bu yöntemi desteklemez.
- [`eth_sendRawTransaction`](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction), halihazırda imzalanmış olan işlemleri yayımlamak için kullanılır. Bu, önce [`signTransaction(tx, private_key)`](https://docs.web3js.org/api/web3-eth-accounts/function/signTransaction) kullanmanız ve ardından sonucu `eth_sendRawTransaction`'a iletmeniz gerektiği anlamına gelir.

web3 kullanırken `eth_sendRawTransaction`'a [web3.eth.sendSignedTransaction](https://docs.web3js.org/api/web3-eth/function/sendSignedTransaction) fonksiyonu çağrılarak erişilir.

Bu öğreticide bunu kullanacağız.

### 6. Web3 kütüphanesi nedir? {#what-is-the-web3-library}

- Web3.js, Ethereum geliştirmede kullanımı oldukça yaygın olan standart JSON-RPC çağrıları etrafında bir paketleyici kütüphanedir.
- Farklı diller için birçok web3 kütüphanesi vardır. Bu öğreticide JavaScript ile yazılmış olan [Alchemy Web3](https://docs.alchemy.com/reference/api-overview) kullanacağız. [ethers.js](https://docs.ethers.org/v5/) gibi diğer seçeneklere [buradan](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) göz atabilirsiniz.

Pekala, şimdi bu sorulardan birkaçını aradan çıkardığımıza göre, öğreticiye geçelim. Alchemy [discord](https://discord.gg/gWuC7zB) kanalında dilediğiniz zaman soru sormaktan çekinmeyin!

### 7. Güvenli, gaz optimizasyonlu ve özel işlemler nasıl gönderilir? {#how-to-send-secure-gas-optimized-and-private-transactions}

- [Alchemy'nin bir Transact API paketi vardır](https://docs.alchemy.com/reference/transact-api-quickstart). Bunları güçlendirilmiş işlemler göndermek, işlemleri gerçekleşmeden önce simüle etmek, özel işlemler göndermek ve gaz optimizasyonlu işlemler göndermek için kullanabilirsiniz.
- Ayrıca işleminiz mempool'dan çekilip zincire eklendiğinde haberdar olmak için [Notify API](https://docs.alchemy.com/docs/alchemy-notify) kullanabilirsiniz.

**NOT:** Bu rehber için bir Alchemy hesabı, bir Ethereum adresi veya MetaMask cüzdanı, Node.js ve npm'in kurulu olması gerekir. Kurulu değilse şu adımları takip edin:

1. [Ücretsiz bir Alchemy hesabı oluşturun](https://auth.alchemyapi.io/signup)
2. [MetaMask hesabı oluşturun](https://metamask.io/) (veya bir Ethereum adresi alın)
3. [Node.js ve NPM'i yüklemek için bu adımları izleyin](https://docs.alchemy.com/alchemy/guides/alchemy-for-macs)

## İşleminizi Gönderme Adımları {#steps-to-sending-your-transaction}

### 1. Sepolia test ağında bir Alchemy uygulaması oluşturun {#create-an-alchemy-app-on-the-sepolia-testnet}

[Alchemy Pano'nuza](https://dashboard.alchemyapi.io/) gidin ve ağınız için Sepolia'yı (veya başka bir test ağını) seçerek yeni bir uygulama oluşturun.

### 2. Sepolia musluğundan ETH talep edin {#request-eth-from-sepolia-faucet}

ETH almak için [Alchemy Sepolia musluğundaki](https://www.sepoliafaucet.com/) talimatları izleyin. Başka bir ağınkini değil, **Sepolia** Ethereum adresinizi (MetaMask'ten) girdiğinizden emin olun. Talimatları izledikten sonra cüzdanınıza ETH'nin geldiğini tekrar kontrol edin.

### 3. Yeni bir proje dizini oluşturun ve içine `cd` ile girin {#create-a-new-project-direction}

Komut satırından (mac'ler için terminal) yeni bir proje dizini oluşturun ve içine gidin:

```
mkdir sendtx-example
cd sendtx-example
```

### 4. Alchemy Web3'ü (veya herhangi bir web3 kütüphanesini) yükleyin {#install-alchemy-web3}

[Alchemy Web3](https://docs.alchemy.com/reference/api-overview) yüklemek için proje dizininizde aşağıdaki komutu çalıştırın:

Not, ethers.js kütüphanesini kullanmak isterseniz, [buradaki talimatları izleyin](https://docs.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```
npm install @alch/alchemy-web3
```

### 5. dotenv'i yükleyin {#install-dotenv}

API anahtarımızı ve özel anahtarımızı güvenli bir şekilde saklamak için bir `.env` dosyası kullanacağız.

```
npm install dotenv --save
```

### 6. `.env` dosyasını oluşturun {#create-the-dotenv-file}

Proje dizininizde bir `.env` dosyası oluşturun ve aşağıdakileri ekleyin ("`your-api-url`" ve "`your-private-key`" kısımlarını değiştirerek)

- Alchemy API URL'nizi bulmak için, panonuzda yeni oluşturduğunuz uygulamanın uygulama ayrıntıları sayfasına gidin, sağ üst köşedeki “View Key”'e tıklayın ve HTTP URL'sini alın.
- MetaMask kullanarak özel anahtarınızı bulmak için bu [rehbere](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) göz atın.

```
API_URL = "your-api-url"
PRIVATE_KEY = "your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
<code>.env</code> dosyasını commit'lemeyin! Lütfen <code>.env</code> dosyanızı asla kimseyle paylaşmadığınızdan veya ifşa etmediğinizden emin olun, çünkü bunu yaparken sırlarınızı tehlikeye atıyorsunuz. Sürüm kontrolü kullanıyorsanız, <code>.env</code> dosyanızı bir <a href="https://git-scm.com/docs/gitignore">gitignore</a> dosyasına ekleyin.
</AlertDescription>
</AlertContent>
</Alert>

### 7. `sendTx.js` dosyasını oluşturun {#create-sendtx-js}

Harika, artık hassas verilerimizi bir .env dosyasında koruduğumuza göre kodlamaya başlayalım. İşlem gönderme örneğimiz için ETH'yi Sepolia musluğuna geri göndereceğiz.

Örnek işlemimizi yapılandırıp göndereceğimiz bir sendTx.js dosyası oluşturun ve buna aşağıdaki kod satırlarını ekleyin:

```
async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63' //TODO: bu adresi kendi genel adresinizle değiştirin

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
      console.log("🎉 İşleminizin hash'i: ", hash, "\n İşleminizin durumunu görüntülemek için Alchemy'nin Mempool'unu kontrol edin!");
    } else {
      console.log("❗İşleminizi gönderirken bir şeyler ters gitti:", error)
    }
   });
}

main();
```

**6. satırdaki** adresi kendi genel adresinizle değiştirdiğinizden emin olun.

Şimdi, bu kodu çalıştırmaya geçmeden önce, burada bazı bileşenlerden bahsedelim.

- `nonce` : Nonce özelliği, adresinizden gönderilen işlem sayısını takip etmek için kullanılır. Buna güvenlik amacıyla ve [tekrar saldırılarını](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce) önlemek için ihtiyacımız var. Adresinizden gönderilen işlem sayısını almak için [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount) kullanırız.
- `transaction`: İşlem nesnesinin belirtmemiz gereken birkaç özelliği vardır
  - `to`: ETH göndermek istediğimiz adrestir. Bu durumda ETH'yi, başlangıçta talep ettiğimiz [Sepolia musluğuna](https://sepoliafaucet.com/) geri gönderiyoruz.
  - `value`: Göndermek istediğimiz miktardır. Wei cinsinden belirtilir ve 10^18 Wei = 1 ETH'dir.
  - `gas`: İşleminize dahil edilecek doğru gaz miktarını belirlemenin birçok yolu vardır. Hatta Alchemy'nin, gaz fiyatı belirli bir eşiğin altına düştüğünde sizi bilgilendiren bir [gaz fiyatı webhook'u](https://docs.alchemyapi.io/guides/alchemy-notify#address-activity-1) bile vardır. Ana Ağ işlemleri için, eklenecek doğru gaz miktarını belirlemek amacıyla [ETH Gas Station](https://ethgasstation.info/) gibi bir gaz tahmin ediciyi kontrol etmek iyi bir uygulamadır. 21000, Ethereum'da bir işlemin kullanacağı minimum gaz miktarıdır, bu nedenle işlemimizin gerçekleştirilmesini sağlamak için buraya 30000 koyduk.
  - `nonce`: yukarıdaki nonce tanımına bakın. Nonce değeri, saymaya sıfırdan başlar.
  - [İSTEĞE BAĞLI] data: Aktarımınızla ek bilgi göndermek veya bir akıllı sözleşme çağırmak için kullanılır. Bakiye aktarımları için gerekli değildir, aşağıdaki nota göz atın.
- `signedTx`: İşlem nesnemizi imzalamak için `PRIVATE_KEY`imiz ile `signTransaction` metodunu kullanacağız.
- `sendSignedTransaction`: İmzalanmış bir işlemimiz olduğunda, `sendSignedTransaction` kullanarak sonraki bir bloğa dahil edilmesi için gönderebiliriz.

**Veri Üzerine Bir Not**
Ethereum'da gönderilebilecek iki ana işlem türü vardır.

- Bakiye aktarımı: Bir adresten diğerine ETH gönderin. Veri alanı gerekli değildir, ancak işleminizle birlikte ek bilgi göndermek isterseniz, bu bilgiyi bu alana HEX formatında ekleyebilirsiniz.
  - Örneğin, değişmez bir zaman damgası vermek için bir IPFS belgesinin hash değerini ethereum zincirine yazmak istediğimizi varsayalım. Veri alanımız bu durumda şöyle görünmelidir: data: `web3.utils.toHex('IPFS hash')`. Artık herkes zinciri sorgulayabilir ve bu belgenin ne zaman eklendiğini görebilir.
- Akıllı sözleşme işlemi: Zincir üzerinde akıllı sözleşme kodu yürütün. Bu durumda, veri alanı, yürütmek istediğiniz akıllı fonksiyonu ve tüm parametreleri içermelidir.
  - Pratik bir örnek için bu [Merhaba Dünya Öğreticisi'ndeki](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#step-8-create-the-transaction) Adım 8'e göz atın.

### 8. Kodu `node sendTx.js` kullanarak çalıştırın {#run-the-code-using-node-sendtx-js}

Terminalinize veya komut satırınıza geri dönün ve şunu çalıştırın:

```
node sendTx.js
```

### 9. İşleminizi Mempool'da görün {#see-your-transaction-in-the-mempool}

Alchemy panonuzdaki [Mempool sayfasını](https://dashboard.alchemyapi.io/mempool) açın ve işleminizi bulmak için oluşturduğunuz uygulamaya göre filtreleyin. İşleminizin bekleme durumundan kazılmış duruma (başarılıysa) veya düşürülmüş duruma (başarısızsa) geçişini buradan izleyebilirsiniz. “kazılmış”, “beklemede” ve “düşürülmüş” işlemleri yakalamak için “Tümü” (All) seçeneğinde kaldığından emin olun. `0x31b98d14007bdee637298086988a0bbd31184523` adresine gönderilen işlemleri arayarak da işleminizi bulabilirsiniz.

İşleminizi bulduktan sonra ayrıntılarını görüntülemek için, sizi aşağıdaki gibi bir görünüme götürecek olan tx hash'ini seçin:

![Mempool izleyici ekran görüntüsü](./mempool.png)

Buradan, kırmızı daire içine alınmış simgeye tıklayarak işleminizi Etherscan'de görüntüleyebilirsiniz!

**Oley!** Alchemy kullanarak ilk Ethereum işleminizi gönderdiniz 🎉\*\*

_Bu rehber hakkındaki geri bildirim ve önerileriniz için lütfen Alchemy'nin [Discord](https://discord.gg/A39JVCM) kanalından Elan'a mesaj gönderin!_

_Orijinal olarak [https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy](https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy) adresinde yayımlandı_
